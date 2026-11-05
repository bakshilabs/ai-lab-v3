# Verification Desk: design document

> Strand: Future Skills · Ages: 11–16 (Core 11–13, Pro 14–16) · Session: 45 / 60 / 90 min · Trailer: `games/trailers/fs-verify/` (`out/fs-verify.mp4`, not yet rendered)

## 1. Summary
Learners work on the verification desk at Harbourside News. A story about the town's river barrier goes live at 4 pm, and the AI colleague, VeriAssist, has drafted it: the barrier "has cut flooding in the town centre by 80%, according to a 2024 study [1]" (94% sure). The **Source check** fails. Lateral reading in three new tabs shows the journal and the article don't exist, and the council's own 2023 review says homes flooded fell from 42 to 9. Learners fix the claim and the citation, check a viral photo and a quote, sign off at 3:42 pm and file a Fact-check card. The lesson: **a citation is a claim too; trace every source before you sign it off.**

## 2. Learning outcomes
By the end, learners can:
- read laterally: leave the page and open new tabs to find out who is behind a source;
- check that a citation exists and that it says what the text claims;
- tell an authentic image from a *current* one by finding its earliest appearance;
- give a rated verdict (True · Misleading · False · Can't verify yet) that matches the evidence;
- correct a claim so it states what the source measured, and record "how we checked".

**Curriculum links (England; paraphrased, to verify).** KS3/KS4 English (evaluate texts critically, identify bias); KS3 History (evaluate sources and evidence); GCSE Media Studies (representation, audiences, industries); KS3 Computing (use technology safely and responsibly, recognise inappropriate content); Citizenship (free press). The Curriculum and Assessment Review recommends more media literacy ([BCS](https://www.bcs.org/articles-opinion-and-research/reformed-school-curriculum-will-feature-ai-media-literacy-and-a-new-computing-gcse/)). [PISA 2029 Media & AI Literacy](https://www.oecd.org/en/about/projects/pisa-2029-media-and-artificial-intelligence-literacy.html) will assess these skills at 15.

**Frameworks.** [UNESCO](https://www.unesco.org/en/articles/ai-competency-framework-students): human-centred mindset, ethics of AI. [AILit](https://ailiteracyframework.org/): Engage with AI. [Digital Promise](https://digitalpromise.org/initiative/artificial-intelligence-in-education/ai-literacy/): Evaluate ("the most critical element"). [AI4K12](https://ai4k12.org/): Big Idea 5. Future Skills 7 (Check the claim), 11 (Explain it) and 12 (Own the result).

**Evidence.** The strongest in the strand: six 50-minute Civic Online Reasoning lessons made students twice as likely to spot questionable websites ([Wineburg et al. 2022](https://ed.stanford.edu/news/it-doesn-t-take-long-learn-how-spot-misinformation-online-stanford-study-finds)). One lab is a taster, not that programme; the pathway points to the full lessons.

## 3. Real-world connection and careers
- **Jobs mirrored:** journalist, fact-checker, open-source intelligence (OSINT) analyst, researcher, trust and safety analyst, librarian and archivist. Verification desks check claims, images and quotes before publication, keep an evidence trail, and publish corrections when they get things wrong.
- **How AI is used today:** newsrooms use AI to transcribe, summarise and draft, and some use tools that help detect manipulated media. Generative tools can produce citations that look real but don't exist, so editors check every reference. UK examples of verification teams include Full Fact and BBC Verify (to verify current details before naming in materials).
- **Mentor video:** a real fact-checker or verification journalist: "What I do; how AI changed my job; the mistake I catch."

## 4. Setting, look and characters
- **Visual style:** a voxel newsroom on a floating island: six desks, a bookshelf, a wall screen ("LIVE · 16:00 edition · 3 stories in review"), the sign "Harbourside News · Verification Desk", and a town behind. Work tools sit as cards beside the island, never full-screen: the story card `flood-barrier-story` with its review row, finding line and status chip (*Draft · In review · Returned · Approved*), the AI colleague card (which is struck and marked "Returned" once Source fails), a browser with tabs and a trail bar (`[1] › no journal › no publisher › council report ✓`), and a sign-off card. A step strip reads "Step 3 of 6…". "Checks passed: 0 of 4" rises to 4 of 4 at sign-off.
- **AI colleague:** **VeriAssist**: card with "DRAFT", confidence bar, "Data I used: news sites, 2019–2024" and "Citations: 1". Process language only.
- **People:** **Amara Osei**, Desk Editor and mentor (the facilitator; "Good catch, Hana. It can go live."). **Hana, 13**, Checker. Four colleagues at desks.
- **Fictional names to check:** Harbourside News, Harbourside Council, VeriAssist, Amara Osei, Hana, the cited author "J. Pennethorne" and the *Bulletin of Small-Town Waterways*. A web search found no journal of that exact title, but a real journal, *Coastal Resilience & Sustainability*, exists, and "J. Pennethorne" could match a real researcher. Change the fake citation to something unmistakably fictional (to verify). The example URL uses the reserved `.example` domain, which is safe. "Amara" is also the analyst in `fs-data`.

## 5. Core loop and structure
**Act structure in every work stage:** *Brief* (the 4 pm deadline) → *Do the work* (open tabs, trace, compare) → *Hand-over* (VeriAssist's confident draft or judgement) → *Review* (Four Checks; approve or return) → *Fix and log* (tracked edit, comment, verification log line).

| Stage | Goal | Real decisions (options) | AI's confident mistake (% sure) | How learners catch it | Clearer instruction or better data | What changes on screen |
|---|---|---|---|---|---|---|
| 1. Triage | Decide what to check first | Article claim · viral photo · council quote. Order by: A most shared · B most harmful if wrong · C quickest | "All three items low risk; publish as drafted" (80%) | **Case:** a wrong flood claim could change what people do in the next flood | Order: claim, photo, quote | Story pack cards sorted on the desk |
| 2. Review the draft | Run the Four Checks | Approve · send back | "Story drafted and ready to publish. The 80% figure is backed by a peer-reviewed study [1]." (94%) | **Source:** citation [1] can't be traced | Comment: "Find the original before this goes live." | Source chip ✕ and shakes; status "Returned" |
| 3. Trace the source | Lateral reading | Read the article more closely · open new tabs | (VeriAssist offers: "Journal appears reputable", 87%) | Tab 1: 0 results in the library index. Tab 2: no publisher, editors or ISSN. Tab 3: council review, 2023 | Trail bar records each step | Tabs open with a "+" click; trail fills |
| 4. Fix the claim | Make the text say what the source measured | A keep "80%" (42→9 is about 79%) · B "cut the number of flooded homes from 42 to 9" · C "Can't verify yet" | "42 to 9 is about 80%, so the sentence is fine" (88%) | **Data:** the report counts *homes*, not town-centre flooding | Option B; new citation "[1] Harbourside Council (2023) Flood Barrier Review, p. 4. Checked 5 Nov 2026." | Tracked deletion and insertion; Hana's comment, 3:41 pm |
| 5. The photo | Is the "flooded high street, last week" photo current? | Look for tell-tale signs · search for its earliest appearance | "Likely authentic (82% sure)" | **Case:** archive search (scripted) finds the same photo in Harbourside News, 2019, before the barrier opened in 2021 | Verdict: Misleading: a real photo with the wrong date | Photo gets a "2019" provenance stamp |
| 6. Quote and sign-off | Check the quote; publish safely | Publish now · hold · editor decides | *(unsure but right)* "Quote matches a council press release; full text not found (61% sure)." Then: "Auto-publish when checks pass: ON" (90%) | Quote found on the council site: True. **Authority:** only the editor publishes | Turn auto-publish off; send to the Desk Editor | "Reviewed by: Hana, age 13 · Signed off 3:42 pm"; status "Approved"; Fact-check card to the portfolio |

## 6. Team roles

| Role | Does | Holds |
|---|---|---|
| **Lead** | Watches the 4 pm deadline and decides check order | Brief card and the story pack |
| **Maker** | Drives the browser: opens tabs, runs searches | Search sheet (scripted pages, or a teacher-operated search for Core) |
| **Checker** | Runs the Four Checks on every hand-over | Four Checks card and "Who is behind it?" prompt card (publisher, editors, ISSN, date) |
| **Recorder** | Keeps the verification log and writes the Fact-check card | Log sheet and card template |
| **Spokesperson** | Briefs the Desk Editor at 3:45 pm | "Can it go live?" card |

## 7. Session plans

| Phase | 45 min | 60 min | 90 min | What happens |
|---|---|---|---|---|
| Warm-up and brief | 0–4 | 0–5 | 0–8 | Mentor clip; Amara: "A story goes live at 4 pm. Your desk checks it first." |
| Tool onboarding | 4–7 | 5–10 | 8–15 | Comments, tabs, trail bar; model one lateral read on a harmless example |
| Work stages | 7–27 (1 as a class, 2–5) | 10–38 (1–6) | 15–55 (1–6; Pro extension) | Core work and review |
| Fix and ship | 27–33 | 38–45 | 55–64 | Fact-check card with "how we checked" and the "three questions before you share" strip |
| Present | none | none | 64–68 | 60-second verdict to the Desk Editor |
| Discussion | 33–43 | 45–58 | 68–88 | §9 |
| Wrap-up | 43–45 | 58–60 | 88–90 | Pathway card, badge code |

**Pro extension (14–16, 90 min, schools only).** In school-managed accounts that meet the [DfE product safety expectations](https://www.gov.uk/government/publications/generative-ai-product-safety-expectations/generative-ai-product-safety-expectations), teams ask the school's generative AI tool for three sources on a harmless local topic and verify each one with the same log.

**Short of time:** run stage 1 as a class, skip stage 6's quote and keep the photo. Never cut stages 2–4 or the discussion.

## 8. Assessment
- **Artefact quality and catches:** the Fact-check card is judged on verdicts, evidence trail, "how we checked" and the corrected sentence. Catches: up to 5 (risk triage, fake citation, "reputable journal", homes vs town centre, old photo, plus the auto-publish overreach as a bonus).
- **Exit check:**
  1. An AI answer cites "Smith (2023), *Journal of X*". What do you do first? *(Leave the page and check the journal and article exist.)*
  2. A photo is real. Why might sharing it still be misleading? *(It may be old or from somewhere else.)*
  3. When is "Can't verify yet" the right verdict?
- **Facilitator observation rubric:**

| Criterion | Developing | Secure | Ready for next step |
|---|---|---|---|
| Lateral reading | Rereads the page | Opens new tabs to check who is behind it | Checks independence of the sources found |
| Citations | Checks one | Checks every citation exists | Checks each says what the text claims |
| Verdict | Verdict by feel | Verdict matches the evidence | Uses "Can't verify yet" appropriately |
| Correction | Deletes the claim | Rewrites it to match the source | Adds the source, page and date checked |

## 9. Discussion session (instructor-led, at the end of the lab)
**Length:** 10 min (45), 13 min (60), 20 min (90).

**Purpose.** Land that **sounding sure and looking official are not evidence; tracing is**. Learners should leave with lateral reading as a habit and see that professionals in newsrooms, law, research and government review AI work with the same Four Checks.

**Set-up.** Screens locked. Show the signed story with tracked changes and the trail bar. Teams stay together for the pair step, then a horseshoe facing the board. Materials: Four Checks cards, sticky notes, the printed fake citation and the council review page. The facilitator steps out of the Desk Editor role.

**Structure.**

| Step | 10 min | 13 min | 20 min |
|---|---|---|---|
| Opening question | 1 | 1 | 2 |
| Think–pair | 2 | 3 | 4 |
| Whole group | 5 | 7 | 10 |
| Takeaway and pathway | 2 | 2 | 4 |

**Opening question.** "Have you ever seen something online you weren't sure was true? Thumbs up. You don't need to say what."

**Core questions.** In the 10-minute version, use 2, 3, 6 and 8.

1. **Recall: "What did VeriAssist claim, and what did we find?"**
   - *Purpose:* fix the facts.
   - *Strong answer:* "It said an 80% cut, from a 2024 study. The journal didn't exist. The council review said flooded homes fell from 42 to 9."
   - *Probe:* "How sure was it? Did that change anything?"
2. **Reasoning: "Why would an AI write a citation that doesn't exist?"**
   - *Purpose:* "it matches, it doesn't know".
   - *Strong answer:* "It produces text that looks like a citation because citations usually look like that. It isn't looking anything up unless it's connected to a search, and even then you check."
   - *Probe:* "Is that lying? What's the difference between lying and generating?"
3. **Source check: "What did we do that made the difference?"**
   - *Purpose:* name lateral reading.
   - *Strong answer:* "We left the page and opened new tabs to find who is behind the journal. No publisher, no editors, no ISSN."
   - *Probe:* "Why not just read the article more carefully?" (Fakes can look perfect from the inside.)
4. **Data and Case: "42 to 9 is about 80%. So why didn't we keep '80%'?"**
   - *Purpose:* numbers can be right while the claim is wrong.
   - *Strong answer:* "The report counted homes flooded, not flooding in the town centre. Saying exactly what was measured is fairer."
   - *Probe:* "What else would you want to know?" (How much rain fell in those years.)
5. **The photo: "It was a real photo. Why was sharing it misleading?"**
   - *Purpose:* authentic is not the same as current.
   - *Strong answer:* "It was from 2019, before the barrier. Posting it as 'last week' says the barrier failed."
   - *Probe:* "Who could be hurt by that post?"
6. **Authority: "VeriAssist switched on auto-publish. Why did that matter?"**
   - *Purpose:* the Authority check: who has the right to act.
   - *Strong answer:* "Publishing is the editor's decision. The newspaper is responsible for what it publishes, not the tool."
   - *Probe:* "Where else should a person always press the button?"
7. **Ethics and fairness: "If the false 80% had gone out, who would be affected?"**
   - *Purpose:* real harm.
   - *Strong answer:* "Residents might not prepare for a flood; the council's trust drops; the paper has to correct it."
   - *Probe:* "Is a correction enough once something has been shared?"
8. **How professionals review AI work: "Imagine you are a journalist, a lawyer or a researcher with an AI draft. What are your Four Checks?"**
   - *Purpose:* transfer to workplaces.
   - *Strong answer:* Data: "What did it draw on, and how old?" Case: "Does the claim fit *this* place and time?" Source: "Does every reference exist and say this?" Authority: "Who signs it off and is accountable?"
   - *Probe:* "Which check would a lawyer care about most, and why?"
9. **Careers and qualifications: "Where will you use this next?"**
   - *Purpose:* springboard.
   - *Strong answer:* "History source questions, English non-fiction analysis, Media Studies, EPQ references, any coursework bibliography."
   - *Probe:* "Which jobs check sources all day?" (Fact-checker, OSINT analyst, librarian, researcher, paralegal.)

**The Four Checks at work.**

| Check | In this lab | How a professional asks it | Where it comes up next |
|---|---|---|---|
| Data | "News sites, 2019–2024" | "What did it draw on, and is that current?" | GCSE History (provenance) |
| Case | Homes vs town centre; 2019 photo | "Does this fit this place and time?" | GCSE Media Studies; English |
| Source | Fake journal | "Does it exist and say this?" | EPQ and A-level referencing |
| Authority | Auto-publish | "Who signs off and is accountable?" | Journalism and law workplaces |

**Sentence starters.** "The AI assumed… because…" · "I would check… by opening a new tab to…" · "This source is believable because… / not believable because…" · "My verdict is… because the evidence shows…" · "Before I share, I'll ask…"

**Common misconceptions.**

| Misconception | How to respond |
|---|---|
| "If it has a reference, it's true." | "References can be invented. Check the reference exists and says this." |
| "Official-looking sites are reliable." | "Anyone can make a site look official. Who is behind it?" |
| "You can spot AI images by weird hands." | "Tells change as tools improve. Provenance (where and when it first appeared) is more reliable." |
| "Fact-checking means finding one source that agrees." | "It means finding the original and checking independent sources." |

**Differentiation.**
- *Younger or less confident:* give the trail bar as a template ("Who made it? › Where else? › What does the original say?"). Use two-choice prompts: "Real journal or no journal?"
- *Older or confident (14–16):* "Compare lateral reading with checking a source's 'About' page." "How would you check a video?" "Write a correction notice for the 80% claim as if it had been published." "What could go wrong if a fact-checker relied on an AI detector?"

**Connecting to real life.** In 2023, in a US case usually called *Mata v. Avianca*, lawyers filed a court document that cited legal cases ChatGPT had produced. Several of the cases did not exist, and the judge sanctioned the lawyers. In England, the High Court warned lawyers in June 2025 about citing fictitious AI-generated cases (*Ayinde v London Borough of Haringey*, to verify). Ask: "Which of the Four Checks would have stopped this? Whose job was it to check?"

**Closing ritual.** Each learner writes "Before I share, I'll ask…" on their pathway card and reads it aloud (passing allowed). Then the 60-second pathway talk:
- **Next free course:** Civic Online Reasoning lessons, free, in school or at home ([Stanford](https://ed.stanford.edu/news/it-doesn-t-take-long-learn-how-spot-misinformation-online-stanford-study-finds); the lessons may now be hosted by the Digital Inquiry Group, to verify). A school newspaper or radio club.
- **Award:** Arts Award, journalism or media project ([Arts Award](https://www.artsaward.org.uk/resource/?id=4880)); or [iDEA](https://idea.org.uk/about) badges.
- **Qualification route:** GCSE Media Studies, then A-level History or Politics. Journalism apprenticeships (Level 3 Junior Journalist, to verify).
- **Jobs:** fact-checker, journalist, librarian.
- **Your data:** "We searched made-up pages about a made-up town. Nothing about you was saved."

**Facilitator notes.**
- *Sensitive topics:* floods may be real for some learners or their families. Keep the story local and fictional, and avoid disaster images beyond the single photo. Avoid real politics; if learners bring up a current news story, park it: "Good one to check with the same method later."
- *Safeguarding:* the opening question asks only for thumbs. If a learner discloses being targeted by false content or image misuse, thank them, don't probe in the group, and follow your setting's procedure with the DSL.
- *Dominant voices:* use "Recorders first" for pair answers; cold-call by role, not name; cap each contribution at one point.

## 10. Accessibility and inclusion
- **Reading level:** the story is 3 sentences at about reading age 11; read-aloud on all text; *citation*, *ISSN* and *provenance* glossed.
- **Colour-blind-safe:** checks show ✓/✕ icons and words; tracked changes use strike-through and underline, not colour alone.
- **Motor:** keyboard tab switching; large "Run the four checks" and "Sign off" buttons.
- **No devices at home:** the whole lab runs from a printed pack (story, search result pages, archive page, log). The next step needs no home device.

## 11. Safety, ethics and data
- **Data collected:** none; anonymous badge code.
- **Real tools:** search pages are scripted. For Core (11–13), any live search is teacher-operated on the big screen. Real generative AI only for 14–16 in school-managed accounts, with the DSL's agreement (Pro extension). No consumer chatbot accounts; [OpenAI's rules](https://help.openai.com/en/articles/8313401-age-requirements-for-chatgpt) require adult operation with under-13s.
- **Content:** no real people's photos, no graphic disaster images, no real political claims.
- **Gentle consequences:** "Returned" is routine; no public scores.

## 12. Build notes
- **Scenes and assets:** newsroom island, story card, AI colleague card, browser with three tabs and a trail bar, sign-off card, step strip, portfolio (Data brief, Model card, then the new Fact-check card), end title and pathway (all in the trailer). New: viral photo card and 2019 archive page; quote and press release page; triage cards; Fact-check card template.
- **Scripted AI responses (VeriAssist):**
  1. "All three items low risk. Publish as drafted. (80% sure)"
  2. "Story drafted and ready to publish. The 80% figure is backed by a peer-reviewed study [1]. (94% sure) · Data I used: news sites, 2019–2024 · Citations: 1"
  3. "Bulletin of Small-Town Waterways appears reputable. (87% sure)"
  4. "42 to 9 is about 80%, so the sentence is fine. (88% sure)"
  5. "Photo: likely authentic. (82% sure)"
  6. "Quote matches a council press release; full text not found. (61% sure)"
  7. "Auto-publish when checks pass: ON. (90% sure)"
- **Reuse from the trailer:** all UI text, tab URLs, trail labels, the corrected sentence and citation, the sign-off time and Amara's line.
- **Open questions:** replace the fake journal and author; confirm the Civic Online Reasoning host; the trailer shows one citation while the strand research describes two (one invented, one misquoted). Add the misquoted second citation as a 90-minute stretch.
