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
