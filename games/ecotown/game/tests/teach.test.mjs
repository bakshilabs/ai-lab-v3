// Teach Plotter: a summary model trained only on drivers is biased; a balanced sample flips it.
import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'fs';
import { loadPlotter } from '../js/ai/model.js'; import { setModelForTests } from '../js/ai/plotter.js'; import * as T from '../js/ai/teach.js';
const dir = new URL('../models/', import.meta.url);
test('sampling bias appears and is fixed by balanced data', async () => {
  setModelForTests(await loadPlotter({ json: JSON.parse(fs.readFileSync(new URL('plotter.json', dir))), bin: fs.readFileSync(new URL('plotter.bin', dir)).buffer.slice(0) }));
  const comments = [...T.DRIVER.slice(0, 9), ...T.WALKER.slice(0, 21)];   // really 30% want parking
  let ex = T.DRIVER.slice(0, 8).map((t) => ({ text: t, y: 1 }));
  const biased = T.summarise(T.train(ex), comments);
  assert.ok(biased.share >= 0.7, `biased share ${biased.share}`); assert.match(biased.text, /car parks/);
  ex = ex.concat(T.WALKER.slice(0, 10).map((t) => ({ text: t, y: 0 })), T.DRIVER.slice(8, 10).map((t) => ({ text: t, y: 1 })));
  const fair = T.summarise(T.train(ex), comments);
  assert.ok(fair.share < 0.5, `fair share ${fair.share}`); assert.match(fair.text, /paths/);
});
