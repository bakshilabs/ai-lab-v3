# Eco Town: notes for the next Claude Code session

Eco Town is a browser game (three.js voxel) with two versions, for ages 8–12 and 13–17. Players build a sustainable town with **Florence**, an AI planner that is sometimes confidently wrong, and learn to catch its mistakes.

| For | See |
|---|---|
| How to run and deploy | `README.md` |
| The game's design | `DESIGN.md` |
| Teachers and facilitators | `LAB-GUIDE.md` |
| Future paywall plan (not built yet) | `docs/FUTURE-PAYWALL.md` |

Everything is merged to `main`. The working branch was `claude/focused-cori-qeoveu`.

## Who the user is and what they want
- **The business.** The user runs a game design company and keeps admin access themselves:
  - teachers ask the company for a **batch of passcodes** for a set period;
  - students play free with those codes during the period;
  - **later**, a Stripe paywall with Apple Pay or Google Pay comes in once the free period ends. It is not built yet; see `docs/FUTURE-PAYWALL.md`.
- **Look the user approved:**
  - a floating island in a brochure style, with a terracotta, warm palette;
  - **small trees**, but **large canyons**.
- **Teaching style:** show how things are built "**system by system, layer by layer**", using construction films, not swarming effects.
- **Explanations:** the user wants plain, non-technical explanations and step-by-step dashboard instructions.
- **Git:** never ask the user to pull, commit or merge. Do it yourself: commit, push, open the pull request and merge it into `main`, so the public test site republishes.
- **Security rules:**
  - never ask for or paste secrets in chat; credentials go through the secure form, `request_credential`;
  - the classroom site must **never be public by mistake**;
  - the GitHub Pages test version is meant to be public, with no login.

## Live setup
| What | Where |
|---|---|
| Students (passcode) | https://ecotown.deltaops.workers.dev |
| Admin (company only) | https://ecotown.deltaops.workers.dev/admin, via Cloudflare Access ("Sign in with Cloudflare") |
| Public test version | https://bakshilabs.github.io/ai-lab-v3/. Live, public, no login; republished on every push to `main` that touches the game |

**Cloudflare account**
- Account id `9c5ee116be85caa02b46ec934ed28bbf`, owned by vs.code.iloader@gmail.com.
- The workers.dev subdomain is `deltaops`. The user renamed it from `vs-code-iloader` in the dashboard.

**Worker `ecotown`** (in `worker/`)

| File | Role |
|---|---|
| `worker.js` | Router, passcode page, Access token check for `/admin` |
| `store.js` | Durable Object `CodeStore` (SQLite), binding `CODES` |
| `codes.js` | Passcode logic: batches, `WORD-1234` codes, newest login wins, rate limit |
| `admin.html` | Admin console |

- The game sends a heartbeat every 60 s from `game/js/main.js`.
- workers.dev is **on**. Preview URLs are **off**.

**Cloudflare Access app "Eco Town admin"**
- Team: `lively-silence-ec13.cloudflareaccess.com`.
- App id `4265ca95-ac22-4204-9a65-3cabf6de3b61`.
- AUD `2fd6668e3bbe8607cd949c86d1da34d104d9486ff85529c348f09fdb581987dc`. This is hard-coded in `worker.js`.
- Domains: `ecotown.deltaops.workers.dev/admin`, `ecotown.pages.dev` and `*.ecotown.pages.dev`.
- Policy "Allowed people": `vs.code.iloader@gmail.com`.
- One-time PIN login could not be created through the API, so the login is "Sign in with Cloudflare".

**Leftover:** an empty, login-protected Pages project `ecotown.pages.dev`. It can be deleted if the user agrees.

## Ship-readiness round 1 (10 Nov 2026)
The user asked whether the game was ready for millions of students (answer: not yet) and then asked for autonomous rounds of improvement. A fresh play-through (laptop, phone, all six missions) found the problems below; this round fixed the ones marked done.
- **First load (done):** it was about 15 MB (one 10 MB voice pack that had to arrive whole, and a 2 MB model that blocked the start). Now about 5 MB before play.
  - Voice packs are split into chunks of about 200 KB (`game/voice/pack-<band>-<hash>.bin`, index `pack-<band>.json` with `chunks` and `[key, chunk, offset, length]`). `js/ui/voice.js` fetches the index and first chunk at the start and each other chunk when a line in it is first spoken; a chunk that fails falls back to the device voice. `voice/render.py` writes chunks; `voice/chunk.mjs` converts an old one-file pack.
  - Florence's model loads in the background (`app.modelP`); `runLab` waits for it.
  - Loading screen: `#boot` in `index.html` (CSS at the end of `game.css`), removed in `start()`. It is a message only, not a WebGL check.
- **Classroom site load (done in code, NOT deployed yet):** `worker/worker.js` reuses a successful session check for 60 s for files other than the page (one page load was about 100 calls to the single code store), and content-hashed files are sent with `Cache-Control: private, max-age=604800, immutable`. The page and heartbeats still ask the store every time. One store handles roughly 1,000 requests a second, so heartbeats cap it near 50,000 players at once; beyond that the store needs sharding by batch.
- **Building pushes back (done):** Power and Town heart open only when the families are also fed (`progress.js` `TIERS`, `nextUnlock().kind`, `nextStep.food`). Eight taps of one house used to open every category in 40 seconds.
- **Badges (done):** `js/game/badges.js` (13 badges at first, tests `tests/badges.test.mjs`), saved as `G.badges`, ★1 each, shown under the Star shop (`ui/rewards.js`), checked in `milestones()`.
- **Phone portrait (done):** compact build bar (last block of `game.css`); tips with a button fold to Florence's small figure after 9 s on screens up to 760 px wide. Panels went from about 66 % of a 390 × 664 screen to about 46 %.
- **Graphics "auto" (done):** `main.js` keeps watching the frame time and steps the quality down after four slow seconds.
- **Still open (cannot be done from a cloud session):** sessions with real children; frame rates on a real Chromebook, an older iPad and a mid-range Android phone.
- **Still open (can be done):** a screen-reader pass; other languages; a budget for ages 8–12; the four voice lines without a recording (lines with live numbers are read by the device voice by design).

## Ship-readiness round 2 (10 Nov 2026)
- **A player who only follows the hints** (`tests/playwright/hints.mjs [junior|senior]`, using the test hook `G.hint()`): the next-step line and Florence's first good spot must lead to all eight town goals with no dead end and no build suggested more than four times running. Before the fixes it suggested ten wind turbines and three markets in a row, boxed in the town centre, put the school where walks got longer and ended on a cycle lane with nowhere to go. Now ages 8–12 reach all eight goals in 27 builds and are sent to the AI Lab. Ages 13–17 run out of credits after the school (by design: households pay each evening).
  - `game.js`: `ideaTool` picks an open build that has a good spot now, the kind the town has fewest of (`IDEA_TOOL` lists more kinds); `GOAL_ORDER`/`firstGoal` put the school before power, community, health and nature in the next step and in Florence's ideas.
  - `spots.js`: farms keep one tile back from the town where there is room; wind turbines go on open ground at least three tiles from the homes (reason `windy`).
