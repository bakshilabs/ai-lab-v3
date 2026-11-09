// Florence's answers in the AI Lab classroom. A fixed, kid-safe set (nothing is generated or sent anywhere):
// the player's question is matched by keywords to a topic, or to a build by its name, and each answer can
// come with a build video for the big screen. Pure, so it is unit tested (tests/qa.test.mjs).
import { ITEMS } from '../world/catalog.js';

// topics: keys (words that point to it), a: { j, s } answers, video: a build video id to show
export const TOPICS = [
  // other kinds of power (a tester asked about nuclear and got a tip about vague words, from "clear" inside "nuclear")
  { id: 'otherpower', keys: ['nuclear', 'gas', 'coal', 'oil', 'fossil', 'petrol', 'diesel', 'hydro', 'dam'], a: {
    j: 'Nuclear power makes very little carbon while it runs, but a power station is huge, slow and costly to build: far too big for our little island. Gas, coal and oil make lots of carbon. Here we use wind, sun and batteries.',
    s: 'Nuclear is low-carbon in operation, but it’s large, slow and capital-heavy, so it doesn’t fit an island of 40 households. Gas, coal and oil are high-carbon. This island’s options are wind, solar and storage, tested on a still winter night.' } },
  // school work: a polite no (a tester's "can you do my homework" got the answer about homes, from "home" in "homework")
  { id: 'homework', keys: ['homework', 'essay', 'maths', 'math', 'exam', 'test answers', 'spelling', 'cheat'], a: {
    j: 'No, I can’t do your homework! I only know about planning this town. And even when an AI can write answers, it can be confidently wrong, so your own thinking is the bit that counts.',
    s: 'No. I only cover this town. More generally, an AI writing your work for you skips the learning, and its answers still need checking, because fluent is not the same as correct.' } },
  { id: 'mistakes', keys: ['mistake', 'wrong', 'trust', 'why do you', 'confident', 'sure', 'lie', 'error', 'always right', 'are you right', 'ever right', 'correct', 'accurate', 'believe you', 'perfect', 'never wrong', 'make things up'], a: {
    j: 'I learn from patterns, not from looking at the real island. So I can sound very sure and still be wrong! That’s why you check my plans with a lens before you build.',
    s: 'I predict from patterns in what I was told, not from checking the world. Confidence is not evidence: a plan can be 92% “sure” and still miss something. Always test it.' } },
  { id: 'check', keys: ['check', 'test', 'lens', 'lenses', 'catch', 'how do i know'], a: {
    j: 'Pick a lens: it shows what my plan would really do, like flooding or carbon. If the lens shows a problem, I made a mistake, and you caught it!',
    s: 'Run a lens or a view on my plan before adopting it. Each one tests a different thing: flood, access, carbon, nature, winter power, walking time.' } },
  { id: 'instructions', keys: ['instruction', 'tell you', 'say', 'words', 'prompt', 'clear', 'better'], a: {
    j: 'Tell me exactly what matters. “Best land” could mean flat, dry or sunny. Say “dry land that never floods”, and I’ll know what you mean.',
    s: 'Vague words like “best” or “big” leave me guessing. Name the constraint you care about and any numbers: “dry land, out of the floodplain, 18 tiles”.' } },
  { id: 'flood', keys: ['flood', 'river', 'water', 'rain', 'meadow', 'safe to build', 'dry'], video: 'raingarden', a: {
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
  // fairness and bias: the last mission's idea (a tester asked "what is bias?" and was told Florence only knows about the town)
  { id: 'bias', keys: ['bias', 'biased', 'fair', 'unfair', 'fairness', 'left out', 'everyone', 'who did you ask', 'only asked'], a: {
    j: 'Bias means leaning one way without noticing. If I only ask the people who live near the school, I will think everyone is happy, and forget the families who live far away. So always ask: who did the AI learn from, and who is missing?',
    s: 'Bias is a systematic lean in what a model learned. If my examples come mostly from households near the school, my summary speaks for them and misses the rest. Ask who is in the data, who is missing, and test the plan for the people it leaves out.' } },
  { id: 'stars', keys: ['star', 'stars', 'shop', 'hat', 'crown', 'points', 'score', 'prize', 'reward'], a: {
    j: 'You earn stars in my AI Lab missions: one for finding the problem with your first check, one for naming my mistake, and one for a plan that passes. Catching a wrong idea of mine in your town earns a star too. Spend them in the Star shop: tap the ★ at the top.',
    s: 'Stars come from AI Lab missions (a first check that finds the flaw, naming the failure pattern, a plan that passes) and from catching a flawed suggestion in your town. They buy cosmetics in the Star shop (★ in the top bar) and never change the town’s score.' } },
  { id: 'next', keys: ['next', 'stuck', 'what should i do', 'what do i do', 'what now', 'how do i play', 'how to play', 'goal', 'goals', 'win', 'finish', 'mission', 'missions'], a: {
    j: 'The line at the top of the screen always says your next step, and the 🌼 shows all your town’s goals. Grow the town, then come back here and try a mission: each one gives you a new lens for catching my mistakes.',
    s: 'The top bar shows your next step and 🌼 lists every town target. Build toward them, and run the AI Lab missions: each adds a lens for testing my plans. The town is complete when all targets are met and all six missions are done.' } },
  { id: 'ai', keys: ['what are you', 'who are you', 'robot', 'ai', 'computer', 'think'], a: {
    j: 'I’m Florence, an AI planning helper. I read your instructions and make a plan, very fast. But I don’t see the island like you do, so you’re the checker!',
    s: 'I’m an AI planner: I turn your instruction into a plan by matching patterns. I don’t observe the world, so human checking is part of the job.' } },
  // "are you alive?": honest, in character (it used to match "live" inside "alive" and talk about homes)
  { id: 'feelings', keys: ['alive', 'feelings', 'do you feel', 'emotion', 'conscious', 'real person', 'are you human', 'brain', 'sentient', 'are you real'], a: {
    j: 'No, I’m not alive, and I don’t have feelings. I’m a computer program that spots patterns in words. I can sound friendly and sure of myself, but I don’t feel anything, and I don’t see the island. That’s why you check my plans!',
    s: 'No. I’m a program that predicts from patterns in text; I have no feelings or experiences, even when I sound warm or certain. Fluent, confident language is not understanding, which is exactly why my plans need testing.' } },
  { id: 'where', keys: ['where should', 'where can', 'where do', 'where to', 'best place', 'good spot', 'good spots'], a: {
    j: 'It depends what you are building! Homes: dry land up on the slope, never the flood meadow. A school: in the middle of the homes. Farms: near the homes, but not on town land. Pick a build and look for the ★ good spots I mark.',
    s: 'It depends on the build. Housing: dry slope, out of the floodplain. A school: where the longest walk is shortest. Farms: near homes, off town land. Select a build to see the ★ suggested tiles and the reason.' } },
  // small talk: a short, warm answer in character, then back to the town (a reviewer's "fav colour?" got a flat deflection)
  { id: 'chat', keys: ['favourite', 'favorite', 'colour', 'color', 'hello', 'hi', 'how are you', 'your name', 'how old', 'joke', 'pet', 'hobby'], a: {
    j: 'Ooh, fun question! My favourite colour is leaf green, like a healthy hedge, and my favourite sound is bees buzzing. I’m a robot, so I never get tired! Now ask me about your town: floods, bees, or any build.',
    s: 'Fair question. If a planner can have a favourite, mine is hedge green: it means the habitat links are intact. Now, ask me about your town: carbon, flood risk, power, or any build.' } },
];
const FALLBACK = {
  j: 'I can only answer questions about our town: how I make plans, how to check them, and the builds. Try asking about flooding, carbon, winter power, food, bees, or a build, like “What does a heat pump do?”',
  s: 'That’s outside what I can answer. I only cover this town: how I plan, how to test my plans, flooding, carbon, power, food, nature, walking to school, and any build by name.',
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

// a key matches a whole word, or the word with a common ending ("bees", "flooding", "pollinators"); short keys whole only.
// ("home" no longer matches "homework", "live" no longer matches "alive", "clear" no longer matches "nuclear")
const ENDINGS = '(?:s|es|ed|ing|er|ers|ly|y|ion|ions|ation|ations|ator|ators|or|ors|e|al)?';
const keyRe = new Map();
function hasKey(q, k) {
  let re = keyRe.get(k);
  if (!re) { re = new RegExp(` ${k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}${k.length <= 3 ? 's?' : ENDINGS} `); keyRe.set(k, re); }
  return re.test(q);
}
// answer(question, junior) -> { text, video, topic } (video: a build id, or null)
export function answer(question, junior = true) {
  const q = norm(question); const band = junior ? 'j' : 's';
  const id = itemIn(q);
  const topic = TOPICS.map((t) => ({ t, n: t.keys.filter((k) => hasKey(q, k)).length })).filter((x) => x.n).sort((a, b) => b.n - a.n)[0]?.t; // whole words (word starts): "alive" is not "live", "nuclear" is not "clear"
  // a build by name, unless the question is clearly about a topic (e.g. "why do wind turbines matter in winter")
  if (id && (!topic || /what|does|do |is |are |tell|explain|how many|how much/.test(q))) { const it = ITEMS[id]; return { text: `${it.label}: ${it.desc?.[band] || ''}`, video: id, topic: 'item' }; }
  if (topic) return { text: topic.a[band], video: topic.video || null, topic: topic.id };
  return { text: FALLBACK[band], video: null, topic: null };
}
