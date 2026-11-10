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
| Move around the island | drag with one finger | drag, or `W` `A` `S` `D` |
| Turn the island | twist with two fingers, or ⟲ ⟳ | right-drag (or Shift-drag), `Q` / `E`, ← / →, or ⟲ ⟳ |
| Tilt | move two fingers up or down | ↑ / ↓ (the tilt also follows the zoom) |
| Zoom | pinch (towards your fingers), or ＋ / － | scroll wheel (towards the pointer), `+` / `−`, or ＋ / － |
| Back to the whole island | ⌂ | ⌂ or `Home` |
| Place | tap a tile | click a tile (a preview and what it would change show first) |
| Remove | 🧽 Remove, then tap | right-click a tile, or `X` then click |
| Pick a build category | tap it | tap it, or `1`–`6` |
| Fly to a spot | double-tap (also while building) | double-click |
| Views | 🎥 → 👟 street · 🏠 inside · ⌂ back up | same |

One 🎥 button under the top-right strip opens the camera buttons (＋ － ⟲ ⟳ ⌂ 👟 🏠) for whiteboards and trackpads; they stay open on touch screens wider than a phone. Keys only move the camera when the island has focus, not while a button or text box is selected. The camera centres the island in the space the side panels leave free, and keeps the framing when the window is resized.

The ☰ menu has 📜 **Town report**, 🌇 **Watch a whole day** and 🎬 **Watch Florence's intro again**, then these settings:
- sound: on (music and effects), effects only, or off (music starts off when "In order (class)" is chosen);
- read aloud;
- reduce motion (camera flights become fades);
- facilitator notes;
- large text;
- graphics quality (auto, low, mid or high).

### Sound and music
All sound is made live in the browser (`js/engine/chip.js`, `js/engine/audio.js`, `js/music/songs.js`): an 8-bit style chip synth with two pulse voices, a triangle bass and noise drums. There are no audio files. Four original loops follow the game: **day** (free building), **night** (evening and the winter test), **AI Lab** (missions) and a short **celebration** (mission reward, town complete). They change at the next bar with a crossfade. About 20 effects cover placing (pitch by category, climbing within a quick run), removing, a wrong spot, tips, stars, unlocks, a check catching a flaw or passing, the Lab door, Florence's footsteps, dusk and dawn, and the fanfares. Music dips under Florence's voice. A limiter keeps the mix safe, and after about three minutes the loop thins out for a while so it doesn't wear on anyone. The tunes are written for this game: chip *style* only, no melody or sound taken from any other game. `tests/audio.test.mjs` renders every effect and loop offline and checks level, length and that nothing is silent or broken.

## How the game plays

Eco Town is a free-building game with an AI Lab inside it. There is no forced sequence: the player builds, and steps into the AI Lab when they want to (or when Florence invites them), then comes straight back to building.

### Start
Choose the age band, then name the town and choose how the AI Lab missions are played:
- **Any order** (default): any mission can be opened once its build category has unlocked.
- **In order (class):** only the next mission opens, and Florence invites players to it as soon as it is ready. Use this when a whole class should move through the lessons together.

**Florence's guided first build** (`js/game/intro.js`, about 90 s, **Skip intro** always visible, replay from ☰): Florence walks off the sky-ferry dock and waves, walks to the river meadow and peers through her magnifier while it floods, walks up to the dry slope and asks the player to tap three tiles of town land (three suggested tiles glow gold; a 0/3 bar fills in her card), plays the timber-terrace build video, points out the build panel and walks to the AI Lab building ("I'm clever… but sometimes confidently wrong. Can you catch me?"), then "Over to you!". The three tiles are kept.