- **Badges:** 14 now. "Light footprint" needs carbon ≤ 75 (≤ 100 was earned by default); new "Room for more" (52 families, fed, none flooded).
- **Safety net:** `main.js` shows one small notice ("Something went wrong. Your town is saved." with Reload) on an uncaught error after the game has started. It never stops the game.
- **Accessibility:** axe-core (WCAG 2 A/AA and best practice) on the start, name, building, shop, menu and mission-start screens: 0 issues after naming the progress bars, making the page a `<main>` landmark and fixing one heading level. A screen-reader walk-through of a whole mission is still not done.
- **Checked:** 180 unit tests; six-mission play-throughs for ages 8–12 (1366 × 768) and ages 13–17 (390 × 844, typed briefs): no errors; `a11y.mjs` passes.
- **Decision left for the user:** a budget for ages 8–12. It would make choices matter, but a child who runs out must wait for the evening, and that needs testing with children first.

## Ship-readiness round 3 (10–11 Nov 2026): a no-context "9-year-old" playtest
A subagent played with no knowledge of the code (laptop 7/10, phone 4/10). Fixed from its report:
- **"Show me in the AI Lab" looked dead** (nothing showed for 5–7 s while Florence walks to the Lab): `openLab` shows a "Going into the AI Lab…" caption at once.
- **Choosing a lens was a guess:** each lens button carries a line from `checkWhat` ("checks which land floods in winter").
- **Quiz and accept wording:** `alsoFits` says both answers count; the accept button is "I think it's fine: use this plan" (the game may still show a problem, so "No problem found" read as a lie).
- **Tips:** every tip folds to Florence's figure (9 s phones, 14 s plain, 25 s with a button); ✕ sets `sb.quietUntil` for 45 s so the next tip does not pop up at once.
- **Phones:** after the intro the camera frames the town (`townView`, passed to the intro as `api.home`); one ★ pin instead of three overlapping ones.
- **Small:** lenses are shown in daylight (`tick`, `toggleLens`; not the winter lens); a new badge is announced after a goal banner, not over it; no "lights went out" bubble before the town has power (`bubbles.js`).
- **Voices:** `voice/collect.mjs` no longer collects the source text of functions as lines; the changed lines were recorded (Kokoro and the clip cache were still in the session scratchpad; the old lines were merged back by key before `render.py`, as before).
- **Not addressed from that report:** the building film is long on a slow machine; phone build-tray labels are cut ("Rammed-earth…") and the tray shifts when a tip shows; the classroom board is blurry on phones; silly taps (the river) only get a short message; Florence has no joke for off-topic questions.

