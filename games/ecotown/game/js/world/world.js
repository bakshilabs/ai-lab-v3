// The island in three.js: terrain mesh, water, per-tile layers (decoration, mark, build, ghost, lens overlay),
// window lights, turbine rotors and picking. Reads terrain + cells; never decides anything itself.
import * as THREE from 'three';
import { Vox, WORLD, rand, noise2, clipMaterial } from '../engine/voxel.js';
import { clouds, waterfall, roots, floatingRocks } from '../engine/extras.js';
import { ease, clamp } from '../engine/stage.js';
import { T, X0, Z0, RX, RZ, zoneAt, rimHeight, canyonDepth, isLimestone, insideVoxel, inRiverVoxel, riverX, SPRING, LAGOON, tileAt, tileOrigin, tileCenter, ZONES } from './terrain.js';
import { BUILD, MARK, addMod, addModFine, decorate, tree2, bigOakAt } from './builders.js';
import { ITEMS } from './catalog.js';
import { planStages } from './construct.js';
import { createBridge, inBridgeCut, bridgeKeepClear, BRIDGE_TILE } from './bridge.js';

const HEDGE_SAFE = new Set(['mixed', 'orchard', 'hives', 'hedge', 'path', 'cycle', 'park', 'allot', 'greenbridge']);
// Plan preview: solid, pale, shaded blocks (nothing see-through), told apart from real builds by a raised frame
const GHOST_MAT = new THREE.MeshLambertMaterial({ color: '#f4f1ea' });
// the plan preview is colour-coded by what Florence plans to put there (her plan, before it is real)
const GHOST_COL = { land: '#ffd23f', move: '#ff8a3d', homes: '#ff6f9a', food: '#7ddc5a', power: '#7fd0ff', heart: '#c79bff' };
const ghostMats = new Map();
const ghostMat = (lv) => { if (!ghostMats.has(lv)) ghostMats.set(lv, new THREE.MeshLambertMaterial({ color: new THREE.Color(GHOST_COL[lv] || '#ffffff').lerp(new THREE.Color('#ffffff'), 0.45) })); return ghostMats.get(lv); };
const GHOST_BAD = new THREE.MeshLambertMaterial({ color: '#ffb3a6' });

function zoneAtVoxel(x0, z0) {
  // wobble the boundaries a little so zones blend instead of following the tile grid
  return zoneAt(x0 + (noise2(x0 * 0.18, z0 * 0.18, 31) - 0.5) * 3, z0 + (noise2(x0 * 0.18, z0 * 0.18, 47) - 0.5) * 3);
}
// sage and olive greens with ochre dry grass on the slope and fields: the warm brochure palette, not lime
const TOPS = {
  // each zone its own value and temperature, so a child can tell them apart: lush cool meadow, golden dry
  // fields, olive slope, dark forest floor, teal wetland
  rim: ['#8fae55', '#9bb85e', '#a7b766', '#c9a86a'], meadow: ['#86b86a', '#93c275', '#7aad60'], wetland: ['#6ea67f', '#7ab289', '#639a74'],
  wood: ['#5d8743', '#68924d', '#53793b'], slope: ['#a9bb5c', '#b6c467', '#9fae52'], field: ['#cdb56c', '#d8c27a', '#bfa65c', '#b3b464'],
  coast: ['#f6d2a2', '#f0c38c', '#fadfb8'],
};
const LIME = ['#e8874c', '#d9733f', '#c4622f', '#f09a5a']; // terracotta mesa (rover palette)
const tint = (hex, k) => { const n = parseInt(hex.slice(1), 16); const f = (v) => Math.max(0, Math.min(255, Math.round(v * k))); return '#' + [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => f(v).toString(16).padStart(2, '0')).join(''); };

