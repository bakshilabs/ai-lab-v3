// End-to-end play-through of free building and all six AI Lab missions, for one age band, with screenshots.
// Usage: node tests/playwright/run.mjs <baseUrl> <junior|senior> <outDir> [width height] [cards|text] [flawed|clean|mixed]
//   flawed: the vague instruction first (catch Florence's mistake); clean: a clear instruction first (hidden-guess step);
//   mixed: alternate. Requires Playwright and a static server for games/ecotown/game.
// The run builds town land by tapping the island, checks that categories unlock as the town grows and that
// Florence's tips appear, then plays each mission from the AI Lab board. After the missions it uses Florence's
// plan in the town (except the "Getting around" mission, where it keeps the town and checks nothing changed),
// so the town grows through every unlock, and it ends on the town report.
import { createRequire } from 'module';
import fs from 'fs';
const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }

const [base = 'http://localhost:8765/', band = 'junior', out = 'shots', W = 1280, H = 800, via = 'cards', path = 'flawed'] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const LEVELS = [
  ['land', 'flood', 'Find the best land, with lots of space.', 'Dry, sunny land. Keep the meadow wild.'],
  ['move', 'street', 'Make it easy for everyone to get to school.', 'Safe walking and cycling. Cars stay at the edge.'],
  ['homes', 'carbon', 'Build strong homes that will last for years.', 'Warm, low-carbon homes from timber and straw.'],
  ['food', 'nature', 'Grow as much food as we possibly can.', 'Enough food, and keep the hedges for the bees.'],
  ['power', 'winter', 'Make enough clean, green power for every home.', 'Winter-night power with batteries, rain gardens and compost.'],
  ['heart', 'walk', 'Put the new school right in the middle.', 'School within a 15-minute walk of every home.'],
];
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: +W, height: +H } });
await p.addInitScript((fast) => { window.__sayLog = []; if (fast) localStorage.setItem('ecotown.prefs', JSON.stringify({ quality: 'low', reduce: true })); }, !!process.env.FAST);
const errors = []; p.on('pageerror', (e) => errors.push(e.message + ' ' + (e.stack || '').split('\n')[1])); p.on('console', (m) => m.type() === 'error' && !/404/.test(m.text()) && errors.push(m.text()));
const requests = []; p.on('request', (r) => { if (!r.url().startsWith(base)) requests.push(r.url()); });
const budget = []; const checks = {};
let n = 0; const shot = async (name) => { await p.waitForTimeout(500); await p.screenshot({ path: `${out}/${String(++n).padStart(2, '0')}-${name}.png` }); };
const click = async (sel, t = 20000) => { await p.waitForSelector(sel, { state: 'visible', timeout: t }); await p.click(sel); };
const panelsVisible = () => p.evaluate(() => [...document.querySelectorAll('#layer > .panel:not(.hide)')].map((n) => n.id).filter(Boolean));
const A = '#dock [data-actions] ';

await p.goto(base + 'index.html');
await shot('start');
await click(`[data-band="${band}"]`);
await click('[data-name]'); await p.fill('[data-name]', 'Otter Bend'); await shot('name'); await click('[data-go]');
await p.waitForTimeout(800);
// Florence's intro: INTRO=1 plays it (three tiles, the build video), otherwise it is skipped
if (process.env.INTRO) {
  for (let i = 0; i < 14 && !(await p.evaluate(() => window.__eco.app.G?.introDone)); i++) {
    const r = await Promise.race([p.waitForSelector('#florence:not(.hide) [data-next]', { timeout: 120000 }).then(() => 'next'), p.waitForSelector('#florence [data-introbar]', { timeout: 120000 }).then(() => 'tap'), p.waitForSelector('#modal:not(.hide) video', { timeout: 120000 }).then(() => 'video')]).catch(() => 'none');
    if (r === 'next') { await shot(`intro-${i}`); await p.click('#florence [data-next]').catch(() => {}); await p.waitForTimeout(600); }
    else if (r === 'tap') { await shot('intro-tap'); await p.evaluate(() => { const { G } = window.__eco.app; const ks = [...window.__eco.terrain.tiles.values()].filter((t) => t.zone === 'slope' && !t.fixed).slice(0, 3).map((t) => t.k); for (const k of ks) G.placeAt(k, 'town'); }); await p.waitForTimeout(1500); }
    else if (r === 'video') { await p.waitForTimeout(2500); checks.introVideoPlays = await p.evaluate(() => { const v = document.querySelector('#modal video'); return !!v && v.readyState >= 2 && v.currentTime > 0; }); await shot('intro-video'); await p.click('#modal [data-act]'); }
    else break;
  }
  checks.introDone = await p.evaluate(() => window.__eco.app.G?.introDone); checks.introTilesKept = await p.evaluate(() => window.__eco.app.G.sim().townTiles);
} else { const sk = await p.waitForSelector('[data-introskip]', { timeout: 120000 }).catch(() => null); if (sk) await sk.click().catch(() => {}); }

