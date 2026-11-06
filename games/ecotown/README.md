# Eco Town: the game

Eco Town is a six-level AI lab in the browser, in two versions: ages 8–12 and ages 13–17.

Players build a sustainable town on a floating island with **Florence**, an AI planning helper. Florence reads the player's own instruction, plans exactly what she was told, and is sometimes confidently wrong. Players catch the mistake from the ground, using lenses, street view or inside view. They name the habit that caused it, write a clearer instruction, then build and watch residents live in the town.

- Design: [`DESIGN.md`](DESIGN.md)
- Facilitator guide: [`LAB-GUIDE.md`](LAB-GUIDE.md)
- Research: `research/eco-town-*.md`

## Run it

The game is a static site with no build step. Serve `games/ecotown/game/` from any web server and open `index.html`:

```bash
cd games/ecotown/game && python3 -m http.server 8765
```

Then open <http://localhost:8765/>. For schools, host the same folder on any static host and share the link.

Once the page has loaded, nothing is fetched from the internet. three.js, the fonts and Florence's model are served alongside the page. There are no accounts and no data collection, and nothing a player types is stored or sent.

## Live site: passcodes for students, admin for the company

- **Students:** **https://ecotown.deltaops.workers.dev**. They type the passcode they were given, for example `OTTER-4821`, and play free between the batch's start and end dates.
  - **One active session per passcode:** logging in on a second device stops the first within about a minute, with "This passcode is now being used on another device".
  - After the end date, the code shows "Your free access has ended. Ask your teacher." This is where the paywall will go; see `docs/FUTURE-PAYWALL.md`.
- **Admin (company only):** **https://ecotown.deltaops.workers.dev/admin**, behind Cloudflare Access ("Sign in with Cloudflare", allowed email on the policy). From there you can:
  - **create a batch:** school or teacher, number of codes, free-from and free-until dates;
  - **print code cards** or download a **CSV** to send to the teacher;
  - **see usage:** used codes, playing now, last login;
  - **manage a batch:** change dates, add codes, switch a code or a whole batch off, end a session, delete a batch.
- **Protection:** the game's code and model are only served to a browser with a valid passcode session. Admin pages need the Cloudflare Access login, which the Worker checks itself too. Wrong guesses are limited to 10 per 10 minutes per network.
- **How it works:** `worker/worker.js` is the router and passcode page, `worker/store.js` holds the Durable Object database `CodeStore`, `worker/codes.js` has the logic (tested in `game/tests/codes.test.mjs`), and `worker/admin.html` is the console.

**To publish a new version** (with the Cloudflare API token available):

```bash
cd games/ecotown && node build.mjs && CF_ACCOUNT_ID=<account id> NODE_USE_ENV_PROXY=1 node worker/deploy.mjs
```

## Public test version (GitHub Pages, no login)

The workflow `.github/workflows/ecotown-pages.yml` runs the tests, builds the same protected site, and publishes it at **https://bakshilabs.github.io/ai-lab-v3/**. It runs on every push to `claude/focused-cori-qeoveu` or `main` that touches the game.

Two one-time settings, which need a repo admin:
1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. **Settings → Environments → github-pages → Deployment branches and tags:** add `claude/focused-cori-qeoveu`. By default GitHub only lets `main` deploy. Skip this step once the branch is merged to `main`.

Then open **Actions → "Eco Town test site (GitHub Pages)" → Re-run all jobs**, or push any change.

This version is **public**: anyone with the link can play it and save its files. Use it for testing, and use the Cloudflare version for classes.

## Put it on a secure website (Cloudflare Pages + login)

The game is published from a **protected build** (`dist/`):
- one scrambled JavaScript file;
- hashed file names;
- no source code, tests, docs or training code;
- strict security headers (`_headers`).

Cloudflare Access sits in front, so **nothing is sent to a browser until the person has logged in**. Cloudflare builds `dist/` automatically on every push; you never upload files by hand.

