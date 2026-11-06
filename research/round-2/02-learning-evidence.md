# 02 — Learning & AI-literacy evidence for DeltaOps AI labs (deep pass)

Prepared for: DeltaOps Learning (short, staff-facilitated, browser-based voxel "AI labs" for ages ~7–13).
Date: 2026-11-04.

## How to read this report

**Verification levels** (each claim is tagged):
- **[FT]** I read the full text, or the full results tables.
- **[ABS]** I read only the official abstract (via Crossref, OpenAlex or the publisher). I did not read the full paper.
- **[SEC]** The claim comes from a secondary summary.
- **[MEM]** The claim comes from prior knowledge of the literature. I could not re-check it in this pass because the web-search budget ran out mid-pass. Verify before quoting externally.

**Access notes:**
- Full texts I could not open: Habgood & Ainsworth 2011 (repository bot-blocked); Sinha & Kapur 2021 (publisher 403); Druga & Breazeal 2017 (TLS failure).
- For all three I used the official abstracts. The Sinha & Kapur abstract does state the grade 2–5 reversal explicitly.
- The web-search budget for this turn ran out partway through. The informal-learning and children's-calibration sections therefore lean partly on [MEM] sources, and they are flagged.

---

## 1. Key sources read in depth (exact figures)

### 1.1 Clark, Tanner-Smith & Killingsworth (2016). *Digital Games, Design, and Learning* [FT]
*Review of Educational Research* 86(1), 79–122. doi:10.3102/0034654315582065. Full text: https://pmc.ncbi.nlm.nih.gov/articles/PMC4748544/

- **Sample:** 69 study samples, N = 6,868. Mean age 13.4 (SD 4.6) for media comparisons and 12.1 (SD 4.0) for value-added comparisons. Most participants were in grade 7.
- **Media comparison (game vs. no game):** g = 0.33 [0.19, 0.48], 209 effect sizes from 57 studies.
- **Value-added comparison (enhanced game vs. basic game):** g = 0.34 [0.17, 0.51], 40 effect sizes from 20 studies.

**Sessions (critical for DeltaOps)**

| Condition | g | 95% CI | Notes |
|---|---|---|---|
| Single session | 0.08 | [−0.24, 0.39] | n = 43, k = 17; not significant |
| Multiple sessions | 0.44 | [0.29, 0.59] | n = 166, k = 40 |

- The difference is significant: b = −0.37, p = .03.
- Total duration (as a continuous moderator) did not matter: b = 0.00.

**Enhanced scaffolding**
- "Enhanced" means going beyond right/wrong feedback: personalised scaffolds, agents, adaptivity, or restructuring to emphasise the learning mechanic.
- Media comparisons: g = 0.48 [0.18, 0.78]. Value-added comparisons: g = 0.41 [0.18, 0.64], k = 9.
- Higher levels of scaffolding were associated with larger effects.

**Visual realism**

| Style | g | 95% CI |
|---|---|---|
| Schematic | 0.48 | [0.13, 0.82] |
| Cartoon | 0.32 | [0.13, 0.50] |
| Realistic | −0.01 | [−0.34, 0.32] |

- Schematic beat realistic (p = .03). This became marginal (p = .09) after controls.

**Narrative**
- Story relevance: relevant g = 0.17 (not significant); none g = 0.44; irrelevant g = 0.63.
- Higher "contextualization" predicted *smaller* effects: b = −0.07, p = .01.

**Anthropomorphism of game entities**

| Level | g | 95% CI | k |
|---|---|---|---|
| Low/none | 0.37 | [0.19, 0.56] | 39 |
| Medium | 0.04 | [−0.26, 0.33] | 9 |
| High | 0.55 | [−0.58, 1.69] | 3 |

- Low beat medium (b = 0.33, p = .047). This was no longer significant after controls (p = .24).

**Player configuration**
- Single player, no competition: g = 0.45.
- Single player, competitive: g = −0.06.
- Collaborative team competition: g = 0.22 (not significant).
- MMO: −0.05.
- Caution: Wouters et al. 2013 (below) found the opposite for group play. Clark et al.'s "collaborative" categories rest on 3–7 studies each.

**Supplementary non-game instruction:** No difference (b = 0.04). The authors attribute this to their stricter coding of what counted as additional instruction.

**Points/badges:** g = 0.53, vs 0.25 for richer mechanics. The difference was not significant, and the authors suspect these studies used lower-order outcomes.

**Quality caveats**
- Experimental studies g = 0.17 vs quasi-experimental 0.43 (p = .051).
- "No-flaw" studies g = 0.15 (not significant).
- Most studies used immediate, lower-order post-tests.
- The authors say the review is "largely silent" on intrinsic vs extrinsic integration, because only one study had a fully extrinsic condition.

### 1.2 Wouters, van Nimwegen, van Oostendorp & van der Spek (2013). *Meta-analysis of cognitive and motivational effects of serious games* [FT, moderator table read]
*J. Educational Psychology* 105(2), 249–265. doi:10.1037/a0031311. PDF: https://ocw.metu.edu.tr/mod/resource/view.php?id=5403

- **Sample:** learning k = 77, N = 5,547; motivation k = 31, N = 2,216.
- **Main effects:** learning d = 0.29, retention d = 0.36, motivation d = 0.26 (not significant). Games were *not* more motivating than conventional instruction.

**Moderators (learning outcomes)**

