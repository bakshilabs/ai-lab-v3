# 03: Narrative, Structure, Choice and Consequence for DeltaOps AI Labs

*Research report for DeltaOps Learning. Third pass, 4 November 2026. Builds on round 2 (`research/round-2/03-narrative-choice.md`).*

**Method.** The main source was the Exa connector: `web_search_exa`, `web_fetch_exa` and two `agent_run` jobs (one at "high" effort on Roman Londinium, one at "medium" on GDC talk records). WebSearch was not needed. Where I quote a GDC talk, I read the talk's own transcript (YouTube's auto-transcript fetched through Exa, or a transcript page). Auto-transcripts mangle words, so I have quoted only phrases that are clear in context. Claims that come from the Exa agent's summary and that I did not re-read myself are marked **(agent)**.

**Labels.**
- **[P]**: primary, meaning the developer's own words (talk transcript, slides, postmortem), a museum or heritage body, or a peer-reviewed paper.
- **[S]**: reputable secondary, such as journalism or a write-up of a talk.
- **(inference)**: my own analysis.

---

## 0. Changes from round 2

### 0.1 Paywalled GDC talks: now checked against the talks themselves

| Talk | Round 2 source | Round 3 source | What changed |
|---|---|---|---|
| Reigns, "The Casual (but Regal) Swipe", François Alliot, GDC 2017 | Game Developer deep dive plus a Vault listing | Full transcript [P] https://gameindustrylibrary.com/documents/the-casual-but-regal-swipe-creating-game-mechanics-in-reigns; official video https://www.youtube.com/watch?v=tDdtbh-oUTU | **New finding:** Nerial took the numbers off the meters because playtesters "stopped reading the text" and just optimised. They also moved the meters to the top of the screen so the swiping thumb would not hide them. Both points bear directly on the labs' "% sure" display and meter layout (section 2.1). |
| Into the Breach Design Postmortem, Matthew Davis (with Justin Ma), GDC 2019 | IGF interview; the Vault ID was unconfirmed | Talk transcript [P] https://www.youtube.com/watch?v=s_I07Iq_2XM | The talk confirms that telegraphed information is "always going to be accurate." It also shows a preference for low numbers and "no percentages." **New:** the "checkmate" problem, a turn that "might as well be an I lose button," and the small grid-defence chance added to fix it. |
| Keep Talking and Nobody Explodes, Ben Kane, GDC 2016, "Designing Asymmetric Gameplay" | Game Developer write-up | Same write-up, re-read in full [S, long direct quotes] https://www.gamedeveloper.com/design/finding-the-fun-in-bomb-defusal-with-i-keep-talking-and-nobody-explodes-i-; Vault https://gdcvault.com/play/1023113/Designing-Asymmetric-Gameplay-For-Keep; video https://www.youtube.com/watch?v=5_sbvdwMqQk | Quotes confirmed. **New:** children loved being able to "boss their parents around." The team removed every capital O from serial numbers because it looked like a zero. The team also stripped out "any serious bomb references" so the game stayed light-hearted. |
| Outer Wilds | Game Developer write-up of the Beachum and Verneau talk | Kelsey Beachum, "Sparking Curiosity-Driven Exploration Through Narrative in Outer Wilds" (GDC; slides are filed under GDC 2021) [P] https://www.youtube.com/watch?v=QaGu9tGCNbI; slides https://ubm-twvideo01.s3.amazonaws.com/o1/vault/GDC+2021/beachum_gdc_2021(1).pdf **(agent)** | The talk gives the **push versus pull** rule ("I can't push that information onto the player"). Text the player has not read yet is shown in a different colour. A gentle, optional nudge is offered to players who say they are nervous. The GDC 2020 Beachum and Verneau session is listed (https://schedule.gdconf.com/session/curiosity-driven-exploration-the-design-of-outer-wilds/869016) **(agent)**, but no public recording was found, so the round-2 quotes from it stay [S]. |
| Jackbox | builtin.com's "Jack Principles"; Vault ID 1027064 was unconfirmed | Evan Jacover, "The Jackbox Party Pack Unboxed" (GDC 2021) transcript [P] https://gameindustrylibrary.com/documents/the-jackbox-party-pack-unboxed-how-and-why-we-make-a-pack-of-5-games-every-year; Vault https://gdcvault.com/play/1027202/The-Jackbox-Party-Pack-Unboxed | **Corrected Vault link.** The talk confirms the origin story: players joined by going to a website on their phones, with "no apps to install, no controllers." Prototypes on paper or index cards are required before a pitch is approved. The "Jack Principles" remain [S]. |
| Heaven's Vault, Jon Ingold, GDC 2019 | Vault ID 1025149 (wrong) | Correct Vault page https://gdcvault.com/play/1025392/-Heaven-s-Vault-Creating plus transcript [P] https://www.youtube.com/watch?v=o02uJ-ktCuk | The automated-testing claim is now verified. **New caution:** Ingold says "randomized play is just the worst simulation of human behavior I've ever seen." Section 9 therefore recommends exhaustive enumeration of all 729 routes, not random bots. |

### 0.2 Londinium arc: museum-checked, seven fixes

Every historical claim in 10.4 was checked against MOLA, London Museum (formerly the Museum of London), the British Museum, Historic England, the City of London, Roman Inscriptions of Britain or academic sources (section 10.4.1). The fixes:

1. **"Vigiles (fire-watch)" removed.** There is no London evidence for them.
2. **"Roman towns had no street names or numbers" corrected.** Streets could have names. There is no evidence of house numbers.
3. **The "governor's palace" is now a "possible governor's palace."** The identification is contested.
4. **"Money-changer" at the quay removed** (unsupported). Coins and lending are well attested, so the card now uses denarii without a money-changer.
5. **The amphitheatre is no longer a "child-appropriate show."** The City of London lists its uses as gladiatorial fights, animal hunts and executions. It now appears only as a facilitator teaching moment.
6. **The guide's name changes from "Sulis" to "Mogontius."** Sulis is the goddess of Bath. Mogontius is a Celtic name on a London writing tablet addressed "Londinio Mogontio."
7. **The setting is fixed at about AD 120**, with notes on what was standing then (the forum was still being built or extended; the Hadrianic fire came in 120–130).

The **brochure's own example** (peacock, dormice and oysters) is now annotated. Oysters are well evidenced. Peacock and dormouse meals have no London evidence, which makes "Who in Londinium ate like this? And who didn't?" an even better question than the brochure intends.

### 0.3 The other three arcs are now fact-checked too

- **Pond:** checked against Freshwater Habitats Trust and Natural History Museum guidance. Two vague-card outcomes turn out to be real pond mistakes: leaf fall from overhanging trees, and turf in the water adding nutrients.
- **Rover:** checked against NASA and JPL.
  - **Correction:** the one-way signal delay is 3–22 minutes, not 4–24.
  - The boulder-field wheel damage is real: Curiosity in 2013.
  - Rover selfies really are used to check wheel wear.
  - The dust storm is real: Opportunity in 2018.
- **Lighthouse:** checked against BMC and UKHillwalking guidance on navigating with handrails, RNLI tide advice and Trinity House.
  - **Fix:** there is no "lighthouse keeper." The last Trinity House keepers left in 1998.

### 0.4 Other corrections

- **Mr. Resetti.** It was Satoru Iwata, not Aya Kyogoku, who said "younger female players, in particular, are scared… some of them have even cried." Kyogoku said he "divides people." Round 2's "later replaced by autosave" is dropped because it had no source. https://iwataasks.nintendo.com/interviews/3ds/animalcrossing-newleaf/0/1/
- **The Sisk et al. 2018 meta-analysis** now has a DOI (section 3).

### 0.5 Extensions

- New section 2.1a, **"Numbers or words?"**: the evidence for how to show "% sure."
- **Children's-media guideline sources** for the voice guide (section 8): Sesame Workshop's tablet guide, BBC GEL and an EDC study of PBS KIDS games.
- A **14th consequence type**: the recoverable state.
- **Spreadsheet authoring columns** taken from Reigns.
- A **"route-transcript" read-through** step in testing.

### 0.6 No unverified tags carried over

Round 2 for this topic had no `[TK]` or `[est.]` tags. Its "verify by listing only" GDC items are resolved as set out in 0.1. What is still open is listed at the end of this report.

---

## 1. Narrative in builders and world-games

*Kept from round 2. Sources were re-used, not re-fetched, except where noted.*

### 1.1 Space as story

