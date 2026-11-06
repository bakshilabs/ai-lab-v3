// Export the guide to PDF with headless Chrome.
//   node tools/export.mjs            -> out/*-print.pdf, out/*-print-marks.pdf, out/*.pdf (digital)
// Needs playwright-core and Google Chrome. Page boxes are set afterwards by tools/boxes.py.
import { chromium } from 'playwright-core';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'out');
fs.mkdirSync(out, { recursive: true });
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' };
const server = http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!p.startsWith(root) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': TYPES[path.extname(p)] || 'application/octet-stream' });
  fs.createReadStream(p).pipe(res);
}).listen(0);
const port = server.address().port;

const name = 'delta-learning-partner-guide';
const MODES = [
  { mode: 'print', file: `${name}-print.pdf`, w: '216mm', h: '303mm' },
  { mode: 'marks', file: `${name}-print-marks.pdf`, w: '236mm', h: '323mm' },
  { mode: 'digital', file: `${name}.pdf`, w: '210mm', h: '297mm' }
];
const only = process.argv[2];
const browser = await chromium.launch({ channel: 'chrome' });
for (const m of MODES) {
  if (only && only !== m.mode) continue;
  const page = await browser.newPage();
  page.on('pageerror', e => console.log('page error:', e.message));
  page.on('requestfailed', r => console.log('failed:', r.url()));
  await page.goto(`http://localhost:${port}/index.html?mode=${m.mode}`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.pubReady === true, null, { timeout: 30000 });
  await page.emulateMedia({ media: 'print' });
  await page.pdf({ path: path.join(out, m.file), width: m.w, height: m.h, printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 }, tagged: true });
  console.log('wrote', m.file);
  await page.close();
}
await browser.close();
server.close();
