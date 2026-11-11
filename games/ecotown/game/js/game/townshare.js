// Showing a town to other people: what a town code is made from, what a visiting device works out from it, and the
// club wall's list. Pure (tests/townshare.test.mjs): the terrain and the storage are passed in.
// Safeguarding rules kept here: a code holds the town and nothing about the player; a typed town name never
// travels (only a start-screen idea does); the wall is a list of codes kept on one device and nowhere else.
import { simulate, natureBaseline } from '../sim/sim.js';
import { townScore } from './score.js';
import { townGoals } from './progress.js';
import { encodeTown, decodeTown, SHARE_NAMES, LAYOUTS } from './towncode.js';

export const WALL_KEY = 'ecotown.wall.v1'; export const WALL_MAX = 60;
export const PART_WORD = { homes: 'Homes', food: 'Food', nature: 'Nature', health: 'Health', energy: 'Winter power', community: 'Places to meet', carbon: 'Low carbon', walk: 'Walk to school', catches: 'Catching Florence' };
export const MEDAL_WORD = { gold: 'Gold', silver: 'Silver', bronze: 'Bronze' };

// which island a terrain is (0 = the first one). Other layouts say so with terrain.layout (their ?island= name).
export function layoutOf(terrain) { const i = LAYOUTS.indexOf(terrain?.layout || 'classic'); return i < 0 ? 0 : i; }
export const layoutName = (n) => LAYOUTS[n] || null;

// only what can really stand on this island is shown: a code is checked, but it is still something a person typed
export function sanitize(terrain, cells) {
  const out = new Map();
  for (const [k, c] of cells) { const t = terrain.tiles.get(k); if (!t || t.fixed) continue; out.set(k, { mark: c.mark || null, item: c.item || null, mods: [...(c.mods || [])], locked: false }); }
  return out;
}
const extraOpts = (terrain, extra = {}) => ({ natureStart: natureBaseline(terrain), addFamilies: extra.families || 0, addCarbon: extra.carbon || 0, addWinter: extra.winter || 0, addHealth: extra.health || 0, addCommunity: extra.community || 0, addNature: extra.nature || 0 });

// everything a card, the wall or visit mode shows about a town, worked out again on THIS device by the honest
// simulation (the score inside the code is only used when the town was built on an island this device does not have)
export function summarize(terrain, town) {
  const sameIsland = (town.layout || 0) === layoutOf(terrain);
  const cells = sanitize(terrain, town.cells); const s = simulate(terrain, cells, extraOpts(terrain, town.extra));
  const x = { hasSchool: [...cells.values()].some((c) => c.item === 'school'), catches: town.catches || 0 };
  const r = townScore(s, x);
  const total = sameIsland ? r.total : town.score ?? r.total;
  const medal = total >= 90 ? 'gold' : total >= 75 ? 'silver' : total >= 60 ? 'bronze' : null;
  // strongest and weakest parts of the score, as a share of each part's points (catching Florence is about the
  // player, not the town, so it is left out of the comparison)
  const parts = r.parts.filter((p) => p.id !== 'catches').map((p, i) => ({ ...p, share: p.got / p.max, i }));
  const strong = [...parts].sort((a, b) => b.share - a.share || a.i - b.i).slice(0, 2).filter((p) => p.got > 0);
  const weak = [...parts].sort((a, b) => a.share - b.share || a.i - b.i)[0];
  return { cells, sim: s, score: r, total, medal, sameIsland, title: s.title, name: town.name || null, heading: town.name || s.title,
    goals: townGoals(s, x), hasSchool: x.hasSchool, strong, weak: weak && weak.share < 1 ? weak : null, families: s.familiesSafe, builds: [...cells.values()].filter((c) => c.item).length };
}

// the code for a town being played: { cells, band, catches, extra, townName }
export function shareCode(terrain, { cells, band, catches = 0, extra = {}, townName = '' }) {
  const layout = layoutOf(terrain); const clean = sanitize(terrain, cells);
  const town = { cells: clean, band, layout, catches: Math.min(5, catches || 0), extra, name: SHARE_NAMES.includes(townName) ? townName : null };
  town.score = summarize(terrain, town).score.total;
  return encodeTown(town);
}

// ---- the club wall: a list of codes on the leader's device. storage = localStorage (or anything with get/setItem)
export function wallLoad(storage) {
  try { const a = JSON.parse(storage.getItem(WALL_KEY) || '[]'); return Array.isArray(a) ? a.filter((c) => typeof c === 'string' && decodeTown(c).ok).slice(0, WALL_MAX) : []; } catch { return []; }
}
export function wallSave(storage, list) { try { storage.setItem(WALL_KEY, JSON.stringify(list.slice(0, WALL_MAX))); return true; } catch { return false; } }
// add a code: { ok, list, why } with why = a decode reason, 'twice' or 'full'
export function wallAdd(list, text) {
  const d = decodeTown(text); if (!d.ok) return { ok: false, list, why: d.why };
  if (list.includes(d.code)) return { ok: false, list, why: 'twice' };
  if (list.length >= WALL_MAX) return { ok: false, list, why: 'full' };
  return { ok: true, list: [...list, d.code], code: d.code };
}
export const wallRemove = (list, code) => list.filter((c) => c !== code);

// three questions for the end-of-day talk, made from the towns on the wall (tone: LAB-GUIDE section 9B)
export function wallPrompts(sums) {
  const n = sums.length;
  if (n < 2) return ['Add two or more towns, then compare them: what did each planner choose to protect?', 'Which lens would you run first on a town you have never seen? Why that one?', 'Florence was sure about her ideas. What did you check before you believed her?'];
  const count = (f) => { const m = {}; for (const s of sums) { const id = f(s); if (id) m[id] = (m[id] || 0) + 1; } return Object.entries(m).sort((a, b) => b[1] - a[1])[0]; };
  const weak = count((s) => s.weak?.id); const strong = count((s) => s.strong[0]?.id);
  const hi = [...sums].sort((a, b) => b.total - a.total)[0];
  return [
    weak ? `${weak[1]} of our ${n} towns are weakest at “${PART_WORD[weak[0]].toLowerCase()}”. Why is that the hard one? Which lens shows it?` : 'Which part of a town was hardest to get right? Which lens showed it?',
    strong ? `Many towns are strong at “${PART_WORD[strong[0]].toLowerCase()}”. Find two towns that got there in different ways. What did each give up for it?` : 'Find two towns that reached the same goal in different ways. What did each give up for it?',
    `Visit “${hi.heading}” (${hi.total} out of 100) and one other town. Run the same lens on both. What would you ask their planners before you copied them, and what would you ask Florence?`,
  ];
}
