// Star-shop cosmetics in 3D: Florence's hats (on the island Florence and on her live portrait), a town flag,
// a fountain and a bee statue on the beach by the AI Lab, and fireworks at dusk. Looks only: nothing here is
// read by the simulation, and nothing sits on a buildable tile. All solid voxel blocks (nothing see-through).
// Owned by the UI pass (the rest of js/world is the 3D designer's); the shop logic is js/game/shop.js.
import * as THREE from 'three';
import { insideVoxel, inRiverVoxel, tileAt } from './terrain.js';

const mat = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.75, metalness: 0, ...o });
const M = {
  straw: mat('#e9c77b'), strawD: mat('#c99a4a'), band: mat('#c8553d'), gold: mat('#ffc83d', { metalness: 0.35, roughness: 0.4 }), goldD: mat('#d9962a', { metalness: 0.3, roughness: 0.45 }),
  ruby: mat('#d9333f'), mint: mat('#16c79a'), stone: mat('#d8cdb8'), stoneD: mat('#a99c86'), water: mat('#3d9de0', { roughness: 0.3 }), foam: mat('#e8f6ff'),
  pole: mat('#5b3923'), cream: mat('#fff3dc'), terra: mat('#c8553d'), sage: mat('#7fa36b'), ink: mat('#3a2416'), wing: mat('#fff8e8'),
};
const box = (w, h, d, m, x = 0, y = 0, z = 0, parent) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x, y, z); b.castShadow = true; parent?.add(b); return b; };
const cyl = (r, h, m, x = 0, y = 0, z = 0, parent, seg = 20) => { const c = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, seg), m); c.position.set(x, y, z); c.castShadow = true; parent?.add(c); return c; };

// hats in the head's own space (the head block is 3.8 wide and 3.1 tall, its top at y = 3.1)
function sunhat() {
  const g = new THREE.Group();
  cyl(2.95, 0.18, M.straw, 0, 3.12, 0, g, 28); cyl(3.0, 0.08, M.strawD, 0, 3.02, 0, g, 28); // brim with a darker edge
  cyl(1.75, 1.05, M.straw, 0, 3.7, 0, g, 24); cyl(1.78, 0.32, M.band, 0, 3.36, 0, g, 24);    // crown and ribbon
  box(0.5, 0.5, 0.2, M.mint, 1.2, 3.4, 1.15, g);                                                // a little mint bow
  return g;
}
function crown() {
  const g = new THREE.Group();
  cyl(1.55, 0.55, M.gold, 0, 3.35, 0, g, 24);
  for (let i = 0; i < 5; i++) { const a = (i / 5) * Math.PI * 2; const s = box(0.55, 0.85, 0.3, M.gold, Math.sin(a) * 1.45, 3.95, Math.cos(a) * 1.45, g); s.rotation.y = a; box(0.26, 0.26, 0.12, i % 2 ? M.mint : M.ruby, Math.sin(a) * 1.62, 3.35, Math.cos(a) * 1.62, g).rotation.y = a; }
  return g;
}
// Florence's head: the pivot that holds her antenna (at y 3.08). Found by shape, so florence.js needs no change.
function findHead(bot) {
  let head = null;
  bot?.group?.traverse((o) => { if (!head && o.isGroup && Math.abs(o.position.y - 3.08) < 0.01 && Math.abs(o.position.x) < 0.01 && Math.abs(o.position.z) < 0.01 && o.parent?.isGroup) head = o.parent; });
  return head;
}

