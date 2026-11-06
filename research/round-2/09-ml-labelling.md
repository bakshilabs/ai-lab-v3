# 09 — Children (and the public) training and labelling ML data: precedents, research and a self-driving / perception lab for DeltaOps

Prepared for DeltaOps Learning (browser-based, staff-facilitated voxel "AI labs" for ages 7–13). Date: 2026-11-04.

**How to read this.**
- Every factual claim has a URL next to it.
- **[est.]** marks my own estimate or inference.
- **[unverified]** marks something I believe but could not confirm with a source in this pass.
- **Search limit.** The shared web-search budget ran out partway through the deeper pass. A few items (listed in section 9) are therefore thinner than intended. A follow-up session could close them.

---

## 1. Summary

1. **The pattern that keeps succeeding** is short and concrete:
   - the child labels a handful of examples;
   - the model guesses on new examples and shows a confidence number;
   - the child sees the effect in a world (fish removed, doodle guessed, car stops);
   - someone else tries to break it;
   - the group talks about why.

   AI for Oceans, Teachable Machine, Quick, Draw!, Cognimates and The Tech's "Machine Learning Unplugged" all follow it.
2. **The two best research studies with 7–13 year olds** (Dwivedi et al. 2021; Druga & Ko 2021) give three directly usable findings:
   - children use **confidence scores** as their main signal of whether the model is "sure", "confused" or "wrong";
   - **swapping models and breaking each other's** produces the richest reasoning;
   - hands-on training moves children from "the device is smart" towards **"fallible but helpful, and people made it"**.

   Anthropomorphism shrinks but does not disappear.
3. **A trap specific to this age.** In the Dwivedi study, children treated **100% on the wrong class** as "something went wrong", and some trained until they saw 100% rather than until the model was right. DeltaOps' scripted "% sure" helper should deliberately include **confidently wrong** moments, so that children don't learn that a high percentage means correct.
4. **Real self-driving failures make excellent design sources** but are poor content for children:
   - the Uber Tempe crash, where the label kept flipping between vehicle, bicycle and other;
   - the sticker attack that turned a stop sign into "Speed Limit 45".

   Turn them into gentle, fictional, non-fatal analogues on screen. Keep the real cases in facilitator notes, for older or curious groups only.
5. **Deliverables** (sections 7 and 8): a fully specified **Robo-Taxi Island** lab, plus three alternative perception labs:
   - a camera-trap lab for nature centres;
   - a museum object-ID lab;
   - a Mars terrain lab, which can extend AI Inventor Lab.

---

## 2. Catalogue of precedents

### 2.1 Child-facing training games and activities

**Code.org — AI for Oceans (Dec 2019; grades 3–12)**
- **What it is:** about 8 levels.
  1. Video on what ML is.
  2. Label images "fish / not fish" with two buttons.
  3. The bot "A.I." classifies 100 new items and shows the ones it rates most likely to be fish.
  4. Video on training data and bias.
  5. Train a word of your choice.
  6. Video on societal impact.
  7. Train *subjective* words such as "angry" or "fun".
  8. Wrap-up that links to Zooniverse's Snapshot Mountain Zebra.

  Source: https://curriculum.code.org/hoc/plugged/9/
- **Bias mechanism:**
  - Teacher notes say the subjective words are "intentionally more subjective" and that two students choosing the same label "may get a very different set of results".
  - Teachers are told to ask whether the role of opinion "is good or bad, and how it might be addressed".
  - Children may also "train it incorrectly to see what happens".

  Sources: https://studio.code.org/s/csd5-2024/lessons/15, https://curriculum.code.org/hoc/plugged/9/
- **Scale:** I found no published per-activity count. Hour of Code 2019 recorded more than 53 million participations during CSEdWeek, and AI for Oceans was the headline new activity. https://codeorg.medium.com/from-csforgood-to-ai-for-oceans-hour-of-code-2019-showed-how-cs-can-create-a-better-world-c18c88862db (page returned 403 to my fetcher; figure taken from search snippet). Microsoft gave $7.5M to Code.org in 2020 partly to extend AI lessons. https://www.geekwire.com/2020/microsoft-donates-7-5m-code-org-help-students-learn-ai-concepts-ethics/ AI for Oceans has probably been played by several million children since 2019 **[est.]**.
- **Visibility:** the bot sweeps the ocean, and wrong picks (fish in the trash pile, trash in the sea) are plain to see.
- **Session:** about 45–60 min. It is still widely re-used inside Code.org's 2025 "Hour of AI" partner listings (for example https://code.org/en-US/india/enpower).
- **Takeaway for DeltaOps:** this is the closest existing analogue to DeltaOps' format. Its progression from objective to subjective labels is the core move to borrow.

**Google — Quick, Draw! (2016–)**
- **Loop:** draw a prompted object in 20 s while a neural net guesses out loud.
- **Scale:** more than 15 million players and 50 million drawings in 345 categories, released as an open dataset with each player's country stored. https://quickdraw.withgoogle.com/data
- **Visibility:** the guesses are spoken live, and afterwards the "here's what it thought" page shows other people's drawings of the same thing. This makes the training distribution visible.
- **Takeaway:** a time limit plus a spoken guess creates tension and laughter. Showing other people's examples explains failure without any jargon.

**Google — Teachable Machine (v1 2017; v2 Nov 2019)**
- **What it is:** browser-based and no-code. You train on webcam images, sound or poses, and see live confidence bars per class. https://www.engadget.com/2019/11/07/google-teachable-machine-2/
- **Used in many K-12 curricula:**
  - Experience AI-adjacent and Czech lesson plans;
  - BirdBrain robots, https://learn.birdbraintechnologies.com/artificial-intelligence/ai-for-all/
  - Ozobot's "Teaching Self-Driving Machines" lesson, where students train a stop-sign vs. traffic-light classifier with about 10 images per class, add a third class, and compare accuracy before and after retraining. https://classroom.ozobot.com/wp-content/uploads/2026/07/Teaching-Self-Driving-Cars-Student-Activity-Sheet.ZPSKEUEvQ3uiWkKWJE1iQAbE.pdf

