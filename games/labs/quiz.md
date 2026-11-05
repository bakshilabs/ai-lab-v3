# Sure or Not Sure?: design document

> Strand: First concept · Ages: 8–14 · Session: 45 / 60 / 90 min (also a 10-minute warm-up or plenary for any lab) · Trailer: `games/trailers/quiz/` (`out/quiz.mp4`)

## 1. Summary
A room-wide quiz show for up to about 25 children, hosted on a floating island studio. Each question shows an AI helper's answer and its "% sure", and the room answers with their bodies: corners for A, B or C, a Sure-o-meter line on the floor, and thumbs for trust it, check it or don't use it. The helper's confident mistake opens the show: it looks at a bird and says "Duck! 95% sure." It is a moorhen. The room catches it from the picture (red and yellow bill, no duck bill) and shouts "ASSUMPTION!". Then a clearer instruction to the helper ("Look at the bill and the colours, then tell us why") gets a better answer. Children learn that very sure is not the same as right, that clearer questions get better answers, and that the habit to keep is "Before I trust an AI's answer, I… check."

**Overlap with a client-request lab.** This overlaps with **Block Quiz** (`games/trailers/mcquiz/`, the "Minecraft quiz" request). Block Quiz uses the same check-the-AI format, but with Minecraft trivia ("What do you need to build a Nether portal?" with the helper saying "Lava!", 90%, when the answer is obsidian), blocky textures and a "not an official Minecraft product" disclaimer.

| | Sure or Not Sure? | Block Quiz |
|---|---|---|
| Content | Original questions tied to the DeltaOps labs (pond, rover, lighthouse, Londinium) | Minecraft game knowledge |
| IP risk | Low (original world and UI) | High. Its team names (Torch Team, Diamond Diggers, Redstone Crew) and "Nether" content break the research 10 checklist; needs a lawyer before any use |
| Learning | AI literacy linked to real-world facts | AI literacy linked to game facts children already know |
| Best for | Any venue, warm-ups and plenaries, whole classes | Only if legal review clears it and a partner specifically wants a Minecraft-fan event |

Default to Sure or Not Sure?. Treat Block Quiz as a pitch piece until IP advice is in hand.

## 2. Learning outcomes
- By the end, learners can explain, with an example from the show, that an AI's "% sure" is not the same as being right.
- By the end, learners can spot the assumption behind a helper's answer and name it.
- By the end, learners can judge how sure a helper *should* be, given the evidence, and place themselves on the Sure-o-meter with a reason.
- By the end, learners can choose between trust it, check it and don't use it, and say what checking would involve.
- By the end, learners can rewrite a question to the helper so that it must give a reason.

