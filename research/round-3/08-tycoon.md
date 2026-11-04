# 08 · Tycoon and resource-management games (round 3)

Research for DeltaOps Learning: what made RollerCoaster Tycoon, Zoo Tycoon and their relatives work, what failed, what the research says about simulations, needs displays and systems thinking, and a full spec for **Island Park Tycoon: The Manager Bot**.

Compiled 4 November 2026. Main source: the Exa connector (web search, page fetch and four Exa agent runs at "medium" or "high" effort). WebSearch was not needed. The OpenRCT2 string table and two PDFs (Sterman 2002; Zuckerman & Resnick 2005) were downloaded and searched directly to check exact wording.

---

## Changes from round 2

**Verified (was flagged, unread or reported only):**
- **The Atari Club Sawyer interview (Medium, 27 Mar 2024) has now been read in full.** It adds new primary quotes on balance ("the game should be relatively easy to succeed with if you grasp… your guests' needs"), on making the physics look exaggerated on purpose ("primarily a game not a simulation"), and on there being no master plan (§1.3).
- **Every RCT string quoted in round 2 was re-checked against the current OpenRCT2 `en-GB.txt`.** That covers the thoughts (STR_1480–1551), advisor messages (STR_2806–2813), objectives (STR_2386–2408), the warning ladder (STR_3073–3076) and the awards (STR_2814–2847). All match. New finds: **"Wow! A new ride being built!" is a real string (STR_1650)**, not only Sawyer's paraphrase. So are "I'm running out of cash!" (STR_1649) and "Help! Put me down!" (STR_1648). One correction: the toilet-price thought is "I'm not paying that much to use {STRINGID}" (STR_1504) (§2).
- **RCT sales.** "Over nine million unit sales and grossed over $180 million" came from court statements in the Sawyer v Atari royalty case (MCV). RCT was PC Data's best-selling game of 1999 (GameSpot) (§1.4).
- **Zoo Tycoon.** 1M units by Oct 2002 (Microsoft). The franchise passed 4M by July 2004 and 5M by Feb 2005. The "2.5M by Oct 2003" figure is from Wikipedia only (§4.1).
- **Two Point.** "5 million happy players" for Hospital (studio page). Campus reached 1M players two weeks after launch (SEGA). There is no official Two Point Museum figure (§4.3).
- **Frontier.** Planet Zoo sold 5.5M+ units by 31 Oct 2025. Planet Coaster passed 2.5M by Jan 2020. JWE passed 3M by Mar 2020. JWE3 sold 500k in about two weeks (Frontier filings) (§4.1).
- **Planet Zoo 2.** It launched on 13 Oct 2026. **The named partner is BIAZA** (British and Irish Association of Zoos and Aquariums), announced at an event held at Chester Zoo. Round 2's "charity unconfirmed" is resolved (§4.1).
- **RCT World.** Metascore 43; the user score is now 2.0, not 2.1. Development passed from Pipeworks to Area 52 to Nvizzio. Full release came on 16 Nov 2016 after more than seven months in early access. **RCT4 Mobile**: Eurogamer gave it 1/10. **RCT Classic**: 95 scenarios, confirmed on Atari's own page (§4.4).
- **Anthony Pecorella's GDC talks** are now identified: 2015 "Idle Games: The Mechanics and Monetization of Self-Playing Games", 2016 "Quest for Progress: The Math and Design of Idle Games" and "Idle Chatter". "Glorified spreadsheet" traces to a talk video transcript, which I did not watch (§4.4).
- **Sterman.** The "only 36 percent of MIT graduate students" line is in **Sterman (2002) "All Models Are Wrong"**, checked in the PDF. Booth Sweeney & Sterman (2000) itself reports task-level scores (77%, 48%, 41%). Cronin et al. (2009) reports 44% and 31% on the department-store questions (§5.1).
- **Zuckerman & Resnick (2005)** has been read. It is an exploratory interview study of ten 5th-graders. Children preferred "quantity over process (stock over flow)… and inflow over outflow" (§5.1).
- **En-ROADS.** The 949-participant, 37-session npj Climate Action paper (21 Mar 2026) was confirmed. I added the 2018 World Climate study (2,042 participants, ages 11 to 75+, which includes secondary schools) and the 2025 quasi-experimental study with a 6-month follow-up (§5.3).

