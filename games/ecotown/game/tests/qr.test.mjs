// The QR code maker (js/game/qr.js): a known answer, the structure every reader needs, and room for a town code.
// (During development every version and both levels were also read back with a separate QR reader.)
import test from 'node:test'; import assert from 'node:assert/strict';
import { qrMatrix, bytesSeg, alnumSeg, isAlnum } from '../js/game/qr.js';
import { ALPHABET } from '../js/game/towncode.js';

const show = (m) => m.rows.map((r) => r.map((b) => (b ? '#' : '.')).join(''));
// "ECO TOWN" at level M: this picture was read back correctly by an independent reader
const KNOWN = ['#######..##...#######', '#.....#.#.....#.....#', '#.###.#..##.#.#.###.#', '#.###.#...#.#.#.###.#', '#.###.#.##.##.#.###.#', '#.....#..###..#.....#', '#######.#.#.#.#######', '..........#..........', '#.#.#.#...#.#...#..#.', '#....#..#.##.#.#.####', '.######.#..#.###..#.#', '...###.##.####.#####.', '#....####.##.###.#...', '........#.#...##.####', '#######..##.#...###.#', '#.....#.......##...#.', '#.###.#.#...#.#...###', '#.###.#...##.#..#.##.', '#.###.#.####.##...#.#', '#.....#..#.###.....##', '#######.##.#.###....#'];

test('a known answer: "ECO TOWN" at level M', () => {
  const m = qrMatrix('ECO TOWN', { ecl: 'M' }); assert.equal(m.version, 1); assert.equal(m.size, 21); assert.deepEqual(show(m), KNOWN);
});
test('every version has its finder corners, timing lines and dark square', () => {
  const finder = ['#######', '#.....#', '#.###.#', '#.###.#', '#.###.#', '#.....#', '#######'];
  for (let v = 1; v <= 40; v++) for (const ecl of ['L', 'M']) {
    const m = qrMatrix('TOWN', { ecl, boost: false, minVersion: v }); assert.equal(m.version, v); const n = m.size; assert.equal(n, 17 + 4 * v); const s = show(m);
    for (const [x0, y0] of [[0, 0], [n - 7, 0], [0, n - 7]]) for (let y = 0; y < 7; y++) assert.equal(s[y0 + y].slice(x0, x0 + 7), finder[y], `v${v} finder`);
    for (let i = 8; i < n - 8; i++) { assert.equal(m.rows[6][i], i % 2 === 0); assert.equal(m.rows[i][6], i % 2 === 0); }
    assert.equal(m.rows[n - 8][8], true);
  }
});
test('a town code fits a small QR code, on its own or behind the game’s address', () => {
  const code = Array.from({ length: 130 }, (_, i) => ALPHABET[(i * 7) % 32]).join(''); assert.ok(isAlnum(code));
  const bare = qrMatrix(code); assert.ok(bare.version <= 6, `v${bare.version}`);
  const link = qrMatrix([bytesSeg('https://ecotown.deltaops.workers.dev/index.html?town='), alnumSeg(code)]); assert.ok(link.version <= 9, `v${link.version}`);
  const asBytes = qrMatrix('https://ecotown.deltaops.workers.dev/index.html?town=' + code.toLowerCase()); assert.ok(asBytes.version >= link.version);
  assert.equal(qrMatrix('x'.repeat(5000)), null); assert.equal(qrMatrix([alnumSeg('lower case')]), null);
  assert.equal(qrMatrix('').version, 1);
});
