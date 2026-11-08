// Florence's live portrait for her card and the mission dock: a second, small copy of the 3D Florence
// (js/engine/florence.js) in her own little scene, so she really talks (mouth, nods, blinks) and makes the same
// gestures as the Florence on the island (cheer, oops, wave…). One canvas, moved into whichever card shows her.
// It only renders while it is on screen. Falls back to the still picture if WebGL can't start.
import * as THREE from 'three';

export function createPortrait(createFlorence) {
  const canvas = document.createElement('canvas'); canvas.className = 'portrait live'; canvas.setAttribute('role', 'img'); canvas.setAttribute('aria-label', 'Florence');
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' }); } catch { return null; }
  const W = 180, H = 180; renderer.setPixelRatio(Math.min(2, devicePixelRatio || 1)); renderer.setSize(W, H, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.setClearColor(0x000000, 0);
  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xfff4e0, 0x8a6a4a, 1.6));
  const key = new THREE.DirectionalLight(0xffe2b8, 2.2); key.position.set(4, 8, 9); scene.add(key);
  const rim = new THREE.DirectionalLight(0xbfe6ff, 0.9); rim.position.set(-6, 5, -4); scene.add(rim);
  // a stand-in island: flat ground at y = 0, no tiles
  const bot = createFlorence({ scene }, { tileTop: () => new THREE.Vector3() }, { tiles: new Map() });
  bot.appear(new THREE.Vector3(0, 0, 0));
  const camera = new THREE.PerspectiveCamera(26, W / H, 0.1, 100);
  camera.position.set(0, 5.4, 8.6); camera.lookAt(0, 4.85, 0); // head and shoulders
  bot.look(new THREE.Vector3(0, 5.4, 8.6)); // she looks at the player
  let last = performance.now(), t = 0, running = false;
  const visible = () => canvas.isConnected && canvas.offsetParent !== null;
  function frame(now) {
    if (!visible()) { running = false; return; }
    const dt = Math.min(0.05, (now - last) / 1000); last = now; t += dt;
    bot.update(dt, t); renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  const wake = () => { if (!running) { running = true; last = performance.now(); requestAnimationFrame(frame); } };
  const P = {
    canvas, bot,
    // put the live portrait into a card, in place of the picture placeholder
    mount(el) { const slot = el?.querySelector('[data-portrait]'); if (!slot) return; slot.replaceWith(canvas); requestAnimationFrame(wake); },
    talk(seconds) { bot.talk(seconds); wake(); },
    set reduce(v) { bot.reduce = v; },
  };
  for (const g of ['wave', 'cheer', 'oops', 'shrug', 'proud', 'surprised', 'think', 'nod']) P[g] = () => { bot[g](); wake(); };
  return P;
}