| Moderator | Condition | d | k |
|---|---|---|---|
| Sessions | One session | 0.10 (ns) | 47 |
| Sessions | Multiple sessions | 0.54 | 30 |
| Supplemented with other instruction | Yes | 0.41 | 29 |
| Supplemented with other instruction | No | 0.20 | 48 |
| Group size | Individual | 0.22 | 63 |
| Group size | Group (mostly dyads) | 0.66 | 13 |
| Age | Children (≤12) | 0.30 | 8 |
| Realism | Schematic | 0.46 | — |
| Realism | Cartoon | 0.20 (ns) | — |
| Realism | Photorealistic | 0.14 (ns) | — |
| Narrative | Yes | 0.25 | — |
| Narrative | No | 0.46 | — |
| Comparison condition | Passive instruction | 0.06 (ns) | — |
| Randomised studies | — | 0.08 (ns) | 35 |
| Non-randomised studies | — | 0.44 | — |

- The authors note that "passive instruction" studies were almost all single-session. The single-session confound probably explains that row.
- The authors explain the supplement effect this way: players "gain intuitive knowledge, but they are not prompted to verbalize the new knowledge". They cite Garris et al. (2002) on debriefing as "the most critical part".

### 1.3 Wouters & van Oostendorp (2013). *Instructional support in game-based learning* [SEC: TUM Clearing House full review]
*Computers & Education* 60(1), 412–425. doi:10.1016/j.compedu.2012.07.018. Review: https://www.clearinghouse.edu.tum.de/wp-content/uploads/2018/12/CHU_KR-2_Wouters1_2013_Spielbasiertes-Lernen.pdf

- **Sample:** 29 studies and 107 comparisons. 907 school pupils (28 comparisons) and 2,768 students/adults (79 comparisons).
- **Overall support effect:** d = 0.34. In-game performance d = 0.19, knowledge d = 0.33, transfer d = 0.62.
- **Support for *selecting* relevant information:** d = 0.46. Support for organising/integrating: d = 0.14.
- **Strongest single types:** modelling d = 0.46; audio narration of text d = 1.24.
- Reflection, feedback and collaboration were positive per secondary sources [SEC]. I did not confirm exact d values for these.
- No age moderation.
- Schematic visuals d = 0.45, photorealistic d = 0.01.
- Significant effects appeared only in peer-reviewed journals, which suggests publication bias.

### 1.4 Sinha & Kapur (2021). *When problem solving followed by instruction works: Evidence for productive failure* [ABS]
*Review of Educational Research*. doi:10.3102/00346543211019105

- **Sample:** 53 studies, 166 comparisons, comparing problem-solving-then-instruction (PS-I) with instruction-then-problem-solving (I-PS).
- **Effect:** g = 0.36 [0.20, 0.51]. With high fidelity to the Productive Failure (PF) design, g ranged from 0.37 to 0.58.
- The publication-bias-adjusted estimate was g = 0.87. **Correction to my earlier brief:** 0.87 is the adjusted figure, not the observed pooled effect.
- **The reversal, verbatim:** "Contrasting trends were, however, observed for younger age learners (second to fifth graders) and for the learning of domain-general skills, for which effect sizes favored I-PS."
- **What this means for DeltaOps:**
  - Ages 7–10 map onto US grades 2–5, the band where the reversal appears.
  - "Clear instructions" is closer to a domain-general skill than a maths concept, which is the other condition where I-PS was favoured.
  - Both point towards brief explicit framing before or immediately after the failure.

### 1.5 Alfieri, Brooks, Aldrich & Tenenbaum (2011). *Does discovery-based instruction enhance learning?* [FT]
*J. Educational Psychology* 103(1), 1–18. doi:10.1037/a0021017

- **Sample:** 164 studies.
- **Unassisted discovery vs explicit instruction** (580 comparisons): d = −0.38 [−0.44, −0.31]. Explicit instruction was better across all ages; adolescents d = −0.53, adults d = −0.26.
- **Enhanced discovery vs other instruction** (360 comparisons): d = 0.30 [0.23, 0.36].
  - Guided discovery d = 0.50.
  - Elicited explanation d = 0.36.
  - Pure "generation" d = −0.15.
  - Worked examples d = 0.06 within this set.
- The benefit of enhanced discovery was significantly *smaller for children (<12)* than for adults.
- Unpublished studies and dissertations showed d = −0.54.

### 1.6 Habgood & Ainsworth (2011). *Motivating children to learn effectively: intrinsic integration* [ABS]
*J. Learning Sciences* 20(2), 169–206. doi:10.1080/10508406.2010.508029

- **Game and ages:** Zombie Division, a maths game, ages 7–11.
- **Study 1:** N = 58, 2 hours, intrinsic vs extrinsic vs control. Teacher-supported. The intrinsic version produced more learning under fixed time.
- **Study 2:** N = 16, free choice. Children played the intrinsic version about 7 times longer.
- **Caveats:** small samples, a single game, and a maths domain.

### 1.7 Jant, Haden, Uttal & Babcock (2014). *Conversation and object manipulation influence children's learning in a museum* [FT]
*Child Development* 85(5), 2029–2045. doi:10.1111/cdev.12252

- **Sample:** N = 78 parent–child dyads. Children's mean age 4.9 (range 2.9–6.6), so younger than the DeltaOps audience.
- **Design:** random assignment to elaborative conversation cards, objects, both, or neither, before visiting a Field Museum exhibit.
- **Talk:** card parents produced more elaborative talk (M = 7.38 vs 4.76; F(1,73) = 4.62, p < .05, η² = .06).
- **Memory:** home reminiscing was recorded 1 day and 2 weeks later. Only 30 families completed both recordings.
  - Overall recall declined over time.
  - But children in the card condition reported *more* information at 2 weeks than at 1 day (Cards × Time F(1,26) = 6.87, p < .01, η² = .14).
