// The town code: a whole town as a short text that people type, paste or scan IN THE SAME ROOM.
// Pure (tests/towncode.test.mjs): no DOM, no storage, no network. Nothing a child typed is ever in a code:
// the town's own name travels only when it is one of the fixed start-screen ideas (SHARE_NAMES), otherwise the
// receiving device shows the title the simulation gives the town ("Orchard Square").
//
// Layout of version 1 (bits, most significant first), then written five bits at a time in base 32:
//   version 4 · band 1 (0 = ages 8–12, 1 = ages 13–17) · island layout 5 · score 7 (0–100) · catches 3 (0–5)
//   · name 4 (0 = none, n = SHARE_NAMES[n − 1]) · extras flag 1 [ six signed 9-bit halves: the town-meeting effects ]
//   · number of cells 8 · then each cell, in grid order:
//       gap to the previous cell (Elias gamma; grid index = gz × 16 + gx) · mark 2 · item 6 [ · mods 3, homes only ]
//   · zero padding to a whole character · a 20-bit check (4 characters).
// The alphabet is Crockford's base 32: digits and capitals without I, L, O and U, so no two characters look alike;
// when reading, O counts as 0 and I or L as 1, lower case is fine, and spaces or dashes are ignored.
// A decoded code is re-encoded and must match exactly, so a changed, cut or padded code is refused, never guessed.

export const VERSION = 1;
export const ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
// Start-screen name ideas that may travel (the same list as NAME_IDEAS in content.js; only ever add to the end).
export const SHARE_NAMES = ['Willow Bay', 'Otter Bend', 'Bramble Hill', 'Sunny Hollow', 'Kestrel Cove', 'Meadowmere'];
// Island layouts by number (0 = the first island). A new layout gets the next number; only ever add to the end.
// The names are the values of the game's ?island= parameter.
export const LAYOUTS = ['classic'];
export const MAX_LAYOUT = 31;
// What can stand on a tile, by number (0 = nothing built). Only ever add to the end: old codes must keep their meaning.
export const ITEM_IDS = [null,
  'road', 'carpark', 'path', 'cycle', 'tram', 'bridge',
  'timber', 'straw', 'earth', 'reclaimed', 'cohousing', 'concrete',
  'bigfield', 'mixed', 'orchard', 'allot', 'vertical', 'hives', 'hedge',
  'wind', 'battery', 'raingarden', 'reedbed', 'repair', 'compost',
  'school', 'market', 'park', 'greenbridge', 'hall', 'festival'];
export const HOME_IDS = ['timber', 'straw', 'earth', 'reclaimed', 'cohousing', 'concrete'];
export const MOD_IDS = ['greenroof', 'solar', 'heatpump']; // one bit each, on a home
export const MARK_IDS = [null, 'town', 'wild'];
export const EXTRA_KEYS = ['families', 'carbon', 'winter', 'health', 'community', 'nature'];
export const MAX_CELLS = 160; export const GRID = 16; // a 16 × 16 grid holds every island layout
export const MAX_CHARS = 460;

const ITEM_NO = new Map(ITEM_IDS.map((id, i) => [id, i])); const HOME = new Set(HOME_IDS);
const CHAR_NO = new Map([...ALPHABET].map((c, i) => [c, i]));

