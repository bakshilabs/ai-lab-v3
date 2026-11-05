# Council Data Desk: design document

> Strand: Future Skills · Ages: 11–16 (Core 11–13, Pro 14–16) · Session: 45 / 60 / 90 min · Trailer: `games/trailers/fs-data/` (`out/fs-data.mp4`, not yet rendered)

## 1. Summary
Learners join the Harbourside Council Insight Team as junior data analysts. Their brief is to answer a councillor's question, "Which wards need more streetlight repairs?", using 120 synthetic fault reports. They clean the data, draw one chart and review the AI colleague's finding: "Old Quay has the fewest faults, so its streetlights are in the best condition" (94% sure). It fails the **Data check**: most Old Quay residents are over 65, few use the reporting app, and 9 streets sent no reports. Learners rewrite the finding, propose better data and sign off a one-page Data Brief. The lesson: **few reports is not the same as few faults**, and an analyst owns the conclusion, not the tool.

## 2. Learning outcomes
By the end, learners can:
- name at least four data-quality problems in a table (duplicates, inconsistent names, mixed date formats, blanks recorded as zero) and record each in a data-quality log;
- explain the difference between "no reports" and "no problem", using the Old Quay example;
- choose a chart that answers the question asked and label it honestly;
- run the Four Checks (Data · Case · Source · Authority) on an AI-written finding and decide to approve it or send it back with a note;
- write a finding that states its limits ("We are not sure about…", "This data can't tell us…") and propose one way to collect better data.

