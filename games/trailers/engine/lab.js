// Brochure-style game UI building blocks (uses brochure.css). Each returns nothing; it registers animators via A().
import { el, cue } from './ui.js';
import { prog, lerp, within, ease } from './stage.js';

export const ICONS = {
  leaf: (c) => `<svg viewBox="0 0 24 24"><path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15z" fill="${c}"/><path d="M6 18L15 9" stroke="#fff" stroke-width="1.6"/></svg>`,
  compass: (c) => `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="${c}" stroke-width="2.6"/><path d="M15.5 8.5l-2 5-5 2 2-5z" fill="${c}"/></svg>`,
  temple: (c) => `<svg viewBox="0 0 24 24"><path d="M3 9l9-5 9 5z M5 10h14v1.6H5z M6 12h2v6H6z M11 12h2v6h-2z M16 12h2v6h-2z M4 19h16v2H4z" fill="${c}"/></svg>`,
  gear: (c) => `<svg viewBox="0 0 24 24"><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm9 5v-2l-2.2-.6a7 7 0 0 0-.8-1.9l1.2-2-1.4-1.4-2 1.2a7 7 0 0 0-1.9-.8L13 3h-2l-.6 2.2a7 7 0 0 0-1.9.8l-2-1.2L5.1 6.2l1.2 2a7 7 0 0 0-.8 1.9L3 11v2l2.2.6c.2.7.4 1.3.8 1.9l-1.2 2 1.4 1.4 2-1.2c.6.4 1.2.6 1.9.8L11 21h2l.6-2.2c.7-.2 1.3-.4 1.9-.8l2 1.2 1.4-1.4-1.2-2c.4-.6.6-1.2.8-1.9z" fill="${c}"/></svg>`,
  bolt: (c) => `<svg viewBox="0 0 24 24"><path d="M13 2L4 14h7l-1 8 9-12h-7z" fill="${c}"/></svg>`,
};
const STAR = '<svg width="44" height="44" viewBox="0 0 24 24"><path d="M12 2.6l2.8 5.7 6.3.9-4.6 4.4 1.1 6.2L12 16.9l-5.6 2.9 1.1-6.2-4.6-4.4 6.3-.9z" fill="#ffc83d"/></svg>';
const HAND = '<svg width="90" height="110" viewBox="0 0 90 110"><path d="M34 8c6 0 9 4 9 9v30l4-1c5-1 9 2 9 6l1-1c5-1 9 2 9 6l1 0c5-1 9 2 9 7v16c0 14-10 26-26 26H44c-9 0-15-4-20-11L8 72c-3-5-1-10 4-11 4-1 7 1 9 4l4 5V17c0-5 3-9 9-9z" fill="#fff" stroke="#13202b" stroke-width="5" stroke-linejoin="round"/></svg>';

