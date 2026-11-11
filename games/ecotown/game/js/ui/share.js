// Showing a town to other people (best-seller plan, stage 4): the town postcard, the "Visit a town" card and the
// club wall. Rules live in js/game/towncode.js (the code), js/game/qr.js (the QR picture) and js/game/townshare.js
// (what a device works out from a code). Safeguarding: no accounts, no chat, no network calls; a code is typed or
// scanned in the same room; the postcard is a picture saved on this device; a typed town name is never shown on it.
import * as THREE from 'three';
import { ITEMS } from '../world/catalog.js';
import { ZONES } from '../world/terrain.js';
import { decodeTown, groupCode, whyText, cleanCode } from '../game/towncode.js';
import { qrMatrix, bytesSeg, alnumSeg } from '../game/qr.js';
import { shareCode, summarize, wallLoad, wallSave, wallAdd, wallRemove, wallPrompts, PART_WORD, MEDAL_WORD, WALL_MAX } from '../game/townshare.js';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const MED = { gold: '🥇', silver: '🥈', bronze: '🥉' };
const MED_COL = { gold: ['#e2b120', '#8a6400'], silver: ['#b9c2cb', '#5b6672'], bronze: ['#c98545', '#7a4315'] };
const store = () => { try { return window.localStorage; } catch { return { getItem: () => null, setItem() {} }; } };

