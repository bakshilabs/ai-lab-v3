import { createRequire } from 'module'; const { chromium } = (() => { const r = createRequire(import.meta.url); try { return r('playwright'); } catch { return r('/opt/node22/lib/node_modules/playwright'); } })();
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const ctx = await b.newContext({ viewport: { width: 1280, height: 800 } }); const p = await ctx.newPage();
const errs = []; p.on('pageerror', (e) => errs.push(e.message));
await p.goto('http://localhost:8765/index.html');
await p.evaluate(() => localStorage.setItem('ecotown.prefs', JSON.stringify({ reduce: true, readAloud: false })));
await p.reload();
// keyboard only: Tab to the first age card and press Enter
for (let i = 0; i < 12; i++) { await p.keyboard.press('Tab'); if (await p.evaluate(() => document.activeElement?.dataset?.band === 'junior')) break; }
const focused = await p.evaluate(() => document.activeElement?.dataset?.band); console.log('focused', focused); await p.keyboard.press('Enter'); await p.screenshot({path:'/tmp/eco-a11y.png'});
await p.waitForSelector('#modal:not(.hide) [data-act="go"]', { timeout: 60000 }); await p.keyboard.press('Enter');
// level 1 with cards via keyboard-reachable buttons
const A = '#dock [data-actions] ';
await p.click(A + '[data-m="cards"]'); await p.click(A + '[data-card="0"]');
await p.waitForSelector(A + '[data-c="flood"]', { timeout: 30000 }); await p.click(A + '[data-c="flood"]');
await p.waitForSelector(A + '[data-go]', { timeout: 30000 }); await p.click(A + '[data-go]');
await p.waitForSelector(A + '[data-h="one_word"]', { timeout: 30000 }); await p.click(A + '[data-h="one_word"]');
await p.waitForSelector(A + '[data-m="cards"]', { timeout: 30000 }); await p.click(A + '[data-m="cards"]'); await p.click(A + '[data-card="1"]');
const filmShown = await p.waitForSelector('#filmtitle', { timeout: 4000 }).then(() => true).catch(() => false);
await p.waitForSelector(A + '[data-done]:not([disabled])', { timeout: 400000 }); await p.click(A + '[data-done]');
await p.waitForSelector(A + '[data-skip]', { timeout: 40000 }); await p.click(A + '[data-skip]');
await p.waitForSelector('#modal:not(.hide) [data-act="next"]', { timeout: 40000 }); await p.click('#modal:not(.hide) [data-act="next"]');
await p.waitForTimeout(1500);
console.log('level 1 done'); const saved = await p.evaluate(() => localStorage.getItem('ecotown.save.v1'));
await p.reload(); await p.click('[data-band="junior"]');
const resume = await p.waitForSelector('#modal:not(.hide) [data-act="resume"]', { timeout: 60000 }).then(() => true).catch(() => false);
if (resume) { await p.click('#modal:not(.hide) [data-act="resume"]'); await p.waitForSelector('#modal:not(.hide) [data-act="go"]', { timeout: 60000 }); }
const lvl = await p.evaluate(() => document.querySelector('#card [data-goal]')?.textContent);
console.log(JSON.stringify({ keyboardFocusedAge: focused, reduceMotionFilmShown: filmShown, saved: !!saved, resumeOffered: resume, afterResumeGoal: lvl, errors: errs }, null, 1));
await b.close();
