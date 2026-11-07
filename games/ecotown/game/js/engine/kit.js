// Shared voxel world-building kit for DeltaOps trailers.
import * as THREE from 'three';
import { Vox, noise2, rand, hex } from './voxel.js';

export const PAL = {
  grass: ['#94bf58', '#a0c862', '#88b44f', '#a9c463'], grassDark: '#6e9643',
  soil: ['#9a6a42', '#8a5c38', '#a7774c'], stone: ['#8b8f93', '#7b8085', '#9aa0a5'],
  sand: '#e9d6a1', path: '#d9c9a0', gravel: '#c8c2b5', road: '#5b6168', roadLine: '#f2f2ea',
  water: '#4fb6e8', waterDeep: '#3a9bd4',
  leaf: ['#3f9d4a', '#4caf50', '#2f8a43', '#5bbd5a'], pine: ['#2e7d4f', '#256b43', '#348a59'], trunk: '#7a5232',
  roofRed: '#d0573a', roofSlate: '#5a6d80', wall: '#f1ebe0', wallWarm: '#efe2c9', window: '#2c4a63', windowLit: '#ffd66b', door: '#7a4a2c',
};
const pick = (arr, x, y, z) => Array.isArray(arr) ? arr[Math.floor(rand(x * 7 + 3, y * 13 + 1, z * 5 + 11) * arr.length)] : arr;

// Floating island: shape(x,z) -> true if inside; height(x,z) -> top y (int).
export function island(v, { rx = 30, rz = 22, top = 0, depth = 12, seed = 3, wobble = 4, flat = true } = {}) {
  const inside = (x, z) => {
    const a = Math.atan2(z / rz, x / rx);
    const r = Math.hypot(x / rx, z / rz);
    const w = 1 + (noise2(Math.cos(a) * 3 + 10, Math.sin(a) * 3 + 10, seed) - 0.5) * wobble / Math.min(rx, rz) * 2;
    return r <= w;
  };
  const tops = new Map();
  for (let x = -rx - wobble; x <= rx + wobble; x++) for (let z = -rz - wobble; z <= rz + wobble; z++) {
    if (!inside(x, z)) continue;
    const h = flat ? top : top + Math.round(noise2(x / 8, z / 8, seed) * 2);
    tops.set(x + ',' + z, h);
    // underside tapers: depth decreases towards the edge
    const r = Math.hypot(x / rx, z / rz);
    const under = Math.round(depth * (1 - r * r * 0.85) + noise2(x / 3, z / 3, seed + 9) * 4);
    for (let y = h - under; y <= h; y++) {
      let c;
      if (y === h) c = pick(PAL.grass, x, y, z);
      else if (y >= h - 3) c = pick(PAL.soil, x, y, z);
      else c = pick(PAL.stone, x, y, z);
      v.set(x, y, z, c);
    }
  }
  return { inside, top: (x, z) => tops.get(x + ',' + z) };
}

export function tree(v, x, y, z, { kind = 'round', s = 1 } = {}) {
  const h = 3 + Math.round(rand(x, z, 9) * 2);
  for (let i = 1; i <= h; i++) v.set(x, y + i, z, PAL.trunk);
  if (kind === 'pine') {
    for (let l = 0; l < 4; l++) { const r = 3 - Math.floor(l * 0.8); for (let dx = -r; dx <= r; dx++) for (let dz = -r; dz <= r; dz++) if (Math.abs(dx) + Math.abs(dz) <= r + 1) v.set(x + dx, y + h + l * 2, z + dz, pick(PAL.pine, x + dx, l, z + dz)), v.set(x + dx, y + h + l * 2 + 1, z + dz, Math.abs(dx) + Math.abs(dz) <= r ? pick(PAL.pine, x, l, z) : null); }
    v.set(x, y + h + 8, z, PAL.pine[0]);
  } else {
    const r = 2 + (s > 1 ? 1 : 0);
    for (let dx = -r; dx <= r; dx++) for (let dy = 0; dy <= r * 2; dy++) for (let dz = -r; dz <= r; dz++) {
      const d = Math.hypot(dx, (dy - r) * 1.1, dz);
      if (d <= r + 0.6 && rand(x + dx, dy, z + dz) > 0.08) v.set(x + dx, y + h + dy - 1, z + dz, pick(PAL.leaf, x + dx, dy, z + dz));
    }
  }
}

