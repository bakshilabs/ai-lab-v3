# 05: Replayability. What makes children replay a game dozens or hundreds of times, and what DeltaOps should borrow

*Research brief for the DeltaOps Learning "AI labs": 6 stages × 3 cards, scripted AI helper, no accounts, ages about 7–13. Compiled 4 Nov 2026.*

## How to read this

**Evidence tags used throughout:**
- **[V]**: verified this session against the linked page, or against the full text of the source.
- **[S]**: taken from search-result summaries or secondary coverage. The link is given, but the primary source was not read.
- **[TK]**: from the researcher's prior knowledge. Not re-verified this session, because the shared web-search budget ran out partway through. A citation is given where known. Check before quoting externally.
- **[est.]**: the researcher's own estimate or inference.

**Corrections to the earlier short brief:**
1. **ICO Standard 13's headline does not mention "extending use".** It covers personal data and privacy protections only. Rules on "sticky" features and reward loops sit under **Standard 5, Detrimental use of data**. Both are quoted verbatim in §4.
2. **Geometry Dash level count.** Wikipedia now gives "over 150 million" online levels, not 100M+. The figure is inferred from the latest in-game level ID, so it counts every ID ever issued, including deleted and unlisted levels. Treat it as an upper bound.

---

## 1. Closing the gaps

### 1.1 RobTop / Geometry Dash: primary statements

- **RobTop's own Game Developer blog post** (Robert Topala, 11 Feb 2015, "Prioritize players and their experience to succeed in gaming") [V] https://www.gamedeveloper.com/business/prioritize-players-and-their-experience-to-succeed-in-gaming
  - On difficulty and retention: "if the game is too simple, then your most loyal players will get bored quickly and leave."
  - On the editor: "I create the tools so that users are empowered to do whatever they want with them."
  - On iteration: "the game has been iterated upon constantly as the community expanded and evolved."
  - On monetisation: "The best way to monetize those users is not by selling them dubious features that do little to change the game." The model is a free version plus "pay once, never pay again."
- **Fan-wiki Q&A with RobTop** (undated, behind a paywall/login; text seen only in a search snippet) [S] https://geometry-dash.fandom.com/f/p/2443726618099912139
  - "I really enjoy platform games, and I wanted to put some ideas into rhythm platformers."
  - On level design: "Don't add too much, sometimes a simple design will give a better result."
- **Not found:** any GDC talk, Reddit AMA, or formal interview in which RobTop explains instant restart, the attempt counter or practice mode. These conventions are documented only as features.

**Features** (Wikipedia, read in full) [V] https://en.wikipedia.org/wiki/Geometry_Dash:
- One-button input on an auto-scrolling camera. Hitting an obstacle restarts the level.
- **Practice mode** lets players place checkpoints. Completing a level in practice does not count as a normal-mode completion.
- **Platformer mode** (added in 2.2) has preset checkpoints and no auto-scroll.
- Six difficulty labels: Easy, Normal, Hard, Harder, Insane, Demon. User-made Demons have five sub-tiers.
- Each official level has three hidden secret coins on alternate paths, and coins gate the Demon levels.
- Completing levels earns stars (classic levels) and moons (platformer levels), which unlock icon cosmetics.
- A community-moderated **Demonlist** ranks the 150 hardest levels and checks completions are legitimate.

The attempt counter and the % progress bar with a best-% marker are standard UI that every player sees. Wikipedia does not describe them, so they are [TK]. They are visible in any gameplay video.

**Scale** [V] (Wikipedia):
- Downloads: about 20M by June 2014; RobTop reported nearly 80M by Feb 2015; Sensor Tower estimated 242M by Sep 2018 (about $21M revenue); more than 1.1 billion mobile downloads by June 2024.
- Steam concurrent-player peaks: about 9,500 after update 2.1 (2017); 88,346 after 2.2 (released 19 Dec 2023, after a gap of about 7 years); more than 100,000 in Jan 2026.
- PCGamesN [V] confirms the 88,346 peak, that 2.2 overhauled the editor, and that a fan-made editor guide runs to 200 pages: https://www.pcgamesn.com/geometry-dash/2-2-steam

**Kids as an audience** [V-ish]:
- Common Sense Media lists 323 kid reviews against 68 parent reviews. Kids call it "highly addictive and fun… a mix of excitement and frustration." https://www.commonsensemedia.org/app-reviews/geometry-dash
- No official age breakdown exists.

**What this suggests for designers** [est.]: Geometry Dash's longevity rests on three layers.
1. A brutally short failure loop, of about 1 second.
2. An honest, visible progress number: the best %.
3. A creator ecosystem that has outlived the official content many times over.

RobTop himself credits the third layer and steady iteration more than any single mechanic.

### 1.2 Celeste: sources read in full

**Vice, Assist Mode feature** [V] https://www.vice.com/en/article/d3w887/celeste-difficulty-assist-mode
- "Assist Mode breaks the game." Thorson says he spent "many hours fine-tuning the difficulty."
- The team accepts "that every player is different, and that people come into the game at many different skill levels."
- Strawberries, B-sides and Assist Mode exist to "help players find the challenge level that's right for them."
- Players should move between difficulty levels "without judgement or implication that they aren't playing the game 'as intended.'"
- Thorson wants players "to come out of this game feeling capable and powerful."

**Vice, later Assist Mode change** [V] https://www.vice.com/en/article/celeste-assist-mode-change-and-accessibility
- The original preamble text was "unintentionally undermining that purpose." It was rewritten after feedback from consultant Lexa and narrative designer Kathy Jones.
- The icon that "branded" Assist-mode save files was removed, because "the reasoning that got us to that design feels like the same exclusionary reasoning that affected the preamble text."

