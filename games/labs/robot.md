# Train a Robot: design document

> Strand: Career skills · Ages: 8–14 · Session: 45 / 60 / 90 min · Trailer: `games/trailers/robot/` (`out/robot.mp4`, not yet rendered)

Source research: `research/new-labs/train-a-robot.md`. Facts marked "(to verify)" were not confirmed in that research and must be checked before build or print.

## 1. Summary
A crate lands on the Robot Workshop island and out rolls Rivet, a chunky robot arm that knows nothing. The children are its training crew: they show Rivet what to do by dragging its gripper, choose which demonstrations to keep, test it ten times on a Test Bench, paint safety zones and sign it off. A Training Assistant turns their demonstrations into a plan and predicts success with "% sure", and it is confidently wrong in the ways real robots are: too-similar demos, a misread "tidy", a shortcut clue, an unsafe speed, an average that hides who it fails, and a tidy simulator. Children learn the real workflow of robot trainers, test engineers and safety engineers: "% sure" is a prediction; the test grid is the evidence.

## 2. Learning outcomes
- By the end, learners can explain why *different* demonstrations train a robot better than *more of the same*.
- By the end, learners can compare the AI's predicted success with a measured success rate from 10 trials and say which to trust.
- By the end, learners can choose a fair test that changes one thing (lying down, dim light, a different person).
- By the end, learners can split results by person and explain how an average can hide the people a robot fails.
- By the end, learners can write a safety rule with numbers (slow near people, stop within one metre).
- By the end, learners can say when a robot should hand over to a human, and name three jobs that train, test or supervise robots.