**Curriculum links (England; paraphrased, to verify).** KS3 Mathematics (interpret charts, compare distributions); GCSE Statistics (data collection, sampling, bias); KS3 Computing (analyse and present data); Citizenship (local government); the future computing GCSE (data and AI), per the [Curriculum and Assessment Review](https://www.bcs.org/articles-opinion-and-research/reformed-school-curriculum-will-feature-ai-media-literacy-and-a-new-computing-gcse/).

**Frameworks.** [UNESCO AI Competency Framework for Students](https://www.unesco.org/en/articles/ai-competency-framework-students): human-centred mindset and AI techniques (Understand, Apply). [AILit](https://ailiteracyframework.org/): Engage with AI (evaluate outputs) and Manage AI. [AI4K12](https://ai4k12.org/): Big Idea 3 (learning from data) and Big Idea 5 (societal impact). DeltaOps Future Skills 1 (Ask a good question), 2 (Know your data) and 11 (Explain it).

## 3. Real-world connection and careers
- **Jobs mirrored:** data technician, junior data analyst, business intelligence analyst, policy researcher and statistician in councils, the NHS and charities. Insight teams spend much of their time fixing data before any chart is drawn, then write short, honest briefs for decision-makers.
- **How AI is used today:** analysts use AI tools to suggest cleaning steps, write formulas, draft summaries and spot outliers. The analyst still checks coverage and signs the brief. Under the UK [Code of Practice for Statistics](https://code.statisticsauthority.gov.uk/) (to verify link), official statistics are judged on trustworthiness, quality and value, which includes being open about limits.
- **Mentor video (60–90 s):** a real council data analyst: "What I do; how AI changed my job; the mistake I catch", cast deliberately ([strand research](../../research/future-skills/future-skills-strand.md) §5.6).

## 4. Setting, look and characters
- **Visual style:** a voxel workplace diorama: a cut-away council insight office (six desks, a wall screen showing "Fault reports by ward") beside a harbour town with four wards: **Harbourside**, **Mill Lane**, **Castle Hill** and **Old Quay**. Lamp posts carry report pins; Old Quay's red "unreported fault" pins appear only during the Data check. The camera then moves to full-screen work tools: `fault-reports.csv`, a bar chart, a review panel and a Data Brief with tracked changes. Status chips (*Draft · In review · Returned · Approved*) replace meters; "Checks passed: 4 of 4" replaces stars.
- **AI colleague:** **InsightAssist** (working name; the trailer card says "AI colleague"). No face: a card with a confidence bar, "% sure" and a "Data I used" chip. It uses process language ("matched", "counted", "estimated"), never "I think" or "I feel".
- **People:** **Amara**, council data analyst and team lead (the facilitator plays her). **Maya, 13**, junior analyst (the learner's on-screen stand-in). Four colleagues at desks; Old Quay residents on a bench.
- **Fictional names to check:** Harbourside Council, the four wards, Quay Road, Ash Street, Keep Lane, Net Loft Row, InsightAssist, Amara, Maya. A web search found no "Harbourside Council", but "Harbourside" is a real place name (Bristol) and the street names are common. Final clearance (to verify), per research §10 item 28.

## 5. Core loop and structure
**Act structure in every work stage:** *Brief* (what the councillor needs) → *Do the work* (inspect, clean, chart) → *Hand-over* (InsightAssist offers confident output with a confidence score) → *Review* (the Checker runs the Four Checks; the team approves or returns) → *Fix and log* (the Recorder updates the Data Brief and the data-quality log).

| Stage | Goal | Real decisions (options) | AI's confident mistake (instruction → guess, % sure) | How learners catch it | Clearer instruction or better data | What changes on screen |
|---|---|---|---|---|---|---|
| 1. Frame the question | Turn the brief into a question data can answer | A "Which ward has most reports?" · B "Which ward has most faults?" · C "Which wards need repairs, and how sure can we be?" | "Rank the wards" → ranks by report count and calls it "need" (88%) | **Case:** reread the brief; "need" is about faults, not reports | Team writes question C on the brief card | Brief card gets a pinned "Our question" line |
| 2. Inspect | Find what's wrong before cleaning | Scan by column · sort by Ref · filter by ward | "Check the data" → "Data is clean: 120 valid rows" (91%) | **Data:** sort by Ref shows F-032 twice; ward filter shows "Harbr side" | Data-quality log, one line per issue | Rows highlight; log pills appear |
| 3. Clean | Fix issues without inventing data | Blanks: A set to 0 · B delete row · C mark "unknown" | "Fill gaps" → fills blank Faults with 0 (86%) | **Case:** ask what 0 means: "inspected and fine", not "not recorded" | Rule: "Blank is not 0" | 120 rows → 112 clean rows; four teal log pills |
| 4. Chart | Show the answer to the question | Bar chart of reports · pie chart · bar chart with a note | *(unsure but right)* "Possible gap: Old Quay has far fewer rows than other wards. Check coverage?" (48% sure) | Team decides to keep the flag for the review | "Low-confidence flags are still worth reading" | Bars grow: 38 · 36 · 34 · 4; Old Quay bar amber |
| 5. Review the finding | Sign off or send back | Approve · Approve with edit · Send back | "Summarise" → "Old Quay has the fewest faults, so its streetlights are in the best condition. Repairs can wait there." (94%) | **Data:** ward profile card shows most Old Quay residents are over 65, few use the app, and 9 streets sent no reports. **Case:** 4 against 34–38 is an outlier to explain, not a result | Note: "Few reports is not the same as few faults" | Data chip red, Case amber; red pins rise over Old Quay; verdict "Send back" |
| 6. Fix and ship | A Data Brief a councillor can trust | Better data: A door-knock survey · B lamp-post sensor sample · C phone line for reports | None: the team writes it | Peer check against the rubric | "What this data can't tell us: faults nobody reported" | Tracked change, boxes appear, "Signed off · Maya, 13"; brief flies into the portfolio |

In stage 5, Source and Authority pass (the numbers trace to the export). Learners still say *why*; a check that passes is a finding too. §9 revisits whether "Repairs can wait there" is an analyst's call at all.

## 6. Team roles
Rotate after stage 3 in 60- and 90-minute sessions.

| Role | Does | Holds |
|---|---|---|
| **Lead** | Keeps the team on the councillor's question and the deadline | Brief card ("Due Friday") and "Our question" strip |
| **Maker** | Operates the spreadsheet or sorts the printed data cards | `fault-reports.csv` (screen or 120 printed rows) and the cleaning checklist |
| **Checker** | Runs the Four Checks on every hand-over | Four Checks card and the **Ward profile** sheet (synthetic: share of residents over 65, app use, streets with zero reports) |
| **Recorder** | Writes the data-quality log and the Data Brief | Data Brief template and log sheet |
| **Spokesperson** | Presents the brief to "Councillor Price" (the teacher, in role) | Councillor question card: "So can we skip Old Quay this year?" |

With three learners, merge Lead with Spokesperson and Maker with Recorder.

## 7. Session plans
Minute ranges for each version. The discussion is never shortened below 10 minutes.

| Phase | 45 min | 60 min | 90 min | What happens |
|---|---|---|---|---|
| Warm-up and brief | 0–4 | 0–5 | 0–8 | Mentor clip; Amara (facilitator) reads the brief; "Is no news good news?" hands-up; roles dealt |
| Tool onboarding | 4–8 | 5–10 | 8–16 | Demo: sort, filter, log an issue; meet InsightAssist and the confidence bar. 90 min adds a "spot the blank" practice table |
| Work stages | 8–26 (stage 1 as a class, then 2–5) | 10–36 (stages 1–5, rotate roles after 3) | 16–50 (stages 1–5 in full; Pro extension) | The core work and the review |
| Fix and ship | 26–32 | 36–43 | 50–62 | Rewrite the finding, add the boxes, sign off. 90 min adds a second chart that shows uncertainty |
| Present | none | none | 62–68 | Spokesperson answers "Councillor Price" in 90 seconds |
| Discussion | 32–42 | 43–57 | 68–88 | §9 (10, 14 or 20 min) |
| Wrap-up | 42–45 | 57–60 | 88–90 | Pathway card and badge code |

**Pro extension (14–16, 90 min).** The same steps on a non-personal council open-data extract. Kaggle is an after-session step only (16+, or 14+ with parental consent) ([MEI guidance](https://mei.org.uk/wp-content/uploads/2025/02/mei-ds-kaggle-guidance.pdf)).

**Short of time:** cut stage 1 (give the question), merge stages 2 and 3 into one cleaning pass, and keep stage 5 and the discussion. Never cut the review or the discussion.

## 8. Assessment
- **Artefact quality and catches:** the Data Brief is judged on four elements (question, chart, findings with limits, "can't tell us" box) and the team's catches: up to 6 (duplicates, names, dates, blank-as-zero, the outlier, the reporting bias). "Checks passed: 4 of 4" appears only after the finding is fixed.
- **Exit check (three questions, on paper):**
  1. A tool says "Ward X has the fewest complaints, so it has the fewest problems (96% sure)". What would you ask first? *(Who could complain, and who couldn't?)*
  2. Why is a blank cell not the same as 0? *(0 means "checked, none"; blank means "not recorded".)*
  3. Write one sentence for a councillor that says what this data can't tell us.
- **Facilitator observation rubric:**

| Criterion | Developing | Secure | Ready for next step |
|---|---|---|---|
| Spots data problems | Finds 1–2 issues with prompting | Logs 4+ issues unprompted | Explains how each issue would change the answer |
| Chart matches the question | Chart shows data but not the question | Chart answers the question, labelled | Adds a note or mark showing what is missing |
| States uncertainty | Finding is stated as fact | Finding includes a limit | Limit is specific and proposes better data |
| Reports vs faults | Accepts "fewest faults" | Rejects it with the ward profile evidence | Generalises: "absence of evidence is not evidence of absence" in their own words |

Learners self-assess one criterion of their choice on the Data Brief footer.

## 9. Discussion session (instructor-led, at the end of the lab)
**Length:** 10 min (45-min session), 14 min (60), 20 min (90).

**Purpose.** Land one idea: **data only shows what was recorded, and the analyst, not the tool, owns the conclusion.** Then show that the same Four Checks are how professionals review AI work in insight teams, newsrooms and audits, and that this skill is assessed in GCSE Statistics and the next qualifications.

**Set-up.**
- Screens to lock or lids down: the facilitator says "Hands off, eyes up" and shows the signed-off Data Brief on the big screen.
- Teams stay in their groups for the pair stage, then turn chairs to face the front. Seated in a horseshoe if possible.
- Materials: the wall-screen chart (38 · 36 · 34 · 4) printed A3; the Four Checks card for each table; sticky notes; one pathway card per learner.
- Facilitator steps out of the Amara role: "I'm not your team lead now. Let's talk about what really happened."

**Structure.**

| Step | 10 min | 14 min | 20 min |
|---|---|---|---|
| Opening question (all answer, thumbs or one word) | 1 | 1 | 2 |
| Think–pair (pairs answer one core question on a sticky note) | 2 | 3 | 4 |
| Whole group (core questions) | 5 | 7 | 10 |
| Personal takeaway and pathway | 2 | 3 | 4 |

**Opening question.** "Old Quay sent 4 reports. Does that mean Old Quay has 4 broken lights? Thumbs up, down or sideways." (Everyone can answer; sideways is a good answer.)

**Core questions.** In the 10-minute version, use 1, 3, 5 and 8.

1. **Recall: "What did InsightAssist say, and how sure was it?"**
   - *Purpose:* fix the facts before reasoning.
   - *Strong answer:* "It said Old Quay had the fewest faults and repairs could wait, and it was 94% sure."
   - *Probe:* "What did its 'Data I used' chip say? Did that tell you anything?"
2. **Reasoning: "Why did the AI get it wrong, if it counted correctly?"**
   - *Purpose:* separate correct arithmetic from a wrong conclusion.
   - *Strong answer:* "The counting was right. It assumed every fault gets reported. Old Quay residents mostly don't use the app."
   - *Probe:* "Could a perfect AI have known that from this spreadsheet alone?"
3. **Data check: "Who was missing from this data, and how did we find out?"**
   - *Purpose:* name the Data check in action.
   - *Strong answer:* "People who don't use the app, mostly older residents. We found out from the ward profile, a different source."
   - *Probe:* "Who else might not report a fault? Think of three kinds of people."
4. **Confidence: "It was 94% sure. What does that number mean?"**
   - *Purpose:* calibration; "it matches, it doesn't know".
   - *Strong answer:* "How well the pattern matched, not whether it's true. High confidence still needs checking."
   - *Probe:* "When was it unsure but right?" (The 48% coverage flag in stage 4.)
5. **Transfer to work: "Where else could 'few reports' hide a big problem?"**
   - *Purpose:* reporting bias beyond streetlights.
   - *Strong answer:* "Bullying reports at school, potholes, hospital complaints, crimes people don't report, bugs users don't mention."
   - *Probe:* "In that example, what better data could you collect?"
6. **Authority: "InsightAssist wrote 'Repairs can wait there.' Whose decision is that?"**
   - *Purpose:* the Authority check in policy work; analysts inform, elected councillors decide.
   - *Strong answer:* "Not the AI's and not really ours. We give evidence and limits; the councillors decide and are accountable."
   - *Probe:* "Should our brief say what to do, or what we know and don't know?"
7. **Ethics and fairness: "What happens to Old Quay if nobody spots this?"**
   - *Purpose:* connect a data error to real harm.
   - *Strong answer:* "Repairs go elsewhere, streets stay dark, older people feel unsafe walking at night. The quietest group loses out."
   - *Probe:* "Is it fair that the people who report most get the most help?"
8. **How professionals review AI work: "If you were a real council analyst, what would your Four Checks look like before a brief goes to councillors?"**
   - *Purpose:* make the Four Checks a professional routine.
   - *Strong answer:* Data: "Who's covered and who isn't?" Case: "Does this hold for the odd ward out?" Source: "Can every number be traced to the export?" Authority: "Did the tool change data or make a decision it shouldn't?"
   - *Probe:* "Who else would check it?" (A second analyst, a manager; under the Code of Practice for Statistics, publishing limits is part of quality.)
9. **Careers and qualifications: "Which part of today is a real job?"**
   - *Purpose:* the springboard.
   - *Strong answer:* "Cleaning and logging the data is what data technicians do. Writing the brief is what analysts and policy researchers do."
   - *Probe:* "GCSE Statistics marks you on spotting bias in how data is collected. Where did we do that today?"

**The Four Checks at work (put on the screen for question 8).**

| Check | In this lab | How a professional asks it | Where it comes up next |
|---|---|---|---|
| Data | Old Quay rarely uses the app | "What does this dataset cover, and who is missing?" | GCSE Statistics (sampling, bias); T Level Digital Data Analytics |
| Case | 4 against 34–38; blanks as 0 | "What about the outlier and the missing values?" | MEI data science (cleaning); Level 3 Data Technician |
| Source | Numbers trace to the export | "Can every figure in the brief be traced?" | Coursework and EPQ referencing |
| Authority | "Repairs can wait" | "Is this my call, the tool's, or the decision-maker's?" | Citizenship; any workplace sign-off |

**Sentence starters.**
- "The AI assumed… because…"
- "This data can't tell us… because…"
- "I would check… by…"
- "A fairer way to collect this would be…"
- "If I were the councillor, I'd want to know…"

**Common misconceptions.**

| Misconception | How to respond |
|---|---|
| "The AI made a maths mistake." | "Check the count: 4 is right. The mistake was the meaning. What did it assume?" |
| "94% sure means 94% likely to be true." | "It's how strongly the pattern matched. It was 94% sure and wrong. Remember the 48% flag that was right." |
| "Just delete Old Quay; it's an outlier." | "Outliers are questions, not rubbish. Deleting it would hide the people we most need to hear." |
| "More data always fixes it." | "More app reports would repeat the same gap. We need *different* data that reaches non-app users." |

**Differentiation.**
- *Younger or less confident learners:* use the A3 chart and point. Offer two-choice prompts: "Few faults or few reports?" Let them answer with the sentence starter card. Pair them as Checker with a confident Recorder.
- *Older or confident learners (14–16):* "Calculate reports per 100 lamp posts. Does it change the story?" "Write the 'can't tell us' box for a different brief, such as hospital waiting complaints." "How would you show uncertainty on the chart itself?" "Compare reporting bias with survivorship bias."

**Connecting to real life.** Boston's **Street Bump** app (around 2012) used smartphones' motion sensors to detect potholes as people drove. Commentators, including researcher Kate Crawford in the *Harvard Business Review* (2013, to verify), pointed out that the data would come mostly from areas where more people owned smartphones, so poorer or older neighbourhoods could be under-counted; the city was aware of this and worked to account for it (to verify). Ask: "Which of our Four Checks would have caught that? What would you have done as the city's analyst?" Don't quote figures; describe it as a widely discussed example.

**Closing ritual.** Each learner writes one sentence on the back of their pathway card, starting "Before I trust a chart, I'll ask…", and reads it aloud in a quick round (passing is allowed). The facilitator then gives the 60-second pathway talk:
- **Next free course:** MEI Introduction to Data Science (about 14–18; Kaggle needs parental consent under 16), or a Code Club data project for 11–13 ([MEI](https://mei.org.uk/what-we-do/enrichment-and-competitions/data-science/intro-to-data-science/getting-started/)).
- **Award:** CREST Discovery data project ([CREST](https://www.crestawards.org/which-level)).
- **Qualification route:** GCSE Statistics and the future computing GCSE, then T Level Digital Data Analytics or the Level 3 Data Technician apprenticeship ([T Levels](https://www.tlevels.gov.uk/students/subjects/digital-production-design-development)).
- **Jobs:** data technician, data analyst, policy researcher.
- **Your data:** "Today we used made-up data about made-up streets. Your badge code holds no information about you."

**Facilitator notes.**
- *Sensitive topics:* safety after dark, age and digital exclusion. Keep the focus on the reporting route, not on residents' abilities. Some learners may have older relatives without smartphones or may lack home internet themselves; don't ask them to say so.
- *Safeguarding:* if a learner mentions feeling unsafe in their own street at night, acknowledge it briefly and follow your setting's procedure afterwards; signpost to a trusted adult or the designated safeguarding lead (DSL). No real addresses or street names from learners' own areas.
- *Dominant voices:* use the sticky-note pair stage so every pair has an answer before the whole group; take answers from the Checker role first, then Recorders; "Three hands before the same hand twice."

## 10. Accessibility and inclusion
- **Reading level:** about reading age 10–11; job words glossed once ("a *ward* is an area of the council").
- **Audio and captions:** captions and read-aloud on the mentor video and AI text.
- **Colour-blind-safe signals:** every status has a shape and word as well as colour (✓, !, ✕, "Send back"); bars carry numbers; fault pins carry a cross.
- **Motor:** large tap targets; keyboard sorting and filtering; printed cards work for everything.
- **No devices at home:** runs on one shared screen or a printed pack (120 rows on 6 pages, checklist, Data Brief). Every pathway step has a free school or library route.

## 11. Safety, ethics and data
- **Data collected:** none. No names, accounts or logins. The anonymous badge code is redeemable only by a teacher or parent.
- **Datasets:** fully synthetic fault reports and ward profiles. Pro extension uses non-personal open data only.
- **Real AI tools:** none needed. InsightAssist is scripted. For 14–16 in schools, a teacher may demonstrate a school-managed generative AI tool summarising the same table, operated by an adult or inside school-managed accounts that meet the [DfE product safety expectations](https://www.gov.uk/government/publications/generative-ai-product-safety-expectations/generative-ai-product-safety-expectations), with the DSL's agreement. Never child accounts on consumer tools.
- **Gentle consequences:** "Send back" is normal work ("Returned with a note"). No public scores or team rankings.

## 12. Build notes
- **Scenes and assets:** diorama and pins (from the trailer); spreadsheet with 120 synthetic rows; chart; review card; ward profile card (new); Data Brief; portfolio folder; pathway card.
- **Scripted AI responses (InsightAssist):**
  1. Stage 1: "Ranked the wards by report count. Highest need: Harbourside. (88% sure)"
  2. Stage 2: "Data is clean: 120 valid rows. (91% sure)"
  3. Stage 3: "Filled 6 blank Faults cells with 0 so totals add up. (86% sure)"
  4. Stage 4: "Possible gap: Old Quay has far fewer rows than other wards. Check coverage? (48% sure)"
  5. Stage 5: "Old Quay has the fewest faults, so its streetlights are in the best condition. Repairs can wait there. (94% sure) · Data I used: Fault-report app · 112 rows"
  6. On return: "Noted. Finding withdrawn pending new data."
- **Reuse from the trailer:** the diorama, `fs-ui.js` components, rows F-031 to F-058, log pills, chart values and Data Brief wording.
- **Open questions:**
  - Product name for the AI colleague: InsightAssist, or keep "AI colleague"?
  - Ward profile figures: give a percentage over 65 or only words ("most residents")? Words avoid invented-looking statistics.
  - Amara appears in both `fs-data` (analyst) and `fs-verify` (Amara Osei, Desk Editor). Rename one.
  - Mentor contributor: find a real council analyst so it counts as an employer encounter ([Gatsby](https://gatsbybenchmarks.org.uk/?p=777)).
