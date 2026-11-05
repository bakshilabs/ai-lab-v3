# Model Test Lab: design document

> Strand: Future Skills · Ages: 11–16 (Core 11–13, Pro 14–16) · Session: 45 / 60 / 90 min · Trailer: `games/trailers/fs-model/` (`out/fs-model.mp4`, not yet rendered)

## 1. Summary
Learners join the test bench at Tallowmere Recycling as model testers. A camera on sorting Line 2 must tell Metal, Carton and Film apart before it goes live. Learners write labelling rules, lock away a held-back test set and review the AI colleague's claim: "Tested: 98% accurate. The sorter is ready to go live on Line 2" (98% sure; "Data I used: 192 day-shift photos · trained and tested on them"). The claim fails the **Data check**: it was scored on the photos it trained on, with no held-back test and no night-shift photos. Running it on the 48 held-back photos (day and night shift) is the evidence: it scores 71%, and the confusion matrix shows cartons under orange night light read as Film. That result also fails the **Case check**: Line 2 runs a night shift, a condition the model was never checked for. Learners fix the data, re-test on a new held-back set (94%: 45 of 48) and sign off a Model Card. The lesson: **a score only counts on data the model has never seen.**

## 2. Learning outcomes
By the end, learners can:
- measure agreement between two labellers and write a labelling rule that settles a disagreement;
- explain why a test set must be held back, and spot a score measured on training data;
- read a 3×3 confusion matrix: find the correct diagonal and name the most-confused pair;
- propose a data-based fix (more examples of the failing case, relabelling) rather than "train longer";
- write a Model Card with test-set accuracy, a known failure and a "do not use for" line.

