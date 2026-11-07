// Free building: unlock tiers, town goals, Florence's tips (cooldown, no repeats), and the AI Lab's
// practice island (every mission's vague instruction still shows its mistake there; the clear one passes).
// node --test tests/progress.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { loadPlotter } from '../js/ai/model.js';
import { setModelForTests, ask } from '../js/ai/plotter.js';
import { makeTerrain } from '../js/world/terrain.js';
import { simulate } from '../js/sim/sim.js';
import { accessCheck } from '../js/sim/access.js';
import { LEVELS, LEVEL_ORDER } from '../js/game/levels.js';
import { LEVEL_TEXT, SANDBOX } from '../js/game/content.js';
import { ITEMS } from '../js/world/catalog.js';
import { TIERS, unlocked, newlyUnlocked, labReady, townGoals, townComplete, SANDBOX_TOWN_CAP } from '../js/game/progress.js';
import { RULES, newAdvisor, nextTip, tipText, COOLDOWN } from '../js/game/advisor.js';
import { seedTo } from '../js/game/seed.js';

setModelForTests(await loadPlotter({ json: JSON.parse(readFileSync(new URL('../models/plotter.json', import.meta.url), 'utf8')), bin: readFileSync(new URL('../models/plotter.bin', import.meta.url)) }));
const terrain = makeTerrain();
const ctxFor = (cells, id) => ({ moveTiles: [...cells.values()].filter((c) => c.item && ITEMS[c.item].level === 'move').length, hasSchool: [...cells.values()].some((c) => c.item === 'school'), access: id === 'move' ? accessCheck(terrain, cells) : null });
const tiles = [...terrain.tiles.values()];
const mark = (cells, n, zones = ['field', 'slope', 'coast']) => { let i = 0; for (const t of tiles) if (i < n && zones.includes(t.zone) && !t.fixed && !cells.get(t.k)) { cells.set(t.k, { mark: 'town', item: null, mods: [], locked: false }); i++; } return cells; };

test('an empty island opens land and paths only; town land opens homes', () => {
  const s0 = simulate(terrain, new Map());
  assert.deepEqual(unlocked(s0), ['land', 'move']);
  const s1 = simulate(terrain, mark(new Map(), 6));
  assert.ok(unlocked(s1).includes('homes'));
  assert.deepEqual(newlyUnlocked(unlocked(s0), unlocked(s1)), ['homes']);
  assert.equal(unlocked(s0, [], true).length, TIERS.length, 'sandbox=full opens everything');
  assert.ok(unlocked(s0, ['food']).includes('food'), 'an opened category stays open');
  assert.ok(SANDBOX_TOWN_CAP > 18);
});

test('class mode only opens the next mission; free mode opens every unlocked one', () => {
  const open = ['land', 'move', 'homes'];
  assert.ok(labReady('homes', open, {}, false));
  assert.ok(!labReady('food', open, {}, false), 'locked category, locked mission');
  assert.ok(labReady('land', open, {}, true) && !labReady('move', open, {}, true));
  assert.ok(labReady('move', open, { land: { stars: 2 } }, true));
});

test('the six clear plans, plus a hall and a market on two more tiles of town land, make a complete town', () => {
  let cells = new Map();
  for (const id of LEVEL_ORDER) cells = ask(id, LEVEL_TEXT[id].cards[1][0], { terrain, cells }).after;
  assert.ok(!townComplete(simulate(terrain, cells), ctxFor(cells)), 'the missions alone leave something for the player to build');
  const town = [...cells].filter(([, c]) => c.mark === 'town').map(([k]) => terrain.tiles.get(k));
  const near = (t) => Math.min(...town.map((u) => Math.abs(u.gx - t.gx) + Math.abs(u.gz - t.gz)));
  const spare = tiles.filter((t) => ['field', 'slope'].includes(t.zone) && !t.fixed && !cells.get(t.k)?.mark && !cells.get(t.k)?.item).sort((a, b) => near(a) - near(b)).slice(0, 2);
  assert.equal(spare.length, 2);
  cells.set(spare[0].k, { mark: 'town', item: 'hall', mods: [], locked: false }); cells.set(spare[1].k, { mark: 'town', item: 'market', mods: [], locked: false });
  const s = simulate(terrain, cells); const goals = townGoals(s, ctxFor(cells));
  assert.ok(townComplete(s, ctxFor(cells)), JSON.stringify(goals.filter((g) => !g.ok)));
});

