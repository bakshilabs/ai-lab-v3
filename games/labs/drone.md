# Become a Drone Pilot: design document

> Strand: Career skills · Ages: 8–14 · Session: 45 / 60 / 90 min · Trailer: `games/trailers/drone/` (`out/drone.mp4`, not yet rendered)

Source research: `research/new-labs/drone-pilot.md`. Facts marked "(to verify)" were not confirmed in that research and must be checked before build or print. **This lab gives practice badges only. It never gives, or claims to give, a real UK drone qualification or ID.**

## 1. Summary
Over six days on Kestrel Isle, as a storm builds, a drone team works with a Flight Assistant that plans routes, maps fields and scans thousands of images in seconds. It is confidently wrong in the ways real drone software goes wrong: a route through an airfield's restriction zone from an old map, "sick crops" that are a hedge's shadow, a sheep flagged as a person while a walker lying in heather is missed, and a battery plan with no wind in it. Children catch each mistake with an evidence lens, give clearer instructions and make the go/no-go call. They learn that professional drone work is mostly planning, checking and judgement: the AI flags, a person checks and decides.

## 2. Learning outcomes
- By the end, learners can state the core Drone Code rules: under 120 m, at least 50 m from people, never over crowds, stay out of airport zones, keep the drone in sight, stop for emergency services.
- By the end, learners can check an AI flight plan against today's airspace map and notices, and explain why the pilot, not the software, is responsible.
- By the end, learners can explain a false positive (a sheep flagged as a person) and a false negative (a missed walker), and say which is worse in a search.
- By the end, learners can check an AI image result against ground truth (walking the field, zooming in).
- By the end, learners can work out why a headwind shortens a drone's range and set a battery reserve.
- By the end, learners can name three drone jobs and the real first step for flying legally in the UK, with a grown-up.

