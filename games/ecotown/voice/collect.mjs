// Collects every sentence the game can speak, for recording. Runs the game modules in a browser (they use
// the three.js import map), harvests the fixed text, Florence's planner readings and the diary lines, and
// merges the lines logged during play-throughs (said.json files). Writes voice/lines-<band>.json.
// Usage: node voice/collect.mjs <baseUrl> <said.json ...>
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const here = path.dirname(new URL(import.meta.url).pathname);
const [base = 'http://localhost:8765/', ...saidFiles] = process.argv.slice(2);

const b = await chromium.launch(); const p = await b.newPage();
await p.goto(base + 'index.html?film=none');
const out = await p.evaluate(async () => {
  const { CONTENT, LEVEL_TEXT, diaryLines, HELPER, SANDBOX } = await import('./js/game/content.js');
  const { RULES } = await import('./js/game/advisor.js');
  const { FILMS } = await import('./js/game/film.js');
  const { plan } = await import('./js/sim/planner.js');
  const { makeTerrain } = await import('./js/world/terrain.js');
  const { applyPlacements } = await import('./js/sim/planner.js');
  const V = await import('./js/ui/voice.js');
  const { WONT_LINES } = await import('./js/ai/plotter.js');
  const res = { junior: [], senior: [] };
  const add = (band, text, voice) => { for (const s of V.sentences(text)) if (!/\{n\}/.test(s)) res[band].push({ s, voice }); };
  for (const band of ['junior', 'senior']) {
    const j = band === 'junior'; const C = CONTENT[band]; const pick = (o) => (typeof o === 'string' ? o : j ? o.j : o.s);
    for (const v of Object.values(C.ui)) add(band, v, 'narrator');
    for (const k of ['unknown', 'correct', 'notQuite', 'lookAgain', 'itWas']) add(band, C.ui[k], 'helper');
    for (const h of Object.values(C.habits)) { add(band, h.explain, 'helper'); add(band, `${C.ui.correct} ${h.label}`, 'narrator'); }
    for (const r of [...C.stars.flawed, ...C.stars.clean, ...C.stars.missed]) add(band, `★ ${r}`, 'narrator');
    for (const w of WONT_LINES) add(band, w, 'helper');
    for (const [id, L] of Object.entries(LEVEL_TEXT)) {
      const N = L.newThing; const label = N.label ? pick(N.label) : C.checks[N.lens].label;
      add(band, `${label}. ${pick(N)} ${pick(L.brief)}`, 'narrator'); add(band, pick(L.live), 'narrator');
      for (const f of Object.values(L.flaw)) add(band, pick(f), 'narrator');
      const H = pick(L.hidden); add(band, H.q, 'narrator'); add(band, `${C.ui.correct} ${H.why}`, 'helper'); add(band, H.why, 'helper');
      add(band, pick(L.complete), 'narrator'); add(band, FILMS[id] ? pick(FILMS[id].lines) : '', 'narrator');
      for (const ok of [true, false]) { const s = { townFlooded: ok ? 0 : 3, unsafeCrossings: ok ? 0 : 2, avgTemp: ok ? 21 : 14, species: { bees: ok }, food: ok ? 20 : 5, foodNeed: 14, power: { winterOK: ok }, walkMax: ok ? 12 : 22 }; for (const l of diaryLines(id, s, j)) add(band, l, 'narrator'); }
    }
    add(band, 'Ribbon-cutting time!', 'narrator'); add(band, 'Opening ceremony.', 'narrator');
    // free building: Florence's fixed tips and unlock lines, the AI Lab cards (lines with live numbers use the device voice)
    const S = SANDBOX[band];
    for (const r of RULES) { const t = r.text[j ? 'j' : 's']; if (typeof t === 'string') add(band, t, 'helper'); }
    for (const id of Object.keys(S.unlockTip)) if (S.unlockTip[id]) { add(band, S.unlockTip[id], 'helper'); add(band, `${S.unlockTip[id]} ${S.labReady}`, 'helper'); }
    add(band, S.classInvite, 'helper'); add(band, S.moveIn, 'narrator'); add(band, S.completeText, 'narrator'); add(band, S.planDidntFit, 'narrator');
  }
  // Florence's readings for many instructions (both bands hear them in her voice)
  const terrain = makeTerrain(); let cells = new Map(); const SL = { land: ['best', 'flat', 'sunny', 'dry', 'keep_meadow', 'keep_wood', 'keep_wetland', 'near_water', 'near_coast', 'big'], move: ['easy_access', 'safe_walking', 'cycling', 'tram', 'cars_at_edge', 'no_cars', 'fast', 'everyone'], homes: ['strong', 'cheap', 'many', 'tall', 'low_carbon', 'warm', 'natural_materials', 'green_roofs', 'reuse'], food: ['max_food', 'enough_food', 'keep_hedges', 'bees', 'wildlife', 'local', 'allotments', 'orchard'], power: ['clean_power', 'enough_power', 'winter', 'night', 'storage', 'wind', 'solar', 'save_water', 'repair', 'compost'], heart: ['middle', 'walk_time', 'near_homes', 'nature_links', 'market', 'safe_route'] };
  const CLEAR = { land: ['dry', 'sunny', 'keep_meadow'], move: ['safe_walking', 'cycling', 'cars_at_edge'], homes: ['warm', 'low_carbon', 'natural_materials'], food: ['enough_food', 'keep_hedges', 'bees'], power: ['enough_power', 'winter', 'night', 'storage', 'solar', 'save_water', 'compost'], heart: ['walk_time', 'market', 'nature_links'] };
  for (const [lv, slots] of Object.entries(SL)) {
    const combos = []; for (let a = 0; a < slots.length; a++) for (let c = a; c < slots.length; c++) for (let d = c; d < slots.length; d++) combos.push([...new Set([slots[a], slots[c], slots[d]])]);
    combos.push(CLEAR[lv]);
    for (const pick of combos) { const pl = plan(lv, pick, { terrain, cells, numbers: { minutes: 15 } }); for (const r of [...pl.reading, pl.habitWhy]) if (r) for (const band of ['junior', 'senior']) add(band, r, 'helper'); }
    for (const sl of slots) { const pl = plan(lv, [sl], { terrain, cells, numbers: { minutes: 15 } }); for (const r of [...pl.reading, pl.habitWhy]) if (r) for (const band of ['junior', 'senior']) add(band, r, 'helper'); }
    if (lv === 'move') for (const text of ['step-free wheelchair gentle slopes lit paths, time to cross for slower walkers, accessible ferry ramp']) for (const pick of [CLEAR.move, ['safe_walking', 'everyone']]) { const pl = plan(lv, pick, { terrain, cells, numbers: {}, text }); for (const r of pl.reading) for (const band of ['junior', 'senior']) add(band, r, 'helper'); }
    cells = applyPlacements(cells, plan(lv, CLEAR[lv], { terrain, cells, numbers: { minutes: 15 } }).placements); for (const c of cells.values()) if (c.item) c.locked = true;
  }
  return { res, helper: HELPER };
});
// lines spoken during play-throughs, with the voice they were spoken in
for (const f of saidFiles) {
  const band = /senior|\/s\d|-s\b/.test(f) ? 'senior' : 'junior'; const said = JSON.parse(fs.readFileSync(f, 'utf8'));
  const sents = await p.evaluate(({ said }) => import('./js/ui/voice.js').then((V) => said.flatMap((x) => V.sentences(x.text).map((s) => ({ s, voice: x.voice })))), { said });
  out.res[band].push(...sents);
}
for (const band of ['junior', 'senior']) {
  const keys = await p.evaluate((list) => import('./js/ui/voice.js').then((V) => list.map((x) => ({ ...x, key: V.keyOf(x.s, x.voice) }))), out.res[band]);
  const uniq = [...new Map(keys.filter((x) => !/\d{2,}|\d+ ?%|\d+ of \d+/.test(x.s) || x.s.length < 60).map((x) => [x.key, x])).values()];
  fs.writeFileSync(path.join(here, `lines-${band}.json`), JSON.stringify(uniq, null, 1));
  console.log(band, uniq.length, 'sentences', uniq.filter((x) => x.voice === 'helper').length, 'in Florence’s voice');
}
await b.close();
