# Trailers: notes for the next session

**Task:** re-render the six first-concept trailers and iterate each until an independent reviewer scores it **at least 8/10 on game quality and at least 8/10 on visual match**. Then put them on the two web pages.

The first concepts are `robotaxi`, `pitcrew`, `blocks`, `tycoon`, `quiz` and `signal`.

## Where things stand (6 November 2026)

- **Already at the bar:** 23 lab trailers have been independently scored at 8/8 or better.
  - Client requests: ecotown, tycoon2, mcquiz, dash, bloxel, city, kart.
  - Career skills: colony, rocket, robot, drone.
  - Future Skills: all eight `fs-*`.
  - Brochure: eco, mission, museum, mars.
- **Don't regress these.** Their history is in git: `git log --oneline -- games/trailers/<id>`.
- **The six first concepts have never been scored.**
  - Five of their videos (pitcrew, blocks, tycoon, quiz, signal) were rendered on 4 November, before later changes to the shared engine (glow, blur and new sky in `engine/stage.js` and `engine/extras.js`).
  - So a fresh render will look somewhat different. Re-render all five first and look at them before changing anything.
  - `robotaxi` was re-rendered on 5 November and is up to date.
- Each first concept overlaps a client-request lab that already passes. Treat that lab as the closest quality reference:

| First concept | Lab | Overlaps (passing) | Style |
| --- | --- | --- | --- |
| robotaxi | Robo-Taxi Island | city (Autopilot City) | shared brochure voxel style |
| pitcrew | Pit Crew | kart (Pit Crew GP) | shared brochure voxel style |
| blocks | Block Builders | bloxel (Block Quest) | shared brochure voxel style |
| tycoon | Island Park Tycoon (voxel) | tycoon2 (pixel) | shared brochure voxel style |
| quiz | Sure or Not Sure? | mcquiz (Block Quiz) | shared brochure voxel style |
| signal | Clear Signal | dash (Beat Block) | shared brochure voxel style |

- **Visual reference for all six:** the DeltaOps brochure voxel floating-island diorama. See `deltaopslearning-brochure/img/island-*.png` and `reviews/brochure-refs.jpg`, plus the passing trailers `ecotown`, `eco`, `mars` and `city`.

## Known problems to fix

Each shot list's "Reviewer notes" (`shotlists/<id>.md`) has the full detail.

- **robotaxi:** two mistakes, but the scarecrow false alarm (0:19–0:23) is never fixed on screen. Stage numbers jump from 1 to 4. Cards are tapped by a white ring instead of the brochure hand. The farm shot holds too long. "Bin? 31%" for a child may read oddly.
- **pitcrew:** two mistakes; the meadow shortcut is never fixed on its own. Stage numbers jump from 2 to 4. "REINFORCEMENT LEARNING" jargon. Upbeat music plays over the mistake. "Team Otters" is also used in Mission AI.
- **blocks:**
  - No instruction card at the start, so the AI's mistake isn't framed.
  - Wind turbines stop at night, which is a science error.
  - The sunset is barely visible.
  - "Habitat Blueprint" is an odd name for a town plan.
  - Few people move about.
  - The lab title "Block Builders" clashes with a real company; it is a decision for the user.
- **tycoon:**
  - Same name as tycoon2 ("Island Park Tycoon").
  - Numbers don't match: the caption says 80, the meter reads 82, and the tally doesn't match the bubbles.
  - Two mistakes fixed by a card about a third problem.
  - Stage numbers jump from 2 to 5.
  - Kiosks vanish without comment.
- **quiz:**
  - It has no clearer instruction and no fixed result, so it breaks the story pattern.
  - "Bread is bad for ducks" needs a source; check it against the RSPB or Canal & River Trust.
  - The Sure-o-meter round reads weakest, because the children are small.
  - Team names are reused from Mission AI.
  - Confetti celebrates the catch, which sets the wrong mood.
- **signal:**
  - The winning attempt starts halfway, so the "Duck!" fix ("Slide under the branch") is never shown.
  - The montage never shows which cards were played.
  - Pacing is the weakest point.
  - "Courier bot" is never introduced.
  - The duck pun may confuse younger or EAL viewers.

## The story every trailer must tell without sound

Children give an instruction → the AI makes a confident wrong guess with "% sure" → the consequence is shown → the children give a clearer instruction → the fix is **shown working**.

What reviewers penalised in earlier rounds:
- **Two loops at most.** Three or more loops scored low. rocket went from 54 s with three loops to 32 s with one loop and got 8/8. Aim for 30–40 s.
- **Confidence goes up after the fix,** for example mars 72%→91% and rocket 89%→94%. A lower number after the fix read as the AI getting less sure.
- **Reward success only.** Stars and XP go up when a fix works, never at the moment of failure.
- **Clean screen.**
  - Panels from the previous beat must be fully gone before the next beat starts: no ghost crossfades, no half-faded title cards over the action.
  - Nothing covers the key action. Captions sit on backing panels.
  - Cards sit at least 40 px above the bottom edge, with text on 2 lines or fewer, and the cursor lands on the card's corner.
