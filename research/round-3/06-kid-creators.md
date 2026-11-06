# 06 · Kids as creators: Bloxels and similar "build your own game/world" tools (round 3)

**For:** DeltaOps Learning (browser-based, staff-led, scripted "AI labs" for ages 7 to 13)
**Researched:** 4 November 2026. Main source: the Exa connector (three `agent_run` research runs at "medium" effort, plus `web_search_exa` and `web_fetch_exa`). Key PDFs (Strawbies, Roblox Q4 2025 letter) were downloaded and checked directly. WebSearch was not used.
**Builds on:** `research/round-1/06-kid-creators.md`, `research/round-2/06-kid-creators.md`, `research/context.md`.

**How figures are marked**
- **[official]**: the company's investor-relations or statutory filings.
- **[vendor]**: the company said it about itself in press or marketing.
- **[press]**: a journalist or trade source, not the company's own filing.
- **[third-party est.]**: a tracker or analyst estimate. Kept only where nothing better exists, and labelled every time.

Round-2 markings `[est.]` and `[unverified]` have been resolved, replaced or moved to "Still unverified" at the end.

---

## Changes from round 2

**Bloxels (the main gap)**
- **Decline is now documented, not inferred.** A former Pixel Press developer describes a "3-year partnership with Mattel"; Star Wars Bloxels "was released in January of 2018, and unreleased in January of 2020" (https://markagne.com/bloxels-star-wars.html). In 2019 Pixel Press merged the consumer Builder app and the EDU app into one app and added Chromebook and browser access (https://siliconprairienews.com/2019/06/st-louis-based-pixel-press-launching-bloxels-edu-2-0-and-new-client-services-division-in-the-cortex-innovation-district/).
- **Current status corrected.** Round 2 implied the consumer kit was gone. The official store still sells a personal kit (https://store.bloxelsbuilder.com/products/bloxels-personal-edition). There is now one app; the board and blocks are optional, and an app subscription is required (https://www.bloxels.com/education , https://www.bloxels.com/education/bloxels-edu-faq). Crunchbase lists Pixel Press as active (https://www.crunchbase.com/organization/pixel-press).
- **Scale figures extended.** Three are now on record: "more than 3,000 schools" in the US (2019); "about 25,000 classrooms in the U.S." and "approaching 45,000 classrooms globally" (2020). All three are [vendor]. **No units-sold or revenue figure exists in any source found**; that claim stays in "Still unverified".
- **Classroom studies found.** Round 2 found none. There are now three small peer-reviewed conference papers: Xia, Yan and Borge, CSCL 2023; Yan and Xia, CSCL 2025; and a related Penn State paper. There is also a design-based intergenerational project (COMMIC). None is a controlled outcome study (section 2.4).
- **The "co-founder" quote is attributed correctly.** The "what's in the next box" line is Rob Bennet's, from a Mom's Choice Awards interview (https://momschoiceawards.com/blog/interview-moms-choice-award-winner-rob-bennet/).

**Other verifications**
- **KIBO vs ScratchJr (Pugnali, Sullivan and Bers 2017).** Now cited from the paper, not the vendor blog. N = 28, ages 4–7. Effects were significant for sequencing and debugging only. The authors note that the paper-cutout test may have favoured the tangible group (https://www.jite.org/documents/Vol16/JITEv16IIPp171-193Pugnali3284.pdf).
- **Bers et al. 2019, "Coding as a playground".** Verified: N = 172, ages 3–5, three Spanish centres (https://doi.org/10.1016/j.compedu.2019.04.013).
- **Game-making literacy review.** Round 2 cited it only "in search results". It is now identified: Hung, Yang and Tsai (2020), *Educational Technology & Society* 23(1), 30 studies, 2,366 participants (http://index.j-ets.net/Published/23_1/ETS_23_1_04.pdf).
- **Super Mario Maker (Wii U).** 4.02M [official, Nintendo IR, life-to-date at 31 March 2026]. Over 6.2M courses by 27 January 2016 [official]. Replaces the 4.01M / 7.25M estimates.
- **Labo.** Toy-Con 01 Variety Kit 1.42M by 31 December 2020 (CESA White Book 2021). Toy-Con Garage being "hidden" is now backed by reviews (TechRadar, Expert Reviews, The Verge), not an estimate. There is still no all-kit total.
- **Game Builder Garage.** 1.15M at 31 December 2022 is still the latest figure; nothing newer was found.
- **Removed or replaced estimates:**
  - Drawn to Life: the fan-wiki 820k is replaced by the 5th Cell founder's "more than 1 million" in about five months.
  - Mario Paint: the "about 2.3M lifetime" estimate is removed; only the 1993 ">1M" is kept.
  - LEGO Worlds: the Steam (Boxleiter) estimate is removed.
  - Roblox: the Statista under-13 estimate is replaced by the Q4 2025 shareholder letter.
- **Dreams.** No sales figure exists. Media Molecule's own count of 150,000+ published creations is added.
- **Scratch.** The official statistics feed is still frozen at a July 2024 timestamp (checked 4 November 2026).
- **Osmo (round 2 had "conflicting reports").** Resolved: shut in 2024; operations ceased April 2025; IP sold for $825,000 to Play Osmo Inc., approved 21 November 2025; apps relaunched in 2026 by former staff (court-sale and press sources).
- **Tynker, Kano, Kodu, Hopscotch.** Status updated for 2025–26.
- **Strawbies.** An IDC 2015 design study was found. Its designers, Felix Hu and Ariel Zekelman, now run the relaunched Osmo.
- **MakeCode.** A platform-wide figure (100M+ students) has been added. There is still no Arcade-only figure.
- **LEGO SPIKE.** Confirmed that no global adoption figure is published.
- **Colour-vision deficiency.** "About 1 in 12 boys" is now sourced: 1 in 12 males and 1 in 200 females (NI Direct, AOP, Colour Blind Awareness).

**New research that changes the spec**
- **Youtopia's controlled studies (Wise, Antle et al.).** Giving each child a role, with their own set of stamp tools, produced more explanations to the partner and fewer but longer jointly resolved conflicts. A "pause and reflect" tool prompted explanations. *Spec change:* tile bags are split by role, and a "Pause and check" step is added (sections 7 and 9.3).
- **Single-device conflict (Xia, Yan and Borge, CSCL 2023, with Bloxels).** The one shared iPad became the place where power was negotiated, and some children were shut out. Strawbies showed the opposite pattern: up to five children stayed engaged around one iPad because "there were always pieces in front of them". *Spec change:* a rotating Reader / Tapper / Checker role; the mat, not the tablet, is where decisions are made (section 9.7).
- **Worked examples (Bofferding et al. 2022, Coding Awbie, n = 55).** Analysing worked examples improved young children's program accuracy. *Spec change:* the facilitator demonstrates one preset misread before groups build (section 9.1).
- **Facilitators modelling failure (Yan and Xia, CSCL 2025, Bloxels camp).** Facilitators who modelled "playfulness, vulnerability, and productive failure" helped. *Spec change:* added to the facilitator script.
- **Okabe–Ito Colour Universal Design palette.** It now supplies the actual hex values for the six colour families, plus the rule "clearly state colour names" (section 9.3).

---

## Contents

1. Executive summary
2. Bloxels in depth (updated)
3. Commercial "make → play → share" games (updated figures)
4. Coding and creation platforms for children (status table updated)
5. Tangible and physical-to-digital tools (Osmo, Strawbies, KIBO updated)
6. AI-literacy precedents: children and classifiers
7. Research: tangible vs screen, groups, design principles, museums (Youtopia and CSCL studies added)
8. Synthesis: success patterns and pitfalls
9. Spec: "Build-a-Habitat Grid" mode (revised)
10. Variant: "Write Your Own Card" with picture tiles (revised)
11. Recommendations
12. Still unverified

---

## 1. Executive summary

**Bloxels: what actually happened**
- **Why it worked.** A small physical grid plus a colour grammar in which each colour means one rule (https://bloxels.com/tutorials/8-block-types). Teachers used it as a vehicle for content: ocean floor, plant life cycles, fairy tales (https://www.literacyworldwide.org/blog/literacy-now/2019/05/21/literacy-design-and-collaboration-mapping-the-ocean-floor-with-bloxels , https://www.thetechieteacher.net/2017/07/bloxels-game-based-learning-at-its-best.html).
- **Why the retail line stalled.**
  - The Mattel partnership lasted about three years, and the licensed Star Wars edition was retired after two (https://markagne.com/bloxels-star-wars.html).
  - Pixel Press said the toy industry is "about what's in the next box" and chose schools instead (https://momschoiceawards.com/blog/interview-moms-choice-award-winner-rob-bennet/).
  - Camera capture was the most common complaint (https://www.techlearning.com/resources/bloxels-build-play-share-your-own-video-games).
- **Where it is now.**
  - Pixel Press is still active.
  - There is one app, sold by subscription, and the board is optional.
  - It reported about 25,000 US / approaching 45,000 global classrooms in 2020 [vendor] (https://hecmedia.org/posts/st-louis-based-bloxels-edu-offers-online-solution-for-video-game-creation-during-pandemic).
  - No sales figures have ever been published.

**Tangible vs screen: the evidence**
- **Tangible interfaces invite and support groups.** In the museum, the tangible version was more inviting and supported collaboration (Horn et al. 2009). With Osmo Coding, children had more ways to join in (Kim 2017). In Strawbies, five children stayed engaged around one iPad (Hu et al. 2015).
- **Interface is "only one of many factors".** KIBO beat ScratchJr on sequencing and debugging in one 28-child study, but the authors conclude that interface type is only one of many factors (Pugnali et al. 2017).
- **Benefits depend on the situation.** The field recommends hybrid designs (Horn, Crouser and Bers 2012; Marshall 2007).
- **Roles help.** Giving each child a role plus their own tools improves explanation-giving (Youtopia, 20 pairs of fifth-graders).
- **A single shared screen can shut children out** (Bloxels after-school study, 2023).

**Closest AI-literacy precedents** (unchanged; see section 6)
- *AI for Oceans*
- *AI Unplugged*
- *Quick, Draw!*
- Teachable Machine studies that recommend making confidence visible to children

**Deliverables**
- **Section 9:** a revised 8×8 Habitat Grid spec covering:
  - six lab colour grammars on a colour-vision-safe palette with icons and patterns
  - role-split tile bags
  - a deterministic classifier and confidence formula
  - three designed misreads per lab
  - a "Pause and check" step
  - an A4 mat
  - a tap-copy UI with rotating roles
- **Section 10:** the revised "Write Your Own Card" picture-tile variant.

---

## 2. Bloxels in depth

### 2.1 What it is

- **The kit.** A physical 13×13 board and 320 blocks, 40 in each of 8 colours. The board is photographed and becomes a platformer room, a character or art (https://www.slj.com/story/kids-create-video-games-with-bloxels-no-coding-required-slj-review).
- **Age.** Designed for "ages 8 and up" (same source). Teachers used it from kindergarten to grade 8 (https://www.the74million.org/article/make-a-video-game-instead-of-taking-a-test-thats-one-way-teachers-use-bloxels/).
- **No game-design scaffolding.** School Library Journal: "there is no formal instruction on what makes a good game"; "the learning curve for the Bloxels Builder app is a bit steep" (https://www.slj.com/story/kids-create-video-games-with-bloxels-no-coding-required-slj-review).
- **Colour grammar** (https://bloxels.com/tutorials/8-block-types):

| Colour | Meaning |
|---|---|
| Green | Terrain |
| Red | Hazard |
| Yellow | Collectible / key |
| White | Story / checkpoint / warp |
| Purple | Enemy |
| Orange | Action (throw/push) |
| Pink | Power-up |
| Blue | Liquid |

- **Capture technology.** The capture system relied on "reliable color classification for the 8 different block colors". Mattel's Star Wars board was a "branded and more refined version" built for AR tracking (https://markagne.com/bloxels-star-wars.html).

### 2.2 History (verified)

- **2015.** Kickstarter raised $68k against a $40k goal (https://www.prnewswire.co.uk/news-releases/bloxels-the-video-game-you-can-build-launches-on-kickstarter-504241201.html). Named Best of Toy Fair 2015 (https://www.gamesandlearning.org/?p=3028).
- **2016.** Mattel took over "manufacturing, marketing and distribution logistics". Pixel Press kept "every aspect of the Bloxels software experience" (https://www.bloxelsbuilder.com/blog-list/bloxels-looking-to-the-future).
- **2017.** Finalist for TIA Toy of the Year in the Game category (https://prnewswire.com/news-releases/2017-toy-of-the-year-toty-award-finalists-unveiled-by-toy-industry-association-300366551.html).
- **January 2018 – January 2020.** Star Wars Bloxels was released, never updated, then "unreleased". The developer's account: "At the height of our 3-year partnership with Mattel … The nebulous nature of the same forces allowing this project to exist ultimately led to its early retirement" (https://markagne.com/bloxels-star-wars.html).
- **July 2018.** Bloxels EDU launched: "What started as a few innovative teachers picking up Bloxels … has now become the core of our company" (http://www.projectpixelpress.com/blog-list/2018/7/12/introducing-bloxels-edu).
- **June 2019.** "Bloxels EDU 2.0". The consumer and education apps were combined "into a single app experience", with browser and Chromebook access. The company was then in "more than 3,000 schools across the United States" [vendor] (https://siliconprairienews.com/2019/06/st-louis-based-pixel-press-launching-bloxels-edu-2-0-and-new-client-services-division-in-the-cortex-innovation-district/).
- **2020 (pandemic).** A digital board was added because physical kits were hard to get to remote learners. The company reported "about 25,000 classrooms in the U.S." and "approaching 45,000 classrooms globally" [vendor] (https://hecmedia.org/posts/st-louis-based-bloxels-edu-offers-online-solution-for-video-game-creation-during-pandemic).
- **2024.** Third-party Teq classroom packs were discontinued (https://www.cdw.com/product/teq-bloxels-classroom-5-pack/5572486). The Mattel-era retail kit is listed as "discontinued by manufacturer" (https://www.walmart.com/ip/Bloxels-Game/52160689).
- **2025–26.** Current offer:
  - One app, on Chromebook, iOS, Android, Kindle and web.
  - "Optional Bloxels board and blocks".
  - A subscription is required to use the app.
  - EDU plans add student logins, private class collaboration and teacher review.
  - Sources: https://www.bloxels.com/education , https://www.bloxels.com/education/bloxels-edu-faq
  - A personal physical kit is still sold on the official store (https://store.bloxelsbuilder.com/products/bloxels-personal-edition).

### 2.3 Why the consumer line stalled: what the sources support

1. **A licensed, time-limited retail partnership.** It ran about three years, and the licensed edition was retired early (https://markagne.com/bloxels-star-wars.html). Pixel Press's own explanation: "Part of the toy industry is, by its own nature, about what's in the next box … But when we saw what schools and educators were doing with the core Bloxels sets, we realized that we wanted to focus on that instead" (Rob Bennet, https://momschoiceawards.com/blog/interview-moms-choice-award-winner-rob-bennet/).
2. **Unreliable camera capture.**
   - Common Sense: camera recording "might not work" (https://www.commonsense.org/education/reviews/bloxels-edu).
   - Tech & Learning: capture "super finicky"; games "too similar" (https://www.techlearning.com/resources/bloxels-build-play-share-your-own-video-games).
3. **A steep app after the "magic" moment.** SLJ (above). One parent review gave the board 4.9/5 but the app 3.5/5 (https://www.mamasmiles.com/?p=14275).
4. **The physical board became optional.** By 2019–20 the product had moved to software-first: one app, a digital board and Chromebooks (sources in 2.2). In other words, the company itself decided the physical board was not essential. Teachers kept using it as a planning tool, alongside grid paper (https://cwmglas-primary-school.j2bloggy.com/Mr-J-Primary-School-Tech/using-bloxels-in-the-classroom/).

**What is still missing.** There are no units-sold, revenue or retention figures, and no formal post-mortem. A third-party company profile's "$3M annual revenue" is a profile-site estimate and is not used here.

### 2.4 Classroom and library evidence (new in round 3)

**Peer-reviewed or academic studies that used Bloxels**

| Study | Setting and sample | Finding | Relevance to DeltaOps |
|---|---|---|---|
| Xia, Yan and Borge, "Emotion Expressions as Negotiations of Critical Technology Tool Use…", CSCL 2023 (https://repository.isls.org/bitstream/1/9214/1/CSCL2023_281-284.pdf) | US elementary after-school club; 3 groups of 4th–5th graders (9 children named); about 75-minute sessions; grid paper or kit, then scanning on the iPad | The iPad was "a center locale where power relations were established". Both negative and positive emotional climates could shut a child out. In one group a child had to "kneel or stand in between" two friends to see the screen. The group that worked well passed the iPad "from one hand to another very smoothly and quickly" | Design the turn-taking around the one device (section 9.7) |
| Xia, Keith, Yan and Borge, Penn State (https://pure.psu.edu/en/publications/an-exploration-on-the-individualistic-and-collective-moves-in-rel/) | One group of three girls; one 75-minute Bloxels session | Mixes of individual and collective moves shape whether participation is fair | Same as above |
| Yan and Xia, "Learning from Failure Through Game Testing Feedback…", CSCL 2025 (https://doi.org/10.22318/cscl2025.256454) | Two-week virtual Bloxels design camp; 9 youths aged 8–13 in 3 groups | Six feedback styles identified. Facilitators helped by "modeling playfulness, vulnerability, and productive failure" | The facilitator's tone when the AI fails (section 9.9) |
| COMMIC project, described in a 2023 *Education Sciences* review (https://doi.org/10.3390/educsci13101019) | Children aged 8–12 and adults over 65 co-designed a game with Bloxels Builder | The review reports gains in knowledge, values and collaboration; no child sample size in the passage found | Intergenerational or family sessions are plausible |

**Practitioner and design reports (not outcome studies)**
- **Ocean floor, fifth grade.** Groups researched one landform each, drew on a paper "Bloxels design sheet", then transferred it to the app. The children chose research-based enemies (https://www.literacyworldwide.org/blog/literacy-now/2019/05/21/literacy-design-and-collaboration-mapping-the-ocean-floor-with-bloxels).
- **Second-grade plant life cycle.** Weather elements were mapped to enemy types (https://www.thetechieteacher.net/2017/07/bloxels-game-based-learning-at-its-best.html).
- **Welsh KS2 class.** Groups of 5–6 each built one linked room. They used paper and DIY boards "as I was new to the app I had not purchased any official boards" (https://cwmglas-primary-school.j2bloggy.com/Mr-J-Primary-School-Tech/using-bloxels-in-the-classroom/).
- **German library Media.Lab, ages 12–16.** "Two hours are enough to understand the principle of the tool and produce first results" (translated) (https://www.b-i-t-online.de/heft/2021-06-fachbeitrag-schmidt.pdf).
- **AECT 2024 lesson-design competition.** Lessons were designed but not evaluated; the authors state it "was not peer-reviewed" (https://doi.org/10.13001/jtilt.v3i2.9121 , https://doi.org/10.13001/jtilt.v3i2.9147).
- **Assessment by game.** Teachers used games "instead of a traditional paper-and-pencil test" (https://www.the74million.org/article/make-a-video-game-instead-of-taking-a-test-thats-one-way-teachers-use-bloxels/).

**Wider evidence on game-making**
- Hung, Yang and Tsai (2020) reviewed 30 SSCI studies (2010–2020; 2,366 participants). They found "considerable variation" in how game-making is implemented, but its "feasibility … is confirmed across the reviewed studies". They highlight content-based game design for interdisciplinary learning (http://index.j-ets.net/Published/23_1/ETS_23_1_04.pdf).

**Lessons for DeltaOps**
1. Teachers repeatedly fell back on paper grids and DIY boards. The physical layer works without the scanning technology.
2. The single device is where problems happen, so design the roles around it.
3. Content briefs (ocean, plants, story) are where Bloxels worked best, which is exactly DeltaOps' situation.

---

## 3. Commercial "make → play → share" games (figures updated)

| Product | Verified figure | Source | Lesson |
|---|---|---|---|
| **Super Mario Maker (Wii U, 2015)** | 4.02M units life-to-date [official, at 31 March 2026]. Over 6.2M courses, played over 400M times, by 27 January 2016 [official] | https://www.nintendo.co.jp/ir/en/finance/software/wiiu.html , https://www.nintendo.co.jp/ir/en/events/160203/02.html | Familiar grammar + one-button playtest. Cloud-only courses were lost when Wii U online services ended on 8 April 2024 (https://en-americas-support.nintendo.com/app/answers/detail/a_id/53854) |
| **Super Mario Maker 2 (2019)** | 2M+ courses in under 2 weeks; 10M+ after about 6 months [press] | https://shacknews.com/article/112798/super-mario-maker-2-two-million-courses-uploaded , https://www.kitguru.net/tech-news/mustafa-mahmoud/super-mario-maker-2-reaches-new-milestone-with-over-10-million-courses-created/ | Story mode models good levels |
| **Nintendo Labo (2018)** | Variety Kit 1.42M at 31 December 2020 (CESA White Book 2021). No all-kit total published | https://www.perfectly-nintendo.com/cesa-white-book-2021-additional-shipment-data-for-nintendo-games/ | Novelty decay. Nintendo said it "isn't selling gangbusters" (https://gamerant.com/nintendo-labo-disappearance-failure-history/) |
| **Labo Toy-Con Garage** | Reviewers called it "tucked away" (Expert Reviews). "Only the most dedicated and imaginative of Labo users … will get to this point" (TechRadar). "One of the most mentally draining experiences of my life" (The Verge) | https://www.expertreviews.co.uk/technology/gaming/nintendo-labo-review , https://www.techradar.com/reviews/nintendo-labo , https://www.theverge.com/2018/4/19/17253688/nintendo-switch-labo-cardboard-toy-con-garage | **A hidden creation mode goes unused.** Put Build mode in the main flow |
| **Game Builder Garage (2021)** | 1.15M at 31 December 2022; nothing later found | https://en.wikipedia.org/wiki/Game_Builder_Garage , https://www.vgchartz.com/game/229467/game-builder-garage/sales | Reviewers called the guided lessons "heavily prescribed" (https://www.shacknews.com/article/125217/game-builder-garage-review-build-your-own-adventure). Nintendo positions it as something to "spark interest in game development" (https://www.nintendo.co.jp/ir/pdf/2023/qa2306e.pdf) |
| **LittleBigPlanet (2008– )** | 1M levels by July 2009 [vendor] | https://blog.eu.playstation.com/2009/07/22/littlebigplanet-community-reaches-one-million-creations/ | PS4 servers closed permanently in 2024 (https://videogameschronicle.com/news/sony-confirms-littlebigplanet-3-shutdown-months-after-it-was-temporarily-taken-offline) |
| **Dreams (2020)** | No sales figure. Media Molecule: "more than 150,000 Dreams have been published … more than 5,000 new creations are published" each week (March 2022) [vendor via press]. A third-party tracker showed 1.87M registered users [third-party est.] | https://gamingbolt.com/dreams-has-over-150000-dreams-5000-new-creations-published-each-week | Live support ended on 1 September 2023 (https://www.videogameschronicle.com/news/media-molecule-is-ending-support-for-dreams-in-september/). Huge ceiling, steep floor |
| **Spore Creature Creator (2008)** | 100M creations within a year [vendor] | https://www.ea.com/news/100-million-creatures-take-over-spore-universe | Parts snap to a spine; "it walks!" rewards any design |
| **Drawn to Life (DS, 2007)** | "Within about five months, Drawn to Life had sold more than 1 million units" [press, founder interview] | https://gamesbeat.com/scribblenauts-game-developer-makes-a-risky-bet-on-being-original/ | "Your drawing becomes the hero" |
| **Mario Paint (1992)** | Over 1M "Mario Paint and Mouse" sold in its first year [press, Nintendo-reported] | https://www.upi.com/Archives/1993/05/21/Nintendo-earnings-up-2-percent/5012737956800/ | Its music composer is a time × pitch grid, the precedent for Beat Lab |
| **Townscaper (2020)** | About 100k early-access copies in about 2 weeks [vendor via press] | https://mcvuk.com/business-news/when-we-made-townscaper | Any placement looks good, which removes blank-canvas fear |
| **Toca Boca** | 100M downloads by 2015 [vendor] | https://tocaboca.com/press-post/toca-boca-celebrates-100-million-downloads/ | No losing; short open sessions |
| **LEGO Worlds (2017)** | No official figure; the round-2 Steam estimate was removed | https://www.lego.com/en-us/aboutus/news/2019/november/lego-worlds | (none) |

---

## 4. Coding and creation platforms for children (status at November 2026)

| Tool | Scale / status (marked) | Lesson for DeltaOps |
|---|---|---|
| **Scratch** | 164,307,034 projects and 135,078,559 users. The official feed's timestamp is still July 2024, so it has not updated since [official] (https://scratch.mit.edu/statistics/data/daily/) | "Wide walls" raise engagement (https://blog.communitydata.science/testing-the-wide-walls-design-principle-in-the-wild/) |
| **Roblox (Studio)** | 144M daily active users in Q4 2025. Of the 45% of daily users who had age-checked by 31 January 2026, 35% were under 13 [official] (https://s27.q4cdn.com/984876518/files/doc_financials/2025/q4/Q4-2025-Shareholder-Letter.pdf). No absolute under-13 count is reported | A professional tool with no low floor for under-10s |
| **Kodu Game Lab** | Open source since 2020 and maintained by an original developer (Stephen Coy) outside Microsoft. Still downloadable for Windows (http://www.kodugamelab.com/2020/11/12/kodu-has-moved.html , http://www.kodugamelab.com/downloads/) | "When–do" tiles are a picture grammar; the tool survived its parent moving on |
| **MakeCode (incl. Arcade)** | "Over 100 million students have used … MakeCode since it launched"; 156+ countries [vendor, September 2026] (https://makecode.com/blog/10th-anniversary). No Arcade-only figure; Arcade shares games by "anonymous URL" (https://makecode.com/blog/arcade/01-18-2019) | Anonymous sharing fits a no-accounts model |
| **micro:bit** | 10M devices [vendor] (https://microbit.org/news/2024-12-09/celebrating-10-million-microbits-around-the-world/) | (none) |
| **Minecraft Education** | Build challenges; see report 10 (https://education.minecraft.net/en-us) | Real-world briefs |
| **Hopscotch** | "Proudly independent … We're still here" (https://www.gethopscotch.com/about). Its forum closed on 21 May 2025 and the community moved to Discord (https://forum.gethopscotch.com/t/important-transitioning-from-the-hopscotch-forum-to-discord/68021) | Moderating a community is a permanent cost |
| **Tynker** | Sold out of Byju's US bankruptcy to CodeHS, for $2.2M in cash, closed 30 May 2025; bought by Byju's for a reported $200M in 2021 (https://marketbrief.edweek.org/strategy-operations/coding-provider-tynker-sold-for-2-1m-as-byjus-bankruptcy-plays-out/2025/06). Continues under its own name (https://www.tynker.com/blog/codehs-acquires-tynker-to-expand-k-8-computer-science-learning-opportunities/) | Parent-company risk, now realised |
| **Kano** | Spun out Kano World in January 2023 (https://techcrunch.com/2023/01/12/as-it-pivots-away-from-diy-computer-kits-kano-spins-out-its-creative-software-suite-as-a-standalone-business/). Kano Computing Ltd was in administration from 2024; "Administration ended: 3 July 2026", moving to dissolution (https://find-and-update.company-information.service.gov.uk/company/08375450/insolvency) | Hardware plus licences is fragile |
| **Bitsy** | Small community; a 4-H leader picked it for 5th graders (https://itch.io/t/3354097/bitsy-for-after-school-programs) | A printed command sheet beat long tutorials |
| **Code.org AI for Oceans** | See section 6 | (none) |

---

## 5. Tangible and physical-to-digital tools

**Osmo (Tangible Play → Play Osmo Inc.)**
- **How it works.** A mirror over the iPad camera reads tiles on the table (https://en.wikipedia.org/wiki/Osmo_(game_system)).
- **Bought by Byju's.** Acquired for $120M in January 2019 (https://techcrunch.com/2019/01/16/byjus-buys-osmo-for-120m/amp/).
- **Lenders' bankruptcy petition.** Lenders filed involuntary Chapter 11 petitions on 4 June 2024 against Osmo, Tynker and Epic! (https://elevenflo.com/blog/epic-creations-trustee-run-chapter-11-asset-sales).
- **Shutdown.** The trustee "ceased operations in April 2025". The IP was sold to Play Osmo Inc. for $825,000, approved on 21 November 2025 (same source; also https://www.theverge.com/column/889879/osmo-is-trying-to-crack-ar-edutainment-again).
- **Why it failed, according to its banker.** "Falling post-pandemic demand" and "declining sales and performance issues" (https://www.schgroup.com/press-release/sch-capital-advises-tangible-play-inc-d-b-a-osmo-on-the-sale-of-its-assets-to-play-osmo-inc/).
- **Relaunch.** Since 2026, former staff have been restoring the apps. "A few games can't come back" because of lost licences (https://www.playosmo.com/pages/is-osmo-still-in-business).
- **Lesson.** The new team explicitly rejects "VC growth standards" and "addictive garbage" (The Verge, above). That matches DeltaOps' no-engagement-loop stance.

**Strawbies (Hu, Zekelman, Horn and Judd, IDC 2015)** (https://tidal.northwestern.edu/media/files/pubs/hu-idc-2015.pdf)
- **What it is.** Wooden programming tiles read through Osmo's mirror using the TopCodes vision library, for ages 5–10. It was the origin of Osmo's Coding Awbie.
- **Design principles.** Eight, including "Inviting", "Simple+Complex" and "Social".
- **What playtests showed.**
  - "Most play testers wanted to play more when told that their time was up."
  - "Groups of up to five students eventually came to form around the iPad … none of the children seemed disengaged. There were always pieces in front of them that they could play with."
- **Lesson.** Children stay involved when **everyone holds a piece**. Contrast this with the Bloxels study, where one child held the iPad.

**Coding Awbie: worked examples (Bofferding et al. 2022)** (https://doi.org/10.1145/3507951.3519284)
- **Setup.** 28 first graders and 27 third graders, six 20-minute sessions with the tangible Coding Awbie game.
- **Findings.** Children who analysed worked examples early "wrote significantly more accurate programs" by the midpoint. "Analyzing worked examples proved to be a powerful support."
- **Lesson.** Show a worked misread before children build.

**KIBO vs ScratchJr (Pugnali, Sullivan and Bers 2017)** (https://www.jite.org/documents/Vol16/JITEv16IIPp171-193Pugnali3284.pdf)
- **Sample.** N = 28, ages 4–7, summer-camp setting.
- **Scores.** The KIBO group scored higher on all four tasks. The difference was significant only for:
  - Sequencing: 96.15 vs 71.43, p = .026
  - Debugging: 76.92 vs 35.71, p = .032
- **No difference** on repeat loops, conditionals or positive-behaviour checklists.
- **Caveats from the authors.**
  - The tests used paper cutouts, which "may have given students using the tangible technology (KIBO) an advantage".
  - Interface "is only one of many factors".
- **Observation relevant to DeltaOps.** With the tangible kit, "counselors … [could] easily see who was on or off task". With the iPad that "was much more difficult".

**KIBO in Spanish preschools (Bers, González-González and Armas-Torres 2019)** (https://doi.org/10.1016/j.compedu.2019.04.013)
- N = 172 children aged 3–5 in three centres, 16 classes.
- Coding is possible from age 3.
- The approach "promoted communication, collaboration and creativity".

**Cubetto, Merge Cube, LEGO SPIKE**
- **Cubetto and Merge Cube.** Round-2 claims unchanged, with sources: https://www.crowdfundinsider.com/2016/04/83968-crowdcube-fundedclub-member-primotoys-finishes-kickstarter-round-scores-1-5m-for-coding-toy-cubetto/ , https://www.tpr.org/post/san-antonio-company-uses-new-technology-educate-world
- **LEGO SPIKE.** LEGO Education publishes district case studies, for example one projecting access for 15,000 students in Loudoun County, but **no global SPIKE adoption figure** (https://education.lego.com/es-es/mini-case-studies/).

**Pattern across tangible products**
- Camera capture worked when vocabularies were tiny and the tokens were purpose-made: Osmo with TopCodes, KIBO's barcodes.
- Bloxels' free 169-cell colour grid was the hardest case.
- The physical part is what draws the group in. The camera is optional, as Bloxels itself concluded by 2019–20.

---

## 6. AI-literacy precedents: children and classifiers

Unchanged from round 2; all items already had primary URLs.
- **AI for Oceans.** Label, train, then watch the model misclassify; built-in bias lesson (https://codeorg.medium.com/ai-for-oceans-a-csforgood-activity-14ef6ebd8178 , https://www.github.com/code-dot-org/ml-activities).
- **AI Unplugged.** Decision-tree classification with cards. "Classification models are not perfect". Children aged 6–9 needed adult help to read the cards (https://computingeducation.de/aiunplugged-en.pdf).
- **Quick, Draw!** Visibly and funnily wrong guesses from drawing variation (https://research.google/blog/introducing-the-kaggle-quick-draw-doodle-recognition-challenge/).
- **Exploring Machine Teaching with Children (VL/HCC 2021).** 14 children aged 7–13; recommends showing confidence scores (https://conf.researchr.org/details/vlhcc-2021/vlhcc-2021-vl-hcc-main-conference/9/Exploring-Machine-Teaching-with-Children).
- **Breakable Machine (2025).** Breaking the classifier is the activity itself (https://arxiv.org/html/2508.14201v1).

**Caveat (from reports 02 and 09, and `context.md`).** Children tend to read high "% sure" as correctness. The Habitat Grid therefore always pairs a confident guess with a visible consequence, and includes at least one confident-but-wrong case per lab (section 9.6).

---

## 7. Research: tangible vs screen, groups, design principles, museums

**Kept from round 2, all with primary URLs**
- **Papert, constructionism.** Children learn by building "objects to think with" (https://news.mit.edu/2016/seymour-papert-pioneer-of-constructionist-learning-dies-0801).
- **Resnick, low floors, high ceilings, wide walls.** (https://scratchfoundation.org/learn/learning-library/scratch-creative-learning-philosophy). Hill and Shaw found causal evidence for wide walls (https://blog.communitydata.science/testing-the-wide-walls-design-principle-in-the-wild/).
- **Horn et al., CHI 2009: Tern at the Boston Museum of Science.** The tangible version was more inviting, especially for children and girls, and supported more collaboration, with equal time spent (https://users.wpi.edu/~esolovey/Research/Entries/2009/4/9_Graphical_and_Tangible_Programming.html).
- **Horn, Crouser and Bers 2012.** "The case for a hybrid approach" (https://sites.bc.edu/devtech/wp-content/uploads/sites/181/2023/10/TangibleInteraction_bers2012.pdf).
- **Marshall, TEI 2007.** Benefits of tangible interfaces under-evidenced (https://oro.open.ac.uk/19538).
- **Kim, CSCL 2017: Osmo Coding.** Multiple access points; children leaned towards each other (https://tidal.northwestern.edu/media/files/pubs/kim-osmo-cscl-2017.pdf).
- **García-Sanjuan et al. 2018.** A tangible quiz reached group consensus faster (https://riunet.upv.es/handle/10251/121367).
- **Exploratorium Tinkering Studio.** Facilitation frameworks (https://www.informalscience.org/learning-and-facilitation-frameworks).
- **Nina Simon.** Privacy is the biggest barrier to participation in children's museums (https://www.aam-us.org/wp-content/uploads/2024/04/9EXHSpring10_VisitorParticipation_Simon.pdf).

**New: Youtopia's controlled studies, the closest precedent to a habitat grid**
- **Setup.** 20 pairs of fifth-graders built "a world they would want to live in" on a tangible land-use tabletop. Half the pairs had assigned roles (human development vs natural resources), **each with its own set of land-use stamps**.
- **Findings.**
  - Role pairs "gave more in-depth explanations to their partners … but did not negotiate … more frequently". They had "fewer but longer instances of jointly resolved conflict".
  - All pairs worked together, not in parallel.
  - The overall effect was "somewhat limited, but consistent".
  - In-depth sustainability talk was only about 5% of session time.
  - Sources: https://antle.iat.sfu.ca/wp-content/uploads/2018/02/WiseAntle_2015CSCL_YouTopiaForCSCL-ProcessMeasuresOnly-Post-Review.FINALdocx.pdf ; journal version, https://doi.org/10.1093/iwc/iwab026
- **The pause tool.** "Pause and reflect" tools were important "for provoking explanations and resolving conflict" (https://doi.org/10.1093/iwc/iwab026). The "Impact Tool", which gave feedback while play was paused, prompted collectivist "we" explanations. Role pairs spoke "from the perspective of the inhabitants of the fictional world" (https://repository.isls.org/bitstream/1/267/1/63.pdf).
- **Emergent Dialogue model.** Youtopia was designed to draw out values-based discussion rather than only facts (https://dl.acm.org/doi/10.1145/2593968.2593971).
- **For DeltaOps:**
  - Split tile bags by role.
  - Add a pause step where the world shows its effects before the AI judges.
  - Expect deep talk to be brief, and let the facilitator card carry it.

**New: shared-device research (section 2.4).** Xia, Yan and Borge (2023) found that the single iPad concentrates power. Strawbies (2015) found that pieces in front of every child keep them all involved. Pugnali et al. (2017) found that tangible work is easier for adults to monitor.

**Overall read**
- Physical materials for shared thinking and turn-taking.
- The screen for feedback.
- Roles that give each child a piece of the decision.
- No recognition technology.

---

## 8. Synthesis: success patterns and pitfalls

### Patterns that work

1. **A small fixed grammar, with meaning carried by colour, icon and pattern.** Bloxels, KIBO, Kodu.
2. **An instant consequence.** Mario Maker's playtest, Townscaper, Spore.
3. **Ownership.** Drawn to Life, Spore, Bloxels.
4. **A purposeful content brief.** Bloxels ocean and plant lessons; Minecraft challenges.
5. **Wide walls within a narrow brief.** Scratch.
6. **Pieces in every child's hands, and roles with their own tools.** Strawbies, Youtopia.
7. **A pause before judgement.** Youtopia's Impact tool.
8. **Worked examples before free building.** Coding Awbie.
9. **Visible confidence, with errors as content.** AI for Oceans, VL/HCC 2021.
10. **Facilitators who model productive failure.** Yan and Xia 2025.

### Pitfalls

1. **Blank canvas.** Dreams, Roblox.
2. **Hidden or over-hard creation modes.** Labo's Garage.
3. **Over-scripted tutorials.** Game Builder Garage.
4. **Fragile capture.** Bloxels.
5. **One device that one child controls.** Bloxels CSCL 2023.
6. **Same-y outputs.** Bloxels.
7. **Cloud dependency.** Mario Maker (Wii U), LittleBigPlanet, Dreams.
8. **Parent-company collapse.** Osmo and Tynker under Byju's; Kano.
9. **Reading load for under-9s.** AI Unplugged.
10. **Colour-only coding.** About 1 in 12 males and 1 in 200 females have a colour-vision deficiency (https://www.nidirect.gov.uk/conditions/colour-vision-deficiency-colour-blindness , https://www.aop.org.uk/advice-and-support/for-patients/eye-conditions/colour-vision-deficiencies). About 40% of colour-blind pupils leave school unaware of it (https://www.colourblindawareness.org/colour-blindness/). Bloxels' eight colour grammar relies on colour alone.

---

## 9. Spec: "Build-a-Habitat Grid" mode (revised)

### 9.1 Placement in the DeltaOps format

**Option A (recommended): stage 1 of a lab.**
1. Children design the starting island on the grid.
2. The AI classifies it.
3. Stages 2–6 run the normal three-card choices on *their* island.
4. The artefact is the grid plus the AI's verdicts.

This keeps the 6 × 3 card engine and adds ownership. It also avoids the Labo Garage problem: Build mode sits in the main flow, not behind a menu.

**Option B: a standalone 30–35-minute "Build mode"** for drop-in museum or family sessions.

| Step | Minutes | Change from round 2 |
|---|---|---|
| Brief + **worked misread demo** (facilitator loads one preset misread and asks "What did the AI miss?") | 4 | New: worked example first (Bofferding et al. 2022) |
| Mat build in groups of 2–4, **each child holding their own role bag** | 7 | New: roles (Youtopia) |
| **Pause and check**: on the mat, the group predicts the label and % sure and ticks what they think matters most | 2 | New: reflective pause (Youtopia) |
| Tap-copy with rotating Reader / Tapper / Checker | 3 | New: rotation (CSCL 2023) |
| AI guess + world consequence | 1 | (unchanged) |
| Discussion (facilitator card) | 4 | (unchanged) |
| Change exactly 3 tiles and re-run (×2), **roles rotate each run** | 8 | Rotation added |
| Print artefact | 3 | (unchanged) |

### 9.2 The grid

- **8×8 (64 cells) for ages 9+.** A **6×6 junior mat** (36 cells, outer ring shaded out) for ages 7–8.
- **Why this size.** Bloxels' 13×13 grid (169 cells; https://www.slj.com/story/kids-create-video-games-with-bloxels-no-coding-required-slj-review) is too slow to build and copy in a short session. 8×8 maps cleanly to the voxel island and to Beat Lab's 8 steps.
- **Default state.** Every cell starts as the lab's base. Children place only the 6 active colours.
- **Pilot assumption:** about 15–30 placed tiles per design and under 3 minutes to copy. These are design targets, not findings. Measure them in the pilot.
- **Coordinates.**
  - Columns A–H, rows 1–8, printed on both mat and screen.
  - Corner icons fix orientation: sun = north, entrance = south.

### 9.3 Physical materials

**Mat**
- A4 landscape, laminated or 300 gsm card.
- Grid: 8 × 22 mm = 176 mm square, plus an 8 mm coordinate gutter.
- Right panel, about 90 mm wide:
  - Mission box: lab icon, one-line goal, and the line "The AI will guess what you built".
  - **Legend:** 6 rows, each swatch + icon + pattern + **printed colour name** + three-word meaning. Okabe–Ito principle 3 is "Clearly state color names" (https://jfly.uni-koeln.de/color/).
  - Base swatch.
  - **"Pause and check" box:** "We think the AI will say ____ and be ☐ very sure ☐ a bit sure ☐ not sure", plus "The most important tile is at __".
  - "Change 3 tiles" box with three tick circles.
  - Group name line (no surnames).

**Tiles**
1. Reusable 20 mm printed card squares (preferred).
2. 19 mm dot stickers on a dry-wipe mat (single-use).
3. Dry-wipe markers.

**Role bags (new)**
- Split each lab's six colours into **three role bags of two colours each**, stored in labelled pouches. Each child holds one bag and is the only one who places those tiles (Youtopia positive interdependence: https://doi.org/10.1093/iwc/iwab026).
- **Pairs:** each child holds 3 colours.
- **Groups of 4:** the fourth child is the **Checker**, who holds the legend card and the "Pause and check" pencil.
- Suggested roles across labs:
  - **Nature keeper:** green + blue
  - **Builder:** grey + yellow
  - **Special agent:** purple + red

**Colour-vision-safe palette (new; Okabe–Ito Colour Universal Design)**

Source: https://jfly.uni-koeln.de/color/ ; hex values from https://siegal.bio.nyu.edu/color-palette/

| Family | Print/screen colour | Hex | Pattern | Why |
|---|---|---|---|---|
| Green (living) | Bluish green | #009E73 | Dots | CUD uses bluish green "so that it won't be confused with red or brown" |
| Blue (water/flow) | Blue | #0072B2 | Wavy lines | Distinct from sky blue by brightness |
| Grey (built/people) | Mid grey | #8C8C8C (not in Okabe–Ito; chosen for value contrast) | Bricks | Neutral |
| Yellow (energy/reward) | Yellow | #F0E442 | Rays/star | Lightest value |
| Red (danger/heat/loud) | Vermilion | #D55E00 | Diagonal hatch | "For red, vermilion is used since it is recognizable also to protanopes" |
| Purple (special) | Reddish purple | #CC79A7 | Cross-hatch | "Violet is close to blue … reddish purple is chosen" |

- **Every tile carries colour + white icon + pattern.** CUD principle 2: "use not only different colors but also … shapes … patterns" (https://jfly.uni-koeln.de/color/).
- The voxel island keeps its own palette (`context.md`); only the grid and its tiles use the CUD set.
- **Check before printing:** print a test sheet and run it through a colour-vision simulator.

### 9.4 Colour grammars per lab

Cross-lab families are constant (green = living, blue = water/flow, grey = built/people, yellow = energy/light/reward, red = danger/heat/loud, purple = the lab's special item). The tables are unchanged from round 2 except for the new **Role** column.

**Eco Town (energy).** Base: lawn. Brief: "Keep the lights on after dark."

| Colour | Tile | Meaning | Role |
|---|---|---|---|
| Yellow | Solar panel | Power in daylight | Builder |
| Blue | Wind turbine | Power when windy | Nature keeper |
| Purple | Battery | Stores power for night | Special agent |
| Grey | Houses | Use power | Builder |
| Green | Trees/park | Shade, wildlife, cooling | Nature keeper |
| Red | Power-hungry factory | Uses lots of power | Special agent |

**River Town (water).** Base: grass. Brief: "A river town that stays dry in a storm and keeps its wildlife."

| Colour | Tile | Meaning | Role |
|---|---|---|---|
| Blue | River | Flows downhill | Nature keeper |
| Green | Reeds / wet meadow | Soaks up floods; habitat | Nature keeper |
| Grey | Houses/road | Hard surfaces | Builder |
| Yellow | Flood wall | Blocks water | Builder |
| Purple | Rain garden/pond | Stores rainwater | Special agent |
| Red | Pollution pipe | Dirties water | Special agent |

**Grow Lab (food).** Base: bare soil. Brief: "A garden that feeds the class all year."

| Colour | Tile | Meaning | Role |
|---|---|---|---|
| Green | Crops | Food | Nature keeper |
| Blue | Water butt | Water | Nature keeper |
| Yellow | Sunny bed / greenhouse | Light and warmth | Builder |
| Grey | Path/shed | Access | Builder |
| Purple | Pollinator flowers | Bees visit | Special agent |
| Red | Pests | Eat crops | Special agent |

**Moon Base (space).** Base: regolith. Brief: "A base where four astronauts can live for a month."

| Colour | Tile | Meaning | Role |
|---|---|---|---|
| Grey | Habitat module | People live here | Builder |
| Yellow | Solar array | Power (sunlit only) | Builder |
| Blue | Ice mine | Water and oxygen | Nature keeper |
| Green | Greenhouse | Food | Nature keeper |
| Purple | Rover garage/lab | Exploration | Special agent |
| Red | Crater/radiation | Danger | Special agent |

**Kick Lab (sport).** Base: pitch. Brief: "Set up your team so it can defend and score."

| Colour | Tile | Meaning | Role |
|---|---|---|---|
| Blue | Our players | Our team | Nature keeper → "Our coach" |
| Green | Open space | Room to run | Nature keeper → "Our coach" |
| Grey | Goal/posts | Target | Builder |
| Yellow | Ball | Where play is | Builder |
| Red | Other team | Opponents | Special agent → "Their coach" |
| Purple | Coach's arrow | Direction to move | Special agent → "Their coach" |

In Kick Lab the roles are renamed "Our coach", "Pitch manager" and "Their coach". Note that "their coach" holds the purple arrows, so the opposing side gets to set direction too. That builds in a Youtopia-style conflict of interests.

**Beat Lab (music).** Base: silence. Columns 1–8 are beats; row bands are instruments (the Mario Paint composer precedent, https://www.upi.com/Archives/1993/05/21/Nintendo-earnings-up-2-percent/5012737956800/).

| Colour | Tile | Meaning | Role |
|---|---|---|---|
| Red | Kick drum | Low thump | Drummer |
| Yellow | Snare/clap | Sharp hit | Drummer |
| Blue | Bass note | Low tune | Tune-maker |
| Green | Melody (row = pitch) | Tune | Tune-maker |
| Purple | Shaker | Texture | Producer |
| Grey | Hold/long note | Sustain | Producer |

### 9.5 The scripted classifier (unchanged logic, clarified)

**Determinism.** A deterministic function maps grid → label + % sure + "why" cells + world change + facilitator card. There is no live model. The same grid always gives the same answer.

**Features computed**
- `count[c]` and `share[c]`
- `largestCluster[c]` (4-connected)
- `touches(a,b)`
- `edge[c]` (outer ring) and `centre[c]` (inner 4×4)
- `rowsWith[c]`, `colsWith[c]`
- `path(a→b)`
- `side(c)` (centre of mass: north or south half)
- Beat Lab only: `onBeats[c]`, `density[col]`, `rowSpread`

**Labels.** 4–6 per lab, each scored as a weighted sum of features.

**Confidence formula**
- `sure = clamp(50 + 45 × (top − second) / (top + second + 0.01), 51, 97)`
- Never show 100%. Below 60%, the helper says "not sure".

**Scripted blind spots**
- **Majority rule:** reads the biggest colour as the whole story.
- **Ignores time or order:** for example night, or the sequence of beats.
- **Edge blindness:** the outer ring is down-weighted to 0.5.
- **Training-data bias:** "trained on Earth / parks / pop songs".
- **Spurious colour-meaning:** for example "lots of blue = sad".

**New rule: at least one high-confidence misread per lab** (≥ 80% sure and wrong). This directly works against children reading "% sure" as correctness (reports 02 and 09).

**"Why" overlay.** The cells that contributed most glow on screen and are outlined on the printout (VL/HCC 2021: https://conf.researchr.org/details/vlhcc-2021/vlhcc-2021-vl-hcc-main-conference/9/Exploring-Machine-Teaching-with-Children).

**Facilitator check.** The facilitator can explain every verdict from the visible features alone. No hidden randomness.

### 9.6 Designed misreads (three per lab; ≥ 80% marks the confident-wrong case)

**Eco Town**
1. **"Sunny Power Town – lights on all night, 88% sure."** ≥ 80%. Trigger: many yellow, no purple. Blind spot: ignores night. The houses go dark at dusk.
   - Ask: "What did the AI forget about the sun?"
2. **"Forest, not a town, 71% sure."** Trigger: green is the majority. Blind spot: majority rule.
3. **"Wind farm works great, 64% sure."** Trigger: turbines placed among trees and houses. Blind spot: ignores sheltering.

**River Town**
1. **"Lots of little ponds, 67% sure."** Trigger: blue in broken segments; `path` fails.
2. **"Tidy, safe river, 90% sure."** ≥ 80%. Trigger: reeds replaced by grey and yellow. Blind spot: trained on parks. The storm floods downstream houses.
   - Ask: "Who decided 'tidy' means safe?" This echoes Eco AI Explorer's "nice = neat".
3. **"Flood risk: low, 58% sure."** Trigger: houses on the outer ring next to blue. Blind spot: edge.

**Grow Lab**
1. **"Super-healthy farm, 92% sure."** ≥ 80%. Trigger: mostly green, no purple. No bees arrive and the fruit doesn't set.
2. **"Pest problem! 73% sure."** Trigger: purple next to red. Blind spot: confuses clusters. On the CUD palette, reddish purple and vermilion differ by pattern and icon. Point to the icons: "the AI only looked at colour".
3. **"Not enough water, 61% sure."** Trigger: blue on the edge. Blind spot: edge.

**Moon Base**
1. **"Lakeside camp, Earth-style, 81% sure."** ≥ 80%. Trigger: blue next to green and grey. Blind spot: trained on Earth photos.
2. **"Safe base, 77% sure."** Trigger: craters on the outer ring next to habitats. Blind spot: edge.
3. **"Plenty of power, 85% sure."** ≥ 80%. Trigger: solar arrays on the shaded south half. Blind spot: ignores `side`.

**Kick Lab**
1. **"Our team will win, 86% sure."** ≥ 80%. Trigger: more blue than red.
2. **"Defending formation, 63% sure."** Trigger: a symmetric layout meant as attacking. Blind spot: ignores purple arrows.
3. **"Ball is safe, 70% sure."** Trigger: a red player adjacent to the ball. Blind spot: misses adjacency.

**Beat Lab**
1. **"Sad song, 79% sure."** Trigger: blue is the majority. Blind spot: colour-as-mood.
2. **"Heartbeat, not music, 68% sure."** Trigger: regular red only.
3. **"Dance beat, 83% sure."** ≥ 80%. Trigger: a lullaby brief with dense red and yellow. Blind spot: trained on pop songs; ignores the brief.

### 9.7 Tap-copy UI (revised for shared-device fairness)

**Layout** (landscape tablet or laptop)
- Left: the 8×8 grid with A–H/1–8 labels.
- Right: the live voxel island preview; every tap changes the world.
- Bottom: 7 big palette buttons, each about 64 px with the same icon, pattern and colour name as the tile.

**Roles on screen (new)**
- A strip at the top shows three role chips: **Reader** (reads the mat aloud row by row), **Tapper** (only person touching the screen), **Checker** (compares the on-screen counters with the mat).
- The chips **rotate automatically** on every "Ask the AI helper" run and every "Change 3 tiles" retry. Child-chosen animal icons stand in for names.
- **Why.** In the Bloxels study the iPad became "a center locale where power relations were established". The group that worked passed it "smoothly and quickly" (https://repository.isls.org/bitstream/1/9214/1/CSCL2023_281-284.pdf). Rotation makes that the default rather than leaving it to the children's own dynamics.
- **Device placement.** The facilitator card says: "Put the screen where everyone can see it; the mat is where you decide." Strawbies kept five children engaged because "there were always pieces in front of them" (https://tidal.northwestern.edu/media/files/pubs/hu-idc-2015.pdf). Tangible work is also easier for staff to monitor (Pugnali et al. 2017).

**Interaction**
- Choose a colour, then tap or drag to paint.
- Tapping a cell already in the selected colour resets it to base.
- No text entry and no timer.

**Copy helpers**
- "Row by row" mode highlights one row at a time for the Reader.
- Counter chips ("Yellow 6 · Blue 4 …") for the Checker.
- **A mismatch flag:** if the group taps "Done", the screen asks the Checker "Does row 3 match?". It is a prompt only; nothing is auto-detected and no camera is used.

**"Ask the AI helper"**
1. A scripted "thinking" animation.
2. Before the verdict, the **world plays its effect first for 3 seconds** (night falls, the storm comes) without a label. This is the Youtopia-style "impact while paused".
3. Then the speech bubble with label and % sure, and the "why" cells glow.

**After the guess**
- A facilitator card and the "Change 3 tiles" prompt.
- A history strip of the last three guesses.

**Hidden facilitator menu** (long-press the logo)
- 6 preset grids per lab: the three misreads plus three good designs. Preset 1 is the worked-example demo used in the brief.
- Reset.
- Print.

**Privacy and running**
- No camera, no accounts, nothing stored beyond the session.
- Runs offline.
- This avoids every cloud-loss case in section 3 and the camera-capture fragility in section 2.

### 9.8 End artefact

An A5 printed "Habitat Blueprint" (Energy Plan / Flood Plan / Garden Plan / Base Plan / Team Plan / Beat Score) showing:
- The grid in colour + icon + pattern.
- The AI's first and final guesses with % sure.
- The "why" cells outlined.
- **The group's own "Pause and check" prediction next to the AI's answer** (new).
- "The AI was ☐ right ☐ wrong ☐ half-right because …" with picture options for younger children.
- The 3 tiles changed (auto-listed coordinates).
- Lab stamp and date. No names, or first names written by hand.

### 9.9 Facilitator questions and moves

**Questions**
1. "Before we press the button, what will the AI say? How sure?"
2. "Which tiles did the AI look at? Were they the important ones?"
3. "Why only 63% sure? What would make it more sure, or less?"
4. "It said 90% sure and it was wrong. Does sure mean right?" (new; use on the ≥ 80% misread)
5. "Is the AI wrong, or did we build something it has never seen?"
6. "If we change only three tiles, which three would change its mind?"
7. "Would a real (hedgehog / astronaut / gardener / footballer / musician) agree?"
8. "Who should decide: the AI, you, or the people who live there?"

**Moves (new)**
- **Model productive failure.** When your demo grid gets misread, laugh, say "Ooh, I didn't expect that, what did I do?", then fix one tile. Facilitators who modelled "playfulness, vulnerability, and productive failure" supported children's learning from failure (https://doi.org/10.22318/cscl2025.256454).
- **Watch for the child on the edge,** literally the one kneeling to see the screen (https://repository.isls.org/bitstream/1/9214/1/CSCL2023_281-284.pdf). Rotate them in as Tapper next.
- **Ask role-voice questions:** "Nature keeper, what does the duck think?" Youtopia role pairs spoke "from the perspective of the inhabitants" (https://repository.isls.org/bitstream/1/267/1/63.pdf).

---

## 10. Variant: "Write Your Own Card" with picture tiles (revised)

**Goal.** Children write their own instruction card instead of choosing one of three. They experience making a vague instruction and repairing it.

**Card strip.** A4 landscape with four 60 × 60 mm slots: **DO → WHAT → WHERE → HOW**.

**Tiles** (50 mm card, picture + one word + the same CUD colour, icon and pattern where the tile is a lab noun)

| Slot | Tiles (about 6 per lab) | Example (River Town) |
|---|---|---|
| DO (shared verbs) | Add · Remove · Move · Make bigger · Make smaller · Protect | Add |
| WHAT (= the 6 grid colours) | Lab tiles | Reeds |
| WHERE | Near ___ · At the edge · In the middle · North · South · Everywhere | Near houses |
| HOW | Clear: "3 of them", "a little", "only here". Vague, with a fog ☁ icon: "nice", "safe", "better", "more", "tidy" | Safe ☁ |

**How the scripted AI handles it**
1. **DO + WHAT + WHERE** become a rule-generated grid edit. About 6 × 6 × 6 × 5 ≈ 1,080 combinations per lab, all handled by rules, not hand-written.
2. **Each vague HOW tile** has one scripted assumption per lab (5 × 6 = 30 lines). The assumption is shown *before* acting, for example: "I guessed 'safe' means 'no water near houses'. 61% sure." The AI then acts on it and the consequence plays.
3. **Clear HOW tiles** give 85–95% and a predictable edit.
4. **The re-classifier then updates** the habitat label and % sure (links back to section 9).

**Revisions in round 3**
- **Roles.** The DO and WHAT tiles are dealt from the role bags (section 9.3). Only the child who holds reeds can play "Reeds", so every child contributes a word.
- **Worked example first.** The facilitator shows one fog-tile card and its consequence before groups write their own (Bofferding et al. 2022: https://doi.org/10.1145/3507951.3519284).
- **Picture-first.** Children aged 6–9 needed adult help to read text cards in AI Unplugged (https://computingeducation.de/aiunplugged-en.pdf). Every tile has an icon. The word is secondary, and the colour name is printed per CUD.
- **Swap-and-predict.** Groups exchange cards and predict what the AI will do before running it (the tester step from VL/HCC 2021).

**Loop**
1. Build a card (2 min).
2. Swap and predict (1 min).
3. Run: the assumption plus consequence plays.
4. Repair: swap exactly one tile and re-run.

**Facilitator questions**
- "Which tile made the AI guess?"
- "What could 'safe' mean to a duck? To a house owner?"
- "Swap one tile to make it impossible to misunderstand."

**Artefact.** "Our Clear Instruction" card showing:
- the first card (fog tile circled)
- the AI's assumption
- the repaired card
- before/after island thumbnails

**Age adaptation**
- Ages 7–8: DO + WHAT + HOW only; the AI picks WHERE and says so.
- Ages 11–13: add a "BUT NOT" slot.

---

## 11. Recommendations

1. **Keep the physical grid; drop the camera.** Bloxels itself made the board optional and moved to software-first by 2019–20 (https://siliconprairienews.com/2019/06/st-louis-based-pixel-press-launching-bloxels-edu-2-0-and-new-client-services-division-in-the-cortex-innovation-district/ , https://www.bloxels.com/education). Its teachers used paper grids (https://cwmglas-primary-school.j2bloggy.com/Mr-J-Primary-School-Tech/using-bloxels-in-the-classroom/).
2. **Put a piece in every child's hand: role bags of two colours each.** Evidence: Youtopia (https://doi.org/10.1093/iwc/iwab026) and Strawbies (https://tidal.northwestern.edu/media/files/pubs/hu-idc-2015.pdf).
3. **Rotate Reader / Tapper / Checker automatically on every run.** The single device is where exclusion happens (https://repository.isls.org/bitstream/1/9214/1/CSCL2023_281-284.pdf).
4. **Okabe–Ito palette + icon + pattern + printed colour name on every tile** (https://jfly.uni-koeln.de/color/). This covers about 1 in 12 boys (https://www.nidirect.gov.uk/conditions/colour-vision-deficiency-colour-blindness).
5. **Show a worked misread before children build** (https://doi.org/10.1145/3507951.3519284).
6. **Pause and check: the world reacts before the AI labels, and children predict first** (https://doi.org/10.1093/iwc/iwab026).
7. **At least one ≥ 80%-sure misread per lab,** plus the question "Does sure mean right?" (reports 02 and 09).
8. **Build mode in the main flow, never hidden** (Labo Garage reviews: https://www.techradar.com/reviews/nintendo-labo).
9. **Short, guided, skippable instruction** (Game Builder Garage: https://www.shacknews.com/article/125217/game-builder-garage-review-build-your-own-adventure). One printed command sheet beats long tutorials (https://itch.io/t/3354097/bitsy-for-after-school-programs).
10. **No cloud, no accounts; the printed blueprint is the share.** Wii U Mario Maker, LittleBigPlanet and Dreams all lost or froze user content (section 3).
11. **Avoid single-vendor dependence for any hardware.** Osmo was shut, then sold for $825k (https://elevenflo.com/blog/epic-creations-trustee-run-chapter-11-asset-sales). Kano's company is being dissolved (https://find-and-update.company-information.service.gov.uk/company/08375450/insolvency). DeltaOps' paper mat plus browser has no such dependency.
12. **Cite carefully in partner materials.**
    - Youtopia: "somewhat limited, but consistent" positive effect of roles.
    - Horn 2009: more inviting, equal time spent.
    - Pugnali 2017: N = 28, significant only for two tasks.
    - Always pair these with Marshall 2007 and Horn, Crouser and Bers 2012 (benefits depend on the situation).
    - Do not cite Bloxels as having outcome evidence: the studies are small and qualitative.

---

## 12. Still unverified

- **Bloxels units sold, revenue or retention.** Not published anywhere found. The classroom counts (3,000 US schools in 2019; 25,000 US and about 45,000 global classrooms in 2020) are vendor-reported only. There is no formal founder post-mortem on ending the Mattel retail line. The "3-year partnership" comes from one former developer's portfolio page (https://markagne.com/bloxels-star-wars.html).
- **Bloxels outcome evidence.** There is no controlled or pre/post study. The CSCL 2023 and 2025 papers are small qualitative studies of 9 children each. The COMMIC child sample size was not found.
- **Robin Rath's current role.** Not checked this round. The round-2 founder-origin claims rest on https://www.chitag.com/single-post/2016/09/26/Robin-Rath-and-Josh-Stevens .
- **Labo all-kit lifetime total.** Not published. The latest found is the Variety Kit at 1.42M (December 2020). Round 2's Japanese weekly sales (about 120k launch week falling to about 2k a week) come from Media Create data via Gamerant and remain press-reported, not verified against Media Create.
- **Game Builder Garage after December 2022.** Nothing found. The 1.15M figure comes via Wikipedia and VGChartz; the CESA original was not opened.
- **Super Mario Maker 2.** The round-2 "3.93M by 30 September 2019" was not re-checked against Nintendo IR this round. The press course counts are kept.
- **Dreams.** No sales figure. The 1.87M registered users figure is a third-party tracker.
- **Drawn to Life.** "More than 1 million in about five months" (founder, GamesBeat) conflicts with the fan-wiki 820k by March 2008. No publisher filing was found.
- **Mario Paint lifetime total.** Not found; only ">1M in its first year".
- **Roblox under-13 absolute daily users.** Not reported. Only the 35% share of age-checked users is (45% had age-checked).
- **Scratch.** The official feed has been frozen since July 2024. No newer official total found.
- **MakeCode Arcade, LEGO SPIKE.** No product-specific global figures exist.
- **Coding Awbie effect sizes.** Taken from the abstract only. The percentages one Exa summary gave (32% → 71%) were not confirmed in the full text and are not used.
- **Pilot assumptions, to measure rather than cite:**
  - 15–30 tiles per design
  - copy time under 3 minutes
  - the 30–35-minute Option B timings
  - whether 7–8-year-olds can hold the Reader role
  - whether role bags slow the build
- **Colour palette.** The hex values follow Okabe–Ito, but the printed tiles have not been tested with a simulator or with colour-blind children.
