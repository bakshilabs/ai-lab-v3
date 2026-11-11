// The club passport card and its printable certificate (rules: js/game/passport.js).
import { passport, RANKS } from '../game/passport.js';
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const MED = { gold: '🥇', silver: '🥈', bronze: '🥉' };
const PART = { stars: ['★', 'Mission stars'], complete: ['🎉', 'Town complete'], town: ['🏡', 'Town medal'], challenges: ['🏆', 'Challenge medals'], catches: ['🔍', 'Florence’s wrong ideas caught'] };
export function readDevice() { try { return JSON.parse(localStorage.getItem('ecotown.best.v1') || '{}'); } catch { return {}; } }

export function passportHtml(band, dev = readDevice()) {
  const p = passport(dev, band); const pct = p.next ? Math.round(100 * (p.points - p.rank.at) / (p.next.at - p.rank.at)) : 100;
  return `<div class="passport"><span class="chip">🎒 CLUB PASSPORT</span>
    <h2 class="prank"><span aria-hidden="true">${p.rank.icon}</span> ${esc(p.rank.name)}</h2>
    <div class="pbar" role="progressbar" aria-label="Points to the next rank" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><i style="width:${pct}%"></i><span>${p.points} points${p.next ? ` · ${p.next.need} more for ${esc(p.next.name)}` : ' · top rank'}</span></div>
    <ol class="pranks" aria-label="Ranks">${RANKS.map((r, i) => `<li class="${i <= p.rankIndex ? 'got' : ''}${i === p.rankIndex ? ' now' : ''}"><b aria-hidden="true">${r.icon}</b><span>${esc(r.name)}</span><small>${r.at}</small></li>`).join('')}</ol>
    <ul class="pparts">${p.parts.map((x) => `<li><b aria-hidden="true">${PART[x.id][0]}</b><span>${esc(PART[x.id][1])}</span><em>${x.got} / ${x.max}</em></li>`).join('')}</ul>
    <ul class="pch" aria-label="Challenge towns">${p.challenges.map((c) => `<li class="${c.medal ? 'got' : ''}" title="${esc(c.name)}"><b aria-hidden="true">${c.medal ? MED[c.medal] : c.icon}</b><span>${esc(c.name)}</span></li>`).join('')}</ul>
    <p class="ptip">➜ <b>Next:</b> ${esc(p.tip.text)}</p></div>`;
}

// the certificate: one printed page. No names are stored: the child writes their own on the line.
export function printCertificate(band, dev = readDevice()) {
  const p = passport(dev, band); document.getElementById('certificate')?.remove();
  const el = document.createElement('div'); el.id = 'certificate';
  el.innerHTML = `<div class="cert"><p class="ctop">DeltaOps Learning · Eco Town</p><h1>${p.rank.icon} ${esc(p.rank.name)}</h1>
    <p class="cline">This certificate belongs to <span class="cname"></span></p>
    <p>${p.town.name ? `who planned the town of <b>${esc(p.town.name)}</b>` : 'who planned a town on a floating island'}${p.town.score ? ` (town score ${Math.round(p.town.score)} out of 100${p.town.medal ? `, ${MED[p.town.medal]} ${p.town.medal}` : ''})` : ''}, earned <b>${p.stars}</b> mission stars, caught Florence the AI planner being confidently wrong <b>${p.catches}</b> time${p.catches === 1 ? '' : 's'}${p.challenges.some((c) => c.medal) ? `, and won these challenge towns:` : '.'}</p>
    ${p.challenges.some((c) => c.medal) ? `<ul>${p.challenges.filter((c) => c.medal).map((c) => `<li>${MED[c.medal]} ${esc(c.name)}</li>`).join('')}</ul>` : ''}
    <h2>Before I trust an AI’s plan, I…</h2><ol><li>say clearly what I want, and what must be protected;</li><li>ask what it guessed or left out;</li><li>check its plan against evidence before I use it.</li></ol>
    <p class="cfoot">${p.points} club points · ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p></div>`;
  document.body.appendChild(el); document.documentElement.dataset.print = 'cert';
  const done = () => { delete document.documentElement.dataset.print; el.remove(); window.removeEventListener('afterprint', done); };
  window.addEventListener('afterprint', done); window.print();
}
