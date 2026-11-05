// The town report: map, flower, title, mistakes caught, the instructions given, diary and charter.
// Shown on screen and printable. Nothing is saved or sent.
import { PETALS } from '../sim/sim.js';
import { LEVEL_ORDER } from './levels.js';
import { LEVEL_TEXT } from './content.js';
import { esc, h } from '../ui/ui.js';

export function renderReport(app, G, s, shot) {
  app.ui.only([]); for (const id of ['tray', 'helper', 'views', 'flower', 'tr', 'task', 'badge']) app.ui.show(id, false);
  const flowerSvg = app.ui.P.flower.querySelector('svg').outerHTML;
  const rows = LEVEL_ORDER.map((id) => {
    const m = G.mistakes.find((x) => x.level === id); const ins = G.instructions[id] || [];
    return `<tr><td><b>${esc(LEVEL_TEXT[id].title)}</b></td><td>${ins.map((t, i) => `${i ? '→ ' : ''}“${esc(t)}”`).join('<br>')}</td><td>${m ? esc(G.C.habits[m.habit].label) : esc(G.C.ui.firstTry)}</td><td>${'★'.repeat(G.levelStars[id] || 0)}</td></tr>`;
  }).join('');
  const n = h(`<div id="report"><div class="sheet">
    <div class="row" style="justify-content:space-between;align-items:center"><div><span class="chip" style="background:#13202b;color:#fff;border-radius:999px;padding:3px 12px;font-weight:800;font-size:.75em">ECO TOWN · ${esc(G.C.name.toUpperCase())}</span><h1>${esc(s.title)}</h1><p style="margin:0;color:#46596a;font-weight:600">${s.families} families · ${G.stars} stars · carbon ${s.carbon} t · longest walk to school ${s.walkMax} min</p></div>
    <div class="noprint row"><button class="btn alt" data-print>🖨 Print</button><button class="btn go" data-again>Play again</button></div></div>
    <div class="grid"><img class="map" src="${shot}" alt="Your town at dusk"><div><div style="width:100%;max-width:240px;margin:auto">${flowerSvg}</div>
      <table><tr><th>Petal</th><th>Enough?</th></tr>${PETALS.map((p) => `<tr><td>${p}</td><td>${s.petals[p] >= 1 ? '✅' : '⚠️'} ${Math.round(s.petals[p] * 100)}%</td></tr>`).join('')}</table></div></div>
    <h2 style="margin-top:18px">Mistakes we caught</h2><table><tr><th>Level</th><th>Our instructions</th><th>Plotter’s habit</th><th>Stars</th></tr>${rows}</table>
    <div class="grid" style="margin-top:12px"><div><h2>Family diary</h2>${G.diary.map((d) => `<p>“${esc(d)}”</p>`).join('')}</div><div><h2>Our charter</h2>${G.charter.map((c) => `<p>${c.kept ? '✅' : '⚠️'} ${esc(c.text)}</p>`).join('') || '<p>—</p>'}
    <h2>Before I trust an AI plan, I…</h2><p style="border-bottom:2px dashed #cfd8de;height:2.2em"></p></div></div>
    <p style="color:#46596a;font-size:.8em">Plotter is a small language model and planner made for this game. It runs on this device; nothing you typed was stored or sent.</p>
  </div></div>`);
  app.ui.P.tray.parentElement.appendChild(n);
  n.querySelector('[data-print]').onclick = () => window.print();
  n.querySelector('[data-again]').onclick = () => location.reload();
}
