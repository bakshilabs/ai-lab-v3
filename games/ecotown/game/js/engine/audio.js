// Tiny WebAudio synth: placement pops, reveals, rewards and a gentle music bed whose layers follow
// the act. No audio files. Starts only after a user gesture (browser rule).
let ctx = null, master = null, music = null, on = true;
export function initAudio() {
  if (ctx) return ctx;
  try { ctx = new (window.AudioContext || window.webkitAudioContext)(); master = ctx.createGain(); master.gain.value = 0.5; master.connect(ctx.destination); } catch { ctx = null; }
  return ctx;
}
export function setSound(v) { on = v; if (master) master.gain.value = v ? 0.5 : 0; }
function tone(f, t0, dur, { type = 'sine', vol = 0.2, slide = 0 } = {}) {
  if (!ctx || !on) return; const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type; o.frequency.setValueAtTime(f, t0); if (slide) o.frequency.exponentialRampToValueAtTime(f * slide, t0 + dur);
  g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(vol, t0 + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g); g.connect(master); o.start(t0); o.stop(t0 + dur + 0.05);
}
export const sfx = {
  pop(i = 0) { if (!ctx) return; const t = ctx.currentTime; tone(420 + (i % 5) * 60, t, 0.14, { type: 'triangle', vol: 0.18, slide: 1.6 }); },
  ghost(i = 0) { if (!ctx) return; tone(880 + (i % 4) * 110, ctx.currentTime, 0.08, { vol: 0.05 }); },
  tap() { if (!ctx) return; tone(660, ctx.currentTime, 0.06, { type: 'square', vol: 0.05 }); },
  bad() { if (!ctx) return; const t = ctx.currentTime; tone(330, t, 0.25, { type: 'sawtooth', vol: 0.08, slide: 0.7 }); tone(247, t + 0.18, 0.35, { type: 'sawtooth', vol: 0.07, slide: 0.8 }); },
  good() { if (!ctx) return; const t = ctx.currentTime; [523, 659, 784].forEach((f, i) => tone(f, t + i * 0.09, 0.3, { type: 'triangle', vol: 0.16 })); },
  reward() { if (!ctx) return; const t = ctx.currentTime; [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, t + i * 0.08, 0.5, { type: 'triangle', vol: 0.14 })); },
  whoosh() { if (!ctx) return; tone(200, ctx.currentTime, 0.5, { type: 'sine', vol: 0.06, slide: 3 }); },
};
// Music bed: a slow pad; 'calm' (plan/check), 'busy' (build/live), 'night' (winter test), 'off'
export function setMusic(mood) {
  if (!ctx || !on) return; if (music) { music.stop(); music = null; } if (mood === 'off') return;
  const chords = { calm: [[262, 330, 392], [220, 277, 330], [247, 311, 370], [196, 247, 294]], busy: [[294, 370, 440], [330, 415, 494], [262, 330, 392], [294, 370, 440]], night: [[196, 233, 294], [175, 220, 262]] }[mood] || [[262, 330, 392]];
  let alive = true, i = 0;
  const step = () => { if (!alive) return; const t = ctx.currentTime; for (const f of chords[i++ % chords.length]) tone(f / 2, t, 3.8, { vol: 0.035 }); if (mood === 'busy') [0, 0.5, 1, 1.5].forEach((d, j) => tone(chords[(i - 1) % chords.length][j % 3] * 2, t + d, 0.25, { type: 'triangle', vol: 0.025 })); setTimeout(step, 3600); };
  step(); music = { stop: () => { alive = false; } };
}