**Wikipedia** [V] https://en.wikipedia.org/wiki/Celeste_(video_game)
- Assist Mode options: slower game speed, unlimited dashes, invincibility. It was first called "Cheat Mode," which was judged "too judgmental."
- Strawberries are optional and add challenge.
- Hidden cassettes unlock harder **B-sides**. Clearing all B-sides unlocks **C-sides**.
- Chapters are made of single-screen rooms with checkpoints between them.
- Forgiveness mechanics include coyote time and input buffering, so the game prioritises the player's intent over pixel-perfect execution.

**Death counter and postcard** [TK]: Celeste shows a death count per chapter. A loading postcard tells players to "Be proud of your death count! The more you die, the more you're learning."

### 1.3 Other primary design statements verified this session

**Super Meat Boy postmortem** (Edmund McMillen) [V] https://www.gamedeveloper.com/audio/postmortem-team-meat-s-i-super-meat-boy-i-
- "Remove lives, reduce respawn time, keep the levels short and keep the goal always in sight."
- Frustration "needed to be removed at all costs."
- At the end of each level the game plays "an epic showing of all your past deaths," so players see "that they were getting better through their own actions."

**Angry Birds** (Arttu Mäki, Rovio, Pocket Gamer) [V] https://www.pocketgamer.com/angry-birds/exclusive-the-making-of-an-angry-birds-level/
- "We spend more time developing and tweaking the ratings than building the level."
- Ratings are "the final part of level building and is actually the most taxing process."
- A threshold is "usually an average from a score that can be achieved with a certain skill shot or method."
- "5-10 different people test the level multiple times."
- Some older levels were made easier because they were "proving to be too challenging."
- "We always encourage people to come back to older levels."

**Flappy Bird** (Dong Nguyen to Forbes, via Engadget) [V]: "I think it has become a problem… To solve that problem, it's best to take down Flappy Bird. It's gone forever." He said it was designed for a few relaxed minutes. https://www.engadget.com/2014-02-11-flappy-bird-creator-says-game-had-to-go-because-it-was-too-addic.html

**Plants vs. Zombies** (George Fan, GDC 2012, "How I Got My Mom to Play Through PvZ") [V] https://www.gamedeveloper.com/design/gdc-2012-10-tutorial-tips-from-i-plants-vs-zombies-i-creator-george-fan
- "a maximum of eight words on the screen at any given moment."
- "The best way for a player to learn is to actually perform actions."
- Introduce peripheral mechanics "very slowly."
- Show hints only to players who are struggling, so others get "the chance to feel smart."
- Don't flood players with irrelevant messages, or they stop reading all of them ("the little boy who cried wolf").
- Make visuals explain function.

**Wordle** (Josh Wardle, NYT via Boston.com) [S/V]: limiting play to one game a day "enforced a sense of scarcity… leaves people wanting more." He liked that everyone solves the same word on the same day. https://www.boston.com/news/national-news/2022/01/04/he-made-wordle-for-his-partner-now-its-an-online-hit/

**Rhythm Heaven** (Tsunku, Iwata Asks) [S]: "Just make it simple. Controls easy. Don't lean on the characters." He believes rhythm can be trained. https://iwataasks.nintendo.com/interviews/ds/rhythm-heaven/0/3

**Hades** (Greg Kasavin) [S]: "all of our games have sort of been concerned with this moment of failure." Every death advances the story. https://gdconf.com/news/roguelikes-and-narrative-design-hades-creative-director-greg-kasavin-gdc-podcast-ep-16

---

## 2. Widening the genre survey

