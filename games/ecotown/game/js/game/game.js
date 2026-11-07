// The game: free building on the island, with Florence's tips, and the AI Lab.
// Build mode never blocks: the player builds, the town lives (day clock, residents, bubbles), and
// categories unlock as the town grows (progress.js). Florence gives short tips from the honest simulation
// (advisor.js) and invites the player into the AI Lab when the town hits a problem a mission teaches.
// An AI Lab mission is one of the six lessons (brief, instruct Florence, check, name the habit, clearer
// instruction), played on Florence's practice island (seed.js). It ends with the construction film, the
// stars, and a choice: use Florence's fixed plan in your town, or keep your town as it is.
// Stars: three per mission. Flawed first plan: found it with the first check · named the habit first time ·
// fixed plan passes. Clean first plan: clear first time · spotted the hidden guess · plan passes its check.
import * as THREE from 'three';
import { ITEMS, TARGETS, placeReason } from '../world/catalog.js';
import { simulate, cellOf, emptyCell, natureBaseline } from '../sim/sim.js';
import { ask, read as readInstr } from '../ai/plotter.js';
import { LEVELS, LEVEL_ORDER, checksFor } from './levels.js';
import { CONTENT, LEVEL_TEXT, DILEMMAS, HABITS, SANDBOX, diaryLines } from './content.js';
import { createChecks } from './checks.js';
import { bubblesFor } from './bubbles.js';
import { esc, LEVEL_ICONS, TRACK_PICS, thumb } from '../ui/ui.js';
import { renderReport } from './report.js';
import { createFilm } from './film.js';
import * as Teach from '../ai/teach.js';
import { getModel } from '../ai/plotter.js';
import { accessCheck } from '../sim/access.js';
import { TIERS, SANDBOX_TOWN_CAP, unlocked, newlyUnlocked, labReady, townGoals, townComplete, nextUnlock } from './progress.js';
import { RULES, newAdvisor, nextTip, tipText } from './advisor.js';
import { seedTo } from './seed.js';
import { runIntro } from './intro.js';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const SAVE = 'ecotown.save.v3';
const shuffle = (a) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const STOP = new Set(['a', 'an', 'the', 'and', 'or', 'of', 'to', 'for', 'in', 'on', 'at', 'by', 'with', 'is', 'it', 'be', 'that', 'this', 'our', 'we', 'us', 'please', 'all', 'some', 'old', 'new', 'make', 'put', 'build', 'find', 'grow']);
// the lens each mission unlocks for free building (the move mission's street test is a view; its lens is the step-free check)
export const LAB_LENS = { land: 'flood', move: 'access', homes: 'carbon', food: 'nature', power: 'winter', heart: 'walk' };
const DAY_SECONDS = 150; // one town day in build mode, 6:00 to 22:00

