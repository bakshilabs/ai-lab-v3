// Free building: what one tap with `tool` does to a tile, letting the new thing replace what is there.
// Pure (no three.js) so it can be unit tested. Missions and "Use Florence's plan" keep the strict rules.
// Returns { why } when the tap can't work, { same: true } when the tile already has it, or
// { cell, removed, replaced } where `removed` lists the paid items taken away (refund them) and
// `replaced` is the label of what the tap swaps out (null when the tile was free).
import { ITEMS, placeReason } from '../world/catalog.js';

const clone = (c) => ({ ...c, mods: [...(c.mods || [])], locked: false });

export function planPlace(tool, t, c0) {
  const it = ITEMS[tool]; const c = clone(c0);
  if (!it) return { why: 'Unknown item' };
  if (t.fixed) return { why: placeReason(tool, t, c) };
  // already there: nothing to change
  if (it.kind === 'mark' && c.mark === tool) return { same: true };
  if (it.kind === 'build' && c.item === tool) return { same: true };
  if (it.kind === 'mod' && c.mods.includes(tool)) return { same: true };

  if (it.kind === 'mod') { const why = placeReason(tool, t, c); return why ? { why } : { cell: { ...c, mods: [...c.mods, tool] }, removed: [], replaced: null }; }

  if (it.kind === 'mark') {
    const why = placeReason(tool, t, c); if (why) return { why };
    const removed = [c.item, ...c.mods].filter(Boolean);
    const replaced = c.item ? ITEMS[c.item].label : c.mark ? ITEMS[c.mark].label : null;
    return { cell: { ...c, mark: tool, item: null, mods: [] }, removed, replaced };
  }

  // a building: as the tile is, or with its land mark (town land / keep wild) cleared
  const keepMods = (cell) => (it.home ? cell.mods : []);
  const direct = placeReason(tool, t, c);
  if (!direct) {
    const mods = keepMods(c); const dropped = c.mods.filter((m) => !mods.includes(m));
    return { cell: { ...c, item: tool, mods }, removed: [c.item, ...dropped].filter(Boolean), replaced: c.item ? ITEMS[c.item].label : null };
  }
  if (c.mark) {
    // clearing town land also clears a town-only building standing on it
    const bare = { ...c, mark: null, item: c.item && ITEMS[c.item].on.includes('town') ? null : c.item };
    if (!placeReason(tool, t, bare)) {
      return { cell: { ...bare, item: tool, mods: [] }, removed: [c.item, ...c.mods].filter(Boolean), replaced: c.item ? ITEMS[c.item].label : ITEMS[c.mark].label };
    }
  }
  // a home or town building on open, unmarked land: one tap marks the tile as town land and builds on it. (It used to
  // answer "Build this on town land", so the first thing most new players did with Homes was a dead tap, followed by
  // two trips to the Land tab.)
  if (!c.mark && !c.item && it.on.includes('town') && !placeReason('town', t, c)) {
    const town = { ...c, mark: 'town' };
    if (!placeReason(tool, t, town)) return { cell: { ...town, item: tool, mods: [] }, removed: [], replaced: null, marked: true };
  }
  return { why: direct };
}
