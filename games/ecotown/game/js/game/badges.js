// Badges: extra things to try once the town is growing, so there is a reason to keep playing and to rebuild.
// Each badge is one clear, checkable fact about the town (or about checking Florence), is earned once and gives ★1.
// Pure functions of the simulation and the save (tests/badges.test.mjs). Looks and stars only: no effect on the town.
// test(s, x): s = simulate(...) result; x = { hasSchool, catches, trusted, labs (missions done), threeStars, complete, score (town score) }
export const BADGES = [
  { id: 'firsthome', icon: '🏡', name: 'First family', j: 'Build your first home.', s: 'House the first household.', test: (s) => s.families > 0 },
  { id: 'dryfeet', icon: '🌊', name: 'Dry feet', j: '20 families, and nobody on the flood meadow.', s: '20 households, none on the floodplain.', test: (s) => s.families >= 20 && s.familiesSafe === s.families && s.townFlooded === 0 },
  { id: 'carfree', icon: '🚲', name: 'Car-free town', j: '24 families and not one car road or car park.', s: '24 households with no car roads or car parks.', test: (s) => s.families >= 24 && s.cars === 0 },
  { id: 'bees', icon: '🐝', name: 'Bee friend', j: 'Enough food for everyone, and the bees are still here.', s: 'Food supply meets need with pollinators intact.', test: (s) => s.families >= 12 && s.food >= s.foodNeed && !!s.species?.bees },
  { id: 'wild', icon: '🦌', name: 'Wild neighbours', j: '30 families, with the wood and the wetland untouched.', s: '30 households; woodland and wetland fully intact.', test: (s) => s.families >= 30 && s.woodIntact >= 6 && s.wetIntact >= 6 && !!s.species?.deer },
  { id: 'lowcarbon', icon: '☁', name: 'Light footprint', j: '40 families with carbon at 75 or less (the limit is 160).', s: '40 households at ≤ 75 t carbon (limit 160 t).', test: (s) => s.familiesSafe >= 40 && s.carbon <= 75 },
  { id: 'bigtown', icon: '🏘', name: 'Room for more', j: 'Homes for 52 families, all safe from floods, with enough food.', s: '52 households, none flooded, food supply ≥ need.', test: (s) => s.familiesSafe >= 52 && s.food >= s.foodNeed },
  { id: 'winter', icon: '🔋', name: 'Lights on all winter', j: '40 families, and power on a still winter night.', s: '40 households; winter-night supply covers demand.', test: (s) => s.familiesSafe >= 40 && !!s.power?.winterOK },
  { id: 'tenmin', icon: '🏫', name: '10-minute town', j: '40 families, all within a 10-minute walk of school.', s: '40 households, all ≤ 10 min from school.', test: (s, x) => x.hasSchool && s.familiesSafe >= 40 && s.walkMax <= 10 },
  { id: 'sharp', icon: '🔎', name: 'Sharp eyes', j: 'Catch three of Florence’s wrong ideas in your town.', s: 'Catch three flawed proposals in your town.', test: (s, x) => x.catches >= 3 },
  { id: 'checker', icon: '🧐', name: 'Check first', j: 'Catch five wrong ideas without ever using one unchecked.', s: 'Five catches and no proposal adopted unchecked.', test: (s, x) => x.catches >= 5 && !x.trusted },
  { id: 'labs', icon: '🧪', name: 'Lab expert', j: 'Finish all six AI Lab missions.', s: 'Complete all six AI Lab missions.', test: (s, x) => x.labs >= 6 },
  { id: 'threestar', icon: '🌟', name: 'Clear thinker', j: 'Get three stars in every mission.', s: 'Three stars in every mission.', test: (s, x) => x.threeStars >= 6 },
  { id: 'gold', icon: '🥇', name: 'Gold town', j: 'Reach a town score of 90 out of 100.', s: 'Town score of 90/100 or more.', test: (s, x) => (x.score || 0) >= 90 },
  { id: 'complete', icon: '🎉', name: 'Town complete', j: 'Meet all eight town goals.', s: 'Meet all eight town targets.', test: (s, x) => !!x.complete },
];
// ids newly earned now (not already in `have`)
export function newBadges(s, x, have = {}) { return BADGES.filter((b) => !have[b.id] && b.test(s, x)).map((b) => b.id); }
export const badgeCount = (have = {}) => BADGES.filter((b) => have[b.id]).length;
export const badge = (id) => BADGES.find((b) => b.id === id) || null;