export function createGame(app) {
  const { world, ui, rig, stage, terrain, life, audio } = app;
  const G = app.G = {
    band: app.band, C: CONTENT[app.band], S: SANDBOX[app.band], j: app.band === 'junior', cells: new Map(), stars: 0, levelStars: {}, starMarks: {}, bonus: {}, mistakes: [], diary: [], instructions: {}, charter: [],
    outcomes: {}, credits: app.band === 'senior' ? 60 : Infinity, li: 0, extra: { families: 0, carbon: 0 }, townName: app.townName || 'Eco Town', inputMode: null, draft: {}, reflection: '',
    labs: {}, ever: [], classMode: !!app.classMode, full: !!app.sandboxFull, day: 1, movedIn: false, completeShown: false, busy: false,
  };
  app.C = G.C; app.hour = 8; app.levelId = null; app.inLab = false;
  const checks = createChecks(app);
  const film = app.film = createFilm(app);
  const T = (id) => LEVEL_TEXT[id];
  const pick = (o) => (typeof o === 'string' ? o : G.j ? o.j : o.s);
  const sim = (cells = G.cells) => simulate(terrain, cells, { natureStart: app.natureStart, addFamilies: G.extra.families, addCarbon: G.extra.carbon });
  app.natureStart = natureBaseline(terrain);
  const help = (o) => ui.helper({ name: G.C.helperName, ...o });
  const facil = (id, step) => ui.facil(T(id)?.facil?.[step] || null);

  // before power is unlocked the town is on the old island grid; after that, a still night shows whether the town's own power copes
  app.refreshLights = () => { const s = sim(); world.setLights(!s.homes.length ? [] : (s.power.winterOK || !G.ever.includes('power') || (app.inLab && app.levelId !== 'power') ? s.homes.map((x) => x.k) : s.homes.slice(0, Math.floor(s.homes.length * 0.4)).map((x) => x.k))); };
  function showCells(cells = G.cells, animateKeys = null) {
    let i = 0;
    for (const t of terrain.tiles.values()) { const c = cells.get(t.k); const anim = animateKeys?.has(t.k); world.setCell(t.k, c || emptyCell(), { animate: anim, delay: anim ? (i++) * 0.06 : 0, reduce: app.reduce }); if (anim) setTimeout(() => audio.pop(i), i * 60); }
    life.setTown(sim(cells), cells, stage.q); app.refreshLights();
  }
  // stars: three per mission, the best run counts. `run` holds this run's marks while a mission is played.
  let run = null;
  const totalStars = () => Object.values(G.levelStars).reduce((a, b) => a + b, 0) + Object.values(G.bonus).reduce((a, b) => a + b, 0);
  const shownStars = () => totalStars() + (run ? Math.max(0, run.marks.filter(Boolean).length - (G.levelStars[run.id] || 0)) + (run.bonus && !G.bonus[run.id] ? 1 : 0) : 0);
  function star(i, why = '') { if (!run || run.marks[i]) return; run.marks[i] = true; G.stars = shownStars(); ui.setStars(G.stars); if (why) ui.caption(`★ ${why}`, 2600); }
  function bonusStar(why) { if (!run) return; run.bonus = true; G.stars = shownStars(); ui.setStars(G.stars); ui.caption(`★ ${why}`, 2800); }
  function flower(flash = true) { const s = sim(); ui.carbonInfo = { used: s.carbon, limit: TARGETS.carbonCeiling }; ui.flower(s.petals, G.townName, { flash }); }
  const KEEP = ['introDone', 'band', 'levelStars', 'starMarks', 'bonus', 'mistakes', 'diary', 'instructions', 'extra', 'credits', 'townName', 'inputMode', 'paths', 'outcomes', 'labs', 'ever', 'classMode', 'day', 'movedIn', 'completeShown', 'charter', 'reflection'];
  function save() {
    if (app.inLab || G.full) return; // a mission's practice island is never saved as the player's town
    try { const d = { cells: [...G.cells], li: 1 }; for (const k of KEEP) d[k] = G[k]; if (d.credits === Infinity) d.credits = null; localStorage.setItem(SAVE, JSON.stringify(d)); } catch { /* storage off: keep playing */ }
  }
  G.load = (data) => { for (const k of KEEP) if (data[k] != null) G[k] = data[k]; if (G.credits == null) G.credits = G.j ? Infinity : 60; G.cells = new Map(data.cells || []); G.stars = totalStars(); };
  G.paths = {};

  // ---------------- input: word tiles (junior default), free text (senior default), cards (fallback)
  // The chosen mode and what was typed or tapped are kept between rounds, so a retry starts from the last try.
  function instruct(id, heading) {
    const L = T(id); let mode = G.inputMode || (G.j ? 'tiles' : 'text');
    const d = (G.draft[id] ||= { tiles: [], text: '' }); const cardOrder = shuffle([0, 1, 2]);
    return new Promise((resolve) => {
      const finish = (text, via) => { resolve({ text, via }); };
      const render = () => {
        const used = d.tiles.slice().sort((a, b) => a - b); // tiles stay in their natural sentence order
        const tabs = `<div class="tabs" role="tablist"><button data-m="tiles" class="${mode === 'tiles' ? 'on' : ''}">🧩 ${esc(G.C.ui.useTiles)}</button><button data-m="text" class="${mode === 'text' ? 'on' : ''}">⌨ ${esc(G.C.ui.typeInstead)}</button><button data-m="cards" class="${mode === 'cards' ? 'on' : ''}">🃏 ${esc(G.C.ui.useCards)}</button></div>`;
        let body = '';
        if (mode === 'tiles') body = `<div class="sentence" data-placeholder="Tap words to build your instruction">${used.map((i) => `<button class="tile" data-u="${i}">${esc(L.tiles[i])}</button>`).join('')}</div><div class="tiles">${L.tiles.map((w, i) => `<button class="tile ${used.includes(i) ? 'used' : ''}" data-w="${i}">${esc(w)}</button>`).join('')}</div><div class="row"><button class="btn go" data-send ${used.length ? '' : 'disabled'}>${esc(G.C.ui.send)} ➜</button><button class="btn alt small" data-clear>Clear</button></div>`;
        if (mode === 'text') body = `<div class="textin"><div class="field"><input data-in maxlength="160" autocomplete="off" spellcheck="true" placeholder="${G.j ? 'Type your instruction…' : 'e.g. goal + what to protect + how to check'}" aria-label="Instruction for Florence"><div class="hl" data-hl></div></div><button class="btn go" data-send ${d.text.trim() ? '' : 'disabled'} title="${esc(G.C.ui.emptyText)}">${esc(G.C.ui.send)} ➜</button></div>`;
        if (mode === 'cards') body = `<div class="row">${cardOrder.map((ci, n) => `<button class="choice" data-card="${ci}"><span class="btn k">${'ABC'[n]}</span>${esc(L.cards[ci][0])}</button>`).join('')}</div>`;
        ui.tray(`<h3>${esc(heading)}</h3>${tabs}${body}`, (tr) => {
          tr.querySelectorAll('[data-m]').forEach((b) => (b.onclick = () => { mode = G.inputMode = b.dataset.m; render(); }));
          tr.querySelectorAll('[data-w]').forEach((b) => (b.onclick = () => { const i = +b.dataset.w; if (!d.tiles.includes(i)) { d.tiles.push(i); audio.tap(); render(); } }));
          tr.querySelectorAll('[data-u]').forEach((b) => (b.onclick = () => { d.tiles = d.tiles.filter((x) => x !== +b.dataset.u); render(); }));
          tr.querySelector('[data-clear]')?.addEventListener('click', () => { d.tiles = []; render(); });
          tr.querySelectorAll('[data-card]').forEach((b) => (b.onclick = () => finish(L.cards[+b.dataset.card][0], 'card')));
          const inp = tr.querySelector('[data-in]'); const send = tr.querySelector('[data-send]');
          if (inp) {
            inp.value = d.text; inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length);
            const hl = tr.querySelector('[data-hl]'); if (d.text) highlight(id, d.text, hl);
            let tmr = 0; inp.oninput = () => { d.text = inp.value; send.disabled = !inp.value.trim(); clearTimeout(tmr); tmr = setTimeout(() => highlight(id, inp.value, hl), 160); };
            inp.onkeydown = (e) => { if (e.key === 'Enter' && inp.value.trim()) finish(inp.value.trim(), 'text'); };
          }
          send?.addEventListener('click', () => { const text = mode === 'text' ? inp.value.trim() : used.map((i) => L.tiles[i]).join(' '); if (text) finish(text, mode); });
        });
      };
      render();
    });
  }
  // live highlight of the words the model picked up (free text). Only meaningful words are marked, shown without punctuation.
  function highlight(id, text, el) {
    if (!text.trim()) { el.innerHTML = ''; return; }
    const rd = readInstr(id, text, { withExplain: true });
    const norm = (w) => w.toLowerCase().replace(/[^a-z0-9'-]/g, '');
    const ex = (rd.explain || []).filter((e) => !STOP.has(norm(e.word)) && norm(e.word).length > 2).sort((a, b) => b.weight - a.weight).slice(0, 4);
    const strong = new Set(ex.filter((e) => e.weight > 0.5).map((e) => norm(e.word))); const some = new Set(ex.filter((e) => e.weight > 0.3).map((e) => norm(e.word)));
    const words = text.split(/\s+/).map(norm).filter(Boolean).map((k) => (strong.has(k) ? `<mark class="strong">${esc(k)}</mark>` : some.has(k) ? `<mark>${esc(k)}</mark>` : `<span>${esc(k)}</span>`));
    el.innerHTML = rd.isUnknown ? `<span>${esc(G.C.ui.unknown)}</span>` : `<span>Florence reads:</span> ${rd.active.map((s) => `<mark class="strong">${esc(s.replace(/_/g, ' '))}</mark>`).join(' ')}${ex.length ? ' · ' + words.join(' ') : ''}`;
  }

  // ---------------- one instruction round: ask Florence, show her colour-coded plan and her reading
  let guess = null; // Florence's latest guess, kept on screen (small) while the player checks it
  const guessHtml = (res) => `<div class="chips">${res.read.active.map((s) => `<span>${esc(s.replace(/_/g, ' '))}</span>`).join('')}</div><ul>${res.plan.reading.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>${!G.j && res.plan.assumptions.length ? `<p style="color:#ffc83d">Assumed: ${esc(res.plan.assumptions.join(' '))}</p>` : ''}${res.plan.wont?.length ? `<p class="wont"><b>${esc(G.C.ui.wontDo)}</b> ${res.plan.wont.map(esc).join(' ')}</p>` : ''}`;
  const showGuessMini = () => { if (guess) help({ tag: G.C.ui.plotterGuess, html: guessHtml(guess), sure: guess.sure, sureLabel: G.C.ui.sure, mini: true }); };
  async function round(id, heading) {
    for (;;) {
      const { text } = await instruct(id, heading);
      app.bot.show(true);
      help({ tag: 'THINKING', html: `<p>${esc('“' + text + '”')}</p>`, thinking: true });
      await sleep(app.reduce ? 100 : 650);
      const res = ask(id, text, { terrain, cells: G.cells });
      if (res.unknown) {
        audio.bad(); help({ tag: '?', tagCls: 'bad', html: `<p>${esc(G.C.ui.unknown)}</p><p>${esc(G.C.ui.tryWords)}: ${res.hints.map((x) => `<b>${esc(x)}</b>`).join(', ')}</p>`, say: G.C.ui.unknown, voice: 'helper' });
        continue;
      }
      res.text = text; guess = res;
      const c = centroidOf(res.plan.placements); app.bot.hover(c); if (!app.reduce) rig.focus(c, { dist: id === 'land' ? rig.frameDist() * 0.85 : Math.min(rig.frameDist() * 0.8, 70 + spreadOf(res.plan.placements) * 1.6), pitch: 0.7 }, 1.2);
      await sleep(app.reduce ? 0 : 900); app.bot.beam(true, 15);
      const dur = world.showGhost(res.plan.placements, res.after, { reduce: app.reduce });
      setTimeout(() => app.bot.beam(false), dur * 1000 + 300);
      res.plan.placements.forEach((_, i) => setTimeout(() => audio.ghost(i), i * 50));
      const why = G.j ? '' : `Why ${res.sure}%? reading <b>${res.breakdown.reading}%</b> × plan fit <b>${res.breakdown.fit}%</b> × experience <b>${res.breakdown.experience}%</b>. Tested: ${esc(res.plan.tested)}.`;
      help({ tag: G.C.ui.plotterGuess, html: guessHtml(res), sure: res.sure, sureLabel: G.C.ui.sure, why, say: res.plan.reading.join(' ') + ` ${res.sure} percent ${G.C.ui.sure}.` + (res.plan.wont?.length ? ' ' + res.plan.wont.join(' ') : ''), voice: 'helper' });
      ui.legend('plan');
      await sleep(dur * 1000);
      return res;
    }
  }
  function centroidOf(pl) { const ks = [...new Set(pl.map((p) => p.k))]; if (!ks.length) return new THREE.Vector3(2, 0, 4); const v = new THREE.Vector3(); for (const k of ks) v.add(world.tileTop(k)); return v.multiplyScalar(1 / ks.length); }
  function spreadOf(pl) { const c = centroidOf(pl); let m = 0; for (const p of pl) m = Math.max(m, world.tileTop(p.k).distanceTo(c)); return m; }

  // ---------------- checking: choose a lens or view. Street and inside views stay until the player leaves them.
  // After each check that shows no problem, the player chooses: check another way, or accept the plan.
  // Accepting never leaves the player stuck: a hidden problem is shown, or what the plan missed is named.
  async function checkAct(id, res, { auto = false } = {}) {
    const lv = LEVELS[id]; const sAfter = sim(res.after); const cx = ctxFor(res.after);
    const reveal = lv.reveal(sAfter, sim(), cx); const flawed = Object.keys(reveal).length > 0 || !lv.pass(sAfter, cx);
    if (auto) {
      const which = Object.keys(reveal)[0];
      if (!which) return { flawed: false };
      const r = await checks.run(which, sAfter, res.after, reveal); audio.bad(); app.bot.shrug(); ui.alert(fmt(T(id).flaw[which], r.revealed), false); await sleep(2200); ui.show('alert', false); await checks.leave(); return { flawed: true, which };
    }
    const opts = shuffle(checksFor(id, G.j, reveal)); const tried = []; let tries = 0;
    const label = (c) => G.C.checks[c].label;
    const accept = async () => {
      ui.show('tray', false);
      if (!flawed) { // the plan really is fine
        ui.alert(G.C.ui.checked, true); audio.good(); star(0, G.C.ui.firstTry); await sleep(1800); ui.show('alert', false); star(2, G.C.ui.checked);
        return { flawed: false, tried };
      }
      const which = Object.keys(reveal)[0];
      if (which) { // a check the player hasn't tried shows the problem: show it now, before anything is built
        ui.caption(G.C.ui.notFoundYet, 3000); await sleep(app.reduce ? 200 : 1200);
        const view = ['street', 'inside'].includes(which); if (view) { world.clearGhost(); showCells(res.after); }
        const r = await checks.run(which, sAfter, res.after, reveal); audio.bad(); app.bot.shrug(); ui.alert(fmt(T(id).flaw[which], r.revealed), false);
        await sleep(1600); await continueBtn(); ui.show('alert', false); await checks.leave(); world.clearGhost(); if (view) showCells(G.cells);
        return { flawed: true, which, tries, late: true, rv: r.revealed };
      }
      // no check can show it: the plan simply leaves out something the level needs. Name it; the player adds it while building.
      const missed = lv.needs(sAfter, cx, G.j).filter((n) => !n.ok).map((n) => n.label.replace(/^\P{L}+/u, ''));
      audio.bad(); ui.alert(`${G.C.ui.outcome.missed}: ${missed.join('; ')}`, false); star(0, G.C.ui.checked);
      await sleep(1600); await continueBtn(); ui.show('alert', false);
      return { flawed: false, missed, tried };
    };
    for (;;) {
      const choice = await new Promise((resolve) => ui.tray(`<h3>${esc(tried.length ? G.C.ui.checkHelp : G.C.ui.how)}</h3><div class="row">${opts.map((c) => `<button class="choice ${tried.includes(c) ? 'tried' : ''}" data-c="${c}"><span class="ic">${G.C.checks[c].icon}</span>${esc(label(c))}${tried.includes(c) ? ' ✓' : ''}</button>`).join('')}</div>${tried.length ? `<div class="row" style="justify-content:flex-end;margin-top:6px"><button class="btn go" data-accept>✓ ${esc(G.C.ui.accept)}</button></div>` : ''}`,
        (tr) => { tr.querySelectorAll('[data-c]').forEach((b) => (b.onclick = () => resolve(b.dataset.c))); tr.querySelector('[data-accept]')?.addEventListener('click', () => resolve(null)); }));
      if (!choice) return accept();
      ui.show('tray', false); showGuessMini(); ui.legend(null); tries++;
      const view = ['street', 'inside'].includes(choice);
      if (view) { world.clearGhost(); showCells(res.after); }
      const r = await checks.run(choice, sAfter, res.after, reveal);
      if (r.revealed) {
        audio.bad(); app.bot.shrug(); ui.alert(fmt(T(id).flaw[choice], r.revealed), false);
        if (tries === 1) star(0, G.C.ui.foundIt);
        await sleep(1600); await continueBtn();
        ui.show('alert', false); await checks.leave(); world.clearGhost(); if (view) showCells(G.cells);
        return { flawed: true, which: choice, tries, rv: r.revealed };
      }
      if (!tried.includes(choice)) tried.push(choice);
      // this check showed no problem: say what it looked at and what it found, then let the player decide
      const summary = r.info?.summary || '';
      ui.say(`${label(choice)}: ${summary}. ${G.C.ui.nothingHere}`, 'narrator');
      const next = await new Promise((resolve) => ui.tray(`<h3>✓ ${esc(label(choice))}${summary ? `: ${esc(summary)}` : ''}</h3><p class="checknote">${G.j ? 'This checked' : 'Tested'}: ${esc(G.C.checkWhat[choice])}. ${esc(G.C.ui.nothingHere)}</p><div class="row" style="justify-content:flex-end"><button class="btn alt" data-again>🔎 ${esc(G.C.ui.checkAnother)}</button><button class="btn go" data-accept>✓ ${esc(G.C.ui.accept)}</button></div>`,
        (tr) => { tr.querySelector('[data-again]').onclick = () => resolve('again'); tr.querySelector('[data-accept]').onclick = () => resolve('accept'); }));
      await checks.leave();
      if (view) showCells(G.cells);
      if (next === 'accept') { world.clearGhost(); const out = await accept(); world.clearGhost(); return out; }
      world.showGhost(res.plan.placements, res.after, { reduce: true });
    }
  }
  const continueBtn = () => new Promise((r) => ui.tray(`<div class="row" style="justify-content:center"><button class="btn go" data-go>${esc(G.C.ui.next)} ➜</button></div>`, (tr) => (tr.querySelector('[data-go]').onclick = r)));
  const fmt = (o, rv) => pick(o).replace('{n}', rv?.n ?? '');

  // ---------------- naming the habit: graded against what Florence actually assumed in this plan
  async function habitAct(id, res) {
    const lv = LEVELS[id]; const right = res.plan.habit || lv.habit; const why = res.plan.habitWhy || G.C.habits[right].explain; app.__expectHabit = right; // (read by the play-through test)
    const order = shuffle(HABITS); const wrong = new Set();
    for (;;) {
      const pickH = await new Promise((resolve) => ui.tray(`<h3>${esc(G.C.ui.whyWrong)}</h3><div class="row">${order.map((k) => `<button class="choice ${wrong.has(k) ? 'wrong' : ''}" data-h="${k}" ${wrong.has(k) ? 'disabled' : ''}><span class="ic">${G.C.habits[k].icon}</span>${esc(G.C.habits[k].label)}</button>`).join('')}</div>`, (tr) => tr.querySelectorAll('[data-h]').forEach((b) => (b.onclick = () => resolve(b.dataset.h)))));
      if (pickH === right) {
        audio.good(); ui.alert(`${G.C.ui.correct} ${G.C.habits[right].label}`, true, 2600); if (!wrong.size) star(1, `${G.C.ui.correct} ${G.C.habits[right].label}`);
        G.mistakes.push({ level: id, habit: right, why });
        help({ tag: 'OOPS', tagCls: 'bad', html: `<p><b>${esc(G.C.ui.correct)}</b> ${esc(why)}</p>`, say: `${G.C.ui.correct} ${why}`, voice: 'helper' }); await sleep(600); return;
      }
      audio.tap(); wrong.add(pickH);
      const reading = res.plan.reading[0] || '';
      if (wrong.size >= 2) { // after two wrong picks, explain the answer and move on
        G.mistakes.push({ level: id, habit: right, why });
        help({ tag: 'OOPS', tagCls: 'bad', html: `<p>${esc(G.C.ui.notQuite)} ${esc(G.C.ui.itWas)} <b>“${esc(G.C.habits[right].label)}”</b>. ${esc(why)}</p>`, say: `${G.C.ui.notQuite} ${G.C.ui.itWas} ${G.C.habits[right].label}. ${why}`, voice: 'helper' });
        await sleep(1200); await continueBtn(); return;
      }
      help({ tag: G.C.ui.plotterGuess, tagCls: 'bad', html: `<p>${esc(G.C.ui.notQuite)} “${esc(G.C.habits[pickH].label)}” would mean: ${esc(G.C.habits[pickH].explain)}</p><p>Your instruction: <b>“${esc(res.text)}”</b>. ${esc(G.C.ui.lookAgain)} <b>“${esc(reading)}”</b></p>`, say: `${G.C.ui.notQuite} ${G.C.habits[pickH].label} would mean: ${G.C.habits[pickH].explain} ${G.C.ui.lookAgain} ${reading}`, voice: 'helper' });
    }
  }
  // ---------------- a clean first try still teaches the lesson: spot what Florence guessed anyway
  async function hiddenAct(id) {
    const H = pick(T(id).hidden); const order = shuffle([0, 1, 2]); const wrong = new Set();
    for (;;) {
      const a = await new Promise((resolve) => ui.tray(`<h3>${esc(H.q)}</h3><div class="row">${order.map((i) => `<button class="choice ${wrong.has(i) ? 'wrong' : ''}" data-o="${i}" ${wrong.has(i) ? 'disabled' : ''}><span class="ic">🔎</span>${esc(H.options[i])}</button>`).join('')}</div>`, (tr) => tr.querySelectorAll('[data-o]').forEach((b) => (b.onclick = () => resolve(+b.dataset.o)))));
      if (a === 0) { audio.good(); if (!wrong.size) star(1, `${G.C.ui.correct} ${G.C.stars.clean[1]}`); help({ tag: 'GUESSED', tagCls: 'ok', html: `<p><b>${esc(G.C.ui.correct)}</b> ${esc(H.why)}</p>`, say: `${G.C.ui.correct} ${H.why}`, voice: 'helper' }); await sleep(800); await continueBtn(); return H.why; }
      audio.tap(); wrong.add(a); ui.caption(`${G.C.ui.notQuite} Florence didn’t guess that one.`, 2600);
      if (wrong.size >= 2) { help({ tag: 'GUESSED', html: `<p>${esc(H.why)}</p>`, say: H.why, voice: 'helper' }); await sleep(800); await continueBtn(); return H.why; }
    }
  }


  const ctxFor = (cells) => ({ moveTiles: [...cells.values()].filter((c) => c.item && ITEMS[c.item].level === 'move').length, hasSchool: [...cells.values()].some((c) => c.item === 'school'), access: app.levelId === 'move' ? accessCheck(terrain, cells) : null });
  const planCost = (pl) => pl.reduce((a, p) => a + (ITEMS[p.item || p.mod || p.mark]?.cost || 0), 0);
  const isOpen = (cat) => G.ever.includes(cat);

  // ================= FREE BUILDING =================
  // tint every tile the selected tool may go on, so players can see where things are allowed
  function showAllowed(tool) {
    const spec = new Map();
    for (const t of terrain.tiles.values()) {
      const c = cellOf(G.cells, t.k); let ok;
      if (tool === 'erase') ok = !t.fixed && (!!c.item || !!c.mark || c.mods.length > 0);
      else ok = !placeReason(tool, t, c) && !(ITEMS[tool].kind === 'build' && c.item === tool) && !(ITEMS[tool].kind === 'mark' && (c.item || c.mark === tool));
      if (ok) spec.set(t.k, { color: tool === 'erase' ? '#ff9a8a' : '#fff3a8', pattern: 'dots', opacity: 0.55 });
    }
    world.setOverlay(spec);
  }
  // why `tool` can't go on tile k in free building (null if it can)
  function sandboxReason(tool, t, c, { free = false } = {}) {
    const it = ITEMS[tool]; const why = placeReason(tool, t, c); if (why) return why;
    if (it.kind === 'mark' && c.item) return G.S.removeFirst;
    if (it.kind === 'mark' && c.mark === tool) return G.S.already;
    if (it.kind === 'build' && c.item === tool) return G.S.already;
    if (tool === 'town' && sim().townTiles >= SANDBOX_TOWN_CAP) return G.S.townFull(SANDBOX_TOWN_CAP);
    if (!free && (it.cost || 0) > G.credits) return G.S.noCredits;
    return null;
  }
  // put `tool` on tile k (or erase there). Returns true if the town changed.
  // free: a mission's plan, used in the town, is paid for by the AI Lab (13–17 credits are not spent)
  function placeAt(k, tool, { free = false } = {}) {
    const t = terrain.tiles.get(k); if (!t) return false;
    const c = { ...cellOf(G.cells, k), mods: [...cellOf(G.cells, k).mods], locked: false };
    if (tool === 'erase') {
      if (t.fixed) return false;
      if (c.mods.length) { const m = c.mods.pop(); refund(m); }
      else if (c.item) { refund(c.item); c.item = null; }
      else if (c.mark) c.mark = null;
      else return false;
    } else {
      const it = ITEMS[tool]; const why = sandboxReason(tool, t, c, { free }); if (why) { if (!free) { audio.bad(); ui.caption(why, 2000); } return false; }
      if (it.unique) for (const [kk, cc] of G.cells) if (cc.item === tool) { refund(tool); G.cells.set(kk, { ...cc, item: null }); world.setCell(kk, G.cells.get(kk)); }
      if (it.kind === 'mark') c.mark = tool; else if (it.kind === 'mod') c.mods.push(tool); else { if (c.item) refund(c.item); c.item = tool; }
      if (G.credits !== Infinity && !free) G.credits -= it.cost || 0;
    }
    G.cells.set(k, c); world.setCell(k, c, { build: { dur: 0.7 }, reduce: app.reduce });
    return true;
  }
  const refund = (id) => { if (G.credits !== Infinity) G.credits += ITEMS[id]?.cost || 0; };

  const sb = {
    tool: 'town', cat: 'land', folded: false, paused: false, running: false, bubbles: [], nextBub: 0, nextTipCheck: 0, adv: newAdvisor(), tipT: 0, saveT: 0, tick: 0, lens: null, goalsOpen: false,
  };
  const CAT_ICON = Object.fromEntries(LEVEL_ORDER.map((id, i) => [id, LEVEL_ICONS[i]]));
  const catLabel = (id) => `${CAT_ICON[id]} ${G.S.cats[id]}`;
  function clockText() { const hh = Math.floor(app.hour), mm = Math.floor((app.hour - hh) * 4) * 15; return `${hh}:${String(mm).padStart(2, '0')}`; }

  // the build bar: category tabs, the palette of the open category, erase, the clock and the town's numbers
  function renderBar() {
    if (!sb.running) return;
    const s = sim(); const items = isOpen(sb.cat) ? LEVELS[sb.cat].palette : [];
    const tier = TIERS.find((t) => t.id === sb.cat);
    const cr = G.credits !== Infinity ? `<span class="${G.credits > 0 ? 'ok' : ''}"><b>💰</b>${G.credits} ${G.S.credits}</span>` : '';
    const slot = (idd) => { const it = ITEMS[idd]; const vid = G.videos?.has(idd);
      return `<div class="slotwrap"><button class="slot item ${sb.tool === idd ? 'on' : ''}" data-t="${idd}" aria-pressed="${sb.tool === idd}" title="${esc(it.label)}"><img src="${thumb(idd)}" alt=""><span>${esc(it.label)}</span>${!G.j && it.cost ? `<em class="cost">💰${it.cost}</em>` : ''}</button>${vid ? `<button class="play" data-play="${idd}" aria-label="${esc(G.S.watchBuilt)}: ${esc(it.label)}" title="${esc(G.S.watchBuilt)}">▶</button>` : ''}</div>`; };
    ui.buildPanel(`<div class="bhead"><b>${esc(G.S.buildTitle)}</b><span class="clock" data-clock title="${esc(G.S.dayClock)}">🕖 ${clockText()} · ${esc(G.S.day)} ${G.day}</span><button class="slot mini" data-pause aria-label="${esc(sb.paused ? G.S.play : G.S.pause)}" title="${esc(sb.paused ? G.S.play : G.S.pause)}">${sb.paused ? '▶' : '❚❚'}</button><button class="slot mini fold" data-fold aria-expanded="${!sb.folded}" aria-label="${esc(G.S.tools)}">${sb.folded ? '▴' : '▾'}</button></div>
      <div class="bbody ${sb.folded ? 'folded' : ''}"><div class="cats" role="tablist" aria-label="${esc(G.S.buildWhat)}">${LEVEL_ORDER.map((id, i) => `<button class="slot cat ${sb.cat === id ? 'on' : ''} ${isOpen(id) ? '' : 'locked'}" data-cat="${id}" role="tab" aria-selected="${sb.cat === id}" title="${esc(G.S.cats[id])}"><img src="${thumb(TRACK_PICS[i])}" alt=""><span>${esc(G.S.cats[id])}</span>${isOpen(id) ? '' : '<i class="lock">🔒</i>'}</button>`).join('')}</div>
      <div class="items">${isOpen(sb.cat) ? items.map(slot).join('') + `<div class="slotwrap"><button class="slot item erase ${sb.tool === 'erase' ? 'on' : ''}" data-t="erase" aria-pressed="${sb.tool === 'erase'}"><b class="ico">🧽</b><span>${esc(G.S.erase)}</span></button></div>`
        : lockedView(tier, s)}</div></div>
      <div class="bfoot"><span class="ok"><b>🏘</b>${s.townTiles}/${SANDBOX_TOWN_CAP}</span><span class="${s.familiesSafe >= TARGETS.families ? 'ok' : ''}"><b>👪</b>${s.familiesSafe}/${TARGETS.families}</span>${cr}</div>`, (tr) => {
      tr.querySelectorAll('[data-cat]').forEach((b) => (b.onclick = () => { sb.cat = b.dataset.cat; if (isOpen(sb.cat)) { sb.tool = LEVELS[sb.cat].palette[0]; showAllowed(sb.tool); } else world.setOverlay(null); sb.folded = false; audio.tap(); renderBar(); }));
      tr.querySelectorAll('[data-t]').forEach((b) => (b.onclick = () => { sb.tool = b.dataset.t; showAllowed(sb.tool); audio.tap(); renderBar(); }));
      tr.querySelectorAll('[data-play]').forEach((b) => (b.onclick = () => playVideo(b.dataset.play)));
      tr.querySelector('[data-fold]').onclick = () => { sb.folded = !sb.folded; renderBar(); requestAnimationFrame(frameView); };
      tr.querySelector('[data-pause]').onclick = () => { sb.paused = !sb.paused; renderBar(); };
    });
  }
  // a locked category still shows what it will unlock (greyed), with a bar filling toward it
  function lockedView(tier, s) {
    const [have, need] = tier.progress(s); const pct = Math.round(100 * Math.min(1, have / need));
    return `<div class="lockbar"><p>🔒 ${esc(G.S.unlocksWhen)} <b>${esc(pick(tier.need))}</b></p><div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="${need}" aria-valuenow="${Math.min(have, need)}"><i style="width:${pct}%"></i><span>${Math.min(have, need)} / ${need}</span></div></div>`
      + LEVELS[tier.id].palette.map((idd) => `<div class="slotwrap"><div class="slot item locked" aria-disabled="true" title="${esc(ITEMS[idd].label)}"><img src="${thumb(idd)}" alt=""><span>${esc(ITEMS[idd].label)}</span><i class="lock">🔒</i></div></div>`).join('');
  }
  function progressNow(cat, s) {
    if (cat === 'homes') return `${s.townTiles} ${G.S.tiles}`;
    if (cat === 'heart') return `${s.families} ${G.S.families}, ${G.S.food} ${s.food}/${s.foodNeed}`;
    return `${s.families} ${G.S.families}`;
  }
  // the town card: the next town goal, and the six missions on the track (lit = unlocked, ticked = done)
  function renderCard() {
    const s = sim(); const goals = townGoals(s, ctxFor(G.cells)); const next = goals.find((g) => !g.ok);
    ui.setBadge('');
    const nu = nextUnlock(s, G.ever);
    ui.setTask(0, nu ? `${G.S.nextGoal}: ${pick(nu.tier.need)} (${nu.have}/${nu.need}) → ${G.S.cats[nu.id]}` : next ? `${G.S.nextGoal}: ${G.S.goal[next.id](s)}` : G.S.allGoals);
    ui.setTrack(LEVEL_ORDER.map((id) => (G.labs[id] ? 'done' : labReady(id, G.ever, G.labs, G.classMode) ? 'on' : '')));
    ui.setStars(G.stars = totalStars());
  }
  // lens buttons in the icon strip, one per mission done
  function renderLenses() { ui.setLenses(LEVEL_ORDER.filter((id) => G.labs[id]).map((id) => ({ id: LAB_LENS[id], icon: G.C.checks[LAB_LENS[id]].icon, label: G.C.checks[LAB_LENS[id]].label, on: sb.lens === LAB_LENS[id] }))); }
  async function toggleLens(id) {
    if (G.busy) return;
    if (sb.lens) { const was = sb.lens; sb.lens = null; await checks.leave(); renderLenses(); if (sb.tool) showAllowed(sb.tool); if (was === id) return; }
    sb.lens = id; world.setOverlay(null); renderLenses();
    const r = await checks.run(id, sim(), G.cells, {});
    if (sb.lens !== id) return;
    if (r.info?.summary) ui.caption(`${G.C.checks[id].label}: ${r.info.summary}`, 5000);
    ui.P.lensbar.insertAdjacentHTML('beforeend', `<button class="btn small alt lensx" data-lensx>✕ ${esc(G.S.closeLens)}</button>`);
    ui.P.lensbar.querySelector('[data-lensx]').onclick = () => toggleLens(id);
  }

  // after every change: the world, the flower, the bar, unlocks, Florence's tips and the autosave
  function changed() {
    const s = sim();
    life.setTown(s, G.cells, stage.q); app.refreshLights(); flower(true);
    sb.bubbles = s.homes.length ? bubblesFor(s, G.cells, terrain, G.j, 'final') : [];
    const before = G.ever; G.ever = unlocked(s, G.ever, G.full); const fresh = newlyUnlocked(before, G.ever);
    if (fresh.length) announceUnlock(fresh);
    if (!G.movedIn && s.homes.length) moveIn(s);
    renderBar(); renderCard();
    if (!fresh.length) adviseSoon(400);
    if (!G.completeShown && !sb.celebrating && townComplete(s, ctxFor(G.cells))) { sb.celebrating = true; setTimeout(celebrateTown, 1500); }
    clearTimeout(sb.saveT); sb.saveT = setTimeout(save, 800);
  }
  // one alert for everything that opened at once; Florence's tip is about the first of them
  function announceUnlock(ids) {
    if (!sb.running) return;
    audio.reward(); ui.alert(`${ids.map((id) => `${CAT_ICON[id]} ${G.S.cats[id]}`).join(' · ')}: ${G.S.unlocked}`, true, 2600);
    const id = ids[0]; const lab = ids.find((x) => labReady(x, G.ever, G.labs, G.classMode) && !G.labs[x]) || null;
    showTip({ id: 'unlock-' + id, text: pick(G.S.unlockTip[id]) + (lab ? ' ' + G.S.labReady : ''), lab }); app.bot?.cheer();
    sb.adv.last = performance.now();
  }
  function adviseSoon(ms) { clearTimeout(sb.tipT); sb.tipT = setTimeout(advise, ms); }
  function advise() {
    if (!sb.running || sb.paused || G.busy || sb.lens || sb.intro) return;
    const s = sim(); const rule = nextTip(sb.adv, s, { open: G.ever, hasSchool: ctxFor(G.cells).hasSchool }, performance.now());
    if (!rule) return;
    const lab = rule.lab && !G.labs[rule.lab] && labReady(rule.lab, G.ever, G.labs, G.classMode) ? rule.lab : null;
    const lens = rule.lab && G.labs[rule.lab] && rule.lens === LAB_LENS[rule.lab] ? rule.lens : null;
    showTip({ id: rule.id, text: tipText(rule, s, G.j), lab, lens, at: tipAt(rule.id, s) });
  }
  // Florence's tip: one line in the dock, above the build bar. Never blocks; fades after a while.
  let tipShown = null;
  function showTip({ id, text, lab = null, lens = null, at = null }) {
    tipShown = id; lastTip = { id, text, lab, lens };
    const el = ui.florence({ tag: G.S.tipTag, html: `<p>${esc(text)}</p><div class="tiprow">${lab ? `<button class="slot act go" data-tiplab="${lab}"><img src="${thumb('ailab')}" alt=""><span>${esc(G.S.showInLab)}</span></button>` : ''}${lens ? `<button class="slot act" data-tiplens="${lens}"><b class="ico">${G.C.checks[lens].icon}</b><span>${esc(G.S.useLens)}</span></button>` : ''}<button class="slot act x" data-tipx aria-label="${esc(G.S.dismiss)}"><b class="ico">✕</b></button></div>`, say: text });
    el.querySelector('[data-tiplab]')?.addEventListener('click', () => { hideTip(); openLab(lab); });
    el.querySelector('[data-tiplens]')?.addEventListener('click', () => { hideTip(); toggleLens(lens); });
    el.querySelector('[data-tipx]').onclick = () => hideTip();
    if (at && sb.running) florenceTo(at, 'point');
    clearTimeout(sb.tipHide); sb.tipHide = setTimeout(() => { if (tipShown === id) hideTip(); }, lab ? 20000 : 12000);
  }
  let lastTip = null;
  function hideTip() { tipShown = null; if (sb.running && lastTip && !sb.intro) ui.florenceMini(() => showTip(lastTip)); else ui.florence(null); }
  // where on the island a tip is about, so Florence can walk over and point at it
  function tipAt(id, s) {
    const town = [...G.cells].filter(([, c]) => c.mark === 'town').map(([k]) => k);
    const zoneOf = (k) => terrain.tiles.get(k)?.zone;
    if (id === 'flood') return town.find((k) => ['meadow', 'wetland'].includes(zoneOf(k))) || null;
    if (id === 'wood') return town.find((k) => zoneOf(k) === 'wood') || null;
    if (id === 'crossing') return s.unsafeKeys?.[0] || null;
    if (id === 'homesCarbon') return [...G.cells].find(([, c]) => c.item === 'concrete')?.[0] || s.homes[0]?.k || null;
    if (id === 'walk') { let best = null, w = -1; for (const [k, m] of Object.entries(s.walk || {})) if (m > w) { w = m; best = k; } return best; }
    if (id === 'wildlife') return [...G.cells].find(([, c]) => c.item === 'bigfield')?.[0] || null;
    if (['cold', 'winter', 'homesNext', 'school', 'hungry', 'rain'].includes(id)) return s.homes[0]?.k || town[0] || null;
    return null;
  }
  // Florence walks over and reacts: peers at a new build (not too often), points at a problem, cheers
  let fNext = 0;
  async function florenceTo(k, act = 'peer') {
    const bot = app.bot; if (!bot || app.inLab || !k || !terrain.tiles.has(k)) return;
    const now = performance.now(); if (act === 'peer' && now < fNext) return; fNext = now + (act === 'peer' ? 7000 : 3000);
    const p = world.tileTop(k); bot.show(true); await bot.walkTo(p, { stopShort: 7.5, maxDur: 3 });
    if (!sb.running || app.inLab) return;
    if (act === 'point') bot.point(p.clone().add(new THREE.Vector3(0, 1, 0))); else if (act === 'cheer') bot.cheer(); else bot.peer(p);
  }
  // a build video: from above while it goes up, then down at eye level. Captions come from its timeline.
  async function playVideo(id) {
    if (!G.videos?.has(id)) return; const it = ITEMS[id]; const was = sb.paused; sb.paused = true;
    let tl = null; try { tl = await (await fetch(`videos/${id}.json`)).json(); } catch { /* captions are optional */ }
    await videoCard(it.label, id, tl);
    sb.paused = was;
  }
  function videoCard(label, id, tl) {
    return ui.modal(`<div class="ribbon">▶ ${esc(label)}</div><div class="vidwrap"><video data-v src="videos/${id}.mp4" poster="videos/${id}.jpg" autoplay muted playsinline preload="auto"></video><div class="vcap" data-cap></div></div>
      <div class="row vchips"><button class="slot act" data-seek="0"><b class="ico">🦅</b><span>${esc(G.S.fromAbove)}</span></button><button class="slot act" data-seek="eye"><b class="ico">👟</b><span>${esc(G.S.eyeLevel)}</span></button><button class="slot act" data-replay><b class="ico">↺</b><span>${esc(G.S.replay)}</span></button></div>
      <button class="btn go" data-act="close">${esc(app.inLab ? G.C.ui.continue : G.S.backToBuilding)}</button>`, { bind: (m) => {
      const v = m.querySelector('[data-v]'); const cap = m.querySelector('[data-cap]'); let last = -1;
      const eye = tl?.eye ?? 6;
      m.querySelector('[data-seek="0"]').onclick = () => { v.currentTime = 0; v.play().catch(() => {}); };
      m.querySelector('[data-seek="eye"]').onclick = () => { v.currentTime = eye; v.play().catch(() => {}); };
      m.querySelector('[data-replay]').onclick = () => { v.currentTime = 0; v.play().catch(() => {}); };
      v.addEventListener('timeupdate', () => {
        const st = tl?.stages || []; let i = -1; for (let n = 0; n < st.length; n++) if (st[n].t <= v.currentTime) i = n;
        if (v.currentTime >= eye && tl?.eyeText) i = st.length;
        if (i === last) return; last = i;
        const text = i === st.length ? pick(tl.eyeText) : i >= 0 ? pick(st[i].text) : '';
        cap.textContent = text; cap.classList.toggle('on', !!text); if (text) ui.say(text, 'narrator');
      });
    } });
  }
  // the first family arrives on the sky-ferry, once, without taking the camera away
  function moveIn(s) {
    G.movedIn = true; if (app.reduce) return;
    const home = s.homes[0].k; life.family.home = home; for (const m of life.family.members) m.visible = true;
    ui.caption(G.S.moveIn, 6000);
    app.moveIn = 0; const t0 = performance.now(); const step = () => { if (app.moveIn == null) return; app.moveIn = Math.min(1, (performance.now() - t0) / 8000); if (app.moveIn < 1) requestAnimationFrame(step); else app.moveIn = null; }; step();
  }
  // the living town: a slow day, residents' bubbles, a new day each evening (senior: households pay credits)
  function tick() {
    if (!sb.running || sb.paused || G.busy || sb.intro) return;
    app.hour += (16 / DAY_SECONDS) * 0.2;
    if (app.hour >= 22) newDay();
    stage.setTime(app.hour, 0);
    const ck = ui.P.build.querySelector('[data-clock]'); if (ck) ck.textContent = `🕖 ${clockText()} · ${G.S.day} ${G.day}`;
    const now = performance.now();
    if (sb.bubbles.length && now > sb.nextBub && rig.mode === 'sky' && !sb.lens) {
      const b = sb.bubbles[Math.floor(Math.random() * sb.bubbles.length)]; const who = life.residentNear(b.k);
      if (who) ui.labels.bubble({ at: () => who.position.clone().add(new THREE.Vector3(0, 2.6, 0)), text: b.text, bad: b.bad, quiet: true });
      sb.nextBub = now + 9000;
    }
    if (now > sb.nextTipCheck) { sb.nextTipCheck = now + 5000; if (!tipShown) advise(); }
  }
  function newDay() {
    app.hour = 6; G.day++; const s = sim();
    const line = diaryLines('heart', s, G.j)[G.day % 3]; if (s.homes.length && !G.diary.includes(line)) G.diary = [...G.diary, line].slice(-8);
    if (G.credits !== Infinity) { const pay = Math.round(s.familiesSafe * 1.5 + s.community); G.credits += pay; ui.caption(`${G.S.day} ${G.day}: +${pay} ${G.S.credits} ${G.S.fromHouseholds}`, 3500); }
    else ui.caption(`${G.S.newDay} ${G.day}`, 2200);
    renderBar(); save();
  }
  function bindTaps() {
    const canvas = stage.renderer.domElement;
    rig.onTap = (ndc) => {
      if (!sb.running || G.busy || sb.lens) return;
      const k = world.pick(ndc, stage.camera); if (!k) return;
      if (k === terrain.lab) { audio.tap(); return labBoard(); } // the AI Lab building opens the Lab board
      if (!sb.tool || (!isOpen(sb.cat) && sb.tool !== 'erase')) return;
      if (placeAt(k, sb.tool)) { world.clearGhost(); app._hk = null; audio.pop(); showAllowed(sb.tool); changed(); florenceTo(k, 'peer'); }
    };
    rig.onHover = (ndc) => {
      if (!sb.running || G.busy || sb.lens || sb.tool === 'erase' || !isOpen(sb.cat)) return;
      const k = world.pick(ndc, stage.camera); if (k === app._hk) return; app._hk = k;
      if (!k) { ui.labels.clear('lbl'); return world.clearGhost(); }
      const c = cellOf(G.cells, k); const why = sandboxReason(sb.tool, terrain.tiles.get(k), c); const nc = { ...c, mods: [...c.mods] }; const it = ITEMS[sb.tool];
      if (it.kind === 'mark') nc.mark = sb.tool; else if (it.kind === 'mod') nc.mods.push(sb.tool); else nc.item = sb.tool;
      world.showGhost([{ k }], new Map([[k, nc]]), { reduce: true, bad: why ? new Set([k]) : new Set() });
      ui.labels.set(why ? [{ at: world.tileTop(k).add(new THREE.Vector3(0, 4, 0)), text: why, cls: 'bad' }] : []);
    };
    canvas.addEventListener('pointerleave', () => { world.clearGhost(); app._hk = null; ui.labels.clear('lbl'); });
  }
  // centre the island in the free space beside (or above) the build panel
  function frameView() {
    const cam = stage.camera; const W = innerWidth, H = innerHeight; const b = ui.P.build;
    if (!sb.running || b.classList.contains('hide')) { if (cam.view?.enabled) cam.clearViewOffset(); return; }
    const r = b.getBoundingClientRect();
    if (r.width > W * 0.6) cam.setViewOffset(W, H, 0, Math.round((H - r.top) / 2), W, H); // bottom tray (phones)
    else cam.setViewOffset(W, H, -Math.round(r.right / 2), 0, W, H);                     // left rail
  }
  addEventListener('resize', () => requestAnimationFrame(frameView));
  function startBuilding() {
    sb.running = true; rig.building = true; app.levelId = null; app.inLab = false; app.briefMinutes = null;
    ui.only([]); ui.views('sky'); ui.facil(null); ui.show('card'); ui.show('strip');
    showCells(G.cells); world.setOverlay(null); if (isOpen(sb.cat)) showAllowed(sb.tool);
    changed(); renderLenses(); setMusic('calm'); app.bot?.show(true); requestAnimationFrame(frameView);
    if (sb.afterLab) { const msg = sb.afterLab; sb.afterLab = null; setTimeout(() => ui.caption(msg, 5000), 2800); } // after any unlock alert
  }
  function stopBuilding() { sb.running = false; ui.florence(null); frameView(); rig.building = false; clearTimeout(sb.tipT); world.clearGhost(); world.setOverlay(null); ui.labels.clear(); ui.tray(''); ui.buildPanel(''); hideTip(); }
  const setMusic = (m) => app.setMusic?.(m);

  // ================= THE AI LAB =================
  // the board: six missions, locked / ready / done, plus the whole-day and the report
  async function labBoard() {
    if (G.busy) return;
    const rows = LEVEL_ORDER.map((id, i) => {
      const done = G.labs[id]; const ready = labReady(id, G.ever, G.labs, G.classMode); const tier = TIERS.find((t) => t.id === id);
      const why = !isOpen(id) ? `🔒 ${G.S.unlocksWhen} ${pick(tier.need)}` : !ready ? `🔒 ${G.S.classFirst}` : done ? `${'★'.repeat(done.stars)}${'☆'.repeat(3 - done.stars)} · ${G.S.playAgain}` : G.S.ready;
      return `<button class="labrow ${done ? 'done' : ''} ${ready ? '' : 'locked'}" data-act="${ready ? 'lab:' + id : 'none'}" ${ready ? '' : 'aria-disabled="true"'}><span class="ic"><img src="${thumb(TRACK_PICS[i])}" alt=""></span><span class="t"><b>${i + 1}. ${esc(T(id).title)}</b><small>${esc(pick(T(id).goal))}</small></span><span class="st">${esc(why)}</span></button>`;
    }).join('');
    G.busy = true; // the town waits while the board is open
    const a = await ui.modal(`<div class="ribbon">🧪 ${esc(G.S.labTitle)}</div><p>${esc(pick(G.S.labIntro))}</p><div class="labs">${rows}</div>
      <div class="row" style="justify-content:center;margin-top:10px"><button class="btn alt" data-act="day">🌇 ${esc(G.S.watchDay)}</button><button class="btn alt" data-act="report">📜 ${esc(G.C.ui.report)}</button><button class="btn go" data-act="close">${esc(G.S.backToBuilding)}</button></div>`);
    G.busy = false;
    if (a === 'none') return labBoard();
    if (a.startsWith('lab:')) return openLab(a.slice(4));
    if (a === 'day') return wholeDay();
    if (a === 'report') return showReport();
  }
  async function openLab(id) {
    if (G.busy || !id) return; if (sb.lens) { sb.lens = null; await checks.leave(); renderLenses(); }
    G.busy = true; stopBuilding();
    try { await walkIntoLab(); await runLab(id); } finally { G.busy = false; startBuilding(); app.bot?.appear(world.tileTop(terrain.lab).add(new THREE.Vector3(-2, 0, 7))); }
  }

  // Florence walks to the AI Lab door and goes in; the camera follows, then the practice island fades in
  async function walkIntoLab() {
    const bot = app.bot; if (!bot || !terrain.lab) return;
    const door = world.tileTop(terrain.lab).add(new THREE.Vector3(0, 0, 4.5)); const inside = world.tileTop(terrain.lab).add(new THREE.Vector3(0, 0, 0.5));
    bot.show(true);
    if (!app.reduce) await rig.focus(door, { dist: 34, pitch: 0.55, yaw: rig.sky.yaw }, 0.9);
    await bot.walkTo(door, { maxDur: app.reduce ? 0.3 : 2.2 }); bot.look(inside); if (!app.reduce) await bot.wave();
    await bot.walkTo(inside, { maxDur: 0.6 }); bot.show(false);
    await rig.fade?.(() => {});
  }
  // one mission, on Florence's practice island
  async function runLab(id) {
    const real = G.cells; const lv = LEVELS[id]; const L = T(id);
    app.levelId = id; app.inLab = true; document.documentElement.dataset.lab = 'on'; guess = null;
    run = { id, marks: [false, false, false], bonus: false }; G.paths[id] = null; G.instructions[id] = []; G.mistakes = G.mistakes.filter((m) => m.level !== id);
    G.cells = seedTo(terrain, id); showCells(G.cells);
    ui.setBadge(`🧪 AI LAB · ${lv.n}/6`); ui.setTask(lv.n, pick(L.goal)); ui.helper(null); ui.facil(null); ui.views(null, []);
    stage.setTime(12); app.hour = 12.5; await rig.overview(1.4);
    // brief, with what this mission adds (a new lens or test). "Not now" goes straight back to building.
    const N = L.newThing; const lens = G.C.checks[N.lens]; const newLabel = N.label ? pick(N.label) : lens.label;
    facil(id, 'brief');
    const go = await ui.modal(`<div class="ribbon">🧪 ${esc(G.S.labTitle)} · ${esc(N.test ? G.C.ui.newTest : G.C.ui.newLens)}</div><div class="big">${lens.icon}</div><h2>${esc(newLabel)}</h2><p>${esc(pick(N))}</p><div class="levelbar"><b>${esc(G.S.mission)} ${lv.n} OF 6</b><span>${esc(L.title)}</span><span class="dots">${[1, 2, 3, 4, 5, 6].map((i) => `<i class="${G.labs[LEVEL_ORDER[i - 1]] || i === lv.n ? 'on' : ''}"></i>`).join('')}</span></div><p class="brief">${esc(pick(L.brief))}</p><p class="practice">${esc(pick(G.S.practice))}</p><div class="row" style="justify-content:center"><button class="btn alt" data-act="later">${esc(G.S.notNow)}</button><button class="btn go" data-act="go">${esc(G.C.ui.start)} ➜</button></div>`, { say: `${newLabel}. ${pick(N)} ${pick(L.brief)}` });
    if (go === 'later') return leaveLab(real);
    stage.setTime(12.5);
    // plan
    let res = await round(id, G.C.ui.tell); G.instructions[id] = [res.text];
    // check
    facil(id, 'check');
    const briefMin = (r) => { app.briefMinutes = id === 'heart' ? r.read.numbers?.minutes || null : null; };
    briefMin(res);
    const chk = await checkAct(id, res);
    const checkName = (c) => G.C.checks[c]?.label || c;
    if (chk.missed) {
      G.paths[id] = 'missed';
      G.outcomes[id] = { kind: 'missed', detail: G.j ? `Florence’s plan left out: ${chk.missed.join('; ')}. You told her what was missing.` : `The plan did not cover: ${chk.missed.join('; ')}. Added in a revised instruction.` };
      res = await retry(id, res, G.S.tellMissing, briefMin);
      star(1, G.C.stars.missed[1]); star(2, G.C.stars.missed[2]);
    } else if (!chk.flawed) {
      G.paths[id] = 'clean'; const guessed = await hiddenAct(id);
      G.outcomes[id] = { kind: 'clean', detail: `${G.j ? 'Florence’s first plan passed the' : 'First plan passed the'} ${chk.tried.map(checkName).join(', ')} check${chk.tried.length > 1 ? 's' : ''}. ${G.j ? '' : 'Unstated assumption: '}${guessed}` };
    } else {
      G.paths[id] = 'flawed';
      // fix: name the habit, then a clearer instruction, re-tested automatically until it passes
      ui.facil(`${res.plan.habitWhy ? `This plan: ${res.plan.habitWhy} ` : ''}${L.facil?.habit || ''}`); await habitAct(id, res); ui.facil(L.debrief);
      const m = G.mistakes.filter((x) => x.level === id).pop();
      const found = fmt(L.flaw[chk.which], chk.rv);
      G.outcomes[id] = { kind: ['one_word', 'literal'].includes(m?.habit) ? 'flawed' : 'missed', habit: m?.habit,
        detail: `${G.C.habits[m?.habit]?.label || ''}: ${m?.why || ''} ${chk.late ? (G.j ? 'Shown by' : 'Shown before building by') : (G.j ? 'You caught it with' : 'Caught by you with')} the ${checkName(chk.which)}: ${found}.` };
      res = await retry(id, res, G.C.ui.tryClearer, briefMin);
      star(2, G.C.stars.flawed[2]);
      ui.facil(null);
    }
    // the fixed plan is built on the practice island, system by system, layer by layer
    ui.views('sky', []); world.clearGhost(); ui.legend(null); ui.helper(null); ui.tray('');
    G.cells = res.after; const changedKeys = new Set(res.plan.placements.map((p) => p.k));
    await film.play(id, changedKeys, G.cells, { band: G.band });
    life.setTown(sim(), G.cells, stage.q); app.refreshLights(); await rig.overview(1.0);
    if (id === 'heart') await biasCheck();
    // senior: a town meeting with an honest trade-off (it changes the player's real town numbers)
    if (!G.j && DILEMMAS[id]) {
      const d = DILEMMAS[id]; const a = await ui.modal(`<div class="ribbon">Town meeting</div><h2>${esc(d.text)}</h2><div class="row" style="justify-content:center">${d.options.map((o, i) => `<button class="btn ${i ? 'alt' : 'go'}" data-act="${i}">${esc(o.label)}</button>`).join('')}</div>`);
      const e = d.options[+a].effect; G.extra.families += e.families || 0; G.extra.carbon += e.carbon || 0; G.diary.push(`Town meeting: ${d.options[+a].label}.`);
    }
    // the reward card, then: use Florence's plan in your town, or keep your town as it is
    const s2 = sim(); audio.reward(); world.confetti(new THREE.Vector3(10, 20, 8), 200); rig.startTurntable(app.reduce ? 0 : 0.1);
    const stars = run.marks.filter(Boolean).length; const rules = G.C.stars[G.paths[id] || 'flawed'];
    const [statLabel, statVal] = lv.stat(s2, G.j); const oc = outcomeFor(id, s2);
    const heading = pick(L.complete); const newLens = G.C.checks[LAB_LENS[id]];
    const choice = await ui.modal(`<div class="ribbon green">🧪 ${esc(G.S.missionDone)} · ${esc(L.title)}</div><div class="stars3">${[0, 1, 2].map((i) => `<span class="${i < stars ? 'on' : ''}">★</span>`).join('')}</div><h2>${esc(heading)}</h2>
      <ul class="starlist">${rules.map((r, i) => `<li class="${run.marks[i] ? 'got' : ''}">${run.marks[i] ? '★' : '☆'} ${esc(r)}</li>`).join('')}${run.bonus ? `<li class="got">★ Bonus: found Florence’s biased survey</li>` : ''}</ul>
      <div class="outcome ${oc.kind}"><small>${esc(G.C.ui.outcomeHead)}</small><b>${esc(G.C.ui.outcome[oc.kind])}</b><p>${esc(oc.detail)}</p></div>
      <div class="stats"><div><small>${esc(statLabel)}</small>${esc(statVal)}</div><div><small>${esc(G.S.newTool)}</small>${newLens.icon} ${esc(newLens.label)}</div><div><small>${G.j ? 'Fact' : 'Evidence'}</small>${esc(pick(L.fact))}</div></div>
      <p class="usenote">${esc(pick(G.S.useQuestion))}</p>
      <div class="row" style="justify-content:center"><button class="btn alt" data-act="keep">${esc(G.S.keepMine)}</button><button class="btn go" data-act="use">✓ ${esc(G.S.usePlan)}</button></div>`, { say: `${heading} ${stars} stars.` });
    rig.startTurntable(0);
    // keep the best run's stars
    G.levelStars[id] = Math.max(G.levelStars[id] || 0, stars); if (run.bonus) G.bonus[id] = 1;
    G.labs[id] = { stars: G.levelStars[id] }; G.diary.push(diaryLines(id, s2, G.j)[0]);
    const placements = res.plan.placements; run = null;
    await leaveLab(real, choice === 'use' ? placements : null);
    if (id === 'heart') await charterAct();
  }
  // retry until the plan has no problem left on any check and meets the mission's needs
  async function retry(id, res, heading, briefMin) {
    const lv = LEVELS[id];
    for (;;) {
      world.clearGhost(); res = await round(id, heading); G.instructions[id].push(res.text); briefMin(res);
      const again = await checkAct(id, res, { auto: true });
      if (!again.flawed) {
        const sA = sim(res.after); const cx = ctxFor(res.after);
        if (lv.pass(sA, cx)) {
          audio.good(); app.bot.cheer(); world.confetti(app.bot.group.position.clone(), 90); ui.alert(G.C.ui.checked, true, 1800);
          help({ tag: G.C.ui.checked, tagCls: 'ok', html: `<ul>${res.plan.reading.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>`, sure: res.sure, sureLabel: G.C.ui.sure });
          await sleep(1400); return res;
        }
        const missed = lv.needs(sA, cx, G.j).filter((n) => !n.ok).map((n) => n.label.replace(/^\P{L}+/u, ''));
        help({ tag: 'STILL MISSING', tagCls: 'bad', html: `<p>${esc(G.C.ui.outcome.missed)}: ${esc(missed.join('; '))}</p>`, say: `${G.C.ui.outcome.missed}: ${missed.join('; ')}`, voice: 'helper' });
        heading = G.S.tellMissing; continue;
      }
      help({ tag: 'STILL WRONG', tagCls: 'bad', html: `<p>${esc(G.j ? 'Still a problem. Add what must be protected or tested.' : 'Still failing the test. Add a limit or a test condition.')}</p>`, say: G.j ? 'Still a problem. Add what must be protected or tested.' : '', voice: 'helper' });
    }
  }
  // back to the player's own town. Using the plan adds what fits (never over what the player built).
  async function leaveLab(real, placements = null) {
    world.clearGhost(); ui.legend(null); ui.helper(null); ui.tray(''); ui.facil(null); await checks.leave();
    G.cells = real; app.inLab = false; app.levelId = null; app.briefMinutes = null; delete document.documentElement.dataset.lab; run = null;
    stage.setTime(app.hour = 12.5, 0);
    if (placements) {
      const keys = new Set(); let skipped = 0;
      for (const p of placements) {
        const tool = p.item || p.mod || p.mark; if (!tool || !ITEMS[tool]) continue;
        const t = terrain.tiles.get(p.k); const c = cellOf(G.cells, p.k);
        if (ITEMS[tool].kind === 'build' && c.item) { skipped++; continue; }
        if (sandboxReason(tool, t, c, { free: true })) { skipped++; continue; }
        if (placeAt(p.k, tool, { free: true })) keys.add(p.k); else skipped++;
      }
      showCells(G.cells, keys);
      sb.afterLab = keys.size ? G.S.planUsed(keys.size, skipped) : G.S.planDidntFit;
    } else showCells(G.cells);
    await rig.overview(1.0); save();
  }

  // ---------------- the town heart mission's extras: the residents' summary check (sampling bias), then the charter on the player's own town
  // 13–17: Florence really learns a residents'-feedback classifier from examples, in the browser.
  async function teachFlorence(shareWalk) {
    const truthShare = Math.max(0.1, Math.min(0.9, 1 - shareWalk / 100));
    const comments = [...Teach.DRIVER.slice(0, Math.round(30 * truthShare)), ...Teach.WALKER.slice(0, 30 - Math.round(30 * truthShare))];
    let examples = Teach.DRIVER.slice(0, 8).map((t) => ({ text: t, y: 1, src: 'car-park box' }));
    for (;;) {
      help({ tag: 'LEARNING', html: '<p>Training on the examples…</p>', thinking: true }); await sleep(250);
      const clf = Teach.train(examples); const sm = Teach.summarise(clf, comments);
      const real = Math.round(100 * truthShare), saw = Math.round(100 * sm.share);
      const fair = Math.abs(saw - real) <= 20 && examples.some((e) => !e.y) && examples.some((e) => e.y);
      help({ tag: fair ? 'TESTED' : 'SUMMARY', tagCls: fair ? 'ok' : '', html: `<p>“${esc(sm.text)}.”</p><p class="why">I read all ${comments.length} residents' comments with a model I trained on <b>${examples.length}</b> examples (${examples.filter((e) => e.y).length} 🚗 · ${examples.filter((e) => !e.y).length} 🚶). I think <b>${saw}%</b> want parking.</p>`, sure: sm.sure, sureLabel: G.C.ui.sure });
      if (fair) { audio.good(); ui.alert(`Balanced data: ${saw}% vs ${real}% really`, true, 2600); await sleep(2600); bonusStar('Found Florence’s biased training data'); return; }
      const a = await new Promise((resolve) => ui.tray(`<h3>Florence learned from ${examples.length} examples. Look at them: is the training data fair?</h3>
        <div class="tiles" style="max-height:6.5em;overflow:auto">${examples.map((e) => `<span class="tile" title="${esc(e.src)}">${e.y ? '🚗' : '🚶'} ${esc(e.text)}</span>`).join('')}</div>
        <div class="row"><button class="choice" data-act="gate">📍 Add 12 comments from the school gate</button><button class="choice" data-act="own">✍ Write your own example</button></div>`, (tr) => tr.querySelectorAll('[data-act]').forEach((b) => (b.onclick = () => resolve(b.dataset.act)))));
      if (a === 'gate') { const have = new Set(examples.map((e) => e.text)); examples = examples.concat(Teach.WALKER.filter((t) => !have.has(t)).slice(0, 10).map((t) => ({ text: t, y: 0, src: 'school gate' })), Teach.DRIVER.slice(8, 10).map((t) => ({ text: t, y: 1, src: 'school gate' }))); }
      else {
        const own = await new Promise((resolve) => ui.tray(`<h3>Write a resident's comment and label it</h3><div class="textin"><div class="field"><input data-in maxlength="100" placeholder="e.g. I want a safe way to cycle to the market"></div></div><div class="row" style="margin-top:6px"><button class="btn alt" data-y="1">🚗 wants parking</button><button class="btn alt" data-y="0">🚶 wants paths</button></div>`, (tr) => { const i = tr.querySelector('[data-in]'); i.focus(); tr.querySelectorAll('[data-y]').forEach((b) => (b.onclick = () => i.value.trim() && resolve({ text: i.value.trim().slice(0, 100), y: +b.dataset.y, src: 'you' }))); }));
        examples = examples.concat([own]);
      }
      audio.tap();
    }
  }
  async function biasCheck() {
    const s = sim(); const cycle = [...G.cells.values()].filter((c) => ['cycle', 'path', 'tram'].includes(c.item)).length; const cars = s.cars;
    const shareWalk = Math.max(55, Math.round(100 * (cycle + 1) / (cycle + cars + 1.5)));
    const gate = { walkers: Math.round(10 * shareWalk / 100), drivers: 10 - Math.round(10 * shareWalk / 100) };
    if (!G.j && getModel()) { await teachFlorence(shareWalk); G.mistakes.push({ level: 'heart', habit: 'missing', why: 'Florence’s summary model was trained only on comments from the car-park box (drivers).', bias: true }); await sleep(800); }
    else {
      // 8–12 (or no model): Florence says who she asked; the children ask the people at the school gate themselves
      help({ tag: 'SUMMARY', html: `<p>“Residents want more car parks.”</p><p>I asked <b>10 people at the car park</b>. 9 of them drive, so I’m very sure!</p>`, sure: 90, sureLabel: G.C.ui.sure, say: 'Residents want more car parks. I asked 10 people at the car park. 9 of them drive, so I’m very sure!', voice: 'helper' });
      const modes = shuffle([...Array(gate.walkers).fill('walk'), ...Array(gate.drivers).fill('drive')]);
      await new Promise((resolve) => ui.tray(`<h3>Florence only asked people at the car park. Ask people at the school gate how they travel!</h3><div class="row askrow">${modes.map((_, i) => `<button class="tile ask" data-r="${i}" aria-label="Ask person ${i + 1}">🧍<small>Ask</small></button>`).join('')}</div><div class="row"><span class="askcount" data-n>0 of 10 asked</span><button class="btn go" data-act="all" disabled>Tell Florence to count everyone</button></div>`, (tr) => {
        let n = 0;
        tr.querySelectorAll('[data-r]').forEach((b) => (b.onclick = () => { const md = modes[+b.dataset.r]; b.innerHTML = md === 'walk' ? '🚶<small>walks</small>' : '🚗<small>drives</small>'; b.classList.add(md); b.disabled = true; audio.tap(); n++; tr.querySelector('[data-n]').textContent = `${n} of 10 asked`; if (n >= 6) tr.querySelector('[data-act]').disabled = false; }));
        tr.querySelector('[data-act]').onclick = resolve;
      }));
      audio.good();
      help({ tag: 'COUNTED', tagCls: 'ok', html: `<p>“Most residents want <b>safe paths and cycle lanes</b>.”</p><p>At the school gate, <b>${gate.walkers} of 10 walk or cycle</b>. I was 90% sure before because I only asked drivers. Asking different people changed my answer!</p>`, sure: Math.round(100 * gate.walkers / 10), sureLabel: G.C.ui.sure, say: `Most residents want safe paths and cycle lanes. At the school gate, ${gate.walkers} of 10 walk or cycle. I was 90 percent sure before because I only asked drivers. Asking different people changed my answer!`, voice: 'helper' });
      bonusStar(G.j ? 'You found who Florence forgot to ask!' : 'Found Florence’s biased sample');
      G.mistakes.push({ level: 'heart', habit: 'missing', why: 'Florence only asked drivers at the car park, so her summary left out everyone who walks.', bias: true });
      await sleep(1200); await continueBtn();
    }
  }
  async function charterAct() {
    // the charter: three promises, checked against the simulation
    const PROMISES = [
      [`Every home within ${TARGETS.walkMinutes} minutes’ walk of school`, (x) => x.walkMax <= TARGETS.walkMinutes], [`Town carbon under the ${TARGETS.carbonCeiling} t limit`, (x) => x.carbonOK], ['Lights on through a still winter night', (x) => x.power.winterOK],
      ['Keep the bees and the deer', (x) => x.species.bees && x.species.deer], ['No home floods', (x) => x.flooded === 0], ['Enough food for everyone', (x) => x.food >= x.foodNeed],
    ];
    const chosen = await new Promise((resolve) => { const sel = new Set(); ui.tray(`<h3>Write your town charter: choose 3 promises <span class="count" data-count>0 of 3 chosen</span></h3><div class="row">${PROMISES.map(([p], i) => `<button class="choice" data-p="${i}">📜 ${esc(p)}</button>`).join('')}</div><div class="row" style="justify-content:flex-end;margin-top:8px"><button class="btn go" data-ok disabled>Sign the charter ✍</button></div>`, (tr) => {
      tr.querySelectorAll('[data-p]').forEach((b) => (b.onclick = () => {
        const i = +b.dataset.p;
        if (sel.has(i)) sel.delete(i); else if (sel.size < 3) sel.add(i); else { b.classList.remove('shake'); void b.offsetWidth; b.classList.add('shake'); ui.caption('You can choose 3 promises. Tap one you chose to swap it.', 2600); return; }
        b.classList.toggle('pick', sel.has(i)); tr.querySelector('[data-count]').textContent = `${sel.size} of 3 chosen`; tr.querySelector('[data-ok]').disabled = sel.size !== 3;
      }));
      tr.querySelector('[data-ok]').onclick = () => { ui.tray(''); resolve([...sel]); };
    }); });
    const s3 = sim(); G.charter = chosen.map((i) => ({ text: PROMISES[i][0], kept: PROMISES[i][1](s3) }));
    await ui.modal(`<div class="ribbon green">${esc(G.townName)} charter</div>${G.charter.map((c) => `<p style="text-align:left;color:var(--ink)">${c.kept ? '✅ Kept:' : '⚠️ Not yet:'} ${esc(c.text)}</p>`).join('')}<button class="btn go" data-act="ok">${esc(G.C.ui.continue)}</button>`, { say: G.charter.map((c) => `${c.kept ? 'Kept' : 'Not yet'}: ${c.text}.`).join(' ') });
  }

  // one plain sentence per mission for the reward card and the report: what happened to the brief, and who caught it
  function outcomeFor(id, s2) {
    const oc = { ...(G.outcomes[id] || { kind: 'clean', detail: '' }) };
    const b = app.briefMinutes, W = TARGETS.walkMinutes;
    if (id === 'heart' && b && s2.walkMax > b) oc.detail += ` ${G.j ? 'You' : 'The brief'} asked for a ${b}-minute walk; the longest route is ${s2.walkMax} minutes. That meets the town’s ${W}-minute rule, but not ${G.j ? 'your' : 'the'} brief.`;
    G.outcomes[id] = oc; return oc;
  }

  // ================= A WHOLE DAY, THE TOWN COMPLETE, THE REPORT =================
  function poiList(s) { const out = []; if (s.homes[0]) out.push(world.tileTop(s.homes[0].k)); if (s.schoolKey) out.push(world.tileTop(s.schoolKey)); for (const [k, c] of G.cells) if (['market', 'orchard', 'wind', 'park'].includes(c.item)) { out.push(world.tileTop(k)); if (out.length > 5) break; } return out; }
  async function wholeDay(seconds = 30) {
    if (G.busy) return; G.busy = true; stopBuilding();
    try {
      const s = sim(); ui.only([]); ui.setTask(0, `A day in ${G.townName}`); ui.views('sky'); app.bot.show(false);
      const list = s.homes.length ? bubblesFor(s, G.cells, terrain, G.j, 'final') : []; const pois = poiList(s);
      const lines = diaryLines('heart', s, G.j); let shown = -1; let skip = false;
      ui.tray(`<div class="row liverow"><span class="clock" data-clock>7:00</span><span class="diary" data-diary></span><button class="btn alt" data-skip>Skip ⏭</button></div>`, (tr) => { tr.querySelector('[data-skip]').onclick = () => (skip = true); });
      ui.caption(`A day in ${G.townName}`, 3000);
      const t0 = performance.now(); let bi = 0, pi = 0, nextB = 2, nextP = 0;
      while (!skip) {
        const el = (performance.now() - t0) / 1000; if (el > seconds) break;
        app.hour = 7 + (el / seconds) * 14; stage.setTime(app.hour, 0);
        const ck = ui.P.tray.querySelector('[data-clock]'); if (ck) ck.textContent = clockText();
        const part = app.hour < 11 ? 0 : app.hour < 16 ? 1 : 2;
        if (part !== shown) { shown = part; const dd = ui.P.tray.querySelector('[data-diary]'); if (dd) { dd.textContent = `📔 ${['Morning', 'Afternoon', 'Evening'][part]}: “${lines[part]}”`; dd.classList.remove('flash'); void dd.offsetWidth; dd.classList.add('flash'); } }
        if (el >= nextP && pois.length && !app.reduce && rig.mode === 'sky') { const p = pois[pi++ % pois.length]; rig.focus(p, { dist: 70, pitch: 0.6, yaw: rig.sky.yaw + 0.5 }, 3.2); nextP = el + 6; }
        if (el >= nextB && list.length) { const b = list[bi++ % list.length]; const who = life.residentNear(b.k); if (who) ui.labels.bubble({ at: () => who.position.clone().add(new THREE.Vector3(0, 2.6, 0)), text: b.text, bad: b.bad }); nextB = el + 3.4; }
        await sleep(50);
      }
      ui.labels.clear('bub'); app.hour = 12.5; stage.setTime(12.5, 0); await rig.overview(1.1);
    } finally { G.busy = false; startBuilding(); }
  }
  async function celebrateTown() {
    sb.celebrating = false;
    if (G.busy || G.completeShown || !townComplete(sim(), ctxFor(G.cells))) return; // busy: it comes back on the next change
    G.completeShown = true; G.busy = true; stopBuilding();
    try {
      audio.reward(); world.confetti(new THREE.Vector3(10, 20, 8), 240); rig.startTurntable(app.reduce ? 0 : 0.1);
      const s = sim(); flower(true);
      const a = await ui.modal(`<div class="ribbon green">${esc(G.S.completeRibbon)}</div><div class="big">🌸</div><h2>${esc(G.townName)}: ${esc(s.title)}</h2><p>${esc(pick(G.S.completeText))}</p><div class="row" style="justify-content:center"><button class="btn alt" data-act="keep">${esc(G.S.keepBuilding)}</button><button class="btn alt" data-act="report">📜 ${esc(G.C.ui.report)}</button><button class="btn go" data-act="day">🌇 ${esc(G.S.watchDay)}</button></div>`, { say: `${G.townName}: ${s.title}. ${pick(G.S.completeText)}` });
      rig.startTurntable(0); G.busy = false;
      if (a === 'day') return wholeDay(40);
      if (a === 'report') return showReport();
    } finally { if (G.busy) { G.busy = false; } if (!sb.running && !G.busy) startBuilding(); }
  }
  async function showReport() {
    if (G.busy) return; G.busy = true; stopBuilding(); ui.show('card', false); ui.show('strip', false);
    stage.setTime(18.6); app.refreshLights(); await rig.overview(0.8); await sleep(300);
    renderReport(app, G, sim(), app.snapshot(), { onClose: () => { G.busy = false; startBuilding(); } });
  }

  // ================= THE WHOLE SESSION =================
  G.run = async () => {
    G.ever = unlocked(sim(), G.ever, G.full); G.stars = totalStars();
    ui.setStars(G.stars); ui.setTownName(G.townName); flower(false);
    ui.onLab = () => labBoard(); ui.onLens = (id) => toggleLens(id); ui.onTalk = (secs) => app.bot?.talk(secs);
    try { const r = await fetch('videos/index.json'); if (r.ok) G.videos = new Set((await r.json()).items); } catch { /* no videos on this build */ }
    bindTaps(); startBuilding();
    setInterval(tick, 200);
    // a new town starts with Florence's guided first build
    if (!G.introDone && !G.full) await intro();
    // the first tip comes straight away, so a new player knows where to begin
    sb.adv.last = -Infinity; adviseSoon(1200);
    // class mode: Florence invites the class to the first mission that is ready
    if (G.classMode) { const id = LEVEL_ORDER.find((l) => !G.labs[l]); if (id && labReady(id, G.ever, G.labs, true)) setTimeout(() => showTip({ id: 'class-' + id, text: G.S.classInvite, lab: id }), 1500); }
  };
  async function intro() {
    if (sb.intro) return; sb.intro = true; hideTip();
    try {
      await runIntro({ app, G, T: G.S.intro,
        selectTool: (cat, tool) => { sb.cat = cat; sb.tool = tool; sb.folded = false; showAllowed(tool); renderBar(); },
        townTiles: () => sim().townTiles,
        videoCard: G.videos?.has('timber') ? (id) => videoCard(ITEMS[id].label, id, null) : null,
        highlight: (sel, on) => document.querySelector(sel)?.classList.toggle('pulse', on) });
    } finally { sb.intro = false; G.introDone = true; save(); sb.adv.last = performance.now(); }
  }
  G.replayIntro = () => { if (!G.busy && sb.running) intro(); };
  G.openLab = openLab; G.labBoard = labBoard; G.playVideo = playVideo; G.videoCard = videoCard; G.florenceTo = florenceTo; G.placeAt = (k, tool) => { const ok = placeAt(k, tool); if (ok) changed(); return ok; }; G.sim = sim; G.advisor = sb.adv;
  G.saved = () => { try { const d = JSON.parse(localStorage.getItem(SAVE) || 'null'); return d && d.band === G.band ? d : null; } catch { return null; } };
  return G;
}
