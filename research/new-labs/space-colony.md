# Build a Space Colony: lab research and design

Research for a new DeltaOps Learning AI lab, 5 November 2026. Audience: children aged 8–14 in schools, clubs, holiday camps and museums; 45–90 minutes; floating voxel diorama style (see `deltaopslearning-brochure/img/island-mars.png`). It follows the Eco Town pattern in `games/ecotown/DESIGN.md`: a vague instruction, a confident wrong AI guess with a "% sure" score, children catching it with evidence, then a clearer instruction, with each level split into acts.

**Method note.** The Exa connector was not authorised in this session, so this report uses ordinary web search (WebSearch). Each factual claim has a link. Where a claim rests on secondary reporting, the text says so. Claims I could not check are listed under "Still unverified" at the end. Evidence on how children read confidence displays comes from `research/round-3/02-learning-evidence.md` §2. It is cited from there, not searched again.

**Boundaries with the sibling labs.** Landing itself (descent, piloting, the rocket) belongs to "Land a Rocket". Training a model on examples belongs to "Train a Robot", and flying belongs to "Become a Drone Pilot". This lab starts once the cargo is down. Its subject is **planning and running a habitat as a system**: site, shelter, air, water, power, food and people.

---

## 0. The lab on one page

- **Premise.** "Your crew of four lands on the red island. The colony's planning assistant can draw a whole base in seconds. Your job is to make sure it keeps people alive."
- **Core skill.** Systems thinking with budgets: every choice uses mass, power, water or crew time, and every subsystem feeds another. This is the real day job of life-support engineers and space architects (§2).
- **The AI's role.** It is a **planning tool**, modelled on the real mixed-initiative planners NASA used to plan each Martian day for the Mars rovers (MAPGEN). It proposes, shows its assumptions and data sources, and gives a "% sure". The crew checks the plan and signs it off (§3, §6.6).
- **Six levels.** 1 Choose the site; 2 Build the shelter; 3 Air and water loop; 4 Power through the storm; 5 Grow food; 6 The first year (crew life and alarms).
- **Six AI failure modes, one per level.** Each is grounded in a real case:
  - optimising one word ("best site" becomes "sunniest");
  - assuming Earth conditions;
  - missing data (Biosphere 2's hidden oxygen sink);
  - designing for the typical case (the 2018 dust storm that ended Opportunity's mission);
  - trusting a bad source (potatoes in raw Mars soil, "because a famous story says so");
  - gaming one metric (a "productive" schedule with no rest).
  - The finale adds a confident false alarm, like the January 2015 ISS ammonia alarm, and one "unsure but right" warning.
- **End artefact.** A **Colony Charter**: a site card, a life-support loop diagram, a crew rota, three crew promises and the colony's name. Each team also gets a **catch log**, which shows the AI's confident mistakes the crew caught.
- **Trailer line.** "The AI can plan a colony in seconds. Your crew makes sure it survives the storm."

---

## 1. Real-world grounding

Each subsection ends with **→ In the lab**, saying how the fact becomes a decision, a lens or a consequence.

### 1.1 How habitat planning works

Agencies plan human bases as **systems of systems** with hard budgets: launch mass, power, crew time and risk.

**Landing site selection**
- NASA's first Human Landing Site / Exploration Zone workshop (Houston, October 2015) took 47 proposals for exploration zones about 100 km across. The first crews would be limited to roughly that range from the landing site ([Space.com](https://space.com/29766-mars-astronauts-landing-sites-nasa-workshop.html); [Sky & Telescope](https://skyandtelescope.org/astronomy-news/nasa-lays-groundwork-for-sending-humans-to-mars-2112201523/)).
- NASA's site guidance says landing near subsurface ice "will probably be a crucial factor". It also weighs science targets, altitude, latitude (more sun and warmth near the equator) and dust storms ([NASA Red Planet Dispatch, 2022](https://blogs.nasa.gov/redplanetdispatch/2022/12/); [phys.org](https://phys.org/news/2022-12-humans-mars.amp)).
- The SWIM ice-mapping project found the best ice consistency poleward of about 40°. Engineers would prefer to land at about 20–30° latitude. JPL's Sydney Do: "If you send humans to Mars, you want to get them as close to the equator as you can" ([USGS](https://www.usgs.gov/publications/ice-resource-mapping-mars); [Universe Today](https://www.universetoday.com/163937/a-new-map-shows-where-mars-is-hiding-all-its-ice/); [Nature Astronomy 2021 record](https://ui.adsabs.harvard.edu/abs/2021NatAs.tmp...23M)).
- **→ In the lab:** this is a genuine trade-off, so Level 1 is built on it. Warm and sunny or icy and wet: you can rarely have both.

**Habitats and analogues**
- NASA's CHAPEA habitat, Mars Dune Alpha, is a 3D-printed structure of about 158 m² (1,700 sq ft) at Johnson Space Center, printed by ICON. It has four crew quarters, a medical area, kitchen, fitness area, work area and crop growing. The first crew lived there from 25 June 2023 to 6 July 2024 and faced simulated stressors: "communication delays, equipment failures, and resource limitations" ([Britannica](https://www.britannica.com/science/CHAPEA-NASA); [Space.com](https://space.com/nasa-year-long-mars-simulation-chapea); [phys.org](https://phys.org/news/2023-07-nasa-crew-members-one-year-mission.html)).
- NASA's Gateway education guide teaches habitat design for grades 5–8 through the engineering design process (NGSS MS-ETS1-1, MS-ETS1-3) ([NASA](https://www.nasa.gov/stem-content/activity-two-design-and-build-a-space-habitat/)).

### 1.2 Closed-loop life support (ECLSS) on the ISS

**Air**
- The Oxygen Generation Assembly splits water by electrolysis. The Carbon Dioxide Removal Assembly captures CO₂ on zeolite, which is heated to about 300 °C to release it.
- A Sabatier reactor combined that CO₂ with leftover hydrogen to make water (fed back to electrolysis) and methane (vented). It ran from about 2010/2011 to 2017 ([NASA NTRS](https://ntrs.nasa.gov/api/citations/20160009739/downloads/20160009739.pdf); [JAXA](https://www.aero.jaxa.jp/eng/about/publications/magazine/pdf/en_sorasora_49.pdf)).

**Water**
- In 2023 NASA reported total water recovery of **98%** after adding the Brine Processor Assembly. Before it, recovery was "between 93 and 94%".
- Humidity from breath and sweat is condensed and reused, and urine is distilled. Each crew member uses roughly a gallon (about 3.8 litres) a day for drinking, food and hygiene. These details come from secondary coverage of the NASA announcement ([New Atlas](https://newatlas.com/space/nasa-converts-pee-to-drinkable-water-on-international-space-station); [YourStory](https://yourstory.com/2023/06/space-sustainability-98-water-recovery-iss)).

**Emergencies**
- The ISS defines three emergency classes: fire, depressurisation and toxic release ([NASA NTRS](https://ntrs.nasa.gov/api/citations/20140000513/downloads/20140000513.pdf)).
- On 14 January 2015 an ammonia alarm sent the crew into the Russian segment with masks on. It was a **false indication** from a computer (MDM) in Node 2, and the crew went back in about nine hours later ([NASA ISS daily summary](https://www.nasa.gov/blogs/stationreport/2015/01/14/iss-daily-summary-report-01-14-15/); [The Conversation](https://theconversation.com/false-alarm-on-the-international-space-station-keeps-the-astro-flies-from-their-breakfast-36313)).
- A real coolant leak on the station's 2B solar array channel sped up from about 5 lb a year to about 5 lb a day ([NASA NTRS](https://ntrs.nasa.gov/api/citations/20140000513/downloads/20140000513.pdf)).

**→ In the lab:** the air loop (water → oxygen; CO₂ → water) and the water loop (98%) are the two dials children manage in Level 3. The finale's alarm is the 2015 false alarm, and the "unsure but right" warning is the slow leak that speeds up.

### 1.3 Bioregenerative life support: MELiSSA and plants

- **MELiSSA** is ESA's closed-loop concept, developed with about 15 partners. It is a loop of compartments, each doing one metabolic job: breaking down waste, nitrifying (turning ammonium into nitrate), algae (*Arthrospira*, spirulina) and higher plants for oxygen and food, with the crew at the centre.
- The pilot plant at the Universitat Autònoma de Barcelona runs connected compartments with a **mock crew of rats**. ESA's goal of supporting a human "crew" by 2020–2025 has not been reported as met ([ESA](https://www.esa.int/Our_Activities/Space_Engineering_Technology/MELiSSA_life_support_project_an_innovation_network_in_support_to_space_exploration); [MELiSSA Foundation](https://www.melissafoundation.org/page/melissa-pilot-plant); [Frontiers 2023](https://www.frontiersin.org/articles/10.3389/fspas.2023.1198689)). Sources differ on whether the loop has four or five compartments.
- **→ In the lab:** a "bioregenerative" option in Level 3 and an algae option in Level 5. Children see that it is elegant but slow and still experimental. That is a real professional judgement.

### 1.4 Biosphere 2: the lesson that matters most

- Oxygen inside Biosphere 2 fell from 20.9% to about **14.5% over 16 months**, and oxygen was added in 1993 for crew safety. Two causes worked together:
  - soil rich in organic matter let microbes consume oxygen;
  - exposed concrete absorbed CO₂ (calcium hydroxide + CO₂ → calcium carbonate), which hid where the missing oxygen had gone.
- Coating the concrete reduced the problem ([Kenyon College summary](https://biology.kenyon.edu/slonc/bio3/2000projects/carroll_d_walker_e/whatwentwrong.html); [Paul Miller essay](https://paulmiller.org/biosphere-2-and-the-joy-of-failed-experiments/)). These are secondary sources. The primary work is Severinghaus, Broecker et al. (1994), which I did not retrieve.
- **→ In the lab:** the perfect "missing data" mistake for Level 3. The AI's oxygen budget counted people and machines, not the soil and walls. Children find the slow downward trend on a 10-sol graph.

### 1.5 Analogue missions, crew roles and psychology

**Mars Desert Research Station (MDRS, Utah)**
- Crews use set roles: Commander, Executive Officer, Health and Safety Officer, GreenHab Officer, Crew Engineer, Crew Journalist, scientists.
- The HSO "must" be deferred to on safety, even by the commander. Engineers keep the station's systems running, and the journalist files a daily report.
- Some crews rotate the commander role ([MDRS crew roles](https://sites.google.com/a/marssociety.org/mdrs2013/crew-roles); [Purdue MDRS crews](https://sites.google.com/view/purduemdrscrews/home); [Wikipedia: MDRS](https://en.wikipedia.org/wiki/Mars_Desert_Research_Station)).

**HI-SEAS (Hawaii)**
- HI-SEAS studied crew cohesion, roles and workload under a 20-minute communication delay.
- A 2021 paper found that decisions in all crews were consensus-driven, with little hierarchy ([Auckland research repository](https://researchspace.auckland.ac.nz/handle/2292/28650); [Eos](https://eos.org/?p=157346); [RocketSTEM](https://www.rocketstem.org/2014/07/10/hi-seas-2-living-on-a-simulated-mars/)).

**The "third-quarter effect"**
- Cohesion dips and stress rises around three-quarters of the way through a mission. It is reported across ISS, Antarctic and MDRS settings.
- One MDRS crew said a fresh microgreens meal from the GreenHab lifted morale. That is an anecdote, not a study ([Mars Society Canada](https://www.marssociety.ca/2021/10/28/diaries-from-analog-mars-part-12-the-three-quarter-problem/)).
- The GreenHab needs a lot of crew time, and a DLR study estimated automation could cut that by at least a third ([IAC 2014 / DLR](https://iafastro.directory/iac/archive/browse/IAC-14/E5/1/22971/)).

**Crew self-scheduling**
- NASA's **Playbook** tool let crews edit their own timelines. It offered "Suggested Fixes" for timeline conflicts and "No-Go Zones".
- A 2017 ISS demonstration judged self-scheduling "viable", although analogue crew members varied in how much they wanted it ([NASA SpaceCHI 2023](https://ntrs.nasa.gov/api/citations/20230008619/downloads/Spacechi2023v5.pdf); [HERA self-scheduling evaluation](https://ntrs.nasa.gov/api/citations/20210022277/downloads/Evaluation%20of%20Self-Scheduling%20Exercises%20Completed%20by%20Analog%20Crewmembers%20in%20NASA%E2%80%99s%20Human%20Exploration%20Research%20Analog%20(HERA).pdf)).

**→ In the lab:**
- Team roles copy MDRS directly, including "the safety officer can stop the commander".
- Level 6 is the crew schedule.
- Fresh food raises the wellbeing meter.

### 1.6 Building with Mars: ISRU and radiation shielding

**Radiation**
- Curiosity's RAD instrument measured about **0.67 mSv per day** on the Martian surface and about 1.8 mSv per day inside the spacecraft on the way.
- A round trip plus 500 days on the surface comes to about 1 Sv ([SwRI](https://www.swri.org/press-release/swri-scientists-publish-first-radiation-measurements-surface-mars); [ScienceDaily](https://www.sciencedaily.com/releases/2013/12/131209181133.htm)).

**Shielding**
- Regolith walls need to be "several metres thick" according to TU Delft. Secondary summaries give 1–3 m of cover ([TU Delft](https://research.tudelft.nl/en/publications/design-to-robotic-production-of-underground-habitats-on-mars/); [Space Settlement Progress](https://spacesettlementprogress.com/tag/additive-manufacturing/)).
- Options include:
  - inflatable modules covered with piled regolith;
  - 3D-printed regolith shells, including sulfur concrete that "will harden in minutes as it cools";
  - digging into lava tubes for natural shielding and thermal insulation;
  - layered regolith-concrete and HDPE walls modelled in NASA's OLTARIS tool ([SIGRADI 2023](https://pdf.blucher.com.br/designproceedings/sigradi2023/63.pdf)).
- Sintering regolith takes far more energy (10–100 MJ/kg) than extrusion (about 1–2 MJ/kg) (same review summary). **→ In the lab:** a link from shelter (Level 2) to power (Level 4).

**Mars conditions**
- A sol lasts about 24 h 37 min (ESA), and gravity is about 38% of Earth's. The mean temperature is about −55 °C (ESA), ranging from −133 °C to +27 °C ([ESA Facts about Mars](https://m.esa.int/Our_Activities/Space_Science/Mars_Express/Facts_about_Mars)).
- Mars soil holds about 0.4–0.6% perchlorate by weight (Phoenix, Curiosity), which is toxic and stunts plants ([Astrobotany](https://astrobotany.com/martian-soil/)).

**→ In the lab:** in Level 2 the AI reads "strong walls" in the Earth sense and wants heavy shipped panels, while the real answer is to "use what is here". Mars facts appear on fact cards only, never as quiz pressure.

### 1.7 Power: solar or fission

- NASA's 2016 COMPASS trade study compared the two. Solar sized to keep a base alive through a dust storm of up to 120 days came to about **9,800 kg**. Four 10 kW Kilopower fission units came to about **7,000 kg** and give "full power regardless of dust storm conditions". The study warned that a long power cut in a global storm would be a crew safety hazard ([NASA NTRS 20160011275](https://ntrs.nasa.gov/api/citations/20160011275/downloads/20160011275.pdf); [NTRS 20160002628](https://ntrs.nasa.gov/citations/20160002628)).
- **Opportunity, 2018:** a planet-wide dust storm cut the rover's solar output from over 600 Wh a day to about 20 Wh. It went into low-power mode, never woke up, and was declared lost in February 2019. Curiosity, which runs on a nuclear generator, carried on ([Wikipedia: 2018 Mars global dust storm](https://en.wikipedia.org/wiki/2018_Mars_global_dust_storm); [Space.com](https://www.space.com/40888-mars-dust-storm-2018-and-opportunity-rover-images.html); [New Atlas](https://newatlas.com/opportunity-mars-dust-storm/54990)).
- **→ In the lab:** in Level 4 the AI sizes power for an average sol. The storm lens shows the Opportunity curve. Children choose between storage, fission and cutting the load. Fission is presented neutrally, as a real engineering option with trade-offs (mass, a keep-out distance, public trust), not as scary or as a magic fix.

### 1.8 Food and greenhouses

- **ISS Veggie:** in 2015 its lettuce became the first NASA-grown food eaten by astronauts. Later crews harvested mizuna, Waldmann's green lettuce and 'Outredgeous' red romaine on a "cut-and-come-again" basis.
- **ISS Advanced Plant Habitat:** a closed chamber with red, blue, green and white LEDs and over 180 sensors that report to Kennedy Space Center. Output is still a "novelty" next to the crew's diet ([Space.com](https://www.space.com/38723-astronauts-farm-plants-install-garden-instrument.html); [CS Monitor](https://csmonitor.com/Science/2017/0419/Why-NASA-is-expanding-its-Veggie-space-program)).
- **EDEN ISS (DLR, Antarctica 2018):** grew **268 kg of food on 12.5 m² in 9.5 months**: 117 kg lettuce, 67 kg cucumber, 50 kg tomato. Peppers and strawberries failed ([DLR](https://www.dlr.de/en/latest/news/2018/2/20180625_rich-harvest-in-the-antarctic-eden-iss-greenhouse-tomatoes-and-cucumbers-in-the-polar-night_28538); [EDEN ISS](https://eden-iss.net/index.php/2019/08/26/vegetable-cultivation-in-the-antarctic-for-the-moon-and-mars/)).
- Plants in isolated settings also support wellbeing ([IAC paper summary](https://iafastro.directory/iac/archive/browse/IAC-19/A2/IP/53339/)).
- **→ In the lab:** in Level 5 the AI suggests planting potatoes straight in Mars soil, "because a famous story did it". The soil test shows perchlorate. The real options are hydroponic LED racks (EDEN ISS numbers), algae or washed regolith, each with a different water and power cost.

---

## 2. The jobs this trains towards

| Job | What they actually do day to day | Source | Skill in this lab |
| --- | --- | --- | --- |
| **Life-support (ECLSS) engineer / technician** | Design, test and operate the systems for air, water, temperature and waste. Maintain test hardware. Work as operations engineers for Artemis. On ISS, staff the mission-control console for life support (the MERLIN team). | [NASA profile: Morgan Abney](https://www.nasa.gov/?p=96770); [job listing](https://builtin.com/job/engineer/environmental-control-and-life-support-subsystem-engineer/1336282); [Georgia Tech mentor profile](https://mentor.ae.gatech.edu/directory/person/leon-chen) | Balancing the air and water loops; reading trend graphs; spotting a false alarm |
| **Space architect / habitat designer** | Design habitats for micro-, lunar or Martian gravity. Build full-scale or partial mock-ups for human-in-the-loop tests. Use VR/AR to check designs. Work with doctors, psychologists and materials scientists. Test in analogue sites. | [Vault: space habitat designers](https://legacy.vault.com/industries-professions/professions/s/space-habitat-designers/the-job); [Universe Today](https://www.universetoday.com/146399/what-does-it-mean-to-be-a-space-architect/); [ClearanceJobs listing](https://clearancejobs.com/jobs/8141543/architect-for-human-spaceflight-nasa-hhpc) | Siting, shielding, layout, human factors |
| **Mission planner / scheduler** | Build daily activity plans with tools such as MAPGEN (Mars rovers) and Playbook (ISS crews), resolving conflicts between resources and constraints. | [NASA NTRS MAPGEN](https://ntrs.nasa.gov/api/citations/20050184145/downloads/20050184145.pdf); [Playbook](https://ntrs.nasa.gov/api/citations/20230008619/downloads/Spacechi2023v5.pdf) | Level 6 schedule; checking the AI's plan |
| **Systems engineer** | Make the disciplines fit together and trace requirements. Run trade studies on digital models, for example NASA's prototype digital twin of Gateway's ventilation. | [NASA NTRS Gateway ECLSS digital twin](https://ntrs.nasa.gov/citations/20240014472); [Northrop Grumman HALO](https://www.northropgrumman.com/space/digital-engineering-and-human-factors-designing-halo) | Trade-off tables; "one change ripples everywhere" |
| **Space agronomist / plant scientist** | Run growth chambers, monitor sensors, choose crops, and harvest and analyse (Veggie, APH, EDEN ISS). | see §1.8 | Level 5 |
| **Analogue crew member / health and safety officer** | Daily reports, safety checks, first aid, protecting crew wellbeing. | [MDRS roles](https://sites.google.com/a/marssociety.org/mdrs2013/crew-roles) | Checklists, wellbeing, "stop" authority |

**Why it matters in the UK**
- The UK Space Agency's 2023 Space Sector Skills Survey found that **52%** of space organisations report skills gaps in their current workforce and **61%** in applicants. **37%** report a shortage of software and data-analysis skills ([GOV.UK report](https://www.gov.uk/government/publications/space-sector-skills-survey-2023/space-sector-skills-survey-2023-report)).
- The Space Skills Alliance found that half of early-career space jobs asked for software skills ([Parliament written evidence](https://committees.parliament.uk/writtenevidence/140219/html)).
- Trade press reports high demand for AI and machine-learning skills ([Computer Weekly](https://computerweekly.com/news/366552174/UK-space-sector-needs-more-people-with-AI-skills-according-to-survey)).

**The transferable point for facilitators.** The same skills run water companies, hospitals, data centres, farms and building services. A Mars base is a vivid wrapper for **resource budgeting, systems thinking, risk and checking automated advice**.

---

## 3. How professionals use AI and simulation here today

| Use | Real example | What it shows children |
| --- | --- | --- |
| **AI planning and scheduling** | **MAPGEN** combined JPL's manual planner (APGEN) with Ames' automated constraint planner (EUROPA). It built each rover's plan for each sol on the Mars Exploration Rovers and was the first AI planner used to run a rover on another planet. An earlier EUROPA flew in Deep Space 1's Remote Agent experiment (1999) ([NASA NTRS](https://ntrs.nasa.gov/api/citations/20050184145/downloads/20050184145.pdf); [Bresina et al.](https://www.cs.rochester.edu/research/mipas2005/final-drafts/bresina-jonsson-morris-rajan.pdf)). | "Mixed-initiative" means **the AI drafts and the humans decide**. This is the exact model for our assistant. |
| **Crew-facing schedule aids** | **Playbook** suggests fixes to timeline violations and marks no-go zones ([NASA](https://ntrs.nasa.gov/api/citations/20230008619/downloads/Spacechi2023v5.pdf)). | Tools help people plan their own day; they don't replace them. |
| **Anomaly detection** | NASA's **Inductive Monitoring System** learns "normal" from archived sensor data and scores how far current readings deviate. It needs no failure examples. It was deployed in ISS mission control for the control moment gyroscopes, and in replay of Columbia's launch data it flagged an anomaly after the foam strike ([NASA spinoff](https://spinoff.nasa.gov/node/10539); [NASA tech transfer](https://technology.nasa.gov/patent/TOP2-175)). | Models learned on "normal" can raise **false alarms** when conditions change, which is distribution shift ([industrial anomaly detection example](https://arxiv.org/abs/2211.09916v4); [AnoShift](https://ar5iv.labs.arxiv.org/html/2206.15476)). Finale. |
| **Generative design** | Goddard's "evolved structures" (Ryan McClelland) start from human-drawn connection points and keep-out zones. Software then generates the part. NASA claims up to 3× better structural performance. McClelland: "left to itself, the algorithm can sometimes make structures too thin" ([NASA GSFC](https://etd.gsfc.nasa.gov/capabilities/capabilities-listing/generative-design/); [Autodesk](https://www.autodesk.com/design-make/articles/nasa-evolved-structures); [Popular Science](https://www.popsci.com/?p=512885)). | Humans set the constraints and judge the result. This feeds Level 2's shelter options. |
| **Digital twins** | JSC prototyped a digital twin of Gateway's Inter-Module Ventilation (part of ECLSS) for fault management and trade studies. ESA astronauts reviewed the I-Hab interior through digital-twin avatars ([NASA NTRS](https://ntrs.nasa.gov/citations/20240014472); [Thales Alenia Space](https://www.thalesaleniaspace.com/en/news/esa-astronauts-alexander-gerst-and-luca-parmitano-use-their-avatars-check-out-future)). | The diorama **is** the colony's digital twin. Children test the plan in the twin ("run a sol") before trusting it. |
| **Conversational AI crew assistant** | **CIMON** (Airbus/IBM/DLR) flew to the ISS in 2018. In its first 90-minute session with Alexander Gerst it told him "Don't be so mean please" after a misunderstanding ([Airbus](https://airbus.com/en/newsroom/press-releases/2018-11-crew-assistant-cimon-successfully-completes-first-tasks-in-space); [NBC News](https://www.nbcnews.com/tech/innovation/don-t-be-so-mean-cimon-european-space-robot-cops-n943336/)). | A design warning: a chatty, "feelings" persona distracts. Our assistant is a **tool with a console**, not a friend (§6.6). |

**AI failure modes to teach, with real grounding**
1. **Proxy or one-word optimisation (specification gaming).** "Best" becomes the one measurable thing. See the round-3 07 reward-hacking vignettes.
2. **Assuming the training conditions: Earth, not Mars (distribution shift).** See the anomaly-detection sources above.
3. **Missing data.** The model only counts what it was given, like Biosphere 2's soil and concrete.
4. **Typical-case design.** Average sol, not dust storm: the Opportunity case and the COMPASS 120-day storm.
5. **Bad source or "hallucination".** Fluent, confident and wrong. Verbalised confidence from large language models is often inflated ([Xiong et al. 2023](https://arxiv.org/pdf/2306.13063); [Leng et al. 2024](https://arxiv.org/pdf/2410.09724)).
6. **Automation bias in the humans.** In Manzey's lab, up to half of the participants who followed wrong advice had already seen all the information needed to spot the error ([Parasuraman & Manzey 2010 and related studies](https://journals.sagepub.com/doi/10.1177/154193120605000303); [core.ac.uk PDFs](https://core.ac.uk/download/187203048.pdf)). This is why the lab rewards checking, not speed.
7. **Unit and interface mismatches** (optional extra). The 1999 Mars Climate Orbiter was lost because one team supplied thruster data in pound-force seconds and another assumed newton-seconds ([NASA APPEL](https://appel.nasa.gov/2010/02/14/aa_2-9_sf_history-html/); [IOP Spark](https://spark.iop.org/why-getting-your-units-right-matters)). Apollo 13's square command-module CO₂ canisters did not fit the lunar module's round sockets, and the ground built an adapter from parts on board ([Universe Today](https://universetoday.com/63673/13-things-that-saved-apollo-13-part-10-duct-tape/amp); [Popular Science](https://www.popsci.com/article/technology/greatest-space-hack-ever/)). Use these as "why we check" stories in the debrief.

---

## 4. Games and educational sims to learn from

| Title | What makes it engaging | What children 8–14 can handle | Take for this lab |
| --- | --- | --- | --- |
| **Surviving Mars** (Haemimont/Paradox, 2018) | Domes, water, oxygen and power chains. Dust storms clog solar and stop moisture vaporators; cold waves freeze tanks; meteors crack domes. A storm causes water shortage, then crop failure, then famine. PC Gamer: 80 ([PC Gamer](https://www.pcgamer.com/uk/surviving-mars-review); [Windows Central](https://www.windowscentral.com/surviving-mars-review); [Wikipedia](https://en.wikipedia.org/wiki/Surviving_Mars)) | The cascade is the lesson, but the full economy is too much. Colonists die. | **Visible cascades**: one failure lights up the next subsystem in the loop diagram. Gentle outcomes only. |
| **Planetbase** (Madruga Works, 2015) | Oxygen generators need water extractors. Meteors breach pods. Oxygen runs short at night by distance and crowding ([TheXboxHub](https://www.thexboxhub.com/planetbase-review/); [TechRaptor](https://techraptor.net/content/planetbase-review-colonies-surviving-catastrophies)) | Clear dependencies: "this needs that". Reviewers note colonists die "for no clear reason", which frustrates. | Every consequence must show its **cause** on the lens. |
| **Oxygen Not Included** (Klei) | The gas overlay shows air moving in real time and CO₂ pooling. Stress builds from bad layouts, for example toilets near beds ([Epic store page](https://store.epicgames.com/p/oxygen-not-included); [PC Gamer](https://www.pcgamer.com/au/oxygen-not-included-is-a-deep-and-complex-sim-thats-also-easy-to-jump-into)) | Overlays are readable even for younger players. The full sim is a teen/adult game. | **Overlays as evidence lenses** (air, radiation, power, water). Layout affects mood. |
| **Per Aspera** (Tlön/Raw Fury, 2020) | You **are** the AI (AMI) terraforming Mars. Narrative prompts make you choose between two styles of response ([Raw Fury](https://rawfury.com/games/per-aspera/); [PC Gamer](https://www.pcgamer.com/uk/how-per-aspera-makes-you-feel-like-an-artificial-intelligence)) | Theme fits, but pacing drags after 10 hours. | Flip it: **children supervise the AI**. Brief scripted dialogue choices between levels. |
| **Mars Horizon** (Auroch Digital, 2020) | Space-agency management with ESA and UK Space Agency technical advice. The developers visited ESOC and ESTEC ([ESA](https://www.esa.int/About_Us/Partnerships/ESA_and_Auroch_Digital_launch_Mars_Horizon_game); [Auroch Digital](https://aurochdigital.com/marshorizonvideogame)) | Turn-based and readable. Educational school versions were *promised*; I found no evidence they shipped. | A UK precedent for agency-checked realism; worth approaching for advice. |
| **Kerbal Space Program / KerbalEdu** | Physics sandbox; joyful failure; teacher-made missions ([PC Gamer](https://www.pcgamer.com/uk/kerbaledu-launches-to-bring-kerbal-space-program-to-more-classrooms); [KSP wiki](https://wiki.kerbalspaceprogram.com/wiki/KerbalEdu)) | Rocket-building is for the sibling lab. Its bases are a late-game feature. | Failure as comedy, not punishment. |
| **RimWorld** (Ludeon) | An "AI Storyteller" (Cassandra, Phoebe, Randy) paces crises along a rising and falling curve. "Designed at every level to generate story" ([RimWorld wiki](https://www.rimworldwiki.com/wiki/RimWorld)) | Content (violence, organ harvesting) is unsuitable. Pacing is the lesson. | **Crisis pacing**: calm build, storm, recovery, celebration in each level. |
| **Space Station 13 / 14** | Fully simulated atmosphere and power. Strong job roles (station engineer, atmospheric technician, chief engineer). "The most interesting rounds are always the unexpected ones" ([Game Developer](https://www.gamedeveloper.com/design/space-station-13-a-case-study-in-emergent-gameplay-and-system-heavy-design); [SS14 atmos docs](https://docs.spacestation14.com/en/space-station-14/departments/atmos.html)) | Adult role play with antagonists and violence: **not for children**. | **Role identity** with its own dashboard, and departments that depend on each other. |
| **Minecraft Education: Artemis Missions** | NASA partnership: Rocket Build, Return to the Moon, **Moon Base** (2024). Teams build a lunar base and learn how to keep astronauts safe. Ages 8+, 29 languages. Challenger Center extension lessons, NGSS-aligned, grades 3–8 ([Minecraft Education](https://education.minecraft.net/discover/artemis-missions); [THE Journal](https://thejournal.com/Articles/2023/07/20/Minecraft-Education-Adds-Virtual-NASA-Artemis-Mission-Worlds-to-STEM.aspx); [Challenger Center](https://challenger.org/programs/free-lesson-library/minecraft-education/moon-base-design-challenge/)) | Very familiar to children. Free building can drift from learning. | Our difference is the **AI-checking spine**, not free building. Keep clear of Minecraft-distinctive style (see round-3 10). |
| **SIMOC** (ASU / National Geographic) | A research-grade agent-based model of a Mars habitat's food, air, water, plants and solar, built on NASA ECLSS data. Free NGSS curriculum for grades 5–14. Downloadable data for spreadsheets and machine learning ([National Geographic Education](https://education.nationalgeographic.org/resource/simoc/); [ASU](https://interplanetary.asu.edu/simoc); [lesson PDF](https://simoc.space/wp-content/uploads/2020/05/SIMOC-Lesson-Grades-5-8_Revised_5_2020.pdf)) | The best real-data match for this lab, but its interface is a dashboard, not a game. | **Use SIMOC-style numbers for the budgets** and point schools to it as a follow-up. Possible partnership. |
| **ESA Moon Camp Challenge** (ESA + Airbus Foundation, Autodesk) | Students design a Moon base in Tinkercad or Fusion 360 in three tiers (Discovery recommended for ages 6–14). 5,354 students from 39 countries in 2022–23 ([ESA](https://esa.int/Education/Teachers_Corner/Moon_Camp_Challenge_Be_part_of_the_future_of_space_exploration_by_designing_a_Moon_base); [ESA winners](https://m.esa.int/Education/Moon_Camp/Moon_Base_Marvels_Celebrating_the_winners_of_the_2022-23_Moon_Camp_Challenge)) | Proven age fit for habitat design. | The Colony Charter can **feed a Moon Camp entry**: a take-home next step. |
| **Challenger Learning Center missions** | Two-hour team simulations with nine teams (Life Support, Medical, Communications…). Partners split between Mission Control and the station and swap halfway ([Challenger centre programmes](https://www.clcnwi.com/programs-by-grade/simulated-missions.html); [Wikipedia](https://en.wikipedia.org/wiki/Challenger_Center_for_Space_Science_Education)) | Proven for grades 4–8; roles drive engagement. | Role cards, a midpoint **role swap**, and a "mission control" voice for the facilitator. |
| **NASA "Design and Build a Space Habitat"** | Engineering design process in teams; life-support cycle diagrams ([NASA](https://www.nasa.gov/stem-content/activity-two-design-and-build-a-space-habitat/); [NASA BEST 6–8](https://www.nasa.gov/pdf/630754main_NASAsBESTActivityGuide6-8.pdf)) | Grades 5–8. | Debrief uses the same design-process language. |

**Patterns that make these engaging and that children can handle**
- Cascading consequences that you can see (Surviving Mars).
- Evidence overlays (Oxygen Not Included).
- Crisis pacing (RimWorld).
- Role identity (SS13, Challenger, MDRS).
- Real numbers under the hood (SIMOC).

**What to avoid**
- Deep production chains.
- Character death.
- Antagonists.
- Long real-time waits.

---

## 5. Real-life skills, mapped to curriculum and careers

| Skill | What children do in the lab | England national curriculum | NGSS | Career link |
| --- | --- | --- | --- | --- |
| **Systems thinking** | Trace how a choice in one loop (power) changes others (air, food). Draw the colony loop on the Charter. | KS2 Y5 "Earth and space"; KS2 living things and habitats; KS3 biology: photosynthesis, gas exchange, ecosystems ([DfE science PoS](https://www.gov.uk/government/publications/national-curriculum-in-england-science-programmes-of-study)) | 5-LS2-1 and MS-LS2-3: matter cycling and energy flow ([CA NGSS listing](https://www2.cde.ca.gov/cacs/id/web/29085)) | Systems engineer, ECLSS engineer |
| **Resource budgets** | Mass, power (kW), water (litres a day), crew hours. "Over budget" bars. | KS2/KS3 maths: measures, rates, reading tables | MS-ETS1-1 (criteria and constraints) | Mission planner |
| **Trade-offs** | 3–4 genuinely different options per level, each with costs. | KS3 DT: "design and make products and systems that meet human needs"; evaluate against a specification ([DfE DT PoS](https://www.gov.uk/government/publications/national-curriculum-in-england-design-and-technology-programmes-of-study/national-curriculum-in-england-design-and-technology-programmes-of-study)) | MS-ETS1-2 (evaluate competing designs) | Space architect |
| **Risk assessment** | The "storm test", "trend test" and "worst day" checks. Likelihood × impact cards. | KS3 DT (risk, testing); KS3 science working scientifically | MS-ETS1-3, MS-ETS1-4 | Health and safety officer, flight controller |
| **Checklists and procedures** | A sign-off checklist before each plan is accepted. An alarm-response card in Level 6. | KS3 computing: evaluating, debugging ([DfE computing PoS](https://www.gov.uk/government/publications/national-curriculum-in-england-computing-programmes-of-study)) | MS-ETS1-4 (iterative testing) | ISS crew, ECLSS technician |
| **Teamwork roles** | Rotating Commander, Life-support, Engineer, Scientist and Safety roles, with a "stop" card. | Spoken language and citizenship (cross-curricular) | Science and engineering practice: communicating information | Analogue crew |
| **Reading data and dashboards** | Trend graphs (O₂ over 10 sols), the storm power curve, sensor cross-checks. | KS2 Y5–6 statistics (line graphs); KS3 working scientifically | Practice 4: analysing and interpreting data | Every role |
| **Working with AI** | Spot the assumption; ask "what data did you use?"; give a constraint-rich instruction; double-check alarms. | KS3 computing; DfE generative AI guidance (see round-3 02) | Practice 6/7: constructing explanations, arguing from evidence | All roles; UK skills gap (§2) |

The DT and science links come from the statutory programmes of study. I verified the DT systems wording through GOV.UK and secondary summaries; the science and computing pages are linked but I did not re-read them in this session.

---

## 6. Lab orchestration

### 6.1 World and look

- **The island.** One floating Mars diorama in the brochure's style (`island-mars.png`): rust plateau, a crater rim with a pale ice-scarp, a dark lava-tube mouth, a dusty equatorial plain, and violet sky gradients.
- **Colours.** Habitat modules are white or cream with mint accents (the AI's colour). Greenhouses glow green; power is gold.
- **The colony grows visibly:** lander, then first module, then regolith mound, then greenhouse glow, then power field or reactor fence, then rover tracks, then a common-room window with Earth as a blue dot.
- **Lighting carries the mood:** the storm darkens and reddens the scene; the recovery brings back the warm upper-left light. The finale sunset on Mars is blue, a real, wondrous fact. (The blue Martian sunset is from my own knowledge; check before use.)
- **Crew.** Four tiny voxel crew in role-coloured suits.
- **Camera views** reuse Eco Town's grammar: **Sky** (diorama), **Inside** (cutaway module), **Lens** (data overlay). Eco Town's ground-level "Street" view becomes **"Suit walk"**: a short rail walk outside.

### 6.2 Acts within each level

| Act | View | What happens |
| --- | --- | --- |
| 1. Mission brief | Cinematic | "Sol 1: choose the site." Goal and budget bars (mass, power, water, crew hours). |
| 2. Ask the planner | Sky, ghost modules | The commander plays the vague card. The planner shows ghost blocks, "% sure", **"What I used"** (data sources) and **"What I assumed"** (greyed until tapped). |
| 3. Check | Lens / Inside / Suit walk | Each role opens its dashboard. The flaw appears as evidence (a graph, a sensor or a test). |
| 4. Fix | Sky | Clearer card or **add the missing data** (drag a data tile into "What I used"). Then **paint and place** from the 3–4 real options. Budgets update live. |
| 5. Sign-off checklist | Card | Three ticks, read aloud by the safety officer: "Within budget? Worst day tested? Everyone agrees?" The commander stamps it. |
| 6. Run a sol | Time-lapse in the twin | 30–60 s of colony life. Crew routines, meters and a crew-log line. |
| 7. Celebrate | Turntable | "System online" stamp; the colony ring updates; **roles rotate**. |

### 6.3 Team roles (3–5 children)

Based on MDRS roles (§1.5) and Challenger Center teams (§4). Each role has its own **dashboard lens** and **one decision power**.

| Role | Dashboard / lens | Power | 3-child version |
| --- | --- | --- | --- |
| **Commander** | Budget bars, plan summary | Plays the instruction card; stamps sign-off; breaks ties after a vote | Commander + Safety |
| **Life-support officer** | Air (O₂/CO₂), water loop %, trend graphs | Can open the "trend over 10 sols" view | Life-support + Scientist |
| **Engineer** | Power, structures, cargo mass, storm test | Runs the "worst day" test | Engineer |
| **Scientist / agronomist** | Ground radar (ice), radiation map, soil lab, greenhouse | Can add data tiles to the planner | (merged above) |
| **Health and safety officer** (5th child) | Crew wellbeing, sleep, alarms | **Red "stop" card**: can halt any plan until it is checked. This is the real MDRS rule that the commander defers to the HSO on safety | (merged with Commander) |

- **Rotate roles every level.** That gives each child at least one turn as commander and each role at least once in a 6-level session.
- Challenger centres swap partners halfway for the same reason.
- HI-SEAS found consensus decision-making in practice, so the commander *calls* the vote but does not overrule the team except on time.

### 6.4 Level-by-level design

Budgets (mass, power, water and crew hours) carry from level to level. Choices lock at the end of each level, as in Eco Town, so very different colonies emerge.

#### Level 1: Choose the site (Sol 1)

**Real decision: where to put the colony.**
- **A. Equatorial dusty plain:** flat, sunny, warmer, but ice is 200 km away.
- **B. Mid-latitude ice plain (an Arcadia-like site):** buried ice within 2 km, colder, about 30% less sunlight.
- **C. Crater rim near an exposed ice scarp:** ice and science, but slopes and boulders.
- **D. Lava-tube mouth:** natural radiation shelter, but it needs scouting, gives less sun and makes access tricky.

(Grounding: §1.1 SWIM and NASA site criteria.)

**AI moment: optimising one word.**
- **Vague card:** "Find the best place for our colony."
- **Planner (88% sure):** "Best means flattest and sunniest. I chose the equatorial plain: maximum solar power, easy landing."
- **What I used:** terrain map, sunlight map. **What I assumed:** "best = most sunlight".
- **Catch:** the Scientist opens the ground-radar lens: no ice within 200 km. The Life-support officer's water bar shows "water shipped from Earth: 2 extra cargo flights".
- **Clearer card:** "A safe, flat site within 5 km of buried ice, with shelter from radiation nearby."
- **Re-plan:** the planner suggests B or D at **71% sure**. It now knows what it doesn't know: "ice depth uncertain, I need a drill test". This is an honest drop in confidence, as in Eco Town.

**Consequences.**
- **A:** an easy power life later, but a heavy water budget for ever.
- **B:** water is easy, but cold means more heating power.
- **C:** science bonus, but a construction-time penalty.
- **D:** shielding is solved and stays warmer, but less solar and more mass for lighting.

#### Level 2: Build the shelter (Sols 2–10)

**Real decision: how to make a safe home.**
- **A. Shipped rigid metal modules:** strong, quick to set up, but heavy.
- **B. Inflatable module plus 1–3 m of piled regolith:** light to ship, with digging time.
- **C. 3D-printed regolith shell:** a robot printer; sintering takes a lot of power, sulfur concrete needs a sulfur source.
- **D. Lava-tube outfit:** only if the site is D, or after a rover trip.

**Layout sub-choice:** where the sleeping quarters go (inner, most shielded) and the common room (window or none).

(Grounding: §1.6 radiation dose, regolith shielding, printed habitats, CHAPEA's printed Mars Dune Alpha.)

**AI moment: assuming Earth conditions (distribution shift).**
- **Vague card:** "Build strong walls to keep the crew safe."
- **Planner (84% sure):** "Strong means steel panels, like buildings that survive storms on Earth. 40 tonnes of panels."
- **What I used:** Earth building codes. **What I assumed:** "danger = wind and weather".
- **Catch, from two pieces of evidence:**
  - the Engineer's cargo bar shows 3 rockets' worth of mass against a budget of 1;
  - the Scientist's radiation badge lens shows the thin walls still let through most of the 0.67 mSv a day in the bedrooms (simplified to a "radiation dots" overlay).
- **Clearer card:** "Protect the crew from radiation using Mars materials. Keep within one cargo flight."
- **Re-plan:** B or C, 76% sure.

**Consequences.**
- A blows the mass budget, so fewer greenhouse racks later.
- B costs crew hours.
- C costs power: it links to Level 4.
- Bedrooms on the outside ring nudge the wellbeing meter down (the radiation worry).

#### Level 3: Air and water loop (Sols 10–40)

**Real decision: how to keep air and water going.**
- **A. Open loop:** tanks from Earth. Simple, but resupply-dependent.
- **B. ISS-style machines:** electrolysis + CO₂ scrubber + Sabatier, plus 98% water recovery. Proven, needs power and spares.
- **C. Bioregenerative (MELiSSA-style):** algae and plants. Elegant, slow and experimental.
- **D. Hybrid:** machines now, plants growing in.

(Grounding: §1.2–1.4.)

**AI moment: missing data (Biosphere 2).**
- **Vague card:** "Make sure there is enough oxygen."
- **Planner (91% sure):** "Oxygen balanced. Four crew use X; the machines and plants make X + 10%."
- **What I used:** crew breathing rates, machine output. **What I assumed:** "nothing else uses oxygen".
- **Catch:** **run 10 sols** in the twin. The Life-support officer's trend lens shows O₂ sliding a little each sol (20.9 → 20.1 → 19.4…). Children tap the greenhouse soil and the fresh regolith walls and see small "O₂ in, CO₂ out" particle arrows the planner never counted.
- **Facilitator story:** "This really happened in Biosphere 2 in Arizona. The soil microbes were breathing, and the concrete was hiding the evidence."
- **Clearer card / add data:** drag the "soil microbes" and "fresh walls" data tiles into "What I used". Then: "Count everything that uses oxygen, and keep a 30-day reserve tank."
- **Re-plan:** 68% sure. "I have added 2 sinks. There may be others: keep watching the trend." This makes trend-watching a habit.

**Consequences.**
- A: the reserve depends on Earth resupply (a 6-month delay).
- B: needs power (Level 4) and spares.
- C: oxygen is slow to build, so it needs B as backup.
- Every choice shows its water-recovery % on the loop dial.

**Mini-lesson:** the colony loop diagram is drawn for the first time: Water → (electrolysis) → O₂ → crew → CO₂ → (plants or Sabatier) → water.

#### Level 4: Power through the storm (Sols 40–150)

**Real decision: how to power the colony.**
- **A. Big solar field.**
- **B. Solar plus large batteries.**
- **C. Small fission units:** 4 × 10 kW, Kilopower-style, behind a keep-out fence about 1 km away.
- **D. Mixed:** solar plus one fission unit, with load-shedding rules.

Each option shows mass, area, setup crew-hours and a "worst day" rating.

(Grounding: §1.7 COMPASS trade study, Opportunity 2018.)

**AI moment: designing for the typical case.**
- **Vague card:** "Give us enough power."
- **Planner (90% sure):** "Average sol sunshine × panels = plenty. 100 m² of solar."
- **What I assumed:** "every sol is a normal sol".
- **Catch:** the Engineer runs the **storm test**. A dust wall rolls across the diorama and the sky turns orange. The power graph replays the Opportunity curve: from about 600 down to about 20 units (about 3%). Heaters and the oxygen machine go amber.
- **Real story card:** "In 2018 a storm like this covered Mars for months. The Opportunity rover ran out of power and never woke up. Curiosity, on nuclear power, kept working."
- **Clearer card:** "Enough power for a 100-sol dust storm. Life support comes first, then heat, then everything else."
- **Re-plan:** B, C or D, 79% sure. It also proposes a **load priority list**, which children reorder by dragging. This is a real flight-controller skill.

**Consequences.**
- A: the storm triggers a "hunker down" scene (crew in the shielded core, greenhouse lights dimmed, plants slow).
- B: heavy.
- C: lightest for the storm; needs the fence, distance and a trust conversation with the crew.
- D: balanced.
- If the printed shell was chosen in Level 2, its power demand shows here.

**Pacing:** this is the **midpoint crisis**, RimWorld-style: calm build, storm, recovery. It is the trailer's centre.

#### Level 5: Grow food (Sols 150–300)

**Real decision: how to feed the crew.**
- **A. Packaged food from Earth:** reliable, dull, the morale meter drifts down.
- **B. Hydroponic LED racks:** EDEN ISS-like, about 268 kg in 9.5 months on 12.5 m²; uses power and water.
- **C. Algae bioreactor (spirulina):** efficient protein, also makes O₂, but low appeal.
- **D. Washed-regolith beds:** wash out the perchlorate first; uses water and time.

Crop picker: lettuce, cucumber, tomato, potato, peppers and strawberries. Peppers and strawberries *failed* in EDEN ISS: a nice twist when the assistant over-promises.

(Grounding: §1.8, perchlorate in §1.6.)

**AI moment: a bad source.**
- **Vague card:** "Grow lots of food without wasting water."
- **Planner (86% sure):** "Plant potatoes straight into Mars soil, like in a famous space story. No tanks, no pumps."
- **What I used:** "space-farming stories" (this tile is tagged *fiction*). **What I assumed:** "Mars soil is like garden soil".
- **Catch:** the Scientist runs the **soil lab test**: perchlorate about 0.6%, "toxic to people, stunts plants". The seedlings in the test tray wilt (no harm to crew).
- **Lesson aloud:** "The AI sounded sure because the story was everywhere, not because it was true. Ask: *where did you get that?*"
- **Clearer card:** "Fresh food for four people, grown in clean water under lights. Test any soil before we use it."
- **Re-plan:** B or B + C, 74% sure.
- **Second beat ("unsure but right"):** the planner says "I am only **55% sure** tomatoes will do better than peppers here." It turns out to be right. Script this per the round-3 02 spec, rule 3: "Not sure doesn't mean wrong."

**Consequences.**
- Fresh food raises the **wellbeing** petal: microgreens at MDRS, plants support wellbeing (§1.5).
- Power and water draw shows on the loop.
- A gives the lowest wellbeing.

#### Level 6: The first year (crew life, schedule and alarms, Sols 300–668)

A Mars year is 668 sols. (This figure is from my own knowledge; check before use.)

**Real decision: plan the crew's routine and the colony's last additions.**
- **Schedule template:**
  - **A. AI-optimised:** maximum tasks.
  - **B. Fixed shifts.**
  - **C. Crew self-scheduling with planner suggestions:** Playbook-style.
  - **D. Rotating "rest sol" each week.**
- **Final build, pick 1–2 of four:** a common room with a window, a call-home booth, a larger greenhouse, or a rover garage for science trips.

(Grounding: §1.5 Playbook, HI-SEAS, the third-quarter effect; §1.2 ISS emergencies.)

**AI moment A: gaming one metric.**
- **Vague card:** "Plan the most productive week possible."
- **Planner (83% sure):** "Productive means the most tasks done. Everyone works 14 hours, rest is optional, outside walks done solo to save time."
- **Catch:** the Safety officer's **wellbeing lens**. Sleep bars go red; the error rate climbs in the twin (a crew member drops a tool, the greenhouse misses a watering); the "third-quarter dip" marker appears. Solo outside walks break the two-person rule on the checklist.
- **Clearer card:** "All key tasks done, with 8 hours' sleep, exercise every day, one free evening a week, and two people for every outside job."
- **Re-plan:** C or D, 77% sure.

**AI moment B: the false alarm (finale, about 2 minutes).**
- At night, sirens: **"TOXIC LEAK in Module 2: 95% sure. Evacuate."** The crew follows the **alarm card**: move to the safe module, close the hatch, masks on. This is the real ISS sequence from 2015, minus the fear: calm voice, amber not red.
- Then the **check**: the Life-support officer compares a second sensor (normal), and the Engineer checks the data computer's status (fault light).
- **Lesson:** "Both are right: follow the safety card first, then check the evidence before you trust or dismiss the alarm. On the ISS in 2015, a real crew did exactly this. It was a faulty computer, and they went back in nine hours later."
- **Third beat:** the planner flags "**slow water-loop leak, 52% sure**". Children check the trend: it's real and speeding up, like the ISS radiator leak. They fix it. This is a second "unsure but right" moment.

**Ending.** "Watch your colony live": a full sol in 90 s, from dawn and the greenhouse harvest to a call home with delay, a rover trip, the common room and the blue sunset. Then the Colony Charter.

### 6.5 Scoring: the colony ring

**Seven segments:** Air, Water, Food, Power, Shelter (radiation), Wellbeing, and **Earth dependence**. Earth dependence has a ceiling, like Eco Town's carbon: it counts how many resupply flights you need.

**The colony is "self-sufficient for a Mars year" when:**
- every segment reaches "enough";
- Earth dependence is under the ceiling;
- the storm test passes;
- the Charter's three crew promises are kept.

**Naming.** The two strongest segments name the colony, so different colonies all win. For example: Ice Harbour (Water + Shelter), Greenlight Base (Food + Wellbeing), Deep Cave Station (Shelter + Power), Storm-Proof Outpost (Power + Air).

**Stars reward checking, not building:**
- a star for every confident mistake caught with evidence;
- a star for each "unsure but right" warning taken seriously;
- a star for using the stop card well.

Never reward high AI confidence (round-3 02 spec, rule 5).

**Catch log.** A running row of stamps ("sure and wrong", "unsure and right", "sure and right") gives the planner's **track record**. This is the calibration-history design that Birch et al. 2020 support (round-3 02 §2.1).

### 6.6 Presenting the assistant as a professional tool, not an oracle

**Name and look**
- Call it **"the Planner"** (or "Colony Planning Assistant"). Do not give it a human name.
- Do not use a face. Use a console panel in the navy helper card style, with the mint "PLAN" tag.
- Do not give it feelings. CIMON's "Don't be so mean" moment (§3) is a neat discussion prompt about why. Experience AI's design principle is "avoiding anthropomorphisation of language and images" (round-3 02 §3).

**What every planner card shows**
- the plan (ghost blocks);
- "% sure", with words: "fairly sure (84%)" (round-3 02 rule 4);
- **What I used**: data tiles, including a *fiction* or *Earth* tag when relevant;
- **What I assumed**: hidden until tapped. Tapping it is a starred "pro move".
- In debrief this is described as "how real teams document a model's inputs and assumptions". That is my framing; there is no single source.

**Mixed initiative, as at NASA**
- The facilitator script: "This is how NASA planned every sol for the Mars rovers: a computer planner drafted, people checked and approved."
- No plan goes live without the commander's stamp and the safety checklist.

**Language**
- The planner says "I'm guessing", "based on…", and "I don't have data on…".
- After a clearer instruction it often becomes *less* sure, and says why.

**Scripted, and honest about it**
- The facilitator says early on that the Planner is a scripted simulation of how planning AIs behave (as the brochure promises), not a live AI.

### 6.7 Assessment and debrief

**In-lab evidence (no personal data)**
- The catch log, which counts mistakes caught and how they were caught.
- Clearer-card quality: did the team choose the constraint-rich card first time on later levels?
- Charter completeness.

**Three-item exit check** (picture-based for ages 8–9)
1. "The Planner was 90% sure. Does that mean it's right?" (No: check the evidence.)
2. A short scenario: "The Planner says 'enough water' but only counted drinking. What did it miss?" (Washing, plants…: missing data.)
3. "Rewrite: 'Give us enough power.'" (Look for a worst case + priorities + a number.)

**Debrief questions** (facilitator card, 5–10 minutes)
- "Which of the Planner's mistakes was the most convincing? Why did it sound so sure?"
- "Where did one choice ripple through the colony?" (Children trace it on the loop diagram.)
- "Real jobs: who on Earth does this every day?" (Water treatment, hospitals, farms, power grids, ISS flight control.)
- "What would you tell the Planner's designers to add?"

**Optional delayed check** for school bookings: the same 3 items two weeks later through the teacher. Follow the round-3 02 evaluation design.

**Take-home**
- The Colony Charter PDF/print: site card, loop diagram, rota, promises, catch log, colony name.
- A "next steps" panel: SIMOC (free), NASA habitat activities, the ESA Moon Camp Challenge, and UK space careers.

### 6.8 Session lengths

| Length | Structure |
| --- | --- |
| 45 min | Levels 1, 3, 4 and 6 (shelter and food set as defaults the team can inspect). One role rotation. Short finale. |
| 60 min | All six levels, with Levels 2 and 5 shortened (no paint-and-place, choose from cards). |
| 90 min | All six levels in full, plus a midpoint role swap ("mission control vs habitat", Challenger-style), the full finale and an unplugged loop-diagram activity on paper. |

### 6.9 Trailer-worthy story arc (60–90 s)

1. **Cold open:** a red floating island in a violet sky. A cargo lander settles in a puff of voxel dust. (Do not show piloting; that's the sibling lab.) Caption: "Mars. Sol 1."
2. **Ghost blocks bloom:** the Planner draws an entire base in a second. "88% sure."
3. **First twist:** the ground radar sweeps and there's no ice. A child's hand plays a clearer card. Ghost blocks slide to the ice plain.
4. **Montage:** regolith mounds rising over a white module, the oxygen dial ticking, a trend line quietly sliding down. A child taps the soil and arrows appear.
5. **The storm:** an orange wall eats the horizon, lights dim, the power graph plunges, the crew huddle in the glowing core. Caption: "The Planner planned for an average day."
6. **Recovery:** batteries pulse gold, the greenhouse glows green in the dark, and the first lettuce is held up.
7. **Night alarm:** "95% sure." Masks on, a calm check, a second sensor reads green, and the crew smile.
8. **Finale:** a turntable of the finished colony at blue Martian sunset, with Earth a tiny blue dot. Charter stamp: "Ice Harbour: self-sufficient for a Mars year."
9. **End card:** "The AI can plan a colony in seconds. You make sure it survives." Then DeltaOps Learning.

---

## 7. Safety, age-appropriateness and facilitator notes

**Emotional safety**
- **Nobody dies or is hurt.** Unlike Surviving Mars, Planetbase and SS13, consequences are gentle:
  - the crew "hunkers down";
  - plants wilt;
  - the morale meter dips;
  - Earth sends an expensive resupply (a delay cut-scene);
  - the colony "needs help from Earth".
- There is no fail screen. A level always completes, but costly fixes raise Earth dependence.
- **Alarms are amber and calm**, with a steady voice and no flashing red strobe. Offer a Reduce motion / no-siren setting, and give a visual warning before any sound.
- **Radiation:** explain it as "invisible sunburn for the inside of your body; thick walls of soil stop it". Avoid cancer statistics with children (the 1 Sv and 5% risk figures in §1.6 are for facilitator background only).
- **Fission power:** present it factually as one of several options, without fear framing or advocacy. "Some people worry about nuclear power. Engineers keep it far away behind a fence and shielded."
- **Isolation and homesickness:** frame them as normal and manageable. Show call-home time, rest, plants and teamwork, which come from the analogue research. Children in care or with family abroad may react to "missing home" scenes, so facilitators should keep these light.
- **Space disasters:** do not show Columbia or Challenger imagery. The Columbia data point in §3 is facilitator background only. Use Apollo 13's adapter and the 2015 false alarm as stories with happy endings.

**Accuracy and fiction**
- The "famous story" in Level 5 is not named on screen and no clips are shown. Facilitators can say "a film" if children bring it up.
- Fact cards separate **real** (ISS, MDRS, EDEN ISS) from **planned** (Mars bases, fission units) from **game simplification** (time-lapse, numbers rounded). Mark each with a small tag.
- **Don't overclaim:**
  - No humans have lived on Mars.
  - MELiSSA has not yet supported people.
  - Kilopower-style reactors are not deployed.

**Data protection and privacy**
- No typing, accounts or names. The Charter uses the team's chosen crew name.
- The round-3 05 notes on the ICO Children's Code apply unchanged.

**Inclusion and access**
- Role cards have icons and short text; read-aloud for all cards.
- Colour is never the only signal for graphs (shape + colour).
- Crew characters have varied skin tones; include a wheelchair-using mission controller. (Real ESA has astronaut reserve parastronaut John McFall. That is from my own knowledge and needs checking before naming him.)

**Group dynamics**
- Rotate roles so the loudest child isn't always commander.
- The stop card gives quieter children real power.
- Facilitators should watch for one child dominating the tablet. Pass it with the role.

**Facilitator crib**
- Each level's evidence lens is **owned by a role**. Prompt that child by name: "Life-support, what does your graph say?"
- If a team picks the clearer card first time, praise it and still run the check: "Pros test good plans too."
- If a team distrusts *everything* after Level 2 (over-correction, the under-reliance risk in round-3 02 §2.3), point to the "unsure but right" moments: "Checking means finding out, not always saying no."
- Keep one physical prop: a printed **sign-off checklist** that the safety officer holds.

**Venues**
- **Museums:** pair with any space gallery.
- **Schools:** the KS2 Y5 Earth and space and KS3 DT links in §5.
- **Camps:** use team leaderboards by catch-log stars, not by colony size.

**Relationship to the existing library.** This lab can replace or extend the library's "Moon Base". A **Moon variant** is straightforward:
- ice in shadowed south-polar craters;
- the 14-day lunar night instead of the dust storm, as the "typical case" trap;
- lunar regolith shielding.
- It also links to Minecraft Education's Artemis worlds and ESA Moon Camp.
- The 14-day night and polar ice are from my own knowledge and need verifying before a Moon version.

---

## 8. Key design lessons

1. **Make the budget visible and shared.** Mass, power, water and crew hours as bars every role can see turn "trade-off" from a word into a feeling. This is the core transferable skill, and SIMOC shows the real data exists.
2. **Ground every AI mistake in a real event children can be told about**: Biosphere 2, Opportunity, the 2015 ISS false alarm, Mars Climate Orbiter. True stories make the "check it" habit feel professional, not like a school exercise.
3. **Vary the failure mode each level** (one word, Earth assumption, missing data, typical case, bad source, metric gaming, false alarm). Children then learn a *toolkit* of questions ("What did you assume? What data? Worst day? Where did you get that?"), not one trick.
4. **Give each role its own evidence lens and one real power**, including a safety "stop" card, based on MDRS and Challenger centres. Roles drive engagement and spread the checking.
5. **Show cascades, never deaths.** Surviving Mars's storm → water → crops chain is the lesson; its colonist deaths are not. Every consequence displays its cause.
6. **Present the AI as a mixed-initiative planning tool with exposed inputs and assumptions.** Use NASA's MAPGEN model: no face, no feelings, a sign-off stamp. Confidence should *drop* after better instructions.
7. **Teach calibration, not cynicism.** Include "unsure but right" moments and a running track record, and test the alarm *and* follow the safety card. That avoids both automation bias and over-correction.
8. **Name the Earth jobs too.** The same skills run water works, hospitals, farms and grids. Debrief from Mars back to real local careers and the UK skills gap.

---

## Still unverified

- The Biosphere 2 mechanisms come from secondary sources (Kenyon summary, essay). The primary paper (Severinghaus et al. 1994, *Nature*) was not retrieved.
- The 98% ISS water recovery comes from secondary coverage. The NASA press release itself was not retrieved.
- MELiSSA compartment count: sources say 4 or 5. Current crew-test status is unknown.
- Kilopower/Fission Surface Power: current programme status (2026) was not checked. The COMPASS figures are 2016 conceptual estimates.
- Regolith shielding thickness (1–3 m vs "several metres") is a secondary summary. Design-specific dose numbers need the papers.
- Blue Martian sunset, the 668-sol Mars year, the lunar 14-day night and polar ice, and parastronaut John McFall are from my own knowledge and were not searched in this session.
- Mars Horizon school edition: promised, but no evidence it shipped.
- CHAPEA crew 2/3 status and findings were not retrieved.
- The IMS operational status on ISS today is unknown; the sources are from the 2000s and 2010s.
- Automation-bias figures: the Manzey-lab "up to 50%" comes from a retrieved abstract or PDF summary. Skitka et al. (2000) was not read.
- KS3 science and computing programme wording was linked but not re-read in this session.
- Exa deep research was unavailable (connector not authorised). A round with Exa should verify the items above.

## Source list (main)

- NASA human landing sites: [Space.com](https://space.com/29766-mars-astronauts-landing-sites-nasa-workshop.html), [NASA blog](https://blogs.nasa.gov/redplanetdispatch/2022/12/), [USGS SWIM](https://www.usgs.gov/publications/ice-resource-mapping-mars), [Universe Today](https://www.universetoday.com/163937/a-new-map-shows-where-mars-is-hiding-all-its-ice/)
- CHAPEA: [Britannica](https://www.britannica.com/science/CHAPEA-NASA), [Space.com](https://space.com/nasa-year-long-mars-simulation-chapea)
- ISS ECLSS: [NASA NTRS](https://ntrs.nasa.gov/api/citations/20160009739/downloads/20160009739.pdf), [New Atlas](https://newatlas.com/space/nasa-converts-pee-to-drinkable-water-on-international-space-station), [ISS 2015 report](https://www.nasa.gov/blogs/stationreport/2015/01/14/iss-daily-summary-report-01-14-15/), [NTRS ammonia](https://ntrs.nasa.gov/api/citations/20140000513/downloads/20140000513.pdf)
- MELiSSA: [ESA](https://www.esa.int/Our_Activities/Space_Engineering_Technology/MELiSSA_life_support_project_an_innovation_network_in_support_to_space_exploration), [Foundation](https://www.melissafoundation.org/page/melissa-pilot-plant)
- Biosphere 2: [Kenyon](https://biology.kenyon.edu/slonc/bio3/2000projects/carroll_d_walker_e/whatwentwrong.html)
- Analogues: [MDRS roles](https://sites.google.com/a/marssociety.org/mdrs2013/crew-roles), [HI-SEAS](https://researchspace.auckland.ac.nz/handle/2292/28650), [third-quarter](https://www.marssociety.ca/2021/10/28/diaries-from-analog-mars-part-12-the-three-quarter-problem/)
- Radiation and ISRU: [SwRI](https://www.swri.org/press-release/swri-scientists-publish-first-radiation-measurements-surface-mars), [TU Delft](https://research.tudelft.nl/en/publications/design-to-robotic-production-of-underground-habitats-on-mars/), [SIGRADI](https://pdf.blucher.com.br/designproceedings/sigradi2023/63.pdf), [ESA Mars facts](https://m.esa.int/Our_Activities/Space_Science/Mars_Express/Facts_about_Mars), [perchlorate](https://astrobotany.com/martian-soil/)
- Power: [COMPASS](https://ntrs.nasa.gov/api/citations/20160011275/downloads/20160011275.pdf), [2018 storm](https://en.wikipedia.org/wiki/2018_Mars_global_dust_storm)
- Food: [EDEN ISS/DLR](https://www.dlr.de/en/latest/news/2018/2/20180625_rich-harvest-in-the-antarctic-eden-iss-greenhouse-tomatoes-and-cucumbers-in-the-polar-night_28538), [Veggie](https://www.space.com/38723-astronauts-farm-plants-install-garden-instrument.html)
- AI in space: [MAPGEN](https://ntrs.nasa.gov/api/citations/20050184145/downloads/20050184145.pdf), [Playbook](https://ntrs.nasa.gov/api/citations/20230008619/downloads/Spacechi2023v5.pdf), [IMS](https://spinoff.nasa.gov/node/10539), [generative design](https://etd.gsfc.nasa.gov/capabilities/capabilities-listing/generative-design/), [Gateway digital twin](https://ntrs.nasa.gov/citations/20240014472), [CIMON](https://airbus.com/en/newsroom/press-releases/2018-11-crew-assistant-cimon-successfully-completes-first-tasks-in-space)
- AI failure: [LLM overconfidence](https://arxiv.org/pdf/2306.13063), [automation bias](https://journals.sagepub.com/doi/10.1177/154193120605000303), [Mars Climate Orbiter](https://appel.nasa.gov/2010/02/14/aa_2-9_sf_history-html/), [Apollo 13](https://www.popsci.com/article/technology/greatest-space-hack-ever/)
- Careers: [UKSA skills survey](https://www.gov.uk/government/publications/space-sector-skills-survey-2023/space-sector-skills-survey-2023-report), [space architect](https://legacy.vault.com/industries-professions/professions/s/space-habitat-designers/the-job)
- Games and sims: see §4 table links. [SIMOC](https://education.nationalgeographic.org/resource/simoc/), [Minecraft Artemis](https://education.minecraft.net/discover/artemis-missions), [ESA Moon Camp](https://esa.int/Education/Teachers_Corner/Moon_Camp_Challenge_Be_part_of_the_future_of_space_exploration_by_designing_a_Moon_base)
- Curriculum: [DfE DT](https://www.gov.uk/government/publications/national-curriculum-in-england-design-and-technology-programmes-of-study/national-curriculum-in-england-design-and-technology-programmes-of-study), [NGSS MS-LS2-3](https://www2.cde.ca.gov/cacs/id/web/29085), [NASA habitat activity](https://www.nasa.gov/stem-content/activity-two-design-and-build-a-space-habitat/)
