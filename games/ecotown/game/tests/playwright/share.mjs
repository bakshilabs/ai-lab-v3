// Showing towns to other people (best-seller plan, stage 4), end to end, on three "devices" (browser contexts):
//   A builds a town by following the game's own hints, opens ☰ → Town postcard and reads its code;
//   B has its own small town, opens "Visit a town", types A's code, looks around read-only (building blocked,
//     every lens runs, street view works) and goes back: B's own saved town must be exactly as it was;
//   C is the club leader's device: ?wall=1, adds towns by code, reloads, opens one, removes and clears.
// It also checks that the name a child typed never appears on another device, that a bad link does no harm, and
// that the game made no request to anywhere but its own address.
// Usage: node tests/playwright/share.mjs [outDir] [baseUrl] [width] [height]     (server on :8773 first)
import { createRequire } from 'module'; import { mkdirSync, writeFileSync } from 'fs';
const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const out = process.argv[2] || '/tmp/ecotown-share'; const base = process.argv[3] || 'http://localhost:8773/';
const W = +(process.argv[4] || 1366), H = +(process.argv[5] || 768); const tag = `${W}x${H}`; const phone = W < 700;
mkdirSync(out, { recursive: true });
const TYPED = 'Zara Topsecret'; // a name "a child typed": it must stay on device A
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const errors = [], foreign = [], checks = {}; const fail = [];
const ok = (name, v, note = '') => { checks[name] = v === true ? true : `FAILED ${note || JSON.stringify(v)}`; if (v !== true) fail.push(name); };
async function device(name) {
  const ctx = await b.newContext({ viewport: { width: W, height: H }, hasTouch: phone, isMobile: phone, acceptDownloads: true });
  await ctx.addInitScript(() => { if (!localStorage.getItem('ecotown.prefs')) localStorage.setItem('ecotown.prefs', JSON.stringify({ quality: 'low', reduce: true, readAloud: false })); });
  const p = await ctx.newPage(); p.setDefaultNavigationTimeout(180000); p.on('pageerror', (e) => errors.push(`${name}: ${e.message}`));
  p.on('request', (r) => { if (!r.url().startsWith(base) && !/^(data|blob):/.test(r.url())) foreign.push(`${name}: ${r.url()}`); });
  p.on('dialog', (d) => d.accept());
  return p;
}
const startTown = async (p, typed) => {
  await p.goto(base + 'index.html'); await p.click('[data-band="junior"]'); await p.waitForSelector('[data-go]');
  if (typed) await p.fill('[data-name]', typed); else await p.click('[data-n="Otter Bend"]');
  await p.click('[data-go]');
  const sk = await p.waitForSelector('[data-introskip]', { timeout: 120000 }).catch(() => null); if (sk) await sk.click().catch(() => {});
  await p.waitForSelector('#build [data-cat="land"]', { timeout: 180000 }); await p.waitForTimeout(1200);
};
const shot = (p, name) => p.screenshot({ path: `${out}/${name}-${tag}.png` });
const keys = (p) => p.evaluate(() => Object.keys(localStorage).sort());

