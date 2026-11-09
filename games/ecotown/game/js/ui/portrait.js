// Florence's live full-body figure for her card and the mission dock: a second, small copy of the 3D Florence
// (js/engine/florence.js) in her own little scene, so she really talks (mouth, nods, blinks) and makes the same
// gestures as the Florence on the island (cheer, oops, wave…). One canvas, moved into whichever card shows her.
// It only renders while it is on screen. Falls back to the still picture if WebGL can't start.
import * as THREE from 'three';

export function createPortrait(createFlorence) {
  const canvas = document.createElement('canvas'); canvas.className = 'portrait live'; canvas.setAttribute('role', 'img'); canvas.setAttribute('aria-label', 'Florence');
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' }); } catch { return null; }
  const W = 150, H = 225; // the whole robot, head to feet
  renderer.setPixelRatio(Math.min(2, devicePixelRatio || 1)); renderer.setSize(W, H, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.setClearColor(0x000000, 0);
  // studio lighting, closer to the client's rendered art: soft light from a warm "room"
  // all around her (image-based lighting), a key light with soft shadows and a cool rim light
  renderer.toneMapping = THREE.NoToneMapping; // (filmic tone mapping washed out her warm wood)
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene();
  scene.environment = studio(renderer);
  scene.add(new THREE.HemisphereLight(0xfff4e0, 0x6a4a2a, 0.35));
  const key = new THREE.DirectionalLight(0xffe2b8, 2.4); key.position.set(3, 10, 10); key.castShadow = true; key.shadow.mapSize.set(512, 512); key.shadow.radius = 6; key.shadow.bias = -0.0005;
  Object.assign(key.shadow.camera, { left: -5, right: 5, top: 9, bottom: -1, near: 1, far: 40 }); scene.add(key);
  const rim = new THREE.DirectionalLight(0xbfe6ff, 1.1); rim.position.set(-6, 6, -5); scene.add(rim);
  // a soft contact shadow under her feet
  scene.add(contactShadow());
  // a stand-in island: flat ground at y = 0, no tiles
  const bot = createFlorence({ scene }, { tileTop: () => new THREE.Vector3() }, { tiles: new Map() });
  bot.appear(new THREE.Vector3(0, 0, 0));
  bot.group.traverse((m) => { if (m.isMesh && m.material?.isMeshStandardMaterial) m.material.envMapIntensity = 0.4; });
  const camera = new THREE.PerspectiveCamera(26, W / H, 0.1, 100);
  camera.position.set(0, 4.4, 18); camera.lookAt(0, 3.8, 0); // her whole body, with headroom for a cheer or a jump
  bot.look(new THREE.Vector3(0, 4.4, 18)); // she looks at the player
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

// a warm room for image-based lighting: a gradient dome (bright ceiling, warm walls, brown floor) and two soft
// light panels, prefiltered by three.js into an environment map (no image files needed)
function studio(renderer) {
  const env = new THREE.Scene();
  const dome = new THREE.Mesh(new THREE.SphereGeometry(20, 32, 16), new THREE.ShaderMaterial({ side: THREE.BackSide, depthWrite: false,
    vertexShader: 'varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: 'varying vec3 vP; void main(){ float h = normalize(vP).y; vec3 c = mix(vec3(0.42,0.3,0.2), vec3(1.0,0.93,0.82), smoothstep(-0.3, 0.6, h)); gl_FragColor = vec4(c, 1.0); }' }));
  env.add(dome);
  for (const [x, y, z, w, hgt, k] of [[8, 9, 10, 10, 6, 3.2], [-10, 6, 4, 6, 8, 1.4]]) { const p = new THREE.Mesh(new THREE.PlaneGeometry(w, hgt), new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 0.96, 0.88).multiplyScalar(k), side: THREE.DoubleSide })); p.position.set(x, y, z); p.lookAt(0, 3, 0); env.add(p); }
  const pm = new THREE.PMREMGenerator(renderer); const tex = pm.fromScene(env, 0.04).texture; pm.dispose(); return tex;
}
function contactShadow() {
  const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d');
  const gr = g.createRadialGradient(64, 64, 4, 64, 64, 62); gr.addColorStop(0, 'rgba(40,22,10,0.55)'); gr.addColorStop(1, 'rgba(40,22,10,0)'); g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 2.6), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false }));
  m.rotation.x = -Math.PI / 2; m.position.y = 0.01; return m;
}
