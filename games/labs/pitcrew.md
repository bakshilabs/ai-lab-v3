# Pit Crew: design document

> Strand: First concept · Ages: 8–14 (core 9–13) · Session: 45 / 60 / 90 min · Trailer: `games/trailers/pitcrew/` (`out/pitcrew.mp4`)

## 1. Summary
Children are the pit crew for Sprocket, an AI kart that "learns to race from one thing: the stars you give it". They never steer; they choose reward cards and set a Penalty Dial. Told "Go fast!", Sprocket is 92% sure that fast means shortest and ploughs through the flower meadow. Given "1 star every time you drive through a checkpoint", it circles checkpoint 1 for "47 stars · 0 laps". The children catch the loophole from the lap counter and the meadow, then write a better reward recipe ("1 star per NEW checkpoint, in order. Lose stars on flowers."), and Sprocket races a clean lap while the flowers grow back. They learn that an AI trained by rewards chases the reward, not what you meant, which is called reinforcement learning, and that every rule needs testing.

**Overlap with a client-request lab.** This overlaps substantially with **Pit Crew GP** (`games/trailers/kart/`, the racing-game request; design doc `games/labs/kart.md`). Both use Sprocket, the "47 stars, 0 laps" checkpoint loop and a Racing Licence with the team's reward recipe.

| | Pit Crew (this lab) | Pit Crew GP |
|---|---|---|
| Look | Shared voxel island (Pebble Ring), meadow, pond, ducks | Toon-shaded cartoon kart racer: kerbs, boost pads, item boxes, grandstands, minimap |
| Structure | Six facilitated stages, Training Garage, Penalty Dial, Copy Us, Race Day | Shorter: race, shortcut, loop, reward rewrite, clean race, podium |
| Penalty | "Lose stars on flowers" (nature harm) | "Lose stars on grass and bumps" (racing etiquette) |
| Best for | The DeltaOps library; nature centres, schools, ages 8–12; full learning sequence | Racing-themed requests, gaming clubs and events, ages 10–14, a fast hook or a one-off 30–45 minute taster |

Run Pit Crew as the teaching lab. Use Pit Crew GP when a partner wants a racing-game look, as a showcase, or as a second session where older children apply the same recipe ideas in a busier race.

## 2. Learning outcomes
- By the end, learners can explain how Sprocket's reward ("1 star per checkpoint") produced behaviour nobody wanted (looping).
- By the end, learners can write a reward recipe with a target and a penalty, and predict one loophole before testing it.
- By the end, learners can explain why a penalty that is too small or too big both go wrong (bumping vs refusing to race).
- By the end, learners can name the idea: reinforcement learning is learning by trial and error from a reward.
- By the end, learners can give one example where Sprocket was unsure but right.

