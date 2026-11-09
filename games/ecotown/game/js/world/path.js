// Florence's walking route over the tile grid: A* with 8 neighbours (no corner cutting past a blocked tile),
// then the route is shortened wherever a straight line stays clear. Pure module (tests/path.test.mjs).
// cost(gx, gz) -> number (1 = open ground) or Infinity (blocked). The start and goal tiles are always allowed.

export function findPath(start, goal, cost, { w = 64, h = 64 } = {}) {
  const k = (x, z) => z * w + x; const sk = k(...start), gk = k(...goal);
  if (sk === gk) return [start];
  const c = (x, z) => { if (x < 0 || z < 0 || x >= w || z >= h) return Infinity; const i = k(x, z); return i === sk || i === gk ? 1 : cost(x, z); };
  const hEst = (x, z) => { const dx = Math.abs(x - goal[0]), dz = Math.abs(z - goal[1]); return Math.max(dx, dz) + (Math.SQRT2 - 1) * Math.min(dx, dz); };
  const g = new Map([[sk, 0]]), from = new Map(), open = [[hEst(...start), sk]], done = new Set();
  while (open.length) {
    let bi = 0; for (let i = 1; i < open.length; i++) if (open[i][0] < open[bi][0]) bi = i;
    const [, cur] = open.splice(bi, 1)[0]; if (done.has(cur)) continue; done.add(cur);
    if (cur === gk) { const out = []; let n = gk; while (n != null) { out.push([n % w, Math.floor(n / w)]); n = from.get(n); } return out.reverse(); }
    const cx = cur % w, cz = Math.floor(cur / w);
    for (let dx = -1; dx <= 1; dx++) for (let dz = -1; dz <= 1; dz++) {
      if (!dx && !dz) continue; const nx = cx + dx, nz = cz + dz; const step = c(nx, nz); if (!isFinite(step)) continue;
      if (dx && dz && (!isFinite(c(cx + dx, cz)) || !isFinite(c(cx, cz + dz)))) continue; // never squeeze between two blocked corners
      const ng = g.get(cur) + step * (dx && dz ? Math.SQRT2 : 1); const nk = k(nx, nz);
      if (ng < (g.get(nk) ?? Infinity)) { g.set(nk, ng); from.set(nk, cur); open.push([ng + hEst(nx, nz), nk]); }
    }
  }
  return null;
}

// world-space waypoints: drop corners whenever the straight line between two route points crosses only open tiles.
// clear(x, z) -> true when the point is on walkable ground.
export function smooth(points, clear, step = 0.75) {
  if (points.length <= 2) return points;
  const ok = (a, b) => { const d = Math.hypot(b[0] - a[0], b[1] - a[1]); const n = Math.ceil(d / step); for (let i = 1; i < n; i++) { const t = i / n; if (!clear(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t)) return false; } return true; };
  const out = [points[0]]; let i = 0;
  while (i < points.length - 1) { let j = points.length - 1; while (j > i + 1 && !ok(points[i], points[j])) j--; out.push(points[j]); i = j; }
  return out;
}
