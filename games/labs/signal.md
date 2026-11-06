# Clear Signal: design document

> Strand: First concept (warm-up) · Ages: 8–14 · Session: 45 / 60 / 90 min (core use: a 10–15 minute warm-up or queue activity) · Trailer: `games/trailers/signal/` (`out/signal.mp4`)

## 1. Summary
A one-button rhythm runner. A courier robot runs across a chain of floating islands to the beat, and two instruction cards fly in before each gap or obstacle. The child taps the **clearest** card in time. Vague cards make the robot guess: faced with a low branch, "Duck!" gets "Duck! Getting you a duck." at 91% sure, and a big yellow duck appears in the robot's path; "Go up!" gets "Up! Going all the way up." at 88%, and the robot lands on a cloud. The child catches the mistake by looking at what is actually ahead (a branch, a 3-block gap), restarts in under a second, and picks the clear card ("Slide under the branch", "Jump the 3-block gap"). The attempt counter and best-progress bar climb until "Attempt 12 · 100%". They learn that short, vague words force an AI to guess, that the guess can be confident and silly, and that clear instructions plus quick retries are how you improve.

**Overlap with a client-request lab.** This overlaps with **Beat Block** (`games/trailers/dash/`, the "Geometry Dash-like repeat playability" request; design doc `games/labs/dash.md`): a neon one-button runner with an attempt counter, practice mode and a progress bar, where a co-pilot is "92% sure" and wrong ("Jump on the 4th beat!") until the player tells it to "Count along with the music first."

| | Clear Signal | Beat Block |
|---|---|---|
| Look | Shared voxel islands, dusk-to-night sky | Neon spikes, pulse rings, screen shake |
| What the child does | Picks the clearer of two instruction cards on the beat | Plays the run; corrects the co-pilot's beat-counting |
| AI lesson | Vague words cause literal guesses | A confident co-pilot can be wrong; give it a better method |
| Best for | Warm-ups and queues before any DeltaOps lab, ages 8–12, mixed abilities | Partners who want the rhythm-game genre look, gaming clubs, ages 10–14 |

## 2. Learning outcomes
- By the end, learners can choose the clearer of two instructions and say what makes it clearer (it names the action and the thing).
- By the end, learners can explain why "Duck!" made the robot fetch a duck: the word has two meanings and the robot picked one.
- By the end, learners can use what is on screen (the obstacle ahead) as evidence that a guess was wrong.
- By the end, learners can describe one unsure-but-right moment.
- By the end, learners can say how quick retries and a best-progress bar helped them improve, and that the attempts were learning, not failure.

