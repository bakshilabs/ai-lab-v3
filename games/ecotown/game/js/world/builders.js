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
  path(G, B, rec) { for (let x = 0; x < 12; x++) for (let z = 4; z < 8; z++) G.set(x, 0, z, '#d9c9a0'); for (let x = 4; x < 8; x++) for (let z = 0; z < 12; z++) G.set(x, 0, z, '#d9c9a0'); for (let z = 0; z < 12; z += 2) G.set(5, 0, z, '#ffffff'); B.set(0, 0, 0, '#7a5232'); B.box(0, 1, 0, 0, 2, 0, '#3a4752'); B.set(0, 3, 0, '#ffe9a8'); rec.lamps.push([0.5, 3.5, 0.5]); B.box(4, 0, 4, 5, 0, 4, '#9a6a42'); },
  cycle(G, B, rec) { for (let x = 0; x < 12; x++) for (let z = 3; z < 9; z++) G.set(x, 0, z, z < 6 ? '#c8553d' : '#d9c9a0'); for (let x = 1; x < 12; x += 4) G.set(x, 0, 4, '#ffffff'); B.box(1, 0, 0, 3, 0, 0, '#46596a'); rec.bikes = true; },
  tram(G, B, rec) { for (let x = 0; x < 12; x++) { G.set(x, 0, 4, '#3a3f45'); G.set(x, 0, 7, '#3a3f45'); for (const z of [5, 6]) G.set(x, 0, z, x % 2 ? '#8a5c38' : '#9a6a42'); } B.box(1, 0, 4, 1, 2, 4, '#3a4752'); B.box(4, 0, 4, 4, 2, 4, '#3a4752'); B.box(0, 3, 3, 5, 3, 5, '#2f6fd8'); B.box(1, 0, 0, 4, 1, 1, '#2f6fd8'); B.box(1, 1, 0, 4, 1, 0, '#bfe6ff'); rec.lamps.push([2.5, 3, 4]); },
  bridge(G, B, rec) { B.box(0, 0, 2, 5, 0, 3, '#9a6a42'); for (let x = 0; x < 6; x += 2) { B.set(x, 1, 1, '#7a5232'); B.set(x, 1, 4, '#7a5232'); } B.box(0, 2, 1, 5, 2, 1, '#7a5232'); B.box(0, 2, 4, 5, 2, 4, '#7a5232'); },

  // ---------- homes
  timber(G, B, rec) { fill(G, '#7cc75a'); houseRec(B, 0, 1, { w: 6, d: 4, h: 3, roof: '#9c4f32', wall: '#c08a56' }, rec); B.set(0, 4, 1, '#c8a27a'); garden(B); },
  straw(G, B, rec) { fill(G, '#86cf60'); houseRec(B, 0, 1, { w: 5, d: 4, h: 2, roof: '#e0ab45', wall: '#f6ecd0' }, rec); garden(B); },
  earth(G, B, rec) { fill(G, '#86cf60'); houseRec(B, 0, 1, { w: 6, d: 4, h: 3, roof: '#7a4a2c', wall: '#c98a5a' }, rec); for (let x = 0; x < 6; x++) B.set(x, 2, 1, '#b07548'); garden(B); },
  reclaimed(G, B, rec) { fill(G, '#7cc75a'); houseRec(B, 0, 1, { w: 6, d: 4, h: 3, roof: '#5a6d80', wall: '#b5523b' }, rec); for (let x = 0; x < 6; x += 2) B.set(x, 1, 1, '#8f3f2c'); },
  cohousing(G, B, rec) { fill(G, '#86cf60'); dots(G, 10, ['#ff7eb6', '#ffd23f', '#ffffff'], 3); houseRec(B, 0, 0, { w: 6, d: 2, h: 3, roof: '#7a4a2c', wall: '#f1dcc0' }, rec); houseRec(B, 0, 4, { w: 6, d: 2, h: 2, roof: '#7a4a2c', wall: '#e6a15a' }, rec); B.set(3, 0, 3, '#7a5232'); B.box(2, 1, 2, 4, 2, 4, '#4caf50'); },
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
  orchard(G, B, rec) { fill(G, '#7cc75a'); for (const [x, z] of [[1, 1], [4, 1], [1, 4], [4, 4]]) { B.box(x, 0, z, x, 1, z, '#7a5232'); B.box(x - 1, 2, z - 1, x + 1, 3, z + 1, '#4caf50'); B.set(x + 1, 3, z, '#e8573f'); B.set(x - 1, 2, z + 1, '#e8573f'); B.set(x, 4, z, '#5bbd5a'); } },
  allot(G, B) { fill(G, null, null, (x, z) => (x % 4 === 3 ? '#d9c9a0' : z % 2 ? '#7a5a3a' : (x + z) % 3 ? '#5fae4a' : '#e8573f')); B.box(5, 0, 5, 5, 1, 5, '#6d8a4a'); B.set(5, 2, 5, '#c0563a'); },
  vertical(G, B, rec) { fill(G, '#9aa0a5'); for (let y = 0; y < 8; y++) for (let x = 1; x < 5; x++) for (let z = 1; z < 5; z++) { const e = x === 1 || x === 4 || z === 1 || z === 4; if (!e) continue; B.set(x, y, z, y % 2 ? '#7fd1c7' : '#5bbd5a'); if (y % 2 && (z === 1) && x % 2) rec.windows.push([x + 0.5, y + 0.5, 0.45]); } B.box(1, 8, 1, 4, 8, 4, '#e8eef2'); },
  hives(G, B) { fill(G, '#86cf60'); dots(G, 16, ['#ff7eb6', '#ffd23f', '#b28cff', '#ffffff'], 7); for (const x of [1, 3]) { B.box(x, 0, 2, x, 1, 2, '#ffffff'); B.set(x, 2, 2, '#ffd23f'); } },
  hedge(G, B) { for (let x = 0; x < 6; x++) { B.set(x, 0, 0, '#2f8a43'); B.set(x, 1, 0, x % 2 ? '#3f9d4a' : '#2f8a43'); } },

  // ---------- water, power and waste
  wind(G, B, rec) { for (let y = 0; y < 13; y++) B.set(3, y, 3, y % 4 === 0 ? '#e1e6ea' : '#f4f6f8'); B.box(3, 13, 2, 3, 13, 4, '#f4f6f8'); rec.rotor = [3.5, 13.5, 1.6]; },
  battery(G, B, rec) { fill(G, '#9aa0a5'); for (const z of [0, 3]) { B.box(0, 0, z, 5, 1, z + 1, '#8e5cd9'); B.box(0, 1, z, 5, 1, z, '#b48cf0'); } rec.lamps.push([5.5, 2.5, 5.5]); },
  raingarden(G, B) { fill(G, null, null, (x, z) => (Math.hypot(x - 5.5, z - 5.5) < 4 ? (Math.hypot(x - 5.5, z - 5.5) < 2.2 ? '#4fb3ea' : '#2f8a43') : '#86cf60')); for (const [x, z] of [[1, 1], [4, 2], [2, 4]]) B.box(x, 0, z, x, 1, z, '#3f9d4a'); },
  reedbed(G, B) { fill(G, null, null, (x, z) => ((x * 7 + z * 3) % 5 < 2 ? '#4fb3ea' : '#5fa86a')); for (let i = 0; i < 9; i++) { const x = Math.floor(rand(i, 4) * 6), z = Math.floor(rand(i, 5) * 6); B.box(x, 0, z, x, 1 + (i % 2), z, i % 3 ? '#6b8f3a' : '#8a6a3a'); } },
  repair(G, B, rec) { fill(G, '#d9c9a0'); houseRec(B, 0, 1, { w: 5, d: 4, h: 3, roof: '#3a4752', wall: '#f1ebe0' }, rec); B.box(0, 3, 0, 4, 3, 0, '#f28c38'); B.set(5, 2, 1, '#9aa0a5'); B.set(5, 3, 1, '#9aa0a5'); },
  compost(G, B) { fill(G, '#9a7a52'); for (const x of [0, 2, 4]) B.box(x, 0, 2, x + 1, 1, 3, x === 2 ? '#5f8f3c' : '#7a5232'); },

  // ---------- complete the town
  school(G, B, rec) { fill(G, null, null, (x, z) => (z > 7 ? (x % 4 === 0 || z === 8 ? '#ffffff' : '#c8553d') : '#86cf60')); houseRec(B, 0, 0, { w: 6, d: 3, h: 3, roof: '#c0563a', wall: '#ffd23f' }, rec); B.box(5, 0, 3, 5, 5, 3, '#9aa0a5'); B.box(4, 4, 3, 4, 5, 3, '#16c79a'); },
  market(G, B, rec) { fill(G, '#e3d6b6', '#d6c6a0'); [['#ff8a5c', 0, 0], ['#2f6fd8', 3, 0], ['#ffd23f', 0, 3], ['#16c79a', 3, 3]].forEach(([c, x, z]) => { B.box(x, 0, z, x, 1, z, '#7a5232'); B.box(x + 2, 0, z, x + 2, 1, z, '#7a5232'); B.box(x, 2, z, x + 2, 2, z + 1, c); B.box(x, 0, z + 1, x + 2, 0, z + 1, '#e8573f'); }); rec.lamps.push([2.5, 3, 2.5]); },
  park(G, B) { fill(G, null, null, (x, z) => (Math.hypot(x - 7, z - 7) < 2.5 ? '#4fb3ea' : (x === 3 || z === 3) ? '#d9c9a0' : '#6cc04b')); tree(B, 0, -1, 0, { s: 1 }); tree(B, 5, -1, 1, { s: 1 }); B.box(2, 0, 5, 3, 0, 5, '#9a6a42'); },
  greenbridge(G, B, rec, s) { for (let x = 0; x < 6; x++) for (let z = 0; z < 6; z++) { const h = Math.round(2.5 * Math.sin(((z + 0.5) / 6) * Math.PI)); for (let y = 0; y <= h; y++) B.set(x, y, z, y === h ? (rand(x, z) > 0.8 ? '#ff7eb6' : '#5fb446') : '#8a5c38'); } B.box(2, 3, 2, 2, 4, 2, '#7a5232'); B.box(1, 5, 1, 3, 6, 3, '#3f9d4a'); },
  hall(G, B, rec) { fill(G, '#e3d6b6'); houseRec(B, 0, 1, { w: 6, d: 4, h: 4, roof: '#c0563a', wall: '#f6efe2' }, rec); for (let x = 0; x < 6; x += 2) B.box(x, 0, 0, x, 3, 0, '#e8e2d4'); B.box(5, 8, 2, 5, 10, 2, '#9aa0a5'); B.set(5, 10, 1, '#16c79a'); },
  festival(G, B, rec) { fill(G, '#7cc75a'); for (let x = 1; x < 5; x++) for (let z = 1; z < 5; z++) for (let y = 0; y < 3 - Math.max(Math.abs(x - 2.5), Math.abs(z - 2.5)) + 1.5; y++) B.set(x, y, z, (x + y) % 2 ? '#ff7eb6' : '#ffffff'); B.box(0, 0, 0, 0, 3, 0, '#7a5232'); B.box(5, 0, 5, 5, 3, 5, '#7a5232'); for (let i = 0; i < 6; i++) B.set(i, 3, i, ['#ffd23f', '#16c79a', '#e8573f'][i % 3]); rec.lamps.push([0.5, 4, 0.5], [5.5, 4, 5.5]); },

  // ---------- fixed features
  oldschool(G, B, rec) { fill(G, null, null, (x, z) => (z > 7 ? (x % 4 === 0 ? '#ffffff' : '#2f6fd8') : '#d9c9a0')); houseRec(B, 0, 0, { w: 5, d: 3, h: 2, roof: '#2f6fd8', wall: '#fff3d6' }, rec); B.box(5, 0, 0, 5, 4, 0, '#9aa0a5'); B.set(5, 4, 1, '#ffd23f'); },
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
  town(G, B) { for (let i = 0; i < 12; i++) for (const [x, z] of [[i, 0], [i, 11], [0, i], [11, i]]) G.set(x, 0, z, '#f2c14e'); for (const [x, z] of [[0, 0], [5, 0], [0, 5], [5, 5]]) B.set(x, 0, z, '#c99a3a'); },
  wild(G, B, rec, t) { const s2 = t ? t.gx * 31 + t.gz : 1; if (rand(s2, 23) > 0.5) { const c = ['#ff7eb6', '#ffd23f', '#ffffff', '#b28cff'][s2 % 4]; for (let x = 0; x < 3; x++) for (let z = 0; z < 3; z++) if ((x + z) % 2 === 0) G.set(4 + x, 1, 4 + z, c); } if (t && (t.gx + t.gz) % 6 === 0) { B.set(2, 0, 2, '#7a5232'); B.set(2, 1, 2, '#7a5232'); B.box(1, 2, 2, 3, 2, 2, '#2e9b5a'); } },
};