- **Pacing and text.**
  - No static hold longer than about 2 s.
  - The trailer ends on the title card with the careers line, with no blank or dark frames.
  - Secondary text is at least 18 px at 1080p.
- **The island is the hero.** Keep the diorama visible and give the HUD at most about 45% of the frame. Bright daylight or a clean starfield, never murky dusk.

## Workflow that worked

1. **Render.** From `games/trailers`, run `python3 audio.py <id> && node render.mjs <id>`, then the ffmpeg combine from the README.
   - One render at a time: each Chromium needs 1–3 GB, and a 3D trailer takes 20–50 min.
   - To queue several, use `tools/iterate/rqd.sh`. Start it with `QDIR=<dir> nohup sh tools/iterate/rqd.sh &`, then append names to `<dir>/rq.txt`. It logs "rq <id>" or "rqfail <id>" to `/tmp/master.log`. To re-render a name, delete it from `<dir>/rq.done`.
2. **Look.**
   - `sh vsheet.sh <id> 1.5 5` writes a 1.5 s contact sheet to `frames/<id>-video.jpg`. Copy it to `reviews/`.
3. **Review independently.**
   - Send a fresh subagent that has not seen the fixes. It should:
     - extract frames with `ffmpeg -i out/<id>.mp4 -vf fps=1,scale=1280:-1 …`;
     - look at a calibration trailer first (for example `out/kart.mp4`, `out/mars.mp4` or `out/city.mp4`, all 8/8);
     - "judge by the same standard, not stricter, not looser";
     - return game-quality and visual-match scores (half points allowed), strengths, and numbered defects with timecodes ordered by score impact.
   - Expect about ±0.5 variance between reviewers. Calibration anchoring reduces it.
4. **Fix.**
   - Give one subagent per trailer `tools/iterate/fix-common.md` plus the reviewer's defect list, pasted verbatim.
   - Fix agents may edit only their own `<id>/` folder, `shotlists/<id>.md` and `games/labs/<id>.md`.
   - They verify with stills only (`node render.mjs <id> --stills a,b,c`, then view `frames/<id>/`), and must not do full renders or commit. They re-time `<id>/audio.json` to any timing change.
   - Then re-render (step 1) and re-review (step 3). Repeat until 8/8.
5. **Publish.** See below.
6. **Commit and push** after each step to `claude/laughing-euler-h7hvjr`, including the attribution trailer lines.
   - GitHub sometimes returns "fatal error in commit_refs"; retry with backoff.
   - The repo is about 2.8 GB because every full-quality re-render is in history. Consider Git LFS for `out/*.mp4`, but only if the user agrees.

## Web pages

Both pages are Claude artifacts, shared as "anyone with the link":

| Page | URL | Built from |
| --- | --- | --- |
| Trailer page | https://claude.ai/artifact/6pdXoP3jib9e98Ef8qLy4n | `trailers/index.html` (repo root) plus `trailers/posters/` and `trailers/videos/` |
| Shot lists | https://claude.ai/artifact/75jvyWAj7ofKaBHJS9kMSG | `trailers/shotlists.html`, rebuilt by `python3 tools/shotlists-page.py` (also rewrites `shotlists/ALL-TRAILERS.md`) |

- **The whole page is in the repo** at `trailers/` (repo root): `index.html`, `shotlists.html`, `videos/` and `posters/`. `tools/webenc.sh <id> <poster-second>` writes there directly. You can open it locally with `python3 -m http.server` from `trailers/`.
- **Publishing.** The artifact keeps files from earlier publishes, so you only need to send new or changed files. Update with the Artifact tool:
  - pass `url` set to the page above;
  - publish `index.html` as `file_path`;
  - set `root` to `trailers/`;
  - add `files` entries for each changed video and poster.
- **Limits:** keep each file under 16 MB and each publish under 64 MB.
- **Video lengths and the "Rendering now" list:** in `trailers/index.html`, `LABS` entries carry `len: '0:MM'`, and `const READY = new Set([...])` lists the trailers shown. All 29 are in it.
- `tools/iterate/done.sh <id> <poster-second>` does sheet, web encode, staging, length update, shot-list status and page rebuild in one go. It writes straight into `trailers/`.
- **Shot-list status lines:** a page entry shows "described from source" while its `shotlists/<id>.md` contains "not yet rendered", "not yet re-rendered" or "video re-rendering". When the new video is checked, change that line to say it was re-rendered and checked.

## Open decisions for the user (don't decide these yourself)

- **Names that match real organisations or people:**
  - Block Builders is a real company. The docs suggest renaming it.
  - Tallowmere Recycling, Dee Marsh, Pedal Point and Mira Kell need checking.
  - Sprocket and Thunder Ridge.
- **Trademark wording:** the "MINECRAFT" headline in Block Quiz.
- **Mars vs Moon Base** for AI Inventor Lab.
- **Facts marked "(to verify)"** in `games/labs/*.md`:
  - the UK GDPR and ICO line;
  - the DofE and Apps for Good pathway details;
  - the Creative Producer rights table;
  - Eco Town's "Carbon down 70%".
