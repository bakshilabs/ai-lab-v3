// Regression tests from the Nov 2026 playtest. node --test tests/playtest.test.mjs
// Every plan either shows its problem on some check, or passes its level: a player can never be left
// at the check menu with nothing to find. Also: step-free access, and Florence explaining what she won't do.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { loadPlotter } from '../js/ai/model.js';
import { setModelForTests, ask } from '../js/ai/plotter.js';
import { makeTerrain } from '../js/world/terrain.js';
import { simulate } from '../js/sim/sim.js';
import { accessCheck } from '../js/sim/access.js';
import { LEVELS, checksFor } from '../js/game/levels.js';
import { LEVEL_TEXT } from '../js/game/content.js';
import { ITEMS } from '../js/world/catalog.js';

setModelForTests(await loadPlotter({ json: JSON.parse(readFileSync(new URL('../models/plotter.json', import.meta.url), 'utf8')), bin: readFileSync(new URL('../models/plotter.bin', import.meta.url)) }));
const terrain = makeTerrain();
const ctxFor = (cells, id) => ({ moveTiles: [...cells.values()].filter((c) => c.item && ITEMS[c.item].level === 'move').length, hasSchool: [...cells.values()].some((c) => c.item === 'school'), access: id === 'move' ? accessCheck(terrain, cells) : null });
const land = ask('land', 'Dry, sunny land. Keep the meadow wild.', { terrain, cells: new Map() }).after; for (const c of land.values()) c.locked = true;

const MOVE = [
  'Make it easy, safe for everyone to get to school: walking, cycling, footpaths, no cars.',
  'Build a tram line all the way to school.',
  'Connect every home to the school and ferry with safe, affordable walking and cycling routes. Prioritise wheelchair users, young children and older residents; avoid cars in town and protect wetlands.',
  'Provide step-free, gentle-slope, well-lit footpaths and crossings with enough time for slower walkers. Ensure the ferry is accessible. Keep motor traffic out of residential streets.',
  'Build the fastest direct car roads from every home to school and the ferry. Ignore pedestrians, crossings and cyclists; prioritise drivers.',
  ...LEVEL_TEXT.move.cards.map((c) => c[0]),
];
for (const text of MOVE) test(`move: never stuck at the check menu: “${text.slice(0, 50)}…”`, () => {
  const r = ask('move', text, { terrain, cells: land }); assert.ok(!r.unknown);
  const s = simulate(terrain, r.after); const cx = ctxFor(r.after, 'move');
  const reveal = LEVELS.move.reveal(s, simulate(terrain, land), cx); const pass = LEVELS.move.pass(s, cx);
  assert.ok(pass || Object.keys(reveal).length, 'a failing plan must show its problem on a check');
  for (const k of Object.keys(reveal)) { assert.ok(checksFor('move', true, reveal).includes(k)); assert.ok(checksFor('move', false, reveal).includes(k)); assert.ok(LEVEL_TEXT.move.flaw[k], `flaw text for ${k}`); }
});

test('move: the clear card is step-free to school and ferry; the car plan is not', () => {
  const clear = ask('move', 'Safe walking and cycling. Cars stay at the edge.', { terrain, cells: land });
  assert.ok(accessCheck(terrain, clear.after).ok);
  const vague = ask('move', 'Make it easy for everyone to get to school.', { terrain, cells: land });
  const a = accessCheck(terrain, vague.after); assert.ok(!a.ok && a.issues > 0);
  assert.ok(LEVELS.move.reveal(simulate(terrain, vague.after), null, ctxFor(vague.after, 'move')).access, 'the step-free check shows the car plan’s problem too');
});

test('move: an accessibility brief shows up in Florence’s plan', () => {
  const r = ask('move', MOVE[3], { terrain, cells: land }); const t = r.plan.reading.join(' ');
  for (const w of ['Step-free', 'slopes', 'crossings', 'ferry', 'Lit']) assert.ok(t.includes(w), `mentions ${w}: ${t}`);
});

test('Florence says which unsafe parts of a brief she did not follow', () => {
  const car = ask('move', MOVE[4], { terrain, cells: land }); assert.ok(car.plan.wont.length >= 1, 'explains the car-road request');
  const fl = ask('land', 'Choose the cheapest flat land for 40 homes, even if it is in the floodplain. Ignore flood risk and clear any wetlands.', { terrain, cells: new Map() });
  assert.ok(simulate(terrain, fl.after).townFlooded === 0 && fl.plan.wont.length === 2, JSON.stringify(fl.plan.wont));
  // never claims a rule it broke: "best land" really floods, so no note about floods
  const best = ask('land', 'Find the best land, with lots of space.', { terrain, cells: new Map() }); assert.equal(best.plan.wont.length, 0);
});

test('every check has a description, for the “no problem here” result', async () => {
  const { CONTENT } = await import('../js/game/content.js');
  for (const band of ['junior', 'senior']) for (const k of Object.keys(CONTENT[band].checks)) assert.ok(CONTENT[band].checkWhat[k], `${band} ${k}`);
  for (const band of ['junior', 'senior']) for (const k of ['flawed', 'clean', 'missed']) assert.equal(CONTENT[band].stars[k].length, 3);
});
