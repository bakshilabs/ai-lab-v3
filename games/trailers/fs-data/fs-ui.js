// Future Skills strand UI helpers (shared by fs-data and fs-model). Builds on engine/ui.js; does not change it.
import * as THREE from 'three';
import { el, cue, toScreen } from '../engine/ui.js';
import { prog, lerp, clamp, ease } from '../engine/stage.js';

export const SVG = {
  tick: (c = '#fff') => `<svg viewBox="0 0 24 24"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="${c}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  doc: (c = '#0b7f62') => `<svg viewBox="0 0 24 24"><path d="M6 2h8l5 5v15H6z" fill="none" stroke="${c}" stroke-width="2.4" stroke-linejoin="round"/><path d="M9 12h7M9 16h7" stroke="${c}" stroke-width="2.4" stroke-linecap="round"/></svg>`,
  grid: (c = '#0b7f62') => `<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="${c}" stroke-width="2.4"/><path d="M3 10h18M3 15h18M9 4v16" stroke="${c}" stroke-width="2"/></svg>`,
  chart: (c = '#0b7f62') => `<svg viewBox="0 0 24 24"><path d="M4 20V4M4 20h16" stroke="${c}" stroke-width="2.4" fill="none"/><rect x="7" y="11" width="3" height="7" fill="${c}"/><rect x="12" y="7" width="3" height="11" fill="${c}"/><rect x="17" y="14" width="3" height="4" fill="${c}"/></svg>`,
  check: (c = '#0b7f62') => `<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" fill="none" stroke="${c}" stroke-width="2.6"/><path d="M16 16l5 5" stroke="${c}" stroke-width="2.6" stroke-linecap="round"/></svg>`,
  mark: `<svg viewBox="0 0 24 24"><path d="M12 3l9 16H3z" fill="none" stroke="#16c79a" stroke-width="3" stroke-linejoin="round"/></svg>`,
  lock: (c = '#13202b') => `<svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="11" rx="2.5" fill="${c}"/><path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="${c}" stroke-width="2.6"/></svg>`,
  flask: (c = '#0b7f62') => `<svg viewBox="0 0 24 24"><path d="M9 3h6M10 3v6l-5 10a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-10V3" fill="none" stroke="${c}" stroke-width="2.4" stroke-linejoin="round"/><path d="M7.5 15h9" stroke="${c}" stroke-width="2.4"/></svg>`,
};

// Type text in over [t0,t1] (keeps HTML tags intact by revealing plain text only)
export function typed(text, t, t0, t1) { const n = Math.round(text.length * clamp((t - t0) / (t1 - t0))); return text.slice(0, n); }

