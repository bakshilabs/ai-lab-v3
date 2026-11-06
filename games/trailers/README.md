# DeltaOps game trailers

Seventeen 16:9 (1920×1080, 30 fps) game trailers, built entirely from code. Finished videos are in `out/`. Review scores and iteration notes are in `REVIEWS.md`.

**The seven client requests**, each drawn in the style of its reference game:

| Trailer | Request | Style |
| --- | --- | --- |
| `out/ecotown.mp4` | Eco Town: environmental world building | Brochure floating voxel island |
| `out/tycoon2.mp4` | Island Park Tycoon: resource management | 1990s isometric pixel park sim (canvas 2D) |
| `out/mcquiz.mp4` | Block Quiz: a Minecraft quiz | Blocky sandbox, procedural 16×16 textures (three.js) |
| `out/dash.mp4` | Beat Block: repeat playability | Neon one-button rhythm runner (canvas 2D) |
| `out/bloxel.mp4` | Block Quest: like Bloxels | 13×13 board to pixel platformer (canvas 2D) |
| `out/city.mp4` | Autopilot City: a self-driving car in a city | Low-poly city with a lidar view (three.js) |
| `out/kart.mp4` | Pit Crew GP: a racing game | Cartoon kart racer (three.js) |

**Brochure world-building labs**, matched to the brochure screenshots:
- `out/eco.mp4` is Eco AI Explorer.
- `out/mission.mp4` is Mission AI.
- `out/museum.mp4` is AI Time Traveller.
- `out/mars.mp4` is AI Inventor Lab.

**First concepts** (shared voxel style): `robotaxi`, `pitcrew`, `blocks`, `tycoon`, `quiz` and `signal`.

## What is in this folder

| Path | What it is |
| --- | --- |
| `<trailer>/index.html` | Each trailer's full scene: the 3D or 2D world, the timeline, the cameras and the game UI. |
| `<trailer>/audio.json` | Each trailer's music and sound-effect cue sheet. |
| `engine/voxel.js` | Voxel mesher: face culling, vertex ambient occlusion, colour jitter. |
| `engine/kit.js` | Voxel kit: islands, trees, houses, people, animals, vehicles, particles. |
| `engine/stage.js` | Renderer, lights, sky, post-processing (bloom, tilt-shift, grade) and easing. |
| `engine/extras.js` | Clouds, waterfalls, birds, butterflies, grass and particle bursts. |
| `engine/ui.js`, `engine/ui.css` | Overlay components for the first six trailers. |
| `engine/lab.js`, `engine/brochure.css` | The brochure's in-game UI: badge, task, pills, AI helper, facilitator, cards, meters, alerts. |
| `assets/` | Fonts and DeltaOps logos. |
| `render.mjs` | Headless Chromium frame-by-frame renderer that pipes to ffmpeg. |
| `audio.py` | Music and sound-effect synthesiser (numpy). |
| `queue.sh`, `tools/render-all.sh` | Render trailers one after another. |
| `tools/webenc.sh` | Compress a trailer and grab its poster for the web page. |
| `sheet.py`, `vsheet.sh`, `debug.mjs` | Review tools: still sheets, 1 fps video sheets, in-page debugging. |
| `../../trailers/` | The trailer web page (`index.html`), the shot-lists page (`shotlists.html`), web-sized videos and posters. Videos and posters are made with `tools/webenc.sh`. |
| `reviews/` | Video contact sheets used in the reviews, plus the brochure reference images. |

## How they are made

Everything is generated from code. There is no stock footage and no recorded audio.

- **`engine/`**:
  - `voxel.js` and `kit.js` are a small voxel engine on three.js. It does hidden-face culling, baked vertex ambient occlusion and per-voxel colour jitter. The kit has islands, trees, houses, people, animals, vehicles and particles.
  - `stage.js` holds the renderer, lights, camera tracks and easing.
  - `ui.js` and `ui.css` hold the overlay components in the brochure's style: AI helper card, facilitator card, choice cards, meters, alerts, kickers and title card.
- **`<trailer>/index.html`**: one scene per trailer. It has a deterministic timeline driven by `window.__render(t)`.
- **`render.mjs`**: serves the folder, drives headless Chromium with Playwright frame by frame, and pipes JPEG frames to ffmpeg (H.264).
- **`audio.py`**: synthesises the music bed (pads, arpeggio, drums and bass by energy level) and sound effects from `<trailer>/audio.json`.

## Rebuild one trailer

Run all three commands from `games/trailers`.

Install three.js (once):

```bash
npm install
```

Render the video and audio:

```bash
node render.mjs robotaxi && python3 audio.py robotaxi
```

Combine them:

```bash
ffmpeg -y -i out/robotaxi-silent.mp4 -i out/robotaxi.wav -c:v copy -c:a aac -b:a 192k -shortest out/robotaxi.mp4
```

For quick review, `node render.mjs robotaxi --stills 2,10,20` writes frames to `frames/robotaxi/`. Then `python3 sheet.py robotaxi` tiles them into one image.

Rendering uses software WebGL (SwiftShader). Canvas 2D trailers take about 0.4 s per frame, or 7 minutes each. The 3D ones take 1–3 s per frame, or 20–50 minutes each. Render one at a time, because each Chromium needs 1–3 GB.

To rebuild everything, run `tools/render-all.sh`. To rebuild the web page videos, run `tools/webenc.sh <name> <poster-second>` for each trailer.
