// Plotter model tests:  node --test games/ecotown/game/tests/model.test.mjs
// Gates checked here (JS int8 runtime):
//   * JS (int8) vs PyTorch (float): max |dp| <= 0.05, same thresholded labels on >= 98% (model/eval/ref_probs.json)
//   * JS tokenizer == Python tokenizer on the same sentences
//   * the 12 canonical cards get exactly their intended labels
//   * hand-written child phrasing list (model/sanity_child.json) >= 85% exact match
//   * predict() < 30 ms for a 32-token input
//   * API shape: predict / explain / embed / head / predictFromEmbedding
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { performance } from 'node:perf_hooks';
import { loadPlotter } from '../js/ai/model.js';
import { normalise } from '../js/ai/tokenizer.js';

const here = dirname(fileURLToPath(import.meta.url));
const game = join(here, '..');
const modelDir = join(game, '..', 'model');
const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));

const plotter = await loadPlotter({
  json: readJson(join(game, 'models', 'plotter.json')),
  bin: readFileSync(join(game, 'models', 'plotter.bin')),
});
const schema = readJson(join(game, 'js', 'ai', 'schema.json'));

const THR = 0.5;
function labelsOf(p) {
  if (p.unknown >= THR) return 'UNKNOWN';
  return Object.keys(p.slots).filter((s) => p.slots[s] >= THR).sort().join(',');
}

// Intended labels of the canonical cards (documented in model/README.md).
const CANON = {
  land: { vague: ['best'], clear: ['dry', 'keep_meadow', 'sunny'] },
  move: { vague: ['easy_access'], clear: ['cars_at_edge', 'cycling', 'safe_walking'] },
  homes: { vague: ['strong'], clear: ['low_carbon', 'natural_materials', 'warm'] },
  food: { vague: ['max_food'], clear: ['bees', 'enough_food', 'keep_hedges'] },
  power: { vague: ['clean_power', 'enough_power'], clear: ['enough_power', 'night', 'storage', 'winter'] },
  heart: { vague: ['middle'], clear: ['walk_time'] },
};

test('canonical cards get exactly their intended labels', () => {
  for (const [level, d] of Object.entries(schema.levels)) {
    for (const kind of ['vague', 'clear']) {
      const p = plotter.predict(level, d.canonical[kind]);
      assert.equal(labelsOf(p), CANON[level][kind].join(','), `${level} ${kind}: "${d.canonical[kind]}"`);
    }
  }
});

test('JS int8 agrees with PyTorch float (200 test sentences)', () => {
  const refs = readJson(join(modelDir, 'eval', 'ref_probs.json'));
  assert.ok(refs.length >= 200);
  let maxDiff = 0, same = 0, tokSame = 0;
  for (const r of refs) {
    const p = plotter.predict(r.level, r.text);
    for (const s of Object.keys(r.slots)) maxDiff = Math.max(maxDiff, Math.abs(p.slots[s] - r.slots[s]));
    maxDiff = Math.max(maxDiff, Math.abs(p.unknown - r.unknown));
    if (labelsOf(p) === labelsOf(r)) same++;
    if (JSON.stringify(p.tokens) === JSON.stringify(r.tokens)) tokSame++;
  }
  console.log(`  agreement: max |dp| = ${maxDiff.toFixed(4)}, same labels ${same}/${refs.length}`);
  assert.equal(tokSame, refs.length, 'JS and Python tokenizers differ');
  assert.ok(maxDiff <= 0.05, `max abs prob diff ${maxDiff}`);
  assert.ok(same / refs.length >= 0.98, `same labels ${same}/${refs.length}`);
});

test('hand-written child phrasing sanity list >= 85% exact', () => {
  const items = readJson(join(modelDir, 'sanity_child.json')).items;
  assert.ok(items.length >= 40);
  let ok = 0;
  const misses = [];
  for (const it of items) {
    const want = it.unknown ? 'UNKNOWN' : [...it.labels].sort().join(',');
    const got = labelsOf(plotter.predict(it.level, it.text));
    if (got === want) ok++;
    else misses.push(`[${it.level}] "${it.text}" want ${want || '-'} got ${got || '-'}`);
  }
  console.log(`  sanity: ${ok}/${items.length} = ${(ok / items.length).toFixed(3)}`);
  for (const m of misses) console.log('   miss', m);
  assert.ok(ok / items.length >= 0.85);
});

