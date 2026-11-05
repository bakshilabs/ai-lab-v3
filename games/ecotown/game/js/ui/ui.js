// DOM interface: panels with a strict on-screen budget, the helper card, tray, alerts, centre cards,
// the town flower, world-anchored labels and bubbles, captions and read-aloud.
import * as THREE from 'three';
import { PETALS } from '../sim/sim.js';

export const $ = (s, r = document) => r.querySelector(s);
export function h(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }
export const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const PETAL_COL = { homes: '#ff8a5c', food: '#ffc83d', nature: '#4caf50', health: '#ff7eb6', energy: '#2f9de0', community: '#b28cff', carbon: '#7a8a96' };
const PETAL_ICON = { homes: '🏠', food: '🍎', nature: '🦋', health: '❤', energy: '⚡', community: '🤝', carbon: '☁' };

export function createUI(root, labelsRoot, opts) {
  const P = {};
  const mk = (id, cls, html = '') => { const n = h(`<div id="${id}" class="panel hide ${cls}">${html}</div>`); root.appendChild(n); P[id] = n; return n; };
  mk('badge', 'from-left', '<span class="ic">🌱</span><span><b>Eco Town</b><small data-sub></small></span>');
  mk('task', 'from-left');
  mk('tr', 'from-right', '<div class="pill" data-stars><span class="star">★</span><b>0</b></div><button class="pill" data-menu aria-label="Settings">☰</button>');
  mk('helper', 'from-right');
  mk('tray', 'from-bottom');
  mk('views', 'from-right', '<button data-v="sky" class="on">SKY</button><button data-v="street">STREET</button><button data-v="inside">INSIDE</button>');
  mk('flower', 'from-left', '<svg viewBox="-60 -60 120 120" aria-label="Town flower"></svg><div class="ttl"></div>');
  mk('alert', 'from-top', '<span class="x">✕</span><span data-t></span>');
  mk('lensbar', 'from-top');
  mk('facil', 'from-left', '<small>FACILITATOR</small><p></p>');
  mk('modal', 'modal');
  mk('settings', 'from-right');
  const caption = h('<div id="caption" class="panel hide from-top" style="left:50%;top:calc(12px + 3.6em);transform:translateX(-50%);background:rgba(19,32,43,.9);color:#fff;font-weight:700;padding:8px 16px;border-radius:14px;max-width:80vw;text-align:center"></div>');
  root.appendChild(caption); P.caption = caption;

  const ui = {
    P, readAloud: false, budget: { live: 2, plan: 4 },
    show(id, on = true) { P[id].classList.toggle('hide', !on); },
    only(ids) { for (const id of ['helper', 'tray', 'alert', 'lensbar', 'facil', 'modal', 'settings', 'caption']) this.show(id, ids.includes(id)); },
    visibleCount() { return Object.values(P).filter((n) => !n.classList.contains('hide')).length; },
    setBadge(sub) { P.badge.querySelector('[data-sub]').textContent = sub; this.show('badge'); },
    setTask(lv, text) { P.task.innerHTML = `<span class="lv">${esc(lv)}</span><span>${esc(text)}</span>`; this.show('task'); },
    setStars(n) { const b = P.tr.querySelector('[data-stars] b'); b.textContent = n; this.show('tr'); },
    // helper card: { tag, tagCls, html, sure, sureLabel, why, thinking }
    helper(o) {
      if (!o) { this.show('helper', false); return; }
      P.helper.classList.toggle('thinking', !!o.thinking);
      P.helper.innerHTML = `<div class="bot"><i></i><i></i></div><div class="who">${esc(o.name || 'Plotter')} <em class="${o.tagCls || ''}">${esc(o.tag || 'GUESS')}</em></div>
        <div>${o.html || ''}</div>${o.sure != null ? `<div class="sure"><div class="bar"><i></i></div><span>${o.sure}% ${esc(o.sureLabel || 'sure')}</span></div>` : ''}${o.why ? `<div class="why">${o.why}</div>` : ''}`;
      this.show('helper');
      if (o.sure != null) requestAnimationFrame(() => requestAnimationFrame(() => { const i = P.helper.querySelector('.sure .bar i'); if (i) i.style.width = o.sure + '%'; }));
      if (o.say) this.say(o.say);
    },
    tray(html, bind) { P.tray.innerHTML = html; this.show('tray', !!html); bind?.(P.tray); document.documentElement.style.setProperty('--trayH', P.tray.offsetHeight + 'px'); return P.tray; },
    alert(text, good = false, ms = 0) {
      P.alert.classList.toggle('good', good); P.alert.querySelector('.x').textContent = good ? '✓' : '✕'; P.alert.querySelector('[data-t]').textContent = text; this.show('alert');
      this.say(text); if (ms) setTimeout(() => this.show('alert', false), ms);
    },
    lensbar(html) { if (!html) return this.show('lensbar', false); P.lensbar.innerHTML = html; this.show('lensbar'); },
    facil(text) { if (!text || !opts.facilitator()) return this.show('facil', false); P.facil.querySelector('p').textContent = text; this.show('facil'); },
    // centre card; resolves with the data-act of the button pressed
    modal(html, { say } = {}) {
      P.modal.innerHTML = html; this.show('modal'); if (say) this.say(say);
      const first = P.modal.querySelector('button'); setTimeout(() => first?.focus(), 50);
      return new Promise((res) => { P.modal.onclick = (e) => { const b = e.target.closest('[data-act]'); if (!b) return; P.modal.onclick = null; this.show('modal', false); res(b.dataset.act); }; });
    },
    caption(text, ms = 3500) { if (!text) return this.show('caption', false); P.caption.textContent = text; this.show('caption'); clearTimeout(this._ct); this._ct = setTimeout(() => this.show('caption', false), ms); },
    say(text) {
      if (!this.readAloud || !('speechSynthesis' in window) || !text) return;
      try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(String(text).replace(/[★✕✓☁🌊]/g, '')); u.lang = 'en-GB'; u.rate = 0.98; speechSynthesis.speak(u); } catch { /* speech unavailable */ }
    },
    views(active, enabled = ['sky', 'street', 'inside']) {
      for (const b of P.views.querySelectorAll('button')) { b.classList.toggle('on', b.dataset.v === active); b.disabled = !enabled.includes(b.dataset.v); }
      this.show('views', enabled.length > 0);
    },
    // ---------- town flower (seven petals, "enough" ring at 1.0)
    flower(petals, title, { open = null, flash = false } = {}) {
      const svg = P.flower.querySelector('svg'); const R = 50; let s = `<circle r="${R * 0.62}" fill="none" stroke="#dfe6ea" stroke-width="1.5" stroke-dasharray="3 3"/>`;
      PETALS.forEach((p, i) => {
        const a = (i / PETALS.length) * Math.PI * 2 - Math.PI / 2, v = Math.max(0.08, petals[p] || 0), len = R * 0.62 * Math.min(1.45, v);
        const x = Math.cos(a) * len, y = Math.sin(a) * len, w = 11;
        s += `<g transform="rotate(${(a * 180) / Math.PI + 90})"><ellipse cx="0" cy="${-len / 2}" rx="${w}" ry="${len / 2}" fill="${PETAL_COL[p]}" opacity="${v >= 1 ? 1 : 0.55}"/></g>`;
        s += `<text x="${Math.cos(a) * (R + 1)}" y="${Math.sin(a) * (R + 1) + 4}" font-size="11" text-anchor="middle">${PETAL_ICON[p]}</text>`;
      });
      s += '<circle r="8" fill="#ffd23f"/>'; svg.innerHTML = s;
      P.flower.querySelector('.ttl').textContent = title || '';
      P.flower.setAttribute('title', PETALS.map((p) => `${p}: ${Math.round((petals[p] || 0) * 100)}%`).join(', '));
      this.show('flower');
      if (open !== null) P.flower.classList.toggle('open', open);
      if (flash) { P.flower.classList.add('open'); clearTimeout(this._ft); this._ft = setTimeout(() => P.flower.classList.remove('open'), 2600); }
    },
  };
  P.flower.addEventListener('click', () => P.flower.classList.toggle('open'));

  // ---------- world-anchored labels and bubbles
  const anchored = []; const v3 = new THREE.Vector3();
  ui.labels = {
    set(list) { this.clear('lbl'); for (const l of list) add('lbl ' + (l.cls || ''), l); },
    bubble(b) { const cur = anchored.filter((a) => a.node.classList.contains('bub')); if (cur.length >= 2) remove(cur[0]); add('bub ' + (b.bad ? 'bad' : ''), b); ui.say(b.text); setTimeout(() => remove(anchored.find((a) => a.data === b)), b.ms || 4200); },
    clear(kind) { for (const a of anchored.slice()) if (!kind || a.node.classList.contains(kind)) remove(a); },
    update(camera, canvas) {
      const w = canvas.clientWidth, hgt = canvas.clientHeight;
      for (const a of anchored) {
        const p = typeof a.data.at === 'function' ? a.data.at() : a.data.at; if (!p) continue;
        v3.copy(p).project(camera); const vis = v3.z < 1 && Math.abs(v3.x) < 1.1 && Math.abs(v3.y) < 1.1;
        a.node.style.display = vis ? '' : 'none'; a.node.style.left = ((v3.x + 1) / 2) * w + 'px'; a.node.style.top = ((1 - v3.y) / 2) * hgt + 'px';
      }
    },
  };
  function add(cls, data) { const n = h(`<div class="${cls}">${data.html || esc(data.text)}</div>`); labelsRoot.appendChild(n); anchored.push({ node: n, data }); }
  function remove(a) { if (!a) return; a.node.remove(); anchored.splice(anchored.indexOf(a), 1); }
  return ui;
}
