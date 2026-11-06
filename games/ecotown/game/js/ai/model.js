// Plotter: the tiny in-browser language model for Eco Town.
// Reads (level, instruction) and returns a probability per slot of that level
// plus "unknown". No dependencies; works in browsers and Node >= 18.
//
//   const plotter = await loadPlotter({ jsonUrl: 'models/plotter.json', binUrl: 'models/plotter.bin' });
//   // or, in Node: await loadPlotter({ json: parsedJson, bin: arrayBuffer })
//   plotter.predict('land', 'Dry, sunny land')  -> { slots: {best: .01, dry: .98, ...}, unknown: .00, tokens: [...] }
//   plotter.explain('land', 'Dry, sunny land')  -> [{ word: 'Dry,', slot: 'dry', weight: 1, dProb: .4 }, ...]
//   plotter.embed('land', text)                 -> Float32Array(d)   pooled sentence vector
//   plotter.head('land')                        -> { slots, W, b, unknownW, unknownB, d }
//   plotter.predictFromEmbedding('land', emb, { W, b }?) -> { slots, unknown }
//
// Architecture (see model/train.py): token + position embedding, N pre-LayerNorm
// transformer blocks (4-head self-attention, GELU-tanh MLP), final LayerNorm,
// mean pool over tokens, one linear head with sigmoids. Weights ship as int8
// with a float32 scale per row and are dequantised once at load.

import { Tokenizer, normalise, wordpiece } from './tokenizer.js';

const SQRT_2_OVER_PI = Math.sqrt(2 / Math.PI);

async function fetchJson(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Plotter: cannot load ${url} (${r.status})`);
  return r.json();
}

async function fetchBin(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Plotter: cannot load ${url} (${r.status})`);
  return r.arrayBuffer();
}

function toArrayBuffer(bin) {
  if (bin instanceof ArrayBuffer) return bin;
  if (ArrayBuffer.isView(bin)) {
    // Node Buffer / Uint8Array: copy into its own aligned ArrayBuffer
    return bin.buffer.slice(bin.byteOffset, bin.byteOffset + bin.byteLength);
  }
  throw new Error('Plotter: bin must be an ArrayBuffer or typed array');
}

function readTensors(meta, buf) {
  const out = {};
  for (const t of meta.tensors) {
    const n = t.shape.reduce((a, b) => a * b, 1);
    if (t.dtype === 'float32') {
      out[t.name] = new Float32Array(buf.slice(t.offset, t.offset + 4 * n));
    } else if (t.dtype === 'int8') {
      const [rows, cols] = t.shape;
      const q = new Int8Array(buf, t.offset, n);
      const s = new Float32Array(buf.slice(t.scaleOffset, t.scaleOffset + 4 * rows));
      // block matrices are hot in matmuls: keep them as float64 (V8 does
      // arithmetic in doubles); the big embedding table stays float32.
      const w = t.name.startsWith('blocks.') ? new Float64Array(n) : new Float32Array(n);
      for (let r = 0; r < rows; r++) {
        const sc = s[r];
        const o = r * cols;
        for (let c = 0; c < cols; c++) w[o + c] = q[o + c] * sc;
      }
      out[t.name] = w;
    } else {
      throw new Error(`Plotter: unsupported dtype ${t.dtype}`);
    }
  }
  return out;
}