function flag() {
  const g = new THREE.Group();
  box(0.35, 12, 0.35, M.pole, 0, 6, 0, g); box(0.7, 0.7, 0.7, M.gold, 0, 12.2, 0, g);
  // the cloth: three strips (terracotta, cream, sage) that wave as separate columns
  const cols = [];
  for (let i = 0; i < 4; i++) {
    const c = new THREE.Group(); c.position.set(0.2 + i * 1.05, 10.6, 0); g.add(c);
    box(1.05, 0.8, 0.14, M.terra, 0.52, 0.8, 0, c); box(1.05, 0.8, 0.14, M.cream, 0.52, 0, 0, c); box(1.05, 0.8, 0.14, M.sage, 0.52, -0.8, 0, c);
    cols.push(c);
  }
  g.userData.cols = cols; return g;
}
function fountain() {
  const g = new THREE.Group();
  for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; const b = box(1.4, 0.9, 0.6, i % 2 ? M.stone : M.stoneD, Math.cos(a) * 2, 0.45, Math.sin(a) * 2, g); b.rotation.y = -a + Math.PI / 2; }
  cyl(1.85, 0.5, M.water, 0, 0.5, 0, g, 16); cyl(0.4, 2.2, M.stone, 0, 1.4, 0, g, 10); cyl(1.0, 0.3, M.stoneD, 0, 2.5, 0, g, 14); cyl(0.85, 0.2, M.water, 0, 2.7, 0, g, 14);
  const drops = [];
  for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; const d = box(0.28, 0.28, 0.28, i % 2 ? M.foam : M.water, 0, 3, 0, g); d.userData.a = a; drops.push(d); }
  g.userData.drops = drops; return g;
}
function statue() {
  const g = new THREE.Group();
  box(2.6, 0.5, 2.6, M.stoneD, 0, 0.25, 0, g); box(2.0, 1.8, 2.0, M.stone, 0, 1.4, 0, g); box(2.4, 0.3, 2.4, M.stoneD, 0, 2.45, 0, g);
  const bee = new THREE.Group(); bee.position.set(0, 3.7, 0); g.add(bee);
  box(1.4, 1.2, 2.0, M.gold, 0, 0, 0, bee); box(1.46, 1.26, 0.35, M.ink, 0, 0, 0.25, bee); box(1.46, 1.26, 0.35, M.ink, 0, 0, -0.5, bee);
  box(1.1, 1.0, 0.7, M.goldD, 0, 0.05, 1.3, bee); box(0.25, 0.25, 0.1, M.ink, -0.3, 0.2, 1.66, bee); box(0.25, 0.25, 0.1, M.ink, 0.3, 0.2, 1.66, bee); // head and eyes
  const wl = box(1.5, 0.12, 0.9, M.wing, -1.0, 0.75, -0.1, bee); wl.rotation.z = 0.35; const wr = box(1.5, 0.12, 0.9, M.wing, 1.0, 0.75, -0.1, bee); wr.rotation.z = -0.35;
  box(0.12, 0.6, 0.12, M.ink, -0.3, 0.8, 1.5, bee); box(0.12, 0.6, 0.12, M.ink, 0.3, 0.8, 1.5, bee); // antennae
  g.userData.bee = bee; return g;
}

