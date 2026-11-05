// "Teach Plotter": a real classifier trained in the browser on Plotter's own sentence embeddings.
// Used for the Level 6 residents' summary: what Plotter learns depends entirely on the examples it is given.
import { getModel } from './plotter.js';

export const DRIVER = ['We need more parking near the shops', 'I can never find a space for my car', 'Please build a bigger car park', 'The road to the ferry is too narrow for cars', 'Drop-off at school takes ages in the car', 'Parking at the market is a nightmare', 'More car spaces by the hall please', 'I drive to work and the road is slow', 'Let cars into the town centre', 'Wider roads would help me get to work'];
export const WALKER = ['I want a safe path to walk to school', 'More cycle lanes please', 'Kids should be able to cross the road safely', 'Make the square car-free', 'Can we have benches along the footpath', 'The bike racks are always full', 'I walk my dog by the river path', 'Please slow the cars down near the park', 'A tram to the ferry would be great', 'I do not have a car, I need buses and paths', 'My wheelchair needs smooth pavements', 'Shade trees along the walking routes', 'I cycle to work every day', 'Quiet streets so children can play', 'Safer crossings near the school gate', 'More paths through the meadow', 'I want to walk to the market', 'Put the parking at the edge of town', 'Cargo bike parking by the shops', 'Footpaths that stay dry in winter'];

const sig = (z) => 1 / (1 + Math.exp(-z));
// features: what Plotter's language model reads in the comment (its 'move' slots: walking, cycling, tram, cars…),
// log-odds scaled. These are meaningful to children ("it noticed 'cycle'") and generalise to new sentences.
const emb = (t) => { const m = getModel(); if (!m) return null; const p = m.predict('move', t); const e = m.embed('move', t); return Float32Array.from([...Object.values(p.slots).map((v) => Math.log((v + 0.01) / (1.01 - v)) * 3), ...e]); };

// logistic regression with plain gradient descent; label 1 = "wants parking"
export function train(examples, { steps = 900, lr = 1.0 } = {}) {
  const raw = examples.map((e) => emb(e.text)); if (!raw[0]) return null;
  const d = raw[0].length; const w = new Float32Array(d); let b = 0;
  // standardise each feature using the training examples (plus a fixed reference set so a one-sided sample still has a scale)
  const ref = [...DRIVER, ...WALKER].map(emb); const mu = new Float32Array(d), sd = new Float32Array(d);
  for (const x of ref) for (let j = 0; j < d; j++) mu[j] += x[j] / ref.length;
  for (const x of ref) for (let j = 0; j < d; j++) sd[j] += (x[j] - mu[j]) ** 2 / ref.length;
  for (let j = 0; j < d; j++) sd[j] = Math.sqrt(sd[j]) + 1e-6;
  const norm = (x) => { const o = new Float32Array(d); for (let j = 0; j < d; j++) o[j] = (x[j] - mu[j]) / sd[j]; return o; };
  const X = raw.map(norm);
  const pos = examples.filter((e) => e.y).length, neg = examples.length - pos;
  b = Math.log((pos + 0.5) / (neg + 0.5));                                  // the base rate it starts from
  for (let it = 0; it < steps; it++) {
    const gw = new Float32Array(d); let gb = 0;
    examples.forEach((e, i) => { let z = b; const x = X[i]; for (let j = 0; j < d; j++) z += w[j] * x[j]; const g = sig(z) - e.y; for (let j = 0; j < d; j++) gw[j] += g * x[j]; gb += g; });
    for (let j = 0; j < d; j++) w[j] -= (lr * gw[j]) / examples.length + 3e-3 * w[j]; b -= (lr * gb) / examples.length;
  }
  return { predict: (t) => { const x = norm(emb(t)); let z = b; for (let j = 0; j < d; j++) z += w[j] * x[j]; return sig(z); } };
}

// Summarise every resident's comment with the trained classifier.
export function summarise(clf, comments) {
  const p = comments.map((c) => clf.predict(c));
  const parking = p.filter((v) => v >= 0.5).length;
  const share = parking / comments.length;
  return { parking, paths: comments.length - parking, share, text: share >= 0.5 ? 'Residents want more car parks' : 'Residents want safe paths and cycle lanes', sure: Math.round(100 * Math.max(share, 1 - share)) };
}
