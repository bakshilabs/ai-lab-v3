// The town code: any valid town comes back exactly, a bad code is refused without an error, real towns give codes
// of a known length, and nothing a player typed can travel in one.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeTerrain } from '../js/world/terrain.js';
import { ITEMS } from '../js/world/catalog.js';
import { NAME_IDEAS } from '../js/game/content.js';
import { planPlace } from '../js/game/replace.js';
import { encodeTown, decodeTown, cleanCode, groupCode, normalCells, whyText, ALPHABET, ITEM_IDS, HOME_IDS, MOD_IDS, SHARE_NAMES, EXTRA_KEYS, MAX_CHARS, MAX_CELLS, GRID } from '../js/game/towncode.js';
import { shareCode, summarize, sanitize, wallAdd, wallRemove, wallLoad, wallSave, wallPrompts, layoutOf, WALL_KEY, WALL_MAX } from '../js/game/townshare.js';

const terrain = makeTerrain(); const tiles = [...terrain.tiles.values()];
// a small seeded generator, so a failure can be repeated
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const BUILDS = ITEM_IDS.filter(Boolean);
function randomTown(r, { onIsland = true, max = 150 } = {}) {
  const n = Math.floor(r() * (max + 1)); const cells = new Map();
  const spots = onIsland ? tiles.map((t) => t.k) : Array.from({ length: GRID * GRID }, (_, i) => `${i % GRID},${Math.floor(i / GRID)}`);
  for (let i = 0; i < n && spots.length; i++) {
    const k = spots.splice(Math.floor(r() * spots.length), 1)[0];
    const item = r() < 0.25 ? null : BUILDS[Math.floor(r() * BUILDS.length)];
    const mark = item ? [null, 'town', 'town', 'wild'][Math.floor(r() * 4)] : ['town', 'wild'][Math.floor(r() * 2)];
    const mods = HOME_IDS.includes(item) ? MOD_IDS.filter(() => r() < 0.3) : [];
    cells.set(k, { mark, item, mods });
  }
  const extra = r() < 0.3 ? Object.fromEntries(EXTRA_KEYS.map((k) => [k, Math.round((r() * 80 - 20)) / 2])) : {};
  return { cells, band: r() < 0.5 ? 'junior' : 'senior', layout: r() < 0.8 ? 0 : Math.floor(r() * 32), score: Math.floor(r() * 101), catches: Math.floor(r() * 6), name: r() < 0.5 ? null : SHARE_NAMES[Math.floor(r() * SHARE_NAMES.length)], extra };
}
const same = (a, b) => {
  assert.equal(b.band, a.band); assert.equal(b.layout, a.layout); assert.equal(b.score, a.score); assert.equal(b.catches, a.catches); assert.equal(b.name, a.name);
  for (const k of EXTRA_KEYS) assert.equal(b.extra[k] || 0, a.extra[k] || 0, k);
  assert.deepEqual(normalCells(b.cells), normalCells(a.cells));
};
// a real town built by a recipe on the real island, like the challenge tests: [tool, how many, zones]
const empty = { mark: null, item: null, mods: [], locked: false }; const D = ['slope', 'field'];
function build(recipe) {
  const cells = new Map(); const slope = tiles.filter((t) => t.zone === 'slope' && !t.fixed);
  const c0 = { gx: slope.reduce((a, t) => a + t.gx, 0) / slope.length, gz: slope.reduce((a, t) => a + t.gz, 0) / slope.length };
  const dist = (a, b) => Math.hypot(a.gx - b.gx, a.gz - b.gz);
  for (const [tool, n, zones] of recipe) { let left = n; const it = ITEMS[tool];
    for (const t of [...tiles].sort((a, b) => dist(a, c0) - dist(b, c0))) { if (!left) break; if (t.fixed) continue; const c = cells.get(t.k) || empty;
      if (it.kind === 'mod') { if (!c.item || !ITEMS[c.item].home) continue; } else if (c.item || c.mark || !zones.includes(t.zone)) continue;
      const r = planPlace(tool, t, c); if (!r.cell) continue; cells.set(t.k, r.cell); left--; }
    assert.equal(left, 0, `no room for ${tool}`); }
  return cells;
}
const TOWNS = {
  'a first town (10 homes, school, farms, wind)': [['timber', 10, D], ['school', 1, D], ['market', 1, D], ['hall', 1, D], ['path', 3, D], ['park', 1, D], ['mixed', 3, ['field']], ['wind', 3, ['field', 'coast']], ['battery', 2, D]],
  'a full town (14 homes with heat pumps, 24 other builds)': [['straw', 14, D], ['heatpump', 14], ['school', 1, D], ['market', 1, D], ['hall', 1, D], ['path', 3, D], ['park', 1, D], ['repair', 2, D], ['mixed', 3, ['field']], ['wind', 3, ['field', 'coast']], ['battery', 5, D], ['hedge', 4, ['field']]],
  'a big town (homes with add-ons, routes, farms, wild land)': [['cohousing', 12, D], ['heatpump', 12], ['greenroof', 8], ['school', 1, D], ['market', 1, D], ['hall', 1, D], ['path', 4, D], ['cycle', 2, D], ['park', 2, D], ['repair', 2, D], ['mixed', 4, ['field']], ['orchard', 3, ['field']], ['hives', 2, ['field']], ['wind', 4, ['field', 'coast']], ['battery', 4, D], ['town', 4, ['meadow']], ['wild', 6, ['meadow', 'wetland']]],
};

