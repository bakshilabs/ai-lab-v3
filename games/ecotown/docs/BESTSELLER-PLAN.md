# Eco Town: plan to reach best-seller quality

Written 11 November 2026. This is the working plan. Each stage lists what will be built, how we will know it worked, and what only people (not a cloud session) can do.

## The target

Eco Town is sold to kids' clubs, schools and holiday camps for **a full day of play**, for ages 8–12 and 13–17. "Best-seller quality" means four things, each with a test:

| # | What it means | How we measure it |
|---|---|---|
| 1 | **Children choose to keep playing.** | In a club session, most children are still building when the time is up, and ask to carry on after a break. |
| 2 | **It fills a day without repeating itself.** | A child who plays for five hours still has a goal they have not reached. |
| 3 | **A club leader can run it with no training.** | A leader who has only read the one-page plan runs a full day with no call for help. |
| 4 | **It works on the devices clubs own.** | 30 frames a second or better on a school Chromebook, an older iPad and a mid-range Android phone. |

The lesson stays at the centre of every stage: **Florence, the AI planner, is sometimes confidently wrong, and the player catches her with evidence.** Nothing below turns the game into a spreadsheet or a quiz.

## Where the game is today

| Area | State | Gap |
|---|---|---|
| Look and character | Finished to a commercial standard | None that blocks sale |
| The idea | Distinctive and on-topic for schools | None |
| Robustness | 195 automated tests, no errors in full play-throughs, saves itself | Not yet run on real club devices |
| Amount of play | One town (about 1 hour), six missions, seven challenge towns (about 2–3 hours) | No goal that spans the whole day; one island only |
| Feel | Builds pop in, residents speak, Florence talks | Rewards are mostly text banners; the world reacts less than in the best builders |
| Phone | Playable; interface covers about a third of the screen | Still cramped next to laptop |
| Proof | Only AI "child" play-tests | No real child has played it |
| Club tools | Teacher guide, passcodes, admin console | No group view of progress; no take-home certificate |

## What the best sellers do (from `research/eco-town-market-comparables.md`)

1. The world reacts before the score does (Townscaper, Animal Crossing).
2. Residents say what they need (RollerCoaster Tycoon).
3. More than one way to win (Planet Zoo).
4. Nature coming back is the reward (Terra Nil).
5. Players show their town to others (Animal Crossing, Minecraft).
6. Short runs with clear endings, and a reason to start another (Islanders, Dorfromantik).
7. No purchases, no accounts, works offline.

Eco Town already does 2, 3 and 7. The plan below is mostly about 1, 4, 5 and 6.

## The stages

### Stage 1: a goal for the whole day (built, 11 November 2026)

**Problem:** the town, the missions and the challenges are separate. Nothing adds them up, so a child has no reason to do "one more".

| Build | Detail |
|---|---|
| **Club passport** | One page that adds up everything a player has done on the device: mission stars, the town medal, challenge medals, catches of Florence's wrong ideas. |
| **Planner ranks** | Six ranks earned from passport points, from Helper to Chief Planner. The top rank needs most challenges at silver or better, so it takes a full day. |
| **Next rank line** | The passport always says what would earn the next rank soonest. |
| **Printable certificate** | Name of the town, rank, medals and the three habits for checking an AI. No personal data; the child writes their own name on paper. |
| **Start a challenge again** | A button on the challenge board, so a pair can retry for a higher medal from a clean island. |

**Done when:** a scripted player who finishes the town and three challenges moves up at least three ranks, the certificate prints on one page, and every rank is reachable (tested).

### Stage 2: the world reacts first

**Problem:** rewards arrive as banners. In the best builders the island itself celebrates.

| Build | Detail |
|---|---|
| **Wildlife returns, visibly** | When a nature goal is met, the animals walk or fly in from the island's edge and stay. Each of the five species has an arrival moment. |
| **Residents react to the last build** | The nearest family comes out and reacts (cheer, shiver, hold nose) within two seconds of a build that changes their life. |
| **Florence has more character** | Jokes for off-topic questions, a reaction when she is caught, pride when a plan of hers passes a check. |
| **Town events with a story** | The storm night and the still night become short scenes with a before and after, not an alert. |
| **Sound** | A distinct sound for each build family; the music thickens as the town grows. |

**Done when:** a new play-tester (AI persona first, then children) describes the island's reactions unprompted, and no reward depends on reading a banner.

### Stage 3: more islands (built, 11 November 2026, except the two points marked below)

**Problem:** every town is on the same island. After three hours the layout is familiar.

| Build | Detail |
|---|---|
| **Island generator settings** ✅ | The terrain code already builds the island from numbers. Add two more layouts: a river-delta island (more flood land, less dry ground) and a hill island (little flat land, strong wind). *Built as `makeTerrain('delta' / 'hills')`. Not built: stronger wind on the hills (the simulation is the same on every island).* |
| **Island choice for challenges** ✅ | Each challenge can name its island, which doubles the challenge set without new rules. *Six new challenges: three on each new island (13 in all).* |
| **Island of the day** ✅ | A club leader can pick the island for the day's free-building town. *`?island=delta` or `?island=hills` in the address, or the challenge board. The six missions stay on the home island.* |