**Cognimates (MIT Media Lab → Druga, Univ. of Washington)**
- **What it is:** a Scratch-based platform. Children train text and image models, for example a rock/paper/scissors webcam program and a narwhal-vs-unicorn drawing classifier, then code with them.
- **Study:** detailed in section 3.1.

**Machine Learning for Kids (Dale Lane, IBM)**
- **What it is:** about two dozen Scratch-integrated projects, each with teacher notes and a worksheet. The No Starch book (2021) includes "biasing the computer". https://ai4k12.org/machine-learning-for-kids/
- **Self-driving check:** I found **no self-driving-car project** in the official list, so treat it as *ruled out as far as I could check*. The worksheet index page did not render for my fetcher: https://machinelearningforkids.co.uk/worksheets
- **Related material:** Dale Lane's blog has a traffic-adjacent ML post, "Catching the carpool cheats". https://dalelane.co.uk/blog/?p=4953

**Experience AI (Raspberry Pi Foundation + Google DeepMind, 2023–; ages 11–14)**
- **Lesson:** Module 1 Lesson 4, **"Bias in, bias out"**. Students train a classifier on apples vs tomatoes and find that a limited dataset produces "biased and inaccurate predictions".
- **Vocabulary taught:** *data bias* and *societal bias*. The lesson stresses the need for separate training and test data.
- **Context:** the lesson is set in a supermarket.
- **Sources:** https://experience-ai.org/en/units/understanding-ai/lessons/15, https://www.raspberrypi.org/blog/experience-ai-launch-lessons/
- **Not confirmed:** the exact images (e.g. whether green apples are missing) are behind a login, so I could not check them.

**Code.org — Dance Party: AI Edition (2023)**
- **What it is:** pick 3 emojis, and embeddings with cosine similarity choose the visual effects. Children do no training. It is a generative-AI creativity activity, not a labelling one. https://lesson-plans.code.org/dance-ai-2023/fallback/teacher-lesson-plans/Dance-Party-AI-Edition.pdf
- **Lesson for DeltaOps:** low relevance, beyond showing that the "pick 3 icons" input works well without typing.

**Minecraft Education — Hour of Code: AI for Good (2019)**
- **What it is:** 90 min, grades 3–12. Children code an agent that uses AI forest-fire prediction to save a village. https://thejournal.com/Articles/2019/11/14/Minecraft-Hour-of-Code-Lesson-Focuses-on-AI.aspx
- **Self-driving:** it has no self-driving content.
- **Maintenance warning:** Minecraft's support site says parts "may not be completable due to broken code". https://educommunity.minecraft.net/hc/en-us/articles/20672394051348

**The Tech Interactive — "Machine Learning Unplugged" (grades 4–12; 45 min)**
- **Scenario:** children act as wildlife conservationists for the US Fish & Wildlife Service.
- **Part 1:** groups test an AI "algorithm" (colourful/dull wings, thin/plump body) by sorting animal cards into A/B. They are told to **use only the AI's rules, not their own knowledge**, and to *notice* errors rather than fix them.
- **Part 2:** they revise the rules, then test on a *new* deck that includes species fitting **neither category**. This is an out-of-distribution lesson.
- **Debrief:** the debrief stresses variety in training data, using different camera angles as the example.
- **Exhibit tie-in:** it links to the museum's "Animaker" exhibit, which identifies animals visitors show it.
- **Source:** https://www.thetech.org/media/x5bgn0mj/lesson-machinelearningunplugged.pdf
- **Takeaway:** an excellent template for a nature-centre lab, and it fits staff facilitation directly.

**Other unplugged classification activities**
- Gettysburg/CMU **animal card set**: 36 animals and a decision tree. Withholding cards creates dataset bias. https://modelai.gettysburg.edu/2024/animal/
- Code.org fruit/vegetable sorting cards. https://studio.code.org/s/aiml-2021/lessons/5
- "Gnome sorting". https://all-digital.org/event/unplugged-machine-learning/
- AI Unplugged (Germany): includes overfitting, "learning the training data by heart". https://computingeducation.de/aiunplugged-en.pdf
- **CS Unplugged (csunplugged.org):** I did not find a specific ML-classification activity there in this pass **[unverified]**.

**Guessing-game models (Akinator, "Guess Who", 20 Questions)**
- **Akinator:** widely described as a decision-tree or probabilistic question-selection engine. The sources available were low quality, and I found no developer documentation **[unverified mechanism]**.
- **Guess Who style:** the format matches the decision-tree card activities above.
- **Lesson for DeltaOps:** "ask the most useful question" is a good *rules/decision-tree* contrast to "learn from examples". Use it as a facilitator aside, not as the main mechanic.
- **Semantris (Google, 2018):** word-association games built on ML language understanding. Not a labelling activity. https://experiments.withgoogle.com/semantris

**Elements of AI** (Univ. Helsinki / MinnaLearn)
- Adult-oriented, text-heavy online course. Not suited to ages 7–13. Noted only as background (not re-checked in this pass).

### 2.2 Self-driving–specific education

