# Block Builders: design document

> Strand: First concept · Ages: 8–14 (6×6 junior mat for ages 8; 8×8 for 9+) · Session: 45 / 60 / 90 min · Trailer: `games/trailers/blocks/` (`out/blocks.mp4`)

**Rename before launch.** "BlockBuilders" is the name of an existing UK company that builds Minecraft Education worlds for schools and heritage bodies, and it is listed in Minecraft Education's content-creator directory ([BlockBuilders site](https://blockbuilders-website.pages.dev/about.html); [Minecraft Education](https://edusupport.minecraft.net/hc/en-us/articles/26453473957652-Minecraft-Education-Content-Creators)). That is the same sector and close to a block-building brand, so the lab name is a red flag. Working alternatives: "Tile Town" or "Grid Island" (to verify).

## 1. Summary
Groups design an eco town on a paper mat of coloured tiles (yellow solar, blue wind, purple battery, grey houses, green trees, red factory), copy it onto a screen grid, and watch the voxel island rise from it block by block. The AI helper then reads the design. Shown lots of solar and no batteries, it says "Sunny Power Town! Lights on all night." at 88% sure. At sunset the houses go dark. The children catch the mistake by watching the night test, then change exactly three tiles to batteries, and the lights stay on. They learn that an AI labels what it sees using simple patterns (the biggest colour, daytime only), that it can be very sure and wrong, and that testing in the real conditions reveals what the label missed.

**Overlap with a client-request lab.** This overlaps with **Block Quest** (`games/trailers/bloxel/`, the Bloxels request; design doc `games/labs/bloxel.md`): a 13×13 board becomes a pixel platformer; "Make it harder" becomes "Harder = more spikes! 89% sure", an impossible level, then "One tricky jump, still fair". Both are "children build on a physical grid, then the AI reads it".

| | Block Builders | Block Quest |
|---|---|---|
| What children build | A town or habitat (8×8 or 6×6) | A playable platformer level (13×13) and characters |
| AI's job | Classify the design, then the world tests it | Edit the level to match "harder", "fun", and guess drawings |
| Topic | Energy and systems (Eco Town; also River Town, Grow Lab) | Game design and fairness |
| Best for | Science and eco sessions, families, ages 8–11, 45–60 minutes | Game-design or creative-computing clubs, ages 10–14, longer sessions where children play their level |

## 2. Learning outcomes
- By the end, learners can predict the AI's label and % sure for their design, then compare their prediction with the result.
- By the end, learners can explain which tiles the AI looked at and which it ignored (time of day, batteries).
- By the end, learners can change exactly three tiles to change the AI's verdict and the world's result, and say why.
- By the end, learners can explain why solar power needs storage for night-time.
- By the end, learners can describe one unsure-but-right verdict and why it still needed the night test.

