// Eco Town on Cloudflare Workers: serves the protected build (dist/), bundled into this Worker by
// worker/deploy.mjs. Every request must carry a valid Cloudflare Access login token for the Eco Town
// app; without one nothing is served (defence in depth, even if Access were ever misconfigured).
import FILES from './files.js';

const TEAM = 'https://lively-silence-ec13.cloudflareaccess.com';
const AUD = '2fd6668e3bbe8607cd949c86d1da34d104d9486ff85529c348f09fdb581987dc';
const HEADERS = {
  'Cache-Control': 'no-store, max-age=0', 'X-Robots-Tag': 'noindex, nofollow, noarchive', 'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer', 'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",
};
const TYPES = { html: 'text/html; charset=utf-8', js: 'text/javascript; charset=utf-8', css: 'text/css; charset=utf-8', json: 'application/json', bin: 'application/octet-stream', woff2: 'font/woff2' };

let keys = null, keysAt = 0;
const b64u = (s) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4)), (c) => c.charCodeAt(0));
async function verify(token) {
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

export default {
  async fetch(req) {
    const url = new URL(req.url);
    const token = req.headers.get('Cf-Access-Jwt-Assertion') || (req.headers.get('Cookie') || '').match(/CF_Authorization=([^;]+)/)?.[1];
    if (!token || !(await verify(token))) return new Response('Login required.', { status: 403, headers: { ...HEADERS, 'Content-Type': 'text/plain' } });
    const path = url.pathname === '/' ? '/index.html' : url.pathname;
    const body = FILES[path];
    if (body === undefined) return new Response('Not found', { status: 404, headers: HEADERS });
    return new Response(body, { headers: { ...HEADERS, 'Content-Type': TYPES[path.split('.').pop()] || 'application/octet-stream' } });
  },
};