// ---------- richer trees: autumn deciduous, olive, cypress, pine (TtC-style mixed palette)
const LEAVES = { round: ['#3f9d3a', '#4caf44', '#5bbd4f', '#2f8a34'], autumn: ['#3f9d3a', '#4caf44', '#5bbd4f'], olive: ['#4caf44', '#5bbd4f', '#3f9d3a'], pine: ['#2e7d4f', '#256b43', '#348a59'], cypress: ['#2e7d4f', '#348a59', '#256b43'] };
export function tree2(v, x, y, z, kind = 'round', seed = 0) {
  const L = LEAVES[kind]; const pick = (i) => L[Math.floor(rand(x + i, y, z + seed) * L.length)];
  const h = 2 + Math.floor(rand(x, z, seed) * 2);
  for (let i = 1; i <= h; i++) v.set(x, y + i, z, '#6b4a2e');
  if (kind === 'cypress') { for (let k = 0; k < 7; k++) { const r = k < 5 ? 1 : 0; for (let dx = -r; dx <= r; dx++) for (let dz = -r; dz <= r; dz++) if (Math.abs(dx) + Math.abs(dz) <= r) v.set(x + dx, y + h + k, z + dz, pick(k + dx)); } v.set(x, y + h + 7, z, L[0]); return; }
  if (kind === 'pine') { for (let l = 0; l < 4; l++) { const r = 2 - Math.floor(l / 2); for (let dx = -r; dx <= r; dx++) for (let dz = -r; dz <= r; dz++) if (Math.abs(dx) + Math.abs(dz) <= r + 1) v.set(x + dx, y + h + l, z + dz, pick(l * 3 + dx)); } v.set(x, y + h + 4, z, L[1]); return; }
  const r = kind === 'olive' ? 2 : 2 + (rand(x, z, 7) > 0.6 ? 1 : 0);
  for (let dx = -r; dx <= r; dx++) for (let dy = 0; dy <= r * 2 - 1; dy++) for (let dz = -r; dz <= r; dz++) {
    const d = Math.hypot(dx, (dy - r + 0.5) * 1.15, dz); if (d <= r + 0.4 && rand(x + dx, dy, z + dz + seed) > 0.1) v.set(x + dx, y + h + dy, z + dz, pick(dx * 7 + dy * 3 + dz));
  }
}

