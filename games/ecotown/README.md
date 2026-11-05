# Eco Town: the game

Eco Town is a six-level AI lab in the browser, in two versions: ages 8–12 and ages 13–17.

Players build a sustainable town on a floating island with **Plotter**, an AI planning helper. Plotter reads the player's own instruction, plans exactly what it was told, and is sometimes confidently wrong. Players catch the mistake from the ground, using lenses, street view or inside view. They name the habit that caused it, write a clearer instruction, then build and watch residents live in the town.

- Design: [`DESIGN.md`](DESIGN.md)
- Facilitator guide: [`LAB-GUIDE.md`](LAB-GUIDE.md)
- Research: `research/eco-town-*.md`

## Run it

The game is a static site with no build step. Serve `games/ecotown/game/` from any web server and open `index.html`:

```bash
cd games/ecotown/game && python3 -m http.server 8765
```

Then open <http://localhost:8765/>. For schools, host the same folder on any static host and share the link.

Once the page has loaded, nothing is fetched from the internet. three.js, the fonts and Plotter's model are served alongside the page. There are no accounts and no data collection, and nothing a player types is stored or sent.

## Controls

| | Touch | Mouse / keyboard |
|---|---|---|
| Turn the island | drag | drag, or the arrow keys |
| Zoom | pinch | scroll wheel, or `+` / `−` |
| Place or remove | tap a tile | click a tile (a see-through preview shows first) |
| Fly to a spot | double-tap | double-click |
| Views | ☁ sky · 👟 street · 🏠 inside (top right) | same |

The ☰ menu has these settings:
- read aloud;
- reduce motion (camera flights become fades);
- sound;
- facilitator notes;
- large text;
- graphics quality (auto, low, mid or high).

## How a level plays

1. **Brief.** A card unlocks the level's new lens.
2. **Plan.** The player instructs Plotter with word tiles (default for 8–12), free text (default for 13–17) or a card. Plotter flies over, beams down a see-through plan and shows its reading and its "% sure".
3. **Check.** The player chooses a lens or view. The island turns to pale clay and the honest simulation shows what the plan would really do.
4. **Fix.** The player names Plotter's habit, writes a clearer instruction and builds.
   - Plotter re-tests every new plan.
   - The player can paint and adjust tiles. The 13–17 version also has a budget.
5. **Move in.** The followed family arrives on the sky-ferry.
6. **Live.** A day passes, with thought bubbles from residents. In the 13–17 version, "What residents said" lists the comments and repeated complaints can become a petition.
7. **Celebrate.** The level's builds replay as a time-lapse from the same angle, then the reward card appears. The 13–17 version adds a town-meeting dilemma.

Level 6 adds three things before the final day:
- a check of the AI's summary of residents' views (sampling bias);
- a three-promise town charter;
- a printable town report at the end.

## Code map (`game/js`)

| Folder | What it does |
|---|---|
| `engine/` | Renderer and post-processing (tilt-shift, bloom, grade), sky and time of day (`stage.js`); voxel mesher (`voxel.js`); kit and extras; residents, wildlife and the ferry (`life.js`); Plotter's drone (`bot.js`); WebAudio synth (`audio.js`) |
| `world/` | Terrain grid and zones (`terrain.js`), build catalogue and placement rules (`catalog.js`), voxel builders (`builders.js`), the island in three.js (`world.js`), dollhouse rooms (`inside.js`) |
| `sim/` | The honest simulation (`sim.js`) and Plotter's literal planner (`planner.js`) |
| `ai/` | `plotter.js` reads the instruction (small language model, falling back to keywords), plans, and replies from templates. `model.js` and `tokenizer.js` run the model; see `../model/README.md` |
| `game/` | The level flow (`game.js`), level rules (`levels.js`), text for both versions (`content.js`), checks and lenses (`checks.js`), bubbles, the report |
| `camera/rig.js` | Sky orbit, flights, street rails, follow and turntable shots |
| `ui/ui.js` | The frame: town card, icon strip, Plotter dock, cards, labels and bubbles, read-aloud |

## Tests

From `games/ecotown/game`:

- Simulation and planner. This checks that each level's vague instruction produces its intended mistake and that the clear one fixes it:

  ```bash
  node --test tests/sim.test.mjs
  ```

- End-to-end play-through of both versions with screenshots. It checks for no errors, no external requests and the on-screen panel limits. The server must be running first:

  ```bash
  node tests/playwright/run.mjs http://localhost:8765/ junior /tmp/shots
  ```

  ```bash
  node tests/playwright/run.mjs http://localhost:8765/ senior /tmp/shots-s 1920 1080 text
  ```

- Render test page for the world on its own: `tests/visual/world.html?levels=6&hour=16.5&tier=high`.
