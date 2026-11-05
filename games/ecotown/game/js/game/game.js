// The session: six levels, each in seven acts (Brief, Plan, Check, Fix, Move in, Live, Celebrate),
// then the charter, the residents' summary check, a full day and the town report.
import * as THREE from 'three';
import { ITEMS, TARGETS, placeReason } from '../world/catalog.js';
import { simulate, cellOf, emptyCell, natureBaseline } from '../sim/sim.js';
import { applyPlacements } from '../sim/planner.js';
import { ask, modelReady } from '../ai/plotter.js';
import { LEVELS, LEVEL_ORDER, ALL_CHECKS } from './levels.js';
import { CONTENT, LEVEL_TEXT, DILEMMAS, HABITS } from './content.js';
import { createChecks } from './checks.js';
import { bubblesFor } from './bubbles.js';
import { esc, h } from '../ui/ui.js';
import { renderReport } from './report.js';
import { createFilm } from './film.js';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const SAVE = 'ecotown.save.v1';

export function createGame(app) {
  const { world, ui, rig, stage, terrain, life, audio } = app;
  const G = app.G = {
    band: app.band, C: CONTENT[app.band], j: app.band === 'junior', cells: new Map(), stars: 0, levelStars: {}, mistakes: [], diary: [], instructions: {}, charter: [],
    budget: app.band === 'senior' ? 150 : Infinity, spent: 0, li: 0, extra: { families: 0, carbon: 0 },
  };
  app.C = G.C; app.hour = 12.5;
  const checks = createChecks(app);
  const film = app.film = createFilm(app);
  const T = (id) => LEVEL_TEXT[id];
  const pick = (o) => (typeof o === 'string' ? o : G.j ? o.j : o.s);
  const sim = (cells = G.cells) => { const s = simulate(terrain, cells, { natureStart: app.natureStart }); s.families += G.extra.families; s.carbon += G.extra.carbon; return s; };
  app.natureStart = natureBaseline(terrain);

  app.refreshLights = () => { const s = sim(); world.setLights(!s.homes.length ? [] : (s.power.winterOK || !G.levelStars.power ? s.homes.map((x) => x.k) : s.homes.slice(0, Math.floor(s.homes.length * 0.4)).map((x) => x.k))); };
  function showCells(cells = G.cells, animateKeys = null) {
    let i = 0;
    for (const t of terrain.tiles.values()) { const c = cells.get(t.k); const anim = animateKeys?.has(t.k); world.setCell(t.k, c || emptyCell(), { animate: anim, delay: anim ? (i++) * 0.06 : 0, reduce: app.reduce }); if (anim) setTimeout(() => audio.pop(i), i * 60); }
    life.setTown(sim(cells), cells, stage.q); app.refreshLights();
  }
  function addStar(n = 1, why = '') { G.stars += n; G.levelStars[app.levelId] = (G.levelStars[app.levelId] || 0) + n; ui.setStars(G.stars); if (why) ui.caption(`★ ${why}`, 2200); }
  function flower(flash = true) { const s = sim(); ui.flower(s.petals, s.title, { flash }); }
  function save() { try { localStorage.setItem(SAVE, JSON.stringify({ band: G.band, li: G.li, stars: G.stars, levelStars: G.levelStars, mistakes: G.mistakes, diary: G.diary, cells: [...G.cells], extra: G.extra, spent: G.spent, session: app.session })); } catch { /* storage off */ } }
  G.load = (data) => { Object.assign(G, { li: data.li, stars: data.stars, levelStars: data.levelStars || {}, mistakes: data.mistakes || [], diary: data.diary || [], extra: data.extra || G.extra, spent: data.spent || 0 }); G.cells = new Map(data.cells); };

  // ---------------- input: word tiles (junior default), free text (senior default), cards (fallback)
  function instruct(id, heading) {
    const L = T(id); let mode = G.j ? 'tiles' : 'text'; const used = [];
    return new Promise((resolve) => {
      const render = () => {
        const tabs = `<div class="tabs"><button data-m="tiles" class="${mode === 'tiles' ? 'on' : ''}">🧩 ${esc(G.C.ui.useTiles)}</button><button data-m="text" class="${mode === 'text' ? 'on' : ''}">⌨ ${esc(G.C.ui.typeInstead)}</button><button data-m="cards" class="${mode === 'cards' ? 'on' : ''}">🃏 ${esc(G.C.ui.useCards)}</button></div>`;
        let body = '';
        if (mode === 'tiles') body = `<div class="sentence" data-placeholder="Tap words to build your instruction">${used.map((w, i) => `<button class="tile" data-u="${i}">${esc(w)}</button>`).join('')}</div><div class="tiles">${L.tiles.map((w, i) => `<button class="tile ${used.includes(w) ? 'used' : ''}" data-w="${i}">${esc(w)}</button>`).join('')}</div><div class="row"><button class="btn go" data-send ${used.length ? '' : 'disabled'}>${esc(G.C.ui.send)} ➜</button><button class="btn alt small" data-clear>Clear</button></div>`;
        if (mode === 'text') body = `<div class="textin"><div class="field"><input data-in maxlength="160" autocomplete="off" spellcheck="true" placeholder="${G.j ? 'Type your instruction…' : 'e.g. goal + what to protect + how to check'}" aria-label="Instruction for Plotter"><div class="hl" data-hl></div></div><button class="btn go" data-send>${esc(G.C.ui.send)} ➜</button></div><div style="height:1.6em"></div>`;
        if (mode === 'cards') body = `<div class="row">${L.cards.map(([c], i) => `<button class="choice" data-card="${i}"><span class="btn k">${'ABC'[i]}</span>${esc(c)}</button>`).join('')}</div>`;
        ui.tray(`<h3>${esc(heading)}</h3>${tabs}${body}`, (tr) => {
          tr.querySelectorAll('[data-m]').forEach((b) => (b.onclick = () => { mode = b.dataset.m; render(); }));
          tr.querySelectorAll('[data-w]').forEach((b) => (b.onclick = () => { const w = L.tiles[+b.dataset.w]; if (!used.includes(w)) { used.push(w); audio.tap(); render(); } }));
          tr.querySelectorAll('[data-u]').forEach((b) => (b.onclick = () => { used.splice(+b.dataset.u, 1); render(); }));
          tr.querySelector('[data-clear]')?.addEventListener('click', () => { used.length = 0; render(); });
          tr.querySelectorAll('[data-card]').forEach((b) => (b.onclick = () => resolve({ text: L.cards[+b.dataset.card][0], via: 'card' })));
          const inp = tr.querySelector('[data-in]');
          if (inp) {
            inp.focus();
            const hl = tr.querySelector('[data-hl]');
            let tmr = 0; inp.oninput = () => { clearTimeout(tmr); tmr = setTimeout(() => highlight(id, inp.value, hl), 160); };
            inp.onkeydown = (e) => { if (e.key === 'Enter' && inp.value.trim()) resolve({ text: inp.value.trim(), via: 'text' }); };
          }
          tr.querySelector('[data-send]')?.addEventListener('click', () => { const text = mode === 'text' ? tr.querySelector('[data-in]').value.trim() : used.join(' '); if (text) resolve({ text, via: mode }); });
        });
      };
      render();
    });
  }
  // live highlight of the words the model picked up (senior free text)
  function highlight(id, text, el) {
    if (!text.trim()) { el.innerHTML = ''; return; }
    const r = ask(id, text, { terrain, cells: G.cells });
    const ex = r.read.explain || []; const strong = new Set(ex.filter((e) => e.weight > 0.15).map((e) => e.word.toLowerCase()));
    const words = text.split(/\s+/).map((w) => { const k = w.toLowerCase().replace(/[^a-z0-9'-]/g, ''); return strong.has(k) ? `<mark class="strong">${esc(w)}</mark>` : ex.some((e) => e.word.toLowerCase() === k && e.weight > 0.05) ? `<mark>${esc(w)}</mark>` : esc(w); });
    el.innerHTML = r.unknown ? `<span>${esc(G.C.ui.unknown)}</span>` : `<span>Plotter reads:</span> ${r.read.active.map((s) => `<mark class="strong">${esc(s.replace(/_/g, ' '))}</mark>`).join(' ')}${ex.length ? ' · ' + words.join(' ') : ''}`;
  }

  // ---------------- one instruction round: ask Plotter, show its ghost plan and its reading
  async function round(id, heading) {
    for (;;) {
      const { text } = await instruct(id, heading);
      ui.helper({ name: G.C.helperName, tag: 'THINKING', html: `<p>${esc('“' + text + '”')}</p>`, thinking: true });
      await sleep(app.reduce ? 100 : 650);
      const res = ask(id, text, { terrain, cells: G.cells });
      if (res.unknown) {
        audio.bad(); ui.helper({ name: G.C.helperName, tag: '?', tagCls: 'bad', html: `<p>${esc(G.C.ui.unknown)}</p><p>${esc(G.C.ui.tryWords)}: ${res.hints.map((x) => `<b>${esc(x)}</b>`).join(', ')}</p>`, say: G.C.ui.unknown });
        continue;
      }
      res.text = text;
      const c = centroidOf(res.plan.placements); app.bot.hover(c); if (!app.reduce) rig.focus(c, { dist: id === 'land' ? rig.frameDist() * 0.85 : 105, pitch: 0.66 }, 1.2);
      await sleep(app.reduce ? 0 : 900); app.bot.beam(true, 15);
      const dur = world.showGhost(res.plan.placements, res.after, { reduce: app.reduce });
      setTimeout(() => app.bot.beam(false), dur * 1000 + 300);
      res.plan.placements.forEach((_, i) => setTimeout(() => audio.ghost(i), i * 50));
      const chips = res.read.active.map((s) => `<span>${esc(s.replace(/_/g, ' '))}</span>`).join('');
      const why = G.j ? '' : `Why ${res.sure}%? reading <b>${res.breakdown.reading}%</b> × plan fit <b>${res.breakdown.fit}%</b> × experience <b>${res.breakdown.experience}%</b>. Tested: ${esc(res.plan.tested)}.`;
      ui.helper({ name: G.C.helperName, tag: G.C.ui.plotterGuess, html: `<div class="chips">${chips}</div><ul>${res.plan.reading.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>${!G.j && res.plan.assumptions.length ? `<p style="color:#ffc83d">Assumed: ${esc(res.plan.assumptions.join(' '))}</p>` : ''}`, sure: res.sure, sureLabel: G.C.ui.sure, why, say: res.plan.reading.join(' ') + ` ${res.sure} percent ${G.C.ui.sure}.` });
      await sleep(dur * 1000);
      return res;
    }
  }

  function centroidOf(pl) { const ks = [...new Set(pl.map((p) => p.k))]; if (!ks.length) return new THREE.Vector3(2, 0, 4); const v = new THREE.Vector3(); for (const k of ks) v.add(world.tileTop(k)); return v.multiplyScalar(1 / ks.length); }
  // ---------------- checking: choose a lens or view
  async function checkAct(id, res, { auto = false } = {}) {
    const lv = LEVELS[id]; const sAfter = sim(res.after);
    const reveal = lv.reveal(sAfter, sim()); const flawed = Object.keys(reveal).length > 0 || !lv.pass(sAfter, ctxFor(res.after));
    if (auto) {
      const which = Object.keys(reveal)[0];
      if (!which) return { flawed: false };
      const r = await checks.run(which, sAfter, res.after, reveal); audio.bad(); app.bot.shrug(); ui.alert(fmt(T(id).flaw[which], r.revealed), false); await sleep(2200); ui.show('alert', false); await checks.leave(); return { flawed: true, which };
    }
    const opts = G.j ? lv.juniorChecks : ALL_CHECKS; let first = true; let tries = 0;
    for (;;) {
      const choice = await new Promise((resolve) => ui.tray(`<h3>${esc(G.C.ui.how)}</h3><div class="row">${opts.map((c) => `<button class="choice" data-c="${c}"><span class="ic">${G.C.checks[c].icon}</span>${esc(G.C.checks[c].label)}</button>`).join('')}</div>`, (tr) => tr.querySelectorAll('[data-c]').forEach((b) => (b.onclick = () => resolve(b.dataset.c)))));
      ui.show('tray', false); ui.helper(null); tries++;
      if (['street', 'inside'].includes(choice)) { world.clearGhost(); showCells(res.after); }
      const r = await checks.run(choice, sAfter, res.after, reveal);
      if (r.revealed) {
        audio.bad(); app.bot.shrug(); ui.alert(fmt(T(id).flaw[choice], r.revealed), false);
        if (first) addStar(1, G.C.ui.foundIt);
        await sleep(2600); await continueBtn();
        ui.show('alert', false); await checks.leave(); if (['street', 'inside'].includes(choice)) { showCells(G.cells); world.showGhost(res.plan.placements, res.after, { reduce: true }); }
        return { flawed: true, which: choice, tries };
      }
      if (!flawed) { // nothing wrong anywhere: a clear instruction first time
        ui.alert(G.C.ui.checked, true); audio.good(); await sleep(1800); ui.show('alert', false); await checks.leave(); if (['street', 'inside'].includes(choice)) showCells(G.cells);
        return { flawed: false };
      }
      first = false; ui.caption(G.C.ui.nothingHere, 2600); await sleep(app.reduce ? 600 : 2200); await checks.leave();
      if (['street', 'inside'].includes(choice)) { showCells(G.cells); world.showGhost(res.plan.placements, res.after, { reduce: true }); }
    }
  }
  const continueBtn = () => new Promise((r) => ui.tray(`<div class="row" style="justify-content:center"><button class="btn go" data-go>${esc(G.C.ui.next)} ➜</button></div>`, (tr) => (tr.querySelector('[data-go]').onclick = r)));
  const fmt = (o, rv) => pick(o).replace('{n}', rv?.n ?? '');

  // ---------------- naming the habit
  async function habitAct(id) {
    const lv = LEVELS[id]; let first = true;
    for (;;) {
      const pickH = await new Promise((resolve) => ui.tray(`<h3>${esc(G.C.ui.whyWrong)}</h3><div class="row">${HABITS.map((k) => `<button class="choice" data-h="${k}"><span class="ic">${G.C.habits[k].icon}</span>${esc(G.C.habits[k].label)}</button>`).join('')}</div>`, (tr) => tr.querySelectorAll('[data-h]').forEach((b) => (b.onclick = () => resolve(b.dataset.h)))));
      const ok = pickH === lv.habit;
      if (ok) { audio.good(); if (first) addStar(1, G.C.habits[pickH].label); G.mistakes.push({ level: id, habit: pickH }); ui.helper({ name: G.C.helperName, tag: 'OOPS', tagCls: 'bad', html: `<p>${esc(G.C.habits[pickH].explain)}</p>`, say: G.C.habits[pickH].explain }); await sleep(600); return; }
      first = false; audio.tap(); ui.caption(`Not quite. ${G.C.habits[pickH].explain}`, 3600); await sleep(1200);
    }
  }

  // ---------------- building: accept the plan, then paint and adjust
  const ctxFor = (cells) => ({ moveTiles: [...cells.values()].filter((c) => c.item && ITEMS[c.item].level === 'move').length, hasSchool: [...cells.values()].some((c) => c.item === 'school') });
  async function buildAct(id, res) {
    const lv = LEVELS[id];
    // accept the plan with a pop-in sequence (the plan becomes real)
    world.clearGhost(); const before = new Map(G.cells); G.cells = res.after; G.spent += planCost(res.plan.placements);
    const changed = new Set(res.plan.placements.map((p) => p.k));
    // the plan becomes real in a short film (construction, installation, farming…)
    await film.play(id, changed, G.cells, { band: G.band });
    life.setTown(sim(), G.cells, stage.q); app.refreshLights(); flower(true); await rig.overview(1.0);
    let tool = lv.palette[0];
    return new Promise((resolve) => {
      const render = () => {
        const s = sim(); const needs = lv.needs(s, ctxFor(G.cells)); const ok = lv.pass(s, ctxFor(G.cells));
        const bud = G.budget !== Infinity ? `<span class="${G.spent <= G.budget ? 'ok' : ''}">Budget ${G.spent}/${G.budget} credits</span>` : '';
        ui.tray(`<h3>${esc(G.j ? 'Paint and place: tap the island' : 'Adjust the plan: tap tiles to place or remove')}</h3><div class="palette">${lv.palette.map((idd) => { const it = ITEMS[idd]; return `<button class="pal ${tool === idd ? 'on' : ''}" data-t="${idd}"><i style="background:${it.color}">${it.icon}</i><span>${esc(it.label)}${!G.j && it.cost ? `<small>${it.cost} cr${it.families ? ` · ${it.families} families` : ''}${it.embodied ? ` · ${it.embodied} t` : ''}${it.food ? ` · ${it.food} food` : ''}</small>` : ''}</span></button>`; }).join('')}<button class="pal ${tool === 'erase' ? 'on' : ''}" data-t="erase"><i style="background:#eef2f5">⌫</i><span>Remove</span></button></div>
          <div class="needs">${needs.map((n) => `<span class="${n.ok ? 'ok' : ''}">${n.ok ? '✓' : '•'} ${esc(n.label)}</span>`).join('')}${bud}</div>
          <div class="row" style="margin-top:8px;justify-content:flex-end"><button class="btn go" data-done ${ok && G.spent <= G.budget ? '' : 'disabled'}>${esc(G.C.ui.done)} ✓</button></div>`, (tr) => {
          tr.querySelectorAll('[data-t]').forEach((b) => (b.onclick = () => { tool = b.dataset.t; render(); }));
          tr.querySelector('[data-done]').onclick = () => { rig.onTap = null; rig.onHover = null; world.clearGhost(); ui.labels.clear('lbl'); resolve(); };
        });
      };
      rig.onTap = (ndc) => {
        const k = world.pick(ndc, stage.camera); if (!k) return; const t = terrain.tiles.get(k); const c = { ...cellOf(G.cells, k), mods: [...cellOf(G.cells, k).mods] };
        if (tool === 'erase') {
          if (c.locked) return ui.caption('Built in an earlier level', 1800);
          const it = c.item && ITEMS[c.item]; if (c.mods.length && !c.locked) { c.mods.pop(); } else if (it && it.level === id) { G.spent -= it.cost || 0; c.item = null; } else if (c.mark && id === 'land') c.mark = null; else return;
        } else {
          const it = ITEMS[tool]; const why = placeReason(tool, t, c); if (why) { audio.bad(); return ui.caption(why, 1800); }
          if (G.spent + (it.cost || 0) > G.budget) return ui.caption('Over budget', 1800);
          if (it.unique) for (const [kk, cc] of G.cells) if (cc.item === tool && !cc.locked) { G.cells.set(kk, { ...cc, item: null }); world.setCell(kk, G.cells.get(kk)); }
          if (it.kind === 'mark') c.mark = tool; else if (it.kind === 'mod') c.mods.push(tool); else { if (c.item && ITEMS[c.item].level === id) G.spent -= ITEMS[c.item].cost || 0; c.item = tool; }
          G.spent += it.cost || 0;
        }
        G.cells.set(k, c); world.setCell(k, c, { build: { dur: 0.7 }, reduce: app.reduce }); audio.pop(); life.setTown(sim(), G.cells, stage.q); app.refreshLights(); flower(true); render();
      };
      rig.onHover = (ndc) => { if (tool === 'erase') return; const k = world.pick(ndc, stage.camera); if (k === app._hk) return; app._hk = k; if (!k) return world.clearGhost(); const c = cellOf(G.cells, k); const why = placeReason(tool, terrain.tiles.get(k), c); const nc = { ...c, mods: [...c.mods] }; const it = ITEMS[tool]; if (it.kind === 'mark') nc.mark = tool; else if (it.kind === 'mod') nc.mods.push(tool); else nc.item = tool; world.showGhost([{ k }], new Map([[k, nc]]), { reduce: true, bad: why ? new Set([k]) : new Set() }); ui.labels.set(why ? [{ at: world.tileTop(k).add(new THREE.Vector3(0, 4, 0)), text: why, cls: 'bad' }] : []); };
      render(); void before;
    });
  }
  const planCost = (pl) => pl.reduce((a, p) => a + (ITEMS[p.item || p.mod || p.mark]?.cost || 0), 0);

  // ---------------- move in, live, celebrate
  async function moveInAct(id) {
    const s = sim(); if (!s.homes.length && id !== 'land') return;
    ui.only([]); ui.setTask(`L${LEVELS[id].n}/6`, G.C.ui.moveIn);
    const home = s.homes[0]?.k || [...G.cells].find(([, c]) => c.mark === 'town')?.[0]; if (!home) return;
    life.family.home = home; for (const m of life.family.members) m.visible = true;
    app.moveIn = 0; const dur = app.reduce ? 1.5 : 7;
    rig.followTarget(() => { const p = life.familyPos() || world.tileTop(home); return { pos: p.clone().add(new THREE.Vector3(-14, 11, 16)), look: p }; });
    ui.caption(G.j ? 'Here they come! The family arrives on the sky-ferry.' : 'Move-in: the first family arrives.', dur * 1000);
    const t0 = performance.now(); await new Promise((r) => { const step = () => { app.moveIn = Math.min(1, (performance.now() - t0) / (dur * 1000)); if (app.moveIn < 1) requestAnimationFrame(step); else r(); }; step(); });
    app.moveIn = null; await rig.overview(1.2);
  }
  async function liveAct(id, seconds) {
    const s = sim(); ui.only([]); ui.setTask(`L${LEVELS[id].n}/6`, G.C.ui.live); ui.views('sky');
    const list = bubblesFor(s, G.cells, terrain, G.j, id); const pois = poiList(s);
    let skip = false; ui.tray(`<div class="row" style="justify-content:center"><button class="btn alt" data-skip>Skip ⏭</button>${!G.j ? '<button class="btn alt" data-said>What residents said</button>' : ''}</div>`, (tr) => { tr.querySelector('[data-skip]').onclick = () => (skip = true); const ws = tr.querySelector('[data-said]'); if (ws) ws.onclick = () => saidList(list); });
    const t0 = performance.now(); let bi = 0, pi = 0, nextB = 1.5, nextP = 0;
    while (!skip) {
      const el = (performance.now() - t0) / 1000; if (el > seconds) break;
      app.hour = 7 + (el / seconds) * 14; stage.setTime(app.hour, 0);
      if (el >= nextP && pois.length && !app.reduce) { const p = pois[pi++ % pois.length]; rig.focus(p, { dist: 62, pitch: 0.55, yaw: rig.sky.yaw + 0.5 }, 3.2); nextP = el + 5.5; }
      if (el >= nextB && list.length) { const b = list[bi++ % list.length]; ui.labels.bubble({ at: () => world.tileTop(b.k).add(new THREE.Vector3(0, 7, 0)), text: b.text, bad: b.bad }); nextB = el + 3.2; }
      await sleep(50);
    }
    ui.labels.clear('bub'); app.hour = 12.5; stage.setTime(12.5); await rig.overview(1.1);
    // senior: residents' petition when the same problem keeps coming up
    const bad = list.filter((b) => b.bad); if (!G.j && bad.length >= 3) { const top = bad[0]; await ui.modal(`<div class="ribbon">${esc(G.C.ui.petition)}</div><div class="big">📜</div><h2>“${esc(top.text)}”</h2><p>${bad.length} residents signed. You can fix it in the next level, or explain your trade-off at the town meeting.</p><button class="btn go" data-act="ok">${esc(G.C.ui.continue)}</button>`); }
  }
  function saidList(list) { ui.modal(`<div class="ribbon">What residents said</div><div style="text-align:left">${list.map((b, i) => `<div class="row" style="align-items:center;margin:4px 0"><span style="flex:1">${b.bad ? '☹' : '☺'} ${esc(b.text)}</span><button class="btn small alt" data-act="pin${i}">📍</button></div>`).join('')}</div><button class="btn go" data-act="close">Close</button>`).then((a) => { if (a.startsWith('pin')) rig.focus(world.tileTop(list[+a.slice(3)].k), { dist: 45 }, 1.2); }); }
  function poiList(s) { const out = []; if (s.homes[0]) out.push(world.tileTop(s.homes[0].k)); if (s.schoolKey) out.push(world.tileTop(s.schoolKey)); for (const [k, c] of G.cells) if (['market', 'orchard', 'wind', 'park'].includes(c.item)) { out.push(world.tileTop(k)); if (out.length > 5) break; } return out; }

  async function celebrateAct(id, levelChanged) {
    const lv = LEVELS[id]; const s = sim();
    // same-angle before/after: hide this level's builds, then pop them back in
    ui.only([]); await rig.overview(1.0);
    for (const k of levelChanged) world.setCell(k, emptyCell()); await sleep(app.reduce ? 200 : 600);
    let i = 0; for (const k of levelChanged) world.setCell(k, G.cells.get(k), { build: { dur: 0.8, delay: (i++) * 0.06 }, reduce: app.reduce });
    await sleep(app.reduce ? 300 : 1200 + i * 60); world.finishBuilds();
    rig.startTurntable(app.reduce ? 0 : 0.1);
    if (!G.j && DILEMMAS[id] && app.session !== 45) {
      const d = DILEMMAS[id]; const a = await ui.modal(`<div class="ribbon">Town meeting</div><h2>${esc(d.text)}</h2><div class="row" style="justify-content:center">${d.options.map((o, i) => `<button class="btn ${i ? 'alt' : 'go'}" data-act="${i}">${esc(o.label)}</button>`).join('')}</div>`);
      const e = d.options[+a].effect; G.extra.families += e.families || 0; G.extra.carbon += e.carbon || 0; G.diary.push(`Town meeting: ${d.options[+a].label}.`);
    }
    for (const c of G.cells.values()) if (c.item || c.mark) c.locked = true;
    G.diary.push(pick(T(id).diary)); flower(true); audio.reward(); world.confetti(new THREE.Vector3(10, 20, 8), 200); app.bot.cheer();
    const st = G.levelStars[id] || 0; const s2 = sim();
    await ui.modal(`<div class="ribbon green">${esc(G.C.ui.reward)} · ${esc(T(id).title)}</div><div class="stars3">${[0, 1, 2].map((i) => `<span class="${i < st ? 'on' : ''}">★</span>`).join('')}</div><h2>${esc(G.C.ui.foundations)}</h2>
      <div class="stats"><div><small>Mistake caught</small>${esc(G.mistakes.find((m) => m.level === id) ? G.C.habits[G.mistakes.find((m) => m.level === id).habit].label : G.C.ui.firstTry)}</div><div><small>Families</small>${s2.families}</div><div><small>Town title</small>${esc(s2.title)}</div><div><small>${G.j ? 'Fact' : 'Evidence'}</small>${esc(pick(T(id).fact))}</div></div>
      <button class="btn go" data-act="next">${esc(G.C.ui.continue)} ➜</button>`, { say: G.C.ui.foundations });
    rig.startTurntable(0); save();
  }

  // ---------------- one level
  async function runLevel(id) {
    app.levelId = id; const lv = LEVELS[id]; const L = T(id); const short = app.session === 45;
    ui.setBadge(`${G.j ? 'SCHOOL CLUB' : 'AI LAB'} · L${lv.n}/6`); ui.setTask(`L${lv.n}/6`, pick(L.goal)); ui.helper(null); ui.facil(null); ui.views(null, []);
    stage.setTime(12); app.hour = 12.5; await rig.overview(1.4);
    // Act 1: brief (with the unlock card for the new lens)
    const lens = G.C.checks[lv.newLens];
    await ui.modal(`<div class="ribbon">${esc(G.C.ui.newLens)}</div><div class="big">${lens.icon}</div><h2>${esc(lens.label)}</h2><p>${esc(L.title)}</p><div class="levelbar"><b>LEVEL ${lv.n} OF 6</b><span>${esc(L.title)}</span><span class="dots">${[1, 2, 3, 4, 5, 6].map((i) => `<i class="${i <= lv.n ? 'on' : ''}"></i>`).join('')}</span></div><p>${esc(pick(L.brief))}</p><button class="btn go" data-act="go">${esc(G.C.ui.start)} ➜</button>`, { say: pick(L.brief) });
    stage.setTime(12.5);
    // Act 2: plan
    let res = await round(id, G.C.ui.tell); G.instructions[id] = [res.text];
    // Act 3: check
    let chk = await checkAct(id, res);
    if (!chk.flawed) { addStar(2, G.C.ui.firstTry); }
    else {
      // Act 4: fix (habit, clearer instruction, auto re-test until it passes)
      await habitAct(id); ui.facil(L.debrief);
      for (;;) {
        world.clearGhost(); res = await round(id, G.C.ui.tryClearer); G.instructions[id].push(res.text);
        const again = await checkAct(id, res, { auto: true });
        if (!again.flawed) { audio.good(); app.bot.cheer(); world.confetti(app.bot.group.position.clone(), 90); ui.alert(G.C.ui.checked, true, 1800); addStar(1, G.C.ui.checked); ui.helper({ name: G.C.helperName, tag: G.C.ui.checked, tagCls: 'ok', html: `<ul>${res.plan.reading.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>`, sure: res.sure, sureLabel: G.C.ui.sure }); break; }
        ui.helper({ name: G.C.helperName, tag: 'STILL WRONG', tagCls: 'bad', html: `<p>${esc(G.j ? 'Still a problem. Add what must be protected or tested.' : 'Still failing the test. Add a limit or a test condition.')}</p>` });
      }
      ui.facil(null);
    }
    ui.views('sky', []);
    await buildAct(id, res);
    const changed = new Set([...G.cells].filter(([, c]) => !c.locked && (c.item || c.mark)).map(([k]) => k));
    ui.helper(null);
    if (id === 'heart') await heartExtras();
    // Acts 5–7
    const mergeFood = short && id === 'food';
    if (!short && !mergeFood) await moveInAct(id);
    if (!mergeFood) await liveAct(id, short ? 8 : app.session === 60 ? 14 : 22);
    await celebrateAct(id, changed);
  }

  // ---------------- Level 6 extras: residents' summary check (sampling bias) and the charter
  async function heartExtras() {
    const s = sim(); const cycle = [...G.cells.values()].filter((c) => ['cycle', 'path', 'tram'].includes(c.item)).length; const cars = s.cars;
    const shareWalk = Math.round(100 * (cycle + 1) / (cycle + cars + 1.5));
    const sample = (where) => (where === 'carpark' ? { drivers: 9, walkers: 1 } : where === 'gate' ? { drivers: Math.round(10 * (100 - shareWalk) / 100), walkers: Math.round(10 * shareWalk / 100) } : { drivers: Math.round(30 * (100 - shareWalk) / 100), walkers: Math.round(30 * shareWalk / 100) });
    const summary = (smp) => (smp.drivers > smp.walkers ? 'Residents want more car parks' : 'Residents want safe paths and cycle lanes');
    const sure = (smp) => Math.round(100 * Math.max(smp.drivers, smp.walkers) / (smp.drivers + smp.walkers));
    let where = 'carpark';
    for (;;) {
      const smp = sample(where);
      ui.helper({ name: G.C.helperName, tag: 'SUMMARY', html: `<p>“${esc(summary(smp))}.”</p>${!G.j ? `<p class="why">I read ${smp.drivers + smp.walkers} comments from the ${where === 'carpark' ? 'car-park survey box' : where === 'gate' ? 'school gate' : 'whole town'}.</p>` : ''}`, sure: sure(smp), sureLabel: G.C.ui.sure });
      if (where === 'everyone' || (where === 'gate' && G.j)) break;
      const a = await new Promise((resolve) => ui.tray(G.j
        ? `<h3>Who did Plotter ask? Check the school gate!</h3><div class="row">${Array.from({ length: 10 }, (_, i) => `<button class="tile" data-r="${i}">🧍</button>`).join('')}</div><div class="row"><button class="btn go" data-act="gate" disabled>Tell Plotter to count everyone</button></div>`
        : `<h3>Is this summary biased? Where was the survey?</h3><div class="row"><button class="choice" data-act="gate">📍 Survey at the school gate</button><button class="choice" data-act="everyone">🏘 Survey every household</button></div>`, (tr) => {
        let n = 0; const smpG = sample('gate'); const modes = [...Array(smpG.walkers).fill('🚶'), ...Array(smpG.drivers).fill('🚗')];
        tr.querySelectorAll('[data-r]').forEach((b, i) => (b.onclick = () => { b.textContent = modes[i] || '🚶'; b.disabled = true; if (++n >= 6) tr.querySelector('[data-act]').disabled = false; }));
        tr.querySelectorAll('[data-act]').forEach((b) => (b.onclick = () => resolve(b.dataset.act)));
      }));
      where = a; audio.good();
    }
    G.mistakes.push({ level: 'heart', habit: 'missing', note: 'residents summary counted only drivers' });
    await sleep(1600);
    // the charter: three promises, checked against the simulation
    const PROMISES = [
      ['Every home within 15 minutes’ walk of school', (x) => x.walkMax <= 15], ['Carbon under the town ceiling', (x) => x.carbon <= TARGETS.carbonCeiling], ['Lights on through a still winter night', (x) => x.power.winterOK],
      ['Keep the bees and the deer', (x) => x.species.bees && x.species.deer], ['No home floods', (x) => x.flooded === 0], ['Enough food for everyone', (x) => x.food >= x.foodNeed],
    ];
    const chosen = await new Promise((resolve) => { const sel = new Set(); ui.tray(`<h3>Write your town charter: choose 3 promises</h3><div class="row">${PROMISES.map(([p], i) => `<button class="choice" data-p="${i}">📜 ${esc(p)}</button>`).join('')}</div><div class="row" style="justify-content:flex-end;margin-top:8px"><button class="btn go" data-ok disabled>Sign the charter ✍</button></div>`, (tr) => {
      tr.querySelectorAll('[data-p]').forEach((b) => (b.onclick = () => { const i = +b.dataset.p; if (sel.has(i)) sel.delete(i); else if (sel.size < 3) sel.add(i); b.classList.toggle('pick', sel.has(i)); tr.querySelector('[data-ok]').disabled = sel.size !== 3; }));
      tr.querySelector('[data-ok]').onclick = () => resolve([...sel]);
    }); });
    const s3 = sim(); G.charter = chosen.map((i) => ({ text: PROMISES[i][0], kept: PROMISES[i][1](s3) }));
    await ui.modal(`<div class="ribbon green">Town charter</div>${G.charter.map((c) => `<p style="text-align:left;color:var(--ink)">${c.kept ? '✅' : '⚠️'} ${esc(c.text)}</p>`).join('')}<button class="btn go" data-act="ok">${esc(G.C.ui.continue)}</button>`);
  }

  // ---------------- the whole session
  G.run = async () => {
    ui.setStars(G.stars); showCells(G.cells); flower(false);
    const order = LEVEL_ORDER;
    for (; G.li < order.length; G.li++) { await runLevel(order[G.li]); }
    // final: watch your town live (90-minute sessions get the full day), then the report
    ui.views('sky'); await liveAct('heart', app.session === 90 ? 40 : 16);
    stage.setTime(18.6); app.refreshLights(); await rig.overview(0.8); await sleep(300);
    const shot = app.snapshot();
    renderReport(app, G, sim(), shot);
    try { localStorage.removeItem(SAVE); } catch { /* */ }
  };
  G.saved = () => { try { const d = JSON.parse(localStorage.getItem(SAVE) || 'null'); return d && d.band === G.band ? d : null; } catch { return null; } };
  return G;
}
