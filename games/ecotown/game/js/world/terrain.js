// Island terrain as pure data (no three.js), so the simulation, planner and tests can run in Node.
// The island is an 18 × 14 grid of 6-voxel tiles. Each tile has a fixed zone and height.

export const T = 6;            // voxels per tile side
export const GW = 14, GH = 11; // grid size in tiles (compact, dense island)
export const X0 = -42, Z0 = -33;
export const TRX = 41, TRZ = 32; // tile area radii in voxels (where the town can be built)
export const RX = 49, RZ = 39;   // full island outline radii (tile area + the wild rim belt)

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

// Tile area: the buildable part of the island. Tile membership uses this, so the game grid never changes.
export function insideTileArea(x, z) {
  const a = Math.atan2(z / TRZ, x / TRX), r = Math.hypot(x / TRX, z / TRZ);
  const w = 1 + (noise2(Math.cos(a) * 3 + 10, Math.sin(a) * 3 + 10, 77) - 0.5) * 0.12;
  return r <= w;
}
// Full island outline for the mesh: bigger and more ragged, with a few notches.
// Headlands (art pass): the outline swells in three places so the silhouette is not one oval hugging the grid:
// a deep shelf behind the mesas (north-east), a headland beyond the front gorge (south-east) and the old oak's
// point (west). Each is cut off to exactly zero away from its centre, so the river's two ends and the bridge
// landing (east, angle 0) sit where they always did.
const LOBES = [[-0.95, 0.48, 0.36], [0.8, 0.2, 0.14], [2.92, 0.2, 0.1], [1.52, 0.16, 0.05]]; // [angle, width, how far out]
function lobe(a) { let w = 0; for (const [a0, s, k] of LOBES) { const d = Math.abs(a - a0); if (d < s * 1.8) w += k * Math.exp(-(d / s) * (d / s)); } return w; }
export function insideVoxel(x, z) {
  const a = Math.atan2(z / RZ, x / RX), r = Math.hypot(x / RX, z / RZ);
  const w = 1 + (noise2(Math.cos(a) * 4 + 3, Math.sin(a) * 4 + 3, 91) - 0.5) * 0.2 + (noise2(Math.cos(a) * 11, Math.sin(a) * 11, 13) - 0.5) * 0.07 + lobe(a);
  return r <= w || insideTileArea(x, z);
}
// The mesas: flat-topped terracotta buttes that rise in sheer benches (ledges), not one rounded lump.
// [centre x, centre z, radius x, radius z, [[edge, height], …] from the foot inwards, seed]
const BUTTES = [
  [24, -38, 15, 9.5, [[1, 8], [0.82, 15], [0.6, 22]], 12],   // the big mesa behind the wood
  [3, -39.5, 8, 4.4, [[1, 6], [0.6, 11]], 14],                   // its lower neighbour to the west
  [42.5, -21.5, 3, 3, [[1, 9], [0.6, 15]], 16],                   // a tower east of the gorge
  [-45, 15, 3.4, 3.1, [[1, 7], [0.66, 12]], 31], [-43, -20, 2.9, 2.6, [[1, 6], [0.62, 10]], 32],
  [45, -4, 3.3, 3, [[1, 8], [0.62, 13]], 33], [43, 18, 2.8, 2.5, [[1, 6], [0.62, 10]], 34], [37.5, 30.5, 2.6, 2.4, [[1, 5], [0.55, 9]], 35],
];
// Height of the mesa at a point (0 = no mesa here), and whether the point is on a mesa's scree foot.
export function mesaAt(x, z) {
  let h = 0;
  for (const [cx, cz, rx, rz, levels, seed] of BUTTES) {
    const d0 = Math.hypot((x - cx) / rx, (z - cz) / rz); if (d0 > 1.5) continue;
    // ragged walls: broad bays plus narrow flutes, the same on every bench so the cliffs line up as buttresses
    const d = d0 + (noise2(x / 4.5, z / 4.5, seed) - 0.5) * 0.3 + (noise2(x / 1.7, z / 1.7, seed + 1) - 0.5) * 0.12;
    for (const [edge, lh] of levels) if (d < edge) h = Math.max(h, lh);
    if (d >= levels[0][0] && d < levels[0][0] + 0.3) h = Math.max(h, Math.round((levels[0][0] + 0.3 - d) / 0.3 * 3)); // scree at the foot
  }
  // the ledge that joins the two big mesas: a tarn on it feeds the waterfall
  if (z < -30.5 && x > 2 && x < 22 && Math.abs(z + 35) < 4.2 + noise2(x / 4, z / 4, 15) * 1.2) h = Math.max(h, 8);
  return h;
}
export const TARN = { x: 12.5, z: -34, r: 2.3, h: 8 };
// Height of the wild rim belt (0 inside the tile area): terraced hills, higher at the back (north/east)
// and low at the front (south coast), so the town stays in view from the default camera.
export function rimHeight(x, z, hillScale = 1) { // hillScale: how high this island's rim hills stand (the mesas keep their height)
  if (insideTileArea(x, z)) return 0;
  const rIn = Math.hypot(x / TRX, z / TRZ);
  const t = Math.max(0, Math.min(1, (rIn - 1) / ((RX / TRX) - 1)));            // 0 at the tile edge → 1 at the outline
  const back = Math.max(0, Math.min(1, 0.45 - z / 34 + x / 160));              // north/back of the island
  const hills = noise2(x / 8, z / 8, 5) * 0.65 + noise2(x / 3.5, z / 3.5, 6) * 0.35;
  let h = ((1.5 + back * 7) * hills * Math.min(1, t * 2.4) + back * 2 * t) * hillScale;
  if (h >= 3) h = Math.round(h / 2) * 2;                                       // the higher hills step up in terraces
  const mesa = mesaAt(x, z) * Math.min(1, t * 3 + 0.34);                       // mesas never crowd the town edge
  return Math.max(0, Math.round(h), Math.round(mesa));
}
// Canyons: deep gorges carved through the rim (never into the tile area). Returns how far below the rim top
// the floor is cut (0 = no canyon). Gorge 1 runs from the massif east to the island edge; gorge 2 cuts the west rim.
export function canyonDepth(x, z) {
  if (insideTileArea(x, z)) return 0;
  const c1 = Math.abs(x - (37 + 2 * Math.sin(z / 5))); const w1 = z < -12 ? Math.max(0, 1 - c1 / 3.5) : 0; // east of the massif, so it stays one mass
  const c2 = Math.abs(x - (-45 + 2.5 * Math.sin(z / 5))); const w2 = z < -6 && z > -30 ? Math.max(0, 1 - c2 / 2.2) : 0;
  const c3 = Math.abs(x - (30 + 3 * Math.sin(z / 4))); const w3 = z > 14 ? Math.max(0, 1 - c3 / 3.8) : 0;
  const w = Math.max(w1, w2, w3); if (w <= 0) return 0;
  return Math.round((4 + w * 14) / 3) * 3; // stepped walls (benches), not one sheer face
}
export const isLimestone = (x, z, h) => h >= 4 && mesaAt(x, z) >= 5;
export const riverX = (z) => -27 + 1.4 * Math.sin(z / 7);
// The river is a closed system on the island: it rises at a spring pool under a rock outcrop at the back
// and ends in a lagoon behind the beach at the front, so no water pours off the floating island.
const riverEnds = (() => { let n = 0, s = 0; for (let z = -RZ - 4; z <= RZ + 4; z++) if (insideVoxel(Math.round(riverX(z)), z)) { if (!n) n = z; s = z; } return { n, s }; })();
export const SPRING = { x: riverX(riverEnds.n + 7), z: riverEnds.n + 7, r: 3.6 };
export const LAGOON = { x: riverX(riverEnds.s - 8) - 1, z: riverEnds.s - 8, r: 5.2 };
export function inRiverVoxel(x, z) {
  const cx = x + 0.5;
  if (Math.hypot(cx - SPRING.x, (z - SPRING.z) * 1.15) < SPRING.r) return true;
  if (Math.hypot((cx - LAGOON.x) * 0.85, z - LAGOON.z) < LAGOON.r) return true;
  return z > SPRING.z && z < LAGOON.z && Math.abs(cx - riverX(z)) < 1.8;
}