// ---------------- device A: build a town from the game's own hints, then make its postcard
const A = await device('A'); await startTown(A, TYPED);
for (let i = 0, stuck = 0; i < 120 && stuck < 3; i++) {
  const r = await A.evaluate(() => { const G = window.__eco.app.G; const h = G.hint(); if (!h.tool || !h.spots.length) return { end: true }; const before = G.cells.size + JSON.stringify([...G.cells]).length; G.placeAt(h.spots[0], h.tool, { replace: true }); return { placed: G.cells.size + JSON.stringify([...G.cells]).length !== before }; });
  if (r.end) break; stuck = r.placed ? 0 : stuck + 1; await A.waitForTimeout(120);
}
await A.waitForTimeout(1500);
const townA = await A.evaluate(() => { const G = window.__eco.app.G; const s = G.sim(); return { name: G.townName, families: s.familiesSafe, cells: [...G.cells].filter(([, c]) => c.item || c.mark).length, score: G.hint().score?.total ?? 0, title: s.title }; });
ok('A: the town is called what the child typed', townA.name === TYPED, townA.name);
await A.click('[data-menu]'); await A.click('[data-m-act="postcard"]'); await A.waitForSelector('.postcard .pccanvas', { timeout: 30000 }); await A.waitForTimeout(600);
const code = (await A.textContent('.postcard [data-code]')).replace(/\s/g, '');
const cardText = await A.textContent('#modal');
ok('A: the postcard card shows a code in groups of four', /^[0-9A-HJKMNP-TV-Z]{11,}$/.test(code), code);
ok('A: the postcard explains that the typed name stays on this device', /not the name you typed/.test(cardText));
const pc = await A.evaluate(() => { const c = document.querySelector('.pccanvas'); return { w: c.width, h: c.height, png: c.toDataURL('image/png') }; });
writeFileSync(`${out}/postcard-picture-${tag}.png`, Buffer.from(pc.png.split(',')[1], 'base64'));
await shot(A, 'postcard');
const [dl] = await Promise.all([A.waitForEvent('download', { timeout: 40000 }).catch(() => null), A.click('.postcard [data-save]')]);
ok('A: "Save the picture" downloads a PNG', !!dl && /\.png$/.test(dl.suggestedFilename()), dl?.suggestedFilename());
await A.click('#modal [data-act="close"]');
// the same card from the town report
await A.waitForTimeout(500); await A.evaluate(() => window.__eco.app.G.showReport()); await A.waitForSelector('#report [data-postcard]', { timeout: 60000 });
await A.click('#report [data-postcard]'); const fromReport = await A.waitForSelector('.postcard .pccanvas', { timeout: 30000 }).then(() => true).catch(() => false);
ok('A: the town report has the postcard too', fromReport); if (fromReport) { await A.waitForTimeout(400); await shot(A, 'postcard-from-report'); await A.click('#modal [data-act="close"]'); }

await A.context().close(); // one device at a time: software 3D is slow

// ---------------- device B: its own town, then a visit by typing the code
const B = await device('B'); await startTown(B, null);
await B.evaluate(() => { const { G } = window.__eco.app; const ks = [...window.__eco.terrain.tiles.values()].filter((t) => ['field', 'slope'].includes(t.zone) && !t.fixed).slice(0, 3).map((t) => t.k); for (const k of ks) G.placeAt(k, 'town'); });
await B.waitForTimeout(1600);
await B.click('[data-menu]'); await B.click('[data-m-act="visit"]'); // (the game saves B's town once more as it leaves)
await B.waitForSelector('#start [data-code]', { timeout: 120000 });
const ownBefore = await B.evaluate(() => localStorage.getItem('ecotown.save.v3')); const keysBefore = await keys(B);
const ownCells = (txt) => JSON.stringify((JSON.parse(txt || '{"cells":[]}').cells || []).filter(([, c]) => c.mark || c.item).map(([k, c]) => [k, c.mark, c.item]).sort());
ok('B: has its own saved town', !!ownBefore && JSON.parse(ownCells(ownBefore)).length === 3, ownCells(ownBefore));
await B.click('#start [data-vback]'); await B.click('[data-visitopen]'); await B.waitForSelector('#start [data-code]'); // Back, and in again from the first screen
await B.fill('#start [data-code]', code.slice(0, 20)); await B.click('#start [data-use]'); await B.waitForTimeout(300);
ok('B: part of a code opens nothing and says why', !/town=/.test(B.url()) && /short|add up|missing/i.test(await B.textContent('#start .codemsg')), await B.textContent('#start .codemsg'));
await B.fill('#start [data-code]', code.match(/.{1,4}/g).join(' ').toLowerCase()); // typed in fours, in lower case
await B.waitForSelector('#start .codemsg.ok', { timeout: 10000 }); const found = await B.textContent('#start .codemsg');
ok('B: the code is recognised before opening', found.includes(String(townA.score)), found);
await shot(B, 'visit-card');
await Promise.all([B.waitForURL(/town=/, { timeout: 30000 }), B.click('#start [data-use]')]);
await B.waitForSelector('#visitbar', { timeout: 180000 }); await B.waitForTimeout(3500);
const v = await B.evaluate(() => { const app = window.__eco.app; const G = app.G; const s = G.sim(); const before = JSON.stringify([...G.cells]);
  const k = [...window.__eco.terrain.tiles.values()].find((t) => t.zone === 'field' && !t.fixed && !G.cells.get(t.k)).k;
  const built = G.placeAt(k, 'town'); const c = document.getElementById('gl').getBoundingClientRect();
  return { visiting: G.visiting === true, built, same: JSON.stringify([...G.cells]) === before, families: s.familiesSafe, total: G.summary.total, title: G.summary.title, heading: G.summary.heading, bar: document.getElementById('visitbar').textContent, page: document.getElementById('layer').textContent,
    buildBar: !document.getElementById('build').classList.contains('hide'), cells: [...G.cells].length, cx: c.left + c.width / 2, cy: c.top + c.height / 2 }; });
