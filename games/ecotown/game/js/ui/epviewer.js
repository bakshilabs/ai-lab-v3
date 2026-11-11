// The story episodes in the game: plays the recorded cartoons (videos/episodes/*.mp4) before and after a mission,
// and lists all twelve under ☰ → Episodes. Rules:
//  - nothing is fetched until an episode is about to play (not the index, not a poster, not a video);
//  - always skippable (the Skip button, or Escape), captions on by default (the CC button turns them off);
//  - an episode is forced at most once: it is marked as seen in the save (G.eps) as soon as it starts;
//  - ☰ → Settings → "Story episodes" turns them off (for clubs on slow networks);
//  - a missing file, a browser that cannot play it or a stalled network never blocks the game: it carries on.
import { MISSIONS, episode, episodeOpen } from '../game/episodes.js';
import { stopSpeech } from './voice.js';

const DIR = 'videos/episodes/';
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export function createEpisodeViewer(app, { mute = () => {} } = {}) {
  let indexP = null, showing = null;
  const index = () => (indexP ||= fetch(DIR + 'index.json').then((r) => (r.ok ? r.json() : { episodes: {} })).catch(() => ({ episodes: {} })));
  const on = () => app.settings.episodes !== false;
  const savePrefs = () => { try { localStorage.setItem('ecotown.prefs', JSON.stringify(app.settings)); } catch { /* storage off */ } };

  // play one episode; resolves 'ended', 'skipped' or 'failed' (the game carries on in every case)
  async function play(id) {
    if (showing) return 'failed';
    const ep = episode(id); const info = (await index()).episodes?.[id];
    if (!ep || !info) return 'failed';
    const probe = document.createElement('video'); if (!probe.canPlayType || !probe.canPlayType('video/mp4; codecs="avc1.4d401f, mp4a.40.2"')) return 'failed';
    stopSpeech(); mute(true);
    const box = document.createElement('div'); box.id = 'episode'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-label', `Story: ${ep.title}`);
    box.innerHTML = `<div class="epframe"><video playsinline preload="auto" poster="${DIR}${esc(info.poster)}"></video>
      <p class="epcap" aria-live="off"></p><p class="epwait">Loading the story…</p>
      <button type="button" class="btn go epplay" data-play hidden>▶ Play the story</button></div>
      <div class="epbar"><span class="epname">Story ${ep.n} of 6 · ${esc(ep.title)}</span><button type="button" class="btn alt" data-cc aria-pressed="true">Captions: on</button><button type="button" class="btn go" data-skip>Skip ⏭</button></div>`;
    document.getElementById('app').appendChild(box); showing = box;
    const v = box.querySelector('video'), cap = box.querySelector('.epcap'), wait = box.querySelector('.epwait'), cc = box.querySelector('[data-cc]'), playBtn = box.querySelector('[data-play]');
    let captions = app.settings.epCaptions !== false; const paint = () => { cc.setAttribute('aria-pressed', String(captions)); cc.textContent = `Captions: ${captions ? 'on' : 'off'}`; cap.hidden = !captions; };
    paint(); cc.onclick = () => { captions = !captions; app.settings.epCaptions = captions; savePrefs(); paint(); };
    const cues = info.cues || []; let shown = null;
    const tick = () => { if (showing !== box) return; const t = v.currentTime; const c = cues.find((x) => t >= x.t0 && t < x.t1) || null; if (c !== shown) { shown = c; cap.innerHTML = c ? `${c.who !== 'Narrator' ? `<b>${esc(c.who)}:</b> ` : ''}${esc(c.text)}` : ''; cap.classList.toggle('on', !!c); } requestAnimationFrame(tick); };
    const result = await new Promise((res) => {
      let started = false; const done = (how) => res(how);
      const stall = setTimeout(() => { if (!started) done('failed'); }, 15000); // a stalled network: carry on with the game
      v.addEventListener('playing', () => { started = true; clearTimeout(stall); wait.hidden = true; playBtn.hidden = true; });
      v.addEventListener('ended', () => done('ended')); v.addEventListener('error', () => done('failed'));
      box.querySelector('[data-skip]').onclick = () => done('skipped');
      const key = (e) => { if (e.key === 'Escape') { e.preventDefault(); e.stopImmediatePropagation(); done('skipped'); } };
      addEventListener('keydown', key, true); box._off = () => { removeEventListener('keydown', key, true); clearTimeout(stall); };
      // tap the picture to pause and carry on
      v.onclick = () => { if (!started) return; if (v.paused) v.play().catch(() => {}); else v.pause(); };
      playBtn.onclick = () => v.play().catch(() => done('failed'));
      v.src = DIR + info.mp4;
      // browsers that refuse sound before a tap: offer a Play button rather than a silent or frozen film
      v.play().catch(() => { if (!started && showing === box) { wait.hidden = true; playBtn.hidden = false; playBtn.focus(); } });
      requestAnimationFrame(tick); setTimeout(() => box.querySelector('[data-skip]')?.focus(), 50);
    });
    box._off?.(); try { v.pause(); v.removeAttribute('src'); v.load(); } catch { /* */ } box.remove(); showing = null; mute(false);
    return result;
  }

  return {
    play,
    // from the mission flow (game.js): the first time only, when episodes are on, never in a challenge town
    async auto(id, G) {
      if (!on() || !G || G.challenge || G.full || (G.eps ||= {})[id]) return;
      const how = await play(id);
      if (how !== 'failed') { G.eps[id] = 1; G.save?.(); }
    },
    // ☰ → Episodes: all twelve, the ones not reached yet locked
    async menu(G) {
      for (;;) {
        const rows = MISSIONS.map((m, i) => `<li><span>${i + 1}</span>${['open', 'close'].map((k) => { const id = `${m}-${k}`; const ep = episode(id); const ok = episodeOpen(id, G);
          return `<button type="button" class="btn ${ok ? 'go' : 'alt'}" data-act="${ok ? `ep:${id}` : 'locked'}" ${ok ? '' : 'disabled'} aria-label="${ok ? 'Play' : 'Locked'}: ${esc(ep.title)}, ${k === 'open' ? 'before the mission' : 'after the mission'}">${ok ? '▶' : '🔒'} ${esc(ep.title)}<small>${k === 'open' ? 'before the mission' : ok ? 'after the mission' : 'finish the mission to unlock'}</small></button>`; }).join('')}</li>`).join('');
        const a = await app.ui.modal(`<div class="ribbon">🎬 Episodes</div><h2>Florence’s story</h2><p>Two short films for each AI Lab mission: one before, one after.</p><ol class="eplist">${rows}</ol><div class="row" style="justify-content:center"><button class="btn alt" data-act="close">Close</button></div>`);
        if (!a || !String(a).startsWith('ep:')) return;
        const id = a.slice(3); const how = await play(id);
        if (how === 'failed') { app.ui.caption?.('This film isn’t available here.', 3000); return; }
        if (G) { (G.eps ||= {})[id] = 1; G.save?.(); }
      }
    },
  };
}
