// The session: six levels, each in seven acts (Brief, Plan, Check, Fix, Move in, Live, Celebrate),
// then the charter, the residents' summary check, a full day and the town report.
// Stars: three per level. Flawed first plan: found it with the first check · named the habit first time ·
// fixed plan passes. Clean first plan: clear first time · spotted the hidden guess · plan passes its check.
import * as THREE from 'three';
import { ITEMS, TARGETS, placeReason } from '../world/catalog.js';
import { simulate, cellOf, emptyCell, natureBaseline } from '../sim/sim.js';
import { ask, read as readInstr } from '../ai/plotter.js';
import { LEVELS, LEVEL_ORDER, checksFor } from './levels.js';
import { CONTENT, LEVEL_TEXT, DILEMMAS, HABITS, diaryLines } from './content.js';
import { createChecks } from './checks.js';
import { bubblesFor } from './bubbles.js';
import { esc } from '../ui/ui.js';
import { renderReport } from './report.js';
import { createFilm } from './film.js';
import * as Teach from '../ai/teach.js';
import { getModel } from '../ai/plotter.js';
import { accessCheck } from '../sim/access.js';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const SAVE = 'ecotown.save.v2';
const shuffle = (a) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const STOP = new Set(['a', 'an', 'the', 'and', 'or', 'of', 'to', 'for', 'in', 'on', 'at', 'by', 'with', 'is', 'it', 'be', 'that', 'this', 'our', 'we', 'us', 'please', 'all', 'some', 'old', 'new', 'make', 'put', 'build', 'find', 'grow']);