| Game | Replay mechanic | Evidence |
|---|---|---|
| **Roblox obbies** | The child-native replay genre: obstacle courses with numbered stages, checkpoints that save your stage, skip-stage purchases, and a vast UGC supply. | [S/TK] No reliable genre-share statistics were found; search results were SEO spam. The genre's prominence is common knowledge [TK]. The **paid "skip stage"** pattern is a monetised-frustration warning sign [est.]. |
| **Cut the Rope** (ZeptoLab) | 0–3 stars per level, physically placed in the level, so a star is a route choice rather than a score threshold. Stars also gate later boxes. | [S] Wikipedia: stars "are necessary for unlocking later levels." Game Developer interview with Semyon Voinov: "we really wanted to put effort into the level design… we develop and build, iterate a level, and we test them well." Optional stars put the challenge on "trickier solutions." https://en.wikipedia.org/wiki/Cut_the_Rope_(video_game) ; https://gamedeveloper.com/business/interview-i-cut-the-rope-i-gets-a-not-sequel-with-i-experiments-i- ; GDC 2012 "Level Design Case Studies: Trainyard and Cut the Rope" https://gdcvault.com/play/1015344/contactUs |
| **Angry Birds** | Score-threshold stars set from designers' skill shots. | [V] above. |
| **Plants vs. Zombies** | Gradual mechanic reveal, then mini-games, puzzle and survival modes, and a Zen Garden once the campaign ends. | [V] tutorial tips. The post-campaign modes are [TK]. |
| **Bloons TD 6** | One map is replayed under many difficulty × mode combinations, each earning a medal. The medal grid on each map makes untried combinations visible. Hardest mode: CHIMPS. | [TK] The **medal grid** is the closest commercial analogue to a "route map." |
| **Rhythm Doctor** (7th Beat Games) | One button, pressed on the 7th beat. Teaches rhythm with very forgiving early levels and rank grades per level. | [TK] Not verified this session (search budget exhausted). |
| **Beat Saber** | Per-song letter grades, combo multiplier, a leaderboard per song and difficulty, and the music sets a fixed length (about 3–4 min). | [TK] Meta lowered the Quest minimum age to 10 (with parent-managed accounts) in 2023. Not re-verified. |
| **Just Dance** | Per-song stars, plus a "Just Dance for kids / classroom" use in PE as exergaming. | [TK] Exergaming studies show short-term activity gains; long-term adherence is weak. |
| **Kahoot / Blooket / Gimkit** | Kahoot: rank after each question, speed points, podium. **Blooket** wraps quiz answers in luck-driven modes ("Gold Quest" stealing, "Tower Defense"), so low-knowledge students can still win. **Gimkit** has an in-game economy where correct answers buy power-ups. | Kahoot research §3.4 [V/S]. Blooket and Gimkit mechanics [TK]. Peer-reviewed comparative evidence was not found this session. Luck-heavy modes reduce rank-shame but **decouple winning from learning** [est.]. |
| **Prodigy Math** | RPG battles with maths questions; pets and loot; membership-only rewards. | [V] The 2021 complaint led by Fairplay/CCFC (22 groups) alleged "kids see up to four times more advertisements than math exercises." Membership costs $59.88–$107.40/yr. Members' rewards are visible at school, "creat[ing] two classes of students." https://fairplayforkids.org/feb-19-2021-advocates-to-ftc-prodigy-math-game-preys-on-kids-and-families/ ; Axios https://www.axios.com/2021/02/19/prodigy-math-game-ftc-complaint . No FTC enforcement was found [S]. **The clearest "what NOT to copy" example in edtech.** |
| **Duolingo ABC** | Free with no ads, short lessons for ages 3–8, and a no-pressure path. Main Duolingo's streak culture is largely absent. | [TK] Not re-verified. |
| **PBS Kids / BBC Bitesize games** | Short, curriculum-tied, no accounts needed, single-session completion, characters children already know. | [TK] PBS KIDS games are built under the CPB/PBS Ready To Learn grant, with formative research. Bitesize games are free and need no login. Not re-verified. |
| **Toca Boca** | No win states, scores or time limits. Replay comes from open-ended play and discovering hidden interactions. | [TK] Toca's stated "no rules, no high scores" philosophy. Shows that **discovery** drives replay without any score. |
| **Fall Guys** | About 2-minute rounds, quick elimination, a randomised round order, comedic failure, cosmetic progression (originally a battle pass). | [TK] Comic failure lowers the sting of losing. Battle-pass FOMO is a cautionary feature. |
| **Mario Party** | Very short (about 1 min) varied minigames inside a longer board game. Luck and bonus stars at the end keep weaker players in contention. | [TK] Deliberate **catch-up/rubber-banding**. It is socially good for mixed-skill groups but frustrates skilled players. |
| **Super Mario Run** | One-handed auto-runner. Toad Rally races recorded ghosts of other players. | [S] https://en.wikipedia.org/wiki/Super_Mario_Run |
| **Trackmania** | Medal tiers (bronze, silver, gold, author), ghosts, Track of the Day. | [S] https://tm.mania-exchange.com/blogs/entry/569/what-do-you-think-medal-times ; https://doc.trackmania.com/play/watch-replays/ |
| **Vampire Survivors** | Runs of 15–30 min; a failed run still earns currency for unlocks; a secrets list. | [S] https://en.wikipedia.org/wiki/Vampire_Survivors |
| **Slay the Spire** | Seeded runs plus a daily climb, so everyone plays the same seed (Wordle-like). Ascension levels add difficulty one notch at a time. | [TK] |
| **Crossy Road** | Endless, short runs; ads only when the player chooses one for a reward; 50+ characters to unlock. | [S] https://mobiledevmemo.com/crossy-road-a-case-study-in-mobile-ad-monetization |
| **Subway Surfers** | Endless runner with daily challenges, missions and a seasonal "World Tour." | [TK] Heavy use of daily-return hooks. |

---

## 3. Research on children aged about 7–13

### 3.1 What drives replay

- **Self-determination theory (SDT)** [TK]: Ryan, Rigby & Przybylski (2006), *Motivation and Emotion* 30:347–363, "The motivational pull of video games." Competence, autonomy and relatedness predicted enjoyment and the intention to play again. This study used adults and adolescents.
- **SDT with children** [S]: A study of 8–12-year-olds links **choice** to autonomy and intrinsic motivation. https://pmc.ncbi.nlm.nih.gov/articles/PMC3311069
- **Minecraft study** [S]: Preadolescents' motivation stayed high "as long as students are competent in game controls and were relatively free to do what they wanted." https://core.ac.uk/download/199374779.pdf
- **No study found that measures replay counts as an outcome in 7–13-year-olds.** This is a genuine gap.

### 3.2 Frustration tolerance and challenge level

- **Lomas et al. (2013), CHI** [TK], "Optimizing challenge in an educational game using large-scale design experiments" (Battleship Numberline, about 70k players). **Easier** settings produced more play time. Players did not seek the "optimal challenge" designers assume; they played longer when they succeeded more. *Implication: set default difficulty generously and make harder modes opt-in.*
- **O'Rourke, Haimovitz, Ballweber, Dweck & Popović (2014), CHI** [TK], "Brain Points" in the fractions game *Refraction*. Rewarding effort, strategy and incremental progress, rather than only correct solutions, increased persistence (time played and levels attempted). The effect was strongest for lower performers. **This is the strongest evidence-based precedent for stars that reward process.**
- **Mueller & Dweck (1998)**, *JPSP* 75(1):33–52 [TK]. Fifth graders praised for intelligence persisted less and enjoyed less after failure than peers praised for effort. *Implication: star copy should name the strategy ("you made it specific"), not the child ("you're clever").*
- **Juul (2013)**, *The Art of Failure*, MIT Press [TK]. Players accept failure when they feel responsible for it and can see a way to improve. This is the same principle behind Super Meat Boy's death montage.

