// Future Skills strand helpers (shared by fs-impact and fs-creative; keep the two copies identical).
import * as THREE from 'three';
import { Vox, person } from '../engine/kit.js';
import { el, toScreen } from '../engine/ui.js';
import { clamp, prog, ease } from '../engine/stage.js';

// ---------- fine furniture voxels (0.25 world units) ----------
export const Q = 0.25;
export class Furn {
  constructor() { this.v = new Vox(); this.v.jitter = 0.03; }
  box(x0, y0, z0, x1, y1, z1, c) { const a = (n) => Math.round(n / Q); this.v.box(a(x0), a(y0), a(z0), a(x1) - 1, a(y1) - 1, a(z1) - 1, c); return this; }
  mesh() { return this.v.mesh({ scale: Q }); }
}
// floor top is at y = F
export function table(f, F, x0, z0, x1, z1, { top = '#f4efe6', leg = '#5b6770', h = 1.1 } = {}) {
  f.box(x0, F + h - 0.25, z0, x1, F + h, z1, top);
  for (const [x, z] of [[x0, z0], [x1 - 0.25, z0], [x0, z1 - 0.25], [x1 - 0.25, z1 - 0.25]]) f.box(x, F, z, x + 0.25, F + h - 0.25, z + 0.25, leg);
}
// facing: direction the sitter faces: 'n' (-z), 's' (+z), 'e' (+x), 'w' (-x)
export function chair(f, F, x, z, facing, { c = '#2f4858', seat = 0.5 } = {}) {
  f.box(x - 0.5, F + seat - 0.25, z - 0.5, x + 0.5, F + seat, z + 0.5, c);
  f.box(x - 0.125, F, z - 0.125, x + 0.125, F + seat - 0.25, z + 0.125, '#3d4a54');
  const b = { n: [x - 0.5, z + 0.5, x + 0.5, z + 0.75], s: [x - 0.5, z - 0.75, x + 0.5, z - 0.5], e: [x - 0.75, z - 0.5, x - 0.5, z + 0.5], w: [x + 0.5, z - 0.5, x + 0.75, z + 0.5] }[facing];
  f.box(b[0], F + seat, b[1], b[2], F + seat + 1.0, b[3], c);
}
const FACE = { n: 0, s: Math.PI, e: -Math.PI / 2, w: Math.PI / 2 };
export function seated(opts, x, z, facing, F, seat = 0.5) {
  const p = person(opts); const s = opts.s || 0.32;
  p.children[0].rotation.x = p.children[1].rotation.x = Math.PI / 2;
  p.position.set(x, F + seat - 2 * s, z); p.rotation.y = FACE[facing];
  p.userData.base = p.position.clone();
  return p;
}
export function standing(opts, x, z, facing, F) {
  const p = person(opts); p.position.set(x, F, z); p.rotation.y = typeof facing === 'number' ? facing : FACE[facing]; p.userData.base = p.position.clone(); return p;
}
export function plant(f, F, x, z, { pot = '#d9734a', h = 1.6 } = {}) {
  f.box(x - 0.375, F, z - 0.375, x + 0.375, F + 0.75, z + 0.375, pot);
  const L = ['#3f9d4a', '#4caf50', '#2f8a43', '#5bbd5a'];
  for (let i = 0; i < 18; i++) { const a = i * 2.4, r = 0.25 + (i % 3) * 0.2, y = F + 0.75 + (i % 6) * h / 6; f.box(x + Math.cos(a) * r - 0.125, y, z + Math.sin(a) * r - 0.125, x + Math.cos(a) * r + 0.125, y + 0.25, z + Math.sin(a) * r + 0.125, L[i % 4]); }
}
// flat glowing screen (plane) with a canvas texture, facing dir n/s/e/w
export function screenPlane(scene, w, h, draw, { pos, facing = 's', px = 256 } = {}) {
  const cv = document.createElement('canvas'); cv.width = px; cv.height = Math.round(px * h / w);
  const g = cv.getContext('2d'); draw(g, cv.width, cv.height);
  const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }));
  m.position.set(...pos); m.rotation.y = { s: 0, n: Math.PI, e: Math.PI / 2, w: -Math.PI / 2 }[facing];
  scene.add(m); m.userData.redraw = (fn) => { fn(g, cv.width, cv.height); tex.needsUpdate = true; };
  return m;
}
// monitor body (voxels) + its screen plane. (x,z) = centre of the screen; facing = direction the screen faces
export function monitor(f, scene, F, x, z, facing, draw, { w = 1.5, h = 1.0, y = 1.15 } = {}) {
  const ns = facing === 'n' || facing === 's';
  const d = { s: 1, n: -1, e: 1, w: -1 }[facing];
  const hx = ns ? w / 2 : 0.125, hz = ns ? 0.125 : w / 2;
  f.box(x - hx, F + y, z - hz, x + hx, F + y + h, z + hz, '#26323c');
  f.box(x - 0.125 - (ns ? 0 : d * 0.125), F + y - 0.4, z - 0.125 - (ns ? d * 0.125 : 0), x + 0.125 - (ns ? 0 : d * 0.125), F + y, z + 0.125 - (ns ? d * 0.125 : 0), '#3d4a54');
  const off = 0.135 * d;
  return screenPlane(scene, w - 0.16, h - 0.16, draw, { pos: [x + (ns ? 0 : off), F + y + h / 2, z + (ns ? off : 0)], facing });
}
export function laptop(f, scene, F, x, z, facing, draw, { y = 1.1 } = {}) {
  // base flat on the table, lid at the far side facing the user
  const d = { s: -1, n: 1, e: -1, w: 1 }[facing]; // lid offset direction (away from the user)
  const ns = facing === 'n' || facing === 's';
  f.box(x - (ns ? 0.5 : 0.375), F + y, z - (ns ? 0.375 : 0.5), x + (ns ? 0.5 : 0.375), F + y + 0.125, z + (ns ? 0.375 : 0.5), '#b9c3cb');
  const lx = ns ? x : x + d * 0.375, lz = ns ? z + d * 0.375 : z;
  f.box(lx - (ns ? 0.5 : 0.0625), F + y, lz - (ns ? 0.0625 : 0.5), lx + (ns ? 0.5 : 0.0625), F + y + 0.75, lz + (ns ? 0.0625 : 0.5), '#9aa6b0');
  const face = facing; // screen faces the user
  const o = -d * 0.075;
  return screenPlane(scene, 0.86, 0.6, draw, { pos: [lx + (ns ? 0 : o), F + y + 0.4, lz + (ns ? o : 0)], facing: face, px: 160 });
}

