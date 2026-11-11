// Challenge towns: every challenge can be passed on the real island (a town built by a fixed recipe), an ordinary
// town does not pass the hard ones by accident, and Florence's own town really is wrong in the ways the lenses show.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeTerrain } from '../js/world/terrain.js';
import { simulate } from '../js/sim/sim.js';
import { ITEMS } from '../js/world/catalog.js';
import { planPlace } from '../js/game/replace.js';
import { townGoals, SANDBOX_TOWN_CAP } from '../js/game/progress.js';
import { townScore } from '../js/game/score.js';
import { CHALLENGES, challenge, challengeState, challengeMedal, better, florenceTown, GOAL_TEXT } from '../js/game/challenges.js';

const terrain = makeTerrain(); const tiles = [...terrain.tiles.values()];
const empty = { mark: null, item: null, mods: [], locked: false };
const school0 = tiles.find((t) => t.fixed === 'oldschool');
const dist = (a, b) => Math.hypot(a.gx - b.gx, a.gz - b.gz);
// build a recipe: [tool, how many, zones]. Each goes on the allowed tile nearest the centre (homes: any home tile).
function build(recipe, cells = new Map(), centre = null) {
  const slope = tiles.filter((t) => t.zone === 'slope' && !t.fixed);
  centre ||= { gx: slope.reduce((a, t) => a + t.gx, 0) / slope.length, gz: slope.reduce((a, t) => a + t.gz, 0) / slope.length };
  for (const [tool, n, zones] of recipe) {
    let left = n; const it = ITEMS[tool];
    for (const t of [...tiles].sort((a, b) => dist(a, centre) - dist(b, centre))) {
      if (!left) break; if (t.fixed) continue; const c = cells.get(t.k) || empty;
      if (it.kind === 'mod') { if (!c.item || !ITEMS[c.item].home) continue; } else if (c.item || c.mark || !zones.includes(t.zone)) continue;
      const r = planPlace(tool, t, c); if (!r.cell) continue; cells.set(t.k, r.cell); left--;
    }
    assert.equal(left, 0, `no room for ${tool}`);
  }
  return cells;
}
function judge(ch, cells) {
  const s = simulate(terrain, cells); const x = { hasSchool: [...cells.values()].some((c) => c.item === 'school'), catches: 0 };
  const tg = townGoals(s, x); const st = challengeState(ch, s, x, tg); const sc = townScore(s, x);
  return { s, tg, st, sc, bad: [...tg, ...st.extra].filter((g) => !g.ok).map((g) => g.id), town: s.townTiles };
}
const D = ['slope', 'field'];
const COMMON = [['school', 1, D], ['market', 1, D], ['hall', 1, D], ['path', 3, D], ['park', 1, D]];
const RECIPES = {
  fix: null, // judged apart: Florence's town is repaired, not built
  tiny: [['cohousing', 8, D], ['school', 1, ['field']], ['mixed', 3, ['field']], ['wind', 2, ['field', 'coast']], ['battery', 2, ['field']], ['park', 2, ['field']], ['path', 2, ['field']]],
  light: [['straw', 14, D], ['heatpump', 14], ...COMMON, ['repair', 2, D], ['mixed', 3, ['field']], ['wind', 3, ['field', 'coast']], ['battery', 5, D]],
  still: [['timber', 10, D], ['solar', 2], ...COMMON, ['mixed', 3, ['field']], ['battery', 3, D]],
  wild: [['timber', 10, D], ...COMMON, ['mixed', 3, ['field']], ['wind', 3, ['coast']], ['battery', 2, D], ['hedge', 4, ['field']], ['orchard', 3, ['field']], ['hives', 2, ['field']], ['greenroof', 10]],
  big: [['cohousing', 12, D], ['heatpump', 12], ...COMMON, ['repair', 2, D], ['mixed', 4, ['field']], ['wind', 4, ['field', 'coast']], ['battery', 4, D]],
  near: [['school', 1, D], ['market', 1, D], ['allot', 2, D], ['timber', 10, D], ['hall', 1, D], ['path', 3, D], ['park', 1, D], ['mixed', 3, ['field']], ['wind', 3, ['field', 'coast']], ['battery', 2, D]],
};