### 3.3 Attention span within a session

- No robust evidence supports the popular "2–5 minutes per year of age" rule. It circulates in teacher folklore, but its research basis is weak [TK].
- Evidence-based design proxies:
  - Short loops: Geometry Dash attempts last seconds; Wordle takes about 3 min [V].
  - Fall Guys rounds last about 2 min [TK].
  - PvZ caps on-screen text at 8 words [V].
- **Working assumption for DeltaOps** [est.]: 30–90-second action loops inside a 30–60-minute facilitated session. Insert a discussion pause every 2–3 stages, which is effectively the ICO-recommended "pause/break" pattern.

### 3.4 Competition, collaboration and leaderboards

**Classroom studies with children:**
- **Plass et al. (2013)**, *Journal of Educational Psychology* 105(4):1050–1066, doi:10.1037/a0032688 [TK; the abstract could not be fetched]. Middle-school students played a maths game individually, competitively or collaboratively. Competitive and collaborative play both raised situational interest and enjoyment compared with individual play. Competition raised in-game performance. Collaboration was associated with more willingness to play again and more mastery orientation. *Re-verify these details.*
- **Ke & Grabowski (2007)**, *British Journal of Educational Technology* 38(2):249–259 [TK]. With fifth graders, **cooperative** game play improved attitudes towards maths more than competitive or individual play. Learning gains were similar across conditions.

**Leaderboard studies (mostly adults):**
- **Hanus & Fox (2015)**, *Computers & Education* 80:152–161 [TK]. Undergraduates in a course gamified with leaderboards and badges showed **lower** intrinsic motivation, satisfaction and final-exam scores over 16 weeks than a non-gamified section.
- **Christy & Fox (2014)**, *Computers & Education* 78:66–77 [TK]. The gender make-up of a leaderboard affected women's subsequent maths performance, consistent with **social comparison** effects. The direction of the effect should be re-checked before quoting. Take-away: who appears on a leaderboard matters, not only the fact that one exists.
- **Kahoot evidence** [S/V]:
  - Adkins-Jablonsky et al. (2021), *CBE—Life Sciences Education*, two university biology courses. Kahoot was rated **less** anxiety-inducing than most other classroom practices. Lower performers were *more* likely to say it reduced exam stress. https://lifescied.org/doi/10.1187/cbe.20-08-0187
  - DiFrancesca & Spencer (2025), *Instructional Science*, n > 100 undergraduates, reported via Kahoot's blog [V-secondary]. No differences between high- and low-competitive students in learning, motivation or enjoyment when sessions were **low-stakes and ungraded**. The blog frames this as "constructive competition" (Johnson & Johnson): winning matters little, everyone has a realistic chance, and rules are clear. https://kahoot.com/blog/2026/01/14/kahoot-impact-competition-education-research/
  - Wang & Tahir (2020), *Computers & Education* 149:103818, literature review of Kahoot [TK]. Mostly positive effects on learning and classroom dynamics, with some reports of time-pressure stress.
- **Meta-analysis**: Sailer & Homner (2020), *Educational Psychology Review* 32:77–112 [TK]. Gamification has small-to-medium positive effects on cognitive outcomes (g ≈ 0.49), motivational outcomes (≈ 0.36) and behavioural outcomes (≈ 0.25). Effects were more stable with game fiction and with **combined competition and collaboration** than with competition alone.

**Gender and attainment differences.** The evidence is thin and mixed. The consistent design lesson [est.] is:
- **team-level** comparison, not ranking individual children;
- **improvement-based** comparison ("beat your own previous score");
- **multiple ways to shine**, so that ranking on one measure doesn't shame the same children every time.

Blooket and Mario Party achieve this with luck. A learning lab should achieve it with **multiple star dimensions** (§6.1) instead, so winning stays tied to understanding.

---

## 4. Ethics and regulation: verbatim text

### 4.1 ICO Age Appropriate Design Code (Version 2.0)

Source: the full text, extracted from a mirrored copy of the final code PDF. https://www.privacylaws.com/media/3093/final-age-appropriate-design-code-of-practice.pdf . The official ICO URL is protected by a bot-check and could not be fetched. Official Standard 13 page: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/13-nudge-techniques/

**Standard 13, Nudge techniques (headline, verbatim):**
> "Do not use nudge techniques to lead or encourage children to provide unnecessary personal data or turn off privacy protections."

**Definition (verbatim):**
> "Nudge techniques are design features which lead or encourage users to follow the designer's preferred paths in the user's decision making."

**Further verbatim text:**
> "You should not exploit unconscious psychological processes to this end (such as associations between certain colours or imagery and positive outcomes, or human affirmation needs)."

> "Younger children, with limited levels understanding and decision making skills need more instruction based interventions, less explanation, unambiguous rules to follow and a greater level of parental support. Nudges towards high privacy options, wellbeing enhancing behaviours and parental controls and involvement should support these needs."

> "You may also wish to consider nudging children in ways that support their health and wellbeing. For example, nudging them towards supportive resources or providing tools such as pause and save buttons."

**Age-band table, rows relevant to DeltaOps** (verbatim excerpts). The 6–9 ("Core primary school years") and 10–12 ("Transition years") rows both include:
> "Provide design architecture which is high-privacy by default." … "Nudge towards wellbeing enhancing behaviours (such as taking breaks)." … "Provide tools to support wellbeing enhancing behaviours (such as mid-level pause and save features)."

