# New DeltaOps games: plans

Six new games, one for each idea the research covered. Each keeps the DeltaOps core: a floating voxel island, an AI helper that guesses with a "% sure", a world that visibly changes, a facilitator question, and a clearer retry. Specs come from `research/round-3/` (section numbers in brackets).

Shared rules from the research, applied to every game:
- Confidence is shown as words plus a bar ("Not sure / Fairly sure / Very sure"), with the number small (03: Reigns, Into the Breach). Every game scripts at least one **confident but wrong** moment and keeps a visible ✔/✘ record (02, 09).
- The helper says "I guess" and "my book says", never "I feel" (02, 09). It is a tool, not a friend.
- Consequences show in the world first (wildlife, litter, flowers, ducks), numbers second (01, 03).
- Retry costs seconds and never costs stars; stars reward clearer instructions and spotted assumptions, never speed or a prettier island (01, 05).
- Group play, team-only leaderboards, no streaks, no lives, no random rewards (05; ICO Children's Code Standards 5 and 13).
- Original look: flat untextured voxels, soft model lighting, floating dioramas, rounded UI. Nothing Minecraft-distinctive (10).

---

## 1. Robo-Taxi Island (self-driving, teaching an AI to see)

**User ask:** a self-driving car game where you identify objects to teach machine learning. **Spec:** 09 §7.

- **Island:** a tiny town with a school crossing, bakery, duck pond, farm lane and lighthouse road.
- **AI:** Pip, a blocky robo-taxi with a roof camera, who only knows what is in its **Picture Book**. Marge, a safety-driver robot with a big red button, rides in the back so nothing bad really happens.
- **Loop:** children add picture cards to Pip's book; Pip drives; boxes appear over what it sees ("Person · Very sure"); it stops or goes.
- **Six stages:** Teach Pip to See → Who's Missing? (only grown-ups in the book; a child on a scooter confuses Pip) → Weird Things (plastic bag, puddle, dinosaur costume, duck) → Night and Fog → Trick Pip! (stickered stop sign) → Three Teams Agree.
- **Confident mistake:** the farm scarecrow is "Person, very sure (94%)".
- **Meters:** Safe Trips, False Alarms (milkshake wobbles), Missed It (soft hay bale bumped), Pip's Record ✔/✘.
- **Artefact:** Pip's Driving Licence: "Humans taught this car. Humans check this car."
- **Trailer story (≈40 s):** dawn over the island → Pip rolls out → its view with boxes → scarecrow "Person 94%" → braking, milkshake spills → children add pictures → night, fog, % drops → child on scooter, Pip unsure, asks for help → teams agree, green lights all round the loop, fireflies → licence → title.

## 2. Pit Crew (AI racing, rewards and loopholes)

**User ask:** an AI-guided racing game. **Spec:** 07 §6.

- **Island:** Pebble Ring, a dirt loop round a lily pond with a flower meadow inside (the shortcut temptation), a beach, a bridge, four checkpoint arches and a duck crossing.
- **AI:** Sprocket, a blocky kart with a roof "brain" light. Children are the pit crew: they never steer, they choose reward cards and set the **Penalty Dial**.
- **Six stages:** What does "go" mean? → Star Points (Sprocket loops one checkpoint for 47 stars, 0 laps) → Other Racers (bumping) → Penalty Dial (Off / Tiny / Just right / HUGE) + Patch It → Copy Us (learning from demonstration, Mirror Island) → Race Day on Thunder Ridge.
- **Signature visual:** "Stars 47 · Laps 0".
- **Two modes:** Training Garage (8 translucent Sprockets learning, "Try 1… Try 50") and Race Track.
- **Artefact:** Racing Licence with the team's reward recipe and "Our AI found a loophole: ___".
- **Trailer story (≈40 s):** start lights → "Go fast!" → Sprocket ploughs through the meadow, petals fly, "92% sure" → "1 star per checkpoint" → the endless loop, star counter racing, laps 0 → training garage ghosts → penalty dial clicks to Just right → clean lap, flowers regrow → podium → title.

## 3. Block Builders (Bloxels-style habitat grid)

**User ask:** Bloxels. **Spec:** 06 §9–10.

- **Loop:** each group builds an 8×8 colour-tile design on a printed mat (6×6 for ages 7–8), copies it onto the screen grid, and the island **rises from the grid** block by block. The AI then labels the design ("Sunny Power Town, very sure") and the world tests it.
- **Colour grammar (Eco Town):** yellow solar, blue wind, purple battery, grey houses, green trees, red factory.
- **Designed misreads:** "Sunny Power Town, lights on all night, 88% sure" when there is no battery: at dusk the houses go dark. Fix: add three purple battery tiles; lights stay on.
- **Roles:** Reader, Tapper and Checker rotate each run.
- **Variant:** Write Your Own Card from picture tiles.
- **Artefact:** printed Habitat Blueprint with the grid and the AI's verdicts.
- **Trailer story (≈40 s):** hands place tiles on a paper mat → screen grid fills → voxel island rises tile by tile → AI: "Sunny Power Town! Lights all night. Very sure" → sunset → houses go dark → "What did the AI forget about the sun?" → three battery tiles → night, windows glow, turbines spin → blueprint → title.

## 4. Island Park Tycoon: The Manager Bot (resource management)

**User ask:** a Zoo / RollerCoaster Tycoon-style game. **Spec:** 08 §7.

- **Island:** a nature park with a pond, meadow, woodland edge and visitor gate. About 20 visitors; otters, ducks, hedgehogs, deer, an owl, frogs, rabbits.
- **AI:** Manager Bot optimises only what the card says. Each card runs a 10-second "season".
- **Meters:** Visitors, Wildlife and Tidy, each with equal-size in and out arrows; needs icons (food, water, shelter, friends).
- **Thought bubbles:** "My burrow's under that path!", "The litter here is really bad", "So much fish… but I'm lonely."
- **Six stages:** Opening Day → Snack Attack → Needs Check → Busy Weekend → Mystery Complaints (3 loud bubbles vs 8 quiet ones) → Park Charter (goal + never + check).
- **Stars:** target, floor and check, scored per season.
- **Artefact:** the Park Charter.
- **Trailer story (≈40 s):** gate opens, "Get 50 visitors" → Manager Bot "Free entry and a path straight through the meadow! 92%" → crowds pour in, rabbits flee, bubbles pop → "Sell as many snacks as possible" → litter, gulls, Tidy meter thuds in → "Count every bubble, animals too" → trees grow, otters play, hide full of binoculars → Island Champion → title.

## 5. Sure or Not Sure? (quiz show)

**User ask:** a quiz (the Minecraft quiz idea, made original). **Spec:** 10 §8.

- **Format:** a room-wide game show for up to about 25 children. The stage is a floating island studio. Questions show an AI helper's guess and its "% sure"; the room answers with bodies and hands: corners A/B/C, a "Sure-o-meter" floor line, thumbs (trust it / check it / don't use it).
- **Catchphrase:** the host asks "What did it assume?" and the room shouts "**ASSUMPTION!**" with a hand to the forehead.
- **Rounds:** Which helper are you? (Speedy Guesser, Careful Checker, Question Asker) → Spot the assumption → How sure should it be? → Trust, check or don't use → Finish together.
- **Content:** 10 questions per lab (pond, rover, lighthouse, Londinium), e.g. "That's a duck, 95% sure." It's a moorhen.
- **Scoring:** team-only, no speed points (05).
- **Trailer story (≈35 s):** studio lights → host robot → question: helper says "Duck! 95% sure" → reveal: a moorhen → crowd shouts ASSUMPTION! → Sure-o-meter sweep → thumbs wall → team scores glow → "Before I trust an AI's answer, I… check" → title.

