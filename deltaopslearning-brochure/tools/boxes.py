"""Set PDF page boxes and metadata after export.
print:   MediaBox = BleedBox = 216 x 303 mm, TrimBox 3 mm in.
marks:   MediaBox 236 x 323 mm, BleedBox 10 mm in, TrimBox 13 mm in.
digital: A4, TrimBox = MediaBox.
Usage: python tools/boxes.py   (needs pypdf)"""
from pypdf import PdfReader, PdfWriter
from pypdf.generic import RectangleObject
import os, sys
MM = 72 / 25.4
here = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'out')
name = 'delta-learning-partner-guide'
jobs = [(f'{name}-print.pdf', 216, 303, 0, 3), (f'{name}-print-marks.pdf', 236, 323, 10, 13), (f'{name}.pdf', 210, 297, 0, 0)]
for f, w, h, bleed, trim in jobs:
    p = os.path.join(here, f)
    if not os.path.exists(p): continue
    r = PdfReader(p); wr = PdfWriter(clone_from=r)
    for pg in wr.pages:
        # Chrome rounds the page up by a fraction of a millimetre; the layout starts at the
        # top-left corner, so cut the page back to the exact size from there.
        top = float(pg.mediabox.top); x0, y0 = float(pg.mediabox.left), top - h * MM
        assert float(pg.mediabox.width) - w * MM > -0.5 and float(pg.mediabox.height) - h * MM > -0.5, f
        box = lambda m: RectangleObject([x0 + m * MM, y0 + m * MM, x0 + (w - m) * MM, top - m * MM])
        pg.mediabox = box(0); pg.cropbox = box(0)
        pg.bleedbox = box(bleed); pg.trimbox = box(trim)
    if f == f'{name}.pdf':
        # bookmarks for the digital copy
        for title, n in (('Cover', 1), ('At a glance', 2), ('Why organisations choose it', 3), ('How it works', 4), ('Examples', 6),
                         ('Lab library', 8), ('What you get', 9), ('How we work', 10), ('About DeltaOps Learning', 11), ('Start a conversation', 12)):
            wr.add_outline_item(title, n - 1)
        wr.page_mode = '/UseOutlines'
    wr.add_metadata({'/Title': 'DeltaOps Learning · Partner guide', '/Author': 'DeltaOps Learning', '/Subject': 'AI learning games, ready for your sessions.', '/Creator': 'DeltaOps Learning'})
    wr.write(p); print('boxes set', f, len(wr.pages), 'pages')
