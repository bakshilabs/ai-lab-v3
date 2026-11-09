// The Star shop (js/game/shop.js) and the finale summary (js/game/finale.js): pure rules, no browser.
import test from 'node:test';
import assert from 'node:assert/strict';
import { SHOP, shopState, spent, wallet, buy, setOn, owns, isOn, needs, canAffordNew, reward } from '../js/game/shop.js';
import { townSummary } from '../js/game/finale.js';
import { SANDBOX } from '../js/game/content.js';
import { makeTerrain } from '../js/world/terrain.js';
import { simulate } from '../js/sim/sim.js';

test('every reward has a cost, an icon and words for both age bands', () => {
  const ids = new Set();
  for (const r of SHOP) {
    assert.ok(r.cost > 0 && Number.isInteger(r.cost), r.id); assert.ok(r.icon, r.id); assert.ok(!ids.has(r.id), 'unique ' + r.id); ids.add(r.id);
    for (const b of ['junior', 'senior']) { const t = SANDBOX[b].shop.items[r.id]; assert.ok(t?.name && t?.desc, `${b} ${r.id}`); }
  }
  for (const b of ['junior', 'senior']) { const T = SANDBOX[b].shop; assert.match(T.buy(3), /3/); assert.match(T.need(2), /2/); assert.match(T.have(5), /5/); assert.ok(SANDBOX[b].finale.title('X').includes('X')); }
});

test('buying spends stars once; the wallet is earned minus spent and never negative', () => {
  let st = shopState(null); assert.deepEqual(st, { owned: [], on: [] });
  assert.equal(wallet(5, st), 5);
  const r = buy(st, 'sunhat', 5); assert.ok(r.ok); st = r.st;
  assert.ok(owns(st, 'sunhat')); assert.ok(isOn(st, 'sunhat'), 'a new reward is switched on'); assert.equal(spent(st), reward('sunhat').cost); assert.equal(wallet(5, st), 5 - reward('sunhat').cost);
  assert.deepEqual(buy(st, 'sunhat', 99).why, 'owned', 'bought once only');
  assert.equal(buy(st, 'fireworks', 5).why, 'stars'); assert.equal(buy(st, 'nope', 99).why, 'unknown');
  assert.equal(needs(5, st, 'fireworks'), reward('fireworks').cost - wallet(5, st));
  assert.equal(wallet(1, st), 0, 'spent more than earned (e.g. an odd save) still shows 0');
});

test('owned rewards toggle on and off; Florence wears one hat at a time', () => {
  let st = buy(shopState(null), 'sunhat', 20).st; st = buy(st, 'crown', 20).st;
  assert.ok(isOn(st, 'crown') && !isOn(st, 'sunhat'), 'the new hat replaces the old one');
  st = setOn(st, 'sunhat'); assert.ok(isOn(st, 'sunhat') && !isOn(st, 'crown'));
  st = setOn(st, 'sunhat'); assert.ok(!isOn(st, 'sunhat'), 'tap again: off'); assert.ok(owns(st, 'sunhat'), 'still owned when off');
  st = buy(st, 'flag', 20).st; st = setOn(st, 'flag', false); assert.ok(!isOn(st, 'flag')); st = setOn(st, 'flag', true); assert.ok(isOn(st, 'flag'));
  assert.deepEqual(setOn(st, 'statue', true).on, st.on, 'cannot switch on something not owned');
});

test('the saved shop state is cleaned on load', () => {
  const st = shopState({ owned: ['sunhat', 'sunhat', 'bogus', 'crown'], on: ['bogus', 'sunhat', 'crown', 'flag'] });
  assert.deepEqual(st.owned, ['sunhat', 'crown']); assert.deepEqual(st.on, ['sunhat'], 'unknown, unowned and a second hat dropped');
  assert.ok(canAffordNew(3, shopState(null))); assert.ok(!canAffordNew(2, shopState(null)));
  assert.ok(!canAffordNew(999, { owned: SHOP.map((r) => r.id), on: [] }), 'nothing new when everything is owned');
});

test('the shop never changes the simulation (rewards are looks only)', () => {
  const terrain = makeTerrain(); const cells = new Map();
  const a = simulate(terrain, cells, {}); const G = { shop: buy(shopState(null), 'statue', 20).st };
  const b = simulate(terrain, cells, {}); assert.deepEqual(JSON.stringify(a), JSON.stringify(b)); assert.ok(G.shop.owned.length);
});

test('finale summary: builds by group, mistakes caught (no double count for replays), habits learned', () => {
  const cells = new Map([['1,1', { mark: 'town', item: 'timber', mods: [] }], ['2,1', { mark: 'town', item: 'timber', mods: ['solar'] }], ['3,1', { mark: null, item: 'orchard', mods: [] }], ['4,1', { mark: 'town', item: null, mods: [] }]]);
  const G = { cells, catches: 2, labs: { land: { stars: 3 }, move: { stars: 2 } }, mistakes: [{ level: 'land', habit: 'one_word' }, { level: 'land', habit: 'one_word' }, { level: 'heart', habit: 'missing', bias: true }] };
  const s = { familiesSafe: 8, title: 'Garden Town' };
  const sum = townSummary(G, s, 7);
  assert.equal(sum.builds, 4, 'two homes, a solar add-on and an orchard; the land mark is not a build');
  assert.equal(sum.groups.homes, 2); assert.equal(sum.groups.food, 1);
  assert.equal(sum.missionMistakes, 2); assert.equal(sum.catches, 2); assert.equal(sum.caught, 4);
  assert.equal(sum.stars, 7); assert.equal(sum.families, 8); assert.equal(sum.missions, 2);
  assert.deepEqual(sum.habits, ['one_word', 'missing', 'typical'], 'habits met first, then the usual habit of each mission done');
});