- **Takeaway for DeltaOps:** cheap printed question prompts change adult talk, and that talk is linked to retention.

### 1.8 Long & Magerko (2020). *What is AI Literacy? Competencies and Design Considerations* [FT]
CHI 2020. doi:10.1145/3313831.3376727. PDF: https://static1.squarespace.com/static/53c69580e4b08011fc2337bf/t/5e2893e4a9d342214836e832/1579717605435/CHI+2020+AI+Literacy+Paper-Camera+Ready.pdf

- **Method:** scoping synthesis of 150 documents. This is a conceptual framework, not empirical outcome evidence.

**The 17 competencies**
1. Recognizing AI
2. Understanding Intelligence
3. Interdisciplinarity
4. General vs Narrow
5. AI's Strengths & Weaknesses
6. Imagine Future AI
7. Representations
8. Decision-Making
9. ML Steps
10. Human Role in AI
11. Data Literacy
12. Learning from Data
13. Critically Interpreting Data
14. Action & Reaction
15. Sensors
16. Ethics
17. Programmability

**The 15 design considerations**
1. Explainability
2. Embodied Interactions ("in the agent's shoes")
3. Contextualizing Data
4. Promote Transparency
5. Unveil Gradually (prevent overload)
6. Opportunities to Program
7. Milestones (developmental stage, theory of mind)
8. Critical Thinking: "Encourage learners—and especially young learners—to be critical consumers of AI technologies by questioning their intelligence and trustworthiness"
9. Identity, Values & Backgrounds
10. Support for Parents
11. Social Interaction
12. Leverage Learners' Interests
13. Acknowledging Preconceptions
14. New Perspectives
15. Low Barrier to Entry

### 1.9 Druga & Ko (2021). *How do children's perceptions of machine intelligence change when training & coding smart programs?* [FT]
IDC '21. doi:10.1145/3459990.3460712

- **Sample and setting:** N = 52, ages 7–12. Four sites: public-school after-school, community centre, private-school after-school, and a STEM centre. 4 weeks. Children trained models and coded programs (Cognimates).
- **Process findings:** children ran informal experiments. They formed hypotheses (social, egocentric, observational), tested edge cases and common cases, then refined their hypotheses with reference to programming and training. Peer debate drove much of the change.
- **Quantitative findings** (3 sites, 5 of 8 questions, Mann–Whitney U, Bonferroni α = .01):
  - "Will the agent remember you?" shifted to "no": U = 355, p = .004.
  - "Is it friendly?" shifted from yes to maybe/no: U = 149.5, p = .017. The authors call this significant, but it **does not pass their own α = .01**.
  - "Is it smart?" and "Does it understand me?" did not change significantly.
  - "Maybe" answers increased, which the authors read as more nuanced reasoning.
- **Key mechanism:** children who believed an agent was *programmed by someone* were more sceptical. Those who believed the agent was in control overestimated it.

### 1.10 Van Brummelen, Tian, Kelleher & Nguyen (2023). *Learning Affects Trust* [FT, 4-page EAAI paper]
arXiv:2209.05063

- **Sample:** 49 respondents from 99 interested families. 27 children (mean age **13.96**, SD 1.8) and 19 parents.
- **Countries:** WEIRD countries (US, Singapore, Canada, NZ) and non-WEIRD countries (87% Indonesia).
- **Intervention:** a 2-day Zoom workshop building conversational agents in ConvoBlocks.
- **Competence ratings:** WEIRD participants rated Alexa *less* competent after programming (2.43 → 2.95 on a reversed scale; t(20) = −2.33, p = .03). After programming, WEIRD and non-WEIRD participants differed significantly (U = 106.5, p = .004).
- **Relationship framing:** overall, participants moved towards seeing agents as "more of a friend (than a co-worker)" (t(32) = 2.15, p = .039). This is the *opposite* of de-anthropomorphising, so building agents alone did not reduce relational framing.
- **Reasons for trust change:** 24% of participants said their trust changed. The most-cited reason was the agent's *information source*.
  - Trust dimensions cited: predictability 39%, competence 32%, integrity 29%, benevolence 0%.
  - Children cited integrity more often (47%). Parents cited competence more often (54%).
- **Caveats:** high attrition, older children than DeltaOps' audience, an online workshop, and many tests.

### 1.11 Williams, Park & Breazeal (2019). PopBots [SEC]
https://ojs.aaai.org/index.php/AAAI/article/view/5040

- **Sample:** N = 80 pre-K/K children.
- **Assessment means:** about 67% overall. Knowledge-based reasoning 72%, supervised ML 72%, generative AI 52%.
- Younger children came to see robots as "toys smarter than them". Older children saw them as "people not as smart as them".

### 1.12 Schwartz & Bransford (1998). *A time for telling* [SEC from full-text summaries]
*Cognition & Instruction* 16(4). https://www.wright.edu/sites/www.wright.edu/files/uploads/2017/Feb/event/Schwartz_Bransford_1998_TimeForTelling.pdf

- Analysing contrasting cases *then* hearing a lecture beat reading-then-lecture and analysing cases twice.
- Contrasts create "differentiated knowledge" that prepares learners to learn from the explanation that follows.

