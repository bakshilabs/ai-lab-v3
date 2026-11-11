// The three islands in the real game: each loads from its URL, a town can be built on it, the Lab says where the
// missions are, the challenge board reloads onto the right island, and a saved island town comes back.
// Reports draw calls, triangles and frame time per island (the new islands must not be clearly worse than home).
// Usage: node tests/playwright/islands.mjs [outDir] [baseUrl] [quality]
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const out = process.argv[2] || null; const base = process.argv[3] || 'http://localhost:8772/'; const quality = process.argv[4] || 'mid';
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const errors = []; const fails = []; const check = (ok, msg) => { if (!ok) { fails.push(msg); console.error('  FAIL:', msg); } };
const shot = async (p, name) => { if (out) await p.screenshot({ path: `${out}/${name}.png` }); };
async function page() {
  const p = await b.newPage({ viewport: { width: 1366, height: 768 } }); p.on('pageerror', (e) => errors.push(e.message));
  await p.addInitScript((q) => { if (!localStorage.getItem('ecotown.prefs')) localStorage.setItem('ecotown.prefs', JSON.stringify({ quality: q, reduce: true, sound: false })); }, quality);
  return p;
}
async function started(p) {
  await p.waitForFunction(() => window.__eco?.ready?.(), null, { timeout: 180000 });
  const go = await p.waitForSelector('[data-act="go"]', { timeout: 20000 }).catch(() => null); if (go) await go.click(); // the rule card
  await p.waitForSelector('#build [data-cat="land"]', { timeout: 180000 }); await p.waitForTimeout(1200);
}
const measure = (p) => p.evaluate(() => new Promise((res) => { const st = window.__eco.app.stage; const info = st.renderer.info; const ts = []; let last = performance.now(); let n = 0; let one = null;
  // draw calls and triangles of one whole frame (every pass), then the median frame time over 40 frames
  info.autoReset = false; requestAnimationFrame(() => { info.reset(); requestAnimationFrame(() => { one = { calls: info.render.calls, tris: info.render.triangles }; info.autoReset = true; last = performance.now(); requestAnimationFrame(f); }); });
  const f = (now) => { ts.push(now - last); last = now; if (++n < 40) requestAnimationFrame(f); else { ts.sort((a, c) => a - c); res({ ...one, frameMs: +ts[Math.floor(ts.length / 2)].toFixed(1), tier: st.tier }); } }; }));