**Curriculum links**
- KS2: computing, "controlling or simulating physical systems", "detect and correct errors", decomposing problems ([DfE computing](https://www.gov.uk/government/publications/national-curriculum-in-england-computing-programmes-of-study/national-curriculum-in-england-computing-programmes-of-study)); DT, evaluating "against their own design criteria" ([DfE DT](https://www.gov.uk/government/publications/national-curriculum-in-england-design-and-technology-programmes-of-study/national-curriculum-in-england-design-and-technology-programmes-of-study)); maths statistics, interpreting tables (exact statement to verify).
- KS3: computing, abstractions that model physical systems; DT, "test, evaluate and refine… against a specification", products that respond to sensor inputs.
- KS4 (age 14 stretch): GCSE computer science testing and DT systems (to verify against specifications).
- NGSS: 3-5-ETS1-1 and -3 (criteria, fair tests, failure points) ([NGSS](https://www.nextgenscience.org/topic-arrangement/3-5engineering-design)); MS-ETS1-1, -3, -4 (wording to verify).
- UNESCO AI competency framework for students: human-centred mindset (robots support people), ethics of AI (fairness in who is in the data), AI techniques and applications (learning from demonstration), AI system design (test plans and sign-off).
- AI4K12 Big Ideas: 1 Perception (what Rivet's camera notices), 3 Learning (demonstrations as data, shortcuts, sim-to-real), 5 Societal impact (safety, care, jobs).

## 3. Real-world connection and careers
**Jobs this mirrors**
- **Robot trainer, teleoperator or data collection operator:** guides a robot through set tasks many times, uploads the data, starts up and calibrates the robot ([Foundation advert](https://ats.rippling.com/foundation-robotics/jobs/0b7d8908-e4e2-4b0f-9113-4e065f7d9882); [heise on Tesla](https://heise.de/-9841052)).
- **Data curator or annotator:** reviews demonstrations, removes bad or duplicate ones, checks variety ([Boston Dynamics](https://bostondynamics.com/blog/large-behavior-models-atlas-find-new-footing/); [arXiv 2603.09056](https://arxiv.org/abs/2603.09056)).
- **Test engineer:** writes test plans and acceptance criteria, runs field tests, finds failure modes ([ARX Robotics advert](https://job-boards.greenhouse.io/arxroboticsgmbh/jobs/4896118101)).
- **Safety engineer:** risk-assesses robot cells against ISO 10218-2:2025, sets speed and separation zones and force limits, measures on the finished cell ([ISO](https://www.iso.org/standard/73933.html)).
- **Robotics or automation engineer:** designs, programs and tests systems and analyses sensor data ([National Careers Service](https://nationalcareers.service.gov.uk/job-profiles/robotics-engineer)).
- **Robotics or mechatronics technician:** maintenance, fault-finding, calibrating sensors; usual UK route a Level 3 apprenticeship ([Skills England](https://skillsengland.education.gov.uk/occupations/OCC0457E-v1-5)).
- **People who work alongside robots:** warehouse operatives, carers, surgeons and farmers supervise and take over.

**How professionals use AI here today**
- **Learning from demonstration:** Toyota Research Institute teaches skills from "dozens of demonstrations" ([TRI](https://www.tri.global/news/toyota-research-institute-unveils-breakthrough-teaching-robots-new-behaviors)); Mobile ALOHA reached over 80% success with 50 demonstrations per task ([arXiv](https://arxiv.org/pdf/2401.02117.pdf)).
- **A data loop:** Boston Dynamics collects teleoperated data, annotates it, trains and evaluates (above).
- **Simulation plus reality:** domain randomisation varies simulated worlds so the real world looks like "just another variation" ([Tobin et al.](https://arxiv.org/abs/1703.06907v1)); Amazon's Vulcan used real touch data as well as simulation ([About Amazon EU](https://www.aboutamazon.eu/news/company-news/introducing-vulcan-amazons-first-robot-with-a-sense-of-touch)).
- **How they check:** many trials, not one run; edge cases on purpose; results split by case; safety measured on the finished cell; a human signs off. Even RT-2 succeeded on only 62% of unseen objects and settings ([DeepMind](https://deepmind.google/discover/blog/rt-2-new-model-translates-vision-and-language-into-action/)).

## 4. Setting, look and characters
- **Style:** floating voxel islands in the brochure style, one per job site: the Robot Workshop (belt, three recycling bins, pegboard), a family home, a grocery warehouse, a care home and a quarry cliff for the rescue. Consequences are physical but gentle: spills, toppled boxes, freeze frames.
- **Rivet:** chunky teal-and-white robot arm on tracks, with a camera eye, a yellow hazard stripe and a status light (green, amber, red). Rivet speaks only in status lights and short chirps ("Ready", "Unsure", "Done") or short plain bubbles; it never claims feelings.
- **The AI helper: the Training Assistant.** A navy card with a PLAN tag (PLAN CHECKED after a fix), "% sure" and a reasoning line ("Learned from 3 demos. All upright bottles, all from the middle."). It turns instructions into a training plan, trains Rivet, predicts, drafts a test list and summarises results. Rivet is the machine; the Assistant is the tool.
- **Crew:** voxel children with shirts in role colours.

**Fictional names and check status**
| Name | Use | Check |
| --- | --- | --- |
| Rivet | The robot | No robotics company of this name found; "Rivet" is used by unrelated software firms and a crypto project; low risk (to verify trademark) |
| Training Assistant | AI tool | Generic; low risk |
| The Okafor family, Gran | Level 2 home | Common surname used generically; low risk |
| Harbour View care home | Level 5 (research name; trailer code comment only) | **Real**: a Harbour View Care Home exists in Whitehaven, Cumbria ([CQC listing](https://www.cqc.org.uk/location/1-24034057019)). Rename. Proposed: "Seaglass House" (to verify) |
| Island grocery warehouse, quarry tunnels | Generic places | No check needed |

## 5. Core loop and structure
**Acts in every level**
1. **Job ticket:** job, "done when" goal, a 20-second true-story card.
2. **Specify:** the Task Writer picks an instruction card (one vague; positions shuffled) and the team makes one real decision.
3. **Demonstrate:** the Demonstrator drags the gripper or draws the route (capped at 6 demos); each demo leaves a coloured ghost trail; the Data Curator keeps or removes demos.
4. **Plan and predict:** the Assistant shows a ghost run, "% sure" and its reasoning line.
5. **Test Bench:** the Tester picks 3–4 of 8 test cards; ten trials fill as ticks and crosses; tap one for slow-motion replay with a red highlight. **PREDICTED** sits beside **MEASURED**.
6. **Fix:** name the cause from four chips (*demos too similar*, *wrong clue*, *simulator too tidy*, *instruction unclear*), then pick a clearer card or change the demos. Retrain and retest.
7. **Go live and sign off:** Rivet does the job; people react in short bubbles; the Safety Officer signs off.

**Levels**
| Level | Goal | Real decisions | AI's confident mistake | How children catch it | Clearer instruction or better data | What changes on screen |
| --- | --- | --- | --- | --- | --- | --- |
| 1 Sort It (recycling arm) | 8/10 items sorted | Gripper: two-finger · suction · soft finger · magnet | "Copy what we did" → "Learned from 3 demos. All upright bottles, all from the middle." **94%** | Test Bench with lying-down, edge, squashed, wet paper: **4/10**; replays show "Grabbed thin air" | Card B: "Show it lots of ways: lying down, squashed, at the edge" → 7 varied demos, **9/10**, Assistant **85%**: "I know there are kinds I haven't seen" | Ghost trails fan out; "Sure isn't the same as right." |
| 2 Tidy Up (home helper) | Tidy before Gran visits, nothing important lost | Demo every item · few examples and infer · labels · ask when unsure | "Make the room tidy" → "'Tidy' means nothing on surfaces. Everything goes in the toy box." **88%** | Owner check: Dad's glasses, the half-built model and Gran's medicine are in the toy box; **3/10** right by the family's standard | "Toys in the toy box, clothes in the basket, books on the shelf. Leave the desk and medicine shelf. If you're not sure, ask." → **79%**, family check **10/10** | Medicine back on its shelf; Rivet holds up "Toy or not toy?" |
| 3 Pick and Pack (warehouse picker) | 9/10 picks, nothing broken | Photos · barcode list · force sensor · grip everything gently | "Learn which things are fragile from our demos" → "Clue I found most useful: red sticker." **96%** | Tests with unstickered eggs, a stickered brick, a peach, a tin: **5/10**; eggs crack (soft yolk splash) | "Fragile means it can break or squash. Show fragile things with and without stickers, and stickered things that aren't fragile." Or fit the force sensor → **9/10**, **83%** | "Eggs: not one cracked!"; the "clue I used" line changes |
| 4 Rush Hour (warehouse floor) | Orders out on time, zero near misses | Fences · stop when anyone near · slow and stop zones · light beam ahead | "Get the orders out as fast as possible" → "Full speed, shortest routes." **90%** | Safety lens: stopping circles and worker trails; 4× shift replay; **3 near misses**, freeze on "!" | "Fast in robot-only lanes. Slow near people. Stop if anyone is within one metre. Never block the fire exit. Give way at crossings." Paint zones, place the E-STOP → 0 near misses, **88%** | Amber and red zones painted; "It slows down when I'm near" |
| 5 Lending a Hand (care home) | Every resident can take a cup safely | Carers demo · residents demo with help · carers demo and wait-for-grip · put cup on table | "Hand people their drinks like the carers do" → "12 carer demos. Hand height 1.1 m. Release after 1 second." **93%** | Results by person: standing 6/6, staff 2/2, **wheelchair users 0/2**; "Overall 8/10 hid who it fails" | "Learn from residents too, at every height. Hold on until the person has the cup. If someone isn't ready, wait and ask." → everyone 9–10/10, **86%** | "Just right, thank you!"; tea time with the carer |
| 6 Storm Rescue (90 min) | Find three beacons, everyone back safe | Simulator only · real tunnel only · randomised simulator + 5 real runs · human drives all the way | "Practise in the simulator until it's perfect, then go" → "Simulator 100% of 10,000 runs. Predicted real success: 98%." | Tester insists on a real test course: **3/10**; dust fogs the camera, tracks slip, a puddle reads as a hole; split screen of tidy simulator against muddy tunnel | "Practise in lots of messy pretend tunnels. Test on the real course first. If unsure, stop, flash amber and call a human driver." → **8/10**, **80%** | Technician wipes the lens and fits wider tracks; torch-lit walk out |

**"Unsure but right" moments**
- **Level 5 go-live (in the trailer):** a resident is asleep. Rivet's light turns amber: "Not sure. She's asleep. Can you help?" The Assistant shows **52% sure** about whether to hand over the post. Handing over to the carer is right: "Thanks, Rivet. I'll take it from here." Facilitator: "Only 52% sure, and asking was exactly right. Not sure doesn't mean wrong."
- **Level 6 twist (over-trust):** a camper follows Rivet down a flooded side tunnel because "the robot knows the way". The Safety Officer spots the amber light and presses **Hand over**; a human rescuer takes control. Real anchor: in a Georgia Tech study, 37 of 42 people followed a robot that had already performed badly ([EurekAlert](https://www.eurekalert.org/news-releases/858276)).
- After every fix, the prediction goes *down* while the measured rate goes *up* (94% → 85%, 4/10 → 9/10).

## 6. Team roles
Roles rotate every level; the role pill moves on, bottom right.

| Role | What they do | Evidence or tool they hold |
| --- | --- | --- |
| **Task Writer** | Picks the instruction card, sets "done when", reads the job ticket | Instruction cards, done-when criteria |
| **Demonstrator** | Shows Rivet how by dragging the gripper or drawing the route | The device, the demo counter |
| **Data Curator** | Keeps or removes demos, checks the mix | Keep/remove tray, variety chips (upright, lying down, squashed, can) |
| **Tester** | Picks test cards, runs the 10 trials, calls the measured rate | Test cards, results grid, person filter |
| **Safety Officer** | Paints zones, holds the E-STOP, signs off, can veto go-live | Zone painter, E-STOP, sign-off stamp |

Three children: Task Writer + Safety Officer; Demonstrator + Data Curator; Tester. Four: merge Task Writer and Data Curator. Pressing E-STOP freezes the scene with no penalty and earns a "Good stop" sticker if there was a real hazard.

## 7. Session plans
**45 minutes** (Levels 1, 2, 4 and a short 6; 3 test cards out of 6)
| Minutes | Activity |
| --- | --- |
| 0–4 | Warm-up: "Copy me exactly" (one child copies a pick-up at a new spot); say the Assistant is scripted |
| 4–13 | Level 1 Sort It |
| 13–20 | Level 2 Tidy Up |
| 20–28 | Level 4 Rush Hour |
| 28–35 | Level 6 Storm Rescue (short) |
| 35–45 | Discussion (10 min) and exit check |

**60 minutes** (Levels 1, 2, 3, 4, 6; Level 5 as a 3-minute facilitator story with the by-person grid)
| Minutes | Activity |
| --- | --- |
| 0–5 | Warm-up and roles |
| 5–13 | Level 1 |
| 13–19 | Level 2 |
| 19–26 | Level 3 |
| 26–33 | Level 4 |
| 33–36 | Level 5 story and by-person grid |
| 36–45 | Level 6 |
| 45–57 | Discussion (12 min) |
| 57–60 | Exit check, Robot Training Logbook |

**90 minutes** (all levels, the Level 3 camera-check bonus, unplugged warm-up)
| Minutes | Activity |
| --- | --- |
| 0–8 | Unplugged "Be the Robot" (soft beanbags, no blindfolds, no running) |
| 8–17 | Level 1 |
| 17–25 | Level 2 |
| 25–35 | Level 3 with camera-check bonus |
| 35–45 | Level 4 |
| 45–55 | Level 5 |
| 55–68 | Level 6 with hand-over twist |
| 68–86 | Discussion (18 min) |
| 86–90 | Exit check and logbook |

**If short of time:** cap demos at 6 and replays at one tap per child; drop Level 3, then show Level 5 as the story version. Keep at least one PREDICTED-against-MEASURED moment, the by-person grid and a hand-over.

## 8. Assessment
- **Stars (up to 3 per level):** naming the right cause chip; adding a test the Assistant's list missed; fixing with better data or a clearer card. Nothing for speed.
- **Robot Readiness gauges:** Works (measured success), Safe (near misses, breakages, spills), Tested (kinds of test card used), Honest (how close the prediction was to the measured rate).
- **Artefact:** printable A5 **Robot Training Logbook**: six job stamps, the team's best instruction card for each job, before-and-after grids ("4/10 → 9/10"), the team's safety rule and "Jobs we tried today". Team nickname only.
- **Exit check (pictures and tick boxes, about 2 minutes):**
  1. "Rivet says it is 95% sure. What should you do before it goes to work?" (Test it many times / Trust it / Ask it again)
  2. "All your demos were on the blue rug. What might Rivet learn by mistake?"
  3. "Name one job where people train or test robots."
- **Facilitator observation rubric**

| Criterion | Emerging | Secure | Strong |
| --- | --- | --- | --- |
| Uses test evidence | Accepts "% sure" | Compares predicted with measured | Uses the by-case or by-person split to find the real problem |
| Designs fair tests | Picks tests at random | Picks a test that changes one thing | Adds the case the Assistant's list missed and says why |
| Names causes | Blames Rivet ("it's lazy") | Picks the right cause chip with help | Explains the cause in their own words and proposes the fix |
| Thinks about people | Focuses on speed | Mentions safety when prompted | Raises safety, fairness or hand-over unprompted |

## 9. Discussion session (instructor-led, at the end of the lab)
**Purpose:** robots learn from what people show them, so the data is the teaching. A confident prediction is not evidence; only many varied tests are. Professionals check robot AI by testing on purpose, splitting results by who and what, setting safety rules with numbers and keeping a human ready to take over. Robots need people to teach, test, fix and supervise them, and those are real jobs.

**Set-up**
- **Room:** a circle of chairs or a semicircle round one screen showing the six logbook stamps and the last PREDICTED/MEASURED card.
- **Materials:** printed logbooks; a large "PREDICTED __% · MEASURED __/10" card with a dry-wipe pen; a set of eight test cards; five role badges with one-line job descriptions; a soft object (beanbag) as a talking token.
- **Bringing the class back:** the Safety Officer from the last level says "E-STOP!" and everyone freezes with hands up, like Rivet. Screens pause on the final stamp. The facilitator starts when every hand is off the device.
- **Timing:** 10 minutes (45-min), 12 (60), 18 (90).

**Structure (18-minute version; trim in brackets)**
| Minutes | Step |
| --- | --- |
| 0–2 | Opening question (keep) |
| 2–6 | Think–pair–share: "More or different?" (cut to 2) |
| 6–13 | Whole group with the beanbag: core questions (cut to 3) |
| 13–16 | Real-world example (cut to 1; skip in 45-min) |
| 16–18 | Takeaway and closing ritual (keep) |

**Opening question:** "Hands up: who taught Rivet something today? Point to the job on the logbook you're proudest of."

**Core questions**
1. **"Rivet said 94%. The test said 4 out of 10. Which did you believe, and why?"** (recall and calibration)
   - *Purpose:* prediction against evidence.
   - *Strong answer:* "The test, because we watched it fail with things lying down. 94% was a guess from three demos that all looked the same."
   - *Probe:* "Would 10 more tests of upright bottles have helped? Why not?"
2. **"What's the difference between showing Rivet *more* and showing it *different*?"** (reasoning: data diversity)
   - *Purpose:* variety beats repetition.
   - *Strong answer:* "Twenty of the same demo still only shows the middle of the belt. Different demos showed it squashed cans and the edges."
   - *Probe:* "If you were teaching a little cousin to catch, would you throw the ball the same way every time?"
3. **"Rivet was right that fragile things had red stickers. So why did it crack the eggs?"** (reasoning: shortcut)
   - *Purpose:* an AI can learn the easiest clue instead of the real reason.
   - *Strong answer:* "It learned 'sticker means gentle', not 'can break means gentle'. The new eggs had no sticker."
   - *Probe:* "Where could a shortcut fool an app you use? (A photo app that thinks every snowy picture is a husky.)"
4. **"Overall 8 out of 10 looked fine. Who did Rivet fail, and why does it matter who teaches a robot?"** (ethics and fairness)
   - *Purpose:* averages hide the people a system fails; representation in data.
   - *Strong answer:* "Wheelchair users, 0 out of 2, because only standing carers did the demos. If nobody like you is in the data, it might not work for you."
   - *Probe:* "Who else might be missing from robot demos? How would a real team find out?"
5. **"'Be careful' made Rivet slow everywhere. Why did your painted zones work better?"** (reasoning: specific rules)
   - *Purpose:* safe and useful needs numbers and places, not vibes.
   - *Strong answer:* "Because they said where to slow and when to stop: within one metre. 'Be careful' doesn't say how."
   - *Probe:* "Write a 'be careful' rule for scooters in a school yard with a number in it."
6. **"Rivet said 'Not sure. She's asleep. Can you help?' Was that a weakness?"** (calibration: unsure but right)
   - *Purpose:* asking for help is good design; unsure can be right.
   - *Strong answer:* "No. It was only 52% sure, and asking the carer was the right thing to do."
   - *Probe:* "In the rescue, a camper followed Rivet even with its amber light on. Why do people trust robots too much?"
7. **"Who should decide whether a robot is safe to work near people: the robot, the AI, the company or a person whose job it is?"** (ethics and accountability)
   - *Purpose:* human sign-off and real safety roles.
   - *Strong answer:* "A safety engineer, because they measure it on the real robot and can say no."
   - *Probe:* "Our Safety Officer could veto go-live. Did anyone use it? How did it feel?"
8. **"Which badge did you wear that matches a real job, and what would you do all day?"** (careers)
   - *Purpose:* name real, often vocational, robotics roles.
   - *Strong answer:* "Tester. A test engineer writes test plans and tries to break the robot on purpose before it goes to work."
   - *Probe:* "Some of these jobs start with an apprenticeship at 16. Which one would you try?"
9. **"Robots are joining warehouses and care homes. What do you think people should still do themselves?"** (transfer and values)
   - *Purpose:* robots as helpers; care and judgement stay human.
   - *Strong answer:* "Talk to the residents and decide what's right. Rivet fetched the cups so the carer had time to chat."
   - *Probe:* "Would you want a robot to help your gran? What would you want it to check first?"

**Sentence starters**
- "Rivet learned… because our demos…"
- "The test showed… but the AI predicted…"
- "Rivet failed for… because nobody showed it…"
- "I would test… by changing only…"
- "A safe rule needs a number, like…"
- "A robot should hand over when…"

**Common misconceptions and responses**
| Misconception | Response |
| --- | --- |
| "100% in a test means perfect." | "How many tests? Which kinds? Even top models reach about 62% on new things." |
| "More demos always help." | "Remember 'the same demo 20 more times'? Still 4 out of 10." |
| "The robot is being naughty or lazy." | "It's doing exactly what it learned. What did we teach it?" |
| "Safety means going slowly everywhere." | "'Be careful' made orders late. Zones made it safe *and* useful." |
| "Robots will take everyone's jobs." | "Today you saw five jobs that exist because of robots: training, testing, curating, safety, fixing. Carers had more time, not less work." |

**Differentiation**
- *Younger or less confident:* hold up a test card and ask "Would this catch Rivet out?"; use the PREDICTED/MEASURED card to fill in numbers together; answer by pointing at a stamp; partner talk before sharing.
- *Older or confident:* "Calculate the overall success and then split it by group: why do the numbers tell different stories?"; "Design a test plan of five cards for a robot that waters school plants"; "Is it fair to deploy a robot that works for 90% of people? Who decides?"

**Connecting to real life:** in 2025 Boston Dynamics and Toyota Research Institute described training the Atlas humanoid by having operators in VR headsets drive it through tasks, then processing, annotating, training and evaluating the data in a loop ([Boston Dynamics](https://bostondynamics.com/blog/large-behavior-models-atlas-find-new-footing/); [The Robot Report](https://www.therobotreport.com/boston-dynamics-tri-use-large-behavior-models-train-atlas-humanoid/)). Companies now advertise jobs for "robot teleoperators" and "data collection operators" (adverts above). Ask: "Which of those four steps did you do today? Which step would you most want to be in charge of?" Do not quote pay figures.

**Closing ritual**
- Each child finishes "Before I trust a robot, I would test…" aloud while holding the beanbag, then passes it on.
- **Next step pathway:** Teachable Machine at school with a teacher, training on *objects* not faces ([AI4K12](https://ai4k12.org/teachable-machine/)); FIRST LEGO League or VEX IQ clubs ([FLL](https://www.first-lego-league.org/en/divisions/challenge)); the National Careers Service robotics engineer profile and Level 3 mechatronics apprenticeships ([NCS](https://nationalcareers.service.gov.uk/job-profiles/robotics-engineer)).

**Facilitator notes**
- **Sensitive topics:** Level 5 involves disability, ageing and care. Present residents as active and humorous; never mock; say "wheelchair users" not "the disabled". A child may have a grandparent in care, a disability, or a parent worried about automation at work: keep it hopeful and factual ("robots need people to teach, test, fix and supervise them").
- **Safeguarding:** if a child shares a worry about family care, illness or someone losing a job, acknowledge, do not probe, and follow the venue's procedure with the designated safeguarding lead.
- **Dominant voices:** only the beanbag holder speaks; the device passes with the role; invite the Tester and Data Curator first, since their evidence is easiest to talk over.

## 10. Accessibility and inclusion
- **Reading level:** about age 8, cards under 12 words; read-aloud on all cards; bubbles at most 8 words.
- **Audio and captions:** all Assistant lines captioned; chirps have visual status-light equivalents.
- **Colour-blind-safe signals:** ticks and crosses (✓ ✕), not just green and red; safety zones hatched as well as coloured; the status light also shows a word (Ready, Unsure, Stop).
- **Motor-friendly controls:** the drag demonstration has a "tap start, tap end" alternative; no timed actions; Reduce motion (no shake, short swoops).
- **No devices at home:** the logbook prints; "Be the Robot" is unplugged; the take-home has a "test it ten times" family challenge (for example, ten paper-aeroplane throws with one change).

## 11. Safety, ethics and data
- **Data collected:** none. No webcam, microphone or pose capture; demonstrations are finger drags on screen. No accounts or names; team nickname only. ICO Children's Code notes (round-3 report 05) apply.
- **Age and real AI tools:** the Assistant is scripted; say so: "The AI in this lab is scripted, like a film. Real robot assistants work in a similar way, and real robot crews test them." No live AI tools in the lab. Many consumer AI tools have minimum ages of 13 or 18 (to verify per tool). Real-robot extensions in clubs use small educational robots only (SPIKE, Sphero, VEX IQ), hands clear of pinch points, a teacher on the stop button; ISO 10218 does not cover educational products, so do not claim compliance.
- **Gentle consequences:** no injuries ever. Near misses freeze with a yellow "!"; spills and cracked eggs are the worst outcome; campers are always fine. No combat or weapons. No "robots will take your job" framing.

## 12. Build notes
**Scenes and assets:** workshop island (belt, bins, hopper, pegboard, crate); home interior with toy box and medicine shelf; warehouse floor with aisles, workers, second robot and zone painter; care-home lounge with residents of varied height and wheelchairs; quarry tunnel with mud, dust and puddle plus a tidy simulator twin; Test Bench grid with slow-motion replay; person filter view.

**Scripted AI responses (minimum set)**
- L1: vague 94%; card B 85%; card A "same demo 20 more times" stays 4/10; card C "be more careful" (no change).
- L2: vague 88%; clear 79%; card C "tidy it like a hotel" (beds made, toys still on the floor).
- L3: vague 96% with "red sticker" clue; clear 83%; force-sensor route; bonus camera check (overhead says picked, side camera shows hovering, from DeepMind's grasping example, [DeepMind](https://deepmind.google/discover/blog/specification-gaming-the-flip-side-of-ai-ingenuity/)).
- L4: vague 90%; clear 88%; card C "be careful" (on time 60%).
- L5: vague 93%; clear 86%; asleep resident 52% and the ask line.
- L6: vague 98%; clear 80%; amber "I'm not sure. Human, please take over."
- Assistant track record tally: "Predictions vs tests: ✓✓✕✕".

**Reuse from the trailer:** Rivet model and crate, workshop, home, warehouse and care-home islands, demo trails and counter, Test Bench results card (PREDICTED/MEASURED), cause lens, fix cards with hand cursor, safety lens and zone painting, by-person results card, role pill and five-role strip, careers card. The rescue island (Level 6) and Level 3 warehouse picking are new.

**Trailer alignment:** the trailer uses 3 initial demos then 7 varied ones (the research said 5); keep the trailer numbers. Fix cards in the trailer are A "same demo 20 more times", B "show it lots of ways", C "tell the robot to be more careful". The trailer ends on the care-home hand-over, not the rescue.

**Open questions and items to verify**
- Rename the care home (real "Harbour View" exists) and check the new name.
- OpenAI Rubik's Cube success rates (60% and 20%) from a secondary summary (to verify).
- Tesla Optimus pivot to camera-only data (to verify).
- Gemini Robotics 1.5 demos and ASIMOV update from secondary coverage (to verify).
- ISO/TS 15066 body-region values (130 N, 140 N) against Annex A (to verify).
- ISO 13482 current edition (to verify).
- SRT-H details (17 hours, 41% slower) from news coverage (to verify).
- Teleoperator pay ranges: never use in product (to verify if ever needed).
- Dogtooth figures are company-stated (to verify).
- NGSS MS-ETS1 wording and the KS2 maths statistics statement (to verify).
- No study found on children's intuitions about precision and recall.
- Optional "Ripe or Not?" strawberry level for rural venues ([Ingenia](https://ingenia.org.uk/articles/robots-in-the-field/)).