// Y[T x out] = X[T x inp] * W^T + b, with W row-major [out x inp].
// Register-blocked: 2 tokens x 4 output rows per inner loop, so every X and W
// value loaded is used in several multiply-adds (about 1.6x faster in V8).
function linear(X, T, inp, W, b, out, Y) {
  let t = 0;
  for (; t + 1 < T; t += 2) {
    const xa = t * inp, xb = xa + inp, ya = t * out, yb = ya + out;
    let o = 0;
    for (; o + 3 < out; o += 4) {
      const w0 = o * inp, w1 = w0 + inp, w2 = w1 + inp, w3 = w2 + inp;
      let a0 = b[o], a1 = b[o + 1], a2 = b[o + 2], a3 = b[o + 3];
      let c0 = a0, c1 = a1, c2 = a2, c3 = a3;
      for (let i = 0; i < inp; i++) {
        const x = X[xa + i], z = X[xb + i];
        const p = W[w0 + i], q = W[w1 + i], r = W[w2 + i], s = W[w3 + i];
        a0 += x * p; a1 += x * q; a2 += x * r; a3 += x * s;
        c0 += z * p; c1 += z * q; c2 += z * r; c3 += z * s;
      }
      Y[ya + o] = a0; Y[ya + o + 1] = a1; Y[ya + o + 2] = a2; Y[ya + o + 3] = a3;
      Y[yb + o] = c0; Y[yb + o + 1] = c1; Y[yb + o + 2] = c2; Y[yb + o + 3] = c3;
    }
    for (; o < out; o++) {
      const wo = o * inp;
      let a = b[o], c = b[o];
      for (let i = 0; i < inp; i++) { a += X[xa + i] * W[wo + i]; c += X[xb + i] * W[wo + i]; }
      Y[ya + o] = a; Y[yb + o] = c;
    }
  }
  for (; t < T; t++) {
    const xo = t * inp, yo = t * out;
    for (let o = 0; o < out; o++) {
      const wo = o * inp;
      let a = b[o];
      for (let i = 0; i < inp; i++) a += X[xo + i] * W[wo + i];
      Y[yo + o] = a;
    }
  }
}

function layerNorm(X, T, d, g, b, eps, Y) {
  for (let t = 0; t < T; t++) {
    const o = t * d;
    let mean = 0;
    for (let j = 0; j < d; j++) mean += X[o + j];
    mean /= d;
    let v = 0;
    for (let j = 0; j < d; j++) { const z = X[o + j] - mean; v += z * z; }
    const inv = 1 / Math.sqrt(v / d + eps);
    for (let j = 0; j < d; j++) Y[o + j] = (X[o + j] - mean) * inv * g[j] + b[j];
  }
}

function sigmoid(z) {
  return 1 / (1 + Math.exp(-z));
}

class Plotter {
  constructor(meta, weights) {
    this.meta = meta;
    this.cfg = meta.config;
    this.w = weights;
    this.tokenizer = new Tokenizer(meta.vocab, { maxLen: this.cfg.max_len });
    this.levels = meta.levels;
    this.levelSlots = meta.levelSlots;
    this.outIndex = new Map(meta.outputs.map((s, i) => [s, i]));
    this.unknownIndex = meta.unknownIndex;
    this._heads = {};
    const { d, ff, max_len: L } = this.cfg;
    // scratch buffers sized for the longest sequence
    this.buf = {
      x: new Float64Array(L * d), h: new Float64Array(L * d), qkv: new Float64Array(L * 3 * d),
      y: new Float64Array(L * d), f: new Float64Array(L * ff), att: new Float64Array(L),
    };
  }

  _checkLevel(level) {
    if (!this.levelSlots[level]) throw new Error(`Plotter: unknown level "${level}"`);
  }

