// Voxel builders for every placeable item, mark, decoration and fixed feature.
// Each tile is drawn as two layers:
//   G: a "ground" layer on a 12×12 half-voxel grid that sits just above the grass (roads, crops, paving);
//   B: a "build" layer on the 6×6 full-voxel grid standing on the tile (houses, trees, turbines).
// rec collects window positions (for night lights), roof tops (for mods) and animated parts.
import { Vox, rand, noise2 } from '../engine/voxel.js';
import { tree, house, PAL } from '../engine/kit.js';

const fill = (G, c, c2 = null, f = null) => { for (let x = 0; x < 12; x++) for (let z = 0; z < 12; z++) G.set(x, 0, z, f ? f(x, z) : c2 && (x + z) % 2 ? c2 : c); };
const dots = (G, n, cols, seed, k = 0) => { for (let i = 0; i < n; i++) G.set(Math.floor(rand(i, seed, k) * 12), 1, Math.floor(rand(i, seed, k + 1) * 12), cols[i % cols.length]); };
const car = (B, x, z, c, rot = false) => { if (rot) { B.box(x, 0, z, x, 0, z + 1, c); } else { B.box(x, 0, z, x + 1, 0, z, c); } };

function houseRec(B, x, z, opts, rec) { const wins = []; house(B, x, -1, z, { ...opts, wins }); rec.windows.push(...wins); }

