// Visit a town (best-seller plan, stage 4): a town opened from its code, READ-ONLY. The visitor can look around,
// walk the streets, look inside a home, run every lens and read the score, goals and medal. Nothing can be built,
// and nothing is saved: this file never runs the building game (createGame) and never writes to storage, so the
// visitor's own town cannot be touched. Everything shown is worked out again here by the honest simulation.
import * as THREE from 'three';
import { ITEMS } from '../world/catalog.js';
import { ZONES } from '../world/terrain.js';
import { emptyCell, natureBaseline } from '../sim/sim.js';
import { CONTENT, SANDBOX } from './content.js';
import { createChecks } from './checks.js';
import { summarize, layoutName, PART_WORD, MEDAL_WORD } from './townshare.js';
import { esc, h } from '../ui/ui.js';

const MED = { gold: '🥇', silver: '🥈', bronze: '🥉' };
const LENSES = ['flood', 'access', 'carbon', 'nature', 'winter', 'walk'];
// Florence's one line about what a lens shows in this town. She only reads out what the lens measured: here she is
// a guide, not a planner, so there is nothing for her to be wrong about.
function florenceLine(id, s, j) {
  if (!s.homes.length) return j ? 'Nobody lives here yet, so this lens has little to show. What would you build first?' : 'No homes yet, so this lens shows little. What would you build first?';
  if (id === 'flood') return s.townFlooded ? (j ? `The blue land floods in winter, and ${s.townFlooded} of this town’s tiles are on it. Which homes would you move?` : `${s.townFlooded} town tiles sit on the winter floodplain. Which would you move, and where to?`) : (j ? 'This town kept off the land that floods in winter. Where did its planners build instead?' : 'No town land on the floodplain. Look at where the planners built instead.');
  if (id === 'carbon') return j ? `This town makes ${s.carbon} tonnes of carbon; the limit is 160. The red tiles make the most. What are they?` : `Town carbon is ${s.carbon} t against a 160 t limit. Which builds carry most of it?`;
  if (id === 'nature') { const gone = ['deer', 'bees', 'otters', 'birds', 'frogs'].filter((a) => !s.species?.[a]); return gone.length ? (j ? `The ${gone.join(' and ')} have left this island. Which land did they need?` : `Missing here: ${gone.join(', ')}. Which habitat was built on?`) : (j ? 'All five animals still live here. Find the land this town left wild.' : 'All five species remain. Find the habitat this town kept.'); }
  if (id === 'winter') return s.power.winterOK ? (j ? 'On a still, dark winter night every home here keeps its lights on. What makes the power?' : `Winter-night supply ${Math.round(s.power.winterSupply)} covers demand ${Math.round(s.power.demand)}. Find the generation and the storage.`) : (j ? 'On a still winter night some homes here go dark. What would you add?' : `Winter-night supply ${Math.round(s.power.winterSupply)} is under demand ${Math.round(s.power.demand)}. What would you add?`);
  if (id === 'walk') return !s.schoolKey ? (j ? 'This town has no school of its own yet. Where would you put one?' : 'No town school yet. Where should it go?') : (j ? `The longest walk to school here is ${s.walkMax} minutes. The rule is 15. Is that fair for every home?` : `Longest walk to school: ${s.walkMax} min (rule: 15). Which homes are furthest?`);
  if (id === 'access') return j ? 'Green routes are smooth and step-free. Could someone in a wheelchair reach the school and the ferry here?' : 'Green is step-free. Follow the routes to the school and the ferry: where do they break?';
  return '';
}

