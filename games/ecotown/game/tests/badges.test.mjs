// Badges: each is earned from the real simulation, once, and an empty island earns none.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeTerrain } from '../js/world/terrain.js';
import { simulate } from '../js/sim/sim.js';
import { BADGES, newBadges, badgeCount } from '../js/game/badges.js';

const terrain = makeTerrain(); const tiles = [...terrain.tiles.values()];
const X = { hasSchool: false, catches: 0, trusted: 0, labs: 0, threeStars: 0, complete: false };
const town = (n, item) => { const cells = new Map(); let i = 0; for (const t of tiles) if (i < n && t.zone === 'slope' && !t.fixed) { cells.set(t.k, { mark: 'town', item, mods: [], locked: false }); i++; } return cells; };

test('an empty island earns no badge; every badge has words for both ages', () => {
  assert.deepEqual(newBadges(simulate(terrain, new Map()), X), []);
  for (const b of BADGES) assert.ok(b.name && b.j.length > 8 && b.s.length > 8 && b.icon, b.id);
  assert.equal(new Set(BADGES.map((b) => b.id)).size, BADGES.length);
});

test('homes on dry land without cars earn the first badges, once', () => {
  const s = simulate(terrain, town(6, 'timber')); assert.equal(s.families, 24);
  const got = newBadges(s, X); assert.ok(got.includes('firsthome') && got.includes('dryfeet') && got.includes('carfree'), got.join());
  const have = Object.fromEntries(got.map((id) => [id, true]));
  assert.deepEqual(newBadges(s, X, have), []); assert.equal(badgeCount(have), got.length);
});

test('a car road loses the car-free badge; catches and missions come from the save', () => {
  const cells = town(6, 'timber'); const free = tiles.find((t) => t.zone === 'slope' && !t.fixed && !cells.get(t.k)); cells.set(free.k, { mark: null, item: 'road', mods: [], locked: false });
  assert.ok(!newBadges(simulate(terrain, cells), X).includes('carfree'));
  const got = newBadges(simulate(terrain, new Map()), { ...X, catches: 5, labs: 6, threeStars: 6 });
  assert.deepEqual(got.sort(), ['checker', 'labs', 'sharp', 'threestar']);
  assert.ok(!newBadges(simulate(terrain, new Map()), { ...X, catches: 5, trusted: 1 }).includes('checker'));
});
