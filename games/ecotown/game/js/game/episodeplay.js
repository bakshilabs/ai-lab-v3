// Staging engine for the story episodes (scripts: episodes.js). It turns one script into a deterministic
// render(T), like the build videos' ?shoot= path, so tests/video/episodes.mjs can capture it frame by frame.
// Everything on screen is the game's own: the island, Florence, the builds and their construction, the lenses
// and the honest simulation (the numbers on labels come from simulate(), never from the script).
// Only used by index.html?episode=<id> (main.js); the game itself plays the recorded videos (ui/epviewer.js).
import * as THREE from 'three';
import { person, otter as otterMesh } from '../engine/kit.js';
import { Vox } from '../engine/voxel.js';
import { tileAt, key, tileCenter, riverX } from '../world/terrain.js';
import { ITEMS, TARGETS } from '../world/catalog.js';
import { simulate } from '../sim/sim.js';
import { plan, applyPlacements } from '../sim/planner.js';
import { seedTo } from './seed.js';
import { CAST, schedule } from './episodes.js';

const EMPTY = { mark: null, item: null, mods: [] };
const lerp = (a, b, k) => a + (b - a) * k;
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const smooth = (k) => k * k * (3 - 2 * k);
const LENS_NAME = { flood: '🌊 Flood lens', nature: '🦋 Nature lens', carbon: '🌫 Carbon lens', walk: '🚶 Walking-time lens' };

const CSS = `
#epstage { position: absolute; inset: 0; pointer-events: none; z-index: 30; font-family: 'Inter', system-ui, sans-serif; color: #2b1d14; overflow: hidden; }
#epstage .eptitle { position: absolute; left: 3%; top: 5%; background: #fbf3e0; border: 3px solid #5e4936; border-radius: 14px; padding: 8px 16px 10px; box-shadow: 0 4px 0 #5e4936; max-width: 60%; }
#epstage .eptitle small { display: block; font-weight: 800; font-size: 12px; letter-spacing: .08em; color: #b5523b; }
#epstage .eptitle b { font-family: 'Bricolage', 'Inter', sans-serif; font-size: 26px; line-height: 1.1; }
#epstage .eppill { position: absolute; transform: translate(-50%, -100%); background: #1f2d4a; color: #fff; font-weight: 800; font-size: 17px; padding: 6px 13px; border-radius: 12px; border: 3px solid #16c79a; white-space: nowrap; }
#epstage .eppill::after { content: ''; position: absolute; left: 50%; bottom: -11px; margin-left: -8px; border: 8px solid transparent; border-top-color: #16c79a; border-bottom: 0; }
#epstage .eppill.ok { border-color: #7fd18a; } #epstage .eppill.ok::after { border-top-color: #7fd18a; }
#epstage .eplabel { position: absolute; transform: translate(-50%, -100%); background: #fbf3e0; border: 3px solid #5e4936; font-weight: 800; font-size: 15px; padding: 4px 10px; border-radius: 10px; white-space: nowrap; }
#epstage .eplabel.bad { background: #e5533d; color: #fff; border-color: #7c2415; } #epstage .eplabel.ok { background: #2e8b57; color: #fff; border-color: #17502f; } #epstage .eplabel.small { font-size: 13px; padding: 2px 7px; border-width: 2px; }
#epstage .eplens { position: absolute; left: 50%; top: 4%; transform: translateX(-50%); background: #1f2d4a; color: #fff; font-weight: 800; font-size: 16px; padding: 6px 14px; border-radius: 12px; white-space: nowrap; }
#epstage .eplens span { margin-left: 12px; font-weight: 700; color: #cfeaff; }
#epstage .epcard { position: absolute; left: 50%; top: 8%; transform: translateX(-50%); width: 72%; background: #fbf3e0; border: 4px solid #5e4936; border-radius: 18px; box-shadow: 0 6px 0 #5e4936; padding: 12px 20px 14px; text-align: center; }
#epstage .epcard small { display: block; font-weight: 800; font-size: 12px; letter-spacing: .08em; color: #b5523b; margin-bottom: 2px; }
#epstage .epcard b { font-family: 'Bricolage', 'Inter', sans-serif; font-size: 30px; line-height: 1.15; display: block; }
#epstage .epcard p { margin: 6px 0 0; font-weight: 700; font-size: 19px; line-height: 1.25; text-align: left; display: flex; gap: 10px; align-items: baseline; }
#epstage .epcard p i { font-style: normal; flex: none; }
`;

