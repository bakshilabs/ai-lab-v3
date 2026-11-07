// Florence in the world: a wooden toy robot who walks the island (from the client's character art: a chunky
// two-tone toy with a boxy head, big brown eyes, brows, a nose dot, ear bolts, an antenna, a magnifying glass
// in her right hand and a "…" speech card in her left). Built from rounded boxes with a procedural wood grain.
// Everything is procedural: a speed-matched walk with planted feet, gestures with anticipation and settle,
// two-bone arm IK (the lens really sits in front of her eye; she points with the magnifier), and a face rig
// (eyelids, brows, glance, mouth, happy eyes, sweat drop, springy antenna) for expressions.
// API (drone-compatible): show, look, group, hover, beam, shrug (now an "oops"), cheer, flyTo; plus walkTo,
// appear, wave, point, peer, think, nod, talk, oops, proud, surprised. Reduce motion: she slides, no wobble.
import * as THREE from 'three';
import { clamp } from './stage.js';
import { tileAt, key } from '../world/terrain.js';

// ---------- geometry and materials
function rbox(w, h, d, r, seg = 3) {
  const g = new THREE.BoxGeometry(w, h, d, seg * 2, seg * 2, seg * 2);
  const p = g.attributes.position, n = g.attributes.normal; const v = new THREE.Vector3(), c = new THREE.Vector3();
  const hw = w / 2 - r, hh = h / 2 - r, hd = d / 2 - r;
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i); c.set(clamp(v.x, -hw, hw), clamp(v.y, -hh, hh), clamp(v.z, -hd, hd));
    v.sub(c); if (v.lengthSq() < 1e-9) continue; v.normalize(); n.setXYZ(i, v.x, v.y, v.z); v.multiplyScalar(r).add(c); p.setXYZ(i, v.x, v.y, v.z);
  }
  return g;
}
function woodTexture() {
  const cv = document.createElement('canvas'); cv.width = cv.height = 256; const g = cv.getContext('2d');
  g.fillStyle = '#ffffff'; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 46; i++) {
    const y0 = (i / 46) * 256 + Math.sin(i * 7.3) * 4; g.strokeStyle = `rgba(120,70,30,${0.05 + (i % 5) * 0.025})`; g.lineWidth = 1 + (i % 3);
    g.beginPath(); for (let x = 0; x <= 256; x += 8) { const y = y0 + Math.sin(x / 38 + i) * 3 + Math.sin(x / 11 + i * 2) * 0.8; x ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
  }
  for (let i = 0; i < 4; i++) { const x = 30 + ((i * 97) % 200), y = 40 + ((i * 61) % 180); const gr = g.createRadialGradient(x, y, 1, x, y, 10); gr.addColorStop(0, 'rgba(110,60,25,.35)'); gr.addColorStop(1, 'rgba(110,60,25,0)'); g.fillStyle = gr; g.fillRect(x - 12, y - 12, 24, 24); }
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 4; return t;
}
// a gesture's weight over time (in, hold, out) and a small overshoot just after it arrives
const envelope = (g, dur, inT = 0.28, outT = 0.32) => clamp(g / inT) * clamp((dur - g) / outT);
const overshoot = (g, inT = 0.28) => (g < inT ? 0 : Math.sin(Math.min(1, (g - inT) / 0.35) * Math.PI) * 0.12);

