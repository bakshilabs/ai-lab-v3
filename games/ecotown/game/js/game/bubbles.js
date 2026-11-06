// Residents' thought bubbles, chosen from what the simulation says is true. At most eight words each.
import { ITEMS } from '../world/catalog.js';

export function bubblesFor(s, cells, terrain, junior, levelId) {
  const out = []; const homes = s.homes; const any = (id) => [...cells].find(([, c]) => c.item === id)?.[0];
  const h0 = homes[0]?.k, h1 = homes[1]?.k || h0, h2 = homes[2]?.k || h0;
  const town = [...cells].find(([, c]) => c.mark === 'town')?.[0];
  const at = h0 || town || terrain.school;
  for (const hm of homes) if (hm.flooded) { out.push({ k: hm.k, text: 'Our kitchen flooded again!', bad: true }); break; }
  if (homes.some((x) => x.temp < 18)) out.push({ k: homes.find((x) => x.temp < 18).k, text: 'Brrr, it’s freezing in here.', bad: true });
  else if (homes.length) out.push({ k: h1, text: 'Cosy and warm, heating off!', bad: false });
  if (s.unsafeCrossings > 0) out.push({ k: terrain.school, text: 'Too many cars to cross!', bad: true });
  else if (any('path') || any('cycle')) out.push({ k: any('cycle') || any('path'), text: 'I walked to school by myself!', bad: false });
  if (any('cycle')) out.push({ k: any('cycle'), text: 'Love the new cycle lane!', bad: false });
  if (levelId !== 'land' && levelId !== 'move' && levelId !== 'homes') { if (!s.species.bees) out.push({ k: at, text: 'Where have all the bees gone?', bad: true }); else out.push({ k: any('hives') || any('orchard') || at, text: 'Listen to the bees buzzing!', bad: false }); }
  if (s.species.deer && levelId !== 'land') out.push({ k: h2, text: 'I saw deer by the old wood!', bad: false });
  if (s.food && s.food < s.foodNeed) out.push({ k: at, text: 'Not enough food in the shop.', bad: true });
  if (['power', 'heart'].includes(levelId) && homes.length && !s.power.winterOK) out.push({ k: h0, text: 'The lights went out again.', bad: true });
  if (any('market')) out.push({ k: any('market'), text: 'Market day! Apples from our orchard.', bad: false });
  if (any('school') && s.walkMax > 15) out.push({ k: any('school'), text: 'School is too far to walk.', bad: true });
  if (any('school') && s.walkMax <= 10) out.push({ k: any('school'), text: 'School is just round the corner!', bad: false });
  if (any('concrete')) out.push({ k: any('concrete'), text: 'Our flat is nice, but so grey.', bad: false });
  if (any('repair')) out.push({ k: any('repair'), text: 'They fixed my bike for free!', bad: false });
  if (any('festival')) out.push({ k: any('festival'), text: 'Best festival ever!', bad: false });
  if (!out.length && at) out.push({ k: at, text: junior ? 'I can’t wait to live here!' : 'When can we move in?', bad: false });
  // interleave good and bad so the mix is honest but not gloomy
  const bad = out.filter((b) => b.bad), good = out.filter((b) => !b.bad), mix = [];
  while (bad.length || good.length) { if (good.length) mix.push(good.shift()); if (bad.length) mix.push(bad.shift()); }
  return mix.filter((b) => b.k && ITEMS);
}
