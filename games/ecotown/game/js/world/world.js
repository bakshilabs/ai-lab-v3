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

const HEDGE_SAFE = new Set(['mixed', 'orchard', 'hives', 'hedge', 'path', 'cycle', 'park', 'allot', 'greenbridge']);
const GHOST_MAT = new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.5, depthWrite: false });
// the plan preview is colour-coded by what Florence plans to put there (her plan, before it is real)
const GHOST_COL = { land: '#ffd23f', move: '#ff8a3d', homes: '#ff6f9a', food: '#7ddc5a', power: '#7fd0ff', heart: '#c79bff' };
const ghostMats = new Map();
const ghostMat = (lv) => { if (!ghostMats.has(lv)) ghostMats.set(lv, new THREE.MeshBasicMaterial({ color: GHOST_COL[lv] || '#ffffff', transparent: true, opacity: 0.62, depthWrite: false })); return ghostMats.get(lv); };
const GHOST_BAD = new THREE.MeshBasicMaterial({ color: '#ffd0c8', transparent: true, opacity: 0.55, depthWrite: false });

function zoneAtVoxel(x0, z0) {
  // wobble the boundaries a little so zones blend instead of following the tile grid
  return zoneAt(x0 + (noise2(x0 * 0.18, z0 * 0.18, 31) - 0.5) * 3, z0 + (noise2(x0 * 0.18, z0 * 0.18, 47) - 0.5) * 3);
}
// sage and olive greens with ochre dry grass on the slope and fields: the warm brochure palette, not lime
const TOPS = {
  rim: ['#8fae55', '#9bb85e', '#a7b766', '#c9a86a'], meadow: ['#94bf58', '#a0c862', '#88b44f'], wetland: ['#7fae5a', '#8ab863', '#76a352'],
  wood: ['#78a04a', '#83aa52', '#6e9643'], slope: ['#a8bf5e', '#b6c468', '#c9b46a', '#9cb557'], field: ['#9cbf5a', '#a9c463', '#c4b064', '#92b553'],
  coast: ['#f6d2a2', '#f0c38c', '#fadfb8'],
};
const LIME = ['#e8874c', '#d9733f', '#c4622f', '#f09a5a']; // terracotta mesa (rover palette)

