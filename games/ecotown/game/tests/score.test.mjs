// The town score: 0 for an empty island, more for a better town, and never over 100.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeTerrain } from '../js/world/terrain.js';
import { simulate } from '../js/sim/sim.js';
import { townScore, PARTS, MEDALS } from '../js/game/score.js';

const terrain = makeTerrain(); const tiles = [...terrain.tiles.values()];
const town = (n, item) => { const cells = new Map(); let i = 0; for (const t of tiles) if (i < n && t.zone === 'slope' && !t.fixed) { cells.set(t.k, { mark: 'town', item, mods: [], locked: false }); i++; } return cells; };
const sc = (cells, x = {}) => townScore(simulate(terrain, cells), { hasSchool: [...cells.values()].some((c) => c.item === 'school'), catches: 0, ...x });

test('the parts add up to 100 and an empty island scores 0 with no medal', () => {
  assert.equal(PARTS.reduce((a, p) => a + p.max, 0), 100);
  const r = sc(new Map()); assert.equal(r.total, 0); assert.equal(r.medal, null); assert.equal(r.next.id, 'bronze');
  assert.deepEqual(MEDALS.map((m) => m.id), ['gold', 'silver', 'bronze']);
});

test('more homes score more; concrete flats score less than timber for the same families', () => {
  const a = sc(town(3, 'timber')).total, b = sc(town(10, 'timber')).total; assert.ok(b > a && a > 0, `${a} ${b}`);
  const timber = sc(town(10, 'timber')), concrete = sc(town(7, 'concrete'));
  const carbon = (r) => r.parts.find((p) => p.id === 'carbon').got; assert.ok(carbon(timber) > carbon(concrete), `${carbon(timber)} ${carbon(concrete)}`);
});

test('catching Florence adds up to five points; the score says where the most is still to gain', () => {
  const cells = town(10, 'timber'); const r0 = sc(cells), r5 = sc(cells, { catches: 9 });
  assert.equal(r5.total - r0.total, 5); assert.ok(r0.gain && r0.gain.left > 0); assert.ok(r5.total <= 100);
  assert.ok(['walk', 'energy', 'community', 'food'].includes(r0.gain.id), r0.gain.id);
});
