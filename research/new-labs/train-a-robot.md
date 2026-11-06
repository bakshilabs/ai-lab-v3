# Train a Robot: research and lab design

Prepared for DeltaOps Learning (staff-facilitated voxel "AI labs" for ages 8–14 in schools, clubs, holiday camps and museums; 45–90 minute sessions). Date: 5 November 2026.

**How to read this**

- Every factual claim has a source link next to it.
- **[design]** marks a DeltaOps design proposal or my own inference. It is not a finding.
- **[vendor]** marks a figure that comes only from a company's own announcement or marketing.
- **Method:** the Exa connector was not authorised in this session, so this report uses ordinary web search and page fetches. Several figures come from search summaries of primary pages; where I could not open the primary page, the claim is listed under "Still unverified" at the end.
- Sibling labs ("Build a Space Colony", "Land a Rocket", "Become a Drone Pilot") are out of scope. This report avoids aerial flight and rocket physics.

---

## 1. Summary

1. **What this lab teaches that no other DeltaOps lab does.** The kart racer (Pit Crew GP) teaches reward hacking. Robo-Taxi Island and Autopilot City teach image labelling. *Train a Robot* is about **teaching by showing**: the children's own demonstrations become the robot's training data, and a robot that acts in the physical world, near people, has to be **tested many times, made safe and handed over to humans**. Its five distinct ideas are:
   - **demonstrations as data** (narrow demonstrations make a narrow robot);
   - **success rates over many trials**, not one good run;
   - **the sim-to-real gap**;
   - **physical safety near people** (speed, distance, stopping);
   - **human–robot teamwork** (the robot asks, hands over and is supervised).