// ---- bits
function writer() {
  const bits = [];
  return {
    bits,
    put(v, n) { for (let i = n - 1; i >= 0; i--) bits.push((v >>> i) & 1); },
    gamma(v) { const n = 31 - Math.clz32(v); for (let i = 0; i < n; i++) bits.push(0); this.put(v, n + 1); },
  };
}
function reader(bits) {
  let i = 0;
  return {
    get left() { return bits.length - i; },
    get(n) { if (i + n > bits.length) throw new Error('short'); let v = 0; for (let k = 0; k < n; k++) v = (v << 1) | bits[i++]; return v; },
    gamma() { let n = 0; while (this.get(1) === 0) { if (++n > 9) throw new Error('gap'); } let v = 1; for (let k = 0; k < n; k++) v = (v << 1) | this.get(1); return v; },
  };
}
// a 20-bit check over the characters (FNV-1a, folded): catches typing slips and casual edits. It is not a secret.
function check(symbols) {
  let h = 0x811c9dc5 ^ 0x45c0;
  for (const s of symbols) { h ^= s + 1; h = Math.imul(h, 0x01000193) >>> 0; }
  h ^= symbols.length; h = Math.imul(h, 0x01000193) >>> 0;
  return ((h >>> 20) ^ h) & 0xfffff;
}
const half = (v) => Math.max(-256, Math.min(255, Math.round((Number(v) || 0) * 2)));

// the cells of a town in one fixed form: [{ gx, gz, mark, item, mods }] in grid order, empty tiles left out
export function normalCells(cells) {
  const out = [];
  for (const [k, c] of cells instanceof Map ? cells : new Map(cells || [])) {
    if (!c || (!c.mark && !c.item)) continue;
    const [gx, gz] = String(k).split(',').map(Number);
    out.push({ gx, gz, mark: c.mark || null, item: c.item || null, mods: MOD_IDS.filter((m) => (c.mods || []).includes(m)) });
  }
  return out.sort((a, b) => a.gz * GRID + a.gx - (b.gz * GRID + b.gx));
}

// encodeTown({ cells, band, layout, score, catches, name, extra }) → the code (no spaces), or throws on a town that
// cannot be written (an unknown build, a tile off the grid): callers show "no code" rather than a wrong one.
export function encodeTown(town) {
  const cells = normalCells(town.cells);
  if (cells.length > MAX_CELLS) throw new Error('too many cells');
  const w = writer();
  w.put(VERSION, 4); w.put(town.band === 'senior' ? 1 : 0, 1);
  const layout = Number(town.layout) || 0; if (layout < 0 || layout > MAX_LAYOUT) throw new Error('layout'); w.put(layout, 5);
  w.put(Math.max(0, Math.min(100, Math.round(Number(town.score) || 0))), 7);
  w.put(Math.max(0, Math.min(5, Math.round(Number(town.catches) || 0))), 3);
  w.put(SHARE_NAMES.indexOf(town.name) + 1, 4); // a name that is not on the list is never written
  const ex = EXTRA_KEYS.map((k) => half(town.extra?.[k]));
  if (ex.some(Boolean)) { w.put(1, 1); for (const v of ex) w.put(v & 0x1ff, 9); } else w.put(0, 1);
  w.put(cells.length, 8);
  let prev = -1;
  for (const c of cells) {
    if (!Number.isInteger(c.gx) || !Number.isInteger(c.gz) || c.gx < 0 || c.gz < 0 || c.gx >= GRID || c.gz >= GRID) throw new Error('tile');
    const idx = c.gz * GRID + c.gx; if (idx <= prev) throw new Error('tile twice');
    const mark = MARK_IDS.indexOf(c.mark); const item = ITEM_NO.get(c.item);
    if (mark < 0 || item == null) throw new Error('unknown build');
    if (c.mods.length && !HOME.has(c.item)) throw new Error('mods');
    w.gamma(idx - prev); prev = idx; w.put(mark, 2); w.put(item, 6);
    if (HOME.has(c.item)) w.put(MOD_IDS.reduce((a, m, i) => a | (c.mods.includes(m) ? 1 << i : 0), 0), 3);
  }
  while (w.bits.length % 5) w.bits.push(0);
  const sym = []; for (let i = 0; i < w.bits.length; i += 5) sym.push(w.bits.slice(i, i + 5).reduce((a, b) => (a << 1) | b, 0));
  const ck = check(sym); for (let s = 15; s >= 0; s -= 5) sym.push((ck >>> s) & 31);
  return sym.map((s) => ALPHABET[s]).join('');
}

