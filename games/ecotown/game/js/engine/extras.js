// Atmosphere and life: clouds, waterfalls, hanging roots, floating rocks, wind grass, birds, butterflies.
import * as THREE from 'three';
import { Vox, rand, noise2, hex } from './voxel.js';

// Puffy voxel clouds that drift. Returns update(t).
export function clouds(scene, { n = 9, spread = 260, y = [55, 95], z = [-260, -60], scale = 2.2, seed = 1 } = {}) {
  const list = [];
  for (let i = 0; i < n; i++) {
    const v = new Vox(); v.jitter = 0.02;
    const w = 6 + Math.floor(rand(i, seed, 1) * 7), d = 3 + Math.floor(rand(i, seed, 2) * 3);
    for (let x = -w; x <= w; x++) for (let zz = -d; zz <= d; zz++) for (let yy = 0; yy <= 4; yy++) {
      const r = Math.hypot(x / w, zz / d, (yy - 1) / 3.2) + (noise2(x * 0.5 + i * 7, zz * 0.5 + yy, seed) - 0.5) * 0.5;
      if (r < 1) v.set(x, yy, zz, yy <= 0 ? '#dfeaf7' : '#ffffff');
    }
    const m = v.mesh({ scale, castShadow: false, receiveShadow: false });
  m.material = new THREE.MeshLambertMaterial({ vertexColors: true }); // own material: don't change the shared one
    m.material.emissive = new THREE.Color('#ffffff'); m.material.emissiveIntensity = 0.32;
    const base = [-spread / 2 + rand(i, seed, 3) * spread, y[0] + rand(i, seed, 4) * (y[1] - y[0]), z[0] + rand(i, seed, 5) * (z[1] - z[0])];
    m.position.set(...base); scene.add(m); list.push([m, base, 0.6 + rand(i, seed, 6) * 0.8]);
  }
  return (t) => list.forEach(([m, b, sp]) => { m.position.x = b[0] + t * sp; });
}

