# Land a Rocket: design document

> Strand: Career skills · Ages: 8–14 · Session: 45 / 60 / 90 min · Trailer: `games/trailers/rocket/` (`out/rocket.mp4`)

Source research: `research/new-labs/land-a-rocket.md`. Facts marked "(to verify)" were not confirmed in that research and must be checked before build or print.

## 1. Summary
Children run mission control for a small launch team, from a 50 m hop test to landing a rover on Mars. A guidance assistant called NAV plans each flight and makes confident mistakes copied from real ones: it switches the engine off to come down, plans a drone-ship landing for the average wind and trusts a sensor that says the lander is at −200 m. Children catch each mistake on a telemetry graph in a dry run, give NAV clearer rules, and make the go, hold or scrub call. They learn that real landings are won by the instructions and checks done beforehand, which is the daily work of GNC engineers, flight controllers and data analysts.

## 2. Learning outcomes
- By the end, learners can read a telemetry strip (height, speed, wind, sensor readings) and tap the point where a plan goes wrong.
- By the end, learners can turn a vague instruction into one with limits and margins ("land slower than 2 m/s, keep 20% fuel spare").
- By the end, learners can explain the difference between average and worst-case conditions and use it to call a hold.
- By the end, learners can describe what to do when sensors disagree (trust the two that agree, ignore impossible values).
- By the end, learners can give one example where NAV was right and say how the team *knew*, using evidence.
- By the end, learners can name three mission-control jobs and what each checks.

