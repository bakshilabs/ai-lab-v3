// Florence's planner. It optimises exactly what the instruction asked for and nothing else.
// The AI's mistakes come from here, from literal readings and typical-case assumptions,
// never from a script: leave out "dry" and it really does pick the flattest land, the floodplain.
import { ITEMS, TARGETS, placeReason } from '../world/catalog.js';
import { key, neighbours, tileCenter } from '../world/terrain.js';
import { cellOf, simulate, walkField, routeFrom } from './sim.js';

// How familiar Florence is with each kind of request (1 = done it many times). Shown in senior mode.
const EXPERIENCE = { winter: 0.82, night: 0.88, storage: 0.88, walk_time: 0.95, everyone: 0.92, natural_materials: 0.93, reuse: 0.92, keep_hedges: 0.95, bees: 0.95, dry: 0.96, nature_links: 0.9 };

export function plan(level, slotList, ctx) {
  const slots = new Set(slotList);
  const P = PLANNERS[level];
  const out = P(slots, ctx);
  out.experience = [...slots].reduce((a, s) => a * (EXPERIENCE[s] ?? 1), 1);
  out.slots = [...slots];
  return out;
}

const free = (ctx, t, id) => !placeReason(id, t, cellOf(ctx.cells, t.k)) && !cellOf(ctx.cells, t.k).item;
const tilesOf = (ctx) => [...ctx.terrain.tiles.values()];
const townTiles = (ctx) => tilesOf(ctx).filter((t) => cellOf(ctx.cells, t.k).mark === 'town');
const centroid = (ts) => { const c = [0, 0]; for (const t of ts) { const [x, z] = tileCenter(t.gx, t.gz); c[0] += x; c[1] += z; } return ts.length ? [c[0] / ts.length, c[1] / ts.length] : [0, 0]; };
const distTo = (t, [x, z]) => { const [a, b] = tileCenter(t.gx, t.gz); return Math.hypot(a - x, b - z); };
const nearRiver = (ctx, t) => neighbours(ctx.terrain.tiles, t).some((n) => n.zone === 'river');

// apply placements to a copy of cells (used to evaluate a plan without committing it)
export function applyPlacements(cells, placements) {
  const next = new Map([...cells].map(([k, c]) => [k, { ...c, mods: [...c.mods] }]));
  for (const p of placements) {
    const c = next.get(p.k) || { mark: null, item: null, mods: [], locked: false };
    if (p.mark !== undefined) c.mark = p.mark;
    if (p.item !== undefined) c.item = p.item;
    if (p.mod) c.mods.push(p.mod);
    next.set(p.k, c);
  }
  return next;
}

