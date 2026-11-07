// Free building: a tap replaces what's on a tile where it can (planPlace in js/game/replace.js).
import test from 'node:test';
import assert from 'node:assert/strict';
import { planPlace } from '../js/game/replace.js';
import { makeTerrain } from '../js/world/terrain.js';
import { emptyCell } from '../js/sim/sim.js';

const { tiles } = makeTerrain();
const find = (zone) => [...tiles.values()].find((t) => t.zone === zone && !t.fixed);
const field = find('field'), river = find('river'), wetland = find('wetland');
const fixed = [...tiles.values()].find((t) => t.fixed);
const cell = (o = {}) => ({ ...emptyCell(), ...o });

test('a free tile takes the new thing and replaces nothing', () => {
  const r = planPlace('town', field, cell());
  assert.deepEqual(r.cell.mark, 'town'); assert.equal(r.replaced, null); assert.deepEqual(r.removed, []);
});
test('Keep wild on a home replaces the home and its add-ons (refunded)', () => {
  const r = planPlace('wild', field, cell({ mark: 'town', item: 'timber', mods: ['solar'] }));
  assert.equal(r.cell.mark, 'wild'); assert.equal(r.cell.item, null); assert.deepEqual(r.cell.mods, []);
  assert.deepEqual(r.removed, ['timber', 'solar']); assert.equal(r.replaced, 'Timber terrace');
});
test('a farm on town land clears the town mark', () => {
  const r = planPlace('mixed', field, cell({ mark: 'town' }));
  assert.equal(r.why, undefined); assert.equal(r.cell.mark, null); assert.equal(r.cell.item, 'mixed'); assert.equal(r.replaced, 'Town land');
});
test('a farm on a home on town land clears both', () => {
  const r = planPlace('mixed', field, cell({ mark: 'town', item: 'straw', mods: ['heatpump'] }));
  assert.equal(r.cell.item, 'mixed'); assert.equal(r.cell.mark, null); assert.deepEqual(r.removed, ['straw', 'heatpump']);
});
test('a building on Keep wild land clears the wild mark', () => {
  const r = planPlace('orchard', field, cell({ mark: 'wild' }));
  assert.equal(r.why, undefined); assert.equal(r.cell.mark, null); assert.equal(r.cell.item, 'orchard'); assert.equal(r.replaced, 'Keep wild');
});
test('one home swaps for another and keeps its add-ons; a non-home drops them', () => {
  const a = planPlace('straw', field, cell({ mark: 'town', item: 'timber', mods: ['solar'] }));
  assert.equal(a.cell.item, 'straw'); assert.deepEqual(a.cell.mods, ['solar']); assert.deepEqual(a.removed, ['timber']);
  const b = planPlace('hall', field, cell({ mark: 'town', item: 'timber', mods: ['solar'] }));
  assert.equal(b.cell.item, 'hall'); assert.deepEqual(b.cell.mods, []); assert.deepEqual(b.removed, ['timber', 'solar']);
});
test('the same thing again is no change', () => {
  assert.equal(planPlace('town', field, cell({ mark: 'town' })).same, true);
  assert.equal(planPlace('timber', field, cell({ mark: 'town', item: 'timber' })).same, true);
  assert.equal(planPlace('solar', field, cell({ mark: 'town', item: 'timber', mods: ['solar'] })).same, true);
});
test('still blocked: fixed tiles, the river, the wetland, homes off town land, add-ons without a home', () => {
  assert.ok(planPlace('town', fixed, cell()).why);
  assert.ok(planPlace('town', river, cell()).why);
  assert.ok(planPlace('mixed', wetland, cell()).why);
  assert.ok(planPlace('timber', field, cell()).why);
  assert.ok(planPlace('timber', field, cell({ mark: 'wild' })).why);
  assert.ok(planPlace('solar', field, cell({ mark: 'town' })).why);
});
