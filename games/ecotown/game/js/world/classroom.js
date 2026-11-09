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
  // ---- dressing (art pass, Nov 2026): a warm, lived-in room rather than a bare box. Two-tone walls with a
  // rail, an inlaid rug down the aisle, tall bookshelves, cork boards with pinned notes, plants on the sills,
  // a little floating-island globe on the shelf and bunting over the screen.
  // Big parts on the room grid (v); small parts on a half-size grid (f), all in two merged meshes.
  for (let x = -X + 1; x < X; x++) for (let y = 1; y <= HT; y++) { if (y === 1) continue; v.set(x, y, Z0, y <= 4 ? (y === 4 ? '#7a4a2a' : (x % 2 ? '#7fb79f' : '#76ad95')) : y > HT - 1 ? '#e8d3ad' : '#f3e6c8'); }
  for (const sx of [-X, X]) for (let z = Z0 + 1; z < Z1; z++) { if (v.get(sx, 5, z)?.getHexString() === 'bfe6ff') continue; for (let y = 2; y <= 3; y++) v.set(sx, y, z, z % 2 ? '#7fb79f' : '#76ad95'); v.set(sx, 4, z, '#7a4a2a'); }
  for (let z = Z0 + 3; z <= Z1; z++) for (let x = -4; x <= 4; x++) v.set(x, 0, z, Math.abs(x) === 4 ? '#8a3f2a' : (z + Math.abs(x)) % 3 === 0 ? '#e3a52c' : (z + x) % 2 ? '#c8553d' : '#b9603e');
  for (let z = Z0 + 3; z <= Z0 + 7; z++) for (let x = -12; x <= -9; x++) v.set(x, 0, z, (x + z) % 2 ? '#2e8b76' : '#287a68'); // a teal mat where Florence teaches
  // bookshelves along the right wall
  for (let z = Z0 + 2; z <= 1; z++) for (let y = 1; y <= 8; y++) { v.set(X - 1, y, z, '#8a5530'); if (y % 3 === 1 || z === Z0 + 2 || z === 1) v.set(X - 2, y, z, '#9a6a42'); }
  const f = new Vox(); f.jitter = 0.04; const fs = (x, y, z, c) => f.set(x, y, z, c); // half-size grid: world = f / 2
  const BOOK = ['#c8553d', '#2f6fd8', '#ffd23f', '#16c79a', '#e6a15a', '#7a4a8a', '#f6efe0', '#3d6e8a', '#5c9a40'];
  for (const shelfY of [2, 5]) for (let z = (Z0 + 3) * 2; z <= 1 * 2 - 1; z++) { const hgt = 2 + ((z * 7 + shelfY) % 3); if ((z * 5 + shelfY) % 11 === 0) continue; for (let y = 0; y < hgt; y++) fs((X - 2) * 2 + 1, shelfY * 2 + y, z, BOOK[(z * 3 + shelfY) % BOOK.length]); fs((X - 2) * 2, shelfY * 2 + hgt - 1, z, BOOK[(z * 3 + shelfY + 4) % BOOK.length]); }
  // cork boards with notes beside the screen
  const board = (x0, x1, y0, y1) => { for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) fs(x, y, Z0 * 2 + 2, x === x0 || x === x1 || y === y0 || y === y1 ? '#8a5530' : (x + y) % 3 ? '#c99a62' : '#bf8f58');
    const NOTE = ['#fff3b0', '#ffd0e0', '#c9f2e4', '#cfe3ff', '#ffffff']; let i = 0; for (let x = x0 + 2; x < x1 - 2; x += 4) for (let y = y0 + 2; y < y1 - 2; y += 4) { const c = NOTE[i++ % NOTE.length]; for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) fs(x + a, y + b, Z0 * 2 + 3, c); fs(x + 1, y + 2, Z0 * 2 + 4, ['#e8573f', '#2f6fd8', '#16c79a'][i % 3]); } };
  board(21, 25, 8, 19); board(-25, -21, 6, 16);
  // a round clock over Florence's corner, and bunting along the top of the screen
  for (let x = -4; x <= 4; x++) for (let y = -4; y <= 4; y++) { const d = Math.hypot(x, y); if (d <= 4.4) fs(-23 + x, 21 + y, Z0 * 2 + 2, d > 3.4 ? '#7a4a2a' : '#fffaf0'); }
  for (let y = 0; y <= 2; y++) fs(-23, 21 + y, Z0 * 2 + 3, '#5b4a40'); fs(-22, 21, Z0 * 2 + 3, '#5b4a40'); fs(-23, 21, Z0 * 2 + 4, '#c8553d');
  for (let x = -18; x <= 18; x++) { const sag = Math.round(Math.abs(Math.sin(x / 6 * Math.PI)) * -1); fs(x, 27 + sag, Z0 * 2 + 4, '#7a5232'); if (x % 3 === 0) { const c = ['#ffd23f', '#16c79a', '#e8573f', '#2f6fd8', '#ff7eb6'][(x + 18) / 3 % 5]; for (let w = -1; w <= 1; w++) fs(x + w, 26 + sag, Z0 * 2 + 4, c); fs(x, 25 + sag, Z0 * 2 + 4, c); } }
  // plants on the window sills
  for (let z = (Z0 + 3) * 2; z <= (Z1 - 3) * 2; z += 7) { const wz = Math.round(z / 2); if (v.get(-X, 6, wz)?.getHexString() !== 'bfe6ff') continue; for (let y = 10; y <= 11; y++) for (const dz of [0, 1]) fs(-(X - 1) * 2, y, z + dz, '#c8653d'); for (let y = 12; y <= 14; y++) for (const dz of [-1, 0, 1, 2]) if (y < 14 || dz === 0 || dz === 1) fs(-(X - 1) * 2 + (y === 13 ? 1 : 0), y, z + dz, y === 14 ? '#6aab4a' : '#4f8f3a'); }
  // on top of the bookshelf: a stack of books, a pencil pot and the globe, a little floating island on a stand
  { const top = 16, sx = (X - 2) * 2 + 1;
    for (let y = top; y <= top + 2; y++) for (const dz of [0, 1]) fs(sx, y, -12 + dz, ['#c8553d', '#ffd23f', '#2f6fd8'][y - top]);
    fs(sx, top, -2, '#3d6e8a'); fs(sx, top + 1, -2, '#3d6e8a'); fs(sx, top + 2, -2, '#ffd23f'); fs(sx - 1, top + 2, -2, '#e8573f');
    const gx = sx - 1, gz = -7; fs(gx, top, gz, '#6b4a2e'); fs(gx, top + 1, gz, '#6b4a2e'); fs(gx, top + 2, gz, '#c9a04a');
    for (let x = -2; x <= 2; x++) for (let z = -2; z <= 2; z++) { const d = Math.hypot(x, z); if (d > 2.4) continue; fs(gx + x, top + 5, gz + z, '#6aab4a'); fs(gx + x, top + 4, gz + z, '#c8653d'); if (d < 1.6) fs(gx + x, top + 3, gz + z, '#a8442e'); }
    fs(gx, top + 6, gz, '#6b4a2e'); fs(gx, top + 7, gz, '#4f8f3a'); fs(gx - 1, top + 7, gz, '#5c9a40'); fs(gx, top + 8, gz, '#5c9a40'); fs(gx - 1, top + 6, gz + 1, '#e8eef2'); fs(gx - 1, top + 7, gz + 1, '#b5523b'); }
  root.add(v.mesh());
  { const fm = f.mesh({ scale: 0.5 }); root.add(fm); }
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
