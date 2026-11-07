// Camera rig: sky orbit with pan, zoom-to-cursor, tilt that follows zoom (25–60°), directed flights between
// poses, street view on rails with limited look-around, turntable and follow shots. No shake, capped turn speed.
// With reduce-motion every flight becomes a quick fade.
// Input (camera review, Nov 2026): drag pans (mouse and one finger), right-drag / two-finger twist rotates,
// two-finger drag up/down tilts, wheel / pinch zoom towards the cursor or pinch point, double-tap flies in.
// Keys (only when the island has focus or nothing else does): WASD pan, Q/E or ←/→ rotate, ↑/↓ tilt, +/- zoom, Home resets.
import * as THREE from 'three';
import { clamp, lerp, ease } from '../engine/stage.js';

const DEG = Math.PI / 180;
const SKY_FOV = 22;                 // the diorama lens (frameDist always uses this, whatever the current view)
const PAN = { x: [-45, 45], z: [-36, 32] };
export function createRig(stage, canvas, fadeEl) {
  const cam = stage.camera;
  const sky = { target: new THREE.Vector3(0, 1, -2), yaw: -40 * DEG, pitch: 34 * DEG, dist: 220, vy: 0, vp: 0, autoPitch: true };
  const rig = {
    // building: while a build tool is selected, taps must place tiles, not move the camera
    mode: 'sky', reduce: false, locked: false, building: false, sky, onTap: null, onDoubleTap: null, onHover: null,
    street: null, flight: null, turntable: 0, follow: null,
    // the part of the screen the island should fill (the game sets this beside its side panels)
    inset: { left: 0, right: 0, top: 0, bottom: 0 },
    freeAspect() { const W = canvas.clientWidth || innerWidth, H = canvas.clientHeight || innerHeight; const w = Math.max(200, W - this.inset.left - this.inset.right), h = Math.max(200, H - this.inset.top - this.inset.bottom); return { aspect: w / h, fw: w / W, fh: h / H }; },
    // distance that fits a span of the island in the free area (the island is ~100 × 75, with cliffs ~40 high)
    frameDist(span = 112, fill = 0.92) {
      const { aspect, fw, fh } = this.freeAspect();
      const vf = SKY_FOV * DEG * fh; const hf = 2 * Math.atan(Math.tan((SKY_FOV * DEG) / 2) * cam.aspect) * fw;
      const f = Math.min(hf, vf * 1.25 * Math.min(1, aspect / 1.2 + 0.2));
      return (span / 2 / fill) / Math.tan(f / 2) * 0.92;
    },
    // scripted distances were tuned on a 16:10 screen; scale them for this screen's shape
    fit(d) { const ref = 280; /* a 1280×800 screen with the build panel */ return d * Math.max(0.8, this.frameDist() / ref); },
    minDist() { return 26; },
    maxDist() { return this.frameDist() * 1.35; },
    skyPose(o = sky) {
      const p = new THREE.Vector3(Math.sin(o.yaw) * Math.cos(o.pitch), Math.sin(o.pitch), Math.cos(o.yaw) * Math.cos(o.pitch)).multiplyScalar(o.dist).add(o.target);
      return { pos: p, look: o.target.clone(), fov: SKY_FOV };
    },
    current() { return { pos: cam.position.clone(), look: this._look.clone(), fov: cam.fov }; },
    _look: new THREE.Vector3(),
    apply(pose) { cam.position.copy(pose.pos); this._look.copy(pose.look); cam.lookAt(pose.look); if (cam.fov !== pose.fov) { cam.fov = pose.fov; cam.updateProjectionMatrix(); } },
    // Fly from the current view to a pose. Sky-to-sky flights move along the orbit (shortest turn), others along
    // a gentle arc. A new flight replaces the one in progress. Timed on the clock, so slow devices don't stretch it.
    fly(to, dur = 1.5, { arc = 0.25, orbit = null } = {}) {
      const from = this.current();
      if (this.flight) { const f = this.flight; this.flight = null; f.res(); }
      if (this.reduce) return this.fade(() => this.apply(to));
      dur = Math.max(1.0, dur);
      return new Promise((res) => { this.flight = { from, to, t0: performance.now(), dur, arc, res, orbit }; });
    },
    fade(mid) {
      return new Promise((res) => { fadeEl.classList.add('on'); setTimeout(() => { mid(); fadeEl.classList.remove('on'); setTimeout(res, 220); }, 220); });
    },
    async toSky(o = {}, dur = 1.4) {
      const before = this.mode === 'sky' && !this.flight ? { ...sky, target: sky.target.clone() } : null;
      Object.assign(sky, { dist: o.dist ?? sky.dist, yaw: o.yaw ?? sky.yaw, pitch: clamp(o.pitch ?? sky.pitch, 25 * DEG, 60 * DEG) }); if (o.target) sky.target.copy(o.target);
      clampTarget();
      this.street = null; this.follow = null; this.turntable = 0;
      if (before) { let dy = sky.yaw - before.yaw; dy = Math.atan2(Math.sin(dy), Math.cos(dy)); dy = clamp(dy, -100 * DEG, 100 * DEG); sky.yaw = before.yaw + dy; }
      await this.fly(this.skyPose(), dur + (before ? Math.abs(sky.yaw - before.yaw) / (Math.PI / 2) * 0.3 : 0), { orbit: before ? { a: before, b: { ...sky, target: sky.target.clone() } } : null });
      this.mode = 'sky';
    },
    overview(dur = 1.4) { sky.autoPitch = true; return this.toSky({ target: new THREE.Vector3(0, 1, -2), dist: this.frameDist(), pitch: 34 * DEG }, dur); },
    focus(point, { dist = 70, pitch = 42 * DEG, yaw = sky.yaw } = {}, dur = 1.2) { return this.toSky({ target: point.clone(), dist: this.fit(dist), pitch, yaw }, dur); },
    // frame a set of world points (a plan, the tiles a check found): fits their bounding sphere in the free area
    frameBox(points, { pitch = 42 * DEG, pad = 1.25, dur = 1.3, yaw = sky.yaw } = {}) {
      if (!points.length) return Promise.resolve();
      const box = new THREE.Box3().setFromPoints(points); const sph = box.getBoundingSphere(new THREE.Sphere());
      const { aspect, fh } = this.freeAspect(); const vf = SKY_FOV * DEG * fh; const f = Math.min(vf, 2 * Math.atan(Math.tan(vf / 2) * aspect));
      const d = clamp(Math.max(8, sph.radius) / Math.tan(f / 2) * pad, this.minDist() * 1.2, this.maxDist());
      return this.toSky({ target: sph.center, dist: d, pitch, yaw }, dur);
    },
    // Street view: eye height ~1.2 m for a child (2 world units), looking at `look`.
    async toStreet(pos, look, dur = 1.6) {
      this.mode = 'flying'; this.turntable = 0; this.follow = null;
      const to = { pos: pos.clone(), look: look.clone(), fov: 50 };
      await this.fly(to, dur, { arc: 0.45 });
      this.street = { base: to, yaw: 0, pitch: 0 }; this.mode = 'street';
    },
    startTurntable(speed = 0.12) { this.turntable = this.reduce ? 0 : speed; },
    followTarget(fn) { this.follow = fn; this.mode = 'follow'; },
    // on-screen and keyboard helpers
    zoomBy(f, at = null) { zoomTo(sky.dist * f, at); },
    rotateBy(a) { if (this.mode !== 'sky') return; const to = sky.yaw + a; if (this.reduce) { sky.yaw = to; return; } this._snap = { from: sky.yaw, to, t0: performance.now() }; },
    // pan by a screen drag (pixels): the ground follows the finger
    panScreen(dx, dy) {
      const wpp = (2 * sky.dist * Math.tan((SKY_FOV * DEG) / 2)) / (canvas.clientHeight || 800); const c = Math.cos(sky.yaw), s = Math.sin(sky.yaw);
      const dxw = dx * wpp, dyw = (dy * wpp) / Math.max(0.45, Math.sin(sky.pitch));
      sky.target.x += -c * dxw - s * dyw; sky.target.z += s * dxw - c * dyw; clampTarget();
    },
    // pan in world units: right/left and forward/back as seen from the camera
    panBy(right, fwd) { const c = Math.cos(sky.yaw), s = Math.sin(sky.yaw); sky.target.x += c * right - s * fwd; sky.target.z += -s * right - c * fwd; clampTarget(); },
    update(dt) {
      if (this.flight) {
        const f = this.flight; const k = ease.inOut(clamp((performance.now() - f.t0) / 1000 / f.dur));
        if (f.orbit) {
          // along the orbit: interpolate target, yaw, pitch and distance; the lens change finishes early
          const a = f.orbit.a, b = f.orbit.b;
          const o = { target: a.target.clone().lerp(b.target, k), yaw: lerp(a.yaw, b.yaw, k), pitch: lerp(a.pitch, b.pitch, k), dist: lerp(a.dist, b.dist, k) };
          this.apply(this.skyPose(o));
        } else {
          const pos = f.from.pos.clone().lerp(f.to.pos, k); const lift = Math.sin(k * Math.PI) * f.arc * f.from.pos.distanceTo(f.to.pos) * 0.35; pos.y += lift;
          const look = f.from.look.clone().lerp(f.to.look, k);
          this.apply({ pos, look, fov: lerp(f.from.fov, f.to.fov, clamp(k / 0.4)) });
        }
        if (k >= 1) { this.flight = null; f.res(); }
        return;
      }
      if (this.mode === 'sky') {
        if (this.turntable) sky.yaw += this.turntable * dt;
        if (this._snap) { const s = this._snap; const k = ease.inOut(clamp((performance.now() - s.t0) / 450)); sky.yaw = lerp(s.from, s.to, k); if (k >= 1) this._snap = null; }
        sky.yaw += sky.vy; sky.pitch = clamp(sky.pitch + sky.vp, 25 * DEG, 60 * DEG);
        // the tilt follows the zoom: close up you look more from the side (like a street), far away more from above
        if (sky.autoPitch && !sky.vp) { const zf = clamp((sky.dist - this.minDist()) / (this.frameDist() - this.minDist())); const want = lerp(32, 40, zf) * DEG; sky.pitch += (want - sky.pitch) * Math.min(1, dt * 3); }
        const damp = this.building ? 0.00002 : 0.04; sky.vy *= Math.pow(damp, dt); sky.vp *= Math.pow(damp, dt); // no drifting while building
        if (Math.abs(sky.vp) < 1e-5) sky.vp = 0;
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
  function clampTarget() { sky.target.x = clamp(sky.target.x, PAN.x[0], PAN.x[1]); sky.target.z = clamp(sky.target.z, PAN.z[0], PAN.z[1]); }
  // the point on the ground (y = 1) under a screen position (NDC), for zooming towards the cursor
  const ray = new THREE.Raycaster(); const ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), -1);
  function groundAt(n) { ray.setFromCamera(n, cam); const p = new THREE.Vector3(); return ray.ray.intersectPlane(ground, p) ? p : null; }
  function zoomTo(d, at = null) {
    if (rig.mode !== 'sky') return;
    const before = at ? groundAt(at) : null;
    sky.dist = clamp(d, rig.minDist(), rig.maxDist()); rig.apply(rig.skyPose()); cam.updateMatrixWorld();
    if (before) { const after = groundAt(at); if (after) { sky.target.add(before.sub(after).setY(0)); clampTarget(); } }
    sky.autoPitch = true;
  }
  rig.zoomTo = zoomTo;

  // ---------- input
  const pts = new Map(); let downAt = 0, moved = 0, lastTap = 0, pinch0 = 0, dist0 = 0, ang0 = 0, mid0 = null, button = 0;
  const ndc = (e) => { const r = canvas.getBoundingClientRect(); return new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); };
  const ndcAt = (x, y) => { const r = canvas.getBoundingClientRect(); return new THREE.Vector2(((x - r.left) / r.width) * 2 - 1, -((y - r.top) / r.height) * 2 + 1); };
  canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  canvas.addEventListener('pointerdown', (e) => {
    canvas.setPointerCapture(e.pointerId); pts.set(e.pointerId, { x: e.clientX, y: e.clientY }); downAt = performance.now(); moved = 0; button = e.button;
    if (pts.size === 2) { const [a, b] = [...pts.values()]; pinch0 = Math.hypot(a.x - b.x, a.y - b.y); dist0 = sky.dist; ang0 = Math.atan2(b.y - a.y, b.x - a.x); mid0 = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }; }
  });
  canvas.addEventListener('pointermove', (e) => {
    const p = pts.get(e.pointerId);
    if (!p) { rig.onHover?.(ndc(e), e); return; }
    const dx = e.clientX - p.x, dy = e.clientY - p.y; p.x = e.clientX; p.y = e.clientY; moved += Math.abs(dx) + Math.abs(dy);
    if (rig.locked) return;
    if (pts.size === 2 && rig.mode === 'sky') {
      // pinch zooms towards the fingers; a twist rotates; moving both fingers up or down tilts
      const [a, b] = [...pts.values()]; const d = Math.hypot(a.x - b.x, a.y - b.y); const ang = Math.atan2(b.y - a.y, b.x - a.x); const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      if (pinch0) zoomTo(dist0 * (pinch0 / d), ndcAt(mid.x, mid.y));
      let da = ang - ang0; da = Math.atan2(Math.sin(da), Math.cos(da)); sky.yaw -= da; ang0 = ang;
      if (mid0) { sky.pitch = clamp(sky.pitch + (mid.y - mid0.y) * 0.004, 25 * DEG, 60 * DEG); sky.autoPitch = false; mid0 = mid; }
      return;
    }
    if (rig.mode === 'sky' && moved > (rig.building ? 14 : 6)) {
      if (button === 2 || e.shiftKey) { const cap = 0.06; sky.vy = clamp(-dx * 0.0045, -cap, cap); sky.vp = clamp(dy * 0.0035, -cap, cap); if (Math.abs(dy) > 1) sky.autoPitch = false; }
      else rig.panScreen(dx, dy);
    }
    if (rig.mode === 'street' && rig.street && moved > 6) { rig.street.yaw = clamp(rig.street.yaw - dx * 0.004, -0.7, 0.7); rig.street.pitch = clamp(rig.street.pitch + dy * 0.003, -0.25, 0.3); }
  });
  const up = (e) => {
    const was = pts.has(e.pointerId); pts.delete(e.pointerId); if (pts.size < 2) { pinch0 = 0; mid0 = null; }
    if (!was || moved > (rig.building ? 14 : 8) || performance.now() - downAt > 700 || button === 2) return;
    const now = performance.now();
    if (now - lastTap < 320) { rig.onDoubleTap?.(ndc(e), e); lastTap = 0; } else { lastTap = now; rig.onTap?.(ndc(e), e); }
  };
  canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', (e) => pts.delete(e.pointerId));
  canvas.addEventListener('wheel', (e) => { if (rig.locked || rig.mode !== 'sky') return; e.preventDefault(); zoomTo(sky.dist * Math.exp(e.deltaY * 0.0012), ndc(e)); }, { passive: false });
  // keyboard, only when the island has focus (or nothing in the interface does)
  window.addEventListener('keydown', (e) => {
    const a = document.activeElement; if (rig.locked || rig.mode !== 'sky') return;
    if (a && a !== document.body && a !== canvas) return;
    const k = e.key.toLowerCase(); const step = 6;
    if (k === 'arrowleft' || k === 'q') sky.vy = 0.03; if (k === 'arrowright' || k === 'e') sky.vy = -0.03;
    if (k === 'arrowup') { sky.vp = -0.02; sky.autoPitch = false; } if (k === 'arrowdown') { sky.vp = 0.02; sky.autoPitch = false; }
    if (k === 'w') rig.panBy(0, step); if (k === 's') rig.panBy(0, -step); if (k === 'a') rig.panBy(-step, 0); if (k === 'd') rig.panBy(step, 0);
    if (k === '+' || k === '=') zoomTo(sky.dist * 0.85); if (k === '-') zoomTo(sky.dist * 1.15);
    if (k === 'home') rig.overview(1.2);
  });
  sky.dist = rig.frameDist(); rig.apply(rig.skyPose());
  return rig;
}
