// Plotter: read the instruction (small language model) → slots → planner → a reply built from templates.
// Plotter never writes free text. Nothing the player types is stored or sent anywhere.
import { plan, applyPlacements } from '../sim/planner.js';
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

export function read(level, text, { withExplain = false } = {}) {
  const clean = String(text || '').slice(0, 200);
  let r;
  if (model) {
    const p = model.predict(level, clean);
    let explain = [];
    if (withExplain) try { explain = model.explain(level, clean); } catch { /* optional */ } // costs one model run per word: only for live highlighting
    r = { slots: p.slots, unknown: p.unknown, explain, source: 'model' };
  } else r = { ...keywordRead(level, clean), source: 'keywords' };
  const active = Object.entries(r.slots).filter(([, p]) => p >= 0.5).map(([s]) => s);
  const m = clean.match(/(\d{1,2})\s*-?\s*min/); const minutes = m ? Math.max(3, Math.min(30, +m[1])) : null;
  // reading confidence: how sure the model is about the slots it switched on, and that this is on-topic
  const conf = active.length ? active.reduce((a, s) => a * r.slots[s], 1) ** (1 / active.length) * (1 - r.unknown) : 0.6 * (1 - r.unknown);
  // on-topic but no specific request ("pick some land"): Plotter falls back to its default reading
  const isUnknown = r.source === 'model' ? r.unknown >= 0.5 : r.unknown >= 0.5 || active.length === 0;
  return { ...r, active, numbers: { minutes }, conf, isUnknown };
}

// Read + plan + reply. ctx: { terrain, cells }
export function ask(level, text, ctx) {
  const r = read(level, text);
  if (r.isUnknown) return { unknown: true, read: r, hints: SCHEMA.hints[level] };
  const p = plan(level, r.active, { ...ctx, numbers: r.numbers });
  const sure = Math.round(100 * (0.48 + 0.44 * Math.max(0, Math.min(1, r.conf * p.fit * p.experience)))); // 48–92%: sure, never certain
  const after = applyPlacements(ctx.cells, p.placements);
  return { unknown: false, read: r, plan: p, after, sure, breakdown: { reading: Math.round(r.conf * 100), fit: Math.round(p.fit * 100), experience: Math.round(p.experience * 100) } };
}
export const getModel = () => model;