// ---------- natural decoration for untouched tiles
export function decorate(t, G, B, H) {
  const s = t.gx * 31 + t.gz;
  // meadows: an occasional bold flower bed (one colour) instead of scattered specks
  if (t.zone === 'meadow' && rand(s, 13) > 0.66) { const c = ['#ff7eb6', '#ffd23f', '#ffffff', '#b28cff'][s % 4]; const x0 = 2 + Math.floor(rand(s, 14) * 6), z0 = 2 + Math.floor(rand(s, 15) * 6), n = 2 + (s % 2); for (let x = 0; x < n; x++) for (let z = 0; z < n; z++) if ((x + z) % 2 === 0 || n === 2) G.set(x0 + x, 1, z0 + z, c); }
  if (t.zone === 'coast') {
    const r = rand(s, 2);
    if (r > 0.86) { B.box(1, 0, 2, 2, 1, 3, '#9aa0a5'); B.set(2, 2, 2, '#8b8f93'); }
    else if (r > 0.74) { G.box(2, 1, 2, 2, 5, 2, '#8a5c38'); for (let i = 0; i < 5; i++) G.box(0 + i, 6 - Math.abs(i - 2), 0 + i, 0 + i, 6 - Math.abs(i - 2), 4 - i + 2, ['#ff8a5c', '#ffffff', '#3a6fc9'][i % 3]); }
  }
  if (t.zone === 'wood') { tree2(B, 1 + Math.floor(rand(s, 1) * 2), -1, 1 + Math.floor(rand(s, 2) * 2), ['pine', 'round', 'pine'][s % 3], s); if (rand(s, 4) > 0.3) tree2(B, 4, -1, 4, ['round', 'pine', 'round'][(s + 1) % 3], s + 1); }
  if ((t.zone === 'field' || t.zone === 'slope') && rand(s, 9) > 0.88) tree2(B, rand(s, 10) > 0.5 ? 0 : 5, -1, Math.floor(rand(s, 11) * 6), ['round', 'pine'][s % 2], s);
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
      if (front) { F.set(x0 + x - 1 + ox, y, z0 + z + oz, shutter); F.set(x0 + x + 1 + ox, y, z0 + z + oz, shutter); }
      if (side) { F.set(x0 + x + ox, y, z0 + z - 1 + oz, shutter); F.set(x0 + x + ox, y, z0 + z + 1 + oz, shutter); }
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
  timber(G, B, rec, t, F) {
    fill(G, '#6fc444'); const plank = (x, y, z) => ((x + z) % 2 ? '#c08a56' : '#b07a48');
    fhouse(F, 1, 2, 5, 6, 7, { wall: '#c08a56', stripes: plank, roof: '#9c4f32', shutter: '#3f6b3a' }, rec);
    fhouse(F, 6, 2, 5, 6, 7, { wall: '#c08a56', stripes: plank, roof: '#a85a3a', shutter: '#2f5f8a' }, rec);
    fgarden(F, 1, 9, 10, 11, t?.gx || 1);
  },
  straw(G, B, rec, t, F) { fill(G, '#7fd04f'); fhouse(F, 2, 2, 8, 6, 5, { wall: '#f6ecd0', roof: '#d9a441', roofType: 'thatch', shutter: '#5b7fbf', trim: '#e8d7a8' }, rec); fgarden(F, 1, 9, 10, 11, (t?.gz || 2) + 5); },
  earth(G, B, rec, t, F) { fill(G, '#6fc444'); const bands = (x, y) => (Math.floor(y / 2) % 2 ? '#c98a5a' : '#b87a4c'); fhouse(F, 1, 2, 10, 6, 7, { wall: '#c98a5a', stripes: bands, roof: '#5f9a45', roofType: 'flat', shutter: '#8a4f2a', trim: '#e9d2b0' }, rec); fgarden(F, 1, 9, 10, 11, 3); },
  reclaimed(G, B, rec, t, F) { fill(G, '#6fc444'); const brick = (x, y, z) => ((x + z + (y % 2)) % 3 === 0 ? '#a24a35' : y % 3 === 0 ? '#c9b8a2' : '#b5523b'); fhouse(F, 1, 2, 5, 6, 8, { wall: '#b5523b', stripes: brick, roof: '#5a6d80', shutter: '#e8e2d4' }, rec); fhouse(F, 6, 2, 5, 6, 8, { wall: '#b5523b', stripes: brick, roof: '#4f6274', shutter: '#3f6b3a' }, rec); fgarden(F, 1, 9, 10, 11, 7); },
  cohousing(G, B, rec, t, F) { fill(G, '#7fd04f'); fhouse(F, 1, 1, 10, 4, 6, { wall: '#f1dcc0', roof: '#b9603e', shutter: '#4f7f6a' }, rec); fhouse(F, 1, 7, 4, 4, 5, { wall: '#e6a15a', roof: '#a85a3a', chimney: false }, rec); fhouse(F, 7, 7, 4, 4, 5, { wall: '#f3c9a0', roof: '#a85a3a', chimney: false }, rec); F.set(5, 0, 8, '#6b4a2e'); F.set(5, 1, 8, '#6b4a2e'); F.box(4, 2, 7, 6, 4, 9, '#5c9a40'); },
  concrete(G, B, rec, t, F) { fill(G, '#9aa0a5'); const grid = (x, y) => (y % 4 === 0 ? '#8f959a' : '#a7acb0'); fhouse(F, 1, 1, 10, 9, 18, { wall: '#a3a8ac', stripes: grid, roof: '#7d8286', roofType: 'flat', trim: '#8f959a', shutter: '#8f959a', floorH: 4, balcony: true }, rec); F.box(7, 19, 3, 8, 20, 4, '#c8ced2'); },
  school(G, B, rec, t, F) { fill(G, null, null, (x, z) => (z > 8 ? (x % 4 === 0 || z === 9 ? '#ffffff' : '#c8553d') : '#6fc444')); fhouse(F, 0, 1, 12, 6, 8, { wall: '#ffe08a', roof: '#c0563a', shutter: '#2f6fd8', floorH: 4 }, rec); F.box(10, 0, 8, 10, 10, 8, '#9aa0a5'); F.set(10, 11, 8, '#16c79a'); F.set(9, 10, 8, '#16c79a'); },
  hall(G, B, rec, t, F) { fill(G, '#e3d6b6'); fhouse(F, 1, 3, 10, 7, 10, { wall: '#f6efe2', roof: '#c0563a', shutter: '#c0563a', floorH: 5 }, rec); for (let x = 1; x < 12; x += 3) F.box(x, 0, 1, x, 8, 1, '#e8e2d4'); F.box(0, 9, 0, 11, 9, 2, '#f6efe2'); F.box(10, 15, 6, 10, 18, 6, '#9aa0a5'); F.set(10, 18, 5, '#16c79a'); },
  repair(G, B, rec, t, F) { fill(G, '#d9c9a0'); fhouse(F, 1, 3, 9, 6, 7, { wall: '#f1ebe0', roof: '#3a4752', shutter: '#f28c38' }, rec); for (let x = 1; x < 10; x++) { F.set(x, 4, 1, x % 2 ? '#f28c38' : '#ffffff'); F.set(x, 4, 2, x % 2 ? '#f28c38' : '#ffffff'); } F.box(10, 0, 4, 11, 1, 5, '#2f6fd8'); },
  oldschool(G, B, rec, t, F) { fill(G, null, null, (x, z) => (z > 8 ? (x % 4 === 0 ? '#ffffff' : '#2f6fd8') : '#d9c9a0')); fhouse(F, 0, 1, 9, 6, 6, { wall: '#fff3d6', roof: '#2f6fd8', shutter: '#2f6fd8' }, rec); F.box(10, 0, 2, 11, 9, 3, '#fff3d6'); F.box(10, 10, 2, 11, 11, 3, '#2f6fd8'); F.set(10, 8, 1, '#ffd23f'); },
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
  if (mod === 'heatpump') { F.box(10, 0, 9, 11, 1, 10, '#e8eef2'); F.set(11, 1, 10, '#9aa0a5'); return; }
  for (const [k, y] of top) {
    const [x, z] = k.split(',').map(Number); if (y < 5) continue;
    if (mod === 'solar' && z >= 1 && z <= 4 && x % 5 !== 0) F.set(x, y + 1, z, (x + z) % 2 ? '#22356a' : '#2e4785');
    if (mod === 'greenroof') F.set(x, y + 1, z, rand(x, z, 3) > 0.85 ? '#ffd23f' : rand(x, z) > 0.5 ? '#5c9a40' : '#6aab4a');
  }
}
