// What a build does for the town, as small chips the player can read at a glance ("+4 👪  +1 🦋  −2 ☁").
// Pure (no three.js), so it is unit tested (tests/delta.test.mjs).
//   itemChips(id): from the catalog numbers, for the item info panel (what this thing is good for)
//   simDelta(before, after): the real change between two simulation results, for the hover preview and the
//   floating numbers after a build (it includes knock-on effects such as floods or a field ploughing a meadow)
import { ITEMS } from '../world/catalog.js';

// same icons and colours as the town flower's petals, so the meaning carries across
export const CHIP = {
  homes: { icon: '👪', col: '#ff8a5c' }, food: { icon: '🍎', col: '#ffc83d' }, nature: { icon: '🦋', col: '#4caf50' },
  health: { icon: '❤', col: '#ff7eb6' }, energy: { icon: '⚡', col: '#2f9de0' }, community: { icon: '🤝', col: '#b28cff' },
  carbon: { icon: '☁', col: '#7a8a96' }, walk: { icon: '🚶', col: '#d9a441' }, credits: { icon: '💰', col: '#e0b400' },
};
const ORDER = ['homes', 'food', 'nature', 'health', 'energy', 'community', 'carbon'];
const round = (v) => Math.round(v * 10) / 10;
// a chip: { key, v, good } where good says if the change helps the town (less carbon is good)
const chip = (key, v) => ({ key, v: round(v), good: key === 'carbon' ? v < 0 : v > 0 });

export function itemChips(id) {
  const it = ITEMS[id]; if (!it) return [];
  const out = [];
  if (it.families) out.push(chip('homes', it.families));
  if (it.food) out.push(chip('food', it.food));
  if (it.nature) out.push(chip('nature', it.nature));
  if (it.health) out.push(chip('health', it.health));
  const power = (it.winter ?? 0) || it.avg || it.store || 0; if (power) out.push(chip('energy', power));
  if (it.demand) out.push(chip('energy', -it.demand));
  if (it.community) out.push(chip('community', it.community));
  const carbon = (it.carbon || 0) + (it.embodied || 0); if (carbon) out.push(chip('carbon', carbon));
  return out;
}

export function simDelta(a, b) {
  if (!a || !b) return [];
  const d = {
    homes: b.familiesSafe - a.familiesSafe, food: b.food - a.food, nature: b.nature - a.nature, health: b.health - a.health,
    energy: (b.power?.winterSupply ?? 0) - (b.power?.demand ?? 0) - ((a.power?.winterSupply ?? 0) - (a.power?.demand ?? 0)),
    community: b.community - a.community, carbon: b.carbon - a.carbon,
  };
  return ORDER.filter((k) => Math.abs(d[k]) >= 0.05).map((k) => chip(k, d[k]));
}

// "+4 👪  −2 ☁": plain text for labels, captions and screen readers
export function chipsText(chips) { return chips.map((c) => `${c.v > 0 ? '+' : '−'}${Math.abs(c.v)} ${CHIP[c.key].icon}`).join('  '); }
