# Eco Town: lab guide (companion to the design document)

> Strand: Client request · Ages: 8–14 · Session: 45 / 60 / 90 min · Trailer: `games/trailers/ecotown/` (`out/ecotown.mp4`)

**Read with:** [Eco Town: game design](DESIGN.md) (`games/ecotown/DESIGN.md`). That document holds the core loop, the six levels, the living town, the camera grammar and the town-flower scoring. This guide does not repeat it. It adds what a facilitator and a builder still need: learning outcomes, careers, roles, minute-by-minute session plans, assessment, a **discussion session for every level plus a final one**, accessibility, safety and build notes. Research behind both: `research/eco-town-world-building.md`, `research/eco-town-living-town.md`, `research/eco-town-cameras-acts.md`.

## 1. Summary
Children name their town, start with a small floating island (an old school, a dock and a beach) and build a whole sustainable town over six levels: where to build, how people move, what homes are made of, how food is grown, how water, power and waste work, and what the town heart becomes. At each level an AI planning helper turns their instruction into a "ghost" plan with a "% sure", and it is confidently wrong in a way the sky view hides: "Find the best land" becomes the flat floodplain (82% sure). Children catch each mistake by switching to a lens, the street view or the inside view, then give a clearer card ("Dry, sunny land. Keep the meadow wild."). Residents move in and live with the choices. Children learn that AI optimises one word, assumes the typical case, misses data and reads literally, and that checking from the ground fixes it.

## 2. Learning outcomes
- By the end, learners can name which of the AI's four habits (one word, typical case, missing data, literal reading) caused a given mistake.
- By the end, learners can choose the right view or lens to test an AI plan, and describe what it revealed.
- By the end, learners can rewrite a vague planning instruction to include what must be protected and how it will be checked.
- By the end, learners can explain a trade-off between two town needs (e.g. homes and nature, power and winter nights) using the town flower.
- By the end, learners can explain why the AI was sometimes *less* sure after a clearer instruction, and why that was honest.
- By the end (ages 11+), learners can explain how an AI summary of residents' views can be biased by who it counted.

