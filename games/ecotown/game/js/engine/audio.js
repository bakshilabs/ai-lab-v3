// Eco Town's sound: an original 8-bit-style chip engine (chip.js) with music and sound-effect buses, a limiter
// so nothing is ever loud or sudden, music that dips while Florence speaks, and four original loops
// (music/songs.js) that crossfade on the bar. No audio files. Starts only after a user gesture (browser rule).
// Every phrase is written for this game: chip *style*, never a melody or sound from another game.
// The same code renders offline for tests: createEngine(ctx) + renderSong / makeSfx(E).
import { note, run } from './chip.js';
import { SONGS } from '../music/songs.js';

const LEVEL = { master: 0.9, music: 0.25, sfx: 0.6 };
let E = null; let on = true, musicOn = true, sfxOn = true, ducked = false;

// buses: sfx + music → master → limiter → out
export function createEngine(ctx, out = ctx.destination) {
  const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -14; comp.knee.value = 6; comp.ratio.value = 12; comp.attack.value = 0.003; comp.release.value = 0.15;
  const master = ctx.createGain(); master.gain.value = LEVEL.master; master.connect(comp); comp.connect(out);
  const music = ctx.createGain(); music.gain.value = LEVEL.music; music.connect(master);
  const sfxBus = ctx.createGain(); sfxBus.gain.value = LEVEL.sfx; sfxBus.connect(master);
  return { ctx, master, music, sfxBus, fx: { ctx, dest: sfxBus }, player: null, mood: null, prev: null, timer: null };
}
export function initAudio() {
  if (E) return E.ctx;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)(); E = createEngine(ctx);
    // iOS and Chromebooks: resume on any gesture, play one silent sample, and resume again when the tab comes back
    const unlock = () => { if (ctx.state !== 'running') ctx.resume().catch(() => {}); try { const b = ctx.createBuffer(1, 1, 22050); const s = ctx.createBufferSource(); s.buffer = b; s.connect(ctx.destination); s.start(0); } catch { /* */ } };
    for (const ev of ['pointerup', 'touchend', 'keydown']) addEventListener(ev, unlock, { passive: true });
    document.addEventListener('visibilitychange', () => { if (!document.hidden) unlock(); });
    try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch { /* */ }
    unlock(); applyLevels();
  } catch { E = null; }
  return E?.ctx || null;
}
function applyLevels(fade = 0.15) {
  if (!E) return; const t = E.ctx.currentTime;
  const set = (p, v, d = fade) => { p.cancelScheduledValues(t); p.setValueAtTime(p.value, t); p.linearRampToValueAtTime(v, t + d); };
  set(E.master.gain, on ? LEVEL.master : 0); set(E.sfxBus.gain, sfxOn ? LEVEL.sfx : 0);
  set(E.music.gain, musicOn ? LEVEL.music * (ducked ? 0.25 : 1) : 0, ducked ? 0.15 : 0.6);
}
export function setSound(v) { on = v; applyLevels(); }
export function setMusicOn(v) { musicOn = v; applyLevels(); if (!v) stopMusic(); else if (E && !E.player && E.mood) setMusic(E.mood); }
export function setSfxOn(v) { sfxOn = v; applyLevels(); }
// music dips to a quarter while a voice line plays (150 ms down, 600 ms back)
export function duck(v) { if (ducked === v) return; ducked = v; applyLevels(); }

