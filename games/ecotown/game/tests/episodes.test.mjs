// The story episodes: every mission has an opening and a closing film, each with a script, captions and its
// files listed in videos/episodes/index.json; the scripts stay honest (their numbers are the simulation's) and
// an opening never gives the mission's answer away.
import test from 'node:test'; import assert from 'node:assert/strict';
import fs from 'node:fs'; import path from 'node:path';
import { EPISODES, MISSIONS, CAST, schedule, vtt, episode, episodeOpen, sayText } from '../js/game/episodes.js';
import { LEVEL_ORDER } from '../js/game/levels.js';
import { makeTerrain } from '../js/world/terrain.js';
import { plan, applyPlacements } from '../js/sim/planner.js';
import { simulate } from '../js/sim/sim.js';
import { seedTo } from '../js/game/seed.js';
import { TARGETS, ITEMS } from '../js/world/catalog.js';

const dir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'videos', 'episodes');
const index = JSON.parse(fs.readFileSync(path.join(dir, 'index.json'), 'utf8'));
const durs = JSON.parse(fs.readFileSync(path.join(dir, 'timing.json'), 'utf8'));
const lines = (ep) => ep.shots.flatMap((s) => s.beats).filter((b) => b.say);

test('every mission has an opening and a closing episode', () => {
  assert.deepEqual(MISSIONS, LEVEL_ORDER);
  assert.equal(EPISODES.length, 12);
  for (const m of LEVEL_ORDER) for (const kind of ['open', 'close']) {
    const ep = episode(`${m}-${kind}`); assert.ok(ep, `${m}-${kind}`);
    assert.equal(ep.mission, m); assert.equal(ep.kind, kind); assert.equal(ep.n, LEVEL_ORDER.indexOf(m) + 1);
    assert.ok(ep.title && ep.learn.eco && ep.learn.ai && /LAB-GUIDE\.md/.test(ep.learn.from), `${ep.id}: title and learning point with its source`);
  }
});

test('each episode has a script, a camera for every shot and a closing card', () => {
  for (const ep of EPISODES) {
    const ls = lines(ep); assert.ok(ls.length >= 5 && ls.length <= 10, `${ep.id}: ${ls.length} lines`);
    for (const sh of ep.shots) { assert.ok(sh.cam && sh.cam.look && sh.cam.dist > 10, `${ep.id}: camera`); assert.ok(sh.desc, `${ep.id}: every shot is described for the storyboard`); }
    for (const b of ls) {
      assert.ok(CAST[b.who]?.voice, `${ep.id}: ${b.who} has a voice`);
      // reading age about 8: short sentences, no long words piled up
      for (const s of b.say.split(/(?<=[.!?])\s+/)) assert.ok(s.split(/\s+/).length <= 16, `${ep.id}: sentence too long: ${s}`);
      assert.ok(!/[–—;]/.test(b.say), `${ep.id}: plain punctuation: ${b.say}`);
    }
    assert.ok(ls.some((b) => b.who === 'florence') && ls.some((b) => b.who === 'narrator'), `${ep.id}: Florence and the narrator both speak`);
    if (ep.kind === 'open') { assert.ok(/\?$/.test(ep.card.ask), `${ep.id}: an opening ends on a question`); assert.ok(/\?/.test(ls[ls.length - 1].say + ls[ls.length - 2].say), `${ep.id}: the last lines ask it`); }
    else assert.ok(ep.card.eco && ep.card.ai, `${ep.id}: a closing names the eco idea and the AI habit`);
    const cards = ep.shots.flatMap((s) => s.beats).flatMap((b) => b.do || []).filter((a) => a[0] === 'card'); assert.equal(cards.length, 1, `${ep.id}: one closing card`);
  }
});

test('an opening shows Florence sure of herself and never gives the answer away', () => {
  for (const ep of EPISODES.filter((e) => e.kind === 'open')) {
    const acts = ep.shots.flatMap((s) => s.beats).flatMap((b) => b.do || []);
    assert.ok(acts.some((a) => a[0] === 'pill' && /% sure/.test(a[2])), `${ep.id}: Florence says how sure she is`);
    assert.ok(!acts.some((a) => ['lens', 'flood', 'lights', 'reset'].includes(a[0])), `${ep.id}: no lens, test or fix in an opening`);
    assert.ok(!ep.plans.clear, `${ep.id}: the clear plan is not in an opening`);
    const closing = episode(`${ep.mission}-close`); const acts2 = closing.shots.flatMap((s) => s.beats).flatMap((b) => b.do || []);
    assert.ok(acts2.some((a) => a[0] === 'fl' && a[1] === 'oops'), `${closing.id}: Florence owns the mistake`);
    assert.ok(acts2.some((a) => a[0] === 'reset') && closing.plans.clear, `${closing.id}: the plan is fixed`);
  }
});

