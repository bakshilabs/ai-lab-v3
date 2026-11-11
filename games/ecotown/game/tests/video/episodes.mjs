// Records the story episodes (js/game/episodes.js): voices, pictures, music and sound, captions, poster and index.
// Usage: node tests/video/episodes.mjs <baseUrl> [episode ids…] --work <scratch dir> --kokoro <dir>
//          [--force] [--stills 2,8,14|shots] [--remix] [--tier high] [--w 960 --h 540] [--kb 1450]
//   <baseUrl>   a static server for games/ecotown/game, e.g. http://localhost:8771/
//   --work      a scratch folder OUTSIDE the repository (voice clips, intermediate video, audio stems)
//   --kokoro    folder with Kokoro's model.onnx and voices file (see voice/README.md); without it the voices
//               are not recorded and an episode whose lines have no clip is refused (never a robot voice instead)
//   --remix     only mix the sound again (from the stems kept in --work) under the finished pictures
//   --stills    only save still pictures at these seconds into <work>/stills/<id>-<t>.jpg (for looking at framing)
// For each episode it writes videos/episodes/<id>.mp4 (H.264 + AAC, faststart), <id>.jpg (poster), <id>.vtt
// (captions), and then videos/episodes/index.json and timing.json (the recorded length of every line).
// One episode is about 35 s of film: in software 3D that is roughly 12 to 20 minutes of rendering.
import { createRequire } from 'module'; import fs from 'fs'; import path from 'path'; import { spawn, spawnSync } from 'child_process';
import { EPISODES, CAST, schedule, vtt, sayText } from '../../js/game/episodes.js';
const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const args = process.argv.slice(2); const flag = (k) => args.includes('--' + k); const opt = (k, d) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : d; };
const VAL = new Set(['work', 'kokoro', 'stills', 'tier', 'w', 'h', 'kb', 'fps']);
const pos = args.filter((a, i) => !a.startsWith('--') && !(i > 0 && args[i - 1].startsWith('--') && VAL.has(args[i - 1].slice(2))));
const base = pos[0] || 'http://localhost:8771/'; const ids = pos.slice(1).length ? pos.slice(1) : EPISODES.map((e) => e.id);
const FPS = +opt('fps', 24), W = +opt('w', 960), H = +opt('h', 540), TIER = opt('tier', 'high'), KB = +opt('kb', 1450);
const here = path.dirname(new URL(import.meta.url).pathname); const game = path.join(here, '..', '..');
const out = path.join(game, 'videos', 'episodes'); fs.mkdirSync(out, { recursive: true });
const work = opt('work'); if (!work) { console.error('Give a scratch folder: --work <dir>'); process.exit(1); }
if (path.resolve(work).startsWith(path.resolve(game, '..', '..', '..'))) { console.error('--work must be outside the repository'); process.exit(1); }
fs.mkdirSync(path.join(work, 'stills'), { recursive: true });
const ff = (a) => { const r = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', ...a], { stdio: ['ignore', 'inherit', 'inherit'] }); if (r.status) throw new Error('ffmpeg failed: ' + a.join(' ')); };
const probe = (f) => +spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).stdout.toString().trim();

// ---------- 1. voices (all episodes: clips are cached, and timing.json must list every line)
const timingFile = path.join(out, 'timing.json');
const lines = []; for (const ep of EPISODES) for (const c of schedule(ep).cues) { const v = CAST[c.who]; lines.push({ key: c.key, voice: v.voice, lang: v.lang, speed: v.speed, pitch: v.pitch || 1, text: sayText(c.text) }); }
const kokoro = opt('kokoro');
if (kokoro) {
  const lf = path.join(work, 'lines.json'); fs.writeFileSync(lf, JSON.stringify(lines));
  const r = spawnSync('python3', [path.join(game, '..', 'voice', 'episodes.py'), kokoro, work, lf, timingFile], { stdio: 'inherit' });
  if (r.status) { console.error('Kokoro could not record the voices. Stopping (no substitute voice is used).'); process.exit(1); }
}
const durs = fs.existsSync(timingFile) ? JSON.parse(fs.readFileSync(timingFile)) : {};
const stills = opt('stills');