// what a person typed or pasted, or what a QR code or link held → the bare code in capitals ('' if there is none)
export function cleanCode(text) {
  let t = String(text ?? '');
  const m = /[?&#]town=([^&#\s]*)/i.exec(t); if (m) { try { t = decodeURIComponent(m[1]); } catch { t = m[1]; } }
  return t.toUpperCase().replace(/[\s\-_.·]/g, '').replace(/O/g, '0').replace(/[IL]/g, '1');
}
// in fours, for reading aloud and typing: "8K2M 0QXT …"
export const groupCode = (code, n = 4) => (String(code).match(new RegExp(`.{1,${n}}`, 'g')) || []).join(' ');

// decodeTown(text) → { ok: true, town: { version, band, layout, score, catches, name, extra, cells: Map }, code }
// or { ok: false, why }. Never throws.
export function decodeTown(text) {
  try {
    const code = cleanCode(text);
    if (!code) return { ok: false, why: 'empty' };
    if (code.length > MAX_CHARS) return { ok: false, why: 'long' };
    if (code.length < 11) return { ok: false, why: 'short' };
    const sym = []; for (const ch of code) { const v = CHAR_NO.get(ch); if (v == null) return { ok: false, why: 'letters' }; sym.push(v); }
    const body = sym.slice(0, -4); const ck = sym.slice(-4).reduce((a, s) => (a << 5) | s, 0);
    if (check(body) !== ck) return { ok: false, why: 'check' };
    const bits = []; for (const s of body) for (let i = 4; i >= 0; i--) bits.push((s >>> i) & 1);
    const r = reader(bits);
    const version = r.get(4); if (version !== VERSION) return { ok: false, why: 'version' };
    const band = r.get(1) ? 'senior' : 'junior'; const layout = r.get(5);
    const score = r.get(7); const catches = r.get(3); const nameNo = r.get(4);
    if (score > 100 || catches > 5 || nameNo > SHARE_NAMES.length) return { ok: false, why: 'range' };
    const extra = {}; if (r.get(1)) for (const k of EXTRA_KEYS) { const v = r.get(9); extra[k] = (v & 0x100 ? v - 0x200 : v) / 2; }
    const n = r.get(8); const cells = new Map(); let prev = -1;
    for (let i = 0; i < n; i++) {
      const idx = prev + r.gamma(); if (idx >= GRID * GRID) return { ok: false, why: 'range' }; prev = idx;
      const mark = MARK_IDS[r.get(2)]; const item = ITEM_IDS[r.get(6)];
      if (mark === undefined || item === undefined || (!mark && !item)) return { ok: false, why: 'range' };
      const mods = []; if (HOME.has(item)) { const b = r.get(3); MOD_IDS.forEach((m, j) => { if (b & (1 << j)) mods.push(m); }); }
      cells.set(`${idx % GRID},${Math.floor(idx / GRID)}`, { mark, item, mods });
    }
    const town = { version, band, layout, score, catches, name: nameNo ? SHARE_NAMES[nameNo - 1] : null, extra, cells };
    // one town, one code: anything that does not write back to exactly the same characters is refused
    if (encodeTown(town) !== code) return { ok: false, why: 'form' };
    return { ok: true, town, code };
  } catch { return { ok: false, why: 'broken' }; }
}

// a sentence for the player, for each way a code can be wrong
export function whyText(why, junior = true) {
  if (why === 'empty') return junior ? 'Type or paste a town code first.' : 'Enter a town code first.';
  if (why === 'version') return junior ? 'That code is from a newer Eco Town. Ask a grown-up to update the game.' : 'That code was made by a newer version of Eco Town.';
  if (why === 'letters') return junior ? 'A town code only has numbers and capital letters. Check it and try again.' : 'A town code uses digits and capital letters only.';
  if (why === 'short') return junior ? 'That code is too short. Is some of it missing?' : 'That code is too short: part of it is missing.';
  return junior ? 'That code does not add up. Check each group of four and try again.' : 'That code fails its check. Compare it group by group and try again.';
}
