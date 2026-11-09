// Florence's "good spots": where a build would actually help the town, so an empty island isn't a guessing game.
// Pure module (tests/spots.test.mjs). goodSpots(tool, ctx) -> { keys: [tile keys, best first], why: {type, ...} }
//   ctx.tiles: Map k -> {k, gx, gz, zone, fixed}; ctx.cells: Map k -> {item, mark, mods}; ctx.items: the catalog;
//   ctx.ok(k): true when a tap with `tool` on k would build on a free tile (no swap); ctx.bridge: the tile beside the
//   bridge to the mainland (optional).
import { findPath } from '../world/path.js';

const LINK = new Set(['path', 'cycle', 'tram']);
const DEST = { school: 'school', market: 'market', hall: 'hall' };
const FARM = new Set(['bigfield', 'mixed', 'orchard', 'hives', 'hedge']);
const SERVICE = new Set(['wind', 'battery', 'raingarden', 'reedbed']);
const ROUTE = new Set(['road', 'path', 'cycle', 'tram', 'bridge', 'greenbridge']);
const xy = (k) => k.split(',').map(Number);
const cheb = (a, b) => { const [ax, az] = xy(a), [bx, bz] = xy(b); return Math.max(Math.abs(ax - bx), Math.abs(az - bz)); };

export function goodSpots(tool, { tiles, cells, items, ok, bridge = null, max = 3 }) {
  const it = items[tool]; if (!it) return { keys: [], why: null };
  const all = [...tiles.keys()]; const cell = (k) => cells.get(k) || {};
  const homes = all.filter((k) => items[cell(k).item]?.home);
  const town = all.filter((k) => cell(k).mark === 'town' || cell(k).item);
  let free = all.filter((k) => ok(k));
  // homes and town buildings can now go straight onto open land (the tap marks it as town land), but a good spot is
  // still town land the player chose, or dry ground if none is free: never the flood meadow, the wood or the beach
  if (it.on?.includes('town')) { const marked = free.filter((k) => cell(k).mark === 'town'); const dry = free.filter((k) => ['slope', 'field'].includes(tiles.get(k)?.zone)); free = marked.length ? marked : dry.length ? dry : free; }
  const centre = (keys) => { if (!keys.length) return null; let x = 0, z = 0; for (const k of keys) { const [a, b] = xy(k); x += a; z += b; } return [x / keys.length, z / keys.length]; };
  const distTo = (c) => (k) => { const [a, b] = xy(k); return Math.hypot(a - c[0], b - c[1]); };
  const byNear = (keys, c) => [...keys].sort((a, b) => distTo(c)(a) - distTo(c)(b));

  // paths, cycle lanes and trams: a route from the homes to somewhere people go
  if (LINK.has(tool)) {
    if (!homes.length) return { keys: [], why: { type: 'needHomes' } };
    const dests = [];
    if (bridge && tiles.has(bridge)) dests.push({ k: bridge, to: 'bridge' });
    for (const k of all) { const d = DEST[cell(k).item]; if (d) dests.push({ k, to: d }); else if (tiles.get(k).fixed === 'oldschool') dests.push({ k, to: 'oldschool' }); }
    if (!dests.length) return { keys: [], why: { type: 'needPlace' } };
    // cycle lanes prefer the bridge to the mainland (somewhere to ride to); otherwise the nearest place
    const c = centre(homes); const ranked = [...dests].sort((a, b) => (tool === 'cycle' ? (b.to === 'bridge') - (a.to === 'bridge') : 0) || distTo(c)(a.k) - distTo(c)(b.k));
    const W = Math.max(...all.map((k) => xy(k)[0])) + 1, H = Math.max(...all.map((k) => xy(k)[1])) + 1;
    const cost = (gx, gz) => { const k = gx + ',' + gz; if (!tiles.has(k)) return Infinity; if (ok(k)) return 1; return ROUTE.has(cell(k).item) ? 0.6 : Infinity; };
    let linked = null; // a place the homes already reach: try the next one
    for (const d of ranked) {
      const from = byNear(homes, xy(d.k))[0]; const route = findPath(xy(from), xy(d.k), cost, { w: W, h: H });
      if (!route) continue;
      const keys = route.map(([x, z]) => x + ',' + z).filter((k) => k !== from && k !== d.k && ok(k));
      if (keys.length) return { keys: keys.slice(0, Math.max(max, 4)), why: { type: 'link', to: d.to } };
      linked = linked || d.to;
    }
    return { keys: [], why: linked ? { type: 'linked', to: linked } : { type: 'needPlace' } };
  }
  if (!free.length) return { keys: [], why: null };
  // homes: next to the other homes (or on town land beside the lab and old school when there are none yet)
  if (it.home) {
    const anchor = homes.length ? homes : town.length ? town : all.filter((k) => tiles.get(k).fixed);
    const score = (k) => -anchor.filter((h) => cheb(h, k) <= 1).length + distTo(centre(anchor))(k) * 0.05;
    return { keys: [...free].sort((a, b) => score(a) - score(b)).slice(0, max), why: { type: homes.length ? 'besideHomes' : 'firstHomes' } };
  }
  // town land: dry ground beside the town so far; keep wild: the meadow, the wood and the wetland, where the wildlife lives
  if (tool === 'town') { const dry = free.filter((k) => ['slope', 'field'].includes(tiles.get(k)?.zone)); const c = centre(town.length ? town : all.filter((k) => tiles.get(k).fixed)) || [0, 0]; return { keys: byNear(dry.length ? dry : free, c).slice(0, max), why: { type: 'nearTown' } }; }
  if (tool === 'wild') { const wildish = free.filter((k) => ['meadow', 'wood', 'wetland'].includes(tiles.get(k)?.zone)); if (wildish.length) return { keys: byNear(wildish, centre(wildish)).slice(0, max), why: { type: 'wild' } }; }
  if (!homes.length && !FARM.has(tool)) return { keys: byNear(free, centre(town.length ? town : all.filter((k) => tiles.get(k).fixed)) || [0, 0]).slice(0, max), why: { type: 'nearTown' } };
  // the school: in the middle of the homes, so no walk is too long
  if (tool === 'school') {
    const worst = (k) => Math.max(...homes.map((h) => cheb(h, k)));
    return { keys: [...free].sort((a, b) => worst(a) - worst(b) || distTo(centre(homes))(a) - distTo(centre(homes))(b)).slice(0, max), why: { type: 'middle' } };
  }
  // farms: close to the homes but off the town land
  if (FARM.has(tool)) {
    const c = centre(homes.length ? homes : town.length ? town : all);
    const keys = byNear(free.filter((k) => cell(k).mark !== 'town'), c); return { keys: (keys.length ? keys : byNear(free, c)).slice(0, max), why: { type: 'farm' } };
  }
  // everything else people use (parks, markets, halls, allotments…): where the most homes are within a short walk
  const near = (k) => homes.filter((h) => cheb(h, k) <= 2).length;
  const keys = [...free].sort((a, b) => near(b) - near(a) || distTo(centre(homes))(a) - distTo(centre(homes))(b)).slice(0, max);
  // wind, batteries and drains are not places people walk to: the reason is the homes they serve
  return { keys, why: SERVICE.has(tool) ? { type: 'service' } : { type: 'nearHomes', n: near(keys[0]) } };
}
