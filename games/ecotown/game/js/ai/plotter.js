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
  food: { max_food: /as much|most|maximum|max\b/, enough_food: /enough/, keep_hedges: /hedge/, bees: /\bbee|pollinat|hive/, wildlife: /wildlife|nature|animal|deer|bird/, local: /local|lorr|near (our )?home/, allotments: /allotment|garden|grow (our|their) own/, orchard: /orchard|fruit|apple/ },
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
  return { ...r, active, numbers: { minutes, ...num }, conf, isUnknown };
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
};
// only claimed when the plan really kept to the rule (checked on the honest simulation)
export const WONT_LINES = Object.values(WONT).flat().map(([, why]) => why); // for the voice recorder
function wontDo(level, text, after) { const t = String(text || '').toLowerCase(); return (WONT[level] || []).filter(([re, , kept]) => re.test(t) && kept(after)).map(([, why]) => why); }

// Read + plan + reply. ctx: { terrain, cells }
export function ask(level, text, ctx) {
  const r = read(level, text);
  if (r.isUnknown) return { unknown: true, read: r, hints: SCHEMA.hints[level] };
  const p = plan(level, r.active, { ...ctx, numbers: r.numbers, text: String(text || '').slice(0, 200) });
  const sure = Math.round(100 * (0.48 + 0.44 * Math.max(0, Math.min(1, r.conf * p.fit * p.experience)))); // 48–92%: sure, never certain
  const after = applyPlacements(ctx.cells, p.placements);
  const simAfter = simulate(ctx.terrain, after);
  p.wont = WONT[level] ? wontDo(level, text, simAfter) : [];
  p.targets = checkTargets(readTargets(level, text), simAfter); // numbers in the brief, said back against the plan's real result
  return { unknown: false, read: r, plan: p, after, sure, breakdown: { reading: Math.round(r.conf * 100), fit: Math.round(p.fit * 100), experience: Math.round(p.experience * 100) } };
}
export const getModel = () => model;
