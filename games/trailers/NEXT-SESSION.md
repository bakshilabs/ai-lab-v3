# Trailers: notes for the next session

**Task:** re-render the six first-concept trailers and iterate each until an independent reviewer scores it **at least 8/10 on game quality and at least 8/10 on visual match**. Then put them on the two web pages.

The first concepts are `robotaxi`, `pitcrew`, `blocks`, `tycoon`, `quiz` and `signal`.

## Where things stand (9 November 2026)

- **Already at the bar:** 23 lab trailers have been independently scored at 8/8 or better.
  - Client requests: ecotown, tycoon2, mcquiz, dash, bloxel, city, kart.
  - Career skills: colony, rocket, robot, drone.
  - Future Skills: all eight `fs-*`.
  - Brochure: eco, mission, museum, mars.
- **Don't regress these.** Their history is in git: `git log --oneline -- games/trailers/<id>`.
- **Done this session (6–9 November):**
  - Re-rendered pitcrew, blocks, tycoon, quiz and signal with the current engine. The new `out/<id>.mp4` and `reviews/<id>-video.jpg` contact sheets are committed.
  - Ran round 1 of independent reviews on those five. The full reviews are in `reviews/<id>-review-r1.md`. Each has numbered defects with timecodes and fix suggestions, ordered by score impact. Paste them verbatim into the fix agents.
  - **No fixes have been made yet.** The web pages have not been updated.
  - `robotaxi` (re-rendered 5 November) has **still never been reviewed**. Review it with the same prompt (see "Review prompt" below) before or alongside the fix round.

### Round-1 scores (game quality / visual match)

| Trailer | Score | Main problems (full list in `reviews/<id>-review-r1.md`) | Size of fix |
| --- | --- | --- | --- |
| tycoon | 6 / 7 | Neither mistake is fixed on screen. Stage numbers jump from 2 to 5. Kiosks and the meadow path vanish, and Tidy jumps with no bins shown. Confidence falls after the fix (95%→88%). | Cut to one or two clean loops |
| pitcrew | 6.5 / 6.5 | Confidence falls after the fix (97%→74%). Card says 47 stars, but the counter never reaches 47. Stage numbers jump from 2 to 4. Grey fog over the card scenes. | Fairly small |
| blocks | 6.5 / 6.5 | Confidence falls after the fix (88%→76%). Wind turbines make "the sun went down" look wrong. The card says "swap 3 solar tiles" but the summary says "added 3 batteries". White fog, then a murky navy night. Too many names. No child's hand placing tiles. | Fairly small |
| signal | 5.5 / 6 | Four card prompts, and "Duck!" is never fixed. No confidence bubble after the fix. A 7 s see-through ghost montage hides the action and shows 100% on a failed run. White flashes instead of visible consequences. Pink sunset sky. | Cut to one loop |
| quiz | 5.5 / 4.5 | Three wrong answers and no fix at all. Dark purple club stage instead of a daylight island. Confetti on the failure. "Bread is bad for ducks" needs softer wording and a source (Canal & River Trust). | Close to a rebuild |

**Shared across most of the five:**
- grey or dim overlay behind the card scenes and the title card;
- the title card fades toward dark at the very end and has no careers line;
- captions with no backing panel, sometimes about 50 px from the bottom edge;
- half-faded panels from the previous beat;
- secondary text of 13–17 px;
- no hand cursor tapping the chosen card.

**Possible shared cause:** these may come from shared code in `engine/ui.js` (`fader()`, the overlay) or from each trailer's own title and choice beats. Check whether the passing trailers (`mars`, `ecotown`, `kart`) use the same calls before changing anything. The tycoon reviewer said the end fade "matches the reference trailers", so the fade itself may be acceptable and only the dim grey backdrop is the problem. **Do not edit `engine/`** unless you have re-checked stills of the 23 passing trailers. Fix inside each trailer's own folder instead.

- Each first concept overlaps a client-request lab that already passes. Treat that lab as the closest quality reference (the round-1 reviewers used it for calibration):