export function createEpisodePlay({ stage, world, life, terrain, rig, bot, app }, ep, durs = {}) {
  const S = schedule(ep, durs);
  const canvas = stage.renderer.domElement;
  if (!document.getElementById('epstagecss')) { const st = document.createElement('style'); st.id = 'epstagecss'; st.textContent = CSS; document.head.appendChild(st); }
  const root = document.createElement('div'); root.id = 'epstage'; document.getElementById('app').appendChild(root);
  const el = (cls, html) => { const d = document.createElement('div'); d.className = cls; d.innerHTML = html; root.appendChild(d); return d; };
  const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

  // ---------- places
  const groundY = (x, z) => { const a = tileAt(x, z); if (a) { const k = key(a[0], a[1]); if (terrain.tiles.has(k)) return world.tileTop(k).y; } return 0; };
  const actors = {};
  function place(spec) {
    if (spec && spec.isVector3) return spec.clone();
    if (spec === 'fl' || spec === 'florence') return bot.position.clone();
    if (actors[spec]) return actors[spec].pos.clone();
    const [tile, off] = String(spec).split('+'); const [gx, gz] = tile.split(',').map(Number); const [dx, dz] = (off || '0,0').split(',').map(Number);
    const [cx, cz] = tileCenter(gx, gz); const x = cx + dx, z = cz + dz;
    return new THREE.Vector3(x, groundY(x, z), z);
  }

  // ---------- the town: Florence's practice island for this mission, plus the plans the script names
  const base = seedTo(terrain, ep.setup.seed); for (const c of base.values()) c.locked = false;
  let cur = new Map(base); let sim = simulate(terrain, cur);
  const plans = {};
  for (const [name, [level, slots, numbers]] of Object.entries(ep.plans || {})) {
    const p = plan(level, slots, { terrain, cells: base, numbers: numbers || { minutes: 10 } });
    plans[name] = { placements: p.placements, after: applyPlacements(base, p.placements) };
  }
  const same = (a, b) => JSON.stringify(a || EMPTY) === JSON.stringify(b || EMPTY);
  const cellFor = (m, k) => m.get(k) || EMPTY;
  const state = { hour: ep.setup.hour ?? 11, winter: ep.setup.winter ?? 0, flood: 0, still: false, lens: null, lit: 0 };
  function settle() {
    sim = simulate(terrain, cur); life.setTown(sim, cur, stage.q);
    const homes = sim.homes.map((h) => h.k); world.setLights(homes.slice(0, Math.round(homes.length * state.lit)));
  }
  function showAll(cells) { for (const t of terrain.tiles.values()) world.setCell(t.k, cellFor(cells, t.k)); }
  function toCells(after, build) {
    world.clearGhost();
    const keys = [...terrain.tiles.keys()].filter((k) => !same(cur.get(k), after.get(k))).sort((a, b) => world.tileTop(a).x - world.tileTop(b).x + (world.tileTop(a).z - world.tileTop(b).z) * 0.3);
    keys.forEach((k, i) => world.setCell(k, cellFor(after, k), build ? { build: { dur: build.dur ?? 1.5, delay: i * (build.stagger ?? 0.08) } } : {}));
    cur = new Map(after); settle(); if (state.lens) lens(state.lens);
  }

  // ---------- the cast: two children built with the game's resident builder, and Pebble the otter
  const cast = new THREE.Group(); stage.scene.add(cast);
  function kid(name) {
    const g = person({ ...CAST[name].look, s: 0.42 }); cast.add(g);
    const a = { g, pos: place(ep.setup.cast[name]), to: null, speed: 0, face: null, jump: -1, talk: 0, yaw: 0, ph: 0 };
    a.update = (dt, t) => {
      let moving = false;
      if (a.to) { const dx = a.to.x - a.pos.x, dz = a.to.z - a.pos.z; const d = Math.hypot(dx, dz); const step = a.speed * dt; if (d <= step) { a.pos.x = a.to.x; a.pos.z = a.to.z; a.to = null; } else { a.pos.x += (dx / d) * step; a.pos.z += (dz / d) * step; a.yawTo = Math.atan2(dx, dz); moving = true; a.ph += dt * 10; } }
      if (!moving) { const f = a.face ? place(a.face) : stage.camera.position; a.yawTo = Math.atan2(f.x - a.pos.x, f.z - a.pos.z); }
      let d = a.yawTo - a.yaw; d = Math.atan2(Math.sin(d), Math.cos(d)); a.yaw += d * Math.min(1, dt * 8);
      a.pos.y = groundY(a.pos.x, a.pos.z);
      let hop = 0; if (a.jump >= 0) { a.jump += dt; const k = a.jump / 0.5; hop = k < 2 ? Math.abs(Math.sin(k * Math.PI)) * (k < 1 ? 1.1 : 0.6) : 0; if (k >= 2) a.jump = -1; }
      if (a.talk > 0) { a.talk -= dt; hop += Math.abs(Math.sin(t * 9)) * 0.16; }
      g.userData.walk(moving ? a.ph : 0);
      g.position.set(a.pos.x, a.pos.y + hop, a.pos.z); g.rotation.y = a.yaw + (a.talk > 0 ? Math.sin(t * 6) * 0.12 : 0);
    };
    return a;
  }
  for (const name of Object.keys(ep.setup.cast || {})) actors[name] = kid(name);
  const otter = (() => {
    const g = otterMesh({ s: 0.34 }); cast.add(g);
    const p = place(ep.setup.otter || '2,6'); p.x = riverX(p.z) + 0.6;
    const o = { g, pos: p, up: 0, upTo: 0, shake: 0, spin: 0 };
    o.update = (dt, t) => {
      o.up += (o.upTo - o.up) * Math.min(1, dt * 6); if (o.shake > 0) o.shake -= dt; if (o.spin > 0) o.spin -= dt;
      const hop = o.spin > 0 ? Math.abs(Math.sin(o.spin * 7)) * 1.2 : 0;
      g.visible = o.up > 0.03; g.position.set(o.pos.x, -1.6 + o.up * 2.3 + Math.sin(t * 2.2) * 0.06 + hop, o.pos.z);
      g.rotation.set(0, -0.75 + (o.spin > 0 ? o.spin * 9 : 0) + (o.shake > 0 ? Math.sin(t * 22) * 0.35 : 0), 0.5 * o.up * (o.spin > 0 ? 0 : 1));
    };
    return o;
  })();

  // ---------- labels drawn over the picture (burned into the video): Florence's "% sure" pill, lens numbers, cards
  const anchored = [];
  const vTmp = new THREE.Vector3();
  function anchorPos(a) { if (a.who) { const p = place(a.who); p.y += a.who === 'florence' || a.who === 'fl' ? 9.4 : 5.2; return p; } return a.at; }
  function addLabel(a) { a.el = el(a.cls, esc(a.text)); a.el.style.visibility = 'hidden'; anchored.push(a); return a; }
  function placeLabels(T) {
    const W = canvas.clientWidth, H = canvas.clientHeight;
    for (let i = anchored.length - 1; i >= 0; i--) {
      const a = anchored[i]; if (a.until != null && T >= a.until) { a.el.remove(); anchored.splice(i, 1); continue; }
      vTmp.copy(anchorPos(a)).project(stage.camera);
      const on = vTmp.z < 1 && Math.abs(vTmp.x) < 1.1 && Math.abs(vTmp.y) < 1.1;
      a.el.style.visibility = on ? 'visible' : 'hidden';
      // keep labels inside the picture
      const w = a.el.offsetWidth / 2; const x = clamp((vTmp.x * 0.5 + 0.5) * W, w + 6, W - w - 6), y = Math.max(a.el.offsetHeight + 6, (-vTmp.y * 0.5 + 0.5) * H);
      a.el.style.left = `${x}px`; a.el.style.top = `${y}px`;
    }
  }
  const titleEl = el('eptitle', `<small>ECO TOWN · STORY ${ep.n} OF 6 · ${ep.kind === 'open' ? 'BEFORE THE MISSION' : 'AFTER THE MISSION'}</small><b>${esc(ep.title)}</b>`);
  let lensEl = null, cardEl = null, lensLabels = [], cloud = null;

  // ---------- lenses: the same pictures the game's checks draw (js/game/checks.js), from the same simulation
  function clearLens() { for (const a of lensLabels) { a.until = -1; } lensLabels = []; world.setOverlay(null); world.setClay(false, true); if (cloud) cloud.visible = false; lensEl?.remove(); lensEl = null; state.lens = null; }
  function lens(id) {
    clearLens(); if (!id) return; state.lens = id;
    world.setClay(true, true); const spec = new Map(); let note = '';
    const lab = (at, text, cls) => lensLabels.push(addLabel({ at, text, cls: `eplabel ${cls}` }));
    if (id === 'flood') {
      let n = 0;
      for (const t of terrain.tiles.values()) { const c = cur.get(t.k); const wet = t.zone === 'meadow' || t.zone === 'wetland'; const town = c?.mark === 'town' || (c?.item && ITEMS[c.item].home); if (!wet) continue; if (town) n++; spec.set(t.k, town ? { color: '#e5533d', pattern: 'cross', lift: Math.max(0, 3.25 - (t.h + 1.14)) } : { color: '#3d9de0', pattern: 'waves' }); }
      note = n ? `Town on flood land: ${n} tiles` : 'No town land floods';
      if (n) lab(world.tileTop('4,5').add(new THREE.Vector3(0, 5, 0)), `${n} town tiles under water`, 'bad');
    }
    if (id === 'nature') {
      for (const t of terrain.tiles.values()) { const c = cur.get(t.k); const it = c?.item && ITEMS[c.item]; const used = !!it || c?.mark === 'town';
        if (t.zone === 'wood' || t.zone === 'meadow' || t.zone === 'wetland' || t.hedge) spec.set(t.k, used && !['mixed', 'orchard', 'hives', 'reedbed', 'greenbridge', 'park'].includes(c?.item) ? { color: '#e5533d', pattern: 'cross' } : { color: '#4caf50', pattern: 'solid' });
        else if (it && it.nature > 0) spec.set(t.k, { color: '#7fd18a', pattern: 'dots' }); }
      const sp = sim.species; note = [['Deer', '🦌', sp.deer], ['Bees', '🐝', sp.bees], ['Otters', '🦦', sp.otters], ['Birds', '🐦', sp.birds], ['Frogs', '🐸', sp.frogs]].map(([n, e, on]) => `${e} ${n} ${on ? '✓' : '✕'}`).join('  ');
      const gone = ['deer', 'bees', 'otters', 'birds', 'frogs'].filter((n) => !sp[n]);
      if (gone.length) lab(world.tileTop('7,2').add(new THREE.Vector3(0, 4, 0)), `Gone: ${gone.join(' and ')}`, 'bad');
    }
    if (id === 'carbon') {
      const col = (e) => (e >= 20 ? '#e5533d' : e >= 6 ? '#ffb43d' : '#4caf50'); const keys = [];
      for (const [k, c] of cur) { const it = c.item && ITEMS[c.item]; if (!it) continue; const e = it.home ? it.embodied + (c.mods || []).reduce((a, m) => a + (ITEMS[m].embodied || 0), 0) : it.carbon || 0; if (e <= 0) continue; spec.set(k, { color: col(it.home ? e : e * 3), pattern: e >= 20 ? 'stripes' : 'solid', lift: Math.min(3, e / 10) }); keys.push(k); }
      const c = keys.reduce((a, k) => a.add(world.tileTop(k).multiplyScalar(1 / keys.length)), new THREE.Vector3());
      const used = sim.homesCarbon, limit = TARGETS.homesCarbon; const ratio = used / limit;
      if (!cloud) { const v = new Vox(); for (let x = -6; x <= 6; x++) for (let y = -2; y <= 2; y++) for (let z = -4; z <= 4; z++) if ((x / 6.5) ** 2 + (y / 2.6) ** 2 + (z / 4.5) ** 2 < 1 + Math.sin(x * 1.3 + z) * 0.15) v.set(x, y, z, y > 0 ? '#5d5650' : '#3f3a36'); cloud = v.mesh({ castShadow: false }); cloud.traverse((o) => { if (o.isMesh) o.material = new THREE.MeshLambertMaterial({ vertexColors: true }); }); stage.scene.add(cloud); }
      cloud.visible = true; cloud.position.copy(c).add(new THREE.Vector3(0, 16, 0)); cloud.scale.setScalar(clamp(ratio * 1.4, 0.5, 1.7));
      lab(c.clone().add(new THREE.Vector3(0, 25, 0)), `Building carbon: ${used} of ${limit} tonnes`, ratio > 1 ? 'bad' : 'ok'); note = 'red = high · green = low';
    }
    if (id === 'walk') {
      const W = TARGETS.walkMinutes; const ls = [];
      for (const h of sim.homes) { const m = sim.walk[h.k]; spec.set(h.k, { color: m <= W ? '#4caf50' : '#e5533d', pattern: 'solid' }); ls.push({ m, at: world.tileTop(h.k).add(new THREE.Vector3(0, 6, 0)), text: `${m} min`, cls: m > W ? 'bad small' : 'ok small' }); }
      ls.sort((a, b) => b.m - a.m); for (const l of [...ls.slice(0, 4), ls[ls.length - 1]]) if (l) lab(l.at, l.text, l.cls);
      if (sim.schoolKey) { spec.set(sim.schoolKey, { color: '#2f6fd8', pattern: 'solid' }); lab(world.tileTop(sim.schoolKey).add(new THREE.Vector3(0, 5, 0)), '🏫 New school', ''); }
      note = `Longest walk: ${sim.walkMax} min (town rule: ${W} or less ${sim.walkMax <= W ? '✓' : '✗'})`;
    }
    world.setOverlay(spec);
    lensEl = el('eplens', `${LENS_NAME[id]}<span>${esc(note)}</span>`);
  }

  // ---------- ramps (time of day, flood, lights) and the actions a script can call
  const ramps = [];
  const ramp = (dur, fn, T) => { if (dur <= 0) fn(1); else ramps.push({ t0: T, t1: T + dur, fn }); };
  const applyTime = () => { stage.setTime(state.hour, state.winter); app.hour = state.hour; };
  const sfxLog = [];
  const FL = { oops: () => bot.oops(), proud: () => bot.proud(), cheer: () => bot.cheer(), wave: () => bot.wave(), surprised: () => bot.surprised(), nod: () => bot.nod(), think: () => bot.think(1.8) };
  function act(a, T) {
    const args = a.filter((x) => !(x && typeof x === 'object' && !Array.isArray(x) && 'at' in x && Object.keys(x).length === 1));
    const [op, p1, p2, p3, p4] = args;
    if (op === 'talk') { if (p1 === 'florence') bot.talk(p2); else if (actors[p1]) actors[p1].talk = p2; return; }
    if (op === 'fl') {
      if (FL[p1]) FL[p1]();
      else if (p1 === 'look') bot.look(p2 ? place(p2).add(new THREE.Vector3(0, actors[p2] ? 2 : 1, 0)) : null);
      else if (p1 === 'point') bot.point(place(p2).add(new THREE.Vector3(0, 1, 0)), 2.4);
      else if (p1 === 'peer') bot.peer(place(p2).add(new THREE.Vector3(0, 1, 0)), 2.2);
      else if (p1 === 'at') bot.appear(place(p2));
      else if (p1 === 'walk') bot.walkTo(place(p2), { maxDur: p3 || 2 });
      return;
    }
    if (op === 'kid') { const k = actors[p1]; if (!k) return; if (p2 === 'jump') k.jump = 0; else if (p2 === 'face') k.face = p3; else if (p2 === 'at') { k.pos = place(p3); k.to = null; } else if (p2 === 'walk') { k.to = place(p3); k.speed = Math.hypot(k.to.x - k.pos.x, k.to.z - k.pos.z) / (p4 || 2); } return; }
    if (op === 'otter') { if (p1 === 'pop') otter.upTo = 1; else if (p1 === 'dive') otter.upTo = 0; else if (p1 === 'shake') otter.shake = 0.8; else if (p1 === 'spin') { otter.upTo = 1; otter.spin = 1.2; } return; }
    if (op === 'ghost') { world.showGhost(plans[p1].placements, plans[p1].after, { coded: true }); return; }
    if (op === 'build') { toCells(plans[p1].after, p2 || {}); return; }
    if (op === 'cells') { toCells(plans[p1].after, null); return; }
    if (op === 'reset') { toCells(base, null); return; }
    if (op === 'lens') { lens(p1); return; }
    if (op === 'flood') { const from = state.flood; ramp(p2 || 0, (k) => { state.flood = lerp(from, p1, k); world.setFlood(state.flood); }, T); return; }
    if (op === 'time') { const h0 = state.hour, w0 = state.winter; ramp(p3 || 0, (k) => { state.hour = lerp(h0, p1, k); state.winter = lerp(w0, p2, k); applyTime(); }, T); return; }
    if (op === 'still') { state.still = !!p1; return; }
    if (op === 'lights') {
      // 'all' = every home lit; 'out' = the honest winter test: only as many homes stay lit as the winter supply can power
      const homes = sim.homes.map((h) => h.k); const sup = Math.max(0, sim.power.winterSupply), dem = Math.max(1, sim.power.demand);
      const to = p1 === 'all' ? 1 : sim.power.winterOK ? 1 : Math.floor(homes.length * sup / dem) / Math.max(1, homes.length); const from = state.lit;
      ramp(p2 || 0, (k) => { state.lit = lerp(from, to, k); world.setLights(homes.slice(0, Math.round(homes.length * state.lit))); }, T); return;
    }
    if (op === 'pill') { addLabel({ who: p1, text: p2, cls: `eppill ${typeof p4 === 'string' ? p4 : ''}`, until: T + (p3 || 3) }); return; }
    if (op === 'label') {
      const lit = Math.round(sim.homes.length * (p2.includes('{lit}') ? (sim.power.winterOK ? 1 : Math.floor(sim.homes.length * Math.max(0, sim.power.winterSupply) / Math.max(1, sim.power.demand)) / Math.max(1, sim.homes.length)) : 0));
      const text = p2.replace('{hc}', sim.homesCarbon).replace('{limit}', TARGETS.homesCarbon).replace('{lit}', lit).replace('{homes}', sim.homes.length).replace('{walk}', sim.walkMax);
      addLabel({ at: place(p1).add(new THREE.Vector3(0, 7, 0)), text, cls: `eplabel ${p4 || ''}`, until: T + (p3 || 3) }); return;
    }
    if (op === 'card') {
      const c = ep.card; sfxLog.push({ t: T, name: ep.kind === 'open' ? 'question' : 'reward' });
      cardEl = el('epcard', c.ask ? `<small>THE QUESTION</small><b>${esc(c.ask)}</b>` : `<small>TWO THINGS TO REMEMBER</small><p><i>🌍</i><span>${esc(c.eco)}</span></p><p><i>🤖</i><span>${esc(c.ai)}</span></p>`);
      return;
    }
    if (op === 'sfx') { sfxLog.push({ t: T, name: p1 }); return; }
  }

  // ---------- set the stage
  showAll(base);
  if (ep.setup.apply) { cur = new Map(plans[ep.setup.apply].after); showAll(cur); }
  state.lit = ep.setup.lights === 'all' ? 1 : 0; settle(); applyTime(); world.setFlood(0);
  bot.appear(place(ep.setup.florence)); bot.look(null); bot.show(true);
  sfxLog.push({ t: 0.15, name: 'sting' });

  // ---------- camera: each shot is one move (a hard cut between shots)
  function poseAt(T) {
    const sh = S.shots.find((s) => T < s.t1) || S.shots[S.shots.length - 1]; const c = sh.cam, to = c.to || {};
    const k = smooth(clamp((T - sh.t0) / Math.max(0.01, sh.t1 - sh.t0)));
    const look = place(c.look); if (to.look) look.lerp(place(to.look), k); look.y += c.up ?? 1.5;
    const dist = lerp(c.dist, to.dist ?? c.dist, k), yaw = lerp(c.yaw, to.yaw ?? c.yaw, k), pitch = lerp(c.pitch, to.pitch ?? c.pitch, k);
    const pos = new THREE.Vector3(Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch)).multiplyScalar(dist).add(look);
    return { pos, look, fov: c.fov || 30 };
  }

  // ---------- the clock: fixed 1/60 s steps up to T, so every run gives the same film
  let now = 0, ev = 0; const dt = 1 / 60;
  function render(T) {
    while (now < T - 1e-6) {
      const step = Math.min(dt, T - now); now += step;
      while (ev < S.events.length && S.events[ev].t <= now) { act(S.events[ev].a, now); ev++; }
      for (let i = ramps.length - 1; i >= 0; i--) { const r = ramps[i]; const k = clamp((now - r.t0) / (r.t1 - r.t0)); r.fn(k); if (k >= 1) ramps.splice(i, 1); }
      rig.apply(poseAt(now)); // the cast turns to the camera
      world.update(step, now, { windStill: state.still }); life.update(step, now, state.hour, { windStill: state.still });
      for (const a of Object.values(actors)) a.update(step, now); otter.update(step, now); bot.update(step, now);
    }
    rig.apply(poseAt(T)); stage.camera.updateMatrixWorld(); stage.render(dt, T);
    titleEl.style.display = T < 3.4 ? '' : 'none';
    placeLabels(T);
  }
  return { duration: S.duration, render, timeline: () => ({ id: ep.id, duration: S.duration, cues: S.cues, sfx: sfxLog.slice().sort((a, b) => a.t - b.t), music: ep.music, shots: S.shots.map((s) => [s.t0, s.t1]) }) };
}