export const BUILD = {
  // ---------- getting around
  road(G, B, rec, s) { fill(G, '#5b6168'); for (let x = 0; x < 12; x += 3) G.set(x, 0, 5, '#f2f2ea'), G.set(x + 1, 0, 5, '#f2f2ea'); for (let x = 0; x < 12; x++) { G.set(x, 0, 0, '#9aa0a5'); G.set(x, 0, 11, '#9aa0a5'); } rec.cars.push([0.5, 2.6, 'x']); },
  carpark(G, B, rec, s) { fill(G, '#7a8088'); for (let x = 1; x < 12; x += 3) for (let z of [1, 2, 3, 8, 9, 10]) G.set(x, 0, z, '#e8e8e0'); ['#e8573f', '#2f6fd8', '#ffd23f', '#ffffff'].forEach((c, i) => car(B, (i % 2) * 3 + 1, i < 2 ? 0 : 4, c, true)); },
  path(G, B, rec) { for (let x = 0; x < 12; x++) for (let z = 4; z < 8; z++) G.set(x, 0, z, '#e8b98a'); for (let x = 4; x < 8; x++) for (let z = 0; z < 12; z++) G.set(x, 0, z, '#e8b98a'); for (let z = 0; z < 12; z += 2) G.set(5, 0, z, '#ffffff'); B.set(0, 0, 0, '#7a5232'); B.box(0, 1, 0, 0, 2, 0, '#3a4752'); B.set(0, 3, 0, '#ffe9a8'); rec.lamps.push([0.5, 3.5, 0.5]); B.box(4, 0, 4, 5, 0, 4, '#9a6a42'); },
  cycle(G, B, rec) { for (let x = 0; x < 12; x++) for (let z = 3; z < 9; z++) G.set(x, 0, z, z < 6 ? '#c8553d' : '#e8b98a'); for (let x = 1; x < 12; x += 4) G.set(x, 0, 4, '#ffffff'); B.box(1, 0, 0, 3, 0, 0, '#46596a'); rec.bikes = true; },
  tram(G, B, rec) { for (let x = 0; x < 12; x++) { G.set(x, 0, 4, '#3a3f45'); G.set(x, 0, 7, '#3a3f45'); for (const z of [5, 6]) G.set(x, 0, z, x % 2 ? '#8a5c38' : '#9a6a42'); } B.box(1, 0, 4, 1, 2, 4, '#3a4752'); B.box(4, 0, 4, 4, 2, 4, '#3a4752'); B.box(0, 3, 3, 5, 3, 5, '#2f6fd8'); B.box(1, 0, 0, 4, 1, 1, '#2f6fd8'); B.box(1, 1, 0, 4, 1, 0, '#bfe6ff'); rec.lamps.push([2.5, 3, 4]); },
  bridge(G, B, rec) { B.box(0, 0, 2, 5, 0, 3, '#9a6a42'); for (let x = 0; x < 6; x += 2) { B.set(x, 1, 1, '#7a5232'); B.set(x, 1, 4, '#7a5232'); } B.box(0, 2, 1, 5, 2, 1, '#7a5232'); B.box(0, 2, 4, 5, 2, 4, '#7a5232'); },

  // ---------- homes
  timber(G, B, rec) { fill(G, '#94bf58'); houseRec(B, 0, 1, { w: 6, d: 4, h: 3, roof: '#9c4f32', wall: '#c08a56' }, rec); B.set(0, 4, 1, '#c8a27a'); garden(B); },
  straw(G, B, rec) { fill(G, '#a0c862'); houseRec(B, 0, 1, { w: 5, d: 4, h: 2, roof: '#e0ab45', wall: '#f6ecd0' }, rec); garden(B); },
  earth(G, B, rec) { fill(G, '#a0c862'); houseRec(B, 0, 1, { w: 6, d: 4, h: 3, roof: '#7a4a2c', wall: '#c98a5a' }, rec); for (let x = 0; x < 6; x++) B.set(x, 2, 1, '#b07548'); garden(B); },
  reclaimed(G, B, rec) { fill(G, '#94bf58'); houseRec(B, 0, 1, { w: 6, d: 4, h: 3, roof: '#5a6d80', wall: '#b5523b' }, rec); for (let x = 0; x < 6; x += 2) B.set(x, 1, 1, '#8f3f2c'); },
  cohousing(G, B, rec) { fill(G, '#a0c862'); dots(G, 10, ['#ff7eb6', '#ffd23f', '#ffffff'], 3); houseRec(B, 0, 0, { w: 6, d: 2, h: 3, roof: '#7a4a2c', wall: '#f1dcc0' }, rec); houseRec(B, 0, 4, { w: 6, d: 2, h: 2, roof: '#7a4a2c', wall: '#e6a15a' }, rec); B.set(3, 0, 3, '#7a5232'); B.box(2, 1, 2, 4, 2, 4, '#4caf50'); },
  concrete(G, B, rec) {
    fill(G, '#9aa0a5');
    for (let x = 0; x < 5; x++) for (let z = 1; z < 5; z++) for (let y = 0; y < 9; y++) {
      const edge = x === 0 || x === 4 || z === 1 || z === 4; if (!edge) continue;
      const win = y > 0 && y % 2 === 1 && ((z === 1 || z === 4) ? x % 2 === 1 : z % 2 === 0);
      B.set(x, y, z, win ? PAL.window : (y + x) % 3 ? '#a3a8ac' : '#959a9e');
      if (win) rec.windows.push([x + 0.5, y + 0.5, z === 1 ? 0.45 : z === 4 ? 5.55 : z + 0.5]);
    }
    B.box(0, 9, 1, 4, 9, 4, '#7d8286'); B.set(4, 10, 4, '#5b6168');
  },

  // ---------- food
  bigfield(G) { fill(G, null, null, (x, z) => (z % 2 ? '#e3c25a' : '#d4ad45')); },
  mixed(G, B) { fill(G, null, null, (x, z) => (x < 6 ? (z % 2 ? '#c9d77a' : '#b9c76a') : '#8fd06a')); B.box(5, 0, 0, 5, 0, 5, '#9a7a52'); },
  orchard(G, B, rec) { fill(G, '#94bf58'); for (const [x, z] of [[1, 1], [4, 1], [1, 4], [4, 4]]) { B.box(x, 0, z, x, 1, z, '#7a5232'); B.box(x - 1, 2, z - 1, x + 1, 3, z + 1, '#4caf50'); B.set(x + 1, 3, z, '#e8573f'); B.set(x - 1, 2, z + 1, '#e8573f'); B.set(x, 4, z, '#5bbd5a'); } },
  allot(G, B) { fill(G, null, null, (x, z) => (x % 4 === 3 ? '#e8b98a' : z % 2 ? '#7a5a3a' : (x + z) % 3 ? '#5fae4a' : '#e8573f')); B.box(5, 0, 5, 5, 1, 5, '#6d8a4a'); B.set(5, 2, 5, '#c0563a'); },
  vertical(G, B, rec) { fill(G, '#9aa0a5'); for (let y = 0; y < 8; y++) for (let x = 1; x < 5; x++) for (let z = 1; z < 5; z++) { const e = x === 1 || x === 4 || z === 1 || z === 4; if (!e) continue; B.set(x, y, z, y % 2 ? '#7fd1c7' : '#5bbd5a'); if (y % 2 && (z === 1) && x % 2) rec.windows.push([x + 0.5, y + 0.5, 0.45]); } B.box(1, 8, 1, 4, 8, 4, '#e8eef2'); },
  hives(G, B) { fill(G, '#a0c862'); dots(G, 16, ['#ff7eb6', '#ffd23f', '#b28cff', '#ffffff'], 7); for (const x of [1, 3]) { B.box(x, 0, 2, x, 1, 2, '#ffffff'); B.set(x, 2, 2, '#ffd23f'); } },
  hedge(G, B) { for (let x = 0; x < 6; x++) { B.set(x, 0, 0, '#2f8a43'); B.set(x, 1, 0, x % 2 ? '#3f9d4a' : '#2f8a43'); } },

  // ---------- water, power and waste
  wind(G, B, rec) { for (let y = 0; y < 13; y++) B.set(3, y, 3, y % 4 === 0 ? '#e1e6ea' : '#f4f6f8'); B.box(3, 13, 2, 3, 13, 4, '#f4f6f8'); rec.rotor = [3.5, 13.5, 1.6]; },
  // battery store: two small cabinets on a gravel pad, at the same half-scale as the houses
  battery(G, B, rec, t, F) { fill(G, '#9aa0a5'); for (const x of [3, 7]) { F.box(x, 0, 4, x + 1, 2, 7, '#8e5cd9'); F.box(x, 3, 4, x + 1, 3, 7, '#b48cf0'); F.set(x, 1, 3, '#ffd23f'); } F.box(2, 0, 9, 9, 0, 9, '#6b7076'); rec.lamps.push([5.5, 2.5, 5.5]); },
  raingarden(G, B) { fill(G, null, null, (x, z) => (Math.hypot(x - 5.5, z - 5.5) < 4 ? (Math.hypot(x - 5.5, z - 5.5) < 2.2 ? '#4fb3ea' : '#2f8a43') : '#a0c862')); for (const [x, z] of [[1, 1], [4, 2], [2, 4]]) B.box(x, 0, z, x, 1, z, '#3f9d4a'); },
  reedbed(G, B) { fill(G, null, null, (x, z) => ((x * 7 + z * 3) % 5 < 2 ? '#4fb3ea' : '#5fa86a')); for (let i = 0; i < 9; i++) { const x = Math.floor(rand(i, 4) * 6), z = Math.floor(rand(i, 5) * 6); B.box(x, 0, z, x, 1 + (i % 2), z, i % 3 ? '#6b8f3a' : '#8a6a3a'); } },
  repair(G, B, rec) { fill(G, '#e8b98a'); houseRec(B, 0, 1, { w: 5, d: 4, h: 3, roof: '#3a4752', wall: '#f1ebe0' }, rec); B.box(0, 3, 0, 4, 3, 0, '#f28c38'); B.set(5, 2, 1, '#9aa0a5'); B.set(5, 3, 1, '#9aa0a5'); },
  compost(G, B) { fill(G, '#9a7a52'); for (const x of [0, 2, 4]) B.box(x, 0, 2, x + 1, 1, 3, x === 2 ? '#5f8f3c' : '#7a5232'); },

  // ---------- complete the town
  school(G, B, rec) { fill(G, null, null, (x, z) => (z > 7 ? (x % 4 === 0 || z === 8 ? '#ffffff' : '#c8553d') : '#a0c862')); houseRec(B, 0, 0, { w: 6, d: 3, h: 3, roof: '#c0563a', wall: '#ffd23f' }, rec); B.box(5, 0, 3, 5, 5, 3, '#9aa0a5'); B.box(4, 4, 3, 4, 5, 3, '#16c79a'); },
  market(G, B, rec) { fill(G, '#e3d6b6', '#d6c6a0'); [['#ff8a5c', 0, 0], ['#2f6fd8', 3, 0], ['#ffd23f', 0, 3], ['#16c79a', 3, 3]].forEach(([c, x, z]) => { B.box(x, 0, z, x, 1, z, '#7a5232'); B.box(x + 2, 0, z, x + 2, 1, z, '#7a5232'); B.box(x, 2, z, x + 2, 2, z + 1, c); B.box(x, 0, z + 1, x + 2, 0, z + 1, '#e8573f'); }); rec.lamps.push([2.5, 3, 2.5]); },
  park(G, B) { fill(G, null, null, (x, z) => (Math.hypot(x - 7, z - 7) < 2.5 ? '#4fb3ea' : (x === 3 || z === 3) ? '#e8b98a' : '#94bf58')); tree(B, 0, -1, 0, { s: 1 }); tree(B, 5, -1, 1, { s: 1 }); B.box(2, 0, 5, 3, 0, 5, '#9a6a42'); },
  greenbridge(G, B, rec, s) { for (let x = 0; x < 6; x++) for (let z = 0; z < 6; z++) { const h = Math.round(2.5 * Math.sin(((z + 0.5) / 6) * Math.PI)); for (let y = 0; y <= h; y++) B.set(x, y, z, y === h ? (rand(x, z) > 0.8 ? '#ff7eb6' : '#5fb446') : '#8a5c38'); } B.box(2, 3, 2, 2, 4, 2, '#7a5232'); B.box(1, 5, 1, 3, 6, 3, '#3f9d4a'); },
  hall(G, B, rec) { fill(G, '#e3d6b6'); houseRec(B, 0, 1, { w: 6, d: 4, h: 4, roof: '#c0563a', wall: '#f6efe2' }, rec); for (let x = 0; x < 6; x += 2) B.box(x, 0, 0, x, 3, 0, '#e8e2d4'); B.box(5, 8, 2, 5, 10, 2, '#9aa0a5'); B.set(5, 10, 1, '#16c79a'); },
  festival(G, B, rec) { fill(G, '#94bf58'); for (let x = 1; x < 5; x++) for (let z = 1; z < 5; z++) for (let y = 0; y < 3 - Math.max(Math.abs(x - 2.5), Math.abs(z - 2.5)) + 1.5; y++) B.set(x, y, z, (x + y) % 2 ? '#ff7eb6' : '#ffffff'); B.box(0, 0, 0, 0, 3, 0, '#7a5232'); B.box(5, 0, 5, 5, 3, 5, '#7a5232'); for (let i = 0; i < 6; i++) B.set(i, 3, i, ['#ffd23f', '#16c79a', '#e8573f'][i % 3]); rec.lamps.push([0.5, 4, 0.5], [5.5, 4, 5.5]); },

  // ---------- fixed features
  oldschool(G, B, rec) { fill(G, null, null, (x, z) => (z > 7 ? (x % 4 === 0 ? '#ffffff' : '#2f6fd8') : '#e8b98a')); houseRec(B, 0, 0, { w: 5, d: 3, h: 2, roof: '#2f6fd8', wall: '#fff3d6' }, rec); B.box(5, 0, 0, 5, 4, 0, '#9aa0a5'); B.set(5, 4, 1, '#ffd23f'); },
  dock(G, B, rec) { fill(G, '#e9d6a1'); for (let z = 2; z < 9; z++) B.box(2, -1, z, 3, -1, z, z % 2 ? '#9a6a42' : '#8a5c38'); B.box(2, -3, 8, 2, -1, 8, '#7a5232'); B.box(3, -3, 8, 3, -1, 8, '#7a5232'); rec.lamps.push([2.5, 1, 8]); rec.dock = true; },
};

