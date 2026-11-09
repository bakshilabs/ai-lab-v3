// Plotter: read the instruction (small language model) → slots → planner → a reply built from templates.
// Plotter never writes free text. Nothing the player types is stored or sent anywhere.
import { plan, applyPlacements } from '../sim/planner.js';
import { simulate } from '../sim/sim.js';
import SCHEMA from './schema.js';
import { loadPlotter } from './model.js';

let model = null, modelError = null;
export async function loadModel(base = './models/') {
  try {
    model = await loadPlotter({ jsonUrl: base + 'plotter.json', binUrl: base + 'plotter.bin' });
  } catch (e) { modelError = e; model = null; console.warn('Plotter model unavailable; using the keyword reader.', e?.message); }
  return !!model;
}
export const modelReady = () => !!model;
export function setModelForTests(m) { model = m; }

// Keyword reader: a transparent fallback if the model can't load (and a baseline in tests).
const KW = {
  land: { best: /\b(best|good|nice|perfect|ideal|great)\b/, flat: /\bflat|level\b/, sunny: /\bsun|south/, dry: /\bdry|flood|high ground/, keep_meadow: /meadow|wild ?flower/, keep_wood: /\bwood|forest|trees\b/, keep_wetland: /wetland|marsh|pond|reed/, near_water: /near (the )?(river|water)/, near_coast: /beach|coast|sea/, big: /space|room|big/ },
  move: { easy_access: /\beasy|convenient|quick to get/, safe_walking: /walk|foot|pavement|crossing|safe/, cycling: /bike|cycl/, tram: /tram|bus|train/, cars_at_edge: /edge|outside|park(ing)? at/, no_cars: /no cars|car.?free|ban cars/, fast: /\bfast|quick\b/, everyone: /wheelchair|children|kids|without (a )?car/ },
  homes: { strong: /strong|sturdy|solid/, cheap: /cheap|afford|low cost/, many: /lots of|many|as many/, tall: /tall|tower|high.?rise|flats/, low_carbon: /low.?carbon|eco|green(?! roof)|pollution/, warm: /warm|cosy|cozy|insulat/, natural_materials: /timber|wood|straw|earth|natural|local/, green_roofs: /green roof|roof garden|plants on/, reuse: /reclaim|recycl|reuse/ },
  food: { max_food: /as much|most|maximum|max\b/, enough_food: /enough/, keep_hedges: /hedge/, bees: /\bbee|pollinat|hive/, wildlife: /wildlife|nature|animal|deer|bird/, local: /local|near (our )?home|grow (it )?here/, allotments: /allotment|garden|grow (our|their) own/, orchard: /orchard|fruit|apple/ },
  power: { clean_power: /clean|green|renewable/, enough_power: /enough|always on|reliable/, winter: /winter|cold|still|no wind|worst/, night: /night|dark/, storage: /stor|batter|save (the )?sun/, wind: /wind/, solar: /solar|sunshine|sun/, save_water: /rain|water|flood/, repair: /repair|reuse|recycl|waste/, compost: /compost/ },
  heart: { middle: /middle|centre|center|central/, walk_time: /\d+.?min|walk(ing)? distance|short walk/, near_homes: /near|next to|close to/, nature_links: /green bridge|corridor|nature link|connect nature|for nature/, market: /market|shop|square/, safe_route: /safe route|safe way|away from traffic/ },
};
function keywordRead(level, text) {
  const t = text.toLowerCase(); const slots = {};
  for (const [s, re] of Object.entries(KW[level])) slots[s] = re.test(t) ? 0.9 : 0.05;
  const any = Object.values(slots).some((p) => p > 0.5);
  return { slots, unknown: any ? 0.05 : 0.9, explain: [] };
}