test('the catalogue and the code agree: every build has a number, homes and add-ons match', () => {
  for (const [id, it] of Object.entries(ITEMS)) {
    if (it.kind === 'build') assert.ok(ITEM_IDS.includes(id), `${id} has no number in towncode.js (add it at the END of ITEM_IDS)`);
    if (it.kind === 'mod') assert.ok(MOD_IDS.includes(id), `${id} is a home add-on with no bit in towncode.js`);
    assert.equal(HOME_IDS.includes(id), !!it.home, id);
  }
  for (const id of BUILDS) assert.equal(ITEMS[id]?.kind, 'build', id);
  assert.ok(ITEM_IDS.length <= 64); assert.equal(new Set(ITEM_IDS).size, ITEM_IDS.length);
  assert.deepEqual(NAME_IDEAS.slice(0, SHARE_NAMES.length), SHARE_NAMES, 'SHARE_NAMES must start like NAME_IDEAS');
  assert.equal(ALPHABET.length, 32); assert.equal(new Set(ALPHABET).size, 32); for (const c of 'ILOU') assert.ok(!ALPHABET.includes(c));
});

test('2,000 random valid towns come back exactly', () => {
  const r = rng(20261111);
  for (let i = 0; i < 2000; i++) {
    const t = randomTown(r, { onIsland: i % 4 !== 0 }); const code = encodeTown(t);
    assert.match(code, /^[0-9A-HJKMNP-TV-Z]+$/); assert.ok(code.length <= MAX_CHARS, `town ${i}: ${code.length} characters`);
    const d = decodeTown(code); assert.ok(d.ok, `town ${i}: ${d.why}`); assert.equal(d.code, code); same(t, d.town);
    // the same town typed with spaces, lower case and look-alike letters
    const typed = groupCode(code).toLowerCase().replace(/0/g, 'o').replace(/1/g, i % 2 ? 'l' : 'I');
    const d2 = decodeTown(typed); assert.ok(d2.ok); assert.equal(d2.code, code);
  }
});

test('an empty island has a short code, and the fullest town still fits the limit', () => {
  const e = encodeTown({ cells: new Map(), band: 'junior' }); assert.equal(e.length, 11); assert.ok(decodeTown(e).ok); assert.equal(decodeTown(e).town.cells.size, 0);
  // every tile of the island a home with all three add-ons, and the town-meeting effects: the longest a real town can be
  const cells = new Map(tiles.map((t) => [t.k, { mark: 'town', item: 'concrete', mods: [...MOD_IDS] }]));
  const full = encodeTown({ cells, band: 'senior', layout: 31, score: 100, catches: 5, name: SHARE_NAMES[5], extra: Object.fromEntries(EXTRA_KEYS.map((k) => [k, -100])) });
  assert.ok(full.length <= MAX_CHARS, `${full.length}`); assert.ok(decodeTown(full).ok);
  assert.ok(tiles.length <= MAX_CELLS);
  // the worst spread of the most cells the format allows
  const worst = new Map(); for (let i = 0; worst.size < MAX_CELLS; i += worst.size < 96 ? 2 : 1) worst.set(`${i % GRID},${Math.floor(i / GRID)}`, { mark: 'town', item: 'timber', mods: [...MOD_IDS] });
  const w = encodeTown({ cells: worst, band: 'junior', extra: { carbon: 1 } }); assert.ok(w.length <= MAX_CHARS, `${w.length}`); assert.ok(decodeTown(w).ok);
  assert.throws(() => encodeTown({ cells: new Map(Array.from({ length: MAX_CELLS + 1 }, (_, i) => [`${i % GRID},${Math.floor(i / GRID)}`, { mark: 'town', item: null, mods: [] }])), band: 'junior' }));
});

