# Robo-Taxi Island: design document

> Strand: First concept · Ages: 8–14 · Session: 45 / 60 / 90 min · Trailer: `games/trailers/robotaxi/` (`out/robotaxi.mp4`)

## 1. Summary
Children teach Pip, a little robo-taxi, to see by choosing which picture cards go into its Picture Book. Pip then drives the island and draws boxes round what it sees. Its confident mistake comes early: the farm scarecrow is "Person · Very sure 94%", so Pip brakes and the passenger's milkshake spills (a false alarm). The children catch it by comparing Pip's box with what is really there, then add better, more varied pictures (night, scooters, people who look or move differently) until Pip's guesses match the world. They learn that machine learning copies its examples, that who is missing from the data matters, and that "% sure" is not "% right".

**Overlap with a client-request lab.** This overlaps substantially with **Autopilot City** (`games/trailers/city/`, the "self-driving car in a city" request; design doc `games/labs/city.md`). Both teach object detection with confidence labels, a false alarm (Autopilot City: a billboard runner, "PERSON 91%") and a miss fixed by better data (a child behind a van, "? 41%" to 88%). The differences:

| | Robo-Taxi Island | Autopilot City |
|---|---|---|
| Look | Voxel island, cosy, shared DeltaOps style | Low-poly city with a lidar point-cloud view |
| Mechanic | Children build the training data (Picture Book cards) | Children watch detection and choose fixes |
| Tone | Gentle: hay bales and milkshakes, a safety robot | More realistic traffic, closer to real AVs |
| Best for | Ages 8–11, family days, first contact with ML | Ages 11–14, STEM clubs, KS3 computing, a follow-on session |

Use Robo-Taxi Island first; use Autopilot City as a second session or for older groups who want the "real car" feel.

## 2. Learning outcomes
- By the end, learners can explain that Pip only recognises things like the examples in its Picture Book.
- By the end, learners can tell a false alarm from a miss and say which costs more in a given situation.
- By the end, learners can identify who or what was missing from Pip's examples and choose pictures that fix it.
- By the end, learners can compare Pip's "% sure" with its ✔/✘ record and say why they differ, including one unsure-but-right case.
- By the end, learners can describe a rule for when a machine should ask a human ("under 60% sure, ask").

