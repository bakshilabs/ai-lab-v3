// Read-aloud with recorded human-sounding voices. Every line the game speaks is split into sentences; each
// sentence was recorded in advance (Kokoro neural voices: narrator = British "Isabella", Florence = "Bella")
// and packed into one file per age band. A sentence with no recording (one with a live number, say) is read by
// the best natural voice the device has, never the default robotic one. Nothing is sent anywhere.

// ---- shared with the recorder (voice/collect.mjs): sentence splitting, normalising and keys
export function sentences(text) {
  const t = String(text || '').replace(/[★✕✓☁🌊📔🔎📐⚡🍎🌫🌧♻🏘🌳🚶🚸👪🔥🐝🦌🏫]/gu, '').replace(/\s+/g, ' ').trim();
  if (!t) return [];
  return t.split(/(?<=[.!?…])\s+(?=[“"‘'A-Z0-9])/u).map((s) => s.trim()).filter((s) => /[A-Za-z0-9]/.test(s));
}
export function norm(s) { return String(s).replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim().toLowerCase(); }
export function keyOf(sentence, voice) { let h = 0x811c9dc5; const s = voice + '|' + norm(sentence); for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16).padStart(8, '0'); }

// ---- the recorded pack: voice/pack-<band>.json (index) + small chunk files of clips, back to back. Only the index
// (about 20 KB) and the first chunk are fetched at the start; a chunk of about 200 KB is fetched when a line in it is
// first spoken. (One 10 MB file used to have to arrive before the recorded voice could say anything.)
let pack = null, packBand = null, loading = null;
export function loadVoices(band, base = './voice/') {
  if (packBand === band && (pack || loading)) return loading;
  packBand = band; pack = null;
  loading = (async () => {
    try {
      const idx = await (await fetch(`${base}pack-${band}.json`)).json();
      const files = idx.chunks || [idx.bin]; const clips = new Map();
      for (const c of idx.clips) { const [k, ci, off, len] = c.length === 4 ? c : [c[0], 0, c[1], c[2]]; clips.set(k, { ci, off, len, url: null }); }
      pack = { base, files, bufs: new Map(), clips, type: idx.type || 'audio/mpeg' };
      chunk(0).catch(() => {});
    } catch { pack = null; }
    return !!pack;
  })();
  return loading;
}
function chunk(i, p = pack) {
  if (!p.bufs.has(i)) { const job = fetch(p.base + p.files[i]).then((r) => { if (!r.ok) throw new Error('voice chunk'); return r.arrayBuffer(); }); job.catch(() => p.bufs.delete(i)); p.bufs.set(i, job); }
  return p.bufs.get(i);
}
const clipUrl = async (c, p = pack) => (c.url ||= URL.createObjectURL(new Blob([(await chunk(c.ci, p)).slice(c.off, c.off + c.len)], { type: p.type })));

// ---- fallback: the most natural system voice available
let sysVoice;
function bestSystemVoice() {
  if (sysVoice !== undefined || !('speechSynthesis' in window)) return sysVoice || null;
  const vs = speechSynthesis.getVoices(); if (!vs.length) return null;
  const en = vs.filter((v) => /^en/i.test(v.lang));
  const score = (v) => (/natural|neural|premium|enhanced/i.test(v.name) ? 8 : 0) + (/google uk english female|siri|samantha|serena|martha|kate|libby|sonia|aria|jenny/i.test(v.name) ? 5 : 0) + (/en-GB/i.test(v.lang) ? 2 : 0) + (v.localService ? 0 : 1);
  sysVoice = en.sort((a, b) => score(b) - score(a))[0] || null; return sysVoice;
}
if ('speechSynthesis' in globalThis) try { speechSynthesis.onvoiceschanged = () => { sysVoice = undefined; }; } catch { /* */ }

// ---- playback: one line at a time; a new line stops the old one
const audio = typeof Audio !== 'undefined' ? new Audio() : null; let queue = [], token = 0;
// the music dips while a line is read (set by main.js: engine/audio.js duck)
let onSpeaking = null; export function setSpeakingHook(fn) { onSpeaking = fn; }
export function canSpeak() { return !!pack || ('speechSynthesis' in globalThis && !!bestSystemVoice()); }
export function stopSpeech() { token++; queue = []; try { audio?.pause(); } catch { /* */ } try { speechSynthesis.cancel(); } catch { /* */ } onSpeaking?.(false); }
export function speak(text, { voice = 'narrator' } = {}) {
  stopSpeech(); const my = token;
  queue = sentences(text).map((s) => ({ s, clip: pack?.clips.get(keyOf(s, voice)) }));
  if (globalThis.__sayLog) globalThis.__sayLog.push({ text, voice, missing: queue.filter((q) => !q.clip).map((q) => q.s) });
  const next = () => {
    if (my !== token) return; if (!queue.length) { onSpeaking?.(false); return; } onSpeaking?.(true); const q = queue.shift();
    const sys = () => { const v = bestSystemVoice(); if (!v) return next();
      try { const u = new SpeechSynthesisUtterance(q.s); u.voice = v; u.lang = v.lang; u.rate = 0.96; u.onend = next; u.onerror = next; speechSynthesis.speak(u); } catch { next(); } };
    // a clip whose chunk can't be fetched (offline, a dropped connection) is read by the device's voice instead
    if (q.clip && audio) { clipUrl(q.clip).then((url) => { if (my !== token) return; audio.src = url; audio.onended = next; audio.onerror = next; audio.play().catch(next); }, () => { if (my === token) sys(); }); return; }
    return sys();
  };
  for (const q of queue) if (q.clip && pack) chunk(q.clip.ci).catch(() => {}); // the whole line's chunks, so sentences follow without a gap
  next();
}
