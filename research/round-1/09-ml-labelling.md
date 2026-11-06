# Children and the public training or labelling ML data: what works, and a self-driving lab for DeltaOps

Note on evidence: figures are from the sources linked. Anything marked **[est.]** is my own estimate or inference. Some activities in the brief I could not verify (see the end of section 1).

## 1. The examples

**Code.org AI for Oceans (2019 Hour of Code; ages 8–18)**
- **What it is:** It has about 8 levels. Children sort images as "fish / not fish" with two buttons. The AI then sorts 100 new items and shows the ones it is most sure are fish. Next they train a word of their choice, then subjective words like "angry" or "fun". It ends with a link to a real Zooniverse project. https://curriculum.code.org/hoc/plugged/9/
- **Visibility:** The bot visibly picks trash out of the sea, or fails to.
- **Bias:** Two children who train "angry" get different results. The teacher notes say "the AI reflects students' own opinions" and that children "can also train it incorrectly to see what happens". https://studio.code.org/s/csd5-2024/lessons/15
- **Scale:** I found no separate participant count. It sits inside Hour of Code / Hour of AI, which reaches tens of millions **[est.]**. https://codeorg.medium.com/a-whole-new-hour-of-code-and-a-big-milestone-b0c908967915
- **Session length:** About 45–60 minutes.
- **Lesson for you:** Going from an objective label to a subjective one is the moment bias becomes clear.

**Google Quick, Draw! (2016–)**
- **Loop:** You doodle, and a neural net guesses out loud within 20 seconds. Afterwards you can see other people's drawings of the same thing.
- **Scale:** More than 15 million players and 50 million drawings in 345 categories, released as an open dataset. https://quickdraw.withgoogle.com/data
- **Visibility:** The model's guesses are spoken live ("I see… a pond?"), and you can see why it failed by looking at how other people drew it.
- **Bias:** Players' country is stored with each drawing, so cultural differences in how people draw an object show up in the data.

**Teachable Machine (Google, v2 2019)**
- **Loop:** Record webcam, sound or pose examples into classes, press Train, then test live with confidence bars. No code. https://www.engadget.com/2019/11/07/google-teachable-machine-2/
- **Research with children:**
  - 14 children aged 7–13 trained classifiers and then tested each other's models for robustness, essentially trying to break them. https://conf.researchr.org/details/vlhcc-2021/vlhcc-2021-vl-hcc-main-conference/9/Exploring-Machine-Teaching-with-Children
  - Lesson plans use deliberately unbalanced training sets to produce bias. https://kurikulum.aidetem.cz/metodikyeng/cs_secondary/Computer-science_Cards_machine-learning_03_bias_lesson-plan.pdf
- **Lesson for you:** Live "% sure" bars are the main way children see what the model is thinking.

**Cognimates (Druga & Ko, 2021)**
- **What happened:** 52 children aged 7–12 spent 4 weeks training and coding smart programs.
- **Findings:** They used a scientific-method approach (train, test, revise). They became more sceptical of what devices can do, and moved agency "from the devices to the people who program them". Peer debate drove much of this change. https://par.nsf.gov/servlets/purl/10281504
- **Lesson for you:** This is the strongest evidence that hands-on training reduces anthropomorphism.

**MIT Moral Machine (2016–)**
- **Loop:** Visitors judge self-driving-car dilemmas.
- **Scale:** 39.6 million decisions from 233 countries and territories, from more than 2 million people. Published in Nature in 2018. https://dspace.mit.edu/handle/1721.1/125065
- **Why it worked:** Short binary choices with immediate comparison to everyone else.
- **Pitfall [my view]:** The trolley-problem framing suggests cars "choose who dies". Real failures are about perception, not ethics.

**AWS DeepRacer Student League**
- **Loop:** Students write a reward function and the car trains in a 3D simulator. They race on leaderboards for tuition prizes.
- **Scale:** More than 320,000 participants league-wide in 150+ countries. https://aws.amazon.com/blogs/publicsector/how-two-schools-canada-turkey-competed-aws-deepracer-skill-up-machine-learning
- **Fit:** Ages 16+. The useful idea for you is the replay of a car going off the track.

