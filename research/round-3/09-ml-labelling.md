# 09 — Children training and labelling ML data: precedents, research, Robo-Taxi Island and three venue perception labs (round 3)

Prepared for DeltaOps Learning (browser-based, staff-facilitated voxel "AI labs" for ages 7–13). Date: 4 November 2026.

**How to read this.**
- Every factual claim has a URL next to it.
- **[design]** marks a DeltaOps design proposal or my own inference. It is not a finding.
- **[est.]** marks an estimate that I could not source.
- Main source: the Exa connector (web search, page fetch and three `agent_run` research runs at "medium" effort). I did not use WebSearch. I downloaded one paper (Dwivedi et al. 2021) as a PDF to check its quotes word for word.

---

## Changes from round 2

**Corrected**
- **Hour of Code 2019 scale.** Round 2 said "more than 53 million participations", taken from a search snippet. Code.org's own 2019 annual report says "In December alone, students tried the Hour of Code almost 50 million times". It also names AI for Oceans as the first machine-learning Hour of Code activity. There is still no figure for AI for Oceans on its own. https://contentful-assets.code.org/90t6bu6vlf76/6zq0ckzgWOYpYqUKqPStJB/c5d9908bc90c708fe1ba2ae46fd4338b/annual-report-2019.pdf
- **Dwivedi et al. 2021 sample.** Round 2 said the sessions "ran in early 2018". The paper reports two groups: February 2018 (8 children) and October 2019 (6 children), 14 in total, aged 7–13, with 12 adult co-designers. I checked the quotes used in round 2 against the PDF ("It reaches 60 the more I put my head up"; "chooses one inanimate object for it to focus on"; children training until they saw 100%). They are correct. https://arxiv.org/abs/2109.11434
- **AI for Oceans session length.** The 2025 Course F (K–5) lesson plan sets it at **40 minutes**, not 45–60. https://lesson-plans.code.org/coursef-2025/20250904181039/teacher-lesson-plans/AI-For-Oceans.pdf