ok('B: visit mode is on, with the banner', v.visiting && /A visitor’s town/.test(v.bar) && /Back to my town/.test(v.bar), v.bar);
ok('B: the visited town is A’s town (same families, score and badge)', v.families === townA.families && v.total === townA.score && v.title === townA.title && v.cells === townA.cells, `${JSON.stringify(townA)} vs ${v.families}/${v.total}/${v.title}/${v.cells}`);
ok('B: the name A typed is nowhere on B’s screen', !v.page.includes(TYPED) && !v.page.includes('Zara') && v.heading === v.title, v.heading);
ok('B: there is no build bar and a build is refused', v.buildBar === false && v.built === false && v.same === true);
await B.mouse.click(v.cx, v.cy); await B.waitForTimeout(500); if (!phone) await B.mouse.click(v.cx + 40, v.cy + 20, { button: 'right' });
ok('B: tapping the island changes nothing', await B.evaluate((n) => [...window.__eco.app.G.cells].length === n, v.cells));
await B.waitForTimeout(600); await shot(B, 'visit');
// the goals and score pop-over, then every lens
await B.click('#card [data-flower]'); await B.waitForSelector('#flowerpop:not(.hide) .tscore'); await B.waitForTimeout(400); await shot(B, 'visit-goals'); await B.click('#card [data-flower]');
const lensSeen = [];
for (const id of ['flood', 'access', 'carbon', 'nature', 'walk', 'winter']) {
  await B.click('[data-lensbtn]'); await B.click(`#lenspop [data-lens="${id}"]`);
  const seen = await B.waitForSelector('#lensbar:not(.hide) [data-lensx]', { timeout: 60000 }).then(() => true).catch(() => false);
  const fl = await B.waitForSelector('#florence:not(.hide) .fbody', { timeout: 5000 }).then((n) => n.textContent()).catch(() => '');
  lensSeen.push(`${id}:${seen ? 'ok' : 'NO'}:${fl ? 'florence' : 'silent'}`);
  if (id === 'carbon') { await B.waitForTimeout(700); await shot(B, 'visit-lens'); }
  if (seen) { await B.click('#lensbar [data-lensx]'); await B.waitForSelector('#lensbar.hide', { state: 'attached', timeout: 30000 }).catch(() => {}); }
  await B.waitForTimeout(300);
}
ok('B: all six lenses run on the visited town, with a line from Florence', lensSeen.every((x) => x.endsWith('ok:florence')), lensSeen.join(' '));
// street view and back
await B.evaluate(() => window.__eco.app.setView('street')); const street = await B.waitForFunction(() => document.documentElement.dataset.street === 'on', null, { timeout: 20000 }).then(() => true).catch(() => false);
await B.waitForTimeout(1200); await shot(B, 'visit-street'); await B.evaluate(() => window.__eco.app.setView('sky')); await B.waitForTimeout(1500);
ok('B: street view works in a visit', street);
// the menu in a visit: no town report, a way home
await B.click('[data-menu]'); const menu = await B.evaluate(() => ({ report: document.querySelector('[data-m-act="report"]').disabled, home: !!document.querySelector('[data-m-act="vhome"]'), postcard: !!document.querySelector('[data-m-act="postcard"]') }));
ok('B: the menu offers "Back to my town" and no report or postcard of someone else’s town', menu.report && menu.home && !menu.postcard, JSON.stringify(menu)); await B.click('#settings [data-close]');
const ownDuring = await B.evaluate(() => localStorage.getItem('ecotown.save.v3')); const keysDuring = await keys(B);
ok('B: its own save is byte-for-byte untouched by the visit', ownDuring === ownBefore);
ok('B: the visit stored nothing new on the device', JSON.stringify(keysDuring) === JSON.stringify(keysBefore), `${keysBefore} → ${keysDuring}`);
await Promise.all([B.waitForURL(/carry=1/, { timeout: 30000 }), B.click('#visitbar [data-vback]')]);
await B.waitForSelector('#build [data-cat="land"]', { timeout: 180000 }); await B.waitForTimeout(800);
const back = await B.evaluate(() => { const G = window.__eco.app.G; return { tiles: G.sim().townTiles, cells: JSON.stringify([...G.cells]), name: G.townName, visiting: !!G.visiting }; });
ok('B: "Back to my town" opens B’s own town exactly as it was', back.tiles === 3 && ownCells(JSON.stringify({ cells: JSON.parse(back.cells) })) === ownCells(ownBefore) && back.name === 'Otter Bend' && !back.visiting, JSON.stringify(back).slice(0, 200));

