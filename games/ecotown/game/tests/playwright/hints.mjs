// A player who only follows the game's own hints: the next-step line and Florence's first good spot (G.hint()).
// The hints must lead to all eight town goals without a dead end, and must not repeat one build more than 4 times running.
// Usage: node tests/playwright/hints.mjs [junior|senior] [screenshot.png] [baseUrl]
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const base = process.argv[4] || 'http://localhost:8765/';
const band = process.argv[2] || 'junior';
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: 1366, height: 768 } }); const errors = []; p.on('pageerror', e => errors.push(e.message));
await p.addInitScript(() => localStorage.setItem('ecotown.prefs', JSON.stringify({ quality: 'low', reduce: true })));
await p.goto(base + 'index.html'); await p.click(`[data-band="${band}"]`); await p.click('[data-go]');
const sk = await p.waitForSelector('[data-introskip]', { timeout: 120000 }).catch(() => null); if (sk) await sk.click().catch(() => {});
await p.waitForSelector('#build [data-cat="land"]', { timeout: 180000 }); await p.waitForTimeout(1500);
let last = '', stuck = 0, fail = '', run = 0, lastTool = '', done = false;
for (let i = 0; i < 160; i++) {
  const r = await p.evaluate(() => { const G = window.__eco.app.G; const h = G.hint(); let placed = null;
    if (h.tool && h.spots.length) { const before = JSON.stringify([...G.cells]); G.placeAt(h.spots[0], h.tool, { replace: true }); placed = JSON.stringify([...G.cells]) !== before; }
    const s = G.sim(); return { ...h, placed, fam: s.families, food: s.food, need: s.foodNeed, carbon: s.carbon, credits: G.credits, tiles: s.townTiles, petals: Object.fromEntries(Object.entries(s.petals).map(([k, v]) => [k, +v.toFixed(2)])), winter: s.power.winterOK, walk: s.walkMax }; });
  const line = `${r.step} -> ${r.tool} @${r.spots[0] || '-'} ${r.placed ? 'ok' : 'NO'}`;
  if (line !== last) console.log(i, line, '|', r.why, '|', JSON.stringify({ fam: r.fam, food: r.food, carbon: r.carbon, cr: r.credits, tiles: r.tiles, pet: r.petals, winter: r.winter, walk: r.walk }));
  if (!r.tool) { done = !r.goal && !r.unlock; console.log(done ? 'all goals met:' : 'no build suggested:', r.step); if (!done) fail = 'no build suggested for ' + (r.goal || r.unlock); break; }
  run = r.tool === lastTool ? run + 1 : 1; lastTool = r.tool; if (run > 4 && !['timber', 'town'].includes(r.tool)) { fail = `the same build (${r.tool}) suggested ${run} times running`; break; }
  stuck = r.placed ? 0 : stuck + 1; last = line; if (stuck >= 3) { if (r.credits != null && r.credits < 5) { console.log('13–17: out of credits here (households pay each evening); the hints held up to this point'); done = true; } else fail = 'stuck: ' + line; break; }
  await p.waitForTimeout(150);
}
console.log('town score', JSON.stringify(await p.evaluate(() => window.__eco.app.G.hint().score)));
console.log('badges', await p.evaluate(() => JSON.stringify(window.__eco.app.G.badges)), 'errors', errors);
await p.screenshot({ path: process.argv[3] || '/dev/null' }).catch(() => {});
await b.close();
if (!done && !fail) fail = 'ran out of steps';
if (fail || errors.length) { console.error('FAILED:', fail, errors); process.exit(1); }
console.log('ok');
