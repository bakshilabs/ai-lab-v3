// The Star shop: cosmetic rewards bought with ★ stars. Pure functions (unit-tested in tests/shop.test.mjs).
// Stars are earned and never taken away; buying a reward spends them from a wallet (earned − spent).
// A reward is bought once, then switched on or off. Rewards in the same group (Florence's hats) are worn one at a time.
// Nothing here touches the simulation or the sustainability score: the rewards are looks only.

// where: 'florence' (she wears it), 'town' (a voxel model by the AI Lab), 'sky' (at dusk)
export const SHOP = [
  { id: 'sunhat', icon: '👒', cost: 3, where: 'florence', group: 'hat' },
  { id: 'flag', icon: '🚩', cost: 4, where: 'town' },
  { id: 'fountain', icon: '⛲', cost: 6, where: 'town' },
  { id: 'crown', icon: '👑', cost: 6, where: 'florence', group: 'hat' },
  { id: 'statue', icon: '🐝', cost: 8, where: 'town' },
  { id: 'fireworks', icon: '🎆', cost: 10, where: 'sky', motion: true },
];
const BY_ID = new Map(SHOP.map((r) => [r.id, r]));
export const reward = (id) => BY_ID.get(id) || null;

// a clean shop state from whatever the save holds (unknown or duplicate ids dropped; "on" only for owned rewards)
export function shopState(raw) {
  const owned = [...new Set((raw?.owned || []).filter((id) => BY_ID.has(id)))];
  const on = [];
  for (const id of new Set(raw?.on || [])) { if (!owned.includes(id)) continue; const g = BY_ID.get(id).group; if (g && on.some((x) => BY_ID.get(x).group === g)) continue; on.push(id); }
  return { owned, on };
}
export const spent = (st) => shopState(st).owned.reduce((a, id) => a + BY_ID.get(id).cost, 0);
export const wallet = (stars, st) => Math.max(0, (stars || 0) - spent(st));
export const owns = (st, id) => !!st?.owned?.includes(id);
export const isOn = (st, id) => !!st?.on?.includes(id);
// stars still needed to buy a reward (0 = affordable now)
export const needs = (stars, st, id) => Math.max(0, (BY_ID.get(id)?.cost ?? Infinity) - wallet(stars, st));
// something new the player can afford (for the small "shop" mark on the stars chip)
export const canAffordNew = (stars, st) => SHOP.some((r) => !owns(st, r.id) && r.cost <= wallet(stars, st));

// buy: { ok, st, why } with why 'unknown' | 'owned' | 'stars'. A new reward is switched on straight away.
export function buy(st, id, stars) {
  const s = shopState(st); const r = BY_ID.get(id);
  if (!r) return { ok: false, st: s, why: 'unknown' };
  if (s.owned.includes(id)) return { ok: false, st: s, why: 'owned' };
  if (r.cost > wallet(stars, s)) return { ok: false, st: s, why: 'stars' };
  return { ok: true, st: setOn({ owned: [...s.owned, id], on: s.on }, id, true) };
}
// switch an owned reward on or off (on = undefined flips it). Switching a hat on takes the other hat off.
export function setOn(st, id, on) {
  const s = shopState(st); if (!s.owned.includes(id)) return s;
  const want = on === undefined ? !s.on.includes(id) : !!on; const g = BY_ID.get(id).group;
  let list = s.on.filter((x) => x !== id);
  if (want) { if (g) list = list.filter((x) => BY_ID.get(x).group !== g); list.push(id); }
  return { owned: s.owned, on: list };
}
