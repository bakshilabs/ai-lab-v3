// The island in three.js: terrain mesh, water, per-tile layers (decoration, mark, build, ghost, lens overlay),
// window lights, turbine rotors and picking. Reads terrain + cells; never decides anything itself.
import * as THREE from 'three';
import { Vox, WORLD, rand, noise2, clipMaterial } from '../engine/voxel.js';
import { clouds, waterfall, roots, floatingRocks } from '../engine/extras.js';
import { ease, clamp } from '../engine/stage.js';
import { T, X0, Z0, RX, RZ, zoneAt, insideVoxel, inRiverVoxel, riverX, tileAt, tileOrigin, tileCenter, ZONES } from './terrain.js';
import { BUILD, MARK, addMod, addModFine, decorate, tree2 } from './builders.js';
import { ITEMS } from './catalog.js';

const HEDGE_SAFE = new Set(['mixed', 'orchard', 'hives', 'hedge', 'path', 'cycle', 'park', 'allot', 'greenbridge']);
const GHOST_MAT = new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.5, depthWrite: false });
const GHOST_BAD = new THREE.MeshBasicMaterial({ color: '#ffd0c8', transparent: true, opacity: 0.55, depthWrite: false });

function zoneAtVoxel(x0, z0) {
  // wobble the boundaries a little so zones blend instead of following the tile grid
  return zoneAt(x0 + (noise2(x0 * 0.18, z0 * 0.18, 31) - 0.5) * 3, z0 + (noise2(x0 * 0.18, z0 * 0.18, 47) - 0.5) * 3);
}
const TOPS = {
  meadow: ['#7fd04f', '#74c846', '#89d65a'], wetland: ['#6cbf5a', '#62b552', '#76c663'], wood: ['#4fab3a', '#58b442', '#47a034'],
  slope: ['#86d250', '#7bc947', '#90d85c'], coast: ['#efdcab', '#e7d29b', '#f3e3b8'], field: ['#6fc444', '#66bb3d', '#79cc4d'],
};

