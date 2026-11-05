# Automation Designer: design document

> Strand: Future Skills · Ages: 14–18 (default; a scripted Core variant runs at 11–13) · Session: 45 / 60 / 90 min · Trailer: `games/trailers/fs-automate/` (`out/fs-automate.mp4`, 0:38; re-rendering)

## 1. Summary

Learners work as junior automation designers for a small bike-repair charity. The charity wants an AI agent to help with refund emails. Learners map the refund workflow in swimlanes, decide which steps the agent may do and where a human must sign off, and set the agent's permissions. Then they review its test-day log. The AI colleague reports "12 of 12 refund emails handled, 96% sure", but it matched customers on name only and moved money with no human check, so £15 went to the wrong Sam Taylor. Learners find out that the skill is designing the work around the agent (permissions, checkpoints, escalation and logs), and that a named person stays accountable for what the agent does.

## 2. Learning outcomes

By the end, learners can…
- map a real process as a swimlane diagram with at least 6 steps and 3 lanes (customer, AI agent, human volunteer);
- tag each step *Automate*, *AI drafts, human approves* or *Human only*, justified with three risk questions: is it reversible? does it touch money or safety? does it involve personal data?;
- set an agent's permissions to the minimum the task needs;
- read an agent log and name where it acted on weak data or beyond safe authority, using the Four Checks (Data, Case, Source, Authority);
- write one escalation rule and one monitoring rule ("what we watch, how often, who acts");
- say in one sentence who is accountable when the agent gets it wrong.

**Curriculum and framework links**