export function createGame(app) {
  const { world, ui, rig, stage, terrain, life, audio } = app;
  const G = app.G = {
    band: app.band, C: CONTENT[app.band], j: app.band === 'junior', cells: new Map(), stars: 0, levelStars: {}, starMarks: {}, bonus: {}, mistakes: [], diary: [], instructions: {}, charter: [],
    outcomes: {}, budget: app.band === 'senior' ? 150 : Infinity, spent: 0, li: 0, extra: { families: 0, carbon: 0 }, townName: app.townName || 'Eco Town', inputMode: null, draft: {}, reflection: '',
  };
  app.C = G.C; app.hour = 12.5;
  const checks = createChecks(app);
  const film = app.film = createFilm(app);
  const T = (id) => LEVEL_TEXT[id];
  const pick = (o) => (typeof o === 'string' ? o : G.j ? o.j : o.s);
  const sim = (cells = G.cells) => simulate(terrain, cells, { natureStart: app.natureStart, addFamilies: G.extra.families, addCarbon: G.extra.carbon });
  app.natureStart = natureBaseline(terrain);
  const help = (o) => ui.helper({ name: G.C.helperName, ...o });
  const facil = (id, step) => ui.facil(T(id)?.facil?.[step] || null);

  app.refreshLights = () => { const s = sim(); world.setLights(!s.homes.length ? [] : (s.power.winterOK || !G.levelStars.power ? s.homes.map((x) => x.k) : s.homes.slice(0, Math.floor(s.homes.length * 0.4)).map((x) => x.k))); };
  function showCells(cells = G.cells, animateKeys = null) {
    let i = 0;
    for (const t of terrain.tiles.values()) { const c = cells.get(t.k); const anim = animateKeys?.has(t.k); world.setCell(t.k, c || emptyCell(), { animate: anim, delay: anim ? (i++) * 0.06 : 0, reduce: app.reduce }); if (anim) setTimeout(() => audio.pop(i), i * 60); }
    life.setTown(sim(cells), cells, stage.q); app.refreshLights();
  }
  // one of the level's three stars (i = 0, 1, 2); each can be earned once
  function star(i, why = '') {
    const id = app.levelId; const m = (G.starMarks[id] ||= [false, false, false]); if (m[i]) return;
    m[i] = true; G.stars++; G.levelStars[id] = (G.levelStars[id] || 0) + 1; ui.setStars(G.stars); if (why) ui.caption(`★ ${why}`, 2600);
  }
  function bonusStar(why) { const id = app.levelId; G.bonus[id] = (G.bonus[id] || 0) + 1; G.stars++; ui.setStars(G.stars); ui.caption(`★ ${why}`, 2800); }
  function flower(flash = true) { const s = sim(); ui.carbonInfo = { used: s.carbon, limit: TARGETS.carbonCeiling }; ui.flower(s.petals, G.townName, { flash }); }
  function save() { try { localStorage.setItem(SAVE, JSON.stringify({ band: G.band, li: G.li + 1, stars: G.stars, levelStars: G.levelStars, starMarks: G.starMarks, bonus: G.bonus, mistakes: G.mistakes, diary: G.diary, instructions: G.instructions, cells: [...G.cells], extra: G.extra, spent: G.spent, session: app.session, townName: G.townName, inputMode: G.inputMode, paths: G.paths, outcomes: G.outcomes })); } catch { /* storage off */ } }
  G.load = (data) => { Object.assign(G, { li: data.li, stars: data.stars, levelStars: data.levelStars || {}, starMarks: data.starMarks || {}, bonus: data.bonus || {}, mistakes: data.mistakes || [], diary: data.diary || [], extra: data.extra || G.extra, spent: data.spent || 0, instructions: data.instructions || {}, townName: data.townName || G.townName, inputMode: data.inputMode || null, paths: data.paths || {}, outcomes: data.outcomes || {} }); G.cells = new Map(data.cells); ui.setTownName(G.townName); };
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

  // ---------------- building: accept the plan, then paint and adjust
  const ctxFor = (cells) => ({ moveTiles: [...cells.values()].filter((c) => c.item && ITEMS[c.item].level === 'move').length, hasSchool: [...cells.values()].some((c) => c.item === 'school'), access: app.levelId === 'move' ? accessCheck(terrain, cells) : null });
  // tint every tile the selected tool may go on, so players can see where things are allowed
  function showAllowed(id, tool) {
    const spec = new Map();
    for (const t of terrain.tiles.values()) {
      const c = cellOf(G.cells, t.k); let ok;
      if (tool === 'erase') ok = (c.item && ITEMS[c.item].level === id && !c.locked) || (id === 'land' && c.mark && !c.locked);
      else ok = !placeReason(tool, t, c) && !(ITEMS[tool].kind === 'build' && c.item === tool);
      if (ok) spec.set(t.k, { color: tool === 'erase' ? '#ff9a8a' : '#fff3a8', pattern: 'dots', opacity: 0.55 });
    }
    world.setOverlay(spec);
  }
  async function buildAct(id, res) {
    const lv = LEVELS[id];
    world.clearGhost(); ui.legend(null); G.cells = res.after; G.spent += planCost(res.plan.placements);
    const changed = new Set(res.plan.placements.map((p) => p.k));
    // the plan becomes real in a short film (construction, installation, farming…)
    await film.play(id, changed, G.cells, { band: G.band });
    life.setTown(sim(), G.cells, stage.q); app.refreshLights(); flower(true); await rig.overview(1.0);
    let tool = lv.palette[0]; let collapsed = false;
    rig.building = true; facil(id, 'build');
    const canvas = stage.renderer.domElement; const leave = () => { world.clearGhost(); app._hk = null; ui.labels.clear('lbl'); };
    canvas.addEventListener('pointerleave', leave);
    return new Promise((resolve) => {
      const render = () => {
        const s = sim(); const needs = lv.needs(s, ctxFor(G.cells), G.j); const ok = lv.pass(s, ctxFor(G.cells));
        const bud = G.budget !== Infinity ? `<span class="${G.spent <= G.budget ? 'ok' : ''}">Budget ${G.spent}/${G.budget} credits</span>` : '';
        ui.tray(`<div class="buildhead"><h3>${esc(G.j ? 'Paint and place: pick a tool, then tap a lit-up tile' : 'Adjust the plan: pick a tool, then tap a highlighted tile')}</h3><button class="btn alt small" data-fold aria-expanded="${!collapsed}">${collapsed ? '▴ Tools' : '▾ Hide tools'}</button></div>
          <div class="palette ${collapsed ? 'folded' : ''}">${lv.palette.map((idd) => { const it = ITEMS[idd]; return `<button class="pal ${tool === idd ? 'on' : ''}" data-t="${idd}"><i style="background:${it.color}">${it.icon}</i><span>${esc(it.label)}${!G.j && it.cost ? `<small>${it.cost} cr${it.families ? ` · ${it.families} hh` : ''}${it.embodied ? ` · ${it.embodied} t` : ''}${it.food ? ` · ${it.food} food` : ''}</small>` : ''}</span></button>`; }).join('')}<button class="pal ${tool === 'erase' ? 'on' : ''}" data-t="erase"><i style="background:#eef2f5">⌫</i><span>Remove</span></button></div>
          <div class="needs"><b class="when">${esc(G.C.ui.afterBuild)}:</b>${needs.map((n) => `<span class="${n.ok ? 'ok' : ''}">${n.ok ? '✓' : '•'} ${esc(n.label)}</span>`).join('')}${bud}</div>
          <div class="row" style="justify-content:flex-end"><button class="btn go" data-done ${ok && G.spent <= G.budget ? '' : 'disabled'}>${esc(G.C.ui.done)} ✓</button></div>`, (tr) => {
          tr.querySelectorAll('[data-t]').forEach((b) => (b.onclick = () => { tool = b.dataset.t; showAllowed(id, tool); render(); }));
          tr.querySelector('[data-fold]').onclick = () => { collapsed = !collapsed; render(); };
          tr.querySelector('[data-done]').onclick = () => { rig.onTap = null; rig.onHover = null; rig.building = false; canvas.removeEventListener('pointerleave', leave); world.clearGhost(); world.setOverlay(null); ui.labels.clear('lbl'); ui.facil(null); resolve(); };
        });
      };
      rig.onTap = (ndc) => {
        const k = world.pick(ndc, stage.camera); if (!k) return; const t = terrain.tiles.get(k); const c = { ...cellOf(G.cells, k), mods: [...cellOf(G.cells, k).mods] };
        if (tool === 'erase') {
          if (c.locked) return ui.caption('Built in an earlier level', 1800);
          const it = c.item && ITEMS[c.item]; if (c.mods.length && !c.locked) { c.mods.pop(); } else if (it && it.level === id) { G.spent -= it.cost || 0; c.item = null; } else if (c.mark && id === 'land') c.mark = null; else return;
        } else {
          const it = ITEMS[tool]; const why = placeReason(tool, t, c); if (why) { audio.bad(); return ui.caption(why, 1800); }
          if (tool === 'town' && c.mark !== 'town' && sim().townTiles >= TARGETS.townTiles) { audio.bad(); return ui.caption(`Town land is full (${TARGETS.townTiles} of ${TARGETS.townTiles}). Remove a tile first.`, 2600); }
          if (G.spent + (it.cost || 0) > G.budget) return ui.caption('Over budget', 1800);
          if (it.unique) for (const [kk, cc] of G.cells) if (cc.item === tool && !cc.locked) { G.cells.set(kk, { ...cc, item: null }); world.setCell(kk, G.cells.get(kk)); }
          if (it.kind === 'mark') c.mark = tool; else if (it.kind === 'mod') c.mods.push(tool); else { if (c.item && ITEMS[c.item].level === id) G.spent -= ITEMS[c.item].cost || 0; c.item = tool; }
          G.spent += it.cost || 0;
        }
        G.cells.set(k, c); world.clearGhost(); app._hk = null; world.setCell(k, c, { build: { dur: 0.7 }, reduce: app.reduce }); audio.pop(); life.setTown(sim(), G.cells, stage.q); app.refreshLights(); flower(true); showAllowed(id, tool); render();
      };
      rig.onHover = (ndc) => { if (tool === 'erase') return; const k = world.pick(ndc, stage.camera); if (k === app._hk) return; app._hk = k; if (!k) { ui.labels.clear('lbl'); return world.clearGhost(); } const c = cellOf(G.cells, k); const why = placeReason(tool, terrain.tiles.get(k), c); const nc = { ...c, mods: [...c.mods] }; const it = ITEMS[tool]; if (it.kind === 'mark') nc.mark = tool; else if (it.kind === 'mod') nc.mods.push(tool); else nc.item = tool; world.showGhost([{ k }], new Map([[k, nc]]), { reduce: true, bad: why ? new Set([k]) : new Set() }); ui.labels.set(why ? [{ at: world.tileTop(k).add(new THREE.Vector3(0, 4, 0)), text: why, cls: 'bad' }] : []); };
      showAllowed(id, tool); render();
    });
  }
  const planCost = (pl) => pl.reduce((a, p) => a + (ITEMS[p.item || p.mod || p.mark]?.cost || 0), 0);

  // ---------------- move in (only when new homes are built), live, celebrate
  async function moveInAct(id) {
    const s = sim(); if (id !== 'homes' || !s.homes.length) return;
    ui.only([]); ui.setTask(LEVELS[id].n, G.C.ui.moveIn);
    const home = s.homes[0].k; life.family.home = home; for (const m of life.family.members) m.visible = true;
    app.moveIn = 0; const dur = app.reduce ? 1.5 : 8;
    rig.followTarget(() => { const p = life.familyPos() || world.tileTop(home); return { pos: p.clone().add(new THREE.Vector3(-14, 11, 16)), look: p }; });
    ui.caption(G.j ? 'Here they come! The family arrives on the sky-ferry.' : 'Move-in: the first family arrives.', dur * 1000);
    const t0 = performance.now(); await new Promise((r) => { const step = () => { app.moveIn = Math.min(1, (performance.now() - t0) / (dur * 1000)); if (app.moveIn < 1) requestAnimationFrame(step); else r(); }; step(); });
    app.moveIn = null; await rig.overview(1.2);
  }
  async function liveAct(id, seconds, { final = false } = {}) {
    const s = sim(); ui.only([]); ui.setTask(LEVELS[id].n, final ? 'A whole day in your town' : pick(T(id).live)); ui.views('sky'); app.bot.show(false);
    const winter = id === 'power' && !final; if (winter) app.winterTest = true;
    const list = s.homes.length ? bubblesFor(s, G.cells, terrain, G.j, final ? 'final' : id) : []; const pois = poiList(s);
    const lines = diaryLines(final ? 'heart' : id, s, G.j); let shown = -1;
    let skip = false; ui.tray(`<div class="row liverow"><span class="clock" data-clock>7:00</span><span class="diary" data-diary></span>${!G.j ? '<button class="btn alt" data-said>What residents said</button>' : ''}<button class="btn alt" data-skip>Skip ⏭</button></div>`, (tr) => { tr.querySelector('[data-skip]').onclick = () => (skip = true); const ws = tr.querySelector('[data-said]'); if (ws) ws.onclick = () => saidList(list); });
    ui.caption(final ? `A day in ${G.townName}` : pick(T(id).live), 3000);
    const t0 = performance.now(); let bi = 0, pi = 0, nextB = 2, nextP = 0;
    while (!skip) {
      const el = (performance.now() - t0) / 1000; if (el > seconds) break;
      app.hour = 7 + (el / seconds) * 14; stage.setTime(app.hour, winter ? 1 : 0);
      const ck = ui.P.tray.querySelector('[data-clock]'); if (ck) { const hh = Math.floor(app.hour), mm = Math.floor((app.hour - hh) * 4) * 15; ck.textContent = `${hh}:${String(mm).padStart(2, '0')}`; }
      const part = app.hour < 11 ? 0 : app.hour < 16 ? 1 : 2;
      if (part !== shown) { shown = part; const dd = ui.P.tray.querySelector('[data-diary]'); if (dd) { dd.textContent = `📔 ${['Morning', 'Afternoon', 'Evening'][part]}: “${lines[part]}”`; dd.classList.remove('flash'); void dd.offsetWidth; dd.classList.add('flash'); } }
      if (el >= nextP && pois.length && !app.reduce && rig.mode === 'sky') { const p = pois[pi++ % pois.length]; rig.focus(p, { dist: 70, pitch: 0.6, yaw: rig.sky.yaw + 0.5 }, 3.2); nextP = el + 6; }
      if (el >= nextB && list.length) {
        const b = list[bi++ % list.length]; const who = life.residentNear(b.k);
        if (who) ui.labels.bubble({ at: () => who.position.clone().add(new THREE.Vector3(0, 2.6, 0)), text: b.text, bad: b.bad });
        nextB = el + 3.4;
      }
      await sleep(50);
    }
    ui.labels.clear('bub'); app.winterTest = false; app.hour = 12.5; stage.setTime(12.5, 0); app.refreshLights(); if (rig.mode !== 'sky') ui.views('sky'); await rig.overview(1.1);
    // senior: residents' petition when the same problem keeps coming up
    const bad = list.filter((b) => b.bad); if (!G.j && bad.length >= 3) { const top = bad[0]; await ui.modal(`<div class="ribbon">${esc(G.C.ui.petition)}</div><div class="big">📜</div><h2>“${esc(top.text)}”</h2><p>${bad.length} residents signed. You can fix it in the next level, or explain your trade-off at the town meeting.</p><button class="btn go" data-act="ok">${esc(G.C.ui.continue)}</button>`); }
  }
  function saidList(list) { ui.modal(`<div class="ribbon">What residents said</div><div style="text-align:left">${list.map((b, i) => `<div class="row" style="align-items:center;margin:4px 0"><span style="flex:1">${b.bad ? '☹' : '☺'} ${esc(b.text)}</span><button class="btn small alt" data-act="pin${i}">📍</button></div>`).join('')}</div><button class="btn go" data-act="close">Close</button>`).then((a) => { if (a.startsWith('pin')) rig.focus(world.tileTop(list[+a.slice(3)].k), { dist: 45 }, 1.2); }); }
  function poiList(s) { const out = []; if (s.homes[0]) out.push(world.tileTop(s.homes[0].k)); if (s.schoolKey) out.push(world.tileTop(s.schoolKey)); for (const [k, c] of G.cells) if (['market', 'orchard', 'wind', 'park'].includes(c.item)) { out.push(world.tileTop(k)); if (out.length > 5) break; } if (!out.length) { const town = [...G.cells].filter(([, c]) => c.mark === 'town').map(([k]) => world.tileTop(k)); if (town.length) out.push(town.reduce((a, b) => a.add(b), new THREE.Vector3()).multiplyScalar(1 / town.length)); } return out; }

  // one plain sentence per level for the level card and the report: what happened to the brief, and who caught it
  function outcomeFor(id, s2) {
    const oc = { ...(G.outcomes[id] || { kind: 'clean', detail: '' }) };
    const b = app.briefMinutes, W = TARGETS.walkMinutes;
    if (id === 'heart' && b && s2.walkMax > b) oc.detail += ` ${G.j ? 'You' : 'The brief'} asked for a ${b}-minute walk; the longest route is ${s2.walkMax} minutes. That meets the town’s ${W}-minute rule, but not ${G.j ? 'your' : 'the'} brief.`;
    G.outcomes[id] = oc; return oc;
  }
  async function celebrateAct(id, levelChanged) {
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
    const s2 = sim(); G.diary.push(diaryLines(id, s2, G.j)[0]); flower(true); audio.reward(); world.confetti(new THREE.Vector3(10, 20, 8), 200);
    const st = G.levelStars[id] || 0; const marks = G.starMarks[id] || [false, false, false]; const rules = G.C.stars[G.paths[id] || 'flawed'];
    const [statLabel, statVal] = LEVELS[id].stat(s2, G.j); const oc = outcomeFor(id, s2);
    const heading = pick(T(id).complete);
    await ui.modal(`<div class="ribbon green">${esc(G.C.ui.reward)} · ${esc(T(id).title)}</div><div class="stars3">${[0, 1, 2].map((i) => `<span class="${i < st ? 'on' : ''}">★</span>`).join('')}</div><h2>${esc(heading)}</h2>
      <ul class="starlist">${rules.map((r, i) => `<li class="${marks[i] ? 'got' : ''}">${marks[i] ? '★' : '☆'} ${esc(r)}</li>`).join('')}${G.bonus[id] ? `<li class="got">★ Bonus: found Florence’s biased survey</li>` : ''}</ul>
      <div class="outcome ${oc.kind}"><small>${esc(G.C.ui.outcomeHead)}</small><b>${esc(G.C.ui.outcome[oc.kind])}</b><p>${esc(oc.detail)}</p></div>
      <div class="stats"><div><small>${esc(statLabel)}</small>${esc(statVal)}</div><div><small>Town</small>${esc(G.townName)}</div><div><small>${G.j ? 'Fact' : 'Evidence'}</small>${esc(pick(T(id).fact))}</div></div>
      <button class="btn go" data-act="next">${esc(G.C.ui.continue)} ➜</button>`, { say: `${heading} ${st} stars.` });
    rig.startTurntable(0); save();
  }

  // ---------------- one level
  async function runLevel(id) {
    app.levelId = id; const lv = LEVELS[id]; const L = T(id); const short = app.session === 45;
    ui.setBadge(`${G.j ? 'SCHOOL CLUB' : 'AI LAB'} · L${lv.n}/6`); ui.setTask(lv.n, pick(L.goal)); ui.helper(null); ui.facil(null); ui.views(null, []); guess = null;
    stage.setTime(12); app.hour = 12.5; await rig.overview(1.4);
    // Act 1: brief, with what this level adds (a new lens or test)
    const N = L.newThing; const lens = G.C.checks[N.lens]; const newLabel = N.label ? pick(N.label) : lens.label;
    facil(id, 'brief');
    await ui.modal(`<div class="ribbon">${esc(N.test ? G.C.ui.newTest : G.C.ui.newLens)}</div><div class="big">${lens.icon}</div><h2>${esc(newLabel)}</h2><p>${esc(pick(N))}</p><div class="levelbar"><b>LEVEL ${lv.n} OF 6</b><span>${esc(L.title)}</span><span class="dots">${[1, 2, 3, 4, 5, 6].map((i) => `<i class="${i <= lv.n ? 'on' : ''}"></i>`).join('')}</span></div><p class="brief">${esc(pick(L.brief))}</p><button class="btn go" data-act="go">${esc(G.C.ui.start)} ➜</button>`, { say: `${newLabel}. ${pick(N)} ${pick(L.brief)}` });
    stage.setTime(12.5);
    // Act 2: plan
    let res = await round(id, G.C.ui.tell); G.instructions[id] = [res.text];
    // Act 3: check
    facil(id, 'check');
    const briefMin = (r) => { app.briefMinutes = id === 'heart' ? r.read.numbers?.minutes || null : null; };
    briefMin(res);
    let chk = await checkAct(id, res);
    const checkName = (c) => G.C.checks[c]?.label || c;
    if (chk.missed) {
      G.paths[id] = 'missed';
      G.outcomes[id] = { kind: 'missed', detail: G.j ? `Florence’s plan left out: ${chk.missed.join('; ')}. You added it while building.` : `The plan did not cover: ${chk.missed.join('; ')}. Completed during the build.` };
    } else if (!chk.flawed) {
      G.paths[id] = 'clean'; const guessed = await hiddenAct(id);
      G.outcomes[id] = { kind: 'clean', detail: `${G.j ? 'Florence’s first plan passed the' : 'First plan passed the'} ${chk.tried.map(checkName).join(', ')} check${chk.tried.length > 1 ? 's' : ''}. ${G.j ? '' : 'Unstated assumption: '}${guessed}` };
    } else {
      G.paths[id] = 'flawed';
      // Act 4: fix (habit, clearer instruction, auto re-test until it passes)
      ui.facil(`${res.plan.habitWhy ? `This plan: ${res.plan.habitWhy} ` : ''}${L.facil?.habit || ''}`); await habitAct(id, res); ui.facil(L.debrief);
      const m = G.mistakes.filter((x) => x.level === id).pop();
      const found = fmt(L.flaw[chk.which], chk.rv);
      G.outcomes[id] = { kind: ['one_word', 'literal'].includes(m?.habit) ? 'flawed' : 'missed', habit: m?.habit,
        detail: `${G.C.habits[m?.habit]?.label || ''}: ${m?.why || ''} ${chk.late ? (G.j ? 'Shown by' : 'Shown before building by') : (G.j ? 'You caught it with' : 'Caught by you with')} the ${checkName(chk.which)}: ${found}.` };
      for (;;) {
        world.clearGhost(); res = await round(id, G.C.ui.tryClearer); G.instructions[id].push(res.text); briefMin(res);
        const again = await checkAct(id, res, { auto: true });
        if (!again.flawed) { audio.good(); app.bot.cheer(); world.confetti(app.bot.group.position.clone(), 90); ui.alert(G.C.ui.checked, true, 1800); star(2, G.C.stars.flawed[2]); help({ tag: G.C.ui.checked, tagCls: 'ok', html: `<ul>${res.plan.reading.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>`, sure: res.sure, sureLabel: G.C.ui.sure }); break; }
        help({ tag: 'STILL WRONG', tagCls: 'bad', html: `<p>${esc(G.j ? 'Still a problem. Add what must be protected or tested.' : 'Still failing the test. Add a limit or a test condition.')}</p>`, say: G.j ? 'Still a problem. Add what must be protected or tested.' : '', voice: 'helper' });
      }
      ui.facil(null);
    }
    ui.views('sky', []);
    await buildAct(id, res);
    if (G.paths[id] === 'missed' && !G.outcomes[id]?.habit) { star(1, G.C.stars.missed[1]); star(2, G.C.stars.missed[2]); }
    const changed = new Set([...G.cells].filter(([, c]) => !c.locked && (c.item || c.mark)).map(([k]) => k));
    ui.helper(null);
    if (id === 'heart') await heartExtras();
    // Acts 5–7 (a 45-minute session skips the move-in and the food level's day)
    facil(id, 'live');
    if (!short) await moveInAct(id);
    if (!(short && id === 'food')) await liveAct(id, short ? 8 : app.session === 60 ? 14 : 22);
    ui.facil(null);
    await celebrateAct(id, changed);
  }

  // ---------------- Level 6 extras: residents' summary check (sampling bias) and the charter
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
  async function heartExtras() {
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

  // ---------------- the whole session
  G.run = async () => {
    ui.setStars(G.stars); ui.setTownName(G.townName); showCells(G.cells); flower(false);
    const order = LEVEL_ORDER;
    for (; G.li < order.length; G.li++) { await runLevel(order[G.li]); }
    // final: watch your town live (90-minute sessions get the full day), then the report
    ui.views('sky'); await liveAct('heart', app.session === 90 ? 40 : 16, { final: true });
    app.bot.show(false); stage.setTime(18.6); app.refreshLights(); await rig.overview(0.8); await sleep(300);
    const shot = app.snapshot();
    renderReport(app, G, sim(), shot);
    try { localStorage.removeItem(SAVE); } catch { /* */ }
  };
  G.saved = () => { try { const d = JSON.parse(localStorage.getItem(SAVE) || 'null'); return d && d.band === G.band ? d : null; } catch { return null; } };
  return G;
}