// Waterfall pouring off an island edge. dir = outward direction [dx,dz].
export function waterfall(scene, { x, y, z, dir = [0, 1], width = 3, length = 30 }) {
  const N = 220;
  const geo = new THREE.BoxGeometry(0.55, 0.9, 0.55);
  const mat = new THREE.MeshLambertMaterial({ color: '#6cc4f0', emissive: new THREE.Color('#2a8fd0'), emissiveIntensity: 0.2 });
  const m = new THREE.InstancedMesh(geo, mat, N); m.castShadow = false; m.frustumCulled = false; scene.add(m);
  const mist = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshLambertMaterial({ color: '#ffffff' }), 40); mist.frustumCulled = false; scene.add(mist);
  const d = new THREE.Object3D();
  return (t) => {
    for (let i = 0; i < N; i++) {
      const ph = ((t * 0.55 + rand(i, 1) ) % 1);
      const off = (rand(i, 2) - 0.5) * width;
      const out = 0.8 + ph * 2.2;
      d.position.set(x + dir[0] * out + (dir[1] !== 0 ? off : 0), y - ph * ph * length, z + dir[1] * out + (dir[0] !== 0 ? off : 0));
      d.scale.set(1, 1 + ph * 1.5, 1); d.rotation.set(0, 0, 0); d.updateMatrix(); m.setMatrixAt(i, d.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
    for (let i = 0; i < 40; i++) {
      const ph = ((t * 0.3 + rand(i, 5)) % 1);
      d.position.set(x + dir[0] * 3 + (rand(i, 6) - 0.5) * 6, y - length + ph * 5, z + dir[1] * 3 + (rand(i, 7) - 0.5) * 6);
      d.scale.setScalar((1 - ph) * 2.2); d.updateMatrix(); mist.setMatrixAt(i, d.matrix);
    }
    mist.instanceMatrix.needsUpdate = true;
  };
}

// Hanging roots and moss under an island (adds to a Vox before meshing). inside(x,z) from island().
export function roots(v, inside, { rx = 30, rz = 22, top = 0, count = 40, seed = 3 } = {}) {
  for (let i = 0; i < count; i++) {
    const a = rand(i, seed, 1) * Math.PI * 2, r = 0.55 + rand(i, seed, 2) * 0.45;
    const x = Math.round(Math.cos(a) * rx * r), z = Math.round(Math.sin(a) * rz * r);
    if (!inside(x, z)) continue;
    let y = top; while (v.has(x, y - 1, z) && y > top - 40) y--;
    const len = 2 + Math.floor(rand(i, seed, 3) * 6);
    for (let k = 1; k <= len; k++) v.set(x + (k > 3 && rand(i, k) > 0.7 ? 1 : 0), y - k, z, k === len ? '#5fae4a' : rand(i, k, 9) > 0.5 ? '#6b4a2e' : '#4f8f3c');
  }
}

// A sea of solid, blocky clouds far below and around the island (plus a few at its own height, far off), so the
// island is seen to float above something and the sky has depth. One instanced mesh (one draw call); lower and
// farther clouds are tinted towards the sky. It turns very slowly as one piece, so nothing is updated per cloud.
// night() returns 0..1: the clouds stop glowing after dark.
export function cloudSea(scene, { n = 20, high = 7, seed = 3, night = () => 0 } = {}) {
  const slabs = [];
  const BASE = new THREE.Color('#c9d1f1'), MID = new THREE.Color('#e2e6fa'), CROWN = new THREE.Color('#fbf8ff'), FAR = new THREE.Color('#9fb0ea');
  // a cloud is three stacked slabs and two end puffs; each layer is a shade lighter, so its shape reads from above
  const cloud = (cx, cy, cz, k, fade, i) => {
    const w = (15 + rand(i, seed, 1) * 16) * k, d = (9 + rand(i, seed, 2) * 8) * k, h = 3 * k, yaw = rand(i, seed, 3) * 0.5 - 0.25;
    const put = (ox, oy, oz, sx, sy, sz, col) => { const c = Math.cos(yaw), s = Math.sin(yaw); slabs.push([cx + ox * c + oz * s, cy + oy, cz - ox * s + oz * c, sx, sy, sz, yaw, col.clone().lerp(FAR, fade)]); };
    put(0, 0, 0, w, h, d, BASE);
    put((rand(i, seed, 4) - 0.5) * w * 0.3, h * 0.9, (rand(i, seed, 5) - 0.5) * d * 0.2, w * 0.6, h, d * 0.62, MID);
    put((rand(i, seed, 6) - 0.5) * w * 0.3, h * 1.75, 0, w * 0.28, h * 0.8, d * 0.34, CROWN);
    put(-w * 0.52, -h * 0.15, d * 0.18, w * 0.3, h * 0.7, d * 0.5, BASE); put(w * 0.5, h * 0.1, -d * 0.22, w * 0.26, h * 0.75, d * 0.44, MID);
  };
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 * 3 + rand(i, seed, 7) * 0.9, r = 50 + rand(i, seed, 8) * 280;   // three turns round the island, near to far
    const y = -100 - rand(i, seed, 9) * 90; const depth = Math.min(1, (-y - 100) / 90);
    cloud(Math.cos(a) * r, y, Math.sin(a) * r, 0.75 + rand(i, seed, 10) * 0.75, depth * 0.55, i);
  }
  for (let i = 0; i < high; i++) {
    const a = (i / high) * Math.PI * 2 + rand(i, seed, 11) * 0.7, r = 330 + rand(i, seed, 12) * 260;
    cloud(Math.cos(a) * r, 8 + rand(i, seed, 13) * 70, Math.sin(a) * r, 1.6 + rand(i, seed, 14) * 1.2, 0, 100 + i);
  }
  const mat = new THREE.MeshLambertMaterial({ color: '#ffffff', emissive: new THREE.Color('#ffe9dc'), emissiveIntensity: 0.14 });
  const m = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), mat, slabs.length); m.frustumCulled = false; m.castShadow = false; m.receiveShadow = false;
  const o = new THREE.Object3D();
  slabs.forEach(([x, y, z, sx, sy, sz, yaw, col], i) => { o.position.set(x, y, z); o.rotation.set(0, yaw, 0); o.scale.set(sx, sy, sz); o.updateMatrix(); m.setMatrixAt(i, o.matrix); m.setColorAt(i, col); });
  m.instanceMatrix.needsUpdate = true; m.instanceColor.needsUpdate = true; scene.add(m);
  return (t) => { m.rotation.y = t * 0.0035; mat.emissiveIntensity = 0.14 * (1 - night()) + 0.02; };
}

