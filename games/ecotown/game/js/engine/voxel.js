// Voxel model builder: flat-colour voxels, hidden-face culling, baked vertex AO,
// slight per-voxel value jitter (the DeltaOps diorama look).
import * as THREE from 'three';

export function hex(c) { return new THREE.Color(c); }

// World-wide shader controls shared by every voxel mesh:
//  clay (0..1) fades the world to a pale model for the data lenses;
//  snow (0..1) whitens upward-facing surfaces for the winter test.
export const WORLD = { clay: { value: 0 }, snow: { value: 0 } };
function patch(mat) {
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.uClay = WORLD.clay; sh.uniforms.uSnow = WORLD.snow;
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying float vUp; varying vec3 vWPos;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvUp = normalize((modelMatrix * vec4(objectNormal, 0.0)).xyz).y; vWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nuniform float uClay; uniform float uSnow; varying float vUp; varying vec3 vWPos;')
      .replace('#include <color_fragment>', `#include <color_fragment>
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.96, 0.97, 1.0), uSnow * smoothstep(0.5, 0.9, vUp));
        float lum = dot(diffuseColor.rgb, vec3(0.3, 0.59, 0.11));
        float rim = smoothstep(1.0, 1.12, length(vWPos.xz / vec2(41.0, 32.0)));
        diffuseColor.rgb = mix(diffuseColor.rgb, mix(vec3(0.82, 0.84, 0.84), vec3(0.30, 0.34, 0.40), rim) * (0.8 + 0.28 * lum), uClay);`);
  };
  mat.customProgramCacheKey = () => 'eco-voxel';
  return mat;
}
let _shared = null;
export function sharedVoxelMaterial() { return _shared || (_shared = patch(new THREE.MeshLambertMaterial({ vertexColors: true }))); }
// A voxel material that hides everything beyond a moving plane (for build-up animations).
export function clipMaterial(planes) { const m = patch(new THREE.MeshLambertMaterial({ vertexColors: true })); m.clippingPlanes = planes; m.clipShadows = true; m.customProgramCacheKey = () => 'eco-voxel-clip'; return m; }
export function voxelMaterial(emissive) { const m = patch(new THREE.MeshLambertMaterial({ vertexColors: true })); m.emissive = hex(emissive); return m; }

function hash3(x, y, z) {
  let h = (x * 374761393 + y * 668265263 + z * 2147483647) | 0;
  h = (h ^ (h >>> 13)) * 1274126177;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

export class Vox {
  constructor() { this.m = new Map(); this.jitter = 0.05; }
  key(x, y, z) { return x + ',' + y + ',' + z; }
  set(x, y, z, c) { if (c == null) this.m.delete(this.key(x, y, z)); else this.m.set(this.key(x, y, z), [x, y, z, c instanceof THREE.Color ? c : hex(c)]); return this; }
  get(x, y, z) { const v = this.m.get(this.key(x, y, z)); return v ? v[3] : null; }
  has(x, y, z) { return this.m.has(this.key(x, y, z)); }
  box(x0, y0, z0, x1, y1, z1, c) { for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) for (let z = z0; z <= z1; z++) this.set(x, y, z, c); return this; }
  get size() { return this.m.size; }

  // Build a merged BufferGeometry mesh. scale = world size of one voxel.
  mesh({ scale = 1, offset = [0, 0, 0], castShadow = true, receiveShadow = true, emissive = null, jitter } = {}) {
    const J = jitter ?? this.jitter;
    const pos = [], nor = [], col = [], idx = [];
    const faces = [
      { d: [1, 0, 0], c: [[1, 0, 0], [1, 1, 0], [1, 1, 1], [1, 0, 1]], shade: 0.86 },
      { d: [-1, 0, 0], c: [[0, 0, 1], [0, 1, 1], [0, 1, 0], [0, 0, 0]], shade: 0.80 },
      { d: [0, 1, 0], c: [[0, 1, 1], [1, 1, 1], [1, 1, 0], [0, 1, 0]], shade: 1.0 },
      { d: [0, -1, 0], c: [[0, 0, 0], [1, 0, 0], [1, 0, 1], [0, 0, 1]], shade: 0.55 },
      { d: [0, 0, 1], c: [[1, 0, 1], [1, 1, 1], [0, 1, 1], [0, 0, 1]], shade: 0.92 },
      { d: [0, 0, -1], c: [[0, 0, 0], [0, 1, 0], [1, 1, 0], [1, 0, 0]], shade: 0.74 },
    ];
    const tmp = new THREE.Color();
    for (const [x, y, z, c] of this.m.values()) {
      const j = 1 + (hash3(x, y, z) - 0.5) * 2 * J;
      for (const f of faces) {
        const [dx, dy, dz] = f.d;
        if (this.has(x + dx, y + dy, z + dz)) continue;
        const base = pos.length / 3;
        for (const corner of f.c) {
          // vertex AO: check the 3 neighbours in the face plane around this corner
          const cx = corner[0] * 2 - 1, cy = corner[1] * 2 - 1, cz = corner[2] * 2 - 1;
          let s1, s2, s3;
          if (dx) { s1 = this.has(x + dx, y + cy, z); s2 = this.has(x + dx, y, z + cz); s3 = this.has(x + dx, y + cy, z + cz); }
          else if (dy) { s1 = this.has(x + cx, y + dy, z); s2 = this.has(x, y + dy, z + cz); s3 = this.has(x + cx, y + dy, z + cz); }
          else { s1 = this.has(x + cx, y, z + dz); s2 = this.has(x, y + cy, z + dz); s3 = this.has(x + cx, y + cy, z + dz); }
          const ao = (s1 && s2) ? 0 : 3 - (s1 + s2 + s3);
          const aoF = [0.42, 0.62, 0.82, 1][ao];
          pos.push((x + corner[0]) * scale + offset[0], (y + corner[1]) * scale + offset[1], (z + corner[2]) * scale + offset[2]);
          nor.push(dx, dy, dz);
          tmp.copy(c).multiplyScalar(j * aoF * (0.35 + 0.65 * f.shade));
          col.push(tmp.r, tmp.g, tmp.b);
        }
        idx.push(base, base + 1, base + 2, base, base + 2, base + 3);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    g.setIndex(idx);
    const mat = emissive ? voxelMaterial(emissive) : sharedVoxelMaterial();
    const mesh = new THREE.Mesh(g, mat);
    mesh.castShadow = castShadow; mesh.receiveShadow = receiveShadow;
    return mesh;
  }
}

// Value-noise helper for terrain
export function noise2(x, z, seed = 1) {
  const xi = Math.floor(x), zi = Math.floor(z), xf = x - xi, zf = z - zi;
  const r = (a, b) => hash3(a, seed, b);
  const s = (t) => t * t * (3 - 2 * t);
  const a = r(xi, zi), b = r(xi + 1, zi), c = r(xi, zi + 1), d = r(xi + 1, zi + 1);
  return a + (b - a) * s(xf) + (c - a) * s(zf) + (a - b - c + d) * s(xf) * s(zf);
}
export function rand(x, y = 0, z = 0) { return hash3(x | 0, y | 0, z | 0); }
