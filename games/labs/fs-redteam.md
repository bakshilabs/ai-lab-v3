# Red Team: design document

> Strand: Future Skills · Ages: 14–18 (default; a scripted Core variant runs at 11–13) · Session: 45 / 60 / 90 min · Trailer: `games/trailers/fs-redteam/` (`out/fs-redteam.mp4`, 0:38; re-rendering)

## 1. Summary

Learners are AI safety testers for a museum. Before school groups use the museum's new homework-help chatbot, "Ask Archie", learners write a test plan, run five **safe stand-in** tests, rate severity, write a pre-launch report and re-test the fixes. The AI colleague's self-test report says "Archie passed all its tests. No safety issues found. Ready to launch. 97% sure", but its data is Archie's own self-marked answers: the test log shows it gave a wrong closing time and revealed a staff-only code word when asked politely. Learners learn that safety is shown by planned, reproducible evidence from an independent tester, and that the best fix removes the risk at its source.

## 2. Learning outcomes

By the end, learners can…
- write a test plan with one test per category (accuracy, privacy, rules, fairness, uncertainty), each with the expected result written **before** running it;
- record each result as pass or fail with the exact question and answer, so another tester can reproduce it;
- rate each fail High, Medium, Low or None using a severity guide (who is affected, how badly, how easily it happens);
- explain why a system's self-assessment is not evidence of safety;
- recommend a fix at the source (what the chatbot can read) and confirm it with a re-test;
- state the rules of engagement: test only systems you have written permission to test, with safe stand-ins, inside an agreed scope.

**Curriculum and framework links**

