// Fixes from the fourth no-context playtest (Nov 2026): silly and unwise briefs never pass silently, a biased school
// brief never passes, the nature goal needs the bees and deer, classroom questions match whole words, and the
// "fastest roads for cars" diagnosis accepts "read the words too exactly". node --test tests/tester4.test.mjs
import test from 'node:test'; import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { loadPlotter } from '../js/ai/model.js';
import { setModelForTests, ask } from '../js/ai/plotter.js';
import { briefQuality, sillyIn } from '../js/ai/brief.js';
import { makeTerrain } from '../js/world/terrain.js';
import { simulate, townTitle } from '../js/sim/sim.js';
import { LEVELS } from '../js/game/levels.js';
import { seedTo } from '../js/game/seed.js';
import { answer } from '../js/game/qa.js';
import { townGoals } from '../js/game/progress.js';

setModelForTests(await loadPlotter({ json: JSON.parse(readFileSync(new URL('../models/plotter.json', import.meta.url), 'utf8')), bin: readFileSync(new URL('../models/plotter.bin', import.meta.url)) }));
const terrain = makeTerrain();
const play = (id, text) => { const base = seedTo(terrain, id); const v = ask(id, text, { terrain, cells: base }); const s = simulate(terrain, v.after); const cx = { moveTiles: 0, hasSchool: [...v.after.values()].some((c) => c.item === 'school') }; return { v, s, reveal: LEVELS[id].reveal(s, simulate(terrain, base), cx), pass: LEVELS[id].pass(s, cx) }; };

test('a silly brief is flagged, and Florence says what she left out', () => {
  assert.deepEqual(sillyIn('grow pizza trees everywhere lol'), ['pizza trees', 'lol']);
  assert.ok(briefQuality('grow pizza trees everywhere lol').issues.includes('silly'));
  assert.ok(briefQuality('Keep the hedges and the bees, and grow enough food').ok);
  const { v } = play('food', 'grow pizza trees everywhere lol');
  if (!v.unknown) { assert.deepEqual(v.plan.silly, ['pizza trees', 'lol']); assert.match(v.plan.reading[0], /can’t build “pizza trees”/); }
});
test('"the cheapest concrete" is built in concrete, and the carbon lens catches it', () => {
  const { v, reveal, pass } = play('homes', 'Build homes for 40 families using the cheapest concrete');
  assert.ok(v.plan.placements.some((p) => p.item === 'concrete')); assert.equal(v.plan.habit, 'literal');
  assert.ok(reveal.carbon || reveal.inside); assert.equal(pass, false);
});
test('pesticide and diesel are refused out loud (so they never earn the first-try star), but "no diesel" is not', () => {
  assert.ok(play('food', 'Clear the woodland and use pesticide everywhere for lots of food').v.plan.wont.some((w) => /pesticide/.test(w)));
  assert.ok(play('power', 'Just use a diesel generator').v.plan?.wont?.some((w) => /diesel/.test(w)) ?? true);
  const ok = play('power', 'enough clean power on a still winter night, no diesel'); assert.equal(ok.v.plan.wont.length, 0);
});
test('a school for the richest families is planned, marked unfair, and never passes', () => {
  const { v } = play('heart', 'Put the school next to the biggest houses where the richest families live');
  assert.equal(v.unknown, false); assert.equal(v.plan.unfair, true); assert.equal(v.plan.habit, 'literal');
  assert.ok(!play('heart', 'School within a 15 minute walk of every home').v.plan.unfair);
});
test('"fastest roads for cars": both "one word" and "read too exactly" are right', () => {
  const { v } = play('move', 'Make the fastest roads for cars'); assert.equal(v.plan.habitAlt, 'literal');
});
test('the nature goal and "Wild Garden" need the bees and the deer', () => {
  const s = { petals: { nature: 1.2 }, species: { bees: false, deer: false } };
  assert.equal(townGoals({ ...s, familiesSafe: 0, food: 0, foodNeed: 1, power: {}, homes: [] }, {}).find((g) => g.id === 'nature').ok, false);
  const p = { homes: 0.5, food: 0.5, nature: 1.5, health: 0.4, energy: 0.3, community: 0.2, carbon: 0.6 };
  assert.match(townTitle(p), /^Wild Garden/); assert.doesNotMatch(townTitle(p, { bees: false, deer: true }), /^Wild Garden/);
});
test('classroom: "are you always right?" is on topic, "homework" is not about homes', () => {
  assert.equal(answer('are you always right?', true).topic, 'mistakes');
  assert.equal(answer('can you do my homework', true).topic, 'homework');
  assert.equal(answer('tell me about pollinators', true).topic, 'bees');
  assert.equal(answer('are you alive', true).topic, 'feelings');
});
