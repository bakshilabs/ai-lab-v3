// DOM overlay components with deterministic, time-driven animation.
import { clamp, ease, prog } from './stage.js';

const root = () => document.getElementById('ui');
export function el(html, { x = 0, y = 0, parent = null, cls = 'abs', anchor = 'tl' } = {}) {
  const d = document.createElement('div');
  d.className = cls;
  d.innerHTML = html;
  d.style.left = x + 'px'; d.style.top = y + 'px';
  d.style.opacity = 0;
  d.dataset.anchor = anchor;
  (parent || root()).appendChild(d);
  return d;
}

// Show element between tIn and tOut with an entrance (pop|up|down|left|right|fade)
export function cue(node, tIn, tOut, { from = 'pop', dur = 0.45, outDur = 0.35, dist = 40 } = {}) {
  return (t) => {
    const a = prog(t, tIn, tIn + dur, from === 'pop' ? ease.back : ease.out);
    const b = tOut == null ? 0 : prog(t, tOut, tOut + outDur, ease.in);
    const v = clamp(a - b);
    node.style.opacity = v;
    node.style.visibility = v <= 0.001 ? 'hidden' : 'visible';
    let tr = '';
    const base = node.dataset.anchor === 'c' ? 'translate(-50%,-50%) ' : node.dataset.anchor === 'tr' ? 'translate(-100%,0) ' : node.dataset.anchor === 'bc' ? 'translate(-50%,-100%) ' : '';
    if (from === 'pop') tr = `scale(${0.6 + 0.4 * a - 0.1 * b})`;
    else if (from === 'up') tr = `translateY(${(1 - a) * dist}px)`;
    else if (from === 'down') tr = `translateY(${-(1 - a) * dist}px)`;
    else if (from === 'left') tr = `translateX(${-(1 - a) * dist * 3}px)`;
    else if (from === 'right') tr = `translateX(${(1 - a) * dist * 3}px)`;
    node.style.transform = base + tr;
    node.style.transformOrigin = 'center';
  };
}

export function sureLabel(p) { return p >= 85 ? 'Very sure' : p >= 60 ? 'Fairly sure' : 'Not sure'; }

export function helperCard(text, sure, { who = 'AI helper', tag = 'GUESS' } = {}) {
  return `<div class="helper"><div class="bot"></div><div class="who">${who} <em>${tag}</em></div><p>${text}</p>
  <div class="sure"><b>${sureLabel(sure)}</b><div class="bar"><i style="width:${sure}%"></i></div><span>${sure}%</span></div></div>`;
}
export function facilCard(text, teal = false) { return `<div class="facil${teal ? ' teal' : ''}"><small>FACILITATOR</small><p>${text}</p></div>`; }
export function badge(name, sub, color, icon) { return `<div class="badge" style="background:${color}"><span class="ic">${icon}</span><span><b>${name}</b><small>${sub}</small></span></div>`; }
export function task(tag, text) { return `<div class="task"><span class="tag">${tag}</span>${text}</div>`; }
export function cardsHTML(head, cards, pick = -1) {
  return `<div><span class="cardhead">${head}</span><div class="cards">${cards.map((c, i) => `<div class="card${c.vague ? ' vague' : ''}${i === pick ? ' pick' : ''}"><span class="k">${c.k}</span><span>${c.text}</span></div>`).join('')}</div></div>`;
}
export function alertHTML(text, good = false) { return `<div class="alert${good ? ' good' : ''}"><span class="x">${good ? '✓' : '✕'}</span>${text}</div>`; }

// A live-updating meter panel. rows: [{icon,label,color,fn:(t)=>value}]
export function meterPanel(rows, { x, y }) {
  const html = `<div class="meters">${rows.map((r, i) => `<div class="meter"><span>${r.icon}</span><span>${r.label}</span><div class="mb"><i data-i="${i}" style="background:${r.color}"></i></div><b data-v="${i}">0</b></div>`).join('')}</div>`;
  const node = el(html, { x, y });
  const bars = rows.map((_, i) => node.querySelector(`i[data-i="${i}"]`));
  const vals = rows.map((_, i) => node.querySelector(`b[data-v="${i}"]`));
  node.update = (t) => rows.forEach((r, i) => { const v = r.fn(t); bars[i].style.width = clamp(v / (r.max || 100)) * 100 + '%'; vals[i].textContent = r.fmt ? r.fmt(v) : Math.round(v); });
  return node;
}

// Project a 3D point to screen pixels
export function toScreen(v3, camera) {
  camera.updateMatrixWorld();
  const p = v3.clone().project(camera);
  return { x: (p.x + 1) / 2 * 1920, y: (1 - p.y) / 2 * 1080, z: p.z };
}

// Simple fx: full-screen fade (black) and white flash
export function fader() {
  const f = document.createElement('div'); f.className = 'fade'; document.getElementById('fx').appendChild(f);
  return (v) => { f.style.opacity = v; };
}

