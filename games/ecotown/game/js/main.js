// Boot: stage, world, life, camera, UI; the start screen (age band, session length, settings);
// the living-island opening; then the game. window.__eco is a small debug/test API.
import * as THREE from 'three';
import { createStage, probeTier } from './engine/stage.js';
import { createLife } from './engine/life.js';
import { createFlorence } from './engine/florence.js';
import { initAudio, sfx, setSound, setMusic, setMusicOn, setSfxOn, duck } from './engine/audio.js';
import { makeTerrain } from './world/terrain.js';
import { simulate } from './sim/sim.js';
import { createWorld } from './world/world.js';
import { createInside } from './world/inside.js';
import { createClassroom } from './world/classroom.js';
import { createCosmetics } from './world/cosmetics.js';
import { createRig } from './camera/rig.js';
import { ITEMS } from './world/catalog.js';
import { createStreetPad } from './camera/streetpad.js';
import { createUI, h, esc } from './ui/ui.js';
import { createPortrait } from './ui/portrait.js';
import { CHALLENGES } from './game/challenges.js';
import { passport } from './game/passport.js';
import { passportHtml, printCertificate } from './ui/passcard.js';
import { createGame } from './game/game.js';
import { loadModel, modelReady } from './ai/plotter.js';
import { CONTENT, NAME_IDEAS, cleanTownName } from './game/content.js';
import { loadVoices, setSpeakingHook } from './ui/voice.js';
// showing towns to other people (stage 4): the postcard, "Visit a town" and the club wall live in these two files
import { shareParams, startButtons, visitCard, wallCard, openPostcard, go as shareGo } from './ui/share.js';
import { runVisit } from './game/visit.js';
// while a 🔊 read-aloud plays, its button shows it (a tester couldn't tell whether anything was happening)
let spkBtn = null;
document.addEventListener('click', (e) => { const b = e.target.closest?.('[data-spk]'); if (b) { spkBtn?.classList.remove('speaking'); spkBtn = b; } }, true);
setSpeakingHook((v) => { duck(v); if (spkBtn) { spkBtn.classList.toggle('speaking', v); spkBtn.setAttribute('aria-pressed', String(v)); if (!v) spkBtn = null; } });

const $ = (s) => document.querySelector(s);
const prefs = (() => { try { return JSON.parse(localStorage.getItem('ecotown.prefs') || '{}'); } catch { return {}; } })();
const savePrefs = () => { try { localStorage.setItem('ecotown.prefs', JSON.stringify(app.settings)); } catch { /* */ } };

