# 01 — Successful builder, sandbox and diorama games (2009–2026): what made them work, and what DeltaOps labs should borrow

Prepared for: DeltaOps Learning (browser-based, staff-facilitated "AI labs" for 7–13 year olds on voxel-diorama islands).
Date: 4 Nov 2026. Second, deeper pass.

## 0. How to read this report

- **Evidence grades.** Each figure carries one of these tags:
  - **[O]**: official, from the developer or publisher.
  - **[P]**: press-reported, citing the developer.
  - **[E]**: third-party estimate (Boxleiter, SteamSpy-style), shown only when no official figure exists. Estimates for the same game often differ 2–4x.
  - **[obs]**: my own description of the game's onboarding or feedback, not drawn from a cited source. Treat it as a designer's reading.
- **Search limit.** The session's web-search budget ran out before the last few lookups:
  - a primary Frostpunk designer interview
  - reviews of the Islanders: New Shores sequel
  - Minecraft age demographics
  - a primary Will Wright "software toy" source

  Those points are flagged where they appear.
- **Primary sources I could not reach.**
  - **GDC talks.** Ken Wong's GDC Vault talks are behind a login. I quote him via Game Developer's write-up.
  - **Talk videos.** Stålberg's "Beyond Townscaper" (Sweden Game Conference 2021) exists as a YouTube talk, but I could not read a transcript.
  - **No talk found.** I found no Pounce Light or Toukana GDC talk. Their primary sources are the developers' own interviews (80.lv, Game Developer, MCV).

---

## 1. Closing the evidence gaps (first-pass titles)