The 10–12 row adds:
> "Present option in ways that encourage conscious decision making."

**Standard 5, Detrimental use of data. This is where reward loops are covered (verbatim):**
> "Strategies used to extend user engagement, sometimes referred to as 'sticky' features can include mechanisms such as reward loops, continuous scrolling, notifications and auto-play features which encourage users to continue playing a game…"

> "…designing in data-driven features which make it difficult for children to disengage with your service is likely to breach the Article 5(1)(a) fairness principle of the GDPR. For example, features which use personal data to exploit human susceptibility to reward, anticipatory and pleasure seeking behaviours, or peer pressure."

> "You should: avoid using personal data in a way that incentivises children to stay engaged, such as offering children personalised in-game advantages (based upon your use of the individual user's personal data) in return for extended play; present options to continue playing or otherwise engaging with your service neutrally without suggesting that children will lose out if they don't; avoid features which use personal data to automatically extend use instead of requiring children to make an active choice…; and introduce mechanisms such as pause buttons which allow children to take a break at any time without losing their progress in a game…"

The code also notes that rewards are not banned outright where no personal data drives them:
> "not all such features rely on the use of personal data and you may have designed your feature taking into account the needs of children and in a way that makes it easy for them to disengage without feeling pressurised or disadvantaged if they do so."

**Reading for DeltaOps** [est., not legal advice]:
- The code is anchored to **personal-data processing**. A lab with no accounts and no personal data is largely outside its strict scope.
- The ICO's games "top tips" (2023, non-binding) are nonetheless the clear best-practice bar. Coverage: https://www.mishcon.com/news/ico-publishes-new-top-tips-for-games-designers ; https://www.eversheds-sutherland.com/en/estonia/insights/ico-publishes-top-tips-for-uk-game-designers-how-to-comply-with-the-childrens-code [S]
- The **take-home code** (§7) must never become an identifier linked to analytics, IP addresses or timestamps. Otherwise it becomes personal data and brings Standards 5, 7, 8 and 13 into full force.
- "Continue?" prompts should be **neutral**, with no "you'll lose your stars!"

### 4.2 Other ethics evidence

- **Loot boxes** [S]:
  - Zendle & Cairns (n ≈ 7,000) found loot-box spending tracks problem gambling, with the same link in adolescents. The direction of cause is unresolved.
  - About 31% of 11–16-year-olds had opened a loot box (Gambling Commission data, cited in evidence to Parliament).
  - The DCMS committee recommended a ban on sales to children (2019). The government chose industry self-regulation (2022).
  - https://committees.parliament.uk/writtenevidence/98535/html/ ; https://www.mcvuk.com/business-news/uk-government-announces-the-games-industry-must-self-regulate-loot-boxes-or-face-legislation/
- **Streaks** [S]:
  - Duolingo's PM says streaks of 7+ days lift retention. A second-hand summary reports a +0.38% gain in daily active learners from allowing two streak freezes.
  - Accounts of streak anxiety are widespread but anecdotal.
  - The ICO's 2019 draft named "likes and streaks" as reward loops.
  - https://www.recall.it/summary/lennys-podcast/behind-the-product-duolingo-streaks-or-jackson-shuttleworth-group-pm-retention-team ; https://iapp.org/news/a/ico-bans-use-of-nudge-techniques-in-new-draft-guidelines/
- **Prodigy**: see §2. The pattern to avoid is a free-to-play learning game that uses children's desire for rewards to market to parents, with visible "haves and have-nots."
- **Flappy Bird**: a creator withdrawing a game over compulsive play. Nguyen later released a "less addictive" multiplayer variant [S].

---

## 5. Replay mechanics catalogue

Fit score: 5 = core recommendation, 1 = avoid.