// ---- trailer furniture ----
export function kicker(text, { x = 960, y = 930, size = 64 } = {}) {
  return el(`<div class="kicker" style="font-size:${size}px;text-align:center;white-space:nowrap">${text}</div>`, { x, y, anchor: 'c' });
}
export function titleCard(name, tagline, { chip = 'A DeltaOps Learning AI lab' } = {}) {
  const d = document.createElement('div'); d.className = 'title'; d.style.opacity = 0;
  d.innerHTML = `<div><div class="chip" style="margin-bottom:34px">${chip}</div><h1>${name}</h1><h2>${tagline}</h2>
  <img class="logo" src="../assets/logo-learning-white.svg" style="margin-top:60px;height:60px"></div>`;
  document.getElementById('ui').appendChild(d);
  return d;
}
export function tap(x, y) {
  const d = el(`<div style="width:90px;height:90px;border-radius:50%;border:6px solid #fff;box-shadow:0 0 0 4px rgba(11,127,116,.6)"></div>`, { x, y, anchor: 'c' });
  return (t, t0) => { const k = (t - t0) / 0.6; if (k < 0 || k > 1) { d.style.opacity = 0; return; } d.style.opacity = 1 - k; d.style.transform = `translate(-50%,-50%) scale(${0.4 + k})`; };
}
export function recordPanel(title) {
  return el(`<div class="meters" style="min-width:0;padding:16px 22px"><div style="font-weight:850;font-size:17px;letter-spacing:.14em;color:#46596A">${title}</div><div class="rec" style="display:flex;gap:10px;margin-top:8px;font-size:30px;font-weight:900"></div></div>`);
}
export function setRecord(node, marks) {
  const r = node.querySelector('.rec');
  const s = marks.map((m) => `<span style="width:46px;height:46px;border-radius:12px;display:grid;place-items:center;color:#fff;background:${m ? '#16C79A' : '#FF5D4A'}">${m ? '✓' : '✕'}</span>`).join('');
  if (r.dataset.s !== s) { r.innerHTML = s; r.dataset.s = s; }
}
// Generic icon SVGs (no emoji)
export const ICON = {
  person: `<svg viewBox="0 0 24 24" width="100%" height="100%"><circle cx="12" cy="6" r="3.6" fill="currentColor"/><path d="M6 22v-7a6 6 0 0 1 12 0v7z" fill="currentColor"/></svg>`,
  car: `<svg viewBox="0 0 24 24" width="100%" height="100%"><path d="M3 14l2-6h14l2 6v5h-3v-2H6v2H3z" fill="currentColor"/><circle cx="7" cy="16" r="1.6" fill="#fff"/><circle cx="17" cy="16" r="1.6" fill="#fff"/></svg>`,
  scooter: `<svg viewBox="0 0 24 24" width="100%" height="100%"><circle cx="12" cy="4.5" r="2.8" fill="currentColor"/><path d="M9 9h5l-1 6H9z" fill="currentColor"/><path d="M16 6v12M6 19h12" stroke="currentColor" stroke-width="2.2" fill="none"/><circle cx="6" cy="20" r="2" fill="currentColor"/><circle cx="18" cy="20" r="2" fill="currentColor"/></svg>`,
  moon: `<svg viewBox="0 0 24 24" width="100%" height="100%"><path d="M15 3a9 9 0 1 0 6 15A8 8 0 0 1 15 3z" fill="currentColor"/></svg>`,
  leaf: `<svg viewBox="0 0 24 24" width="100%" height="100%"><path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15z" fill="currentColor"/></svg>`,
  flag: `<svg viewBox="0 0 24 24" width="100%" height="100%"><path d="M5 3v18M5 4h12l-3 4 3 4H5" stroke="currentColor" stroke-width="2.4" fill="currentColor"/></svg>`,
  star: `<svg viewBox="0 0 24 24" width="100%" height="100%"><path d="M12 2.6l2.8 5.7 6.3.9-4.6 4.4 1.1 6.2L12 16.9l-5.6 2.9 1.1-6.2-4.6-4.4 6.3-.9z" fill="currentColor"/></svg>`,
  bolt: `<svg viewBox="0 0 24 24" width="100%" height="100%"><path d="M13 2L4 14h7l-1 8 9-12h-7z" fill="currentColor"/></svg>`,
  sun: `<svg viewBox="0 0 24 24" width="100%" height="100%"><circle cx="12" cy="12" r="5" fill="currentColor"/><g stroke="currentColor" stroke-width="2.2"><path d="M12 1v4M12 19v4M1 12h4M19 12h4M4 4l3 3M17 17l3 3M4 20l3-3M17 7l3-3"/></g></svg>`,
  bag: `<svg viewBox="0 0 24 24" width="100%" height="100%"><path d="M5 8h14l-1 13H6z" fill="currentColor"/><path d="M9 8a3 3 0 0 1 6 0" stroke="currentColor" stroke-width="2" fill="none"/></svg>`,
};
export function thumbs(items) {
  return `<div style="display:flex;gap:12px">${items.map((it) => `<div style="width:84px;height:84px;border-radius:16px;background:${it.bg || '#E2F5EF'};color:${it.c || '#0B7F74'};padding:16px;box-shadow:0 6px 14px rgba(10,30,40,.15)">${ICON[it.i]}</div>`).join('')}</div>`;
}
