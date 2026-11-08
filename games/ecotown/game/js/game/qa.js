// Florence's answers in the AI Lab classroom. A fixed, kid-safe set (nothing is generated or sent anywhere):
// the player's question is matched by keywords to a topic, or to a build by its name, and each answer can
// come with a build video for the big screen. Pure, so it is unit tested (tests/qa.test.mjs).
import { ITEMS } from '../world/catalog.js';

// topics: keys (words that point to it), a: { j, s } answers, video: a build video id to show
export const TOPICS = [
  { id: 'mistakes', keys: ['mistake', 'wrong', 'trust', 'why do you', 'confident', 'sure', 'lie', 'error'], a: {
    j: 'I learn from patterns, not from looking at the real island. So I can sound very sure and still be wrong! That’s why you check my plans with a lens before you build.',
    s: 'I predict from patterns in what I was told, not from checking the world. Confidence is not evidence: a plan can be 92% “sure” and still miss something. Always test it.' } },
  { id: 'check', keys: ['check', 'test', 'lens', 'lenses', 'catch', 'how do i know'], a: {
    j: 'Pick a lens: it shows what my plan would really do, like flooding or carbon. If the lens shows a problem, I made a mistake, and you caught it!',
    s: 'Run a lens or a view on my plan before adopting it. Each one tests a different thing: flood, access, carbon, nature, winter power, walking time.' } },
  { id: 'instructions', keys: ['instruction', 'tell you', 'say', 'words', 'prompt', 'clear', 'better'], a: {
    j: 'Tell me exactly what matters. “Best land” could mean flat, dry or sunny. Say “dry land that never floods”, and I’ll know what you mean.',
    s: 'Vague words like “best” or “big” leave me guessing. Name the constraint you care about and any numbers: “dry land, out of the floodplain, 18 tiles”.' } },
  { id: 'flood', keys: ['flood', 'river', 'water', 'rain', 'meadow', 'safe to build', 'where should', 'where can', 'dry'], video: 'raingarden', a: {
    j: 'The meadow by the river floods every winter. Build your town up on the dry slope, and add rain gardens so rainwater soaks away.',
    s: 'The river meadow is floodplain: homes there flood in winter. Build on higher ground and add drainage like rain gardens or reed beds.' } },
  { id: 'carbon', keys: ['carbon', 'co2', 'pollution', 'climate', 'emission'], video: 'timber', a: {
    j: 'Carbon comes from making things like concrete, and from cars. Timber and straw homes make much less. Keep the whole town under 160 tonnes.',
    s: 'Two big sources here: embodied carbon in materials (concrete is high, timber and straw low) and car use. Keep the town under 160 t.' } },
  { id: 'energy', keys: ['power', 'energy', 'electric', 'lights', 'winter', 'night', 'battery', 'wind', 'solar'], video: 'wind', a: {
    j: 'On a still winter night, solar panels make nothing! Wind turbines and batteries keep the lights on when it’s dark and cold.',
    s: 'Plan for the worst case: a still winter night. Solar gives nothing then; wind plus battery storage covers demand.' } },
  { id: 'food', keys: ['food', 'farm', 'hungry', 'eat', 'grow', 'crops'], video: 'mixed', a: {
    j: 'Every three families need one basket of food. Mixed farms and orchards grow food and still leave room for wildlife.',
    s: 'One food unit feeds three households. Mixed farms, orchards and allotments raise supply without destroying habitat.' } },
  { id: 'bees', keys: ['bee', 'bees', 'pollinat', 'flowers', 'insect'], video: 'hives', a: {
    j: 'Bees carry pollen from flower to flower, so orchards and allotments grow more food. Beehives and hedges help them.',
    s: 'Pollinators boost orchard and allotment yields. Hives, hedges and meadow keep them on the island.' } },
  { id: 'nature', keys: ['nature', 'wildlife', 'animal', 'deer', 'otter', 'wild', 'tree', 'forest', 'wood'], video: 'hedge', a: {
    j: 'Animals need wild places to live. Keep the old wood and the wetland wild, and plant hedges so they can move around.',
    s: 'Protect the ancient wood and wetland, and connect habitats with hedges and a green bridge.' } },
  { id: 'walk', keys: ['walk', 'school', 'minutes', 'far', 'distance', 'travel', 'cycle', 'bike', 'car', 'road'], video: 'path', a: {
    j: 'Every home should be a 15-minute walk from school. Paths and cycle lanes are safer and healthier than busy car roads.',
    s: 'The rule: every home within 15 minutes’ walk of school. Active travel routes beat car roads on health, safety and carbon.' } },
  { id: 'homes', keys: ['home', 'house', 'families', 'family', 'live'], video: 'straw', a: {
    j: '40 families are coming! Build homes on town land. Straw-bale and timber homes stay warm and make little carbon.',
    s: 'Forty households need housing on town land. Compare families per tile, embodied carbon and winter temperature.' } },
  { id: 'community', keys: ['community', 'meet', 'friends', 'market', 'hall', 'fun', 'play', 'park'], video: 'market', a: {
    j: 'People need places to meet: a market, a hall, allotments and a park. Happy neighbours make a happy town!',
    s: 'Shared spaces raise community: market square, hall, allotments, parks and festivals.' } },
  { id: 'ai', keys: ['what are you', 'who are you', 'robot', 'ai', 'computer', 'think'], a: {
    j: 'I’m Florence, an AI planning helper. I read your instructions and make a plan, very fast. But I don’t see the island like you do, so you’re the checker!',
    s: 'I’m an AI planner: I turn your instruction into a plan by matching patterns. I don’t observe the world, so human checking is part of the job.' } },
];
const FALLBACK = {
  j: 'Hmm, I don’t know that one yet! Try asking me about flooding, carbon, winter power, food, bees, or any build, like “What does a heat pump do?”',
  s: 'I don’t have an answer for that. Ask about flooding, carbon, power, food, nature, walking to school, or any build by name.',
};
export const SUGGEST = {
  j: ['Why do you make mistakes?', 'How do I check your plan?', 'What does a heat pump do?', 'How do I stop flooding?', 'How do I keep the lights on in winter?', 'Why do bees matter?'],
  s: ['Why can a confident plan be wrong?', 'How should I test your plan?', 'What does a battery store do?', 'Where is it safe to build?', 'How do I cut the town’s carbon?', 'How do I write a clearer instruction?'],
};