- **Jenkins.** Designers are "narrative architects." His four modes of environmental storytelling are evoked, enacted, embedded and emergent. [P] https://web.mit.edu/~21fms/People/henry3/games&narrative.html
- **Smith and Worch, "What Happened Here?" (GDC 2010).** Deliberately placed props let players reconstruct events for themselves. [P] https://www.witchboy.net/?p=621
- **Reigns adds a related idea.** Alliot calls it "evocative writing": he showed a still-life painting and asked "what's this glass broken… what does the key open?" He wrote cards that hint at a kingdom you never see, because players "naturally started to create links between cards that I didn't in any way link together." [P] https://gameindustrylibrary.com/documents/the-casual-but-regal-swipe-creating-game-mechanics-in-reigns
- **Lab implication (inference).**
  - Every stage leaves physical residue on the island. By stage 6, the island should tell the group's story without text.
  - One or two "evocative" props per island, with no explanation attached, invite children to make up stories. Examples: a half-buried amphora sherd, a rover track that stops.

### 1.2 The place as protagonist

- **Terra Nil.** The landscape is the "main character," and the designers wanted players to feel "hopeful," not drift into "apathy or resignation." [S] https://gamerant.com/terra-nil-interview-free-lives-devolver-digital-nature-beauty-audience-engagement/ and https://Techraptor.net/gaming/features/terra-nil-paints-hopeful-picture-for-future
- **Townscaper.** "When you can win, you play to win. When you keep score, you play to the score." [S] https://pcgamer.com/townscapers-developer-on-how-its-radically-casual-design-is-inspiring-a-new-wave-of-low-stress-builders-to-adapt-the-blueprint
- **Toca Boca.** "Toys, not games." [S] https://www.pocketgamer.com/articles/052067/r/ and https://gamesbeat.com/how-toca-boca-got-100m-mobile-downloads-by-putting-kids-first/
- **Dorfromantik.** Minimalism and readability. [S] https://80.lv/articles/how-dorfromantik-expands-its-cozy-world-through-minimalist-design
- **Tension (inference).** Stars, XP and leaderboards push the labs toward "playing to the score." Reigns found the same thing (section 2.1).

### 1.3 Wordless and low-text narrative

- **Journey.** The design aimed at an "emotional arc," with the story told through play. [P] https://gdcvault.com/play/1017700/Designing ; [S] https://gamesbeat.com/kellee-santiago-describes-the-making-of-thatgamecompanys-journey/
- **Gris.** Each section has its own colour palette tied to an emotional stage. [S] https://blogs.plitch.com/en/blog/interview-with-nomada-studio
- **Lab implication (inference).** Light carries the arc, from morning at stage 1 to golden light at stage 6. This helps younger readers and EAL readers.

### 1.4 Cultural storytelling with a community

- **Never Alone** was made with Iñupiat elders and unlocks "cultural insight" videos of community members. [S] https://en.wikipedia.org/wiki/Never_Alone_(video_game) One contributor: "we aren't a museum piece." [S, academic] https://journals.kent.ac.uk/index.php/transmotion/article/download/245/1014?inline=1
- **Lab implication (inference).** Londinium "insight" cards should use real, citable finds. Section 10.4.2 lists them, each with a museum or MOLA URL.

### 1.5 Characters inside builders

- **SimCity 2000's advisors** were disliked because they only "pop up to give brief advice and complain." [S] https://simcity.fandom.com
- **Isabelle** works because she has a job to do. [S] https://nookipedia.com/wiki/Shizue
- **Mr. Resetti (corrected).**
  - Kyogoku: "We really weren't sure about Mr. Resetti, as he really divides people… others… don't like being shouted at in his rough accent."
  - Iwata: "younger female players, in particular, are scared. I've heard that some of them have even cried."
  - In New Leaf, Resetti appears only if the player builds the optional "Reset Surveillance Center" public-works project.
  - [P] https://iwataasks.nintendo.com/interviews/3ds/animalcrossing-newleaf/0/1/
  - A European Wii manual warned parents that his tone "may be disturbing to young children." [S] https://nookipedia.com/wiki/Mr._Resetti
- **Frostpunk's Book of Laws** tells the story through policy. [S] https://www.pcgamer.com/frostpunk-developers-on-hope-misery-and-the-ultimately-terrifying-book-of-laws

---

## 2. Choice architecture with few options

### 2.1 Reigns, from the talk itself

All points are [P] from the transcript: https://gameindustrylibrary.com/documents/the-casual-but-regal-swipe-creating-game-mechanics-in-reigns

- **Meters moved to the top.** In the first sketch the four meters sat at the bottom. Alliot calls checking this a "dumb test you have to do very early": on a phone "the thumb is on the bottom of the screen, so you never see the impact of the swipe."
- **Numbers removed late in development.** Playtesters preferred having them because it was "easier for them to optimize." But "very quickly the players stopped reading the text and they were just optimizing… that's not what we wanted… to have the focus on the text."
- **Probabilistic-driven narrative.**
  - The engine checks the kingdom's state.
  - It selects all the cards whose conditions fit that state.
  - It puts them in a "bag" in which each card has a weight, or "volume."
  - It draws one at random.
  - Themed arcs (the spice trade) use "fewer but bigger" cards.
  - Narrow states give "even linear narrative, like one card after the other."
  - Dungeons use sub-bags.
- **Why it feels authored.** "As players never know if a card is the direct consequence of their choice or a more random selection by the engine, everything becomes meaningful."
- **Spreadsheet columns, one card per row:** question, bearer (the advisor), **lock term** (how many turns before the card can be played again), weight, conditions, and the effects of "yes" and "no" on the four meters and on other kingdom state.
- **Scale and voice.** There were roughly 700–770 cards (the transcript says both). The tone settled "only after the first two hundred cards."
- **Game Developer's deep dive** describes the same bag system. [P] https://gamedeveloper.com/design/game-design-deep-dive-creating-an-adaptive-narrative-in-i-reigns-i-

**Lab implications (inference).**
- Place the meter-change animation where the tapping hand will not cover it, on or above the island. The current layout puts choices and meters at the bottom (context.md), so the hand covers the meters at the exact moment they change.
- Write one stage's helper lines and test their voice before writing the rest. Expect the voice to settle late.
- Author the content in a spreadsheet with Reigns-style columns (section 9).

### 2.1a Numbers or words? How to show "% sure"

- **Reigns:** visible numbers made players optimise and stop reading (above).
- **Into the Breach:** the team likes "very low numbers… you don't have percentages, you have just this really visceral bubble system that you can just glance at and see." [P] https://www.youtube.com/watch?v=s_I07Iq_2XM
- **Rounds 1–2 (02, 09) and context.md:** children tend to read a high confidence figure as "correct," and a precise percentage can suggest a live model.

**Recommendation (inference from the above).**
- By default, show confidence as a **three-step word and bar**: "Not sure", "Fairly sure", "Very sure".
- Add the number only on an optional "detail" toggle for ages 10 and up.
- This keeps the telegraph (section 3) but removes false precision. It also stops children optimising for the number instead of reading the guess.
- Test both versions (section 9, balance).

### 2.2 Other small-choice systems

*Kept from round 2.*

- **Lifeline:** two choices, timed by its writer. [S] https://www.gameanalytics.com/blog/lifeline-3-minute-games-interview
- **Night in the Woods:** two lines, Twitter-length, and "people, not types." [S] https://www.engadget.com/2014/06/17/night-in-the-woods-snappy-dialogue-inspired-by-twitter/
- **Slay the Spire:** pick-rate balancing (GDC 2019). [S] https://www.gamedeveloper.com/design/how-i-slay-the-spire-i-s-devs-use-data-to-balance-their-roguelike-deck-builder
- **Inscryption:** worry about card legibility. [S] https://www.gamedeveloper.com/design/how-game-jam-sacrifices-became-inscryption

### 2.3 Keeping branching under control

- **Branch-and-bottleneck.** [P] https://www.ifwiki.org/Standard_Patterns_in_Choice-Based_Games ; small-scale structures [P] https://emshort.blog/2016/11/05/small-scale-structures-in-cyoa/
- **Quality-based and salience-based narrative; storylets.** [P] https://emshort.blog/2016/04/12/beyond-branching-quality-based-and-salience-based-narrative-structures/ and https://emshort.blog/2019/01/06/kreminski-on-storylets/
  - Reigns' bag is a weighted storylet system in practice (section 2.1).