### Free building (the main screen)
- **Layout (laptops, tablets, whiteboards):** the island gets nearly the whole screen. The town card is a slim strip across the top (name, stars, the six missions, and **one next step with a progress bar**, e.g. "Build homes for 4 more families to unlock Food"); the top-right strip has four buttons: 🌼 **town goals** (the flower and all eight goals, ticked as they're met, with how to reach each), 🔍 **lenses** (appears with the first lens), 🧪 AI Lab and ☰ menu, with one 🎥 camera button under it; the build tools are one **hotbar along the bottom**; Florence's tips pop up just above it on the right and fold to her portrait. In AI Lab missions the panel is a bottom bar too: Florence's words on the left, the steps and choices on the right.
- **Build hotbar** (a bottom tray on phones, a side rail on phones held sideways): wooden block panels in the island's palette. Left: the clock with ⏸ and one fixed **🧽 Remove** tool (13–17: credits under it). Right: six category slots in a 3 × 2 block, an **info line** for the selected (or hovered) build — its name, one sentence on what it does for the town (`desc` in `catalog.js`, both age bands), effect chips in the flower's colours (+4 👪, +1 🦋, −2 ☁ …), where it can go, its cost (13–17) and ▶ to watch it being built — and a scrolling row of **picture buttons**, one per build (`tools/thumbs.mjs` → `img/thumbs/`). Every tile shows what a tap with the selected tool would do, all **solid and at ground level, so buildings and Florence always stand in front**: a **cyan kerb** = you can build here, a **violet kerb with corner blocks** = it swaps out what's there, a **solid grey tile** = can't build here (Remove shows a red kerb on what can be removed). A key explains them for the first five builds, then folds to a "?". Hovering a tile shows the **real change** that build would make to the town (`js/game/delta.js`, from the simulation: e.g. +4 👪 −1 🦋 +9 ☁ −4 💰) or why it can't go there; after a build the change **floats up** from the tile and the flower petals it helped light up. **Tapping a tile that already has something replaces it** (`js/game/replace.js`): a farm on town land clears the town mark, Keep wild on a home removes the home, a new home swaps for the old one (its add-ons stay). Anything removed is refunded (13–17 credits). Tapping the same thing again does nothing. Missions and "Use Florence's plan" never replace the player's builds. Nothing is locked: the player can remove anything they built. Each town goal met for the first time gets a small celebration (once per town). No see-through or blurred visuals anywhere: plan previews are solid pale blocks with a raised frame, and the tilt-shift blur is off.
- **Grow to unlock** (`js/game/progress.js`). Land and paths are open from the start. Homes open at 6 tiles of town land, Food at 12 families, Power & water at 24 families with enough food for them, Town heart at 36 families with enough food. (Homes alone no longer open everything: the families must be fed first.) Opened categories stay open. A locked category still shows its builds, greyed, with a bar filling toward the unlock (e.g. "Homes for 12 families: 8 / 12"). The town card's next goal names the next unlock.
- **The town lives while you build:** a slow day clock (about 2½ minutes from 6:00 to 22:00, with a pause button), residents walking their routines, at most two thought bubbles, lights at night. The first family arrives on the sky-ferry when the first homes are built. Ages 13–17 earn credits each evening from households, and items cost credits.
- **Town card** (top left): the next goal with live numbers, and the six missions on the track as pictures (a red ! = ready, green ✓ = done). Tapping the track opens the AI Lab.
- **Florence on the island** (`js/engine/florence.js`): a 3D wooden toy robot built from the client's character art (two-tone wood, brown eyes and brows, ear bolts, a teal-lit springy antenna, a brass magnifying glass and a "…" speech card). Everything is procedural: a walk with planted feet, wave, point (with the magnifier), peer (the lens in front of her eye), talk (her mouth moves and the card's dots pulse), cheer, proud, surprised, and "oops" (worried brows, a sweat drop, scratching her head) when a check catches her mistake. While you build she walks over to peer at new builds, walks to a problem and points at it when she gives a tip, and cheers at unlocks. Reduce motion: she slides, without the wobble.
- **The AI Lab building** stands on the coast beside the old school. Tapping it opens the Lab board; Florence walks in through its door before a mission starts.
- **Build videos** (one per build, about 10 s): the build goes up layer by layer seen from above, then the camera swoops down to eye level, where Florence peers at it. Captions follow the stages (both age bands from one video, read aloud for 8–12). From the ▶ on any build button, in the intro, with "From above / Eye level / Replay".
- **Town land** is capped at 30 tiles in free building. One rule everywhere: nothing goes on the protected wetland except paths, green bridges, reed beds and "keep wild".