## 6. Clear Signal (one-button rhythm runner)

**User ask:** a Geometry Dash-like replayable game. **Spec:** 05 §5–6 (Beat Mode, instant restart, best-progress bar, attempt montage).

- **Loop:** a tiny courier robot runs across a chain of floating islands to a beat. Instruction cards arrive on the beat; the child taps the **clearest** card before the robot reaches the next gap or obstacle.
  - Vague card ("Go up!"): the robot guesses wrong, e.g. jumps onto a cloud and bounces off.
  - Clear card ("Jump the 2-block gap"): a perfect hop.
- **Replay:** instant restart (under 1 second), no lives, practice markers, best-% bar, a montage of all attempts at the end, an assist tempo with no badge, an optional "Puzzle of the Visit". No streaks, no speed scoring outside the run.
- **Session:** 60–90 second runs as a warm-up or queue activity, capped at a few rounds.
- **Trailer story (≈35 s):** beat drops → robot sprints across islands → cards fly in on the beat → vague card, robot bonks, instant restart, attempt counter → progress bar inches up → montage of ghost attempts converging → perfect run, islands light up in time with the music → "Attempt 12: 100%" → title.

---

## Trailer production

- **Engine:** `games/trailers/engine/`, three.js voxel dioramas (flat-colour voxels, soft upper-left key light, shadows, baked vertex AO) plus an HTML overlay in the brochure's UI style (Bricolage Grotesque and Inter, rounded white cards, the navy AI helper card, the warm facilitator card).
- **Rendering:** a deterministic timeline driven by frame number. Playwright captures every frame headlessly; ffmpeg encodes 1920×1080 H.264 at 30 fps, with a synthesised music bed and sound effects.

**Review scale (out of 10)**, two scores per trailer. Both must reach 8.

- **Story**, five criteria, 0–2 each:
  - a hook in the first 3 seconds;
  - the premise is clear without narration;
  - the AI mistake is visible and readable;
  - the consequence and the fix have an emotional payoff;
  - a clean resolution and title.
- **Visual sophistication**, five criteria, 0–2 each:
  - composition and camera movement;
  - lighting and colour (a palette per world);
  - world detail and life (characters, animals, particles);
  - UI polish and legibility at 1080p;
  - pacing and transitions.

Reviews are logged in `games/trailers/REVIEWS.md`.
