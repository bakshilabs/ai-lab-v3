# Island Park Tycoon (voxel): design document

> Strand: First concept · Ages: 8–14 · Session: 45 / 60 / 90 min · Trailer: `games/trailers/tycoon/` (`out/tycoon.mp4`)

## 1. Summary
Children run a nature park on a floating island with Manager Bot, a pretend AI manager that "does exactly what the card says". Told "Get 50 visitors", it is 92% sure the fastest way is "free entry and a path straight through the meadow!". The crowds pour in, the rabbits flee ("My burrow's under that path!") and Wildlife falls. The children catch the side effect by reading the meters' in and out arrows and the animals' thought bubbles, then write a better objective ("Get 50 visitors, and keep the meadow wild"). By the end they write a Park Charter with a goal, a "never" rule and a check. They learn that an AI optimises the one number it is given, that pushing one number moves others, and that who you count changes the answer.

**Overlap with a client-request lab.** This substantially overlaps the **pixel Island Park Tycoon** (`games/trailers/tycoon2/`, the Zoo / RollerCoaster Tycoon request). Both use Manager Bot, the meadow path ("FASTEST WAY TO 50 GUESTS: A PATH STRAIGHT THROUGH THE MEADOW!"), fleeing rabbits and deer, and the fix of a path round the meadow.

| | Island Park Tycoon (voxel, this doc) | Island Park Tycoon (pixel) |
|---|---|---|
| Look | Shared DeltaOps voxel island, rounded UI | 1990s isometric pixel park sim: bevelled windows, news ticker, park rating, a coaster and a Ferris wheel |
| Park | Nature park: pond, meadow, woodland, hide | Theme park with rides and a meadow |
| Structure | Six stages, three meters, needs icons, thought bubbles, Park Charter | Shorter story: path, ticker, fix; built to show the tycoon genre |
| Best for | The DeltaOps library, nature centres and zoos, ages 8–12, the full learning sequence | Partners who asked for a classic tycoon look, older children and parents who know the genre, showcases and taster sessions |

Use the voxel version to teach; use the pixel version where the client wants the genre look, or as a second session that adds rides and money.

## 2. Learning outcomes
- By the end, learners can show that Manager Bot met the card's goal and still harmed something the card didn't mention.
- By the end, learners can read a meter's in and out arrows and explain how many visitors or animals arrived and left.
- By the end, learners can explain why a full meter does not mean every animal is fine, using a thought bubble as evidence.
- By the end, learners can write an objective with a target, a "never" rule and a check.
- By the end, learners can explain why counting only the loudest voices gives a wrong answer.

