// Eco Town on Cloudflare Workers.
//  - Students: passcode page at "/", then the protected game (only with a valid session cookie).
//    One active session per passcode (newest login wins), checked on every file and every heartbeat.
//  - Admin (the company): /admin, behind Cloudflare Access AND verified here (Access login token).
import FILES from './files.js';
import ADMIN_HTML from './admin.html';
export { CodeStore } from './store.js';

const TEAM = 'https://lively-silence-ec13.cloudflareaccess.com';
const AUD = '2fd6668e3bbe8607cd949c86d1da34d104d9486ff85529c348f09fdb581987dc';
const COOKIE = 'eco_s';
const BASE = {
  'Cache-Control': 'no-store, max-age=0', 'X-Robots-Tag': 'noindex, nofollow, noarchive', 'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer', 'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; media-src 'self' blob:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'",
};
const TYPES = { png: 'image/png', jpg: 'image/jpeg', mp4: 'video/mp4', html: 'text/html; charset=utf-8', js: 'text/javascript; charset=utf-8', css: 'text/css; charset=utf-8', json: 'application/json', bin: 'application/octet-stream', woff2: 'font/woff2', vtt: 'text/vtt; charset=utf-8' };
const json = (o, status = 200, extra = {}) => new Response(JSON.stringify(o), { status, headers: { ...BASE, 'Content-Type': 'application/json', ...extra } });
const html = (s, status = 200) => new Response(s, { status, headers: { ...BASE, 'Content-Type': TYPES.html } });

// ---------------- Cloudflare Access token check (admin)
let keys = null, keysAt = 0;
const b64u = (s) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4)), (c) => c.charCodeAt(0));
async function accessOK(req, env) {
  if (env.ADMIN_TEST_KEY && req.headers.get('X-Admin-Test-Key') === env.ADMIN_TEST_KEY) return true; // temporary test key (removed after testing)
  const token = req.headers.get('Cf-Access-Jwt-Assertion') || (req.headers.get('Cookie') || '').match(/CF_Authorization=([^;]+)/)?.[1];
  if (!token) return false;
  try {
    const [h, p, sig] = token.split('.'); const header = JSON.parse(new TextDecoder().decode(b64u(h))); const claims = JSON.parse(new TextDecoder().decode(b64u(p)));
    if (!keys || Date.now() - keysAt > 3600e3) { keys = (await (await fetch(TEAM + '/cdn-cgi/access/certs')).json()).keys; keysAt = Date.now(); }
    const jwk = keys.find((k) => k.kid === header.kid); if (!jwk || header.alg !== 'RS256') return false;
    const key = await crypto.subtle.importKey('jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
    const ok = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, b64u(sig), new TextEncoder().encode(h + '.' + p));
    const aud = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
    return ok && aud.includes(AUD) && claims.iss === TEAM && claims.exp * 1000 > Date.now();
  } catch { return false; }
}

const store = (env) => env.CODES.get(env.CODES.idFromName('main'));
const recent = new Map(); // session -> time of its last successful check in this Worker instance
// files whose name carries a hash of their contents never change: the player's own browser may keep them for a week
// (the page itself is never stored, so the game still can't start without a valid passcode)
const KEEP = { 'Cache-Control': 'private, max-age=604800, immutable' };
const hashed = (f) => /^\/assets\/(app|m)-[a-f0-9]{8,}\.[a-z]+$/.test(f) || /^\/voice\/pack-[a-z]+-[a-f0-9]{8,}\.bin$/.test(f);
const sessionOf = (req) => (req.headers.get('Cookie') || '').match(new RegExp(COOKIE + '=([^;]+)'))?.[1] || '';
const MESSAGES = {
  unknown: 'That passcode wasn’t recognised. Check it and try again.', revoked: 'This passcode has been switched off. Ask your teacher.',
  not_started: 'This passcode isn’t active yet. Ask your teacher when it starts.', expired: 'Your free access has ended. Ask your teacher.',
  too_many: 'Too many tries. Please wait 10 minutes and try again.', none: 'Please log in with your passcode.', replaced: 'This passcode is now being used on another device. Log in again to play here.',
};

