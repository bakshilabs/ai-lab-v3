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
  - in missions the `#dock` becomes the left rail (`html[data-lab=on]`);
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
  - Settings: Sound (everything), Sound effects, Music. Class mode starts with music off.
  - **Originality rule:** chip style is fine; never copy Nintendo (or any game's) melodies, bass lines or the coin/jump/1-up/power-up cues. If a teacher hums it and says "that's Mario", rewrite it.
  - `tests/audio.test.mjs` renders every cue and loop in headless Chromium (skips the render part without Playwright).

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
From `games/ecotown/game` (97 tests, all passing at handoff):

```bash
node --test tests/sim.test.mjs tests/model.test.mjs tests/teach.test.mjs tests/syntax.test.mjs tests/codes.test.mjs tests/playtest.test.mjs tests/progress.test.mjs tests/audio.test.mjs
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
