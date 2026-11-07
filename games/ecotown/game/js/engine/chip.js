// A tiny chip voice set in plain WebAudio, in the style of 8-bit consoles: two pulse waves with duty
// cycles (12.5 / 25 / 50 / 75 %), a triangle for bass and a noise channel (long hiss, or short "metallic"
// for hats). Every note has its own envelope with a short attack so nothing clicks. No audio files.
// Everything takes an engine E = { ctx, dest } so the same code plays live or renders offline (tests).

const cache = new WeakMap();
function store(ctx) { if (!cache.has(ctx)) cache.set(ctx, { waves: {}, noise: {} }); return cache.get(ctx); }

// a pulse wave of the given duty from its Fourier series (band-limited, so no aliasing)
export function pulseWave(ctx, duty = 0.5) {
  const S = store(ctx); if (S.waves[duty]) return S.waves[duty];
  const N = 48; const real = new Float32Array(N), imag = new Float32Array(N);
  for (let n = 1; n < N; n++) { real[n] = (2 / (n * Math.PI)) * Math.sin(n * Math.PI * duty); imag[n] = 0; }
  return (S.waves[duty] = ctx.createPeriodicWave(real, imag, { disableNormalization: false }));
}
// white noise; `short` is a tiny looped buffer that sounds metallic and pitched (hats, ticks)
export function noiseBuffer(ctx, short = false) {
  const S = store(ctx); const k = short ? 's' : 'l'; if (S.noise[k]) return S.noise[k];
  const len = short ? 93 : ctx.sampleRate; const b = ctx.createBuffer(1, len, ctx.sampleRate); const d = b.getChannelData(0);
  let seed = 0x1234; for (let i = 0; i < len; i++) { seed = (seed * 1103515245 + 12345) & 0x7fffffff; d[i] = (seed / 0x3fffffff) - 1; }
  return (S.noise[k] = b);
}
export const midiHz = (m) => 440 * Math.pow(2, (m - 69) / 12);

// one note. ch: 'p' pulse, 't' triangle, 'n' noise. f (Hz) or midi. env [attack, decay, sustain level, release] in s.
export function note(E, { ch = 'p', midi = null, f = null, t, dur = 0.1, vol = 0.2, duty = 0.5, env = [0.003, 0.06, 0.6, 0.05], slide = 0, short = false, filter = null }) {
  const { ctx, dest } = E; if (!ctx) return;
  const freq = f ?? midiHz(midi ?? 69);
  const [a, d, s, r] = env; const g = ctx.createGain(); const end = t + dur + r;
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + Math.max(0.002, a)); g.gain.linearRampToValueAtTime(vol * s, t + a + d);
  g.gain.setValueAtTime(vol * s, t + dur); g.gain.linearRampToValueAtTime(0, end);
  let src;
  if (ch === 'n') { src = ctx.createBufferSource(); src.buffer = noiseBuffer(ctx, short); src.loop = true; src.playbackRate.setValueAtTime(freq / 1000, t); if (slide) src.playbackRate.exponentialRampToValueAtTime(Math.max(0.01, (freq * slide) / 1000), t + dur); }
  else { src = ctx.createOscillator(); if (ch === 't') src.type = 'triangle'; else src.setPeriodicWave(pulseWave(ctx, duty)); src.frequency.setValueAtTime(freq, t); if (slide) src.frequency.exponentialRampToValueAtTime(Math.max(20, freq * slide), t + dur); }
  let out = g;
  if (filter) { const fl = ctx.createBiquadFilter(); fl.type = filter.type || 'lowpass'; fl.frequency.setValueAtTime(filter.f0 || 800, t); if (filter.f1) fl.frequency.exponentialRampToValueAtTime(filter.f1, t + dur); fl.Q.value = filter.q || 1; src.connect(fl); fl.connect(g); } else src.connect(g);
  out.connect(dest); src.start(t); src.stop(end + 0.02);
  src.onended = () => { try { out.disconnect(); } catch { /* */ } };
}
// a quick run of notes (arpeggios, fanfares): [[midi, dur], ...] from time t
export function run(E, notes, t, { ch = 'p', vol = 0.18, duty = 0.25, gap = 0 } = {}) {
  let tt = t; for (const [m, d, v] of notes) { if (m != null) note(E, { ch, midi: m, t: tt, dur: d * 0.9, vol: v ?? vol, duty }); tt += d + gap; } return tt;
}
