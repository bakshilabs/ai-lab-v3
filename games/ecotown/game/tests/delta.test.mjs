// What builds do for the town (js/game/delta.js) and the plain-language descriptions in the catalog.
import test from 'node:test';
import assert from 'node:assert/strict';
import { itemChips, simDelta, chipsText } from '../js/game/delta.js';
import { ITEMS } from '../js/world/catalog.js';
import { simulate, natureBaseline } from '../js/sim/sim.js';
import { makeTerrain } from '../js/world/terrain.js';

test('every item has a description for both age bands', () => {
  for (const [id, it] of Object.entries(ITEMS)) { assert.ok(it.desc?.j?.length > 10, id + ' j'); assert.ok(it.desc?.s?.length > 5, id + ' s'); }
});
test('item chips come from the catalog numbers, and less carbon counts as good', () => {
  const t = itemChips('timber'); assert.deepEqual(t.find((c) => c.key === 'homes'), { key: 'homes', v: 4, good: true });
  assert.equal(t.find((c) => c.key === 'carbon').good, false);
  const w = itemChips('wind'); assert.equal(w.find((c) => c.key === 'carbon').good, true); assert.ok(w.find((c) => c.key === 'energy').v > 0);
  assert.deepEqual(itemChips('nope'), []);
});
test('simDelta shows the real change a build makes to the town', () => {
  const terrain = makeTerrain(); const ns = natureBaseline(terrain);
  const field = [...terrain.tiles.values()].find((x) => x.zone === 'field' && !x.fixed);
  const a = new Map([[field.k, { mark: 'town', item: null, mods: [], locked: false }]]);
  const b = new Map([[field.k, { mark: 'town', item: 'timber', mods: [], locked: false }]]);
  const d = simDelta(simulate(terrain, a, { natureStart: ns }), simulate(terrain, b, { natureStart: ns }));
  assert.equal(d.find((c) => c.key === 'homes').v, 4);
  assert.ok(d.find((c) => c.key === 'carbon').v > 0);
  assert.match(chipsText(d), /\+4 👪/);
  assert.deepEqual(simDelta(simulate(terrain, a, { natureStart: ns }), simulate(terrain, a, { natureStart: ns })), []);
});