---

## 2. Children, confidence displays and trust calibration

This is the evidence most relevant to the "% sure" meter.

- **Tenney, Small, Kondrad, Jaswal & Spellman (2011).** *Developmental Psychology* 47(4). doi:10.1037/a0023273 [ABS]
  - Four experiments with ages 5–6 and adults.
  - Both groups used *confidence* and *accuracy* to judge credibility.
  - **Only adults used calibration** (whether confidence predicts being right). "Adults discredited informants who exhibited poor calibration, but children did not."
  - When adults were given a secondary task, they also lost the ability to use calibration. Using calibration is cognitively demanding.
  - **Implication:** a younger child seeing "92% sure" and then a wrong outcome will not spontaneously conclude that the meter is unreliable. That link must be made explicit and repeated.
- **Birch, Akmal & Frampton (2010).** *Developmental Science* 13(2). doi:10.1111/j.1467-7687.2009.00906.x [ABS]
  - Children aged 2–3 prefer to learn from confident-looking models.
  - With a consistent history, they generalise confidence as a credibility cue.
  - The bias to trust confidence starts very early.
- **Danovitch & Alzahabi (2013).** *J. Cognition & Development* 14(3). doi:10.1080/15248372.2012.689391 [ABS]
  - N = 92, ages 3–5.
  - Children selectively trusted a previously *accurate* computer.
  - 4–5-year-olds blamed the device, not the user, for errors.
  - Children *can* use track record with machines. Give them one.
- **Girouard-Hallam & Danovitch (2022).** *Developmental Psychology* 58(4). doi:10.1037/dev0001318 [ABS]
  - Ages 4–5 and 7–8.
  - With age, children trust a voice assistant *more* for facts and a human more for personal information.
  - Endorsement predicted later recall.
  - Older children in DeltaOps' range may therefore lean towards over-trusting AI on "factual-seeming" outputs.
- **Van Brummelen et al. (2022/23)** (above, and the companion child–parent study [SEC]):
  - Children trusted agents more than parents or friends for correct information.
  - Recommended design: "competence and predictability indicators" and transparency about information sources.
- **Adult evidence on confidence displays:**
  - Li et al., *Understanding the effects of miscalibrated AI confidence* (arXiv:2402.07632v4) [ABS]: miscalibration "is difficult for users to detect" and impairs appropriate reliance.
  - Telling users how well the AI's confidence is calibrated helps them detect miscalibration, but then causes under-reliance.
  - AAAI 2026, *Too Sure for Our Own Good*, https://ojs.aaai.org/index.php/AAAI/article/view/38798 [SEC]:
    - Well-calibrated confidence improved accuracy by about 20%.
    - People accepted high-confidence wrong advice.

**Synthesis**

There is a confidence → credibility bias from age 2. Ages 5–6 do not use calibration, and even adults find it effortful. Children do use track records.

A single "% sure" number, shown once per stage, is therefore likely to be read as "how right it is". The fix has three parts:
- Make the meter's track record visible across stages (a tally of when it was sure and right, and sure and wrong).
- Pair the meter with a *check-the-evidence* action.
- Have the facilitator state the rule aloud ("Sure isn't the same as right — we check").

**Gap:** I found no controlled study of children aged 7–13 reading numeric AI confidence displays. This is a genuine research gap, and DeltaOps could contribute to it.

---

## 3. Other AI-literacy programmes: evidence status

| Programme | Evidence status | Source |
|---|---|---|
| Code.org AI for Oceans | No published outcome evaluation found | https://codeorg.medium.com/ai-for-oceans-a-csforgood-activity-14ef6ebd8178 |
| Google Teachable Machine | Qualitative studies. Finnish 6th graders (N = 34) built conceptual ML understanding via data-driven design (Vartiainen et al. 2021, IJCCI, doi:10.1016/j.ijcci.2021.100281) [ABS]. Co-design with 10 children aged 8–13 (Dwivedi et al. 2024, arXiv:2402.18688) [ABS] | — |
| Quick, Draw!, Machine Learning for Kids | No outcome studies found | — |
| Day of AI (MIT RAISE) | Commissioned evaluation: 265 survey registrants, 17 educator interviews; self-reported gains | https://dayofai.org/?p=859 |
| DAILy (MIT) | 30 hours, ages 10–14, 87% from groups under-represented in STEM; experience report with preliminary outcomes (Lee et al. 2021, SIGCSE, doi:10.1145/3408877.3432513) [ABS] | — |
| Interland / Be Internet Awesome | Cluster RCT, N = 1,072, grades 4–6, 14 schools. Knowledge of new concepts and self-efficacy improved. **No impact on privacy, civility, cyberbullying or talking to parents** (behaviour) [ABS] | https://link.springer.com/content/pdf/10.1007/s40688-023-00465-5.pdf |
| Experience AI (Raspberry Pi Foundation + Google DeepMind) | Secondary-age; 180+ countries, 19 languages. 2026 impact report is self-report surveys: 89% of students (survey n = 23,985) "better understand" how AI works; 90% of educators say it increased knowledge. No pre/post test or comparison group reported. **Design principles relevant to DeltaOps:** "avoiding anthropomorphism in explanations and images", and contrasting data-driven with rule-based computing; built on the SEAME framework | https://static.raspberrypi.org/files/about/Experience_AI_Impact_report_2026.pdf |
| Long/Magerko museum exhibits (Knowledge Net, Creature Features, LuminAI) | Design considerations, not outcomes (IDC 2023) | https://informalscience.org/research/fostering-ai-literacy-with-embodiment-creativity-from-activity-boxes-to-museum-exhibits/ ; full paper doi:10.1145/3585088.3594495 |

