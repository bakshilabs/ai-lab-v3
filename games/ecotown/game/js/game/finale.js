// The "town complete" finale: what the player built, Florence's mistakes they caught, their stars and the
// habits they learned. Pure (unit-tested in tests/shop.test.mjs); the card itself is drawn by js/ui/rewards.js.
import { ITEMS } from '../world/catalog.js';
import { LEVELS, LEVEL_ORDER } from './levels.js';

// the build groups shown on the finale card, in this order (the same categories as the build bar)
export const FINALE_GROUPS = ['homes', 'food', 'power', 'heart', 'move'];

// G: the game state (cells, mistakes, catches, labs); s: the simulation; stars: the earned total
export function townSummary(G, s, stars = 0) {
  const groups = Object.fromEntries(FINALE_GROUPS.map((g) => [g, 0])); let builds = 0;
  for (const [, c] of G.cells || []) {
    for (const id of [c?.item, ...(c?.mods || [])]) {
      const it = id && ITEMS[id]; if (!it || it.kind === 'mark') continue;
      builds++; if (it.level in groups) groups[it.level]++;
    }
  }
  // mistakes caught: one per mission where Florence's plan was flawed (replays don't count twice), plus the
  // flawed ideas the player caught in town with a lens
  const missionMistakes = new Set((G.mistakes || []).map((m) => m.level + (m.bias ? ':bias' : ''))).size;
  const catches = G.catches || 0;
  // habits learned: the ones met in missions, else each finished mission's usual habit
  const habits = [];
  for (const m of G.mistakes || []) if (m.habit && !habits.includes(m.habit)) habits.push(m.habit);
  for (const id of LEVEL_ORDER) { const h = LEVELS[id]?.habit; if (G.labs?.[id] && h && !habits.includes(h)) habits.push(h); }
  return {
    builds, groups, families: s?.familiesSafe ?? s?.families ?? 0, title: s?.title || '',
    caught: missionMistakes + catches, missionMistakes, catches, stars,
    missions: LEVEL_ORDER.filter((id) => G.labs?.[id]).length, habits,
  };
}
