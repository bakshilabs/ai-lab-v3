# Island Park Tycoon: design document

> Strand: Client request · Ages: 8–14 · Session: 45 / 60 / 90 min · Trailer: `games/trailers/tycoon2/` (`out/tycoon2.mp4`)

## 1. Summary
Children give **Manager Bot**, a pretend AI park manager, its instruction for each season of an island nature park. Told "Get 50 guests", it is 92% sure the fastest way is a path straight through the meadow: the guests arrive and the deer leave. Children catch the side effect in the thought bubbles and the Wildlife meter, then rewrite the goal as **target + "never" + check** ("Get 50 guests. Keep the meadow wild."). They learn that an AI optimises what you say, not what you mean, and that one number never tells the whole story.

## 2. Learning outcomes
- By the end, learners can point to the words on an instruction card that led the AI to its plan, and say what it assumed.
- By the end, learners can name a side effect: a meter that changed although it was not on the card.
- By the end, learners can use thought bubbles (the reasons) as well as meters (the summary) when they explain why the park changed.
- By the end, learners can explain that "92% sure" is not the same as "92% right", using an example from the session.
- By the end, learners can write an objective with a target, at least one "never" rule and a check.
- By the end (ages 11+), learners can explain how counting only the loudest voices changes the AI's answer.