// ---------------- the loop player: look-ahead scheduling (25 ms timer, 120 ms ahead)
const STEPS = 16;
function makePlayer(EN, song, t0) {
  const ctx = EN.ctx; const gain = ctx.createGain(); gain.gain.value = 0; gain.connect(EN.music);
  const dest = { ctx, dest: gain }; const step = 60 / song.bpm / 4; const P = { song, gain, t0, step, nextStep: 0, pass: -1, events: [], passLen: 0, passStart: 0, done: false, started: t0, quiet: false, quietUntil: 0 };
  // build one pass: pick a variant for each slot; the lead rests on every other pass
  P.buildPass = () => {
    P.pass++; const ev = []; let off = 0;
    for (const slot of song.order) {
      const sec = song.sections[slot[(P.pass * 7 + off / 64 + Math.floor(Math.random() * slot.length)) % slot.length]];
      const leadOn = (P.pass % 2 === 0 || song.once) && !P.quiet;
      if (leadOn) for (const [s, m, l] of sec.lead) ev.push({ s: off + s, ch: 'p', m, l, v: song.vol.lead, duty: song.duty[0] });
      if (!P.quiet) for (const [s, m, l] of song.arp(sec.chords)) ev.push({ s: off + s, ch: 'p', m, l, v: song.vol.harm, duty: song.duty[1] });
      for (const [s, m, l] of song.bass(sec.chords)) ev.push({ s: off + s, ch: 't', m, l, v: song.vol.bass });
      for (const [s, k] of song.drums(sec.chords.length)) if (!P.quiet || k === 'h') ev.push({ s: off + s, ch: 'n', k, v: song.vol.drum });
      off += sec.chords.length * STEPS;
    }
    ev.sort((a, b) => a.s - b.s); P.events = ev; P.passLen = off; P.cursor = 0;
  };
  P.schedule = (until) => {
    while (!P.done) {
      if (P.cursor === undefined || P.cursor >= P.events.length) {
        if (P.pass >= 0) { P.passStart += P.passLen; if (song.once) { P.done = true; P.endT = t0 + P.passStart * step; break; } }
        // anti-fatigue: after about three minutes, 24 seconds of just bass and hats
        const now = t0 + P.passStart * step;
        if (!P.quiet && now - P.started > 180) { P.quiet = true; P.quietUntil = now + 24; }
        else if (P.quiet && now >= P.quietUntil) { P.quiet = false; P.started = now; }
        P.buildPass();
      }
      const e = P.events[P.cursor]; const t = t0 + (P.passStart + e.s) * step; if (t > until) break; P.cursor++;
      if (e.ch === 'n') {
        if (e.k === 'k') note(dest, { ch: 't', f: 110, t, dur: 0.06, vol: e.v * 3, slide: 0.4, env: [0.002, 0.04, 0.2, 0.03] });
        else if (e.k === 's') note(dest, { ch: 'n', f: 1800, t, dur: 0.07, vol: e.v * 1.6, env: [0.002, 0.05, 0.2, 0.04] });
        else note(dest, { ch: 'n', f: 9000, t, dur: 0.025, vol: e.v, short: true, env: [0.002, 0.02, 0.1, 0.02] });
      } else note(dest, { ch: e.ch, midi: e.m, t, dur: e.l * step * 0.85, vol: e.v, duty: e.duty, env: e.ch === 't' ? [0.004, 0.05, 0.9, 0.04] : [0.003, 0.07, 0.55, 0.05] });
    }
  };
  P.nextBar = (after) => { const bar = step * STEPS; return t0 + Math.ceil((after - t0) / bar + 1e-6) * bar; };
  return P;
}
// render a song into an engine for `seconds` (tests and offline previews)
export function renderSong(EN, mood, seconds) { const P = makePlayer(EN, SONGS[mood], 0.05); P.gain.gain.value = 1; P.schedule(seconds); return P; }

