// Short animated films that play when a plan becomes real: surveying, laying streets, building homes
// (crane, scaffolding, workers), ploughing and planting (tractor), installing power (turbine raised,
// blades fitted, panels on roofs) and opening the town heart. Letterboxed, captioned and skippable.
import * as THREE from 'three';
import { Vox } from '../engine/voxel.js';
import { person } from '../engine/kit.js';
import { ITEMS } from '../world/catalog.js';
import { h, esc } from '../ui/ui.js';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const FILMS = {
  land: { title: 'Surveying the land', icon: '📐', lines: { j: 'Surveyors mark out the town with posts and flags.', s: 'Surveyors stake out the site boundary.' }, crew: 'survey' },
  move: { title: 'Laying the streets', icon: '🚧', lines: { j: 'The road roller lays paths and lanes, tile by tile.', s: 'Paths, lanes and crossings are laid.' }, crew: 'roller' },
  homes: { title: 'Building the homes', icon: '🏗', lines: { j: 'Builders raise the homes, layer by layer.', s: 'Construction: walls, floors, roofs.' }, crew: 'crane' },
  food: { title: 'Ploughing and planting', icon: '🚜', lines: { j: 'The tractor ploughs, sows and plants. Watch it grow!', s: 'Fields ploughed and sown; orchard and hives planted.' }, crew: 'tractor' },
  power: { title: 'Installing the power', icon: '🔧', lines: { j: 'Engineers raise the turbine and fit the panels.', s: 'Installation: turbine tower, blades, panels, storage.' }, crew: 'install' },
  heart: { title: 'Opening the town heart', icon: '✂', lines: { j: 'The new school and square are built. Ribbon-cutting time!', s: 'Civic buildings completed and opened.' }, crew: 'crane' },
};