| First concept | Lab | Overlaps (passing) | Style |
| --- | --- | --- | --- |
| robotaxi | Robo-Taxi Island | city (Autopilot City) | shared brochure voxel style |
| pitcrew | Pit Crew | kart (Pit Crew GP) | shared brochure voxel style |
| blocks | Block Builders | bloxel (Block Quest) | shared brochure voxel style |
| tycoon | Island Park Tycoon (voxel) | tycoon2 (pixel) — reviewer calibrated on ecotown | shared brochure voxel style |
| quiz | Sure or Not Sure? | mcquiz (Block Quiz) | shared brochure voxel style |
| signal | Clear Signal | dash (Beat Block) | shared brochure voxel style |

- **Visual reference for all six:** the DeltaOps brochure voxel floating-island diorama. See `deltaopslearning-brochure/img/island-*.png` and `reviews/brochure-refs.jpg`, plus the passing trailers `ecotown`, `eco`, `mars` and `city`.

## Next steps

1. **Ask the user** about the two names before the fix agents touch titles (see "Open decisions"): Block Builders (real company) and Island Park Tycoon (same as tycoon2). The user was asked on 9 November and hasn't answered yet. If they say "later", keep the current names.
2. **Get the user's go-ahead** for five parallel fix subagents. They asked for reviews only, not fixes.
3. Fix → re-render → re-review (round 2) per the workflow below, until each trailer is 8/8. Review `robotaxi` too.
4. Publish and update shot-list status lines.

## Known problems from the older shot-list notes

These came before the round-1 reviews. The reviews above supersede them where they overlap. `shotlists/<id>.md` "Reviewer notes" has the detail.

- **robotaxi:** two mistakes, but the scarecrow false alarm (0:19–0:23) is never fixed on screen. Stage numbers jump from 1 to 4. Cards are tapped by a white ring instead of the brochure hand. The farm shot holds too long. "Bin? 31%" for a child may read oddly.
- **pitcrew:** "REINFORCEMENT LEARNING" jargon. Upbeat music plays over the mistake. "Team Otters" is also used in Mission AI.
- **blocks:** no instruction card at the start, so the AI's mistake isn't framed. "Habitat Blueprint" is an odd name for a town plan. Few people move about.
- **tycoon:** the caption says 80 but the meter reads 82, and the tally doesn't match the bubbles.
- **quiz:** the Sure-o-meter round reads weakest because the children are small. Team names are reused from Mission AI.
- **signal:** the montage never shows which cards were played. "Courier bot" is never introduced. The duck pun may confuse younger or EAL viewers.

## Review prompt (round 1, reuse it)

One `general-purpose` subagent per trailer, in the background, all in one message. Give each:
- the mp4 path and a one-line lab description;
- its own scratch folder for frames;
- a calibration step: extract frames from the closest passing lab (table above) plus `mars` and `city`, and judge "by the same standard, not stricter, not looser";
- the brochure references;
- 1 fps frame extraction, plus a higher rate where things are unclear;
- the story pattern and the penalty list from the section below.

It writes `review.md` and replies with: both scores (half points allowed), strengths, numbered defects with timecodes and fixes ordered by impact, and one line on what would lift each score to 8. Copy each `review.md` to `reviews/<id>-review-r<N>.md` and commit.

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
   - To queue several, use `tools/iterate/rqd.sh`. Start it with `QDIR=<dir> nohup sh tools/iterate/rqd.sh &`, then append names to `<dir>/rq.txt`. It logs "rq <id>" or "rqfail <id>" to `/tmp/master.log`. The daemon never exits on its own; `pkill -f tools/iterate/rqd.sh` when the queue is done. To re-render a name, delete it from `<dir>/rq.done`.
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
  - Island Park Tycoon (voxel `tycoon`) has the same name as `tycoon2`.
  - Tallowmere Recycling, Dee Marsh, Pedal Point and Mira Kell need checking.
  - Sprocket and Thunder Ridge.
- **Trademark wording:** the "MINECRAFT" headline in Block Quiz.
- **Mars vs Moon Base** for AI Inventor Lab.
- **Facts marked "(to verify)"** in `games/labs/*.md`:
  - the UK GDPR and ICO line;
  - the DofE and Apps for Good pathway details;
  - the Creative Producer rights table;
  - Eco Town's "Carbon down 70%".