// ---- addresses: the same page with ?town=<code>. Opening it shows the town read-only.
const pageUrl = () => location.origin + location.pathname;
export const townLink = (code) => `${pageUrl()}?town=${code}`;
export const go = (query) => { location.href = pageUrl() + query; };
// what the address asks for: { town: decode result or null, wall, visit, from, carry }
export function shareParams() {
  const q = new URLSearchParams(location.search); const has = q.has('town') || /[#&]town=/.test(location.hash);
  return { town: has ? decodeTown(location.search + location.hash) : null, raw: has ? cleanCode(location.search + location.hash) : '', wall: q.has('wall'), visit: q.has('visit'), from: q.get('from') === 'wall' ? 'wall' : null, carry: q.has('carry') };
}

// ---- the QR picture: the link, so a scan in the game or with a camera app opens the town on the same site
export function qrFor(code) { return qrMatrix([bytesSeg(`${pageUrl()}?town=`), alnumSeg(code)]) || qrMatrix(code); }
export function drawQR(g, m, x, y, size) {
  const quiet = 3; const cell = Math.max(1, Math.floor(size / (m.size + quiet * 2))); const full = cell * (m.size + quiet * 2); const o = Math.floor((size - full) / 2);
  g.fillStyle = '#fff'; g.fillRect(x, y, size, size); g.fillStyle = '#111';
  for (let r = 0; r < m.size; r++) for (let c = 0; c < m.size; c++) if (m.rows[r][c]) g.fillRect(x + o + (c + quiet) * cell, y + o + (r + quiet) * cell, cell, cell);
}
export function qrCanvas(code, size = 240) {
  const c = document.createElement('canvas'); c.width = c.height = size; const m = qrFor(code); if (m) drawQR(c.getContext('2d'), m, 0, 0, size);
  c.setAttribute('role', 'img'); c.setAttribute('aria-label', 'QR code of the town code'); return c;
}

// ---- a small map of a town drawn from its cells (a picture does not travel in a code, the cells do)
export function drawTownMap(canvas, terrain, cells) {
  const g = canvas.getContext('2d'); const W = canvas.width, H = canvas.height;
  const ts = [...terrain.tiles.values()]; const x0 = Math.min(...ts.map((t) => t.gx)), x1 = Math.max(...ts.map((t) => t.gx)), z0 = Math.min(...ts.map((t) => t.gz)), z1 = Math.max(...ts.map((t) => t.gz));
  const s = Math.floor(Math.min((W - 8) / (x1 - x0 + 1), (H - 8) / (z1 - z0 + 1))); const ox = Math.round((W - s * (x1 - x0 + 1)) / 2), oz = Math.round((H - s * (z1 - z0 + 1)) / 2);
  g.fillStyle = '#bfe3f2'; g.fillRect(0, 0, W, H);
  // the island's shape first (a soft rim), then each tile
  g.fillStyle = '#c9a678'; for (const t of ts) g.fillRect(ox + (t.gx - x0) * s - 2, oz + (t.gz - z0) * s - 2, s + 4, s + 4);
  for (const t of ts) {
    const x = ox + (t.gx - x0) * s, y = oz + (t.gz - z0) * s; const c = cells.get(t.k); const it = c?.item && ITEMS[c.item];
    g.fillStyle = t.fixed ? '#8d99a6' : c?.mark === 'town' ? '#ecd9a6' : ZONES[t.zone]?.top || '#8ad86c'; g.fillRect(x, y, s, s);
    if (c?.mark === 'wild') { g.strokeStyle = '#d6408a'; g.lineWidth = Math.max(1.5, s / 9); g.strokeRect(x + g.lineWidth / 2 + 0.5, y + g.lineWidth / 2 + 0.5, s - g.lineWidth - 1, s - g.lineWidth - 1); }
    if (it) { const p = Math.max(1, Math.round(s * 0.16)); g.fillStyle = '#3b2a1e'; g.fillRect(x + p - 1, y + p - 1, s - 2 * p + 2, s - 2 * p + 2); g.fillStyle = it.color; g.fillRect(x + p, y + p, s - 2 * p, s - 2 * p);
      if (it.home) { g.fillStyle = '#7a3b24'; g.beginPath(); g.moveTo(x + p, y + s * 0.5); g.lineTo(x + s / 2, y + p); g.lineTo(x + s - p, y + s * 0.5); g.closePath(); g.fill(); } }
    g.strokeStyle = 'rgba(59,42,30,.18)'; g.lineWidth = 1; g.strokeRect(x + 0.5, y + 0.5, s - 1, s - 1);
  }
}

// ---- the postcard: the town's picture, its title, score and medal, the code and its QR square, as one PNG.
// o = { shot (data URL or ''), sum (summarize result), code, band }. Landscape for a wide picture, upright for a phone's.
function loadImage(src) { return new Promise((res) => { if (!src) return res(null); const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src; }); }
export async function postcardCanvas(o) {
  const img = await loadImage(o.shot); const tall = !!img && img.height > img.width * 1.1;
  const W = tall ? 900 : 1200, H = tall ? 1230 : 870, PH = tall ? 820 : 520; const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d');
  g.fillStyle = '#bfe3f2'; g.fillRect(0, 0, W, PH);
  if (img) { const k = Math.max(W / img.width, PH / img.height); const w = img.width * k, h = img.height * k; g.drawImage(img, (W - w) / 2, (PH - h) / 2, w, h); }
  else if (o.terrain) { const m = document.createElement('canvas'); m.width = 640; m.height = 500; drawTownMap(m, o.terrain, o.sum.cells); g.drawImage(m, (W - 640 * PH / 500) / 2, 0, 640 * PH / 500, PH); }
  // the card under the picture
  g.fillStyle = '#f6ecd4'; g.fillRect(0, PH, W, H - PH); g.fillStyle = '#b5523b'; g.fillRect(0, PH, W, 8); g.fillStyle = '#3b2a1e'; g.fillRect(0, PH + 8, W, 2);
  const pad = 36; const Q = tall ? 250 : 236; const qx = W - pad - Q, qy = PH + 34; const m = qrFor(o.code);
  g.fillStyle = '#3b2a1e'; g.fillRect(qx - 6, qy - 6, Q + 12, Q + 12); if (m) drawQR(g, m, qx, qy, Q);
  const left = pad, colW = qx - pad - 28; g.textBaseline = 'alphabetic'; g.textAlign = 'left';
  g.fillStyle = '#3b2a1e'; g.font = '800 15px Inter, system-ui, sans-serif'; g.fillText('ECO TOWN  ·  TOWN POSTCARD', left, PH + 44);
  let size = 56; g.font = `800 ${size}px Bricolage, Inter, system-ui, sans-serif`; while (g.measureText(o.sum.heading).width > colW && size > 28) { size -= 2; g.font = `800 ${size}px Bricolage, Inter, system-ui, sans-serif`; }
  g.fillText(o.sum.heading, left, PH + 104);
  g.font = '600 20px Inter, system-ui, sans-serif'; g.fillStyle = '#5e4936';
  g.fillText([o.sum.heading === o.sum.title ? null : `Town badge: ${o.sum.title}`, `${o.sum.families} families`, o.band === 'senior' ? 'ages 13–17' : 'ages 8–12'].filter(Boolean).join(' · '), left, PH + 136);
  // the medal disc and the score
  const my = PH + 180; const col = MED_COL[o.sum.medal]; g.beginPath(); g.arc(left + 24, my, 24, 0, Math.PI * 2); g.fillStyle = col ? col[0] : '#f6ecd4'; g.fill(); g.lineWidth = 4; g.strokeStyle = col ? col[1] : '#b08a55'; g.stroke();
  g.fillStyle = col ? col[1] : '#b08a55'; g.font = '800 22px Inter, system-ui, sans-serif'; g.textAlign = 'center'; g.fillText(o.sum.medal ? o.sum.medal[0].toUpperCase() : '–', left + 24, my + 8); g.textAlign = 'left';
  g.fillStyle = '#3b2a1e'; g.font = '800 30px Inter, system-ui, sans-serif'; g.fillText(`Town score ${o.sum.total} / 100`, left + 62, my + 4);
  g.font = '700 18px Inter, system-ui, sans-serif'; g.fillStyle = '#5e4936'; g.fillText(o.sum.medal ? `${MEDAL_WORD[o.sum.medal]} medal` : 'No medal yet: bronze starts at 60', left + 62, my + 28);
  // the code, in fours, as large as fits the column
  const groups = groupCode(o.code).split(' '); const top = my + 50, room = H - top - 46; let f = 24, per = 1, lines = 1;
  for (; f >= 10; f--) { per = Math.max(1, Math.floor((colW + f * 0.6) / (f * 0.6 * 5))); lines = Math.ceil(groups.length / per); if (lines * f * 1.3 <= room) break; }
  g.fillStyle = '#3b2a1e'; g.font = `700 ${f}px ui-monospace, Menlo, Consolas, "DejaVu Sans Mono", monospace`;
  for (let i = 0; i < lines; i++) g.fillText(groups.slice(i * per, (i + 1) * per).join(' '), left, top + f + i * f * 1.3);
  g.font = '600 15px Inter, system-ui, sans-serif'; g.fillStyle = '#5e4936';
  g.fillText(tall ? 'To visit: Eco Town → Visit a town → type the code or scan the square.' : 'To visit this town: open Eco Town → Visit a town → type the code or scan the square. No names, no accounts.', left, H - 18);
  return c;
}
function download(canvas, name) {
  return new Promise((res) => { try { canvas.toBlob((b) => { if (!b) return res(false); const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); res(true); }, 'image/png'); } catch { res(false); } });
}
async function copyText(t) { try { await navigator.clipboard.writeText(t); return true; } catch { return false; } }