export const key = (gx, gz) => gx + ',' + gz;
export const tileOrigin = (gx, gz) => [X0 + gx * T, Z0 + gz * T];
export const tileCenter = (gx, gz) => [X0 + gx * T + T / 2, Z0 + gz * T + T / 2];
export function tileAt(x, z) { const gx = Math.floor((x - X0) / T), gz = Math.floor((z - Z0) / T); return gx >= 0 && gz >= 0 && gx < GW && gz < GH ? [gx, gz] : null; }

// Zone of a point (tile centre or voxel). Shared by the simulation and the mesh.
export function zoneAt(cx, cz) {
  if (cx < -11) return 'meadow';
  if (Math.hypot(cx / 7, cz / 6) < 1.25) return 'wetland';
  if (cx > 17 && cz < -9) return 'wood';
  if (cz > 17) return 'coast';
  if (cx > 3 && cz > -7) return 'slope';
  return 'field';
}
// ---- More islands (best-seller plan, stage 3). A layout changes only what the land IS (zone, height, hedges) and how
// high the wild rim stands. The tile grid, the river column, the outline, the mesas and the three fixed tiles are the
// same on every island, so the bridge, the camera and the mesh code need nothing special. 'home' is the first island
// and must never change (tests/islands.test.mjs hashes its tile list).
//   delta: a river delta. Flood meadow and a big marsh; one low bank of dry ground in the east.
//   hills: hill country. A big old wood on high ground, terraced slopes, a long beach; one small strip of flat field.
function zoneDelta(cx, cz) {
  if (cx < -11) return 'meadow';
  if (cz > 17) return 'coast';
  if (cx > 5 && cz < -15) return 'wood';
  if (cx > 18 && cz < 10) return cx > 24 ? 'slope' : 'field';
  if (Math.hypot((cx - 1) / 14, (cz + 3) / 12) < 1) return 'wetland';
  return 'meadow';
}
function zoneHills(cx, cz) {
  if (cz > 11 || cx + cz > 36) return 'coast';
  if (cx < -18) return 'meadow';
  if (Math.hypot((cx + 12) / 7, (cz - 3) / 6) < 1) return 'wetland';
  if (cx < -12) return 'field';
  if (cz < -9) return 'wood';
  return 'slope';
}
const FIXED = { school: '9,8', dock: '5,8', lab: '10,9' }; // where the home island's rule puts them
export const LAYOUTS = {
  home: { id: 'home', name: 'Home Island', icon: '🏝', rim: 1, zoneAt },
  delta: { id: 'delta', name: 'Delta Island', icon: '💧', rim: 0.45, zoneAt: zoneDelta,
    height: (zone, gx, gz, n) => (zone === 'slope' ? 1 + (gx >= 12 ? 1 : 0) : zone === 'field' ? 1 : zone === 'wood' ? 2 + (n > 0.5 ? 1 : 0) : 0),
    hedge: (zone, gx, gz) => zone === 'meadow' && gz <= 2 && gx >= 4 }, // old hedgerows on the north meadow, away from the scarce dry bank
  hills: { id: 'hills', name: 'Hill Island', icon: '⛰', rim: 1.4, zoneAt: zoneHills,
    height: (zone, gx, gz, n) => (zone === 'slope' ? 1 + (gz <= 4 ? 1 : 0) + (gx >= 9 ? 1 : 0) + (n > 0.62 ? 1 : 0) : zone === 'wood' ? 4 + (n > 0.5 ? 1 : 0) : zone === 'field' ? 1 + (gz <= 1 ? 1 : 0) : 0),
    hedge: (zone) => zone === 'field' },
};
export const ISLANDS = Object.keys(LAYOUTS);
export const islandId = (v) => (ISLANDS.includes(v) ? v : 'home');
function zoneOf(gx, gz, zAt = zoneAt) {
  const [cx, cz] = tileCenter(gx, gz);
  const [x0, z0] = tileOrigin(gx, gz);
  for (const [x, z] of [[x0, z0], [x0 + T - 1, z0], [x0, z0 + T - 1], [x0 + T - 1, z0 + T - 1]]) if (!insideTileArea(x, z)) return null;
  if (gx === 2) return 'river';
  return zAt(cx, cz);
}

