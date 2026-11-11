// Cuts the 60-second Eco Town trailer from the story episodes (videos/episodes/*.mp4) and the build films.
// Usage: node tools/trailer.mjs --work <scratch dir outside the repo> --voices <folder of episode voice clips <id>.<n>.wav>
//   The voice clips are the ones recorded by tests/video/episodes.mjs (its --work folder, sub-folder voice/).
//   The music is rendered fresh with the game's own chip engine, so it runs on under the cuts instead of jumping.
// Writes videos/trailer/eco-town-trailer.mp4, .jpg (poster) and .vtt (captions; the trailer is often watched muted).
import { createRequire } from 'module'; import fs from 'fs'; import path from 'path'; import http from 'http'; import { spawnSync } from 'child_process';
const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const args = process.argv.slice(2); const opt = (k, d) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : d; };
const here = path.dirname(new URL(import.meta.url).pathname); const game = path.join(here, '..');
const EP = path.join(game, 'videos', 'episodes'); const out = path.join(game, 'videos', 'trailer'); fs.mkdirSync(out, { recursive: true });
const work = opt('work'), voices = opt('voices');
if (!work || !voices) { console.error('Usage: node tools/trailer.mjs --work <dir> --voices <dir>'); process.exit(1); }
if (path.resolve(work).startsWith(path.resolve(game, '..', '..', '..'))) { console.error('--work must be outside the repository'); process.exit(1); }
fs.mkdirSync(work, { recursive: true });
const ff = (a) => { const r = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', ...a], { stdio: ['ignore', 'inherit', 'inherit'] }); if (r.status) throw new Error('ffmpeg failed: ' + a.join(' ')); };
const probe = (f) => +spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).stdout.toString().trim();
const FPS = 24, W = 960, H = 540;
const index = JSON.parse(fs.readFileSync(path.join(EP, 'index.json'))).episodes;

// ---------- the edit: three acts (Florence is sure / the children check / the fix), each opened by a card
const line = (ep, ...n) => ({ kind: 'clip', ep, n });
const EDIT = [
  { ...line('land-open', 0), pic: 3.6 }, // the episode's title badge is on screen until 3.5 s; the narrator talks over the island instead
  line('land-open', 3),
  line('homes-open', 2),
  line('power-open', 3),
  { kind: 'card', mood: 'lab', sfx: 'question', dur: 2.4, bg: ['power-close', 5.5], big: 'Sure is not<br>the same as <em>right</em>.' },
  line('land-close', 1),
  line('homes-close', 1),
  line('food-close', 1),
  line('power-close', 1, 2),
  { kind: 'card', mood: 'celebrate', sfx: 'sting', dur: 2.4, bg: ['food-close', 17], big: 'Catch the AI.<br><em>With evidence.</em>' },
  line('food-close', 4),
  line('power-close', 5),
  { kind: 'montage', films: [['wind', 3.2], ['orchard', 6.5], ['festival', 7.5]], each: 1.15 },
  { kind: 'end', dur: 6.2, bg: ['land-close', 16], say: ['power-close', 7] },
];

// ---------- 1. a static server, so the page can load the game's own modules (cards, music)
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.json': 'application/json' };
const srv = http.createServer((q, r) => { const f = path.join(game, decodeURIComponent(q.url.split('?')[0])); if (!f.startsWith(game) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r); });
await new Promise((r) => srv.listen(0, r)); const base = `http://localhost:${srv.address().port}/`;
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
await p.goto(base + 'tools/blank.html').catch(() => {}); // any page on the server will do for module imports

