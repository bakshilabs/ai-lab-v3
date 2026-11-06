"""Make static instances of the two variable fonts so Chrome embeds them in the PDF as
TrueType instead of Type 3 outlines (print preflight prefers this). Needs fontTools + brotli.
Usage: python tools/fonts.py"""
import os
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
here = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'assets', 'fonts')
JOBS = [('inter.woff2', 'Inter', [(w, {'wght': w}) for w in (400, 500, 550, 600, 650, 700, 750, 800)]),
        ('bricolage.woff2', 'Bricolage', [(740, {'wght': 740, 'opsz': 20}), (760, {'wght': 760, 'opsz': 24}), (780, {'wght': 780, 'opsz': 48}), (800, {'wght': 800, 'opsz': 72})])]
for src, name, inst in JOBS:
    for w, loc in inst:
        f = TTFont(os.path.join(here, src))
        s = instantiateVariableFont(f, loc)
        fam = {'Inter': 'Inter', 'Bricolage': 'Bricolage Grotesque'}[name]
        nt = s['name']
        for rec in list(nt.names):
            if rec.nameID in (1, 2, 3, 4, 6, 16, 17, 25): nt.removeNames(nameID=rec.nameID)
        for nid, val in ((1, f'{fam} {w}'), (2, 'Regular'), (3, f'{name}-{w}-print'), (4, f'{fam} {w}'), (6, f'{fam.replace(" ", "")}-W{w}'), (16, fam), (17, f'W{w}')):
            nt.setName(val, nid, 3, 1, 0x409)
        s['OS/2'].usWeightClass = w
        s.flavor = None
        out = os.path.join(here, 'static', f'{name}-{w}.ttf')
        s.save(out); print(out, os.path.getsize(out))