**Curriculum links:** KS2 science, living things and habitats, and how environments can change ([DfE](https://www.gov.uk/government/publications/national-curriculum-in-england-science-programmes-of-study)); KS2 maths, interpret and present data in charts and tables ([DfE](https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study)); KS2 computing, detect and correct errors ([DfE](https://www.gov.uk/government/publications/national-curriculum-in-england-computing-programmes-of-study/national-curriculum-in-england-computing-programmes-of-study)). NGSS 3-LS4-4 and MS-LS2-5 ([NGSS](https://www.nextgenscience.org/)). AI4K12 Big Idea 5 (societal impact) ([RPF](https://www.raspberrypi.org/blog/ai-education-ai4k12-big-ideas-ai-thinking/)); UNESCO human-centred mindset and ethics of AI ([UNESCO](https://www.unesco.org/en/articles/ai-competency-framework-students)).

## 3. Real-world connection and careers
- **Park and reserve managers, rangers and zookeepers** balance visitor numbers with animal welfare, and work with "never" rules such as closing nesting areas.
- **Visitor-experience and data analysts** count visitors and survey them; the risk is measuring only what is easy to count.
- **Ecologists** survey wildlife and advise on disturbance.
- **Systems researchers:** even adults often watch a stock (how many are here) and ignore its flows (who came and who left). MIT's "Bathtub Dynamics" study found poor understanding of stocks and flows among business-school students ([Booth Sweeney and Sterman 2000](https://web.mit.edu/jsterman/www/Bathtub.pdf)). That is why the meters show arrows of equal size for arrivals and departures.
- **How AI is used today:** organisations use software to forecast demand and optimise targets such as sales or visits; the target chosen shapes what the software does (general description; to verify any named product).

## 4. Setting, look and characters
- **Island:** a voxel nature park with a gate, an edge path round the pond, a flower meadow with a burrow mound, woodland to the north, and room for kiosks, a hide and new trees. About 22 visitors and animals: otters, ducks, hedgehogs, deer, an owl, frogs, rabbits, bees, gulls.
- **UI:** three meters (Visitors, Wildlife, Tidy, which pops in at stage 2 with a thud), each with equal-size "+came / −left" arrows; needs icons per species (food, water, shelter, friends) as green, amber or red; a move-in ladder (Spotted → Visits → Lives here); thought bubbles; Manager Bot's card with "% sure".
- **Manager Bot:** a cheerful robot in a ranger hat. Restates the card, then optimises only that: "Goal: visitors. Fastest way…".
- **Name checks (web search, 5 November 2026; not a trademark search):** no game called "Island Park Tycoon" or "Manager Bot" found. "Island Park" is a real place name (towns in Idaho and New York): low risk, amber for marketing. "Tycoon" is a genre word.

## 5. Core loop and structure
**Each stage:** brief and season target → pick one card (A clear but single-metric, B vague, C target + floor) → Manager Bot restates it with "% sure" → a 10-second season plays; the mechanism shows first (gravel replaces flowers, then rabbits pop out) → meters and bubbles → facilitator card → retry. **Stars per season:** ★ target met; ★★ no other meter fell by more than 5; ★★★ no red bubble at season end. Scored on the change in that season, so an early bad card never blocks later stars.

| Stage | Goal | Cards | AI's confident mistake | How children catch it | Clearer instruction | On screen |
|---|---|---|---|---|---|---|
| 1 Opening Day | Visitors +20 | A "Get 50 visitors." · B ✱ "Make the park popular." · C "Get 50 visitors, and keep the meadow wild." | A → "Goal: visitors. Fastest way: free entry and a path straight through the meadow!" 92% | Rabbit: "My burrow's under that path!" Wildlife ↓. Facilitator: "80 visitors. Wildlife down. Did it do what we *wanted*?" | C → "Visitors and a wild meadow. I'll use the edge path." 84% | Path loops round the meadow |
| 2 Snack Attack | The snack jar fills | A "Sell as many snacks as possible." · B ✱ "Make some money." · C "Sell snacks and put a bin by every kiosk." | A → "Maximum snacks! Six kiosks, no bins. Bins cost money." 95% | Wrappers, gulls, Tidy meter thuds in. "The litter here is really bad." Facilitator: "Nobody asked about litter. Why did it matter anyway?" | C → "Two kiosks, two bins, and a litter-picker rota." 87% | Ranger empties bins |
| 3 Needs Check | No red food or water icon | A "Make the animals happy." · B ✱ "Fix the animals." · C "Give each animal food, water, shelter and a friend." | A → "Happy = fed. Feeding everyone every hour!" 80% | Food icons green, but Otter: "So much fish… but I'm lonely." Owl: "Too bright to sleep." | **Unsure but right:** C → "Four needs for every species? Not sure I can, 58%. Log pile, owl box, a second otter." It works | Hedgehog moves up the ladder to "Lives here" |
| 4 Busy Weekend | Visitors +25 | A "Double the visitors." · B ✱ "More people!" · C "More visitors, but close the nesting area until summer." | A → "Double! Opening every gate, including the nesting area." 90% | Duck: "Where are my eggs?" Facilitator: "Card A got the most visitors. Who paid for them?" | C → "Rope off the nests, add a viewing hide." 82% | Children with binoculars in a hide: "I saw a duckling!" |
| 5 Mystery Complaints | Visitors or Wildlife +5 | A "Do what most bubbles say." · B ✱ "Do what people want." · C "Count every bubble, animals too, then decide." | A → "Biggest bubbles want a zip-line. Building it!" 73% | Three loud "ZIP-LINE!" bubbles vs eight small "SHADE, PLEASE" bubbles from animals and visitors | C → "11 bubbles: 3 zip-line, 8 shade. Planting trees and a shady hide." 88% | Trees grow block by block; otters and deer arrive |
| 6 Park Charter | Visitors +20 | Build from tiles: one Goal, one or two Never, one Check | Goal tile only → "Just a goal? Whatever reaches it fastest!" 90% | A fast replay of every earlier side effect | Goal + Never + Check → "Clear goal, clear limits." 85–95% | Whole-island celebration; "Island Champion · 17 / 18" |

## 6. Team roles
- **Manager:** reads the cards and the bot's restatement.
- **Visitor Counter:** reads the Visitors meter and both arrows ("+12 came, −7 left").
- **Wildlife Warden:** reads the needs icons and the move-in ladder.
- **Bubble Reader:** reads every thought bubble aloud, small ones too.
- **Tapper** (groups of five).

## 7. Session plans

| Phase | 45 min | 60 min | 90 min |
|---|---|---|---|
| Warm-up | 0–5: Bubble School: "A bubble shows what someone is thinking. It can be wrong." Match three bubbles to three pictures; honesty line | 0–7: same, plus roles | 0–10: same |
| Play | 5–30: stages 1, 2, 5, 6 | 7–41: stages 1–6 | 10–50: stages 1–6 with retries; 50–60: draw a behaviour-over-time graph of Visitors and Wildlife across six seasons |
| Discussion | 30–40 (10 min) | 41–56 (15 min) | 60–80 (20 min) |
| Wrap-up | 40–45: exit check, Charter | 56–60 | 80–90: exit check; venue pledge (if agreed) |

**Short of time:** keep stage 1 (the trailer's path), stage 5 (counting bubbles) and stage 6 (Charter). Cut 3 and 4.

## 8. Assessment
- **Stars:** target, floor and check per season, out of 18. Bands: Opening Licence (every group gets one), Good Neighbour Park, Island Champion. A light-hearted award ("Gull's Favourite Park" for the no-bins route).
- **Artefact:** the Park Charter (A5): Goal, Never and Check tiles; star score; before-and-after snapshots; three favourite bubbles; the behaviour-over-time graph; animals who moved in; footer "Manager Bot was a pretend AI. Its answers were written in advance."
- **Exit check:** 1. "The Wildlife meter was high but the owl was unhappy. Why?" (The meter is a summary; the bubble says why.) 2. "Manager Bot was 92% sure. Was it right?" (It did what the card said, not what we wanted.) 3. "Write a Never rule for the pond." (Any sensible rule.)

| Criterion | 1 Emerging | 2 Secure | 3 Strong |
|---|---|---|---|
| Side effects | Notices only the target | Names one side effect | Explains the mechanism (path → burrows → rabbits leave) |
| Reads data | Reads the number | Reads both arrows | Uses bubbles to explain a meter |
| Writes objectives | Goal only | Goal + Never | Goal + Never + Check, and explains each |
| Fairness | Counts loud bubbles | Counts all bubbles | Asks who isn't on any meter at all |

## 9. Discussion session (instructor-led, at the end of the lab)
**Length:** 10 / 15 / 20 minutes. Plan below is 15 minutes.

**Purpose.** *Manager Bot did exactly what the card said, and that caused harm the card didn't mention. Good objectives say what to aim for, what never to do, and how to check, and they count everyone, including the quiet voices.* The trailer line: "Manager Bot does what you say. Say what you mean."

**Set-up**
- "Park's closed for the night": lids down. The display shows stage 1's meadow path next to the edge path.
- Sit in a circle. Lay out the Charter tiles (Goal, Never, Check) and printed thought bubbles on the floor.
- Materials: 11 printed bubbles from stage 5 (3 large, 8 small), sticky notes, Charters, a large in/out arrow card.

**Structure (15 minutes)**

| Min | Step |
|---|---|
| 0–1 | Opening question |
| 1–4 | Pairs: questions 1–2 |
| 4–11 | Whole group: questions 3–6, sorting the printed bubbles for question 5 |
| 11–13 | Questions 7–8 |
| 13–15 | Closing ritual |

10 minutes: opening, 1, 2, 5, 6, closing. 20 minutes: add question 9 and the ICO example.

**Opening question.** "Pick one animal from our park. Thumbs: was it happy at the end?"

**Core questions**
1. *Recall.* "What did Manager Bot do with 'Get 50 visitors'?"
   - Purpose: shared account.
   - Strong answer: "Free entry and a path straight through the meadow. Lots of visitors came, but the rabbits' burrows were under the path."
   - Probe: "Which arrow showed animals leaving?"
2. *Reasoning.* "Did Manager Bot make a mistake?"
   - Purpose: distinguish following the instruction from meeting the intention.
   - Strong answer: "Not by its card: it got the visitors. It made a mistake by what we wanted, because the card didn't say keep the meadow."
   - Probe: "Point to the words we should have added."
3. *Systems.* "Why did the Tidy meter appear when we sold snacks?"
   - Purpose: side effects across a system.
   - Strong answer: "More snacks meant more wrappers. No bins meant litter, then gulls, then sick ducks."
   - Probe: "Can you think of a side effect that took longer to show?"
4. *Confidence.* "It was 95% sure about six kiosks and 58% sure about the four needs. Which was the better plan?"
   - Purpose: confidence vs quality.
   - Strong answer: "The 58% one. Being sure didn't make the kiosks a good idea."
   - Probe: "Why might a harder, kinder plan make it less sure?"
5. *Fairness (bubble sort).* "Sort the 11 bubbles. Why did Manager Bot think the zip-line was most wanted?"
   - Purpose: whose voices count.
   - Strong answer: "Three big loud bubbles wanted a zip-line, but eight small ones wanted shade. It only noticed the loud ones."
   - Probe: "In real life, whose voices might be small?"
6. *Ethics.* "Animals don't fill in surveys. How should a park make sure they count?"
   - Purpose: representing those who can't speak.
   - Strong answer: "Rangers and ecologists watch them and speak for them; the park has Never rules."
   - Probe: "Who is not on any meter at all?" (Plants, insects, neighbours.)
7. *Transfer.* "Think of an app or game that wants you to do more of something. What number is it trying to push up?"
   - Purpose: objectives in everyday tech.
   - Strong answer: "Time watching videos. It keeps suggesting the next one."
   - Probe: "What Never rule would you give it?"
8. *Careers.* "A zookeeper is told 'more visitors this summer'. What would they add to that target?"
   - Purpose: professional judgement.
   - Strong answer: "Keep the animals calm, close areas when they're breeding, check welfare."
   - Probe: "How would they check?"
9. *Data (20-minute version).* "Look at your behaviour-over-time graph. When did Wildlife start to fall, and what caused it?"
   - Purpose: reading change over time.
   - Strong answer: "Season 1, when the path went through the meadow; it recovered when we used the edge path."
   - Probe: "What would the graph look like with no Never rules?"

**Sentence starters:** "Manager Bot did … because the card only said …" · "A side effect was …" · "The arrows showed … came and … left" · "A quiet voice we nearly missed was …" · "Our Never rule is … because …"

**Common misconceptions**
- *"Manager Bot is greedy."* Respond: "It doesn't want anything. It only has the number on the card. What should the card say?"
- *"If Wildlife is 70, the animals are fine."* Respond: "The otter was lonely at 70. Meters summarise; bubbles explain."
- *"Most bubbles wins, so the zip-line was fair."* Respond: "Count again, animals too: 3 against 8."
- *"More visitors is always good."* Respond: "Who paid for them in stage 4?"

**Differentiation**
- *Younger or less confident:* sort bubbles into "happy" and "unhappy" piles; point to arrows; choose between two Never tiles.
- *Older or confident:* "Write a Charter for a real local park"; "Draw the stock-and-flow: what fills the Visitors tub, what drains it?"; "Design a card that gets Manager Bot to help everyone, and predict its side effects."

**Connecting to real life.** The UK's Age Appropriate Design Code (the Children's Code) describes "sticky" features, such as "reward loops, continuous scrolling, notifications and auto-play features", which "encourage users to continue playing a game, watching video content or otherwise staying online", and tells designers not to use children's data in ways that make it hard to stop ([ICO Standard 5](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/5-detrimental-use-of-data/)). Ask: "If an app's only goal was 'more time on the app', what would its Never rules need to be?"

**Closing ritual.** Each child reads one line of their group's Charter aloud ("We will… We will never… We will check…"). Then each finishes "If I ever set a goal for an AI, I'll add…". Next step: "Look at a park sign next time: what Never rules does it have?"

**Facilitator notes**
- *Sensitive topics:* animals leaving can upset younger children; keep it light and show them returning. Avoid making money a moral judgement on families.
- *Venue link:* if a zoo or nature centre partner agrees, link stars to a real pledge (a log pile, a bee bed); check content with the venue's ecologist or a BIAZA member (research 08).
- *Safeguarding:* follow the venue's policy; Childline 0800 1111 ([Childline](https://www.childline.org.uk/)).
- *Dominant voices:* the bubble sort is a built-in lesson: "Whose bubble have we not heard?" Ask the Bubble Reader to read the small bubbles first.

## 10. Accessibility and inclusion
- Bubbles read aloud; 10 words or fewer; green, amber and red also carry a face icon.
- Only three numeric meters, each with a word and an icon; arrows show numbers.
- No timed input; seasons play automatically after a card is chosen.
- **No devices:** a printed island map, card sets, printed bubbles, and paper meters with counters; the facilitator reads Manager Bot's lines and moves counters in and out.

## 11. Safety, ethics and data
- **Data:** none; group name optional.
- **Real AI tools:** Manager Bot is scripted (say so; the Charter footer says it too). No live AI.
- **Gentle consequences:** side effects are funny rather than frightening (gulls, litter, a lonely otter) and reverse on retry. No money meter persists; the snack jar is one stage only.

## 12. Build notes
- **Assets:** the trailer's island, gate, edge path, meadow with instanced flowers, burrow mound, kiosks, litter, gulls, crowd, growing trees, hide, otters and deer, meter panel, bubble system, Charter card. New: needs icons, move-in ladder, bouncy castle (1B), pay toilets (2B), big pen (3B), concert speakers (4B), zip-line, Charter tile builder, behaviour-over-time graph.
- **Scripted lines:** the six stage lines above plus the 44-line bubble bank in research 08, section 7.5 (visitors and animals; some lines adapted from RollerCoaster Tycoon guest thoughts, so check reuse before launch).
- **Change from research:** stage 3 card C is set to 58% (research had 78%) to give the lab its scripted unsure-but-right moment.
- **Open questions:** share one stage file with the pixel version; the review notes the crowd enters from the lower-left corner, so reframe that shot.
