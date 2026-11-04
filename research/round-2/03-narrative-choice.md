# 03: Narrative, Structure, Choice and Consequence for DeltaOps AI Labs

*Research report for DeltaOps Learning. Second, deeper pass, 4 November 2026.*

**How to read this.**
- Sections 1–7 cover the research.
- Section 8 is a voice and style guide for the AI helper and the facilitator.
- Section 9 is an authoring model that keeps the 729 routes manageable.
- Section 10 works through all four existing labs stage by stage.
- Section 11 lists the recommendations.
- Section 12 lists sources and how reliable each is.

**Claims are labelled by source quality:**
- **[P]**: primary, meaning the developer's own words, talk, postmortem or paper.
- **[S]**: reputable secondary, such as journalism or a write-up of a talk.
- **(inference)**: my own analysis.

---

## 0. What changed in this pass

1. **Primary or near-primary sources replaced several secondary ones.**
   - Reigns' card-bag system, from the developers' Game Developer deep dive.
   - Keep Talking and Nobody Explodes, from a detailed write-up of Ben Kane's GDC talk with direct quotes.
   - Outer Wilds, from the Beachum and Verneau talk coverage with quotes.
   - Jackbox's "Jack Principles."
   - 80 Days, from Jon Ingold's design article.
   - Sorcery!'s rewind mechanic.
   - Hades and Supergiant on reactivity.
   - Into the Breach's GDC postmortem is still only available as a video in the GDC Vault and on YouTube. Its key claim, telegraphing so that every failure is legible, is taken from Subset Games' own IGF interview.
2. **The comparison set is wider.**
   - Disco Elysium, The Stanley Parable, GLaDOS, Hades and Mr. Resetti are now used as models for the helper's voice.
   - Sorcery!, Heaven's Vault, Slay the Princess, Her Story, Return of the Obra Dinn, Night in the Woods and Citizen Sleeper are added for choice design.
   - Journey and Gris are added for wordless narrative, Never Alone for cultural storytelling, and Overcooked for co-op play.
   - Toca Boca and Animal Crossing are added as children's design references, alongside children's-media feedback research and folktale structure (the rule of three and cumulative tales).
3. **Three new analytic tools:**
   - a taxonomy of consequence types (section 5),
   - a voice and style guide (section 8),
   - a reusable authoring model (section 9).
4. **All four labs are worked through in full** (section 10): pond, Mars rover, lighthouse camp and Roman Londinium. Each has flags, a delayed callback, a vague-card fail-forward outcome, facilitator prompts and artefact fragments.

---

## 1. Narrative in builders and world-games

### 1.1 Space as story

- **Jenkins' four modes.** Henry Jenkins asks designers to see themselves as "narrative architects" who "design worlds and sculpt spaces." His four modes of environmental storytelling are evoked, enacted, embedded and emergent. **[P]** https://web.mit.edu/~21fms/People/henry3/games&narrative.html
- **Placed props.** Harvey Smith and Matthias Worch ("What Happened Here?", GDC 2010) show that deliberately placed props let players reconstruct events themselves, which deepens their investment. Their slides and notes are on Smith's site. **[P]** https://www.witchboy.net/?p=621
- **Lab implication (inference).** Every stage should leave physical residue on the island: a ramp, a trampled path, a charred stone. By stage 6 the island should tell the group's story with no text at all.

### 1.2 The place as protagonist

- **Terra Nil.** The lead artist says the "main character" is the landscape, not the city. The lead designer wanted players "hopeful," not pushed into "apathy or resignation." **[S, developer quotes]** https://gamerant.com/terra-nil-interview-free-lives-devolver-digital-nature-beauty-audience-engagement/ and https://Techraptor.net/gaming/features/terra-nil-paints-hopeful-picture-for-future
  - This matters for the pond and nature-centre labs: an environmental message should leave children feeling capable, not guilty.
- **Townscaper.** It has "no goal." Stålberg: "When you can win, you play to win. When you keep score, you play to the score." **[S, developer quotes]** https://pcgamer.com/townscapers-developer-on-how-its-radically-casual-design-is-inspiring-a-new-wave-of-low-stress-builders-to-adapt-the-blueprint
- **Toca Boca.** It makes "toys, not games," with no winning or losing, and the CEO says adults have "lost the ability to think like children," so the studio designs with them. **[S]** https://www.pocketgamer.com/articles/052067/r/ and https://gamesbeat.com/how-toca-boca-got-100m-mobile-downloads-by-putting-kids-first/
- **Before We Leave.** The developer names presenting information "without clutter" as one of the hardest problems. **[S]** https://toisto.net/imagining-the-pale-blue-dot-an-interview-with-sam-barham
- **Dorfromantik.** Its pillars are minimalism and readability. **[S]** https://80.lv/articles/how-dorfromantik-expands-its-cozy-world-through-minimalist-design
- **Tension for DeltaOps (inference).** Stars, XP and leaderboards push the labs toward "playing to the score." Section 11 recommends rewarding reasoning and variety rather than an optimal route.

### 1.3 Wordless and low-text narrative

- **Journey.**
  - Jenova Chen's team designed for an "emotional arc," gave no character power or identity, and told the story through play and wordless cutscenes. **[P: GDC 2013 "Designing Journey"]** https://gdcvault.com/play/1017700/Designing
  - Chen has also described a deliberate three-act shape. **[S]** https://gamesbeat.com/kellee-santiago-describes-the-making-of-thatgamecompanys-journey/
- **Gris.**
  - Gris has no dialogue. Each section has its own colour palette and mechanic tied to a stage of grief; the developers say colour came first and the stages of grief were layered on. **[S, developer quote]** https://blogs.plitch.com/en/blog/interview-with-nomada-studio
  - Commentary maps it to five stages, with red for anger. **[S]** https://gamecritics.com/gc-staff/gris-review/
- **Lab implication (inference).** The island's colour, light and weather can carry the arc on their own, for example morning light at stage 1 and golden or sunset light at stage 6. This also helps younger and EAL readers.

### 1.4 Cultural storytelling done with a community

- **Never Alone (Kisima Inŋitchuŋa).** It was made by Upper One Games, owned by the Cook Inlet Tribal Council, together with Iñupiat elders and storytellers. It is narrated in Iñupiaq by an elder. Instead of rewarding combat, it unlocks "cultural insights": short videos of community members. **[S]** https://en.wikipedia.org/wiki/Never_Alone_(video_game)
  - One Iñupiaq contributor: "we aren't a museum piece." **[S, academic]** https://journals.kent.ac.uk/index.php/transmotion/article/download/245/1014?inline=1
