#!/usr/bin/env python3
"""Build the combined trailer shot-list review page and Markdown file.

Reads games/trailers/shotlists/<id>.md and writes:
  games/trailers/shotlists/ALL-TRAILERS.md   (all shot lists in one file)
  <out-html>                                 (review page, default <repo>/trailers/shotlists.html)
Usage: python3 tools/shotlists-page.py [out-html]
"""
import html, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SL = ROOT / 'shotlists'
OUT = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT.parent.parent / 'trailers' / 'shotlists.html'

GROUPS = [
    ('client', 'Client requests', ['ecotown', 'tycoon2', 'mcquiz', 'dash', 'bloxel', 'city', 'kart']),
    ('career', 'Career skills', ['colony', 'rocket', 'robot', 'drone']),
    ('future', 'Future Skills', ['fs-data', 'fs-model', 'fs-verify', 'fs-product', 'fs-automate', 'fs-redteam', 'fs-impact', 'fs-creative']),
    ('brochure', 'Brochure world-building', ['eco', 'mission', 'museum', 'mars']),
    ('first', 'First concepts', ['robotaxi', 'pitcrew', 'blocks', 'tycoon', 'quiz', 'signal']),
]


def inline(s):
    s = html.escape(s, quote=False)
    s = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', s)
    s = re.sub(r'(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])', r'<em>\1</em>', s)
    s = re.sub(r'`([^`]+)`', r'<code>\1</code>', s)
    return s


def cells(line):
    line = line.strip()
    if line.startswith('|'):
        line = line[1:]
    if line.endswith('|'):
        line = line[:-1]
    return [c.strip() for c in line.split('|')]


def md_to_html(lines):
    out, i = [], 0
    while i < len(lines):
        ln = lines[i]
        if not ln.strip():
            i += 1
            continue
        if ln.lstrip().startswith('|'):
            rows = []
            while i < len(lines) and lines[i].lstrip().startswith('|'):
                rows.append(lines[i])
                i += 1
            head = cells(rows[0])
            body = [cells(r) for r in rows[1:] if not re.match(r'^\s*\|?\s*:?-{2,}', r)]
            t = ['<div class="tbl"><table><thead><tr>']
            t += [f'<th>{inline(c)}</th>' for c in head]
            t.append('</tr></thead><tbody>')
            for r in body:
                t.append('<tr>' + ''.join(f'<td>{inline(c)}</td>' for c in r) + '</tr>')
            t.append('</tbody></table></div>')
            out.append(''.join(t))
            continue
        if re.match(r'^\s*[-*] ', ln):
            items = []
            while i < len(lines) and re.match(r'^\s*[-*] ', lines[i]):
                items.append(re.sub(r'^\s*[-*] ', '', lines[i]))
                i += 1
            out.append('<ul>' + ''.join(f'<li>{inline(x)}</li>' for x in items) + '</ul>')
            continue
        if re.match(r'^\s*\d+\. ', ln):
            items = []
            while i < len(lines) and re.match(r'^\s*\d+\. ', lines[i]):
                items.append(re.sub(r'^\s*\d+\. ', '', lines[i]))
                i += 1
            out.append('<ol>' + ''.join(f'<li>{inline(x)}</li>' for x in items) + '</ol>')
            continue
        m = re.match(r'^(#{2,4}) (.*)', ln)
        if m:
            out.append(f'<h4>{inline(m.group(2))}</h4>')
            i += 1
            continue
        para = [ln]
        i += 1
        while i < len(lines) and lines[i].strip() and not re.match(r'^\s*(\||[-*] |\d+\. |#)', lines[i]):
            para.append(lines[i])
            i += 1
        text = ' '.join(p.strip() for p in para)
        cls = ''
        if text.startswith('**Reviewer notes'):
            cls = ' class="notes-h"'
        out.append(f'<p{cls}>{inline(text)}</p>')
    return '\n'.join(out)


def parse(tid):
    lines = (SL / f'{tid}.md').read_text().splitlines()
    title = lines[0].lstrip('# ').strip()
    meta = lines[1].strip() if len(lines) > 1 else ''
    rest = lines[2:]
    # split off reviewer notes so they can be styled as a box
    idx = next((k for k, l in enumerate(rest) if l.startswith('**Reviewer notes')), None)
    main, notes = (rest, []) if idx is None else (rest[:idx], rest[idx:])
    if notes:
        notes[0] = re.sub(r'^\*\*Reviewer notes:?\*\*:?\s*', '', notes[0])
    parts = meta.split(' · ', 2)
    strand, length, look = (parts + ['', '', ''])[:3]
    src = (SL / f'{tid}.md').read_text()
    unrendered = bool(re.search(r'not yet (re-)?rendered|video re-rendering', src, re.I))
    return dict(id=tid, title=title, strand=strand, length=length, look=look,
                main=md_to_html(main), notes=md_to_html(notes), unrendered=unrendered)