  /** Forward pass on token ids -> pooled Float32Array(d). */
  _pool(ids) {
    const { d, ff, heads, layers, ln_eps: eps } = this.cfg;
    const W = this.w;
    const T = ids.length;
    const { x, h, qkv, y, f, att } = this.buf;
    const tok = W['tok.weight'], pos = W['pos.weight'];
    for (let t = 0; t < T; t++) {
      const to = ids[t] * d, po = t * d, xo = t * d;
      for (let j = 0; j < d; j++) x[xo + j] = tok[to + j] + pos[po + j];
    }
    const dh = d / heads;
    const scale = 1 / Math.sqrt(dh);
    for (let l = 0; l < layers; l++) {
      const p = `blocks.${l}.`;
      // --- self-attention
      layerNorm(x, T, d, W[p + 'ln1.weight'], W[p + 'ln1.bias'], eps, h);
      linear(h, T, d, W[p + 'qkv.weight'], W[p + 'qkv.bias'], 3 * d, qkv);
      // qkv row layout per token: [q (heads*dh) | k | v], matching PyTorch's view(B,T,3,H,dh)
      for (let hd = 0; hd < heads; hd++) {
        const qo = hd * dh, ko = d + hd * dh, vo = 2 * d + hd * dh;
        for (let t = 0; t < T; t++) {
          const qt = t * 3 * d + qo;
          let mx = -Infinity;
          for (let s = 0; s < T; s++) {
            const ks = s * 3 * d + ko;
            let dot = 0;
            for (let k = 0; k < dh; k++) dot += qkv[qt + k] * qkv[ks + k];
            dot *= scale;
            att[s] = dot;
            if (dot > mx) mx = dot;
          }
          let sum = 0;
          for (let s = 0; s < T; s++) { att[s] = Math.exp(att[s] - mx); sum += att[s]; }
          const yo = t * d + hd * dh;
          for (let k = 0; k < dh; k++) y[yo + k] = 0;
          for (let s = 0; s < T; s++) {
            const a = att[s] / sum;
            const vs = s * 3 * d + vo;
            for (let k = 0; k < dh; k++) y[yo + k] += a * qkv[vs + k];
          }
        }
      }
      linear(y, T, d, W[p + 'proj.weight'], W[p + 'proj.bias'], d, h);
      for (let i = 0; i < T * d; i++) x[i] += h[i];
      // --- MLP
      layerNorm(x, T, d, W[p + 'ln2.weight'], W[p + 'ln2.bias'], eps, h);
      linear(h, T, d, W[p + 'fc1.weight'], W[p + 'fc1.bias'], ff, f);
      for (let i = 0; i < T * ff; i++) {
        const z = f[i];
        f[i] = 0.5 * z * (1 + Math.tanh(SQRT_2_OVER_PI * (z + 0.044715 * z * z * z)));
      }
      linear(f, T, ff, W[p + 'fc2.weight'], W[p + 'fc2.bias'], d, h);
      for (let i = 0; i < T * d; i++) x[i] += h[i];
    }
    layerNorm(x, T, d, W['ln_f.weight'], W['ln_f.bias'], eps, h);
    const pooled = new Float32Array(d);
    for (let t = 0; t < T; t++) for (let j = 0; j < d; j++) pooled[j] += h[t * d + j];
    for (let j = 0; j < d; j++) pooled[j] /= T;
    return pooled;
  }

  /** Pooled sentence vector (input to the head). */
  embed(level, text) {
    this._checkLevel(level);
    return this._pool(this.tokenizer.ids(this.tokenizer.tokenize(level, text)));
  }

  /** The rows of the shared head for one level (copies; safe to modify). */
  head(level) {
    this._checkLevel(level);
    const d = this.cfg.d;
    const HW = this.w['head.weight'], Hb = this.w['head.bias'];
    const slots = this.levelSlots[level].slice();
    const W = new Float32Array(slots.length * d);
    const b = new Float32Array(slots.length);
    slots.forEach((s, r) => {
      const o = this.outIndex.get(s);
      W.set(HW.subarray(o * d, o * d + d), r * d);
      b[r] = Hb[o];
    });
    const u = this.unknownIndex;
    return { slots, W, b, unknownW: HW.slice(u * d, u * d + d), unknownB: Hb[u], d };
  }

  /** Logits (pre-sigmoid scores) for a level from a pooled embedding. */
  _scores(level, emb, headOverride) {
    const d = this.cfg.d;
    const base = (this._heads[level] ??= this.head(level)); // internal copy, never handed out
    const hd = headOverride ? { ...base, ...headOverride } : base;
    const slots = {};
    hd.slots.forEach((s, r) => {
      let z = hd.b[r];
      for (let j = 0; j < d; j++) z += hd.W[r * d + j] * emb[j];
      slots[s] = z;
    });
    let zu = hd.unknownB;
    for (let j = 0; j < d; j++) zu += hd.unknownW[j] * emb[j];
    return { slots, unknown: zu };
  }

  /**
   * Slot + unknown probabilities from a pooled embedding.
   * headOverride: optional { W, b } shaped like head(level).W / .b (e.g. a
   * retrained "Teach Plotter" head); it may also carry unknownW / unknownB.
   */
  predictFromEmbedding(level, emb, headOverride) {
    this._checkLevel(level);
    const z = this._scores(level, emb, headOverride);
    const slots = {};
    for (const s in z.slots) slots[s] = sigmoid(z.slots[s]);
    return { slots, unknown: sigmoid(z.unknown) };
  }

