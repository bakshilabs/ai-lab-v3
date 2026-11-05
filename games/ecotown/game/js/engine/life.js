// Residents, the followed family, wildlife, cars, the ferry and chimney smoke.
// Everything here reads the simulation: wildlife only appears if its habitat survives.
import * as THREE from 'three';
import { person, deer as deerMesh, duck as duckMesh, particles, rand } from './kit.js';
import { birds as birdFlock, butterflies } from './extras.js';
import { Vox } from './voxel.js';
import { tileCenter, riverX } from '../world/terrain.js';

const SHIRTS = ['#e8573f', '#2f6fd8', '#ffd23f', '#16c79a', '#b28cff', '#ff8a5c', '#ffffff', '#4caf50'];
const SKINS = ['#c68a5e', '#8d5a3b', '#f1c9a5', '#e0ac7e', '#5c3a26'];

export function createLife(stage, world, terrain) {
  const { scene } = stage; const root = new THREE.Group(); scene.add(root);
  const top = (k) => world.tileTop(k);
  const life = { residents: [], family: null, sim: null, cells: null, hour: 11 };

  // ---------- wildlife
  const deer = [0, 1, 2].map((i) => { const m = deerMesh({ s: 0.3 }); root.add(m); return { m, ph: i * 2.1 }; });
  const ducks = [0, 1, 2, 3].map((i) => { const m = duckMesh({ s: 0.28 }); root.add(m); return { m, ph: i * 1.7 }; });
  const wood = [...terrain.tiles.values()].filter((t) => t.zone === 'wood');
  const wet = [...terrain.tiles.values()].filter((t) => t.zone === 'wetland');
  const meadowCells = [...terrain.tiles.values()].filter((t) => t.zone === 'meadow').map((t) => tileCenter(t.gx, t.gz));
  const bflies = butterflies(scene, meadowCells, { n: 12, y: 0 });
  const flock = birdFlock(scene, { n: 8, center: [30, 34, -20], radius: 40, color: '#ffffff' });
  const BEES = 60; const bees = particles(BEES, { size: 0.22, color: '#ffd23f' }); bees.visible = false; root.add(bees);
  let beeSpots = [];

  // ---------- cars on roads, smoke from gas-heated homes
  const carMat = SHIRTS.map((c) => new THREE.MeshLambertMaterial({ color: c }));
  const cars = []; const carGeo = new THREE.BoxGeometry(1.6, 0.9, 0.9);
  const SMOKE = 70; const smoke = particles(SMOKE, { size: 0.6, color: '#d9dee2' }); smoke.material.transparent = true; smoke.material.opacity = 0.7; root.add(smoke);
  let chimneys = [];

  // ---------- ferry
  const ferry = (() => { const v = new Vox(); for (let x = -5; x <= 5; x++) for (let y = -2; y <= 2; y++) for (let z = -2; z <= 2; z++) if ((x / 5.5) ** 2 + (y / 2.4) ** 2 + (z / 2.4) ** 2 < 1) v.set(x, y + 5, z, y > 0 ? '#ffffff' : '#ffd23f'); v.box(-2, 1, -1, 2, 1, 1, '#2f6fd8'); v.box(-2, 2, -1, 2, 2, 1, '#9fd8f5'); v.set(-6, 5, 0, '#e8573f'); v.set(-6, 6, 0, '#e8573f'); const m = v.mesh(); m.scale.setScalar(0.7); root.add(m); return m; })();
  const dockP = top(terrain.dock); const ferryAt = (k) => new THREE.Vector3(dockP.x + 2, 3.2 + (1 - k) * 18, dockP.z + 7 + (1 - k) * 70); // a little sky-ferry docks at the pier
  life.ferryK = 1;

  // ---------- residents
  function makePerson(i, opts = {}) {
    const g = person({ shirt: opts.shirt || SHIRTS[i % SHIRTS.length], skin: SKINS[i % SKINS.length], hair: i % 3 ? '#2b1d14' : '#8a5a2b', s: opts.s || (i % 4 === 3 ? 0.22 : 0.3) });
    root.add(g); return g;
  }
  life.setTown = (sim, cells, tier) => {
    life.sim = sim; life.cells = cells;
    for (const r of life.residents) root.remove(r.g); life.residents = [];
    const homes = sim.homes.filter((h) => !h.flooded); const dests = [];
    for (const [k, c] of cells) if (c.item && ['school', 'market', 'park', 'allot', 'hall', 'festival', 'repair'].includes(c.item)) dests.push(k);
    if (terrain.school) dests.push(terrain.school);
    const n = Math.min(tier.residents, homes.length * 3);
    for (let i = 0; i < n; i++) {
      const home = homes[i % homes.length].k; const dest = dests.length ? dests[i % dests.length] : home;
      const g = makePerson(i); life.residents.push({ g, home, dest, ph: rand(i, 3) * 6, off: [rand(i, 1) * 3 - 1.5, rand(i, 2) * 3 - 1.5], cold: (sim.homes.find((h) => h.k === home)?.temp ?? 20) < 18 });
    }
    // the followed family: two adults and a child, a little larger
    if (!life.family) life.family = { members: [makePerson(0, { shirt: '#ff8a5c', s: 0.34 }), makePerson(1, { shirt: '#2f6fd8', s: 0.34 }), makePerson(2, { shirt: '#ffd23f', s: 0.25 })], home: null };
    life.family.home = homes[0]?.k || null;
    for (const m of life.family.members) m.visible = !!life.family.home;
    // wildlife visibility from the simulation
    deer.forEach((d) => (d.m.visible = sim.species.deer)); ducks.forEach((d) => (d.m.visible = sim.wetIntact >= 4));
    beeSpots = []; if (sim.species.bees) { for (const [k, c] of cells) if (c.item === 'hives' || c.item === 'orchard') beeSpots.push(top(k)); if (beeSpots.length < 3) for (const t of [...terrain.tiles.values()].filter((t) => t.zone === 'meadow').slice(0, 4)) beeSpots.push(top(t.k)); }
    bees.visible = beeSpots.length > 0;
    // cars on road tiles
    for (const c of cars) root.remove(c.m); cars.length = 0;
    let ci = 0; for (const [k, c] of cells) if (c.item === 'road') { for (let j = 0; j < 2; j++) { const m = new THREE.Mesh(carGeo, carMat[(ci++) % carMat.length]); root.add(m); cars.push({ m, k, ph: j * 0.5 + rand(ci, 2) }); } }
    chimneys = sim.homes.filter((h) => h.gas).map((h) => top(h.k).add(new THREE.Vector3(-1, 6, -0.5)));
  };

  // where is a resident at this hour? home → destination in the morning, back in the evening
  const posFor = (r, hour) => {
    const a = top(r.home), b = top(r.dest);
    let k = 0; if (hour >= 7.5 && hour < 9) k = (hour - 7.5) / 1.5; else if (hour >= 9 && hour < 16) k = 1; else if (hour >= 16 && hour < 17.5) k = 1 - (hour - 16) / 1.5;
    const p = a.clone().lerp(b, k); p.x += r.off[0]; p.z += r.off[1];
    const moving = (hour >= 7.5 && hour < 9) || (hour >= 16 && hour < 17.5);
    return { p, moving, out: hour >= 7 && hour < 19.5, dir: b.clone().sub(a).multiplyScalar(hour < 12 ? 1 : -1) };
  };

  life.familyPos = () => (life.family?.members[0].visible ? life.family.members[0].position.clone().add(new THREE.Vector3(0, 1.5, 0)) : null);
  life.update = (dt, t, hour, { windStill = false, moveIn = null } = {}) => {
    life.hour = hour;
    for (const r of life.residents) {
      const { p, moving, out, dir } = posFor(r, hour);
      r.g.visible = out; if (!out) continue;
      const wob = moving ? 0 : Math.sin(t * 0.8 + r.ph) * 0.6;
      r.g.position.set(p.x + wob, p.y, p.z + Math.cos(t * 0.7 + r.ph) * (moving ? 0 : 0.5));
      if (dir.lengthSq() > 0.01) r.g.rotation.y = Math.atan2(dir.x, dir.z);
      r.g.userData.walk(moving ? t * 9 + r.ph : 0);
      if (r.cold && hour > 17) r.g.position.x += Math.sin(t * 40) * 0.05; // shivering on the way home
    }
    // followed family: arrive by ferry during move-in, otherwise follow their home routine
    if (life.family?.home) {
      const home = top(life.family.home);
      life.family.members.forEach((m, i) => {
        let p;
        if (moveIn != null) { const dock = dockP.clone(); const k = Math.min(1, Math.max(0, (moveIn - 0.35) / 0.65)); p = dock.lerp(home, k); p.x += i * 0.9 - 0.9; p.z += 2.5; m.userData.walk(k > 0 && k < 1 ? t * 9 : 0); m.rotation.y = Math.atan2(home.x - dockP.x, home.z - dockP.z); }
        else { p = home.clone().add(new THREE.Vector3(i * 0.9 - 0.9, 0, -3.6 + Math.sin(t + i) * 0.2)); m.userData.walk(0); m.rotation.y = Math.PI; }
        m.position.copy(p); m.visible = moveIn == null || moveIn > 0.3 ? hour < 21.5 || moveIn != null : false;
      });
    }
    // ferry sails in during move-in and waits at the dock
    const fk = moveIn == null ? 1 : Math.min(1, moveIn / 0.35); ferry.position.copy(ferryAt(fk)); ferry.position.y += Math.sin(t * 1.3) * 0.15; ferry.rotation.y = Math.PI / 2;
    // wildlife
    deer.forEach((d, i) => { if (!d.m.visible) return; const w = wood[(i * 3) % wood.length]; const [cx, cz] = tileCenter(w.gx, w.gz); d.m.position.set(cx - 8 + Math.sin(t * 0.15 + d.ph) * 3, 1, cz + 6 + Math.cos(t * 0.12 + d.ph) * 2); d.m.rotation.y = t * 0.15 + d.ph; });
    ducks.forEach((d, i) => { if (!d.m.visible) return; const w = wet[(i * 4) % wet.length]; const [cx, cz] = tileCenter(w.gx, w.gz); d.m.position.set(cx + Math.sin(t * 0.4 + d.ph) * 1.6, 0.75 + Math.sin(t * 2 + i) * 0.05, cz + Math.cos(t * 0.4 + d.ph) * 1.6); d.m.rotation.y = -(t * 0.4 + d.ph); });
    bflies(t); flock(t);
    if (bees.visible) { for (let i = 0; i < BEES; i++) { const s = beeSpots[i % beeSpots.length]; bees.setAt(i, s.x + Math.sin(t * 3 + i) * 2.5, s.y + 2 + Math.sin(t * 5 + i * 2) * 0.8, s.z + Math.cos(t * 2.6 + i) * 2.5); } bees.done(); }
    // cars drive across their road tile (or wait at night)
    for (const c of cars) { const p = top(c.k); const k = ((t * 0.12 + c.ph) % 1); c.m.position.set(p.x - 3 + k * 6, p.y + 0.5, p.z - 0.6 + (c.ph > 0.5 ? 1.4 : 0)); c.m.visible = hour > 6.5 && hour < 22; }
    // smoke from gas boilers (winter or evenings)
    smoke.visible = chimneys.length > 0 && (stage.winter > 0 || hour > 16 || hour < 9);
    if (smoke.visible) { for (let i = 0; i < SMOKE; i++) { const c = chimneys[i % chimneys.length]; const k = ((t * 0.25 + i * 0.137) % 1); smoke.setAt(i, c.x + k * 1.5, c.y + k * 5, c.z + Math.sin(i) * 0.5, 0, 0, (1 - k) * 1.4 + 0.2); } smoke.done(); }
  };
  return life;
}
