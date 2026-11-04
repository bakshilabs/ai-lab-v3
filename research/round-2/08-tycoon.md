# 08 · Tycoon and resource-management games (round 2, deeper pass)

Research for DeltaOps Learning: what made Zoo Tycoon, RollerCoaster Tycoon and their relatives work, how they are structured, and a fully specified tycoon-style AI lab.

Compiled November 2026.

## About the sources

**Sources in this pass:**
- Web search, plus direct reads of primary sources.
- Two Chris Sawyer interviews read in full from PDF copies: Eurogamer 2016 and ArcadeAttack 2018.
- The OpenRCT2 English string table, used to verify guest-thought wording.
- A Frontier programmer's Game Developer deep dive.
- Peer-reviewed papers on empathy and systems thinking.

**Labels:**
- **[est.]** marks an estimate or a third-party tracker figure.
- **[unverified]** marks a claim I could not confirm.
- **[gap]** marks topics where the session's web-search budget ran out before I could research them. See "Gaps" at the end.

---

## 1. Primary sources: Chris Sawyer on RollerCoaster Tycoon

### 1.1 ArcadeAttack interview (10 Aug 2018)

PDF copy: https://www.tt-ms.de/presse/arcadettack_2018-08-10.pdf

**Origin**

> "Bullfrog's Theme Park game had been published and was a really fun game to play, but quite honestly the rollercoasters in it were rubbish, and it got me thinking."

It "was never intended as a commercial project". People told him it would have "a very limited appeal, perhaps only amongst rollercoaster enthusiasts."

**The core loop, in his words**

> "a rollercoaster is only as good as the enjoyment it brings to the guests, so the fundamental mechanics of the game were born – design and build good rides which guests enjoy and you then keep everyone happy and make money."

**Agents you cannot command**

> "Having the guests 'uncontrollable' in the game appealed to me a lot – i.e. you can't force them to do something they don't want to do as they make their own minds up based on what they see and feel and experience… quite a satisfying one when you see the results of quite a primitive algorithm looking quite 'human'."

This is the single most transferable idea for DeltaOps. The player, or the AI manager, acts on the *world*, and the agents respond on their own terms.

**Getting lost**

Testers complained that guests got lost in oddly shaped parks. Sawyer replied that he had "managed to get lost myself in exactly the same circumstances in a real theme park so it was actually realistic!" PCGamesN reports the same story: https://pcgamesn.com/rollercoaster-tycoon/code-chris-sawyer

**Broad audience**

> "not just boys who liked strategy games but also girls, younger children, and adults and even grandparents too. And people enjoyed different aspects of the game – some liked the strategic challenges, some liked just building things, some liked interacting and looking after the guests."

**Structure beats freedom**

He calls RCT2 his favourite, but says the original and its expansions "might have actually been better 'games'". The pressure to make RCT2 "more free-form and less structured… lost in terms of taking away the challenge and sense of achievement of the original game."

For RollerCoaster Tycoon Classic he restored the original scenario structure, giving "95 different park scenarios to work through."

**A toy, not just a game**

Hasbro "being a toy company… understood that my new game was much like a toy, a giant construction set."

**The tiny touch that made guests feel alive**

He added this to RCT2 at the last minute: a guest "will occasionally stop and watch you while you're building a new ride, take a photo, and think 'Wow! A new ride being built!'… made it feel like the little guests were really living in their own little world and were personally admiring and getting excited about what you were building."

**Bigger is not better**

> "a bigger and more detailed and nicer looking game doesn't necessarily mean it's more fun to play?"

He said this about his own Locomotion and about RCT's 3D successors.

### 1.2 Eurogamer, "A big interview with Chris Sawyer" (Wesley Yin-Poole, 3 Mar 2016)

PDF copy: https://www.tt-ms.de/presse/eurogamer_2016-03-03.pdf

**A "Lego-like" philosophy**

> "I never really had a design philosophy… Looking back now though perhaps there's a Lego-like philosophy to my games. They're games where you build things block-by-block in a rather simplistic and restrictive environment, and then interact with those models to keep things working well, improving and re-building things when needed and being rewarded for constructive skills and good management."

This is a near-perfect description of a voxel-diorama lab.

**On monetisation**

> "I have a personal disgust for any game which deliberately tries to 'hook' players into feeling they have to pay something extra to continue playing or to take short-cuts."

He also said in-app purchases "can frustrate or warp the game playing experience."

**On RCT World**

> "it's aiming to be a very big game with high ambitions and I know how complex even the earlier/simpler games RollerCoaster Tycoon 1 and 2 were."

**Schools**

At the time he spent one afternoon a week helping a local primary school's media team: "I think I learn just as much from the children as they learn from me."