const norm = (t) => ` ${String(t || '').toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ')} `;
// a build named in the question ("what does a heat pump do?"): the longest matching name wins
function itemIn(q) {
  let best = null, len = 0;
  for (const [id, it] of Object.entries(ITEMS)) {
    for (const name of [it.label, id]) { const n = norm(name).trim(); const short = n.split(' ').filter((w) => w.length > 3); const hit = q.includes(` ${n} `) || (short.length && short.every((w) => q.includes(w))); if (hit && n.length > len) { best = id; len = n.length; } }
  }
  return best;
}

// answer(question, junior) -> { text, video, topic } (video: a build id, or null)
export function answer(question, junior = true) {
  const q = norm(question); const band = junior ? 'j' : 's';
  const id = itemIn(q);
  const topic = TOPICS.map((t) => ({ t, n: t.keys.filter((k) => q.includes(k.length <= 3 ? ` ${k} ` : k)).length })).filter((x) => x.n).sort((a, b) => b.n - a.n)[0]?.t;
  // a build by name, unless the question is clearly about a topic (e.g. "why do wind turbines matter in winter")
  if (id && (!topic || /what|does|do |is |are |tell|explain/.test(q))) { const it = ITEMS[id]; return { text: `${it.label}: ${it.desc?.[band] || ''}`, video: id, topic: 'item' }; }
  if (topic) return { text: topic.a[band], video: topic.video || null, topic: topic.id };
  return { text: FALLBACK[band], video: null, topic: null };
}
