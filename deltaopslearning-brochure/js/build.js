// Fills in the generated parts of the guide: folios, star fields, cubes, the three
// 24-hour charts (same model as the Eco Town demo on the site), the 729-paths diagram,
// the QR code and, in marks mode, crop marks. Sets window.pubReady when done.
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const el = (tag, a = {}, parent) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); if (parent) parent.appendChild(e); return e; };
  const hash = (i, s) => { const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return x - Math.floor(x); };

  // the digital PDF uses the lighter image set in img/screen/
  if (document.body.classList.contains('digital')) document.querySelectorAll('img[src^="img/"]').forEach(i => { i.src = i.getAttribute('src').replace(/^img\//, 'img/screen/'); });

  // folios
  document.querySelectorAll('.page[data-title]').forEach(p => {
    const f = document.createElement('div');
    f.className = 'folio';
    f.innerHTML = `<span class="n">${String(p.dataset.n).padStart(2, '0')}</span><span></span>`;
    f.lastChild.textContent = p.dataset.title;
    p.querySelector('.trim').appendChild(f);
  });

  // star fields: one field across a spread, so both halves line up at the gutter.
  // Stars are left out behind text and cards so they cannot print as specks.
  function stars() {
    const MASK = 'h2, h3, p, .eyebrow, .loop li, .chips li, .guide, .oc, .legend, .ct, .folio, .close, .base';
    document.querySelectorAll('.starfield').forEach(sf => {
      const w = +(sf.dataset.w || 426), h = 303, box = sf.getBoundingClientRect(), k = box.width / w, pad = 2;
      const rects = [...sf.closest('.bleed').querySelectorAll(MASK)].map(e => e.getBoundingClientRect()).filter(r => r.width && r.height)
        .map(r => [(r.left - box.left) / k - pad, (r.top - box.top) / k - pad, (r.right - box.left) / k + pad, (r.bottom - box.top) / k + pad]);
      const svg = el('svg', { viewBox: `0 0 ${w} ${h}`, width: '100%', height: '100%' }, sf);
      const n = Math.round(w * 0.42);
      for (let i = 0; i < n; i++) {
        const x = hash(i, 1) * w, y = hash(i, 2) * h, big = hash(i, 3) < .12;
        if (rects.some(([a, b, c, d]) => x > a && x < c && y > b && y < d)) continue;
        el('circle', { cx: x.toFixed(2), cy: y.toFixed(2), r: big ? .32 : .18, fill: '#fff', opacity: (big ? .55 : .25 + hash(i, 4) * .35).toFixed(2) }, svg);
      }
    });
  }

  // isometric cubes (vector)
  const CUBE = { mint: ['#BFF6EA', '#5FD9C4', '#2BB8A3'], sun: ['#FFF1B8', '#FFD23F', '#E8A317'], blue: ['#D9EEFF', '#8CC8FF', '#59A6F0'] };
  document.querySelectorAll('[data-cubes]').forEach(box => {
    JSON.parse(box.dataset.cubes).forEach(([x, y, c, s]) => {
      const [t, l, r] = CUBE[c];
      const svg = el('svg', { viewBox: '0 0 30 34.6', class: 'cube', style: `left:${x}mm; top:${y}mm; width:${s}mm; height:${s * 1.153}mm` });
      el('path', { d: 'M15 0 30 8.65 15 17.3 0 8.65z', fill: t }, svg);
      el('path', { d: 'M0 8.65 15 17.3V34.6L0 25.95z', fill: l }, svg);
      el('path', { d: 'M30 8.65 15 17.3V34.6L30 25.95z', fill: r }, svg);
      box.parentNode.appendChild(svg);
    });
  });

  // 729 paths: six stages of three cards, with one path picked out
  document.querySelectorAll('[data-tree]').forEach(svg => {
    const pick = [1, 0, 2, 1, 2, 0], X = s => 14 + s * 54.4, Y = c => 8 + c * 17;
    el('path', { d: pick.map((c, s) => `${s ? 'L' : 'M'}${X(s)} ${Y(c)}`).join(' '), fill: 'none', stroke: '#16FFC6', 'stroke-width': 1.6, 'stroke-linejoin': 'round' }, svg);
    for (let s = 0; s < 6; s++) for (let c = 0; c < 3; c++) {
      const on = pick[s] === c;
      el('rect', { x: X(s) - 6, y: Y(c) - 6, width: 12, height: 12, rx: 3.2, fill: on ? '#16FFC6' : 'rgba(255,255,255,.1)', stroke: on ? 'none' : 'rgba(255,255,255,.28)', 'stroke-width': .7 }, svg);
      const t = el('text', { x: X(s), y: Y(c) + 2.6, 'text-anchor': 'middle', 'font-family': 'Inter', 'font-weight': 800, 'font-size': 7, fill: on ? '#0C1B24' : 'rgba(255,255,255,.6)' }, svg);
      t.textContent = 'ABC'[c];
    }
  });

  // crop marks, page label in the slug
  if (document.body.classList.contains('marks')) {
    document.querySelectorAll('.page').forEach(p => {
      const cm = document.createElement('div'); cm.className = 'cm';
      const T = 13, R = 223, B = 310, len = 6, gap = 4, w = '.09mm';
      const lines = [];
      [T, B].forEach(y => { lines.push([`left:${T - gap - len}mm;top:${y}mm;width:${len}mm;height:${w}`]); lines.push([`left:${R + gap}mm;top:${y}mm;width:${len}mm;height:${w}`]); });
      [T, R].forEach(x => { lines.push([`left:${x}mm;top:${T - gap - len}mm;width:${w};height:${len}mm`]); lines.push([`left:${x}mm;top:${B + gap}mm;width:${w};height:${len}mm`]); });
      cm.innerHTML = lines.map(s => `<i style="${s}"></i>`).join('') + `<b>DeltaOps Learning partner guide · page ${p.dataset.n} of 12 · A4 210 x 297 mm · 3 mm bleed</b>`;
      p.appendChild(cm);
    });
  }

  // QR code (vector), then wait for fonts and images
  const qr = Promise.all([...document.querySelectorAll('[data-qr]')].map(d => fetch(d.dataset.qr || 'img/qr-demo.svg').then(r => r.text()).then(s => (d.innerHTML = s))));
  const imgs = [...document.images].map(i => i.complete ? null : new Promise(r => { i.onload = i.onerror = r; }));
  Promise.all([qr, document.fonts.ready, ...imgs]).then(() => { stars(); window.pubReady = true; });
})();
