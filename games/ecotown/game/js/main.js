// Boot: stage, world, life, camera, UI; the start screen (age band, session length, settings);
// the living-island opening; then the game. window.__eco is a small debug/test API.
import * as THREE from 'three';
import { createStage, probeTier } from './engine/stage.js';
import { createLife } from './engine/life.js';
import { createBot } from './engine/bot.js';
import { initAudio, sfx, setSound, setMusic } from './engine/audio.js';
import { makeTerrain } from './world/terrain.js';
import { simulate } from './sim/sim.js';
import { createWorld } from './world/world.js';
import { createInside } from './world/inside.js';
import { createRig } from './camera/rig.js';
import { createUI, h, esc } from './ui/ui.js';
import { createGame } from './game/game.js';
import { loadModel, modelReady } from './ai/plotter.js';
import { CONTENT } from './game/content.js';

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
const bot = createBot(stage);
life.setTown(simulate(terrain, new Map()), new Map(), stage.q);
const app = {
  stage, terrain, world, life, inside, rig, bot, audio: sfx, band: 'junior', session: 60, hour: 11, moveIn: null, winterTest: false,
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
  const s = app.settings; ui.readAloud = s.readAloud; rig.reduce = s.reduce; setSound(s.sound);
  document.documentElement.dataset.motion = s.reduce ? 'reduce' : ''; document.documentElement.dataset.text = s.text;
  if (s.quality !== 'auto') stage.setTier(s.quality); savePrefs();
}
applySettings();

// ---------------- render loop
let last = performance.now(); const T0 = last;
function loop(now) {
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
    <p style="font-size:.8em;color:#46596a">Plotter: ${modelReady() ? 'small language model (on this device)' : 'keyword reader (model not loaded)'}. Nothing you type is stored or sent.</p><button class="btn go" data-close>Done</button>`;
  P.querySelectorAll('[data-k]').forEach((i) => (i.onchange = () => { s[i.dataset.k] = i.type === 'checkbox' ? i.checked : i.value; applySettings(); }));
  P.querySelector('[data-close]').onclick = () => ui.show('settings', false);
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
rig.onDoubleTap = (ndc) => { if (rig.mode !== 'sky') return; const k = world.pick(ndc, stage.camera); if (k) rig.focus(world.tileTop(k), { dist: 55 }, 1.1); };

// ---------------- start screen
async function start() {
  rig.sky.yaw = -0.6; rig.startTurntable(0.05);
  const modelP = loadModel('./models/');
  const quality = app.settings.quality === 'auto' ? probeTier(stage) : Promise.resolve(app.settings.quality);
  const scr = h(`<div id="start"><div class="card">
    <span class="chip">A DELTAOPS LEARNING AI LAB</span><h1>Eco <span>Town</span></h1>
    <p style="font-weight:600;color:#46596a;margin:4px 0">Build a whole town with Plotter, an AI planning helper. Plotter is clever, and sometimes confidently wrong. Can you catch it?</p>
    <div class="ages"><button class="age" data-band="junior"><b>Ages 8–12</b><span>Word tiles, picture chips, read aloud. Gentle consequences.</span></button><button class="age" data-band="senior"><b>Ages 13–17</b><span>Free-text instructions, real units, budgets, dilemmas and a bias check.</span></button></div>
    <div class="opts"><label>Session <select data-session><option value="45">45 min</option><option value="60" selected>60 min</option><option value="90">90 min</option></select></label>
    <label><input type="checkbox" data-facil ${app.settings.facilitator ? 'checked' : ''}> Facilitator notes</label></div>
    <p data-resume style="display:none"></p>
  </div></div>`);
  $('#layer').appendChild(scr);
  scr.querySelector('[data-session]').onchange = (e) => (app.session = +e.target.value);
  scr.querySelector('[data-facil]').onchange = (e) => { app.settings.facilitator = e.target.checked; applySettings(); };
  const band = await new Promise((res) => scr.querySelectorAll('[data-band]').forEach((b) => (b.onclick = () => res(b.dataset.band))));
  initAudio(); sfx.good();
  app.band = band; ui.readAloud = app.settings.readAloud && band === 'junior' ? true : app.settings.readAloud && band === 'senior' ? false : app.settings.readAloud;
  scr.remove();
  const tier = await quality; if (app.settings.quality === 'auto') stage.setTier(tier);
  await modelP;
  const G = createGame(app);
  const saved = G.saved();
  if (saved && saved.li > 0) { const a = await ui.modal(`<div class="ribbon">Welcome back</div><h2>Carry on from Level ${saved.li + 1}?</h2><div class="row" style="justify-content:center"><button class="btn go" data-act="resume">Resume</button><button class="btn alt" data-act="new">Start again</button></div>`); if (a === 'resume') { G.load(saved); app.session = saved.session || app.session; } }
  // living-island opening: about 10 seconds, skippable
  if (!saved || G.li === 0) await opening();
  rig.startTurntable(0); setMusic('calm');
  await G.run();
}
async function opening() {
  if (app.reduce) return;
  ui.caption(app.band === 'junior' ? 'An empty island floats in the sky. Meadows, a river, an old wood… and room for a town.' : 'An empty island. Every decision from here is yours, and Plotter’s.', 6000);
  let skip = false; const btn = h('<button class="btn alt panel" style="right:12px;bottom:12px">Skip ⏭</button>'); $('#layer').appendChild(btn); btn.onclick = () => (skip = true);
  const shots = [[new THREE.Vector3(-30, 0, -6), 0.95, 70], [new THREE.Vector3(36, 0, -28), 0.5, 55], [new THREE.Vector3(2, 0, 2), 0.75, rig.frameDist()]];
  for (const [p, pitch, dist] of shots) { if (skip) break; await rig.focus(p, { dist, pitch, yaw: rig.sky.yaw + 0.6 }, 3.2); }
  btn.remove(); ui.caption(null);
}

window.__eco = { app, terrain, ready: () => !!app.G, modelReady };
start();