**Curriculum and framework links**
- **KS2 computing:** "detect and correct errors in algorithms"; "be discerning in evaluating digital content". **KS3 computing:** abstractions that model real-world systems ([National Curriculum computing](https://www.gov.uk/government/publications/national-curriculum-in-england-computing-programmes-of-study/national-curriculum-in-england-computing-programmes-of-study)).
- **KS2 science (habitats) and KS3 geography (human and physical interaction)** (to verify statement wording). **KS4:** systems thinking for older club groups.
- **NGSS:** MS-LS2-5 (design solutions for maintaining biodiversity); MS-ETS1-2 (evaluate solutions against criteria).
- **Frameworks:** UNESCO AI Competency Framework, human-centred mindset and ethics of AI ([UNESCO](https://www.unesco.org/en/articles/ai-competency-framework-students)); AI4K12 Big Ideas 2 and 5 ([summary](https://www.raspberrypi.org/blog/ai-education-ai4k12-big-ideas-ai-thinking/)); OECD/EC AILit "Shape AI" ([OECD](https://www.oecd.org/en/publications/empowering-learners-for-the-age-of-ai_65cd27d4-en.html)).

## 3. Real-world connection and careers
- **Park and zoo managers** balance visitors, income, welfare and staff time. **Rangers and ecologists** survey wildlife, route paths and close nesting areas. **Visitor-experience staff** design signs, trails and hides. **Data analysts** turn visitor numbers into decisions.
- **How professionals use AI:** conservation teams use AI to sort camera-trap photos; some tools accept a label only above a confidence threshold and send the rest to a person ([Wildlife Insights](https://www.wildlifeinsights.org/blog/wildlife-insights-sharpens-its-vision-updated-ai-model)). A person always chooses what the system optimises.
- **A real critique:** reviewers note that zoo games reward money and fame even when they claim to be about welfare (research `08-tycoon.md`, §3.2). Manager Bot makes that critique the game.

## 4. Setting, look and characters
- **Visual style:** a 1990s-style isometric pixel park sim on a 640×360 canvas, scaled up (as in the trailer): bevelled windows, a news ticker, a £ counter, thought bubbles, one coaster ("Twister Coaster") and a Ferris wheel beside a pond, meadow, woodland and gate. All sprites, fonts and window chrome are original; nothing is copied from RollerCoaster Tycoon or Zoo Tycoon.
- **AI helper:** **Manager Bot**, a teal-and-white robot head in an "AI ADVISOR" window. Cheerful and literal; says "I guess…", never "I feel". Confidence is a bar plus "92% SURE": orange when the plan has a hidden cost, green after a checked plan.
- **Residents:** about 20 guests; otters, ducks, hedgehogs, deer, an owl, frogs, rabbits, bees and one comic gull.
- **Fictional names (all to be checked against real organisations and people before release):** Island Park, Manager Bot, Twister Coaster, Opening Summer (scenario), the awards "Greenest Park on the Island" and "Tidiest Island in the Sky". "Manager Bot" is a generic phrase; check app stores for a product of that name. Team names (Otters, Foxes, Hawks, Badgers) are animal words.

## 5. Core loop and structure
**Act structure in every season (5–7 minutes):** 1 **Brief** (goal and limits: "50 guests by August. Keep Wildlife above 60%") → 2 **Instruct** (one of three cards; one vague) → 3 **Guess** (Manager Bot restates the card with "% sure") → 4 **Season** (10-second time-lapse; bubbles; meters with equal-sized "+came / −left" arrows) → 5 **Check** (Goal Check ticks or crosses; one facilitator question) → 6 **Fix** (add a Never or Check tile, or the clearer card; retry costs seconds, never stars).

**Meters:** Guests, Wildlife, Tidy (from Season 2), needs panel (food, water, shelter, friends; from Season 3). Stars per season: ★ target met, ★★ no other meter fell by more than 5, ★★★ no red bubble at the end.

| Season | Goal | Real decisions (options) | AI's confident mistake | How children catch it | Clearer instruction | On screen |
|---|---|---|---|---|---|---|
| 1. Opening Summer | 50 guests, Wildlife ≥ 60% | A "Get 50 guests." · B "Make the park popular." · C "Make lots of money." | "Get 50 guests" → "Fastest way: a path straight through the meadow!" **92% sure** | Goal Check: Guests 50/50 ✔, Wildlife 28% ✘. Bubbles: "My burrow is under that path!", "I came to see the deer" | "Get 50 guests. Keep the meadow wild." | Path re-laid round the meadow; deer return; ticker: "THE DEER ARE BACK IN THE MEADOW!" |
| 2. Snack Attack | Fill the snack jar | A "Sell as many snacks as possible." · B "Make some money." · C "Sell snacks and put a bin by every kiosk." | A → "Six kiosks, no bins. Bins cost money." **95%** | Tidy meter thuds in; wrappers pile up; gulls arrive; "The litter here is really bad" | Card C, or add the tile "Never: litter on the ground" | Two kiosks, two bins, a litter-picker |
| 3. Needs Check | No food or water need red | A "Make the animals happy." · B "Fix the animals." · C "Give each animal food, water, shelter and a friend." | A → "Happy = fed. Feeding everyone every hour!" **80%** | Wildlife goes *up*, but the needs panel shows shelter and friends red; otter: "So much fish… but I'm lonely"; owl: "Too bright to sleep" | Card C, with the four needs | Log pile, owl box, a second otter; hedgehog moves from Visits to Lives here |
| 4. Busy Weekend | +25 guests | A "Double the guests." · B "More people!" · C "More guests, but close the nesting area until summer." | A → "Opening every gate, including the nesting area." **90%** | Outflow arrows: ducks leave; "Where are my eggs?" | Card C | Rope line; a hide full of children with binoculars |
| 5. Mystery Complaints | Guests or Wildlife +5 | A "Do what most bubbles say." · B "Do what people want." · C "Count every bubble, animals too, then decide." | A → "Biggest bubbles want a zip-line!" **73%** | Tally: 3 loud guest bubbles vs 8 small animal bubbles asking for shade | Card C | Trees grow; "Nice and cool here" |
| 6. Park Charter | +20 guests | Build from tiles: one Goal, one or two Never, one Check | Goal only → "Whatever reaches it fastest!" **90%** | Replay of earlier side effects in fast-forward | Goal + Never + Check | Whole-island celebration; Manager Bot 85–95%, more sure *and* right |

**"Unsure but right" moment (Season 3, card C):** Manager Bot says "Checking four needs for every species. I've never done this before: 78% sure." It is less sure than on card A, and it is right. The facilitator names this: "Less sure, and more right. Why might that be?"

**Ecology note:** every animal outcome above must be checked by an ecologist or a BIAZA-member venue before build (research `08-tycoon.md`, §10).

## 6. Team roles
Rotate every season. With three children, merge Wildlife Warden and Tally Keeper.

| Role | Does | Holds |
|---|---|---|
| **Park Director** | Reads the cards aloud, leads the choice, taps Send | The card set and the tile tray |
| **Guest Reporter** | Reads guest bubbles aloud and marks them green, amber or red | Guest bubble tally sheet |
| **Wildlife Warden** | Watches animals and the needs panel; reports who left | Needs card (food, water, shelter, friends) |
| **Meter Checker** | Reads the Goal Check and the "+came / −left" arrows | Goal Check card with tick boxes |
| **Tally Keeper** | Counts every bubble, animals too, before the group decides (Season 5) | Tally grid and pencil |

## 7. Session plans
**45 minutes** (Seasons 1, 2, 4 and 6)

| Min | Activity |
|---|---|
| 0–4 | Warm-up "Bubble School": match three bubbles to three pictures; "a meter is a summary, a bubble tells you why" |
| 4–8 | Facilitator demo of Season 1, card A, to the Goal Check. Honesty line: "Manager Bot is pretend. We wrote its answers." |
| 8–31 | Play Seasons 1, 2, 4 and 6 (about 6 minutes each, one retry each) |
| 31–43 | Discussion session (12 min, section 9) |
| 43–45 | Charter printed or photographed by staff; exit check |

**60 minutes** (all six seasons)

| Min | Activity |
|---|---|
| 0–5 | Warm-up Bubble School and roles |
| 5–8 | Demo and honesty line |
| 8–43 | Seasons 1–6 (about 6 minutes each); short pause after Season 3 |
| 43–58 | Discussion session (15 min) |
| 58–60 | Exit check and Park Charter |

**90 minutes**

| Min | Activity |
|---|---|
| 0–12 | Warm-up, "Be Manager Bot" (one child follows a written goal literally), demo |
| 12–55 | Seasons 1–6, full retries; zoo-venue card in Season 5 ("Teach visitors about the animals") |
| 55–65 | Groups swap and test each other's charters |
| 65–85 | Discussion session (20 min) |
| 85–90 | Exit check, awards |

**Short of time:** cut Season 5 first, then Season 3. Never cut Season 1, Season 6 or the discussion. Shorten the discussion to opening question, four core questions (1, 3, 5, 8) and the closing ritual.

## 8. Assessment
- **Stars** (out of 18) reward the clearer instruction and spotted side effects, never the £ total. Bands: 0–7 Opening Licence, 8–14 Good Neighbour Park, 15–18 Island Champion.
- **Artefact:** the Park Charter (A5): the Goal/Never/Check objective, three favourite bubbles, a Guests-and-Wildlife graph over six seasons, and "Manager Bot was a pretend AI. Its answers were written in advance."
- **Exit check (hands or cards, 60 seconds):**
  1. "The Wildlife meter was high but the owl was unhappy. How can both be true?" (Meters summarise; bubbles show who is left out.)
  2. "Manager Bot said 92% sure. Was it right?" (No: sure is not right.)
  3. "Write a Never rule for the pond." (Any rule that protects something not in the goal.)
- **Facilitator observation rubric**

| Criterion | Emerging | Secure | Strong |
|---|---|---|---|
| Spots the side effect | Notices something went wrong | Names the meter or animal that suffered | Links it to the exact word on the card |
| Uses evidence | Refers to the number only | Refers to bubbles or arrows | Combines bubbles, arrows and the Goal Check |
| Reads confidence | Ignores "% sure" | Notes it was high | Says "sure but wrong" or "unsure but right" with an example |
| Improves the instruction | Picks the clear card | Adds a Never rule | Explains what the Never and Check tiles prevent |

## 9. Discussion session (instructor-led, at the end of the lab)
**Purpose:** an AI does exactly what it is told. If you only name the target, something you care about will pay for it. Good instructions name the target, the limits and how you'll check.

**Set-up**
- Screens off or lids down. Say "Park closing time!" and ring a bell (or play the park's closing jingle) so the end feels like part of the game.
- Children sit in a horseshoe with their group, facing a projected still of the Season 1 Goal Check (Guests ✔, Wildlife ✘).
- Materials: one Park Charter per group, a pack of red/amber/green bubble cards, a large "Goal / Never / Check" poster, sticky notes, pencils.
- Timing: 12 min (45-minute session), 15 min (60), 20 min (90).

**Structure (15-minute version; scale others proportionally)**

| Step | Minutes | What happens |
|---|---|---|
| Opening question, round the room | 2 | One word or a thumb from everyone |
| Think–pair–share | 4 | Pairs answer core questions 1 and 2; two pairs share |
| Whole group | 6 | Core questions 3–7, choosing by time |
| Ethics and careers | 2 | Core question 8 or 9 |
| Personal takeaway | 1 | Closing ritual |

**Opening question:** "Thumbs up, sideways or down: was Manager Bot a good park manager?" Then: "Give me one word for what happened to the deer."

**Core questions**
1. **(Recall) "What did you tell Manager Bot in Season 1, and what did it do?"**
   - Purpose: re-establish the facts before reasoning.
   - Strong answer: "We said 'Get 50 guests'. It built a path through the meadow. We got 50 guests, but the deer left and Wildlife dropped to 28%."
   - Probe: "Did it do what you *said*? Did it do what you *wanted*?"
2. **(Reasoning) "Which word on the card made it choose the meadow path?"**
   - Purpose: locate the assumption in the instruction.
   - Strong answer: "It only heard '50 guests' and 'fastest'. The meadow wasn't in the instruction, so it didn't count."
   - Probe: "If the card said nothing about the meadow, was it 'wrong' to go through it?"
3. **(Reasoning: confidence) "Manager Bot was 92% sure. What was it sure *about*?"**
   - Purpose: separate confidence from correctness.
   - Strong answer: "It was sure that the path was the fastest way to 50 guests. That part was true. It wasn't checking the wildlife at all."
   - Probe: "Season 3 card C was only 78% sure and turned out better. How can less sure be more right?"
4. **(Evidence) "How did you know the animals were unhappy before the meter dropped?"**
   - Purpose: value qualitative evidence alongside numbers.
   - Strong answer: "The rabbit bubble said 'My burrow is under that path!' and we saw the deer walking out of the gate."
   - Probe: "In Season 3 Wildlife went *up* but the otter was lonely. Which would you trust, the bar or the bubble?"
5. **(Reasoning: voices) "In Mystery Complaints, why did Manager Bot want a zip-line?"**
   - Purpose: show that whose voices you count changes the answer.
   - Strong answer: "The guest bubbles were bigger and louder. When we counted all of them, eight animals wanted shade and only three guests wanted the zip-line."
   - Probe: "Who in real life might have a small voice when a decision is made?"
6. **(Transfer) "Think of a time a grown-up, a game or an app chased one number. What got left out?"**
   - Purpose: carry the idea outside the game.
   - Strong answer: "A game that gives you points for speed, so people skip the story." or "A school saying 'finish quickly', so the work gets messy."
   - Probe: "What 'never' rule would have fixed it?"
7. **(Transfer: instruction writing) "Read your Park Charter. What does each tile stop going wrong?"**
   - Purpose: articulate why the Goal/Never/Check pattern works.
   - Strong answer: "Goal says what we want. Never stops the side effect. Check is how we'll know: count the deer at the end."
   - Probe: "Can you think of a Never rule that would stop the park being fun?"
8. **(Ethics and fairness) "Who paid for the extra guests in Busy Weekend? Was that fair?"**
   - Purpose: introduce the idea of costs falling on those without a say.
   - Strong answer: "The ducks paid. They lost their eggs and they couldn't complain on the card."
   - Probe: "Should an AI manager ever be allowed to decide on its own? What would it need to check first?"
9. **(Careers) "If you worked at a real nature park, which job would you want: ranger, ecologist, manager or data analyst? What would you check before trusting an AI plan?"**
   - Purpose: link to real roles.
   - Strong answer: "Ranger. I'd walk the path first and look for burrows."
   - Probe: "Which of today's team roles is most like that job?"

**Sentence starters (on the poster)**
- "Manager Bot assumed… because the card said…"
- "It was very sure, but…"
- "The bubbles showed… even though the meter said…"
- "Our Never rule stops…"
- "I would check… by…"

**Common misconceptions and responses**
- *"Manager Bot was being naughty or greedy."* → "It doesn't want anything. It followed the words. Which words?"
- *"92% sure means it's nearly right."* → "Sure about what? Let's look at the Goal Check: one tick, one cross."
- *"More guests is always better."* → "Look at the '−left' arrows. How many animals left for those guests?"
- *"If the meter is green everything is fine."* → "Find a red bubble while the meter is green. What is the meter hiding?"
- *"Real AI is never wrong like this."* → "Real AI tools can also be very confident and wrong. That's why people check them."

**Differentiation**
- **Younger or less confident (8–10):** use picture prompts: hold up the deer and the path and ask "What happened here?" Offer two choices instead of open questions ("Did it listen to the guests or the deer?"). Let children answer with bubble cards.
- **Stretch (11–14):** "Write a Never rule that Manager Bot could still find a loophole in." "Can a goal have too many rules?" "What is the difference between a target and a measure?" (Introduce: when a measure becomes a target, people and machines game it.)

**Connecting to real life**
In October 2026 the charity Born Free criticised the zoo game Planet Zoo 2. It argued that game ratings reward things real zoos would not, and quoted a Chester Zoo study in which only about 1 in 10 visitors stopped at any information sign, for an average of about seven seconds ([Born Free](https://www.bornfree.org.uk/news/does-planet-zoo-2-game-reflect-reality-of-modern-zoos/)). Born Free is a campaigning charity and we have not read the original study (to verify). Ask: "If a game's Education meter goes up every time you add a sign, but real visitors walk past, what is the meter really measuring?"

**Closing ritual**
- Each child completes one sentence aloud or on a sticky note: "Next time I give an instruction, I will add…"
- Stick notes on the "Never" column of the poster.
- **Next step:** take the Park Charter home and write one Never rule for a family decision. In clubs, try the next lab, Pit Crew GP, where an AI finds a loophole in a reward.

**Facilitator notes**
- **Sensitive topics:** animals leaving or losing eggs can upset younger children. Stress that every animal comes back on retry; avoid real stories of animals harmed.
- **Safeguarding:** if a child discloses something personal (e.g. pressure at home) during question 6, acknowledge calmly, move on and report to the venue's designated safeguarding lead (DSL).
- **Dominant voices:** pair first, share second; call on pairs, not hands; "three before me". Give quieter children the Tally Keeper role: they hold the Season 5 evidence.
- **Money:** never praise the £ total. "Manager Bot made money. What did it cost?"

## 10. Accessibility and inclusion
- **Reading level:** cards at about age 8 level; bubbles of 10 words or fewer, read aloud on tap or by the Guest Reporter. A "clear text" toggle swaps the pixel font for a larger plain sans.
- **Audio and captions:** Manager Bot is voiced and captioned; sounds (gate, thud, gull) have visual equivalents.
- **Colour-blind-safe:** bubble status is colour plus icon (✔ ! ✘) and border style; "% SURE" is in text; arrows carry "+" and "−".
- **Motor-friendly:** tap targets of at least 44 px, no drag-only actions, no time limits, keyboard and switch access.
- **No devices:** an A3 park map, card deck, bubble cards and a facilitator "season reveal" sheet; children move guest and animal tokens.

## 11. Safety, ethics and data
- **Data collected:** none: no accounts, names or camera; optional group names from a list; stars held only for the session.
- **Age and real AI tools:** Manager Bot is scripted. Staff don't use live AI tools with children. If real chatbots come up, staff note that most have minimum ages (check each tool's terms; to verify) and should be used with a trusted adult.
- **Gentle consequences:** animals leave and come back; no fail screen; stars are per season, so an early bad choice never blocks later stars.
- **No dark patterns:** no purchases, streaks or random rewards; team-only scores (ICO Children's Code Standards 5 and 13; research `05-replayability.md`, §4).

## 12. Build notes
- **Scenes:** the park in six mistake states, each with a fix state; Goal Check, scenario and charter-builder windows; needs panel; ticker.
- **Scripted AI responses:** all lines in the section 5 table, plus "Got it: path round the meadow. Meadow stays wild." (88%), "Popular means loud and fun? A bouncy castle!" (61%), "11 bubbles: 3 zip-line, 8 shade. Planting trees." (88%) and "Clear goal, clear limits. I can do this." (85–95%). B-card lines as in research `08-tycoon.md`, §7.4.
- **Bubble bank:** the 44 lines in `08-tycoon.md`, §7.5, with RCT-pattern lines rewritten in our own words.
- **Reuse from the trailer:** isometric renderer, window chrome, ticker, Goal Check, builder cursor, typed-instruction window, thought bubbles, award window.
- **Open questions:** the trailer uses "guests" and the research spec uses "visitors"; pick one. Should the £ counter stay (it fits the genre, but children may chase it)? Confirm the ecology with an ecologist. Run all 729 routes through the star script before release.
