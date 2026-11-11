// Challenge towns: every challenge can be passed on its own island (a town built by a fixed recipe), an ordinary
// town does not pass the hard ones by accident, and Florence's own town really is wrong in the ways the lenses show.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeTerrain, ISLANDS } from '../js/world/terrain.js';
import { simulate } from '../js/sim/sim.js';
import { ITEMS } from '../js/world/catalog.js';
import { planPlace } from '../js/game/replace.js';
import { townGoals, SANDBOX_TOWN_CAP } from '../js/game/progress.js';
import { townScore } from '../js/game/score.js';
import { CHALLENGES, ISLAND_TOWNS, islandOf, challenge, challengeState, challengeMedal, better, florenceTown, GOAL_TEXT } from '../js/game/challenges.js';

// one world per island: every challenge is judged on the island it is played on
const WORLDS = {}; const world = (island = 'home') => (WORLDS[island] ||= (() => { const terrain = makeTerrain(island); return { terrain, tiles: [...terrain.tiles.values()] }; })());
const { terrain, tiles } = world('home');
const empty = { mark: null, item: null, mods: [], locked: false };
const school0 = tiles.find((t) => t.fixed === 'oldschool');
const dist = (a, b) => Math.hypot(a.gx - b.gx, a.gz - b.gz);
// build a recipe: [tool, how many, zones] goes on the allowed tiles nearest the centre (homes: any home tile);
// [tool, ['gx,gz', …]] goes on exactly those tiles.
function build(recipe, island = 'home', cells = new Map(), centre = null) {
  const { tiles, terrain } = world(island);
  const slope = tiles.filter((t) => t.zone === 'slope' && !t.fixed);
  centre ||= { gx: slope.reduce((a, t) => a + t.gx, 0) / slope.length, gz: slope.reduce((a, t) => a + t.gz, 0) / slope.length };
  for (const [tool, n, zones] of recipe) {
    const it = ITEMS[tool];
    if (Array.isArray(n)) { for (const k of n) { const t = terrain.tiles.get(k); assert.ok(t && !t.fixed, `${island}: no free tile ${k}`); const r = planPlace(tool, t, cells.get(k) || empty); assert.ok(r.cell, `${island}: ${tool} on ${k}: ${r.why}`); cells.set(k, r.cell); } continue; }
    let left = n;
    for (const t of [...tiles].sort((a, b) => dist(a, centre) - dist(b, centre))) {
      if (!left) break; if (t.fixed) continue; const c = cells.get(t.k) || empty;
      if (it.kind === 'mod') { if (!c.item || !ITEMS[c.item].home) continue; } else if (c.item || c.mark || !zones.includes(t.zone)) continue;
      const r = planPlace(tool, t, c); if (!r.cell) continue; cells.set(t.k, r.cell); left--;
    }
    assert.equal(left, 0, `no room for ${tool} on ${island}`);
  }
  return cells;
}
function judge(ch, cells, island = islandOf(ch)) {
  const s = simulate(world(island).terrain, cells); const x = { hasSchool: [...cells.values()].some((c) => c.item === 'school'), catches: 0 };
  const tg = townGoals(s, x); const st = challengeState(ch, s, x, tg); const sc = townScore(s, x);
  return { s, tg, st, sc, bad: [...tg, ...st.extra].filter((g) => !g.ok).map((g) => g.id), town: s.townTiles };
}
const D = ['slope', 'field'];
const COMMON = [['school', 1, D], ['market', 1, D], ['hall', 1, D], ['path', 3, D], ['park', 1, D]];
// the delta: the town stands on the low bank and the beach (and, where a recipe says so, on drained flood meadow). the hills: the town stands on the terraces and the beach, never in the wood.
const B = ['slope', 'coast']; const COMMON_B = [['school', 1, ['slope']], ['market', 1, B], ['hall', 1, B], ['path', 3, B], ['park', 1, B]];
const ORDINARY = {
  home: [['timber', 10, D], ...COMMON, ['mixed', 3, ['field']], ['wind', 3, ['field', 'coast']], ['battery', 2, D]],
  delta: [['school', 1, ['slope']], ['timber', 10, B], ['market', 1, B], ['hall', 1, B], ['park', 1, B], ['path', 3, ['meadow']], ['mixed', 3, ['field']], ['wind', 3, ['coast']], ['battery', 2, B]],
  hills: [['timber', 10, B], ...COMMON_B, ['mixed', 3, ['field']], ['wind', 3, ['coast']], ['battery', 2, B]],
};
const RECIPES = {
  fix: null, // judged apart: Florence's town is repaired, not built
  tiny: [['cohousing', 8, D], ['school', 1, ['field']], ['mixed', 3, ['field']], ['wind', 2, ['field', 'coast']], ['battery', 2, ['field']], ['park', 2, ['field']], ['path', 2, ['field']]],
  light: [['straw', 14, D], ['heatpump', 14], ...COMMON, ['repair', 2, D], ['mixed', 3, ['field']], ['wind', 3, ['field', 'coast']], ['battery', 5, D]],
  still: [['timber', 10, D], ['solar', 2], ...COMMON, ['mixed', 3, ['field']], ['battery', 3, D]],
  wild: [['timber', 10, D], ...COMMON, ['mixed', 3, ['field']], ['wind', 3, ['coast']], ['battery', 2, D], ['hedge', 4, ['field']], ['orchard', 3, ['field']], ['hives', 2, ['field']], ['greenroof', 10]],
  big: [['cohousing', 12, D], ['heatpump', 12], ...COMMON, ['repair', 2, D], ['mixed', 4, ['field']], ['wind', 4, ['field', 'coast']], ['battery', 4, D]],
  near: [['school', 1, D], ['market', 1, D], ['allot', 2, D], ['timber', 10, D], ['hall', 1, D], ['path', 3, D], ['park', 1, D], ['mixed', 3, ['field']], ['wind', 3, ['field', 'coast']], ['battery', 2, D]],
  // six homes on the flood meadow beside the marsh and along the south bank, each next to a reed bed
  'd-dry': [['timber', ['9,3', '9,4', '9,5', '9,6', '10,7', '12,7']], ['reedbed', ['8,3', '8,4', '8,5', '8,6', '11,7']], ['timber', 4, ['slope']], ...COMMON_B, ['mixed', 3, ['field']], ['wind', 3, ['coast']], ['battery', 2, B]],
  'd-wild': [['school', 1, ['slope']], ['orchard', 1, ['slope']], ['cohousing', 8, B], ['market', 1, B], ['hall', 1, B], ['path', 3, B], ['park', 1, B], ['mixed', 3, ['field']], ['wind', 3, ['coast']], ['battery', 2, B], ['hedge', 3, ['meadow']], ['greenroof', 8]],
  'd-big': [['cohousing', ['9,3', '9,4', '9,5', '9,6']], ['reedbed', ['8,3', '8,4', '8,5', '8,6']], ['school', 1, ['slope']], ['cohousing', 8, B], ['heatpump', 12], ['market', 1, B], ['hall', 1, B], ['park', 1, B], ['path', 3, ['meadow']], ['repair', 2, B], ['mixed', 4, ['field', 'meadow']], ['wind', 4, ['coast']], ['battery', 4, B]],
  'h-tiny': [['cohousing', 8, ['slope']], ['school', 1, ['slope']], ['mixed', 3, ['field', 'slope']], ['wind', 2, ['coast']], ['battery', 2, ['slope']], ['park', 2, ['slope']], ['path', 2, ['slope']]],
  'h-wood': [['timber', 10, B], ...COMMON_B, ['mixed', 3, ['field']], ['wind', 3, ['coast']], ['battery', 2, B], ['orchard', 3, ['slope']], ['hives', 2, ['slope']], ['greenroof', 10]],
  'h-near': [['school', 1, ['slope']], ['market', 1, B], ['allot', 2, ['slope']], ['timber', 10, B], ['hall', 1, B], ['path', 3, B], ['park', 1, B], ['mixed', 3, ['field', 'slope']], ['wind', 3, ['coast']], ['battery', 2, B]],
};

