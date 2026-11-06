# 10 — Minecraft as a learning and engagement vehicle (deep pass)

Prepared for DeltaOps Learning, 4 November 2026. This is research, not legal advice.

**How to read this report**
- **[est]** marks an estimate or a figure that only secondary sources give.
- **[unverified]** marks a claim I could not confirm against a primary source in this session.
- **[bg]** marks a point drawn from background knowledge rather than a page retrieved this session. Check these before relying on them.

**Method and limits.** I used about 30 web searches and fetched primary documents directly where I could:
- Mojang Usage Guidelines (full text)
- Minecraft Education Usage Guidelines PDF (v1.01)
- the Minecraft Education partner, camps-and-clubs and licensing pages
- the Hour of AI facilitator deck and solutions guide
- the AI Foundations curriculum overview
- the Soane Museum press release
- the PC Gamer article on the Allumeria takedown

The session's web-search budget ran out part-way through the legal section. As a result, these items stayed open:
- the Mini World (China) case
- App Store clone takedowns
- Blooket and Gimkit popularity
- named quiz-channel audiences
- attendance figures for the exhibitions

They are flagged where they come up. A follow-up session with more search budget could close them.

---

## Contents
1. Headline findings, including what changed since the first pass
2. Quizzes and trivia: formats, platforms, audiences
3. Minecraft Education: scale, AI content in full, tools, evidence, barriers
4. What children love, by age 7–13
5. Mojang's design philosophy and how it onboards children
6. Adjacent formats: movie, spin-offs, exhibitions, toys, YouTube, Roblox
7. Legal deep dive: guidelines quoted, enforcement cases, UK/EU/US principles
8. Deliverable A: "Sure or Not Sure?" pack for all four labs
9. Deliverable B: derivative-risk style checklist
10. Deliverable C: partner-route decision memo
11. Recommendations
12. Sources

---

## 1. Headline findings