| Game | Best available figure | Grade | Source |
|---|---|---|---|
| Townscaper | ~380,000 copies by May 2021, in Stålberg's own words ("I think it's sold 380,000 copies now"; he had expected "maybe… 4,000"). Over 500k on PC+Switch before the 2021 mobile launch (Raw Fury). Later Steam-only estimates range from 464k to 1.5M | O / P / E | [MCV – "When we made Townscaper"](https://mcvuk.com/business-news/when-we-made-townscaper); [Raw Fury mobile PR](https://gamespress.com/Townscaper-Coming-to-Android-and-iOS-October-20); [gamerevenuedata](https://gamerevenuedata.pages.dev/games/townscaper/) |
| Islanders | **No official unit total found.** 82 on Metacritic; about 94% positive on Steam. Launched at a "five bucks is a very fair deal" price. The same studio's Thronefall later passed 1M, which shows the studio-level success the formula enabled | O (price/review) | [GWO interview](https://gameworldobserver.com/2019/06/14/islanders); [Wikipedia](https://en.wikipedia.org/wiki/Islanders_(video_game)); [GamesMarket – Thronefall 1M](https://www.gamesmarket.global//business/indie-hit-thronefall-sells-over-one-million-copies-588b03986d04328e71544cbcb1d1b454) |
| Dorfromantik | **Official:** 150,000+ players in the first Early Access week (Toukana). **Awards:** Spiel des Jahres 2023 for the board-game adaptation. **Estimates:** sales range widely, from 527k to 2M on Steam | O / E | [Toukana](https://www.toukana.com/dorfromantik); [Pegasus](https://pegasus.de/en/Dorfromantik-Das-Brettspiel-Spiel-des-Jahres-2023/51240G); [Raijin](https://raijin.gg/app/1455840/Dorfromantik); [gamerevenuedata](https://gamerevenuedata.pages.dev/games/dorfromantik/) |
| Terra Nil | **Official:** 300,000+ players in just over a week; sales "undisclosed". Also on Netflix mobile. 8% of Steam profit goes to the Endangered Wildlife Trust | O | [GWO](https://gameworldobserver.com/2023/04/06/terra-nil-300000-players-free-lives-tree-planting) |
| Cities: Skylines | **12M+ copies on all platforms (Jun 2022)**, up from 6M in Mar 2019; 13 expansions | O | [Paradox press release](https://www.paradoxinteractive.com/media/press-releases/paradox-interactive/cities-skylines-hits-12-million-sales-mark) |
| Tiny Glade | 616,528 units in the first month; 1.3M+ wishlists; ~97% positive on Steam | P (dev data via GameDiscoverCo) | [GameDiscoverCo](https://newsletter.gamediscover.co/p/how-tiny-glade-built-its-way-to-600k); [Gigazine](https://gigazine.net/gsc_news/en/20241120-tiny-glade-600k-sold-reason) |
| Minecraft | 350M lifetime (Apr 2025, Guinness-certified) | O | [VGChartz](https://www.vgchartz.com/article/466157/minecraft-sales-top-350-million-units/) |
| Animal Crossing: New Horizons | ~50.3M (mid-2026, Nintendo IR) | O | [Shacknews](https://www.shacknews.com/article/150276/animal-crossing-new-horizons-50-million-units-sold) |
| Stardew Valley | 41M+ (Dec 2024) | O | [Game Developer](https://gamedeveloper.com/business/stardew-valley-sales-grew-to-over-41-million-by-2024-s-end) |
| Frostpunk | 3M in 3 years (2021); 5M+ later | O | [PC Gamer](https://pcgamer.com/frostpunk-has-sold-3-million-copies-so-11-bit-studios-is-having-a-sale) |
| Before We Leave | 50k on the Epic Store in its first ~7 months; mixed reviews | P | [Wiki mirror](https://www.mdwiki.org/wiki/Before_We_Leave) |
| Roblox | ~151M daily active users (Q3 2025); ~40M of them under 13 (Q2 2025) | O | [GamesBeat](https://gamesbeat.com/?p=309290); [Statista](https://www.statista.com/statistics/1190309/daily-active-users-worldwide-roblox) |
| Crossy Road | $10M and 50M downloads in 90 days | P | [Cult of Mac](https://www.cultofmac.com/news/crossy-road-developers-made-10-million-90-days) |
| Monument Valley 1 & 2 | MV1 ~$9.5M by mid-2015. MV2 sold 3.5M copies for $10.4M in its first year, against a $2.2M budget | O (ustwo infographic) | [MCV](https://mcvuk.com/business-news/monument-valley-2-sells-3-5m-and-brings-in-10m-revenue-over-first-year/) |

### Primary designer statements gathered

- **Oskar Stålberg (Townscaper)**, from [MCV](https://mcvuk.com/business-news/when-we-made-townscaper):
  - "I wanted to make a game that I could finish in a year."
  - "Without the constraint of putting a game on top of it… I can focus entirely on the beautiful environments."
  - On why newcomers find it simple: "you click and then it appears."
  - "When you make this kind of creative tool, there are some constraints."
- **Stålberg on the system's rules**, from [Game Developer](https://gamedeveloper.com/blogs/how-townscaper-works-a-story-four-games-in-the-making):
  - The user should "feel like they're in control of the large shapes", while "the smaller shapes are allowed to vary."
  - "What's important is what happens when things change."
  - Every placement is matched against prebuilt pieces, so players cannot make broken geometry. When pieces conflict, the system fails silently.
  - He priced the game for roughly an hour of play.
- **Anastasia Opara and Tomasz Stachowiak (Tiny Glade)**, from [80.lv](https://80.lv/articles/exclusive-tiny-glade-developers-discuss-bevy-proceduralism-publishers-cozy-games/):
  - "a toy box for making dioramas"
  - "There's not going to be combat or management pressure there."
  - "the game pays attention to you and cares about what you're doing"
  - "if something is off with the controls or doesn't feel intuitive enough, it will derail the enjoyment of the game"
  - "Our goal was to eliminate the need to jump through hoops"
  - On procedural rules: "we validate them on how many stories they can tell."
- **Friedemann Allmenröder (Islanders)**, from [GWO](https://gameworldobserver.com/2019/06/14/islanders):
  - "Can we make it simpler? Can the game still be fun if we cut this feature?"
  - "You really have to cut features that you love."
  - They cut the day/night cycle to "simply give you more buildings for more points".
  - "You don't have to play our games for 40 hours to get value from them"
  - "a very healthy session length"
  - "Preserve simplicity, especially accessibility."
- **Toukana (Dorfromantik)**, from [80.lv](https://80.lv/articles/how-dorfromantik-expands-its-cozy-world-through-minimalist-design):
  - "From the very beginning, minimalism has been at the core"
  - "Does the game really need this? Does it actually improve the experience?"
  - "We don't want to overload the core system"
  - "This is creating too much visual noise"
  - "What matters most is that the basic shape works"
  - Palettes are checked in greyscale first.
- **Sam Alfred (Terra Nil)**, from [Game Developer](https://www.gamedeveloper.com/design/why-a-recycling-mechanic-saved-terra-nil-s-climate-cleanup-mechanics) and [Science Friday](https://www.sciencefriday.com/articles/terra-nil-video-game-climate-change/):
  - "We just had too many buildings." Recycling every machine at the end lets the restored landscape "take center stage".
  - Mechanics translate "real-life ecosystem restoration practices into game form". The team studied coral restoration projects.
  - The aim was to show "a world to be hopeful for", and to avoid pushing players "into apathy or resignation".
  - The game began as a 48-hour Ludum Dare entry on the theme "start with nothing".
  - A GDC talk exists: ["Developing Terra Nil: A Strategy…"](https://gdcvault.com/play/1029027/Developing-Terra-Nil-A-Strategy).
- **Ken Wong (Monument Valley)**, from [Game Developer](https://gamedeveloper.com/design/designing-the-surprise-mobile-game-hit-i-monument-valley-i-):
  - "every screen is going to be a work of art that you can hang on a wall"
  - "How is this going to appear to 'normal' people -- to non-gamers"
  - "We only added a level if we had something new to say"
  - GDC talk: ["Designing Monument Valley: Less Game, More Experience"](https://gdcvault.com/play/1020878/Designing-Monument-Valley-Less-Game).
- **Aya Kyogoku (Animal Crossing: New Horizons)**, from [Game Developer](https://www.gamedeveloper.com/design/why-nintendo-s-new-i-animal-crossing-i-features-allow-instant-change-in-the-real-time-game):
  - Crafting and terraforming let players change their island without waiting for real-world days. "we were able to give them what they weren't able to achieve before."
- **Wren Brier (Unpacking, GDC)**, from [Game Developer](https://www.gamedeveloper.com/design/unpacking-the-design-pillars-of-a-chill-puzzle-game):
  - "subtractive design is all about strengthening the core of a game by removing anything that isn't serving the core ideas."
  - "If it tags along just because: it's baggage."
  - The design pillars were contemplation, discovery and expression. There is no scoring and no failure state.
- **Peter Curry (Mini Metro)**, from [Giant Bomb](https://giantbomb.com/users/3929/articles/interview-peter-curry-co-creator-of-mini-metro), [Pocket Tactics](https://www.pockettactics.com/dinosaur-polo-club/interview) and [Vice](https://vice.com/en/article/we-asked-a-transit-planner-how-to-up-our-mini-metro-game):
  - "graphic design is game design"
  - The core was "designed… verbally in about half an hour", and the shipped game kept that design.
  - "The inspiration was as much to do with our constraints than anything else."
- **Hipster Whale (Crossy Road)**, from [Pocket Gamer](https://www.pocketgamer.com/crossy-road/it-had-to-be-free-pocket-gamer-biz-chronicles-the-making-of-crossy-road):
  - The rotated camera "looked 100 times better".
  - The team avoided exploitative monetisation because the game was meant for children.
- **Petter Karlsson (Toca Boca)**, from [Toca Boca](https://tocaboca.com/for-parents/toca-life-world/) and its [100M PR](https://tocaboca.com/press-post/toca-boca-celebrates-100-million-downloads/):
  - "We designed Toca Boca World to be open-ended and free of rules, unlike the real world."
  - More than 1,500 children took part in playtests by 2015.

---

## 2. Widened set: 20+ further builders, diorama games and kids' builders

The fields for each game are: **Success** · **First 5 minutes / onboarding** · **How the world reacts** · **Feedback timing** · **Goal framing** · **Audience/age**.

### 2.1 Minimalist "puzzle builders"

**Mini Metro (2015) / Mini Motorways (2021), Dinosaur Polo Club**
- **Success:** Mini Metro passed 1M, then 5M, then 7M+ copies. Mini Motorways sold 500k on Steam in 2021. The two games have 12M+ players combined [P] ([VGChartz](https://www.vgchartz.com/article/451807/mini-motorways-sales-top-500000-units/), [Gamer Matters](https://gamermatters.com/mini-metro-and-mini-motorways-have-12-million-players-combined-new-update-arrives-this-july-to-both-games)).
- **Onboarding:** Drag a line between two stations. "No need to learn complex button sequences, or doing one hour tutorials" ([Indieorama](https://www.indieorama.com/mini-metro-and-robert-curry-the-minimalism-was-one-of-the-things-that-made-the-game-hard-to-make)).
- **World reaction:** Passengers pile up as shapes at stations, and an overcrowded station shows a timer ring [obs].
- **Feedback timing:** Instant. Trains run as soon as the line is drawn.
- **Goal framing:** Survive as long as possible. The score is the number of passengers carried.
- **Audience:** All ages; very popular with non-gamers.
- **Lesson:** The pressure is readable because each overloaded station shows a visible countdown.

**Islanders (2019).** See §1.
- **Onboarding** [obs]: You pick one of two building packs. Hovering a building shows coloured "+N / −N" previews against its neighbours before you place it. Reaching the score threshold unlocks the next island.
- **World reaction:** Buildings pop in, and the point numbers float up over the island.
- **Goal framing:** A points threshold to reach a "new island".
- **Session:** 20–60 min per run.

**Dorfromantik (2022).**
- **Onboarding** [obs]: You place one hex tile at a time, and edges that match glow. Quest tiles show a number ("forest 30"). Completing a quest adds tiles to your stack, and the run ends when the stack runs out. A Creative mode has no stack limit.
- **Feedback timing:** Instant edge-match highlights and points.
- **Goal framing:** Soft. An endless relaxed run, plus quests that keep you playing.
- **Audience:** Broad. The board game won the family-oriented Spiel des Jahres.

**Townscaper (2020).**
- **Onboarding:** No tutorial. Click the water and a building appears. Stålberg: "you click and then it appears."
- **World reaction:** Arches, stairs, gardens and gulls appear according to the rules.
- **Goal framing:** None, by his own description: "toy".
- **Session:** About an hour per sitting, as Stålberg himself expected.

**Station to Station (2023), Galaxy Grove.**
- **What it is:** A voxel-diorama railway puzzle. 80 on Metacritic; Very Positive on Steam ([DekuDeals](https://dekudeals.com/items/station-to-station), [Gematsu](https://gematsu.com/games/station-to-station)).
- **World reaction:** Laying track turns grey, dead land green. Connected stations bring the scenery around them back to colour [obs].
- **Goal framing:** Connect stations within a budget, earning stars.
- **Why it matters for DeltaOps:** It is the nearest commercial analogue to a voxel island visibly reviving as a direct result of your choice.

**LEGO Builder's Journey (2019/2021), Light Brick Studio.**
- **What it is:** Brick-placing puzzles on small dioramas. Golden Joystick 2020 Mobile Game of the Year (listed on the studio's own site) ([Light Brick](https://www.lightbrick.com/builders-journey)).
- **Onboarding:** No text, no UI markers, no dialogue boxes ([Creative Review](https://www.creativereview.co.uk/light-brick-studio-lego-digital-game-play-bricks/)).
- **Goal framing:** Some levels are puzzles; between them are free-build "play" moments.
- **Audience:** Families. Press described early success "with kids and adults" ([SuperParent](https://www.superparent.com/?p=10002)).

**Unpacking (2021), Witch Beam.**
- **Success:** 100k in 10 days, 1M+ in a year; nominated for 50 awards and won 20 [O] ([GoNintendo](https://www.gonintendo.com/contents/11711-humble-games-and-witch-beam-s-unpacking-celebrates-1-year-and-over-1-million-units)).
- **Onboarding:** Click a box and an item comes out.
- **World reaction:** Each item makes a satisfying object-specific sound. An item placed somewhere "wrong" gets a gentle red outline only when you try to finish the level. Of all players, 14% flushed every toilet (GDC).
- **Goal framing:** Put everything away. The story is told through the objects.
- **Lesson:** Corrective feedback is gentle and comes late, so it never punishes.

### 2.2 Cosy and life sims with building

**Viva Piñata (2006), Rare.**
- **Success:** About 500k copies in its first year [P]. It became a cult classic.
- **Onboarding:** Clear a weedy plot with a shovel.
- **World reaction:** Plant the right things and a piñata species appears as a black-and-white outline. When you meet its requirements it wanders in and "becomes resident". Sour piñatas fight and make residents sick ([Wikipedia](https://en.wikipedia.org/wiki/Viva_Pi%C3%B1ata_(video_game))).
- **Goal framing:** Attract animals by changing the habitat. Rated E and aimed at children.
- **Lesson:** This is the purest "animals arrive or leave because of what you did to the habitat" loop in commercial games. It maps directly onto the DeltaOps pond lab.

**Cozy Grove (2021), Spry Fox.**
- **Success:** Apple Arcade launch, then all platforms. Sales estimates range from 155k to 633k [E].
- **World reaction:** The island starts grey. Each ghost you help returns colour to part of it.
- **Feedback timing:** Daily, real-time gating (Animal Crossing-like) ([PC Gamer](https://www.pcgamer.com/games/life-sim/netflix-sells-the-studio-behind-cozy-grove-back-to-its-original-owners-freeing-the-studio-to-bring-its-mobile-life-sim-to-other-platforms)).
- **Lesson:** Colour returning to a grey world is a strong, wordless progress signal.

**Hay Day (2012), Supercell.**
- **Success:** About $1.4B lifetime in-app revenue (Statista, Jan 2025). "More than one billion barns" created [O/P] ([Statista](https://statista.com/statistics/298766/supercell-annual-revenue), [PocketGamer.biz](https://www.pocketgamer.biz/supercell-reveals-rise-in-hay-day-active-users-with-growth-virality-12-years-on)).
- **Onboarding:** A scripted, hand-held tutorial: plant wheat, harvest, feed chickens.
- **Feedback timing:** Instant tap rewards, then timers.
- **Goal framing:** Orders on a board.
- **Caution:** Its monetisation relies on timers, which DeltaOps should avoid.

**Clash of Clans (2012), Supercell (base building).**
- **What it is:** Base building in service of attack and defence.
- **Notes:** Players share base layouts heavily through communities and in-game layout copying ([PocketGamer guide](https://www.pocketgamer.com/clash-of-clans/clash-of-clans-base-building-strategies-how-to-lay)). I found no official Supercell onboarding material.
- **Lesson:** A base becomes a shareable "design" when other people test it.

**Ooblets (2022).** I found no sales data within the search budget. It is noted only as a cosy farming and town game in the set.

### 2.3 Survival and colony builders (pressure-forward)

**Banished (2014).**
- **Success:** Made by one developer, Luke Hodorowicz. About 1.5M sales [E]; no official figure ([gamerevenuedata](https://gamerevenuedata.pages.dev/games/banished)).
- **Onboarding:** Optional tutorials, a harsh first winter.
- **Goal framing:** Survival with no win condition.
- **Lesson:** Starvation spirals are opaque. Players often fail without understanding why.

**Timberborn (2021 Early Access; 1.0 2026), Mechanistry.**
- **Success:** 130k copies in launch week; 750k after one year; **1M+ by Sept 2023** [O] ([Mechanistry](https://mechanistry.com/press/timberborn-celebrates-its-second-anniversary-and-1-000-000-copies-sold-with-a-new-trailer)).
- **World reaction:** Droughts and "badtides" (polluted water) visibly dry out or poison the map. Dams and water physics are the main toy.
- **Feedback timing:** Seconds for water, then seasonal cycles.
- **Lesson:** Water as a visible, simulated material sells the game. Pond and eco labs could show water state the same way.

**Against the Storm (2022 Early Access; 1.0 Dec 2023), Eremite Games.**
- **Success:** 1M on Steam (Mar 2024), **2M across platforms (Aug 2026)** [O]; 94% positive on Steam ([Game Developer PR](https://www.gamedeveloper.com/press-release/critically-acclaimed-city-builder-against-the-storm-hits-2-million-copies-sold)).
- **Structure:** Roguelite. Short settlements of about 1–2 h each, with a meta-progression map between them.
- **Feedback:** A clear "Reputation" (win) bar and "Impatience" (lose) bar.
- **Credited for success:** Its Early Access process ("listening to their feedback").
- **Lesson:** Splitting a builder into short, restartable runs makes it repeatable. That is the closest builder-world parallel to DeltaOps' 6-stage runs.

**Kingdoms and Castles (2017), Lion Shield.**
- **Success:** **1.3M+ copies (Jun 2023)** [O] ([Gamespress](https://gamespress.com/Kingdoms-and-Castles-patch-daily-deal)).
- **Character:** Low-poly, toy-like medieval island builder with dragons and vikings. Small team.
- **Onboarding** [obs]: Place a keep, then houses, then farms. Peasant counts tick up immediately.

**The Settlers: New Allies (2023), Ubisoft.** **Failure case.**
- Critics did not get review copies. Player ratings were poor and the release was "panned by those who had hoped for a return to the series' roots" ([GamePressure](https://www.gamepressure.com/newsroom/the-settlers-new-allies-without-reviews-players-very-disappointed/z8511a), [Robots Over Dinosaurs](https://robotsoverdinosaurs.net/?p=5293)).
- It dropped the series' cosy logistics-watching in favour of generic RTS combat.

**Laysara: Summit Kingdom.** I could not search it within the remaining budget. Not covered.

### 2.4 Creation platforms and toys

**Spore (2008), Maxis/Will Wright.**
- **Success:** 1M in about 3 weeks; 25M creatures uploaded by Sept 2008, later 100M+. EEDAR estimated ~2.8–3.2M lifetime [O/E] ([Shacknews](https://shacknews.com/article/54897/ea-declares-spore-a-hit), [GamesBeat](https://gamesbeat.com/spores-creature-count-hits-100-million-what-does-it-portend/)).
- **Lesson:** The standalone Creature Creator, released *before* the game, became the most loved part. The creative tool outshone the game layer.

**Dragon Quest Builders 2 (2018/19).**
- **Success:** 1.1M shipped in about a month in the West, four months faster than DQB1 [O] ([Square Enix PR](https://press.it.square-enix.com/DRAGON-QUEST-BUILDERS-2-PUSHES-PAST-11-MILLION-IN-WORLDWIDE-SHIPMENTS-)).
- **Goal framing:** Minecraft-style building wrapped in a guided story. NPCs request rooms ("build a bedroom": four walls, door, bed), and the game recognises when the room is complete.
- **Lesson:** A builder for less self-directed players gives explicit, recognisable build "recipes".

**Pocket Build (2017), MoonBear.**
- **Success:** About 9.8M Android installs [E]. Common Sense Media rates it 7+ ([AppGoblin](https://appgoblin.info/apps/moonbear.PocketBuild), [CSM](https://www.commonsensemedia.org/app-reviews/pocket-build)).
- **Goal framing:** A pure open sandbox, with a mode where everything is unlocked.

**Block'hood (2017), Jose Sanchez / Plethora Project.**
- **Character:** Ecology builder. Every block consumes and produces resources, and ignored blocks "decay into a ruin" ([Engadget](https://www.engadget.com/2017-05-09-devolver-completes-construction-on-building-sim-blockhood.html), [USC](https://today.usc.edu/building-better-architecture-through-video-games-like-blockhood/)).
- **Recognition:** Games for Change 2016 Best Gameplay.
- **Lesson:** Visible decay teaches interdependence, but its abstract resource graphs were hard to read [obs].

**Eco (2018), Strange Loop Games.**
- **Character:** A multiplayer ecosystem in which over-harvesting causes collapse. Funded by a US Dept of Education SBIR grant ($899,871).
- **Classroom use:** The ecological crisis prompts a "player-led, and teacher-guided, investigation" ([PRWeb](https://www.prweb.com/releases/2015/06/prweb12790599.htm), [Frontiers in Psychology study](https://www.frontiersin.org/articles/10.3389/fpsyg.2019.02846/full)).
- **Lesson:** The closest precedent for "the world reacts, then the teacher asks why".

**Minecraft Education.**
- **Evidence:** Engagement and motivation gains appear consistently (Karsenti & Bugmann 2018, n=118 elementary students) ([IADIS](https://iadisportal.org/digital-library/exploring-the-educational-potential-of-minecraft-the-case-of-118-elementary-school-students)).
- **Learning gains are mixed.** A 2025 quasi-experiment found the control group *outperformed* the Minecraft group on energy concepts (5.48 vs 3.93) ([Foro de Educación](https://forodeeducacion.com/ojs/index.php/fde/article/view/769)).
- Studies published by the vendor itself report self-rated confidence gains ([Minecraft Education](https://education.minecraft.net/blog/new-study-understanding-the-impact-of-minecraft-in-the-math-classroom)).
- **Lesson:** An open sandbox alone does not guarantee learning. Learning needs structure plus facilitation, which is DeltaOps' model.

**Minecraft: Story Mode (2015), Telltale.**
- **Character:** Choice-based narrative in the Minecraft world, rated E10+.
- **Reception:** Reviewers called it "suitable for kids" but with little replay value. A former designer cited an early "fundamental misunderstanding of who our audience was" (the tone was too edgy) ([PC Gamer](https://www.pcgamer.com/uk/telltales-minecraft-story-mode-originally-had-a-t-rated-sense-of-humor/)).
- **Lesson for 729-route branching:** Make the branches *visibly* different, or children won't replay.

**Toca Boca World (Toca Life World).**
- **Success:** About 439M Google Play downloads [E]; "60M+ kids play" [O, dated] ([MixRank](https://mixrank.com/playstore/apps/com.tocaboca.tocalifeworld)).
- **Design:** "open-ended and free of rules". No scores, no timers, no game over. 1,500+ children playtested by 2015.
- **Audience:** Roughly ages 6–12.

**Roblox: Welcome to Bloxburg / Adopt Me!**
- **Bloxburg:** About 7–9.8B visits; paid entry (25 Robux); reportedly acquired by Embracer for ~$100M. Core loop: earn by working a job, then build your house ([Sportskeeda](https://www.sportskeeda.com/roblox-news/news-popular-roblox-game-welcome-bloxburg-reportedly-acquired-embracer-group-100-million-deal)).
- **Adopt Me!:** 20B visits by early 2021, ~40B by late 2025. Pets plus home decorating ([PCGamesN](https://www.pcgamesn.com/roblox/most-popular-game-adopt-me)).
- **Lesson:** "The house is the reward." For children, a space that belongs to them and can be visited is the core motivation.

**Townsmen (HandyGames).** The 2026 mobile relaunch had 2M+ pre-registrations [O, self-reported] and a "try before you buy" free first scenario ([Game Developer PR](https://www.gamedeveloper.com/press-release/handygames-launches-townsmen-a-kingdom-rebuilt-on-mobile-with-new-try-buy-experience)). The older free-to-play version drew complaints about pop-up ads.

### 2.5 Recap of first-pass titles: onboarding and feedback (abridged; full entries in the first-pass report)

| Game | First 5 min | World reaction | Feedback timing | Goal framing |
|---|---|---|---|---|
| Minecraft | Dropped in with no tutorial (Bedrock now has a light hint system) [obs] | Day/night cycle, mobs, blocks behave physically | Instant (blocks); minutes (night) | Self-set; Survival is implicit |
| Tiny Glade | Drag a wall: it builds itself and greenery grows | Sheep, birds, ivy, lights react to buildings | <1 s | None ("toy box") |
| Animal Crossing: NH | Scripted arrival, tent, campfire, choose an island layout | Villagers comment; visitors arrive over days | Instant crafting; daily clock | Soft requests from Tom Nook |
| Stardew Valley | Clear the farm, plant parsnips | Crops grow overnight; villagers react to gifts | Daily (one day ≈ 14 real min) | Community Center bundles |
| Cities: Skylines | Road → zone → services | Traffic, demand bars, info overlays | Seconds to minutes | Population milestones |
| Terra Nil | Place a wind turbine; toxic land turns to soil and grass | Greening spreads; animals appear in the final phase | Instant spread | Three explicit phases, then recycle everything |
| Frostpunk | Generator, coal, a law within ~10 min | Hope/Discontent meters; citizens speak up | Instant meters; story events | Survive the storm; moral laws |
| Before We Leave | Calm start | Pollution and unhappiness creep in later | Delayed | Expansion |

---

## 3. Comparison matrix

Key:
- **Goal:** N = none or self-set · S = soft/optional · E = explicit win/score · P = survival
- **Pressure:** 0 = none · 1 = mild/score · 2 = moderate · 3 = high
- **Choices per decision:** a rough count of options the player weighs at a typical moment [obs]
- **Success tier:**
  - A = >10M or equivalent platform scale
  - B = 1–10M
  - C = 300k–1M
  - D = <300k or a flop (F)

| Game | Goal | Pressure | Choices / decision | Session | Art style | Success |
|---|---|---|---|---|---|---|
| Minecraft | N/S | 0–2 (mode) | Hundreds | 20 min – hours | Voxel | A (350M) |
| Roblox (Bloxburg/Adopt Me) | S | 0–1 | Dozens | 15–60 min | Blocky/low-poly UGC | A (platform) |
| Animal Crossing: NH | S | 0 | Many | 15–60 min daily | Soft rounded toy | A (50M) |
| Stardew Valley | S | 1 | Many | ~14 min/day loops | Pixel | A (41M) |
| Cities: Skylines | S (milestones) | 1–2 | Many | Hours | Realistic | A (12M) |
| Mini Metro + Motorways | E (survive) | 2 | ~3–5 | 10–20 min | Flat graphic | B (12M players) |
| Frostpunk | P | 3 | 3–8 | 1–3 h per scenario | Dark realistic | B (5M) |
| Against the Storm | E/P | 2 | ~3 (blueprint picks) | 1–2 h per settlement | Painterly "rainpunk" | B (2M) |
| Kingdoms and Castles | S | 1–2 | ~6 | 30–90 min | Low-poly toy | B (1.3M) |
| Timberborn | P | 2 | Many | Hours | Stylised 3D | B (1M) |
| Unpacking | E (gentle) | 0 | 1 item at a time | 2–3 h total | Pixel diorama | B (1M+) |
| Dragon Quest Builders 2 | E (story) | 1 | Recipes | Hours | Voxel / anime | B (1.1M+) |
| Banished | P | 3 | Many | Hours | Realistic | B (~1.5M est.) |
| Spore | S | 1 | Creator: many | Hours | Cartoon | B (~3M) |
| Tiny Glade | N | 0 | Few tools | 15–60 min | Storybook diorama | C/B (616k in 1 month) |
| Townscaper | N | 0 | 1 click + colour | ~1 h | Pastel toy town | C/B (380k → 500k+) |
| Dorfromantik | S | 1 | 1 tile + 6 rotations | 30–90 min | Watercolour low-poly | C/B (est.) |
| Terra Nil | E (phases) | 1 | ~3–5 machines | 30–60 min per map | Ghibli-esque diorama | C (300k players in 1 week) |
| Islanders | E (score) | 1 | 2 packs → a few buildings | 20–60 min | Low-poly pastel | C (est.) |
| Station to Station | E (stars) | 1 | Few | 15–30 min per map | Voxel diorama | C/D |
| Monument Valley | E (puzzle) | 0 | 1–3 | ~90 min total | Isometric "hangable" art | B (MV2 3.5M) |
| Crossy Road | E (distance) | 2 | 1 (tap) | 1–3 min | Voxel | A (50M downloads in 90 days) |
| Viva Piñata | S | 1 | Many | 30–90 min | Saturated cartoon | C (500k in year 1) |
| Toca Boca World | N | 0 | Many | 10–30 min | Flat kid-friendly | A (downloads) |
| Before We Leave | S | 0 → 2 (creeps) | Many | Hours | Hex low-poly | D (50k on Epic) |
| SimCity 2013 | S | 1–2 + tech friction | Many | Hours | Realistic | F (studio closed) |
| Cities: Skylines II launch | S | Tech friction | Many | Hours | Realistic | F (lost ~70% of players in 3 weeks) |
| Settlers: New Allies | E/P | 3 | RTS | Hours | Generic | F |

### Matrix readings
1. **Short sessions with few choices per decision suit the small team / small scope band.** Islanders, Dorfromantik, Mini Metro, Terra Nil, Townscaper and Station to Station all sit at 1–5 options per decision and 15–60 minute sessions, and all reached tier C or B on modest budgets. **DeltaOps' 3 cards, 6 stages and ~45–60 minute format sits squarely in this band.**
2. **Pressure is a deliberate choice, and adding it mid-game backfires.** The no-pressure games (Townscaper, Tiny Glade, Unpacking, Toca) and the high-pressure ones (Frostpunk, Banished) both work. Before We Leave, which *drifted* from calm to stressful, underperformed.
3. **Voxel and toy-like styles span every tier,** from Crossy Road to Minecraft to Station to Station. The style is never what holds a game back. Readability is (Toukana's greyscale and silhouette checks).
4. **Platform-scale successes for children** (Minecraft, Roblox, Toca, Animal Crossing) all give a persistent, owned, visitable space. Short facilitated labs cannot match that. They can borrow the *naming and ownership* moment.

---

## 4. Patterns that recur in successes, and in failures

### Success patterns, with the evidence for each
1. **Every input looks good, or at least fails gracefully.** Townscaper never lets players make broken geometry. Tiny Glade has "no management pressure". Unpacking's red outline only appears at the end.
2. **Consequence within one second, in the world itself, not only in a UI panel.** Tiny Glade's greenery, Terra Nil's greening spread, Station to Station's colour return, Mini Metro trains departing.
3. **Living creatures are the reward signal.** Viva Piñata's species outlines, Terra Nil's animals in the final phase, Tiny Glade's sheep, Cozy Grove's ghosts.
4. **Few choices per decision.** Islanders offers 2 packs and Dorfromantik 1 tile. Against the Storm picks blueprints from small sets. Mini Metro is "designed verbally in half an hour".
5. **Subtractive design.** Allmenröder: "Can we make it simpler?" Toukana: "Does the game really need this?" Brier: "baggage".
6. **Restartable short runs.** Against the Storm's settlements, Islanders' runs, Mini Metro, Crossy Road.
7. **Ownership and shareability.** Animal Crossing's islands, Bloxburg houses, Clash of Clans layouts, Spore's 100M creatures, Tiny Glade's viral clips.
8. **A hopeful frame for hard topics.** Terra Nil's "a world to be hopeful for… avoid… apathy". Frostpunk does the opposite and works because it is aimed at adults.
9. **Recognisable completion.** Dragon Quest Builders' room recipes, Terra Nil's phase-complete and recycle step, Unpacking's "all items placed".
10. **Heavy, early outside playtesting.** Tiny Glade, Toca's 1,500 children, Against the Storm's Early Access feedback loop.

### Failure modes
- **Technical friction:** SimCity 2013 (always-online, servers, small plots), Cities: Skylines II (performance; Paradox "miscalculated").
- **Stress creep in a "cosy" promise:** Before We Leave (Polygon review).
- **Pointlessness without stakes:** some critics of Townscaper ("the end result always looks the same", Cubed3 5/10).
- **Opaque systems:** Banished starvation spirals, Block'hood's resource web, SimCity 2013's agent simulation [obs and press].
- **Misjudged audience tone:** Minecraft: Story Mode's early edgy draft.
- **Abandoning a series' core fantasy:** Settlers: New Allies.
- **Branches that feel the same:** Story Mode's "little replay value".
- **Learning claims without structure:** Minecraft Education's mixed results, and the 2025 study where the control group did better.

---

## 5. The 15 most transferable mechanics for DeltaOps, ranked

Ranking is by (a) how strong the evidence is, (b) how well it fits a 7–13, facilitated, 6-stage × 3-card, pre-scripted format, and (c) implementation cost in a browser voxel diorama.

1. **Wildlife arrives or leaves as the main consequence signal.**
   - *Evidence:* Viva Piñata's whole loop is changing the habitat so animals arrive. Terra Nil's animals return in the final phase. Tiny Glade's sheep and birds react to builds.
   - *DeltaOps:* Ducks fly off, herons return, Roman pigeons scatter, Mars rover "wildlife" becomes crew wellbeing. Animate a departure on the vague card and a return on the clearer card.
2. **A ghost preview before commit, attached to the "% sure" guess.**
   - *Evidence:* Islanders shows +N/−N previews before placement. Dorfromantik highlights matching edges.
   - *DeltaOps:* Render the AI's interpretation as a translucent overlay (e.g., outlines of reeds about to be cut) with "62% sure", then play it out. This visualises the AI-literacy point.
3. **A consequence within one second, in the world, before any text.**
   - *Evidence:* Tiny Glade (<1 s), Mini Metro, Terra Nil's spread.
   - *DeltaOps:* Animation starts on tap; the facilitator card appears only after the animation settles (~3–5 s).
4. **Undo and retry as a satisfying rewind, never a "fail".**
   - *Evidence:* Townscaper's silent failure, Unpacking and Toca with no fail state, Tiny Glade with "no management pressure".
   - *DeltaOps:* Rewinding reverses the animation (reeds grow back, ducks fly in backwards). The retry button is labelled "Try a clearer card", not "Wrong".
5. **Exactly 3 options per decision, one deliberately vague.**
   - *Evidence:* Islanders' 2-pack choice, Dorfromantik's single tile, Against the Storm's small blueprint draws, Mini Metro's minimalism.
   - *DeltaOps:* Keep 3. Don't add a 4th "fun" card.
6. **Colour and life returning to a grey world as a progress meter.**
   - *Evidence:* Cozy Grove's ghosts restoring colour, Station to Station's greening, Terra Nil.
   - *DeltaOps:* Each stage's island saturates a little more when the clear card is chosen, which doubles as a whole-room readable "score".
7. **Hopeful framing for environmental and AI topics.**
   - *Evidence:* Terra Nil's stated design aim: hope, not apathy.
   - *DeltaOps:* Bad outcomes are reversible and the final stage is always restorative. Avoid doom imagery for 7-year-olds.
8. **Structure that is legibly phased: 6 stages with visible "stage complete" beats.**
   - *Evidence:* Terra Nil's three phases and recycle ending, Dragon Quest Builders' room-recipe recognition, Islanders' "new island".
   - *DeltaOps:* A stage-complete stamp plus a small permanent island change (e.g., a flag, a new creature). Optional end-of-lab "recycle" moment: the AI helper packs its tools away and leaves the island better.
9. **One or two meters, not a dashboard.**
   - *Evidence:* Frostpunk's two meters (Hope/Discontent) and Against the Storm's two bars (Reputation/Impatience) are readable. Block'hood's and Banished's resource webs are opaque.
   - *DeltaOps:* At most one domain meter per lab (wildlife, health, crew morale), plus the AI "% sure" readout.
10. **Ownership moment at the start.**
    - *Evidence:* Animal Crossing's island naming and layout choice, Bloxburg's "the house is the reward", Adopt Me.
    - *DeltaOps:* The group names the island or picks the flag or mascot on screen 1, and that name appears on the facilitator cards ("What happened to *Duckfoot Pond*?").
11. **Readability rules for art: silhouette first, greyscale value check, low visual noise.**
    - *Evidence:* Toukana's "too much visual noise" and greyscale check, Stålberg's "control the large shapes", Wong's "hang on a wall", Curry's "graphic design is game design".
    - *DeltaOps:* Changing objects (reeds, ducks, turbines) must read from the back of a classroom on a projector.
12. **Visibly different branches.**
    - *Evidence:* Minecraft: Story Mode's low replay value; Spore's creative tool outshining its game layer.
    - *DeltaOps:* Across 729 routes, make sure each card's outcome changes something *on the island* that is not just text. Concentrate visual variety in the vague-card outcomes, which children find funniest.
13. **A postcard or photo moment for shareability.**
    - *Evidence:* Tiny Glade's viral clips, Monument Valley's "hangable" screens, Animal Crossing's sharing.
    - *DeltaOps:* An end-of-lab snapshot of the final island with the group's name, printable or QR-saved by the venue. This needs no accounts (safeguarding).
14. **Teacher-guided investigation after a visible ecological event.**
    - *Evidence:* Eco's classroom model ("player-led, and teacher-guided, investigation" after a crisis); the mixed Minecraft Education results show unstructured play alone underdelivers.
    - *DeltaOps:* This validates the facilitator-card model. Pose the question about *what the world did*, then ask why the AI chose that.
15. **Zero-friction technology and outside playtesting.**
    - *Evidence:* The failures of SimCity 2013 and Cities: Skylines II; Tiny Glade's "if something is off with the controls… it will derail the enjoyment"; Toca's 1,500-child playtests.
    - *DeltaOps:* Preload each lab completely and tolerate going offline mid-session. Test on the cheapest venue Chromebook. Run playtests with real 7–13 year-old groups and real venue staff before launch.

### Two things to avoid
- **Timers or energy gating**, as in Hay Day. They don't suit a facilitated lab.
- **Pressure creeping in mid-session**, as in Before We Leave. Introduce any time pressure explicitly, or not at all.

---

## 6. Open gaps for a follow-up pass (search budget exhausted)
- A primary Frostpunk designer interview (Jakub Stokalski) on Hope/Discontent and law design.
- Islanders: New Shores (2025) reception, as a check on whether minimalism sequels hold up.
- Minecraft and Animal Crossing audience age splits from an official or survey source.
- A primary Will Wright quote for the "software toy" description of SimCity.
- Laysara: Summit Kingdom, Ooblets and Kardboard Kings data.
- Transcripts of Stålberg's "Beyond Townscaper" (SGC 2021) and Wong's GDC 2014/15 talks.