// the postcard's picture: the whole island from the home direction, whatever the camera is looking at now, without
// the build kerbs. The camera is put back at once (the render loop draws the next frame from where it was).
function wholeIslandShot(app) {
  const { stage, rig, world } = app; const cam = stage.camera; if (rig.mode !== 'sky') return app.snapshot();
  const keep = { pos: cam.position.clone(), quat: cam.quaternion.clone(), view: cam.view?.enabled ? { ...cam.view } : null, kerbs: world.overlayHidden };
  try {
    cam.clearViewOffset(); world.hideOverlay?.(true);
    const f = (cam.fov * Math.PI) / 360; const dist = Math.max(62 / Math.tan(Math.atan(Math.tan(f) * cam.aspect)), 52 / Math.tan(f));
    const pose = rig.skyPose({ target: new THREE.Vector3(0, -3, -2), yaw: (-40 * Math.PI) / 180, pitch: (34 * Math.PI) / 180, dist });
    cam.position.copy(pose.pos); cam.lookAt(pose.look); cam.updateMatrixWorld();
    return app.snapshot();
  } catch { return app.snapshot(); } finally {
    cam.position.copy(keep.pos); cam.quaternion.copy(keep.quat); if (keep.view) cam.setViewOffset(keep.view.fullWidth, keep.view.fullHeight, keep.view.offsetX, keep.view.offsetY, keep.view.width, keep.view.height); cam.updateMatrixWorld(); world.hideOverlay?.(keep.kerbs);
  }
}
// what the town being played would show on another device: { code, sum } (null if it cannot be written)
export function myTown(app) {
  const G = app.G; if (!G?.cells) return null;
  try { const code = shareCode(app.terrain, { cells: G.cells, band: G.band, catches: G.catches || 0, extra: G.extra || {}, townName: G.townName }); const d = decodeTown(code); return d.ok ? { code, sum: summarize(app.terrain, d.town), band: G.band } : null; } catch { return null; }
}
// the postcard card: the picture, the code in fours, the QR square, and "Save the picture" (☰ and the town report)
export async function openPostcard(app, { shot = null } = {}) {
  const t = myTown(app); const j = app.band !== 'senior';
  if (!t) { app.ui.caption(j ? 'Build something first, then make a postcard.' : 'Nothing to share yet.', 3000); return; }
  if (!t.sum.builds && !t.sum.sim.townTiles) { app.ui.caption(j ? 'Your island is still empty. Build a little first, then make a postcard.' : 'The island is empty: build first.', 3600); return; }
  // the picture without the build kerbs (the render loop puts them back on its next frame)
  if (shot == null) shot = wholeIslandShot(app);
  const card = await postcardCanvas({ shot, sum: t.sum, code: t.code, band: t.band, terrain: app.terrain });
  const nameNote = t.sum.heading !== app.G.townName ? `<p class="pcnote">${j ? `The postcard uses your town’s badge, “${esc(t.sum.title)}”, not the name you typed. Names you type stay on this device.` : `The postcard shows the town’s badge (“${esc(t.sum.title)}”), not the typed name: typed text never leaves this device.`}</p>` : '';
  return app.ui.modal(`<div class="postcard"><div class="ribbon">✉ Town postcard</div><div class="pcimg" data-pc></div>
    <p class="pchow">${j ? 'A friend in the room can visit your town: they tap <b>Visit a town</b> and type this code, or scan the square.' : 'Someone in the room can open this town read-only: <b>Visit a town</b>, then type the code or scan the square.'}</p>
    <p class="pccode" data-code aria-label="Town code">${esc(groupCode(t.code))}</p><p class="pclen">${t.code.length} characters, in ${Math.ceil(t.code.length / 4)} groups of four</p>${nameNote}
    <p class="pcmsg" data-msg role="status"></p>
    <div class="row" style="justify-content:center"><button class="btn go" data-save>⬇ Save the picture</button><button class="btn alt" data-copy>Copy the code</button><button class="btn alt" data-act="close">Close</button></div></div>`,
  { bind: (el) => {
    card.className = 'pccanvas'; card.setAttribute('role', 'img'); card.setAttribute('aria-label', `Postcard of ${t.sum.heading}: town score ${t.sum.total} out of 100`); el.querySelector('[data-pc]').appendChild(card);
    const msg = el.querySelector('[data-msg]');
    el.querySelector('[data-save]').onclick = async () => { const ok = await download(card, 'eco-town-postcard.png'); msg.textContent = ok ? (j ? 'Saved on this device. Look in your downloads or pictures.' : 'Saved to this device’s downloads.') : (j ? 'This device could not save the picture. Press and hold it to save it.' : 'Could not save: long-press the picture instead.'); };
    el.querySelector('[data-copy]').onclick = async () => { msg.textContent = (await copyText(groupCode(t.code))) ? 'Code copied.' : (j ? 'Copying did not work here. Read the code out, or show the square.' : 'Copy is not available: read the code out or show the QR square.'); };
  } });
}