function garden(B) { B.set(0, 0, 5, '#4caf50'); B.set(5, 0, 5, '#4caf50'); B.set(3, 0, 5, '#7a5232'); }

// ---------- mods drawn on top of a home's roof
export function addMod(B, mod, rec) {
  const top = new Map();
  for (const [x, y, z] of B.m.values()) { const k = x + ',' + z; if (!top.has(k) || top.get(k) < y) top.set(k, y); }
  if (mod === 'heatpump') { B.box(5, 0, 5, 5, 0, 5, '#e8eef2'); B.set(5, 1, 5, '#9aa0a5'); return; }
  for (const [k, y] of top) {
    const [x, z] = k.split(',').map(Number);
    if (y < 3) continue;
    if (mod === 'solar' && z <= 2 && x > 0 && x < 5) B.set(x, y + 1, z, (x + z) % 2 ? '#2b3f73' : '#344b86');
    if (mod === 'greenroof') B.set(x, y + 1, z, rand(x, z, 3) > 0.85 ? '#ffd23f' : rand(x, z) > 0.5 ? '#4caf50' : '#5fb446');
  }
}

// ---------- marks (Level 1)
export const MARK = {
  town(G, B, rec, t, F) { for (let i = 0; i < 12; i++) for (const [x, z] of [[i, 0], [i, 11], [0, i], [11, i]]) G.set(x, 0, z, '#f2c14e'); if (F) for (const [x, z] of [[0, 0], [11, 0], [0, 11], [11, 11]]) { F.set(x, 0, z, '#c99a3a'); F.set(x, 1, z, '#c99a3a'); F.set(x, 2, z, '#e8573f'); } },
  wild(G, B, rec, t, F) { const s2 = t ? t.gx * 31 + t.gz : 1; for (let i = 0; i < 14; i++) G.set(Math.floor(rand(i, s2, 2) * 12), 1, Math.floor(rand(i, s2, 3) * 12), ['#ff7eb6', '#ffd23f', '#ffffff', '#c7a8ff'][i % 4]); if (F && t && (t.gx + t.gz) % 3 === 0) ftree(F, 6, 6, { h: 2, r: 2 }); },
};

// ---------- richer trees: autumn deciduous, olive, cypress, pine (TtC-style mixed palette)
const LEAVES = { round: ['#5c8f3a', '#6b9c42', '#7aa84a', '#4e7f32', '#c08a3e'], autumn: ['#3f9d3a', '#4caf44', '#5bbd4f'], olive: ['#4caf44', '#5bbd4f', '#3f9d3a'], pine: ['#2e7d4f', '#256b43', '#348a59'], cypress: ['#2e7d4f', '#348a59', '#256b43'] };
export function tree2(v, x, y, z, kind = 'round', seed = 0) {
  // small trees (the approved look: small trees, large canyons)
  if (kind === 'tallpine' || kind === 'pine') return tallPine(v, x, y, z, seed, kind === 'pine' ? 0.5 : 0.62);
  if (kind === 'oak' || kind === 'autumn' || kind === 'olive') return bigOak(v, x, y, z, seed, kind === 'oak' ? 0.62 : 0.5);
  const L = LEAVES.round; const pick = (i) => L[Math.floor(rand(x + i, y, z + seed) * L.length)];
  const h = 1 + Math.floor(rand(x, z, seed) * 2);
  for (let i = 1; i <= h; i++) v.set(x, y + i, z, '#6b4a2e');
  const r = 1 + (rand(x, z, 7) > 0.55 ? 1 : 0);
  for (let dx = -r; dx <= r; dx++) for (let dy = 0; dy <= r * 2 - 1; dy++) for (let dz = -r; dz <= r; dz++) {
    const d = Math.hypot(dx, (dy - r + 0.5) * 1.15, dz); if (d <= r + 0.4 && rand(x + dx, dy, z + dz + seed) > 0.1) v.set(x + dx, y + h + dy, z + dz, pick(dx * 7 + dy * 3 + dz));
  }
}
// Tiered conifer like the brochure islands: square tiers stepping in, darker under each tier.
const PINE = ['#3d6e44', '#477a4b', '#548752'], PINE_D = '#2d5434';
function tallPine(v, x, y, z, seed, k = 1) {
  const tiers = Math.max(2, Math.round((2 + Math.floor(rand(x, z, seed) * 2)) * k)), trunk = 1 + (rand(x, z, seed + 1) > 0.5 ? 1 : 0);
  for (let i = 1; i <= trunk; i++) v.set(x, y + i, z, '#5a3d24');
  let yy = y + trunk + 1;
  for (let t = 0; t < tiers; t++) {
    const r = Math.max(1, Math.round((tiers - t) * 0.7 * k + 0.2));
    for (let layer = 0; layer < 2; layer++) {
      const rr = r - layer;
      for (let dx = -rr; dx <= rr; dx++) for (let dz = -rr; dz <= rr; dz++) {
        if (Math.abs(dx) === rr && Math.abs(dz) === rr && rr > 1) continue;
        v.set(x + dx, yy, z + dz, layer === 0 ? PINE_D : PINE[Math.floor(rand(x + dx, yy, z + dz) * 3)]);
      }
      yy++;
    }
  }
  v.set(x, yy, z, PINE[2]); v.set(x, yy + 1, z, PINE[2]);
}
export function bigOakAt(v, x, y, z) { bigOak(v, x, y, z, 99, 1.5); }
// Big broadleaf: chunky trunk with a branch, a wide two-tone canopy with a darker lower band.
const OAK = ['#4caf44', '#58bb4c', '#43a03c'], OAK_D = '#2f8a34';
function bigOak(v, x, y, z, seed, k = 1) {
  const h = Math.round((2 + Math.floor(rand(x, z, seed) * 2)) * k);
  for (let i = 1; i <= h; i++) { v.set(x, y + i, z, '#6b4a2e'); if (k > 1.2) v.set(x + 1, y + i, z, '#5f4128'); }
  v.set(x - 1, y + h - 1, z, '#6b4a2e'); v.set(x - 2, y + h, z, '#6b4a2e');
  const R = Math.round(2.1 * k + 0.2), cy = y + h + R - 1;
  for (let dx = -R - 1; dx <= R + 1; dx++) for (let dy = -R; dy <= R; dy++) for (let dz = -R - 1; dz <= R + 1; dz++) {
    const d = Math.hypot(dx / 1.15, dy * 1.05, dz / 1.15) + (rand(x + dx, cy + dy, z + dz + seed) - 0.5) * 0.5;
    if (d > R + 0.2) continue;
    v.set(x + dx, cy + dy, z + dz, dy < -R * 0.35 ? OAK_D : OAK[Math.floor(rand(x + dx * 3, cy + dy, z + dz) * 3)]);
  }
}

