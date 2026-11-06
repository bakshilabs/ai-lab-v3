// DOM interface: panels with a strict on-screen budget, the helper card, tray, alerts, centre cards,
// the town flower, world-anchored labels and bubbles, captions and read-aloud.
import * as THREE from 'three';
import { PETALS } from '../sim/sim.js';
import { speak, stopSpeech, canSpeak } from './voice.js';

export const $ = (s, r = document) => r.querySelector(s);
export function h(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }
export const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const PETAL_COL = { homes: '#ff8a5c', food: '#ffc83d', nature: '#4caf50', health: '#ff7eb6', energy: '#2f9de0', community: '#b28cff', carbon: '#7a8a96' };
const PETAL_ICON = { homes: '🏠', food: '🍎', nature: '🦋', health: '❤', energy: '⚡', community: '🤝', carbon: '☁' };

export const LEVEL_ICONS = ['🗺', '🚲', '🏡', '🍎', '⚡', '🏫'];
export function createUI(root, labelsRoot, opts) {
  const P = {};
  const mk = (id, cls, html = '') => { const n = h(`<div id="${id}" class="panel hide ${cls}">${html}</div>`); root.appendChild(n); P[id] = n; return n; };
  // one town card (top-left), one icon strip (top-right), one dock (bottom): the whole frame
  mk('card', 'from-left', `<div class="crow"><span class="leaf">🌱</span><b class="brand">Eco Town</b><span class="band" data-sub></span><span class="stars"><span class="star">★</span><b data-stars>0</b></span></div>
    <div class="track" data-track>${LEVEL_ICONS.map((ic, i) => `<i data-l="${i + 1}"><span>${ic}</span></i>`).join('<em></em>')}</div><div class="goal" data-goal></div>`);
  mk('strip', 'from-right', `<button class="ib" data-flower aria-label="Town flower"><svg viewBox="-60 -60 120 120"></svg></button><span class="sep"></span>
    <button class="ib" data-v="sky" aria-label="Sky view">☁</button><button class="ib" data-v="street" aria-label="Street view">👟</button><button class="ib" data-v="inside" aria-label="Inside view">🏠</button><span class="sep"></span><button class="ib" data-menu aria-label="Settings">☰</button>`);
  mk('flowerpop', 'from-right', '<svg viewBox="-60 -60 120 120" aria-label="Town flower"></svg><div class="ttl"></div><div class="legend"></div>');
  mk('dock', 'from-bottom', '<div class="head" data-head></div><div class="speaker" data-speaker></div><div class="actions" data-actions></div>');
  mk('alert', 'pop', '<span class="x">✕</span><span data-t></span>');
  mk('lensbar', 'from-top');
  mk('modal', 'modal');
  mk('settings', 'from-right');
  const D = { head: P.dock.querySelector('[data-head]'), speaker: P.dock.querySelector('[data-speaker]'), actions: P.dock.querySelector('[data-actions]') };
  // facilitator notes live in their own card (top left, under the town card), whatever else is on screen
  mk('facil', 'from-left facilcard'); const facilEl = P.facil; let facilText = null;
  // a dimmed backdrop behind centre cards, so they are always readable and nothing behind them can be clicked
  const backdrop = h('<div id="backdrop" class="hide"></div>'); root.appendChild(backdrop);
  P.tray = D.actions; P.helper = D.speaker; P.tr = P.strip; P.views = P.strip; P.flower = P.flowerpop; P.badge = P.card; P.task = P.card;
  const dockState = { speaker: false, actions: false, head: false };
  const syncDock = () => { P.dock.classList.toggle('hide', !(dockState.speaker || dockState.actions)); D.speaker.style.display = dockState.speaker ? '' : 'none'; D.actions.style.display = dockState.actions ? '' : 'none'; P.dock.classList.toggle('talk-only', dockState.speaker && !dockState.actions); P.dock.classList.toggle('actions-only', !dockState.speaker && dockState.actions); };

  const ui = {
    P, readAloud: false,
    show(id, on = true) {
      if (id === 'helper') { dockState.speaker = on; return syncDock(); }
      if (id === 'tray') { dockState.actions = on; return syncDock(); }
      if (id === 'caption') { if (!on) D.head.classList.remove('on'); return; }
      if (id === 'facil') { facilEl.classList.toggle('hide', !on); return; }
      if (id === 'modal') backdrop.classList.toggle('hide', !on);
      if (id === 'settings') root.classList.toggle('settings-open', on); // dim and lock what's behind the settings sheet
      if (['badge', 'task', 'tr'].includes(id)) id = id === 'tr' ? 'strip' : 'card';
      if (id === 'views' || id === 'flower') id = 'strip';
      P[id]?.classList.toggle('hide', !on);
    },
    only(ids) { for (const id of ['helper', 'tray', 'alert', 'lensbar', 'modal', 'settings', 'caption']) this.show(id, ids.includes(id)); P.flowerpop.classList.add('hide'); },
    setBadge(sub) { P.card.querySelector('[data-sub]').textContent = sub; this.show('card'); this.show('strip'); },
    setTownName(name) { P.card.querySelector('.brand').textContent = name || 'Eco Town'; },
    // n: the current level number (1–6); earlier levels show as done, the current one is highlighted
    setTask(n, text) {
      P.card.querySelector('[data-goal]').textContent = text; n = +n || 0;
      P.card.querySelectorAll('[data-l]').forEach((e) => { const l = +e.dataset.l; e.classList.toggle('done', l < n); e.classList.toggle('on', l === n); });
      this.show('card');
    },
    setStars(n) { const b = P.card.querySelector('[data-stars]'); if (b.textContent !== String(n)) { b.textContent = n; b.parentElement.classList.remove('bump'); void b.offsetWidth; b.parentElement.classList.add('bump'); } this.show('card'); },
    // Florence speaks in the dock: { tag, tagCls, html, sure, sureLabel, why, thinking, mini, say }
    // mini: a small card kept on screen while the player checks her guess
    helper(o) {
      if (!o) { this.show('helper', false); P.dock.classList.remove('mini'); return; }
      D.speaker.className = 'speaker' + (o.thinking ? ' thinking' : '') + (o.tagCls ? ' ' + o.tagCls : '') + (o.mini ? ' mini' : '');
      P.dock.classList.toggle('mini', !!o.mini);
      const line = o.say || (o.html ? h(`<div>${o.html}</div>`).textContent : '');
      D.speaker.innerHTML = `<div class="avatar"><div class="bot"><i></i><i></i></div></div><div class="say"><div class="name">${esc(o.name || 'Florence')} <em class="${o.tagCls || ''}">${esc(o.tag || 'GUESS')}</em>${!o.thinking && line && canSpeak() ? '<button class="spk" data-spk aria-label="Read aloud" title="Read aloud">🔊</button>' : ''}</div>
        <div class="text">${o.html || ''}</div>${o.sure != null ? `<div class="sure"><div class="bar"><i></i></div><span>${o.sure}% ${esc(o.sureLabel || 'sure')}</span></div>` : ''}${o.why ? `<div class="why">${o.why}</div>` : ''}</div>`;
      this.show('helper');
      D.speaker.querySelector('[data-spk]')?.addEventListener('click', () => speak(line, { voice: 'helper', force: true }));
      if (o.sure != null) requestAnimationFrame(() => requestAnimationFrame(() => { const i = D.speaker.querySelector('.sure .bar i'); if (i) i.style.width = o.sure + '%'; }));
      if (o.say && !o.mini) this.say(o.say, o.voice || 'helper');
    },
    tray(html, bind) { D.actions.innerHTML = html; this.show('tray', !!html); bind?.(D.actions); return D.actions; },
    alert(text, good = false, ms = 0) {
      P.alert.classList.toggle('good', good); P.alert.querySelector('.x').textContent = good ? '✓' : '✕'; P.alert.querySelector('[data-t]').textContent = text; this.show('alert');
      this.say(text, 'narrator'); clearTimeout(this._at); if (ms) this._at = setTimeout(() => this.show('alert', false), ms);
    },
    lensbar(html) { if (!html) return this.show('lensbar', false); P.lensbar.innerHTML = html; this.show('lensbar'); },
    // "Florence's plan" key, shown while her see-through plan is on the island
    legend(kind) { if (kind !== 'plan') return this.lensbar(null); this.lensbar(`📐 FLORENCE’S PLAN <span class="legend"><span><i style="background:#ffd23f;opacity:.8"></i>See-through = planned, not built yet</span></span>`); },
    facil(text) { facilText = text || null; this.refreshFacil(); },
    refreshFacil() { if (!facilText || !opts.facilitator()) return this.show('facil', false); facilEl.innerHTML = `<small>FACILITATOR NOTE</small><p>${esc(facilText)}</p>`; this.show('facil'); },
    async modal(html, { say } = {}) {
      // never open a card over one that is still closing (it would look see-through)
      if (!P.modal.classList.contains('hide') || performance.now() - (this._mClosed || 0) < 420) await new Promise((r) => setTimeout(r, Math.max(0, 420 - (performance.now() - (this._mClosed || 0)))));
      P.modal.innerHTML = html + (say && canSpeak() ? '<button class="spk modalspk" data-spk aria-label="Read aloud" title="Read aloud">🔊</button>' : ''); this.show('modal'); if (say) this.say(say, 'narrator');
      P.modal.querySelector('[data-spk]')?.addEventListener('click', (e) => { e.stopPropagation(); speak(say, { voice: 'narrator', force: true }); });
      const first = P.modal.querySelector('button:not([data-spk])'); setTimeout(() => first?.focus(), 50);
      return new Promise((res) => { P.modal.onclick = (e) => { const b = e.target.closest('[data-act]'); if (!b) return; P.modal.onclick = null; this.show('modal', false); this._mClosed = performance.now(); stopSpeech(); res(b.dataset.act); }; });
    },
    // short status line: shown as the dock's headline, or as a toast when the dock is hidden
    caption(text, ms = 3500) {
      if (!text) { D.head.classList.remove('on'); P.toast?.classList.add('hide'); return; }
      const host = P.dock.classList.contains('hide') || P.dock.classList.contains('mini') ? (P.toast ||= (() => { const n = h('<div id="toast" class="panel hide pop"></div>'); root.appendChild(n); return n; })()) : D.head;
      // the toast sits below the lens bar and any alert, never on top of them
      if (host === P.toast) { let y = 92; for (const el of [P.lensbar, P.alert]) if (!el.classList.contains('hide')) { const r = el.getBoundingClientRect(); y = Math.max(y, r.bottom + 10); } P.toast.style.top = y + 'px'; }
      // only one caption at a time: hide the other place, and give each place its own timer
      const other = host === D.head ? P.toast : D.head; if (other) { other.classList.remove('on'); if (other === P.toast) other.classList.add('hide'); }
      host.textContent = text; host.classList.add('on'); host.classList.remove('hide'); clearTimeout(host._t);
      host._t = setTimeout(() => { host.classList.remove('on'); if (host === P.toast) host.classList.add('hide'); }, ms);
    },
    // read aloud (auto for 8–12; 🔊 buttons replay on demand for everyone). voice: 'narrator' or 'helper' (Florence)
    say(text, voice = 'narrator') { if (!text) return; if (!this.readAloud) { globalThis.__sayLog?.push({ text, voice, missing: [], silent: true }); return; } speak(text, { voice }); },
    views(active, enabled = ['sky', 'street', 'inside']) {
      for (const b of P.strip.querySelectorAll('[data-v]')) { b.classList.toggle('on', b.dataset.v === active); b.disabled = !enabled.includes(b.dataset.v); }
      this.show('strip');
    },
    flower(petals, title, { open = null, flash = false } = {}) {
      const R = 50; let s = `<circle r="${R * 0.62}" fill="none" stroke="#e3d5bb" stroke-width="1.5" stroke-dasharray="3 3"/>`;
      PETALS.forEach((p, i) => {
        const a = (i / PETALS.length) * Math.PI * 2 - Math.PI / 2, v = Math.max(0.08, petals[p] || 0), len = R * 0.62 * Math.min(1.45, v);
        s += `<g transform="rotate(${(a * 180) / Math.PI + 90})"><ellipse cx="0" cy="${-len / 2}" rx="11" ry="${len / 2}" fill="${PETAL_COL[p]}" opacity="${v >= 1 ? 1 : 0.5}"/></g>`;
        s += `<text x="${Math.cos(a) * (R + 1)}" y="${Math.sin(a) * (R + 1) + 4}" font-size="11" text-anchor="middle">${PETAL_ICON[p]}</text>`;
      });
      s += '<circle r="8" fill="#ffd23f"/>';
      P.flowerpop.querySelector('svg').innerHTML = s; P.strip.querySelector('[data-flower] svg').innerHTML = s;
      P.flowerpop.querySelector('.ttl').textContent = title || '';
      // 100% = enough for this town (the dashed ring); carbon is shown in tonnes against its limit, since lower is better
      const c = this.carbonInfo;
      P.flowerpop.querySelector('.legend').innerHTML = PETALS.map((p) => p === 'carbon' && c ? `<span>${PETAL_ICON[p]} carbon <b>${c.used} of ${c.limit} t</b></span>` : `<span>${PETAL_ICON[p]} ${p} <b>${Math.round(Math.min(1.5, petals[p] || 0) * 100)}%</b></span>`).join('')
        + `<p class="key">100% (the dashed ring) means <b>enough</b> for the town: more is better. A full, bright petal has reached it. Carbon is the opposite: the town must stay under its ${c ? c.limit : ''} t limit, so its petal grows the further under the limit you are.</p>`;
      this.show('strip');
      if (open !== null) P.flowerpop.classList.toggle('hide', !open);
      if (flash) { const btn = P.strip.querySelector('[data-flower]'); btn.classList.remove('bump'); void btn.offsetWidth; btn.classList.add('bump'); }
    },
  };
  P.strip.querySelector('[data-flower]').addEventListener('click', () => P.flowerpop.classList.toggle('hide'));
  P.flowerpop.addEventListener('click', () => P.flowerpop.classList.add('hide'));


  // ---------- world-anchored labels and bubbles
  const anchored = []; const v3 = new THREE.Vector3();
  ui.labels = {
    set(list) { this.clear('lbl'); for (const l of list) add('lbl ' + (l.cls || ''), l); },
    bubble(b) { const cur = anchored.filter((a) => a.node.classList.contains('bub')); if (cur.length >= 2) remove(cur[0]); add('bub ' + (b.bad ? 'bad' : ''), b); ui.say(b.text, 'narrator'); setTimeout(() => remove(anchored.find((a) => a.data === b)), b.ms || 4200); },
    clear(kind) { for (const a of anchored.slice()) if (!kind || a.node.classList.contains(kind)) remove(a); },
    update(camera, canvas) {
      const w = canvas.clientWidth, hgt = canvas.clientHeight;
      // keep bubbles out from under the town card and the icon strip (top corners)
      const avoid = [P.card, P.strip, P.facil, P.lensbar, P.alert].filter((e) => !e.classList.contains('hide')).map((e) => e.getBoundingClientRect());
      for (const a of anchored) {
        const p = typeof a.data.at === 'function' ? a.data.at() : a.data.at; if (!p) continue;
        v3.copy(p).project(camera); const vis = v3.z < 1 && Math.abs(v3.x) < 1.1 && Math.abs(v3.y) < 1.1;
        let x = ((v3.x + 1) / 2) * w, y = ((1 - v3.y) / 2) * hgt;
        { const bw = a.node.offsetWidth || 160, bh = a.node.offsetHeight || 34; x = Math.max(bw / 2 + 8, Math.min(w - bw / 2 - 8, x)); for (const r of avoid) if (x + bw / 2 > r.left && x - bw / 2 < r.right && y - bh < r.bottom && y > r.top) y = r.bottom + bh + 6; } // never under the HUD, lens bar or alert
        a.node.style.display = vis ? '' : 'none'; a.node.style.left = x + 'px'; a.node.style.top = y + 'px';
      }
    },
  };
  function add(cls, data) { const n = h(`<div class="${cls}">${data.html || esc(data.text)}</div>`); labelsRoot.appendChild(n); anchored.push({ node: n, data }); }
  function remove(a) { if (!a) return; a.node.remove(); anchored.splice(anchored.indexOf(a), 1); }
  return ui;
}