### Florence's tips (`js/game/advisor.js`)
In Florence's card (bottom right, with her portrait from the client's art), with 🔊 and at most one button; tap the card to close it. Every tip ends with something to do ("…Add a battery store or a wind turbine"). After a while, or on a tap, the card shrinks to her portrait; tap it to read the tip again. A tip only appears when something really changes (town land on the floodplain, a busy road on the school run, homes over the carbon limit, the bees leaving, a winter-night blackout, homes too far from school…), at most one every 25 seconds, and the same tip is not repeated until its problem has been fixed and comes back. When a mission teaches that problem, the tip offers **🧪 Show me in the AI Lab**; once that mission is done, it offers that mission's lens instead. When a category unlocks, Florence says so and mentions the new mission. When a problem she pointed out is fixed she says well done (a green ✓ card), and when nothing is wrong she suggests a next step toward the first goal not met yet ("Families need food. Try a Mixed farm or an Orchard.").

### The AI Lab
The AI Lab building or the 🧪 button (its badge shows how many missions are ready) takes the player into **Florence's classroom**: she stands at the front beside a big screen, with classmates at their desks. Ask her a question (type it, or tap a suggested one): she answers from a fixed, kid-safe set (`js/game/qa.js`; nothing is generated or sent anywhere) and plays the matching build video on the screen. **Missions** opens the Lab board: six missions, each locked, ready, or done with its stars (missions can be replayed; the best run counts). A mission picture on the town card's track opens that mission straight away when it's ready.

A mission is one of the six lessons, played on **Florence's practice island**, a copy of the island with the earlier missions built from their clear instructions (`js/game/seed.js`). The player's own town is not touched. The frame takes a cooler tint while in the lab. "Not now" on the brief card goes straight back to building.

1. **Brief.** What the mission adds (L1 flood lens, L2 rush-hour street view and the step-free check, L3 carbon, L4 nature, L5 winter test, L6 walking time) and Florence's task.
2. **Plan.** The player instructs Florence with word tiles (default for 8–12), free text (default for 13–17) or a card. Florence flies over, beams down a see-through plan and shows her reading and her "% sure".
3. **Check.** The player chooses a lens or view. The island turns to pale clay and the honest simulation shows what the plan would really do. The lens bar is labelled "Florence's plan, before building", and Florence's guess stays on screen in a small card.
   - A check that finds nothing ends on a result card: what it tested, what it found, and two buttons, **Check another way** or **No problem found: use this plan**. Checks already tried are ticked.
   - Accepting never leaves the player stuck. If the plan is fine, it goes ahead (clean path). If a check the player didn't try would show a problem, that check runs. If no check can show it (the plan just leaves something out), the game names what's missing and the player tells Florence ("The plan missed something" path).
   - **Step-free check** (missions 2 and 6): follows the routes from the town to the school gate and the ferry, the way a wheelchair user would. Mission 2 needs a step-free route to pass.
   - When a brief asks for something unsafe ("ignore flood risk", "clear the wetland", "prioritise drivers"), Florence says what she didn't do and why, but only when her plan really kept to the rule.
4. **Fix.** The player names Florence's habit and writes a clearer instruction; it is re-tested automatically until it passes.
   - The right habit comes from **what Florence actually assumed** in that plan. A wrong pick explains what that habit means and points back at her guess; after two wrong picks the answer is explained.
   - **Clear first time?** A short **"spot the hidden guess"** step asks what Florence still assumed, so the lesson always happens and good instructions can still earn 3 stars.