---

## 4. Educational world-builders: evidence status (carried forward)

- **Minecraft.**
  - Slattery et al. 2025: 29 studies, all at medium or high risk of bias [SEC]. https://www.citedrive.com/en/discovery/assessing-the-benefits-of-digital-gamebased-learning-with-minecraft-in-children-adolescents-and-young-adults-a-broad-systematic-review/
  - Alawajee & Delafield-Butt 2021 [SEC]. https://strathprints.strath.ac.uk/78811
- **Eco (Strange Loop Games).** IES SBIR pilot: N = 88, 2–4 weeks of play vs comparison. Players were higher on environmental attitudes and systems knowledge [SEC]. https://ies.ed.gov/sbir/ECO.asp
- **SimCityEDU / GlassLab.** Assessment R&D only; I found no published outcome study.
- **Civilization III.** Squire (2004 dissertation) [MEM]: qualitative; learning emerged through teacher-mediated discussion.
- **Kerbal Space Program EDU, Roblox, park tycoons.** No rigorous outcome studies found.
- **Foldit.** Cooper et al. 2010, *Nature* 466:756. Shows players can contribute to science; it is not learning evidence.

---

## 5. Informal learning: museums, facilitation, camps

- **Jant et al. 2014** [FT]: see §1.7. Printed elaborative prompts increased explanatory talk and 2-week recall.
- **Allen (2004)**, *Designs for learning* (Exploratorium). *Science Education* 88(S1). doi:10.1002/sce.20016 [ABS]. Four design areas:
  - immediate apprehendability
  - physical interactivity
  - conceptual coherence
  - diversity of learners
  - Exhibits must be intrinsically motivating "at every step".
- **Gutwill & Allen (2010)**, "Facilitating family group inquiry at science museum exhibits", *Science Education* [MEM]. Teaching families short inquiry "games" (e.g. asking a "juicy question", proposing actions) increased inquiry behaviours at exhibits.
- **Borun et al. (1998)**, PISEC family-learning study [MEM]. Seven characteristics of family-friendly exhibits: multi-sided, multi-user, accessible, multi-outcome, multi-modal, readable, relevant. These map onto group play at one screen.
- **Pattison & Dierking and colleagues** on staff facilitation [MEM]. Quasi-experimental museum studies found educator facilitation increased family engagement time and inquiry behaviours at interactive exhibits. Over-directive facilitation can reduce visitor agency.
- **Dwell time** [MEM]: Serrell, *Paying Attention* (1998). Visitors typically spend under about 20 minutes in an exhibition and attend to fewer than half of its elements. A 6-stage lab therefore needs each stage to deliver its point within 2–4 minutes.
- **Holiday camps:** I found no rigorous learning-outcome studies specific to holiday camps (the search budget ran out). The single-session findings (§1.1–1.2) are the best guide: one-off sessions produce small or zero average effects unless they are heavily scaffolded and debriefed.
- **Debriefing:** Crookall (2010; 2014 editorials) [SEC]; Garris et al. (2002), cited in Wouters 2013 [FT]. There is strong consensus that the debrief is where learning is consolidated, but few controlled trials.

---

## 6. UK and international policy context

- **DfE, *Generative AI in education*** (updated 12 Aug 2025) [FT].
  - "Evidence is still emerging on the benefits and risks of pupils… using generative AI."
  - "Pupils should only be using generative AI… with appropriate safeguards."
  - It warns of "hallucination", and says "Any content produced requires critical judgement to check for appropriateness and accuracy."
  - **Fit for DeltaOps:** labs with no live AI and scripted responses fit these safeguards well, and are a selling point.
  - https://www.gov.uk/government/publications/generative-artificial-intelligence-in-education/generative-artificial-intelligence-ai-in-education
- **Curriculum and Assessment Review final report** (DfE, 5 Nov 2025) [FT, relevant sections].
  - Young people "should understand how it works, its capabilities and its limitations… use AI effectively, without becoming dependent on it."
  - It recommends a revised Computing programme of study that will "explicitly incorporate AI" at each key stage.
  - It treats media literacy as including critical engagement with messages "including AI".
  - https://assets.publishing.service.gov.uk/media/690b96bbc22e4ed8b051854d/Curriculum_and_Assessment_Review_final_report_-_Building_a_world-class_curriculum_for_all.pdf
- **National Curriculum Computing** (current) [FT].
  - KS2: "use logical reasoning to explain how some simple algorithms work and to detect and correct errors in algorithms"; "be discerning in evaluating digital content".
  - KS3: "create… digital artefacts… with attention to trustworthiness".
  - DeltaOps' mechanic (precise instructions → predict → debug the instruction) maps directly onto the KS2 algorithms/debugging strand.
  - https://www.gov.uk/government/publications/national-curriculum-in-england-computing-programmes-of-study/national-curriculum-in-england-computing-programmes-of-study
- **Ofsted** (approach to AI, updated 21 Oct 2025) [FT]. It covers Ofsted's own AI use and principles for AI met on inspection. It says nothing on teaching pupils about AI. https://www.gov.uk/government/publications/ofsteds-approach-to-ai
- **UNESCO *AI Competency Framework for Students*** (8 Aug 2024) [FT, landing page].
  - 12 competencies across 4 dimensions: human-centred mindset, ethics of AI, AI techniques and applications, AI system design.
  - 3 progression levels: Understand, Apply, Create.
  - No primary-specific guidance.
  - https://www.unesco.org/en/articles/ai-competency-framework-students