// ---------- free building: straight onto the island, with the build bar and Florence's first tip
await p.waitForSelector('#build [data-cat="land"]', { timeout: 180000 });
checks.noForcedCard = await p.evaluate(() => document.querySelector('#modal').classList.contains('hide'));
await p.waitForSelector('#florence:not(.hide) .fhead em', { timeout: 15000 }).then(() => (checks.firstTip = true)).catch(() => (checks.firstTip = false));
await shot('build-start'); budget.push(['build-start-live', await panelsVisible()]);
checks.homesLockedAtStart = await p.evaluate(() => document.querySelector('[data-cat="homes"]').classList.contains('locked'));
// tap six dry tiles on the island with the town-land tool, like a player
await click('#build [data-cat="land"]'); await click('#build [data-t="town"]');
const spots = await p.evaluate(() => {
  const { app, terrain } = window.__eco; const cam = app.stage.camera; const cv = app.stage.renderer.domElement.getBoundingClientRect(); const out = [];
  for (const t of terrain.tiles.values()) {
    if (!['field', 'slope'].includes(t.zone) || t.fixed) continue;
    const v = app.world.tileTop(t.k).project(cam); if (Math.abs(v.x) > 0.8 || v.y < -0.6 || v.y > 0.8) continue;
    const x = cv.left + ((v.x + 1) / 2) * cv.width, y = cv.top + ((1 - v.y) / 2) * cv.height;
    if (document.elementFromPoint(x, y) !== app.stage.renderer.domElement) continue; // under a panel (Florence's card, the hotbar): a player wouldn't tap there
    out.push({ k: t.k, x, y });
  }
  return out;
});
let placed = 0;
for (const s of spots) {
  if (placed >= 6) break;
  const before = await p.evaluate(() => window.__eco.app.G.sim().townTiles);
  await p.mouse.click(s.x, s.y); await p.waitForTimeout(250);
  if (await p.evaluate((b0) => window.__eco.app.G.sim().townTiles > b0, before)) placed++;
}
checks.tappedTownTiles = placed;
await p.waitForTimeout(600); await shot('build-town-land');
checks.homesUnlockedByGrowing = await p.evaluate(() => !document.querySelector('[data-cat="homes"]').classList.contains('locked'));
// clear the tapped tiles again, so the missions' plans fit the town as designed
await p.evaluate(() => { const { G } = window.__eco.app; for (const [k, c] of [...G.cells]) if (c.mark === 'town' && !c.item) G.placeAt(k, 'erase'); });