test('predict is fast (< 30 ms for 32 tokens)', () => {
  const long = 'please make sure the homes are warm cosy low carbon and built from local timber and straw bales ' +
    'with green roofs and reclaimed bricks and lots of them so many families can live there cheaply';
  const p0 = plotter.predict('homes', long);
  assert.equal(p0.tokens.length, 32);
  for (let i = 0; i < 20; i++) plotter.predict('homes', long); // warm up the JIT
  const n = 100;
  const t0 = performance.now();
  for (let i = 0; i < n; i++) plotter.predict('homes', long);
  const ms = (performance.now() - t0) / n;
  console.log(`  predict latency (32 tokens): ${ms.toFixed(2)} ms`);
  assert.ok(ms < 30, `${ms} ms`);
});

test('predict() shape: only that level\'s slots, unknown, tokens', () => {
  for (const [level, d] of Object.entries(schema.levels)) {
    const p = plotter.predict(level, 'hello');
    assert.deepEqual(Object.keys(p.slots).sort(), Object.keys(d.slots).sort());
    assert.ok(p.unknown >= 0 && p.unknown <= 1);
    assert.equal(p.tokens[0], `[L_${level}]`);
  }
  assert.throws(() => plotter.predict('nope', 'x'));
  // empty / odd input never throws
  for (const t of ['', '   ', '!!!', '😀😀', 'ÇAFÉ', null, undefined]) plotter.predict('land', t);
});

test('off-topic text is unknown', () => {
  assert.ok(plotter.predict('land', 'tell me a joke').unknown >= THR);
  assert.ok(plotter.predict('power', 'asdfghjkl').unknown >= THR);
  assert.ok(plotter.predict('homes', 'grow as much food as possible').unknown >= THR);
});

test('predict equals predictFromEmbedding(embed()) and head() has the right shape', () => {
  const text = 'Enough food, and keep the hedges for the bees.';
  const p = plotter.predict('food', text);
  const emb = plotter.embed('food', text);
  assert.ok(emb instanceof Float32Array);
  const q = plotter.predictFromEmbedding('food', emb);
  assert.deepEqual(q.slots, p.slots);
  assert.equal(q.unknown, p.unknown);

  const h = plotter.head('food');
  assert.deepEqual(h.slots, Object.keys(schema.levels.food.slots));
  assert.equal(h.d, emb.length);
  assert.equal(h.W.length, h.slots.length * h.d);
  assert.equal(h.b.length, h.slots.length);
  assert.equal(h.unknownW.length, h.d);
  // the same head passed as an override gives the same answer
  assert.deepEqual(plotter.predictFromEmbedding('food', emb, { W: h.W, b: h.b }).slots, p.slots);
  // a modified override changes only what it should
  const b2 = h.b.slice();
  b2[h.slots.indexOf('orchard')] += 20;
  const r = plotter.predictFromEmbedding('food', emb, { W: h.W, b: b2 });
  assert.ok(r.slots.orchard > 0.99);
  assert.equal(r.slots.bees, p.slots.bees);
  // mutating the returned head must not change the model
  h.W.fill(0);
  assert.deepEqual(plotter.predict('food', text).slots, p.slots);
});

test('explain() points at the words it picked up', () => {
  const ex = plotter.explain('food', "Don't cut the hedges, please");
  assert.equal(ex.length, 5);
  for (const e of ex) assert.ok(typeof e.word === 'string' && typeof e.weight === 'number');
  const top = ex.reduce((a, b) => (a.weight >= b.weight ? a : b));
  assert.equal(top.slot, 'keep_hedges');
  assert.ok(['hedges,', "Don't", 'cut'].includes(top.word), `top word ${top.word}`);
  const ex2 = plotter.explain('land', 'Dry, sunny land. Keep the meadow wild.');
  const bySlot = Object.fromEntries(['dry', 'sunny'].map((s) => [s, ex2.filter((e) => e.slot === s)]));
  assert.ok(bySlot.dry.some((e) => e.word === 'Dry,'));
  assert.ok(bySlot.sunny.some((e) => e.word === 'sunny'));
});

test('tokenizer normalisation', () => {
  assert.deepEqual(normalise("Don't  cut the HEDGES!!"), ['dont', 'cut', 'the', 'hedges']);
  assert.deepEqual(normalise('south-facing café'), ['south', 'facing', 'cafe']);
  assert.deepEqual(normalise('everyone’s 10-minute walk'), ['everyones', '10', 'minute', 'walk']);
});