const canvas = $('#gl');
// (A start-up check that showed "Eco Town needs 3D graphics" was removed at the user's request: it stopped the game on a device
// where the game itself had been loading fine. The game now always tries to start.)
const stage = createStage(canvas, $('#sky'));
const terrain = makeTerrain();
const world = createWorld(stage, terrain);
const life = createLife(stage, world, terrain);
const inside = createInside(stage);
const classroom = createClassroom(stage);
const rig = createRig(stage, canvas, $('#fade'));
const bot = createFlorence(stage, world, terrain);
let lastStep = 0; bot.onStep = () => { const n = performance.now(); if (n - lastStep > 180) { lastStep = n; sfx.step(); } };
{ const d = world.tileTop(terrain.dock); bot.appear(d.clone().add(new THREE.Vector3(-4, 0, -6))); }
life.setTown(simulate(terrain, new Map()), new Map(), stage.q);
const app = {
  stage, terrain, world, life, inside, classroom, rig, bot, audio: sfx, setMusic, band: 'junior', session: 60, classMode: false, sandboxFull: new URLSearchParams(location.search).get('sandbox') === 'full', hour: 11, moveIn: null, winterTest: false,
  settings: { readAloud: true, reduce: matchMedia('(prefers-reduced-motion: reduce)').matches, sound: true, effects: true, music: true, facilitator: false, text: 'normal', quality: 'auto', ...prefs },
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
// Florence's cards show a live, talking copy of her 3D self that mirrors the island Florence's gestures
ui.portrait = createPortrait(createFlorence);
if (ui.portrait) for (const g of ['wave', 'cheer', 'oops', 'shrug', 'proud', 'surprised', 'think', 'nod']) { const orig = bot[g].bind(bot); bot[g] = (...a) => { ui.portrait[g](); return orig(...a); }; }
// Star-shop rewards in 3D (hats, flag, fountain, statue, fireworks): looks only, switched on by the game
const cosmetics = app.cosmetics = createCosmetics({ stage, world, terrain, bot, portrait: ui.portrait });
function applySettings() {
  const s = app.settings; ui.readAloud = s.readAloud; rig.reduce = s.reduce; bot.reduce = s.reduce; if (ui.portrait) ui.portrait.reduce = s.reduce; setSound(s.sound); setMusicOn(s.music !== false); setSfxOn(s.effects !== false);
  document.documentElement.dataset.motion = s.reduce ? 'reduce' : ''; document.documentElement.dataset.text = s.text; app.G?.applyCosmetics?.();
  if (s.quality !== 'auto') stage.setTier(s.quality); savePrefs();
}
applySettings();

// ---------------- render loop
let last = performance.now(); const T0 = last; let slowAvg = 16, slowFor = 0;
// ?fps=1 shows a small frame-rate readout, for testing on real school devices (see docs/DEVICE-AND-CHILD-TESTS.md)
let fpsBox = null, fpsN = 0, fpsT = 0, fpsMax = 0;
if (new URLSearchParams(location.search).has('fps')) { fpsBox = document.createElement('div'); fpsBox.id = 'fpsbox'; fpsBox.setAttribute('aria-hidden', 'true'); document.getElementById('app').appendChild(fpsBox); }
function loop(now) {
  if (app.manual) { requestAnimationFrame(loop); return; } // the build-video recorder drives frames itself (?shoot=)
  const raw = now - last;
  const dt = Math.min(0.05, raw / 1000); last = now; const t = (now - T0) / 1000;
  // Graphics "auto" keeps watching: the start-up check measures an empty island, and a full town on a school laptop
  // can be much slower. Four seconds under about 22 frames a second steps the quality down one level (never back up).
  if (app.settings.quality === 'auto' && app.G && !document.hidden && raw < 500) {
    slowAvg += (raw - slowAvg) * 0.05; if (slowAvg > 45) { slowFor += raw; if (slowFor > 4000 && stage.tier !== 'low') { stage.setTier(stage.tier === 'high' ? 'mid' : 'low'); slowFor = 0; slowAvg = 16; } } else slowFor = 0;
  }
  rig.update(dt);
  { const ins = rig.mode === 'inside' && inside.root.visible && !app.inLab; /* not the classroom, which also uses the inside camera */ if (ins !== app._ins) { app._ins = ins; document.documentElement.dataset.inside = ins ? 'on' : 'off'; if (app.insideBack) app.insideBack.hidden = !ins; } } // the free inside view: its own Back button, panels step aside (CSS)
  { const st = rig.mode === 'street' && !!rig.street; if (st !== world.overlayHidden) { world.hideOverlay(st); document.documentElement.dataset.street = st ? 'on' : 'off'; } } world.update(dt, t, { windStill: app.winterTest }); life.update(dt, t, app.hour, { windStill: app.winterTest, moveIn: app.moveIn }); inside.update(dt, t); classroom.update(dt, t); bot.update(dt, t); cosmetics.update(dt, t, app.hour ?? 12);
  stage.render(dt, t); ui.labels.update(stage.camera, canvas);
  if (fpsBox) { fpsN++; fpsT += raw; fpsMax = Math.max(fpsMax, raw); if (fpsT >= 1000) { const r = stage.renderer.info.render; fpsBox.textContent = `${Math.round(1000 * fpsN / fpsT)} fps · worst ${Math.round(fpsMax)} ms · ${stage.tier} · ${r.calls} calls · ${Math.round(r.triangles / 1000)}k tris · ${canvas.width}×${canvas.height}`; fpsN = 0; fpsT = 0; fpsMax = 0; } }
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

// ---------------- the ☰ menu: the town report, a whole day, the intro again, and the settings, in one sheet
function settingsSheet() {
  const s = app.settings; const P = ui.P.settings; const G = app.G; const free = !!G?.canMenu?.();
  const row = (k, label) => `<label>${esc(label)}<input type="checkbox" data-k="${k}" ${s[k] ? 'checked' : ''}></label>`;
  const snd = !s.sound ? 'off' : s.music === false ? 'fx' : 'on';
  P.innerHTML = `<h3 style="margin:0 0 8px">Menu</h3>
    <div class="menuacts"><button class="slot act" data-m-act="report" ${free ? '' : 'disabled'}><b class="ico">📜</b><span>Town report</span></button><button class="slot act" data-m-act="day" ${free ? '' : 'disabled'}><b class="ico">🌇</b><span>Watch a whole day</span></button><button class="slot act" data-intro ${free ? '' : 'disabled'}><b class="ico">🎬</b><span>Watch Florence’s intro again</span></button><button class="slot act" data-m-act="passport" ${free ? '' : 'disabled'}><b class="ico">🎒</b><span>Club passport</span></button><button class="slot act" data-m-act="shop" ${free ? '' : 'disabled'}><b class="ico">★</b><span>${esc(G?.S?.shop?.menu || 'Star shop')}</span></button>${/* sharing (stage 4) */ G?.visiting ? '<button class="slot act" data-m-act="vhome"><b class="ico">🏡</b><span>Back to my town</span></button>' : `<button class="slot act" data-m-act="postcard" ${free ? '' : 'disabled'}><b class="ico">✉</b><span>Town postcard</span></button>`}<button class="slot act" data-m-act="visit"><b class="ico">👀</b><span>Visit a town</span></button>${G?.challenge || (() => { try { return JSON.parse(localStorage.getItem('ecotown.best.v1') || '{}').labs?.[G?.band]; } catch { return false; } })() ? `<button class="slot act" data-m-act="challenges"><b class="ico">🏆</b><span>Challenge towns</span></button>` : ''}${G?.challenge ? `<button class="slot act" data-m-act="home"><b class="ico">🏡</b><span>Back to my own town</span></button>` : ''}${G?.completeShown && !G?.challenge ? `<button class="slot act" data-m-act="finale" ${free ? '' : 'disabled'}><b class="ico">🎉</b><span>${esc(G.S.finale.again)}</span></button>` : ''}</div>
    <h4 class="menuhead">Settings</h4>
    <label>Sound<select data-snd><option value="on" ${snd === 'on' ? 'selected' : ''}>On (music and effects)</option><option value="fx" ${snd === 'fx' ? 'selected' : ''}>Effects only</option><option value="off" ${snd === 'off' ? 'selected' : ''}>Off</option></select></label>
    ${row('readAloud', 'Read aloud')}${row('reduce', 'Reduce motion')}${row('facilitator', 'Facilitator notes')}
    <div class="setrow"><span id="tsz">Text size</span><span class="seg" role="radiogroup" aria-labelledby="tsz">${['normal', 'large'].map((v) => `<button type="button" role="radio" data-tsize="${v}" aria-checked="${(s.text || 'normal') === v}">${v === 'large' ? 'Large' : 'Normal'}</button>`).join('')}</span></div>
    <label>Graphics<select data-k="quality">${['auto', 'low', 'mid', 'high'].map((q) => `<option ${s.quality === q ? 'selected' : ''}>${q}</option>`).join('')}</select></label>
    <p style="font-size:.8em;color:#46596a">Florence runs on this device (${modelReady() ? 'a small language model' : 'a keyword reader: the model did not load'}). Her voice is recorded in advance. What you type stays on this device: nothing is sent anywhere.</p><button class="btn go" data-close>Done</button>`;
  P.querySelectorAll('[data-k]').forEach((i) => (i.onchange = () => { s[i.dataset.k] = i.type === 'checkbox' ? i.checked : i.value; applySettings(); ui.refreshFacil(); }));
  // text size: two buttons, not a drop-down (a drop-down list opened over "Facilitator notes", and a tap meant for "Large" ticked it)
  P.querySelectorAll('[data-tsize]').forEach((b) => (b.onclick = () => { s.text = b.dataset.tsize; P.querySelectorAll('[data-tsize]').forEach((x) => x.setAttribute('aria-checked', String(x === b))); applySettings(); }));
  P.querySelector('[data-snd]').onchange = (e) => { const v = e.target.value; s.sound = v !== 'off'; s.effects = v !== 'off'; s.music = v === 'on'; applySettings(); };
  P.querySelector('[data-close]').onclick = () => ui.show('settings', false);
  P.querySelector('[data-intro]').onclick = () => { ui.show('settings', false); app.G?.replayIntro?.(); };
  P.querySelectorAll('[data-m-act]').forEach((b) => (b.onclick = () => { ui.show('settings', false); const m = b.dataset.mAct; if (m === 'postcard') return openPostcard(app); if (m === 'visit') { app.G?.save?.(); return shareGo('?visit=1'); } if (m === 'vhome') return shareGo('?carry=1'); /* sharing (stage 4) */ if (m === 'passport') { app.G?.save?.(); ui.modal(`${passportHtml(app.band)}<div class="row" style="justify-content:center;margin-top:10px"><button class="btn alt" data-act="close">Close</button><button class="btn go" data-act="print">🖨 Print certificate</button></div>`).then((a) => { if (a === 'print') printCertificate(app.band); }); } else if (m === 'challenges') { app.G?.save?.(); location.search = '?challenges=1'; } else if (m === 'home') { app.G?.save?.(); location.search = ''; } else if (m === 'report') app.G?.showReport?.(); else if (m === 'shop') app.G?.openShop?.(); else if (m === 'finale') app.G?.finale?.(); else app.G?.wholeDay?.(); }));
  ui.closePops(P.settings); ui.show('settings', true);
}
ui.P.tr.querySelector('[data-menu]').onclick = () => (ui.P.settings.classList.contains('hide') ? settingsSheet() : ui.show('settings', false));
// views: the whole island from the sky (⌂), a walk down a street (👟) or inside a home (🏠)
async function setView(v) {
  ui.views(v);
  if (inside.root.visible) await rig.fade(() => { inside.root.visible = false; });
  const home = app.G?.cells && [...app.G.cells].find(([, c]) => c.item && /timber|straw|earth|reclaimed|cohousing|concrete/.test(c.item));
  if (v === 'sky') rig.overview(1.2);
  if (v === 'street') {
    // stand on an open neighbouring tile (a path or an empty one), a few steps back, never inside another build
    const cells = app.G?.cells || new Map(); const homes = [...cells].filter(([, c]) => c.item && /timber|straw|earth|reclaimed|cohousing|concrete/.test(c.item)).map(([k]) => k);
    const open = (k) => { const c = cells.get(k); return terrain.tiles.has(k) && !terrain.tiles.get(k).fixed && terrain.tiles.get(k).zone !== 'river' && (!c?.item || /path|cycle|road|tram/.test(c.item)); };
    let k = homes[0] || terrain.school, from = null;
    for (const hk of homes.length ? homes : [k]) { const t = terrain.tiles.get(hk); if (!t) continue; const n = [[0, 1], [1, 0], [-1, 0], [0, -1]].map(([dx, dz]) => `${t.gx + dx},${t.gz + dz}`).find(open); if (n) { k = hk; from = n; break; } }
    const p = world.tileTop(k); const q = from ? world.tileTop(from) : p.clone().add(new THREE.Vector3(-8, 0, -9));
    const dir = p.clone().sub(q).setY(0).normalize(); const eye = q.clone().sub(dir.clone().multiplyScalar(2.5)).add(new THREE.Vector3(0, 2.1, 0));
    rig.toStreet(eye, p.clone().add(new THREE.Vector3(0, 1.5, 0)));
  }
  if (v === 'inside') {
    // the real home, at its real winter temperature (it was always shown at 20 °C), with a line saying what this view is
    const id = home?.[1].item || 'timber'; const it = ITEMS[id]; const temp = it?.temp ?? 20; const j = app.band !== 'senior';
    inside.build(id, temp); await rig.fade(() => { inside.root.visible = true; rig.mode = 'inside'; rig.apply(inside.pose()); });
    ui.caption(home ? (j ? `Inside a ${it.label}: ${temp} °C in winter with the heating off. The cut-away wall shows what it is made of.` : `Inside: ${it.label}. ${temp} °C in winter, unheated. The cut-away wall shows the construction.`)
      : (j ? 'No homes yet. This is what a Timber terrace looks like inside.' : 'No homes yet: a Timber terrace interior, for reference.'), 6500);
  }
}
app.setView = setView;
app.insideBack = h('<button id="insideback" class="btn go" style="position:absolute;left:50%;top:82px;transform:translateX(-50%);z-index:31" hidden>⬆ Back to the island</button>'); app.insideBack.onclick = () => setView('sky'); document.getElementById('layer').appendChild(app.insideBack);
// Escape or Home leaves the inside view too (they already left the street view), unless a card is open
addEventListener('keydown', (e) => { if ((e.key === 'Escape' || e.key === 'Home') && rig.mode === 'inside' && !app.inLab && ui.P.modal.classList.contains('hide') && !/INPUT|TEXTAREA/.test(document.activeElement?.tagName || '')) setView('sky'); });
createStreetPad({ rig, world, terrain, onExit: () => setView('sky') }); // street view: walking, the pad and "Back to the island"
ui.P.views.addEventListener('click', (e) => {
  const b = e.target.closest('[data-v]'); if (!b || b.disabled) return;
  setView(b.classList.contains('on') ? 'sky' : b.dataset.v); // tap again to come back up
});
// double-tap flies in to a tile (also while building: the second tap zooms instead of placing again)
rig.onDoubleTap = (ndc) => { if (rig.mode !== 'sky') return; const k = world.pick(ndc, stage.camera); if (k) rig.focus(world.tileTop(k), { dist: 55, pitch: 0.6 }, 1.1); };
// camera buttons
ui.P.camctl.addEventListener('click', async (e) => {
  const b = e.target.closest('[data-cam]'); if (!b) return; const a = b.dataset.cam;
  if (a === 'home') { if (rig.mode !== 'sky') setView('sky'); else rig.overview(1.2, true); return; }
  if (rig.mode !== 'sky') return;
  if (a === 'in') rig.zoomBy(0.72); if (a === 'out') rig.zoomBy(1.38); if (a === 'left') rig.rotateBy(Math.PI / 4); if (a === 'right') rig.rotateBy(-Math.PI / 4);
});

// ---------------- safety net: an unexpected error must never leave a child with a frozen game and no way on.
// The town is autosaved, so the notice offers a reload ("Carry on building" is then the first button). It never
// stops the game: it is one small notice, shown once, and only for errors after the game has started.
{ let told = false;
  const oops = (msg) => {
    if (told || !app.G || /ResizeObserver|NotAllowedError|AbortError|play\(\)|interrupted/i.test(String(msg))) return; told = true;
    try { app.G.save?.(); } catch { /* */ }
    const n = h('<div id="oops" role="alert"><span>Something went wrong. Your town is saved.</span><button class="btn go" data-reload>Reload</button><button class="btn alt" data-x aria-label="Close">✕</button></div>');
    n.querySelector('[data-reload]').onclick = () => location.reload(); n.querySelector('[data-x]').onclick = () => n.remove();
    document.getElementById('app').appendChild(n);
  };
  addEventListener('error', (e) => oops(e.message || e.error)); addEventListener('unhandledrejection', (e) => oops(e.reason?.message || e.reason));
}

// ---------------- start screen
async function start() {
  rig.sky.yaw = -0.6; rig.startTurntable(0.05);
  // Florence's language model (2 MB) is only needed in the AI Lab: it loads in the background and a mission waits for it
  app.modelP = loadModel('./models/').catch(() => {});
  document.getElementById('boot')?.remove();
  const quality = app.settings.quality === 'auto' ? probeTier(stage) : Promise.resolve(app.settings.quality);
  // ---- showing towns (stage 4). ?town=<code> opens that town read-only and never starts the building game, so
  // nothing can be saved over the player's own town. ?visit=1 and ?wall=1 open their cards on the first screen
  // (below); ?carry=1 goes straight back to the saved town ("Back to my town").
  const share = shareParams();
  if (share.town?.ok) {
    const vb = share.town.town.band; initAudio(); loadVoices(vb); app.band = vb; ui.readAloud = app.settings.readAloud && vb === 'junior';
    const vt = await quality; if (app.settings.quality === 'auto') stage.setTier(vt);
    await runVisit(app, share.town.town, { from: share.from, onBack: (where) => shareGo(where === 'wall' ? '?wall=1' : '?carry=1') });
    return;
  }
  const scr = h(`<div id="start"><div class="card">
    <span class="chip">A DELTAOPS LEARNING AI LAB</span><h1>Eco <span>Town</span></h1>
    <p style="font-weight:600;color:#46596a;margin:4px 0">Build your own town on a floating island. Florence, your AI helper, gives tips as you build. Step into the AI Lab to test her plans: she is clever, and sometimes confidently wrong. Can you catch her mistakes?</p>
    <div class="ages"><button class="age" data-band="junior"><b>Ages 8–12</b><span>Word tiles, picture chips and a friendly voice that reads everything aloud. Gentle consequences.</span></button><button class="age" data-band="senior"><b>Ages 13–17</b><span>Free-text instructions, real units, budgets and town-meeting dilemmas. 🔊 to hear any card.</span></button></div>
    <p class="both">Both versions have six AI Lab missions, ending with a bias check: who did Florence forget to ask? Next: name your town and choose how the missions are played.</p>
    <p data-resume style="display:none"></p>
  </div></div>`);
  $('#layer').appendChild(scr); setTimeout(() => scr.querySelector('[data-band]')?.focus(), 100);
  const ORDER = { free: 'Free: players build and open any AI Lab mission once it unlocks. Florence invites them when the town hits a problem a mission teaches.', class: 'In order: the class does the missions one by one. Only the next mission opens, and Florence invites players to it as soon as it is ready.' };
  // a saved town: one button on the first screen carries straight on (a returning player used to choose an age and
  // name a town again before the game offered the town they already had)
  let resume = null;
  try { const d = JSON.parse(localStorage.getItem('ecotown.save.v3') || 'null'); if (d && d.cells && d.townName && ['junior', 'senior'].includes(d.band) && !app.sandboxFull) resume = d; } catch { /* no save */ }
  if (resume) {
    const r = scr.querySelector('[data-resume]'); r.style.display = ''; r.className = 'resume';
    r.innerHTML = `<button class="btn go" data-carry>▶ Carry on building ${esc(resume.townName)}</button><span>or start a new town:</span>`;
    scr.querySelector('.ages').before(r); setTimeout(() => r.querySelector('[data-carry]')?.focus(), 120);
  }
  // the best town score on this device, per age: something to beat with a new town
  try { const best = JSON.parse(localStorage.getItem('ecotown.best.v1') || '{}'); const M = { gold: '🥇', silver: '🥈', bronze: '🥉' };
    for (const b of scr.querySelectorAll('[data-band]')) { const r = best[b.dataset.band]; if (r?.score) b.insertAdjacentHTML('beforeend', `<em class="bestscore">${M[r.medal] || '◎'} Best town score: ${Math.round(r.score)} of 100${r.town ? ` (${esc(r.town)})` : ''}. Can you beat it?</em>`); } } catch { /* no storage */ }
  // challenge towns: open on this device once the six AI Lab missions are done (or with ?challenges=1, for a club leader)
  const forceCh = new URLSearchParams(location.search).has('challenges');
  let dev = {}; try { dev = JSON.parse(localStorage.getItem('ecotown.best.v1') || '{}'); } catch { /* no storage */ }
  const chBands = ['junior', 'senior'].filter((b) => forceCh || dev.labs?.[b]);
  const MED = { gold: '🥇', silver: '🥈', bronze: '🥉' };
  const medalsOf = (b) => CHALLENGES.filter((c) => dev.ch?.[b]?.[c.id]).length;
  const slotOf = (id) => { try { const d = JSON.parse(localStorage.getItem('ecotown.save.v3.' + id) || 'null'); return d && d.cells ? d : null; } catch { return null; } };
  const homeHtml = scr.querySelector('.card').innerHTML;
  const band = await new Promise((res) => {
    const card = scr.querySelector('.card');
    const board = (b) => {
      card.innerHTML = `<span class="chip">🏆 CHALLENGE TOWNS</span><h1>Pick a <span>challenge</span></h1><p class="sub">A new town with one special rule. Everything is unlocked. Meet the town goals and the rule to win a medal: ${medalsOf(b)} of ${CHALLENGES.length} so far.</p>
        ${chBands.length > 1 ? `<div class="opts"><span class="seg" role="radiogroup" aria-label="Age">${chBands.map((x) => `<button type="button" role="radio" data-chband="${x}" aria-checked="${x === b}">${x === 'junior' ? 'Ages 8–12' : 'Ages 13–17'}</button>`).join('')}</span></div>` : ''}
        <div class="chgrid">${CHALLENGES.map((c) => { const r = dev.ch?.[b]?.[c.id]; const sv = slotOf(c.id); const mine = sv && sv.band === b;
          return `<button class="age chcard ${r ? 'won' : ''}" data-ch="${c.id}"><b class="chico" aria-hidden="true">${c.icon}</b><span><b>${esc(c.name)}</b><small>${esc(b === 'junior' ? c.rule.j : c.rule.s)}</small><em>${r ? `${MED[r.medal]} ${r.medal[0].toUpperCase() + r.medal.slice(1)} · score ${Math.round(r.score)}${r.medal !== 'gold' ? ' · go for a higher medal' : ''}` : mine ? '▶ Carry on' : 'Not tried yet'}</em></span></button>`; }).join('')}</div>
        <div class="row" style="justify-content:center;margin-top:10px"><button class="btn alt" data-chback>← Back</button></div>`;
      card.scrollTop = 0;
      card.querySelectorAll('[data-chband]').forEach((x) => (x.onclick = () => board(x.dataset.chband)));
      card.querySelector('[data-chback]').onclick = () => { card.innerHTML = homeHtml; home(); };
      // start a challenge again from an empty island (the medal already won is kept)
      card.querySelectorAll('[data-ch]').forEach((x) => { const sv = slotOf(x.dataset.ch); if (!sv || sv.band !== b) return;
        x.insertAdjacentHTML('afterend', `<button class="btn alt small chagain" data-again="${x.dataset.ch}" aria-label="Start ${esc(CHALLENGES.find((c) => c.id === x.dataset.ch).name)} again">↺ Start again</button>`); });
      card.querySelectorAll('[data-again]').forEach((x) => (x.onclick = () => { if (!confirm('Start this challenge again from an empty island? Your medal is kept.')) return; try { localStorage.removeItem('ecotown.save.v3.' + x.dataset.again); } catch { /* */ } board(b); }));
      card.querySelectorAll('[data-ch]').forEach((x) => (x.onclick = () => { resume = null; app.challenge = x.dataset.ch; res(b); }));
      setTimeout(() => card.querySelector('[data-ch]')?.focus(), 60);
    };
    const pass = (b) => {
      card.innerHTML = `${passportHtml(b)}${['junior', 'senior'].filter((x) => passport(dev, x).points).length > 1 ? `<div class="opts"><span class="seg" role="radiogroup" aria-label="Age">${['junior', 'senior'].map((x) => `<button type="button" role="radio" data-pband="${x}" aria-checked="${x === b}">${x === 'junior' ? 'Ages 8–12' : 'Ages 13–17'}</button>`).join('')}</span></div>` : ''}
        <div class="row" style="justify-content:center;margin-top:10px"><button class="btn alt" data-pback>← Back</button><button class="btn go" data-pprint>🖨 Print certificate</button></div>`;
      card.scrollTop = 0; card.querySelectorAll('[data-pband]').forEach((x) => (x.onclick = () => pass(x.dataset.pband)));
      card.querySelector('[data-pback]').onclick = () => { card.innerHTML = homeHtml; home(); }; card.querySelector('[data-pprint]').onclick = () => printCertificate(b);
    };
    const home = () => {
      scr.querySelectorAll('[data-band]').forEach((b) => (b.onclick = () => { resume = null; res(b.dataset.band); })); const c = scr.querySelector('[data-carry]'); if (c) c.onclick = () => res(resume.band);
      if (chBands.length && !scr.querySelector('[data-chopen]')) scr.querySelector('.ages').insertAdjacentHTML('afterend', `<p class="chopen"><button class="btn alt" data-chopen>🏆 Challenge towns <small>${medalsOf(chBands[0])} of ${CHALLENGES.length} medals</small></button></p>`);
      const pb = ['junior', 'senior'].map((x) => [x, passport(dev, x)]).sort((x, y) => y[1].points - x[1].points)[0];
      if (pb[1].points && !scr.querySelector('[data-popen]')) { const html = `<button class="btn alt" data-popen>🎒 Club passport <small>${pb[1].rank.icon} ${esc(pb[1].rank.name)} · ${pb[1].points} points</small></button>`;
        const row = scr.querySelector('.chopen'); if (row) row.insertAdjacentHTML('afterbegin', html + ' '); else scr.querySelector('.ages').insertAdjacentHTML('afterend', `<p class="chopen">${html}</p>`); }
      const po = scr.querySelector('[data-popen]'); if (po) po.onclick = () => pass(resume?.band || pb[0]);
      const o = scr.querySelector('[data-chopen]'); if (o) o.onclick = () => board(resume && chBands.includes(resume.band) ? resume.band : chBands[0]);
      startButtons(scr, terrain, { back: shareBack, junior: resume?.band !== 'senior' }); // sharing (stage 4): "Visit a town" and, for club leaders, the club wall
    };
    const shareBack = () => { card.innerHTML = homeHtml; home(); };
    home(); if (forceCh) board(resume && chBands.includes(resume.band) ? resume.band : chBands[0]);
    // sharing (stage 4): cards asked for by the address
    if (share.wall) wallCard(card, terrain, { back: shareBack }); else if (share.visit || share.town) visitCard(card, terrain, { back: shareBack, junior: resume?.band !== 'senior', prefill: share.raw }); else if (share.carry && resume) res(resume.band);
  });
  initAudio(); sfx.good(); loadVoices(band);
  app.band = band; ui.readAloud = app.settings.readAloud && band === 'junior' ? true : app.settings.readAloud && band === 'senior' ? false : app.settings.readAloud;
  if (app.challenge) { app.classMode = false; app.townName = CHALLENGES.find((c) => c.id === app.challenge).name; }
  else if (resume) { app.classMode = !!resume.classMode; app.settings.music = app.settings.music && !app.classMode; applySettings(); app.townName = resume.townName; }
  else {
  // name the town: one name, used everywhere (the header, the cards and the printed report)
  const card = scr.querySelector('.card');
  card.innerHTML = `<span class="chip">${band === 'junior' ? 'AGES 8–12' : 'AGES 13–17'}</span><h1>Name your <span>town</span></h1><p style="font-weight:600;color:#46596a">Pick a name or type your own.</p>
    <div class="names">${NAME_IDEAS.map((n) => `<button class="tile" data-n="${n}">${n}</button>`).join('')}</div>
    <div class="textin" style="margin-top:12px"><div class="field"><input data-name maxlength="24" placeholder="Your town’s name" aria-label="Town name" autocomplete="off"></div></div><p class="nameerr" data-err></p>
    <h2 class="setuphead">Session setup</h2>
    <div class="opts"><span class="seglab">AI Lab missions</span><span class="seg" role="radiogroup" aria-label="AI Lab missions"><button type="button" role="radio" data-order="free" aria-checked="${!app.classMode}">Any order</button><button type="button" role="radio" data-order="class" aria-checked="${!!app.classMode}">In order (class)</button></span>
    <label><input type="checkbox" data-facil ${app.settings.facilitator ? 'checked' : ''}> Facilitator notes</label></div>
    <p class="sessnote" data-sessnote></p>
    <div class="row" style="justify-content:center;margin-top:10px"><button class="btn go" data-go>Start ➜</button></div>`;
  const sn = card.querySelector('[data-sessnote]'); sn.textContent = ORDER[app.classMode ? 'class' : 'free'];
  // an in-game two-way switch (a native dropdown clashed with the style and stalled on some machines)
  card.querySelectorAll('[data-order]').forEach((b) => (b.onclick = () => { const v = b.dataset.order; app.classMode = v === 'class'; card.querySelectorAll('[data-order]').forEach((x) => x.setAttribute('aria-checked', String(x === b))); sn.textContent = ORDER[v]; app.settings.music = !app.classMode; applySettings(); })); // music starts off in class mode (the teacher can turn it on in ☰)
  card.querySelector('[data-facil]').onchange = (e) => { app.settings.facilitator = e.target.checked; applySettings(); ui.refreshFacil(); };
  const inp = card.querySelector('[data-name]'); inp.value = NAME_IDEAS[Math.floor(Math.random() * NAME_IDEAS.length)]; inp.addEventListener('focus', () => inp.select()); inp.addEventListener('pointerup', (e) => { if (!inp.dataset.typed) { e.preventDefault(); inp.select(); } }); inp.addEventListener('input', () => (inp.dataset.typed = '1')); setTimeout(() => { inp.focus(); inp.select(); }, 50); // typing replaces the suggestion (it used to append to it)
  card.querySelectorAll('[data-n]').forEach((b) => (b.onclick = () => { inp.value = b.dataset.n; inp.focus(); }));
  app.townName = await new Promise((res) => { const go = () => { const n = cleanTownName(inp.value); if (!n) { card.querySelector('[data-err]').textContent = 'Please choose a friendly name, or pick one above.'; return; } res(n); }; card.querySelector('[data-go]').onclick = go; inp.onkeydown = (e) => { if (e.key === 'Enter') go(); }; });
  sfx.good();
  }
  ui.setTownName(app.townName);
  scr.remove();
  const tier = await quality; if (app.settings.quality === 'auto') stage.setTier(tier);
  const G = createGame(app);
  const saved = G.saved();
  if (saved && (resume || app.challenge)) { G.load(saved); ui.setTownName(G.townName); }
  else if (saved && !app.sandboxFull) { const a = await ui.modal(`<div class="ribbon">Welcome back</div><h2>Carry on building ${esc(saved.townName || 'your town')}?</h2><div class="row" style="justify-content:center"><button class="btn go" data-act="resume">Carry on</button><button class="btn alt" data-act="new">Start a new town</button></div>`); if (a === 'resume') { G.load(saved); ui.setTownName(G.townName); } }
  // living-island opening: about 10 seconds, skippable
  rig.startTurntable(0); setMusic('calm');
  await G.run();
}
window.__eco = { app, terrain, ready: () => !!app.G, modelReady, thumbExtras: () => ({ ailab: { mark: null, item: 'ailab', mods: [] } }) };
// Passcode sessions (only when served by the Eco Town Worker; local and GitHub Pages builds have no /api).
// Every minute the game checks its session is still the active one for this passcode (newest login wins).
(async function heartbeat() {
  let first = true;
  if (/^(localhost|127\.0\.0\.1)$|github\.io$/.test(location.hostname)) return; // no passcode server on local or GitHub Pages builds (a POST there only logs an error)
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
  const { neighbours } = await import('./world/terrain.js');
  // prefer open surroundings: not beside the fixed buildings (school, dock, AI Lab), with free tiles around for the camera
  const fixedTiles = [...terrain.tiles.values()].filter((t) => t.fixed);
  const crowd = (t) => fixedTiles.reduce((a, f) => { const d = Math.max(Math.abs(f.gx - t.gx), Math.abs(f.gz - t.gz)); return a + (d <= 1 ? 80 : d <= 2 ? 25 : 0); }, 0)
    + neighbours(terrain.tiles, t).reduce((a, n) => a + (cellOf(cells, n.k).item && !['road', 'path', 'cycle', 'carpark'].includes(cellOf(cells, n.k).item) ? 3 : 0), 0);
  const score = (t) => world.tileTop(t.k).distanceTo(centre) + crowd(t) + (t.zone === 'coast' && id !== 'festival' ? 30 : 0);
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
  const yaw0 = -0.55, pitch = 0.78, dist = 52;
  const skyAt = (t) => { const yaw = yaw0 + 0.32 * (t / SW0); const pos = new THREE.Vector3(P.x - Math.sin(yaw) * Math.cos(pitch) * dist, P.y + Math.sin(pitch) * dist, P.z + Math.cos(yaw) * Math.cos(pitch) * dist); return { pos, look: P.clone().add(new THREE.Vector3(0, 1.5, 0)), fov: 22 }; };
  const LOW = new Set(['road', 'carpark', 'path', 'cycle', 'bigfield', 'mixed', 'allot', 'raingarden', 'reedbed', 'compost', 'hedge', 'hives', 'bridge', 'tram', 'festival']);
  const tall = (it.kind === 'build' && !LOW.has(id)) || it.kind === 'mod';
  const eyeDist = id === 'wind' ? 26 : tall ? 15 : 11;
  // eye level: pick the direction whose line of sight crosses only open, low tiles (no buildings, woods or terraces)
  const { tileAt, key: tkey } = await import('./world/terrain.js');
  const openAt = (x, z) => { const a = tileAt(x, z); if (!a) return false; const t = terrain.tiles.get(tkey(a[0], a[1])); if (!t || t.k === k) return !!t; const c = after.get(t.k); if (t.fixed || t.zone === 'wood' || t.zone === 'river') return false; if (c?.item && !LOW.has(c.item)) return false; return world.tileTop(t.k).y <= P.y + 1.2; };
  let side = null; let eyeD = eyeDist;
  // a clear corridor from the build to the camera, wide enough for the camera's sideways dolly
  for (const dd of [eyeDist, eyeDist * 0.8, eyeDist * 0.62]) {
    for (let i = 0; i < 24 && !side; i++) { const a = yaw0 + 0.32 + (i % 2 ? -1 : 1) * Math.ceil(i / 2) * (Math.PI / 12); const d = new THREE.Vector3(-Math.sin(a), 0, Math.cos(a)); let ok = true; for (let r = 3.5; r <= dd + 3 && ok; r += 1) for (const off of [-4, -2, 0, 2, 4]) { const q = P.clone().addScaledVector(d, r).add(new THREE.Vector3(d.z * off, 0, -d.x * off)); if (!openAt(q.x, q.z)) { ok = false; break; } } if (ok) { side = d; eyeD = dd; } }
    if (side) break;
  }
  const clearView = !!side; side ||= new THREE.Vector3(-Math.sin(yaw0 + 0.32), 0, Math.cos(yaw0 + 0.32));
  const across = new THREE.Vector3(side.z, 0, -side.x);
  // eye level for buildings; for low builds (paths, fields, land) a low three-quarter view that shows the surface
  // roof upgrades (solar, green roof, heat pump), and anything without a clear line of sight, end on a raised three-quarter view
  const lowShot = (!tall && id !== 'bridge') || it.kind === 'mod' || !clearView;
  const eyeAt = (t) => {
    const u = Math.min(1, Math.max(0, (t - SW1) / (DUR - SW1)));
    if (lowShot) { const hi = tall ? 13 : 9; const pos = P.clone().addScaledVector(side, tall ? 17 : 15).addScaledVector(across, -2 + 4 * u); pos.y = P.y + hi; return { pos, look: P.clone().add(new THREE.Vector3(0, tall ? 2.5 : 0.3, 0)), fov: 35 }; }
    const pos = P.clone().addScaledVector(side, eyeD).addScaledVector(across, -2.5 + 5 * u); pos.y = P.y + 2.2;
    return { pos, look: P.clone().add(new THREE.Vector3(0, id === 'wind' ? 7 : 0.6 * (tall ? 4.5 : 1.5), 0)), fov: 50 };
  };
  const ease = (x) => x * x * (3 - 2 * x);
  const poseAt = (t) => { if (t <= SW0) return skyAt(t); if (t >= SW1) return eyeAt(t); const a = skyAt(SW0), b = eyeAt(SW1), k2 = ease((t - SW0) / (SW1 - SW0)); const kf = ease(Math.min(1, k2 / 0.4)); return { pos: a.pos.clone().lerp(b.pos, k2).add(new THREE.Vector3(0, Math.sin(k2 * Math.PI) * 4, 0)), look: a.look.clone().lerp(b.look, k2), fov: a.fov + (b.fov - a.fov) * kf }; };
  // Florence waits beside the build and peers at it once it is finished
  const flAt = (sg) => P.clone().addScaledVector(across, sg * 6.5).addScaledVector(side, -2.5); const flOk = (q) => openAt(q.x, q.z) && Math.abs((tileAt(q.x, q.z) ? world.tileTop(tkey(...tileAt(q.x, q.z))).y : 99) - P.y) < 0.6; const fl = [flAt(1), flAt(-1), P.clone().addScaledVector(side, eyeD * 0.3).addScaledVector(across, 4.6)].find(flOk) || flAt(1); bot.appear(fl); bot.look(P); bot.show(false); // she joins for the street-level shot
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
  window.__timeline = () => ({ item: id, duration: DUR, eye: SW0, clearView, stages, eyeText: { j: 'Built! Now see it from the street.', s: 'Complete. Street-level view.' } });
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
