// Numbers in a typed brief ("at least 29 food units", "keep embodied carbon below 70 tonnes", "21 power units on a still
// winter night", "homes for 40 households"): read them, then say back what was asked and what the plan actually gives,
// measured with the same simulation the checks use. Pure module (tests/targets.test.mjs).

const NUM = '(\\d{1,4})';
const RULES = [
  { id: 'food', level: 'food', re: new RegExp(`${NUM}\\s*(?:food\\s*(?:units?|baskets?)|(?:units?|baskets?)\\s*of\\s*food|baskets?)`, 'i'), dir: 'min' },
  { id: 'power', level: 'power', re: new RegExp(`${NUM}\\s*(?:power|energy|electricity)\\s*units?|${NUM}\\s*units?\\s*of\\s*(?:power|energy)`, 'i'), dir: 'min' },
  { id: 'families', level: 'homes', re: new RegExp(`${NUM}\\s*(?:families|households|homes|people)`, 'i'), dir: 'min' },
  { id: 'carbon', level: 'homes', re: new RegExp(`(?:below|under|less than|at most|max(?:imum)?|no more than|within)\\s*${NUM}\\s*(?:t\\b|tonnes?|tons?)`, 'i'), dir: 'max' },
];

// -> [{ id, asked, dir }] for the rules that belong to this mission
export function readTargets(level, text) {
  const t = String(text || '');
  const out = [];
  for (const r of RULES) {
    if (r.level !== level) continue;
    const m = t.match(r.re); if (!m) continue;
    const n = +(m[1] ?? m[2]); if (!Number.isFinite(n) || n <= 0) continue;
    out.push({ id: r.id, asked: n, dir: r.dir });
  }
  return out;
}

// what the plan gives for each target, from a simulation result
const GOT = {
  food: (s) => ({ got: s.food, need: s.foodNeed }),
  power: (s) => ({ got: s.power?.winterSupply ?? 0, need: s.power?.demand ?? 0 }),
  families: (s) => ({ got: s.familiesSafe, need: null }),
  carbon: (s) => ({ got: Math.round(s.homesCarbon ?? s.carbon ?? 0), need: null }),
};
export function checkTargets(targets, s) {
  return targets.map((t) => { const g = GOT[t.id](s); return { ...t, ...g, met: t.dir === 'min' ? g.got >= t.asked : g.got <= t.asked }; });
}

// one plain sentence per target, junior or senior wording
const UNIT = { j: { food: 'baskets of food', power: 'units of power on a still winter night', families: 'families', carbon: 'tonnes of carbon' }, s: { food: 'food units', power: 'power units (still winter night)', families: 'households', carbon: 't embodied carbon' } };
export function targetLine(t, j) {
  const u = UNIT[j ? 'j' : 's'][t.id]; const want = t.dir === 'min' ? (j ? 'at least' : '≥') : (j ? 'at most' : '≤');
  const need = t.need != null && t.need !== t.asked ? (j ? ` (the town needs ${t.need})` : `; the town needs ${t.need}`) : '';
  if (j) return t.met ? `You asked for ${want} ${t.asked} ${u}. My plan gives ${t.got} ✓${need}.` : `You asked for ${want} ${t.asked} ${u}, but my plan only gives ${t.got} ✗${need}.`;
  return `Your target: ${want} ${t.asked} ${u}. Plan: ${t.got} ${t.met ? '✓ met' : '✗ not met'}${need}.`;
}
