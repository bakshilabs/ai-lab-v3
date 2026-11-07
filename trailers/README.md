# DeltaOps AI lab trailers: web pages

This folder holds the trailers as two static web pages. Everything they need is here, and they don't need a build step.

| File | What it is |
| --- | --- |
| `index.html` | The trailer page: all 29 lab trailers with a player and notes for each lab. |
| `shotlists.html` | The shot lists: a second-by-second description of every trailer, with reviewer notes. |
| `videos/` | Web-sized trailer videos (1600×900, H.264 and AAC), one per lab. |
| `posters/` | The still frame shown for each video before it plays. |
| `logo.svg`, `logo-ink.svg` | The DeltaOps Learning logo, white (footer) and dark (header). Copied from `deltaopslearning-brochure/assets/`. |
| `mark.svg` | The logo mark, used as the page icon. |
| `island.svg` | The small voxel island drawn beside the featured trailer. |
| `fonts/` | Bricolage Grotesque and Inter (variable WOFF2), copied from `deltaopslearning-brochure/assets/fonts/`. |

To view the pages locally, serve this folder, then open http://localhost:8000:

```bash
python3 -m http.server 8000
```

The trailer page loads nothing from other sites: its fonts are in `fonts/`. The shot lists page still loads its fonts from Google Fonts, because `games/trailers/tools/shotlists-page.py` writes it.

On the trailer page, choosing a trailer opens it in a player window with its notes. Arrow keys move to the previous or next trailer and Esc closes it. A link such as `index.html#kart` opens that trailer straight away.

GitHub Pages serves this folder at https://bakshilabs.github.io/ai-lab-v3/trailers/, with the shot lists at `trailers/shotlists.html`. The site root is the Eco Town game. Both are published by `.github/workflows/ecotown-pages.yml`, which copies this folder into the site as `trailers/`. It redeploys on every push to `main` that changes `trailers/` or `games/ecotown/`.

The same pages are also published as shared links:
- Trailer page: https://claude.ai/artifact/6pdXoP3jib9e98Ef8qLy4n
- Shot lists: https://claude.ai/artifact/75jvyWAj7ofKaBHJS9kMSG

The trailers' source code, full-quality renders and design documents are in `games/`:
- `games/trailers/` has the source code, and `games/trailers/out/` has the full-quality renders.
- `games/labs/` has the design documents.

To update a video here after re-rendering, run this from `games/trailers`:

```bash
tools/webenc.sh <id> <poster-second>
```

To rebuild `shotlists.html`, run this from `games/trailers`:

```bash
python3 tools/shotlists-page.py
```
