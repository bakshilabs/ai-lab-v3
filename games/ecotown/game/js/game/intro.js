// Florence's guided first build (about 45 s, five short beats, skippable at any moment). She walks off the sky-ferry dock,
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
  // the player left for the AI Lab or the classroom mid-intro: the intro is over (it used to wait for a Next button that was
  // gone, so Skip intro stayed on screen through three missions). No camera move at the end: the Lab owns the camera now.
  let aborted = false; api.setAbort?.(() => { if (skipped) return; aborted = skipped = true; skipBtn.remove(); skipResolve('skip'); });
  const step = async (p) => { const r = await Promise.race([p, skipP]); if (skipped) throw new Error('skip'); return r; };
  const top = (k) => world.tileTop(k);
  const tiles = [...terrain.tiles.values()];
  const near = (from, zones) => tiles.filter((t) => zones.includes(t.zone) && !t.fixed).sort((a, b) => top(a.k).distanceTo(from) - top(b.k).distanceTo(from))[0];
  const dockP = top(terrain.dock); const labP = top(terrain.lab);
  const meadow = near(dockP, ['meadow']); const dry = near(top(meadow.k), ['slope', 'field']);
  // one line from Florence in her card, with a Next button (or none, while she waits for the player)
  const say = (text, { next = true, tag = T.tag } = {}) => new Promise((resolve) => {
    const el = ui.florence({ tag, html: `<p>${esc(text)}</p>${next ? `<div class="tiprow"><button class="slot act go" data-next aria-label="${esc(T.next)}"><b class="ico" aria-hidden="true">▶</b><span>${esc(T.next)}</span></button></div>` : ''}`, say: text });
    el.querySelector('[data-next]')?.addEventListener('click', () => { ui.florence(null); resolve(); }); if (!next) resolve(); // the line goes once read (it used to stay, without its Next button, while she walked on)
  });
  const go = (p, dist = 110) => (app.reduce ? rig.focus(p, { dist, pitch: 0.7 }, 0.01) : rig.focus(p, { dist, pitch: 0.7, yaw: rig.sky.yaw }, 1.3));
  try {
    rig.startTurntable(0);
    // 1. off the sky-ferry dock, a wave hello
    bot.appear(dockP.clone().add(new THREE.Vector3(1, 0, 6))); bot.look(null);
    await step(go(dockP, 100));
    await step(bot.walkTo(dockP.clone().add(new THREE.Vector3(-3, 0, -4)), { maxDur: 1.6 }));
    // the hello needs no tap: it stays up while she waves, then she walks on (two playtests found the intro slow: a Next
    // for every line, with waits in between)
    bot.wave(); await step(say(T.hello, { next: false })); await step(sleep(app.reduce ? 2600 : 3400));
    // 2. the river meadow: flat, tempting, and it floods every winter
    const mP = top(meadow.k); go(mP, 115); await step(bot.walkTo(mP, { stopShort: 5, maxDur: 2.2 }));
    bot.peer(mP, 2.4);
    let lvl = 0; const flood = setInterval(() => { lvl = Math.min(0.7, lvl + 0.05); world.setFlood(lvl); }, 60);
    try { await step(say(T.meadow)); } finally { clearInterval(flood); world.setFlood(0); }
    // 3. the dry slope: the player's first three tiles of town land
    const dP = top(dry.k); go(dP, 120);
    // three suggested dry tiles glow gold; the progress bar sits in Florence's card
    // only tiles a tap really builds on (a tester tapped a gold tile beside the wetland and was refused); every other tile
    // keeps its usual mark (white kerb = can build, dark plate = can't), so the gold ones are a suggestion, not the only choice
    const suggest = tiles.filter((t) => ['slope', 'field'].includes(t.zone) && !t.fixed && (api.canBuild?.(t.k) ?? true)).sort((a, b) => top(a.k).distanceTo(dP) - top(b.k).distanceTo(dP)).slice(0, 3);
    // Florence stands beside the targets, to the side of the screen (she used to stand on one, so phone taps hit her)
    const mid = suggest.reduce((v, t) => v.add(top(t.k)), new THREE.Vector3()).divideScalar(Math.max(1, suggest.length));
    const right = new THREE.Vector3(Math.cos(rig.sky.yaw), 0, -Math.sin(rig.sky.yaw));
    const spread = Math.max(0, ...suggest.map((t) => Math.abs(top(t.k).clone().sub(mid).dot(right))));
    let stand = mid.clone().add(right.clone().multiplyScalar(spread + 7));
    const onTarget = (p) => suggest.some((t) => Math.hypot(top(t.k).x - p.x, top(t.k).z - p.z) < 5);
    if (onTarget(stand)) stand = mid.clone().sub(right.clone().multiplyScalar(spread + 7));
    await step(bot.walkTo(stand, { maxDur: 2 }));
    bot.point(mid.clone().add(new THREE.Vector3(0, 1, 0)), 2.5);
    api.selectTool('land', 'town'); api.highlight('#build', true);
    let pulse = 0; const glow = () => { const spec = new Map(api.allowedSpec?.() || []); pulse++; for (const t of suggest) spec.set(t.k, { color: pulse % 2 ? '#ff9f1a' : '#ffd23f', ring: true, notch: true }); const kc = api.cursor?.(); if (kc) spec.set(kc[0], kc[1]); world.setOverlay(spec); }; // a pulsing orange target, unlike any other tile
    glow(); api.setGlow?.(glow); // the keyboard tile cursor redraws through this while the intro owns the overlay
    // the bar counts the town's real tiles (3 in all), the same number as the top line (a tester marked tiles early
    // and saw "0 / 3" here while the top line said "mark 1 more")
    const start = api.townTiles(); const k0 = Math.min(3, start);
    const el = ui.florence({ tag: T.yourTurnTag, html: `<p>${esc(T.yourTurn)}</p><div class="bar" data-introbar><i style="width:${(100 * k0) / 3}%"></i><span>${T.tiles}: ${k0} / 3</span></div>`, say: T.yourTurn });
    let shown = start;
    while (api.townTiles() < 3) {
      await step(sleep(250));
      const n = api.townTiles();
      if (!app.reduce && Math.floor(performance.now() / 500) % 2 !== pulse % 2) glow();
      if (n !== shown) { shown = n; if (n > start) bot.nod(); const k = Math.max(0, Math.min(3, n)); const bar = el.querySelector('[data-introbar]'); if (bar) { bar.querySelector('i').style.width = `${(100 * k) / 3}%`; bar.querySelector('span').textContent = `${T.tiles}: ${k} / 3`; } glow(); }
    }
    api.setGlow?.(null); world.setOverlay(null);
    api.highlight('#build', false);
    // (shorter since the scored review: the build video is no longer forced here; ▶ on any build shows it, and the
    // video tip says so. Well done + what's next + goals are one beat; the AI Lab + over to you is the last.)
    bot.cheer();
    // 4. what to do next and the town's goals: the next-step line, the 🌼 goals and the build info
    const marks = ['#card .goal', '#card [data-flower]', '#build .cats'];
    for (const s2 of marks) api.highlight(s2, true); const left = 6 - api.townTiles(); await step(say(`${left === 3 ? T.wellDone : left <= 0 ? T.wellDoneOpen : left === 1 ? T.wellDone1 : T.wellDone2} ${T.goals || T.unlocks}`)); // the number matches the top line
    for (const s2 of marks) api.highlight(s2, false);
    // 5. the AI Lab: test her plans. Then over to you.
    go(labP, 100); await step(bot.walkTo(labP.clone().add(new THREE.Vector3(0, 0, 6)), { maxDur: 2.5 }));
    bot.point(labP.clone().add(new THREE.Vector3(0, 3, 0)), 2.6); api.highlight('#strip [data-lab]', true);
    await step(say(`${T.lab} ${T.overToYou}`)); api.highlight('#strip [data-lab]', false); bot.cheer();
  } catch (e) { if (e.message !== 'skip') throw e; }
  finally {
    api.setGlow?.(null); skipBtn.remove(); for (const s of ['#build', '#build .cats', '#strip [data-lab]', '#card .goal', '#card [data-flower]']) api.highlight(s, false);
    api.setAbort?.(null); world.setFlood(0); if (!aborted) { ui.florence(null); await (api.home ? api.home() : rig.overview(app.reduce ? 0.01 : 1.1)); }
  }
  return !skipped;
}
