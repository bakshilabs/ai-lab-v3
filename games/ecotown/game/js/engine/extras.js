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

// Small rocks floating around an island. Returns update(t) that bobs them.
export function floatingRocks(scene, { n = 7, center = [0, 0, 0], radius = 60, seed = 4 } = {}) {
  const list = [];
  for (let i = 0; i < n; i++) {
    const v = new Vox(); const s = 2 + Math.floor(rand(i, seed) * 3);
    for (let x = -s; x <= s; x++) for (let z = -s; z <= s; z++) { const r = Math.hypot(x, z) / s; if (r > 1) continue; const dp = Math.round((1 - r) * s * 1.6) + 1; for (let y = -dp; y <= 0; y++) v.set(x, y, z, y === 0 ? (rand(x, i, z) > 0.4 ? '#9bb85e' : '#8fae55') : y > -2 ? '#c96535' : '#d9733f'); }
    if (rand(i, seed, 9) > 0.5) { v.set(0, 1, 0, '#7a5232'); v.box(-1, 2, -1, 1, 3, 1, '#5f9a45'); }
    const m = v.mesh(); const a = rand(i, seed, 2) * Math.PI * 2, r = radius * (0.8 + rand(i, seed, 3) * 0.5);
    const base = [center[0] + Math.cos(a) * r, center[1] - 6 + rand(i, seed, 4) * 22, center[2] + Math.sin(a) * r];
    m.position.set(...base); scene.add(m); list.push([m, base, rand(i, seed, 5) * 6]);
  }
  return (t) => list.forEach(([m, b, ph]) => { m.position.y = b[1] + Math.sin(t * 0.8 + ph) * 0.9; m.rotation.y = Math.sin(t * 0.2 + ph) * 0.15; });
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
