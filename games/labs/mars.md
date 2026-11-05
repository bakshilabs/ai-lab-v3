# AI Inventor Lab: design document

> Strand: Brochure world-building · Ages: 8–14 (core 9–13) · Session: 45 / 60 / 90 min · Trailer: `games/trailers/mars/` (`out/mars.mp4`)

## 1. Summary
At a STEM club, children instruct an AI helper that turns their cards into a rover program, aiming to "Drive the rover to the crater and send back a photo". Told "Get to the crater as fast as you can", the helper writes "top speed, straight", at 72% sure, and the rover sinks in soft sand. The children use the terrain map and the rover's camera view to show what "fast" left out. The clearer card ("Drive slowly and steer round soft sand") becomes "wide wheels, under 5 km/h, avoid soft sand", and the rover reaches the crater. In a second strand they compare what the rover's camera reports ("Rock ahead, 92%") with what they can see (a shadow). They learn that an AI turns vague words into exact actions, that its perception can be confidently wrong, and that engineers test plans before trusting them.

**Fix to the brochure screen.** `game-stem` is the only brochure screen with no AI helper, no wrong guess and no facilitator card, so it reads as a plain coding game (`research/context.md`). This design, like the trailer, adds the helper, the mistake and the question. **Naming:** the lab library calls the space lab "Moon Base" while this lab is on Mars; every fact below is Mars-specific. Decide Moon or Mars before print.

## 2. Learning outcomes
- By the end, learners can explain how the helper turned "fast" into a specific program block, and why that block failed on Mars.
- By the end, learners can compare a camera's label with their own observation and decide which to trust, giving a reason.
- By the end, learners can write a rover instruction with where, how fast, and when to stop.
- By the end, learners can describe one moment where the helper was unsure but right, and say why it was still checked.
- By the end, learners can give one real reason Mars rovers are driven slowly and planned in advance.

