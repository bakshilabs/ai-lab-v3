// Boot: stage, world, life, camera, UI; the start screen (age band, session length, settings);
// the living-island opening; then the game. window.__eco is a small debug/test API.
import * as THREE from 'three';
import { createStage, probeTier } from './engine/stage.js';
import { createLife } from './engine/life.js';
import { createFlorence } from './engine/florence.js';
import { initAudio, sfx, setSound, setMusic } from './engine/audio.js';
import { makeTerrain } from './world/terrain.js';
import { simulate } from './sim/sim.js';
import { createWorld } from './world/world.js';
import { createInside } from './world/inside.js';
import { createRig } from './camera/rig.js';
import { createUI, h, esc } from './ui/ui.js';
import { createGame } from './game/game.js';
import { loadModel, modelReady } from './ai/plotter.js';
import { CONTENT, NAME_IDEAS, cleanTownName } from './game/content.js';
import { loadVoices } from './ui/voice.js';

const $ = (s) => document.querySelector(s);
const prefs = (() => { try { return JSON.parse(localStorage.getItem('ecotown.prefs') || '{}'); } catch { return {}; } })();
const savePrefs = () => { try { localStorage.setItem('ecotown.prefs', JSON.stringify(app.settings)); } catch { /* */ } };

const canvas = $('#gl');
const stage = createStage(canvas, $('#sky'));
const terrain = makeTerrain();
const world = createWorld(stage, terrain);
const life = createLife(stage, world, terrain);
const inside = createInside(stage);
const rig = createRig(stage, canvas, $('#fade'));
const bot = createFlorence(stage, world, terrain);
{ const d = world.tileTop(terrain.dock); bot.appear(d.clone().add(new THREE.Vector3(-4, 0, -6))); }
life.setTown(simulate(terrain, new Map()), new Map(), stage.q);
const app = {
  stage, terrain, world, life, inside, rig, bot, audio: sfx, setMusic, band: 'junior', session: 60, classMode: false, sandboxFull: new URLSearchParams(location.search).get('sandbox') === 'full', hour: 11, moveIn: null, winterTest: false,
  settings: { readAloud: true, reduce: matchMedia('(prefers-reduced-motion: reduce)').matches, sound: true, facilitator: false, text: 'normal', quality: 'auto', ...prefs },
  get reduce() { return this.settings.reduce; },
  // town picture for the report: render, then paint it over the current sky colours
  snapshot() {
    stage.render(0, 0);
    try { const c = document.createElement('canvas'); c.width = canvas.width; c.height = canvas.height; const g = c.getContext('2d');
      const m = [0, ...(stage.skyColors || ['#4aa6ff', '#cfeaff'])];
      const gr = g.createLinearGradient(0, 0, 0, c.height); gr.addColorStop(0, m[1]); gr.addColorStop(1, m[2]); g.fillStyle = gr; g.fillRect(0, 0, c.width, c.height);
      g.drawImage(canvas, 0, 0); return c.toDataURL('image/jpeg', 0.85); } catch { return ''; }
  },
};
const ui = app.ui = createUI($('#layer'), $('#labels'), { facilitator: () => app.settings.facilitator });
function applySettings() {
  const s = app.settings; ui.readAloud = s.readAloud; rig.reduce = s.reduce; bot.reduce = s.reduce; setSound(s.sound);
  document.documentElement.dataset.motion = s.reduce ? 'reduce' : ''; document.documentElement.dataset.text = s.text;
  if (s.quality !== 'auto') stage.setTier(s.quality); savePrefs();
}
applySettings();