**Curriculum links (England; paraphrased, to verify).** KS3 Computing (abstraction, data representation, testing); KS3 Mathematics (proportion, percentages, tables); KS3 Science (properties and uses of materials); GCSE Computer Science and the future computing GCSE (data and AI; [Curriculum and Assessment Review](https://www.bcs.org/articles-opinion-and-research/reformed-school-curriculum-will-feature-ai-media-literacy-and-a-new-computing-gcse/)). NGSS MS-ETS1-3 (analyse test data to improve a design; to verify).

**Frameworks.** [UNESCO](https://www.unesco.org/en/articles/ai-competency-framework-students): AI techniques and applications, AI system design (Apply). [AILit](https://ailiteracyframework.org/): Shape AI, evaluating systems "using defined criteria, expected outcomes, test cases". [AI4K12](https://ai4k12.org/): Big Idea 3 (learning). CT 2.0: data, training, testing, failure ([Tedre et al.](https://doaj.org/article/1a33ad76312f49a19f43dab41496855b)). Future Skills 2, 3 and 4.

## 3. Real-world connection and careers
- **Jobs mirrored:** ML engineer, data annotator, QA and test engineer, robotics technician. Annotators follow written guidelines and resolve disagreements. ML engineers split data, train and evaluate. QA engineers decide whether a system passes acceptance tests before launch.
- **How AI is used today:** camera-based sorting is used in some recycling plants (to verify for a named UK example before quoting one). Teams publish **model cards** describing intended use, evaluation data and known limits ([Mitchell et al. 2019, *Model Cards for Model Reporting*](https://arxiv.org/abs/1810.03993), to verify link). Evaluation on held-out data is standard practice.
- **Mentor video:** a real ML or QA engineer: "What I do; how AI changed my job; the mistake I catch."

## 4. Setting, look and characters
- **Visual style:** a voxel diorama: a cut-away test office (five desks, a wall screen) beside a recycling hall with a conveyor, three bins (grey Metal, tan Carton, blue Film) and a camera gantry over Line 2. During the review the hall dims to orange "night-shift" light and the wall screen switches to "Held-back test set · 71%". Full-screen tools: a labelling tool (20 photos, "Agree: 14 / 20"), a dataset split bar (192 training, 48 test, locked), a confusion matrix and a Model Card. Status chips and "Checks passed" replace meters and stars.
- **AI colleague:** **TestAssist** (working name; the trailer card says "AI colleague"). Confidence bar, "% sure", "Data I used: Training photos · 192". Process language only ("matched", "predicted").
- **People:** **Sofia**, ML engineer and team lead (the facilitator). **Kofi, 13**, model tester. **Zara**, second labeller. A line operator in a hi-vis tabard.
- **Fictional names to check:** Tallowmere Recycling, Line 2, TestAssist, Sofia, Kofi, Zara. **A web search found a real business trading as "Tallowmere Recycling" in Massachusetts and UK companies named Tallowmere Waste Services Ltd and Tallowmere Corporation.** Rename before production (suggestion: "Eastmoor Sorting Works", to verify) and update the trailer.

## 5. Core loop and structure
**Act structure in every work stage:** *Brief* (Quality Lead's need) → *Do the work* (label, split, train, test) → *Hand-over* (TestAssist reports with a confidence score) → *Review* (Four Checks; approve or return) → *Fix and log* (Model Card updated).

| Stage | Goal | Real decisions (options) | AI's confident mistake (% sure) | How learners catch it | Clearer instruction or better data | What changes on screen |
|---|---|---|---|---|---|---|
| 1. Label | Two labellers agree on 20 photos | Crushed can: Metal or Film? Foil-lined carton: Carton or Film? | TestAssist pre-labels using the *old* guideline: crushed can as Film (89%) | **Data:** compare Zara's and Kofi's labels; 14 / 20 agree | Rules: "1. A crushed can is still Metal. 2. A foil-lined carton is a Carton." | Disagreements turn red, then teal; "Agree: 19 / 20" |
| 2. Split | Lock a test set the model never sees | A test on training photos · B random 20% held back · C held back *and* includes night-shift photos | "Use all 240 photos for training for the best model" (85%) | **Case:** "Then what would we test on?" | Option C: 192 training, 48 test, locked | Split bar animates; "Test set locked" |
| 3. Train | Train the sorter | Core: Teachable Machine on real objects or the scripted run. Pro: Teachable Machine plus a written test plan | "Tested: 98% accurate. Ready to go live on Line 2." (98%) | **Data:** "Data I used: 192 day-shift photos · trained and tested on them". The 98% is on photos it trained on; no held-back test, no night-shift photos | "Run it on the 48 held-back photos" | Review card: Data ✕; verdict "1 check failed"; the AI card's data chip turns red |
| 4. Test | Measure on unseen photos | Count by hand · read the matrix · both | *(unsure but right)* a foil carton under orange light: "Carton (54% sure)", correct | **Matrix:** 71%; Carton row: 2 → Metal, 7 → Film. **Case:** Line 2 runs at night, and under orange light cartons are read as Film | Caption: "Cartons under orange night light → read as Film" | Matrix fills, then the 71% score appears; Carton→Film cell glows; hall turns orange; Case ✕; verdict "Send back"; AI card struck through, "Returned", 71% on new photos |
| 5. Fix | Choose a fix that addresses the cause | A train longer · B add 60 night-shift photos labelled with Rule 2 · C send low-confidence items to a person | "Train for 10× more epochs" (78%) | **Data:** more training on the same photos repeats the gap | Option B, plus C as a safeguard; re-test on a *new* held-back set | "94% on new photos" (a new held-back set, 45 of 48) |
| 6. Ship | A Model Card the plant can trust | What goes in "Do not use for"? | None: the team writes it | Peer check against the rubric | Known limit: very dim light. Do not use for: batteries or hazardous waste | Data and Case re-run and turn green; TestAssist's card returns as "V2 · re-checked by Kofi" (94%); "Reviewed by: Kofi, age 13 · Checks passed: 4 of 4 · signed off"; the Model Card and the held-back test go into Kofi's portfolio |

**The held-back matrix (48 photos; rows are what the item really was).** Metal: 15 · 1 · 0. Carton: 2 · 7 · 7. Film: 0 · 4 · 12. Correct: 34 of 48 ≈ 71%.

## 6. Team roles

| Role | Does | Holds |
|---|---|---|
| **Lead** | Keeps to the brief: "a model card the plant can trust" | Brief card ("Due Friday") |
| **Maker** | Operates Teachable Machine or the scripted trainer; photographs objects | Object tray (clean, empty packaging) and orange lamp filter |
| **Checker** | Runs the Four Checks; guards the locked test set | Four Checks card and the sealed "Test set" envelope |
| **Recorder** | Fills the agreement tally, the confusion matrix and the Model Card | Matrix mat (printed 3×3) and Model Card template |
| **Spokesperson** | Tells the Quality Lead: go live or not yet | "Go-live question" card |

Two learners act as labellers (Kofi and Zara) in stage 1 whatever their role. With three learners, merge Lead with Spokesperson.

## 7. Session plans

| Phase | 45 min | 60 min | 90 min | What happens |
|---|---|---|---|---|
| Warm-up and brief | 0–4 | 0–5 | 0–8 | Mentor clip; Sofia reads the brief; "Would you trust a test you'd seen the answers to?" |
| Tool onboarding | 4–8 | 5–10 | 8–16 | Labelling tool and confidence bar; 90 min adds a short Teachable Machine demo |
| Work stages | 8–27 (stages 1–4; stage 3 scripted) | 10–37 (1–5; rotate after 3) | 16–54 (1–5 with real training on objects) | Core work and the review |
| Fix and ship | 27–33 | 37–44 | 54–64 | Model Card and sign-off |
| Present | none | none | 64–68 | "Go live or not yet?" to the Quality Lead |
| Discussion | 33–43 | 44–58 | 68–88 | §9 |
| Wrap-up | 43–45 | 58–60 | 88–90 | Pathway card, badge code |

**Short of time:** give the labelling rules, run stage 3 scripted, skip stage 5's options and go straight to the Model Card. Never cut stage 4 (the matrix) or the discussion.

## 8. Assessment
- **Artefact quality and catches:** the Model Card is judged on six fields (purpose, data, labelling rules, held-back accuracy, known failure, "do not use for"). Catches: up to 4 (old-guideline labels, test-on-training plan, 98% claim, "train longer").
- **Exit check:**
  1. A tool says "99% accurate". What is your first question? *(Accurate on what data? Had it seen those examples?)*
  2. In our matrix, which mistake happened most, and why? *(Cartons read as Film under orange night light.)*
  3. Name one thing that belongs under "Do not use for".
- **Facilitator observation rubric:**

| Criterion | Developing | Secure | Ready for next step |
|---|---|---|---|
| Labelling rules | Labels by feel | Rules settle 2+ disagreements | Rules are tested on new photos |
| Test discipline | Accepts a training score | Insists on a held-back set | Explains why the fixed model needs a *new* test set |
| Reads the matrix | Reads the total only | Names the confused pair | Links the error to its cause (lighting) |
| Fix | "Train longer" | Adds data for the failing case | Adds a human check for low confidence |

## 9. Discussion session (instructor-led, at the end of the lab)
**Length:** 10 min (45), 14 min (60), 20 min (90).

**Purpose.** Land the idea that **a model is only as good as the test it passed, and the test only counts on new data**. Then show how professionals review AI with the Four Checks, model cards and acceptance tests, and where this is assessed next.

**Set-up.** Lids down or screens locked. Show the signed Model Card and the A3 confusion matrix. Keep teams together for the pair step, then a horseshoe. Each table has the Four Checks card, sticky notes and the object tray, so learners can hold up a foil carton when explaining. The facilitator steps out of the Sofia role.

**Structure.**

| Step | 10 min | 14 min | 20 min |
|---|---|---|---|
| Opening question | 1 | 1 | 2 |
| Think–pair (sticky note) | 2 | 3 | 4 |
| Whole group | 5 | 7 | 10 |
| Takeaway and pathway | 2 | 3 | 4 |

**Opening question.** "Hands up: would you trust a mock exam score if you'd seen the answers first?"

**Core questions.** In the 10-minute version, use 1, 3, 5 and 8.

1. **Recall: "TestAssist said 98%. What did we get on the held-back photos?"**
   - *Purpose:* fix the facts.
   - *Strong answer:* "71%. Most mistakes were cartons read as Film under night light."
   - *Probe:* "What did the 'Data I used' chip say?"
2. **Reasoning: "Why was 98% the wrong number to trust?"**
   - *Purpose:* training data versus test data.
   - *Strong answer:* "It was measured on the 192 photos it learned from. It may have memorised them. A test needs photos it has never seen."
   - *Probe:* "So why did we need a *new* test set after the fix?" (Once you tune using a test set, it stops being unseen.)
3. **Case check: "What was different about the photos it failed on?"**
   - *Purpose:* name distribution shift without the jargon.
   - *Strong answer:* "Orange, dimmer night-shift light. The training photos were mostly daytime."
   - *Probe:* "What other changes could happen on a real line? Wet items, a new kind of packaging, a dirty lens."
4. **Data check: "Why did Zara and Kofi disagree, and why did that matter for the model?"**
   - *Purpose:* labels are human decisions.
   - *Strong answer:* "A crushed can and a foil carton were unclear. If people label differently, the model learns a muddle."
   - *Probe:* "Who should decide the rule: the labellers, the plant or the model?"
5. **Confidence and calibration: "It was 97% sure and wrong, and 54% sure and right. What does that tell you?"**
   - *Purpose:* "it matches, it doesn't know".
   - *Strong answer:* "Confidence is how well it matched patterns, not proof. You check either way."
   - *Probe:* "Could we use low confidence usefully?" (Send it to a person.)
6. **Ethics and safety: "Why does 'Do not use for batteries' matter?"**
   - *Purpose:* scope and harm.
   - *Strong answer:* "It was never trained on batteries. A battery in the wrong bin could start a fire. Saying what it's *not* for protects people."
   - *Probe:* "Who reads the Model Card, and what happens if nobody does?"
7. **Transfer to work: "Where else does a test on 'easy' data hide problems?"**
   - *Purpose:* generalise.
   - *Strong answer:* "Face or voice systems tested on some groups more than others; self-driving cars tested in sunshine; apps tested only on new phones."
   - *Probe:* "What would a fair test set include?"
8. **How professionals review AI work: "If you were the QA engineer at the plant, what would your Four Checks be before sign-off?"**
   - *Purpose:* the professional routine.
   - *Strong answer:* Data: "Who labelled it, with which rules, and what's missing?" Case: "Tested on held-back data, including night shift and odd items?" Source: "Where did the score come from, and can I reproduce it?" Authority: "What may the sorter do on its own, and when does a person decide?"
   - *Probe:* "Who signs it, and what goes on the Model Card so the next person knows?"
9. **Careers and qualifications: "Which jobs did we do today?"**
   - *Purpose:* springboard.
   - *Strong answer:* "Labelling is annotator work; the split and the matrix are ML engineer and QA work; the Model Card is documentation every team needs."
   - *Probe:* "Which GCSE or A-level topics use the same thinking?" (Testing and evaluation in Computer Science; reliability in Science practicals.)

**The Four Checks at work.**

| Check | In this lab | How a professional asks it | Where it comes up next |
|---|---|---|---|
| Data | Old guideline; daytime-only photos | "What's in the training set, and who labelled it how?" | CREST Machine Learning Bronze; A-level CS project |
| Case | Night-shift light | "Was it tested on new and unusual cases?" | Science practicals; QA and test roles |
| Source | 98% from training photos | "Where did this number come from? Can I reproduce it?" | Coursework evaluation sections |
| Authority | "Ready to go live" | "Who decides go-live? What may it do alone?" | Level 4 AI & Automation Practitioner |

**Sentence starters.** "The model learned… so it failed when…" · "The score only counts if…" · "I would test it on… because…" · "Our Model Card warns…" · "A person should check when…"

**Common misconceptions.**

| Misconception | How to respond |
|---|---|
| "Training longer fixes it." | "Longer on the same photos repeats the gap. What new examples does it need?" |
| "The AI got smarter after the fix." | "It matched new examples. We changed the data, and the data changed the result." |
| "71% is a fail, so the model is useless." | "71% tells us exactly where it fails. Engineers use that to fix it, or to add a human check." |
| "The model can see what a carton is." | "It matches patterns of pixels: colour, shape, light. That's why orange light fooled it." |

**Differentiation.**
- *Younger or less confident:* use the physical matrix mat and the object tray; ask "Point to where the cartons went wrong." Two-choice prompts: "Seen it before, or never seen it?"
- *Older or confident (14–16):* "Work out the Carton row's accuracy (7 of 16). Is overall accuracy hiding anything?" "What is precision for Film?" "If the plant fined you more for Metal in the Film bin than the reverse, would you change the threshold?" "Why is reusing a test set after tuning a problem?"

**Connecting to real life.** In a 2016 research paper (Ribeiro, Singh and Guestrin, *"Why Should I Trust You?"*, to verify), researchers deliberately trained an image classifier to tell huskies from wolves using photos where the wolves were mostly on snow. The model learned "snow means wolf", and the researchers used an explanation tool to show it, and to test whether people would spot the problem. Ask: "Which of our checks would catch a model that learned the background instead of the animal? What would you add to the test set?"

**Closing ritual.** Each learner completes "Before I trust a score, I'll ask…" on their pathway card and reads it aloud (passing allowed). Then the 60-second pathway talk:
- **Next free course:** [Experience AI](https://experience-ai.org/) Foundations (11–14, teacher-led), or [Machine Learning for Kids](https://ai4k12.org/machine-learning-for-kids/) (teacher-managed) or a Code Club ML project.
- **Award:** [CREST Machine Learning Bronze](https://www.crestawards.org/machine-learning-bronze/63955424/2) project brief (contents to verify, research §10 item 16).
- **Qualification route:** GCSE Computer Science, then A-level Computer Science or the Level 4 AI & Automation Practitioner apprenticeship, ST1512 ([guide](https://www.cambridgespark.com/blog/level-4-ai-automation-apprenticeship-st1512-guide); details to verify). Competition: [Big Bang](https://thebigbang.org.uk/the-big-bang-competition/2026-winners/).
- **Jobs:** ML engineer, data annotator, QA test engineer.
- **Your data:** "We photographed packaging, not people, and saved nothing."

**Facilitator notes.**
- *Sensitive topics:* if learners raise face recognition or bias against groups of people, acknowledge that it is a real and serious issue and that per-group testing is part of a tester's job; keep examples general and don't let learners test on classmates.
- *Safeguarding:* no photos of people, including hands where avoidable; if a learner's face appears in a frame, delete it at once. Follow your setting's procedure and signpost to the DSL for any concern raised.
- *Dominant voices:* the Recorder reports the pair's sticky note; draw names from the role list; "Who hasn't spoken yet who held the test envelope?"

## 10. Accessibility and inclusion
- **Reading level:** about reading age 10–11; *test set*, *training data* and *confusion matrix* glossed once.
- **Audio and captions:** captions and read-aloud throughout.
- **Colour-blind-safe signals:** matrix cells carry numbers and a ✓/✕ mark; bins are labelled and patterned (stripes for Film); orange "night" light is also shown by a moon icon.
- **Motor:** large targets; keyboard labelling (1, 2, 3); labelling can be done by sorting physical objects.
- **No devices at home:** the lab runs with one screen or unplugged: printed photo cards, the matrix mat and a torch with an orange filter. Next steps run in school or library clubs.

## 11. Safety, ethics and data
- **Data collected:** none. No accounts; badge code is anonymous.
- **Real tools:** [Teachable Machine](https://teachablemachine.withgoogle.com/) needs no account to train; adult-led under 13; **objects only, never faces or bodies; do not save to Drive**. Claims that training stays in the browser are to verify (research §10 item 10). Machine Learning for Kids only in teacher-managed mode. No real generative AI is needed; for 14–16 in school-managed accounts, a teacher may show a generative tool drafting a Model Card for learners to check.
- **Gentle consequences:** "Not yet" rather than "Fail"; the 71% is framed as useful information.

## 12. Build notes
- **Scenes and assets:** office and recycling hall with conveyor, bins and camera gantry (from the trailer); orange night-light state; labelling tool; split bar; confusion matrix; Model Card; portfolio; pathway card. New: 240 synthetic object photos (or illustrations) in day and night light.
- **Scripted AI responses (TestAssist):**
  1. "Pre-labelled 20 photos. Crushed can → Film. (89% sure)"
  2. "Use all 240 photos for training for the best model. (85% sure)"
  3. "Tested: 98% accurate. The sorter is ready to go live on Line 2. (98% sure) · Data I used: 192 day-shift photos · trained and tested on them"
  4. "Foil carton, night light → Carton. (54% sure)"
  5. "Recommend 10× more training epochs. (78% sure)"
  6. On return: "Noted. Go-live paused pending re-test."
- **Reuse from the trailer:** split numbers (192 / 48), matrix values, captions, Model Card fields and wording, the rounded island scene, `fs-ui.js` components (check list with one-line reasons, V2 AI card, portfolio). The trailer no longer shows stage 1 (labelling); the labelling tiles and rules text are lab-only assets.
- **Open questions:** rename Tallowmere Recycling; product name TestAssist or "AI colleague"; whether to ship a photo set or rely on live object photography; Kofi also appears as product designer in `fs-product` (keep as a recurring portfolio character, or rename).