export function makeFS(A, camera) {
  const api = {
    // persistent top-left app bar with the lab name and strand chip
    appbar(lab, tIn, tOut, icon = SVG.mark) {
      const n = el(`<div class="fs-bar"><span class="mk">${icon}</span><b>${lab}</b><span class="fs-chip">DeltaOps Learning · Future Skills</span></div>`, { x: 46, y: 36 });
      A(cue(n, tIn, tOut, { from: 'left' }));
      return n;
    },
    card(html, tIn, tOut, { x, y, w, anchor = 'tl', from = 'up', cls = 'fs-card' } = {}) {
      const n = el(`<div class="${cls}" style="${w ? `width:${w}px` : ''}">${html}</div>`, { x, y, anchor });
      A(cue(n, tIn, tOut, { from }));
      return n;
    },
    brief({ from, task, due, deliver }, tIn, tOut, { x = 1000, y = 150, w = 874 } = {}) {
      return api.card(`<div class="fs-brief"><div class="fs-top"><span class="ttl"><span class="ic">${SVG.doc()}</span>New brief</span><span class="fs-pill amber">Due: ${due}</span></div>
        <div class="rows"><div class="row"><span>Brief from</span><b>${from}</b></div><div class="row"><span>Task</span><b>${task}</b></div>${deliver ? `<div class="row"><span>Hand in</span><b>${deliver}</b></div>` : ''}<div class="row"><span>Due</span><b>${due}</b></div></div></div>`, tIn, tOut, { x, y, w, from: 'right' });
    },
    ai({ text, sure, data, tag = 'draft' }, tIn, tOut, { x = 1000, y = 500, w = 874, from = 'right' } = {}) {
      const n = el(`<div class="fs-ai" style="width:${w}px"><div class="hd"><span class="bot"></span><span style="color:#fff">AI colleague</span><em>${tag}</em></div><p>${text}</p>
        <div class="ft"><div class="sure"><div class="bar"><i style="width:${sure}%"></i></div><span>${sure}% sure</span></div></div>
        <div style="margin-top:16px"><span class="data">Data I used: <b>${data}</b></span></div></div>`, { x, y });
      A(cue(n, tIn, tOut, { from }));
      return n;
    },
    // check chips: states(t) -> array of 'idle'|'run'|'ok'|'warn'|'bad'
    checksHTML() { return `<div class="fs-checks">${['Data', 'Case', 'Source', 'Authority'].map((k) => `<div class="fs-check" data-k="${k}"><i></i>${k}</div>`).join('')}</div>`; },
    bindChecks(node, states) {
      const chips = [...node.querySelectorAll('.fs-check')];
      A((t) => { const s = states(t); chips.forEach((c, i) => { const st = s[i]; const cls = 'fs-check' + (st && st !== 'idle' ? ' ' + st : ''); if (c.className !== cls) { c.className = cls; c.querySelector('i').textContent = st === 'ok' ? '✓' : st === 'bad' ? '✕' : st === 'warn' ? '!' : st === 'run' ? '…' : ''; } }); });
    },
    // caption anchored to a 3D point (fn(t) -> Vector3)
    caption(html, at, tIn, tOut, { cls = '', dy = -10 } = {}) {
      const n = el(`<div class="fs-cap ${cls}">${html}</div>`, { x: 0, y: 0 });
      n.className = 'abs';
      const inner = n.firstChild;
      A((t) => {
        const a = prog(t, tIn, tIn + 0.4, ease.back), b = tOut == null ? 0 : prog(t, tOut, tOut + 0.3, ease.in);
        const v = clamp(a - b); n.style.opacity = v; n.style.visibility = v < 0.001 ? 'hidden' : 'visible';
        if (v <= 0) return;
        const p = toScreen(at(t), camera);
        n.style.left = p.x + 'px'; n.style.top = (p.y + dy) + 'px';
        inner.style.transform = `translate(-50%,-100%) scale(${0.7 + 0.3 * a})`; inner.style.transformOrigin = '50% 100%';
      });
      return n;
    },
    signHTML(name, age, note = 'Signed off · sent to the client') {
      return `<div class="fs-sign"><span class="tk">${SVG.tick()}</span><span>Reviewed by: ${name}, age ${age}<small>${note}</small></span></div>`;
    },
    folder(title, sub, tIn, tOut, { x, y }) {
      const n = el(`<div class="fs-folder"><div class="back"></div><div class="front"><b>${title}</b><small data-sub>${sub}</small></div></div>`, { x, y });
      A(cue(n, tIn, tOut, { from: 'up' }));
      return n;
    },
    // a node flies from its spot into a target point and shrinks
    fly(node, t0, t1, { dx, dy, s = 0.2, fadeAt = 0.85 }) {
      A((t) => {
        if (t < t0) return;
        const k = prog(t, t0, t1, ease.inOut);
        node.style.transformOrigin = '0 0';
        node.style.transform = `translate(${dx * k}px, ${dy * k}px) scale(${lerp(1, s, k)})`;
        if (k > fadeAt) { const o = 1 - (k - fadeAt) / (1 - fadeAt); node.style.opacity = o; node.style.visibility = o <= 0.001 ? 'hidden' : 'visible'; }
      });
    },
    pathway({ lab, next, nextSub, award, awardSub, route, routeSub, jobs }, tIn, tOut) {
      const n = el(`<div class="fs-card fs-path"><div class="hd"><div class="lab"><h2>${lab}</h2></div><span class="fs-chip" style="font-size:24px;padding:10px 22px">DeltaOps Learning · Future Skills</span></div>
        <div class="cols"><div class="col"><span>Next step</span><b>${next}</b><small>${nextSub}</small></div>
        <div class="col"><span>Award</span><b>${award}</b><small>${awardSub}</small></div>
        <div class="col"><span>Route</span><b>${route}</b><small>${routeSub}</small></div>
        <div class="arr">→</div>
        <div class="col jobs"><span>Jobs</span><b>${jobs.join('<br>')}</b></div></div></div>`, { x: 960, y: 500, anchor: 'c' });
      A(cue(n, tIn, tOut, { from: 'pop', dur: 0.6 }));
      return n;
    },
  };
  return api;
}

// Canvas texture helper for in-world screens
export function screenTex(w, h, draw) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d'); draw(g, w, h);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
  tex.redraw = (fn) => { g.clearRect(0, 0, w, h); fn(g, w, h); tex.needsUpdate = true; };
  return tex;
}