export function createWorld(stage, terrain) {
  const { scene } = stage;
  const root = new THREE.Group(); scene.add(root);
  const tileH = (gx, gz) => terrain.tiles.get(gx + ',' + gz)?.h ?? 0;

  // ---------------- terrain mesh
  const v = new Vox(); v.jitter = 0.05; const water = new Vox(); water.jitter = 0.03; const riverCells = [];
  for (let x = -RX - 3; x <= RX + 3; x++) for (let z = -RZ - 3; z <= RZ + 3; z++) {
    if (!insideVoxel(x, z)) continue;
    const tt = tileAt(x, z); const h = tt ? tileH(tt[0], tt[1]) : 0;
    const zone = zoneAtVoxel(x, z); const r = Math.hypot(x / RX, z / RZ);
    const under = Math.round(15 * (1 - r * r * 0.8) + noise2(x / 3, z / 3, 86) * 4);
    const river = inRiverVoxel(x, z);
    const top = river ? -1 : h;
    for (let y = top - under; y <= top; y++) {
      let c;
      if (y === top) { const pal = TOPS[zone]; c = river ? '#d6c08a' : pal[Math.floor(noise2(x * 0.35, z * 0.35, 9) * 2.99 + rand(x, z) * 0.6) % 3]; }
      else if (y >= top - 2) c = rand(x, y, z) > 0.5 ? '#9a6a42' : '#8a5c38';             // brown topsoil band
      else c = rand(x, y, z) > 0.5 ? '#8b8f93' : (rand(x, z, y) > 0.5 ? '#7b8085' : '#959a9e'); // grey stone
      v.set(x, y, z, c);
    }
    if (river) { water.set(x, 0, z, rand(x, 9, z) > 0.5 ? '#5bbcf0' : '#4fb3ea'); riverCells.push([x, z]); }
  }
  // trees around the rim and on the edges of tiles, so the island never looks like a grid
  for (let i = 0; i < 40; i++) {
    const a = rand(i, 3, 9) * Math.PI * 2, rr = 0.9 + rand(i, 4, 9) * 0.08; const x = Math.round(Math.cos(a) * RX * rr), z = Math.round(Math.sin(a) * RZ * rr);
    if (!insideVoxel(x, z) || inRiverVoxel(x, z) || insideVoxel(x + 3, z) && insideVoxel(x - 3, z) && insideVoxel(x, z + 3) && insideVoxel(x, z - 3) && tileAt(x, z)) continue;
    const tt = tileAt(x, z); const zone = zoneAtVoxel(x, z); if (tt && terrain.tiles.has(tt[0] + ',' + tt[1])) continue;
    tree2(v, x, (tt ? tileH(tt[0], tt[1]) : 0), z, zone === 'coast' ? 'round' : ['round', 'pine', 'round', 'pine'][i % 4], i);
  }
    const ground = v.mesh(); ground.castShadow = true; ground.receiveShadow = true; root.add(ground);
  const islets = floatingRocks(scene, { n: 6, center: [0, -6, 0], radius: 95, seed: 8 });
  const waterMesh = water.mesh({ castShadow: false });
  const uTime = { value: 0 };
  waterMesh.material = new THREE.MeshLambertMaterial({ vertexColors: true, transparent: true, opacity: 0.82 });
  waterMesh.material.onBeforeCompile = (sh) => {
    sh.uniforms.uTime = uTime; sh.uniforms.uClay = WORLD.clay;
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vWP;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvWP = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nuniform float uTime; uniform float uClay; varying vec3 vWP;')
      .replace('#include <color_fragment>', `#include <color_fragment>
        float f = sin(vWP.z * 0.9 - uTime * 2.4 + sin(vWP.x * 1.7) * 0.8) * 0.5 + 0.5;
        diffuseColor.rgb *= 0.9 + 0.22 * smoothstep(0.75, 1.0, f);
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.7, 0.86, 0.95), uClay * 0.6);`);
  };
  waterMesh.position.y = -0.35; root.add(waterMesh);
  // waterfalls where the river pours off the island
  const rz = riverCells.map((c) => c[1]); const zMin = Math.min(...rz), zMax = Math.max(...rz);
  const falls = [waterfall(scene, { x: riverX(zMin), y: -0.5, z: zMin, dir: [0, -1], width: 3, length: 26 }), waterfall(scene, { x: riverX(zMax), y: -0.5, z: zMax, dir: [0, 1], width: 3, length: 26 })];
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

  // ---------------- wind-swept grass tufts and flowers (instanced), grouped by tile so builds can hide them
  const grassCells = []; const grassTile = new Map();
  for (const t of terrain.tiles.values()) {
    if (!['meadow', 'field', 'slope', 'wetland'].includes(t.zone)) continue;
    const [ox, oz] = tileOrigin(t.gx, t.gz); const n = Math.round((t.zone === 'meadow' ? 14 : 8) * stage.q.grass);
    const start = grassCells.length;
    for (let i = 0; i < n; i++) { const x = ox + rand(i, t.gx, t.gz) * T, z = oz + rand(t.gz, i, t.gx) * T; if (!inRiverVoxel(Math.floor(x), Math.floor(z))) grassCells.push([x, z, t.h, t.zone]); }
    grassTile.set(t.k, [start, grassCells.length]);
  }
  const { update: grassU, setVisible: grassVis } = tufts(scene, grassCells);

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
    if (cell.mark && MARK[cell.mark] && !cell.item) MARK[cell.mark](G, B, rec, L.t);
    if (cell.item) { BUILD[cell.item](G, B, rec, L.t, F); for (const m of cell.mods || []) (F.size ? addModFine(F, m) : addMod(B, m, rec)); }
    const g = meshLayer(G, B, L.ox, L.oy, L.oz, F);
    if (mat) g.traverse((o) => { if (o.isMesh) { o.material = mat; o.castShadow = false; } });
    if (rec.rotor && !mat) { const rotor = makeRotor(); rotor.position.set(L.ox + rec.rotor[0], L.oy + 1 + rec.rotor[1], L.oz + rec.rotor[2]); g.add(rotor); L.rotor = rotor; }
    return { g, rec };
  }

  // ---------------- build-up animations: a plane sweeps up (buildings) or across (ground works)
  const FLAT = new Set(['road', 'carpark', 'path', 'cycle', 'tram', 'bridge', 'bigfield', 'mixed', 'allot', 'raingarden', 'reedbed', 'compost', 'town', 'wild']);
  const builds = new Map();
  function startBuild(L, g, { dur = 2, delay = 0, fromH = null, kind = '' }) {
    const box = new THREE.Box3().setFromObject(g); if (box.isEmpty()) return;
    const dir = FLAT.has(kind) ? 'x' : 'up';
    const plane = dir === 'up' ? new THREE.Plane(new THREE.Vector3(0, -1, 0), 0) : new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0);
    const a = dir === 'up' ? (fromH ?? L.oy + 0.5) : L.ox - 0.5, b = dir === 'up' ? box.max.y + 0.5 : L.ox + T + 0.5;
    plane.constant = a; const meshes = [];
    g.traverse((o) => { if (o.isMesh && o.material && o.material.vertexColors) { meshes.push([o, o.material]); o.material = clipMaterial([plane]); } });
    if (L.rotor) { L.rotor.visible = false; }
    builds.set(L.t.k, { L, g, plane, a, b, dir, t: -delay, dur, meshes, top: box.max.y, kind });
  }
  function endBuild(B) {
    for (const [o, m] of B.meshes) { o.material.dispose(); o.material = m; }
    if (B.L.rotor) { B.L.rotor.visible = true; rotorDrops.push({ r: B.L.rotor, y: B.L.rotor.position.y, t: 0 }); }
    builds.delete(B.L.t.k);
  }
  const rotorDrops = [];

  const world = {
    root, layers, ground, terrain, builds,
    // progress of a tile's build: { k (0..1), level (current world y or x of the sweep), top, dir }
    buildState(k) { const B = builds.get(k); if (!B) return null; const p = Math.max(0, Math.min(1, B.t / B.dur)); return { k: p, level: B.plane.constant, top: B.top, dir: B.dir, kind: B.kind }; },
    finishBuilds() { for (const B of [...builds.values()]) { B.plane.constant = B.b; endBuild(B); } for (const r of rotorDrops) r.t = 9; },
    // Show a cell's state on its tile. animate: pop-in with dust and sound hook.
    setCell(k, cell, { animate = false, delay = 0, reduce = false, build = null } = {}) {
      const L = layers.get(k); if (!L) return;
      if (builds.has(k)) endBuild(builds.get(k));
      const prevTop = L.build ? new THREE.Box3().setFromObject(L.build).max.y : null; const prevItem = L.cellItem;
      if (L.build) { L.group.remove(L.build); dispose(L.build); L.build = null; L.rec = null; L.rotor = null; }
      L.cellItem = cell?.item || null;
      const has = cell && (cell.item || cell.mark);
      L.deco.visible = !L.fixed && !(cell && cell.item) && !(cell && cell.mark === 'town');
      const gr = grassTile.get(k); if (gr) grassVis(gr[0], gr[1], L.deco.visible);
      if (L.hedge) L.hedge.visible = !(cell && cell.item) || HEDGE_SAFE.has(cell.item);
      if (!has) return;
      const { g, rec } = buildMeshes(L, cell); L.build = g; L.rec = rec; L.group.add(g);
      if (build && !reduce) { startBuild(L, g, { ...build, delay: build.delay ?? delay, fromH: prevItem && prevItem === cell.item ? prevTop - 1.2 : null, kind: cell.item || cell.mark }); }
      else if (animate) { pop(g, delay, { reduce }); const [cx, cz] = tileCenter(L.t.gx, L.t.gz); setTimeout(() => puff(cx, L.oy + 1.2, cz), delay * 1000); }
    },
    // Ghost plan: see-through blocks that appear one after another.
    showGhost(placements, cellsAfter, { reduce = false, bad = new Set() } = {}) {
      this.clearGhost(); let i = 0;
      const keys = [...new Set(placements.map((p) => p.k))];
      for (const k of keys) {
        const L = layers.get(k); const cell = cellsAfter.get(k); if (!L || !cell) continue;
        const { g } = buildMeshes(L, cell, bad.has(k) ? GHOST_BAD : GHOST_MAT);
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
        const m = new THREE.Mesh(OVERLAY_GEO, overlayMat(o.color, o.pattern));
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
      uTime.value = t; cloudUpd(t); cloudSea(t * 0.4); islets(t); falls.forEach((f) => f(t)); grassU(t);
      // clay fade
      this.clay += (this.clayTarget - this.clay) * Math.min(1, dt * 7); WORLD.clay.value = this.clay;
      // night lights fade with the sky
      lightMesh.material.opacity = clamp((stage.night - 0.25) * 2);
      for (let i = anims.length - 1; i >= 0; i--) { const a = anims[i]; a.t += dt; const k = clamp(a.t / a.dur); if (a.t >= 0) a.obj.scale.set(1, Math.max(0.001, ease.back(k)), 1); if (k >= 1) anims.splice(i, 1); }
      for (const L of layers.values()) if (L.rotor) L.rotor.rotation.z += dt * (windStill ? 0.25 : 2.2);
      for (const B of [...builds.values()]) {
        B.t += dt; if (B.t < 0) continue; const k = Math.min(1, B.t / B.dur); const e = k < 1 ? k * k * (3 - 2 * k) : 1;
        B.plane.constant = B.a + (B.b - B.a) * e;
        if (Math.random() < dt * 6) { const [cx, cz] = tileCenter(B.L.t.gx, B.L.t.gz); puff(B.dir === 'x' ? B.plane.constant : cx + (Math.random() - 0.5) * 5, B.dir === 'up' ? B.plane.constant - 0.5 : B.L.oy + 1.3, cz + (Math.random() - 0.5) * 5, 3); }
        if (k >= 1) endBuild(B);
      }
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
  const m = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.86, depthWrite: false, map: pattern !== 'solid' ? patternTex(pattern) : null });
  matCache.set(key, m); return m;
}
export { ZONES };

