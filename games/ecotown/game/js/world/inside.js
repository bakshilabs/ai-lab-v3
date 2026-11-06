// Inside view: a dollhouse room for a home type, built below the island and reached with a fade.
// The roof lifts off and the front wall is left open so the room reads like a dollhouse.
import * as THREE from 'three';
import { Vox } from '../engine/voxel.js';
import { person } from '../engine/kit.js';

const ROOMS = {
  timber: { wall: '#c9955f', wall2: '#b07a4a', floor: '#d9b48a', label: 'Timber living room' },
  straw: { wall: '#efe2b8', wall2: '#e3d29e', floor: '#c99a6a', label: 'Straw-bale living room' },
  earth: { wall: '#d39a68', wall2: '#c98a5a', floor: '#a7774c', label: 'Rammed-earth living room' },
  reclaimed: { wall: '#c2614a', wall2: '#b5523b', floor: '#9a6a42', label: 'Reclaimed-brick living room' },
  cohousing: { wall: '#f1dcc0', wall2: '#e6c9a0', floor: '#c99a6a', label: 'Cohousing common room' },
  concrete: { wall: '#b4b9bd', wall2: '#a3a8ac', floor: '#8b8f93', label: 'Concrete flat' },
  school: { wall: '#fff3d6', wall2: '#ffd23f', floor: '#c99a6a', label: 'Straw-bale classroom' },
};
export const BASE = new THREE.Vector3(0, -420, 0);

export function createInside(stage) {
  const root = new THREE.Group(); root.position.copy(BASE); root.visible = false; stage.scene.add(root);
  const light = new THREE.PointLight(0xffe2b0, 0, 40); light.position.set(0, 8, 2); root.add(light);
  let roof = null, room = null, people = [], cold = false, t0 = 0;
  const inside = {
    root, label: '',
    build(type, temp) {
      if (room) root.remove(room); if (roof) root.remove(roof); people.forEach((p) => root.remove(p)); people = [];
      const R = ROOMS[type] || ROOMS.timber; this.label = R.label; cold = temp < 18;
      const v = new Vox(); v.jitter = 0.05;
      for (let x = -6; x <= 6; x++) for (let z = -4; z <= 4; z++) v.set(x, 0, z, (x + z) % 2 ? R.floor : shade(R.floor));
      for (let y = 1; y <= 6; y++) { for (let x = -6; x <= 6; x++) v.set(x, y, -4, y === 3 && Math.abs(x) < 3 && x % 2 === 0 ? '#9fd8f5' : (y + x) % 2 ? R.wall : R.wall2); for (let z = -4; z <= 4; z++) { v.set(-6, y, z, (y + z) % 2 ? R.wall : R.wall2); v.set(6, y, z, (y + z) % 2 ? R.wall : R.wall2); } }
      v.box(-4, 1, -3, -1, 1, -2, '#5b7fbf'); v.box(-4, 2, -3, -4, 2, -2, '#5b7fbf'); v.box(-1, 2, -3, -1, 2, -2, '#5b7fbf'); // sofa
      v.box(1, 1, 0, 3, 1, 1, '#8a5c38'); v.set(1, 0, 0, '#7a4a2c'); v.box(4, 1, -3, 5, 4, -3, '#7a5232'); // table and shelf
      if (type === 'school') { for (const x of [-3, 0, 3]) v.box(x, 1, 1, x + 1, 1, 1, '#c98a5a'); v.box(-3, 3, -4, 3, 5, -4, '#2f6f4a'); }
      v.box(-5, 1, 3, -5, 2, 3, '#4caf50'); v.set(-5, 3, 3, '#5bbd5a'); // plant
      room = v.mesh(); root.add(room);
      const r = new Vox(); for (let x = -7; x <= 7; x++) for (let z = -5; z <= 5; z++) r.set(x, 0, z, type === 'concrete' ? '#7d8286' : '#c0563a'); roof = r.mesh(); roof.position.y = 7; root.add(roof);
      for (let i = 0; i < 3; i++) { const p = person({ shirt: ['#ff8a5c', '#2f6fd8', '#ffd23f'][i], s: i === 2 ? 0.25 : 0.33 }); p.position.set(-3 + i * 2.2, 1, 0.5 + (i === 1 ? -1 : 0)); p.rotation.y = 0.3; root.add(p); people.push(p); }
      t0 = performance.now();
    },
    pose() { const p = BASE.clone().add(new THREE.Vector3(0, 9, 19)); return { pos: p, look: BASE.clone().add(new THREE.Vector3(0, 2.5, 0)), fov: 42 }; },
    update(dt, t) {
      if (!root.visible) return;
      const k = Math.min(1, (performance.now() - t0) / 1100); if (roof) { roof.position.y = 7 + k * k * 14; roof.rotation.z = k * 0.25; }
      light.intensity = 30;
      people.forEach((p, i) => { p.position.x += cold ? Math.sin(t * 38 + i) * 0.02 : 0; p.userData.walk(0); });
    },
  };
  return inside;
}
function shade(hex) { const c = new THREE.Color(hex).multiplyScalar(0.9); return '#' + c.getHexString(); }