// ---- scanning with the device camera (optional): only where the browser can read QR codes itself, only after a
// tap, never stored or sent. Any failure just closes the scanner with one calm line.
export const canScan = () => typeof window !== 'undefined' && 'BarcodeDetector' in window && !!navigator.mediaDevices?.getUserMedia;
export async function scanCode(host, onCode, onFail) {
  let stream = null, timer = 0, done = false; const box = document.createElement('div'); box.className = 'scanbox';
  const stop = () => { done = true; clearInterval(timer); try { stream?.getTracks().forEach((t) => t.stop()); } catch { /* */ } box.remove(); };
  try {
    const det = new window.BarcodeDetector({ formats: ['qr_code'] });
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
    if (done) return stop;
    box.innerHTML = '<video playsinline muted aria-label="Camera: point it at the square on a postcard"></video><button type="button" class="btn alt small" data-stop>Stop the camera</button>';
    const v = box.querySelector('video'); v.srcObject = stream; host.appendChild(box); box.querySelector('[data-stop]').onclick = stop; await v.play();
    timer = setInterval(async () => { if (done || v.readyState < 2) return; try { const found = await det.detect(v); for (const f of found) { const d = decodeTown(f.rawValue); if (d.ok) { stop(); onCode(d.code); return; } } } catch { /* keep looking */ } }, 300);
  } catch { stop(); onFail?.(); }
  return stop;
}

