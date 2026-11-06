// Florence in the world: a small voxel drone. She flies to her plan and beams the ghost blocks down,
// shrugs when a check catches its mistake and spins when the plan passes.
import * as THREE from 'three';
import { Vox } from './voxel.js';
import { clamp, ease } from './stage.js';

export function createBot(stage) {
  const g = new THREE.Group(); stage.scene.add(g);
  const v = new Vox(); v.jitter = 0.02;
  for (let x = -3; x <= 3; x++) for (let y = -3; y <= 3; y++) for (let z = -3; z <= 3; z++) if (x * x + y * y * 1.3 + z * z <= 11) v.set(x, y, z, y < -1 ? '#dfe7ef' : '#ffffff');
  for (let x = -2; x <= 2; x++) for (let y = -1; y <= 1; y++) v.set(x, y, 3, '#2b3a55');  // visor
  v.set(-1, 0, 4, '#ffd23f'); v.set(1, 0, 4, '#ffd23f');                                    // eyes
  v.set(0, 4, 0, '#9aa6b0'); v.set(0, 5, 0, '#16c79a');                                     // antenna
  v.box(-5, 0, -1, -4, 0, 1, '#ffffff'); v.box(4, 0, -1, 5, 0, 1, '#ffffff');               // arms
  const body = v.mesh({ scale: 0.32 }); g.add(body);
  const eyes = body; // eyes are part of the mesh; mood shows through the animation
  const beamMat = new THREE.MeshBasicMaterial({ color: '#bff3ff', transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending });
  const beam = new THREE.Mesh(new THREE.ConeGeometry(4, 1, 24, 1, true), beamMat); beam.geometry.translate(0, -0.5, 0); g.add(beam);
  const glow = new THREE.PointLight(0x9fe8ff, 0, 30); g.add(glow);

  const st = { pos: new THREE.Vector3(10, 30, 30), from: null, to: null, t: 0, dur: 1, beam: 0, beamT: 0, mood: 'idle', moodT: 0, target: null };
  g.position.copy(st.pos);
  const bot = {
    group: g, visible: true,
    flyTo(p, dur = 1.2) { st.from = g.position.clone(); st.to = p.clone(); st.t = 0; st.dur = dur; return new Promise((r) => setTimeout(r, dur * 1000)); },
    hover(p) { return this.flyTo(p.clone().add(new THREE.Vector3(0, 16, 0)), 1.1); },
    beam(on, height = 16) { st.beamT = on ? 1 : 0; beam.scale.set(1, height, 1); },
    shrug() { st.mood = 'shrug'; st.moodT = 0; },
    cheer() { st.mood = 'cheer'; st.moodT = 0; },
    look(p) { st.target = p ? p.clone() : null; },
    show(on) { g.visible = on; },
    update(dt, t) {
      if (st.to) { st.t += dt; const k = ease.inOut(clamp(st.t / st.dur)); g.position.lerpVectors(st.from, st.to, k); g.position.y += Math.sin(k * Math.PI) * 4; if (k >= 1) st.to = null; }
      body.position.y = Math.sin(t * 2.2) * 0.35;
      st.beam += (st.beamT - st.beam) * Math.min(1, dt * 6); beamMat.opacity = st.beam * (0.22 + Math.sin(t * 9) * 0.05); glow.intensity = st.beam * 60; beam.visible = st.beam > 0.02;
      st.moodT += dt;
      if (st.mood === 'shrug') { body.rotation.z = Math.sin(st.moodT * 14) * 0.35 * Math.max(0, 1 - st.moodT / 1.2); if (st.moodT > 1.2) st.mood = 'idle'; }
      else if (st.mood === 'cheer') { body.rotation.y = ease.out(clamp(st.moodT / 0.9)) * Math.PI * 4; body.position.y += Math.abs(Math.sin(st.moodT * 9)) * 1.2 * Math.max(0, 1 - st.moodT / 1.2); if (st.moodT > 1.2) { st.mood = 'idle'; body.rotation.y = 0; } }
      else { body.rotation.z *= 0.9; }
      const cam = stage.camera.position; const face = st.target || new THREE.Vector3(cam.x, g.position.y, cam.z);
      if (st.mood !== 'cheer') g.rotation.y += (Math.atan2(face.x - g.position.x, face.z - g.position.z) - g.rotation.y) * Math.min(1, dt * 3);
      void eyes;
    },
  };
  return bot;
}
