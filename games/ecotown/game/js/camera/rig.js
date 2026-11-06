// Camera rig: sky orbit (drag / pinch / wheel, momentum, tilt 25–60°), directed flights between poses,
// street view on rails with limited look-around, turntable and follow shots. No shake, capped turn speed.
// With reduce-motion every flight becomes a quick fade.
import * as THREE from 'three';
import { clamp, lerp, ease } from '../engine/stage.js';

const DEG = Math.PI / 180;
export function createRig(stage, canvas, fadeEl) {
  const cam = stage.camera;
  const sky = { target: new THREE.Vector3(0, 1, -2), yaw: -40 * DEG, pitch: 34 * DEG, dist: 220, vy: 0, vp: 0 };
  const rig = {
    // building: while a build tool is selected, taps must place tiles, not move the camera (no fly-in, no spin-on)
    mode: 'sky', reduce: false, locked: false, building: false, sky, onTap: null, onDoubleTap: null, onHover: null,
    street: null, flight: null, turntable: 0, follow: null,
    // distance that makes the island ~75% of the screen width (or height on portrait screens)
    frameDist(span = 100, fill = 0.92) {
      const vf = cam.fov * DEG; const hf = 2 * Math.atan(Math.tan(vf / 2) * cam.aspect);
      const f = Math.min(hf, vf * 1.25);
      return (span / 2 / fill) / Math.tan(f / 2) * 0.92;
    },
    skyPose(o = sky) {
      const p = new THREE.Vector3(Math.sin(o.yaw) * Math.cos(o.pitch), Math.sin(o.pitch), Math.cos(o.yaw) * Math.cos(o.pitch)).multiplyScalar(o.dist).add(o.target);
      return { pos: p, look: o.target.clone(), fov: 22 };
    },
    current() { return { pos: cam.position.clone(), look: this._look.clone(), fov: cam.fov }; },
    _look: new THREE.Vector3(),
    apply(pose) { cam.position.copy(pose.pos); this._look.copy(pose.look); cam.lookAt(pose.look); if (cam.fov !== pose.fov) { cam.fov = pose.fov; cam.updateProjectionMatrix(); } },
    // Fly from the current view to a pose along a gentle arc. Returns a promise.
    fly(to, dur = 1.5, { arc = 0.25 } = {}) {
      const from = this.current();
      if (this.reduce) return this.fade(() => this.apply(to));
      return new Promise((res) => { this.flight = { from, to, t: 0, dur, arc, res }; });
    },
    fade(mid) {
      return new Promise((res) => { fadeEl.classList.add('on'); setTimeout(() => { mid(); fadeEl.classList.remove('on'); setTimeout(res, 220); }, 220); });
    },
    async toSky(o = {}, dur = 1.4) {
      Object.assign(sky, { dist: o.dist ?? sky.dist, yaw: o.yaw ?? sky.yaw, pitch: clamp(o.pitch ?? sky.pitch, 25 * DEG, 60 * DEG) }); if (o.target) sky.target.copy(o.target);
      this.street = null; this.follow = null; this.turntable = 0;
      await this.fly(this.skyPose(), dur); this.mode = 'sky';
    },
    overview(dur = 1.4) { return this.toSky({ target: new THREE.Vector3(0, 1, -2), dist: this.frameDist(), pitch: 34 * DEG }, dur); },
    focus(point, { dist = 70, pitch = 42 * DEG, yaw = sky.yaw } = {}, dur = 1.2) { return this.toSky({ target: point.clone(), dist, pitch, yaw }, dur); },
    // Street view: eye height ~1.2 m for a child (2 world units), looking at `look`.
    async toStreet(pos, look, dur = 1.6) {
      this.mode = 'flying'; this.turntable = 0; this.follow = null;
      const to = { pos: pos.clone(), look: look.clone(), fov: 50 };
      await this.fly(to, dur, { arc: 0.45 });
      this.street = { base: to, yaw: 0, pitch: 0 }; this.mode = 'street';
    },
    startTurntable(speed = 0.12) { this.turntable = speed; },
    followTarget(fn) { this.follow = fn; this.mode = 'follow'; },
    update(dt) {
      if (this.flight) {
        const f = this.flight; f.t += dt; const k = ease.inOut(clamp(f.t / f.dur));
        const pos = f.from.pos.clone().lerp(f.to.pos, k); const lift = Math.sin(k * Math.PI) * f.arc * f.from.pos.distanceTo(f.to.pos) * 0.35; pos.y += lift;
        const look = f.from.look.clone().lerp(f.to.look, k);
        this.apply({ pos, look, fov: lerp(f.from.fov, f.to.fov, k) });
        if (f.t >= f.dur) { this.flight = null; f.res(); }
        return;
      }
      if (this.mode === 'sky') {
        if (this.turntable) sky.yaw += this.turntable * dt;
        sky.yaw += sky.vy; sky.pitch = clamp(sky.pitch + sky.vp, 25 * DEG, 60 * DEG);
        const damp = this.building ? 0.00002 : 0.04; sky.vy *= Math.pow(damp, dt); sky.vp *= Math.pow(damp, dt); // no drifting while building
        this.apply(this.skyPose());
      } else if (this.mode === 'street' && this.street) {
        const s = this.street; const b = s.base;
        const dir = b.look.clone().sub(b.pos); const len = dir.length();
        dir.applyAxisAngle(new THREE.Vector3(0, 1, 0), s.yaw); dir.y += Math.tan(s.pitch) * len;
        this.apply({ pos: b.pos, look: b.pos.clone().add(dir), fov: 50 });
      } else if (this.mode === 'follow' && this.follow) {
        const { pos, look } = this.follow(dt); const cur = this.current();
        this.apply({ pos: cur.pos.lerp(pos, Math.min(1, dt * 2.5)), look: cur.look.lerp(look, Math.min(1, dt * 3)), fov: 36 });
      }
    },
  };

  // ---------- input: drag to orbit / look, pinch and wheel to zoom, tap and double-tap
  const pts = new Map(); let downAt = 0, moved = 0, lastTap = 0, pinch0 = 0, dist0 = 0;
  const ndc = (e) => { const r = canvas.getBoundingClientRect(); return new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); };
  canvas.addEventListener('pointerdown', (e) => { canvas.setPointerCapture(e.pointerId); pts.set(e.pointerId, { x: e.clientX, y: e.clientY }); downAt = performance.now(); moved = 0; if (pts.size === 2) { const [a, b] = [...pts.values()]; pinch0 = Math.hypot(a.x - b.x, a.y - b.y); dist0 = sky.dist; } });
  canvas.addEventListener('pointermove', (e) => {
    const p = pts.get(e.pointerId);
    if (!p) { rig.onHover?.(ndc(e), e); return; }
    const dx = e.clientX - p.x, dy = e.clientY - p.y; p.x = e.clientX; p.y = e.clientY; moved += Math.abs(dx) + Math.abs(dy);
    if (rig.locked) return;
    if (pts.size === 2) { const [a, b] = [...pts.values()]; const d = Math.hypot(a.x - b.x, a.y - b.y); if (pinch0) sky.dist = clamp(dist0 * (pinch0 / d), 45, rig.frameDist() * 1.35); return; }
    if (rig.mode === 'sky' && moved > (rig.building ? 14 : 6)) { const cap = 0.06; sky.vy = clamp(-dx * 0.0045, -cap, cap); sky.vp = clamp(dy * 0.0035, -cap, cap); }
    if (rig.mode === 'street' && rig.street && moved > 6) { rig.street.yaw = clamp(rig.street.yaw - dx * 0.004, -0.7, 0.7); rig.street.pitch = clamp(rig.street.pitch + dy * 0.003, -0.25, 0.3); }
  });
  const up = (e) => {
    const was = pts.has(e.pointerId); pts.delete(e.pointerId); if (pts.size < 2) pinch0 = 0;
    if (!was || moved > (rig.building ? 14 : 8) || performance.now() - downAt > 450) return;
    const now = performance.now();
    if (now - lastTap < 320) { rig.onDoubleTap?.(ndc(e), e); lastTap = 0; } else { lastTap = now; rig.onTap?.(ndc(e), e); }
  };
  canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', (e) => pts.delete(e.pointerId));
  canvas.addEventListener('wheel', (e) => { if (rig.locked || rig.mode !== 'sky') return; e.preventDefault(); sky.dist = clamp(sky.dist * Math.exp(e.deltaY * 0.0012), 45, rig.frameDist() * 1.35); }, { passive: false });
  // keyboard: arrows orbit, +/- zoom
  window.addEventListener('keydown', (e) => {
    if (rig.locked || rig.mode !== 'sky' || /INPUT|TEXTAREA/.test(document.activeElement?.tagName)) return;
    if (e.key === 'ArrowLeft') sky.vy = 0.03; if (e.key === 'ArrowRight') sky.vy = -0.03;
    if (e.key === 'ArrowUp') sky.vp = -0.02; if (e.key === 'ArrowDown') sky.vp = 0.02;
    if (e.key === '+' || e.key === '=') sky.dist = Math.max(45, sky.dist * 0.9); if (e.key === '-') sky.dist = Math.min(rig.frameDist() * 1.35, sky.dist * 1.1);
  });
  sky.dist = rig.frameDist(); rig.apply(rig.skyPose());
  return rig;
}