**Other primary sources**
- Sawyer's own FAQ: "It's 99% written in x86 assembler/machine code (yes, really!)" https://www.chrissawyergames.com/faq3.htm
- The Atari Club Medium interview (https://medium.com/atari-club/684a0efb0f13) returned 403, and archive.org is blocked from this environment, so I did not read it.

### 1.3 Commercial facts

- RCT was the top-selling PC game of 1999.
- The franchise sold 9M+ units by mid-2005, about 7M of them from Sawyer's two games **[reported, dated]**.
- It had a "long tail" sales profile, with most sales after launch.

Sources: https://mcvuk.com/development-news/ip-profile-rollercoaster-tycoon/ ; https://en.wikipedia.org/wiki/RollerCoaster_Tycoon_(video_game)

---

## 2. RCT guest thoughts, objectives and advisor messages, verified from the string table

**Source and method:** OpenRCT2 `data/language/en-GB.txt`, retrieved from https://raw.githubusercontent.com/OpenRCT2/OpenRCT2/develop/data/language/en-GB.txt. OpenRCT2 re-implements RCT2 and keeps the original text (GPLv3 project: https://github.com/OpenRCT2/OpenRCT2). Strings below are quoted verbatim; `{STRINGID}` is a ride or shop name.

**The quote in the brief is real**

> STR_1484: "I want to go on something more thrilling than {STRINGID}"

### 2.1 Guest thoughts (selection, STR_1480–1551)

| Category | Verbatim thoughts |
|---|---|
| Money / value | "I can't afford {STRINGID}" · "I've spent all my money" · "I'm not paying that much to go on {STRINGID}" · "{STRINGID} is really good value" · "This burger from {STRINGID} is really good value" |
| Body needs | "I'm hungry" · "I'm thirsty" · "I'm tired" · "I need to go to the toilet" · "I feel sick" · "I feel very sick" · "I'm not hungry" |
| Ride preference | "I want to go on something more thrilling than {STRINGID}" · "{STRINGID} looks too intense for me" · "Just looking at {STRINGID} makes me feel sick" · "{STRINGID} was great" · "I've been queuing for {STRINGID} for ages" |
| Safety | "I'm not going on {STRINGID} - it isn't safe" · "I want to get off {STRINGID}" · "Help! I'm drowning!" |
| Navigation | "I'm lost!" · "I can't find {STRINGID}" · "I can't find the park exit" |
| Environment | "The litter here is really bad" · "This path is disgusting" · "It's too crowded here" · "The vandalism here is really bad" · "Great scenery!" · "This park is really clean and tidy" · "The jumping fountains are great" · "The music is nice here" · "I'm not going on {STRINGID} while it's raining" |
| Mood / delight | "I want to go home" · "Wow!" · "I have the strangest feeling someone is watching me" |

**Design observations**
- Every thought is **first person, under about 10 words, and names a cause**: a specific ride, shop or place. That is what makes the simulation readable. A thought is a diagnosis written in a child's voice.
- **Positive thoughts exist alongside complaints** ("Great scenery!", "really good value"), so feedback is not only negative.
- **Value thoughts are tied to particular items**, which teaches cause and effect between price and perception.

### 2.2 Advisor messages: turning many thoughts into one actionable hint (STR_2806–2813)

These are aggregated warnings that pair the problem with a suggested fix:
- "Guests are complaining about the amount of litter in your park. Check where your handymen are and consider organising them better"
- "Guests are getting lost or stuck. Check whether the layout of your footpaths needs improving to help the guests find their way around"
- "Your park entrance fee is too high! Reduce your entrance fee or improve the value of the park to attract more guests"

**DeltaOps parallel:** individual thought bubbles are the *evidence*, and the facilitator card is the *advisor*.

### 2.3 Scenario objective types (STR_2386–2408)

| Type | Verbatim objective |
|---|---|
| Guests by date + floor | "To have at least {N} guests in your park at the end of {date}, with a park rating of at least 600" |
| Guests + continuous floor | "To have at least {N} guests in your park. You must not let the park rating drop below 700 at any time!" |
| Park value by date | "To achieve a park value of at least {X} at the end of {date}" |
| Build quality | "To have 10 different types of roller coasters operating in your park, each with an excitement value of at least 6.00" |
| Finish the build | "To finish building all 5 of the partially built roller coasters in this park…" |
| Income | "To achieve a monthly income from ride tickets of at least {X}" |
| Loan + value | "To repay your loan and achieve a park value of at least {X}" |
| Sandbox | "Have Fun!" |

**The escalating warning ladder (STR_3073–3076)** for the "never below 700" scenarios:
1. "WARNING: Your park rating has dropped below 700! If you haven't raised the park rating in 4 weeks, your park will be closed down"
2. "…3 weeks…"
3. "…only 2 weeks…"
4. "FINAL WARNING… In just 7 days"

This is a model for **graded, recoverable failure**.

**Awards (STR_2814–2847)** are humorous, both positive and negative: "The most untidy park in the country", "The tidiest park", "The park with the most confusing layout", "The best toilet facilities in the country", "The most disappointing park in the country". Awards are a cheap, funny way to give a secondary feedback channel.

**Example scenarios (fan wikis, consistent across sources):**
- Forest Frontiers: 250 guests by October, Year 1.
- Evergreen Gardens: 1,000 guests by Year 4.
- RCT2 Factory Capers: 1,100 guests by Year 3.

Source: https://strategywiki.org/wiki/RollerCoaster_Tycoon/Forest_Frontiers

---

## 3. Making agents' needs legible: approaches across the genre

| Game | How needs are shown | What happens when needs are unmet | Source |
|---|---|---|---|
| **RCT 1/2** (1999/2002) | Click a guest for current thought and mood; a guest list shows all thoughts; advisor summaries | Guests leave, vomit, get lost; park rating drops; warnings, then closure | String table above; https://rct.fandom.com/wiki/Guests_and_Staff |
| **Theme Park** (Bullfrog 1994) | Guests and advisors; three switchable depth modes (Sandbox / Sim / Full) | Business failure | https://en.wikipedia.org/wiki/Theme_Park_(video_game) ; https://criticalvideogamestudies.com/?p=3222 |
| **Planet Coaster** (Frontier 2016) | "Guest brain": needs (hunger, tiredness, toilet) plus group type. Families go to carousels, teens to "the most hardcore rollercoaster". Reaction animations (tired, fed up, pointing, laughing, needing the toilet) | Crowding, unhappy guests | https://www.pcgamer.com/planet-coaster-will-rely-on-sophisticated-guest-brains-to-determine-attendee-behaviour/ ; https://www.pcgamesn.com/planet-coaster/planet-coaster-guest-ai |
| **Planet Zoo** (Frontier 2019) | Welfare combines four needs (nutrition, social, habitat, enrichment); per-animal info tab; Guest Education tab | Short lives, illness, protesters; high welfare gives more guests and donations | https://planetzoogame.com/help-centre/player-guides/the-animals ; https://www.pcgamesn.com/planet-zoo/review |
| **Zoo Tycoon** (2001) / **ZT2** (2004) / **ZT** (2013) | Animal happiness bars, biome suitability; 2013 version adds Kinect hands-on care (feed, hose down) | Unhappy animals, fewer guests | https://www.expertreviews.co.uk/games/xbox-one-games/53153/zoo-tycoon-review |
| **Jurassic Park: Operation Genesis** (2003) | Herbivores need trees and companions; carnivores want to hunt | Large carnivores "prone to rampaging when stressed" | https://en.wikipedia.org/wiki/Jurassic_Park:_Operation_Genesis |
| **Jurassic World Evolution** (Frontier 2018) | Comfort combines environmental, social and feeding needs | Escape attempts, fence breach, rampage | https://www.destructoid.com/review-jurassic-world-evolution/ |
| **Prison Architect** (Introversion 2015) | Needs bars (e.g. sanitation); graded on recidivism, happiness, violence | Unrest; Psych Ward DLC: unmet needs plus harsh punishment can make prisoners "criminally insane" | https://en.wikipedia.org/wiki/Prison_Architect |
| **Two Point Campus** (2022) | Individual students with needs and procedurally generated personalities | Failing or dropping out; nightlife causes skipped classes | https://en.wikipedia.org/wiki/Two_Point_Campus |
| **Democracy** (Positech) | Voter factions; every policy affects several groups; each voter belongs to several factions | Losing elections; "cynicism" from broken promises | https://en.wikipedia.org/wiki/Democracy_(video_game) |
| **Universal Paperclips** (Lantz 2017) | *The AI itself* is the agent; an activity log gives "glimpses of the AI's thoughts" | The universe becomes paperclips | https://en.wikipedia.org/wiki/Universal_Paperclips |

### 3.1 Planet Coaster's crowd system: technical detail and what it means for a lab

Owen McCarthy, Principal Programmer at Frontier, describes it here: https://www.gamedeveloper.com/audio/game-design-deep-dive-creating-believable-crowds-in-i-planet-coaster-i-

- **Target scale:** "10,000 guests was what we targeted."
- **Pathfinding:** Instead of a path per guest, "a path from each goal to all possible positions is computed" (flow fields). Rides, shops, entertainers and bins are all goals. Goals switch on and off dynamically; for example, a bin is a goal only while it is not full.
- **Groups:** Families move as one particle.
- **Legibility through animation:** A suite of "awareness, need, and feeling animations (tired, fed up, pointing, laughing, needing the toilet)" plugs in when guests react. The aim was guests "aware of their surroundings."

**Implication for a lab:** a voxel island needs only 10–30 agents. Use "goal" objects (feeder, bench, toilet, hide) that each agent walks to, and make every agent's current need visible as an icon or animation. No crowd simulation is needed.

### 3.2 Critique: happiness bars can teach the wrong thing

**Utrecht University's "Reading Zoos" analysis of Zoo Tycoon 2:** https://readingzoos.sites.uu.nl/2021/04/20/zoo-tycoon/
- The narrative promotes education and conservation, but the mechanics reward money and fame.
- Educators mainly boost donations, and rare animals are valuable because they draw visitors.
- Players can meet most needs "by choosing a biome the designers approved, or by caring for animals with a single button press", which ignores the real difficulty of captive care.
- Pandas breed like any other species, turning animals into "offspring-producing machines."

**Planet Zoo:** reviewers note that "neither high welfare or education ratings are the main marker of success… It's how much you earn." https://www.pcgamesn.com/planet-zoo/review

**For DeltaOps this critique is useful content, not just a warning.** A lab about an AI that optimises one metric *is* the critique. Children can discover that "a happy-bar at 100%" may hide things the meter doesn't measure.

---

## 4. Wider survey

### 4.1 Zoo and wildlife sims

**Zoo Tycoon (Blue Fang / Microsoft, 2001)**
- Made in the wake of RCT; Blue Fang had originally planned a dragon game.
- Passed 1M sales within a year and about 2.5M by October 2003 **[reported]**.
- Microsoft called it a "top-selling family PC game."

Sources: https://en.wikipedia.org/wiki/Zoo_Tycoon_(2001_video_game) ; https://news.microsoft.com/2002/10/21/zoo-tycoon-pc-game-celebrates-1-million-units-sold-releases-zoo-tycoon-marine-mania-expansion-pack/

**Zoo Tycoon 2 (2004)**
- 19th best-selling PC game of 2004 (NPD).
- Added first-person Guest Mode and Zookeeper Mode.
- Developers updated conservation messaging because real zoos' messaging had changed.
- Common Sense Media rates it 9+.

Sources: https://en.wikipedia.org/wiki/Zoo_Tycoon_2 ; https://www.commonsensemedia.org/game-reviews/zoo-tycoon-2

**Zoo Tycoon (Xbox One, 2013)**
- Reviews: family-focused; Kinect hand-feeding and hosing; "too hard for kids and too simple for adults"; scores around 70.
- **The AZA partnership is a strong precedent:**
  - The Association of Zoos and Aquariums and Seattle's Woodland Park Zoo advised on animal care.
  - Monthly **Community Challenges**: players vote for a conservation charity (Rhino Rescue, Komodo Survival Program, Tiger SSP), then collectively hit an in-game target, e.g. "release 1,000 Sumatran tigers into the wild."
  - Microsoft donated $10,000 per completed challenge.
  - Jack Hanna: "players of any age will learn more about what it takes to run a successful zoo."

Sources: https://www.expertreviews.co.uk/games/xbox-one-games/53153/zoo-tycoon-review ; https://news.xbox.com/en-us/2013/12/18/games-zoo-tycoon-players-unite/ ; https://news.xbox.com/en-us/2014/02/27/games-zoo-tycoon-aza/ ; https://www.windowscentral.com/microsoft-will-donate-10000-save-endangered-wildlife-based-your-zoo-tycoon-activity

**Planet Zoo (Frontier, 2019)**
- Frontier described it as "all about conservation and education, and about the welfare of your animals."
- Education features:
  - Education boards and speakers near habitats, plus Zoopedia entries; educated guests donate more.
  - A single educator staff member can beat many boards **[fan guide]**.
- Conservation features:
  - In Franchise mode, releasing animals to the wild earns conservation credits.
  - A Conservation Pack ran community streams with keepers from Highland Wildlife Park.
- Classroom use: a Checkpoint-partnered lesson on bees, bats and beavers.
- Planet Zoo 2 (announced for 13 Oct 2026) launched a partnership with a zoo charity at Chester Zoo; the press release references BIAZA venues **[charity name unconfirmed in snippet]**.
- I found **no WAZA or WWF partnership**.

Sources: https://gamesradar.com/planet-zoo-preview-e3-2019 ; https://www.nerdsandscoundrels.com/planet-zoo-education/ ; https://gameplay.tips/guides/5775-planet-zoo.html ; https://dlheinz.com/en/news/76711/conservation-and-planet-zoo-the-lesson-of-a-lifetime.html ; https://www.gamespress.com/PLANET-ZOO-2-BRINGS-THE-REAL-WORLD-INTO-THE-VIRTUAL-WITH-ZOO-ASSOCIATI ; https://in.marketscreener.com/quote/stock/FRONTIER-DEVELOPMENTS-PLC-13620873/news/Discover-the-Importance-of-Protecting-Nature-with-Planet-Zoo-Conservation-Pack-Out-Now-40775518/

**Wildlife Park (B-Alive, 2003)**
- Metacritic 62; spawned two sequels.
- Wikipedia has no mechanics detail. https://en.wikipedia.org/wiki/Wildlife_Park_(video_game)

**Jurassic Park: Operation Genesis (2003)**
- Goal: a "popular, safe park with a 5-star rating."
- 10 missions (photo safaris, carnivore control).
- Unlocks "Site B": a fenceless island with no visitors, where you simply watch dinosaurs live. This is a calm reward mode after the challenge.
- Sold 400k+ by 2008.

Source: https://en.wikipedia.org/wiki/Jurassic_Park:_Operation_Genesis

**Jurassic World Evolution (2018)**
- Comfort combines environment, social and food.
- Low comfort leads to escape, then rampage.
- Players complain small dinosaurs break fences too easily, i.e. consequences felt unfair when the cause was unclear.

Sources: https://www.destructoid.com/review-jurassic-world-evolution/ ; https://steamcommunity.com/app/648350/discussions/1/1728701877452316153

### 4.2 Maxis "software toys" and Spore

**SimEarth and SimAnt**
- Described as software toys "that cannot be won or lost."
- A "large chunk of Maxis' sales is to schools" (1994).
- SimEarth won the 1991 SPA award for Best Secondary Education Program.
- GamePro named SimAnt "Educational Game of the Year."
- A UK teacher warned they are "too big and complicated for the classroom and require a lot of time to explore."
- Sales were middling.

Sources: https://archive.seattletimes.com/archive/19940807/1924051/sim-ply-fascinating----simulation-games-offer-real-educational-opportunities ; https://www.tes.com/news/crawling-enthusiasm ; https://en.wikipedia.org/wiki/Will_Wright_(game_designer)

**Will Wright on interfaces to "microworlds"** (Stanford HCI seminar): https://hci.stanford.edu/seminar/abstracts/95-96/960426-wright.html

**SimLife (1992)**
- Goal: "experiment and create a self-sustaining ecosystem."
- Computer Gaming World said it bridges "the gap between entertainment and education."
- Won a 1993 CODiE award.

Source: https://en.wikipedia.org/wiki/SimLife

**Spore (2008)**
- Creature Creator content passed 100M items by May 2009.
- Early stages criticised as "extremely simple."
- A *Science* review team gave it failing grades on evolution; Wright frames the player as an "intelligent designer."

Source: https://en.wikipedia.org/wiki/Spore_(2008_video_game)

**Lesson:** an attractive simulation can teach scientific misconceptions. Scripted DeltaOps outcomes must be checked by a subject expert.

### 4.3 Family and ecosystem builders

**Viva Piñata (Rare, 2006)**
- An ecosystem garden where your choices decide which creatures visit and settle. Common Sense Media rates it 8+.
- Reviewers split on whether it is "too complex for kids and too simple for adults."
- Microsoft pushed for kid-friendly themes; a 4Kids cartoon tie-in taught in-game tips.
- Metacritic 84.

Sources: https://en.wikipedia.org/wiki/Viva_Pi%C3%B1ata ; https://www.commonsensemedia.org/game-reviews/viva-pinata-xbox-360 ; https://www.gamerevolution.com/review/37701-viva-pinata-review

The **visit → appear → resident** requirement ladder is widely documented in fan guides **[not verified in this pass]**. It is a good model for "what does this animal need before it moves in?"

**Two Point Hospital (2018)**
- 1–3 stars per hospital; one star unlocks the next.
- Yearly awards; a sardonic PA announcer.
- 5M+ players **[publisher reach claim]**.

Sources: https://en.wikipedia.org/wiki/Two_Point_Hospital ; https://www.pcgamesinsider.biz/news/73074/two-point-hospital-has-hit-5m-players/

**Two Point Campus (2022)**
- Roughly 20-minute academic years ending in graduation.
- Students have personalities and relationships; silly courses like "Knight School".
- A clean campus attracts more students.
- 1M+ players by September 2022; nominated at The Game Awards and the BAFTAs.

Source: https://en.wikipedia.org/wiki/Two_Point_Campus

**Theme Hospital (Bullfrog 1997)**
- Mark Webley: the game is about how people *think* a hospital runs.
- The team researched real hospitals, then used comic, invented diseases to avoid gore.

Sources: https://en.wikipedia.org/wiki/Theme_Hospital ; https://gamesradar.com/the-making-of-theme-hospital-the-legendary-sim-that-paved-the-way-for-two-point-hospital

**Parkitect (2018)**
- Logistics are hidden from guests through staff-only paths and depots.
- Guests dislike seeing crates and staff.

Source: https://www.gamesasylum.com/?p=58273

**Prison Architect**
- Chris Delay: they "simulate the world rather than script."
- Two Point's founders said Prison Architect "gave us the balls to make it."

Sources: https://www.thesixthaxis.com/2015/10/06/prison-architect-interview/ ; https://pcgamer.com/prison-architect-gave-us-the-balls-to-make-it-say-two-point-hospital-developers

### 4.4 Mobile, social, idle and Roblox tycoons

**Hay Day (Supercell, 2012)**
- Loop: crops, then production timers, then truck and boat orders.
- Diamonds (premium currency) speed up production.
- Over $1.2B gross by the end of 2013.
- Designers deliberately "avoided a forced tutorial and quests."

Source: https://en.wikipedia.org/wiki/Hay_Day

**FarmVille and Cow Clicker**
- Ian Bogost's satire Cow Clicker lets you click a cow once every six hours.
- His critique: "enframing, the exploitation of psychology for profit, the lack of meaningful gameplay, and destroyed time."
- FarmVille crops wither if not harvested in their window; Farm Cash buys speed-ups.

Sources: https://en.wikipedia.org/wiki/Cow_Clicker ; https://necsus-ejms.org/cows-clicks-ciphers-and-satire/

**Idle / incremental tycoons**
- The core loop: earn, then automate, then prestige-reset, built "for a perpetual sense of escalation" (IGN).
- Pecorella called them "glorified spreadsheets."
- Mobile monetisation: ad rewards for "doubled offline earnings", time-warps, gacha. AdVenture Capitalist pioneered offline earnings.

Source: https://en.wikipedia.org/wiki/Incremental_game

**Why to avoid them for DeltaOps:**
1. Progress comes from waiting, not deciding, so there is no cause and effect to discuss.
2. Exponential numbers hide trade-offs.
3. The genre's reward schedules are the hook patterns Sawyer says he finds disgusting.
4. Nothing to debrief: there are no agents with needs.

**The exception is Universal Paperclips (Frank Lantz, 2017).**
- It uses the idle form *as a critique*: you play an AI maximising paperclips, after Bostrom's thought experiment.
- Lantz: it gives "first-hand experience of what it means to be fully compelled by an arbitrary goal."
- It is aimed at older players, but its premise is the conceptual ancestor of "The Manager Bot".

Source: https://en.wikipedia.org/wiki/Universal_Paperclips

**RollerCoaster Tycoon 4 Mobile, RCT Touch and RCT World**
- RCT4 Mobile: Eurogamer scored it 1/10; AppSpy called its price "a downpayment on consumable currency".
- RCT Touch uses card packs.
- RCT World (2016) was passed between developers, launched in early access to "mostly negative" reviews, and ended at Metacritic 43 / user score 2.1.

Sources: https://www.tt-ms.de/presse/eurogamer_2016-03-03.pdf ; https://www.appspy.com/review/8423/rollercoaster-tycoon-4mobile ; https://www.commonsensemedia.org/app-reviews/rollercoaster-tycoon-touch ; https://en.wikipedia.org/wiki/RollerCoaster_Tycoon_World ; https://gamespot.com/articles/atari-responds-to-negative-rollercoaster-tycoon-re/1100-6438887/

**Roblox: Theme Park Tycoon 2 (Den_S, 2012)**
- Roughly 1.2–1.6B visits **[trackers disagree]**.
- Real-time co-building with friends.

Sources: https://rotrends.com/game/31970568/Theme-Park-Tycoon-2 ; https://news.xbox.com/en-us/?p=109000

**Gaps:** Restaurant Tycoon 2, Retail Tycoon and the "dropper/conveyor" Roblox tycoon genre **[gap]**. Townsmen (HandyGames) **[gap: Wikipedia page not found, search budget exhausted]**.

**Game Dev Tycoon (Greenheart, 2013)**
- The developer seeded a cracked build in which piracy bankrupts your in-game studio.
- Day one: 93.6% of players were on the cracked build **[developer telemetry]**.
- A system "talking back" through its own rules.

Source: https://www.theregister.com/2013/04/30/game_dev_tycoon/

### 4.5 Serious and educational economy and climate sims

**Eco (Strange Loop Games)**
- US Department of Education SBIR funding: Phase I 2014 ($149,833), Phase II 2015 ($899,871), Phase I 2017 ($149,152).
- Project title: "ECO: An Online Virtual World for Middle School Environmental Literacy and Collaborative Problem Solving."
- A shared voxel world where actions have simulated ecological effects and players write their own laws.
- A qualitative study of 39 middle schoolers found chat about STEM and civics.
- Design motto: "Make it as easy as an iPhone."
- Early Access in 2018.

Sources: https://ies.ed.gov/use-work/awards/eco-online-virtual-world-secondary-school-environmental-literacy-and-collaborative-problem-solving ; https://ies.ed.gov/sbir/ECO.asp ; https://www.prweb.com/releases/2015/06/prweb12790599.htm

**Fate of the World (Red Redemption, 2011)**
- Climate model from Oxford's Myles Allen.
- Metacritic 70.
- Criticised for "unclear game mechanics, a brutal difficulty curve and a lack of feedback." PC Gamer: "frustratingly badly explained."

Sources: https://innovation.ox.ac.uk/?p=8550 ; https://wikiwand.com/en/articles/Fate_of_the_World

**Lesson:** scientific accuracy without legible feedback fails as play.

**Democracy (Positech)**
- Policies ripple to overlapping voter groups.
- A reviewer said it "does much more for understanding democracy than any citizenship lesson."
- Losing is "almost as rewarding as winning."
- Criticised for contestable modelling of issues like the death penalty and drug legalisation.

Source: https://en.wikipedia.org/wiki/Democracy_(video_game)

---

## 5. Systems thinking and empathy research

### 5.1 People are poor at stocks, flows and delays without help

**Booth Sweeney & Sterman (2000), "Bathtub Dynamics", *System Dynamics Review* 16:249–294.**
- Elite business-school students "have a poor level of understanding of stock and flow relationships and time delays."
- Performance "did not vary systematically with prior education, age, national origin."
- Source: https://mitmgmtfaculty.mit.edu/jsterman/bathtubdynamics/

**Follow-ups**
- Only 36% of MIT graduate students drew the bathtub level correctly **[via citing papers]**.
- Cronin, Gonzalez & Sterman (2009) name the "correlation heuristic" (assuming a stock looks like its inflow). The error is robust across displays, cover stories and incentives.
- Source: https://www.cmu.edu/dietrich/sds/ddmlab/papers/CroninGonzalez2007.pdf

**Children:** Zuckerman (2005), "Children's Misconceptions as Barriers to Learning Stock-and-Flow Modeling", and a study finding misconceptions "regardless of age" among middle schoolers.
- Source: https://archives.albany.edu/description/catalog/ua435aspace_2dd46b732a5382f08a3f61c82acb227a

**Implication:** a meter that *accumulates*, like visitors in the park or litter on the ground, will be misread by children as following the current action. **Show the flow as well as the stock**: arrows in and out, and a per-day "+12 / −5".

### 5.2 Debrief is where the learning happens: Fish Banks and the commons

- **Fish Banks:** Dennis Meadows' tabletop game; MIT Sloan (Sterman et al.) host a web version as a public good. Teams fish a shared sea and usually collapse it; the debrief leads to Hardin's "Tragedy of the Commons."
- Telfer School (uOttawa) found "the debriefing following the simulation is as important, if not even more important than the simulation itself."
- Evidence is anecdotal; I found no controlled study.

Sources: https://systemdynamics.org/?p=1047 ; https://telfer.uottawa.ca/en/latest-news/innovation-and-entrepreneurship/a-simple-simulation-to-demonstrate-a-complex-topic-about-sustainable-development ; https://sustainabilityscience.org/course/part-0-introduction/unit-0-2-tragedies.html

### 5.3 Facilitated simulation workshops build knowledge, urgency and hope: En-ROADS

**Rooney-Varga et al. (2026, *npj Climate Action*)**
- 949 decision-makers across 37 En-ROADS / Climate Action Simulation workshops.
- "Statistically significant, substantive gains" in solution knowledge, personal connection and empowerment.
- Urgency and hope "motivated participants to act."

**Earlier study:** 962 participants in 29 sessions showed gains in urgency, hope, intent and agency.

**Caveats:** pre/post designs with no control group; self-report only.

Sources: https://www.eurekalert.org/news-releases/1121567 ; https://proceedings.systemdynamics.org/2022/abstracts/1329.html ; https://www.climateinteractive.org/blog/new-research-simulations-support-decision-makers-in-taking-climate-action

**Relevance:** this is the closest evidence base for "facilitated group, simulation, then discuss" sessions, the DeltaOps format. Pairing consequences with an achievable better option is what produces hope rather than despair.

### 5.4 System dynamics for children

- The Creative Learning Exchange (founded 1991 by Jay Forrester) supports K-12 use of behaviour-over-time graphs, causal loops and simple stock-flow diagrams "from preschool through high school."
- Stella Online free tier: up to 12 icons and 2 stocks.

Sources: https://systemdynamics.org/teachers/ ; https://proceedings.systemdynamics.org/2000/PDFs/lyneis17.pdf

**Implication:** a one-page "what went up, what went down" graph is age-appropriate as an end artefact.

### 5.5 Perspective-taking and needs displays → empathy

**Herrera, Bailenson, Weisz, Ogle & Zaki (2018), PLOS ONE, "Building long-term empathy."**
- Any perspective-taking (narrative, desktop or VR) increased empathy and connection compared with reading facts.
- Immersive VR produced more lasting attitudes and more petition signatures.
- Source: https://journals.plos.org/plosone/doi?id=10.1371/journal.pone.0204494

**Ahn, Bostick, Ogle, Nowak, McGillicuddy & Bailenson (2016), JCMC 21(6), "Experiencing Nature: Embodying Animals…"**
- Embodying a cow or coral increased "inclusion of nature in self" more than video, with small-to-moderate effects; persisted after one week in one experiment.
- Source: https://academic.oup.com/jcmc/article/21/6/399-419/4161788

**Caveats:** these are adult/young-adult samples using VR. I found no study isolating thought bubbles or needs meters and child empathy **[gap]**.

**Reasonable inference [not evidence]:** first-person thought bubbles from animals are a lightweight form of perspective-taking. Phrase them in first person ("I can't find shade") rather than as system labels ("Shade: 20%").

### 5.6 Educational use of commercial tycoons

- A mixed-methods study: 26 children (average age 11) played RCT3 for 24 hours over 7 weeks. They learned economics and social-studies principles and carried them over to school. https://d.lib.msu.edu/etd/16955/OBJ/download
- USF RCT physics lessons: https://www.usf.edu/education/faculty-staff/rosengrant-virtual-stem-laboratory/video-game-physics/lessons-rubrics.aspx
- Education World: covers budgeting and marketing but "not designed for the classroom." https://www.educationworld.com/a_tech/tech-in-the-classroom/roller-coaster-tycoon-3.shtml
- Maxis sold heavily to schools, but teachers found the sims too big for lesson time (see 4.2).

**Implication:** short, scripted, facilitator-led slices beat full sims in a 30–60-minute slot.

---

## 6. Synthesis: what made tycoons work, and what failed

### Worked

1. **Agents you cannot command.** You change the world; agents decide (Sawyer, 2018).
2. **Short first-person thoughts that name a cause.** The verified RCT strings.
3. **Aggregated advisor hints** that turn many thoughts into one actionable message (RCT STR_2806–2813).
4. **Target + floor + deadline objectives**, e.g. "N guests by date, rating ≥ 600". Sawyer believed structure gave more "sense of achievement" than free-form play.
5. **Graded, recoverable failure:** the four-step warning ladder; 1–3 stars in Two Point.
6. **Humour:** comic diseases, silly awards ("most confusing layout"), the PA announcer, the guest who photographs your build.
7. **A toy as well as a game:** a "Lego-like" construction set with Sandbox/"Have Fun!" alongside scenarios. Theme Park lets you switch depth at any time.
8. **Many ways to enjoy it:** strategy, building, or caring for guests (Sawyer's broad audience).
9. **Visible consequences:** vomit, litter, protesters, rampages, guests walking out.
10. **Real-world links:** the Zoo Tycoon × AZA challenges and Planet Zoo conservation credits.

### Failed or risky

1. **Monetised timers and currencies:** RCT4 Mobile, FarmVille, idle tycoons.
2. **Scale without polish:** RCT World; Sawyer: bigger "doesn't necessarily mean it's more fun."
3. **Opaque systems:** Fate of the World's "lack of feedback"; JWE's unclear breakout causes.
4. **Narrative/mechanic mismatch:** welfare messaging while money wins (ZT2, Planet Zoo critiques).
5. **Scientifically wrong models:** Spore's evolution.
6. **Too big for a lesson:** SimAnt in classrooms.
7. **Micromanagement overload:** Planet Zoo reviews.

---

## 7. Deliverable: "Island Park Tycoon: The Manager Bot" (full lab spec)

### 7.1 Premise

A floating voxel island has a pond, meadow, woodland edge, a small visitor gate, and about 20 tiny visitors and about 12 animals: otters, ducks, hedgehogs, deer, bees, an owl.

The island has hired **Manager Bot**, a cheerful AI park manager. Each stage the group picks one of three instruction cards. Manager Bot then:
1. Says how it interpreted the card.
2. Shows a guess and a "% sure".
3. Runs a "season" in about 10 seconds of animation.

Manager Bot **optimises only what the card says**, like Lantz's paperclip AI in miniature. Visitors and animals are "uncontrollable" (Sawyer): they react with thought bubbles. The facilitator debriefs, and children may retry.

**Learning goals (AI literacy plus systems thinking)**
1. An AI follows the objective it is given, not the one you meant.
2. Optimising one number causes side effects elsewhere.
3. Agents have needs; meters summarise them, but bubbles explain them.
4. "% sure" is not "% right."
5. Good objectives look like **target + floor**: "do X, but never let Y fall below Z."

### 7.2 Meters (UI)

| Meter | Range | Shown from | Notes |
|---|---|---|---|
| **Visitors** | 0–100 | Stage 1 | Stock; also shows "+in / −out today" arrows (§5.1) |
| **Wildlife** | 0–100 | Stage 1 | Average of animal needs |
| **Tidy** | 0–100 | Stage 2 (was hidden) | Revealed when litter first appears; the reveal is a teaching moment |
| **Animal needs panel** | 4 icons per species: Food · Water · Shelter · Friends | Stage 3 | Planet Zoo's four needs, simplified; green / amber / red |
| **Park Stars** | 0–3 per stage | Stage 1 | Shown after each season |

**Meter rules**
- Start values: Visitors 30, Wildlife 70, Tidy 80.
- Meters carry over between stages.
- Each stage start clamps meters to at least 20 so no route becomes unrecoverable.
- This keeps all 729 routes playable.

### 7.3 Star thresholds (per stage)

- ★ **Target met:** the card's headline goal (e.g. Visitors ≥ 50).
- ★★ **Target + floor:** also Wildlife ≥ 60 and Tidy ≥ 60.
- ★★★ **No red bubbles:** no animal shows a red "need" bubble at season end.

**Final Park Rating** = total stars out of 18:
- 6+ = "Opening Licence"
- 11+ = "Good Neighbour Park"
- 15+ = "Island Champion"

Every group passes; stars mark mastery (Two Point model). Optional silly award at the end, RCT-style: "Tidiest Island in the Sky", "Most Confusing Paths", "Best Otter Slide in the Country".

### 7.4 Stage-by-stage spec (6 stages × 3 cards)

Card types: **A** = clear but single-metric; **B** = deliberately vague; **C** = target + floor. Deltas are applied to Visitors (V), Wildlife (W) and Tidy (T).

#### Stage 1: Opening Day (Objectives)

Season goal: "Get 50 visitors by the end of spring."

| Card | Card text | Manager Bot says | % sure | Deltas | What you see | Sample bubbles |
|---|---|---|---|---|---|---|
| A | "Get 50 visitors." | "Goal: 50 visitors. Fastest way: big sign, free entry, path straight through the meadow!" | 92% | V+30, W−20, T−5 | A gravel path cuts the meadow; rabbits scatter; a queue appears | V: "Wow, free!" · A (rabbit): "My burrow's under that path!" |
| B | "Make the park popular." | "Popular means… lots of people? I'll guess yes!" | 61% | V+25, W−15, T−5 | As A, plus a noisy bouncy castle | V: "Is this a nature park?" · A (duck): "Too loud. Leaving." |
| C | "Get 50 visitors, and keep the meadow wild." | "50 visitors and a wild meadow. I'll use the edge path." | 84% | V+20, W±0, T±0 | A path loops around the meadow; a wooden sign | V: "Great scenery!" · A (rabbit): "Still cosy here." |

**Facilitator question:** "Manager Bot was 92% sure on card A. Did it do what it was told? Did it do what we *wanted*?"

#### Stage 2: Snack Attack (Side effects)

Season goal: "Earn snack money for a new hide, but keep the paths nice."

| Card | Card text | Manager Bot says | % sure | Deltas | What you see | Sample bubbles |
|---|---|---|---|---|---|---|
| A | "Sell as many snacks as possible." | "Maximum snacks! Six kiosks, open all day, no bins (bins cost money)." | 95% | V+10, W−15, T−35 (Tidy meter revealed) | Wrappers pile up; gulls swarm; ducks eat crisps | V: "The litter here is really bad" · A (duck): "Crisps… I feel sick" |
| B | "Make some money." | "Money… I'll charge for the toilets!" | 58% | V−10, W±0, T−10 | Queue at a coin-operated toilet; visitors leave | V: "I'm not paying that much to use the toilet!" |
| C | "Sell snacks and put a bin by every kiosk." | "Two kiosks, two bins, and a litter-picker rota." | 87% | V+10, W±0, T+5 | A little bin-emptying ranger walks around | V: "This park is really clean and tidy" |

**Side-effect animation (card A):** the litter count ticks up; a hidden Tidy meter "pops" into the UI with a thud.

**Facilitator question:** "Nobody asked about litter. Why did it matter anyway? Whose job is it to think about the things not on the card?"

#### Stage 3: Needs Check (Agents' needs)

Season goal: "Make sure every animal has what it needs." The 4-icon needs panel appears.

| Card | Card text | Manager Bot says | % sure | Deltas | What you see | Sample bubbles |
|---|---|---|---|---|---|---|
| A | "Make the animals happy." | "Happy = fed. Feeding everyone every hour!" | 80% | W+5, T−10 (Food green, but Shelter/Friends stay red) | Overfed ducks; otter still alone; owl in full sun | A (otter): "So much fish… but I'm lonely." · A (owl): "Too bright to sleep." |
| B | "Fix the animals." | "Fix… they look broken? Moving them all into one big pen." | 44% | W−25 | Crowded pen; deer push; hedgehog hides | A (hedgehog): "Too crowded here." · V: "That looks sad." |
| C | "Give each animal food, water, shelter and a friend." | "Checking four needs for each species. Adding a log pile, a nest box and a second otter." | 78% | W+20 | Log pile, owl box, otter pair playing | A (otter): "Finally, someone to play with!" · A (owl): "Lovely dark box." |

**Facilitator question:** "The Wildlife meter went up a bit on card A. Was every animal OK? How did you know?" Point at the bubbles versus the meter.

#### Stage 4: Busy Weekend (Trade-offs)

Season goal: "Double the visitors for the summer fair, Wildlife at least 60."

| Card | Card text | Manager Bot says | % sure | Deltas | What you see | Sample bubbles |
|---|---|---|---|---|---|---|
| A | "Double the visitors." | "Double! Opening every gate, including the nesting area." | 90% | V+40, W−35 | **Big side-effect moment:** the deer herd bolts across the island; nests empty | V: "Wow!" · A (deer): "Run!" · A (duck): "Where are my eggs?" |
| B | "More people!" | "More people… I'll hold a loud concert at the pond!" | 55% | V+30, W−30, T−15 | Speaker stacks; frogs vanish | V: "The music is nice here" · A (frog): "I can't hear my friends." |
| C | "More visitors, but close the nesting area until summer." | "Fair in the meadow, rope off the nesting zone, add a viewing hide." | 82% | V+25, W±0 | Rope line, hide with binocular kids | V: "I saw a duckling!" · A (duck): "They're quiet. Good." |

**Facilitator question:** "Card A got the most visitors. Was it the best park? Who 'paid' for the extra visitors?"

#### Stage 5: Mystery Complaints (Reading the evidence)

Visitors and animals produce mixed bubbles: three loud visitors want a zip-line, while eight animals quietly need shade.

| Card | Card text | Manager Bot says | % sure | Deltas | What you see | Sample bubbles |
|---|---|---|---|---|---|---|
| A | "Do what most bubbles say." | "Counting bubbles… the zip-line bubbles are biggest! Building a zip-line." | 73% | V+10, W−20 | Zip-line over the pond; owls leave | V: "Wheee!" · A (owl, small bubble): "No shade left." |
| B | "Do what people want." | "People = visitors. Animals aren't people, so… zip-line!" | 66% | V+10, W−25 | As A | A (hedgehog): "Did anyone ask us?" |
| C | "Count every bubble, animals too, then decide." | "11 bubbles: 3 want a zip-line, 8 need shade. Planting trees and a shady hide." | 88% | V+5, W+20 | Trees grow (voxel growth animation) | A (owl): "Perfect." · V: "Nice and cool here." |

This stage teaches that **loud is not the same as many**, and that **data includes who you choose to count**. Facilitators can link it to training data and bias.

**Facilitator question:** "Why did Manager Bot think the zip-line was most wanted? Whose voices were small?"

#### Stage 6: Park Charter (Write your own objective)

Children build the final instruction from tiles (no typing). One **Goal** tile, one or two **Never** tiles, one **Check** tile, for example:

- Goal: "Get 80 visitors"
- Never: "…but never let Wildlife fall below 60"
- Never: "…and keep a bin by every kiosk"
- Check: "…and check the animal bubbles each season"

| Card | Card text | Manager Bot says | % sure | Outcome |
|---|---|---|---|---|
| A | Goal tile only | "Just a goal? I'll do whatever reaches it fastest!" | 90% | Replays the worst side effects quickly, as a montage |
| B | "Be the best park ever." | "Best at… what? I have to guess: biggest!" | 35% | Giant ride; animals leave |
| C | Children's own Goal + Never + Check | "Clear goal, clear limits. I can do this." | 85–95% (scales with tiles used) | Full-island celebration; the RCT2 "Wow! A new ride being built!" nod: a visitor photographs the children's park |

**Facilitator question:** "Manager Bot was more sure *and* more right this time. What did you add that helped?"

### 7.5 Thought-bubble bank (40 lines)

These are original lines, styled on the verified RCT patterns: first person, under 10 words, naming a cause. Colour code: **green** = good, **amber** = mild need, **red** = urgent need.

**Visitors (20)**
1. "Great scenery!" (green; a direct RCT nod)
2. "I saw a real otter!" (green)
3. "This park is really clean and tidy." (green; RCT)
4. "Nice and cool under the trees." (green)
5. "I learned what owls eat!" (green)
6. "Wow, a new hide being built!" (green; Sawyer's nod)
7. "I'm hungry." (amber; RCT)
8. "Where's the toilet?" (amber)
9. "I'm lost!" (amber; RCT)
10. "It's too crowded here." (amber; RCT)
11. "Too sunny, no shade." (amber)
12. "I've been queuing for ages." (amber; RCT)
13. "The litter here is really bad." (red; RCT)
14. "I'm not paying that much!" (red; RCT pattern)
15. "Is this a nature park or a fair?" (amber)
16. "Too noisy to hear the birds." (amber)
17. "I want something more exciting than the pond." (amber; the "more thrilling" nod)
18. "That pen looks sad." (red)
19. "I want to go home." (red; RCT)
20. "Shh, ducklings!" (green; shows visitors caring)

**Animals (20)**
21. Otter: "Fish, splash, nap. Perfect." (green)
22. Otter: "So much fish… but I'm lonely." (amber; Friends need)
23. Otter: "Finally, someone to play with!" (green)
24. Duck: "Crisps… I feel sick." (red; Food quality)
25. Duck: "Where are my eggs?" (red; nesting)
26. Duck: "Quiet today. Good." (green)
27. Hedgehog: "Too crowded here." (amber; RCT echo)
28. Hedgehog: "Lovely log pile." (green; Shelter)
29. Hedgehog: "Did anyone ask us?" (amber; voice and fairness)
30. Deer: "Run!" (red; disturbance)
31. Deer: "Path through my meadow?" (amber)
32. Owl: "Too bright to sleep." (amber; Shelter)
33. Owl: "Lovely dark box." (green)
34. Owl: "No shade left." (red)
35. Bees: "Flowers gone. Buzz off then." (red; humour)
36. Bees: "Meadow is buzzing!" (green)
37. Frog: "I can't hear my friends." (amber; noise)
38. Rabbit: "My burrow's under that path!" (red)
39. Gull: "Free chips everywhere!" (comic, shows a perverse winner of a bad policy)
40. Any animal: "I have the strangest feeling someone is watching me." (easter egg; verbatim RCT STR_1551, fun when a visitor is photographing)

### 7.6 Side-effect animation list

Each side effect should be visible within 3 seconds, funny not frightening, and reversible on retry.

| Trigger | Animation |
|---|---|
| Path through meadow | Rabbits pop out of burrows and hop away; flowers flatten into gravel voxels |
| Too many kiosks, no bins | Wrapper voxels pile up; gulls arrive in a swirl; a duck turns slightly green |
| Pay toilets | Queue grows, then visitors turn around at the gate (RCT price behaviour) |
| One big pen | Animals squash together; a hedgehog curls into a ball |
| Nesting area opened | Deer stampede (cartoon dust cloud); eggs blink, then nest empty |
| Concert | Speaker stacks pulse; frogs hop out of the pond one by one |
| Zip-line | Owl flies off the island edge with a "bye" bubble |
| Good balance | Trees grow block by block; otters slide; a visitor takes a photo |

### 7.7 Facilitator card bank (beyond the per-stage questions)

- "What did Manager Bot *assume*? Point to the words on the card that made it guess."
- "Was the % sure the same as how good the result was?"
- "Which meter went up? Which went down? Which one wasn't on the card?"
- "If you were the otter, what would you write on the next card?"
- "Is a full meter the same as every animal being OK?" (links to the Zoo Tycoon happiness-bar critique)
- "Who isn't on any meter at all?" (e.g. the insects, the rangers, the neighbours)
- "Real zoos and nature centres have rules like our 'Never' tiles. Can you think of one here?" (local-venue tie-in)
- "Was there a card that helped *everyone*? What made it different?"

### 7.8 End artefact: the Park Charter

A printable or downloadable A5 card, generated from the group's route:

1. **Our Objective:** the tiles they built in Stage 6.
2. **Our Never Rules:** one or two floors.
3. **Star score** (out of 18) and their silly award.
4. **Before / after island snapshots** (voxel renders).
5. **Three favourite thought bubbles**, chosen by the children.
6. **A tiny behaviour-over-time graph** of Visitors and Wildlife across the six seasons (CLE-style, §5.4).
7. Footer: "Manager Bot was a pretend AI. Its answers were written in advance."

**Venue option:** inspired by the Zoo Tycoon × AZA challenges, a venue could pledge a real-world action (plant a bee bed, build a log pile) when visiting groups collectively earn N stars. This needs to be agreed with each partner.

### 7.9 Timing (30–60 min)

- **30-minute version:** Stages 1, 2, 4 and 6 (skip 3 and 5); about 5 min per stage plus a 5-min Charter.
- **60-minute version:** all six stages, one retry each, Charter and share-out.
- A "Free Build" toggle (Theme Park's Sandbox / RCT's "Have Fun!") for early finishers lets them decorate without meters.

---

## 8. Adding a tycoon layer to existing DeltaOps labs

The brochure lists six labs on one engine: Eco Town (energy), River Town (water), Grow Lab (food), Moon Base, Kick Lab, Beat Lab. Each has 6 stages × 3 cards (729 routes) with at least one vague card per stage. The Eco Town demo uses a 24-hour energy model. Source: `/home/user/ai-lab-v3/deltaopslearning-brochure/index.html`.

The shared tycoon layer would be:
1. A target + floor objective per stage.
2. A single-metric AI manager.
3. Agent thought bubbles.
4. A star rating.
5. A charter artefact.

| Lab | Manager Bot optimises | Side-effect meter (the "floor") | Agents with bubbles | Example vague card → side effect | Fit |
|---|---|---|---|---|---|
| **Eco Town** (energy) | "Keep the lights on" (supply) or "cheapest power" | Clean Air / Wildlife (e.g. bats near turbines); evening shortfall on the 24-hour chart | Residents ("It's dark and cold!"), bats, birds, shopkeepers | "Make lots of power" → coal smoke, then cough bubbles; "Cheapest power" → blackouts after sunset | **High.** The 24-hour model already gives a stock/flow (battery) to show (§5.1) |
| **River Town** (water) | "Give every house water" or "fill the reservoir" | River Life (fish, otters) and downstream farms | Townsfolk, fish, farmers downstream, kayakers | "Plenty of water" → river runs dry downstream; fish bubble "Too shallow!" | **High.** A natural commons / Fish Banks frame: upstream vs downstream fairness |
| **Grow Lab** (food) | "Grow the most food" | Soil Health and Pollinators | Bees, worms, farmers, shoppers | "Grow loads" → pesticide; bees leave; harvest falls next season (delayed feedback) | **High.** Delays teach the Sterman lesson that consequences arrive later |
| Moon Base | "Max crew comfort" vs oxygen and power | Supplies remaining | Astronauts, plants | "Make it cosy" → heaters drain power | Medium |
| Kick Lab | "Win matches" | Player wellbeing / fair play | Players, fans | "Win at all costs" → tired players, fouls | Medium |
| Beat Lab | "Most listens" | Originality / musician happiness | Musicians, listeners | "Make it popular" → every song the same | Low–medium |

**Recommendation:** build Island Park Tycoon first. It matches the nature-centre audience and the existing Eco AI Explorer pond example. Then port the meter, bubble and star components to River Town and Grow Lab, where the "commons" and "delayed consequence" lessons are strongest.

---

## 9. Recommendations, each tied to evidence

1. **Make agents uncontrollable and talkative.** Children (and Manager Bot) change the island; visitors and animals react in bubbles. Sawyer's core design choice (ArcadeAttack 2018).
2. **Write bubbles like RCT's:** first person, 10 words or fewer, naming a cause; include positives. Verified string table (§2.1).
3. **Add an advisor layer.** The facilitator card should aggregate bubbles into one actionable hint, as RCT's "Guests are getting lost… check your footpaths" does (§2.2).
4. **Every goal is target + floor (+ deadline).** RCT's objective types (§2.3). The "Never" tile in Stage 6 makes alignment concrete.
5. **Show the flow, not just the stock.** Use "+in / −out" arrows on meters; children and adults misread accumulations (Sweeney & Sterman 2000; Cronin et al. 2009).
6. **Make failure graded and recoverable.** Use 1–3 stars, clamp meters at 20, and a warning ladder rather than game over (RCT STR_3073–3076; Two Point stars).
7. **Use humour, never gore or real distress.** Comic consequences, silly awards, a sardonic Manager Bot (Theme Hospital; Two Point; RCT awards).
8. **Keep needs to four icons.** Planet Zoo's welfare model is legible; its micromanagement is not (§3).
9. **Use the meter-vs-bubble gap deliberately.** Let a meter look fine while a bubble shows a hidden problem. This turns the Zoo Tycoon "happiness bar" critique into an AI-literacy lesson (Utrecht analysis, §3.2).
10. **Spend design time on the debrief, not on scale.** Fish Banks and En-ROADS evidence says facilitated discussion drives learning. Sawyer, RCT World and SimAnt-in-class all show that bigger is not better.
11. **Avoid timers, currencies, idle loops and ads.** Sawyer's "personal disgust" for hook mechanics; Bogost's Cow Clicker; the incremental-game monetisation pattern (§4.4).
12. **Validate the science.** Have the venue's ecologist check every animal outcome (the Spore lesson). Zoo Tycoon 2013 used AZA and Woodland Park Zoo advisers.
13. **Offer a toy mode.** A "Free Build" or "Site B"-style calm island for early finishers (Theme Park Sandbox; RCT "Have Fun!"; JP:OG Site B).
14. **Link to real-world action where partners want it.** Collective-goal pledges, modelled on the Zoo Tycoon × AZA Community Challenges.

---

## 10. Gaps and limits of this pass

- The web-search budget for the session ran out partway through. **Not researched:**
  - Townsmen (HandyGames).
  - Roblox Restaurant Tycoon 2, Retail Tycoon and the dropper-tycoon genre.
  - Viva Piñata's requirement ladder (from fan guides).
  - Child-specific studies on needs meters or thought bubbles and empathy.
  - Pecorella's GDC talks on idle games.
- **Not read:** the Atari Club / Medium Sawyer interview (403, and archive.org blocked); Frontier's original "The Guest Brain" developer diary video.
- **Planet Zoo:** no WAZA or WWF partnership found. The Planet Zoo 2 charity partner is not named in the snippet I saw.
- **Sales figures** for Two Point, Theme Park Tycoon 2 and RCT are reported or third-party estimates.