// ---- the code box used by "Visit a town" and the club wall: type, paste or scan; says at once when a code is good
function codeBox(el, terrain, { junior, button, onGood }) {
  el.innerHTML = `<div class="codein"><label for="towncode">${junior ? 'Town code' : 'Town code'}</label><textarea id="towncode" data-code rows="3" autocomplete="off" autocapitalize="characters" autocorrect="off" spellcheck="false" placeholder="8K2M 0QXT …"></textarea>
    <div class="row"><button type="button" class="btn go" data-use>${esc(button)}</button>${canScan() ? '<button type="button" class="btn alt" data-scan>📷 Scan a postcard</button>' : ''}</div>
    <p class="codemsg" data-msg role="status"></p><div data-scanhost></div></div>`;
  const ta = el.querySelector('[data-code]'), use = el.querySelector('[data-use]'), msg = el.querySelector('[data-msg]'); let good = null;
  const say = (t, cls = '') => { msg.textContent = t; msg.className = 'codemsg ' + cls; };
  const read = (final = false) => {
    const d = decodeTown(ta.value); good = d.ok ? d : null; use.classList.toggle('ready', !!good);
    if (good) { const s = summarize(terrain, d.town); say(`✓ ${s.heading}: town score ${s.total} out of 100${s.medal ? `, ${MEDAL_WORD[s.medal].toLowerCase()} medal` : ''}.`, 'ok'); }
    else if (!cleanCode(ta.value)) say('');
    else if (final || d.why === 'letters' || d.why === 'version') say(whyText(d.why, junior), 'bad');
    else say(`${cleanCode(ta.value).length} characters so far…`);
    return good;
  };
  ta.addEventListener('input', () => read(false)); ta.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); if (read(true)) onGood(good); } });
  use.onclick = () => { if (read(true)) onGood(good); };
  el.querySelector('[data-scan]')?.addEventListener('click', () => scanCode(el.querySelector('[data-scanhost]'), (code) => { ta.value = groupCode(code); if (read(true)) onGood(good); }, () => say(junior ? 'The camera could not be used. Type the code instead.' : 'Camera not available: type the code.', 'bad')));
  return { set(text, final = true) { ta.value = text; read(final); }, focus() { ta.focus(); }, clear() { ta.value = ''; read(false); } };
}

// ---- start-screen cards. card = the start screen's card element; back() redraws the first screen.
export function visitCard(card, terrain, { back, junior = true, prefill = '' }) {
  card.innerHTML = `<span class="chip">👀 VISIT A TOWN</span><h1>Visit a <span>town</span></h1>
    <p class="sub">Type the code from a friend’s postcard, paste it, or scan the square. You can look around, walk the streets and use every lens. You cannot build there, and your own town stays as it is.</p>
    <div data-box></div><div class="row" style="justify-content:center;margin-top:10px"><button class="btn alt" data-vback>← Back</button></div>`;
  card.scrollTop = 0; card.querySelector('[data-vback]').onclick = back;
  const box = codeBox(card.querySelector('[data-box]'), terrain, { junior, button: 'Visit this town ➜', onGood: (d) => go(`?town=${d.code}`) });
  if (prefill) box.set(prefill); setTimeout(() => box.focus(), 60);
}