labs = {tid: parse(tid) for _, _, ids in GROUPS for tid in ids}

# combined markdown
md = ['# DeltaOps Learning trailers: shot lists for review', '',
      'One shot-by-shot description per trailer, grouped by strand. Each file is also in this folder as `<id>.md`.', '']
for key, name, ids in GROUPS:
    md += [f'## {name}', '']
    for tid in ids:
        body = (SL / f'{tid}.md').read_text().strip().splitlines()
        body[0] = '### ' + body[0].lstrip('# ').strip()
        body = [re.sub(r'^## ', '#### ', l) for l in body]
        md += body + ['']
(SL / 'ALL-TRAILERS.md').write_text('\n'.join(md))

# html
nav, secs = [], []
for key, name, ids in GROUPS:
    nav.append(f'<li class="g"><span>{name}</span><ol>' + ''.join(
        f'<li><a href="#{t}">{html.escape(labs[t]["title"])}</a>'
        + ('<i class="dot" title="Not yet rendered"></i>' if labs[t]['unrendered'] else '') + '</li>' for t in ids) + '</ol></li>')
    secs.append(f'<h2 class="strand" id="s-{key}">{name}<small>{len(ids)} trailers</small></h2>')
    for t in ids:
        L = labs[t]
        status = ('<span class="chip warn">Described from source · video not yet rendered</span>' if L['unrendered']
                  else '<span class="chip ok">Matches current video</span>')
        notes = f'<aside class="notes"><h4>Reviewer notes</h4>{L["notes"]}</aside>' if L['notes'] else ''
        secs.append(f'''<article id="{t}">
<header><p class="eyebrow">{html.escape(L["strand"])} · <span class="len">{html.escape(L["length"])}</span></p>
<h3>{html.escape(L["title"])}</h3>
<p class="look">{html.escape(L["look"])}</p>{status}</header>
{L["main"]}
{notes}
</article>''')