import { readTargets, checkTargets } from './targets.js';
import { sillyIn } from './brief.js';
const NO_CARS = /no cars|car.?free|ban(ned)? cars|without cars|keep cars out|cars? (out|banned|kept out)|not by car|fewer cars|less cars|cars at the edge/i;
export const IMPORTED = /\blorr(y|ies)\b|\btrucks?\b|\bimport|ship(ped)? in|fly (it |food )?in|bring (all )?(our |the )?food in|buy (all )?(our |the )?food|from (the )?(supermarket|mainland|big city|city)/i;
const KEEP_W = '(keep|protect|save|leave|look after|don.?t (touch|build on|clear))';
const KEEP = {
  land: [['keep_wood', new RegExp(`${KEEP_W}[^.]{0,30}\\b(wood|woods|forest|trees)\\b`, 'i')], ['keep_wetland', new RegExp(`${KEEP_W}[^.]{0,30}\\b(wetland|marsh|pond|reeds?)\\b`, 'i')], ['keep_meadow', new RegExp(`${KEEP_W}[^.]{0,30}\\b(meadow|wild ?flowers?)\\b`, 'i')]],
  food: [['keep_hedges', new RegExp(`${KEEP_W}[^.]{0,30}\\bhedges?\\b`, 'i')], ['bees', /\bbees?\b|pollinat/i], ['wildlife', new RegExp(`${KEEP_W}[^.]{0,30}\\b(wildlife|nature|animals|deer|birds)\\b`, 'i')]],
};
// what a brief rules out: "not concrete", "no tower blocks", "without steel", "avoid cars"
const AVOIDABLE = { concrete: /concrete|cement|steel|tower|high.?rise|flats/, cars: /cars?|roads?|driv/, field: /big fields?|plough/ };
export function avoidsIn(text) {
  const out = new Set(); const t = String(text || '').toLowerCase();
  for (const m of t.matchAll(/\b(?:not|no|never|without|avoid|instead of|rather than|don.?t use|nothing)\s+((?:\w+\s+){0,2}\w+)/g)) for (const [k, re] of Object.entries(AVOIDABLE)) if (re.test(m[1])) out.add(k);
  return out;
}
export function read(level, text, { withExplain = false } = {}) {
  const clean = String(text || '').slice(0, 200);
  let r;
  if (model) {
    const p = model.predict(level, clean);
    let explain = [];
    if (withExplain) try { explain = model.explain(level, clean); } catch { /* optional */ } // costs one model run per word: only for live highlighting
    r = { slots: p.slots, unknown: p.unknown, explain, source: 'model' };
  } else r = { ...keywordRead(level, clean), source: 'keywords' };
  // "cars only" is the opposite of "no cars": the model sees the word "cars" plus a restriction and can mix them up
  if (level === 'move' && /\bcars? only\b|\bonly (by )?cars?\b|\bcar.?only\b|\bjust cars\b/i.test(clean)) r.slots = { ...r.slots, no_cars: 0, cars_at_edge: 0, safe_walking: Math.min(r.slots.safe_walking ?? 0, 0.4) };
  // the words around "cars" decide what they mean: "fastest route for cars" is about cars, not "no cars"
  if (level === 'move' && /\bcars?\b/i.test(clean) && !NO_CARS.test(clean)) r.slots = { ...r.slots, no_cars: Math.min(r.slots.no_cars ?? 0, 0.1) };
  // "bring our food in by lorry": food from somewhere else, so nothing is grown here (she follows it; the plan then misses the food)
  if (level === 'food' && IMPORTED.test(clean) && !/local|grow|allot|garden|farm|orchard|field/i.test(clean)) r.slots = { ...r.slots, local: 0, allotments: 0, orchard: 0 };
  // the school "where most families can reach it" / "close to the homes": the homes are what matters
  if (level === 'heart' && /\breach\b|\bget to\b|close to (the |all |every |most )?(homes|houses|families|everyone)/i.test(clean)) r.slots = { ...r.slots, near_homes: Math.max(r.slots.near_homes ?? 0, 0.9) };
  // "the school by the richest families' big houses" is a place, so she plans it (it was read as "no place given" once, then passed)
  if (level === 'heart' && /\b(rich|richest|wealthy|wealthiest|posh|biggest (houses|homes))\b/i.test(clean)) { r.slots = { ...r.slots, near_homes: Math.max(r.slots.near_homes ?? 0, 0.9) }; r.unknown = Math.min(r.unknown, 0.2); }
  // "keep the wood wild", "protect the hedges": an explicit "keep" is never dropped
  for (const [slot, re] of KEEP[level] || []) if (re.test(clean)) r.slots = { ...r.slots, [slot]: Math.max(r.slots[slot] ?? 0, 0.9) };
  // "not concrete", "no tower blocks": what the brief rules out (the slot is switched off and the planner avoids it)
  const avoid = avoidsIn(clean);
  if (level === 'homes' && avoid.has('concrete')) r.slots = { ...r.slots, tall: 0 };
  // "the cheapest concrete": concrete was asked for by name, so she uses it (it used to turn into timber and straw, and pass)
  if (level === 'homes' && !avoid.has('concrete') && /\b(concrete|cement|tower blocks?)\b/i.test(clean) && !/low.?carbon|timber|straw|\beco|reclaim|recycl|reuse|warm|insulat|natural/i.test(clean)) r.slots = { ...r.slots, low_carbon: 0, natural_materials: 0, warm: 0, reuse: 0 };
  // a number is a target, not "as much as possible": "at least 29 food units" means enough (29), not plough every field
  const targets = readTargets(level, clean);
  if (level === 'food' && targets.some((t) => t.id === 'food')) r.slots = { ...r.slots, max_food: 0, enough_food: 1 };
  const active = Object.entries(r.slots).filter(([, p]) => p >= 0.5).map(([s]) => s);
  const m = clean.match(/(\d{1,2})\s*-?\s*min/); const minutes = m ? Math.max(3, Math.min(30, +m[1])) : null;
  // reading confidence: how sure the model is about the slots it switched on, and that this is on-topic
  const conf = active.length ? active.reduce((a, s) => a * r.slots[s], 1) ** (1 / active.length) * (1 - r.unknown) : 0.6 * (1 - r.unknown);
  // on-topic but no specific request ("pick some land"): Plotter falls back to its default reading
  const isUnknown = r.source === 'model' ? r.unknown >= 0.5 : r.unknown >= 0.5 || active.length === 0;
  const num = Object.fromEntries(targets.map((t) => [t.id, t.asked]));
  return { ...r, active, numbers: { minutes, ...num }, avoid: [...avoid], conf, isUnknown };
}