function stopMusic() { if (!E?.player) return; const P = E.player; const t = E.ctx.currentTime; P.gain.gain.cancelScheduledValues(t); P.gain.gain.setTargetAtTime(0, t, 0.3); P.done = true; E.player = null; }
// moods: 'day' | 'night' | 'lab' | 'celebrate' | 'off' (older names map onto these)
export function setMusic(mood) {
  if (!E) return; mood = { calm: 'day', busy: 'day', winter: 'night' }[mood] || mood;
  if (mood === 'off') { E.mood = null; return stopMusic(); }
  if (!SONGS[mood]) return;
  if (mood !== 'celebrate') E.prev = mood;
  if (E.mood === mood && E.player) return; E.mood = mood;
  if (!musicOn || !on) return;
  const ctx = E.ctx; const now = ctx.currentTime; const old = E.player;
  const t0 = old ? old.nextBar(now + 0.05) : now + 0.08;
  const P = makePlayer(E, SONGS[mood], t0); E.player = P;
  P.gain.gain.setValueAtTime(0, Math.max(now, t0 - 0.01)); P.gain.gain.linearRampToValueAtTime(1, t0 + (old ? 1.5 : 1.0));
  if (old) { old.gain.gain.setValueAtTime(1, t0); old.gain.gain.linearRampToValueAtTime(0, t0 + 1.5); setTimeout(() => { old.done = true; }, (t0 - now + 1.6) * 1000); }
  if (!E.timer) E.timer = setInterval(tickMusic, 25);
}
function tickMusic() {
  if (!E) return; const until = E.ctx.currentTime + 0.12;
  if (E.player) {
    E.player.schedule(until);
    // a one-off tune (celebrate) hands back to the mood that was playing
    if (E.player.done && E.player.song.once && E.ctx.currentTime > (E.player.endT || 0)) { const back = E.prev || 'day'; E.player = null; E.mood = null; setMusic(back); }
  }
}

