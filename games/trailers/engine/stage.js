// Stage: renderer, lights, camera, overlay root and a deterministic frame hook.
import * as THREE from 'three';

export const W = 1920, H = 1080;

export function createStage({ sky = ['#bfe3ff', '#eef8ff'], fog = null, shadowSize = 2048 } = {}) {
  const canvas = document.createElement('canvas');
  canvas.id = 'gl';
  document.getElementById('app').insertBefore(canvas, document.getElementById('ui'));
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1);
  renderer.setSize(W, H, false);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, W / H, 0.5, 2000);

  const hemi = new THREE.HemisphereLight(0xdff1ff, 0x6b5a48, 1.25);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xfff1dc, 2.4);
  sun.position.set(-60, 110, 50);
  sun.castShadow = true;
  sun.shadow.mapSize.set(shadowSize, shadowSize);
  const sc = sun.shadow.camera; sc.left = -60; sc.right = 60; sc.top = 60; sc.bottom = -60; sc.near = 1; sc.far = 400;
  sun.shadow.bias = -0.0006; sun.shadow.normalBias = 0.02; sun.shadow.radius = 4;
  scene.add(sun); scene.add(sun.target);

  if (fog) scene.fog = new THREE.Fog(fog.color, fog.near, fog.far);

  const bg = document.getElementById('bg');
  const setSky = (top, bottom) => { bg.style.background = `linear-gradient(180deg, ${top} 0%, ${bottom} 100%)`; };
  setSky(sky[0], sky[1]);
  renderer.setClearColor(0x000000, 0);

  const stage = { renderer, scene, camera, hemi, sun, setSky, updaters: [] };
  stage.onFrame = (fn) => stage.updaters.push(fn);
  window.__render = (t) => {
    for (const fn of stage.updaters) fn(t);
    renderer.render(scene, camera);
    return true;
  };
  return stage;
}

// ---------- animation helpers ----------
export const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const lerp = (a, b, t) => a + (b - a) * t;
export const ease = {
  inOut: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  out: (t) => 1 - Math.pow(1 - t, 3),
  in: (t) => t * t * t,
  back: (t) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
  elastic: (t) => t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI) / 3) + 1,
};
// progress of t within [a,b], eased
export const prog = (t, a, b, e = ease.inOut) => e(clamp((t - a) / (b - a)));
export const within = (t, a, b) => t >= a && t < b;

// Camera keyframes: [{t, pos:[x,y,z], look:[x,y,z], fov}] with eased interpolation
export function cameraTrack(camera, keys) {
  return (t) => {
    let i = 0;
    while (i < keys.length - 1 && t > keys[i + 1].t) i++;
    const a = keys[i], b = keys[Math.min(i + 1, keys.length - 1)];
    const cut = b.cut;
    let k = b === a ? 0 : clamp((t - a.t) / (b.t - a.t));
    if (cut) k = t >= b.t ? 1 : 0;
    const e = (b.ease || ease.inOut)(k);
    camera.position.set(lerp(a.pos[0], b.pos[0], e), lerp(a.pos[1], b.pos[1], e), lerp(a.pos[2], b.pos[2], e));
    const lx = lerp(a.look[0], b.look[0], e), ly = lerp(a.look[1], b.look[1], e), lz = lerp(a.look[2], b.look[2], e);
    camera.fov = lerp(a.fov || 30, b.fov || 30, e);
    camera.updateProjectionMatrix();
    camera.lookAt(lx, ly, lz);
  };
}

// Position along a closed polyline path, t in [0,1)
export function pathPoint(pts, u) {
  const seg = [];
  let total = 0;
  for (let i = 0; i < pts.length; i++) { const a = pts[i], b = pts[(i + 1) % pts.length]; const d = Math.hypot(b[0] - a[0], b[1] - a[1]); seg.push(d); total += d; }
  let d = ((u % 1) + 1) % 1 * total;
  for (let i = 0; i < pts.length; i++) {
    if (d <= seg[i]) { const a = pts[i], b = pts[(i + 1) % pts.length]; const k = d / seg[i]; return { x: lerp(a[0], b[0], k), z: lerp(a[1], b[1], k), ang: Math.atan2(b[0] - a[0], b[1] - a[1]) }; }
    d -= seg[i];
  }
  return { x: pts[0][0], z: pts[0][1], ang: 0 };
}