export function createWorld(stage, terrain) {
  const { scene } = stage;
  const root = new THREE.Group(); scene.add(root);
  const tileH = (gx, gz) => terrain.tiles.get(gx + ',' + gz)?.h ?? 0;

  // ---------------- terrain mesh: buildable tile area + a dramatic rim (limestone massif, terraced hills, tiered pines,
  //                  big oaks, a spring waterfall) and a deep brown underside with streaks and hanging roots
  const v = new Vox(); v.jitter = 0.04; const water = new Vox(); water.jitter = 0.03; const riverCells = [];
  const inTiles = (x, z) => { const tt = tileAt(x, z); return tt && terrain.tiles.has(tt[0] + ',' + tt[1]) ? tt : null; };
  const rimH0 = (x, z) => Math.round(rimHeight(x, z) * Math.min(1, Math.max(0, (Math.abs(x + 0.5 - riverX(z)) - 2.5) / 6)));
  const bridgeH = terrain.tiles.get(BRIDGE_TILE)?.h ?? 0; // the rim is cut to the bridge tile's level where the bridge leaves the town
  const rimH = (x, z) => (inBridgeCut(x, z) ? Math.min(rimH0(x, z), bridgeH) : rimH0(x, z));
  const canyonBed = (x, z) => { const d = canyonDepth(x, z); return d ? Math.min(rimH(x, z), 0) - d + Math.min(rimH(x, z), 0) * 0 : null; };
  const heightAt = (x, z) => { if (!insideVoxel(x, z)) return null; if (inRiverVoxel(x, z)) return -1; const tt = inTiles(x, z); if (tt) return tileH(tt[0], tt[1]); const cb = canyonBed(x, z); return cb != null ? Math.min(rimH(x, z), cb) : rimH(x, z); };
  // warm sandstone strata exposed wherever the land drops into a canyon
  const SAND = ['#f0955a', '#d9733f', '#b85a2e', '#f6ab70', '#9a4424', '#e07f47'];
  const nearCanyon = (x, z) => { for (let dx = -3; dx <= 3; dx++) for (let dz = -3; dz <= 3; dz++) if (canyonDepth(x + dx, z + dz)) return true; return false; };
  const dither = (pal, x, z) => { const bx = x >> 1, bz = z >> 1; const n = rand(bx, bz, 3) * 0.75 + rand(x, z, 4) * 0.25 + (noise2(x * 0.12, z * 0.12, 9) - 0.5) * 0.7; return pal[n < 0.33 ? 2 : n < 0.7 ? 0 : 1]; };
  const rimCells = [];
  for (let x = -RX - 4; x <= RX + 4; x++) for (let z = -RZ - 4; z <= RZ + 4; z++) {
    if (!insideVoxel(x, z)) continue;
    const tt = inTiles(x, z); const river = inRiverVoxel(x, z); const top = heightAt(x, z);
    const r = Math.hypot(x / RX, z / RZ);
    const beach = !tt && z > 18 && top <= 1;
    // zones blend at their edges, but the protected wetland is painted exactly on its own tiles, so what
    // looks like wetland always follows the wetland rule
    const tz = tt ? terrain.tiles.get(tt[0] + ',' + tt[1]).zone : null; const zw = tt ? zoneAtVoxel(x, z) : null;
    const zone = tt ? (tz === 'wetland' || zw === 'wetland' ? tz : zw) : beach ? 'coast' : 'rim';
    const lime = !tt && isLimestone(x, z, top);
    // a tapered keel underneath (deep in the middle, thin at the rim), measured from the uncarved land, so
    // canyons don't hang down under the island like loose pillars
    const bottom = Math.max(0, rimH(x, z), tt ? top : 0) - Math.round(10 + 26 * Math.pow(Math.max(0, 1 - r * r), 1.5) + noise2(x / 3, z / 3, 86) * 5);
    const under = top - bottom;
    const edge = !insideVoxel(x + 1, z) || !insideVoxel(x - 1, z) || !insideVoxel(x, z + 1) || !insideVoxel(x, z - 1);
    for (let y = bottom; y <= top; y++) {
      let c; const dTop = top - y, dBot = y - bottom;
      if (dTop === 0) c = river ? '#d9c79a' : !tt && canyonDepth(x, z) ? ['#f2b07a', '#e8955c', '#f6c08e'][Math.floor(rand(x, z, 6) * 3)] : lime ? (top >= 12 ? ['#f3dcb4', '#e9cfa2'][Math.floor(rand(x >> 1, z >> 1, 5) * 2)] : ['#f6ab70', '#f2b07a', '#e8955c'][Math.floor(rand(x >> 1, z >> 1, 5) * 3)]) : dither(TOPS[zone], x, z);
      // a subtle grid on the buildable land: alternate tiles a touch lighter, and a slightly darker line between tiles
      if (dTop === 0 && tt && !river) { const lx = ((x - X0) % T + T) % T, lz = ((z - Z0) % T + T) % T; c = tint(c, ((tt[0] + tt[1]) % 2 ? 1.04 : 1) * (lx === 0 || lz === 0 ? 0.93 : 1)); }
      else if (lime && y > 0) c = ['#e07f47', '#d06d3a', '#e8874c', '#c4622f'][(Math.floor(y / 2) + (rand(x >> 1, y >> 1, z >> 1) > 0.8 ? 1 : 0)) % 4]; // terracotta mesa cliffs
      else if (!tt && dTop > 1 && dBot > 2 && nearCanyon(x, z)) c = SAND[(((y + 40) >> 1) + (rand(x, z, y) > 0.85 ? 1 : 0)) % 6]; // canyon strata
      else if (dTop <= 1 && !river) c = zone === 'coast' ? '#eab47a' : '#8a5a2a';                           // turf lip
      else if (dBot <= 2) c = rand(x, y, z) > 0.5 ? '#8a4426' : '#7a3a20';                                  // warm base (not black in shadow)
      else { const streak = (Math.floor(x * 1.7 + z * 2.3) & 3); c = ['#d9733f', '#c96535', '#e07f47', '#b85a2e'][(Math.floor(y / 2) + (rand(x >> 1, y >> 1, z >> 1) > 0.75 ? 1 : 0) + (streak === 0 ? 1 : 0)) % 4]; } // terracotta earth in chunky blocks
      v.set(x, y, z, c);
    }
    // dark root tips under the rim
    if (r > 0.55 && rand(x, z, 77) > 0.94) { const by = top - under; const len = 2 + Math.floor(rand(x, z, 78) * 5); for (let k = 1; k <= len; k++) v.set(x, by - k, z, k === len ? '#4a1c0c' : '#7a3418'); }
    if (edge && rand(x, z, 31) > 0.86) { const nx = insideVoxel(x + 1, z) ? -1 : 1; const y0 = top - 3 - Math.floor(rand(x, z, 32) * 5); v.set(x + nx, y0, z, '#b85a2e'); v.set(x + nx, y0 + 1, z, '#5fbf3f'); }
    if (river) { water.set(x, 0, z, rand(x, 9, z) > 0.5 ? '#3fa2e6' : '#4aaeea'); riverCells.push([x, z]); }
    // gorge streams pool on the canyon floor and stop short of the island's edge (nothing pours off the island)
    const cd = !tt && canyonDepth(x, z); if (cd && cd >= 12 && insideVoxel(x + 5, z) && insideVoxel(x - 5, z) && insideVoxel(x, z + 5) && insideVoxel(x, z - 5)) water.set(x, top + 1, z, '#3fa2e6');
    if (!tt && !river && !edge && !cd && !inBridgeCut(x, z)) rimCells.push([x, z, top, zone, lime]);
  }
  // the river's source: a mossy rock outcrop behind the spring pool, with a little fall from its top into the pool
  const springTop = 8; const sx = Math.round(SPRING.x), sz = Math.round(SPRING.z - SPRING.r - 1);
  for (let dx = -5; dx <= 5; dx++) for (let dz = -4; dz <= 1; dz++) {
    const base = heightAt(sx + dx, sz + dz); if (base == null || inRiverVoxel(sx + dx, sz + dz)) continue;
    const hgt = Math.round(springTop * (1 - Math.abs(dx) / 6.5) * (dz > -1 ? 0.75 : 1) - rand(dx, dz, 81) * 1.5);
    for (let y = base + 1; y <= Math.max(base, hgt); y++) v.set(sx + dx, y, sz + dz, y === Math.max(base, hgt) && rand(dx, dz, 82) > 0.35 ? '#7fa858' : rand(dx, y, dz) > 0.5 ? '#bfb29a' : '#a99c84');
  }
  // the lagoon behind the beach: reeds and a few stones round its rim
  for (let a = 0; a < 40; a++) {
    const ang = (a / 40) * Math.PI * 2; const x = Math.round(LAGOON.x + Math.cos(ang) * (LAGOON.r / 0.85 + 0.6)), z = Math.round(LAGOON.z + Math.sin(ang) * (LAGOON.r + 0.6));
    const top = heightAt(x, z); if (top == null || inRiverVoxel(x, z)) continue;
    if (rand(x, z, 91) > 0.45) { v.set(x, top + 1, z, '#7fb54a'); if (rand(x, z, 92) > 0.5) v.set(x, top + 2, z, '#9cc45a'); } else if (rand(x, z, 93) > 0.7) v.set(x, top + 1, z, '#9aa0a5');
  }
  // grey boulders at the foot of the massif and on the beach
  for (const [x, z, top, zone, lime] of rimCells) {
    const p = rand(x, z, 41);
    if ((zone === 'rim' && !lime && top >= 2 && p > 0.988) || (zone === 'coast' && p > 0.992)) {
      const s2 = zone === 'coast' ? 1 : 1 + Math.floor(rand(x, z, 42) * 2);
      for (let dx = -s2; dx <= s2; dx++) for (let dz = -s2; dz <= s2; dz++) for (let dy = 1; dy <= s2 + 1; dy++) if (Math.hypot(dx, dz, (dy - 1) * 1.2) <= s2 + 0.3) v.set(x + dx, top + dy, z + dz, dy === s2 + 1 ? '#cfc4ae' : rand(dx, dy, dz) > 0.5 ? '#bfb29a' : '#a99c84');
    }
  }
  for (const [x, z, top, zone, lime] of rimCells) { if (zone === 'rim' && !lime && rand(x, z, 71) > 0.985) { v.set(x, top + 1, z, rand(x, z, 72) > 0.5 ? '#7c5a3a' : '#8b8f93'); if (rand(x, z, 73) > 0.6) v.set(x + 1, top + 1, z, '#6e4f33'); } }
  // the beach rim: dune grass, driftwood and shells so the sand is never a blank sheet
  for (const [x, z, top, zone] of rimCells) {
    if (zone !== 'coast') continue; const p = rand(x, z, 61);
    if (noise2(x / 5, z / 5, 63) > 0.72 && p > 0.55) { v.set(x, top + 1, z, p > 0.8 ? '#8fa65a' : '#a9b86a'); }
    else if (p < 0.003) { for (let k = 0; k < 2; k++) v.set(x + k, top + 1, z, '#a07a50'); }
    
  }
  // forest on the rim: tall tiered pines up high, big oaks lower down; fewer, bigger, denser clumps
  const used = new Set();
  for (const [x, z, top, zone, lime] of rimCells) {
    if (zone !== 'rim' || x % 4 || z % 4 || bridgeKeepClear(x, z)) continue; // keep the bridge approach clear and in view
    const mask = noise2(x / 12, z / 12, 17) + (top >= 3 ? 0.25 : 0) - (lime ? 0.7 : 0);
    if (mask < 0.6 || rand(x, z, 19) < 0.25 || nearCanyon(x, z)) continue; // a thinner forest that leaves the canyons open
    const ox = x + Math.floor(rand(x, z, 20) * 3) - 1, oz = z + Math.floor(rand(x, z, 21) * 3) - 1; const k = ox + ',' + oz; if (used.has(k)) continue; used.add(k);
    const h0 = heightAt(ox, oz); if (h0 == null || h0 < 0) continue;
    const nearTown = (() => { for (let dx = -6; dx <= 6; dx += 3) for (let dz = -6; dz <= 6; dz += 3) if (inTiles(ox + dx, oz + dz)) return true; return false; })();
    tree2(v, ox, h0, oz, nearTown ? (rand(x, z, 22) > 0.5 ? 'pine' : 'smalloak') : top >= 4 || lime ? 'tallpine' : rand(x, z, 22) > 0.4 ? 'oak' : 'tallpine', x * 7 + z); // small trees beside the town, taller ones up on the rim
  }
  // landmarks: a giant oak at the meadow's rim edge, an old stone windmill on a rim hill
  const giant = [-44, 6]; bigOakAt(v, giant[0], Math.max(0, heightAt(...giant) ?? 0), giant[1]);
  const millAt = [-30, -36]; const millY = Math.max(0, heightAt(...millAt) ?? 0);
  // the old windmill, at house scale (it used to tower over everything)
  for (let y = 1; y <= 6; y++) for (let dx = -2; dx <= 2; dx++) for (let dz = -2; dz <= 2; dz++) { const rr = y > 4 ? 1.2 : 1.6; if (Math.hypot(dx, dz) <= rr) v.set(millAt[0] + dx, millY + y, millAt[1] + dz, (y + dx + dz) % 3 ? '#e9e1d0' : '#d8cdb6'); }
  for (let y = 7; y <= 8; y++) { const rr = 1.8 - (y - 7) * 0.9; for (let dx = -2; dx <= 2; dx++) for (let dz = -2; dz <= 2; dz++) if (Math.hypot(dx, dz) <= rr) v.set(millAt[0] + dx, millY + y, millAt[1] + dz, '#b5523b'); }
  v.set(millAt[0], millY + 1, millAt[1] + 2, '#6b4a2e'); v.set(millAt[0], millY + 4, millAt[1] + 2, '#3d5a73');
  // spring waterfall from the massif down to the river head (water cells for the stream on the hill)
  roots(v, insideVoxel, { rx: RX, rz: RZ, top: 0, count: 26, seed: 4 });
  const ground = v.mesh(); ground.castShadow = true; ground.receiveShadow = true; root.add(ground);
  // the cycle and foot bridge to the village island (scenery, off the tile grid; see bridge.js)
  const bridge = createBridge(stage, root, { tileTopY: bridgeH + 1 });
  // windmill sails
  const sails = new THREE.Group(); { const mat = new THREE.MeshLambertMaterial({ color: '#f6efe2' }); const arm = new THREE.MeshLambertMaterial({ color: '#7a5232' });
    for (let i = 0; i < 4; i++) { const g = new THREE.Group(); const a1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.5, 0.25), arm); a1.position.y = 2.25; const sl = new THREE.Mesh(new THREE.BoxGeometry(1.1, 3.5, 0.12), mat); sl.position.set(0.7, 2.6, 0); g.add(a1, sl); g.rotation.z = i * Math.PI / 2; sails.add(g); }
    sails.position.set(millAt[0] + 0.5, millY + 6.5, millAt[1] + 2.4); sails.traverse((o) => { if (o.isMesh) o.castShadow = true; }); root.add(sails); }
  const islets = floatingRocks(scene, { n: 6, center: [0, -6, 0], radius: 95, seed: 8 });
  const waterMesh = water.mesh({ castShadow: false });
  const uTime = { value: 0 }; const uIce = { value: 0 };
  waterMesh.material = new THREE.MeshLambertMaterial({ vertexColors: true }); // solid water: colour and moving ripples, not see-through
  waterMesh.material.onBeforeCompile = (sh) => {
    sh.uniforms.uTime = uTime; sh.uniforms.uClay = WORLD.clay; sh.uniforms.uIce = uIce;
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vWP;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvWP = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nuniform float uTime; uniform float uClay; uniform float uIce; varying vec3 vWP;')
      .replace('#include <color_fragment>', `#include <color_fragment>
        float f = sin(vWP.z * 0.9 - uTime * 2.4 + sin(vWP.x * 1.7) * 0.8) * 0.5 + 0.5;
        diffuseColor.rgb *= 0.9 + 0.22 * smoothstep(0.75, 1.0, f);
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.7, 0.86, 0.95), uClay * 0.6);
        float crack = step(0.93, fract(sin(dot(floor(vWP.xz * 1.3), vec2(12.9898, 78.233))) * 43758.5453));
        diffuseColor.rgb = mix(diffuseColor.rgb, mix(vec3(0.86, 0.94, 1.0), vec3(0.7, 0.82, 0.92), crack), uIce * 0.85);
`);
  };
  waterMesh.position.y = -0.35; root.add(waterMesh);
  // falls that land on the island: the spring over its outcrop into the pool, and the massif spring
  const falls = [waterfall(scene, { x: SPRING.x, y: springTop - 0.5, z: sz - 1.2, dir: [0, 1], width: 2, length: springTop + 0.2 }),
    waterfall(scene, { x: 14, y: heightAt(14, -31) + 0.5, z: -31, dir: [0, 1], width: 2, length: Math.max(4, heightAt(14, -31) - 1) })];
  const cloudUpd = clouds(scene, { n: 8, spread: 300, y: [25, 55], z: [-200, -110], scale: 2.2, seed: 5 });
  const cloudSea = () => {};

  // ---------------- per-tile layers
  const layers = new Map();
  const meshLayer = (G, B, ox, oy, oz, F = null) => {
    const g = new THREE.Group();
    if (F && F.size) { const m = F.mesh({ scale: 0.5 }); m.position.set(ox, oy + 1, oz); g.add(m); }
    if (G.size) { const m = G.mesh({ scale: 0.5, castShadow: false }); m.position.set(ox, oy + 0.62, oz); g.add(m); }
    if (B.size) { const m = B.mesh(); m.position.set(ox, oy + 1, oz); g.add(m); }
    return g;
  };
  for (const t of terrain.tiles.values()) {
    const [ox, oz] = tileOrigin(t.gx, t.gz);
    const L = { t, ox, oz, oy: t.h, group: new THREE.Group(), deco: null, hedge: null, mark: null, build: null, ghost: null, overlay: null, rec: null, rotor: null };
    const G = new Vox(), B = new Vox(), H = new Vox(); G.jitter = B.jitter = 0.06;
    if (t.zone !== 'river') decorate(t, G, B, H);
    L.deco = meshLayer(G, B, ox, t.h, oz); L.group.add(L.deco);
    if (H.size) { L.hedge = meshLayer(new Vox(), H, ox, t.h, oz); L.group.add(L.hedge); }
    if (t.fixed) { const G2 = new Vox(), B2 = new Vox(), F2 = new Vox(); F2.jitter = 0.05; const rec = newRec(); BUILD[t.fixed](G2, B2, rec, t, F2); L.fixed = meshLayer(G2, B2, ox, t.h, oz, F2); L.fixedRec = rec; L.group.add(L.fixed); L.deco.visible = false; }
    root.add(L.group); layers.set(t.k, L);
  }

  // ---------------- build-highlight kerbs for all tiles at once (see setOverlay)
  const KERB_MAX = 1800;
  const kerbs = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: '#ffffff' }), KERB_MAX);
  kerbs.frustumCulled = false; kerbs.count = 0; kerbs.visible = false; kerbs.setColorAt(0, new THREE.Color('#ffffff')); root.add(kerbs);

  // ---------------- night lights (windows and lamps), one instanced mesh
  const MAXL = 1600;
  const lightMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(0.42, 0.42, 0.42), new THREE.MeshBasicMaterial({ color: '#ffd66b' }), MAXL);
  lightMesh.frustumCulled = false; lightMesh.count = 0; root.add(lightMesh);
  // street lamps also throw a warm pool of light on the ground at night (art pass, Nov 2026): a solid, flat,
  // eight-sided patch just above the paving, depth-tested like the tile kerbs, so it never covers a build or Florence
  const MAXP = 320;
  const poolMesh = new THREE.InstancedMesh(new THREE.CylinderGeometry(1.75, 1.75, 0.04, 8), new THREE.MeshBasicMaterial({ color: '#f3c27a', polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 }), MAXP);
  const poolCore = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.95, 0.95, 0.05, 8), new THREE.MeshBasicMaterial({ color: '#ffe2a3', polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -3 }), MAXP);
  for (const m of [poolMesh, poolCore]) { m.frustumCulled = false; m.count = 0; root.add(m); }
  let lightsOn = new Set(); // tile keys with power
  function rebuildLights() {
    const d = new THREE.Object3D(); let n = 0, p = 0;
    for (const L of layers.values()) {
      const recs = [L.rec, L.fixedRec].filter(Boolean);
      for (const rec of recs) for (const [i, [x, y, z]] of [...rec.windows, ...rec.lamps].entries()) {
        if (n >= MAXL) break; const on = lightsOn.has(L.t.k) || !!L.fixedRec; const lamp = i >= rec.windows.length;
        d.position.set(L.ox + x, L.oy + 1 + y - 0.5, L.oz + z); d.scale.setScalar(on ? (lamp ? 1.35 : 1) : 0.0001); d.updateMatrix(); lightMesh.setMatrixAt(n++, d.matrix);
        if (lamp && on && p < MAXP) { d.position.set(L.ox + x, L.oy + 1.17, L.oz + z); d.scale.setScalar(1); d.updateMatrix(); poolMesh.setMatrixAt(p, d.matrix); d.position.y += 0.01; d.updateMatrix(); poolCore.setMatrixAt(p++, d.matrix); }
      }
    }
    lightMesh.count = n; lightMesh.instanceMatrix.needsUpdate = true;
    poolMesh.count = poolCore.count = p; poolMesh.instanceMatrix.needsUpdate = poolCore.instanceMatrix.needsUpdate = true;
  }

  // ---------------- pop-in animation and dust
  const anims = [];
  const DUST = 160; const dust = new THREE.InstancedMesh(new THREE.BoxGeometry(0.42, 0.42, 0.42), new THREE.MeshLambertMaterial({ color: '#e6d3a8' }), DUST); dust.frustumCulled = false; root.add(dust);
  const dustP = Array.from({ length: DUST }, () => ({ life: 0 })); let dustI = 0;
  function puffRing(x, y, z, r, n = 18) { for (let i = 0; i < n; i++) { const p = dustP[dustI = (dustI + 1) % DUST]; const a = (i / n) * 6.28 + Math.random() * 0.3; p.x = x + Math.cos(a) * r; p.y = y; p.z = z + Math.sin(a) * r; p.vx = Math.cos(a) * (3.5 + Math.random() * 1.5); p.vz = Math.sin(a) * (3.5 + Math.random() * 1.5); p.vy = 1.6 + Math.random(); p.life = 0.55 + Math.random() * 0.25; } }
  function puff(x, y, z, n = 14) { for (let i = 0; i < n; i++) { const p = dustP[dustI = (dustI + 1) % DUST]; const a = Math.random() * 6.28; p.x = x; p.y = y; p.z = z; p.vx = Math.cos(a) * 3; p.vz = Math.sin(a) * 3; p.vy = 2 + Math.random() * 2; p.life = 0.7 + Math.random() * 0.3; } }
  // confetti for celebrations
  const CONF = 220; const conf = new THREE.InstancedMesh(new THREE.BoxGeometry(0.45, 0.12, 0.3), new THREE.MeshBasicMaterial({ color: '#ffffff' }), CONF); conf.frustumCulled = false; root.add(conf);
  const confP = Array.from({ length: CONF }, (_, i) => { conf.setColorAt(i, new THREE.Color(['#ffd23f', '#16c79a', '#ff7eb6', '#3a6fc9', '#ff8a5c', '#ffffff'][i % 6])); return { life: 0 }; });
  function confetti(at, n = 120) { for (let i = 0; i < n; i++) { const p = confP[(confI = (confI + 1) % CONF)]; const a = Math.random() * 6.28, sp = 4 + Math.random() * 8; Object.assign(p, { x: at.x, y: at.y, z: at.z, vx: Math.cos(a) * sp, vz: Math.sin(a) * sp, vy: 8 + Math.random() * 10, life: 1.6 + Math.random(), r: Math.random() * 6 }); } }
  let confI = 0;
  function pop(obj, delay = 0, { reduce = false } = {}) {
    if (reduce) { obj.scale.set(1, 1, 1); return; }
    obj.scale.set(1, 0.001, 1); anims.push({ obj, t: -delay, dur: 0.42 });
  }

  function newRec() { return { windows: [], lamps: [], cars: [], rotor: null }; }
  function buildMeshes(L, cell, mat = null) {
    const G = new Vox(), B = new Vox(), F = new Vox(); G.jitter = B.jitter = 0.06; F.jitter = 0.05; const rec = newRec();
    if (cell.mark && MARK[cell.mark] && !cell.item) MARK[cell.mark](G, B, rec, L.t, F);
    if (cell.item) { BUILD[cell.item](G, B, rec, L.t, F); for (const m of cell.mods || []) (F.size ? addModFine(F, m) : addMod(B, m, rec)); }
    const g = meshLayer(G, B, L.ox, L.oy, L.oz, F);
    if (mat) g.traverse((o) => { if (o.isMesh) { o.material = mat; o.castShadow = false; } });
    if (rec.rotor && !mat) { const rotor = makeRotor(); rotor.position.set(L.ox + rec.rotor[0], L.oy + 1 + rec.rotor[1], L.oz + rec.rotor[2]); g.add(rotor); L.rotor = rotor; }
    g.userData.vox = { G, B, F }; g.userData.rec = rec;
    return { g, rec };
  }

  // ---------------- build-up animations: a plane sweeps up (buildings) or across (ground works)
  const FLAT = new Set(['road', 'carpark', 'path', 'cycle', 'tram', 'bridge', 'bigfield', 'mixed', 'allot', 'raingarden', 'reedbed', 'compost', 'town', 'wild']);
  const builds = new Map();
  // Build juice (art pass, Nov 2026): when a build's last layer lands it settles with a small squash and spring,
  // a ring of dust rolls out from its base and a low solid kerb ripples out across the tile. Never with reduce
  // motion (the build appears at once then). The old shared "blocks fly in" swarm was never used and drew 4000
  // hidden cubes (and their shadows) every frame, so it is gone.
  const settles = [];
  const RIPPLE_MAT = new THREE.MeshBasicMaterial({ color: '#fff3d6' });
  function landBuild(L, g) {
    const [cx, cz] = tileCenter(L.t.gx, L.t.gz); const y0 = L.oy + 1;
    const tall = !!L.cellItem && !FLAT.has(L.cellItem);
    if (tall) settles.push({ g, t: 0, P: new THREE.Vector3(cx, y0, cz) });
    puffRing(cx, y0 + 0.3, cz, T * 0.4, tall ? 26 : 16);
    const rip = ring(L, '#fff3d6'); rip.traverse((o) => { if (o.isMesh) o.material = RIPPLE_MAT; });
    L.group.add(rip); settles.push({ rip, L, t: 0, P: new THREE.Vector3(cx, y0, cz) });
  }
  function stepSettles(dt) {
    for (let i = settles.length - 1; i >= 0; i--) {
      const s = settles[i]; s.t += dt;
      if (s.g) {
        const k = s.t; const sy = 1 - 0.17 * Math.cos(k * 2 * Math.PI / 0.24) * Math.exp(-k * 9); const sx = 1 + (1 - sy) * 0.45;
        s.g.scale.set(sx, sy, sx); s.g.position.set(s.P.x * (1 - sx), s.P.y * (1 - sy), s.P.z * (1 - sx));
        if (k >= 0.6) { s.g.scale.set(1, 1, 1); s.g.position.set(0, 0, 0); settles.splice(i, 1); }
      } else {
        const k = clamp(s.t / 0.42); const sc = 0.92 + 0.3 * ease.out(k);
        s.rip.scale.set(sc, Math.max(0.001, 1 - k), sc); s.rip.position.set(s.P.x * (1 - sc), s.P.y * k, s.P.z * (1 - sc));
        if (k >= 1) { s.L.group.remove(s.rip); settles.splice(i, 1); }
      }
    }
  }

  // Construction, system by system and layer by layer: each stage (see construct.js) sweeps in over its own
  // time window; temporary stages (trench, gravel, frame, pipes) disappear once the next real layer covers them.
  function startBuild(L, g, { dur = 2, delay = 0, kind = '', cell = null, onStage = null }) {
    const vox = g.userData.vox, rec = g.userData.rec; if (!vox || !cell) return;
    const stages = planStages(cell, vox, rec); if (!stages.length) return;
    const W = stages.reduce((a, st) => a + st.w, 0); let t0 = 0;
    for (const st of stages) {
      st.t0 = (t0 / W) * dur; t0 += st.w; st.t1 = (t0 / W) * dur;
      st.group = meshLayer(st.parts.G, st.parts.B, L.ox, L.oy, L.oz, st.parts.F);
      const box = new THREE.Box3().setFromObject(st.group);
      st.plane = new THREE.Plane(st.dir === 'x' ? new THREE.Vector3(-1, 0, 0) : new THREE.Vector3(0, -1, 0), 0);
      st.a = box.isEmpty() ? 0 : (st.dir === 'x' ? box.min.x - 0.1 : box.min.y - 0.1); st.b = box.isEmpty() ? 0 : (st.dir === 'x' ? box.max.x + 0.1 : box.max.y + 0.1);
      st.plane.constant = st.a;
      st.group.traverse((o) => { if (o.isMesh) { o.material = clipMaterial([st.plane]); o.castShadow = true; } });
      if (st.temp) st.group.position.y -= 0.03; // temporary layers sit just under the layer that replaces them
      st.group.visible = false; L.group.add(st.group);
    }
    // temporary stages vanish when the next permanent stage after them is complete
    stages.forEach((st, i) => { if (st.temp) { const nxt = stages.slice(i + 1).find((x) => !x.temp); st.hideAt = nxt ? nxt.t1 : dur; } });
    g.visible = false; if (L.rotor) { L.rotor.visible = false; L.group.attach(L.rotor); } // the rotor is fitted during the build, so it can't hide with the unfinished group
    const box = new THREE.Box3().setFromObject(g);
    builds.set(L.t.k, { L, g, stages, t: -delay, dur, top: box.isEmpty() ? L.oy + 2 : box.max.y, kind, cur: -1, onStage, cable: null, plane: { constant: L.oy } });
  }
  function endBuild(B, landed = false) {
    for (const st of B.stages) { L_remove(B.L, st.group); }
    if (B.cable) { B.L.group.remove(B.cable); B.cable = null; }
    B.g.visible = true; if (B.L.rotor && B.L.rotor.parent !== B.g) B.g.attach(B.L.rotor);
    if (B.L.rotor && !B.rotorDone) { B.L.rotor.visible = true; rotorDrops.push({ r: B.L.rotor, y: B.L.rotor.position.y, t: 0 }); }
    builds.delete(B.L.t.k);
    if (landed) landBuild(B.L, B.g);
  }
  function L_remove(L, grp) { L.group.remove(grp); grp.traverse((o) => { if (o.isMesh) { o.geometry.dispose(); o.material.dispose(); } }); }
  function stepBuild(B, dt) {
    B.t += dt; if (B.t < 0) return;
    B.stages.forEach((st, i) => {
      if (B.t >= st.t0 && i > B.cur) { B.cur = i; B.onStage?.(i, st, B.stages); if (st.rotor && B.L.rotor) { B.L.rotor.visible = true; rotorDrops.push({ r: B.L.rotor, y: B.L.rotor.position.y, t: 0 }); B.rotorDone = true; } if (st.cable) B.cable = makeCable(B.L); }
      const k = Math.max(0, Math.min(1, (B.t - st.t0) / Math.max(0.05, st.t1 - st.t0)));
      st.group.visible = B.t >= st.t0 && !(st.hideAt != null && B.t >= st.hideAt);
      const e = k * k * (3 - 2 * k); st.plane.constant = st.a + (st.b - st.a) * e;
      if (B.t >= st.t0 && B.t < st.t1) { B.plane.constant = st.plane.constant; B.dir = st.dir; }
      if (st.xray) { const on = B.t >= st.t0 && B.t < st.t1 + 0.6; if (on) for (const prev of B.stages.slice(0, i)) if (prev.temp && prev !== st) prev.group.visible = false; }
      if (st.cable && B.cable) B.cable.userData.grow(k);
    });
    if (Math.random() < dt * 2.5) { const [cx, cz] = tileCenter(B.L.t.gx, B.L.t.gz); puff(cx + (Math.random() - 0.5) * 5, B.L.oy + 1.3, cz + (Math.random() - 0.5) * 5, 2); }
    if (B.t >= B.dur + 0.25) endBuild(B, true);
  }
  // a glowing cable laid from a turbine towards the middle of the town
  function makeCable(L) {
    const [cx, cz] = tileCenter(L.t.gx, L.t.gz); const homes = [...layers.values()].filter((x) => x.cellItem && ITEMS[x.cellItem]?.home);
    const tgt = homes.length ? homes.reduce((a, h) => a.add(new THREE.Vector3(h.ox + 3, 0, h.oz + 3)), new THREE.Vector3()).multiplyScalar(1 / homes.length) : new THREE.Vector3(0, 0, 0);
    const n = 60; const m = new THREE.InstancedMesh(new THREE.BoxGeometry(0.8, 0.5, 0.8), new THREE.MeshBasicMaterial({ color: '#ffe066' }), n); m.frustumCulled = false; const d = new THREE.Object3D();
    m.userData.grow = (k) => { for (let i = 0; i < n; i++) { const f = i / (n - 1); d.position.set(cx + (tgt.x - cx) * f, L.oy + 1.15 + Math.max(0, (heightNear(cx + (tgt.x - cx) * f, cz + (tgt.z - cz) * f) - L.oy)), cz + (tgt.z - cz) * f); const pulse = Math.abs(f - ((performance.now() / 900) % 1)) < 0.06 ? 1.8 : 1; d.scale.setScalar(f <= k ? pulse : 0.0001); d.updateMatrix(); m.setMatrixAt(i, d.matrix); } m.instanceMatrix.needsUpdate = true; };
    m.userData.grow(0); L.group.add(m); return m;
  }
  const heightNear = (x, z) => { const tt = tileAt(x, z); const t = tt && terrain.tiles.get(tt[0] + ',' + tt[1]); return t ? t.h : 0; };
  const rotorDrops = [];

  const world = {
    root, layers, ground, terrain, builds,
    // progress of a tile's build: { k (0..1), level (current world y or x of the sweep), top, dir }
    buildState(k) { const B = builds.get(k); if (!B) return null; const p = Math.max(0, Math.min(1, B.t / B.dur)); return { k: p, level: B.plane.constant, top: B.top, dir: B.dir || 'up', kind: B.kind, stage: B.stages[B.cur]?.label }; },
    finishBuilds() { for (const B of [...builds.values()]) endBuild(B); for (const r of rotorDrops) r.t = 9; },
    // Show a cell's state on its tile. animate: pop-in with dust and sound hook.
    // a stand-alone model of one tile's build, centred on the origin (for the build buttons' pictures)
    thumbModel(cell, t = { gx: 3, gz: 3, zone: 'field', h: 0, k: '3,3' }) { const { g } = buildMeshes({ t, ox: -3, oy: 0, oz: -3 }, cell); return g; },
    setCell(k, cell, { animate = false, delay = 0, reduce = false, build = null } = {}) {
      const L = layers.get(k); if (!L) return;
      if (builds.has(k)) endBuild(builds.get(k));
      const prevTop = L.build ? new THREE.Box3().setFromObject(L.build).max.y : null; const prevItem = L.cellItem;
      if (L.rotor && L.rotor.parent && L.rotor.parent !== L.build) L.rotor.parent.remove(L.rotor);
      if (L.build) { L.group.remove(L.build); dispose(L.build); L.build = null; L.rec = null; L.rotor = null; }
      L.cellItem = cell?.item || null;
      const has = cell && (cell.item || cell.mark);
      L.deco.visible = !L.fixed && !(cell && cell.item) && !(cell && cell.mark === 'town') && !L.crowded;
      // decoration trees on tiles next to a building are cleared, so their canopies don't grow into it
      const tall = !!(cell && cell.item && !FLAT.has(cell.item));
      for (const n of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const NL = layers.get((L.t.gx + n[0]) + ',' + (L.t.gz + n[1])); if (!NL) continue; if (tall) NL.crowdedBy = (NL.crowdedBy || new Set()).add(k); else NL.crowdedBy?.delete(k); NL.crowded = !!NL.crowdedBy?.size; if (!NL.build && !NL.fixed && NL.deco) NL.deco.visible = !NL.crowded; }
      if (L.hedge) L.hedge.visible = !(cell && cell.item) || HEDGE_SAFE.has(cell.item);
      if (!has) return;
      const { g, rec } = buildMeshes(L, cell); L.build = g; L.rec = rec; L.group.add(g);
      if (build && !reduce) { startBuild(L, g, { ...build, delay: build.delay ?? delay, kind: cell.item || cell.mark, cell }); }
      else if (animate) { pop(g, delay, { reduce }); const [cx, cz] = tileCenter(L.t.gx, L.t.gz); setTimeout(() => puff(cx, L.oy + 1.2, cz), delay * 1000); }
    },
    // Ghost plan: solid pale blocks with a raised frame that appear one after another.
    showGhost(placements, cellsAfter, { reduce = false, bad = new Set(), coded = true } = {}) {
      this.clearGhost(); let i = 0;
      const keys = [...new Set(placements.map((p) => p.k))];
      for (const k of keys) {
        const L = layers.get(k); const cell = cellsAfter.get(k); if (!L || !cell) continue;
        const pl = placements.filter((p) => p.k === k).pop(); const lv = ITEMS[pl?.item || pl?.mod || pl?.mark || cell.item || cell.mark]?.level; // colour by what is planned here
        const mat = bad.has(k) ? GHOST_BAD : coded ? ghostMat(lv) : GHOST_MAT;
        const { g } = buildMeshes(L, cell, mat);
        // flat plans (roads, paths, fields, town land) would vanish into the ground: give every planned tile a raised outline
        if (coded || bad.has(k)) g.add(outline(L, mat.color));
        g.position.y += 0.05; L.ghost = g; L.group.add(g); if (L.build) L.build.visible = false; if (L.deco) { L.decoWas = L.deco.visible; L.deco.visible = false; } pop(g, reduce ? 0 : i * 0.05, { reduce }); i++;
      }
      return i * 0.05 + 0.4;
    },
    clearGhost() { for (const L of layers.values()) if (L.ghost) { L.group.remove(L.ghost); dispose(L.ghost); L.ghost = null; if (L.build) L.build.visible = true; if (L.decoWas != null) { L.deco.visible = L.decoWas; L.decoWas = null; } } },
    setLights(keys) { lightsOn = new Set(keys); rebuildLights(); },
    rebuildLights,
    // Tile overlays, all solid and drawn at ground level with normal depth, so buildings, trees and Florence
    // always stand in front of them. spec: Map key -> {color, pattern, lift} (a painted tile: lenses, "can't build")
    // or {color, ring: true, notch} (a low solid kerb round the tile: the build highlight)
    // The kerbs of every highlighted tile go into one instanced mesh (perf pass, Nov 2026: four meshes per tile
    // used to cost ~380 draw calls whenever a build tool was picked); painted lens tiles stay one mesh per tile.
    setOverlay(spec) {
      for (const L of layers.values()) { if (L.overlay) { L.group.remove(L.overlay); L.overlay = null; } }
      kerbs.count = 0; kerbs.visible = false;
      if (!spec) return;
      const d = new THREE.Object3D(); const col = new THREE.Color(); let n = 0;
      for (const [k, o] of spec) {
        const L = layers.get(k); if (!L) continue;
        if (o.ring) {
          col.set(o.color);
          for (const [geo, x, y, z] of ringBoxes(L, o.notch, o.dashed, o.plate)) { if (n >= KERB_MAX) break; const p = geo.parameters; d.position.set(x, y, z); d.scale.set(p.width, p.height, p.depth); d.updateMatrix(); kerbs.setMatrixAt(n, d.matrix); kerbs.setColorAt(n++, col); }
          continue;
        }
        const m = new THREE.Mesh(OVERLAY_GEO, overlayMat(o.color, o.pattern)); m.position.set(L.ox + T / 2, L.oy + 1.14 + (o.lift || 0), L.oz + T / 2); m.rotation.x = -Math.PI / 2;
        L.overlay = m; L.group.add(m);
      }
      kerbs.count = n; kerbs.visible = n > 0; kerbs.instanceMatrix.needsUpdate = true; if (kerbs.instanceColor) kerbs.instanceColor.needsUpdate = true;
    },
    clay: 0, clayTarget: 0,
    setClay(on, reduce = false) { this.clayTarget = on ? 1 : 0; if (reduce) { this.clay = this.clayTarget; WORLD.clay.value = this.clay; } },
    // flood: 0..1 water level over the floodplain and wetland
    flood: null, floodLevel: 0,
    setFlood(level) {
      if (!this.flood) {
        const g = new THREE.Group(); const mat = new THREE.MeshLambertMaterial({ color: '#3d9de0' });
        for (const t of terrain.tiles.values()) if (t.zone === 'meadow' || t.zone === 'wetland') { const m = new THREE.Mesh(new THREE.BoxGeometry(T, 1, T), mat); const [cx, cz] = tileCenter(t.gx, t.gz); m.position.set(cx, 0.5, cz); g.add(m); }
        root.add(g); this.flood = g;
      }
      this.floodLevel = level; this.flood.visible = level > 0.01; this.flood.scale.y = Math.max(0.01, level * 2.6); this.flood.position.y = -0.4 + level * 0.9;
    },
    confetti(at, n) { confetti(at, n); },
    // Florence's route cost for a tile: buildings and the fixed lab/school/dock block her, the river is a long way round
    walkCost(k) { const L = layers.get(k); if (!L) return Infinity; if (L.fixed) return Infinity; if (L.cellItem && !FLAT.has(L.cellItem)) return Infinity; if (L.t.zone === 'river') return L.cellItem === 'bridge' || L.cellItem === 'greenbridge' ? 1 : 6; return 1; },
    tileTop(k) { const L = layers.get(k); const [cx, cz] = tileCenter(L.t.gx, L.t.gz); return new THREE.Vector3(cx, L.oy + 1, cz); },
    // the cycle bridge to the village island lands beside this buildable edge tile, at bridgeLanding
    bridgeTile: BRIDGE_TILE, bridgeLanding: bridge.landing.clone(), bridge,
    pick(ndc, camera) {
      const ray = new THREE.Raycaster(); ray.setFromCamera(ndc, camera);
      let y = 1; let hit = null;
      for (let i = 0; i < 3; i++) {
        const p = new THREE.Vector3(); if (!ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), -y), p)) return null;
        const tt = tileAt(p.x, p.z); if (!tt) return null; const k = tt[0] + ',' + tt[1]; if (!layers.has(k)) return null;
        hit = k; const ny = layers.get(k).oy + 1; if (ny === y) break; y = ny;
      }
      return hit;
    },
    update(dt, t, { windStill = false } = {}) {
      uTime.value = t; uIce.value += ((stage.winter > 0.6 ? 1 : 0) - uIce.value) * Math.min(1, dt * 1.5); sails.rotation.z = -t * 0.6; cloudUpd(t); cloudSea(t * 0.4); islets(t); falls.forEach((f) => f(t)); bridge.update(dt, t);
      // clay fade
      this.clay += (this.clayTarget - this.clay) * Math.min(1, dt * 7); WORLD.clay.value = this.clay;
      // night lights fade with the sky
      lightMesh.visible = stage.night > 0.45; poolMesh.visible = poolCore.visible = stage.night > 0.55; // windows switch on at dusk (solid, never half see-through)
      for (let i = anims.length - 1; i >= 0; i--) { const a = anims[i]; a.t += dt; const k = clamp(a.t / a.dur); if (a.t >= 0) a.obj.scale.set(1, Math.max(0.001, ease.back(k)), 1); if (k >= 1) anims.splice(i, 1); }
      for (const L of layers.values()) if (L.rotor) L.rotor.rotation.z += dt * (windStill ? 0.25 : 2.2);
      for (const B of [...builds.values()]) stepBuild(B, dt);
      stepSettles(dt);
      for (let i = rotorDrops.length - 1; i >= 0; i--) { const r = rotorDrops[i]; r.t += dt; const k = Math.min(1, r.t / 1.2); r.r.position.y = r.y + (1 - (1 - (1 - k) ** 3)) * 0 + (1 - k) ** 2 * 14; if (k >= 1) { r.r.position.y = r.y; rotorDrops.splice(i, 1); } }
      const d = new THREE.Object3D();
      for (let i = 0; i < DUST; i++) { const p = dustP[i]; if (p.life > 0) { p.life -= dt; p.vy -= 9 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt; d.position.set(p.x, Math.max(p.y, 0.5), p.z); d.scale.setScalar(Math.max(0.01, p.life)); } else d.scale.setScalar(0.0001); d.updateMatrix(); dust.setMatrixAt(i, d.matrix); }
      dust.instanceMatrix.needsUpdate = true;
      for (let i = 0; i < CONF; i++) { const p = confP[i]; if (p.life > 0) { p.life -= dt; p.vy -= 14 * dt; p.vx *= 0.98; p.vz *= 0.98; p.x += p.vx * dt; p.y += Math.max(p.vy, -3) * dt; p.z += p.vz * dt; p.r += dt * 8; d.position.set(p.x, p.y, p.z); d.rotation.set(p.r, p.r * 0.7, 0); d.scale.setScalar(Math.min(1, p.life)); } else d.scale.setScalar(0.0001); d.updateMatrix(); conf.setMatrixAt(i, d.matrix); }
      conf.instanceMatrix.needsUpdate = true; if (conf.instanceColor) conf.instanceColor.needsUpdate = true;
    },
  };
  rebuildLights();
  return world;
}