export function house(v, x, y, z, { w = 7, d = 6, h = 4, roof = PAL.roofRed, wall = PAL.wall, lit = false, dir = 0, solar = false, wins = null } = {}) {
  for (let i = 0; i < w; i++) for (let j = 0; j < d; j++) for (let k = 1; k <= h; k++) {
    const edge = i === 0 || j === 0 || i === w - 1 || j === d - 1;
    if (!edge) continue;
    let c = wall;
    if (k === 2 || k === 3) {
      if ((j === 0 || j === d - 1) && i % 3 === 1 && i < w - 1) { c = lit ? PAL.windowLit : PAL.window; if (wins) wins.push([x + i + 0.5, y + k + 0.5, z + j + 0.5 + (j === 0 ? -0.55 : 0.55)]); }
      if ((i === 0 || i === w - 1) && j % 3 === 1) { c = lit ? PAL.windowLit : PAL.window; if (wins) wins.push([x + i + 0.5 + (i === 0 ? -0.55 : 0.55), y + k + 0.5, z + j + 0.5]); }
    }
    if (k <= 2 && j === 0 && i === Math.floor(w / 2)) c = PAL.door;
    v.set(x + i, y + k, z + j, c);
  }
  // pitched roof along x
  for (let r = 0; r <= Math.ceil(d / 2); r++) for (let i = -1; i <= w; i++) {
    v.set(x + i, y + h + 1 + r, z - 1 + r, roof); v.set(x + i, y + h + 1 + r, z + d - r, roof);
  }
  for (let i = -1; i <= w; i++) for (let j = 0; j < d; j++) { const r = Math.min(j + 1, d - j); for (let k = 1; k < r; k++) if (!v.has(x + i, y + h + k, z + j)) v.set(x + i, y + h + k, z + j, i === -1 || i === w ? wall : roof); }
  if (solar) for (let i = 1; i < w - 1; i += 1) { v.set(x + i, y + h + 2, z, '#2b3f73'); v.set(x + i, y + h + 3, z + 1, '#2b3f73'); }
}

// Water body as a separate translucent mesh
export function waterMesh(cells, y, { color = PAL.water, opacity = 0.82 } = {}) {
  const w = new Vox(); w.jitter = 0.03;
  for (const [x, z] of cells) w.set(x, y, z, color);
  const m = w.mesh({ castShadow: false });
  m.material = new THREE.MeshLambertMaterial({ vertexColors: true }); // own material: don't change the shared one
  m.material.transparent = true; m.material.opacity = opacity;
  m.position.y = -0.25;
  return m;
}

// ---- small sub-voxel characters (built at scale s, origin at feet) ----
function partMesh(fn, s) { const v = new Vox(); v.jitter = 0.02; fn(v); return v.mesh({ scale: s }); }

