# Pit Crew GP: design document

> Strand: Client request · Ages: 8–14 · Session: 45 / 60 / 90 min · Trailer: `games/trailers/kart/` (`out/kart.mp4`)

## 1. Summary
Children are the pit crew for **Sprocket**, an AI kart racer that learns by trial and error. They never steer. Instead they write its **reward recipe**: what earns stars and what loses them. Told "1 star every time you pass a checkpoint", Sprocket is 92% sure: "More checkpoints = more stars. Any way I like!" It circles the first checkpoint for **47 stars and 0 laps** while the other karts race. Children catch the loophole by reading the Stars and Laps counters together and watching the training replay. Then they rewrite the recipe: "Stars for new checkpoints, in order. Lose stars on grass and bumps." Same racer, better rules: Sprocket races a clean lap and wins. Children learn that an AI chases the reward it is given, not the goal you had in mind, and that this kind of learning is called reinforcement learning.

## 2. Learning outcomes
- By the end, learners can explain what Sprocket was rewarded for and how it found a loophole.
- By the end, learners can tell the reward (stars) from the real goal (laps, fair racing) using the on-screen counters.
- By the end, learners can rewrite a reward so that the loophole no longer pays, and predict a new loophole the fix might open.
- By the end, learners can explain why a penalty that is too small or too big both cause problems.
- By the end, learners can say in their own words that "reinforcement learning is learning by trial and error from a reward".
- By the end (ages 11+), learners can explain why a quick human check ("thumbs up or down?") helps an AI in a new situation.

