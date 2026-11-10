# Eco Town voices

The game's read-aloud uses recorded neural voices, not the browser's built-in voice.

| Who | Kokoro voice | Accent |
|---|---|---|
| Narrator (cards, captions, films, residents) | `bf_isabella` | British |
| Florence, the AI helper | `af_bella` | American |

Model: **Kokoro-82M** (Apache-2.0), ONNX build from Hugging Face `onnx-community/Kokoro-82M-v1.0-ONNX`.

## Re-record after changing game text

1. Serve the game:

   ```bash
   cd games/ecotown/game && python3 -m http.server 8765
   ```

2. Optional: run play-throughs so lines built at play time are included. Each run writes `said.json` into its output folder.

   ```bash
   FAST=1 node games/ecotown/game/tests/playwright/run.mjs http://localhost:8765/ junior /tmp/j 1280 800 cards mixed
   ```

3. Collect every sentence:

   ```bash
   node games/ecotown/voice/collect.mjs http://localhost:8765/ /tmp/j/said.json /tmp/s/said.json
   ```

4. Record and pack the sentences. This needs `pip install kokoro-onnx soundfile`, `ffmpeg`, and the Kokoro files in `<dir>`:
   - `model.onnx`;
   - `voices.bin`, an `.npz` of the voice arrays.

   Clips are cached by sentence, so only new lines are recorded.

   ```bash
   python3 games/ecotown/voice/render.py <dir> <cache dir>
   ```

5. Commit `game/voice/pack-*.json` and the `pack-*.bin` chunks (about 200 KB each; the game fetches a chunk when it first needs a line in it), then deploy.