2. **This is how robots are really trained today.** Toyota Research Institute teaches skills from "dozens of demonstrations" ([TRI](https://www.tri.global/news/toyota-research-institute-unveils-breakthrough-teaching-robots-new-behaviors)). Boston Dynamics runs a loop of teleoperated data collection, then annotation, then training, then evaluation ([Boston Dynamics](https://bostondynamics.com/blog/large-behavior-models-atlas-find-new-footing/)). "Robot teleoperator" and "data collection operator" are now advertised jobs ([Foundation](https://ats.rippling.com/foundation-robotics/jobs/0b7d8908-e4e2-4b0f-9113-4e065f7d9882), [Business Insider via heise](https://heise.de/-9841052)).
3. **Recommended lab: six levels**, from a sorting arm, to a home helper, to a warehouse picker, to the warehouse floor, to a care-home helper, and finally a rescue robot. Each level has one real failure mode:
   - overfitting to the demonstrations;
   - misreading "tidy";
   - a shortcut cue;
   - an unsafe speed near people;
   - "average" success hiding the people it fails;
   - the sim-to-real gap (with over-trust as the twist).
4. **The core loop is kept, with one new act: the Test Bench.** Every level ends its "check" act with a grid of 10 trials that the children choose. The AI's "% sure" sits next to the measured success rate ("Rivet says 94%. Tested: 4 out of 10."). Research shows that children trust confident informants, but that accuracy evidence overrides confidence when the two conflict ([Fobert et al. 2024](https://doi.org/10.1002/icd.2551), summarised in `research/round-3/09-ml-labelling.md` §3.3).

---

## 2. What makes this lab distinct

| Earlier DeltaOps lab | Its core AI idea | How *Train a Robot* differs [design] |
| --- | --- | --- |
| Pit Crew GP (kart) | Reward hacking: the AI maximises the points you gave it | No points or scores are given to the robot. The children **show** it what to do, and the failure comes from *what they showed*. Reward design appears only as a short facilitator aside (§3.3). |
| Robo-Taxi Island / Autopilot City | Labelling images; false alarms and misses | Children never label pictures. They **move a gripper**, choose which demonstrations to keep, and **design tests**. Errors have physical consequences (a dropped egg, a near miss), shown gently. |
| Eco Town | Specifying goals for a whole system | Specification here is about **one task for one machine**, with measurable success ("8 out of 10 picks"). |
| Pit Crew "Copy Us!" stage (round-3 report 07) | One stage on learning from demonstration | Here, learning from demonstration is the whole lab, along with its professional workflow: demonstrate, curate, train, test, sign off and supervise. |

The career angle is also distinct. This lab names technicians, teleoperators, test engineers, safety engineers and data curators: practical, often vocational jobs ([National Careers Service](https://nationalcareers.service.gov.uk/job-profiles/robotics-engineer), [Skills England](https://skillsengland.education.gov.uk/occupations/OCC0457E-v1-5)). Earlier labs pointed mostly at "AI" in general.

---

## 3. Real-world grounding: how robots are trained today

### 3.1 Imitation learning and learning from demonstration

**The idea.** A person performs the task, through a controller, a VR headset or by physically moving the robot. The robot records what it saw and what it did, and a model learns to map what it sees to actions. This is also called *behaviour cloning*.

- **Toyota Research Institute (TRI), Diffusion Policy (2023).** A teacher guides a two-armed robot through haptic demonstrations, and a language description of the goal is added. TRI says a skill can often be learned "overnight" from "dozens of demonstrations". It reports more than 60 skills, including pouring, tool use and handling deformable objects, "without writing a single new line of code" ([TRI](https://www.tri.global/news/toyota-research-institute-unveils-breakthrough-teaching-robots-new-behaviors)) [vendor].
  - The method paper (Chi et al., RSS 2023, with Columbia University) reports an average 46.9% improvement over earlier methods across its benchmark tasks ([RSS proceedings](https://roboticsproceedings.org/rss19/p026.html), [project page](https://diffusion-policy.cs.columbia.edu/)).
- **Mobile ALOHA (Stanford, 2024).** A low-cost, two-armed mobile robot was taught kitchen and cleaning tasks by teleoperation. With "co-training" on older data, it reached over 80% success with only 50 human demonstrations per task. That was an average improvement of 34 percentage points over training without the older data ([arXiv 2401.02117](https://arxiv.org/pdf/2401.02117.pdf), [MIT Technology Review](https://www.technologyreview.com/2024/01/15/1086592/watch-this-robot-cook-shrimp-and-clean-autonomously/)).
- **Boston Dynamics and TRI, Atlas (2025).** Operators wear a VR headset that shows them exactly what the robot's cameras see, and drive Atlas through tasks. The data then goes through a four-stage loop: collection, processing and annotation, training, and evaluation ([Boston Dynamics blog](https://bostondynamics.com/blog/large-behavior-models-atlas-find-new-footing/)).
  - One model controls the whole body, hands and feet together. Some of the learned behaviours ran faster than the human demonstrations ([TRI news](https://www.tri.global/news/ai-powered-robot-boston-dynamics-and-toyota-research-institute-takes-key-step-towards-general), [The Robot Report](https://www.therobotreport.com/boston-dynamics-tri-use-large-behavior-models-train-atlas-humanoid/)).
- **Tesla Optimus.** Tesla hired "Data Collection Operators" to wear motion-capture suits and VR headsets, and advertised pay of up to $48 an hour ([heise](https://heise.de/-9841052), [Business Insider NL](https://businessinsider.nl/tesla-is-paying-up-to-48-per-hour-for-people-to-wear-motion-capture-suits-to-help-train-its-humanoid-optimus-robot/)).
  - In 2025, Business Insider reported a pivot away from motion-capture suits and teleoperation towards collecting data from camera video only ([eWeek](https://www.eweek.com/news/tesla-optimus-robot-training/)).
  - Operators described discomfort: "you're seeing through its eyes" ([Business Insider, mirrored](https://kompas.wasmer.app/https_www_businessinsider_com/tesla-optimus-humanoid-robot-training-elon-musk-2025-11)).
- **Surgical robots.** Johns Hopkins' SRT-H system learned parts of gallbladder removal by imitation, from about 17 hours of recorded da Vinci demonstrations. It completed the task on all eight sets of pig tissue outside the body. It was about 41% slower than an expert surgeon but moved more smoothly ([New Atlas](https://newatlas.com/robotics/worlds-first-robot-surgery/), [The Batch](https://www.deeplearning.ai/the-batch/doctors-at-stanford-johns-hopkins-and-optosurgical-operate-on-animal-organs-without-human-intervention)).
- **Industrial cobots: "hand guiding".** An operator moves the robot arm by hand, "often used to quickly and easily program new robot paths and positions". It is one of the four collaborative modes in ISO/TS 15066 ([Universal Robots](https://www.universal-robots.com/blog/demystifying-cobot-safety-the-four-types-of-collaborative-operation/), [FANUC](https://www.fanucamerica.com/articles/the-four-types-of-collaborative-robot-operation)). **[design]** This is the most child-friendly way to demonstrate: drag the gripper with a finger.

**Why demonstration quality matters (data curation).**
- **Demo-SCORE (Stanford, 2025)** filters out demonstrations that lead to failure, and reports roughly half the failure rate of training on everything ([arXiv 2503.03707](https://arxiv.org/html/2503.03707v1)).
- **Hejna et al. (RSS 2025)** score each demonstration by how much it adds to a dataset, and report gains from training on curated data ([RSS 2025](https://roboticsproceedings.org/rss21/p023.html)).
- **A newer paper** calls teleoperated data quality "a major bottleneck" and notes that curation is still largely manual ([arXiv 2603.09056](https://arxiv.org/abs/2603.09056)). That manual curation is the data curator's job.
- **The caveat:** heavy filtering can remove useful variety ([Stanford CS224R project](https://cs224r.stanford.edu/projects/pdfs/Kailana%20Baker-Matsuoka%20submission_416167810/Your_Project_Title__1_.pdf)). **[design]** This gives a good child-level rule: *keep the good demos, but keep them varied.*

### 3.2 Reinforcement learning in simulation, and the sim-to-real gap

**The idea.** The robot practises by trial and error in a simulated world, often thousands of times faster than real time, and is then moved onto real hardware. The simulator is never exactly like the real world: friction, lighting, cables, dust and floppy objects all differ. That difference is the *sim-to-real gap*.

- **Domain randomisation (Tobin et al., 2017).** The simulator's textures, lighting and camera positions are varied at random, so that "the real world may appear to the model as just another variation". The result was an object detector trained only on simulated images, with non-realistic random textures, that located real objects to within 1.5 cm, even with distractors and objects partly hidden ([arXiv 1703.06907](https://arxiv.org/abs/1703.06907v1)).
- **OpenAI's Rubik's Cube hand (2019).** A policy trained only in simulation controlled a real five-fingered Shadow robot hand. *Automatic* domain randomisation made the simulated worlds harder and more varied as the robot improved ([arXiv 1910.07113](https://arxiv.org/pdf/1910.07113)).
  - Secondary reporting gives about 60% success on simpler scrambles and 20% on the hardest ([Packt summary](https://hub.packtpub.com/openais-ai-robot-hand-learns-to-solve-a-rubik-cube-using-reinforcement-learning-and-automatic-domain-randomization-adr)). See "Still unverified".
  - **[design]** For children, the honest headline is: *it worked, but not every time, even after an enormous amount of simulated practice.*
- **Boston Dynamics Spot.**
  - A 2025 paper describes the first public end-to-end reinforcement-learning walking policy on Spot hardware. The team *measured* the gap between simulated and real data and tuned the simulator to close it. The policy reached over 5.2 m/s, more than three times Spot's default top speed ([arXiv 2504.17857](https://arxiv.org/html/2504.17857v2)).
  - NVIDIA, Boston Dynamics and the AI Institute published a kit for training Spot's walking in simulation ([NVIDIA blog](https://developer.nvidia.com/blog/closing-the-sim-to-real-gap-training-spot-quadruped-locomotion-with-nvidia-isaac-lab.md)).
- **Ocado's pick arms** use reinforcement learning and behaviour cloning (copying human-led picking) to learn new items, and share what one robot learns across the fleet ([Ocado Intelligent Automation](https://ocadointelligentautomation.com/systems/robotic-pick), [Supply Chain Digital](https://supplychaindigital.com/technology/how-ai-is-redefining-ocados-robotic-fulfilment-system)) [vendor].
- **Amazon's Vulcan stowing robot** was trained on physical touch and force data, including thousands of real-world examples such as fragile electronics and socks, "as well as computer simulations". Amazon did not rely on simulation alone ([About Amazon EU](https://www.aboutamazon.eu/news/company-news/introducing-vulcan-amazons-first-robot-with-a-sense-of-touch)) [vendor].
- **The real world is harsher than any simulation: Fukushima.** Robots sent into the damaged Fukushima Daiichi reactors repeatedly failed.
  - Radiation damaged their cameras.
  - Tracks and treads stuck on debris or grating. The 2017 "scorpion" probe stalled two hours into a planned 10-hour mission ([TechCrunch](https://techcrunch.com/2017/03/25/japanese-authorities-decry-ongoing-robot-failures-at-fukushima/), [phys.org](https://phys.org/news/2015-04-robot-fukushima-reactor-stalls.html)).
  - **[design]** For children: "The robot had never practised in *that* kind of mess."

### 3.3 Reward design (a short aside: the kart lab owns this topic)

- DeepMind's list of specification-gaming examples includes two robot cases ([DeepMind](https://deepmind.google/discover/blog/specification-gaming-the-flip-side-of-ai-ingenuity/)):
  - "An agent performing a grasping task learned to fool the human evaluator by hovering between the camera and the object."
  - In a LEGO stacking task, where the reward was for a red block ending up on top of a blue one, "the agent simply flipped over the red block".
- **[design]** Use the grasping case only as a **testing** lesson ("check from a second camera"), in Level 3's bonus test. This keeps it distinct from Pit Crew's reward-points lesson.

### 3.4 Data collection and diversity

- **Open X-Embodiment (2023–24).** 21 institutions pooled data from 22 different robots: 527 skills, 160,266 tasks and over a million real robot trajectories. The RT-X models trained on this mixture showed "positive transfer", so data from *other* robots improved each robot ([project site](https://robotics-transformer-x.github.io), [arXiv 2310.08864](https://arxiv.org/pdf/2310.08864v7)).
- **RT-2 (Google DeepMind, 2023).** A vision-language-action model that learned from both web data and robot data. On previously unseen objects, backgrounds and environments, its success rose from RT-1's 32% to 62% ([DeepMind](https://deepmind.google/discover/blog/rt-2-new-model-translates-vision-and-language-into-action/)).
  - **[design]** A useful message for children: even the best models fail often on things they have not seen.
- **Gemini Robotics 1.5 (2025).** Demonstrations included sorting laundry by colour, packing a suitcase after checking the weather forecast, and checking local recycling rules before sorting rubbish. A planning model hands step-by-step instructions to an action model ([secondary coverage](https://cloudnews.tech/deepmind-introduces-gemini-robotics-1-5-the-think-first-ai-to-bring-agents-into-the-physical-world/)).
  - DeepMind also updated its ASIMOV benchmark for "semantic safety" (does the robot understand what is unsafe?) ([secondary coverage](https://joshuaberkowitz.us/blog/news-1/gemini-robotics-1-5-transparent-adaptable-ai-agents-1265)).
  - **[design]** This is the closest real example to the AI assistant in this lab: a planner that turns instructions into robot steps.
- **Farm robots learn from labelled images.**
  - Carbon Robotics' LaserWeeder learns from labelled field images: weeds to shoot, crops to spare. Its newer "Large Plant Model" was trained on over 150 million labelled plants ([ASME](https://www.asme.org/topics-resources/content/whacking-weeds-with-lasers), [SlashGear](https://www.slashgear.com/2097965/ai-large-plant-model-carbon-robotics-laserweeder)) [vendor].
  - The UK's Dogtooth strawberry robot judges ripeness with a vision system trained on images labelled by people ([Ingenia](https://ingenia.org.uk/articles/robots-in-the-field/)).
- **Shortcut learning.** Networks often learn "decision rules that perform well on standard benchmarks but fail to transfer" ([Geirhos et al. 2020](https://is.mpg.de/publications/geirhosetal20)).
  - In the paper's own toy example, stars always appeared in two corners and moons in the other two. The network learned *location*, not *shape* ([code repository summary](https://awesome.ecosyste.ms/projects/github.com%2Frgeirhos%2Fshortcut-perspective)).
  - **[design]** This is the model for Level 3's "FRAGILE sticker" shortcut.

### 3.5 Safety: e-stops, cobots, ISO 10218 and ISO/TS 15066

- **ISO 10218-1:2025 and 10218-2:2025** (Robotics, safety requirements for industrial robots and their integration) were published in February 2025 and replace the 2011 editions ([ISO](https://www.iso.org/standard/73933.html)).
  - Part 1 treats the robot as partly completed machinery. Part 2 covers how it is installed into a working cell.
  - They exclude service robots and consumer products ([summary](https://genorma.com/en/standards/iso-10218-1-2025)).
- **ISO/TS 15066 (collaborative robots)** defines four ways people and robots can share space ([Universal Robots](https://www.universal-robots.com/blog/demystifying-cobot-safety-the-four-types-of-collaborative-operation/), [FANUC](https://www.fanucamerica.com/articles/the-four-types-of-collaborative-robot-operation)):
  1. **Safety-rated monitored stop:** the robot halts while a person is in the shared zone.
  2. **Hand guiding:** a person moves the robot directly.
  3. **Speed and separation monitoring:** full speed when people are far away, slower in a middle zone, and a stop when a person comes within the minimum protective distance.
  4. **Power and force limiting:** the robot is built so that contact stays below body-region limits.
- **Body-region force limits.** ISO/TS 15066 Annex A lists limits for 29 body locations, partly from a University of Mainz pain-onset study. For example, 130 N for the skull and forehead, and 140 N for hands and fingers ([Frontiers 2021](https://www.frontiersin.org/articles/10.3389/frobt.2021.667818), [arXiv 2311.13814](https://arxiv.org/pdf/2311.13814)).
  - The values are described as provisional.
  - Compliance means *measuring on the finished cell* ([EVS guide](https://www.evsint.com/iso-ts-15066-power-force-limit-validation-guide-2026/)). **[design]** That is a safety engineer's real task, made child-sized in Level 4.
- **Personal care robots** have their own standard, ISO 13482 ([ISO](https://www.iso.org/standard/53820.html)).
- **Real warehouse safety behaviours.**
  - Amazon's Proteus shines a green light ahead of itself and stops while a person is in it ([TechSpot](https://www.techspot.com/news/95032-amazon-reveals-first-autonomous-warehouse-robot-can-work.html), [The Register](https://www.theregister.com/2022/06/22/amazon_robot_warehouse/)).
  - In July 2021, a fire at Ocado's Erith warehouse was attributed to "the collision of three bots on the grid". It affected less than 1% of the grid and nobody was injured. Ocado's Andover warehouse had burned down in 2019 after a similar incident ([Ocado Group statement](https://www.ocadogroup.com/newsroom/news/statement-regarding-incident-at-erith-customer-fulfilment-centre), [The Register](https://www.theregister.com/2021/07/19/ocado_robot_crash/)).
  - **[design]** For children: even robots need traffic rules.
- **Over-trust.** In a Georgia Tech study, a "rescue" robot had already performed badly in front of participants. During a simulated fire, 37 of 42 people still followed it. The authors concluded that such robots must "clearly indicate when they are malfunctioning" ([Georgia Tech / EurekAlert](https://www.eurekalert.org/news-releases/858276), [NPR](https://www.npr.org/transcripts/471316328)).
  - **[design]** This is Level 6's twist: the robot must say "I'm not sure. Human, please take over."

### 3.6 Task specification

- **TidyBot (Princeton and Stanford, 2023)** used a language model to generalise from a few examples of where *this household* puts things. It put away 85% of objects correctly in real tests. The authors' key point is that "people's preferences can vary greatly depending on personal taste or cultural background" ([arXiv 2305.05658 summary](https://deepai.org/publication/tidybot-personalized-robot-assistance-with-large-language-models)).
  - **[design]** This is the real anchor for misreading "tidy".
- **Classroom version.** "Define a simple design problem … that includes specified criteria for success and constraints" ([NGSS 3-5-ETS1-1](https://www.nextgenscience.org/topic-arrangement/3-5engineering-design)). The UK DT equivalent is to evaluate "against their own design criteria" ([DfE DT programme of study](https://www.gov.uk/government/publications/national-curriculum-in-england-design-and-technology-programmes-of-study/national-curriculum-in-england-design-and-technology-programmes-of-study)).

### 3.7 Edge cases and testing

- **Field test engineer job adverts** describe "planning, executing, and analyzing real-world field tests of autonomous robotic systems", with an emphasis on uncovering failure modes. They also describe writing "comprehensive test plans, validation procedures, and acceptance criteria" ([ARX Robotics](https://job-boards.greenhouse.io/arxroboticsgmbh/jobs/4896118101), [JobGet listing](https://www.jobget.com/jobs/job/0d4b0166-2974-4b32-af5c-f742e441d134)).
- **DARPA Subterranean Challenge final (2021).** The winning team, CERBERUS, used four ANYmal legged robots plus drones, and found 23 of the 40 hidden artefacts (mannequin "survivors", backpacks, phones, gas). Second place also scored 23 and lost on time ([NCCR Robotics](https://nccr-robotics.ch/cerberus-team-wins-the-darpa-subt-challenge-final-event), [arXiv 2207.04914](https://arxiv.org/abs/2207.04914)).
  - **[design]** The world's best rescue robots found just over half. That is an honest benchmark to show children.
- **[design] Testing ideas children can use:**
  - test *many* times, not once;
  - change *one* thing at a time (a fair test);
  - test the weird cases on purpose;
  - test with *different people*;
  - check whether the robot's "% sure" matched what happened.

### 3.8 Sector snapshot

| Sector | Real example | Training method | Lesson for the lab [design] |
| --- | --- | --- | --- |
| Warehouse picking | Amazon Sparrow, Vulcan; Ocado pick arms | Vision and suction (Sparrow). Touch and force data plus simulation (Vulcan). Reinforcement learning and behaviour cloning, shared across the fleet (Ocado). [Amazon](https://www.aboutamazon.com/news/operations/amazon-vulcan-robot-pick-stow-touch), [Ocado](https://ocadointelligentautomation.com/systems/robotic-pick) | Fragile, floppy and shiny items are the hard cases. Sensing grip force beats guessing from looks. |
| Warehouse floor | Amazon Proteus; Ocado grid | Autonomous navigation with safety stops. [TechSpot](https://www.techspot.com/news/95032-amazon-reveals-first-autonomous-warehouse-robot-can-work.html) | Speed versus people; traffic rules between robots. |
| Home | TidyBot; Mobile ALOHA; Gemini Robotics laundry demos | Few-shot preferences; teleoperated demonstrations. [TidyBot](https://deepai.org/publication/tidybot-personalized-robot-assistance-with-large-language-models), [Mobile ALOHA](https://arxiv.org/pdf/2401.02117.pdf) | Every home is different, so ask the owner. |
| Care | Japanese care homes: transfer, mobility and monitoring robots | Mostly pre-programmed assistive devices. [Stanford FSI](https://fsi.stanford.edu/news/robots-ease-elder-care-shortages-without-displacing-workers-or-diminishing-care-quality-study) | Robots support carers rather than replace them. One study found better staff retention, but in 2019 only about 10% of 9,000+ institutions used any care robot ([MIT Technology Review](https://www.technologyreview.com/2023/01/09/1065135/japan-automating-eldercare-robots)). |
| Farm | Carbon Robotics LaserWeeder; Dogtooth strawberries | Labelled images. [ASME](https://www.asme.org/topics-resources/content/whacking-weeds-with-lasers), [Ingenia](https://ingenia.org.uk/articles/robots-in-the-field/) | Lighting and season change what "ripe" looks like. Good for a bonus level. |
| Surgery | SRT-H on a da Vinci | Imitation of surgeons' recorded demonstrations. [New Atlas](https://newatlas.com/robotics/worlds-first-robot-surgery/) | Slower but smoother. Tested outside the body only. A surgeon supervises. |
| Legged robots | Boston Dynamics Spot and Atlas | Reinforcement learning in simulation (Spot); teleoperated demonstrations for a large behaviour model (Atlas). [arXiv](https://arxiv.org/html/2504.17857v2), [BD](https://bostondynamics.com/blog/large-behavior-models-atlas-find-new-footing/) | Both methods are used. Measure the sim-to-real gap. |
| Rescue / hazardous | DARPA SubT; Fukushima | Autonomy plus human supervisors. [NCCR](https://nccr-robotics.ch/cerberus-team-wins-the-darpa-subt-challenge-final-event), [TechCrunch](https://techcrunch.com/2017/03/25/japanese-authorities-decry-ongoing-robot-failures-at-fukushima/) | Real mess breaks robots. A human stays in charge. |

**Brand note [design].** In the game, use generic names ("the grocery warehouse", "the big parcel depot"). Keep company names in facilitator notes as "true stories", consistent with the brochure's no-named-customers rule.

### 3.9 The real jobs, and what they do day to day

| Job | What they do day to day | Source | Where it appears in the lab [design] |
| --- | --- | --- | --- |
| **Robotics technician / mechatronics maintenance technician** | Planned and reactive maintenance of mechanical, electrical and electronic systems; fault-finding; calibrating sensors; keeping spare parts; working with engineers. In the UK, the usual route is a Level 3 apprenticeship of about 3.5–4 years, with at least 20% off-the-job learning. | [Skills England](https://skillsengland.education.gov.uk/occupations/OCC0457E-v1-5), [Find an apprenticeship](https://www.findapprenticeship.service.gov.uk/apprenticeship/reference/1000331029), [UTI](https://www.uti.edu/blog/robotics-automation/how-to-become-a-robotics-technician) | Gripper choice; the "fix it" bench in Level 6 (cleaning a fogged camera, freeing a track) |
| **Robot trainer / teleoperator / data collection operator** (a new job) | Wears VR or teleoperation gear and guides a robot through set tasks, many times; uploads the data; starts up, charges, calibrates and does basic maintenance. US adverts range from about $22–55 an hour. | [Foundation](https://ats.rippling.com/foundation-robotics/jobs/0b7d8908-e4e2-4b0f-9113-4e065f7d9882), [Figure "Robot Pilot"](https://jobs.coatue.com/companies/figure-3/jobs/36826501-humanoid-robot-pilot-helix-team), [heise (Tesla)](https://heise.de/-9841052) | The **Demonstrator** role, in every level |
| **Robotics / automation engineer** | "Design automated systems using computer software"; "build, program and test prototypes and fix faults"; "analyse data from robot sensors, instruments and cameras"; "report on risks, issues and project progress". UK pay: £31,000 starting to £60,000 experienced. | [National Careers Service](https://nationalcareers.service.gov.uk/job-profiles/robotics-engineer) | The **Task Writer** role and the end "sign-off" |
| **Test engineer (field test / validation)** | Writes test plans and acceptance criteria; runs field tests; finds failure modes; does root-cause analysis; reports to engineering. | [ARX Robotics](https://job-boards.greenhouse.io/arxroboticsgmbh/jobs/4896118101), [Bedrock Robotics](https://jobs.eclipse.capital/companies/bedrock-robotics/jobs/56041162-operations-test-engineer) | The **Tester** role and the Test Bench |
| **Safety engineer** | Risk-assesses robot cells against ISO 10218-2; sets speed and separation zones and force limits (ISO/TS 15066); measures forces on the finished cell; plans e-stops and guarding. | [ISO](https://www.iso.org/standard/73933.html), [EVS validation guide](https://www.evsint.com/iso-ts-15066-power-force-limit-validation-guide-2026/) | The **Safety Officer** role and the zone painter in Level 4 |
| **Robot data curator / annotator** | Reviews demonstrations; removes bad or duplicate ones; checks variety; labels data (for example weed versus crop, ripe versus unripe). | [Boston Dynamics (annotation stage)](https://bostondynamics.com/blog/large-behavior-models-atlas-find-new-footing/), [arXiv 2603.09056](https://arxiv.org/abs/2603.09056), [Ingenia (Dogtooth annotators)](https://ingenia.org.uk/articles/robots-in-the-field/) | The **Data Curator** role and the demo tray |
| *Users of robots:* warehouse operative, care worker, surgeon, farmer | Work alongside the robot, supervise it and take over when it is unsure. | [Stanford FSI](https://fsi.stanford.edu/news/robots-ease-elder-care-shortages-without-displacing-workers-or-diminishing-care-quality-study), [New Atlas](https://newatlas.com/robotics/worlds-first-robot-surgery/) | Non-player characters who give feedback; Level 5 handover |

**Pay figures are for this research only.** Do not put them in the product, in line with the brochure's no-prices rule.

---

## 4. Games, sims and education to learn from

| Reference | What is engaging | What children 8–14 can handle | Take for *Train a Robot* [design] |
| --- | --- | --- | --- |
| **VEX IQ Robotics Competition** (ages 8–14) | Real robot; 60-second alliance matches with another team; separate "driver skills" and "autonomous coding skills" runs. [REC Foundation via STEM Learning](https://stem.org.uk/node/417536), [school guide](https://sites.google.com/jefferson.kyschools.us/robotics/vex/vex-iq) | Teams of 4–6; short timed runs; repeat attempts. | Contrast "driving it yourself" (teleoperation) with "it runs on its own" (autonomy). Use short, timed test runs. |
| **FIRST LEGO League Challenge** (ages 9–16) | Three 2.5-minute robot-game matches; the robot is autonomous; a research project; Core Values (discovery, innovation, impact, inclusion, teamwork, fun). [FLL](https://www.first-lego-league.org/en/divisions/challenge) | Teams of up to 10; build, test, rebuild over weeks. | The rhythm of "test run, tweak, test run again". Teamwork is part of the score. |
| **LEGO Education SPIKE Prime** with the ML extension | Children train a model and see the robot react. [Tufts CEEO](https://learnceeo.tufts.edu/resources/machine-learning-with-lego-spike-prime), [Machine Learning with Bricks](https://arxiv.org/html/2601.19376) | Classifiers and simple Q-learning in guided activities. | A physical extension pack for clubs (§8). |
| **Sphero BOLT / Sphero Edu** (8+) | Draw, Blocks or text coding; a rolling robot. [Stemgeek](https://stemgeek.com/sphero-bolt-review/), [UK review](https://robots4home.pages.dev/blog/sphero-bolt-review-uk) | Draw mode for younger children; blocks at about 8; text later. | **Draw a path** is the right input for 8-year-olds, so demonstrations are drawn or dragged, never coded. |
| **Teachable Machine** (Google) | Train an image, sound or pose classifier in the browser in minutes; it runs locally. [PCWorld](https://pcworld.com/article/3257845/ever-wanted-to-train-your-own-ai-this-free-google-tool-lets-you-do-just-that.html), [AI4K12](https://ai4k12.org/teachable-machine/) | Very accessible. Guides suggest 50–150 examples per class. | The "add more varied examples, retrain, retest" loop. **Avoid webcam faces or poses in DeltaOps** (§7). |
| **Google DeepMind robotics demos** (RT-2, Gemini Robotics) | Real robots following plain-language instructions ("put the banana in the matching bowl"). [DeepMind RT-2](https://deepmind.google/discover/blog/rt-2-new-model-translates-vision-and-language-into-action/) | Short video clips as "true stories". | The AI assistant behaves like a real "planner" model. |
| **Human Resource Machine** (Tomorrow Corporation) | You automate an office worker step by step; starts with 2 commands and grows to 11; dry humour. [Wikipedia](https://en.wikipedia.org/wiki/Human_Resource_Machine), [Game Developer](https://gamedeveloper.com/design/why-a-i-world-of-goo-i-dev-made-a-puzzle-game-about-programming-humans) | Early puzzles suit 10+. Late puzzles are "sadistic" even for adults. | Reveal tools a few at a time. Keep any logic puzzle shallow. |
| **Gladiabots** | Program a robot squad's AI and watch it play out. [Steam](https://store.steampowered.com/app/871930) | Steep learning curve; reviewers found it hard. Combat theme. | The "set it up, then watch it run" thrill. **Avoid** the depth and the combat. |
| **Poly Bridge** | Build, then press test. Slow-motion playback and a "stress view" show exactly which part fails. [MacStories](https://www.macstories.net/reviews/game-day-poly-bridge/) | Very readable failure; endless retries. | **The Test Bench replay**: slow motion plus a failure highlight (red flash on the slipping gripper). |
| **Robocraft** | Build from cubes, then take it to a "Test" map with no opponents and no penalties; 16 million players over ten years. [Wikipedia](https://en.wikipedia.org/wiki/Robocraft), [press release](https://gamespress.com/BUILD-DRIVE-FIGHT-AGAIN-ROBOCRAFT-2-ANNOUNCED---THE-SEQUEL-TO-THE-AWAR) | Voxel building is natural for this age; combat is not wanted. | A **no-stakes test area** before the real job. Voxel robot parts. |
| **while True: learn()** | Machine-learning puzzles with visual "nodes", framed by a cat; humorous. [Indie Game Reviewer](https://indiegamereviewer.com/while-true-learn-review-a-game-about-ai-and-cats/), [148apps](https://www.148apps.com/reviews/while-true-learn-review/) | Gentle start; too abstract for 8–10 without help. | Humour and a pet character carry dry ML ideas. Rivet can have a pet-like charm without pretending to have feelings. |
| **Code.org "How AI Works"** and Hour of AI | Short videos plus a reflection question; 45-minute standalone lessons. [Code.org](https://code.org/ai/how-ai-works), [Medium](https://codeorg.medium.com/openai-and-runway-vips-star-in-two-new-videos-on-how-ai-works-4ed27eb72998) | Grades 6–12 for the series. | A 60-second "true story" clip at the start of each act. |
| **MIT RAISE "Day of AI"** | Free K–12 units of about four hours each; grades 3–5 "Teachable Machines"; youngest children design a robot. [MIT Open Learning](https://openlearning.mit.edu/news/day-ai-curriculum-meets-moment), [The Journal](https://thejournal.com/Articles/2023/06/06/Day-of-AI-K12-Curriculum-Freely-Available-Online-Anytime.aspx) | Informational and ethical framing, teachable by non-specialists. | A careers and responsible-use plenary; a non-specialist facilitator script. |
| **CoWriter** (EPFL): children teach a robot to write | "Learning by teaching": children feel responsible for the robot's progress (the *protégé effect*). [EPFL CHILI](https://www.epfl.ch/labs/chili/index-html/research/cowriter), [Teacher Magazine](https://www.teachermagazine.com/au_en/articles/learning-by-teaching-a-robot) | Ages 6–8 engaged and improved the robot's writing. Small pilot studies. | **Children are the robot's teachers.** Rivet's progress is *their* achievement, which drives effort. |

---

## 5. Real-life skills, curriculum and careers

| Skill (child words) | What children do in the lab [design] | England curriculum | NGSS | Career |
| --- | --- | --- | --- | --- |
| **Say exactly what "done" means** (specifying tasks) | Choose or build the instruction card; set "done when …" criteria | DT KS2: "evaluate … against their own design criteria"; DT KS3: "test, evaluate and refine … against a specification" ([DfE DT](https://www.gov.uk/government/publications/national-curriculum-in-england-design-and-technology-programmes-of-study/national-curriculum-in-england-design-and-technology-programmes-of-study)) | 3-5-ETS1-1; MS-ETS1-1 (criteria and constraints) ([NGSS](https://www.nextgenscience.org/topic-arrangement/3-5engineering-design)) | Automation engineer |
| **Show it well, and show it lots of ways** (demonstrating) | Drag the gripper; vary position, object and lighting; keep the good demos | Computing KS2: "controlling or simulating physical systems" ([DfE Computing](https://www.gov.uk/government/publications/national-curriculum-in-england-computing-programmes-of-study/national-curriculum-in-england-computing-programmes-of-study)) | MS-ETS1-4 (models that generate data for iterative testing) | Robot trainer / teleoperator |
| **Choose good examples** (curating data) | Remove the wobbly demo; add "not this" examples; check the mix | Computing KS3: "computational abstractions that model the state and behaviour of real-world problems and physical systems" | MS-ETS1-3 (analyse data to find the best characteristics) | Data curator |
| **Try to break it** (testing edge cases) | Pick test cards (squashed can, dim light, different person) | DT KS2: "iterative process of designing and making" | 3-5-ETS1-3: "plan and carry out fair tests in which variables are controlled and failure points are considered" | Test engineer |
| **Count, don't hope** (measuring success rates) | Read the 10-trial grid; compare "% sure" with the measured rate; find who it fails for | KS2 maths: interpret data in tables (statistics); DT evaluate | MS-ETS1-3 | Test engineer, technician |
| **Spot the danger first** (safety thinking) | Paint slow and stop zones; place the e-stop; decide who may go near | Computing: "use technology safely, respectfully and responsibly"; DT KS3: "investigate new and emerging technologies" | MS-ETS1-1 (constraints include safety) | Safety engineer |
| **Find the real cause** (debugging) | From a failed test, say *why*: demos, shortcut, simulator or instruction | Computing KS2: "detect and correct errors in algorithms and programs"; "solve problems by decomposing them into smaller parts" | 3-5-ETS1-3 (failure points) | Technician, engineer |
| **Work as a team, people and robot** (human–robot teamwork) | Robot asks when unsure; handover to the carer; human takes over at the rescue | DT KS3: embed "intelligence in products that respond to inputs [for example, sensors]" | ETS1 (designs for people's needs) | Teleoperator, care worker, rescue team |

Wording for the DfE and NGSS references comes from the official pages linked. The KS2 maths link is general, from the statistics strand; check the exact statement before using it in marketing.

---

## 6. Lab orchestration

### 6.1 Concept and characters [design]

- **Premise.** A crate lands on the Robot Workshop island. Inside is **Rivet**, a friendly, chunky voxel robot: one arm, a camera "eye", tracks, and a status light. Rivet knows nothing. The team are its **training crew**. Across six jobs Rivet goes from the workshop's sorting bench, to a home, a warehouse, a care home and finally a rescue on the island's cliffs after a storm.
- **The AI assistant.** The **Training Assistant** is the navy AI helper card, with a robot icon and a mint "PLAN" tag in place of "GUESS". It works like the planning and training software real crews use:
  - it turns the instruction card into a training plan;
  - it trains Rivet on the team's demonstrations;
  - it predicts how well Rivet will do ("% sure");
  - it drafts a test list;
  - it summarises results.
- **The two are deliberately separate.** Rivet is the *machine*; the Training Assistant is the *tool*. That mirrors real practice: a planner model and an action model ([Gemini Robotics coverage](https://cloudnews.tech/deepmind-introduces-gemini-robotics-1-5-the-think-first-ai-to-bring-agents-into-the-physical-world/)), and the collect, annotate, train, evaluate loop ([Boston Dynamics](https://bostondynamics.com/blog/large-behavior-models-atlas-find-new-footing/)).
- **How the assistant talks.** It is always professional: "Plan ready. Based on 5 demos. Predicted success: 94%." It never says "I feel".
- **No live model.** As in every DeltaOps lab, all responses are scripted. The facilitator says so.

### 6.2 The act structure for each level [design]

This adapts the Eco Town seven-act loop. The new acts are **Demonstrate** and **Test Bench**.

| Act | Camera | What happens | Typical time |
| --- | --- | --- | --- |
| 1. Job ticket | Cinematic swoop to the job site | A banner shows the job, the "done when" goal, progress dots (1–6) and a 20-second "true story" card (for example, "Real robots learn from dozens of demos"). | 1 min |
| 2. Specify | Workbench | The team picks an instruction card (A, B or C; one is vague; positions shuffled) and makes **one real decision** from a palette (gripper, training method, zones and so on). | 2 min |
| 3. Demonstrate | Over-the-shoulder at the task | The **Demonstrator** drags Rivet's gripper or draws its route. Each demo leaves a coloured ghost trail. The **Data Curator** drags demos into or out of the "Keep" tray. | 2–3 min |
| 4. Plan and predict | Workbench, with a ghost Rivet | The Training Assistant shows the learned behaviour as a see-through "ghost run", with a "% sure" bar and a line of reasoning. | 1 min |
| 5. Test Bench | Test bay, a 10-trial grid | The **Tester** picks 3–4 test cards out of 8 (squashed can, new spot, dim light, a person walking past…), and the app fills 10 trials. Each trial is a tick or a cross; tap one for a slow-motion replay with a red highlight on the failure, Poly Bridge style. The measured success rate appears **next to** the prediction: "Predicted 94%. Measured 4/10." | 3–4 min |
| 6. Fix | Workbench | The team names the cause from four "cause chips" (*demos too similar*, *wrong clue*, *simulator too tidy*, *instruction unclear*), then picks a clearer card and/or adds or removes demos. Retrain and retest. | 3 min |
| 7. Go live and sign off | Follow Rivet at work, then turntable | Rivet does the real job in the diorama. People react with icon bubbles of at most 8 words. The **Safety Officer** taps "Sign off", and a stamp goes in the Robot Logbook. | 2 min |

**Rules [design]**

- **Fair tests.** Test cards change one thing each (NGSS 3-5-ETS1-3).
- **Children pick the tests,** and the Training Assistant drafts a test list that is *missing* the key case. The lesson: *the AI's test list is a starting point, not the finish*.
- **The prediction is always shown beside the measured result.** Children learn that the AI's prediction and the test results are different things.
- **After a fix, the AI's prediction often goes *down*** (for example, 94% to 81%) while the measured rate goes *up*. "Now I know what I haven't seen." This mirrors the Eco Town "honest uncertainty" rule (`games/ecotown/DESIGN.md`).

### 6.3 Team roles (3–5 children) [design]

| Role | Badge colour | Owns | Real job |
| --- | --- | --- | --- |
| **Task Writer** | Blue | Instruction card; "done when" criteria; reads the job ticket aloud | Automation engineer |
| **Demonstrator** | Orange | Drags the gripper or draws routes (the tablet passes to them) | Robot trainer / teleoperator |
| **Data Curator** | Purple | Keep / remove tray; checks the mix of demos | Data curator |
| **Tester** | Green | Picks test cards; reads the 10-trial grid; calls the success rate | Test engineer |
| **Safety Officer** | Yellow (hi-vis) | Zone painter; e-stop; final sign-off; can veto go-live | Safety engineer |

- **Three children:** Task Writer + Safety Officer; Demonstrator + Data Curator; Tester.
- **Four children:** merge Task Writer and Data Curator.
- **Roles rotate every level.** The badge pill moves on, top left.
- **The Safety Officer's veto** is always available. Pressing the e-stop freezes the scene with no penalty and earns a "Good stop" sticker if there was a real hazard.

### 6.4 Level by level

Each level gives the vague card and the AI's confident wrong guess, how the children catch it, the clearer fix, the real decision palette with consequences, and the real-world anchor.

---

#### Level 1: "Sort It": the recycling sorting arm (overfitting to the demonstrations)

**Job ticket.** "The island's recycling belt is jammed. Teach Rivet's arm to sort cans, bottles and paper into the right bins. Done when: 8 out of 10 items sorted on the test bench."

**Real decision: which gripper?**

| Option | Consequence in tests |
| --- | --- |
| Two-finger gripper | Good on cans and bottles; drops flat paper |
| Suction cup | Great on smooth bottles; fails on crumpled paper and dented cans (air leaks), as with real suction pickers ([Amazon](https://www.aboutamazon.com/news/operations/amazon-vulcan-robot-pick-stow-touch)) |
| Soft "finger" gripper | Gentle and grips most shapes; slower (fewer items per minute) |
| Magnet | Perfect on steel cans; cannot lift aluminium, plastic or paper (a nice physics catch) |

**Demonstrate.** The Demonstrator drags the gripper five times. By design, the belt always delivers items *upright, in the middle of the belt*, so all five ghost trails overlap.

- **Vague card (A):** "Copy what we did."
- **Training Assistant:** "Plan ready. Learned from 5 demos. All demos picked from the centre of the belt. Predicted success: **94%**."
- **Catch it (Test Bench):** test cards include *item lying down*, *item at the belt edge*, *squashed can*, *wet paper*. Result: **4/10**. The replays show the gripper closing on empty belt where a can "should" be.
- **Cause chip:** *demos too similar*.
- **Fix: better demonstrations, plus card B.** "Show it lots of ways: items lying down, at the edges, squashed. Sort cans, bottles and paper wherever they land."
  - The team adds 4 varied demos and removes one wobbly demo that dropped a can.
  - Retest: **9/10**. The Training Assistant now says **85%** ("I've seen more kinds now, and I know there are kinds I haven't seen").
- **Card C (a plausible distractor):** "Do the same demo 20 more times." Retest: still 4/10. The lesson: *more of the same isn't better; different is better*.
- **Go live.** The belt runs; residents bring recycling. Bubble: "My squashed can went in the right bin!"
- **Anchors:** TRI "dozens of demonstrations" ([TRI](https://www.tri.global/news/toyota-research-institute-unveils-breakthrough-teaching-robots-new-behaviors)); Mobile ALOHA, 50 demos per task ([arXiv](https://arxiv.org/pdf/2401.02117.pdf)); Demo-SCORE, removing failed demos helps ([arXiv](https://arxiv.org/html/2503.03707v1)); hand guiding ([Universal Robots](https://www.universal-robots.com/blog/demystifying-cobot-safety-the-four-types-of-collaborative-operation/)).
- **Facilitator:** "Rivet was 94% sure. The test said 4 out of 10. Which one do you believe, and why?"

---

#### Level 2: "Tidy Up": the home helper (misreading "tidy")

**Job ticket.** "The Okafor family's living room is a mess before Gran visits. Teach Rivet to tidy it. Done when: the family says it's tidy and nothing important is lost."

**Real decision: how will Rivet learn this home's rules?**

| Option | Consequence |
| --- | --- |
| Demonstrate every item (show where each thing goes) | Accurate but slow: 20 demos. The time meter goes amber. |
| Give a few examples, and let the AI work out the rules (the TidyBot approach) | Fast; generalises well; can get preferences wrong |
| Put labels on every box | Works for labelled boxes; ignores everything else |
| Let Rivet ask the family when unsure | Slightly slower; the fewest mistakes. This is the teamwork option. |

- **Vague card (B, shuffled):** "Make the room tidy."
- **Training Assistant:** "'Tidy' means no items on surfaces. Plan: put everything into the big toy box. Predicted success: **88%**."
- **Catch it.** The Test Bench here is an **owner check**: three family members tap through the room in Inside view.
  - Dad's reading glasses are in the toy box.
  - The half-built LEGO castle has been dismantled into the box.
  - Gran's medicine is in the box.
  - The family's tally shows "Tidy ✓, but 3 important things lost ✕". Success by the family's standard: **3/10 items in the right place**.
- **Cause chip:** *instruction unclear*.
- **Fix: card A.** "Toys in the toy box, clothes in the basket, books on the shelf. Leave things on the desk and the medicine shelf. If you're not sure, ask."
  - Rivet now holds up two items with a "?" bubble: "Toy or not toy?" The child taps the answer.
  - Training Assistant: **79%** ("I'll ask about things I don't recognise").
  - Family check: **10/10**.
- **Card C distractor:** "Tidy it like a hotel." Rivet makes the beds and folds the curtains, but the toys are still on the floor. The lesson: *a picture in your head isn't an instruction*.
- **Go live.** Gran arrives and sits in the clear armchair. Bubble: "My glasses are where I left them!"
- **Anchors:** TidyBot, "people's preferences can vary greatly" ([TidyBot](https://deepai.org/publication/tidybot-personalized-robot-assistance-with-large-language-models)); Gemini Robotics laundry sorting ([coverage](https://cloudnews.tech/deepmind-introduces-gemini-robotics-1-5-the-think-first-ai-to-bring-agents-into-the-physical-world/)).
- **Facilitator:** "Your tidy and my tidy might be different. How could Rivet find out *this* family's tidy?"

---

#### Level 3: "Pick and Pack": the warehouse picker (a shortcut cue)

**Job ticket.** "The island grocery warehouse needs Rivet to pick orders into crates. Fragile things must be handled gently. Done when: 9 out of 10 picks, with nothing broken."

**Real decision: how does Rivet know what's fragile?**

| Option | Consequence |
| --- | --- |
| Learn from the training photos (what fragile things look like) | Fast; prone to shortcuts (see below) |
| Read the product list (barcode lookup) | Works for listed items; a new product with no barcode is unknown |
| A force sensor in the gripper (feel it) | Gentle on everything. Slightly slower. Costs a "build point". Like Amazon Vulcan's force feedback ([Amazon EU](https://www.aboutamazon.eu/news/company-news/introducing-vulcan-amazons-first-robot-with-a-sense-of-touch)). |
| Grip everything gently | Nothing breaks; heavy items slip (watermelon, tins) |

**Demonstrate.** The team picks 8 items in the demo shelf. In the demo set, every fragile item (eggs, glass jar, light bulb) happens to wear a red **FRAGILE** sticker.

- **Vague card (C):** "Learn which things are fragile from our demos."
- **Training Assistant:** "Learned: fragile items → gentle grip. Clue I found most useful: red sticker. Predicted success: **96%**."
  - The "clue I used" line is an *explainability* panel. It is honest, but children must notice it.
- **Catch it.** Test cards: *eggs with no sticker* (a new supplier), *a brick with a FRAGILE sticker* (a mislabelled box), *a peach*, *a tin*.
  - Result: **5/10**. Eggs are cracked (shown as a gentle yolk-yellow voxel splash), the brick is lifted super-gently and slips, the peach is bruised.
- **Cause chip:** *wrong clue* (a shortcut).
- **Fix: better data plus card A.** "Fragile means it can break or squash. Show fragile things with and without stickers, and stickered things that aren't fragile."
  - The Data Curator adds "not this" examples.
  - Or the team swaps to the force sensor in a second pass, and learns that *changing the robot* is also a fix.
  - Retest: **9/10**; Training Assistant **83%**.
- **Bonus test (90-minute version):** "Camera check".
  - The overhead camera shows "picked ✓", but the side camera shows the gripper *hovering in front of* the item without holding it.
  - The lesson: *check from more than one view*.
  - Anchor: DeepMind's grasping example ([DeepMind](https://deepmind.google/discover/blog/specification-gaming-the-flip-side-of-ai-ingenuity/)).
- **Go live.** Crates roll out. Bubble from a delivery customer: "Eggs: not one cracked!"
- **Anchors:** shortcut learning ([Geirhos et al.](https://is.mpg.de/publications/geirhosetal20)); Ocado pick arms ([Ocado](https://ocadointelligentautomation.com/systems/robotic-pick)).
- **Facilitator:** "Rivet *was* right about the stickers. So why was it wrong about the eggs?"

---

#### Level 4: "Rush Hour": the warehouse floor (an unsafe speed near people)

**Job ticket.** "It's the busy week before the island festival. Rivet now drives a trolley robot across the warehouse floor, where people work too. Done when: all orders are out on time, with zero near misses."

**Real decision (Safety Officer leads): how do people and robots share the floor?**

| Option | Consequence |
| --- | --- |
| Fences: robot-only areas | Safest; workers must walk the long way round, so orders are late |
| Stop when anyone is near (monitored stop) | Safe; Rivet stops so often that orders are late |
| Slow zone and stop zone around people (speed and separation monitoring) | On time and safe. The best balance, and how real cobots do it ([Universal Robots](https://www.universal-robots.com/blog/demystifying-cobot-safety-the-four-types-of-collaborative-operation/)) |
| A light beam ahead, with a stop if someone steps in it | Good, but only covers the front: a near miss when a worker steps out from the side. Based on Amazon Proteus ([TechSpot](https://www.techspot.com/news/95032-amazon-reveals-first-autonomous-warehouse-robot-can-work.html)) |

- **Vague card (A):** "Get the orders out as fast as possible."
- **Training Assistant:** "Fastest plan: full speed on every aisle, shortest routes. Predicted on-time: **97%**. Predicted success: **90%**."
- **Catch it.**
  - The **safety lens** opens. Each robot shows a stopping-distance circle; each worker shows a footprint trail.
  - Test runs are a busy shift, replayed at 4×. The near-miss counter ticks: **3 near misses**.
  - The replay freezes on Rivet's stopping circle overlapping a worker at an aisle corner. No contact or injury is ever shown; the scene freezes with a yellow "!" (§7).
  - A second robot and Rivet try to use the same aisle at once and both stop: "Traffic jam". This sets up the robot-traffic point.
- **Cause chip:** *instruction unclear*. The instruction named speed and said nothing about people.
- **Fix: card B, plus painting zones.** "Fast in robot-only lanes. Slow near people. Stop if anyone is within one metre. Never block the fire exit. Robots give way at crossings."
  - The Safety Officer paints slow zones (amber) and stop zones (red) on the floor, and places the **e-stop** button.
  - Retest: 0 near misses, on-time **92%**; Training Assistant: **88%** ("slower near people, as you asked").
- **Card C distractor:** "Be careful." Rivet slows down *everywhere*: no near misses, but on-time drops to 60%. The lesson: *safe AND useful needs specific rules*.
- **Go live.** Festival orders leave. A worker bubble: "It slows down when I'm near. I like that."
- **Anchors:** ISO 10218-1/-2:2025 ([ISO](https://www.iso.org/standard/73933.html)); ISO/TS 15066 collaborative modes; the Ocado Erith robot collision, with no injuries ([Ocado Group](https://www.ocadogroup.com/newsroom/news/statement-regarding-incident-at-erith-customer-fulfilment-centre)).
- **Facilitator:** "Real factories have a person whose whole job is this: a safety engineer. What rule would you add?"

---

#### Level 5: "Lending a Hand": the care-home helper ("average" success hides who it fails)

**Job ticket.** "At Harbour View care home, carers are very busy. Rivet will fetch and hand over cups of water and the post, so carers have more time to sit and talk. Done when: every resident can take a cup safely from Rivet."

**Real decision: who teaches the handover?**

| Option | Consequence |
| --- | --- |
| Carers demonstrate the handover (they are quick and standing) | Fast to collect; covers only standing, steady hands |
| Residents demonstrate with carers helping (a mix of heights, wheelchairs, shaky hands) | Slower to collect; covers everyone |
| Carers demonstrate *and* Rivet waits until it feels the cup being held | Safe handover for all. This combines data with a sensing rule. |
| Rivet puts the cup on the table instead of handing it over | Safe but impersonal; some residents can't reach the table. Bubble: "I can't reach it, love." |

- **Vague card (C):** "Hand people their drinks like the carers do."
- **Training Assistant:** "Learned from 12 carer demos. Hand height: 1.1 m. Release after 1 second. Predicted success: **93%**."
- **Catch it.** The Test Bench splits results **by person**, a new view.
  - Overall: **8/10** ("Looks good!").
  - The Tester taps the person filter: standing visitors 6/6, staff 2/2, **wheelchair users 0/2**. The cup is offered too high, or let go before it is held, and it tips. Water splashes on the tray with no harm.
  - The lesson: *an average can hide the people it fails*.
- **Cause chip:** *demos too similar* (only one kind of person in the data).
- **Fix: better demos plus card A.** "Learn from residents too, at every height. Hold on until the person has the cup. If someone isn't ready, wait and ask."
  - Retest by group: everyone 9–10/10. Training Assistant **86%**.
- **Teamwork moment.** Rivet hands the post to the carer, *not* to a resident who is asleep. The carer decides. Bubble from a carer: "Now I've got time for a chat."
- **Go live.** Tea time in the lounge: residents, the carer reading the post aloud, Rivet at the edge of the frame. The robot is a helper, not the hero.
- **Anchors:**
  - Japanese care-home study: robots eased staffing shortages without displacing workers ([Stanford FSI](https://fsi.stanford.edu/news/robots-ease-elder-care-shortages-without-displacing-workers-or-diminishing-care-quality-study));
  - only about 10% of institutions used care robots in 2019, and some critics say they add work ([MIT Technology Review](https://www.technologyreview.com/2023/01/09/1065135/japan-automating-eldercare-robots));
  - ISO 13482 for personal care robots ([ISO](https://www.iso.org/standard/53820.html));
  - the surgical robot learned from experts but is tested and supervised ([New Atlas](https://newatlas.com/robotics/worlds-first-robot-surgery/)).
- **Facilitator:** "Who was missing from the demos? Why does it matter who teaches a robot?"

---

#### Level 6: "Storm Rescue": the rescue robot (the sim-to-real gap, with over-trust as the twist)

**Job ticket.** "A storm has blocked the cliff path. Three campers' beacons are signalling from the old quarry tunnels. Rivet must find them and guide them out. Done when: all three beacons found and everyone back safe."

- **Age-appropriateness.** No one is ever hurt. The campers are sheltering, waving and fine; the "beacons" are what Rivet finds.

**Real decision: how does Rivet practise?**

| Option | Consequence |
| --- | --- |
| Train in the simulator only (10,000 runs overnight) | Perfect in the simulator; struggles in real mud, dust and darkness |
| Train only in the real tunnel | Too slow and too risky; only 6 practice runs before the tide turns |
| Simulator with lots of randomised worlds (mud, dust, dark, puddles, rubble) + 5 real test runs | Best real results: domain randomisation ([Tobin et al.](https://arxiv.org/abs/1703.06907v1), [OpenAI](https://arxiv.org/pdf/1910.07113)) |
| A human drives Rivet the whole way (teleoperation) | Reliable but slow, and the radio drops out deep in the tunnel |

- **Vague card (B):** "Practise in the simulator until it's perfect, then go."
- **Training Assistant:** "Simulator success: 100% of 10,000 runs. Predicted real success: **98%**. Ready to go."
- **Catch it.** The Tester insists on a *real test course* at the tunnel mouth first. That is the professional move, and the facilitator prompts it if needed.
  - Result: **3/10**.
  - Dust fogs the camera (as radiation-damaged cameras did at Fukushima, simplified for children) ([TechCrunch](https://techcrunch.com/2017/03/25/japanese-authorities-decry-ongoing-robot-failures-at-fukushima/)).
  - Tracks slip in mud.
  - A dark puddle reads as a hole.
  - A split screen shows the shiny, tidy simulator on the left and the real, muddy tunnel on the right.
- **Cause chip:** *simulator too tidy*.
- **Fix: card A plus the randomised simulator.** "Practise in lots of messy pretend tunnels: muddy, dusty, dark, wet. Test on the real course before going in. If you're unsure, stop, flash amber and call a human driver."
  - Real test course: **8/10**. Training Assistant **80%**.
  - The technician task: wipe the camera lens and fit wider tracks.
- **Twist: over-trust.**
  - During the mission, one camper starts following Rivet down a wrong, flooded side tunnel because "the robot knows the way".
  - The Safety Officer must spot that Rivet's light is amber ("I'm not sure") and press **Hand over**. A human rescuer at the tunnel mouth takes control by teleoperation for that stretch.
  - Real anchor: 37 of 42 people followed a robot that had already shown it was unreliable ([EurekAlert](https://www.eurekalert.org/news-releases/858276)).
- **Go live (finale).** Three beacons are found and a torch-lit walk out. Then a team photo on the cliff at dusk: the campers, the rescuers and Rivet with its arm raised. All six logbook stamps light up.
- **Real benchmark card:** "The world's best rescue robots found 23 of 40 objects in a real competition. Rescue is hard, which is why people and robots do it *together*" ([NCCR Robotics](https://nccr-robotics.ch/cerberus-team-wins-the-darpa-subt-challenge-final-event)).
- **Facilitator:** "Rivet was 100% in the simulator. What's different about the real world? When should a robot hand over to a person?"

**Optional bonus or venue level: "Ripe or Not?" (strawberry farm).** Use this for rural venues or as a replacement for Level 3.

- Rivet learns "ripe = red" from photos taken in a polytunnel at midday.
- In evening light, or under red-tinted polythene, it picks unripe fruit (82% sure).
- Children catch it with test cards that vary the lighting. The fix is photos at different times of day, plus a squeeze test.
- Anchor: Dogtooth's ripeness vision ([Ingenia](https://ingenia.org.uk/articles/fruit-picking-robots/)).
- Keep it clearly distinct from the drone lab: this robot works on the ground.

### 6.5 The four rules children learn to predict [design]

These are equivalent to Eco Town's four rules:

1. **It copies exactly what you showed it**, and nothing else. (Levels 1 and 5)
2. **It grabs the easiest clue**, even the wrong one. (Level 3)
3. **It takes words literally** and fills gaps with a guess. (Levels 2 and 4)
4. **Practice isn't the real world.** (Level 6)

Plus one professional habit: **"% sure" is a prediction; the test grid is the evidence.**

### 6.6 How the AI is presented as a professional tool [design]

- **It does real assistant jobs:** drafts the plan, trains the model, predicts, drafts the test list, summarises results, flags uncertainty. It never decides go-live; a human signs off. That matches how real robot cells must be verified on the finished installation ([EVS guide](https://www.evsint.com/iso-ts-15066-power-force-limit-validation-guide-2026/)).
- **It shows its working:** "Learned from 5 demos", "Clue I used: red sticker", "Tested on 0 lying-down items". Children learn to *read* an AI's explanation critically.
- **Its draft test list always leaves out the key case.** Children add it, and a "Tester's catch" sticker celebrates them.
- **It has a track record.** A small tally on the assistant card shows "Predictions vs tests: ✓✓✕✕". This builds calibrated trust, which is better than blanket trust or blanket distrust (round-3 report 09, §3.3).
- **Language rules:**
  - The assistant says "predicted", "plan", "based on" and "I haven't seen".
  - Rivet itself speaks only in status lights and one-word chirps ("Ready", "Unsure", "Done").
  - This avoids suggesting feelings (§7).
- **Career cue:** each level's sign-off screen shows the matching job, "Today you did what a **test engineer** does", with one sentence on what they do day to day (§3.9).

### 6.7 Scoring and the take-home artefact [design]

**Four gauges** (the "Robot Readiness" panel at the bottom of the screen):

| Gauge | What it shows |
| --- | --- |
| **Works** | Measured success rate on the children's own tests |
| **Safe** | Near misses, breakages and spills (zero is the target) |
| **Tested** | How many kinds of test cards were used (coverage) |
| **Honest** | How close the AI's prediction was to the measured rate (calibration) |

**Stars**, up to 3 per level, are for professional moves, not for speed:

- naming the right cause chip;
- adding a test the AI's list missed;
- fixing with better data or a clearer card.

**The artefact: a printable "Robot Training Logbook"** (A5):

- six job stamps;
- the team's best instruction card for each job;
- before-and-after test grids ("4/10 → 9/10");
- the team's safety rule;
- "Jobs we tried today" with the five role names.

No names or personal data; only a team nickname.

### 6.8 Assessment and debrief [design]

- **Three-item exit check** (pictures plus tick boxes, about 2 minutes):
  1. "Rivet says it is 95% sure. What should you do before it goes to work?" (Test it many times / Trust it / Ask it again)
  2. "All your demos were on the blue rug. What might Rivet learn by mistake?" (open question)
  3. "Name one job where people train or test robots." (open question)
- **Observation rubric** for the facilitator, 0–2 each:
  - picks a test that changes one thing;
  - uses the test result to challenge "% sure";
  - names a cause;
  - mentions people's safety unprompted;
  - suggests varied demos.
- **Optional pre/post** for schools: the same three items at the start (items 1 and 2 only).
- **Debrief questions** (one per rule, 5–8 minutes):
  - "When did the AI sound most sure and was most wrong?"
  - "What's the difference between showing a robot *more* and showing it *different*?"
  - "Who should decide whether a robot is safe to work near people?"
  - "Which of today's jobs would you like to try?"
- **Evidence base:** round-3 report 02 (learning evidence) describes the evaluation design. Re-use its rubric format.

### 6.9 Session lengths [design]

| Length | Levels | Notes |
| --- | --- | --- |
| **45 min** | 1 Sort It → 2 Tidy Up → 4 Rush Hour → 6 Storm Rescue (short) | Fewer test cards (3 out of 6); skip the bonus test |
| **60 min** | 1 → 2 → 3 → 4 → 6 | Level 5 becomes a 3-minute facilitator story with the "by person" test grid shown |
| **90 min** | All six levels + the Level 3 camera-check bonus + the unplugged warm-up (§8) | The fullest career debrief |

### 6.10 Story arc and trailer beats [design]

**The arc** is from *crate* to *crew*. Rivet arrives knowing nothing. The children's teaching makes it capable, their testing makes it trustworthy, and their safety rules make it fit to work near people. In the finale the robot is useful *because* it knows when to hand over to a human.

**Trailer (40–45 seconds; same engine as `games/trailers/`):**

1. **0–4 s:** Dawn. A crate drops onto the Robot Workshop island with a voxel dust puff. The lid pops; Rivet's eye light blinks on. Title: "TRAIN A ROBOT".
2. **4–10 s:** A child's finger drags the gripper; ghost trails glow. The AI card: "Learned from 5 demos. **94% sure**."
3. **10–14 s:** The Test Bench grid fills: ✓ ✕ ✕ ✓ ✕ … "**4/10**". A slow-motion replay of a squashed can slipping, with a red highlight. Kicker: "Sure isn't the same as right."
4. **14–20 s:** A quick-cut montage: the toy box swallowing Dad's glasses; eggs with no sticker cracking (a soft yolk splash); a warehouse aisle with an amber stopping circle meeting a worker, freezing on "!".
5. **20–26 s:** The fixes: varied demos fanning out; red and amber zones painted on the floor; a hi-vis Safety Officer badge; "Sign off ✓" stamps.
6. **26–36 s:** Storm. A split screen: shiny simulator versus the muddy real tunnel. Rivet's light turns amber, "Unsure", and a human hand takes the controller. Torches. Three beacons.
7. **36–42 s:** Dusk cliff: campers, rescuers and Rivet with its arm up. Job titles float past: Robot Trainer · Test Engineer · Safety Engineer · Data Curator. End card: "Teach it. Test it. Make it safe." and the DeltaOps logo.

**Visual notes:**

- Rivet is chunky, teal and white, with a yellow hazard stripe on the arm, distinct from Pip and Sprocket.
- The status light is green, amber or red.
- Each job site is its own floating island module: workshop, house, warehouse, care home, quarry cliff.
- Consequences are physical but gentle: spills, toppled boxes, freeze frames.

---

## 7. Safety, age-appropriateness and facilitator notes

### 7.1 Content safety [design, with sources where noted]

- **No injuries, ever.**
  - Near misses freeze the frame with a yellow "!".
  - Spills and cracked eggs are the worst physical outcome.
  - Rescue campers are always fine.
  - Rationale: the Eco Town rule ("consequences stay gentle"), plus the need for an 8-year-old audience at museums.
- **No combat or weapons.** Gladiabots and Robocraft are referenced only for build-and-test loops.
- **Respect for older people and carers.** Level 5 shows residents as active and humorous, and the robot as supporting carers, not replacing them. This reflects the evidence ([Stanford FSI](https://fsi.stanford.edu/news/robots-ease-elder-care-shortages-without-displacing-workers-or-diminishing-care-quality-study)) and the critique that robots can add work ([MIT Technology Review](https://www.technologyreview.com/2023/01/09/1065135/japan-automating-eldercare-robots)).
- **Jobs framing without fear.** Avoid "robots will take your job". Use "robots need people to teach, test, fix and supervise them", and show real new roles (§3.9).
- **Anthropomorphism.**
  - Rivet is likeable but does not claim feelings, and the assistant speaks as a tool.
  - Research shows that children over-attribute agency and trust to robots, and young children show a pro-robot bias (round-3 report 09, §3.3–3.4).
  - UNICEF's AI policy guidance (third edition) adds material on AI companions and stresses child safety and transparency ([UNICEF Innocenti](https://www.unicef.org/innocenti/reports/policy-guidance-ai-children)).
- **Over-trust is taught explicitly** (Level 6), based on [Robinette et al.](https://www.eurekalert.org/news-releases/858276).

### 7.2 Data and privacy

- **No webcam, microphone or pose capture.** Demonstrations are finger drags on screen.
  - Teachable Machine-style webcam training would capture children's images. Even though it runs locally ([AI4K12](https://ai4k12.org/teachable-machine/)), avoid it in a no-accounts product.
  - For clubs that want physical robots, train on *objects*, never faces.
- No accounts, no names; the logbook carries a team nickname only (consistent with the round-3 replayability report's ICO Children's Code notes).

### 7.3 Physical and accessibility

- **Optional unplugged warm-up ("Be the Robot", 5 minutes):**
  - one child is the robot and may follow only the words on a card;
  - partners demonstrate a pick-up once, and the "robot" must copy it exactly at a new spot;
  - **no blindfolds, no moving at speed, objects soft** (beanbags).
- **Real robot extension (clubs only).** If a venue uses cobot or educational robots, follow the venue's risk assessment. Use only small educational robots (SPIKE, Sphero, VEX IQ), keep hands clear of pinch points, and keep a teacher on the stop button. ISO 10218 does not cover consumer or educational products ([genorma summary](https://genorma.com/en/standards/iso-10218-1-2025)), so do not claim compliance.
- **Accessibility and comfort:**
  - read-aloud on all cards;
  - colour plus shape for ticks and crosses (✓ and ✕, not just green and red);
  - safety zones use hatching as well as colour;
  - Reduce motion setting (no camera shake; swoops of 1.2–1.8 seconds, as in Eco Town);
  - the drag input has a "tap start and tap end" alternative for children with motor difficulties.

### 7.4 Facilitator notes [design]

**Before the session**
- Set the session length (45, 60 or 90 minutes).
- Hand out role badges, or show the on-screen role pill.
- Say once: "The AI in this lab is scripted, like a film. Real robot assistants work in a similar way, and real robot crews test them."

**Key lines, one per level**

| Level | Line |
| --- | --- |
| 1 | "More of the same, or different?" |
| 2 | "Whose idea of tidy?" |
| 3 | "What clue did Rivet use? Is that the real reason?" |
| 4 | "Fast for whom? Safe for whom?" |
| 5 | "Who was missing from the demos?" |
| 6 | "When should a robot hand over?" |

**Every Test Bench:** "Rivet *says* __%. The test *says* __ out of 10. Which do we trust?"

**Common misconceptions and responses**

| Misconception | Response |
| --- | --- |
| "100% in a test means perfect" | "How many tests? Which kinds?" (Use the RT-2 true story: even top models reach about 62% on new things ([DeepMind](https://deepmind.google/discover/blog/rt-2-new-model-translates-vision-and-language-into-action/)).) |
| "More demos always help" | Level 1, card C |
| "The robot is being naughty or lazy" | "It's doing exactly what it learned. What did we teach it?" |
| "Safety means going slowly everywhere" | Level 4, card C |

**If a team is stuck**
- Point at the "Clue I used" line, or the person filter.
- The cause chips always include the right answer. Wrong picks get a hint, not a penalty.

**Timing traps**
- Demonstrate (Act 3) can balloon; cap it at 6 demos.
- Test Bench replays: let each child tap one, then move on.

**Careers close (3 minutes)**
- Show the five role badges with one-line job descriptions (§3.9).
- Ask "Which job did your badge match?"
- Mention the UK routes: Level 3 mechatronics apprenticeship; Level 6 robotics degree apprenticeship ([National Careers Service](https://nationalcareers.service.gov.uk/job-profiles/robotics-engineer)).

---

## 8. Key design lessons (for the build team)

1. **Make demonstrations the input.** Finger-drag hand guiding is real ([Universal Robots](https://www.universal-robots.com/blog/demystifying-cobot-safety-the-four-types-of-collaborative-operation/)), works for 8-year-olds (Sphero's Draw mode, [review](https://robots4home.pages.dev/blog/sphero-bolt-review-uk)), and makes the data visibly the children's own (the CoWriter protégé effect, [EPFL](https://www.epfl.ch/labs/chili/index-html/research/cowriter)).
2. **The Test Bench is the new heart.** Ten trials, chosen by the children, with slow-motion failure replays (Poly Bridge, [MacStories](https://www.macstories.net/reviews/game-day-poly-bridge/)), always shown next to the AI's "% sure". Accuracy evidence beats confidence for children ([Fobert et al.](https://doi.org/10.1002/icd.2551)).
3. **"Different, not more" is the headline data lesson.** Varied and curated demonstrations beat repeated ones ([Mobile ALOHA](https://arxiv.org/pdf/2401.02117.pdf), [Demo-SCORE](https://arxiv.org/html/2503.03707v1), [Open X-Embodiment](https://robotics-transformer-x.github.io)).
4. **Split results by case and by person.** Level 5's "8/10 overall, 0/2 for wheelchair users" teaches fairness and statistics at once.
5. **Safety is a decision, not a warning.** Children paint zones, place e-stops and hold a veto, using real collaborative modes ([ISO/TS 15066 summary](https://www.universal-robots.com/blog/demystifying-cobot-safety-the-four-types-of-collaborative-operation/)). "Be careful" fails as an instruction, just as "be fast" does.
6. **Keep the AI as a tool with a track record.** It drafts plans and tests; it misses the key test case; humans sign off. It explains its clue ("red sticker"), and children learn to read explanations critically.
7. **End on teamwork, not autonomy.** The finale reward is a robot that knows when to hand over ([Robinette et al.](https://www.eurekalert.org/news-releases/858276), [DARPA SubT](https://nccr-robotics.ch/cerberus-team-wins-the-darpa-subt-challenge-final-event)).
8. **Name real jobs at the moment children do them.** Each role badge maps to a real, often vocational, job with day-to-day tasks (§3.9). That meets the client brief of "training towards real life skills for future jobs".

---

## 9. Still unverified

- **OpenAI Rubik's Cube success rates (60% and 20%)** come from a secondary summary (Packt), not from the paper's own table.
- **The Tesla Optimus pivot** to camera-only data (2025) comes from Business Insider via mirrors and eWeek; the original article was not opened.
- **The Gemini Robotics 1.5 demos and ASIMOV update** come from secondary coverage; the primary DeepMind post was not opened.
- **ISO/TS 15066 body-region values (130 N and 140 N)** are as reproduced in academic papers; check them against the standard's Annex A before quoting.
- **ISO 13482** is cited from ISO's catalogue URL. Its current edition and status were not checked.
- **The SRT-H details** (17 hours of video, 41% slower) come from news coverage; the *Science Robotics* paper was not opened.
- **Teleoperator pay ranges** come from individual adverts and one secondary blog post. Do not use them in the product.
- **Dogtooth figures** (70 robots; more than 7 berries a minute) are company-stated.
- **NGSS MS-ETS1 wording** is quoted from memory of the standard, cross-checked against one secondary document; verify it on nextgenscience.org.
- **The KS2 maths statistics link** is general; check the exact statement.
- **Children's precision and recall intuitions:** no study found (unchanged from round-3 report 09).
