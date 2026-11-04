# DeltaOps game trailers

Six 16:9 (1920×1080, 30 fps) trailers for the new games planned in `games/PLAN.md`. Finished videos are in `out/`. Review scores and iteration notes are in `REVIEWS.md`.

| Trailer | Game | Length |
| --- | --- | --- |
| `out/robotaxi.mp4` | Robo-Taxi Island: teach a self-driving taxi to see | 42 s |
| `out/pitcrew.mp4` | Pit Crew: reward an AI kart, catch its loopholes | 41 s |
| `out/blocks.mp4` | Block Builders: a Bloxels-style grid the AI reads | 40 s |
| `out/tycoon.mp4` | Island Park Tycoon: Manager Bot runs your nature park | 40 s |
| `out/quiz.mp4` | Sure or Not Sure?: a room-wide quiz show | 37 s |
| `out/signal.mp4` | Clear Signal: a one-button rhythm runner | 36 s |

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

Rendering uses software WebGL (SwiftShader) and takes about 0.3–0.4 s per frame, so a trailer takes about 7–8 minutes.
