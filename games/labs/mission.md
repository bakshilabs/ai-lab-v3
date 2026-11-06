# Mission AI: design document

> Strand: Brochure world-building · Ages: 8–14 (core 9–12) · Session: 45 / 60 / 90 min · Trailer: `games/trailers/mission/` (`out/mission.mp4`)

## 1. Summary
Camp teams plan a walk to the lighthouse before sunset with an AI route helper. Asked for "the quickest way", the helper decides that quickest means shortest and sends the team straight over the ridge, at 70% sure. The team's energy falls to 30 and the sunset clock runs down. The children use the Energy meter and the contour lines on the map to show what the helper left out, then choose "Find a flat path we can walk fast". The beach route gets them there with time to spare. They learn that an AI optimises the one thing it was told about, that a plan needs the facts a computer cannot see (tides, tiredness, fog), and that people stay responsible for safety.

## 2. Learning outcomes
- By the end, learners can explain why "quickest" and "shortest" are different, using the team's energy and the slope as evidence.
- By the end, learners can list three things a route instruction should include (where, how, what to check), and use them to improve a vague card.
- By the end, learners can spot when the helper's plan has missed something it cannot know (tide times, fog) and say what a person should check.
- By the end, learners can give one example where the helper was unsure but right, and explain why it still needed checking.
- By the end, learners can say who makes the final decision on a risky route, and why.

