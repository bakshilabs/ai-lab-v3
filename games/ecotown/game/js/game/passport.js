// The club passport: everything a player has done on this device, added up into points and a planner rank, so a
// whole club day has one goal. Pure (tests/passport.test.mjs). It reads the device record (localStorage
// 'ecotown.best.v1'): dev[band] = best town { score, medal }, dev.me[band] = { stars, complete, catches },
// dev.ch[band][id] = { medal, score }.
import { CHALLENGES } from './challenges.js';

export const RANKS = [
  { at: 0, name: 'Helper', icon: '🌱' }, { at: 8, name: 'Builder', icon: '🧱' }, { at: 20, name: 'Planner', icon: '📐' },
  { at: 35, name: 'Town Planner', icon: '🏘' }, { at: 65, name: 'Master Planner', icon: '🏅' }, { at: 100, name: 'Chief Planner', icon: '👑' }, // out of 139 with 13 challenges (were 50 and 70 out of 91 with 7)
];
export const MISSION_STARS = 19; // six missions × three stars, and the bias check's bonus star
const TOWN_MEDAL = { bronze: 2, silver: 4, gold: 6 }; const CH_MEDAL = { bronze: 3, silver: 5, gold: 8 };
const clamp = (v, hi) => Math.max(0, Math.min(hi, Number(v) || 0));

export function passport(dev = {}, band = 'junior') {
  const me = dev.me?.[band] || {}; const town = dev[band] || {}; const ch = dev.ch?.[band] || {};
  const won = CHALLENGES.filter((c) => ch[c.id]);
  const parts = [
    { id: 'stars', got: clamp(me.stars, MISSION_STARS), max: MISSION_STARS },
    { id: 'complete', got: me.complete ? 5 : 0, max: 5 },
    { id: 'town', got: TOWN_MEDAL[town.medal] || 0, max: 6 },
    { id: 'challenges', got: won.reduce((a, c) => a + (CH_MEDAL[ch[c.id].medal] || 0), 0), max: CHALLENGES.length * 8 },
    { id: 'catches', got: clamp(me.catches, 5), max: 5 },
  ];
  const points = parts.reduce((a, p) => a + p.got, 0); const max = parts.reduce((a, p) => a + p.max, 0);
  const ri = RANKS.reduce((a, r, i) => (points >= r.at ? i : a), 0); const rank = RANKS[ri]; const nextRank = RANKS[ri + 1] || null;
  return { points, max, parts, rank, rankIndex: ri, next: nextRank ? { ...nextRank, need: nextRank.at - points } : null,
    medals: { gold: won.filter((c) => ch[c.id].medal === 'gold').length, silver: won.filter((c) => ch[c.id].medal === 'silver').length, bronze: won.filter((c) => ch[c.id].medal === 'bronze').length },
    challenges: CHALLENGES.map((c) => ({ id: c.id, name: c.name, icon: c.icon, medal: ch[c.id]?.medal || null, score: ch[c.id]?.score || 0 })),
    town: { medal: town.medal || null, score: town.score || 0, name: town.town || '' }, stars: clamp(me.stars, MISSION_STARS), complete: !!me.complete, catches: clamp(me.catches, 999),
    tip: tip({ me, town, ch, won }) };
}
// what would earn points soonest: the missions first (they open the challenges), then the town, then challenges
function tip({ me, town, ch, won }) {
  if ((me.stars || 0) < 6) return { id: 'missions', text: 'Do the AI Lab missions: each one gives up to 3 stars.' };
  if (!me.complete) return { id: 'complete', text: 'Finish your town: all eight goals and all six missions give 5 points.' };
  const fresh = CHALLENGES.find((c) => !ch[c.id]); if (fresh) return { id: 'challenge', text: `Try a challenge town you have not passed yet, such as ${fresh.name}: a medal is worth 3 to 8 points.` };
  const low = won.find((c) => ch[c.id].medal !== 'gold'); if (low) return { id: 'higher', text: `Go for a higher medal in ${low.name}.` };
  if (town.medal !== 'gold') return { id: 'town', text: 'Raise your own town’s score to gold (90 out of 100).' };
  if ((me.catches || 0) < 5) return { id: 'catches', text: 'Catch Florence’s wrong ideas with a lens: each catch is a point, up to 5.' };
  return { id: 'done', text: 'Everything is done. You are a Chief Planner!' };
}
