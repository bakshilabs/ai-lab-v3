// The club passport: points and ranks from the device record. Every rank can be reached, the top rank takes
// most of the challenges, and the tip always points at something not done yet.
import test from 'node:test'; import assert from 'node:assert/strict';
import { passport, RANKS, MISSION_STARS } from '../js/game/passport.js';
import { CHALLENGES } from '../js/game/challenges.js';

const all = (medal) => Object.fromEntries(CHALLENGES.map((c) => [c.id, { medal, score: 80 }]));
// the seven home-island challenges alone (the six island challenges, stage 3, are further ways to the top ranks)
const home7 = (medal) => Object.fromEntries(CHALLENGES.filter((c) => !c.island).map((c) => [c.id, { medal, score: 80 }]));
test('a new device is a Helper with no points, pointed at the missions', () => {
  const p = passport({}, 'junior'); assert.equal(p.points, 0); assert.equal(p.rank.name, 'Helper'); assert.equal(p.next.name, 'Builder'); assert.equal(p.next.need, 8); assert.equal(p.tip.id, 'missions');
  assert.equal(p.challenges.length, CHALLENGES.length); assert.ok(p.challenges.every((c) => !c.medal));
});
test('the town and its missions alone reach Planner, not the top ranks', () => {
  const p = passport({ junior: { score: 78, medal: 'silver', town: 'Bramble Hill' }, me: { junior: { stars: 14, complete: true, catches: 2 } } }, 'junior');
  assert.equal(p.points, 14 + 5 + 4 + 2); assert.equal(p.rank.name, 'Planner'); assert.equal(p.tip.id, 'challenge');
  const best = passport({ junior: { score: 95, medal: 'gold' }, me: { junior: { stars: 99, complete: true, catches: 99 } } }, 'junior');
  assert.equal(best.points, MISSION_STARS + 5 + 6 + 5); assert.equal(best.rank.name, 'Town Planner', 'without a challenge the top two ranks stay out of reach');
});
test('every rank can be reached, and Chief Planner takes most challenges at silver or better', () => {
  const base = { junior: { score: 78, medal: 'silver' }, me: { junior: { stars: 15, complete: true, catches: 3 } } };
  const bronze = passport({ ...base, ch: { junior: home7('bronze') } }, 'junior'); assert.equal(bronze.rank.name, 'Town Planner'); assert.equal(bronze.tip.id, 'challenge'); assert.equal(passport({ ...base, ch: { junior: all('bronze') } }, 'junior').tip.id, 'higher');
  assert.equal(CHALLENGES.filter((c) => !c.island).length, 7); assert.equal(passport({ ...base, ch: { junior: home7('silver') } }, 'junior').rank.name, 'Town Planner', 'the seven home challenges at silver are not enough for Master');
  const silver = passport({ ...base, ch: { junior: all('silver') } }, 'junior'); assert.equal(silver.rank.name, 'Master Planner'); assert.ok(silver.points < 100, 'all thirteen at silver with an average town are just short of Chief');
  const top = passport({ junior: { score: 92, medal: 'gold' }, me: { junior: { stars: 19, complete: true, catches: 5 } }, ch: { junior: all('gold') } }, 'junior');
  assert.equal(top.points, top.max); assert.equal(top.rank.name, 'Chief Planner'); assert.equal(top.next, null); assert.equal(top.tip.id, 'done'); assert.equal(top.medals.gold, CHALLENGES.length);
  assert.ok(RANKS.at(-1).at <= top.max); for (let i = 1; i < RANKS.length; i++) assert.ok(RANKS[i].at > RANKS[i - 1].at);
});
test('the two ages are kept apart, and odd records do no harm', () => {
  const dev = { junior: { score: 80, medal: 'silver' }, me: { junior: { stars: 10 } }, ch: { senior: all('gold'), junior: { nope: { medal: 'gold' } } } };
  assert.equal(passport(dev, 'junior').points, 14); assert.equal(passport(dev, 'senior').points, CHALLENGES.length * 8);
  assert.equal(passport({ me: { junior: { stars: -4, catches: 'x' } } }, 'junior').points, 0);
});