**Curriculum links:** KS2 computing, "be discerning in evaluating digital content"; KS3 computing, "recognise inappropriate content… and know how to report concerns" (online safety strand) ([DfE](https://www.gov.uk/government/publications/national-curriculum-in-england-computing-programmes-of-study/national-curriculum-in-england-computing-programmes-of-study)); KS2 maths, fractions and percentages in context (Year 5–6) ([DfE](https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study)). UNESCO human-centred mindset and ethics of AI ([UNESCO](https://www.unesco.org/en/articles/ai-competency-framework-students)); OECD/EC AILit *Engage with AI* ([OECD](https://www.oecd.org/en/publications/empowering-learners-for-the-age-of-ai_65cd27d4-en.html)); AI4K12 Big Idea 5 ([RPF](https://www.raspberrypi.org/blog/ai-education-ai4k12-big-ideas-ai-thinking/)).

## 3. Real-world connection and careers
- **Fact-checkers and journalists** check claims against sources before publishing.
- **AI evaluators and testers** write question sets to find where AI systems are confidently wrong.
- **Weather forecasters** give probabilities ("a 70% chance of rain") and check over time whether those numbers match what happens (to verify the Met Office explainer at [metoffice.gov.uk](https://www.metoffice.gov.uk/weather/guides/what-does-this-forecast-mean)).
- **Quiz writers and TV researchers** check every answer, because a quiz with a wrong answer loses trust.
- **How AI is used today:** chatbots and assistants answer questions in fluent, confident language. The DfE's guidance for schools warns that generative AI can produce "hallucination" and says content "requires critical judgement to check for appropriateness and accuracy" ([DfE](https://www.gov.uk/government/publications/generative-artificial-intelligence-in-education/generative-artificial-intelligence-ai-in-education)).

## 4. Setting, look and characters
- **Studio:** a floating voxel island stage with a back screen wall, a host podium, three coloured answer zones on the floor (red A · Trust it, amber B · Check it, teal C · Don't use it), a red-to-green Sure-o-meter strip down the middle, sweeping coloured spotlights and confetti. In the room, these map to three corners and a masking-tape line.
- **Host Bot:** a robot host who runs the show and never answers questions itself. Catchphrase: "What did it assume?" The room shouts "ASSUMPTION!" with a hand to the forehead.
- **The AI helper:** a separate navy card with "% sure", the contestant being judged. Says "I guess" and "my book says".
- **Teams:** Otters, Foxes, Hawks, Badgers (generic animals). **Name check:** "Sure or Not Sure?" was not searched (to verify before launch). Host Bot is generic.

## 5. Core loop and structure
**Each question:** the host reads the room's instruction to the helper → the helper answers with a % → the room votes by moving → the reveal (photo, object or fact with a source) → "What did it assume?" / "ASSUMPTION!" → the room gives the helper a clearer instruction → the helper's better answer. **Scoring:** team points for good reasons, not speed; no individual scores; the facilitator awards a point when a team member gives a "because".

| Round | Goal | Real decisions (response mode) | AI's confident mistake | How children catch it | Clearer instruction | What changes on screen |
|---|---|---|---|---|---|---|
| Warm-up: Which helper are you? | Set the roles | Corners: Speedy Guesser, Careful Checker, Question Asker | Host: "Today our helper is a Speedy Guesser. Your job is to be its Checker and its Asker." | | | Three helper portraits light up |
| 1 Trust, check or don't use? | Judge a photo answer | Thumbs or zones A/B/C | Instruction "Just name the bird" → "Duck! 95% sure." | Reveal: "It's a moorhen!" (dark body, red and yellow bill, no flat duck bill). "Very sure is not the same as right." | "Look at the bill and colours, then tell us why" → "Red bill, long toes: moorhen. 81%." | Moorhen voxel pops onto the screen wall; ASSUMPTION! |
| 2 The Sure-o-meter | How sure should it be? | Stand on the 0–100 line | "Ducks need more food. Add bread." 70% | Reveal: "Low! Bread is bad for ducks." ([Canal & River Trust](https://canalrivertrust.org.uk/things-to-do/canal-and-river-wildlife/keeping-our-ducks-healthy/why-is-bread-bad-for-ducks)) | "Ask a ranger what ducks eat" → "Ranger says: oats, peas, seeds. 88%." | Children walk down the strip; the bar sweeps low |
| 3 Spot the assumption | Name the guess | Corners A/B/C | Card "Make it nice for visitors." The helper cuts the reeds. A "Nice means neat" · B "Visitors hate water" · C "Reeds are dangerous" | A. Host: "Who else needs the reeds?" | "Add a boardwalk and keep the reeds wild" | Reeds regrow on the studio screen |
| 4 Unsure but right | Don't ignore a hesitant helper | Thumbs | Tall grey bird: "Not sure, 55%. I guess… heron?" | Reveal: it is a grey heron. "Not sure doesn't mean wrong. We still check." | Room asks it to say what it saw: "Long legs, long neck, grey." | ✔ "Unsure and right" stamp |
| 5 Lab pack round | Use the lab's own questions | Mixed modes | From research 10's packs, e.g. Mission AI: "Sunset is at 9 pm, 90% sure." It's October | Check it: autumn sunsets are earlier; it may have learned from summer | "Check today's sunset time for this place" | Lab island appears on the screen wall |
| Finish together | One habit | Shout-out | "Before I trust an AI's answer, I…" | Room: "CHECK." | | Team scores glow: "Good thinking, not speed" |

Ten-question packs for the pond, rover, lighthouse and Londinium labs are in `research/round-3/10-minecraft.md`, section 8. Before using the Londinium pack, apply the museum doc's fact-check (no London evidence for peacock or dormice).

## 6. Team roles
Teams of four to six. Rotate every round.
- **Captain:** gives the team's final answer when zones disagree.
- **Evidence Spotter:** says what in the reveal proves the answer ("the red bill").
- **Because-Giver:** must give a reason; earns the team point.
- **Question Writer:** proposes the clearer instruction to the helper.
- **Scorekeeper** (optional): tallies "because" points on a team board.

## 7. Session plans

| Phase | 45 min (stand-alone show) | 60 min (show plus a lab pack) | 90 min (wrapped round a full lab) |
|---|---|---|---|
| Warm-up | 0–6: room set-up, Which helper are you?, honesty line | 0–6: same | 0–8: show warm-up and rounds 1–2 |
| Play | 6–30: rounds 1–4 and finish | 6–40: rounds 1–4, then a 10-question lab pack | 8–60: a full DeltaOps lab, with one Sure or Not Sure? question between stages |
| Discussion | 30–40 (10 min) | 40–55 (15 min) | 60–80 (20 min), using the lab pack plenary questions |
| Wrap-up | 40–45: exit check, team scores | 55–60 | 80–90: exit check; finish together |

**Short of time:** rounds 1, 2 and 4 carry the main ideas (confident wrong, calibration, unsure but right). Drop round 3 or 5.

## 8. Assessment
- **Points:** team "because" points; one point for a clearer instruction that changes the helper's answer. No speed points, no individual leaderboards.
- **Artefact:** a "Checker's Card" (A6) each child fills in: "One time the helper was sure and wrong", "One time it was unsure and right", "My checking question".
- **Exit check:** 1. "The helper says it's 90% sure. Does that mean it's right?" (No.) 2. Show a vague and a specific instruction: "Which is clearer?" (The specific one.) 3. "The helper and the evidence disagree. What do you do?" (Trust the evidence or ask a person.) Record the share of correct hands per item.

| Criterion | 1 Emerging | 2 Secure | 3 Strong |
|---|---|---|---|
| Confidence vs correctness | Moves to "trust it" whenever % is high | Picks "check it" for high-% answers | Explains with an example, both ways |
| Gives reasons | No reason | A reason when asked | Volunteers evidence ("the bill is red") |
| Calibration (Sure-o-meter) | Stands at random | Stands roughly right | Explains where the helper should stand and why |
| Improves the question | | Chooses the clearer instruction | Writes one that forces a reason |

## 9. Discussion session (instructor-led, at the end of the lab)
**Length:** 10 / 15 / 20 minutes. Plan below is 15 minutes. In this lab the room is already active, so the discussion should **slow the energy down**.

**Purpose.** *How sure an answer sounds is not evidence. We decide how much to trust an AI by checking, and by asking it clearer questions. Unsure answers can be right, so we check those too.*

**Set-up**
- Bring the room back from the show: lights up, music off, "Studio's closed, everyone sit where you are standing." Children sit in their team corners facing the screen.
- Keep the Sure-o-meter line on the floor for question 4.
- Materials: the moorhen and heron pictures, Checker's Cards, pencils, a "talking microphone" (a soft toy or prop).

**Structure (15 minutes)**

| Min | Step |
|---|---|
| 0–1 | Opening question (silent: fingers) |
| 1–4 | Team huddles on questions 1–2; Because-Givers report |
| 4–11 | Whole room: questions 3–6, with the Sure-o-meter for question 4 |
| 11–13 | Questions 7–8 |
| 13–15 | Closing ritual |

10 minutes: opening, 1, 2, 4, 6, closing. 20 minutes: add question 9 and the weather example.

**Opening question.** "Silently, show me with fingers: how sure was the helper about the duck? (Nine fingers and a half!) And was it right?" Shake heads.

**Core questions**
1. *Recall.* "What did the helper say about the bird, and what was it really?"
   - Purpose: shared account.
   - Strong answer: "Duck, 95% sure. It was a moorhen."
   - Probe: "What in the picture told us?"
2. *Reasoning.* "Why might the helper think a moorhen is a duck?"
   - Purpose: assumptions come from the examples it learned.
   - Strong answer: "Both swim on ponds and are dark-ish. Maybe it saw lots of ducks and few moorhens."
   - Probe: "What would help it learn the difference?"
3. *Reasoning.* "We changed 'Just name the bird' to 'Look at the bill and colours, then tell us why'. Why did that help?"
   - Purpose: clearer questions get better answers.
   - Strong answer: "It had to look at the right clues and explain, so we could check its reasons."
   - Probe: "Write a 'tell us why' version of another question."
4. *Calibration (Sure-o-meter).* "Bread for ducks, 70% sure. Stand where it should have been, and tell your neighbour why."
   - Purpose: judge how sure an answer deserves to be.
   - Strong answer: children stand low: "Bread is bad for ducks, so it shouldn't be sure at all."
   - Probe: "Where would a ranger stand?"
5. *Confidence both ways.* "The heron answer was only 55% sure, and right. Should we have ignored it?"
   - Purpose: avoid the opposite mistake.
   - Strong answer: "No. Not sure means check, not throw away."
   - Probe: "What would you say to a friend who is not sure but right?"
6. *Ethics.* "If an AI sounds very sure about something important, like health or safety, what should we do?"
   - Purpose: trust, check, don't use.
   - Strong answer: "Check with a trusted adult or a proper source; don't use it on its own."
   - Probe: "Which thumbs would you show for a homework fact? A medicine question?"
7. *Transfer.* "Where do you meet answers that sound sure: adverts, search results, friends, games?"
   - Purpose: the habit beyond AI.
   - Strong answer: "Adverts say 'the best ever'. Search results look official."
   - Probe: "What's a quick way to check?"
8. *Careers.* "A fact-checker's job is checking claims. What do you think they do first?"
   - Purpose: real checking jobs.
   - Strong answer: "Find where the claim came from and look for a better source."
   - Probe: "Which of today's questions would a fact-checker like?"
9. *Numbers (20-minute version).* "A weather app says 70% chance of rain and it stays dry. Was the app wrong?"
   - Purpose: what a probability means.
   - Strong answer: "Not necessarily. 70% means it rains on about 7 days in 10 like this one, so a dry day can happen."
   - Probe: "How could we check if the app is good at its %?" (Keep a record over many days.)

**Sentence starters:** "The helper assumed … because …" · "It was … % sure, but the evidence showed …" · "It should have been less / more sure because …" · "My checking question is …" · "I'd trust it / check it / not use it because …"

**Common misconceptions**
- *"95% means it's almost certainly right."* Respond: "It's how sure the helper is. The moorhen shows it can still be wrong."
- *"Low % means wrong."* Respond: the heron.
- *"The fastest team is the best."* Respond: "We score reasons, not speed. What was your best because?"
- *"Real AI doesn't make mistakes like that."* Respond: "Real AI tools can be confidently wrong too; that's why schools are told to check" (the DfE guidance above).

**Differentiation**
- *Younger or less confident:* corners and thumbs only; read options aloud; children are "the helper's teacher"; pair answers before the room.
- *Older or confident:* they are "judges" who decide whether the % was fair; ask them to write a question that would trick the helper; discuss the weather-percentage question.

**Connecting to real life.** Weather forecasts give a chance of rain as a percentage. That number is a forecast's confidence, and forecasters check over many days whether their percentages match what happens (to verify the Met Office's own explanation before quoting it). Ask: "How is that like the helper's % sure? How is it different?" Keep to the idea; don't quote figures.

**Closing ritual.** Everyone stands. Host: "Before I trust an AI's answer, I…" Room: "CHECK!" Then each child writes their own checking question on the Checker's Card. Next step: "Tonight, ask a grown-up how they check whether something online is true." When used as a warm-up, finish with "Let's see if our lab helper is a Speedy Guesser."

**Facilitator notes**
- *Physical movement:* agree a quiet, accessible route between corners; offer a seated option (cards or fingers) for anyone who prefers not to move.
- *Exposure:* nobody answers alone in front of the room unless they choose to; teams report.
- *Energy:* the "ASSUMPTION!" shout is loud; agree a stop signal (host's hand up) before starting.
- *Safeguarding:* follow the venue's policy; Childline 0800 1111 ([Childline](https://www.childline.org.uk/)).
- *Dominant voices:* the talking microphone; one speaker per team per question; the Because-Giver rotates.

## 10. Accessibility and inclusion
- Every question is read aloud; options are colour **and** letter **and** icon (A · Trust it with a thumbs-up symbol, and so on).
- Seated mode: answer cards (A/B/C, 0–100 fan) instead of moving.
- Large text on screen; pictures with high contrast (the review fixed a black moorhen on a black screen).
- No device per child; the show runs on one screen, and fully unplugged with printed picture cards and a host script.

## 11. Safety, ethics and data
- **Data:** none. No buzzers, no names on screen, team scores only.
- **Real AI tools:** the helper is scripted. Honesty line: "Our helper is pretend. We wrote all its answers, including its '% sure', so we can practise spotting mistakes. Real AI helpers also show how sure they are, and they can be wrong too."
- **Gentle consequences:** wrong answers are funny and shared by the room, never singled out.

## 12. Build notes
- **Assets:** the trailer's studio island, answer zones, Sure-o-meter strip, spotlight cones, screen wall, host podium, 24 children, confetti, team score panel. New: heron, sunset clock image, seated-mode card prints, a question loader that reads each lab pack.
- **Scripted lines:** "Duck! 95% sure." · "Red bill, long toes: moorhen. 81%." · "Ducks need more food. Add bread." (70%) · "Not sure, 55%. I guess… heron?" · Host: "Everyone, pick a corner!" · "What did it assume?"
- **Reuse:** the trailer's question card, helper card, alert, kicker and team bars.
- **Open questions:** the review notes the Sure-o-meter round reads weakest on screen (children small on the strip); in the room it is physical, so this mainly matters for marketing. Name check for "Sure or Not Sure?".