const PLANNERS = {
  // ---------- Level 1: where should the town grow?
  land(slots, ctx) {
    const reading = [], assumptions = [];
    const generic = slots.has('best') || slots.size === 0;
    if (generic) { reading.push('“Best” = the flattest land, easiest to build on, next to water.'); assumptions.push('Flat land is the best land.'); }
    // which habit a flawed reading shows (graded against what Florence actually assumed, not a fixed answer)
    let habit = null, habitWhy = ''; // set below from what the plan really does
    if (slots.has('flat')) reading.push('Flat land.');
    if (slots.has('sunny')) reading.push('Sunny, south-facing land.');
    if (slots.has('dry')) reading.push('Land that stays dry in winter.');
    if (slots.has('near_water')) reading.push('Near the river.');
    if (slots.has('near_coast')) reading.push('Near the coast.');
    for (const z of ['meadow', 'wood', 'wetland']) if (slots.has('keep_' + z)) reading.push(`Keep the ${z} wild.`);
    const score = (t) => {
      let s = 0;
      if (generic || slots.has('flat')) { s += t.h === 0 ? 3 : 0; if (t.zone === 'wood') s -= 2; if (t.hedge) s -= 1; }
      if (generic) s += nearRiver(ctx, t) ? 1 : 0;
      if (slots.has('sunny')) s += t.zone === 'slope' ? 4 : t.zone === 'coast' ? 1 : 0;
      if (slots.has('near_water')) s += nearRiver(ctx, t) || t.zone === 'wetland' ? 3 : 0;
      if (slots.has('near_coast')) s += t.zone === 'coast' ? 3 : 0;
      if (slots.has('dry') && (t.zone === 'meadow' || t.zone === 'wetland')) s -= 100;
      for (const z of ['meadow', 'wood', 'wetland']) if (slots.has('keep_' + z) && t.zone === z) s -= 100;
      return s;
    };
    // the wetland is protected in every level, and the far bank is cut off by the river
    const cand = tilesOf(ctx).filter((t) => t.zone !== 'river' && t.zone !== 'wetland' && !t.fixed && t.gx > 2);
    const seed = cand.reduce((a, b) => (score(b) > score(a) ? b : a));
    const region = new Set([seed.k]); const sc = new Map(cand.map((t) => [t.k, score(t)]));
    while (region.size < TARGETS.townTiles) {
      let best = null, bs = -Infinity;
      for (const k of region) for (const n of neighbours(ctx.terrain.tiles, ctx.terrain.tiles.get(k))) {
        if (region.has(n.k) || !sc.has(n.k) || sc.get(n.k) <= -50) continue; // never grow into land the instruction protects
        const v = sc.get(n.k) - 0.01 * distTo(n, tileCenter(seed.gx, seed.gz));
        if (v > bs) { bs = v; best = n.k; }
      }
      if (!best) break; region.add(best);
    }
    const placements = [...region].map((k) => ({ k, mark: 'town' }));
    // which habit does this plan show? (only when it really floods or clears the wood)
    const flooded = [...region].filter((k) => ['meadow', 'wetland'].includes(ctx.terrain.tiles.get(k).zone)).length, wooded = [...region].filter((k) => ctx.terrain.tiles.get(k).zone === 'wood').length;
    if (flooded >= 2 || wooded >= 2) {
      if (generic) { habit = 'one_word'; habitWhy = 'Florence turned “best” into “flattest” and forgot about floods and wildlife.'; }
      else if (flooded >= 2) { habit = 'missing'; habitWhy = 'Florence didn’t know that the flat land by the river floods every winter.'; }
      else { habit = 'missing'; habitWhy = 'Florence didn’t know the old wood is home to deer and birds.'; }
    }
    for (const t of cand) for (const z of ['meadow', 'wood']) if (slots.has('keep_' + z) && t.zone === z && !region.has(t.k)) placements.push({ k: t.k, mark: 'wild' });
    // fit: how close the chosen land comes to the best land *by Plotter's own reading*
    const mean = [...region].reduce((a, k) => a + sc.get(k), 0) / region.size;
    const top = [...sc.values()].sort((a, b) => b - a).slice(0, region.size); const best = top.reduce((a, b) => a + b, 0) / top.length;
    return { placements, reading, assumptions, habit, habitWhy, tested: 'how flat and buildable the land looks from the sky', fit: Math.max(0.5, Math.min(1, best > 0 ? mean / best : 0.6)) };
  },

  // ---------- Level 2: getting around
  move(slots, ctx) {
    const reading = [], assumptions = [];
    const walkish = ['safe_walking', 'cycling', 'tram', 'no_cars', 'cars_at_edge'].some((s) => slots.has(s));
    const carMode = !walkish && !slots.has('everyone');
    if (carMode) { reading.push(slots.has('fast') ? '“Fast” = wide roads for cars.' : '“Easy for everyone” = easy for drivers: a wide road and a drop-off car park at the school.'); assumptions.push('Most people travel by car.'); }
    const habit = !carMode ? null : slots.has('fast') ? 'one_word' : 'typical';
    const habitWhy = !carMode ? '' : slots.has('fast') ? 'Florence turned “fast” into “wide roads for cars” and forgot about children crossing.' : 'Florence planned for a typical grown-up who drives, not for children walking to school.';
    if (slots.has('everyone') && !walkish) reading.push('Everyone, including children and people without cars: footpaths and cycle lanes.');
    if (slots.has('safe_walking')) reading.push('Safe footpaths and crossings.');
    if (slots.has('cycling')) reading.push('Cycle lanes.');
    if (slots.has('tram')) reading.push('A tram stop.');
    if (slots.has('cars_at_edge')) reading.push('Cars park at the edge of town.');
    if (slots.has('no_cars')) reading.push('No cars in town.');
    // step-free access: what the brief says about wheelchairs, buggies, slopes, lighting and slower walkers
    const tx = (ctx.text || '').toLowerCase(); const access = [];
    if (!carMode && (/wheelchair|step.?free|ramp|kerb|curb|disab|buggy|pushchair|pram|accessib/.test(tx) || slots.has('everyone'))) access.push('Step-free routes: dropped kerbs and no steps, wide enough for wheelchairs and buggies.');
    if (!carMode && /slope|gradient|gentle|hill|steep/.test(tx)) access.push('Gentle slopes: footpaths graded where the land climbs.');
    if (!carMode && /slow|older|elderly|old people|grandparent|young children|little ones|time to cross|crossing time/.test(tx)) access.push('Longer green-man time at crossings for slower walkers.');
    if (!carMode && /ferry/.test(tx) && /access|step|wheelchair|ramp/.test(tx)) access.push('A step-free ramp onto the ferry.');
    if (!carMode && /\blit\b|light|dark/.test(tx)) access.push('Lit footpaths for dark winter mornings.');
    reading.push(...access);
    const terr = ctx.terrain, school = terr.tiles.get(terr.school);
    const town = townTiles(ctx); const placements = [];
    if (!town.length || !school) return { placements, reading, assumptions, tested: 'nothing yet', fit: 0.5 };
    // route from the town to the school gate (shortest over land)
    const field = walkField(terr, new Map(), [school.k]);
    const start = town.reduce((a, b) => ((field.get(a.k) ?? 99) <= (field.get(b.k) ?? 99) ? a : b));
    let route = routeFrom(terr, field, start.k).filter((k) => k !== school.k);
    // the brief says school *and* the ferry: a second route from the town to the dock
    const dockT = terr.tiles.get(terr.dock);
    if (dockT) { const df = walkField(terr, new Map(), [dockT.k]); const ds = town.reduce((a, b) => ((df.get(a.k) ?? 99) <= (df.get(b.k) ?? 99) ? a : b)); for (const k of routeFrom(terr, df, ds.k)) if (k !== dockT.k && !route.includes(k)) route.push(k); }
    // a main street through the middle of town
    const c = centroid(town); const main = town.filter((t) => !route.includes(t.k)).sort((a, b) => distTo(a, c) - distTo(b, c))[0];
    if (main) route.push(main.k);
    const modes = [];
    if (carMode) modes.push('road'); else { if (slots.has('safe_walking') || slots.has('everyone') || slots.has('no_cars')) modes.push('path'); if (slots.has('cycling') || slots.has('everyone')) modes.push('cycle'); if (!modes.length) modes.push('path'); }
    route.forEach((k, i) => { const t = terr.tiles.get(k); const id = modes[i % modes.length]; if (free(ctx, t, id)) placements.push({ k, item: id }); });
    if (carMode) { const gate = neighbours(terr.tiles, school).find((n) => free(ctx, n, 'carpark') && !route.includes(n.k)); if (gate) placements.push({ k: gate.k, item: 'carpark' }); }
    if (slots.has('tram')) { const edge = town.filter((t) => !route.includes(t.k) && free(ctx, t, 'tram')).sort((a, b) => (field.get(a.k) ?? 99) - (field.get(b.k) ?? 99))[0]; if (edge) placements.push({ k: edge.k, item: 'tram' }); }
    if (slots.has('cars_at_edge')) {
      const dock = terr.tiles.get(terr.dock);
      // only on dry, buildable edge land (never the floodplain meadow or the wetland)
      const edge = tilesOf(ctx).filter((t) => ['field', 'slope'].includes(t.zone) && free(ctx, t, 'carpark') && cellOf(ctx.cells, t.k).mark !== 'town' && neighbours(terr.tiles, t).some((n) => cellOf(ctx.cells, n.k).mark === 'town') && !neighbours(terr.tiles, t).includes(school))
        .sort((a, b) => distTo(a, tileCenter(dock.gx, dock.gz)) - distTo(b, tileCenter(dock.gx, dock.gz)))[0];
      if (edge && !placements.some((p) => p.k === edge.k)) placements.push({ k: edge.k, item: 'carpark' });
    }
    return { placements, reading, assumptions, habit, habitWhy, tested: carMode ? 'journey time for a car' : access.length ? 'journey time on foot and by bike, and a step-free route to school and the ferry' : 'journey time on foot and by bike', fit: 0.95 };
  },

  // ---------- Level 3: homes
  homes(slots, ctx) {
    const reading = [], assumptions = [];
    const eco = ['low_carbon', 'natural_materials', 'warm', 'reuse'].some((s) => slots.has(s));
    let types;
    if (eco) {
      types = [];
      if (slots.has('warm')) types.push('straw');
      if (slots.has('natural_materials') || slots.has('low_carbon')) types.push('timber', 'straw');
      if (slots.has('reuse')) types.push('reclaimed');
      if (slots.has('many')) types.unshift('cohousing');
      reading.push(`${[...new Set(types)].map((t) => ITEMS[t].label).join(', ')}.`);
    } else {
      types = ['concrete'];
      const why = slots.has('strong') ? '“Strong” = concrete and steel.' : slots.has('tall') ? '“Tall” = concrete tower blocks.' : slots.has('cheap') ? '“Cheap” = concrete flats (cheapest per home).' : slots.has('many') ? '“As many as possible” = concrete flats.' : 'Homes = the usual kind: concrete flats.';
      reading.push(why); assumptions.push('Strong and many matter most; carbon was not mentioned.');
    }
    const word = slots.has('strong') ? 'strong' : slots.has('tall') ? 'tall' : slots.has('cheap') ? 'cheap' : slots.has('many') ? 'lots of' : null;
    const habit = eco ? null : word ? 'one_word' : 'typical';
    const habitWhy = eco ? '' : word ? `Florence chased “${word}” and chose concrete, forgetting carbon and warmth.` : 'Florence built the usual kind of home, concrete flats, without thinking about carbon or warmth.';
    if (slots.has('green_roofs')) reading.push('Green roofs.');
    types = [...new Set(types)];
    const town = townTiles(ctx).filter((t) => free(ctx, t, types[0]));
    const c = centroid(townTiles(ctx)); town.sort((a, b) => distTo(a, c) - distTo(b, c));
    const placements = []; let fam = 0, i = 0;
    for (const t of town) {
      if (fam >= TARGETS.families) break;
      if (town.length - placements.length <= 2 && fam >= TARGETS.families * 0.75) break; // leave room for later levels
      const id = types[i++ % types.length]; placements.push({ k: t.k, item: id }); fam += ITEMS[id].families;
      if (slots.has('green_roofs')) placements.push({ k: t.k, mod: 'greenroof' });
    }
    if (fam < TARGETS.families) assumptions.push(`Only room for ${fam} of ${TARGETS.families} families on this town land.`);
    return { placements, reading, assumptions, habit, habitWhy, tested: eco ? 'carbon, warmth and families housed' : 'strength and families housed', fit: Math.min(1, fam / TARGETS.families) };
  },

  // ---------- Level 4: food
  food(slots, ctx) {
    const reading = [], assumptions = [];
    const sim0 = simulate(ctx.terrain, ctx.cells); const need = sim0.foodNeed;
    const maxMode = slots.has('max_food') || (!slots.has('enough_food') && !['bees', 'keep_hedges', 'wildlife', 'allotments', 'orchard', 'local'].some((s) => slots.has(s)));
    if (maxMode) { reading.push('“As much food as possible” = plough every free field into big fields.'); assumptions.push('More food is always better.'); }
    else reading.push(`Enough food for ${sim0.families} families (${need} baskets).`);
    const habit = maxMode ? 'one_word' : !slots.has('keep_hedges') && !slots.has('bees') && !slots.has('wildlife') ? 'missing' : null;
    const habitWhy = maxMode ? 'Florence chased “as much as possible” and ploughed up every hedge.' : habit ? 'Florence didn’t know the bees and deer live in the hedges.' : '';
    if (slots.has('keep_hedges')) reading.push('Keep the hedges.');
    if (slots.has('bees')) reading.push('Beehives and flowers for bees.');
    if (slots.has('wildlife')) reading.push('Leave room for wildlife.');
    if (slots.has('allotments') || slots.has('local')) reading.push('Allotments near homes.');
    if (slots.has('orchard')) reading.push('An orchard.');
    const c = centroid(townTiles(ctx));
    const land = tilesOf(ctx).filter((t) => ['field', 'meadow', 'slope'].includes(t.zone) && free(ctx, t, 'mixed'))
      .filter((t) => !(slots.has('wildlife') && t.zone === 'meadow'))
      .sort((a, b) => distTo(a, c) - distTo(b, c));
    const placements = []; let food = sim0.food;
    const put = (t, id) => { placements.push({ k: t.k, item: id }); food += ITEMS[id].food || 0; };
    const used = new Set();
    if (slots.has('allotments') || slots.has('local')) { for (const t of townTiles(ctx).filter((t) => free(ctx, t, 'allot')).slice(0, 2)) { put(t, 'allot'); used.add(t.k); } }
    if (slots.has('bees')) { const ts = land.filter((t) => !used.has(t.k)).slice(0, 2); for (const t of ts) { put(t, 'hives'); used.add(t.k); } }
    if (slots.has('orchard') || slots.has('bees') || slots.has('wildlife')) { const ts = land.filter((t) => !used.has(t.k)).slice(0, 2); for (const t of ts) { put(t, 'orchard'); used.add(t.k); } }
    for (const t of land) {
      if (used.has(t.k)) continue;
      if (!maxMode && food >= need) break;
      const id = slots.has('keep_hedges') && t.hedge ? 'mixed' : maxMode || !slots.has('keep_hedges') ? 'bigfield' : 'mixed';
      put(t, id); used.add(t.k);
    }
    return { placements, reading, assumptions, habit, habitWhy, tested: 'food produced', fit: Math.min(1, food / need) };
  },

  // ---------- Level 5: water, power and waste
  power(slots, ctx) {
    const reading = [], assumptions = [];
    const sim0 = simulate(ctx.terrain, ctx.cells);
    const homes = sim0.homes.map((h) => ctx.terrain.tiles.get(h.k));
    const worst = slots.has('winter') || slots.has('night') || slots.has('storage');
    const placements = [];
    let demand = sim0.power.demand;
    if (!worst) {
      reading.push('Enough clean power on an average day: solar roofs on every home.');
      assumptions.push('Planned for an average day.');
      for (const t of homes) if (!cellOf(ctx.cells, t.k).mods.includes('solar')) placements.push({ k: t.k, mod: 'solar' });
    } else {
      reading.push('Enough power for a still winter night.');
      const useSolar = slots.has('solar') || slots.has('storage');
      if (useSolar) { reading.push('Solar roofs, with the sunshine stored in batteries.'); for (const t of homes.slice(0, Math.ceil(homes.length / 2))) if (!cellOf(ctx.cells, t.k).mods.includes('solar')) placements.push({ k: t.k, mod: 'solar' }); }
      const c = centroid(homes);
      // turbines keep one tile clear of homes, allotments, orchards and the wetland
      const busy = (n) => { const nc = cellOf(ctx.cells, n.k); return n.zone === 'wetland' || n.fixed || nc.mark === 'town' || ['allot', 'orchard', 'hives', 'market', 'school'].includes(nc.item) || (nc.item && ITEMS[nc.item].home); };
      const land = tilesOf(ctx).filter((t) => ['field', 'coast', 'slope'].includes(t.zone) && free(ctx, t, 'wind') && !neighbours(ctx.terrain.tiles, t).some(busy)).sort((a, b) => distTo(a, c) - distTo(b, c));
      const nWind = slots.has('wind') || !useSolar ? 3 : 1;
      let winter = sim0.power.winterSupply;
      for (const t of land.slice(0, nWind)) { placements.push({ k: t.k, item: 'wind' }); winter += 1; }
      reading.push(`${nWind} wind turbine${nWind > 1 ? 's' : ''}.`);
      // batteries sit at the edge of town (next to it, not between the houses or in the orchard)
      const taken = new Set(placements.map((p) => p.k));
      const edgeSpots = tilesOf(ctx).filter((t) => ['field', 'slope'].includes(t.zone) && !taken.has(t.k) && free(ctx, t, 'battery') && neighbours(ctx.terrain.tiles, t).some((n) => cellOf(ctx.cells, n.k).mark === 'town') && !neighbours(ctx.terrain.tiles, t).some((n) => ['orchard', 'allot', 'hives'].includes(cellOf(ctx.cells, n.k).item))).sort((a, b) => distTo(a, c) - distTo(b, c));
      // edge of town first; if those run out (paths and car parks use some), free town tiles
      // (keeping one town tile free for each rain garden, repair café or compost hub asked for)
      const reserve = ['save_water', 'repair', 'compost'].filter((x) => slots.has(x)).length;
      const inTown = townTiles(ctx).filter((t) => !taken.has(t.k) && free(ctx, t, 'battery') && !edgeSpots.includes(t));
      const nearby = tilesOf(ctx).filter((t) => ['field', 'slope'].includes(t.zone) && !taken.has(t.k) && !edgeSpots.includes(t) && free(ctx, t, 'battery') && neighbours(ctx.terrain.tiles, t).some((n) => cellOf(ctx.cells, n.k).item || cellOf(ctx.cells, n.k).mark === 'town') && !neighbours(ctx.terrain.tiles, t).some((n) => ['orchard', 'allot', 'hives'].includes(cellOf(ctx.cells, n.k).item))).sort((a, b) => distTo(a, c) - distTo(b, c)).slice(0, 4);
      const spots = [...edgeSpots, ...nearby, ...inTown.slice(0, Math.max(0, inTown.length - reserve))];
      let b = 0; while (winter < demand && b < spots.length) { placements.push({ k: spots[b].k, item: 'battery' }); winter += 4; b++; }
      if (b) reading.push(`${b} batter${b > 1 ? 'ies' : 'y'} to store energy for the night.`);
      if (winter < demand) assumptions.push('Not enough space to cover every still winter night.');
    }
    const townFree = () => townTiles(ctx).filter((t) => !placements.some((p) => p.k === t.k && p.item) && free(ctx, t, 'raingarden'));
    if (slots.has('save_water')) { reading.push('Rain gardens and a reed bed.'); for (const t of townFree().slice(0, 1)) placements.push({ k: t.k, item: 'raingarden' }); const rb = tilesOf(ctx).find((t) => t.zone === 'meadow' && free(ctx, t, 'reedbed') && neighbours(ctx.terrain.tiles, t).some((n) => sim0.homes.some((h) => h.k === n.k)));
      const rb2 = rb || tilesOf(ctx).find((t) => t.zone === 'wetland' && free(ctx, t, 'reedbed')); if (rb2) placements.push({ k: rb2.k, item: 'reedbed' }); }
    if (slots.has('repair')) { reading.push('A repair café.'); const t = townFree()[0]; if (t) placements.push({ k: t.k, item: 'repair' }); }
    if (slots.has('compost')) { reading.push('A compost hub.'); const t = townFree()[0]; if (t) placements.push({ k: t.k, item: 'compost' }); }
    const after = simulate(ctx.terrain, applyPlacements(ctx.cells, placements)).power;
    const ok = worst ? after.winterSupply / Math.max(1, after.demand) : after.avg / Math.max(1, after.demand);
    const habit = worst ? null : 'typical'; const habitWhy = worst ? '' : 'Florence planned for an average sunny day, not for a still, dark winter night.';
    return { placements, reading, assumptions, habit, habitWhy, tested: worst ? 'a still winter night' : 'an average day', fit: Math.min(1, ok) };
  },

  // ---------- Level 6: complete the town
  heart(slots, ctx) {
    const reading = [], assumptions = [];
    const minutes = ctx.numbers?.minutes || TARGETS.schoolWalk;
    const placements = [];
    const homes = simulate(ctx.terrain, ctx.cells).homes.map((h) => h.k);
    const cand = tilesOf(ctx).filter((t) => free(ctx, t, 'school'));
    let school;
    if (slots.has('walk_time') || slots.has('near_homes')) {
      reading.push(slots.has('walk_time') ? `School within a ${minutes}-minute walk of every home.` : 'School next to the homes.');
      let best = null, bw = Infinity;
      for (const t of cand) { const f = walkField(ctx.terrain, applyPlacements(ctx.cells, [{ k: t.k, item: 'school' }]), [t.k]); const w = Math.max(...homes.map((k) => f.get(k) ?? 99)); if (w < bw) { bw = w; best = t; } }
      school = best;
    } else {
      reading.push('“The middle” = the centre of the island.'); assumptions.push('The middle of the island is the middle of the town.');
      school = cand.reduce((a, b) => (distTo(b, [0, 0]) < distTo(a, [0, 0]) ? b : a));
    }
    if (school) placements.push({ k: school.k, item: 'school' });
    // "within N minutes": if the furthest homes are still too far, lay footpaths (boardwalks over the wetland) along their routes
    if (school && slots.has('walk_time')) {
      for (let guard = 0; guard < 6; guard++) {
        const f = walkField(ctx.terrain, applyPlacements(ctx.cells, placements), [school.k]);
        const far = homes.slice().sort((a, b) => (f.get(b) ?? 0) - (f.get(a) ?? 0))[0]; if (!far || (f.get(far) ?? 0) <= minutes) break;
        let added = 0; for (const k of routeFrom(ctx.terrain, f, far)) { const t = ctx.terrain.tiles.get(k); if (k !== school.k && free(ctx, t, 'path') && !placements.some((p) => p.k === k)) { placements.push({ k, item: 'path' }); added++; } }
        if (!added) break;
      }
      const f = walkField(ctx.terrain, applyPlacements(ctx.cells, placements), [school.k]); const w = Math.max(...homes.map((k) => f.get(k) ?? 99));
      reading.push(w <= minutes ? `Footpaths so every home is within ${minutes} minutes.` : `Footpaths added; the furthest home is ${Math.round(w)} minutes away.`);
    }
    const c = centroid(homes.map((k) => ctx.terrain.tiles.get(k)));
    const townFree = () => townTiles(ctx).filter((t) => !placements.some((p) => p.k === t.k) && free(ctx, t, 'market')).sort((a, b) => distTo(a, c) - distTo(b, c));
    if (slots.has('market')) { reading.push('A market square in the heart of town.'); const t = townFree()[0]; if (t) placements.push({ k: t.k, item: 'market' }); }
    if (slots.has('nature_links')) {
      reading.push('Green bridges linking the wood, hedges and wetland.');
      const links = tilesOf(ctx).filter((t) => free(ctx, t, 'greenbridge') && !placements.some((p) => p.k === t.k) && (t.zone === 'field' || t.zone === 'river') && neighbours(ctx.terrain.tiles, t).some((n) => n.zone === 'wetland' || n.zone === 'wood' || n.hedge)).slice(0, 2);
      for (const t of links) placements.push({ k: t.k, item: 'greenbridge' });
    }
    if (slots.has('safe_route') && school) {
      reading.push('A safe footpath to the school.');
      const f = walkField(ctx.terrain, applyPlacements(ctx.cells, placements), [school.k]);
      const far = homes.slice().sort((a, b) => (f.get(b) ?? 0) - (f.get(a) ?? 0))[0];
      if (far) for (const k of routeFrom(ctx.terrain, f, far)) { const t = ctx.terrain.tiles.get(k); if (k !== school.k && free(ctx, t, 'path') && !placements.some((p) => p.k === k)) placements.push({ k, item: 'path' }); }
    }
    const after = simulate(ctx.terrain, applyPlacements(ctx.cells, placements));
    const fit = slots.has('walk_time') ? Math.min(1, minutes / Math.max(1, after.walkMax)) : 0.92;
    const near = slots.has('walk_time') || slots.has('near_homes');
    const habit = near ? null : 'literal'; const habitWhy = near ? '' : 'Florence read “the middle” as the middle of the island, not the middle of the homes.';
    return { placements, reading, assumptions, habit, habitWhy, tested: near ? 'walking time from every home' : 'distance from the edges of the island', fit };
  },
};

export { key };
