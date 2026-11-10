// The Star shop card and the "town complete" finale card. Text comes from content.js (SANDBOX[band].shop and
// .finale); the shop rules are js/game/shop.js, the summary js/game/finale.js, the 3D looks js/world/cosmetics.js.
import { esc } from './ui.js';
import { SHOP, wallet, owns, isOn, needs, buy, setOn } from '../game/shop.js';
import { FINALE_GROUPS } from '../game/finale.js';
import { BADGES, badgeCount } from '../game/badges.js';

const GROUP_ICON = { homes: '🏡', food: '🍎', power: '⚡', heart: '🏫', move: '🚲' };

// the shop: one card per reward. Buying spends stars once; owned rewards switch on and off.
// G.shop holds { owned, on }; onChange(shopState, boughtId) saves the town and updates the 3D.
export function openShop(app, G, { stars, onChange }) {
  const T = G.S.shop; const ui = app.ui;
  const card = (r) => {
    const t = T.items[r.id]; const own = owns(G.shop, r.id); const lit = isOn(G.shop, r.id); const need = needs(stars, G.shop, r.id);
    const note = r.motion && app.reduce ? T.motionOff : r.where === 'sky' ? T.dusk : '';
    const btn = own
      ? `<button class="btn tog ${lit ? 'on' : ''}" data-tog="${r.id}" aria-pressed="${lit}" aria-label="${esc(t.name)}: ${esc(lit ? T.on : T.off)}"><span class="sw" aria-hidden="true"><i></i></span>${esc(lit ? T.on : T.off)}</button>`
      : need ? `<button class="btn alt price" disabled aria-disabled="true">🔒 ${esc(T.need(need))}</button>`
        : `<button class="btn go price" data-buy="${r.id}">${esc(T.buy(r.cost))}</button>`;
    return `<li class="shopitem ${own ? 'owned' : need ? 'locked' : 'afford'} ${lit ? 'lit' : ''}"><span class="sico" aria-hidden="true">${r.icon}</span><div class="stxt"><b>${esc(t.name)}</b>${own ? ` <em class="own">✓ ${esc(T.owned)}</em>` : need ? ` <em class="cost" aria-label="${r.cost} stars">★ ${r.cost}</em>` : ''}<small>${esc(t.desc)}</small>${note ? `<small class="note">${esc(note)}</small>` : ''}</div>${btn}</li>`;
  };
  // badges: things to try in the town, each worth a star (js/game/badges.js)
  const badges = () => { const have = G.badges || {}; const j = app.band !== 'senior';
    return `<h3 class="badgehead">${j ? 'Badges' : 'Badges'} <em>${badgeCount(have)} / ${BADGES.length}</em></h3><p class="shopintro">${j ? 'Things to try in your town. Each badge gives you a star.' : 'Challenges for your town. Each badge earns one star.'}</p><ul class="badgegrid">${BADGES.map((b) => `<li class="${have[b.id] ? 'got' : ''}"><span class="sico" aria-hidden="true">${b.icon}</span><div><b>${esc(b.name)}</b>${have[b.id] ? ' <em class="own">✓</em>' : ''}<small>${esc(j ? b.j : b.s)}</small></div></li>`).join('')}</ul>`; };
  const body = () => { const w = wallet(stars, G.shop); return `<div class="wallet"><span class="wstar" aria-hidden="true">★</span><b>${w}</b><span>${esc(T.have(w))}</span></div><p class="shopintro">${esc(T.intro)} <span class="earn">${esc(T.earn)}</span></p><ul class="shopgrid">${SHOP.map(card).join('')}</ul>${badges()}`; };
  return ui.modal(`<div class="ribbon">★ ${esc(T.title)}</div><div data-shopbody>${body()}</div><div class="row" style="justify-content:center"><button class="btn go" data-act="close">${esc(T.done)}</button></div>`, {
    bind: (el) => {
      el.classList.remove('finale'); el.classList.add('shopcard');
      const host = el.querySelector('[data-shopbody]');
      const refresh = (focusSel) => { host.innerHTML = body(); if (focusSel) (host.querySelector(focusSel) || el.querySelector('[data-act="close"]'))?.focus(); };
      host.addEventListener('click', (e) => {
        const b = e.target.closest('[data-buy]'); const tg = e.target.closest('[data-tog]');
        if (b) { const r = buy(G.shop, b.dataset.buy, stars); if (!r.ok) return; G.shop = r.st; onChange?.(G.shop, b.dataset.buy); ui.caption(T.bought(T.items[b.dataset.buy].name), 2600); refresh(`[data-tog="${b.dataset.buy}"]`); }
        else if (tg) { G.shop = setOn(G.shop, tg.dataset.tog); onChange?.(G.shop, null); refresh(`[data-tog="${tg.dataset.tog}"]`); }
      });
    },
  }).finally(() => setTimeout(() => ui.P.modal.classList.remove('shopcard'), 380));
}

