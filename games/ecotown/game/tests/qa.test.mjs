// Florence's classroom answers (js/game/qa.js): a fixed, kid-safe set matched by keywords or a build's name.
import test from 'node:test';
import assert from 'node:assert/strict';
import { answer, TOPICS, SUGGEST } from '../js/game/qa.js';

test('a build named in a question gets its description and its video', () => {
  const r = answer('What does a heat pump do?', true); assert.equal(r.video, 'heatpump'); assert.match(r.text, /Heat pump/);
  assert.equal(answer('tell me about the wind turbine', false).video, 'wind');
});
test('topic questions get a topic answer', () => {
  assert.equal(answer('Why do you make mistakes?', true).topic, 'mistakes');
  assert.equal(answer('How do I stop flooding?', true).topic, 'flood');
  assert.equal(answer('how do I keep the lights on in winter', false).topic, 'energy');
});
test('anything else gets a friendly fallback, never an empty answer', () => {
  const r = answer('what is the capital of France', true); assert.equal(r.topic, null); assert.ok(r.text.length > 20);
  assert.ok(answer('', false).text.length > 20);
});
test('every suggested question has a real answer, and every topic answers both bands', () => {
  for (const b of ['j', 's']) for (const q of SUGGEST[b]) assert.notEqual(answer(q, b === 'j').topic, null, q);
  for (const t of TOPICS) { assert.ok(t.a.j && t.a.s, t.id); }
});