// ---------- natural decoration for untouched tiles
export function decorate(t, G, B, H) {
  const s = t.gx * 31 + t.gz;
  // meadows: an occasional bold flower bed (one colour) instead of scattered specks
  if (t.zone === 'meadow' && rand(s, 13) > 0.66) { const c = ['#ff7eb6', '#ffd23f', '#ffffff', '#b28cff'][s % 4]; const x0 = 2 + Math.floor(rand(s, 14) * 6), z0 = 2 + Math.floor(rand(s, 15) * 6), n = 2 + (s % 2); for (let x = 0; x < n; x++) for (let z = 0; z < n; z++) if ((x + z) % 2 === 0 || n === 2) G.set(x0 + x, 1, z0 + z, c); }
  if (t.zone === 'coast') {
    // a lively beach: huts, rock pools, dune grass, umbrellas, driftwood
    const r = rand(s, 2);
    if (rand(s, 6) > 0.6) { const x0 = Math.floor(rand(s, 3) * 8), z0 = Math.floor(rand(s, 4) * 8); for (let i = 0; i < 5; i++) G.box(x0 + (i % 3), 1, z0 + Math.floor(i / 2), x0 + (i % 3), 2 + (i % 2), z0 + Math.floor(i / 2), i % 2 ? '#7fb54a' : '#9cc45a'); }   // one dune-grass clump
    if (r > 0.78) { const c = ['#e8573f', '#3d6e8a', '#e3a52c', '#2e8b76'][s % 4]; for (let x = 0; x < 3; x++) for (let z = 0; z < 3; z++) for (let y = 1; y <= 4; y++) { if (x > 0 && x < 2 && z > 0 && z < 2) continue; G.set(4 + x, y, 4 + z, z === 2 && x === 1 && y <= 2 ? '#6b4a2e' : x % 2 ? '#f6efe0' : c); } for (let x = -1; x <= 3; x++) for (let z = -1; z <= 3; z++) G.set(4 + x, 5, 4 + z, '#b9603e'); } // a small striped beach hut, at the houses' scale
    else if (r > 0.5) { for (let x = 0; x < 12; x++) for (let z = 0; z < 12; z++) if (Math.hypot(x - 6, z - 6) < 3 + noise2(x / 2, z / 2, s) * 1.5) G.set(x, 0, z, '#4aaeea'); B.box(1, 0, 1, 1, 1, 2, '#9aa0a5'); B.set(4, 0, 4, '#8b8f93'); G.set(6, 1, 6, '#ff8a5c'); }
    else if (r > 0.3) { G.box(2, 1, 2, 2, 5, 2, '#8a5c38'); for (let i = 0; i < 5; i++) G.box(0 + i, 6 - Math.abs(i - 2), 0 + i, 0 + i, 6 - Math.abs(i - 2), 4 - i + 2, ['#ff8a5c', '#ffffff', '#3a6fc9'][i % 3]); G.box(5, 1, 6, 7, 1, 7, ['#16c79a', '#ffd23f'][s % 2]); }
    else { G.box(1, 1, 5, 6, 1, 5, '#a07a50'); G.set(7, 1, 6, '#a07a50'); }
  }
  if (t.zone === 'wood') { tree2(B, 2 + Math.floor(rand(s, 1) * 2), -1, 2 + Math.floor(rand(s, 2) * 2), ['tallpine', 'oak', 'tallpine'][s % 3], s); }
  if ((t.zone === 'field' || t.zone === 'slope') && rand(s, 9) > 0.9) tree2(B, rand(s, 10) > 0.5 ? 1 : 4, -1, 2 + Math.floor(rand(s, 11) * 2), ['oak', 'pine'][s % 2], s);
  // wetland: one clear pond with a few chunky reed clumps around it
  if (t.zone === 'wetland') {
    for (let x = 0; x < 12; x++) for (let z = 0; z < 12; z++) if (Math.hypot(x - 6 + rand(s, 1) * 2, z - 6) < 4 + noise2(x / 3, z / 3, s) * 1.2) G.set(x, 0, z, '#4fb3ea');
    for (let i = 0; i < 3; i++) { const a = rand(i, s) * 6.28, x = Math.round(6 + Math.cos(a) * 5), z = Math.round(6 + Math.sin(a) * 5); G.box(x, 1, z, Math.min(11, x + 1), 2, Math.min(11, z + 1), '#5a9a3a'); G.set(x, 3, z, '#8a6a3a'); }
  }
  if (t.hedge) for (let x = 0; x < 6; x++) { H.set(x, 0, 0, '#2f8a43'); H.set(x, 1, 0, rand(x, s) > 0.8 ? '#ff7eb6' : x % 2 ? '#3f9d4a' : '#2f8a43'); }
}

export { Vox };

