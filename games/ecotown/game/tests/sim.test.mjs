// node --test games/ecotown/game/tests
// Checks that the honest simulation and the literal planner produce each level's intended
// mistake for the vague instruction, and that the clear instruction fixes it.
import test from 'node:test';
import assert from 'node:assert/strict';
import { makeTerrain } from '../js/world/terrain.js';
import { simulate, cellOf } from '../js/sim/sim.js';
import { plan, applyPlacements } from '../js/sim/planner.js';
import { TARGETS, placeReason, ITEMS } from '../js/world/catalog.js';
import { LEVELS as RULES } from '../js/game/levels.js';

const terrain = makeTerrain();
const LEVELS = [
  ['land', ['best'], ['dry', 'sunny', 'keep_meadow']],
  ['move', ['easy_access'], ['safe_walking', 'cycling', 'cars_at_edge']],
  ['homes', ['strong'], ['warm', 'low_carbon', 'natural_materials']],
  ['food', ['max_food'], ['enough_food', 'keep_hedges', 'bees']],
  ['power', ['clean_power'], ['enough_power', 'winter', 'night', 'storage', 'solar', 'save_water', 'compost']],
  ['heart', ['middle'], ['walk_time']],
];
const ctxOf = (cells) => ({ moveTiles: [...cells.values()].filter((c) => c.item && ITEMS[c.item].level === 'move').length, hasSchool: [...cells.values()].some((c) => c.item === 'school') });
const FLAW = {
  land: (s) => s.townFlooded >= 6,
  move: (s) => s.unsafeCrossings > 0,
  homes: (s) => s.homesCarbon >= 2.5 * 70,
  food: (s) => !s.species.bees || !s.species.deer,
  power: (s) => s.power.avgOK && !s.power.winterOK,
  heart: (s) => s.walkMax >= 20,
};

let cells = new Map();
const results = {};
for (const [level, vague, clear] of LEVELS) {
  test(`${level}: vague instruction produces the intended mistake; clear one fixes it`, () => {
    const ctx = { terrain, cells, numbers: { minutes: 10 } };
    const pv = plan(level, vague, ctx);
    const sv = simulate(terrain, applyPlacements(cells, pv.placements));
    assert.ok(FLAW[level](sv), `vague plan should be flawed (${JSON.stringify(pick(sv))})`);
    const pc = plan(level, clear, ctx);
    const next = applyPlacements(cells, pc.placements);
    const sc = simulate(terrain, next);
    assert.ok(!FLAW[level](sc), `clear plan should pass (${JSON.stringify(pick(sc))})`);
    assert.ok(pc.experience <= pv.experience, 'clearer requests are less familiar, so Florence is honestly less sure');
    // the habit is graded against what Florence actually assumed: every vague plan names one, clear plans none
    assert.ok(pv.habit && pv.habitWhy, `vague ${level} plan names its habit`); assert.equal(pc.habit, null, `clear ${level} plan has no habit`);
    // the level's own pass rule agrees with the clear plan (what the player sees on the build panel)
    if (level !== 'move') assert.ok(RULES[level].pass(sc, ctxOf(next)), `clear ${level} plan passes the level rule`);
    // nothing is ever planned on the protected wetland except paths, green bridges and reed beds
    for (const p of pc.placements.concat(pv.placements)) { const t = terrain.tiles.get(p.k); if (t.zone === 'wetland') assert.ok(['path', 'greenbridge', 'reedbed'].includes(p.item) || p.mark === 'wild', `${level}: ${p.item || p.mark} planned on the wetland`); }
    for (const c of next.values()) if (c.item) c.locked = true;
    cells = next; results[level] = sc;
  });
}

test('one walking rule: the clear school plan is within it, the vague one is not', () => {
  assert.equal(TARGETS.walkMinutes, 15); assert.equal(TARGETS.schoolWalk, TARGETS.walkMinutes);
  assert.ok(results.heart.walkMax <= TARGETS.walkMinutes, `clear plan walk ${results.heart.walkMax}`);
});
test('level 5 needs power, rainwater and waste', () => {
  const s = results.power; assert.ok(s.power.winterOK && s.drains >= 1 && s.waste >= 1, JSON.stringify({ d: s.drains, w: s.waste }));
  assert.ok(!RULES.power.pass({ ...s, drains: 0 }), 'no rain garden: fails'); assert.ok(!RULES.power.pass({ ...s, waste: 0 }), 'no compost or repair: fails');
});
test('carbon: only under the town limit counts as OK, including town-meeting carbon', () => {
  const cells = new Map(); const base = simulate(terrain, cells);
  assert.ok(base.carbonOK); const over = simulate(terrain, cells, { addCarbon: TARGETS.carbonCeiling + 1 });
  assert.ok(!over.carbonOK, 'over the limit is not OK'); assert.ok(over.petals.carbon < 1, 'petal below enough when over');
});
test('the wetland is protected for every item, in every level', () => {
  const wet = [...terrain.tiles.values()].find((t) => t.zone === 'wetland'); const empty = { mark: null, item: null, mods: [] };
  for (const [id, it] of Object.entries(ITEMS)) { if (it.kind === 'mod') continue; const r = placeReason(id, wet, empty); const allowed = ['wild', 'path', 'greenbridge', 'reedbed'].includes(id); assert.equal(!r, allowed, `${id} on wetland: ${r}`); }
});
test('the car park never goes on flood land', () => {
  for (const land of [['best'], ['flat'], ['dry', 'near_coast'], ['flat', 'dry'], ['dry', 'sunny', 'keep_meadow']]) {
    let cells = applyPlacements(new Map(), plan('land', land, { terrain, cells: new Map() }).placements);
    const p = plan('move', ['safe_walking', 'cars_at_edge'], { terrain, cells });
    for (const x of p.placements) if (x.item === 'carpark') assert.ok(['field', 'slope'].includes(terrain.tiles.get(x.k).zone), `car park on ${terrain.tiles.get(x.k).zone} after ${land}`);
  }
});
test('town land is capped and in range', () => {
  const s = simulate(terrain, applyPlacements(new Map(), plan('land', ['dry', 'sunny', 'keep_meadow'], { terrain, cells: new Map() }).placements));
  assert.ok(s.townTiles <= TARGETS.townTiles && s.townTiles >= TARGETS.townTiles - 2, `town tiles ${s.townTiles}`);
});

test('final town meets the brief', () => {
  const s = results.heart;
  assert.ok(s.families >= 36, `families ${s.families}`);
  assert.equal(s.flooded, 0);
  assert.ok(s.power.winterOK, 'lights on in winter');
  assert.ok(s.food >= s.foodNeed, `food ${s.food}/${s.foodNeed}`);
  console.log('town:', s.title, JSON.stringify(Object.fromEntries(Object.entries(s.petals).map(([k, v]) => [k, +v.toFixed(2)]))), 'walkMax', s.walkMax, 'carbon', s.carbon);
});

function pick(s) { return { townFlooded: s.townFlooded, unsafe: s.unsafeCrossings, homesCarbon: s.homesCarbon, fam: s.families, species: s.species, power: s.power, walkMax: s.walkMax, food: s.food, need: s.foodNeed }; }