**Corrected:**
- **Viva Piñata's ladder** runs **Appear → Visit → Resident → Romance**, not "visit → appear → resident" (official requirements guide, §4.3).
- **The "Reading Zoos" Zoo Tycoon 2 critique** is a student essay (Sanne Teune) on a Utrecht University course blog, not a peer-reviewed analysis. It is still useful but now labelled as such (§3.2).
- **Townsmen** started in 2004, not 2003 (GameSpot/GameFAQs; HandyGames' own lists say 2003) (§4.4).

**Gaps closed:**
- **Townsmen** (HandyGames): history, mechanics, the 2012 freemium backlash, and the 2026 "try before you buy" mobile relaunch (§4.4).
- **Roblox tycoons**: Restaurant Tycoon 2, Retail Tycoon 2, Theme Park Tycoon 2, the dropper/conveyor format and its 2008 origin. Roblox lists Tycoon as one of its five top genres of 2021 (§4.5).
- **Children and needs meters, thought bubbles and empathy.** New §5.5 covers about 15 studies. **Headline: no study shows that needs meters or thought bubbles *by themselves* make children more empathic.** Two animal-welfare games for ages 6–13 improved knowledge but **not** compassion (Hawkins et al. 2019; 2020). Thought bubbles must be *taught* as a convention (Wellman 1996). 2nd-graders preferred six progress bars but could not explain them (Tärning et al. 2018).
- **Frontier's "The Guest Brain" diary (Dev Diary #5, 27 Oct 2016)**: the official page and two contemporary write-ups have been read. The video has no transcript that can be fetched, so quotes come from the page and press (§3.1).

**Extended:**
- The Born Free critique of Planet Zoo 2 (13 Oct 2026). It cites a Chester Zoo study in which only 10% of 3,890 visitors stopped at any of 97 signs, for an average of 7 seconds (§3.2).
- Children's systems-thinking studies: Ben-Zvi Assaraf & Orion; BeeSim; Wilensky (§5.4).
- Fishbanks evaluations and the guide's grade range (5–12) (§5.2).

**The Island Park Tycoon spec has been revised:**
- A new 2-minute "Bubble School" warm-up, because the bubble convention must be taught.
- Numeric meters cut to three, with outflow arrows the same size as inflow arrows.
- Stars are now scored on each season's change rather than on absolute totals, so every one of the 729 routes has a fair chance. The rules were checked by script across all routes; the distribution is in §7.3.
- Rebalanced B-card deltas, so vague cards never beat clear ones.
- A rewritten 44-bubble bank with verbatim RCT strings tagged by ID.
- A new "Education boards" alternative card based on the Chester Zoo signage finding.
- An evaluation note: measure understanding, and do not claim empathy.

---

## 1. Primary sources: Chris Sawyer

### 1.1 ArcadeAttack interview (10 Aug 2018)

PDF copy: https://www.tt-ms.de/presse/arcadettack_2018-08-10.pdf (read in round 2; quotes carried over)

- Origin: "Bullfrog's Theme Park game had been published and was a really fun game to play, but quite honestly the rollercoasters in it were rubbish."
- Core loop: "a rollercoaster is only as good as the enjoyment it brings to the guests, so the fundamental mechanics of the game were born – design and build good rides which guests enjoy and you then keep everyone happy and make money."
- **Agents you cannot command:** "Having the guests 'uncontrollable' in the game appealed to me a lot – i.e. you can't force them to do something they don't want to do as they make their own minds up based on what they see and feel and experience."
- Structure versus freedom: the original and its expansions "might have actually been better 'games'". RCT2's push to be "more free-form and less structured… lost in terms of taking away the challenge and sense of achievement."
- A toy: Hasbro "understood that my new game was much like a toy, a giant construction set."
- The guest who photographs your build: a late RCT2 addition that "made it feel like the little guests were really living in their own little world."

### 1.2 Eurogamer, "A big interview with Chris Sawyer" (3 Mar 2016)

PDF copy: https://www.tt-ms.de/presse/eurogamer_2016-03-03.pdf (read in round 2)

- "Perhaps there's a Lego-like philosophy to my games… you build things block-by-block in a rather simplistic and restrictive environment, and then interact with those models to keep things working well."
- "I have a personal disgust for any game which deliberately tries to 'hook' players into feeling they have to pay something extra to continue playing or to take short-cuts."
- He volunteered one afternoon a week with a primary school media team: "I think I learn just as much from the children as they learn from me."

### 1.3 Atari Club interview (Medium, 27 Mar 2024), new this round

URL: https://medium.com/atari-club/684a0efb0f13

- **No master plan.** "There was very little in the way of advance designing or planning at all — I just worked from the bottom-up… early on my only ambition was to create a rollercoaster construction set where you could design, build, and test rollercoasters."
- **Small can be fun.** He wanted players to "realise that even the lowlier and more restricted types of rollercoaster can be fun in their own way rather than always 'bigger or faster or more inversions is better'."
- **Exaggerate so it reads.** The physics was correct but "it didn't look 'right'… so after a bit of trial and error I actually went for a slight visual scaling on the speed and acceleration, exaggerating it a bit… It perhaps makes it slightly less realistic, but a better game… it's primarily a game not a simulation."
- **Easy to succeed if you understand the agents' needs.** "The fundamental thing though was that the game should be relatively easy to succeed with if you grasp the concepts of building good rollercoasters and understanding your guests' needs… If anything the game is too easy, as I didn't want it to become too much about business strategies."
- **Watching, not just managing.** "I was never personally into the business side of these games… but really enjoyed the construction and the tinkering, and watching the little world running."
- **Wide audience, many play styles.** "girls as well as boys, women as well as men, and people of all ages… some were just enjoying designing the flowerbeds and footpaths and making sure their guests were enjoying their stroll."
- **Character in a few pixels.** "it's amazing how much character [the guests] seem to have despite only being a few pixels wide."
- **Closing view:** "a good game just needs to be challenging, rewarding, and fun."

**What this means for DeltaOps.** Sawyer explicitly exaggerated a correct model to make it readable. Scripted, slightly exaggerated consequences, such as a deer stampede or a gull swarm, are in that tradition. The ecology must still be correct in direction: what happens should be true, even if how big it looks is not (see §4.2, the Spore lesson). His "easy to succeed if you understand needs" principle supports giving every group a pass.

### 1.4 Other primary and commercial facts

- "It's 99% written in x86 assembler/machine code (yes, really!)" (Sawyer FAQ): https://www.chrissawyergames.com/faq3.htm
- RCT was the best-selling game of 1999: "That honor goes to Hasbro Interactive and MicroProse's Roller Coaster Tycoon, according to PC Data's figures for all of 1999." https://www.gamespot.com/articles/1999s-best-selling-games/1100-2446252/
- Franchise sales: "The court statements revealed that the series had achieved over nine million unit sales and grossed over $180 million." https://mcvuk.com/development-news/ip-profile-rollercoaster-tycoon/
- RCT Classic offers "95 classic park scenarios from both RollerCoaster Tycoon® and RollerCoaster Tycoon® 2." https://atari.com/products/rollercoaster-tycoon-classic
- A neat AI link for facilitators: Theme Park (1994) was co-designed by Peter Molyneux and Demis Hassabis, who later co-founded DeepMind. https://en.wikipedia.org/wiki/Theme_Park_(video_game)

---

## 2. RCT guest thoughts, advisor messages and objectives (verified)

**Source:** OpenRCT2 `data/language/en-GB.txt`, downloaded 4 Nov 2026 from https://raw.githubusercontent.com/OpenRCT2/OpenRCT2/develop/data/language/en-GB.txt (project: https://github.com/OpenRCT2/OpenRCT2). Strings are quoted exactly; `{STRINGID}` is a ride or shop name. Each line was checked by ID.

### 2.1 Guest thoughts

| Category | Verbatim (ID) |
|---|---|
| Money / value | "I can't afford {STRINGID}" (1480) · "I've spent all my money" (1481) · "I'm not paying that much to go on {STRINGID}" (1488) · "{STRINGID} is really good value" (1490) · "I'm not paying that much to use {STRINGID}" (1504) · "This burger from {STRINGID} is really good value" (1524) · "I'm running out of cash!" (1649) |
| Body needs | "I feel sick" (1482) · "I feel very sick" (1483) · "I'm not hungry" (1493) · "I'm tired" (1499) · "I'm hungry" (1500) · "I'm thirsty" (1501) · "I need to go to the toilet" (1502) |
| Ride preference | "I want to go on something more thrilling than {STRINGID}" (1484) · "{STRINGID} looks too intense for me" (1485) · "Just looking at {STRINGID} makes me feel sick" (1487) · "{STRINGID} was great" (1497) · "I've been queuing for {STRINGID} for ages" (1498) |
| Safety | "Help! I'm drowning!" (1495) · "I want to get off {STRINGID}" (1508) · "I'm not going on {STRINGID} - it isn't safe" (1510) · "Help! Put me down!" (1648) |
| Navigation | "I'm lost!" (1496) · "I can't find {STRINGID}" (1503) · "I can't find the park exit" (1507) |
| Environment | "I'm not going on {STRINGID} while it's raining" (1505) · "The litter here is really bad" (1506) · "This path is disgusting" (1511) · "It's too crowded here" (1512) · "The vandalism here is really bad" (1513) · "Great scenery!" (1514) · "This park is really clean and tidy" (1515) · "The jumping fountains are great" (1516) · "The music is nice here" (1517) |
| Mood / delight | "I want to go home" (1489) · "Wow!" (1550) · "I have the strangest feeling someone is watching me" (1551) · "Wow! A new ride being built!" (1650) |

The guest window labels these "Recent thoughts:" (STR_1654) and shows Happiness, Nausea and Energy bars (STR_1662–1664). So RCT pairs **a few bars with first-person text**, the same split Island Park Tycoon uses.

**Pattern:** first person, usually under 10 words, naming a cause, with positives mixed in among complaints.

### 2.2 Advisor messages (STR_2806–2813)

These aggregate many complaints into one problem plus a suggested fix:
- "Guests are complaining about the amount of litter in your park / Check where your handymen are and consider organising them better" (2807)
- "Guests are hungry and can't find anywhere to buy food" (2809)
- "Guests are complaining because they can't find the toilets in your park" (2811)
- "Guests are getting lost or stuck / Check whether the layout of your footpaths needs improving to help the guests find their way around" (2812)
- "Your park entrance fee is too high! / Reduce your entrance fee or improve the value of the park to attract more guests" (2813)

**DeltaOps parallel:** the bubbles are the evidence, and the facilitator card is the advisor.

### 2.3 Objectives, warning ladder and awards

- Objectives (STR_2386–2396), verbatim:
  - "To have at least {N} guests in your park at the end of {date}, with a park rating of at least 600"
  - "To have at least {N} guests in your park. You must not let the park rating drop below 700 at any time!"
  - "To repay your loan and achieve a park value of at least {X}"
  - "Have Fun!" (2388)
  - "Build the best {STRINGID} you can!" (2389)
- The warning ladder (STR_3073–3076) counts down "4 weeks", then "3 weeks", then "only 2 weeks", then "FINAL WARNING… In just 7 days your park will be closed down unless you can raise the rating". This is graded, recoverable failure.
- Awards (STR_2814–2847) include "Most untidy park award", "Tidiest park award", "Worst value park award", "Best park toilets award", "Most disappointing park award" and "Most confusing park layout award". The award message reads: "Your park has received an award for being 'The park with the most confusing layout'!"

Example scenarios from fan wikis: Forest Frontiers, 250 guests by October Year 1. https://strategywiki.org/wiki/RollerCoaster_Tycoon/Forest_Frontiers

---

## 3. Making agents' needs legible

| Game | How needs are shown | What happens when needs are unmet | Source |
|---|---|---|---|
| RCT 1/2 | Thought list plus Happiness, Nausea and Energy bars; advisor summaries | Guests leave or vomit; rating falls; warnings, then closure | String table (§2); https://rct.fandom.com/wiki/Guests_and_Staff |
| Theme Park (1994) | "crude single-word descriptions" of guest feedback (PC Gamer's contrast) | Business failure | https://www.pcgamer.com/planet-coaster-will-rely-on-sophisticated-guest-brains-to-determine-attendee-behaviour/ |
| Planet Coaster (2016) | "Guest brain": hunger, tiredness, toilet; group type; reaction animations; a made-up guest "language" | Crowding, unhappy guests | §3.1 |
| Planet Zoo (2019) / Planet Zoo 2 (2026) | Welfare across nutrition, social, habitat and enrichment; PZ2 adds "a new, more demanding welfare system" (jeuxvideo.com) | Protests; low conservation and education ratings | https://planetzoogame.com/help-centre/player-guides/the-animals ; https://www.jeuxvideo.com/test/2109385/planet-zoo-2-le-meilleur-jeu-de-gestion-de-tous-les-temps-plus-grand-plus-beau-plus-sauvage.htm ; https://www.gamespew.com/2026/10/planet-zoo-2-review/ |
| Zoo Tycoon (2001/2004/2013) | Animal happiness bars; biome suitability; Kinect care in 2013 | Fewer guests | https://www.expertreviews.co.uk/games/xbox-one-games/53153/zoo-tycoon-review |
| Jurassic World Evolution (2018) | Comfort = environment + social + feeding | Breakout, rampage | https://www.destructoid.com/review-jurassic-world-evolution/ |
| Prison Architect (2015) | Needs bars; grades | Unrest | https://en.wikipedia.org/wiki/Prison_Architect |
| Two Point Campus (2022) | Students with needs and personalities | Dropping out | https://en.wikipedia.org/wiki/Two_Point_Campus |
| Restaurant Tycoon 2 (Roblox) | An information sign shows star ratings for Food, Service, Design, Popularity, Experience and Eco; staff happiness meter | Fewer customers; slow staff | https://restaurant-tycoon-2.fandom.com/wiki/Restaurant_Information_Sign [fan wiki] |
| Townsmen | "only a happy Townie is a hard-working Townie!" | Grumpy town: "revolt or worse, general apathy" | https://gamefaqs.gamespot.com/mobile/920362-townsmen/data ; https://www.pocketgamer.com/townsmen-a-kingdom-rebuilt/ios-android-release/ |
| Universal Paperclips (2017) | The AI itself is the agent; a log shows its "thoughts" | The universe becomes paperclips | https://en.wikipedia.org/wiki/Universal_Paperclips |

### 3.1 Planet Coaster's "Guest Brain"

- **Dev Diary #5, "The Guest Brain" (27 Oct 2016).** "each visitor has their own 'guest brain', making them an expressive individual who thinks, feels and explores your park with their own interests, desires and money. They even have their own language… lets your park guests individually react to every change you make." https://www.planetcoaster.com/en-US/planet-coaster-1/news/pc/dev-diary-5-guest-brain (video: https://www.youtube.com/watch?v=cuQh7IJCrs4; no transcript could be fetched)
- **The Steam beta announcement** says the same: "each park guest has their own thoughts, feelings, desires, and most importantly their own money in their pocket… even down to your color selection of items - all have an impact on the simulation." https://store.steampowered.com/news/posts/?appids=493340&enddate=1477918820&feed=steam_community_announcements
- **Press quoting the video:** "The guests themselves have almost real brains"; families favour gentler rides; "tiredness, hunger and whether or not they require a toilet" affect behaviour. https://www.pcgamer.com/planet-coaster-will-rely-on-sophisticated-guest-brains-to-determine-attendee-behaviour/ ; https://www.pcgamesn.com/planet-coaster/planet-coaster-guest-ai
- **Technical detail (Owen McCarthy, Frontier):**
  - "10,000 guests was what we targeted."
  - Flow fields from each goal: "a path from each goal to all possible positions is computed."
  - Families move as one particle.
  - "awareness, need, and feeling animations (tired, fed up, pointing, laughing, needing the toilet)."
  - https://www.gamedeveloper.com/audio/game-design-deep-dive-creating-believable-crowds-in-i-planet-coaster-i-

**Lab implication:**
- A diorama needs only 10–30 agents walking to goal objects (bench, feeder, hide, bin).
- Every agent's current need should show as an icon or animation.
- The gibberish-language idea is a useful, cheap touch: tiny "voice" blips alongside the text bubbles.

### 3.2 Critiques: happiness bars can teach the wrong thing

- **"Reading Zoos" (Utrecht University course blog; student essay by Sanne Teune, 2021)** on Zoo Tycoon 2:
  - The game frames itself as about education and conservation, but its mechanics reward money and fame.
  - Most needs are met "by choosing a biome… or… a single button press."
  - It also notes ZT2 stayed in NPD's top 20 for at least two more years.
  - https://readingzoos.sites.uu.nl/2021/04/20/zoo-tycoon/
- **Planet Zoo:** "neither high welfare or education ratings are the main marker of success… It's how much you earn." https://www.pcgamesn.com/planet-zoo/review
- **Born Free on Planet Zoo 2 (13 Oct 2026), new:**
  - The game "presents keeping large, far-roaming wild animals happy and healthy as achievable".
  - Releasing unwanted animals raises a "Conservation Rating" when "in the real world, animals kept in zoos are very rarely rewilded".
  - The "visitor appeal rating" favours species "with the greatest identified welfare issues in captivity".
  - On education boards: "a study at Chester Zoo found that only 10% of 3,890 zoo visitors stopped at any of the 97 educational interpretations, and those who did only stopped for an average time of seven seconds."
  - https://www.bornfree.org.uk/news/does-planet-zoo-2-game-reflect-reality-of-modern-zoos/
  - Born Free is an advocacy charity, so this is a critic's reading. I have not read the Chester Zoo study itself.

**For DeltaOps:**
- A lab about an AI that optimises one metric *is* this critique.
- The Born Free signage point makes a good Stage 5 alternative card: "Put up lots of information boards". The meter says Education went up, but the bubbles show nobody reading them (§7.4).

---

## 4. Wider survey

### 4.1 Zoo and wildlife sims (Frontier and Microsoft)

**Zoo Tycoon (Blue Fang / Microsoft, 2001)**
- "more than 1 million licensed units… have been sold" (21 Oct 2002). https://news.microsoft.com/source/2002/10/21/zoo-tycoon-pc-game-celebrates-1-million-units-sold-releases-zoo-tycoon-marine-mania-expansion-pack/
- The franchise passed 4M by July 2004: http://pc.gamespy.com/pc/zoo-tycoon/529739p1.html
- It passed 5M worldwide by Feb 2005: https://www.jeuxactu.com/5-millions-de-zoo-tycoon-7994.htm
- "2.5M by Oct 2003" appears only on Wikipedia: https://en.wikipedia.org/wiki/Zoo_Tycoon_(2001_video_game)

**Zoo Tycoon 2 (2004)**
- Guest and zookeeper first-person modes.
- Common Sense Media rates it 9+.
- https://en.wikipedia.org/wiki/Zoo_Tycoon_2 ; https://www.commonsensemedia.org/game-reviews/zoo-tycoon-2

**Zoo Tycoon (Xbox One, 2013) and the AZA**
- Monthly Community Challenges: players vote for a conservation cause, then collectively hit an in-game target, and Microsoft donated $10,000 per completed challenge.
- The AZA and Woodland Park Zoo advised on animal care.
- https://news.xbox.com/en-us/2013/12/18/games-zoo-tycoon-players-unite/ ; https://news.xbox.com/en-us/2014/02/27/games-zoo-tycoon-aza/ ; https://www.windowscentral.com/microsoft-will-donate-10000-save-endangered-wildlife-based-your-zoo-tycoon-activity ; https://www.aza.org/aza-news-releases/posts/aza-and-microsofts-zoo-tycoon-collaboration-unites-a-virtual-zoo-community-with-real-world-conser-

**Planet Zoo (2019)**
- "Planet Zoo has sold over 5.5 million units worldwide… as of 31 October 2025." https://www.londonstockexchange.com/en/news/article/FDEV/a-strong-launch-for-jwe3-a-sequel-for-planet-zoo/17313651
- Education boards, speakers and Zoopedia; conservation credits for releasing animals.
- Classroom use through Checkpoint.
- https://gamesradar.com/planet-zoo-preview-e3-2019 ; https://dlheinz.com/en/news/76711/conservation-and-planet-zoo-the-lesson-of-a-lifetime.html

**Planet Zoo 2 (13 Oct 2026)**
- Released on PC, PS5 and Xbox Series X|S: https://www.planetzoogame.com/en-US/2/news/2026-10-13/planet-zoo-2-out-now
- **BIAZA collaboration**, announced 16 Sep 2026 at the "Planet Zoo 2 Zoological Summit" held at Chester Zoo. Game Director Gareth Hughes: "collaborating with BIAZA allows us to ensure our research is backed by modern practices and encourages thoughtful play." https://biaza.org.uk/news/detail/planet-zoo-2-brings-the-real-world-into-the-virtual-with-zoo-association-collaboration
- New Wildlife Reserves: you rehabilitate animals in the zoo, then release them into customisable reserves and track them with cameras. https://www.gamespew.com/2026/10/planet-zoo-2-review/
- BIAZA's Andy Hall (as reported): conservation "isn't as a simple as releasing animals out into the wild." https://pixelherald.com/planet-zoo-2-launches-today-with-a-real-world-conservation-partnership-behind-it/
- **This is a UK precedent:** a commercial zoo game partnering with the UK zoo association. A DeltaOps nature-centre or zoo lab could follow the same route, with BIAZA-member venues checking the content.

**Planet Coaster and JWE**
- Planet Coaster passed 2.5M base-game units in Jan 2020: https://frontier-drupal.s3-eu-west-1.amazonaws.com/production/frontier-corp/s3fs-public/press-releases/financial/Annual-Report-2020.pdf
- "Jurassic World Evolution is Frontier's biggest selling game to date by revenue, passing 3 million base game units sold in March 2020." (same report)
- JWE3 launched on 21 Oct 2025: "base game sales have now exceeded 500,000 units" two weeks after release. https://www.londonstockexchange.com/en/news/article/FDEV/a-strong-launch-for-jwe3-a-sequel-for-planet-zoo/17313651
- Players complain small dinosaurs break fences too easily; consequences feel unfair when the cause is unclear. https://steamcommunity.com/app/648350/discussions/1/1728701877452316153

**Jurassic Park: Operation Genesis (2003)**
- Goal: a 5-star park.
- Unlocks "Site B", a fenceless island with no visitors, as a calm reward mode.
- https://en.wikipedia.org/wiki/Jurassic_Park:_Operation_Genesis

### 4.2 Maxis software toys and Spore (carried from round 2)

- SimEarth and SimAnt are software toys "that cannot be won or lost".
- Maxis sold heavily to schools, but a UK teacher found them "too big and complicated for the classroom".
- https://archive.seattletimes.com/archive/19940807/1924051/sim-ply-fascinating----simulation-games-offer-real-educational-opportunities ; https://www.tes.com/news/crawling-enthusiasm
- Spore got failing grades on evolution from a *Science* review team: https://en.wikipedia.org/wiki/Spore_(2008_video_game)
- **Lesson:** an expert must check what direction every scripted outcome goes in.

### 4.3 Family builders: Viva Piñata and Two Point

**Viva Piñata (Rare, 2006)**
- Common Sense Media rates it 8+.
- **Requirement ladder, verified this round:** Appear → Visit → Resident → Romance. For example, Buzzlegum: "Appear Requirements: 2 Buttercups; Visit Requirements: 4 Buttercups; Resident Requirements: 6 Buttercups; Romance Requirements: Eat 2 Fruit." https://pinataisland.info/viva/images/2/2e/Viva.pdf ; https://www.commonsensemedia.org/game-reviews/viva-pinata-xbox-360
- **Lab use:** "What does the hedgehog need before it moves in?" A three-step ladder (spotted → visits → lives here) is easy for children to read.

**Two Point Hospital (2018)**
- 1–3 stars per hospital; one star unlocks the next.
- Official: "Join 5 million happy players." https://www.twopointstudios.com/en/games/two-point-hospital ; https://en.wikipedia.org/wiki/Two_Point_Hospital

**Two Point Campus (2022)**
- "hitting a huge one million players just two weeks after launch." https://sega.prezly.com/two-point-campus-hits-1-million-player-milestone-just-two-weeks-after-launch

**Two Point Museum (5 Mar 2025)**
- No official sales figure; third-party Steam estimates of about 0.5M are not reliable. https://sega.co.jp/en/release/250417_2.html

**Theme Hospital (1997)**
- The game is about how people *think* a hospital runs.
- It used comic diseases to avoid gore.
- https://gamesradar.com/the-making-of-theme-hospital-the-legendary-sim-that-paved-the-way-for-two-point-hospital

**Parkitect (2018)**
- Staff-only paths hide logistics from guests: https://www.gamesasylum.com/?p=58273

**Prison Architect**
- "simulate the world rather than script": https://www.thesixthaxis.com/2015/10/06/prison-architect-interview/

### 4.4 Mobile, social and idle tycoons, and the RCT failures

**Townsmen (HandyGames), gap now closed**
- **History.**
  - Java city-builder first released on 20 Sep 2004: https://gamefaqs.gamespot.com/mobile/920362-townsmen/data ; https://en.wikipedia.org/wiki/Townsmen
  - HandyGames' own catalogue lists 2003: https://en.wikipedia.org/wiki/HandyGames
  - Java sequels followed up to Townsmen 6 Revolution (2009): https://www.pocketgamer.com/townsmen-6/townsmen-6-out-now-for-mobile/
  - A free-to-play smartphone reboot came in 2012: https://www.pocketgamer.com/townsmen/handygames-opens-the-city-gates-releasing-townsmen-onto-android/
  - *A Kingdom Rebuilt* came out on Switch in 2018 and PC on 26 Feb 2019: https://press.thqnordicmobile.com/take-the-crown-townsmen-a-kingdom-rebuilt-out-now
  - It was on Netflix Games from May 2022: https://www.whats-on-netflix.com/news/townsmen-a-kingdom-rebuilt-getting-netflix-mobile-port-in-may-2022/
  - Mobile relaunch on 24 Jul 2026 after "surpassing 2,000,000 pre-registers", with a "Try Before You Buy" model: https://press.thqnordicmobile.com/handygames-launches-townsmen-a-kingdom-rebuilt-on-mobile-with-new-try-buy-experience
- **Mechanics.** Production chains plus citizen satisfaction: "Happy 'Townies' yield higher tax revenues" (same press release). Pocket Gamer: "putting the money first isn't always the best way. If your populace is grumpy, everything will grind to a halt… a revolt or worse, general apathy." https://www.pocketgamer.com/townsmen-a-kingdom-rebuilt/ios-android-release/
- **A freemium cautionary tale.** Pocket Gamer's 2012 review: missions take "an eternity unless you speed the process up with quite pricey Prestige IAPs"; "a massive, overbearing banner ad that can… only be removed with an IAP"; "the happiness of your populace gets relegated to your frantic need to build and harvest just enough to keep playing." https://www.pocketgamer.com/townsmen/review/ In 2026 Pocket Gamer welcomed that HandyGames "ditched the onerous freemium model". https://www.pocketgamer.com/townsmen-a-kingdom-rebuilt/coming-soon-to-android/
- **Lesson:** the same game was praised when premium and panned when timers were sold. The design problem is the monetised wait, not the city-builder.
- **Downloads:** HandyGames' "25 million" Google Play figure is for its whole catalogue (2012), not Townsmen: https://www.pocketgamer.biz/handygames-does-25-million-downloads-from-google-play/

**RCT4 Mobile, RCT Touch and RCT World**
- RCT4 Mobile: Eurogamer gave it 1/10, writing "That £1.99 gets you roughly 45 minutes' worth of cash and tickets." http://www.eurogamer.net/articles/2014-04-18-rollercoaster-tycoon-4-mobile-review ; AppSpy: https://www.appspy.com/review/8423/rollercoaster-tycoon-4mobile
- RCT Touch uses card packs: https://www.commonsensemedia.org/app-reviews/rollercoaster-tycoon-touch
- RCT World:
  - "Since Atari unveiled it in August 2014, it's changed developers multiple times. Pipeworks was first attached to the project before Area 52 Games took over." https://www.polygon.com/2016/3/25/11304200/rollercoaster-tycoon-world-early-access-release-date/
  - Full release on 16 Nov 2016 after "an Early Access development period of more than seven months". https://www.prnewswire.com/news-releases/atari-officially-opens-the-park-gates-to-rollercoaster-tycoon-world-300364200.html
  - Metascore 43, user score 2.0. https://www.metacritic.com/game/rollercoaster-tycoon-world/

**FarmVille, Cow Clicker and Hay Day (carried from round 2)**
- Bogost's Cow Clicker satirised "the exploitation of psychology for profit… and destroyed time." https://en.wikipedia.org/wiki/Cow_Clicker ; https://necsus-ejms.org/cows-clicks-ciphers-and-satire/
- Hay Day's timers can be skipped with premium diamonds: https://en.wikipedia.org/wiki/Hay_Day

**Idle / incremental games**
- Pecorella (Kongregate):
  - GDC 2015, "Idle Games: The Mechanics and Monetization of Self-Playing Games". The listing promises to explain "why the retention is so insanely high, and why they are even very viable free-to-play revenue generators." https://www.gdcvault.com/play/1022065/Idle-Games-The-Mechanics-and
  - GDC Europe 2016, "Quest for Progress": an incremental game is "A game in which the primary goal is to continually increase a number"; idle games are those where "Progress or income is made without player interaction." https://media.gdcvault.com/gdceurope2016/presentations/Pecorella_Anthony_Quest%20for%20Progress.pdf
  - "Idle Chatter", a follow-up: https://www.gdcvault.com/play/1023208/Idle-Chatter-What-We-Can
- **Why to avoid the idle form:** a number that rises without any decision gives children no cause and effect to discuss.
- **The exception is Universal Paperclips (Lantz, 2017).** It uses the idle form as an AI-alignment critique and is the conceptual ancestor of Manager Bot. https://en.wikipedia.org/wiki/Universal_Paperclips

**Game Dev Tycoon (2013)**
- The developer seeded a cracked build in which piracy bankrupts your in-game studio. It reported 93.6% of day-one players on the cracked build **[developer telemetry; carried, not re-checked]**. https://www.theregister.com/2013/04/30/game_dev_tycoon/

### 4.5 Roblox tycoons, gap now closed

All visit counts are live counters, read on or near 4 Nov 2026. Treat them as approximate.

| Game | Developer, year | Visits | Loop | Sources |
|---|---|---|---|---|
| **Theme Park Tycoon 2** | Den_S, 2 Jan 2012 | ≈1.63B | Plot → rides, coasters, terrain, stalls → meet visitor hunger and thirst → earn → unlock; real-time co-building | https://www.roblox.com/games/69184822/Theme-Park-Tycoon-2 ; https://www.robloxgo.com/game/69184822/Theme-Park-Tycoon-2 ; https://news.xbox.com/en-us/2019/01/22/let-your-creativity-run-wild-in-theme-park-tycoon-2-for-roblox-on-xbox-one/ |
| **Restaurant Tycoon 2** | Ultraw Games, 2019 | ≈1.65B | Build a restaurant, cook, seat, serve, hire and level staff; star ratings across Food, Service, Design, Popularity, Experience and Eco attract more customers | https://www.roblox.com/games/3398014311/Restaurant-Tycoon-2 ; https://www.ultrawgames.com/about ; https://restaurant-tycoon-2.fandom.com/wiki/Restaurant_Ratings [fan wiki] |
| **Retail Tycoon 2** | Secondhand Studios, 23 Oct 2020 | ≈340M | Lay out a store, stock shelves, set markup; customers have shopping lists and leave depending on ratings; hire staff to automate | https://www.roblox.com/games/5865858426/Retail-Tycoon-2 ; https://devforum.roblox.com/t/retail-tycoon-2-changelog/858524 |

**The dropper/conveyor format**
- You claim a plot. A dropper spawns bricks, conveyors carry them through upgraders, and a collector turns them into cash. Cash buys "buttons" that add more droppers.
- The loop is claim → buy → collect → buy button → expand.
- The documented ancestor is uberubert's *Bread Factory Tycoon* (Jan 2008). Reusable "tycoon kits" later lowered the barrier to making new ones. **[community wikis]**
- Miner's Haven makes the ore → conveyor → upgrader → furnace chain explicit.
- Sources: https://robloxs.wiki/wiki/tycoon/ ; https://roblox.fandom.com/wiki/Berezaa_Games%E2%84%A2/Miner%27s_Haven

**Roblox's own data**
- Its 2021 report lists Tycoon fifth of the "Top 5 Most Popular Genres", defined as "Experiences closely simulating real-world activities focused around earning money to build and upgrade a user's individual empire." https://about.roblox.com/newsroom/2022/01/year-roblox-2021-data
- The common claim that tycoons are "Roblox's most popular genre" is not supported by this report.

**What children aged 7–13 already expect from tycoons, and what DeltaOps should borrow:**
1. **Visible build-up.** Every purchase physically appears on your plot.
2. **Star sub-ratings.** Restaurant Tycoon 2 splits quality into named categories, close to the Visitors / Wildlife / Tidy split.
3. **Co-building with friends.**

**Avoid:**
- The dropper loop's "number goes up". It is the idle problem again.
- Visit-count and earnings bragging.

### 4.6 Serious economy and climate sims (carried from round 2)

**Eco (Strange Loop Games)**
- US Department of Education SBIR-funded "ECO: An Online Virtual World for Middle School Environmental Literacy…": https://ies.ed.gov/use-work/awards/eco-online-virtual-world-secondary-school-environmental-literacy-and-collaborative-problem-solving

**Fate of the World (2011)**
- Built on an Oxford climate model, but "frustratingly badly explained". Scientific accuracy without legible feedback fails as play.
- https://innovation.ox.ac.uk/?p=8550 ; https://wikiwand.com/en/articles/Fate_of_the_World

**Democracy (Positech)**
- Policies ripple out to overlapping voter groups: https://en.wikipedia.org/wiki/Democracy_(video_game)

---

## 5. Research: systems thinking, simulations, needs displays and empathy

### 5.1 Stocks, flows and the correlation heuristic

**Booth Sweeney & Sterman (2000), "Bathtub Dynamics", *System Dynamics Review* 16(4):249–286**
- Elite business-school students showed "a poor level of understanding of stock and flow relationships and time delays".
- Average score on the simplest graphical task was 77% (N=182), on a second task about 48%, and on the manufacturing case about 41%. "89% drew production trajectories that violate the required conservation of material."
- https://web.mit.edu/jsterman/www/Bathtub.pdf ; https://doi.org/10.1002/sdr.198

**Sterman (2002), "All Models Are Wrong", *SDR* 18(4)**
- "Unfortunately, only 36 percent of the MIT graduate students given this task answered correctly, even with generous coding criteria." (checked in the PDF)
- https://web.mit.edu/jsterman/www/All_Models_Are_Wrong_(SDR).pdf

**Cronin, Gonzalez & Sterman (2009), *OBHDP* 108(1):116–130**
- People "use what we term the 'correlation heuristic', erroneously assuming that the behavior of a stock matches the pattern of its flows."
- The error is robust across contexts, graph formats, incentives and instructions.
- On the department-store questions, 44% and 31% answered correctly.
- https://www.mit.edu/~jsterman/CroninGonzalezSterman061210.pdf ; https://doi.org/10.1016/j.obhdp.2008.03.003

**Zuckerman & Resnick (2005)**
- Exploratory one-to-one interviews with **ten 5th-graders** using System Blocks.
- Children showed "a tendency to prefer: quantity over process (stock over flow), sequential processes over simultaneous processes, and inflow over outflow." (checked in the PDF)
- https://static.clexchange.org/ftp/documents/Research/RS2005-04ChildrensMisconcep.pdf

**Implication:**
- Children will watch the *Visitors* number and ignore the people leaving.
- Show **outflow arrows as large as inflow arrows** ("+12 came, −7 left").
- Animate the leaving as well as the arriving.

### 5.2 Fishbanks: the debrief carries the learning

- **MIT Sloan's web Fishbanks** (Meadows, Sterman, King): teams buy ships and fish a shared, changing stock. https://mitsloan.mit.edu/teaching-resources-library/fishbanks-a-renewable-resource-management-simulation
- **The CLE guide** targets **grades 5–12**. It recommends 30–60 minutes of introduction, about 2 hours of play and 1–2 hours of debrief, and notes that teams usually overfish before they see the problem. http://static.clexchange.org/ftp/newsletter/CLEx24.2.pdf
- **Dahlin, Fenner & Cruickshank (2015)** evaluated Fishbanks and other games at KTH and Cambridge through surveys, interviews and essays. It is a reflective, qualitative evaluation, not a controlled trial. https://doi.org/10.14288/1.0064673
- **Telfer (uOttawa):** "the debriefing following the simulation is as important, if not even more important than the simulation itself." https://telfer.uottawa.ca/en/latest-news/innovation-and-entrepreneurship/a-simple-simulation-to-demonstrate-a-complex-topic-about-sustainable-development

### 5.3 En-ROADS and World Climate: facilitated simulation workshops

| Study | Sample | Design | Findings | Source |
|---|---|---|---|---|
| Rooney-Varga et al. 2018, *PLOS ONE* (World Climate) | 2,042 participants, 39 sessions, 8 nations, **ages ~11 to 75+**, including secondary schools | Single-group pre/post | Gains in understanding and in support for action | https://doi.org/10.1371/journal.pone.0202877 |
| Rooney-Varga et al. 2020, *Simulation & Gaming* (Climate Action Simulation) | 344 participants, 173 matched; includes Miami high-school sessions | Pre/post plus a 6-person focus group; no control | Gains in knowledge and affect | https://journals.sagepub.com/doi/full/10.1177/1046878119890643 |
| Rooney-Varga et al. 2025, *Communications Earth & Environment* | 1,246 participants; 204 treated vs 216 comparison | Quasi-experimental (not randomised); 6-month follow-up (n=112) | Large knowledge gains, kept at 6 months; smaller affect gains; self-reported actions | https://www.nature.com/articles/s43247-025-02744-w |
| Rooney-Varga et al. 2026, *npj Climate Action* | 949 decision-makers, 37 sessions | Pre/post plus interviews | "statistically significant, substantive gains in participant knowledge about climate solutions, their personal connection… and their sense of empowerment" | https://www.nature.com/articles/s44168-026-00348-4 |

**Relevance.** This is still the closest evidence for the DeltaOps format of a facilitated group, a short simulation and a discussion. The 2018 study includes children from about age 11. Every study except 2025 lacks a comparison group, and most outcomes are self-reported.

### 5.4 Systems thinking in children: new this round

- **Ben-Zvi Assaraf & Orion (2005).**
  - 1,000 Israeli students in grades 7–9.
  - Students understood individual processes, but "most of them lack the dynamic, cyclic, and systemic perceptions of the system". Groundwater was often missing, or drawn as static underground lakes.
  - https://doi.org/10.5408/1089-9995-53.4.366
- **BeeSim (Peppler et al. 2010).**
  - Children aged about 7–8 acted as bees in a wearable participatory simulation of nectar collection: "BeeSim contributed to systems understanding and more easily managed group dynamics" (preliminary).
  - https://doi.org/10.1145/1810543.1810582
- **Hmelo-Silver's aquarium work.**
  - Middle-schoolers name structures (fish, plants) but miss behaviours and functions. Making mechanisms explicit helps.
  - https://serc.carleton.edu/NAGTWorkshops/complexsystems/workshop2010/participants/hmelo-silver.html
- **Creative Learning Exchange.**
  - Behaviour-over-time graphs "from preschool through high school".
  - https://systemdynamics.org/teachers/

**Implication.**
- Children see the parts of the island but not how they connect. Each side effect should **show its mechanism on screen**: the path goes through the meadow, then rabbits leave their burrows, then Wildlife falls.
- A behaviour-over-time graph is age-appropriate as the end artefact.

### 5.5 Needs meters, thought bubbles and empathy in children: new this round

**Bottom line: there is no study showing that needs meters or thought bubbles by themselves make 6–14-year-olds more empathic.** The nearest evidence:

| Study | Sample | Finding | Caveat | Source |
|---|---|---|---|---|
| Hawkins, Ferreira & Williams 2019, *Animals* ("Farm Animal Welfare" game) | 133 children aged 6–13 (69 intervention, 64 control), Scotland | Better knowledge of welfare needs and farming systems; more children believed farm animals feel emotions; "did not seem to impact children's attitudes about cruelty or compassion" | Quasi-experimental; short term | https://www.mdpi.com/2076-2615/9/3/91 |
| Hawkins & Williams 2020, *HAI Bulletin* ("Pet Welfare" game) | 184 primary children; game designed for ages 7–12 | Better knowledge; less acceptance of cruelty; "no impact on self-reported compassion" | Self-report; not randomised | https://doi.org/10.1079/hai.2020.0008 |
| Tsai & Kaufman 2009, *J. Educ. Computing Research* (Nintendogs) | 51 children aged 9–11 | Higher empathy and humane-attitude scores after 3 weeks | No control group | https://doi.org/10.2190/EC.41.1.e |
| Chen et al. 2007, *IJAIED* (My-Pet) | 31 11-year-olds | A pet's state showing the learner's own progress increased motivation and awareness of learning status | Pilot; self-report | https://doi.org/10.3233/irg-2007-17(2)04 |
| Chen 2012, *Computers & Education* | Elementary pupils | Strengthened relationship and responsibility toward the agent, but "do not contribute to students' learning achievement" | Sample not verified | https://doi.org/10.1016/j.compedu.2012.05.015 |
| Wellman, Hollander & Schult 1996, *Child Development* | 3–4-year-olds | Few understood bubbles unprompted; once told a bubble "shows what someone is thinking", most did | Younger than the target age | https://pubmed.ncbi.nlm.nih.gov/8706525/ |
| Wellman & Peterson 2013, *Dev. Psychology* | 43 deaf children; trained group aged 7.8–13 | Six sessions of thought-bubble training beat two control groups on theory-of-mind tasks, with transfer | Specific population | https://doi.org/10.1037/a0032419 |
| Tärning et al. 2018, *IxD&A* | 45 children aged 8–12 | 2nd-graders preferred six progress bars "despite their lack of understanding of what the different bars represented"; older children preferred 1–3 | Small; progress bars, not needs bars | https://doi.org/10.55612/s-5002-037-010 |
| Vasalou et al. 2021, *BJET* | 26 children aged 8–11 with reading difficulties | Children noticed explanatory feedback but "struggled to understand the content" | Qualitative | https://doi.org/10.1111/bjet.13145 |

(The Hawkins 2019 quote is from its Simple Summary, read this round. The other rows come from the Exa agent's reading of abstracts; I did not open those full texts.)

**Design consequences, now built into §7:**
1. **Teach the bubble convention for one minute** before play: a picture in the head, which can be wrong. Wellman's work shows the convention must be explained.
2. **Keep numeric meters to three, each with a word label and icon.** Younger children like many bars but cannot read them (Tärning).
3. **Pair every bar with a bubble that says *why***, so understanding does not rest on the bar alone.
4. **Claim knowledge and reasoning gains, not empathy.** Hawkins' games changed knowledge and beliefs about animal minds but not compassion. DeltaOps evaluation should measure "Can you explain why the otter was unhappy even though Wildlife was 70?" rather than empathy scales.

### 5.6 Commercial tycoons in classrooms (carried from round 2)

- A mixed-methods study: 26 children (mean age 11) played RCT3 for 24 hours over 7 weeks and reported carrying economics ideas over to school. https://d.lib.msu.edu/etd/16955/OBJ/download
- Education World: RCT3 is "not designed for the classroom". https://www.educationworld.com/a_tech/tech-in-the-classroom/roller-coaster-tycoon-3.shtml
- **Implication:** short, scripted, facilitator-led slices fit a 30–60-minute session better than full sims.

---

## 6. Synthesis

### What worked

1. **Agents you cannot command** (Sawyer 2018).
2. **Short first-person thoughts that name a cause**, plus a few bars (verified strings, §2.1).
3. **Advisor messages** that turn many complaints into one fix (§2.2).
4. **Target + floor + deadline objectives**; structure gives "sense of achievement" (§2.3, §1.1).
5. **Graded, recoverable failure:** the warning ladder and 1–3 stars.
6. **Easy to succeed if you understand needs** (Sawyer 2024): the pass is generous and mastery is earned.
7. **Exaggerate so it reads**, but keep the direction true (Sawyer 2024; Spore).
8. **Humour:** silly awards, comic diseases, the guest who photographs your build (STR_1650).
9. **A toy mode** ("Have Fun!", Site B, Townsmen and Planet Zoo sandboxes).
10. **Real-world partners:** Zoo Tycoon × AZA; Planet Zoo 2 × BIAZA.

### What failed

1. **Monetised waiting:** RCT4 Mobile, Townsmen 2012, FarmVille, idle games.
2. **Scale without polish:** RCT World's three developers.
3. **Opaque cause:** Fate of the World; JWE fence breaks.
4. **Messages that contradict the mechanics:** ZT2, Planet Zoo, and Born Free's Planet Zoo 2 critique.
5. **Wrong science:** Spore.
6. **Too big for a lesson:** SimAnt in class.
7. **Too many bars for young children** (Tärning; Planet Zoo micromanagement).

---

## 7. Deliverable: "Island Park Tycoon: The Manager Bot" (revised spec)

### 7.1 Premise and learning goals

A floating voxel island has a pond, meadow, woodland edge and visitor gate. About 20 tiny visitors and about 12 animals live there: otters, ducks, hedgehogs, deer, bees, an owl, a frog and rabbits.

**Manager Bot** is a cheerful pretend AI park manager. Each stage the group picks one of three cards. Manager Bot then:
1. Restates the card in its own words.
2. Shows a **GUESS** with a "% sure".
3. Runs a 10-second "season".

It **optimises only what the card says**, like Universal Paperclips in miniature. Visitors and animals are uncontrollable (Sawyer) and react with bubbles. The facilitator debriefs, and the group may retry.

**Learning goals:**
1. An AI follows the objective it is given, not the one you meant.
2. Pushing one number causes side effects elsewhere.
3. Meters summarise; bubbles explain; check both.
4. "% sure" is not "% right".
5. Good objectives are **target + floor + check**.
6. Who you count changes the answer.

### 7.2 Warm-up: Bubble School (2 minutes, new)

The facilitator shows one visitor with an empty bubble: "A bubble shows what someone is thinking. It's a picture in their head, and it can be wrong." (Wellman et al. 1996.)

The children then match three bubbles to three pictures:
- "I'm hungry." → kiosk
- "Too bright to sleep." → owl in the sun
- "Where's the toilet?" → signpost

Then the facilitator points at the Wildlife meter: "This bar is a *summary*. The bubbles tell you *why*."

### 7.3 Meters and stars

| Meter | Range | Shown from | Display rules |
|---|---|---|---|
| **Visitors** | 0–100 | Stage 1 | Stock bar plus **"+came / −left" arrows of equal size**; leaving visitors walk out through the gate (Zuckerman; Sterman) |
| **Wildlife** | 0–100 | Stage 1 | Same arrows; animals visibly arrive or leave |
| **Tidy** | 0–100 | Revealed in Stage 2 | Pops in with a thud when litter first appears |
| **Needs panel** | Four icons per species (Food, Water, Shelter, Friends), each green / amber / red | Stage 3 | Icons, not bars (Tärning) |
| **Move-in ladder** | Spotted → Visits → Lives here | Stage 3 on | Viva Piñata's Appear → Visit → Resident, simplified |

**Meter rules:**
- Start values: V30, W70, T80.
- Meters carry over between stages.
- Displayed values are clamped to 0–100.
- At each stage start every meter is raised to at least 20, so the island always looks recoverable.

**Star rules (revised).** Stars are scored on the **change during that season**, not on totals. This means an earlier bad card never blocks later stars.
- ★ **Target:** the season goal's change was met.
- ★★ **Floor:** no other meter fell by more than 5.
- ★★★ **Check:** no red bubble at season end.

**Final rating, out of 18:**
- 0–7: "Opening Licence" (every group gets a licence)
- 8–14: "Good Neighbour Park"
- 15–18: "Island Champion"

**Route check.** A script ran all 729 first-try routes with the card values in §7.4: `/tmp/claude-0/-home-user-ai-lab-v3/505b1133-ca58-5a66-ac80-788fe642fc38/scratchpad/t08/routes.py`.
- Totals range from 1 (all B) to 18 (all C). All A gives 6.
- Bands: 290 routes Opening Licence, 426 Good Neighbour, 13 Island Champion. Champion needs at least five clear C cards, which is reachable with retries.
- No route ever gives a B card more stars than the A or C card in the same stage.
- Unclamped Wildlife can dip to −15 inside a stage before the display clamp, so the display clamp is required.

**End-of-session award (RCT-style):**
- "Tidiest Island in the Sky" if Tidy ≥ 80
- "Most Confusing Paths" if Stage 1 A was chosen
- "Best Otter Slide in the Country" if all C cards
- "Gull's Favourite Park" if Stage 2 A was chosen

### 7.4 Stage-by-stage (6 stages × 3 cards)

Card types: **A** = clear but single-metric; **B** = deliberately vague; **C** = target + floor. Deltas are V/W/T.

#### Stage 1: Opening Day (Objectives). Target: Visitors +20

| Card | Text | Manager Bot | % sure | Δ V/W/T | Stars | What you see | Bubbles |
|---|---|---|---|---|---|---|---|
| A | "Get 50 visitors." | "Goal: visitors. Fastest way: free entry and a path straight through the meadow!" | 92% | +30/−20/−5 | ★ | Gravel path cuts the meadow; rabbits scatter | V: "Wow, free!" · Rabbit: "My burrow's under that path!" |
| B | "Make the park popular." | "Popular means… loud and fun? I'll guess a bouncy castle!" | 61% | +15/−15/−5 | 0 | Noisy castle; some visitors come, ducks leave | V: "Is this a nature park?" · Duck: "Too loud. Leaving." |
| C | "Get 50 visitors, and keep the meadow wild." | "Visitors and a wild meadow. I'll use the edge path." | 84% | +20/0/0 | ★★★ | Path loops around the meadow | V: "Great scenery!" · Rabbit: "Still cosy here." |

Facilitator: "Manager Bot was 92% sure on A. Did it do what it was told? Did it do what we *wanted*?"

#### Stage 2: Snack Attack (Side effects). Target: the snack jar fills

The jar is a one-stage progress jar, not a persistent money meter.

| Card | Text | Manager Bot | % sure | Δ V/W/T | Stars | What you see | Bubbles |
|---|---|---|---|---|---|---|---|
| A | "Sell as many snacks as possible." | "Maximum snacks! Six kiosks, no bins. Bins cost money." | 95% | +10/−15/−35 | ★ | Wrappers pile up; gulls swirl; Tidy meter pops in | V: "The litter here is really bad" (STR_1506) · Duck: "Crisps… I feel sick." |
| B | "Make some money." | "Money… I'll charge for the toilets!" | 58% | −10/0/−10 | 0 | Queue turns away at a coin toilet | V: "I'm not paying that much to use the toilet" (STR_1504 pattern) |
| C | "Sell snacks and put a bin by every kiosk." | "Two kiosks, two bins, and a litter-picker rota." | 87% | +10/0/+5 | ★★★ | A ranger empties bins | V: "This park is really clean and tidy" (STR_1515) |

Facilitator: "Nobody asked about litter. Why did it matter anyway?"

#### Stage 3: Needs Check (Agents' needs). Target: no Food or Water icon red

The needs panel and the move-in ladder appear here.

| Card | Text | Manager Bot | % sure | Δ V/W/T | Stars | What you see | Bubbles |
|---|---|---|---|---|---|---|---|
| A | "Make the animals happy." | "Happy = fed. Feeding everyone every hour!" | 80% | 0/+5/−10 | ★ | Food icons green; Shelter and Friends stay red; owl in the sun | Otter: "So much fish… but I'm lonely." · Owl: "Too bright to sleep." |
| B | "Fix the animals." | "Fix… they look broken? One big pen for everyone." | 44% | −5/−25/0 | 0 | Crowded pen | Hedgehog: "Too crowded here." · V: "That pen looks sad." |
| C | "Give each animal food, water, shelter and a friend." | "Checking four needs per species. Log pile, owl box, a second otter." | 78% | 0/+20/0 | ★★★ | Hedgehog ladder: Spotted → Visits → **Lives here** | Otter: "Finally, someone to play with!" · Hedgehog: "Lovely log pile." |

Facilitator: "Wildlife went *up* on card A. Was every animal OK? How did you know?"

#### Stage 4: Busy Weekend (Trade-offs). Target: Visitors +25

| Card | Text | Manager Bot | % sure | Δ V/W/T | Stars | What you see | Bubbles |
|---|---|---|---|---|---|---|---|
| A | "Double the visitors." | "Double! Opening every gate, including the nesting area." | 90% | +40/−35/−10 | ★ | Deer stampede (cartoon dust); nests empty | V: "Wow!" (STR_1550) · Duck: "Where are my eggs?" |
| B | "More people!" | "More people… a loud concert by the pond!" | 55% | +20/−30/−15 | 0 | Speaker stacks; frogs hop away | V: "The music is nice here" (STR_1517) · Frog: "I can't hear my friends." |
| C | "More visitors, but close the nesting area until summer." | "Fair in the meadow, rope off the nests, add a viewing hide." | 82% | +25/0/−5 | ★★★ | Rope line; a hide full of children with binoculars | V: "I saw a duckling!" · Duck: "They're quiet. Good." |

Facilitator: "Card A got the most visitors. Who 'paid' for them?"

#### Stage 5: Mystery Complaints (Reading the evidence). Target: Visitors or Wildlife +5

Three loud visitor bubbles want a zip-line. Eight small animal bubbles need shade.

| Card | Text | Manager Bot | % sure | Δ V/W/T | Stars | What you see | Bubbles |
|---|---|---|---|---|---|---|---|
| A | "Do what most bubbles say." | "Biggest bubbles want a zip-line. Building it!" | 73% | +10/−20/0 | ★ | Zip-line over the pond; owls leave | V: "Wheee!" · Owl (small): "No shade left." |
| B | "Do what people want." | "People = visitors. Animals aren't people, so… zip-line!" | 66% | +10/−25/0 | ★ | As A | Hedgehog: "Did anyone ask us?" |
| C | "Count every bubble, animals too, then decide." | "11 bubbles: 3 zip-line, 8 shade. Planting trees and a shady hide." | 88% | +5/+20/0 | ★★★ | Trees grow block by block | Owl: "Perfect." · V: "Nice and cool here." |

**Alternative A card for zoo or nature-centre venues: "Teach visitors about the animals."**
- Manager Bot: "Teaching = signs! Forty information boards!" 90% sure.
- An Education tag shows 100%. The bubbles show: "Too many words." · "I walked past." · "Where are the otters?"
- Facilitator: "One real zoo found only 1 in 10 visitors stopped at any sign, for about 7 seconds (Born Free, citing a Chester Zoo study). Did the meter tell the truth?"

Facilitator: "Why did Manager Bot think the zip-line was most wanted? Whose voices were small?" (This links to training data and bias.)

#### Stage 6: Park Charter (Write your own objective). Target: Visitors +20

Children build the instruction from tiles: one **Goal**, one or two **Never** tiles, and one **Check** tile.

| Card | Text | Manager Bot | % sure | Δ V/W/T | Stars | Outcome |
|---|---|---|---|---|---|---|
| A | Goal tile only | "Just a goal? Whatever reaches it fastest!" | 90% | +30/−30/−10 | ★ | Fast replay of earlier side effects |
| B | "Be the best park ever." | "Best at… what? I'll guess biggest!" | 35% | +20/−25/−5 | 0 | Giant ride; animals leave |
| C | Goal + Never + Check | "Clear goal, clear limits. I can do this." | 85–95% (more tiles, more sure) | +20/+10/+5 | ★★★ | Whole-island celebration; a visitor photographs it: "Wow! A new hide being built!" (STR_1650 nod) |

Facilitator: "Manager Bot was more sure *and* more right. What did you add?"

### 7.5 Thought-bubble bank (44 lines)

Rules:
- First person, 10 words or fewer, naming a cause.
- **Green** = fine, **amber** = mild need, **red** = urgent.
- Lines tagged (STR_nnnn) are verbatim or near-verbatim RCT strings. The rest are original.

**Visitors (22)**
1. "Great scenery!" (green, STR_1514)
2. "This park is really clean and tidy." (green, STR_1515)
3. "The music is nice here." (green, STR_1517; used ironically in Stage 4)
4. "Wow!" (green, STR_1550)
5. "Wow! A new hide being built!" (green, adapted from STR_1650)
6. "I saw a real otter!" (green)
7. "Nice and cool under the trees." (green)
8. "I learned what owls eat!" (green)
9. "Shh, ducklings!" (green; visitors caring)
10. "I'm hungry." (amber, STR_1500)
11. "I'm thirsty." (amber, STR_1501)
12. "I need to go to the toilet." (amber, STR_1502)
13. "I'm lost!" (amber, STR_1496)
14. "It's too crowded here." (amber, STR_1512)
15. "I've been queuing for ages." (amber, adapted from STR_1498)
16. "Is this a nature park or a fair?" (amber)
17. "Too many words. I walked past." (amber; signage card)
18. "I want something more exciting than the pond." (amber, after STR_1484)
19. "The litter here is really bad." (red, STR_1506)
20. "I'm not paying that much to use the toilet." (red, STR_1504 pattern)
21. "That pen looks sad." (red)
22. "I want to go home." (red, STR_1489)

**Animals (22)**
23. Otter: "Fish, splash, nap. Perfect." (green)
24. Otter: "So much fish… but I'm lonely." (amber, Friends)
25. Otter: "Finally, someone to play with!" (green)
26. Duck: "Quiet today. Good." (green)
27. Duck: "Crisps… I feel sick." (red, after STR_1482)
28. Duck: "Where are my eggs?" (red)
29. Duck: "Too loud. Leaving." (red)
30. Hedgehog: "Lovely log pile." (green, Shelter)
31. Hedgehog: "Too crowded here." (amber, after STR_1512)
32. Hedgehog: "Did anyone ask us?" (amber, voice)
33. Deer: "Path through my meadow?" (amber)
34. Deer: "Run!" (red)
35. Owl: "Lovely dark box." (green)
36. Owl: "Too bright to sleep." (amber, Shelter)
37. Owl: "No shade left." (red)
38. Bees: "Meadow is buzzing!" (green)
39. Bees: "Flowers gone. Buzz off then." (red, humour)
40. Frog: "I can't hear my friends." (amber, noise)
41. Rabbit: "Still cosy here." (green)
42. Rabbit: "My burrow's under that path!" (red)
43. Gull: "Free chips everywhere!" (comic: the winner of a bad policy)
44. Any animal: "I have the strangest feeling someone is watching me." (easter egg, STR_1551, when a visitor takes a photo)

### 7.6 Side-effect animations

Each side effect should be visible within 3 seconds, funny rather than frightening, and reversed on retry. Each one shows its **mechanism**, not just the result (§5.4).

| Trigger | Animation (cause shown, then effect) |
|---|---|
| Path through meadow | Gravel voxels replace flowers, then rabbits pop out and hop off |
| Kiosks, no bins | Wrappers stack, gulls swirl in, a duck turns slightly green |
| Pay toilets | A coin slot appears, the queue grows, visitors turn at the gate |
| One big pen | Fences merge, animals squash together, the hedgehog curls up |
| Nesting area opened | The gate swings, a dust cloud, eggs blink, empty nest |
| Concert | Speakers pulse, then frogs hop out one by one |
| Zip-line | The cable cuts through trees, the owl flies off the island edge |
| Forty signs | Boards sprout everywhere, then visitors walk past without stopping |
| Good balance | Trees grow, otters slide, a visitor photographs the island |

### 7.7 Facilitator card bank

- "Point to the words on the card that made Manager Bot guess."
- "Was the % sure the same as how good the result was?"
- "Which meter went up? Which went down? Which one wasn't on the card?"
- "How many visitors *left*? Find the arrow." (outflow; §5.1)
- "Is a full meter the same as every animal being OK?"
- "Who isn't on any meter at all?"
- "If you were the otter, what would you write on the next card?"
- "Real zoos and nature centres have 'Never' rules. Can you think of one here?"
- "Was there a card that helped *everyone*? What made it different?"

### 7.8 End artefact: the Park Charter (A5, printable)

1. **Our Objective:** the Stage 6 tiles (Goal, Never, Check).
2. **Star score** out of 18, rating band and silly award.
3. **Before and after** island snapshots.
4. **Three favourite bubbles**, chosen by the children.
5. **A behaviour-over-time graph** of Visitors and Wildlife across six seasons, with the arrivals and departures shaded.
6. **"Animals who moved in":** the move-in ladder results.
7. Footer: "Manager Bot was a pretend AI. Its answers were written in advance."

No names and no personal data are recorded. A group name is optional.

**Venue option.** Following the Zoo Tycoon × AZA challenges and the Planet Zoo 2 × BIAZA collaboration, a venue could pledge a real action, such as a log pile or a bee bed, when visiting groups collectively reach N stars. Ask a BIAZA-member venue or the venue's ecologist to check the content.

### 7.9 Timing

- **30 minutes:** Bubble School, Stages 1, 2, 4 and 6, then the Charter.
- **60 minutes:** all six stages, one retry each, the Charter and a share-out.
- **"Free Build" toggle** ("Have Fun!" / Site B): decorate without meters, for early finishers.

### 7.10 Evaluation note (new)

Follow the Hawkins findings:
- Measure **reasoning**, not empathy.
- Use three exit items:
  1. "The Wildlife meter was high but the owl was unhappy. Why?"
  2. "Manager Bot was 92% sure. Was it right?"
  3. "Write a Never rule for the pond."
- Observation: do children point at bubbles, not only bars, when explaining?

---

## 8. A tycoon layer for the library labs

Each library lab would share one layer:
- A target + floor objective per stage.
- A single-metric Manager Bot.
- Agent bubbles.
- Change-based stars.
- Equal in/out arrows.
- A charter artefact.

The brochure lists the library: `/home/user/ai-lab-v3/deltaopslearning-brochure/index.html`.

| Lab | Manager Bot optimises | Floor meter | Agents with bubbles | Vague card → side effect | Fit |
|---|---|---|---|---|---|
| **Eco Town** (energy) | "Keep the lights on" / "cheapest power" | Clean Air; evening battery | Residents, bats, shopkeepers | "Cheapest power" → blackout after sunset ("It's dark and cold!") | **High.** The battery is a natural stock and flow to show with arrows |
| **River Town** (water) | "Fill the reservoir" | River Life; downstream farms | Townsfolk, fish, farmers, kayakers | "Plenty of water" → river dries downstream ("Too shallow!") | **High.** A Fishbanks-style commons: upstream vs downstream |
| **Grow Lab** (food) | "Grow the most food" | Soil and Pollinators | Bees, worms, farmers | "Grow loads" → spray → bees leave → next harvest falls | **High.** Delayed consequence (Sterman) |
| Moon Base | "Max crew comfort" | Oxygen and power stocks | Astronauts, plants | "Make it cosy" → heaters drain power | Medium. Clear stocks but few agents |
| Kick Lab | "Win matches" | Player wellbeing, fair play | Players, fans | "Win at all costs" → tired players, fouls | Medium |
| Beat Lab | "Most listens" | Originality | Musicians, listeners | "Make it popular" → every song the same | Low–medium |
| Eco AI Explorer (existing pond lab) | Already has Visitors/Wildlife | Add Tidy and the needs panel | Ducks, visitors | Already "nice" → reeds cut | **High.** Island Park Tycoon is effectively its sequel |

**Recommendation:**
1. Build Island Park Tycoon first, as a nature-centre or zoo lab.
2. Then port the meter, arrow, bubble and star components to River Town and Grow Lab.
3. Use Moon Base for a stocks-only variant.

---

## 9. Recommendations, each tied to evidence

1. **Make agents uncontrollable and talkative** (Sawyer 2018).
2. **Write bubbles like RCT's** and reuse a few verbatim strings as nods (string table, §2.1).
3. **Teach the bubble convention in a 1-minute warm-up** (Wellman 1996; Wellman & Peterson 2013).
4. **Use three numeric meters at most, with icons for needs** (Tärning 2018; Planet Zoo micromanagement).
5. **Show outflow as prominently as inflow** (Zuckerman & Resnick 2005; Sterman 2002; Cronin et al. 2009).
6. **Show the mechanism of each side effect** (Ben-Zvi Assaraf & Orion; Hmelo-Silver).
7. **Make every goal target + floor + check** (RCT objectives).
8. **Score stars on each season's change and keep the pass generous** (Sawyer 2024: "relatively easy to succeed with"; Two Point stars; the 729-route check).
9. **Exaggerate the size of effects, never their direction**, and have an ecologist check them (Sawyer 2024; Spore; Planet Zoo 2 × BIAZA).
10. **Use the gap between meter and bubble deliberately**, including the signage card (Reading Zoos essay; Born Free 2026).
11. **Spend design time on the debrief** (Fishbanks guide; Telfer; En-ROADS studies).
12. **Never monetise or time-gate** (Sawyer 2016; Townsmen 2012 review; RCT4 Mobile 1/10).
13. **Claim reasoning gains, not empathy, in evaluation** (Hawkins et al. 2019, 2020).
14. **Offer a toy mode** ("Have Fun!", Site B).
15. **Seek a zoo-association or venue partner for content checks** (AZA 2013; BIAZA 2026).

---

## 10. Still unverified

- **Frontier's Guest Brain video.** Only the official page, the Steam post and press write-ups were read. The video has no transcript I could fetch.
- **Pecorella's "glorified spreadsheet".** The source is a YouTube transcript cited by the Exa agent. I did not watch the talk.
- **Studies in §5.5 other than Hawkins 2019 and Tärning 2018** were summarised from abstracts by the Exa agent; I did not open the full texts. Samples for Tsai & Kaufman 2014 and Chen 2012 are not verified.
- **The Chester Zoo signage study** (10% of 3,890 visitors, 7 seconds) is known only through Born Free's summary.
- **Townsmen.** First-release year is 2003 or 2004 depending on the source. Townsmen VR is dated 2018 in a press kit and 2022 in Wikipedia's HandyGames table. There is no franchise download total (AppBrain's 16M is an estimate: https://www.appbrain.com/app/townsmen-medieval-strategy-free/com.hg.townsmen7free).
- **Roblox.** Visit counts are live and approximate. The dropper-tycoon origin story comes from community wikis.
- **Carried from round 2, not re-checked this round:**
  - Game Dev Tycoon 93.6%.
  - Hay Day revenue.
  - Zoo Tycoon 2 as NPD #19 in 2004 (Reading Zoos only says "top 20").
  - Planet Zoo educator fan-guide tip.
  - Theme Park's three modes.
  - The MSU RCT3 study.
  - Eco SBIR amounts.
  - Two Point Campus details from Wikipedia.
- **Fishbanks and En-ROADS** evidence remains pre/post or quasi-experimental. There is no randomised trial.
- **Island Park Tycoon ecology:** every animal outcome in §7 needs an ecologist's check before build.
