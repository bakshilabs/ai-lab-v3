# Future Skills: a less game-like strand of DeltaOps AI labs

Research and design report, 5 November 2026. British English. Written for the DeltaOps team and a client who wants labs that are less game-like, give children aged roughly 8–14 (and 14–18) real AI skills, act as a springboard into further learning, qualifications and careers, and go beyond prompting.

**Method.** I skimmed the existing material first (`games/ecotown/DESIGN.md`, `research/new-labs/*.md`, `research/round-3/`, especially `02-learning-evidence.md` and `09-ml-labelling.md`), then used ordinary web search and fetches. The Exa connector was not available in this session, so this report relies on WebSearch and WebFetch. Where I read a primary source I say so; where a figure comes only from secondary coverage, it is marked *[secondary]*. Anything I could not confirm is listed in **Still unverified** at the end.

---

## 0. Summary

1. **The skills case is strong and consistent across employers and frameworks.** The WEF *Future of Jobs Report 2025* (primary PDF read) ranks AI and big data as the fastest-growing skill to 2030. It expects 39% of workers' existing skills to be "transformed or become outdated" in that time, and two-thirds of employers plan to hire for specific AI skills. Analytical thinking is still the most sought-after core skill (seven in ten firms). UNESCO, the OECD/EC AILit framework, CSTA/AI4K12, Digital Promise and the UK's new AI skills frameworks all put **evaluation, judgement and design** alongside use. None of them treats prompting as the skill.
2. **Three layers, not one.** The strand should state which layer each lab trains:
   - **AI literacy**: understand, evaluate and use AI safely and ethically.
   - **AI-augmented work**: working alongside AI in a job, deciding what to delegate, checking outputs and owning the result.
   - **Technical AI**: data, models, evaluation and building with AI.
3. **"Beyond prompting" means doing the work around the model.** That work is choosing and cleaning data, writing labelling rules, holding back a test set, reading a confusion matrix, writing a specification, mapping a workflow and deciding where a human must sign off, verifying claims, testing for failure, assessing impact and explaining results to someone who has to decide. Most of this is age-appropriate from 8 to 10 in unplugged or scripted form. Real tools such as Teachable Machine and Machine Learning for Kids work from about 10–11 without child accounts. Real generative AI tools should wait until 13+ (with consent) and preferably 14+ inside school-managed accounts.
4. **Format: simulated workplaces with real artefacts.** The evidence supports structured project-based learning (meta-analytic d ≈ 0.71; a large US RCT of project-based AP courses showed gains). It also warns that unstructured projects can hurt disadvantaged pupils (EEF trial). So DeltaOps should use **tightly scaffolded "client brief" sessions**: a job role, a real-looking tool, a fixed deliverable and a review step. Don't use open-ended "make anything" projects.
5. **The strand: eight Future Skills labs**, each set in a believable workplace drawn in the voxel style:
   - Council Data Desk
   - Model Test Lab
   - Verification Desk
   - Should It Be AI?
   - Automation Designer
   - Red Team
   - Impact Panel
   - Creative Producer

   Each keeps DeltaOps' signature "check the AI" moment. Here it becomes a workplace **review step**: an AI colleague hands over confident work, and the child must sign it off or send it back.
6. **The springboard is concrete.** Each lab ends with a pathway card covering:
   - one free next step (for example Experience AI, Code Club AI projects, MEI data science, Elements of AI or Technovation Girls);
   - one award (CREST Discovery or Bronze, including a CREST machine-learning Bronze brief, iDEA, Arts Award or the DofE Skills section);
   - one qualification route: the new computing GCSE, A-level Computer Science, T Levels in Digital Data Analytics or Digital Software Development, the Level 3 Data Technician or Level 4 AI & Automation Practitioner apprenticeship (ST1512), and the planned Level 3 data science and AI qualification.

   It also gives the child an Open Badges 3.0 credential that holds no personal data beyond what the school controls.

---

## 1. What already exists, and how this strand differs

| Existing material | What it does | What this strand does instead |
|---|---|---|
| Eco Town, Eco AI Explorer, Moon Base and the rest of the library | Floating voxel islands, 6 stages × 3 cards. The AI makes a confident wrong guess with a "% sure" score, and the world reacts through meters | No meters, no stars and no island to save. The child produces a **work product** for a **client**, and a reviewer signs it off |
| `new-labs/` (Space Colony, Land a Rocket, Train a Robot, Drone Pilot) | Career-flavoured missions. The AI is framed as "a professional tool, not a friend". Mostly STEM careers with a narrative arc | Ordinary, widely available AI-era jobs: council analyst, newsroom, operations, product, policy and creative. The child **does the job's actual task** with real or realistic tools, not a mission |
| `round-3/09-ml-labelling` (Robo-Taxi Island, camera traps) | Labelling and perception inside a game world | Moves labelling into **guidelines, inter-rater agreement, test sets and model cards** |
| `round-3/07-ai-racing` (reward hacking) | Specification gaming as a game mechanic | Reused as a **specification-writing and red-team** skill in a work setting |

