import test from 'node:test'; import assert from 'node:assert';
import { goodSpots } from '../js/game/spots.js';
import { ITEMS } from '../js/world/catalog.js';

// a 6 x 3 strip: homes on the left, the old school on the right
const tiles = new Map(); for (let x = 0; x < 6; x++) for (let z = 0; z < 3; z++) tiles.set(`${x},${z}`, { k: `${x},${z}`, gx: x, gz: z, zone: 'town' });
tiles.get('5,1').fixed = 'oldschool';
const withHomes = () => new Map([['0,1', { item: 'timber', mods: [] }], ['0,0', { item: 'timber', mods: [] }]]);
const okFree = (cells) => (k) => !tiles.get(k).fixed && !cells.get(k)?.item;

test('a cycle lane goes on a line from the homes to the old school', () => {
  const cells = withHomes(); const r = goodSpots('cycle', { tiles, cells, items: ITEMS, ok: okFree(cells) });
  assert.equal(r.why.type, 'link'); assert.equal(r.why.to, 'oldschool'); assert.ok(r.keys.length >= 3);
  for (const k of r.keys) assert.ok(!cells.get(k) && k !== '5,1');
});

test('a cycle lane prefers the bridge to the mainland when there is one', () => {
  const cells = withHomes(); const r = goodSpots('cycle', { tiles, cells, items: ITEMS, ok: okFree(cells), bridge: '3,2' });
  assert.equal(r.why.to, 'bridge');
});

test('with no homes, a path says to build homes first', () => {
  const r = goodSpots('path', { tiles, cells: new Map(), items: ITEMS, ok: okFree(new Map()) });
  assert.equal(r.why.type, 'needHomes'); assert.equal(r.keys.length, 0);
});

test('a park goes right by the homes', () => {
  const cells = withHomes(); const r = goodSpots('park', { tiles, cells, items: ITEMS, ok: okFree(cells) });
  assert.equal(r.why.type, 'nearHomes'); assert.ok(r.why.n >= 2); assert.ok(['1,0', '1,1', '0,2', '1,2'].includes(r.keys[0]));
});

test('new homes go beside the other homes', () => {
  const cells = withHomes(); const r = goodSpots('timber', { tiles, cells, items: ITEMS, ok: okFree(cells) });
  assert.equal(r.why.type, 'besideHomes'); assert.ok(r.keys[0].startsWith('1,') || r.keys[0] === '0,2');
});

test('every good spot is a tile where the build is allowed', () => {
  const cells = withHomes(); const ok = (k) => okFree(cells)(k) && k !== '1,1';
  for (const id of ['cycle', 'path', 'park', 'school', 'mixed', 'timber', 'market']) for (const k of goodSpots(id, { tiles, cells, items: ITEMS, ok }).keys) assert.ok(ok(k), `${id} at ${k}`);
});
