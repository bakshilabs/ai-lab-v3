// Residents' thought bubbles, chosen from what the simulation says is true. At most eight words each.
// Each bubble has a topic; bubbles about the current level's topic come first. The game pins each bubble to a
// real resident near the tile (never to an empty tile).
import { ITEMS, TARGETS } from '../world/catalog.js';
const TOPIC = { land: ['flood'], move: ['move'], homes: ['home'], food: ['food', 'nature'], power: ['power'], heart: ['school', 'centre'], final: [] };

export function bubblesFor(s, cells, terrain, junior, levelId) {
  const out = []; const homes = s.homes; const any = (id) => [...cells].find(([, c]) => c.item === id)?.[0];
  const h0 = homes[0]?.k, h1 = homes[1]?.k || h0, h2 = homes[2]?.k || h0;
  const town = [...cells].find(([, c]) => c.mark === 'town')?.[0];
  const at = h0 || town || terrain.school;
  const add = (k, text, bad, topic) => out.push({ k, text, bad, topic });
  for (const hm of homes) if (hm.flooded) { add(hm.k, 'Our kitchen flooded again!', true, 'flood'); break; }
  if (homes.some((x) => x.temp < 18)) add(homes.find((x) => x.temp < 18).k, 'Brrr, it’s freezing in here.', true, 'home');
  else if (homes.length) add(h1, 'Cosy and warm, heating off!', false, 'home');
  const route = any('path') || any('cycle');
  if (s.unsafeCrossings > 0) add(s.unsafeKeys[0] || h0, 'Too many cars to cross!', true, 'move');
  else if (route) add(route, 'I walked to school by myself!', false, 'move');
  if (any('cycle')) add(any('cycle'), 'Love the cycle lane!', false, 'move');
  if (!['land', 'move', 'homes'].includes(levelId)) { if (!s.species.bees) add(at, 'Where have all the bees gone?', true, 'nature'); else add(any('hives') || any('orchard') || at, 'Listen to the bees buzzing!', false, 'nature'); }
  if (s.species.deer && levelId !== 'land') add(h2, 'I saw deer by the old wood!', false, 'nature');
  if (s.food && s.food < s.foodNeed) add(at, 'Not enough food in the shop.', true, 'food');
  if (any('allot') || any('orchard')) add(any('allot') || any('orchard'), 'We grew our own carrots!', false, 'food');
  if (['power', 'heart', 'final'].includes(levelId) && homes.length && (levelId !== 'final' || s.power.winterOK || s.power.winterSupply > 0)) add(h0, s.power.winterOK ? 'Snowy night, and our lights stayed on!' : 'The lights went out again.', !s.power.winterOK, 'power');
  if (any('raingarden')) add(any('raingarden'), 'The rain garden soaked up the puddles!', false, 'power');
  if (any('market')) add(any('market'), 'Market day! Apples from our orchard.', false, 'centre');
  if (any('school') && s.walkMax > TARGETS.walkMinutes) add(any('school'), 'School is too far to walk.', true, 'school');
  if (any('school') && s.walkMax <= TARGETS.walkMinutes) add(any('school'), 'I can walk to the new school!', false, 'school');
  if (any('concrete')) add(any('concrete'), 'Our flat is nice, but so grey.', false, 'home');
  if (any('repair')) add(any('repair'), 'They fixed my bike for free!', false, 'power');
  if (any('festival')) add(any('festival'), 'Best festival ever!', false, 'centre');
  if (!out.length && at) add(at, junior ? 'I love living here!' : 'Settling in nicely.', false, 'home');
  // this level's topic first, then interleave good and bad so the mix is honest but not gloomy
  const topics = TOPIC[levelId] || []; const first = out.filter((b) => topics.includes(b.topic)), rest = out.filter((b) => !topics.includes(b.topic));
  const bad = rest.filter((b) => b.bad), good = rest.filter((b) => !b.bad), mix = [...first];
  while (bad.length || good.length) { if (good.length) mix.push(good.shift()); if (bad.length) mix.push(bad.shift()); }
  return mix.filter((b) => b.k && ITEMS);
}