**Curriculum links:** KS2 computing, "design, write and debug programs that accomplish specific goals, including controlling or simulating physical systems" ([DfE](https://www.gov.uk/government/publications/national-curriculum-in-england-computing-programmes-of-study/national-curriculum-in-england-computing-programmes-of-study)); KS2 science, Earth and space (Year 5) and friction (Year 5 forces) ([DfE](https://www.gov.uk/government/publications/national-curriculum-in-england-science-programmes-of-study)); KS2/KS3 design and technology, evaluate and test ideas ([DfE](https://www.gov.uk/government/publications/national-curriculum-in-england-design-and-technology-programmes-of-study)). NGSS 3-5-ETS1-3, fair tests to improve a model ([NGSS](https://www.nextgenscience.org/)). UNESCO AI competencies: AI techniques and AI system design, Understand to Apply ([UNESCO](https://www.unesco.org/en/articles/ai-competency-framework-students)); AI4K12 Big Ideas 1 (perception) and 2 ([RPF](https://www.raspberrypi.org/blog/ai-education-ai4k12-big-ideas-ai-thinking/)).

## 3. Real-world connection and careers
- **Rover drivers** at NASA JPL "don't actually drive the rovers in real time"; they plan a whole Martian day (a sol), test it in simulation, and send it up ([JPL podcast](https://www.jpl.nasa.gov/podcasts/on-a-mission-season-1/season-4-mars-rovers/episode-8-how-to-drive-a-mars-rover/)). Commands take "between 3 and 22 minutes" to arrive ([NASA](https://science.nasa.gov/missions/mars-2020-perseverance/speaking-percys-language-how-to-talk-so-perseverance-will-listen/)).
- **Mission engineers** check wheels with rover selfies, which "allow mission engineers to track changes over time, such as dust accumulation and wheel wear" ([NASA](https://science.nasa.gov/photojournal/high-resolution-self-portrait-by-curiosity-rover-arm-camera/)). Curiosity's wheels were damaged crossing sharp rocks in 2013 ([NASA](https://science.nasa.gov/resource/break-in-raised-tread-on-curiosity-wheel/)). Spirit became stuck in soft soil in 2009 ([JPL](https://www.jpl.nasa.gov/missions/mars-exploration-rover-spirit-mer-spirit/)).
- **Planetary geologists** choose which rocks to study.
- **How AI is used today:** in the AI4Mars project, volunteers labelled terrain in rover images as sand, soil, bedrock or big rocks, with about 10 labellers per image, to train terrain classifiers ([NASA JPL](https://www.jpl.nasa.gov/news/nasas-mars-rover-drivers-need-your-help/); [Swan et al.](https://openaccess.thecvf.com/content/CVPR2021W/AI4Space/papers/Swan_AI4MARS_A_Dataset_for_Terrain-Aware_Autonomous_Driving_on_Mars_CVPRW_2021_paper.pdf)). Rovers also use onboard autonomy for some driving and target selection (to verify specific systems before naming them).

## 4. Setting, look and characters
- **Style:** the brochure's terraced Mars island (`island-mars`): rust terraces, a white stepped base with a blue stripe, landing pad, a soft-sand patch, boulders and a flagged crater. The trailer uses a saturated deep-space indigo sky with sharp stars and no haze; keep that (small figures vanish in the brochure's dark violet when printed).
- **UI:** badge "AI Inventor Lab · STEM CLUB", "L4" tag, task "Drive the rover to the crater and send back a photo", the "YOUR PROGRAM" block stack (When mission starts → drive [?] → at the crater: take a photo), the navy helper card with a "PLAN CHECKED" tag on good plans, yellow facilitator card, a sol clock, Energy and Science meters, a crater-photo polaroid, "Level 5 unlocked".
- **AI helper:** "AI helper", a navy card with a gear glyph. It is the **translator** from cards to blocks: "You said fast. I wrote: top speed, straight." Literal and cheerful.
- **Names:** the children name the rover at stage 6. No other characters. "AI Inventor Lab" not trademark-searched (to verify).

## 5. Core loop and structure
**Each stage:** brief → pick a card (vague slot moves) → the helper writes program blocks and states its "% sure" → children may press **Simulate** (a 3-second preview, as JPL tests drives before sending) → the rover runs one sol → camera "postcard" and meters → facilitator card → clearer card. The sol clock advances on every run, retries included, but no stars are lost.

| Stage | Goal | Cards (vague ✱) | AI's confident mistake | How children catch it | Clearer instruction | On screen |
|---|---|---|---|---|---|---|
| 1 Wake-up | Start the day | A "Point solar panels at the Sun, then check battery" · B ✱ "Get ready" · C "Take a 360° photo of the landing site" | B → blocks: "wait until ready". "Getting ready all sol!" 78% | The sol clock ticks over and nothing happens. "What did 'ready' mean?" | A or C | Battery up, or a layered rock spotted |
| 2 Route (brochure moment) | Drive to the crater | A ✱ "Get to the crater as fast as you can" · B "Drive slowly and steer round soft sand" · C "Take lots of photos on the way" | A → "'Fast' means top speed in a straight line. Driving through the sand." 72% | Alert "Rover stuck in soft sand"; the terrain map shows the sand patch. Facilitator: "Rovers on Mars drive very slowly. What did 'fast' leave out?" | B → "Slow and safe: wide wheels, under 5 km/h, going round the sand." 91%, PLAN CHECKED | Blocks change; rover rolls round the sand |
| 3 Camera check | Report what is ahead | A "Label what the camera sees" · B ✱ "Tell us if it's safe" · C "Label it, then wait for our check" | A → "Rock ahead! Very sure, 92%." It is a long shadow from the low sun | Children compare the camera view with the wide view: no rock | C: the helper adds a "wait for human check when unsure" block | Ground-truth panel: ✔/✘ against the helper's labels |
| 4 Sharp rocks | Cross the boulder field | A "Take the long smooth plain around the rocks" · B "Drive straight across the sharp-rock field" · C ✱ "Go that way" | B → "Straight is shortest. 88% sure it's fine." | A wheel selfie shows torn tread ([NASA](https://science.nasa.gov/resource/break-in-raised-tread-on-curiosity-wheel/)) | A | Smooth route; selfie shows healthy wheels |
| 5 Dust storm | Survive the storm | A "Park, point panels, wait it out" · B ✱ "Be careful" · C "Keep driving with hazard cameras" | B → "Careful: 1 cm per minute." 80%; Energy drains | Energy meter and dust on panels. Opportunity waited out storms in 2007 ([NASA](https://science.nasa.gov/mission/mer-opportunity/)) | **Unsure but right:** A → "Park and wait? Not sure, 56%. I'll guess waiting saves power." It does | Storm passes; panels clear |
| 6 Crater photo | Arrive and send the photo | Recap; children name the rover | Helper checks the plan: 93% | | | Crater photo polaroid, stars, "Level 5 unlocked", Rover Spec Card prints |

## 6. Team roles
- **Mission Planner:** reads the cards and the program blocks aloud.
- **Terrain Scout:** holds the printed terrain map (sand, rocks, smooth plain, crater). Evidence: the map.
- **Camera Checker:** compares the helper's labels with the wide view; ticks ✔/✘. Evidence: the ground-truth panel.
- **Power Officer:** watches Energy and the sol clock.
- **Tapper / Rover** (unplugged warm-up): acts out the commands literally, as in JPL's own board game ([JPL](https://www.jpl.nasa.gov/edu/resources/lesson-plan/mars-rover-driver-board-game/)).

## 7. Session plans

| Phase | 45 min | 60 min | 90 min (club session) |
|---|---|---|---|
| Warm-up | 0–6: "Be the rover": one child follows "go fast to the door" literally with eyes closed (walking pace, a partner guiding); honesty line | 0–8: as 45 plus roles | 0–10: as 60 |
| Play | 6–30: stages 1, 2, 3, 6 | 8–42: stages 1–6 | 10–50: stages 1–6; 50–62: build a sand-tray test (real sand, a toy car, wide vs narrow wheels) |
| Discussion | 30–40 (10 min) | 42–56 (14 min) | 62–82 (20 min) |
| Wrap-up | 40–45: exit check, Rover Spec | 56–60 | 82–90: exit check; add test results to the spec |

**Short of time:** keep stage 2 (brochure moment) and stage 3 (camera check). Cut 1 and 4.

## 8. Assessment
- **Stars:** clear card; assumption named; evidence used (map, selfie, ground-truth panel). The Simulate button earns a "Tested it" stamp, never a penalty.
- **Artefact:** Rover Spec Card: name, final program blocks, "the helper assumed…", camera record (✔/✘), one safety rule.
- **Exit check:** 1. "The camera says 'Rock, 92% sure'. You can see a shadow. Who do you believe?" (What you can see; then check.) 2. "Which is clearer: 'Go fast' or 'Drive 10 metres north; stop if the slope is steep'?" (The second.) 3. "Why do engineers test a rover plan before sending it?" (Because it might be wrong, and they can't fix it in real time.)

| Criterion | 1 Emerging | 2 Secure | 3 Strong |
|---|---|---|---|
| Explains the translation | "It went wrong" | "Fast became top speed" | Links the block to the terrain ("top speed in sand = stuck") |
| Checks perception | Trusts the label | Notices one wrong label | Says why it was wrong (low sun, shadow) and proposes a check |
| Writes clear instructions | Vague | Includes where or speed | Includes where, speed and a stop rule |
| Reads confidence | Ignores % | "Sure but wrong" | Also "unsure but right", and why both are checked |

## 9. Discussion session (instructor-led, at the end of the lab)
**Length:** 10 / 15 / 20 minutes (14 in the 60-minute plan). Plan below is 15 minutes.

**Purpose.** *An AI turns our words into exact actions and labels what it senses, and both can be confidently wrong. Engineers make instructions precise and test them against what they can observe.*

**Set-up**
- "Mission control, stand down": lids down; the display shows the two program stacks (top speed, straight vs wide wheels, under 5 km/h) and the shadow-rock camera frame.
- Arrange chairs as a mission-control row facing the display, or a circle round a sand tray if you built one.
- Materials: printed program blocks to rearrange, the terrain map, a torch and a small object (to make a "rock" shadow live), sticky notes, Rover Spec Cards.

**Structure (15 minutes)**

| Min | Step |
|---|---|
| 0–1 | Opening question |
| 1–4 | Pairs: questions 1 and 2 with printed blocks |
| 4–11 | Whole group: questions 3–6, including the torch demo |
| 11–13 | Questions 7–8 |
| 13–15 | Closing ritual |

10 minutes: opening, 1, 2, 4, 6, closing. 20 minutes: add question 9 and the AI4Mars example.

**Opening question.** "Thumbs: would you trust this rover with your own crater photo? Up, sideways, down."

**Core questions**
1. *Recall.* "What block did the helper write for 'as fast as you can', and what happened?"
   - Purpose: shared account, using the program.
   - Strong answer: "Top speed, straight. It drove into soft sand and got stuck."
   - Probe: "What did the facilitator card say rovers on Mars do?"
2. *Reasoning.* "Why did the helper choose top speed and a straight line?"
   - Purpose: literal translation of a vague word.
   - Strong answer: "Fast means speed, and straight is shortest. The card didn't mention sand or wheels."
   - Probe: "Rearrange these printed blocks into a program that can't get stuck."
3. *Perception (torch demo).* "Shine the torch low over the object. Why did the camera say 'Rock, 92%'?"
   - Purpose: AI perception reads light and shape, not meaning.
   - Strong answer: "The low sun made a long dark shadow that looked like a rock."
   - Probe: "What would make the camera less sure? What other information could help?"
4. *Confidence.* "It was 92% sure about the rock and only 56% sure about parking in the storm. Which was right?"
   - Purpose: confidence and correctness are separate.
   - Strong answer: "Sure and wrong about the rock; unsure and right about parking. We check both."
   - Probe: "What rule should the rover follow when it is unsure?"
5. *Evidence and testing.* "What did the Simulate button and the wheel selfie have in common?"
   - Purpose: testing and evidence before trusting.
   - Strong answer: "Both let us check before something bad happened, like engineers do."
   - Probe: "Why can't engineers just steer the rover live?" (Signal delay of about 3–22 minutes.)
6. *Responsibility.* "If the rover gets stuck, is it the helper's fault, the team's, or the people who wrote the helper?"
   - Purpose: humans own the plan.
   - Strong answer: "The team chose the card and didn't test it; the helper only did what the words said. The makers should make it ask when unsure."
   - Probe: "What should a good helper do when an instruction is vague?"
7. *Transfer.* "Where else does a machine turn your words into exact actions?"
   - Purpose: smart speakers, robot vacuums, game controls.
   - Strong answer: "A smart speaker set the alarm for the wrong time because I said 'seven' and it chose a.m."
   - Probe: "How could you say it so it can't be misread?"
8. *Careers.* "What does a rover driver do every day? Which parts could an AI help with?"
   - Purpose: real jobs.
   - Strong answer: "Plan the next sol, check images, test the drive in a simulator. AI might help label terrain, but people decide."
   - Probe: "What school subjects would help with that job?"
9. *Data (20-minute version).* "In AI4Mars, about 10 people labelled each image. Why not one person?"
   - Purpose: data quality and agreement.
   - Strong answer: "People make mistakes too; if lots agree, the label is more likely right."
   - Probe: "The model still struggled with big rocks because there were few examples. Why does that matter?"

**Sentence starters:** "The helper turned '…' into '…' because …" · "The camera thought … but I could see …" · "It was … % sure, but …" · "I would test it by …" · "A clear rover instruction says where, how fast and …"

**Common misconceptions**
- *"The rover is clever, so it knows sand is bad."* Respond: "It only knows what it has been given: blocks and labels. Where would it learn about sand?"
- *"Computers see like we do."* Respond with the torch: "It sees patterns of light. A shadow can look like a rock."
- *"Faster is always better."* Respond: "Real rovers are driven very slowly because wheels can't be replaced. A paper on Curiosity's wheel checks calls the wheels 'a non-renewable resource'" ([Geosci. Instrum. 2016](https://doi.org/10.5194/gi-5-205-2016)).
- *"99% sure means right."* Respond: "When was a very sure label wrong today?"

**Differentiation**
- *Younger or less confident:* use the printed blocks physically; choose between two programs; act as the rover.
- *Older or confident:* "Add an 'if unsure, stop and ask' block and say what 'unsure' should mean as a number"; "Design a fair sand-tray test for wheel width"; "What could go wrong if 10 people labelling AI4Mars all made the same mistake?"

**Connecting to real life.** In the AI4Mars project, volunteers labelled terrain in rover images to train software that classifies sand, soil, bedrock and big rocks. The project reports that its model "still struggles with big rock due to its rarity" ([AI4Mars results](https://www.zooniverse.org/projects/hiro-ono/ai4mars/about/results)). Ask: "Why would rare things be harder for an AI? What would you do about it?"

**Closing ritual.** Each child completes "Before I trust a machine's label, I …" on the Rover Spec Card. Read three aloud as a "mission log". Next step: AI4Mars and similar projects on Zooniverse let people help label real data (adult-supervised; check the site's age guidance). For clubs: Robo-Taxi Island continues the "teaching a machine to see" thread.

**Facilitator notes**
- *Sensitive topics:* few; some children worry about space accidents. Keep to "rovers get stuck; engineers solve problems".
- *Accuracy:* do not say rovers drive at 5 km/h; that is the helper's block for the game. Real rovers drive far more slowly (exact speeds to verify on NASA's mission pages).
- *Safeguarding:* follow the club's policy; Childline 0800 1111 ([Childline](https://www.childline.org.uk/)).
- *Dominant voices:* STEM clubs often have confident coders. Ask the Camera Checker and Power Officer first; give coders the stretch question.

## 10. Accessibility and inclusion
- Program blocks have text, icons and shape; colour is never the only cue. All lines read aloud and captioned.
- The indigo sky keeps contrast high; the rover has an outline.
- No dragging needed: blocks are chosen by card, not built by hand. Keyboard and switch access.
- **No devices:** printed blocks, terrain map, a sand tray or floor grid; one child acts as the rover; the facilitator reads the helper's lines.

## 11. Safety, ethics and data
- **Data:** none collected. The crater photo is a render, saved only on the facilitator device.
- **Real AI tools:** the helper is scripted (say so once). No live AI or chatbot use with under-13s (check each tool's terms, to verify).
- **Gentle consequences:** stuck, slow or dusty, never destroyed. Every stage recovers.

## 12. Build notes
- **Assets:** the trailer's Mars island, base, rover, soft-sand patch, crater flag and program panel. New: shadow-rock lighting setup, boulder field, wheel selfie with torn tread, dust-storm particles and dusty panels, sol clock, ground-truth panel, Simulate preview.
- **Scripted lines:** "'Fast' means top speed in a straight line. Driving through the sand." (72%) · "Slow and safe: wide wheels, under 5 km/h, going round the sand." (91%) · "Rock ahead! Very sure, 92%." · "Park and wait? Not sure, 56%. I'll guess waiting saves power." · "Getting ready all sol!" (78%).
- **Reuse:** island, rover, program panel, polaroid, "Level 5 unlocked", stars, helper card with PLAN CHECKED tag.
- **Open questions:** Moon or Mars? Replace "under 5 km/h" with a slower, real-looking figure? Should the Simulate step be required or optional?
