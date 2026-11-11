// Challenge towns: a new town with one special rule, for players who have finished the six AI Lab missions.
// Each has its own saved town and its own medal, so a club day has more than one town to build.
// Pure (tests/challenges.test.mjs). A challenge is passed when the eight town goals and its own goals are met;
// the medal is the town score's medal at that moment (at least bronze).
//   cap: town land allowed (default: the usual 30)   ban: builds that are not offered
//   goals(s): extra goals, [{ id, ok, have, need }]   start: 'florence' = Florence has already built a town, badly
export const CHALLENGES = [
  { id: 'fix', icon: '🛠', name: 'Florence’s Town', start: 'florence',
    rule: { j: 'Florence built this town by herself, and she was very sure about it. Find her mistakes with the lenses and put them right.', s: 'Florence planned this town unsupervised. Audit it with the lenses and fix what she got wrong.' },
    goals: () => [] },
  { id: 'tiny', icon: '🏝', name: 'Tiny Town', cap: 8,
    rule: { j: 'Only 8 tiles of town land. Every tile has to work hard.', s: 'Town land is capped at 8 tiles: density without the carbon.' },
    goals: () => [] },
  { id: 'light', icon: '🍃', name: 'Light Footprint',
    rule: { j: 'A whole town that makes 60 tonnes of carbon or less.', s: 'Whole-town carbon of 60 t or less (the usual ceiling is 160 t).' },
    goals: (s) => [{ id: 'c-carbon', ok: s.homes.length > 0 && s.carbon <= 60, have: s.carbon, need: 60, low: true }] },
  { id: 'still', icon: '🌙', name: 'The Still Island', ban: ['wind'],
    rule: { j: 'The wind never blows here, so there are no wind turbines. Keep the lights on through a winter night another way.', s: 'No wind resource: cover a still winter night without turbines.' },
    goals: () => [] },
  { id: 'wild', icon: '🦦', name: 'Wild Island',
    rule: { j: 'Build a whole town and leave the island wilder than you found it. Keep all five animals: deer, bees, otters, birds and frogs.', s: 'Complete the town with all five indicator species and a habitat score 30 % above the untouched island’s.' },
    goals: (s) => { const n = s.homes.length ? ['deer', 'bees', 'otters', 'birds', 'frogs'].filter((a) => s.species?.[a]).length : 0; const need = Math.round(1.3 * s.natureStart);
      return [{ id: 'c-species', ok: n === 5, have: n, need: 5 }, { id: 'c-nature', ok: s.homes.length > 0 && s.nature >= need, have: Math.round(s.nature), need }]; } },
  { id: 'big', icon: '🏘', name: 'Room for Everyone',
    rule: { j: 'Sixty families want to live here, not forty. Find safe, warm homes for all of them.', s: 'House 60 households (not 40) inside the usual land cap and carbon ceiling.' },
    goals: (s) => [{ id: 'c-families', ok: s.familiesSafe >= 60, have: s.familiesSafe, need: 60 }] },
  { id: 'near', icon: '🚶', name: 'Eight-Minute Town',
    rule: { j: 'Every home within an 8-minute walk of school, and of a market, hall or allotment.', s: 'Every home within 8 minutes’ walk of the school and of daily needs (market, hall or allotments).' },
    goals: (s, x = {}) => [{ id: 'c-walk', ok: !!x.hasSchool && s.homes.length > 0 && s.walkMax <= 8, have: s.homes.length ? s.walkMax : 99, need: 8, low: true }, { id: 'c-needs', ok: s.homes.length > 0 && s.needsMax <= 8, have: s.homes.length ? Math.round(s.needsMax) : 99, need: 8, low: true }] },
];
export const challenge = (id) => CHALLENGES.find((c) => c.id === id) || null;
export const GOAL_TEXT = {
  'c-carbon': (g) => [`Carbon at 60 t or less (now ${g.have} t)`, 'Swap high-carbon builds for low-carbon ones; repair cafés and compost hubs take carbon away.'],
  'c-species': (g) => [`All five animals live here (${g.have} of 5)`, 'Leave the wood, the meadow and the wetland alone, and keep the hedges.'],
  'c-nature': (g) => [`Nature score of ${g.need} or more (now ${g.have}; the empty island had ${Math.round(g.need / 1.3)})`, 'Keep land wild, plant hedges and orchards, add green roofs.'],
  'c-families': (g) => [`Safe homes for 60 families (${g.have} so far)`, 'Homes that hold more families use less land. Watch the carbon.'],
  'c-walk': (g) => [`Every home within 8 minutes of school (longest: ${g.have >= 99 ? '—' : g.have})`, 'Put the school in the middle and add footpaths.'],
  'c-needs': (g) => [`Every home within 8 minutes of a market, hall or allotment (longest: ${g.have >= 99 ? '—' : g.have})`, 'Spread markets, halls and allotments among the homes.'],
};

