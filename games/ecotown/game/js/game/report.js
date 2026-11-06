// The town report: map, flower, town name and badge, mistakes caught, the instructions given, diary and charter.
// Shown on screen and printable. Nothing is saved or sent.
import { PETALS } from '../sim/sim.js';
import { TARGETS } from '../world/catalog.js';
import { LEVEL_ORDER } from './levels.js';
import { LEVEL_TEXT } from './content.js';
import { esc, h } from '../ui/ui.js';

const PETAL_NAME = { homes: 'Homes', food: 'Food', nature: 'Nature', health: 'Health', energy: 'Energy', community: 'Community', carbon: 'Carbon' };
export function renderReport(app, G, s, shot) {
  app.ui.only([]); app.ui.caption(null); for (const id of ['tray', 'helper', 'card', 'strip', 'facil']) app.ui.show(id, false);
  const flowerSvg = app.ui.P.flower.querySelector('svg').outerHTML;
  // every mistake caught, including the biased residents' survey in level 6
  const rows = LEVEL_ORDER.map((id) => {
    const ms = G.mistakes.filter((x) => x.level === id); const ins = G.instructions[id] || [];
    const caught = ms.length ? ms.map((m) => `<b>${esc(G.C.habits[m.habit].label)}</b>${m.why ? `<br><small>${esc(m.why)}</small>` : ''}`).join('<hr>') : esc(G.C.ui.firstTry);
    return `<tr><td><b>${esc(LEVEL_TEXT[id].title)}</b></td><td>${ins.map((t, i) => `${i ? '→ ' : ''}“${esc(t)}”`).join('<br>')}</td><td>${caught}</td><td>${'★'.repeat((G.levelStars[id] || 0) + (G.bonus[id] || 0))}</td></tr>`;
  }).join('');
  // carbon is "lower is better", so it shows the town total against its limit; the other petals show how much of "enough" was reached
  const petalRow = (p) => p === 'carbon'
    ? `<tr><td>${PETAL_NAME[p]}</td><td>${s.carbonOK ? '✅' : '⚠️'} ${s.carbon} of ${TARGETS.carbonCeiling} t limit</td></tr>`
    : `<tr><td>${PETAL_NAME[p]}</td><td>${s.petals[p] >= 1 ? '✅' : '⚠️'} ${Math.round(Math.min(1.5, s.petals[p]) * 100)}% of enough</td></tr>`;
  const n = h(`<div id="report"><div class="sheet">
    <div class="row" style="justify-content:space-between;align-items:center"><div><span class="chip" style="background:#13202b;color:#fff;border-radius:999px;padding:3px 12px;font-weight:800;font-size:.75em">ECO TOWN · ${esc(G.C.name.toUpperCase())}</span><h1>${esc(G.townName)}</h1><p class="badge">Town badge: <b>${esc(s.title)}</b> <small>(from its two strongest petals)</small></p><p style="margin:0;color:#46596a;font-weight:600">${s.families} families · ${G.stars} stars · carbon ${s.carbon} of ${TARGETS.carbonCeiling} t · longest walk to school ${s.walkMax} min (rule: ${TARGETS.walkMinutes})</p></div>
    <div class="noprint row"><button class="btn alt" data-print>🖨 Print</button><button class="btn go" data-again>Play again</button></div></div>
    <div class="grid"><img class="map" src="${shot}" alt="${esc(G.townName)} at dusk"><div><div style="width:100%;max-width:240px;margin:auto">${flowerSvg}</div>
      <table><tr><th>Petal</th><th>How did we do?</th></tr>${PETALS.map(petalRow).join('')}</table></div></div>
    <h2 style="margin-top:18px">Mistakes we caught</h2><table><tr><th>Level</th><th>Our instructions</th><th>Florence’s habit</th><th>Stars</th></tr>${rows}</table>
    <div class="grid" style="margin-top:12px"><div><h2>Family diary</h2>${G.diary.map((d) => `<p>“${esc(d)}”</p>`).join('')}</div><div><h2>Our charter</h2>${G.charter.map((c) => `<p>${c.kept ? '✅' : '⚠️'} ${esc(c.text)}</p>`).join('') || '<p>—</p>'}
    <h2><label for="reflect">Before I trust an AI plan, I…</label></h2><textarea id="reflect" maxlength="300" rows="3" placeholder="Type your answer (it stays on this device, and prints with the report)"></textarea><div class="printonly" data-reflect></div></div></div>
    <p style="color:#46596a;font-size:.8em">Florence is a small language model made for this game: she reads your instruction and picks which plan ideas it asks for, then a planner builds exactly that. She runs on this device; nothing you typed was stored or sent.</p>
  </div></div>`);
  document.getElementById('layer').appendChild(n);
  const ta = n.querySelector('#reflect'); const pr = n.querySelector('[data-reflect]');
  ta.value = G.reflection || ''; ta.oninput = () => { G.reflection = ta.value; pr.textContent = ta.value; }; pr.textContent = ta.value;
  n.querySelector('[data-print]').onclick = () => window.print();
  n.querySelector('[data-again]').onclick = () => location.reload();
}
