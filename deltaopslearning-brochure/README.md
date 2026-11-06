# DeltaOps Learning · Partner guide (print)

A 12-page A4 client brochure adapted from deltaopslearning.com (repo bakshilabs/deltaopslearning).
It is built as HTML and CSS laid out in millimetres, then exported to PDF with headless Chrome.

## Outputs (`out/`)

| File | Use |
| --- | --- |
| `delta-learning-partner-guide-print.pdf` | Send to the printer. 216 x 303 mm pages: A4 plus 3 mm bleed on every side. TrimBox and BleedBox are set. |
| `delta-learning-partner-guide-print-marks.pdf` | The same with crop marks in a 10 mm slug, for printers that ask for marks. |
| `delta-learning-partner-guide.pdf` | Trimmed A4 for email and screen, with lighter images, bookmarks and live links. |

Print spec: A4 portrait, 12 pages, saddle-stitched (page count is a multiple of 4). The centre spread is pages 6 and 7.
Suggested stock: 170 to 250 gsm silk for the inner pages; a 300 gsm cover if you want a heavier feel (self-cover also works).
Colour: the PDFs are RGB. Most digital printers convert to CMYK themselves; the bright mint and sky blue will print slightly duller.

## Edit and rebuild

```
node tools/export.mjs            # all three PDFs (or: print | marks | digital)
python tools/boxes.py            # sets TrimBox/BleedBox, bookmarks and metadata
```

Needs Node with `playwright-core` (uses the installed Google Chrome) and Python with `pypdf`.
Preview in a browser by serving the folder (`python3 -m http.server`) and opening `index.html`,
or `index.html?spreads=1` to see reader spreads. `?mode=marks` and `?mode=digital` show the other outputs.

- `index.html`: all 12 pages. `css/print.css`: layout and type. `js/build.js`: folios, star fields, the 24-hour charts, the 729-paths diagram, the QR code and crop marks.
- `tools/fonts.py` makes static instances of Bricolage Grotesque and Inter (`assets/fonts/static/`), so the PDF embeds TrueType rather than Type 3.
- `tools/screen-images.py` makes the lighter images in `img/screen/` for the digital PDF. Run it after changing anything in `img/`.
- The voxel worlds and game screens in `img/` were rendered at print resolution from the site's own engine (`js/game/`). The 24-hour charts use the same model as the Eco Town demo on the site.
- The QR code (`img/qr-demo.svg`) points to https://deltaopslearning.com/#demo.

## Copy rules

British English, no em dashes, no "it's not X, it's Y", no hype words, no prices, no named customers. Keep claims to what the site says: no live AI model (responses are scripted), no child accounts, prototypes in development. Don't mention tablets or "fully offline".
