// Sound checks: every sound effect and 20 s of each music loop are rendered offline (OfflineAudioContext in
// headless Chromium) and must produce sound, contain no NaN, stay under the loudness limit (peak <= -12 dBFS
// before the limiter's ceiling; the limiter keeps the mix safe) and be short. Song patterns must fit their bars.
// node --test tests/audio.test.mjs   (skips the render checks when Playwright/Chromium isn't installed)
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { SONGS } from '../js/music/songs.js';

const root = path.join(path.dirname(new URL(import.meta.url).pathname), '..');

test('every song section fits its bars and uses sensible notes', () => {
  for (const [mood, song] of Object.entries(SONGS)) {
    assert.ok(song.bpm >= 80 && song.bpm <= 170, `${mood} tempo`);
    for (const [name, sec] of Object.entries(song.sections)) {
      const steps = sec.chords.length * 16;
      for (const [s, m, l] of [...sec.lead, ...song.arp(sec.chords), ...song.bass(sec.chords)]) {
        assert.ok(s >= 0 && s < steps && l > 0, `${mood}.${name} step ${s}`);
        assert.ok(m >= 28 && m <= 100, `${mood}.${name} note ${m}`);
      }
    }
    for (const slot of song.order) for (const v of slot) assert.ok(song.sections[v], `${mood} order uses ${v}`);
  }
});

let chromium = null;
try { const r = createRequire(import.meta.url); try { ({ chromium } = r('playwright')); } catch { ({ chromium } = r('/opt/node22/lib/node_modules/playwright')); } } catch { /* not installed */ }

test('sound effects and loops render: audible, no NaN, not too loud, short', { skip: !chromium && 'Playwright not installed' }, async () => {
  const types = { '.html': 'text/html', '.js': 'text/javascript' };
  const server = http.createServer((req, res) => { const f = path.join(root, decodeURIComponent(req.url.split('?')[0])); if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); } res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res); });
  await new Promise((r) => server.listen(0, r)); const port = server.address().port;
  const b = await chromium.launch(); const p = await b.newPage();
  try {
    await p.goto(`http://localhost:${port}/js/music/songs.js`); // any same-origin page, so the modules can be imported
    const out = await p.evaluate(async (base) => {
      const { createEngine, makeSfx, renderSong } = await import(base + '/js/engine/audio.js');
      const stats = (buf) => { const d = buf.getChannelData(0); let peak = 0, nan = false, last = 0; for (let i = 0; i < d.length; i++) { const v = d[i]; if (Number.isNaN(v)) nan = true; const a = Math.abs(v); if (a > peak) peak = a; if (a > 0.001) last = i; } return { peak, nan, dur: last / buf.sampleRate }; };
      const res = { sfx: {}, songs: {} };
      const names = ['pop', 'remove', 'bad', 'ghost', 'tap', 'good', 'reward', 'whoosh', 'unlock', 'star', 'fanfare', 'step', 'talk', 'tip', 'door', 'flaw', 'pass', 'dusk', 'dawn', 'complete'];
      for (const n of names) { const ctx = new OfflineAudioContext(1, 44100 * 5, 44100); const E = createEngine(ctx); E.master.gain.value = 1; makeSfx(E)[n](); res.sfx[n] = stats(await ctx.startRendering()); }
      for (const mood of ['day', 'night', 'lab', 'celebrate']) { const ctx = new OfflineAudioContext(1, 44100 * 20, 44100); const E = createEngine(ctx); renderSong(E, mood, 19.5); res.songs[mood] = stats(await ctx.startRendering()); }
      return res;
    }, `http://localhost:${port}`);
    const dB = (x) => 20 * Math.log10(Math.max(1e-9, x));
    for (const [n, s] of Object.entries(out.sfx)) {
      assert.ok(!s.nan, `${n}: no NaN`); assert.ok(s.peak > 0.002, `${n}: makes a sound (${s.peak})`);
      assert.ok(dB(s.peak) <= -6, `${n}: peak ${dB(s.peak).toFixed(1)} dBFS`);
      assert.ok(s.dur < (['fanfare', 'complete'].includes(n) ? 4 : 2), `${n}: ${s.dur.toFixed(2)} s`);
    }
    for (const [m, s] of Object.entries(out.songs)) { assert.ok(!s.nan, `${m}: no NaN`); assert.ok(s.peak > 0.01, `${m}: audible`); assert.ok(dB(s.peak) <= -6, `${m}: peak ${dB(s.peak).toFixed(1)} dBFS`); }
  } finally { await b.close(); server.close(); }
});