| # | Mechanic | Example(s) | Evidence | Ethical risk | DeltaOps fit |
|---|---|---|---|---|---|
| 1 | Instant restart, under 1 s, no penalty | Super Meat Boy, Geometry Dash, Celeste | McMillen postmortem [V]; GD [V] | Low. Can fuel "one more go" loops if combined with endless content. | **5** |
| 2 | No lives or energy | Super Meat Boy, Celeste | McMillen: "Remove lives" [V] | Energy systems are a monetisation trap | **5** (never add lives) |
| 3 | Practice mode separated from real attempts | GD practice checkpoints [V]; Celeste per-room checkpoints [V] | Feature docs | Low | **4** (try a card without consequence, then commit) |
| 4 | Visible best-% / progress bar | GD [TK] | Widespread convention | Low | **4** ("stages cleared" / clarity meter per team) |
| 5 | Attempt/death counter reframed as learning | GD; Celeste postcard [TK] | Juul [TK]; Dweck [TK] | Can shame if public | **3** (show the team privately, framed as "tries = experiments") |
| 6 | Replay of all attempts at once (death montage) | Super Meat Boy [V] | McMillen: "getting better through their own actions" | Low | **5** (montage of a team's instruction attempts) |
| 7 | 3-star rating set by designer-tested thresholds | Angry Birds [V], Cut the Rope [S] | Mäki quotes [V] | Low. Medium if stars gate content. | **5** (stars for clarity: §6.1) |
| 8 | Stars placed in the level as route choices | Cut the Rope [S] | — | Low | **3** |
| 9 | Process/effort rewards ("brain points") | Refraction (O'Rourke et al. 2014) [TK] | Experimental, children | Low | **5** (third star for "spotting the assumption") |
| 10 | Optional collectibles that never block progress | Celeste strawberries [V], GD coins [V] | Thorson [V] | Low | **5** (assumption sticker book: §6.2) |
| 11 | Unlock harder variants (B-sides) | Celeste [V], Bloons modes [TK], StS Ascension [TK] | — | Low | **4** ("Tricky mode": vaguer card set) |
| 12 | Medal grid per map × mode | Bloons TD 6 [TK] | — | Low | **4** (basis for the route/outcome map) |
| 13 | Ghost of another run | Trackmania [S], Toad Rally [S] | Docs | Low if anonymous | **5** ("last team's ghost") |
| 14 | Assist/accessibility mode without stigma | Celeste [V] | Thorson; marker removed [V] | Very low; positive | **5** (slower Beat Mode, picture-only cards) |
| 15 | Rhythm sync / one-button timing | GD, Rhythm Heaven [S], Rhythm Doctor [TK], Beat Saber [TK] | Tsunku [S] | Low; exclusion risk for some children | **3** (optional "Beat Mode" warm-up) |
| 16 | Short varied minigames inside a longer frame | Mario Party, WarioWare [TK] | — | Low | **4** (each stage is already a minigame) |
| 17 | Catch-up luck / rubber-banding | Mario Party, Blooket [TK] | — | Decouples winning from learning | **2** (use multi-dimension stars instead) |
| 18 | Daily single shared puzzle | Wordle [V/S], StS daily [TK] | Wardle quote | Low; streaks attached raise risk | **3** ("Puzzle of the Visit", no streak) |
| 19 | Streaks | Duolingo [S] | Retention gains; anxiety anecdotes | **High** for children; ICO 2019 draft named streaks | **1** |
| 20 | Live rank after every question | Kahoot [V/S] | Low-stakes OK; adult evidence | Medium for low attainers | **3** (team-only, improvement-based) |
| 21 | Individual public leaderboard | Many | Hanus & Fox 2015 [TK] | Medium–high | **1** |
| 22 | Team / collective goal | Ke & Grabowski 2007; Plass 2013 [TK] | Classroom studies | Low | **5** ("camp has found 214 of 729 routes") |
| 23 | Unlockable cosmetics | Crossy Road [S], GD icons [V] | — | Low if earned, not bought | **3** (voxel hats for the AI helper) |
| 24 | Randomised/paid rewards (loot boxes) | Prodigy chests [V], many F2P games | Zendle & Cairns [S] | **Very high** | **1 (never)** |
| 25 | Membership-gated rewards visible to peers | Prodigy [V] | Fairplay complaint | **Very high** | **1 (never)** |
| 26 | Paid "skip stage" | Roblox obbies [TK] | — | High: monetises frustration | **1** |
| 27 | User-generated levels / editor | GD (150M+ level IDs) [V], Roblox, Mario Maker | RobTop quote [V] | Medium: moderation, sharing | **3** (later: in-session "make a vague card" by composing picture tiles, not shared publicly) |
| 28 | Narrative progress on failure | Hades [S] | Kasavin | Low | **4** (the AI helper "learns" a line of dialogue after each wrong guess) |
| 29 | Discovery / hidden interactions without score | Toca Boca [TK] | — | Very low | **4** (secret voxel reactions on rare routes) |
| 30 | Endless runs plus daily missions | Subway Surfers [TK] | — | Medium–high (retention hooks) | **1** |
| 31 | Minimal-text teaching by doing | PvZ [V] | Fan's 10 tips | — | **5** (≤ 8 words per card) |
| 32 | Speedrunning / timers | GD, Celeste, Trackmania | — | Pressure; rewards speed over thinking | **2** (only in Beat Mode, and never for instruction quality) |

---

## 6. Detailed designs for three replay features

### 6.1 Stars for clarity (three stars per stage, three different kinds)

**Principle.** Each star rewards a *different* thing, so the same children don't always win.
- This is a "multiple ways to shine" approach (Sailer & Homner; Johnson & Johnson's constructive competition).
- It rewards process, as Brain Points did (O'Rourke et al. 2014).
- Thresholds are set by playtest, as Rovio sets theirs (Mäki [V]).

| Star | Name (child-facing) | Earned when | Notes |
|---|---|---|---|
| ★1 | **World changed** | The team completes the stage with any card. | Everyone gets this. It is never withheld, even for the deliberately vague card. |
| ★2 | **Crystal clear** | The chosen card's scripted AI confidence is **≥ 80% sure** *and* the world outcome matches the card's intent. | The scripted "% sure" values per card must be authored so that, in each stage, exactly one card meets this bar on its own. A vague card can earn it after a **"Fix it" retry**: the team picks a sharper add-on tile ("the *red* one", "*three* of them") and the AI's confidence rises. |
| ★3 | **Assumption spotter** | After *any* outcome, the team answers the picture prompt "What did the AI think you meant?" correctly (choosing from 3 images). Alternatively, the facilitator taps "great explanation" during discussion. | Rewards understanding of *why*, which is the lab's learning goal. Earnable even on a "wrong" route. This deliberately makes the vague card a good choice, not a bad one. |

**Thresholds and calibration** [est.]:
- First-play targets: ★1 for ~100% of teams; ★2 for ~50–65% of stages; ★3 for ~40–60% of stages.
- A full 18/18 should take 2–3 runs. That leaves a reason to replay without making it a grind.
- Re-tune after 10 or more facilitated pilot sessions. Rovio uses 5–10 testers per level [V].
- Lomas et al. found easier settings kept children playing longer [TK], so err generous.

**UI:**
- **Placement.** Three rounded star slots under each stage on the island's stage-select ring. The 6 × 3 = 18 slots are shown as a "star tray" on the team's board.
- **Reveal.** Stars pop in one at a time after the world change. ★3 uses a different shape and colour (a magnifying-glass star), so children read it as a different kind of achievement.
- **Empty slots** show a faint hint icon, not a lock. Tapping one shows an 8-word hint (PvZ rule [V]), for example "Try saying *which* tree."
- **Copy praises the strategy, never the child** (Mueller & Dweck [TK]): "You said *how many*! The AI was 92% sure." Not: "You're so smart!"
- **No timer, and no ★ for speed.**
- **End-of-run montage.** Replay the team's attempts at their best stage in quick succession, finishing on the 3-star version (the Super Meat Boy device [V]).
- **Leaderboard use.** The camp team board shows **stars gained since your first run** and **★3 count**, not raw totals.

### 6.2 "Spot the AI's assumptions" sticker book

**Concept.**
- Every vague or partial card hides one or more **named assumptions** the AI made. The book is a collection of them.
- Collection is optional, never blocks progress, and is visible as silhouettes, like Celeste strawberries [V] or GD coins [V].

**Inventory per lab** [est.]: 6 stages. Per stage, the vague card has 2 assumptions, the partial card 1, and the clear card 0. Total: **18 stickers per lab**.

**Assumption categories** give children a reusable vocabulary for prompt-writing. Each is a sticker "family" with its own icon:
1. **Which one?** (ambiguous referent)
2. **How many?**
3. **How big / how much?**
4. **Where?**
5. **When / what order?**
6. **What kind?** (colour, type)
7. **Who for?**
8. **Missing step** (the AI filled a gap)

**Mechanics:**
- **Unlock.** A sticker unlocks when the team (a) chose a card containing that assumption **and** (b) correctly identifies it in the picture prompt. This is the same moment as earning ★3, so one action feeds both systems.
- **No random drops and no duplicates.** Every sticker is earned deterministically by an identifiable action.
- **Silhouettes.** The book shows greyed silhouettes with the family icon, so children can see *what kind* of assumption is still missing. This is a curiosity driver without a timer.
- **Family completion** ("You found all the *How many?* stickers!") triggers a tiny voxel animation on the island, for example the AI helper gets a magnifying-glass hat. Cosmetic only.
- **Discussion hook.** The facilitator card asks "Which family do you think AIs fall for most?" Children then generalise beyond the lab.

**UI:**
- A rounded "book" button on the island HUD opens a 3 × 6 grid, one row per stage.
- Each sticker is a chunky voxel diorama snapshot of the misunderstanding, for example a giant apple when the child meant "a big pile of apples."
- A caption of 8 words or fewer: "AI guessed **big apple**, not **many apples**."
- Progress is shown as "11 of 18 found". There is no percentage bar and no "complete to win."

### 6.3 The 729-route map

**Honest constraint** [est.]: A team plays perhaps 2–5 full routes per session. 729 routes is far too many to "complete" individually, and pretending otherwise invites grind.

So use **two layers**:

**Layer A: Outcome grid (personal and achievable).**
- 6 stages × 3 cards = **18 outcome tiles**. Each shows the voxel world change that card produces.
- Seen tiles fill in. Unseen tiles are fog-covered islands.
- This is the Bloons-style medal grid [TK]: completable in 2–4 runs and directly educational, because seeing the vague card's outcome is the point.
- Optional **endings**: if the scripted world state at stage 6 depends on cumulative choices, define about **6–8 named ending islands** ("Tidy Meadow", "Chaos Garden"…) by clustering routes, for example by the number of clear cards chosen. These are collectible.

**Layer B: The 729-route constellation (collective and ambient).**
- **Visualisation.** A radial sunburst of 6 concentric rings. Ring *k* has 3^k segments (3, 9, 27, 81, 243, 729). The centre is the starting island.
- A team's route draws a glowing line outward through one segment per ring. Routes walked by any team **at this site** stay faintly lit.
- **Collective counter**: "Our camp has explored **214 of 729** routes." This is a team-of-teams goal, supported by the collaboration evidence (Ke & Grabowski; Plass [TK]). No team owns the map.
- **"Never walked" sparkle.** Unexplored segments in rings 1–3 (only 3/9/27 options) gently sparkle. This hints that early branching choices are still open, without dangling 729 as a to-do list.
- **Data.**
  - Stored only on the facilitator's device or in a per-event local file, as a 729-bit bitmap plus counts per route.
  - No child data; no timestamps tied to individuals.
  - A "reset for new group" button. It can optionally be exported as a souvenir poster PNG for the venue.

**Ghost of the previous team** (fits on the same map):
- When a stage starts, translucent blocky figures walk to the card the **previous team at this site** chose, with that team's "% sure."
- Anonymous, with no team name, unless the facilitator enables names for a camp rivalry.
- Discussion prompt: "Last team picked this one. Would you?"

---

## 7. Take-home island code (resume without accounts or personal data)

**Goals:**
- No typing, which matches the lab's existing no-typing format.
- No personal data, and no server lookup needed.
- Robust to mistakes.
- Readable by a 7-year-old.
- Usable at a different venue running the same lab.

**What to save**, in order of priority, with bit counts:

| Field | Bits | Notes |
|---|---|---|
| Format version | 2 | Allows future changes |
| Lab ID | 6 | Up to 64 labs |
| Stars, 6 stages × 3 stars | 18 | One bit per star, so ★2 and ★3 are independent |
| Stickers found (18) | 18 | |
| Checksum | 6 | Catches about 98% of mis-entries |
| **Total (core code)** | **50 bits** | |

**Encoding: a picture code.**
- Use a fixed palette of **32 picturable voxel icons**, each worth 5 bits: fox, acorn, boat, comet, drum, frog, kite, leaf, moon, owl, pear, rocket, shell, tent, whale, yo-yo, and so on.
- 50 bits ÷ 5 = **10 icons**.
- Print as two rows of five on a pocket **"Island Passport"** card, with a matching **QR code** that encodes the same bits plus extras.
- **Extras in the QR only**:
  - outcome tiles seen (18 bits);
  - endings seen (8 bits);
  - a cosmetic hat choice (3 bits).
- **Entry.** The child or facilitator taps the 10 icons on a 32-icon grid (two rows of five slots), or scans the QR with the kiosk camera.
- **Checksum.** A CRC-6 over the payload. On failure: "Hmm, one picture looks wrong. Check row 2?" Simple per-row parity allows that row-level hint.
- **Optional shorter "lite" code.** 4 icons from a 1024-entry list is too many for children to browse. The better shortening is to drop sticker data and keep stars, giving 2 + 6 + 18 + 4 = 30 bits = **6 icons**. Offer lite codes for very young groups.

**Privacy rules** [est., aligned to the ICO's Standards 5, 8 and 13 in spirit]:
1. The code carries **only game state**: no name, age, school, date, venue, or device ID.
2. **Do not log codes server-side**, and never alongside IP addresses or timestamps. Decoding happens fully client-side.
3. Codes are **not unique identifiers**: many children will share identical states.
4. Codes are **never accepted into leaderboards**. Integrity doesn't matter for a souvenir, and if a child "invents" a code, nothing is harmed.
5. The card text addresses grown-ups: "This card saves your child's island progress. It contains no personal information."
6. **Neutral copy, no loss framing** (ICO Standard 5, verbatim above): "Want to keep exploring next time? Bring your card!" Never: "Your stars will be lost forever!"
7. **No expiry and no streaks.**

**Why not localStorage alone?** It is per-device, shared kiosks get wiped, and children change venues. The physical card is also a keepsake that opens a parent conversation. It doubles as marketing collateral that carries no data.

---

## 8. What NOT to copy

- **Streaks, daily return pressure, loss-framed "continue?" prompts.** ICO Standard 5 text; Duolingo anxiety accounts.
- **Lives, energy, timers on thinking tasks.** McMillen: "Remove lives."
- **Random, paid or membership-gated rewards, and anything visible to peers as a "have."** Prodigy complaint; loot-box research.
- **Paid or premium "skip".** Roblox obby pattern.
- **Individual public leaderboards, and podiums that rank children every round.** Hanus & Fox; anxiety for low attainers.
- **Help-use markers.** Celeste removed its Assist save-file badge [V].
- **Luck-based catch-up that disconnects winning from understanding.** Blooket and Mario Party style.
- **Endless content plus auto-continue.** Flappy Bird; Subway Surfers; ICO's warning about "auto-play features."

## 9. Recommendations, ranked

1. **Ship stars for clarity (§6.1)** with three *different* star types, generous thresholds and strategy-praise copy. *Angry Birds/Mäki; Brain Points; Dweck.*
2. **Make the vague card a reward, not a trap,** via ★3 and stickers for spotting the assumption. *Brain Points; Celeste's non-judgemental framing.*
3. **Add the assumption sticker book (§6.2):** 18 per lab, 8 families, deterministic, never blocking. *Celeste strawberries; GD coins.*
4. **Use the outcome grid (18 tiles plus endings) as the personal map and the 729 constellation as a site-wide shared goal (§6.3).** *Bloons medal grid; Ke & Grabowski and Plass on collaboration.*
5. **Add a previous-team ghost** with no names by default. *Trackmania; Toad Rally.*
6. **Make retry instant and unpunished, with "try it" practice before committing.** *Super Meat Boy; GD practice mode.*
7. **Show an end-of-run montage of all attempts.** *Super Meat Boy.*
8. **Make the island-code passport (§7) the persistence layer:** 10 picture icons plus a QR, no personal data. *ICO Standards 5/13 in spirit.*
9. **Offer an optional 60–90-second "Beat Mode" warm-up** (one tap, on the beat), with an Assist tempo and no stigma. *GD; Rhythm Heaven; Celeste Assist.*
10. **Build in a facilitator break and a neutral finish screen**, plus "Puzzle of the Visit" as the only "daily" element, with no streak. *ICO Standard 13 table ("taking breaks", "pause and save"); Wordle.*

---

## 10. Remaining gaps and what to verify next

- Rhythm Doctor, Bloons TD 6, Beat Saber's age policy, Just Dance in schools, Blooket and Gimkit mechanics, Duolingo ABC, PBS Kids/Bitesize, Toca Boca, Fall Guys and Mario Party are written from **prior knowledge [TK]**. The shared web-search budget (200 calls per turn) ran out before they could be verified. Recommend a follow-up pass.
- The details of Plass et al. 2013, Ke & Grabowski 2007, Christy & Fox 2014, Hanus & Fox 2015, Lomas et al. 2013, O'Rourke et al. 2014 and Sailer & Homner 2020 are recalled [TK]. Publishers blocked the abstract pages this session. **Verify the direction of the effects before using them in sales material.**
- No primary RobTop design interview about restart or practice mode exists in what we could find.
- No study measures *replay counts* in 7–13-year-olds. DeltaOps could generate this evidence itself from pilot sessions, with anonymous counts only.
- All thresholds and percentages in §§6–7 are **design estimates** to be tuned in pilots.