- **Resource narrative:** resources should follow "the grain of the story." [P] https://weatherfactory.biz/?p=6991
- **80 Days:** content is "randomly authored" and "branchified." [P] https://www.gamedeveloper.com/design/threats-luggage-and-mild-peril-designing-i-80-days-i-
- **Heaven's Vault (new, from the talk).** [P] https://www.youtube.com/watch?v=o02uJ-ktCuk
  - There are "no prescribed path, few bottlenecks and no fail state."
  - A precondition-based "big content bucket" lets writers add lines ("if you've got a crystal knife there's a joke") without "breaking the unlock curve."
- **Sorcery!:** rewind exists because "gamebooks are… basically unfair." [S] https://www.pocketgamer.biz/the-making-of-sorcery/
- **Slay the Princess:** replayed loops remember what happened before. [P] https://gamedeveloper.com/design/deep-dive-player-centered-narrative-design-in-slay-the-princess

### 2.4 Telegraphing, illusion and acknowledgement

- **Telltale's "X will remember that."** [S] https://criticsatlarge.ca/2014/10/illusory-choice-memory-and-consequence.html and https://gameinformer.com/b/features/archive/2015/02/03/why-your-choices-dont-matter-in-telltale-games
  - Rule (inference): announce only memories you will cash in.
- **Obra Dinn:** guesses are confirmed in batches of three. [S] https://unwinnable.com/2018/12/05/obra-dinn/
- **Heaven's Vault:** mistranslations are accepted and followed up later in the story. [S] https://gamedeveloper.com/design/how-inkle-developed-its-own-ancient-language-for-i-heaven-s-vault-i- This is the closest commercial analogue to "guess + sure" (inference).
- **Her Story:** "If you can Google, you can play Her Story." [S] https://www.mcvuk.com/crime-pays-the-making-of-her-story/

### 2.5 Narrator and voice models for the helper

- **Disco Elysium:** skills speak as inner voices. [S] https://www.gamebanshee.com/k48wh
- **The Stanley Parable:** the narrator reacts when the player disobeys. [S] https://en.wikipedia.org/wiki/The_Stanley_Parable
- **Portal:** players like hearing GLaDOS, but not while they are solving a puzzle. [P] https://theportalwiki.com/wiki/Portal_developer_commentary
- **Hades:** situational line pools, "to take the pain out of dying." [S] https://gamedeveloper.com/design/how-supergiant-weaves-narrative-rewards-into-i-hades-i-cycle-of-perpetual-death Content becomes hard to manage without a map of connections. [S] https://gamespot.com/articles/hades-writer-explains-script-philosophy-after-player-discovers-incredible-detail/1100-6482650/
- **Jackbox's "Jack Principles":** one task at a time, and "create the illusion of awareness." [S] https://builtin.com/articles/jackbox-games-design-party-pack
- **Outer Wilds, push versus pull (new).** [P] https://www.youtube.com/watch?v=QaGu9tGCNbI
  - Beachum's analogy: a neighbour telling you about their day while your arms are full of melting ice cream. Information you have not asked for doesn't stick.
  - Forced information (cut-scenes) is limited to the start and the end.
  - Key information can always be revisited.
  - Unread Nomai text is shown in a different colour.
  - When a player tells Hornfels they are nervous or unsure where to go, the game points them somewhere "gentle and kind," and does so "only if they indicate that's what they want."
  - **Lab implications (inference):**
    - The helper's "why" lines and the facilitator's "secret" facts should be pulled: shown on tap, or offered at the moment a child asks. They should not be pushed while the children are still watching the world change.
    - Add an optional "I'm not sure what to do" button that gives a gentle hint, never the answer.

---

## 3. Feedback, failure and safe consequence

- **Into the Breach (from the talk).** [P] https://www.youtube.com/watch?v=s_I07Iq_2XM
  - **Reliable telegraphs.** "All enemy attacks are shown… there's no miss chance and there's no hit chance, so those telegraphed attacks are reliable, the information is always going to be accurate," which keeps the player's turn "completely deterministic."
  - **Interesting choices.** Davis's test: "have we actually made an interesting choice… or am I just doing busy work?"
  - **Checkmate.** When the enemy threatens more buildings than you can save, a forced end-turn "might as well be an I lose button," which is "a really unsatisfying way to lose." The team added a small random "grid defence" chance so there is always hope. Davis calls it a necessary "gross ugly pillar" and says that in hindsight he would make it "almost hidden."
  - **Lab implications (inference).**
    - The helper's guess must be an honest telegraph. If it says "I think you mean shade," the world must then do exactly that. The uncertainty is about what the words mean, never about dice.
    - No route may reach a state where every card at the next stage is bad. Each stage has a "recoverable" outcome (consequence type 14).
- **Celeste:** cheap respawns, and Assist Mode. [S] https://www.vice.com/en/article/d3w887/celeste-difficulty-assist-mode
- **Outer Wilds:** "Curiosity is Outer Wilds' sole driving force". Knowledge is the reward. A death in the sand cave teaches you "that the cave fills up with sand," which counts as progress. [P] https://www.youtube.com/watch?v=QaGu9tGCNbI ; earlier quotes [S] https://www.gamedeveloper.com/design/live-die-repeat-how-i-outer-wilds-i-piques-curiosity-in-an-ambivalent-solar-system
- **Keep Talking and Nobody Explodes.** [S, direct quotes] https://www.gamedeveloper.com/design/finding-the-fun-in-bomb-defusal-with-i-keep-talking-and-nobody-explodes-i-
  - "The rules have to be totally unambiguous… If players are forced to guess… they're either going to be wrong and feel cheated, or be right and feel unsatisfied."
  - "We require simple and deliberate inputs… The decision-making is the hard part." This keeps the conversation on team thinking rather than "blaming a player for their execution."
  - A hidden pacing "score" adds disruptions when a team is doing well: "We don't want to accelerate a death spiral."
  - Ambiguities were found only by watching. The font made a capital O look like a zero, so every O was removed from serial numbers. "Cut the second wire" had no direction, and "none of these groups ever told us this was a problem."
  - **Lab implications (inference).**
    - Check every non-vague card for O/0, I/l/1-style confusions, and for words that point in no direction ("second", "left").
    - Use a font with distinct glyphs.
- **Partial success, Powered by the Apocalypse style.** [S] https://drolleries.substack.com/p/the-gm-burden-of-adjudicating-partial
- **Citizen Sleeper's clocks.** [S] https://www.rascal.news/tracing-citizen-sleepers-circuitous-vector-from-tabletop-to-hit-video-game/
- **Children's-media feedback.**
  - A review of preschool edutainment games found mostly right/wrong verification and little explanation of why. [P] https://reacheveryreader.gse.harvard.edu/review-of-feedback-in-edutainment-games-for-preschoolers-in-the-usa
  - *Feed the Fidgits* gave graded hints. [S] https://colinegge.netlify.app/projects/feedthefidgets/
  - **New: Sesame Workshop's tablet guidelines** (written for preschoolers, so adapt them for ages 7–13). They treat a wrong answer as a "learning moment," with three scaffolded levels:
    1. Name the wrong choice and encourage.
    2. Restate the objective and give a hint.
    3. Highlight the answer.
  - The same guidelines say payoffs "should reflect the curricular concept and user choice," and that specific instructions go "at the end of the sentence." [P] https://joanganzcooneycenter.org/wp-content/uploads/2020/02/SesameWorkshop-2012.pdf
- **Praise.**
  - Mueller and Dweck (1998). [P summary] https://parentingscience.com/praise-and-intelligence/
  - Sisk et al. (2018) found small average effects for growth-mindset interventions. [P] https://doi.org/10.1177/0956797617739704
  - The practical rule (specific process feedback, no "you're smart") stands either way.

---

## 4. Session and progression structure

*Kept from round 2.*

- **Kishōtenketsu in Mario level design.** [S] https://www.engadget.com/2015/03/17/super-mario-3d-world-design/
- **Portal's weekly playtests.** [P/S] https://theportalwiki.com/wiki/Portal_developer_commentary
- **A Short Hike.** [S] https://www.gamedeveloper.com/disciplines/road-to-the-igf-adam-robinson-yu-s-i-a-short-hike-i-
- **Rule of three and cumulative tales.** [S] https://en.wikipedia.org/wiki/Rule_of_three_(writing) and https://en.wikipedia.org/wiki/Cumulative_tale
- **Into the Breach's short sessions:** "a good punchy 20 minutes," and battles of only four or five turns, which the team discovered rather than planned. [P] https://www.youtube.com/watch?v=s_I07Iq_2XM This supports six short stages in 30–60 minutes (inference).
- **Reigns' pacing:** "tak tak tak and boom," and "hundreds of cards in… twenty minutes." [P] transcript above. The labs are far slower, so put the rhythm in the helper's lines, not in the session pace (inference).
- **PBS KIDS (EDC study):** settings where adults engage with the game content "are more likely to support prolonged focus… and… result in children understanding the learning goals." Games should also have "goals and logical end-points." [P] https://cct.edc.org/sites/cct.edc.org/files/publications/Gaming%20Body%20Feb%2013_0.pdf

