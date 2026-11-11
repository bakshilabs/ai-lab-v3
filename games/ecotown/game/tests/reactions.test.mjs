// The island reacts: a line for every build in the catalogue, grumbles only where the build earns one, and the
// animal news follows the simulation.
import test from 'node:test'; import assert from 'node:assert/strict';
import { ITEMS } from '../js/world/catalog.js';
import { reactionFor, speciesNews, ANIMALS } from '../js/game/reactions.js';

test('every build has a short line for ages 8–12, and something for 13–17', () => {
  for (const id of Object.keys(ITEMS)) { const good = [{ key: 'homes', v: 4, good: true }];
    for (const n of [0, 1, 2]) { const r = reactionFor(id, good, true, n); assert.ok(r && r.text, id); assert.ok(r.text.length <= 48, `${id}: "${r.text}" is too long for a bubble`); }
    assert.ok(reactionFor(id, good, false, 0)?.text, id + ' senior'); }
});
test('concrete, roads and big fields get a grumble; a good build that made things worse says so', () => {
  for (const id of ['concrete', 'road', 'carpark', 'bigfield']) assert.equal(reactionFor(id, [{ key: 'carbon', v: 6, good: false }], true).bad, true, id);
  assert.equal(reactionFor('timber', [{ key: 'homes', v: 4, good: true }], true).bad, false);
  const flooded = reactionFor('timber', [{ key: 'health', v: -1, good: false }], true); assert.equal(flooded.bad, true); assert.match(flooded.text, /worse|Oh no/);
  assert.equal(reactionFor('nothing-like-this', [], true), null);
});
test('animal news: who came back and who left', () => {
  const a = { species: { deer: true, bees: true, otters: false, birds: true, frogs: true } }, b = { species: { deer: false, bees: true, otters: true, birds: true, frogs: true } };
  assert.deepEqual(speciesNews(a, b), [{ id: 'deer', came: false }, { id: 'otters', came: true }]); assert.deepEqual(speciesNews(a, a), []);
  for (const x of Object.values(ANIMALS)) { assert.ok(x.back.j && x.back.s && x.gone.j && x.gone.s && x.icon && x.home); }
});