### One-time setup (about 10 minutes, in your Cloudflare account)
1. **Create the site.**
   - In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**. Authorise GitHub and pick `bakshilabs/ai-lab-v3`.
   - Production branch: `claude/focused-cori-qeoveu`, or `main` once it's merged.
   - Framework preset: **None**.
   - Build command: `cd games/ecotown && npm ci && node build.mjs`
   - Build output directory: `games/ecotown/dist`
   - **Save and Deploy.** You get a link like `https://ecotown.pages.dev`.
2. **Add the login (Cloudflare Access).**
   - Go to **Zero Trust → Access → Applications → Add an application → Self-hosted**. If asked, choose the free plan and a team name.
   - Application domain: `ecotown.pages.dev`. Add a second domain: `*.ecotown.pages.dev`, so preview builds are protected too.
   - Session duration: 24 hours.
   - Add a policy:
     - Name: "Allowed people".
     - Action: **Allow**.
     - Include: **Emails**, listing each person, or **Emails ending in** `@yourschool.org` for a whole school.
   - Login methods: **One-time PIN**, which emails a code with no passwords to manage. Save.
3. **Test it** in a private browser window. Open the link, enter an allowed email, type the code from your inbox, and the game loads. An email that isn't on the list never sees any game files.

### Day to day
- **Add or remove someone:** edit the policy (Zero Trust → Access → Applications → Eco Town → Policies). Removing them takes effect at their next login.
- **See who used it:** Zero Trust → Logs → Access.
- **Custom address (optional):** Pages project → Custom domains, for example `ecotown.deltaopslearning.com`. Then add that domain to the same Access application.
- **Updating the game:** push to the branch. Cloudflare rebuilds and the same link shows the new version.

### What this protects, and what it can't
- **Protected:**
  - only listed people can open the site;
  - search engines won't index it;
  - other websites can't embed it;
  - files aren't kept in the browser cache;
  - visitors never get the readable source, tests or design documents;
  - right-click and save shortcuts are blocked.
- **Not possible for any website:** a game that runs in a browser has to send its code to the device. A determined, logged-in user with technical skill could still capture the scrambled files. If that's a concern, share access only with people under your agreement, and remove people when they no longer need it.

### Before deploying a change
Run the tests:

```bash
cd games/ecotown/game && node --test tests/sim.test.mjs tests/model.test.mjs tests/teach.test.mjs tests/syntax.test.mjs tests/playtest.test.mjs
```

Build the protected site:

```bash
cd games/ecotown && npm ci && node build.mjs
```

Preview it at http://localhost:8000:

```bash
cd games/ecotown/dist && python3 -m http.server 8000
```

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

0. **Start.** Choose the age band. The next card, the same for both age bands, names the town and sets the session length and facilitator notes. The name is used in the header, on the cards and on the printed report.
1. **Brief.** A card shows what the level adds. Lenses build up: L1 flood, L2 rush-hour street view and the step-free check, L3 carbon, L4 nature, L5 winter test, L6 walking time. Street view and inside view are always available.
2. **Plan.** The player instructs Florence with word tiles (default for 8–12), free text (default for 13–17) or a card. Florence flies over, beams down a see-through plan and shows her reading and her "% sure".
3. **Check.** The player chooses a lens or view. The island turns to pale clay and the honest simulation shows what the plan would really do. The lens bar is labelled "Florence's plan, before building", and Florence's guess stays on screen in a small card.
   - A check that finds nothing ends on a result card: what it tested, what it found (e.g. "Flood lens: No town land floods"), and two buttons, **Check another way** or **No problem found: use this plan**. Checks already tried are ticked.
   - Accepting never leaves the player stuck. If the plan is fine, it goes ahead (clean path). If a check the player didn't try would show a problem, that check runs before anything is built. If no check can show it (the plan just leaves something out), the game names what's missing and the player adds it while building ("The plan missed something" path).
   - **Step-free check** (L2 and L6): follows the routes from the town to the school gate and the ferry, the way a wheelchair user would, and marks busy car crossings, unsurfaced ground, steep steps with no graded path, and whether the ferry has a step-free approach. Level 2 needs a step-free route to pass.
   - Florence's Level 2 plan always connects the town to the school **and** the ferry. When a brief mentions wheelchairs, step-free routes, slopes, lighting or slower walkers, her plan names them (dropped kerbs, graded paths, longer crossing times, a ferry ramp, lit paths). When a brief asks for something unsafe ("ignore flood risk", "clear the wetland", "prioritise drivers"), she says what she didn't do and why, but only when her plan really kept to the rule.