test('the films say only what the simulation says', () => {
  const terrain = makeTerrain();
  const sims = (ep) => { const base = seedTo(terrain, ep.setup.seed); const out = {}; for (const [name, [level, slots, numbers]] of Object.entries(ep.plans)) { const after = applyPlacements(base, plan(level, slots, { terrain, cells: base, numbers: numbers || { minutes: 10 } }).placements); out[name] = { s: simulate(terrain, after), after }; } return out; };
  const text = (id) => lines(episode(id)).map((b) => b.say).join(' ');
  // land: the "best" land is the flood meadow; the clear plan keeps the town off it
  { const { flawed, clear } = sims(episode('land-close')); const wet = (m) => [...m.after].filter(([k, c]) => c.mark === 'town' && ['meadow', 'wetland'].includes(terrain.tiles.get(k).zone)).length; assert.ok(wet(flawed) >= 10); assert.equal(wet(clear), 0); }
  // move: cars at the school gate, then none
  { const { flawed, clear } = sims(episode('move-close')); assert.ok(flawed.s.unsafeCrossings > 0); assert.equal(clear.s.unsafeCrossings, 0); assert.ok([...flawed.after.values()].some((c) => c.item === 'carpark')); }
  // homes: "three times too much carbon", then "under the limit"
  { const { flawed, clear } = sims(episode('homes-close')); assert.equal(Math.round(flawed.s.homesCarbon / TARGETS.homesCarbon), 3); assert.ok(clear.s.homesCarbon <= TARGETS.homesCarbon); assert.ok([...flawed.after.values()].some((c) => c.item === 'concrete')); assert.match(text('homes-close'), /three times/); }
  // food: the bees and the deer leave, then every animal stays
  { const { flawed, clear } = sims(episode('food-close')); assert.ok(!flawed.s.species.bees && !flawed.s.species.deer); assert.ok(Object.values(clear.s.species).every(Boolean)); assert.ok([...clear.after.values()].some((c) => c.item === 'orchard') && [...clear.after.values()].some((c) => c.item === 'hives')); }
  // power: every light out on the winter night with solar only; the lights stay on with the fix (wind and batteries)
  { const { flawed, clear } = sims(episode('power-close')); assert.equal(Math.floor(flawed.s.homes.length * Math.max(0, flawed.s.power.winterSupply) / flawed.s.power.demand), 0); assert.ok(flawed.s.power.avgOK && !flawed.s.power.winterOK); assert.ok(clear.s.power.winterOK); assert.ok([...clear.after.values()].some((c) => c.item === 'wind') && [...clear.after.values()].some((c) => c.item === 'battery')); assert.ok([...flawed.after.values()].filter((c) => c.item && ITEMS[c.item].home).every((c) => c.mods.includes('solar'))); }
  // heart: "eighteen minutes", then every home within the town's walking rule
  { const { flawed, clear } = sims(episode('heart-close')); assert.equal(flawed.s.walkMax, 18); assert.match(text('heart-close'), /Eighteen minutes/); assert.ok(clear.s.walkMax <= TARGETS.walkMinutes); assert.equal(TARGETS.walkMinutes, 15); }
});

test('every episode is recorded: video, poster and captions listed in the index, sized for slow networks', () => {
  for (const ep of EPISODES) {
    const info = index.episodes[ep.id]; assert.ok(info, `${ep.id} is in videos/episodes/index.json`);
    assert.equal(info.mission, ep.mission); assert.equal(info.kind, ep.kind); assert.equal(info.title, ep.title);
    for (const f of [info.mp4, info.poster, info.vtt]) assert.ok(fs.existsSync(path.join(dir, f)), `${ep.id}: ${f} exists`);
    assert.ok(info.duration >= 25 && info.duration <= 46, `${ep.id}: ${info.duration} s`);
    assert.ok(info.bytes === fs.statSync(path.join(dir, info.mp4)).size && info.bytes <= 1.6e6, `${ep.id}: ${info.bytes} bytes`);
    // captions: every spoken line, in order, in the index (the viewer) and in the WebVTT file, timed from the recorded voices
    const ls = lines(ep); assert.deepEqual(info.cues.map((c) => c.text), ls.map((b) => b.say), `${ep.id}: captions match the script`);
    const file = fs.readFileSync(path.join(dir, info.vtt), 'utf8'); assert.ok(file.startsWith('WEBVTT')); for (const b of ls) assert.ok(file.includes(b.say), `${ep.id}: caption file has "${b.say}"`);
    assert.equal(file, vtt(ep, durs), `${ep.id}: the caption file is up to date`);
    const S = schedule(ep, durs); assert.ok(Math.abs(S.duration - info.duration) < 0.3, `${ep.id}: film length ${info.duration} matches the script's ${S.duration.toFixed(2)}`);
    for (let i = 0; i < S.cues.length; i++) { assert.ok(durs[S.cues[i].key] > 0.4, `${ep.id}: line ${i} has a recorded voice`); assert.ok(Math.abs(S.cues[i].t0 - info.cues[i].t0) < 0.02, `${ep.id}: caption ${i} starts with its voice`); if (i) assert.ok(S.cues[i].t0 >= S.cues[i - 1].t1, `${ep.id}: lines never overlap`); }
  }
});

test('the Episodes list locks films the player has not reached', () => {
  const G = { eps: {}, labs: {}, ever: ['land'] };
  assert.equal(episodeOpen('land-open', G), true);    // the first mission is reached from the start
  assert.equal(episodeOpen('land-close', G), false);  // its closing needs the mission finished
  assert.equal(episodeOpen('homes-open', G), false);
  G.labs.land = { stars: 2 }; assert.equal(episodeOpen('land-close', G), true);
  G.eps['homes-open'] = 1; assert.equal(episodeOpen('homes-open', G), true);
  assert.equal(episodeOpen('nope', G), false); assert.equal(episodeOpen('land-open', null), false);
});

test('numbers are spoken as words Kokoro can say', () => {
  assert.equal(sayText('I am 82% sure!'), 'I am 82 percent sure!');
  assert.equal(sayText('I read “the middle” too exactly.'), 'I read the middle too exactly.');
});
