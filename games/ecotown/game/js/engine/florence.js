// Florence in the world: a wooden toy robot who walks the island (from the user's character art: boxy
// head, big round eyes, antenna, ear bolts, a magnifying glass in her right hand and a "…" speech card in
// her left). Built from rounded boxes with a procedural wood grain; every animation is procedural.
// Same API as the old drone (show, hover, beam, shrug, cheer, look, group) plus walkTo, wave, point,
// peer, talk, think, nod. She walks on the tile tops; Reduce motion makes her slide instead.
import * as THREE from 'three';
import { clamp, ease } from './stage.js';
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

export function createFlorence(stage, world, terrain) {
  const tex = woodTexture();
  const wood = (hex) => new THREE.MeshStandardMaterial({ color: hex, map: tex, roughness: 0.62, metalness: 0 });
  const M = {
    body: wood('#e0a868'), light: wood('#edc48f'), dark: wood('#b9783f'), joint: wood('#c98a50'),
    eye: new THREE.MeshStandardMaterial({ color: '#2a1a12', roughness: 0.25 }), shine: new THREE.MeshBasicMaterial({ color: '#ffffff' }),
    cheek: new THREE.MeshStandardMaterial({ color: '#f08a78', roughness: 0.8, transparent: true, opacity: 0.75 }),
    mouth: new THREE.MeshStandardMaterial({ color: '#7a3b22', roughness: 0.6 }),
    card: new THREE.MeshStandardMaterial({ color: '#f6e3c0', map: tex, roughness: 0.7 }), dot: new THREE.MeshStandardMaterial({ color: '#5b3a24' }),
    glass: new THREE.MeshStandardMaterial({ color: '#dff4ff', roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.4, depthWrite: false }),
    ring: new THREE.MeshStandardMaterial({ color: '#8a5a33', roughness: 0.4, metalness: 0.1 }),
  };
  const mesh = (geo, mat, x = 0, y = 0, z = 0, parent) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; parent?.add(m); return m; };
  const pivot = (x, y, z, parent) => { const g = new THREE.Group(); g.position.set(x, y, z); parent.add(g); return g; };
  const sphere = (r) => new THREE.SphereGeometry(r, 18, 14);

  // ---------- the model, in local units (about 10.4 tall), scaled into the world
  const root = new THREE.Group(); stage.scene.add(root);
  const body = pivot(0, 0, 0, root);
  const S = 0.62; body.scale.setScalar(S);
  // legs: hip → knee → foot
  const legs = [-1, 1].map((sd) => {
    const hip = pivot(sd * 0.62, 3.55, 0, body);
    mesh(rbox(0.85, 1.6, 0.85, 0.3), M.body, 0, -0.8, 0, hip);
    const knee = pivot(0, -1.65, 0, hip); mesh(sphere(0.42), M.joint, 0, 0, 0, knee);
    mesh(rbox(0.8, 1.45, 0.8, 0.28), M.body, 0, -0.75, 0, knee);
    mesh(rbox(1.0, 0.5, 1.45, 0.22), M.dark, 0, -1.6, 0.22, knee);
    return { hip, knee };
  });
  mesh(rbox(2.2, 0.85, 1.45, 0.35), M.dark, 0, 3.85, 0, body);                    // pelvis
  const torso = pivot(0, 4.25, 0, body);
  mesh(rbox(2.7, 2.5, 1.85, 0.55), M.body, 0, 1.25, 0, torso);
  mesh(rbox(1.6, 0.95, 0.2, 0.18), M.light, 0, 1.45, 0.93, torso);              // chest panel
  for (const x of [-0.45, 0, 0.45]) mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.12, 12).rotateX(Math.PI / 2), M.dark, x, 1.45, 1.05, torso);
  const neck = pivot(0, 2.5, 0, torso); mesh(new THREE.CylinderGeometry(0.38, 0.45, 0.5, 14), M.joint, 0, 0.2, 0, neck);
  const head = pivot(0, 0.45, 0, neck);
  mesh(rbox(3.4, 2.9, 2.6, 0.75), M.body, 0, 1.45, 0, head);
  mesh(rbox(2.7, 2.0, 0.2, 0.5), M.light, 0, 1.35, 1.24, head);                 // face plate
  const eyes = [-0.72, 0.72].map((x) => {
    const e = pivot(x, 1.6, 1.36, head); mesh(sphere(0.43).scale(1, 1.1, 0.45), M.eye, 0, 0, 0, e);
    mesh(sphere(0.13), M.shine, -0.12, 0.17, 0.17, e); mesh(sphere(0.06), M.shine, 0.12, -0.1, 0.18, e); return e;
  });
  for (const x of [-1.15, 1.15]) mesh(new THREE.CircleGeometry(0.3, 18), M.cheek, x, 1.0, 1.36, head);
  mesh(new THREE.TorusGeometry(0.34, 0.07, 8, 18, Math.PI).rotateZ(Math.PI), M.mouth, 0, 0.95, 1.36, head);
  for (const sd of [-1, 1]) { mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.35, 18).rotateZ(Math.PI / 2), M.dark, sd * 1.83, 1.45, 0, head); mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.2, 12).rotateZ(Math.PI / 2), M.joint, sd * 2.05, 1.45, 0, head); }
  mesh(new THREE.CylinderGeometry(0.09, 0.09, 1.0, 8), M.dark, 0, 3.35, 0, head);
  const bulb = mesh(sphere(0.3), M.dark, 0, 3.95, 0, head);
  // arms: shoulder → elbow → hand
  const arms = [-1, 1].map((sd) => {
    const sh = pivot(sd * 1.6, 2.05, 0, torso); mesh(sphere(0.48), M.joint, 0, 0, 0, sh);
    mesh(rbox(0.72, 1.35, 0.72, 0.26), M.body, 0, -0.75, 0, sh);
    const el = pivot(0, -1.45, 0, sh); mesh(sphere(0.38), M.joint, 0, 0, 0, el);
    mesh(rbox(0.66, 1.2, 0.66, 0.24), M.body, 0, -0.65, 0, el);
    const hand = pivot(0, -1.4, 0, el); mesh(sphere(0.42), M.light, 0, 0, 0, hand);
    return { sh, el, hand, sd };
  });
  // right hand (sd = 1 is her left as seen from the front; her right hand is at -x): the magnifying glass
  const R = arms[0], Lh = arms[1];
  const mag = pivot(0, -0.1, 0.35, R.hand);
  mesh(new THREE.CylinderGeometry(0.13, 0.15, 1.2, 10), M.dark, 0, -0.1, 0.35, mag).rotation.x = Math.PI / 2.4;
  const lensP = pivot(0, 0.45, 1.2, mag);
  mesh(new THREE.TorusGeometry(0.62, 0.12, 10, 28), M.ring, 0, 0, 0, lensP);
  const glass = mesh(new THREE.CircleGeometry(0.6, 28), M.glass, 0, 0, 0, lensP); glass.castShadow = false;
  // left hand: the speech card with three dots
  const card = pivot(0.1, -0.15, 0.55, Lh.hand);
  mesh(rbox(1.45, 1.05, 0.14, 0.12), M.card, 0, 0.55, 0.1, card);
  mesh(new THREE.ConeGeometry(0.16, 0.35, 3).rotateZ(Math.PI), M.card, -0.45, -0.05, 0.1, card);
  const dots = [-0.4, 0, 0.4].map((x) => mesh(sphere(0.11), M.dot, x, 0.55, 0.2, card));

  // the magnifier's beam (her plan projected onto the island)
  const beamMat = new THREE.MeshBasicMaterial({ color: '#bff3ff', transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending });
  const beam = new THREE.Mesh(new THREE.ConeGeometry(1, 1, 24, 1, true), beamMat); beam.geometry.translate(0, -0.5, 0); stage.scene.add(beam);
  const glow = new THREE.PointLight(0x9fe8ff, 0, 30); stage.scene.add(glow);

  // ---------- state
  const st = {
    pos: new THREE.Vector3(14, 0, 22), yaw: 0, walk: null, phase: 0, speed: 0, gesture: null, gT: 0, gDur: 0, gAt: null,
    look: null, talkT: 0, blinkT: 2, beam: 0, beamT: 0, beamTo: null, idleT: 0, reduce: false,
  };
  const groundY = (x, z) => { const a = tileAt(x, z); if (a) { const k = key(a[0], a[1]); if (terrain.tiles.has(k)) return world.tileTop(k).y; } return null; };
  st.pos.y = groundY(st.pos.x, st.pos.z) ?? 3; root.position.copy(st.pos);
  const J = {}; // current joint angles (smoothed toward targets)
  const joints = { hipL: legs[0].hip.rotation, hipR: legs[1].hip.rotation, kneeL: legs[0].knee.rotation, kneeR: legs[1].knee.rotation, shR: R.sh.rotation, elR: R.el.rotation, shL: Lh.sh.rotation, elL: Lh.el.rotation, torso: torso.rotation, head: head.rotation };
  const v3 = new THREE.Vector3(), q = new THREE.Vector3();
  const setPose = (target, dt, rate = 10) => { const k = Math.min(1, dt * rate); for (const [jn, ax] of Object.entries(target)) for (const [a, val] of Object.entries(ax)) { const cur = joints[jn]; cur[a] += (val - cur[a]) * k; } };

  const bot = {
    group: root, visible: true, get position() { return root.position; },
    set reduce(v) { st.reduce = v; },
    show(on) { root.visible = on; this.visible = on; if (!on) { st.beamT = 0; } },
    // put her somewhere at once
    appear(p) { st.pos.copy(p); st.pos.y = groundY(p.x, p.z) ?? p.y; root.position.copy(st.pos); st.walk = null; this.show(true); },
    // walk to p (on the ground); resolves on arrival. maxDur: walk faster if it would take longer
    walkTo(p, { maxDur = 4, stopShort = 0 } = {}) {
      const to = p.clone(); const d = Math.hypot(to.x - st.pos.x, to.z - st.pos.z);
      if (stopShort && d > stopShort) { const k = (d - stopShort) / d; to.x = st.pos.x + (to.x - st.pos.x) * k; to.z = st.pos.z + (to.z - st.pos.z) * k; }
      const dist = Math.hypot(to.x - st.pos.x, to.z - st.pos.z); if (dist < 0.3) return Promise.resolve();
      const speed = Math.max(5.5, dist / maxDur);
      return new Promise((resolve) => { st.walk?.resolve(); st.walk = { to, speed, resolve }; });
    },
    look(p) { st.look = p ? p.clone() : null; },
    gesture(name, dur = 1.4, at = null) { st.gesture = name; st.gT = 0; st.gDur = dur; st.gAt = at ? at.clone() : null; return new Promise((r) => setTimeout(r, dur * 1000)); },
    wave() { return this.gesture('wave', 1.8); },
    point(p, dur = 2.2) { this.look(p); return this.gesture('point', dur, p); },
    peer(p, dur = 1.8) { if (p) this.look(p); return this.gesture('peer', dur, p); },
    shrug() { return this.gesture('shrug', 1.3); },
    cheer() { return this.gesture('cheer', 1.3); },
    think(dur = 1.8) { return this.gesture('think', dur); },
    nod() { return this.gesture('nod', 0.7); },
    talk(seconds = 2) { st.talkT = Math.max(st.talkT, seconds); },
    // drone API: go to the plan and peer at it; the beam comes from the magnifier
    hover(p) { this.show(true); st.beamTo = p.clone(); this.look(p); const pr = this.walkTo(p, { stopShort: 9, maxDur: 1.2 }); pr.then(() => this.peer(p, 2.5)); return pr; },
    beam(on) { st.beamT = on ? 1 : 0; if (on && st.look) st.beamTo = st.look.clone(); },
    flyTo(p, dur) { return this.walkTo(p, { maxDur: dur }); },
    update(dt, t) {
      if (!root.visible) return;
      // walking
      let moving = false;
      if (st.walk) {
        const w = st.walk; const dx = w.to.x - st.pos.x, dz = w.to.z - st.pos.z; const d = Math.hypot(dx, dz);
        const step = w.speed * dt;
        if (d <= step || st.reduce && d < w.speed * 0.6) { st.pos.x = w.to.x; st.pos.z = w.to.z; st.walk = null; w.resolve(); }
        else { st.pos.x += (dx / d) * step; st.pos.z += (dz / d) * step; moving = true; st.yaw = turn(st.yaw, Math.atan2(dx, dz), dt * 8); }
        if (st.reduce && st.walk) { st.pos.x += (dx / d) * step * 2; st.pos.z += (dz / d) * step * 2; }
      }
      const gy = groundY(st.pos.x, st.pos.z); if (gy != null) st.pos.y += (gy - st.pos.y) * Math.min(1, dt * (Math.abs(gy - st.pos.y) > 0.5 ? 9 : 14));
      st.speed += ((moving ? 1 : 0) - st.speed) * Math.min(1, dt * 8);
      st.phase += dt * (moving ? 9 : 0);
      // face the look target (or the camera) when standing
      if (!moving) { const f = st.look || stage.camera.position; st.yaw = turn(st.yaw, Math.atan2(f.x - st.pos.x, f.z - st.pos.z), dt * 4); }
      root.position.copy(st.pos); root.rotation.y = st.yaw;
      // pose
      const sw = Math.sin(st.phase) * 0.7 * st.speed; const bob = Math.abs(Math.cos(st.phase)) * 0.35 * st.speed;
      const breathe = Math.sin(t * 2) * 0.05;
      const P = {
        hipL: { x: sw }, hipR: { x: -sw }, kneeL: { x: Math.max(0, -Math.sin(st.phase)) * 0.9 * st.speed }, kneeR: { x: Math.max(0, Math.sin(st.phase)) * 0.9 * st.speed },
        shR: { x: -sw * 0.8, z: -0.12 }, elR: { x: -0.35 }, shL: { x: sw * 0.8 - 0.25, z: 0.12 }, elL: { x: -0.9 },
        torso: { x: 0.05 * st.speed, y: 0, z: 0 }, head: { x: breathe, y: Math.sin(t * 0.6) * 0.15 * (1 - st.speed), z: 0 },
      };
      body.position.y = bob + breathe;
      // gestures override parts of the pose
      if (st.gesture) {
        st.gT += dt; const g = st.gT, k = clamp(g / 0.3) * clamp((st.gDur - g) / 0.3);
        const mix = (part, vals) => { for (const [a, v] of Object.entries(vals)) P[part][a] = P[part][a] + (v - P[part][a]) * k; };
        if (st.gesture === 'wave') { mix('shL', { x: -0.4, z: 2.6 }); mix('elL', { x: -0.6 + Math.sin(g * 12) * 0.5 }); mix('head', { z: -0.12 }); }
        if (st.gesture === 'point') { const a = localAim(st.gAt); mix('shR', { x: -1.35 - a.pitch, z: -0.15 + a.side }); mix('elR', { x: -0.05 }); mix('torso', { y: a.side * 0.4 }); }
        if (st.gesture === 'peer') { mix('shR', { x: -1.25, z: 0.55 }); mix('elR', { x: -1.55 }); mix('head', { x: 0.12, y: 0.1 }); mix('torso', { x: 0.1 }); }
        if (st.gesture === 'shrug') { mix('shR', { x: -0.3, z: -0.9 }); mix('shL', { x: -0.3, z: 0.9 }); mix('elR', { x: -1.4 }); mix('elL', { x: -1.4 }); mix('head', { z: Math.sin(g * 5) * 0.2 }); }
        if (st.gesture === 'cheer') { mix('shR', { x: -0.2, z: -2.7 }); mix('shL', { x: -0.2, z: 2.7 }); mix('elR', { x: 0 }); mix('elL', { x: 0 }); if (!st.reduce) body.position.y += Math.abs(Math.sin(g * 7)) * 1.6 * k; }
        if (st.gesture === 'think') { mix('shL', { x: -1.9, z: -0.2 }); mix('elL', { x: -2.2 }); mix('head', { z: 0.18, x: -0.1 }); }
        if (st.gesture === 'nod') { mix('head', { x: Math.sin(g * 14) * 0.25 }); }
        if (g >= st.gDur) st.gesture = null;
      }
      // talking: head nods and the card's dots pulse in turn
      if (st.talkT > 0) { st.talkT -= dt; P.head.x += Math.sin(t * 11) * 0.06; P.shL.x -= 0.5; P.elL.x -= 0.5; }
      dots.forEach((d, i) => d.scale.setScalar(st.talkT > 0 ? 1 + Math.max(0, Math.sin(t * 8 - i * 0.9)) * 0.6 : 1));
      bulb.scale.setScalar(1 + (st.talkT > 0 ? Math.max(0, Math.sin(t * 10)) * 0.25 : 0));
      // the eye behind the glass looks bigger while she peers
      const peering = st.gesture === 'peer' ? clamp(st.gT / 0.4) * clamp((st.gDur - st.gT) / 0.3) : 0;
      eyes[0].scale.setScalar(1 + peering * 0.45);
      // blink
      st.blinkT -= dt; const bl = st.blinkT < 0.12 ? 0.12 : 1; if (st.blinkT < 0) st.blinkT = 2.5 + Math.random() * 3; for (const e of eyes) e.scale.y = e.scale.x * bl;
      setPose(P, dt, st.gesture === 'nod' || moving ? 18 : 10);
      // the card and the magnifier stay upright and face forward, whatever the arm is doing
      card.rotation.x = -(joints.shL.x + joints.elL.x); card.rotation.z = -joints.shL.z;
      mag.rotation.x = -(joints.shR.x + joints.elR.x) * 0.85; mag.rotation.z = -joints.shR.z;
      // beam from the lens to the plan
      st.beam += (st.beamT - st.beam) * Math.min(1, dt * 6); beam.visible = st.beam > 0.02;
      if (beam.visible && st.beamTo) {
        lensP.getWorldPosition(v3); const dir = q.copy(st.beamTo).sub(v3); const len = dir.length();
        beam.position.copy(v3); beam.scale.set(7, len, 7); beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), dir.normalize());
        beamMat.opacity = st.beam * (0.2 + Math.sin(t * 9) * 0.05); glow.position.copy(st.beamTo).add(new THREE.Vector3(0, 4, 0)); glow.intensity = st.beam * 60;
      } else glow.intensity = 0;
    },
  };
  // pitch/side of a world point relative to her shoulder, for pointing
  function localAim(p) {
    if (!p) return { pitch: 0, side: 0 };
    R.sh.getWorldPosition(v3); const d = q.copy(p).sub(v3); const fwd = Math.atan2(d.x, d.z) - st.yaw;
    const side = clamp(Math.atan2(Math.sin(fwd), Math.cos(fwd)), -0.8, 0.8); const pitch = Math.atan2(d.y, Math.hypot(d.x, d.z));
    return { pitch: clamp(pitch, -0.9, 0.9), side: -side };
  }
  function turn(a, b, k) { let d = b - a; d = Math.atan2(Math.sin(d), Math.cos(d)); return a + d * Math.min(1, k); }
  bot.parts = { head, torso, arms, legs, card, mag };
  return bot;
}