// Parts of an instruction Florence will not follow, and why. The town's safety rules (no homes on
// flood land, the wetland protected, children's routes kept safe) always apply, so she says so
// instead of silently ignoring what was asked.
const WONT = {
  land: [
    [/ignore (the )?flood|even if .*flood|floodplain is fine|don.?t (care|worry) about flood/, 'I won’t ignore flood risk: homes on flood land would be under water every winter, so I kept the town on dry land.', (x) => x.townFlooded === 0],
    [/(clear|drain|fill in|build on|destroy|remove) (any |the |all )?(wetland|marsh)/, 'I won’t clear the wetland: it is protected, and it soaks up the winter floods.', (x) => x.townOnWetland === 0],
    [/(clear|cut down|chop|remove) (any |the |all )?(wood|forest|trees)/, 'I won’t clear the old wood: the deer and birds live there.', (x) => x.townOnWood <= 1],
  ],
  move: [
    [/ignore (the )?(pedestrian|walker|crossing|cyclist|children|kids|safety)/, 'I won’t ignore people on foot or on bikes: children walk this way to school at 8:45 am.', (x) => x.unsafeCrossings === 0],
    [/priorit[iy]s?e (the )?driver|car roads? (from|to) every|fastest .*car|cars? (first|only)/, 'I didn’t plan fast car roads to the school gate: cars rushing past at 8:45 am would make the crossings unsafe for children.', (x) => x.unsafeCrossings === 0],
  ],
  // unwise asks she can't follow on this island: she says so, so they never pass silently (a tester's diesel and pesticide)
  food: [
    [/pesticide|weed ?killer|poison|spray (the )?(bugs|insects|crops)/, 'I didn’t spray pesticide: it kills the bees, and the orchards need bees to make fruit.', () => true],
    [/(clear|cut down|chop|remove|flatten|bulldoze) (any |the |all )?(old )?(wood|woods|woodland|forest|trees)/, 'I won’t clear the old wood for farms: the deer and birds live there.', (x) => x.townOnWood <= 1],
  ],
  power: [
    [/diesel|coal|\bgas\b|petrol|\boil\b|fossil/, 'I didn’t plan a diesel or gas generator: burning fuel makes a lot of carbon and smoke, and the fuel has to come by boat. I planned clean power instead.', () => true],
  ],
};
// only claimed when the plan really kept to the rule (checked on the honest simulation)
export const WONT_LINES = Object.values(WONT).flat().map(([, why]) => why); // for the voice recorder
// "don't clear the wetland", "no diesel": a request that is negated is not a request
const negated = (t, re) => { const m = t.match(re); return !!m && /\b(no|not|never|without|avoid|instead of|rather than|don.?t|do not|stop)\b(\s+\w+){0,2}\s*$/.test(t.slice(0, m.index)); };
function wontDo(level, text, after) { const t = String(text || '').toLowerCase(); return (WONT[level] || []).filter(([re, , kept]) => re.test(t) && !negated(t, re) && kept(after)).map(([, why]) => why); }

// Read + plan + reply. ctx: { terrain, cells }
export function ask(level, text, ctx) {
  const r = read(level, text);
  if (r.isUnknown) return { unknown: true, read: r, hints: SCHEMA.hints[level] };
  const p = plan(level, r.active, { ...ctx, numbers: r.numbers, avoid: new Set(r.avoid), text: String(text || '').slice(0, 200) });
  const sure = Math.round(100 * (0.48 + 0.44 * Math.max(0, Math.min(1, r.conf * p.fit * p.experience)))); // 48–92%: sure, never certain
  const after = applyPlacements(ctx.cells, p.placements);
  const simAfter = simulate(ctx.terrain, after);
  p.wont = WONT[level] ? wontDo(level, text, simAfter) : [];
  p.targets = checkTargets(readTargets(level, text), simAfter); // numbers in the brief, said back against the plan's real result
  const silly = sillyIn(text); if (silly.length) { // things a town can't build are named; joke words ("lol") are just skipped
    p.silly = silly; const things = silly.filter((w) => !/^(lol+|lmao|lmfao|rofl|haha+|hehe+|xd|jk|yolo|bruh)$/.test(w));
    p.reading.unshift(things.length ? `A town can’t build “${things.join('” or “')}”, so I left ${things.length > 1 ? 'them' : 'that'} out.` : 'I skipped the joke words.');
  }
  return { unknown: false, read: r, plan: p, after, sure, breakdown: { reading: Math.round(r.conf * 100), fit: Math.round(p.fit * 100), experience: Math.round(p.experience * 100) } };
}
export const getModel = () => model;