export function createFilm(app) {
  const { world, rig, stage, ui, audio } = app; const scene = stage.scene;
  const bars = h('<div id="letterbox"><i></i><i></i></div>'); document.getElementById('app').appendChild(bars);
  const props = new THREE.Group(); scene.add(props);
  let actors = [];

  // ---------- props
  function crane(at, height) {
    const v = new Vox(); v.jitter = 0.03;
    for (let y = 0; y < height; y++) { v.set(0, y, 0, y % 2 ? '#ffc83d' : '#e3a91f'); v.set(1, y, 1, y % 2 ? '#e3a91f' : '#ffc83d'); }
    const mast = v.mesh({ scale: 0.6 }); const g = new THREE.Group(); g.add(mast);
    const jv = new Vox(); for (let x = -3; x < 12; x++) jv.set(x, 0, 0, x % 2 ? '#ffc83d' : '#e3a91f'); jv.box(-4, -1, -1, -3, 0, 1, '#5b6168'); jv.set(0, 1, 0, '#2b3a55');
    const jib = jv.mesh({ scale: 0.6 }); jib.position.y = height * 0.6; g.add(jib);
    const hook = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1, 0.15), new THREE.MeshLambertMaterial({ color: '#3b3b3b' })); hook.geometry.translate(0, -0.5, 0); jib.add(hook);
    const load = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.6, 1.2), new THREE.MeshLambertMaterial({ color: '#c08a56' })); jib.add(load);
    g.position.copy(at); props.add(g);
    return (t, st) => { jib.rotation.y = Math.sin(t * 0.6) * 0.9 - 0.4; const drop = st ? Math.max(0.5, height * 0.6 - (st.level - at.y) - 1) : 4; hook.position.set(6, 0, 0); hook.scale.y = drop; load.position.set(6, -drop - 0.3, 0); load.visible = !!st && st.k < 0.97; };
  }
  function scaffold(L, top) {
    const g = new THREE.Group(); const mat = new THREE.MeshLambertMaterial({ color: '#8f959a' }); const plank = new THREE.MeshLambertMaterial({ color: '#c99a5a' });
    const x0 = L.ox - 0.4, x1 = L.ox + 6.4, z0 = L.oz - 0.4, z1 = L.oz + 6.4, y0 = L.oy + 1;
    for (const [x, z] of [[x0, z0], [x1, z0], [x0, z1], [x1, z1], [(x0 + x1) / 2, z0], [(x0 + x1) / 2, z1]]) { const p = new THREE.Mesh(new THREE.BoxGeometry(0.18, top - y0, 0.18), mat); p.position.set(x, (top + y0) / 2, z); g.add(p); }
    for (let y = y0 + 1.5; y < top; y += 1.6) { const a = new THREE.Mesh(new THREE.BoxGeometry(x1 - x0, 0.14, 0.6), plank); a.position.set((x0 + x1) / 2, y, z0); g.add(a); const b = a.clone(); b.position.z = z1; g.add(b); }
    props.add(g); return g;
  }
  function vehicle(kind) {
    const v = new Vox(); v.jitter = 0.03;
    if (kind === 'roller') { v.box(-2, 0, -1, 2, 1, 1, '#ffc83d'); v.box(-1, 2, -1, 1, 3, 0, '#ffc83d'); v.box(-1, 2, 0, 1, 3, 0, '#bfe6ff'); v.box(3, 0, -2, 4, 1, 2, '#5b6168'); v.box(-3, 0, -1, -3, 0, 1, '#2b2b2b'); v.set(0, 4, -1, '#e8573f'); }
    else { v.box(-2, 1, -1, 1, 2, 1, '#e8573f'); v.box(-1, 3, -1, 1, 4, 1, '#e8573f'); v.box(-1, 3, -1, 1, 4, -1, '#bfe6ff'); v.box(-3, 0, -2, -2, 2, -2, '#2b2b2b'); v.box(-3, 0, 2, -2, 2, 2, '#2b2b2b'); v.box(1, 0, -2, 1, 1, -2, '#2b2b2b'); v.box(1, 0, 2, 1, 1, 2, '#2b2b2b'); v.box(2, 2, 0, 2, 3, 0, '#5b6168'); }
    const m = v.mesh({ scale: 0.6 }); props.add(m); return m;
  }
  function worker(i, hat = '#ffd23f') { const p = person({ shirt: ['#ff8a5c', '#16c79a', '#2f6fd8'][i % 3], hair: hat, s: 0.3 }); props.add(p); return p; }
  function flag(at) { const g = new THREE.Group(); const pole = new THREE.Mesh(new THREE.BoxGeometry(0.15, 3, 0.15), new THREE.MeshLambertMaterial({ color: '#ffffff' })); pole.position.y = 1.5; const f = new THREE.Mesh(new THREE.BoxGeometry(1, 0.6, 0.08), new THREE.MeshLambertMaterial({ color: '#e8573f' })); f.position.set(0.55, 2.7, 0); g.add(pole, f); g.position.copy(at); props.add(g); return g; }
  function ribbon(at) { const g = new THREE.Group(); const mat = new THREE.MeshLambertMaterial({ color: '#e8573f' }); const r = new THREE.Mesh(new THREE.BoxGeometry(5, 0.25, 0.1), mat); r.position.y = 1.4; const p1 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2, 0.2), new THREE.MeshLambertMaterial({ color: '#ffd23f' })); p1.position.set(-2.5, 1, 0); const p2 = p1.clone(); p2.position.x = 2.5; g.add(r, p1, p2); g.position.copy(at); props.add(g); return { g, r }; }
  function clear() { for (const c of [...props.children]) props.remove(c); actors = []; }

  // ---------- director
  const film = {
    playing: false, skip: false,
    async play(levelId, keys, cells, { band = 'junior' } = {}) {
      const F = FILMS[levelId]; keys = [...keys];
      if (!keys.length) return;
      if (app.reduce) { for (const k of keys) world.setCell(k, cells.get(k)); return; }
      this.playing = true; this.skip = false; clear();
      const tall = (k) => { const c = cells.get(k); const it = c?.item && ITEMS[c.item]; return it && !['road', 'carpark', 'path', 'cycle', 'tram', 'bridge', 'bigfield', 'mixed', 'allot', 'raingarden', 'reedbed', 'compost', 'hedge', 'hives'].includes(c.item); };
      const ordered = keys.slice().sort((a, b) => world.tileTop(a).x - world.tileTop(b).x);
      const pickItem = (...ids) => { for (const id of ids) { const k = ordered.find((kk) => cells.get(kk)?.item === id); if (k) return k; } return null; };
      const hero = { land: ordered[Math.floor(ordered.length / 2)], move: pickItem('cycle', 'path', 'road'), homes: pickItem('timber', 'straw', 'cohousing', 'earth', 'reclaimed', 'concrete'),
        food: pickItem('mixed', 'bigfield', 'allot', 'orchard'), power: pickItem('wind', 'battery'), heart: pickItem('school', 'market', 'hall') }[levelId] || keys.find(tall) || ordered[Math.floor(ordered.length / 2)];
      const heroP = world.tileTop(hero); const centre = keys.reduce((v, k) => v.add(world.tileTop(k)), new THREE.Vector3()).multiplyScalar(1 / keys.length);
      // UI: letterbox + title, everything else away
      ui.only([]); ui.show('card', false); ui.show('strip', false); app.bot.show(false); bars.classList.add('on'); app.ui.caption(null);
      const title = h(`<div id="filmtitle"><span>${F.icon}</span><b>${esc(F.title)}</b><small>${esc(band === 'junior' ? F.lines.j : F.lines.s)}</small></div>`); document.getElementById('layer').appendChild(title);
      const skipBtn = h('<button class="btn alt" id="filmskip">Skip ⏭</button>'); document.getElementById('layer').appendChild(skipBtn); skipBtn.onclick = () => { this.skip = true; };
      app.ui.say(band === 'junior' ? F.lines.j : F.lines.s);
      // shot 1: establishing, the crew arrives; surroundings first
      const heroDur = { land: 3, move: 9, homes: 16, food: 9, power: 13, heart: 14 }[levelId] || 10;
      await rig.focus(centre, { dist: 70, pitch: 0.62, yaw: rig.sky.yaw + 0.3 }, 1.3);
      // crew
      const crewUpd = [];
      const st = () => world.buildState(hero);
      if (F.crew === 'crane' && tall(hero)) { const away = heroP.clone().sub(stage.camera.position).setY(0).normalize(); crewUpd.push(crane(heroP.clone().add(away.multiplyScalar(-11)).add(new THREE.Vector3(-6, 0, 0)), 20)); }
      if (['crane', 'install', 'survey'].includes(F.crew)) for (let i = 0; i < 3; i++) { const w = worker(i, F.crew === 'survey' ? '#ffffff' : '#ffd23f'); const a = (i / 3) * Math.PI * 2; crewUpd.push((t) => { w.position.set(heroP.x + Math.cos(a + t * 0.3) * 4.6, heroP.y, heroP.z + Math.sin(a + t * 0.3) * 4.6); w.rotation.y = -(a + t * 0.3); w.userData.walk(t * 8); }); }
      if (F.crew === 'survey') ordered.slice(0, 8).forEach((k) => flag(world.tileTop(k)));
      if (F.crew === 'roller' || F.crew === 'tractor') {
        const flat = ordered.filter((k) => !tall(k)); const veh = vehicle(F.crew); const vk = flat.includes(hero) ? hero : flat[0];
        if (vk) crewUpd.push(() => { const s = world.buildState(vk); const p = world.tileTop(vk); veh.position.set(s && s.dir === 'x' ? s.level + 1 : p.x + 3.5, p.y + 0.1, p.z); veh.rotation.y = Math.PI; veh.visible = !!s; });
      }
      let tick = 0; const loop = (t) => { for (const f of crewUpd) f(t, st()); if (++tick % 20 === 0 && st() && st().k < 1) (F.crew === 'crane' || F.crew === 'install' ? audio.tap() : audio.ghost(tick)); };
      stage.onFrame(loop);
      // shot 2: close-up on the hero build
      // the hero tile is built slowly, stage by stage, with a numbered step strip so children can follow the method
      const steps = h('<div id="filmsteps"></div>'); document.getElementById('layer').appendChild(steps); this._steps = steps;
      const onStage = (i, st, all) => {
        steps.innerHTML = all.map((x, j) => `<span class="${j < i ? 'done' : j === i ? 'on' : ''}"><i>${j + 1}</i>${esc(band === 'junior' ? x.label.j : x.label.s)}</span>`).join('');
        audio.tap(); if (band === 'junior') ui.say(all[i].label.j);
      };
      world.setCell(hero, cells.get(hero), { build: { dur: heroDur, delay: 0.6, onStage } });
      const isTall = ['wind', 'concrete', 'school', 'hall'].includes(cells.get(hero)?.item);
      // look at the hero from outside the town, so nothing stands between the camera and the build
      const out = heroP.clone().sub(centre).setY(0); const yawOut = out.lengthSq() > 4 ? Math.atan2(out.x, out.z) : rig.sky.yaw;
      if (!this.skip) await rig.focus(heroP.clone().add(new THREE.Vector3(0, isTall ? 6 : 2, 0)), { dist: isTall ? 52 : levelId === 'food' || levelId === 'move' ? 34 : 24, pitch: levelId === 'food' || levelId === 'move' ? 0.95 : isTall ? 0.35 : 0.55, yaw: yawOut }, 1.4);
      const t0 = performance.now();
      rig.startTurntable(0.04);
      while (!this.skip && (world.builds.has(hero) || performance.now() - t0 < 1200) && performance.now() - t0 < 90000) await sleep(80);
      rig.startTurntable(0);
      // finale: pull back, little celebration
      // then the rest of this level's plan goes up quickly around it
      rig.startTurntable(0); if (!this.skip) await rig.focus(centre, { dist: 70, pitch: 0.7 }, 1.0);
      ordered.forEach((k, i) => { if (k !== hero) world.setCell(k, cells.get(k), { build: { dur: 1.8, delay: i * 0.1 } }); });
      const t1 = performance.now(); while (!this.skip && world.builds.size && performance.now() - t1 < 30000) await sleep(80);
      world.finishBuilds();
      if (levelId === 'heart') { const rb = ribbon(heroP.clone().add(new THREE.Vector3(0, 0, -4.2))); await sleep(400); rb.r.visible = false; }
      world.confetti(heroP.clone().add(new THREE.Vector3(0, 8, 0)), 70); audio.good();
      if (!this.skip) await rig.focus(centre, { dist: 80, pitch: 0.7 }, 1.2);
      stage.updaters.splice(stage.updaters.indexOf(loop), 1);
      clear(); title.remove(); skipBtn.remove(); this._steps?.remove(); bars.classList.remove('on'); ui.show('card'); ui.show('strip'); app.bot.show(true); this.playing = false;
    },
  };
  return film;
}