// Build the immutable terrain description. layout: 'home' (default), 'delta' or 'hills'.
export function makeTerrain(layout = 'home') {
  const L = LAYOUTS[islandId(layout)]; const home = L.id === 'home';
  const tiles = new Map();
  for (let gx = 0; gx < GW; gx++) for (let gz = 0; gz < GH; gz++) {
    const zone = zoneOf(gx, gz, L.zoneAt); if (!zone) continue;
    const [cx] = tileCenter(gx, gz);
    const n = noise2(gx / 2.3, gz / 2.3, 21);
    const h = !home ? L.height(zone, gx, gz, n) : zone === 'slope' ? 1 + (cx > 14 ? 1 : 0) + (n > 0.62 ? 1 : 0) : zone === 'wood' ? 3 + (n > 0.5 ? 1 : 0) : zone === 'field' ? 1 + (n > 0.58 ? 1 : 0) + (gz <= 1 ? 1 : 0) : 0;
    const hedge = !home ? L.hedge(zone, gx, gz) : zone === 'field' && (gz === 2 || gz === 4) && gx >= 4 && gx <= 11;
    tiles.set(key(gx, gz), { gx, gz, k: key(gx, gz), zone, h, hedge });
  }
  // fixed features: island school and ferry dock on the coast, nearest the slope
  const coast = [...tiles.values()].filter((t) => t.zone === 'coast').sort((a, b) => a.gx - b.gx);
  let school, dock, lab;
  if (home) {
    school = coast.find((t) => t.gx >= 9) || coast[coast.length - 1];
    dock = coast.find((t) => t.gx >= 5 && t.gx < 9 && t !== school) || coast[0];
  } else { school = tiles.get(FIXED.school); dock = tiles.get(FIXED.dock); } // the other islands keep them on the same tiles
  if (school) school.fixed = 'oldschool';
  if (dock) dock.fixed = 'dock';
  // Florence's AI Lab: on the coast beside the old school, where she walks in to start a mission
  if (home) lab = coast.find((t) => school && t.gx === school.gx + 1 && t.gz === school.gz + 1) || coast.find((t) => !t.fixed && t.gx > (school?.gx ?? 0));
  else lab = tiles.get(FIXED.lab);
  if (lab) lab.fixed = 'ailab';
  return { tiles, school: school?.k, dock: dock?.k, lab: lab?.k, layout: L.id, name: L.name, rim: L.rim, zoneAt: L.zoneAt };
}

export function neighbours(tiles, t) {
  const out = [];
  for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const n = tiles.get(key(t.gx + dx, t.gz + dz)); if (n) out.push(n); }
  return out;
}