- **Lab implication (inference).**
  - For Londinium, "insight" unlocks should use real finds, such as Museum of London Archaeology objects or the Bloomberg writing tablets, voiced by curators or archaeologists rather than invented facts.
  - For nature centres, the local ranger is the equivalent "elder."

### 1.5 Characters inside builders: advisors, secretaries, narrators

- **SimCity 2000's advisors** were poorly received because they only "pop up to give brief advice and complain." **[S, wiki]** https://simcity.fandom.com
- **Isabelle** works because she has a job (ordinances, projects, announcements). **[S]** https://nookipedia.com/wiki/Shizue
- **Mr. Resetti.** His scolding of players who reset made young children cry. Aya Kyogoku confirmed it in Iwata Asks for New Leaf, so the team made him optional, and he was later replaced by autosave. **[P via Iwata Asks]** https://iwataasks.nintendo.com/interviews/3ds/animalcrossing-newleaf/0/1 and https://en.wikipedia.org/wiki/Mr._Resetti
  - This is the clearest documented case of a helper character shaming children for a "mistake." The AI helper must never scold a retry.
- **Frostpunk's Book of Laws** tells the story through policy. Every law moves Hope and/or Discontent, and the game's "zeitgeist" voice comments on what you have become. **[S, developer interview]** https://www.pcgamer.com/frostpunk-developers-on-hope-misery-and-the-ultimately-terrifying-book-of-laws

---

## 2. Choice architecture with few options

### 2.1 Binary and ternary choice systems

