// The story episodes in the game (js/ui/epviewer.js): the opening film plays before the first mission's start card,
// once; captions show; Skip and Escape end it; ☰ → Episodes lists twelve with the unreached ones locked; the setting
// turns them off; nothing is fetched from videos/episodes/ before a film plays; a missing film never blocks the game.
// Usage: node tests/playwright/episodes.mjs <baseUrl> [outDir]
// If this Chromium cannot play H.264, the films are served to it as WebM copies made with ffmpeg (test only).
import { createRequire } from 'module'; import fs from 'fs'; import os from 'os'; import path from 'path'; import { spawnSync } from 'child_process';
const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const [base = 'http://localhost:8771/', out = path.join(os.tmpdir(), 'ecotown-episodes')] = process.argv.slice(2); fs.mkdirSync(out, { recursive: true });
const dir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'videos', 'episodes');
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'] });
const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
await p.addInitScript(() => localStorage.setItem('ecotown.prefs', JSON.stringify({ quality: 'low', reduce: true, readAloud: false })));
const errors = []; p.on('pageerror', (e) => errors.push(e.message)); p.on('console', (m) => m.type() === 'error' && !/404|Failed to load resource/.test(m.text()) && errors.push(m.text()));
const fetched = []; p.on('request', (r) => { if (/videos\/episodes\//.test(r.url())) fetched.push(r.url().split('/').pop()); });
await p.goto(base + 'index.html');
const h264 = await p.evaluate(() => !!document.createElement('video').canPlayType('video/mp4; codecs="avc1.4d401f, mp4a.40.2"'));
if (!h264) {
  await p.addInitScript(() => { const o = HTMLMediaElement.prototype.canPlayType; HTMLMediaElement.prototype.canPlayType = function (t) { return /mp4/.test(t) ? 'probably' : o.call(this, t); }; });
  await p.route('**/videos/episodes/*.mp4', async (route) => { const id = route.request().url().split('/').pop().slice(0, -4); const webm = path.join(out, id + '.webm');
    if (!fs.existsSync(webm)) spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', path.join(dir, id + '.mp4'), '-vf', 'scale=480:270', '-c:v', 'libvpx', '-b:v', '200k', '-c:a', 'libvorbis', webm]);
    await route.fulfill({ status: 200, contentType: 'video/webm', body: fs.readFileSync(webm) }); });
  await p.reload();
}
const click = async (sel, t = 30000) => { await p.waitForSelector(sel, { state: 'visible', timeout: t }); await p.click(sel); };
const R = { h264 };
await click('[data-band="junior"]'); await click('[data-name]'); await p.fill('[data-name]', 'Otter Bend'); await click('[data-go]');
const sk = await p.waitForSelector('[data-introskip]', { timeout: 120000 }).catch(() => null); if (sk) await sk.click().catch(() => {});
await p.waitForSelector('#build [data-cat="land"]', { timeout: 180000 });
R.nothingFetchedBeforeAFilm = fetched.length === 0;
// into the first mission: the opening film comes before the start card
await click('#strip [data-lab]'); await click('#dock [data-missions]'); await click('#modal:not(.hide) [data-act="lab:land"]');
await p.waitForSelector('#episode video', { timeout: 60000 });
R.startCardWaits = await p.evaluate(() => document.querySelector('#modal').classList.contains('hide'));
await p.waitForFunction(() => { const v = document.querySelector('#episode video'); return v && v.currentTime > 3.2; }, null, { timeout: 60000 });
R.plays = true; R.caption = await p.evaluate(() => document.querySelector('#episode .epcap.on')?.textContent || '');
await p.screenshot({ path: path.join(out, 'viewer.png') });
await p.click('#episode [data-cc]'); R.captionsOff = await p.evaluate(() => getComputedStyle(document.querySelector('#episode .epcap')).display === 'none' && JSON.parse(localStorage.getItem('ecotown.prefs')).epCaptions === false);
await p.click('#episode [data-cc]');
await p.keyboard.press('Escape'); await p.waitForSelector('#episode', { state: 'detached', timeout: 5000 });
R.escapeSkips = true;
await p.waitForSelector('#modal:not(.hide) [data-act="go"]', { timeout: 30000 }); R.startCardAfter = true;
R.seenInSave = await p.evaluate(() => window.__eco.app.G.eps['land-open'] === 1);
await p.click('#modal:not(.hide) [data-act="later"]'); await p.waitForSelector('#build [data-cat="land"]', { timeout: 60000 });
R.savedToDisk = await p.evaluate(() => { window.__eco.app.G.save(); return JSON.parse(localStorage.getItem('ecotown.save.v3')).eps['land-open'] === 1; });
// a second visit does not force it again
R.notForcedAgain = await p.evaluate(async () => { const { app } = window.__eco; const before = !!document.querySelector('#episode'); await app.episodes.auto('land-open', app.G); return !before && !document.querySelector('#episode'); });
// ☰ → Episodes
await click('#strip [data-menu]'); await click('[data-m-act="episodes"]'); await p.waitForSelector('#modal:not(.hide) .eplist');
R.listed = await p.evaluate(() => document.querySelectorAll('#modal .eplist button').length);
R.unlocked = await p.evaluate(() => [...document.querySelectorAll('#modal .eplist button:not([disabled])')].map((x) => x.dataset.act));
await p.screenshot({ path: path.join(out, 'list.png') });
await p.click('#modal [data-act="ep:land-open"]'); await p.waitForSelector('#episode video'); await click('#episode [data-skip]'); await p.waitForSelector('#episode', { state: 'detached' });
R.skipButton = true; await p.waitForSelector('#modal:not(.hide) .eplist'); await p.click('#modal [data-act="close"]');
// a film that is not there: the game carries on
R.missingCarriesOn = await p.evaluate(async () => { const { app } = window.__eco; return (await app.episodes.play('no-such-film')) === 'failed' && !document.querySelector('#episode'); });
// the setting turns the films off
await p.waitForTimeout(500); await click('#strip [data-menu]'); await click('[data-k="episodes"]'); await click('#settings [data-close]').catch(() => {});
R.settingOff = await p.evaluate(async () => { const { app } = window.__eco; if (app.settings.episodes !== false) return false; await app.episodes.auto('move-open', app.G); return !document.querySelector('#episode') && !app.G.eps['move-open'] && JSON.parse(localStorage.getItem('ecotown.prefs')).episodes === false; });
R.fetched = [...new Set(fetched)]; R.errors = errors;
console.log(JSON.stringify(R, null, 1));
await b.close();
const ok = R.nothingFetchedBeforeAFilm && R.startCardWaits && R.plays && R.caption.length > 5 && R.captionsOff && R.escapeSkips && R.startCardAfter && R.seenInSave && R.savedToDisk && R.notForcedAgain && R.listed === 12 && R.unlocked.join() === 'ep:land-open,ep:move-open' /* both missions are open from the start */ && R.skipButton && R.missingCarriesOn && R.settingOff && !errors.length;
console.log(ok ? 'EPISODES OK' : 'EPISODES FAILED'); process.exit(ok ? 0 : 1);
