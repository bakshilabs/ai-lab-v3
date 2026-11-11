// More islands (best-seller plan, stage 3): the home island's tile grid never changes, the two new islands keep
// its grid, river, fixed tiles and bridge tile but are a different land, and the six missions still run on the
// home island's practice island.
import test from 'node:test'; import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { makeTerrain, ISLANDS, LAYOUTS, islandId, zoneAt, rimHeight } from '../js/world/terrain.js';
import { simulate, natureBaseline } from '../js/sim/sim.js';
import { seedTo } from '../js/game/seed.js';
import { HILLS_WOOD, CHALLENGES, ISLAND_TOWNS, islandOf } from '../js/game/challenges.js';

const hash = (t) => createHash('sha256').update([...t.tiles.values()].map((x) => [x.k, x.gx, x.gz, x.zone, x.h, x.hedge, x.fixed || ''].join('|')).join('\n')).digest('hex');
const count = (t) => { const n = {}; for (const x of t.tiles.values()) n[x.zone] = (n[x.zone] || 0) + 1; return n; };
// the home island's tile list (key, grid position, zone, height, hedge, fixed) hashed before the islands were added
const HOME = '2636698bfcbcc3d76f286f13a1c800edfc3bb12cfe2ada9e04792daa10926076';

test('the home island is byte-identical: the default, by name, and for any unknown name', () => {
  assert.equal(hash(makeTerrain()), HOME); assert.equal(hash(makeTerrain('home')), HOME); assert.equal(hash(makeTerrain('atlantis')), HOME);
  const t = makeTerrain(); assert.equal(t.layout, 'home'); assert.equal(t.zoneAt, zoneAt); assert.equal(t.rim, 1);
  assert.deepEqual([t.school, t.dock, t.lab], ['9,8', '5,8', '10,9']);
  assert.equal(islandId('delta'), 'delta'); assert.equal(islandId('x'), 'home'); assert.equal(islandId(null), 'home');
  assert.deepEqual(ISLANDS, ['home', 'delta', 'hills']);
  assert.equal(rimHeight(30, -36), rimHeight(30, -36, 1), 'the rim is unchanged at scale 1');
});

for (const id of ['delta', 'hills']) test(`the ${id} island keeps the grid, the river, the fixed tiles and the bridge tile`, () => {
  const home = makeTerrain(); const t = makeTerrain(id);
  assert.equal(t.layout, id); assert.ok(t.name && LAYOUTS[id].icon); assert.notEqual(hash(t), HOME);
  assert.deepEqual([...t.tiles.keys()], [...home.tiles.keys()], 'the same tiles exist');
  assert.deepEqual([t.school, t.dock, t.lab], [home.school, home.dock, home.lab]);
  for (const [k, x] of t.tiles) { assert.equal(x.zone === 'river', home.tiles.get(k).zone === 'river', k); assert.equal(x.fixed, home.tiles.get(k).fixed, k); if (x.fixed) assert.equal(x.zone, 'coast'); assert.ok(x.h >= 0 && x.h <= 5, `${k} height ${x.h}`); }
  for (const x of t.tiles.values()) if (['meadow', 'wetland', 'coast', 'river'].includes(x.zone)) assert.equal(x.h, 0, `${x.k} (${x.zone}) is low ground`);
  assert.ok(t.tiles.has('13,5'), 'the bridge tile'); assert.notEqual(t.tiles.get('13,5').zone, 'wood'); assert.notEqual(t.tiles.get('13,5').zone, 'wetland');
  // the mesh paints each voxel with the island's own zone rule: it agrees with the tiles at every tile centre
  for (const x of t.tiles.values()) if (x.zone !== 'river') assert.equal(t.zoneAt(-42 + x.gx * 6 + 3, -33 + x.gz * 6 + 3), x.zone, x.k);
  assert.equal(makeTerrain(id).tiles.get('9,4').zone, t.tiles.get('9,4').zone, 'deterministic');
});

test('the delta is mostly flood land, the hills are wood, slope and beach', () => {
  const h = count(makeTerrain()); const d = count(makeTerrain('delta')); const l = count(makeTerrain('hills'));
  assert.ok(d.meadow + d.wetland >= 50, `delta flood land ${d.meadow + d.wetland}`); assert.ok(d.wetland > 2 * h.wetland);
  assert.ok(d.slope + d.field <= 16, `delta dry ground ${d.slope + d.field}`); assert.ok(h.slope + h.field >= 40);
  assert.ok(l.field <= 6, `hills field ${l.field}`); assert.ok(l.wood >= 3 * h.wood); assert.ok(l.coast > h.coast + 10); assert.ok(l.slope >= h.slope);
  assert.equal(l.wood, HILLS_WOOD);
  // each island has what the town goals need: a wood and hedges for the deer, flood meadow or hedges for the bees
  for (const id of ['delta', 'hills']) { const t = makeTerrain(id); const s = simulate(t, new Map()); assert.ok(s.woodIntact >= 5 && s.hedges >= 4, `${id}: wood ${s.woodIntact}, hedges ${s.hedges}`); assert.ok(s.species.deer && s.species.bees); assert.ok(natureBaseline(t) > 0); }
  assert.ok(natureBaseline(makeTerrain('delta')) > natureBaseline(makeTerrain()), 'the delta starts wilder than the home island');
});

test('each island has its own nature baseline (the cache is per terrain)', () => {
  const a = makeTerrain(), b = makeTerrain('hills');
  const na = natureBaseline(a), nb = natureBaseline(b); assert.notEqual(na, nb); assert.equal(natureBaseline(a), na); assert.equal(simulate(b, new Map()).natureStart, nb);
});

test('the six missions run on the home island: the practice island is the same town as before the islands', () => {
  const cells = seedTo(makeTerrain(), 'heart');
  const sig = createHash('sha256').update([...cells].sort(([a], [b]) => (a < b ? -1 : 1)).map(([k, c]) => `${k}:${c.mark || ''}:${c.item || ''}:${(c.mods || []).join('+')}`).join('\n')).digest('hex');
  assert.equal(sig, PRACTICE);
});
const PRACTICE = '682a4e5e4dc2b749bba958948fa9247585656007f30ac3b56df553e7579cbb13'; // computed on the code before the islands were added

test('every challenge and island town names an island that exists', () => {
  for (const c of [...CHALLENGES, ...ISLAND_TOWNS]) assert.ok(ISLANDS.includes(islandOf(c)), c.id);
  assert.equal(new Set([...CHALLENGES, ...ISLAND_TOWNS].map((c) => c.id)).size, CHALLENGES.length + ISLAND_TOWNS.length);
});
