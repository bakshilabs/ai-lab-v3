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
      ui.lensbar(`🌊 ${esc(app.C.checks.flood.label)} <span class="legend"><span><i style="background:#3d9de0"></i>Floods in winter</span><span><i style="background:#e5533d"></i>Town on flood land</span></span>`);
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
      ui.lensbar(`🦋 ${esc(app.C.checks.nature.label)} <span class="legend">${chip('Deer', '🦌', sp.deer)}${chip('Bees', '🐝', sp.bees)}${chip('Otters', '🦦', sp.otters)}${chip('Birds', '🐦', sp.birds)}${chip('Frogs', '🐸', sp.frogs)}</span>`);
      await sleep(app.reduce ? 200 : 900); return {};
    },
    async carbon(sim, cells) {
      // every tile that adds carbon is coloured: homes by their building materials, roads and car parks by their surface
      world.setClay(true, app.reduce); const spec = new Map(); const labels = []; const j = app.G?.j;
      const col = (e) => (e >= 20 ? '#e5533d' : e >= 6 ? '#ffb43d' : '#4caf50');
      const keys = [];
      for (const [k, c] of cells) {
        const it = c.item && ITEMS[c.item]; if (!it) continue;
        const e = it.home ? it.embodied + (c.mods || []).reduce((a, m) => a + (ITEMS[m].embodied || 0), 0) : it.carbon || 0;
        if (e <= 0) continue; spec.set(k, { color: col(it.home ? e : e * 3), pattern: e >= 20 ? 'stripes' : 'solid', lift: Math.min(3, e / 10) }); keys.push(k);
      }
      world.setOverlay(spec);
      const tiles = keys.map((k) => terrain.tiles.get(k)); const c = tiles.length ? tiles.reduce((a, t) => { const [x, z] = tileCenter(t.gx, t.gz); a.x += x / tiles.length; a.z += z / tiles.length; return a; }, new THREE.Vector3()) : new THREE.Vector3(2, 0, 2);
      const homesLevel = app.levelId === 'homes';
      const used = homesLevel ? sim.homesCarbon : sim.carbon, limit = homesLevel ? TARGETS.homesCarbon : TARGETS.carbonCeiling;
      const ratio = used / limit;
      if (!keys.length) { ui.labels.set([{ at: c.clone().add(new THREE.Vector3(0, 8, 0)), text: j ? 'Nothing built yet, so no carbon' : 'No carbon sources in this plan yet', cls: 'ok' }]); }
      else { carbonCloud(ratio * 1.4, c); labels.push({ at: c.clone().add(new THREE.Vector3(0, 24, 0)), text: homesLevel ? `${j ? 'Building carbon' : 'Embodied carbon'}: ${used} of ${limit} ${j ? 'tonnes' : 't'}` : `${j ? 'Town carbon' : 'Town total'}: ${used} of ${limit} ${j ? 'tonnes' : 't'}`, cls: ratio > 1 ? 'bad' : 'ok' }); ui.labels.set(labels); }
      ui.lensbar(`🌫 ${esc(app.C.checks.carbon.label)} <span class="legend"><span><i style="background:#e5533d"></i>High</span><span><i style="background:#ffb43d"></i>Medium</span><span><i style="background:#4caf50"></i>Low</span></span>`);
      await sleep(app.reduce ? 200 : 900); return { focusPoint: c };
    },
    async walk(sim, cells) {
      world.setClay(true, app.reduce); const spec = new Map(); const labels = [];
      const W = TARGETS.walkMinutes;
      for (const h of sim.homes) { const m = sim.walk[h.k]; spec.set(h.k, { color: m <= W ? '#4caf50' : '#e5533d', pattern: 'solid' }); labels.push({ k: h.k, m, at: world.tileTop(h.k).add(new THREE.Vector3(0, 6, 0)), text: `${m} min`, cls: m > W ? 'bad' : 'ok' }); }
      if (sim.schoolKey) { spec.set(sim.schoolKey, { color: '#2f6fd8', pattern: 'solid' }); labels.push({ m: -1, at: world.tileTop(sim.schoolKey).add(new THREE.Vector3(0, 8, 0)), text: '🏫 School' }); }
      // label the furthest homes and the nearest one, so the distances are easy to compare
      const sorted = labels.filter((l) => l.m >= 0).sort((a, b) => b.m - a.m); const show = [...sorted.slice(0, 4), sorted[sorted.length - 1], ...labels.filter((l) => l.m < 0)].filter(Boolean);
      world.setOverlay(spec); ui.labels.set([...new Set(show)]);
      ui.lensbar(`🚶 ${esc(app.C.checks.walk.label)} <span class="legend"><span><i style="background:#4caf50"></i>${W} min or less</span><span><i style="background:#e5533d"></i>Too far (over ${W})</span><span><i style="background:#2f6fd8"></i>School</span></span>`);
      await sleep(app.reduce ? 200 : 900); return {};
    },
    async winter(sim) {
      const j = app.G?.j; const sup = Math.round(sim.power.winterSupply), dem = Math.round(sim.power.demand);
      ui.lensbar(`❄ ${esc(app.C.checks.winter.label)} <span class="legend"><span>${j ? `⚡ Power ${sup} · homes need ${dem}` : `Supply ${sup} · Demand ${dem}`}</span></span>`);
      app.winterTest = true; const homes = sim.homes.map((h) => h.k);
      world.setLights(homes);
      // dusk falls on a still, snowy night; if supply runs short, the windows go dark one by one
      const keep = sim.power.winterOK ? homes.length : Math.floor(homes.length * Math.max(0, sup) / Math.max(1, dem));
      const steps = 40;
      for (let i = 0; i <= steps; i++) {
        stage.setTime(14 + (i / steps) * 8.5, Math.min(1, i / 10));
        if (i > steps * 0.55) { const f = (i - steps * 0.55) / (steps * 0.45); const n = Math.round(homes.length - (homes.length - keep) * f); world.setLights(homes.slice(0, n)); if (homes.length) ui.labels.set([{ at: world.tileTop(homes[0]).add(new THREE.Vector3(0, 10, 0)), text: sim.power.winterOK ? (j ? 'Lights on in every home' : 'All homes supplied') : `${j ? 'Lights on' : 'Supplied'}: ${n} of ${homes.length} homes`, cls: sim.power.winterOK ? 'ok' : n < homes.length ? 'bad' : '' }]); }
        await sleep(app.reduce ? 0 : 95);
      }
      await sleep(app.reduce ? 300 : 1600); return {};
    },
    async street(sim, cells) {
      const isMove = app.levelId === 'move';
      const target = isMove ? terrain.school : (sim.homes[0]?.k || [...cells].find(([, c]) => c.mark === 'town')?.[0] || terrain.school);
      const tt = terrain.tiles.get(target);
      // stand on a neighbouring tile (prefer the road or crossing), a few steps back from the target
      const nbr = [[0, -1], [-1, 0], [1, 0], [0, 1]].map(([dx, dz]) => terrain.tiles.get(`${tt.gx + dx},${tt.gz + dz}`)).filter(Boolean)
        .sort((a, b) => (ITEMS[cells.get(b.k)?.item]?.car ? 2 : cells.get(b.k)?.item ? 1 : 0) - (ITEMS[cells.get(a.k)?.item]?.car ? 2 : cells.get(a.k)?.item ? 1 : 0))[0] || tt;
      const p = world.tileTop(target), q = world.tileTop(nbr.k); const dir = p.clone().sub(q).setY(0).normalize();
      const from = q.clone().sub(dir.clone().multiplyScalar(11)).add(new THREE.Vector3(dir.z * 1.5, 2.6, -dir.x * 1.5));
      if (isMove) stage.setTime(8.75);
      // children waiting to cross, and cars rushing past, when the plan put cars at the gate
      if (isMove && sim.unsafeCrossings > 0) {
        kids = new THREE.Group(); stage.scene.add(kids);
        for (let i = 0; i < 4; i++) { const k = person({ shirt: ['#ffd23f', '#16c79a', '#ff7eb6', '#2f6fd8'][i], s: 0.22 }); k.position.copy(q).add(new THREE.Vector3(dir.z * 4 + dir.x * (i * 1.1 - 1), 0, -dir.x * 4 + dir.z * (i * 1.1 - 1))); /* queued at the kerb, to the side of the view */ k.rotation.y = Math.atan2(dir.x, dir.z); kids.add(k); }
      }
      await rig.toStreet(from, p.clone().add(new THREE.Vector3(0, 2, 0)), 1.6);
      const labels = sim.unsafeKeys.slice(0, 3).map((uk) => ({ at: world.tileTop(uk).add(new THREE.Vector3(0, 2.5, 0)), text: 'Too many cars to cross', cls: 'bad' }));
      ui.labels.set(labels); ui.lensbar(`👀 ${esc(app.C.checks.street.label)} · ${isMove ? '8:45 am, school run' : 'midday'}`);
      return {};
    },
    async inside(sim) {
      const counts = {}; for (const hh of sim.homes) counts[hh.item] = (counts[hh.item] || 0) + 1;
      const type = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0] || 'timber';
      const temp = ITEMS[type]?.temp ?? 20; inside.build(type, temp);
      await rig.fade(() => { inside.root.visible = true; rig.mode = 'inside'; rig.apply(inside.pose()); });
      ui.lensbar(`🏠 ${esc(app.C.checks.inside.label)} · ${esc(inside.label)} · <b>${temp} °C</b> with the heating off`);
      return { temp };
    },
  };

  return {
    clear,
    // run a check against a planned town (cells after the plan). Returns {revealed, info}
    async run(id, sim, cells, reveal) {
      clear(); app.audio.whoosh();
      if (!['street', 'inside'].includes(id) && rig.mode === 'sky') await rig.overview(0.9); // lenses read best on the whole island
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
