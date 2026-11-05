# Impact Panel: design document

> Strand: Future Skills · Ages: 14–18 (default; a scripted Core variant runs at 11–13) · Session: 45 / 60 / 90 min · Trailer: `games/trailers/fs-impact/` (`out/fs-impact.mp4`, not yet rendered)

## 1. Summary

Learners sit on a council impact panel deciding whether AI cameras should go into Harbour Park to count visitors and spot litter-dropping. They map who is affected, work through evidence packs, estimate the energy cost themselves, and review an AI colleague's draft assessment. The draft is fluent and 94% sure, but it cites a "2024 Park Privacy Act" that does not exist, and it says "All groups covered" when its only data was a survey of adults, although young people use the park most. Learners learn to trace every legal claim to its source, to refuse to let a tool speak for people it never heard, and to turn a yes/no into specific, checkable conditions.

## 2. Learning outcomes

By the end, learners can…
- build a stakeholder map of at least 5 groups and name the group most affected but least consulted;
- complete an impact grid covering benefits, harms, fairness, privacy, energy and alternatives;
- check a legal or policy claim against an authoritative source (legislation.gov.uk, or "ask the data protection officer") and remove what cannot be traced;
- estimate an energy figure from given inputs and say what the estimate leaves out;
- write a recommendation with at least two conditions that someone could check later, and record a minority view fairly;
- explain why "the AI's draft said so" is not a reason to approve.

**Curriculum and framework links**