5. **Build film.** The fixed plan is built on the practice island in a short letterboxed **construction film**, **system by system and layer by layer**, with a numbered step strip (read aloud for 8–12, more technical for 13–17). Skippable; a quick cut with Reduce motion.

   | Mission | Steps in the film |
   |---|---|
   | 1 | Surveyors peg out the town land |
   | 2 | Digging the trench, gravel base rolled flat, surface, then lines, lamps and crossings |
   | 3 | Clearing the site, foundations, frame, water pipes and wires, walls, windows and doors, roof rafters, roof covering, then solar panels or a heat pump |
   | 4 | Ploughing, sowing, crops growing, fences and sheds |
   | 5 | Turbine foundation, tower sections, generator housing, blades fitted, then a glowing cable to the town |
   | 6 | The school built step by step, then the ribbon is cut |

6. **Reward.** Stars with their rules, **"How Florence handled your instruction"** (*No problem found*, *Florence misunderstood* or *The plan missed something*), a fact, and the new lens. 13–17 first gets a town-meeting dilemma. Then the player chooses:
   - **Use Florence's plan:** what fits is added to their own town (never over something they built; the town-land cap applies; for 13–17 the AI Lab pays, so no credits are spent). The caption says how much fitted.
   - **Keep my town as it is:** nothing changes.

   Back in free building, the mission's lens is in the 🔍 lenses pop-over in the top-right strip, for checking their own town any time (lens bar: "Your town now").

   | Path | ★ 1 | ★ 2 | ★ 3 |
   |---|---|---|---|
   | Mistake first | Found it with the first check | Named the habit first time | The fixed plan passes |
   | Clear first | Clear instruction first time | Spotted the hidden guess | The plan passed its check |
   | Plan missed something | Checked the plan before building | Told Florence what her plan missed | Her new plan passes |

Mission 6 (Town heart) adds:
- a check of the AI's summary of residents' views (sampling bias), for a bonus star:
  - **8–12:** Florence says she asked 10 people at the car park; the children ask 10 people at the school gate, then Florence counts everyone and explains why her answer changed;
  - **13–17:** **Teach Florence**. Florence trains a real classifier in the browser on residents' comments, first from the car-park box only, and students balance the training data until the summary matches the town;
- after the mission, a three-promise **town charter**, checked against the player's own town.

### Town complete, the whole day and the report
When every petal reaches "enough", carbon is under 160 t, the winter night stays lit and every home is within 15 minutes of the town's own school, a **Town complete** card appears (once) with **Watch a whole day** and **Town report**. The missions' plans alone don't complete a town: players still need places to meet, for example a hall and a market.

The **town report** can be opened any time from the ☰ menu, printed, and closed to carry on building. Its table "How Florence handled the brief, mission by mission" shows each mission done (or "not tried yet"), the instructions given and the outcome; carbon is shown against the 160 t town limit. The reflection "Before I trust an AI plan, I…" has tap-to-add ideas and a text box.

The game saves itself on the device (`ecotown.save.v3`) after each change and each mission; reopening offers **Carry on building**. Older saves from the step-by-step version are ignored.

Test mode: `index.html?sandbox=full` opens every category from the start (nothing is saved).

### Numbers the game uses (one rule each)
- **Walking:** every home within **15 minutes** of school (check, lens, charter and bubbles all use `TARGETS.walkMinutes`).
- **Carbon:** the town limit is **160 t** (header, report, charter). Mission 3 also has a limit of **70 t** for the homes' building materials, labelled "building carbon".
- **Mission 5:** winter-night power, plus at least one rain garden or reed bed and one compost hub or repair café.

### Read-aloud voices
Lines are pre-recorded with **Kokoro-82M**, an open neural voice model (Apache-2.0):
- **narrator:** British "Isabella";
- **Florence:** "Bella".

