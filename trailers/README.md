# DeltaOps AI lab trailers: web pages

This folder holds the trailers as two static web pages. Everything they need is here, and they don't need a build step.

| File | What it is |
| --- | --- |
| `index.html` | The trailer page: all 29 lab trailers with a player and notes for each lab. |
| `shotlists.html` | The shot lists: a second-by-second description of every trailer, with reviewer notes. |
| `videos/` | Web-sized trailer videos (1600×900, H.264 and AAC), one per lab. |
| `posters/` | The still frame shown for each video before it plays. |
| `logo.svg` | The DeltaOps Learning logo. |

To view the pages locally, serve this folder, then open http://localhost:8000:

```bash
python3 -m http.server 8000
```

Fonts load from Google Fonts. Everything else is local.

The same pages are published as shared links:
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