// town = a decoded code's town; opts = { from: 'wall' | null, onBack(where) }
export async function runVisit(app, town, { from = null, onBack } = {}) {
  const { world, ui, rig, stage, terrain, life } = app; const band = town.band; const j = band !== 'senior';
  const sum = summarize(terrain, town); const s = sum.sim;
  // a town from another island layout: ask for that island once (?island=<name>, see LAYOUTS in towncode.js). If this
  // game does not know the layout, the buildings are shown on this island with the score their own device worked out.
  { const want = layoutName(town.layout); const q = new URLSearchParams(location.search);
    if (!sum.sameIsland && want && q.get('island') !== want && !q.has('islandtried')) { q.set('island', want); q.set('islandtried', '1'); location.search = q.toString(); return null; } } const cells = sum.cells; const S = SANDBOX[band];
  app.band = band; app.C = CONTENT[band]; app.natureStart = natureBaseline(terrain); app.hour = 11; app.levelId = null; app.inLab = false; app.briefTargets = []; app.briefMinutes = null; app.visiting = true;
  document.documentElement.dataset.visit = 'on';
  const blocked = () => { ui.caption(j ? 'This is a visitor’s town: you can look, but you cannot build here.' : 'A visitor’s town is read-only: nothing can be built here.', 3200); return false; };
  // a stand-in for the building game, with only what the camera views, the menu and the tests look at. No save.
  app.G = { band, j, C: app.C, S, cells, visiting: true, challenge: null, townName: sum.heading, catches: town.catches || 0, slot: null, canMenu: () => false, sim: () => s, save() {}, placeAt: blocked, summary: sum };
  app.refreshLights = () => world.setLights(!s.homes.length ? [] : s.power.winterOK ? s.homes.map((x) => x.k) : s.homes.slice(0, Math.floor(s.homes.length * 0.4)).map((x) => x.k));
  for (const t of terrain.tiles.values()) world.setCell(t.k, cells.get(t.k) || emptyCell(), { animate: false, reduce: true });
  life.setTown(s, cells, stage.q); stage.setTime(app.hour, 0); app.refreshLights(); app.setMusic?.('day'); app.bot?.show(true);
  const checks = createChecks(app);

  // ---- the frame: the town card (title, score), the icon strip (goals, lenses, camera, menu) and the visitor banner
  ui.only([]); ui.views('sky'); ui.facil(null); ui.show('card'); ui.show('strip');
  ui.setTownName(sum.heading); ui.setBadge(j ? 'VISITING' : 'VISITING'); ui.setDay(null); ui.setCredits('');
  for (const n of [ui.P.card.querySelector('[data-shop]'), ui.P.card.querySelector('[data-track]'), ui.P.strip.querySelector('[data-lab]'), ui.P.strip.querySelector('.sep')]) if (n) n.style.display = 'none'; // no shop, missions or AI Lab in someone else's town
  const scoreLine = `${sum.medal ? MED[sum.medal] + ' ' : ''}Town score ${sum.total} / 100${sum.medal ? ` · ${MEDAL_WORD[sum.medal]}` : ''}`;
  ui.P.card.querySelector('[data-goal]').innerHTML = `<span class="gt">${esc(scoreLine)} · ${s.familiesSafe} ${j ? 'families' : 'households'}</span>`;
  ui.carbonInfo = { used: s.carbon, limit: 160 }; ui.flower(s.petals, s.title);
  const done = sum.goals.filter((g) => g.ok).length; const nx = sum.score.next;
  ui.setGoals(`<div class="tscore" data-medal="${sum.medal || ''}"><b>Town score <span>${sum.total}</span><small>/100</small>${sum.medal ? ` <em>${MED[sum.medal]} ${MEDAL_WORD[sum.medal]}</em>` : ''}</b>
    <small>${sum.strong.length ? `Strongest: ${sum.strong.map((p) => esc(PART_WORD[p.id].toLowerCase())).join(' and ')}. ` : ''}${sum.weak ? `Most to gain: ${esc(PART_WORD[sum.weak.id].toLowerCase())}. ` : ''}${sum.sameIsland && nx ? `${nx.need} more for ${MEDAL_WORD[nx.id].toLowerCase()}.` : ''}${sum.sameIsland ? '' : ' Built on another island: this is the score its own device worked out.'}</small></div>
    <b class="gtitle">${j ? 'This town’s goals' : 'This town’s targets'} <em>${esc(S.goalsDone(done))}</em></b><ul>${sum.goals.map((g) => `<li class="${g.ok ? 'ok' : ''}"><i aria-hidden="true">${g.ok ? '✓' : '○'}</i><span><b>${esc(S.goal[g.id](s).replace(/^\p{Ll}/u, (c) => c.toUpperCase()))}</b></span></li>`).join('')}</ul>
    <p class="gstats">🏘 ${s.townTiles} ${esc(S.tiles)} · 👪 ${s.familiesSafe} ${esc(S.families)} · ${sum.builds} builds${town.catches ? ` · 🔍 ${town.catches} of Florence’s wrong ideas caught` : ''}</p>`);

  const bar = h(`<div id="visitbar" role="region" aria-label="A visitor’s town"><div class="vtext"><b><span aria-hidden="true">👀</span> A visitor’s town</b><span>${esc(sum.heading)} · ${esc(scoreLine)}. ${j ? 'Look around, walk the streets and try every lens. You cannot build here, and your own town is safe.' : 'Read-only: look around and run every lens. Your own town is untouched.'}</span></div>
    <div class="vbtns">${from === 'wall' ? '<button class="btn alt" data-vwall>🧱 Back to the club wall</button>' : ''}<button class="btn go" data-vback>🏡 Back to my town</button></div></div>`);
  document.getElementById('layer').appendChild(bar);
  { const setH = () => document.documentElement.style.setProperty('--visith', bar.offsetHeight + 'px'); setH(); if (typeof ResizeObserver === 'function') new ResizeObserver(setH).observe(bar); } // Florence's card sits just above the banner (CSS)
  bar.querySelector('[data-vback]').onclick = () => onBack?.('home'); bar.querySelector('[data-vwall]')?.addEventListener('click', () => onBack?.('wall'));

  // the island sits between the top strip and the banner
  const frameView = () => {
    const cam = stage.camera; const W = innerWidth, H = innerHeight; const r = bar.getBoundingClientRect(); const top = Math.max(70, ui.P.card.getBoundingClientRect().bottom + 8);
    cam.setViewOffset(W, H, 0, Math.round((H - r.top - top) / 2), W, H); rig.inset = { left: 0, right: 0, top, bottom: H - r.top };
  };
  app.frameView = frameView; addEventListener('resize', () => requestAnimationFrame(frameView));

  // Florence's card, with the same ✕ as her tips while building
  const florenceSays = (tag, line) => { const el = ui.florence({ tag, html: `<p>${esc(line)}</p><button class="tipx" data-tipx aria-label="Close" title="Close">✕</button>`, say: line }); el?.querySelector('[data-tipx]')?.addEventListener('click', (e) => { e.stopPropagation(); ui.florence(null); }); };
  // ---- lenses: all six, on this town as it is
  let lens = null, busy = false;
  const renderLenses = () => ui.setLenses(LENSES.map((id) => ({ id, icon: app.C.checks[id].icon, label: app.C.checks[id].label, on: lens === id })), S.lenses);
  async function toggleLens(id) {
    if (busy) return; busy = true;
    try {
      ui.florence(null);
      if (lens) { const was = lens; lens = null; await checks.leave(); renderLenses(); if (was === id) return; }
      lens = id; renderLenses(); if (id !== 'winter') stage.setTime(12.5, 0);
      const r = await checks.run(id, s, cells, {});
      if (lens !== id) return;
      const when = ui.P.lensbar.querySelector('.when'); if (when) when.textContent = j ? 'A visitor’s town' : 'Visited town';
      if (r.info?.summary) ui.caption(`${app.C.checks[id].label}: ${r.info.summary}`, 5000);
      ui.P.lensbar.insertAdjacentHTML('beforeend', `<button class="btn small alt lensx" data-lensx>✕ ${esc(S.closeLens)}</button>`);
      ui.P.lensbar.querySelector('[data-lensx]').onclick = () => toggleLens(id);
      const line = florenceLine(id, s, j); if (line) florenceSays(j ? 'LOOK' : 'OBSERVE', line);
    } finally { busy = false; }
  }
  ui.onLens = toggleLens; ui.onLab = null; ui.onShop = null; ui.onTrack = null; renderLenses();
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && lens && ui.P.modal.classList.contains('hide') && ui.P.settings.classList.contains('hide')) toggleLens(lens); });

  // ---- a tap names what is on a tile; it never builds
  rig.onTap = (ndc) => {
    if (lens || rig.mode !== 'sky') return; const k = world.pick(ndc, stage.camera); if (!k) return;
    const t = terrain.tiles.get(k); const c = cells.get(k); const it = c?.item && ITEMS[c.item];
    if (it) { const mods = (c.mods || []).map((m) => ITEMS[m].label.toLowerCase()); ui.caption(`${it.label}${mods.length ? ` (with ${mods.join(', ')})` : ''}: ${j ? it.desc.j : it.desc.s}`, 5200); ui.labels.set([{ at: world.tileTop(k).add(new THREE.Vector3(0, 6, 0)), text: it.label }]); setTimeout(() => ui.labels.clear('lbl'), 2600); }
    else if (t?.fixed) ui.caption(t.fixed === 'ailab' ? 'Florence’s AI Lab' : t.fixed === 'dock' ? 'The ferry dock' : 'The old island school', 2600);
    else if (c?.mark === 'wild') ui.caption(j ? `Kept wild: ${ZONES[t.zone].label.toLowerCase()} left for plants and animals.` : `Kept wild (${ZONES[t.zone].label.toLowerCase()}).`, 3200);
    else blocked();
  };
  rig.onAltTap = () => blocked(); rig.onHover = null; rig.onDoubleTap = (ndc) => { if (rig.mode !== 'sky') return; const k = world.pick(ndc, stage.camera); if (k) rig.focus(world.tileTop(k), { dist: 55, pitch: 0.6 }, 1.1); };

  rig.startTurntable(0); requestAnimationFrame(() => { frameView(); rig.overview(app.reduce ? 0.01 : 1.0, true); });
  // Florence says hello once, as a guide
  setTimeout(() => { if (!lens && !busy) florenceSays(j ? 'VISITING' : 'VISIT', j ? `Welcome to ${sum.heading}! Someone else planned this town. Tap 🔍 and pick a lens: what did they get right, and what would you check?` : `This is ${sum.heading}, planned by someone else. Run the lenses: what holds up, and what would you question?`); }, 1400);
  return { sum, toggleLens };
}