// =====================================================================================
// Fine-scale buildings (half-size voxels on a 12×12 grid per tile): window sills, shutters,
// doors, tiled roofs, chimneys, balconies, garden fences. F is the fine layer; y = 0 is the grass top.
// rec.windows are stored in full-voxel tile units (fine / 2) for the night lights.
const shade = (hex, k) => { const n = parseInt(hex.slice(1), 16); const f = (v) => Math.max(0, Math.min(255, Math.round(v * k))); return '#' + [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(f).map((v) => v.toString(16).padStart(2, '0')).join(''); };
export function fhouse(F, x0, z0, w, d, h, o, rec) {
  const { wall, roof, trim = '#fbf6ec', shutter = '#4f7f6a', door = '#7a4a2c', roofType = 'gable', chimney = true, floorH = 5, stripes = null, balcony = false } = o;
  // remember the shell so the construction sequence can show it being built system by system
  (rec.shells ||= []).push({ x0, z0, w, d, h, open: [ '#3d5a73', trim, shutter, door ].filter(Boolean).map((c) => c.toLowerCase()) });
  for (let x = 0; x < w; x++) for (let z = 0; z < d; z++) for (let y = 0; y < h; y++) {
    const edge = x === 0 || z === 0 || x === w - 1 || z === d - 1; if (!edge) continue;
    let c = stripes ? stripes(x, y, z) : (y % 2 ? wall : shade(wall, 0.96));
    const fy = y % floorH; const front = z === 0 || z === d - 1; const side = x === 0 || x === w - 1;
    const winCol = front ? x % 3 === 1 && x > 0 && x < w - 1 : side ? z % 3 === 1 && z > 0 && z < d - 1 : false;
    if (winCol && (fy === 2 || fy === 3) && !(front && z === 0 && Math.abs(x - Math.floor(w / 2)) < 1 && y < floorH)) {
      c = '#3d5a73';
      const wx = x0 + x + 0.5 + (side ? (x === 0 ? -0.6 : 0.6) : 0), wz = z0 + z + 0.5 + (front ? (z === 0 ? -0.6 : 0.6) : 0);
      if (fy === 2) rec.windows.push([wx / 2, (y + 1.5) / 2, wz / 2]);
      // sill below, shutters either side, on the outside face
      const ox = side ? (x === 0 ? -1 : 1) : 0, oz = front ? (z === 0 ? -1 : 1) : 0;
      if (fy === 2) F.set(x0 + x + ox, y - 1, z0 + z + oz, trim);
      if (front && shutter) { F.set(x0 + x - 1 + ox, y, z0 + z + oz, shutter); F.set(x0 + x + 1 + ox, y, z0 + z + oz, shutter); }
      if (side && shutter) { F.set(x0 + x + ox, y, z0 + z - 1 + oz, shutter); F.set(x0 + x + ox, y, z0 + z + 1 + oz, shutter); }
    }
    if (front && z === 0 && x === Math.floor(w / 2) && y < 3) c = door;
    F.set(x0 + x, y, z0 + z, c);
  }
  F.set(x0 + Math.floor(w / 2), 0, z0 - 1, trim); // doorstep
  if (balcony) for (let x = 1; x < w - 1; x++) { F.set(x0 + x, floorH, z0 - 1, trim); if (x % 2) F.set(x0 + x, floorH + 1, z0 - 1, '#5b6168'); }
  if (roofType === 'gable' || roofType === 'thatch') {
    const half = Math.ceil(d / 2);
    for (let r = 0; r <= half; r++) for (let x = -1; x <= w; x++) {
      const rc = roofType === 'thatch' ? (r % 2 ? roof : shade(roof, 0.9)) : ((x + r) % 2 ? roof : shade(roof, 0.86));
      F.set(x0 + x, h + r, z0 - 1 + r, rc); F.set(x0 + x, h + r, z0 + d - r, rc);
    }
    for (let x = 0; x < w; x++) for (let z = 0; z < d; z++) { const r = Math.min(z + 1, d - z); for (let k = 0; k < r; k++) if (!F.has(x0 + x, h + k, z0 + z)) F.set(x0 + x, h + k, z0 + z, x === 0 || x === w - 1 ? wall : roof); }
    if (chimney && roofType === 'gable') { const cx = x0 + w - 2, cz = z0 + Math.floor(d / 2); for (let y = h; y < h + half + 2; y++) F.set(cx, y, cz, '#9a5a3c'); F.set(cx, h + half + 2, cz, '#5b4a40'); rec.chimneys = rec.chimneys || []; rec.chimneys.push([(cx + 0.5) / 2, (h + half + 3) / 2, (cz + 0.5) / 2]); }
  } else {
    for (let x = 0; x < w; x++) for (let z = 0; z < d; z++) F.set(x0 + x, h, z0 + z, (x === 0 || z === 0 || x === w - 1 || z === d - 1) ? trim : roof);
  }
}
function fgarden(F, x0, z0, x1, z1, seed) {
  for (let x = x0; x <= x1; x++) { F.set(x, 0, z1, '#efe6d2'); if (x % 2 === 0) F.set(x, 1, z1, '#efe6d2'); }
  for (let i = 0; i < 6; i++) { const x = x0 + Math.floor(rand(i, seed) * (x1 - x0)), z = z0 + Math.floor(rand(i, seed, 1) * (z1 - z0)); F.set(x, 0, z, ['#ff7eb6', '#ffd23f', '#ffffff', '#c7a8ff'][i % 4]); }
  F.set(x1, 0, z0, '#4f8f3a'); F.set(x1, 1, z0, '#5c9a40');
}
const FINE = {
  // Florence's AI Lab: a cream workshop with a terracotta band, a teal door, a flask sign and a glass dome
  // topped with Florence's own antenna. Fine grid (12 per tile side); the front faces the camera (+z).
  ailab(G, B, rec, t, F) {
    fill(G, null, null, (x, z) => (z >= 10 && x >= 5 && x <= 6 ? '#16c79a' : (x + z) % 3 ? '#e9d6a1' : '#e2cb92'));
    for (let x = 1; x <= 10; x++) for (let z = 2; z <= 9; z++) for (let y = 0; y <= 6; y++) {
      const edge = x === 1 || x === 10 || z === 2 || z === 9; if (!edge) continue;
      let c = y <= 1 ? '#c8653d' : (x + y) % 2 ? '#fbf1dc' : '#f5e7cc';
      if (y >= 3 && y <= 4 && ((z === 9 && (x === 2 || x === 3 || x === 8 || x === 9)) || ((x === 1 || x === 10) && z >= 4 && z <= 7))) c = '#3d7ea6';
      if (z === 9 && x >= 5 && x <= 6 && y <= 3) c = y === 2 && x === 6 ? '#ffd23f' : '#2e8b76';
      F.set(x, y, z, c);
    }
    F.box(0, 7, 1, 11, 7, 10, '#7a4a2c'); // roof slab
    // the flask sign above the door
    F.set(5, 5, 10, '#16c79a'); F.set(6, 5, 10, '#16c79a'); F.set(5, 6, 10, '#bff3e4'); F.set(6, 6, 10, '#bff3e4'); F.set(5, 6, 10, '#16c79a');
    // glass dome with mint ribs
    const cx = 5.5, cz = 5.5, R = 3.6;
    for (let x = 1; x <= 10; x++) for (let z = 1; z <= 10; z++) for (let y = 8; y <= 12; y++) {
      const d = Math.hypot(x - cx, (y - 8) * 1.1, z - cz); if (d > R || d < R - 1.15) continue;
      F.set(x, y, z, (x === 5 || x === 6 || z === 5 || z === 6) ? '#16c79a' : '#bfe9f5');
    }
    F.box(5, 12, 5, 6, 14, 6, '#c98a50'); F.box(5, 15, 5, 6, 15, 6, '#b9783f'); // Florence's antenna
    rec.windows.push([1.2, 2, 4.6], [4.6, 2, 4.6]);
  },
  timber(G, B, rec, t, F) {
    fill(G, '#94bf58'); const plank = (x, y, z) => ((x + z) % 2 ? '#c08a56' : '#b07a48');
    fhouse(F, 1, 2, 5, 6, 7, { wall: '#c08a56', stripes: plank, roof: '#9c4f32', shutter: '#3f6b3a' }, rec);
    fhouse(F, 6, 2, 5, 6, 7, { wall: '#c08a56', stripes: plank, roof: '#a85a3a', shutter: '#2f5f8a' }, rec);
    fgarden(F, 1, 9, 10, 11, t?.gx || 1);
  },
  straw(G, B, rec, t, F) {
    fill(G, '#a0c862'); fhouse(F, 2, 2, 8, 6, 5, { wall: '#f6ecd0', roof: '#d9a441', roofType: 'thatch', shutter: '#5b7fbf', trim: '#e8d7a8' }, rec);
    // a darker thatch fringe under the eaves, and the straw bales showing at the foot of the walls
    for (let x = 1; x <= 10; x++) { F.set(x, 4, 1, x % 2 ? '#a87c2c' : '#b8892f'); F.set(x, 4, 8, x % 2 ? '#a87c2c' : '#b8892f'); }
    for (let x = 2; x <= 9; x++) if (x !== 5 && x !== 6) { F.set(x, 0, 7, x % 2 ? '#e8c870' : '#d9b456'); F.set(x, 1, 7, x % 3 ? '#e8c870' : '#c9a448'); }
    fgarden(F, 1, 9, 10, 11, (t?.gz || 2) + 5);
  },
  earth(G, B, rec, t, F) { fill(G, '#94bf58'); const bands = (x, y) => (Math.floor(y / 2) % 2 ? '#c98a5a' : '#b87a4c'); fhouse(F, 1, 2, 10, 6, 7, { wall: '#c98a5a', stripes: bands, roof: '#5f9a45', roofType: 'flat', shutter: '#8a4f2a', trim: '#e9d2b0' }, rec); fgarden(F, 1, 9, 10, 11, 3); },
  reclaimed(G, B, rec, t, F) { fill(G, '#94bf58'); const brick = (x, y, z) => ((x + z + (y % 2)) % 3 === 0 ? '#a24a35' : y % 3 === 0 ? '#c9b8a2' : '#b5523b'); fhouse(F, 1, 2, 5, 6, 8, { wall: '#b5523b', stripes: brick, roof: '#5a6d80', shutter: '#e8e2d4' }, rec); fhouse(F, 6, 2, 5, 6, 8, { wall: '#b5523b', stripes: brick, roof: '#4f6274', shutter: '#3f6b3a' }, rec); fgarden(F, 1, 9, 10, 11, 7); },
  cohousing(G, B, rec, t, F) { fill(G, '#a0c862'); fhouse(F, 1, 1, 10, 4, 6, { wall: '#f1dcc0', roof: '#b9603e', shutter: '#4f7f6a' }, rec); fhouse(F, 1, 7, 4, 4, 5, { wall: '#e6a15a', roof: '#a85a3a', chimney: false }, rec); fhouse(F, 7, 7, 4, 4, 5, { wall: '#f3c9a0', roof: '#a85a3a', chimney: false }, rec); F.set(5, 0, 8, '#6b4a2e'); F.set(5, 1, 8, '#6b4a2e'); F.box(4, 2, 7, 6, 4, 9, '#5c9a40'); /* the shared courtyard: a long table and a small greenhouse */ F.box(3, 1, 5, 7, 1, 5, '#9a6a42'); F.set(3, 0, 5, '#6b4a2e'); F.set(7, 0, 5, '#6b4a2e'); F.box(9, 0, 5, 10, 1, 6, '#cfeefa'); F.box(9, 2, 5, 10, 2, 6, '#e8eef2'); },
  concrete(G, B, rec, t, F) { fill(G, '#9aa0a5'); const grid = (x, y) => (y % 4 === 0 ? '#8f959a' : '#a7acb0'); fhouse(F, 1, 1, 10, 9, 18, { wall: '#a3a8ac', stripes: grid, roof: '#7d8286', roofType: 'flat', trim: '#8f959a', shutter: null, floorH: 4, balcony: true }, rec); F.box(7, 19, 3, 8, 20, 4, '#c8ced2'); },
  school(G, B, rec, t, F) { fill(G, null, null, (x, z) => (z > 8 ? (x % 4 === 0 || z === 9 ? '#ffffff' : '#c8553d') : '#94bf58')); fhouse(F, 1, 1, 10, 6, 8, { wall: '#ffe08a', roof: '#c0563a', shutter: '#2f6fd8', floorH: 4 }, rec); F.box(10, 0, 8, 10, 10, 8, '#9aa0a5'); F.set(10, 11, 8, '#16c79a'); F.set(9, 10, 8, '#16c79a'); },
  hall(G, B, rec, t, F) { fill(G, '#e3d6b6'); fhouse(F, 1, 3, 10, 7, 10, { wall: '#f6efe2', roof: '#c0563a', shutter: '#e8dcc4', floorH: 5 }, rec); for (let x = 1; x < 12; x += 3) F.box(x, 0, 1, x, 8, 1, '#e8e2d4'); F.box(0, 9, 0, 11, 9, 2, '#f6efe2'); F.box(10, 15, 6, 10, 18, 6, '#9aa0a5'); F.set(10, 18, 5, '#16c79a'); },
  repair(G, B, rec, t, F) { fill(G, '#e8b98a'); fhouse(F, 1, 3, 9, 6, 7, { wall: '#f1ebe0', roof: '#3a4752', shutter: '#f28c38' }, rec); for (let x = 1; x < 10; x++) { F.set(x, 4, 1, x % 2 ? '#f28c38' : '#ffffff'); F.set(x, 4, 2, x % 2 ? '#f28c38' : '#ffffff'); } F.box(10, 0, 4, 11, 1, 5, '#2f6fd8'); },
  oldschool(G, B, rec, t, F) { fill(G, null, null, (x, z) => (z > 8 ? ((x + z) % 4 === 0 ? '#c8653d' : '#e9d6a1') : '#e8b98a')); fhouse(F, 1, 1, 8, 6, 6, { wall: '#fff3d6', roof: '#b9603e', shutter: '#4f7f6a' }, rec); F.box(10, 0, 2, 11, 9, 3, '#fff3d6'); F.box(10, 10, 2, 11, 11, 3, '#b9603e'); F.set(10, 8, 1, '#ffd23f'); },
  market(G, B, rec, t, F) {
    fill(G, '#e3d6b6', '#d6c6a0');
    [['#ff8a5c', 1, 1], ['#2f6fd8', 7, 1], ['#ffd23f', 1, 7], ['#16c79a', 7, 7]].forEach(([c, x, z]) => {
      for (const [a, b] of [[x, z], [x + 3, z], [x, z + 3], [x + 3, z + 3]]) F.box(a, 0, b, a, 3, b, '#7a5232');
      for (let i = 0; i <= 3; i++) for (let j = 0; j <= 3; j++) F.set(x + i, 4 + (i === 0 || i === 3 ? 0 : 1), z + j, (i + j) % 2 ? c : '#ffffff');
      F.box(x, 1, z + 1, x + 3, 1, z + 2, '#9a6a42'); F.set(x + 1, 2, z + 1, '#e8573f'); F.set(x + 2, 2, z + 2, '#ffd23f'); F.set(x + 1, 2, z + 2, '#5bbd5a');
    });
    F.box(5, 0, 5, 6, 3, 6, '#9aa0a5'); F.box(5, 4, 5, 6, 4, 6, '#4fb3ea'); rec.lamps.push([3, 3, 3]);
  },
};
Object.assign(BUILD, FINE);
export function addModFine(F, mod) {
  const top = new Map();
  for (const [x, y, z] of F.m.values()) { const k = x + ',' + z; if (!top.has(k) || top.get(k) < y) top.set(k, y); }
  // heat pump: a white unit with a dark fan grille facing the street and a warm glow on top
  if (mod === 'heatpump') { F.box(9, 0, 9, 11, 2, 10, '#e8eef2'); F.set(10, 1, 11, '#3a4752'); F.set(9, 1, 11, '#7a8088'); F.set(11, 1, 11, '#7a8088'); F.set(10, 0, 11, '#7a8088'); F.set(10, 2, 11, '#7a8088'); F.set(11, 3, 9, '#ff9a4a'); return; }
  for (const [k, y] of top) {
    const [x, z] = k.split(',').map(Number); if (y < 5) continue;
    // on the street-facing slope, so the panels are seen from the usual camera
    if (mod === 'solar' && z >= 5 && z <= 8 && x % 5 !== 0) F.set(x, y + 1, z, (x + z) % 2 ? '#22356a' : '#2e4785');
    if (mod === 'greenroof') F.set(x, y + 1, z, rand(x, z, 3) > 0.85 ? '#ffd23f' : rand(x, z) > 0.5 ? '#5c9a40' : '#6aab4a');
  }
}

// =====================================================================================
// Everything else at the same fine scale as the houses (art review, Nov 2026): props, farms, transport and
// nature use the half-size F layer too, so nothing looks like a giant block next to a cottage.
// F: fine grid, 12 per tile side, y = 0 is the grass top. rec.lamps / rec.windows are in full-voxel units.
const CARS = ['#c8553d', '#3d6e8a', '#e8d9b0', '#5a6d50', '#e6a15a', '#6b5b8a'];
function fcar(F, x, z, c, alongX = false) {
  const L = 6, W = 3; const at = (i, j, y, col) => (alongX ? F.set(x + i, y, z + j, col) : F.set(x + j, y, z + i, col));
  for (let i = 0; i < L; i++) for (let j = 0; j < W; j++) { at(i, j, 0, (i === 1 || i === L - 2) && (j === 0 || j === W - 1) ? '#22262a' : c); at(i, j, 1, c); }
  for (let i = 1; i < L - 1; i++) for (let j = 0; j < W; j++) at(i, j, 2, i === 1 || i === L - 2 ? '#bfe6ff' : j === 0 || j === W - 1 ? '#9fd0ee' : c);
  at(0, 0, 1, '#ffe9a8'); at(0, W - 1, 1, '#ffe9a8');
}
function fbench(F, x, z, alongX = true) { for (let i = 0; i < 3; i++) { const [a, b] = alongX ? [x + i, z] : [x, z + i]; F.set(a, 1, b, '#9a6a42'); if (i !== 1) F.set(a, 0, b, '#5b4636'); const [c, d] = alongX ? [a, b - 1] : [a - 1, b]; F.set(c, 2, d, '#8a5c38'); } }
function flamp(F, x, z, rec) { for (let y = 0; y < 6; y++) F.set(x, y, z, '#3a4752'); F.set(x, 6, z, '#ffe9a8'); F.set(x, 7, z, '#3a4752'); rec.lamps.push([(x + 0.5) / 2, 3.3, (z + 0.5) / 2]); }
function ftree(F, x, z, { h = 3, leaf = ['#5c8f3a', '#6b9c42', '#7aa84a'], fruit = null, r = 2 } = {}) {
  for (let y = 0; y < h; y++) F.set(x, y, z, '#6b4a2e');
  for (let dx = -r; dx <= r; dx++) for (let dz = -r; dz <= r; dz++) for (let dy = 0; dy <= r + 1; dy++) {
    const d = Math.hypot(dx, (dy - r * 0.6) * 1.1, dz); if (d > r + 0.35) continue;
    F.set(x + dx, h + dy, z + dz, fruit && rand(x + dx, dy, z + dz) > 0.82 ? fruit : leaf[Math.floor(rand(x + dx, h + dy, z + dz) * leaf.length)]);
  }
}
function freed(F, x, z, h) { for (let y = 0; y < h; y++) F.set(x, y, z, y === h - 1 ? '#8a6a3a' : '#6b8f3a'); }
const SAGE = '#94bf58', SAGE2 = '#88b44f';
const FINE2 = {
  carpark(G, B, rec, t, F) { fill(G, '#7a8088'); for (let z = 0; z < 12; z++) for (const x of [0, 4, 8]) G.set(x, 0, z, z === 5 || z === 6 ? '#7a8088' : '#e8e8e0'); [[1, 0], [5, 0], [9, 7], [1, 7]].forEach(([x, z], i) => fcar(F, x, z, CARS[(i + (t?.gx || 0)) % CARS.length])); },
  path(G, B, rec, t, F) {
    fill(G, SAGE, SAGE2);
    for (let x = 0; x < 12; x++) for (let z = 0; z < 12; z++) if ((z >= 4 && z < 8) || (x >= 4 && x < 8)) G.set(x, 0, z, (x * 3 + z * 5) % 7 < 2 ? '#d9a878' : (x + z) % 2 ? '#e8c39a' : '#e0b88c');
    flamp(F, 1, 1, rec); fbench(F, 8, 2); F.box(9, 0, 9, 10, 0, 10, '#8a5c38'); F.set(9, 1, 9, '#ff7eb6'); F.set(10, 1, 10, '#ffd23f'); F.set(10, 1, 9, '#5c9a40'); F.set(9, 1, 10, '#5c9a40');
  },
  cycle(G, B, rec, t, F) {
    fill(G, SAGE, SAGE2);
    for (let x = 0; x < 12; x++) for (let z = 3; z < 9; z++) G.set(x, 0, z, z === 3 || z === 8 ? '#f2f2ea' : '#c8553d');
    // a white bike symbol in the middle of the lane
    for (const [x, z] of [[3, 5], [3, 6], [4, 5], [4, 6], [7, 5], [7, 6], [8, 5], [8, 6], [5, 5], [6, 5], [5, 4]]) G.set(x, 0, z, '#ffffff');
    for (let x = 1; x < 11; x += 3) { F.set(x, 0, 10, '#46596a'); F.set(x, 1, 10, '#46596a'); F.set(x + 1, 1, 10, '#46596a'); F.set(x + 1, 0, 10, '#46596a'); } rec.bikes = true;
  },
  tram(G, B, rec, t, F) {
    fill(G, SAGE, SAGE2);
    for (let x = 0; x < 12; x++) { G.set(x, 0, 4, '#3a3f45'); G.set(x, 0, 7, '#3a3f45'); for (const z of [5, 6]) G.set(x, 0, z, x % 2 ? '#8a5c38' : '#9a6a42'); }
    // the stop: a shelter with a terracotta roof, a bench and a sign
    for (const x of [1, 6]) for (let y = 0; y < 5; y++) F.set(x, y, 10, '#3a4752');
    F.box(0, 5, 9, 7, 5, 11, '#c8553d'); F.box(2, 0, 11, 5, 1, 11, '#bfe6ff'); fbench(F, 2, 10); F.box(9, 0, 10, 9, 5, 10, '#3a4752'); F.box(8, 5, 10, 10, 6, 10, '#2e8b76'); rec.lamps.push([2, 2.5, 5]);
  },
  bridge(G, B, rec, t, F) {
    for (let x = 0; x < 12; x++) for (let z = 3; z <= 8; z++) F.set(x, 0, z, x % 2 ? '#9a6a42' : '#8a5c38');
    for (let x = 0; x < 12; x += 3) for (const z of [3, 8]) { F.set(x, 1, z, '#6b4a2e'); F.set(x, 2, z, '#6b4a2e'); }
    for (let x = 0; x < 12; x++) { F.set(x, 3, 3, '#7a5232'); F.set(x, 3, 8, '#7a5232'); }
  },
  bigfield(G, B, rec, t, F) {
    fill(G, null, null, (x, z) => (z % 2 ? '#e3c25a' : '#d4ad45'));
    if (((t?.gx || 0) + (t?.gz || 0)) % 2 === 0) { F.box(2, 0, 2, 6, 1, 4, '#c8553d'); F.box(3, 2, 2, 4, 3, 3, '#bfe6ff'); F.box(0, 0, 2, 1, 1, 4, '#8a8f94'); for (const x of [2, 5]) { F.set(x, 0, 1, '#22262a'); F.set(x, 0, 5, '#22262a'); } }
  },
  mixed(G, B, rec, t, F) {
    // three crops in rows (cabbages, wheat, beans) beside a sheep pasture, and a small red barn
    fill(G, null, null, (x, z) => (x < 7 ? (z < 4 ? (x % 2 ? '#5e8f3e' : '#7a5a3a') : z < 8 ? (z % 2 ? '#e3c25a' : '#d4ad45') : (x % 2 ? '#6b9c42' : '#7a5a3a')) : '#a0c862'));
    F.box(8, 0, 0, 11, 3, 3, '#a8442e'); F.box(8, 4, 0, 11, 4, 3, '#6b3a28'); F.box(9, 0, 3, 10, 2, 3, '#f1e6d0');
    for (let z = 4; z < 12; z++) if (z % 2 === 0) F.set(7, 0, z, '#9a7a52'); for (let z = 4; z < 12; z++) F.set(7, 1, z, '#9a7a52');
  },
  orchard(G, B, rec, t, F) { fill(G, SAGE, SAGE2); for (const [x, z] of [[2, 2], [8, 3], [3, 8], [9, 9]]) ftree(F, x, z, { h: 2, leaf: ['#4f8f3a', '#5c9a40', '#6aa64a'], fruit: '#d9433a', r: 2 }); },
  allot(G, B, rec, t, F) {
    fill(G, null, null, (x, z) => (x === 5 || z === 5 ? '#e0b88c' : '#7a5a3a'));
    // framed beds with different crops, a green shed and bean poles
    for (const [x0, z0] of [[0, 0], [6, 0], [0, 6], [6, 6]]) { for (let i = 0; i < 5; i++) { F.set(x0 + i, 0, z0, '#9a6a42'); F.set(x0 + i, 0, z0 + 4, '#9a6a42'); F.set(x0, 0, z0 + i, '#9a6a42'); F.set(x0 + 4, 0, z0 + i, '#9a6a42'); } }
    for (const [x, z, c] of [[1, 2, '#5c9a40'], [2, 2, '#5c9a40'], [3, 2, '#5c9a40'], [7, 1, '#e8573f'], [8, 2, '#e8573f'], [7, 3, '#e8573f'], [2, 7, '#e6a15a'], [1, 8, '#e6a15a']]) F.set(x, 1, z, c);
    F.box(8, 0, 8, 10, 3, 10, '#4f7f5a'); F.box(8, 4, 8, 10, 4, 10, '#6b4a2e'); F.set(9, 1, 10, '#3a2a1e');
    for (const x of [1, 3]) for (let y = 1; y < 6; y++) F.set(x, y, 9, y % 2 ? '#5c9a40' : '#8a6a3a');
  },
  vertical(G, B, rec, t, F) {
    fill(G, '#9aa0a5');
    for (let y = 0; y < 16; y++) for (let x = 2; x <= 9; x++) for (let z = 2; z <= 9; z++) {
      const edge = x === 2 || x === 9 || z === 2 || z === 9; if (!edge) continue;
      const post = (x === 2 || x === 9) && (z === 2 || z === 9);
      F.set(x, y, z, post || y % 4 === 3 ? '#e8eef2' : y % 4 === 0 ? '#ff7ec8' : '#5c9a40');
    }
    F.box(2, 16, 2, 9, 16, 9, '#e8eef2'); rec.windows.push([2.5, 2.5, 4.6], [2.5, 6, 4.6]);
  },
  hives(G, B, rec, t, F) { fill(G, SAGE, SAGE2); for (let i = 0; i < 18; i++) G.set(Math.floor(rand(i, 7) * 12), 0, Math.floor(rand(i, 8) * 12), ['#ff7eb6', '#ffd23f', '#c7a8ff', '#ffffff'][i % 4]); for (const [x, z] of [[2, 3], [6, 4], [9, 7]]) { F.box(x, 0, z, x + 1, 2, z + 1, '#f6efe0'); F.box(x, 3, z, x + 1, 3, z + 1, '#e3a52c'); F.set(x, 1, z + 2, '#5b4636'); } },
  hedge(G, B, rec, t, F) { fill(G, SAGE, SAGE2); for (let x = 0; x < 12; x++) for (const z of [0, 1]) { F.set(x, 0, z, '#3f7a3a'); F.set(x, 1, z, x % 3 ? '#4c8a42' : '#3f7a3a'); if (rand(x, z, 5) > 0.75) F.set(x, 2, z, ['#ff7eb6', '#ffffff', '#ffd23f'][x % 3]); } },
  wind(G, B, rec, t, F) {
    fill(G, SAGE, SAGE2);
    for (let x = 4; x <= 8; x++) for (let z = 4; z <= 8; z++) F.set(x, 0, z, '#a3a8ac');
    for (let y = 1; y < 26; y++) for (const [x, z] of [[6, 6], [7, 6], [6, 7], [7, 7]]) F.set(x, y, z, y % 8 === 0 ? '#e1e6ea' : '#f4f6f8');
    F.box(6, 26, 4, 7, 27, 8, '#f4f6f8'); rec.rotor = [3.5, 13.5, 1.6];
  },
  battery(G, B, rec, t, F) { fill(G, '#9aa0a5'); for (const x of [3, 7]) { F.box(x, 0, 4, x + 1, 2, 7, '#6f7f8f'); F.box(x, 3, 4, x + 1, 3, 7, '#8a98a6'); F.box(x, 1, 3, x + 1, 1, 3, '#16c79a'); } F.box(2, 0, 9, 9, 0, 9, '#6b7076'); rec.lamps.push([5.5, 2.5, 5.5]); },
  raingarden(G, B, rec, t, F) {
    fill(G, null, null, (x, z) => { const d = Math.hypot(x - 5.5, z - 5.5); return d < 2.4 ? '#4fb3ea' : d < 4.2 ? '#6b9c42' : SAGE; });
    for (const [x, z] of [[2, 9], [4, 9], [6, 10]]) G.set(x, 0, z, '#c9c0ae');
    for (const [x, z, h] of [[2, 3, 3], [3, 2, 4], [8, 3, 3], [9, 7, 4], [3, 8, 3]]) freed(F, x, z, h); F.set(8, 0, 8, '#ff7eb6'); F.set(2, 0, 6, '#ffd23f');
  },
  reedbed(G, B, rec, t, F) { fill(G, null, null, (x, z) => ((x * 7 + z * 3) % 5 < 2 ? '#4fb3ea' : '#6f9a5a')); for (let i = 0; i < 16; i++) freed(F, Math.floor(rand(i, 4) * 12), Math.floor(rand(i, 5) * 12), 3 + (i % 3)); },
  compost(G, B, rec, t, F) { fill(G, '#9a7a52'); for (const x of [1, 5, 9]) { for (let y = 0; y < 3; y++) for (let i = 0; i < 3; i++) { F.set(x + i, y, 3, y % 2 ? '#7a5232' : '#8a5c38'); F.set(x + i, y, 6, y % 2 ? '#7a5232' : '#8a5c38'); F.set(x, y, 4 + (i % 2), '#7a5232'); F.set(x + 2, y, 4 + (i % 2), '#7a5232'); } F.box(x + 1, 0, 4, x + 1, 1, 5, x === 5 ? '#5f8f3c' : '#5b4030'); } },
  park(G, B, rec, t, F) { fill(G, null, null, (x, z) => (Math.hypot(x - 8, z - 8) < 2.3 ? '#4fb3ea' : (x === 3 || z === 3) ? '#e0b88c' : SAGE)); ftree(F, 1, 1, { h: 2, r: 1 }); ftree(F, 9, 1, { h: 3, r: 2, leaf: ['#c08a3e', '#d39a48', '#b07a36'] }); fbench(F, 5, 6); F.set(1, 0, 9, '#ff7eb6'); F.set(2, 0, 10, '#ffd23f'); },
  greenbridge(G, B, rec, t, F) {
    for (let x = 0; x < 12; x++) for (let z = 0; z < 12; z++) { const h = Math.round(5 * Math.sin(((z + 0.5) / 12) * Math.PI)); for (let y = 0; y <= h; y++) F.set(x, y, z, y === h ? (rand(x, z) > 0.85 ? '#ff7eb6' : '#7aa84a') : y === h - 1 ? '#6b4a2e' : '#8a5c38'); }
    ftree(F, 3, 5, { h: 7, r: 1 }); ftree(F, 8, 6, { h: 7, r: 1, leaf: ['#4f8f3a', '#5c9a40'] });
  },
  festival(G, B, rec, t, F) {
    fill(G, SAGE, SAGE2);
    // a striped tent with bunting strung between two poles
    for (let y = 0; y < 6; y++) { const r = Math.max(0, 4 - Math.floor(y * 0.75)); for (let x = -r; x <= r; x++) for (let z = -r; z <= r; z++) if (Math.max(Math.abs(x), Math.abs(z)) === r || y === 5) F.set(6 + x, y, 6 + z, (x + 6) % 2 ? '#c8553d' : '#f6efe0'); }
    F.set(6, 6, 6, '#ffd23f'); F.box(5, 0, 10, 6, 2, 10, '#3a2a1e');
    for (const x of [0, 11]) for (let y = 0; y < 7; y++) F.set(x, y, 11, '#7a5232');
    for (let x = 1; x < 11; x++) F.set(x, 6 - (x > 2 && x < 9 ? 1 : 0), 11, ['#ffd23f', '#16c79a', '#e8573f', '#3d6e8a'][x % 4]);
    rec.lamps.push([0.5, 3.5, 5.5], [5.5, 3.5, 5.5]);
  },
};
Object.assign(BUILD, FINE2);
