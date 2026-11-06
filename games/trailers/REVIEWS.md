# Trailer reviews

The scale is in `games/PLAN.md`. Story has five criteria (hook, premise, AI mistake, payoff, resolution) and so does visual sophistication (composition, lighting/colour, world life, UI, pacing). Each criterion scores 0–2. A trailer ships when both scores reach 8/10.

## 1. Robo-Taxi Island (`out/robotaxi.mp4`, 42 s)

**v1 (stills only): Story 6 · Visual 4.** Not shippable.
- Overlay layer was hidden behind the WebGL canvas.
- Close-up cameras were blocked by houses.
- Pip was parked inside the garage.
- The bounding boxes projected with a stale camera.
- Night was murky.

**v2: Story 6.5 · Visual 6.**
- Fixed the layering, cameras and projection.
- The hook was still a distant static island.
- The night had no haze, and the floating lamp cubes looked odd.

**v3 (shipped): Story 9 · Visual 8.**
- Story:
  - Hook 2: a Pip-cam point-of-view opening with "???" boxes and "Pip can drive. But Pip can't see. Not yet."
  - Premise 2: picture-book cards.
  - Mistake 2: the scarecrow tagged "Person · very sure 94%", then "False alarm".
  - Payoff 1.5: unsure at night, a clearer card, a green box, the child crosses.
  - Resolution 2: green-lights finale and title.
- Visual:
  - Composition 1.5: the wide shot at 4–8 s is static.
  - Lighting 1.5: night is readable but flat.
  - World life 1.5: kids, ducks, fireflies and headlight.
  - UI 2.
  - Pacing 1.5: hard cuts with whoosh sound effects.
- Known nits: the farm shot holds for 5.5 s; the grey roadside bollards are chunky in close-ups.

## 2. Pit Crew (`out/pitcrew.mp4`, 41 s)

**v1 (stills): Story 8 · Visual 6.**
- The opening shot was too close, with the gantry pillar blocking it.
- The meadow cut left no visible scar.
- A tree hid the checkpoint loop.
- The dial labels and meters were clipped.
- The chase camera was too low.
- The licence card covered Sprocket.

**v2: Story 8.5 · Visual 7.**
- The scar rendered as a raised plank.
- The meter panels ran off the right edge.

**v3: Story 9 · Visual 7.5.**
- Rival karts drove through the opening shot.
- The gantry blocked the first second of the chase shot.

**v4 (shipped): Story 9 · Visual 8.**
- Story:
  - Hook 2: start lights and "learns from the stars you give it".
  - Premise 2.
  - Mistake 2: "Go fast!" cuts the meadow; then "47 stars · 0 laps" from circling checkpoint 1.
  - Payoff 1.5: the training garage, the penalty dial, a clean lap with flowers growing back.
  - Resolution 2: licence and title.
- Visual:
  - Composition 1.5.
  - Lighting 1.5: single daylight look.
  - World life 1.5: karts, ducks, petals, confetti.
  - UI 2.
  - Pacing 1.5.

## 3. Block Builders (`out/blocks.mp4`, 40 s)

**v1 (stills): Story 8.5 · Visual 6.5.**
- The blueprint grid rendered empty (missing CSS selector).
- The "lights on" payoff was too dim to read.
- The island was small in frame.

**v2 (shipped): Story 9.5 · Visual 8.**
- Story:
  - Hook 1.5: tiles placed on a paper mat. Charming but gentle.
  - Premise 2: mat, then screen grid, then the island rises tile by tile.
  - Mistake 2: "Sunny Power Town, 88%" goes dark at night.
  - Payoff 2: three battery tiles; windows, battery glow and warm lights all night.
  - Resolution 2: the Habitat Blueprint card states the assumption the AI made.
- Visual:
  - Composition 1.5.
  - Lighting 2: day/dusk/night contrast.
  - World life 1: turbines and a few walkers.
  - UI 2.
  - Pacing 1.5.
- Nit: the dusk colour is barely visible before night.

## 4. Island Park Tycoon (`out/tycoon.mp4`, 40 s)

**v1 (stills): Story 8.5 · Visual 7.5.**
- The rabbit's "My burrow" bubble vanished because the rabbit had already fled.
- The owl's bubble overlapped the meter panel.

**v2 (shipped): Story 9.5 · Visual 8.5.**
- Story:
  - Hook 1.5: Manager Bot at the gate, "It does exactly what the card says."
  - Premise 2.
  - Mistakes 2: a crowd floods a straight path cut through the meadow and rabbits flee; then six kiosks with no bins bring litter, gulls and the Tidy meter crashing.
  - Payoff 2: "Count every bubble, animals too" gives 3 vs 8; trees grow, a hide appears, otters and deer arrive, meters recover.
  - Resolution 2: the Park Charter states target + never + check.
