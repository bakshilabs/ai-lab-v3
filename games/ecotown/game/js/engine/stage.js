// Renderer, in-scene sky, golden-hour lighting, time of day, post-processing and quality tiers.
// Look target: a warm miniature diorama (soft long shadows, strong AO, tilt-shift, gentle bloom, warm grade).
import * as THREE from 'three';
import { WORLD } from './voxel.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { HorizontalTiltShiftShader } from 'three/addons/shaders/HorizontalTiltShiftShader.js';
import { VerticalTiltShiftShader } from 'three/addons/shaders/VerticalTiltShiftShader.js';

export const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const lerp = (a, b, t) => a + (b - a) * t;
export const ease = {
  inOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  out: (t) => 1 - Math.pow(1 - t, 3),
  in: (t) => t * t * t,
  back: (t) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
};

export const TIERS = {
  low:  { ratio: 1,    shadows: false, shadowSize: 1024, post: false, bloom: false, particles: 0.4, residents: 10, grass: 0.35 },
  mid:  { ratio: 1.25, shadows: true,  shadowSize: 2048, post: true,  bloom: false, particles: 0.7, residents: 18, grass: 0.7 },
  high: { ratio: 2,    shadows: true,  shadowSize: 4096, post: true,  bloom: true,  particles: 1,   residents: 28, grass: 1 },
};

// hour → [sky top, horizon, sun colour, sun intensity, ambient intensity]
const SKY = [
  [0,    '#0a1436', '#1b2c5c', '#8fa0ff', 0.0, 0.32],
  [5,    '#2b2d5e', '#d8846e', '#ffb48a', 0.5, 0.5],
  [7,    '#6d8fd0', '#ffd2b0', '#ffd9b0', 2.0, 0.95],
  [10,   '#4b93df', '#f1dcc2', '#ffe6c4', 3.3, 0.78],
  [14.5, '#4b93df', '#f4d8b8', '#ffdfb4', 3.3, 0.76],
  [16.5, '#7a8fd6', '#ffcf9c', '#ffd2a0', 2.8, 0.74],
  [18.2, '#7a6ab4', '#ffa47a', '#ff9a62', 1.9, 0.82],
  [19.6, '#3e3f86', '#f07a6a', '#ff7a5c', 0.6, 0.55],
  [21,   '#101c4c', '#2a3a78', '#8fa0ff', 0.0, 0.36],
  [24,   '#0a1436', '#1b2c5c', '#8fa0ff', 0.0, 0.32],
];
const C = (h) => new THREE.Color(h);