// passed: the usual town goals (an array of { ok }) and the challenge's own goals are all met
export function challengeState(ch, s, x, townGoals) {
  const extra = ch.goals(s, x); const passed = s.homes.length > 0 && townGoals.every((g) => g.ok) && extra.every((g) => g.ok);
  return { extra, passed };
}
const RANK = { bronze: 1, silver: 2, gold: 3 };
// the medal a passed challenge earns: the score's medal, and never less than bronze
export const challengeMedal = (score) => score.medal || 'bronze';
// keep the better of two results { medal, score }
export function better(a, b) { if (!a) return b; if (!b) return a; return (RANK[b.medal] || 0) > (RANK[a.medal] || 0) || ((RANK[b.medal] || 0) === (RANK[a.medal] || 0) && b.score > a.score) ? b : a; }

// Florence's own town (the 'fix' challenge): confidently wrong in every way a mission teaches. Homes on the flood
// meadow, concrete flats, car roads, one huge ploughed field, solar roofs for winter and a school far from the homes.
// tiles: [{ k, gx, gz, zone, fixed }]. Returns Map k -> cell.
export function florenceTown(tiles) {
  const cells = new Map(); const free = (t) => !t.fixed && !cells.has(t.k);
  const xy = (t) => [t.gx, t.gz]; const d = (a, b) => Math.hypot(a.gx - b.gx, a.gz - b.gz);
  const meadow = tiles.filter((t) => t.zone === 'meadow' && !t.fixed);
  const dry = tiles.filter((t) => ['slope', 'field'].includes(t.zone) && !t.fixed);
  if (!meadow.length || !dry.length) return cells;
  const mid = { gx: meadow.reduce((a, t) => a + t.gx, 0) / meadow.length, gz: meadow.reduce((a, t) => a + t.gz, 0) / meadow.length };
  const set = (t, mark, item, mods = []) => cells.set(t.k, { mark, item, mods, locked: false });
  // six blocks of concrete flats on the flood meadow, with solar roofs "for winter"
  [...meadow].sort((a, b) => d(a, mid) - d(b, mid)).slice(0, 6).forEach((t, i) => set(t, 'town', 'concrete', i < 4 ? ['solar'] : []));
  // dry ground nearest the meadow: two more blocks, a car road and a car park
  const near = [...dry].sort((a, b) => d(a, mid) - d(b, mid)).filter(free);
  near.slice(0, 2).forEach((t) => set(t, 'town', 'concrete'));
  near.slice(2, 5).forEach((t) => set(t, 'town', 'road'));
  near.slice(5, 6).forEach((t) => set(t, 'town', 'carpark'));
  // big ploughed fields over the hedged fields, and the school as far from the homes as it can be
  const fields = tiles.filter((t) => t.zone === 'field' && free(t)).sort((a, b) => (b.hedge ? 1 : 0) - (a.hedge ? 1 : 0) || d(a, mid) - d(b, mid));
  fields.slice(0, 3).forEach((t) => set(t, null, 'bigfield'));
  const far = tiles.filter((t) => ['field', 'slope'].includes(t.zone) && free(t)).sort((a, b) => d(b, mid) - d(a, mid))[0];
  if (far) set(far, null, 'school');
  void xy; return cells;
}
