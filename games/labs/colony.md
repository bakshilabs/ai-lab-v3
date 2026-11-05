# Build a Space Colony: design document

> Strand: Career skills · Ages: 8–14 · Session: 45 / 60 / 90 min · Trailer: `games/trailers/colony/` (`out/colony.mp4`)

Source research: `research/new-labs/space-colony.md`. Facts marked "(to verify)" were not confirmed in that research and must be checked before build or print.

## 1. Summary
A crew of four lands on a red floating island, and a planning AI called the Planner drafts their whole colony in seconds. Across six levels (site, shelter, air and water, power, food, crew life) the Planner makes confident mistakes that echo real events: it reads "best" as "sunniest", sizes power for an average day and trusts a story about growing potatoes in Mars soil. Children catch each mistake with an evidence lens, fix the instruction or add the missing data, and learn the job of a life-support engineer or mission planner: the AI drafts, people check and sign off.

## 2. Learning outcomes
- By the end, learners can point to the assumption behind an AI plan ("What I assumed") and say which piece of evidence shows it is wrong.
- By the end, learners can rewrite a vague instruction into one with a worst case, a number and a priority (for example "Enough power for a 100-sol dust storm. Life support first.").
- By the end, learners can read a simple trend graph (oxygen over 10 sols, power through a storm) and say whether the colony is safe.
- By the end, learners can trace how one choice ripples through a system (shelter → power → air) on the colony loop diagram.
- By the end, learners can explain why "% sure" is not the same as right, and give one example where the Planner was unsure but right.
- By the end, learners can name two real jobs that do this checking every day, on Mars and on Earth.