**Done when:** all goals and all challenges are shown passable on each island by the automated tests, and the frame rate is no worse than on the first island.

**State:** the eight town goals and every challenge are proven passable on the island they are played on (`tests/challenges.test.mjs`, `tests/islands.test.mjs`); the seven home-island challenges were not moved to the other islands. Draw calls and triangles are within 3 % of the home island in software 3D (`tests/playwright/islands.mjs`); frame rate on real devices is still to be measured (stage 5).

### Stage 4: showing towns to each other (built, 11 November 2026; not yet tried between two real devices)

**Problem:** the strongest driver of spread in builder games is showing your world. Eco Town has a printed report only.

| Build | Detail |
|---|---|
| **Town postcard** | A picture of the town with its name, score and medal, saved as an image on the device. |
| **Club wall** | On the leader's device, a wall of the group's towns for the end-of-day discussion. Towns move by a short code typed in, with no accounts and no personal data. |
| **Visit a town** | Open a friend's town from its code, look around and run the lenses on it. Read-only. |

**Done when:** two devices exchange a town by code with no network account, and the safeguarding rules in the teacher guide still hold (no chat, no names, no online gallery).

**State (11 November 2026):**
- [x] **Town postcard**: picture, badge, score, medal, the town code in fours and a QR square, saved as a PNG (☰ and the town report).
- [x] **Town code**: versioned and checked; a first town is about 64 characters, a large one 100 to 125. Not "short": typing one takes a minute or two, which is why the postcard also carries a QR square.
- [x] **Visit a town**: read-only, with all six lenses, street view, score, goals and medal; the visitor's own save is untouched (automated check with three separate browser profiles).
- [x] **Club wall**: on one device, with maps drawn from the codes, strongest and weakest parts, three discussion questions, Remove and Clear.
- [x] Safeguarding: no accounts, no chat, no typed text or name in a code, no network request (automated checks).
- [ ] **Two real devices in one room** (the "done when"): only simulated so far. Needs people: read a code aloud and type it; scan a postcard with a tablet camera.
- [ ] **Camera scanning** has not been run on a real camera (the test browser has no QR reader). It is optional and fails quietly.
- [ ] Voices for the new lines (Florence's lens lines in a visit) are read by the device voice.
- [ ] Other islands (stage 3): the code has a field for the island; a visit to a town from an island this device does not have shows the buildings on this island with the score its own device worked out.

### Stage 5: phone and performance

| Build | Detail |
|---|---|
| **Phone build tray** | Fold the two information lines into one; categories as a single scrolling row. Target: interface at most a quarter of the screen. |
| **Performance budget** | A fixed budget per graphics level, checked by a script on every change. |
| **Real-device runs** | The frame-rate readout (`?fps=1`) on the three target devices. Needs a person with the devices. |

**Done when:** the phone play-test scores 8 out of 10 or more, and criterion 4 above is met on real devices.

**State (11 November 2026):** the phone build tray is three slim rows; the interface covers 27 % of an upright phone at rest (33 % before; measured by `tests/playwright/phonearea.mjs`). The quarter is not yet reached. No performance budget script and no real-device runs yet.

### Stage 6: proof with children (needs people)

This cannot be done from a cloud session, and it is the stage that decides whether the game is a best seller.

1. Five to ten children, in two sessions, using `docs/DEVICE-AND-CHILD-TESTS.md`.
2. One full club day with a leader who has not seen the game.
3. Fix what they find; repeat once.

**Done when:** criteria 1, 2 and 3 above are met in a real session.

### Stage 7: ready to sell

| Build | Detail |
|---|---|
| **Voices** | Record every new line (challenges, passport, events). |
| **Leader's one-page plan** | Printed, with the day's timetable and the five questions to ask. |
| **Languages** | The text is already in one file per age band; add a second language as a test of the pipeline. |
| **Trailer and store page** | A 60-second trailer from the build films, and a page a club leader can buy from. *Trailer built (`game/trailer.html`, 59 s, cut from the episodes); the page to buy from waits for the paywall.* |
| **Paywall** | As planned in `docs/FUTURE-PAYWALL.md`. |

## Order and reasons

1. **Stage 1 first** because it is small and it turns the existing content into a day.
2. **Stage 2 next** because feel is what children notice in the first five minutes.
3. **Stage 6 as soon as a club can be found**, in parallel with everything else. Stages 3 to 5 should be re-ordered by what the children show.
4. **Stage 3 and 4** are the largest pieces of work and add the most play time.
5. **Stage 7 last**, because voices and translations are wasted on text that play-tests will change.

## Decisions already made

- No budget or coins for ages 8–12.
- No accounts, no chat, no purchases inside the game, nothing that needs the internet after loading.
- The simulation is always honest. Only Florence is ever wrong.