export function makeLab(A) {
  return {
    header({ name, sub, color, shade, icon, tag, tagColor = '#ffd23f', tagText = '#13202b', task, tIn = 1, tOut = 31.6, size = 36 }) {
      const b = el(`<div class="b-badge" style="background:${color};box-shadow:0 8px 0 ${shade},0 14px 30px rgba(0,0,0,.18)"><span class="ic">${icon(color)}</span><span><b>${name}</b><small>${sub}</small></span></div>`, { x: 46, y: 40 });
      A(cue(b, tIn, tOut, { from: 'left' }));
      const tk = el(`<div class="b-task" style="width:auto;max-width:1100px;font-size:${size}px"><span class="lv" style="background:${tagColor};color:${tagText};width:auto;padding:0 16px;box-shadow:none">${tag}</span>${task}</div>`, { x: 46, y: 176 });
      A(cue(tk, tIn + 0.3, tOut, { from: 'left' }));
    },
    pills({ stars, xp, xpColor = '#1f9d55', starsAfter, xpAfter, tAfter = 99, tIn = 1.2, tOut = 31.6 }) {
      const n = el(`<div class="b-pills"><span>${STAR}<b data-s>${stars}</b></span><span><em class="xp" style="background:${xpColor}">XP</em><b data-x>${xp}</b></span></div>`, { x: 1874, y: 40, anchor: 'tr' });
      A(cue(n, tIn, tOut, { from: 'right' }));
      A((t) => { n.querySelector('[data-s]').textContent = t > tAfter ? starsAfter : stars; n.querySelector('[data-x]').textContent = t > tAfter ? Math.round(lerp(xp, xpAfter, prog(t, tAfter, tAfter + 1))) : xp; });
    },
    helper(text, sure, tIn, tOut, { x = 1874, y = 176, tag = 'GUESS', tagColor = '#ffc83d' } = {}) {
      const n = el(`<div class="b-helper"><div class="bot"><i></i><i></i></div><div class="who">AI helper <em style="background:${tagColor}">${tag}</em></div><p>${text}</p><div class="sure"><div class="bar"><i style="width:${sure}%"></i></div><span>${sure}% sure</span></div></div>`, { x, y, anchor: 'tr' });
      A(cue(n, tIn, tOut, { from: 'right' }));
    },
    facil(text, tIn, tOut, { color = '#f6c343', ink = '#13202b', x = 1874, y = 760 } = {}) {
      const n = el(`<div class="b-facil" style="background:${color};color:${ink}"><small style="color:${ink};opacity:.7">FACILITATOR</small><p>${text}</p></div>`, { x, y, anchor: 'tr' });
      A(cue(n, tIn, tOut, { from: 'right' }));
    },
    cards(head, list, tIn, tOut, pickAt, pick) {
      const n = el(`<div><div class="b-head">${head}</div><div class="b-cards">${list.map(([k, s], i) => `<div class="b-card"><span class="k">${k}</span>${s}</div>`).join('')}</div></div>`, { x: 46, y: 840 });
      A(cue(n, tIn, tOut, { from: 'up' }));
      const h = el(HAND, { x: 0, y: 0 });
      A((t) => { const v = within(t, pickAt - 0.8, tOut); h.style.opacity = v ? 1 : 0; n.querySelectorAll('.b-card')[pick].classList.toggle('pick', t > pickAt); const tx = 46 + pick * 580 + 60, ty = 990; const k = prog(t, pickAt - 0.8, pickAt - 0.1, ease.out); h.style.left = lerp(tx + 260, tx, k) + 'px'; h.style.top = lerp(ty + 140, ty, k) + 'px'; h.style.transform = `scale(${t > pickAt && t < pickAt + 0.15 ? 0.88 : 1})`; });
    },
    meters(rows, tIn, tOut, { x = 46, y = 900 } = {}) {
      const n = el(`<div class="b-meters">${rows.map((r, i) => `<div class="b-meter" data-r="${i}"><span style="color:${r.ic || '#1f9d55'}">${r.icon}</span><span>${r.label}</span><div class="mb"><i></i></div><b></b><span data-a></span></div>`).join('')}</div>`, { x, y });
      A(cue(n, tIn, tOut, { from: 'up' }));
      A((t) => rows.forEach((r, i) => { const row = n.querySelector(`[data-r="${i}"]`); const v = r.fn(t), d = r.fn(t + 0.3) - r.fn(t - 0.3); const bad = r.badBelow != null && v < r.badBelow; row.querySelector('i').style.width = v + '%'; row.querySelector('i').style.background = bad ? 'linear-gradient(90deg,#ff6a4a,#ff9a6a)' : 'linear-gradient(90deg,#16c79a,#7ae0a0)'; row.querySelector('b').textContent = Math.round(v); const a = row.querySelector('[data-a]'); const dir = Math.abs(d) > 0.3 ? d : (r.dir ? r.dir(t) : 0); a.textContent = dir > 0 ? '↑' : dir < 0 ? '↓' : ''; a.style.color = dir > 0 ? '#16a37f' : '#e5533d'; }));
    },
    panel(html, tIn, tOut, { x, y, anchor = 'tl', from = 'up' }) { const n = el(html, { x, y, anchor }); A(cue(n, tIn, tOut, { from })); return n; },
    alert(text, tIn, tOut, { good = false, x = 960, y = 620 } = {}) { const n = el(`<div class="b-alert" style="${good ? 'color:#1f9d55' : ''}"><span class="x" style="${good ? 'background:#16c79a' : ''}">${good ? '✓' : '✕'}</span>${text}</div>`, { x, y, anchor: 'c' }); A(cue(n, tIn, tOut)); },
    saved(text, tIn, tOut, { x = 960, y = 470 } = {}) { const n = el(`<div class="b-saved">${text}</div>`, { x, y, anchor: 'c' }); A(cue(n, tIn, tOut)); },
  };
}