// a raised coloured frame round a tile (plan preview), solid
const OUT_MATS = new Map();
const basicMat = (color) => { const key = new THREE.Color(color).getHexString(); if (!OUT_MATS.has(key)) OUT_MATS.set(key, new THREE.MeshBasicMaterial({ color })); return OUT_MATS.get(key); };
function outline(L, color) {
  const mat = basicMat(color); const g = new THREE.Group(); const y = L.oy + 1.5, w = T - 0.6, th = 0.35;
  const [cx, cz] = tileCenter(L.t.gx, L.t.gz);
  for (const [dx, dz, sx, sz] of [[0, -w / 2, w, th], [0, w / 2, w, th], [-w / 2, 0, th, w], [w / 2, 0, th, w]]) { const m = new THREE.Mesh(new THREE.BoxGeometry(sx, 0.35, sz), mat); m.position.set(cx + dx, y, cz + dz); g.add(m); }
  return g;
}
// the build highlight: a low solid kerb just inside the tile's edge (and solid corner blocks when it replaces
// something), at ground level so anything standing on the tile hides it, never the other way round
const KERB_H = 0.55, KERB_W = 0.55, KERB_IN = T - 0.6; // chunky, so the build highlight reads from the default camera and on phones
const KERB_X = new THREE.BoxGeometry(KERB_IN, KERB_H, KERB_W), KERB_Z = new THREE.BoxGeometry(KERB_W, KERB_H, KERB_IN), NOTCH = new THREE.BoxGeometry(1.3, KERB_H + 0.12, 1.3);
const PLATE = new THREE.BoxGeometry(T - 0.2, 0.18, T - 0.2);
const DASH_X = new THREE.BoxGeometry(KERB_IN / 5, KERB_H, KERB_W), DASH_Z = new THREE.BoxGeometry(KERB_W, KERB_H, KERB_IN / 5);
function ringBoxes(L, notch = false, dashed = false, plate = false) {
  const out = []; const [cx, cz] = tileCenter(L.t.gx, L.t.gz); const y = L.oy + 1 + KERB_H / 2 - 0.02, h = KERB_IN / 2 - KERB_W / 2;
  if (plate) return [[PLATE, cx, L.oy + 1 + 0.07, cz]]; // "can't build": the whole tile is covered by a solid dark plate
  if (dashed) { // "can't build": a dashed kerb (a different shape as well as a different colour)
    for (const k of [-2, 0, 2]) for (const [geo, dx, dz] of [[DASH_X, k * KERB_IN / 5, -h], [DASH_X, k * KERB_IN / 5, h], [DASH_Z, -h, k * KERB_IN / 5], [DASH_Z, h, k * KERB_IN / 5]]) out.push([geo, cx + dx, y, cz + dz]);
    return out;
  }
  for (const [geo, dx, dz] of [[KERB_X, 0, -h], [KERB_X, 0, h], [KERB_Z, -h, 0], [KERB_Z, h, 0]]) out.push([geo, cx + dx, y, cz + dz]);
  if (notch) for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) out.push([NOTCH, cx + dx * (h - 0.44), y + 0.06, cz + dz * (h - 0.44)]);
  return out;
}
function ring(L, color, notch = false, dashed = false) {
  const mat = basicMat(color); const g = new THREE.Group();
  for (const [geo, x, y, z] of ringBoxes(L, notch, dashed)) { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); g.add(m); }
  return g;
}
function makeRotor() {
  const g = new THREE.Group(); const mat = new THREE.MeshLambertMaterial({ color: '#f4f6f8' });
  for (let i = 0; i < 3; i++) { const b = new THREE.Mesh(new THREE.BoxGeometry(0.5, 6.5, 0.3), mat); b.geometry.translate(0, 3.25, 0); b.rotation.z = (i * Math.PI * 2) / 3; g.add(b); }
  const hub = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 0.9), mat); g.add(hub); return g;
}
function dispose(g) { g.traverse((o) => { if (o.isMesh && o.geometry) o.geometry.dispose(); }); }