---

## 5. A taxonomy of consequence types (updated)

| # | Type | What it is | Game examples | Use in DeltaOps labs |
|---|---|---|---|---|
| 1 | Immediate visible | The world changes at once | Townscaper; Reigns meters | Every card: the island changes within 2 s, *where the hand isn't* |
| 2 | Meter shift | An abstract resource moves | Frostpunk; Reigns | Two meters per lab, shown as things in the world plus word bands, not raw numbers |
| 3 | Trade-off | A gain on one axis costs another | Reigns; Frostpunk | Clear cards A and B trade the two meters against each other |
| 4 | Partial success / fail forward | It works, with a complication | PbtA; Sorcery! | The vague card's result |
| 5 | Telegraphed | The outcome is previewed before commitment, accurately | Into the Breach ("always going to be accurate") | Guess + sure band before Go or Rephrase |
| 6 | Delayed callback | An earlier choice pays off later, explicitly | Telltale; Papers, Please; 80 Days | One planted flag per lab, cashed at stage 4 |
| 7 | Cumulative | Small choices add up | Obra Dinn; Reigns reigns | Stage-6 recap and artefact |
| 8 | Gating | Content appears only if state holds | Reigns conditions and lock terms; storylets | Insight cards unlocked by curiosity |
| 9 | Knowledge (meta) | Learning changes future play | Outer Wilds (death as knowledge); Heaven's Vault | "Vague cards give low sure-bands" carries into later stages and later labs |
| 10 | Reinterpretation | Later information reframes earlier events | Slay the Princess; Her Story | Stage-6 reveal, at most once per lab |
| 11 | Social / out-of-game | The consequence happens in the room | KTaNE; Jackbox | Facilitator discussion; teams explain their choices to each other |
| 12 | Cosmetic acknowledgement | Flavour only, but it shows the game noticed | Hades; Night in the Woods | Echo lines; props left on the island |
| 13 | Ending / artefact | The run produces a keepable summary | 80 Days log; Frostpunk review | Habitat plan, rover spec, expedition map, diary |
| 14 | **Recoverable state (new)** | No state leaves only losing options; hope is always available | Into the Breach grid defence; KTaNE anti-death-spiral pacing | Every stage after a bad result offers at least one card that partly recovers each meter |

**Rules (inference).**
- Every choice gets types 1 and 12.
- Every stage gets type 3 or 4.
- Each lab gets one strong type 6, one type 13, at most one type 10, and type 14 at every stage.

---

## 6. Group play and facilitation

- **KTaNE.** "The fun really lives between players." "Our game involves talking, so our job involved eavesdropping." Kids liked to "boss their parents around," and the team removed serious bomb references to keep the game light-hearted. [S, quotes] https://www.gamedeveloper.com/design/finding-the-fun-in-bomb-defusal-with-i-keep-talking-and-nobody-explodes-i-
- **Jackbox (from the talk).** [P] https://gameindustrylibrary.com/documents/the-jackbox-party-pack-unboxed-how-and-why-we-make-a-pack-of-5-games-every-year
  - Jacover describes "so-called social games" as not actually social: "you play them alone."
  - Their breakthrough was players visiting a website on their phones, with "no apps to install, no controllers."
  - A pitch has to be playable internally, even as "paper, index cards, or post-its," before the green-light committee.
- **Overcooked.** "Every single person has an integral role." [S] https://www.gamereactor.eu/every-single-person-has-an-integral-role-in-overcooked/
- **Escape rooms: Nicholson's survey of 175 facilities.** [P] http://scottnicholson.com/pubs/erfacwhite.pdf
- **Exploratorium APE.** [P/S] https://informalscience.org/research/fostering-active-prolonged-engagement-art-creating-ape-exhibits/
- **NASA JPL's Mars Rover Driver board game** for classrooms splits students into Scientist, Engineer and Rover roles. The "rover" student executes the commands exactly as read aloud. [P] https://www.jpl.nasa.gov/edu/resources/lesson-plan/mars-rover-driver-board-game/ This is a direct, NASA-made precedent for a child playing the literal-minded executor (inference).

**Table roles (inference).** Rotate Reader, Picker, Checker (reads the sure-band and says Go or Rephrase) and Spotter. For the rover lab, the NASA board game suggests an optional "Rover" role: one child acts out the helper's literal interpretation.

**Prototype the way Jackbox does (inference).** Before any build, run each new lab as a paper card game with printed island tiles and a facilitator reading the helper's lines.

---

## 7. Real-world anchors (all verified)

### 7.1 Mars commanding

- Rover drivers "don't actually drive the rovers in real time." The one-way light time is "anywhere from 4 minutes to 22 minutes." Drives are planned for "an entire Martian day, which we call a sol," then tested in simulation. [P] https://www.jpl.nasa.gov/podcasts/on-a-mission-season-1/season-4-mars-rovers/episode-8-how-to-drive-a-mars-rover/
- Perseverance: commands take "between 3 and 22 minutes," and the rover "wakes up and points its High Gain Antenna towards Earth to listen for our daily instruction." [P] https://science.nasa.gov/missions/mars-2020-perseverance/speaking-percys-language-how-to-talk-so-perseverance-will-listen/
- **Correction to round 2 (4–24 minutes):** use "about 3 to 22 minutes."
- The JPL classroom lesson says commands go "several times each week," so "every sol" is the typical case, not a rule. [P] https://www.jpl.nasa.gov/edu/resources/lesson-plan/mars-rover-driver-board-game/
- Engineers check whether a drive went as planned when the rover sends back "a 'postcard' of its new spot." [P] https://www.jpl.nasa.gov/edu/resources/video/mars-in-a-minute-how-do-rovers-drive-on-mars/

### 7.2 Rover wheels and selfies

- Self-portraits taken with the MAHLI arm camera "allow mission engineers to track changes over time, such as dust accumulation and wheel wear." [P] https://science.nasa.gov/photojournal/high-resolution-self-portrait-by-curiosity-rover-arm-camera/
- Wheel imaging is routine (about every 100 m of driving) because "the wheels are a non-renewable resource." [P] https://doi.org/10.5194/gi-5-205-2016
- Holes and tears "worsened significantly during 2013 as Curiosity was crossing terrain studded with sharp rocks." [P] https://science.nasa.gov/resource/break-in-raised-tread-on-curiosity-wheel/

### 7.3 Dust storms

- Opportunity's last signal came on 10 June 2018, after "a severe Mars-wide dust storm." [P] https://www.nasa.gov/news-release/nasas-record-setting-opportunity-rover-mission-on-mars-comes-to-end/
- In 2007, dust storms forced Opportunity to suspend all science "indefinitely." It resumed after about six weeks. [P] https://science.nasa.gov/mission/mer-opportunity/

### 7.4 Ponds

- "The best wildlife ponds have very gently shelving natural edges." The deepest areas need be "no more than 25–30 cm." [P] https://freshwaterhabitats.org.uk/advice-resources/frequently-asked-questions/
- On siting: "partially shaded… but still with plenty of sunlight… Take note of overhanging vegetation that may drop leaves into the water." [P] https://freshwaterhabitats.org.uk/app/uploads/2023/06/Creating-Garden-Ponds_2023.pdf
- Don't put turfs in the pond, "as they will add a blast of polluting nutrients." Rainwater is better than tap water. [P] same PDF, and https://freshwaterhabitats.org.uk/advice-resources/garden-pond-advice-hub/
- Pre-formed moulds "are usually too deep and too steep-sided." Give wildlife "easy routes in and out." [P] https://www.nhm.ac.uk/discover/how-to-make-small-wildlife-pond.html
- Street lighting cut moth caterpillar numbers by 47% in hedgerows and 33% in grass margins, and white LEDs did more harm than sodium lamps. [P] https://www.science.org/doi/full/10.1126/sciadv.abi8322 ; [P] https://www.ceh.ac.uk/press/LED-streetlights-reduce-insect-populations-50-percent

### 7.5 Coast and fog