**Curriculum links:** KS2 computing, "use sequence, selection, and repetition in programs" and logical reasoning ([DfE](https://www.gov.uk/government/publications/national-curriculum-in-england-computing-programmes-of-study/national-curriculum-in-england-computing-programmes-of-study)); KS2 music, "play and perform in solo and ensemble contexts" and "listen with attention to detail" ([DfE](https://www.gov.uk/government/publications/national-curriculum-in-england-music-programmes-of-study)); KS2 English spoken language, "give well-structured descriptions, explanations and narratives" ([DfE](https://www.gov.uk/government/publications/national-curriculum-in-england-english-programmes-of-study)). AI4K12 Big Idea 4 (natural interaction: language is ambiguous) ([RPF](https://www.raspberrypi.org/blog/ai-education-ai4k12-big-ideas-ai-thinking/)); UNESCO AI techniques, Understand level ([UNESCO](https://www.unesco.org/en/articles/ai-competency-framework-students)).

## 3. Real-world connection and careers
- **Air traffic controllers and pilots** use standard radio phrases so instructions cannot be misheard or misread; in the UK these are set out in the CAA's radiotelephony manual, CAP 413 (to verify the current edition at [caa.co.uk](https://www.caa.co.uk/)).
- **Stage managers** "call" lighting and sound cues with fixed wording and timing.
- **Game and level designers** tune difficulty and restarts. Geometry Dash's own settings restart "in 0.5 seconds instead of 1.0 second" with the faster-reset option, and show an attempt counter and progress bars ([Geometry Dash wiki: settings](https://geometrydash.wiki.gg/wiki/Settings); [pause menu](https://geometrydash.wiki.gg/wiki/Pause_Menu)).
- **Voice-interface designers** work on how assistants handle short, ambiguous commands.

## 4. Setting, look and characters
- **World:** a side-on chain of floating voxel islands with gaps of different widths, a tree with a long low branch, a hedge, a cloud above a gap, beat lights along the path, a finish arch, distant islands in parallax, a dusk-to-night sky with stars.
- **UI:** a best-progress bar with a "best so far" marker and %; the attempt counter; two cards arriving from the right on the beat (vague cards have a faint fog edge); a beat ring that pulses under the robot; white restart flashes; the end montage of tinted ghost attempts with red ✕ fail markers converging on the perfect run.
- **Courier bot:** a small round-cornered robot. Its helper card speaks in short literal lines: "Duck! Getting you a duck."
- **Name checks (web search, 5 November 2026; not a trademark search):** no children's game or company called "Clear Signal" found; nearest names were Mattel's "Crossed Signals" and an exhibit called "Signal Playground". "Signal" is also a well-known messaging app (amber: check before marketing). "Courier bot" is generic.

## 5. Core loop and structure
**Each run (60–90 seconds):** beat starts → card pairs arrive on the beat before each obstacle → tap the clearer card (or let it time out: the robot simply stops, no fail) → a vague card shows the helper's guess with % for a moment → the robot does the literal thing → crash or perfect move → restart in under a second at the start (or at a practice marker) → the progress bar keeps the best % → after the run, the montage shows every attempt. **No lives, no streaks, no speed score outside the run.** An assist tempo (slower music) carries no badge or label. The vague card is on the left (A) about half the time so children read, not memorise.

| Level | Goal | Cards (vague ✱) | AI's confident mistake | How children catch it | Clearer instruction | On screen |
|---|---|---|---|---|---|---|
| 1 Island Hop | Cross the first gap | A "Jump the 2-block gap" · B ✱ "Go!" | B → "Go! Running straight on." 86% | The robot runs off the edge; the gap is visible ahead | A | Perfect hop; beat lights flash |
| 2 The Branch | Pass under a low branch | A ✱ "Duck!" · B "Slide under the branch" | A → "Duck! Getting you a duck." 91% | A big yellow duck blocks the path; the branch is still there | B | Robot slides under the branch |
| 3 Cloud Gap | Cross a 3-block gap | A ✱ "Go up!" · B "Jump the 3-block gap" | A → "Up! Going all the way up." 88%; lands on the cloud, bounces off | The cloud is not the path; the gap is 3 blocks | B | Long jump, clean landing |
| 4 Small Step | A 1-block hop | A "Hop!" · B "Step over the 1-block bump" | **Unsure but right:** A → "Hop? Small jump, I guess. 57%." It is exactly right | The bump is small; the hop clears it | Either works; the facilitator points out the low % was still right | ✔ "Unsure and right" stamp |
| 5 The Hedge | Clear the hedge | A "Jump the hedge, land on the path" · B ✱ "Be careful." | B → "Careful means slow. Walking…" 84%; misses the beat, bumps the hedge | The beat ring passes; the hedge is tall | A | Smooth jump; "Attempt 12 · 100%" |
| 6 Your Card | Make a level for another team | Teams pick obstacle tiles and write a clear card and a vague card for each | The other team's vague card produces its scripted literal guess | The writing team predicts what the robot will do | The writers swap the vague card for a clear one | Montage of the other team's attempts |

## 6. Team roles
Clear Signal is played one child at a time on a device or in pairs, while the group watches.
- **Runner:** taps the cards.
- **Caller:** says the obstacle out loud before the cards arrive ("branch coming!"). Evidence: what's ahead.
- **Beat Keeper:** claps or taps the beat for the Runner (helps children who find timing hard).
- **Card Critic:** after a crash, says which word in the vague card caused the guess.
Rotate after each run or every two attempts.

## 7. Session plans

| Phase | 45 min (stand-alone) | 60 min (stand-alone with level making) | 90 min (warm-up inside a lab session) |
|---|---|---|---|
| Warm-up | 0–5: clap the beat together; "Duck!" game (the facilitator says "Duck!" and children choose: crouch or quack); honesty line | 0–5: same | 0–3: clap the beat |
| Play | 5–28: levels 1–5 in pairs, 3 runs each, rotating roles | 5–35: levels 1–5; 35–45: level 6 | 3–15: Clear Signal levels 1–3 (a capped number of runs); 15–70: the main lab (any DeltaOps lab) |
| Discussion | 28–38 (10 min) | 45–57 (12 min) | 70–85 (15 min, linking Clear Signal to the main lab) |
| Wrap-up | 38–45: exit check; montage | 57–60 | 85–90: exit check |

**Short of time:** levels 2 and 4 carry the lesson (confident and wrong; unsure and right). As a queue activity, cap at three runs per child and show a neutral "Ready for the lab?" screen, not "Play again?".

## 8. Assessment
- **Stars:** one per level for picking the clear card first time; one for saying why the vague card was vague; one for reaching the best-progress bar's previous mark. Never for speed.
- **Artefact:** a small "Clear Signal card" (print or on-screen for the facilitator): best %, attempts, "The word that confused the robot was ___", and "My clear version: ___".
- **Exit check:** 1. "The robot heard 'Duck!' and fetched a duck, 91% sure. Was it right?" (No; check what's ahead.) 2. "Which is clearer: 'Go up!' or 'Jump the 3-block gap'?" (The second.) 3. "You crashed 11 times. What did those tries do?" (Taught me; got me closer.)

| Criterion | 1 Emerging | 2 Secure | 3 Strong |
|---|---|---|---|
| Chooses clear cards | Random | Mostly clear | Chooses clear and explains why |
| Explains the guess | "It was silly" | Names the vague word | Explains the two meanings and which the robot chose |
| Uses evidence | Ignores the obstacle | Looks at the obstacle | Calls the obstacle before the cards arrive |
| Persistence and reflection | Gives up or blames | Retries | Uses the best-progress bar to describe improvement |

## 9. Discussion session (instructor-led, at the end of the lab)
**Length:** 10 / 12 / 15 minutes (shorter than other labs, because Clear Signal is a warm-up). Plan below is 12 minutes; for 10, drop questions 7 and 8; for 15, add question 9 and the radio example.

**Purpose.** *A word that seems clear to us ("Duck!") can mean two things to a machine. Clear instructions name the action and the thing. And trying again quickly, learning from each try, is how people and AI systems improve.*

**Set-up**
- Music off: "Robots, power down." Devices face down. The display plays the end-of-run montage once, then freezes on the duck frame.
- Children sit in a circle; the duck card and the branch card are in the middle.
- Materials: printed card pairs, a rubber duck (optional prop), sticky notes.
- Because energy is high after a rhythm game, start with 20 seconds of quiet breathing to the slowed beat.

**Structure (12 minutes)**

| Min | Step |
|---|---|
| 0–1 | Opening question |
| 1–3 | Pairs: questions 1–2 |
| 3–8 | Whole group: questions 3–6 |
| 8–10 | Questions 7–8 |
| 10–12 | Closing ritual |

**Opening question.** "Show me with your hands: what did the robot do when it heard 'Duck!'?" (Children mime a duck or a crouch; laughter is fine.)

**Core questions**
1. *Recall.* "What happened at the branch?"
   - Purpose: shared account.
   - Strong answer: "We picked 'Duck!' and it brought a duck, 91% sure, and crashed into the branch."
   - Probe: "Which card worked?"
2. *Reasoning.* "Why did the robot fetch a duck?"
   - Purpose: ambiguity.
   - Strong answer: "'Duck' means a bird and it means bend down. It picked the bird."
   - Probe: "Can you think of another word with two meanings?" (Bat, light, bark.)
3. *Reasoning.* "What makes 'Slide under the branch' clearer than 'Duck!'?"
   - Purpose: the parts of a clear instruction.
   - Strong answer: "It says the action and the thing: slide, under, branch."
   - Probe: "Make 'Go up!' clear in the same way."
4. *Confidence.* "It was 91% sure about the duck and 57% sure about the hop. Which was right?"
   - Purpose: % is not correctness.
   - Strong answer: "Sure and wrong about the duck, unsure and right about the hop."
   - Probe: "So what should we look at instead of the %?" (What's ahead.)
5. *Persistence.* "How did the progress bar change from attempt 1 to attempt 12?"
   - Purpose: crashes as learning; a growth framing without empty praise.
   - Strong answer: "It went from 0 to 37 to 94 to 100. Each crash showed me which card was the trap."
   - Probe: "What did you do differently on the run that worked?"
6. *Ethics and wellbeing.* "This game has no lives and no 'play again' pressure. Why might a game designer choose that?"
   - Purpose: notice design choices that respect players.
   - Strong answer: "So you don't feel bad, and you can stop when you want."
   - Probe: "Have you played games that make it hard to stop? How?"
7. *Transfer.* "When has a voice assistant, a parent or a friend misunderstood a short instruction from you?"
   - Purpose: everyday ambiguity.
   - Strong answer: "I said 'turn it up' and it turned up the lights, not the music."
   - Probe: "How would you say it so it couldn't be misunderstood?"
8. *Careers.* "Pilots and air traffic controllers use fixed phrases on the radio. Why?"
   - Purpose: clear signals as a professional skill.
   - Strong answer: "So nobody mishears an important instruction."
   - Probe: "What fixed phrase would you give the courier bot?"
9. *Link to the main lab (15-minute version).* "In the lab we're about to play, which vague words do you think will trip up the helper?"
   - Purpose: carry the habit forward.
   - Strong answer: "Words like nice, fast, good, careful."
   - Probe: "Hold your 'Clear Signal' hand up when you spot one."

**Sentence starters:** "The robot heard … and thought it meant …" · "A clearer card says … and …" · "It was … % sure, but what was ahead was …" · "My best % went up because …" · "A word with two meanings is …"

**Common misconceptions**
- *"The robot is stupid."* Respond: "It did exactly one meaning of the word. Which meaning did we want?"
- *"Short instructions are best."* Respond: "Short is good if it's still clear. 'Duck!' was short but had two meanings."
- *"Crashing means I'm bad at it."* Respond: "Twelve attempts is normal; the bar shows how each try helped."
- *"Very sure means it worked."* Respond: the duck at 91%.

**Differentiation**
- *Younger or less confident:* play on the assist tempo (no badge); the Beat Keeper claps; discuss with props (the rubber duck and a branch drawing).
- *Older or confident:* write card pairs for level 6 where the vague card is tempting but wrong; "Find three game instructions that would confuse the robot"; "Should the robot ask 'Which duck?' when it's not sure? What would that do to the rhythm?"

**Connecting to real life.** Aviation radio uses standard phraseology so that pilots and controllers understand each other exactly; the UK manual is the CAA's CAP 413 (to verify the edition before quoting). Ask: "If pilots used words like 'Go up!' instead of exact phrases, what could go wrong?" Keep the answer about clarity, not accidents.

**Closing ritual.** Everyone makes the "Clear Signal" hand sign (a flat hand like a signal flag) and says one clear instruction for the robot. Next step: "In the next lab, hold up your Clear Signal hand whenever you spot a vague word."

**Facilitator notes**
- *Exclusion:* one-button rhythm play can exclude children with motor or timing difficulties; offer the assist tempo, pair play (one taps, one calls), or the unplugged version without comment.
- *Frustration:* cap runs; praise strategy, not talent ("You read the branch early"); never compare individual scores.
- *Wellbeing:* no streaks, neutral end screen, a pause that keeps progress (ICO Children's Code guidance on breaks and nudges: [Standard 5](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/5-detrimental-use-of-data/), [Standard 13](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/13-nudge-techniques/)).
- *Photosensitivity:* keep restart flashes soft (the trailer uses a white flash; reduce it in the game and offer a no-flash setting).
- *Safeguarding:* follow the venue's policy; Childline 0800 1111 ([Childline](https://www.childline.org.uk/)).

## 10. Accessibility and inclusion
- Cards read aloud as they arrive (audio cue plus text); vague cards also carry a fog icon, not just a style.
- One large tap target per card, plus keyboard, switch and big-button controller support; no fine aiming.
- Assist tempo (slower music) available to anyone, unlabelled; practice markers.
- Captions for every helper line; music levels drop under speech; a no-flash, reduced-motion mode.
- **No devices:** a floor course of paper "islands" and obstacles; a facilitator holds up two cards on the beat; the child acts out the card they choose; the group decides whether the robot (another child) would do the literal thing.

## 11. Safety, ethics and data
- **Data:** none. Best % and attempts live only on the device for that session; no accounts, no leaderboard of named players.
- **Real AI tools:** the courier bot is scripted; say so once.
- **Gentle consequences:** a duck appears, a cloud bounces; the robot never "dies"; restart under one second; no lives.
- **Replay ethics:** no "play again?" nudges, no random rewards, a neutral finish screen, a capped number of runs in queue mode.

## 12. Build notes
- **Assets:** the trailer's island chain, branch tree, hedge, cloud, beat lights, finish arch, courier bot, ghost attempts and duck; progress bar, attempt counter, card pairs and kicker text. New: level 4 bump, level 6 tile editor (obstacle tiles plus two card slots), assist tempo, practice markers, reduced-flash mode.
- **Scripted lines:** "Go! Running straight on." (86%) · "Duck! Getting you a duck." (91%) · "Up! Going all the way up." (88%) · "Hop? Small jump, I guess." (57%) · "Careful means slow. Walking…" (84%).
- **Reuse:** the trailer's run model and attempt logic. The review scored pacing 1/2 for the trailer; the game's own pacing comes from the beat, so test it with children.
- **Open questions:** how many runs per child in queue mode (suggest three)? Should timing matter at all for ages 8–9, or should cards wait for the tap?