// Instanced grass blades and meadow flowers with GPU wind sway. setVisible hides a range (a tile).
function tufts(scene, cells) {
  const N = cells.length; const geo = new THREE.BoxGeometry(0.16, 0.9, 0.16); geo.translate(0, 0.45, 0);
  const mat = new THREE.MeshLambertMaterial({ color: '#ffffff' }); const uTime = { value: 0 };
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.uTime = uTime; sh.uniforms.uClay = WORLD.clay; sh.uniforms.uSnow = WORLD.snow;
    sh.vertexShader = 'uniform float uTime;\n' + sh.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
      vec4 ip = instanceMatrix * vec4(0.0,0.0,0.0,1.0);
      float sway = sin(uTime * 1.8 + ip.x * 0.3 + ip.z * 0.22) * 0.3 + sin(uTime * 3.1 + ip.x) * 0.07;
      transformed.x += sway * position.y; transformed.z += sway * 0.4 * position.y;`);
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nuniform float uClay; uniform float uSnow;').replace('#include <color_fragment>', '#include <color_fragment>\n diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.95,0.97,1.0), uSnow*0.8); diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.82,0.83,0.82), uClay);');
  };
  const m = new THREE.InstancedMesh(geo, mat, Math.max(1, N)); m.castShadow = false; m.receiveShadow = true; m.frustumCulled = false;
  const d = new THREE.Object3D(); const mats = [];
  const GRASS = ['#8ad85a', '#6fc444', '#9be06a', '#5fb83c'], FLOW = ['#ff7eb6', '#ffd23f', '#ffffff', '#b28cff'];
  cells.forEach(([x, z, h, zone], i) => {
    const flower = zone === 'meadow' && noise2(x * 0.12, z * 0.12, 21) > 0.6 && rand(i, 7) > 0.55; // flowers grow in drifts
    d.position.set(x, h + 1, z); d.rotation.set(0, rand(i, 4) * 3, 0); d.scale.set(flower ? 1.2 : 1, flower ? 0.9 + rand(i, 2) * 0.5 : 0.5 + rand(i, 3) * 0.9, flower ? 1.2 : 1); d.updateMatrix();
    m.setMatrixAt(i, d.matrix); mats.push(d.matrix.clone());
    m.setColorAt(i, new THREE.Color(flower ? FLOW[i % FLOW.length] : zone === 'wetland' ? '#6f9a45' : GRASS[i % GRASS.length]));
  });
  m.instanceMatrix.needsUpdate = true; if (m.instanceColor) m.instanceColor.needsUpdate = true; scene.add(m);
  const zero = new THREE.Matrix4().makeScale(0, 0, 0);
  return { update: (t) => { uTime.value = t; }, setVisible(a, b, on) { for (let i = a; i < b; i++) m.setMatrixAt(i, on ? mats[i] : zero); m.instanceMatrix.needsUpdate = true; } };
}
