// The town score: one number out of 100 for how well the town works, so a finished town can still be made better
// and a new town can beat the last one. The eight goals say "enough"; the score rewards going further (lower carbon,
// shorter walks, more room for nature) and catching Florence's wrong ideas. Pure (tests/score.test.mjs).
// townScore(s, x): s = simulate(...) result; x = { hasSchool, catches }.
const clamp = (v) => Math.max(0, Math.min(1, v));
// from `lo` (worth `base` of the points) up to `hi` (all of them); below `lo`, in proportion
const ramp = (v, lo, hi, base) => (v >= lo ? base + (1 - base) * clamp((v - lo) / (hi - lo)) : base * clamp(v / lo));

// A town that only just meets the eight goals scores in the 70s (silver). Gold (90) takes more than "enough": more
// homes, lower carbon, shorter walks, spare winter power, more places to meet, and catching Florence's wrong ideas.
export const PARTS = [
  { id: 'homes', max: 15, of: (s) => ramp(s.familiesSafe, 40, 56, 0.8) },
  { id: 'food', max: 10, of: (s) => (s.families ? clamp(s.food / Math.max(1, s.foodNeed)) : 0) },
  { id: 'nature', max: 10, of: (s) => (s.families ? ramp(s.petals.nature, 1.2, 1.5, 0.5) * (s.species?.bees && s.species?.deer ? 1 : 0.5) : 0) },
  { id: 'health', max: 10, of: (s) => (s.families ? ramp(s.petals.health, 1, 1.5, 0.6) : 0) },
  // winter power: most of the points when a still winter night is covered, all of them with 30 % to spare
  { id: 'energy', max: 10, of: (s) => { if (!s.families) return 0; const r = (s.power?.winterSupply || 0) / Math.max(1, s.power?.demand || 1); return s.power?.winterOK ? ramp(r, 1, 1.3, 0.8) : 0.8 * clamp(r); } },
  { id: 'community', max: 10, of: (s) => (s.families ? ramp(s.petals.community, 1, 1.5, 0.6) : 0) },
  // carbon: all the points at 50 t or less, 40 % of them at the 160 t limit, none at 250 t
  { id: 'carbon', max: 20, of: (s) => (!s.families ? 0 : s.carbon <= 50 ? 1 : s.carbon <= 160 ? 1 - 0.6 * (s.carbon - 50) / 110 : 0.4 * clamp((250 - s.carbon) / 90)) },
  // walk: all the points when every home is within 8 minutes of the town's school, 60 % of them at 15
  { id: 'walk', max: 10, of: (s, x) => (!s.families || !x.hasSchool ? 0 : s.walkMax <= 8 ? 1 : s.walkMax <= 15 ? 1 - 0.4 * (s.walkMax - 8) / 7 : 0.6 * clamp((30 - s.walkMax) / 15)) },
  { id: 'catches', max: 5, of: (s, x) => clamp((x.catches || 0) / 5) },
];
export const MEDALS = [{ id: 'gold', at: 90 }, { id: 'silver', at: 75 }, { id: 'bronze', at: 60 }];

export function townScore(s, x = {}) {
  // a village is not a town: every part except the homes themselves counts in proportion to the 40 families housed
  // (a 15-family hamlet with a park and a turbine used to out-score a full town)
  const size = clamp((s.familiesSafe || 0) / 40);
  const parts = PARTS.map((p) => { const got = Math.round(p.max * clamp(p.of(s, x)) * (p.id === 'homes' ? 1 : size) * 10) / 10; return { id: p.id, max: p.max, got }; });
  const total = Math.round(parts.reduce((a, p) => a + p.got, 0));
  const medal = MEDALS.find((m) => total >= m.at)?.id || null;
  const next = [...MEDALS].reverse().find((m) => total < m.at) || null; // the next medal up, if any
  // where the most points are still to be had (ties: the earlier part)
  const gain = parts.map((p) => ({ id: p.id, left: Math.round((p.max - p.got) * 10) / 10 })).sort((a, b) => b.left - a.left)[0];
  return { total, medal, next: next ? { id: next.id, need: next.at - total } : null, parts, gain: gain.left > 0 ? gain : null };
}