**Duckietown and Donkey Car**
- **Duckietown:** Small robots drive a town of rubber ducks. It started as an MIT class in 2016 and is now used by 80–175+ universities (sources differ). https://duckietown.com, https://blogs.nvidia.com/blog/jetson-nano-2gb-duckietown
- **Donkey Car:** You drive the RC car around a track yourself to record images and steering, then it imitates you. https://www.donkeycar.com
- **Lesson for you:** "The car learns how *you* drove." A wobbly driver produces a wobbly car, which teaches data quality directly. Both kits are too technical for 7–13.

**Machine Learning for Kids (Dale Lane, IBM)**
- **What it is:** About two dozen projects in which children train text, image or number models and use them in Scratch. Each has teacher notes, and one chapter is literally "biasing the computer". https://ai4k12.org/machine-learning-for-kids/
- **Self-driving:** I could not confirm a self-driving project.

**reCAPTCHA**
- **Origin:** It began as crowd-sourced OCR. It reached 440 million words on 40,000+ sites, at over 99% accuracy. Several people agreeing on a word served as the check. https://www.sciencedaily.com/releases/2008/08/080814154329.htm
- **Self-driving claim:** The common claim that the traffic-light and crosswalk grids train Waymo cars is unverified. Google has denied it. https://prosopo.io/blog/why-am-i-clicking-traffic-lights/
- **Lesson for you:** "Ask several people and keep the answer they agree on" is a child-sized idea about data quality.

**Zooniverse**
- **Scale:** One billion classifications from more than 3 million volunteers as of 2026. Many projects now ask volunteers to check labels a machine made first. https://cse.umn.edu/node/195036
- **Lesson for you:** Humans spot the odd and interesting cases that ML misses. https://arxiv.org/pdf/1903.07776

**Minecraft Education "AI for Good" (2019)**
- **What it is:** A 90-minute world for grades 3–12 where children use AI to predict forest fires near a village. https://thejournal.com/Articles/2019/11/14/Minecraft-Hour-of-Code-Lesson-Focuses-on-AI.aspx
- **Warning:** Minecraft Education's support site says parts are now broken and can't be completed. Hard-to-maintain worlds age badly. https://educommunity.minecraft.net/hc/en-us/articles/20672394051348

**Code.org Dance Party: AI Edition (2023)**
- **What it is:** Children pick 3 emojis, and embeddings choose the visual effects. It is creative, but children don't do much training. https://lesson-plans.code.org/dance-ai-2023/fallback/teacher-lesson-plans/Dance-Party-AI-Edition.pdf

**Museums**
- **Science Museum London, "Driverless: Who is in control?" (2019–20):** An object-led exhibition about trust and ethics, including a 1960 self-guiding Citroën. https://www.ianvisits.co.uk/articles/driverless-who-is-in-control-32122/
- **Museum of Science Boston, "Exploring AI: Making the Invisible Visible":** Visitors compare image and sound datasets to see how choices about data cause biased outcomes. Self-driving cars appear only as an example. https://www.mos.org/press/press-releases/Exploring-AI-Making-the-Invisible-Visible-Exhibit-Announcement

**Real failures you can turn into child-sized stories**
- **Uber Tempe crash, 2018:** The car's system kept switching its label for a pedestrian between "vehicle", "bicycle" and "other", so it could not predict her path. It also could not label anyone a pedestrian away from a crosswalk. https://spectrum.ieee.org/ntsb-investigation-into-deadly-uber-selfdriving-car-crash-reveals-lax-attitude-toward-safety, https://www.nbcboston.com/news/business/self-driving-uber-car-that-hit-killed-woman-did-not-recognize-pedestrians-jaywalk/1977891/
- **Sticker attack:** Graffiti-like stickers made a stop sign read as "Speed Limit 45" in 84.8% of video frames taken from a moving car. https://arxiv.org/abs/1707.08945

