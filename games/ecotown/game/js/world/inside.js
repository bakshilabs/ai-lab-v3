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
      const v = new Vox(); v.jitter = 0.03;
      for (let x = -6; x <= 6; x++) for (let z = -4; z <= 4; z++) v.set(x, 0, z, (x + z) % 2 ? R.floor : shade(R.floor));
      // plain walls with a skirting row; a window on the back wall (frosted when the home is cold)
      const wallC = (y) => (y === 1 ? shade(R.wall2) : R.wall);
      for (let y = 1; y <= 6; y++) { for (let x = -6; x <= 6; x++) v.set(x, y, -4, wallC(y)); for (let z = -4; z <= 4; z++) { v.set(-6, y, z, wallC(y)); v.set(6, y, z, wallC(y)); } }
      for (let x = -2; x <= 1; x++) for (let y = 3; y <= 4; y++) v.set(x, y, -4, cold && (x === -2 || x === 1 || y === 4) ? '#eef6ff' : '#9fd8f5');
      // the truth window: the right wall cut away to show what the walls are made of
      const LAYER = { straw: ['#e8c870', '#d9b456'], timber: ['#c08a56', '#e8d9b0'], earth: ['#c98a5a', '#b87a4c'], reclaimed: ['#b5523b', '#c9b8a2'], cohousing: ['#c08a56', '#e8d9b0'], concrete: ['#a3a8ac', '#6b7076'], school: ['#e8c870', '#d9b456'] }[type] || ['#c08a56', '#e8d9b0'];
      for (let y = 2; y <= 5; y++) for (let z = -1; z <= 2; z++) v.set(6, y, z, (type === 'earth' ? y % 2 : type === 'concrete' ? (y + z) % 3 === 0 : (y + z) % 2) ? LAYER[0] : LAYER[1]);
      for (let y = 1; y <= 6; y++) { v.set(6, y, -2, '#7a4a2c'); v.set(6, y, 3, '#7a4a2c'); } for (let z = -2; z <= 3; z++) { v.set(6, 1, z, '#7a4a2c'); v.set(6, 6, z, '#7a4a2c'); }
      // a rug, the sofa (with a blanket when it's cold), a table, a lamp, a bookshelf and a kitchen corner
      for (let x = -3; x <= 2; x++) for (let z = -1; z <= 2; z++) v.set(x, 0, z, (x + z) % 2 ? '#c8553d' : '#e6a15a');
      v.box(-4, 1, -3, -1, 1, -2, '#5b7fbf'); v.box(-4, 2, -3, -4, 2, -2, '#5b7fbf'); v.box(-1, 2, -3, -1, 2, -2, '#5b7fbf');
      if (cold) v.box(-3, 2, -3, -2, 2, -2, '#d9433a');
      v.box(1, 1, 0, 3, 1, 1, '#8a5c38'); v.set(1, 0, 0, '#7a4a2c');
      v.set(-5, 1, -3, '#3a4752'); v.set(-5, 2, -3, '#3a4752'); v.set(-5, 3, -3, '#ffe9a8');
      v.box(3, 1, -3, 5, 4, -3, '#7a5232'); for (let x = 3; x <= 5; x++) for (const y of [2, 3, 4]) v.set(x, y, -3, ['#c8553d', '#3d6e8a', '#e8c870', '#5a6d50'][(x + y) % 4]);
      v.box(-5, 1, 1, -5, 2, 3, '#e8e2d4'); v.set(-5, 3, 2, '#9aa0a5');
      // heating: a gas boiler on the wall for concrete and brick homes, a heat-pump unit for the others
      if (['concrete', 'reclaimed'].includes(type)) { v.box(2, 4, -4, 2, 5, -4, '#e8eef2'); v.set(2, 3, -4, '#ff8a3a'); } else { v.box(2, 5, -4, 4, 5, -4, '#e8eef2'); v.set(3, 5, -4, '#3a4752'); }
      if (type === 'school') { for (const x of [-3, 0, 3]) v.box(x, 1, 1, x + 1, 1, 1, '#c98a5a'); v.box(-3, 3, -4, 3, 5, -4, '#2f6f4a'); }
      v.box(-5, 1, -1, -5, 2, -1, '#8a5c38'); v.set(-5, 3, -1, '#5c9a40'); v.set(-5, 4, -1, '#6aab4a');
      // a terracotta block under the room, with grass round the edge, so it isn't floating in empty sky
      for (let x = -7; x <= 7; x++) for (let z = -5; z <= 5; z++) { v.set(x, -1, z, Math.abs(x) === 7 || Math.abs(z) === 5 ? '#94bf58' : '#c8653d'); if (Math.abs(x) < 7 && Math.abs(z) < 5) v.set(x, -2, z, '#b5523b'); }
      room = v.mesh(); root.add(room);
      const r = new Vox(); for (let x = -7; x <= 7; x++) for (let z = -5; z <= 5; z++) r.set(x, 0, z, type === 'concrete' ? '#7d8286' : '#c0563a'); roof = r.mesh(); roof.position.y = 7; root.add(roof);
      for (let i = 0; i < 3; i++) { const p = person({ shirt: ['#ff8a5c', '#2f6fd8', '#ffd23f'][i], skin: ['#8d5a3b', '#f1c9a5', '#c68a5e'][i], hair: ['#1d140e', '#c2662d', '#4a2c1a'][i], style: ['long', 'short', 'bun'][i], s: i === 2 ? 0.24 : 0.32 }); p.position.set(-3 + i * 2.2, 1, 0.5 + (i === 1 ? -1 : 0)); p.rotation.y = 0.3; root.add(p); people.push(p); }
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
