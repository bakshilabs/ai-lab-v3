# 01 — Successful builder, sandbox and diorama games (2009–2026): what made them work, and what DeltaOps labs should borrow

Prepared for: DeltaOps Learning (short, staff-facilitated, browser-based "AI labs" for children aged about 7–13 on voxel-diorama islands).
Date: 4 November 2026. Round 3 (verification and extension pass).
Main tool: the Exa connector (four `agent_run` research runs plus direct search and fetch). I did not use WebSearch.

---

## Changes from round 2

**Figures corrected or updated with official sources**

| Item | Round 2 said | Round 3 finding |
|---|---|---|
| Islanders sales | "No official unit total found" | **Over 1 million copies across all platforms** (Coatsink, May 2022) ([Coatsink](https://coatsink.com/blog/the-future-of-islanders)) |
| Dorfromantik sales | Estimates of 527k to 2M | **"über eine Million"** (over a million), reported in a profile of the studio (Aug 2024) ([Süddeutsche Zeitung](https://www.sueddeutsche.de/wirtschaft/entwicklerstudio-computerspiel-ueberraschungserfolg-dorfromantik-lux.MS6SpXUogkKSccdreH9b1r)). Estimates removed. |
| Townscaper sales | 380k (May 2021); Steam estimates up to 1.5M | **700,000 across all platforms**, in Stålberg's own words (Konsoll, Nov 2021) ([talk video](https://www.youtube.com/watch?v=5xrRTOikBBg)). Estimates removed. |
| Stardew Valley | 41M+ (Dec 2024) | **50 million copies** (ConcernedApe, 26 Feb 2026) ([Stardew Valley blog](https://www.stardewvalley.net/stardew-valley-10-year-anniversary/)) |
| Minecraft | 350M sales | 350M+ sales still stands ([Guinness](https://www.guinnessworldrecords.com/world-records/best-selling-video-game)). Added **155M monthly active users**, an all-time high (Microsoft, Oct 2025) ([Microsoft IR](https://www.microsoft.com/en-us/investor/events/fy-2026/earnings-fy-2026-q1)) |
| Animal Crossing: NH | ~50.3M, cited via Shacknews | **50.29M**, now cited from Nintendo IR directly (to 30 Jun 2026) ([Nintendo IR](https://www.nintendo.co.jp/ir/en/finance/software/switch.html)) |
| Roblox | 151M DAU (Q3 2025); "~40M under 13" (Statista) | **138M DAU in Q3 2026** ([Roblox Q3 2026 letter, SEC](https://www.sec.gov/Archives/edgar/data/1315098/000162828026068235/ex991-q32026earningsshar.htm)). The Statista under-13 figure is replaced (see §2). |
| Frostpunk | "5M+ later" (no source) | **5M+** (Apr 2024) ([GWO](https://gameworldobserver.com/2024/04/24/frostpunk-sales-5-million-copies-11-bit-studios)); Frostpunk 2 **>1M** ([11 bit H1 2026 report](https://ir.11bitstudios.com/wp-content/uploads/2026/08/26_08_27_H1_2026.pdf)) |
| Timberborn | 1M+ (Sept 2023) | Still 1M+; **1.0 launched 12 March 2026** ([Mechanistry](https://mechanistry.com/press/lumberpunk-city-builder-timberborn-launches-into-1-0-with-new-features-bonus-content-more)) |
| Crossy Road | 50M downloads in 90 days | Kept, plus **250M+ downloads to date** (official press kit) ([Crossy Road](https://www.crossyroad.com/crossy-road-classic-press-kit)) |
| Monument Valley | MV1 ~$9.5M; MV2 3.5M copies | Kept, plus **160M+ downloads for MV1 and MV2** (ustwo, Apr 2024) ([Gamespress](https://www.gamespress.com/ustwo-games-marks-10-years-of-Monument-Valley-with-year-long-celebrati)) |
| LEGO Builder's Journey | Award only | **10M+ players, of whom more than 7M came from an Epic giveaway** (Mar 2023) ([Gamespress](https://www.gamespress.com/Light-Brick-Studio-celebrates-over-10M-LEGO-Builders-Journey-players-a)) |
| Toca Boca World | ~439M downloads [E] | **60M+ children a month** ([Toca Boca](https://www.tocaboca.com/about)); **1B+ downloads across the Toca app portfolio** in 2024 ([Spin Master 2024 annual report](https://assets.ctfassets.net/r3qu44etwf9a/6byCmzEetz7r0gdEtEvKoy/367c17f1e2e45f0460f81b124d192b1e/2024_Annual_Report.pdf)). Estimate removed. |
| Hay Day | ~$1.4B (Statista) | **Over $2B lifetime revenue** (Supercell CEO, Feb 2023) ([Supercell](https://supercell.com/en/news/next-chapter/)) |
| Spore | EEDAR estimate of ~3M; "25M creatures" | Estimate removed. Official figures: **1M in about 3 weeks; 25M creations** (Sept 2008) ([EA](https://ir.ea.com/press-releases/press-release-details/2008/Spore-Begins-With-a-Big-Bang/default.aspx)); **100M creations, of which 31M were creatures** (May 2009) ([EA](https://ir.ea.com/press-releases/press-release-details/2009/100-Million-Creations-Take-Over-Spore-Universe/default.aspx)). Round 2 wrongly called all 25M "creatures". |
| Viva Piñata | ~500k [P] | Upgraded to [O]: "close to half a million sales… worldwide", from designer Justin Cook (Oct 2007) ([Game Developer](https://www.gamedeveloper.com/business/a-rare-opportunity-on-pi-atas-microsoft-and-more)) |
| Before We Leave | 50k on Epic in ~7 months (wiki mirror) | Corrected: **50k+ in its first ten months** (publisher PR, Mar 2021) ([theGG](https://thegg.net/press-releases/the-civilization-building-game-before-we-leave-is-coming-to-steam-on-may-13th-2021/)) |
| Banished, Cozy Grove | Estimates [E] | **Estimates removed**; no official figures exist (see §2) |
| Pocket Build | ~9.8M installs [E] | Replaced with the Google Play store count, **5M+ downloads** ([Google Play](https://play.google.com/store/apps/dev?hl=en&id=6818158347903315126)) |
| SimCity | No figures | Series **18M+ by 2007** ([EA](https://ir.ea.com/press-releases/press-release-details/2007/EA-Donates-Original-City-Building-Game-SimCity-to-One-Laptop-per-Child-Initiative/default.aspx)); SimCity (2013) **1.6M in its first weeks** ([EA](https://news.ea.com/press-releases/press-releases-details/2013/Electronic-Arts-Reports-Q4-FY13-and-FY13-Financial-Results/default.aspx)) |

**Round-2 claims corrected**

- **Viva Piñata audience.** Round 2 said it was "aimed at children". Lead designer Gregg Mayles: "Designing a game that is targeted exclusively at kids is not what we intended to do" ([Rare fan database interview](https://www.rarefandabase.com/exclusive-a-classic-interview-with-gregg-mayles/)).
- **Cities: Skylines II.**
  - The "lost ~70% of players" figure is a drop in *Steam concurrent players* three weeks after launch, not lost buyers ([PCGamesN](https://www.pcgamesn.com/cities-skylines-2/steam-players)).
  - "Miscalculated" is a journalist's word. The actual quote is "we underestimated how it will be perceived by players" ([RPS](https://www.rockpapershotgun.com/players-are-now-less-accepting-that-games-will-be-fixed-say-paradox-after-underestimating-the-reaction-to-cities-skyline-2s-performance-woes)).
- **SimCity 2013 and Maxis.** EA closed Maxis Emeryville in March 2015 ([Polygon](https://www.polygon.com/2015/3/4/8149791/ea-closes-maxis-simcity-the-sims/)). EA's statement does not say the SimCity launch caused the closure, so round 2's causal link is softened.
- **Welcome to Bloxburg.**
  - The Embracer acquisition is confirmed: Embracer bought Shortcake AB in 2022 ([Embracer brochure](https://embracer.com/wp-content/uploads/2025/10/Information-Brochure-Distribution-of-CSG.pdf)).
  - The "~$100M" price was never officially confirmed ([Sportskeeda](https://www.sportskeeda.com/roblox-news/news-popular-roblox-game-welcome-bloxburg-reportedly-acquired-embracer-group-100-million-deal)).
- **Islanders: New Shores** is developed by **The Station**, not Grizzly Games. Coatsink and Thunderful publish it ([Steam](https://store.steampowered.com/app/2368930/ISLANDERS_New_Shores/)).
- **Monument Valley talk access.** Ken Wong's GDC Europe 2014 talk is **free** on GDC Vault, not behind a login ([Game Developer](https://www.gamedeveloper.com/design/video-designing-i-monument-valley-i-to-be-an-experience-not-a-game)). I quote his own interview words instead of paraphrasing a write-up.
- **"[obs]" onboarding descriptions** for Islanders, Mini Metro, Station to Station, Terra Nil and Minecraft are now backed by reviews, developer statements or documentation (§3).

**Round-2 gaps closed**

1. **Frostpunk primary designer sources.** Marta Fijak and Kuba Stokalski on the Hope/Discontent meters and the Book of Laws (§3.11).
2. **Islanders: New Shores reception** (§3.4).
3. **Audience ages.**
   - Minecraft: a Microsoft statement, an Australian survey and Ofcom 2026.
   - Animal Crossing: Nintendo IR and the producer (§2.1).
4. **Will Wright "software toy".** His primary quote on the term (§3.10).
5. **Laysara, Ooblets and Kardboard Kings** (§4).
6. **Stålberg talk transcripts.** I read the full Konsoll 2021 transcript and a summary of the SGC 2021 talk. Monument Valley is covered by Wong's own interview quotes.

**New in round 3**

- More than 25 primary designer quotes.
- Mini Metro's exact overcrowding timer: 45 s plus a 2 s grace period.
- Unpacking's change to its red "wrong place" outline. This matters directly for DeltaOps' red ✕ alerts.
- Townscaper's "discoverable and predictable recipes" rule, and Stålberg's argument that scores crowd out intrinsic motivation.
- UK children's reach data for Roblox and Minecraft.
- A revised ranking of the 15 mechanics, with three changes (§6).

---

## 1. How to read this report

**Evidence grades**

- **[O]** Official: the developer's or publisher's own statement, IR filing or press release (or a press article directly quoting one).
- **[P]** Press-reported, attributed to the studio but not in the studio's own channel.
- **[S]** Store or platform counter, such as Google Play download bands or Steam review percentages. These are snapshots taken in November 2026.
- **[obs]** My own designer's reading of how the game plays. It is used only where no source describes the point, and is never used for figures.

**Rules for estimates**

- Third-party sales estimates (Boxleiter-style, SteamSpy-style) have been **removed**.
- Where no official figure exists, the report says so.

**Treatment of web text**

- Web text was treated as data. Quotes are kept short and attributed.

---

## 2. Success figures (best available, November 2026)

| Game | Figure | Date | Grade | Source |
|---|---|---|---|---|
| Minecraft | 350M+ sold; 155M MAU | Apr 2025; Oct 2025 | O | [Guinness](https://www.guinnessworldrecords.com/world-records/best-selling-video-game); [Microsoft IR](https://www.microsoft.com/en-us/investor/events/fy-2026/earnings-fy-2026-q1) |
| Roblox | 138M DAU; ~34B hours in the quarter | Q3 2026 | O | [Roblox, SEC filing](https://www.sec.gov/Archives/edgar/data/1315098/000162828026068235/ex991-q32026earningsshar.htm) |
| Animal Crossing: NH | 50.29M units | to 30 Jun 2026 | O | [Nintendo IR](https://www.nintendo.co.jp/ir/en/finance/software/switch.html) |
| Stardew Valley | 50M copies | Feb 2026 | O | [ConcernedApe](https://www.stardewvalley.net/stardew-valley-10-year-anniversary/) |
| Crossy Road | $10M and 50M downloads in 90 days; 250M+ downloads to date | 2015; undated press kit | P / O | [Cult of Mac](https://www.cultofmac.com/news/crossy-road-developers-made-10-million-90-days); [press kit](https://www.crossyroad.com/crossy-road-classic-press-kit) |
| Monument Valley 1+2 | 160M+ downloads. MV2: 3.5M copies sold and $10.4M in year one | Apr 2024; 2018 | O | [ustwo via Gamespress](https://www.gamespress.com/ustwo-games-marks-10-years-of-Monument-Valley-with-year-long-celebrati); [MCV](https://mcvuk.com/business-news/monument-valley-2-sells-3-5m-and-brings-in-10m-revenue-over-first-year/) |
| Monument Valley 3 | None found (Netflix release) | 2024 | — | [ustwo](https://ustwogames.co.uk/news/monument-valley-3-is-here/) |
| Toca Boca World | 60M+ children a month; portfolio 1B+ downloads | 2024–25 | O | [Toca Boca](https://www.tocaboca.com/about); [Spin Master](https://www.spinmaster.com/en-US/corporate/media/press-releases/123001) |
| Cities: Skylines | 12M+ copies | Jun 2022 | O | [Paradox](https://www.paradoxinteractive.com/media/press-releases/paradox-interactive/cities-skylines-hits-12-million-sales-mark) |
| Cities: Skylines II | 1M+ copies, but concurrent players fell ~70% within 3 weeks | Feb 2024; Nov 2023 | O / P | [PCGamesN](https://www.pcgamesn.com/cities-skylines-2/statement-paradox); [PCGamesN](https://www.pcgamesn.com/cities-skylines-2/steam-players) |
| SimCity series | 18M+ (to 2007); SimCity 2013: 1.6M by 31 Mar 2013 | 2007; 2013 | O | [EA 2007](https://ir.ea.com/press-releases/press-release-details/2007/EA-Donates-Original-City-Building-Game-SimCity-to-One-Laptop-per-Child-Initiative/default.aspx); [EA 2013](https://news.ea.com/press-releases/press-releases-details/2013/Electronic-Arts-Reports-Q4-FY13-and-FY13-Financial-Results/default.aspx) |
| Frostpunk / Frostpunk 2 | 5M+ / 1M+ | Apr 2024 / Aug 2026 | O | [GWO](https://gameworldobserver.com/2024/04/24/frostpunk-sales-5-million-copies-11-bit-studios); [11 bit IR](https://ir.11bitstudios.com/wp-content/uploads/2026/08/26_08_27_H1_2026.pdf) |
| Manor Lords | 3M+ | Feb 2025 | O | [Gamespress](https://www.gamespress.com/Manor-Lords-celebrates-three-million-sales) |
| Mini Metro / Mini Motorways | 7M+ copies / 9M+ players | Nov 2021 / Nov 2025 | O | [NZGDA](https://www.nzgda.com/blog/news/dinosaur-polo-club-makes-deloittes-fast-50-as-mini-motorways-surpasses-500000-copies-sold); [NZGDA](https://www.nzgda.com/blog/mini-motorways-celebrates-nine-million-players-as-dinosaur-polo-club-launches-new-creative-mode) |
| Against the Storm | 2M+ | Aug 2026 | O | [Gamespress](https://www.gamespress.com/en-US/against-the-storm-2-million-copies-sold-milestone) |
| Hay Day | $2B+ lifetime revenue | Feb 2023 | O | [Supercell](https://supercell.com/en/news/next-chapter/) |
| Kingdoms and Castles | 1.3M+ | Jun 2023 | O | [Gamespress](https://www.gamespress.com/en-US/Kingdoms-and-Castles-patch-daily-deal) |
| Islanders | 1M+, all platforms | May 2022 | O | [Coatsink](https://coatsink.com/blog/the-future-of-islanders) |
| Dorfromantik | 1M+ | Aug 2024 | P | [SZ](https://www.sueddeutsche.de/wirtschaft/entwicklerstudio-computerspiel-ueberraschungserfolg-dorfromantik-lux.MS6SpXUogkKSccdreH9b1r) |
| Timberborn | 1M+ (1.0 launched Mar 2026) | 2026 | O | [Mechanistry](https://mechanistry.com/press/lumberpunk-city-builder-timberborn-launches-into-1-0-with-new-features-bonus-content-more) |
| Unpacking | 1M+ | Nov 2022 | O | [Witch Beam](https://witchbeam.com.au/2022/11/03/one-year-anniversary-and-merch/) |
| Dragon Quest Builders 2 | 1.1M+ shipped and downloaded | Aug 2019 | O | [Square Enix](https://press.na.square-enix.com/DRAGON-QUEST-BUILDERS-2-PUSHES-PAST-11-MILLION-IN-WORLDWIDE-SHIPMENTS-) |
| Spore | 1M in about 3 weeks; 100M creations | 2008; 2009 | O | [EA 2008](https://ir.ea.com/press-releases/press-release-details/2008/Spore-Begins-With-a-Big-Bang/default.aspx); [EA 2009](https://ir.ea.com/press-releases/press-release-details/2009/100-Million-Creations-Take-Over-Spore-Universe/default.aspx) |
| LEGO Builder's Journey | 10M+ players (7M+ via an Epic giveaway) | Mar 2023 | O | [Gamespress](https://www.gamespress.com/Light-Brick-Studio-celebrates-over-10M-LEGO-Builders-Journey-players-a) |
| Townscaper | 700k, all platforms | Nov 2021 | O (designer, on stage) | [Konsoll talk](https://www.youtube.com/watch?v=5xrRTOikBBg) |
| Tiny Glade | 616,528 units in its first month | Oct 2024 | O (dev data via GameDiscoverCo) | [GameDiscoverCo](https://newsletter.gamediscover.co/p/how-tiny-glade-built-its-way-to-600k); [Gigazine](https://gigazine.net/gsc_news/en/20241120-tiny-glade-600k-sold-reason/) |
| Viva Piñata | ~500k worldwide | Oct 2007 | O | [Game Developer](https://www.gamedeveloper.com/business/a-rare-opportunity-on-pi-atas-microsoft-and-more) |
| Terra Nil | 300k+ *players* (sales undisclosed) | Apr 2023 | O | [Cosmocover PR](https://www.cosmocover.com/newsroom/300000-terra-nil-activists-make-the-world-a-little-greener/) |
| Station to Station | 60k demo players at Next Fest; 89% positive on Steam [S]; no sales figure published | 2023 | O / S | [Steam news](https://store.steampowered.com/news/posts/?enddate=1689076886&feed=steam_community_announcements); [Steam](https://store.steampowered.com/app/2272400/Station_to_Station/) |
| Before We Leave | 50k+ in its first 10 months | Mar 2021 | O | [theGG PR](https://thegg.net/press-releases/the-civilization-building-game-before-we-leave-is-coming-to-steam-on-may-13th-2021/) |
| Pocket Build | 5M+ Google Play downloads | 2026 | S | [Google Play](https://play.google.com/store/apps/dev?hl=en&id=6818158347903315126) |
| Banished | **None found.** The developer's launch post gives only a peak of 19,204 concurrent players | Feb 2014 | O (players) | [Shining Rock](https://shiningrocksoftware.com/2014-02-18-released/) |
| Cozy Grove | **None found** | — | — | [Spry Fox](https://spryfox.com/our-games/cozy-grove/) |

### 2.1 Audience age (gap from round 2)

**Minecraft**
- In 2019, the head of Minecraft said "the average age of our players is 24" ([PCGamesN](https://www.pcgamesn.com/minecraft/player-age)).
- A Melbourne survey of 753 parents found 53% of children aged 6–8 and 68% of those aged 9–12 played Minecraft ([Mavoa et al., New Media & Society](https://journals.sagepub.com/doi/10.1177/1461444817745320)).

**Ofcom UK passive measurement, 2026** (smartphones and tablets only; consoles and PCs excluded; fieldwork Oct 2025–Mar 2026)

- **Roblox** reaches 58% of online 8–14s each month: 58% of 8–9s, 60% of 10–12s and 57% of 13–14s.
- **Minecraft** reaches 7% overall: 8%, 7% and 5% for the same age bands. The device scope probably understates Minecraft, because much of its play is on consoles and PCs.
- Source: [Ofcom 2026](https://www.ofcom.org.uk/siteassets/resources/documents/online-safety/research-statistics-and-data/protecting-children/childrens-passive-online-measurement-report-2.pdf?v=421984).
- Ofcom's 2024 survey found 45% of UK gamers aged 3–17 played creative or building games ([Ofcom 2024](https://www.ofcom.org.uk/siteassets/resources/documents/research-and-data/media-literacy-research/children/children-media-use-and-attitudes-2024/childrens-media-literacy-report-2024.pdf?v=368229)).

**Roblox under-13 share**
- 34% *of age-checked users* were under 13 in the week to 30 September 2026. Only 64% of DAUs had completed an age check, so this is not the share of all users ([Roblox Q3 2026](https://www.sec.gov/Archives/edgar/data/1315098/000162828026068235/ex991-q32026earningsshar.htm)).

**Animal Crossing: NH**
- Nintendo reported "a high percentage of players in their 20s and 30s" ([Nintendo IR, May 2020](https://www.nintendo.co.jp/ir/pdf/2020/200507_4e.pdf)).
- Producer Hisashi Nogami said the gender ratio "is half" ([VGC](https://www.videogameschronicle.com/news/animal-crossings-developers-say-the-series-must-continue-to-evolve/)).

**What this means for DeltaOps**
- The biggest "kids'" builders are actually **all-ages** games, and their designers say so.
- Townscaper is played by "kids as young as three years old" and by older people who "haven't played a video game ever" ([Stålberg, Konsoll](https://www.youtube.com/watch?v=5xrRTOikBBg)).
- Unpacking is playable by "5 year olds and 75-year-olds" ([Game Developer on Brier's GDC talk](https://www.gamedeveloper.com/design/unpacking-the-design-pillars-of-a-chill-puzzle-game)).
- Designing for the non-gamer adult (here, the facilitator) and the young child at the same time is a proven brief, not a compromise.

---

## 3. Per-game profiles (the 20 titles in the brief)

Fields: **Success** · **Core loop** · **First five minutes** · **World reaction** · **Feedback timing** · **Goal framing** · **Audience** · **Credited design decisions** (designer's own words where found).

### 3.1 Minecraft (2009/2011, Mojang)
- **Success:** see §2.
- **Core loop:** gather → craft → build → survive the night (Survival); build freely (Creative).
- **First five minutes:** a first Survival world shows tutorial hints for moving, punching a tree and crafting planks. In Java the hints stop for good once planks are crafted ([Minecraft Wiki, community documentation](https://minecraft.wiki/w/Tutorial_hints)). Round 2's "no tutorial" is therefore only true of the early game.
- **World reaction:** blocks change at once, and mobs appear at night [obs].
- **Feedback timing:** instant for blocks; minutes for the day/night cycle.
- **Goal framing:** self-set. Lead designer Jens Bergensten says most added systems are optional ("you're almost never forced to use it"), but hunger "you can't ignore" ([Game Developer](https://www.gamedeveloper.com/business/talking-the-future-of-i-minecraft-i-)).
- **Audience:** all ages (§2.1).
- **Credited design decisions:**
  - Persson: "it feels like you're playing with the world instead of in the world" ([Hooked Gamers](https://hookedgamers.com/features/2010/12/01/markus_persson_on_minecraft.html)).
  - Bergensten refuses to add bulk editing: "I don't want to turn Minecraft into an editor". One block at a time keeps another player's building intentions readable in co-op ([TIME](https://time.com/4568843/minecraft-exploration-update-jens-bergensten-interview/)).

### 3.2 Townscaper (2020/21, Oskar Stålberg / Raw Fury)
- **Success:** 700k on all platforms by November 2021 ([Konsoll talk](https://www.youtube.com/watch?v=5xrRTOikBBg)).
- **Core loop:** pick a colour → click to add or remove a block → the town assembles itself.
- **First five minutes:** "the first time someone opens the game they should always know what to do"; "the only interaction you have is pick a colour, add, remove blocks" ([Konsoll](https://www.youtube.com/watch?v=5xrRTOikBBg)).
- **World reaction:** roofs, stairs, gardens, butterflies (anchored to garden bushes) and gulls/pigeons all respond to what you build ([Konsoll](https://www.youtube.com/watch?v=5xrRTOikBBg)).
- **Feedback timing:** immediate. Discovering a "recipe" plays only "a little bit of a special sound… super subtle".
- **Goal framing:** none. "No scoring… no win-lose conditions." Stålberg's reason: "if you have scoring like that of any kind the user will start to play towards the score instead of… their intrinsic sense of what's beautiful", citing the finding that paid Lego builders enjoy building less ([Konsoll](https://www.youtube.com/watch?v=5xrRTOikBBg)).
- **Audience:** "kids as young as three years old", plus older non-gamers.
- **Credited design decisions:**
  - **Recipes must be "discoverable"** by someone clicking around, **and "predictable"**: "if they've learned how to build a garden… whenever you make an enclosed area… it has to become a garden".
  - **Always favour the casual user** over the power user.
  - **Undo**, so "you can't make mistakes, it just looks nice all the time".
  - **Grid system.** The irregular quad grid comes from wave function collapse, plus a hex-to-quad subdivision ([Konsoll](https://www.youtube.com/watch?v=5xrRTOikBBg); [SGC 2021 summary](https://videohighlight.com/v/Uxeo9c-PX-w)).
  - **Building in public.** Share development in public, but "you shouldn't let the mob design your game".
- **Critique:** Cubed3 gave it 5/10: "Your imagination is the limit… unless your boredom wins first" ([Cubed3](https://www.cubed3.com/games/reviews/nintendo-switch/townscaper)).

### 3.3 Tiny Glade (2024, Pounce Light)
- **Success:** 616,528 units in its first month ([Gigazine](https://gigazine.net/gsc_news/en/20241120-tiny-glade-600k-sold-reason/)). The demo drew 350k+ players ([80.lv](https://80.lv/articles/cozy-and-relaxing-castle-building-sim-tiny-glade-launches-soon)).
- **Core loop:** draw walls and paths → the game adds detail → admire.
- **First five minutes:** each Glade has "starting buildings designed to show you a few extra building elements" ([80.lv](https://80.lv/articles/exclusive-tiny-glade-developers-discuss-bevy-proceduralism-publishers-cozy-games)).
- **World reaction:** "Draw a path through a building? A door pops up!"; "ivy envelops your buildings, sheep waddle through your paths" ([Steam feature list via GamingOnLinux](https://www.gamingonlinux.com/2024/06/tiny-glade-is-a-gorgeous-castle-doodling-game-thats-real-clever-to-relax-with/)).
- **Feedback timing:** real time. "Every action has an animated undo and redo" (same source).
- **Goal framing:** "No management, no combat, or wrong answers" ([80.lv](https://80.lv/articles/cozy-and-relaxing-castle-building-sim-tiny-glade-launches-soon)).
- **Audience:** broad.
- **Credited design decisions:**
  - "We validate them on how many stories they can tell."
  - Some features went through "five or six iterations… thanks to playtesting".
  - Playtesters' workarounds (stairs used as machicolations; bridges) became features ([80.lv](https://80.lv/articles/exclusive-tiny-glade-developers-discuss-bevy-proceduralism-publishers-cozy-games)).
  - "Getting more with less effort", "not giving wrong answers", a world that reacts ([Gigazine](https://gigazine.net/gsc_news/en/20241120-tiny-glade-600k-sold-reason/)).

### 3.4 Islanders (2019, Grizzly Games) and Islanders: New Shores (2025, The Station)
- **Success:** 1M+ ([Coatsink](https://coatsink.com/blog/the-future-of-islanders)).
- **Core loop:** choose one of two building packs → place for points → fill the gauge → move to a new island ([Wikipedia](https://en.wikipedia.org/wiki/Islanders_(video_game))).
- **First five minutes:** a small island and a choice between two packs. A selected building shows a translucent "scoring sphere", and **potential points are previewed before placement** ([Wikipedia](https://en.wikipedia.org/wiki/Islanders_(video_game)); [GameGrin](https://www.gamegrin.com/reviews/islanders-review/)).
- **World reaction:** points float up; buildings cannot be removed once placed ([Nintendo World Report](http://www.nintendoworldreport.com/review/58076/islanders-console-edition-switch-review)).
- **Feedback timing:** continuous preview, then instant scoring.
- **Goal framing:** a points threshold unlocks the next island.
- **Audience:** broad, beginner-friendly.
- **Credited design decisions:**
  - Allmenröder: "Can we make it simpler? Can the game still be fun if we cut this feature?" ([GWO](https://gameworldobserver.com/2019/06/14/islanders)).
  - Tyroller: "a more condensed experience that's more accessible for beginners" ([Tyroller portfolio](https://jonastyroller.myportfolio.com/islanders)).
- **New Shores reception:**
  - Scores: Steam 96% positive (1,254 reviews) [S], Metacritic 83 ([Steam](https://store.steampowered.com/app/2368930/ISLANDERS_New_Shores/)); OpenCritic 81 ([OpenCritic](https://opencritic.com/game/18852/islanders-new-shores)).
  - Gamereactor gave 7/10: "more like… an add-on than a sequel" ([Gamereactor](https://www.gamereactor.eu/islanders-new-shores-1569743/)).
  - Checkpoint gave 8/10 but likened hunting for the one high-scoring spot to "metal detecting" ([Checkpoint](https://checkpointgaming.net/reviews/2025/07/islanders-new-shores-review-a-whole-new-world/)).
  - Cubed3 gave 9/10 ([Cubed3](https://www.cubed3.com/games/reviews/nintendo-switch/islanders-new-shores)).
  - *Lesson:* minimal formulas survive a sequel, but the novelty does not. Hidden "one right spot" scoring frustrates players.

### 3.5 Dorfromantik (2021/22, Toukana)
- **Success:** 1M+ [P] ([SZ](https://www.sueddeutsche.de/wirtschaft/entwicklerstudio-computerspiel-ueberraschungserfolg-dorfromantik-lux.MS6SpXUogkKSccdreH9b1r)). The board game won Spiel des Jahres 2023 ([Pegasus](https://pegasus.de/en/Dorfromantik-Das-Brettspiel-Spiel-des-Jahres-2023/51240G)).
- **Core loop:** place a hex tile → match its edges → score until the stack runs out ([SZ](https://www.sueddeutsche.de/wirtschaft/entwicklerstudio-computerspiel-ueberraschungserfolg-dorfromantik-lux.MS6SpXUogkKSccdreH9b1r)).
- **Goal framing:** a soft goal. "The only opponent is your own high score, if you want to compete at all" (SZ, translated).
- **Credited design decisions:**
  - "We made a much smaller, simpler game", and got feedback from other people early (Zausch, SZ, translated).
  - "Minimalism has been at the core", with palettes checked in greyscale ([80.lv](https://80.lv/articles/how-dorfromantik-expands-its-cozy-world-through-minimalist-design)).

### 3.6 Animal Crossing: New Horizons (2020, Nintendo)
- **Success:** 50.29M (§2).
- **First five minutes:** the "Deserted Island Getaway Package". You arrive and receive a Nook Phone; tents, crafting and DIY follow ([Nintendo](https://www.nintendo.com/en-za/News/2019/June/See-what-the-island-life-has-in-store-for-you-in-Animal-Crossing-New-Horizons--1588039.html)).
- **Credited design decisions:**
  - Director Aya Kyogoku: "a deserted island would be perfect" for a new start on a blank canvas ([Nintendo Insider](https://www.nintendo-insider.com/animal-crossing-new-horizons-interview-multiplayer-turnip-prices-tom-nook-and-more/)).
  - Crafting and terraforming let players change the island at once, without waiting for real-time days ([Game Developer](https://www.gamedeveloper.com/design/why-nintendo-s-new-i-animal-crossing-i-features-allow-instant-change-in-the-real-time-game)).
- **Feedback timing:** instant crafting; a daily clock for everything else.
- **Audience:** mostly 20s–30s, half male and half female (§2.1).

### 3.7 Stardew Valley (2016, ConcernedApe)
- **Success:** 50M (§2).
- **Core loop:** plant → harvest → upgrade → befriend; bundles in the Community Center.
- **Credited design decisions:** relentless revision. "I ended up re-doing nearly all the art several times" ([Barone](https://www.stardewvalley.net/stardew-valley-v1-1-changelog/)). Update 1.4 fixed "weird or annoying things about the controls & feel" ([Barone](https://www.stardewvalley.net/blog/page/4/)).
- **Feedback timing:** daily cycles. The "~14 real minutes per day" figure is still unverified (see "Still unverified").

### 3.8 Cities: Skylines (2015) and Cities: Skylines II (2023), Colossal Order / Paradox
- **Success:** 12M+ for the first game; the sequel's launch failed (§2).
- **Core loop:** road → zone → services → fix traffic.
- **Credited design decisions:** designer Karoliina Korppoo:
  - "We really put lots of effort into making the game accessible to people who aren't so experienced."
  - Modding "gives it a longer lifespan, because it is a game about creativity" ([Prima](https://primagames.com/featured/cities-skylines-snowfall-interview)).
- **Failure (CS2):** performance problems at launch. Paradox: "we underestimated how it will be perceived by players" ([RPS](https://www.rockpapershotgun.com/players-are-now-less-accepting-that-games-will-be-fixed-say-paradox-after-underestimating-the-reaction-to-cities-skyline-2s-performance-woes)).

### 3.9 SimCity (1989–2013, Maxis)
- **Success:** 18M+ for the series by 2007 ([EA](https://ir.ea.com/press-releases/press-release-details/2007/EA-Donates-Original-City-Building-Game-SimCity-to-One-Laptop-per-Child-Initiative/default.aspx)).
- **The "software toy" (primary source, gap closed).** Asked whether he coined "software toy", Will Wright said "I think I did".
  - "Toys can be used to build games… I think of toys as being more open-ended than games."
  - On SimCity: "it forces you to determine the goals… And that's where it's become more like a toy" ([Rouse, *Game Design: Theory and Practice*, ch. 22 interview](https://flylib.com/books/en/4.479.1.114/1/)).
- **Balance of control.** In 1994 he described the balance this way: "the sims don't obey… When you have a certain amount of control, but then there's a certain amount of entropy" ([Wired interview, archived](https://docslib.org/doc/835090/will-wright-the-mayor-of-simcity)).
- **SimCity 2013 (failure).** It sold 1.6M at launch ([EA](https://news.ea.com/press-releases/press-releases-details/2013/Electronic-Arts-Reports-Q4-FY13-and-FY13-Financial-Results/default.aspx)), but its always-online servers left it "unplayable by many gamers for weeks" ([CBC](https://www.cbc.ca/news/science/electronic-arts-closes-maxis-studio-makers-of-simcity-and-the-sims-1.2982873)).

### 3.10 Terra Nil (2023, Free Lives / Devolver)
- **Success:** 300k+ players in about a week ([Cosmocover](https://www.cosmocover.com/newsroom/300000-terra-nil-activists-make-the-world-a-little-greener/)).
- **First five minutes:** place a wind turbine on rock → a toxin scrubber → an irrigator, and "bright green grass begins to grow". There is an undo button ([PC Gamer](https://www.pcgamer.com/transforming-a-barren-wasteland-into-a-leafy-green-paradise-feels-damn-good-in-terra-nil/); [Guardian](https://www.theguardian.com/games/2023/mar/27/terra-nil-review-restore-nature-and-with-it-your-hope-for-the-future)).
- **World reaction:** greening spreads; later, birds, frogs and deer arrive. Players pick a species *silhouette* and scan habitats to learn what it needs ([PC Gamer](https://www.pcgamer.com/transforming-a-barren-wasteland-into-a-leafy-green-paradise-feels-damn-good-in-terra-nil/); [Roundtable Co-op](https://roundtablecoop.com/reviews/terra-nil-review-making-the-world-better/)).
- **Goal framing:** three phases, then recycle every machine.
- **Credited design decisions:**
  - Sam Alfred: "if we have too many buildings, we've got to take the buildings away" ([Game Developer](https://www.gamedeveloper.com/design/why-a-recycling-mechanic-saved-terra-nil-s-climate-cleanup-mechanics)).
  - "Instead of building a city, you were building nature" ([Science Friday](https://www.sciencefriday.com/segments/video-game-environment/)).
- **Caution:** a controlled burn can kill animals you have just attracted, and reviewers found that upsetting ([Roundtable Co-op](https://roundtablecoop.com/reviews/terra-nil-review-making-the-world-better/)).

### 3.11 Frostpunk (2018, 11 bit studios) — primary sources (gap closed)
- **Success:** 5M+ (§2).
- **Hope and Discontent.**
  - Senior designer Marta Fijak: Discontent "came from citizens' needs"; Hope came from research into survival stories: "they need a reason to survive and this is what hope represents" ([PC Gamer](https://www.pcgamer.com/frostpunk-developers-on-hope-misery-and-the-ultimately-terrifying-book-of-laws/)).
  - Discontent began as a single bar; Hope was added after that research ([TechRaptor](https://techraptor.net/gaming/features/how-11-bit-studios-created-society-survival-simulator-frostpunk)).
  - Both bars are averages of about 13–14 needs per citizen ([Game Developer](https://www.gamedeveloper.com/design/making-i-frostpunk-i-grim-without-descending-to-dark-comedy)).
- **Book of Laws.**
  - Early builds pushed law decisions onto players through pop-up questions. "This is not the best way… there is no player agency", so laws moved into a book players open when they choose. The laws are sequenced to show "creeping normality" ([PC Gamer](https://www.pcgamer.com/frostpunk-developers-on-hope-misery-and-the-ultimately-terrifying-book-of-laws/)).
  - Stokalski: the theme is "Will you cross the line". Players did not empathise with 500 citizens, but did reflect afterwards: "Did I really do that?" ([Stokalski, Game Developer](https://www.gamedeveloper.com/design/human-values-in-game-design---an-approach-for-designing-emergent-storytelling)).
- **Unintended messages.** A tuning that gave amputees a 50% suicide chance sent a message the designer did not hold, so it was replaced with laws and protests ([Game Developer](https://www.gamedeveloper.com/design/systems-in-games-like-i-frostpunk-i-can-express-personal-ideas-even-unintentionally)).
- **Audience:** adult.

### 3.12 Roblox (platform)
- **Success:** 138M DAU (§2).
- **Credited design decisions:** David Baszucki: "People play a few games, get inspired, start tinkering with Roblox Studio". Studio should be "the 'MS Word' of game development" ([Wired](https://www.wired.com/2013/02/roblox/)).
- **Bloxburg and Adopt Me:** "the house is the reward". Embracer acquired Bloxburg's studio, Shortcake AB, in 2022 ([Embracer](https://embracer.com/wp-content/uploads/2025/10/Information-Brochure-Distribution-of-CSG.pdf)). Visit counts were not re-verified (see "Still unverified").

### 3.13 Crossy Road (2014, Hipster Whale)
- **Success:** see §2.
- **Core loop:** tap to hop; collect characters.
- **Credited design decisions:**
  - Andy Sum: "really obvious hit boxes and sharp edges so that you could… easily judge whether or not you could make the right hop" ([PocketGamer.biz](https://www.pocketgamer.biz/making-of-crossy-road/)).
  - Matt Hall: "The main metric we focused on was retention" ([PocketGamer.biz](https://www.pocketgamer.biz/crossy-road-sharing-retention/)).
  - The rotated camera "looked 100 times better"; monetisation was kept fair because the game was meant for children ([Pocket Gamer](https://www.pocketgamer.com/crossy-road/it-had-to-be-free-pocket-gamer-biz-chronicles-the-making-of-crossy-road)).

### 3.14 Monument Valley (2014, ustwo games)
- **Success:** see §2.
- **First five minutes:** "Almost no instructions are given to the player – instead we urge them to discover for themselves". Players are guided by colour, space and architecture ([Ken Wong, PRINT](https://www.printmag.com/design-inspiration/inside-the-monument-valley-app/)).
- **Credited design decisions:**
  - "A game that could be played by people who don't usually play games"; "We user tested heavily, observing the behaviour of players" ([PRINT](https://www.printmag.com/design-inspiration/inside-the-monument-valley-app/)).
  - The GDC Europe 2014 talk "Less Game, More Experience" traded "challenging puzzles for an aesthetic journey" and kept it "short but sublime" ([GDC Vault](https://www.gdcvault.com/play/1020878/Designing-Monument-Valley-Less-Game)).

### 3.15 Mini Metro (2015, Dinosaur Polo Club)
- **Success:** see §2.
- **First five minutes:** three stations; drag a line and "commuters will begin to use your line" ([Miles in Transit](https://milesintransit.com/2014/03/29/mini-metro/)).
- **World reaction and timing:**
  - An overcrowded station grows a circle that fills. Robert Curry: "It takes 45 seconds, plus we give two seconds' grace period… You need close losses to make the close victories that much sweeter" ([Steam forum, developer post](https://steamcommunity.com/app/287980/discussions/0/35221584552224188/)).
  - An Endless mode removes the fail state ([Nintendo World Report](http://www.nintendoworldreport.com/review/48238/mini-metro-switch-review)).
- **Credited design decisions:**
  - "Ironically liberating working within constraints" ([devlog](https://dinopoloclub.com/2013/10/18/mind-the-gap/)).
  - Peter Curry: "having the player build the map, with AI agents navigating their way around it" ([Game Developer](https://www.gamedeveloper.com/audio/road-to-the-igf-dinosaur-polo-club-s-i-mini-metro-i-)).

### 3.16 Timberborn (2021 EA; 1.0 2026, Mechanistry)
- **Success:** 1M+ (§2).
- **World reaction:** droughts and badtides visibly change the map.
- **Credited design decisions:**
  - "We knew we wanted droughts in the game. That's what pushed us toward implementing water physics" ([Mechanistry devs, Game Developer](https://www.gamedeveloper.com/design/deep-dive-timberborn-s-water-mechanics)).
  - Removing water was "the best worst thing we could do" ([Mechanistry](https://mechanistry.com/press/how-to-starve-a-post-apocalyptic-beaver-colony-steam-game-festival)).
  - *Lesson:* the threat came first, and the visible simulation followed from it.

### 3.17 Unpacking (2021, Witch Beam)
- **Success:** 1M+; 14% of players flushed every toilet ([Witch Beam](https://witchbeam.com.au/2022/11/03/one-year-anniversary-and-merch/); [TechRaptor](https://techraptor.net/gaming/news/unpacking-sales-move-across-million-mark)).
- **World reaction:** misplaced items get an outline when the player tries to finish a room.
- **Credited design decisions:**
  - GDC 2023 talk, "'Unpacking' Zen: Designing a Game Without Fail States or Scores" ([GDC Vault](https://gdcvault.com/play/1029400/-Unpacking-Zen-Designing-a)). Brier: "subtractive design is all about strengthening the core… by removing anything that isn't serving the core ideas" ([Game Developer](https://www.gamedeveloper.com/design/unpacking-the-design-pillars-of-a-chill-puzzle-game)).
  - **New:** Witch Beam changed the red outline for later versions: "Maybe you don't see that color, or perhaps red stresses you out". They also added a mode with no placement restrictions: "anyone can experience the story that way" ([Brier, App Store editorial](https://apps.apple.com/us/iphone/story/id1743255567)).

### 3.18 Viva Piñata (2006, Rare)
Pre-2009, but kept because its loop matches the pond lab so closely.
- **Success:** ~500k (§2).
- **Core loop:** clear the garden → plant → animals arrive when their requirements are met → they become residents. Sour piñatas make residents ill ([Eurogamer interview, archived](https://web.archive.org/web/20150911031312/http:/www.eurogamer.net/articles/eg_rare_int)).
- **Credited design decisions:**
  - Cook: "All the way along we wanted the animals to be spontaneous and wild… that atmosphere almost makes stories".
  - "You're kind of a rubbish god. You don't have ultimate control. All you can do is push things in the right direction" ([Wired](https://www.wired.com/2008/05/qa-viva-pinata/)).
- **Audience:** children named their animals after school friends ([Wired](https://www.wired.com/2008/05/qa-viva-pinata/)). The game was designed for "everyone", not only children ([Mayles](https://www.rarefandabase.com/exclusive-a-classic-interview-with-gregg-mayles/)).

### 3.19 LEGO Builder's Journey (2019/21, Light Brick Studio)
- **Success:** see §2.
- **Credited design decisions:** Karsten Lund: "We wanted to create a nonverbal experience where players interpret the layers in the narrative" ([Goomba Stomp](https://goombastomp.com/lego-builders-journey-creative-director-interview/)). It took many iterations ([Nintendo Everything](https://nintendoeverything.com/interview-lego-builders-journey-director-on-the-games-origins-switch-version-and-more/)).

### 3.20 Kids' builders: Toca Boca World, Pocket Build, Minecraft Education
- **Toca Boca:**
  - "We focus on play (imagination, creativity, and self expression) instead of gaming (competition, getting stuck on a level, and addiction)" ([Toca Boca](https://www.tocaboca.com/about)).
  - Co-founder Björn Jeffery: "No scores, no competition. Turns out, simple is good" ([Business Insider](https://www.businessinsider.com/toca-boca-ceo-bjorn-jeffery-interviewed-by-8-year-old-2015-5)).
- **Pocket Build:** "No missions, no objectives, no timers" ([MoonBear](https://moonbear.com/pocket-build)).
- **Minecraft Education:**
  - Reach: "More than 40,000 school systems across 140 countries" ([Minecraft Education](https://education.minecraft.net/en-us)).
  - Learning outcomes are mixed. A 2025 quasi-experiment found the control group did better on energy concepts ([Foro de Educación](https://forodeeducacion.com/ojs/index.php/fde/article/view/769)).

---

## 4. Extended set (short)

| Game | Key fact | Lesson | Source |
|---|---|---|---|
| Station to Station (2023) | Its designer: "it's all a bit grey and dull. Then by adding stations… the landscape becomes actually green… After like 15 minutes, you finish the area" | The closest analogue to DeltaOps: a voxel diorama that revives, in 15-minute levels | [Escapist interview](https://www.escapistmagazine.com/station-to-station-interview/); [Use a Potion](https://www.useapotion.com/2023/10/station-to-station-pc-review/) |
| Against the Storm | 2M+; restartable settlements | Short runs suit a builder | [Gamespress](https://www.gamespress.com/en-US/against-the-storm-2-million-copies-sold-milestone) |
| Dragon Quest Builders 2 | 1.1M+; NPCs request rooms, and the game recognises a completed room | "Recipe" recognition | [Square Enix](https://press.na.square-enix.com/DRAGON-QUEST-BUILDERS-2-PUSHES-PAST-11-MILLION-IN-WORLDWIDE-SHIPMENTS-) |
| Spore | 100M creations (31M creatures) | The creative tool outshone the game | [EA](https://ir.ea.com/press-releases/press-release-details/2009/100-Million-Creations-Take-Over-Spore-Universe/default.aspx) |
| Before We Leave | 50k+ in 10 months. Polygon: "I started to get stressed. Panicked, even." | Stress creep in a "cosy" game | [theGG](https://thegg.net/press-releases/the-civilization-building-game-before-we-leave-is-coming-to-steam-on-may-13th-2021/); [Polygon](https://www.polygon.com/2020/5/12/21256331/strategy-4x-indie-game-before-we-leave-epic-games-store/) |
| Laysara: Summit Kingdom | Left Early Access Feb 2026; Metacritic 73; Steam 81% [S]; no official sales | Strong premise (verticality), but repetition | [Metacritic](https://www.metacritic.com/game/laysara-summit-kingdom/critic-reviews/) |
| Ooblets | Metacritic 74 (Switch); Steam 91% [S]; no official sales | — | [Metacritic](https://www.metacritic.com/game/ooblets/) |
| Kardboard Kings | Steam 73% [S]; critics: "it ends too early" | — | [Metacritic](https://www.metacritic.com/game/kardboard-kings-card-shop-simulator/) |
| Hay Day | $2B+ | Timers monetise; avoid them | [Supercell](https://supercell.com/en/news/next-chapter/) |
| Kingdoms and Castles | 1.3M+ | Toy-like low-poly look on a small team | [Gamespress](https://www.gamespress.com/en-US/Kingdoms-and-Castles-patch-daily-deal) |
| Eco (Strange Loop) | US Dept of Education SBIR grant; "player-led, and teacher-guided, investigation" | Precedent for facilitated reflection | [PRWeb](https://www.prweb.com/releases/2015/06/prweb12790599.htm) |
| Settlers: New Allies | Released without critic review copies, then poor player reception | Don't abandon the core fantasy | [GamePressure](https://www.gamepressure.com/newsroom/the-settlers-new-allies-without-reviews-players-very-disappointed/z8511a) |

---

## 5. Comparison matrix (updated)

**Key**
- **Goal:** N = none/self-set · S = soft · E = explicit score or win · P = survival
- **Pressure:** 0 = none … 3 = high
- **Choices:** typical options per decision [obs]
- **Tier:** A = >10M or platform scale · B = 1–10M · C = 300k–1M · D = <300k · F = flop

| Game | Goal | Pressure | Choices | Session | Art | Tier (official basis) |
|---|---|---|---|---|---|---|
| Minecraft | N/S | 0–2 | Hundreds | 20 min – hours | Voxel | A |
| Roblox (Bloxburg/Adopt Me) | S | 0–1 | Dozens | 15–60 min | Blocky UGC | A |
| Animal Crossing: NH | S | 0 | Many | 15–60 min daily | Soft toy | A |
| Stardew Valley | S | 1 | Many | Day loops | Pixel | A |
| Cities: Skylines | S | 1–2 | Many | Hours | Realistic | A |
| Crossy Road | E | 2 | 1 | 1–3 min | Voxel | A |
| Monument Valley 1+2 | E (puzzle) | 0 | 1–3 | ~90 min total | Isometric | A (downloads) |
| Toca Boca World | N | 0 | Many | 10–30 min | Flat, kid-friendly | A |
| Mini Metro + Motorways | E (survive) | 2 | 3–5 | 10–20 min | Flat graphic | B |
| Frostpunk | P | 3 | 3–8 | 1–3 h | Dark realistic | B |
| Against the Storm | E/P | 2 | ~3 | 1–2 h | Painterly | B |
| Kingdoms and Castles | S | 1–2 | ~6 | 30–90 min | Low-poly toy | B |
| Timberborn | P | 2 | Many | Hours | Stylised 3D | B |
| Islanders | E (score) | 1 | 2 packs | 20–60 min | Low-poly pastel | **B** (was C est.) |
| Dorfromantik | S | 1 | 1 tile | 30–90 min | Watercolour low-poly | **B** (was C/B est.) |
| Unpacking | E (gentle) | 0 | 1 item | 2–3 h total | Pixel diorama | B |
| LEGO Builder's Journey | E (puzzle) + free build | 0 | Few bricks | ~2–3 h [obs] | Brick diorama | B (players, giveaway-inflated) |
| Dragon Quest Builders 2 | E (story) | 1 | Recipes | Hours | Voxel/anime | B |
| Spore | S | 1 | Many | Hours | Cartoon | B |
| Townscaper | N | 0 | Click + colour | ~1 h | Pastel toy town | C (700k) |
| Tiny Glade | N | 0 | Few tools | 15–60 min | Storybook diorama | C+ (616k in 1 month) |
| Terra Nil | E (phases) | 1 | 3–5 machines | 30–60 min | Diorama | C (players) |
| Viva Piñata | S | 1 | Many | 30–90 min | Saturated cartoon | C |
| Station to Station | E (stars) | 1 | Few | ~15 min per level | Voxel diorama | Unknown |
| Before We Leave | S | 0 → 2 (creeps) | Many | Hours | Hex low-poly | D |
| SimCity 2013 | S | 1–2 + technical friction | Many | Hours | Realistic | F (sold 2M+, broken launch) |
| Cities: Skylines II launch | S | Technical friction | Many | Hours | Realistic | F (at launch) |

**Readings**

1. **Small-scope band.** With the corrected figures, Islanders and Dorfromantik join the 1M+ tier. Minimal, few-choice, 15–60-minute builders now reliably reach tier B on tiny teams. DeltaOps' 3 cards × 6 stages format sits in this band.
2. **Pressure must be chosen.** Mini Metro adds pressure on purpose, with a readable 45 s timer and a grace period. Before We Leave let it creep in. Frostpunk makes it the point, for adults.
3. **Toys versus scores.** The goal-free toys (Townscaper, Tiny Glade, Toca) and the score games (Islanders, Mini Metro) both succeed. Their designers are explicit about why they chose one or the other (Stålberg, Toca, Allmenröder).
4. **All-ages design wins.** The children's giants are all-ages games (§2.1).

---

## 6. The 15 most transferable mechanics for DeltaOps, ranked

Ranking criteria: (a) strength of evidence, (b) fit with a facilitated 6 × 3 card format for ages 7–13, (c) build cost in a browser voxel diorama.

**Changes from the round-2 ranking**
- **#5 (new):** discoverable and predictable rules.
- **#9 (reframed):** gentle, colour-safe correction, using Unpacking's red-outline change.
- **#13 (sharpened):** stars must reward clarity, not compete with curiosity.
- **Merged:** round 2's "hopeful framing" and "phased structure" become #8.

1. **Wildlife arriving or leaving is the main consequence signal.**
   - *Evidence:* Viva Piñata's whole loop is meeting animals' requirements ([Eurogamer](https://web.archive.org/web/20150911031312/http:/www.eurogamer.net/articles/eg_rare_int)). Terra Nil's animals arrive in the last phase ([PC Gamer](https://www.pcgamer.com/transforming-a-barren-wasteland-into-a-leafy-green-paradise-feels-damn-good-in-terra-nil/)). Tiny Glade's sheep, and Townscaper's garden-anchored butterflies ([Konsoll](https://www.youtube.com/watch?v=5xrRTOikBBg)).
   - *DeltaOps:* ducks leave on the vague card and return on the clear one. Children may name the animals, as Cook's children did ([Wired](https://www.wired.com/2008/05/qa-viva-pinata/)).
2. **Preview the AI's guess before it commits.**
   - *Evidence:* Islanders' score preview before placement ([Wikipedia](https://en.wikipedia.org/wiki/Islanders_(video_game))).
   - *DeltaOps:* show the helper's interpretation as a translucent overlay next to "% sure", then play it out.
3. **The consequence plays out in the world within about a second, before any text.**
   - *Evidence:* Tiny Glade's doors that "pop up"; Terra Nil's spreading grass; Station to Station's greening ([Escapist](https://www.escapistmagazine.com/station-to-station-interview/)).
   - *DeltaOps:* start the animation on tap, and show the facilitator card once it settles.
4. **Undo as an animated rewind, never a "fail".**
   - *Evidence:* Tiny Glade's "animated undo and redo… no wrong answers" ([GamingOnLinux](https://www.gamingonlinux.com/2024/06/tiny-glade-is-a-gorgeous-castle-doodling-game-thats-real-clever-to-relax-with/)). Townscaper's undo ("it just looks nice all the time") and Terra Nil's undo button.
   - *DeltaOps:* reeds regrow and ducks fly back in reverse. Label the button "Try a clearer card".
5. **(New) Rules that are discoverable *and* predictable.**
   - *Evidence:* Stålberg: once a player learns that enclosing an area makes a garden, "I need to kind of fulfill that promise" every time ([Konsoll](https://www.youtube.com/watch?v=5xrRTOikBBg)). Dragon Quest Builders 2's room recipes.
   - *DeltaOps:* the scripted AI must misread consistently. The same vague word ("nice", "quickest") should always trigger the same *kind* of assumption across stages and labs, so children can learn the AI's "rules" and predict them.
6. **Exactly three options per decision, one of them deliberately vague.**
   - *Evidence:* Islanders' two-pack choice; Dorfromantik's single tile; Mini Metro's constraint ethic ([devlog](https://dinopoloclub.com/2013/10/18/mind-the-gap/)).
   - *DeltaOps:* keep three.
7. **Colour returning to a grey world as the progress meter.**
   - *Evidence:* Station to Station ("grey and dull… becomes actually green") ([Escapist](https://www.escapistmagazine.com/station-to-station-interview/)); Terra Nil.
   - *DeltaOps:* saturate the island a little more after each clear card. The whole room can read it from the projector.
8. **A visible phased structure with a hopeful, restorative end.**
   - *Evidence:* Terra Nil's phases and "take the buildings away" ending ([Game Developer](https://www.gamedeveloper.com/design/why-a-recycling-mechanic-saved-terra-nil-s-climate-cleanup-mechanics)). Station to Station's ~15-minute areas.
   - *DeltaOps:* a stamp at the end of each stage. In the final stage the AI helper packs its tools away.
9. **(Reframed) Gentle, late, colour-safe correction.**
   - *Evidence:* Unpacking flags misplaced items only at the end of a room, and changed its red outline because "maybe you don't see that color, or perhaps red stresses you out" ([App Store editorial](https://apps.apple.com/us/iphone/story/id1743255567)).
   - *DeltaOps:* the brochure UI uses red ✕ alerts (see `context.md`). Pair them with an icon and shape, use a softer colour, and never rely on red alone.
10. **One or two readable meters, not a dashboard.**
    - *Evidence:* Frostpunk's two bars, each grounded in research and averaging citizens' needs ([PC Gamer](https://www.pcgamer.com/frostpunk-developers-on-hope-misery-and-the-ultimately-terrifying-book-of-laws/); [Game Developer](https://www.gamedeveloper.com/design/making-i-frostpunk-i-grim-without-descending-to-dark-comedy)). Mini Metro's single timer ring.
    - *DeltaOps:* one domain meter plus "% sure". If time pressure is used at all (Mission AI's sunset), make it a visible ring with a grace margin, as Curry describes ([Steam](https://steamcommunity.com/app/287980/discussions/0/35221584552224188/)).
11. **An ownership moment at the start.**
    - *Evidence:* Animal Crossing's deserted-island "blank canvas" ([Nintendo Insider](https://www.nintendo-insider.com/animal-crossing-new-horizons-interview-multiplayer-turnip-prices-tom-nook-and-more/)); "the house is the reward" in Roblox.
    - *DeltaOps:* the group names the island, and the name appears on the facilitator cards.
12. **Readable art: silhouette first, greyscale value check, obvious edges.**
    - *Evidence:* Toukana's greyscale checks ([80.lv](https://80.lv/articles/how-dorfromantik-expands-its-cozy-world-through-minimalist-design)); Andy Sum's "really obvious hit boxes and sharp edges" ([PocketGamer.biz](https://www.pocketgamer.biz/making-of-crossy-road/)); Stålberg's tunable outlines for adding or removing emphasis ([Konsoll](https://www.youtube.com/watch?v=5xrRTOikBBg)).
    - *DeltaOps:* changing objects must read on a projector and in dark scenes. `context.md` notes that small characters vanish at dusk and on Mars.
13. **(Sharpened) Score the *instruction*, not the island.**
    - *Evidence:* Stålberg argues that scores make players "play towards the score instead of… their intrinsic sense" ([Konsoll](https://www.youtube.com/watch?v=5xrRTOikBBg)); Toca and Pocket Build avoid scores entirely. Islanders shows scores work when the score *is* the puzzle, but hidden optimal spots frustrate players ([Checkpoint](https://checkpointgaming.net/reviews/2025/07/islanders-new-shores-review-a-whole-new-world/)).
    - *DeltaOps:* stars and XP should reward a clearer instruction or checked evidence (the learning goal), never a "prettier" island. Keep island-building itself unscored.
14. **Visibly different branches, plus a postcard at the end.**
    - *Evidence:* Spore's creations outshone its game layer ([EA](https://ir.ea.com/press-releases/press-release-details/2009/100-Million-Creations-Take-Over-Spore-Universe/default.aspx)); Townscaper's OBJ export was added so people could 3D-print their towns ([Konsoll](https://www.youtube.com/watch?v=5xrRTOikBBg)); Monument Valley's "art" screens.
    - *DeltaOps:* each card changes the island physically. The lab ends with a printable or QR-saved island postcard, with no accounts.
15. **Facilitated reflection after a visible event, with zero technical friction.**
    - *Evidence:*
      - Eco's "teacher-guided investigation" ([PRWeb](https://www.prweb.com/releases/2015/06/prweb12790599.htm)).
      - Frostpunk's after-the-fact "Did I really do that?" ([Stokalski](https://www.gamedeveloper.com/design/human-values-in-game-design---an-approach-for-designing-emergent-storytelling)).
      - Minecraft Education's mixed outcomes ([Foro de Educación](https://forodeeducacion.com/ojs/index.php/fde/article/view/769)).
      - Launch failures: SimCity 2013 ([CBC](https://www.cbc.ca/news/science/electronic-arts-closes-maxis-studio-makers-of-simcity-and-the-sims-1.2982873)) and Cities: Skylines II ([RPS](https://www.rockpapershotgun.com/players-are-now-less-accepting-that-games-will-be-fixed-say-paradox-after-underestimating-the-reaction-to-cities-skyline-2s-performance-woes)).
    - *DeltaOps:* the facilitator card asks about what the world did. Labs preload fully and tolerate going offline. Playtest with real groups and observe them: Wong "user tested heavily, observing the behaviour of players" ([PRINT](https://www.printmag.com/design-inspiration/inside-the-monument-valley-app/)), and Tiny Glade iterated features "five or six" times ([80.lv](https://80.lv/articles/exclusive-tiny-glade-developers-discuss-bevy-proceduralism-publishers-cozy-games)).

### Things to avoid
- **Timers and energy gating** (Hay Day's model) ([Supercell](https://supercell.com/en/news/next-chapter/)).
- **Pressure creeping in mid-session** (Before We Leave) ([Polygon](https://www.polygon.com/2020/5/12/21256331/strategy-4x-indie-game-before-we-leave-epic-games-store/)).
- **Pushing decisions on players through pop-ups.** Frostpunk moved laws into a book because pop-ups removed agency ([PC Gamer](https://www.pcgamer.com/frostpunk-developers-on-hope-misery-and-the-ultimately-terrifying-book-of-laws/)). DeltaOps should let the group choose *when* to play a card.
- **Consequences that carry unintended messages.** Terra Nil's burns killed animals players had just attracted ([Roundtable Co-op](https://roundtablecoop.com/reviews/terra-nil-review-making-the-world-better/)). Frostpunk tuned out a message its designer did not hold ([Game Developer](https://www.gamedeveloper.com/design/systems-in-games-like-i-frostpunk-i-can-express-personal-ideas-even-unintentionally)). Audit all 729 routes for what each outcome implies to a 7-year-old: no animal deaths, and no blame on a group.

---

## Still unverified

- **Roblox experiences:** visit counts for Bloxburg (7–9.8B) and Adopt Me (20B by 2021, ~40B by 2025) come from press ([PCGamesN](https://www.pcgamesn.com/roblox/most-popular-game-adopt-me)) and were not re-checked against Roblox's own pages. The ~$100M Bloxburg price is unconfirmed.
- **Monument Valley 1 revenue:** "~$9.5M by mid-2015" relies on round 2's MCV/ustwo infographic citation and was not re-opened.
- **Stardew Valley:** "one in-game day ≈ 14 real minutes" has no source found [obs].
- **Animal Crossing:** the full opening sequence (tent, campfire, island-layout choice) is only partly confirmed by Nintendo's preview.
- **Talk transcripts:**
  - Ken Wong's GDC Europe 2014 talk is free, but I did not read a transcript. His quotes come from a PRINT interview.
  - I read only an AI-generated summary of the Stålberg SGC 2021 talk, not the full transcript.
  - I did read the full Konsoll 2021 transcript (auto-captions, so punctuation is not authoritative).
- **Unpacking's red outline:** the change is confirmed by an Apple editorial interview. The specific version that changed it, and what replaced the red, were not confirmed.
- **Minecraft tutorial hints:** sourced from the community-run Minecraft Wiki, not Mojang.
- **No official sales figures exist** for Banished, Cozy Grove, Ooblets, Laysara, Kardboard Kings, Station to Station, Terra Nil (players only) or Monument Valley 3.
- **Ofcom data:** the Minecraft figure (7%) covers smartphones and tablets only and should not be read as Minecraft's overall reach among UK children.
- **[obs] values:** "choices per decision" and session lengths in the matrix are my own readings, not measured data.
