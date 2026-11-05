// The honest town model. Pure and deterministic: lenses, bubbles, wildlife, window lights and the
// town flower all read from this. Only the AI helper is ever wrong; this never is.
import { ITEMS, TARGETS } from '../world/catalog.js';
import { key, neighbours } from '../world/terrain.js';

export const PETALS = ['homes', 'food', 'nature', 'health', 'energy', 'community', 'carbon'];
const HEDGE_SAFE = new Set(['mixed', 'orchard', 'hives', 'hedge', 'path', 'cycle', 'park', 'allot', 'greenbridge']);

export function emptyCell() { return { mark: null, item: null, mods: [], locked: false }; }

// cells: Map key -> cell. Missing cells are empty.
export function cellOf(cells, k) { return cells.get(k) || emptyCell(); }

function isHome(c) { return c.item && ITEMS[c.item].home; }

// Dijkstra walking minutes from a set of destination tiles to every tile.
export function walkField(terrain, cells, destKeys) {
  const dist = new Map(); const q = [];
  for (const k of destKeys) if (terrain.tiles.has(k)) { dist.set(k, 0); q.push([0, k]); }
  const cost = (t) => {
    const c = cellOf(cells, t.k); const it = c.item && ITEMS[c.item];
    if (t.zone === 'river') return it && (c.item === 'bridge' || c.item === 'greenbridge') ? 1 : Infinity;
    if (it && it.walk) return it.walk;
    if (t.zone === 'wetland') return 6;
    if (t.zone === 'wood') return 4;
    return 3;
  };
  while (q.length) {
    q.sort((a, b) => a[0] - b[0]); const [d, k] = q.shift();
    if (d > dist.get(k)) continue;
    const t = terrain.tiles.get(k);
    for (const n of neighbours(terrain.tiles, t)) {
      const nd = d + cost(t) / 2 + cost(n) / 2;
      if (nd < (dist.get(n.k) ?? Infinity)) { dist.set(n.k, nd); q.push([nd, n.k]); }
    }
  }
  return dist;
}

// Walking route (list of tile keys) from a tile to the nearest destination, following the field.
export function routeFrom(terrain, field, startKey) {
  const out = [startKey]; let k = startKey; let guard = 60;
  while (guard-- > 0 && field.get(k) > 0) {
    const t = terrain.tiles.get(k); let best = null;
    for (const n of neighbours(terrain.tiles, t)) if ((field.get(n.k) ?? Infinity) < (best ? field.get(best) : field.get(k))) best = n.k;
    if (!best) break; out.push(best); k = best;
  }
  return out;
}

