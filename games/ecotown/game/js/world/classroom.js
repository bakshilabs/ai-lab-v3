// The AI Lab classroom: entered from the AI Lab building (or 🧪). Florence stands at the front beside a big
// screen; the player sits at the back with a few classmates. The screen shows a title card, Florence's answer,
// or a build video (a video texture). Built below the island, like the inside view, and reached with a fade.
import * as THREE from 'three';
import { Vox } from '../engine/voxel.js';
import { person } from '../engine/kit.js';

export const CLASS_BASE = new THREE.Vector3(700, -800, 0); // off to the side, so nothing in it snaps to the island's tiles above
const SW = 15, SH = SW * 9 / 16; // the screen, 16:9

export function createClassroom(stage) {
  const root = new THREE.Group(); root.position.copy(CLASS_BASE); root.visible = false; stage.scene.add(root);
  // ---- the room: plank floor, warm walls with a skirting row, windows on the left, a ceiling with lamps
  const v = new Vox(); v.jitter = 0.03;
  const X = 13, Z0 = -10, Z1 = 12, HT = 13;
  for (let x = -X; x <= X; x++) for (let z = Z0; z <= Z1; z++) v.set(x, 0, z, (Math.floor(x / 2) + z) % 3 === 0 ? '#c9945e' : (x + z) % 2 ? '#d9a870' : '#cf9d66');
  for (let y = 1; y <= HT; y++) {
    for (let x = -X; x <= X; x++) v.set(x, y, Z0, y === 1 ? '#7a4a2a' : y > HT - 1 ? '#e8d3ad' : '#a8d5c4');
    for (let z = Z0; z <= Z1; z++) for (const sx of [-X, X]) {
      const win = sx === -X && y >= 4 && y <= 9 && ((z + 20) % 7) >= 2 && ((z + 20) % 7) <= 5 && z < Z1 - 1;
      v.set(sx, y, z, win ? (y === 4 || y === 9 ? '#f6efe0' : '#bfe6ff') : y === 1 ? '#7a4a2a' : '#f1e1c0');
    }
  }
  for (let x = -X; x <= X; x++) for (let z = Z0; z <= Z1; z++) v.set(x, HT + 1, z, (x % 6 === 0 && z % 5 === 0) ? '#fff6d8' : '#efe2c8');
  // the screen's wooden frame and a shelf of little builds under it
  for (let x = -SW / 2 - 1; x <= SW / 2 + 1; x++) { v.set(Math.round(x), 2, Z0 + 1, '#7a4a2a'); v.set(Math.round(x), Math.round(3 + SH + 1), Z0 + 1, '#7a4a2a'); }
  for (let y = 2; y <= Math.round(3 + SH + 1); y++) { v.set(Math.round(-SW / 2 - 1), y, Z0 + 1, '#7a4a2a'); v.set(Math.round(SW / 2 + 1), y, Z0 + 1, '#7a4a2a'); }
  // desks in three rows (the player sits at the back)
  for (const z of [0, 4.5, 9]) for (const x of [-7, 0, 7]) {
    const xi = Math.round(x), zi = Math.round(z);
    for (let dx = -2; dx <= 2; dx++) for (let dz = -1; dz <= 0; dz++) v.set(xi + dx, 3, zi + dz, '#b9783f');
    for (const [lx, lz] of [[-2, -1], [2, -1], [-2, 0], [2, 0]]) for (let y = 1; y <= 2; y++) v.set(xi + lx, y, zi + lz, '#7a4a2a');
    for (let dx = -1; dx <= 1; dx++) { v.set(xi + dx, 2, zi + 2, '#c8553d'); v.set(xi + dx, 3, zi + 3, '#c8553d'); v.set(xi + dx, 4, zi + 3, '#c8553d'); }
  }
  // a green plant in each back corner
  for (const sx of [-X + 2, X - 2]) { for (let y = 1; y <= 2; y++) v.set(sx, y, Z1 - 2, '#a0522d'); for (let dx = -1; dx <= 1; dx++) for (let dz = -1; dz <= 1; dz++) for (let y = 3; y <= 5; y++) if (Math.abs(dx) + Math.abs(dz) + (y === 5 ? 1 : 0) < 3) v.set(sx + dx, y, Z1 - 2 + dz, '#4caf50'); }
  root.add(v.mesh());
  // classmates at the front desks, facing the screen
  const kids = [];
  for (const [x, z, i] of [[-7, 1.6, 0], [7, 1.6, 1], [0, 6.1, 2], [-7, 6.1, 3]]) {
    const p = person({ shirt: ['#ff8a5c', '#2f6fd8', '#ffd23f', '#7fd0ff'][i], skin: ['#8d5a3b', '#f1c9a5', '#c68a5e', '#e0ac7e'][i], hair: ['#7a4a2a', '#c2662d', '#5a3a22', '#9a6a3a'][i], style: ['long', 'short', 'bun', 'short'][i], s: 0.5 });
    p.position.set(x, 1, z); p.rotation.y = Math.PI; root.add(p); kids.push(p);
  }
  // lights of its own (the room is far below the island's sun)
  const lamp = new THREE.PointLight(0xfff0d0, 60, 60, 1.6); lamp.position.set(0, HT - 1, 2); root.add(lamp);
  const fill = new THREE.PointLight(0xdff2ff, 25, 50, 1.6); fill.position.set(-X + 2, 7, 4); root.add(fill);
  const glow = new THREE.PointLight(0xbfe6ff, 12, 22, 1.8); glow.position.set(0, 3 + SH / 2, Z0 + 4); root.add(glow);

  // ---- the big screen: a canvas card or a video
  const cv = document.createElement('canvas'); cv.width = 1024; cv.height = 576; const g = cv.getContext('2d');
  const cardTex = new THREE.CanvasTexture(cv); cardTex.colorSpace = THREE.SRGBColorSpace;
  const screenMat = new THREE.MeshBasicMaterial({ map: cardTex, toneMapped: false });
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(SW, SH), screenMat); screen.position.set(0, 3 + SH / 2 + 0.5, Z0 + 1.62); root.add(screen);
  const video = document.createElement('video'); video.muted = true; video.playsInline = true; video.crossOrigin = 'anonymous'; video.preload = 'auto';
  const vidTex = new THREE.VideoTexture(video); vidTex.colorSpace = THREE.SRGBColorSpace;
  function card(title, lines = [], { icon = '' } = {}) {
    video.pause(); screenMat.map = cardTex;
    const gr = g.createLinearGradient(0, 0, 0, 576); gr.addColorStop(0, '#1d4f5a'); gr.addColorStop(1, '#123640'); g.fillStyle = gr; g.fillRect(0, 0, 1024, 576);
    g.fillStyle = '#ffd23f'; g.font = '800 54px Bricolage, Inter, sans-serif'; g.textAlign = 'left'; g.fillText(`${icon ? icon + '  ' : ''}${title}`, 56, 96);
    g.fillStyle = '#f6efe0'; g.font = '600 34px Inter, sans-serif'; let y = 170;
    for (const line of lines) for (const row of wrap(g, line, 912)) { if (y > 540) break; g.fillText(row, 56, y); y += 46; }
    cardTex.needsUpdate = true;
  }
  card('AI Lab', ['Ask Florence a question,', 'or pick a mission to test her plans.'], { icon: '🧪' });

  return {
    root, kids, screen,
    // where Florence stands (front left, beside the screen) and where she looks
    florenceAt: () => CLASS_BASE.clone().add(new THREE.Vector3(-SW / 2 - 3.2, 1, Z0 + 4.5)),
    eye: () => CLASS_BASE.clone().add(new THREE.Vector3(0, 8.5, Z1 - 1)),
    screenAt: () => screen.getWorldPosition(new THREE.Vector3()),
    // the player's seat at the back: Florence and the whole screen in view
    pose() { return { pos: CLASS_BASE.clone().add(new THREE.Vector3(0, 9.6, Z1 + 3)), look: CLASS_BASE.clone().add(new THREE.Vector3(-1.5, 6.2, Z0)), fov: 52 }; },
    card,
    // play a build video on the screen; resolves when it ends (or is stopped)
    play(src) {
      return new Promise((res) => {
        video.onended = () => res(true); video.onerror = () => { card('Video', ['This video isn’t available here.']); res(false); };
        video.src = src; screenMat.map = vidTex; screenMat.needsUpdate = true; video.currentTime = 0; video.play().catch(() => res(false));
      });
    },
    stop() { video.pause(); },
    show(on) { root.visible = on; if (!on) video.pause(); },
    update(dt, t) { if (!root.visible) return; kids.forEach((k, i) => { k.rotation.y = Math.PI + Math.sin(t * 0.7 + i * 1.7) * 0.18; }); },
  };
}
function wrap(g, text, max) { const out = []; let line = ''; for (const w of String(text).split(' ')) { const t = line ? line + ' ' + w : w; if (g.measureText(t).width > max && line) { out.push(line); line = w; } else line = t; } if (line) out.push(line); return out; }