test('real towns: the code length is what the guide says (about 70 to 125 characters, 18 to 31 groups of four)', () => {
  const lens = {};
  for (const [name, recipe] of Object.entries(TOWNS)) {
    const cells = build(recipe); const code = shareCode(terrain, { cells, band: 'junior', catches: 2, townName: 'Otter Bend' });
    const d = decodeTown(code); assert.ok(d.ok); assert.deepEqual(normalCells(d.town.cells), normalCells(cells));
    lens[name] = { cells: cells.size, chars: code.length, bitsPerCell: +((code.length - 11) * 5 / cells.size).toFixed(1) };
  }
  console.log('town code lengths:', JSON.stringify(lens));
  const v = Object.values(lens).map((x) => x.chars);
  assert.ok(v[0] <= 75, `first town ${v[0]}`); assert.ok(v[1] <= 105, `full town ${v[1]}`); assert.ok(v[2] <= 140, `big town ${v[2]}`);
  for (const x of Object.values(lens)) assert.ok(x.bitsPerCell <= 12.5, JSON.stringify(x));
});

test('a changed, cut, padded or made-up code is refused, and nothing throws', () => {
  const r = rng(7); let refused = 0, tried = 0;
  for (let i = 0; i < 300; i++) {
    const code = encodeTown(randomTown(r, { max: 60 }));
    // one character changed, anywhere
    for (let j = 0; j < 6; j++) { const at = Math.floor(r() * code.length); let ch; do { ch = ALPHABET[Math.floor(r() * 32)]; } while (ch === code[at]);
      const bad = code.slice(0, at) + ch + code.slice(at + 1); tried++; const d = decodeTown(bad); if (!d.ok) refused++; else assert.notEqual(d.code, code); }
    // two neighbours swapped, the end cut off, a character added
    const at = Math.floor(r() * (code.length - 1)); if (code[at] !== code[at + 1]) { tried++; if (!decodeTown(code.slice(0, at) + code[at + 1] + code[at] + code.slice(at + 2)).ok) refused++; }
    tried += 3; if (!decodeTown(code.slice(0, -1)).ok) refused++; if (!decodeTown(code.slice(1)).ok) refused++; if (!decodeTown(code + ALPHABET[Math.floor(r() * 32)]).ok) refused++;
  }
  // a 20-bit check lets about one slip in a million through; in these few thousand tries, none
  assert.equal(refused, tried, `${tried - refused} of ${tried} bad codes were accepted`);
  for (const junk of ['', ' ', null, undefined, 42, {}, [], 'hello', 'U'.repeat(40), '0'.repeat(11), 'Z'.repeat(500), '🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂', '<script>alert(1)</script>', 'https://example.org/?town=', '?town=%E0%A4%A', 'AAAA AAAA AAAA']) {
    const d = decodeTown(junk); assert.equal(d.ok, false, String(junk)); assert.ok(d.why); assert.ok(whyText(d.why, true)); assert.ok(whyText(d.why, false));
  }
  // random strings of the right alphabet
  for (let i = 0; i < 3000; i++) { const s = Array.from({ length: 11 + Math.floor(r() * 80) }, () => ALPHABET[Math.floor(r() * 32)]).join(''); assert.equal(decodeTown(s).ok, false); }
});

test('a code with a valid check but an impossible inside is still refused (a newer version, a build that does not exist)', () => {
  // made the way a tamperer would: keep the format, change the body, recompute nothing → refused by the check;
  // and a version this game does not know is refused by name
  const code = encodeTown({ cells: new Map([['5,5', { mark: 'town', item: 'timber', mods: [] }]]), band: 'junior' });
  assert.equal(decodeTown(code).ok, true);
  assert.equal(decodeTown('1' + code.slice(1)).ok, false);
  assert.throws(() => encodeTown({ cells: new Map([['5,5', { mark: 'town', item: 'castle', mods: [] }]]), band: 'junior' }));
  assert.throws(() => encodeTown({ cells: new Map([['99,5', { mark: 'town', item: null, mods: [] }]]), band: 'junior' }));
  assert.throws(() => encodeTown({ cells: new Map([['5,5', { mark: null, item: 'wind', mods: ['solar'] }]]), band: 'junior' }));
});

test('a link or a scanned QR code gives the same code as typing it', () => {
  const code = encodeTown(randomTown(rng(3), { max: 40 }));
  for (const t of [`https://example.org/game/index.html?town=${code}`, `index.html?wall=1&town=${code}&from=wall`, `http://localhost:8773/#town=${code}`, groupCode(code), code.match(/.{1,4}/g).join('-'), `  ${code.toLowerCase()}\n`]) assert.equal(cleanCode(t), code, t);
  assert.equal(groupCode('ABCDEFGHJ'), 'ABCD EFGH J');
});