  /** { slots: {name: prob}, unknown: prob, tokens: [string] } */
  predict(level, text) {
    this._checkLevel(level);
    const tokens = this.tokenizer.tokenize(level, text);
    const emb = this._pool(this.tokenizer.ids(tokens));
    return { ...this.predictFromEmbedding(level, emb), tokens };
  }

  /**
   * Which words did Plotter pick up? Occlusion: drop each whitespace-separated
   * word, re-run the model and see how much each "active" output falls
   * (slots >= threshold, plus "unknown" if it is >= threshold; if nothing is
   * active, the single most likely slot). The fall is measured on the logit
   * (pre-sigmoid score), because a confident 0.999 barely moves in probability
   * when one of several cues is removed.
   *
   * Returns one entry per word, in order, as typed:
   *   { word, slot, weight, dProb }
   *   slot   the active output this word supports most (null if none)
   *   weight logit fall for that slot divided by the largest fall any word
   *          causes for it: 1 = the key word; <= 0 = no support
   *   dProb  raw probability fall when the word is removed
   * Words that normalise to nothing ("!!") or that sit past the 32-token
   * window are not re-run (weight 0). Cost: one forward pass per other word.
   */
  explain(level, text, { threshold = 0.5 } = {}) {
    this._checkLevel(level);
    const tk = this.tokenizer;
    const chunks = String(text ?? '').split(/\s+/).filter(Boolean);
    const run = (words) => {
      const emb = this._pool(tk.ids(tk.tokenizeWords(level, words)));
      const z = this._scores(level, emb);
      return { ...z.slots, unknown: z.unknown };
    };
    const norm = chunks.map((c) => normalise(c));
    const base = run(norm.flat());
    const pBase = Object.fromEntries(Object.entries(base).map(([k, v]) => [k, sigmoid(v)]));
    let active = Object.keys(pBase).filter((k) => pBase[k] >= threshold);
    if (!active.length) {
      const slots = this.levelSlots[level];
      active = [slots.reduce((a, b) => (base[a] >= base[b] ? a : b))];
    }
    // which chunks fall inside the token window?
    let used = 1;
    const inWindow = norm.map((ws) => {
      const start = used;
      for (const w of ws) used += wordpiece(w, tk.vocab).length;
      return ws.length > 0 && start < tk.maxLen;
    });
    const drops = chunks.map((_, i) => {
      if (!inWindow[i]) return null;
      const z = run(norm.filter((__, j) => j !== i).flat());
      return Object.fromEntries(active.map((k) => [k, { dz: base[k] - z[k], dp: pBase[k] - sigmoid(z[k]) }]));
    });
    const maxDz = Object.fromEntries(active.map((k) => [k, Math.max(0, ...drops.map((d) => (d ? d[k].dz : 0)))]));
    return chunks.map((word, i) => {
      const d = drops[i];
      if (!d) return { word, slot: null, weight: 0, dProb: 0 };
      let best = null, bw = -Infinity;
      for (const k of active) {
        const w = maxDz[k] > 1e-6 ? d[k].dz / maxDz[k] : 0;
        if (w > bw) { bw = w; best = k; }
      }
      return { word, slot: bw > 0 ? best : null, weight: bw, dProb: d[best].dp };
    });
  }
}

/**
 * Load the model. Either { jsonUrl, binUrl } (fetch; browser or Node) or
 * { json, bin } with an already parsed plotter.json object (or its text) and the
 * plotter.bin bytes (ArrayBuffer / Uint8Array / Node Buffer).
 */
export async function loadPlotter(opts = {}) {
  let { json, bin } = opts;
  if (json === undefined) json = await fetchJson(opts.jsonUrl ?? 'models/plotter.json');
  if (typeof json === 'string') json = JSON.parse(json);
  if (bin === undefined) bin = await fetchBin(opts.binUrl ?? 'models/plotter.bin');
  const buf = toArrayBuffer(bin);
  if (json.binBytes && buf.byteLength !== json.binBytes) {
    throw new Error(`Plotter: plotter.bin is ${buf.byteLength} bytes, expected ${json.binBytes}`);
  }
  return new Plotter(json, readTensors(json, buf));
}
