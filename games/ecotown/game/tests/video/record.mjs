// Records the build videos: one ~10 s clip per item (from above while it is built, then at eye level).
// Usage: node tests/video/record.mjs <baseUrl> [item ...]   (default: every item; skips ones already recorded unless --force)
// Writes videos/<item>.mp4 (H.264, faststart, plays on iPad/Chromebook), videos/<item>.jpg (poster) and
// videos/<item>.json (stage timeline for the captions), then videos/index.json. Needs ffmpeg and a running server.
import { createRequire } from 'module'; import fs from 'fs'; import path from 'path'; import { spawn } from 'child_process';
const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const args = process.argv.slice(2); const force = args.includes('--force'); const opt = (k, d) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : d; };
const pos = args.filter((a, i) => !a.startsWith('--') && !(i > 0 && args[i - 1].startsWith('--') && args[i - 1] !== '--force'));
const base = pos[0] || 'http://localhost:8765/'; let items = pos.slice(1);
const FPS = +opt('fps', 24), W = +opt('w', 960), H = +opt('h', 540), TIER = opt('tier', 'mid');
const out = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'videos'); fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
if (!items.length) { const p = await b.newPage(); await p.goto(base + 'index.html'); items = await p.evaluate(async () => Object.keys((await import('./js/world/catalog.js')).ITEMS)); await p.close(); }
for (const id of items) {
  const mp4 = path.join(out, `${id}.mp4`); if (!force && fs.existsSync(mp4)) { console.log('skip', id); continue; }
  const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  await p.addInitScript(() => localStorage.setItem('ecotown.prefs', JSON.stringify({ quality: 'high', reduce: false, readAloud: false })));
  p.on('pageerror', (e) => console.log('[pageerror]', id, e.message));
  await p.goto(`${base}index.html?shoot=${id}&tier=${TIER}`); await p.waitForFunction(() => window.__ready === true, null, { timeout: 180000 });
  const dur = await p.evaluate(() => window.__duration); const n = Math.round(dur * FPS); const t0 = Date.now();
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-vf', `scale=${W}:${H}:flags=lanczos,format=yuv420p`, '-c:v', 'libx264', '-preset', 'slow', '-crf', '33', '-tune', 'animation', '-profile:v', 'main', '-movflags', '+faststart', mp4], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = 0; i < n; i++) {
    const t = i / FPS; await p.evaluate((t) => { window.__render(t); return new Promise((r) => requestAnimationFrame(() => r())); }, t);
    const buf = await p.screenshot({ type: 'jpeg', quality: 92 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
    if (Math.abs(t - 5.8) < 0.5 / FPS) fs.writeFileSync(path.join(out, `${id}.jpg`), await p.screenshot({ type: 'jpeg', quality: 80 }));
  }
  ff.stdin.end(); await new Promise((r) => ff.on('close', r));
  fs.writeFileSync(path.join(out, `${id}.json`), JSON.stringify(await p.evaluate(() => window.__timeline())));
  console.log('recorded', id, `${n} frames in ${((Date.now() - t0) / 1000).toFixed(0)} s`, `${(fs.statSync(mp4).size / 1024).toFixed(0)} KB`);
  await p.close();
}
const all = fs.readdirSync(out).filter((f) => f.endsWith('.mp4')).map((f) => f.slice(0, -4)).sort();
fs.writeFileSync(path.join(out, 'index.json'), JSON.stringify({ items: all }));
console.log('index:', all.length, 'videos'); await b.close();