test('safeguarding: a typed town name never travels, only a start-screen idea or the simulation’s own title', () => {
  const cells = build(TOWNS['a first town (10 homes, school, farms, wind)']);
  const typed = shareCode(terrain, { cells, band: 'junior', townName: 'Maya Smith 07700 900123' });
  const d = decodeTown(typed); assert.equal(d.town.name, null);
  const sum = summarize(terrain, d.town); assert.equal(sum.heading, sum.title); assert.match(sum.title, /^[A-Z][a-z]+( [A-Z][a-z]+){1,2}$/);
  // the same town with the same numbers gives the same code whatever it was called
  assert.equal(shareCode(terrain, { cells, band: 'junior', townName: 'Another Secret Name' }), typed);
  const idea = decodeTown(shareCode(terrain, { cells, band: 'junior', townName: 'Kestrel Cove' })); assert.equal(idea.town.name, 'Kestrel Cove'); assert.equal(summarize(terrain, idea.town).heading, 'Kestrel Cove');
  // nothing else about the player is in a town: only these fields exist
  assert.deepEqual(Object.keys(d.town).sort(), ['band', 'catches', 'cells', 'extra', 'layout', 'name', 'score', 'version']);
});

test('the visiting device works the town out again: same score, goals and title as the builder’s device', () => {
  const cells = build(TOWNS['a full town (14 homes with heat pumps, 24 other builds)']);
  const mine = summarize(terrain, { cells, band: 'senior', layout: 0, catches: 3, extra: { carbon: 20, winter: 6 } });
  const d = decodeTown(shareCode(terrain, { cells, band: 'senior', catches: 3, extra: { carbon: 20, winter: 6 } })); assert.ok(d.ok);
  const theirs = summarize(terrain, d.town);
  assert.equal(d.town.score, mine.total); assert.equal(theirs.total, mine.total); assert.equal(theirs.medal, mine.medal); assert.equal(theirs.title, mine.title);
  assert.deepEqual(theirs.goals, mine.goals); assert.deepEqual(theirs.score.parts, mine.score.parts);
  assert.equal(theirs.strong.length, 2); assert.ok(theirs.strong[0].share >= theirs.strong[1].share); if (theirs.weak) assert.ok(theirs.weak.share <= theirs.strong[1].share);
  assert.ok(!theirs.strong.some((p) => p.id === 'catches'));
  // a town from an island this device does not have keeps the score its own device worked out
  const other = summarize(terrain, { ...d.town, layout: 7, score: 12 }); assert.equal(other.sameIsland, false); assert.equal(other.total, 12); assert.equal(other.medal, null);
  assert.equal(layoutOf(terrain), 0);
  // tiles that are not on this island, or hold its fixed buildings, are dropped rather than shown
  const odd = new Map([['15,15', { mark: 'town', item: 'timber', mods: [] }], [terrain.school, { mark: 'town', item: 'timber', mods: [] }], ...cells]);
  assert.equal(sanitize(terrain, odd).size, cells.size);
});

test('the club wall: codes only, on one device; no doubles, a limit, remove and clear', () => {
  const store = { m: {}, getItem(k) { return this.m[k] ?? null; }, setItem(k, v) { this.m[k] = String(v); } };
  assert.deepEqual(wallLoad(store), []);
  const r = rng(11); const codes = Array.from({ length: 5 }, () => encodeTown(randomTown(r, { max: 30 })));
  let list = [];
  for (const c of codes) { const a = wallAdd(list, groupCode(c).toLowerCase()); assert.ok(a.ok); list = a.list; }
  assert.equal(wallAdd(list, codes[2]).why, 'twice'); assert.equal(wallAdd(list, 'NOPE').ok, false);
  assert.ok(wallSave(store, list)); assert.deepEqual(wallLoad(store), codes);
  assert.deepEqual(Object.keys(store.m), [WALL_KEY]); assert.deepEqual(JSON.parse(store.m[WALL_KEY]), codes, 'the wall stores the codes and nothing else');
  list = wallRemove(list, codes[0]); assert.equal(list.length, 4); assert.ok(!list.includes(codes[0]));
  // a damaged record is ignored, never an error
  store.m[WALL_KEY] = '{"not":"a list"}'; assert.deepEqual(wallLoad(store), []); store.m[WALL_KEY] = 'x['; assert.deepEqual(wallLoad(store), []);
  store.m[WALL_KEY] = JSON.stringify([codes[1], 'BROKEN', 7, codes[3]]); assert.deepEqual(wallLoad(store), [codes[1], codes[3]]);
  let big = []; const r2 = rng(5); while (big.length < WALL_MAX) { const a = wallAdd(big, encodeTown(randomTown(r2, { max: 20 }))); if (a.ok) big = a.list; }
  assert.equal(wallAdd(big, codes[0]).why, 'full');
  // three questions, with or without towns
  assert.equal(wallPrompts([]).length, 3);
  const sums = Object.values(TOWNS).map((rec) => summarize(terrain, { cells: build(rec), band: 'junior', layout: 0 }));
  const p = wallPrompts(sums); assert.equal(p.length, 3); for (const q of p) { assert.ok(q.includes('?')); assert.ok(q.length < 240); }
});
