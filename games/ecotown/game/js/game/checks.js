// The ways to check a plan. Each shows the honest simulation of the *planned* town, so the flaw the
// AI couldn't see from the sky becomes visible. Returns when the player has seen it.
import * as THREE from 'three';
import { ITEMS, TARGETS } from '../world/catalog.js';
import { tileCenter } from '../world/terrain.js';
import { Vox } from '../engine/voxel.js';
import { person } from '../engine/kit.js';
import { esc } from '../ui/ui.js';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function createChecks(app) {
  const { world, ui, rig, stage, terrain, inside, life } = app;
  let cloud = null, kids = null;
  const clear = () => { if (kids) { stage.scene.remove(kids); kids = null; } world.setOverlay(null); world.setClay(false, app.reduce); world.setFlood(0); ui.labels.clear('lbl'); ui.lensbar(null); if (cloud) { cloud.visible = false; } };

  function carbonCloud(level, center) {
    if (!cloud) { const v = new Vox(); for (let x = -6; x <= 6; x++) for (let y = -2; y <= 2; y++) for (let z = -4; z <= 4; z++) if ((x / 6.5) ** 2 + (y / 2.6) ** 2 + (z / 4.5) ** 2 < 1 + Math.sin(x * 1.3 + z) * 0.15) v.set(x, y, z, y > 0 ? '#8d959b' : '#6f777d'); cloud = v.mesh({ castShadow: false }); stage.scene.add(cloud); }
    cloud.visible = true; cloud.position.copy(center).add(new THREE.Vector3(0, 18, 0)); cloud.scale.setScalar(Math.max(0.4, Math.min(2.6, level)) * 1.1);
  }

  const RUN = {
    async flood(sim, cells) {
      world.setClay(true, app.reduce); const spec = new Map();
      for (const t of terrain.tiles.values()) {
        const c = cells.get(t.k); const wet = t.zone === 'meadow' || t.zone === 'wetland';
        if (wet) spec.set(t.k, { color: c?.mark === 'town' || (c?.item && ITEMS[c.item].home) ? '#e5533d' : '#3d9de0', pattern: 'waves' });
      }
      world.setOverlay(spec);
      ui.lensbar(`🌊 ${esc(app.C.checks.flood.label.toUpperCase())} <span class="legend"><span><i style="background:#3d9de0"></i>Floods in winter</span><span><i style="background:#e5533d"></i>Town land that floods</span></span>`);
      const flooded = [...cells].filter(([k, c]) => (c.mark === 'town' || (c.item && ITEMS[c.item].home)) && ['meadow', 'wetland'].includes(terrain.tiles.get(k)?.zone)).map(([k]) => k);
      for (let i = 0; i <= 20; i++) { world.setFlood(i / 20); await sleep(app.reduce ? 0 : 45); }
      if (flooded.length) ui.labels.set([{ at: world.tileTop(flooded[0]).add(new THREE.Vector3(0, 3, 0)), text: `${flooded.length} tiles under water`, cls: 'bad' }]);
      return { focus: flooded[0] };
    },
    async nature(sim, cells) {
      world.setClay(true, app.reduce); const spec = new Map();
      for (const t of terrain.tiles.values()) {
        const c = cells.get(t.k); const it = c?.item && ITEMS[c.item]; const used = !!it || c?.mark === 'town';
        if (t.zone === 'wood' || t.zone === 'meadow' || t.zone === 'wetland' || t.hedge) spec.set(t.k, used && !['mixed', 'orchard', 'hives', 'reedbed', 'greenbridge', 'park'].includes(c?.item) ? { color: '#e5533d', pattern: 'cross' } : { color: '#4caf50', pattern: 'solid' });
        else if (it && (it.nature > 0)) spec.set(t.k, { color: '#7fd18a', pattern: 'dots' });
      }
      world.setOverlay(spec);
      const sp = sim.species; const chip = (n, e, on) => `<span>${e} ${n} ${on ? '✓' : '✕'}</span>`;
      ui.lensbar(`🦋 ${esc(app.C.checks.nature.label.toUpperCase())} <span class="legend">${chip('Deer', '🦌', sp.deer)}${chip('Bees', '🐝', sp.bees)}${chip('Otters', '🦦', sp.otters)}${chip('Birds', '🐦', sp.birds)}${chip('Frogs', '🐸', sp.frogs)}</span>`);
      await sleep(app.reduce ? 200 : 900); return {};
    },
    async carbon(sim, cells) {
      world.setClay(true, app.reduce); const spec = new Map(); const labels = [];
      for (const h of sim.homes) { const e = ITEMS[h.item].embodied; spec.set(h.k, { color: e >= 20 ? '#5b6168' : e >= 8 ? '#9aa0a5' : '#7fd18a', pattern: 'dots', lift: Math.min(3, e / 10) }); }
      world.setOverlay(spec);
      const homes = sim.homes.map((h) => terrain.tiles.get(h.k)); const c = homes.length ? homes.reduce((a, t) => { const [x, z] = tileCenter(t.gx, t.gz); a.x += x / homes.length; a.z += z / homes.length; return a; }, new THREE.Vector3()) : new THREE.Vector3();
      const ratio = sim.homesCarbon / TARGETS.homesCarbon; carbonCloud(ratio, c);
      labels.push({ at: c.clone().add(new THREE.Vector3(0, 24, 0)), text: `${sim.homesCarbon} t of ${TARGETS.homesCarbon} t`, cls: ratio > 1 ? 'bad' : 'ok' }); ui.labels.set(labels);
      ui.lensbar(`☁ ${esc(app.C.checks.carbon.label.toUpperCase())} <span class="legend"><span><i style="background:#5b6168"></i>High</span><span><i style="background:#9aa0a5"></i>Medium</span><span><i style="background:#7fd18a"></i>Low</span></span>`);
      await sleep(app.reduce ? 200 : 900); return { focusPoint: c };
    },
    async walk(sim, cells) {
      world.setClay(true, app.reduce); const spec = new Map(); const labels = [];
      for (const h of sim.homes) { const m = sim.walk[h.k]; spec.set(h.k, { color: m <= 10 ? '#4caf50' : m <= 15 ? '#ffc83d' : '#e5533d', pattern: m > 15 ? 'stripes' : 'solid' }); labels.push({ at: world.tileTop(h.k).add(new THREE.Vector3(0, 6, 0)), text: `${m} min`, cls: m > 15 ? 'bad' : m <= 10 ? 'ok' : '' }); }
      if (sim.schoolKey) spec.set(sim.schoolKey, { color: '#2f6fd8', pattern: 'solid' });
      world.setOverlay(spec); ui.labels.set(labels.sort((a, b) => parseInt(b.text) - parseInt(a.text)).filter((_, i) => i % 3 === 0).slice(0, 7));
      ui.lensbar(`🚶 ${esc(app.C.checks.walk.label.toUpperCase())} <span class="legend"><span><i style="background:#4caf50"></i>≤10 min</span><span><i style="background:#ffc83d"></i>≤15</span><span><i style="background:#e5533d"></i>Too far</span><span><i style="background:#2f6fd8"></i>School</span></span>`);
      await sleep(app.reduce ? 200 : 900); return {};
    },
    async winter(sim) {
      ui.lensbar(`❄ ${esc(app.C.checks.winter.label.toUpperCase())} <span class="legend"><span>Supply ${Math.round(sim.power.winterSupply)} · Demand ${Math.round(sim.power.demand)}</span></span>`);
      app.winterTest = true;
      for (let i = 0; i <= 24; i++) { stage.setTime(11 + (i / 24) * 11.5, i / 24); await sleep(app.reduce ? 0 : 60); }
      world.setLights(sim.power.winterOK ? sim.homes.map((h) => h.k) : []);
      await sleep(app.reduce ? 300 : 1400); return {};
    },
    async street(sim, cells) {
      const isMove = app.levelId === 'move';
      const target = isMove ? terrain.school : (sim.homes[0]?.k || [...cells].find(([, c]) => c.mark === 'town')?.[0] || terrain.school);
      const tt = terrain.tiles.get(target);
      // stand on a neighbouring tile (prefer the road or crossing), a few steps back from the target
      const nbr = [[0, -1], [-1, 0], [1, 0], [0, 1]].map(([dx, dz]) => terrain.tiles.get(`${tt.gx + dx},${tt.gz + dz}`)).filter(Boolean)
        .sort((a, b) => (ITEMS[cells.get(b.k)?.item]?.car ? 2 : cells.get(b.k)?.item ? 1 : 0) - (ITEMS[cells.get(a.k)?.item]?.car ? 2 : cells.get(a.k)?.item ? 1 : 0))[0] || tt;
      const p = world.tileTop(target), q = world.tileTop(nbr.k); const dir = p.clone().sub(q).setY(0).normalize();
      const from = q.clone().sub(dir.clone().multiplyScalar(9)).add(new THREE.Vector3(dir.z * 2, 2.2, -dir.x * 2));
      if (isMove) stage.setTime(8.75);
      // children waiting to cross, and cars rushing past, when the plan put cars at the gate
      if (isMove && sim.unsafeCrossings > 0) {
        kids = new THREE.Group(); stage.scene.add(kids);
        for (let i = 0; i < 4; i++) { const k = person({ shirt: ['#ffd23f', '#16c79a', '#ff7eb6', '#2f6fd8'][i], s: 0.22 }); k.position.copy(q).add(new THREE.Vector3(-dir.x * 3.2 + (i - 1.5) * 0.9 * dir.z, 0, -dir.z * 3.2 - (i - 1.5) * 0.9 * dir.x)); k.rotation.y = Math.atan2(dir.x, dir.z); kids.add(k); }
      }
      await rig.toStreet(from, p.clone().add(new THREE.Vector3(0, 2, 0)), 1.6);
      const labels = sim.unsafeKeys.slice(0, 3).map((uk) => ({ at: world.tileTop(uk).add(new THREE.Vector3(0, 2.5, 0)), text: 'Too many cars to cross', cls: 'bad' }));
      ui.labels.set(labels); ui.lensbar(`👀 ${esc(app.C.checks.street.label.toUpperCase())} · ${isMove ? '8:45 am' : 'midday'}`);
      return {};
    },
    async inside(sim) {
      const counts = {}; for (const hh of sim.homes) counts[hh.item] = (counts[hh.item] || 0) + 1;
      const type = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0] || 'timber';
      const temp = ITEMS[type]?.temp ?? 20; inside.build(type, temp);
      await rig.fade(() => { inside.root.visible = true; rig.mode = 'inside'; rig.apply(inside.pose()); });
      ui.lensbar(`🏠 ${esc(app.C.checks.inside.label.toUpperCase())} · ${esc(inside.label)} · <b>${temp} °C</b> with the heating off`);
      return { temp };
    },
  };

  return {
    clear,
    // run a check against a planned town (cells after the plan). Returns {revealed, info}
    async run(id, sim, cells, reveal) {
      clear(); app.audio.whoosh();
      const info = await RUN[id](sim, cells);
      return { revealed: reveal[id] || null, info };
    },
    async leave() {
      clear(); app.winterTest = false;
      if (rig.mode === 'inside') await rig.fade(() => { inside.root.visible = false; rig.mode = 'sky'; rig.apply(rig.skyPose()); });
      else if (rig.mode === 'street') await rig.overview(1.3);
      stage.setTime(app.hour, 0); app.refreshLights();
    },
  };
}