await B.context().close();

// ---------------- device C: the club leader's wall
const C = await device('C'); await C.goto(base + 'index.html');
await C.waitForSelector('#start [data-wallopen]', { timeout: 120000 }); const leaders = await C.textContent('#start .leaders');
ok('C: the first screen has the club wall under "For club leaders"', /For club leaders/.test(leaders) && !!(await C.$('#start [data-visitopen]')), leaders);
await C.waitForTimeout(500); await shot(C, 'start');
await C.goto(base + 'index.html?wall=1'); await C.waitForSelector('#start .wallgrid', { timeout: 120000 });
const add = async (text) => { await C.fill('#start [data-code]', text); await C.waitForTimeout(150); await C.click('#start [data-use]'); await C.waitForTimeout(400); return C.textContent('#start .codemsg'); };
await add(code);
// two more towns made on the spot: Florence's own (flawed) town and a tiny hamlet with a start-screen name
const extra = await C.evaluate(async () => { const { shareCode } = await import('./js/game/townshare.js'); const { florenceTown } = await import('./js/game/challenges.js'); const t = window.__eco.terrain;
  const f = florenceTown([...t.tiles.values()]); const tiles = [...t.tiles.values()].filter((x) => x.zone === 'slope' && !x.fixed).slice(0, 5);
  const small = new Map(tiles.map((x, i) => [x.k, { mark: 'town', item: i < 3 ? 'straw' : i === 3 ? 'park' : null, mods: [] }]));
  return [shareCode(t, { cells: f, band: 'junior', townName: 'whatever' }), shareCode(t, { cells: small, band: 'senior', townName: 'Kestrel Cove' })]; });
for (const c of extra) await add(c);
const twice = await add(code); const bad = await add(code.slice(0, -2) + (code.endsWith('00') ? '11' : '00'));
ok('C: the same town cannot be added twice', /already on the wall/.test(twice), twice);
ok('C: a mistyped code is refused with a plain sentence', /check/i.test(bad) && (await C.$$('#start .wtown')).length === 3, bad);
await C.fill('#start [data-code]', ''); await C.waitForTimeout(300);
const wall = await C.evaluate((typed) => ({ towns: [...document.querySelectorAll('.wtown')].map((n) => n.querySelector('.wopen').innerText.replace(/\n+/g, ' | ')), prompts: [...document.querySelectorAll('.wallprompts li')].map((n) => n.textContent), hasTyped: document.body.textContent.includes(typed),
  maps: [...document.querySelectorAll('.wmap')].map((c) => { const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; const seen = new Set(); for (let i = 0; i < d.length; i += 4 * 97) seen.add(`${d[i]},${d[i + 1]},${d[i + 2]}`); return seen.size; }) }), TYPED);
