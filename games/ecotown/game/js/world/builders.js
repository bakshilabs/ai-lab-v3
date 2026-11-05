// Voxel builders for every placeable item, mark, decoration and fixed feature.
// Each tile is drawn as two layers:
//   G: a "ground" layer on a 12×12 half-voxel grid that sits just above the grass (roads, crops, paving);
//   B: a "build" layer on the 6×6 full-voxel grid standing on the tile (houses, trees, turbines).
// rec collects window positions (for night lights), roof tops (for mods) and animated parts.
import { Vox, rand } from '../engine/voxel.js';
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
  wild(G, B, rec, t) { dots(G, 10, ['#ff7eb6', '#ffd23f', '#ffffff', '#b28cff'], 11); if (t && (t.gx + t.gz) % 5 === 0) { B.set(2, 0, 2, '#7a5232'); B.set(2, 1, 2, '#ff7eb6'); } },
};

// ---------- natural decoration for untouched tiles
export function decorate(t, G, B, H) {
  const s = t.gx * 31 + t.gz;
  if (t.zone === 'meadow') dots(G, 14, ['#ff7eb6', '#ffd23f', '#ffffff', '#b28cff'], s);
  if (t.zone === 'slope') dots(G, 4, ['#ffd23f', '#ffffff'], s);
  if (t.zone === 'field') dots(G, 6, ['#8fd96a', '#6cc04b'], s);
  if (t.zone === 'coast') { dots(G, 6, ['#f3e4b8', '#dcc68e'], s); if (rand(s, 2) > 0.6) B.box(1, 0, 3, 2, 0, 3, '#9aa0a5'); }
  if (t.zone === 'wood') { tree(B, 1 + Math.floor(rand(s, 1) * 2), -1, 1 + Math.floor(rand(s, 2) * 2), { kind: rand(s, 3) > 0.5 ? 'pine' : 'round', s: 1 }); if (rand(s, 4) > 0.4) tree(B, 4, -1, 4, { kind: 'round', s: 1 }); }
  if (t.zone === 'wetland') { for (let x = 0; x < 12; x++) for (let z = 0; z < 12; z++) if (Math.hypot(x - 6 + rand(s, 1) * 3, z - 6) < 3.5 + rand(x, z, s) * 1.2) G.set(x, 0, z, '#4fb3ea'); for (let i = 0; i < 7; i++) { const x = Math.floor(rand(i, s) * 6), z = Math.floor(rand(i, s, 1) * 6); if (Math.hypot(x - 3, z - 3) > 1.6) B.box(x, 0, z, x, 1, z, '#6b8f3a'); } }
  if (t.hedge) for (let x = 0; x < 6; x++) { H.set(x, 0, 0, '#2f8a43'); H.set(x, 1, 0, rand(x, s) > 0.8 ? '#ff7eb6' : x % 2 ? '#3f9d4a' : '#2f8a43'); }
}

export { Vox };