- **Handrails.** Use "a stream or river… or a fence or wall" as a handrail to follow. [S] https://www.ukhillwalking.com/articles/skills/series/essential/skills_hand_railing_and_collecting_features-8339
- In poor visibility, "stop… Establish exactly where you are… make a plan." [P] https://www.thebmc.co.uk/en/hill-skills-how-to-survive-a-whiteout
- **Tides.** Getting cut off by the tide "contributes to a significant number of RNLI rescues every year." If you are cut off, "dial 999 and ask for the coastguard, do not try to wade or swim." [P] https://rnli.org/water-safety/know-the-risks/tides and https://rnli.org/news-and-media/2026/september/12/north-berwick-rnli-urge-coastal-visitors-to-check-tide-times
- **Lighthouses.** North Foreland was "the last manned Trinity House lighthouse," automated on 26 November 1998. Lighthouses are now monitored from Harwich. [P] https://trinityhouse.co.uk/articles/a-fine-farewell and https://www.trinityhouse.co.uk/lighthouses-and-lightvessels/north-foreland-lighthouse

---

## 8. Voice and style guide: AI helper and facilitator (ages 7–13)

### 8.1 Two voices, two jobs

| | **AI helper** (in the world, scripted) | **Facilitator** (in the room, guided by cards) |
|---|---|---|
| Narrative role | A character on the island (Isabelle, the Stanley Parable narrator) | Game master or mission control (KTaNE expert, escape-room host) |
| Knows | Only what the card says, plus the world state | What the helper misread, why, and the real-world fact |
| Speaks | Before a choice (guess + sure-band) and after it (what happened). Silent while children decide (Portal) | Between stages. Pulls rather than pushes (Outer Wilds) |
| Never | Scolds, says "wrong," or comments on a retry (Resetti) | Gives the answer before the children have had a go |
| Tone | Eager, literal-minded, honest about uncertainty, gently funny | Curious, warm, gives the credit to the children |

### 8.2 Readability targets

- **Reading level:** on screen, roughly age 8.
- **Sentences:** at most 12 words, about 8 on average.
  - Supporting sources: [S] https://readabilityformulas.com/writing-for-2nd-grade-readers/ and https://educationstandards.nsw.edu.au/flippingbook/speaking-and-listening/files/assets/basic-html/page18.html. These are weak sources (see "Still unverified").
- **Bubbles:** at most 25 words and 3 sentences.
- **Cards:** at most 10 words, starting with a verb.
- **Instructions:** put the action at the end ("To help the frogs, tap the ramp"), following the Sesame guidelines. [P] https://joanganzcooneycenter.org/wp-content/uploads/2020/02/SesameWorkshop-2012.pdf
- **Feedback channels:** use sound, visuals and text together, and keep background music low during speech. [P] https://www.bbc.co.uk/gel/features/how-to-design-for-children and https://developers.google.com/building-for-kids/designing-engaging-apps
- **Glyphs:** no O/0, I/l/1 confusions on cards, and no direction-free ordinals (KTaNE, above).
- **Confidence:** shown as a word band plus a bar, with the number optional (section 2.1a).
- **Audio:** lines under 6 seconds. Non-essential prompts can be interrupted, because children "become impatient with the uninterruptible audio prompts." (Sesame, above.)

### 8.3 Showing a mistake without shaming

1. The helper owns its guess: "I guessed…"
2. Name the gap, not the child.
3. Make the outcome interesting, not punishing (fail forward), and always recoverable (type 14).
4. Make retrying cheap and welcome. It costs no stars.
5. Praise the process specifically (Mueller and Dweck; Sisk et al.).
6. Give the reason: every outcome line includes a "because."
7. **Graded help**, adapted from Sesame's three levels:
   - After the first vague pick, the helper only notes its own uncertainty.
   - After a second, the facilitator restates the goal.
   - After a third, the helper offers "Shall I show you a clearer card?"
8. No Resetti energy.

### 8.4 Humour rules

*Kept from round 2.*
- Literal-mindedness drives the jokes.
- Physical comedy happens in the world.
- At most one joke per bubble.
- No humour at the moment someone in the story needs help.

### 8.5 Helper line templates (updated for word bands)

- **Guess:** "I think you mean **[interpretation]**. I'm **[very / fairly / not very]** sure."
- **Low confidence:** "Hmm. **[Word]** could mean **[x]** or **[y]**. I'll guess **[x]**. Not very sure!"
- **Outcome (clear):** "Done! **[Change]**, because **[reason]**."
- **Outcome (vague):** "Done… ish. **[Literal result]**. That's not quite **[likely intent]**, is it?"
- **Callback:** "Remember when we **[earlier choice]**? Look what's happening now."
- **Retry:** "Trying it another way. Scientists do this all the time."
- **Nervous-button hint (Outer Wilds):** "Want a clue? Look at what the card *doesn't* say."

### 8.6 Facilitator card template

**Notice / Explain / Transfer / Secret / Move on when** (kept from round 2). The **Secret** must carry a source tag in the facilitator notes; sections 10.x give the URLs.

### 8.7 Examples

*Kept from round 2.*

---

## 9. Authoring model: making 729 routes manageable

**Structure and state** are kept from round 2:
- six bottleneck stages;
- cards A, B and V;
- one flag per stage;
- two load-bearing flags, P and Q;
- about 110 units per lab.

**Spreadsheet columns, adapted from Reigns' card sheet** [P transcript, section 2.1]:

`stage | card_id | card_text | bearer | sure_band | sure_pct | conditions | meter1_delta | meter2_delta | sets_flag | outcome_line | prop_change | echo_variants | artefact_fragment | fact_source_url`

The final column is new. Every facilitator "secret" and every historical or scientific line must carry the URL that supports it (inference, from the fact-check in this report).

**Testing: exhaustive, not random.**
- Ingold built an automated player for Heaven's Vault and called the result "fantastic," because it found dead ends that "would have taken me 16 hours" to reach by hand. He also warned that "randomized play is just the worst simulation of human behavior," and that the transcript it "spits out" is "good for redrafting." [P] https://www.youtube.com/watch?v=o02uJ-ktCuk
- A community tool, Ink-Tester, runs an ink story thousands of times and reports line coverage. [S] https://github.com/wildwinter/Ink-Tester
- **Recommendation (inference).** With only 3^6 = 729 routes, enumerate every one in CI rather than sampling at random. Assert that:
  - every slot has text;
  - no route ends in an unrecoverable state (type 14);
  - every load-bearing flag is cashed in.
- **Also export a readable transcript of 10 sampled routes for a human read-through,** following Ingold's redrafting use.

**Balance.**
- Log pick rate and retry rate (Slay the Spire).
- A/B test the word band against the number (section 2.1a).
- Watch, don't ask (KTaNE).

---

## 10. Worked arcs for all four labs (fact-checked)

All four use the same shape: **ki** (stage 1), **shō** (stages 2–3), **ten** (stage 4: twist plus callback), stage 5 (the hardest trade-off), **ketsu** (stage 6: recap and artefact). Sure-bands: **V** = very sure, **F** = fairly sure, **N** = not very sure.

### 10.1 Pond: "Design a pond that wildlife and visitors can share"

**Setting.**
- Meters: Wildlife and Visitors.
- Planted flag P = `EDGES`. Q flag = `SITE`.