test('thirteen challenges on three islands, each with a rule for both ages and text for its own goals', () => {
  assert.equal(CHALLENGES.length, 13); assert.equal(new Set(CHALLENGES.map((c) => c.id)).size, 13);
  assert.equal(CHALLENGES.filter((c) => !c.island).length, 7); assert.equal(CHALLENGES.filter((c) => c.island === 'delta').length, 3); assert.equal(CHALLENGES.filter((c) => c.island === 'hills').length, 3);
  for (const ch of CHALLENGES) { assert.ok(ch.name && ch.icon && ch.rule.j && ch.rule.s, ch.id); assert.equal(challenge(ch.id), ch); assert.ok(ISLANDS.includes(islandOf(ch)), ch.id); assert.ok(RECIPES[ch.id] !== undefined, `${ch.id} has no recipe`);
    for (const g of ch.goals(simulate(world(islandOf(ch)).terrain, new Map()), {})) { assert.ok(GOAL_TEXT[g.id], g.id); assert.equal(GOAL_TEXT[g.id](g).length, 2); assert.ok(!/undefined|NaN/.test(GOAL_TEXT[g.id](g).join(' ')), g.id); assert.equal(g.ok, false, `${g.id} is met on an empty island`); } }
  // free building on the other islands: its own slot, no extra goals, never on the medal board
  assert.deepEqual(ISLAND_TOWNS.map((c) => c.island), ['delta', 'hills']);
  for (const c of ISLAND_TOWNS) { assert.ok(c.free && c.name && c.rule.j && c.rule.s); assert.equal(challenge(c.id), c); assert.ok(!CHALLENGES.includes(c)); assert.deepEqual(c.goals(), []); }
});