1. **The official scale figure is now dated January 2026.** The boilerplate reads "Used by more than 40,000 school systems across 140 countries" ([Soane press release, Jan 2026](https://www.soane.org/sites/default/files/2026-01/Soane%27s%20Portals%20to%20the%20Past%20Press%20Release%20FINAL.pdf); [MCEDU two-pager 2025](https://education.minecraft.net/content/dam/education-edition/learning-experiences/MCEDU%202pager%202025.pdf)).
   - Microsoft no longer publishes a student or licence count.
   - The last official user count was 2M users in 115 countries, in 2017.
   - The "35M students and teachers licensed" figure dates from 2021 and only secondary sites repeat it **[est]**.
2. **"Generation AI" does exist.** My first pass said I could not confirm it; that was wrong. It is the 2023 *Hour of Code: Generation AI*, a time-travel lesson about responsible AI ([MC Edu blog](https://education.minecraft.net/es-es/blog/hour-code-2023)).
   - Minecraft Education now offers six AI activities on its Hour of AI page: The First Night, Reed Smart: AI Detective, Fantastic Fairgrounds, AI for Earth, Hour of Code: Generation AI, and CyberSafe AI: Dig Deeper ([Hour of AI page](https://education.minecraft.net/en-us/resources/hour-of-ai-the-first-night)).
3. **The First Night trains the Agent through literal "training data", and never shows confidence.** Children edit a `training_data` dictionary, for example `'wood': 'oak_log'`, and the Agent then classifies or crafts.
   - Errors appear as the Agent "forgetting" things, such as building a shelter with no door. Human oversight is then discussed in the reflection.
   - There is **no "% sure" or confidence display**.
   - DeltaOps' scripted "guess + % sure" mechanic is therefore a real differentiator.
4. **Commercial providers may charge for instruction in Minecraft Education but may not sell worlds or materials for it.** The Minecraft Education Usage Guidelines say so in terms: "Selling content and learning materials (we're not cool with this)" and "Charging for instruction time using Minecraft Education (we're cool with this)" ([Edu Usage Guidelines PDF](https://education.minecraft.net/content/dam/education-edition/learning-experiences/guidelines/Education%20Usage%20Guidelines%20v1.01.pdf)).
   - Commercial organisations pay **$36 per user per year** for "Camps and Clubs" licences ([licensing](https://education.minecraft.net/en-us/licensing)).
   - This reshapes the partner route (section 10).
5. **Look-alike risk is not only theoretical.** In February 2026 Microsoft filed a DMCA takedown against the indie voxel game *Allumeria*, which forced it off Steam. The notice cited "Minecraft content, including but not limited to gameplay and assets", and the comparison screenshots showed no specific similarity "beyond using voxels". The claim was withdrawn days later.
   - The developer suspected an automated claims service ("Tracer.AI") ([PC Gamer](https://www.pcgamer.com/games/survival-crafting/i-genuinely-do-not-know-what-to-do-says-developer-of-minecraft-like-allumeria-after-microsoft-issues-a-dmca-takedown-forcing-it-off-steam/); [GameSpot](https://www.gamespot.com/articles/microsoft-withdraws-copyright-claim-against-indie-dev-over-minecraft-allegations/1100-6538103/)).
   - **Implication:** automated brand-protection tools may flag voxel imagery. Keep DeltaOps' public screenshots visibly unlike Minecraft.
6. **Museum partnerships follow a clear model.** In the Soane Museum's *Portals to the Past* (January 2026):
   - BlockBuilders, a third-party UK studio, built the world.
   - Private donors funded it.
   - It is free in Minecraft Education with lesson plans.
   - It includes Ancient Rome, which overlaps directly with DeltaOps' Londinium lab.

---

## 2. Quizzes and trivia

### 2.1 Formats that work with 7–13s

| Format | Example | Audience signal | Why it works |
|---|---|---|---|
| Personality "which X are you" | Beano "Which Minecraft mob are you?" ([Beano](https://beano.com/?p=160280)) | Kid publisher with mass reach; no counts published | Self-identification; every answer "wins"; easy to share |
| Recall or recognition trivia | Sporcle Minecraft category ([Sporcle](https://www.sporcle.com/games/subcategory/minecraft)); e.g. "Minecraft Crafting" ~498K plays **[est, snapshot]** | High: lore knowledge is social currency | Expert identity ("only real fans know") |
| Live classroom quiz | Kahoot "The Minecraft General Knowledge Quiz": **~2.9M plays, ~6.9M participants** ([Kahoot](https://create.kahoot.it/details/the-minecraft-general-knowledge-quiz/eab4ca4e-e3a7-4672-8cfc-62bd0b93f661)) **[snapshot via search]**; long tail, e.g. "Guess the mob" with 392 plays | Very high for one user-made kahoot | Room-wide competition, music, speed |
| Official quiz tie-in | Kahoot! × Minecraft Education TimeCraft coding kahoots, 2021 ([Kahoot press](https://kahoot.com/press/2021/11/09/kahoot-minecraft-hour-of-code/)) | No current partnership found | Bridges a game lesson to a review quiz |
| Streamer-played quizzes | e.g. Tubbo playing Minecraft kahoots with viewers ([YouTube](https://www.youtube.com/watch?v=pxg_QqkG4OY)) | Creator-driven | Quiz as a performance |
| Podcast or video trivia for kids | "Trivia for Kids" Minecraft episode ([Libsyn](https://sites.libsyn.com/529502/quick-quiz-minecraft)) | Audience size unknown | Audio-friendly, pause-and-answer |
| In-game quiz mechanics | Minecraft Education NPCs and chalkboards give prompts; formative checks of "3-5 questions" after each AI Foundations lesson ([AI Foundations overview](https://education.minecraft.net/content/dam/education-edition/learning-experiences/ai-solution/AI%20Foundations%20Curriculum%20Overview%202025l.pdf)) | Institutional | Assessment woven into the world |

**Gaps.**
- I found no official or high-volume Minecraft sets on **Blooket or Gimkit**. Sets there are made by users and their play counts are not public through search **[unverified]**.
- I found no Minecraft quiz channel with a known subscriber count. The large audiences belong to let's-play and roleplay creators (section 6.5), not to quiz channels.

**Why quizzes work [inference, consistent with the sources above].** Four things combine:
1. recall of lore children already own, which builds an expert identity
2. low stakes
3. a social, room-wide moment (Kahoot, call-and-response)
4. immediate feedback

The personality format adds "I am this kind of person". DeltaOps can borrow each of these mechanics without any Minecraft content.

---

## 3. Minecraft Education

### 3.1 Scale and pricing
- **Official:** "more than 40,000 schools and systems worldwide" ([two-pager 2025](https://education.minecraft.net/content/dam/education-edition/learning-experiences/MCEDU%202pager%202025.pdf)), and "more than 40,000 school systems across 140 countries" ([Soane PR, January 2026](https://www.soane.org/sites/default/files/2026-01/Soane%27s%20Portals%20to%20the%20Past%20Press%20Release%20FINAL.pdf)).
- **History:**
  - 2016: launched in 50 countries at $5 per user per year.
  - 2017: 2M users in 115 countries ([Windows blog](https://blogs.windows.com/windowsexperience/2017/11/14/minecraft-education-edition-reaches-milestone-two-million-users-releases-new-hour-code-tutorial/)).
  - 35M licensed in 115 countries is a 2021 figure repeated by secondary sites ([DemandSage](https://www.demandsage.com/minecraft-statistics/)) **[est]**.
- **Licences** ([licensing](https://education.minecraft.net/en-us/licensing)):
  - Academic: **$5.04 per user per year**.
  - Commercial organisations, i.e. "Camps and Clubs": **$36 per user per year**, annual commitment, bought in the Microsoft Admin Center ([camps-and-clubs](https://education.minecraft.net/en-us/get-started/camps-and-clubs)).
- **Platforms:** Windows, Mac, iPad and iOS, Chromebook, Android.
- The programme turned 10 in November 2026 ([sqmagazine](https://sqmagazine.co.uk/minecraft-statistics/) **[est]**).

### 3.2 AI content: what is actually in it

**AI Foundations** (curriculum overview, © 2024; [PDF](https://education.minecraft.net/content/dam/education-edition/learning-experiences/ai-solution/AI%20Foundations%20Curriculum%20Overview%202025l.pdf))
- **Audience and length:** 14 lessons, Grades 3–9, ages 8–14. The full unit also lists Grades 3–12. Pacing is about 14 hours.
- **Pillars:** Understanding AI, Using AI, Evaluating AI. Evaluating covers "Identify potential biases", "Discuss responsible AI practice" and "Consider privacy and safety".
- **Strands:**
  - Introduce AI: *AI Adventurers* (3 short videos, 1 world, a parent discussion guide, 3 lesson plans) and *Fantastic Fairgrounds*.
  - Integrate into curriculum: *AI for Earth* (5 worlds, 5 lesson plans).
  - Connect to computer science: Hour of Code/AI tutorials and *CyberSafe AI: Dig Deeper*.
  - Culminating project: "AI for Good".
- **Teaching model:** gradual release ("I do / We do / You do"). Each lesson has a formative check of 3–5 questions, and there is a summative performance task with a rubric.
- **Session 1 objective:** "Students will practice identifying ways to detect if information from AI tools is correct". This is the closest Minecraft equivalent to DeltaOps' "question a response" skill.
- **Session 4 example:** "Who is that Ocelot?" uses semi-supervised machine learning to match coat patterns, i.e. wildlife identification. This is directly analogous to a pond or nature lab.
- **Reed Smart: AI Detective:** three cases covering deepfakes, AI-generated content and plagiarism ([Hour of AI page](https://education.minecraft.net/en-us/resources/hour-of-ai-the-first-night)).
- **Requirements:** a device per student, Minecraft Education installed, and internet for parts of the unit. A licence is needed for the full experience.

**Hour of AI: The First Night** (Minecraft Education with Code.org, released 12 November 2025)

Sources: [blog](https://education.minecraft.net/en-us/blog/hour-of-ai-the-first-night); [facilitator deck PDF](https://education.minecraft.net/content/dam/education-edition/learning-experiences/hofai-the-first-night/HOAI25_Facilitator%20Presentation%20Final%20ENG%20v2.pdf); [solutions guide PDF](https://education.minecraft.net/content/dam/education-edition/learning-experiences/hofai-the-first-night/HOAI25_Solutions%20Guide%20FINAL%20ENG.pdf).

- **Access:** free with no licence via "Try a demo". The facilitator guide comes in 29 languages, plus a certificate, sticker, solution guide and live "Classroom Play-Alongs" on Teams.
- **Running order in the facilitator deck** (60 minutes):
  1. Introduction: 2 + 1 minutes
  2. Trailer: 1 minute
  3. Key concepts: 5 minutes
  4. **Demo the first activity together: 10–15 minutes**
  5. Independent work: 20 minutes
  6. Conclusion: 5 minutes, plus an optional AI Build Challenge as reflection
- **Opening discussion prompts:** "What do you think a robot (or AI) can learn to do?", "Have you ever used AI or a smart device?", "What is one thing you would like to train an AI to complete for you?"
- **Mission:** survive the first night. The six tasks are collect wood, make tools, build a shelter, craft a door, add light, and make a bed.
- **How the Agent is trained:** the child edits starter code, in Blocks or Python. Python is "set at expert level". The code calls `ai.make_api_request` with a `training_data` dictionary.
  - Classification is taught one example at a time: `'wood': 'oak_log'`, then birch is added, then acacia.
  - Crafting is taught as grid patterns written in strings.
  - Upgrades map each tool to cobblestone.
  - Building materials are classified as cobblestone or wood.
  - After the Agent is trained, "mini-Agents" are deployed to collect at scale.
- **How errors appear:** the blog says children "fix mistakes (like forgetting to add a door before the zombies arrive!)" and that the Agent "starts out clueless". Errors are framed as missing training or missing detail. There is **no visible confidence or probability**.
- **Scaffolds:** a lightbulb hint shows the solution, Immersive Reader reads text aloud, and the inventory can be reset.
- **Reflection questions:** "How do you define artificial intelligence?", "How did you train the Agent…?", "Why is human verification important when using AI?"
- **Supporting stat it cites:** "72% of students want guidance from trusted adults about AI" (the blog links the research; I did not open the underlying source).

**Hour of Code: Generation AI** (2023)
- Students "venture through time to create AI-powered inventions" and "resolve issues around fairness and discrimination, reliability and safety".
- Ages 7+, about 45 minutes, free with no licence ([blog](https://education.minecraft.net/es-es/blog/hour-code-2023)).

**What is missing from these lessons.** I found **no published evaluation of AI Foundations, Hour of AI or Generation AI**. The general Minecraft Education evidence is covered in 3.4.

### 3.3 Tools relevant to quizzes and assessment
- **NPCs and chalkboards** deliver goals, instructions and challenges. In the Build a Furniture challenge the NPC hands out the Camera and the Book & Quill ([MS Learn](https://learn.microsoft.com/training/modules/minecraft-place-first-blocks/teach-build-furniture)).
- **Camera, Portfolio and Book & Quill** form the evidence chain. Portfolio exports images, and the Book & Quill exports to PDF ([assessment guide](https://education.minecraft.net/lessons/assessment-in-minecraft-education-edition-a-guide-for-teachers)). Teachers report bugs when an NPC gives the book ([community post](https://educommunity.minecraft.net/hc/en-us/community/posts/13679593846804-How-to-Play-4-Camera-Book-Quill-Bug-NPC-world-bug-still-buggin)).
- **Code Builder** runs MakeCode or Python.
- **Lesson Crafter** is an AI tool for building lesson plans, launched May 2025 ([MC Edu blog](https://education.minecraft.net/en-us/blog/teaching-ai-literacy-with-minecraft)).
- **Build Challenges** are prompt-based creative builds, run asynchronously or head-to-head ([MS Learn](https://learn.microsoft.com/en-us/training/modules/build-challenges-minecraft-esports)). Organisers judge them their own way:
  - NYC: staff rubric, then live finals ([NYC DOE](https://www.schools.nyc.gov/learning/in-our-classrooms/subjects/stem/minecraft-education-challenge)).
  - Queensland Parliament: a 40-point rubric ([handbook](https://www.parliament.qld.gov.au/documents/Explore/Education/teacherzone/MinecraftCompHandbook2024.pdf)).
  - K12: public voting on screenshots ([K12](https://enrichment.k12.com/k12-minecraft-education-challenge/)).
  - **The pattern:** a prompt, then a build, then photo evidence, then a rubric or vote.

### 3.4 Evidence of impact (independent first)
- **Slattery et al. 2025**, a broad systematic review, finds "promising" cognitive and academic benefits but limited evidence quality. One author is affiliated with Microsoft Ireland ([Wiley](https://bera-journals.onlinelibrary.wiley.com/doi/10.1002/rev3.70035); [PDF](https://doras.dcu.ie/30744/1/Review%20of%20Education%20-%202025%20-%20Slattery%20-%20Assessing%20the%20benefits%20of%20digital%20game%E2%80%90based%20learning%20with%20Minecraft%20in%20children%20.pdf)).
- **Cluster RCT** (32 classes, N=885): **no overall improvement in spatial thinking**. Only 5th-year pupils improved, and creativity was higher in the *control* group at post-test ([ScienceDirect](https://www.sciencedirect.com/science/article/pii/S0959475224001300)).
- **Positive but weaker designs:**
  - A review of 42 papers found gains in motivation, language, science, history and social skills ([Strathprints](https://strathprints.strath.ac.uk/78811)).
  - An Irish qualitative study found creativity, collaboration and enjoyment ([PMC](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10170428/)).
  - A Thai study of Grade 4 found coding and creativity gains ([ERIC](https://files.eric.ed.gov/fulltext/EJ1480446.pdf)).
- **A negative quasi-experiment** on energy concepts: the comparison group outperformed the Minecraft group ([Foro de Educación](https://forodeeducacion.com/ojs/index.php/fde/article/view/769)).
- **Vendor material** includes a 2025 whitepaper hosted by the ROM ([PDF](https://www.rom.on.ca/sites/default/files/2025-09/Minecraft_Educational_Benefits_Whitepaper.pdf)). Treat it as promotional.
- **Reading:** engagement and motivation are well supported. Learning gains are mixed. DeltaOps should claim engagement and measure learning itself.

### 3.5 Teacher adoption barriers
- **Mostly technical:** usability in local conditions ([QUT report for Microsoft](https://research.qut.edu.au/dmrc/wp-content/uploads/sites/5/2019/10/MEE-Research.pdf)) and external technology barriers ([Irish primary study](https://informahealthcare.com/doi/full/10.1080/03323315.2023.2185276)).
- **First-order barriers:** time, equipment and training. **Second-order barriers:** teachers' beliefs ([Ateneo/ICCE](https://library.apsce.net/index.php/ICCE/article/view/4805)).
- **Structural:** Microsoft 365 or Admin Center accounts, licence purchase and per-device installation (the AI Foundations materials list) [inference from documents].

---

## 4. What children love, by age 7–13

- **Melbourne parent survey** (n=753, ages 3–12): almost half play.
  - Creativity is the top theme, then social play (even when not in the same world), then finding "their own niche".
  - Observation shows mostly Creative mode, with real-life pretend play such as shops and schools ([Pursuit](https://pursuit.unimelb.edu.au/articles/what-are-kids-getting-out-of-playing-minecraft)).
- **YouTube as a learning channel:**
  - Dezuanni's "peer pedagogies": children learn gameplay *and* how to behave socially through let's-play creators they feel a para-social "friendship" with ([MIT Press](https://mitpress.mit.edu/9780262539722/peer-pedagogies-on-digital-platforms/); [CLA blog](https://clalliance.org/blog/minecraft-lets-players-and-peer-pedagogies/)).
  - 40% of tweens watch YouTube specifically to see YouTubers ([PMC](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6928007/)).
- **UK context:** Ofcom reports creative games are especially popular with girls, and that vloggers strongly influence 8–11s ([Ofcom 2025 report](https://www.ofcom.org.uk/media-use-and-attitudes/media-habits-children/children-and-parents-media-use-and-attitudes-report-2025)). I did not extract Minecraft rankings from the 2025 report.
- **Scale:** about 190–212M monthly players, 2025–26 **[est]** ([minecraft.how](https://minecraft.how/blog/post/minecraft-2025-year-in-review-204-million-players)).
- **Age pattern [inference, triangulated from the above and section 6]:**
  - **7–9:** mobs and animals, pets, rescue and caretaking stories, simple building, gentle roleplay (Aphmau-style), call-and-response jokes. They want to be "the helper's teacher".
  - **10–11:** mastery, efficient builds, "only real fans know" trivia, survival challenges, speedrun culture, memes ("chicken jockey").
  - **12–13:** redstone and logic, mods, servers, irony and status. They tolerate "kiddie" framing less, so **give them the expert or judge role**, e.g. auditing the helper.

---

## 5. Mojang's design philosophy and onboarding

- **Principles:**
  - Jens Bergensten's internal book *Minecraft Game Design* (2019, 94 pp) sets out core design principles. It was shown at Minecraft Live 2020 and was never distributed publicly ([Minecraft Wiki](https://minecraft.wiki/w/Minecraft_Game_Design)).
  - One published principle: **"bad things happen, but they're technically the player's fault"**. The player either caused the problem or had a chance to prevent it ([GamesRadar](https://www.gamesradar.com/games/open-world/minecraft-devs-want-to-avoid-treating-players-in-a-way-that-feels-unfair-so-mojangs-guiding-principle-is-that-bad-things-happen-but-theyre-technically-the-players-fault/)).
  - **Relevance to DeltaOps:** a vague card should produce a consequence the child can trace back to their own choice, never a random punishment.
- **Stewardship:** "a sandbox where the player owns the narrative and controls their world" (Anna Lundgren, Senior Product Manager) ([Game Rant](https://gamerant.com/minecraft-interview-chaos-cubed/)).
- **Agnes Larsson**, Vanilla Game Director, is described as keeping "inclusivity and simplicity" ([Minecraft Wiki](https://minecraft.wiki/w/Agnes_Larsson)).
- **Not found:** a GDC or Minecon talk specifically on onboarding children. One web page claiming a 2017 GDC talk by Bergensten looked fabricated, so I excluded it.
- **Onboarding as practised in official education products** (from the documents in 3.2):
  - **Demo first, then independent work.** The First Night spends 10–15 of 60 minutes on a whole-class demo of activity 1.
  - **Starter code is always given.** "Usually, there is just a small change that needs to be made."
  - **A hint button reveals the solution.**
  - **Text is read aloud** (Immersive Reader).
  - **A reset button** handles over-crafting.
  - **An in-world guidebook** ("Player's Guide to the First Night").
  - **One trailer** sets the stakes.
  - **No prior game knowledge is assumed.** Minecraft Experience says the same ([FAQ](https://www.minecraftexperience.com/singapore/faq/)).

---

## 6. Adjacent formats

### 6.1 A Minecraft Movie (2025)
- **Box office:** about $958–961M worldwide on a $150M budget ([The Numbers](https://www.the-numbers.com/movie/Minecraft-(2025))).
- **Effect on the game:** Sensor Tower measured **+35% mobile in-app revenue and +35% console units** after release, and **active users up 9% on mobile and 41% on console**, suggesting lapsed players returned ([GamesBeat](https://gamesbeat.com/minecraft-sales-grew-35-on-both-mobile-and-console-after-release-of-film-sensor-tower/)).
- **"Chicken jockey!"** became a call-and-response ritual in cinemas. Some cinemas restricted unaccompanied young audiences ([CTV/CNN](https://www.ctvnews.ca/entertainment/article/a-minecraft-movie-has-made-chicken-jockey-a-viral-thing/)).
- **For 7–13s [inference]:** high current familiarity even among non-players, and a strong appetite for **shoutable catchphrases**.

### 6.2 Spin-offs
- **Story Mode** (Telltale, 2015–17): choice-driven, with choices carrying across episodes ([Cult of Mac](https://www.cultofmac.com/328326/minecraft-story-mode-stars-two-goonies-and-a-pee-wee/)). It was delisted after Telltale closed **[unverified source quality]**.
- **Legends:** content ended about 9 months after launch ([VGC](https://www.videogameschronicle.com/news/minecraft-legends-development-is-ending-9-months-after-its-release)).
- **Dungeons:** a sequel, *Dungeons II*, is now on minecraft.net.
- **Lesson:** the IP carries co-op and choice formats, but genre shifts such as RTS do not hold children. Choice plus visible consequence is the strand that transfers, and it matches DeltaOps' 729-route structure.

### 6.3 Exhibitions and experiences
- **Minecraft: The Exhibition** (MoPOP with Mojang):
  - Seattle, October 2019 to April 2021.
  - Tour: Liberty Science Center (February–September 2022), Children's Museum of Indianapolis (March–August 2023), Spokane MAC (autumn 2023, final stop).
  - Designed to "explain Minecraft to parents" ([MoPOP](https://www.mopop.org/exhibitions/minecraft-the-exhibition); [LSC](https://lsc.org/media-information/13122-minecraft); [Spokesman](https://www.spokesman.com/stories/2023/sep/13/minecraft-the-exihibition-is-ending-its-national-t/); [EdSurge](https://www.edsurge.com/news/2019-10-23-world-premiere-exhibit-explains-minecraft-to-the-most-challenging-audience-parents)).
  - **No attendance figures found.**
- **Minecraft Experience: Villager Rescue** (Experience MOD and Supply + Demand with Mojang):
  - Opened in Dallas on 18 October 2024, then Chicago, London, Oberhausen and Singapore (at Mandai Wildlife Reserve).
  - 11 spaces, an "Orb of Interaction", about 55 minutes.
  - **Groups of no more than 25 every 15 minutes.**
  - Tickets about $32–42 in the US.
  - A post-visit in-game cape code.
  - "1 million visitors and counting" is a producer marketing claim ([Fever](https://feverup.com/m/533761)) **[unverified]**.
  - Sources: [Minecraft Wiki](https://minecraft.wiki/w/Minecraft_Experience:_Villager_Rescue); [FAQ](https://www.minecraftexperience.com/faq/).
- **For DeltaOps:** staffed, timed group sessions with a mission and a take-home are proven at scale. The Singapore venue shows a **nature venue** hosting one.

### 6.4 STEM, museum and toy partnerships
- **NASA:** Artemis worlds (2023, ages 8+), James Webb Telescope, Moon Base One (2024), Mission Control ([THE Journal](https://thejournal.com/Articles/2023/07/20/Minecraft-Education-Adds-Virtual-NASA-Artemis-Mission-Worlds-to-STEM.aspx); [NASA](https://www.nasa.gov/feature/take-the-next-giant-leap-with-nasa-and-minecraft)).
- **BBC Earth:** Frozen Planet II worlds set a single-day download record ([Windows Central](https://www.windowscentral.com/gaming/minecraft/minecraft-education-edition-gaining-five-new-worlds-inspired-by-frozen-planet-ii)).
- **Museums:**
  - **Soane: built by BlockBuilders, funded by philanthropy, free in Minecraft Education, covers Ancient Rome** ([PR](https://www.soane.org/sites/default/files/2026-01/Soane%27s%20Portals%20to%20the%20Past%20Press%20Release%20FINAL.pdf)).
  - The ROM is the "only museum… with multiple worlds" in the library and runs monthly programmes ([ROM](https://www.rom.on.ca/en/learning/rom-minecraft)).
  - The Met has *MetCraft* ([Met](https://www.metmuseum.org/articles/metcraft)).
- **How museum deals are contracted [inference from the Soane case plus partner page]:**
  1. The museum proposes via "Propose a Partnership".
  2. Minecraft Education curates.
  3. A Creator Community studio builds the world.
  4. Donors or the museum fund it.
  5. Distribution is free inside the licensed library.
  6. Branding follows Minecraft Education's approval.
- **World studios named:** BlockBuilders (UK), Shapescape (NASA, BBC, UNESCO), Box Build, Kreatik, Causeway Digital ([MinecraftPal](https://www.minecraftpal.com/news/90/nasa-the-bbc-and-unesco-all-hired-the-same-minecraft-studio)) **[secondary]**. I could not verify Blockworks or Lifeboat as Minecraft Education partners **[unverified]**.
- **LEGO Minecraft:** started as a LEGO Cuusoo fan idea, with the first Micro World set on 1 June 2012, which sold out ([Wikipedia](https://en.wikipedia.org/wiki/Lego_Minecraft)). Movie sets launched in March 2025, e.g. 21272 and 21273 ([Brickset](https://brickset.com/sets/theme-Minecraft/subtheme-A-Minecraft-Movie)). I found no Mattel or toy revenue data.

### 6.5 Children's Minecraft YouTube and facilitator style

| Creator | Reach | Format | What a facilitator can borrow |
|---|---|---|---|
| Stampy (Joseph Garrett) | 10.9M subs, 8.16B views; spin-off **Wonder Quest** edutainment series for classrooms (2015–16) ([Wikipedia](https://en.wikipedia.org/wiki/Stampy)) | Gentle character voice, storytelling, education woven in, daily rhythm | A warm persona; narrate what the helper is "thinking"; predictable ritual |
| DanTDM | 29M+ subs, 20B views; "largely targeted at children" ([Wikipedia](https://en.wikipedia.org/wiki/DanTDM)) | Enthusiastic reactions, "safe older cousin" ([Screenwise](https://screenwiseapp.com/guides/youtube-gaming-content-and-let-s-play-videos)) | Big genuine reactions to failure ("oh no, the ducks!"); laughing at mistakes |
| Aphmau | 25.3M subs, 30.6B views ([Wikipedia](https://en.wikipedia.org/wiki/Aphmau)) | Family-friendly roleplay with recurring characters | Recurring helper characters with personalities; "what will they do next?" |
| Little Lizard Gaming | 4M+ subs ([FunTech](https://funtech.co.uk/latest/best-kid-friendly-minecraft-youtubers)) | Tutorials | Show then do |

**Facilitator style guide derived from the table [inference]:**
- Narrate thinking aloud ("Hmm, the helper heard 'nice'… I wonder what it thinks nice means").
- React big to mistakes and treat them as funny, not shameful.
- Use recurring phrases and rituals.
- Give children the expert role ("You're the teacher, tell it").
- Respond to children's ideas: Dezuanni-style responsiveness matters more than charisma.

### 6.6 Roblox Education (comparator)
- The Roblox Community Fund ($10M) paired developers with educational organisations ([Roblox newsroom](https://about.roblox.com/newsroom/2023/08/where-learning-happens)).
- The Museum of Science Boston launched *Mission: Mars* (December 2022) with classroom materials ([MoS](https://www.mos.org/press-release/museum-science-roblox-partner-new-digital-experience-transforming-students-mars)).
- Roblox has been reported as aiming to reach 100M students by 2030 **[est]**.
- Safety concerns dominate press framing ([RoWatcher](https://rowatcher.com/news/roblox-in-the-classroom-stem-tool-or-safety-risk)).
- **For DeltaOps:** "no accounts, no chat, no live AI" is a positive differentiator against both platforms.

---

## 7. Legal deep dive (not legal advice)

### 7.1 Mojang "Minecraft Usage Guidelines": verbatim quotations

Source: [minecraft.net/en-us/usage-guidelines](https://www.minecraft.net/en-us/usage-guidelines), retrieved 4 November 2026.

- **Definitions:**
  - Name: "the name of any one of our games, taglines, features, events, or company identity. We also mean any names which are confusingly similar to our name."
  - Brand: "any names, related logos, fonts, textures, and any other distinctive characteristics of any part of our name and games."
  - Assets: "the code, software, graphics, textures, images, models, sounds and other audio from any of our games and any videos or screenshots taken from our games."
- **Target audience:** "The allowances we give in these guidelines do **not** authorize commercial companies, corporate brands, advertising agencies, non-profits, politicians, political action committees, governments to use or exploit Minecraft for promoting products, services, or agendas unrelated to Minecraft."
- **Status:** the guidelines "do not form part of the policies. Rather, they exist because we currently think it is a good idea to allow some leniency." Permissions "may be revoked at any time if we think that it is appropriate to do so, or we don't like what you are doing." "All rights are expressly reserved." "We are not able to give advice about whether a specific project does or does not comply… speak to an attorney."
- **Essential guidelines** (excerpts):
  - "Do **not** do anything or include anything that makes people think that what you are sharing could be interpreted as official or approved by, endorsed by, associated with, supported by, or connected to us."
  - "Do **not** make commercial use or commercially exploit anything that we have made unless these guidelines say it's okay."
  - "Prominently include the disclaimer similar to the following: 'NOT AN OFFICIAL MINECRAFT [PRODUCT/SERVICE/EVENT/etc.]. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT'."
- **Naming:** the name may be used "in a secondary name, secondary title, or description if you: Do so because it is necessary to describe your creations or their purpose honestly and fairly; Ensure that the secondary title… is not the dominant element…; Don't use any other aspect of any of our brand or assets as part of any related branding…; Don't use our name as keywords or search tags for products that have no relationship with them…" Examples:
  - "'Minecraft – the ultimate help app' (we're not cool with this)".
- **Commercial use:** "commercial use means any uses of our name, brand, or assets that you use and share with others (regardless of whether you receive payment or provide it for free)." Also: "You may do things that are specifically covered by the fair dealing or fair use exceptions."
- **Constructed promotions:** "commercial companies, corporate brands, advertising agencies, non-profits, politicians, political action committees, governments, individual artists, and other entities are not permitted to use Minecraft gameplay to promote or market products, services, events, campaigns, or brands unrelated to Minecraft without prior written approval from Mojang or Microsoft."
- **Video and screenshots:** gameplay must not be "displayed or projected publicly within physical locations", e.g. "Promoting or advertising big-screen Minecraft gameplay inside any commercial venue."
- **In-person events:** "limited to no more than approximately 150 participants"; "You may not accept sponsorships for purposes of profit"; "Do not use official Minecraft brand or assets on your marketing materials". Not OK: "Renting a convention center, charging admission…"
- **Publications:** "Don't use the Minecraft logo or the word 'Minecraft' in letters that look like, or attempt to look like, the style of our logo." Not OK: "a coloring books, poster, sticker book, or chart that just copies our assets."
- **Handcrafted goods:** OK: "A hand-crocheted blanket with the texture pattern of the Creeper." Not OK: "A box that features Steve's face in the Minecraft textures but with green eyes." Limits: 20 items per design and US$5,000 a year.
- **Catch-all:** "If something isn't covered by these guidelines and we haven't otherwise said it's okay, that probably means we don't want you to do it."

### 7.2 Minecraft Education Usage Guidelines (v1.01 PDF): verbatim quotations

Source: [PDF](https://education.minecraft.net/content/dam/education-edition/learning-experiences/guidelines/Education%20Usage%20Guidelines%20v1.01.pdf), via aka.ms/EducationUsageGuidelines.

- **Assets** here explicitly include "characters, mobs… learning material".
- "The allowances outlined do not extend to commercial companies… promoting non-related products." "The Minecraft Education team is only interested in partnerships that are educational, as we do not allow commercial or advertising content in Minecraft Education."
- **Instructional use:**
  - "Free sharing of content and learning materials (we're cool with this)."
  - "**Selling content and learning materials (we're not cool with this)**."
  - "**Charging for instruction time using Minecraft Education (we're cool with this)**."
  - Example: "Your organization offers an after-school program in which participants pay a fee to have an instructor guide students… (we're cool with this)". By contrast: "you sell the world and learning materials on your website (we're not cool with this)."
- **Commercial use:** organisations that do not qualify for Microsoft 365 Education "may qualify for a 'Camps and Clubs' license". If you "plan to sell education services (such as your own instructional materials or Minecraft Education worlds) to an organization (e.g., a school), you may use that institute's purchased licenses." Using Camps and Clubs licences to sell services "would constitute commercial activity", which is subject to the general guidelines.
- **Naming:** OK: "'OceanCraft: A World for Minecraft Education.'" Not OK: "'Minecraft Education Commuter Safety World'".
- **In-person:** "Encouraging educational camps and clubs to create great learning experiences is okay. Large scale commercialized community gatherings are not okay."
- **Disclaimer:** "NOT AN OFFICIAL MINECRAFT EDUCATION [PRODUCT/SERVICE/EVENT/etc.]. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT."

### 7.3 Minecraft Education partner page: verbatim quotations

Source: [Partner page](https://education.minecraft.net/en-us/get-started/partners).

- **Routes:**
  - "Include Minecraft Education in My Communications"
  - "Selling Minecraft Education Licenses"
  - "Esports"
  - "Camps, Clubs, and Organizations"
  - "Connect with Creator Community (…find someone to build a Minecraft world based on my lesson)"
  - "Propose a Partnership"
- "Most commercial uses of our brand assets and content will require a partnership agreement."
- **Assets requiring authorisation:** "Mojang logo; Minecraft logo; Minecraft Education logo; Agent; Alex & Steve; Creeper."
- "Wordmarks can be used to truthfully convey information about your product or service… However, our logos, app and product icons, illustrations, photographs, videos, and designs can never be used without written approval."
- **Don'ts** (without written approval):
  - "use… Brand Assets in the name of your business, product, service, app, domain name, social media account"
  - "use… logos, icons, or designs, in any manner"
  - "imply an affiliation"
  - "use… on any tangible goods or packaging, including any promotional… swag"
- **Global Training Partners** are listed as a separate route.

### 7.4 Enforcement history and cases

| Case | What happened | Relevance |
|---|---|---|
| **Allumeria (2026)** | Microsoft DMCA through Valve over "Minecraft content, including but not limited to gameplay and assets"; the comparison screenshots showed no specific similarity "beyond using voxels"; withdrawn days later; the developer suspected automated "Tracer.AI" claiming ([PC Gamer](https://www.pcgamer.com/games/survival-crafting/i-genuinely-do-not-know-what-to-do-says-developer-of-minecraft-like-allumeria-after-microsoft-issues-a-dmca-takedown-forcing-it-off-steam/); [GameSpot](https://www.gamespot.com/articles/microsoft-withdraws-copyright-claim-against-indie-dev-over-minecraft-allegations/1100-6538103/)) | **The highest practical risk is automated brand-protection flagging of voxel screenshots or listings**, not litigation. Withdrawal suggests voxels alone are not a sustainable claim, but the disruption is real |
| **Minecraft VR mod (2016)** | A community mod was discontinued "due to trademark complaints" after official VR support arrived ([Wikipedia: Minecraft](https://en.wikipedia.org/wiki/Minecraft)) | Mojang enforces the *name* in product titles |
| **Bethesda v Mojang, "Scrolls" (2011–12)** | Trademark suit; settled March 2012; Mojang agreed not to trademark "Scrolls" ([Wikipedia](https://en.wikipedia.org/wiki/Scrolls_(video_game))) | Mojang has also been a defendant; naming conflicts get settled |
| **Look-alikes left alone** | Terraria, Luanti/Minetest, Hytale and others are widely called "clones" with no reported action ([Wikipedia: Minecraft, "Clones"](https://en.wikipedia.org/wiki/Minecraft); PC Gamer, above). *The Blockheads* designer admitted his pixel art "too closely resembled" Minecraft and met fan "resistance" | Enforcement is selective. Pixel-texture resemblance draws *reputational* derivative criticism even without legal action |
| **Mini World (China) / NetEase** | Reported copyright and unfair-competition litigation over a Minecraft-like game **[unverified: search budget exhausted]** | Check before citing. Chinese courts may protect a game's overall visual expression more broadly |
| **App-store clones** | Not verified this session **[unverified]** | — |

### 7.5 Legal principles: UK, EU, US [bg, check with counsel]

**UK and EU copyright**
- Copyright protects expression, not ideas, genres, mechanics or a general style.
  - *Nova Productions v Mazooma Games* [2007] EWCA Civ 219: general game ideas and features were too abstract to be a "substantial part".
  - *SAS Institute v World Programming* (CJEU C-406/10, 2012): functionality is not protected.
- **But** non-literal copying of an artist's specific combination of choices can infringe. *Designers Guild v Russell Williams* [2000] UKHL 58 found infringement in a fabric design's copied style and technique.
- **Practical reading:** "made of cubes" is unprotectable. A near-copy of Minecraft's specific textures, block faces, character proportions and mob designs is risky.

**UK trade marks** (Trade Marks Act 1994)
- s.10(1)–(2) covers identical or similar signs with likely confusion.
- s.10(3) covers reputation marks: unfair advantage or detriment **without** confusion. *L'Oréal v Bellure* (C-487/07) is the "riding on coat-tails" case.
- Keyword advertising on a rival's mark can infringe where it affects the mark's functions (*Interflora v M&S*, C-323/09).
- "MINECRAFT" is a famous mark. **Do not bid on it, use it in ad copy, or put it in titles.**
- I believe some character or shape marks (e.g. the Creeper face) are registered as figurative marks **[unverified]**.

**UK passing off**
- Three elements: goodwill, misrepresentation, damage (*Reckitt & Colman v Borden* [1990] 1 WLR 491, the "Jif Lemon" case).
- Get-up is protected only if the public associates it with the claimant.
- False-endorsement cases show that implying approval is actionable (*Irvine v Talksport* [2002] EWHC 367 (Ch); *Fenty v Arcadia (Topshop)* [2015] EWCA Civ 3).
- **Practical reading:** marketing that suggests "Minecraft-approved" or "the Minecraft AI lab" is the main passing-off risk. A distinct look and name, with no endorsement cues, keeps DeltaOps clear.

**EU and national unfair competition**
- No harmonised look-alike tort exists. Germany's UWG §4 No. 3 ("slavish imitation") protects products of "competitive distinctiveness" against avoidable deception about origin.
- The Unfair Commercial Practices Directive, Annex I point 13, bans promoting a product similar to a competitor's so as to mislead about its origin.
- The UK equivalents now sit in the DMCC Act 2024.

**US**
- Trade dress requires distinctiveness and non-functionality. Product-design dress needs secondary meaning (*Wal-Mart v Samara*, 2000).
- **Game-clone precedent:** *Tetris Holding v Xio Interactive* (D.N.J. 2012). Copying a game's specific visual expression ("look and feel") infringed even though the rules were unprotectable.
- **Relevance:** if DeltaOps sells in the US, the closer its visuals are to Minecraft's specific expression, the more Tetris-style risk it carries.

**Net assessment [inference]**
- DeltaOps' flat-colour, rounded, floating-island diorama style with its own characters is low risk legally.
- The live risks, in order:
  1. Words: the name, ad keywords, "Minecraft-style" in marketing.
  2. Endorsement cues.
  3. Specific asset echoes: textures, Creeper or Steve likenesses, the hotbar, hearts and hunger bars, the 3×3 crafting grid UI, the logo-like font.
  4. Automated takedown flags on public imagery.

---

## 8. Deliverable A: "Sure or Not Sure?" pack for all four labs

### 8.1 How the pack works (same in every lab)

- **No devices or typing.** Everything is done with bodies, hands and the facilitator's screen. It works for a whole room or a group of up to about 25.
- **Response modes:**
  - **Corners / A-B-C:** children point, hold up 1–3 fingers, or move to a labelled corner.
  - **Sure-o-meter:** a floor line from "0% Not sure" to "100% Sure". Children stand where they think the helper's confidence *should* be.
  - **Thumbs:** up for "Trust it", sideways for "Check it", down for "Don't use it".
- **Slots:** the 10 questions per lab are tagged W (warm-up, before Stage 1), S1–S5 (one between each pair of stages; pick any that fit) and P (plenary, after Stage 6).
- **Catchphrase ritual:** when an assumption is revealed, the facilitator says "What did it assume?" and the room shouts "**ASSUMPTION!**", with a hand-to-forehead gesture. This borrows the call-and-response energy of "chicken jockey" without any IP.
- **Warm-up identity sort ("Which helper are you?")**, used in every lab before W1:
  - **Speedy Guesser:** "I just go for it!"
  - **Careful Checker:** "I look again before I decide."
  - **Question Asker:** "I ask what you mean first."
  - Children go to a corner. Facilitator line: "Today our AI helper is a bit of a Speedy Guesser. Your job is to be its Checker and its Asker."
- **Key to the "% sure" convention:**
  - The helper's % shows how sure *it* is, not how right it is.
  - The recurring teaching point is that high confidence can still be wrong when the instruction was vague, the data was narrow, or the world changed.
- **Age adaptation:**
  - 7–9: use the corners and thumbs; read options aloud.
  - 10–13: use the Sure-o-meter and ask "Why there?" Give them the "judge" role: they decide whether the helper's % was "fair".

### 8.2 Lab 1: Eco AI Explorer (pond, nature centre)

| # | Slot | Question (facilitator reads) | Options | Answer | Facilitator line |
|---|---|---|---|---|---|
| 1 | W | "The helper looks at a photo and says: 'That's a duck — 95% sure.' It's a moorhen. Should we trust 95%?" | Thumbs | **Check it.** High % can still be wrong | "Being very sure isn't the same as being right. Who's seen a moorhen? What gave it away?" |
| 2 | W | "Which instruction is clearest?" A: "Make the pond nice." B: "Make the pond good for frogs." C: "Add stones at the edge so frogs can climb out." | A/B/C | **C** | "C tells the helper *what* to do and *why*. What would 'nice' mean to a duck? To a visitor?" |
| 3 | S1 | Card: "Make it nice for visitors." The helper removes the reeds, 78% sure. "What did it assume?" A: Nice = tidy and open. B: Visitors hate water. C: Reeds are dangerous | A/B/C | **A** | "What did it assume?" → "ASSUMPTION!" "Who else needs the reeds?" (nesting birds, dragonflies, cover for ducklings) |
| 4 | S2 | "The helper says 'Fish need more food — add bread', 70% sure. How sure *should* it be?" | Sure-o-meter | **Low.** Bread pollutes water and is poor food for wildlife | "Stand where you think it should be. Why did you go low? Where could the helper check?" (ranger, sign) |
| 5 | S3 | "The helper learned what 'a healthy pond' looks like from photos of garden ponds with fountains. What will it get wrong at a wild pond?" A: It wants a fountain and clear water. B: It wants more mud. C: Nothing | A/B/C | **A** | "It learned from one kind of pond. Learning from narrow examples makes narrow guesses." |
| 6 | S4 | Card: "Keep it safe." The helper adds a tall fence all round, 85% sure. "Safe for whom?" | Corners: children / wildlife / both / "ask!" | **Ask!** The card didn't say | "When an instruction could mean two things, the best move is to ask. How could we rewrite the card?" |
| 7 | S5 | "The helper says the pond is 'healthy — 90% sure' because it counted lots of algae as 'plants'. Trust, check or don't use?" | Thumbs | **Check it.** Too much algae can mean a problem | "It found plants but didn't know which kind. What would a ranger look for?" |
| 8 | P | "Which card got the best result for *both* visitors and wildlife?" (show the saved plan) | Show of hands | **A boardwalk that keeps the reeds wild**, or the group's best equivalent | "What made that instruction work? Name one word that made it clearer." |
| 9 | P | "When should a helper say it's NOT sure?" A: When the instruction is vague. B: Never, it's a computer. C: When it's seen lots of examples | A/B/C | **A** | "A good helper tells you when it's guessing. A good human asks when they're guessing too." |
| 10 | P | "Finish the sentence together: 'Before I trust an AI's answer, I…'" | Shout-out | Open; good answers: "check", "ask what it assumed", "look at the real thing" | "Write yours on your habitat plan before you go." |

### 8.3 Lab 2: AI Inventor Lab (Mars rover, STEM club)

| # | Slot | Question | Options | Answer | Facilitator line |
|---|---|---|---|---|---|
| 1 | W | "The rover camera says 'Rock ahead — 92% sure.' It's a shadow. What could have fooled it?" A: Low sun makes dark shapes. B: The rover is tired. C: Rocks are invisible | A/B/C | **A** | "Cameras see light and dark, not 'things'. When could you mistake a shadow for something solid?" |
| 2 | W | "Which instruction is clearest?" A: "Go fast." B: "Go to the crater." C: "Drive 10 metres north, stop if the slope is steeper than the safe limit" | A/B/C | **C** | "Engineers write instructions a robot can't misunderstand: distance, direction, a stop rule." |
| 3 | S1 | Card: "Explore quickly." The rover drives straight into soft sand and gets stuck, 80% sure the route was fine. "What did it assume?" A: All ground is the same. B: Sand is a rock. C: Mars is flat | A/B/C | **A** | "ASSUMPTION!" "Real rovers have got stuck in Martian sand. How would you warn yours?" |
| 4 | S2 | "Messages between Earth and Mars take several minutes to over 20 minutes each way. Should the rover wait for us before every move?" | Corners: always / never / only for risky moves | **Only for risky moves** | "That's why rovers have some autonomy, and why we must tell them clearly when to stop and ask." |
| 5 | S3 | "The rover's AI learned what 'interesting rocks' look like from photos of Earth rocks. It says 'Boring rock — 88% sure.' Trust it?" | Thumbs | **Check it.** Trained on Earth, now on Mars | "When an AI is used somewhere new, its % sure can be too high. What should we compare it with?" |
| 6 | S4 | Card: "Find water." The rover looks for puddles and finds none, 95% sure there's no water. "What did it assume?" A: Water is always liquid. B: Mars has oceans. C: Water is red | A/B/C | **A.** Mars water is mostly ice, e.g. at the poles and underground | "Its guess was confident *and* incomplete. How should we rewrite 'find water'?" |
| 7 | S5 | "Dust covers the camera. The helper says 'Everything looks clear — 75% sure.' How sure should it be?" | Sure-o-meter | **Low.** A bad sensor means low confidence | "If your eyes are blocked, should you be confident? A good AI checks its own sensors." |
| 8 | P | "Compare: the camera report said X; we could see Y. Who was right, and why?" (use the lab's final camera comparison) | Discussion | Whichever the evidence shows | "Point to what you saw that the camera didn't." |
| 9 | P | "Which three words should go on every rover instruction?" A: Where, how far, when to stop. B: Fast, cool, go. C: Please, thank you, now | A/B/C | **A** | "Read out your rover specification. Does it have all three?" |
| 10 | P | "Sure-o-meter: 'An AI that is 99% sure is always right.'" | Floor line, agree to disagree | **Disagree** | "What's one way we saw a very sure helper get it wrong today?" |

### 8.4 Lab 3: Mission AI (lighthouse camp, "keep the lights on after dark", activity centre)

| # | Slot | Question | Options | Answer | Facilitator line |
|---|---|---|---|---|---|
| 1 | W | "The helper says 'Sunset is at 9 pm — 90% sure.' It's October. Trust it?" | Thumbs | **Check it.** Sunset is much earlier in autumn. The helper may have learned from summer data | "When was its information from? Old information can sound very sure." |
| 2 | W | "Which is clearest?" A: "Get to the lighthouse." B: "Get to the lighthouse safely." C: "Get to the lighthouse before sunset, using the cliff path, with the lamp battery" | A/B/C | **C** | "Clear missions say *when*, *how* and *what to bring*." |
| 3 | S1 | Card: "Go the quickest way." The helper picks the beach route, 82% sure. The tide is coming in. "What did it assume?" A: The beach is always there. B: Water is dry. C: The lighthouse moves | A/B/C | **A.** The beach floods at high tide | "ASSUMPTION!" "Tides come in and out about twice a day. What should the helper have checked?" |
| 4 | S2 | "The weather app says 'No rain — 60% sure.' Should we pack waterproofs?" | Corners: yes / no / ask an expert | **Yes**: 60% leaves a real chance of rain | "60% sure means it could easily be wrong. What do people do when they're not sure? They prepare." |
| 5 | S3 | Card: "Bring what we need." The helper packs snacks and a football, no torch, 77% sure. "What did it assume?" | A: We're having a picnic. B: It's night already. C: Torches are heavy | **A.** It guessed the kind of trip | "Same words, different trips. How could we tell it it's a night mission?" |
| 6 | S4 | "The helper says the lamp has 'plenty of power — 95% sure'. The battery icon is at 10%. Who do you believe?" | Thumbs | **Don't use it; trust the evidence** | "When an AI disagrees with what you can see, stop and look again." |
| 7 | S5 | "The helper has only ever planned routes in daylight. Night falls. How sure should it be now?" | Sure-o-meter | **Lower than before**: a new situation | "New situations should make a good helper less sure. Did ours lower its %?" |
| 8 | P | "Which choice kept the lights on?" (review the expedition map) | Hands | The group's successful route | "What did your team change after the first try?" |
| 9 | P | "Who should make the final call on a dangerous route?" A: The AI. B: A responsible human, using the AI's advice. C: Whoever shouts loudest | A/B/C | **B** | "AI can help plan. People stay responsible for safety." |
| 10 | P | "One word for a good instruction?" | Shout-out: e.g. "clear", "when", "safe", "check" | Open | "Put your word on the expedition map." |

### 8.5 Lab 4: AI Time Traveller (Roman Londinium, museum)

Historical framing points to check with the venue's collection team:
- Londinium was founded around AD 47–50.
- It was burned in Boudica's revolt around AD 60–61.
- Most people ate simple food: bread, porridge, pottage, street food.
- Evidence comes from excavations such as the Bloomberg writing tablets and the amphitheatre under Guildhall [bg].

| # | Slot | Question | Options | Answer | Facilitator line |
|---|---|---|---|---|---|
| 1 | W | "The helper says 'All Romans ate huge feasts — 93% sure.' How sure should it be?" | Sure-o-meter | **Low.** Feasts were for the rich | "Who writes about feasts? Who gets painted? Whose dinners do we *not* hear about?" |
| 2 | W | "Which question will get the most accurate answer?" A: "Tell me about Romans." B: "What did a shopkeeper in Londinium eat for lunch, and how do we know?" C: "Were Romans cool?" | A/B/C | **B** | "'How do we know?' is a historian's superpower. And an AI-checker's too." |
| 3 | S1 | Card: "Show me a Roman home." The helper builds a villa with mosaics, 88% sure. "What did it assume?" A: Everyone was rich. B: Romans lived underwater. C: Homes didn't exist | A/B/C | **A** | "ASSUMPTION!" "Most people in Londinium lived in small timber-and-clay buildings. Let's look at the evidence in the gallery." |
| 4 | S2 | "The helper learned about Rome mostly from pictures of the city of Rome. What might it get wrong about Londinium?" | Corners: weather / size / buildings / all of these | **All of these** | "Londinium was a frontier town. Learning from one place can make wrong guesses about another." |
| 5 | S3 | "An object in our collection disagrees with the helper. Who wins?" | Thumbs | **The evidence** (trust the object, check the helper) | "Historians and AI-checkers both go back to the evidence." |
| 6 | S4 | Card: "Make it look Roman." The helper adds togas to everyone, 80% sure. "What did it assume?" A: Everyone wore togas every day. B: Togas are pyjamas. C: Romans wore jeans | A/B/C | **A.** Togas were formal wear for citizens. Most people wore tunics | "Costume-shop Romans versus real Romans. What do you notice?" |
| 7 | S5 | "The helper is 'not sure — 40%' about what children did for fun. Is it good that it said so?" | Thumbs | **Yes**: honesty about uncertainty is good | "A helper that says 'I'm not sure' is helping you know when to check. Where could we find out?" (toys, gaming counters in the collection) |
| 8 | P | "Which of today's helper answers was the most *unfair* to ordinary Romans?" | Hands | Usually the feast or villa answer | "Why might an AI repeat the most famous version of history?" |
| 9 | P | "When we use AI for homework about the past, what should we do?" A: Copy it. B: Check it against a book, museum or object. C: Ignore it forever | A/B/C | **B** | "Use it as a starting guess, not the final answer." |
| 10 | P | "Write a traveller's diary line that a Roman shopkeeper would agree with." | Children dictate to the facilitator | Open | "That's what history with evidence sounds like." |

### 8.6 Facilitator discussion card (all labs, back of pack)
- "What did the helper assume?" "What could it have asked?"
- "Was its % sure fair? Too high? Too low?"
- "What evidence can *we* see that the helper can't?"
- Close with: "AI helpers can be useful. The clearer we are, and the more we check, the better they work."

---

## 9. Deliverable B: derivative-risk style checklist

Score each item **Green** (fine), **Amber** (review), or **Red** (change before release). Run it on every lab, marketing asset, slide and printed item.

**A. Words and names**
- [ ] No "Minecraft", "Mojang", "Creeper", "Steve", "Alex", "Enderman", "Nether", "Overworld", "Redstone", "Minecoins" or "Agent" (as a capitalised character) in product names, lab names, titles, URLs, social handles, hashtags or SEO and ad keywords. *(Red if present.)* Source: Usage Guidelines naming and keyword rules.
- [ ] No "-craft" or "Mine-" coinages in names (e.g. "AICraft", "MineLab"). *(Amber: "confusingly similar to our name".)*
- [ ] No "Minecraft-style", "like Minecraft" or "for Minecraft fans" in marketing. *(Red in ads; Amber in a press interview answer.)*
- [ ] Facilitator scripts refer to "block-building games" generically. Children may mention Minecraft; staff don't brand with it. *(Green.)*

**B. Visual identity**
- [ ] No pixel-art block textures. Flat colour or gentle gradients only. 16×16-style textures are Red.
- [ ] No grass block with the brown-sides, green-top-fringe pattern. No ore-speckle textures, TNT-style blocks, or crafting-table, furnace or chest look-alikes.
- [ ] Character proportions differ from the Steve/Alex box-head-on-box-body silhouette, e.g. rounded heads, tiny bodies, distinct faces. Square pixel faces are Red.
- [ ] No creatures resembling Creeper (green, vertical, four-legged, pixel frown), Enderman (tall, black, purple eyes), zombie, skeleton, pig, chicken-jockey, villager (unibrow and big nose) or bee designs.
- [ ] No items resembling the pickaxe, diamond, sword, bed, torch, emerald or golden apple in their pixel form. Use your own tool shapes.
- [ ] UI has no bottom hotbar of 9 square slots, no heart or hunger bars, no 3×3 crafting grid, no inventory grid in grey-bevel style, and no blocky stone-texture buttons. The rounded app-style UI is Green.
- [ ] Font: no blocky pixel font and nothing resembling the Minecraft logo lettering. *(Red per the publications rule.)*
- [ ] Skybox and lighting: no square sun or moon, no square clouds.
- [ ] Palette: avoid the default green-grass, brown-dirt and grey-stone triad as the dominant scene palette. Use the brand palette.
- [ ] Island framing (floating dioramas) is fine, and ownable as DeltaOps' signature. *(Green.)*

**C. Sound and motion**
- [ ] No sound-alike cues: block-break crunch, hurt "oof", creeper hiss, C418-like piano ambience, villager "hmm".
- [ ] No block-by-block "punch to break" animation with crack overlays.

**D. Mechanics and story**
- [ ] Avoid "survive the first night", "punch a tree" and "craft tools from logs" as core framings. Generic "before sunset" missions are Green, but avoid zombies at dusk.
- [ ] Choices and consequences, the % sure helper and visible world changes are Green: they are generic and DeltaOps' own.

**E. Marketing and distribution**
- [ ] Never place DeltaOps screenshots next to Minecraft screenshots, including "inspired by" comparisons.
- [ ] Before publishing hero images or app or store listings, run a quick self-test. Show the image to five children aged 7–11 and ask "What game is this?" If more than one in five says Minecraft, review it. *(Allumeria shows that automated claims fire on perceived resemblance.)*
- [ ] No endorsement cues: no "approved", "official", or Minecraft Education partner badges unless you hold a written agreement.
- [ ] Merchandise and take-home items carry only DeltaOps characters.
- [ ] If DeltaOps ever writes truthful copy about Minecraft Education (e.g. a "next steps" sheet), use the wordmark as plain text only, no logos, plus the required disclaimer.

**F. Process**
- [ ] Name one owner for brand risk. Log decisions.
- [ ] Get one counsel review of the visual system and names before national launch (UK; add US if selling there).
- [ ] Keep design-provenance files (sketches, palette decisions, dated) as evidence of independent creation in case of a claim.
- [ ] Prepare a takedown-response plan: who files a counter-notice, and a cached press statement.

---

## 10. Deliverable C: partner-route decision memo

**To:** DeltaOps Learning founders
**Re:** Should DeltaOps build a Minecraft Education version of a lab, and how?
**Date:** 4 November 2026

### Options

| Option | What it is | Allowed? | Cost and effort | Fit with the DeltaOps model | Verdict |
|---|---|---|---|---|---|
| **A. Stay independent** | Own engine and brand; no Minecraft use | Yes | None | Full: no accounts, no installs, scripted helper | **Do now** |
| **B. "Bridge" references** | Take-home or teacher sheet lists free next steps, e.g. "Try Hour of AI: The First Night in Minecraft Education", as plain text with the disclaimer | Yes: truthful wordmark use ([partner page](https://education.minecraft.net/en-us/get-started/partners)) | Low | Good: positions DeltaOps as the gateway, Minecraft as homework | **Do now (optional)** |
| **C. Deliver sessions in Minecraft Education** | DeltaOps facilitators run paid sessions using Camps and Clubs licences ($36 per user per year) or a school's own licences | **Charging for instruction is allowed. Selling worlds or materials is not** ([Edu Usage Guidelines](https://education.minecraft.net/content/dam/education-edition/learning-experiences/guidelines/Education%20Usage%20Guidelines%20v1.01.pdf)) | Medium-high: licences, Microsoft accounts per learner, installs, IT (the main adoption barrier) | **Poor**: breaks no-accounts and no-installs; loses the scripted % sure helper and DeltaOps' brand; competes with free AI Foundations | **Don't** |
| **D. Commissioned, free Minecraft Education world with a venue partner** (the Soane model) | A museum or nature-centre partner proposes; a Creator Community studio (e.g. BlockBuilders) builds; donors fund; the world is free in the library; DeltaOps supplies the learning design and facilitation | Possible only through "Propose a Partnership"; Minecraft Education wants "only… partnerships that are educational" | High: 6–18 months **[est]**; the funder pays the build; DeltaOps is paid for design and facilitation, not for the world | Medium: reaches 40,000+ school systems, but the world is free and Minecraft-branded, and DeltaOps' IP sits inside someone else's platform | **Revisit in 12–24 months**, only with a venue partner who wants it |
| **E. Direct partnership proposal from DeltaOps** | DeltaOps pitches its own AI lab format to Minecraft Education | Allowed to propose | High, uncertain | Low: AI Foundations, Hour of AI and Reed Smart already cover the space; little reason for them to accept | **Don't now** |

### Analysis
1. **Minecraft Education already owns "AI literacy in Minecraft".** It has six AI activities, a 14-lesson curriculum and Code.org distribution. A DeltaOps world would be one more entry in a crowded, free library.
2. **DeltaOps' differentiators would not survive the port:**
   - **Visible "% sure" confidence.** The First Night has none.
   - **Scripted, safeguarded responses with no accounts.**
   - **Staff-led discussion cards.**
   - **Venue-specific stories.**
3. **The business model does not transfer.** Minecraft Education content must be free ("Selling content and learning materials (we're not cool with this)"). DeltaOps could only earn from instruction or commissioned design.
4. **The upside is specific.** If a museum client (e.g. one with Roman collections) wants a Soane-style world, DeltaOps could be its *learning-design partner* for a commissioned, donor-funded build. That brings credibility and reach without betting the company.

### Recommendation
- **Now:** Options A and B. Run the derivative-risk checklist. Market against Minecraft Education's barriers: "no installs, no accounts, staff-led, live in 10 minutes."
- **Watch:** the Minecraft Education roadmap (AI Foundations updates, Hour of AI 2026), and any venue client asking for a Minecraft deliverable.
- **Trigger for Option D**, all of the following:
  - a named venue partner with funding
  - a willingness to propose to Minecraft Education
  - a scope where DeltaOps is paid for learning design and facilitator training
  - counsel review of the partnership terms on IP ownership of the learning design
- **Never:** sell a Minecraft Education world or materials; use Minecraft logos or characters; call any product "Minecraft".

---

## 11. Recommendations

1. **Make "% sure" the hero mechanic in all marketing.** Minecraft's flagship AI tutorial does not show confidence (First Night deck and solutions guide). That is DeltaOps' clearest differentiator.
2. **Adopt the "Sure or Not Sure?" pack** (section 8): warm-up identity sort, between-stage "ASSUMPTION!" call-and-response, and the Sure-o-meter plenary. It draws on the Kahoot, personality-quiz and movie call-and-response formats, with no IP.
3. **Borrow the First Night's onboarding:**
   - a 10–15 minute whole-group demo of Stage 1
   - starter choices that need "just a small change"
   - a hint button
   - read-aloud text
   - one trailer to set the stakes
   - a printable certificate and badge
4. **Follow Mojang's fairness principle** ("bad things happen, but they're technically the player's fault"). Every bad outcome must trace visibly to the chosen card.
5. **Train facilitators in creator style** (Stampy, DanTDM, Aphmau; Dezuanni): narrate the helper's "thinking", react big to failures, use recurring characters and rituals, and give children the expert role.
6. **Run the derivative-risk checklist and the five-child "What game is this?" test** on all public imagery before launch. The Allumeria takedown shows automated claims fire on resemblance.
7. **Never use "Minecraft" in names, ads, keywords or URLs.** The naming and keyword rules and UK s.10(3) reputation-mark risk both point the same way.
8. **Claim engagement, not learning gains.** Even the RCT on Minecraft Education found no overall effect, and no published evaluation of AI Foundations or Hour of AI exists. Build DeltaOps' own pre/post "spot the assumption" measure into pilots.
9. **Pitch nature and museum venues with the Villager Rescue format:** groups of 25 or fewer, a mission, about 55 minutes, a take-home. A wildlife reserve already hosts that format (Singapore).
10. **Position the Londinium lab against Soane's free Ancient Rome world** as the facilitated, evidence-and-collection version. Offer museums an Option D partnership only when funded (section 10).

---

## 12. Sources

**Primary (Mojang, Microsoft and partners)**
- Mojang Minecraft Usage Guidelines: https://www.minecraft.net/en-us/usage-guidelines
- Minecraft Education Usage Guidelines v1.01 (PDF): https://education.minecraft.net/content/dam/education-edition/learning-experiences/guidelines/Education%20Usage%20Guidelines%20v1.01.pdf
- Minecraft Education partner page: https://education.minecraft.net/en-us/get-started/partners
- Camps and Clubs: https://education.minecraft.net/en-us/get-started/camps-and-clubs
- Licensing: https://education.minecraft.net/en-us/licensing
- MCEDU two-pager 2025: https://education.minecraft.net/content/dam/education-edition/learning-experiences/MCEDU%202pager%202025.pdf
- Hour of AI page: https://education.minecraft.net/en-us/resources/hour-of-ai-the-first-night
- First Night blog: https://education.minecraft.net/en-us/blog/hour-of-ai-the-first-night
- First Night facilitator deck: https://education.minecraft.net/content/dam/education-edition/learning-experiences/hofai-the-first-night/HOAI25_Facilitator%20Presentation%20Final%20ENG%20v2.pdf
- First Night solutions guide: https://education.minecraft.net/content/dam/education-edition/learning-experiences/hofai-the-first-night/HOAI25_Solutions%20Guide%20FINAL%20ENG.pdf
- AI Foundations curriculum overview: https://education.minecraft.net/content/dam/education-edition/learning-experiences/ai-solution/AI%20Foundations%20Curriculum%20Overview%202025l.pdf
- AI Foundations blog: https://education.minecraft.net/en-us/blog/ai-foundations
- Hour of Code: Generation AI: https://education.minecraft.net/es-es/blog/hour-code-2023
- Teaching AI literacy (Lesson Crafter): https://education.minecraft.net/en-us/blog/teaching-ai-literacy-with-minecraft
- Assessment guide: https://education.minecraft.net/lessons/assessment-in-minecraft-education-edition-a-guide-for-teachers
- Build Challenges (MS Learn): https://learn.microsoft.com/en-us/training/modules/build-challenges-minecraft-esports
- Furniture challenge (MS Learn): https://learn.microsoft.com/training/modules/minecraft-place-first-blocks/teach-build-furniture
- Windows blog 2017 (2M users): https://blogs.windows.com/windowsexperience/2017/11/14/minecraft-education-edition-reaches-milestone-two-million-users-releases-new-hour-code-tutorial/
- Soane press release: https://www.soane.org/sites/default/files/2026-01/Soane%27s%20Portals%20to%20the%20Past%20Press%20Release%20FINAL.pdf
- Kahoot × Minecraft (2021): https://kahoot.com/press/2021/11/09/kahoot-minecraft-hour-of-code/
- NASA × Minecraft: https://www.nasa.gov/feature/take-the-next-giant-leap-with-nasa-and-minecraft
- MoPOP exhibition: https://www.mopop.org/exhibitions/minecraft-the-exhibition
- Minecraft Experience FAQ: https://www.minecraftexperience.com/faq/ ; https://www.minecraftexperience.com/singapore/faq/
- ROM: https://www.rom.on.ca/en/learning/rom-minecraft
- Museum of Science × Roblox: https://www.mos.org/press-release/museum-science-roblox-partner-new-digital-experience-transforming-students-mars
- Roblox newsroom: https://about.roblox.com/newsroom/2023/08/where-learning-happens

**Research**
- Slattery et al. 2025: https://bera-journals.onlinelibrary.wiley.com/doi/10.1002/rev3.70035
- Spatial thinking RCT: https://www.sciencedirect.com/science/article/pii/S0959475224001300
- Strathclyde review: https://strathprints.strath.ac.uk/78811
- Irish primary study: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10170428/
- Thai coding and creativity study: https://files.eric.ed.gov/fulltext/EJ1480446.pdf
- Energy-concepts quasi-experiment: https://forodeeducacion.com/ojs/index.php/fde/article/view/769
- QUT report: https://research.qut.edu.au/dmrc/wp-content/uploads/sites/5/2019/10/MEE-Research.pdf
- Ateneo/ICCE barriers: https://library.apsce.net/index.php/ICCE/article/view/4805
- Irish teachers' barriers: https://informahealthcare.com/doi/full/10.1080/03323315.2023.2185276
- University of Melbourne: https://pursuit.unimelb.edu.au/articles/what-are-kids-getting-out-of-playing-minecraft
- Dezuanni, *Peer Pedagogies*: https://mitpress.mit.edu/9780262539722/peer-pedagogies-on-digital-platforms/ ; https://clalliance.org/blog/minecraft-lets-players-and-peer-pedagogies/
- Tweens and YouTubers: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6928007/
- Ofcom 2025: https://www.ofcom.org.uk/media-use-and-attitudes/media-habits-children/children-and-parents-media-use-and-attitudes-report-2025

**Press and secondary**
- Allumeria DMCA: https://www.pcgamer.com/games/survival-crafting/i-genuinely-do-not-know-what-to-do-says-developer-of-minecraft-like-allumeria-after-microsoft-issues-a-dmca-takedown-forcing-it-off-steam/ ; https://www.gamespot.com/articles/microsoft-withdraws-copyright-claim-against-indie-dev-over-minecraft-allegations/1100-6538103/
- Minecraft (Wikipedia; clones, VR mod): https://en.wikipedia.org/wiki/Minecraft
- Scrolls dispute: https://en.wikipedia.org/wiki/Scrolls_(video_game)
- Fairness principle: https://www.gamesradar.com/games/open-world/minecraft-devs-want-to-avoid-treating-players-in-a-way-that-feels-unfair-so-mojangs-guiding-principle-is-that-bad-things-happen-but-theyre-technically-the-players-fault/
- Stewardship interview: https://gamerant.com/minecraft-interview-chaos-cubed/
- *Minecraft Game Design* book: https://minecraft.wiki/w/Minecraft_Game_Design
- Agnes Larsson: https://minecraft.wiki/w/Agnes_Larsson
- Movie box office: https://www.the-numbers.com/movie/Minecraft-(2025)
- Sensor Tower via GamesBeat: https://gamesbeat.com/minecraft-sales-grew-35-on-both-mobile-and-console-after-release-of-film-sensor-tower/
- Chicken jockey: https://www.ctvnews.ca/entertainment/article/a-minecraft-movie-has-made-chicken-jockey-a-viral-thing/
- Legends end: https://www.videogameschronicle.com/news/minecraft-legends-development-is-ending-9-months-after-its-release
- Story Mode: https://www.cultofmac.com/328326/minecraft-story-mode-stars-two-goonies-and-a-pee-wee/
- Exhibition tour: https://lsc.org/media-information/13122-minecraft ; https://www.spokesman.com/stories/2023/sep/13/minecraft-the-exihibition-is-ending-its-national-t/ ; https://www.edsurge.com/news/2019-10-23-world-premiere-exhibit-explains-minecraft-to-the-most-challenging-audience-parents
- Villager Rescue: https://minecraft.wiki/w/Minecraft_Experience:_Villager_Rescue ; https://feverup.com/m/533761
- LEGO Minecraft: https://en.wikipedia.org/wiki/Lego_Minecraft ; https://brickset.com/sets/theme-Minecraft/subtheme-A-Minecraft-Movie
- Creators: https://en.wikipedia.org/wiki/Stampy ; https://en.wikipedia.org/wiki/DanTDM ; https://en.wikipedia.org/wiki/Aphmau ; https://funtech.co.uk/latest/best-kid-friendly-minecraft-youtubers ; https://screenwiseapp.com/guides/youtube-gaming-content-and-let-s-play-videos
- Quiz examples: https://beano.com/?p=160280 ; https://www.sporcle.com/games/subcategory/minecraft ; https://create.kahoot.it/details/the-minecraft-general-knowledge-quiz/eab4ca4e-e3a7-4672-8cfc-62bd0b93f661 ; https://sites.libsyn.com/529502/quick-quiz-minecraft
- BBC Earth Frozen Planet II: https://www.windowscentral.com/gaming/minecraft/minecraft-education-edition-gaining-five-new-worlds-inspired-by-frozen-planet-ii
- World studios: https://www.minecraftpal.com/news/90/nasa-the-bbc-and-unesco-all-hired-the-same-minecraft-studio
- Player counts **[est]**: https://minecraft.how/blog/post/minecraft-2025-year-in-review-204-million-players ; https://www.demandsage.com/minecraft-statistics/

**Case law cited from background knowledge [bg; not retrieved this session]:** *Nova Productions v Mazooma Games* [2007] EWCA Civ 219; *Designers Guild v Russell Williams* [2000] UKHL 58; *SAS Institute v WPL* C-406/10; *Reckitt & Colman v Borden* [1990] 1 WLR 491; *Irvine v Talksport* [2002] EWHC 367 (Ch); *Fenty v Arcadia* [2015] EWCA Civ 3; *L'Oréal v Bellure* C-487/07; *Interflora v M&S* C-323/09; *Wal-Mart v Samara* 529 U.S. 205 (2000); *Tetris Holding v Xio Interactive* 863 F. Supp. 2d 394 (D.N.J. 2012); UWG §4 No. 3; UCPD Annex I point 13; DMCC Act 2024.