n_un = sum(1 for L in labs.values() if L['unrendered'])
page = f'''<!doctype html>
<html lang="en">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<style>html,body{{margin:0}}</style>
<title>Trailer Shot Lists</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600&family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@500&display=swap">
<style>
/* Layout: a script-style review binder. Sticky contents rail on the left, one card per trailer, shot tables as the core. */
:root {{
  --bg: #eef4f1; --paper: #ffffff; --ink: #14212b; --muted: #55656f; --line: #d5e0dc;
  --accent: #1f9d55; --accent-ink: #ffffff; --warn: #b8610a; --warn-bg: #fff1dc; --ok-bg: #e2f5ea;
  --note-bg: #fff8d6; --note-line: #e8cf5a; --row: #f6faf8;
  --display: "Fredoka", "Trebuchet MS", system-ui, sans-serif;
  --body: "Atkinson Hyperlegible", system-ui, -apple-system, "Segoe UI", sans-serif;
  --mono: "JetBrains Mono", ui-monospace, Menlo, Consolas, monospace;
}}
@media (prefers-color-scheme: dark) {{ :root:not([data-theme="light"]) {{
  --bg: #0f1a1f; --paper: #172429; --ink: #e6efec; --muted: #9fb0b6; --line: #2a3b41;
  --accent: #4fd08a; --accent-ink: #0f1a1f; --warn: #f2a65a; --warn-bg: #3a2a17; --ok-bg: #173628;
  --note-bg: #2f2b16; --note-line: #7d6c22; --row: #1b2a30; color-scheme: dark; }} }}
:root[data-theme="dark"] {{
  --bg: #0f1a1f; --paper: #172429; --ink: #e6efec; --muted: #9fb0b6; --line: #2a3b41;
  --accent: #4fd08a; --accent-ink: #0f1a1f; --warn: #f2a65a; --warn-bg: #3a2a17; --ok-bg: #173628;
  --note-bg: #2f2b16; --note-line: #7d6c22; --row: #1b2a30; color-scheme: dark; }}
* {{ box-sizing: border-box; }}
html {{ scroll-behavior: smooth; }}
@media (prefers-reduced-motion: reduce) {{ html {{ scroll-behavior: auto; }} }}
body {{ background: var(--bg); color: var(--ink); font: 16px/1.55 var(--body); }}
.wrap {{ display: grid; grid-template-columns: 260px minmax(0, 1fr); gap: 32px; max-width: 1400px; margin: 0 auto;
  padding-block: 32px 80px; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }}
nav {{ position: sticky; top: calc(env(safe-area-inset-top, 0px) + 16px); align-self: start; max-height: calc(100vh - 32px); overflow-y: auto; font-size: 14px; }}
nav ol, nav > ul {{ list-style: none; margin: 0; padding: 0; }}
nav .g {{ margin-bottom: 14px; }}
nav .g > span {{ display: block; font: 600 12px/1.2 var(--display); letter-spacing: .08em; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }}
nav a {{ color: var(--ink); text-decoration: none; display: inline-block; padding: 2px 0; }}
nav a:hover, nav a:focus-visible {{ color: var(--accent); text-decoration: underline; }}
.dot {{ display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: var(--warn); margin-left: 6px; vertical-align: middle; }}
main {{ min-width: 0; }}
.intro h1 {{ font: 600 clamp(30px, 4vw, 44px)/1.1 var(--display); margin: 0 0 10px; text-wrap: balance; }}
.intro p {{ max-width: 68ch; margin: 0 0 10px; color: var(--muted); }}
.intro .key {{ display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }}
.strand {{ font: 600 26px/1.2 var(--display); margin: 48px 0 16px; display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; }}
.strand small {{ font: 500 13px var(--mono); color: var(--muted); }}
article {{ background: var(--paper); border: 1px solid var(--line); border-radius: 14px; padding: 24px; margin-bottom: 24px; scroll-margin-top: 16px; }}
article header {{ margin-bottom: 14px; }}
.eyebrow {{ margin: 0; font: 500 12px var(--mono); letter-spacing: .06em; text-transform: uppercase; color: var(--muted); }}
.eyebrow .len {{ color: var(--accent); }}
article h3 {{ font: 600 28px/1.15 var(--display); margin: 4px 0 6px; }}
.look {{ margin: 0 0 10px; color: var(--muted); font-style: italic; max-width: 80ch; }}
.chip {{ display: inline-block; font: 500 12px var(--mono); padding: 3px 10px; border-radius: 99px; }}
.chip.ok {{ background: var(--ok-bg); color: var(--accent); }}
.chip.warn {{ background: var(--warn-bg); color: var(--warn); }}
article > p {{ max-width: 80ch; margin: 0 0 12px; }}
.tbl {{ overflow-x: auto; margin: 16px 0; border: 1px solid var(--line); border-radius: 10px; }}
table {{ border-collapse: collapse; width: 100%; min-width: 760px; font-size: 14.5px; }}
th {{ text-align: left; font: 600 12px var(--display); letter-spacing: .06em; text-transform: uppercase; color: var(--muted); background: var(--row); padding: 10px 12px; border-bottom: 1px solid var(--line); }}
td {{ vertical-align: top; padding: 10px 12px; border-top: 1px solid var(--line); }}
tbody tr:nth-child(even) td {{ background: var(--row); }}
td:first-child {{ font: 500 13px var(--mono); white-space: nowrap; color: var(--accent); font-variant-numeric: tabular-nums; }}
th:nth-child(2) {{ width: 38%; }} th:nth-child(3) {{ width: 34%; }}
code {{ font: 13px var(--mono); }}
.notes {{ background: var(--note-bg); border: 1px solid var(--note-line); border-radius: 10px; padding: 14px 18px; margin-top: 16px; }}
.notes h4 {{ font: 600 14px var(--display); letter-spacing: .06em; text-transform: uppercase; margin: 0 0 6px; }}
.notes p, .notes li {{ max-width: 80ch; }}
.notes ul {{ margin: 0; padding-left: 20px; }}
.notes p {{ margin: 0 0 8px; }}
@media (max-width: 860px) {{
  .wrap {{ grid-template-columns: minmax(0, 1fr); }}
  nav {{ position: static; max-height: none; background: var(--paper); border: 1px solid var(--line); border-radius: 14px; padding: 16px; }}
  nav > ul {{ columns: 2; column-gap: 20px; }}
  nav .g {{ break-inside: avoid; }}
  article {{ padding: 18px; }}
}}
@media (max-width: 480px) {{ nav > ul {{ columns: 1; }} }}
</style>
<div class="wrap">
<nav aria-label="Trailers"><ul>{"".join(nav)}</ul></nav>
<main>
<section class="intro">
<h1>Trailer shot lists</h1>
<p>What happens in each of the 29 DeltaOps Learning lab trailers, second by second: what you see, the exact words on screen, and the sound. Each one opens with a one-sentence summary and the AI moment, the confident wrong guess and how the children fix it. Each ends with reviewer notes listing things to check.</p>
<p>{n_un} trailers are described from their current source because their video is not rendered yet, or is older than the latest changes. They are marked with an orange dot in the contents.</p>
<div class="key"><span class="chip ok">Matches current video</span><span class="chip warn">Described from source · video not yet rendered</span></div>
</section>
{"".join(secs)}
</main></div>
'''
OUT.write_text(page)
print(f'wrote {OUT} ({len(page)//1024} KB), {n_un} unrendered; ALL-TRAILERS.md')