## Ship-readiness round 4 (11 Nov 2026): a second no-context playtest, phone only
A subagent played ages 8–12 on an upright phone with taps only (6.5/10; the phone was 4/10 before round 3). Fixed from its report:
- **Florence's words were cut off in missions** (the speaker card shrank to a line or two above the instruction tray): on phone portrait the dock may be 70 % of the screen, her card takes what its text needs up to 34 vh, and the answer tray scrolls (last blocks of `game.css`). `run.mjs` now takes a `<mission>-retry` screenshot of that step.
- **Plan-adopted message** was 11 lines on a phone: `planUsed`, `planLeft`, `townDiffers` are now short.
- **Phone messages** (`#toast`) sit under the top card while building (they landed on Florence's tip); **Skip intro** sits beside the Camera button, off the island; long build names have a `short` form in `catalog.js` for phone buttons.
- **For people to run:** `docs/DEVICE-AND-CHILD-TESTS.md` (a device test with a frame-rate readout, `?fps=1`, from `main.js`; a child-session sheet; a class load test).
- **Voices:** nothing new to record this round. Do not run `render.py` after `collect.mjs` when no line is new: collecting reorders the lines, which rebuilds every chunk under a new name (about 19 MB of churn in git).
- **Not addressed from that report:** the intro has about six Next taps and asks for three tiles and then three more; the mission list does not say which missions are optional (none are: all six are needed to complete the town); a ★ pin can sit on a speech bubble; the Lenses pop-over covers the next-step text on a phone; the classroom board is blurry on a phone.

## Ship-readiness round 5 (11 Nov 2026): a reason to play on
The user asked again for best-seller quality. The biggest gap named was depth: a hint-follower finishes the town in 27 builds and has no reason to build a second one.
- **Town score** (`js/game/score.js`, tests `tests/score.test.mjs`): 0–100 from nine parts (homes 15, food 10, nature 10, health 10, winter power 10, community 10, carbon 20, walk 10, catching Florence 5). Every part except homes is scaled by families ÷ 40, so a hamlet cannot out-score a town. A town that just meets the eight goals scores about 78 (silver, 75+); gold is 90 and needs more than "enough". A greedy builder on the real simulation reaches 88 without catches and 90 with them, so gold is reachable but hard.
  - Shown above the goals in the 🌼 pop-over (`scoreHtml`: score, medal, points to the next medal, where the most is to gain), beside the clock (`sb.scoreTxt`), on the town-complete card and, as the best score per age on this device (`localStorage` `ecotown.best.v1`), on the start screen as the score to beat. Saved as `G.bestScore`, `G.medal`. A first-time medal is announced once.
  - New badge "Gold town" (15 badges). `G.hint()` also returns the score.
- **Intro:** the hello needs no tap and the walks are quicker (three Next taps, was four).
- **Checked:** the public test site serves round four.
- **Still a design question for the user:** whether the score is enough depth, or the game also needs challenge towns (a smaller island, a tighter carbon limit) and coins for ages 8–12.

## Ship-readiness round 6 (11 Nov 2026): challenge towns for a full-day club
The user said the game is for a **full-day kids' club**, and **refused a budget for ages 8–12** ("What is a budget for, to limit game time? No."). Do not propose a junior budget again. The gap was that one town is about an hour of play.
- **Challenge towns** (`js/game/challenges.js`, tests `tests/challenges.test.mjs`): seven new towns with one rule each: Florence's Town (`start: 'florence'`, a flawed town built by `florenceTown`), Tiny Town (`cap: 8`), Light Footprint (carbon ≤ 60), The Still Island (`ban: ['wind']`), Wild Island (five animals, nature ≥ 1.3 × the empty island), Room for Everyone (60 families), Eight-Minute Town (school and daily needs within 8 minutes).
  - Passed = the eight town goals and the challenge's own goals; the medal is the town score's medal, at least bronze. The tests build each one from a fixed recipe on the real island, so every challenge is known to be passable, and an ordinary town does not pass the hard ones.
  - In `game.js`: `CH`, `CAP`, `banned`, `SLOT` (each challenge has its own save, `ecotown.save.v3.<id>`), every category and lens open, no intro, a rule card once (`G.chSeen`), the challenge's goals in the 🌼 pop-over (`tailGoals`, `chRule`) and in the next step, `challengeCheck` and `celebrateChallenge`.
  - Device record `ecotown.best.v1`: `labs[band]` (six missions done, which opens the challenges) and `ch[band][id] = { medal, score }`. Challenge towns do not count for the "best town score" line.
  - Start screen (`main.js`): a 🏆 Challenge towns button and board; `?challenges=1` opens the board on any device. ☰ has "Challenge towns" and, inside a challenge, "Back to my own town". The town-complete card has a Challenge towns button.
  - The hint for winter power picks a generator first when nothing generates (`ideaTool`); on the Still Island it used to ask for battery after battery.
- **Phone:** Florence's tip keeps ✕ and 🔊 side by side and her words wrap round them (a tip without a button is 72 px tall, was 106); category tabs are 46 px. The build tray is 207 px (was 217). This is a small gain: the tray's info lines are the next thing to fold.
- **Voices:** the challenge names, rules and cards have no recordings yet (the device voice reads them). Record them with `voice/collect.mjs` and `render.py` when a session has Kokoro.
- **LAB-GUIDE.md:** a full-day club plan and a table of the challenges.
- **Still open:** sessions with real children and real devices (`docs/DEVICE-AND-CHILD-TESTS.md`); whether seven challenges are enough for a day or the club needs a second island.

## Free-build redesign (Nov 2026, after the beta)
The user found the guided six-level sequence exhausting ("prompt after prompt, a tunnel") and asked for a StarCraft-style city builder: **build first, get tips from Florence, step into the AI Lab, come back to building**. Decisions the user made:
- **Replace** the guided flow. A start-screen option "AI Lab missions: Any order / In order (class)" keeps the lessons in order for classes.
- **Lab entry:** the 🧪 button (and the mission track on the town card), plus Florence's tips, which offer "Show me in the AI Lab" when the town hits a problem a mission teaches.
- **Grow to unlock:** land and paths → homes (6 town tiles) → food (12 families) → power and water (24) → town heart (36, or 24 with enough food). See `game/js/game/progress.js`.
- **Light tips:** one line, at most one every 25 s, only when a rule turns true, not repeated until fixed (`game/js/game/advisor.js`).

How it is built:
- `game.js`: free building (`renderBar`, `placeAt`, `changed`, `tick`), Florence's tips (`advise`, `showTip`), the Lab board (`labBoard`) and missions (`runLab`, `retry`, `leaveLab`), the whole day, town complete and the report. The old per-level instruct/check/habit/hidden-guess code is unchanged inside missions.
- Missions run on **Florence's practice island** (`seed.js`: earlier levels built from their clear slots), never on the player's town. The reward card asks "Use Florence's plan" (adds what fits, never over the player's builds) or "Keep my town". Finishing a mission puts its lens in the top-right strip (`LAB_LENS`).
- Town land cap in free building is 30 (`SANDBOX_TOWN_CAP`); the land mission still plans 18.
- Save key `ecotown.save.v3` (autosaved); v2 saves are ignored. `?sandbox=full` opens every category (nothing saved).
- Senior: credits (start 60, households pay each evening) replace the old fixed 150-credit budget.
- `tests/progress.test.mjs` covers tiers, tips and each mission on the practice island; `tests/playwright/run.mjs` plays the new flow. `tests/playwright/a11y.mjs` checks keyboard access to the build bar and the Lab board, and that "Carry on building" restores the town.

## Florence, intro, voxel UI and build videos (Nov 2026)
The user asked for Florence as an animated character (their wooden-robot art is `game/img/florence.png`), an intro where Florence walks the player through the game, prerecorded build videos from above and at eye level, and a UI made of picture-button grids in the voxel style (not white cards with pills). Two design reviews, one of the UI/UX and one of the character, were done by subagents and their main points fixed.
- **Florence:** `game/js/engine/florence.js`, a procedural 3D wooden robot. It has a face rig, two-bone arm IK, a planted-feet walk, and expressions: oops, proud, surprised, cheer, peer, point, think, talk. It keeps the old drone API (`hover`, `beam`, `shrug` → oops). Check page: `tests/visual/florence.html`.
- **AI Lab building:** fixed tile `ailab` beside the old school (`terrain.lab`, builder `FINE.ailab`). Tapping it opens the Lab board, and Florence walks in before a mission.
- **Intro:** `game/js/game/intro.js`, on top of free building. It is saved as `introDone` and replayed from ☰.
- **UI:**
  - left `#build` panel: `renderBar` in `game.js`, picture slots from `img/thumbs/*.png`. Re-render the pictures with `node tools/thumbs.mjs <url>`;
  - right `#florence` card: `ui.florence` and `ui.florenceMini`;
  - in missions the `#dock` is a bottom bar (`html[data-lab=on]`, speaker left, actions right, checks 4 to a row);
  - the camera view offset (`frameView`) centres the island in the free space.
- **Build videos:**
  - `index.html?shoot=<item>` gives a deterministic `__render(t)`. `tests/video/record.mjs <url> [items] [--force]` writes `game/videos/<item>.mp4/.jpg/.json` and `index.json`. In software 3D that is about 4 minutes per clip, about 2.5 hours for all 36.
  - The game reads `videos/index.json` and shows a ▶ on items that have a video.
  - On the Worker, `img/` and `videos/` go to the same KV namespace as the voices (keys = paths, only changed files are uploaded, using a `media-manifest.json` kept in KV). They are served with a session, and videos support HTTP Range (needed for iPad).
- **Art and camera passes** (from subagent reviews of every element and of the camera): warm sage/ochre palette and golden light, small trees, mesas and wider canyons; every build at the fine F scale (`FINE2` in `builders.js`); people with eyes and variety at door scale; fine cars, bikes with riders, tram, wooden sky-ferry (`life.js`); otters, frogs, hedgehogs, sheep and owls spawned from the simulation; new interiors with a "truth window". Camera (`rig.js`): pan, zoom to cursor, rotate buttons and gestures, `inset` free-area framing set by `frameView` in `game.js`, `frameBox` for plans and check problems, orbit flights, fixed sky lens for framing.
- **Trailers page** (`trailers/index.html`) redesigned by a subagent in the brochure style (self-hosted fonts, strand filter, pop-up player). `shotlists.html` is generated by `games/trailers/tools/shotlists-page.py` and was left unchanged.
- **Music and sound (built):** an original 2A03-style chiptune engine in plain WebAudio, no audio files.
  - `game/js/engine/chip.js`: pulse (12.5/25/50/75 % duty), triangle and noise voices, `note()` and `run()`.
  - `game/js/engine/audio.js`: buses (music, sfx → master → limiter), unlock on first input, `setSound`/`setMusicOn`/`setSfxOn`, `duck()` (wired to Florence's voice in `ui/voice.js`), look-ahead scheduler, `setMusic(mood)` with moods day/night/lab/celebrate (old calm/busy map to day), and the `sfx.*` effects (safe to call before init). `renderSong()` is for tests.
  - `game/js/music/songs.js`: the four loops as pattern data (16 steps a bar, 4-bar sections, variants in `order`).
  - Settings: one Sound choice (on / effects only / off). Class mode starts with music off (effects only).
  - **Originality rule:** chip style is fine; never copy Nintendo (or any game's) melodies, bass lines or the coin/jump/1-up/power-up cues. If a teacher hums it and says "that's Mario", rewrite it.
  - `tests/audio.test.mjs` renders every cue and loop in headless Chromium (skips the render part without Playwright).

- **Replace, highlight, river (Nov 2026, user feedback):**
  - Free-building taps replace what's on a tile (`game/js/game/replace.js` `planPlace`, used by `placeAt(..., { replace: true })` and `tapPlan` in `game.js`). Missions and plan adoption keep the strict `sandboxReason`. Tests: `tests/replace.test.mjs`.
  - Tile highlight (`showAllowed`): see "Solid visuals" below (kerbs at ground level; it used to be drawn on top of everything). Key in the build panel (`hlKey`). The old pale-yellow dots were confused with gold town land.
  - The river no longer pours off the island: it rises at a spring pool under a mossy outcrop at the back (`SPRING`) and ends in a lagoon behind the beach (`LAGOON`), both in `terrain.js` `inRiverVoxel`. Gorge streams stop short of the edge. River tiles (`gx === 2`) and the simulation are unchanged.
  - **Bottom hotbar layout** (user asked for the UI to take fewer columns): for screens ≥ 761 × 561 the town card is a one-row top strip, `#camctl` a row under `#strip`, `#build` a bottom hotbar (grid: clock/numbers column, 3 × 2 categories, scrolling item row, highlight key), `#florence` above it on the right. All in the last blocks of `css/game.css` (later rules override the older side-panel ones). `frameView` already handles a wide bottom panel (centres the island between the top strip and the bar). Phones keep the tray. Missions use the same bottom position (`html[data-lab=on] #dock`), and `#lensbar`/`#alert` sit under the top strip. The build videos were re-filmed after the river change.

## Solid visuals, shorter interface, more feedback (Nov 2026, user feedback)
The user asked for: no see-through or blurry visuals (the tile grid was drawn over Florence and houses; it must be below everything), fewer buttons and menus, and more feedback on what to do, what things are, what they earn and the steps on the way.
- **Solid visuals:** `world.js` `setOverlay` draws everything solid and depth-tested at ground level: the build highlight is a low kerb (`ring()`: cyan = build, violet + corner blocks = replaces, red = remove) and "can't build" a solid grey tile; lens tiles are opaque painted tiles (`patternTex`, `overlayMat` with polygonOffset). No `top`/`depthTest: false` any more. Tilt-shift blur off (`stage.tilt.amount = 0`). Plan ghosts are solid pale blocks with a raised frame and hide the real build under them while shown. Water, flood, smoke, waterfall, carbon cloud, windows (on/off), Florence's glass/cheeks and beam (thin line + solid ring) are opaque. The x-ray build stage hides earlier temporary layers instead of fading them.
- **Interface:** top-right strip = 🌼 goals · 🔍 lenses (pop-over, hidden until a lens is earned) · 🧪 · ☰ (`ui.js`). One 🎥 button opens the camera row (＋ − ⟲ ⟳ ⌂ 👟 🏠; open by default on coarse pointers wider than 760 px). ☰ = Town report, Watch a whole day, intro again, then settings (Sound: on / effects only / off). The Lab board no longer has the day/report buttons. Track icons open their own mission (`ui.onTrack`). Build bar: one fixed 🧽 Remove (also right-click via `rig.onAltTap`, or `X`), keys `1`–`6` for categories, one ▶ in the info line, fold button only on phones. Florence's tip card: at most one button, tap to close.
- **Feedback:** `catalog.js` `desc {j,s}` for every item; `js/game/delta.js` (`itemChips`, `simDelta`, `chipsText`; tests `tests/delta.test.mjs`). Info line in the hotbar (`infoHtml`), hover preview of the real sim change (`rig.onHover`), floating chips after a build (`act()` → `ui.labels.float`) and petal flash (`ui.flower` `flash: [petals]`). Next step + bar in the town card (`nextStep`, `ui.setStep`), the 8 goals in the 🌼 pop-over (`renderGoals`, `ui.setGoals`), first-time goal celebrations (`milestones`, saved as `G.milestones`), well-done tips when a shown problem clears (`advisor.js` `solved`, `G.S.fixed`) and next-step ideas when nothing is wrong (`G.S.nextIdea`, each at most every 3 min). Intro has one more beat pointing at the next step, 🌼 and the info line. Strings in `content.js` `SANDBOX`.

## Live portrait, more detailed Florence, new voice lines (Nov 2026)
- **Live figure** (`game/js/ui/portrait.js`, the user asked for her full body, not a head shot): Florence's card and the mission dock show a small live full-body render of a second 3D Florence in her own scene (one canvas, moved into whichever card shows her via `ui.portrait.mount`; it renders only while visible). She talks when a line is shown (`ui.talking` → `portrait.talk`) and mirrors the island Florence's gestures (main.js wraps `bot.wave/cheer/oops/…`). Falls back to `img/florence.png` without WebGL.
- **Model detail** (`florence.js`, from the client's 2D art): wooden antenna ball on a collar, big ringed ear discs, a framed face screen with corner screws, thicker brows, a neck ring, shoulder discs, bolted elbow and knee caps, three fingers per hand, a chest dial with seams, a belt with bolts, toe caps and ankle joints. Check page: `tests/visual/florence.html?poses=talk&dist=13`.
- **Voices:** `voice/collect.mjs` also collects the feedback lines (`fixed`, `nextIdea`, `goalMet`, `introGoals`) and skips the silent floating-number log entries; packs re-recorded (cache in the session scratchpad, so only new lines were recorded).

## AI Lab classroom and lighter HUD (Nov 2026, user requests)
- **Classroom** (`game/js/world/classroom.js`, built at `CLASS_BASE` (700, −800, 0), off the island's tile grid so Florence doesn't snap to a tile above): entering the AI Lab (building or 🧪) fades into a classroom. Florence stands at the front beside a big screen; classmates sit at desks. The player asks questions (text box or suggested chips); `js/game/qa.js` answers from a fixed, kid-safe set (topics + every build by name, `tests/qa.test.mjs`) and the screen plays the matching build video (`VideoTexture`) or shows the answer as a card. "Missions" leaves to the mission board; "Back to building" returns. Game side: `enterClassroom`, `classAsk`, `leaveClassroom` in `game.js`. Answers are in the voice packs.
- **Lighter HUD** (from a subagent UI review: UI was 35 % of a 1280 × 800 screen, now about 18 %): the town card holds 🌼 goals, name, stars, a Day chip with pause (`ui.setDay`), credits (`ui.setCredits`) and the next step; the mission track is hidden and 🧪 shows how many missions are ready (`setTrack` → `data-ready`); 🎥 sits in the top row (open by default only on ≥ 1600 px touch screens); the hotbar is Remove · categories · one info line · one row of builds, with Florence docked at its right end and her tips above it; a build's sentence shows in a tip above its button (`[data-tip]`). `frameView` treats any panel whose top is below mid-screen as the bottom bar. CSS: the last blocks of `css/game.css`. Phones: one-row card, Remove as the first slot, compact tip card.

## Designer review round (Nov 2026)
A game-designer subagent played the game and found the AI lesson stayed in the optional Lab: in town Florence was never wrong and the town could be completed after 2 missions. Changes:
- **Florence suggests** (`suggestFor`, `offerSuggestion`, `checkSuggestion`, `useSuggestion` in `game.js`): every ~2.5 min, for lenses already earned, Florence proposes a plan for the player's town (pale ghost, "I'm 89% sure!"). Most are confidently wrong (flood meadow, concrete flats, solar for winter, big field, far-away school), some are fine (orchard, park). "Check it with a lens" runs the lens on the plan (`app.checkingPlan` makes the lens bar say "before building"), then Right/Wrong; a catch is counted (`G.catches`, saved) and celebrated. "Use it" unchecked builds it and, if flawed, Florence says why afterwards (`G.trusted`). Test hook: `G.suggest()`.
- **Town complete** needs the six missions too (`labsDone() >= 6`; a ninth line in the 🌼 goals; the next step points to the Lab once the eight goals are met).
- **Planner** (`sim/planner.js` land): no recognised words → "I didn't understand, so I guessed" with the "missing information" habit (it used to blame "best").
- Tips with a button stay until acted on; the speaker card text has ≥ 4.5:1 contrast; no doubled quotes; readable night (moon ×1.9, sky-light floor 0.75); the clock waits while ☰ or a card is open; the Lab board tags the mission the town needs now (`sb.needLab`); the intro target pulses orange; phones: tap once to preview and again to build (`TOUCH`, `sb.armed`), the camera starts closer, no overlaps.
- Not done yet (bigger bets from that review): town events (winter flood night, blackout), a concrete junior habit quiz quoting the player's words, slower unlock thresholds and a junior budget, collapsible mission sheet on phones.

## No-context playtests: a "child" and a scored designer (Nov 2026)
Two subagents played with no context (a 9-year-old persona, and a designer scoring 13 aspects out of 10; overall 7, phone 3). Fixes:
- **Missions/classroom:** Florence's tip card never shows there (`showTip` checks `sb.running`; CSS hides `#florence` under `html[data-lab=on]`). Missions are named by title with "n of 6 done" (numbers only in class mode); the classroom's Missions button says how many are ready. The heart mission's heading is "School planned!" (it used to say "Town complete!"). Habit answers keep a fixed order. After two checks that found nothing, a hint names what to look at. "Ask everyone else" after three residents. The town meeting shows on the result card.
- **Planner honesty:** a heart instruction without "middle" says "you didn't say where, so I guessed" (habit `missing`); a food instruction that doesn't mention hedges/bees/wildlife ploughs the hedged fields first (at least 3), so the nature lens catches it (`tests/progress.test.mjs` "lazy instruction").
- **Building:** gold kerb = already your town land (`HL.same`, key `keyHave`); chips carry words (`CHIP_WORD` in `delta.js`), the item card shows qualitative chips (exact numbers only in the preview/floats); a tap that would knock down a home asks for a second tap (`sb.confirm`); tapping off the tiles says where to tap; plainer place reasons (catalog `placeReason`).
- **Florence's suggestions:** never the same idea twice in a row, not again within 10 min, and none for 2.5 min after a mission; after the lens check the card shows the evidence in numbers (`evidence()`); lenses leave the inside/street view first. Re-opened tips recompute their numbers.
- **Town events** (`townEvent` in `game.js`): every third day a winter storm (homes on flood land flood) or a still, dark night (winter power), with an alert and a tip to the mission or lens.
- **Plan adoption:** a placement whose tile is taken goes to the nearest free tile where it is allowed; friendlier "no room" text.
- **Phone:** Skip intro is a small pill; one tap builds (the old touch preview-then-confirm made taps look dead); missions stack in one column with full-width answers; the result banner and lens key wrap; the camera button sits under the card on the left; the next step may take two lines.
- **Desktop:** Escape closes the open card (close / not now / keep), the menu, the pop-overs, then the lens. The start screen's mission order is a two-way switch, not a native dropdown. No heartbeat POST on localhost or GitHub Pages.
- **Report:** ⚠️ on limits that are exceeded, "—" for an empty instruction row, bonus star shown apart (instructions only reset once a mission really restarts). Street view (👟) stands on an open tile; arrow keys look around.
- **Intro:** five beats (the forced build video is gone; ▶ on any build shows it).
- **Classroom:** small talk gets a short in-character answer (`qa.js` topic `chat`).
- Not done: a current-mission queue (stars and the finale were done later, below).

## UI designer and 3D designer passes (Nov 2026)
- **UI** (`css/game.css` end block, `js/ui/ui.js`, presentation parts of `game.js`): top-right buttons have captions (Camera, Lenses / Lens on, AI Lab, Menu; only on screens of at least 761×561); the mission panel is only as wide as its contents (UI share at 1280×800 down from 28% to 18%); the instruction tray header and tabs share one row, with Send and Clear beside the sentence; the classroom question box is styled; `--ink2` is `#5e4936` (at least 5.5:1 on parchment); panels no longer fade (they slide in, solid); the build-bar key has its own column; a slot "stamp" after building; the report is a parchment sheet. New markup: `.cap`/`.ico`, `[data-ico]`, `.trayhead`, `.sentrow`. Clear is disabled while the sentence is empty.
- **3D** (`js/world/*`, `florence.js`, `rig.js`): Town land is a gravel plot with stakes; Keep wild is a shaggy patch; farms have raised crop rows (shown in the "Crops growing" build step); lamps, road, dock, AI Lab and old school are rebuilt; a build landing has a squash, a dust ring and a kerb ripple (off with reduce motion); lamps throw warm pools at night; Florence is 15% bigger on the island and gets a mint "…" pin when the camera is far; the classroom is furnished; phones frame the island tighter. Highlight kerbs are one instanced mesh and the unused cube effect is gone (draw calls −38% mid, −50% low). `tests/visual/world.html` takes `?place=9,6:timber;…` and `?focus=k:dist:pitch`.
- After changing a builder, re-render the build-button pictures: `node game/tools/thumbs.mjs http://localhost:8765/`.
- (Both fixed in the next round, below.)

## Walking, placement help, star shop, finale, bridge, street view (Nov 2026, user requests + second designer passes)
- **Florence's route** (`js/world/path.js`: A* over tiles with no corner cutting, then `smooth`; `walkTo`/`route` in `florence.js`; `world.walkCost(k)`: builds and fixed tiles block, river costs 6 unless bridged). Off the grid (classroom) she walks straight. Tests: `tests/path.test.mjs`.
- **Build highlight** (user: colours hard to see, unclear where you can build): can build = chunky white kerb; can't = solid dark plate over the tile (`HL.no.plate`, `PLATE` in `world.js`); swaps = orange with corner blocks; already your land = gold; Florence's good spot = gold with corners plus a ★ pin (`ui.labels.spots`). Hidden in street view (`world.hideOverlay`, `html[data-street=on]`).
- **Good spots** (user: "where would a cycle lane or park go?"): `js/game/spots.js` `goodSpots(tool, ctx)` (tests `tests/spots.test.mjs`): paths/cycle lanes/trams = a route from the homes to somewhere to go (cycle lanes prefer the bridge to the mainland, else school/market/hall/old school); parks/markets etc. = most homes within 2 tiles; school = smallest worst walk; homes = beside homes; farms = near homes, off town land; no homes yet = "build homes first". Shown on tool select (`showAllowed` → `sb.spots`), the reason as a gold pill above the build bar (`.spotwhy`), and Florence's next-step ideas have **Show me where** (`showWhere`, `IDEA_TOOL`), which selects the build, frames the spots and has Florence point. Strings `spotWhy`, `spotTo`, `showWhere`, `keySpot` in `content.js`.
- **Bridge to a village island** (user: "what would you cycle to?"): `js/world/bridge.js`, a rope-and-plank suspension bridge from tile `13,5` (`world.bridgeTile`, `world.bridgeLanding`) to a floating village with houses, a market stall and a bus/bike station; riders cross by day. Scenery only (no tiles or sim change).
- **Street view** (user: too low, hard to walk): `rig.js` street mode rewritten (eye 3.4 up, FOV 60, WASD/arrows walk, Q/E or ←/→ turn, drag to look, tap the ground to walk there, slides along walls, never inside a build, Home/Esc leaves); `js/camera/streetpad.js` adds on-screen arrows, a hint and "Back to the island". `toStreet` keeps its signature for `checks.js`.
- **Phones:** upright phones use a `PORTRAIT` pose (island's long axis up the screen): buildable tiles fill 44% of the height (was 23%).
- **Star shop and finale** (UI designer): `js/game/shop.js` (rules, tests `tests/shop.test.mjs`), `js/ui/rewards.js` (cards), `js/world/cosmetics.js` (hats, flag, fountain, bee statue, fireworks; never on a buildable tile, not in the sim). The ★ chip opens the shop (also ☰ → Star shop); catching a flawed suggestion in town gives ★1. `js/game/finale.js` summarises the town for the finale sheet (town complete now also needs all six missions); ☰ → Celebrate again. Saved as `G.shop`.
- Build videos re-filmed after the art passes.
- Still open: the classroom camera crops Florence at the knees behind the dock; the camera flies through Florence when a mission starts; at 1024 px the town name is hidden on the card.

## Quality review fixes (9 Nov 2026, expert review document from the user)
The user shared a scored review (Ages 8–12: 93/100, Ages 13–17: 95/100, expert heuristic) with four open issues and an edge-case list. Fixes:
- **A-01 charter vs walking result:** the charter was checked on the player's own town while the mission's result was on Florence's practice island. `charterAct(planSim)` now shows each promise with numbers for both ("Florence's plan: longest walk 15 min ✓ · Your town: …"), says why a promise isn't kept yet, and "within 15 min" needs homes and counts exactly 15 as kept.
- **A-02 numbers in a brief:** `js/ai/targets.js` (`readTargets`, `checkTargets`, `targetLine`; tests `tests/targets.test.mjs`) reads food units, winter power units, households and a carbon cap. `plotter.read` puts them in `numbers` (a food number means "enough to N", not "as much as possible"); the planner plans for them (food `need = max(need, asked)`, power adds turbines toward the target and says if there's no room); `ask()` returns `plan.targets`, shown in Florence's card and said back; the power/carbon lenses add "your brief: ≥ N ✓/✗" (`briefNote` in `checks.js`, `app.briefTargets`). The walk lens marks the town rule and the typed minutes with ✓/✗.
- **A-03 Skip:** `film.js` races every wait and camera move against Skip; Skip stops the voice, finishes the builds and cuts to the overview. Films are shorter (`short`) for replays and after the first two missions.
- **A-04 final reflection:** after the sixth mission `reflectAct()` asks "Before I trust an AI plan, I…" (idea chips from the six habits plus own words), reads the rule back, saves it (`G.reflection`, `G.reflectDone`, diary; it prints in the report), then gives one next action: the finale if the town is complete, otherwise "Back to building" with the next step.
- **Edge cases** (`tests/review.test.mjs`): "cars only" is read as cars, not "no cars" (`plotter.read` override; planner `carsOnly`, habit `literal`), and the street view catches the crossings; the beach brief's diagnosis names the beach; 40 families is a hard target; a 10-minute brief shows both numbers.
- **No WebGL:** `main.js` used to show a plain "needs 3D graphics" message when a start-up check could not create a WebGL context. Removed (10 Nov) at the user's request: the check stopped the game on a device where the game itself had been loading fine. Do not add a start-up WebGL check back without asking.
- **Camera:** `rig.cut(pose)` is a hard cut that ends a running flight (used for the classroom and inside views), so a late flight can't pull the camera back to the island.
- Not done: child-player sessions (the review's Section 9) and a keyboard/screen-reader pass beyond `a11y.mjs`.

## Third no-context playtest (Nov 2026)
A no-context subagent played both bands on a laptop, a phone and keyboard only (overall 7/10, phone 5). Fixes:
- **Scoring can't be gamed:** `js/ai/brief.js` `briefQuality(text)` (tests `tests/brief.test.mjs`) flags briefs of repeats, emoji or one or two words. A plan that passes from such a brief, or only because Florence refused part of it (`plan.wont`), gets no "Well specified / Clear first time" star; Florence says why (`G.C.ui.lucky`, tag LUCKY / UNDERSPECIFIED) and the outcome line repeats it.
- **Florence follows the brief, the lenses expose it** (`plotter.read` overrides, `planner.js`): "cars" without "no/ban/edge…" never switches on `no_cars` ("fastest route for cars" → car roads → street view); "bring our food in by lorry" (`IMPORTED`) grows nothing (habit literal, the plan misses the food); an explicit "keep the wood / hedges / wildlife" is never dropped (`KEEP`); `avoidsIn()` reads "not concrete" (timber instead); "where most families can reach it" minimises the average walk and says so; homes top up to the 40-family target with bigger homes of the same kind; the assumption line quotes only the words used ("Cheap matters most").
- **Failed fixes say what to add:** `retry` names the failing check with its number, how Florence read the brief, and one thing to add (`FIX_HINT` per lens, both bands).
- **Adopted plans vs the town:** after "Use/Adopt the plan", `leaveLab(real, placements, id)` checks the mission's needs on the player's town and says what still differs (`G.S.townDiffers`). The diary line describes the player's town (or says the town was kept), not the practice island.
- **Town meetings change numbers:** `DILEMMAS` effects now include `winter`, `health`, `community`, `nature`, `credits`; `sim()` passes `addWinter/addHealth/addCommunity/addNature`; `meetingEffect()` words them. The senior bias step waits for Next before a meeting can appear (the "learned from 9 examples" heading was stale).
- **Class mode:** finished missions stay replayable (`labReady`). The 🧪 badge refreshes on leaving the Lab; no "Next: Next:" in the reflection card.
- **Classroom questions** (`qa.js`): keys match at word starts ("alive" ≠ "live", "nuclear" ≠ "clear"); new topics `feelings` (honest: not alive) and `otherpower` (nuclear, gas…); the fallback says what Florence can answer.
- **Building and intro:** the intro's gold targets are only tiles a tap really builds on, and every other tile keeps its usual mark (`allowedSpec`); the intro card hides as soon as Next is pressed (it used to stay, without a button, while she walked); "Homes open at 6 tiles of town land: mark 3 more" (no counter that looks reset). The town-name field selects the suggestion (typing replaces it) and tags are dropped as words.
- **Keyboard:** with the island focused, arrow keys move a blue tile cursor (screen directions), Enter/Space builds (`tapKey`, `hoverKey`, `rig.tileKeys`); after a tray changes, keyboard focus moves to its first control (`ui.tray`, keyboard users only). 🔊 buttons show `.speaking` while reading aloud. Pop-overs close when the Lab or classroom opens. 13–17 mission text says households/units.
- Tests: `tests/tester3.test.mjs`, `tests/brief.test.mjs`.

## Fourth no-context playtest (Nov 2026)
A no-context subagent played four sessions (laptop 8–12, phone 13–17 through all six missions, keyboard-only 13–17, phone 8–12; overall 7/10). Fixes to the teaching logic:
- **Silly briefs:** `brief.js` `sillyIn()` finds things a town can't build ("pizza trees", "candy", "unicorns") and joke words ("lol"). `briefQuality` flags them (`silly`), so no first-try star; Florence's reading starts "A town can't build “pizza trees”, so I left that out" (`ask()` sets `plan.silly`).
- **Unwise briefs are never quietly swapped for a good plan:** concrete named in a homes brief is built in concrete (habit `literal`, the carbon lens catches it); pesticide, clearing the wood for farms and diesel/gas/coal generators are refused out loud (`WONT.food`, `WONT.power`, so `plan.wont` withholds the star); a negated ask ("no diesel", "don't clear the wetland") is not a request (`negated()`).
- **Biased school brief** ("next to the biggest houses where the richest families live"): the planner follows it (habit `literal`, `plan.unfair`); the game never passes it, neither on Accept (outcome "missed", tag NOT FAIR / BIASED BRIEF, `G.C.ui.unfair`) nor on a retry with the same words.
- **Town meetings:** after a choice, the mission's needs are re-checked; a limit the choice breaks (the concrete floor: embodied carbon over 70 t, via `addHomesCarbon` in `sim.js`) gets a warning card and a line in the outcome (`G.S.meetingBroke`).
- **Goals agree with the charter:** the nature goal needs the bees and the deer as well as the petal, and the town is never titled "Wild Garden" without them (`townTitle(p, species)`).
- **Counters:** the intro's "Town land n / 3" counts the town's real tiles; "Well done … mark N more" uses the real number (`wellDone1/2/Open`); after adopting the land plan, extra town land isn't reported as "24 of 18".
- **Diagnosis:** "fastest roads for cars" accepts "Read the words too exactly" as well as "one word" (`plan.habitAlt`); the junior question is "Why did this plan go wrong?". The walk tip says "a second school" when one exists (`nextIdea.walk2`).
- **Classroom** (`qa.js` `hasKey`): keys match whole words with common endings ("home" ≠ "homework", "car" = "cars"); new topic `homework` (a polite no); "are you always right?" answers the mistakes topic.
- Tests: `tests/tester4.test.mjs`.
- **Interface** (a helper agent; `game.js`, `intro.js`, `checks.js`, `ui.js`, `main.js`, the "playtest 4" block at the end of `css/game.css`):
  - Keyboard building works during the intro too (`kbOn` no longer waits for it; the intro draws the cursor into its own glow); Tab onto the island shows the cursor at once; focus stays on the build button after Enter; Tab wraps and stays inside open cards and the Menu; 🧽 and ▶ have labels, emoji are hidden from screen readers.
  - The intro ends cleanly whenever building stops (Lab, classroom, day, report), so Skip intro no longer lingers; Skip is hidden under cards, menus, pop-overs, films and the Lab. Phone film captions wrap full width; caption backgrounds are solid.
  - Walking into the Lab is a short wide shot by the door (no long close-up). The mission reward card sits to the right with the island framed on the left (`rewardView()`; phones: island strip above). Cards open at their top.
  - Flood lens: flooded town tiles are lifted above the water, red with a cross-hatch. Notes under lens results are cream on the dark dock.
  - Phones: Florence stands beside the intro's target tiles; a tap on a ★ pin builds on its tile; a "More ▾" tab shows when the dock's buttons run past its edge.
  - Instruction panel: Type it instead keeps the box focused; the sentence keeps room for two rows (the bank no longer jumps); word tiles stay in tapped order; Large text enlarges the dock, Florence's card, the town card and the Menu; Text size is two buttons (Normal / Large) instead of a dropdown.
  - Small fixes: confidence bar pinned on phones; card headings clear the 🔊; A/B/C letters a fixed width; the goals button has a 🌼 badge; used word tiles are solid grey (no opacity).
  - Still open: on phones the reward card is taller than the screen (it scrolls) and the island strip above it is small.

## Fifth playtest: designer play-through (Nov 2026)
The user asked for a full no-context play-through by an educational game designer, with every improvement made directly. The lead session played Ages 8–12 on a laptop; two no-context subagents played Ages 13–17 on a laptop and Ages 8–12 on a phone and tablet. Changes:
- **Building:**
  - "Can't build" is a small dark ✕ on the tile (`CROSS` in `world.js` `ringBoxes`; key swatch `.hk.no`). The dark plate over the whole tile blacked out four fifths of the island whenever a homes tool was picked.
  - A home or town building tapped on open, unmarked land marks the tile as town land and builds in one tap (`replace.js` `planPlace` returns `marked`; `tapPlan` applies the town-land cap). "Build this on town land" used to be most players' first dead tap. Missions and plan adoption keep the strict rule.
  - Good spots (`spots.js`): builds that need town land prefer the player's marked land, then dry ground (never the flood meadow); Town land, Keep wild and wind/battery/rain garden/reed bed have their own reasons (`spotWhy.nearTown`, `wild`, `service`).
  - No next-step idea mentions "the homes" before any exist (`advise`).
  - While Florence offers a plan for the town, the build kerbs and the good-spot line are hidden, so her pale plan is the only mark (`offerSuggestion`, `clearOverlay`).
- **Camera:** `rig.overview(dur, home)`: `home = true` also turns the island back to its starting direction (`HOME_YAW`). Used after a mission, after "Watch a whole day" and by ⌂ / Home (the reward card's turntable used to leave the island turned away). The default frame is a little closer (`frameDist` span 102, was 112). Lenses reframe for the current panels first (`app.frameView` from `checks.js`): the island stayed a third of the screen after the tall instruction tray.
- **Start screen:** with a saved town the first screen has "▶ Carry on building <town>" (`[data-carry]` in `main.js`), which skips the age, the name and the old "Welcome back" card. Picking an age still starts the normal flow.
- **Missions:** the start card leads with the mission's name and job, then a "New lens in this mission" box (`.mtitle`, `.newtool`; it used to lead with "New lens unlocked" and the lens name). The current mission's dot is gold. Mission 6 is titled "A school for everyone" ("Complete the town" read as the end of the game). Build films show one row of step dots with only the current step named (`#filmsteps em`).
- **Classroom** (`qa.js`): new topics `bias`, `stars`, `next`, `where`; "where should…" no longer means flooding; a build named in a "how many / how much" question gets its own answer.
- **Whole day:** `diaryLines('day', …)` describes the player's real town (no market day without a market).
- **Small things:** the count on the next-step bar reads on both the fill and the track; goal lines start with a capital; the inside view uses the home's real winter temperature, shows a caption and closes with Esc/Home; street view hides the build bar; the intro's highlights are cleared when its fourth beat ends (the call sat inside a comment); plainer wording for the adopted-plan note and the Menu's privacy line.
- Tests: `tests/replace.test.mjs` (one-tap homes), `tests/playwright/a11y.mjs` (Carry on button).
- **From the two helper playtests** (Ages 13–17 laptop; Ages 8–12 phone, landscape phone and keyboard tablet):
  - A rewrite that negates its own key word ("do NOT make it safe", "I hate walking") never passes: `brief.js` `contraIn`, `plan.contra` in `plotter.js`, blocked in the retry loop (`G.C.ui.contra`), flagged by `briefQuality` (`contra`). Florence says she may have missed the "not".
  - "Why 92%?" lists reading, plan fit and experience as "based on … scaled to 48–92%" (it showed them joined by × though they don't multiply to the total).
  - The food planner checks its plan on the real simulation and adds fields until "enough" (or the typed target) is met.
  - The town clock carries on after a mission and after the whole-day film (`sb.hourWas`); adopting a plan never moves a unique build the player already has (the school); the walk tip no longer says "a second school" (a town has one; rebuilding moves it).
  - Florence's tip card has a ✕ (`.tipx`); build tips without a Lab or lens button get "Show me where" (`RULE_IDEA`); "Check it with a lens" shows "Checking…" with no buttons, and Right/Wrong waits and is styled equally; a passed check says "one check only tests one thing" (it used to hint that a problem existed).
  - The free inside view has `html[data-inside="on"]` and a `#insideback` button (not in the classroom).
- **Island geometry pass** (3D designer subagent; `terrain.js`, the terrain block of `world.js`, `extras.js`, the sky shader in `stage.js`; the tile grid is byte-identical, checked): one 16-band sandstone sequence shared by mesas, gorges and the keel (`BEDS`); flat-topped stepped buttes with a tarn feeding the waterfall (`BUTTES`, `mesaAt`, `TARN`) instead of the dome; outline lobes (`LOBES`); terraced green rim hills; a benched keel (`keel()`, and gorge floors no longer cut through it); zone colours that blend over a voxel or two, shallows and a deeper channel, lily pads, wet sand, a rowing boat; a block-cloud layer in one instanced mesh (`cloudSea`), five rock groups; a graded sky with tone mapping (the low tier used to show a darker sky than mid/high). Scenery triangles roughly halved (ground mesh 248k → 83k).
  - **Not done:** reeds and stumps for the wetland and wood would need `decorate` in `builders.js`.
- **Interface pass 6** (UI designer subagent; one block at the end of `css/game.css` from "ui pass 6 … START OF BLOCK", plus the camera-row markup in `ui.js`): `--p6-*` tokens (light oak panel, cream card, one outline, one lip; terracotta, sage, ochre), the legacy tokens re-pointed so old rules re-skin; a type scale (`--t12…--t28` × `--ts`) and spacing scale; the next step is a cream block first in the top card; Florence's tip is a speech bubble above her docked figure; one drawn SVG icon set as `--i-*` variables (the emoji stay in the DOM as text); a captioned camera row; Large text is +20%; a real phone-landscape layout (thin top bar, side tray, right-hand mission dock; the start card scrolls); phone portrait: small tip strip, pinned sentence box and Send in the word-tile tray, two-line build names with a "›" tab, the tile key shown; street and inside views hide the panels. Measured UI area: 1280×800 18.7 %, phone 50 % (was 53 %), landscape phone 31 % (was about 70 %); lowest contrast 4.71:1.
  - **Still open:** emoji written by game code (ribbons, tray tabs, lens names) are not yet the drawn set; `frameView` does not know the landscape phone's right-hand dock; the tile key is swatches only on touch tablets when a category has six or more builds; the 13–17 screens, finale sheet and town meetings were not re-checked under the new kit.
- **Decided by the user after the round ("yes to all"):**
  - **Quiz:** a defensible answer is never marked wrong. `HABIT_NEAR` in `game.js` (one word ↔ read too exactly, one word ↔ missing information) plus `plan.habitAlt`; Florence adds "the closest name is …" (`G.C.ui.alsoFits`). Each answer button carries a one-line meaning (`habits[k].hint`, `.choice .hl small`).
  - **Stars:** the third star on the fix path needs a fix within two rewrites (`run.tries`, `G.C.ui.manyTries`); retries stay free and unlimited. This replaces the old rule that retries never cost stars.
  - **Adoption:** "Use Florence's plan" lays the groundwork (land marks, paths and other routes, hedges) and builds the first four buildings (`ADOPT_CAP`); the rest is the player's (`G.planLeft`, `G.S.planLeft`). `tests/playwright/run.mjs` builds the remainder itself.
  - Build videos re-filmed on the new island. The classroom site (the Cloudflare Worker) was redeployed from `main` at merge 365c64b after the user allowed the deploy command (the permission checker blocks it by default); post-deploy checks passed (`/` 200 passcode page, `/assets/x.js` 403, `/admin` 302 to Cloudflare Access).
- Voices re-recorded (the Kokoro model and clip cache were still in the earlier session's scratchpad; `collect.mjs` overwrites the lines files, so the old lines were merged back by key before `render.py`).

## Beta revision (Nov 2026)
All 49 notes in the beta tester's file were addressed; see README "How the game plays" and the commit history. Key decisions the user made:
- **Helper name:** **Florence** (she). Code file names stay `plotter.*`.
- **Clean first try:** a "spot the hidden guess" step earns the 3rd star.
- **Town name:** chosen by the player on the start screen.
- **Read aloud:** 🔊 buttons, plus recorded voices.

**Rules and numbers:**
- **Walking:** 15 minutes everywhere (`TARGETS.walkMinutes`).
- **Carbon:** the town limit is 160 t; level 3's 70 t limit covers the homes' building materials only.
- **Wetland:** protected for every item except path, green bridge, reed bed and keep-wild.

**Voices:**
- Kokoro-82M: narrator `bf_isabella`, Florence `af_bella`.
- One pack per age band in `game/voice/`.
- On the Worker, the packs live in Workers KV namespace `ecotown-voice` (id `3a1af6ebd5b444858c57df7c5a889038`, binding `VOICE`) and are served only with a passcode session.
- To re-record, see `voice/README.md`.
- Kokoro runs fine in a cloud session; it downloads from Hugging Face.

**Play-through test:**
- Run: `FAST=1 node game/tests/playwright/run.mjs <url> <junior|senior> <out> <w> <h> <cards|text> <flawed|clean|mixed>`.
- Under software 3D a full run takes about 30 minutes; without `FAST` it takes much longer.

## Deploying from a cloud session
- **API token:** if no Cloudflare token is configured, call `request_credential` for host `api.cloudflare.com`. The proxy then injects it, so curl can send any dummy `Authorization: Bearer x`.
- **Deploy command:**
  ```bash
  cd games/ecotown && node build.mjs && NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt CF_ACCOUNT_ID=9c5ee116be85caa02b46ec934ed28bbf node worker/deploy.mjs
  ```
- **Proxy:** Node's fetch skips the proxy without `NODE_USE_ENV_PROXY=1`.
- **Wrangler** Pages uploads fail behind the proxy, which is why we deploy as a Worker with one API call.
- **Migrations:** `deploy.mjs` retries without the Durable Object migration once it already exists, and keeps secret bindings.
- **KV uploads** (voice packs) use curl inside `deploy.mjs`; Node fetch failed for them behind the proxy.
- **Check after a deploy:**
  - `/` returns 200 with the passcode page;
  - `/assets/x.js` returns 403;
  - `/admin` redirects (302) to `…cloudflareaccess.com`.

## Tests
From `games/ecotown/game` (184 tests, all passing at handoff; run them all with `node --test tests/*.test.mjs`):

```bash
node --test tests/sim.test.mjs tests/model.test.mjs tests/teach.test.mjs tests/syntax.test.mjs tests/codes.test.mjs tests/playtest.test.mjs tests/progress.test.mjs tests/audio.test.mjs tests/replace.test.mjs tests/delta.test.mjs tests/qa.test.mjs
```

There's also a Playwright play-through: `tests/playwright/run.mjs`. See the README.

## Open items
1. **Live end-to-end passcode test** (login, second device replaces the first, switch-off) has not been run against the real site.
   - The plan was a temporary `ADMIN_TEST_KEY` Worker secret, which `worker.js` accepts in the `X-Admin-Test-Key` header, but writing that secret was blocked by the safety checker.
   - Instead, ask the user to create a test batch at `/admin` and share one code, or to approve the secret.
2. **GitHub Pages:** done. Source is set to GitHub Actions and the site is live.
3. **Leftover project:** optionally delete the empty `ecotown.pages.dev` Pages project. Ask first.
4. **Custom domain:** optional, e.g. `play.deltaopslearning.com`. School filters may block `workers.dev`.
5. **Stripe paywall:** future work. Start from `docs/FUTURE-PAYWALL.md` and its open decisions.

## Gotchas
- **Blocked actions:** the safety checker blocked writing Worker secrets and deleting or re-creating the account workers.dev subdomain. Explain to the user and let them do it in the dashboard; don't work around it.
- **Renaming the subdomain:** use the dashboard (Workers & Pages → Your subdomain → Change). The API can't rename it in place.
- **After a rename:**
  - update the Access app domain;
  - check the Worker's workers.dev route is still enabled;
  - expect the user's device to cache "can't find server" for a while.
- **Outdated README section:** the README section "Put it on a secure website (Cloudflare Pages + login)" describes the older Pages approach and is historical now.