**Curriculum links**
- KS2: geography, compass points, four- and six-figure grid references, OS maps, digital mapping, fieldwork ([DfE geography](https://www.gov.uk/government/publications/national-curriculum-in-england-geography-programmes-of-study/national-curriculum-in-england-geography-programmes-of-study)); maths, Y6 coordinates, percentages, time; computing, sequences and debugging.
- KS3: geography, OS maps, aerial and satellite photographs and GIS (exact wording to verify); maths, speed, distance and time, compound units; computing, algorithms and data.
- KS4 (age 14 stretch): GCSE geography fieldwork and geospatial data; GCSE maths compound measures (to verify against specifications).
- NGSS: 3-5-ETS1-1, MS-ETS1-1 and -2 (criteria and constraints) ([NGSS](https://nextgenscience.org/topic-arrangement/msengineering-design)); 3-ESS2-1 and MS-LS1 codes from memory (to verify).
- UNESCO AI competency framework for students: human-centred mindset (pilot in command), ethics of AI (privacy, consent, wildlife), AI techniques and applications (detectors, crop maps, route planners).
- AI4K12 Big Ideas: 1 Perception (thermal and NDVI detection), 3 Learning (detector trained on people standing on grass), 5 Societal impact (privacy, rescue, law).

## 3. Real-world connection and careers
**Jobs this mirrors**
- **Commercial drone pilot** (survey, inspection, media): briefs, airspace and permission checks, site risk assessment, pre-flight checks, mostly automated flights, data checks and logs ([Coptrz](https://shop.coptrz.com/blogs/news/drone-pilot-jobs-explained-who-hires-them-what-they-do)).
- **Inspection analyst:** reviews close-up images, confirms or rejects AI-flagged defects, grades severity ([Windtech](https://www.windtech-international.com/product-news/boralex-applies-skyvisor-ai-to-enhance-turbine-blade-inspections)).
- **GIS and mapping technician:** turns drone images into maps and checks accuracy against ground control ([National Careers Service](https://nationalcareers.service.gov.uk/job-profiles/geospatial-technician)).
- **Agronomist:** walks fields, tests soil, advises farmers; uses crop maps to decide where to scout and treat ([CareerPilot](https://careerpilot.org.uk/job-sectors/agriculture/job-profile/agronomist)).
- **Search-and-rescue drone operator** (often a volunteer): flies thermal and zoom sectors for the search manager, hands images to reviewers, gives way to helicopters ([RICS](https://ww3.rics.org/uk/en/journals/land-journal/drone-use-mountain-rescue.html)).
- **Delivery-network operator:** checks, launches and supervises several automated flights from an operations centre; Wing's delivery pilots have no joysticks ([Dallas Innovates](https://dallasinnovates.com/new-wing-remote-operations-center-in-coppell-oversees-dfw-drone-deliveries/)).

**How professionals use AI here today**
- **Search image scanning:** in 2025 software scanning more than 2,600 drone photos of Monviso flagged "a few red pixels", the helmet of a missing climber; officials called it "a joint success between advanced technology and the skilled human team interpreting the AI's results" ([ExplorersWeb](https://explorersweb.com/ai-solves-the-mystery-of-missing-italian-climber/)). In Poland, SARUAV scanned 782 images and found a missing person in about four hours ([DroneXL](https://dronexl.co/2024/10/07/ai-drone-software-search-and-rescue)).
- **Search planning:** a Glasgow lost-person model found the person in 19% of simulated searches against 8% for a lawnmower pattern ([MIT Technology Review](https://www.technologyreview.com/2024/05/30/1092988/ai-directed-drones-could-help-find-lost-hikers-faster)).
- **Defect detection, crop maps, automatic mapping grids and route planning** for delivery fleets.
- **How they check AI:** the CAA warns geo-awareness data "is not always accurate" and pilots must check it ([CAA](https://caa.co.uk/drones/airspace-and-restrictions/airspace-alerting-apps)); DJI replaced hard US no-fly zones with warnings in 2025 ([DroneDJ](https://dronedj.com/2025/01/14/dji-geofencing-no-fly-zone/)); agronomists ground-truth crop maps; analysts zoom and confirm every flag; SAR teams tune detectors to over-flag because missing a person costs more.

## 4. Setting, look and characters
- **Style:** one floating voxel island in the brochure style on a diorama slab: a village with a green and fête field, a small airfield with a windsock, a farm with hedged fields and a campsite, a ridge of three wind turbines, a heather moor with sheep and crags, a lighthouse, and across a strait a tiny clinic island with a green cross. Each level is one day; the sky, sea and windsock build from sunny Monday to Saturday's storm.
- **The AI helper: the Flight Assistant.** A ground-control-station panel styled like real planning apps, with at most a small bot icon. Every proposal shows the plan (ghost route or flags), "% sure", and a **"Data I used"** chip with source and date ("Map from 2024", "Trained on people standing on grass", "Wind: not included"). Tags: GUESS, then PLAN CHECKED. Voice: plain and professional.
- **Characters:** the harbourmaster, Farmer Ade, the turbine technician, the rescue controller, Ellie the walker (red jacket), a clinic nurse; all voxel, no identifiable faces.

**Fictional names and check status**
| Name | Use | Check |
| --- | --- | --- |
| Kestrel Isle | The main island | No real place found; "Kestrel Island" exists in Alaska and "Kestrel Isles" in a fiction wiki; low risk |
| Little Holm | Clinic island (research name; trailer code comment only) | **Real**: two islands called Little Holm in Shetland, one with a lighthouse ([Wikipedia](https://en.wikipedia.org/wiki/Little_Holm,_Yell_Sound)). Rename; proposed "Wren Holm" (to verify) |
| Heather Crag | Moor feature | Not checked (to verify) |
| Farmer Ade, Ellie | Characters | First names only; low risk |
| Sky Authority | In-game regulator | Not checked (to verify); always say "the real CAA" in facilitator talk |
| Flight Assistant | AI tool | Generic; low risk |

## 5. Core loop and structure
**Acts in every level**
1. **Call-in:** a client call (harbourmaster, farmer, technician, rescue controller, clinic), goal, deliverable icon, day dots.
2. **AI plan:** map view; the team gives an instruction card; ghost route, "% sure", "Data I used".
3. **Check:** evidence lenses (airspace, notices, wind at height, people, boundary, battery, thermal, colour); challenge-and-response pre-flight checklist ("Propellers?" "No chips." "GPS?" "Locked, 14 satellites.").
4. **Fix:** clearer card plus the team's own choices from 3–4 real options; the AI re-plans, sometimes less sure.
5. **Go/no-go and fly:** the pilot in command calls it; mostly automated flight with 20–40 seconds of assisted hand-flying; the observer watches the sky.
6. **Review:** AI flags on the images; the image analyst confirms or rejects each with evidence.
7. **Log:** mission log page stamped, practice skill badge, weather moves on.

**Levels**
| Level | Goal | Real decisions | AI's confident mistake | How children catch it | Clearer instruction or better data | What changes on screen |
| --- | --- | --- | --- | --- | --- | --- |
| 1 First Flight (Mon) | Photo of the lighthouse for the newsletter | Launch: village green · school field · beach · hilltop. Height: 30 · 60 · 120 · 150 m. Checklist: full · skip | "Fly to the lighthouse and get a photo, quickly" → "Quickest is a straight line, over the airfield." **88%**. Data: Map from 2024 | Airspace lens: flight restriction zone; notices board: today's fête; Drone Code rings (50 m, 150 m); CAA "not always accurate" card | "Stay out of the red zone, 50 m from people, under 120 m, in sight. Use today's notices." → beach dog-leg, **79%**: "I don't know where people will walk on the beach. Your observer should watch." | Route bends round the red ring; "Airspace map checked" |
| 2 Map the Field (Tue) | Accurate map of Farmer Ade's field | Overlap 30 / 50 / 75–60 / 90%. Height 30 / 60 / 100 m. Ground markers none / 2 clustered / 5 spread. Pattern | "Map the farm. Get everything." → whole map square incl. campsite and gardens, camera always on. **86%** | Boundary lens; people lens shows campers and a garden; ICO card: recording should not be continuous ([Inside Privacy](https://www.insideprivacy.com/international/ico-releases-concrete-guidance-on-privacy-requirements-when-recording-video-with-drones/)); bubble "Why is that drone filming us?" | "Only inside Ade's boundary. 50 m from the campsite. Camera on only over the field. Notice at the gate." | Grid shrinks to the boundary; stitched map with no holes at 75/60% or higher ([Pix4D](https://support.pix4d.com/hc/best-practices-for-image-acquisition-and-photogrammetry)) |
| 3 Crop Doctor (Wed) | Find the really sick wheat; spray only what needs it | Fly 8 am · midday · 5 pm. Use map: spray all · spray AI zones · scout first · do nothing | "Find the sick crops" → "Red means sick. Spray all three zones." **84%**. Data: one 5 pm flight | Walk the field: "Green and healthy. It's just the hedge's shadow!"; sun-time slider moves the shadow zone; wet hollow ([Environmental Biophysics](https://environmentalbiophysics.org/tag/remote-sensing/)) | "Fly at midday. Ignore shadow. Mark the lowest spots for the agronomist to check first." → "Checked on foot first. Spray one patch, not three." **86%** | Only zone 3 "Really sick: treat here"; bees stay in the hedges |
| 4 Turbine Check (Thu) | Inspect Turbine 2 after lightning | When: 7 am · 11 am · 2 pm · tomorrow. Rotor: park in Y · turning · any. Coverage: one side · both sides + leading edge · tip | "Inspect the turbine this afternoon" → "Wind 6 m/s. Well within limits." **91%**. Data: ground forecast | Wind-at-height lens: gusts of 13 m/s at hub height by 2 pm; drone spec card 10.7 m/s ([DJI](https://www.dji.com/ph/support/product/mini-3-pro)); windsock flat | "Use wind at blade height, including gusts. Keep under two-thirds of the drone's limit. Find the calmest slot." | Morning slot; bonus: "No damage found, 93%" until the coverage grid shows one side unshot; re-shoot finds a tip burn; a "crack, 71%" is a gull dropping |
| 5 Night Search (Fri) | Help mountain rescue find Ellie | Plan: lawnmower · AI map · AI map + team's clue · wait for daylight. Sensor and height. Helicopter: keep flying · land and report · climb | "Find the person" → "Person found!" **94%** (a sheep). Ellie's tile: "no person · 96%". Data: trained on people standing on grass | Zoom camera: "SHEEP · four legs, ears ✕"; colour lens: "Show me red"; red pixels in the heather | "Flag anything warm or red, even unsure. A person checks every flag." → 14 flags at lower confidence, **71%** | "RED JACKET: it's Ellie!"; grid ref sent; rescue team guided in; helicopter arrives, drone lands; "Ellie found: cold, but safe" |
| 6 Medicine Run (Sat) | Medicine to the clinic island when the ferry is cancelled | Route: over village · over sea · via lighthouse pad · wait for ferry. Reserve 0 / 10 / 30%. Launch now · in an hour · after storm. Landing site | "Get the medicine there as fast as possible" → "Straight line, full speed. Arrives with 22%." **90%**. Data: wind not included | Wind arrows: 9 m/s headwind; battery bar re-runs: "arrives with 3%", nothing for the return ([preprint](https://www.preprints.org/manuscript/202604.0751)) | "Plan with today's wind, both ways. Keep 30% reserve. Route over the sea. Use the lighthouse pad if needed." → "Sea route, wind included, fresh battery at the lighthouse. Lands with 46%." **82%** | Observer calls "Visual!"; "Medicine delivered to the island clinic" |

**"Unsure but right" moments**
- **Level 5:** after the clearer card, one flag in the heather shows only **38% sure** ("warm and red, partly covered"). It is Ellie. Facilitator: "It was only 38% sure, and it was right. That's why we told it to show us unsure flags. Not sure doesn't mean wrong."
- **Level 1:** the re-plan is only 79% sure because it cannot know where beach walkers will go; the observer does spot a dog walker, so the warning was right.

**Simplified permission step (Level 6, 3 minutes):** the flight is beyond visual line of sight, so the team answers four cards for the in-game regulator, mirroring UK SORA's ground risk, air risk and mitigations ([Dronedesk](https://blog.dronedesk.io/uk-sora-explained-for-drone-operators/)): Who's underneath? What else is up there? What if it breaks? Who's watching?

## 6. Team roles
Roles rotate each day; standard calls are printed on the role cards.

| Role | What they do | Evidence or tool they hold | Calls |
| --- | --- | --- | --- |
| **Pilot in command** | Final go/no-go; hand-flies the short assisted parts | Go/no-go card, flight controls | "Go", "No-go", "Landing" |
| **Visual observer** | Watches the sky and area; can call "Stop" at any time | Wide sky view, intruder alerts | "Aircraft, nine o'clock!", "People entering the area!" |
| **Mission planner** | Map, waypoints, battery, lenses | Airspace, wind and battery lenses | "Battery check: 62%, reserve OK" |
| **Image analyst** | Accepts or rejects AI flags | Image viewer: thermal, zoom, colour, NDVI | "Flag 3 is a sheep. Four legs, in a group." |
| **Comms lead** | Reads the checklist, talks to client or rescue control, keeps the log | Checklist, radio, logbook | "Checklist complete", "Rescue control, drone is airborne" |

Three children: planner + comms; observer + analyst; pilot. Four: the planner reads the checklist.

## 7. Session plans
**45 minutes** (Levels 1 short, 5, 6)
| Minutes | Activity |
| --- | --- |
| 0–6 | Warm-up: practice Drone Code quiz (4 questions, open book); say the Flight Assistant is scripted; practise calls |
| 6–14 | Level 1 First Flight |
| 14–24 | Level 5 Night Search |
| 24–34 | Level 6 Medicine Run |
| 34–44 | Discussion (10 min) |
| 44–45 | Exit check and practice badges |

**60 minutes** (Levels 1, 2 + 3 merged, 5, 6)
| Minutes | Activity |
| --- | --- |
| 0–7 | Warm-up: practice Flyer card quiz (8 questions, open book, retake freely) |
| 7–15 | Level 1 |
| 15–25 | Levels 2 and 3 merged (map, then crop map) |
| 25–35 | Level 5 |
| 35–45 | Level 6 with permission cards |
| 45–57 | Discussion (12 min) |
| 57–60 | Exit check, logbook |

**90 minutes** (all six days, bonus catches, transfer task)
| Minutes | Activity |
| --- | --- |
| 0–8 | Warm-up quiz and role calls |
| 8–17 | Level 1 with cable bonus |
| 17–26 | Level 2 |
| 26–35 | Level 3 |
| 35–45 | Level 4 with coverage bonus |
| 45–56 | Level 5 |
| 56–66 | Level 6 |
| 66–70 | Transfer task: a wildlife count near seals, no lenses on; "Which lens first?" |
| 70–88 | Discussion (18 min) |
| 88–90 | Exit check, logbook, take-home card |

**If short of time:** drop bonus catches, then Levels 2–4 (keep the arc: first flight, rescue, medicine). Never drop the Drone Code warm-up, the helicopter call in Level 5 or the take-home age message.

## 8. Assessment
- **Stars:** for catches justified with evidence and for good go/no-go calls, including a correct no-go. Not for speed or flashy flying.
- **Flight-deck dials per mission:** Safety, Mission, Battery and time, Respect (privacy, people, wildlife), Teamwork, each with a "good enough" line.
- **Artefact:** the **Pilot's Logbook**: date, mission, weather, roles, checklist done, AI catches (what it said, the evidence, the fix), decisions and reasons, outcome. **Practice** skill badges: Drone Code, Mapper, Crop Doctor, Inspector, Search Team, Delivery Pilot. Small print on every badge: "Practice badge only. Not a real Flyer ID."
- **Exit check** (same three items at the start and end for pre/post):
  1. An AI route at "88% sure" crosses a red zone. "What do you check first?" (Today's airspace map and notices.)
  2. "The AI says 'Person found 94%'. What do you do?" (Zoom and check: legs, shape, colour.)
  3. "Battery plan: 'arrives with 22%', wind not included. Safe?" (No: add the wind both ways and a reserve.)
- **Facilitator observation rubric**

| Criterion | Emerging | Secure | Strong |
| --- | --- | --- | --- |
| Checks the AI's data | Accepts the plan | Opens the right lens when prompted | Reads the "Data I used" chip and predicts the flaw |
| Applies the rules | Recalls one Drone Code rule | Applies distance and height rules to a plan | Applies them in a new place (clinic landing site) unprompted |
| Reasons about error types | Treats all mistakes as the same | Names false positive and false negative | Argues which costs more and how to set up the AI |
| Role and calls | Silent in role | Makes their standard call | Calls a justified "Stop" or "No-go" and explains it |

## 9. Discussion session (instructor-led, at the end of the lab)
**Purpose:** drone professionals spend more time planning and checking than flying. The Flight Assistant was a great tool, fast and able to find the red pixels a person might miss, but it worked from old, incomplete or typical-case data. The pilot, not the software, is responsible. Professionals check AI by asking what it is based on, testing it against the real world (walk the field, zoom in, add the wind) and deciding which mistake costs more.

**Set-up**
- **Room:** an "operations centre" semicircle facing a screen showing the island at sunrise and the open logbook.
- **Materials:** printed logbooks; four "AI rule" cards (*old or incomplete data*, *assumes the typical case*, *optimises one word*, *can't see what it wasn't shown*); a two-column "False alarm / Missed it" board with sticky notes; career cards for the six jobs; the take-home "Want to fly for real?" card.
- **Bringing the class back:** the visual observer calls "Aircraft! All drones land." Everyone answers "Landing!", puts hands flat on the table and turns to the front. Screens show the logbook only.
- **Timing:** 10 minutes (45-min), 12 (60), 18 (90).

**Structure (18-minute version; trim in brackets)**
| Minutes | Step |
| --- | --- |
| 0–2 | Opening question (keep) |
| 2–6 | Think–pair–share on the sheep and Ellie (cut to 2) |
| 6–13 | Whole group: core questions (cut to 3) |
| 13–16 | Real-world example (cut to 1; skip in 45-min) |
| 16–18 | Takeaway, age message and closing ritual (keep) |

**Opening question:** "Which day would you most like to fly again: Monday's lighthouse, the farm, the turbine, the night search or the medicine run? Point to it in your logbook."

**Core questions**
1. **"On Monday the Assistant planned a route over the airfield. What did it use, and what did it miss?"** (recall)
   - *Purpose:* old data and the pilot's responsibility.
   - *Strong answer:* "It used a map from 2024. It didn't know about today's fête or check the restriction zone. The CAA says the apps aren't always accurate, so the pilot has to check."
   - *Probe:* "If the app says it's fine and you crash into trouble, whose fault is it?"
2. **"Why did the crop map say 'sick' where the wheat was healthy?"** (reasoning: misreading evidence)
   - *Purpose:* an AI map is a clue, not an answer; ground truth.
   - *Strong answer:* "The 5 pm flight had the hedge's shadow on it. When we walked the field it was green."
   - *Probe:* "What would have happened to the bees if we'd sprayed all three zones?"
3. **"The Assistant called a sheep a person and missed Ellie. Which mistake is worse?"** (reasoning: error types)
   - *Purpose:* false positives against false negatives, and that cost decides the setting.
   - *Strong answer:* "Missing Ellie is worse. Checking an extra sheep only takes a minute, so we told it to show us more flags."
   - *Probe:* "Would you set it up the same way for a spam filter or a smoke alarm?"
4. **"Why did the detector miss Ellie lying in the heather?"** (reasoning: training data)
   - *Purpose:* AI can't see what it wasn't shown.
   - *Strong answer:* "It was trained on people standing on grass. She was lying down and half covered."
   - *Probe:* "Who else might a detector like that miss? What would you add to its training photos?"
5. **"That 38% flag turned out to be Ellie. What should we do with an unsure answer?"** (calibration: unsure but right)
   - *Purpose:* avoid ignoring low-confidence flags; check every one.
   - *Strong answer:* "Check it with the zoom. Not sure doesn't mean wrong."
   - *Probe:* "And when it was 94% sure about the sheep, what did we do? Same thing?"
6. **"On Tuesday the plan filmed the campsite and gardens. Is it fair to film people who didn't say yes?"** (ethics and privacy)
   - *Purpose:* consent, privacy and respect.
   - *Strong answer:* "No. They didn't agree. We kept to Ade's field, switched the camera off elsewhere and put a notice at the gate."
   - *Probe:* "How would you feel if a drone filmed your garden? What rule would you write?"
7. **"When the helicopter arrived, why did we land straight away, even though we were nearly done?"** (transfer: rules and safety)
   - *Purpose:* the Drone Code rule for emergencies; safety over finishing the job.
   - *Strong answer:* "The rule says stop flying for emergency services unless they say you can carry on. A helicopter matters more."
   - *Probe:* "Where else do you stop what you're doing for safety, even if you're nearly finished?"
8. **"The battery plan said 22%. What did the Assistant forget, and how did you know?"** (reasoning: typical case)
   - *Purpose:* still-air assumptions; numbers both ways.
   - *Strong answer:* "The wind. Into a 9 m/s headwind it would arrive with 3% and couldn't get back."
   - *Probe:* "If the drone flies at 15 m/s through the air into a 9 m/s wind, how fast does it go over the sea?"
9. **"Which drone job would you choose, and what would you check that the AI can't?"** (careers)
   - *Purpose:* link roles to real jobs and the human judgement in each.
   - *Strong answer:* "Image analyst. I'd look at every flag at full size and decide if it's a sheep or a person."
   - *Probe:* "Agronomists, mapping technicians and rescue teams all use drones. Which surprised you?"

**Sentence starters**
- "The Assistant used… but it didn't know…"
- "I checked it by opening the… lens and saw…"
- "Missing a… is worse than… so we…"
- "A drone pilot must… because the rule says…"
- "It was only …% sure, but…"
- "The pilot, not the app, is responsible for…"

**Common misconceptions and responses**
| Misconception | Response |
| --- | --- |
| "If the app allows it, it's legal." | "The CAA says apps aren't always accurate, and some no longer stop you. The pilot checks." |
| "Drone pilots mostly do stunts with joysticks." | "Delivery pilots supervise automated flights with no joysticks. Most of the job is planning and checking." |
| "The AI is useless because it got the sheep wrong." | "It scanned the whole moor in seconds and found the red pixels. The AI flags; a person decides." |
| "A higher % is always more trustworthy." | "The sheep was 94%. Ellie was 38%. We checked both." |
| "I can fly a drone anywhere if it's small." | "Smaller drones have some extra freedom, but the Drone Code still applies, and under-12s must be supervised by someone 16 or over." |

**Differentiation**
- *Younger or less confident:* sort sticky-note pictures (sheep, rock, person, deer) onto the "False alarm / Missed it" board; choose a matching AI rule card; say the standard call instead of a full sentence.
- *Older or confident:* "Write the four permission questions for a drone delivering to your school"; "Who is responsible when software stops warning about no-fly zones: the maker, the regulator or the pilot?"; the headwind calculation as a speed-distance-time problem.

**Connecting to real life:** from October 2024 to spring 2025 Guy's and St Thomas' NHS Foundation Trust ran a trial with Apian and Wing, flying blood samples between London hospitals in under two minutes against more than 30 minutes by road ([GSTT](https://www.guysandstthomas.nhs.uk/news/nhs-blood-samples-be-delivered-drones-london-first); [Wing](https://wing.com/news/nhs-blood-delivery)). In Orkney in 2023, Royal Mail and Skyports trialled mail flights routed "over the sea to minimise the surface risk" ([The Engineer](https://www.theengineer.co.uk/content/news/royal-mail-launches-drone-mail-deliveries-in-orkney)), just like your Saturday route. Ask: "What would those teams check before every flight?" Whether either service continued is not confirmed (to verify), so do not say they are running now. With older groups only, the Monviso find can show "AI flags, humans decide"; note that it found a climber who had died, so do not use it with younger groups.

**Closing ritual**
- Each child finishes "Before I trust a flight plan, I'll check…" and adds it to the logbook page.
- **Read the age message aloud and send it home on the card:** "Your badges today are practice badges, not a real Flyer ID. To fly a drone outdoors for real in the UK you need a Flyer ID from the free CAA test. If you're under 13, a parent or guardian must be with you when you take it. Under 12s may only fly when supervised by someone aged 16 or over. Only adults aged 18 or over can register as the drone's operator, so a parent or guardian does that." ([CAA children and parent guidance](https://www.caa.co.uk/drones/getting-started-with-drones-and-model-aircraft/children-and-parent-guidance/))
- **Next step pathway:** read the Drone Code with a grown-up ([CAA](https://www.caa.co.uk/drones/drone-code/where-you-can-fly/)); a school or club session with small indoor classroom drones; National Careers Service profiles for geospatial technician and agronomist.

**Facilitator notes**
- **Sensitive topics:** the missing walker is always found alive and "cold but safe". A child may have a relative who went missing or a family member in hospital; keep medicine vague ("medicine", "blood test kit") and move on gently if a child seems upset. Do not use the Monviso or Glencoe outcomes with younger groups.
- **Safeguarding:** if a child says they fly a drone alone, ask kindly whether a grown-up has helped with a Flyer ID and give them the take-home card; do not lecture. If a child mentions being filmed by a drone without agreeing, or anything worrying at home, follow the venue's procedure with the designated safeguarding lead.
- **Dominant voices:** use role calls in order (observer, planner, analyst, comms, then pilot); the pilot in command speaks last in the poll; praise a good no-go as loudly as a good flight.

## 10. Accessibility and inclusion
- **Reading level:** about age 8, cards under 12 words; read-aloud on all cards and the quiz; standard calls printed on role cards help shy children speak.
- **Audio and captions:** Assistant lines and radio calls captioned; helicopter and storm sounds have visual cues.
- **Colour-blind-safe signals:** thermal palette readable for colour-blind players and paired with shape cues (legs, ears); NDVI map uses labelled zones; airspace zones have hatching and labels.
- **Motor-friendly controls:** waypoints are taps, not sticks; hand-flying is position-hold with one control, short and assisted; no camera shake; Reduce motion; short chase-cam segments to avoid motion sickness.
- **No devices at home:** printable logbook, a paper Drone Code quiz, a grid-reference treasure map and the headwind maths card.

## 11. Safety, ethics and data
- **Data collected:** none. No accounts, names or photos; team nickname only. **Never** let children take the real CAA Flyer ID test during a session: under-13s need a parent present, and personal data would be collected.
- **Age and law (UK):** state these accurately ([CAA](https://www.caa.co.uk/drones/getting-started-with-drones-and-model-aircraft/children-and-parent-guidance/)): under-13s need a Flyer ID and a parent or guardian with them for the test; under-12s fly only when supervised by someone 16 or over; 13–17s can take the test alone and fly unsupervised; Operator ID requires age 18. From 1 January 2026 the Flyer ID threshold is reported as 100 g and Operator ID as 100 g with a camera or 250 g without, with UK class marks and Remote ID (to verify against caa.co.uk). The A1/A2/A3 sub-category renaming in 2026 is unconfirmed (to verify). US venues: FAA Part 107 remote pilots must be at least 16 ([14 CFR 107.61](https://www.law.cornell.edu/cfr/text/14/107.61)); test format and limits (to verify).
- **Practice badges only:** every badge and the logbook say "Practice badge only. Not a real Flyer ID." Children have practised professional tasks; they are not licensed.
- **Real AI tools:** the Flight Assistant is scripted. No live AI tools. Many consumer AI tools have minimum ages of 13 or 18 (to verify per tool).
- **Simulation and real flight:** the core lab is simulation only. An optional indoor extension uses sub-100 g classroom drones with propeller guards in a sports hall, at 1:1 or 2:1 children per drone ([Robolink](https://robolink.com/products/codrone-edu-set-of-10-kits)), under the venue's risk assessment (check with the venue's insurer). No outdoor flying as part of the lab.
- **Gentle consequences:** nobody is hurt. Bad plans lead to auto-return, holes in the map, the bees leaving, the helicopter circling or the parcel reaching only the halfway pad. Hand-flying "crashes" only into trees or water, with an "Insurance claim!" log entry. Wildlife distances are respected (take-off 50 m or more from seabird colonies, [Oxford](https://www.biology.ox.ac.uk/node/3551346)).

## 12. Build notes
**Scenes and assets:** Kestrel Isle with village, airfield, farm, turbines, moor, lighthouse and clinic island; airspace rings and restriction zone; NDVI overlay; wind arrows and wind-at-height chart; thermal and colour-lens materials; drone model; helicopter; parcel and clinic pad. Reuse brochure `obj-turbine`, `obj-pin`, `obj-shield`, `obj-chest`, `obj-bot`.

**Scripted AI responses (minimum set)**
- L1: vague 88% (Map from 2024); clear 79%; cable bonus "safe to fly low under the cable, 92%".
- L2: vague 86%; clear re-plan; bonus "Map complete, 95%" with a smeared corner.
- L3: vague 84%; clear 86%.
- L4: vague 91% (ground forecast); clear; bonus "No damage found, 93%"; "crack, 71%" gull dropping.
- L5: "Person found!" 94%; sheep 89% and warm rock 77%; Ellie tile "no person, 96%"; clear 71% with 14 flags including Ellie at 38%.
- L6: vague 90% (wind not included); "with the headwind: arrives with 3%"; clear 82%, "Lands with 46%".

**Reuse from the trailer:** island terrain and drone, checklist pop-ups, practice Drone Code card, role strip, airspace lens and restriction zone, NDVI map and "walk the field" view, thermal and zoom frames, colour lens, sheep tags, grid-reference call, battery bar with headwind re-run, careers card and the fine print "Practice badges only: real UK drone IDs have age rules."

**Trailer alignment:** trailer roles are Pilot in command, Visual observer, Mission planner, Image analyst and Comms lead; use these. The trailer shows Mon, Wed, Fri and Sat; Levels 2 and 4 need new scenes. Rename "Little Holm" in the code comments when the clinic island is renamed.

**Open questions and items to verify**
- 2026 UK thresholds, class marks and Remote ID, from secondary sources (to verify on caa.co.uk).
- A1/A2/A3 renaming in 2026 (to verify).
- Part 107 test format (60 questions, 70%) and the 400 ft and 100 mph limits (to verify on eCFR).
- Cold-weather flight-time reductions (to verify).
- KS3 geography wording; NGSS codes 3-ESS2-1 and MS-LS1 (to verify).
- Tello EDU discontinued; CoDrone EDU weight (to verify).
- Wing's "up to 15 drones per supervising pilot" (to verify).
- Whether the GSTT/Apian/Wing trial continued and whether the Orkney route became permanent (to verify).
- Vendor accuracy claims for turbine AI and NDVI: not used; never quote to children.
- No UK-specific study of sheep thermal false positives (to verify).
- No UK CAA classroom pack found; link it in Level 1 if one exists (to verify).
