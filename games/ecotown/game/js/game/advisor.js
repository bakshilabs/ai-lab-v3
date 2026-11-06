// Florence's tips while the player builds. Short, rare, and only about something that really changed:
// a tip fires when its rule turns true, at most one every COOLDOWN ms, and a tip that was shown is not
// repeated until its problem has gone away and come back. Pure (tests/progress.test.mjs).
import { TARGETS } from '../world/catalog.js';

export const COOLDOWN = 25000;
const pl = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;

// In priority order. lab: the AI Lab mission that teaches this problem. lens: the check that shows it.
// ctx: { open: unlocked categories, hasSchool }
export const RULES = [
  { id: 'start', when: (s) => s.townTiles === 0, text: { j: 'Hi! Start by marking town land. Pick 🗺 Land, then tap tiles on dry ground.', s: 'Start with site selection: mark town land (🗺 Land), then connect it with paths.' } },
  { id: 'flood', lab: 'land', lens: 'flood', when: (s) => s.townFlooded >= 2, text: { j: (s) => `${pl(s.townFlooded, 'tile')} of your town land flood in winter. Homes there would get wet!`, s: (s) => `${pl(s.townFlooded, 'town tile')} on the winter floodplain.` } },
  { id: 'wood', lab: 'land', lens: 'nature', when: (s) => s.townOnWood >= 2, text: { j: 'Your town is cutting into the old wood. The deer live there.', s: (s) => `${pl(s.townOnWood, 'town tile')} clear ancient woodland.` } },
  { id: 'homesNext', when: (s, c) => c.open.includes('homes') && s.homes.length === 0, text: { j: 'Homes are unlocked! Families are waiting. Try 🏡 Homes on your town land.', s: 'Housing unlocked: 40 households need homes. Build on town land.' } },
  { id: 'crossing', lab: 'move', lens: 'street', when: (s) => s.homes.length > 0 && s.unsafeCrossings > 0, text: { j: 'Children walking to school have to cross a busy car road.', s: (s) => `${pl(s.unsafeCrossings, 'unsafe crossing')} on the school run at 8:45 am.` } },
  { id: 'cold', lab: 'homes', lens: 'inside', when: (s) => s.homes.length > 0 && s.avgTemp < 18, text: { j: 'Brrr! Some homes are cold inside in winter.', s: (s) => `Average indoor temperature ${s.avgTemp} °C with the heating off (target 18 °C).` } },
  { id: 'homesCarbon', lab: 'homes', lens: 'carbon', when: (s) => s.homesCarbon > TARGETS.homesCarbon, text: { j: 'Building these homes makes a lot of carbon. Some materials make much less.', s: (s) => `Homes' embodied carbon ${s.homesCarbon} t, over the ${TARGETS.homesCarbon} t limit.` } },
  { id: 'hungry', lab: 'food', when: (s, c) => c.open.includes('food') && s.families >= 12 && s.food < s.foodNeed, text: { j: (s) => `The families need more food: ${s.food} of ${s.foodNeed} baskets.`, s: (s) => `Food ${s.food} / ${s.foodNeed} units needed.` } },
  { id: 'wildlife', lab: 'food', lens: 'nature', when: (s, c) => c.open.includes('food') && (!s.species.bees || !s.species.deer), text: { j: (s) => `Oh no, the ${!s.species.bees ? 'bees' : 'deer'} have left the island. They need hedges and wild places.`, s: (s) => `${!s.species.bees ? 'Pollinators' : 'Deer'} lost: habitat below what they need.` } },
  { id: 'winter', lab: 'power', lens: 'winter', when: (s, c) => c.open.includes('power') && s.homes.length > 0 && !s.power.winterOK, text: { j: 'On a still winter night, the lights would go out.', s: (s) => `Still winter night: supply ${Math.round(s.power.winterSupply)} / demand ${Math.round(s.power.demand)}.` } },
  { id: 'rain', lab: 'power', when: (s, c) => c.open.includes('power') && s.families >= 24 && s.drains === 0, text: { j: 'When it rains hard, where will the water go? A rain garden or reed bed helps.', s: 'No rainwater drainage yet: add a rain garden or reed bed.' } },
  { id: 'school', lab: 'heart', when: (s, c) => c.open.includes('heart') && !c.hasSchool, text: { j: 'The town needs its own school. Try 🏫 Town heart.', s: 'Town heart unlocked: the town still needs its own school.' } },
  { id: 'walk', lab: 'heart', lens: 'walk', when: (s, c) => c.hasSchool && s.homes.length > 0 && s.walkMax > TARGETS.walkMinutes, text: { j: (s) => `The farthest home is a ${s.walkMax}-minute walk from school. That's too far!`, s: (s) => `Longest walk to school ${s.walkMax} min (rule: ≤ ${TARGETS.walkMinutes}).` } },
  { id: 'carbon', lens: 'carbon', when: (s) => !s.carbonOK, text: { j: (s) => `The whole town makes ${s.carbon} t of carbon. The limit is ${TARGETS.carbonCeiling} t.`, s: (s) => `Town carbon ${s.carbon} t, over the ${TARGETS.carbonCeiling} t ceiling.` } },
];

export const newAdvisor = () => ({ last: -Infinity, active: new Set(), pending: [], shown: new Set() });
export const tipText = (rule, s, j) => { const t = rule.text[j ? 'j' : 's']; return typeof t === 'function' ? t(s) : t; };

// Call after every change to the town (and from time to time). Returns a rule to show, or null.
export function nextTip(st, s, ctx, now, cooldown = COOLDOWN) {
  const truth = new Set(RULES.filter((r) => r.when(s, ctx)).map((r) => r.id));
  for (const id of truth) if (!st.active.has(id) && !st.shown.has(id) && !st.pending.includes(id)) st.pending.push(id);
  st.pending = st.pending.filter((id) => truth.has(id));
  for (const id of [...st.shown]) if (!truth.has(id)) st.shown.delete(id); // solved: it may come back later
  st.active = truth;
  if (!st.pending.length || now - st.last < cooldown) return null;
  const order = RULES.map((r) => r.id); st.pending.sort((a, b) => order.indexOf(a) - order.indexOf(b));
  const id = st.pending.shift(); st.shown.add(id); st.last = now;
  return RULES.find((r) => r.id === id);
}
