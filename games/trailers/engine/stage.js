// Stage: renderer, lights, camera, overlay root and a deterministic frame hook.
import * as THREE from 'three';

export const W = 1920, H = 1080;

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { HorizontalTiltShiftShader } from 'three/addons/shaders/HorizontalTiltShiftShader.js';
import { VerticalTiltShiftShader } from 'three/addons/shaders/VerticalTiltShiftShader.js';

// Colour grade (linear HDR in): saturation, contrast, warm highlights / cool shadows, vignette.
const GradeShader = {
  uniforms: { tDiffuse: { value: null }, sat: { value: 1.22 }, contrast: { value: 1.08 }, vignette: { value: 0.28 }, warm: { value: 0.05 }, lift: { value: 0.0 } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
  fragmentShader: `uniform sampler2D tDiffuse; uniform float sat, contrast, vignette, warm, lift; varying vec2 vUv;
    void main(){ vec4 c = texture2D(tDiffuse, vUv); vec3 col = c.rgb;
      float l = dot(col, vec3(0.2126,0.7152,0.0722));
      col = mix(vec3(l), col, sat);
      col = (col - 0.18) * contrast + 0.18;
      col += warm * vec3(0.6, 0.25, -0.35) * smoothstep(0.2, 1.2, l) + warm * vec3(-0.2, 0.0, 0.3) * (1.0 - smoothstep(0.0, 0.25, l)) * 0.4;
      col += lift;
      vec2 d = vUv - 0.5; d.x *= 1.25; col *= 1.0 - vignette * smoothstep(0.25, 0.85, length(d));
      gl_FragColor = vec4(max(col, 0.0), 1.0); }`,
};

// Sky dome: vertical gradient + sun glow, rendered in-scene so post effects see it.
function skyDome() {
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: { top: { value: new THREE.Color('#2f8fff') }, bottom: { value: new THREE.Color('#bfe8ff') }, sunDir: { value: new THREE.Vector3(-0.4, 0.6, 0.4).normalize() }, sunCol: { value: new THREE.Color('#fff4d6') }, sunAmt: { value: 1.0 } },
    vertexShader: 'varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: `uniform vec3 top, bottom, sunCol, sunDir; uniform float sunAmt; varying vec3 vDir;
      void main(){ float h = clamp(vDir.y * 0.5 + 0.5, 0.0, 1.0); vec3 c = mix(bottom, top, pow(smoothstep(0.42, 0.85, h), 0.7));
        float s = max(dot(normalize(vDir), normalize(sunDir)), 0.0); c += sunCol * (pow(s, 600.0) * 6.0 + pow(s, 16.0) * 0.18) * sunAmt;
        gl_FragColor = vec4(c, 1.0); }`,
  });
  const m = new THREE.Mesh(new THREE.SphereGeometry(1500, 32, 16), mat);
  m.renderOrder = -10; m.frustumCulled = false;
  return m;
}

export function createStage({ sky = ['#1f78f0', '#78c4ff'], fog = null, shadowSize = 2048, post = true } = {}) {
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
  renderer.toneMappingExposure = 1.12;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, W / H, 0.5, 4000);
  const dome = skyDome(); scene.add(dome);

  // bright midday: strong warm key, cool sky fill, a rim light from behind
  const hemi = new THREE.HemisphereLight(0xcfe8ff, 0x7a5a3a, 1.35);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xfff0d8, 3.1);
  sun.position.set(-70, 120, 60);
  sun.castShadow = true;
  sun.shadow.mapSize.set(shadowSize, shadowSize);
  const sc = sun.shadow.camera; sc.left = -70; sc.right = 70; sc.top = 70; sc.bottom = -70; sc.near = 1; sc.far = 500;
  sun.shadow.bias = -0.0006; sun.shadow.normalBias = 0.02; sun.shadow.radius = 3;
  scene.add(sun); scene.add(sun.target);
  const rim = new THREE.DirectionalLight(0xbfe0ff, 0.9); rim.position.set(80, 40, -90); scene.add(rim);

  if (fog) scene.fog = new THREE.Fog(fog.color, fog.near, fog.far);

  const setSky = (top, bottom) => { dome.material.uniforms.top.value.set(top); dome.material.uniforms.bottom.value.set(bottom); };
  setSky(sky[0], sky[1]);
  const syncSun = () => dome.material.uniforms.sunDir.value.copy(sun.position).normalize();

  let composer = null; const fx = {};
  if (post) {
    composer = new EffectComposer(renderer);
    composer.setPixelRatio(1); composer.setSize(W, H);
    composer.addPass(new RenderPass(scene, camera));
    fx.bloom = new UnrealBloomPass(new THREE.Vector2(W / 2, H / 2), 0.32, 0.55, 0.92); composer.addPass(fx.bloom);
    fx.tiltH = new ShaderPass(HorizontalTiltShiftShader); fx.tiltV = new ShaderPass(VerticalTiltShiftShader);
    composer.addPass(fx.tiltH); composer.addPass(fx.tiltV);
    fx.grade = new ShaderPass(GradeShader); composer.addPass(fx.grade);
    composer.addPass(new OutputPass());
    fx.setTilt = (focus = 0.55, amount = 2.2) => { fx.tiltH.uniforms.h.value = amount / W; fx.tiltV.uniforms.v.value = amount / H; fx.tiltH.uniforms.r.value = focus; fx.tiltV.uniforms.r.value = focus; fx.tiltH.enabled = fx.tiltV.enabled = amount > 0.01; };
    fx.setTilt();
  }
  const stage = { renderer, scene, camera, hemi, sun, rim, dome, setSky, fx, updaters: [] };
  stage.onFrame = (fn) => stage.updaters.push(fn);
  window.__render = (t) => {
    for (const fn of stage.updaters) fn(t);
    syncSun();
    dome.position.copy(camera.position);
    if (composer) composer.render(); else renderer.render(scene, camera);
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