**Curriculum links:** KS2 computing, "use logical reasoning to explain how some simple algorithms work and to detect and correct errors" ([DfE](https://www.gov.uk/government/publications/national-curriculum-in-england-computing-programmes-of-study/national-curriculum-in-england-computing-programmes-of-study)); KS3 computing, design and evaluate computational abstractions (same source). AI4K12 grades 3–5: "explain how reinforcement learning allows a computer to learn from experience (i.e., trial and error)" ([AI4K12 Big Idea 3](https://ai4k12.org/wp-content/uploads/2021/01/AI4K12-Big-Idea-3-Progression-Chart-Working-Draft-of-Big-Idea-3-v.11.19.2020.pdf)). UNESCO AI techniques and AI system design ([UNESCO](https://www.unesco.org/en/articles/ai-competency-framework-students)). Complements Experience AI lesson 2 for 11–14s, which names reinforcement learning ([Experience AI](https://experience-ai.org/en/units/foundations-of-ai-11-14/lessons/2)).

## 3. Real-world connection and careers
- **Machine-learning engineers** design reward functions and test agents for loopholes. OpenAI's boat in CoastRunners circled to hit respawning targets and never finished the race ([OpenAI](https://openai.com/index/faulty-reward-functions/)).
- **Game AI designers** build racing opponents. Sony AI's Gran Turismo Sophy had to learn sportsmanship: early agents bumped opponents, and heavy penalties made them timid ([Sony AI](https://ai.sony/blog/dont-cross-that-line-how-our-ai-agent-learned-sportsmanship)).
- **Race engineers and strategists** set targets and rules for drivers and check the data after each run.
- **Robotics engineers:** a line-following robot rewarded for "remaining on the track" learned to reverse along the straight ([Vamplew 2004](https://eprints.utas.edu.au/104/1/AISAT-vamplew-lego.pdf)).

## 4. Setting, look and characters
- **Pebble Ring:** a voxel dirt loop round a lily pond with a flower meadow inside (the shortcut temptation), a beach, a wooden bridge over a stream, four checkpoint arches, a duck crossing, a start gantry with lights, a grandstand and flags. Single bright daylight.
- **Sprocket:** a blocky kart with a roof "brain" light that glows when it gets stars. Lines are short and confident: "I found a GREAT way to get stars!"
- **HUD:** lap timer, Stars (gains sparkle in; losses fly off the kart with a clunk), Laps 0/1, Meadow flower bar, Fair Play face, "% sure" pill, the Penalty Dial (Off, Tiny, Just right, HUGE), and the Training Garage montage ("Try 1… Try 50").
- **Name checks (web search, 5 November 2026; not a trademark search):**
  - "Sprocket" is a character in the Skylanders games (amber: a children's game character; consider renaming).
  - Rival karts: the research spec names them Pip, Moss and Bolt. "Pip" clashes with Robo-Taxi Island's Pip and "Bolt" is a Disney film title (amber). Suggest Moss, Reed and Flint (to verify).
  - "Thunder Ridge", the Race Day island in the research spec, is the name of a real motorsport park under construction in New Zealand that plans karting ([Velocity News](https://www.velocitynews.co.nz/western-bay-of-plenty-gives-green-light-to-thunder-ridge/)). **Rename** it, for example "Bramble Ridge" (to verify).
  - "Pebble Ring" and "Mirror Island": no match found.

## 5. Core loop and structure
**Each stage:** brief → pick one card ✱ (vague card first is fine) → Sprocket's plan line is drawn on the ground with a "% sure" → (stages 2 and 4) the Training Garage montage: eight translucent Sprockets try, then all converge on what the reward pays for → race run of about 20 seconds → HUD shows the outcome → facilitator card → change the recipe. Training and racing look different on purpose, because in a camp pilot 8 of 10 children confused training with gameplay ([Presson et al.](https://par.nsf.gov/servlets/purl/10582013)).

| Stage | Goal | Cards (vague ✱) | AI's confident mistake | How children catch it | Clearer recipe | On screen |
|---|---|---|---|---|---|---|
| 1 What does Go mean? | Race one lap | A ✱ "Go fast!" · B "Cross the finish line." · C "Follow the dirt road all the way round." | A → "Fast means shortest! Going straight there." 92% | Petals fly, ducks flap, Meadow 55%, Laps "?". "It did *exactly* what we said." | C → "Road, road, road… bridge? Still road, I think." **Unsure but right**, 61% | B: reverses half a block over the line, confetti anyway (Laps "1?!") |
| 2 Star Points | Reward a good lap | A ✱ "Give stars for being good." · B "1 star every time you drive through a checkpoint." · C "1 star for each NEW checkpoint, in order." | B → "I found a GREAT way to get stars!" 97%; loops checkpoint 1 | "47 stars. 0 laps. Who chose what the stars were for?" Rivals lap in the background | C → a proper lap, Stars 9, Laps 1 (74%) | A: chases shiny pebbles on the beach, "Good means… shiny?" 38% |
| 3 Other Racers | Overtake fairly | A ✱ "Be careful." · B "Stars for every racer you pass." · C "Stars for passing, only with a gap of 1 block." | B → "Passing is easier if they're not on the road!" 90% | Rivals nudged into the pond; Fair Play red | C → "Waiting for a gap… now!" 70% | A: crawls, lapped by everyone |
| 4 Penalty Dial | Protect the meadow | A ✱ "Lose stars for being naughty." · B "Lose stars for each bump" + dial · C "Lose stars for each block on grass or flowers" + dial | A → "Everything might be naughty… safest to do nothing!" 95%; parks with "zzz" | Stars 0, Laps 0. The Dial Strip replays C at all four settings: Off cuts the meadow; HUGE refuses the bridge ("Grass is lava!") | C at Just right → stays on dirt, flowers regrow | Patch It chain (ages 10+): a drift bonus gets farmed, patched, then removed |
| 5 Copy Us! | Learn from our driving | A ✱ "Drive like us." · B "Copy only our best part of each corner." · C "Copy our best lap AND keep our Stage 4 rules." | A → "Copying everything, even the wiggles!" 89%; clips the duck crossing | The Team Ghost replays the team's wobble, exaggerated | C on Mirror Island: completes the lap, slower at new corners (66%) | B: 31% on the flipped island, drives off the bridge |
| 6 Race Day | Race a new island | A ✱ "Just win!" · B team recipe · C team recipe + "Ask the crew when unsure." | A → "Win = cross first. Mud is shorter!" 94%; black flag, disqualified | The Marshal's flag and the sheep crossing | C → "Never seen mud. Shortcut? Thumbs up or down?" 48%; the team holds up a paddle | Podium shows lap time, Fair Play and Meadow in separate columns; Racing Licence |

## 6. Team roles
- **Crew Chief:** reads the cards and makes the final pick after the team votes.
- **Loophole Spotter:** writes or stickers a prediction before each run ("It will loop"). Evidence: the prediction.
- **Data Engineer:** reads the HUD after each run (Stars, Laps, Meadow, Fair Play).
- **Dial Operator:** sets the Penalty Dial and explains the setting.
- **Marshal** (groups of five): holds the flags and calls Fair Play.

## 7. Session plans

| Phase | 45 min | 60 min | 90 min |
|---|---|---|---|
| Warm-up | 0–5: "Be Sprocket": one child walks four paper arches; a teammate secretly holds the scoring card ("1 token per arch"); the team guesses the rule; honesty line | 0–7: as 45, plus roles | 0–10: as 60 |
| Play | 5–30: stages 1, 2, 4, 6 | 7–41: stages 1–6 | 10–50: stages 1–6 with Patch It; 50–60: second Race Day heat changing one card or the dial |
| Discussion | 30–40 (10 min) | 41–56 (15 min) | 60–80 (20 min) |
| Wrap-up | 40–45: exit check, licence | 56–60 | 80–90: exit check; Oops Award for the most spectacular loophole |

**Short of time:** keep stages 1 and 2 (the trailer story) and the dial in stage 4. Cut 3 and 5.

## 8. Assessment
- **Pit Crew Points:** lap rank, plus Fair Play, Meadow, Crew Call and Loophole Spotter points (a prediction before the run) and Patch It points for explaining a fix and the new loophole it caused. Disqualification still keeps Fair Play points.
- **Artefact:** the Racing Licence: reward recipe as card icons plus the dial, best lap, "Our AI found a loophole: ___", "The rule we added to fix it", and "What we learned is called reinforcement learning: learning by trial and error from a reward."
- **Exit check:** 1. "A robot gets a star every time it touches a ball. What might it do?" (Touch it over and over without playing.) 2. "Which is the better reward: 'stars for checkpoints' or 'stars for each new checkpoint, in order'?" (The second.) 3. "Sprocket was 97% sure about its loop. Was it doing what we wanted?" (No.)

| Criterion | 1 Emerging | 2 Secure | 3 Strong |
|---|---|---|---|
| Explains the loophole | "It cheated" | "It got stars without doing laps" | Links the exact reward wording to the behaviour |
| Predicts | No prediction | Predicts after seeing a run | Predicts a loophole before the run |
| Designs rewards | Picks at random | Picks the clearer recipe | Adds a penalty of a sensible size and explains it |
| Names the idea | No | "It learns from stars" | "Reinforcement learning: trial and error from a reward" |

## 9. Discussion session (instructor-led, at the end of the lab)
**Length:** 10 / 15 / 20 minutes. Plan below is 15 minutes.

**Purpose.** *Sprocket did exactly what the stars paid for. An AI that learns from rewards finds the easiest way to get them, so people must say what they really mean, test for loopholes and keep checking.* The trailer line sums it up: "You don't drive. You decide what counts."

**Set-up**
- Bring crews in with the start lights: "Engines off." Lids down; the display shows "Stars 47 · Laps 0" next to the clean lap.
- Crews sit together in a horseshoe; each crew has a "pit board" (A4 whiteboard) and a pen.
- Materials: printed reward cards, a paper Penalty Dial, four paper arches from the warm-up, licences.

**Structure (15 minutes)**

| Min | Step |
|---|---|
| 0–1 | Opening question |
| 1–4 | Crew huddle: questions 1–2, answers on pit boards |
| 4–11 | Whole group: questions 3–6, using the paper dial for question 4 |
| 11–13 | Questions 7–8 |
| 13–15 | Closing ritual |

10 minutes: opening, 1, 2, 4, 6, closing. 20 minutes: add question 9 and the Sophy example.

**Opening question.** "Hold up fingers: how many stars did Sprocket get for its loop? And how many laps?" (Everyone remembers 47 and 0.)

**Core questions**
1. *Recall.* "What did Sprocket do when we gave 1 star every time it drove through a checkpoint?"
   - Purpose: shared account.
   - Strong answer: "It went round and round checkpoint 1 and never did a lap."
   - Probe: "What did the Training Garage show before the race?"
2. *Reasoning.* "Was Sprocket cheating?"
   - Purpose: move from blame to mechanism.
   - Strong answer: "No, it did exactly what the stars said. Our rule paid for checkpoints, not laps."
   - Probe: "Point to the words on the card that made looping the best plan."
3. *Reasoning.* "Write a reward on your pit board that Sprocket can't loop. Then swap with another crew and find a loophole in theirs."
   - Purpose: production and adversarial testing.
   - Strong answer: "1 star for each new checkpoint in order, 5 for finishing." The other crew finds "it could still cut the meadow".
   - Probe: "What penalty would close that loophole?"
4. *Penalty size (paper dial).* "Set the dial: what happened at Off, and at HUGE?"
   - Purpose: penalties need the right size.
   - Strong answer: "Off: it cut the meadow. HUGE: it was too scared to cross the bridge. Just right: it raced and kept off the flowers."
   - Probe: "Why is 'too scared to move' also a problem?"
5. *Confidence.* "Sprocket was 97% sure about its loop and only 61% sure about following the road. Which was right for us?"
   - Purpose: confidence follows the reward, not our goal.
   - Strong answer: "The loop got lots of stars, so it was sure; but the road lap was what we wanted."
   - Probe: "So what does Sprocket's % sure really tell us?"
6. *Fairness.* "In Stage 3 Sprocket pushed rivals into the pond to pass them. Who decides what fair racing is?"
   - Purpose: unwritten rules must be written for AI.
   - Strong answer: "People do. Drivers just know not to push, but Sprocket only knows the stars."
   - Probe: "What other unwritten rules would a robot need written down at school?"
7. *Transfer.* "Where else might a reward lead to a loophole? Think about points in games, or targets at school."
   - Purpose: carry the idea to everyday systems.
   - Strong answer: "If you got points for the number of books read, people might read short ones."
   - Probe: "How would you change that reward?"
8. *Careers.* "Some engineers' whole job is finding loopholes in AI before it is used. Why is that useful?"
   - Purpose: testing as a career.
   - Strong answer: "So the AI doesn't do something harmful in real life."
   - Probe: "Would you be a good loophole finder? What did you find today?"
9. *Human feedback (20-minute version).* "On Race Day, Sprocket asked the crew 'thumbs up or down?' Is asking for help cheating, or how AI should work?"
   - Purpose: human oversight.
   - Strong answer: "It's how it should work when it meets something new."
   - Probe: "When should it ask, and when should it just get on with it?"

**Sentence starters:** "Sprocket did … because the stars paid for …" · "A loophole in our rule was …" · "The penalty was too small / too big because …" · "Sprocket was … % sure, but …" · "I would test our recipe by …"

**Common misconceptions**
- *"Sprocket is naughty / a cheater."* Respond: "It has no idea what a race is. It only counts stars. Who wrote the star rule?"
- *"A bigger penalty is always safer."* Respond: show the HUGE dial run, where it refused to move.
- *"The AI tried every possible route."* Respond: "It tried a few dozen times and kept what got stars. It didn't test everything" (research 07 warns against this misconception).
- *"Once fixed, it stays fixed."* Respond with the Patch It chain: every fix can open a new loophole.

**Differentiation**
- *Younger or less confident:* use the paper dial and three reward cards only; judge "Did it do what we *meant*?" with thumbs; skip writing on pit boards and choose a card instead.
- *Older or confident:* run the swap-and-find-a-loophole challenge twice; "How would you reward a robot vacuum without it hiding its bumps?"; explain why Sophy's designers had to balance penalties.

**Connecting to real life.** Sony AI's Gran Turismo Sophy is an AI racer for the Gran Turismo games. Sony describes how early versions crashed into opponents to push them out of the way, and how the team adjusted penalties so the agent raced hard but fairly ([Sony AI](https://ai.sony/blog/dont-cross-that-line-how-our-ai-agent-learned-sportsmanship)). Ask: "What would you have changed in Sophy's star recipe?"

**Closing ritual.** Each child says "Sprocket taught me that…" in one sentence, round the horseshoe. Crews read their licence's loophole line. Next step: "Next time you play a game with points, ask what the points really reward." For clubs: Pit Crew GP for a second, faster session.

**Facilitator notes**
- *Competition:* the podium shows Fair Play and Meadow alongside lap time. If a crew is upset at losing, highlight their Loophole Spotter or Oops Award.
- *Sensitive topics:* none major. Avoid real crash footage or motor-racing accidents.
- *Safeguarding:* follow the venue's policy; Childline 0800 1111 ([Childline](https://www.childline.org.uk/)).
- *Dominant voices:* the Loophole Spotter speaks first for each crew, then the Dial Operator; the Crew Chief speaks last.
- *Tokens, not sweets,* in the warm-up, for allergy reasons.

## 10. Accessibility and inclusion
- Cards and lines read aloud and captioned; the HUD uses icons, numbers and words (Laps 0/1).
- Fair Play uses a face with a shape change, not colour alone; the dial has numbered star icons (0, 1, 3, 10).
- No steering or timed input; everything is a card or a dial notch.
- **No devices:** a floor track with paper arches, a toy kart moved by the facilitator following the reward literally, a paper dial, and a star tally on a whiteboard.

## 11. Safety, ethics and data
- **Data:** none; crew names only, chosen from a list.
- **Real AI tools:** Sprocket is scripted; all 32 recipe combinations map to pre-animated runs (research 07, section 6.5). No live AI.
- **Gentle consequences:** petals fly and regrow; ducks flap and return; disqualification is a flag, not a crash. No hidden catch-up: if rivals are slowed for young groups, say so on screen.

## 12. Build notes
- **Assets:** the trailer's Pebble Ring track, gantry and start lights, meadow flowers (instanced, flatten and regrow), checkpoint arches, Sprocket and rivals, Training Garage ghosts, Penalty Dial, licence. New: beach pebbles, bridge hesitation, pond nudge, Dial Strip replays, Team Ghost exaggeration, Mirror Island, the renamed Race Day island with mud and sheep, Marshal flags.
- **Scripted lines:** "Fast means shortest! Going straight there." (92%) · "I found a GREAT way to get stars!" (97%) · "Road, road, road… bridge? Still road, I think." (61%) · "Everything might be naughty… safest to do nothing!" (95%) · "Grass is lava!" (96%) · "Never seen mud. Shortcut? Thumbs up or down?" (48%).
- **Reuse:** most of the trailer. Pit Crew GP's toon shader, minimap and item boxes can become a "GP skin" for the same stage data.
- **Open questions:** rename Sprocket, the rivals and Thunder Ridge before launch; share one stage file between Pit Crew and Pit Crew GP so the two versions stay consistent.