const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const index = fs.existsSync(path.join(out, 'index.json')) ? JSON.parse(fs.readFileSync(path.join(out, 'index.json'))) : { episodes: {} };
for (const id of ids) {
  const ep = EPISODES.find((e) => e.id === id); if (!ep) { console.log('no such episode', id); continue; }
  const mp4 = path.join(out, `${id}.mp4`); if (!stills && !flag('force') && fs.existsSync(mp4)) { console.log('skip', id); continue; }
  const cues = schedule(ep, durs).cues;
  if (!stills) { const missing = cues.filter((c) => !fs.existsSync(path.join(work, 'voice', c.key + '.wav'))); if (missing.length) { console.error(`${id}: ${missing.length} lines have no recorded voice (run with --kokoro). Not rendered.`); continue; } }
  if (flag('remix')) { remix(id, ep, cues); continue; }
  const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  await p.addInitScript(() => localStorage.setItem('ecotown.prefs', JSON.stringify({ quality: 'high', reduce: false, readAloud: false })));
  p.on('pageerror', (e) => console.log('[pageerror]', id, e.message)); p.on('console', (m) => m.type() === 'error' && !/404/.test(m.text()) && console.log('[console]', id, m.text()));
  await p.goto(`${base}index.html?episode=${id}&tier=${TIER}`); await p.waitForFunction(() => window.__ready === true || window.__error, null, { timeout: 240000 });
  const dur = await p.evaluate(() => window.__duration); const t0 = Date.now();
  const frame = async (t) => { await p.evaluate((t) => { window.__render(t); return new Promise((r) => requestAnimationFrame(() => r())); }, t); return p.screenshot({ type: 'jpeg', quality: 93 }); };
  if (stills) {
    const ts = stills === 'shots' ? (await p.evaluate(() => window.__timeline())).shots.flatMap(([a, z]) => [a + Math.min(1.2, (z - a) * 0.4), z - 0.25]) : stills.split(',').map(Number);
    for (const t of ts) { fs.writeFileSync(path.join(work, 'stills', `${id}-${String(t.toFixed(1)).padStart(5, '0')}.jpg`), await frame(Math.min(t, dur - 0.05))); }
    console.log('stills', id, ts.map((t) => t.toFixed(1)).join(' '), `(${dur.toFixed(1)} s film, ${((Date.now() - t0) / 1000).toFixed(0)} s)`); await p.close(); continue;
  }
  // ---------- 2. pictures: every frame, piped to a near-lossless intermediate file
  const n = Math.round(dur * FPS); const raw = path.join(work, `${id}.video.mp4`); const posterAt = Math.round(2.2 * FPS);
  const enc = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-vf', `scale=${W}:${H}:flags=lanczos,format=yuv420p`, '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '12', raw], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = 0; i < n; i++) {
    const buf = await frame(i / FPS);
    if (!enc.stdin.write(buf)) await new Promise((r) => enc.stdin.once('drain', r));
    if (i === posterAt) fs.writeFileSync(path.join(work, `${id}.poster.jpg`), buf);
    if (i % 120 === 0) console.log(id, `frame ${i}/${n}`, `${((Date.now() - t0) / 1000).toFixed(0)} s`);
  }
  enc.stdin.end(); await new Promise((r) => enc.on('close', r));
  const tl = await p.evaluate(() => window.__timeline());
  // ---------- 3. music and sound effects, rendered offline with the game's own chip engine (original tunes only)
  const b64 = await p.evaluate(async ({ dur, cues, sfx, music }) => {
    const { createEngine, makeSfx, renderSong } = await import('./js/engine/audio.js'); const { note, run } = await import('./js/engine/chip.js');
    const SR = 44100, N = Math.ceil(SR * (dur + 0.2));
    const mctx = new OfflineAudioContext(1, N, SR); const ME = createEngine(mctx); renderSong(ME, music, dur);
    // the music sits low and dips further under every spoken line, then fades out under the closing card
    const g = ME.music.gain; const HI = 0.2, LO = 0.075; g.setValueAtTime(0, 0); g.linearRampToValueAtTime(HI, 0.6);
    for (const c of cues) { g.setTargetAtTime(LO, Math.max(0.61, c.t0 - 0.12), 0.06); g.setTargetAtTime(HI, c.t1 + 0.15, 0.22); }
    g.setTargetAtTime(0, dur - 1.6, 0.45);
    const sctx = new OfflineAudioContext(1, N, SR); const SE = createEngine(sctx); const clock = { t: 0 };
    const fx = makeSfx({ fx: SE.fx, ctx: { get currentTime() { return clock.t; } } });
    const own = {
      // the episodes' own opening sting and "question" cue (written for these films)
      sting(t) { run(SE.fx, [[67, 0.09], [72, 0.09], [76, 0.09], [74, 0.09], [79, 0.26]], t, { vol: 0.1, duty: 0.25 }); note(SE.fx, { ch: 't', midi: 48, t, dur: 0.5, vol: 0.12 }); note(SE.fx, { ch: 't', midi: 55, t: t + 0.36, dur: 0.3, vol: 0.1 }); },
      question(t) { run(SE.fx, [[76, 0.12], [72, 0.12], [77, 0.12], [83, 0.4]], t, { vol: 0.09, duty: 0.125 }); note(SE.fx, { ch: 't', midi: 53, t: t + 0.36, dur: 0.5, vol: 0.1 }); },
    };
    for (const s of sfx) { clock.t = s.t; if (own[s.name]) own[s.name](s.t + 0.005); else fx[s.name]?.(); }
    const [mb, sb] = await Promise.all([mctx.startRendering(), sctx.startRendering()]);
    const a = mb.getChannelData(0), c2 = sb.getChannelData(0); const pcm = new Int16Array(N);
    for (let i = 0; i < N; i++) pcm[i] = Math.max(-32767, Math.min(32767, Math.round((a[i] + c2[i]) * 32767)));
    const u8 = new Uint8Array(pcm.buffer); let s = ''; for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode(...u8.subarray(i, i + 0x8000)); return btoa(s);
  }, { dur, cues: tl.cues, sfx: tl.sfx, music: tl.music });
  await p.close();
  const bedRaw = path.join(work, `${id}.bed.s16`); fs.writeFileSync(bedRaw, Buffer.from(b64, 'base64'));
  // ---------- 4. mix: each voice clip at its cue time, over the bed; then level the whole track
  const inputs = ['-f', 's16le', '-ar', '44100', '-ac', '1', '-i', bedRaw]; const chains = []; const names = ['[bed]'];
  chains.push('[0:a]volume=1.0[bed]');
  tl.cues.forEach((c, i) => { inputs.push('-i', path.join(work, 'voice', c.key + '.wav')); chains.push(`[${i + 1}:a]aresample=44100,volume=2.2,adelay=${Math.round(c.t0 * 1000)}:all=1[v${i}]`); names.push(`[v${i}]`); });
  const wav = path.join(work, `${id}.audio.wav`);
  ff([...inputs, '-filter_complex', `${chains.join(';')};${names.join('')}amix=inputs=${names.length}:normalize=0:duration=longest,alimiter=limit=0.89,volume=0.62,apad=whole_dur=${dur.toFixed(3)}[m]`, '-map', '[m]', '-t', dur.toFixed(3), '-ar', '44100', '-ac', '1', wav]);
  // ---------- 5. final file: two-pass H.264 sized for slow networks, AAC, faststart
  const AK = 64; const vk = Math.max(120, Math.floor((KB * 8) / dur - AK - 6)); const log = path.join(work, `${id}.2pass`);
  const vf = ['-c:v', 'libx264', '-preset', 'slow', '-tune', 'animation', '-profile:v', 'main', '-pix_fmt', 'yuv420p', '-b:v', `${vk}k`, '-maxrate', `${Math.round(vk * 1.8)}k`, '-bufsize', `${vk * 3}k`, '-g', String(FPS * 4), '-passlogfile', log];
  ff(['-i', raw, ...vf, '-pass', '1', '-an', '-f', 'mp4', '/dev/null']);
  ff(['-i', raw, '-i', wav, ...vf, '-pass', '2', '-c:a', 'aac', '-b:a', `${AK}k`, '-ac', '1', '-movflags', '+faststart', '-shortest', mp4]);
  ff(['-i', path.join(work, `${id}.poster.jpg`), '-q:v', '5', path.join(out, `${id}.jpg`)]);
  fs.writeFileSync(path.join(out, `${id}.vtt`), vtt(ep, durs));
  if (fs.existsSync(path.join(out, 'index.json'))) Object.assign(index.episodes, JSON.parse(fs.readFileSync(path.join(out, 'index.json'))).episodes); // another recorder may have added films meanwhile
  index.episodes[id] = { mission: ep.mission, kind: ep.kind, n: ep.n, title: ep.title, mp4: `${id}.mp4`, poster: `${id}.jpg`, vtt: `${id}.vtt`, duration: +probe(mp4).toFixed(2), bytes: fs.statSync(mp4).size,
    cues: tl.cues.map((c) => ({ t0: +c.t0.toFixed(2), t1: +(c.t1 + 0.25).toFixed(2), who: CAST[c.who].name, text: c.text })) };
  fs.writeFileSync(path.join(out, 'index.json'), JSON.stringify({ episodes: Object.fromEntries(EPISODES.filter((e) => index.episodes[e.id]).map((e) => [e.id, index.episodes[e.id]])) }, null, 1));
  console.log('recorded', id, `${n} frames in ${((Date.now() - t0) / 1000).toFixed(0)} s`, `${dur.toFixed(1)} s`, `${(fs.statSync(mp4).size / 1024).toFixed(0)} KB`);
}
await b.close();

