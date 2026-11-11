// How much of an upright phone screen the interface covers while building (stage 5: target at most a quarter).
// Samples a grid of points and counts those where something other than the 3D canvas is on top.
// Usage: node tests/playwright/phonearea.mjs [baseUrl] [screenshot.png] [w] [h]
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const base = process.argv[2] || 'http://localhost:8765/'; const W = +(process.argv[4] || 390), H = +(process.argv[5] || 844);
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: W, height: H }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 }); const errors = []; p.on('pageerror', (e) => errors.push(e.message));
await p.addInitScript(() => localStorage.setItem('ecotown.prefs', JSON.stringify({ quality: 'low', reduce: true })));
await p.goto(base + 'index.html'); await p.click('[data-band="junior"]'); await p.click('[data-go]');
const sk = await p.waitForSelector('[data-introskip]', { timeout: 120000 }).catch(() => null); if (sk) await sk.click().catch(() => {});
await p.waitForSelector('#build [data-cat="land"]', { timeout: 180000 }); await p.waitForTimeout(1500);
// a few builds so the tray, the next step and Florence's tip are in their usual state
await p.evaluate(() => { const G = window.__eco.app.G; for (let i = 0; i < 8; i++) { const h = G.hint(); if (h.tool && h.spots.length) G.act(h.spots[0], h.tool); } });
await p.waitForTimeout(2500);
const measure = () => p.evaluate(() => { const step = 6; let ui = 0, n = 0; const by = {};
  for (let y = step / 2; y < innerHeight; y += step) for (let x = step / 2; x < innerWidth; x += step) { n++; const el = document.elementFromPoint(x, y); if (!el || el.tagName === 'CANVAS') continue; ui++; const top = el.closest('[id]')?.id || el.tagName; by[top] = (by[top] || 0) + 1; }
  return { pct: +(100 * ui / n).toFixed(1), by: Object.fromEntries(Object.entries(by).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([k, v]) => [k, +(100 * v / n).toFixed(1)])) }; });
const busy = await measure(); console.log('just after building', JSON.stringify(busy));
await p.screenshot({ path: (process.argv[3] || '/dev/null').replace(/\.png$/, '-busy.png') });
await p.waitForTimeout(14000); // alerts go, tips fold to Florence's figure
const rest = await measure(); console.log('at rest', JSON.stringify(rest));
await p.screenshot({ path: process.argv[3] || '/dev/null' });
await b.close();
if (errors.length) { console.error('errors', errors); process.exit(1); }
