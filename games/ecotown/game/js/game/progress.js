// Free building: what is unlocked as the town grows, when an AI Lab mission is ready, and when the
// town is complete. Pure functions of the simulation, so they are unit-tested (tests/progress.test.mjs).
import { TARGETS } from '../world/catalog.js';
import { LEVEL_ORDER } from './levels.js';

// Town land in free building. Level 1's lab still plans 18 tiles (TARGETS.townTiles); a whole town with
// 40 families, a market and a hall needs more room than that.
export const SANDBOX_TOWN_CAP = 30;

// Build categories unlock as the town grows. `at(s)` is true once the category is open.
// `need` says what unlocks it, for the padlock on its tab.
export const TIERS = [
  { id: 'land', at: () => true },
  { id: 'move', at: () => true },
  { id: 'homes', at: (s) => s.townTiles >= 6, need: { j: 'Mark 6 tiles of town land', s: 'Designate 6 tiles of town land' }, progress: (s) => [s.townTiles, 6] },
  { id: 'food', at: (s) => s.families >= 12, need: { j: 'Homes for 12 families', s: '12 households housed' }, progress: (s) => [s.families, 12] },
  { id: 'power', at: (s) => s.families >= 24, need: { j: 'Homes for 24 families', s: '24 households housed' }, progress: (s) => [s.families, 24] },
  { id: 'heart', at: (s) => s.families >= 36 || (s.families >= 24 && s.food >= s.foodNeed), need: { j: '36 families, or 24 families with enough food', s: '36 households, or 24 with food ≥ need' }, progress: (s) => [s.families, s.food >= s.foodNeed ? 24 : 36] },
];

// `full`: everything open (the ?sandbox=full test mode). `ever`: categories already opened stay open,
// so pulling down homes never takes the farms away.
export function unlocked(s, ever = [], full = false) {
  return TIERS.filter((t) => full || ever.includes(t.id) || t.at(s)).map((t) => t.id);
}
export function newlyUnlocked(before, after) { return after.filter((id) => !before.includes(id)); }

// A lab is ready once its category is open. Class mode: only the first one not done yet.
export function labReady(id, open, done, classMode = false) {
  if (!open.includes(id)) return false;
  if (!classMode) return true;
  return LEVEL_ORDER.find((l) => !done[l]) === id;
}

// The town is complete when every petal reaches "enough", carbon is under its limit, every home is within
// the walking rule of a school, and the town has its own school.
export function townGoals(s, ctx) {
  return [
    { id: 'homes', ok: s.familiesSafe >= TARGETS.families },
    { id: 'food', ok: s.food >= s.foodNeed },
    { id: 'nature', ok: s.petals.nature >= 1 },
    { id: 'health', ok: s.petals.health >= 1 },
    { id: 'energy', ok: s.power.winterOK && s.homes.length > 0 },
    { id: 'community', ok: s.petals.community >= 1 },
    { id: 'carbon', ok: s.carbonOK },
    { id: 'walk', ok: ctx.hasSchool && s.homes.length > 0 && s.walkMax <= TARGETS.walkMinutes },
  ];
}
export const townComplete = (s, ctx) => townGoals(s, ctx).every((g) => g.ok);

// the next category still locked, with progress toward it: { id, have, need } (null when everything is open)
export function nextUnlock(s, open) { const t = TIERS.find((x) => !open.includes(x.id)); if (!t) return null; const [have, need] = t.progress(s); return { id: t.id, have: Math.min(have, need), need, tier: t }; }