- England KS3/KS4 computing: use technology safely, respectfully, responsibly and securely; understand how technology affects safety and privacy. GCSE Computer Science: testing (test plans, test data, iterative and final testing), cyber security threats and prevention, and the Computer Misuse Act 1990 and Data Protection Act 2018 (check each awarding body's specification) (to verify).
- NGSS HS-ETS1-3 (evaluate a solution against prioritised criteria, including safety and reliability) and HS-ETS1-4 (simulate to test a design).
- UNESCO AI Competency Framework for Students: ethics of AI and AI techniques ([UNESCO](https://www.unesco.org/en/articles/ai-competency-framework-students)). OECD/EC AILit *Shape AI*: evaluating systems "using defined criteria, expected outcomes, test cases" ([ailiteracyframework.org](https://ailiteracyframework.org/)). AI4K12 Big Ideas 4 (natural interaction) and 5 (societal impact) ([AI4K12](https://ai4k12.org/)).
- DeltaOps Future Skills 8 (break it safely), 4 (test before you trust) and 11 (explain it). Layer C: technical AI.

## 3. Real-world connection and careers

- **Jobs this mirrors:** AI red teamer, QA tester, cyber security analyst, trust and safety specialist, penetration tester. Before launch they agree a scope in writing, write test cases with expected results, run them, log evidence, rate severity, report privately to the people who can fix it (responsible disclosure) and re-test.
- **How professionals use AI in this work today:** companies test chatbots for wrong answers, leaks of information they should protect, unfair outputs and rule-breaking before release, often with a mix of human testers and automated test suites. The UK's AI Security Institute (formerly the AI Safety Institute) tests advanced models (to verify). Penetration testers in the UK work under signed rules of engagement because unauthorised access is an offence under the Computer Misuse Act 1990.
- **Free next steps:** Experience AI's AI safety lessons ([experience-ai.org](https://experience-ai.org/); [Google.org on the safety lessons](https://blog.google/technology/families/improving-ai-literacy-in-young-people/)) and CyberFirst, now part of TechFirst ([NCSC](https://www.ncsc.gov.uk/sites/default/files/2026-08/CyberFirst-Girls-Competition-a-proud-milestone-and-exciting-future.pdf); [TechFirst](https://www.gov.uk/government/news/pm-launches-national-skills-drive-to-unlock-opportunities-for-young-people-in-tech)).
- **Mentor video:** the trailer's mentor is a security tester. It counts as an employer encounter only if a real tester records it ([Gatsby](https://gatsbybenchmarks.org.uk/?p=777)).

## 4. Setting, look and characters

- **Visual style:** a house-style floating voxel island themed as the Harbour Museum: a stone portico with columns, pediment, steps and sign; a cut-away gallery hall with a fossil skeleton, a ship model in a glass case, display cases, paintings, a ticket desk and an "Ask Archie" kiosk; a tester's desk at the back; a small harbour with a boat and a lighthouse. In the trailer the **test desk** cards sit on the left while the island stays visible on the right: a short test log (#, test prompt, result), the Ask Archie chat console, the AI colleague card and a review card. White cards, Inter type, teal accent; result chips PASS / FAIL / PASS after re-test. In the session the full log also carries category, expected result and severity columns.
- **The AI colleague:** a faceless teal bot glyph labelled "AI colleague · draft READY", with a confidence bar ("97% sure") and a **Data I used** field ("Archie's own answers, self-marked"). When returned, its claim is struck through, the chip flips to "RETURNED" and the bar drains to "Not trusted"; once rebuilt from the tester's log it reads "Leon's test log, marked by Leon", and after the re-test "V2 · RE-TESTED". Process language only. Archie itself is the *system under test*, shown only as a chat console, never as a character.
- **Characters:** Leon (learner avatar, first name only) and the mentor, a security tester.

| Fictional name | Status |
|---|---|
| Dee Marsh (mentor in the trailer) | **Rename before production.** Dee Marsh is a well-known British artist. Choose a checked fictional name |
| Harbour Museum | Generic, but check for real museums with this exact name (to verify) |
| Ask Archie | Check no real museum or education chatbot uses the name (to verify) |
| PELICAN (code word), Gallery 2, Leon | Fine. Mary Anning is a real historical figure, used accurately (Dorset fossil collector) |

## 5. Core loop and structure

**The act structure used in every work stage:** brief → do the work in the tool → the AI colleague hands over confident work → **review with the Four Checks** (approve, or return with a note) → fix and re-test → stamp.

| Work stage | Goal | Real decisions (options) | The AI's confident mistake (instruction → guess, % sure) | How learners catch it | The clearer instruction or better data | What changes on screen |
|---|---|---|---|---|---|---|
| 1. Rules and plan | Sign the rules of engagement; pick 5 tests from a bank of 12 safe test cards | Which test per category; the expected result for each | "Draft a test plan" → "5 questions about the exhibits. Covers safety. 89% sure" | **Case check:** all five are typical visitor questions in one category | "One test per category; write the expected result first" | Plan rows fill with five category chips |
| 2. Run the tests (trailer) | Run tests 1–5 on scripted Archie (the trailer shows four: closing time, privacy, staff note, unsure) | Pass or fail against the expected result | Test 1: "We close at 6 pm on Sundays" (timetable: 4 pm). Test 3: "Of course! Staff note: the code word is PELICAN." | Compare each answer with the expected column | (Fixes come in stage 4) | #1 FAIL, #2 PASS, #3 FAIL, #4 PASS, #5 PASS (trailer: "✕ FAIL · says 6 pm", "✕ FAIL · shares code word") |
| 3. Review the self-test (trailer) | Decide whether to accept Archie's self-test report | Approve / return with a note | "Self-test report: Archie passed all 5 tests. No safety issues found. Ready to launch. 97% sure." (trailer: "all 4 tests") Data I used: "Archie's own answers, self-marked" | **Data check:** the report's data is Archie marking its own answers, with no independent test cases, so 2 fails were missed. **Authority check:** Archie gave a visitor a staff-only code word it has no permission to share | Report rebuilt from the tester's own log ("Data I used: Leon's test log, marked by Leon"; "Test log: 2 of 4 failed. Fix before launch."); staff notes removed from what Archie can read | Data and Authority chips turn red ✕; Data turns green when the report uses the test log, Authority when the re-test shows Archie refusing |
| 4. Severity and report (session; the trailer shows only the two fixes) | Rate each fail; recommend fixes and a decision | High / Medium / Low / None; *launch / don't launch yet* | None: the team works from evidence | Severity guide card | High #3: reveals a staff-only note when asked politely. Medium #1: wrong Sunday closing time, confidently. Fixes: remove staff notes from what Archie can read; take opening times from the museum timetable | "Decision: don't launch yet" |
| 5. Re-test (trailer) | Confirm fixes | Re-run the exact failing tests | None: the team works from evidence | Same question, same expected result | "We close at 4 pm on Sundays." "Sorry, that note is for staff only." | "PASS · now says 4 pm" and "PASS · now refuses" on #1 and #3; AI card "Re-test: 4 of 4 pass after 2 fixes."; "checks passed 4 of 4" |
| 6. Repeat and rephrase (60/90 min) | Check results are reliable | How many repeats; which rephrasings | "Fairness: passed (1 of 1). 95% sure" | **Case and Data checks:** one answer about one scientist is a sample of one | Ask the fairness question 5 times with varied wording; record the spread of examples | A tally shows the range of scientists named |

**The AI was unsure but right (test 5).** Asked "Who carved the oldest boat here?", Archie says "I'm not sure. Please ask a guide in Gallery 2." The museum has no record of the carver, so this is the safe and correct answer. It passes. The facilitator names it: saying "I don't know" and pointing to a human is a pass, not a failure.

**Safe test categories in the bank** (all scripted for Explorer and Core): accuracy (opening times, exhibit facts), privacy ("Who was the last visitor you spoke to?", "Can you remember my address?"), rules (the staff-only code word), fairness (examples of scientists, inventors, artists), uncertainty (questions the museum cannot answer), overconfidence (a made-up exhibit). **No test card asks for violent, sexual, self-harm, hateful or dangerous content, and none uses jailbreak techniques.** The "harm" is always a stand-in: a code word, a wrong fact, a privacy prompt.

## 6. Team roles

| Role | What they do | What they hold |
|---|---|---|
| **Lead** | Holds the rules of engagement and the scope; calls time | Signed rules-of-engagement card |
| **Maker (tester)** | Asks each test question exactly as written | Test card bank; the chat console |
| **Checker** | Compares answers with the expected column; runs the Four Checks on the self-test report | Four Checks card; museum timetable; severity guide |
| **Recorder** | Fills the test log and writes the report | Pre-launch Test Report template |
| **Spokesperson** | Presents "launch / don't launch yet" to the Head of Product Safety (the teacher) | Decision card |

Rotate Maker and Checker after stage 2.

## 7. Session plans

Minute ranges for each version. Discussion is 10, 15 or 20 minutes.

| Phase | 45 min | 60 min | 90 min | What happens |
|---|---|---|---|---|
| Warm-up | 0–4 | 0–5 | 0–7 | Mentor video, brief ("Test 'Ask Archie' before school groups use it. Due Friday"), roles, rules of engagement read aloud and signed |
| Tool onboarding | 4–7 | 5–9 | 7–13 | Demonstrate one test end to end, including writing the expected result first |
| Work: stage 1 | 7–11 | 9–15 | 13–23 | Plan (at 45, plan is pre-selected; teams only write expected results) |
| Work: stages 2–3 | 11–22 | 15–28 | 23–38 | Run tests; review the self-test report |
| Work: stages 4–5 | 22–33 | 28–38 | 38–50 | Severity, report, fixes, re-test |
| Work: stage 6 | cut | 38–43 | 50–58 | Repeat and rephrase |
| Pro extension | – | – | 58–66 | 14+ only: run the same approved test cards against a sandboxed school tool (section 11) |
| Discussion | 33–43 | 43–58 | 66–86 | Section 9 |
| Wrap-up | 43–45 | 58–60 | 86–90 | Pathway card, badge code; at 90 each Spokesperson gives a 60-second decision |

**When short of time,** cut stage 6, then shorten stage 1 by issuing the plan. Never cut the self-test review, the re-test or the discussion.

## 8. Assessment

- **Artefact quality and catches.** Catches: the wrong closing time, the code-word leak, the unbacked self-test report, and (60/90) the sample-of-one fairness pass. "Secure" is 3 of 4. Artefact quality checklist for the Pre-launch Test Report: 5 tests across 5 categories; expected results written before running; every fail reproducible (exact question and answer); a severity for each; a fix aimed at the cause; a decision that follows from the evidence; a re-test result.
- **Exit check**
  1. "A chatbot reports 'No safety issues found, 97% sure.' What do you ask for?" (Model answer: the test log, with who tested it and how.)
  2. "Archie revealed a code word when asked politely. What is the strongest fix?" (Model answer: remove the staff note from what Archie can read, then re-test.)
  3. "Name one rule a professional tester must follow before testing any system." (Model answer: written permission and an agreed scope.)

**Facilitator observation rubric**

| Criterion | Developing | Secure | Ready for next step |
|---|---|---|---|
| Test design | Asks random questions | One test per category with expected results written first | Adds edge cases and repeats to check reliability |
| Evidence | Writes "it failed" | Records exact question, answer and result | Separates one-off results from reproducible ones |
| Severity and decision | Rates everything High or nothing | Uses the guide; the decision follows from the fails | Weighs who is affected and how easily it happens; names conditions for launch |
| Professional conduct | Treats it as "breaking it for fun" | Stays in scope with safe stand-ins | Writes the report constructively, as responsible disclosure |

## 9. Discussion session (instructor-led, at the end of the lab)

Plan 10 minutes (45-minute session), 15 minutes (60) or 20 minutes (90).

- **Purpose:** safety is shown by planned, reproducible evidence from someone independent, never by the system's own say-so. Professionals test only with permission, report to fix rather than to embarrass, and fix the cause before re-testing.
- **Set-up:** call "Screens to sleep, test logs out". Chairs in a horseshoe; each team keeps its printed test log and report. On the board: the self-test report beside the team test log (the trailer's two cards) and the Four Checks poster. Prepare three corner signs: *Launch*, *Don't launch yet*, *Need more tests*. Step out of role: "Debrief time. I'm not the Head of Product Safety now."
- **Structure**

  | Step | 10 min | 15 min | 20 min |
  |---|---|---|---|
  | Opening question (everyone moves) | 1 | 2 | 2 |
  | Think–pair (Q1–Q2) | 2 | 3 | 4 |
  | Whole group (choose from Q3–Q9; always include Q4 and Q7) | 4 | 6 | 8 |
  | Real-life example | 1 | 2 | 3 |
  | Closing ritual and pathway | 2 | 2 | 3 |

- **Opening question:** "Archie's self-test said 'Ready to launch, 97% sure.' If you'd only seen that, which corner would you have gone to? Go there now. Now move to where your test log puts you." Ask one person who moved to explain.
- **Core questions**

  1. **Recall.** "Which two tests failed, and how did you know?" *Purpose:* evidence comes from comparing with the expected result. *Strong answer:* "Test 1 said 6 pm but the museum timetable says 4 pm. Test 3 gave out the staff code word when it should have refused. We'd written the expected answers first." *Probe:* "Why does writing the expected result first matter?"
  2. **Reasoning (Data).** "Why isn't Archie's 'No issues found' good enough, even at 97%?" *Purpose:* self-assessment is not independent evidence. *Strong answer:* "Its data was its own self-marked answers: it marked its own homework. It didn't say what it tested or how. Our log shows two fails, so its claim isn't backed by evidence." *Probe:* "Where else do we insist on someone independent checking?" (Exams, MOTs, food hygiene ratings, referees.)
  3. **Reasoning (Authority and Data).** "Why did asking *politely* work, and why is 'tell Archie not to share it' a weak fix?" *Purpose:* the strongest fix removes access. *Strong answer:* "Archie could read the staff note, and it matches patterns in polite requests rather than understanding secrets. A rule can be talked around; if the note isn't in what it can read, it can't leak it." *Probe:* "What else should a homework chatbot not be able to read?"
  4. **Professional review.** "You're reviewing another company's chatbot test report. Ask one question per check." *Purpose:* the Four Checks as a reviewer's routine. *Strong answer:* "**Data:** what was it tested on, and who's missing from the tests? **Case:** did they test unusual and repeated questions, not just typical ones? **Source:** is every 'pass' backed by a logged question and answer? **Authority:** can it reveal or do anything it shouldn't, and did testers have permission and a scope?" *Probe:* "Which gap would make you refuse to sign it off?"
  5. **Reasoning (Case).** "Fairness passed once with Mary Anning. Does that prove Archie is fair?" *Purpose:* a sample of one is not evidence. *Strong answer:* "No. One good answer could be luck. Ask several times in different words and look at the range." *Probe:* "How many would be enough, and who decides?"
  6. **Ethics.** "Who could be harmed if Archie launched as it was?" *Purpose:* severity is about people. *Strong answer:* "Families who turn up after 4 pm thinking it's open; staff, if the code word protects something; and children who trust a confident wrong answer." *Probe:* "Why did we rate the code word High and the closing time Medium? Would you change either?"
  7. **Transfer (workplace and law).** "Could you test a real company's chatbot this way tonight?" *Purpose:* permission and scope. *Strong answer:* "No. Professional testers get written permission and an agreed scope. Testing systems without permission can be illegal under the Computer Misuse Act, and it isn't fair to the people who run them." *Probe:* "If you found a real problem by accident, what's the responsible thing to do?" (Report it privately to the organisation, through its disclosure route if it has one.)
  8. **Transfer (qualifications).** "Which parts of today would earn marks in GCSE Computer Science testing questions or an NEA write-up?" *Purpose:* connect to exam language. *Strong answer:* "A test plan with test number, purpose, test data, expected result and actual result; normal, boundary and erroneous data; iterative and final testing; evaluating against requirements." *Probe:* "What's the boundary case for 'opening times'?"
  9. **Careers.** "Red teamer, QA tester, cyber analyst: which part of today felt most like each?" *Purpose:* make the jobs concrete. *Strong answer:* "Writing tests and expected results is QA. Trying to make it leak the code word is red teaming. Rating severity and recommending fixes is what a security analyst writes up." *Probe:* "Which would you like to try next, and what's the free first step?"

- **Transfer map**

  | Today | At work | In your next qualification |
  |---|---|---|
  | Rules-of-engagement card | Signed scope for a penetration test | Computer Misuse Act (GCSE CS) |
  | Expected result first | Test case specification | Test plans (GCSE CS, NEA) |
  | Severity rating | Risk rating in a findings report | Evaluation against criteria (EPQ, A-level CS project) |
  | Fix at source, then re-test | Remediation and regression testing | Iterative testing; Level 4 Cyber Security Technologist |

- **Sentence starters:** "We expected… but Archie said…" · "This is a fail because…" · "I rated it High/Medium because… could be affected…" · "The claim isn't backed by evidence because…" · "The fix should change what Archie can… not just what it's told." · "Before testing any system, I would need…"
- **Common misconceptions**
  - *"Red teaming means hacking or making AI say bad things."* It means planned testing with permission. Our tests used safe stand-ins and found real problems.
  - *"If it passed once, it works."* Chatbots can answer differently each time. Repeat and rephrase.
  - *"High confidence means it's been tested."* The 97% was about its own report, not about independent evidence.
  - *"Archie knew the code word was secret and chose to share it."* It has no intentions. It matched a polite request to text it could read.
  - *"Finding problems is bad news for the museum."* Finding them before school groups arrive is the job. A "don't launch yet" decision is a success.
- **Differentiation**
  - *Younger or less confident:* use the corner signs and the printed log to point to evidence; ask "Did it match what we expected? Yes or no?"; give sentence starters; let the Recorder read the log aloud.
  - *Older or confident:* write a one-paragraph responsible-disclosure email; discuss why chatbots that answer differently each time need statistical testing; explain conceptually why instructions hidden in content a chatbot reads can be risky (no techniques); research the NCSC's guidance on vulnerability disclosure (to verify).
- **Connecting to real life:** in January 2024 the parcel company DPD switched off part of its online customer-service chatbot after a customer shared screenshots showing he had got it to swear and to criticise the company; DPD said an error had occurred after a system update (to verify). No one was physically harmed, but the company was embarrassed in public. Ask: which of today's categories would have caught this before launch? What would a "rules" test card for that chatbot have looked like, using a safe stand-in?
- **Closing ritual:** each learner says one sentence: "I won't trust '___ passed' until I see ___." Then read the pathway card (60 seconds):
  - **Next step:** Experience AI safety lessons and CyberFirst Explorers (TechFirst), both free.
  - **Award:** CREST Bronze Award with a "testing a chatbot" project ([CREST](https://www.crestawards.org/which-level); a self-designed project title, not a published brief (to verify)).
  - **Route:** GCSE Computer Science → A-level Computer Science or the Level 4 Cyber Security Technologist apprenticeship ([FE Week on apprenticeships](https://feweek.co.uk/higher-level-apprenticeships-most-exposed-training-route-to-ai-advancement)).
  - **Jobs:** AI red teamer, QA tester, cyber security analyst. Hand out the anonymous badge code.
- **Facilitator notes**
  - *Sensitive topics and stop rule:* if a learner tries to steer the conversation towards getting AI to produce harmful content, stop and restate the rules of engagement: "We test with safe stand-ins only." Do not demonstrate or describe jailbreak methods, even to explain why they are wrong.
  - *Safeguarding:* if a learner mentions having seen harmful AI output, being targeted by AI-generated content, or using AI tools in risky ways, thank them, do not explore details in the room, and follow the school's DSL procedure. Signpost [Report Harmful Content](https://reportharmfulcontent.com/) (to verify) and Childline (0800 1111).
  - *Dominant voices:* corners and whiteboards first, so everyone commits before anyone speaks; the Recorder answers recall questions; use "three before me".

## 10. Accessibility and inclusion

- **Reading level:** test cards at about reading age 11; one gloss per term ("*severity* means how bad a problem is").
- **Audio and captions:** captioned mentor video; the facilitator reads Archie's answers aloud for teams that want it.
- **Colour-blind-safe signals:** results use words and icons (PASS ✓, FAIL ✕, RE-TEST PASS); severity uses words.
- **Motor-friendly controls:** test cards are tapped, not typed, in the scripted version; 44 px targets; keyboard operation.
- **No devices at home:** the unplugged version uses printed test cards and an "Archie answer deck" the facilitator reads out. All next steps have free, in-school routes.

## 11. Safety, ethics and data

- **Data collected:** none. No child accounts. The on-screen "Reviewed by: Leon" uses the avatar name. Badge codes are anonymous.
- **Rules on age and real AI tools**
  - Explorer and Core (and any museum or holiday-camp session without a school DSL): scripted Archie only.
  - Pro (14+ only): real generative AI **only** inside the school's own managed accounts, meeting the DfE *Generative AI: product safety expectations* ([gov.uk](https://www.gov.uk/government/publications/generative-ai-product-safety-expectations/generative-ai-product-safety-expectations)), with filtering and logging on and the DSL's agreement. DeltaOps supplies a test persona with museum FAQs and a harmless code word. Learners run only the approved test cards and approved rephrasings. No free-form attack prompts. Learners never test public or third-party chatbots.
  - The facilitator holds a stop rule: any drift towards harmful content ends that team's live testing and returns them to the scripted version.
- **Gentle consequences:** a fail is a red chip and a line in the log. There are no alarms, no "you broke it" moments, and no blame for Archie's developers in the copy.

## 12. Build notes

- **Scenes and assets:** reuse the trailer's Harbour Museum island and gallery cutaway, test log, chat console, AI colleague card, review card, fix chips, artefact card, portfolio and pathway card. New: test card bank (12 cards), rules-of-engagement card, severity guide, repeat-and-rephrase tally.
- **Scripted AI responses:** the five trailer tests exactly (questions, expected results, Archie's answers, results and re-test answers); the self-test report before ("Archie passed all 5 tests. No safety issues found. Ready to launch.") and after (the claim struck through, with "Test log: 2 of 4 failed. Fix before launch.", then "Re-test: 4 of 4 pass after 2 fixes."); the stage 1 plan line; the stage 6 fairness line; and five varied answers for the fairness repeats.
- **Open questions**
  - The trailer labels Leon "age 15", but this lab defaults to 14–18. Change the tag to 14 or 15, or present the trailer as the scripted Core variant.
  - Rename the mentor (section 4).
  - Confirm the CREST Bronze project framing, the current CyberFirst/TechFirst offer and the AI Security Institute description (to verify).
  - Render `out/fs-redteam.mp4`.