// a small town in the island's own way: [tile, build]
const TOWNS = {
  home: [['9,6', 'timber'], ['10,6', 'timber'], ['9,5', 'cohousing'], ['8,6', 'path'], ['8,3', 'mixed'], ['7,9', 'wind'], ['10,5', 'park'], ['4,5', 'timber']],
  delta: [['9,4', 'timber'], ['9,5', 'timber'], ['8,4', 'reedbed'], ['8,5', 'reedbed'], ['11,4', 'cohousing'], ['12,4', 'school'], ['10,5', 'mixed'], ['7,9', 'wind'], ['5,3', 'timber'], ['6,4', 'path'], ['11,5', 'park']],
  hills: [['8,5', 'timber'], ['9,5', 'timber'], ['8,6', 'cohousing'], ['7,5', 'path'], ['4,2', 'mixed'], ['7,8', 'wind'], ['9,6', 'park'], ['8,2', 'timber'], ['10,7', 'market'], ['6,7', 'straw']],
};
const perf = {};
for (const [island, ch] of [['home', 'tiny'], ['delta', 'isle-delta'], ['hills', 'isle-hills']]) {
  console.log(`== ${island}`);
  const p = await page(); const n0 = errors.length;
  await p.goto(`${base}index.html?${island === 'home' ? '' : `island=${island}&`}ch=${ch}&band=junior`); await started(p);
  const info = await p.evaluate(() => ({ layout: window.__eco.terrain.layout, island: window.__eco.app.island, ch: window.__eco.app.G.challenge, slot: window.__eco.app.G.slot, zones: [...window.__eco.terrain.tiles.values()].reduce((a, t) => (a[t.zone] = (a[t.zone] || 0) + 1, a), {}) }));
  console.log('  ', JSON.stringify(info));
  check(info.layout === island && info.island === island && info.ch === ch && info.slot.endsWith('.' + ch), `${island}: wrong island or slot ${JSON.stringify(info)}`);
  await p.evaluate(() => window.__eco.app.rig.overview(0.01, true)); await p.waitForTimeout(1500);
  perf[island] = { empty: await measure(p) }; await shot(p, `${island}-empty`);
  const res = await p.evaluate((town) => { const G = window.__eco.app.G; const outp = [];
    for (const [k, tool] of town) { const before = JSON.stringify(G.cells.get(k) || null); G.placeAt(k, tool, { replace: true }); outp.push([k, tool, JSON.stringify(G.cells.get(k) || null) !== before]); }
    const s = G.sim(); return { placed: outp, families: s.families, safe: s.familiesSafe, flooded: s.flooded, town: s.townTiles, nature: s.nature, start: s.natureStart }; }, TOWNS[island]);
  console.log('  ', JSON.stringify(res));
  check(res.placed.every((x) => x[2]), `${island}: a build did not go down: ${JSON.stringify(res.placed.filter((x) => !x[2]))}`);
  if (island === 'delta') check(res.flooded === 1 && res.safe === res.families - 4, `delta: the meadow home without a reed bed should flood, the two beside reed beds should not (${JSON.stringify(res)})`);
  if (island === 'hills') check(res.flooded === 0, 'hills: nothing should flood on the terraces');
  await p.waitForTimeout(2500); perf[island].town = await measure(p); await shot(p, `${island}-town`);
  // a closer look at the town from the side (holes, floating tiles, buried buildings show here)
  await p.evaluate((k) => { const a = window.__eco.app; a.rig.focus(a.world.tileTop(k), { dist: 60, pitch: 0.5 }, 0.01); }, TOWNS[island][0][0]); await p.waitForTimeout(1800); await shot(p, `${island}-close`);
  // Florence and the Lab stand on the ground
  const stand = await p.evaluate(() => { const a = window.__eco.app; const lab = a.world.tileTop(a.terrain.lab), school = a.world.tileTop(a.terrain.school), dock = a.world.tileTop(a.terrain.dock); return { lab: lab.y, school: school.y, dock: dock.y, bridge: a.world.tileTop('13,5').y }; });
  console.log('  ground heights', JSON.stringify(stand)); check(stand.lab === stand.school && stand.lab === stand.dock, `${island}: the fixed tiles are not level`);
  // the AI Lab: missions on the home island only
  if (island !== 'home') {
    await p.evaluate(() => window.__eco.app.rig.overview(0.01, true)); await p.waitForTimeout(600);
    await p.evaluate(() => window.__eco.app.ui.onTrack(0)); const h2 = await p.waitForSelector('.modal h2', { timeout: 10000 }).then((e) => e.textContent()).catch(() => '');
    check(/Missions are on the home island/.test(h2), `${island}: the Lab board should say where the missions are (got "${h2}")`); await shot(p, `${island}-missions`);
    await p.click('[data-act="close"]'); await p.waitForTimeout(400);
    // save, reload the same URL: the town is back
    await p.evaluate(() => window.__eco.app.G.save()); await p.reload(); await started(p);
    const again = await p.evaluate(() => ({ homes: window.__eco.app.G.sim().homes.length, layout: window.__eco.terrain.layout })); check(again.layout === island && again.homes >= 4, `${island}: the saved town did not come back (${JSON.stringify(again)})`);
    // the home island's own save slot is untouched
    check(await p.evaluate(() => localStorage.getItem('ecotown.save.v3') === null), `${island}: the island town wrote into the home town's save`);
  }
  check(errors.length === n0, `${island}: page errors ${errors.slice(n0).join(' | ')}`);
  await p.context().clearCookies(); await p.evaluate(() => localStorage.clear()); await p.close();
}
// a player who only follows the hints (the next step and Florence's first good spot) completes the eight goals on each new island
for (const island of ['delta', 'hills']) {
  const p = await page(); const n0 = errors.length; await p.goto(`${base}index.html?island=${island}&ch=isle-${island}&band=junior`); await started(p);
  let stuck = 0, end = '', builds = 0;
  for (let i = 0; i < 80 && !end; i++) {
    const r = await p.evaluate(() => { const G = window.__eco.app.G; const h = G.hint(); let placed = null;
      if (h.tool && h.spots.length) { const before = JSON.stringify([...G.cells]); G.placeAt(h.spots[0], h.tool, { replace: true }); placed = JSON.stringify([...G.cells]) !== before; }
      return { step: h.step, tool: h.tool, goal: h.goal, unlock: h.unlock, placed, score: h.score?.total }; });
    if (!r.tool) end = !r.goal && !r.unlock ? 'done' : 'no build suggested for ' + (r.goal || r.unlock); else { builds += r.placed ? 1 : 0; stuck = r.placed ? 0 : stuck + 1; if (stuck >= 3) end = 'stuck at: ' + r.step; }
    await p.waitForTimeout(120);
  }
  const fin = await p.evaluate(() => { const s = window.__eco.app.G.sim(); return { flooded: s.flooded, families: s.familiesSafe, score: window.__eco.app.G.hint().score?.total }; });
  console.log(`== hints on ${island}: ${end || 'ran out of steps'} after ${builds} builds`, JSON.stringify(fin)); check(end === 'done', `${island}: the hints did not lead to the eight goals (${end || 'ran out of steps'})`); check(fin.flooded === 0, `${island}: the hints flooded a home`);
  await shot(p, `${island}-hints`); check(errors.length === n0, `${island} hints: page errors ${errors.slice(n0).join(' | ')}`); await p.evaluate(() => localStorage.clear()); await p.close();
}
// the challenge board (home page): a delta challenge reloads onto the delta and starts; ?island=hills alone offers the free town
{ console.log('== challenge board');
  const p = await page(); await p.goto(`${base}index.html?challenges=1`); await p.waitForSelector('[data-ch="d-dry"]', { timeout: 120000 });
  const n = await p.evaluate(() => ({ cards: document.querySelectorAll('[data-ch]').length, heads: [...document.querySelectorAll('.chisle')].map((h) => h.textContent.trim().slice(0, 30)) })); console.log('  ', JSON.stringify(n)); check(n.cards === 15 && n.heads.length === 3, 'the board should list 13 challenges and 2 island towns under three headings');
  await shot(p, 'board'); await p.evaluate(() => document.querySelector('#start .card').scrollTo(0, 99999)); await shot(p, 'board-end');
  await Promise.all([p.waitForNavigation({ timeout: 60000 }), p.click('[data-ch="d-dry"]')]); await started(p);
  const s = await p.evaluate(() => ({ url: location.search, layout: window.__eco.terrain.layout, ch: window.__eco.app.G.challenge, goals: document.querySelector('#layer')?.textContent.includes('Delta: Dry Feet') })); console.log('  ', JSON.stringify(s));
  check(s.layout === 'delta' && s.ch === 'd-dry' && /island=delta/.test(s.url), 'Delta: Dry Feet should open on the delta');
  // a wrong island in the URL is put right
  await p.goto(`${base}index.html?island=hills&ch=d-dry&band=junior`); await started(p); check(await p.evaluate(() => window.__eco.terrain.layout === 'delta' && window.__eco.app.G.challenge === 'd-dry'), 'a challenge opened on the wrong island should move to its own');
  await p.goto(`${base}index.html?island=hills`); await p.waitForSelector('.islenote', { timeout: 120000 }); await shot(p, 'hills-start');
  await p.click('[data-band="junior"]'); await started(p); check(await p.evaluate(() => window.__eco.app.G.challenge === 'isle-hills' && window.__eco.terrain.layout === 'hills'), '?island=hills should start the hill island free town');
  await p.close(); }
console.log('== performance (' + quality + ')'); for (const [k, v] of Object.entries(perf)) console.log('  ', k.padEnd(6), 'empty', JSON.stringify(v.empty), 'town', JSON.stringify(v.town));
for (const k of ['delta', 'hills']) { check(perf[k].empty.calls <= perf.home.empty.calls * 1.15 + 3, `${k}: draw calls ${perf[k].empty.calls} vs home ${perf.home.empty.calls}`); check(perf[k].empty.tris <= perf.home.empty.tris * 1.25, `${k}: triangles ${perf[k].empty.tris} vs home ${perf.home.empty.tris}`); }
await b.close();
if (fails.length || errors.length) { console.error('FAILED:', fails, errors); process.exit(1); }
console.log('ok');
