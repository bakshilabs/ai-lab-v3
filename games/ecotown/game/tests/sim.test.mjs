// node --test games/ecotown/game/tests
// Checks that the honest simulation and the literal planner produce each level's intended
// mistake for the vague instruction, and that the clear instruction fixes it.
import test from 'node:test';
import assert from 'node:assert/strict';
import { makeTerrain } from '../js/world/terrain.js';
import { simulate, cellOf } from '../js/sim/sim.js';
import { plan, applyPlacements } from '../js/sim/planner.js';

const terrain = makeTerrain();
const LEVELS = [
  ['land', ['best'], ['dry', 'sunny', 'keep_meadow']],
  ['move', ['easy_access'], ['safe_walking', 'cycling', 'cars_at_edge']],
  ['homes', ['strong'], ['warm', 'low_carbon', 'natural_materials']],
  ['food', ['max_food'], ['enough_food', 'keep_hedges', 'bees']],
  ['power', ['clean_power'], ['enough_power', 'winter', 'night', 'storage', 'solar']],
  ['heart', ['middle'], ['walk_time']],
];
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
    assert.ok(pc.experience <= pv.experience, 'clearer requests are less familiar, so Plotter is honestly less sure');
    for (const c of next.values()) if (c.item) c.locked = true;
    cells = next; results[level] = sc;
  });
}

test('final town meets the brief', () => {
  const s = results.heart;
  assert.ok(s.families >= 36, `families ${s.families}`);
  assert.equal(s.flooded, 0);
  assert.ok(s.power.winterOK, 'lights on in winter');
  assert.ok(s.food >= s.foodNeed, `food ${s.food}/${s.foodNeed}`);
  console.log('town:', s.title, JSON.stringify(Object.fromEntries(Object.entries(s.petals).map(([k, v]) => [k, +v.toFixed(2)]))), 'walkMax', s.walkMax, 'carbon', s.carbon);
});

function pick(s) { return { townFlooded: s.townFlooded, unsafe: s.unsafeCrossings, homesCarbon: s.homesCarbon, fam: s.families, species: s.species, power: s.power, walkMax: s.walkMax, food: s.food, need: s.foodNeed }; }
