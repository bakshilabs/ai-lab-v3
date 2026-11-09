import test from 'node:test'; import assert from 'node:assert';
import { readTargets, checkTargets, targetLine } from '../js/ai/targets.js';

test('reads the numbers the review typed', () => {
  assert.deepEqual(readTargets('food', 'Provide at least 29 food units for 40 households, keep the hedges'), [{ id: 'food', asked: 29, dir: 'min' }]);
  assert.deepEqual(readTargets('power', 'Provide at least 21 power units on a still winter night for 40 households'), [{ id: 'power', asked: 21, dir: 'min' }]);
  const h = readTargets('homes', 'Provide warm homes for 40 households using timber and straw, keep embodied carbon below 70 tonnes');
  assert.deepEqual(h.map((t) => [t.id, t.asked, t.dir]), [['families', 40, 'min'], ['carbon', 70, 'max']]);
  assert.deepEqual(readTargets('land', 'dry land for 40 families'), []); // only the mission's own measures
});

test('checks a target against the same simulation numbers and says it back', () => {
  const [f] = checkTargets(readTargets('food', 'at least 29 food units'), { food: 138, foodNeed: 14 });
  assert.equal(f.met, true); assert.match(targetLine(f, false), /≥ 29 food units\. Plan: 138 ✓ met; the town needs 14/);
  const [p] = checkTargets(readTargets('power', '21 power units'), { power: { winterSupply: 13, demand: 12 } });
  assert.equal(p.met, false); assert.match(targetLine(p, true), /at least 21 .* only gives 13 ✗/);
  const [c] = checkTargets([{ id: 'carbon', asked: 70, dir: 'max' }], { homesCarbon: 70 });
  assert.equal(c.met, true); // exactly at the limit counts (review A-01: thresholds agree everywhere)
});