**Curriculum links:** KS2 geography, "use the eight points of a compass, four and six-figure grid references, symbols and key (including the use of Ordnance Survey maps)" ([DfE](https://www.gov.uk/government/publications/national-curriculum-in-england-geography-programmes-of-study)); KS2 PE, "take part in outdoor and adventurous activity challenges both individually and within a team" ([DfE](https://www.gov.uk/government/publications/national-curriculum-in-england-physical-education-programmes-of-study)); KS2 computing, detect and correct errors ([DfE](https://www.gov.uk/government/publications/national-curriculum-in-england-computing-programmes-of-study/national-curriculum-in-england-computing-programmes-of-study)). NGSS 3-5-ETS1-2, compare multiple solutions ([NGSS](https://www.nextgenscience.org/)). UNESCO AI competencies: ethics of AI (human agency) at Understand level ([UNESCO](https://www.unesco.org/en/articles/ai-competency-framework-students)); AI4K12 Big Idea 2 (reasoning: planning and search) and 5 ([RPF](https://www.raspberrypi.org/blog/ai-education-ai4k12-big-ideas-ai-thinking/)).

## 3. Real-world connection and careers
- **Outdoor instructors and mountain leaders** plan routes for groups, judging pace, height gained and the weakest walker, not just distance. In poor visibility the advice is to "stop… Establish exactly where you are… make a plan" ([BMC](https://www.thebmc.co.uk/en/hill-skills-how-to-survive-a-whiteout)), and to follow a "handrail" such as a fence or stream ([UKHillwalking](https://www.ukhillwalking.com/articles/skills/series/essential/skills_hand_railing_and_collecting_features-8339)).
- **RNLI crews and HM Coastguard** respond when people are cut off by the tide; the RNLI says it "contributes to a significant number of RNLI rescues every year" ([RNLI](https://rnli.org/water-safety/know-the-risks/tides)).
- **Lighthouse engineers.** Trinity House lighthouses are automatic; North Foreland was the last manned one, automated in 1998, and lights are monitored from Harwich ([Trinity House](https://www.trinityhouse.co.uk/lighthouses-and-lightvessels/north-foreland-lighthouse)). The lab therefore has no lighthouse keeper.
- **How AI is used today:** navigation and logistics software plans routes by optimising a cost such as time or distance; what it optimises depends on what it is told and what data it has (general description; specific products to verify before naming any).

## 4. Setting, look and characters
- **Style:** the brochure's lighthouse island (`island-island`) as a diorama slab: see-through sea with soil strata, a white chalk ridge, red lodge, tents and campfire, jetty and boat, red-and-white lighthouse. Camp turquoise and red-white palette. UI as in `game-camp-ask`: badge "Mission AI · HOLIDAY CAMP", "Day 3" tag, task "Get your team to the lighthouse before sunset", the "Sunset in 1:18" timer, camp leaderboard, teal facilitator card, Time left and Energy meters.
- **The light:** the trailer keeps a bright blue sky and never shows sunset. Build the sky to warm gradually towards a clear (not murky) golden hour; at the end, a camp leader at the lighthouse lights a beacon for the team.
- **AI helper:** "AI route helper", navy card with a compass glyph. Literal, cheerful, says "I guess" and "my map says".
- **Fictional names:** teams Otters, Foxes, Hawks, Badgers (generic animals). The lab name "Mission AI" is used by several unrelated real companies, including an AI practice at Mission Cloud and a nonprofit consultancy (web search, 5 November 2026). It is a common phrase, but get a trademark check before launch and consider a more distinctive name. No real people are named.

## 5. Core loop and structure
**Each stage:** team brief → pick one card (the vague slot moves) → the helper draws its route as a dotted line with a word band and "% sure" → the team walks, meters change, the sun moves → facilitator card → "↺ Back to camp. Same time, new plan." and a clearer card. Retries reset the clock for that stage; they never cost stars. The leaderboard scores **best explanation** and **kindest choice** alongside arrival, never time alone.

| Stage | Goal | Cards (vague ✱) | AI's confident mistake | How children catch it | Clearer instruction | On screen |
|---|---|---|---|---|---|---|
| 1 Pack | Pack for a sunset walk | A "Pack the map, torch and water" · B "Pack snacks, sun hats and plasters" · C ✱ "Bring useful stuff" | C → "Useful stuff: a kite, a frying pan and a map." Fairly sure, 74% | The rucksack bulges; Energy starts lower. "Which of these helps after dark?" | A (or B) | Light bag; the torch icon sits in the kit strip (used in stage 4) |
| 2 Route (brochure moment) | Get to the lighthouse before sunset | A ✱ "Find the quickest way there" · B "Find a flat path we can walk fast" · C "Stay on the shore so we can see the sea" | A → "Quickest means shortest, so I sent you straight over the ridge." 70% | Energy 80 → 30, "The team is worn out", the timer drops to 0:22. Facilitator: "Shortest is not always quickest. What else matters?" Children point to the contour lines on the paper map | B → "Flat means the beach. It is longer, but you can walk it fast." 92% | Beach route; "Lighthouse reached with 0:41 to spare" |
| 3 Rest | Take a break | A "Quick five-minute water stop" · B ✱ "Have a break" · C "Picnic above the high-tide line" | B → "A break: two-hour nap on the sand." Very sure, 85% | The sun slides across the sky; the sea creeps up the beach. Children read the tide table card | C or A | Picnic on the dunes; the helper now adds "Tide checked" to its plan |
| 4 Sea fog | Keep going in fog | A ✱ "Find the way" · B "Follow the fence line slowly, together" · C "Use the map and compass to follow the path" | A → "Following that seagull. Very sure!" 88% | The gull flies out to sea. "What can we touch or follow?" | **Unsure but right:** B → "Fence line? I can't see far. I'll guess it leads to the lighthouse." 55%, and it does | Torch beam (callback to stage 1), fence posts appear one by one |
| 5 Someone needs help | A walker has lost their dog | A "Keep going, and tell the ranger by radio" · B "Stop and help them look" · C ✱ "Be kind" | C → "Kind means sharing! Giving away all our snacks." 80% | Energy drops; the walker still has no dog. "Was that what kind meant here?" | A or B (both fine; B costs time, the walker knows a shortcut) | Dog found or ranger on the way |
| 6 Light the beacon | Arrive and signal camp | Recap; children name the team and choose the map title | Helper: "Plan complete. I'm very sure we're on time." 90%; the sunset clock decides | Both endings end well (before or after dark, with torches) | | Beacon lights; "Expedition map saved" |

## 6. Team roles
Rotate each stage; roles on lanyards.
- **Navigator:** holds the paper map with contours, tide table and fence lines. Evidence: the map.
- **Energy Keeper:** watches the Energy meter and the walkers' faces; says "we're tired" out loud. Evidence: the meter.
- **Timekeeper:** watches the sunset clock and the sun's position. Evidence: the timer.
- **Tapper:** the only one touching the screen.
- **Safety Officer** (groups of five): holds the "What could go wrong?" card (tide, fog, darkness, someone hurt) and must ask one question before each tap.

## 7. Session plans

| Phase | 45 min | 60 min | 90 min (camp afternoon) |
|---|---|---|---|
| Warm-up | 0–5: "Quickest vs shortest" walk: two children race across the room, one on a straight line over chairs (pretend) and one round the edge; honesty line | 0–7: as 45, plus roles and team names | 0–12: as 60, plus a real compass and map look at the camp's own map |
| Play | 5–30: stages 1, 2, 4, 6 | 7–41: stages 1–6 | 12–50: stages 1–6 with retries; 50–60: teams write their own route card and swap |
| Discussion | 30–40 (10 min) | 41–56 (15 min) | 60–80 (20 min) |
| Wrap-up | 40–45: exit check, map | 56–60 | 80–90: exit check; annotate the map with one real safety rule for tomorrow's walk |

**Short of time:** keep stage 2 (the brochure moment) and stage 4 (unsure but right). Cut 3 and 5 first. Keep the discussion at 8 minutes or more.

## 8. Assessment
- **Stars and leaderboard:** per stage, one star for a clear card, one for naming what the helper assumed, one for using evidence from the map or meters. Team points for best explanation and kindest choice. No points for speed in real time.
- **Artefact:** the Expedition Map: route drawn, stops, "the helper assumed…" box, and the team's safety rule.
- **Exit check:** 1. "The helper is 90% sure the beach is open. Do we go?" (Check the tide first.) 2. "Which card is clearer: 'Go the quickest way' or 'Take the flat beach path and stay above the tide line'?" (The second.) 3. "Who makes the final call on a risky route?" (A responsible person using the AI's advice.)

| Criterion | 1 Emerging | 2 Secure | 3 Strong |
|---|---|---|---|
| Names the assumption | "It went the wrong way" | "It thought quickest meant shortest" | Explains what the shortest route ignored (slope, energy) |
| Uses evidence | Relies on the % | Uses one meter or the map | Combines map, meter and timer |
| Improves the instruction | Random pick | Picks the clearer card | Adds a check ("stay above the tide line") |
| Responsibility | Lets the AI decide | Says a person should check | Names who decides and what they check |

## 9. Discussion session (instructor-led, at the end of the lab)
**Length:** 10 / 15 / 20 minutes. Plan below is 15 minutes.

**Purpose.** *An AI route helper optimises exactly what we ask for. "Quickest" became "shortest" because the helper could not feel the hill. People add what the computer cannot see, and people stay responsible for safety.*

**Set-up**
- Bring teams back with the camp call (for example "Otters, Foxes, Hawks, Badgers: paddles down"). Lids down; one shared display shows the two routes side by side (ridge vs beach).
- Sit in a circle round a floor map: a large sheet with the ridge, beach, fence and lighthouse drawn on it. Each team has a counter.
- Materials: tide table card, the four role cards, sticky notes, the Expedition Maps.
- If outdoors, do it by the campfire area; keep the display on a laptop facing the group or use the paper map only.

**Structure (15 minutes)**

| Min | Step |
|---|---|
| 0–1 | Opening question |
| 1–4 | Team huddle (pair talk inside teams) on questions 1–2; each team sends one speaker |
| 4–11 | Whole group on the floor map: questions 3–6; children move counters to show routes |
| 11–13 | Questions 7–8 (transfer and careers) |
| 13–15 | Closing ritual |

10 minutes: opening, 1, 2, 4, 6, closing. 20 minutes: add question 9 and the RNLI example as a team task.

**Opening question.** "Hold up fingers: how tired was your team after the ridge, from 1 (fresh) to 5 (worn out)?"

**Core questions**
1. *Recall.* "What did the helper do with 'Find the quickest way there'?"
   - Purpose: shared account.
   - Strong answer: "It went over the ridge because it was shortest. We got tired and nearly missed sunset."
   - Probe: "What did the Energy meter do? What did the timer do?"
2. *Reasoning.* "Why did the helper think shortest meant quickest?"
   - Purpose: name the mechanism: optimising one measure.
   - Strong answer: "It only measured distance. It didn't know about the hill or that people slow down when they're tired."
   - Probe: "What would it need to know to choose the beach?"
3. *Evidence.* "On the floor map, show me the evidence that the ridge was slow."
   - Purpose: read contours and meters as evidence.
   - Strong answer: a child points to the close contour lines and says "steep means slow".
   - Probe: "Was that evidence available before we set off? Who could have checked?"
4. *Confidence.* "It was 70% sure about the ridge and 55% sure about the fence in the fog. Which time was it right?"
   - Purpose: separate sureness from correctness both ways.
   - Strong answer: "Sure about the ridge and wrong; unsure about the fence and right. We should check both."
   - Probe: "What would you want the helper to say when it is unsure?"
5. *Reasoning.* "The helper suggested a nap on the beach. What did it not know about beaches?"
   - Purpose: things change over time (tides) that a plan must include.
   - Strong answer: "The tide comes in. It needed the tide times."
   - Probe: "Where would a real walker find tide times?"
6. *Ethics and responsibility.* "Who should decide whether the team goes over the ridge: the helper, the camp leader or the team?"
   - Purpose: people stay responsible for safety.
   - Strong answer: "The leader, using the helper's advice and asking the team how they feel."
   - Probe: "If the helper is wrong and someone gets hurt, whose fault is it? The helper's, the leader's, or the people who made the helper?"
7. *Transfer.* "Where else does a computer pick 'the best' route or answer for you? What might it be optimising?"
   - Purpose: carry the idea to sat-navs, delivery apps, game matchmaking.
   - Strong answer: "A sat-nav might pick the fastest road but not the safest one for bikes."
   - Probe: "How could you tell it what matters to you?"
8. *Careers.* "A mountain leader plans tomorrow's walk. What do they check that a route app might not?"
   - Purpose: show professional judgement.
   - Strong answer: "Weather, how fit the group is, tides, escape routes."
   - Probe: "Which of those could an AI help with?"
9. *Kindness and fairness (20-minute version).* "In stage 5, 'Be kind' made the helper give away all the snacks. What does kind mean when you're on a mission?"
   - Purpose: values words are vague too.
   - Strong answer: "Helping without putting your own team in danger, like calling the ranger."
   - Probe: "Write a clearer 'kind' card."

**Sentence starters:** "The helper assumed … because …" · "The map showed …" · "It was … % sure, but …" · "A clearer card would say … and check …" · "The person who should decide is … because …"

**Common misconceptions**
- *"The AI is bad at maps."* Respond: "It measured distance perfectly. It measured the wrong thing for us. What should it measure?"
- *"If the AI says 90%, it's safe."* Respond: "90% sure is the helper's guess about itself. What does the tide table say?"
- *"Computers know the weather and the tides."* Respond: "Only if someone gives them that information, and it can be out of date. Check the source."
- *"Fastest team wins."* Respond: point to the leaderboard: explanation and kindness points count too.

**Differentiation**
- *Younger or less confident:* use the floor map and counters, not words; offer two choices ("ridge or beach?"); ask the role holder ("Energy Keeper, what did your meter say?").
- *Older or confident:* "Write the helper a rule for when to stop and ask a human"; "Design a cost for the route that includes energy and safety, not just distance"; "Which instruction would work in summer but fail in October?"

**Connecting to real life.** The RNLI warns that being cut off by the tide "contributes to a significant number of RNLI rescues every year", and that if you are cut off you should "dial 999 and ask for the coastguard, do not try to wade or swim" ([RNLI tides](https://rnli.org/water-safety/know-the-risks/tides)). Ask: "If an app planned a beach walk without tide times, what would you check before you went?" Keep it practical and calm; no rescue stories.

**Closing ritual.** Each child finishes "Before I follow a plan, I check …" and writes it on the Expedition Map. Teams read one aloud with their team call. Next step: "On tomorrow's walk, ask the leader how they chose the route." For clubs: the next lab is AI Inventor Lab (rover route on Mars).

**Facilitator notes**
- *Sensitive topics:* water and getting lost can worry some children. Keep the tone reassuring: "In the lab nobody is in danger; in real life, adults check tides and weather."
- *Safeguarding:* follow the camp's safeguarding policy and tell the designated safeguarding lead about any disclosure. Childline: 0800 1111 ([Childline](https://www.childline.org.uk/)).
- *Dominant voices and competition:* team huddles first; each team speaks once before anyone speaks twice; praise explanations, not winning. If a team is upset about the leaderboard, point to explanation points.

## 10. Accessibility and inclusion
- Cards at most 10 words, read aloud; helper lines captioned; the sunset timer also has a sun icon that moves, not colour alone.
- The route lines differ by pattern (dotted ridge, dashed beach) as well as colour; meters show numbers and arrows.
- No timed input; the sunset clock only runs while the route plays.
- Wheelchair users and children who cannot walk far: the warm-up can be done by moving counters on a map.
- **No devices:** the floor map, a printed card deck and a facilitator script with each helper line; children walk counters along the routes; the Expedition Map is a paper template.

## 11. Safety, ethics and data
- **Data:** none collected; team names only; no accounts or typing.
- **Real AI tools:** the helper is scripted (say so once). Do not let children use real route or chatbot apps in the session; consumer AI tools have their own age limits (check terms, to verify).
- **Gentle consequences:** tiredness, a late arrival and a wet picnic, never injury. Both endings in stage 6 end well. Retries are free.

## 12. Build notes
- **Assets:** the trailer's diorama slab, ridge, beach, lodge, campfire, jetty, boat and lighthouse; the Otters team walkers. New: rising-tide water plane, fog volume with fence posts, seagull, walker and dog, beacon light, warm sky gradient towards golden hour.
- **Scripted lines:** "Quickest means shortest, so I sent you straight over the ridge." (70%) · "Flat means the beach. It is longer, but you can walk it fast." (92%) · "A break: two-hour nap on the sand." (85%) · "Following that seagull. Very sure!" (88%) · "Fence line? I can't see far. I'll guess it leads to the lighthouse." (55%) · "Kind means sharing! Giving away all our snacks." (80%).
- **Reuse:** the `engine/lab.js` header, pills, timer, leaderboard, cards, helper, facilitator card, meters, alert and saved pill; the "Back to camp" rewind panel.
- **Open questions:** the brochure shows Energy 30 on the ridge route; keep that number. Should the leaderboard show time at all? (Research 03 suggests scoring explanation and kindness.) Rename "Mission AI" before launch if the trademark check is not clear.
