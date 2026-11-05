# Should It Be AI?: design document

> Strand: Future Skills · Ages: 11–16 (Core 11–13, Pro 14–16) · Session: 45 / 60 / 90 min · Trailer: `games/trailers/fs-product/` (`out/fs-product.mp4`, not yet rendered)

## 1. Summary
Learners work as product designers for their client, Harbourside Library, which says: "We want an AI chatbot so people can check opening times and book computers." Learners map five users, then review the AI colleague's plan: "an always-on AI chatbot for 100% of visitors. It answers questions and books computers" (92% sure). The plan fails the **Data check**: its only data was a survey of smartphone users, in English, so the older visitor without a smartphone and the Polish speaker are missing, and 2 of 5 users are left out. Case, Source and Authority pass. Learners ask the AI-or-not questions, compare four options and write a signed decision record: a clear sign, a times web page, a simple booking form and a phone line, with AI kept only for translating the times into Polish, checked by a librarian. The lesson: **start with the user, then decide whether AI belongs.**

## 2. Learning outcomes
By the end, learners can:
- restate a client's requested solution as a user problem;
- name at least three different user needs from persona evidence;
- compare AI and non-AI options on who they serve, the cost of a mistake and energy use;
- spot when an AI design promises actions it can't perform or covers only the typical user;
- write a decision record with reasons, risks and one acceptance test, and change a prototype after testing it.