**Curriculum links**
- **KS2:** Y5 Earth and space; living things and habitats; Y5–6 line graphs ([DfE science](https://www.gov.uk/government/publications/national-curriculum-in-england-science-programmes-of-study)).
- **KS3:** photosynthesis, gas exchange, ecosystems; DT "design and make products and systems that meet human needs" ([DfE DT](https://www.gov.uk/government/publications/national-curriculum-in-england-design-and-technology-programmes-of-study/national-curriculum-in-england-design-and-technology-programmes-of-study)); computing, evaluating and debugging ([DfE computing](https://www.gov.uk/government/publications/national-curriculum-in-england-computing-programmes-of-study)). Science and computing wording (to verify).
- **KS4 (age 14 stretch):** GCSE biology cycles of matter; DT systems (to verify).
- **NGSS:** 5-LS2-1, MS-LS2-3; MS-ETS1-1 to -4 ([CA NGSS](https://www2.cde.ca.gov/cacs/id/web/29085)).
- **UNESCO AI competencies:** human-centred mindset (people sign off); ethics of AI (wellbeing over productivity); AI techniques and applications (planners, anomaly detection).
- **AI4K12 Big Ideas:** 2 Representation and reasoning; 3 Learning (missing data); 5 Societal impact (who is accountable for a plan).

## 3. Real-world connection and careers
**Jobs this mirrors**
- **Life-support (ECLSS) engineer:** designs, tests and runs air, water and waste systems; staffs the ISS life-support console ([NASA profile](https://www.nasa.gov/?p=96770)).
- **Space architect:** designs habitats and tests mock-ups in analogue sites ([Vault](https://legacy.vault.com/industries-professions/professions/s/space-habitat-designers/the-job)).
- **Mission planner:** builds daily plans with tools such as MAPGEN and Playbook ([NASA NTRS](https://ntrs.nasa.gov/api/citations/20050184145/downloads/20050184145.pdf)).
- **Systems engineer:** runs trade studies on digital models, such as a Gateway ventilation digital twin ([NASA NTRS](https://ntrs.nasa.gov/citations/20240014472)).
- **Plant scientist:** runs growth chambers; EDEN ISS grew 268 kg of food on 12.5 m² in 9.5 months ([DLR](https://www.dlr.de/en/latest/news/2018/2/20180625_rich-harvest-in-the-antarctic-eden-iss-greenhouse-tomatoes-and-cucumbers-in-the-polar-night_28538)).
- **Health and safety officer:** at the Mars Desert Research Station even the commander defers to the HSO on safety ([MDRS roles](https://sites.google.com/a/marssociety.org/mdrs2013/crew-roles)).
- **On Earth** the same skills run water companies, hospitals, farms and power grids. 52% of UK space organisations report workforce skills gaps ([GOV.UK](https://www.gov.uk/government/publications/space-sector-skills-survey-2023/space-sector-skills-survey-2023-report)).

**How professionals use AI here today, and how they check it**
- **Mixed-initiative planning:** MAPGEN drafted each Mars rover's daily plan; people checked and approved it. This is the model for the Planner.
- **Anomaly detection:** NASA's Inductive Monitoring System learns "normal" from sensor archives and flags deviations ([NASA spinoff](https://spinoff.nasa.gov/node/10539); current ISS status to verify). Models trained on "normal" can raise false alarms when conditions change.
- **Generative design:** humans set constraints and judge results, because "left to itself, the algorithm can sometimes make structures too thin" ([Popular Science](https://www.popsci.com/?p=512885)).
- **Checks:** trend reviews, worst-case tests, a second sensor, written assumptions and a sign-off before anything goes live.

## 4. Setting, look and characters
- **Style:** one floating voxel Mars diorama in the brochure style (`island-mars.png`): rust plateau, crater rim with a pale ice scarp, a lava-tube mouth, a dusty equatorial plain, deep indigo sky with Earth as a small blue dot. The colony grows visibly: survey pegs, inflatable module, regolith mound, ice drill and pipes, gold battery bank, glowing greenhouse.
- **The AI helper: the Planner.** A navy console card with no face and no feelings, a "PLAN" tag, a "% sure" bar with words ("fairly sure, 84%"), a **USED** row of data chips and an **ASSUMED** row. Chips can carry tags such as FICTION or EARTH. Voice: calm, plain, "based on…", "I don't have data on…". The CIMON "Don't be so mean please" episode ([NBC News](https://www.nbcnews.com/tech/innovation/don-t-be-so-mean-cimon-european-space-robot-cops-n943336/)) is why it has no persona.
- **Crew:** four or five tiny voxel crew in role-coloured suits, varied skin tones, and a wheelchair-using mission controller in the call-home scenes.
- **Camera views:** Sky (diorama), Inside (cutaway module), Lens (data overlay), Suit walk (short outdoor rail).

**Fictional names and check status**
| Name | Use | Check |
| --- | --- | --- |
| the Planner | AI tool | Generic word; low risk |
| Ice Harbour | Example colony name (in trailer) | Ice Harbor Dam and an Ice Harbor brewery exist in the US; generic phrase, low risk (to verify) |
| Greenlight Base, Deep Cave Station, Storm-Proof Outpost | Other colony names | Not yet checked (to verify) |
| Crew members | Unnamed role badges | No check needed |

## 5. Core loop and structure
**Acts in every level:** (1) **Mission brief** with budget bars for mass, power, water and crew hours; (2) **Ask the Planner**: the Commander plays one of three cards, one deliberately vague, and the Planner shows ghost blocks, % sure, USED and ASSUMED (tapping ASSUMED is a starred "pro move"); (3) **Check**: the role who owns the lens opens it; (4) **Fix**: a clearer card or a data tile dragged into USED, then a choice from 3–4 real options; (5) **Sign-off**: the Safety officer reads "Within budget? Worst day tested? Everyone agrees?" and the Commander stamps it; (6) **Run a sol** in the digital twin; (7) **Celebrate**: a ring segment fills and roles rotate.

**Levels**
| Level | Goal | Real decisions | AI's confident mistake | How children catch it | Clearer instruction or better data | What changes on screen |
| --- | --- | --- | --- | --- | --- | --- |
| 1 The site (Sol 1) | Choose a safe site | Dusty plain · ice plain · crater rim · lava tube | "Find the best place for our colony" → "Best means flattest and sunniest: the dusty plain." **88%**. Assumed: best = most sun | Scientist's ice radar: "none in 200 km" at the plain, "2 km away" at the ice plain; water bar shows extra cargo flights | "Flat, safe, and within 5 km of buried ice" → ice plain, **71%**: "Ice depth is uncertain, so drill a test hole first" | Ghost colony slides to the ice plain; survey pegs and flag appear |
| 2 Shelter (Sols 2–10) | Block radiation | Metal modules · inflatable + regolith mound · printed shell · lava tube | "Build strong walls" → steel panels, 40 tonnes. **84%**. Used: Earth building codes | Engineer's cargo bar: three rockets against a budget of one; radiation-dots lens in bedrooms (about 0.67 mSv a day on the surface, [SwRI](https://www.swri.org/press-release/swri-scientists-publish-first-radiation-measurements-surface-mars)) | "Protect the crew from radiation using Mars materials. One cargo flight." → **76%** | "2 m of regolith blocks radiation"; mound rises over the module |
| 3 Air and water (Sols 10–40) | Keep the loop running | Tanks from Earth · ISS-style loop · algae loop · hybrid | "Make sure there is enough oxygen" → "Balanced, +10%." **91%**. Assumed: nothing else uses oxygen | Run 10 sols: oxygen trend slides 20.9 → 20.1 → 19.4. Tap soil and fresh walls to see arrows the Planner never counted (the Biosphere 2 story, [Kenyon summary](https://biology.kenyon.edu/slonc/bio3/2000projects/carroll_d_walker_e/whatwentwrong.html)) | Drag "soil microbes" and "fresh walls" tiles; "Count everything that uses oxygen; keep a 30-day reserve" → **68%**: "There may be others: keep watching the trend" | "Air and water loop: 98% recycled" ([New Atlas](https://newatlas.com/space/nasa-converts-pee-to-drinkable-water-on-international-space-station)); loop diagram drawn |
| 4 Power (Sols 40–150) | Power through a dust storm | Solar field · solar + battery · small fission · mixed | "Give us enough power" → "Average sunshine × panels = plenty. 100 m² of solar." **90%**. Assumed: every sol is a normal sol | Engineer's storm test: dust wall rolls in, power graph falls from 600 to about 3%, the Opportunity curve ([2018 storm](https://en.wikipedia.org/wiki/2018_Mars_global_dust_storm)) | "Enough power for a 100-sol dust storm. Life support first." → solar plus batteries, **79%**; children drag a load-priority list | Lights go out, then the gold battery bank keeps life support on in the re-test |
| 5 Food (Sols 150–300) | Fresh food for four | Packed food · hydroponics · algae tank · Mars-soil beds | "Grow lots of food without wasting water" → "Plant potatoes straight into Mars soil, like in a famous space story." **86%**. Used: space-farming stories (FICTION) | Scientist's soil test: perchlorate 0.6%, "toxic to people, stunts plants" ([Astrobotany](https://astrobotany.com/martian-soil/)); seedlings wilt | "Fresh food in clean water under lights. Test soil first." → hydroponics, **74%** | Greenhouse glows; "First harvest: lettuce and tomatoes" |
| 6 Crew life (Sols 300–668) | Plan the first Mars year | AI-optimised · fixed shifts · self-scheduling · rest sol | "Plan the most productive week possible" → "14-hour days, solo walks outside." **83%**. Assumed: rest is optional | Safety officer's wellbeing lens: sleep bars red, error rate climbs; the two-person rule broken. Safety officer plays STOP | "8 hours' sleep, a rest day, two people for every walk outside" → **77%** | Crew walk in pairs; "Watch your colony live" |

A Mars year of 668 sols is from the researcher's own knowledge (to verify).

**"Unsure but right" moments**
- **Level 5:** "I am only **55% sure** tomatoes will do better than peppers here." It is right: peppers and strawberries failed in EDEN ISS. Facilitator line: "It was only 55% sure, and it was right. Not sure doesn't mean wrong."
- **Finale (Level 6):** at night, "TOXIC LEAK in Module 2: **95% sure**. Evacuate." The crew follow the alarm card first, then check a second sensor (normal) and the data computer (fault light). This is the 14 January 2015 ISS false ammonia alarm ([NASA ISS summary](https://www.nasa.gov/blogs/stationreport/2015/01/14/iss-daily-summary-report-01-14-15/)). Then the Planner flags "slow water-loop leak, **52% sure**". The trend shows it is real and speeding up, like the ISS coolant leak that went from about 5 lb a year to 5 lb a day ([NASA NTRS](https://ntrs.nasa.gov/api/citations/20140000513/downloads/20140000513.pdf)). Children fix it.

## 6. Team roles
Based on MDRS crew roles and Challenger Center teams. Roles rotate every level.

| Role | What they do | Evidence or tool they hold |
| --- | --- | --- |
| **Commander** | Plays the instruction card, calls the vote, stamps the sign-off | Budget bars, plan summary, the stamp |
| **Life-support officer** | Watches air and water | O₂/CO₂ dial, water-loop %, "trend over 10 sols" view |
| **Engineer** | Power, structures, cargo mass | Cargo bar, storm test ("worst day") |
| **Scientist** | Ground and soil checks | Ice radar, radiation map, soil test, data tiles to add to USED |
| **Safety officer** (5th child) | Wellbeing and alarms; reads the checklist | Wellbeing lens, alarm card, the red **STOP** card |

With three children: Commander + Safety; Life-support + Scientist; Engineer. HI-SEAS crews decided by consensus ([Auckland repository](https://researchspace.auckland.ac.nz/handle/2292/28650)), so the Commander calls the vote and only breaks ties on time.

## 7. Session plans
Minutes for each phase. Every version starts by saying the Planner is scripted.

| Phase | 45 min (Levels 1, 3, 4, 6) | 60 min (all six; Levels 2 and 5 from cards) | 90 min (all six in full) |
| --- | --- | --- | --- |
| Warm-up: "Sure or not sure?" on two Mars facts; roles | 0–4 | 0–5 | 0–8 (adds a Biosphere 2 picture story) |
| Play: Levels 1–3 | 4–17 (L1, L3) | 5–24 | 8–36, then 36–40 unplugged loop diagram on paper |
| Play: Levels 4–6 | 17–35 (L4, L6) | 24–45 | 40–70, with a Challenger-style role swap after Level 4 |
| Discussion (section 9) | 35–43 | 45–57 | 70–88 |
| Wrap-up: exit check, Colony Charter, next steps | 43–45 | 57–60 | 88–90 |

**If short of time:** cut Levels 2 and 5 first (show their default choices on the loop diagram), then the role swap, then the "run a sol" time-lapses. Never cut the storm test, the finale's false alarm or the discussion's closing ritual.

## 8. Assessment
- **Stars:** one for each confident mistake caught with evidence, one for each "unsure but right" warning taken seriously, one for a well-used STOP card. No stars for high Planner confidence.
- **Catch log:** a row of stamps ("sure and wrong", "unsure and right", "sure and right") that becomes the Planner's track record.
- **Artefact:** the **Colony Charter**: site card, loop diagram, crew rota, three crew promises, colony name (from the two strongest of seven ring segments: Shelter, Air, Water, Power, Food, Wellbeing, Self-reliance) and the catch log.
- **Exit check (picture-based for ages 8–9):**
  1. "The Planner was 90% sure. Does that mean it's right?" (No: check the evidence.)
  2. "The Planner says 'enough water' but only counted drinking. What did it miss?" (Washing, plants: missing data.)
  3. "Rewrite: 'Give us enough power.'" (Looks for a worst case, a priority and a number.)
- **Facilitator observation rubric**

| Criterion | Emerging | Secure | Strong |
| --- | --- | --- | --- |
| Uses evidence | Agrees or disagrees with the Planner without a reason | Points to one lens or graph | Links two pieces of evidence and names the assumption |
| Improves instructions | Picks the clearer card when prompted | Picks it unprompted by Level 3 | Says what to add (worst case, number, priority) before seeing cards |
| Calibrated trust | Trusts all or distrusts all | Checks before deciding | Treats the 55% and 52% warnings seriously and explains why |
| Teamwork in role | Waits to be told | Uses their lens when asked | Invites others' evidence; uses or respects the STOP card |

## 9. Discussion session (instructor-led, at the end of the lab)
**Purpose:** a planning AI can draft a whole colony faster than any person, but it only knows what it was given. Professionals stay in charge by asking three questions every time: *What did you assume? What data did you use? What happens on the worst day?* The same questions keep water works, hospitals and power grids on Earth running.

**Set-up**
- **Room:** chairs in a horseshoe facing the facilitator, or teams standing round one shared screen showing the final colony and the catch log.
- **Materials:** printed Colony Charters (one per team); three large question cards ("What did you assume?", "What data did you use?", "Worst day?"); the printed sign-off checklist; sticky notes and pens; a "Mars ↔ Earth jobs" card set (six cards: life-support engineer, water treatment operator, mission planner, hospital estates engineer, plant scientist, safety officer).
- **Bringing the class back:** the Safety officer holds up the STOP card and says "All crews, stop. Hands off." Screens dim to the finished colony turntable. The facilitator starts only when every hand is off the device.
- **Timing:** 10 minutes (45-min session), 12 (60), 18 (90).

**Structure (18-minute version; trim in brackets)**
| Minutes | Step |
| --- | --- |
| 0–2 | Opening question, quick round (keep) |
| 2–6 | Think–pair–share on one core question (cut to 2 min) |
| 6–13 | Whole group: 3–5 core questions (cut to 2–3) |
| 13–16 | Real-world example (cut to 1 min, or skip in 45-min) |
| 16–18 | Personal takeaway and closing ritual (keep) |

**Opening question:** "Show me with your thumb: up if the Planner helped your crew, sideways if it was a bit of both, down if it got in the way. Now one word for why."

**Core questions**
1. **"Which of the Planner's mistakes sounded most convincing? Why did it sound so sure?"** (recall)
   - *Purpose:* surface that confidence comes from the Planner's data, not from truth.
   - *Strong answer:* "The potatoes, because the story was everywhere. It was 86% sure because lots of stories said it, not because anyone tested Mars soil."
   - *Probe:* "What did the USED chip say? What tag was on it?"
2. **"In Level 3 the Planner said oxygen was balanced. What had it not counted, and how did you find out?"** (reasoning: missing data)
   - *Purpose:* missing data is invisible until you look at a trend.
   - *Strong answer:* "The soil microbes and the new walls. We ran 10 sols and the line kept going down."
   - *Probe:* "Why didn't one day's reading show it? What does a trend show that a single number hides?"
3. **"The Planner planned power for an average sol. Why is the average day the wrong day to plan for?"** (reasoning: typical case)
   - *Purpose:* safety engineering plans for the worst credible case.
   - *Strong answer:* "Because the storm is the day people could get hurt. Opportunity ran out of power in a storm."
   - *Probe:* "What's an 'average day' plan you've seen on Earth that went wrong in bad weather? (Trains in snow, flooding.)"
4. **"The Planner was only 55% sure about the tomatoes, and it was right. Your clearer cards also made it *less* sure. Is less sure a bad sign?"** (reasoning: calibration, unsure but right)
   - *Purpose:* avoid swinging from over-trust to blanket distrust.
   - *Strong answer:* "No. Check it, the same as a sure one. Not sure doesn't mean wrong, and 'ice depth uncertain' told us to drill a test hole."
   - *Probe:* "What about the 52% leak warning? What would have happened if you'd ignored it?"
5. **"The 'most productive week' had no rest and solo walks outside. Who decides what counts as 'productive'?"** (ethics and fairness)
   - *Purpose:* a single metric can harm people; humans choose what matters.
   - *Strong answer:* "The crew should, because they're the ones who get tired. Productive should include sleep and safety."
   - *Probe:* "Can you think of a school, game or job where one number gets chased and people suffer?"
6. **"When the toxic-leak alarm went off at 95% sure, you followed the safety card first and checked second. Why that order?"** (transfer: procedures)
   - *Purpose:* professionals follow the safety procedure, then verify; they don't argue with an alarm first.
   - *Strong answer:* "Because if it was real, checking first could be dangerous. Then we checked a second sensor and it was a computer fault."
   - *Probe:* "A smoke alarm goes off at home. What's the safe order?"
7. **"Who on Earth does what your crew did today?"** (careers)
   - *Purpose:* connect Mars roles to local jobs.
   - *Strong answer:* "Water company engineers watch trend graphs like the life-support officer. Hospital engineers plan for power cuts."
   - *Probe:* hand out the "Mars ↔ Earth jobs" cards: "Match your role badge to an Earth job. What would they check?"
8. **"If you could add one thing to the Planner's screen to make it safer to use, what would it be?"** (transfer: design)
   - *Purpose:* children as designers of trustworthy tools.
   - *Strong answer:* "Make ASSUMED open by default", "Show a worst-day test before it says 'plenty'", "Show its track record."
   - *Probe:* "Real teams write down a tool's inputs and assumptions. Why would that help the next crew?"

**Sentence starters** (on a card per team)
- "The Planner assumed… because…"
- "I knew it was wrong when the… showed…"
- "I would check… by…"
- "The worst day for our colony would be… so we…"
- "It was only …% sure, but…"
- "On Earth, a… does this when they…"

**Common misconceptions and responses**
| Misconception | Response |
| --- | --- |
| "A high % means it's right." | "What did the potato plan's 86% rest on? A story. The number is the Planner's confidence in its own inputs." |
| "The AI is stupid, so we should ignore it." | "It drew a whole colony in seconds and it was right about the tomatoes and the leak. Our job is checking, not ignoring." |
| "Less sure means the AI got worse." | "It got more honest. It told us exactly what to test." |
| "If the alarm was false, we didn't need to evacuate." | "You only know it was false after checking. The real ISS crew did exactly what you did." |
| "Real astronauts live on Mars already." | "Not yet. Bases like this are planned. Analogue crews practise on Earth, in places like Utah and Hawaii." |

**Differentiation**
- *Younger or less confident:* use the three big question cards as a choice ("Which question would have caught the potato mistake?"); point-and-say on the Charter loop diagram; pair answers before sharing; accept one word plus pointing.
- *Older or confident:* "The Planner learned 'normal' from Earth data. Where else could a tool trained in one place fail in another?"; "Design a sign-off checklist for a hospital's backup generator"; "Is it fair to blame the Planner, its designers or the crew who stamped the plan?"

**Connecting to real life:** NASA's CHAPEA crew lived for a year (25 June 2023 to 6 July 2024) in Mars Dune Alpha, a 3D-printed habitat of about 158 m² in Houston, facing planned "communication delays, equipment failures, and resource limitations" ([Space.com](https://space.com/nasa-year-long-mars-simulation-chapea); [Britannica](https://www.britannica.com/science/CHAPEA-NASA)). Ask: "Which of today's checks do you think that crew used? What would the hardest day have been?" Later CHAPEA crews and findings are not yet confirmed (to verify). Do not invent outcomes.

**Closing ritual**
- Each child completes one sentence on a sticky note: "Next time an AI gives me a plan, I will ask…" and sticks it on the team's Charter.
- **Next step pathway:** try SIMOC, the free Mars habitat model from ASU and National Geographic ([National Geographic Education](https://education.nationalgeographic.org/resource/simoc/)); enter the ESA Moon Camp Challenge with a teacher ([ESA](https://esa.int/Education/Teachers_Corner/Moon_Camp_Challenge_Be_part_of_the_future_of_space_exploration_by_designing_a_Moon_base)); look up apprenticeships in water, energy and engineering.

**Facilitator notes**
- **Sensitive topics:** keep radiation simple ("invisible sunburn for the inside of your body"); no cancer statistics. Do not use Challenger or Columbia. Nuclear power is one option with trade-offs, not scary and not a magic fix. "Missing home" can affect children in care or with family abroad; keep it light and focus on call-home time and teamwork.
- **Safeguarding:** if a child discloses worry about home, isolation or safety, follow the venue's safeguarding procedure and pass it to the designated safeguarding lead. Do not probe.
- **Dominant voices:** use the role order ("Life-support first, then Engineer"); the STOP card holder can pause anyone; say "Let's hear from someone whose lens hasn't spoken yet." Watch for the confident child overriding a quieter one's evidence and name it kindly: "What does the graph say?"

## 10. Accessibility and inclusion
- **Reading level:** cards at about age 8 reading level, at most 12 words; read-aloud on every card.
- **Audio and captions:** all Planner lines captioned; the finale alarm is amber with a calm voice, never a strobe; "No siren" and "Reduce motion" settings; a visual warning before any sound.
- **Colour-blind-safe signals:** graphs use shape and colour; ring segments have labels and ticks; radiation shown as dots.
- **Motor-friendly controls:** tap to choose, no timed drags; paint-and-place has a tap-to-place option.
- **No devices at home:** the Charter prints; the loop diagram and sign-off checklist are paper activities; the take-home sheet has the three questions and a family "worst day at home" planning game.

## 11. Safety, ethics and data
- **Data collected:** none. No accounts, typing or names; the Charter carries a team crew name only. ICO Children's Code notes from round-3 report 05 apply.
- **Age and real AI tools:** the Planner is scripted; the facilitator says so at the start. Children do not use live AI tools in the lab. Many consumer AI tools set minimum ages of 13 or 18 (to verify per tool); the take-home suggests trying planning tools only with a teacher or parent.
- **Gentle consequences:** nobody is hurt. The crew hunkers down, plants wilt, the wellbeing meter dips or Earth sends an expensive resupply. There is no fail screen. Fact cards are tagged **real** (ISS, MDRS, EDEN ISS), **planned** (Mars bases, fission units) or **game simplification**. No humans have lived on Mars; MELiSSA has not yet supported people; Kilopower-style reactors are not deployed. The "famous story" is never named on screen.

## 12. Build notes
- **Scenes and assets:** Mars island with five zones; ghost-colony effect; ice radar; radiation dots; 10-sol trend graph; dust-storm wall and sky grade; soil-test tray; greenhouse glow; night alarm scene with two sensors and a fault light; call-home booth; sunset turntable (blue Martian sunset, to verify).
- **Scripted AI responses:** every vague, clear and distractor line in the section 5 table, plus the 55% tomato line, the 95% alarm, the 52% leak and a re-plan line for every wrong option, so all routes are written. Distractor cards: "Next to the biggest crater" (L1), "Ship power packs from Earth" (L4), "Ship all our food from Earth" (L5).
- **Reuse from the trailer:** island and build pieces, the Planner card with USED/ASSUMED chips, cards and hand, evidence panels (ice radar, storm test, soil test), seven-segment colony ring, role strip with the STOP card, colony-name card, careers card. The trailer shows Levels 1, 4, 5 and 6 in detail and 2–3 as a montage.
- **Trailer alignment:** the ring's seventh segment is "Self-reliance" in the trailer (the research called it "Earth dependence"); keep "Self-reliance" and show resupply flights inside it.
- **Open questions:** signposting or partnership with SIMOC and ESA Moon Camp; a Moon variant later (lunar night and polar ice, to verify).
- **To verify:** Biosphere 2 mechanism (Severinghaus et al. 1994 not retrieved); 98% ISS water recovery (secondary coverage); MELiSSA compartment count and crew-test status; Kilopower or Fission Surface Power status in 2026 (COMPASS figures are 2016 estimates); regolith thickness (1–3 m against "several metres"); blue sunset, 668-sol year, parastronaut John McFall; Mars Horizon school edition; later CHAPEA crews; IMS status on ISS; the automation-bias "up to half" figure; KS3 science and computing wording.
