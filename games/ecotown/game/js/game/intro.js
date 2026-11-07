// Florence's guided first build (about 90 s, skippable at any moment). She walks off the sky-ferry dock,
// shows the floodplain and the dry land, waits while the player taps three tiles of town land, shows how
// a build goes up (a build video), points out the build panel and the AI Lab, then hands over.
// The game runs it on top of free building; tips are held back until it ends. Text: INTRO in content.js.
import * as THREE from 'three';
import { esc } from '../ui/ui.js';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// api: { app, G, T (intro text for this band), selectTool(cat, tool), townTiles(), videoCard(id) | null, highlight(sel, on) }
export async function runIntro(api) {
  const { app, T } = api; const { ui, world, terrain, rig } = app; const bot = app.bot;
  let skipped = false; let skipResolve; const skipP = new Promise((r) => (skipResolve = r));
  const skipBtn = document.createElement('button'); skipBtn.className = 'btn alt panel introskip'; skipBtn.textContent = `${T.skip} ⏭`; skipBtn.setAttribute('data-introskip', '');
  skipBtn.onclick = () => { skipped = true; skipResolve('skip'); }; document.getElementById('layer').appendChild(skipBtn);
  const step = async (p) => { const r = await Promise.race([p, skipP]); if (skipped) throw new Error('skip'); return r; };
  const top = (k) => world.tileTop(k);
  const tiles = [...terrain.tiles.values()];
  const near = (from, zones) => tiles.filter((t) => zones.includes(t.zone) && !t.fixed).sort((a, b) => top(a.k).distanceTo(from) - top(b.k).distanceTo(from))[0];
  const dockP = top(terrain.dock); const labP = top(terrain.lab);
  const meadow = near(dockP, ['meadow']); const dry = near(top(meadow.k), ['slope', 'field']);
  // one line from Florence in her card, with a Next button (or none, while she waits for the player)
  const say = (text, { next = true, tag = T.tag } = {}) => new Promise((resolve) => {
    const el = ui.florence({ tag, html: `<p>${esc(text)}</p>${next ? `<div class="tiprow"><button class="slot act go" data-next><b class="ico">▶</b><span>${esc(T.next)}</span></button></div>` : ''}`, say: text });
    el.querySelector('[data-next]')?.addEventListener('click', (e) => { e.currentTarget.closest('.tiprow').remove(); resolve(); }); if (!next) resolve();
  });
  const go = (p, dist = 110) => (app.reduce ? rig.focus(p, { dist, pitch: 0.7 }, 0.01) : rig.focus(p, { dist, pitch: 0.7, yaw: rig.sky.yaw }, 1.3));
  try {
    rig.startTurntable(0);
    // 1. off the sky-ferry dock, a wave hello
    bot.appear(dockP.clone().add(new THREE.Vector3(1, 0, 6))); bot.look(null);
    await step(go(dockP, 100));
    await step(bot.walkTo(dockP.clone().add(new THREE.Vector3(-3, 0, -4)), { maxDur: 1.6 }));
    bot.wave(); await step(say(T.hello));
    // 2. the river meadow: flat, tempting, and it floods every winter
    const mP = top(meadow.k); go(mP, 115); await step(bot.walkTo(mP, { stopShort: 5, maxDur: 3 }));
    bot.peer(mP, 2.4);
    let lvl = 0; const flood = setInterval(() => { lvl = Math.min(0.7, lvl + 0.05); world.setFlood(lvl); }, 60);
    try { await step(say(T.meadow)); } finally { clearInterval(flood); world.setFlood(0); }
    // 3. the dry slope: the player's first three tiles of town land
    const dP = top(dry.k); go(dP, 120); await step(bot.walkTo(dP, { stopShort: 6, maxDur: 3 }));
    bot.point(dP.clone().add(new THREE.Vector3(0, 1, 0)), 2.5);
    api.selectTool('land', 'town'); api.highlight('#build', true);
    // three suggested dry tiles glow gold; the progress bar sits in Florence's card
    const suggest = tiles.filter((t) => ['slope', 'field'].includes(t.zone) && !t.fixed).sort((a, b) => top(a.k).distanceTo(dP) - top(b.k).distanceTo(dP)).slice(0, 3);
    const glow = () => { const spec = new Map(); for (const t of suggest) spec.set(t.k, { color: '#ffd23f', pattern: 'dots', opacity: 0.8 }); world.setOverlay(spec); };
    glow();
    const start = api.townTiles();
    const el = ui.florence({ tag: T.yourTurnTag, html: `<p>${esc(T.yourTurn)}</p><div class="bar" data-introbar><i style="width:0%"></i><span>${T.tiles}: 0 / 3</span></div>`, say: T.yourTurn });
    let shown = start;
    while (api.townTiles() < start + 3) {
      await step(sleep(250));
      const n = api.townTiles();
      if (n !== shown) { shown = n; if (n > start) bot.nod(); const k = Math.max(0, Math.min(3, n - start)); const bar = el.querySelector('[data-introbar]'); if (bar) { bar.querySelector('i').style.width = `${(100 * k) / 3}%`; bar.querySelector('span').textContent = `${T.tiles}: ${k} / 3`; } glow(); }
    }
    world.setOverlay(null);
    api.highlight('#build', false);
    bot.cheer(); await step(say(T.wellDone));
    // 4. how a build goes up: a build video (from above, then at eye level)
    if (api.videoCard) { await step(say(T.video)); await step(api.videoCard('timber')); }
    else await step(say(T.videoLater));
    // 5. the build panel: more unlocks as the town grows
    api.highlight('#build .cats', true); bot.wave(); await step(say(T.unlocks)); api.highlight('#build .cats', false);
    // 6. the AI Lab: test her plans
    go(labP, 100); await step(bot.walkTo(labP.clone().add(new THREE.Vector3(0, 0, 6)), { maxDur: 3.5 }));
    bot.point(labP.clone().add(new THREE.Vector3(0, 3, 0)), 2.6); api.highlight('#strip [data-lab]', true);
    await step(say(T.lab)); api.highlight('#strip [data-lab]', false);
    // 7. over to you
    bot.cheer(); await step(say(T.overToYou, { tag: T.tag }));
  } catch (e) { if (e.message !== 'skip') throw e; }
  finally {
    skipBtn.remove(); for (const s of ['#build', '#build .cats', '#strip [data-lab]']) api.highlight(s, false);
    world.setFlood(0); ui.florence(null); await rig.overview(app.reduce ? 0.01 : 1.1);
  }
  return !skipped;
}
