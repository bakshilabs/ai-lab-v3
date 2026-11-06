// Uploads dist/ as the "ecotown" Cloudflare Worker (one API call; works behind a token-injecting proxy).
// Usage: node build.mjs && CF_ACCOUNT_ID=... node worker/deploy.mjs
// The API token is sent by the environment's proxy (or set CF_API_TOKEN when running elsewhere).
import fs from 'node:fs';
import path from 'node:path';

const here = path.dirname(new URL(import.meta.url).pathname);
const DIST = path.join(here, '..', 'dist');
const ACCOUNT = process.env.CF_ACCOUNT_ID; if (!ACCOUNT) throw new Error('Set CF_ACCOUNT_ID');
const API = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT}/workers/scripts/ecotown`;
const auth = { Authorization: `Bearer ${process.env.CF_API_TOKEN || 'proxy-injected'}` };

const form = new FormData(); const files = [];
const walk = (d) => { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (f !== '_headers') files.push(p); } };
walk(DIST);
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
    bindings: [{ type: 'durable_object_namespace', name: 'CODES', class_name: 'CodeStore' }],
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