// screen drawings
export const draw = {
  sheet: (accent = '#16c79a') => (g, w, h) => { g.fillStyle = '#ffffff'; g.fillRect(0, 0, w, h); g.fillStyle = accent; g.fillRect(0, 0, w, h * 0.16); g.fillStyle = '#dfe6ea'; for (let r = 1; r < 8; r++) g.fillRect(0, h * 0.16 + r * h * 0.105, w, 2); for (let c = 1; c < 4; c++) g.fillRect(c * w / 4, h * 0.16, 2, h); g.fillStyle = '#9fb0bc'; for (let r = 0; r < 7; r++) for (let c = 0; c < 4; c++) g.fillRect(c * w / 4 + 8, h * 0.2 + r * h * 0.105, (w / 4 - 20) * (0.4 + ((r * 7 + c * 3) % 5) / 8), h * 0.04); },
  chart: (accent = '#16c79a') => (g, w, h) => { g.fillStyle = '#ffffff'; g.fillRect(0, 0, w, h); g.fillStyle = '#13202b'; g.fillRect(0, 0, w, h * 0.14); const v = [0.4, 0.62, 0.5, 0.78, 0.66, 0.9]; v.forEach((k, i) => { g.fillStyle = i === 5 ? '#ff8a4a' : accent; g.fillRect(w * 0.1 + i * w * 0.14, h * 0.92 - k * h * 0.66, w * 0.09, k * h * 0.66); }); },
  doc: (accent = '#16c79a') => (g, w, h) => { g.fillStyle = '#ffffff'; g.fillRect(0, 0, w, h); g.fillStyle = accent; g.fillRect(w * 0.08, h * 0.1, w * 0.5, h * 0.08); g.fillStyle = '#c3cdd4'; for (let r = 0; r < 6; r++) g.fillRect(w * 0.08, h * 0.28 + r * h * 0.11, w * (r % 3 === 2 ? 0.5 : 0.8), h * 0.045); g.fillStyle = '#ffd36b'; g.fillRect(w * 0.08, h * 0.5, w * 0.6, h * 0.05); },
  dark: () => (g, w, h) => { g.fillStyle = '#13202b'; g.fillRect(0, 0, w, h); g.fillStyle = '#16c79a'; g.fillRect(w * 0.1, h * 0.18, w * 0.3, h * 0.08); g.fillStyle = '#5c7385'; for (let r = 0; r < 5; r++) g.fillRect(w * 0.1, h * 0.36 + r * h * 0.11, w * (r % 2 ? 0.55 : 0.75), h * 0.045); },
};

// ---------- UI ----------
export const ICO = {
  brief: '<svg viewBox="0 0 24 24"><path d="M8 4h8v3h4v13H4V7h4z" fill="#fff"/><path d="M10 5.6h4V7h-4z" fill="#16c79a"/><path d="M7 11h10M7 14.5h7" stroke="#16c79a" stroke-width="1.8"/></svg>',
  tick: '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  person: (c) => `<svg viewBox="0 0 24 24"><circle cx="12" cy="7" r="4" fill="${c}"/><path d="M4 22v-3a8 7 0 0 1 16 0v3z" fill="${c}"/></svg>`,
};
export function ui(html, x, y, anchor = 'tl') { return el(html, { x, y, anchor, cls: 'abs fs' }); }
export const briefHTML = ({ from, task, due }) => `<div class="fs-card fs-brief"><span class="ic">${ICO.brief}</span>
  <div class="f"><span class="fs-lbl">Brief from</span><b>${from}</b></div>
  <div class="f"><span class="fs-lbl">Task</span><b>${task}</b></div>
  <div class="f due"><span class="fs-lbl">Due</span><b>${due}</b></div></div>`;