export default {
  async fetch(req, env) {
    const url = new URL(req.url); const p = url.pathname;

    // ---------------- admin (company only)
    if (p === '/admin' || p.startsWith('/admin/')) {
      if (!(await accessOK(req, env))) return html('<h1>Admin login required</h1>', 403);
      if (p === '/admin' || p === '/admin/') return html(ADMIN_HTML);
      const S = store(env);
      try {
        if (p === '/admin/api/batches' && req.method === 'GET') return json(await S.call('listBatches'));
        if (p === '/admin/api/batches' && req.method === 'POST') return json(await S.call('createBatch', await req.json()));
        const m = p.match(/^\/admin\/api\/batches\/([a-f0-9]+)(\/codes|\/add)?$/);
        if (m && !m[2] && req.method === 'PATCH') return json(await S.call('updateBatch', m[1], await req.json()));
        if (m && !m[2] && req.method === 'DELETE') { await S.call('deleteBatch', m[1]); return json({ ok: true }); }
        if (m && m[2] === '/codes') return json(await S.call('listCodes', m[1]));
        if (m && m[2] === '/add' && req.method === 'POST') return json(await S.call('addCodes', m[1], (await req.json()).count));
        const c = p.match(/^\/admin\/api\/codes\/([A-Z0-9-]+)$/);
        if (c && req.method === 'PATCH') return json(await S.call('updateCode', c[1], await req.json()));
      } catch (e) { return json({ error: String(e.message || e).replace(/^Error: /, '') }, 400); }
      return json({ error: 'not found' }, 404);
    }

    // ---------------- student API
    if (p === '/api/login' && req.method === 'POST') {
      let code = ''; try { code = (await req.json()).code; } catch { /* */ }
      const r = await store(env).call('login', code, req.headers.get('CF-Connecting-IP') || 'unknown');
      if (!r.ok) return json({ ok: false, reason: r.reason, message: MESSAGES[r.reason] || 'Sorry, that didn’t work.' }, 401);
      return json({ ok: true, ends: r.ends }, 200, { 'Set-Cookie': `${COOKIE}=${r.session}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=2592000` });
    }
    if (p === '/api/heartbeat') {
      const r = await store(env).call('check', sessionOf(req));
      return r.ok ? json({ ok: true }) : json({ ok: false, reason: r.reason, message: MESSAGES[r.reason] || MESSAGES.replaced }, 409);
    }
    if (p === '/api/logout') { await store(env).call('logout', sessionOf(req)); return json({ ok: true }, 200, { 'Set-Cookie': `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0` }); }

    // ---------------- game files: only with a valid session
    const file = p === '/' ? '/index.html' : p;
    // The page itself and every heartbeat ask the code store. The other files of one page load (about a hundred)
    // reuse a recent "yes" for a minute, so a class starting together is one store call each, not a hundred.
    const sess = sessionOf(req); const now = Date.now(); const hit = file !== '/index.html' && recent.get(sess);
    const r = hit && now - hit < 60e3 ? { ok: true } : await store(env).call('check', sess, now, { touch: file === '/index.html' });
    if (r.ok && !hit) { if (recent.size > 5000) recent.clear(); recent.set(sess, now); } else if (!r.ok) recent.delete(sess);
    if (!r.ok) {
      if (file === '/index.html') return html(loginPage(r.reason === 'none' ? '' : MESSAGES[r.reason] || ''));
      return new Response('Login required', { status: 403, headers: { ...BASE, 'Content-Type': 'text/plain' } });
    }
    // recorded voices live in Workers KV (too big for the script); same session rule as every other game file
    if (file.startsWith('/voice/') && env.VOICE) {
      const name = file.slice(7); if (!/^pack-[a-z]+(-[a-f0-9]+)?\.(json|bin)$/.test(name)) return new Response('Not found', { status: 404, headers: BASE });
      const v = await env.VOICE.get(name, 'arrayBuffer'); if (!v) return new Response('Not found', { status: 404, headers: BASE });
      return new Response(v, { headers: { ...BASE, ...(hashed(file) ? KEEP : {}), 'Content-Type': name.endsWith('.json') ? 'application/json' : 'audio/mpeg' } });
    }
    // Florence's portrait, build pictures, build videos and the story episodes (videos/episodes/) also live in KV. Videos need byte ranges (Safari/iPad).
    if (/^\/(img|videos)\//.test(file) && env.VOICE) {
      const key = file.slice(1); if (!/^(img\/(thumbs\/)?[a-z0-9_-]+\.png|videos\/((episodes|trailer)\/)?[a-z0-9_-]+\.(mp4|jpg|json|vtt))$/.test(key)) return new Response('Not found', { status: 404, headers: BASE });
      const v = await env.VOICE.get(key, 'arrayBuffer'); if (!v) return new Response('Not found', { status: 404, headers: BASE });
      const type = TYPES[key.split('.').pop()] || 'application/octet-stream';
      const m = /^bytes=(\d*)-(\d*)$/.exec(req.headers.get('Range') || '');
      if (m && (m[1] || m[2])) {
        const size = v.byteLength; let a = m[1] ? +m[1] : size - +m[2]; let b = m[1] && m[2] ? +m[2] : size - 1;
        if (a < 0) a = 0; if (b >= size) b = size - 1;
        if (a > b || a >= size) return new Response(null, { status: 416, headers: { ...BASE, 'Content-Range': `bytes */${size}` } });
        return new Response(v.slice(a, b + 1), { status: 206, headers: { ...BASE, 'Content-Type': type, 'Accept-Ranges': 'bytes', 'Content-Range': `bytes ${a}-${b}/${size}`, 'Content-Length': String(b - a + 1) } });
      }
      return new Response(v, { headers: { ...BASE, 'Content-Type': type, 'Accept-Ranges': 'bytes' } });
    }
    const body = FILES[file];
    if (body === undefined) return new Response('Not found', { status: 404, headers: BASE });
    return new Response(body, { headers: { ...BASE, ...(hashed(file) ? KEEP : {}), 'Content-Type': TYPES[file.split('.').pop()] || 'application/octet-stream' } });
  },
};