// ---------- 2. pictures: each piece becomes an intermediate clip with the same size, rate and format
const still = (ep, t, f) => { ff(['-ss', String(t), '-i', path.join(EP, ep + '.mp4'), '-frames:v', '1', '-q:v', '2', f]); return f; };
const enc = ['-r', String(FPS), '-vf', `scale=${W}:${H}:flags=lanczos,fps=${FPS},format=yuv420p`, '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '10', '-an'];
const fontUrl = base + 'fonts/bricolage.woff2', interUrl = base + 'fonts/inter.woff2';
async function card(html, bgFile, png) {
  const bg = 'data:image/jpeg;base64,' + fs.readFileSync(bgFile).toString('base64');
  await p.setContent(`<!doctype html><style>
    @font-face { font-family: B; src: url(${fontUrl}); } @font-face { font-family: I; src: url(${interUrl}); }
    html, body { margin: 0; width: ${W}px; height: ${H}px; overflow: hidden; }
    .bg { position: absolute; inset: -30px; background: url(${bg}) center/cover; filter: blur(9px) saturate(1.15) brightness(.62); }
    .wrap { position: absolute; inset: 0; display: grid; place-items: center; text-align: center; color: #fffaf0; font-family: B, sans-serif; }
    h1 { margin: 0; font-size: 70px; line-height: 1.02; font-weight: 800; letter-spacing: -.01em; text-shadow: 0 4px 0 rgba(40,25,10,.35), 0 10px 40px rgba(0,0,0,.35); }
    em { font-style: normal; color: #ffd23f; }
    .logo { font-size: 96px; } .leaf { display: inline-grid; place-items: center; width: 92px; height: 92px; border-radius: 50%; background: #2e9b5a; box-shadow: inset 0 -7px 0 #1f7a44; font-size: 52px; vertical-align: -14px; margin-right: 18px; }
    p { font-family: I, sans-serif; font-weight: 600; margin: 14px 0 0; font-size: 27px; color: #fffaf0; text-shadow: 0 2px 10px rgba(0,0,0,.5); }
    .tag { display: inline-block; margin-top: 22px; background: #fffaf0; color: #3b2a1e; font-family: I, sans-serif; font-weight: 700; font-size: 21px; border-radius: 999px; padding: 9px 22px; box-shadow: 0 4px 0 rgba(0,0,0,.18); }
  </style><div class="bg"></div><div class="wrap"><div>${html}</div></div>`);
  await p.evaluate(() => document.fonts.ready); await p.screenshot({ path: png });
}
// a still card with a slow push-in, faded from and to the cut
const cardClip = (png, dur, f, fadeOut = true) => ff(['-i', png, '-vf',
  `scale=${W * 2}:${H * 2},zoompan=z='1+0.0009*on':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${Math.ceil(dur * FPS)}:s=${W}x${H}:fps=${FPS},fade=in:st=0:d=0.25${fadeOut ? `,fade=out:st=${dur - 0.25}:d=0.25` : ''},format=yuv420p`,
  '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '10', '-r', String(FPS), f]);

const parts = []; const voiceAt = []; const cues = []; const moods = [{ mood: 'day', t: 0 }]; const sfx = [{ name: 'sting', t: 0.05 }];
let T = 0;
for (const [k, e] of EDIT.entries()) {
  const f = path.join(work, `part${String(k).padStart(2, '0')}.mp4`);
  if (e.kind === 'clip') {
    const cs = e.n.map((i) => index[e.ep].cues[i]);
    const a = Math.max(0, cs[0].t0 - 0.3), z = Math.min(index[e.ep].duration - 0.05, cs.at(-1).t1 + 0.1); const dur = +(z - a).toFixed(3);
    ff(['-ss', (e.pic ?? a).toFixed(3), '-i', path.join(EP, e.ep + '.mp4'), '-t', dur.toFixed(3), ...enc, f]);
    e.n.forEach((i, j) => { voiceAt.push({ wav: path.join(voices, `${e.ep}.${i}.wav`), t: T + cs[j].t0 - a }); cues.push({ t0: T + cs[j].t0 - a, t1: T + cs[j].t1 - a - 0.2, who: cs[j].who, text: cs[j].text }); });
    T += probe(f);
  } else if (e.kind === 'card') {
    const png = path.join(work, `card${k}.png`); await card(`<h1>${e.big}</h1>`, still(e.bg[0], e.bg[1], path.join(work, `bg${k}.jpg`)), png);
    cardClip(png, e.dur, f); moods.push({ mood: e.mood, t: T }); sfx.push({ name: e.sfx, t: T + 0.1 });
    cues.push({ t0: T + 0.2, t1: T + e.dur - 0.2, who: '', text: e.big.replace(/<br>/g, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() });
    T += probe(f);
  } else if (e.kind === 'montage') {
    const subs = e.films.map(([v, t], j) => { const s = path.join(work, `m${k}-${j}.mp4`); ff(['-ss', String(t), '-i', path.join(game, 'videos', v + '.mp4'), '-t', String(e.each), ...enc, s]); return s; });
    const lst = path.join(work, `m${k}.txt`); fs.writeFileSync(lst, subs.map((s) => `file '${s}'`).join('\n')); ff(['-f', 'concat', '-safe', '0', '-i', lst, '-c', 'copy', f]);
    sfx.push({ name: 'pop', t: T + 0.02 }, { name: 'pop', t: T + e.each }, { name: 'pop', t: T + 2 * e.each });
    T += probe(f);
  } else if (e.kind === 'end') {
    const png = path.join(work, `card${k}.png`);
    await card(`<div class="logo"><h1 style="font-size:100px"><span class="leaf">🌿</span>Eco Town</h1></div>
      <p>Build a green island. Check the AI planner.</p>
      <div class="tag">Ages 8–12 and 13–17 · a full day of play for clubs and schools</div>
      <p style="font-size:19px;margin-top:18px;opacity:.9">No accounts · no adverts · no chat · works offline</p>`, still(e.bg[0], e.bg[1], path.join(work, `bg${k}.jpg`)), png);
    cardClip(png, e.dur, f, true);
    const c = index[e.say[0]].cues[e.say[1]]; voiceAt.push({ wav: path.join(voices, `${e.say[0]}.${e.say[1]}.wav`), t: T + 0.5 });
    cues.push({ t0: T + 0.5, t1: T + 0.5 + (c.t1 - c.t0) - 0.2, who: c.who, text: c.text }); sfx.push({ name: 'sting', t: T + e.dur - 2.2 });
    T += probe(f);
  }
  parts.push(f); console.log('part', k, e.kind, e.ep || '', T.toFixed(2) + ' s');
}
for (const v of voiceAt) if (!fs.existsSync(v.wav)) { console.error('missing voice clip', v.wav); process.exit(1); }
const dur = T;
const video = path.join(work, 'video.mp4');
fs.writeFileSync(path.join(work, 'parts.txt'), parts.map((f) => `file '${f}'`).join('\n'));
ff(['-f', 'concat', '-safe', '0', '-i', path.join(work, 'parts.txt'), '-c', 'copy', video]);

// ---------- 3. music (one bed per act, cross-faded) and sound effects, from the game's own chip engine
const b64 = await p.evaluate(async ({ dur, moods, sfx }) => {
  const { createEngine, makeSfx, renderSong } = await import('/js/engine/audio.js'); const { note, run } = await import('/js/engine/chip.js');
  const SR = 44100, N = Math.ceil(SR * (dur + 0.3));
  // each act's song is rendered from its own first beat, then laid into the bed with a short cross-fade
  const bed = new Float32Array(N); const FADE = Math.round(0.35 * SR);
  for (const [i, m] of moods.entries()) {
    const end = moods[i + 1]?.t ?? dur; const len = Math.ceil((end - m.t + 0.4) * SR);
    const c = new OfflineAudioContext(1, len, SR); const ME = createEngine(c); renderSong(ME, m.mood, end - m.t + 0.5); ME.music.gain.value = 0.2;
    const buf = (await c.startRendering()).getChannelData(0); const at = Math.round(m.t * SR);
    for (let j = 0; j < len && at + j < N; j++) {
      let g = Math.min(1, j / FADE); if (i < moods.length - 1) g *= Math.min(1, (len - j) / FADE); else g *= Math.min(1, Math.max(0, (dur - 0.1) * SR - (at + j)) / (2.2 * SR));
      bed[at + j] += buf[j] * g;
    }
  }
  const sctx = new OfflineAudioContext(1, N, SR); const SE = createEngine(sctx); const clock = { t: 0 };
  const fx = makeSfx({ fx: SE.fx, ctx: { get currentTime() { return clock.t; } } });
  const own = {
    sting(t) { run(SE.fx, [[67, 0.09], [72, 0.09], [76, 0.09], [74, 0.09], [79, 0.26]], t, { vol: 0.1, duty: 0.25 }); note(SE.fx, { ch: 't', midi: 48, t, dur: 0.5, vol: 0.12 }); note(SE.fx, { ch: 't', midi: 55, t: t + 0.36, dur: 0.3, vol: 0.1 }); },
    question(t) { run(SE.fx, [[76, 0.12], [72, 0.12], [77, 0.12], [83, 0.4]], t, { vol: 0.09, duty: 0.125 }); note(SE.fx, { ch: 't', midi: 53, t: t + 0.36, dur: 0.5, vol: 0.1 }); },
  };
  for (const s of sfx) { clock.t = s.t; if (own[s.name]) own[s.name](s.t + 0.005); else fx[s.name]?.(); }
  const sb = await sctx.startRendering();
  const a = bed, c2 = sb.getChannelData(0); const pcm = new Int16Array(N * 2);
  for (let i = 0; i < N; i++) { pcm[2 * i] = Math.max(-32767, Math.min(32767, Math.round(a[i] * 32767))); pcm[2 * i + 1] = Math.max(-32767, Math.min(32767, Math.round(c2[i] * 32767))); }
  const u8 = new Uint8Array(pcm.buffer); let s = ''; for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode(...u8.subarray(i, i + 0x8000)); return btoa(s);
}, { dur, moods, sfx });
await b.close(); srv.close();
const stems = path.join(work, 'stems.s16'); fs.writeFileSync(stems, Buffer.from(b64, 'base64')); // left = music, right = sound effects

// ---------- 4. mix: voices on top; the music dips under them (side-chain), then level the whole track
const inputs = ['-f', 's16le', '-ar', '44100', '-ac', '2', '-i', stems]; const vch = []; const vn = [];
voiceAt.forEach((v, i) => { inputs.push('-i', v.wav); vch.push(`[${i + 1}:a]aresample=44100,aformat=channel_layouts=mono,volume=2.2,adelay=${Math.round(v.t * 1000)}:all=1[v${i}]`); vn.push(`[v${i}]`); });
const wav = path.join(work, 'audio.wav');
ff([...inputs, '-filter_complex', [
  '[0:a]channelsplit=channel_layout=stereo[mus][fx]',
  ...vch,
  `${vn.join('')}amix=inputs=${vn.length}:normalize=0:duration=longest,apad=whole_dur=${dur.toFixed(3)},asplit=2[voc][key]`,
  '[mus]volume=1.25[mus2]', '[mus2][key]sidechaincompress=threshold=0.02:ratio=6:attack=40:release=380[duck]',
  `[duck][fx][voc]amix=inputs=3:normalize=0:duration=longest,alimiter=limit=0.89,volume=0.62[m]`,
].join(';'), '-map', '[m]', '-t', dur.toFixed(3), '-ar', '44100', '-ac', '1', wav]);

// ---------- 5. final file (two-pass H.264, about 4.5 MB), poster and captions
const mp4 = path.join(out, 'eco-town-trailer.mp4'); const AK = 96; const vk = Math.floor((4500 * 8) / dur - AK - 8); const log = path.join(work, 'tr.2pass');
const vf = ['-c:v', 'libx264', '-preset', 'slow', '-tune', 'animation', '-profile:v', 'main', '-pix_fmt', 'yuv420p', '-b:v', `${vk}k`, '-maxrate', `${Math.round(vk * 1.8)}k`, '-bufsize', `${vk * 3}k`, '-g', String(FPS * 2), '-passlogfile', log];
ff(['-i', video, ...vf, '-pass', '1', '-an', '-f', 'mp4', '/dev/null']);
ff(['-i', video, '-i', wav, ...vf, '-pass', '2', '-c:a', 'aac', '-b:a', `${AK}k`, '-ac', '1', '-movflags', '+faststart', '-shortest', mp4]);
ff(['-ss', String(dur - 3), '-i', video, '-frames:v', '1', '-q:v', '4', path.join(out, 'eco-town-trailer.jpg')]);
const ts = (s) => { const ms = Math.round(s * 1000); const h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, x = (ms % 60000) / 1000; return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${x.toFixed(3).padStart(6, '0')}`; };
fs.writeFileSync(path.join(out, 'eco-town-trailer.vtt'), 'WEBVTT\n\n' + cues.map((c, i) => `${i + 1}\n${ts(c.t0)} --> ${ts(c.t1)}\n${c.who ? `<v ${c.who}>${c.who}: ` : ''}${c.text}\n`).join('\n'));
console.log('trailer', mp4, `${dur.toFixed(1)} s`, `${(fs.statSync(mp4).size / 1024).toFixed(0)} KB`);