- England KS3/KS4 computing: model real-world problems with abstractions; understand how technology affects safety and privacy. GCSE Computer Science: decomposition, flowcharts, validation and unique identifiers, test data (normal, boundary, erroneous), and legal and ethical impacts including the Data Protection Act 2018 (check each awarding body's specification) (to verify).
- NGSS HS-ETS1-2 (break a complex problem into smaller ones) and HS-ETS1-3 (evaluate a solution against prioritised criteria and trade-offs, including safety).
- UNESCO AI Competency Framework for Students: AI system design and ethics of AI, ([UNESCO](https://www.unesco.org/en/articles/ai-competency-framework-students)). OECD/EC AILit: *Manage AI* and *Create with AI* ([ailiteracyframework.org](https://ailiteracyframework.org/)). AI4K12 Big Ideas 2 (representation and reasoning: the matching rule) and 5 (societal impact) ([AI4K12](https://ai4k12.org/)).
- DeltaOps Future Skills 5 (write the spec), 6 (human or AI?) and 12 (own the result). Layer B: AI-augmented work.

## 3. Real-world connection and careers

- **Jobs this mirrors:** automation specialist, operations analyst, business analyst, project coordinator, and apprentice AI and automation practitioner. They map how work is done today, find slow or risky steps, design the new process, write exception rules, test with sample data and monitor after go-live.
- **How professionals use AI in this work today:** agents read inboxes, look up records, draft replies and, in some finance workflows, trigger payments. Good practice borrows from IT security: least privilege, human approval before anything hard to undo, audit logs and staged roll-out. Microsoft's Work Trend Index 2025 describes everyone becoming an "agent boss" who "builds, delegates to, and manages agents" ([WorkLab](https://www.microsoft.com/en-us/worklab/work-trend-index/2025-the-year-the-frontier-firm-is-born)). The WEF *Future of Jobs Report 2025* lists data entry clerks among the fastest-declining roles and AI and big data as the fastest-growing skill ([WEF PDF](https://reports.weforum.org/docs/WEF_Future_of_Jobs_Report_2025.pdf), pp. 5–6).
- **Qualification route:** the Level 4 AI & Automation Practitioner apprenticeship (ST1512) is built on exactly this work and is aimed at people from non-technical backgrounds ([Cambridge Spark guide](https://www.cambridgespark.com/blog/level-4-ai-automation-apprenticeship-st1512-guide); approval date, duration and funding band (to verify)).
- **Mentor video:** "Ms Okafor, operations analyst" in the trailer. It counts as an employer encounter only if a real operations analyst contributes it ([Gatsby Benchmarks](https://gatsbybenchmarks.org.uk/?p=777)).

## 4. Setting, look and characters

- **Visual style:** a house-style floating voxel island themed as the charity itself: the Pedal Point shop front (striped awning, sign) beside an open cut-away workshop with bikes on repair stands, a pegboard tool wall, workbench, spare wheels and tyres, a laptop desk, bike racks outside and a blue cycle lane. In the trailer the **work tool** cards sit on the left while the island stays visible on the right: white cards, Inter type, teal `#16c79a` accent, and a status pill (*Draft · Test run · In review · Returned · Approved*).
- **The AI colleague:** no face and no personal name. It is a teal rounded-square bot glyph on a card labelled "AI colleague · draft READY". It shows a confidence bar ("96% sure") and a **Data I used** field. When the work is returned the card reacts: the claim is struck through, the chip flips to "RETURNED" and the bar drains to "Not trusted"; after the re-test it reads "V2 · RE-TESTED". It speaks in process language: "Sorted", "Matched", "Sent", "Drafted". It never says "I think" or "I feel".
- **Characters:** Nia (the learner's on-screen avatar, first name only), Ms Okafor (mentor, operations analyst), and two customers, both called Sam Taylor (bookings #2041 and #2118).

| Fictional name | Status |
|---|---|
| Pedal Point Community Bike Repair | **Rename before production.** "Pedal Point" is the name of a long-standing cycling campaign group in Edinburgh (to verify). Suggest a checked alternative such as "Chainline Community Bike Repair" (to verify) |
| Ms Okafor | Same surname as the Creative Producer mentor (Sam Okafor). Give one mentor a different surname |
| Sam Taylor ×2, Nia, bookings #2041/#2118/#2203 | Deliberately common or generic; keep |

## 5. Core loop and structure

**The act structure used in every work stage:** brief → do the work in the tool → the AI colleague hands over confident work → **review with the Four Checks** (approve, or return with a note) → fix and re-run → stamp the artefact.

| Work stage | Goal | Real decisions (options) | The AI's confident mistake (instruction → guess, % sure) | How learners catch it | The clearer instruction or better data | What changes on screen |
|---|---|---|---|---|---|---|
| 1. Map the work | Build today's refund process from 8 sample emails | Which lane each step goes in; whether a safety report belongs here (*in this flow / separate branch / out of scope*) | "Sort this week's emails into the refund workflow" → "40 emails sorted: all refunds or bookings. 91% sure" | **Case check:** read the lowest-confidence emails and two random ones. One is a brake-failure report | "Any email about brakes, injury or safety goes to a human the same day" | A red *Safety* branch appears |
| 2. Human or AI? | Tag all 6 steps | Per step: *Automate / AI drafts, human approves / Human only* | The colleague suggests "Send the refund: Automate, up to £20 (low value). 90% sure" | Risk questions card: hard to reverse, moves money. The facilitator does **not** correct a team that keeps it automated; stage 4 shows the consequence | Teams record their reason in the blueprint | Tags light up on each box |
| 3. Permissions | Give the agent the minimum it needs | Toggles: read inbox, find bookings, draft replies, send replies, send refunds up to £20; *Match customer by: Name / Booking number / Email* | "Recommended: all permissions on, so I can finish faster. 88% sure" | **Authority check:** does the task need this permission? | "Send replies" goes off; checkpoint 1 is dragged onto "Check and send reply" | Toggle flicks off; a checkpoint marker drops onto the map |
| 4. Test day (trailer) | Replay 12 refund emails | Approve the run, or return it with a note | "Test day done. 12 of 12 refund emails handled. £15 refund sent to Sam Taylor. 96% sure." Data I used: "Bookings sheet · matched by name" | **Data check:** the data line says "matched by name"; log line 09:04 shows a name-only match and there are two Sam Taylors, so £15 went to the wrong one. **Authority check:** the agent sent money with no human approval | Match by booking number (Data fixed); checkpoint 2, "Approve refund (Human)", goes before money moves and the refund step reads "After OK" (Authority fixed) | Data and Authority turn red, then green as each fix lands. AI card struck through, "RETURNED", then "V2 · RE-TESTED · Re-test: 12 of 12 correct. Each refund waits for a human OK." Re-run pauses at the approval step. "Checks passed 4 of 4" |
| 5. Exceptions | Write escalation rules for awkward emails | For each email: *agent handles / agent drafts / human only / pause the agent* | The colleague drafts a reply to a volunteer that includes a customer's home address "so you can collect the bike". 92% sure | **Authority check:** personal data goes only to people who need it. **Data check:** is the address needed at all? | "Never share a customer's contact details in a draft; a human arranges collection" | Escalation list fills; a **stop button** appears on the blueprint |
| 6. Ship | Finish Automation Blueprint v2 | Who owns the process? What do we monitor? | None: the team writes it | Peer swap: another team runs the Four Checks | Monitoring line, e.g. "Every week a volunteer checks 5 random refunds; one wrong-customer refund pauses the agent" | Approval stamp; blueprint drops into the portfolio |

**The AI was unsure but right (stage 5).** An email asks for a refund for a lesson booked under a different surname. The agent writes: "No exact booking match. Possible #2203, 41% sure. Sent to a human." #2203 is correct. The agent was right to ask instead of acting, and the facilitator says so: low confidence plus escalation is the system working.

## 6. Team roles

Teams of 3–5. Rotate after stage 3.

| Role | What they do | What they hold |
|---|---|---|
| **Lead** | Keeps the team to the brief and the deadline; asks the three risk questions at each step | Client brief; risk questions card |
| **Maker** | Operates the swimlane board and the permission toggles | The tool (shared screen or the printed board with sliders) |
| **Checker** | Runs the Four Checks on every handover; reads the log line by line | Four Checks card; printed bookings sheet (it shows both Sam Taylors) |
| **Recorder** | Writes the blueprint, the reasons and the escalation rules | Automation Blueprint template |
| **Spokesperson** | Presents the blueprint to the client (the teacher plays the charity manager) | Pitch card: "what the agent may do, where a human checks, who owns it" |

## 7. Session plans

Minute ranges for each version. Discussion is 10, 15 or 20 minutes.

| Phase | 45 min | 60 min | 90 min | What happens |
|---|---|---|---|---|
| Warm-up | 0–3 | 0–4 | 0–6 | Mentor video, client brief, roles. 60: "fist to five" on trusting agents with money. 90: a 2-minute "map your morning" swimlane in pairs |
| Tool onboarding | 3–6 | 4–8 | 6–14 | Facilitator demonstrates the board and toggles; at 90 each Maker tries them |
| Work: stages 1–3 | 6–15 | 8–20 | 14–30 | At 45, stage 1 uses 4 emails, not 8. At 90, roles rotate after stage 3 |
| Work: stage 4 | 15–25 | 20–30 | 30–42 | Test day, review, fix, re-run |
| Work: stage 5 | cut | 30–37 | 42–52 | Exceptions, the unsure-but-right email, the stop button |
| Work: stage 6 | 25–33 | 37–42 | 52–62 | Ship and stamp. 90 adds the Pro extension (14+): rebuild one step in a sandboxed no-code tool with dummy data, in school-managed accounts |
| Presentation | – | – | 62–68 | Each Spokesperson has 90 seconds with the "client" |
| Discussion | 33–43 | 42–57 | 68–88 | Section 9 |
| Wrap-up | 43–45 | 57–60 | 88–90 | Pathway card and badge code |

**When short of time,** cut in this order: stage 5 (use its unsure-but-right email as a discussion prompt instead), then the peer swap, then stage 1 (hand out a pre-built map). Never cut stage 4 or the discussion.

## 8. Assessment

- **Artefact quality and catches.** Catches logged in the review: the safety email (stage 1), money moved with no human check, the name-only match (stage 4), and the address in a draft (stage 5). "Secure" is 3 of 4. Artefact quality checklist for the blueprint: 6 steps mapped with a human or AI tag; every irreversible, money or safety step has a human checkpoint; permissions are minimal; customers are matched on a unique identifier; one escalation rule; one monitoring rule with an owner.
- **Exit check (three questions)**
  1. "The agent says 'Refund sent, 96% sure.' What one thing do you check first?" (Model answer: the log line showing how it matched the customer.)
  2. "Name one step you would never let an agent do alone, and say why." (Model answer: moving money, because it is hard to undo.)
  3. "The agent sends money to the wrong person. Who is responsible?" (Model answer: the organisation that set it up, through a named owner; not "the AI".)

**Facilitator observation rubric**

| Criterion | Developing | Secure | Ready for next step |
|---|---|---|---|
| Risk tagging | Tags steps by gut feel | Uses the three risk questions for each step | Weighs time saved against the cost of an error, and changes a tag with a reason |
| Least privilege | Leaves most permissions on | Turns off what the task does not need | Explains why a narrower permission is safer than a rule telling the agent to be careful |
| Reading the log | Accepts the summary | Finds the wrong-customer line | Traces the cause (name-only match) and proposes a unique identifier |
| Accountability | "The AI did it" | Names the charity as responsible | Names an owner, a monitoring routine and a stop rule |

## 9. Discussion session (instructor-led, at the end of the lab)

Plan 10 minutes (45-minute session), 15 minutes (60) or 20 minutes (90).

- **Purpose:** an agent is only as safe as the permissions, checkpoints and logs people design around it. Confidence is not a check. A named person stays accountable, so "the AI did it" is never an answer at work.
- **Set-up:** call "Lids down, chairs round": laptops closed to 45 degrees, chairs in a horseshoe facing the board. On the board: a frozen frame of the agent log (lines 09:04 and 09:05) and the Four Checks poster. On each table: the team's printed blueprint, sticky notes, mini-whiteboards and pathway cards face down. Step out of role: "I'm not your team lead any more. I want to know what you think."
- **Structure**

  | Step | 10 min | 15 min | 20 min |
  |---|---|---|---|
  | Opening question (everyone) | 1 | 2 | 2 |
  | Think–pair on whiteboards (Q1–Q2) | 2 | 3 | 4 |
  | Whole group (choose from Q3–Q9; always include Q4) | 4 | 6 | 8 |
  | Real-life example | 1 | 2 | 3 |
  | Closing ritual and pathway | 2 | 2 | 3 |

- **Opening question:** "Fist to five: before today, how happy would you have been to let an agent send refunds without asking anyone? Now show me again." Ask two people whose number changed to say why.
- **Core questions**

  1. **Recall.** "What did the agent's report say, and what did the log show?" *Purpose:* separate the summary from the evidence. *Strong answer:* "The report said 12 of 12, 96% sure. The log showed a name-only match and £15 sent to #2041, the wrong Sam Taylor." *Probe:* "Which log line will you read first next time?"
  2. **Reasoning.** "Why was it 96% sure and still wrong?" *Purpose:* confidence measures the match, not the truth. *Strong answer:* "It was sure the name matched. It only looked at names, so it couldn't know two customers share one." *Probe:* "What would need to be in the data for it to be unsure?"
  3. **Reasoning (Authority).** "Which permission did the damage, and what is the smallest fix?" *Purpose:* least privilege; checkpoints before irreversible steps. *Strong answer:* "Sending refunds without approval. Add a human approval before money moves and match on the booking number, which is unique." *Probe:* "Why not switch the agent off completely?" (Sorting and drafting still save time at low risk.)
  4. **Professional review.** "A finance team is reviewing an agent that pays suppliers' invoices. Give them one question per check." *Purpose:* make the Four Checks a portable review routine. *Strong answer:* "**Data:** what does it match on, and can two suppliers look alike? **Case:** what about £19.99 vs £20.01, a duplicate, a cancelled order? **Source:** can every payment be traced to an invoice and a log line? **Authority:** what can it do without asking, who approves, where is the stop button?" *Probe:* "Which check would you run first, and why?"
  5. **Transfer (workplace).** "Think of a shop, café, sports club or GP surgery. Name one task you'd give an agent and one you never would." *Purpose:* the risk questions work anywhere. *Strong answer:* "Drafting replies to 'when do you open?', because a person can check them. Never cancelling an appointment, because it's hard to undo and might be urgent." *Probe:* "What would change your mind?"
  6. **Ethics and fairness.** "Who is hurt when the agent is wrong, and would they find out?" *Purpose:* errors fall unevenly and can be invisible. *Strong answer:* "One Sam Taylor got money that wasn't theirs; the other may never know why their refund didn't come. People with common names or bookings under another name are more at risk. The charity loses trust." *Probe:* "Whose job is it to tell the customer, and what would you say?"
  7. **Accountability.** "The manager says, 'It was the AI's mistake.' Fair?" *Purpose:* own the result. *Strong answer:* "No. The charity chose to use it and chose its permissions. The agent has no intent; it follows the rules it was given." *Probe:* "Who is the owner in your blueprint? Is a name enough without a routine?"
  8. **Transfer (qualifications).** "If your blueprint were a GCSE Computer Science or T Level answer, which words would earn marks?" *Purpose:* connect lab language to exam language. *Strong answer:* "Decomposition, flowchart, unique identifier or primary key, validation, test data (normal, boundary at £20, erroneous), audit log, data minimisation." *Probe:* "Why is a booking number a better key than a name?"
  9. **Careers.** "Which part of today was most like Ms Okafor's job? What would an ST1512 apprentice learn next?" *Purpose:* make the job visible and reachable. *Strong answer:* "Mapping the process and writing exception rules. Next: real tools, interviewing the staff who do the work, measuring whether it saved time." *Probe:* "What from today could you use as an interview example?" (Situation, task, action, result.)

- **Transfer map** (on the board for the last whole-group minute)

  | Today | At work | In your next qualification |
  |---|---|---|
  | Swimlane map | Process map in an operations or IT team | Flowcharts and decomposition (GCSE CS); T Level project planning |
  | Human checkpoint before money | Approval step, "four-eyes" check on payments | Evaluating a solution against criteria (NEA, EPQ) |
  | Match on booking number | Unique customer ID, primary key | Databases and validation |
  | Agent log, stop button | Audit trail, incident review, runbook | Testing write-ups; ST1512 portfolio evidence |

- **Sentence starters:** "The agent assumed… because the only data it had was…" · "I would check… by reading…" · "This step should be *Human only* because…" · "The smallest permission it needs is…" · "The person accountable is…, and they would know something was wrong because…" · "At work this is called…"
- **Common misconceptions**
  - *"96% sure means it checked."* Ask "Sure about what?" The number describes how well a pattern fitted, not whether anyone checked the outcome.
  - *"More automation is always more efficient."* Compare time saved with time spent fixing a wrong refund and rebuilding trust.
  - *"A human in the loop fixes everything."* Only if the human sees the right information and has time. Clicking "approve" 50 times without the booking number is a rubber stamp. Ask what the approval screen must show.
  - *"Under £20 doesn't matter."* Someone still received another person's money, and small errors repeated daily add up.
  - *"The AI lied."* It has no intent; it matched text with the rule it was given. This is a design fault.
- **Differentiation**
  - *Younger or less confident:* point-and-sort with the three tag cards; ask yes/no first ("Should it send money without asking?"), then "why?"; answer through their role ("As Checker, I saw…"); sentence starters on a card.
  - *Older or confident:* design a monitoring measure (wrong-customer rate) and the threshold that pauses the agent; discuss how too many escalations make humans stop reading (automation bias); link to least privilege in cyber security; write a five-line incident report; ask whether UK GDPR rules on solely automated decisions with significant effects could apply here (to verify).
- **Connecting to real life:** in February 2024 a Canadian tribunal ruled that Air Canada had to honour what its website chatbot told a customer about a bereavement fare refund, even though the answer contradicted the airline's policy. The airline argued it was not responsible for the chatbot; the tribunal disagreed (*Moffatt v. Air Canada*, 2024 BCCRT 149) (to verify). Ask: that chatbot only *gave information*; today's agent *moved money*. If a company answers for its chatbot's words, what does it answer for when its agent acts?
- **Closing ritual:** each learner completes a sticky note and reads it aloud in turn: "Before an agent can ___, a human must ___." Then read the pathway card (60 seconds):
  - **Next step:** Elements of AI, free online ([elementsofai.com](https://www.elementsofai.com/); recommended 16+ (to verify)). For 14–15s, start with iDEA.
  - **Award:** iDEA digital skills badges, free ([iDEA](https://idea.org.uk/about)).
  - **Route:** T Level in Digital Software Development ([T Levels](https://www.tlevels.gov.uk/students/subjects/digital-production-design-development)) → Level 4 AI & Automation Practitioner apprenticeship (ST1512).
  - **Jobs:** automation specialist, operations analyst, business analyst. Hand out the anonymous badge code ([Open Badges 3.0](https://www.imsglobal.org/spec/ob/v3p0)).
- **Facilitator notes**
  - *Sensitive topics:* never ask about learners' own refunds or family money. Invite, never require, examples from part-time jobs. Meet worries about AI and jobs with balance: tasks change, and people who design and check AI work are in demand (WEF). Promise nothing.
  - *Safeguarding:* if talk of "money sent to the wrong account" leads a learner to mention being asked to receive or pass on money for someone else, or any scam, follow the school's DSL procedure. Do not investigate in the room.
  - *Dominant voices:* Spokespeople answer first, then Checkers; 30 seconds' silent think time before hands; whiteboards so everyone answers Q1–Q2; "three before me" (three different voices before anyone speaks twice).

## 10. Accessibility and inclusion

- **Reading level:** emails and cards at about a reading age of 11; job vocabulary glossed once ("a *permission* is what the agent is allowed to do"). Dyslexia-friendly print.
- **Audio and captions:** the mentor video is captioned; the facilitator reads the AI colleague's handover aloud. No information is carried only by sound.
- **Colour-blind-safe signals:** every status has an icon and a word as well as a colour (✓ *Correct*, ✕ *Wrong Sam Taylor*, ⏸ *Waiting*). Tags use the words "AI", "AI drafts", "Human only".
- **Motor-friendly controls:** toggles and drag targets at least 44 px; every drag has a tap-to-place alternative; full keyboard operation.
- **No devices at home:** the whole lab runs in the session. The unplugged version uses a printed swimlane board, slider cards for permissions and a printed agent log. Every pathway step has a free, in-school route (iDEA in school time; library access for Elements of AI).

## 11. Safety, ethics and data

- **Data collected:** none. No child accounts. The blueprint is printed or saved locally; the on-screen "Reviewed by: Nia, age 15" uses the avatar's name, not the learner's. Badge codes are anonymous until a school or parent redeems them.
- **Synthetic data only:** all emails, customers and bookings are invented.
- **Rules on age and real AI tools:** the default lab uses the scripted DeltaOps agent at every age. The Pro extension (14+ only) uses a real no-code automation sandbox **only** inside the school's own managed accounts, with dummy data, the DSL's agreement and logging on, meeting the DfE *Generative AI: product safety expectations* ([gov.uk](https://www.gov.uk/government/publications/generative-ai-product-safety-expectations/generative-ai-product-safety-expectations)). It never connects to a real inbox or payment system. Museums and holiday camps without a school DSL run the scripted version only.
- **Gentle consequences:** the wrong refund is shown as a red log line and a "Returned" status, never as an angry customer or a cost to the team. Retrying costs seconds.

## 12. Build notes

- **Scenes and assets:** the trailer's island, charity building and workshop; the swimlane board (3 lanes, 7 boxes A–G); permissions card; agent log card; AI colleague card; review card with four check chips; Automation Blueprint print layout; portfolio folder; pathway card. New: a stage 1 inbox view, the stage 5 exception cards, and a stop-button control.
- **Scripted AI responses (minimum set):** the stage lines in section 5 (stages 1, 2, 3 and 5, plus the stage 5 unsure-but-right line "No exact booking match. Possible #2203, 41% sure. Sent to a human."); the stage 4 handover and both agent logs exactly as in the trailer; and a variant for teams that put a human checkpoint on refunds from the start, where the wrong match surfaces at the approval screen ("Approve £15 to #2041 Sam Taylor?") for the Checker to catch.
- **Reuse from the trailer:** the brief card, swimlane map with its box positions and tags, the permission toggles and match rule, both logs, the review card and its "Data" and "Authority" findings, the blueprint artefact, the portfolio and pathway cards, and the end title ("Map the work. Decide what the AI may do. Check before money moves.").
- **Open questions**
  - The trailer labels Nia "age 15", but this lab defaults to 14–18. Either change the tag to 14 or 15, or present the trailer explicitly as the scripted Core (11–13) variant.
  - Rename "Pedal Point" and one of the two Okafor mentors (section 4).
  - Choose and vet the Pro sandbox tool against school-managed account terms (to verify).
  - Confirm the ST1512 details and the Elements of AI recommended age (research §10, items 6 and 15).
  - Render `out/fs-automate.mp4`.
