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

// reveal a block by growing its height (the card grows with it), k in 0..1
export function grow(node, k, max = 240) { node.style.maxHeight = (k * max) + 'px'; node.style.opacity = clamp(k * 1.4 - 0.2); node.style.overflow = 'hidden'; node.style.display = k <= 0 ? 'none' : ''; }

// warm brochure daylight (shared by fs-data and fs-model)
export function warmLight(st) {
  const { sun, hemi, rim, renderer } = st;
  document.getElementById('bg').style.background = 'linear-gradient(180deg, #4aaefc 0%, #8fd0ff 52%, #e6f4ff 100%)';
  sun.color.set('#ffe1b0'); sun.intensity = 3.0; sun.position.set(-60, 115, 75);
  hemi.color.set('#d6ecff'); hemi.groundColor.set('#8a6438'); hemi.intensity = 1.25;
  rim.color.set('#ffe9c8'); rim.intensity = 0.6;
  renderer.toneMappingExposure = 1.1;
  const sc = sun.shadow.camera; sc.left = sc.bottom = -75; sc.right = sc.top = 75; sc.updateProjectionMatrix();
}

// like engine cue(), but cards leave with a quick slide off the right edge (no half-transparent ghost over the island)
export function cueS(node, tIn, tOut, { from = 'right', dur = 0.45, outDur = 0.3, dist = 40 } = {}) {
  return (t) => {
    const a = prog(t, tIn, tIn + dur, from === 'pop' ? ease.back : ease.out);
    const b = tOut == null ? 0 : prog(t, tOut, tOut + outDur, ease.in);
    const v = b >= 1 ? 0 : a;
    node.style.opacity = v; node.style.visibility = v <= 0.001 ? 'hidden' : 'visible';
    let tr = from === 'pop' ? `scale(${0.6 + 0.4 * a})` : from === 'up' ? `translateY(${(1 - a) * dist}px)` : from === 'down' ? `translateY(${-(1 - a) * dist}px)` : `translateX(${(1 - a) * dist * 3}px)`;
    if (b > 0) tr += ` translateX(${b * 1000}px)`;
    node.style.transform = tr; node.style.transformOrigin = 'center';
  };
}