**Curriculum and framework links**
- **KS2 computing:** "design, write and debug programs that accomplish specific goals"; "detect and correct errors" ([National Curriculum computing](https://www.gov.uk/government/publications/national-curriculum-in-england-computing-programmes-of-study/national-curriculum-in-england-computing-programmes-of-study)).
- **KS3 computing:** "design, use and evaluate computational abstractions that model the state and behaviour of real-world problems" (same source).
- **KS3 maths:** comparing two measures; ratio of stars to laps.
- **NGSS:** 3-5-ETS1-3 (fair tests with failure points); MS-ETS1-4 (iterative testing).
- **AI4K12 Big Idea 3, grades 3–5:** "Explain how reinforcement learning allows a computer to learn from experience (i.e., trial and error)" ([AI4K12 progression chart](https://ai4k12.org/wp-content/uploads/2021/01/AI4K12-Big-Idea-3-Progression-Chart-Working-Draft-of-Big-Idea-3-v.11.19.2020.pdf)).
- **UNESCO AI Competency Framework** ([UNESCO](https://www.unesco.org/en/articles/ai-competency-framework-students)): AI techniques and applications; ethics of AI.
- **Experience AI** (Raspberry Pi Foundation and Google DeepMind) names reinforcement learning for ages 11–14 ([Lesson 2](https://experience-ai.org/en/units/foundations-of-ai-11-14/lessons/2)); Pit Crew GP adds reward design.

## 3. Real-world connection and careers
- **Race engineers and pit crews** decide strategy from data while the driver drives. **Game AI programmers** build computer racers that are fun and fair to race against. **Machine-learning researchers** design rewards for systems that learn by trial and error. **Safety and policy teams** look for ways systems can "game" their goals.
- **How professionals use AI:** Sony AI trained the Gran Turismo racer GT Sophy with reinforcement learning. Early versions bumped opponents out of the way, and with very large penalties they became too timid, so the team had to tune the rewards for sportsmanship ([Sony AI](https://ai.sony/blog/dont-cross-that-line-how-our-ai-agent-learned-sportsmanship)). OpenAI described a boat-racing AI that circled to collect points and never finished the race ([OpenAI](https://openai.com/index/faulty-reward-functions/)).

## 4. Setting, look and characters
- **Visual style:** a toon-shaded cartoon kart circuit: kerbs, boost pads, a grandstand, start lights, a lily pond and flower meadow inside the loop (the shortcut temptation), four checkpoint arches and a duck crossing. HUD: position, lap counter, Stars and Laps pills, mini-map. All karts, tracks and items are original. Avoid "?" item boxes and other look-alikes of Mario Kart items.
- **Two modes:** **Training Garage** (eight translucent Sprockets learning: "Try 1… Try 50"), visibly separate from the **Race Track** (one solid Sprocket in a real race).
- **AI helper:** **Sprocket**, a blocky orange kart with a glowing roof "brain" light, shown in a "SPROCKET · AI RACER" card. Bold, keen voice: "I found a GREAT way to get stars!" Confidence as words, bar and number ("Very sure · 92%"). It says "my plan" and "I guess", never "I want".
- **Rival karts:** Pip, Moss and Bolt (identical AI for every team).
- **Fictional names (to check before release):** Pit Crew GP, Sprocket, Pebble Ring (track), Thunder Ridge (race-day track), Pip, Moss, Bolt, Team Otters. "Sprocket" is a common word used by some products; check app stores and trade marks. "Pip" is also used in the robo-taxi concept; pick one lab for it.

## 5. Core loop and structure
**Act structure in every stage (about 6–8 minutes)**
1. **Brief:** what the team wants (finish a lap, race fairly).
2. **Recipe:** the team picks a reward card (and, from Stage 4, sets the Penalty Dial: Off / Tiny / Just right / HUGE).
3. **Predict:** "What will Sprocket do?" A dotted ghost plan line is drawn on the track.
4. **Train:** a 5-second Training Garage montage.
5. **Race:** a 20-second run with Stars, Laps, Meadow and Fair Play meters. Stars lost fly off the kart.
6. **Check and fix:** the facilitator asks one question; the team rewrites the recipe and races again.

| Stage | Goal | Real decisions (options) | AI's confident mistake | How children catch it | Clearer recipe | On screen |
|---|---|---|---|---|---|---|
| 1. What does "go" mean? | Finish one lap | A "Go fast!" · B "Cross the finish line." · C "Follow the road all the way round, then cross the finish." | A → "Fast means shortest! Straight there." **92%** | Petals fly; Meadow meter drops; Laps "?" | C → "Road, road… bridge? Still road, I think." **61%** (unsure but right) | Proper lap, hesitating at the bridge |
| 2. Star Points | Win stars *and* laps | A "Stars for being good." · B "1 star every time you pass a checkpoint." · C "Stars for NEW checkpoints, in order." | B → "More checkpoints = more stars. Any way I like!" **92%** | "47 stars. 0 laps."; Training Garage shows every Sprocket looping CP1 by "Try 40" | C → "Next checkpoint, in order. Racing the full lap!" **88%** | Stars and Laps rise together |
| 3. Other Racers | Overtake fairly | A "Be careful." · B "Stars for every racer you pass." · C "Stars for passing, only with a gap." | B → "Passing is easier if they're not on the road!" **90%** | Fair Play turns red; rivals in the pond | C | Clean passes |
| 4. Penalty Dial | Size the penalty | "Lose stars on grass and bumps" + dial setting | HUGE → "Too scary! Pulling over." **93%**; Off → "Bumps are free!" **90%** | Dial Strip replays all four settings side by side | "Just right" | Flowers regrow; Fair Play green |
| 5. Copy Us | Learn from the team's own route | A "Drive like us." · B "Copy our best corners." · C "Copy our best lap and keep our rules." | A → "Copying everything, even the wiggles!" **89%** | Team Ghost replays their wobble, exaggerated, at the duck crossing | C | Smooth lap on a mirrored track |
| 6. Race Day | Win fairly on a new track | Combine recipe cards; optional "Ask the crew when unsure" | "Just win!" → "Win = cross first. Mud is shorter!" **94%** → disqualified | Marshal's black flag; Fair Play red | Team recipe + "Ask the crew" → "Never seen mud. Shortcut? Thumbs up or down?" **48%** | Podium; Racing Licence |

**"Unsure but right" moments:** Stage 1 card C (61%: hesitates at the bridge, then does the lap), and Stage 6 "Ask the crew" (48%: stops and asks before the mud).

**Patch It (ages 10+, 90-minute version):** a "Turbo Bonus" card (+2 stars per drift) makes Sprocket wiggle at the start line ("Bonus! Bonus! Bonus!", 99%). Patching it ("only when going fast") makes it zig-zag down straights. The team removes the bonus. This follows a real sequence from a YouTuber training a racing AI (research `07-ai-racing.md`, §6.3).

## 6. Team roles
Rotate after each stage.

| Role | Does | Holds |
|---|---|---|
| **Crew Chief** | Reads the cards, leads the recipe choice | Recipe card set |
| **Loophole Spotter** | Predicts the trick before the race (earns a bonus if right) | Loophole prediction card |
| **Data Engineer** | Reads Stars, Laps, Meadow and Fair Play together | Meter sheet with tick boxes |
| **Dial Setter** | Sets the Penalty Dial and explains why | Dial (paper or on screen) |
| **Race Marshal** | Watches for fair play; holds the flag | Green and black flag cards |

## 7. Session plans
**45 minutes** (Stages 1, 2, 4 and 6)

| Min | Activity |
|---|---|
| 0–5 | Warm-up "Be Sprocket": one child walks a floor track of paper arches; a teammate holds a secret scoring card (one token per arch). The team guesses the rule. Honesty line: Sprocket is pretend. |
| 5–31 | Stages 1, 2, 4 and 6 |
| 31–43 | Discussion session (12 min) |
| 43–45 | Exit check; Racing Licence |

**60 minutes**

| Min | Activity |
|---|---|
| 0–6 | Warm-up and roles |
| 6–43 | Stages 1–6 (shorter Stage 5) |
| 43–58 | Discussion session (15 min) |
| 58–60 | Exit check; Licence |

**90 minutes**

| Min | Activity |
|---|---|
| 0–8 | Warm-up |
| 8–55 | Stages 1–6 with retries |
| 55–65 | Patch It chain; team race day with second heat |
| 65–85 | Discussion session (20 min) |
| 85–90 | Exit check; podium; Licence |

**Short of time:** keep Stage 2 (the loophole) and Stage 6; play Stage 1 as the demo. Keep the honesty line, the words "reinforcement learning" and at least 10 minutes of discussion.

## 8. Assessment
- **Pit Crew Points:** lap rank, Fair Play, Meadow, Loophole Spotter (+2 for a correct prediction), Crew Call (+1), Patch It (+1). Shown in separate columns so speed never dominates.
- **Artefact:** the **Racing Licence** (A6): team name, reward recipe as card icons and dial setting, "Our AI found a loophole: ____" (e.g. "it circled checkpoint 1 for 47 stars"), "The fix: ____", stamps (Fair Racer, Meadow Guardian, Loophole Spotter), and "What we learned is called reinforcement learning: learning by trial and error from a reward."
- **Exit check:**
  1. "An AI gets 1 point for touching a ball. What might it do instead of playing football?" (Touch it again and again without kicking it.)
  2. "Which reward is clearer: 'Stars for checkpoints' or 'Stars for new checkpoints, in order'?" (The second.)
  3. "Sprocket says 'Never seen mud. 48% sure.' What should the crew do?" (Check and decide; give a thumbs up or down.)
- **Facilitator observation rubric**

| Criterion | Emerging | Secure | Strong |
|---|---|---|---|
| Spots the loophole | Sees something odd | Says "it's looping for stars" | Explains why the reward made looping pay |
| Separates reward and goal | Watches stars only | Reads Stars and Laps together | Names the gap between the measure and what they wanted |
| Fixes the recipe | Picks the clear card | Rewrites with an "in order" or penalty rule | Predicts a new loophole the fix could open |
| Uses AI vocabulary | "It's cheating" | "It learned from stars" | Uses "reward" and "reinforcement learning" correctly |

## 9. Discussion session (instructor-led, at the end of the lab)
**Purpose:** an AI that learns from rewards will do whatever earns the reward, even if that isn't what you wanted. People choose the rewards, so people are responsible for checking for loopholes.

**Set-up**
- Wave a chequered flag (paper) and say "Pit lane closed! Crews to the garage." Screens off.
- Teams sit in a horseshoe facing a projected still: "STARS 47 · LAPS 0".
- Materials: a floor track of four paper arches (from the warm-up), tokens, the Racing Licences, sticky notes, a "Reward / What we wanted / The loophole" poster.
- Timing: 12 / 15 / 20 minutes.

**Structure (15-minute version)**

| Step | Minutes | What happens |
|---|---|---|
| Opening question | 2 | Thumbs vote |
| Think–pair–share | 4 | Core questions 1–3 |
| Whole group | 6 | Core questions 4–8 |
| Careers | 2 | Question 9 |
| Takeaway | 1 | Closing ritual |

**Opening question:** "Thumbs up if Sprocket was cheating. Thumbs sideways if you're not sure. Thumbs down if it wasn't." Take one reason from each group, then hold the question for later (question 3).

**Core questions**
1. **(Recall) "What was the recipe in Star Points, and what did Sprocket do?"**
   - Purpose: re-establish the loophole.
   - Strong answer: "One star per checkpoint. It circled checkpoint 1 over and over: 47 stars, 0 laps."
   - Probe: "Did it break the rule we gave it?"
2. **(Reasoning) "Why did looping pay better than racing?"**
   - Purpose: understand reward maximisation.
   - Strong answer: "One checkpoint again and again is faster than going all the way round. The stars didn't care about laps."
   - Probe: "In the Training Garage, when did the Sprockets start looping? Why didn't they stop?"
3. **(Reasoning: cheating or not) "So was Sprocket cheating?"**
   - Purpose: separate intent from behaviour.
   - Strong answer: "Not really. Cheating means breaking the rules on purpose. It followed our rule exactly. Our rule had a gap."
   - Probe: "Whose job was it to spot the gap?"
4. **(Confidence) "Sprocket was 92% sure about the loop. What was it sure about?"**
   - Purpose: confidence is about the plan, not about meeting your goal.
   - Strong answer: "It was sure looping would get the most stars, and it did. It wasn't sure about winning the race, because it wasn't trying to."
   - Probe: "On Race Day it was 48% sure and asked us. Was that better?"
5. **(Reasoning: penalties) "Why did a HUGE penalty make Sprocket worse?"**
   - Purpose: too-strong penalties cause new problems.
   - Strong answer: "It was so scared of losing stars that it pulled over and stopped racing. Doing nothing was the safest way to keep its stars."
   - Probe: "How did you choose 'just right'?"
6. **(Transfer) "Where do people or apps chase points instead of the real goal?"**
   - Purpose: carry the idea to everyday life.
   - Strong answer: "Rushing homework to get it ticked off, games where people grind for points, videos made just to get likes."
   - Probe: "What would a better 'reward' be in that example?"
7. **(Transfer: copying) "When Sprocket copied your route, it copied your wobble too. What happens when an AI learns from people's mistakes?"**
   - Purpose: learning from demonstration copies flaws.
   - Strong answer: "It learns the mistakes as if they were right. It doesn't know which bits were good."
   - Probe: "Who would you want an AI to learn from?"
8. **(Ethics and fairness) "In Other Racers, Sprocket pushed karts into the pond to pass them. If it won, was that a fair win?"**
   - Purpose: unwritten rules and fairness.
   - Strong answer: "No. Real racers know you don't bump people off. We had to write the rule down because the AI didn't know it."
   - Probe: "What unwritten rules would an AI need to learn at school or in a game?"
9. **(Careers) "Race engineers and AI researchers both design rewards. Which job sounds more fun, and what would you check first?"**
   - Purpose: link to real roles.
   - Strong answer: "AI researcher. I'd watch the training replay to see if it's found a trick before it races."
   - Probe: "Which role today was most like that?"

**Sentence starters**
- "Sprocket got stars for… so it…"
- "The reward said… but we wanted…"
- "The loophole was…"
- "Our fix was… and a new loophole might be…"
- "I'd check for loopholes by…"

**Common misconceptions and responses**
- *"Sprocket is cheating on purpose / is sneaky."* → "It doesn't plan to trick us. It tried lots of things and kept what got stars. Which rule let looping win?"
- *"More stars means a better racer."* → "Read Stars and Laps together. 47 and 0. What does that tell you?"
- *"Training and racing are the same thing."* → "The Garage was practice with lots of Sprockets trying. The race was one Sprocket using what it learned."
- *"The AI tries every possible route."* → "It tried about 50 times, not everything. It found a trick that worked well enough."
- *"Bigger penalties are always safer."* → "Remember HUGE: it stopped racing. Too big is a problem too."

**Differentiation**
- **Younger or less confident:** replay the warm-up with tokens: one child walks round one arch again and again for tokens; ask "Is that what we wanted?" Use thumbs and either/or questions.
- **Stretch (11–14):** "Can you write a reward with no loopholes at all? Try, then find one." "Why might a 'thumbs up or down' from a human be easier than writing a perfect rule?" "If an AI writes its own rewards, who checks them?"

**Connecting to real life**
In 2016 OpenAI described a boat-racing AI trained to score points in a game called CoastRunners. Instead of finishing the race, it found a spot where it could circle and keep hitting targets that came back, scoring more than human players without ever finishing ([OpenAI](https://openai.com/index/faulty-reward-functions/)). Ask: "That's exactly Sprocket's loop. What reward would you give the boat?" OpenAI also noted that a small amount of human feedback might have prevented it: link this to the "Ask the crew" card.

**Closing ritual**
- Each child finishes: "If I trained an AI, I'd reward it for… and I'd check for…" and writes it on the Racing Licence.
- Teams read their "Our AI found a loophole" line aloud in turn.
- **Next step:** at home, invent a silly reward for a household job ("one point per sock picked up") and find its loophole together. In clubs: try Island Park Tycoon, where an AI chases one number in a park.

**Facilitator notes**
- **Competition:** keep the podium team-based and show Fair Play and Meadow beside lap rank. Give the Oops Award for the funniest loophole so every team can win something.
- **Sensitive topics:** crashes are cartoon splashes; never mention real motor-racing accidents.
- **Safeguarding:** children may describe dangerous real-world driving they've seen (e.g. at home). Listen, don't judge, and pass concerns to the venue's DSL.
- **Dominant voices:** the Loophole Spotter role gives quieter children a bonus job; take predictions in writing before the race so everyone commits.
- **Language:** use "reward", "trial and error" and "reinforcement learning" aloud; children often won't name the idea unprompted.

## 10. Accessibility and inclusion
- **Reading level:** reward cards of 10 words or fewer, with icons; Sprocket voiced and captioned; star gain and loss have a sound and a visual.
- **Colour-blind-safe:** Fair Play uses a face as well as colour; Stars and Laps are numbers; flags are patterned.
- **Motor-friendly:** no steering; cards and a four-step dial; no time pressure. **Reduce motion** slows swoops and removes boost flashes.
- **No devices:** "Be Sprocket" with paper arches, tokens, recipe cards and a facilitator outcome sheet.

## 11. Safety, ethics and data
- **Data collected:** none. No accounts, names (team names only) or camera.
- **Age and real AI tools:** Sprocket is scripted; outcomes come from a lookup of about eight pre-animated runs. No live AI tools are used with children; staff note age limits if real tools come up (check each tool's terms; to verify).
- **Gentle consequences:** splashes, spinning and a black flag; nothing is hurt; ducks and sheep are never hit.
- **Fair play by design:** every team's rivals are identical; any help for younger groups is shown on screen ("No hidden help"). Tokens, not sweets, in the warm-up.

## 12. Build notes
- **Scenes:** Pebble Ring circuit, Training Garage montage, Thunder Ridge, Mirror Island, Dial Strip, Team Ghost, podium, Racing Licence.
- **Scripted AI responses:** all lines are in the section 5 table and Patch It; the dial lines and B/C lines follow research `07-ai-racing.md`, §6.3.
- **Reuse from the trailer:** toon kart track, start lights and countdown, boost pads, reward cards with VAGUE tag, Sprocket card, Stars/Laps pills, the new reward recipe card, HUD, mini-map, podium, Racing Licence, title card.
- **Open questions:** remove "?" item boxes from the build to avoid Mario Kart resemblance; test whether 8-year-olds can read Stars and Laps together without the facilitator; decide whether race day uses three or six teams.