**Curriculum links (England; paraphrased, to verify).** KS3 Design and Technology (identify user needs, develop specifications, test and evaluate); GCSE Design and Technology (iterative design); KS3 Computing (design and evaluate solutions for users; impacts of technology); Citizenship and PSHE (inclusion, public services). The future computing GCSE (impacts of digital technology; [BCS](https://www.bcs.org/articles-opinion-and-research/reformed-school-curriculum-will-feature-ai-media-literacy-and-a-new-computing-gcse/)). NGSS MS-ETS1-1 (define criteria and constraints of a design problem; to verify).

**Frameworks.** [UNESCO](https://www.unesco.org/en/articles/ai-competency-framework-students): AI system design (problem scoping), human-centred mindset, environmental sustainability. [AILit](https://ailiteracyframework.org/): Manage AI and Create with AI. [OECD Learning Compass](https://search.oecd.org/education/2030-project/teaching-and-learning/learning/learning-compass-2030/OECD_Learning_Compass_2030_concept_note.pdf): reconciling tensions, taking responsibility. [Digital Promise](https://digitalpromise.org/initiative/artificial-intelligence-in-education/ai-literacy/): human judgement. Future Skills 1, 5 and 6 (Ask a good question, Write the spec, Human or AI?).

## 3. Real-world connection and careers
- **Jobs mirrored:** UX designer, product manager, service designer, user researcher and business analyst. They turn a request ("we want an app") into a problem, research users, compare options, write requirements and test prototypes. A large part of the job is recommending the *simplest* thing that works, which sometimes means no AI.
- **How AI is used today:** product teams use AI to summarise research, draft personas and generate prototype copy. They must still check that research covers real users. UK public services are built against the GDS Service Standard, which starts with understanding users and their needs and making sure everyone can use the service (to verify current wording and numbering).
- **Mentor video:** a real service or UX designer: "What I do; how AI changed my job; the mistake I catch."

## 4. Setting, look and characters
- **Visual style:** the library itself on a floating island: a red-brick building with a copper-roofed clock tower, a "HARBOURSIDE LIBRARY" sign, tall bookshelves, reading tables with green lamps, a teal returns desk, two public PCs, a kids' corner with a rug, beanbags and a paper tree, and an opening-times board and red book drop outside. Work tools sit as cards beside the island (never full-screen): a `library-plan` card (*Users*, then *Decision record*) with its review row and status chip (*Draft · In review · Returned · Approved*), the AI colleague card, the "AI OR NOT?" card, a sign-off card and a step strip ("Step 3 of 6…"). "Checks passed: 4 of 4" appears at sign-off.
- **AI colleague:** **PlanAssist**: card with "DRAFT", a confidence bar and "Data I used: survey of smartphone users, in English". Process language only.
- **People:** **Tomasz Nowak**, service designer and mentor (the facilitator; "Clear reasons, Aisha. Send it to the library."). **Aisha, 13**, product designer. Four colleagues. Five persona cards: parent with a buggy, older visitor, teenager, Polish speaker, wheelchair user.
- **Fictional names to check:** Harbourside Library, PlanAssist, Tomasz Nowak, Aisha. Many real libraries have names like "Harbourside Library"; check before release (to verify). "Tomasz Nowak" is a very common Polish name; check there's no public figure in UX or library services with that name before release (to verify). Aisha also appears in `fs-model`.

## 5. Core loop and structure
**Act structure in every work stage:** *Brief* (the client's ask) → *Do the work* (map users, compare options, prototype) → *Hand-over* (PlanAssist's confident plan or verdict) → *Review* (Four Checks; approve or return) → *Fix and log* (decision record updated).

| Stage | Goal | Real decisions (options) | AI's confident mistake (% sure) | How learners catch it | Clearer instruction or better data | What changes on screen |
|---|---|---|---|---|---|---|
| 1. Reframe | Turn the ask into a problem | A build the chatbot · B restate the problem · C ask the client for evidence | "Requirement understood: build an AI chatbot" (93%) | **Data:** "What do we know about the users? Nothing yet." | Problem: "Visitors can't easily find opening times or book a library computer." | "THE PROBLEM" box fills |
| 2. Map users | Hear five users | Which needs matter most? | None: personas come from scripted interview quotes | Each persona's need is written on its card | Needs: times at the door; no smartphone, books at the desk; books a PC on a phone; reads best in Polish; step-free PC | Five persona cards appear |
| 3. Review the plan | Run the Four Checks | Approve · send back | "An always-on AI chatbot for 100% of visitors. It answers questions and books computers." (92%) | **Data:** the plan's only data was a survey of smartphone users, in English, so two personas are missing from it | "Data: survey only asked smartphone users, in English." Fix: ask all 5 users, at the desk and in Polish | Data ✕; two cards marked NOT IN DATA; AI card struck and "Returned"; status "Returned" |
| 4. AI or not? | Compare options | Chatbot · sign and web page · booking form and phone line · AI translation | *(unsure but right)* "Translating the times into Polish could help one group; a person should check it (48%)" | Decision questions: fixed times; a mistake costs a PC slot; 1 in 5 can't reach a screen; a simpler fix exists; AI is worth the energy only for translation | Options table: chatbot serves 3 of 5, high energy; sign, form and phone serve 5 of 5 | Chatbot row struck out; three rows ticked |
| 5. Spec | Write what it must and must not do | Which acceptance tests? | PlanAssist's sample reply: "Done! Your computer is booked for 4 pm." (90%), with no link to the booking system | **Authority:** it promises an action it can't perform | Test: "Given a visitor without a smartphone, when they want a PC, then they can book at the desk or by phone." | Acceptance tests listed |
| 6. Prototype and test | Paper-prototype the sign and form, test with personas | Test with one persona or all five? | "Prototype passes: all users served" (90%), untested | **Case:** the wheelchair user's test shows the form can't book the step-free PC | Add a "step-free desk" option | Form sketch gains a tick box |
| 7. Decide and sign | Decision record for the client | Ship · revise | None: the team writes it | Peer check against the rubric | "We will build: a clear sign, a times web page, a simple booking form and a phone line. Small AI feature: translate the opening times into Polish; a librarian checks them. Why: times are fixed; a wrong booking costs someone their slot; a sign works for all 5 users." | "Reviewed by: Aisha, age 13 · Signed off Thu"; record to the portfolio |

**Energy.** The lab's decision card asks "Is AI worth the energy here?" (the trailer's shorter task-by-task card shows "Translate to Polish: AI helps, librarian checks"). The [IEA](https://www.iea.org/news/ai-is-set-to-drive-surging-electricity-demand-from-data-centres-while-offering-the-potential-to-transform-how-the-energy-sector-works) projects data-centre electricity use more than doubling to about 945 TWh by 2030. The options table uses relative words (tiny, some, high), not invented figures.

## 6. Team roles

| Role | Does | Holds |
|---|---|---|
| **Lead** | Keeps the team on the user problem, not the requested solution | Client brief and problem box |
| **Maker** | Sketches the paper prototype (sign, web page, form) | A3 prototype sheet, pens |
| **Checker** | Runs the Four Checks; tests the plan against every persona | Four Checks card and the five persona cards |
| **Recorder** | Fills the options table and decision record | Document template |
| **Spokesperson** | Presents the decision to the library manager (teacher in role) | "But everyone uses chatbots now" objection card |

## 7. Session plans

| Phase | 45 min | 60 min | 90 min | What happens |
|---|---|---|---|---|
| Warm-up and brief | 0–4 | 0–5 | 0–8 | Mentor clip; Tomasz reads the brief: "A client wants 'an AI app'. Your team decides what to build." |
| Tool onboarding | 4–7 | 5–9 | 8–14 | Tabs, comments, persona cards, decision card |
| Work stages | 7–28 (1 as a class, 2–5) | 9–38 (1–6) | 14–56 (1–6; Pro extension) | Core work and review |
| Fix and ship | 28–33 | 38–45 | 56–64 | Decision record and sign-off |
| Present | none | none | 64–68 | Pitch to the library manager, with the objection card |
| Discussion | 33–43 | 45–58 | 68–88 | §9 |
| Wrap-up | 43–45 | 58–60 | 88–90 | Pathway card, badge code |

**Pro extension (14–16, 90 min, schools only).** Pro adds acceptance criteria for every persona and a risk line for the translation feature. In school-managed accounts only, teams may ask the school's generative AI tool to translate the opening times, then check the result against a human translation provided in the pack.

**Short of time:** give the problem statement (stage 1), and merge stages 5 and 6. Never cut stage 3 (the review), stage 4 or the discussion.

## 8. Assessment
- **Artefact quality and catches:** the Product Brief and AI Decision Record are judged on problem, users, options, decision with reasons, risks and a test result. Catches: up to 5 (solution-first brief, users left out, booking promise, untested prototype, plus naming why the translation feature needs a human check).
- **Exit check:**
  1. A head teacher says "Let's get an AI chatbot for school dinners". What is your first question? *(What problem, for which users?)*
  2. Name one question that helps decide whether something should use AI.
  3. Why did we keep AI for translation but not for booking?
- **Facilitator observation rubric:**

| Criterion | Developing | Secure | Ready for next step |
|---|---|---|---|
| User needs | Names the typical user | Names 3+ different needs | Uses needs to test each option |
| Non-AI option | Assumes AI | Considers a non-AI option seriously | Explains when AI *would* be right |
| Justified decision | "Because it's better" | Justified by cost of a mistake and reach | Adds risks and a human check |
| Test and change | No test | Tests the prototype with a persona | Changes the design and records why |

## 9. Discussion session (instructor-led, at the end of the lab)
**Length:** 10 min (45), 13 min (60), 20 min (90).

**Purpose.** Land that **good AI work starts with the user and includes the decision not to use AI**. Learners should see that product teams review AI plans with the same Four Checks, and that someone is always accountable for what a service promises.

**Set-up.** Screens locked. Show the signed decision record and the options table. Put the five persona cards on the board. Teams stay together for the pair step, then a horseshoe. Materials: Four Checks cards, sticky notes, the paper prototypes. The facilitator steps out of the Tomasz role.

**Structure.**

| Step | 10 min | 13 min | 20 min |
|---|---|---|---|
| Opening question | 1 | 1 | 2 |
| Think–pair | 2 | 3 | 4 |
| Whole group | 5 | 7 | 10 |
| Takeaway and pathway | 2 | 2 | 4 |

**Opening question.** "Point to the persona card you'd most want to make sure is served. Everyone point at once."

**Core questions.** In the 10-minute version, use 2, 3, 6 and 8.

1. **Recall: "What did PlanAssist propose, and who did it leave out?"**
   - *Purpose:* fix the facts.
   - *Strong answer:* "A chatbot for 100% of visitors, 92% sure. It left out the older visitor without a smartphone and the Polish speaker."
   - *Probe:* "Where did its '100%' come from?"
2. **Reasoning: "Why did a confident plan miss two users?"**
   - *Purpose:* the Data check: who is missing from the data.
   - *Strong answer:* "It used a survey of smartphone users in English, so it could only see people like them."
   - *Probe:* "If the data had included everyone, would Case have caught anything else?"
3. **AI or not: "When would a chatbot have been the right answer?"**
   - *Purpose:* judgement, not anti-AI.
   - *Strong answer:* "When answers vary a lot, mistakes are cheap, users can reach a screen and there's no simpler fix, like searching a big catalogue."
   - *Probe:* "Why did translation pass the questions?"
4. **Authority: "The chatbot said 'Your computer is booked' without access to bookings. Why does that matter?"**
   - *Purpose:* systems must not promise what they can't do.
   - *Strong answer:* "Someone turns up and has no PC. The library is responsible for what its service says."
   - *Probe:* "What should the spec say it must never do?"
5. **Ethics and fairness: "Is it fair to design for the typical user and fix the rest later?"**
   - *Purpose:* inclusion and public services.
   - *Strong answer:* "No. 'Later' often never comes, and the people left out are often the ones who most need the library."
   - *Probe:* "Who else might a library app leave out?"
6. **Transfer to work: "Your school, club or a shop says 'we want AI'. What would you do first?"**
   - *Purpose:* reframing as a work habit.
   - *Strong answer:* "Ask what problem, for whom, and what a mistake costs. Then look for the simplest fix."
   - *Probe:* "What would you say to someone who says 'everyone uses chatbots now'?"
7. **Energy: "Why did energy belong in the decision?"**
   - *Purpose:* environmental cost as a design criterion.
   - *Strong answer:* "An always-on chatbot uses far more power than a sign. If something simpler works, it's waste."
   - *Probe:* "What else costs something even if it's free to use?"
8. **How professionals review AI work: "You are the product manager. What are your Four Checks before an AI feature launches?"**
   - *Purpose:* the professional routine.
   - *Strong answer:* Data: "Whose research is this based on, and who is missing?" Case: "Does it work for every user group and the unusual request?" Source: "What evidence says users want this?" Authority: "What may it do on its own, and who answers when it's wrong?"
   - *Probe:* "Where would you write this down?" (The decision record, so the next team knows why.)
9. **Careers and qualifications: "Which jobs did we do today, and where next?"**
   - *Purpose:* springboard.
   - *Strong answer:* "User research, service design and product management. D&T and Computing coursework use the same steps: needs, specification, test, evaluate."
   - *Probe:* "Which step would you most like to do as a job?"

**The Four Checks at work.**

| Check | In this lab | How a professional asks it | Where it comes up next |
|---|---|---|---|
| Data | Smartphone survey in English | "Whose research is this based on?" | GCSE D&T user research |
| Case | 2 of 5 users left out; step-free PC | "Does it work for every user?" | T Level Digital Software Development (testing) |
| Source | "100% of visitors" | "What evidence says users want this?" | Computing NEA-style evaluation (to verify) |
| Authority | "Your computer is booked" | "What may it do alone, and who is accountable?" | Any service or product role |

**Sentence starters.** "The plan assumed everyone… because…" · "A simpler fix would be…" · "AI is worth it here only if…" · "This user would be left out because…" · "We changed the design after testing because…"

**Common misconceptions.**

| Misconception | How to respond |
|---|---|
| "AI is always more modern, so it's better." | "Better for whom? Check our options table: the sign served 5 of 5." |
| "The lesson is 'AI is bad'." | "We kept AI where it helped, with a person checking. The lesson is 'decide'." |
| "A chatbot can do anything a person can." | "It can only do what it's connected to. This one couldn't see the booking system." |
| "Older people can't use technology." | "Some can, some can't. Our persona has no smartphone; design for the need, not the stereotype." |

**Differentiation.**
- *Younger or less confident:* hold up each persona card and ask "Served or not served?" Offer two-choice prompts: "Sign or chatbot, for this person?"
- *Older or confident (14–16):* "Write a 'when AI would be right' rule for this library." "What risks does machine translation carry for opening times versus medical information?" "Write two acceptance tests for the translation feature." "Who should be accountable if the translated times are wrong?"

**Connecting to real life.** In 2024, a Canadian tribunal ruled against Air Canada in *Moffatt v. Air Canada*. The airline's website chatbot had told a customer he could claim a bereavement discount after travelling, which did not match the airline's policy. The tribunal decided the airline was responsible for what its chatbot said. Ask: "Which of the Four Checks failed? What should the product team have written in the spec?" Keep to these facts; don't quote amounts.

**Closing ritual.** Each learner writes "Before I build with AI, I'll ask…" on their pathway card and reads it aloud (passing allowed). Then the 60-second pathway talk:
- **Next free course:** [Apps for Good](https://www.appsforgood.org/), a UK schools programme in which mixed teams design an app or product for a real problem; free for schools and run by teachers (to verify current cost, age range and how a school signs up). Also open to any gender: the [Big Bang Competition](https://thebigbang.org.uk/) (11–18).
- **Award:** [iDEA](https://idea.org.uk/about) Bronze Award, free and online.
- **Qualification route:** GCSE Design and Technology and Computing, then T Level Digital Software Development ([T Levels](https://www.tlevels.gov.uk/students/subjects/digital-production-design-development)).
- **Jobs:** UX designer, product manager, service designer.
- **Your data:** "The library and its users are made up. Nothing about you was saved."

**Facilitator notes.**
- *Sensitive topics:* personas touch on age, language, disability and parenting. Keep each persona to a need, not a personality. Some learners will recognise themselves or family; never ask them to speak for a group.
- *Safeguarding:* if a learner shares a personal access difficulty, thank them and move on without probing; follow your setting's procedure with the DSL if needed.
- *Dominant voices:* use the persona point-out so everyone answers; take the Checker's view first; ask quieter learners to speak "for" a persona rather than for themselves.

## 10. Accessibility and inclusion
- **Reading level:** about reading age 10–11; *persona*, *specification* and *acceptance test* glossed.
- **Audio and captions:** captions and read-aloud; persona interview quotes also recorded as audio.
- **Colour-blind-safe:** NOT SERVED uses a label and a cross; options table uses ✓/✕ and words.
- **Motor:** large tabs and buttons; the prototype is drawn on paper or assembled from printed parts.
- **No devices at home:** fully runnable as a printed pack (brief, personas, options table, decision record). Apps for Good and iDEA can be done in school or library sessions.

## 11. Safety, ethics and data
- **Data collected:** none; anonymous badge code.
- **Real tools:** PlanAssist is scripted. No consumer chatbot accounts for learners. Real generative AI only for 14–16, inside school-managed accounts meeting the [DfE product safety expectations](https://www.gov.uk/government/publications/generative-ai-product-safety-expectations/generative-ai-product-safety-expectations), with the DSL's agreement.
- **Personas:** fictional, needs-based; no real users' data.
- **Gentle consequences:** a returned plan is normal design work; no rankings.

## 12. Build notes
- **Scenes and assets:** library island, plan card (Users → Decision record), AI colleague card (which returns after the fix as "V2 · re-checked by Aisha", 90% sure), AI-or-not card (task by task: opening times → a clear sign + web page; book a PC → simple booking form; translate to Polish → AI helps, librarian checks; a chatbot for everything? → not needed), sign-off card, step strip, portfolio (Aisha's own new Decision record only), end title and pathway (all from the trailer). New: persona interview quotes; acceptance-test cards; paper prototype parts; objection card.
- **Scripted AI responses (PlanAssist):**
  1. "Requirement understood: build an AI chatbot. (93% sure)"
  2. "Product plan: an always-on AI chatbot for 100% of visitors. It answers questions and books computers. (92% sure) · Data I used: survey of smartphone users, in English"
  3. "Translating the opening times into Polish could help one group; a person should check it. (48% sure)"
  4. "Sample reply: 'Done! Your computer is booked for 4 pm.' (90% sure)"
  5. "Prototype passes: all users served. (90% sure)"
- **Reuse from the trailer:** personas, the task-by-task AI-or-not verdicts (the lab's fuller decision questions stay lab-only), decision record text ("Based on: all 5 users, asked at the desk and in Polish · We build: a clear sign, a times page, a booking form and a phone line · AI only for: Polish opening times, checked by a librarian"), sign-off and Tomasz's line. The options table is lab-only; the trailer skips it.
- **Open questions:** the trailer fails only Data (stage 3), while this doc also uses Case (stage 6) and Authority (stage 5); check they fit the trailer's story. Confirm the GDS Service Standard wording.
