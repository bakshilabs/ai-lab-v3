// Edge cases from the 9 Nov 2026 quality review (Sections 10 and 13): each one is played through Florence and the
// same simulation the lenses use. node --test tests/review.test.mjs
import test from 'node:test'; import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { loadPlotter } from '../js/ai/model.js';
import { setModelForTests, ask } from '../js/ai/plotter.js';
import { makeTerrain } from '../js/world/terrain.js';
import { simulate } from '../js/sim/sim.js';
import { LEVELS } from '../js/game/levels.js';
import { TARGETS } from '../js/world/catalog.js';
import { seedTo } from '../js/game/seed.js';

setModelForTests(await loadPlotter({ json: JSON.parse(readFileSync(new URL('../models/plotter.json', import.meta.url), 'utf8')), bin: readFileSync(new URL('../models/plotter.bin', import.meta.url)) }));
const terrain = makeTerrain();
const play = (id, text) => { const base = seedTo(terrain, id); const v = ask(id, text, { terrain, cells: base }); return { v, s: v.unknown ? null : simulate(terrain, v.after) }; };

test('teen L2 car-only: read as cars (not "no cars"), built literally, and the street view catches the crossings', () => {
  const { v, s } = play('move', 'Cars only. Fast car roads to every home and the school gate.');
  assert.ok(!v.read.active.includes('no_cars'));
  assert.match(v.plan.reading.join(' '), /Cars only/);
  assert.equal(v.plan.habit, 'literal');
  assert.ok(s.unsafeCrossings > 0, 'the street check has something real to find');
  assert.equal(v.plan.wont.length, 0, 'Florence never claims she refused something she then built');
});

test('junior L1 beach: the diagnosis names the beach the child chose, and the flood is real', () => {
  const { v, s } = play('land', 'Land by the beach, close to the sea.');
  assert.match(v.plan.habitWhy, /beach/);
  assert.ok(s.townFlooded > 0);
});

test('L3 homes: 40 families is a hard target (37 does not pass)', () => {
  const pass = LEVELS.homes.pass; const ok = { homesCarbon: 60, avgTemp: 20 };
  assert.equal(pass({ ...ok, families: 37 }, {}), false);
  assert.equal(pass({ ...ok, families: 40 }, {}), true);
});

test('L6 10-minute brief: Florence says the brief and the real longest walk', () => {
  const { v, s } = play('heart', 'Put the school within a 10-minute walk of every home');
  assert.equal(v.read.numbers.minutes, 10);
  assert.match(v.plan.reading.join(' '), /10-minute/);
  assert.match(v.plan.reading.join(' '), new RegExp(`${s.walkMax} minutes`));
});

test('A-01: exactly at the 15-minute rule counts as kept', () => {
  const kept = (x) => x.homes.length > 0 && x.walkMax <= TARGETS.walkMinutes; // the charter's promise
  assert.equal(kept({ homes: [1], walkMax: 15 }), true);
  assert.equal(kept({ homes: [1], walkMax: 16 }), false);
  assert.equal(kept({ homes: [], walkMax: 0 }), false); // no homes: not a promise kept
});

test('A-02: free-text numbers are said back against the plan (food and winter power)', () => {
  const f = play('food', 'Provide at least 29 food units for 40 households, keep the hedges and wetlands for bees, frogs and birds, and check biodiversity.');
  const tf = f.v.plan.targets.find((t) => t.id === 'food'); assert.equal(tf.asked, 29); assert.equal(tf.got, f.s.food); assert.equal(tf.met, f.s.food >= 29);
  const p = play('power', 'Provide at least 21 power units on a still winter night for 40 households, use solar, wind and batteries, add rain gardens and compost.');
  const tp = p.v.plan.targets.find((t) => t.id === 'power'); assert.equal(tp.asked, 21); assert.equal(tp.got, p.s.power.winterSupply); assert.equal(tp.met, p.s.power.winterSupply >= 21);
});
