// Pictures for the build buttons: every item rendered once from the game's own voxel builders, on a small
// grass block, at the sky view's angle. One small off-screen renderer, used once at start-up, then freed.
import * as THREE from 'three';
import { ITEMS } from '../world/catalog.js';

const HOME_FOR_MOD = 'timber';
export function makeThumbs(world, ids = Object.keys(ITEMS), { size = 160, extra = {} } = {}) {
  const out = {};
  let r;
  try { r = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true }); } catch { return out; }
  r.setPixelRatio(1); r.setSize(size, size); r.outputColorSpace = THREE.SRGBColorSpace; r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 1.05;
  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight('#fff6e8', '#6d5a44', 1.5));
  const sun = new THREE.DirectionalLight('#fff0d0', 2.2); sun.position.set(-6, 12, 8); scene.add(sun);
  const cam = new THREE.PerspectiveCamera(30, 1, 0.1, 200);
  // the grass block every build stands on (earth sides, like the island's terraces)
  const base = new THREE.Group();
  const top = new THREE.Mesh(new THREE.BoxGeometry(6, 0.6, 6), new THREE.MeshLambertMaterial({ color: '#8cc35a' })); top.position.y = 0.7; base.add(top);
  const earth = new THREE.Mesh(new THREE.BoxGeometry(6, 1.4, 6), new THREE.MeshLambertMaterial({ color: '#b5683f' })); earth.position.y = -0.3; base.add(earth);
  scene.add(base);
  const shot = (cell, opts = {}) => {
    const g = world.thumbModel(cell, opts.tile); scene.add(g);
    top.material.color.set(opts.water ? '#5fb3e6' : '#8cc35a');
    const box = new THREE.Box3().setFromObject(g).union(new THREE.Box3().setFromObject(base)); const sph = box.getBoundingSphere(new THREE.Sphere());
    // fit the whole build in the picture (tall builds such as the wind turbine are framed by the tower, not cropped)
    const d = (sph.radius / Math.sin((cam.fov * Math.PI) / 360)) * (opts.tight || 0.92); const c = sph.center;
    const dir = new THREE.Vector3(-0.6, 0.7, 0.6).normalize(); cam.position.copy(c).addScaledVector(dir, d); cam.lookAt(c);
    r.render(scene, cam); const url = r.domElement.toDataURL('image/png');
    scene.remove(g); g.traverse((o) => { if (o.isMesh) { o.geometry.dispose(); } }); return url;
  };
  for (const id of ids) {
    const it = ITEMS[id]; if (!it) continue;
    try {
      if (it.kind === 'mark') out[id] = shot({ mark: id, item: null, mods: [] });
      else if (it.kind === 'mod') out[id] = shot({ mark: 'town', item: HOME_FOR_MOD, mods: [id] });
      else out[id] = shot({ mark: it.on.includes('town') ? 'town' : null, item: id, mods: [] }, { tile: id === 'bridge' ? { gx: 0, gz: 4, zone: 'river', h: 0, k: '0,4' } : undefined, water: id === 'bridge', tight: id === 'wind' ? 0.62 : undefined });
    } catch (e) { console.warn('thumb', id, e.message); }
  }
  for (const [k, cell] of Object.entries(extra)) { try { out[k] = shot(cell); } catch { /* */ } }
  r.dispose(); r.forceContextLoss?.();
  return out;
}