**Curriculum links:** KS2 computing, detect and correct errors; KS3 computing, understand how data is represented and used ([DfE](https://www.gov.uk/government/publications/national-curriculum-in-england-computing-programmes-of-study/national-curriculum-in-england-computing-programmes-of-study)); PSHE road safety (non-statutory). NGSS 3-5-ETS1-3, fair tests ([NGSS](https://www.nextgenscience.org/)). AI4K12 Big Ideas 1 (perception), 3 (learning) and 5 (societal impact) ([RPF](https://www.raspberrypi.org/blog/ai-education-ai4k12-big-ideas-ai-thinking/)); UNESCO AI techniques and ethics of AI ([UNESCO](https://www.unesco.org/en/articles/ai-competency-framework-students)).

## 3. Real-world connection and careers
- **Data labellers and annotators** draw boxes and choose labels for training images. The COCO dataset has 2.5 million labelled objects in 328,000 images, chosen to show objects in clutter rather than centred ([Lin et al.](https://arxiv.org/abs/1405.0312)).
- **Safety drivers and test engineers** ride in test vehicles and take over when needed; Marge plays that role.
- **Researchers testing robustness**: black and white stickers on a real stop sign caused misclassification in 84.8% of video frames captured from a moving vehicle in one study ([Eykholt et al.](https://arxiv.org/abs/1707.08945)).
- **How AI is used today:** automated vehicles use cameras and other sensors with trained detectors; companies run robotaxi services in some cities, and the UK passed the Automated Vehicles Act 2024 (to verify current pilot details at [legislation.gov.uk](https://www.legislation.gov.uk/ukpga/2024/10/contents)).

## 4. Setting, look and characters
- **Style:** first-concept voxel island with a tiny town: school crossing, bakery, duck pond inside the loop road, farm lane with a scarecrow, houses, garage, lighthouse road. Dawn, day, then a crisp readable night with headlights and fog. Overlay in the shared first-concept UI: kicker text, "PIP CAM · LEARNING MODE" view, bounding boxes with labels, a STOPPING/GOING pill.
- **Pip:** a small blocky taxi with a roof camera. Speaks in short lines: "My book says…", "I guess…". Never "I think" or "I feel".
- **Marge:** a safety-driver robot in the back with a big red button; when Pip would miss something, Marge stops the car gently.
- **Name checks (web search, 5 November 2026; not a trademark search):** "Pip" is also a character in Piper's Make Rover STEM kit, a related market (amber: consider a check or rename). "Marge" is a common first name with no conflicting robot character found (green). "Robo-Taxi Island" returned no match (to verify).

## 5. Core loop and structure
**Each stage:** brief → pick one card (the vague card's slot is shuffled C, B, C, A, C, B) → the Picture Book updates → Pip drives a short loop with boxes, a word band, a % and an intent pill → meters: Safe Trips, False Alarms (milkshake wobbles), Missed It (a soft hay bale bumped, Marge presses the button), Pip's Record ✔/✘ → facilitator card → retry. The % only changes after a card is played, so children see it comes from the book.

| Stage | Goal | Cards (vague ✱) | AI's confident mistake | How children catch it | Clearer instruction / better data | On screen |
|---|---|---|---|---|---|---|
| 1 Teach Pip to See | First drive | A "Put 3 person and 3 car pictures in Pip's book" · B "Add 3 person pictures only" · C ✱ "Teach Pip about things on the road" | All routes: the scarecrow → "Person · Very sure 94%". STOPPING. Milkshake spills | "False alarm! It's a scarecrow." Facilitator: "Pip said 94% sure. Was it right? What does '% sure' really measure?" | Add 2 scarecrow pictures labelled "not a person" | First ✘ on Pip's Record while it was very sure |
| 2 Who's Missing? | Drive past the school | A "Drive past the school and watch the %" · B ✱ "Make Pip better at people" · C "Add 2 pictures of people who look or move differently" | A → scooter rider: "Bicycle? 48%… Person? 52%". Marge brakes | The book shows only walking adults. "Who was missing?" | C → "Person · Very sure 87%. STOPPING." **Unsure but right:** a person with a big umbrella → "Person? 58%. Stopping to be safe." Correct | School crossing glows green |
| 3 Weird Things | Farm lane | A "Drive the farm lane and count the false alarms" · B "Make a 'safe to drive through' group with the bag and the puddle" · C ✱ "Fix Pip's mistakes" | A → plastic bag: "Animal! 76%". STOPPING | Milkshake spills again; children see the bag | B; the dinosaur costume → "Never seen one. 31%. Asking a human." | Smooth drive; ducks cross safely |
| 4 Night and Fog | Drive after dark | A ✱ "Help Pip see better" · B "Turn night on and watch the % drop" · C "Add 2 night pictures of people on scooters" | A → more day pictures: no change; "Help! What is this? My book has no night pictures." | The % falls at night; Pip's boxes flicker | C → "Person · Very sure 87%", even in fog | Fog thins as the % rises |
| 5 Trick Pip! | Test the other team | A "Play your trick card" · B "Drive your own Pip. Were you tricked?" · C ✱ "Stop tricks from working" | A → stickered STOP sign: "Speed sign. GOING! 89%." Marge brakes | Detective magnifier marks the stickers | Add stickered-sign pictures and a second clue (sign shape and place) | Pip slows at the sign |
| 6 Three Teams Agree | Final loop | A "Each team labels the 5 tricky pictures" · B ✱ "Send Pip on its last trip" · C "Keep labels most teams agree on; turn on 'Ask a human' for splits" | B → uses unchecked labels; a dog in a raincoat → "Person 82%" | Vote split shown as coloured blocks | C → "3 of 3 teams said Dog. 93%." / "Teams split on the shadow. I'll ask a human." | Green lights round the loop, fireflies; Pip's Driving Licence |

## 6. Team roles
- **Librarian:** holds the physical Picture Book cards and places them. Evidence: what is in the book.
- **Spotter:** watches the road (wide view) and calls what is really there. Evidence: ground truth.
- **Record Keeper:** ticks ✔/✘ next to each % on a paper strip.
- **Tapper:** touches the screen.
- **Marge** (groups of five): holds a red paper button and must decide "stop or go" when Pip asks for help.

## 7. Session plans

| Phase | 45 min | 60 min | 90 min |
|---|---|---|---|
| Warm-up | 0–5: "Person or not?" photo sort (scarecrow, mannequin, statue, child on scooter); honesty line | 0–7: as 45, plus roles | 0–10: as 60 |
| Play | 5–30: stages 1, 2, 4, 6 | 7–41: stages 1–6 | 10–50: stages 1–6; 50–60: unplugged labelling: each child labels 10 tricky photos, compare in teams |
| Discussion | 30–40 (10 min) | 41–56 (15 min) | 60–80 (20 min) |
| Wrap-up | 40–45: exit check, licence | 56–60 | 80–90: exit check; write the team's safety rule on the licence |

**Short of time:** keep stage 1 (scarecrow) and stage 2 (who's missing). Cut 3 and 5 first; stage 5 also needs two teams.

## 8. Assessment
- **Stars:** one per stage for a route with no Missed It and at most one False Alarm; a bonus star for spotting the scarecrow error out loud. Stars reward clear cards and checking, never speed.
- **Artefact:** Pip's Driving Licence: what we taught Pip, Pip's best mistake ("Scarecrow = person, 94% sure!"), ✔/✘ counts, our safety rule, and "Humans taught this car. Humans check this car."
- **Exit check:** 1. "Pip says 'Person, 94%'. Does that mean it's a person?" (No; check.) 2. "Pip only has pictures of grown-ups walking. Who might it miss?" (Children, wheelchair users, people on scooters.) 3. "Pip is 45% sure. What should it do?" (Ask a human or stop safely.)

| Criterion | 1 Emerging | 2 Secure | 3 Strong |
|---|---|---|---|
| Data explains behaviour | "Pip is silly" | "It didn't have that picture" | Predicts a mistake from the book's contents |
| Error types | Doesn't distinguish | Names false alarm vs miss | Argues which costs more and why |
| Fairness | Not raised | Notices a missing group | Proposes pictures that fix it and says who benefits |
| Confidence | Trusts the % | "Sure but wrong" | Uses the ✔/✘ record and an unsure-but-right example |

## 9. Discussion session (instructor-led, at the end of the lab)
**Length:** 10 / 15 / 20 minutes. Plan below is 15 minutes.

**Purpose.** *Pip only knows what people put in its book. Missing examples cause mistakes for some people, and "very sure" is not the same as right. People teach, check and stay responsible.*

**Set-up**
- "Pip's parked": lids down. The display shows the scarecrow frame with "Person · Very sure 94%" next to Pip's ✔/✘ record.
- Circle of chairs round a table with the physical Picture Book cards spread out.
- Materials: picture cards (including tricky ones), red paper "Marge buttons", a two-sided "False alarm / Missed it" card for each child, licences.

**Structure (15 minutes)**

| Min | Step |
|---|---|
| 0–1 | Opening question |
| 1–4 | Pairs: questions 1–2 using the cards |
| 4–11 | Whole group: questions 3–6 (with the two-sided cards for question 3) |
| 11–13 | Questions 7–8 |
| 13–15 | Closing ritual |

10 minutes: opening, 1, 2, 4, 6, closing. 20 minutes: add question 9 and the sticker-sign example.

**Opening question.** "Hold up your card: was the scarecrow stop a false alarm or a miss?"

**Core questions**
1. *Recall.* "What happened at the farm gate?"
   - Purpose: shared account.
   - Strong answer: "Pip thought the scarecrow was a person, 94% sure, and stopped. The milkshake spilled."
   - Probe: "What did Pip's Record show next to the 94%?"
2. *Reasoning.* "Why did Pip think the scarecrow was a person?"
   - Purpose: examples drive the guess.
   - Strong answer: "It has a body shape, arms and a hat, like the people in the book. Pip had never seen a scarecrow."
   - Probe: "Which picture card would stop that happening?"
3. *Reasoning (error types).* "Which is worse: stopping for a plastic bag, or not stopping for a duck? Show your card."
   - Purpose: costs of errors differ.
   - Strong answer: "Not stopping for a duck, because it could get hurt. A false alarm only spills a milkshake."
   - Probe: "Would it be the same for a pizza-delivery robot on a pavement?"
4. *Confidence.* "Pip was 94% sure and wrong about the scarecrow, and 58% sure and right about the umbrella. What does Pip's % really measure?"
   - Purpose: % reflects similarity to examples, not truth.
   - Strong answer: "How much it looks like its book pictures. It doesn't know if it's right."
   - Probe: "What rule would you give Pip for low %?"
5. *Fairness.* "Who was missing from Pip's book at first? Who might be missing from a real car's pictures?"
   - Purpose: representation in data.
   - Strong answer: "Children, people on scooters, wheelchair users, people at night. A real car might be trained with fewer pictures of some people."
   - Probe: "Whose job is it to make sure everyone is in the book?"
6. *Responsibility.* "Pip's licence says 'Humans taught this car. Humans check this car.' What does that mean?"
   - Purpose: human oversight.
   - Strong answer: "People chose the pictures and people check the mistakes, so people are responsible."
   - Probe: "When three teams disagreed, who decided?"
7. *Transfer.* "Where else does a computer recognise things from examples?"
   - Purpose: face unlock, photo sorting, animal ID apps.
   - Strong answer: "My photo app groups faces. It sometimes mixes up my brother and me."
   - Probe: "Why might it do that?"
8. *Careers.* "Some people's job is labelling pictures for AI. Why is that job important?"
   - Purpose: the human labour behind AI.
   - Strong answer: "If the labels are wrong, the AI learns wrong."
   - Probe: "What makes a good labeller?"
9. *Robustness (20-minute version).* "Your trick sign fooled Pip. Is that a reason not to use self-driving cars, or a reason to test them?"
   - Purpose: adversarial testing as a job.
   - Strong answer: "A reason to test, and to give the car more than one clue."
   - Probe: "What other clues could a car use?"

**Sentence starters:** "Pip thought … because its book had …" · "A false alarm is … a miss is …" · "Someone missing from the book was …" · "It was … % sure, but its record showed …" · "Pip should ask a human when …"

**Common misconceptions**
- *"Pip can see like us."* Respond: "Pip matches shapes to its book. What does it have that we don't, and what do we have that it doesn't?"
- *"More pictures always fixes it."* Respond: "Stage 2: more grown-ups changed nothing. The right pictures matter."
- *"94% means 94 out of 100 times right."* Respond: "Look at the record: was it right this time?"
- *"The car is to blame."* Respond: "Who chose its pictures? Who checks it?"

**Differentiation**
- *Younger or less confident:* sort physical cards into "Pip knows this / Pip has never seen this"; answer with the two-sided cards; ask "What happened?" first.
- *Older or confident:* "Design a test set of 10 pictures that would catch Pip's blind spots"; "Should a car stop for every 'not sure', and what would traffic be like if it did?"; for ages 11+, the facilitator may mention that one study found poorer pedestrian detection for darker skin tones in a public dataset ([Wilson et al.](https://arxiv.org/abs/1902.11097)), framed as "who is missing from the pictures".

**Connecting to real life.** Researchers put black and white stickers on a real stop sign; a detector then misread it in 84.8% of video frames taken from a moving vehicle ([Eykholt et al.](https://arxiv.org/abs/1707.08945)). Ask: "Why do researchers try to trick AI on purpose? What should car makers do about it?" Present it as a test that helps make cars safer, not as a danger.

**Closing ritual.** Each child completes "Before I trust a machine that recognises things, I …" on the licence. Then the team reads its safety rule aloud. Next step: "On the way home, spot one thing a self-driving car might find tricky." For clubs: Autopilot City as the follow-on session.

**Facilitator notes**
- *Sensitive topics:* road accidents and bereavement. Keep everything fictional and injury-free (hay bales, milkshakes). Real crashes appear only in optional facilitator notes for ages 11+, with no names and no deaths. If a child mentions a real accident, acknowledge kindly and move on; speak to them privately afterwards if needed.
- *Bias:* talk about "who is missing from the pictures", not about any child's appearance.
- *Safeguarding:* follow the venue's policy; Childline 0800 1111 ([Childline](https://www.childline.org.uk/)).
- *Dominant voices:* the Spotter and Record Keeper speak first in each round; one answer per team before repeats.

## 10. Accessibility and inclusion
- Every card and Pip line read aloud and captioned; bounding boxes keep high contrast in fog and night.
- Picture cards carry a shape or pattern cue as well as colour; meters use icons with words (Stopping, Going).
- No timed input; Pip only drives after a card is chosen.
- **No devices:** a floor road map, a toy car, physical Picture Book cards; the facilitator reads Pip's guess from a lookup sheet; children hold up "Stop" and "Go" paddles.

## 11. Safety, ethics and data
- **Data:** none. No camera, no photos of children; all pictures are built-in illustrations.
- **Real AI tools:** Pip is scripted (honesty line: "The people who made this game wrote Pip's guesses so we can study its mistakes. Real cars learn from millions of pictures"). No live image-recognition apps with under-13s.
- **Gentle consequences:** Marge always stops the car; misses bump soft hay bales; nothing and nobody is hurt.

## 12. Build notes
- **Assets:** the trailer's island, town, loop road, pond, farm and scarecrow, Pip, kids, scooter rider, night and fog, bounding-box overlay, licence card. New: Marge, plastic bag, puddle reflection, dinosaur costume, umbrella person, wheelchair user, pram, stickered sign, vote-split blocks, Picture Book UI.
- **Scripted lines:** "My book has 3 people and 3 cars. Let's drive!" · "Person · Very sure 94%" (scarecrow) · "Bicycle? 48%… Person? 52%" · "Person? 58%. Stopping to be safe." · "Help! What is this? My book has no night pictures." · "Speed sign. GOING! 89%." · "Teams split on the shadow. I'll ask a human."
- **Reuse:** trailer world, boxes, intent pill, card overlay, licence.
- **Open questions:** reviews note the farm shot holds too long and the bollards are chunky; fix in the build. Check the name "Pip" before launch. Decide whether to show the number or only the word band to ages 8–9.