for (const ch of CHALLENGES.filter((c) => RECIPES[c.id])) test(`"${ch.name}" can be passed on ${islandOf(ch) === 'home' ? 'the real island' : 'the ' + islandOf(ch) + ' island'}`, () => {
  const cells = build(RECIPES[ch.id].filter(([tool]) => !(ch.ban || []).includes(tool)), islandOf(ch));
  for (const c of cells.values()) assert.ok(!(ch.ban || []).includes(c.item), 'a banned build was used');
  const r = judge(ch, cells);
  assert.deepEqual(r.bad, [], `${ch.id}: not met ${r.bad} (families ${r.s.familiesSafe}, flooded ${r.s.flooded}, carbon ${r.s.carbon}, food ${r.s.food}/${r.s.foodNeed}, winter ${r.s.power.winterSupply}/${r.s.power.demand}, walk ${r.s.walkMax}, needs ${r.s.needsMax}, health ${r.s.petals.health}, nature ${r.s.nature}/${r.s.natureStart} petal ${r.s.petals.nature}, wood ${r.s.woodIntact}, species ${JSON.stringify(r.s.species)}, community ${r.s.petals.community}, score ${r.sc.total})`);
  assert.ok(r.town <= (ch.cap || SANDBOX_TOWN_CAP), `${r.town} tiles of town land`); assert.ok(r.st.passed);
  assert.ok(['bronze', 'silver', 'gold'].includes(challengeMedal(r.sc)));
});

test('an ordinary complete town does not pass the hard challenges by accident', () => {
  const cells = build(ORDINARY.home);
  assert.deepEqual(judge({ goals: () => [] }, cells).bad, [], 'the ordinary town should meet the eight goals');
  for (const id of ['light', 'big', 'wild']) assert.equal(judge(challenge(id), cells).st.passed, false, id);
  assert.ok(judge(challenge('tiny'), cells).town > challenge('tiny').cap, 'the ordinary town fits the tiny cap');
});

for (const [island, hard, tiny] of [['delta', ['d-dry', 'd-wild', 'd-big'], null], ['hills', ['h-wood'], 'h-tiny']]) test(`the ${island} island: an ordinary town meets the eight goals (and so the free town can be completed), but not the hard challenges`, () => {
  const cells = build(ORDINARY[island], island); const free = ISLAND_TOWNS.find((c) => c.island === island);
  const r = judge(free, cells); assert.deepEqual(r.bad, [], `${island}: ${r.bad} (nature ${r.s.nature}/${r.s.natureStart}, species ${JSON.stringify(r.s.species)}, walk ${r.s.walkMax}, health ${r.s.petals.health})`); assert.ok(r.st.passed); assert.ok(r.town <= SANDBOX_TOWN_CAP);
  for (const id of hard) assert.equal(judge(challenge(id), cells).st.passed, false, id);
  if (tiny) assert.ok(r.town > challenge(tiny).cap);
});

test('a challenge recipe from one island does not carry to another: the delta floods a home-island town', () => {
  // the home island's ordinary town, tile for tile, on the delta: most of it now stands on flood land
  const cells = build(ORDINARY.home); const r = judge({ goals: () => [] }, cells, 'delta');
  assert.ok(r.s.flooded >= 4, `flooded ${r.s.flooded}`); assert.ok(r.bad.includes('homes'));
});

test('Florence’s own town is wrong in the ways the lenses show, and can be put right', () => {
  const cells = florenceTown(tiles); const ch = challenge('fix'); const r = judge(ch, cells);
  assert.ok(r.s.flooded >= 6, `flooded homes ${r.s.flooded}`); assert.ok(r.s.carbon > 160, `carbon ${r.s.carbon}`); assert.ok(!r.s.power.winterOK); assert.ok(r.s.walkMax > 15, `walk ${r.s.walkMax}`);
  assert.equal(r.st.passed, false); assert.ok(r.bad.length >= 5, String(r.bad)); assert.ok(r.town <= SANDBOX_TOWN_CAP);
  assert.ok(school0, 'the old school is on the island');
  // put right: clear everything she built, then build an ordinary good town
  const fixed = build(ORDINARY.home);
  assert.ok(judge(ch, fixed).st.passed);
});

test('the better of two results is kept', () => {
  assert.deepEqual(better(null, { medal: 'bronze', score: 61 }), { medal: 'bronze', score: 61 });
  assert.equal(better({ medal: 'silver', score: 80 }, { medal: 'bronze', score: 99 }).medal, 'silver');
  assert.equal(better({ medal: 'silver', score: 80 }, { medal: 'silver', score: 84 }).score, 84);
  assert.equal(challengeMedal({ medal: null }), 'bronze');
});
