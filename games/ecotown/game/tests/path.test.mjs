import test from 'node:test'; import assert from 'node:assert';
import { findPath, smooth } from '../js/world/path.js';

const grid = (rows) => (x, z) => (rows[z]?.[x] === '#' ? Infinity : rows[z]?.[x] === '~' ? 6 : 1);

test('goes around a wall of buildings', () => {
  const rows = ['.....', '.###.', '.....'];
  const p = findPath([2, 0], [2, 2], grid(rows), { w: 5, h: 3 });
  assert.ok(p); assert.deepEqual(p[0], [2, 0]); assert.deepEqual(p.at(-1), [2, 2]);
  for (const [x, z] of p.slice(1, -1)) assert.notEqual(rows[z][x], '#');
});

test('never cuts a corner between two blocked tiles', () => {
  const rows = ['.#', '#.'];
  assert.equal(findPath([0, 0], [1, 1], grid(rows), { w: 2, h: 2 }), null);
});

test('start and goal tiles may be buildings (walking up to a house)', () => {
  const p = findPath([0, 0], [3, 0], grid(['#..#']), { w: 4, h: 1 });
  assert.equal(p.length, 4);
});

test('prefers the long way round to wading the river', () => {
  const rows = ['.~.', '...', '...'];
  const p = findPath([0, 0], [2, 0], grid(rows), { w: 3, h: 3 });
  assert.ok(!p.some(([x, z]) => rows[z][x] === '~'));
});

test('smooth drops corners only when the line is clear', () => {
  const pts = [[0, 0], [5, 0], [10, 0], [10, 5]];
  assert.deepEqual(smooth(pts, () => true), [[0, 0], [10, 5]]);
  const s = smooth(pts, (x, z) => !(x > 6 && z > 0.5 && z < 4.5));
  assert.ok(s.length >= 3); assert.deepEqual(s.at(-1), [10, 5]);
});