// ---------------- render loop
let last = performance.now(); const T0 = last;
function loop(now) {
  if (app.manual) { requestAnimationFrame(loop); return; } // the build-video recorder drives frames itself (?shoot=)
  const dt = Math.min(0.05, (now - last) / 1000); last = now; const t = (now - T0) / 1000;
  rig.update(dt); world.update(dt, t, { windStill: app.winterTest }); life.update(dt, t, app.hour, { windStill: app.winterTest, moveIn: app.moveIn }); inside.update(dt, t); bot.update(dt, t);
  stage.render(dt, t); ui.labels.update(stage.camera, canvas);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

// ---------------- settings sheet
function settingsSheet() {
  const s = app.settings; const P = ui.P.settings;
  const row = (k, label) => `<label>${esc(label)}<input type="checkbox" data-k="${k}" ${s[k] ? 'checked' : ''}></label>`;
  P.innerHTML = `<h3 style="margin:0 0 6px">Settings</h3>${row('readAloud', 'Read aloud')}${row('reduce', 'Reduce motion')}${row('sound', 'Sound')}${row('facilitator', 'Facilitator notes')}
    <label>Text size<select data-k="text"><option value="normal">Normal</option><option value="large" ${s.text === 'large' ? 'selected' : ''}>Large</option></select></label>
    <label>Graphics<select data-k="quality">${['auto', 'low', 'mid', 'high'].map((q) => `<option ${s.quality === q ? 'selected' : ''}>${q}</option>`).join('')}</select></label>
    <button class="btn alt" data-intro style="width:100%;margin:6px 0">▶ Watch Florence’s intro again</button><p style="font-size:.8em;color:#46596a">Florence: ${modelReady() ? 'small language model (on this device)' : 'keyword reader (model not loaded)'}. Voices: recorded on this device’s game files. Nothing you type is stored or sent.</p><button class="btn go" data-close>Done</button>`;
  P.querySelectorAll('[data-k]').forEach((i) => (i.onchange = () => { s[i.dataset.k] = i.type === 'checkbox' ? i.checked : i.value; applySettings(); ui.refreshFacil(); }));
  P.querySelector('[data-close]').onclick = () => ui.show('settings', false);
  P.querySelector('[data-intro]').onclick = () => { ui.show('settings', false); app.G?.replayIntro?.(); };
  ui.show('settings', true);
}
ui.P.tr.querySelector('[data-menu]').onclick = () => (ui.P.settings.classList.contains('hide') ? settingsSheet() : ui.show('settings', false));
ui.P.views.addEventListener('click', async (e) => {
  const b = e.target.closest('[data-v]'); if (!b || b.disabled) return;
  const v = b.dataset.v; ui.views(v);
  if (inside.root.visible) await rig.fade(() => { inside.root.visible = false; });
  const home = app.G?.cells && [...app.G.cells].find(([, c]) => c.item && /timber|straw|earth|reclaimed|cohousing|concrete/.test(c.item));
  if (v === 'sky') rig.overview(1.2);
  if (v === 'street') { const k = home?.[0] || terrain.school; const p = world.tileTop(k); rig.toStreet(p.clone().add(new THREE.Vector3(-8, 2.1, -9)), p.clone().add(new THREE.Vector3(0, 1.5, 0))); }
  if (v === 'inside') { inside.build(home?.[1].item || 'timber', 20); await rig.fade(() => { inside.root.visible = true; rig.mode = 'inside'; rig.apply(inside.pose()); }); }
});
rig.onDoubleTap = (ndc) => { if (rig.mode !== 'sky' || rig.building) return; /* no fly-ins while painting tiles */ const k = world.pick(ndc, stage.camera); if (k) rig.focus(world.tileTop(k), { dist: 55 }, 1.1); };

// ---------------- start screen
async function start() {
  rig.sky.yaw = -0.6; rig.startTurntable(0.05);
  const modelP = loadModel('./models/');
  const quality = app.settings.quality === 'auto' ? probeTier(stage) : Promise.resolve(app.settings.quality);
  const scr = h(`<div id="start"><div class="card">
    <span class="chip">A DELTAOPS LEARNING AI LAB</span><h1>Eco <span>Town</span></h1>
    <p style="font-weight:600;color:#46596a;margin:4px 0">Build your own town on a floating island. Florence, your AI helper, gives tips as you build. Step into the AI Lab to test her plans: she is clever, and sometimes confidently wrong. Can you catch her mistakes?</p>
    <div class="ages"><button class="age" data-band="junior"><b>Ages 8–12</b><span>Word tiles, picture chips and a friendly voice that reads everything aloud. Gentle consequences.</span></button><button class="age" data-band="senior"><b>Ages 13–17</b><span>Free-text instructions, real units, budgets and town-meeting dilemmas. 🔊 to hear any card.</span></button></div>
    <p class="both">Both versions have six AI Lab missions, ending with a bias check: who did Florence forget to ask? Next: name your town and choose how the missions are played.</p>
    <p data-resume style="display:none"></p>
  </div></div>`);
  $('#layer').appendChild(scr); setTimeout(() => scr.querySelector('[data-band]')?.focus(), 100);
  const ORDER = { free: 'Free: players build and open any AI Lab mission once it unlocks. Florence invites them when the town hits a problem a mission teaches.', class: 'In order: the class does the missions one by one. Only the next mission opens, and Florence invites players to it as soon as it is ready.' };
  const band = await new Promise((res) => scr.querySelectorAll('[data-band]').forEach((b) => (b.onclick = () => res(b.dataset.band))));
  initAudio(); sfx.good(); loadVoices(band);
  app.band = band; ui.readAloud = app.settings.readAloud && band === 'junior' ? true : app.settings.readAloud && band === 'senior' ? false : app.settings.readAloud;
  // name the town: one name, used everywhere (the header, the cards and the printed report)
  const card = scr.querySelector('.card');
  card.innerHTML = `<span class="chip">${band === 'junior' ? 'AGES 8–12' : 'AGES 13–17'}</span><h1>Name your <span>town</span></h1><p style="font-weight:600;color:#46596a">Pick a name or type your own.</p>
    <div class="names">${NAME_IDEAS.map((n) => `<button class="tile" data-n="${n}">${n}</button>`).join('')}</div>
    <div class="textin" style="margin-top:12px"><div class="field"><input data-name maxlength="24" placeholder="Your town’s name" aria-label="Town name" autocomplete="off"></div></div><p class="nameerr" data-err></p>
    <h3 class="setuphead">Session setup</h3>
    <div class="opts"><label>AI Lab missions <select data-order><option value="free" ${app.classMode ? '' : 'selected'}>Any order</option><option value="class" ${app.classMode ? 'selected' : ''}>In order (class)</option></select></label>
    <label><input type="checkbox" data-facil ${app.settings.facilitator ? 'checked' : ''}> Facilitator notes</label></div>
    <p class="sessnote" data-sessnote></p>
    <div class="row" style="justify-content:center;margin-top:10px"><button class="btn go" data-go>Start ➜</button></div>`;
  const sn = card.querySelector('[data-sessnote]'); sn.textContent = ORDER[app.classMode ? 'class' : 'free'];
  card.querySelector('[data-order]').onchange = (e) => { app.classMode = e.target.value === 'class'; sn.textContent = ORDER[e.target.value]; };
  card.querySelector('[data-facil]').onchange = (e) => { app.settings.facilitator = e.target.checked; applySettings(); ui.refreshFacil(); };
  const inp = card.querySelector('[data-name]'); inp.value = NAME_IDEAS[Math.floor(Math.random() * NAME_IDEAS.length)]; setTimeout(() => inp.focus(), 50);
  card.querySelectorAll('[data-n]').forEach((b) => (b.onclick = () => { inp.value = b.dataset.n; inp.focus(); }));
  app.townName = await new Promise((res) => { const go = () => { const n = cleanTownName(inp.value); if (!n) { card.querySelector('[data-err]').textContent = 'Please choose a friendly name, or pick one above.'; return; } res(n); }; card.querySelector('[data-go]').onclick = go; inp.onkeydown = (e) => { if (e.key === 'Enter') go(); }; });
  sfx.good(); ui.setTownName(app.townName);
  scr.remove();
  const tier = await quality; if (app.settings.quality === 'auto') stage.setTier(tier);
  await modelP;
  const G = createGame(app);
  const saved = G.saved();
  if (saved && !app.sandboxFull) { const a = await ui.modal(`<div class="ribbon">Welcome back</div><h2>Carry on building ${esc(saved.townName || 'your town')}?</h2><div class="row" style="justify-content:center"><button class="btn go" data-act="resume">Carry on</button><button class="btn alt" data-act="new">Start a new town</button></div>`); if (a === 'resume') { G.load(saved); ui.setTownName(G.townName); } }
  // living-island opening: about 10 seconds, skippable
  rig.startTurntable(0); setMusic('calm');
  await G.run();
}
window.__eco = { app, terrain, ready: () => !!app.G, modelReady, thumbExtras: () => ({ ailab: { mark: null, item: 'ailab', mods: [] } }) };
// Passcode sessions (only when served by the Eco Town Worker; local and GitHub Pages builds have no /api).
// Every minute the game checks its session is still the active one for this passcode (newest login wins).
(async function heartbeat() {
  let first = true;
  const beat = async () => {
    let r; try { r = await fetch('/api/heartbeat', { method: 'POST', credentials: 'same-origin' }); } catch { return; }   // offline: keep playing
    if (first && (r.status === 404 || r.status === 405 || r.status === 501)) return 'off';                               // no passcode server here
    first = false;
    if (r.status === 409) { let d = {}; try { d = await r.json(); } catch { /* */ } locked(d); return 'locked'; }
  };
  const lockedNow = await beat(); if (lockedNow) return;
  const t = setInterval(async () => { if (await beat()) clearInterval(t); }, 60000);
})();
function locked(d) {
  try { setSound(false); } catch { /* */ }
  const card = h(`<div style="position:fixed;inset:0;z-index:100;display:grid;place-items:center;background:rgba(30,40,60,.55)"><div class="panel modal" style="position:relative;left:auto;top:auto;transform:none">
    <div class="ribbon">Eco Town</div><div class="big">🔒</div><h2>${d.reason === 'expired' ? 'Your free access has ended' : d.reason === 'revoked' ? 'This passcode is switched off' : 'Playing on another device'}</h2>
    <p>${esc(d.message || 'This passcode is now being used on another device.')}</p><button class="btn go" data-act="again">Log in again</button></div></div>`);
  document.body.appendChild(card); card.querySelector('[data-act]').onclick = async () => { try { await fetch('/api/logout', { method: 'POST' }); } catch { /* */ } location.replace('/'); };
}
// light deterrents against casual copying (not real protection: the browser must have the code to run it)
const typing = (e) => /INPUT|TEXTAREA/.test(e.target?.tagName);
window.addEventListener('contextmenu', (e) => { if (!typing(e)) e.preventDefault(); });
window.addEventListener('keydown', (e) => { const k = e.key.toLowerCase(), mod = e.ctrlKey || e.metaKey; if (mod && (k === 's' || k === 'u' || (e.shiftKey && (k === 'i' || k === 'j' || k === 'c')))) e.preventDefault(); });
window.addEventListener('dragstart', (e) => e.preventDefault());
// Film preview: index.html?film=homes builds the town up to that level with the clear instructions, then plays its film.
const filmParam = new URLSearchParams(location.search).get('film');
app.townName = 'Eco Town';
const shootParam = new URLSearchParams(location.search).get('shoot');
if (shootParam) shoot(shootParam); else if (filmParam) filmPreview(filmParam); else start();

// Build videos: index.html?shoot=<item> builds a whole demo town, puts the item on a good tile and exposes
// window.__render(t) (deterministic, fixed steps) for tests/video/record.mjs. About 10 s: the build goes up
// seen from above (0–6 s), the camera swoops down (6–7.5 s), then an eye-level shot with Florence peering at it.
async function shoot(id) {
  app.manual = true; $('#layer').style.display = 'none'; $('#labels').style.display = 'none';
  const { seedTo, CLEAR } = await import('./game/seed.js'); const { plan, applyPlacements } = await import('./sim/planner.js');
  const { ITEMS, placeReason } = await import('./world/catalog.js'); const { cellOf } = await import('./sim/sim.js');
  stage.setTier(new URLSearchParams(location.search).get('tier') || 'high');
  let cells = seedTo(terrain, 'heart'); cells = applyPlacements(cells, plan('heart', CLEAR.heart, { terrain, cells, numbers: { minutes: 10 } }).placements);
  for (const c of cells.values()) c.locked = false;
  const it = ITEMS[id]; const town = [...cells].filter(([, c]) => c.mark === 'town').map(([k]) => world.tileTop(k));
  const centre = town.reduce((v, p) => v.add(p), new THREE.Vector3()).multiplyScalar(1 / Math.max(1, town.length));
  // the hero tile: allowed for the item, free, near the town, towards the front of the island (camera side)
  const score = (t) => world.tileTop(t.k).distanceTo(centre) - t.gz * 1.5;
  let hero, cell;
  const tiles = [...terrain.tiles.values()].filter((t) => !t.fixed);
  if (it.kind === 'mod') { const homes = tiles.filter((t) => { const c = cells.get(t.k); return c?.item && ITEMS[c.item].home && !c.mods.includes(id); }).sort((a, b) => score(a) - score(b)); hero = homes[0]; const c = cells.get(hero.k); cell = { ...c, mods: [...c.mods, id] }; cells.set(hero.k, { ...c }); }
  else {
    const free = tiles.filter((t) => { const c = cellOf(cells, t.k); if (c.item) return false; if (it.kind === 'mark') return !c.mark && ['field', 'slope', 'meadow'].includes(t.zone); return !placeReason(id, t, c); });
    // on town land, a free town tile if there is one; otherwise make one
    hero = free.sort((a, b) => score(a) - score(b))[0];
    if (!hero && it.on.includes('town')) { hero = tiles.filter((t) => ['field', 'slope'].includes(t.zone) && !cellOf(cells, t.k).item).sort((a, b) => score(a) - score(b))[0]; cells.set(hero.k, { mark: 'town', item: null, mods: [], locked: false }); }
    const c = cellOf(cells, hero.k); cell = it.kind === 'mark' ? { ...c, mark: id } : { ...c, mods: [...c.mods], item: id };
  }
  const k = hero.k; const heroCellBefore = cells.get(k) || null;
  for (const t of terrain.tiles.values()) world.setCell(t.k, cells.get(t.k) || { mark: null, item: null, mods: [] });
  if (it.kind === 'mod') world.setCell(k, heroCellBefore); else world.setCell(k, cellOf(cells, k).mark ? { mark: cellOf(cells, k).mark, item: null, mods: [] } : { mark: null, item: null, mods: [] });
  const after = new Map(cells); after.set(k, cell);
  life.setTown(simulate(terrain, after), after, stage.q); app.hour = 10.5; stage.setTime(10.5, 0);
  const P = world.tileTop(k); const DUR = 10, B0 = 0.5, BDUR = 5.0, SW0 = 6.0, SW1 = 7.5;
  const stages = []; let started = false, last = 0;
  // camera: a slow orbit from above, a swoop, then eye level beside the build
  const yaw0 = -0.55, pitch = 0.78, dist = 74;
  const skyAt = (t) => { const yaw = yaw0 + 0.32 * (t / SW0); const pos = new THREE.Vector3(P.x - Math.sin(yaw) * Math.cos(pitch) * dist, P.y + Math.sin(pitch) * dist, P.z + Math.cos(yaw) * Math.cos(pitch) * dist); return { pos, look: P.clone().add(new THREE.Vector3(0, 1.5, 0)), fov: 22 }; };
  const LOW = new Set(['road', 'carpark', 'path', 'cycle', 'bigfield', 'mixed', 'allot', 'raingarden', 'reedbed', 'compost', 'hedge', 'hives', 'bridge', 'tram', 'festival']);
  const tall = (it.kind === 'build' && !LOW.has(id)) || it.kind === 'mod';
  const eyeDist = id === 'wind' ? 26 : tall ? 15 : 11;
  // eye level: pick the direction whose line of sight crosses only open, low tiles (no buildings, woods or terraces)
  const { tileAt, key: tkey } = await import('./world/terrain.js');
  const openAt = (x, z) => { const a = tileAt(x, z); if (!a) return false; const t = terrain.tiles.get(tkey(a[0], a[1])); if (!t || t.k === k) return !!t; const c = after.get(t.k); if (t.fixed || t.zone === 'wood' || t.zone === 'river') return false; if (c?.item && !LOW.has(c.item)) return false; return world.tileTop(t.k).y <= P.y + 1.2; };
  let side = null;
  for (let i = 0; i < 24 && !side; i++) { const a = yaw0 + 0.32 + (i % 2 ? -1 : 1) * Math.ceil(i / 2) * (Math.PI / 12); const d = new THREE.Vector3(-Math.sin(a), 0, Math.cos(a)); let ok = true; for (let r = 4; r <= eyeDist + 4 && ok; r += 1.5) for (const off of [-2.5, 0, 2.5]) { const q = P.clone().addScaledVector(d, r).add(new THREE.Vector3(d.z * off, 0, -d.x * off)); if (!openAt(q.x, q.z)) { ok = false; break; } } if (ok) side = d; }
  side ||= new THREE.Vector3(-Math.sin(yaw0 + 0.32), 0, Math.cos(yaw0 + 0.32));
  const across = new THREE.Vector3(side.z, 0, -side.x);
  const eyeAt = (t) => { const u = Math.min(1, Math.max(0, (t - SW1) / (DUR - SW1))); const pos = P.clone().addScaledVector(side, eyeDist).addScaledVector(across, -2.5 + 5 * u); pos.y = P.y + 2.2; return { pos, look: P.clone().add(new THREE.Vector3(0, id === 'wind' ? 7 : tall ? 2.6 : 0.8, 0)), fov: 50 }; };
  const ease = (x) => x * x * (3 - 2 * x);
  const poseAt = (t) => { if (t <= SW0) return skyAt(t); if (t >= SW1) return eyeAt(t); const a = skyAt(SW0), b = eyeAt(SW1), k2 = ease((t - SW0) / (SW1 - SW0)); return { pos: a.pos.clone().lerp(b.pos, k2).add(new THREE.Vector3(0, Math.sin(k2 * Math.PI) * 6, 0)), look: a.look.clone().lerp(b.look, k2), fov: a.fov + (b.fov - a.fov) * k2 }; };
  // Florence waits beside the build and peers at it once it is finished
  const flAt = (sg) => P.clone().addScaledVector(across, sg * 6.5).addScaledVector(side, -1); const flOk = (q) => openAt(q.x, q.z) && Math.abs((tileAt(q.x, q.z) ? world.tileTop(tkey(...tileAt(q.x, q.z))).y : 99) - P.y) < 0.6; const fl = [flAt(1), flAt(-1), P.clone().addScaledVector(side, eyeDist * 0.3).addScaledVector(across, 4.6)].find(flOk) || flAt(1); bot.appear(fl); bot.look(P); bot.show(false); // she joins for the street-level shot
  const dt = 1 / 60;
  window.__duration = DUR;
  window.__render = (T) => {
    while (last < T - 1e-6) {
      const step = Math.min(dt, T - last); last += step;
      if (!started && last >= B0) { started = true; world.setCell(k, cell, { build: { dur: BDUR, onStage: (i, st) => stages.push({ t: +(B0 + st.t0).toFixed(2), text: st.label }) } }); }
      if (last >= SW0 && last - step < SW0) bot.show(true);
      if (last >= SW1 && last - step < SW1) bot.peer(P.clone().add(new THREE.Vector3(0, 1.5, 0)), 2.4);
      world.update(step, last, {}); life.update(step, last, app.hour, {}); bot.update(step, last);
    }
    rig.apply(poseAt(T)); stage.render(dt, T);
  };
  window.__timeline = () => ({ item: id, duration: DUR, eye: SW0, stages, eyeText: { j: 'Built! Now see it from the street.', s: 'Complete. Street-level view.' } });
  window.__render(0); window.__ready = true;
}
async function filmPreview(level) {
  const { plan, applyPlacements } = await import('./sim/planner.js');
  const { createFilm } = await import('./game/film.js');
  const { seedTo, CLEAR } = await import('./game/seed.js');
  const cells = seedTo(terrain, level);
  for (const [k, c] of cells) world.setCell(k, c);
  const next = applyPlacements(cells, plan(level, CLEAR[level], { terrain, cells, numbers: { minutes: 10 } }).placements);
  const changed = new Set([...next.keys()].filter((k) => JSON.stringify(next.get(k)) !== JSON.stringify(cells.get(k))));
  life.setTown(simulate(terrain, cells), cells, stage.q); ui.setBadge('FILM PREVIEW'); ui.setTask(1, level);
  await rig.overview(0.1); app.film = createFilm(app); initAudio();
  window.__filmStart = performance.now();
  await app.film.play(level, changed, next, { band: 'junior' });
  window.__filmDone = true;
}
