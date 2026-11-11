// Builds the protected Eco Town site into dist/ for Cloudflare Pages.
// - one minified, name-mangled JS bundle (game + three.js), no source maps or comments
// - only the files players need (no tests, docs, training code or readable modules)
// - hashed file names and strict security headers (_headers)
// Usage: npm ci && node build.mjs
import { build } from 'esbuild';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const here = path.dirname(new URL(import.meta.url).pathname);
const SRC = path.join(here, 'game'), OUT = path.join(here, 'dist'), A = path.join(OUT, 'assets');
const hash = (buf) => createHash('sha256').update(buf).digest('hex').slice(0, 10);

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(A, 'fonts'), { recursive: true });

// 1. model files under hashed names
const names = {};
for (const f of ['plotter.json', 'plotter.bin']) {
  const buf = fs.readFileSync(path.join(SRC, 'models', f));
  names[f] = `m-${hash(buf)}${path.extname(f)}`;
  fs.writeFileSync(path.join(A, names[f]), buf);
}

// 2. fonts
for (const f of fs.readdirSync(path.join(SRC, 'fonts'))) fs.copyFileSync(path.join(SRC, 'fonts', f), path.join(A, 'fonts', f));

// 2b. recorded voices (one pack per age band; already content-hashed by voice/render.py)
const VO = path.join(SRC, 'voice');
if (fs.existsSync(VO)) { fs.mkdirSync(path.join(OUT, 'voice'), { recursive: true }); for (const f of fs.readdirSync(VO)) if (/^pack-/.test(f)) fs.copyFileSync(path.join(VO, f), path.join(OUT, 'voice', f)); }

// 2c. Florence's portrait, the build buttons' pictures (img/) and the build videos (videos/): plain paths
for (const dir of ['img', 'videos']) { const from = path.join(SRC, dir); if (fs.existsSync(from)) fs.cpSync(from, path.join(OUT, dir), { recursive: true }); }

// 3. JS bundle: resolve the 'three' import map entries to the vendored files
const vendor = path.join(SRC, 'vendor');
const res = await build({
  entryPoints: [path.join(SRC, 'js', 'main.js')],
  bundle: true, format: 'esm', target: 'es2020', minify: true, legalComments: 'none', sourcemap: false, write: false,
  charset: 'utf8',
  plugins: [{
    name: 'three-vendor',
    setup(b) {
      b.onResolve({ filter: /^three$/ }, () => ({ path: path.join(vendor, 'three.module.min.js') }));
      b.onResolve({ filter: /^three\/addons\// }, (a) => ({ path: path.join(vendor, 'addons', a.path.slice('three/addons/'.length)) }));
    },
  }],
});
let js = res.outputFiles[0].text;
// point the model loader at the hashed files
js = js.replaceAll('./models/', './assets/').replaceAll('plotter.json', names['plotter.json']).replaceAll('plotter.bin', names['plotter.bin']);
const jsName = `app-${hash(js)}.js`;
fs.writeFileSync(path.join(A, jsName), js);

// 4. CSS (minified; fonts now live in assets/fonts)
const cssRes = await build({ entryPoints: [path.join(SRC, 'css', 'game.css')], bundle: false, minify: true, write: false, loader: { '.css': 'css' } });
const css = cssRes.outputFiles[0].text.replaceAll('../fonts/', 'fonts/');
const cssName = `app-${hash(css)}.css`;
fs.writeFileSync(path.join(A, cssName), css);

// 5. index.html: no import map, load the bundle
let html = fs.readFileSync(path.join(SRC, 'index.html'), 'utf8');
html = html.replace(/<script type="importmap">[\s\S]*?<\/script>\n?/, '')
  .replace('href="fonts/inter.woff2"', 'href="assets/fonts/inter.woff2"')
  .replace('href="css/game.css"', `href="assets/${cssName}"`)
  .replace('<script type="module" src="js/main.js"></script>', `<script type="module" src="assets/${jsName}"></script>`)
  .replace('<head>', '<head>\n<meta name="robots" content="noindex, nofollow">');
fs.writeFileSync(path.join(OUT, 'index.html'), html);
// 5b. the club leader's one-page plan: a plain page, no scripts beyond its print button
if (fs.existsSync(path.join(SRC, 'leader.html'))) fs.copyFileSync(path.join(SRC, 'leader.html'), path.join(OUT, 'leader.html'));

// 6. security headers for Cloudflare Pages
fs.copyFileSync(path.join(here, '_headers'), path.join(OUT, '_headers'));

const total = fs.readdirSync(A, { recursive: true }).map((f) => path.join(A, f)).filter((f) => fs.statSync(f).isFile()).reduce((a, f) => a + fs.statSync(f).size, 0);
console.log(`dist/ built: index.html, assets/${jsName} (${(js.length / 1024).toFixed(0)} KB), assets/${cssName}, model, fonts — ${(total / 1024 / 1024).toFixed(1)} MB`);