// ---------------- sound effects (all original; quiet, short, each paired with something on screen)
const PENTA = [0, 2, 4, 7, 9, 12, 14, 16];
const CAT_BASE = { land: 72, move: 81, homes: 72, food: 79, power: 76, heart: 86 };
export function makeSfx(EN) {
  const fx = EN.fx; const T = () => EN.ctx.currentTime + 0.005;
  return {
    // placing a build: two quick notes a fourth apart, pitched by category, stepping up through a run of placements
    pop(i = 0, cat = 'homes') { const t = T(); const m = (CAT_BASE[cat] ?? 72) + PENTA[Math.min(7, i % 8)]; note(fx, { midi: m, t, dur: 0.05, vol: 0.12, duty: 0.25 }); note(fx, { midi: m + 5, t: t + 0.055, dur: 0.07, vol: 0.12, duty: 0.25 }); },
    remove() { const t = T(); note(fx, { f: 600, t, dur: 0.08, vol: 0.1, duty: 0.5, slide: 0.42 }); note(fx, { ch: 'n', f: 2500, t, dur: 0.03, vol: 0.04 }); },
    bad() { const t = T(); note(fx, { midi: 57, t, dur: 0.07, vol: 0.07, duty: 0.125 }); note(fx, { midi: 56, t: t + 0.08, dur: 0.09, vol: 0.07, duty: 0.125 }); },
    ghost(i = 0) { note(fx, { midi: 84 + PENTA[i % 5], t: T(), dur: 0.04, vol: 0.035, duty: 0.125 }); },
    tap() { note(fx, { midi: 79, t: T(), dur: 0.03, vol: 0.05, duty: 0.25, env: [0.002, 0.02, 0.3, 0.02] }); },
    good() { run(fx, [[72, 0.06], [76, 0.06], [79, 0.14]], T(), { vol: 0.11, duty: 0.25 }); },
    reward() { run(fx, [[72, 0.05], [76, 0.05], [79, 0.05], [84, 0.05], [88, 0.18]], T(), { vol: 0.1, duty: 0.25 }); },
    whoosh() { note(fx, { ch: 'n', f: 300, t: T(), dur: 0.35, vol: 0.05, slide: 6, filter: { f0: 400, f1: 3000 } }); },
    unlock() { const t = T(); run(fx, [[60, 0.035], [64, 0.035], [67, 0.035], [72, 0.035], [76, 0.035], [79, 0.035], [84, 0.2]], t, { vol: 0.1, duty: 0.25 }); note(fx, { ch: 't', midi: 48, t, dur: 0.4, vol: 0.12 }); },
    star() { const t = T(); note(fx, { midi: 91, t, dur: 0.05, vol: 0.09, duty: 0.25 }); note(fx, { midi: 98, t: t + 0.055, dur: 0.25, vol: 0.09, duty: 0.25, env: [0.002, 0.2, 0.3, 0.05] }); note(fx, { midi: 86, t: t + 0.12, dur: 0.18, vol: 0.03, duty: 0.25 }); },
    fanfare() { const t = T(); const e = 60 / 160 / 2; run(fx, [[72, e], [76, e], [77, e], [81, e], [79, e], [83, e], [84, e * 4]], t, { vol: 0.11, duty: 0.5 }); run(fx, [[64, e * 2], [69, e * 2], [71, e * 2], [76, e * 4]], t, { vol: 0.06, duty: 0.25 }); run(fx, [[48, e * 2], [53, e * 2], [55, e * 2], [48, e * 4]], t, { ch: 't', vol: 0.13 }); for (let i = 0; i < 4; i++) note(fx, { ch: 'n', f: 1800, t: t + e * 6 + i * 0.05, dur: 0.04, vol: 0.04 }); },
    step() { note(fx, { ch: 'n', f: 700 * (0.9 + Math.random() * 0.2), t: T(), dur: 0.015, vol: 0.025, short: false, filter: { type: 'highpass', f0: 1200 } }); },
    talk() { note(fx, { ch: 't', midi: [72, 74, 76, 79, 81][Math.floor(Math.random() * 5)] + 12, t: T(), dur: 0.04, vol: 0.05 }); },
    tip() { const t = T(); note(fx, { ch: 't', midi: 88, t, dur: 0.06, vol: 0.09 }); note(fx, { ch: 't', midi: 93, t: t + 0.07, dur: 0.1, vol: 0.09 }); },
    door() { const t = T(); note(fx, { ch: 'n', f: 500, t, dur: 0.3, vol: 0.05, filter: { f0: 400, f1: 3000 } }); note(fx, { ch: 't', midi: 48, t: t + 0.3, dur: 0.08, vol: 0.12 }); },
    flaw() { const t = T(); note(fx, { midi: 76, t, dur: 0.12, vol: 0.08, duty: 0.5 }); note(fx, { midi: 73, t: t + 0.13, dur: 0.18, vol: 0.08, duty: 0.5 }); },
    pass() { const t = T(); run(fx, [[72, 0.05], [76, 0.05], [79, 0.05]], t, { vol: 0.09, duty: 0.25 }); note(fx, { midi: 84, t: t + 0.15, dur: 0.2, vol: 0.08, duty: 0.125 }); note(fx, { midi: 79, t: t + 0.15, dur: 0.2, vol: 0.05, duty: 0.25 }); },
    dusk() { note(fx, { ch: 't', midi: 67, t: T(), dur: 1.4, vol: 0.06, slide: 0.75, env: [0.3, 0.4, 0.6, 0.4] }); },
    dawn() { note(fx, { ch: 't', midi: 60, t: T(), dur: 1.4, vol: 0.06, slide: 1.5, env: [0.3, 0.4, 0.6, 0.4] }); },
    complete(reduce = false) { this.fanfare(); if (reduce) return; const t = T() + 1.0; for (let i = 0; i < 10; i++) note(fx, { midi: 88 + PENTA[(i * 3) % 8], t: t + i * 0.08, dur: 0.05, vol: 0.04, duty: 0.125 }); },
  };
}
// the live sound effects: every call is safe before initAudio (it simply does nothing)
let liveFx = null;
export const sfx = new Proxy({}, { get: (_, k) => (...a) => { if (!E || !on || !sfxOn) return; liveFx ||= makeSfx(E); return liveFx[k]?.(...a); } });