export function wallCard(card, terrain, { back }) {
  let list = wallLoad(store());
  const draw = (note = '') => {
    const sums = list.map((code) => ({ code, ...summarize(terrain, decodeTown(code).town) }));
    card.innerHTML = `<span class="chip">🧱 CLUB WALL · FOR CLUB LEADERS</span><h1>Our <span>towns</span></h1>
      <p class="sub">Add each group’s town with the code on its postcard. The wall is kept on this device only: nothing is sent anywhere, and there are no names on it. Tap a town to walk around it with the group.</p>
      <div data-box></div>
      <div class="wallgrid" data-grid>${sums.map((s, i) => `<div class="wtown" data-medal="${s.medal || ''}"><button class="wopen" data-open="${s.code}" aria-label="Visit ${esc(s.heading)}, town score ${s.total} out of 100"><canvas class="wmap" data-map="${i}" width="252" height="198"></canvas>
        <b>${esc(s.heading)}</b><em>${s.medal ? MED[s.medal] : '◎'} ${s.total} / 100${s.name ? ` · ${esc(s.title)}` : ''}</em>
        <small><i aria-hidden="true">▲</i> Strongest: ${s.strong.length ? s.strong.map((p) => esc(PART_WORD[p.id])).join(', ') : 'nothing yet'}</small><small><i aria-hidden="true">▼</i> Most to gain: ${s.weak ? esc(PART_WORD[s.weak.id]) : 'nothing: every part is full'}</small></button>
        <button class="btn alt small wremove" data-remove="${s.code}" aria-label="Remove ${esc(s.heading)} from the wall">Remove</button></div>`).join('') || '<p class="wallempty">No towns yet. Ask each group to open ☰ → Town postcard and read out their code, or hold the postcard up to this device’s camera.</p>'}</div>
      <div class="wallprompts"><h2>Three questions for the end of the day</h2><ol>${wallPrompts(sums).map((q) => `<li>${esc(q)}</li>`).join('')}</ol><p>Run it as a town meeting: one group speaks for its evidence, then the others ask. Ask about the town, never about a child’s own home.</p></div>
      <div class="row" style="justify-content:center;margin-top:10px"><button class="btn alt" data-wback>← Back</button>${list.length ? '<button class="btn alt" data-clear>Clear the wall</button>' : ''}<span class="wallcount">${list.length} of ${WALL_MAX} towns</span></div>`;
    sums.forEach((s, i) => drawTownMap(card.querySelector(`[data-map="${i}"]`), terrain, s.cells));
    const box = codeBox(card.querySelector('[data-box]'), terrain, { junior: false, button: '＋ Add to the wall', onGood: (d) => {
      const a = wallAdd(list, d.code);
      if (!a.ok) { box.set(d.code); card.querySelector('[data-msg]').textContent = a.why === 'twice' ? 'That town is already on the wall.' : a.why === 'full' ? `The wall is full (${WALL_MAX} towns). Remove one first.` : whyText(a.why, false); card.querySelector('[data-msg]').className = 'codemsg bad'; return; }
      list = a.list; const kept = wallSave(store(), list); draw(kept ? 'Added.' : 'Added, but this device could not store the wall: it will be empty after a reload.');
    } });
    if (note) { const m = card.querySelector('[data-msg]'); m.textContent = note; m.className = 'codemsg ok'; }
    card.querySelector('[data-wback]').onclick = back;
    card.querySelectorAll('[data-open]').forEach((b) => (b.onclick = () => go(`?town=${b.dataset.open}&from=wall`)));
    card.querySelectorAll('[data-remove]').forEach((b) => (b.onclick = () => { list = wallRemove(list, b.dataset.remove); wallSave(store(), list); draw('Removed.'); }));
    const cl = card.querySelector('[data-clear]'); if (cl) cl.onclick = () => { if (!confirm('Clear the wall? Every town is taken off this device’s wall. The groups keep their own towns.')) return; list = []; wallSave(store(), list); draw('The wall is clear.'); };
  };
  card.scrollTop = 0; draw();
}

// the two lines added to the first screen: "Visit a town" for everyone, and the club wall under "For club leaders"
export function startButtons(scr, terrain, { back, junior = true }) {
  const card = scr.querySelector('.card'); if (!card || card.querySelector('[data-shareopen]')) return;
  const after = card.querySelector('.chopen') || card.querySelector('.ages'); if (!after) return;
  after.insertAdjacentHTML('afterend', '<p class="shareopen" data-shareopen><button class="btn alt" data-visitopen>👀 Visit a town <small>with a code from a friend</small></button></p>');
  const n = wallLoad(store()).length;
  card.insertAdjacentHTML('beforeend', `<p class="leaders"><span>For club leaders:</span> <button class="btn alt small" data-wallopen>🧱 Club wall <small>${n ? `${n} town${n === 1 ? '' : 's'}` : 'show the group’s towns'}</small></button></p>`);
  card.querySelector('[data-visitopen]').onclick = () => visitCard(card, terrain, { back, junior });
  card.querySelector('[data-wallopen]').onclick = () => wallCard(card, terrain, { back });
}
