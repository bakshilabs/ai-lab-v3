// The cycle and foot bridge to the next island (user request, Nov 2026: "if you're on an island, what would
// you cycle to?"). Scenery only, off the tile grid: a rope-and-plank suspension bridge with timber towers and
// lanterns leaves the east edge of the town beside one buildable tile (BRIDGE_TILE) and crosses the gap to a
// small floating village with homes, a bus and bike station and a market stall. A few cyclists and walkers
// cross it by day (they stand still with reduce motion). Two meshes for the bridge and village, one for the
// lanterns' night glow, and one per rider. Nothing here changes the simulation or the tiles.
import * as THREE from 'three';
import { Vox, rand, noise2 } from '../engine/voxel.js';
import { insideVoxel, tileOrigin, T } from './terrain.js';
import { BUILD, tree2 } from './builders.js';

export const BRIDGE_TILE = '13,5';
const [TOX, TOZ] = tileOrigin(13, 5);
export const BRIDGE_Z = TOZ + T / 2;              // the deck's centre line (z = 0)
const X_START = TOX + T;                          // the tile's east edge (x = 42), where the deck lands
export const ISLAND_EDGE = (() => { let x = X_START; while (insideVoxel(x + 1, BRIDGE_Z) || insideVoxel(x + 1, BRIDGE_Z - 2) || insideVoxel(x + 1, BRIDGE_Z + 2)) x++; return x + 1; })();
// the rim is cut down to the tile's level along the deck, so the bridge leaves the town on the flat
export const inBridgeCut = (x, z) => x >= X_START - 1 && Math.abs(z + 0.5 - BRIDGE_Z) <= 2.6;
// no tall rim trees beside the approach or in front of it (towards the default camera, south-west), so it reads
export const bridgeKeepClear = (x, z) => x >= X_START - 8 && z >= BRIDGE_Z - 5 && z <= BRIDGE_Z + 18;

const GAP = 11, IRX = 12, IRZ = 10;               // the gap and the village island's radii (world units)
const DECK_W = 2;                                 // half-width of the deck in fine voxels ×2 → 2.5 units wide