`voice/collect.mjs` gathers every sentence the game can say, and `voice/render.py` records them into one pack per age band (`game/voice/pack-*.json` and `.bin`). A sentence with no recording, such as one with a live number, is read by the device's most natural voice. Auto-read is on for ages 8–12; the 🔊 buttons on Florence's card and on every card replay a line in both versions.

To re-record after changing text, see `voice/README.md`.

## Code map (`game/js`)

| Folder | What it does |
|---|---|
| `engine/` | Renderer and post-processing (tilt-shift, bloom, grade), sky and time of day (`stage.js`); voxel mesher (`voxel.js`); kit and extras; residents, wildlife and the ferry (`life.js`); Florence, the 3D wooden robot (`florence.js`); WebAudio synth (`audio.js`) |
| `world/` | Terrain grid, zones, rim, mesas and canyons (`terrain.js`), construction stages (`construct.js`), build catalogue and placement rules (`catalog.js`), voxel builders (`builders.js`), the island in three.js (`world.js`), dollhouse rooms (`inside.js`) |
| `sim/` | The honest simulation (`sim.js`) and Florence's literal planner (`planner.js`) |
| `ai/` | `teach.js` trains the residents'-feedback classifier in the browser. `plotter.js` reads the instruction (small language model, falling back to keywords), plans, and replies from templates. `model.js` and `tokenizer.js` run the model; see `../model/README.md` |
| `game/` | Free building and the AI Lab missions (`game.js`), Florence's guided intro (`intro.js`), unlocks and town goals (`progress.js`), Florence's tips (`advisor.js`), the practice island (`seed.js`), mission rules (`levels.js`), text for both versions (`content.js`), checks and lenses (`checks.js`), bubbles, the report |
| `camera/rig.js` | Sky orbit, flights, street rails, follow and turntable shots |
| `ui/` | The frame (`ui.js`): town card, icon strip, build panel, Florence's card, mission dock, cards, labels and bubbles, read-aloud; build pictures (`thumbs.js`) |

## Tests

From `games/ecotown/game`:

- Simulation and planner. This checks that each level's vague instruction produces its intended mistake and that the clear one fixes it:

  ```bash
  node --test tests/sim.test.mjs tests/model.test.mjs tests/teach.test.mjs
  ```

- Free building: unlock tiers, town goals, Florence's tips (cooldown, no repeats), and each mission on the practice island (vague card flawed, clear card passes):

  ```bash
  node --test tests/progress.test.mjs
  ```

- End-to-end play-through of both versions with screenshots: the player taps town land onto the island, homes unlock, Florence's first tip shows, then all six missions are played from the Lab board (using Florence's plan each time, except mission 2, which checks that "Keep my town" changes nothing), a lens is used and the report opens and closes. It checks for no errors, no external requests and the on-screen panel limits. The server must be running first:

  ```bash
  node tests/playwright/run.mjs http://localhost:8765/ junior /tmp/shots
  ```

  ```bash
  node tests/playwright/run.mjs http://localhost:8765/ senior /tmp/shots-s 1920 1080 text
  ```

- Build videos: `index.html?shoot=<item>` sets up the shot (a whole demo town; `window.__render(t)` renders frame by frame). Record them all (about 4 minutes each in software 3D) into `game/videos/`, with posters and caption timelines:

  ```bash
  node tests/video/record.mjs http://localhost:8765/
  ```

  Add `--force` to re-record, or list items to record only those. After changing a builder, re-render the button pictures with `node tools/thumbs.mjs http://localhost:8765/`.
- Florence on her own, in every pose: `tests/visual/florence.html?poses=idle,walk,wave,point,peer,talk,cheer,oops,proud,think&close=1`.
- Play-through with Florence's intro played (not skipped): `INTRO=1 FAST=1 node tests/playwright/run.mjs …`.
- Watch any film on its own: `index.html?film=homes`. The other films are `land`, `move`, `food`, `power` and `heart`.
- Render test page for the world on its own: `tests/visual/world.html?levels=6&hour=16.5&tier=high`.
