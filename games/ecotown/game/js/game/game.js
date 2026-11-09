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
import { planPlace } from './replace.js';
import { goodSpots } from './spots.js';
import { CHIP, CHIP_WORD, itemChips, simDelta, chipsText } from './delta.js';
import { shopState, wallet, canAffordNew } from './shop.js'; // the Star shop (looks only, never the score)
import { townSummary } from './finale.js';
import { openShop as shopCard, showFinale } from '../ui/rewards.js';
import { answer as askFlorence, SUGGEST } from './qa.js';

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
    labs: {}, ever: [], classMode: !!app.classMode, full: !!app.sandboxFull, day: 1, movedIn: false, completeShown: false, busy: false, milestones: null, placements: 0, catches: 0, trusted: 0,
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
  // (each flawed idea caught in town with a lens also earns a star: stars are spent in the Star shop)
  const totalStars = () => Object.values(G.levelStars).reduce((a, b) => a + b, 0) + Object.values(G.bonus).reduce((a, b) => a + b, 0) + (G.catches || 0);
  const shownStars = () => totalStars() + (run ? Math.max(0, run.marks.filter(Boolean).length - (G.levelStars[run.id] || 0)) + (run.bonus && !G.bonus[run.id] ? 1 : 0) : 0);
  function star(i, why = '') { if (!run || run.marks[i]) return; run.marks[i] = true; audio.star(); G.stars = shownStars(); ui.setStars(G.stars); if (why) ui.caption(`★ ${why}`, 2600); }
  function bonusStar(why) { if (!run) return; run.bonus = true; G.stars = shownStars(); ui.setStars(G.stars); ui.caption(`★ ${why}`, 2800); }
  function flower(flash = true) { const s = sim(); ui.carbonInfo = { used: s.carbon, limit: TARGETS.carbonCeiling }; ui.flower(s.petals, G.townName, { flash }); renderGoals(s); }
  const KEEP = ['milestones', 'placements', 'catches', 'trusted', 'introDone', 'band', 'levelStars', 'starMarks', 'bonus', 'mistakes', 'diary', 'instructions', 'extra', 'credits', 'townName', 'inputMode', 'paths', 'outcomes', 'labs', 'ever', 'classMode', 'day', 'movedIn', 'completeShown', 'charter', 'reflection', 'shop'];
  function save() {
    if (app.inLab || G.full) return; // a mission's practice island is never saved as the player's town
    try { const d = { cells: [...G.cells], li: 1 }; for (const k of KEEP) d[k] = G[k]; if (d.credits === Infinity) d.credits = null; localStorage.setItem(SAVE, JSON.stringify(d)); } catch { /* storage off: keep playing */ }
  }
  G.load = (data) => { for (const k of KEEP) if (data[k] != null) G[k] = data[k]; if (G.credits == null) G.credits = G.j ? Infinity : 60; G.cells = new Map(data.cells || []); G.shop = shopState(G.shop); G.stars = totalStars(); };
  G.paths = {}; G.shop = shopState(null); G.save = save;

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
        // the sentence with Send and Clear beside it, then the word tiles (one row less than before, so the plan stays in view)
        if (mode === 'tiles') body = `<div class="sentrow"><div class="sentence" data-placeholder="Tap words to build your instruction">${used.map((i) => `<button class="tile" data-u="${i}">${esc(L.tiles[i])}</button>`).join('')}</div><button class="btn go" data-send ${used.length ? '' : 'disabled'}>${esc(G.C.ui.send)} ➜</button><button class="btn alt small" data-clear ${used.length ? '' : 'disabled'}>Clear</button></div><div class="tiles">${L.tiles.map((w, i) => `<button class="tile ${used.includes(i) ? 'used' : ''}" data-w="${i}">${esc(w)}</button>`).join('')}</div>`;
        if (mode === 'text') body = `<div class="textin"><div class="field"><input data-in maxlength="160" autocomplete="off" spellcheck="true" placeholder="${G.j ? 'Type your instruction…' : 'e.g. goal + what to protect + how to check'}" aria-label="Instruction for Florence"><div class="hl" data-hl></div></div><button class="btn go" data-send ${d.text.trim() ? '' : 'disabled'} title="${esc(G.C.ui.emptyText)}">${esc(G.C.ui.send)} ➜</button></div>`;
        if (mode === 'cards') body = `<div class="row">${cardOrder.map((ci, n) => `<button class="choice" data-card="${ci}"><span class="btn k">${'ABC'[n]}</span>${esc(L.cards[ci][0])}</button>`).join('')}</div>`;
        ui.tray(`<div class="trayhead"><h3>${esc(heading)}</h3>${tabs}</div>${body}`, (tr) => {
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
  const guessHtml = (res) => `<div class="chips">${res.read.active.map((s) => `<span>${esc(s.replace(/_/g, ' '))}</span>`).join('')}</div><ul>${res.plan.reading.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>${!G.j && res.plan.assumptions.length ? `<p class="assumed"><b>Assumed:</b> ${esc(res.plan.assumptions.join(' '))}</p>` : ''}${res.plan.wont?.length ? `<p class="wont"><b>${esc(G.C.ui.wontDo)}</b> ${res.plan.wont.map(esc).join(' ')}</p>` : ''}`;
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
      const c = centroidOf(res.plan.placements); app.bot.hover(c); frameView(); rig.frameBox([...new Set(res.plan.placements.map((p) => p.k))].map((k) => world.tileTop(k)), { pitch: 0.72, pad: 1.3, dur: 1.2 });
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
      const r = await checks.run(which, sAfter, res.after, reveal); audio.flaw(); app.bot.shrug(); ui.alert(fmt(T(id).flaw[which], r.revealed), false); await sleep(2200); ui.show('alert', false); await checks.leave(); return { flawed: true, which };
    }
    const opts = shuffle(checksFor(id, G.j, reveal)); const tried = []; let tries = 0;
    const label = (c) => G.C.checks[c].label;
    // after two checks that found nothing, a hint about what to look at (not which button)
    const hint = () => { const w = Object.keys(reveal)[0]; return tried.length >= 2 && w && !tried.includes(w) ? `<p class="checknote hint">💡 ${esc(G.j ? 'Hint: try the check that looks at' : 'Hint: test')} ${esc(G.C.checkWhat[w])}.</p>` : ''; };
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
        const r = await checks.run(which, sAfter, res.after, reveal); await frameProblem(which, sAfter, res.after); audio.flaw(); app.bot.shrug(); ui.alert(fmt(T(id).flaw[which], r.revealed), false);
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
      const choice = await new Promise((resolve) => ui.tray(`<h3>${esc(tried.length ? G.C.ui.checkHelp : G.C.ui.how)}</h3>${hint()}<div class="row">${opts.map((c) => `<button class="choice ${tried.includes(c) ? 'tried' : ''}" data-c="${c}"><span class="ic">${G.C.checks[c].icon}</span>${esc(label(c))}${tried.includes(c) ? ' ✓' : ''}</button>`).join('')}</div>${tried.length ? `<div class="row" style="justify-content:flex-end;margin-top:6px"><button class="btn go" data-accept>✓ ${esc(G.C.ui.accept)}</button></div>` : ''}`,
        (tr) => { tr.querySelectorAll('[data-c]').forEach((b) => (b.onclick = () => resolve(b.dataset.c))); tr.querySelector('[data-accept]')?.addEventListener('click', () => resolve(null)); }));
      if (!choice) return accept();
      ui.show('tray', false); showGuessMini(); ui.legend(null); tries++;
      const view = ['street', 'inside'].includes(choice);
      if (view) { world.clearGhost(); showCells(res.after); }
      const r = await checks.run(choice, sAfter, res.after, reveal);
      if (r.revealed) {
        await frameProblem(choice, sAfter, res.after);
        audio.flaw(); app.bot.shrug(); ui.alert(fmt(T(id).flaw[choice], r.revealed), false);
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
  // after a check reveals a problem, frame the tiles it is about (then the alert explains it)
  function problemTiles(which, s, cells) {
    const z = (k) => terrain.tiles.get(k)?.zone; const out = [];
    for (const [k, c] of cells) {
      const it = c.item && ITEMS[c.item];
      if (which === 'flood' && (c.mark === 'town' || it?.home) && ['meadow', 'wetland'].includes(z(k))) out.push(k);
      if (which === 'nature' && (c.mark === 'town' && z(k) === 'wood' || it?.ploughs)) out.push(k);
      if (which === 'carbon' && (c.item === 'concrete' || it?.car)) out.push(k);
      if (which === 'winter' && it?.home) out.push(k);
      if (which === 'walk' && it?.home && (s.walk?.[k] ?? 0) > TARGETS.walkMinutes) out.push(k);
      if (which === 'access' && it?.car) out.push(k);
    }
    return out.slice(0, 40);
  }
  async function frameProblem(which, s, cells) {
    if (['street', 'inside'].includes(which)) return;
    const keys = problemTiles(which, s, cells); if (!keys.length) return;
    await rig.frameBox(keys.map((k) => world.tileTop(k)), { pitch: 0.75, pad: 1.6, dur: 1.2 });
  }
  const continueBtn = () => new Promise((r) => ui.tray(`<div class="row" style="justify-content:center"><button class="btn go" data-go>${esc(G.C.ui.next)} ➜</button></div>`, (tr) => (tr.querySelector('[data-go]').onclick = r)));
  const fmt = (o, rv) => pick(o).replace('{n}', rv?.n ?? '');

  // ---------------- naming the habit: graded against what Florence actually assumed in this plan
  async function habitAct(id, res) {
    const lv = LEVELS[id]; const right = res.plan.habit || lv.habit; const why = res.plan.habitWhy || G.C.habits[right].explain; app.__expectHabit = right; // (read by the play-through test)
    const order = [...HABITS]; const wrong = new Set(); // the same order every time (a shuffled row made a young tester misclick)
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
      help({ tag: G.C.ui.plotterGuess, tagCls: 'bad', html: `<p>${esc(G.C.ui.notQuite)} “${esc(G.C.habits[pickH].label)}” would mean: ${esc(G.C.habits[pickH].explain)}</p><p>Your instruction: <b>“${esc(res.text)}”</b>. ${esc(G.C.ui.lookAgain)} <b>${esc(/^[“"]/.test(reading) ? reading : `“${reading}”`)}</b></p>`, say: `${G.C.ui.notQuite} ${G.C.habits[pickH].label} would mean: ${G.C.habits[pickH].explain} ${G.C.ui.lookAgain} ${reading}`, voice: 'helper' });
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
  // every tile shows what a tap with the selected tool would do: a chunky bright white kerb where it can go, an orange
  // kerb with corner blocks where it would replace what's there, a solid dark plate over tiles where it can't go, a red
  // kerb where Remove works and gold where it's already there. Solid and at ground level, so buildings and Florence
  // stand in front; shape as well as colour (kerb vs plate vs corner blocks).
  const HL = { free: { color: '#ffffff', ring: true }, swap: { color: '#ff8a1f', ring: true, notch: true }, erase: { color: '#ff3b3b', ring: true }, no: { color: '#3b3430', ring: true, plate: true }, same: { color: '#ffd23f', ring: true }, spot: { color: '#ffd23f', ring: true, notch: true } };
  function clearOverlay() { world.setOverlay(null); ui.labels.clear('spot'); }
  function showAllowed(tool) {
    const spec = new Map();
    for (const t of terrain.tiles.values()) {
      if (t.fixed) continue; // the old school, the AI Lab and the dock stay as they are
      const c = cellOf(G.cells, t.k); let look;
      if (tool === 'erase') look = !!c.item || !!c.mark || c.mods.length > 0 ? 'erase' : 'no';
      else { const r = tapPlan(tool, t, c); look = r.same ? 'same' : r.why ? 'no' : r.replaced ? 'swap' : 'free'; }
      if (look === 'no' && t.zone === 'river') continue; // the water already says "not here"; nothing painted over it
      spec.set(t.k, HL[look]);
    }
    // Florence's good spots for this build (gold kerb with corner blocks) and a line saying why
    sb.spots = tool === 'erase' ? null : goodSpots(tool, { tiles: terrain.tiles, cells: G.cells, items: ITEMS, ok: (k) => spec.get(k) === HL.free, bridge: world.bridgeTile || null });
    for (const k of sb.spots?.keys || []) spec.set(k, HL.spot);
    ui.labels.spots((sb.spots?.keys || []).map((k, i) => ({ at: world.tileTop(k).add(new THREE.Vector3(0, 3.2, 0)), text: i || innerWidth < 700 ? '★' : '★ ' + G.S.keySpot })));
    world.setOverlay(spec);
  }
  // free building: a tap may replace what's on the tile. Adds the town-land cap and the credits to planPlace.
  function tapPlan(tool, t, c, { free = false } = {}) {
    const r = planPlace(tool, t, c); if (r.why || r.same) return r;
    if (tool === 'town' && c.mark !== 'town' && sim().townTiles >= SANDBOX_TOWN_CAP) return { why: G.S.townFull(SANDBOX_TOWN_CAP) };
    const net = (ITEMS[tool].cost || 0) - r.removed.reduce((a, id) => a + (ITEMS[id]?.cost || 0), 0);
    if (!free && G.credits !== Infinity && net > G.credits) return { why: G.S.noCredits };
    return r;
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
  // replace: a free-building tap, which may swap out what's on the tile (missions and Florence's plan never do)
  function placeAt(k, tool, { free = false, replace = false } = {}) {
    const t = terrain.tiles.get(k); if (!t) return false;
    let c = { ...cellOf(G.cells, k), mods: [...cellOf(G.cells, k).mods], locked: false };
    if (tool === 'erase') {
      if (t.fixed) return false;
      if (c.mods.length) { const m = c.mods.pop(); refund(m); }
      else if (c.item) { refund(c.item); c.item = null; }
      else if (c.mark) c.mark = null;
      else return false;
    } else if (replace) {
      const r = tapPlan(tool, t, c, { free });
      if (r.same) { if (!free) { audio.tap(); ui.caption(G.S.sameHere(ITEMS[tool].label), 1800); } return false; }
      if (r.why) { if (!free) { audio.bad(); ui.caption(r.why, 2000); } return false; }
      if (ITEMS[tool].unique) for (const [kk, cc] of G.cells) if (kk !== k && cc.item === tool) { refund(tool); G.cells.set(kk, { ...cc, item: null }); world.setCell(kk, G.cells.get(kk)); }
      r.removed.forEach(refund); c = r.cell;
      if (G.credits !== Infinity && !free) G.credits -= ITEMS[tool].cost || 0;
      if (r.replaced && !free) ui.caption(G.S.replaced(r.replaced, ITEMS[tool].label), 1800);
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
    tool: 'town', cat: 'land', ideas: {}, folded: false, paused: false, running: false, bubbles: [], nextBub: 0, nextTipCheck: 0, adv: newAdvisor(), tipT: 0, saveT: 0, tick: 0, lens: null, goalsOpen: false,
  };
  const CAT_ICON = Object.fromEntries(LEVEL_ORDER.map((id, i) => [id, LEVEL_ICONS[i]]));
  const catLabel = (id) => `${CAT_ICON[id]} ${G.S.cats[id]}`;
  function clockText() { const hh = Math.floor(app.hour), mm = Math.floor((app.hour - hh) * 4) * 15; return `${hh}:${String(mm).padStart(2, '0')}`; }

  // the build bar: the clock, one Remove tool, the category tabs, what the selected build does, and the builds
  function renderBar() {
    if (!sb.running) return;
    const s = sim(); const items = isOpen(sb.cat) ? LEVELS[sb.cat].palette : [];
    const tier = TIERS.find((t) => t.id === sb.cat);
    const cr = G.credits !== Infinity ? `<span class="credits ${G.credits > 0 ? 'ok' : ''}" title="${esc(G.S.credits)}"><b>💰</b>${G.credits} ${G.S.credits}</span>` : '';
    const slot = (idd) => { const it = ITEMS[idd];
      return `<div class="slotwrap"><button class="slot item ${sb.tool === idd ? 'on' : ''}" data-t="${idd}" aria-pressed="${sb.tool === idd}" title="${esc(it.label)}"><img src="${thumb(idd)}" alt=""><span>${esc(it.label)}</span>${!G.j && it.cost ? `<em class="cost">💰${it.cost}</em>` : ''}</button></div>`; };
    // the day, pause and credits live in the town card; the bar is only the tools
    renderDay(); ui.setCredits(G.credits !== Infinity ? `💰 ${G.credits} ${G.S.credits}` : '');
    const eraseBtn = `<button class="slot item erase ${sb.tool === 'erase' ? 'on' : ''}" data-t="erase" aria-pressed="${sb.tool === 'erase'}" title="${esc(G.S.erase)} (X)"><b class="ico">🧽</b><span>${esc(G.S.erase)}</span></button>`;
    ui.buildPanel(`<div class="bhead"><button class="slot mini fold" data-fold aria-expanded="${!sb.folded}" aria-label="${esc(G.S.tools)}">${sb.folded ? '▴' : '▾'}</button></div>
      <div class="btools">${eraseBtn}</div><div class="slottip" data-tip hidden></div>
      <div class="bbody ${sb.folded ? 'folded' : ''}"><div class="cats" role="tablist" aria-label="${esc(G.S.buildWhat)}">${LEVEL_ORDER.map((id, i) => `<button class="slot cat ${sb.cat === id ? 'on' : ''} ${isOpen(id) ? '' : 'locked'}" data-cat="${id}" role="tab" aria-selected="${sb.cat === id}" title="${esc(G.S.cats[id])} (${i + 1})"><img src="${thumb(TRACK_PICS[i])}" alt=""><span>${esc(G.S.cats[id])}</span>${isOpen(id) ? '' : '<i class="lock">🔒</i>'}</button>`).join('')}</div>
      <div class="info" data-info aria-live="polite">${infoHtml(sb.tool)}</div>
      <div class="items"><div class="slotwrap eraseslot">${eraseBtn.replace('data-t="erase"', 'data-t="erase" data-erase2')}</div>${isOpen(sb.cat) ? items.map(slot).join('') : lockedView(tier, s)}</div>${isOpen(sb.cat) || sb.tool === 'erase' ? hlKey((G.placements || 0) >= 5) : ''}</div>`, (tr) => {
      const info = tr.querySelector('[data-info]'); const bindPlay = () => info.querySelectorAll('[data-play]').forEach((b) => (b.onclick = () => playVideo(b.dataset.play)));
      const showInfo = (id) => { info.innerHTML = infoHtml(id); bindPlay(); };
      // what a build does, in one sentence, in a small tip above its button (on hover, focus, or just after picking it)
      const tip = tr.querySelector('[data-tip]');
      const showTipFor = (b, ms = 0) => { const it = ITEMS[b.dataset.t]; const text = b.dataset.t === 'erase' ? G.S.removeDesc : it?.desc ? pick(it.desc) : ''; if (!text) return (tip.hidden = true);
        tip.textContent = text; tip.hidden = false; const r = b.getBoundingClientRect(), pr = tr.getBoundingClientRect(); tip.style.left = Math.max(4, Math.min(pr.width - 284, r.left - pr.left + r.width / 2 - 140)) + 'px';
        clearTimeout(sb.tipT2); if (ms) sb.tipT2 = setTimeout(() => (tip.hidden = true), ms); };
      tr.querySelectorAll('[data-cat]').forEach((b) => (b.onclick = () => pickCat(b.dataset.cat)));
      tr.querySelectorAll('[data-t]').forEach((b) => { b.onclick = () => { sb.justPicked = b.dataset.t; pickTool(b.dataset.t); };
        b.onmouseenter = b.onfocus = () => { showInfo(b.dataset.t); showTipFor(b); }; b.onmouseleave = b.onblur = () => { showInfo(sb.tool); tip.hidden = true; }; });
      // just picked: show what it does for a few seconds
      // just built with it: the tool's slot gives a little stamp (CSS; reduced motion: a brief gold flash instead)
      if (sb.stamp) { const sbt = [...tr.querySelectorAll(`[data-t="${sb.stamp}"]`)].find((x) => x.offsetParent); sb.stamp = null; sbt?.classList.add('stamp'); }
      if (sb.justPicked) { const nb = [...tr.querySelectorAll(`[data-t="${sb.justPicked}"]`)].find((x) => x.offsetParent); sb.justPicked = null; if (nb) requestAnimationFrame(() => showTipFor(nb, 4000)); }
      bindPlay();
      tr.querySelector('[data-fold]').onclick = () => { sb.folded = !sb.folded; renderBar(); requestAnimationFrame(reframe); };
    });
  }
  function renderDay() { ui.setDay(`☀ ${G.S.day} ${G.day} · ${clockText()}`, sb.paused, () => { sb.paused = !sb.paused; renderDay(); }); }
  function pickCat(cat) { sb.cat = cat; if (isOpen(cat)) { sb.tool = LEVELS[cat].palette[0]; showAllowed(sb.tool); } else { if (sb.tool !== 'erase') clearOverlay(); } sb.folded = false; audio.tap(); renderBar(); }
  function pickTool(id) { sb.tool = id; showAllowed(id); audio.tap(); renderBar(); }
  // what the selected (or hovered) build is and does: name, one sentence, effect chips, where it goes, cost, ▶
  // a chip: "+4 👪 families". num: false for the item card, which shows what a build is good for, not exact
  // numbers (those depend on where it goes; the hover preview and the floating chips show the real change)
  const chipHtml = (c, num = true) => `<span class="chip ${c.good ? 'good' : 'bad'}" style="--c:${CHIP[c.key].col}" title="${esc(CHIP_WORD[c.key])}">${num || c.key === 'homes' ? `${c.v > 0 ? '+' : '−'}${Math.abs(c.v)} ` : c.v > 0 ? '+ ' : '− '}${CHIP[c.key].icon} <small>${esc(CHIP_WORD[c.key])}</small></span>`;
  function spotLine() {
    const w = sb.spots?.why; if (!w) return ''; const f = G.S.spotWhy?.[w.type]; if (!f) return '';
    return typeof f === 'function' ? f(w.type === 'nearHomes' ? w.n : G.S.spotTo[w.to] || '') : f;
  }
  function infoHtml(id) {
    if (id === 'erase') return `<div class="ihead"><b>🧽 ${esc(G.S.erase)}</b></div><p>${esc(G.S.removeDesc)}</p>`;
    const it = ITEMS[id]; if (!it || !isOpen(sb.cat)) return '';
    const where = it.on.map((z) => G.S.zone[z] || z).join(', ');
    return `<div class="ihead"><b>${esc(it.label)}</b>${!G.j && it.cost ? `<em class="cost">💰 ${it.cost}</em>` : ''}${G.videos?.has(id) ? `<button class="slot mini play" data-play="${id}" aria-label="${esc(G.S.watchBuilt)}: ${esc(it.label)}" title="${esc(G.S.watchBuilt)}">▶</button>` : ''}${spotLine() ? `<span class="spotwhy" title="${esc(spotLine())}">${esc(spotLine().replace(/^⭐/, '★'))}</span>` : ''}</div>
      <p>${esc(pick(it.desc || ''))}</p><div class="chips">${itemChips(id).map((c) => chipHtml(c, false)).join('')}<span class="where">${esc(G.S.goesOn)}: ${esc(where)}</span></div>`;
  }
  // the key to the tile highlight (matches showAllowed's colours); after the first few builds it folds to a "?"
  function hlKey(mini = false) {
    const sw = (cls, text) => `<span><i class="hk ${cls}" aria-hidden="true"></i>${esc(text)}</span>`;
    return `<div class="hlkey ${mini ? 'mini' : ''}" ${mini ? 'tabindex="0" aria-label="Key"' : ''}>${mini ? '<b class="hkq" aria-hidden="true">?</b>' : ''}${sb.tool === 'erase' ? sw('erase', G.S.keyErase) : sw('free', G.S.keyFree) + sw('swap', G.S.keySwap) + (sb.tool === 'town' ? sw('same', G.S.keyHave) : '') + (sb.spots?.keys.length ? sw('spot', G.S.keySpot) : '')}${sw('no', G.S.keyNo)}</div>`;
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
  // which build category answers each town goal (for "opens with …" and Florence's next-step ideas)
  const GOAL_CAT = { homes: 'homes', food: 'food', nature: 'land', health: 'move', energy: 'power', community: 'heart', carbon: 'homes', walk: 'heart' };
  // the next step: unlock the next category, then the first town goal not met yet. { text, have, need }
  function nextStep(s) {
    const nu = nextUnlock(s, G.ever);
    if (nu && sb.intro && nu.id === 'homes' && nu.have < 3) return { text: G.S.nextStep.land(3 - nu.have), have: nu.have, need: 3 }; // the intro asks for three first
    if (nu) { const left = nu.need - nu.have; return { text: nu.id === 'homes' ? G.S.nextStep.land(left) : G.S.nextStep.fam(left, G.S.cats[nu.id]), have: nu.have, need: nu.need }; }
    const goals = townGoals(s, ctxFor(G.cells)); const next = goals.find((g) => !g.ok); const done = goals.filter((g) => g.ok).length;
    if (!next) return labsDone() < 6 ? { text: `${G.S.next}: ${G.S.labGoal(labsDone())}`, have: labsDone(), need: 6 } : { text: G.S.allGoals, have: 1, need: 1 };
    const pct = (v) => Math.min(100, Math.round(v * 100));
    const [have, need] = { homes: [s.familiesSafe, TARGETS.families], food: [s.food, s.foodNeed], nature: [pct(s.petals.nature), 100], health: [pct(s.petals.health), 100], community: [pct(s.petals.community), 100],
      energy: [Math.round(s.power.winterSupply), Math.max(1, Math.round(s.power.demand))] }[next.id] || [done, goals.length];
    return { text: `${G.S.next}: ${G.S.goal[next.id](s)}`, have: Math.min(have, need), need };
  }
  // the town card: the next step, and the six missions on the track (lit = ready, ticked = done)
  function renderCard() {
    const s = sim();
    ui.setBadge('');
    const st = nextStep(s); ui.setStep(st.text, st.have, st.need);
    ui.setTrack(LEVEL_ORDER.map((id) => (G.labs[id] ? 'done' : labReady(id, G.ever, G.labs, G.classMode) ? 'on' : '')));
    ui.setStars(G.stars = totalStars());
    ui.setShop?.(wallet(G.stars, G.shop), canAffordNew(G.stars, G.shop), G.S.shop); // the stars chip opens the Star shop
  }
  const labsDone = () => LEVEL_ORDER.filter((id) => G.labs[id]).length;
  // ---------- Florence suggests: a plan for the player's own town, shown as pale blocks, that is sometimes
  // confidently wrong. Check it with the lens it needs, then judge it; using a flawed one unchecked shows why.
  function suggestFor(s) {
    const free = (k) => { const c = G.cells.get(k); return !c || (!c.item && !c.mark); };
    const tiles = [...terrain.tiles.values()].filter((t) => !t.fixed);
    const townFree = [...G.cells].filter(([, c]) => c.mark === 'town' && !c.item).map(([k]) => k);
    const homes = [...G.cells].filter(([, c]) => c.item && ITEMS[c.item].home && !(c.mods || []).includes('solar')).map(([k]) => k);
    const pick = (arr, n) => shuffle(arr).slice(0, n);
    const out = [];
    if (G.labs.land) { const m = tiles.filter((t) => t.zone === 'meadow' && free(t.k)).map((t) => t.k); if (m.length >= 3) out.push({ id: 'flood', lens: 'flood', flawed: true, pl: pick(m, 3).map((k) => ({ k, item: 'town' })) }); }
    if (G.labs.homes && townFree.length >= 2) out.push({ id: 'carbon', lens: 'carbon', flawed: true, pl: pick(townFree, 2).map((k) => ({ k, item: 'concrete' })) });
    if (G.labs.power && homes.length >= 2 && !s.power.winterOK) out.push({ id: 'winter', lens: 'winter', flawed: true, pl: pick(homes, Math.min(3, homes.length)).map((k) => ({ k, item: 'solar' })) });
    if (G.labs.food) { const f = tiles.filter((t) => ['meadow', 'field'].includes(t.zone) && free(t.k)).map((t) => t.k); if (f.length >= 2) out.push({ id: 'nature', lens: 'nature', flawed: true, pl: pick(f, 2).map((k) => ({ k, item: 'bigfield' })) });
      const o = tiles.filter((t) => t.zone === 'field' && free(t.k)).map((t) => t.k); if (o.length) out.push({ id: 'orchard', lens: 'nature', flawed: false, pl: pick(o, 1).map((k) => ({ k, item: 'orchard' })) }); }
    if (G.labs.heart && !ctxFor(G.cells).hasSchool && s.homes.length) { const far = tiles.filter((t) => ['field', 'slope', 'meadow'].includes(t.zone) && free(t.k)).sort((a, b) => world.tileTop(b.k).distanceTo(world.tileTop(s.homes[0].k)) - world.tileTop(a.k).distanceTo(world.tileTop(s.homes[0].k))); if (far.length) out.push({ id: 'walk', lens: 'walk', flawed: true, pl: [{ k: far[0].k, item: 'school' }] }); }
    if (G.labs.move && townFree.length) out.push({ id: 'park', lens: 'access', flawed: false, pl: pick(townFree, 1).map((k) => ({ k, item: 'park' })) });
    // mostly flawed ones (the lesson), now and then a good one (checking isn't the same as distrusting everything)
    const now = performance.now(); sb.sugSeen ||= {};
    const fresh = out.filter((x) => x.id !== sb.lastSugId && now - (sb.sugSeen[x.id] ?? -Infinity) > 600000);
    out.length = 0; out.push(...fresh);
    const bad = out.filter((x) => x.flawed), good = out.filter((x) => !x.flawed);
    const pool = good.length && Math.random() < 0.3 ? good : bad.length ? bad : good;
    return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
  }
  function planCells(sg) { const after = new Map([...G.cells].map(([k, c]) => [k, { ...c, mods: [...(c.mods || [])] }])); for (const p of sg.pl) { const t = terrain.tiles.get(p.k); const r = planPlace(p.item, t, after.get(p.k) || emptyCell()); if (r.cell) after.set(p.k, r.cell); } return after; }
  function offerSuggestion(sg) {
    const T2 = G.S.suggest; const text = T2[sg.id].text; const sure = 88 + Math.floor(Math.random() * 10); sb.sug = sg; sb.lastSugId = sg.id; (sb.sugSeen ||= {})[sg.id] = performance.now();
    const after = planCells(sg); world.showGhost(sg.pl.map((p) => ({ k: p.k, item: p.item })), after, { reduce: app.reduce });
    audio.tip(); tipShown = 'sug-' + sg.id; lastTip = null;
    const el = ui.florence({ tag: T2.tag, html: `<p>${esc(text)}</p><p class="sure">${esc(T2.sure(sure))}</p><div class="tiprow"><button class="slot act go" data-sg="check"><b class="ico">${G.C.checks[sg.lens]?.icon || '🔍'}</b><span>${esc(T2.check)}</span></button><button class="slot act" data-sg="use"><b class="ico">✓</b><span>${esc(T2.use)}</span></button><button class="slot act" data-sg="no"><b class="ico">✕</b><span>${esc(T2.no)}</span></button></div>`, say: text });
    el.onclick = null; clearTimeout(sb.tipHide);
    const at = sg.pl[0].k; florenceTo(at, 'point');
    el.querySelector('[data-sg="check"]').onclick = () => checkSuggestion(sg, after);
    el.querySelector('[data-sg="use"]').onclick = () => useSuggestion(sg, false);
    el.querySelector('[data-sg="no"]').onclick = () => { world.clearGhost(); sb.sug = null; hideTip(); };
  }
  async function checkSuggestion(sg, after) {
    const T2 = G.S.suggest; sb.lens = sg.lens; clearOverlay();
    app.checkingPlan = true; await checks.run(sg.lens, sim(after), after, {}); app.checkingPlan = false; // the lens bar says "Florence's plan, before building"
    const ev = evidence(sg, sim(), sim(after)); // what the lens shows, in numbers, so Right/Wrong is a judgement on evidence
    const el = ui.florence({ tag: T2.tag, html: `<p class="ev">🔍 ${esc(ev)}</p><p>${esc(T2.judge)}</p><div class="tiprow"><button class="slot act go" data-j="right"><b class="ico">👍</b><span>${esc(T2.right)}</span></button><button class="slot act" data-j="wrong"><b class="ico">👎</b><span>${esc(T2.wrong)}</span></button></div>`, say: T2.judge });
    el.onclick = null;
    el.querySelectorAll('[data-j]').forEach((b) => (b.onclick = async () => {
      const saysWrong = b.dataset.j === 'wrong'; await checks.leave(); sb.lens = null;
      if (sg.flawed && saysWrong) { G.catches = (G.catches || 0) + 1; audio.star?.(); app.bot?.oops(); if (!app.reduce) world.confetti(world.tileTop(sg.pl[0].k).add(new THREE.Vector3(0, 4, 0)), 70); world.clearGhost(); sayTip(T2.caught, true); ui.caption(`★ ${T2.catches(G.catches)}`, 3000); ui.setStars(G.stars = totalStars()); save(); }
      else if (sg.flawed) { sayTip(`${T2.missed} ${T2[sg.id].why}`); world.clearGhost(); }
      else { sayTip(saysWrong ? T2.doubted : T2.goodCheck, !saysWrong); useSuggestion(sg, true); }
      sb.sug = null; if (sb.tool) showAllowed(sb.tool); renderLenses(); save();
    }));
  }
  // the lens result for Florence's plan as one plain line: before → after on the thing that lens tests
  function evidence(sg, a, b) {
    const j = G.j; const r = (v) => Math.round(v * 10) / 10;
    switch (sg.lens) {
      case 'flood': { const n = (b.townFlooded || 0) - (a.townFlooded || 0); return n > 0 ? (j ? `${n} more tile${n === 1 ? '' : 's'} of town land would flood in winter.` : `Flood test: ${n} more town tile${n === 1 ? '' : 's'} on flood land.`) : (j ? 'Nothing new floods.' : 'Flood test: no new town tiles on flood land.'); }
      case 'carbon': return j ? `Carbon: ${a.carbon} → ${b.carbon} t (the town limit is ${TARGETS.carbonCeiling} t).` : `Carbon: ${a.carbon} → ${b.carbon} t of a ${TARGETS.carbonCeiling} t ceiling.`;
      case 'winter': return j ? `Power on a still winter night: ${Math.round(a.power.winterSupply)} → ${Math.round(b.power.winterSupply)} (the town needs ${Math.round(b.power.demand)}).` : `Winter-night supply ${Math.round(a.power.winterSupply)} → ${Math.round(b.power.winterSupply)} vs demand ${Math.round(b.power.demand)}.`;
      case 'nature': { const gone = ['deer', 'bees', 'otters', 'birds', 'frogs'].filter((n) => a.species?.[n] && !b.species?.[n]); const d = r(b.nature - a.nature);
        return `${j ? 'Nature' : 'Habitat score'}: ${r(a.nature)} → ${r(b.nature)} (${d >= 0 ? '+' : ''}${d})${gone.length ? `. ${j ? 'These animals would leave' : 'Species lost'}: ${gone.join(', ')}.` : d < 0 ? (j ? '. Red crossed tiles = wild land ploughed up.' : '. Red crossed tiles = habitat lost.') : '.'}`; }
      case 'walk': return j ? `Longest walk to school: ${b.walkMax} minutes (the rule is ${TARGETS.walkMinutes}).` : `Longest walk to school: ${b.walkMax} min (rule: ${TARGETS.walkMinutes}).`;
      default: { const d = r(b.community - a.community); return j ? `Community: ${r(a.community)} → ${r(b.community)}. Paths still reach every home.` : `Community ${r(a.community)} → ${r(b.community)}; access unchanged.`; }
    }
  }
  function useSuggestion(sg, checked) {
    world.clearGhost(); let n = 0; for (const p of sg.pl) if (placeAt(p.k, p.item, { replace: true, free: true })) n++;
    if (n) { audio.pop(0, sb.cat); changed(); }
    if (!checked) { if (sg.flawed) { G.trusted = (G.trusted || 0) + 1; setTimeout(() => { app.bot?.oops(); sayTip(G.S.suggest.oops(G.S.suggest[sg.id].why)); }, 1800); } else hideTip(); }
    sb.sug = null; save();
  }
  function sayTip(text, praise = false) { showTip({ id: 'sg-' + Math.random(), text, praise }); }

  // the town goals in the 🌼 pop-over: all eight, ticked when met, with how to get there
  function renderGoals(s) {
    if (app.inLab) return;
    const goals = townGoals(s, ctxFor(G.cells)); const done = goals.filter((g) => g.ok).length;
    const cr = G.credits !== Infinity ? ` · 💰 ${G.credits} ${esc(G.S.credits)}` : '';
    ui.setGoals(`<b class="gtitle">${esc(G.S.goalsTitle)} <em>${esc(G.S.goalsDone(done))}</em></b><ul>${goals.map((g) => { const open = isOpen(GOAL_CAT[g.id]);
      return `<li class="${g.ok ? 'ok' : ''} ${open ? '' : 'locked'}"><i aria-hidden="true">${g.ok ? '✓' : open ? '○' : '🔒'}</i><span><b>${esc(G.S.goal[g.id](s))}</b><small>${esc(g.ok ? '' : open ? G.S.goalHow[g.id] : G.S.opensWith(G.S.cats[GOAL_CAT[g.id]]))}</small></span></li>`; }).join('')}
      <li class="${labsDone() >= 6 ? 'ok' : ''}"><i aria-hidden="true">${labsDone() >= 6 ? '✓' : '🧪'}</i><span><b>${esc(G.S.labGoal(labsDone()))}</b><small>${esc(labsDone() >= 6 ? '' : G.S.labGoalHow)}${G.catches ? ` · ${esc(G.S.suggest.catches(G.catches))}` : ''}</small></span></li></ul>
      <p class="gstats">🏘 ${s.townTiles}/${SANDBOX_TOWN_CAP} ${esc(G.S.tiles)} · 👪 ${s.familiesSafe}/${TARGETS.families} ${esc(G.S.families)}${cr}</p>`);
  }
  // a goal met for the first time: a small celebration (once per town, saved)
  function milestones(s, { quiet = false } = {}) {
    const goals = townGoals(s, ctxFor(G.cells)); const first = !G.milestones; G.milestones ||= {};
    const fresh = goals.filter((g) => g.ok && !G.milestones[g.id]); for (const g of fresh) G.milestones[g.id] = true;
    if (first || quiet || !fresh.length || !sb.running || !s.homes.length) return;
    const g = fresh[0]; audio.reward?.(); ui.alert(G.S.goalMet[g.id], true, 3200); app.bot?.cheer();
    const town = [...G.cells].filter(([, c]) => c.item || c.mark === 'town').map(([k]) => k); const k = town[Math.floor(town.length / 2)];
    if (k && !app.reduce) world.confetti(world.tileTop(k).add(new THREE.Vector3(0, 4, 0)), 60);
  }
  // lens buttons in the icon strip, one per mission done
  function renderLenses() { ui.setLenses(LEVEL_ORDER.filter((id) => G.labs[id]).map((id) => ({ id: LAB_LENS[id], icon: G.C.checks[LAB_LENS[id]].icon, label: G.C.checks[LAB_LENS[id]].label, on: sb.lens === LAB_LENS[id] })), G.S.lenses); }
  async function toggleLens(id) {
    if (G.busy) return;
    if (sb.lens) { const was = sb.lens; sb.lens = null; await checks.leave(); renderLenses(); if (sb.tool) showAllowed(sb.tool); if (was === id) return; }
    sb.lens = id; clearOverlay(); renderLenses();
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
    renderBar(); renderCard(); milestones(s);
    if (!fresh.length) adviseSoon(400);
    if (!G.completeShown && !sb.celebrating && townComplete(s, ctxFor(G.cells)) && labsDone() >= 6) { sb.celebrating = true; setTimeout(celebrateTown, 1500); }
    clearTimeout(sb.saveT); sb.saveT = setTimeout(save, 800);
  }
  // one alert for everything that opened at once; Florence's tip is about the first of them
  function announceUnlock(ids) {
    if (!sb.running) return;
    audio.unlock(); ui.alert(`${ids.map((id) => `${CAT_ICON[id]} ${G.S.cats[id]}`).join(' · ')}: ${G.S.unlocked}`, true, 2600);
    const id = ids[0]; const lab = ids.find((x) => labReady(x, G.ever, G.labs, G.classMode) && !G.labs[x]) || null;
    showTip({ id: 'unlock-' + id, text: pick(G.S.unlockTip[id]) + (lab ? ' ' + G.S.labReady : ''), lab }); app.bot?.cheer();
    sb.adv.last = performance.now();
  }
  function adviseSoon(ms) { clearTimeout(sb.tipT); sb.tipT = setTimeout(advise, ms); }
  function advise() {
    if (!sb.running || sb.paused || G.busy || sb.lens || sb.intro) return;
    const s = sim(); const now = performance.now(); const rule = nextTip(sb.adv, s, { open: G.ever, hasSchool: ctxFor(G.cells).hasSchool }, now);
    if (!rule) {
      // a problem she pointed out is fixed: say so
      const solved = (sb.adv.solved || []).splice(0).filter((id) => G.S.fixed[id]);
      if (solved.length) { showTip({ id: 'fixed-' + solved[0], text: G.S.fixed[solved[0]], praise: true }); app.bot?.cheer(); return; }
      // now and then, Florence suggests a plan for the town (sometimes confidently wrong; check it with a lens)
      if (!tipShown && !sb.adv.pending.length && now - (sb.lastSuggest || 0) > 150000 && now - sb.adv.last > 20000 && suggestFor(s)) { sb.lastSuggest = now; sb.adv.last = now; return offerSuggestion(suggestFor(s)); }
      // nothing wrong: a next step toward the first goal not met yet (each idea at most every 3 minutes)
      if (!tipShown && !sb.adv.pending.length && now - sb.adv.last > 40000) {
        const g = townGoals(s, ctxFor(G.cells)).find((x) => !x.ok && isOpen(GOAL_CAT[x.id]) && now - (sb.ideas[x.id] || -Infinity) > 180000);
        if (g) { sb.ideas[g.id] = now; sb.adv.last = now; showTip({ id: 'idea-' + g.id, text: G.S.nextIdea[g.id], where: ideaTool(g.id) }); }
      }
      return;
    }
    const lab = rule.lab && !G.labs[rule.lab] && labReady(rule.lab, G.ever, G.labs, G.classMode) ? rule.lab : null;
    const lens = rule.lab && G.labs[rule.lab] && rule.lens === LAB_LENS[rule.lab] ? rule.lens : null;
    showTip({ id: rule.id, text: tipText(rule, s, G.j), lab, lens, at: tipAt(rule.id, s), rule });
  }
  // Florence's tip: one line in the dock, above the build bar. Never blocks; fades after a while.
  let tipShown = null;
  // which build a next-step idea is about, for its "Show me where" button (only if that category is open)
  const IDEA_TOOL = { homes: ['timber'], food: ['mixed', 'orchard'], nature: ['park', 'hedge', 'wild'], health: ['cycle', 'park'], energy: ['wind'], community: ['market', 'hall'], walk: ['school'] };
  const ideaTool = (id) => (IDEA_TOOL[id] || []).find((t) => ITEMS[t] && isOpen(ITEMS[t].level)) || null;
  // select a build and show Florence's good spots for it: gold kerbs, the camera on them, Florence pointing at the best
  async function showWhere(tool) {
    sb.cat = ITEMS[tool].level; sb.tool = tool; sb.folded = false; showAllowed(tool); renderBar(); audio.tap();
    const keys = sb.spots?.keys || []; const line = spotLine(); if (line) showTip({ id: 'where-' + tool, text: line.replace(/^⭐\s*/, '') });
    if (!keys.length) return;
    await rig.frameBox(keys.map((k) => world.tileTop(k)), { pitch: 0.8, pad: 2.2, dur: 1.1 });
    fNext = 0; florenceTo(keys[0], 'point');
  }
  function showTip({ id, text, lab = null, lens = null, at = null, praise = false, rule = null, where = null }) {
    if (!sb.running || app.inLab || sb.inClass) return; // only while building (a late tip once stuck over a mission's answers)
    if (lab) lens = null; // one button at most
    tipShown = id; lastTip = { id, text, lab, lens, praise, rule, where }; if (lab) sb.needLab = lab; praise ? audio.good?.() : audio.tip();
    if (lab || lens) where = null;
    const act = where ? `<button class="slot act go" data-tipwhere="${where}"><img src="${thumb(where)}" alt=""><span>${esc(G.S.showWhere)}</span></button>` : lab ? `<button class="slot act go" data-tiplab="${lab}"><img src="${thumb('ailab')}" alt=""><span>${esc(G.S.showInLab)}</span></button>` : lens ? `<button class="slot act" data-tiplens="${lens}"><b class="ico">${G.C.checks[lens].icon}</b><span>${esc(G.S.useLens)}</span></button>` : '';
    const el = ui.florence({ tag: praise ? '✓' : G.S.tipTag, html: `<p>${esc(text)}</p>${act ? `<div class="tiprow">${act}</div>` : ''}`, say: text });
    el.classList.toggle('praise', praise); el.title = G.S.dismiss;
    el.querySelector('[data-tiplab]')?.addEventListener('click', () => { hideTip(); openLab(lab); });
    el.querySelector('[data-tiplens]')?.addEventListener('click', () => { hideTip(); toggleLens(lens); });
    el.querySelector('[data-tipwhere]')?.addEventListener('click', () => { hideTip(); showWhere(where); });
    el.onclick = (e) => { if (!e.target.closest('button')) hideTip(); }; // tap the card to close it
    if (at && sb.running) florenceTo(at, 'point');
    clearTimeout(sb.tipHide); if (!lab && !lens && !where) sb.tipHide = setTimeout(() => { if (tipShown === id) hideTip(); }, 14000); // a tip with a button stays until you act on it
  }
  let lastTip = null;
  function hideTip() { tipShown = null; if (sb.running && lastTip && !sb.intro) ui.florenceMini(() => showTip(lastTip.rule ? { ...lastTip, text: tipText(lastTip.rule, sim(), G.j) } : lastTip)); else ui.florence(null); }
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
    if (!sb.running || sb.paused || G.busy || sb.intro || !ui.P.settings.classList.contains('hide') || !ui.P.modal.classList.contains('hide')) return; // the clock waits while a menu or card is open
    const before = app.hour; app.hour += (16 / DAY_SECONDS) * 0.2;
    if (before < 18.5 && app.hour >= 18.5) { audio.dusk(); setMusic('night'); }
    if (app.hour >= 22) newDay();
    stage.setTime(app.hour, 0);
    renderDay();
    const now = performance.now();
    if (sb.bubbles.length && now > sb.nextBub && rig.mode === 'sky' && !sb.lens) {
      const b = sb.bubbles[Math.floor(Math.random() * sb.bubbles.length)]; const who = life.residentNear(b.k);
      if (who) ui.labels.bubble({ at: () => who.position.clone().add(new THREE.Vector3(0, 1.9, 0)), text: b.text, bad: b.bad, quiet: true });
      sb.nextBub = now + 9000;
    }
    if (now > sb.nextTipCheck) { sb.nextTipCheck = now + 5000; if (!tipShown) advise(); }
  }
  function newDay() {
    app.hour = 6; G.day++; const s = sim(); audio.dawn(); setMusic('day');
    const line = diaryLines('heart', s, G.j)[G.day % 3]; if (s.homes.length && !G.diary.includes(line)) G.diary = [...G.diary, line].slice(-8);
    if (G.credits !== Infinity) { const pay = Math.round(s.familiesSafe * 1.5 + s.community); G.credits += pay; ui.caption(`${G.S.day} ${G.day}: ${G.S.earnedToday(pay)}`, 3500); }
    else ui.caption(`${G.S.newDay} ${G.day}${s.familiesSafe ? ` · 👪 ${s.familiesSafe} ${G.S.families}` : ''}`, 2600);
    townEvent(s);
    renderBar(); save();
  }
  // every third day the weather tests the town: a winter storm (homes on flood land) or a still, dark night (winter
  // power). Something to plan for in free building, not only in the AI Lab copy of the island.
  function townEvent(s) {
    if (G.day < 3 || G.day % 3 !== 0 || !s.homes.length || !sb.running) return;
    const E = G.S.events; const storm = (G.day / 3) % 2 === 1;
    if (storm) {
      if (s.flooded > 0) { audio.bad?.(); ui.alert(E.stormBad(s.flooded), false, 4200); app.bot?.oops(); showTip({ id: 'ev-storm-' + G.day, text: E.stormTip, lab: !G.labs.land && labReady('land', G.ever, G.labs, G.classMode) ? 'land' : null, lens: G.labs.land ? 'flood' : null }); }
      else { ui.alert(E.stormGood, true, 3200); app.bot?.cheer(); }
    } else if (isOpen('power')) {
      if (!s.power.winterOK) { audio.bad?.(); ui.alert(E.darkBad, false, 4200); app.bot?.oops(); showTip({ id: 'ev-dark-' + G.day, text: E.darkTip, lab: !G.labs.power && labReady('power', G.ever, G.labs, G.classMode) ? 'power' : null, lens: G.labs.power ? 'winter' : null }); }
      else { ui.alert(E.darkGood, true, 3200); app.bot?.cheer(); }
    }
  }
  // one build (or removal) on tile k, with what it changed floating up from the tile and the petals it helped lit
  function act(k, tool) {
    const before = sim(); const cr0 = G.credits;
    if (!placeAt(k, tool, { replace: true })) return false;
    world.clearGhost(); app._hk = null; G.placements = (G.placements || 0) + 1;
    const now = performance.now(); sb.popRun = now - (sb.popAt || 0) < 2500 ? (sb.popRun || 0) + 1 : 0; sb.popAt = now;
    if (tool === 'erase') audio.remove(); else audio.pop(sb.popRun, sb.cat);
    const d = simDelta(before, sim()); const spent = G.credits !== Infinity ? G.credits - cr0 : 0;
    const html = d.map(chipHtml).join('') + (spent ? `<span class="chip ${spent > 0 ? 'good' : 'bad'}" style="--c:${CHIP.credits.col}">${spent > 0 ? '+' : '−'}${Math.abs(spent)} 💰</span>` : '');
    if (html) ui.labels.float({ at: world.tileTop(k).add(new THREE.Vector3(0, 5, 0)), html, text: chipsText(d) });
    sb.stamp = tool; showAllowed(sb.tool); changed(); if (d.some((c) => c.good)) flower(d.filter((c) => c.good).map((c) => c.key)); florenceTo(k, 'peer');
    return true;
  }
  const TOUCH = matchMedia('(pointer: coarse)').matches;
  function bindTaps() {
    const canvas = stage.renderer.domElement;
    rig.onTap = (ndc) => {
      if (!sb.running || G.busy || sb.lens) return;
      const k = world.pick(ndc, stage.camera); if (!k) { if (sb.tool) ui.caption(G.S.tapTile, 1800); return; }
      // (touch used to need a second tap to build; a reviewer found single taps "did nothing", so one tap builds, like a click.
      // Only a tap that would knock down a home asks for a second tap, below.)
      sb.armed = null;
      if (k === terrain.lab) { audio.tap(); return enterClassroom(); } // the AI Lab building: step into Florence's classroom
      if (!sb.tool || (!isOpen(sb.cat) && sb.tool !== 'erase')) return;
      if (sb.tool !== 'erase' && k !== sb.confirm) {
        const c = cellOf(G.cells, k); const r = tapPlan(sb.tool, terrain.tiles.get(k), c);
        if (!r.why && !r.same && (r.removed || []).some((id) => ITEMS[id]?.home)) { sb.confirm = k; audio.tap(); app._hk = null; rig.onHover(ndc); ui.caption(G.S.tapAgain(ITEMS[c.item]?.label || ''), 2600); return; }
      }
      sb.confirm = null;
      act(k, sb.tool);
    };
    // right-click (not drag) removes, whatever tool is selected
    rig.onAltTap = (ndc) => { if (!sb.running || G.busy || sb.lens) return; const k = world.pick(ndc, stage.camera); if (k && k !== terrain.lab) act(k, 'erase'); };
    rig.onHover = (ndc) => {
      if (!sb.running || G.busy || sb.lens || sb.tool === 'erase' || !isOpen(sb.cat)) return;
      const k = world.pick(ndc, stage.camera); if (k === app._hk) return; app._hk = k;
      if (!k) { ui.labels.clear('lbl'); return world.clearGhost(); }
      const c = cellOf(G.cells, k); const r = tapPlan(sb.tool, terrain.tiles.get(k), c);
      if (r.same) { world.clearGhost(); return ui.labels.set([{ at: world.tileTop(k).add(new THREE.Vector3(0, 4, 0)), text: G.S.sameHere(ITEMS[sb.tool].label) }]); }
      const nc = r.cell || (() => { const n = { ...c, mods: [...c.mods] }; const it = ITEMS[sb.tool]; if (it.kind === 'mark') n.mark = sb.tool; else if (it.kind === 'mod') n.mods.push(sb.tool); else n.item = sb.tool; return n; })();
      world.showGhost([{ k }], new Map([[k, nc]]), { reduce: true, bad: r.why ? new Set([k]) : new Set() });
      const at = world.tileTop(k).add(new THREE.Vector3(0, 4, 0));
      if (r.why) return ui.labels.set([{ at, text: r.why, cls: 'bad' }]);
      // what this build would really change in the town (before you place it), and what it swaps out
      const after = new Map(G.cells); after.set(k, nc); const d = simDelta(sim(), sim(after));
      const net = G.credits !== Infinity ? (ITEMS[sb.tool].cost || 0) - (r.removed || []).reduce((a, id) => a + (ITEMS[id]?.cost || 0), 0) : 0;
      const html = `${r.replaced ? `<span class="rep">${esc(G.S.replaces(r.replaced))}</span>` : ''}${d.map(chipHtml).join('')}${net ? `<span class="chip bad" style="--c:${CHIP.credits.col}">−${net} 💰</span>` : ''}`;
      ui.labels.set(html ? [{ at, html, cls: 'ok preview' }] : []);
    };
    canvas.addEventListener('pointerleave', () => { world.clearGhost(); app._hk = null; ui.labels.clear('lbl'); });
  }
  // Escape anywhere: close the open card if it has a close or "not now" button, else the pop-overs, else the lens
  addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const a = document.activeElement; if (a && a.tagName === 'INPUT' && a.value) return; // Esc in a text box clears nothing important
    if (!ui.P.modal.classList.contains('hide')) { ui.P.modal.querySelector('[data-act="close"], [data-act="later"], [data-act="keep"], [data-close]')?.click(); return; }
    if (!ui.P.settings.classList.contains('hide')) { ui.P.settings.querySelector('[data-close], [data-act="close"]')?.click(); return; }
    ui.closePops();
    if (sb.running && sb.lens) toggleLens(sb.lens);
  });
  // keys while building: 1–6 pick a category, X picks Remove, Esc closes the pop-overs
  addEventListener('keydown', (e) => {
    if (!sb.running || G.busy || sb.intro || e.ctrlKey || e.metaKey || e.altKey) return;
    const a = document.activeElement; if (a && (a.tagName === 'INPUT' || a.tagName === 'TEXTAREA' || a.tagName === 'SELECT')) return;
    if (!ui.P.modal.classList.contains('hide')) return;
    if (/^[1-6]$/.test(e.key)) { pickCat(LEVEL_ORDER[+e.key - 1]); e.preventDefault(); }
    else if (e.key.toLowerCase() === 'x') { pickTool('erase'); e.preventDefault(); }
    else if (e.key === 'Escape') ui.closePops();
  });
  // centre the island in the free space beside (or above) the build panel
  function frameView() {
    // the island is framed in the space the side panels leave free: the build panel while building, the
    // mission rail in the AI Lab. The camera's view offset centres it there, and the rig fits it to that area.
    const cam = stage.camera; const W = innerWidth, H = innerHeight; const b = ui.P.build; const d = ui.P.dock;
    const panel = sb.running && !b.classList.contains('hide') ? b : app.inLab && !d.classList.contains('hide') && (d.getBoundingClientRect().left < W * 0.2 || d.getBoundingClientRect().top > H * 0.5) ? d : null;
    if (!panel) { if (cam.view?.enabled) cam.clearViewOffset(); rig.inset = { left: 0, right: 0, top: 0, bottom: 0 }; return; }
    const r = panel.getBoundingClientRect();
    if (r.top > H * 0.5) { const top = ui.P.card.classList.contains('hide') ? 70 : Math.max(70, ui.P.card.getBoundingClientRect().bottom + 8); cam.setViewOffset(W, H, 0, Math.round((H - r.top - top) / 2), W, H); rig.inset = { left: 0, right: 0, top, bottom: H - r.top }; } // the bottom hotbar: centre the island between the top strip and the bar
    else { const right = ui.P.camctl.classList.contains('hide') ? 0 : W - ui.P.camctl.getBoundingClientRect().left + 8; cam.setViewOffset(W, H, -Math.round((r.right - right) / 2), 0, W, H); rig.inset = { left: r.right, right, top: 0, bottom: 0 }; }
  }
  // on resize or when the panels change, keep the same framing (rescale the distance with the frame)
  let lastFrame = 0;
  function reframe() { const before = lastFrame || rig.frameDist(); frameView(); const now = rig.frameDist(); if (rig.mode === 'sky' && before) rig.sky.dist = Math.min(rig.maxDist(), rig.sky.dist * (now / before)); lastFrame = now; }
  app.reframe = reframe;
  addEventListener('resize', () => requestAnimationFrame(reframe));
  function startBuilding() {
    sb.running = true; rig.building = true; app.levelId = null; app.inLab = false; app.briefMinutes = null;
    ui.only([]); ui.views('sky'); ui.facil(null); ui.show('card'); ui.show('strip');
    showCells(G.cells); clearOverlay(); if (isOpen(sb.cat)) showAllowed(sb.tool);
    changed(); renderLenses(); setMusic(app.hour >= 18.5 || app.hour < 6.5 ? 'night' : 'day'); app.bot?.show(true); requestAnimationFrame(() => { frameView(); lastFrame = rig.frameDist(); if (!sb.framed) { sb.framed = true; rig.overview(app.reduce ? 0.01 : 1.0).then?.(() => { if (innerWidth <= 760 && !rig.portrait()) rig.zoomBy(0.6); }); } }); // landscape phones: closer, so a tile is big enough to tap (upright phones already frame the tiles across the width)
    if (sb.afterLab) { const msg = sb.afterLab; sb.afterLab = null; setTimeout(() => ui.caption(msg, 5000), 2800); } // after any unlock alert
  }
  function stopBuilding() { ui.labels.clear('spot'); sb.running = false; ui.setDay(null); ui.setCredits(''); ui.florence(null); frameView(); rig.building = false; clearTimeout(sb.tipT); world.clearGhost(); clearOverlay(); ui.labels.clear(); ui.tray(''); ui.buildPanel(''); hideTip(); }
  const setMusic = (m) => app.setMusic?.(m);

  // ================= THE AI LAB CLASSROOM =================
  // Florence at the front beside a big screen; ask her questions (a fixed, kid-safe set in qa.js) and she
  // answers and shows a build video on the screen. Missions opens the mission board; Back returns to the island.
  async function enterClassroom() {
    const C = app.classroom; if (!C) return labBoard();
    if (G.busy || !sb.running) return; G.busy = true; stopBuilding(); sb.inClass = true;
    audio.door?.(); setMusic('lab');
    await rig.fade(() => { C.show(true); rig.mode = 'inside'; rig.cut(C.pose()); app.bot.appear(C.florenceAt()); app.bot.look(C.eye()); });
    document.documentElement.dataset.lab = 'on'; ui.show('strip', false); ui.setBadge(''); ui.show('strip', false);
    C.card(G.S.classTitle, [pick(G.S.classHello)], { icon: '🧪' });
    help({ tag: 'HELLO', html: `<p>${esc(G.S.classHello)}</p>`, say: G.S.classHello }); app.bot.wave();
    classTray();
  }
  function classTray() {
    const sug = shuffle(SUGGEST[G.j ? 'j' : 's']).slice(0, 3);
    ui.tray(`<div class="ask"><input data-q type="text" maxlength="140" autocomplete="off" placeholder="${esc(G.S.askPlaceholder)}" aria-label="${esc(G.S.askFlorence)}"><button class="btn go" data-ask>${esc(G.S.ask)}</button></div>
      <div class="row qchips">${sug.map((q) => `<button class="choice" data-sq="${esc(q)}">${esc(q)}</button>`).join('')}</div>
      <div class="row"><button class="btn ${readyN() ? 'go' : 'alt'}" data-missions>🧪 ${esc(G.S.missions)}${readyN() ? ` · ${esc(G.S.readyN(readyN()))}` : ''}</button><button class="btn alt" data-leave>⬅ ${esc(G.S.backToBuilding)}</button></div>`, (el) => {
      const inp = el.querySelector('[data-q]'); const go = (q) => { q = (q || '').trim(); if (q) classAsk(q); };
      el.querySelector('[data-ask]').onclick = () => go(inp.value); inp.onkeydown = (e) => { if (e.key === 'Enter') go(inp.value); };
      el.querySelectorAll('[data-sq]').forEach((b) => (b.onclick = () => go(b.dataset.sq)));
      el.querySelector('[data-missions]').onclick = () => leaveClassroom({ board: true });
      el.querySelector('[data-leave]').onclick = () => leaveClassroom();
    });
  }
  const readyN = () => LEVEL_ORDER.filter((id) => !G.labs[id] && labReady(id, G.ever, G.labs, G.classMode)).length;
  let askN = 0;
  async function classAsk(q) {
    const C = app.classroom; const r = askFlorence(q, G.j); const n = ++askN;
    audio.tap(); help({ tag: G.S.askTag, html: `<p class="q">“${esc(q)}”</p><p>${esc(r.text)}</p>`, say: r.text });
    classTray();
    if (r.video && G.videos?.has(r.video)) {
      app.bot.point(C.screenAt(), 2.4);
      const ok = await C.play(`videos/${r.video}.mp4`);
      if (n === askN && sb.inClass) C.card(ITEMS[r.video]?.label || q, [r.text]);
      if (!ok && n === askN) C.card(q, [r.text]);
    } else { C.card(q, [r.text], { icon: '💬' }); r.topic ? app.bot.nod() : app.bot.think(); }
  }
  async function leaveClassroom({ board = false } = {}) {
    const C = app.classroom; if (!sb.inClass) return; sb.inClass = false; C.stop();
    ui.helper(null); ui.tray(''); delete document.documentElement.dataset.lab;
    await rig.fade(() => { C.show(false); rig.mode = 'sky'; rig.apply(rig.skyPose()); app.bot.appear(world.tileTop(terrain.lab).add(new THREE.Vector3(-2, 0, 7))); });
    G.busy = false; startBuilding();
    if (board) labBoard();
  }

  // ================= THE AI LAB =================
  // the board: six missions, locked / ready / done, plus the whole-day and the report
  async function labBoard() {
    if (G.busy) return;
    const rows = LEVEL_ORDER.map((id, i) => {
      const done = G.labs[id]; const ready = labReady(id, G.ever, G.labs, G.classMode); const tier = TIERS.find((t) => t.id === id);
      const why = !isOpen(id) ? `🔒 ${G.S.unlocksWhen} ${pick(tier.need)}` : !ready ? `🔒 ${G.S.classFirst}` : done ? `${'★'.repeat(done.stars)}${'☆'.repeat(3 - done.stars)} · ${G.S.playAgain}` : G.S.ready;
      const need = ready && !done && sb.needLab === id ? `<em class="need">${esc(G.j ? 'Your town needs this' : 'Relevant to your town now')}</em>` : '';
      return `<button class="labrow ${done ? 'done' : ''} ${ready ? '' : 'locked'} ${need ? 'needed' : ''}" data-act="${ready ? 'lab:' + id : 'none'}" ${ready ? '' : 'aria-disabled="true"'}><span class="ic"><img src="${thumb(TRACK_PICS[i])}" alt=""></span><span class="t"><b>${G.classMode ? `${i + 1}. ` : ''}${esc(T(id).title)}</b>${need}<small>${esc(pick(T(id).goal))}</small></span><span class="st">${esc(why)}</span></button>`;
    }).join('');
    G.busy = true; // the town waits while the board is open
    const a = await ui.modal(`<div class="ribbon">🧪 ${esc(G.S.labTitle)}</div><p>${esc(pick(G.S.labIntro))}</p><div class="labs">${rows}</div>
      <div class="row" style="justify-content:center;margin-top:10px"><button class="btn go" data-act="close">${esc(G.S.backToBuilding)}</button></div>`);
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
    await rig.focus(door, { dist: 40, pitch: 0.55, yaw: rig.sky.yaw }, 1.2);
    await bot.walkTo(door, { maxDur: app.reduce ? 0.3 : 2.2 }); bot.look(inside); if (!app.reduce) await bot.wave();
    audio.door(); await bot.walkTo(inside, { maxDur: 0.6 }); bot.show(false);
    await rig.fade?.(() => {});
  }
  // one mission, on Florence's practice island
  async function runLab(id) {
    const real = G.cells; const lv = LEVELS[id]; const L = T(id);
    app.levelId = id; app.inLab = true; document.documentElement.dataset.lab = 'on'; guess = null; setMusic('lab');
    run = { id, marks: [false, false, false], bonus: false };
    G.cells = seedTo(terrain, id); showCells(G.cells);
    ui.setBadge(G.classMode ? `🧪 AI LAB · ${lv.n}/6` : `🧪 ${L.title}`); ui.setTask(lv.n, pick(L.goal)); ui.helper(null); ui.facil(null); ui.views(null, []);
    stage.setTime(12); app.hour = 12.5; await rig.overview(1.4);
    // brief, with what this mission adds (a new lens or test). "Not now" goes straight back to building.
    const N = L.newThing; const lens = G.C.checks[N.lens]; const newLabel = N.label ? pick(N.label) : lens.label;
    facil(id, 'brief');
    const go = await ui.modal(`<div class="ribbon">🧪 ${esc(G.S.labTitle)} · ${esc(N.test ? G.C.ui.newTest : G.C.ui.newLens)}</div><div class="big">${lens.icon}</div><h2>${esc(newLabel)}</h2><p>${esc(pick(N))}</p><div class="levelbar"><b>${G.classMode ? `${esc(G.S.mission)} ${lv.n} OF 6` : esc(G.S.missionsDone(labsDone()))}</b><span>${esc(L.title)}</span><span class="dots">${[1, 2, 3, 4, 5, 6].map((i) => `<i class="${G.labs[LEVEL_ORDER[i - 1]] || i === lv.n ? 'on' : ''}"></i>`).join('')}</span></div><p class="brief">${esc(pick(L.brief))}</p><p class="practice">${esc(pick(G.S.practice))}</p><div class="row" style="justify-content:center"><button class="btn alt" data-act="later">${esc(G.S.notNow)}</button><button class="btn go" data-act="go">${esc(G.C.ui.start)} ➜</button></div>`, { say: `${newLabel}. ${pick(N)} ${pick(L.brief)}` });
    if (go === 'later') return leaveLab(real);
    G.paths[id] = null; G.instructions[id] = []; G.mistakes = G.mistakes.filter((m) => m.level !== id); // only once the mission really starts again ("Not now" kept an empty row in the report)
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
      run.meeting = `${d.options[+a].label}: ${[e.families ? `${e.families > 0 ? '+' : ''}${e.families} households` : '', e.carbon ? `${e.carbon > 0 ? '+' : ''}${e.carbon} t carbon` : ''].filter(Boolean).join(', ') || 'no change to the numbers'}`;
    }
    // the reward card, then: use Florence's plan in your town, or keep your town as it is
    const s2 = sim(); audio.fanfare(); setMusic('celebrate'); world.confetti(new THREE.Vector3(10, 20, 8), 200); rig.startTurntable(app.reduce ? 0 : 0.1);
    const stars = run.marks.filter(Boolean).length; const rules = G.C.stars[G.paths[id] || 'flawed'];
    const [statLabel, statVal] = lv.stat(s2, G.j); const oc = outcomeFor(id, s2);
    const heading = pick(L.complete); const newLens = G.C.checks[LAB_LENS[id]];
    const choice = await ui.modal(`<div class="ribbon green">🧪 ${esc(G.S.missionDone)} · ${esc(L.title)}</div><div class="stars3">${[0, 1, 2].map((i) => `<span class="${i < stars ? 'on' : ''}">★</span>`).join('')}</div><h2>${esc(heading)}</h2>
      <ul class="starlist">${rules.map((r, i) => `<li class="${run.marks[i] ? 'got' : ''}">${run.marks[i] ? '★' : '☆'} ${esc(r)}</li>`).join('')}${run.bonus ? `<li class="got">★ Bonus: found Florence’s biased survey</li>` : ''}</ul>
      <div class="outcome ${oc.kind}"><small>${esc(G.C.ui.outcomeHead)}</small><b>${esc(G.C.ui.outcome[oc.kind])}</b><p>${esc(oc.detail)}</p></div>
      <div class="stats"><div><small>${esc(statLabel)}</small>${esc(statVal)}</div><div><small>${esc(G.S.newTool)}</small>${newLens.icon} ${esc(newLens.label)}</div><div><small>${G.j ? 'Fact' : 'Evidence'}</small>${esc(pick(L.fact))}</div>${run.meeting ? `<div><small>Town meeting</small>${esc(run.meeting)}</div>` : ''}</div>
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
          audio.pass(); app.bot.proud(); world.confetti(app.bot.group.position.clone(), 90); ui.alert(G.C.ui.checked, true, 1800);
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
    sb.lastSuggest = performance.now(); // her next idea for the town waits a while after a lesson
    G.cells = real; app.inLab = false; app.levelId = null; app.briefMinutes = null; delete document.documentElement.dataset.lab; run = null;
    stage.setTime(app.hour = 12.5, 0);
    if (placements) {
      const keys = new Set(); let skipped = 0;
      for (const p of placements) {
        const tool = p.item || p.mod || p.mark; if (!tool || !ITEMS[tool]) continue;
        const t = terrain.tiles.get(p.k); const c = cellOf(G.cells, p.k);
        let k = p.k;
        // the tile is taken (or not allowed in this town): the nearest free tile where it can go, so adopting a plan
        // after a win really adds something (a reviewer saw "1 placement applied, 1 skipped")
        if ((ITEMS[tool].kind === 'build' && c.item) || sandboxReason(tool, t, c, { free: true })) {
          const from = world.tileTop(p.k);
          k = [...terrain.tiles.values()].filter((u) => !u.fixed && !keys.has(u.k)).map((u) => ({ u, c: cellOf(G.cells, u.k) }))
            .filter(({ u, c: cc }) => !(ITEMS[tool].kind === 'build' && cc.item) && !sandboxReason(tool, u, cc, { free: true }))
            .sort((a2, b2) => world.tileTop(a2.u.k).distanceTo(from) - world.tileTop(b2.u.k).distanceTo(from))[0]?.u.k;
          if (!k) { skipped++; continue; }
        }
        if (placeAt(k, tool, { free: true })) keys.add(k); else skipped++;
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
      await new Promise((resolve) => ui.tray(`<h3>Florence only asked people at the car park. Ask people at the school gate how they travel!</h3><div class="row askrow">${modes.map((_, i) => `<button class="tile ask" data-r="${i}" aria-label="Ask person ${i + 1}">🧍<small>Ask</small></button>`).join('')}</div><div class="row"><span class="askcount" data-n>0 of 10 asked</span><button class="btn alt" data-allask disabled>Ask everyone else</button><button class="btn go" data-act="all" disabled>Tell Florence to count everyone</button></div>`, (tr) => {
        let n = 0;
        tr.querySelectorAll('[data-r]').forEach((b) => (b.onclick = () => { if (b.disabled) return; const md = modes[+b.dataset.r]; b.innerHTML = md === 'walk' ? '🚶<small>walks</small>' : '🚗<small>drives</small>'; b.classList.add(md); b.disabled = true; audio.tap(); n++; tr.querySelector('[data-n]').textContent = `${n} of 10 asked`; if (n >= 3) tr.querySelector('[data-allask]').disabled = n >= 10; if (n >= 6) tr.querySelector('[data-act]').disabled = false; }));
        // after three asked by hand, the rest in one go (ten separate asks was slow)
        tr.querySelector('[data-allask]').onclick = () => tr.querySelectorAll('[data-r]:not(:disabled)').forEach((b) => b.onclick());
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
        if (el >= nextB && list.length) { const b = list[bi++ % list.length]; const who = life.residentNear(b.k); if (who) ui.labels.bubble({ at: () => who.position.clone().add(new THREE.Vector3(0, 1.9, 0)), text: b.text, bad: b.bad }); nextB = el + 3.4; }
        await sleep(50);
      }
      ui.labels.clear('bub'); app.hour = 12.5; stage.setTime(12.5, 0); await rig.overview(1.1);
    } finally { G.busy = false; startBuilding(); }
  }
  // the finale: all six missions done and the eight town goals met. A summary card (what you built, mistakes
  // caught, stars, habits learned) beside the island at golden hour, which turns slowly behind it (still with
  // Reduce motion), with confetti and fireworks. replay: from ☰ once it has been shown.
  async function celebrateTown(replay = false) {
    sb.celebrating = false;
    if (G.busy) return; // busy: it comes back on the next change
    if (!replay && (G.completeShown || labsDone() < 6 || !townComplete(sim(), ctxFor(G.cells)))) return;
    G.completeShown = true; G.busy = true; stopBuilding(); save();
    let a = null;
    try {
      const s = sim(); flower(false); ui.show('card', false); ui.show('strip', false);
      audio.complete(app.reduce); setMusic('celebrate'); stage.setTime(17.8, 0); app.refreshLights();
      if (!app.reduce) { world.confetti(new THREE.Vector3(10, 20, 8), 240); app.cosmetics?.celebrate(5); }
      const stars = totalStars(); const shown = showFinale(app, G, townSummary(G, s, stars), { left: wallet(stars, G.shop), title: s.title });
      await sleep(80); frameBeside(ui.P.modal);
      await rig.overview(app.reduce ? 0.01 : 1.6); rig.startTurntable(app.reduce ? 0 : 0.08);
      a = await shown;
    } finally { rig.startTurntable(0); stage.setTime(app.hour, 0); G.busy = false; if (a !== 'report') startBuilding(); }
    if (a === 'report') return showReport();
    if (a === 'shop') setTimeout(openShop, 300);
  }
  // centre the island in the space a side (or bottom) sheet leaves free
  function frameBeside(el) {
    // sizes from the finale sheet's CSS (the card may still be sliding in, so it isn't measured)
    const W = innerWidth, H = innerHeight; const cam = stage.camera;
    if (W <= 760 || H <= 560) { const bottom = Math.round(Math.min(el.scrollHeight || H, H * 0.56) + 8); cam.setViewOffset(W, H, 0, Math.round(bottom / 2), W, H); rig.inset = { left: 0, right: 0, top: 0, bottom }; }
    else { const left = Math.round(16 + Math.min(460, W * 0.46)); cam.setViewOffset(W, H, -Math.round(left / 2), 0, W, H); rig.inset = { left, right: 0, top: 0, bottom: 0 }; }
  }
  // the Star shop (from the stars chip on the town card, or ☰): cosmetic rewards only, saved with the town
  const applyCosmetics = () => app.cosmetics?.set(G.shop.on, { reduce: app.reduce });
  function openShop() {
    // while building, or in the AI Lab classroom (not during a mission or another card)
    const ok = G.canMenu() || (sb.inClass && !app.levelId && ui.P.modal.classList.contains('hide'));
    if (!ok) { ui.caption(G.S.shop.onlyBuilding, 2600); return null; }
    ui.closePops();
    return shopCard(app, G, { stars: totalStars(), onChange: (st, bought) => {
      G.shop = st; applyCosmetics(); save(); ui.setStars(G.stars = totalStars()); ui.setShop(wallet(G.stars, G.shop), canAffordNew(G.stars, G.shop), G.S.shop);
      if (bought) { audio.star?.(); app.bot?.cheer(); }
    } });
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
    ui.onShop = () => openShop(); ui.wallet = (n) => wallet(n, G.shop); applyCosmetics();
    ui.onLab = () => enterClassroom(); ui.onLens = (id) => toggleLens(id); ui.onTalk = (secs) => app.bot?.talk(secs); ui.onCamToggle = () => reframe();
    // each mission on the track opens that mission when it's ready, otherwise the Lab board
    ui.onTrack = (i) => { const id = LEVEL_ORDER[i]; if (id && !G.busy && sb.running && labReady(id, G.ever, G.labs, G.classMode)) openLab(id); else labBoard(); };
    milestones(sim(), { quiet: true }); // goals already met in a loaded town don't celebrate again
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
    if (sb.intro) return; sb.intro = true; hideTip(); renderCard(); // the card's step now matches the intro's three tiles
    try {
      await runIntro({ app, G, T: { ...G.S.intro, goals: G.S.introGoals },
        selectTool: (cat, tool) => { sb.cat = cat; sb.tool = tool; sb.folded = false; showAllowed(tool); renderBar(); },
        townTiles: () => sim().townTiles,
        videoCard: G.videos?.has('timber') ? (id) => videoCard(ITEMS[id].label, id, null) : null,
        highlight: (sel, on) => document.querySelector(sel)?.classList.toggle('pulse', on) });
    } finally { sb.intro = false; renderCard(); G.introDone = true; save(); sb.adv.last = performance.now(); }
  }
  G.replayIntro = () => { if (!G.busy && sb.running) intro(); };
  // the ☰ menu: the town report and a whole day, only while building (not in a mission or the intro)
  G.openShop = openShop; G.finale = () => { if (G.canMenu() && G.completeShown) celebrateTown(true); }; G.applyCosmetics = applyCosmetics;
  G.canMenu = () => sb.running && !G.busy && !sb.intro; G.showReport = () => { if (G.canMenu()) showReport(); }; G.wholeDay = () => { if (G.canMenu()) wholeDay(); };
  G.showWhere = showWhere;
  G.suggest = () => { const sg = suggestFor(sim()); if (sg) offerSuggestion(sg); return sg?.id || null; };
  G.openLab = openLab; G.labBoard = labBoard; G.enterClassroom = enterClassroom; G.classAsk = classAsk; G.leaveClassroom = leaveClassroom; G.playVideo = playVideo; G.videoCard = videoCard; G.florenceTo = florenceTo; G.placeAt = (k, tool) => { const ok = placeAt(k, tool); if (ok) changed(); return ok; }; G.sim = sim; G.advisor = sb.adv;
  G.saved = () => { try { const d = JSON.parse(localStorage.getItem(SAVE) || 'null'); return d && d.band === G.band ? d : null; } catch { return null; } };
  return G;
}
