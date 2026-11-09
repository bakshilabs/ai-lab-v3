// Fixes from the third no-context playtest (Nov 2026): Florence follows what a brief really says (and the lenses catch it),
// typed numbers and "not X" are honoured, classroom questions get an on-topic answer, finished missions stay replayable in
// class mode, and every town-meeting choice changes a real number. node --test tests/tester3.test.mjs
import test from 'node:test'; import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { loadPlotter } from '../js/ai/model.js';
import { setModelForTests, ask, avoidsIn } from '../js/ai/plotter.js';
import { makeTerrain } from '../js/world/terrain.js';
import { simulate } from '../js/sim/sim.js';
import { LEVELS } from '../js/game/levels.js';
import { seedTo } from '../js/game/seed.js';
import { answer } from '../js/game/qa.js';
import { labReady } from '../js/game/progress.js';
import { DILEMMAS, meetingEffect, cleanTownName } from '../js/game/content.js';

setModelForTests(await loadPlotter({ json: JSON.parse(readFileSync(new URL('../models/plotter.json', import.meta.url), 'utf8')), bin: readFileSync(new URL('../models/plotter.bin', import.meta.url)) }));
const terrain = makeTerrain();
const play = (id, text) => { const base = seedTo(terrain, id); const v = ask(id, text, { terrain, cells: base }); const s = simulate(terrain, v.after); const cx = { moveTiles: [...v.after.values()].filter((c) => ['road', 'path', 'cycle', 'tram', 'carpark'].includes(c.item)).length, hasSchool: [...v.after.values()].some((c) => c.item === 'school') }; return { v, s, reveal: LEVELS[id].reveal(s, simulate(terrain, base), cx), pass: LEVELS[id].pass(s, cx) }; };

test('"fastest route for cars" is about cars: she builds car roads and the street view catches it (no silent "no cars")', () => {
  const { v, reveal, pass } = play('move', 'Fastest route for cars to the school and ferry');
  assert.ok(!v.read.active.includes('no_cars'));
  assert.ok(reveal.street, 'the street view has something to find'); assert.equal(pass, false);
});
test('"bring our food in by lorry" is followed literally: nothing grown, and the plan misses the food', () => {
  const { v, s, pass } = play('food', 'Bring all our food in by lorry each week');
  assert.equal(v.plan.placements.length, 0); assert.equal(v.plan.habit, 'literal'); assert.ok(s.food < s.foodNeed); assert.equal(pass, false);
});
test('"not concrete" is honoured, and 40 families means 40', () => {
  assert.ok(avoidsIn('strong homes but NOT concrete').has('concrete'));
  const a = play('homes', 'strong homes but NOT concrete'); assert.ok(!a.v.plan.placements.some((p) => p.item === 'concrete'));
  const b = play('homes', 'strong warm homes for 40 families'); assert.ok(b.s.families >= 40, `families ${b.s.families}`); assert.equal(b.pass, true);
});
test('"cheap" alone is not reported as "strong and many"', () => {
  const { v } = play('homes', 'cheap homes'); assert.match(v.plan.assumptions.join(' '), /^Cheap matters most/); assert.doesNotMatch(v.plan.assumptions.join(' '), /Strong/);
});
test('an explicit "keep" is never dropped', () => {
  const { v } = play('land', 'Dry land please, and keep the wetland and the wood wild');
  assert.ok(v.read.active.includes('keep_wood') && v.read.active.includes('keep_wetland'));
});
test('"where most families can reach it" is about the homes, and Florence says how she read "most"', () => {
  const { v } = play('heart', 'Put the school where most families can reach it');
  assert.match(v.plan.reading.join(' '), /Most families/);
});
test('classroom: off-topic questions get an honest on-topic answer, never an unrelated tip', () => {
  assert.equal(answer('are you alive? do you have feelings', true).topic, 'feelings');
  assert.equal(answer('Is nuclear power low carbon?', false).topic, 'otherpower');
  const f = answer('what is the capital of France', true); assert.equal(f.topic, null); assert.match(f.text, /only answer/);
});
test('class mode: a finished mission can be replayed; the next one is open; later ones wait', () => {
  const open = ['land', 'move', 'homes'];
  assert.equal(labReady('land', open, { land: { stars: 3 } }, true), true);
  assert.equal(labReady('move', open, { land: { stars: 3 } }, true), true);
  assert.equal(labReady('homes', open, { land: { stars: 3 } }, true), false);
});
test('every town-meeting choice that is not a plain "no" changes a real number', () => {
  for (const d of Object.values(DILEMMAS)) for (const o of d.options) if (o.label !== 'Decline') assert.doesNotMatch(meetingEffect(o.effect), /no change/, o.label);
  const base = simulate(terrain, seedTo(terrain, 'heart')); const more = simulate(terrain, seedTo(terrain, 'heart'), { addWinter: 4, addHealth: 1 });
  assert.ok(more.power.winterSupply > base.power.winterSupply && more.health > base.health);
});
test('town names: tags are dropped as words, not glued on', () => {
  assert.equal(cleanTownName('Poopy <b>town</b>'), 'Poopy Town');
});