async function instruct(text, card) {
  await p.waitForSelector('#dock:not(.hide) [data-actions] h3', { timeout: 30000 });
  if (via === 'cards') { await click(A + '[data-m="cards"]'); await click(`${A}[data-card="${card}"]`); }
  else { await click(A + '[data-m="text"]'); await p.fill(A + '[data-in]', text); await p.waitForTimeout(300); await click(A + '[data-send]'); }
}
let li = 0;
for (const [id, check, vague, clear] of LEVELS) {
  const clean = path === 'clean' || (path === 'mixed' && li++ % 2 === 1);
  // a modal from free building (the town-complete card) may be up: keep building
  const pop = await p.$('#modal:not(.hide) [data-act="keep"]'); if (pop) { await pop.click(); await p.waitForTimeout(600); }
  await click('#strip [data-lab]', 30000); // the AI Lab classroom, then its Missions button
  if (li === 1) { await p.waitForSelector('#dock [data-missions]', { timeout: 30000 }); await click('#dock [data-sq]'); await p.waitForTimeout(1500); await shot('classroom'); checks.classroomAnswer = await p.evaluate(() => (document.querySelector('#dock [data-speaker]')?.textContent || '').length > 40); }
  await click('#dock [data-missions]', 30000);
  await p.waitForSelector(`#modal:not(.hide) [data-act="lab:${id}"]`, { timeout: 10000 }).catch(async () => { console.log('MISSION NOT READY', id, await p.evaluate(() => ({ ever: window.__eco.app.G.ever, families: window.__eco.app.G.sim().families }))); });
  if (id === 'land') await shot('lab-board');
  const before = await p.evaluate(() => JSON.stringify([...window.__eco.app.G.cells]));
  await click(`#modal:not(.hide) [data-act="lab:${id}"]`);
  await click('#modal:not(.hide) [data-act="go"]', 60000); // brief card
  await p.waitForTimeout(400);
  if (!clean) {
    await instruct(vague, 0); await p.waitForTimeout(2200); await shot(`${id}-plan`); budget.push([`${id}-plan`, await panelsVisible()]);
    await click(`${A}[data-c="${check}"]`); await p.waitForSelector('#alert:not(.hide)', { timeout: 30000 }); await shot(`${id}-check-${check}`); budget.push([`${id}-check`, await panelsVisible()]);
    await click(A + '[data-go]'); await p.waitForTimeout(1500);
    await shot(`${id}-habit`);
    const habit = await p.evaluate(() => window.__eco.app.__expectHabit);
    await click(`${A}[data-h="${habit}"]`); await p.waitForTimeout(900);
    await p.waitForTimeout(1200); await shot(`${id}-retry`); // Florence's explanation above the instruction tray (must be readable on a phone)
    await instruct(clear, 1);
  } else {
    await instruct(clear, 1); await p.waitForTimeout(2200); await shot(`${id}-plan-clear`);
    await click(`${A}[data-c="${check}"]`);
    await click(A + '[data-accept]', 40000); await shot(`${id}-checked`);
    await p.waitForSelector(A + '[data-o]', { timeout: 30000 });
    await shot(`${id}-hidden`);
    await click(A + '[data-o="0"]'); await click(A + '[data-go]');
  }
  if (!process.env.FAST) { await p.waitForSelector('#filmtitle', { timeout: 40000 }); await p.waitForTimeout(4200); await shot(`${id}-film`); }
  if (id === 'heart') {
    if (band === 'junior') { await p.waitForSelector(A + '[data-r]', { timeout: 400000 }); await shot('heart-ask'); for (let i = 0; i < 6; i++) await click(`${A}[data-r="${i}"]`); await click(A + '[data-act="all"]'); await p.waitForTimeout(800); await shot('heart-counted'); await click(A + '[data-go]'); }
    else { await click(A + '[data-act="gate"]', 400000); await p.waitForTimeout(1500); await shot('heart-teach'); await click(A + '[data-go]', 60000); } // the balanced result waits for Next (a town meeting used to cover it)
  }
  // senior town meetings, then the reward card: use Florence's plan, or keep the town
  for (let i = 0; i < 3; i++) {
    const m = await p.waitForSelector('#modal:not(.hide) [data-act]', { timeout: 400000 });
    const act = await m.getAttribute('data-act');
    if (act === 'keep' || act === 'use') { await p.waitForTimeout(500); await shot(`${id}-reward`); await click(`#modal:not(.hide) [data-act="${id === 'move' ? 'keep' : 'use'}"]`); break; }
    await m.click(); await p.waitForTimeout(500);
  }
  if (id === 'heart') { await p.waitForSelector(A + '[data-p]', { timeout: 30000 }); for (const i of [0, 1, 2, 3]) await click(`${A}[data-p="${i}"]`); await shot('charter'); await click(A + '[data-ok]'); checks.charterNumbers = await p.evaluate(() => !!document.querySelector('#modal ul.charter small')); await shot('charter-result'); await click('#modal:not(.hide) [data-act="ok"]');
    // after the sixth mission: the "Before I trust an AI plan, I…" reflection (review A-04), then one clear next action
    if (Object.keys(await p.evaluate(() => window.__eco.app.G.labs)).length >= 6) {
      await p.waitForSelector('#modal:not(.hide) [data-ri]', { timeout: 30000 }); await click('#modal [data-ri="0"]'); await click('#modal [data-ri="3"]'); await p.fill('#modal [data-rown]', 'ask a friend to check it'); await shot('reflection');
      checks.reflectionSentence = await p.evaluate(() => document.querySelector('#modal [data-rsay]')?.textContent || ''); await click('#modal [data-act="done"]');
      await p.waitForSelector('#modal:not(.hide) [data-act="build"], #modal:not(.hide) [data-act="finale"]', { timeout: 30000 }); await shot('reflection-rule');
      checks.reflectionSaved = await p.evaluate(() => !!window.__eco.app.G.reflectDone && /ask a friend/.test(window.__eco.app.G.reflection));
      await p.click('#modal:not(.hide) [data-act="build"], #modal:not(.hide) [data-act="finale"]');
    } }
  await p.waitForSelector('#build [data-cat]', { timeout: 30000 }); await p.waitForTimeout(800);
  // adopting a plan lays the groundwork and builds the first four; the player builds the rest. The run builds them where the
  // plan had them (as a player following the good spots would), so the town still grows through every unlock.
  if (id !== 'move') { checks[`${id}PlanLeftForPlayer`] = await p.evaluate(() => { const { G } = window.__eco.app; const left = G.planLeft || []; let n = 0; for (const q of left) { const tool = q.item || q.mod || q.mark; if (G.placeAt(q.k, tool, { free: true })) n++; } G.planLeft = []; return `${n}/${left.length}`; }); await p.waitForTimeout(1200); }
  const after = await p.evaluate(() => JSON.stringify([...window.__eco.app.G.cells]));
  if (id === 'move') checks.keepLeavesTownUnchanged = before === after;
  else checks[`${id}PlanAdded`] = before !== after;
  await shot(`${id}-back-to-building`); budget.push([`${id}-back-live`, await panelsVisible()]);
  console.log('mission done', id, clean ? 'clean' : 'flawed', 'stars', await p.evaluate(() => window.__eco.app.G.stars), 'unlocked', await p.evaluate(() => window.__eco.app.G.ever.join(',')));
}
checks.lensButtons = await p.evaluate(() => document.querySelectorAll('#lenspop [data-lens]').length);
const play = await p.$('#build [data-play]'); if (play) { await p.click('#build [data-play]'); /* by selector: the bar re-renders (credits, clock), which detached a held element */ await p.waitForSelector('#modal:not(.hide) video', { timeout: 20000 }); await p.waitForTimeout(3000); checks.paletteVideoPlays = await p.evaluate(() => { const v = document.querySelector('#modal video'); return !!v && v.readyState >= 2 && v.currentTime > 0; }); await shot('video-card'); await click('#modal:not(.hide) [data-act="close"]'); }
await click('#strip [data-lensbtn]'); await click('#lenspop [data-lens="flood"]'); await p.waitForTimeout(1500); await shot('lens-flood'); await click('#lensbar [data-lensx]');
const pop = await p.$('#modal:not(.hide) [data-act="keep"]'); if (pop) { await shot('town-complete'); checks.townComplete = true; await pop.click(); await p.waitForTimeout(600); }
await shot('town-built');
await click('#strip [data-menu]'); await click('#settings [data-m-act="report"]'); // the report is in the ☰ menu
await p.waitForSelector('#report', { timeout: 60000 }); await p.waitForTimeout(800); await shot('report');
await click('#report [data-close]'); await p.waitForSelector('#build [data-cat]', { timeout: 30000 }); checks.backFromReport = true;
checks.saved = await p.evaluate(() => !!localStorage.getItem('ecotown.save.v3'));
const said = await p.evaluate(() => window.__sayLog || []);
fs.writeFileSync(`${out}/said.json`, JSON.stringify(said, null, 1));
const over = budget.filter(([k, v]) => v.filter((x) => ['dock', 'alert', 'lensbar', 'modal'].includes(x)).length > (/live/.test(k) ? 2 : 4));
console.log(JSON.stringify({ checks, errors, external: requests, panelBudgetViolations: over, spoken: said.length, missingClips: said.reduce((a, x) => a + x.missing.length, 0) }, null, 1));
await b.close();