**Verified (round-2 [unverified] or gap items)**
- **AI4Mars terrain classes:** soil, bedrock, sand and big rock. The project collected about 326K labels on about 35K images, with each image labelled by about 10 people. https://openaccess.thecvf.com/content/CVPR2021W/AI4Space/papers/Swan_AI4MARS_A_Dataset_for_Terrain-Aware_Autonomous_Driving_on_Mars_CVPRW_2021_paper.pdf
- **COCO figures:** 91 object types "easily recognizable by a 4 year old", 2.5M labelled instances in 328K images. https://arxiv.org/abs/1405.0312
- **ImageNet labellers:** "49k Workers from 167 Countries" (ImageNet's own slides). https://www.image-net.org/static_files/files/imagenet_ilsvrc2017_v1.0.pdf
- **Experience AI "Bias in, bias out":** the public lesson pages and the published lesson-design paper confirm an apples-vs-tomatoes classifier built in Machine Learning for Kids. The Raspberry Pi Foundation's public "Apple vs tomato" project uses a red apple, a green apple and a red tomato. https://experience-ai.org/en/units/foundations-of-ai-11-14/lessons/3, https://computingeducationresearch.org/wp-content/uploads/2024/11/Experience_AI_lesson_design_paper__ISSEP_-9.pdf, https://projects.raspberrypi.org/en/projects/apple-vs-tomato
- **Zooniverse milestone:** 1 billion classifications on 29 June 2026, from 3+ million volunteers in 160 countries. https://blog.zooniverse.org/2026/06/29/one-billion-classifications/
- **Quick, Draw!:** 50M drawings, 345 categories, more than 15M players. https://quickdraw.withgoogle.com/data, https://github.com/googlecreativelab/quickdraw-dataset
- **Machine Learning for Kids:** no self-driving worksheet. The closest is "Catching the carpool cheats", where children label pictures of cars with passengers. https://dalelane.co.uk/blog/?p=4953
- **Cozmo:** face enrolment exists in the Cozmo SDK. It is not shown to be part of Code Lab. https://cozmosdk.anki.bot/generated/cozmo.faces.html
- **Barbican "AI: More than Human":** "over 88,000 visitors" (partner studio). The Barbican's own review gives no separate figure. https://www.universaleverything.com/exhibitions/ai-more-than-human
- **Hour of AI (Nov 2025):** 100+ activities, and AI for Oceans is in the catalogue. https://code.org/en-US/hour-of-ai, https://codeorg.medium.com/hour-of-ai-new-activities-are-here-805a70100508

**Gaps closed**
- **CS Unplugged:** I found no ML-classification activity. Its "Artificial Intelligence" community activity is Paul Curzon's rule-based "Intelligent Piece of Paper" (noughts and crosses). The German *AI Unplugged* booklet does contain classification. https://classic.csunplugged.org/activities/community-activities/artificial-intelligence/, https://www.aiunplugged.org/english.pdf
- **V&A:** AI events exist, but none is a labelling activity: Design Generator (2022), Voice Matters (2023, ages 12+), and a V&Ai concept for Young V&A shown on an agency portfolio. Details in 2.5.
- **Wayve:** I found no child-facing material. A Wayve engineer gave a "Teaching Cars to Drive Themselves" forum for Teens in AI (June 2026). Wayve joined PAVE UK in May 2026. Details in 2.2.
- **Toyota:** child-facing programmes exist in Japan (grades 4–6) and the US (middle and high school). Details in 2.2.

**New in round 3**
- Research on children's trust in *confident* informants (Fobert 2024; Birch 2019). It strengthens the "confidently wrong" rule.
- Research on children and autonomous vehicles.
- Museum labelling exhibits: DataBites, Virtually Human Experience, Mission KI.
- UK camera-trap programmes: MammalWeb schools, ZSL Instant Wild.
- Museum auto-tagging failures and legacy-label reviews.
- Mars autonomy facts (Enhanced AutoNav, AEGIS, Spirit at Troy, signal delay).

**Deliverables improved**
- **Robo-Taxi Island** now has:
  - a per-stage timing budget;
  - a card-by-card outcome table;
  - an explicit "confidence script" so the "% sure" never implies a live model;
  - shuffled vague-card positions;
  - accessibility notes;
  - a scored star rule.
- **The three alternative labs** are rebuilt around verified real-world facts.

---

## 1. Summary

1. **The core loop still holds.** Every successful precedent follows it:
   - the child labels a few examples;
   - the model guesses on new ones with a confidence number;
   - the effect shows in a world;
   - someone else tries to break it;
   - the group talks about why.

   It appears in AI for Oceans, Teachable Machine, Quick, Draw!, Cognimates, The Tech's *Machine Learning Unplugged*, and now museum exhibits such as DataBites and the Virtually Human Experience (2.1, 2.5).
2. **Confidence displays are powerful and risky, for two reasons:**
   - Children aged 7–13 use confidence scores as their main sign that a model is "confused", and some train until they see 100% (Dwivedi 2021). https://arxiv.org/abs/2109.11434
   - Separate developmental work shows school-age children **presume confident informants are accurate until shown otherwise**, and 7–8-year-olds are relatively insensitive to whether an informant's confidence is calibrated. https://doi.org/10.1002/icd.2551, https://pmc.ncbi.nlm.nih.gov/articles/PMC6984727/

   **[design]** DeltaOps' scripted "% sure" must therefore show *accuracy contradicting confidence* early and often.
3. **"Train it wrong on purpose" is official practice.** Code.org's 2025 lesson plan says students "can also learn by purposefully training their model incorrectly" and that this "should be encouraged!". https://lesson-plans.code.org/coursef-2025/20250904181039/teacher-lesson-plans/AI-For-Oceans.pdf I still found no study that *measures* children gaming labels.
4. **Real perception systems already run the "% sure → ask a human" rule** that Robo-Taxi Island borrows:
   - Snapshot Serengeti: https://arxiv.org/abs/1703.05830
   - Wildlife Insights' 65% and 95% thresholds: https://www.wildlifeinsights.org/blog/wildlife-insights-sharpens-its-vision-updated-ai-model
   - MammalWeb, which ranks sequences for volunteers by machine certainty: https://www.the-ies.org/resources/lens-wild-innovations-wildlife-monitoring-machine-learning
   - Mars rovers driving themselves with AutoNav: https://www.jpl.nasa.gov/news/nasas-perseverance-mars-rover-ready-to-roll-for-miles-in-years-ahead/
5. **Deliverables:** Robo-Taxi Island (section 7), and three perception labs (section 8):
   - Camera Trap Detectives;
   - Museum Mystery Objects;
   - Rover Ground Truth, now built on the verified AI4Mars classes.

---

## 2. Catalogue of precedents

### 2.1 Child-facing training games and activities

**Code.org — AI for Oceans (Dec 2019; in the Hour of AI catalogue since 2025)**
- **Flow:**
  - Children label images "fish / not fish".
  - "A.I." then labels 100 new images and shows those it rates most likely to be fish.
  - Later levels train a chosen word, then "intentionally more subjective" words such as "angry" or "fun".
  - Teachers are told that "two students may choose the same label and get a very different set of results" and that "A.I. will learn with the same biases held by the students".
  - https://lesson-plans.code.org/coursef-2025/20250904181039/teacher-lesson-plans/AI-For-Oceans.pdf
- **How it works underneath** (same lesson plan):
  - Stage 1 images go through a network pre-trained on ImageNet ("over 14 million hand-annotated images").
  - The fish in later levels are generated from components (mouths, tails, eyes, scales, fins). The model learns which components the child links with a label.
  - **[design]** This is close to what DeltaOps can do without a live model: a pre-written mapping from features to outcomes.
- **Timing:** 40 minutes (5 warm-up, 30 activity, 5 wrap-up). The lesson "will not tell students whether they completed the level correctly". Same source.
- **Scale:** almost 50M Hour of Code tries in December 2019; no AI for Oceans–specific count. https://contentful-assets.code.org/90t6bu6vlf76/6zq0ckzgWOYpYqUKqPStJB/c5d9908bc90c708fe1ba2ae46fd4338b/annual-report-2019.pdf
- **Still current:** it is in the Hour of AI catalogue (launched November 2025, 100+ activities). https://code.org/en-US/hour-of-ai

**Google — Quick, Draw! (2016–)**
- **Loop:** draw in 20 seconds while a neural net guesses aloud.
- **Scale:** 50M drawings, 345 categories, more than 15M players. https://quickdraw.withgoogle.com/data, https://github.com/googlecreativelab/quickdraw-dataset
- **UK classroom use:** Experience AI's *Understanding AI (11–14)* Lesson 3 uses Quick, Draw! to teach labelled training data and "how confidence scores are used in ML model predictions". https://experience-ai.org/en-US/units/understanding-ai-11-14

**Google — Teachable Machine (v2, Nov 2019)**
- **What it is:** no-code webcam, sound or pose classes with live confidence bars. https://www.engadget.com/2019/11/07/google-teachable-machine-2/
- **Used in:**
  - UK bias lessons, such as Teach with ICT's "Fooled": train on *only green apples and red tomatoes*, then test with a red apple. https://www.teachwithict.com/fooled.html
  - BirdBrain robots. https://learn.birdbraintechnologies.com/artificial-intelligence/ai-for-all/
  - Ozobot's "Teaching Self-Driving Machines" (stop sign vs traffic light). https://classroom.ozobot.com/wp-content/uploads/2026/07/Teaching-Self-Driving-Cars-Student-Activity-Sheet.ZPSKEUEvQ3uiWkKWJE1iQAbE.pdf
  - Informal-setting studies with children aged 3–13 in Nigeria. https://www.tandfonline.com/doi/full/10.1080/08993408.2023.2175559
  - The AI MyData middle-school curriculum (ages 12–15), which varies sample diversity, background and class balance. https://dl.acm.org/doi/full/10.1145/3702242

**Experience AI (Raspberry Pi Foundation and Google DeepMind; ages 11–14)**
- **"Bias in, bias out" lesson:** learners build an apples-vs-tomatoes classifier in Machine Learning for Kids and "discover that their model is flawed due to the limited data set". It teaches *training vs test data*, *data bias* and *societal bias*. https://experience-ai.org/en/units/foundations-of-ai-11-14/lessons/3, https://experience-ai.org/en/units/understanding-ai/lessons/15
- **Lesson design:** each lesson is one hour. Machine Learning for Kids needs no account. Sub-concepts include "ML confidence" and "ML model card". https://computingeducationresearch.org/wp-content/uploads/2024/11/Experience_AI_lesson_design_paper__ISSEP_-9.pdf
- **Public project version:** the Raspberry Pi project ("Apple vs tomato") needs a red apple, a green apple and a red tomato. It has a step called "A different apple", and images stay in the browser. https://projects.raspberrypi.org/en/projects/apple-vs-tomato
- **Still behind a login:** the exact slide images in the lesson.

**Machine Learning for Kids (Dale Lane)**
- Scratch-integrated projects with worksheets; used by Experience AI (above). https://machinelearningforkids.co.uk/worksheets
- **Closest road-themed project:** "Catching the carpool cheats", where children label car photos by passengers for a traffic-camera game. It has no self-driving project. https://dalelane.co.uk/blog/?p=4953

**Cognimates (Druga & Ko)**
- Children train text and image models, then code with them in Scratch. Study in 3.1.

**The Tech Interactive — "Machine Learning Unplugged" (grades 4–12; 45 min)**
- **Setup:** animal-card sorting by AI "rules". Children notice errors, revise the rules, then meet a new deck that includes species fitting *neither* category.
- **Debrief:** variety of camera angles.
- https://www.thetech.org/media/x5bgn0mj/lesson-machinelearningunplugged.pdf

**AI Unplugged (Lindner & Seegerer, Germany)**
- **"Good-Monkey-Bad-Monkey":** a training/test split on 20 or 40 monkey cards. Teams swap rule sets.
- **Out-of-distribution card:** monkey no. 21 has an unknown mouth shape, "for which no explicit criteria can be derived".
- **Self-driving example:** the booklet's own text says "the self-propelled car recognizes leaves on the road as a dangerous situation and mistakenly slams on the brakes". That is a published child-facing false-alarm example.
- **"#deeplearning":** a three-person "layers" game that cannot recognise a dog because "the net does not know the category 'dog'".
- https://www.aiunplugged.org/english.pdf

**CS Unplugged (University of Canterbury)**
- The classic site lists "Artificial Intelligence" (the Intelligent Piece of Paper), "The Turing Test" and "Harold the Robot". All are about rules or intelligence, not learning from labels. https://classic.csunplugged.org/activities/, https://classic.csunplugged.org/activities/community-activities/artificial-intelligence/
- The new site shows no ML topic. https://www.csunplugged.org/en/
- **Conclusion:** no ML-labelling activity, as far as I checked.

**Code.org Dance Party: AI Edition (2023)**
- Emoji-driven generative effects with no training. It shows only that "pick 3 icons" input works without typing. https://lesson-plans.code.org/dance-ai-2023/fallback/teacher-lesson-plans/Dance-Party-AI-Edition.pdf

**Minecraft Education — AI for Good (2019)**
- Forest-fire prediction. Its support page says parts "may not be completable due to broken code". https://thejournal.com/Articles/2019/11/14/Minecraft-Hour-of-Code-Lesson-Focuses-on-AI.aspx, https://educommunity.minecraft.net/hc/en-us/articles/20672394051348

### 2.2 Self-driving–specific education

| Programme | Age | Core loop | Takeaway |
|---|---|---|---|
| **CU Boulder iSAT Self-Driving Cars** | Middle school (12–15 classes over 3–4 weeks) | micro:bit BitCar: line-following and obstacle avoidance, then AI classification. The unit's framing question: "how does it know to stop for the dog but not for the trash bag?" https://www.colorado.edu/research/ai-institute/our-products/curriculum-units/self-driving-cars, https://www.colorado.edu/research/ai-institute/2024/07/16/isat-curriculum-series-forward-future-self-driving-car-curriculum-unit-middle-school-stem | The canonical edge case for children: stop for an animal, not for rubbish. |
| **Ozobot Teaching Self-Driving Machines** | Upper primary / middle school | Route coding, then a Teachable Machine sign classifier. (link above) | Rules vs learned recognition. |
| **Robolink Zumi** | About 10+ | Pi Zero car with camera; "teach her to stop" at a STOP sign. https://stemfinity.com/collections/artificial-intelligence/products/zumi | Teachable stop sign. |
| **AWS DeepRacer Student** | 16+ | Reward functions and a simulator; more than 320K participants. https://aws.amazon.com/blogs/publicsector/how-two-schools-canada-turkey-competed-aws-deepracer-skill-up-machine-learning | Off-track replays. |
| **Duckietown / Donkey Car** | University / hobbyist | Camera-only town robots; behavioural cloning ("it learns how you drove"). https://duckietown.com, https://www.donkeycar.com | Town-diorama look; data quality. |
| **MIT Moral Machine** | Public | 39.6M decisions, 233 countries and territories, 2M+ people. https://dspace.mit.edu/handle/1721.1/125065 | Reach through binary choices. **[design]** Avoid the trolley framing for 7–13. |
| **Toyota Mirai School "Future Mobility Programming Class"** (Japan) | Grades 4–6 | Teachers bring the class; the toio robot toy stands in for the self-driving e-Palette, teaching sequence, loop and branch. https://www.toyota.co.jp/miraischool/sp/programing.html | Rules-based, not ML. Children solve "townspeople's problems" in a mini-town. |
| **Toyota "Naze Nani Lecture": self-driving programming car** (Japan) | Grades 4–6 | Children change two numbers (turn time, speed) on an ultrasonic-sensor car to beat an S-course time. The deliberate failure point is that "most children set speed to 100" and crash. The series reports more than 36,000 participants overall. https://car.watch.impress.co.jp/docs/topic/special/2146186.html (sponsored article) | A *designed* first failure plus a record sheet. Mirrors DeltaOps' vague card. |
| **Toyota / Discovery Education "Cars of the Future: AI and Automated Vehicles"** (US, 2018) | Middle and high school | Virtual field trip to Toyota Research Institute and Mcity, with an educator guide. https://pressroom.toyota.com/students-invited-to-take-peek-into-the-future-of-mobility/ | Explainer, not hands-on. |
| **Waymo × AAA (2019)** | Primary safety patrols | Facility visit: cars "see all around them and predict". https://waymo.com/blog/2019/09/waymo-teams-up-with-aaa-to-teach-kids/ | "See, then predict." |
| **Wayve** (UK) | Teens | No child-facing resource found. A Wayve lead engineer gave "Teaching Cars to Drive Themselves" at a Teens in AI forum (June 2026). https://www.linkedin.com/posts/teensinai_teensinai-aieducation-selfdrivingcars-activity-7475491808794472448-RmD9 | Possible guest-speaker partner for older groups only. |
| **PAVE UK** (WMG Warwick; founded 2024) | Public | Has reached "more than 25,000 public members" at events including Cheltenham Science Festival. Wayve, Nissan and Uber joined in May 2026. School outreach and educational packs are planned. https://warwick.ac.uk/fac/sci/wmg/news-and-events/news/wayve-nissan-and-uber-join-forces-with-paveuk-to-support-responsible-deployment-of-self-driving-vehicles/, https://pavecampaign.org/new-national-initiative-to-educate-the-public-on-automated-vehicles-avs/ | **[design]** A natural UK partner or reviewer for Robo-Taxi Island's facilitator notes. Contact: PAVEUK@warwick.ac.uk (same sources). |

### 2.3 Robots and toys

- **LEGO SPIKE / Robot Inventor ML extension:** confirmed. https://learnceeo.tufts.edu/resources/machine-learning-with-lego-spike-prime
- **BirdBrain:** confirmed (Teachable Machine). Link above.
- **Cozmo:** the SDK can recognise faces and "assign names to them via an enrollment process". https://cozmosdk.anki.bot/generated/cozmo.faces.html
  - That is enrolment, not a labelling lesson.
  - It is not shown to be in the child-facing Code Lab.
- **Sphero, Kodu:** no ML-training activity found (unchanged from round 2).

### 2.4 Labelling at scale: true stories to tell children

- **reCAPTCHA**
  - Agreement between several people validated words: over 99% accuracy, 440M words. https://www.sciencedaily.com/releases/2008/08/080814154329.htm
  - The claim that the traffic-light grids train Waymo is unverified, and Google has denied it. https://prosopo.io/blog/why-am-i-clicking-traffic-lights/
- **ImageNet**
  - About 14M images, labelled by "49k Workers from 167 Countries" on Amazon Mechanical Turk. https://www.image-net.org/static_files/files/imagenet_ilsvrc2017_v1.0.pdf
- **COCO (2014)**
  - Photos of "91 objects types that would be easily recognizable by a 4 year old"; 2.5M labelled instances in 328K images, built with "extensive crowd worker involvement". https://arxiv.org/abs/1405.0312
  - Images were deliberately *non-iconic* (objects in clutter, not centred). Same source.
  - **[design]** That is a good child-sized point: "photos of a dog in the middle teach less than messy real photos".
- **Zooniverse**
  - 1B classifications, 3M+ volunteers, 160 countries (June 2026). https://blog.zooniverse.org/2026/06/29/one-billion-classifications/
- **Snapshot Serengeti (Norouzzadeh et al.)**
  - 3.2M images, 48 species, more than 93.8% accuracy.
  - Classifying only confident images automated 99.3% of the data at the volunteers' 96.6% accuracy, saving more than 8.4 years of labelling.
  - https://arxiv.org/abs/1703.05830
- **AI4Mars (NASA JPL / Zooniverse, June 2020)**
  - Volunteers drew borders and chose one of four labels. https://www.jpl.nasa.gov/news/nasas-mars-rover-drivers-need-your-help/
  - Classes: sand, soil, bedrock, big rocks, chosen because they are "intuitively understandable by non-experts and highly informative for assessing the traversability". About 326K labels on about 35K images from Curiosity, Opportunity and Spirit; about 10 labellers per image. https://openaccess.thecvf.com/content/CVPR2021W/AI4Space/papers/Swan_AI4MARS_A_Dataset_for_Terrain-Aware_Autonomous_Driving_on_Mars_CVPRW_2021_paper.pdf
  - The expert "gold standard" test set had **3 experts per terrain class** (same paper). The NASA open-data page gives the same 326K, 35K and 10-people figures. https://data.nasa.gov/dataset/ai4mars-a-dataset-for-terrain-aware-autonomous-driving-on-mars
  - The project's results page shows SPOCv1 (about 1,000 labelled images) at 40.85% accuracy vs SPOCv2 (more than 100K labels) at 91.41%. It "still struggles with big rock due to its rarity". https://www.zooniverse.org/projects/hiro-ono/ai4mars/about/results
  - **[design]** This is a ready-made child story: *more examples help, and rare things stay hard*.

### 2.5 Museum, gallery and science-centre exhibits

- **Science Museum London, "Driverless: Who is in control?" (2019–20)**
  - Ethics- and object-led; toured. https://www.ianvisits.co.uk/articles/driverless-who-is-in-control-32122/, https://www.sciencemuseumgroup.org.uk/our-services/touring-exhibitions/driverless
- **Barbican, "AI: More than Human" (16 May–26 Aug 2019)**
  - Over 88,000 visitors (partner-reported). https://www.universaleverything.com/exhibitions/ai-more-than-human
- **Museum of Science Boston, "Exploring AI: Making the Invisible Visible"**
  - Visitors compare datasets to see how data choices create biased outcomes. https://www.mos.org/press/press-releases/Exploring-AI-Making-the-Invisible-Visible-Exhibit-Announcement
- **DataBites (Northwestern / Georgia Tech; Griffin Museum of Science and Industry, Chicago, trial June 2024)** (new)
  - Children build tangible pizzas and sandwiches as labelled examples, then press physical Start, Train and Refresh buttons.
  - Training is covered by a 15-second animation.
  - The results show 40 test images in two columns, each with a confidence score, sorted by confidence.
  - Target: middle-school visitors and families.
  - https://dl.acm.org/doi/fullHtml/10.1145/3635636.3664247, https://hci.northwestern.edu/news-events/articles/2024/creative_interface_research_and_design_studio_museum_of_science_of_industry.html
  - **[design]** DeltaOps can borrow two things: a scripted "training" animation in place of real training, and confidence-sorted results.
- **The Virtually Human Experience (Lawrence Hall of Science and USC ICT; opened Nov 2023, extended to spring 2026; ages 7–12)** (new)
  - Stations include "Teach Me Silly": visitors classify their own silly or serious faces through data collection, model construction, testing and reflection.
  - Each digital station is paired with an unplugged activity.
  - https://ict.usc.edu/wp-content/uploads/2025/02/AI-Behind-Virtual-Humans-One-Sheet-Design.pdf
  - Case studies note the challenge of a "low threshold for initial engagement such that even the youngest visitors can engage". https://par.nsf.gov/biblio/10528574
- **Deutsches Museum Bonn, "Mission KI" (with Ars Electronica Futurelab)** (new)
  - A "Neural Network Training" station.
  - "Comment AI": visitors classify real newspaper-forum comments to train a model.
  - The framing is that "the quality and nature of training data is crucial", and "the focus automatically falls on the integrity and sense of responsibility of the 'trainers'".
  - https://ars.electronica.art/futurelab/en/projects-mission-ki/
- **Deutsches Museum Munich, "Can AI learn to see?" (until 8 Jan 2024)**
  - Computer-vision exhibition for families. https://www.deutsches-museum.de/en/museum-island/programme/event/can-ai-learn-to-see
- **V&A** (gap closed: no labelling activity found)
  - **Design Generator (Sept 2022):** an AI trained on the V&A collection generates new objects from text. https://www.vam.ac.uk/event/YgbjJRV1V5/design-generator
  - **"Voice Matters" (Sept 2023):** visitors "step into the shoes of companies collecting data" with voice devices; ages 12+ with an adult. https://www.vam.ac.uk/event/G8KLwGjW9ND/voice-matters
  - **"V&A object or AI image?" quiz:** on the V&A's Mused site. https://www.vam.ac.uk/mused/random/va-object-or-ai-image-2/
  - **Tellart's machine-learning "Terraform Table":** at *The Future Starts Here* (2018). https://www.tellart.com/projects/designing-planets-with-machine-learning/
  - **"V&Ai" for Young V&A:** described on a designer's portfolio as a children's co-creation installation. The V&A has not confirmed it, and I found no date. https://www.alexisbardini.com/v-ai
- **Museum AI tagging and its errors**: see 8.2.

---

## 3. Research on how children understand ML

### 3.1 Druga & Ko (2021)
- **Who and how:** 52 children aged 7–12, a 4-week after-school study. They trained and coded Cognimates projects. https://par.nsf.gov/servlets/purl/10281504 (DOI 10.1145/3459990.3460712, an IDC '21 DOI; one Exa summary called it CHI, but the DOI prefix is IDC's).
- **Findings:**
  - Children followed a scientific-method cycle.
  - They became more sceptical of what devices can do.
  - They shifted agency "from the devices to the people who program them".
  - Peer debate mattered.
  - The shifts were not universal.
  - Same source.

### 3.2 Dwivedi et al. (VL/HCC 2021), checked against the PDF
- **Who:** 14 children aged 7–13 and 12 adults. Feb 2018 (8 children) and Oct 2019 (6 children). 64% of the children were second-generation immigrants. https://arxiv.org/abs/2109.11434
- **Activity:** children trained Teachable Machine, swapped classifiers to test generalisation, and presented.
- **How they read confidence:**
  - a steady 100% on the right class meant success;
  - flipping between classes meant "confused";
  - 100% on the wrong class meant a mistake.
- **Misreadings:**
  - Children trained "until they registered a confidence level of 100%".
  - One child asked, "It's not 100%, should I do this again then?"
- **Spurious features:** a child said "it chooses one inanimate object for it to focus on".
- **Design advice:**
  - make confidence visible;
  - let children exchange models;
  - make data quick to inspect;
  - remember that image tasks assume sighted children.

### 3.3 Children's trust in confidence (new)
- **Fobert et al. 2024** (*Infant and Child Development*; children aged 3–8, Studies of 84 and 87): school-age children expected confident informants to be right and hesitant ones wrong. *Accuracy information overrode confidence* when the two conflicted. https://doi.org/10.1002/icd.2551
- **Birch, Severson & Baimel 2019** (*PLOS ONE*; 662 children aged 3–12): children can learn from an informant's history of calibration, but even 7–8-year-olds were "relatively insensitive" to whether hesitant informants were well calibrated. https://pmc.ncbi.nlm.nih.gov/articles/PMC6984727/
- **Robots as informants (younger children):**
  - Brink & Wellman 2020: 3-year-olds selectively trusted the accurate robot when it seemed to have agency. https://doi.org/10.1037/dev0000884
  - Stower et al. 2024: 111 children aged 3–6 showed a pro-robot bias when two agents were equally reliable. https://doi.org/10.1016/j.chb.2024.108229
- **[design] Implications:**
  1. Show Pip's *track record* (a tally of right and wrong), not only its current %. Accuracy evidence beats confidence for children.
  2. Make the first high-% error happen by stage 1–2, before trust settles.
  3. Facilitators should say "Pip *says* 94%. Was it right?" every time.

### 3.4 Misconceptions
- Finnish 5th–6th graders hold anthropomorphic, "AI as an entity" ideas. https://jyx.jyu.fi/handle/123456789/93279
- Only 34% of children describe ML unprompted as "teaching machines". https://arxiv.org/pdf/2404.00728.pdf
- Ninth-graders moved from idealising AI towards critical understanding after Teachable Machine and unplugged work. https://ceur-ws.org/Vol-4268/AILIT-short5.pdf

### 3.5 False alarms vs misses (precision and recall)
- **Still no study** of children's precision/recall *intuitions*.
- **Closest sources:**
  - A K–12 assessment rubric (Gresse von Wangenheim et al. 2022) includes testing on new images and interpreting a confusion matrix. Experts advised separating "interpreting the model" from "spotting classification errors". https://doi.org/10.15388/infedu.2022.18
  - AI4K12 Big Idea 3 recommends comparing positive and negative examples and investigating imbalanced data. https://ai4k12.org/wp-content/uploads/2021/01/AI4K12-Big-Idea-3-Progression-Chart-Working-Draft-of-Big-Idea-3-v.11.19.2020.pdf
  - Published child-facing examples of the two error types:
    - CU Boulder: dog vs trash bag;
    - AI Unplugged: leaves causing needless braking;
    - links in 2.1 and 2.2.
- **[design]** Name the errors in child words, **"False alarm"** and **"Missed it"**, and make their costs uneven and visible (section 7).

### 3.6 Children and autonomous vehicles (new)
- **Charisi et al. 2018:** children wanted to know the vehicle was autonomous, and read its signals through familiar traffic-sign knowledge. https://doi.org/10.1145/3078072.3084300
- **Hameed et al. 2023:** 10 children aged 7–15 preferred *text* displays of a car's intent, and were more accepting than adults of using them to decide when to cross. The sample was small. https://dl.acm.org/doi/fullHtml/10.1145/3594806.3594827
- **Jun et al. 2024:** for children aged 10–12, how certain or uncertain an AV's message sounded strongly affected trust and perceived safety. https://doi.org/10.15187/adr.2024.02.37.1.7
- **Stange et al. 2025:** 17 children aged 7–14 transferred car knowledge to AVs, and used features first time when icons had written keywords. https://doi.org/10.1016/j.trip.2025.101447
- **[design] Implications:**
  - Pip should *show* its intent in words plus an icon ("Stopping", "Going").
  - The uncertainty wording matters as much as the number.

### 3.7 Using real crashes (unchanged; sources re-cited)
- **Uber Tempe 2018:** the classification flipped between vehicle, bicycle and "other", and the system had no pedestrian class outside crosswalks. https://spectrum.ieee.org/ntsb-investigation-into-deadly-uber-selfdriving-car-crash-reveals-lax-attitude-toward-safety, https://www.nbcboston.com/news/business/self-driving-uber-car-that-hit-killed-woman-did-not-recognize-pedestrians-jaywalk/1977891/
- **Sticker attack:** black and white stickers on a real stop sign caused targeted misclassification in 84.8% of video frames from a moving vehicle. https://arxiv.org/abs/1707.08945
- **Skin tone and pedestrian detection:** Wilson, Hoffman & Morgenstern (2019) found poorer pedestrian detection for Fitzpatrick skin types 4–6 in the BDD100K data, "not merely" explained by time of day or occlusion. https://arxiv.org/abs/1902.11097 A UK lesson already uses this paper with secondary pupils. https://www.teachwithict.com/fooled.html
  - **[design]** Facilitator note only, 11+, framed as "who is missing from the pictures".
- **Trauma-informed principles** (SAMHSA, via): https://journalhosting.ucalgary.ca/index.php/jet/article/view/78633
- **[design] Rule:**
  - fictional, injury-free analogues on screen;
  - real cases only in optional facilitator notes for ages 11+, with no names and no deaths.

---

## 4. Success patterns

| # | Pattern | Strongest evidence |
|---|---|---|
| P1 | The child's labels visibly drive behaviour | AI for Oceans; DataBites; Teachable Machine |
| P2 | Live confidence **plus a visible track record** | Dwivedi 2021; Fobert 2024; DataBites' confidence-sorted results |
| P3 | Objective → ambiguous → subjective labels | AI for Oceans 2025 lesson plan |
| P4 | Swap models and break each other's | Dwivedi 2021; AI Unplugged team swap; Druga & Ko |
| P5 | An out-of-distribution card | The Tech Part 2; AI Unplugged monkey 21; AI4Mars "big rock" |
| P6 | Crowd comparison and agreement | reCAPTCHA; AI4Mars (about 10 labellers per image); Zooniverse |
| P7 | Below a threshold, ask a human | Snapshot Serengeti; Wildlife Insights 65/95%; MammalWeb ranking |
| P8 | A designed first failure, then a record sheet | Toyota Naze Nani (speed to 100); The Tech Part 1 |
| P9 | A real purpose and link | AI for Oceans → Zooniverse; MammalWeb schools; AI4Mars |
| P10 | Short session ending in an artefact | Hour of Code 40-minute plan; DataBites results screen |

## 5. Pitfalls

- **Anthropomorphism.** A named bot with feelings, and children deferring to a confident agent (3.3).
  - **[design] Fix:** credit people; show Pip's track record; invite disagreement.
- **"100% = right".** Documented (Dwivedi); 7–8-year-olds are weak at judging calibration (Birch).
  - **[design] Fix:** confidently-wrong moments in stages 1–2 and 3.
- **Implying a live model.** The brochure context notes that "% sure" can imply a live model.
  - **[design] Fix:** use a "Pip's guess" framing, and add one facilitator line per session: "In this game, the people who made Pip wrote what it guesses, so we can study its mistakes." This mirrors DataBites' honest "training animation".
- **Gaming the labels.** Encouraged by Code.org but not measured. https://lesson-plans.code.org/coursef-2025/20250904181039/teacher-lesson-plans/AI-For-Oceans.pdf
  - **[design] Fix:** a scheduled trick round.
- **Fragile tech.** The broken Minecraft world (2.1).
  - **[design] Fix:** keep the lab scripted and self-contained.
- **Hidden labour and myths.** ImageNet's crowd workers; the reCAPTCHA–Waymo myth (2.4).
- **Accessibility.** Image tasks assume sighted children (Dwivedi).
  - **[design] Fix:** every picture card has a spoken name and a shape or pattern cue; Pip's lines are read aloud.

---

## 6. Recommendations for DeltaOps (tied to evidence)

1. **Confidence + track record + band.** Show "% sure", a three-band gauge and a running tally of Pip's right and wrong. (Dwivedi 2021; Fobert 2024; Birch 2019)
2. **An early confident error.** Pip should be very sure but wrong in stage 1 or 2. (Birch 2019; Dwivedi 2021)
3. **An ask-a-human threshold.** Below 60%, Pip shows "?" and a child decides. **[design]** The 60% number is arbitrary but echoes real thresholds. (Wildlife Insights 65%; Snapshot Serengeti)
4. **Objective → edge case → subjective arc.** (AI for Oceans)
5. **An official trick round and a team model swap.** (Code.org 2025; Dwivedi; AI Unplugged)
6. **Agreement as data quality,** by showing the vote split. (AI4Mars ~10 labellers; reCAPTCHA)
7. **An out-of-distribution card in every lab.** (The Tech; AI Unplugged)
8. **Perception, not trolley ethics.** (CU Boulder; critique of Moral Machine framing **[design]**)
9. **Credit people in facilitator language.** (Druga & Ko)
10. **No real crashes on screen.** (3.7)
11. **State intent in words plus an icon.** (Hameed 2023; Stange 2025)
12. **Artefact plus a real link:** Zooniverse, MammalWeb, AI4Mars results. (2.4; 8.1)
13. **Name the sensor and its limits** (AI4K12 Big Idea 1). https://ai4k12.org/gradeband-progression-charts/
14. **Partner check.** **[design]** Offer PAVE UK a review of Robo-Taxi Island's facilitator notes. (2.2)

---

## 7. Full specification: "Robo-Taxi Island" (AI Road Lab)

**Pitch.**
- The island: a floating voxel island with a tiny town (school, bakery, duck pond, farm lane, lighthouse road).
- **Pip**, a small blocky robo-taxi with a roof camera, *only knows what children put in its Picture Book*.
- **Marge**, a safety-driver robot, rides in the back with a big red button, so nothing bad ever really happens.

**Format fit.**
- 6 stages × 3 cards (A, B, C); one card per stage is deliberately vague.
- **[design]** Round 2 always put the vague card in slot C. Shuffle the vague card's slot per stage (C, B, C, A, C, B) so children judge the wording, not the letter.
- Pip's scripted guess bubble; world change; facilitator card; retry with a clearer card.
- Routes: 3^6 = 729, all pre-written. Each card writes a small set of flags (e.g. `book.peopleVariety`, `book.nightPics`, `rule.askHuman`) that later stages read, so outcomes carry forward.

**Session budget [design]:** 40 minutes, matching the Code.org lesson length.
- 3 min intro;
- 5 stages × 5 min;
- stage 6 at 7 min;
- 5 min licence and plenary.

**Meters (top bar):**

| Meter | What it counts | How it shows |
|---|---|---|
| 🟢 **Safe Trips** (0–6) | Correct stops and goes | Fills over the session |
| 🟠 **False Alarms** | Needless stops | The passenger's milkshake wobbles; +1 minute on the clock |
| 🔴 **Missed It** | Failed to stop | A soft cone or hay bale is bumped; Marge presses the red button |
| 🔵 **Picture Book** | Training cards, by class | Thumbnail stacks the children can open (Dwivedi: quick data inspection) |
| ✔/✘ **Pip's Record** (new) | Pip's right and wrong guesses this session | Children compare it with the % (3.3) |

**Confidence display:**
- A label, a %, and three bands:
  - Not sure: under 60;
  - Fairly sure: 60–84;
  - Very sure: 85 and over.
- Below 60, Pip shows "?" and says "Help! What is this?".
- The intent pill reads "STOPPING" or "GOING", with an icon (3.6).
- **Confidence script rules [design]:**
  1. In every stage, at least one guess has % and correctness that disagree.
  2. The % never moves on its own. It only changes after a card is played, so children can see it comes from the Picture Book.
  3. Pip's lines use "I guess" and "my book says", never "I think" or "I feel".

### Stage 1 — "Teach Pip to See" (objective labels; vague card = C)
- **A:** "Put 3 *person* pictures and 3 *car* pictures in Pip's book." → clean loop. "Person — 91%. STOPPING."
- **B:** "Add 3 *person* pictures only." → Pip stops for people but hesitates at cars: "Car? 55%… ?" Children decide.
- **C (vague):** "Teach Pip about things on the road." → children who add trees and postboxes to "stop" get Pip braking at every tree. "Tree is a stop thing? 70%." False Alarms +2.
- **Planned confident error (all routes):**
  - the scarecrow by the farm gate gets "Person — 94%";
  - it is a false alarm;
  - Pip's Record gets its first ✘ while the % was "Very sure".
- **Facilitator:** "Pip said 94%. Was it right? What does '% sure' really measure?"

### Stage 2 — "Who's Missing?" (unrepresentative data; vague card = B)
- **Setup:** the book holds only adults walking. New road users:
  - a child on a scooter;
  - a wheelchair user;
  - a person with a big umbrella;
  - a pram.
- **A:** "Drive past the school and watch the %." → scooter: "Bicycle?… Person?… 48% — ?" Marge brakes. Missed It +1 (soft).
  - The flickering label is a gentle echo of the Uber label flip (3.7).
- **B (vague):** "Make Pip better at people." → adds more walking adults; no change. Hint: "Pip already has 12 walking grown-ups…"
- **C:** "Add 2 pictures of people who look or move *differently*." → "Person — 87%. STOPPING." The school crossing glows green.
- **Facilitator:** "Who was missing from Pip's book? Who might be missing from real computers' books?"
- **11+ note:** pedestrian-detection research found worse results for darker skin tones (Wilson 2019). https://arxiv.org/abs/1902.11097

### Stage 3 — "Weird Things on the Road" (edge cases; vague card = C)
- **Objects:**
  - a blowing plastic bag;
  - a puddle reflecting a person;
  - a dinosaur costume;
  - a duck crossing.
- **A:** "Drive the farm lane and count the false alarms." → bag: "Animal! 76%. STOPPING." The milkshake spills.
- **B:** "Make a *Safe to drive through* group with the bag and the puddle." → smooth drive.
- **C (vague):** "Fix Pip's mistakes." → if the duck goes into "safe" because it is small, Pip bumps a duck-shaped hay bale (Missed It) while the real duck flutters off.
- **Out-of-distribution:** the dinosaur gets "Never seen one. 31%. Asking a human…" (AI Unplugged monkey 21; The Tech Part 2).
- **Facilitator:** "Which is worse: stopping for a bag, or not stopping for a duck? Would it be the same for a pizza robot?" (CU Boulder; AI Unplugged "leaves" example)

### Stage 4 — "Night and Fog" (sensor limits; vague card = A)
- **A (vague):** "Help Pip see better." → options: more day pictures (no change), headlights (+10%), night pictures (+30%).
- **B:** "Turn night on and watch the % drop." → "Something… 42%… ?"
- **C:** "Add 2 night-time pictures of people and bikes." → "Bicycle — 81%, even in fog!" The fog thins as the % rises.
- **Facilitator:** "Pip's camera is like one eye. What other senses could a real car use in fog?" (AI4K12 Big Idea 1)

### Stage 5 — "Trick Pip!" (adversarial round; vague card = C)
- **Setup:** teams secretly play a trick on the other team's road:
  - a stickered STOP sign;
  - a cardboard cut-out person;
  - a cone-shaped cat;
  - 2 mislabelled book cards.
- **A:** "Play your trick card." → stickered sign: "Speed sign — GOING! 89%." Marge brakes. (Eykholt 2018)
- **B:** "Drive your own Pip. Were you tricked?" → a detective magnifier marks the tampered cards (quick data inspection).
- **C (vague):** "Stop tricks from working." → scripted good answers:
  - add stickered-sign pictures;
  - check the vote;
  - use a second clue (sign *shape* and *place*).
- **Facilitator:** "Your trick worked! What did it teach us? Should one sign be Pip's only clue?"

### Stage 6 — "Three Teams Agree" (consensus, then the final drive; vague card = B)
- **Tricky pictures:**
  - a blurry cyclist;
  - a person with a mirror;
  - a dog in a raincoat;
  - a cone with a hat;
  - a shadow.
- **A:** "Each team labels the 5 pictures." → the vote split is shown as coloured blocks.
- **B (vague):** "Send Pip on its last trip." → Pip uses whatever labels it has. Splits become "?" stops.
- **C:** "Keep labels where most teams agree; turn on 'Ask a human' for splits." → "3 of 3 teams said Dog. 93%." / "Teams split on the shadow. I'll ask a human."
- **World:** the grand loop; green lights where teams agreed; firefly fireworks.
- **Precedent:** AI4Mars used about 10 labellers per image plus an expert check (2.4).
- **Facilitator:** "When people disagree, who decides? Who made Pip clever — Pip, or you?"

### Stars [design]
One star per stage for a route that ends with:
- no 🔴 Missed It; and
- at most one 🟠 False Alarm.

There is a bonus star for spotting the confident error in stage 1 out loud. Stars reward *clear cards and evidence-checking*, not speed.

### End artefact — "Pip's Driving Licence" (print or download; no accounts, no names needed)
- **Front:**
  - a voxel portrait of Pip;
  - a session code;
  - "Trained by: Team ___".
- **Back:**
  - What we taught Pip (class icons and counts);
  - Pip's best mistake (auto-filled, e.g. "Scarecrow = person, 94% sure!");
  - Pip's Record (✔ and ✘ counts);
  - Our safety rule (e.g. "Under 60% sure → ask a human");
  - the badge "Humans taught this car. Humans check this car.";
  - a QR code to a Zooniverse project.

### Accessibility [design]
- Every card and Pip line is read aloud.
- Picture cards carry a shape or pattern cue as well as colour.
- The fog and night effects keep the labels high-contrast.
- No timed input.
- (Dwivedi's sighted-only caveat; Stange 2025 icons with keywords)

### Facilitator notes (card back)
- **Key ideas:**
  1. Computers learn from examples, not understanding.
  2. Missing examples lead to mistakes for some people or things.
  3. % sure is not the same as right; check the record.
  4. Some mistakes cost more than others.
  5. People decide, check and are responsible.
- **Honesty line:** "The people who made this game wrote Pip's guesses so we can study its mistakes. Real cars learn from millions of pictures."
- **Reframe anthropomorphic talk:** "Pip hasn't seen enough examples of that."

---

## 8. Three venue-themed perception labs

### 8.1 "Camera Trap Detectives" (nature centres; extends Eco AI Explorer)
**Island and helper**
- A night woodland and pond with 4 trail cameras.
- **Sortbot** sits at the ranger hut. It is a sorting machine, not a talking animal.

**Real-world grounding**
- **Empty frames are common:**
  - Empty images made up 21.7%–83.9% of four camera-trap datasets, partly due to vegetation and placement. https://besjournals.onlinelibrary.wiley.com/doi/10.1111/2041-210X.13099
  - In another study, blanks were 38% of detections and were mainly triggered by plants moving with a temperature difference from the background. https://doi.org/10.1002/rse2.81
- **Infrared is harder:**
  - One rodent species was about 20× less likely to be misidentified in white-flash than in infrared images. https://doi.org/10.1071/am17016
- **Machines sort first, people check:**
  - Wildlife Insights uses 65% (species) and 95% (blank) thresholds; below them it shows "No CV Result" for people to review. https://www.wildlifeinsights.org/blog/wildlife-insights-sharpens-its-vision-updated-ai-model
  - MegaDetector's guidance: lower cut-offs catch more animals but admit "waving grass and shadows". https://github.com/agentmorris/MegaDetector/blob/main/skills/run-megadetector.md
- **UK relevance:**
  - MammalWeb, with MegaDetector and Conservation AI, can cut images needing processing by up to 70%, then ranks sequences for volunteers by machine certainty (National Hedgehog Monitoring). https://www.the-ies.org/resources/lens-wild-innovations-wildlife-monitoring-machine-learning
  - ZSL's Instant Wild combines citizen IDs with ML. A London trackside pilot processed 40,000 images, finding 30+ bird species, foxes, deer and hedgehogs. https://www.zsl.org/news-and-events/feature/using-ai-monitor-trackside-britains-wildlife
- **Schools evidence:**
  - In MammalWeb schools work, 42 North East schools contributed more than 2,000 sequences and 13,000+ classifications, and children could name twice as many UK mammals afterwards (preliminary). https://www.britishecologicalsociety.org/participation-citizen-science-camera-trap-project-dramatically-increased-school-childrens-knowledge-uk-mammals/
  - A 2025 study of 34 primary schools found pupils named more mammals, especially those caught on their own cameras. https://doi.org/10.1080/21548455.2025.2515617

**Stages (meters: Wildlife Count, Ranger Inbox, Sortbot's Record)**
1. **Label** fox, badger, roe deer, hedgehog, "empty".
   - Planned confident error: a log reads "Badger 90%".
2. **Windy night:** grass triggers 12 empty frames.
   - Vague card: "Sort them all."
   - Ranger Inbox overflows.
   - Better card: "Make Sortbot say *empty* only when very sure."
   - (Wildlife Insights' 95% blank rule)
3. **Infrared:** grey images; cat vs badger confusion.
   - Fix: add infrared examples. (Infrared study)
4. **Only side-on pictures:** a fox walking towards the camera scores 38%.
   - Add front-on pictures. (The Tech's camera angles)
5. **Surprise visitor:** an otter Sortbot was never taught.
   - "I don't know — ask a ranger" is the *right* answer. (OOD)
6. **Machine plus volunteers:**
   - Children pick a threshold slider (50 / 70 / 90).
   - Low means more mistakes in the count. High means a bigger inbox for volunteers.
   - **[design]** This is the real MegaDetector trade-off made visible.

**World effect**
- The Wildlife Count board drives a decision: "Build a hedgehog highway here?"
- Mislabels move the highway to the wrong hedge.

**Artefact and link**
- A "Field Survey Report" card, plus links to MammalWeb or Instant Wild (https://www.mammalweb.org/en/community/schools).

### 8.2 "Museum Mystery Objects" (museums; extends AI Time Traveller / Londinium)
**Island and helper**
- A museum storeroom above a Roman dig.
- **Catalogue Bot** suggests labels: coin, pottery, tool, jewellery.

**Real-world grounding**
- **Auto-tagging errors:**
  - Harvard Art Museums' AI Explorer says its vision services are "black boxes" whose output exposes "limitations and biases". https://ai.harvardartmuseums.org/about
  - Its object pages give the example of leaves boxed as "Bird", and warn that model agreement is not proof of accuracy. https://ai.harvardartmuseums.org/object/295351
  - Cooper Hewitt documented a camera system that kept tagging Asian faces as "blinking". https://www.cooperhewitt.org/2019/09/24/dont-take-it-at-face-value/
- **Legacy labels:**
  - Pitt Rivers' "Labelling Matters" reviews "outdated, offensive, inappropriate or exclusionary" museum language. https://www.prm.ox.ac.uk/labelling-matters
  - Science Museum Group says historic records "may contain offensive descriptions or outdated ideas" and is adding context and correcting them. https://coimages.sciencemuseumgroup.org.uk/datasets/index.html
  - The Rijksmuseum no longer uses certain terms but keeps the old titles traceable. https://www.rijksmuseum.nl/en/research/our-research/overarching/terminology
  - The Smithsonian states that "no datasets, collections, algorithms or tools are unbiased". https://datascience.si.edu/ai-values-statement
- **Museums using image recognition:**
  - Science Museum Group's "Snap" feature finds similar objects. https://www.sciencemuseumgroup.org.uk/our-work/our-approach-to-ai

**Stages (meters: Gallery Accuracy, Visitor Questions, Catalogue Bot's Record)**
1. **Clean objects** on a white background.
   - Planned confident error: a round bronze roof stud reads "Coin 93%".
2. **Fragments:** a pot sherd vs a roof tile.
3. **Background shortcut:** every coin in the book was photographed on blue cloth, so anything on blue is called "Coin".
   - (Dwivedi's "inanimate object" shortcut; COCO's point about non-iconic photos)
4. **Who wrote the old label?** Old catalogue cards with dated or one-sided wording, e.g. a label calling an enslaved person's tool a "curio".
   - Children choose: keep it as history, add context, or rewrite.
   - This is the subjective-label stage, modelled on museum practice (Pitt Rivers, Rijksmuseum).
   - **[design]** Content needs a specialist check.
5. **Modern intruder:** a bottle cap among the Roman finds.
   - Trick round.
   - Out-of-distribution answer: "Not Roman? Ask a curator."
6. **Curators agree:** a three-team vote, plus an "ask an expert" threshold.
   - (AI4Mars-style expert gold set)

**World effect and artefact**
- Correct labels fill the gallery; wrong ones end up in a silly "Mystery Shelf".
- Artefact: a "Museum Catalogue Card" with the object, label, % sure, "checked by" and one context note.

### 8.3 "Rover Ground Truth" (STEM clubs; extends AI Inventor Lab, and fixes its missing-helper issue)
**Island and helper**
- A rust-red voxel crater.
- **Dusty**, a rover, must reach a science rock.
- The classes are the **verified AI4Mars four:**
  - soil;
  - bedrock;
  - sand;
  - big rock.
  - https://openaccess.thecvf.com/content/CVPR2021W/AI4Space/papers/Swan_AI4MARS_A_Dataset_for_Terrain-Aware_Autonomous_Driving_on_Mars_CVPRW_2021_paper.pdf

**Real-world grounding**
- **Self-driving on Mars:** Perseverance's Enhanced AutoNav looks up to 15 m (50 ft) ahead and checks each wheel against the terrain. https://www.jpl.nasa.gov/news/nasas-perseverance-mars-rover-ready-to-roll-for-miles-in-years-ahead/
  - AutoNav builds a 3D hazard map and can cover up to 412 m in one sol. https://science.nasa.gov/blogs/perseverance-mars-rover/2026/10/12/nasas-perseverance-sets-off-world-record-for-total-distance-driven/
  - In the 2022 Rapid Traverse campaign, it planned 94.8% of the driving. https://www-robotics.jpl.nasa.gov/media/documents/2023-rapid-traverse.pdf
- **Choosing its own targets:** AEGIS picks and ranks rocks for laser analysis without waiting for Earth. https://ai.jpl.nasa.gov/public/projects/aegis/
- **Real hazards:**
  - Spirit's wheels broke through a crust into soft sand at "Troy" in April 2009, and the rover became stuck. https://www.jpl.nasa.gov/news/mars-rover-yielding-new-clues-while-lodged-in-martian-soil/
  - Curiosity's wheels were punctured by pointed rocks. https://www.jpl.nasa.gov/news/an-algorithm-helps-protect-mars-curiositys-wheels/
- **Signal delay:** about 3 to 22.4 minutes one way, depending on distance. https://science.nasa.gov/mars/mars-relay-network/ NASA Goddard quotes about 4–24 minutes for Perseverance. https://www.nasa.gov/centers-and-facilities/goddard/space-communications-7-things-you-need-to-know/
- **Rare classes stay hard:** SPOCv2 reached 91.41% overall but "still struggles with big rock due to its rarity". https://www.zooniverse.org/projects/hiro-ono/ai4mars/about/results

**Stages (meters: Battery, Distance, Wheel Health, Dusty's Record)**
1. **Label the four terrains.**
   - Planned confident error: a dark crust over sand reads "Soil 91%". Dusty sinks to its hubs, as Spirit did at Troy. Wheels spin and Battery drops.
2. **Sharp rocks:** "bedrock" vs "big rock".
   - The vague card "Avoid bad ground" leaves the class undefined, so wheels get dented (Curiosity).
3. **Low sun:** shadows read as big rocks, causing false alarms and long detours.
   - Fix: add low-sun pictures.
4. **Dust storm:** confidence falls.
   - Should Dusty wait, or drive?
   - Children set the rule.
5. **Too few big rocks:** the book has only 2 big-rock pictures, and Dusty misses one.
   - Add more, or "use a second clue: height" (the JPL plan to use stereo depth; AI4Mars results page).
6. **Earth is 20 minutes away:**
   - Above the threshold, Dusty drives itself (AutoNav).
   - Below it, Dusty stops and waits for the Earth team, which costs time.
   - A threshold slider shows the trade-off.

**Artefact and link**
- A "Mission Driving Permit" with Dusty's rule and its best mistake.
- Link to the AI4Mars results page.

---

## 9. Still unverified

- **AI for Oceans play count:** no per-activity figure is published (2.1).
- **Experience AI slide images:** the "Bias in, bias out" slides are behind a login. The public Raspberry Pi "Apple vs tomato" project is used as a proxy.
- **Toyota "Naze Nani Lecture":** the "36,000+ participants" and "deliberate failure" quotes come from a *sponsored* Car Watch article (Japanese), not a Toyota primary source. https://car.watch.impress.co.jp/docs/topic/special/2146186.html
- **"V&Ai" at Young V&A:** shown only on a designer's portfolio. It has no date and no V&A confirmation. https://www.alexisbardini.com/v-ai
- **Wayve:** the Teens in AI forum is known only from a LinkedIn post. I found no Wayve-published education resource.
- **Barbican visitors:** the "over 88,000" figure is partner-reported, not from the Barbican.
- **Studies summarised from abstracts:** Fobert 2024, Stower 2024, Brink & Wellman 2020, Charisi 2018, Hameed 2023, Jun 2024 and Stange 2025 come from Exa research summaries and abstracts. I did not read the full texts.
- **Druga & Ko venue:** IDC '21 per the DOI; one summary said CHI.
- **Children and error types:** no study measures children's precision/recall intuitions.
- **Children gaming labels:** no study measures it.
- **Ethics of teaching with fatal crashes:** no specific guidance exists. Recommendations in 3.5 and 3.7 are reasoned from adjacent evidence.
- **Round-2 claims not re-checked this round:**
  - the Uber 1.3-second figure;
  - Duckietown university counts (80–175+);
  - the Zumi age range;
  - the ninth-grader Teachable Machine study.

  They are kept with their round-2 sources.
- **Design numbers:** all thresholds (60/85%), stage timings and star rules in sections 7–8 are **[design]** choices, not findings.
- **Museum stage-4 content:** the example legacy label needs a museum-specialist review before use.