4. **Fix.** The player names Florence's habit, writes a clearer instruction and builds.
   - The right habit comes from **what Florence actually assumed** in that plan (each planner reading carries its habit). For example, "fast" read as "wide roads" is *took one word too far*. A wrong pick explains what that habit means and points back at her guess; after two wrong picks the answer is explained.
   - **Clear first time?** The plan passes, then a short **"spot the hidden guess"** step asks what Florence still assumed (e.g. how much land 40 families need). So the lesson always happens, and good instructions can still earn 3 stars.
   - **Stars** (shown with their rules on every level-complete card):

     | Path | ★ 1 | ★ 2 | ★ 3 |
     |---|---|---|---|
     | Mistake first | Found it with the first check | Named the habit first time | The fixed plan passes |
     | Clear first | Clear instruction first time | Spotted the hidden guess | The plan passed its check |
     | Plan missed something | Checked the plan before building | Added what the plan missed | The finished town passes |

     Level 6's bias check gives a bonus star.
   - **Building:** tiles the selected tool can go on are lit up. The camera doesn't move on taps while building, and the tools panel can be folded away. One rule everywhere: nothing goes on the protected wetland except paths, green bridges, reed beds and "keep wild". Town land is capped at 18 tiles.
   - When the plan is accepted, a short letterboxed **construction film** shows how it is built, **system by system and layer by layer**. A numbered step strip follows along, read aloud for ages 8–12 and in more technical wording for 13–17. One featured tile is built slowly, then the rest of the plan goes up around it. Each film can be skipped, and with Reduce motion on it becomes a quick cut.

     | Level | Steps in the film |
     |---|---|
     | 1 | Surveyors peg out the town land |
     | 2 | Digging the trench, gravel base rolled flat, surface, then lines, lamps and crossings |
     | 3 | Clearing the site, foundations, frame (timber, or steel and concrete for concrete flats), water pipes and wires (shown through a see-through frame), walls (straw bale, rammed earth, reclaimed brick…), windows and doors, roof rafters, roof covering, then solar panels or a heat pump |
     | 4 | Ploughing, sowing, crops growing, fences and sheds |
     | 5 | Turbine foundation, tower sections, generator housing, blades fitted, then a glowing cable to the town |
     | 6 | The school built step by step, then the ribbon is cut |

5. **Move in** (level 3, when the homes are built). The followed family arrives on the sky-ferry and walks along the streets to their front door.
6. **Live.** A day passes, with thought bubbles from residents (pinned to a real resident) and a family diary that changes from morning to evening and comes from the simulation. The level 5 day is a snowy winter day. In the 13–17 version, "What residents said" lists the comments and repeated complaints can become a petition.
7. **Celebrate.** The level's builds replay as a time-lapse from the same angle, then the reward card appears. Its **"How Florence handled your instruction"** box says one of *No problem found*, *Florence misunderstood* (took one word too far, read the words too exactly) or *The plan missed something* (normal day only, missing information), with a sentence on what happened and who caught it with which check. The 13–17 version adds a town-meeting dilemma.

Level 6 adds three things before the final day:
- a check of the AI's summary of residents' views (sampling bias):
  - **8–12:** Florence says she asked 10 people at the car park; the children ask 10 people at the school gate (🚗 drives / 🚶 walks), then Florence counts everyone and explains why her answer changed;
  - **13–17:** **Teach Florence**. Florence trains a real classifier in the browser on residents' comments, first from the car-park survey box only (drivers), and her summary says "Residents want more car parks". Students inspect the training data, add comments from the school gate or write and label their own, and retrain until the summary matches the town;