- **OECD / European Commission AI Literacy Framework (AILit)** [FT, landing page].
  - Draft May 2025; final version after more than 2,000 consultation responses.
  - 4 domains: Engage with AI, Create with AI, Manage AI, Shape AI.
  - Covers primary and secondary, and feeds into the PISA 2029 Media & AI Literacy domain.
  - https://ailiteracyframework.org/
- **AI4K12 Five Big Ideas:** Perception; Representation & Reasoning; Learning; Natural Interaction; Societal Impact. https://www.raspberrypi.org/blog/ai-education-ai4k12-big-ideas-ai-thinking/

---

## 7. Evaluation instruments

**Honest finding:** there is **no validated AI-literacy scale for ages 7–13 short enough for a 3-item exit check**.

| Instrument | Population / format | Use for DeltaOps |
|---|---|---|
| Ng et al. 2023 AILQ (*BJET*, doi:10.1111/bjet.13411) [ABS] | 32-item self-report, 4 factors (affective, behavioural, cognitive, ethical); validated with 363 Hong Kong secondary students | Too long, and self-report. Could borrow 1–2 affective/self-efficacy items for ages 11–13 |
| Hornberger et al. 2023 (doi:10.1016/j.caeai.2023.100165) [ABS] | Multiple-choice knowledge test, university students | Reading level too high |
| Kong et al. 2021 (doi:10.1016/j.caeai.2021.100026) [ABS] | Pre/post concept and empowerment survey, university course | Model of a concept + empowerment survey only |
| SAIL4ALL (Soto-Sanfiel et al. 2024) [MEM] | Adult general-population AI literacy scale | Not suitable for children |
| Druga & Ko 2021 AI Perception Game [FT] | 5–8 yes/maybe/no questions about an agent ("Is it smart? Does it understand me? Will it remember me? Does it care about me? Is it friendly?"); used with ages 7–12 in groups | **Directly reusable.** Not psychometrically validated, but child-tested and pre/post sensitive |
| PopBots assessments (Williams et al. 2019) [SEC] | Picture-based concept items, ages 4–6 | Format model for the youngest end |
| Tenney et al. 2011 paradigm [ABS] | Informant-choice task varying confidence and accuracy | Can be adapted into one scenario item that tests whether children use calibration |

**Recommendation:** build a short custom instrument, pilot it, and report its reliability. Clark et al. 2016 explicitly accept custom measures *if* reliability and validity are reported.

---

## 8. Learning-outcomes map for DeltaOps

