// End-to-end play-through of all six levels, for one age band, with screenshots of every act.
// Usage: node tests/playwright/run.mjs <baseUrl> <junior|senior> <outDir> [width height] [cards|text] [flawed|clean|mixed]
//   flawed: the vague instruction first (catch Florence's mistake); clean: a clear instruction first (hidden-guess step);
//   mixed: alternate. Requires Playwright and a static server for games/ecotown/game.
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
let n = 0; const shot = async (name) => { await p.waitForTimeout(500); await p.screenshot({ path: `${out}/${String(++n).padStart(2, '0')}-${name}.png` }); };
const click = async (sel, t = 20000) => { await p.waitForSelector(sel, { state: 'visible', timeout: t }); await p.click(sel); };
const panelsVisible = () => p.evaluate(() => [...document.querySelectorAll('#layer > .panel:not(.hide)')].map((n) => n.id).filter(Boolean));
const budget = [];

await p.goto(base + 'index.html');
await p.selectOption('[data-session]', '45');
await shot('start');
await click(`[data-band="${band}"]`);
await click('[data-name]'); await p.fill('[data-name]', 'Otter Bend'); await shot('name'); await click('[data-go]');
await p.waitForTimeout(800);
const skip = await p.$('text=Skip ⏭'); if (skip) await skip.click().catch(() => {});

async function instruct(text, card) {
  await p.waitForSelector('#dock:not(.hide) [data-actions] h3', { timeout: 30000 });
  if (via === 'cards') { await click('#dock [data-actions] [data-m="cards"]'); await click(`#dock [data-actions] [data-card="${card}"]`); }
  else { await click('#dock [data-actions] [data-m="text"]'); await p.fill('#dock [data-actions] [data-in]', text); await p.waitForTimeout(300); await click('#dock [data-actions] [data-send]'); }
}
let li = 0;
for (const [id, check, vague, clear] of LEVELS) {
  const clean = path === 'clean' || (path === 'mixed' && li++ % 2 === 1);
  await click('#modal:not(.hide) [data-act="go"]', 180000); // brief card
  await p.waitForTimeout(400);
  if (!clean) {
    await instruct(vague, 0); await p.waitForTimeout(2200); await shot(`${id}-plan`); budget.push([`${id}-plan`, await panelsVisible()]);
    await click(`#dock [data-actions] [data-c="${check}"]`); await p.waitForSelector('#alert:not(.hide)', { timeout: 30000 }); await shot(`${id}-check-${check}`); budget.push([`${id}-check`, await panelsVisible()]);
    await click('#dock [data-actions] [data-go]'); await p.waitForTimeout(1500);
    await shot(`${id}-habit`);
    const habit = await p.evaluate(() => window.__eco.app.__expectHabit);
    await click(`#dock [data-actions] [data-h="${habit}"]`); await p.waitForTimeout(900);
    await instruct(clear, 1);
  } else {
    await instruct(clear, 1); await p.waitForTimeout(2200); await shot(`${id}-plan-clear`);
    await click(`#dock [data-actions] [data-c="${check}"]`); await p.waitForSelector('#dock [data-actions] [data-o]', { timeout: 30000 }); await shot(`${id}-hidden`);
    await click('#dock [data-actions] [data-o="0"]'); await click('#dock [data-actions] [data-go]');
  }
  if (!process.env.FAST) { await p.waitForSelector('#filmtitle', { timeout: 40000 }); await p.waitForTimeout(4200); await shot(`${id}-film`); }
  await p.waitForSelector('#dock [data-actions] [data-done]', { timeout: 400000 }); await p.waitForTimeout(600); await shot(`${id}-build`); budget.push([`${id}-build`, await panelsVisible()]);
  if (await p.$('#dock [data-actions] [data-done][disabled]')) { console.log('BUILD NOT PASSING', id, await p.evaluate(() => [...document.querySelectorAll('.needs span')].map((x) => x.className + ':' + x.textContent))); }
  await click('#dock [data-actions] [data-done]:not([disabled])', 10000);
  if (id === 'heart') {
    if (band === 'junior') { await p.waitForSelector('#dock [data-actions] [data-r]', { timeout: 30000 }); await shot('heart-ask'); for (let i = 0; i < 6; i++) await click(`#dock [data-actions] [data-r="${i}"]`); await shot('heart-asked'); await click('#dock [data-actions] [data-act="all"]'); await p.waitForTimeout(800); await shot('heart-counted'); await click('#dock [data-actions] [data-go]'); }
    else { await click('#dock [data-actions] [data-act="gate"]', 40000); await p.waitForTimeout(1500); await shot('heart-teach'); }
    await p.waitForSelector('#dock [data-actions] [data-p]', { timeout: 30000 }); for (const i of [0, 1, 2, 3]) await click(`#dock [data-actions] [data-p="${i}"]`); await shot('charter'); await click('#dock [data-actions] [data-ok]'); await click('#modal:not(.hide) [data-act="ok"]');
  }
  // live: screenshot midway, then skip
  const first = await Promise.race([p.waitForSelector('#dock [data-actions] [data-skip]', { state: 'visible', timeout: 120000 }).then(() => 'live'), p.waitForSelector('#modal:not(.hide) [data-act]', { timeout: 120000 }).then(() => 'modal')]);
  if (first === 'live') { await p.waitForTimeout(3500); await shot(`${id}-live`); budget.push([`${id}-live`, await panelsVisible()]); await p.click('#dock [data-actions] [data-skip]', { timeout: 3000 }).catch(() => {}); } // the day may already be over
  // petitions / dilemmas (senior) and the reward card
  for (let i = 0; i < 3; i++) {
    const m = await p.waitForSelector('#modal:not(.hide) [data-act]', { timeout: 30000 });
    const act = await m.getAttribute('data-act');
    if (act === 'next') { await p.waitForTimeout(500); await shot(`${id}-reward`); await m.click(); break; }
    await m.click(); await p.waitForTimeout(500);
  }
  console.log('level done', id, clean ? 'clean' : 'flawed', 'stars', await p.evaluate(() => window.__eco.app.G.stars));
}
await p.waitForSelector('#dock [data-actions] [data-skip]', { timeout: 60000 }); await p.waitForTimeout(4000); await shot('final-day'); await click('#dock [data-actions] [data-skip]');
await p.waitForSelector('#report', { timeout: 60000 }); await p.waitForTimeout(800); await shot('report');
const said = await p.evaluate(() => window.__sayLog || []);
fs.writeFileSync(`${out}/said.json`, JSON.stringify(said, null, 1));
const over = budget.filter(([k, v]) => v.filter((x) => ['dock', 'alert', 'lensbar', 'modal'].includes(x)).length > (/live/.test(k) ? 2 : 4));
console.log(JSON.stringify({ errors, external: requests, panelBudgetViolations: over, spoken: said.length, missingClips: said.reduce((a, x) => a + x.missing.length, 0) }, null, 1));
await b.close();