- a three-promise town charter;
- a printable town report at the end. Its table "How Florence handled the brief, level by level" uses the same outcome wording as the level cards; level 6 also notes when a typed brief was stricter than the town rule (e.g. "You asked for a 10-minute walk; the longest route is 13 minutes. That meets the town's 15-minute rule, but not your brief."). Carbon is shown in tonnes against the 160 t town limit, and the homes' materials against level 3's 70 t limit. The reflection "Before I trust an AI plan, I…" has tap-to-add ideas (check the evidence, ask who was included, compare the result with the goal…) and a text box.
- The town flower's pop-up explains its scale: 100% (the dashed ring) means enough, and carbon is shown in tonnes against the limit.

### Numbers the game uses (one rule each)
- **Walking:** every home within **15 minutes** of school (check, lens, charter and bubbles all use `TARGETS.walkMinutes`).
- **Carbon:** the town limit is **160 t** (header, report, charter). Level 3 also has a limit of **70 t** for the homes' building materials, labelled "building carbon".
- **Level 5:** winter-night power, plus at least one rain garden or reed bed and one compost hub or repair café.

### Read-aloud voices
Lines are pre-recorded with **Kokoro-82M**, an open neural voice model (Apache-2.0):
- **narrator:** British "Isabella";
- **Florence:** "Bella".

`voice/collect.mjs` gathers every sentence the game can say, and `voice/render.py` records them into one pack per age band (`game/voice/pack-*.json` and `.bin`). A sentence with no recording, such as one with a live number, is read by the device's most natural voice. Auto-read is on for ages 8–12; the 🔊 buttons on Florence's card and on every card replay a line in both versions.

To re-record after changing text, see `voice/README.md`.

## Code map (`game/js`)

| Folder | What it does |
|---|---|
| `engine/` | Renderer and post-processing (tilt-shift, bloom, grade), sky and time of day (`stage.js`); voxel mesher (`voxel.js`); kit and extras; residents, wildlife and the ferry (`life.js`); Florence's drone (`bot.js`); WebAudio synth (`audio.js`) |
| `world/` | Terrain grid, zones, rim, mesas and canyons (`terrain.js`), construction stages (`construct.js`), build catalogue and placement rules (`catalog.js`), voxel builders (`builders.js`), the island in three.js (`world.js`), dollhouse rooms (`inside.js`) |
| `sim/` | The honest simulation (`sim.js`) and Florence's literal planner (`planner.js`) |
| `ai/` | `teach.js` trains the residents'-feedback classifier in the browser. `plotter.js` reads the instruction (small language model, falling back to keywords), plans, and replies from templates. `model.js` and `tokenizer.js` run the model; see `../model/README.md` |
| `game/` | The level flow (`game.js`), level rules (`levels.js`), text for both versions (`content.js`), checks and lenses (`checks.js`), bubbles, the report |
| `camera/rig.js` | Sky orbit, flights, street rails, follow and turntable shots |
| `ui/ui.js` | The frame: town card, icon strip, Florence dock, cards, labels and bubbles, read-aloud |

## Tests

From `games/ecotown/game`:

- Simulation and planner. This checks that each level's vague instruction produces its intended mistake and that the clear one fixes it:

  ```bash
  node --test tests/sim.test.mjs tests/model.test.mjs tests/teach.test.mjs
  ```

- End-to-end play-through of both versions with screenshots. It checks for no errors, no external requests and the on-screen panel limits. The server must be running first:

  ```bash
  node tests/playwright/run.mjs http://localhost:8765/ junior /tmp/shots
  ```

  ```bash
  node tests/playwright/run.mjs http://localhost:8765/ senior /tmp/shots-s 1920 1080 text
  ```

- Watch any film on its own: `index.html?film=homes`. The other films are `land`, `move`, `food`, `power` and `heart`.
- Render test page for the world on its own: `tests/visual/world.html?levels=6&hour=16.5&tier=high`.