| Lab mechanic | Target competency (Long & Magerko #; AI4K12; UNESCO/AILit) | Evidence the mechanic supports this | Risk / design note |
|---|---|---|---|
| Choose 1 of 3 instruction cards (one vague) | Instructions must be precise; AI interprets literally. LM #8 Decision-Making, #5 Strengths & Weaknesses; KS2 algorithms; AILit "Engage" | Contrasting cases (Schwartz & Bransford 1998); intrinsic integration, since the choice *is* the learning act (Habgood & Ainsworth 2011) | Choosing from 3 is recognition, not production. Add a build-your-own card step (LM DC6; constructionism) |
| AI helper shows its interpretation ("I think 'nice' means tidy") | AI makes assumptions; human role. LM #10, #17; AI4K12 Representation & Reasoning | Explainability (LM DC1); support for selecting relevant information d = 0.46 (Wouters & van Oostendorp 2013) | Phrase it as a process ("matched 'nice' to 'tidy' in its examples"), not intention ("I wanted…"). Experience AI anti-anthropomorphism principle; Clark 2016 anthropomorphism moderator (tentative) |
| "% sure" meter | Confidence ≠ correctness; calibrated trust. LM #5, DC8; UNESCO human-centred mindset; AILit "Manage" | Children use confidence as a credibility cue from age 2 (Birch 2010) and don't use calibration at 5–6 (Tenney 2011); adults miss miscalibration (Li et al.) | **Highest risk.** Needs a visible track record, a check-evidence action and facilitator rule-statement (§2) |
| World visibly changes (reeds cut → ducks leave) | Consequences of AI actions; societal impact; systems thinking | Immediate apprehendability (Allen 2004); learning mechanic tied to consequence (Habgood) | Keep visuals schematic (Clark: schematic g = 0.48 vs realistic −0.01; Wouters: 0.46 vs 0.14) |
| Facilitator discussion card | Articulating knowledge | Supplement d = 0.41 vs 0.20; group d = 0.66 (Wouters 2013); enhanced scaffolding g = 0.41–0.48 (Clark 2016); elicited explanation d = 0.36 (Alfieri 2011); elaborative prompts → recall (Jant 2014) | Staff vary in skill, so script the questions *and* model answers |
| Retry with a clearer card | Iterative debugging; better inputs → better outputs. KS2 "detect and correct errors" | Guided discovery d = 0.50 (Alfieri); PS-I benefit but **reversed for grades 2–5** (Sinha & Kapur 2021) | For ages 7–10, follow the failure immediately with a short explicit "why" before the retry |
| Group play at one screen | Social construction of AI understanding. LM DC11 | Group d = 0.66 (Wouters); peer debate drove change (Druga & Ko 2021); PISEC multi-user exhibits [MEM] | Clark 2016 found competitive/MMO play weak, so use cooperative, not competitive, play |
| 6 stages in one session | — | Single session d = 0.10 / g = 0.08, not significant (Wouters; Clark) | **Structural risk.** Mitigate with a revisit loop (stage 6 transfer task), take-home card and parent prompt (Jant), and repeat-visit offers for clubs |
| Themed islands (pond, Londinium, Mars…) | Leverage interests (LM DC12); transfer across contexts | Narrative/contextualisation did *not* help on average (Clark contextualization b = −0.07; Wouters narrative 0.25 vs 0.46) | Keep the story thin and relevant to the AI lesson; don't let theme content compete for attention (LM DC5 Unveil Gradually) |

---

## 9. Recommended evaluation design

**Goal:** credible, low-burden evidence that one 30–45-minute lab changes children's reasoning about AI, plus some retention data. Avoid self-report-only claims, which are the weakness of Day of AI and Experience AI.

### 9.1 Design
1. **Pre/post within session.** 3 items, about 90 seconds each, tapped on the same screen. Use **parallel forms** (scenario A pre, scenario B post) to avoid simple recall.
2. **Comparison condition:** randomise at the **session level** at clubs and camps, which run repeat sessions.
   - (a) Full lab vs (b) the same lab without the facilitator debrief cards, or without the confidence track record.
   - This is a value-added design, which Clark et al. recommend over media comparisons.
3. **Delayed check at 2–4 weeks** where possible (clubs and schools; not walk-up museum visitors). Use the same 3 items plus one transfer item in a new context.
4. **Observation rubric** (see 9.3). Use 2 coders on 20% of sessions and report inter-rater agreement (Jant et al. reached κ = .96 with a similar coding scheme).
5. **Engagement log**, which the browser can record automatically: time per stage, card choices, retries. This complements, and does not replace, learning measures, because novelty inflates enjoyment.
6. **Ethics:** collect no personal data from children; use session codes. Get consent from staff and parents for observation.

### 9.2 The 3-item exit check

Pictorial; read aloud by the facilitator for ages 7–8.

1. **Literal interpretation and assumptions (transfer).**
   - Prompt: "A robot gardener is told 'Make the garden tidy.' What might it do that you DIDN'T want?"
   - Format: pick 1 of 3 pictures. One shows a plausible over-literal result (e.g. pulls up wildflowers); one shows a correct result; one is irrelevant.
   - Optional follow-up: "Which instruction is better?" (choose 1 of 3).
2. **Confidence ≠ correctness** (adapted from the Tenney et al. 2011 paradigm).
   - Prompt: "Helper A said '95% sure' and was wrong twice. Helper B said '60% sure' and was right both times. Which helper should we check more carefully next time?" (A / B / both the same)
   - Optional extra: "It says 99% sure. What should we do? Trust it / Check / Ignore it."
3. **Agency / human role** (adapted from Druga & Ko's AI Perception Game).
   - Prompt: "When the helper got it wrong, why did that happen?"
   - Options: (a) it was being naughty, (b) it guessed from what it had learned and the instruction was unclear, (c) it's broken.
   - Score anthropomorphic attributions separately.

Pilot with about 60 children. Report item difficulty, discrimination, and agreement between pre and post forms.

### 9.3 Observation rubric

Per group, per stage. Score 0, 1 or 2 for each item.

| Code | 0 | 1 | 2 |
|---|---|---|---|
| Prediction | No prediction before reveal | Prediction made | Prediction with a reason |
| Explains AI behaviour | No explanation, or "it's silly" | Describes what happened | Mechanistic: "it matched 'nice' to 'tidy'" |
| Anthropomorphic talk (count) | Wants / feels / naughty / likes us | — | — |
| References confidence | Ignores the meter | Notes the % | Questions it: "it was sure but wrong" |
| Revises instruction | Random pick | Picks the clearer card | Says *what* made it clearer (constraint, object, "but keep…") |
| Peer explanation | None | One child explains to another | Disagreement resolved with evidence |
| Facilitator move | Tells the answer | Asks a question | Asks, waits, revoices the child's idea |

### 9.4 Analysis and reporting
- Analyse pre→post change with a McNemar test or mixed models, clustering by session.
- Report effect sizes with confidence intervals, and split results by age band (7–9 vs 10–13), given the Sinha & Kapur and Tenney age effects.
- Publish the results. Almost no AI-literacy activities for this age range have outcome data, so this would be a differentiator.

---

## 10. Facilitator script template (per stage)

Grounded in: Wouters 2013 (supplement and group), Alfieri 2011 (elicited explanation, guided discovery), Sinha & Kapur 2021 (explicit "why" for younger learners), Jant 2014 (elaborative wh-questions), Tenney 2011 (state the calibration rule explicitly), and Long & Magerko DC8 and DC5.

```
STAGE [n] — [Island]: [Goal, e.g. "Make the pond better for ducks"]
Time budget: 4–6 min

1. SET UP (20 s)
   Say: "The helper only knows the words we give it. Let's see what it does."

2. PREDICT TOGETHER (40 s)        [elicited prediction]
   Read the three cards aloud. Ask: "Which card will work best? What do you
   think the helper will do with THIS one?" (point at the vague card)
   Hands up / point. Accept all answers. Do not correct yet.

3. CHOOSE & REVEAL (30 s)
   Let the group choose. Read the helper's guess AND its % sure aloud.
   Ask: "How sure is it? Do we think it's right?"

4. NOTICE (40 s)                  [elaborative wh-question]
   After the world changes: "What happened to the [ducks/reeds/...]?
   Why do you think the helper did that?"
   Model-answer prompt (if stuck): "Look — it thought 'nice' meant 'tidy'.
   Tidy things have no long reeds."

5. EXPLAIN IT PLAINLY (20 s)      [explicit telling; essential for ages 7–10]
   Say the rule: "The helper didn't know what WE meant. It made a guess
   from the word 'nice'. Clear words → better guesses."
   Use process words ("it matched", "it guessed", "it picked"),
   never feeling words ("it wanted", "it was trying to be kind").

6. CONFIDENCE CHECK (30 s)        [calibration made explicit]
   Point to the track-record bar: "It said 92% sure — and was it right?
   Being SURE isn't the same as being RIGHT. How could we check?"
   (Tap the magnifier: "Here's why it guessed.")

7. RETRY (60 s)                   [guided discovery]
   "Which card tells it exactly what we want? What words make it clearer?"
   Ask one child to explain the choice to another before tapping.

8. COMPARE (20 s)                 [contrasting cases]
   Show before/after side by side: "What's different between the two
   instructions? What's different in the world?"

Facilitator DON'Ts: don't give the answer before step 5; don't say the AI
"thinks/feels/wants"; don't let one child drive — rotate the tapper.
```

**Closing debrief** (3 minutes, whole group; the Crookall and Garris "most critical part"):
1. "What's one thing the helper did that surprised you?"
2. "Finish the sentence: AI helpers follow instructions ___." (literally)
3. "When it says it's very sure, what should we do?" (check the evidence)
4. "What will you do differently next time you ask a computer or a voice assistant?"
5. Hand out a take-home family card (Jant 2014; LM DC10) with 3 questions for parents to ask, e.g. "What did the helper get wrong, and why?"

---

## 11. Updated implications for DeltaOps (supersedes the earlier brief)

1. **Single-session labs are the biggest structural risk.** Both meta-analyses found single-session games gave no reliable learning gain: d = 0.10 (Wouters 2013) and g = 0.08 (Clark 2016). Compensate with:
   - heavy built-in scaffolding and debrief
   - a stage-6 transfer task
   - a take-home card
   - multi-session packages for clubs and camps
2. **Put a brief explicit "why" right after each failure, especially for ages 7–10.** Sinha & Kapur 2021 found the PS-I advantage reversed for grades 2–5 and for domain-general skills. Alfieri 2011 found children benefit less than adults from discovery formats.
3. **Redesign the confidence meter** around a track record, an evidence action, and a spoken rule. Children use confidence as a credibility cue (Birch 2010) but not calibration (Tenney 2011). Children use accuracy history with machines (Danovitch & Alzahabi 2013).
4. **Use process language, not character language,** for the AI helper. This follows the Experience AI design principle, Druga & Ko's agency → over-estimation link, and Van Brummelen's finding that programming alone made agents seem *more* like friends. Clark 2016's anthropomorphism moderator is tentative.
5. **Show information sources** ("I learned 'nice' from these examples"). Information sources were the top-cited reason for trust change (Van Brummelen 2023), and this matches LM DC4 (Transparency).
6. **Cooperative group play, not competitive.** Group play d = 0.66 (Wouters); competitive single play g = −0.06 (Clark); peer debate drove change (Druga & Ko).
7. **Keep visuals schematic and narrative thin.** Schematic visuals g = 0.48 vs realistic −0.01 (Clark), d = 0.46 vs 0.14 (Wouters). Narrative-free games did better (0.46 vs 0.25), and contextualisation predicted smaller effects.
8. **Script facilitator questions and model answers, and print family prompt cards.** Supported by Jant 2014 and Wouters & van Oostendorp 2013 (modelling d = 0.46).
9. **Add one production step** (assemble an instruction from fragments). Supported by LM DC6 and constructionism, plus Alfieri's finding that pure generation without guidance is weak (d = −0.15). So scaffold it.
10. **Include right-and-sure stages** so children learn "check", not "AI is always wrong". Li et al. show calibration messaging can cause under-reliance.
11. **Map to UK frameworks in sales materials:** KS2 algorithms/debugging and discerning evaluation; the Curriculum and Assessment Review's call to teach AI's "capabilities and its limitations"; the DfE safeguarding stance, which the no-live-AI design satisfies; UNESCO "Understand"; AILit "Engage/Manage".
12. **Run the evaluation in §9,** with value-added comparisons, a delayed check and an observation rubric, and publish it. The field's evidence for this age group and format is thin and mostly self-report: Experience AI, Day of AI, and AI for Oceans with none. Interland's RCT shows knowledge gains without behaviour change, a caution against over-claiming.

---

## 12. Gaps and limits of this pass

- **No controlled studies found** on (a) children aged 7–13 reading numeric AI confidence displays, (b) holiday-camp learning outcomes, or (c) museum AI-exhibit learning outcomes.
- **[MEM] items to verify before external use:** Gutwill & Allen 2010; Borun et al. 1998; Pattison/Dierking facilitation studies; Serrell 1998; Squire 2004; SAIL4ALL. They are flagged because the web-search budget ran out mid-pass.
- **Full texts not obtained:** Sinha & Kapur 2021 (I used the official abstract; the moderator table was not read); Habgood & Ainsworth 2011 (abstract only); Druga & Breazeal 2017; Wouters & van Oostendorp 2013 (secondary full review only).
