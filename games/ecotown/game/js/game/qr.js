// A small QR code maker, written for Eco Town from the public standard (ISO/IEC 18004). Pure: text in, a grid of
// dark and light squares out. It runs on the device and uses no network, no library and no fonts.
// Supports versions 1–40, error-correction levels L and M, and two kinds of segment: bytes (any text, as UTF-8) and
// alphanumeric (digits, capitals and " $%*+-./:", which a town code fits, at 5.5 bits a character instead of 8).
// qrMatrix(segmentsOrText, { ecl }) → { size, version, ecl, mask, rows: [[true = dark, …], …] }, or null if too long.
// Checked by tests/qr.test.mjs against known answers and, during development, by reading the pictures back.

const ALNUM = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:';
const ECC = {
  L: { fmt: 1, cw: [0, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    blocks: [0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25] },
  M: { fmt: 0, cw: [0, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28],
    blocks: [0, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49] },
};

export const isAlnum = (s) => [...String(s)].every((c) => ALNUM.includes(c));
export const bytesSeg = (text) => ({ mode: 4, bytes: [...new TextEncoder().encode(String(text))] });
export const alnumSeg = (text) => ({ mode: 2, text: String(text) });
// one segment for a whole text: alphanumeric when every character allows it, else bytes
export const autoSegs = (text) => (text === '' ? [] : [isAlnum(text) ? alnumSeg(text) : bytesSeg(text)]);

function rawModules(v) {
  let r = (16 * v + 128) * v + 64;
  if (v >= 2) { const n = Math.floor(v / 7) + 2; r -= (25 * n - 10) * n - 55; if (v >= 7) r -= 36; }
  return r;
}
const dataCodewords = (v, ecl) => Math.floor(rawModules(v) / 8) - ECC[ecl].cw[v] * ECC[ecl].blocks[v];
const countBits = (mode, v) => (mode === 4 ? (v <= 9 ? 8 : 16) : v <= 9 ? 9 : v <= 26 ? 11 : 13);
function segBits(seg, v) {
  const n = seg.mode === 4 ? seg.bytes.length : seg.text.length;
  if (n >= 1 << countBits(seg.mode, v)) return Infinity;
  return 4 + countBits(seg.mode, v) + (seg.mode === 4 ? 8 * n : 11 * Math.floor(n / 2) + 6 * (n % 2));
}

// ---- Reed–Solomon over GF(256), polynomial 0x11D
function mul(x, y) { let z = 0; for (let i = 7; i >= 0; i--) { z = (z << 1) ^ ((z >>> 7) * 0x11d); z ^= ((y >>> i) & 1) * x; } return z; }
function divisor(deg) {
  const r = new Array(deg).fill(0); r[deg - 1] = 1; let root = 1;
  for (let i = 0; i < deg; i++) { for (let j = 0; j < deg; j++) { r[j] = mul(r[j], root); if (j + 1 < deg) r[j] ^= r[j + 1]; } root = mul(root, 2); }
  return r;
}
function remainder(data, div) {
  const r = div.map(() => 0);
  for (const b of data) { const f = b ^ r.shift(); r.push(0); div.forEach((c, i) => { r[i] ^= mul(c, f); }); }
  return r;
}

export function qrMatrix(input, { ecl = 'L', boost = true, minVersion = 1 } = {}) {
  const segs = typeof input === 'string' ? autoSegs(input) : input;
  for (const s of segs) if (s.mode === 2 && !isAlnum(s.text)) return null;
  let v = 0;
  for (let t = minVersion; t <= 40 && !v; t++) if (segs.reduce((a, s) => a + segBits(s, t), 0) <= dataCodewords(t, ecl) * 8) v = t;
  if (!v) return null;
  const used = segs.reduce((a, s) => a + segBits(s, v), 0);
  if (boost && ecl === 'L' && used <= dataCodewords(v, 'M') * 8) ecl = 'M'; // stronger correction when it costs no size

  // ---- the data bits: segments, terminator, padding
  const bits = []; const put = (val, n) => { for (let i = n - 1; i >= 0; i--) bits.push((val >>> i) & 1); };
  for (const s of segs) {
    put(s.mode, 4);
    if (s.mode === 4) { put(s.bytes.length, countBits(4, v)); for (const b of s.bytes) put(b, 8); }
    else { put(s.text.length, countBits(2, v)); for (let i = 0; i + 1 < s.text.length; i += 2) put(ALNUM.indexOf(s.text[i]) * 45 + ALNUM.indexOf(s.text[i + 1]), 11); if (s.text.length % 2) put(ALNUM.indexOf(s.text[s.text.length - 1]), 6); }
  }
  const cap = dataCodewords(v, ecl) * 8;
  put(0, Math.min(4, cap - bits.length)); put(0, (8 - (bits.length % 8)) % 8);
  for (let pad = 0xec; bits.length < cap; pad ^= 0xec ^ 0x11) put(pad, 8);
  const data = []; for (let i = 0; i < bits.length; i += 8) data.push(bits.slice(i, i + 8).reduce((a, b) => (a << 1) | b, 0));

  // ---- error correction, block by block, then interleaved
  const nb = ECC[ecl].blocks[v], el = ECC[ecl].cw[v], rawCw = Math.floor(rawModules(v) / 8);
  const nShort = nb - (rawCw % nb), shortLen = Math.floor(rawCw / nb); const div = divisor(el); const blocks = [];
  for (let i = 0, k = 0; i < nb; i++) {
    const dat = data.slice(k, k + shortLen - el + (i < nShort ? 0 : 1)); k += dat.length;
    const ec = remainder(dat, div); if (i < nShort) dat.push(0);
    blocks.push(dat.concat(ec));
  }
  const all = [];
  for (let i = 0; i < blocks[0].length; i++) blocks.forEach((b, j) => { if (i !== shortLen - el || j >= nShort) all.push(b[i]); });

  // ---- the fixed patterns
  const size = v * 4 + 17; const dark = Array.from({ length: size }, () => new Array(size).fill(false)); const fixed = Array.from({ length: size }, () => new Array(size).fill(false));
  const set = (x, y, d) => { dark[y][x] = !!d; fixed[y][x] = true; };
  for (let i = 0; i < size; i++) { set(6, i, i % 2 === 0); set(i, 6, i % 2 === 0); }
  const finder = (cx, cy) => { for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) { const d = Math.max(Math.abs(dx), Math.abs(dy)); const x = cx + dx, y = cy + dy; if (x >= 0 && x < size && y >= 0 && y < size) set(x, y, d !== 2 && d !== 4); } };
  finder(3, 3); finder(size - 4, 3); finder(3, size - 4);
  const align = [];
  if (v > 1) { const n = Math.floor(v / 7) + 2; const step = v === 32 ? 26 : Math.ceil((v * 4 + 4) / (n * 2 - 2)) * 2; for (let p = size - 7; align.length < n - 1; p -= step) align.unshift(p); align.unshift(6); }
  align.forEach((ax, i) => align.forEach((ay, j) => {
    if ((i === 0 && j === 0) || (i === 0 && j === align.length - 1) || (i === align.length - 1 && j === 0)) return;
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) set(ax + dx, ay + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
  }));
  const format = (mask) => {
    const d = (ECC[ecl].fmt << 3) | mask; let rem = d; for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
    const b = ((d << 10) | rem) ^ 0x5412; const bit = (i) => (b >>> i) & 1;
    for (let i = 0; i <= 5; i++) set(8, i, bit(i)); set(8, 7, bit(6)); set(8, 8, bit(7)); set(7, 8, bit(8)); for (let i = 9; i < 15; i++) set(14 - i, 8, bit(i));
    for (let i = 0; i < 8; i++) set(size - 1 - i, 8, bit(i)); for (let i = 8; i < 15; i++) set(8, size - 15 + i, bit(i)); set(8, size - 8, 1);
  };
  format(0); // reserves the format squares before the data goes in
  if (v >= 7) { let rem = v; for (let i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1f25); const b = (v << 12) | rem; for (let i = 0; i < 18; i++) { const d = (b >>> i) & 1; const a = size - 11 + (i % 3), c = Math.floor(i / 3); set(a, c, d); set(c, a, d); } }

  // ---- the data, in the two-column zigzag from the bottom right
  { let i = 0;
    for (let right = size - 1; right >= 1; right -= 2) { if (right === 6) right = 5;
      for (let vert = 0; vert < size; vert++) for (let j = 0; j < 2; j++) { const x = right - j; const up = ((right + 1) & 2) === 0; const y = up ? size - 1 - vert : vert;
        if (!fixed[y][x] && i < all.length * 8) { dark[y][x] = ((all[i >>> 3] >>> (7 - (i & 7))) & 1) === 1; i++; } } } }

  // ---- the mask with the lowest penalty
  const MASK = [(x, y) => (x + y) % 2 === 0, (x, y) => y % 2 === 0, (x) => x % 3 === 0, (x, y) => (x + y) % 3 === 0, (x, y) => (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0,
    (x, y) => ((x * y) % 2) + ((x * y) % 3) === 0, (x, y) => (((x * y) % 2) + ((x * y) % 3)) % 2 === 0, (x, y) => (((x + y) % 2) + ((x * y) % 3)) % 2 === 0];
  const flip = (m) => { for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (!fixed[y][x] && MASK[m](x, y)) dark[y][x] = !dark[y][x]; };
  const penalty = () => {
    let p = 0, darks = 0;
    const line = (get) => { let run = 0, colour = null, hist = ''; for (let i = 0; i < size; i++) { const c = get(i); hist += c ? '1' : '0'; if (c === colour) { run++; if (run === 5) p += 3; else if (run > 5) p++; } else { colour = c; run = 1; } }
      for (const pat of ['10111010000', '00001011101']) { let at = hist.indexOf(pat); while (at >= 0) { p += 40; at = hist.indexOf(pat, at + 1); } } };
    for (let y = 0; y < size; y++) { line((i) => dark[y][i]); line((i) => dark[i][y]); for (let x = 0; x < size; x++) { if (dark[y][x]) darks++; if (x + 1 < size && y + 1 < size && dark[y][x] === dark[y][x + 1] && dark[y][x] === dark[y + 1][x] && dark[y][x] === dark[y + 1][x + 1]) p += 3; } }
    return p + Math.floor(Math.abs(darks * 20 - size * size * 10) / (size * size)) * 10;
  };
  let best = 0, bestP = Infinity;
  for (let m = 0; m < 8; m++) { flip(m); format(m); const p = penalty(); if (p < bestP) { bestP = p; best = m; } flip(m); }
  flip(best); format(best);
  return { size, version: v, ecl, mask: best, rows: dark };
}