**Curriculum links**
- **KS2:** Y5 forces (gravity, air resistance); Y5 Earth and space; line graphs ([DfE science](https://www.gov.uk/government/publications/national-curriculum-in-england-science-programmes-of-study/national-curriculum-in-england-science-programmes-of-study)); computing, "controlling or simulating physical systems" and "detect and correct errors" ([DfE computing](https://www.gov.uk/government/publications/national-curriculum-in-england-computing-programmes-of-study/national-curriculum-in-england-computing-programmes-of-study)).
- **KS3:** balanced and unbalanced forces; weight = mass × g; distance–time graphs ([RMG summary](https://www.rmg.co.uk/sites/default/files/KS3%20Curriculum%20Requirements.pdf)); SI units. DfE KS3 PDF could not be fetched (to verify).
- **KS4 (age 14 stretch):** GCSE physics forces and motion (to verify).
- **NGSS:** MS-PS2-2; 3-5-ETS1-3; MS-ETS1-1, -2, -4 (wording to verify).
- **UNESCO AI competencies:** human-centred mindset (humans make the final call); AI techniques and applications (optimisers, map-matching); AI system design (rules written in advance).
- **AI4K12 Big Ideas:** 1 Perception (sensors); 2 Representation and reasoning (NAV optimises over the rules it is given); 5 Societal impact (accountability, safe failure).

## 3. Real-world connection and careers
**Jobs this mirrors**
- **GNC engineer:** writes and tunes guidance, navigation and control software; tests it in thousands of simulated "what-if" runs ([OpenCourser](https://opencourser.com/career/ayzyrm/guidance-navigation-and-control-engineer)).
- **Flight controller:** watches one system on live telemetry, rehearses in long simulations and gives "go" or "no-go" in polls; certification takes 18 months to three years ([NASA NTRS](https://ntrs.nasa.gov/api/citations/20110014997/downloads/20110014997.pdf)).
- **Flight or launch director:** runs the room, collects the poll and makes the final go, hold or scrub call. On Artemis I, Charlie Blackwell-Thompson both gave the final "go" and took decisions to scrub ([NASA podcast](https://www.nasa.gov/podcasts/welcome-to-rocket-ranch/episode-19-launching-artemis/)).
- **Propulsion engineer:** fuel loads, throttle ranges, margins ([Relativity posting](https://job-boards.greenhouse.io/relativity/jobs/8211256002)).
- **Test engineer:** prepares and runs ground tests and turns data into design changes ([L3Harris Stennis posting](https://jobs.l3harris.com/job/Stennis-Space-Center-Lead%2C-Test-Engineer-MS-39529/1413284200/)).
- **Data analyst:** compares predicted with actual and writes the post-flight review.
- **Weather and recovery officer:** sea state, wind and getting the booster home ([BGR](https://www.bgr.com/science/spacex-launch-delay-starlink-drone-ship/)).
- **UK framing:** about 47,000 people work in the UK space sector ([UK Defence Journal](https://ukdefencejournal.org.uk/uk-to-launch-space-missions-from-scotland-next-year)), but launch firms employ only a few hundred directly. Present skills, not employers: GNC, test and data skills are used in drones, self-driving cars, wind farms and satellites.

**How professionals use AI and automation here today**
- **Optimising guidance:** JPL's G-FOLD solves the fuel-best landing path in real time and flew on Masten's Xombie in 2012–14 ([NASA NTRS](https://ntrs.nasa.gov/citations/20150014802)). Whether Falcon 9 uses it is not confirmed (to verify). The point for children: an optimiser finds the best answer *to the rules it was given*.
- **Terrain-relative navigation:** Perseverance matched camera images to an onboard map and could move its landing point by up to about 600 m; it landed about 5 m from target ([NASA](https://science.nasa.gov/technology/technology-highlights/terrain-relative-navigation-landing-between-the-hazards)).
- **Safe failure:** on CRS-16 (2018) a grid-fin pump stalled, and the flight computer kept the aim over the sea for a soft splashdown ([Space.com](https://www.space.com/42629-spacex-dragon-launch-missed-landing-crs16.html)).
- **How they check:** dry runs and simulations, units on every number, sensor cross-checks, alarm cards, do-confirm checklists and the go/no-go poll. Automation bias affects experts as well as beginners, so professionals rely on procedures rather than willpower ([Parasuraman & Manzey 2010](https://depositonce.tu-berlin.de/items/0c787d91-6021-480b-a333-009e0d1d0092/full)).

## 4. Setting, look and characters
- **Style:** floating voxel dioramas in brochure STEM purple: a desert test range with gantry, blockhouse and windsock; a cut-away mission-control room with consoles and a GO-light row; an ocean with a drone ship on a swell; the rust-red Jezero-style crater with a sky crane and rover; a grey lunar plain and a harbour hangar for Levels 2, 3 and 6. Telemetry strips are 2D under the 3D scene, with "Simple" (one line, coloured zone) and "Pro" (axes, units, several lines) views.
- **The AI helper: NAV**, the guidance assistant on the GNC console. A navy card with "% sure", a plan tag (GUESS, NEW PLAN, PLAN CHECKED, YOUR RULE) and an "I used:" line. NAV is a tool, never a pilot or a friend, and never makes the final call.
- **The chief engineer:** a warm blocky character who is the facilitator's in-game voice. Generic voxel vehicles only, no logos or exact silhouettes of real rockets.

**Fictional names and check status**
| Name | Use | Check |
| --- | --- | --- |
| NAV | AI assistant | Generic abbreviation; low risk |
| Team names: Falcons, Eagles, Kestrels, Swifts | Preset team names | Used by many sports teams (Falcons is also a rocket name); generic animal names, low risk (to verify; consider dropping "Falcons" to avoid echoing Falcon 9) |
| Chief engineer | Unnamed | No check needed |

## 5. Core loop and structure
**Acts in every level:** (1) **Brief** with a "this really happened" card; (2) **Plan**: pick options, and the Guidance child gives NAV a card (one vague, one clear, one plausible but incomplete); NAV shows a ghost trajectory and % sure; (3) **Dry run**: the simulator flies NAV's plan and the telemetry strip shows the flaw as a spike, split or red zone; (4) **Fix**: NAV re-plans, often less sure, and says why; (5) **Go/no-go poll**: each console ticks a three-line do-confirm card and says Go, No-go or Hold; (6) **Fly**, slow motion for the last 10 m, with one assisted hands-on moment in Levels 1, 2 and 4; (7) **Flight review**: stars, patch stamp, "what we caught".

**Levels**
| Level | Goal | Real decisions | AI's confident mistake | How children catch it | Clearer instruction or better data | What changes on screen |
| --- | --- | --- | --- | --- | --- | --- |
| 1 Hop Test | 50 m up, gentle landing | Fuel: full · just enough · +20% reserve · half. Legs: narrow · wide · crushable. Height: 10 · 50 · 250 m | "Go up to 50 m and come back down" → "Up at full power, then engine off to come down. Quickest way!" **88%** | Speed graph: touchdown at 31 m/s, in the red; no slowing curve | "Hop to 50 m, land slower than 2 m/s" (plus 20% fuel spare) → relight on the way down, **76%**: "Less sure, because I have more rules to meet" | Booster bounces on crushable pads; then "Soft landing: 1.5 m/s" |
| 2 Moon Landing | Land the crewed lander safely | Site: mare plain · crater rim · beside the base · polar ridge. Reserve: 60 s · 30 s · "every drop". Checklist: full · skip rangefinder test | "Land at the flat spot near the crater" → flattest spot on the orbital map, **91%** | Descent-camera strip at 150 m shows boulders; hazard lens: "Map resolution 10 m" (Apollo 11's boulder field) | "Use the descent camera at 150 m. No rocks bigger than 1 m. At least 30 s of fuel left." Guidance child taps a safer spot to re-aim | Lander re-aims and lands; crew wave |
| 3 Booster Comes Home | Return to the pad | Land at pad · drone ship · expendable. Entry burn: long · short · skip. Fins: early · late | "Use the engine data from the propulsion team" → "Landing exactly on the pad!" **93%** | Predicted against tracked path splits; data sheet stamped lbf·s, NAV expects N·s (Mars Climate Orbiter, [MIB excerpts](https://homepages.uc.edu/~thomam/Implications_IT/pdf/ch8/mars_orbiter_failure.pdf)) | "Convert all engine data to newton-seconds, and show units on every number" → **84%**: "I should have asked which units you meant" | If unfixed, the booster keeps its aim over the sea and splashes softly; a voxel boat goes out |
| 4 Drone Ship in the Wind | Land on a moving deck | When: now · hold · scrub · move ship. Legs. Aim: centre · upwind. Deck check: run · skip | "Check the weather and land on the ship" → "Average wind is 12 km/h. Well within limits. Landing now!" **89%** | Wind and deck strip: gusts to 45 km/h, deck moving about 3 m; ghost booster tips in the dry run | "Plan for the worst gust, and hold" → "Worst gust 45 km/h is over the limit. I recommend we HOLD." **72%** | Poll shows GO / HOLD / SCRUB; "Holding… 20 minutes later"; "Booster upright on a moving ship!" |
| 5 Seven Minutes on Mars | Land the rover | Site: plain · near delta · on delta. System: airbags · legs · sky crane. Parachute timing. Rule cards | "Use the sensors to tell when we've landed, then cut the cables" → "Leg sensor reads −200 m, so we've landed! Cut the engine?" **95%** | Three-sensor strip: one sensor spikes below zero for one second; radar and camera still read about 40 m (Schiaparelli, [ESA](https://www.esa.int/Newsroom/Schiaparelli_landing_investigation_completed); Mars Polar Lander) | Rules written before launch: IF sensors disagree, trust the two that agree; IGNORE impossible values; CUT cables only when the wheels touch → "Radar and camera agree: still 40 m up. Engine stays on." | 14-minute radio-delay bar; sky crane lowers the rover; "Rover landed safely. Your rules flew it."; first photo |
| 6 Flight Review (90 min) | Decide whether to refly | Fly now · inspect engine 3 · replace it · retire to a museum | "Look at the flight data and tell us if the booster is OK" → "Average engine temperature was normal. Ready to fly!" **94%** | Split the strip into one line per engine: engine 3 ran hot for 4 s | "Check every engine against its own limit and list anything outside limits first" → **88%** | Reflight poll; booster earns a flight stripe |

**"Unsure but right" and "right and confirmed" moments**
- **Level 4:** after the clearer card NAV is only **72% sure** that holding is right, and it is: the time-lapse shows the sea calm and the booster lands upright. Facilitator: "Only 72% sure, and it was right. Was holding a failure?"
- **Level 2 program alarm:** a yellow "ALARM 12" appears. NAV: "Alarm 12 means my computer is busy, not broken. Continue (86%)." The Recovery/CAPCOM child checks the alarm card ("12: go, unless it stays on") and it flickers off. This echoes Apollo 11's 1202 alarm, where Steve Bales called go after Jack Garman's check ([Purdue](https://engineering.purdue.edu/~andrisan/Courses/AAE190%20Fall%202000/Bales.html)); exact wording of their calls differs between sources, so paraphrase (to verify).
- **Level 5 terrain-relative navigation:** "Position known to within 5 m. Diverting 400 m to a safe target (94%)." Children check the overlay lines up.

## 6. Team roles
Roles rotate every level; on one shared screen they are coloured badges.

| Console | What they do | Evidence or tool they hold |
| --- | --- | --- |
| **Flight Director** | Reads the brief, runs the poll, makes the final call, presses Fly | Poll card (GO / HOLD / SCRUB) |
| **Guidance (GNC)** | Holds the instruction cards, reads NAV's plan aloud, re-aims in Level 2 | Instruction cards, ghost trajectory |
| **Propulsion** | Fuel budget, throttle, units check | Fuel bar with reserve line, data sheet with unit stamps |
| **Telemetry** | Reads the dry-run graphs, taps the suspicious point | Telemetry strip |
| **Recovery & Weather** | Wind and sea readings, alarm card, single voice to the crew (CAPCOM) | Wind and deck strip, alarm card |

Three players: Flight Director + Recovery; Guidance + Propulsion; Telemetry.

## 7. Session plans
Minutes for each phase. Every version starts by saying NAV is scripted and practising the poll call.

| Phase | 45 min (Levels 1, 2, 4, 5) | 60 min (Levels 1–5) | 90 min (all six) |
| --- | --- | --- | --- |
| Warm-up: "What does 'come back down' mean to a computer?"; consoles | 0–4 | 0–5 | 0–12 (adds an egg-drop lander with a mass budget) |
| Play: Levels 1–3 | 4–20 (L1, L2) | 5–27 | 12–39 |
| Play: Levels 4–6 | 20–35 (L4 with the units data sheet, L5) | 27–45 | 39–70 |
| Discussion (section 9) | 35–43 | 45–57 | 70–88 |
| Wrap-up: exit check, patch and flight log | 43–45 | 57–60 | 88–90 |

**If short of time:** drop Level 6, then Level 3 (fold units into Level 4), then the hands-on moments. Keep at least one dry-run catch, the Level 4 hold and the Level 5 rules.

## 8. Assessment
- **Stars (up to 3 per level):** caught NAV's mistake in the dry run; fixed it with a clearer card or data; made the right poll call, including a justified hold or scrub. No stars for landing precision; a bronze/silver/gold landing badge is cosmetic.
- **Artefact:** the **Mission patch and flight log**: team name, six landing sites, one "mistake we caught" stamp per level, the poll result and one telemetry graph each.
- **Exit check:**
  1. "Here is a height graph. Where did the engine light?" (Tap the bend.)
  2. "NAV says it is 95% sure. What should you do next?" (Check the evidence / Fly now / Ask a friend.)
  3. "A sat-nav says 'turn left' into a river. Which NAV rule is this?" (It only knows what's on its map.)
- **Facilitator observation rubric**

| Criterion | Emerging | Secure | Strong |
| --- | --- | --- | --- |
| Reads telemetry | Needs the point shown | Taps the right point | Explains what the shape means (spike, split, trend) |
| Improves instructions | Picks the clear card when prompted | Adds a limit or margin unprompted | Predicts which NAV rule will break before the dry run |
| Poll quality | Says Go or No-go without a reason | Gives a reason from their console | Calls a justified Hold and defends it with data |
| Calibrated trust | Trusts or rejects NAV wholesale | Checks before deciding | Explains how the team *knew* NAV was right (alarm card, overlay) |

## 9. Discussion session (instructor-led, at the end of the lab)
**Purpose:** in real landings, nobody steers in the last seconds. The landing is won earlier, by clear rules, checked data and a calm go/no-go call. NAV was fast and often right, but it found the best answer only to the question it was given. Professionals check AI and automation with procedures: dry runs, units, cross-checks and polls. "Hold" is a professional success.

**Set-up**
- **Room:** "mission control" layout: chairs in a row facing the facilitator as Flight Director, or teams round the shared screen showing the mission patch.
- **Materials:** printed flight logs; the five "NAV rules" poster (*takes you literally, plans for the average, only knows what's on its map, trusts every number, does not ask about units*); GO, HOLD and SCRUB cards (one set per child); a printed alarm card; the career cards for each console.
- **Bringing the class back:** the facilitator says "All consoles, this is Flight. Hands off for the review." Everyone answers "Copy" and turns away from the screen. Screens show the patch only.
- **Timing:** 10 minutes (45-min), 12 (60), 18 (90).

**Structure (18-minute version; trim in brackets)**
| Minutes | Step |
| --- | --- |
| 0–2 | Opening question as a poll round (keep) |
| 2–6 | Think–pair–share: "Which NAV rule surprised you?" (cut to 2) |
| 6–13 | Whole group: core questions (cut to 3) |
| 13–16 | Real-world example (cut to 1; skip in 45-min) |
| 16–18 | Takeaway and closing ritual (keep) |

**Opening question:** "Flight Director poll: hold up GO if you'd trust NAV to plan your next landing, HOLD if you'd trust it with checks, SCRUB if not. Tell your neighbour why."

**Core questions**
1. **"In the Hop Test, NAV did exactly what you said. What had you forgotten to tell it?"** (recall)
   - *Purpose:* literal instructions and missing constraints.
   - *Strong answer:* "We didn't say how fast to land. So it turned the engine off, and the speed graph went red at 31 m/s."
   - *Probe:* "What two numbers did the clearer card add? Why both?"
2. **"Average wind was 12 km/h. Why wasn't that good enough?"** (reasoning: typical case)
   - *Purpose:* averages hide the gusts you actually land in.
   - *Strong answer:* "The gusts went up to 45 km/h and the deck moved. You land in the gust, not the average."
   - *Probe:* "Where else could an average fool you? (Average test score, average bus time.)"
3. **"Was holding a failure?"** (reasoning and values)
   - *Purpose:* reframe no-go as a professional success.
   - *Strong answer:* "No. Waiting 20 minutes meant the booster landed upright. Real launch directors scrub when the data says so."
   - *Probe:* "How did it feel to say HOLD when everyone wanted to land? What helped you say it?"
4. **"The leg sensor said −200 m. How did you know it was wrong?"** (reasoning: sensor glitch)
   - *Purpose:* plausibility checks and cross-checking.
   - *Strong answer:* "You can't be underground. The radar and camera both said 40 m, so two agreed."
   - *Probe:* "What's a time a gadget at home gave an impossible number? What did you do?"
5. **"In Level 3, both numbers looked sensible. What was really different?"** (reasoning: units)
   - *Purpose:* hidden assumptions about units and formats between teams.
   - *Strong answer:* "One was pound-force seconds and NAV wanted newton-seconds. A real orbiter was lost like that."
   - *Probe:* "What habit stops this happening again?" (Units on every number; ask "which units?")
6. **"NAV was right about Alarm 12. How did we *know*, instead of just hoping?"** (calibration: right and confirmed)
   - *Purpose:* checking can confirm the AI as well as catch it.
   - *Strong answer:* "We looked it up on the alarm card and it said go unless it stays on. Then it went off."
   - *Probe:* "In the drone-ship level NAV was only 72% sure and still right. What does that tell you about unsure answers?"
7. **"On Mars you couldn't help live. Who really landed the rover?"** (transfer)
   - *Purpose:* the quality of instructions written in advance is the real control.
   - *Strong answer:* "We did, with our rules. The radio takes 14 minutes and the landing takes 7."
   - *Probe:* "Where else do people write rules for a machine before it runs? (Washing machine, traffic lights, game AI.)"
8. **"If NAV had crashed a booster, whose fault would it be: NAV's, its designers', or the team who pressed Fly?"** (ethics and accountability)
   - *Purpose:* responsibility stays with people and systems.
   - *Strong answer:* "Everyone has a part, but the people who said GO are responsible for checking. That's why there's a poll."
   - *Probe:* "Why do real teams fix the *system* (checklists, unit stamps) instead of just blaming one person?"
9. **"Which console would you choose for a real job, and what would you check every day?"** (careers)
   - *Purpose:* link roles to real jobs.
   - *Strong answer:* "Telemetry. A data analyst compares predicted and actual and flags anything outside limits."
   - *Probe:* "That skill is used in drones, wind farms and self-driving cars too. Which interests you?"

**Sentence starters**
- "NAV took us literally when…"
- "The graph showed… so we…"
- "I called HOLD because…"
- "Two sensors agreed, so I trusted…"
- "I would check… by…"
- "A… engineer does this when they…"

**Common misconceptions and responses**
| Misconception | Response |
| --- | --- |
| "Real rockets are flown with a joystick." | "Boosters and Mars landers fly themselves. People design, test and decide before the flight." |
| "Scrubbing or holding means you failed." | "Launch directors scrub when the data says so. That's a success." |
| "If the AI is 95% sure, it's probably fine." | "It was 95% sure about −200 m. The number is NAV's confidence in its own inputs." |
| "AI and automation can't be trusted at all." | "NAV was right about the alarm and the safe target. We check, and checks can say yes." |
| "Only the person at the controls matters." | "Every console caught something today. Real mission control works as a team." |

**Differentiation**
- *Younger or less confident:* use the GO/HOLD/SCRUB cards to answer before speaking; pick a NAV rule from the poster ("Which rule was broken here?"); point to the graph on the flight log.
- *Older or confident:* "An optimiser finds the best answer to the rules it has. Write one rule that would have stopped the Hop Test mistake, in IF/THEN form"; "Why might a team skip a check, as the Odysseus team did with the rangefinder test ([SpaceQ](https://spaceq.ca/simple-error-could-have-resulted-in-intuitive-machines-mission-failure/))?"; "Convert 100 lbf·s to N·s."

**Connecting to real life:** booster landings are now routine: the 600th Falcon booster landing took place on 18 April 2026, and one booster had flown 37 times by August 2026 ([BGR](https://www.bgr.com/2273946/spacex-falcon-9-rocket-booster-reuse-37th-time/)). Yet teams still check every flight, and when a grid-fin pump failed on CRS-16, the computer kept the booster's aim over the sea so it splashed down safely ([Space.com](https://www.space.com/42629-spacex-dragon-launch-missed-landing-crs16.html)). Ask: "If landings are routine now, why do teams still run dry runs and polls?" Burn details are not published by the company; keep numbers illustrative (to verify).

**Closing ritual**
- Go round the room as a final poll: each child says "I'm GO for checking AI because I will…" in one sentence.
- **Next step pathway:** egg-drop lander sheet with a mass budget; a NASA or BBC-style "how rockets land" video with a grown-up; a water-rocket club with a teacher ([NASA guide](https://www.nasa.gov/wp-content/uploads/2012/03/rockets-educator-guide-20-water-rocket-construction.pdf)); look up engineering apprenticeships in aerospace, energy and automotive.

**Facilitator notes**
- **Sensitive topics:** do not use Challenger, Columbia or Apollo 1 as AI-mistake stories. If raised: "Yes, spaceflight has had sad days. That's why teams today use checklists and go/no-go polls, and why we practise them." Say "last-second burn", never "suicide burn"; "seven minutes of waiting", not "terror"; robotic losses "didn't make it to the surface safely".
- **Safeguarding:** if timers or failure upset a child, offer the Reduce pressure setting next time and a non-timed role. Any disclosure goes to the designated safeguarding lead under the venue's procedure.
- **Dominant voices:** the Flight Director must hear every console before calling; use the console order; watch for a confident child overriding the Telemetry child (this is automation bias between people) and ask "What does the data say?"

## 10. Accessibility and inclusion
- **Reading level:** card text at about age 8, under 12 words; read-aloud on all cards; "Engineer's notebook" cards for KS3 extensions.
- **Audio and captions:** NAV lines captioned; countdown audio has a visual equivalent; no peril music.
- **Colour-blind-safe signals:** telemetry zones use pattern and labels as well as colour; poll cards use words and icons.
- **Motor-friendly controls:** hands-on moments are strongly assisted (holding the throttle at all lands safely; the deck-timing window is forgiving); tap alternatives for every drag. Countdowns can be paused and are switched off with **Reduce pressure**.
- **Motion:** no camera shake; steady chase camera; the rocking deck is seen from a fixed side camera; Reduce motion setting.
- **No devices at home:** printable flight log, the NAV rules poster and an egg-drop lander sheet; a "spot the NAV rule" family quiz.

## 11. Safety, ethics and data
- **Data collected:** none. No accounts, names or photos. Team names from a preset list. The patch has no personal data.
- **Age and real AI tools:** NAV is scripted; say so plainly at the start: "NAV's answers are written by our team to show real mistakes that AI and automation make." No live AI tools are used. Many consumer AI tools have minimum ages of 13 or 18 (to verify per tool).
- **Gentle consequences:** no crew deaths, no explosions near people. Crewed vehicles appear only in Level 2 and always have a working abort to orbit (New Shepard's escape system worked on NS-23, [Astronomy](https://www.astronomy.com/space-exploration/blue-origins-rocket-booster-failed-but-its-escape-system-prevailed/)). Failures are bounces, soft splashes, slow tip-overs onto a cushioned net and dusty bumps, each with "Data saved" and the cause shown.
- **Physical activities:** egg drops use a soft drop zone; adults handle any height above head height; low-temperature glue guns; water rockets only outdoors with an adult-operated launcher and eye protection.
- **Brand:** real organisations appear only in factual "this really happened" cards; IP to be checked with the lawyer used for round-3 report 10.

## 12. Build notes
- **Scenes and assets:** desert test range; mission-control cut-away; lunar plain with boulders and a descent-camera picture-in-picture; coast pad with predicted/tracked overlay; ocean swell and drone ship; Mars crater with hazard map, sky crane and rover; harbour hangar; a telemetry strip component with Simple and Pro views.
- **Scripted AI responses:** every vague, clear and distractor line in the section 5 table, plus: Alarm 12 (86%); TRN divert (94%); rules loaded (81%); the rangefinder warning if the Level 2 check is skipped; "Abort to orbit"; the CRS-16-style splash line; "leg 3 not latched" if the deck check is skipped (Jason-3 echo, [Space.com](https://space.com/31649-spacex-rocket-landing-jason3-satellite-launch.html)). Distractors: "Fly as high as the fuel allows" (L1), "Land now, but aim upwind" (L4).
- **Reuse from the trailer:** booster, flame and smoke; desert, sea and Mars islands; the mission-control room; NAV card; cards and hand; poll with role pills; telemetry canvas; wind and deck strip; "YOUR RULES · WRITTEN BEFORE LAUNCH" block; radio-delay bar; first-photo polaroid; jobs card. The trailer shows Levels 1, 4 and 5; Levels 2, 3 and 6 need new scenes.
- **Trailer alignment:** use the trailer's console names (Flight Director, Guidance, Propulsion, Telemetry, Recovery & Weather). The glitching sensor is the leg sensor; the "Radar and camera agree" line shows 93% under YOUR RULE.
- **Open questions:** how children read falling "% sure" has no controlled study, so include it in the evaluation; brand and IP check with the round-3 report 10 lawyer.
- **To verify:** Falcon 9 burn details and minimum throttle (keep numbers illustrative); drone-ship wind and sea limits ("deck moves less than 1 m" is a game rule); Apollo 11 fuel at touchdown (17–25 s; check the Apollo Lunar Surface Journal); Bales and Garman wording; New Shepard fins and restart altitude; Starship HLS thrusters and crewed landing date; whether Falcon 9 uses G-FOLD; Mars Climate Orbiter cost (avoid on cards); Mars Polar Lander cause ("probably"); DfE KS3 and NGSS wording; Spaceflight Simulator download figures.
