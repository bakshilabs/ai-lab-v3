# Beat Block: design document

> Strand: Client request · Ages: 8–14 · Session: 45 / 60 / 90 min · Trailer: `games/trailers/dash/` (`out/dash.mp4`)

## 1. Summary
Beat Block is a one-button rhythm runner: a neon cube races along a track in time to music, and one tap makes it jump. An AI timing helper (working name **Tempo**; the trailer calls it "Co-pilot") watches earlier jumps and calls the next one. It is 92% sure: "Jump on the 4th beat!", because the last three jumps were on beat 4. This time the spike is on beat 3, and the cube crashes. Children catch the mistake by counting the beat aloud, watching the beat ruler and replaying the crash. Then they give Tempo a clearer instruction: "Count along with the music first." Tempo answers "Jump on beat 3. I counted." and is only 76% sure, but right. Children learn that an AI that spots patterns assumes they will continue, and that "very sure is not the same as right". They also learn that lots of short, low-stakes tries are how people (and AI) get better.

## 2. Learning outcomes
- By the end, learners can explain that the AI predicted the next jump from earlier ones, and why that failed when the pattern changed.
- By the end, learners can use evidence (counting, the beat ruler, the crash replay) to show where a prediction went wrong.
- By the end, learners can rewrite a vague cue ("Jump now!") as a clear one ("Jump on beat 3, after the second spike").
- By the end, learners can say why a 92% sure call was wrong and a 76% sure call was right.
- By the end, learners can describe how their attempts improved, using the best-progress bar rather than "I'm bad at it".