export function createWorld(stage, terrain) {
  const { scene } = stage;
  const root = new THREE.Group(); scene.add(root);
  const tileH = (gx, gz) => terrain.tiles.get(gx + ',' + gz)?.h ?? 0;

  // ---------------- terrain mesh: buildable tile area + a dramatic rim (limestone massif, terraced hills, tiered pines,
  //                  big oaks, a spring waterfall) and a deep brown underside with streaks and hanging roots
  const v = new Vox(); v.jitter = 0.04; const water = new Vox(); water.jitter = 0.03; const riverCells = [];
  const inTiles = (x, z) => { const tt = tileAt(x, z); return tt && terrain.tiles.has(tt[0] + ',' + tt[1]) ? tt : null; };
  const rimH = (x, z) => Math.round(rimHeight(x, z) * Math.min(1, Math.max(0, (Math.abs(x + 0.5 - riverX(z)) - 2.5) / 6)));
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
    let under = Math.round(13 * (1 - r * r * 0.7) + noise2(x / 3, z / 3, 86) * 4) + Math.max(0, top);
    const edge = !insideVoxel(x + 1, z) || !insideVoxel(x - 1, z) || !insideVoxel(x, z + 1) || !insideVoxel(x, z - 1);
    for (let y = top - under; y <= top; y++) {
      let c; const dTop = top - y, dBot = y - (top - under);
      if (dTop === 0) c = river ? '#d9c79a' : !tt && canyonDepth(x, z) ? ['#f2b07a', '#e8955c', '#f6c08e'][Math.floor(rand(x, z, 6) * 3)] : lime ? ['#f6ab70', '#f2b07a', '#e8955c'][Math.floor(rand(x >> 1, z >> 1, 5) * 3)] : dither(TOPS[zone], x, z);
      else if (lime && y > 0) c = ['#e07f47', '#d06d3a', '#e8874c', '#c4622f'][(Math.floor(y / 2) + (rand(x >> 1, y >> 1, z >> 1) > 0.8 ? 1 : 0)) % 4]; // terracotta mesa cliffs
      else if (!tt && dTop > 1 && dBot > 2 && nearCanyon(x, z)) c = SAND[(((y + 40) >> 1) + (rand(x, z, y) > 0.85 ? 1 : 0)) % 6]; // canyon strata
      else if (dTop <= 1 && !river) c = zone === 'coast' ? '#eab47a' : '#8a5a2a';                           // turf lip
      else if (dBot <= 2) c = rand(x, y, z) > 0.5 ? '#6e2f18' : '#5a2612';                                  // dark base
      else { const streak = (Math.floor(x * 1.7 + z * 2.3) & 3); c = ['#d9733f', '#c96535', '#e07f47', '#b85a2e'][(Math.floor(y / 2) + (rand(x >> 1, y >> 1, z >> 1) > 0.75 ? 1 : 0) + (streak === 0 ? 1 : 0)) % 4]; } // terracotta earth in chunky blocks
      v.set(x, y, z, c);
    }
    // dark root tips under the rim
    if (r > 0.55 && rand(x, z, 77) > 0.94) { const by = top - under; const len = 2 + Math.floor(rand(x, z, 78) * 5); for (let k = 1; k <= len; k++) v.set(x, by - k, z, k === len ? '#4a1c0c' : '#7a3418'); }
    if (edge && rand(x, z, 31) > 0.86) { const nx = insideVoxel(x + 1, z) ? -1 : 1; const y0 = top - 3 - Math.floor(rand(x, z, 32) * 5); v.set(x + nx, y0, z, '#b85a2e'); v.set(x + nx, y0 + 1, z, '#5fbf3f'); }
    if (river) { water.set(x, 0, z, rand(x, 9, z) > 0.5 ? '#3fa2e6' : '#4aaeea'); riverCells.push([x, z]); }
    // gorge streams pool on the canyon floor and stop short of the island's edge (nothing pours off the island)
    const cd = !tt && canyonDepth(x, z); if (cd && cd >= 12 && insideVoxel(x + 5, z) && insideVoxel(x - 5, z) && insideVoxel(x, z + 5) && insideVoxel(x, z - 5)) water.set(x, top + 1, z, '#3fa2e6');
    if (!tt && !river && !edge && !cd) rimCells.push([x, z, top, zone, lime]);
  }
  // the river's source: a mossy rock outcrop behind the spring pool, with a little fall from its top into the pool
  const springTop = 8; const sx = Math.round(SPRING.x), sz = Math.round(SPRING.z - SPRING.r - 1);
  for (let dx = -5; dx <= 5; dx++) for (let dz = -4; dz <= 1; dz++) {
    const base = heightAt(sx + dx, sz + dz); if (base == null || inRiverVoxel(sx + dx, sz + dz)) continue;
    const hgt = Math.round(springTop * (1 - Math.abs(dx) / 6.5) * (dz > -1 ? 0.75 : 1) - rand(dx, dz, 81) * 1.5);
    for (let y = base + 1; y <= Math.max(base, hgt); y++) v.set(sx + dx, y, sz + dz, y === Math.max(base, hgt) && rand(dx, dz, 82) > 0.35 ? '#6fae4a' : rand(dx, y, dz) > 0.5 ? '#8b8f93' : '#9aa0a5');
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
      const s2 = 1 + Math.floor(rand(x, z, 42) * 2);
      for (let dx = -s2; dx <= s2; dx++) for (let dz = -s2; dz <= s2; dz++) for (let dy = 1; dy <= s2 + 1; dy++) if (Math.hypot(dx, dz, (dy - 1) * 1.2) <= s2 + 0.3) v.set(x + dx, top + dy, z + dz, dy === s2 + 1 ? '#b4b9bd' : rand(dx, dy, dz) > 0.5 ? '#8b8f93' : '#9aa0a5');
    }
  }
  for (const [x, z, top, zone, lime] of rimCells) { if (zone === 'rim' && !lime && rand(x, z, 71) > 0.985) { v.set(x, top + 1, z, rand(x, z, 72) > 0.5 ? '#7c5a3a' : '#8b8f93'); if (rand(x, z, 73) > 0.6) v.set(x + 1, top + 1, z, '#6e4f33'); } }
  // the beach rim: dune grass, driftwood and shells so the sand is never a blank sheet
  for (const [x, z, top, zone] of rimCells) {
    if (zone !== 'coast') continue; const p = rand(x, z, 61);
    if (noise2(x / 5, z / 5, 63) > 0.68 && p > 0.45) { v.set(x, top + 1, z, p > 0.8 ? '#7fb54a' : '#9cc45a'); if (p > 0.75) v.set(x, top + 2, z, '#9cc45a'); }
    else if (p < 0.006) { for (let k = 0; k < 4; k++) v.set(x + k, top + 1, z, '#a07a50'); }
    
  }
  // forest on the rim: tall tiered pines up high, big oaks lower down; fewer, bigger, denser clumps
  const used = new Set();
  for (const [x, z, top, zone, lime] of rimCells) {
    if (zone !== 'rim' || x % 4 || z % 4) continue;
    const mask = noise2(x / 12, z / 12, 17) + (top >= 3 ? 0.25 : 0) - (lime ? 0.7 : 0);
    if (mask < 0.6 || rand(x, z, 19) < 0.25 || nearCanyon(x, z)) continue; // a thinner forest that leaves the canyons open
    const ox = x + Math.floor(rand(x, z, 20) * 3) - 1, oz = z + Math.floor(rand(x, z, 21) * 3) - 1; const k = ox + ',' + oz; if (used.has(k)) continue; used.add(k);
    const h0 = heightAt(ox, oz); if (h0 == null || h0 < 0) continue;
    tree2(v, ox, h0, oz, top >= 4 || lime ? 'tallpine' : rand(x, z, 22) > 0.4 ? 'oak' : 'tallpine', x * 7 + z);
  }
  // landmarks: a giant oak at the meadow's rim edge, an old stone windmill on a rim hill
  const giant = [-44, 6]; bigOakAt(v, giant[0], Math.max(0, heightAt(...giant) ?? 0), giant[1]);
  const millAt = [-30, -36]; const millY = Math.max(0, heightAt(...millAt) ?? 0);
  for (let y = 1; y <= 11; y++) for (let dx = -2; dx <= 2; dx++) for (let dz = -2; dz <= 2; dz++) { const rr = y > 8 ? 1.5 : 2.3; if (Math.hypot(dx, dz) <= rr) v.set(millAt[0] + dx, millY + y, millAt[1] + dz, (y + dx + dz) % 3 ? '#e9e1d0' : '#d8cdb6'); }
  for (let y = 12; y <= 14; y++) { const rr = 2.6 - (y - 12) * 0.9; for (let dx = -3; dx <= 3; dx++) for (let dz = -3; dz <= 3; dz++) if (Math.hypot(dx, dz) <= rr) v.set(millAt[0] + dx, millY + y, millAt[1] + dz, '#b5523b'); }
  v.set(millAt[0], millY + 2, millAt[1] + 2, '#6b4a2e'); v.set(millAt[0], millY + 3, millAt[1] + 2, '#6b4a2e'); v.set(millAt[0], millY + 6, millAt[1] + 2, '#3d5a73');
  // spring waterfall from the massif down to the river head (water cells for the stream on the hill)
  roots(v, insideVoxel, { rx: RX, rz: RZ, top: 0, count: 26, seed: 4 });
  const ground = v.mesh(); ground.castShadow = true; ground.receiveShadow = true; root.add(ground);
  // windmill sails
  const sails = new THREE.Group(); { const mat = new THREE.MeshLambertMaterial({ color: '#f6efe2' }); const arm = new THREE.MeshLambertMaterial({ color: '#7a5232' });
    for (let i = 0; i < 4; i++) { const g = new THREE.Group(); const a1 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 8, 0.3), arm); a1.position.y = 4; const sl = new THREE.Mesh(new THREE.BoxGeometry(1.8, 6, 0.15), mat); sl.position.set(1.1, 4.6, 0); g.add(a1, sl); g.rotation.z = i * Math.PI / 2; sails.add(g); }
    sails.position.set(millAt[0] + 0.5, millY + 11, millAt[1] + 3.2); sails.traverse((o) => { if (o.isMesh) o.castShadow = true; }); root.add(sails); }
  const islets = floatingRocks(scene, { n: 6, center: [0, -6, 0], radius: 95, seed: 8 });
  const waterMesh = water.mesh({ castShadow: false });
  const uTime = { value: 0 }; const uIce = { value: 0 };
  waterMesh.material = new THREE.MeshLambertMaterial({ vertexColors: true, transparent: true, opacity: 0.82 });
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
        diffuseColor.a = mix(diffuseColor.a, 0.96, uIce);`);
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

  // ---------------- night lights (windows and lamps), one instanced mesh
  const MAXL = 1600;
  const lightMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(0.42, 0.42, 0.42), new THREE.MeshBasicMaterial({ color: '#ffd66b', transparent: true, opacity: 0 }), MAXL);
  lightMesh.frustumCulled = false; lightMesh.count = 0; root.add(lightMesh);
  let lightsOn = new Set(); // tile keys with power
  function rebuildLights() {
    const d = new THREE.Object3D(); let n = 0;
    for (const L of layers.values()) {
      const recs = [L.rec, L.fixedRec].filter(Boolean);
      for (const rec of recs) for (const [x, y, z] of [...rec.windows, ...rec.lamps]) {
        if (n >= MAXL) break; const on = lightsOn.has(L.t.k) || !!L.fixedRec;
        d.position.set(L.ox + x, L.oy + 1 + y - 0.5, L.oz + z); d.scale.setScalar(on ? 1 : 0.0001); d.updateMatrix(); lightMesh.setMatrixAt(n++, d.matrix);
      }
    }
    lightMesh.count = n; lightMesh.instanceMatrix.needsUpdate = true;
  }

  // ---------------- pop-in animation and dust
  const anims = [];
  const DUST = 160; const dust = new THREE.InstancedMesh(new THREE.BoxGeometry(0.35, 0.35, 0.35), new THREE.MeshLambertMaterial({ color: '#efe6d2' }), DUST); dust.frustumCulled = false; root.add(dust);
  const dustP = Array.from({ length: DUST }, () => ({ life: 0 })); let dustI = 0;
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
  // ---- "blocks fly in": a shared swarm of cubes that assemble each build just ahead of the reveal
  const SW = 4000; const swarm = new THREE.InstancedMesh(new THREE.BoxGeometry(0.42, 0.42, 0.42), new THREE.MeshLambertMaterial({ color: '#ffffff' }), SW);
  swarm.frustumCulled = false; swarm.castShadow = true; root.add(swarm); const zero = new THREE.Matrix4().makeScale(0, 0, 0);
  for (let i = 0; i < SW; i++) { swarm.setMatrixAt(i, zero); swarm.setColorAt(i, new THREE.Color('#ffffff')); }
  const freeSlots = Array.from({ length: SW }, (_, i) => SW - 1 - i);
  function sampleSwarm(g, n, plane, dir, a, b) {
    const pts = []; const tmp = new THREE.Vector3(); const col = new THREE.Color();
    g.updateMatrixWorld(true);
    g.traverse((o) => { if (!o.isMesh || !o.geometry.attributes.color) return; const pos = o.geometry.attributes.position, c = o.geometry.attributes.color; for (let i = 0; i < pos.count; i += 4) pts.push([o, i, pos, c]); });
    if (!pts.length) return [];
    const out = []; const step = Math.max(1, Math.floor(pts.length / n));
    for (let i = 0; i < pts.length && out.length < n; i += step) {
      const [o, vi, pos, c] = pts[(i + Math.floor(Math.random() * step)) % pts.length];
      tmp.set(0, 0, 0); for (let k = 0; k < 4 && vi + k < pos.count; k++) tmp.add(new THREE.Vector3().fromBufferAttribute(pos, vi + k)); tmp.multiplyScalar(0.25).applyMatrix4(o.matrixWorld);
      col.fromBufferAttribute(c, vi).multiplyScalar(1.15);
      const slot = freeSlots.pop(); if (slot == null) break;
      const frac = Math.max(0, Math.min(1, ((dir === 'up' ? tmp.y : tmp.x) - a) / Math.max(0.1, b - a)));
      const ang = Math.random() * 6.28, rad = 6 + Math.random() * 10;
      const from = tmp.clone().add(new THREE.Vector3(Math.cos(ang) * rad, 10 + Math.random() * 14, Math.sin(ang) * rad));
      swarm.setColorAt(slot, col); out.push({ slot, to: tmp.clone(), from, frac, spin: Math.random() * 6 });
    }
    swarm.instanceColor.needsUpdate = true; return out;
  }
  const dObj = new THREE.Object3D();
  function stepSwarm(B) {
    const FLY = 0.9;
    for (const p of B.swarm) {
      const tArrive = p.frac * B.dur, k = (B.t - (tArrive - FLY)) / FLY;
      if (k <= 0 || k >= 1.05) { swarm.setMatrixAt(p.slot, zero); continue; }
      const e = 1 - Math.pow(1 - Math.min(1, k), 3);
      dObj.position.lerpVectors(p.from, p.to, e); dObj.position.y += Math.sin(e * Math.PI) * 2;
      dObj.rotation.set(p.spin * (1 - e), p.spin * 0.7 * (1 - e), 0); dObj.scale.setScalar(0.6 + 0.4 * e); dObj.updateMatrix(); swarm.setMatrixAt(p.slot, dObj.matrix);
    }
    swarm.instanceMatrix.needsUpdate = true;
  }
  function freeSwarm(B) { for (const p of B.swarm || []) { swarm.setMatrixAt(p.slot, zero); freeSlots.push(p.slot); } B.swarm = []; swarm.instanceMatrix.needsUpdate = true; }

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
  function endBuild(B) {
    for (const st of B.stages) { L_remove(B.L, st.group); }
    if (B.cable) { B.L.group.remove(B.cable); B.cable = null; }
    B.g.visible = true; if (B.L.rotor && B.L.rotor.parent !== B.g) B.g.attach(B.L.rotor);
    if (B.L.rotor && !B.rotorDone) { B.L.rotor.visible = true; rotorDrops.push({ r: B.L.rotor, y: B.L.rotor.position.y, t: 0 }); }
    builds.delete(B.L.t.k);
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
      if (st.xray) { const on = B.t >= st.t0 && B.t < st.t1 + 0.6; for (const prev of B.stages.slice(0, i)) if (prev.temp && prev !== st) prev.group.traverse((o) => { if (o.isMesh) { o.material.transparent = on; o.material.opacity = on ? 0.22 : 1; o.material.depthWrite = !on; } }); }
      if (st.cable && B.cable) B.cable.userData.grow(k);
    });
    if (Math.random() < dt * 2.5) { const [cx, cz] = tileCenter(B.L.t.gx, B.L.t.gz); puff(cx + (Math.random() - 0.5) * 5, B.L.oy + 1.3, cz + (Math.random() - 0.5) * 5, 2); }
    if (B.t >= B.dur + 0.25) endBuild(B);
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
    // Ghost plan: see-through blocks that appear one after another.
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
        g.position.y += 0.05; L.ghost = g; L.group.add(g); pop(g, reduce ? 0 : i * 0.05, { reduce }); i++;
      }
      return i * 0.05 + 0.4;
    },
    clearGhost() { for (const L of layers.values()) if (L.ghost) { L.group.remove(L.ghost); dispose(L.ghost); L.ghost = null; } },
    setLights(keys) { lightsOn = new Set(keys); rebuildLights(); },
    rebuildLights,
    // Lens overlays: per-tile colour (+ pattern) over a clay world. spec: Map key -> {color, pattern, height}
    setOverlay(spec) {
      for (const L of layers.values()) { if (L.overlay) { L.group.remove(L.overlay); L.overlay = null; } }
      if (!spec) return;
      for (const [k, o] of spec) {
        const L = layers.get(k); if (!L) continue;
        const m = new THREE.Mesh(OVERLAY_GEO, overlayMat(o.color, o.pattern, o.opacity, o.top));
        m.position.set(L.ox + T / 2, L.oy + 1.2 + (o.lift || 0), L.oz + T / 2); m.rotation.x = -Math.PI / 2; m.renderOrder = 5;
        L.overlay = m; L.group.add(m);
      }
    },
    clay: 0, clayTarget: 0,
    setClay(on, reduce = false) { this.clayTarget = on ? 1 : 0; if (reduce) { this.clay = this.clayTarget; WORLD.clay.value = this.clay; } },
    // flood: 0..1 water level over the floodplain and wetland
    flood: null, floodLevel: 0,
    setFlood(level) {
      if (!this.flood) {
        const g = new THREE.Group(); const mat = new THREE.MeshLambertMaterial({ color: '#3d9de0', transparent: true, opacity: 0.62, depthWrite: false });
        for (const t of terrain.tiles.values()) if (t.zone === 'meadow' || t.zone === 'wetland') { const m = new THREE.Mesh(new THREE.BoxGeometry(T, 1, T), mat); const [cx, cz] = tileCenter(t.gx, t.gz); m.position.set(cx, 0.5, cz); g.add(m); }
        root.add(g); this.flood = g;
      }
      this.floodLevel = level; this.flood.visible = level > 0.01; this.flood.scale.y = Math.max(0.01, level * 2.6); this.flood.position.y = -0.4 + level * 0.9;
    },
    confetti(at, n) { confetti(at, n); },
    tileTop(k) { const L = layers.get(k); const [cx, cz] = tileCenter(L.t.gx, L.t.gz); return new THREE.Vector3(cx, L.oy + 1, cz); },
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
      uTime.value = t; uIce.value += ((stage.winter > 0.6 ? 1 : 0) - uIce.value) * Math.min(1, dt * 1.5); sails.rotation.z = -t * 0.6; cloudUpd(t); cloudSea(t * 0.4); islets(t); falls.forEach((f) => f(t));
      // clay fade
      this.clay += (this.clayTarget - this.clay) * Math.min(1, dt * 7); WORLD.clay.value = this.clay;
      // night lights fade with the sky
      lightMesh.material.opacity = clamp((stage.night - 0.25) * 2);
      for (let i = anims.length - 1; i >= 0; i--) { const a = anims[i]; a.t += dt; const k = clamp(a.t / a.dur); if (a.t >= 0) a.obj.scale.set(1, Math.max(0.001, ease.back(k)), 1); if (k >= 1) anims.splice(i, 1); }
      for (const L of layers.values()) if (L.rotor) L.rotor.rotation.z += dt * (windStill ? 0.25 : 2.2);
      for (const B of [...builds.values()]) stepBuild(B, dt);
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

// a raised coloured frame round a tile (plan preview)
const OUT_MATS = new Map();
function outline(L, color) {
  const key = color.getHexString(); if (!OUT_MATS.has(key)) OUT_MATS.set(key, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.95, depthWrite: false }));
  const mat = OUT_MATS.get(key); const g = new THREE.Group(); const y = L.oy + 1.5, w = T - 0.6, th = 0.35;
  const [cx, cz] = tileCenter(L.t.gx, L.t.gz);
  for (const [dx, dz, sx, sz] of [[0, -w / 2, w, th], [0, w / 2, w, th], [-w / 2, 0, th, w], [w / 2, 0, th, w]]) { const m = new THREE.Mesh(new THREE.BoxGeometry(sx, 0.35, sz), mat); m.position.set(cx + dx, y, cz + dz); m.renderOrder = 6; g.add(m); }
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
function patternTex(kind) {
  if (patternCache.has(kind)) return patternCache.get(kind);
  const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d');
  if (kind === 'frame' || kind === 'framestripes') { // a bright border with a faint (or striped) see-through middle
    g.fillStyle = 'rgba(255,255,255,0.16)'; g.fillRect(0, 0, 64, 64);
    if (kind === 'framestripes') { g.strokeStyle = 'rgba(255,255,255,0.7)'; g.lineWidth = 5; for (let i = -64; i < 128; i += 13) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i + 64, 64); g.stroke(); } }
    g.clearRect(0, 0, 64, 4); g.clearRect(0, 60, 64, 4); g.clearRect(0, 0, 4, 64); g.clearRect(60, 0, 4, 64);
    g.strokeStyle = '#fff'; g.lineWidth = 7; g.strokeRect(7, 7, 50, 50);
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; patternCache.set(kind, tex); return tex;
  }
  g.fillStyle = '#fff'; g.fillRect(0, 0, 64, 64); g.strokeStyle = 'rgba(0,0,0,0.35)'; g.fillStyle = 'rgba(0,0,0,0.35)'; g.lineWidth = 5;
  if (kind === 'waves') for (let y = 8; y < 64; y += 16) { g.beginPath(); for (let x = 0; x <= 64; x += 4) g.lineTo(x, y + Math.sin(x / 6) * 4); g.stroke(); }
  if (kind === 'dots') for (let x = 8; x < 64; x += 16) for (let y = 8; y < 64; y += 16) { g.beginPath(); g.arc(x, y, 4, 0, 7); g.fill(); }
  if (kind === 'stripes') for (let i = -64; i < 128; i += 14) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i + 64, 64); g.stroke(); }
  if (kind === 'cross') for (let i = -64; i < 128; i += 18) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i + 64, 64); g.moveTo(i + 64, 0); g.lineTo(i, 64); g.stroke(); }
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; patternCache.set(kind, tex); return tex;
}
const matCache = new Map();
function overlayMat(color, pattern = 'solid', opacity = 0.86, top = false) {
  const key = color + pattern + opacity + top; if (matCache.has(key)) return matCache.get(key);
  // top: drawn over buildings and trees too (the build highlight), so a tile's state is always visible
  const m = new THREE.MeshBasicMaterial({ color, transparent: true, opacity, depthWrite: false, depthTest: !top, map: pattern !== 'solid' ? patternTex(pattern) : null });
  matCache.set(key, m); return m;
}
export { ZONES };