**Not verified:** I found no concrete evidence for ML activities in Kodu, Sphero, Cozmo or LEGO SPIKE. LEGO MINDSTORMS Robot Inventor added ML in 2022 (https://par.nsf.gov/servlets/purl/10644814). BirdBrain robots use Teachable Machine. Treat this category as thin.

**Research on misconceptions**
- Finnish children aged 11–12 commonly hold anthropomorphic, "AI is an entity" ideas. https://jyx.jyu.fi/handle/123456789/93279
- Without prompting, only about 34% of children describe ML as "teaching machines". https://arxiv.org/pdf/2404.00728.pdf

## 2. Patterns that work
1. **The child is the source of the data,** and the result clearly depends on their choices (AI for Oceans, Donkey Car, Teachable Machine).
2. **The model's confidence is visible and live** (Quick, Draw!'s spoken guesses, Teachable Machine's bars).
3. **Easy objective labels first, then ambiguous or subjective ones** (fish, then "angry").
4. **Testing on new examples, ideally made by someone else,** to try to break the model (VL/HCC 2021).
5. **Comparison with other people,** which brings out disagreement and culture (Moral Machine, Quick, Draw!, Druga's peer debates).
6. **A link to real labelling work** (Zooniverse wrap-up).

## 3. Pitfalls
- **Anthropomorphism:** a named bot ("A.I.") with feelings strengthens the "it's alive" idea. Druga's results suggest that crediting people as the programmers counteracts it.
- **Oversimplifying:** a binary choice with a perfect result implies ML is just sorting. Ethics-first framing like Moral Machine suggests cars "decide morally" when the real problems are about perception.
- **Gaming the labels:** children deliberately mislabel. Code.org treats this as a feature ("train it incorrectly to see what happens"). I found no study measuring it, so the pattern is **[inferred]**. Make sabotage a planned stage rather than a disruption.
- **Fragility:** the Minecraft world broke over time. Scripted, self-contained content lasts better.
- **Scary real cases:** use the Uber crash only as a facilitator note, never as on-screen content for 7–13.

## 4. Implications for DeltaOps

**Concept: "Robo-Taxi Island" (AI Road Lab).** A voxel island town with a tiny blocky self-driving taxi called "Pip". Present Pip as a *camera plus guesser* that children teach, not a friend with feelings. It shows a guess plus "% sure" over each object it sees.

| Stage | What children label or do | How it shows in the world | Facilitator question |
|---|---|---|---|
| 1 Spot it | Tap cards: person / car / bike / not-important | Pip drives safely past the things it learned | "How did Pip know that was a person?" |
| 2 Few examples | Only adults in the training cards (the vague card says "pick some people") | Pip slows for adults but is only 40% sure about a child on a scooter and hesitates | "Who was missing from our pictures?" |
| 3 Weird things | A plastic bag, a puddle, a person in a dinosaur costume | Pip brakes hard for the bag (false alarm) and is unsure about the costume | "Is stopping for a bag a good mistake or a bad one?" |
| 4 Night and fog | Re-label in low light | Confidence drops in fog, and children add foggy examples | "What does Pip need to see more of?" |
| 5 Sticker sign | A graffiti sticker makes the STOP sign read "GO 45" (based on Eykholt) | Pip rolls on, and the barrier robot stops it | "Should one sign be the only clue?" |
| 6 Agree check | Three teams label the same tricky picture, and the majority label is kept (reCAPTCHA / Zooniverse idea) | Town lights turn green when the labels agree | "What if the teams disagree? Who decides?" |

**End artefact:** a printable "Pip's Driving Licence" card. It lists what the group taught Pip, one mistake Pip made, and the badge "Humans taught this car."

**Recommendations**
1. Start each child on objective labels, then move to ambiguous ones (AI for Oceans' progression).
2. Always show "% sure" and make low confidence visible in the world, for example hesitating or flashing a "?" (Teachable Machine, Quick, Draw!).
3. Script at least one false alarm (the plastic bag) and one miss (the scooter child). Pair each with a "which mistake is worse?" card, which is the precision versus recall idea without the jargon.
4. Make a "trick Pip" round official, so gaming the labels becomes the lesson (Code.org's "train it incorrectly"; children breaking each other's models in VL/HCC 2021).
5. Use cross-team testing and majority voting for data quality (reCAPTCHA, Zooniverse).
6. Credit people, not the robot. Facilitator lines should say "*we* taught it" (Druga & Ko 2021). Avoid giving Pip emotions.
7. Teach the gaps in what Pip has seen, not "who should the car hit". Leave Moral Machine-style dilemmas out for under-13s, or keep them to an optional end discussion.
8. Optionally end with a real citizen-science link, as AI for Oceans does with Zooniverse. A Zooniverse project with an animal-camera theme would fit the nature-centre setting.
9. Keep it scripted and offline-resilient. The broken Minecraft world shows how live-dependency content ages.
10. For museum and camp sessions, aim for 30–45 minutes over the 6 stages **[est.; Hour of Code activities run about 60 min]**.