**Curriculum and framework links**
- **KS2 computing:** "detect and correct errors in algorithms"; "be discerning in evaluating digital content" ([National Curriculum computing](https://www.gov.uk/government/publications/national-curriculum-in-england-computing-programmes-of-study/national-curriculum-in-england-computing-programmes-of-study)).
- **KS2/KS3 geography:** settlement, land use, rivers and flooding, human and physical interaction (to verify statement wording). **KS2/KS3 science:** habitats; energy resources (to verify). **KS3/KS4 citizenship and D&T:** planning decisions, sustainable design.
- **NGSS:** MS-ESS3-3 (design a method for minimising human impact on the environment); MS-LS2-5 (biodiversity design solutions); MS-ETS1-1 (criteria and constraints).
- **UN Sustainable Development Goal 11** (sustainable cities and communities; [UK SDG data](https://sdgdata.gov.uk/11)).
- **UNESCO AI Competency Framework** ([UNESCO](https://www.unesco.org/en/articles/ai-competency-framework-students)): human-centred mindset, ethics of AI. **AI4K12:** Big Ideas 2 and 5.

## 3. Real-world connection and careers
- **Town planners** place homes, schools and roads and check flood maps. **Architects** design warm, low-carbon homes. **Ecologists** survey habitats first. **Transport planners** design safe walking and cycling routes. **Energy engineers** plan for the worst days, not average ones. **Community engagement officers** ask residents what they need.
- **How professionals use AI:** planners and engineers use software and AI tools to model floods, traffic and energy demand, then check the results against site visits and local knowledge (to verify a named UK example before citing one).
- **Real places to mention:** Goldsmith Street in Norwich won the 2019 Stirling Prize; its terraces of very low-energy council homes push parking to the edges ([Architizer](https://architizer.com/blog/inspiration/stories/goldsmith-street-stirling-prize/)). At BedZED in London, monitoring found that recycling bins placed far from homes were used less ([Passive House Plus](https://passivehouseplus.co.uk/blogs/bedding-sustainability-into-british-buildings-bioregional-s-bedzed)).

## 4. Setting, look and characters
- **Visual style:** the brochure's floating voxel island (flat-colour blocks, soft upper-left light, rounded app UI, badge "Eco Town · SCHOOL CLUB · L1/6"). See DESIGN.md, "Camera grammar".
- **AI helper:** the **Planning Helper** named **Florence**, in the navy helper card with a mint "GUESS" tag, which becomes "PLAN CHECKED" after a fix. It says "I guess…" and "My plan…", never "I feel".
- **Residents:** tiny blocky families with a followed family who keeps a three-line diary (DESIGN.md, "The living town").
- **Fictional names (to check before release):** Eco Town, Florence, the followed family's surname, town titles (Cycle Town, Orchard Valley, Wild Garden Village, Market Town). Check that "Eco Town" isn't the name of a real development or organisation that would confuse partners (the UK government ran an "eco-towns" programme around 2007–2010: to verify).

## 5. Core loop and structure
**The game is free building with an AI Lab inside it** (Nov 2026 update). Players open straight onto the island and build; build categories unlock as the town grows (land and paths → homes → food → power and water → town heart). Florence gives short tips from the simulation and invites players into the **AI Lab** when their town hits a problem a mission teaches. Each of the six lessons is an AI Lab mission (Brief → Plan → Check → Fix → build film → reward), played on Florence's practice island; afterwards players choose whether to use her fixed plan in their own town, and the mission's lens becomes a tool they can use on their town. Details in DESIGN.md and the README ("How the game plays"). Summary of the mistakes:

| Level | Instruction → AI guess (% sure) | Caught by | Clearer card |
|---|---|---|---|
| 1. Read the land | "Find the best land" → flat floodplain (82%) | Flood lens | "Dry, sunny land. Keep the meadow wild." |
| 2. Getting around | "Easy for everyone to get to school" → wide road and drop-off car park (77%) | Street view at 8:45 am | "Safe walking and cycling routes. Cars stay at the edge." |
| 3. Homes | "Build strong homes" → concrete and steel (85%) | Carbon lens; inside view | "Warm, low-carbon homes from local timber and straw." |
| 4. Food | "Grow as much food as possible" → plough every field and hedge (79%) | Nature lens: bees and deer leave | "Enough food, and keep the hedges for the bees." |
| 5. Water, power, waste | "Make enough clean power" → solar roofs only, for an average day (90%) | Winter test: blackout | "Enough power for a still winter night. Store the sunshine." |
| 6. A school for everyone | "Put the school in the middle" → the middle of the island, far from the homes | Walking-time lens: over 15 min | "School within a 15-minute walk of every home." |

**"Unsure but right" moment (added):** in Level 5, after the clearer card, the helper says "Wind, battery and rain gardens. I haven't planned for winter before: 74% sure the lights stay on." The winter test passes. (The trailer shows 87% for this line; use the lower figure in the lab so the moment reads clearly.) DESIGN.md's rule that the AI is sometimes less sure after a clearer card is the basis.

**Residents' summary mistake (Level 6 optional):** "Residents want more car parks", 82% sure, because it counted only drivers. Children tally residents at the school gate.

## 6. Team roles
Rotate each level. Each role owns one lens or view, so every child has evidence the AI lacks.

| Role | Does | Holds |
|---|---|---|
| **Planner** | Reads cards, leads the choice, places the build | Card set and palette |
| **Nature Watcher** | Checks wildlife, hedges and the meadow | Nature lens; wildlife tally |
| **Street Walker** | Takes the street view and reports from child height | Street view; "What I saw" card |
| **Data Detective** | Opens the flood, carbon, energy or walking-time lens | Lens cards and the town flower sheet |
| **Resident Voice** | Speaks for the followed family; reads bubbles | Family portrait and diary |

## 7. Session plans
**Start every first session with Florence's intro (about 90 seconds).** It is the warm-up:
- Florence shows the meadow flooding and the dry slope. Pause on the meadow and ask "Why might flat land by a river be a bad place for homes?"
- Every child then places their first three tiles.
- The build video in the intro (and the ▶ on every build) shows how things are built from above and at street level. Use it before the homes and power missions: "What goes in before the walls? Why?"

The intro can be replayed from ☰, and skipped in later sessions.

**Choose "In order (class)" on the start screen** for a class: only the next AI Lab mission opens, and Florence invites players to it as soon as it is ready, so the class stays roughly together. Between missions, players build freely; that build time is where they grow the town enough to unlock the next mission (homes at 6 tiles of town land, food at 12 families, power at 24, town heart at 36). A useful rhythm is "mission, debrief, build" for each level below. If a group is slow to unlock the next mission, tell them to choose **Use Florence's plan** at the end of a mission: that adds her fixed plan to their town and moves them on. "Any order" suits clubs, museums and home play. With "In order (class)" the music starts **off** (sound effects stay on) so a room of devices stays calm; turn it on from ☰ → Sound → On if you like.

DESIGN.md says Levels 4 and 5 merge in shorter versions. Level debriefs (section 9A) happen inside the play time.

**45 minutes** (Levels 1, 2, 3, 4+5 merged, 6 short)

| Min | Activity |
|---|---|
| 0–4 | Warm-up: "Sky or street?": two photos of the same place from above and from the pavement; what can each see? Honesty line: "Florence is pretend. We wrote her plans." |
| 4–33 | Levels 1, 2, 3, 4+5 and 6 (about 6 minutes each, including a 1–2 minute level debrief) |
| 33–43 | Final discussion (10 min) |
| 43–45 | Exit check; town report (☰ → Town report) |

**60 minutes**

| Min | Activity |
|---|---|
| 0–5 | Warm-up and roles |
| 5–44 | Levels 1–6 (about 6.5 minutes each, 2-minute debriefs) |
| 44–57 | Final discussion (13 min) |
| 57–60 | Exit check; town report |

**90 minutes**

| Min | Activity |
|---|---|
| 0–7 | Warm-up and roles |
| 7–62 | Levels 1–6 (about 9 minutes each, 3-minute debriefs) |
| 62–68 | "Watch your town live": the full day sequence (DESIGN.md, Level 6) |
| 68–88 | Final discussion (20 min) |
| 88–90 | Exit check; town report |

**Short of time:** merge Levels 4 and 5, cut level debriefs to one question each, keep the Level 1 debrief in full and at least 10 minutes of final discussion.

## 8. Assessment
- **Stars** reward spotting and fixing the AI's mistakes, not how the town looks (DESIGN.md). Every level-complete card lists the three rules with ✓ or ☆:
  - **after a mistake:** ★ found it with the first check · ★ named Florence's habit first time · ★ the fixed plan passes;
  - **clear first time:** ★ clear instruction · ★ spotted Florence's **hidden guess** (what she still assumed, e.g. how much land 40 families need) · ★ the plan passed its check;
  - Level 6's bias check adds a bonus star.
  - **the plan missed something:** ★ checked the plan before building · ★ told Florence what her plan missed · ★ her new plan passes.
  - Missions can be replayed; the best run's stars count.
- **Checking:** after each check that shows no problem, children choose **Check another way** or **No problem found: use this plan**. Ask them to say what the check tested before they accept. If they accept too early, the game shows the problem before building, so nothing is lost.
- **Level 2, "everyone":** the step-free check follows the route to school and the ferry as a wheelchair user would. Ask: who else needs a step-free route? (buggies, older residents, a child with a broken leg.)
- **Level card wording:** "No problem found", "Florence misunderstood" or "The plan missed something", with a sentence saying what happened and which check caught it.
- **Which habit is right** depends on what Florence actually assumed in that plan. A wrong pick explains the habit and points back at her guess; after two wrong picks the game explains the answer and moves on.
- **Facilitator notes** (start screen or ☰) show a short prompt at every step of every level, in a yellow card at the top right.
- **Read aloud:** recorded voices (a British narrator; Florence has her own voice). It is on automatically for 8–12; 🔊 buttons replay any card in both versions.
- **Artefacts:** the town report (map, town flower, town title, the six mistakes caught) and the followed family's diary.
- **Exit check:**
  1. "An AI is told 'Find the best land' and picks the flattest field by the river. What did it miss?" (Flooding; it optimised one word.)
  2. "Which is clearer: 'Make enough clean power' or 'Enough power for a still winter night'?" (The second.)
  3. "The AI plan looks perfect from the sky. How would you check it?" (Look from the street, open a lens, ask residents.)
- **Facilitator observation rubric**

| Criterion | Emerging | Secure | Strong |
|---|---|---|---|
| Names the AI habit | "It got it wrong" | Names one habit | Matches the habit to the exact words of the card |
| Checks with views and lenses | Waits to be told | Opens a lens when prompted | Chooses the right view before the reveal |
| Weighs trade-offs | One need only | Two needs | Uses the town flower to balance three or more |
| Speaks for others | Own preference | Mentions residents or wildlife | Uses the family diary or tallies as evidence |

## 9. Discussion sessions (instructor-led)

### 9A. Level debriefs (1–3 minutes each, at Act 4 "Fix")
Run each one with the lens or view still on screen. Ask the first question every time; add the others when time allows.

**Level 1: Read the land**
- "What did 'best' mean to the AI?" Strong: "Flattest and easiest to build on." Probe: "What does 'best' mean to an otter? To a family in winter?"
- "What did the flood lens show that the sky view didn't?" Strong: "Blue under the homes: it floods in winter."
- Misconception: "The AI is stupid." → "It picked flat land for a reason. What information was it missing?"

**Level 2: Getting around**
- "Who was the plan easy for?" Strong: "Drivers. Children walking couldn't cross the big road." Probe: "What did you see from child height at 8:45?"
- "What does 'everyone' include?" Strong: "Children, wheelchair users, people without cars."
- Real place: Goldsmith Street, Norwich, keeps parking at the edges ([Architizer](https://architizer.com/blog/inspiration/stories/goldsmith-street-stirling-prize/)).

**Level 3: Homes**
- "'Strong' made the AI choose concrete. What else should a home be?" Strong: "Warm, low-carbon, healthy." Probe: "What did the inside view feel like with the heating off?"
- "Why does the carbon cloud matter if you can't see it day to day?"
- Misconception: "Wood homes fall down." → "Strong can come from good design. Which materials are strong *and* low-carbon?"

**Level 4: Food**
- "Most food possible: who paid?" Strong: "The bees and deer, because the hedges went." Probe: "What does 'enough' mean instead of 'most'?"
- "How would you know if there was enough food *and* enough nature?"

**Level 5: Water, power and waste**
- "Solar roofs worked on an average day. Why test a still winter night?" Strong: "That's when there's no sun and no wind, and people need heat and light most."
- Unsure but right: "The new plan was only 74% sure. Was that worse?" Strong: "No: it was honest about something it hadn't done before, and the test passed."
- Real place: BedZED found bins far from homes were used less ([Passive House Plus](https://passivehouseplus.co.uk/blogs/bedding-sustainability-into-british-buildings-bioregional-s-bedzed)). "Where would you put the bins?"

**Level 6: A school for everyone**
- "'The middle' of what?" Strong: "The AI used the middle of the island, but the homes aren't in the middle; the wetland is." Probe: "What should 'middle' mean for a school?"
- Optional: "The AI said residents want more car parks. Who did it count?" Strong: "Only drivers. We tallied the school gate and most walked."

### 9B. Final discussion session (end of the lab)
**Purpose:** an AI planner sees the town from the sky and follows our words. Real places are lived in at ground level. Good plans come from clear instructions, checking from many viewpoints and listening to everyone who lives there, including wildlife.

**Set-up**
- Bring the class back with the town's evening festival: play the Level 6 "night" shot, then "Lights out on Eco Town. Planners to the town hall." Screens off.
- Sit in a circle as a "town meeting". Put the printed town reports in the middle.
- Materials: town reports and diaries, the four-habit poster (one word · typical case · missing data · literal reading), lens cards, sticky notes, a large town flower drawing.
- Timing: 10 / 13 / 20 minutes.

**Structure (13-minute version)**

| Step | Minutes | What happens |
|---|---|---|
| Opening question | 1 | Round the circle |
| Think–pair–share | 3 | Core questions 1–2 |
| Whole group | 6 | Core questions 3–7 |
| Ethics and careers | 2 | Question 8 or 9 |
| Takeaway | 1 | Closing ritual |

**Opening question:** "In one word, what is your town called, and what are you proudest of?" (Every group has a town title, so everyone can answer.)

**Core questions**
1. **(Recall) "Which of the AI's six mistakes surprised you most?"**
   - Purpose: re-activate memories across levels.
   - Strong answer: "The school in the wetland. It looked like the middle from the sky."
   - Probe: "Which lens or view caught it?"
2. **(Reasoning) "Put each mistake under one of the four habits on the poster."**
   - Purpose: generalise from cases to patterns.
   - Strong answer: "'Most food' is one word. 'Average day' is typical case. 'Only drivers' is missing data. 'The middle' is literal reading."
   - Probe: "Which habit came up most? Why might an AI do that?"
3. **(Reasoning: viewpoint) "Why did the AI's plans look good from the sky but fail on the street?"**
   - Purpose: name the limit of one viewpoint.
   - Strong answer: "From the sky you can't see children trying to cross, how cold a house is, or a winter night."
   - Probe: "Which view would you never skip again?"
4. **(Confidence) "The AI was 90% sure about solar roofs and wrong; 74% sure about the winter plan and right. What does that teach us?"**
   - Purpose: calibrate trust.
   - Strong answer: "Sure isn't right. A plan that has been tested on the hard case deserves more trust, even if the % is lower."
   - Probe: "What would make you trust a plan: the %, the test, or both?"
5. **(Evidence and voices) "How did the residents' bubbles and the family diary change your decisions?"**
   - Purpose: value lived experience as evidence.
   - Strong answer: "The diary said the walk to school was scary, so we added the cycle path."
   - Probe: "Whose voice was hardest to hear: the animals', the children's, or people without cars?"
6. **(Transfer) "Think of a real place near you. What would look fine from above but be hard at street level?"**
   - Purpose: apply to the local area.
   - Strong answer: "A road with no crossing near a park; a bus stop with no shelter."
   - Probe: "What would you tell a planner, and what evidence would you bring?"
7. **(Transfer: instructions) "Write one clearer instruction for a real AI planning tool for your school grounds."**
   - Purpose: produce, not just choose, a clear instruction.
   - Strong answer: "Add more trees for shade, but keep the football pitch and a path for wheelchairs."
   - Probe: "Which habit does your instruction protect against?"
8. **(Ethics and fairness) "Very different towns all won today. Who should decide what a real town needs: an AI, planners or residents?"**
   - Purpose: shared decision-making and the role of AI as a tool.
   - Strong answer: "Residents and planners together, using the AI to test ideas, but people decide."
   - Probe: "What if residents disagree, like drivers and walkers?"
9. **(Careers) "Which job from today would you like: planner, architect, ecologist, transport planner or energy engineer? What would you check first?"**
   - Purpose: link roles to real careers.
   - Strong answer: "Ecologist. I'd check where the animals live before anyone builds."
   - Probe: "Which team role today was most like that job?"

**Sentence starters**
- "The AI assumed… because it only…"
- "From the sky it looked… but from the street…"
- "That was the '…' habit because…"
- "I would check… by…"
- "Our town needs… and also…"

**Common misconceptions and responses**
- *"The AI is trying to ruin the town."* → "It followed our words. Which word did it take too far?"
- *"Eco means only solar panels."* → "Look at the flower: homes, food, nature, health, community, energy and carbon. Which petal did solar help?"
- *"High % means a good plan."* → "Solar roofs, 90%, blackout. Test the hard case first."
- *"The sky view shows everything."* → "Did the sky show how warm the timber home was inside?"
- *"There's one right town."* → "Every group's town is different and many passed. What made yours work?"

**Differentiation**
- **Younger or less confident:** use the lens cards as prompts ("Hold up the lens that caught the school"); pair answers; either/or questions ("Was it the flood or the bees?").
- **Stretch (11–14):** "Which of the four habits do humans also have?" "If an AI planner only had data from car journeys, what town would it build?" "How would you plan for a hotter climate?"

**Connecting to real life**
Goldsmith Street in Norwich is a street of about 100 council homes built to a very low-energy standard. It won the RIBA Stirling Prize in 2019, and its design keeps parking at the edges so the streets between homes are safer and greener ([Architizer](https://architizer.com/blog/inspiration/stories/goldsmith-street-stirling-prize/); [Dezeen](https://www.dezeen.com/2025/01/25/mikhail-riches-goldsmith-street-21st-century-architecture/amp/)). Ask: "Which of your Eco Town decisions match Goldsmith Street? Which would you want in your area?"

**Closing ritual**
- Each child adds a sticky note to the town flower: "One thing I'd always check before trusting an AI plan is…"
- Read the town titles aloud as a "town roll-call".
- **Next step:** take the town report home and walk your own street with an adult: what would you change, and how would you check it? In schools, use the report as a starter for a geography or citizenship project; clubs can try Island Park Tycoon next.

**Facilitator notes**
- **Sensitive topics:** flooding, cold homes and moving house can be real for some children (housing insecurity, flood-affected areas, fuel poverty). Keep consequences to the town; never ask children to describe their own homes; offer "a house in the town" rather than "your house".
- **Climate anxiety:** end with what people are doing (real places such as Goldsmith Street) rather than threats.
- **Safeguarding:** if a child discloses something about home (cold, unsafe, moving), acknowledge calmly and pass it to the venue's DSL; don't probe.
- **Dominant voices:** the town-meeting format uses a talking object; each role speaks for its evidence once before open discussion.

## 10. Accessibility and inclusion
- **Reading level:** cards under 12 words with icons; bubbles of 8 words or fewer, read aloud; all lines voiced and captioned.
- **Colour-blind-safe:** lenses use patterns as well as colour (flood waves, carbon dots, walking-time numbers); petals have icons and an "enough" line.
- **Motor-friendly:** large tap-to-place targets, remove anything at any time, no time limits (the town clock can be paused), street view on rails. Reduce motion and a mini-map (DESIGN.md).
- **No devices:** an A2 island map with acetate lens overlays, paper build tiles and a facilitator script of plans and outcomes.

## 11. Safety, ethics and data
- **Data collected:** none. No accounts, names (town titles only) or camera.
- **Age and real AI tools:** the helper is scripted. No live AI tools with children; staff note age limits if real tools come up (check each tool's terms; to verify).
- **Gentle consequences:** people queue, shiver or move away; nobody is harmed; no fail screen (DESIGN.md).
- **Accuracy:** every real-world environmental claim on screen (carbon, flooding, materials) needs a source or an expert check before release.

## 11A. Facilitator notes for the game build
- **Construction films.** Each film is a natural pause point. Ask: "Why does the frame go up before the walls? Why do pipes and wires go in before the walls close?" For 13–17: "Which step carries most of the carbon?" (Foundations and the frame for concrete; the walls store carbon for timber and straw.)
- **Free text (13–17).** Students type their own instructions. Florence highlights the words she picked up and explains her "% sure". Off-topic or unsafe text gets "I can't map that to a plan for this level." Nothing typed is stored or sent.
- **Final reflection (in the game).** After the sixth mission, each player finishes the sentence "Before I trust an AI plan, I…" by tapping the checks they will use or typing their own. The game reads the rule back and saves it in the town report. Use these rules to open the final discussion (9B): ask two or three players to read theirs and say which mission taught it.
- **Numbers in a brief (13–17).** If a student types a target ("at least 29 food units", "below 70 tonnes"), Florence plans for it, says it back ("Your target: ≥ 29 food units. Plan: 32 ✓ met") and the lens shows it next to the town's own need. Ask: "Is your target the same as what the town needs? Why might they differ?"
- **The charter.** Each promise shows two numbers: in Florence's plan, and in the player's own town. They can differ when the player kept their own town instead of using her plan. That gap is worth a question: "The plan keeps the promise. Does your town?"
- **Teach Florence (13–17, Level 6).** Let the group look at the training examples before they fix anything: "Who is missing from this data?" A strong answer: "Only people who drove to the car-park box." Then retrain with the school-gate comments, or with examples students write and label themselves, and compare the new summary.

## 12. Build notes
- **From DESIGN.md:** scenes, levels, cameras, the living town and scoring.
- **Additional assets:** acetate-style lens overlays for print; four-habit poster; level-debrief prompt cards for the facilitator device; town report and family diary templates; lens role cards.
- **Scripted AI responses (added):** "Wind, battery and rain gardens. I haven't planned for winter before: 74% sure." · "Residents want more car parks." (82%) · after-fix lines as in the trailer ("Town on the dry, sunny slope. Meadow and wood kept wild." 90%; "Cycle lanes and footpaths. Cars park at the edge." 88%; "Timber and straw homes, green roofs." 86%; "Orchard, allotments and hedges. The bees are back." 88%; "School next to the homes: an 8-minute walk." 92%).
- **Reuse from the trailer:** level badge and task bar, card sets, helper card with "PLAN CHECKED" tag, lens labels, alerts, "saved" pills, view switcher (Sky / Street / Inside), title card.
- **Open questions:** remove or source the trailer's "Carbon down 70%" figure; confirm the Level 5 confidence figure (74% vs the trailer's 87%); check the "Eco Town" name against the earlier government programme; get an ecologist and a planner to review the six levels.
