// Step-free access check (Level 2 onwards): follow the walking route from the town to the school
// gate and to the ferry, tile by tile, and report what a wheelchair user, a child with a buggy or an
// older resident would meet on the way. Pure and deterministic, like sim.js.
import { ITEMS } from '../world/catalog.js';
import { neighbours } from '../world/terrain.js';
import { cellOf, walkField, routeFrom } from './sim.js';

const SMOOTH = new Set(['path', 'cycle', 'tram', 'bridge', 'greenbridge']);

function routeTo(terrain, cells, destKey) {
  const tiles = [...terrain.tiles.values()];
  const town = tiles.filter((t) => cellOf(cells, t.k).mark === 'town');
  if (!destKey || !town.length) return null;
  const f = walkField(terrain, cells, [destKey]);
  const start = town.reduce((a, b) => ((f.get(a.k) ?? 99) <= (f.get(b.k) ?? 99) ? a : b));
  // the route leaves the town at its nearest tile; the streets inside the town count as step-free
  const keys = routeFrom(terrain, f, start.k);
  const out = { keys, busy: [], rough: [], steep: [], minutes: Math.round(f.get(start.k) ?? 99) };
  for (let i = 0; i < keys.length; i++) {
    const t = terrain.tiles.get(keys[i]); const c = cellOf(cells, keys[i]); const it = c.item && ITEMS[c.item];
    if (t.fixed || c.mark === 'town' && !it?.car) { /* school gate, dock, town streets */ }
    else if (it?.car) out.busy.push(keys[i]);
    else if (!SMOOTH.has(c.item)) out.rough.push(keys[i]);
    const prev = i ? terrain.tiles.get(keys[i - 1]) : null;
    // a big step in height with no graded footpath or cycle lane: too steep for a wheelchair
    if (prev && Math.abs((t.h || 0) - (prev.h || 0)) >= 2 && !SMOOTH.has(c.item) && !SMOOTH.has(cellOf(cells, prev.k).item)) out.steep.push(keys[i]);
  }
  out.ok = !out.busy.length && !out.rough.length && !out.steep.length;
  return out;
}

export function accessCheck(terrain, cells) {
  const school = routeTo(terrain, cells, terrain.school);
  const ferry = routeTo(terrain, cells, terrain.dock);
  // the ferry is step-free when the tile you reach it from has a footpath (a ramp onto the boat)
  const dock = terrain.tiles.get(terrain.dock);
  const ramp = !!dock && neighbours(terrain.tiles, dock).some((n) => SMOOTH.has(cellOf(cells, n.k).item) || cellOf(cells, n.k).mark === 'town');
  const problems = (r) => (r ? r.busy.length + r.rough.length + r.steep.length : 0);
  return { school, ferry, ramp, ok: !!school && !!ferry && school.ok && ferry.ok && ramp, issues: problems(school) + problems(ferry) + (ramp ? 0 : 1) };
}
