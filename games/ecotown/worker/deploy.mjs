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
form.append('worker.js', new Blob([fs.readFileSync(path.join(here, 'worker.js'))], { type: 'application/javascript+module' }), 'worker.js');
form.append('metadata', new Blob([JSON.stringify({ main_module: 'worker.js', compatibility_date: '2025-01-01' })], { type: 'application/json' }));

const r = await (await fetch(API, { method: 'PUT', headers: auth, body: form })).json();
if (!r.success) { console.error('upload failed', JSON.stringify(r.errors)); process.exit(1); }
console.log('uploaded', files.length, 'files');
// workers.dev on, preview URLs off
const s = await (await fetch(API + '/subdomain', { method: 'POST', headers: { ...auth, 'Content-Type': 'application/json' }, body: JSON.stringify({ enabled: true, previews_enabled: false }) })).json();
console.log('workers.dev', s.success ? 'enabled' : JSON.stringify(s.errors));