| Programme | Age | Core loop | Takeaway for DeltaOps |
|---|---|---|---|
| **AWS DeepRacer Student League** | 16+ | Write a reward function, train with reinforcement learning in a 3D simulator, race on a leaderboard. More than 320k participants league-wide in 150+ countries. https://aws.amazon.com/blogs/publicsector/how-two-schools-canada-turkey-competed-aws-deepracer-skill-up-machine-learning | Replays of the car going off-track, and leaderboards. Too abstract for 7–13. |
| **Duckietown** | University | Small robots drive a "duck town" using camera-only autonomy. Started as an MIT class in 2016; 80–175+ universities (sources differ). https://duckietown.com, https://blogs.nvidia.com/blog/jetson-nano-2gb-duckietown | Its *town diorama* aesthetic is very close to DeltaOps' voxel islands. |
| **Donkey Car / DIY Robocars** | Teen/adult hobbyists | Drive the RC car yourself to record images and steering, then the car imitates you (behavioural cloning). https://www.donkeycar.com | "The car learns how *you* drove", so messy driving gives a messy car. |
| **Robolink Zumi** | Grade 5+ (about 10+) | Small self-driving car kit on a Raspberry Pi Zero with a camera. Lessons on computer vision, colour, gesture and face training, and "teach her to stop" at a STOP sign. Blockly or Python; 40+ contact hours. https://stemfinity.com/collections/artificial-intelligence/products/zumi | The closest "Donkey Car for kids". Its teachable stop sign is a direct precedent for DeltaOps. |
| **CU Boulder iSAT "Self-Driving Cars" unit** | Middle school **[est.]** | micro:bit BitCar navigates a track and avoids obstacles, then students add AI classification. The page's own example is that the car **should stop for a dog but not for a trash bag**. https://www.colorado.edu/research/ai-institute/our-products/curriculum-units/self-driving-cars | Independent confirmation that "stop for an animal or person, not a bag" is the canonical edge case for children. |
| **Ozobot "Teaching Self-Driving Machines"** | Upper primary/middle | Route-writing with the Ari robot, then a Teachable Machine stop-sign/traffic-light classifier with retraining. (link above) | Pairing "rules for driving" with "learned recognition" is a nice contrast. |
| **MIT Moral Machine** | Public | Binary dilemma choices; 39.6M decisions from 233 countries and territories, from more than 2M people (Nature 2018). https://dspace.mit.edu/handle/1721.1/125065 | Huge reach through quick binary choices and comparison with everyone else. Weak point: frames self-driving cars as moral deciders rather than fallible perceivers **[my view]**. |
| **MIT RAISE Day of AI** | Grades 3–12 | Free modules (Alexa, ethics, etc.). https://news.mit.edu/2021/mass-stem-week-kickoff-mit-raise-announces-day-ai-1020 | I found **no self-driving unit**, so treat it as *ruled out as far as checked*. |
| **Waymo × AAA "Let's Talk Self-Driving"** | Primary | School Safety Patrol children visited a Waymo facility to learn how the cars "see all around them and predict how other road users might behave". https://waymo.com/blog/2019/09/waymo-teams-up-with-aaa-to-teach-kids/ | Industry framing: *see, then predict*. No hands-on labelling. |
| **TED-Ed "How do self-driving cars see?"** | 11+ | Explainer video on LiDAR and photonics. https://lessonplanet.com/teachers/how-do-self-driving-cars-see | Useful background for facilitators. |
| **Wayve / Toyota child-facing explainers** | — | I found no child-facing material in this pass. | — |

### 2.3 Robots and toys (gap check)

- **LEGO — confirmed.**
  - MINDSTORMS Robot Inventor added an ML extension (2022), and it is used with SPIKE Prime. https://learnceeo.tufts.edu/resources/machine-learning-with-lego-spike-prime
  - Research platform "Machine Learning with Bricks" (kNN, regression, Q-learning on SPIKE). https://arxiv.org/html/2601.19376v2
  - Robotics kits are expensive, which limits schools. https://par.nsf.gov/servlets/purl/10644814
- **Cozmo / Vector (Anki → Digital Dream Labs) — partly confirmed.**
  - Cozmo's personality engine relied heavily on ML. Anki closed in 2019 and DDL relaunched the products. https://www.etcentric.org/?p=105621
  - I found **no source for a child-facing *training* activity** in Code Lab. Cozmo recognises faces you enrol **[unverified]**, but that is enrolment, not a labelling lesson.