export const briefChipHTML = (txt) => `<div class="fs-card fs-bchip"><span class="ic">${ICO.brief}</span>${txt}</div>`;
export const aiHTML = ({ text, sure, data, state = 'DRAFT' }) => `<div class="fs-ai"><div class="hd"><span class="bot"><i></i></span><span class="who">AI colleague <em>· draft</em></span><span class="st">${state}</span></div>
  <p>${text}</p><div class="ft"><span class="sure"><span class="bar"><i style="width:${sure}%"></i></span>${sure}% sure</span><span class="data"><b>DATA I USED</b>${data}</span></div></div>`;
export const findHTML = (title, steps, ok = false) => `<div class="fs-card fs-find${ok ? ' ok' : ''}"><div class="hd"><i>${ok ? '✓' : '✕'}</i>${title}</div><div class="bd">${steps.map(([k, v]) => `<div class="fs-step"><span>${k}</span><b${v.cls ? ` class="${v.cls}"` : ''}>${v.t || v}</b></div>`).join('')}</div></div>`;
export const signHTML = (name, age) => `<div class="fs-sign"><span class="tick">${ICO.tick}</span><span><small>SIGNED OFF</small><b>Reviewed by: ${name}, age ${age}</b></span></div>`;
export const folderHTML = (who, items) => `<div class="fs-folder"><div class="tab"></div><div class="back"></div><div class="paper" data-paper></div><div class="front"><b>Portfolio</b><small data-items>${who} · ${items} pieces</small></div></div>`;
export const pathHTML = ({ next, award, route, jobs }) => `<div class="fs-card fs-path"><div class="top"><h3>Where this skill goes next</h3><span class="fs-strand">DeltaOps Learning · Future Skills</span></div>
  <div class="row"><span>Next step</span><b>${next}</b></div>
  <div class="row"><span>Award</span><b>${award}</b></div>
  <div class="row"><span>Route</span><b>${route}</b></div>
  <div class="row"><span>→ Jobs</span><div class="jobs">${jobs.map((j) => `<i>${j}</i>`).join('')}</div></div></div>`;

// review strip with four chips; set(t) drives states from a schedule [{i, run, res:'pass'|'fail', fix}]
export function checkStrip(x, y, anchor = 'tr') {
  const names = ['Data', 'Case', 'Source', 'Authority'];
  const n = ui(`<div class="fs-card fs-checks"><span class="t">REVIEW</span>${names.map((s, i) => `<span class="fs-chk" data-c="${i}"><i></i>${s}</span>`).join('')}</div>`, x, y, anchor);
  const chips = names.map((_, i) => n.querySelector(`[data-c="${i}"]`));
  n.drive = (t, plan) => plan.forEach((p, i) => {
    let st = '', ic = '';
    if (t >= p.run) { st = 'run'; }
    if (t >= p.run + 0.45) { st = p.res; ic = p.res === 'pass' ? '✓' : '✕'; }
    if (p.fix != null && t >= p.fix) { st = 'pass'; ic = '✓'; }
    const c = chips[i]; const cls = 'fs-chk' + (st ? ' ' + st : '');
    if (c.className !== cls) c.className = cls;
    const iel = c.querySelector('i'); if (iel.textContent !== ic) iel.textContent = ic;
    c.style.transform = st === 'fail' ? `scale(${1 + 0.08 * Math.max(0, Math.sin((t - p.run - 0.45) * 9)) * (t < p.run + 1.2 ? 1 : 0)})` : '';
  });
  return n;
}
// 3D-anchored tag: place at world point each frame
export function pin(html, cls = 'fs-tag') { const d = document.createElement('div'); d.className = cls + ' fs'; d.innerHTML = html; d.style.opacity = 0; document.getElementById('ui').appendChild(d); return d; }
const _v = new THREE.Vector3();
export function place(node, camera, p, alpha, dy = 0) {
  _v.set(p[0], p[1], p[2]); const s = toScreen(_v, camera);
  node.style.left = s.x + 'px'; node.style.top = (s.y + dy) + 'px';
  node.style.opacity = alpha; node.style.visibility = alpha < 0.01 ? 'hidden' : 'visible';
}
export const fadeIO = (t, a, b, d = 0.4) => clamp(prog(t, a, a + d, ease.out) - prog(t, b, b + d, ease.in));
export function typed(full, t, t0, cps = 38) { const n = Math.floor(clamp((t - t0) * cps, 0, full.length)); return full.slice(0, n); }
export function setHTML(node, html) { if (node._h !== html) { node.innerHTML = html; node._h = html; } }