// Rocks floating around an island, in a few groups (one mesh per group, so few draw calls): grassy islets with the
// island's own strata, bare terracotta shards, flat slabs with a small tree, and trails of pebbles.
// Returns update(t) that bobs each group.
const ROCK_BEDS = ['#d9733f', '#e8874c', '#f4b783', '#d06d3a', '#b85a2e', '#e07f47', '#c96535'];
export function floatingRocks(scene, { groups = 5, center = [0, 0, 0], radius = 95, seed = 4 } = {}) {
  const list = [];
  const islet = (v, ox, oy, oz, s, i, tree) => {
    for (let x = -s; x <= s; x++) for (let z = -s; z <= s; z++) {
      const r = Math.hypot(x, z * 1.15) / s + (noise2(x * 0.7 + i * 9, z * 0.7, seed) - 0.5) * 0.35; if (r > 1) continue;
      const dp = Math.round((1 - r * r) * s * 1.7) + 1;
      for (let y = -dp; y <= 0; y++) v.set(ox + x, oy + y, oz + z, y === 0 ? (rand(x, i, z) > 0.4 ? '#9bb85e' : '#8fae55') : y === -dp ? '#8a4426' : ROCK_BEDS[(((oy + y) >> 1) + 40) % 7]);
    }
    if (tree === 1) { v.set(ox, oy + 1, oz, '#7a5232'); v.set(ox, oy + 2, oz, '#7a5232'); v.box(ox - 1, oy + 3, oz - 1, ox + 1, oy + 4, oz + 1, '#5f9a45'); v.set(ox, oy + 5, oz, '#6aa64c'); }
    if (tree === 2) { v.set(ox, oy + 1, oz, '#6b4a2e'); v.box(ox - 1, oy + 2, oz - 1, ox + 1, oy + 2, oz + 1, '#3d6e44'); v.set(ox, oy + 3, oz, '#477a4b'); v.set(ox, oy + 4, oz, '#477a4b'); }
    if (tree === 3) { v.set(ox + 1, oy + 1, oz, '#bfb29a'); v.set(ox - 1, oy + 1, oz + 1, '#a7b766'); }
  };
  const shard = (v, ox, oy, oz, hgt, i) => { // a bare splinter of sandstone, widest in the middle
    for (let y = -hgt; y <= hgt; y++) { const w = Math.max(0, Math.round((1 - Math.abs(y) / hgt) * (1.2 + rand(i, seed, 20)))); for (let x = -w; x <= w; x++) for (let z = -w; z <= w; z++) if (Math.abs(x) + Math.abs(z) <= w + (rand(x + i, y, z) > 0.6 ? 1 : 0)) v.set(ox + x, oy + y, oz + z, y === hgt ? '#f4b783' : ROCK_BEDS[(((oy + y) >> 1) + 40) % 7]); }
  };
  for (let g = 0; g < groups; g++) {
    const v = new Vox(); v.jitter = 0.04; const kind = g % 5;
    if (kind === 0) { islet(v, 0, 0, 0, 5, g, 1); islet(v, 8, -5, 3, 2, g + 20, 0); shard(v, -8, -3, -2, 3, g); }
    else if (kind === 1) { shard(v, 0, 0, 0, 6, g); shard(v, 5, -6, 2, 3, g + 7); v.set(-4, -2, 3, '#d06d3a'); v.set(-6, 1, 1, '#e07f47'); }
    else if (kind === 2) { islet(v, 0, 0, 0, 3, g, 2); islet(v, -7, 3, 2, 2, g + 20, 3); for (let k = 0; k < 4; k++) v.set(5 + k * 2, -1 - k, (k & 1) * 2 - 1, ROCK_BEDS[k]); }
    else if (kind === 3) { islet(v, 0, 0, 0, 4, g, 3); islet(v, 7, 4, -4, 3, g + 20, 1); shard(v, -6, -7, 2, 2, g); }
    else { islet(v, 0, 0, 0, 2, g, 0); islet(v, 6, -2, 1, 1, g + 20, 0); islet(v, -5, 2, -3, 2, g + 30, 2); }
    const m = v.mesh({ castShadow: false });
    const a = (g / groups) * Math.PI * 2 + rand(g, seed, 2) * 0.9, r = radius * (0.85 + rand(g, seed, 3) * 0.45);
    const base = [center[0] + Math.cos(a) * r, center[1] - 16 + rand(g, seed, 4) * 24, center[2] + Math.sin(a) * r];
    m.position.set(...base); m.rotation.y = rand(g, seed, 6) * 6.28; scene.add(m); list.push([m, base, rand(g, seed, 5) * 6, m.rotation.y]);
  }
  return (t) => list.forEach(([m, b, ph, ry]) => { m.position.y = b[1] + Math.sin(t * 0.6 + ph) * 1.1; m.rotation.y = ry + Math.sin(t * 0.15 + ph) * 0.12; });
}