export function createBridge(stage, root, { tileTopY }) {
  const Y = tileTopY;                              // deck and village ground level (world y of the tile top)
  const xe = ISLAND_EDGE, xf = xe + GAP;            // the span: main island cliff → village shore
  const cx = xf + IRX - 1, cz = BRIDGE_Z + 1;       // village island centre
  const SAG = 1.1, YV = Y - 2;                      // the village floats a little lower, so the deck dips across
  const deckY = (x) => { if (x <= xe) return Y; if (x >= xf) return YV; const s = (x - xe) / (xf - xe); return Y + (YV - Y) * s - SAG * Math.sin(Math.PI * s); };

  // ---- the village island: coarse voxels like the main island (grass top, turf lip, terracotta keel)
  const g = new Vox(); g.jitter = 0.04;
  const inIsle = (x, z) => { const a = Math.atan2(z - cz, x - cx); const r = Math.hypot((x - cx) / IRX, (z - cz) / IRZ); return r <= 1 + (noise2(Math.cos(a) * 3 + 7, Math.sin(a) * 3 + 7, 55) - 0.5) * 0.22; };
  const top = Math.round(YV) - 1;                   // ground voxel row; buildings stand on top + 1 = YV
  for (let x = cx - IRX - 3; x <= cx + IRX + 3; x++) for (let z = cz - IRZ - 3; z <= cz + IRZ + 3; z++) {
    if (!inIsle(x, z)) continue;
    const r = Math.hypot((x - cx) / IRX, (z - cz) / IRZ);
    const bottom = top - Math.round(4 + 15 * Math.pow(Math.max(0, 1 - r * r), 1.4) + noise2(x / 3, z / 3, 57) * 3);
    for (let y = bottom; y <= top; y++) {
      const dTop = top - y, dBot = y - bottom; let c;
      if (dTop === 0) c = ['#93c275', '#86b86a', '#9bb85e'][Math.floor(rand(x >> 1, z >> 1, 58) * 3)];
      else if (dTop === 1) c = '#8a5a2a';
      else if (dBot <= 1) c = rand(x, y, z) > 0.5 ? '#8a4426' : '#7a3a20';
      else c = ['#d9733f', '#c96535', '#e07f47', '#b85a2e'][(Math.floor(y / 2) + (rand(x >> 1, y >> 1, z >> 1) > 0.75 ? 1 : 0)) % 4];
      g.set(x, y, z, c);
    }
    if (r > 0.6 && rand(x, z, 59) > 0.93) { const len = 2 + Math.floor(rand(x, z, 60) * 4); for (let k = 1; k <= len; k++) g.set(x, bottom - k, z, k === len ? '#4a1c0c' : '#7a3418'); }
  }
  // a sandy lane from the bridge across the island, and a small square in front of the station
  for (let x = xf - 1; x <= cx + 6; x++) for (let dz = -1; dz <= 1; dz++) if (g.has(x, top, BRIDGE_Z + dz)) g.set(x, top, BRIDGE_Z + dz, (x + dz) % 3 ? '#e8b98a' : '#dcae7e');
  for (let x = cx - 2; x <= cx + 3; x++) for (let z = cz + 1; z <= cz + 4; z++) if (g.has(x, top, z)) g.set(x, top, z, (x + z) % 2 ? '#e3d6b6' : '#d6c6a0');
  // small trees (the approved look: small trees), kept off the lane and the buildings
  const busy = new Set();
  const claim = (x0, z0, w, d) => { for (let x = x0 - 1; x <= x0 + w; x++) for (let z = z0 - 1; z <= z0 + d; z++) busy.add(x + ',' + z); };
  for (let x = xf - 1; x <= cx + 7; x++) for (let dz = -2; dz <= 2; dz++) busy.add(x + ',' + (BRIDGE_Z + dz));

  // ---- buildings: the game's own house builders at their fine scale, merged into one mesh
  const f = new Vox(); f.jitter = 0.05; const fineTile = { gx: 0, gz: 0, zone: 'slope', h: 0, k: 'village' };
  const lights = [];
  const place = (item, ox, oz) => {
    const G = new Vox(), B = new Vox(), F = new Vox(), rec = { windows: [], lamps: [], cars: [], rotor: null };
    BUILD[item](G, B, rec, fineTile, F);
    for (const [x, y, z, c] of F.m.values()) f.set(ox * 2 + x, (top + 1) * 2 + y, oz * 2 + z, c);
    for (const [x, y, z, c] of B.m.values()) for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) for (let d = 0; d < 2; d++) f.set((ox + x) * 2 + a, (top + 1 + y) * 2 + b, (oz + z) * 2 + d, c);
    for (const [x, y, z] of [...rec.windows, ...rec.lamps]) lights.push([ox + x, top + 1 + y - 0.5, oz + z]);
    claim(ox, oz, 6, 6);
  };
  place('timber', cx - 6, cz - 8);
  place('straw', cx + 1, cz - 8);
  place('earth', cx + 6, cz - 3);
  place('market', cx - 8, cz + 2);
  // the station: a timber bus and bike shelter with a sign, a bench, a bike rack and a little green bus
  {
    const sx = (cx - 1) * 2, sz = (cz + 5) * 2, sy = (top + 1) * 2; claim(cx - 1, cz + 5, 5, 3);
    f.box(sx, sy, sz, sx + 9, sy, sz + 4, '#cdb48a');                                 // platform
    for (const px of [sx, sx + 9]) for (const pz of [sz, sz + 4]) f.box(px, sy + 1, pz, px, sy + 5, pz, '#7a5232');
    f.box(sx - 1, sy + 6, sz - 1, sx + 10, sy + 6, sz + 5, '#b5523b'); f.box(sx, sy + 7, sz, sx + 9, sy + 7, sz + 4, '#c0563a'); // terracotta roof
    f.box(sx + 1, sy + 1, sz + 4, sx + 8, sy + 4, sz + 4, '#e9d2b0');                   // back wall
    f.box(sx + 2, sy + 2, sz + 3, sx + 7, sy + 2, sz + 3, '#9a6a42');                   // bench
    f.box(sx + 3, sy + 5, sz - 1, sx + 6, sy + 5, sz - 1, '#16c79a');                   // sign board
    f.box(sx + 11, sy + 1, sz, sx + 11, sy + 6, sz, '#3a4752'); f.box(sx + 10, sy + 6, sz, sx + 12, sy + 7, sz, '#2f6fd8'); // bus stop pole
    for (let i = 0; i < 3; i++) { const bx = sx - 4 + i * 2; f.set(bx, sy + 1, sz + 1, '#22262a'); f.set(bx, sy + 1, sz + 3, '#22262a'); f.box(bx, sy + 2, sz + 1, bx, sy + 2, sz + 3, ['#e8573f', '#ffd23f', '#2f6fd8'][i]); } // bikes in the rack
    const bz = sz - 7; f.box(sx - 2, sy, bz, sx + 11, sy + 4, bz + 4, '#5fae4a'); f.box(sx - 2, sy + 2, bz, sx + 11, sy + 3, bz, '#cfeefa'); f.box(sx - 2, sy + 5, bz, sx + 11, sy + 5, bz + 4, '#f1ebe0'); // the little bus
    for (const wx of [sx, sx + 9]) for (const wz of [bz - 1, bz + 5]) f.set(wx, sy, wz, '#22262a');
    lights.push([cx + 1, top + 3.2, cz + 5.2]);
  }
  for (let x = cx - IRX + 2; x <= cx + IRX - 2; x += 3) for (let z = cz - IRZ + 2; z <= cz + IRZ - 2; z += 3) {
    const ox = x + Math.floor(rand(x, z, 61) * 2), oz = z + Math.floor(rand(x, z, 62) * 2);
    if (busy.has(ox + ',' + oz) || !inIsle(ox + 2, oz) || !inIsle(ox - 2, oz) || !inIsle(ox, oz + 2) || !inIsle(ox, oz - 2) || rand(x, z, 63) < 0.45) continue;
    tree2(g, ox, top, oz, rand(x, z, 64) > 0.5 ? 'smalloak' : 'pine', x * 5 + z);
  }

  // ---- the bridge (fine voxels): planks, side posts with rope rails, two timber towers with lanterns
  const F = (v) => Math.round(v * 2);
  const zc = BRIDGE_Z * 2;                                                           // fine z of the centre line
  const x0 = X_START - 1, x1 = xf + 2;
  for (let fx = F(x0); fx <= F(x1); fx++) {
    const x = fx / 2, fy = F(deckY(x)) - 1;                                          // the plank row sits flush with the ground
    for (let dz = -DECK_W * 2; dz <= DECK_W * 2 - 1; dz++) f.set(fx, fy, zc + dz, dz === -DECK_W * 2 || dz === DECK_W * 2 - 1 ? '#7a5232' : (fx >> 1) % 2 ? '#b07a4a' : '#9a6a42');
    if (x > xe && x < xf) { f.set(fx, fy - 1, zc - DECK_W * 2, '#6b4a2e'); f.set(fx, fy - 1, zc + DECK_W * 2 - 1, '#6b4a2e'); } // edge beams under the span
  }
  // towers at both ends of the span: two posts, a cross beam, and a lantern hanging from each post
  const glow = [];
  for (const tx of [xe - 0.5, xf + 0.5]) {
    const fx = F(tx), fy = F(deckY(tx)) - 1;
    for (const side of [-1, 1]) {
      const fz = zc + side * (DECK_W * 2 + 1) - (side > 0 ? 1 : 0);
      f.box(fx, fy - 2, fz, fx + 1, fy + 11, fz, '#7a5232'); f.set(fx, fy + 12, fz, '#5c3c22'); f.set(fx + 1, fy + 12, fz, '#5c3c22');
      const lz = fz + side; f.set(fx, fy + 9, lz, '#3a2a1a'); f.set(fx, fy + 8, lz, '#ffd66b'); f.set(fx, fy + 7, lz, '#3a2a1a'); glow.push([tx, (fy + 8.5) / 2, (lz + 0.5) / 2]);
    }
    f.box(fx, fy + 11, zc - DECK_W * 2 - 1, fx + 1, fy + 11, zc + DECK_W * 2, '#8a5c38');  // cross beam
    f.box(fx, fy + 12, zc - 2, fx + 1, fy + 13, zc + 1, '#c0563a');                      // a terracotta sign on top
  }
  // main ropes from tower top to tower top (sagging below the deck's own sag), with hangers to the deck edge
  const ropeY = (x) => { const s = (x - xe) / (xf - xe); return Y + (YV - Y) * s + 5.5 - (5.5 - 1.4 - SAG) * 4 * s * (1 - s); };
  for (let fx = F(xe); fx <= F(xf); fx++) {
    const x = fx / 2; const ry = F(ropeY(x)); const dy = F(deckY(x));
    for (const side of [-1, 1]) {
      const fz = zc + side * (DECK_W * 2 + 1) - (side > 0 ? 1 : 0);
      f.set(fx, ry, fz, '#d8c08a');                                                     // hemp rope
      f.set(fx, dy + 1, fz, '#c9a86a');                                                 // hand rope
      if (fx % 3 === 0) for (let y = dy; y < ry; y++) f.set(fx, y, fz, y === dy ? '#6b4a2e' : '#cdb07a'); // hangers
    }
  }
  // the short boardwalk across the cut rim gets low rails and a post with a lantern at the town end
  for (let fx = F(x0); fx < F(xe); fx++) for (const side of [-1, 1]) { const fz = zc + side * (DECK_W * 2 + 1) - (side > 0 ? 1 : 0); if (fx % 4 === 0) f.box(fx, F(Y) - 1, fz, fx, F(Y) + 1, fz, '#7a5232'); f.set(fx, F(Y) + 1, fz, '#8a5c38'); }
  { const fx = F(x0) + 1, fz = zc + DECK_W * 2 + 2, fy = F(Y); f.box(fx, fy, fz, fx, fy + 6, fz, '#3a4752'); f.set(fx, fy + 7, fz, '#ffd66b'); f.set(fx, fy + 8, fz, '#3a4752'); glow.push([fx / 2 + 0.25, (fy + 7.5) / 2, fz / 2 + 0.25]); }

  const group = new THREE.Group(); group.name = 'bridge';
  const gm = g.mesh(); const fm = f.mesh({ scale: 0.5 });
  group.add(gm, fm);
  // night glow: windows and lanterns switch on at dusk (solid, like the island's window lights)
  const pts = [...lights, ...glow];
  const lightMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(0.42, 0.42, 0.42), new THREE.MeshBasicMaterial({ color: '#ffd66b' }), pts.length);
  { const d = new THREE.Object3D(); pts.forEach(([x, y, z], i) => { d.position.set(x, y, z); d.scale.setScalar(i >= lights.length ? 1.4 : 1); d.updateMatrix(); lightMesh.setMatrixAt(i, d.matrix); }); }
  lightMesh.visible = false; group.add(lightMesh);

  // ---- riders and walkers crossing (fine-scale voxels, two meshes each, merged into one)
  const COLS = ['#e8573f', '#2f6fd8', '#ffd23f', '#16c79a', '#ff7eb6'];
  const person = (shirt, bike) => {
    const v = new Vox(); v.jitter = 0.02;
    if (bike) { for (const x of [0, 4]) { v.set(x, 0, 0, '#22262a'); v.set(x, 1, 0, '#22262a'); } v.box(1, 1, 0, 3, 1, 0, shirt === '#2f6fd8' ? '#e8573f' : '#2f6fd8'); v.set(3, 2, 0, '#3a4752'); }
    const by = bike ? 2 : 0, bx = bike ? 1 : 2;
    v.box(bx, by, 0, bx, by + 1, 0, '#3a4752'); v.box(bx, by + 2, 0, bx, by + 3, 0, shirt); v.set(bx, by + 4, 0, '#e0b48a'); v.set(bx, by + 5, 0, rand(shirt.length, by) > 0.5 ? '#3a2a1a' : '#c98a3a');
    if (bike) v.set(bx + 1, by + 3, 0, shirt);
    const m = v.mesh({ scale: 0.3, offset: [-0.75, 0, -0.15], castShadow: false }); return m;
  };
  const movers = [];
  [[true, 0], [true, 0.45], [false, 0.2], [false, 0.7]].forEach(([bike, ph], i) => {
    const m = person(COLS[i % COLS.length], bike); group.add(m);
    movers.push({ m, bike, ph, lane: (i % 2 ? 0.55 : -0.55), speed: bike ? 0.045 : 0.018 });
  });
  root.add(group);
  const landing = new THREE.Vector3(X_START, Y, BRIDGE_Z);
  let forceStill = false;
  return {
    group, landing,
    // reduce motion: riders pause where they are
    set reduce(v) { forceStill = !!v; },
    update(dt, t) {
      lightMesh.visible = stage.night > 0.45;
      const hour = stage.hour ?? 12; const day = hour > 6.5 && hour < 21;
      const still = forceStill || document.documentElement.dataset.motion === 'reduce'; // the game's reduce-motion setting
      for (const p of movers) {
        p.m.visible = day; if (!day) continue;
        const k = still ? p.ph : (t * p.speed + p.ph) % 2; const s = k < 1 ? k : 2 - k; const dir = k < 1 ? 1 : -1; // there and back
        const x = X_START + 0.5 + s * (cx - X_START - 0.5);
        const z = BRIDGE_Z + p.lane * dir;
        p.m.position.set(x, deckY(x) + 0.02 + (p.bike || still ? 0 : Math.abs(Math.sin(t * 7 + p.ph * 9)) * 0.06), z);
        p.m.rotation.y = dir > 0 ? 0 : Math.PI;
      }
    },
  };
}