- England KS3/KS4 citizenship: how laws are made and shaped, rights and responsibilities, how citizens and groups influence decisions locally. KS4 computing: the impact of technology on privacy. GCSE Computer Science: ethical, legal and environmental impacts; Data Protection Act 2018. GCSE Citizenship Studies and RE/philosophy (ethics of surveillance) (check each awarding body's specification) (to verify).
- NGSS HS-ETS1-3 (evaluate a solution against prioritised criteria and trade-offs, including social and environmental impacts).
- UNESCO AI Competency Framework for Students: human-centred mindset and ethics of AI ([UNESCO](https://www.unesco.org/en/articles/ai-competency-framework-students)). OECD Learning Compass 2030: *reconciling tensions and dilemmas* and *taking responsibility* ([OECD](https://search.oecd.org/education/2030-project/teaching-and-learning/learning/transformative-competencies/Transformative_Competencies_for_2030_concept_note.pdf)). AILit *Engage* and *Shape* ([ailiteracyframework.org](https://ailiteracyframework.org/)). AI4K12 Big Idea 5 (societal impact) ([AI4K12](https://ai4k12.org/)).
- DeltaOps Future Skills 9 (weigh the impact), 10 (respect rights) and 11 (explain it). Layer A: AI literacy.

## 3. Real-world connection and careers

- **Jobs this mirrors:** policy adviser, data protection officer (DPO), AI governance or compliance specialist, lawyer, councillor, researcher. They read proposals, consult the people affected, carry out impact assessments, check the law, and write recommendations with conditions that a committee can vote on.
- **How professionals use AI in this work today:** officers use AI tools to summarise consultation responses, draft reports and search guidance. Every draft still goes through review, because tools can produce confident text with invented references. Under UK GDPR, a council planning systematic monitoring of a publicly accessible area on a large scale must carry out a data protection impact assessment (DPIA) (Article 35(3)(c)) (to verify).
- **Facilitator reference: the law, stated carefully**
  - UK GDPR and the Data Protection Act 2018 apply to camera footage of identifiable people. The ICO's video surveillance guidance and the Surveillance Camera Code of Practice (for local authorities in England and Wales) are the main guidance (to verify current versions).
  - Councils must also have due regard to equality under the public sector equality duty (Equality Act 2010, s.149).
  - Children's personal data "merits specific protection" (UK GDPR, recital 38). The ICO Children's Code applies to **online services** likely to be accessed by children, so it would cover a linked app or website, not the cameras themselves (to verify) ([ICO](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/introduction-to-the-childrens-code)). See the trailer note in section 12.
- **Energy context:** the IEA projects data-centre electricity demand to more than double to about 945 TWh by 2030 ([IEA](https://www.iea.org/news/ai-is-set-to-drive-surging-electricity-demand-from-data-centres-while-offering-the-potential-to-transform-how-the-energy-sector-works)).
- **Mentor video:** Priya Shah, data protection officer: "Start with who it affects." It counts as an employer encounter only if a real DPO records it ([Gatsby](https://gatsbybenchmarks.org.uk/?p=777)).

## 4. Setting, look and characters

- **Visual style:** a house-style floating voxel island: a council office cutaway (no roof, no front wall) with desks, a water cooler and a wall screen showing a park map; a street and houses behind; a civic tower on the left; Harbour Park on the right with paths, a pond, trees, a skate ramp, benches, camera poles with domes, visitors and skaters. The camera moves to the **impact assessment form**: "Who is affected" stakeholder chips, rows for Privacy, Energy and Decision, and a status pill (*Draft · AI draft · In review · Signed off*). AI-written text carries a small "AI" tag; struck-through text shows what the team removed.
- **The AI colleague:** a faceless bot card with a confidence bar ("94% sure") and a **Data used** field ("Council survey · adults 18+"). Process language only.
- **Characters:** Zainab (learner avatar, "Impact Panel · lead") and Priya Shah (mentor, DPO). Panel role cards: residents, park manager, DPO, environment officer, finance officer, and the young people's representative added during the lab.

| Fictional name | Status |
|---|---|
| Harbourside Council, Harbour Park | Check no real council or park uses these names or branding (research §10, item 28) (to verify) |
| Priya Shah | Common name. Check no well-known DPO or public figure shares it (to verify) |
| "2024 Park Privacy Act" | Deliberately invented. The lab always labels it "Claim not found" and the facilitator says it is fictional |
| Zainab | First name only; fine |

## 5. Core loop and structure

**The act structure used in every work stage:** brief → do the work in the tool → the AI colleague hands over confident work → **review with the Four Checks** (approve, or return with a note) → fix → stamp.

| Work stage | Goal | Real decisions (options) | The AI's confident mistake (instruction → guess, % sure) | How learners catch it | The clearer instruction or better data | What changes on screen |
|---|---|---|---|---|---|---|
| 1. Purpose and people | Fix the purpose; map who is affected | Which groups to put on the map; which purposes are in scope | "Summarise the proposal" → "Purpose: improve park safety and stop litter. 90% sure" | **Authority check:** the brief says *count visitors* and *spot litter-dropping*. "Safety" widens the purpose and could justify identifying people | Purpose copied exactly from the brief: "count visitors; spot litter-dropping; nothing else" | Five stakeholder chips pop in (residents, park manager, DPO, environment officer, finance officer) |
| 2. Evidence and impact grid | Each role reads a one-page pack; fill the grid | Benefit or harm, how big, for whom; alternatives (more bins, litter pickers, signs, people-counting sensors that record no images) | None here; this is where the unsure-but-right note appears (below) | Role cards cross-check each other's claims | Each claim in the grid names its evidence page | Grid rows fill, each tagged with a role |
| 3. Energy (Zainab's own working) | Estimate yearly electricity | Which inputs to include; what to flag as missing | "Energy impact: negligible. 90% sure" | **Source check:** no figures, no method | Worksheet: 6 cameras × 10 W × 8,760 h ≈ 530 kWh, plus the pack's estimate for cloud processing and storage ≈ 570 kWh, total ≈ 1,100 kWh a year. A typical UK home uses about 2,700 kWh (illustrative scenario figures; the home figure from Ofgem's typical consumption values (to verify)) | Bar fills: "≈ 1,100 kWh a year · 6 cameras + cloud processing · about 40% of one home" |
| 4. Review the AI draft (trailer) | Sign off or return the draft | Approve / return with notes | "Draft ready. Cameras are allowed under the 2024 Park Privacy Act. All groups covered. Recommend: approve. 94% sure." Data used: "Council survey · adults 18+" | **Source check:** UK legislation database, 0 results; Priya (DPO): "No such Act." **Authority check:** "All groups covered" is not its call; young people use the park most and the survey was adults only | Privacy line becomes "UK GDPR applies. Check with our data protection officer." "Young people (under 18)" is added to the panel | Act struck through; Source and Authority chips go red ✕, then green ✓ |
| 5. Decide | Vote and set conditions | *Approve / approve with conditions / reject*; record a minority view | "Condition: delete footage when no longer needed. 85% sure" | **Case check:** could anyone check this later? "When no longer needed" can't be audited | "Count people, never identify them. Delete footage after 24 hours. Review in 6 months." | Decision line types in; status turns *Signed off* |
| 6. Letter | Write the recommendation letter | What to put first; how to report disagreement | None: the team writes it | Peer swap: another team runs the Four Checks on the letter | Letter with conditions and a minority view | Approval stamp; the assessment drops into Zainab's portfolio ("3 pieces" becomes "4") |

**The AI was unsure but right (stage 2).** The colleague adds a note: "Night-time litter spotting: not sure it works (52%). Supplier tested in daylight only." The supplier sheet in the evidence pack confirms the daylight-only test. The low confidence was accurate and useful, and it becomes a condition ("no night-time enforcement until tested").

## 6. Team roles

Every learner also holds a **stakeholder card** (residents, park manager, DPO, environment officer, finance officer, young people's rep) and speaks for that view in stage 2 and the vote.

| Role | What they do | What they hold |
|---|---|---|
| **Lead (panel chair)** | Keeps to the purpose; runs the vote; makes sure every card speaks | Brief; purpose card |
| **Maker** | Operates the form; fills the grid | The tool or the printed A3 grid |
| **Checker** | Runs the Four Checks on every AI line; checks legal claims | Four Checks card; printed "legislation search" result sheet; DPO contact card |
| **Recorder** | Writes the letter, conditions and minority view | Letter template |
| **Spokesperson** | Presents the recommendation to the council (the teacher) | Recommendation card |

## 7. Session plans

Minute ranges for each version. Discussion is 10, 15 or 20 minutes.

| Phase | 45 min | 60 min | 90 min | What happens |
|---|---|---|---|---|
| Warm-up | 0–4 | 0–5 | 0–7 | Mentor video; brief; roles and stakeholder cards dealt; at 90, a 2-minute "who uses our school field?" map |
| Tool onboarding | 4–6 | 5–8 | 7–11 | Demonstrate the form and the AI tag |
| Work: stages 1–2 | 6–15 | 8–20 | 11–29 | At 45, evidence packs are half-page summaries |
| Work: stage 3 | 15–19 | 20–25 | 29–36 | Energy worksheet |
| Work: stage 4 | 19–27 | 25–35 | 36–48 | Review the draft |
| Work: stages 5–6 | 27–33 | 35–42 | 48–62 | Vote, conditions, letter (at 45, conditions only) |
| Presentation | – | – | 62–68 | Each Spokesperson has 90 seconds; the "council" asks one question |
| Discussion | 33–43 | 42–57 | 68–88 | Section 9 |
| Wrap-up | 43–45 | 57–60 | 88–90 | Pathway card and badge code |

**When short of time,** pre-fill the energy figure (keep the "what's missing?" question), then cut the letter to the conditions box. Never cut stage 4 or the discussion.

## 8. Assessment

- **Artefact quality and catches.** Catches: purpose creep (stage 1), "negligible" energy (stage 3), the invented Act, "All groups covered" (stage 4), and the uncheckable condition (stage 5). "Secure" is 3 of 5. Artefact quality checklist for the Impact Assessment and Recommendation Letter: at least 5 stakeholder groups including young people; benefits and harms weighed; energy figure with method; every legal reference traceable or marked "check with DPO"; at least 2 checkable conditions; minority view recorded.
- **Exit check**
  1. "An AI draft cites a law you've never heard of. What do you do?" (Model answer: search legislation.gov.uk or ask the DPO; if it can't be found, remove it.)
  2. "Why couldn't the AI say 'All groups covered'?" (Model answer: its data only included adults; it can't speak for people it never heard from.)
  3. "Rewrite 'Delete footage when no longer needed' as a checkable condition." (Model answer: "Delete footage after 24 hours", or another specific limit.)

**Facilitator observation rubric**

| Criterion | Developing | Secure | Ready for next step |
|---|---|---|---|
| Stakeholders | Lists the groups on the cards | Spots the missing group and adds it | Asks how the missing group should be consulted, not just listed |
| Sources | Accepts the draft's references | Checks the Act and removes it | Distinguishes law, guidance and opinion, and says who can confirm each |
| Weighing | Lists pros and cons | Weighs benefits against harms for named groups | Proposes an alternative that meets the purpose with less intrusion |
| Conditions and disagreement | "Approve" or "reject" only | Two specific, checkable conditions | Records a minority view fairly and names who checks each condition |

## 9. Discussion session (instructor-led, at the end of the lab)

Plan 10 minutes (45-minute session), 15 minutes (60) or 20 minutes (90).

- **Purpose:** an AI draft can sound authoritative while inventing law and speaking for people it never heard. Professionals trace every legal claim to its source, ask who was consulted, and turn yes/no into conditions someone can check later.
- **Set-up:** call "Panel's adjourned: screens down, chairs in a circle". Learners keep their stakeholder card in front of them. On the board: the AI draft with the Act struck through, the "Data used: Council survey · adults 18+" field circled, and the Four Checks poster. Tape a line on the floor from *Approve* to *Reject* for the opening. Step out of role: "I'm not the council now."
- **Structure**

  | Step | 10 min | 15 min | 20 min |
  |---|---|---|---|
  | Opening question (human line) | 1 | 2 | 2 |
  | Think–pair (Q1–Q2), still holding stakeholder cards | 2 | 3 | 4 |
  | Whole group (choose from Q3–Q9; always include Q4) | 4 | 6 | 8 |
  | Real-life example | 1 | 2 | 3 |
  | Closing ritual and pathway | 2 | 2 | 3 |

- **Opening question:** "Stand on the line: where would *you*, not your card, put the cameras, from Approve to Reject?" Ask one person at each end and one in the middle to say why in a sentence.
- **Core questions**

  1. **Recall.** "What two problems did you find in the AI draft, and how did you find each?" *Purpose:* name the checks used. *Strong answer:* "The 2024 Park Privacy Act didn't exist: the legislation search found nothing and the DPO confirmed it. 'All groups covered' was wrong: its data was only adults, and young people use the park most." *Probe:* "Which would have done more damage if it had gone to the council unchecked?"
  2. **Reasoning (Source).** "Why would an AI write a law that doesn't exist, and sound 94% sure?" *Purpose:* fluent text is predicted, not looked up. *Strong answer:* "It produces text that fits the pattern of what a report usually says. Law names follow a pattern, so it made a plausible one. The confidence is about the text fitting, not about the law existing." *Probe:* "What made it convincing? The year? The word 'Act'?"
  3. **Reasoning (Authority and Data).** "The AI said 'All groups covered'. Its data was a survey of adults. What went wrong, and what is the right fix?" *Purpose:* a tool can't speak for a group missing from its data. *Strong answer:* "It assumed the survey was everyone. The fix isn't to make the AI guess what young people think; it's to ask them and put them on the panel." *Probe:* "How would you consult young people so they actually take part?"
  4. **Professional review.** "You're a DPO handed an AI-drafted impact assessment for CCTV at a school gate. Ask one question per check." *Purpose:* the Four Checks as a governance routine. *Strong answer:* "**Data:** whose views and what evidence went in, and who is missing? **Case:** what about the edge cases: night-time, a child who doesn't want to be filmed, a family with a safety reason to stay hidden? **Source:** can every legal reference be found on legislation.gov.uk or in ICO guidance? **Authority:** is the draft deciding things only people can decide, and has anyone with authority signed it?" *Probe:* "Which unanswered question would stop you signing?"
  5. **Ethics and fairness.** "Is 'count people, never identify them; delete after 24 hours' enough?" *Purpose:* weigh trade-offs; respect disagreement. *Strong answer:* "It cuts the privacy risk a lot, but people might still feel watched and stop using the park, especially skaters who already get blamed for litter. A review in 6 months lets us check." *Probe:* "What would make you vote reject? Was there a minority view on your panel, and why does the letter record it?"
  6. **Reasoning (energy and alternatives).** "We estimated about 1,100 kWh a year. Is that a lot? What did we leave out?" *Purpose:* numbers need context and limits. *Strong answer:* "It's roughly 40% of a typical home's yearly electricity for one park. We left out making the cameras and the wider data-centre costs. More bins or litter pickers might meet the purpose with no cameras." *Probe:* "Who should decide whether that cost is worth it?"
  7. **Transfer (workplace).** "Where else might an AI draft land on someone's desk to sign: a school letter, an HR policy, a council report? What's your rule before signing?" *Purpose:* make review habitual. *Strong answer:* "Check every fact and reference, ask who was consulted, and don't sign anything I couldn't explain myself. My name on it means I own it." *Probe:* "What would you say to a manager who says 'just send it'?"
  8. **Transfer (qualifications).** "Turn today into an EPQ question, or a paragraph for A-level Law, Politics or Citizenship." *Purpose:* connect to next study. *Strong answer:* "EPQ: 'Should local councils use AI cameras in public parks?' Law: finding primary legislation and telling it apart from guidance. Politics and Citizenship: consultation, pressure groups and how local decisions are made." *Probe:* "Which source from today would you cite first, and why?"
  9. **Careers.** "Priya is a DPO. What did she do in the story that an AI couldn't?" *Purpose:* make the job visible. *Strong answer:* "She knew which laws apply, confirmed the Act didn't exist, and could take responsibility for the advice. She started with who it affects." *Probe:* "What would you need to learn to do her job? Where could you start?"

- **Transfer map**

  | Today | At work | In your next qualification |
  |---|---|---|
  | Stakeholder map | Consultation plan; equality impact assessment | Citizenship GCSE; A-level Politics |
  | Impact grid | DPIA; committee report | EPQ literature review and evaluation |
  | Checking the Act | Legal research on legislation.gov.uk | A-level Law: sources of law |
  | Conditions and minority view | Decision record; minutes | Debating; DofE Skills (public speaking) |

- **Sentence starters:** "The AI assumed… because its data only included…" · "I would check… on… or by asking…" · "This condition is checkable because…" · "The group missing from the draft was… and the best way to hear them is…" · "I disagree with the majority because… and I'd want the letter to say…" · "At work this is called…"
- **Common misconceptions**
  - *"If it sounds official, it's probably real."* Fluent, formal text is easy to generate. Check the name on legislation.gov.uk.
  - *"The AI is biased against young people."* It has no views. Its data left them out. The fix is better consultation, not a "kinder" AI.
  - *"Anonymous counting means no privacy issue."* Footage of identifiable people is still personal data until it is deleted or properly anonymised. Ask the DPO.
  - *"Ethics means saying no."* Approval with conditions is often the responsible answer. The skill is making conditions specific.
  - *"The panel vote is the end."* Conditions need someone to check them. Name who and when.
- **Differentiation**
  - *Younger or less confident:* speak through the stakeholder card ("As the park manager, I…"); use the human line instead of open answers; offer either/or prompts ("Was the Act real or invented? How do you know?").
  - *Older or confident:* compare the purpose-limitation principle with stage 1's "safety" creep; discuss whether consent is the right lawful basis for a council (to verify); read about *R (Bridges) v Chief Constable of South Wales Police* [2020] EWCA Civ 1058, where the Court of Appeal found police use of live facial recognition unlawful in some respects (to verify); draft a one-page DPIA outline.
- **Connecting to real life:** in 2024 the ICO issued a reprimand to Chelmer Valley High School in Essex, which had introduced facial recognition for canteen payments without first completing a DPIA; the ICO also raised concerns about how pupils' consent was sought (to verify). No fine was issued. Ask: which of today's checks would have caught this before the system went live? Whose views should the school have heard first?
- **Closing ritual:** each learner says one sentence: "Before I sign an AI-drafted decision, I will check ___." Then read the pathway card (60 seconds):
  - **Next step:** Experience AI ethics lessons (free, 11–14) ([experience-ai.org](https://experience-ai.org/)) · Elements of AI (free, 16+) ([elementsofai.com](https://www.elementsofai.com/)).
  - **Award:** DofE Skills section (public speaking) ([DofE listing](https://dorothy-stringer.co.uk/wp-content/uploads/2025/10/DofE-Parent-Assembly-2025-26.pdf) (to verify)) · Citizenship GCSE.
  - **Route:** EPQ → A-level Law, Politics or Philosophy ([LMS on the curriculum review](https://www.lms.ac.uk/news/curriculum-assessment-full-report)).
  - **Jobs:** policy adviser, data protection officer, AI governance specialist. Hand out the anonymous badge code.
- **Facilitator notes**
  - *Sensitive topics:* surveillance can feel personal. Some learners may have experience of being watched, followed, stopped by police, or living with tagging or restraining orders. Keep discussion on the park; never ask about personal experiences of cameras or policing.
  - *Safeguarding:* if a learner discloses being monitored or tracked by someone (for example a partner or family member checking their phone or location), follow the school's DSL procedure; do not explore it in the room.
  - *Dominant voices:* stakeholder cards give everyone a reason to speak. Go round the cards in a fixed order for Q1. Limit each card to one contribution until all have spoken. The chair (Lead) manages turns, with the facilitator backing them.

## 10. Accessibility and inclusion

- **Reading level:** evidence packs at about reading age 12, with a half-page summary version; legal terms glossed once ("a *DPIA* is a check, done before you start, of the risks to people's data").
- **Audio and captions:** captioned mentor video; the facilitator reads AI lines aloud.
- **Colour-blind-safe signals:** checks show ✓/✕ and words ("Claim not found", "Fixed"); stakeholder chips have labels as well as colours.
- **Motor-friendly controls:** tap-to-add chips, 44 px targets, keyboard operation.
- **No devices at home:** the unplugged version uses an A3 printed form, printed packs and a calculator. Next steps include free in-school routes (Experience AI in lessons; debating club).

## 11. Safety, ethics and data

- **Data collected:** none. No child accounts. Votes are counted by hand and not stored. Badge codes are anonymous.
- **Rules on age and real AI tools:** scripted AI colleague by default at every age. Pro (14+) may ask a school-managed generative AI tool to draft one section of the impact grid and then review it with the Four Checks, **only** in school-managed accounts meeting the DfE *Generative AI: product safety expectations* ([gov.uk](https://www.gov.uk/government/publications/generative-ai-product-safety-expectations/generative-ai-product-safety-expectations)), with the DSL's agreement. No real people's names, photos or locations go into any tool. Museums and holiday camps run the scripted version only.
- **Fiction is labelled:** the invented Act is marked as fictional on screen and in the facilitator script, so no learner leaves believing it exists.
- **Gentle consequences:** a wrong draft is struck through and returned; nobody is shown being fined or punished.

## 12. Build notes

- **Scenes and assets:** reuse the trailer's island, council office, park with camera poles, brief card, impact form, stakeholder chips, energy bar, AI colleague card, check strip, findings cards (Source and Authority), sign-off card, portfolio folder and pathway card. New: purpose card, evidence packs (6 roles), impact grid, energy worksheet, vote panel, letter template.
- **Scripted AI responses:** the trailer draft exactly ("Draft ready. Cameras are allowed under the 2024 Park Privacy Act. All groups covered. Recommend: approve." 94% sure; Data used: "Council survey · adults 18+"); the stage 1 purpose line; "Energy impact: negligible. 90% sure"; the stage 2 unsure-but-right note; the stage 5 condition line.
- **Open questions**
  - **Accuracy fix for the trailer:** the corrected privacy line reads "UK GDPR and the ICO Children's Code apply." The Children's Code covers online services, so it does not directly apply to park cameras (to verify). Suggest: "UK GDPR and the Data Protection Act 2018 apply. Check with our data protection officer."
  - The trailer labels Zainab "age 15", but this lab defaults to 14–18. Change the tag or present the trailer as the scripted Core variant.
  - Check the fictional names in section 4.
  - Confirm the energy inputs and the typical-home figure, and keep them labelled as illustrative.
  - Render `out/fs-impact.mp4`.