// a resident: front is +z (the way they walk). Hair styles, skirts, elders with canes; real eyes on the face.
// style: 'short' | 'long' | 'bun' | 'cap' | 'scarf'; skirt: a skirt colour (or null); elder: grey hair and a cane
export function person({ shirt = '#e8573f', pants = '#2c3e66', skin = '#c68a5e', hair = '#2b1d14', s = 0.32, style = 'short', skirt = null, elder = false, cap = '#2f6fd8' } = {}) {
  const g = new THREE.Group();
  const legL = partMesh((v) => v.box(0, 0, 0, 0, 2, 0, pants), s); legL.position.set(-1 * s, 3 * s, -0.5 * s);
  const legR = partMesh((v) => v.box(0, 0, 0, 0, 2, 0, pants), s); legR.position.set(0 * s, 3 * s, -0.5 * s);
  legL.geometry.translate(0, -3 * s, 0); legR.geometry.translate(0, -3 * s, 0);
  const h = elder ? '#d9d4cc' : hair;
  const body = partMesh((v) => {
    v.box(-1, 3, -1, 0, 5, 0, shirt); v.box(-2, 4, -1, -2, 5, 0, shirt); v.box(1, 4, -1, 1, 5, 0, shirt);   // body and arms
    v.box(-2, 3, -1, -2, 3, 0, skin); v.box(1, 3, -1, 1, 3, 0, skin);                                      // hands
    if (skirt) v.box(-1, 2, -1, 0, 2, 0, skirt);
    v.box(-1, 6, -1, 0, 7, 0, skin);                                                                      // head (face at z = 0)
    if (style === 'scarf') { v.box(-1, 8, -1, 0, 8, 0, h); v.box(-1, 6, -2, 0, 7, -2, h); v.box(-2, 6, -1, -2, 7, 0, h); v.box(1, 6, -1, 1, 7, 0, h); v.box(-1, 5, -2, 0, 5, -2, h); }
    else if (style === 'cap') { v.box(-1, 8, -1, 0, 8, 0, cap); v.box(-1, 8, 1, 0, 8, 1, cap); v.box(-1, 7, -2, 0, 7, -2, h); }
    else {
      v.box(-1, 8, -1, 0, 8, 0, h); v.box(-1, 7, -2, 0, 7, -2, h);                                          // top and back
      if (style === 'long') { v.box(-1, 5, -2, 0, 6, -2, h); v.set(-2, 7, -1, h); v.set(1, 7, -1, h); v.set(-2, 6, -1, h); v.set(1, 6, -1, h); }
      if (style === 'bun') v.box(-1, 8, -2, 0, 9, -2, h);
    }
    if (elder) { v.box(1, 0, 1, 1, 3, 1, '#6b4a33'); }                                                    // a walking stick
  }, s);
  // eyes: two small dark squares on the face (separate, smaller than a voxel)
  const eyeGeo = new THREE.BoxGeometry(s * 0.34, s * 0.42, s * 0.08); const eyeMat = new THREE.MeshBasicMaterial({ color: '#1d140e' });
  for (const ex of [-0.5, 0.5]) { const e = new THREE.Mesh(eyeGeo, eyeMat); e.position.set(ex * s, 7.35 * s, 1.03 * s); body.add(e); }
  g.add(legL, legR, body);
  g.userData.walk = (ph) => { const a = elder ? 0.35 : 0.6; legL.rotation.x = Math.sin(ph) * a; legR.rotation.x = -Math.sin(ph) * a; body.position.y = Math.abs(Math.sin(ph)) * s * 0.4; };
  return g;
}
export function duck({ s = 0.25, body = '#f4f1e8', head = '#2f7a4a' } = {}) {
  return partMesh((v) => { v.box(-2, 0, -1, 1, 1, 1, body); v.box(-3, 1, -1, -3, 2, 1, body); v.box(1, 2, -1, 2, 3, 0, head); v.set(3, 2, -1, '#f2a33a'); v.set(3, 2, 0, '#f2a33a'); }, s);
}
export function rabbit({ s = 0.22, c = '#b9a48c' } = {}) {
  return partMesh((v) => { v.box(-2, 0, -1, 1, 2, 1, c); v.box(1, 2, -1, 2, 3, 1, c); v.set(1, 4, -1, c); v.set(1, 5, -1, c); v.set(1, 4, 1, c); v.set(1, 5, 1, c); v.set(-3, 1, 0, '#f5f2ea'); v.set(3, 3, -1, '#222'); }, s);
}
export function otter({ s = 0.22 } = {}) {
  return partMesh((v) => { v.box(-3, 0, -1, 2, 1, 1, '#6b4a33'); v.box(2, 1, -1, 3, 2, 1, '#6b4a33'); v.set(4, 2, 0, '#222'); v.box(-5, 0, 0, -4, 0, 0, '#5a3e2b'); v.box(2, 1, -1, 3, 1, 1, '#c9a988'); }, s);
}
export function deer({ s = 0.25 } = {}) {
  return partMesh((v) => { v.box(-3, 3, -1, 2, 5, 1, '#a8693d'); for (const [a, b] of [[-3, -1], [-3, 1], [2, -1], [2, 1]]) v.box(a, 0, b, a, 2, b, '#7d4c2a'); v.box(2, 5, -1, 4, 7, 1, '#a8693d'); v.set(5, 6, 0, '#222'); v.set(3, 8, -1, '#5c3a1e'); v.set(3, 9, -2, '#5c3a1e'); v.set(3, 8, 1, '#5c3a1e'); v.set(3, 9, 2, '#5c3a1e'); v.set(-4, 5, 0, '#f3eadb'); }, s);
}
export function owl({ s = 0.22 } = {}) {
  return partMesh((v) => { v.box(-1, 0, -1, 1, 4, 1, '#8a6a4a'); v.box(-1, 2, -2, 1, 3, -2, '#d9c7a6'); v.set(-1, 3, -3, '#ffcc33'); v.set(1, 3, -3, '#ffcc33'); v.set(-1, 5, 0, '#6b5038'); v.set(1, 5, 0, '#6b5038'); }, s);
}
export function hedgehog({ s = 0.2 } = {}) {
  return partMesh((v) => { v.box(-2, 0, -1, 1, 2, 1, '#6a5240'); v.box(2, 0, -1, 2, 1, 1, '#d8b98f'); v.set(3, 0, 0, '#222'); for (let i = -2; i <= 1; i++) v.set(i, 3, 0, '#4c3a2c'); }, s);
}
export function frog({ s = 0.2 } = {}) {
  return partMesh((v) => { v.box(-1, 0, -1, 1, 1, 1, '#59b04b'); v.set(-1, 2, -1, '#59b04b'); v.set(1, 2, -1, '#59b04b'); v.set(-1, 2, -2, '#111'); v.set(1, 2, -2, '#111'); }, s);
}
export function sheep({ s = 0.25 } = {}) {
  return partMesh((v) => { v.box(-2, 2, -1, 2, 4, 1, '#f4f1ea'); for (const [a, b] of [[-2, -1], [-2, 1], [2, -1], [2, 1]]) v.box(a, 0, b, a, 1, b, '#333'); v.box(3, 3, -1, 4, 4, 0, '#333'); }, s);
}
export function scarecrow({ s = 0.3 } = {}) {
  return partMesh((v) => { v.box(0, 0, 0, 0, 7, 0, '#7a5232'); v.box(-3, 5, 0, 3, 5, 0, '#7a5232'); v.box(-1, 4, -1, 1, 6, 1, '#4f7fb8'); v.box(-1, 7, -1, 1, 8, 1, '#e8c98a'); v.box(-2, 9, -2, 2, 9, 2, '#c99a3a'); v.box(-1, 10, -1, 1, 10, 1, '#c99a3a'); v.set(-3, 4, 0, '#e8c98a'); v.set(3, 4, 0, '#e8c98a'); }, s);
}