export function createFlorence(stage, world, terrain) {
  const tex = woodTexture(); const texLimb = tex.clone(); texLimb.center.set(0.5, 0.5); texLimb.rotation = Math.PI / 2; texLimb.needsUpdate = true;
  const wood = (hex, map = tex) => new THREE.MeshStandardMaterial({ color: hex, map, roughness: 0.6, metalness: 0 });
  const M = {
    body: wood('#e3ad6c'), limb: wood('#e3ad6c', texLimb), light: wood('#f2cf98'), dark: wood('#7a4a2a'), joint: wood('#8a5530', texLimb),
    sclera: new THREE.MeshStandardMaterial({ color: '#fffaf0', roughness: 0.3 }), iris: new THREE.MeshStandardMaterial({ color: '#6b3e22', roughness: 0.35 }),
    pupil: new THREE.MeshBasicMaterial({ color: '#1d110a' }), shine: new THREE.MeshBasicMaterial({ color: '#ffffff' }),
    cheek: new THREE.MeshStandardMaterial({ color: '#f08a78', roughness: 0.8, transparent: true, opacity: 0.7 }),
    mouth: new THREE.MeshStandardMaterial({ color: '#6b2f1c', roughness: 0.6 }), inner: new THREE.MeshBasicMaterial({ color: '#4a1a10', side: THREE.DoubleSide }),
    card: new THREE.MeshStandardMaterial({ color: '#f6e3c0', map: tex, roughness: 0.7 }), dot: new THREE.MeshStandardMaterial({ color: '#5b3a24' }),
    glass: new THREE.MeshStandardMaterial({ color: '#e6f7ff', roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.25, depthWrite: false }),
    brass: new THREE.MeshStandardMaterial({ color: '#c9a04a', roughness: 0.3, metalness: 0.6 }),
    bulb: new THREE.MeshStandardMaterial({ color: '#16c79a', emissive: '#16c79a', emissiveIntensity: 0.6, roughness: 0.3 }),
    sweat: new THREE.MeshStandardMaterial({ color: '#7fd0ff', roughness: 0.1, transparent: true, opacity: 0.9 }),
  };
  const mesh = (geo, mat, x = 0, y = 0, z = 0, parent, shadow = true) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = shadow; m.receiveShadow = shadow; parent?.add(m); return m; };
  const deco = (geo, mat, x, y, z, parent) => mesh(geo, mat, x, y, z, parent, false); // small face parts: no shadow
  const pivot = (x, y, z, parent) => { const g = new THREE.Group(); g.position.set(x, y, z); parent.add(g); return g; };
  const sphere = (r, a = 18, b = 14) => new THREE.SphereGeometry(r, a, b);
  const hinge = (r, len) => new THREE.CylinderGeometry(r, r, len, 16).rotateZ(Math.PI / 2);

  // ---------- the model, in local units (about 11 tall), scaled into the world
  const root = new THREE.Group(); stage.scene.add(root);
  const body = pivot(0, 0, 0, root); const S = 0.58; body.scale.setScalar(S);
  // legs: hip → knee (hinge) → ankle → foot (walnut, chunky)
  const legs = [-1, 1].map((sd) => {
    const hip = pivot(sd * 0.68, 3.75, 0, body);
    mesh(rbox(1.0, 1.6, 1.0, 0.34), M.limb, 0, -0.8, 0, hip);
    const knee = pivot(0, -1.65, 0, hip); mesh(hinge(0.42, 1.06), M.joint, 0, 0, 0, knee);
    mesh(rbox(0.95, 1.45, 0.95, 0.32), M.limb, 0, -0.75, 0, knee);
    const ankle = pivot(0, -1.5, 0, knee);
    mesh(rbox(1.15, 0.6, 1.7, 0.26), M.dark, 0, -0.3, 0.28, ankle);
    return { hip, knee, ankle };
  });
  mesh(rbox(2.35, 0.85, 1.55, 0.36), M.dark, 0, 4.05, 0, body);                       // pelvis
  const torso = pivot(0, 4.45, 0, body);
  mesh(rbox(2.85, 2.5, 1.95, 0.6), M.body, 0, 1.25, 0, torso);
  mesh(rbox(1.7, 1.05, 0.2, 0.18), M.light, 0, 1.4, 0.95, torso);                     // chest panel
  // the chest badge: an engraved magnifier, and four corner screws
  deco(new THREE.TorusGeometry(0.24, 0.06, 8, 20), M.dark, -0.08, 1.48, 1.07, torso);
  deco(new THREE.CylinderGeometry(0.05, 0.05, 0.36, 8).rotateZ(-Math.PI / 4), M.dark, 0.16, 1.24, 1.07, torso);
  for (const [x, y] of [[-0.68, 1.78], [0.68, 1.78], [-0.68, 1.02], [0.68, 1.02]]) deco(new THREE.CylinderGeometry(0.07, 0.07, 0.08, 10).rotateX(Math.PI / 2), M.dark, x, y, 1.08, torso);
  const neck = pivot(0, 2.35, 0, torso); mesh(new THREE.CylinderGeometry(0.42, 0.5, 0.4, 14), M.joint, 0, 0.12, 0, neck);
  const head = pivot(0, 0.3, 0, neck);
  mesh(rbox(3.8, 3.1, 2.7, 0.8, 4), M.body, 0, 1.55, 0, head);
  mesh(rbox(3.0, 2.25, 0.2, 0.55), M.light, 0, 1.45, 1.3, head);                     // face plate
  // eyes: sclera, iris, pupil, two shines (glance moves the iris group); an eyelid above; happy arcs when smiling hard
  const eyes = [-0.78, 0.78].map((x) => {
    const e = pivot(x, 1.72, 1.42, head);
    const sclera = deco(sphere(0.43).scale(1, 1.08, 0.42), M.sclera, 0, 0, 0, e);
    const look = pivot(0, 0, 0.17, e);
    deco(new THREE.CircleGeometry(0.29, 22), M.iris, 0, -0.02, 0.02, look); deco(new THREE.CircleGeometry(0.15, 18), M.pupil, 0, -0.02, 0.03, look);
    deco(new THREE.CircleGeometry(0.09, 12), M.shine, -0.1, 0.1, 0.04, look); deco(new THREE.CircleGeometry(0.045, 10), M.shine, 0.1, -0.11, 0.04, look);
    const lidP = pivot(0, 0.47, 0.06, e); deco(rbox(0.98, 0.95, 0.24, 0.22).translate(0, -0.475, 0), M.light, 0, 0, 0, lidP); lidP.scale.y = 0.001;
    const happy = deco(new THREE.TorusGeometry(0.26, 0.07, 8, 16, Math.PI), M.pupil, 0, -0.1, 0.18, e); happy.visible = false;
    return { e, sclera, look, lidP, happy };
  });
  const brows = [-0.78, 0.78].map((x) => deco(rbox(0.58, 0.11, 0.09, 0.04), M.dark, x, 2.32, 1.44, head));
  deco(sphere(0.09, 10, 8), M.dark, 0, 1.33, 1.44, head);                               // nose dot
  for (const x of [-1.08, 1.08]) deco(new THREE.CircleGeometry(0.25, 18), M.cheek, x, 1.18, 1.41, head);
  const mouth = pivot(0, 0.98, 1.41, head);
  const smile = deco(new THREE.TorusGeometry(0.34, 0.07, 8, 18, Math.PI).rotateZ(Math.PI), M.mouth, 0, 0.02, 0.01, mouth);
  const open = deco(new THREE.CircleGeometry(0.32, 18, Math.PI, Math.PI), M.inner, 0, 0.02, 0.005, mouth); open.scale.y = 0.001;
  const oh = deco(new THREE.CircleGeometry(0.15, 16), M.inner, 0, -0.12, 0.012, mouth); oh.scale.setScalar(0.001);
  for (const sd of [-1, 1]) { mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.36, 18).rotateZ(Math.PI / 2), M.dark, sd * 2.02, 1.55, 0, head); deco(new THREE.CylinderGeometry(0.22, 0.22, 0.2, 12).rotateZ(Math.PI / 2), M.joint, sd * 2.25, 1.55, 0, head); }
  const antenna = pivot(0, 3.08, 0, head);
  mesh(new THREE.CylinderGeometry(0.09, 0.09, 1.0, 8), M.dark, 0, 0.5, 0, antenna);
  mesh(sphere(0.3), M.bulb, 0, 1.15, 0, antenna);
  const sweat = pivot(1.95, 2.5, 0.9, head); deco(sphere(0.15, 12, 10), M.sweat, 0, 0, 0, sweat); deco(new THREE.ConeGeometry(0.11, 0.25, 10), M.sweat, 0, 0.17, 0, sweat); sweat.visible = false;
  // arms: shoulder → elbow (hinge) → mitten hand with a thumb
  const arms = [-1, 1].map((sd) => {
    const sh = pivot(sd * 1.68, 2.05, 0, torso); mesh(sphere(0.5), M.joint, 0, 0, 0, sh);
    mesh(rbox(0.74, 1.35, 0.74, 0.27), M.limb, 0, -0.75, 0, sh);
    const el = pivot(0, -1.45, 0, sh); mesh(hinge(0.38, 0.86), M.joint, 0, 0, 0, el);
    mesh(rbox(0.68, 1.2, 0.68, 0.25), M.limb, 0, -0.65, 0, el);
    const hand = pivot(0, -1.4, 0, el); mesh(rbox(0.62, 0.64, 0.52, 0.24), M.light, 0, 0, 0, hand); mesh(sphere(0.18, 12, 10), M.light, -sd * 0.3, 0.08, 0.2, hand);
    return { sh, el, hand, sd };
  });
  const R = arms[0], Lh = arms[1];   // her right hand is at -x (on the viewer's left when she faces you)
  // the magnifying glass: brass ring, a near-vertical handle, the glass with a crescent highlight
  const mag = pivot(0, 0, 0, R.hand);
  mesh(new THREE.CylinderGeometry(0.13, 0.15, 1.1, 10), M.dark, 0, 0.35, 0.22, mag);
  const lensP = pivot(0, 1.42, 0.22, mag);
  mesh(new THREE.TorusGeometry(0.6, 0.11, 10, 28), M.brass, 0, 0, 0, lensP);
  deco(new THREE.CircleGeometry(0.56, 28), M.glass, 0, 0, 0, lensP);
  deco(new THREE.TorusGeometry(0.4, 0.035, 6, 14, Math.PI * 0.6).rotateZ(Math.PI * 0.55), M.shine, 0, 0, 0.02, lensP);
  // the speech card with three dots
  const card = pivot(0.12, 0, 0.3, Lh.hand);
  mesh(rbox(1.45, 1.05, 0.14, 0.12), M.card, 0, 0.62, 0.1, card);
  mesh(new THREE.ConeGeometry(0.16, 0.35, 3).rotateZ(Math.PI), M.card, -0.45, 0.02, 0.1, card);
  const dots = [-0.4, 0, 0.4].map((x) => deco(sphere(0.11, 10, 8), M.dot, x, 0.62, 0.2, card));

  // the magnifier's beam (her plan projected onto the island) and a soft glow disc where it lands
  const beamMat = new THREE.MeshBasicMaterial({ color: '#bff3ff', transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending });
  const beam = new THREE.Mesh(new THREE.ConeGeometry(1, 1, 24, 1, true), beamMat); beam.geometry.translate(0, -0.5, 0); stage.scene.add(beam);
  const spotMat = new THREE.MeshBasicMaterial({ color: '#bff3ff', transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
  const spot = new THREE.Mesh(new THREE.CircleGeometry(7, 32).rotateX(-Math.PI / 2), spotMat); stage.scene.add(spot);

  // ---------- state
  const st = {
    pos: new THREE.Vector3(14, 0, 22), yaw: 0, walk: null, phase: 0, speed: 0, gesture: null, gT: 0, gDur: 0, gAt: null,
    look: null, talkT: 0, blinkT: 2, blink: 0, blinkAt: 0, beam: 0, beamT: 0, beamTo: null, reduce: false,
    face: { brow: 0, tilt: 0, happy: 0, oh: 0, glance: 0, eye: 1, droop: 0 }, ant: { x: 0, z: 0, vx: 0, vz: 0 }, prevHead: 0, prevBodyY: 0,
  };
  const groundY = (x, z) => { const a = tileAt(x, z); if (a) { const k = key(a[0], a[1]); if (terrain.tiles.has(k)) return world.tileTop(k).y; } return null; };
  st.pos.y = groundY(st.pos.x, st.pos.z) ?? 3; root.position.copy(st.pos);
  const joints = { hipL: legs[0].hip.rotation, hipR: legs[1].hip.rotation, kneeL: legs[0].knee.rotation, kneeR: legs[1].knee.rotation, ankL: legs[0].ankle.rotation, ankR: legs[1].ankle.rotation, shR: R.sh.rotation, elR: R.el.rotation, shL: Lh.sh.rotation, elL: Lh.el.rotation, torso: torso.rotation, head: head.rotation };
  const v3 = new THREE.Vector3(), q = new THREE.Vector3(), qa = new THREE.Quaternion(), qb = new THREE.Quaternion(), qc = new THREE.Quaternion(), DOWN = new THREE.Vector3(0, -1, 0), UP = new THREE.Vector3(0, 1, 0);
  const setPose = (target, dt, rate = 10) => { const k = Math.min(1, dt * rate); for (const [jn, ax] of Object.entries(target)) for (const [a, val] of Object.entries(ax)) { const cur = joints[jn]; cur[a] += (val - cur[a]) * k; } };
  const L1 = 1.45, L2 = 1.4;
  // two-bone IK: put the hand of `arm` at `target` (in torso space), blended by k. The elbow bends forward.
  function reach(arm, target, k) {
    if (k <= 0.001) return;
    const t = target.clone().sub(arm.sh.position); const d = clamp(t.length(), 0.6, L1 + L2 - 0.02); const dir = t.normalize();
    const alpha = Math.acos(clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1));
    const bend = Math.PI - Math.acos(clamp((L1 * L1 + L2 * L2 - d * d) / (2 * L1 * L2), -1, 1));
    // the elbow points down, out and back: rotate the target direction toward that "pole" by alpha
    const pole = new THREE.Vector3(arm.sd * 0.35, -1, -0.6).normalize();
    const axis = new THREE.Vector3().crossVectors(dir, pole); if (axis.lengthSq() < 1e-6) axis.set(1, 0, 0); axis.normalize();
    const upper = dir.clone().applyAxisAngle(axis, alpha);
    qa.setFromUnitVectors(DOWN, upper);
    // twist about the upper arm so the elbow bends toward the target (the arm's local +z)
    const zNow = new THREE.Vector3(0, 0, 1).applyQuaternion(qa); const zWant = dir.clone().sub(upper.clone().multiplyScalar(upper.dot(dir)));
    if (zWant.lengthSq() > 1e-6) { zWant.normalize(); const ang = Math.atan2(new THREE.Vector3().crossVectors(zNow, zWant).dot(upper), zNow.dot(zWant)); qb.setFromAxisAngle(upper, ang); qa.premultiply(qb); }
    arm.sh.quaternion.slerp(qa, k); arm.el.rotation.x += (-bend - arm.el.rotation.x) * k; arm.el.rotation.z *= 1 - k;
  }
  const toTorso = (obj, local) => torso.worldToLocal(obj.localToWorld(local.clone()));

  const bot = {
    group: root, visible: true, get position() { return root.position; },
    set reduce(v) { st.reduce = v; },
    show(on) { root.visible = on; this.visible = on; if (!on) st.beamT = 0; },
    appear(p) { st.pos.copy(p); st.pos.y = groundY(p.x, p.z) ?? p.y; root.position.copy(st.pos); st.walk = null; this.show(true); },
    walkTo(p, { maxDur = 4, stopShort = 0 } = {}) {
      const to = p.clone(); const d = Math.hypot(to.x - st.pos.x, to.z - st.pos.z);
      if (stopShort && d > stopShort) { const k = (d - stopShort) / d; to.x = st.pos.x + (to.x - st.pos.x) * k; to.z = st.pos.z + (to.z - st.pos.z) * k; }
      const dist = Math.hypot(to.x - st.pos.x, to.z - st.pos.z); if (dist < 0.3) return Promise.resolve();
      const speed = Math.max(5, dist / maxDur);
      return new Promise((resolve) => { st.walk?.resolve(); st.walk = { to, speed, resolve }; });
    },
    look(p) { st.look = p ? p.clone() : null; },
    gesture(name, dur = 1.4, at = null) { st.gesture = name; st.gT = 0; st.gDur = dur; st.gAt = at ? at.clone() : null; return new Promise((r) => setTimeout(r, dur * 1000)); },
    wave() { return this.gesture('wave', 1.9); },
    point(p, dur = 2.2) { this.look(p); return this.gesture('point', dur, p); },
    peer(p, dur = 1.8) { if (p) this.look(p); return this.gesture('peer', dur, p); },
    oops() { return this.gesture('oops', 1.9); },
    shrug() { return this.oops(); },                 // a check caught her mistake
    cheer() { return this.gesture('cheer', 1.4); },
    proud() { return this.gesture('proud', 1.8); },
    surprised() { return this.gesture('surprised', 1.2); },
    think(dur = 1.8) { return this.gesture('think', dur); },
    nod() { return this.gesture('nod', 0.7); },
    talk(seconds = 2) { st.talkT = Math.max(st.talkT, seconds); },
    hover(p) { this.show(true); st.beamTo = p.clone(); this.look(p); const pr = this.walkTo(p, { stopShort: 9, maxDur: 1.2 }); pr.then(() => this.peer(p, 2.5)); return pr; },
    beam(on) { st.beamT = on ? 1 : 0; if (on && st.look) st.beamTo = st.look.clone(); },
    flyTo(p, dur) { return this.walkTo(p, { maxDur: dur }); },
    update(dt, t) {
      if (!root.visible) return;
      const rd = st.reduce;
      // ---- walking (feet planted: the gait phase follows the distance travelled)
      let moving = false, pace = 0;
      if (st.walk) {
        const w = st.walk; const dx = w.to.x - st.pos.x, dz = w.to.z - st.pos.z; const d = Math.hypot(dx, dz);
        const step = w.speed * dt * (rd ? 3 : 1);
        if (d <= step) { st.pos.x = w.to.x; st.pos.z = w.to.z; st.walk = null; w.resolve(); }
        else { st.pos.x += (dx / d) * step; st.pos.z += (dz / d) * step; moving = true; pace = w.speed; st.yaw = turn(st.yaw, Math.atan2(dx, dz), dt * 8); }
      }
      const gy = groundY(st.pos.x, st.pos.z); if (gy != null) st.pos.y += (gy - st.pos.y) * Math.min(1, dt * (Math.abs(gy - st.pos.y) > 0.5 ? 9 : 14));
      const walking = moving && !rd;
      st.speed += ((walking ? 1 : 0) - st.speed) * Math.min(1, dt * 8);
      const run = clamp((pace - 9) / 8);                              // faster than a walk: a bouncy trot
      if (walking) { st.phase += dt * Math.min(pace, 11) * (2 * Math.PI) / (5.0 * S / 0.6) * (1 + run * 0.4); const fs = Math.floor(st.phase / Math.PI); if (fs !== st.footStep) { st.footStep = fs; bot.onStep?.(); } } // a footstep sound on each plant
      if (!moving) { const f = st.look || stage.camera.position; st.yaw = turn(st.yaw, Math.atan2(f.x - st.pos.x, f.z - st.pos.z), dt * 4); }
      root.position.copy(st.pos); root.rotation.y = st.yaw;
      // ---- base pose
      const sp = st.speed, ph = st.phase, amp = 0.62 + run * 0.2;
      const sw = Math.sin(ph) * amp * sp; const bob = Math.abs(Math.cos(ph)) * (0.3 + run * 0.6) * sp;
      const breathe = rd ? 0 : Math.sin(t * 2) * 0.05;
      const kneeL = (0.1 + Math.max(0, -Math.cos(ph)) * 1.0) * sp, kneeR = (0.1 + Math.max(0, Math.cos(ph)) * 1.0) * sp;
      const P = {
        hipL: { x: sw }, hipR: { x: -sw }, kneeL: { x: kneeL }, kneeR: { x: kneeR },
        ankL: { x: -(sw + kneeL) * 0.9 }, ankR: { x: -(-sw + kneeR) * 0.9 },
        shR: { x: -sw * 0.8, y: 0, z: -0.12 }, elR: { x: -0.35, z: 0 }, shL: { x: sw * 0.8 - 0.25, y: 0, z: 0.12 }, elL: { x: -0.9, z: 0 },
        torso: { x: 0.05 * sp, y: -sw * 0.15, z: Math.sin(ph) * 0.05 * sp }, head: { x: breathe, y: rd ? 0 : Math.sin(t * 0.6) * 0.15 * (1 - sp), z: 0 },
      };
      body.position.y = bob + breathe; body.scale.set(S, S, S);
      const F = { brow: 0, tilt: 0, happy: 0, oh: 0, glance: 0, eye: 1, droop: 0, sweat: -1 };
      let ikR = null, ikL = null, kIK = 0, magAim = null, cardTurn = 0;
      // ---- gestures
      if (st.gesture) {
        st.gT += dt; const g = st.gT, D = st.gDur; const k = envelope(g, D); const os = overshoot(g);
        const mix = (part, vals) => { for (const [a, v] of Object.entries(vals)) P[part][a] = (P[part][a] ?? 0) + (v - (P[part][a] ?? 0)) * k; };
        if (st.gesture === 'wave') { mix('shL', { x: -0.1, z: 2.75 + os }); mix('elL', { x: -0.25, z: rd ? 0 : Math.sin(g * 10) * 0.45 }); mix('torso', { z: 0.08 }); mix('head', { z: -0.1 }); F.brow = 0.4 * k; F.happy = 0.6 * k; if (!rd) body.position.y += Math.abs(Math.sin(g * 5)) * 0.15 * k; }
        if (st.gesture === 'point' && st.gAt) {
          // a short pull back, then the magnifier thrust toward the target, a little overshoot, settle
          const pull = g < 0.15 ? g / 0.15 : 0; const tgt = torso.worldToLocal(st.gAt.clone());
          const dir = tgt.clone().sub(R.sh.position).normalize(); ikR = R.sh.position.clone().addScaledVector(dir, 2.55 * (1 - pull * 0.35) * (1 + os * 0.5)); kIK = k;
          mix('torso', { x: 0.15 }); magAim = st.gAt; F.brow = 0.5 * k;
        }
        if (st.gesture === 'peer') { ikR = toTorso(head, new THREE.Vector3(-0.78, 1.72, 2.35)).sub(new THREE.Vector3(0, 1.42, 0.22)); kIK = k; mix('head', { x: 0.12, y: 0.1 }); mix('torso', { x: 0.1 }); F.eye = 1 + 0.5 * k; F.brow = 0.6 * k; F.tilt = -0.15 * k; }
        if (st.gesture === 'oops') {
          // caught out: eyes wide, a glance aside, worried brows, a small "o", antenna droops, a sweat drop, a scratch of the head
          ikR = toTorso(head, new THREE.Vector3(-1.75, 2.6, -0.2)); kIK = k; mix('shL', { x: -0.3, z: 0.5 }); mix('elL', { x: -1.3 }); mix('head', { z: 0.16, x: -0.05 });
          F.eye = 1 + 0.2 * k; F.glance = (g > 0.5 ? 1 : 0) * k; F.brow = 0.7 * k; F.tilt = 0.45 * k; F.oh = k; F.droop = 0.6 * k; F.sweat = clamp((g - 0.2) / 0.8);
        }
        if (st.gesture === 'proud') { ikR = new THREE.Vector3(-1.55, -0.1, 0.35); ikL = new THREE.Vector3(1.55, -0.1, 0.35); kIK = k; mix('torso', { x: -0.12 }); mix('head', { x: -0.15 }); F.happy = k; F.brow = 0.3 * k; }
        if (st.gesture === 'surprised') { mix('shR', { x: -0.4, z: -0.7 }); mix('shL', { x: -0.4, z: 0.7 }); mix('head', { x: -0.12 }); F.eye = 1 + 0.35 * k; F.brow = k; F.oh = 0.8 * k; if (!rd) body.position.y += Math.sin(clamp(g / 0.3) * Math.PI) * 0.4; }
        if (st.gesture === 'cheer') {
          // crouch, spring up (stretch), land (squash), hop again; happy eyes
          const c = g < 0.18 ? g / 0.18 : 0; const air = g >= 0.18 ? Math.abs(Math.sin(((g - 0.18) / Math.max(0.3, D - 0.3)) * Math.PI * 2)) : 0;
          mix('shR', { x: -0.2, z: -2.7 }); mix('shL', { x: -0.2, z: 2.7 }); mix('elR', { x: -0.1 }); mix('elL', { x: -0.1 });
          if (!rd) { body.position.y += air * 1.0 * k - c * 0.4; const sq = c > 0 ? [1.08, 0.9] : air > 0.05 ? [0.95, 1.08] : [1.06, 0.93]; body.scale.set(S * sq[0], S * sq[1], S * sq[0]); P.kneeL.x += (c + air * 0.6) * k; P.kneeR.x += (c + air * 0.6) * k; P.hipL.x -= (c * 0.5 + air * 0.3) * k; P.hipR.x -= (c * 0.5 + air * 0.3) * k; }
          F.happy = k; F.brow = 0.6 * k;
        }
        if (st.gesture === 'think') { ikL = toTorso(head, new THREE.Vector3(0.55, 0.7, 1.75)); kIK = k; cardTurn = k; mix('head', { z: 0.18, x: -0.1 }); F.glance = -0.8 * k; F.brow = 0.5 * k; F.tilt = -0.25 * k; mix('shR', { z: -0.25 }); }
        if (st.gesture === 'nod') { if (!rd) mix('head', { x: Math.sin(g * 14) * 0.25 }); F.happy = 0.4 * k; }
        if (g >= D) st.gesture = null;
      }
      // talking: head nods, mouth opens and closes, the card's dots pulse in turn, the bulb glows
      let mouthOpen = 0;
      if (st.talkT > 0) { st.talkT -= dt; if (!rd) P.head.x += Math.sin(t * 11) * 0.05; P.shL.x -= 0.5; P.elL.x -= 0.5; mouthOpen = rd ? 0.4 : 0.25 + 0.75 * Math.abs(Math.sin(t * 12)); }
      dots.forEach((d, i) => d.scale.setScalar(st.talkT > 0 ? 1 + Math.max(0, Math.sin(t * 8 - i * 0.9)) * 0.6 : 1));
      M.bulb.emissiveIntensity = 0.5 + (st.talkT > 0 ? Math.max(0, Math.sin(t * 10)) * 0.9 : 0) + (st.gesture === 'proud' ? 0.8 : 0);
      setPose(P, dt, st.gesture === 'nod' || walking ? 18 : 10);
      // arm IK over the pose
      if (ikR) reach(R, ikR, kIK); if (ikL) reach(Lh, ikL, kIK);
      // props: the card faces forward (turned outward while thinking); the magnifier stays upright, or aims while pointing
      torso.updateWorldMatrix(true, true); torso.getWorldQuaternion(qc);
      card.quaternion.copy(Lh.hand.getWorldQuaternion(qa).invert().multiply(qc)); if (cardTurn) card.rotateY(1.3 * cardTurn);
      if (magAim) { R.hand.getWorldPosition(v3); const dirW = q.copy(magAim).sub(v3).normalize(); qb.setFromUnitVectors(UP, dirW); mag.quaternion.copy(R.hand.getWorldQuaternion(qa).invert().multiply(qb)); }
      else mag.quaternion.copy(R.hand.getWorldQuaternion(qa).invert().multiply(qc));
      // ---- face
      const fc = st.face; const fk = Math.min(1, dt * 12);
      for (const kk of ['brow', 'tilt', 'happy', 'oh', 'glance', 'eye', 'droop']) fc[kk] += (F[kk] - fc[kk]) * fk;
      st.blinkT -= dt; if (st.blinkT < 0 && !st.blink) { st.blinkT = 2.4 + Math.random() * 3; st.blink = Math.random() < 0.2 ? 2 : 1; st.blinkAt = 0; }
      let lid = 0;
      if (st.blink) { st.blinkAt += dt; const b = st.blinkAt; lid = b < 0 ? 0 : b < 0.06 ? b / 0.06 : b < 0.1 ? 1 : b < 0.2 ? 1 - (b - 0.1) / 0.1 : 0; if (b >= 0.2) { st.blink--; st.blinkAt = -0.08; } }
      const happyOn = fc.happy > 0.55;
      eyes.forEach((E, i) => {
        const big = st.gesture === 'peer' ? (i === 0 ? fc.eye : 1) : fc.eye;
        E.e.scale.setScalar(big); E.look.position.x = fc.glance * 0.1;
        E.lidP.scale.y = Math.max(0.001, happyOn ? 0.001 : lid);
        E.happy.visible = happyOn; E.look.visible = !happyOn; E.sclera.visible = !happyOn;
      });
      brows.forEach((b, i) => { const sd = i ? 1 : -1; b.position.y = 2.32 + fc.brow * 0.2; b.rotation.z = -sd * fc.tilt; });
      smile.visible = fc.oh < 0.5; open.scale.y = Math.max(0.001, fc.oh < 0.5 ? mouthOpen : 0); oh.scale.setScalar(Math.max(0.001, fc.oh));
      sweat.visible = F.sweat >= 0 && !rd; if (sweat.visible) sweat.position.y = 2.5 - F.sweat * 0.6;
      // springy antenna: driven by the head's nodding and the body's bounce, drooping when embarrassed
      const headV = (joints.head.x - st.prevHead) / Math.max(dt, 1e-3); const bodyV = (body.position.y - st.prevBodyY) / Math.max(dt, 1e-3); st.prevHead = joints.head.x; st.prevBodyY = body.position.y;
      const A = st.ant; const tgtX = fc.droop * 0.7;
      if (rd) { A.x = tgtX; A.vx = 0; A.z = 0; A.vz = 0; }
      else { A.vx += (-60 * (A.x - tgtX) - 8 * A.vx - headV * 0.6 - bodyV * 0.25) * dt; A.x += A.vx * dt; A.vz += (-60 * A.z - 8 * A.vz - (moving ? Math.cos(ph) * 0.8 : 0)) * dt; A.z += A.vz * dt; }
      antenna.rotation.set(clamp(A.x, -0.8, 0.9), 0, clamp(A.z, -0.5, 0.5));
      // ---- beam from the lens to the plan
      st.beam += (st.beamT - st.beam) * Math.min(1, dt * 6); beam.visible = st.beam > 0.02; spot.visible = beam.visible;
      if (beam.visible && st.beamTo) {
        lensP.getWorldPosition(v3); const dir = q.copy(st.beamTo).sub(v3); const len = dir.length();
        beam.position.copy(v3); beam.scale.set(7, len, 7); beam.quaternion.setFromUnitVectors(DOWN, dir.normalize());
        beamMat.opacity = st.beam * (0.2 + Math.sin(t * 9) * 0.05); spot.position.copy(st.beamTo).add(new THREE.Vector3(0, 0.3, 0)); spotMat.opacity = st.beam * 0.35;
      }
    },
  };
  function turn(a, b, k) { let d = b - a; d = Math.atan2(Math.sin(d), Math.cos(d)); return a + d * Math.min(1, k); }
  bot.parts = { head, torso, arms, legs, card, mag };
  return bot;
}