// ---------------- lens overlay materials: colour + a pattern so colour is never the only cue
const OVERLAY_GEO = new THREE.PlaneGeometry(T - 0.3, T - 0.3);
const patternCache = new Map();
// opaque: white with a darker pattern, multiplied by the tile colour (a darker shade of the colour on the colour)
function patternTex(kind) {
  if (patternCache.has(kind)) return patternCache.get(kind);
  const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d');
  g.fillStyle = '#fff'; g.fillRect(0, 0, 64, 64); g.strokeStyle = 'rgba(0,0,0,0.35)'; g.fillStyle = 'rgba(0,0,0,0.35)'; g.lineWidth = 5;
  if (kind === 'waves') for (let y = 8; y < 64; y += 16) { g.beginPath(); for (let x = 0; x <= 64; x += 4) g.lineTo(x, y + Math.sin(x / 6) * 4); g.stroke(); }
  if (kind === 'dots') for (let x = 8; x < 64; x += 16) for (let y = 8; y < 64; y += 16) { g.beginPath(); g.arc(x, y, 4, 0, 7); g.fill(); }
  if (kind === 'stripes') for (let i = -64; i < 128; i += 14) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i + 64, 64); g.stroke(); }
  if (kind === 'cross') for (let i = -64; i < 128; i += 18) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i + 64, 64); g.moveTo(i + 64, 0); g.lineTo(i, 64); g.stroke(); }
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; patternCache.set(kind, tex); return tex;
}
const matCache = new Map();
function overlayMat(color, pattern = 'solid') {
  const key = color + pattern; if (matCache.has(key)) return matCache.get(key);
  // solid, depth-tested, nudged towards the camera so it never flickers against the ground
  const m = new THREE.MeshBasicMaterial({ color, map: pattern !== 'solid' ? patternTex(pattern) : null, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -4 });
  matCache.set(key, m); return m;
}
export { ZONES };