| Stage | Card A (Wildlife) | Card B (Visitors) | Card V (vague) | Change / fail-forward | Flag |
|---|---|---|---|---|---|
| 1 Dig | "Dig in the sunny meadow, away from the path" (V) | "Dig beside the path so people can see" (V) | "Put it somewhere nice" (N): under the big oak | A: insects arrive; B: a family stops to look; V: shade, with leaves dropping in | `SITE` |
| 2 Edges | "Make gentle muddy shelves at the edge" (V) | "Build steep stone sides, neat and tidy" (V) | "Make it look natural" (N): plastic rocks | A: shallow margin; B: a crisp rim; V: shiny fake rocks | **`EDGES`** |
| 3 Plants and water | "Plant native reeds; fill with rainwater" (V) | "Plant bright garden flowers round it" (V) | "Add lots of green stuff" (N): the helper lays lawn turf into the water | A: dragonflies; B: colour and photos; V: the water turns green and soupy (the turf's nutrients feed algae) | `PLANTS` |
| 4 First froglets | "Add a ramp so froglets can climb out" | "Put up a fence to keep people back" | "Help the frogs" (F): a bowl of water | **Callback:** if `EDGES=B`: "Remember the steep sides? Froglets can't climb out." If A: "Your shelves are working!" plus a new problem (a school group with nets). If V: the fake rocks get hot in the sun | `RESCUE` |
| 5 Sharing | "Build a small bird hide in the reeds" | "Build a boardwalk and dipping platform" | "Let everyone see everything" (N): floodlights | A: shy birds return, fewer visitors; B: busy and fun, ducks leave; V: night lights, fewer caterpillars on the hedge | `SHARE` |
| 6 Dusk survey | Recap; results depend on `SITE` | | Choose the plan's title | The Habitat Plan prints | |

**Facilitator secrets (with sources).**
- **Stage 1:** a pond should get "plenty of sunlight"; watch for overhanging trees that drop leaves. https://freshwaterhabitats.org.uk/app/uploads/2023/06/Creating-Garden-Ponds_2023.pdf
- **Stage 2:** the best wildlife ponds have "very gently shelving natural edges"; steep sides trap animals. https://freshwaterhabitats.org.uk/advice-resources/frequently-asked-questions/ and https://www.nhm.ac.uk/discover/how-to-make-small-wildlife-pond.html
- **Stage 3:** turf in the water adds "a blast of polluting nutrients"; rainwater beats tap water. https://freshwaterhabitats.org.uk/advice-resources/garden-pond-advice-hub/
- **Stage 5:** in a UK study, street lights cut moth caterpillar numbers by about a third to a half. https://butterfly-conservation.org/news-and-blog/streetlights-reduce-moth-populations

**Artefact fragments** are kept from round 2, with Plants revised: "Native reeds + rainwater" / "Garden flowers" / "Lawn in the water (we'd change this: it turned the water green)."

### 10.2 Mars rover: "Drive the rover to the crater"

**Setting.**
- Meters: Energy and Science.
- A visible sol clock.
- Planted flag P = `ROUTE`. Q flag = `CAMERA`.
- Framing: the plan goes up once a sol, and the signal takes 3–22 minutes (section 7.1).

| Stage | Card A (Energy) | Card B (Science) | Card V | Change / fail-forward | Flag |
|---|---|---|---|---|---|
| 1 Wake-up | "Point solar panels at the Sun, then check battery" (V) | "Take a 360° photo of the landing site" (V) | "Get ready" (N): a whole sol spent being "ready" | A: battery up; B: a layered rock is spotted; V: the sol clock ticks over, nothing done | `START` |
| 2 Route | "Take the long smooth plain around the rocks" (V) | "Drive straight across the sharp-rock field" (F) | "Go that way" (N): the nearest dune | A: slow and safe; B: fast, wheels scuffed; V: sand ripples, slow going | **`ROUTE`** |
| 3 Camera | "Photograph only where we're driving" (V) | "Photograph anything with layers or colours" (F) | "Take a picture of something interesting" (N): a selfie | A: saves energy; B: the layered rock in close-up; V: a selfie that shows the wheels | `CAMERA` |
| 4 Dust storm | "Park, point panels, wait it out" | "Keep driving with hazard cameras" | "Be careful" (N): 1 cm per minute | **Callback:** if `ROUTE=B`: "Remember the sharp rocks? A wheel tread is broken." If V: "The dune sand is sliding." If A: "Smooth plain, but dust is covering our panels." | `STORM` |
| 5 Science stop | "Skip the rock, save power for the crater" | "Stop and drill a sample of the layered rock" | "Do science" (N): measures the air temperature and stops there | A: arrive with power; B: a big science win, low battery; V: a small but real result | `SAMPLE` |
| 6 Crater rim | Arrive at sunset on the sol clock. If `CAMERA=V`, the reveal is that the selfie lets engineers check the damaged wheel | | Name the rover | The Rover Spec Card prints | |

**Facilitator secrets (with sources).**
- **Stage 1:** drivers plan a whole sol at a time and test it in simulation first. https://www.jpl.nasa.gov/podcasts/on-a-mission-season-1/season-4-mars-rovers/episode-8-how-to-drive-a-mars-rover/
- **Stage 2:** Curiosity's wheels were badly torn crossing sharp rocks in 2013. https://science.nasa.gov/resource/break-in-raised-tread-on-curiosity-wheel/
- **Stage 3:** selfies let engineers "track… dust accumulation and wheel wear." https://science.nasa.gov/photojournal/high-resolution-self-portrait-by-curiosity-rover-arm-camera/
- **Stage 4:** in 2007 Opportunity waited out storms for about six weeks; a 2018 storm ended its mission. https://science.nasa.gov/mission/mer-opportunity/
- **Optional "Rover" table role:** NASA JPL's own board game has a child act out the commands literally. https://www.jpl.nasa.gov/edu/resources/lesson-plan/mars-rover-driver-board-game/
- **Note:** the library lab is called "Moon Base" while this lab is set on Mars (context.md). These facts are Mars-specific.

### 10.3 Lighthouse camp: "Get your team to the lighthouse before sunset"

**Setting.**
- Meters: Time and Team Energy.
- Planted flags: P = `PACK` and a secondary `PATH`. Q flag = `KIND`.
- Mild peril, no real harm.
- **Change:** the lighthouse is automatic, so a camp leader waits there to "light" a beacon for the camp. There is no keeper. https://trinityhouse.co.uk/articles/a-fine-farewell

| Stage | Card A (Time) | Card B (Energy) | Card V | Change / fail-forward | Flag |
|---|---|---|---|---|---|
| 1 Pack | "Pack the map, torch and water" (V) | "Pack snacks, sun hats and plasters" (V) | "Bring useful stuff" (N): a kite, a frying pan and a map | A: light bag; B: happy team; V: heavy bag, but there is a map | **`PACK`** |
| 2 Path | "Take the cliff-top path, it's quicker" (V) | "Take the beach path, it's flatter" (V) | "Go the nice way" (F): the woodland loop | A: fast but steep; B: easy, but the tide is coming in; V: lovely and long | `PATH` |
| 3 Rest | "Quick five-minute water stop" (V) | "Proper picnic and a game" (V) | "Have a break" (F): a 2-hour nap | If `PATH=B`, the picnic spot is close to the waterline and the helper notices the tide rising. A: time kept; B: energy restored; V: the sun visibly moves | `REST` |
| 4 Sea fog | "Use the map and compass to follow the path" | "Hold hands and follow the fence line slowly" | "Find the way" (N): follows a seagull | **Callback:** if `PACK=A`: "Remember the torch? Switch it on!" If B: "No torch, but the plasters help after a stumble." If V: "The kite! Fly it high so the camp leader sees us." | `FOG` |
| 5 Someone needs help | "Keep going, and tell the ranger by radio" | "Stop and help the lost walker find their dog" | "Be kind" (F): gives away all the snacks | A: on time; B: late, but the walker knows a shortcut; V: a kind, hungry team | **`KIND`** |
| 6 Light the beacon | The sunset clock decides before or after dark. Both end well. If `KIND=B`, the walker and dog wave | | Name the team | The Expedition Map prints | |

**Facilitator secrets (with sources).**
- **Stage 2 and 3:** tides can cut people off fast. Check tide times; if you are cut off, call 999 and ask for the Coastguard. https://rnli.org/water-safety/know-the-risks/tides
- **Stage 4:** in fog, follow a "handrail" (a fence, wall or stream), and stop to work out where you are first. https://www.ukhillwalking.com/articles/skills/series/essential/skills_hand_railing_and_collecting_features-8339 and https://www.thebmc.co.uk/en/hill-skills-how-to-survive-a-whiteout
- **Lighthouses today:** all Trinity House lights have been automatic since 1998. https://www.trinityhouse.co.uk/lighthouses-and-lightvessels/north-foreland-lighthouse
- **Camp leaderboard:** score "best explanation" and "kindest choice," not time alone (inference).

### 10.4 Roman Londinium: "Plan a day in Londinium for a traveller arriving by boat"

**Setting.**
- Fixed at **about AD 120.** The brochure's "Day I" framing is kept.
- Meters: Accuracy and Curiosity.
- Planted flag P = `QUAY`. Q flag = `GIFT`.
- Running joke: the vague card triggers anachronisms.

#### 10.4.1 Fact-check table

| Claim used in the arc | Verdict | Evidence | Source |
|---|---|---|---|
| Londinium was a port with timber quays | **True** | "The northern bank of the river was strengthened with timber, creating a quay… Wine, olive oil, fish sauce… arrived" | [P] https://www.londonmuseum.org.uk/collections/london-stories/timeline-roman-london-londinium/ ; a large civic quay at Pudding Lane is dated to just before AD 100 **(agent)** https://www.mola.org.uk/discoveries/news/archaeology-sea-level-change-southern-north-sea |
| Denarii were used; lending happened | **True** (the money-changer is unsupported) | An IOU dated 8 January AD 57 for "105 denarii"; "one denarius is roughly one man's skilled work for a day" | [P] https://romaninscriptionsofbritain.org/inscriptions/TabLondBloomberg44 ; [S, quoting Tomlin] https://archaeology.co.uk/articles/features/letters-from-londinium.htm |
| Early Londoners came from many places | **True** | "Businessmen and soldiers, most likely from Gaul and the Rhineland"; nearly 100 names, including a cooper, a brewer and a judge | [P] https://www.mola.org.uk/discoveries/news/archaeological-research-britains-oldest-hand-written-documents-released |
| Latin and British were both spoken | **True, with qualification** | Latin was official and is attested on the tablets; many Britons kept their own languages | [P] https://www.britishmuseum.org/sites/default/files/2019-05/british_museum_roman_britain.pdf **(agent)** |
| "Mogontius" is a London name | **True** | Address "Londinio Mogontio", meaning "To Mogontius [a Celtic personal name], in London", c. AD 65 | [S] https://archaeology.co.uk/articles/news/earliest-written-reference-to-london-found.htm ; MOLA dates it to AD 65–80 [P] (MOLA page above) |
| Bread was baked in London | **True** | A structure interpreted as a communal bread oven, AD 65–80 | [P] https://www.mola.org.uk/discoveries/news/research-bloomberg-uncovers-earliest-evidence-cockroaches-british-isles |
| Olives were eaten | **True** | Olives are among the plant remains identified in London | [P, academic] Perring, *London in the Roman World* (OUP), ch. "Economy and supply" https://doi.org/10.1093/oso/9780198789000.003.0016 ; [P] https://www.gresham.ac.uk/watch-now/artefacts-and-study-life-roman-london |
| Oysters were eaten | **True** | Oyster shells are "an extremely common find… representative of a major food source"; British oysters were admired by Roman writers | [P] https://www.mola.org.uk/discoveries/news/holey-oysters |
| Fish sauce came from Spain | **True** | A London amphora sherd painted "fish-sauce", identified as a Dressel 2–4 from Baetica (southern Spain), found behind a quay built c. AD 70 | [P] https://romaninscriptionsofbritain.org/inscriptions/2492.29 |
| Peacock and dormouse feasts in London (the brochure screen) | **Unsupported for London** | Peafowl in Roman Britain is known from a few non-London sites. Roman-period dormouse bones at York are garden dormouse, not necessarily food | [P] https://scicultchickens.org/sites/scicultchickens.org/files/uploads/18_Poole-libre%20(1).pdf **(agent)** ; https://doi.org/10.1111/j.1469-7998.1986.tb03662.x **(agent)** |
| Forum and basilica | **True; dates contested** | MOLA: construction of the second forum began c. AD 100. London Museum's model shows it "from about AD 130 when it was at its largest", with "permanent shops and offices" and market stalls. The basilica is often called the largest north of the Alps | [P] https://www.londonmuseum.org.uk/collections/v/object-452169/model-forum/ ; https://www.mola.org.uk/discoveries/news/discovery-ornate-roman-fresco-revealed **(agent)** ; https://web.archive.org/web/20150616205346/http:/archive.museumoflondon.org.uk/Londinium/Today/vizrom/04+forum.htm **(agent)** |
| Public baths with hot, warm and cold rooms | **True** | Huggin Hill. Baths had rooms of graded temperature (frigidarium, tepidarium, caldarium), were "used by most inhabitants… including slaves", and "men and women bathed at separate times… or in separate suites" | [P] https://historicengland.org.uk/listing/the-list/list-entry/1001981 |
| The governor's palace | **Contested** | London Museum says the site is "often identified" as the palace | [P] https://www.londonmuseum.org.uk/blog/london-stone-in-seven-strange-myths/ **(agent)** |
| Vigiles (a fire-watch) in London | **Unsupported. Removed.** | No London evidence | (agent search across RIB and MOLA) https://romaninscriptionsofbritain.org/org/5321 |
| Guildhall amphitheatre | **True** | Timber c. AD 70, rebuilt in stone in the early 2nd century; used for gladiatorial fights, animal hunts and executions | [P] https://www.cityoflondon.gov.uk/assets/Things-to-do/roman-amphitheatre-london.pdf **(agent)** |
| Wax tablets and writing practice | **True** | Silver-fir tablets filled with black wax and written on with a stylus; one tablet shows someone "practicing writing the alphabet and numerals" | [S] https://archaeology.co.uk/articles/features/letters-from-londinium.htm ; [P] the MOLA page above |
| "No street names or numbers" | **False as worded. Corrected.** | "There is no evidence for any systems of numbering… though names certainly existed" for districts, gates and streets. The evidence is from Pompeii | [P] Ling (1990), *Greece & Rome* http://www.ostia-antica.org/fulltext/ling/ling-1990.pdf |
| Lamps and brooches were everyday objects | **True** (calling them "souvenirs" is unsupported) | More than 1,000 London lamps, cheap and mould-made; hundreds of brooches | [P] https://www.mola.org.uk/discoveries/news/battle-sexes-roman-lamp-fragment-shines-light-gender-politics-and-sexuality-1st **(agent)** ; https://www.gresham.ac.uk/watch-now/artefacts-and-study-life-roman-london |
| Hadrianic fire | **True, roughly 120–130 CE** | The cause, and whether it was one fire or several, are unknown | [P] https://www.londonmuseum.org.uk/collections/london-stories/london-catastrophic-fires/ |
| Population | **An estimate** | About 10,000 by AD 60; about 30,000 by AD 150 | [P] https://www.londonmuseum.org.uk/collections/london-stories/timeline-roman-london-londinium/ |
| A bridge over the Thames | **Likely** | Probably by about AD 52; its exact position is uncertain | [P] https://www.mola.org.uk/sites/default/files/Roman-Londons-first-voices-December-2017.pdf **(agent)** |
| Workshops | **True** | Probable late-1st-century workshops at Moorgate | [P] https://www.mola.org.uk/discoveries/news/fieldwork-8-10-moorgate **(agent)** |
| Tea is an anachronism | **True** | Tea first appeared in Britain in the 1650s | [P] https://www.rct.uk/collection/stories/tea-in-the-royal-collection |

#### 10.4.2 The arc (revised)

| Stage | Card A (Accuracy) | Card B (Curiosity) | Card V | Change / fail-forward | Flag |
|---|---|---|---|---|---|
| 1 Arrive at the quay | "Bring Roman coins, denarii, for the market" (V) | "Find a local guide who speaks Latin and British" (F) | "Get ready for the day" (N): the helper buys a mug saying "I ♥ LONDINIUM" | A: a purse of denarii; B: Mogontius appears as a guide; V: the anachronistic mug ("Did they have these? …No."), Accuracy dips | **`QUAY`** |
| 2 Breakfast | "Buy bread and olives at the market" (V) | "Try oysters with fish sauce from Spain" (F) | "Get something tasty" (N): a cup of tea | A: a plausible breakfast; B: the garum insight card unlocks (the RIB label); V: tea, 1,500 years too early | `FOOD` |
| 3 Morning | "Visit the forum: shops, offices and market stalls" (V) | "Go to the baths: cold, warm and hot rooms" (V) | "See the important building" (N): the helper heads for "the governor's palace" | A: trade bustle, with scaffolding on part of the forum (still being built or extended c. AD 120); B: the bath sequence diorama; V: a big building by the river. The facilitator explains that archaeologists *think* it might have been the governor's | `PLACE` |
| 4 Lost in the streets | "Ask a shopkeeper the way, in Latin" | "Follow the sound of the river back to the quay" | "Get help" (N): the helper looks for a phone box to call for help | **Callback:** if `QUAY=B`: "Remember Mogontius? He knows a shortcut." If A: "Good thing you have denarii: pay a boy to show you." If V: "The mug! A potter laughs and shows you his workshop." | `LOST` |
| 5 Afternoon | "Watch a ship unload amphorae at the quay" | "Visit a workshop and practise writing on a wax tablet" | "Do something fun" (N): looks for a cinema | A: the cargo arrives (it will matter at stage 6); B: the alphabet-practice insight unlocks; V: no cinema. The helper reaches the amphitheatre gate, and the facilitator explains it was used for fights and hunts, so not today. Then a turn to the market | `AFTERNOON` |
| 6 Evening: write the diary | The traveller writes on a wax tablet. If `FOOD=B` or `AFTERNOON=A`, the reveal: the fish-sauce jar's label says it came from southern Spain, so Londinium was an international port | | Pick a gift (`GIFT`): an oil lamp, a brooch or the mug ("Put it in our museum of mistakes!") | The Traveller's Diary prints | |

**Facilitator secrets (each with a source in 10.4.1).**
- **Stage 1:** most early Londoners we know by name came from Gaul and the Rhineland; Latin was the written language.
- **Stage 2:** a real London jar is labelled "fish-sauce," from southern Spain.
- **Stage 2 (brochure moment):** "Who ate peacock and dormice?" We have no London evidence for either. Oysters and bread, yes.
- **Stage 3:** at the baths, men and women went at different times, and enslaved people used them too.
- **Stage 4:** there were no house numbers. Streets might have names, but people found their way by landmarks.
- **Stage 6:** Roman lamps were cheap and very common; more than 1,000 have been found in London.

**Insight cards (real objects, Never Alone model; each needs a museum image licence).**
- The Tibullus IOU tablet (AD 57).
- The "Londinio Mogontio" address.
- The alphabet-practice tablet.
- The RIB 2492.29 fish-sauce amphora.
- The forum model (London Museum 98.48).
- A Roman lamp.

**Artefact fragments (Traveller's Diary).**
- **Arrival:** "I carried denarii." / "I met Mogontius." / "I bought a strange mug (not Roman!)."
- **Food:** "Bread and olives." / "Oysters and Spanish fish sauce, salty!" / "I asked for tea. Nobody had heard of it."
- **Place:** "The forum, busy and still being built." / "Cold, warm, hot: the baths!" / "A big building by the river. Was it the governor's?"
- **Lost:** "A boy guided me for a coin." / "Mogontius knew a shortcut." / "A potter rescued me."
- **Afternoon:** "A ship full of jars." / "I wrote ABC on a wax tablet." / "No cinema in Londinium!"
- **Accuracy footnote:** "Mistakes we spotted."

**Specialist sign-off still recommended.** Before client use, a MOLA or London Museum specialist should review the "c. AD 120 forum still being built" visual and the multilingual-guide framing (inference).

---

## 11. Recommendations (updated)

1. **Branch-and-bottleneck with two load-bearing flags; author in a Reigns-style spreadsheet with a `fact_source_url` column** (Ashwell; the Reigns talk).
2. **Clear cards trade the two meters against each other** (Reigns; Frostpunk).
3. **The vague card fails forward; every other card is "totally unambiguous"** (KTaNE), including glyph and direction checks.
4. **The guess is an honest telegraph.** The world then does exactly what the helper said it would. The uncertainty is about meaning, not dice (Into the Breach).
5. **Show confidence as word bands plus a bar; make the number optional** (Reigns removed its numbers; Into the Breach avoids percentages; children over-trust high figures).
6. **Place meter changes where the tapping hand won't cover them** (Reigns' "dumb test").
7. **One callback per lab, cashed at stage 4 with explicit words** (Telltale; 80 Days).
8. **Retries are free and remembered; help is graded in three steps** (Celeste; Hades; Sesame).
9. **No unrecoverable states** (Into the Breach checkmate; KTaNE death spiral). Assert this in CI.
10. **The helper speaks before and after a choice, never during; facts are pulled, not pushed** (Portal; Outer Wilds). Add an optional "I'm not sure" hint button.
11. **The facilitator is game master and holds the sourced secret** (KTaNE; escape rooms; APE; EDC's PBS KIDS study on adult engagement).
12. **Kishōtenketsu arc plus a cumulative recap.**
13. **Show the change in the world; keep text short; put "evocative" props on the island** (Jenkins; Smith and Worch; Alliot).
14. **Artefacts are built from fragments and include a "mistakes we spotted" line.**
15. **Reward reasoning and variety, not one optimal route.**
16. **Rotate table roles, with an optional "Rover" role** that acts out the literal reading (Overcooked; NASA JPL's board game).
17. **Paper-prototype every new lab before building it** (Jackbox's index-card rule; KTaNE demos).
18. **Test all 729 routes exhaustively and have a person read sampled route transcripts** (Heaven's Vault).
19. **Every real-world fact carries a museum, NASA or charity source.** Remove vigiles, the money-changer, "no street names" and the keeper.
20. **Watch children play rather than asking them** (KTaNE eavesdropping; Valve's playtests).

---

## 12. Sources (new or upgraded in round 3)

**GDC talk records (primary).**
- Reigns transcript: https://gameindustrylibrary.com/documents/the-casual-but-regal-swipe-creating-game-mechanics-in-reigns ; video: https://www.youtube.com/watch?v=tDdtbh-oUTU
- Into the Breach postmortem: https://www.youtube.com/watch?v=s_I07Iq_2XM ; summary: https://gamedesign.gg/watch/into-the-breach-postmortem/
- Outer Wilds (Kelsey Beachum): https://www.youtube.com/watch?v=QaGu9tGCNbI
- Jackbox Unboxed: https://gameindustrylibrary.com/documents/the-jackbox-party-pack-unboxed-how-and-why-we-make-a-pack-of-5-games-every-year ; https://gdcvault.com/play/1027202/The-Jackbox-Party-Pack-Unboxed
- KTaNE Vault: https://gdcvault.com/play/1023113/Designing-Asymmetric-Gameplay-For-Keep
- Heaven's Vault: https://gdcvault.com/play/1025392/-Heaven-s-Vault-Creating ; https://www.youtube.com/watch?v=o02uJ-ktCuk

**Children's media.**
- Sesame Workshop guide: https://joanganzcooneycenter.org/wp-content/uploads/2020/02/SesameWorkshop-2012.pdf
- BBC GEL: https://www.bbc.co.uk/gel/features/how-to-design-for-children
- EDC study of PBS KIDS games: https://cct.edc.org/sites/cct.edc.org/files/publications/Gaming%20Body%20Feb%2013_0.pdf
- Google, Building for Kids: https://developers.google.com/building-for-kids/designing-engaging-apps

**Domain facts.** NASA, JPL, Freshwater Habitats Trust, NHM, UKCEH and Butterfly Conservation, RNLI, BMC, Trinity House, MOLA, London Museum, Historic England, RIB, Ling (1990), Perring (OUP) and the Royal Collection Trust. All URLs are inline in sections 7 and 10.

Every round-2 source not listed here is unchanged. See `research/round-2/03-narrative-choice.md` §12.

---

## Still unverified

1. **Outer Wilds, GDC 2020 (Alex Beachum and Loan Verneau).** No public recording or transcript was found. Round-2 quotes from it ("knowledge being the only real thing of value", the crashing-object opening that failed) rest on the Game Developer write-up [S]. The Kelsey Beachum GDC talk is the primary substitute. The slide-deck PDF link came from the Exa agent and was not opened.
2. **Jackbox's "Jack Principles"** (one task at a time, "illusion of awareness") come only from builtin.com [S]. Jacover's talk does not state them in the part of the transcript I read.
3. **Ken Wong and Oskar Stålberg GDC talks** (named in NEXT-SESSION as paywalled). They belong to topics 01 and 04 and were not re-checked here.
4. **Readability targets** (12 words, age-8 level) rest on weak secondary sources. A UK source (for example the BBC's or DfE's guidance on writing for children) would be better.
5. **Claims marked (agent)** in 10.4.1 were summarised by the Exa agent from MOLA, British Museum, City of London and academic pages that I did not open myself: the Pudding Lane quay before AD 100; Latin as official language; the forum construction start and "largest north of the Alps"; the governor's palace "often identified"; the amphitheatre's uses and dates; lamp counts; the bridge c. AD 52; Moorgate workshops; peafowl and dormouse evidence. Re-read these before client use.
6. **"Forum still being built c. AD 120."** This is an inference from "began c. AD 100" plus "largest about AD 130." Academic accounts differ (Perring, OUP ch. 13, https://doi.org/10.1093/oso/9780198789000.003.0013, **agent**).
7. **The street-name evidence** comes from Pompeii, not London. No London street name is known to me.
8. **Celeste, Hades, Frostpunk, Terra Nil, Toca Boca, Night in the Woods, Papers, Please, Obra Dinn and Citizen Sleeper** are still cited from secondary interviews or journalism, as in round 2. No primary talk records were sought this round.
9. **The word-band versus number recommendation** (2.1a) is an inference from game-design talks and earlier rounds' trust research. No study tested it with 7–13-year-olds, so it needs DeltaOps' own A/B test.
10. **The Mueller and Dweck summary link** is a parenting-science blog. The original JPSP paper was not fetched.
