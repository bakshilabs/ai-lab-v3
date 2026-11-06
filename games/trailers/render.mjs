// Render a trailer page frame by frame with Playwright and encode with ffmpeg.
// Usage:
//   node render.mjs <trailer> [--fps 30] [--from 0] [--to <dur>] [--stills 1,5.5,9] [--out file.mp4] [--half]
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const root = path.dirname(new URL(import.meta.url).pathname);
const args = process.argv.slice(2);
const name = args[0];
const opt = (k, d) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : d; };
const flag = (k) => args.includes('--' + k);

const types = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.startsWith('/three/')) p = '/node_modules/three/build/' + p.slice(7);
  else if (p.startsWith('/three-addons/')) p = '/node_modules/three/examples/jsm/' + p.slice(14);
  const f = path.join(root, p);
  if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(0, r));
const port = server.address().port;

const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: flag('half') ? 0.5 : 1 });
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') console.log('[page]', m.text()); });
page.on('pageerror', (e) => console.log('[pageerror]', e.message));
await page.goto(`http://localhost:${port}/${name}/index.html`);
await page.waitForFunction(() => window.__ready === true, null, { timeout: 120000 });
const dur = await page.evaluate(() => window.__duration);

const outDir = path.join(root, 'out');
fs.mkdirSync(outDir, { recursive: true });

const stills = opt('stills', null);
if (stills) {
  const dir = path.join(root, 'frames', name); fs.mkdirSync(dir, { recursive: true });
  for (const s of stills.split(',').map(Number)) {
    await page.evaluate((t) => { window.__render(t); return new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))); }, s);
    const f = path.join(dir, `still-${String(s).padStart(5, '0')}.jpg`);
    await page.screenshot({ path: f, type: 'jpeg', quality: 85 });
    console.log(f);
  }
} else {
  const fps = Number(opt('fps', 30));
  const from = Number(opt('from', 0)), to = Number(opt('to', dur));
  const out = opt('out', path.join(outDir, `${name}-silent.mp4`));
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
    '-vf', 'scale=1920:1080:flags=lanczos,format=yuv420p', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const n = Math.round((to - from) * fps);
  const t0 = Date.now();
  for (let i = 0; i < n; i++) {
    const t = from + i / fps;
    await page.evaluate((t) => { window.__render(t); return new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))); }, t);
    const buf = await page.screenshot({ type: 'jpeg', quality: 93 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
    if (i % 60 === 0) console.log(`frame ${i}/${n}  ${((Date.now() - t0) / 1000 / (i + 1)).toFixed(2)} s/frame`);
  }
  ff.stdin.end();
  await new Promise((r) => ff.on('close', r));
  console.log('wrote', out, `in ${((Date.now() - t0) / 1000).toFixed(0)} s`);
}
await browser.close();
server.close();