// Pip the robo-taxi (origin at ground centre, facing +z)
export function taxi({ s = 0.3, body = '#ffd23f', stripe = '#13202b' } = {}) {
  const g = new THREE.Group();
  const m = partMesh((v) => {
    v.box(-3, 1, -5, 3, 3, 5, body);
    v.box(-2, 4, -2, 2, 5, 3, body);
    v.box(-2, 4, -3, 2, 5, -3, '#9fd8f5'); v.box(-3, 4, -2, -3, 5, 2, '#9fd8f5'); v.box(3, 4, -2, 3, 5, 2, '#9fd8f5');
    for (let z = -5; z <= 5; z += 2) { v.set(-4, 2, z, stripe); v.set(4, 2, z, stripe); }
    for (const [x, z] of [[-3, -3], [3, -3], [-3, 3], [3, 3]]) v.box(x, 0, z, x, 1, z + 1, '#222');
    v.set(-2, 2, 6, '#fff7c2'); v.set(2, 2, 6, '#fff7c2'); v.set(-2, 2, -6, '#ff5d4a'); v.set(2, 2, -6, '#ff5d4a');
    v.box(-1, 6, 0, 1, 6, 1, '#13202b'); v.set(0, 7, 1, '#16ffc6');
  }, s);
  g.add(m); return g;
}
export function kart({ s = 0.3, body = '#ff6a4a', brain = '#16ffc6' } = {}) {
  const g = new THREE.Group();
  const m = partMesh((v) => {
    v.box(-2, 1, -4, 2, 2, 4, body); v.box(-3, 1, 2, 3, 1, 4, body); v.box(-1, 3, -1, 1, 4, 1, '#13202b');
    for (const [x, z] of [[-3, -3], [3, -3], [-3, 3], [3, 3]]) v.box(x, 0, z, x, 1, z, '#222');
    v.box(-2, 3, -4, 2, 3, -4, '#eee'); v.set(0, 5, 0, brain);
  }, s);
  g.add(m); return g;
}
export function robot({ s = 0.3, c = '#f4f6f8', eye = '#16c7a6' } = {}) {
  return partMesh((v) => { v.box(-2, 0, -2, 2, 1, 2, '#cfd6dc'); v.box(-3, 2, -2, 3, 6, 2, c); v.box(-2, 4, -3, -1, 5, -3, eye); v.box(1, 4, -3, 2, 5, -3, eye); v.set(0, 7, 0, '#9aa6b0'); v.set(0, 8, 0, eye); v.box(-4, 3, -1, -4, 4, 1, '#59c7fc'); }, s);
}

// Instanced cube particles
export function particles(n, { size = 0.25, color = '#ffffff', emissive = null } = {}) {
  const geo = new THREE.BoxGeometry(size, size, size);
  const mat = new THREE.MeshLambertMaterial({ color });
  if (emissive) { mat.emissive = hex(emissive); mat.emissiveIntensity = 1; }
  const m = new THREE.InstancedMesh(geo, mat, n);
  m.castShadow = false; m.frustumCulled = false;
  const d = new THREE.Object3D();
  m.setAt = (i, x, y, z, rx = 0, ry = 0, sc = 1) => { d.position.set(x, y, z); d.rotation.set(rx, ry, 0); d.scale.setScalar(sc); d.updateMatrix(); m.setMatrixAt(i, d.matrix); };
  m.setColor = (i, c) => m.setColorAt(i, hex(c));
  m.done = () => { m.instanceMatrix.needsUpdate = true; if (m.instanceColor) m.instanceColor.needsUpdate = true; };
  return m;
}
export { Vox, rand, noise2, hex };