// Wind-swept grass tufts on given cells [[x,z],...] at height y. GPU wind via onBeforeCompile.
export function grass(scene, cells, y = 0, { colors = ['#8fe060', '#6cc04b', '#a6ea6e'], density = 2 } = {}) {
  const N = cells.length * density;
  const geo = new THREE.BoxGeometry(0.15, 0.7, 0.15); geo.translate(0, 0.35, 0);
  const mat = new THREE.MeshLambertMaterial({ color: '#ffffff' });
  const uTime = { value: 0 };
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.uTime = uTime;
    sh.vertexShader = 'uniform float uTime;\n' + sh.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
      vec4 ip = instanceMatrix * vec4(0.0,0.0,0.0,1.0);
      float sway = sin(uTime * 2.2 + ip.x * 0.35 + ip.z * 0.25) * 0.28 + sin(uTime * 3.7 + ip.x) * 0.08;
      transformed.x += sway * position.y; transformed.z += sway * 0.5 * position.y;`);
  };
  const m = new THREE.InstancedMesh(geo, mat, N); m.castShadow = false; m.receiveShadow = true; m.frustumCulled = false;
  const d = new THREE.Object3D();
  let k = 0;
  for (const [x, z] of cells) for (let j = 0; j < density; j++) {
    d.position.set(x + rand(k, 1) * 0.9 - 0.45, y + 1, z + rand(k, 2) * 0.9 - 0.45);
    d.scale.set(1, 0.45 + rand(k, 3) * 0.7, 1); d.rotation.set(0, rand(k, 4) * 3, 0); d.updateMatrix(); m.setMatrixAt(k, d.matrix);
    m.setColorAt(k, hex(colors[Math.floor(rand(k, 5) * colors.length)])); k++;
  }
  m.instanceMatrix.needsUpdate = true; m.instanceColor.needsUpdate = true;
  scene.add(m);
  return (t) => { uTime.value = t; };
}

// Flock of birds (flapping V shapes) circling a point. Returns update(t).
export function birds(scene, { n = 9, center = [0, 40, 0], radius = 50, color = '#ffffff', seed = 2 } = {}) {
  const wingGeo = new THREE.BoxGeometry(1.4, 0.18, 0.5); wingGeo.translate(0.7, 0, 0);
  const mat = new THREE.MeshLambertMaterial({ color });
  const list = [];
  for (let i = 0; i < n; i++) {
    const g = new THREE.Group(); const body = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, 1.0), mat);
    const wl = new THREE.Mesh(wingGeo, mat), wr = new THREE.Mesh(wingGeo, mat); wr.scale.x = -1;
    g.add(body, wl, wr); scene.add(g); list.push([g, wl, wr, rand(i, seed) * 6, 0.8 + rand(i, seed, 2) * 0.5]);
  }
  return (t) => list.forEach(([g, wl, wr, ph, sp], i) => {
    const a = t * 0.25 * sp + ph; const r = radius * (0.8 + 0.2 * Math.sin(ph * 3));
    g.position.set(center[0] + Math.cos(a) * r, center[1] + Math.sin(t * 0.7 + ph) * 3 + (i % 3) * 2, center[2] + Math.sin(a) * r * 0.6);
    g.rotation.y = -a + Math.PI; const f = Math.sin(t * 9 + ph * 5) * 0.7; wl.rotation.z = f; wr.rotation.z = -f;
  });
}

// Butterflies fluttering over cells. Returns update(t).
export function butterflies(scene, cells, { n = 14, y = 0, seed = 6 } = {}) {
  const cols = ['#ff7eb6', '#ffd23f', '#b28cff', '#ffffff', '#ff9a4a'];
  const list = [];
  for (let i = 0; i < n; i++) {
    const mat = new THREE.MeshLambertMaterial({ color: cols[i % 5], side: THREE.DoubleSide }); // lit, so they don't glow at night
    const g = new THREE.Group(); const w1 = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.5), mat), w2 = w1.clone();
    w1.position.x = 0.3; w2.position.x = -0.3; const p1 = new THREE.Group(), p2 = new THREE.Group(); p1.add(w1); p2.add(w2); g.add(p1, p2); scene.add(g);
    const c = cells[Math.floor(rand(i, seed) * cells.length)] || [0, 0];
    list.push([g, p1, p2, c, rand(i, seed, 2) * 6]);
  }
  return (t) => list.forEach(([g, p1, p2, c, ph]) => {
    g.position.set(c[0] + Math.sin(t * 0.7 + ph) * 3, y + 2.2 + Math.sin(t * 2.1 + ph) * 0.8, c[1] + Math.cos(t * 0.6 + ph * 2) * 3);
    g.rotation.y = t * 0.7 + ph; const f = Math.sin(t * 18 + ph) * 1.1; p1.rotation.y = f; p2.rotation.y = -f;
  });
}

// Burst helper: n cubes exploding from a point between t0 and t0+life. Returns update(t).
export function burst(scene, { at, t0, n = 60, colors = ['#ffffff'], size = 0.4, speed = 8, life = 1.6, gravity = 12, up = 6 }) {
  const m = new THREE.InstancedMesh(new THREE.BoxGeometry(size, size, size), new THREE.MeshLambertMaterial({ color: '#ffffff' }), n);
  for (let i = 0; i < n; i++) m.setColorAt(i, hex(colors[i % colors.length]));
  m.frustumCulled = false; scene.add(m); const d = new THREE.Object3D();
  return (t) => {
    const age = t - t0;
    for (let i = 0; i < n; i++) {
      const a = rand(i, 3) * Math.PI * 2, e = rand(i, 4), sp = speed * (0.4 + rand(i, 5) * 0.8);
      const on = age > 0 && age < life;
      d.position.set(at[0] + Math.cos(a) * sp * age * (1 - e * 0.5), at[1] + (up + e * up) * age - gravity * age * age * 0.5, at[2] + Math.sin(a) * sp * age * (1 - e * 0.5));
      d.rotation.set(age * 6 + i, age * 4, 0); d.scale.setScalar(on ? 1 - age / life * 0.6 : 0); d.updateMatrix(); m.setMatrixAt(i, d.matrix);
    }
    m.instanceMatrix.needsUpdate = true; if (m.instanceColor) m.instanceColor.needsUpdate = true;
  };
}
