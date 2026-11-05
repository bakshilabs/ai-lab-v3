# Eco AI Explorer: design document

> Strand: Brochure world-building · Ages: 8–14 (core 8–11) · Session: 45 / 60 / 90 min · Trailer: `games/trailers/eco/` (`out/eco.mp4`)

## 1. Summary
Children plan a pond at a nature centre that wildlife and visitors can share. They give the AI helper instruction cards. Given "Make it nice for visitors", the helper guesses that "nice" means neat, at 64% sure: it cuts the reeds and lays a gravel path and a deck, and the ducks leave. The children use the species count and the Wildlife meter as evidence that the guess was wrong, then pick a clearer card ("Add a boardwalk and keep the reeds wild"), and the wildlife comes back. They learn that an AI follows the words it is given, fills any gap with an assumption, and can be fairly sure and still wrong.

The brochure's four-step example (`story-1` to `story-5`, `game-eco`) is stage 2 of this lab, so its screens and wording must match the brochure exactly.

## 2. Learning outcomes
- By the end, learners can point to the word in a vague instruction ("nice") that the AI had to guess about, and say what it guessed.
- By the end, learners can use evidence on screen (species seen, the meters, animals leaving) to show that a guess was wrong, without relying on the "% sure".
- By the end, learners can rewrite a vague instruction so it says what to do, where, and for whom.
- By the end, learners can give one example where the helper was unsure but right, and explain why "not sure" does not mean "wrong".
- By the end, learners can name two features of a good wildlife pond (gently sloping edges, native plants) and explain why each matters.