function loginPage(msg) {
  return `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Eco Town</title>
<style>
*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;font:500 18px/1.4 system-ui,-apple-system,Segoe UI,sans-serif;color:#3b2a1e;background:radial-gradient(ellipse at top,#bfe3ff,#3f8fe6)}
.card{background:#fffaf0;border-radius:28px;padding:30px 28px;width:min(440px,calc(100vw - 28px));box-shadow:0 14px 40px rgba(0,0,0,.25),inset 0 0 0 2px #e6d3b0;text-align:center}
h1{margin:0 0 4px;font-size:2.4em;letter-spacing:-.02em}h1 span{color:#2e9b5a}p{color:#7a6450;margin:6px 0 18px;font-weight:600}
input{width:100%;font:800 1.5em/1 system-ui,sans-serif;text-align:center;letter-spacing:.06em;text-transform:uppercase;padding:14px;border-radius:16px;border:0;box-shadow:inset 0 0 0 3px #e6d3b0;color:#3b2a1e;background:#fff}
input:focus{outline:none;box-shadow:inset 0 0 0 3px #2e9b5a}
button{margin-top:14px;width:100%;min-height:54px;border:0;border-radius:16px;background:#2e9b5a;color:#fff;font:800 1.1em system-ui,sans-serif;box-shadow:inset 0 -4px 0 #1f7a44;cursor:pointer}
button[disabled]{opacity:.6}.msg{min-height:1.4em;margin-top:12px;color:#b0331f;font-weight:700}.chip{display:inline-block;background:#2b3a55;color:#fff;border-radius:999px;padding:3px 12px;font-weight:800;font-size:.7em;letter-spacing:.1em}
</style></head><body><form class="card" id="f" autocomplete="off"><span class="chip">A DELTAOPS LEARNING AI LAB</span><h1>Eco <span>Town</span></h1><p>Type the passcode your teacher gave you.</p>
<input id="c" name="code" placeholder="OTTER-1234" maxlength="24" autofocus aria-label="Passcode"><button id="b" type="submit">Start ➜</button><div class="msg" id="m" role="status">${msg.replace(/</g, '&lt;')}</div></form>
<script>
const f=document.getElementById('f'),b=document.getElementById('b'),m=document.getElementById('m');
f.onsubmit=async(e)=>{e.preventDefault();b.disabled=true;m.textContent='';
 try{const r=await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code:document.getElementById('c').value})});const d=await r.json();
 if(d.ok){location.replace('/');return;}m.textContent=d.message;}catch{m.textContent='Could not connect. Check the internet and try again.';}b.disabled=false;};
</script></body></html>`;
}