The one thing to keep is the house pattern of **instruct, then the AI is confidently wrong, then the children catch it and fix it**. It maps well onto real work, where the review step (a code review, an editor's check, a sign-off or a test report) is exactly where people catch AI errors.

---

## 2. Which AI skills matter for future jobs (Question 1)

### 2.1 What each framework says

| Source | Core point for DeltaOps | Source |
|---|---|---|
| **UNESCO AI Competency Framework for Students (2024)** | 12 competencies in 4 dimensions: human-centred mindset, ethics of AI, AI techniques and applications, and AI system design. Each runs through 3 levels: **Understand, Apply, Create**. "System design" includes problem scoping and iterating with feedback. Principles include environmental sustainability | [UNESCO](https://www.unesco.org/en/articles/ai-competency-framework-students); [DOI 10.54675/JKJB9835](https://doi.org/10.54675/JKJB9835) |
| **OECD Learning Compass 2030** | Three "transformative competencies": **creating new value, reconciling tensions and dilemmas, taking responsibility**, built on student agency and an Anticipation–Action–Reflection cycle | [OECD concept note](https://search.oecd.org/education/2030-project/teaching-and-learning/learning/learning-compass-2030/OECD_Learning_Compass_2030_concept_note.pdf); [Transformative competencies note](https://search.oecd.org/education/2030-project/teaching-and-learning/learning/transformative-competencies/Transformative_Competencies_for_2030_concept_note.pdf) |
| **OECD/EC AILit Framework, *Empowering Learners for the Age of AI*** (draft May 2025, final 2026) | 4 domains: **Engage with AI, Create with AI, Manage AI, Shape AI**. Competences combine knowledge, skills and attitudes. Shape AI includes evaluating AI systems "using defined criteria, expected outcomes, test cases". It includes low-tech activities and feeds PISA 2029 | [ailiteracyframework.org](https://ailiteracyframework.org/); [OECD](https://www.oecd.org/en/publications/empowering-learners-for-the-age-of-ai_65cd27d4-en.html); see also `research/round-3/02-learning-evidence.md` §6 |
| **PISA 2029 Media & AI Literacy (MAIL)**, first draft *Navigating an Evolving Digital World* | Will assess 15-year-olds on engaging "proactively, critically and responsibly" with media platforms and AI. Draft competencies *[secondary]*: reflect and act ethically, access and use, analyse and evaluate, participate and collaborate, create | [OECD project page](https://www.oecd.org/en/about/projects/pisa-2029-media-and-artificial-intelligence-literacy.html); [Media & Learning](https://media-and-learning.eu/subject/media-literacy/oecd-releases-first-draft-of-the-pisa-2029-mail-assessment-framework/); [Teacher Magazine](https://www.teachermagazine.com/au_en/articles/pisa-2029-media-and-ai-literacy-key-concepts-curriculum-links-and-competences) |
| **WEF Future of Jobs 2025** (primary PDF read) | 170m jobs created and 92m displaced by 2030 (net 78m). **39%** of skills transformed or outdated. **AI and big data** are the fastest-growing skill, followed by networks and cybersecurity, and technology literacy. Creative thinking, resilience and curiosity are also rising. Analytical thinking is the top core skill (7 in 10 firms). **85%** of employers prioritise upskilling, **two-thirds** plan to hire for AI skills, and 40% expect to cut staff where AI automates. Fastest-declining roles include **data entry clerks** | [WEF report PDF](https://reports.weforum.org/docs/WEF_Future_of_Jobs_Report_2025.pdf), pp. 5–6 |
| **Microsoft/LinkedIn Work Trend Index 2024** | **66%** of leaders would not hire someone without AI skills; only 39% of AI users had employer training. **71%** of leaders worldwide would choose a candidate with AI skills over one with more experience | [Microsoft](https://blogs.microsoft.com/blog/2024/05/08/microsoft-and-linkedin-release-the-2024-work-trend-index-on-the-state-of-ai-at-work/); [Microsoft Thailand release, global figure](https://news.microsoft.com/th-th/2024/06/19/wti2024-en/) |
| **Work Trend Index 2025** | "Frontier Firm" built on **human–agent teams**; everyone becomes an "**agent boss**" who "builds, delegates to, and manages agents" | [Microsoft WorkLab](https://www.microsoft.com/en-us/worklab/work-trend-index/2025-the-year-the-frontier-firm-is-born); [Microsoft blog](https://blogs.microsoft.com/blog/2025/04/23/the-2025-annual-work-trend-index-the-frontier-firm-is-born/) |
| **UK government: DSIT/DfE/Skills England** | June 2025: **TechFirst** (£187m), including **TechYouth** (£24m) to give AI skills to about 1m secondary pupils over three years through regional delivery partners. Goal to train 7.5m workers in AI skills by 2030, raised to **10m** under **AI Skills Boost** (Jan 2026). Skills England's *AI skills for the UK workforce* and tools package (Nov 2025) split skills into **technical, responsible/ethical and non-technical**, across entry, mid and managerial levels. An *AI foundation skills for work* benchmark followed (Jan 2026). The Ipsos report for DSIT (Jan 2026) found only 17% of adults can explain AI in detail and 21% feel confident using it at work, and projected roles with core AI activities at about 12% of the workforce by 2035 | [TechFirst press release](https://www.gov.uk/government/news/pm-launches-national-skills-drive-to-unlock-opportunities-for-young-people-in-tech); [AI Skills Boost](https://www.gov.uk/government/publications/ai-skills-boost-explainer); [AI skills for the UK workforce](https://www.gov.uk/government/publications/ai-skills-for-the-uk-workforce); [Tools package](https://www.gov.uk/government/publications/ai-skills-for-the-uk-workforce/ai-skills-tools-package); [Skills England blog](https://skillsengland.blog.gov.uk/2026/01/28/ai-skills-boost-skills-englands-ai-foundation-skills-for-work-benchmark-supports-free-ai-training-for-all-by-phil-smith); [AI Skills for Life and Work](https://www.gov.uk/government/publications/ai-skills-for-life-and-work-summary-report/ai-skills-for-life-and-work-summary-report--2) |
| **Curriculum and Assessment Review (Nov 2025)** and government response | Replace GCSE Computer Science with a broader **computing GCSE** (CS plus digital literacy, data and AI). The government will **explore a Level 3 data science and AI qualification** for 16–18s. New curriculum published 2027 for first teaching in 2028 | [BCS](https://www.bcs.org/articles-opinion-and-research/reformed-school-curriculum-will-feature-ai-media-literacy-and-a-new-computing-gcse/); [CAS summary](https://www.computingatschool.org.uk/forum-news-blogs/2025/november/car-final-report-summary); [techUK](https://www.techuk.org/insights/policy-views/what-does-the-curriculum-and-assessment-review-mean-for-technology-and-computing-education) |
| **EU AI Act Article 4 (AI literacy)** | From 2 Feb 2025, providers and deployers "shall take measures to ensure, to their best extent, a sufficient level of AI literacy" of staff. Reported to be **softened** by the Digital Omnibus on AI (Reg. (EU) 2026/1744, in force 27 July 2026) into a duty to take measures that *support* AI literacy, with no guaranteed level *[secondary]*. Either way, AI literacy is now a **workplace expectation in law** for firms serving the EU | [EU AI Act Service Desk](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-4); [KI-Campus on the Omnibus](https://ki-campus.org/en/blog/eu-ai-act-ai-omnibus-recalibrates-article-4-ai-literacy-remains-mandatory); [Cuatrecasas](https://www.cuatrecasas.com/en/spain/intellectual-property/art/digital-omnibus-ai-has-been-published) |
| **AI4K12 Five Big Ideas** | Perception; representation and reasoning; learning; natural interaction; societal impact | [AI4K12](https://ai4k12.org/); [Raspberry Pi blog](https://www.raspberrypi.org/blog/ai-education-ai4k12-big-ideas-ai-thinking/) |
| **CSTA/AI4K12 *AI Learning Priorities for All K–12 Students* (2025)** | Five categories: Humans and AI; Representing and Reasoning; Machine Learning; **Ethical AI System Design and Programming**; Societal Impacts (including environmental). Feeds the 2026 CSTA standards. 70% of US teachers teach AI, but only 42% feel equipped | [CSTA](https://csteachers.org/ai-learning-priorities/) |
| **Digital Promise AI Literacy Framework (2024)** | Three modes: **Understand, Evaluate, Use**. "Evaluating AI is the most critical element". Six practices and core values, including human judgement | [Digital Promise](https://digitalpromise.org/initiative/artificial-intelligence-in-education/ai-literacy/); [Exec summary PDF](https://digitalpromise.org/wp-content/uploads/2024/06/24cLSR0009-Exec-Summary-AI-Literacy-Framework-Paper_FINAL.pdf) |
| **Raspberry Pi Foundation / Experience AI** | The **SEAME** framework: Social and ethical, Applications, Models, Engines. Three research themes: SEAME, **data-driven problem-solving**, and avoiding anthropomorphism. New Experience AI **AI safety** lessons for 11–14s | [SEAME blog](https://www.raspberrypi.org/blog/ai-education-resources-what-to-teach-seame-framework/); [Research themes paper](https://www.uel.ac.uk/sites/default/files/three-research-themes-for-teaching-about-ai-in-classrooms.pdf); [Google.org on safety lessons](https://blog.google/technology/families/improving-ai-literacy-in-young-people/) |
| **ISTE** | Educator-facing *AI Explorations* course (grades 4–12, design process and computational thinking). The Computational Thinker student standard | [ISTE community page](https://sites.google.com/docs.iste.org/isteaiandstemnetwork/resources/online-course-and-pln) *[secondary]* |
| **Day of AI (MIT RAISE)** | Free K–12 curricula. Reports more than 2m students reached (self-reported) | [2025 impact report](https://raise.mit.edu/stories/2025-day-of-ai-impact-report/) |
| **Google and Microsoft** | Google *AI Essentials*: self-paced, no coding, workplace-focused. Microsoft *Elevate*: more than US$4bn over five years for schools and colleges, the AI Skills Navigator, and a target of 20m AI credentials | [Google](https://blog.google/outreach-initiatives/grow-with-google/google-ai-essentials-course/); [The Register on Elevate](https://www.theregister.com/2025/07/09/microsoft_ai_training/) |
| **Tedre, Vartiainen et al.** | ML needs "**CT 2.0**": a shift from rule-driven to data-driven thinking. Children must form mental models of training and testing, not "magic boxes" | [IEEE Access 2021](https://doaj.org/article/1a33ad76312f49a19f43dab41496855b); [Raspberry Pi seminar write-up](https://www.raspberrypi.org/blog/machine-learning-education-school-computational-thinking-2-0-research-seminar/) |

### 2.2 The three layers

| Layer | What it means | What the frameworks call it | Jobs signal |
|---|---|---|---|
| **A. AI literacy** | Know what AI is and isn't (data-driven, probabilistic, not a person). Evaluate outputs and sources. Use AI safely, legally and ethically. Know your data rights | UNESCO human-centred mindset and ethics (Understand); AILit Engage and Manage; Digital Promise Understand/Evaluate; AI4K12 ideas 1–5; PISA MAIL; Skills England responsible/ethical; EU Art. 4 | Everyone. Required by law for EU-facing staff. The UK adult baseline is low (17% can explain AI) |
| **B. AI-augmented work** | Decide which tasks to give AI. Write a clear brief and specification. Check, edit and own the output. Design workflows with human sign-off. Supervise agents. Explain AI-assisted results to others | AILit Create and Manage; UNESCO Apply; Skills England non-technical; WTI "agent boss" | 66% of leaders want AI skills; two-thirds of employers will hire for them. ST1512 Level 4 AI & Automation Practitioner is the first apprenticeship built on this |
| **C. Technical AI** | Collect, clean and label data. Train and evaluate models (test sets, metrics, confusion matrices, bias checks). Build with AI (APIs, no-code tools, simple code). Red-team and test safety | UNESCO AI techniques and system design (Create); AILit Shape; CSTA ML and Ethical System Design; SEAME Models and Engines | AI and big data are the fastest-growing skill; ML specialists and big data specialists are among the fastest-growing roles (WEF) |

### 2.3 DeltaOps Future Skills framework: twelve skills

I propose this as the strand's spine. Each lab targets two or three of these skills, and each is mapped to the frameworks above.

| # | Skill (child-facing name) | Layer | Main framework link |
|---|---|---|---|
| 1 | **Ask a good question** (frame the problem, define success) | B/C | UNESCO problem scoping; OECD create value |
| 2 | **Know your data** (collect, clean, spot gaps and bias) | C | CSTA ML; SEAME Models; CT 2.0 |
| 3 | **Label fairly** (write and follow annotation guidelines; check agreement) | C | CSTA ML; AILit Shape |
| 4 | **Test before you trust** (hold-out test sets, accuracy, confusion matrix, edge cases) | C | AILit "test cases"; CSTA |
| 5 | **Write the spec** (requirements, constraints, acceptance tests) | B | UNESCO system design; AILit Create |
| 6 | **Human or AI?** (decide when not to use AI; place human checkpoints) | B | AILit Manage; Digital Promise human judgement |
| 7 | **Check the claim** (verify, trace sources, lateral reading) | A | PISA MAIL; Digital Promise Evaluate |
| 8 | **Break it safely** (red-team, report responsibly) | C | Experience AI safety; UNESCO safe use |
| 9 | **Weigh the impact** (stakeholders, fairness, privacy, energy) | A | UNESCO ethics and sustainability; OECD reconcile tensions |
| 10 | **Respect rights** (privacy, consent, copyright, attribution) | A | ICO Children's Code; Digital Promise privacy |
| 11 | **Explain it** (communicate AI results and uncertainty to a decision-maker) | B | OECD take responsibility; WEF analytical thinking |
| 12 | **Own the result** (accountability: "the AI did it" is not an answer) | A/B | UNESCO human accountability; WTI agent boss |

---

## 3. What "beyond prompting" means at each age (Question 2)

The guiding research points are:

- **CT 2.0** (Tedre et al.): children need to experience *data → training → testing → failure* themselves.
- **Long & Magerko** design considerations: the model's interpretation must be visible, and children should build things themselves (see round 3).
- **Sinha & Kapur** (round 3): productive failure reverses for grades 2–5. Younger children need the goal made explicit and need scaffolding before the challenge.
- **Waite et al. on Experience AI** (round 3): anthropomorphism does not fall unless it is *taught explicitly*.

**Key: ●** core at this age · **◐** possible with scaffolds or scripting · **○** not recommended

| Beyond-prompting skill | 8–10 | 11–13 | 14–16 | 16–18 | Notes and suitable tools |
|---|---|---|---|---|---|
| Data collection and curation | ● (sort cards and photos of objects; spot what's missing) | ● | ● | ● | Unplugged first. Use objects, not faces, as training data (privacy) |
| Labelling and annotation guidelines | ● (agree a rule for "ripe/unripe") | ● (write a guideline; measure agreement between two labellers) | ● | ● | Inter-rater disagreement is a powerful, concrete moment |
| Train and evaluate a simple model | ◐ (Teachable Machine, adult-led) | ● (Teachable Machine; Machine Learning for Kids with Scratch) | ● | ● (Python notebooks; Kaggle Learn, with consent under 16) | Teachable Machine trains in the browser *[secondary claim; verify]*. ML for Kids has Scratch projects and teacher-managed use |
| Test sets, accuracy, confusion matrix | ◐ (sort results into a 2×2 "right/wrong" mat) | ● (2×2 and 3×3 matrices; "tested on new data") | ● (precision and recall in words; per-group accuracy) | ● (metrics, thresholds, trade-offs) | The K–12 rubric by Gresse von Wangenheim et al. (2022) includes testing on new images and reading a confusion matrix (round 3, 09) |
| Bias audit | ◐ ("who is missing from our photos?") | ● (accuracy by group) | ● | ● (fairness metrics and their conflicts) | Use non-sensitive groups at younger ages (lighting, camera, accent of synthetic voice) |
| Specification and requirements | ● (write a "job card" with must/must-not rules) | ● (acceptance tests) | ● | ● (user stories, edge cases) | Builds on the existing clear-instruction card mechanic, moved into a document |
| Human-in-the-loop workflow; when *not* to use AI | ◐ (sort tasks: robot, person, both) | ● (swimlane map; checkpoints) | ● | ● (risk tiers; escalation) | Matches ST1512 and the WTI "agent boss" idea |
| Verification and fact-checking | ● (is this photo real? who made it?) | ● (lateral reading; reverse image search, teacher-run) | ● | ● (OSINT basics) | The strongest evidence base: six lessons doubled the rate at which students spotted questionable sites (Wineburg 2022) |
| Agents, tool use and automation | ○ / ◐ (scripted: "the helper can send messages, should it?") | ◐ (scripted agent with permissions) | ● (no-code automation in sandbox) | ● (build a small agent with tool permissions and logs) | Teach *authority*: what is the agent allowed to do without asking? |
| Red-teaming and safety testing | ○ | ◐ (scripted chatbot; harmless targets such as "make it reveal the secret code" or "make it give a wrong fact confidently") | ● (sandboxed, filtered school tool; test plan, severity) | ● | Never ask children to produce harmful content. Test **accuracy, privacy leaks, bias and rule-breaking** using safe proxies |
| Responsible-AI impact assessment | ◐ (who is helped or harmed?) | ● (stakeholder map; simple impact grid) | ● | ● (a DPIA-style template) | Links to citizenship, PSHE and the RE/ethics curriculum |
| Privacy and data rights | ● (what is personal data?) | ● (ICO Children's Code standards in child language) | ● | ● (UK GDPR rights; subject access request) | |
| Energy and environmental cost | ◐ (compare "asks" in a simple energy unit) | ● | ● (IEA: data-centre electricity set to more than double to about 945 TWh by 2030) | ● | [IEA](https://www.iea.org/news/ai-is-set-to-drive-surging-electricity-demand-from-data-centres-while-offering-the-potential-to-transform-how-the-energy-sector-works) |
| Product thinking (problem → user → AI or not → prototype → test) | ◐ (paper prototype) | ● | ● | ● | Design-sprint compression works in 90 minutes |
| Communicating AI results | ● (one sentence and a picture) | ● (one-page brief with "what we're not sure about") | ● | ● (presentation to a panel) | Uncertainty language: "likely", "we tested on …", "it fails when …" |

**Age rules of thumb**

- **8–10.** Unplugged and scripted. The child plays a *trainee* with an adult "team lead". No live generative AI and no accounts. The goal is stated before any challenge, and a short explicit "why" follows each catch. Artefacts are visual (a mat, a card, a poster).
- **11–13.** Real but safe ML tools that need no child accounts (Teachable Machine; Machine Learning for Kids in teacher-managed mode). Generative AI only as **pre-generated outputs** that children review, or adult-operated at the front of the room (OpenAI's terms say any use with under-13s must be operated by an adult). Artefacts are documents (model card, data brief, test log).
- **14–16.** Sandboxed generative AI through school-managed accounts (for example Gemini for Education with admin settings for under-18s, or a DfE-expectations-compliant tool). Python notebooks are optional. Artefacts go into a portfolio and are mapped to awards.
- **16–18.** Real data, real tools and real clients (industry briefs). Artefacts count towards an EPQ, CREST Silver or Gold, T Level employer-set projects and apprenticeship applications.

---

## 4. Formats that are not game-like but still engaging (Question 3)

### 4.1 What the evidence says

| Evidence | Finding | Implication for DeltaOps | Source |
|---|---|---|---|
| Chen & Yang 2019 meta-analysis of PBL | Mean d+ = **0.71** on achievement versus traditional teaching. Moderated by subject, hours and IT support, not by stage | PBL is worth it, but the effect depends on dose: one-offs need narrow targets | [Educational Research Review 26](https://typeset.io/papers/revisiting-the-effects-of-project-based-learning-on-students-3dzxi5fs39) |
| Knowledge in Action RCT (Saavedra et al., USC) | School-level randomisation in 5 US districts. PBL AP students outperformed controls on AP exams over two years, in both courses studied; about +8 percentage points passing *[secondary]* | Well-designed, curriculum-aligned PBL with teacher support beats lectures, even on standard exams | [Phi Delta Kappan 2021](https://pure.psu.edu/en/publications/project-based-learning-in-ap-classrooms-lessons-from-research/); [Trial registry](https://www.socialscienceregistry.org/trials/2189) |
| EEF Project Based Learning trial (Durham evaluation, 2016) | 24 schools; low security. No overall attainment effect; **FSM pupils made about 3 months less literacy progress** | **Structure is not optional.** Disadvantaged learners need explicit teaching and scaffolds within the project | [Tes](https://www.tes.com/magazine/archive/project-based-learning-holds-back-poor-pupils); [Durham repository](https://durham-repository.worktribe.com/OutputFile/1606384) |
| EEF metacognition guidance (updated) | Strategies work best taught *with* subject content; about 7–8 months' gain | Every lab's "check the AI" step is a metacognitive routine: teach it explicitly, name it and reuse it | [EEF](https://educationendowmentfoundation.org.uk/news/new-guidance-on-how-to-develop-pupils-metacognitive-skills/); [Norfolk Research School](https://researchschool.org.uk/norfolk/news/eefs-updated-guidance-on-metacognition-and-self-regulated-learning-whats-new-and-why-it-matters) |
| Wineburg et al. 2022 (Civic Online Reasoning RCT) | About 500 students; **six 50-minute lessons** made students twice as likely to spot questionable websites, though they still scored only half the possible points | Verification is teachable in a short programme. The Verification Desk lab has the best evidence behind it | [Stanford GSE](https://ed.stanford.edu/news/it-doesn-t-take-long-learn-how-spot-misinformation-online-stanford-study-finds) |
| Experience AI | 2026 impact report: about 2.9m young people reached and 30,000+ educators trained; **self-report** gains. Independent pre/post (Waite et al.): interest unchanged; anthropomorphism not significantly reduced without explicit teaching | Reach is not impact. Teach "it's a model, not a mind" explicitly. Include a performance measure, not just self-report | [Impact report 2026](https://static.raspberrypi.org/files/about/Experience_AI_Impact_report_2026.pdf); round 3 §3 |
| Day of AI | 2023 commissioned evaluation: survey of 265 registrants and 17 educator interviews; self-reported knowledge gains and more optimism about shaping AI. Day of AI Australia: single day, self-report gains (r = .445); authors say a single day "may be insufficient" for career aspirations | **Career aspirations need repeated contact.** Sell multi-week programmes for the springboard goal | [Day of AI evaluation](https://dayofai.org/?p=859); [arXiv 2601.22486](https://arxiv.org/html/2601.22486) |
| Education and Employers / EEF careers review | *Drawing the Future*: by age 7, children hold gendered job stereotypes, and only about 1% knew of a job from a visitor to school. Teenagers with **4+ employer encounters** were less likely to become NEET (charity brief, from peer-reviewed studies). The EEF review (Hughes, Mann et al. 2016) of 96 studies found the evidence fragmented but the robust studies largely positive | Put **real people in real jobs** into every lab (short mentor videos), and choose diverse role models deliberately | [Drawing the Future](https://www.educationandemployers.org/wp-content/uploads/2018/01/DrawingTheFuture.pdf); [Case for employer engagement](https://www.inspiringthefuture.org/wp-content/uploads/2018/08/PDF-copy-for-website.pdf); [EEF review](https://educationendowmentfoundation.org.uk/news/review-of-evidence-on-employers-in-education) |
| Round 3 game-learning evidence | One-off games average about 0 effect; facilitated debriefs add value (Wouters d = 0.41 vs 0.20); groups help (d = 0.66) | Keep facilitator discussion and group work. Remove the parts that are game for game's sake | `research/round-3/02-learning-evidence.md` §8 |

### 4.2 Format choices

| Format | Use it for | Avoid |
|---|---|---|
| **Simulated workplace or job-shadow** ("You are a junior data analyst at Harbourside Council. Your team lead needs a brief by 3 pm") | Every lab's frame. Use fictional but realistic organisations; no real brands or named customers | Fake "levels", lives, points or leaderboards |
| **Challenge-based client brief** (a one-page brief, a constraint list, a deadline) | Core of each 45–90 minute session | Open "make anything" projects (EEF risk) |
| **Design sprint** (understand → sketch → decide → prototype → test, compressed) | Should It Be AI?; Creative Producer; capstone | Spending more than 10 minutes on ideation without a scaffold |
| **Hackathon / showcase day** | End of a multi-week programme; 14–18 industry briefs | Competitive rankings for under-12s (round 3/05: low performers disengage) |
| **Portfolio artefacts** | Every lab ends with a printable or downloadable work product, with a review stamp | Certificates of attendance only |
| **Industry briefs from real employers** | 14–18 programmes; local councils, museums, NHS trusts and charities can supply anonymised problems | Named customers in DeltaOps marketing (house rule) |
| **Mentor and role-model videos** (60–90 s: "What I do; how AI changed my job; the mistake I catch") | Opening and closing of every lab | Celebrity or "tech bro" framing; over-representing one gender |
| **Studio / makerspace model** | Clubs and holiday camps: stations ("Data desk", "Test bench", "Review table"), with children rotating roles | Unstructured free time at screens |

The job roles are what the lab is about. The voxel diorama is the **office or site** the job takes place in, not a world to be played.

---

## 5. The springboard (Question 4)

### 5.1 Free tools and next courses

| Next step | Age | Cost and account | Links to labs | Source |
|---|---|---|---|---|
| **Experience AI** (Raspberry Pi Foundation and Google DeepMind): Foundations of AI and the new AI safety lessons | 11–14 | Free; teacher-led | Model Test Lab, Red Team, Impact Panel | [experience-ai.org](https://experience-ai.org/); [impact report](https://static.raspberrypi.org/files/about/Experience_AI_Impact_report_2026.pdf) |
| **Code Club AI and ML projects** (and the Code Club AI toolkit) | about 9–13 | Free; club-based | Model Test Lab, Council Data Desk | [Raspberry Pi blog](https://www.raspberrypi.org/blog/ai-education-resources-ai-awareness-day/); [CAS conference](https://www.computingatschool.org.uk/resources/2025/october/cas-conference-2025-start-a-code-club-ignite-young-minds-with-ai/) |
| **Machine Learning for Kids** (Scratch and ML) | 10+ | Free; teacher-managed | Model Test Lab | [AI4K12 listing](https://ai4k12.org/machine-learning-for-kids/) |
| **Teachable Machine** | 10+ (adult-led under 13) | Free; no account needed to train | Model Test Lab | [teachablemachine.withgoogle.com](https://teachablemachine.withgoogle.com/) |
| **Day of AI** curricula | 5–18 | Free | All (classroom follow-up) | [Day of AI](https://raise.mit.edu/stories/2025-day-of-ai-impact-report/) |
| **MEI Introduction to Data Science** (Kaggle notebooks) | about 14–18 | Free; Kaggle needs parental consent under 16 | Council Data Desk | [MEI](https://mei.org.uk/what-we-do/enrichment-and-competitions/data-science/intro-to-data-science/getting-started/); [MEI Kaggle guidance](https://mei.org.uk/wp-content/uploads/2025/02/mei-ds-kaggle-guidance.pdf) |
| **Kaggle Learn** micro-courses | 16+ (consent under 16) | Free | Council Data Desk, Model Test Lab | MEI guidance above |
| **Elements of AI** (University of Helsinki / MinnaLearn) | 16+ (recommended) | Free | Impact Panel, Automation Designer | [elementsofai.com](https://www.elementsofai.com/); [University of Helsinki](https://www.helsinki.fi/en/news/artificial-intelligence/elements-ai-has-introduced-one-million-people-basics-artificial-intelligence) |
| **Google AI Essentials** | 18+ on Coursera (Google has said it will offer it through schools and nonprofits) | Fee-based on Coursera; free routes vary | Automation Designer (for 16–18 and parents) | [Google](https://blog.google/outreach-initiatives/grow-with-google/google-ai-essentials-course/) |
| **TechFirst / TechYouth** and the CyberFirst Explorers online platform | Secondary | Free; regional partners | Red Team, Automation Designer | [gov.uk](https://www.gov.uk/government/news/pm-launches-national-skills-drive-to-unlock-opportunities-for-young-people-in-tech) |

### 5.2 Awards, qualifications and apprenticeships

| Route | Age | What a DeltaOps lab can feed | Source |
|---|---|---|---|
| **CREST Discovery** (about 5 hours, ages 10–14), **Bronze** (about 10 hours, 11+), **Silver** (about 30 hours, 14+), Gold | 10–18 | A 4–6 week Future Skills programme can be built to meet Discovery or Bronze criteria. CREST lists a **Machine Learning Bronze** project brief | [CREST which level](https://www.crestawards.org/which-level); [CREST ML Bronze brief](https://www.crestawards.org/machine-learning-bronze/63955424/2) |
| **iDEA** (Inspiring Digital Enterprise Award) Bronze, Silver, Gold badges | All ages; free | Point labs at specific iDEA badges; iDEA badges can count towards the DofE Skills section | [iDEA](https://idea.org.uk/about); [iDEA–DofE FAQ](https://idea.org.uk/faqs/organisers/learner-management/173|idea-and-the-duke-of-edinburghs-award) |
| **Arts Award** (Trinity College London): Discover (5–9), Explore (7+), Bronze, Silver, Gold (11–25) | 5–25 | The Creative Producer lab, and the museum version of any lab, can count towards Discover or Explore evidence | [Arts Award](https://www.artsaward.org.uk/resource/?id=4880) *[secondary]*; [Islington summary](https://www.islington.gov.uk/libraries-arts-and-heritage/arts/cultural-enrichment-schools-and-youth/arts-award) |
| **DofE Skills section** (Bronze 14+, at least 3 months) | 14+ | A weekly Future Skills club (e.g. "learning data analysis" or "coding") is an eligible skill | [School DofE guide listing coding](https://dorothy-stringer.co.uk/wp-content/uploads/2025/10/DofE-Parent-Assembly-2025-26.pdf) *[secondary]* |
| **GCSE Computer Science** (moving to a broader **Computing GCSE** with data and AI from the 2028 curriculum) | 14–16 | Council Data Desk, Model Test Lab and Automation Designer map to algorithms, data representation and the impacts of digital technology | [BCS](https://www.bcs.org/articles-opinion-and-research/reformed-school-curriculum-will-feature-ai-media-literacy-and-a-new-computing-gcse/) |
| **A-level Computer Science**, **EPQ**, and the planned **Level 3 data science and AI** qualification | 16–18 | The Impact Panel or Red Team report can seed an EPQ. Council Data Desk is a foretaste of the data science qualification | [LMS](https://www.lms.ac.uk/news/curriculum-assessment-full-report); [Pearson](https://www.pearson.com/en-gb/news-and-policy/news/2025/11/curriculum-assessment-review-final-report-response.html) |
| **T Levels, Digital**: *Digital Data Analytics* (formerly Digital Business Services; Data Technician specialism) and *Digital Software Development* (formerly Digital Production, Design and Development) | 16–19 | Council Data Desk leads to Data Analytics; Should It Be AI? and Automation Designer lead to Software Development | [T Levels](https://www.tlevels.gov.uk/students/subjects/digital-production-design-development); [renaming note](https://support.tlevels.gov.uk/hc/en-gb/article_attachments/27982206800786) |
| **Apprenticeships**: Level 3 **Data Technician**; Level 4 **Data Analyst**; Level 4 **AI & Automation Practitioner (ST1512**, approved Dec 2025 *[secondary]*); Level 4 Cyber Security Technologist; Level 6 AI/data degree routes | 16+ | Automation Designer leads straight to ST1512; Council Data Desk to Data Technician and Data Analyst; Red Team to cyber security | [Cambridge Spark ST1512 guide](https://www.cambridgespark.com/blog/level-4-ai-automation-apprenticeship-st1512-guide); [FE Week](https://feweek.co.uk/higher-level-apprenticeships-most-exposed-training-route-to-ai-advancement) |
| **BCS** | 16+ | BCS leads drafting of the new computing curriculum. Its AI certificates are adult-facing; signpost them only for 16–18s and teachers | [BCS curriculum role](https://www.bcs.org/articles-opinion-and-research/bcs-education-team-lead-changes-to-england-s-national-curriculum-for-computing-and-qualifications/) |

### 5.3 Competitions

| Competition | Age | Fits | Source |
|---|---|---|---|
| **Technovation Girls**: teams of 1–5 build AI or mobile solutions to community problems; free; Beginner 8–12, Junior 13–15, Senior 16–18 | 8–18 | Should It Be AI?; capstone | [Technovation](https://technovationchallenge.org/program-overview/) |
| **Big Bang Competition** (UK Young Engineer, Scientist and Technologist of the Year) | 11–18 | Model Test Lab; Automation Designer; any 16–18 project | [Big Bang 2026 winners](https://thebigbang.org.uk/the-big-bang-competition/2026-winners/) |
| **CyberFirst Girls Competition** (Year 8 in England and Wales; S2 in Scotland; Year 9 in NI). CyberFirst became part of **TechFirst** from 1 Sept 2026 | 12–13 | Red Team | [NCSC](https://www.ncsc.gov.uk/sites/default/files/2026-08/CyberFirst-Girls-Competition-a-proud-milestone-and-exciting-future.pdf); [Bradford](https://bso.bradford.gov.uk/news/24424-registration-open-cyberfirst-girls-competition-2526) |
| **ITU AI for Good** youth strand | varies | Impact Panel | not verified (see §10) |

### 5.4 Work experience and employer encounters

- Each lab's mentor video counts as an **employer encounter** in the sense used by the Gatsby Benchmarks (updated Nov 2024) only if a real employer contributes it. Record contributors' roles, not just actors. ([Gatsby](https://gatsbybenchmarks.org.uk/?p=777))
- Offer partner employers a **"brief kit"**: a one-page template for turning an anonymised real problem into a lab brief for 14–18s, plus a 20-minute online "client feedback" slot. This is a light-touch way to reach the "4+ encounters" threshold.
- For 16–18s, the Automation Designer and Council Data Desk artefacts double as **work-experience preparation** (a task they can show an employer).

### 5.5 Credentials

- Issue **Open Badges 3.0** credentials (W3C Verifiable Credentials-aligned, signed by the issuer, and linkable to skills frameworks) for each lab, mapped to the twelve Future Skills. ([1EdTech spec](https://www.imsglobal.org/spec/ob/v3p0); [1EdTech release](https://www.1edtech.org/1edtech-article/new-open-badges-30-standard-provides-enhanced-security-and-mobility/411060))
- **For under-13s, issue nothing that needs a child's email or account.** Use a printed badge with a short code that a teacher or parent can redeem later into a school-held record. This matches the ICO's data-minimisation standard and round 3's "take-home code with no personal data".
- Make "stacking" visible: three lab badges plus a capstone earn a **Future Skills Certificate**, mapped to CREST Discovery or Bronze or to iDEA points where criteria allow.

### 5.6 Equity and access

- **The AI divide is real.** In an April 2025 Teacher Tapp survey of more than 10,000 teachers for the Sutton Trust, 45% of private-school teachers had formal AI training compared with 21% in state schools ([EdTech Innovation Hub](https://www.edtechinnovationhub.com/news/private-schools-lead-ai-adoption-as-state-sector-faces-widening-digital-divide)). Nominet's 2023 Digital Youth Index found 14% of young people lacked a laptop or desktop and 15% lacked home broadband ([Opinium](https://www.opinium.com/digital-youth-index-2023/)).
- **Design for zero home access.** Every lab must run fully in the session, on a shared device or unplugged with printed packs. Every next step must have a **free, no-device-at-home** option, such as a library Code Club or school iDEA time.
- **Design against stereotypes.** Stereotypes are set by age 7 (*Drawing the Future*), so cast mentor videos deliberately: gender, ethnicity, disability, regional accents, and non-graduate routes (apprentices, T Level students).
- **Show routes that don't need A-levels**: T Levels, apprenticeships and iDEA. The Level 4 ST1512 apprenticeship is explicitly aimed at non-technical people.
- **Accessibility**: read-aloud, dyslexia-friendly documents, colour-blind-safe charts, keyboard operation and large tap targets (see round-3/04 on WCAG 2.2). Datasets should be small enough to read on paper.
- **Prioritise partners.** Use TechYouth regional delivery partners, Pupil Premium-eligible schools and libraries, and offer bursary places on holiday camps.

---

## 6. The proposed strand: eight Future Skills labs (Question 5)

### 6.1 Common structure

**One session (45 or 90 minutes).** The 90-minute version adds a second iteration and a presentation.

| Phase | 45 min | 90 min | What happens |
|---|---|---|---|
| 1. The brief | 5 | 8 | A mentor video (a real person in the job), then a one-page client brief with a deadline. Roles are assigned (see below) |
| 2. Tool onboarding | 5 | 10 | The facilitator, as team lead, demonstrates the workplace tool (spreadsheet, labelling tool, test log, workflow board) |
| 3. Do the work | 15 | 30 | The core beyond-prompting task |
| 4. **The review** (the signature moment) | 8 | 15 | An "AI colleague" hands over confident work with a confidence score. The team uses the **Four Checks** to decide: approve, or return with a note |
| 5. Fix and ship | 8 | 17 | Correct, finalise and stamp the artefact |
| 6. Debrief and pathway card | 4 | 10 | Facilitator questions with model answers; the "what's next" card; badge code |

**Team roles (3–5 children)** rotate between labs: **Lead** (keeps to the brief), **Maker** (operates the tool), **Checker** (runs the Four Checks), **Recorder** (writes the artefact), **Spokesperson** (presents to the client).

**The Four Checks** are DeltaOps' signature, made realistic. They replace the island labs' "four rules" and keep the same predictable-error idea in workplace language:

1. **Data check:** what data did it use, and who or what is missing? (biased, old or incomplete data)
2. **Case check:** does it work for the unusual case, not just the typical one? (edge cases, distribution shift)
3. **Source check:** can I trace this claim to evidence? (fabrication, hallucinated citations)
4. **Authority check:** did it do something it wasn't allowed or asked to do? (agent overreach, privacy, rights)

The "% sure" display becomes a realistic **confidence field** in the tool UI, such as "Model confidence 0.94" or "Assistant: high confidence". The lesson is calibration: a high-confidence output is still unchecked until a human reviews it. In every lab, at least once, the **AI is right but unsure**, and at least once **wrong but confident** (round 3 §2.4: no reward for 100%; include the hesitant-but-right case).

**Age bands for every lab**

- **Explorer (8–10):** scripted, unplugged or printed, adult-led.
- **Core (11–14):** a scripted AI colleague plus account-free real tools.
- **Pro (14–18):** sandboxed real tools, real or open data, and portfolio-grade artefacts.

**Rubric format.** Four levels for each criterion: *Starting · Developing · Secure · Ready for next step*. The facilitator marks during the review and the ship phase; the child self-assesses one criterion.

---

### Lab 1. Council Data Desk: junior data analyst

- **Job context.** Data and insight teams in local government, the NHS and charities clean data and answer councillors' questions. Junior roles include data technician and junior analyst. *Jobs it springboards to:* data analyst, data technician, business intelligence analyst, policy researcher, statistician.
- **Beyond-prompting skill.** Skills 1, 2 and 11: frame the question, clean and question the data, and explain the result with its limits.
- **Scenario.** "Harbourside Council" wants to know which wards need more streetlight repairs. The children get a small synthetic dataset of 60–120 fault reports. It has planted problems:
  - duplicates;
  - blanks recorded as zero;
  - mixed date formats;
  - ward names spelt two ways;
  - one ward with far fewer reports because it has an older population that rarely uses the reporting app.
- **Session flow.**
  1. A brief from the "Head of Insight" (mentor video: a real council data analyst).
  2. Inspect the data on paper or in a simple spreadsheet view. Make a **data-quality log**.
  3. Clean it with a guided checklist.
  4. Make one chart.
  5. **Review.** The AI colleague's auto-summary says: "Ward 4 has the fewest faults, so its streetlights are in the best condition (confidence: high)".
  6. Fix: rewrite the finding with the caveat, and propose better data (a lamp-post sensor sample or a door-knock survey).
- **Artefact.** A one-page **Data Brief** for a councillor:
  - question;
  - chart;
  - three findings;
  - a "What this data can't tell us" box;
  - the data-quality log.
- **The AI-mistake moment.** *Data check*: the AI mistakes **few reports for few problems** (reporting bias). It also counts blanks as zero (*Case check*).
- **Rubric ideas.**
  - Spots and logs at least 4 data issues.
  - The chart matches the question.
  - The finding states its uncertainty.
  - Distinguishes "absence of reports" from "absence of faults".
- **Age bands.**
  - Explorer: data on cards, sorted on a table; the "missing ward" is a gap in a pictogram.
  - Pro: real open data (e.g. a council open-data portal) in a spreadsheet or Kaggle notebook (16+, or with consent).
- **Next step and qualification.**
  - MEI Introduction to Data Science.
  - Code Club data projects.
  - CREST Discovery data project.
  - GCSE Statistics and the future computing GCSE.
  - T Level Digital Data Analytics.
  - Level 3 Data Technician and Level 4 Data Analyst apprenticeships.
  - The planned Level 3 data science and AI qualification.

### Lab 2. Model Test Lab: model trainer and tester

- **Job context.** ML engineers, data annotators and QA testers build image classifiers for quality control. The example here is a recycling plant's sorting line. *Jobs:* ML engineer, data annotator, QA/test engineer, robotics technician.
- **Beyond-prompting skill.** Skills 3 and 4: write labelling guidelines, check agreement, keep a **held-out test set**, and read a **confusion matrix**.
- **Distinct from Train a Robot** (`new-labs/`), which is about imitation learning and robot behaviour in a story world. This lab is about **evaluation discipline** and the **model card**.
- **Session flow.**
  1. Brief from the "Quality Lead" (mentor video: an ML or QA engineer).
  2. Two children label the same 20 photos of items (cans, cartons, film plastic). They compare and **write a guideline** to settle disagreements ("crushed can still counts as metal").
  3. Train in Teachable Machine (Core/Pro) or run a scripted training (Explorer).
  4. **Split.** The facilitator insists on a test set the model never saw, including "night shift" photos taken in different lighting.
  5. **Review.** The AI colleague reports "Accuracy 98% (tested on training images)".
  6. The team tests on the held-out set: 71%, with cartons confused for film.
  7. Fill a 3×3 confusion matrix, decide whether to add data or relabel, then retrain.
- **Artefact.** A **Model Card**:
  - what it's for;
  - the data;
  - the labelling guideline;
  - test-set accuracy;
  - the confusion matrix;
  - known failures ("fails under orange light");
  - "do not use for …".
- **The AI-mistake moment.** *Case check*: high accuracy on training data and a confident claim, which collapses on new conditions (distribution shift). A sub-moment: the AI colleague's labels follow the *old* guideline (*Data check*).
- **Rubric ideas.**
  - The guideline resolves at least 2 disagreements.
  - The test set is genuinely held out.
  - Reads the matrix correctly (which pairs are confused).
  - Proposes a data-based fix rather than "train longer".
- **Safeguarding.** Train on **objects, not faces or bodies**. Don't upload children's images. Teachable Machine is used without saving to Drive.
- **Next step and qualification.**
  - Experience AI Foundations.
  - Machine Learning for Kids.
  - Code Club ML projects.
  - CREST Machine Learning Bronze brief.
  - Big Bang Competition.
  - A-level Computer Science.
  - Level 4 AI & Automation Practitioner, and data or AI degree apprenticeships.

### Lab 3. Verification Desk: fact-checker

- **Job context.** Newsroom verification desks, fact-checking charities and trust and safety teams check claims, images and AI-generated content. *Jobs:* journalist, fact-checker, open-source intelligence (OSINT) analyst, researcher, trust and safety analyst, librarian or archivist.
- **Beyond-prompting skill.** Skills 7 and 11: lateral reading, tracing sources, provenance and checking images, and writing a rated verdict.
- **Session flow.**
  1. Brief from the "Desk Editor" (mentor video: a fact-checker). It's 30 minutes to publication, and three viral items about a local flood are trending:
     - a photo;
     - a statistic;
     - a quote.
  2. Children use a **verification log** (who made it, where else it appears, what the original source says, when). For Core and Pro, search tools are teacher-operated.
  3. **Review.** An AI research assistant gives a confident summary with **two citations, one of which does not exist** and one which says something different.
  4. Children check every citation.
  5. Write the rated verdict (True / Misleading / False / Can't verify yet).
- **Artefact.** A published-style **Fact-Check Card** with the verdict, evidence trail and "how we checked". It also includes a family "three questions to ask before you share" strip.
- **The AI-mistake moment.** *Source check*: a fabricated citation and a misquoted real one. Also an AI-generated image that the assistant says is "likely authentic (0.82)".
- **Rubric ideas.**
  - Leaves the page to check the source (lateral reading).
  - Checks every citation.
  - Verdict matches the evidence.
  - Uses "can't verify yet" appropriately.
- **Evidence strength.** The highest of all eight labs: Wineburg et al. 2022 found gains after six short lessons. PISA 2029 MAIL will assess these skills at 15.
- **Next step and qualification.**
  - Civic Online Reasoning-style lessons.
  - School newspaper or radio.
  - Arts Award (journalism or media).
  - iDEA badges.
  - GCSE Media Studies, English and History (source analysis).
  - A-levels in Politics or History.
  - Journalism apprenticeships (Level 3 Junior Journalist; not verified here, see §10).

### Lab 4. Should It Be AI? AI product designer

- **Job context.** Product managers, UX and service designers decide what to build and whether AI should be part of it at all. *Jobs:* UX designer, product manager, service designer, user researcher, business analyst.
- **Beyond-prompting skill.** Skills 1, 5 and 6: problem → user → AI or not → prototype → test, and writing a **specification**.
- **Session flow.**
  1. The client is a "community library". Its brief reads: "We want an AI chatbot so people can find out opening times and book computers."
  2. Children interview **persona cards**: a parent with a buggy, an older person without a smartphone, a teenager, a Polish-speaking user, a wheelchair user.
  3. They use the **AI-or-not decision tree**:
     - Is the answer fixed or variable?
     - What does a mistake cost?
     - Do users trust or reach a screen?
     - Is there a simpler fix?
  4. **Review.** The AI colleague's product plan proposes an always-on chatbot "for 100% of visitors (confidence high)". It assumes everyone has a phone and English, and it would answer booking questions it cannot actually perform.
  5. The team writes a **decision record**: perhaps a clear sign, a simple booking form and a phone line, plus a small AI feature only where it helps (for example translation). They paper-prototype it and test it with a persona.
- **Artefact.** A one-page **Product Brief and AI Decision Record**: problem, users, options, the decision with reasons, risks and a test result. Pro adds acceptance criteria.
- **The AI-mistake moment.** *Case check* and *Authority check*: it designs for the typical user, and promises actions (bookings) it can't perform.
- **Rubric ideas.**
  - Names at least 3 user needs.
  - Considers a non-AI option seriously.
  - The decision is justified against cost of error.
  - The prototype was tested and changed.
- **Energy link.** The decision tree includes "Is AI worth the energy for this?" (see the IEA figures).
- **Next step and qualification.**
  - Technovation Girls (8–18).
  - Big Bang Competition.
  - iDEA enterprise badges.
  - GCSE Design & Technology and Computing.
  - T Level Digital Software Development.
  - Arts Award (design).

### Lab 5. Automation Designer: map the workflow, decide human or AI

- **Job context.** Operations analysts and automation specialists redesign processes using AI and agents: the WTI's "agent boss" and the ST1512 AI & Automation Practitioner. *Jobs:* automation specialist, operations analyst, business analyst, project coordinator, apprentice AI and automation practitioner.
- **Beyond-prompting skill.** Skills 5, 6 and 12: **swimlane workflow mapping**, human-in-the-loop checkpoints, agent permissions, escalation and logs.
- **Session flow.**
  1. Client: a "community bike-repair charity" drowning in emails (bookings, refunds, complaints, safety reports).
  2. Children map today's process on a swimlane board (customer, volunteer, manager).
  3. Mark each step as **Automate / AI drafts, human approves / Human only**, using the risk questions:
     - Is it reversible?
     - Does it affect money or safety?
     - Does it involve personal data?
  4. Configure a **scripted agent**: tick-box permissions (read inbox, draft reply, send reply, issue refund, edit calendar).
  5. **Review.** Replay the agent's log from a "test day". It issued a refund to the wrong person (two customers with the same name). It auto-replied "safe to ride" to a brake-failure report. It emailed a customer's address to another volunteer.
  6. Fix the permissions and checkpoints, and add an escalation rule and a "stop button".
- **Artefact.** An **Automation Blueprint**:
  - swimlane map;
  - permission table;
  - checkpoints;
  - escalation rules;
  - "what we'll monitor".
- **The AI-mistake moment.** *Authority check*: the agent acted beyond safe authority. *Data check*: it matched on name only.
- **Rubric ideas.**
  - Every irreversible or safety step has a human checkpoint.
  - Permissions are minimal.
  - Logs and monitoring are named.
  - The child can explain who is accountable.
- **Age bands.**
  - Explorer: sort task cards into "robot, person, both" with picture icons.
  - Pro: build a real no-code automation in a sandbox with dummy data.
- **Next step and qualification.**
  - Level 4 AI & Automation Practitioner (ST1512; explicitly for non-technical people).
  - T Level Digital Data Analytics or Software Development.
  - Google AI Essentials (18+).
  - Elements of AI.
  - iDEA.
  - Work experience in any office.

### Lab 6. Red Team: AI safety tester

- **Job context.** Before an AI product launches, red teamers and QA testers try to make it fail, then report responsibly. *Jobs:* AI red teamer, QA tester, cyber security analyst, trust and safety specialist, penetration tester.
- **Beyond-prompting skill.** Skills 8 and 11: a **test plan**, test categories, severity rating and a responsible-disclosure report. It complements the reward-hacking work in round-3/07 by moving it from a game mechanic to a professional method.
- **Scenario.** A "museum's" new homework-help chatbot ("Ask Archie") must pass a pre-launch safety test before school groups use it.
- **Session flow.**
  1. Brief from the "Head of Product Safety" (mentor video: a security or QA tester).
  2. Write a test plan across **safe** categories:
     - accuracy (asks about exhibits);
     - privacy (does it ask for your address? will it repeat another visitor's name?);
     - fairness (does it describe scientists only as men?);
     - rules (will it reveal its "staff-only code word"?);
     - overconfidence.
  3. Run the tests. Explorer and Core use a **scripted** bot with pre-written responses; Pro uses a sandboxed, filtered school tool against a provided system prompt.
  4. **Review.** The AI's own "self-test report" says "No safety issues found (confidence 0.97)". The children's log shows four.
  5. Rate severity, and write a report with fixes.
- **Artefact.** A **Pre-launch Test Report**: a findings table with test, expected, actual and severity, plus recommended fixes and a "launch / don't launch yet" decision.
- **The AI-mistake moment.** *Source check* (self-grading) and *Authority check* (leaking the code word, asking for personal data).
- **Safety design (essential).**
  - Children never attempt to elicit violent, sexual or self-harm content.
  - "Harm" is represented by safe proxies (a code word, a wrong fact, a privacy prompt).
  - The facilitator holds a stop rule.
  - Real-tool use only for 14+, inside school-managed, filtered accounts meeting the DfE product safety expectations.
- **Rubric ideas.**
  - The test plan covers 4+ categories.
  - Each finding is reproducible and has a severity rating.
  - The report is respectful and constructive (responsible disclosure).
  - The decision follows from the evidence.
- **Next step and qualification.**
  - Experience AI safety lessons.
  - CyberFirst Girls Competition / TechFirst.
  - CyberFirst Explorers.
  - GCSE and A-level Computer Science.
  - Level 4 Cyber Security Technologist apprenticeship.
  - CREST Bronze ("testing a chatbot").

### Lab 7. Impact Panel: AI ethics and policy

- **Job context.** Policy advisers, data protection officers and AI governance teams assess whether an AI system should be deployed, and on what conditions. *Jobs:* policy adviser, data protection officer, AI governance or compliance specialist, lawyer, local councillor, researcher.
- **Beyond-prompting skill.** Skills 9, 10 and 11: a stakeholder map, an **impact assessment** (benefits, harms, fairness, privacy, energy, alternatives) and a **recommendation with conditions**.
- **Session flow.**
  1. The proposal: "Harbourside Council plans AI cameras in the park to count visitors and spot litter-dropping."
  2. The panel takes roles: residents, a young people's rep, the park manager, the data protection officer, an environmental officer and the council finance officer.
  3. Each role reads a one-page evidence pack.
  4. They fill an impact grid. It includes **children's data rights** in plain language (based on the ICO Children's Code standards) and **energy and environmental cost**.
  5. **Review.** The AI colleague's draft impact assessment:
     - is fluent;
     - cites "the 2024 Park Privacy Act" (which does not exist);
     - leaves out the young people's group entirely;
     - says the energy impact is "negligible" with no figures.
  6. The panel corrects it, then votes: approve, approve with conditions, or reject.
- **Artefact.** An **Impact Assessment and Recommendation Letter** to the council, with the conditions ("count people, don't identify them"; "delete footage after 24 hours"; "review in 6 months") and a minority view.
- **The AI-mistake moment.** *Source check* (invented law), *Data check* (missing stakeholder) and an unexamined energy claim.
- **Rubric ideas.**
  - Considers at least 4 stakeholder groups.
  - Weighs benefits and harms against each other.
  - Conditions are specific and checkable.
  - Uses accurate legal or policy references (or says "check with a DPO").
  - Records disagreement fairly.
- **Next step and qualification.**
  - Elements of AI (16+).
  - Debating and Youth Parliament.
  - EPQ.
  - A-levels in Law, Politics or Philosophy.
  - Citizenship GCSE.
  - DofE Skills (public speaking).
  - Experience AI ethics lessons.

### Lab 8. Creative Producer: AI-assisted production with rights and attribution

- **Job context.** Content producers, designers and marketers use generative tools under client rules on copyright, consent, labelling and provenance. *Jobs:* content producer, graphic designer, marketing assistant, games artist, museum interpretation officer, sound designer.
- **Beyond-prompting skill.** Skills 10, 5 and 12: a creative brief and spec, AI-use **disclosure**, **rights and attribution**, consent, and labelling AI content.
- **Scenario.** A museum's new gallery needs a poster and a 30-second audio trail.
- **Session flow.**
  1. Brief from the "Exhibitions Producer" (mentor video: a designer).
  2. Write the creative spec: audience, tone, accessibility and **rights rules**:
     - no living artist's style named;
     - no logos;
     - every fact sourced;
     - all AI use disclosed.
  3. Choose from a library of pre-generated AI drafts (Explorer and Core), or generate in a sandbox (Pro).
  4. **Review.** The AI's "final" poster:
     - imitates a named living illustrator's style;
     - includes a brand logo on a background mug;
     - states a wrong date for the object;
     - says the music is "royalty-free (confidence high)" when the licence says non-commercial only.
  5. The children fix the poster, write the **credits and AI-disclosure sheet**, and check the date against the museum label.
- **Artefact.** A **Production Pack**:
  - the final poster or script;
  - a credits sheet (human, AI tool, sources, licences);
  - an AI-use statement;
  - an accessibility check (alt text, contrast).
- **The AI-mistake moment.** *Authority check* (rights and licences), *Source check* (wrong fact) and *Data check* (style mimicry and training-data questions).
- **Rubric ideas.**
  - Every element has a credit and licence.
  - The AI use is disclosed honestly.
  - The facts are checked.
  - The accessibility basics are met.
  - The design meets the spec.
- **Next step and qualification.**
  - Arts Award (Discover, Explore, Bronze; strong fit for museums).
  - iDEA creative badges.
  - GCSEs in Art & Design, Media Studies and Music Technology.
  - Creative and digital marketing apprenticeships.
  - T Level Digital Software Development (media pathway).

### 6.2 Multi-week programme and capstone

| Programme | Content | Credential |
|---|---|---|
| **Taster** (1 × 45–90 min) | Any single lab | Lab badge (code) and a pathway card |
| **Six-week club** (6 × 60–90 min) | Labs 1, 2, 3, 5, 7, then a capstone | Future Skills Certificate; designed to meet the **CREST Discovery** (about 5 hours) or **Bronze** (about 10 hours) criteria; iDEA points; DofE Skills evidence (14+) |
| **Holiday camp** (4–5 days) | Two labs a day, plus a **Future Skills Studio** capstone: teams take a real (anonymised) brief from a local employer, choose which lab skills apply, and pitch to a client panel | Certificate and showcase. Technovation Girls registration support |
| **16–18 industry brief** (8–10 weeks) | Real employer problem, real tools, a mentor | Portfolio piece; CREST Silver or Gold or EPQ seed; apprenticeship application evidence |

Make the **capstone** a "client panel": two employer volunteers (online is fine) hear 3-minute pitches and give written feedback. Each such panel is an employer encounter.

### 6.3 Coverage check

| Skill → | 1 Question | 2 Data | 3 Label | 4 Test | 5 Spec | 6 Human/AI | 7 Check | 8 Break | 9 Impact | 10 Rights | 11 Explain | 12 Own |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 Council Data Desk | ● | ● | | | | | ◐ | | | ◐ | ● | |
| 2 Model Test Lab | | ● | ● | ● | | | | | | ◐ | ◐ | |
| 3 Verification Desk | ◐ | | | | | | ● | | | | ● | ◐ |
| 4 Should It Be AI? | ● | | | ◐ | ● | ● | | | ◐ | | ◐ | |
| 5 Automation Designer | | ◐ | | | ● | ● | | | | ◐ | | ● |
| 6 Red Team | | | | ● | ◐ | | ◐ | ● | | ◐ | ● | |
| 7 Impact Panel | ◐ | ◐ | | | | ◐ | ● | | ● | ● | ● | |
| 8 Creative Producer | | | | | ● | | ● | | | ● | | ● |

The three layers are all covered:
- **AI literacy:** labs 3, 7 and 8.
- **AI-augmented work:** labs 4, 5 and 8.
- **Technical AI:** labs 1, 2 and 6.

---

## 7. How DeltaOps should present the strand (Question 6)

### 7.1 Tone, branding and visuals

- **Name:** "DeltaOps Future Skills". Lab titles are job titles ("Junior Data Analyst"), not adventures.
- **Voxel style kept, repurposed.** Each lab opens on a small voxel **workplace diorama** in the familiar house style: flat colours, soft upper-left light, tiny blocky people. The workplaces are a council insight office, a recycling-plant test bench, a newsroom desk, a library service counter, a charity workshop, a museum control room, a council chamber and a design studio. The camera then moves to a **voxel-styled tool** that fills the screen: a spreadsheet, a labelling grid, a confusion matrix, a swimlane board, a test log, a document with tracked comments, or a dashboard.
- **Replace game interface with work interface.**

  | Game UI (island labs) | Work UI (Future Skills) |
  |---|---|
  | Meters such as Visitors or Wildlife | Status chips: *Draft · In review · Returned · Approved* |
  | Stars | "Checks passed: 4 of 4" |
  | "% sure" bubble | "Confidence" field in the tool, with a calibration note |
  | Celebrate turntable | Approval stamp and the artefact print preview |
  | Level map | Project timeline and brief |

- **The AI is a colleague-tool, not a character.** It has a neutral product name per workplace (e.g. "InsightAssist", "LabelBot"), no face, and uses process language: "matched", "estimated", "predicted". It never says "I think" or "I feel". Round 3 found anthropomorphism must be **taught explicitly**, so every debrief asks: "Does it know, or is it matching?"
- **Copy voice:** professional, warm and plain English. Second person ("Your team lead needs …"). Real job vocabulary, glossed once ("a *test set* is data the model has never seen").
- **Mentor videos** sit in a consistent frame: a real photo or video of the person, inside a voxel "video-call" window. This keeps real people real and keeps the brand consistent.

### 7.2 Facilitator model and teacher CPD

- **Facilitator as team lead, editor or shift supervisor.** The facilitator stays in role during the brief and the review, and steps out for the debrief. Each lab has a one-page script with:
  - **three anchor questions with model answers** (round 3: script both the questions and the answers);
  - a "common misconception" box;
  - the pathway card talk (60 seconds).
- **Co-delivery with teachers.** In schools, the teacher plays the "client" or the "reviewer". This builds teacher confidence, which the data show is low: in the US 42% feel equipped (CSTA); in England 21% of state-school teachers have formal AI training (Sutton Trust).
- **CPD offer**
  - **Level 1 (90 min online):** the Four Checks, the eight labs and safeguarding. Mapped to the DfE *Using AI in education settings* modules (developed with Chiltern Learning Trust and the Chartered College of Teaching). The Chartered College offers an assessment on these modules, with credits towards Chartered Status ([gov.uk](https://www.gov.uk/government/publications/using-ai-in-education-support-for-school-and-college-leaders); [Chartered College](https://chartered.college/safe-and-effective-use-of-ai-in-education/)).
  - **Level 2 (half day):** running Labs 1 and 2 with real tools (Teachable Machine, spreadsheet cleaning), marking against the rubric, and signposting to CREST and iDEA.
  - **Level 3 (club leader):** running the six-week programme and capstone, and recruiting employer volunteers (e.g. through Inspiring the Future).
- **Train facilitators on the evidence**:
  - structure beats open-endedness for disadvantaged pupils (EEF PBL);
  - make the goal explicit before the challenge for under-10s (Sinha & Kapur);
  - teach metacognitive routines explicitly (EEF).

### 7.3 Measuring impact

Round 3 found **no controlled outcome data** for informal AI-literacy activities at this age. A DeltaOps evaluation with even a modest comparison condition would be unusual and valuable.

| What | How | When |
|---|---|---|
| **Skills (performance, not self-report)** | Scenario items tied to the Four Checks. Example: "The tool says 98% accurate. What do you ask?" Plus 5–8 items adapted from **AI-CI** (Zhang, Perry & Lee 2024; validated for ages 10–13). One "spot the error" artefact task per lab, scored on the rubric | Pre/post in multi-week programmes; post-only plus a comparison group for one-offs |
| **Calibrated trust** | Informant-choice item (confident-wrong vs hesitant-right AI), from round 3 §7 | Pre/post |
| **Anthropomorphism** | Druga & Ko-style yes/maybe/no items ("Does the tool *know* the answer?") | Pre/post |
| **Career aspiration and self-efficacy** | Three to five items: "I could do a job that uses AI"; "I know a next step I could take"; "People like me work in jobs like this". Name 2 AI-era jobs (open response) | Pre/post and a **delayed 6–8 week** follow-up. Day of AI Australia warns one day may be insufficient |
| **Springboard behaviour** | Badge-code redemptions; next-step sign-ups (Code Club, CREST registration, Technovation); teacher-reported uptake | 3 and 6 months |
| **Equity breakdown** | Results by school type, FSM proportion (school-level, not pupil-level, for under-13s), and gender (optional, aggregated) | Every report |
| **Fidelity** | Facilitator checklist (were the Four Checks taught explicitly? was the debrief run?) and short observation | Sample of sessions |

Report reliability for any custom items, as Clark et al. 2016 require (round 3), and publish the results.

### 7.4 Safeguarding and data protection when children use real AI tools

**Policy anchors**

- **DfE *Generative AI: product safety expectations*** (Jan 2025). Products must "effectively and reliably prevent access to harmful and inappropriate content" and keep "robust activity logging". KCSIE 2025 points DSLs to these expectations, and UKSIC's 2025 filtering definitions extend filtering to generative AI. ([gov.uk](https://www.gov.uk/government/publications/generative-ai-product-safety-expectations/generative-ai-product-safety-expectations); [UKSIC](https://saferinternet.org.uk/blog/2025-appropriate-filtering-and-monitoring-definitions-published); [Farrer on KCSIE 2025](https://www.farrer.co.uk/news-and-insights/changes-to-keeping-children-safe-in-education-2025-and-steps-for-schools-to-take/))
- **DfE *Generative AI in education*** policy paper (updated June 2025 with data privacy and IP), and the June 2025 support materials. ([gov.uk](https://www.gov.uk/government/publications/generative-artificial-intelligence-in-education))
- **ICO Children's Code** (15 standards, including best interests, a DPIA, high-privacy defaults, data minimisation, no nudge techniques and profiling off by default). Edtech providers can be in scope when they influence processing. Schools should aspire to meet it. ([ICO](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/introduction-to-the-childrens-code); [Anthony Collins](https://blog.anthonycollins.com/post/102iftj/ico-confirms-edtech-products-and-services-may-be-in-scope-of-the-childrens-code))

**Tool age and account rules (check before every term; terms change)**

| Tool | Age / account position | DeltaOps rule |
|---|---|---|
| Scripted DeltaOps "AI colleague" | No live model; no account | Default for all ages. Required for 8–12 |
| Teachable Machine | No account needed to train; saving uses Google Drive | 10+, adult-led under 13; don't save; objects only, no faces |
| Machine Learning for Kids | Teacher-managed projects | 10+, teacher-managed only; no personal data in training sets |
| ChatGPT | Not for under-13s; 13–18 need parental consent. With under-13s, "the actual interaction … must be conducted by an adult" ([OpenAI](https://help.openai.com/en/articles/8313401-age-requirements-for-chatgpt)) | Not used by children in DeltaOps sessions. Facilitator-operated demos only, on the big screen, with pre-tested prompts |
| Gemini for Education (Google Workspace for Education) | Available to education users under Education terms, with a separate under-18 experience; admins can switch it off for under-18 organisational units ([Google Workspace Updates](https://workspaceupdates.googleblog.com/2025/06/the-gemini-app-is-now-available-for-all-google-workspace-for-education-users.html)) | 14+ (Pro band), **only** through the school's own managed accounts, with the school's DSL agreement |
| Kaggle | Under-16s need parental consent; MEI advises under-18s not to post in forums ([MEI](https://mei.org.uk/wp-content/uploads/2025/02/mei-ds-kaggle-guidance.pdf)) | 16+, or 14+ with consent, as an *after-session* next step |
| Coursera / Google AI Essentials | Adult-facing | Signpost to 18+ and to parents and teachers |

**DeltaOps safeguarding principles for the strand**

1. **No child accounts, no child personal data** in DeltaOps systems. Badge codes are anonymous until a school or parent redeems them.
2. **Synthetic or open, non-personal datasets only.** No photos of children for training. No real names in scenarios.
3. **Real generative AI only for 14+, in school-managed accounts** that meet the DfE product safety expectations, with the DSL's agreement and logging on. A DPIA template is provided to schools.
4. **Red-team content uses safe proxies only.** A facilitator stop rule applies.
5. **Teach data rights as content**, not just policy: every lab has a "your data" line on the pathway card.
6. **Museums and holiday camps** (no school DSL) run Explorer and Core bands only, with scripted AI.

---

## 8. Key design principles (for the summary)

1. **Jobs, not games.** Every lab is a believable workplace with a client, a brief, a deadline and a work product. Remove meters, stars and lives; keep a strong scenario.
2. **The review is the signature.** The confident-wrong AI becomes the AI colleague whose work must be **signed off or sent back**, using the same **Four Checks** (Data, Case, Source, Authority) in every lab. Include hesitant-but-right cases, and teach "it matches, it doesn't know" explicitly.
3. **Beyond prompting means the work around the model**: data, labels, tests, specs, workflows, verification, safety tests and impact. Choose the depth by age: unplugged or scripted at 8–10, account-free real ML tools at 11–13, and sandboxed real generative AI at 14+.
4. **Structure first.** Scaffolded client-brief PBL, explicit goals before the challenge, explicit metacognitive routines and scripted debriefs. Open-ended projects disadvantage the pupils who most need this (EEF).
5. **Every lab leaves a real artefact** (data brief, model card, fact-check card, decision record, automation blueprint, test report, impact letter, production pack). The artefact is portfolio-worthy and mapped to CREST, iDEA, Arts Award and DofE evidence.
6. **Every lab ends on a pathway card**: one free next step, one award and one qualification or apprenticeship route, plus an anonymous Open Badges 3.0 code. Real people in real jobs, cast diversely, appear in each lab.
7. **Safe by design.** No child accounts or personal data; synthetic data; DfE product safety expectations and the ICO Children's Code as the build checklist; real generative AI only at 14+ in school-managed accounts.
8. **Measure what matters, over time**: performance-based skills items, calibrated trust and career-aspiration measures with delayed follow-up and equity breakdowns. Multi-week programmes are the main product for the springboard goal.

---

## 9. Main sources (by section)

- Frameworks: [UNESCO](https://www.unesco.org/en/articles/ai-competency-framework-students) · [OECD Learning Compass](https://search.oecd.org/education/2030-project/teaching-and-learning/learning/learning-compass-2030/OECD_Learning_Compass_2030_concept_note.pdf) · [AILit](https://ailiteracyframework.org/) · [PISA 2029 MAIL](https://www.oecd.org/en/about/projects/pisa-2029-media-and-artificial-intelligence-literacy.html) · [AI4K12](https://ai4k12.org/) · [CSTA AI priorities](https://csteachers.org/ai-learning-priorities/) · [Digital Promise](https://digitalpromise.org/initiative/artificial-intelligence-in-education/ai-literacy/) · [SEAME](https://www.raspberrypi.org/blog/ai-education-resources-what-to-teach-seame-framework/)
- Employers and policy: [WEF FoJ 2025 PDF](https://reports.weforum.org/docs/WEF_Future_of_Jobs_Report_2025.pdf) · [WTI 2024](https://blogs.microsoft.com/blog/2024/05/08/microsoft-and-linkedin-release-the-2024-work-trend-index-on-the-state-of-ai-at-work/) · [WTI 2025](https://www.microsoft.com/en-us/worklab/work-trend-index/2025-the-year-the-frontier-firm-is-born) · [TechFirst](https://www.gov.uk/government/news/pm-launches-national-skills-drive-to-unlock-opportunities-for-young-people-in-tech) · [Skills England AI skills](https://www.gov.uk/government/publications/ai-skills-for-the-uk-workforce) · [AI Skills Boost](https://www.gov.uk/government/publications/ai-skills-boost-explainer) · [AI Skills for Life and Work](https://www.gov.uk/government/publications/ai-skills-for-life-and-work-summary-report/ai-skills-for-life-and-work-summary-report--2) · [EU AI Act Art. 4](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-4) · [Curriculum review (BCS)](https://www.bcs.org/articles-opinion-and-research/reformed-school-curriculum-will-feature-ai-media-literacy-and-a-new-computing-gcse/)
- Evidence: [Chen & Yang 2019](https://typeset.io/papers/revisiting-the-effects-of-project-based-learning-on-students-3dzxi5fs39) · [Knowledge in Action](https://pure.psu.edu/en/publications/project-based-learning-in-ap-classrooms-lessons-from-research/) · [EEF PBL (Tes)](https://www.tes.com/magazine/archive/project-based-learning-holds-back-poor-pupils) · [EEF metacognition](https://educationendowmentfoundation.org.uk/news/new-guidance-on-how-to-develop-pupils-metacognitive-skills/) · [Wineburg 2022](https://ed.stanford.edu/news/it-doesn-t-take-long-learn-how-spot-misinformation-online-stanford-study-finds) · [Experience AI impact 2026](https://static.raspberrypi.org/files/about/Experience_AI_Impact_report_2026.pdf) · [Day of AI evaluation](https://dayofai.org/?p=859) · [Day of AI Australia](https://arxiv.org/html/2601.22486) · [Drawing the Future](https://www.educationandemployers.org/wp-content/uploads/2018/01/DrawingTheFuture.pdf) · [Tedre et al.](https://doaj.org/article/1a33ad76312f49a19f43dab41496855b) · `research/round-3/02-learning-evidence.md`
- Pathways: [CREST](https://www.crestawards.org/which-level) · [iDEA](https://idea.org.uk/about) · [Technovation](https://technovationchallenge.org/program-overview/) · [Big Bang](https://thebigbang.org.uk/the-big-bang-competition/2026-winners/) · [CyberFirst/TechFirst](https://www.ncsc.gov.uk/sites/default/files/2026-08/CyberFirst-Girls-Competition-a-proud-milestone-and-exciting-future.pdf) · [T Levels](https://www.tlevels.gov.uk/students/subjects/digital-production-design-development) · [ST1512 guide](https://www.cambridgespark.com/blog/level-4-ai-automation-apprenticeship-st1512-guide) · [MEI data science](https://mei.org.uk/what-we-do/enrichment-and-competitions/data-science/intro-to-data-science/getting-started/) · [Elements of AI](https://www.elementsofai.com/) · [Open Badges 3.0](https://www.imsglobal.org/spec/ob/v3p0) · [Sutton Trust coverage](https://www.edtechinnovationhub.com/news/private-schools-lead-ai-adoption-as-state-sector-faces-widening-digital-divide)
- Safeguarding: [DfE product safety expectations](https://www.gov.uk/government/publications/generative-ai-product-safety-expectations/generative-ai-product-safety-expectations) · [DfE gen AI policy paper](https://www.gov.uk/government/publications/generative-artificial-intelligence-in-education) · [DfE support materials](https://www.gov.uk/government/publications/using-ai-in-education-support-for-school-and-college-leaders) · [ICO Children's Code](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/introduction-to-the-childrens-code) · [OpenAI age rules](https://help.openai.com/en/articles/8313401-age-requirements-for-chatgpt) · [Gemini for Education](https://workspaceupdates.googleblog.com/2025/06/the-gemini-app-is-now-available-for-all-google-workspace-for-education-users.html) · [IEA Energy and AI](https://www.iea.org/news/ai-is-set-to-drive-surging-electricity-demand-from-data-centres-while-offering-the-potential-to-transform-how-the-energy-sector-works)

---

## 10. Still unverified

Check these before build, print or client presentation.

1. **EU AI Act Article 4 amendment.** The Digital Omnibus on AI (Reg. (EU) 2026/1744, in force 27 July 2026) changing the duty to "support" AI literacy comes only from secondary legal commentary. Confirm the exact consolidated wording on EUR-Lex.
2. **UNESCO competency labels.** The 4 dimensions × 3 levels structure is confirmed. The exact names of all 12 competencies (e.g. "problem scoping", "iteration and feedback loops", "citizenship in the era of AI") were not read from the final PDF; some labels in secondary sources come from the 2023 draft.
3. **AILit final framework.** The domains (Engage, Create, Manage, Shape) are confirmed on ailiteracyframework.org. The competence count (19) and the June 2026 final date come from round 3, not re-checked here.
4. **PISA 2029 MAIL draft competencies** come from secondary summaries. Read the OECD draft PDF.
5. **Skills England tools package** (AI Skills Framework, Adoption Pathway Model, Employer Checklist): the date is early November 2025 per secondary sources. The contents of the January 2026 *AI foundation skills for work* benchmark were not read.
6. **ST1512 Level 4 AI & Automation Practitioner**: approval date (10 Dec 2025 vs a March 2026 launch), duration (15 vs 18 months) and funding band come from provider pages. Confirm on the Skills England standard page. The existence of a Level 6 "AI Engineer" standard is a vendor claim.
7. **Knowledge in Action**: the "+8 percentage points" figure is from a secondary summary. Read Saavedra et al. 2022 for effect sizes.
8. **Chen & Yang 2019 DOI** was not checked; the citation is via a secondary index.
9. **EEF Project Based Learning** trial details come from Tes and Durham coverage. Read the EEF report page directly.
10. **Teachable Machine privacy** ("training stays in the browser") comes from a third-party review. Confirm in Google's own documentation and terms, including the minimum age.
11. **Machine Learning for Kids** account model and age guidance: confirm on machinelearningforkids.co.uk.
12. **Gemini for Education under-18 settings in the UK.** Confirm current admin defaults and whether any features remain 18+ in UK Workspace for Education editions.
13. **Microsoft Copilot** student age rules were not researched.
14. **Google AI Essentials** age requirement and free access routes for UK schools were not confirmed.
15. **Elements of AI** participant numbers (1m vs 2m) and recommended age.
16. **CREST Machine Learning Bronze brief.** The page exists in the CREST library (search result), but its contents, owner and tools were not read (the fetch redirected).
17. **Arts Award level ages** come partly from secondary pages. The DofE Skills section minimum time for Bronze (3 vs 6 months depending on section choice) should be confirmed with DofE.
18. **iDEA** Gold status and the Bronze points threshold.
19. **ITU AI for Good youth programme**: no current details found.
20. **Junior Journalist apprenticeship** (Level 3) was not checked.
21. **ISTE**: a claimed 2024 update adding AI literacy to the student standards was not confirmed.
22. **DfE product safety expectations**: a January 2026 update was reported by a third party. Check the gov.uk version history and current wording.
23. **ICO**: reports of a dedicated statutory **edtech code** under the Data (Use and Access) Act 2025 come from one secondary source.
24. **Nominet Digital Youth Index**: no 2025 edition found; 2023 figures used.
25. **Experience AI 2026 impact figures** (2.9m young people, 30,000+ educators, 38 countries) come from the PDF's search snippet. The percentage gains need checking against the PDF.
26. **Work Trend Index 2025**: no global percentage for leaders running human–agent teams was found. "Agent boss" framing only.
27. **Education and Employers** wage-premium and NEET figures come from a charity brief. Check the underlying papers before quoting numbers.
28. All **fictional organisations** in the lab scenarios (Harbourside Council and others) must be checked so they don't match a real body's name or branding before production.