test('seven challenges, each with a rule for both ages and text for its own goals', () => {
  assert.equal(CHALLENGES.length, 7); assert.equal(new Set(CHALLENGES.map((c) => c.id)).size, 7);
  for (const ch of CHALLENGES) { assert.ok(ch.name && ch.icon && ch.rule.j && ch.rule.s, ch.id); assert.equal(challenge(ch.id), ch);
    for (const g of ch.goals(simulate(terrain, new Map()), {})) { assert.ok(GOAL_TEXT[g.id], g.id); assert.equal(GOAL_TEXT[g.id](g).length, 2); assert.equal(g.ok, false, `${g.id} is met on an empty island`); } }
});

for (const ch of CHALLENGES.filter((c) => RECIPES[c.id])) test(`"${ch.name}" can be passed on the real island`, () => {
  const cells = build(RECIPES[ch.id].filter(([tool]) => !(ch.ban || []).includes(tool)));
  for (const c of cells.values()) assert.ok(!(ch.ban || []).includes(c.item), 'a banned build was used');
  const r = judge(ch, cells);
  assert.deepEqual(r.bad, [], `${ch.id}: not met ${r.bad} (families ${r.s.familiesSafe}, carbon ${r.s.carbon}, food ${r.s.food}/${r.s.foodNeed}, winter ${r.s.power.winterSupply}/${r.s.power.demand}, walk ${r.s.walkMax}, needs ${r.s.needsMax}, health ${r.s.petals.health}, nature ${r.s.petals.nature}, community ${r.s.petals.community}, score ${r.sc.total})`);
  assert.ok(r.town <= (ch.cap || SANDBOX_TOWN_CAP), `${r.town} tiles of town land`); assert.ok(r.st.passed);
  assert.ok(['bronze', 'silver', 'gold'].includes(challengeMedal(r.sc)));
});

test('an ordinary complete town does not pass the hard challenges by accident', () => {
  const cells = build([['timber', 10, D], ...COMMON, ['mixed', 3, ['field']], ['wind', 3, ['field', 'coast']], ['battery', 2, D]]);
  assert.deepEqual(judge({ goals: () => [] }, cells).bad, [], 'the ordinary town should meet the eight goals');
  for (const id of ['light', 'big', 'wild']) assert.equal(judge(challenge(id), cells).st.passed, false, id);
  assert.ok(judge(challenge('tiny'), cells).town > challenge('tiny').cap, 'the ordinary town fits the tiny cap');
});

test('Florence’s own town is wrong in the ways the lenses show, and can be put right', () => {
  const cells = florenceTown(tiles); const ch = challenge('fix'); const r = judge(ch, cells);
  assert.ok(r.s.flooded >= 6, `flooded homes ${r.s.flooded}`); assert.ok(r.s.carbon > 160, `carbon ${r.s.carbon}`); assert.ok(!r.s.power.winterOK); assert.ok(r.s.walkMax > 15, `walk ${r.s.walkMax}`);
  assert.equal(r.st.passed, false); assert.ok(r.bad.length >= 5, String(r.bad)); assert.ok(r.town <= SANDBOX_TOWN_CAP);
  assert.ok(school0, 'the old school is on the island');
  // put right: clear everything she built, then build an ordinary good town
  const fixed = build([['timber', 10, D], ...COMMON, ['mixed', 3, ['field']], ['wind', 3, ['field', 'coast']], ['battery', 2, D]]);
  assert.ok(judge(ch, fixed).st.passed);
});

test('the better of two results is kept', () => {
  assert.deepEqual(better(null, { medal: 'bronze', score: 61 }), { medal: 'bronze', score: 61 });
  assert.equal(better({ medal: 'silver', score: 80 }, { medal: 'bronze', score: 99 }).medal, 'silver');
  assert.equal(better({ medal: 'silver', score: 80 }, { medal: 'silver', score: 84 }).score, 84);
  assert.equal(challengeMedal({ medal: null }), 'bronze');
});
