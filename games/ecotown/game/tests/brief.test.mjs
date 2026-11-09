// A brief of repeats or emoji never earns "Well specified first time". node --test tests/brief.test.mjs
import test from 'node:test'; import assert from 'node:assert/strict';
import { briefQuality } from '../js/ai/brief.js';
import { LEVEL_TEXT } from '../js/game/content.js';

test('repeats, emoji and two-word briefs are not well specified', () => {
  assert.equal(briefQuality('🏠🏠🏠 dry dry dry dry dry').ok, false);
  assert.deepEqual(briefQuality('dry dry dry').issues.includes('repeats'), true);
  assert.equal(briefQuality('dry land').ok, false);
  assert.equal(briefQuality('🏠🌳🌊 land').ok, false);
});
test('ordinary clear briefs are fine', () => {
  for (const b of ['Find dry land that never floods, and keep the old wood wild.', 'Safe paths and cycle lanes so children can walk to school', 'Warm low-carbon homes from timber and straw for 40 families', 'Enough food for every family, and keep the hedges for the bees and deer']) assert.ok(briefQuality(b).ok, b);
});
test('every "clear" card in both age bands is well specified', () => {
  for (const lv of Object.values(LEVEL_TEXT)) for (const [text, kind] of lv.cards || []) if (kind === 'clear') assert.ok(briefQuality(text).ok, text);
});
