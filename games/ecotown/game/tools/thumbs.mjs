// Renders the build buttons' pictures into img/thumbs/<item>.png (run after changing a builder).
// Needs the game served: node tools/thumbs.mjs http://localhost:8765/
import { createRequire } from 'module'; import fs from 'fs'; import path from 'path';
const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const base = process.argv[2] || 'http://localhost:8765/';
const out = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'img', 'thumbs'); fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: 800, height: 600 } });
await p.goto(base + 'index.html'); await p.waitForFunction(() => window.__eco, null, { timeout: 60000 });
const th = await p.evaluate(async () => { const { makeThumbs } = await import('./js/ui/thumbs.js'); return makeThumbs(window.__eco.app.world, undefined, { size: 192, extra: window.__eco.thumbExtras?.() || {} }); });
for (const [k, url] of Object.entries(th)) fs.writeFileSync(path.join(out, `${k}.png`), Buffer.from(url.split(',')[1], 'base64'));
console.log('wrote', Object.keys(th).length, 'pictures to', out); await b.close();