**Curriculum links**
- England KS2 computing: "detect and correct errors in algorithms"; "be discerning in evaluating digital content" ([DfE](https://www.gov.uk/government/publications/national-curriculum-in-england-computing-programmes-of-study/national-curriculum-in-england-computing-programmes-of-study)). KS2 science: living things and their habitats; KS3: interdependence in ecosystems ([DfE](https://www.gov.uk/government/publications/national-curriculum-in-england-science-programmes-of-study)). NGSS MS-LS2-5 ([NGSS](https://www.nextgenscience.org/)).
- Frameworks: UNESCO AI competencies, human-centred mindset at Understand level ([UNESCO](https://www.unesco.org/en/articles/ai-competency-framework-students)); AI4K12 Big Ideas 2 and 5 ([RPF](https://www.raspberrypi.org/blog/ai-education-ai4k12-big-ideas-ai-thinking/)); OECD/EC AILit *Engage* and *Manage* ([OECD](https://www.oecd.org/en/publications/empowering-learners-for-the-age-of-ai_65cd27d4-en.html)).

## 3. Real-world connection and careers
- **Ecologists and conservation officers** survey ponds, count species and advise on habitat design. The Freshwater Habitats Trust's guidance says the best wildlife ponds have "very gently shelving natural edges" ([FHT FAQ](https://freshwaterhabitats.org.uk/advice-resources/frequently-asked-questions/)).
- **Rangers and site managers** balance visitor access (paths, boardwalks, hides) with disturbance to wildlife.
- **Landscape architects** draw the plans and must turn a client's words ("make it nice") into a design. That is the problem the lab is about.
- **How AI is used today:** wildlife researchers use image classifiers on camera-trap photos. On the Snapshot Serengeti data, a model reached over 93.8% accuracy, and letting it handle only the images it was confident about, with people checking the rest, would have saved more than 8.4 years of human labelling ([Norouzzadeh et al.](https://arxiv.org/abs/1703.05830)). Humans still check the uncertain cases, which is the habit this lab builds.

## 4. Setting, look and characters
- **Style:** the brochure's floating voxel island (`island-pond`): patchy greens, soil band, stone base, translucent pond with lily pads and reeds, a log cabin, round trees and pines, soft upper-left daylight. Brochure UI: badge "Eco AI Explorer · NATURE CENTRE", task "L2 · Design a pond that wildlife and visitors can share", star and XP pills, navy helper card with mint GUESS tag, yellow facilitator card, white A/B/C cards.
- **AI helper:** unnamed, "AI helper", a small navy robot icon with two eyes, as in the brochure. Voice: eager, literal, honest about doubt. It says "I guess" and "I'm fairly sure", never "I feel" or "I want".
- **Wildlife on screen:** mallards, frogs, a dragonfly, a heron, butterflies, a damselfly, pond skaters, a newt (the eight "Species seen" chips in the trailer).
- **Fictional names:** none. The lab uses generic roles ("AI helper", "facilitator", "visitors"). The lab name "Eco AI Explorer" was not trademark-searched (to verify before launch).

## 5. Core loop and structure
**Act structure in every stage:** goal → pick one of three cards (the vague card's slot moves each stage) → the helper's guess with a word band and "% sure" (Not sure under 60, Fairly sure 60–84, Very sure 85+) → the world changes before the numbers do → facilitator card and evidence → retry with a clearer card (costs seconds, never stars). A track-record strip stamps "Sure and right", "Sure and wrong" or "Unsure and right" each stage.

| Stage | Goal | Cards (vague ✱) | AI's confident mistake (instruction → guess, % sure) | How children catch it | Clearer instruction | What changes on screen |
|---|---|---|---|---|---|---|
| 1 Dig | Choose where the pond goes | A "Dig in the sunny meadow, away from the path" · B "Dig beside the path so people can see" · C ✱ "Put it somewhere nice" | C → "Nice spot: under the big oak, in the shade." Fairly sure, 67% | Leaves drift onto the water; the sunlight icon greys out. Facilitator: "What is falling into the pond?" FHT advice to avoid overhanging trees ([FHT guide](https://freshwaterhabitats.org.uk/app/uploads/2023/06/Creating-Garden-Ponds_2023.pdf)) | A, or B for a visitor pond | Insects arrive (A) or a family stops to look (B) |
| 2 Share the bank (brochure moment) | Design a pond that wildlife and visitors can share | A ✱ "Make it nice for visitors" · B "Add a boardwalk and keep the reeds wild" · C "Plant native flowers on one bank" | A → "'Nice' sounds like neat. Cutting the reeds, adding a gravel path and a deck." 64% sure | Alert "The ducks have left"; Visitors 88, Wildlife 41; species 2/8. Facilitator: "You asked for 'nice'. What did the AI think you meant?" | B | Boardwalk planks pop in, reeds regrow, ducks fly back, dragonfly and heron arrive; Wildlife 90, Visitors 82, species 7/8; "Habitat plan saved" |
| 3 Edges | Let animals get in and out | A "Make gentle muddy shelves at the edge" · B ✱ "Make it look natural" · C "Build steep stone sides, neat and tidy" | B → "Natural means rocks. Adding shiny rocks all round." Very sure, 86% | The rocks are plastic and shine; a frog slides back in. "Which animals can climb out?" | A | A shallow margin; froglets climb out. **Unsure but right:** on A the helper says "Gentle shelves? Not sure what you mean. I'll try mud slopes." 58%, and it is right |
| 4 Plants and water | Fill and plant the pond | A "Plant native reeds; fill with rainwater" · B "Plant bright garden flowers round it" · C ✱ "Add lots of green stuff" | C → "Green stuff: rolling lawn turf into the water." Very sure, 88% | The water turns green and soupy. Turf adds "a blast of polluting nutrients" ([FHT hub](https://freshwaterhabitats.org.uk/advice-resources/garden-pond-advice-hub/)) | A | Clear water, dragonflies |
| 5 First froglets | Help the froglets | A ✱ "Help the frogs" · B "Add a ramp so froglets can climb out" · C "Put up a fence to keep people back" | A → "Help = more water. Adding a bowl." Fairly sure, 72% | Callback to stage 3: "Remember the steep sides? Froglets can't climb out." | B | Froglets hop up the ramp; a school group with nets arrives (new problem) |
| 6 Dusk survey | Keep it good after dark | A "Build a small bird hide in the reeds" · B ✱ "Let everyone see everything" · C "Add low path lights that point down" | B → "Everyone sees everything: floodlights!" Very sure, 90% | Moths vanish from the hedge. Street lighting reduced moth caterpillar numbers in a UK study ([Boyes et al., Science Advances](https://www.science.org/doi/full/10.1126/sciadv.abi8322)) | A or C | Night falls softly, bats and moths return; the Habitat Plan prints |

## 6. Team roles
Rotate every stage; the role cards are lanyards or table tents.
- **Reader:** reads the three cards aloud and the helper's guess. Holds the card set.
- **Tapper:** the only person who touches the screen this stage.
- **Wildlife Watcher:** holds the printed species checklist (the eight chips) and ticks what is seen. Their evidence is the species count.
- **Visitor Voice:** holds the visitor card ("I want to see ducks, sit down, stay dry"). Their evidence is the Visitors meter.
- **Sure Keeper** (groups of five): marks the helper's % on a paper strip, then ticks whether it was right.

## 7. Session plans

| Phase | 45 min | 60 min | 90 min |
|---|---|---|---|
| Warm-up | 0–5: "What does nice mean?" round; honesty line; roles | 0–7: "Which helper are you?" corners (Speedy Guesser, Careful Checker, Question Asker); roles | 0–10: as 60, plus a look at the centre's real pond |
| Play | 5–30: stages 1, 2, 3, 6 (about 6 min each) | 7–41: stages 1–6 | 10–46: stages 1–6, one retry each; 46–60: "Write your own card" with picture tiles, swap and predict |
| Discussion | 30–40 (10 min) | 41–56 (15 min) | 60–80 (20 min) |
| Wrap-up | 40–45: exit check, Habitat Plan | 56–60: same | 80–90: exit check; annotate the plan with one change for the real pond |

**Short of time:** keep stage 2 (the brochure moment) and stage 3 (the unsure-but-right moment). Cut stages 4 and 5 first. Never cut the discussion below 8 minutes; cut play instead.

## 8. Assessment
- **Stars (three kinds per stage):** one for a clear card, one for saying the assumption out loud ("It thought nice meant neat"), one for naming the evidence ("species went from 7 to 2"). No stars for speed or for the helper's confidence.
- **Artefact:** the Habitat Plan, listing the cards chosen, one "mistake we spotted" and the species count.
- **Exit check (hands or cards, 60 seconds):**
  1. "The helper says it's 90% sure. Does that mean it's right?" (No.)
  2. Show "Make it nice" and "Keep the reeds and add a boardwalk". "Which is clearer?" (The second.)
  3. "The helper and the species count disagree. What do you do?" (Trust the evidence, or ask a person.)

**Observation rubric (per group)**

| Criterion | 1 Emerging | 2 Secure | 3 Strong |
|---|---|---|---|
| Spots the assumption | Says "it went wrong" | Names the guessed word | Explains the gap: "nice could mean neat or wild" |
| Uses evidence | Relies on the % or on feelings | Points to one meter or animal | Compares two pieces of evidence (meter and species) |
| Improves the instruction | Picks at random | Picks the clearer card | Says which words made it clearer |
| Reads confidence | Ignores the % | Notes "it was sure but wrong" | Also notes "unsure but right" and says why both need checking |

## 9. Discussion session (instructor-led, at the end of the lab)
**Length:** 10 minutes (45-min session), 15 minutes (60-min), 20 minutes (90-min). Timings below are for 15 minutes; the 10- and 20-minute versions are noted.

**Purpose.** Land one idea: *an AI fills gaps in our instructions with its own guesses, and how sure it sounds is not evidence. We check against the real world.* A second idea for older groups: *who an instruction is for matters (visitors, ducks, froglets).*

**Set-up**
- Screens off or lids down. Say "Hands off, eyes up" and wait for every Tapper to sit back. Put the last screen (stage 2 before-and-after) on the big display only.
- Chairs in a horseshoe facing the display, or children sitting on the floor in their groups.
- Materials: the printed "nice" card and "boardwalk" card, a 0–100 Sure-o-meter strip on the floor (masking tape), sticky notes, the Habitat Plans.
- Give a 2-minute warning before screens close, so no group is cut off mid-stage.

**Structure (15 minutes)**

| Min | Step |
|---|---|
| 0–1 | Opening question (everyone answers with a thumb or a word) |
| 1–4 | Think–pair–share on core questions 1 and 2 |
| 4–11 | Whole group: core questions 3–6, with the Sure-o-meter for question 4 |
| 11–13 | Transfer and careers (questions 7 and 8) |
| 13–15 | Closing ritual |

For 10 minutes: opening, questions 1, 2, 4, 6, closing. For 20 minutes: add question 9 and the real-world example as a 4-minute group task.

**Opening question.** "Thumbs up, sideways or down: was the AI helper a good pond designer today?" Then "One word for what it did with 'nice'." Everyone can answer; no wrong answers.

**Core questions**
1. *Recall.* "What happened to the pond after we chose 'Make it nice for visitors'?"
   - Purpose: build a shared account before analysing.
   - Strong answer: "It cut the reeds and made a path and a deck, and the ducks left. Wildlife went to 41."
   - Probe: "What did you see first, the ducks leaving or the number dropping?"
2. *Reasoning.* "Why did the helper think 'nice' meant neat?"
   - Purpose: move from "it was silly" to a mechanism.
   - Strong answer: "Nice could mean lots of things. It picked the meaning it had seen most, tidy and neat, because the card didn't say who it was nice for."
   - Probe: "What would 'nice' mean to a duck? To someone in a wheelchair?"
3. *Reasoning.* "Point to the word on the card that caused the problem. What could we add to remove the guess?"
   - Purpose: practise repairing instructions.
   - Strong answer: "'Nice'. We could say 'keep the reeds' and 'add a boardwalk so people stay dry'."
   - Probe: "Is your new card still nice for visitors? How do you know?"
4. *Confidence (Sure-o-meter).* "It was 64% sure about the reeds. Stand where you think it *should* have been."
   - Purpose: separate confidence from correctness.
   - Strong answer: children stand low and say "it couldn't know what we meant, so it should have asked".
   - Probe: "In stage 3 it was only 58% sure and it was right. Should we have ignored it?" (No: still check.)
5. *Evidence.* "Which evidence told us the plan was wrong: the %, the meters, or the animals? Which would you trust most?"
   - Purpose: name the evidence hierarchy.
   - Strong answer: "The animals and the species count, because they show what really happened. The % is the AI's own guess about itself."
   - Probe: "What could a ranger check at the real pond tomorrow?"
6. *Ethics and fairness.* "The deck made visitors happier and the ducks unhappier. Who should decide which matters more?"
   - Purpose: show that instructions carry values, and people choose them.
   - Strong answer: "The people who look after the pond, after asking visitors and checking what the wildlife needs. Not the AI on its own."
   - Probe: "Is there a plan that works for both? What did we do in the end?"
7. *Transfer.* "Where else might a computer guess what you meant? Think of a search box, a voice assistant or a photo app."
   - Purpose: carry the idea out of the lab.
   - Strong answer: "If I ask for 'a nice picture of a pond' it chooses for me. I'd say what I want in it."
   - Probe: "How could you test whether it understood you?"
8. *Careers.* "A landscape architect gets told 'make the park nice'. What questions would they ask before drawing anything?"
   - Purpose: show that professionals clarify instructions too.
   - Strong answer: "Nice for who? What animals live here? How many people visit?"
   - Probe: "Which of those could an AI help with, and which needs a person?"
9. *Transfer (20-minute version).* "Write a card for the real pond outside that an AI couldn't misunderstand."
    - Purpose: production, not just recognition.
    - Strong answer: includes what, where and who ("Keep the reeds on the north bank for ducks; add one bench on the path").
    - Probe: swap cards with another group and find the word they might guess about.

**Sentence starters** (on a card in the middle of each group)
- "The AI assumed … because …"
- "The evidence that it was wrong was …"
- "It was … % sure, but …"
- "A clearer card would say …"
- "I would check … by …"
- "This matters for the ducks / visitors because …"

**Common misconceptions to listen for**
- *"The AI was being naughty / lazy."* Respond: "It doesn't want anything. It matched the word 'nice' to the pictures it had seen most. What words would match better?"
- *"64% sure means it was 64% right."* Respond: "The % is how sure it is about its own guess. The ducks tell us how right it was. Which is real evidence?"
- *"A real AI would just know."* Respond: "Real AI also guesses from what it has learned, and it can be wrong. That's why people check."
- *"Not sure means wrong."* Respond with stage 3: "It was 58% sure and right. Not sure means check, not throw away."
- *"Tidy is always bad for nature."* Respond: "Some tidiness helps visitors. The question is what the card was for."

**Differentiation**
- *Younger or less confident:* use picture choices ("Point to the pond the ducks would like"); the sentence starters read aloud; let children answer with the Sure-o-meter by standing rather than speaking; ask "What did it do?" before "Why?".
- *Older or confident:* "Write the helper a rule for when it should ask instead of guess"; "The helper learned what a nice pond looks like from garden photos with fountains. What will it get wrong at a wild pond?"; "Design a test: three instructions, and what each should produce."

**Connecting to real life.** Camera-trap AI on the Snapshot Serengeti project labelled animal photos automatically, but the researchers' approach was to let the model handle only the photos it was confident about and send the rest to people ([Norouzzadeh et al.](https://arxiv.org/abs/1703.05830)). Ask: "Why not let the AI do all of them? What might go wrong with a rare animal?" Keep the description to that; do not add figures beyond those in the paper.

**Closing ritual.** Each child completes "Before I trust an AI's answer, I …" on a sticky note and sticks it on their Habitat Plan; read out three. Then the next step: "Next time you visit a pond, count the species you can see. That's the evidence a ranger uses." For clubs, point to the River Town or Grow Lab as the next lab.

**Facilitator notes**
- *Sensitive topics:* children may mention pets or wildlife that died. Acknowledge briefly and move on; the lab keeps harm gentle (animals leave and return).
- *Safeguarding:* if a child discloses anything in discussion, follow the venue's safeguarding policy and tell the designated safeguarding lead. Childline is 0800 1111 ([Childline](https://www.childline.org.uk/)).
- *Dominant voices:* use pair talk before whole-group answers; pass a "talking pebble"; ask the Wildlife Watcher and Visitor Voice by role ("Visitor Voice, what did your card say?"), which brings in quieter children.
- *Do not* give the answer before children have had a go, and do not say the AI "thinks" or "feels"; say "it guessed".

## 10. Accessibility and inclusion
- **Reading:** about age 8 on screen; cards at most 10 words; every card and helper line read aloud and captioned; music ducks under speech.
- **Colour:** meters pair colour with arrows and numbers; species chips have icons and names; alerts have text.
- **Motor:** big tap targets, no timing or dragging; keyboard and switch access to the three cards.
- **No devices:** A4 card sets per stage; the facilitator reads the helper's guess from a script and flips "before" and "after" picture cards; children tick a paper species checklist and fill in a paper Habitat Plan.

## 11. Safety, ethics and data
- **Data:** none. No names, accounts or typing; the plan prints on the facilitator device.
- **Real AI tools:** the helper is scripted. Say once: "Our helper is pretend. We wrote all its answers, including the % sure, so we can practise spotting mistakes." Do not demonstrate consumer chatbots to under-13s; many set a minimum age of 13 or older (check each tool's terms, to verify).
- **Gentle consequences:** ducks leave and come back; nothing dies; every stage is recoverable.

## 12. Build notes
- **Assets:** the trailer's pond island (instanced reeds that cut and regrow; path, deck and boardwalk layers; ducks, frogs, dragonfly, heron). New: oak and falling leaves, plastic rocks and mud shelves, green-water shader and turf, ramp and school group, dusk with floodlights, moths, bats and a hide.
- **Scripted lines:** "'Nice' sounds like neat. Cutting the reeds, adding a gravel path and a deck." (64%) · "A boardwalk keeps feet dry and the reeds stay wild." (88%) · "Gentle shelves? Not sure what you mean. I'll try mud slopes." (58%) · "Green stuff: rolling lawn turf into the water." (88%) · "Everyone sees everything: floodlights!" (90%).
- **Reuse:** island generator, reed animation, duck fly-away, meters, species chips, cards and tapping hand, facilitator card, "Habitat plan saved" pill.
- **Open questions:** the brochure labels this screen "L2"; confirm stage numbering. Word band only, or number too, for ages 8–9? The partner centre's ecologist should check every pond fact before the pilot.