**Curriculum and framework links**
- **KS2 computing:** "use logical reasoning to explain how some simple algorithms work and to detect and correct errors in algorithms and programs" (to verify exact wording) ([National Curriculum computing](https://www.gov.uk/government/publications/national-curriculum-in-england-computing-programmes-of-study/national-curriculum-in-england-computing-programmes-of-study)).
- **KS2/KS3 music:** pulse, rhythm, tempo and changes of metre (to verify statement wording in the music programme of study).
- **KS3 maths:** sequences and patterns; when a pattern rule stops holding.
- **NGSS:** 3-5-ETS1-3 (fair tests in which failure points are considered).
- **UNESCO AI Competency Framework** ([UNESCO](https://www.unesco.org/en/articles/ai-competency-framework-students)): AI techniques and applications (Understand).
- **AI4K12:** Big Idea 3 (learning: predicting from patterns in data).

## 3. Real-world connection and careers
- **Game designers and level designers** build levels around the music and test them hundreds of times. **Game testers (QA)** replay sections to find where players fail. **Music producers and audio engineers** work with tempo and beat grids. **Data scientists** build models that predict the next value in a series, and test where those predictions break.
- **How professionals use AI:** prediction systems (text suggestions, music recommendations, weather forecasts) all assume that what usually happened before will happen again. Professionals test them on cases where the pattern changes. Weather forecasters publish a "% chance of rain" so people can judge the risk themselves (Met Office explanation of rain probability: to verify the exact page before citing).
- **Replay design in real games:** Geometry Dash restarts about one second after a crash, shows an attempt counter and has a separate practice mode with checkpoints ([Geometry Dash Wiki: Settings](https://geometrydash.wiki.gg/wiki/Settings); [Practice Mode](https://geometrydash.wiki.gg/wiki/Practice_Mode)). Beat Block uses the same ideas with its own look.

## 4. Setting, look and characters
- **Visual style:** neon on dark: a glowing cyan cube, magenta spikes, yellow jump pads, pulse rings on every beat, light screen shake that can be switched off. Original shapes, colours and music; nothing taken from Geometry Dash. The trailer's title is "BEAT BLOCK: One button. Every try teaches you the beat."
- **Track:** short levels of 30–60 seconds on floating platforms, with a progress bar at the top, an attempt counter, a beat ruler (numbered 1·2·3·4 ticks under the track) and a "PRACTICE MODE" banner with green diamond checkpoints.
- **AI helper:** **Tempo** (working name; replaces the trailer's "Co-pilot", which is too close to Microsoft's Copilot brand). A rounded speaker-shaped robot in a "TEMPO'S GUESS" card. Short, punchy lines: "Jump on the 4th beat!" Confidence as words, bar and number: "Very sure · 92%". It says "I counted" and "my guess", never "I feel".
- **Fictional names (to check before release):** Beat Block, Tempo, the level names (First Beat, Pattern Trap, Speed Shift, Look-alikes, Quiet Bit, Your Beat). "Beat Block" and "Tempo" are common words: check app stores and trade-mark registers for clashes.

## 5. Core loop and structure
**Act structure in every level (about 5–6 minutes)**
1. **Listen:** the level's music plays once with the track visible; the group claps the beat.
2. **Instruct:** the group picks one of three instruction cards for Tempo.
3. **Guess:** Tempo shows its call and "% sure" before each tricky section.
4. **Run:** the Runner taps. A crash restarts in about one second. The attempt counter goes up; nothing is lost.
5. **Check:** the crash replay slows down over the beat ruler. The group says where the call was wrong.
6. **Fix:** a clearer card; Tempo re-calls; practice mode if wanted; then a full run.

**Replay rules:** no lives, no timers outside the run, no streaks. The team's best-% bar only goes up. Every run ends with a 3-second montage of ghost attempts. An "assist tempo" (slower music) carries no badge. A run cap of about six full attempts per level keeps the session moving.

| Level | Goal | Real decisions (options) | AI's confident mistake | How children catch it | Clearer instruction | On screen |
|---|---|---|---|---|---|---|
| 1. First Beat | Clear a simple 4-beat level | A "Jump when it looks right." · B "Jump on every spike." · C "Jump on beat 4 each bar." | None: Tempo is right ("Beat 4 each bar", 85%). Builds a track record | Beat ruler matches | — | Clean run; ✔ on Tempo's record |
| 2. Pattern Trap | Clear a bar where the spike moves to beat 3 | A "Keep doing what worked." · B "Go!" · C "Count along with the music first." | A → "Jump on the 4th beat!" **92%** | Crash on beat 3; replay shows the spike on the ruler at 3; group counts "1·2·3·JUMP" | C → "Jump on beat 3. I counted." **76%** | Caption "Very sure is not the same as right." Full run passes |
| 3. Speed Shift | Survive a tempo change halfway | A "Same as before." · B "Faster!" · C "Listen for the drum change, then count again." | A → "Same gaps as before." **88%** (tempo doubles) | Pulse rings speed up; crash replay shows jumps landing early | C → "Drums changed. New count." **80%** | Ruler ticks squeeze closer after the change |
| 4. Look-alikes | Two obstacles look alike; one is a tall block you must wait under | A "Spikes mean jump." · B "Be careful." · C "Jump only on red spikes; wait under blue arches." | A → "Spike shape! Jump!" **90%** (it's an arch) | The Spotter's legend card: arch has a gap and a blue outline | C | Cube passes under the arch |
| 5. Quiet Bit | Cross a section where the music drops out | A "Follow the music." · B "Guess." · C "Keep counting when it's quiet." | A → "No beat. Waiting…" (cube stops and falls) **70%** | Group's own counting keeps going; replay shows the missed jump | C → "Can't hear the beat. I'll keep your count: jump on 3." **48%** (unsure but right) | Silent section lit by the group's claps on screen |
| 6. Your Beat | Make a level for another team | Build an 8-step pattern from tiles and write one cue card | Tempo guesses the other team's level from the first two bars **85%**, wrong when the pattern changes | The other team's playtest and the beat ruler | Teams improve their cue card so a new player passes on the first or second try | Montage of both teams' ghosts converging |

**"Unsure but right" moment:** Level 5. Tempo says "I can't hear the beat. I'll keep your count: jump on 3. 48% sure." It is right. Level 2's "76% sure" is the first, smaller example.

## 6. Team roles
Rotate after every **full run** so each child gets a turn with the button.

| Role | Does | Holds |
|---|---|---|
| **Runner** | Taps the button (or space bar, switch, clap sensor) | The button |
| **Beat Counter** | Counts "1·2·3·4" aloud and claps the beat | Beat card with the bar drawn out |
| **Spotter** | Calls out obstacles before they arrive | Obstacle legend (spike, arch, pad, gap) |
| **Coach** | Chooses Tempo's instruction card and reads it aloud | The card set |
| **Recorder** | Logs each attempt's best % and what changed | Attempt log sheet |

## 7. Session plans
**45 minutes** (Levels 1, 2, 3 and 5)

| Min | Activity |
|---|---|
| 0–4 | Warm-up: clap the beat; "Stand up on beat 3" game. Honesty line: "Tempo is pretend. We wrote its calls." |
| 4–7 | Demo Level 1 and the instant restart |
| 7–31 | Levels 1, 2, 3 and 5 (about 6 minutes each, role rotation each full run) |
| 31–43 | Discussion session (12 min) |
| 43–45 | Exit check |

**60 minutes**

| Min | Activity |
|---|---|
| 0–5 | Warm-up and roles |
| 5–40 | Levels 1–5 |
| 40–43 | Watch the team montage of all attempts |
| 43–58 | Discussion session (15 min) |
| 58–60 | Exit check; Beat Card |

**90 minutes**

| Min | Activity |
|---|---|
| 0–6 | Warm-up |
| 6–45 | Levels 1–5 |
| 45–65 | Level 6: build a level, write a cue card, swap, playtest |
| 65–85 | Discussion session (20 min) |
| 85–90 | Exit check; Beat Card |

**Short of time:** keep Levels 2 and 5 (the confident mistake and the unsure-but-right moment). Use Beat Block as a 10-minute warm-up for another lab, playing Level 2 only, with a 5-minute mini-discussion (questions 1, 3 and 5).

## 8. Assessment
- **Stars** per level: ★ the group named Tempo's mistake, ★★ they chose or wrote the clearer cue, ★★★ they predicted the crash point before the replay. No stars for speed, attempts or perfect runs.
- **Artefact:** the **Beat Card**: the team's best-% bar for each level, the montage still, Tempo's ✔/✘ record with its % sure, and "Our clearest cue: ____".
- **Exit check:**
  1. "Tempo said 'Jump on the 4th beat!' 92% sure, and was wrong. Why did it think that?" (The last jumps were on 4; it assumed the pattern would repeat.)
  2. "Which cue is clearer: 'Jump now!' or 'Jump on beat 3, after the second spike'?" (The second.)
  3. "Tempo is 48% sure. What should you do?" (Check it, e.g. by counting; don't ignore it.)
- **Facilitator observation rubric**

| Criterion | Emerging | Secure | Strong |
|---|---|---|---|
| Explains the AI's guess | "It glitched" | "It used the old pattern" | Names what changed and why the pattern rule failed |
| Uses evidence | Watches the crash | Points to the beat ruler | Counts aloud and predicts the crash point |
| Writes clear cues | Picks a card | Adds a number or landmark | Writes a cue that a new player can follow first time |
| Handles failure | Frustrated, wants to stop | Retries | Talks about the best-% bar and what each try taught |

## 9. Discussion session (instructor-led, at the end of the lab)
**Purpose:** an AI that learns from patterns assumes the pattern will continue. Being very sure doesn't make it right. Clear, specific instructions and checking with your own evidence (counting) fix it. Trying again is how anyone improves.

**Set-up**
- Fade the music down and play the team montage of ghost attempts as the "last screen". Then say "Hands off the buttons," and close the lids.
- Sit in a circle on chairs or the floor, so children can clap and count together.
- Materials: a large printed beat ruler (1·2·3·4, two bars) on the floor or board, coloured counters for spikes, the Beat Cards, sticky notes.
- Timing: 12 / 15 / 20 minutes.

**Structure (15-minute version)**

| Step | Minutes | What happens |
|---|---|---|
| Opening question | 2 | Show of fingers |
| Re-enact the mistake | 3 | Place spikes on the floor ruler and clap it |
| Think–pair–share | 3 | Core questions 2–3 |
| Whole group | 5 | Core questions 4–8, choosing by time |
| Takeaway | 2 | Closing ritual |

**Opening question:** "Hold up fingers: how many tries did your team need on the Pattern Trap? Was the last try better than the first?" (Everyone can answer; it frames attempts as normal.)

**Core questions**
1. **(Recall) "What did Tempo tell you on the Pattern Trap, and what happened?"**
   - Purpose: re-establish the facts.
   - Strong answer: "It said 'Jump on the 4th beat!' and it was 92% sure. The spike was on 3, so we crashed."
   - Probe: "Let's clap it on the floor ruler. Where is the spike?"
2. **(Reasoning) "Why did Tempo think the 4th beat?"**
   - Purpose: name pattern-based prediction.
   - Strong answer: "All the jumps before were on 4. It copied the pattern, but the level changed."
   - Probe: "Was that a good guess from what it had seen? What did it *not* know?"
3. **(Reasoning: confidence) "Tempo was 92% sure and wrong, then 76% sure and right. How can that happen?"**
   - Purpose: separate confidence from correctness.
   - Strong answer: "The 92% was how sure it was that the pattern would repeat. After we said 'count first', it had less of a pattern to lean on, so it was less sure, but it had checked."
   - Probe: "Would you rather have a helper who is always very sure, or one who says when it isn't?"
4. **(Evidence) "What helped you catch the mistake: the replay, the beat ruler or counting out loud?"**
   - Purpose: value human checking.
   - Strong answer: "Counting out loud. When we counted, we could hear the spike was on 3."
   - Probe: "Which of those could you use without a screen?"
5. **(Confidence: unsure but right) "In the Quiet Bit, Tempo was only 48% sure. Should you have ignored it?"**
   - Purpose: guard against "unsure means wrong".
   - Strong answer: "No. It was right because it kept our count. Low % means check, not ignore."
   - Probe: "How did you check it?"
6. **(Transfer) "Where else does something guess what comes next from what happened before?"**
   - Purpose: connect to everyday prediction.
   - Strong answer: "Predictive text on a phone, video recommendations, weather forecasts, a goalkeeper guessing which way a penalty goes."
   - Probe: "When might the pattern suddenly change? What would you do then?"
7. **(Transfer: instructions) "Read your clearest cue. Why would a new player get it first time?"**
   - Purpose: articulate what makes an instruction clear.
   - Strong answer: "It says which beat and which obstacle: 'beat 3, after the second spike'."
   - Probe: "What vague word did you remove?"
8. **(Ethics and wellbeing) "Some games make you play again and again with streaks and prizes. Beat Block has no lives and no streaks. Is that fairer? Why?"**
   - Purpose: notice design choices that pressure players.
   - Strong answer: "Yes. You play again because you want to, not because you'll lose something. Our best % only goes up."
   - Probe: "How can you tell when a game wants you to keep playing for *its* sake rather than yours?"
9. **(Careers) "Game testers replay levels hundreds of times. What would you look for if your job was testing Beat Block?"**
   - Purpose: link replay to real work.
   - Strong answer: "Places where everyone crashes, and places where the music and the obstacles don't match."
   - Probe: "How is that like checking Tempo's calls?"

**Sentence starters**
- "Tempo assumed… because before that…"
- "It was very sure, but the evidence showed…"
- "We caught it by…"
- "Our cue was clearer because it said…"
- "I got better because each try…"

**Common misconceptions and responses**
- *"Tempo is broken / glitched."* → "It worked exactly as designed: it copied the pattern. What changed in the level?"
- *"92% means it'll be right 92 times out of 100 here."* → "It means it was very sure. Did the crash agree?"
- *"Unsure means wrong."* → "Quiet Bit: 48% and right. What do we do with an unsure call?"
- *"I'm just bad at it."* → "Look at your best-% bar. What changed between the first and last try?"
- *"Tempo can hear the music like we do."* → "Tempo is pretend and its calls were written in advance. Real timing AIs read the sound as numbers; they don't 'hear' or 'feel' it."

**Differentiation**
- **Younger or less confident:** do the floor ruler with bodies: children stand on numbers and jump on 3. Use either/or questions ("Was the spike on 3 or 4?"). Let them answer by clapping.
- **Stretch (11–14):** "How many examples should Tempo see before it's allowed to be 90% sure?" "Design a level that fools a pattern-copier but not a counter." "Is a pattern-copier ever *better* than a counter?"

**Connecting to real life**
Weather forecasts are predictions made from patterns in past data, and they are given with a percentage chance, for example a 70% chance of rain (to verify a Met Office explanation page before quoting). Ask: "If the forecast says 70% chance of rain and it stays dry, was the forecast wrong? What would you do with a 70%?" Link back: Tempo's % is the same kind of number. It tells you how sure, not what will happen.

**Closing ritual**
- Everyone claps the corrected bar together, "1·2·3·JUMP", then each child says one sentence: "Next time an app tells me what to do next, I'll…"
- **Next step:** at home, play a clapping pattern with someone and change it on purpose; see if they spot the change. In clubs: try Block Quest to design a level for someone else, or Pit Crew GP to train an AI racer.

**Facilitator notes**
- **Frustration:** one-button games can upset children who crash a lot. Normalise attempts ("Our record is 12 tries"), offer the assist tempo quietly, and praise strategy and checking, not speed.
- **Sensory needs:** flashing pulse rings and screen shake can be turned off; check with the venue for photosensitive epilepsy guidance and give a warning before play.
- **Safeguarding:** if children talk about gaming late at night or pressure to play, listen and pass any concern to the venue's DSL; don't give individual advice.
- **Dominant voices:** the button attracts the most confident child. The role rotation after every full run is non-negotiable; use "Beat Counter speaks first" in discussion.

## 10. Accessibility and inclusion
- **Reading level:** cue cards of 8 words or fewer, with icons; Tempo read aloud and captioned.
- **Deaf and hard-of-hearing players:** the beat is also visual (pulse rings, ruler ticks, flashing beat number).
- **Colour-blind-safe:** obstacles differ by shape and outline, not just colour.
- **Motor-friendly:** any big button, space bar, switch or clap input; assist tempo; generous timing; no double taps.
- **Photosensitivity:** "calm mode" with no flashes or shake.
- **No devices:** a body-percussion version with a floor ruler, spike counters and Tempo's calls read aloud.

## 11. Safety, ethics and data
- **Data collected:** none; attempts and best % live only in the session; no accounts, names or camera.
- **Age and real AI tools:** Tempo is scripted. No live AI tools are used. If real AI music tools come up, staff mention age limits and adult supervision (check each tool's terms; to verify).
- **Gentle consequences:** a crash is a soft pop and a one-second restart; nothing is lost.
- **Healthy replay:** no streaks, no lives, no random rewards, a cap on runs, natural breaks between levels, and neutral "play again?" prompts (ICO Children's Code Standards 5 and 13, as quoted in research `05-replayability.md`, §4.1).

## 12. Build notes
- **Scenes:** six short levels with music, beat ruler, progress bar, attempt counter, practice mode with checkpoints, crash replay with slow motion, montage, level builder for Level 6.
- **Scripted AI responses:** all Tempo lines are in the section 5 table; Level 6 needs a guess for each tile pattern (rule-generated: "same as bars 1–2", 85%).
- **Reuse from the trailer:** runner renderer, crash and restart, attempt counter, practice-mode banner, montage ghosts, the guess card, the "Count along with the music first" instruction card, title card.
- **Open questions:** rename "Co-pilot" to Tempo in the trailer and lab; commission or synthesise original music; test the timing windows with 8-year-olds; decide whether Level 6's builder is on screen or on a paper 8-step strip.
