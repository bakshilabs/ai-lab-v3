// Island terrain as pure data (no three.js), so the simulation, planner and tests can run in Node.
// The island is an 18 × 14 grid of 6-voxel tiles. Each tile has a fixed zone and height.

export const T = 6;            // voxels per tile side
export const GW = 18, GH = 14; // grid size in tiles
export const X0 = -54, Z0 = -42;
export const RX = 52, RZ = 40; // island radii in voxels

export const ZONES = {
  river:   { label: 'River',              top: '#5bbcf0' },
  meadow:  { label: 'River meadow',       top: '#8ad86c' },
  wetland: { label: 'Wetland',            top: '#6fbf8a' },
  wood:    { label: 'Old wood',           top: '#5aa646' },
  slope:   { label: 'Sunny slope',        top: '#94d45e' },
  coast:   { label: 'Coast',              top: '#e9d6a1' },
  field:   { label: 'Dry field',          top: '#7ccf55' },
};

// small deterministic hash noise (same family as engine/voxel.js, without three.js)
function hash3(x, y, z) {
  let h = (x * 374761393 + y * 668265263 + z * 2147483647) | 0;
  h = (h ^ (h >>> 13)) * 1274126177;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}
export const rand = (x, y = 0, z = 0) => hash3(x | 0, y | 0, z | 0);
export function noise2(x, z, seed = 1) {
  const xi = Math.floor(x), zi = Math.floor(z), xf = x - xi, zf = z - zi;
  const r = (a, b) => hash3(a, seed, b), s = (t) => t * t * (3 - 2 * t);
  const a = r(xi, zi), b = r(xi + 1, zi), c = r(xi, zi + 1), d = r(xi + 1, zi + 1);
  return a + (b - a) * s(xf) + (c - a) * s(zf) + (a - b - c + d) * s(xf) * s(zf);
}

// Voxel-level island outline (wobbly ellipse). Used for the mesh and for tile membership.
export function insideVoxel(x, z) {
  const a = Math.atan2(z / RZ, x / RX), r = Math.hypot(x / RX, z / RZ);
  const w = 1 + (noise2(Math.cos(a) * 3 + 10, Math.sin(a) * 3 + 10, 77) - 0.5) * 0.12;
  return r <= w;
}
export const riverX = (z) => -39 + 1.6 * Math.sin(z / 9);
export const inRiverVoxel = (x, z) => Math.abs(x + 0.5 - riverX(z)) < 1.8;

export const key = (gx, gz) => gx + ',' + gz;
export const tileOrigin = (gx, gz) => [X0 + gx * T, Z0 + gz * T];
export const tileCenter = (gx, gz) => [X0 + gx * T + T / 2, Z0 + gz * T + T / 2];
export function tileAt(x, z) { const gx = Math.floor((x - X0) / T), gz = Math.floor((z - Z0) / T); return gx >= 0 && gz >= 0 && gx < GW && gz < GH ? [gx, gz] : null; }

function zoneOf(gx, gz) {
  const [cx, cz] = tileCenter(gx, gz);
  // a tile belongs to the island if all four corners are on land
  const [x0, z0] = tileOrigin(gx, gz);
  for (const [x, z] of [[x0, z0], [x0 + T - 1, z0], [x0, z0 + T - 1], [x0 + T - 1, z0 + T - 1]]) if (!insideVoxel(x, z)) return null;
  if (gx === 2) return 'river';
  if (cx < -14) return 'meadow';
  if (Math.hypot(cx / 9, cz / 8) < 1.25) return 'wetland';
  if (cx > 22 && cz < -12) return 'wood';
  if (cz > 24) return 'coast';
  if (cx > 4 && cz > -8) return 'slope';
  return 'field';
}

// Build the immutable terrain description.
export function makeTerrain() {
  const tiles = new Map();
  for (let gx = 0; gx < GW; gx++) for (let gz = 0; gz < GH; gz++) {
    const zone = zoneOf(gx, gz); if (!zone) continue;
    const [cx] = tileCenter(gx, gz);
    const h = zone === 'slope' ? (cx > 28 ? 2 : 1) : 0;
    const hedge = zone === 'field' && (gz === 3 || gz === 5) && gx >= 6 && gx <= 13;
    tiles.set(key(gx, gz), { gx, gz, k: key(gx, gz), zone, h, hedge });
  }
  // fixed features: island school and ferry dock on the coast, nearest the slope
  const coast = [...tiles.values()].filter((t) => t.zone === 'coast').sort((a, b) => a.gx - b.gx);
  const school = coast.find((t) => t.gx >= 11) || coast[coast.length - 1];
  const dock = coast.find((t) => t.gx >= 8 && t !== school) || coast[0];
  if (school) school.fixed = 'oldschool';
  if (dock) dock.fixed = 'dock';
  return { tiles, school: school?.k, dock: dock?.k };
}

export function neighbours(tiles, t) {
  const out = [];
  for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const n = tiles.get(key(t.gx + dx, t.gz + dz)); if (n) out.push(n); }
  return out;
}