**Curriculum links:** KS2 geography, "the distribution of natural resources including energy" ([DfE](https://www.gov.uk/government/publications/national-curriculum-in-england-geography-programmes-of-study)); KS3 science, energy resources ([DfE](https://www.gov.uk/government/publications/national-curriculum-in-england-science-programmes-of-study)); KS2 computing, logical reasoning and detecting errors ([DfE](https://www.gov.uk/government/publications/national-curriculum-in-england-computing-programmes-of-study/national-curriculum-in-england-computing-programmes-of-study)); KS2 design and technology, evaluate ideas against criteria ([DfE](https://www.gov.uk/government/publications/national-curriculum-in-england-design-and-technology-programmes-of-study)). NGSS 4-ESS3-1 and 4-PS3-4 ([NGSS](https://www.nextgenscience.org/)). AI4K12 Big Ideas 1 (perception) and 2 (representation) ([RPF](https://www.raspberrypi.org/blog/ai-education-ai4k12-big-ideas-ai-thinking/)); UNESCO AI techniques ([UNESCO](https://www.unesco.org/en/articles/ai-competency-framework-students)).

## 3. Real-world connection and careers
- **Energy engineers and planners** design local energy systems that combine generation and storage, and test them over a whole day and night, not just at noon.
- **Urban planners and architects** use plans and models; physical models are still a common way to discuss a design with communities.
- **Computer-vision researchers** classify aerial images; for example, a research project used deep learning to map solar panel installations across the United States from satellite images (DeepSolar, to verify at [Joule 2018](https://doi.org/10.1016/j.joule.2018.11.021)). Labels from images still need checking on the ground.
- **Game and level designers** build on grids, test designs and iterate, the same loop as this lab.

## 4. Setting, look and characters
- **Physical:** an A4 laminated mat with an 8×8 grid (A–H, rows 1–8), a sun icon for north and an entrance for south; a legend where every tile shows colour, white icon, pattern and printed colour name; a "Pause and check" box; a "Change 3 tiles" box. Tiles use the Okabe–Ito colour-vision-safe palette (bluish green, blue, mid grey, yellow, vermilion, reddish purple) with patterns ([Okabe and Ito](https://jfly.uni-koeln.de/color/)).
- **Screen:** the tile grid on the left and the live voxel island on the right; the island rises tile by tile. Day, dusk and night lighting. The trailer's blueprint card: "HABITAT BLUEPRINT · TEAM FOXES".
- **AI helper:** "AI helper", navy card. It reads, then names the design: "Sunny Power Town! Lights on all night." A scan line sweeps the grid; the cells it weighted most glow.
- **Names:** see the rename note above. Team names (Foxes, Otters…) are generic animals.

## 5. Core loop and structure
**Each round:** build or change tiles on the mat → **Pause and check** (the group writes its predicted label and how sure the AI will be) → copy to the screen (Reader, Tapper, Checker) → the world plays its test for 3 seconds without a label (night falls) → the helper's label, % sure and glowing "why" cells → facilitator card → change exactly three tiles and re-run. The classifier is deterministic: same grid, same answer. Never 100%.

| Round | Goal | Real decisions | AI's confident mistake | How children catch it | Clearer design / instruction | On screen |
|---|---|---|---|---|---|---|
| 0 Worked demo (facilitator) | Learn how it reads | Facilitator loads a preset that is mostly trees with a few houses | "Forest, not a town." 71% | "It only counted the biggest colour. What did it miss?" | Facilitator moves three tiles, laughs at their own mistake | Label changes to "Small green town" |
| 1 First town | "Keep the lights on after dark" | Which energy tiles, how many, where | Many yellow, no purple → "Sunny Power Town! Lights on all night." 88% | Night test: houses go dark. "Lights out! The sun went down." Facilitator: "What did the AI forget about the sun?" | Swap 3 solar tiles for batteries | Batteries rise and glow; windows stay lit all night |
| 2 Wind | Add wind power | Turbine placement: among trees and houses, or on the open edge | Turbines among trees → "Wind farm works great." 64% | Turbines spin slowly in sheltered spots; the power bar stays low | Move 3 turbines to the open edge | Turbines spin fast |
| 3 Night check | Is it enough? | Whether to add more batteries | **Unsure but right:** "Lights on all night? Not sure, 59%. I guess three batteries store enough." | The night test runs: the lights stay on | No change needed; the group explains why it still tested | ✔ stamped on "Unsure and right" |
| 4 Write your own card | Change the town with words | Card strip DO → WHAT → WHERE → HOW, with a vague "fog" HOW tile ("nice", "more", "better") | "Make the town better ☁" → "Better = more factories. 73% sure." | The red factory tiles appear; the power runs out at night | Swap the fog tile for a clear one ("3 of them", "only here") | The edit is predictable; the label updates |
| 5 Swap islands | Predict another team's verdict | Each team predicts the label and % for another team's mat | Varies; at least one ≥ 80% misread per lab | Predictions on the mat vs the screen | Teams change 3 tiles on their own mat | History strip of the last three guesses |

## 6. Team roles
Rotate every run; on-screen chips rotate automatically.
- **Reader:** reads the mat aloud row by row.
- **Tapper:** the only person touching the screen.
- **Checker:** holds the legend and compares the on-screen colour counters with the mat; fills in the "Pause and check" prediction.
- **Role bags:** each child holds two tile colours and is the only one who places them: Nature keeper (green, blue), Builder (grey, yellow), Special agent (purple, red).

## 7. Session plans

| Phase | 45 min | 60 min | 90 min |
|---|---|---|---|
| Warm-up | 0–6: brief, honesty line, worked demo (round 0) | 0–7: same, plus roles and bags | 0–10: same, plus "Which tile does what?" legend game |
| Play | 6–30: rounds 1 and 2 (build 7, pause 2, copy 3, test and change ×2) | 7–40: rounds 1–3 | 10–55: rounds 1–5 |
| Discussion | 30–40 (10 min) | 40–55 (15 min) | 55–75 (20 min) |
| Wrap-up | 40–45: exit check, print blueprint | 55–60 | 75–90: exit check; blueprint; gallery walk of all mats |

**Short of time:** keep round 1 (the 88% misread) and one "change 3 tiles". Cut rounds 4 and 5. Copying is the slowest step; use "row by row" mode.

## 8. Assessment
- **Stars:** one for a correct "Pause and check" prediction of the label; one for naming what the AI ignored; one for fixing it in three tiles or fewer. No stars for a prettier island.
- **Artefact:** the printed Habitat Blueprint: the grid in colour, icon and pattern; first and final guesses with % sure; the "why" cells outlined; the group's prediction next to the AI's answer; "The AI was ☐ right ☐ wrong ☐ half-right because…"; the three tiles changed. The trailer's version: "First guess: Sunny Power Town, 88%. Wrong at night. We added 3 batteries. The AI got it wrong because it only looked at daytime."
- **Exit check:** 1. "The AI says 'Lights on all night, 88% sure'. How do we find out?" (Test it at night.) 2. "Which three tiles would change its mind?" (Batteries, for this town.) 3. "Does very sure mean right?" (No.)

| Criterion | 1 Emerging | 2 Secure | 3 Strong |
|---|---|---|---|
| Predicts | No prediction | Predicts the label | Predicts label and % and explains why |
| Explains the AI's reading | "It's wrong" | Names what it ignored | Links it to a rule ("it only counts daytime / the biggest colour") |
| Makes a targeted change | Changes many tiles | Changes three tiles that help | Explains why those three |
| Collaboration | One child does everything | Roles used | Roles rotate smoothly; the Checker catches a copy error |

## 9. Discussion session (instructor-led, at the end of the lab)
**Length:** 10 / 15 / 20 minutes. Plan below is 15 minutes.

**Purpose.** *The AI reads our design with simple rules and can be very sure and wrong. Testing in real conditions (night) shows what a label misses. Small, deliberate changes, tested again, are how designers and engineers improve things.*

**Set-up**
- "Tiles down, hands on knees": tablets face down. The display shows the trailer's day-to-night sequence for one group's town.
- Groups bring their mats into a circle on the floor, like a model village.
- Materials: spare battery tiles, a torch (to play "sun" and "night"), sticky notes, blueprints.

**Structure (15 minutes)**

| Min | Step |
|---|---|
| 0–1 | Opening question |
| 1–4 | Groups: questions 1–2 at their own mat |
| 4–11 | Whole circle: questions 3–6, with the torch demo for question 3 |
| 11–13 | Questions 7–8 |
| 13–15 | Closing ritual |

10 minutes: opening, 1, 2, 4, 6, closing. 20 minutes: add question 9 and the Quick, Draw! example.

**Opening question.** "Point to the tile on your mat you think mattered most to the AI."

**Core questions**
1. *Recall.* "What did the AI call your town, and how sure was it?"
   - Purpose: shared account, using their own data.
   - Strong answer: "Sunny Power Town, 88%. Then the lights went out at night."
   - Probe: "What did you predict in your Pause and check box?"
2. *Reasoning.* "Why did the AI say 'lights on all night'?"
   - Purpose: name the rule it used.
   - Strong answer: "It saw lots of solar and thought that meant lots of power, but it only thought about the daytime."
   - Probe: "Which cells glowed? Were they the important ones?"
3. *Science (torch demo).* "Turn the torch off. Where does the power come from now?"
   - Purpose: storage, the real fix.
   - Strong answer: "From the batteries, which stored sunshine in the day."
   - Probe: "What else could keep lights on at night?" (Wind, if it is windy.)
4. *Confidence.* "The AI was 88% sure and wrong, and 59% sure and right. What does its % really tell us?"
   - Purpose: % reflects the pattern match, not the truth.
   - Strong answer: "How strongly the pattern matched its rules. Only the night test shows if it's right."
   - Probe: "Should we always test, even when it's very sure?"
5. *Reasoning.* "Why did we change only three tiles?"
   - Purpose: controlled change, fair test.
   - Strong answer: "So we know which change made the difference."
   - Probe: "What would happen if we changed everything at once?"
6. *Ethics and decision.* "Who should decide what goes in a real town: the AI, the designers, or the people who live there?"
   - Purpose: people decide.
   - Strong answer: "The people who live there, with designers, using the AI to check ideas."
   - Probe: "What might the AI not know about the people?"
7. *Transfer.* "Where else does a computer put a label on something you made or a photo you took?"
   - Purpose: photo apps, drawing games.
   - Strong answer: "My photo app called my dog a cat."
   - Probe: "How could you test it?"
8. *Careers.* "An energy engineer is told 'This town has plenty of power.' What would they check?"
   - Purpose: professional testing.
   - Strong answer: "Night, winter, when it isn't windy, how many people use power."
   - Probe: "Which of those did our AI forget?"
9. *Your own card (20-minute version).* "What did the fog tile ('better') make the AI do? Rewrite it."
   - Purpose: vague words in instructions.
   - Strong answer: "It added factories. We wrote 'Add 3 batteries near the houses'."
   - Probe: "Swap with another group and predict what their card will do."

**Sentence starters:** "The AI looked at … but ignored …" · "We predicted … and it said …" · "It was … % sure, but at night …" · "The three tiles we changed were … because …" · "I would test it by …"

**Common misconceptions**
- *"The AI sees our town like a person."* Respond: "It counts colours and positions. Which colour was biggest on your mat?"
- *"More solar fixes the night."* Respond with the torch: "No sun, no solar. What stores power?"
- *"The AI is broken because it was wrong."* Respond: "It followed its rules exactly. The rules didn't include night."
- *"High % means we can skip the test."* Respond: round 1.

**Differentiation**
- *Younger or less confident:* the 6×6 mat; picture options on the blueprint ("right / wrong / half-right"); point rather than explain; the facilitator models the first "change 3 tiles".
- *Older or confident:* "Write the AI a new rule that would have caught the night problem"; "Design a mat that tricks the AI into a confident wrong label"; "How would you test this town in winter?"

**Connecting to real life.** Google's Quick, Draw! is a game in which a neural network tries to guess what you are drawing; Google released the collected doodles as a dataset for research ([Google Research](https://research.google/blog/introducing-the-kaggle-quick-draw-doodle-recognition-challenge/)). Ask: "Why might it guess wrong when someone draws in an unusual way? Who decides what a 'right' drawing of a house looks like?" Demonstrate on the facilitator's screen only (check current availability and age terms, to verify).

**Closing ritual.** Each child finishes "Before I believe an AI's label, I test it by …" on their blueprint. Gallery walk: each group shows its before-and-after in one sentence. Next step: "Look at the buildings near you: where do they get power at night?" For clubs: River Town or Grow Lab mats use the same grid.

**Facilitator notes**
- *Group dynamics:* watch for the child at the edge who can't see the screen; rotate them to Tapper next. Role bags make sure every child places tiles.
- *Model failure:* misread your own demo on purpose, laugh, and fix one tile; it makes mistakes safe.
- *Safeguarding:* follow the venue's policy; Childline 0800 1111 ([Childline](https://www.childline.org.uk/)).
- *Dominant voices:* ask by role ("Special agent, why did you place the batteries there?").

## 10. Accessibility and inclusion
- Every tile has colour, icon, pattern and a printed colour name (Okabe–Ito principles); print a test sheet and check it with a colour-vision simulator.
- Large 20 mm tiles or dot stickers for fine-motor needs; tap or drag to paint; no timer; no typing.
- Helper lines read aloud and captioned.
- **No devices:** the mat is the game. The facilitator uses a printed lookup ("lots of yellow, no purple → Sunny Power Town, 88%") and a torch for the night test; children stand paper "lights" in the houses that stay lit.

## 11. Safety, ethics and data
- **Data:** none. No camera reads the mat; no accounts; the blueprint prints and nothing is stored after the session. Names on blueprints are handwritten first names only, or none.
- **Real AI tools:** the classifier is scripted rules; say so once.
- **Gentle consequences:** the lights go out, then come back. Every design is valid; the AI's verdict is the thing being tested, not the children.
- **Look:** flat untextured voxels and rounded UI; no pixel block textures or block-game iconography (research 10 checklist).

## 12. Build notes
- **Assets:** the trailer's mat and tablet overlays, the per-cell island builder, day/dusk/night lighting, lit windows, battery glow, blueprint card. New: turbine spin by shelter, factory tiles, the card-strip UI for round 4, the history strip, the hidden facilitator menu with six presets (three misreads, three good designs).
- **Scripted verdicts:** "Sunny Power Town! Lights on all night." (88%) · "Forest, not a town." (71%) · "Wind farm works great." (64%) · "Lights on all night? Not sure, 59%." · "Better = more factories." (73%). Confidence formula and features from research 06, section 9.5.
- **Reuse:** most of the trailer; reviews note the dusk colour is barely visible, so lengthen dusk in the build.
- **Open questions:** the new name; 8×8 copy time is a design target, not a finding, so measure it in the pilot.