test('every town goal and tip has words in both versions', () => {
  const s = simulate(terrain, mark(new Map(), 8));
  for (const band of ['junior', 'senior']) {
    for (const g of townGoals(s, ctxFor(new Map()))) assert.ok(SANDBOX[band].goal[g.id](s).length > 3, `${band} ${g.id}`);
    for (const r of RULES) assert.ok(tipText(r, { ...s, species: { bees: false, deer: true }, power: { winterSupply: 1, demand: 2 } }, band === 'junior').length > 10, `${band} ${r.id}`);
    for (const t of TIERS.slice(2)) assert.ok(SANDBOX[band].unlockTip[t.id] && t.need[band === 'junior' ? 'j' : 's'], `${band} ${t.id}`);
  }
});

test('Florence’s tips: first one straight away, then a cooldown, and never the same one twice in a row', () => {
  const st = newAdvisor(); const ctx = { open: ['land', 'move'], hasSchool: false };
  const empty = simulate(terrain, new Map());
  assert.equal(nextTip(st, empty, ctx, 0).id, 'start');
  assert.equal(nextTip(st, empty, ctx, COOLDOWN * 2), null, 'shown once, not repeated while still true');
  // floodplain town land: a new problem, but the cooldown holds it back
  const wet = mark(new Map(), 6, ['meadow']); const sw = simulate(terrain, wet);
  assert.ok(sw.townFlooded >= 2);
  const st2 = newAdvisor(); nextTip(st2, empty, ctx, 0);
  assert.equal(nextTip(st2, sw, ctx, 1000), null, 'cooldown');
  const r = nextTip(st2, sw, ctx, 1000 + COOLDOWN); assert.equal(r.id, 'flood'); assert.equal(r.lab, 'land');
  // solved, then back: it may come back
  nextTip(st2, simulate(terrain, new Map()), ctx, 1000 + COOLDOWN * 2);
  assert.equal(nextTip(st2, sw, ctx, 1000 + COOLDOWN * 4)?.id, 'flood');
});

for (const id of LEVEL_ORDER) test(`AI Lab practice island, ${id}: the vague card shows a mistake and the clear card passes`, () => {
  const base = seedTo(terrain, id); const L = LEVEL_TEXT[id]; const lv = LEVELS[id];
  const v = ask(id, L.cards[0][0], { terrain, cells: base }); const sv = simulate(terrain, v.after); const cv = ctxFor(v.after, id);
  assert.ok(Object.keys(lv.reveal(sv, simulate(terrain, base), cv)).length > 0 || !lv.pass(sv, cv), 'vague plan is flawed');
  const c = ask(id, L.cards[1][0], { terrain, cells: base }); const sc = simulate(terrain, c.after); const cc = ctxFor(c.after, id);
  assert.ok(lv.pass(sc, cc), 'clear plan passes');
  assert.equal(Object.keys(lv.reveal(sc, simulate(terrain, base), cc)).length, 0, 'clear plan shows no problem');
});

test('every build has a picture for its button, and the AI Lab building has one', async () => {
  const { existsSync } = await import('node:fs');
  for (const id of [...Object.keys(ITEMS), 'ailab']) assert.ok(existsSync(new URL(`../img/thumbs/${id}.png`, import.meta.url)), `img/thumbs/${id}.png`);
  assert.ok(existsSync(new URL('../img/florence.png', import.meta.url)));
});

test('Florence’s intro has every line in both versions', () => {
  const beats = ['tag', 'yourTurnTag', 'next', 'skip', 'tiles', 'hello', 'meadow', 'yourTurn', 'wellDone', 'video', 'videoLater', 'unlocks', 'lab', 'overToYou'];
  for (const band of ['junior', 'senior']) for (const b of beats) assert.ok(SANDBOX[band].intro[b]?.length > 1, `${band} intro.${b}`);
});

test('the island has an AI Lab building on a tile no mission plan uses', () => {
  assert.ok(terrain.lab && terrain.tiles.get(terrain.lab).fixed === 'ailab');
  let cells = new Map(); for (const id of LEVEL_ORDER) { cells = ask(id, LEVEL_TEXT[id].cards[1][0], { terrain, cells }).after; assert.ok(!cells.get(terrain.lab)?.item && !cells.get(terrain.lab)?.mark, id); }
});

test('build videos, when recorded, have a poster and a caption timeline', async () => {
  const fs = await import('node:fs'); const dir = new URL('../videos/', import.meta.url);
  if (!fs.existsSync(dir)) return;
  const idx = JSON.parse(fs.readFileSync(new URL('index.json', dir), 'utf8'));
  for (const id of idx.items) {
    assert.ok(ITEMS[id], `video for a real item: ${id}`);
    for (const ext of ['mp4', 'jpg', 'json']) assert.ok(fs.existsSync(new URL(`${id}.${ext}`, dir)), `${id}.${ext}`);
    const tl = JSON.parse(fs.readFileSync(new URL(`${id}.json`, dir), 'utf8')); assert.ok(tl.stages.length >= 1 && tl.stages.every((s) => s.text.j && s.text.s), `${id} captions`);
  }
});
