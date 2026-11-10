// The town report: map, flower, town name and badge, mistakes caught, the instructions given, diary and charter.
// Shown on screen and printable. Nothing is saved or sent.
import { PETALS } from '../sim/sim.js';
import { TARGETS } from '../world/catalog.js';
import { LEVEL_ORDER } from './levels.js';
import { LEVEL_TEXT } from './content.js';
import { esc, h } from '../ui/ui.js';

const REFLECT = ['check the evidence for myself', 'ask who was included', 'compare the result with the goal', 'ask what it guessed', 'test the hardest day, not a normal one'];
const PETAL_NAME = { homes: 'Homes', food: 'Food', nature: 'Nature', health: 'Health', energy: 'Energy', community: 'Community', carbon: 'Carbon' };
export function renderReport(app, G, s, shot, { onClose = null } = {}) {
  app.ui.only([]); app.ui.caption(null); for (const id of ['tray', 'helper', 'card', 'strip', 'facil']) app.ui.show(id, false);
  const flowerSvg = app.ui.P.flower.querySelector('svg').outerHTML;
  // every mistake caught, including the biased residents' survey in level 6
  const rows = LEVEL_ORDER.map((id) => {
    const ins = G.instructions[id] || []; const oc = G.outcomes[id];
    if (!G.labs?.[id]) return `<tr><td><b>${esc(LEVEL_TEXT[id].title)}</b></td><td colspan="3"><small>${G.j ? 'AI Lab mission not tried yet' : 'AI Lab mission not attempted'}</small></td></tr>`;
    // what happened to the brief, in words: no issue / Florence misunderstood / the plan missed something
    const main = oc ? `<b>${esc(G.C.ui.outcome[oc.kind])}</b><br><small>${esc(oc.detail)}</small>` : '—';
    const bias = G.mistakes.filter((x) => x.level === id && x.bias).map((m) => `<b>${esc(G.C.ui.outcome.missed)}</b><br><small>${G.j ? 'Florence’s survey' : 'Residents’ summary'}: ${esc(m.why)} ${G.j ? 'You asked everyone, and the answer changed.' : 'Balancing the data changed the result.'}</small>`);
    const caught = [main, ...bias].join('<hr>');
    return `<tr><td><b>${esc(LEVEL_TEXT[id].title)}</b></td><td>${ins.length ? ins.map((t, i) => `${i ? '→ ' : ''}“${esc(t)}”`).join('<br>') : '—'}</td><td>${caught}</td><td>${'★'.repeat(G.levelStars[id] || 0)}${'☆'.repeat(3 - (G.levelStars[id] || 0))}${G.bonus[id] ? `<br><small>+ ★ ${G.j ? 'bonus' : 'bonus star'}</small>` : ''}</td></tr>`;
  }).join('');
  // carbon is "lower is better", so it shows the town total against its limit; the other petals show how much of "enough" was reached
  const petalRow = (p) => p === 'carbon'
    ? `<tr><td>${PETAL_NAME[p]}</td><td>${s.carbonOK ? '✅' : '⚠️'} ${s.carbon} of ${TARGETS.carbonCeiling} t town limit <small>(lower is better)</small></td></tr>`
    : `<tr><td>${PETAL_NAME[p]}</td><td>${s.petals[p] >= 1 ? '✅' : '⚠️'} ${Math.round(Math.min(1.5, s.petals[p]) * 100)}% of enough</td></tr>`;
  const n = h(`<div id="report"><div class="sheet">
    <div class="row" style="justify-content:space-between;align-items:center"><div><span class="chip" style="background:#13202b;color:#fff;border-radius:999px;padding:3px 12px;font-weight:800;font-size:.75em">ECO TOWN · ${esc(G.C.name.toUpperCase())}</span><h1>${esc(G.townName)}</h1><p class="badge">Town badge: <b>${esc(s.title)}</b> <small>(from its two strongest petals)</small></p><p style="margin:0;color:#46596a;font-weight:600">${s.families} families (target ${TARGETS.families}) · ${G.stars} stars · ${s.carbonOK ? '' : '⚠️ '}town carbon ${s.carbon} of ${TARGETS.carbonCeiling} t limit (${s.homesCarbon > TARGETS.homesCarbon ? '⚠️ ' : ''}homes’ materials ${s.homesCarbon} of ${TARGETS.homesCarbon} t${s.homesCarbon > TARGETS.homesCarbon ? (G.j ? ': over the homes limit' : ': over the materials limit') : ''}) · ${s.walkMax > TARGETS.walkMinutes ? '⚠️ ' : ''}longest walk to school ${s.walkMax} min (rule: ${TARGETS.walkMinutes})</p></div>
    <div class="noprint row"><button class="btn alt" data-print>🖨 Print</button>${onClose ? '<button class="btn go" data-close>Back to building</button>' : ''}<button class="btn ${onClose ? 'alt' : 'go'}" data-again>Start a new town</button></div></div>
    <div class="grid"><img class="map" src="${shot}" alt="${esc(G.townName)} at dusk"><div><div style="width:100%;max-width:240px;margin:auto">${flowerSvg}</div>
      <table><tr><th>Petal</th><th>How did we do?</th></tr>${PETALS.map(petalRow).join('')}</table></div></div>
    <h2 style="margin-top:18px">${esc(G.C.ui.outcomeHead)}, mission by mission</h2><table><tr><th>AI Lab mission</th><th>Our instructions</th><th>What happened</th><th>Stars</th></tr>${rows}</table>
    <div class="grid" style="margin-top:12px"><div><h2>Family diary</h2>${G.diary.map((d) => `<p>“${esc(d)}”</p>`).join('')}</div><div><h2>Our charter</h2>${G.charter.map((c) => `<p>${c.kept ? '✅' : '⚠️'} ${esc(c.text)}</p>`).join('') || '<p>—</p>'}
    <h2><label for="reflect">Before I trust an AI plan, I…</label></h2><p class="reflecthow">${G.j ? 'Finish the sentence: tap an idea or write your own. Then tell a partner why.' : 'Complete the sentence: pick a check or write your own, then discuss it with a partner.'}</p>
    <div class="reflectchips noprint">${REFLECT.map((r) => `<button class="tile" data-r>${esc(r)}</button>`).join('')}</div>
    <textarea id="reflect" maxlength="300" rows="3" placeholder="…check the evidence. (Your answer stays on this device and prints with the report.)"></textarea><div class="printonly" data-reflect></div></div></div>
    <p style="color:#46596a;font-size:.8em">Florence is a small language model made for this game: she reads your instruction and picks which plan ideas it asks for, then a planner builds exactly that. She runs on this device; what you typed stays on this device and was not sent anywhere.</p>
  </div></div>`);
  document.getElementById('layer').appendChild(n);
  const ta = n.querySelector('#reflect'); const pr = n.querySelector('[data-reflect]');
  ta.value = G.reflection || ''; ta.oninput = () => { G.reflection = ta.value; pr.textContent = 'Before I trust an AI plan, I ' + ta.value; }; ta.oninput();
  n.querySelectorAll('[data-r]').forEach((b) => (b.onclick = () => { const t = b.textContent; ta.value = ta.value.trim() ? `${ta.value.trim().replace(/[.]$/, '')}, and ${t}` : t; ta.oninput(); ta.focus(); }));
  n.querySelector('[data-print]').onclick = () => window.print();
  n.querySelector('[data-again]').onclick = () => { if (!confirm('Start a new town? This town will be cleared.')) return; try { localStorage.removeItem('ecotown.save.v3'); } catch { /* */ } location.reload(); };
  n.querySelector('[data-close]')?.addEventListener('click', () => { n.remove(); onClose(); });
}