- **Reigns** (the developers' Game Developer deep dive). **[P]** https://gamedeveloper.com/design/game-design-deep-dive-creating-an-adaptive-narrative-in-i-reigns-i-
  - Cards sit in a weighted bag that is rebuilt from the global state on every swipe.
  - A card only appears if its conditions hold, such as a marriage or a strong church.
  - "Bigger" cards are drawn more often.
  - Tiny sub-bags handle set pieces, and a one-card bag makes a linear scene.
  - Once players notice that some cards react to their past choices, every card feels meaningful.
  - Alliot on the four pillars: "As soon as we weighted the decisions… with consequences on the 4 dimensions of power, we gave a lot of meaning to very simple swiping gestures." **[S, quote]** https://pcgamer.com/how-reigns-and-its-forthcoming-sequel-make-their-tinderocracy-work
  - GDC talk "The Casual (but Regal) Swipe." **[P, video]** https://gdcvault.com/play/1024278/The-Casual-(but-Regal)-Swipe
- **Lifeline** offers only two choices, uses only dialogue, and paces in real time. Its writer, Dave Justus, set the message timing himself. **[S, developer interview]** https://www.gameanalytics.com/blog/lifeline-3-minute-games-interview and https://www.gamedeveloper.com/design/building-a-narrative-out-of-push-notifications-in-i-lifeline-i-
- **Night in the Woods** usually offers two lines of dialogue, then the conversation carries on. Benson credits Twitter with teaching him concision. Hockenberry wrote "people, not types": everyone "messes up." **[S]** https://www.engadget.com/2014/06/17/night-in-the-woods-snappy-dialogue-inspired-by-twitter/ and https://gamedeveloper.com/business/road-to-the-igf-infinite-fall-s-i-night-in-the-woods-i-
- **Slay the Spire** offers one card from three. Mega Crit balanced it on pick rate and on how often a card appears in winning decks, aiming for every card to be viable, not equal. **[P: GDC 2019]** https://www.gamedeveloper.com/design/how-i-slay-the-spire-i-s-devs-use-data-to-balance-their-roguelike-deck-builder
- **Inscryption** puts its story into card rituals (sacrifice), and Mullins "constantly fretted" about card legibility. **[S, interview]** https://www.gamedeveloper.com/design/how-game-jam-sacrifices-became-inscryption

### 2.2 Keeping branching under control

- **Branch-and-bottleneck.** Sam Kabo Ashwell's patterns: branches rejoin at shared events, and the structure needs heavy state-tracking or it becomes a "gauntlet." **[P]** https://www.ifwiki.org/Standard_Patterns_in_Choice-Based_Games
  - Emily Short also covers small-scale structures. **[P]** https://emshort.blog/2016/11/05/small-scale-structures-in-cyoa/
- **Quality-based and salience-based narrative.** Content is unlocked by qualities, or the system picks the most specific content that applies. **[P]** https://emshort.blog/2016/04/12/beyond-branching-quality-based-and-salience-based-narrative-structures/
  - See also Kreminski on storylets. **[P]** https://emshort.blog/2019/01/06/kreminski-on-storylets/
- **Resource narrative.** Alexis Kennedy: the resources should line up with "the grain of the story." **[P]** https://weatherfactory.biz/?p=6991
- **80 Days** (Ingold). **[P]** https://www.gamedeveloper.com/design/threats-luggage-and-mild-peril-designing-i-80-days-i-
  - The game is "randomly authored" rather than randomly generated.
  - The plot supplies its own resources: "the plot gave us those for free."
  - Content is "branchified" with echoes of earlier choices.
  - "More content than any player can be bothered to play."
- **Sorcery!**
  - Ink tracks every choice by default, so writers can branch on any earlier choice without extra bookkeeping. **[S, developer]** https://mcvuk.com/development-news/want-your-story-to-drive-your-game-rather-than-vice-versa-inkle-and-failbetter-discuss-the-storytelling-potential-of-the-open-source-ink
  - Rewind exists because "gamebooks are… basically unfair." **[S, developer quote]** https://www.pocketgamer.biz/the-making-of-sorcery/
- **Slay the Princess** keeps its "stage" deliberately small: each chapter replays a shared opening, and earlier choices reshape the next loop's text and art. **[P, developer deep dive]** https://gamedeveloper.com/design/deep-dive-player-centered-narrative-design-in-slay-the-princess
  - **Lab relevance:** the retry button can work like this. A retry replays the same stage, and the helper remembers what happened last time.

### 2.3 Telegraphing, illusion and acknowledgement

- **Telltale's "X will remember that"** carries emotional weight even when the plot converges. **[S]** https://criticsatlarge.ca/2014/10/illusory-choice-memory-and-consequence.html
  - When nothing ever pays off, players notice. **[S]** https://gameinformer.com/b/features/archive/2015/02/03/why-your-choices-dont-matter-in-telltale-games
  - **Rule (inference):** only announce memory you will actually cash in.
- **Return of the Obra Dinn** confirms guesses only in batches of three. This keeps players uncertain without letting them brute-force answers. **[S]** https://unwinnable.com/2018/12/05/obra-dinn/ and https://www.gamespot.com/articles/best-games-of-2018-return-of-the-obra-dinn/1100-6463891
  - Lucas Pope tried a hint system and dropped it. **[S]** https://automaton-media.com/articles/newsjp/20231019-268684/
- **Heaven's Vault** lets players accept translation guesses that may be wrong, and the story follows up on mistranslations later. "We made about twenty prototypes." **[S, developer quotes]** https://gamedeveloper.com/design/how-inkle-developed-its-own-ancient-language-for-i-heaven-s-vault-i-
  - This is the closest commercial analogue to the helper's "guess + % sure" (inference). Interpretation is uncertain, and that uncertainty is the fun and the lesson.
- **Her Story.** "If you can Google, you can play Her Story." Players assemble the story by searching 271 clips. Barlow did not nudge players towards particular words. **[S, developer quote]** https://www.mcvuk.com/crime-pays-the-making-of-her-story/
  - **Lab relevance:** the facilitator can invite a child-authored "fourth card" (free text) in a stretch mode. Even if it maps to the nearest of the three, the child is still practising writing a prompt.

### 2.4 Narrator and voice models for the AI helper

- **Disco Elysium.** Twenty-four skills speak as distinct voices in the protagonist's head, cutting in "at the right time," each with its own tone. **[S]** https://www.gamebanshee.com/k48wh
  - A helper could have two inner "voices": a confident Guess and a cautious Doubt (inference). The "% sure" figure becomes a personality rather than a number.
- **The Stanley Parable.** The narrator describes what you should do, then reacts when you don't. Wreden wanted to know "what would happen if you were able to disobey the narrator." **[S]** https://en.wikipedia.org/wiki/The_Stanley_Parable and https://killscreen.com/inside-stanley-parable-game-no-one-can-describe
  - This suggests helper lines that react to a retry: "Ah. We're trying the other card. Brave."
- **GLaDOS and Portal.** Valve's playtests found players like hearing GLaDOS, but not while they are solving a puzzle. **[P: developer commentary]** https://theportalwiki.com/wiki/Portal_developer_commentary
- **Hades.** Kasavin's question was "what would these characters talk about and what would they notice?" Pools of lines are triggered by situations and weighted. The explicit goal was "to take the pain out of dying." **[S, developer quotes]** https://gamedeveloper.com/design/how-supergiant-weaves-narrative-rewards-into-i-hades-i-cycle-of-perpetual-death
  - Kasavin also says that without a visual map of connections, content got harder to manage as it grew. **[S]** https://gamespot.com/articles/hades-writer-explains-script-philosophy-after-player-discovers-incredible-detail/1100-6482650/
  - **Lesson:** keep a flag map from day one.
- **Jackbox's "Jack Principles".** **[S, company playbook as reported]** https://builtin.com/articles/jackbox-games-design-party-pack
  - Give players one task at a time, limit their choices, and make clear that the game is waiting on them.
  - "Create the illusion of awareness" by responding to each player's specific input "with apparent intelligence and emotion," like a live host.
  - Use dialogue to build intimacy.

---

## 3. Feedback, failure and safe consequence

- **Into the Breach.** Enemy attacks are telegraphed so every loss is legible and feels like the player's own doing. The mechanic came from one FTL enemy that showed its attacks in advance. **[S, Subset interview]** https://gamedeveloper.com/game-platforms/road-to-the-igf-subset-games-i-into-the-breach-i-
  - GDC 2019 postmortem. **[P, video]** https://www.gdcvault.com/play/1025772/
- **Celeste.** Failure is cheap and safe: a respawn point in every room, a setback of 15–30 seconds, and music that keeps playing through death. Assist Mode lets players change the rules. **[S]** https://hypercritic.org/collection/extremely-ok-games-celeste-2018-review and https://www.vice.com/en/article/d3w887/celeste-difficulty-assist-mode
- **Outer Wilds** (Beachum and Verneau). **[S, developer quotes]** https://www.gamedeveloper.com/design/live-die-repeat-how-i-outer-wilds-i-piques-curiosity-in-an-ambivalent-solar-system
  - "Knowledge being the only real thing of value."
  - Extrinsic rewards were cut so that curiosity is the only reason to explore.
  - An early opening (an object crashing into the village) failed because players didn't yet know the village. A change only means something against a baseline the player already understands.
  - Guidance comes from clues, not waypoints.
- **Keep Talking and Nobody Explodes** (Kane, GDC 2016). **[S, detailed quotes]** https://gamedeveloper.com/design/finding-the-fun-in-bomb-defusal-with-i-keep-talking-and-nobody-explodes-i-
  - Rules must be "totally unambiguous." Ambiguity leaves players "wrong and feeling cheated, or right and feeling unsatisfied."
  - "Simple and deliberate inputs," so difficulty lives in decisions, not dexterity.
  - A **hidden** score adds disruptions when a team is doing well, to avoid a death spiral and produce close finishes.
  - Some ambiguity was only found by watching: no group ever reported the ambiguous "second wire."
  - **Implication (inference):** the vague card must be deliberately ambiguous, and every other card must be unambiguous. Test this by watching children, not by asking them.
- **Powered by the Apocalypse partial success.** A middling result means "things go right with a downside." **[S]** https://drolleries.substack.com/p/the-gm-burden-of-adjudicating-partial
- **Citizen Sleeper's clocks**, adapted from Blades in the Dark, are visible progress bars that the player largely controls. **[S, developer interview]** https://www.rascal.news/tracing-citizen-sleepers-circuitous-vector-from-tabletop-to-hit-video-game/
  - **Lab relevance:** a visible "sunset clock" in the lighthouse lab, or a "battery clock" in the rover lab, is fairer than a hidden timer.
- **Children's-media feedback research.**
  - A study of 76 preschool edutainment games from major US networks found that most relied on simple right/wrong verification. Few gave elaborative feedback explaining why, and many skipped negative feedback entirely. **[P, academic]** https://reacheveryreader.gse.harvard.edu/review-of-feedback-in-edutainment-games-for-preschoolers-in-the-usa
  - WGBH and PBS's Design Squad game *Feed the Fidgits* diagnosed failures by severity and frequency and gave graded hints without giving away solutions. **[S, developer portfolio]** https://colinegge.netlify.app/projects/feedthefidgets/
- **Praise research.** In Mueller and Dweck (1998), children praised for intelligence chose easier tasks after failing and misreported their scores, while children praised for effort did not. **[P, JPSP 75(1)]** Summary: https://parentingscience.com/praise-and-intelligence/
  - Later meta-analyses (Sisk et al. 2018) found smaller average effects.
  - The robust part is that person-praise ("you're smart") is riskier than specific process feedback.

---

## 4. Session and progression structure

- **Kishōtenketsu.** Hayashida builds Mario levels in four beats: introduce, develop, twist, resolve. **[S]** https://www.engadget.com/2015/03/17/super-mario-3d-world-design/
- **Portal.**
  - Valve playtested every week.
  - Players learn the incinerator by using it on the Companion Cube before the boss fight, rather than being told.
  - Unexpected clever solutions were sometimes kept.
  - **[P/S]** https://theportalwiki.com/wiki/Portal_developer_commentary and https://www.gamedeveloper.com/pc/best-of-gdc-the-secrets-of-i-portal-i-s-huge-success
- **A Short Hike.** One developer controlling the pacing gave it a clear beginning, middle and end, and the game rewards going off the obvious path. **[S]** https://www.gamedeveloper.com/disciplines/road-to-the-igf-adam-robinson-yu-s-i-a-short-hike-i-
  - GDC postmortem. **[P, video]** https://gdcvault.com/play/1026613/Independent-Games-Summit-Crafting-A
- **The rule of three and cumulative tales.**
  - Propp's "trebling": the first two attempts build tension and the third resolves it, often with a twist. **[S]** https://en.wikipedia.org/wiki/Rule_of_three_(writing)
  - In cumulative tales (*The House That Jack Built*), each step repeats everything before it. Stith Thompson notes they have "something of the nature of a game." **[S]** https://en.wikipedia.org/wiki/Cumulative_tale and https://chaintales.blogspot.com/2018/05/stith-thompson-folktale.html
  - **Implication (inference):**
    - Three cards is already the folk-tale number. Two clear cards and a vague one echoes the "two build, third twists" pattern.
    - A cumulative recap ("We dug the pond, that we shaped with shelves, that we planted with reeds…") is a natural stage-6 artefact. Children can read it aloud together.
- **Endings and replay.**
  - 80 Days' over-supply of content invites replay. **[P]**
  - Papers, Please's newspaper shows delayed results of past decisions. **[S]** https://bigthink.com/?p=42828

---

## 5. A taxonomy of consequence types

| # | Type | What it is | Game examples | Use in DeltaOps labs |
|---|---|---|---|---|
| 1 | **Immediate visible** | The world changes at once | Townscaper blocks; Reigns' meter shift | Every card: the island changes within 2 seconds |
| 2 | **Meter shift** | An abstract resource moves | Frostpunk Hope/Discontent; Reigns' pillars | Two meters per lab, shown alongside things in the world (frogs, visitors) |
| 3 | **Trade-off** | A gain on one axis costs another | Reigns; Frostpunk laws | Clear cards A and B always trade the two meters against each other |
| 4 | **Partial success / fail forward** | It works, with a complication | PbtA 7–9 results; Sorcery! | The vague card's typical result: a funny or interesting complication |
| 5 | **Telegraphed** | The outcome is previewed before commitment | Into the Breach | "Guess + % sure" before Go/Rephrase |
| 6 | **Delayed callback** | An earlier choice pays off later, explicitly | Telltale "will remember"; Papers, Please newspaper; 80 Days echoes | One planted flag per lab, cashed at stage 4, with the helper naming it |
| 7 | **Cumulative** | Small choices add up | Obra Dinn batches of three; Reigns over a reign | The stage-6 cumulative recap; the artefact reflects all six choices |
| 8 | **Gating / unlocking** | Content appears only if state holds | Reigns conditions; Fallen London storylets | Bonus "insight" cards (Never Alone style) unlocked by curiosity |
| 9 | **Knowledge (meta)** | The player learns something that changes future play | Outer Wilds; Heaven's Vault | Learning that vague prompts produce low "% sure", carried into later stages and later labs |
| 10 | **Reinterpretation** | Later information reframes earlier events | Slay the Princess; Stanley Parable; Her Story | Stage-6 reveal (e.g. the rover's "selfie" turns out useful) |
| 11 | **Social / out-of-game** | The consequence happens in the room | KTaNE; Jackbox; Overcooked | Facilitator discussion; the team explains its choice to another team |
| 12 | **Cosmetic acknowledgement** | Flavour only, but it shows the game noticed | Hades lines; Night in the Woods | Helper echo lines; small props left on the island |
| 13 | **Ending / artefact** | The run produces a keepable summary | 80 Days' journey log; Frostpunk's ending review | Habitat plan, rover spec, expedition map, traveller's diary |

**Rules for using these (inference, built on the sources above):**
- Every choice gets at least types 1 and 12.
- Every stage gets at least one of types 3 or 4.
- Each lab gets exactly one strong type 6.
- Each lab gets one type 13.
- Use type 10 sparingly, at most once per lab, at stage 6.

---

## 6. Group play and facilitation

- **Keep Talking and Nobody Explodes.** "The fun really lives between players." The game is built on asymmetric information, and its designers demoed constantly, "eavesdropping" on how people talked as they played. **[S, quotes]** https://gamedeveloper.com/design/finding-the-fun-in-bomb-defusal-with-i-keep-talking-and-nobody-explodes-i-
- **Jackbox.**
  - Players join from a browser with a room code, and there are only three input types: pick, draw or type.
  - Designers test with family members.
  - "Winning is secondary": laughter is the goal.
  - **[S]** https://builtin.com/articles/jackbox-games-design-party-pack
- **Overcooked.**
  - "Just a few buttons that do everything," and "every single person has an integral role."
  - Players have to talk before they find a working division of labour.
  - Duncan finds people more animated in co-op than in competitive play.
  - **[S, developer quotes]** https://www.gamereactor.eu/every-single-person-has-an-integral-role-in-overcooked/ and https://gamedeveloper.com/design/road-to-the-igf-ghost-town-games-i-overcooked-i-
- **Never Alone** pairs two players with different abilities (girl and fox). **[S]**
- **Escape rooms.** Nicholson's survey of 175 facilities covers puzzle types and how game masters give hints. **[P]** http://scottnicholson.com/pubs/erfacwhite.pdf
- **Exploratorium "Active Prolonged Engagement" (APE).** Exhibits work when visitors ask and answer their own questions. **[P/S]** https://informalscience.org/research/fostering-active-prolonged-engagement-art-creating-ape-exhibits/

**Implications for roles at the table (inference).** In a group of 4–6 children, rotate these roles each stage:
- **Reader:** reads the cards aloud.
- **Picker:** taps the chosen card after a vote.
- **Checker:** reads the "% sure" and says whether to go or rephrase.
- **Spotter:** names one change in the world.

This follows Overcooked's "integral role" and KTaNE's information split. The facilitator holds information on the facilitator card that the children don't have.

---

## 7. Mars delay: a real-world anchor for the rover lab

NASA does not drive rovers in real time. Rover drivers write the next sol's command sequence (a sol is a Martian day), test it on a digital twin, and send it once a day, like "sending an email to Mars." The one-way signal delay is about 4–24 minutes, depending on where the planets are. **[S]** https://www.popsci.com/technology/article/2012-07/mars-rover-drivers and https://www.astronomy.com/?p=118375

This makes "write a precise instruction, then wait to see how it's interpreted" literally true for the rover lab. It is the strongest real-world justification in the set for why precise prompts matter (inference).

---

## 8. Voice and style guide: AI helper and facilitator (ages 7–13)

### 8.1 Two voices, two jobs

| | **AI helper** (in the world, scripted) | **Facilitator** (in the room, human, guided by cards) |
|---|---|---|
| Narrative role | A character and narrator on the island, like Isabelle, the Stanley Parable narrator or Disco Elysium's inner voices | Game master or mission control, outside the world, like a KTaNE expert or an escape-room host |
| Knows | Only what the card says, plus the world state | What the helper misread, why, and the real-world fact |
| Speaks | Before a choice (guess + % sure) and after it (what happened). Silent while children decide (Portal) | Between stages, with questions |
| Never | Scolds, says "wrong," or comments on how long a retry took (Resetti) | Gives the answer before the children have had a go |
| Tone | Eager, literal-minded, honest about uncertainty, gently funny | Curious, warm, asks "why," and gives children the credit |

### 8.2 Readability targets

- **On-screen reading level:** aim for roughly age 8. That way 7-year-olds can read it with a peer, and 11–13-year-olds don't feel talked down to; vocabulary and humour can lift the older end.
- **Sentence length:** at most 12 words, averaging about 8. Sources for ages 6–8 cluster at 5–11 words per sentence. **[S]** https://readabilityformulas.com/writing-for-2nd-grade-readers/ and https://educationstandards.nsw.edu.au/flippingbook/speaking-and-listening/files/assets/basic-html/page18.html
- **Speech bubbles:** at most 25 words and at most 3 sentences. Night in the Woods' "tweet-length" discipline is the model.
- **Cards:** at most 10 words, starting with a verb ("Add a gentle ramp for froglets").
- **One new technical word per stage, glossed in the world.** For example, "Margin (the pond's edge)."
- **Language for EAL readers:** no idioms, no sarcasm in the helper, and concrete nouns. Use numbers as digits ("72% sure").
- **Audio:** if lines are voiced, keep them under 6 seconds each, and never play them while the card-choice screen is waiting.

### 8.3 Showing a mistake without shaming

1. **The helper owns its guess.** It says "I guessed…", never "You said it wrong."
2. **Name the gap, not the child.** For example: "'Somewhere nice' could mean lots of places. I picked shade."
3. **Make the outcome interesting, not punishing.** The vague card yields a funny or useful complication (fail forward), never a dead end.
4. **Make a retry cheap and celebrated.** For example: "Want to tell me more exactly? I'm listening." Retrying costs no stars, and Curiosity XP goes up.
5. **Praise the process, specifically.** Say "You added *where* and *why*. That made me 91% sure." Never say "You're so smart." (Mueller and Dweck.)
6. **Give an elaborative why** (PBS feedback research). Every outcome line includes a "because."
7. **No Resetti energy.** No sighs, no "again?", no timers on retries.

### 8.4 Humour rules

- Literal-mindedness is the main source of jokes: lawn instead of "green stuff," a cup of tea in Roman London, a rover selfie.
- Physical comedy happens in the world (a duck slips), and never at a child's expense.
- At most one joke per bubble.
- Humour is never used on a stage that deals with real harm, such as the injured walker in the lighthouse lab.

### 8.5 Helper line templates

- **Guess:** "I think you mean **[interpretation]**. I'm **[N]%** sure."
- **Low-confidence guess:** "Hmm. **[Word]** could mean **[x]** or **[y]**. I'll guess **[x]**. **[N]%** sure."
- **Outcome (clear card):** "Done! **[Visible change]**, because **[reason]**."
- **Outcome (vague card):** "Done… ish. **[Literal result]**. That's not quite **[likely intent]**, is it?"
- **Callback:** "Remember when we **[earlier choice]**? Look what's happening now."
- **Retry acknowledgement:** "Trying the other way. Good thinking. Scientists do this all the time."

### 8.6 Facilitator card template (one per stage)

- **Notice:** "What changed on the island?" (everyone can answer)
- **Explain:** "Why was the helper only 40% sure?" (ages 9 and up)
- **Transfer:** "When do *you* give instructions that could mean two things?" (ages 11 and up)
- **Secret:** the real-world fact or the misreading, for example "Real ponds need a shallow edge because…"
- **Move on when:** "Someone has named the trade-off."

### 8.7 Good and bad examples

- **Bad:** "Wrong! The pond is too dark. Try again." This shames the child and gives no reason.
- **Good:** "I put the pond under the big oak. 'Somewhere nice' = shady to me! But leaves will fall in. 38% sure was a clue…"
- **Bad:** "Excellent choice, you're a genius!" This is person-praise.
- **Good:** "You told me *where* and *who it's for*. That's why I was 92% sure."

---

## 9. Authoring model: making 729 routes manageable

**Structure.**
- Six bottleneck stages, each with three cards: **A** (clear, favours meter 1), **B** (clear, favours meter 2) and **V** (vague, lower % sure, fail-forward result).
- Every route passes through all six stages, so there are no dead ends and no early endings. This is Ashwell's branch-and-bottleneck pattern.

**State.**
- Each stage writes one flag (e.g. `S2=A`) and moves two meters.
- Only **two flags per lab are "load-bearing"**:
  - **P (planted):** cashed in at the stage-4 callback.
  - **Q:** colours the stage-6 artefact or reveal.
- Every other flag only affects echo lines and props.

**Text selection.** This works like the Reigns bag, or Hades/salience selection: pick the most specific line whose conditions hold, falling back to a default.

**Unit count per lab, approximately:**
- 18 card texts
- 18 guess lines (each with its "% sure")
- 18 outcome lines
- 18 retry acknowledgements (these can be shared)
- 6–9 echo lines (stage *n* referring to stage *n*-1, A/B/V variants)
- 3 callback variants at stage 4
- 18 artefact fragments
- 3 meter-band ending lines (high/balanced/low)
- 6 facilitator cards

**Total: about 110 short units, versus 729 hand-written routes.**

**Tooling.**
- Use Ink, which tracks every choice by default.
- Build a flag map from day one; Kasavin's warning about Hades applies.
- Run an automated playthrough of all 729 routes to check that every route produces text for every slot. inkle integrated automated testing for Heaven's Vault. **[P]** https://gdcvault.com/play/1025149/-Heaven-s-Vault-Creating

**Balance.**
- Log pick rate and retry rate per card (Slay the Spire).
- A card picked under 10% or over 70% of the time needs rewriting.
- If a vague card is retried less than 50% of the time, its "% sure" or outcome isn't signalling the problem clearly enough.

---

## 10. Worked arcs for all four labs

Each lab uses the same shape: **ki** (stage 1, cannot fail, teaches guess / % sure), **shō** (stages 2–3), **ten** (stage 4 twist plus callback), stage 5 (the hardest trade-off) and **ketsu** (stage 6 resolution plus cumulative recap and artefact).

In the tables, V marks the vague card, and the "% sure" figures are suggested values.

### 10.1 Pond: "Design a pond that wildlife and visitors can share"

**Setting.**
- Meters: **Wildlife** and **Visitors**.
- Light runs from morning to dusk.
- Planted flag P = `EDGES`. Q flag = `SITE`.

| Stage | Beat | Card A (Wildlife) | Card B (Visitors) | Card V (vague) | Visible change / fail-forward | Flag |
|---|---|---|---|---|---|---|
| 1 Dig | Ki | "Dig in the sunny meadow, away from the path" (92%) | "Dig beside the path so people can see" (90%) | "Put it somewhere nice" (38%): the helper picks under the big oak | A: insects arrive; B: a family stops to look; V: shade, with leaves dropping in | `SITE` |
| 2 Edges | Shō | "Make gentle muddy shelves at the edge" (88%) | "Build steep stone sides, neat and tidy" (91%) | "Make it look natural" (45%): the helper adds plastic rocks | A: sloped margin; B: a crisp stone rim; V: shiny fake rocks (the helper: "Natural-ish?") | **`EDGES`** |
| 3 Plants | Shō | "Plant native reeds and water lilies" (90%) | "Plant bright garden flowers round it" (89%) | "Add lots of green stuff" (35%): the helper lays lawn turf | A: dragonflies; B: colour and photos; V: lawn up to the water | `PLANTS` |
| 4 First froglets | **Ten + callback** | "Add a ramp so froglets can climb out" | "Put up a fence to keep people back" | "Help the frogs" (50%): the helper puts out a bowl of water | **Callback:** if `EDGES=B`: "Remember the steep sides? Froglets can't climb out." If A: "Your shelves are working, look!" plus a new problem: a school group with nets. If V: fake rocks get hot in the sun | `RESCUE` |
| 5 Sharing | Hardest trade-off | "Build a small bird hide, hidden in reeds" | "Build a boardwalk and dipping platform" | "Let everyone see everything" (40%): the helper floodlights the pond | A: shy birds return, fewer visitors; B: busy and fun, ducks leave; V: lights at night, moths confused (facilitator fact: light pollution) | `SHARE` |
| 6 Dusk survey | Ketsu + reveal | The helper "counts" visitors and wildlife, using `SITE`: the sunny meadow gets a dusk dragonfly display, the oak site gets a frog chorus but leaf-litter clean-up | Cumulative recap read aloud | Choose the plan's title | The **Habitat Plan** prints | |

**Facilitator secrets.**
- Stage 2: real ponds need at least one shallow edge so wildlife can get in and out.
- Stage 5: there is no single best answer. Nature centres zone their sites.

**Artefact fragments (Habitat Plan).**
- **Site:** "In the sunny meadow, for warmth" / "Beside the path, for people" / "Under the oak (watch for leaves!)"
- **Edges:** "Gentle shelves" / "Stone sides + ramp added" / "Real stones replace the fake ones"
- **Plants:** "Native reeds and lilies" / "Garden flowers" / "Lawn (we'd change this)"
- **Rule for visitors (from SHARE):** "Quiet near the hide" / "Dip nets from the platform only" / "Lights off after dusk"
- **Recap line:** "This is the pond, that we dug in the ___, with ___ edges, planted with ___, shared by ___."

### 10.2 Mars rover: "Drive the rover to the crater"

**Setting.**
- Meters: **Energy** (battery) and **Science** (Curiosity).
- A visible **sol clock**, in the style of Citizen Sleeper's clocks.
- Framing: commands go once a day, with a delay (section 7). The helper is the rover's onboard planner.
- Planted flag P = `ROUTE`. Q flag = `CAMERA`.

| Stage | Beat | Card A (Energy) | Card B (Science) | Card V | Change / fail-forward | Flag |
|---|---|---|---|---|---|---|
| 1 Wake-up checks | Ki | "Point solar panels at the Sun, then check battery" (94%) | "Take a 360° photo of the landing site" (92%) | "Get ready" (30%): the helper stows everything and does nothing | A: battery up; B: a panorama appears, and a strange layered rock is spotted; V: a whole sol spent being "ready" | `START` |
| 2 Route | Shō | "Take the long smooth plain around the rocks" (88%) | "Drive straight across the boulder field" (85%) | "Go that way" (25%): which way? The helper picks the nearest dune | A: slow, safe; B: fast, wheels scuffed; V: sand ripples, slow going | **`ROUTE`** |
| 3 Camera | Shō | "Photograph only where we're driving" (90%) | "Photograph anything with layers or colours" (86%) | "Take a picture of something interesting" (33%): the helper takes a selfie | A: saves energy; B: finds possible water-formed rock; V: rover selfie (real rovers take these, with useful wheel checks) | `CAMERA` |
| 4 Dust storm | **Ten + callback** | "Park, point panels, wait it out" | "Keep driving using the hazard cameras" | "Be careful" (40%): the helper drives at 1 cm per minute | **Callback:** if `ROUTE=B`: "Remember the boulder field? A wheel is damaged. Driving in this storm is risky." If `ROUTE=V`: "The dune sand is sliding." If A: "Smooth plain, good news, but dust is covering our panels." | `STORM` |
| 5 Science stop | Hardest trade-off | "Skip the rock, save power for the crater" | "Stop and drill a sample of the layered rock" | "Do science" (35%): the helper measures the air temperature and stops there | A: arrive with power; B: a big science win, little battery; V: a small but real result | `SAMPLE` |
| 6 Crater rim | Ketsu + reveal | Arrive at the rim at sunset on the sol clock. If `CAMERA=V`, the reveal is that the selfie shows the damaged wheel, so engineers can plan the repair | Recap | Name the rover | The **Rover Spec Card** prints | |

**Facilitator secrets.**
- Stage 1: real drivers send one plan per day, and the signal takes minutes to arrive.
- Stage 3: Curiosity and Perseverance really do take selfies to inspect themselves.

**Artefact fragments (Rover Spec / Mission Log).**
- **Power plan:** "Sun-first" / "Science-first" / "Get-ready-first (lesson learned)"
- **Route:** "Smooth plain (safe)" / "Boulder field (fast, wheel damage)" / "Dune detour"
- **Instruments used:** "Navigation camera" / "Colour camera + drill" / "Selfie camera (wheel check!)"
- **Storm decision:** "Waited" / "Drove carefully" / "Crept"
- **Upgrade request** (children write it; the facilitator suggests if needed): "Next rover needs ___ because ___."
- **Recap line:** "This is the rover, that took the ___ route, that photographed ___, that survived the storm by ___, that reached the crater on sol ___."

### 10.3 Lighthouse camp: "Get your team to the lighthouse before sunset"

**Setting.**
- Meters: **Time** (a visible sunset clock) and **Team Energy**.
- Planted flag P = `PACK`. Q flag = `KIND`.
- Tone: mild peril, as in 80 Days. No real harm.

| Stage | Beat | Card A (Time) | Card B (Energy) | Card V | Change / fail-forward | Flag |
|---|---|---|---|---|---|---|
| 1 Pack | Ki | "Pack the map, torch and water" (93%) | "Pack snacks, sun hats and plasters" (91%) | "Bring useful stuff" (34%): the helper packs a kite, a frying pan and a map | A: light bag; B: happy team; V: heavy bag, slower, but there is a map | **`PACK`** |
| 2 Path | Shō | "Take the cliff-top path, it's quicker" (89%) | "Take the beach path, it's flatter" (88%) | "Go the nice way" (40%): the helper picks the scenic woodland loop | A: fast but steep; B: easy, but the tide matters later; V: lovely and long | `PATH` |
| 3 Rest | Shō | "Quick five-minute water stop" (90%) | "Proper picnic and a game" (90%) | "Have a break" (45%): the helper plans a 2-hour nap | A: time kept; B: energy restored; V: big energy, sunset much closer (the sun visibly moves) | `REST` |
| 4 Sea fog rolls in | **Ten + callback** | "Use the map and compass to follow the path" | "Hold hands and follow the fence line slowly" | "Find the way" (35%): the helper follows a seagull | **Callback:** if `PACK=A`: "Remember the torch you packed? Switch it on!" If `PACK=B`: "No torch… but the plasters help after a stumble." If `PACK=V`: "The kite! Fly it high so the lighthouse keeper sees us." (A fail-forward win) | `FOG` |
| 5 Someone needs help | Hardest trade-off | "Keep going, and tell the ranger by radio" | "Stop and help the lost walker find their dog" | "Be kind" (50%): the helper gives the walker all your snacks | A: on time; B: late but a new friend (the walker knows a shortcut, a partial time refund); V: kind, hungry team | **`KIND`** |
| 6 Lighting the lamp | Ketsu + reveal | Arrive and light the lamp. The sunset clock decides whether the lamp is lit before or after dark. Either way it ends well (Terra Nil's hopefulness): after dark, the lit lamp guides the walker home. If `KIND=B`, the walker and dog wave from the beach | Recap | Name the team | The **Expedition Map** prints | |

**Facilitator secrets.**
- Stage 4: real fog navigation uses handrails such as fences, walls and coastline.
- Stage 5: real outdoor groups have a "stay together, call for help" rule.
- **Camp leaderboard:** score "best explanation" and "kindest choice," not time alone.

**Artefact fragments (Expedition Map).** Drawn as a dotted route on the island map, with icons:
- **Pack list:** "Map, torch, water" / "Snacks, hats, plasters" / "Kite, frying pan, map (the kite saved us!)"
- **Path:** "Cliff-top" / "Beach" / "Woodland loop"
- **Fog:** "Compass" / "Fence line" / "Kite signal"
- **Help given:** "Radioed the ranger" / "Found the dog" / "Shared every snack"
- **Recap line:** "This is the lamp, that we lit at ___, after the fog that we beat with ___, on the ___ path, with a bag full of ___."

### 10.4 Roman Londinium: "Plan a day in Londinium for a traveller arriving by boat"

**Setting.**
- Meters: **Accuracy** (historically plausible) and **Curiosity** (new things discovered).
- Planted flag P = `QUAY`. Q flag = `GIFT`.
- Running joke: the vague card makes the helper commit **anachronisms**, which is what teaches accuracy. A historian must sign off every fact (inference).
- Suggested setting: early 2nd century AD. Check specific buildings and dates with a Roman Londinium specialist (for example Museum of London Archaeology). The "insight" unlocks should be real objects (Never Alone model).

| Stage | Beat | Card A (Accuracy) | Card B (Curiosity) | Card V | Change / fail-forward | Flag |
|---|---|---|---|---|---|---|
| 1 Arrive at the quay | Ki | "Swap your foreign coins for Roman denarii" (92%) | "Hire a local guide who speaks Latin and British" (88%) | "Get ready for the day" (35%): the helper buys the traveller a souvenir mug saying "I ♥ LONDINIUM" | A: purse of correct coins; B: a guide character appears; V: anachronistic mug (the helper: "Did they have these? …No."), Accuracy dips | **`QUAY`** |
| 2 Breakfast | Shō | "Buy bread and olives at the market" (90%) | "Try oysters and fish sauce (garum) from a stall" (85%) | "Get something tasty" (30%): the helper orders a cup of tea | A: a plausible breakfast; B: a new taste (the "garum" insight card unlocks); V: tea, an anachronism, so a Roman stares | `FOOD` |
| 3 Morning | Shō | "Visit the forum to see the merchants and officials" (88%) | "Go to the bathhouse: hot, warm and cold rooms" (90%) | "See the important building" (40%): which one? The helper heads to the governor's palace and is turned away | A: the trade bustle; B: the bath sequence diorama; V: a polite refusal at the gate, but a glimpse of the palace | `PLACE` |
| 4 Lost in the streets / the purse | **Ten + callback** | "Ask a shopkeeper the way, in Latin" | "Follow the sound of the river back to the quay" | "Get help" (40%): the helper shouts for the Vigiles (fire-watch) | **Callback:** if `QUAY=B`: "Remember the guide you hired? She knows a shortcut." If A: "Good thing you have denarii: pay a boy to show you." If V: "The mug! A potter laughs and leads you to his workshop, a new discovery." | `LOST` |
| 5 Afternoon | Hardest trade-off | "Watch a show at the amphitheatre" (keep it child-appropriate: acrobats or a procession) | "Visit a craft workshop and try writing on a wax tablet" | "Do something fun" (35%): the helper looks for a cinema | A: spectacle and history; B: hands-on (the "writing tablet" insight unlocks); V: no cinema, so the helper finds street musicians | `AFTERNOON` |
| 6 Evening: write the diary | Ketsu + reveal | The traveller writes on a wax tablet. If `FOOD=B`, the reveal is that the garum amphora they saw came from Spain, so Londinium was an international port | Recap | Pick a gift for home (`GIFT`): lamp, brooch or the anachronistic mug ("Put it in a museum of mistakes!") | The **Traveller's Diary** prints | |

**Facilitator secrets.**
- Stage 1: Londinium was a trading port on the Thames.
- Stage 2: garum was a popular fermented fish sauce traded across the empire.
- Stage 4: Roman towns had no street names or numbers as we know them.

**Artefact fragments (Traveller's Diary, first person, "Day I").**
- **Arrival:** "I changed my coins at the quay." / "I met Sulis, my guide." / "I bought a strange mug (historians say: not Roman!)."
- **Food:** "Bread and olives." / "Oysters and garum, salty!" / "I asked for 'tea.' Nobody knew what that was."
- **Place:** "The forum was full of merchants." / "Hot, warm, cold, the baths!" / "The guard at the palace said no."
- **Lost:** "A boy guided me for a coin." / "Sulis knew a shortcut." / "A potter rescued me."
- **Afternoon:** "The amphitheatre roared." / "I wrote my name on a wax tablet." / "No cinema, but musicians."
- **Recap line:** "This is the diary, of the traveller who arrived at the quay, who ate ___, who saw ___, who got lost and was saved by ___."
- An **Accuracy footnote** lists each anachronism the group triggered, framed as "Mistakes we spotted," which supports a growth mindset.

---

## 11. Recommendations (updated and extended)

1. **Branch-and-bottleneck, with two load-bearing flags per lab** (Ashwell; Reigns; Kennedy). Write about 110 units, not 729 routes, and test every route automatically (inkle's practice on Heaven's Vault).
2. **Make every clear card a trade-off between the lab's two meters** (Reigns; Frostpunk).
3. **The vague card fails forward into something funny or useful** (PbtA; Sorcery!; KTaNE "totally unambiguous" for every *other* card).
4. **"Guess + % sure" is a telegraph:** show it before the world changes, and offer Go/Rephrase (Into the Breach; Heaven's Vault).
5. **Plant one callback per lab at stage 2 or earlier, and cash it at stage 4 with explicit words** (Telltale; Papers, Please; 80 Days). Never announce a memory that won't pay off.
6. **Retries are free, friendly and remembered** (Celeste; Hades; Slay the Princess's loops; and the Resetti cautionary tale).
7. **The helper is a literal-minded, honest, brief character who speaks before and after a decision, never during** (Portal; Disco Elysium; Stanley Parable; Night in the Woods). Follow the style guide in section 8.
8. **The facilitator is the game master and holds information the children don't** (KTaNE; escape-room hosts; APE). Use the Notice / Explain / Transfer / Secret card format.
9. **Use a kishōtenketsu arc with a cumulative recap** (Hayashida; Propp; cumulative tales). Stage 1 cannot fail, stage 4 twists, stage 6 recaps.
10. **Show the change in the world and keep text short:** colour, light and props carry the arc (Jenkins; Smith and Worch; Journey; Gris).
11. **Artefacts are assembled from fragments and include a "mistakes we spotted" or "what we'd change" line** (80 Days; Dweck; PBS feedback research).
12. **Reward reasoning and variety, not one optimal route** (Townscaper; Toca Boca; Slay the Spire's pick-rate logging). Camp leaderboards should score explanation, kindness and variety, not just time.
13. **Rotate table roles** (Reader, Picker, Checker, Spotter) so every child has an integral role (Overcooked; Jackbox's one-task-at-a-time).
14. **Ground each lab in real expertise:** NASA's once-a-day commanding for the rover, ranger and archaeologist "insight" cards for the others (Never Alone). Have a domain specialist check facts.
15. **Use a hidden tension dial:** if a team is sailing through, the stage-4 twist can be stronger, and if it is struggling, softer. This avoids death spirals and gives close finishes (KTaNE's hidden score).
16. **Watch children play rather than asking them** (KTaNE eavesdropping; Valve's weekly playtests). Log pick rates and retry rates per card.

---

## 12. Sources and reliability notes

**Primary, or developer-authored, sources.**
- Jenkins essay. https://web.mit.edu/~21fms/People/henry3/games&narrative.html
- Smith and Worch slides. https://www.witchboy.net/?p=621
- Reigns deep dive. https://gamedeveloper.com/design/game-design-deep-dive-creating-an-adaptive-narrative-in-i-reigns-i-
- Ingold on 80 Days. https://www.gamedeveloper.com/design/threats-luggage-and-mild-peril-designing-i-80-days-i-
- Short on beyond-branching. https://emshort.blog/2016/04/12/beyond-branching-quality-based-and-salience-based-narrative-structures/
- Kennedy on resource narrative. https://weatherfactory.biz/?p=6991
- Ashwell's standard patterns. https://www.ifwiki.org/Standard_Patterns_in_Choice-Based_Games
- Slay the Princess deep dive. https://gamedeveloper.com/design/deep-dive-player-centered-narrative-design-in-slay-the-princess
- Portal developer commentary. https://theportalwiki.com/wiki/Portal_developer_commentary
- Iwata Asks: New Leaf. https://iwataasks.nintendo.com/interviews/3ds/animalcrossing-newleaf/0/1
- Nicholson's escape-room white paper. http://scottnicholson.com/pubs/erfacwhite.pdf
- Preschool feedback study. https://reacheveryreader.gse.harvard.edu/review-of-feedback-in-edutainment-games-for-preschoolers-in-the-usa
- Exploratorium APE. https://informalscience.org/research/fostering-active-prolonged-engagement-art-creating-ape-exhibits/

**GDC talks I could only verify by listing** (video in the GDC Vault, some also on YouTube):
- Reigns. https://gdcvault.com/play/1024278
- Into the Breach. https://www.gdcvault.com/play/1025772/
- Keep Talking and Nobody Explodes. https://gdcvault.com/play/1023113
- Outer Wilds (GDC 2020).
- Jackbox. https://gdcvault.com/play/1027064
- Journey. https://gdcvault.com/play/1017700
- Hades. https://gdcvault.com/play/1026975
- Heaven's Vault. https://gdcvault.com/play/1025149
- A Short Hike. https://gdcvault.com/play/1026613

For these, I used detailed press write-ups that carry direct quotes. Watch the videos before quoting them in client-facing material.

**Secondary sources.** Every other URL above is journalism, wikis or blogs, and is marked [S] where it is cited.

**Weak sources I excluded.** shapes.inc fan pages, aggregator clones, and the uncorroborated claim that a psychologist was consulted on Gris.

**Contested.** The size of the Mueller and Dweck effect; the Sisk et al. 2018 meta-analysis found smaller average effects. The practical guidance (specific process feedback, avoid person-praise) holds either way.