export function simulate(terrain, cells, extra = {}) {
  const tiles = [...terrain.tiles.values()];
  const R = { homes: [], families: 0, familiesSafe: 0, flooded: 0, townFlooded: 0, townTiles: 0, townOnWood: 0, townOnWetland: 0 };
  let homesCarbon = 0, carbon = 0, food = 0, nature = 0, health = 5, community = 0;
  let avg = 0, winter = 0, store = 0, demand = 0, gen = 0;
  const count = {}; let hedges = 0, woodIntact = 0, meadowIntact = 0, wetIntact = 0, temps = [];
  const schools = [];

  for (const t of tiles) {
    const c = cellOf(cells, t.k); const it = c.item && ITEMS[c.item];
    if (c.mark === 'town') { R.townTiles++; if (t.zone === 'meadow' || t.zone === 'wetland') R.townFlooded++; if (t.zone === 'wood') R.townOnWood++; if (t.zone === 'wetland') R.townOnWetland++; }
    if (it) count[c.item] = (count[c.item] || 0) + 1;
    if (t.fixed === 'oldschool') schools.push(t.k);
    if (c.item === 'school') schools.unshift(t.k);
    // habitats left intact
    const used = !!it || c.mark === 'town';
    if (t.zone === 'wood' && !used) woodIntact++;
    if (t.zone === 'meadow' && !used) meadowIntact++;
    if (t.zone === 'wetland' && (!used || c.item === 'reedbed' || c.item === 'greenbridge')) wetIntact++;
    if (t.hedge && (!it || HEDGE_SAFE.has(c.item))) hedges++;
    if (c.item === 'hedge') hedges++;
    if (c.mark === 'wild') nature += 0.5;
    if (!it) continue;
    carbon += it.carbon || 0; nature += it.nature || 0; health += it.health || 0; community += it.community || 0;
    food += it.food || 0; avg += it.avg || 0; winter += it.winter || 0; store += it.store || 0; demand += it.demand || 0; gen += it.avg || 0;
    if (it.home) {
      const drained = neighbours(terrain.tiles, t).some((n) => { const nc = cellOf(cells, n.k); return nc.item && ITEMS[nc.item].drains; });
      const flooded = (t.zone === 'meadow' && !drained) || t.zone === 'wetland';
      let temp = it.temp; let emb = it.embodied; let gas = 3;
      for (const m of c.mods) { const mi = ITEMS[m]; emb += mi.embodied || 0; nature += mi.nature || 0; avg += mi.avg || 0; gen += mi.avg || 0; winter += mi.winter || 0; carbon += mi.carbon || 0; demand += mi.demand || 0; if (m === 'greenroof') temp += 1; if (m === 'heatpump') gas = 0; }
      demand += 1; homesCarbon += emb; carbon += emb + gas; temps.push(temp);
      R.families += it.families; if (!flooded) R.familiesSafe += it.families; else R.flooded++;
      R.homes.push({ k: t.k, item: c.item, families: it.families, flooded, temp, gas: gas > 0 });
    }
  }
  // pollination: crops next to beehives yield one extra food each
  for (const t of tiles) {
    const c = cellOf(cells, t.k); if (!c.item || !ITEMS[c.item].pollinated) continue;
    if (neighbours(terrain.tiles, t).some((n) => cellOf(cells, n.k).item === 'hives')) food += 1;
  }
  nature += woodIntact * 2 + meadowIntact * 1 + wetIntact * 2 + hedges * 1;

  // power: on a still winter night only wind (weakly) and stored energy help
  const anyGen = gen > 0;
  const winterSupply = winter + (anyGen ? store : 0);
  R.power = { avg, winterSupply, demand, avgOK: R.homes.length > 0 && avg >= demand, winterOK: R.homes.length > 0 && winterSupply >= demand };

  // walking to school and to daily needs
  const homeKeys = R.homes.map((h) => h.k);
  const schoolKey = schools[0];
  R.schoolKey = schoolKey;
  const sField = schoolKey ? walkField(terrain, cells, [schoolKey]) : new Map();
  R.walk = {};
  for (const k of homeKeys) R.walk[k] = Math.round(sField.get(k) ?? 99);
  const w = Object.values(R.walk);
  R.walkAvg = w.length ? Math.round(w.reduce((a, b) => a + b, 0) / w.length) : 0;
  R.walkMax = w.length ? Math.max(...w) : 0;
  const needKeys = tiles.filter((t) => ['market', 'allot', 'hall'].includes(cellOf(cells, t.k).item)).map((t) => t.k);
  const nField = needKeys.length ? walkField(terrain, cells, needKeys) : null;
  R.needsMax = nField && homeKeys.length ? Math.max(...homeKeys.map((k) => nField.get(k) ?? 99)) : 99;

  // crossings: car tiles at the school gate or on the children's walking route
  let unsafe = 0; const unsafeKeys = new Set();
  const oldSchool = tiles.find((t) => t.fixed === 'oldschool');
  if (oldSchool) {
    for (const n of neighbours(terrain.tiles, oldSchool)) if (ITEMS[cellOf(cells, n.k).item]?.car) unsafeKeys.add(n.k);
    const f = walkField(terrain, cells, [oldSchool.k]);
    const town = tiles.filter((t) => cellOf(cells, t.k).mark === 'town');
    if (town.length) {
      const start = town.reduce((a, b) => ((f.get(a.k) ?? 99) <= (f.get(b.k) ?? 99) ? a : b));
      for (const k of routeFrom(terrain, f, start.k)) if (ITEMS[cellOf(cells, k).item]?.car) unsafeKeys.add(k);
    }
  }
  unsafe = unsafeKeys.size;
  R.unsafeCrossings = unsafe; R.unsafeKeys = [...unsafeKeys];
  const cars = (count.road || 0) + (count.carpark || 0);

  // health and community
  const avgTemp = temps.length ? temps.reduce((a, b) => a + b, 0) / temps.length : 20;
  health += (avgTemp >= 18 ? 2 : -2) - R.flooded - unsafe + (R.homes.length && R.walkAvg <= 10 ? 2 : 0) + (count.path || 0) * 0.5;
  community += schoolKey && schools.length > 1 ? 2 : 0;

  const need = Math.max(13, Math.ceil(R.families / 3));
  const natureStart = extra.natureStart || natureBaseline(terrain);
  R.count = count; R.hedges = hedges; R.woodIntact = woodIntact; R.meadowIntact = meadowIntact; R.wetIntact = wetIntact;
  R.homesCarbon = homesCarbon; R.carbon = Math.round(carbon); R.food = food; R.foodNeed = need; R.nature = Math.round(nature * 10) / 10; R.natureStart = natureStart;
  R.health = health; R.community = community; R.avgTemp = Math.round(avgTemp); R.cars = cars;
  R.species = {
    deer: woodIntact >= 7 && hedges >= 4,
    bees: (hedges >= 4 || (count.hives || 0) >= 1) && (meadowIntact >= 6 || (count.orchard || 0) >= 2 || (count.hives || 0) >= 2),
    otters: wetIntact >= 9,
    birds: woodIntact >= 5 || hedges >= 5,
    frogs: wetIntact >= 6 || (count.reedbed || 0) >= 1,
  };
  const ceil = TARGETS.carbonCeiling;
  R.petals = {
    homes: R.familiesSafe / TARGETS.families,
    food: food / need,
    nature: nature / (0.7 * natureStart),
    health: health / 9,
    energy: R.homes.length ? winterSupply / demand : 0,
    community: community / 8,
    carbon: carbon <= ceil ? 1 + 0.5 * (ceil - carbon) / ceil : ceil / carbon,
  };
  for (const p of PETALS) R.petals[p] = Math.max(0, Math.min(1.5, R.petals[p]));
  R.title = townTitle(R.petals);
  return R;
}

let _baseline = null;
export function natureBaseline(terrain) {
  if (_baseline && _baseline.t === terrain) return _baseline.v;
  const r = simulate(terrain, new Map(), { natureStart: 1 });
  _baseline = { t: terrain, v: r.nature }; return r.nature;
}

const ADJ = { homes: 'Hearth', food: 'Orchard', nature: 'Wild Garden', health: 'Cycle', energy: 'Windmill', community: 'Market', carbon: 'Green Leaf' };
const NOUN = { homes: 'Village', food: 'Valley', nature: 'Meadows', health: 'Town', energy: 'Hill', community: 'Square', carbon: 'Vale' };
export function townTitle(p) {
  const top = PETALS.slice().sort((a, b) => p[b] - p[a]);
  return `${ADJ[top[0]]} ${NOUN[top[1]]}`;
}

export { key };
