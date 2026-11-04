# Repeat playability: what makes children replay games dozens or hundreds of times

**How solid the sources are:** The design-intent material comes from developer postmortems and interviews: Team Meat, Nguyen, Wardle, Rovio, Thorson and Kasavin. I found **no primary interview with RobTop about why Geometry Dash works the way it does**, and **no study that measures replay behaviour in 7–13-year-olds specifically**. Anything marked [est.] is my own inference. One search result (a cavac.at Wikipedia mirror) contained a planted instruction. I ignored it and did not cite that page.

## 1. Core replay mechanics, with examples

**Instant restart and short loops.** In the Super Meat Boy postmortem, Edmund McMillen gives the formula as "Remove lives, reduce respawn time, keep the levels short and keep the goal always in sight." He calls frustration "the biggest part of retro difficulty" and says it "needed to be removed at all costs." (https://www.gamedeveloper.com/audio/postmortem-team-meat-s-i-super-meat-boy-i-). Geometry Dash works the same way: hit an obstacle and you go straight back to the start (https://en.wikipedia.org/wiki/Geometry_Dash). Vampire Survivors runs are capped at about 15–30 minutes. Even a failed run earns currency for unlocks, so it "never feel[s] like a waste of time" (https://en.wikipedia.org/wiki/Vampire_Survivors; https://store.epicgames.com/news/vampire-survivors-built-genre-autoshooter-bullet-heaven).

**Visible progress.**
- **Geometry Dash** shows an attempt counter, a progress bar with your best %, and a Practice Mode where you place checkpoints. A practice run does not count as a real completion, so practice and the real attempt stay separate (https://en.wikipedia.org/wiki/Geometry_Dash).
- **Super Meat Boy** plays "an epic showing of all your past deaths" at the end of a level. The aim was to show players "they were getting better through their own actions" (postmortem, above). This is the clearest case on record of turning failure into evidence that you are learning.
- **Ghosts**: Trackmania lets you race recorded ghosts, including the world record (https://doc.trackmania.com/play/watch-replays/). Super Mario Run's Toad Rally races you against other players' recorded runs (https://en.wikipedia.org/wiki/Super_Mario_Run).

**Tiered mastery targets.** Rovio's Arttu Mäki said: "We spend more time developing and tweaking the ratings than building the level." Star thresholds are set from playtests of particular "skill shot[s] or method[s]" (https://www.pocketgamer.com/angry-birds/exclusive-the-making-of-an-angry-birds-level/). Three stars quietly tell the player that a better solution exists. Trackmania has medal tiers. Track builders describe gold as "the first medal that should feel like an accomplishment for an average driver," and the author medal as needing a clean, optimised run (https://tm.mania-exchange.com/blogs/entry/569/what-do-you-think-medal-times).

**Fairness and kindness.** Maddy Thorson describes Celeste as "challenging but kind." Assist Mode was first called "Cheat Mode," and she renamed it because that felt "judgmental." She also removed a marker on save files that showed Assist Mode had been used (https://www.vice.com/en/article/d3w887/celeste-difficulty-assist-mode; https://en.wikipedia.org/wiki/Celeste_(video_game)). Strawberries are optional. Fans describe them as being for "impress[ing] your friends," which makes them a mastery layer that never blocks progress.

**Rhythm sync.** Tsunku, creator of Rhythm Heaven: "Just make it simple. Controls easy… If the games themselves have rhythm and are fun that's all you need." He also argues rhythm can be trained (https://iwataasks.nintendo.com/interviews/ds/rhythm-heaven/0/3). Geometry Dash builds each level around its music, so a child learns a level partly by its sound. That turns memorising into something closer to performing [est.].

**Making failure part of the story.** Greg Kasavin of Supergiant: "all of our games have sort of been concerned with this moment of failure." In Hades, each death moves the story on (https://gdconf.com/news/roguelikes-and-narrative-design-hades-creative-director-greg-kasavin-gdc-podcast-ep-16).

**User-generated levels.** Geometry Dash players are reported to have made more than 100 million online levels. That figure comes from a Wikipedia mirror and I could not verify it [unverified]. The 2.2 update in December 2023 lifted peak concurrent Steam players from about 16.5k to 88,346 (https://www.pcgamer.com/game-receives-huge-free-update-following-10th-anniversary-and-instantly-quintuples-its-previous-player-count-high). Players will replay a lot when other players keep making new content and keep inventing new kinds of difficulty, such as the "demon" levels.

**Daily scarcity.** Josh Wardle said limiting Wordle to one puzzle a day was the breakthrough. It "leaves people wanting more," keeps play to about three minutes, and means everyone solves the same word on the same day (https://www.boston.com/news/national-news/2022/01/04/he-made-wordle-for-his-partner-now-its-an-online-hit/). It is a model of replay value that respects the player's time.

**Social comparison.** For Kahoot, Adkins-Jablonsky et al. found students rated it less anxiety-inducing than most other classroom practices. Lower performers were more likely to say it reduced exam stress (https://lifescied.org/doi/10.1187/cbe.20-08-0187). These were small, adult, partly correlational studies. A meta-analysis is described as mixed on anxiety. The common thread is that keeping stakes low matters more than whether there is a leaderboard.

**Fair monetisation.** Crossy Road showed ads only when a player chose to watch one for a reward, and offered 50+ characters to unlock with no paywall (https://mobiledevmemo.com/crossy-road-a-case-study-in-mobile-ad-monetization).

## 2. What drives replay for ages 7–13

There is no direct replay study. Self-determination theory research with children aged 8–12 links intrinsic motivation to competence and autonomy, meaning meaningful choice (https://pmc.ncbi.nlm.nih.gov/articles/PMC3311069). In a Minecraft study, preadolescents stayed highly motivated while they felt competent with the controls and free within loose rules (https://core.ac.uk/download/199374779.pdf). Geometry Dash has a large child audience: Common Sense Media lists 323 kid reviews against 68 from parents, with kids calling it "highly addictive… a mix of excitement and frustration" (https://www.commonsensemedia.org/app-reviews/geometry-dash). From the design evidence above, I infer [est.] that children in this age range replay most when:
- the controls are trivially simple;
- failure is cheap and quick;
- progress shows up as a number or marker they can point to;
- there is a peer to beat or to show off to;
- the content keeps revealing something new.

## 3. Ethical concerns

- **Compulsion.** Dong Nguyen pulled Flappy Bird in 2014. He said it was meant for a few relaxed minutes but "happened to become an addictive product" (https://www.engadget.com/2014-02-11-flappy-bird-creator-says-game-had-to-go-because-it-was-too-addic.html).
- **Streaks.** Duolingo reports that streaks improve retention. The figures are second-hand, from a summary of a podcast with a Duolingo PM. Accounts of streak anxiety are widespread but anecdotal (https://www.recall.it/summary/lennys-podcast/behind-the-product-duolingo-streaks-or-jackson-shuttleworth-group-pm-retention-team). The ICO's 2019 draft of the Children's Code named **reward loops and streaks** as nudges that keep children engaged (https://iapp.org/news/a/ico-bans-use-of-nudge-techniques-in-new-draft-guidelines/).
- **UK Age Appropriate Design Code, Standard 13 (nudge techniques).** It says do not use nudges to push children into giving up unnecessary data, weakening their privacy settings, or extending their use. Nudges *towards* wellbeing, such as taking breaks, are explicitly allowed (https://ico.org.uk/media/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services-2-1.pdf).
- **Loot boxes.** Zendle and Cairns (7,000+ gamers) found loot-box spending tracked problem gambling. The same link appeared in adolescents, but the direction of cause is unresolved. Around 31% of 11–16-year-olds had opened a loot box. In 2019 the DCMS committee recommended banning their sale to children. The government chose industry self-regulation instead (https://committees.parliament.uk/writtenevidence/98535/html/; https://www.mcvuk.com/business-news/uk-government-announces-the-games-industry-must-self-regulate-loot-boxes-or-face-legislation/).

## Implications for DeltaOps

The goal is replay that comes from **mastery and curiosity**, with no ties to time-pressure or loss. DeltaOps already has three advantages:
- a short loop of six stages;
- a combinatorial space of 729 routes;
- a facilitator who can frame failure.

What it lacks is a sense of *why* to replay, and memory of past play across visits.

**Do not copy:**
- daily streaks or reminders that something is "at risk";
- random or paid rewards, or loot-box-style reveals;
- endless or autoplay loops;
- leaderboards ranking individual children;
- "lives" or hearts;
- any badge showing that a child used help (Celeste removed exactly this);
- anything that gathers data to support persistence (Standard 13).

**Recommendations**

1. **Three stars per stage, scored on clarity of instruction, not speed.** For example: 1 star = the AI got it; 2 = AI was more than 80% sure; 3 = no ambiguity left. Calibrate the thresholds from real playtests, as Rovio did. Stars then show that a better instruction exists without shaming a 1-star result.
2. **A "Spot the AI's assumptions" collection.** Each vague card hides one or two named assumptions, for example "assumed 'big' meant tall." Show a sticker book with greyed-out silhouettes. Like Celeste's strawberries, it is optional, never blocks progress, and is the kind of thing children compare. It also teaches the core idea of the lab.
3. **A route map that fills in.** Show all 729 routes as a branching map or constellation that lights up the paths taken. Add a camp-level "routes discovered together" count so the group collects rather than competes. This is Geometry Dash's best-% marker turned into exploration.
4. **A ghost of the previous team.** Show translucent voxel figures choosing what the last team chose, with their % sure, alongside yours. This is Trackmania or Toad Rally ghosts adapted to decisions instead of speed. It is anonymous and has no ranking. It invites the question "why did they pick that?" for the discussion card.
5. **A "Meat Boy montage" at the end.** Replay all of the team's attempts at a stage in quick succession, ending with the best one. This puts McMillen's "getting better through their own actions" on screen and works well for facilitators.
6. **Instant retry with no penalty, and a separate practice mode.** One tap returns to the stage with the world reset in under a second. Practice tries do not count toward stars, as in Geometry Dash's Practice Mode. There are no lives.
7. **"Beat Mode", a fast rhythm mini-mode of about 60–90 seconds.** Instruction cards arrive on the beat, and the child taps the clearest card before the robot moves. It keeps one-input simplicity (Tsunku, Geometry Dash, Super Mario Run). It suits warm-ups and queue time, should be capped at a few rounds, and should offer an Assist-style slower tempo with no stigma.
8. **A take-home "island code" with no account.** A short word code such as "FOX-MAPLE-7" or a printed QR encodes stars, assumptions found and routes seen. It is stored on the device or encoded in the code itself, with no personal data, so it is compatible with Standard 13. Put it on a paper passport card the child keeps, so next visit can resume. It also gives a parent-facing artefact.
9. **A "Puzzle of the Visit" in the Wordle style.** Each session or site has one featured tricky instruction that everyone solves, with a spoiler-free result card, for example a grid of each stage's stars. This gives shared conversation without any compulsion.
10. **Team leaderboards that frame things as a group.** Keep them team-only and show improvement ("+4 stars since round 1") and the variety of routes found, not raw rank. Close with a facilitator-led stop point, which is the wellbeing nudge Standard 13 permits.

Optional later step: a simple "write your own vague card" editor inspired by Geometry Dash's level editor. Use only picture-tile composition, with no typing, and no sharing outside the site.

## Gaps

- No primary RobTop design interview was found.
- The Duolingo effect sizes and the 100M+ Geometry Dash levels figure are unverified.
- I did not open the Celeste and Geometry Dash 2.2 sources beyond search snippets. Check the final ICO Standard 13 wording against the linked PDF before quoting it to clients.