// the finale: a side sheet (bottom sheet on phones) so the island can turn behind it.
// sum: townSummary(); left: stars still to spend. Resolves with 'keep' | 'report' | 'shop'.
export function showFinale(app, G, sum, { left = 0, title = '' } = {}) {
  const F = G.S.finale; const pick = (o) => (typeof o === 'string' ? o : G.j ? o.j : o.s);
  const groups = FINALE_GROUPS.filter((g) => sum.groups[g]).map((g) => `<span>${GROUP_ICON[g]} ${sum.groups[g]} ${esc(G.S.cats[g])}</span>`).join('');
  const habits = sum.habits.map((h) => G.C.habits[h]).filter(Boolean).map((h) => `<li><span aria-hidden="true">${h.icon}</span>${esc(h.label)}</li>`).join('');
  const tile = (icon, label, big, sub, cls = '') => `<div class="ftile ${cls}"><span class="fico" aria-hidden="true">${icon}</span>${label ? `<small>${esc(label)}</small>` : ''}<b>${big}</b>${sub ? `<span class="fsub">${sub}</span>` : ''}</div>`;
  const say = `${F.title(G.townName)} ${pick(G.S.completeText)}`;
  document.documentElement.dataset.finale = 'on';
  return app.ui.modal(`<div class="ribbon green">🎉 ${esc(G.S.completeRibbon)}</div>
    <h2>${esc(F.title(G.townName))}</h2>${title ? `<p class="fbadge">🏅 ${esc(title)}</p>` : ''}<p class="flead">${esc(pick(G.S.completeText))}</p>
    <div class="fgrid">
      ${tile('🏡', F.built, esc(F.builds(sum.builds)), `${groups ? `<span class="fgroups">${groups}</span>` : ''}<span class="ffam">👪 ${esc(F.families(sum.families))}</span>`, 'wide')}
      ${tile('🔍', F.caught, sum.caught, esc(F.caughtSub(sum.missionMistakes, sum.catches)))}
      ${tile('★', F.stars, sum.stars, esc(F.starsSub(left)), 'star')}
    </div>
    ${habits ? `<h3 class="fhead">${esc(F.habits)}</h3><ul class="fhabits">${habits}</ul>` : ''}
    <p class="flesson">💡 ${esc(F.lesson)}</p>
    <div class="row frow"><button class="btn alt" data-act="keep">${esc(G.S.keepBuilding)}</button>${left ? `<button class="btn alt" data-act="shop">★ ${esc(F.shop)}</button>` : ''}<button class="btn go" data-act="report">📜 ${esc(F.report)}</button></div>`,
  { say, bind: (el) => { el.classList.remove('shopcard'); el.classList.add('finale'); setTimeout(() => { el.scrollTop = 0; }, 90); } })
    .finally(() => { delete document.documentElement.dataset.finale; setTimeout(() => app.ui.P.modal.classList.remove('finale'), 380); });
}
