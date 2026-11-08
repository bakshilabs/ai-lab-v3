// Keyboard and resume check for free building. Server on :8765 first.
// Keyboard only: choose the age band, start, reach the build bar and the AI Lab button, open the Lab board.
// Then place town land, reload, and check "Carry on building" restores the town.
import { createRequire } from 'module'; const { chromium } = (() => { const r = createRequire(import.meta.url); try { return r('playwright'); } catch { return r('/opt/node22/lib/node_modules/playwright'); } })();
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const ctx = await b.newContext({ viewport: { width: 1280, height: 800 } }); const p = await ctx.newPage();
const errs = []; p.on('pageerror', (e) => errs.push(e.message));
await p.goto('http://localhost:8765/index.html');
await p.evaluate(() => { localStorage.clear(); localStorage.setItem('ecotown.prefs', JSON.stringify({ reduce: true, readAloud: false, quality: 'low' })); });
await p.reload();
const tabTo = async (test, max = 40) => { for (let i = 0; i < max; i++) { await p.keyboard.press('Tab'); if (await p.evaluate(test)) return true; } return false; };
const focusedAge = await tabTo(() => document.activeElement?.dataset?.band === 'junior', 12); await p.keyboard.press('Enter');
await p.waitForSelector('[data-go]', { timeout: 60000 });
const focusedStart = await tabTo(() => document.activeElement?.hasAttribute('data-go')); await p.keyboard.press('Enter');
const sk = await p.waitForSelector('[data-introskip]', { timeout: 120000 }).catch(() => null); if (sk) await sk.click();
await p.waitForSelector('#build [data-cat="land"]', { timeout: 120000 });
const focusedTab = await tabTo(() => document.activeElement?.dataset?.cat === 'land', 60);
const focusedLab = await tabTo(() => document.activeElement?.hasAttribute('data-lab'), 60); await p.keyboard.press('Enter');
// the AI Lab classroom: keyboard to the Missions button
const classroom = await p.waitForSelector('#dock [data-missions]', { timeout: 30000 }).then(() => true).catch(() => false);
const focusedMissions = await tabTo(() => document.activeElement?.hasAttribute('data-missions'), 40); await p.keyboard.press('Enter');
const board = await p.waitForSelector('#modal:not(.hide) .labs', { timeout: 10000 }).then(() => true).catch(() => false);
await p.keyboard.press('Escape'); await p.click('#modal:not(.hide) [data-act="close"]').catch(() => {});
await p.evaluate(() => { const { G } = window.__eco.app; const ks = [...window.__eco.terrain.tiles.values()].filter((t) => ['field', 'slope'].includes(t.zone) && !t.fixed).slice(0, 4).map((t) => t.k); for (const k of ks) G.placeAt(k, 'town'); });
await p.waitForTimeout(1500);
const saved = await p.evaluate(() => !!localStorage.getItem('ecotown.save.v3'));
await p.reload(); await p.click('[data-band="junior"]'); await p.click('[data-go]');
const resume = await p.waitForSelector('#modal:not(.hide) [data-act="resume"]', { timeout: 60000 }).then(() => true).catch(() => false);
if (resume) await p.click('#modal:not(.hide) [data-act="resume"]');
await p.waitForSelector('#build [data-cat="land"]', { timeout: 120000 });
const tilesAfterResume = await p.evaluate(() => window.__eco.app.G.sim().townTiles);
console.log(JSON.stringify({ focusedAge, focusedStart, focusedBuildTab: focusedTab, focusedLabButton: focusedLab, classroom, focusedMissions, labBoardOpened: board, saved, resumeOffered: resume, tilesAfterResume, errors: errs }, null, 1));
await b.close();
