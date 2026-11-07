// Uploads dist/ as the "ecotown" Cloudflare Worker (one API call; works behind a token-injecting proxy).
// Usage: node build.mjs && CF_ACCOUNT_ID=... node worker/deploy.mjs
// The API token is sent by the environment's proxy (or set CF_API_TOKEN when running elsewhere).
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const here = path.dirname(new URL(import.meta.url).pathname);
const DIST = path.join(here, '..', 'dist');
const ACCOUNT = process.env.CF_ACCOUNT_ID; if (!ACCOUNT) throw new Error('Set CF_ACCOUNT_ID');
const API = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT}/workers/scripts/ecotown`;
const auth = { Authorization: `Bearer ${process.env.CF_API_TOKEN || 'proxy-injected'}` };

const form = new FormData(); const files = [];
const walk = (d) => { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (f !== '_headers') files.push(p); } };
walk(DIST);
// voice packs are too big for the Worker script: they go to Workers KV (namespace "ecotown-voice"), served only with a session
const VOICE_FILES = files.filter((p) => p.includes(`${path.sep}voice${path.sep}`)); for (const v of VOICE_FILES) files.splice(files.indexOf(v), 1);
// so do Florence's portrait, the build pictures and the build videos (key = their path, e.g. videos/timber.mp4)
const MEDIA_FILES = files.filter((p) => /^(img|videos)\//.test(path.relative(DIST, p).split(path.sep).join('/'))); for (const m of MEDIA_FILES) files.splice(files.indexOf(m), 1);
const KVAPI = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT}/storage/kv/namespaces`;
let kvId = null;
if (VOICE_FILES.length) {
  const list = await (await fetch(KVAPI + '?per_page=100', { headers: auth })).json();
  if (!list.success) { console.error('KV list failed', JSON.stringify(list.errors)); process.exit(1); }
  kvId = list.result.find((n) => n.title === 'ecotown-voice')?.id;
  if (!kvId) { const c = await (await fetch(KVAPI, { method: 'POST', headers: { ...auth, 'Content-Type': 'application/json' }, body: JSON.stringify({ title: 'ecotown-voice' }) })).json(); if (!c.success) { console.error('KV create failed', JSON.stringify(c.errors)); process.exit(1); } kvId = c.result.id; }
  // only upload files that aren't there yet (pack bins are content-hashed; the small index files always)
  const keys = new Set(); let cursor = ''; do { const r = await (await fetch(`${KVAPI}/${kvId}/keys?limit=1000${cursor ? '&cursor=' + cursor : ''}`, { headers: auth })).json(); for (const k of r.result || []) keys.add(k.name); cursor = r.result_info?.cursor || ''; } while (cursor);
  for (const f of VOICE_FILES) {
    const name = path.basename(f); if (name.endsWith('.bin') && keys.has(name)) continue;
    // curl, not fetch: large binary uploads through the environment's proxy are reliable this way
    const r = JSON.parse(execFileSync('curl', ['-sS', '-X', 'PUT', '-H', `Authorization: ${auth.Authorization}`, '-H', 'Content-Type: application/octet-stream', '--data-binary', '@' + f, `${KVAPI}/${kvId}/values/${encodeURIComponent(name)}`]).toString());
    if (!r.success) { console.error('KV upload failed', name, JSON.stringify(r.errors)); process.exit(1); } console.log('voice uploaded', name, fs.statSync(f).size);
  }
}
// curl with retries: long uploads through the proxy can be cut off mid-transfer (a tunnel drain); try again with backoff
function curlRetry(args) {
  for (let i = 0; ; i++) {
    try { return execFileSync('curl', args, { encoding: 'utf8', maxBuffer: 1 << 26 }); }
    catch (e) { if (i >= 4) throw e; const wait = 2 ** (i + 1); console.log(`  upload interrupted (${(e.stderr || e.message).toString().trim().slice(0, 80)}); retrying in ${wait}s`); execFileSync('sleep', [String(wait)]); }
  }
}
// media: upload only what changed since the last deploy (a manifest of content hashes is kept in KV)
if (kvId && MEDIA_FILES.length) {
  const { createHash } = await import('node:crypto');
  let old = {}; try { const r = await fetch(`${KVAPI}/${kvId}/values/media-manifest.json`, { headers: auth }); if (r.ok) old = await r.json(); } catch { /* first deploy */ }
  const next = {};
  for (const f of MEDIA_FILES) {
    const key = path.relative(DIST, f).split(path.sep).join('/'); const h = createHash('sha256').update(fs.readFileSync(f)).digest('hex').slice(0, 16); next[key] = h;
    if (old[key] === h) continue;
    const r = JSON.parse(curlRetry(['-sS', '-X', 'PUT', '-H', `Authorization: ${auth.Authorization}`, '-H', 'Content-Type: application/octet-stream', '--data-binary', '@' + f, `${KVAPI}/${kvId}/values/${encodeURIComponent(key)}`]));
    if (!r.success) { console.error('KV upload failed', key, JSON.stringify(r.errors)); process.exit(1); } console.log('media uploaded', key, fs.statSync(f).size);
  }
  const mf = path.join(DIST, '..', '.media-manifest.json'); fs.writeFileSync(mf, JSON.stringify(next));
  JSON.parse(curlRetry(['-sS', '-X', 'PUT', '-H', `Authorization: ${auth.Authorization}`, '-H', 'Content-Type: application/json', '--data-binary', '@' + mf, `${KVAPI}/${kvId}/values/media-manifest.json`])); fs.rmSync(mf);
}
let index = 'export default {\n';
files.forEach((p, i) => {
  const rel = '/' + path.relative(DIST, p).split(path.sep).join('/'); const name = `f${i}`;
  const text = /\.(html|js|css|json)$/.test(p);
  form.append(name, new Blob([fs.readFileSync(p)], { type: text ? 'text/plain' : 'application/octet-stream' }), name);
  index = `import ${name} from './${name}';\n` + index + `  ${JSON.stringify(rel)}: ${name},\n`;
});
index += '};\n';
form.append('files.js', new Blob([index], { type: 'application/javascript+module' }), 'files.js');
for (const m of ['worker.js', 'store.js', 'codes.js']) form.append(m, new Blob([fs.readFileSync(path.join(here, m))], { type: 'application/javascript+module' }), m);
form.append('admin.html', new Blob([fs.readFileSync(path.join(here, 'admin.html'))], { type: 'text/plain' }), 'admin.html');
const upload = async (withMigration) => {
  const f = new FormData(); for (const [k, v] of form.entries()) f.append(k, v, k);
  f.append('metadata', new Blob([JSON.stringify({ main_module: 'worker.js', compatibility_date: '2025-01-01',
    bindings: [{ type: 'durable_object_namespace', name: 'CODES', class_name: 'CodeStore' }, ...(kvId ? [{ type: 'kv_namespace', name: 'VOICE', namespace_id: kvId }] : [])],
    keep_bindings: ['secret_text'], ...(withMigration ? { migrations: { new_tag: 'v1', new_sqlite_classes: ['CodeStore'] } } : {}) })], { type: 'application/json' }));
  return (await fetch(API, { method: 'PUT', headers: auth, body: f })).json();
};
// first deploy creates the CodeStore class (migration v1); later deploys must not repeat it
let r = await upload(true);
if (!r.success && JSON.stringify(r.errors).toLowerCase().includes('migration')) r = await upload(false);
if (!r.success) { console.error('upload failed', JSON.stringify(r.errors)); process.exit(1); }
console.log('uploaded', files.length, 'files');
// workers.dev on, preview URLs off
const s = await (await fetch(API + '/subdomain', { method: 'POST', headers: { ...auth, 'Content-Type': 'application/json' }, body: JSON.stringify({ enabled: true, previews_enabled: false }) })).json();
console.log('workers.dev', s.success ? 'enabled' : JSON.stringify(s.errors));