- Visual:
  - Composition 1.5: the crowd enters from the lower-left corner.
  - Lighting 1.5: daylight only.
  - World life 2: about 22 visitors, rabbits, ducks, gulls, otters, deer, litter.
  - UI 2.
  - Pacing 1.5.

## 5. Sure or Not Sure? (`out/quiz.mp4`, 37 s)

**v1 (stills): Story 8.5 · Visual 6.5.**
- The moorhen was black on a black screen.
- The question card covered the answer zones during the vote.
- Children were tiny and stacked on the same spots (formation bug).
- The Sure-o-meter camera was top-down, so children looked like they were lying flat.

**v2 (shipped): Story 9.5 · Visual 8.5.**
- Story:
  - Hook 2: "Can you spot when an AI is guessing?" under sweeping spotlights.
  - Premise 2: three rounds (trust/check/don't use; the Sure-o-meter; spot the assumption).
  - Mistake 2: "Duck! 95% sure" is a moorhen; the room shouts "ASSUMPTION!"
  - Payoff 1.5: team scores for good thinking, not speed.
  - Resolution 2: "Before I trust an AI's answer, I… CHECK."
- Visual:
  - Composition 1.5.
  - Lighting 2: coloured studio beams and point lights.
  - World life 1.5: about 24 children moving between zones, confetti, host bot.
  - UI 2.
  - Pacing 1.5.
- Nit: the Sure-o-meter round reads weakest (children are small on the strip).

## 6. Clear Signal (`out/signal.mp4`, 36 s)

**v1 (stills): Story 7 · Visual 6.**
- Unintended gaps in the level; the robot ran across empty air.
- The branch sat over a gap, so the "Duck!" gag was hidden.
- The camera was low and the robot tiny.

**v2 (full render): Story 8.5 · Visual 7.5.**
- Not shippable.
- The duck gag was hidden behind foliage.
- The robot was still small.
- Trees cluttered every shot.
- The ghost montage was murky.

**v3 (shipped): Story 9 · Visual 8.**
- Changes:
  - The "Duck!" card now summons a big yellow duck right in front of the robot.
  - Bigger robot and a closer camera.
  - Fewer trees.
  - A beat ring pulses under the robot.
  - Montage ghosts are tinted with red ✕ fail markers.
- Story:
  - Hook 1.5.
  - Premise 2: two cards arrive on the beat.
  - Mistake 2: "Duck!" fetches a duck; "Go up!" flies to a cloud.
  - Payoff 2: instant restarts, attempt counter, best-progress marker, then attempt 12 at 100%.
  - Resolution 1.5.
- Visual:
  - Composition 1.5.
  - Lighting 2: dusk-to-night sky gradient.
  - World life 1.5.
  - UI 2.
  - Pacing 1.

## Summary

| Trailer | Story | Visual |
| --- | --- | --- |
| Robo-Taxi Island | 9 | 8 |
| Pit Crew | 9 | 8 |
| Block Builders | 9.5 | 8 |
| Island Park Tycoon | 9.5 | 8.5 |
| Sure or Not Sure? | 9.5 | 8.5 |
| Clear Signal | 9 | 8 |

These are self-assessed scores. The shared visual ceiling is daylight-heavy lighting and software-rendered WebGL (no post-processing such as bloom or depth of field). The obvious next step for every trailer is a human voice-over and licensed music.

---

# Round 2: reference-style trailers (November 2026)

Feedback that drove this round:
- "The graphics are boring."
- "No faded dusk scenes."
- "Use the graphic style of each reference game."
- "Make world-building trailers that look exactly like the brochure images."

I scored each trailer twice, against its reference:
- **Game quality**: does the story play like a real game of that genre, with a clear AI mistake and fix?
- **Visual match**: does it look like the reference game or brochure screenshot, without copying assets?

The target was 8/10 on both.

## Set A: the seven client requests

| # | Request | Trailer | Reference style | Game | Visual |
| --- | --- | --- | --- | --- | --- |
| 1 | World building, environmental | Eco Town | Brochure island-town-day | 8 | 8 |
| 2 | Resource management (Zoo / RollerCoaster Tycoon) | Island Park Tycoon | 1990s isometric pixel park sims | 8 | 8 |
| 3 | Minecraft quiz | Block Quiz | Blocky survival sandbox, procedural textures | 8 | 8 |
| 4 | Repeat playability (Geometry Dash) | Beat Block | Neon one-button rhythm runner | 8 | 8 |
| 5 | Bloxels | Block Quest | 13×13 board to pixel platformer | 8 | 8 |
| 6 | Self-driving car in a city | Autopilot City | Low-poly city with lidar point cloud | 8 | 8 |
| 7 | Racing | Pit Crew GP | Toon-shaded cartoon kart racer | 8 | 8 |

Notes:
- **Island Park Tycoon:**
  - 640×360 canvas scaled up, 64×32 isometric tiles.
  - Bevelled 1990s windows, a news ticker and guest thought bubbles.
  - Manager Bot builds a path through the meadow and six kiosks with no bins. Wildlife drops.
  - The clearer goal fixes it.
  - Visual gap: fewer ride types than RollerCoaster Tycoon. It has one coaster and one Ferris wheel.
- **Beat Block:**
  - Neon spikes, pulse rings and screen shake, with an attempt counter, practice mode and a progress bar.
  - The co-pilot is 92% sure and wrong ("Jump on the 4th beat!").
  - Visual gap: one colour theme per level, where the reference changes palettes mid-level.
- **Block Quest:**
  - A physical 13×13 board snaps into a playable level.
  - "Harder = more spikes" (89%) makes the level impossible.
  - In the art board scene the AI guesses frog, then dragon once wings are added.
  - Visual gap: no live level-editor cursor.
- **Block Quiz:**
  - 16×16 procedural textures (no Mojang assets) and three answer pads whose floors drop.
  - The AI says "Lava!" at 90% for the portal frame; the answer is obsidian.
  - The title card carries the "not an official Minecraft product" disclaimer.
- **Autopilot City:**
  - Lidar point cloud and detection boxes.
  - A billboard runner is a false alarm ("PERSON 91%"); a child behind a van is missed ("? 41%"), then caught after training (88%).
- **Pit Crew GP:**
  - Toon-shaded kart track with kerbs, boost pads, item boxes and stands.
  - Sprocket loops one checkpoint for "47 stars, 0 laps", then races clean after the reward is rewritten.

## Set B: brochure world-building labs

The brochure games all share the same game UI, rebuilt in `engine/brochure.css` and `engine/lab.js`:
- top-left badge and task bar;
- star and XP pills;
- dark AI helper card with a "% sure" bar;
- coloured facilitator card;
- meters and card choices with a tapping hand.

| Trailer | Brochure image matched | Game | Visual |
| --- | --- | --- | --- |
| Eco AI Explorer | game-eco, story-1 to story-5, island-pond | 8 | 8 |
| Mission AI | game-camp-ask, island-island | 8 | 8.5 |
| AI Time Traveller | game-museum-ask, island-rome | 8 | 8 |
| AI Inventor Lab | game-stem, island-mars | 8 | 8 |
| Eco Town | island-town-day (cover line "Keep the lights on after dark") | 8 | 8 |

Notes:
- **Mission AI:**
  - Diorama slab with a see-through sea and soil strata.
  - White ridge, red lodge, lighthouse, campfire, tents, jetty and boat.
  - Same UI as the screenshot: "Sunset in 1:18" timer, camp leaderboard, "Day 3" task, teal facilitator card.
  - The AI's "quickest = shortest" route over the ridge drains energy. The beach route arrives with 0:41 to spare.
  - The sky stays bright blue; no sunset is shown.
- **AI Time Traveller:**
  - Floating island with a temple, terracotta roofs, river quay, crane, amphorae, striped market stalls, cypresses and a bridge.
  - The AI's peacock-and-dormice feast appears as a purple banquet table.
  - The alert reads "No sign of peacock or dormice in London's finds".
  - The fix uses London evidence: oyster shells, wine jars (amphorae) and millstones for bread. The four evidence tiles fill up.
- **AI Inventor Lab:**
  - Terraced Mars island with a white base, landing pad, soft-sand patch and flagged crater.
  - The brochure's purple dusk was replaced by a saturated deep-space indigo with sharp stars. There is no pink haze.
  - The "YOUR PROGRAM" blocks change from "top speed, straight" to "wide wheels, under 5 km/h" and "avoid soft sand".
  - Crater photo polaroid, "Level 5 unlocked" panel and three stars.
- **Eco Town:**
  - Houses with solar panels, a battery block, wind turbines on terraced hills, a pond and the town hall chimney.
  - Night is crisp and bright (moonlit blue, lit windows), not a faded dusk.
  - "Cleanest = solar only" causes a blackout at 8 pm. Charging the battery by day keeps the lights on.