const FW_COLS = ['#ffd23f', '#ff6f9a', '#16c79a', '#7fd0ff', '#ff8a3d', '#c79bff', '#ffffff'];
export function createCosmetics({ stage, world, terrain, bot, portrait }) {
  const root = new THREE.Group(); root.name = 'cosmetics'; stage.scene.add(root);
  const parts = {};
  let on = new Set(); let reduce = false; let ready = false;
  // the beach by the AI Lab: open ground just past the lab tile, toward the island's edge, that is no buildable
  // tile, not river and not the edge itself (sampled outward from the lab, nearest to straight-out first)
  function beachSpots() {
    const lab = terrain.lab && world.tileTop(terrain.lab); if (!lab) return [];
    const out = Math.atan2(lab.z, lab.x); const cand = [];
    for (const r of [6, 7.5, 9, 10.5]) for (let da = -1.4; da <= 1.4; da += 0.1) {
      const a = out + da; const x = lab.x + Math.cos(a) * r, z = lab.z + Math.sin(a) * r;
      const ok = (px, pz) => insideVoxel(px, pz) && !inRiverVoxel(px, pz) && !terrain.tiles.has((tileAt(px, pz) || []).join(','));
      if (ok(x, z) && ok(x + 2, z) && ok(x - 2, z) && ok(x, z + 2) && ok(x, z - 2) && insideVoxel(x + Math.cos(a) * 3, z + Math.sin(a) * 3)) cand.push({ x, z, a, score: Math.abs(da) + r * 0.05 });
    }
    cand.sort((p, q) => p.score - q.score);
    const picks = [];
    for (const c of cand) if (picks.every((p) => Math.hypot(p.x - c.x, p.z - c.z) > 8.5)) { picks.push(c); if (picks.length === 2) break; }
    return picks.map((c) => {
      const hit = new THREE.Raycaster(new THREE.Vector3(c.x, 80, c.z), new THREE.Vector3(0, -1, 0)).intersectObject(world.ground, false)[0];
      const v = new THREE.Vector3(c.x, hit ? hit.point.y : lab.y - 1, c.z); v.face = Math.atan2(-Math.cos(c.a), -Math.sin(c.a)); return v; // faces back toward the lab
    });
  }
  function build() {
    if (ready) return; ready = true;
    const head = findHead(bot); const pHead = findHead(portrait?.bot);
    for (const [id, make] of [['sunhat', sunhat], ['crown', crown]]) { parts[id] = []; for (const h of [head, pHead]) if (h) { const m = make(); m.visible = false; h.add(m); parts[id].push(m); } }
    const lab = terrain.lab && world.tileTop(terrain.lab);
    if (lab) {
      // the flag stands at the lab tile's outer corner, beside the building (not through its roof)
      const out = new THREE.Vector3(lab.x, 0, lab.z).normalize(); const f = flag(); f.position.copy(lab).addScaledVector(out, 2.6); f.position.y = lab.y - 0.2; f.rotation.y = Math.atan2(out.x, out.z) + Math.PI / 2; f.visible = false; root.add(f); parts.flag = [f];
      const spots = beachSpots();
      [['fountain', fountain], ['statue', statue]].forEach(([id, make], i) => { const p = spots[i]; if (!p) return; const m = make(); m.position.copy(p); m.rotation.y = p.face; m.visible = false; root.add(m); parts[id] = [m]; });
    }
    // fireworks: a pool of small solid cubes that shrink away (never fade)
    const N = 360; const fw = new THREE.InstancedMesh(new THREE.BoxGeometry(0.7, 0.7, 0.7), new THREE.MeshBasicMaterial({ color: '#ffffff' }), N);
    fw.instanceMatrix.setUsage(THREE.DynamicDrawUsage); fw.frustumCulled = false; fw.count = N; root.add(fw);
    const zero = new THREE.Matrix4().makeScale(0, 0, 0); for (let i = 0; i < N; i++) { fw.setMatrixAt(i, zero); fw.setColorAt(i, new THREE.Color('#ffffff')); }
    parts.fireworks = { mesh: fw, p: Array.from({ length: N }, () => ({ life: 0 })), next: 0, i: 0 };
  }
  const o3 = new THREE.Object3D(); const col = new THREE.Color();
  function burst(at) {
    const F = parts.fireworks; if (!F) return; const c = FW_COLS[Math.floor(Math.random() * FW_COLS.length)]; const c2 = FW_COLS[Math.floor(Math.random() * FW_COLS.length)];
    const n = 48;
    for (let k = 0; k < n; k++) {
      const p = F.p[F.i = (F.i + 1) % F.p.length]; const u = Math.random() * 2 - 1, a = Math.random() * Math.PI * 2, r = Math.sqrt(1 - u * u), sp = 9 + Math.random() * 4;
      Object.assign(p, { x: at.x, y: at.y, z: at.z, vx: r * Math.cos(a) * sp, vy: u * sp + 2, vz: r * Math.sin(a) * sp, life: 1.5 + Math.random() * 0.5, max: 2 });
      F.mesh.setColorAt(F.i, col.set(k % 3 ? c : c2));
    }
    F.mesh.instanceColor.needsUpdate = true;
  }
  const randomSky = () => new THREE.Vector3((Math.random() - 0.5) * 60, 42 + Math.random() * 16, (Math.random() - 0.5) * 44);
  const api = {
    root,
    // on: the ids switched on in the shop; reduce: the Reduce motion setting
    set(ids, { reduce: r = false } = {}) {
      build(); on = new Set(ids || []); reduce = !!r;
      for (const id of ['sunhat', 'crown', 'flag', 'fountain', 'statue']) for (const m of parts[id] || []) m.visible = on.has(id);
    },
    // fireworks now (the finale), whatever the time of day; never with Reduce motion
    celebrate(n = 4) { build(); if (reduce) return; for (let i = 0; i < n; i++) setTimeout(() => burst(randomSky()), i * 450); },
    update(dt, t, hour) {
      if (!ready) return;
      if (!reduce) {
        for (const c of parts.flag?.[0]?.visible ? parts.flag[0].userData.cols : []) c.rotation.y = Math.sin(t * 3 - c.position.x * 0.9) * 0.28 * (c.position.x / 3.4);
        for (const d of parts.fountain?.[0]?.visible ? parts.fountain[0].userData.drops : []) { const ph = (t * 0.9 + d.userData.a / 6.28) % 1; d.position.set(Math.cos(d.userData.a) * (0.3 + ph * 1.4), 2.8 + Math.sin(ph * Math.PI) * 1.8, Math.sin(d.userData.a) * (0.3 + ph * 1.4)); }
        const bee = parts.statue?.[0]?.visible && parts.statue[0].userData.bee; if (bee) bee.position.y = 3.7 + Math.sin(t * 1.6) * 0.15;
      }
      const F = parts.fireworks; if (!F) return;
      const dusk = hour >= 18.6 && hour <= 22.5 && root.visible;
      if (on.has('fireworks') && dusk && !reduce && t > F.next) { burst(randomSky()); F.next = t + 1.4 + Math.random() * 1.2; }
      let any = false;
      for (let i = 0; i < F.p.length; i++) {
        const p = F.p[i]; if (p.life <= 0) continue; any = true;
        p.life -= dt; p.vy -= 9 * dt; p.vx *= 1 - 1.2 * dt; p.vz *= 1 - 1.2 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt;
        const s = Math.max(0, Math.min(1, p.life / 0.6)); o3.position.set(p.x, p.y, p.z); o3.scale.setScalar(p.life > 0 ? s : 0); o3.updateMatrix(); F.mesh.setMatrixAt(i, o3.matrix);
      }
      if (any || F.dirty) { F.mesh.instanceMatrix.needsUpdate = true; F.dirty = any; }
    },
  };
  return api;
}