ok('C: three towns, each with a drawn map, a score, two strengths and one weakness', wall.towns.length === 3 && wall.maps.every((n) => n >= 4) && wall.towns.every((t) => /\/ 100/.test(t) && /Strongest:/.test(t) && /Most to gain:/.test(t)), JSON.stringify(wall.towns));
ok('C: three questions for the end-of-day talk', wall.prompts.length === 3 && wall.prompts.every((q) => q.includes('?')), JSON.stringify(wall.prompts));
ok('C: the typed name is not on the wall; the start-screen name is', !wall.hasTyped && wall.towns.some((t) => t.includes('Kestrel Cove')));
await C.evaluate(() => document.querySelector('#start .card').scrollTo(0, 0)); await shot(C, 'wall');
await C.evaluate(() => { const c = document.querySelector('#start .card'); c.scrollTo(0, c.scrollHeight); }); await C.waitForTimeout(300); await shot(C, 'wall-questions');
const stored = await C.evaluate(() => ({ keys: Object.keys(localStorage).sort(), wall: localStorage.getItem('ecotown.wall.v1') }));
ok('C: the wall is stored on this device as a list of codes and nothing else', JSON.stringify(stored.keys) === JSON.stringify(['ecotown.prefs', 'ecotown.wall.v1']) && JSON.parse(stored.wall).length === 3 && JSON.parse(stored.wall).every((c) => /^[0-9A-Z]+$/.test(c)), JSON.stringify(stored.keys));
await C.reload(); await C.waitForSelector('#start .wtown', { timeout: 120000 });
ok('C: the wall is still there after a reload', (await C.$$('#start .wtown')).length === 3);
await Promise.all([C.waitForURL(/town=.*from=wall/, { timeout: 30000 }), C.click('#start .wtown .wopen')]);
await C.waitForSelector('#visitbar [data-vwall]', { timeout: 180000 }); await C.waitForTimeout(2500);
ok('C: tapping a town opens it in visit mode', await C.evaluate(() => window.__eco.app.G.visiting === true)); await shot(C, 'visit-from-wall');
await Promise.all([C.waitForURL(/wall=1/, { timeout: 30000 }), C.click('#visitbar [data-vwall]')]); await C.waitForSelector('#start .wtown', { timeout: 120000 });
await C.click('#start .wtown [data-remove]'); await C.waitForTimeout(300); const afterRemove = (await C.$$('#start .wtown')).length;
await C.click('#start [data-clear]'); await C.waitForTimeout(300); const afterClear = (await C.$$('#start .wtown')).length;
ok('C: "Remove" takes one town off and "Clear the wall" takes them all', afterRemove === 2 && afterClear === 0 && (await C.evaluate(() => localStorage.getItem('ecotown.wall.v1'))) === '[]', `${afterRemove}, ${afterClear}`);
// a damaged link: the visit card with a plain sentence, no error, nothing opened
await C.goto(base + 'index.html?town=' + code.slice(0, 30) + 'ZZZZ'); await C.waitForSelector('#start .codemsg.bad', { timeout: 120000 });
ok('C: a damaged link opens the code box with a plain sentence, not a town', !(await C.$('#visitbar')) && /check|add up/i.test(await C.textContent('#start .codemsg')));
// a link with the code after # works too
await C.goto(base + 'index.html#town=' + code); await C.reload(); const hashOk = await C.waitForSelector('#visitbar', { timeout: 180000 }).then(() => true).catch(() => false);
ok('C: a link with the code after # opens the town', hashOk);

ok('no page errors on any device', errors.length === 0, errors.join(' ; '));
ok('no request left the game’s own address', foreign.length === 0, foreign.slice(0, 5).join(' ; '));
console.log(JSON.stringify({ size: tag, town: townA, codeLength: code.length, groupsOfFour: Math.ceil(code.length / 4), postcard: `${pc.w}x${pc.h}`, lenses: lensSeen, checks, errors }, null, 1));
await b.close();
if (fail.length) { console.error('FAILED:', fail.join(' | ')); process.exit(1); }
console.log('ok');