// warm colour grade with vignette (linear HDR in, before tone mapping in OutputPass)
const GradeShader = {
  uniforms: { tDiffuse: { value: null }, sat: { value: 1.0 }, contrast: { value: 1.08 }, vignette: { value: 0.18 }, warm: { value: 0.07 } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
  fragmentShader: `uniform sampler2D tDiffuse; uniform float sat, contrast, vignette, warm; varying vec2 vUv;
    void main(){ vec4 c = texture2D(tDiffuse, vUv); vec3 col = c.rgb; float l = dot(col, vec3(0.2126,0.7152,0.0722));
      col = mix(vec3(l), col, sat); col = (col - 0.18) * contrast + 0.18;
      col += warm * vec3(0.55, 0.22, -0.3) * smoothstep(0.15, 1.1, l) + warm * vec3(-0.12, 0.02, 0.22) * (1.0 - smoothstep(0.0, 0.22, l));
      vec2 d = vUv - 0.5; d.x *= 1.3; col *= 1.0 - vignette * smoothstep(0.3, 0.9, length(d));
      gl_FragColor = vec4(max(col, 0.0), c.a); }`,
};

function skyDome() {
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: { top: { value: C('#5d9fe0') }, bottom: { value: C('#f5dcc2') }, sunDir: { value: new THREE.Vector3(-0.5, 0.4, 0.3).normalize() }, sunCol: { value: C('#fff0d8') }, sunAmt: { value: 1 }, night: { value: 0 } },
    vertexShader: 'varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: `uniform vec3 top, bottom, sunCol, sunDir; uniform float sunAmt, night; varying vec3 vDir;
      float hash(vec3 p){ return fract(sin(dot(p, vec3(12.9898,78.233,37.719))) * 43758.5453); }
      void main(){ vec3 d = normalize(vDir); float h = clamp(d.y * 0.5 + 0.5, 0.0, 1.0);
        vec3 c = mix(bottom, top, pow(smoothstep(0.38, 0.92, h), 0.75));
        // looking down past the island: the sky deepens to a soft blue-lilac abyss with a bright haze band at the horizon
        vec3 deep = mix(top, vec3(0.42, 0.5, 0.78), 0.45) * 0.9;
        c = mix(c, deep, smoothstep(0.47, 0.12, h));
        c += bottom * 0.25 * exp(-pow((h - 0.5) * 9.0, 2.0));
        float s = max(dot(d, normalize(sunDir)), 0.0); c += sunCol * (pow(s, 900.0) * 5.0 + pow(s, 24.0) * 0.28 + pow(s, 4.0) * 0.08) * sunAmt;
        vec3 g = floor(d * 380.0); float st = step(0.9975, hash(g)) * smoothstep(0.52, 0.7, h) * night; c += vec3(st);
        gl_FragColor = vec4(c, 1.0); }`,
  });
  const m = new THREE.Mesh(new THREE.SphereGeometry(1400, 32, 16), mat); m.renderOrder = -10; m.frustumCulled = false; return m;
}

export function createStage(canvas, skyEl) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.12;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; renderer.localClippingEnabled = true;
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xd4ecff, 900, 2600);
  const camera = new THREE.PerspectiveCamera(22, 1, 1, 4000);
  const dome = skyDome(); scene.add(dome);
  const hemi = new THREE.HemisphereLight(0xdcebff, 0x9a6a4a, 1.0) /* warm bounce light under the island */; scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xfff0d8, 2.8); sun.castShadow = true; scene.add(sun, sun.target);
  const sc = sun.shadow.camera; sc.left = -60; sc.right = 60; sc.top = 60; sc.bottom = -60; sc.near = 1; sc.far = 500;
  sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.04; sun.shadow.radius = 1;
  const fill = new THREE.DirectionalLight(0xa9c4ff, 0.45); fill.position.set(80, 50, -90); scene.add(fill);
  const moon = new THREE.DirectionalLight(0x8fa6ff, 0); moon.position.set(60, 90, -40); scene.add(moon);
  if (skyEl) skyEl.style.display = 'none';

  let composer = null; const fx = {};
  function buildComposer(q) {
    composer = null; if (!q.post) return;
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    if (q.bloom) { fx.bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), 0.22, 0.6, 0.94); composer.addPass(fx.bloom); }
    fx.tiltH = new ShaderPass(HorizontalTiltShiftShader); fx.tiltV = new ShaderPass(VerticalTiltShiftShader);
    composer.addPass(fx.tiltH); composer.addPass(fx.tiltV);
    fx.grade = new ShaderPass(GradeShader); composer.addPass(fx.grade);
    composer.addPass(new OutputPass());
  }

  const stage = {
    renderer, scene, camera, sun, hemi, fill, moon, dome, tier: 'mid', q: TIERS.mid, hour: 15.5, winter: 0, night: 0, updaters: [], skyColors: ['#5d9fe0', '#f5dcc2'],
    tilt: { focus: 0.5, amount: 0 }, // no tilt-shift blur: the whole view stays sharp
    onFrame(fn) { this.updaters.push(fn); return fn; },
    setTier(name) {
      const q = TIERS[name]; this.tier = name; this.q = q;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, q.ratio));
      renderer.shadowMap.enabled = q.shadows; sun.castShadow = q.shadows;
      sun.shadow.mapSize.set(q.shadowSize, q.shadowSize); if (sun.shadow.map) { sun.shadow.map.dispose(); sun.shadow.map = null; }
      scene.traverse((o) => { if (o.material) o.material.needsUpdate = true; });
      buildComposer(q); this.resize();
    },
    resize() {
      const w = canvas.clientWidth || window.innerWidth, h = canvas.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
      if (composer) { composer.setPixelRatio(renderer.getPixelRatio()); composer.setSize(w, h); }
    },
    setTilt(focus = 0.55, amount = 2.6) { this.tilt.focus = focus; this.tilt.amount = amount; },
    setTime(hour, winter = this.winter) {
      this.hour = ((hour % 24) + 24) % 24; this.winter = winter;
      let i = 0; while (i < SKY.length - 2 && SKY[i + 1][0] <= this.hour) i++;
      const a = SKY[i], b = SKY[i + 1], t = clamp((this.hour - a[0]) / (b[0] - a[0]));
      const top = C(a[1]).lerp(C(b[1]), t), bot = C(a[2]).lerp(C(b[2]), t);
      if (winter) { top.lerp(C('#8aa2c4'), 0.4 * winter); bot.lerp(C('#e6edf5'), 0.45 * winter); }
      this.skyColors = ['#' + top.getHexString(), '#' + bot.getHexString()];
      dome.material.uniforms.top.value.copy(top); dome.material.uniforms.bottom.value.copy(bot); scene.fog.color.copy(bot);
      // the sun swings low across the south so shadows stay long and soft
      const k = clamp((this.hour - 6) / 13); const elev = Math.sin(k * Math.PI);
      sun.position.set(-110 + k * 160, 26 + elev * (winter ? 50 : 72), 80 - elev * 20); // low and golden: long, soft shadows
      sun.color.copy(C(a[3]).lerp(C(b[3]), t)); sun.intensity = lerp(a[4], b[4], t) * (winter ? 0.85 : 1);
      hemi.intensity = lerp(a[5], b[5], t); hemi.color.set(winter ? 0xe4eeff : 0xd8e6ff);
      this.night = clamp(1 - lerp(a[4], b[4], t) / 1.2);
      moon.intensity = this.night * 1.1; fill.intensity = 0.45 * (1 - this.night);
      dome.material.uniforms.sunDir.value.copy(sun.position).normalize(); dome.material.uniforms.sunCol.value.copy(sun.color); dome.material.uniforms.sunAmt.value = 1 - this.night; dome.material.uniforms.night.value = this.night;
      WORLD.snow.value = winter;
    },
    render(dt, t) {
      for (const fn of this.updaters) fn(dt, t);
      dome.position.copy(camera.position);
      if (composer) {
        const w = renderer.domElement.width, h = renderer.domElement.height;
        fx.tiltH.uniforms.h.value = this.tilt.amount / w; fx.tiltV.uniforms.v.value = this.tilt.amount / h;
        fx.tiltH.uniforms.r.value = fx.tiltV.uniforms.r.value = this.tilt.focus;
        fx.tiltH.enabled = fx.tiltV.enabled = this.tilt.amount > 0.05;
        composer.render(dt);
      } else renderer.render(scene, camera);
    },
  };
  window.addEventListener('resize', () => stage.resize());
  stage.setTier('mid'); stage.setTime(12.5);
  return stage;
}

export function probeTier(stage, ms = 2500) {
  return new Promise((res) => {
    const t0 = performance.now(); let frames = 0;
    const tick = () => { frames++; if (performance.now() - t0 < ms) requestAnimationFrame(tick); else { const dt = (performance.now() - t0) / frames; res(dt > 40 ? 'low' : dt > 22 ? 'mid' : 'high'); } };
    requestAnimationFrame(tick);
  });
}