- **Sphero — not found.** Sphero Edu offers drawing, block and JavaScript coding. I found **no ML-training activity**, so treat it as ruled out as far as checked.
- **Kodu Game Lab — ruled out.** Microsoft Research explored "learning" characters around 2009 (https://eis-blog.soe.ucsc.edu/2009/07/learning-in-games/), but the shipped product is rule-based visual programming. I found **no ML activity** in Kodu.
- **BirdBrain Finch / Hummingbird — confirmed.** They use Teachable Machine with Snap!/Python, including a bird-species image recogniser. https://learn.birdbraintechnologies.com/artificial-intelligence/ai-for-all/

### 2.4 Public / citizen labelling at scale (stories you can tell children)

- **reCAPTCHA (von Ahn et al., *Science* 2008)**
  - Words that OCR could not read were shown alongside a known control word. When several people agreed, the label was accepted. Word accuracy was above 99%, with 440M words transcribed on 40k+ sites.
  - Sources: https://www.sciencedaily.com/releases/2008/08/080814154329.htm, https://bibsonomy.org/bibtex/2a20d5aa858b63fcf5d2daf908fec874f/jaeschke
  - The popular claim that the traffic-light and crosswalk grids train Waymo is **unverified, and Google has denied it**. https://prosopo.io/blog/why-am-i-clicking-traffic-lights/
- **ImageNet**
  - About 14M images labelled through Amazon Mechanical Turk between July 2008 and April 2010. Often cited as about 49k workers in 167 countries **[secondary sources]**, with each image labelled several times.
  - Sources: https://en.wikipedia.org/wiki/ImageNet, https://wiki.krisyotam.com/content/wikipedia_en_all_nopic_2026-03/ILSVRC
  - Low pay for labellers is a documented criticism, and an honest "who does the labelling?" point for older children.
- **COCO (Common Objects in Context)**
  - Similar crowd-labelling of everyday objects with outlines. I did not re-verify its numbers in this pass **[unverified]**.
- **Zooniverse**
  - One billion classifications by more than 3 million volunteers (June 2026). Many projects now ask volunteers to *review labels a machine made first*. https://cse.umn.edu/node/195036
  - Humans are better at spotting the unusual and scientifically interesting. https://arxiv.org/pdf/1903.07776
- **Snapshot Serengeti → deep learning (Norouzzadeh et al., PNAS 2018)**
  - 3.2M camera-trap images of 48 species, labelled by volunteers.
  - The resulting network was about 93.8% accurate overall.
  - By **automatically labelling only the images it was confident about**, it handled about 99.3% of the data at the same 96.6% accuracy as the volunteers. This saved more than 8.4 years of human labelling at 40 h/week. https://arxiv.org/abs/1703.05830
  - This is *the* real-world model for "% sure": confident cases go to the machine, uncertain ones go to people.
- **AI4Mars (NASA JPL × Zooniverse, launched June 2020)**
  - Volunteers labelled Curiosity rover images of terrain to build the first open navigation dataset for Mars, "to help rovers identify different, sometimes dangerous terrain". https://www.zooniverse.org/projects/hiro-ono/ai4mars
  - Terrain classes I believe were soil, bedrock, sand and big rock **[unverified; the project page did not list them]**.
  - The project is now finished.

### 2.5 Museum and gallery AI exhibits

- **Science Museum London, "Driverless: Who is in control?" (June 2019–2020)**
  - Object-led and ethics-led. Included a 1960 self-guiding Citroën DS19, Robocar and Boaty McBoatface. It went on tour.
  - Sources: https://www.ianvisits.co.uk/articles/driverless-who-is-in-control-32122/, https://www.sciencemuseumgroup.org.uk/our-services/touring-exhibitions/driverless
- **Barbican, "AI: More than Human" (May–Aug 2019)**
  - About 88k visitors (figure from a partner studio) and free entry for under-14s. It toured, and drew more than 10k visitors in its first week at Frost Science, Miami.
  - Interactive pieces included a Lego city whose citizens' "quality of life" was projected live.
  - Sources: https://www.universaleverything.com/exhibitions/ai-more-than-human, https://www.frostscience.org/exhibition/ai/
- **Museum of Science Boston, "Exploring AI: Making the Invisible Visible" (2022–, continually updated)**
  - An interactive where visitors **compare image and sound datasets to see how data choices create biased outcomes**. Self-driving cars appear only as a listed example.
  - Sources: https://www.mos.org/press/press-releases/Exploring-AI-Making-the-Invisible-Visible-Exhibit-Announcement, https://mos.org/visit/exhibits/exploring-ai-making-invisible-visible
- **The Tech Interactive "Animaker"**: ML plus 3D scanning identifies animals visitors show it (described in the lesson PDF above).
- **V&A:** I did not find an AI-labelling exhibit in this pass **[gap]**.
- **UNICEF Policy Guidance on AI for Children**
  - 2020 draft; v3.0 2025 with 10 requirements. It calls for **age-appropriate explanations of AI** that address children directly, and for preparing children for AI.
  - Sources: https://www.unicef.org/innocenti/reports/policy-guidance-ai-children, https://www.unicef.org/globalinsight/media/1171/file/UNICEF-Global-Insight-policyguidance-AI-children-draft-1.0-2020.pdf
  - Useful for justifying DeltaOps' design to funders.

---

## 3. Research on how children understand ML

### 3.1 Druga & Ko (IDC 2021), read in full
- **Paper:** "How do children's perceptions of machine intelligence change when training and coding smart programs?" https://par.nsf.gov/servlets/purl/10281504 (DOI 10.1145/3459990.3460712)
- **Who and how:** 52 children aged 7–12, a 4-week after-school study at several sites.
  1. Pre-measure: a "Perception Game" with commercial agents (Alexa and others).
  2. Training and coding Cognimates projects, such as a rock/paper/scissors webcam classifier and a narwhal/unicorn drawing classifier.
  3. Post-measure: the Perception Game again.
- **Findings:**
  - Children followed a **scientific-method cycle**: hypothesise, invent tests, then confirm or revise.
  - Their tests were adversarial and creative: niche cultural references, switching language, and "images that are very confusing (e.g. images of dogs with sunglasses)".
  - Pre/post answers **trended towards scepticism** ("smarter than me", "understands me"). Children "shifted their attribution of agency from the devices to the people who program them".
  - Ideas shifted from "intelligent" to **"fallible but helpful"**.
  - Their ratings of whether the agent tells the truth or likes them *did not* change.
  - Anthropomorphism continued but came with *less trust*.
  - Peer debate mattered.
  - Shifts were not universal and not always in the same direction.
- **Confidence scores:** the paper stresses giving children access to them. In one example, correct predictions came with tiny confidence values (0.000036), which prompted children to add more data.
- **A child's quote:** "I think its smarter but a person created it so its as smart as the person… but programmed to be smarter" (M, 7.5).

### 3.2 Dwivedi, Gandhi, Parikh, Coenraad, Bonsignore & Kacorri (VL/HCC 2021), read in full
- **Paper:** "Exploring Machine Teaching with Children". https://arxiv.org/abs/2109.11434
- **Who and how:** a co-design team of 14 children aged 7–13 (mostly Black and Asian American children recruited through word of mouth), working with adult co-designers. The sessions ran in early 2018 and produced 5.5 h of video.
- **Activity:** children built classes from origami and paper prototypes, chose how to teach them (how many images, background, distance from the camera), trained Teachable Machine v1, then **swapped classifiers to test whether they generalised**, and presented to the group.
- **The three ways children read confidence:**
  1. Correct class at a steady 100% means success.
  2. Rapid switching between classes means "confused".
  3. 100% on the *wrong* class means "a mistake, something went wrong".
- **Misreadings to design around:**
  - Several children **trained until the model showed 100%** and treated that as done.
  - One child got the right class at low confidence because her test framing differed from training (less of her head in view), and read it as failure: "It reaches 60 the more I put my head up."
- **A child discovering spurious features:** Sandy realised the model keyed on glasses or a scarf: "I think it chooses one inanimate object for it to focus on."
- **Design recommendations:**
  - make metrics such as confidence visible for experimentation;
  - let children **exchange models**;
  - allow **quick data inspection**.
  - The authors also note that image tasks assume children are sighted.
- **Reflection questions they used:**
  - How many examples did you have to give?
  - What was hard?
  - Why does it make mistakes, and what trick did you use to stop them?
  - Does it work all the time?

### 3.3 Misconceptions and anthropomorphism
- Finnish 5th–6th graders (n = 195): misconception types include anthropomorphic, "AI as an entity" ideas, and children rate their own AI knowledge low. https://jyx.jyu.fi/handle/123456789/93279
- Finnish primary children's unprompted ideas of ML: "teaching machines" 34%, "coding" 7.6%, "learning via or about machines" 37.1%. https://arxiv.org/pdf/2404.00728.pdf
- 279 ninth-graders: anthropomorphic misconceptions are common. Teachable Machine plus unplugged interventions moved learners from idealising AI towards critical understanding. https://ceur-ws.org/Vol-4268/AILIT-short5.pdf
- Children aged 7–9 tend to echo a group of robots' unanimous but wrong answers (Vollmer et al., as cited by Druga & Ko).
  - **Implication:** an on-screen "AI helper" saying "92% sure!" can *pressure* children to agree. Facilitators should explicitly invite disagreement.

### 3.4 Precision vs recall intuitions (false alarms vs misses)
- **Gap:** I found no study of children's precision/recall intuitions specifically.
- **What is established:**
  - The canonical teaching example *already used* in K-12 materials is "stop for a dog, not for a trash bag" (CU Boulder iSAT).
  - Code.org's Oceans lets children see both error types: fish removed, and trash left behind.
- **Recommendation [est.]:**
  - Present the two error types as **"False alarm" (stopped for nothing)** and **"Missed it" (didn't stop for something real)**.
  - Make the *cost* asymmetric and visible: a false alarm makes passengers spill their drinks and the taxi late; a miss sends a cone or a duck-shaped barrier flying, never a person.
  - Ask "Which mistake is worse here? Would it be the same for a pizza-delivery robot?" Children aged 9+ can reason about trade-offs when the costs are concrete. That is a developmental inference, not a measured finding **[est.]**.

### 3.5 Explaining confidence scores to 7–13 year olds
- **Evidence:**
  - Children already treat confidence as a readable signal (Dwivedi).
  - Children track their own confidence well before they can describe it. https://lpc.univ-amu.fr/en/doc/hal-03783782/_5.html
  - Children's trust in a source depends on that source's expressed confidence. https://escholarship.org/uc/item/1d79c8s3
  - That last point is double-edged: a confident AI is believed more.
- **Design guidance [est., grounded in the above]:**
  1. Use a **fuel gauge or face meter** with 3 bands (Not sure / Fairly sure / Very sure) alongside the number. Children aged 7–8 read bands; 11–13 year olds can handle percentages.
  2. Script at least one **confidently wrong** case (high % on the wrong label) and one **unsure but right** case, so that % sure ≠ correct.
  3. Use the phrase **"% sure is how much it matches what it was taught — not whether it's true."**
  4. Borrow the Snapshot Serengeti rule: **below a threshold, Pip asks a human**. This makes low confidence useful, not shameful. https://arxiv.org/abs/1703.05830

### 3.6 Ethics of using real autonomous-vehicle crashes in teaching
- **What happened in the real cases:**
  - **Uber Tempe, 2018 (NTSB):** the system cycled the pedestrian's label between vehicle, bicycle and "other", so it could not predict her path. It also could not classify a pedestrian outside a crosswalk.
  - Emergency braking was needed only about 1.3 s before impact. NTSB also criticised Uber's safety culture.
  - Sources: https://spectrum.ieee.org/ntsb-investigation-into-deadly-uber-selfdriving-car-crash-reveals-lax-attitude-toward-safety, https://www.nbcboston.com/news/business/self-driving-uber-car-that-hit-killed-woman-did-not-recognize-pedestrians-jaywalk/1977891/
  - **Sticker attack (Eykholt et al., CVPR 2018):** graffiti-like stickers caused a stop sign to be read as "Speed Limit 45" in 84.8% of video frames from a moving vehicle. https://arxiv.org/abs/1707.08945
- **Gap:** I found no guidance specific to teaching with fatal-crash case studies.
- **General trauma-informed principles** (safety, transparency, voice and choice, peer support), as summarised from SAMHSA in https://journalhosting.ucalgary.ca/index.php/jet/article/view/78633:
  - children may have personal experience of road accidents;
  - a real death is a named person with family;
  - mixed-age drop-in settings (museums, camps) cannot screen for this.
- **Recommendation:**
  - **On screen:** fictional, non-injury analogues only. Pip mistakes a plastic bag for a hedgehog, keeps switching between "bin" and "person" for a scarecrow, or misreads a stickered sign. Every miss hits a soft prop (cones, a hay bale) and a safety-driver robot or barrier always stops the car.
  - **Facilitator card, optional, 11+ only:** "Real engineers study real mistakes — once, a test car kept changing its mind about what it was seeing, and that made it hard for it to predict where the thing would go. That's why testing and safety drivers matter." No names, no death, no images. Respect children's choice to ask more.
  - **Hand the agency to people:** NTSB found *organisational* failures, not just a model error. This supports the Druga & Ko finding that children should come to see that *people* are responsible.

---

## 4. Success patterns (synthesis)

| # | Pattern | Strongest evidence |
|---|---|---|
| P1 | The child's own labels drive behaviour that is visible straight away | AI for Oceans; Teachable Machine; Donkey Car |
| P2 | Live confidence, as numbers or bars | Dwivedi 2021; Druga & Ko 2021; Quick, Draw! spoken guesses |
| P3 | Objective → ambiguous → subjective labels | AI for Oceans levels 2→8 |
| P4 | Test on new data, ideally made by someone else ("break my model") | Dwivedi 2021 model swap; Druga "dogs with sunglasses"; The Tech's Part 2 deck |
| P5 | Out-of-distribution surprises (a species that fits neither category) | The Tech Unplugged Part 2; CU Boulder dog vs bag |
| P6 | Comparison with the crowd or peers | Moral Machine; Quick, Draw!; Druga peer debate |
| P7 | Agreement and redundancy as data quality | reCAPTCHA; ImageNet triple labelling; Zooniverse consensus |
| P8 | Human in the loop for uncertain cases | Snapshot Serengeti confident-only; Zooniverse machine-first review |
| P9 | A real-world purpose (ocean, wildlife, Mars) | AI for Oceans; The Tech; AI4Mars |
| P10 | Short sessions with a certificate or artefact | Hour of Code certificates; about 45–60 min norm |

## 5. Pitfalls

- **Anthropomorphism:**
  - a cute named bot with emotions;
  - children echoing a confident agent;
  - fix: give credit to people, use the "Pip is a guesser" framing, and invite children to disagree.
- **"100% = right":** a documented misreading (Dwivedi). Fix: confidently-wrong moments.
- **Oversimplification:**
  - perfect results after 5 examples;
  - binary choices only;
  - the trolley-problem framing that self-driving cars "choose who dies" (Moral Machine).
  - Fix: show residual errors after retraining; focus on perception, not morality.
- **Gaming the labels:**
  - It is inevitable, and Code.org invites it ("train it incorrectly").
  - I found no study measuring it **[inferred]**.
  - Fix: make sabotage a *scheduled* round with a debrief ("what did your trick teach Pip?").
- **Fragile tech:**
  - the broken Minecraft world;
  - expensive kits (LEGO, Zumi, Duckietown).
  - Fix: scripted, self-contained browser content (DeltaOps already does this).
- **Fear and trauma** from real crashes: see 3.6.
- **Hidden labour:**
  - Crowd labellers are often low-paid (ImageNet critique).
  - The reCAPTCHA–Waymo myth repeats an unverified claim.
  - Fix: tell these stories accurately.

---

## 6. Implications: recommendations for DeltaOps (tied to evidence)

1. **Show both a confidence band and a %, and script confidently-wrong moments.** In every perception lab, include at least one "very sure but wrong" and one "unsure but right" event. (Dwivedi 2021; Druga & Ko 2021)
2. **Add a "Pip asks a human" rule.** Below 60% sure, the helper pauses and the world shows a "?" bubble. A child decides, and the decision becomes new training data. (Snapshot Serengeti; Zooniverse)
3. **Follow the objective → edge case → subjective arc** across the 6 stages. (AI for Oceans)
4. **Run a scheduled "Trick Pip" round,** so gaming becomes the lesson. (Code.org "train it incorrectly"; Dwivedi model swap; Druga adversarial tests)
5. **Swap models between teams.** Even with scripted AI, team A's training set can be "tested" by team B's surprise deck. (Dwivedi 2021)
6. **Use agreement as data quality:** three votes per tricky image, keep the majority, and show the split. (reCAPTCHA; ImageNet)
7. **Include an out-of-distribution card** in every lab: something the model was never taught. (The Tech Unplugged Part 2)
8. **Keep it to perception, not trolley ethics.** Swap "who should it hit" for "what didn't it see and why". (Critique of Moral Machine framing; CU Boulder dog vs bag)
9. **Make facilitator language credit people:** "We taught it", "the engineers decided". Count anthropomorphic slips as a facilitator-observation metric. (Druga & Ko)
10. **No real crashes on screen.** Soft-prop consequences only, with an optional 11+ facilitator note. (Section 3.6)
11. **End with an artefact plus a real-world link** (licence, field-guide card, rover permit), plus a Zooniverse project to try at home. (AI for Oceans wrap-up; AI4Mars; Zooniverse)
12. **Run the AI4K12 Big Idea 1 (Perception) check:** each lab should name the *sensor* (camera, microphone) and its limits, such as fog, night or odd angles. (AI4K12: "how sensor limitations affect computer perception", grades 6–8) https://ai4k12.org/gradeband-progression-charts/

---

## 7. Full specification: "Robo-Taxi Island" (AI Road Lab)

**Pitch.** A floating voxel island with a tiny town: a school, a bakery, a duck pond, a farm lane and a lighthouse road. Pip is a small blocky robo-taxi with a camera on its roof. Pip *does not know anything* until the children teach it with picture cards. A **safety-driver robot ("Marge")** always sits in the back with a big red button, so nothing bad ever really happens.

**Format fit.**
- 6 stages × 3 instruction cards; card **C** is always the deliberately vague one.
- A scripted AI helper (Pip's "guess bubble") shows a label, a % and a band.
- The world changes; a facilitator card; a retry.

**Session time:** 35–45 min **[est.]**.

**Meters (top bar, rounded app UI):**
- 🟢 **Safe Trips** (0–6): stops correctly for real things.
- 🟠 **False Alarms**: needless stops. Visible cost: a passenger's milkshake wobbles and the clock adds +1 min.
- 🔴 **Missed It**: didn't stop. Visible cost: a soft cone or hay bale is bumped and Marge hits the red button.
- 🔵 **Pip's Picture Book**: the number of training cards, by class, as tiny thumbnail stacks, so data can be inspected quickly (Dwivedi).

**Confidence display:** a bubble with a label, a % and a 3-segment bar (Not sure <60 / Fairly sure 60–84 / Very sure ≥85). Below 60%, Pip shows "?" and asks the children: "Help! What is this?"

### Stage 1 — "Teach Pip to See" (objective labels)
- **Objects:** person (adult walking), car, bicycle, tree, postbox.
- **Cards:**
  - A: "Drag 3 *person* pictures into Pip's Picture Book."
  - B: "Drag 3 *car* pictures, then press Drive."
  - C *(vague)*: "Teach Pip about things on the road."
    - The intended discovery: children who add trees and postboxes to "stop" make Pip brake at every tree, so False Alarms rise.
- **Pip lines:**
  - "Person… 91% sure. Stopping!"
  - "Car… 88% sure. Waiting."
  - With vague-card data: "Tree is a… stop thing? 70% sure." *(brakes needlessly)*
- **World effect:**
  - Pip completes a loop and townsfolk wave.
  - With vague data, Pip stutters, and the milkshake meter wobbles.
- **Facilitator Q:** "How did Pip know that was a person? Did Pip *understand*, or did it match pictures?"

### Stage 2 — "Who's Missing?" (unrepresentative data)
- **Setup:** the starter picture book only contains *adults walking*.
- **New objects:**
  - a child on a scooter;
  - a person in a wheelchair;
  - a person with a big umbrella;
  - a person pushing a pram.
- **Cards:**
  - A: "Drive past the school. Watch Pip's % sure."
  - B: "Add 2 pictures of people that look *different* to Pip's book."
  - C *(vague)*: "Make Pip better at people."
    - Children who just add *more adults walking* see no improvement. A gentle hint appears: "Pip already has 12 walking grown-ups…"
- **Pip lines:**
  - Scooter child: "Bicycle?… Person?… Bicycle?… 48% — I'm not sure!"
    - The flicker is a deliberate, gentle echo of the label-flipping in the NTSB Uber findings, with no crash.
  - After the fix: "Person — 87% sure. Stopping."
- **World effect:** before the fix, Marge presses the red button, Pip stops with a jolt, and the 🔴 meter ticks. After the fix, the school crossing lights glow green.
- **Facilitator Q:** "Who was missing from Pip's picture book? Who might be missing from real computers' picture books?"

### Stage 3 — "Weird Things on the Road" (edge cases and false alarms)
- **Objects:**
  - a plastic bag blowing;
  - a puddle reflecting a person;
  - a person in a dinosaur costume;
  - a scarecrow by the farm lane;
  - a duck crossing (real animal).
- **Cards:**
  - A: "Drive the farm lane. Count Pip's false alarms."
  - B: "Make a new card class: *Safe to drive through*. Add the bag and the puddle."
  - C *(vague)*: "Fix Pip's mistakes."
    - The trap: children who put the *duck* in "safe to drive through" because it is small get a 🔴 miss, as Pip bumps a duck-shaped hay bale while the real duck flutters off safely.
- **Pip lines:**
  - Bag: "Animal! 76% sure. STOP!" *(false alarm)*
  - Dinosaur costume: "Dinosaur?? I've never seen one. 31%. Asking a human…" *(? bubble; the child decides)*
  - Scarecrow: "Person… 94% sure!" *(confidently wrong, still a false alarm)*
- **World effect:** the milkshake spills on false alarms; the duck family crosses on correct stops.
- **Facilitator Q:** "Which mistake is worse: stopping for a bag, or not stopping for a duck? Would it be the same for a pizza robot?"

### Stage 4 — "Night and Fog" (the sensor's limits; same objects, new conditions)
- **Setup:** the day/night slider and fog roll in from the lighthouse.
- **Cards:**
  - A: "Turn the night on. Watch the % sure drop."
  - B: "Add 2 *night-time* pictures of people and bikes."
  - C *(vague)*: "Help Pip see better."
    - Options are "add more day pictures", "add night pictures" or "turn on headlights". Headlights help a bit, but night pictures help more.
- **Pip lines:**
  - "Something… 42%… Asking a human."
  - After training: "Bicycle — 81% sure, even in fog!"
- **World effect:** the fog shader thins as confidence rises, and the lighthouse beam sweeps.
- **Facilitator Q:** "Pip's camera is like an eye. What other 'senses' might a real car need when it's foggy?" (AI4K12 Big Idea 1)

### Stage 5 — "Trick Pip!" (the gaming round, made official)
- **Setup:** teams secretly choose one trick:
  - a sticker on the STOP sign;
  - a cardboard person cut-out;
  - a cat that looks like a cone;
  - mislabelling 2 cards in the other team's picture book.
- **Cards:**
  - A: "Choose a trick card and play it on the other team's road."
  - B: "Now drive *your* Pip. Did the other team trick it?"
  - C *(vague)*: "Stop tricks from working."
    - Open-ended. Scripted good answers: add stickered-sign pictures, check for agreement, use a second clue such as the sign's shape or location.
- **Pip lines:**
  - Stickered sign: "Speed sign — GO! 89% sure." *(confidently wrong; Marge brakes)*
    - This is a child-safe echo of Eykholt et al.'s stop-sign stickers.
  - Mislabelled cards: "Car… is a person? My book says so. 77%."
- **World effect:**
  - the trick card plays a mischievous puff of confetti;
  - a "detective magnifier" icon appears on the cards that were tampered with;
  - teams then swap roles.
- **Facilitator Q:** "Your trick worked! What did it teach us about Pip? Should one sign be Pip's *only* clue?"
- **Why:** it channels children's urge to game the system into learning (Code.org "train it incorrectly"; Dwivedi model swap; Druga adversarial testing).

### Stage 6 — "Three Teams Agree" (data quality by consensus, plus the final drive)
- **Setup:** 5 tricky pictures:
  - a blurry cyclist;
  - a person holding a large mirror;
  - a dog in a raincoat;
  - a traffic cone with a hat;
  - a shadow.
- **Cards:**
  - A: "Each team labels the 5 tricky pictures."
  - B: "Pip keeps the label most teams agree on. Look at where you disagreed."
  - C *(vague)*: "Send Pip on its final trip."
    - Children choose which agreed labels to trust, and whether to keep "Ask a human" turned on.
- **Pip lines:**
  - "3 out of 3 teams said Dog. I'm 93% sure."
  - "Teams split on the shadow. I'll ask a human whenever I see one."
- **World effect:**
  - the final grand loop through the whole town;
  - the lights turn green where teams agreed;
  - a fireworks firefly swarm over the island;
  - the Safe Trips meter fills.
- **Facilitator Q:** "When people disagree, who should decide what the right label is? Who made Pip clever — Pip, or you?"
- **Precedents:** reCAPTCHA, ImageNet, Zooniverse consensus; Druga & Ko on agency.

### End artefact — "Pip's Driving Licence" (print or download, no accounts)
- **Front:**
  - a voxel portrait of the team's Pip;
  - a licence number (session code);
  - "Trained by: Team ___" (no names required).
- **Back:**
  - **What we taught Pip:** class icons and counts.
  - **Pip's best mistake:** auto-filled from the session, e.g. "Thought a scarecrow was a person — 94% sure!"
  - **Our safety rule:** the chosen rule, e.g. "If under 60% sure, ask a human."
  - **Badge:** "Humans taught this car. Humans check this car."
  - **Try it for real:** a QR code to a Zooniverse project.

### Facilitator notes (card back)
- **Key ideas:**
  1. Computers learn from examples, not understanding.
  2. Missing examples lead to mistakes for some people or things.
  3. % sure is not the same as right.
  4. Some mistakes cost more than others.
  5. People decide, check and are responsible.
- **Watch for anthropomorphic talk** ("Pip is sad", "Pip is stupid"). Reframe it: "Pip hasn't seen enough examples of that."
- **Optional 11+ aside on real-world testing** (see 3.6): no names, no injuries.

---

## 8. Three alternative perception labs for DeltaOps venues

### 8.1 "Camera Trap Detectives" (nature centres; extends Eco AI Explorer / Grow Lab)
- **Island:** a woodland and pond at night, with 4 trail cameras on posts. The helper is "Owlbot", a sorting machine at the ranger hut (deliberately *not* a talking owl).
- **Stages:**
  1. Label fox / badger / deer / "empty".
  2. **Empty frames**: wind-blown grass triggers the camera. False alarms fill the ranger's inbox.
  3. **Night infrared**: everything is grey. Badger vs. cat confusion.
  4. **Only-side-view problem**: the training set has only side-on animals, so a fox walking *towards* the camera reads at 38% (The Tech Unplugged's camera-angle example).
  5. **Surprise species**: an otter or a hedgehog it was never taught. Owlbot must say "I don't know" (The Tech Part 2 out-of-distribution).
  6. **Machine + volunteers**: Owlbot auto-labels pictures it is ≥85% sure of, and volunteers check the rest.
- **World effect:** a "wildlife count" board updates, so mislabels change the conservation decision (e.g. "plant hedgehog highway?").
- **Artefact:** a "Field Survey Report" card.
- **Real-world link:** Snapshot Serengeti / Zooniverse camera-trap projects. https://arxiv.org/abs/1703.05830, https://cse.umn.edu/node/195036

### 8.2 "Museum Mystery Objects" (museums; extends AI Time Traveller / Londinium)
- **Island:** a museum storeroom floating above a Roman dig. The "Catalogue Bot" helps label finds: coin / pottery / tool / jewellery.
- **Stages:**
  1. Clean objects photographed on a white background.
  2. **Broken fragments**: a sherd vs. a roof tile.
  3. **Background shortcut**: all coins were photographed on a blue cloth, so the bot calls *anything on blue* a coin. This reproduces Sandy's "it focuses on the scarf" finding (Dwivedi).
  4. **Who labelled it?** Old museum labels written with outdated or biased descriptions. Kids decide what to keep. This is the subjective-label stage, as in AI for Oceans' "angry/fun".
  5. **Fake or real?** A modern bottle cap among Roman finds (trick round).
  6. **Curators agree**: a three-team vote, with an "ask an expert" threshold.
- **World effect:** the museum gallery fills with correctly placed objects; wrong ones end up in silly displays.
- **Artefact:** a "Museum Catalogue Card" with the object, label, % sure and "checked by".

### 8.3 "Rover Ground Truth" (space and STEM clubs; extends AI Inventor Lab (Mars rover) / Moon Base)
- **Island:** a red voxel crater. The rover "Dusty" must drive to a science target.
- **Classes:** soil / bedrock / sand / big rock (AI4Mars-style **[class list unverified]**).
- **Stages:**
  1. Label safe vs. unsafe ground.
  2. **Sand traps**: smooth sand looks safe, and Dusty gets stuck. This is a high-cost miss, shown by wheels spinning.
  3. **Shadows at low sun**: shadow mistaken for rock, a false alarm and a long detour.
  4. **Martian dust storm**: the camera's limits.
  5. **Trick Dusty**: a painted rock.
  6. **Earth team check**: because of signal delay, the rover decides alone when it is ≥85% sure and waits for Earth when it is unsure.
- **World effect:** the rover's track draws across the map; battery and time meters.
- **Artefact:** a "Mission Driving Permit".
- **Real-world link:** AI4Mars (NASA JPL × Zooniverse), where volunteers labelled Curiosity terrain "to help rovers identify… dangerous terrain". https://www.zooniverse.org/projects/hiro-ono/ai4mars

---

## 9. Gaps, uncertainties and what to check next

**Search budget.** The shared web-search budget ran out during this pass. Remaining gaps:
- **AI for Oceans participant count:** no per-activity number is published. The best proxy is Hour of Code 2019's more than 53M participations. Code.org would need to be asked directly.
- **Machine Learning for Kids:** the worksheet index did not render, so "no self-driving project" is based on secondary listings.
- **Cozmo / Vector Code Lab, Sphero:** no ML-training activity found.
- **Kodu:** no ML in the shipped product.
- **CS Unplugged, V&A, Wayve, Toyota:** nothing child-facing found.
- **COCO numbers and AI4Mars class list:** unverified.
- **Experience AI "Bias in, bias out" images:** gated behind a login.
- **No studies found** on children's precision/recall intuitions, or on ethics guidance for teaching with fatal AV crashes. The recommendations in 3.4–3.6 are reasoned from adjacent evidence and marked [est.].
- **Kids gaming labels:** I found no measured study. The claim rests on activity design notes (Code.org) and adversarial testing observed in Dwivedi and Druga.
