// Street view helpers: where you may walk (rig.streetNav) and a small on-screen pad, shown only in street view:
// "Back to the island", hold-to-walk arrows for touch (and mouse), and a one-line hint. Built from the
// existing .btn / .ib styles; the markup lives here so the HUD files stay untouched.
// Walkable ground = island tiles that Florence can walk on too (world.walkCost: open land, paths, roads,
// flat builds, river only on a bridge). Buildings, the river and the wild rim block you, so you stay on the island.
import { tileAt, tileCenter, key, GW, GH } from '../world/terrain.js';
import { findPath, smooth } from '../world/path.js';

export function createStreetPad({ rig, world, terrain, onExit }) {
  const cost = (k) => { const c = world.walkCost(k); return terrain.tiles.get(k)?.zone === 'river' && c > 1 ? Infinity : c; }; // no wading
  const tileKey = (x, z) => { const t = tileAt(x, z); return t ? key(t[0], t[1]) : null; };
  const ok = (x, z) => { const k = tileKey(x, z); return !!k && terrain.tiles.has(k) && isFinite(cost(k)); };
  rig.streetNav = {
    ok,
    ground: (x, z) => { const k = tileKey(x, z); return k && terrain.tiles.has(k) ? world.tileTop(k).y : null; },
    // a route from where you stand to a point: tile A* (no corner cutting), then straightened where clear
    route(from, to) {
      const a = tileAt(from.x, from.z), b = tileAt(to.x, to.z); if (!a || !b || !ok(to.x, to.z)) return null;
      const p = findPath(a, b, (gx, gz) => (terrain.tiles.has(key(gx, gz)) ? cost(key(gx, gz)) : Infinity), { w: GW, h: GH }); if (!p) return null;
      const pts = [[from.x, from.z], ...p.slice(1, -1).map(([gx, gz]) => tileCenter(gx, gz)), [to.x, to.z]];
      return smooth(pts, ok, 0.5).slice(1).map(([x, z]) => ({ x, z }));
    },
  };

  const el = document.createElement('div'); el.className = 'streetpad'; el.hidden = true; el.setAttribute('role', 'group'); el.setAttribute('aria-label', 'Street view');
  el.innerHTML = `<button class="btn go" data-sp-exit>⬆ Back to the island</button>
    <div data-sp-pad><button class="ib" data-sp="f" aria-label="Walk forward">▲</button><button class="ib" data-sp="l" aria-label="Turn left">◀</button><button class="ib" data-sp="b" aria-label="Walk back">▼</button><button class="ib" data-sp="r" aria-label="Turn right">▶</button></div>
    <p data-sp-hint></p>`;
  const css = document.createElement('style');
  css.textContent = `.streetpad{position:fixed;left:0;right:0;top:0;bottom:0;pointer-events:none;z-index:30}
.streetpad>*{pointer-events:auto}
.streetpad [data-sp-exit]{position:absolute;left:50%;transform:translateX(-50%);top:var(--sp-top,84px);box-shadow:0 3px 0 rgba(0,0,0,.18)}
.streetpad [data-sp-pad]{position:absolute;left:14px;bottom:var(--sp-bottom,16px);display:grid;grid-template-columns:repeat(3,52px);grid-template-rows:repeat(2,52px);gap:4px}
.streetpad [data-sp-pad] .ib{width:52px;height:52px;background:var(--paper,#fff8e8);box-shadow:inset 0 -3px 0 var(--edge2,#d9c7a3),0 2px 0 rgba(0,0,0,.15);touch-action:none;user-select:none}
.streetpad [data-sp=f]{grid-column:2;grid-row:1}.streetpad [data-sp=l]{grid-column:1;grid-row:2}.streetpad [data-sp=b]{grid-column:2;grid-row:2}.streetpad [data-sp=r]{grid-column:3;grid-row:2}
.streetpad [data-sp-hint]{position:absolute;left:190px;right:14px;bottom:var(--sp-bottom,16px);margin:0;font-weight:700;font-size:.85em;color:var(--ink,#3b2a1a);background:var(--paper,#fff8e8);border-radius:12px;padding:6px 10px;max-width:320px;box-shadow:inset 0 -3px 0 var(--edge2,#d9c7a3)}
.streetpad [data-sp-hint].nudge{background:#ffe7a3}
@media (max-width:560px){.streetpad [data-sp-hint]{left:14px;bottom:calc(var(--sp-bottom,16px) + 116px);max-width:none}}`;
  document.head.appendChild(css); (document.getElementById('layer') || document.body).appendChild(el);
  const hint = el.querySelector('[data-sp-hint]');
  const coarse = matchMedia('(pointer: coarse)').matches;
  const HINT = coarse ? 'Tap the ground to walk there. Drag to look around.' : 'Walk with W A S D or the arrow keys, or click the ground. Drag to look around.';
  const exit = () => { rig.street && (rig.street.move = { f: 0, s: 0, turn: 0 }); onExit?.(); };
  el.querySelector('[data-sp-exit]').onclick = exit;
  rig.onStreetExit = exit;
  rig.onStreetBlocked = () => { hint.textContent = 'You can’t walk there. Try a path or open ground.'; hint.classList.add('nudge'); clearTimeout(nudgeT); nudgeT = setTimeout(() => { hint.textContent = HINT; hint.classList.remove('nudge'); }, 2200); };
  let nudgeT = 0;
  // hold to walk: pointer down starts, up / leave stops; a keyboard press (Enter / Space) takes a short step
  const MOVE = { f: { f: 1 }, b: { f: -1 }, l: { turn: 1 }, r: { turn: -1 } };
  for (const b of el.querySelectorAll('[data-sp]')) {
    const set = (on) => { if (!rig.street) return; rig.street.path = null; rig.street.move = on ? { f: 0, s: 0, turn: 0, ...MOVE[b.dataset.sp] } : { f: 0, s: 0, turn: 0 }; };
    b.addEventListener('pointerdown', (e) => { e.preventDefault(); b.setPointerCapture(e.pointerId); set(true); });
    for (const ev of ['pointerup', 'pointercancel', 'lostpointercapture']) b.addEventListener(ev, () => set(false));
    b.addEventListener('click', (e) => { if (e.detail === 0) { set(true); setTimeout(() => set(false), 350); } });
  }
  // shown only in street view; placed clear of the top card and the bottom build bar
  let shown = false;
  const place = () => {
    const vis = (q) => { const n = document.querySelector(q); if (!n || n.classList.contains('hide') || !n.getClientRects().length) return null; return n.getBoundingClientRect(); };
    const card = vis('#card'), bars = ['#build', '#dock'].map(vis).filter((r) => r && r.top > innerHeight * 0.5);
    el.style.setProperty('--sp-top', `${Math.round((card?.bottom ?? 10) + 12)}px`);
    el.style.setProperty('--sp-bottom', `${Math.round(bars.length ? innerHeight - Math.min(...bars.map((r) => r.top)) + 12 : 16)}px`);
  };
  setInterval(() => {
    const on = rig.mode === 'street';
    if (on !== shown) { shown = on; el.hidden = !on; if (on) { hint.textContent = HINT; hint.classList.remove('nudge'); place(); } }
  }, 200);
  addEventListener('resize', () => shown && place());
  return el;
}