export function makeFS(A, camera) {
  const api = {
    cueS,
    // persistent top-left app bar with the lab name and strand chip
    appbar(lab, tIn, tOut, icon = SVG.mark) {
      const n = el(`<div class="fs-bar"><span class="mk">${icon}</span><b>${lab}</b><span class="fs-chip">DeltaOps Learning · Future Skills</span></div>`, { x: 46, y: 36 });
      A(cue(n, tIn, tOut, { from: 'left' }));
      return n;
    },
    card(html, tIn, tOut, { x, y, w, anchor = 'tl', from = 'up', cls = 'fs-card' } = {}) {
      const n = el(`<div class="${cls}" style="${w ? `width:${w}px` : ''}">${html}</div>`, { x, y, anchor });
      A(cueS(n, tIn, tOut, { from }));
      return n;
    },
    brief({ from, task, due, deliver }, tIn, tOut, { x = 1000, y = 150, w = 874 } = {}) {
      return api.card(`<div class="fs-brief"><div class="fs-top"><span class="ttl"><span class="ic">${SVG.doc()}</span>New brief</span><span class="fs-pill amber">Due: ${due}</span></div>
        <div class="rows"><div class="row"><span>Brief from</span><b>${from}</b></div><div class="row"><span>Task</span><b>${task}</b></div>${deliver ? `<div class="row"><span>Hand in</span><b>${deliver}</b></div>` : ''}<div class="row"><span>Due</span><b>${due}</b></div></div></div>`, tIn, tOut, { x, y, w, from: 'right' });
    },
    ai({ text, sure, data, tag = 'draft' }, tIn, tOut, { x = 1000, y = 500, w = 874, from = 'right' } = {}) {
      const n = el(`<div class="fs-ai" style="width:${w}px"><div class="hd"><span class="bot"></span><span style="color:#fff">AI colleague</span><em data-tag>${tag}</em></div><p data-claim>${text}</p>
        <div class="ft"><div class="sure"><div class="bar"><i data-bar style="width:${sure}%"></i></div><span data-sure>${sure}% sure</span></div></div>
        <div style="margin-top:16px"><span class="data" data-pill>Data I used: <b>${data}</b></span></div></div>`, { x, y });
      A(cueS(n, tIn, tOut, { from }));
      n.sure0 = sure;
      return n;
    },
    // the AI card reacts: flag its data pill at flagAt; at retAt strike the claim, flip to "Returned" and drop the % to sure2
    // v2: { at, name, text, sure, data } -> the card comes back as "V2 · re-checked by <name>" with a confidence number
    aiReact(n, { flagAt = null, retAt, sure2 = null, retLabel = 'Returned', retNote = 'Sent back', sureNote = 'on new photos', v2 = null }) {
      const p = n.querySelector('[data-claim]'), tag = n.querySelector('[data-tag]'), bar = n.querySelector('[data-bar]'), su = n.querySelector('[data-sure]'), pill = n.querySelector('[data-pill]');
      const tag0 = tag.textContent, text0 = p.innerHTML, pill0 = pill.innerHTML;
      const set = (node, key, val) => { if (node.dataset[key] !== val) { node.dataset[key] = val; return true; } return false; };
      A((t) => {
        const isV2 = v2 && t >= v2.at;
        if (isV2) {
          if (set(p, 'v', '2')) { p.innerHTML = v2.text; pill.innerHTML = `Data I used: <b>${v2.data}</b>`; }
          p.classList.remove('struck'); pill.classList.remove('flag'); tag.classList.remove('ret'); tag.classList.add('v2');
          tag.textContent = `V2 · re-checked by ${v2.name}`;
          const k = prog(t, v2.at, v2.at + 0.35, ease.out);
          n.style.boxShadow = k < 1 ? `0 0 0 ${8 * (1 - k)}px rgba(22,199,154,.5)` : '';
          bar.style.width = v2.sure + '%'; bar.classList.remove('low'); su.textContent = `${v2.sure}% sure`;
          return;
        }
        if (set(p, 'v', '1')) { p.innerHTML = text0; pill.innerHTML = pill0; }
        tag.classList.remove('v2');
        if (flagAt != null) pill.classList.toggle('flag', t >= flagAt);
        const r = t >= retAt; p.classList.toggle('struck', r); tag.classList.toggle('ret', r); tag.textContent = r ? retLabel : tag0;
        const k = prog(t, retAt, retAt + 0.6, ease.out);
        const s = Math.round(lerp(n.sure0, sure2 == null ? 8 : sure2, k));
        bar.style.width = s + '%'; bar.classList.toggle('low', r);
        su.textContent = !r ? `${n.sure0}% sure` : sure2 != null ? `${s}% ${sureNote}` : retNote;
      });
    },
    // in-card check row with one-line reasons: steps = [[k(0..3), runAt, doneAt, 'ok'|'bad'|'warn', reason, fixAt?, fixReason?, reRunAt?]]
    checkList(steps) {
      return `<div class="fs-cl">${steps.map((s, i) => `<div class="fs-clr" data-cl="${i}"><span class="fs-check"><i></i>${['Data', 'Case', 'Source', 'Authority'][s[0]]}</span><span class="why" data-why></span></div>`).join('')}</div>`;
    },
    bindCheckList(node, steps) {
      const rows = [...node.querySelectorAll('[data-cl]')];
      A((t) => rows.forEach((r, i) => {
        const [, run, done, res, why, rerun, fixDone, fixWhy] = steps[i];
        const shown = t >= run; r.style.display = shown ? '' : 'none';
        if (!shown) return;
        let st, txt;
        if (rerun != null && t >= rerun) { st = t < fixDone ? 'run' : 'ok'; txt = t < fixDone ? 'Re-checking…' : fixWhy; }
        else { st = t < done ? 'run' : res; txt = t < done ? 'Checking…' : why; }
        const c = r.querySelector('.fs-check'); const cls = 'fs-check ' + st; if (c.className !== cls) { c.className = cls; c.querySelector('i').textContent = st === 'ok' ? '✓' : st === 'bad' ? '✕' : st === 'warn' ? '!' : '…'; }
        const w = r.querySelector('[data-why]'); if (w.dataset.h !== txt) { w.innerHTML = txt; w.dataset.h = txt; w.className = 'why ' + st; }
        const k = prog(t, run, run + 0.3, ease.out); r.style.opacity = k; r.style.transform = `translateX(${(1 - k) * 24}px)`;
      }));
    },
    // 3D-anchored name tag / speech bubble (fully opaque, no ghosting)
    tag(html, at, tIn, tOut, cls = 'fs-ntag') {
      const n = el(`<div class="${cls}">${html}</div>`, { x: 0, y: 0, anchor: 'bc' });
      A(cue(n, tIn, tOut, { from: 'pop', dur: 0.35, outDur: 0.2 }));
      A((t) => { if (n.style.visibility === 'hidden') return; const p = toScreen(at(t), camera); n.style.left = p.x + 'px'; n.style.top = (p.y - 10) + 'px'; });
      return n;
    },
    // portfolio: the student's own pieces from this trailer only; items = [[title, sub, appearAt, isNew]]
    portfolio(name, items, tIn, tOut, { x = 1000, y = 150 } = {}) {
      const n = el(`<div class="fs-port"><span class="tabf">PORTFOLIO · ${name}</span><div class="body">${items.map(([a, b, , nw], i) => `<div class="it${nw ? ' nw' : ''}" data-it="${i}"><i></i><span>${a}<small>${b}</small></span>${nw ? '<span class="new">NEW</span>' : ''}</div>`).join('')}</div></div>`, { x, y });
      A(cueS(n, tIn, tOut, { from: 'right' }));
      A((t) => n.querySelectorAll('[data-it]').forEach((r, i) => { const k = prog(t, items[i][2], items[i][2] + 0.35, ease.back); r.style.opacity = clamp(k * 1.5); r.style.transform = `translateY(${(1 - k) * 30}px)`; }));
      return n;
    },
    // end: island on the left, lab title + pathway rows stacked on the right (bright sky)
    endRight(lab, tagline, tIn, { x = 1000, y = 70 } = {}) {
      const n = el(`<div class="fs-etitle"><span class="fs-chip2">DeltaOps Learning · Future Skills</span><h1>${lab}</h1><h2>${tagline}</h2></div>`, { x, y });
      A(cue(n, tIn, null, { from: 'up', dur: 0.6 }));
      return n;
    },
    pathRows({ next, award, route, jobs }, tIn, { x = 1000, y = 400 } = {}) {
      const n = el(`<div class="fs-card fs-path2"><div class="top"><span class="tag">PATHWAY</span><h3>Where this skill goes next</h3></div>
        <div class="row"><span>Next step</span><b>${next}</b></div><div class="row"><span>Award</span><b>${award}</b></div>
        <div class="row"><span>Route</span><b>${route}</b></div><div class="row"><span>Jobs</span><div class="jobs">${jobs.map((j) => `<i>${j}</i>`).join('')}</div></div>
        <div class="lg"><img src="../assets/logo-learning.svg"></div></div>`, { x, y });
      A(cue(n, tIn, null, { from: 'up', dur: 0.6 }));
      return n;
    },
    // opening title on the sky above the island
    openTitle(lab, tagline, tIn, tOut) {
      const n = el(`<div class="fs-otitle"><span class="fs-chip2">DeltaOps Learning · Future Skills</span><h1>${lab}</h1><h2>${tagline}</h2></div>`, { x: 0, y: 70 });
      A(cue(n, tIn, tOut, { from: 'pop', dur: 0.6 }));
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
      const n = el(`<div class="fs-folder"><div class="back"></div><div class="paper" data-paper></div><div class="front"><b>${title}</b><small data-sub>${sub}</small></div></div>`, { x, y });
      A(cue(n, tIn, tOut, { from: 'up' }));
      n.paperAt = (t0) => A((t) => { const p = n.querySelector('[data-paper]'); const k = prog(t, t0, t0 + 0.35, ease.back); p.style.opacity = k > 0 ? 1 : 0; p.style.transform = `translateY(${(1 - k) * 60}px) rotate(-4deg)`; });
      return n;
    },
    // a node flies from its spot into a target point and shrinks
    fly(node, t0, t1, { dx, dy, s = 0.2, fadeAt = 0.85 }) {
      A((t) => {
        if (t < t0) return;
        const k = prog(t, t0, t1, ease.inOut);
        node.style.transformOrigin = '0 0'; node.style.zIndex = 20;
        node.style.transform = `translate(${dx * k}px, ${dy * k}px) scale(${lerp(1, s, k)})`;
        if (k > fadeAt) { const o = 1 - (k - fadeAt) / (1 - fadeAt); node.style.opacity = o; node.style.visibility = o <= 0.001 ? 'hidden' : 'visible'; }
      });
    },
    // end: lab title on the sky (top) and an opaque pathway card (bottom); the island sits between them
    endTitle(lab, tagline, tIn) {
      const n = el(`<div class="fs-endt"><span class="fs-chip">DeltaOps Learning · Future Skills</span><h1>${lab}</h1><h2>${tagline}</h2></div>`, { x: 0, y: 30 });
      A(cue(n, tIn, null, { from: 'down', dur: 0.6 }));
      return n;
    },
    pathway({ next, nextSub, award, awardSub, route, routeSub, jobs }, tIn, tOut) {
      const n = el(`<div class="fs-card fs-path"><div class="hd"><span class="tag">PATHWAY</span><span class="ph">Where this skill goes next</span><img src="../assets/logo-learning.svg"></div>
        <div class="cols"><div class="col"><span>Next step</span><b>${next}</b><small>${nextSub}</small></div>
        <div class="col"><span>Award</span><b>${award}</b><small>${awardSub}</small></div>
        <div class="col"><span>Route</span><b>${route}</b><small>${routeSub}</small></div>
        <div class="col jobs"><span>Jobs</span><b>${jobs.join('<br>')}</b></div></div></div>`, { x: 960, y: 1046, anchor: 'bc' });
      A(cue(n, tIn, tOut, { from: 'up', dur: 0.6, dist: 80 }));
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