// --remix: mix the sound again from the stems in the work folder and put it under the finished pictures
function remix(id, ep, cues) {
  const bedRaw = path.join(work, `${id}.bed.s16`), mp4 = path.join(out, `${id}.mp4`), wav = path.join(work, `${id}.audio.wav`), tmp = path.join(work, `${id}.remix.mp4`);
  if (!fs.existsSync(bedRaw) || !fs.existsSync(mp4)) { console.log('remix: nothing recorded yet for', id); return; }
  const dur = schedule(ep, durs).duration; const inputs = ['-f', 's16le', '-ar', '44100', '-ac', '1', '-i', bedRaw]; const chains = ['[0:a]volume=1.0[bed]']; const names = ['[bed]'];
  cues.forEach((c, i) => { inputs.push('-i', path.join(work, 'voice', c.key + '.wav')); chains.push(`[${i + 1}:a]aresample=44100,volume=2.2,adelay=${Math.round(c.t0 * 1000)}:all=1[v${i}]`); names.push(`[v${i}]`); });
  ff([...inputs, '-filter_complex', `${chains.join(';')};${names.join('')}amix=inputs=${names.length}:normalize=0:duration=longest,alimiter=limit=0.89,volume=0.62,apad=whole_dur=${dur.toFixed(3)}[m]`, '-map', '[m]', '-t', dur.toFixed(3), '-ar', '44100', '-ac', '1', wav]);
  ff(['-i', mp4, '-i', wav, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '64k', '-ac', '1', '-movflags', '+faststart', '-shortest', tmp]); fs.copyFileSync(tmp, mp4); fs.rmSync(tmp);
  const idx = JSON.parse(fs.readFileSync(path.join(out, 'index.json'))); idx.episodes[id].bytes = fs.statSync(mp4).size; idx.episodes[id].duration = +probe(mp4).toFixed(2); fs.writeFileSync(path.join(out, 'index.json'), JSON.stringify(idx, null, 1));
  console.log('remixed', id, `${(fs.statSync(mp4).size / 1024).toFixed(0)} KB`);
}
