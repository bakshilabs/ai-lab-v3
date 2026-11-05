// Renderer, lights, time of day and automatic quality tiers.
import * as THREE from 'three';
import { WORLD } from './voxel.js';

export const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const lerp = (a, b, t) => a + (b - a) * t;
export const ease = {
  inOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  out: (t) => 1 - Math.pow(1 - t, 3),
  in: (t) => t * t * t,
  back: (t) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
};

// Quality tiers: chosen from a frame-time probe, can be overridden in settings.
export const TIERS = {
  low:  { ratio: 1,   shadows: false, shadowSize: 1024, particles: 0.4, residents: 10 },
  mid:  { ratio: 1.5, shadows: true,  shadowSize: 1024, particles: 0.7, residents: 18 },
  high: { ratio: 2,   shadows: true,  shadowSize: 2048, particles: 1,   residents: 28 },
};

// Sky colour keyframes over a day (hour → [top, bottom, sun colour, sun intensity, hemi intensity, ambient tint])
const SKY = [
  [0,  '#0b1a44', '#1d3a7a', '#7c8cff', 0.0, 0.35],
  [5,  '#24305f', '#e08a6a', '#ffb07a', 0.4, 0.55],
  [7,  '#5aa8f0', '#ffd9b0', '#ffe2b8', 1.9, 1.0],
  [10, '#4aa6ff', '#cfeaff', '#fff1da', 2.8, 1.25],
  [15, '#4aa6ff', '#d4ecff', '#fff1da', 2.7, 1.25],
  [18, '#3f7fd6', '#ffc58a', '#ffbd7a', 1.8, 1.0],
  [19.5, '#2a3f86', '#ff8f6a', '#ff8a5c', 0.6, 0.6],
  [21, '#0e1d4f', '#26407f', '#8090ff', 0.0, 0.38],
  [24, '#0b1a44', '#1d3a7a', '#7c8cff', 0.0, 0.35],
];
const C = (h) => new THREE.Color(h);

export function createStage(canvas, skyEl) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.5, 2000);
  const hemi = new THREE.HemisphereLight(0xcfe8ff, 0x7a5a3a, 1.25); scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xfff0d8, 2.7); sun.castShadow = true; scene.add(sun, sun.target);
  const sc = sun.shadow.camera; sc.left = -75; sc.right = 75; sc.top = 75; sc.bottom = -75; sc.near = 1; sc.far = 400;
  sun.shadow.bias = -0.0006; sun.shadow.normalBias = 0.03;
  const rim = new THREE.DirectionalLight(0xbfe0ff, 0.5); rim.position.set(80, 40, -90); scene.add(rim);
  const moon = new THREE.DirectionalLight(0x8fa6ff, 0); moon.position.set(60, 90, -40); scene.add(moon);

  // star field for the night sky (CSS layer behind the transparent canvas)
  const stars = document.createElement('canvas'); stars.className = 'stars';
  skyEl.appendChild(stars);

  const stage = {
    renderer, scene, camera, sun, hemi, rim, moon, tier: 'mid', hour: 11, winter: 0, updaters: [], night: 0,
    onFrame(fn) { this.updaters.push(fn); return fn; },
    setTier(name) {
      const q = TIERS[name]; this.tier = name; this.q = q;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, q.ratio));
      renderer.shadowMap.enabled = q.shadows; sun.castShadow = q.shadows;
      sun.shadow.mapSize.set(q.shadowSize, q.shadowSize); if (sun.shadow.map) { sun.shadow.map.dispose(); sun.shadow.map = null; }
      scene.traverse((o) => { if (o.material) o.material.needsUpdate = true; });
      this.resize();
    },
    resize() {
      const w = canvas.clientWidth || window.innerWidth, h = canvas.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
      stars.width = w; stars.height = h; drawStars(stars);
    },
    // hour: 0–24. winter: 0..1 (snow on tops, low sun, paler sky)
    setTime(hour, winter = this.winter) {
      this.hour = ((hour % 24) + 24) % 24; this.winter = winter;
      let i = 0; while (i < SKY.length - 2 && SKY[i + 1][0] <= this.hour) i++;
      const a = SKY[i], b = SKY[i + 1], t = clamp((this.hour - a[0]) / (b[0] - a[0]));
      const top = C(a[1]).lerp(C(b[1]), t), bot = C(a[2]).lerp(C(b[2]), t);
      if (winter) { top.lerp(C('#9db4cf'), 0.35 * winter); bot.lerp(C('#e8eef5'), 0.4 * winter); }
      this.skyColors = ['#' + top.getHexString(), '#' + bot.getHexString()];
      skyEl.style.background = `linear-gradient(180deg, ${this.skyColors[0]} 0%, ${this.skyColors[1]} 100%)`;
      const ang = ((this.hour - 6) / 12) * Math.PI; // sunrise 6, sunset 18
      const elev = Math.sin(ang) * (winter ? 0.6 : 1);
      sun.position.set(Math.cos(ang) * -110, Math.max(8, elev * 130), 50);
      sun.color.copy(C(a[3]).lerp(C(b[3]), t)); sun.intensity = lerp(a[4], b[4], t) * (winter ? 0.8 : 1);
      hemi.intensity = lerp(a[5], b[5], t); hemi.color.set(winter ? 0xe0ecff : 0xcfe8ff);
      this.night = clamp(1 - lerp(a[4], b[4], t) / 1.2);
      moon.intensity = this.night * 1.1; rim.intensity = 0.5 * (1 - this.night);
      stars.style.opacity = clamp((this.night - 0.4) * 1.8);
      WORLD.snow.value = winter;
    },
    render(dt, t) {
      for (const fn of this.updaters) fn(dt, t);
      renderer.render(scene, camera);
    },
  };
  window.addEventListener('resize', () => stage.resize());
  stage.setTier('mid'); stage.setTime(11);
  return stage;
}

function drawStars(c) {
  const g = c.getContext('2d'); g.clearRect(0, 0, c.width, c.height);
  for (let i = 0; i < 260; i++) {
    const x = (Math.sin(i * 12.9898) * 43758.5453 % 1 + 1) % 1, y = (Math.sin(i * 78.233) * 12543.123 % 1 + 1) % 1;
    g.fillStyle = `rgba(255,255,255,${0.4 + (i % 5) / 8})`; const r = i % 9 === 0 ? 2 : 1;
    g.fillRect(x * c.width, y * c.height * 0.7, r, r);
  }
}

// Measures average frame time for `ms` and suggests a tier.
export function probeTier(stage, ms = 2500) {
  return new Promise((res) => {
    const t0 = performance.now(); let frames = 0;
    const tick = () => { frames++; if (performance.now() - t0 < ms) requestAnimationFrame(tick); else { const dt = (performance.now() - t0) / frames; res(dt > 38 ? 'low' : dt > 22 ? (stage.tier === 'high' ? 'mid' : stage.tier) : 'high'); } };
    requestAnimationFrame(tick);
  });
}
