# 06 · Kids as creators: Bloxels and similar "build your own game/world" tools

**For:** DeltaOps Learning (browser-based, staff-led, scripted "AI labs" for ages 7 to 13)
**Researched:** 4 November 2026, by web search. Every claim has a URL next to it.

**How figures are marked**
- **[est.]** means the figure comes from a third-party tracker, a fan wiki or an extrapolation.
- **[vendor]** means the company reported it about itself.
- **[unverified]** means I looked and found nothing better.

The DeltaOps lab names (Eco Town, River Town, Grow Lab, Moon Base, Kick Lab, Beat Lab) and the format facts come from the partner brochure in this repo (`/home/user/ai-lab-v3/deltaopslearning-brochure/index.html`).

---

## Contents

1. [Executive summary](#1-executive-summary)
2. [Bloxels in depth](#2-bloxels-in-depth)
3. [Commercial "make → play → share" games](#3-commercial-make--play--share-games)
4. [Coding and creation platforms for children](#4-coding-and-creation-platforms-for-children)
5. [Tangible and physical-to-digital tools](#5-tangible-and-physical-to-digital-tools)
6. [AI-literacy precedents: children and classifiers](#6-ai-literacy-precedents-children-and-classifiers)
7. [Research: tangible vs screen, groups, design principles, museums](#7-research-tangible-vs-screen-groups-design-principles-museums)
8. [Synthesis: success patterns and pitfalls](#8-synthesis-success-patterns-and-pitfalls)
9. [Spec: "Build-a-Habitat Grid" mode](#9-spec-build-a-habitat-grid-mode)
10. [Variant: "Write Your Own Card" with picture tiles](#10-variant-write-your-own-card-with-picture-tiles)
11. [Recommendations](#11-recommendations)
12. [Open gaps](#12-open-gaps)

---

## 1. Executive summary

**Bloxels**
- **Why it worked.** It combined a small physical grid with a colour grammar where each colour means one rule. That gave young children a low floor and a "my drawing became a game" moment.
- **Why it stalled.** Camera capture was unreliable, games came out similar, the app was clunky, and it depended on retail toy partnerships.
- **Where it is now.** The consumer kits and old apps are gone. Bloxels EDU lives on in classrooms (about 25,000 US classrooms [vendor]).

**Tangible interfaces: the research**
- In a museum, tangible versions were more inviting to children and girls and better for collaboration, with equal time spent (Horn et al. 2009).
- With Osmo Coding, tangible blocks gave passive partners more ways to take part (Kim, CSCL 2017).
- KIBO (tangible) beat ScratchJr (screen) on young children's computational-thinking scores in a small study.
- Caveat: the benefits depend on the situation (Marshall 2007; Horn, Crouser and Bers 2012). The field recommends hybrid designs: physical for group thinking, screen for feedback.

**Closest AI-literacy precedents**
- Code.org's *AI for Oceans*: children label fish/not-fish and the model then misclassifies. About 1M+ completions [vendor].
- *AI Unplugged*: decision-tree classification with cards, no computer. Its core message is that "classification models are not perfect".
- A VL/HCC 2021 study recommends showing confidence scores to children. That validates DeltaOps' "% sure" display.

**Main risks the field shows**
- Blank-canvas paralysis: Dreams and Roblox Studio.
- Over-scripted tutorials: Game Builder Garage.
- Novelty decay: Labo.
- Fragile capture technology: Bloxels, Osmo.
- Moderation and server dependency: LittleBigPlanet, Mario Maker, Roblox.
- Dependence on a corporate parent: Osmo under Byju's, Kano, Kodu.

DeltaOps' constraints (no accounts, no live AI, no uploads, printed artefacts) avoid most of these by design.

**Deliverables (sections 9 and 10)**
- A complete spec for an 8×8 "Habitat Grid" mode:
  - six colour grammars, one per lab
  - deterministic classifier rules and confidence formula
  - three designed misreads per lab
  - A4 mat and legend layout
  - tap-copy UI
- A "Write Your Own Card" variant: four-slot picture-tile sentences, with fog-marked vague tiles that trigger scripted assumptions.

---

## 2. Bloxels in depth

### 2.1 What it is

- **The kit.** A physical 13×13 board and coloured cubes. You photograph the board with a tablet and it becomes a platformer room, a character or art. https://en.wikipedia.org/wiki/Pixel_Press
- **Size and age.** 320 blocks, 40 per colour, in 8 colours (https://thetoyinsider.com/bloxels-review). Designed for ages 8 to 12, but used by children as young as 5 (https://www.mcvuk.com/development-news/the-building-blocks-of-game-design/).
- **The official colour grammar** (https://bloxels.com/tutorials/8-block-types):

| Colour | Meaning | Configurable? |
|---|---|---|
| Green | Terrain (walkable) | Decorate |
| Red | Hazard (lava, spikes) | No |
| Yellow | Collectible / key | Coin or key |
| White | Story: narrative, checkpoint, end flag, warp | Yes |
| Purple | Enemy | Flying, fast, and so on |
| Orange | Action block (throw or push) | No |
| Pink | Power-up | Yes |
| Blue | Liquid (swim; can be mist or ladder) | Decorate |

- **Rules can shift.** Colour meanings changed between versions; Star Wars Bloxels repurposed orange as "Action Blocks" (https://www.bloxelsbuilder.com/blog-list/behind-bloxels-star-wars).

### 2.2 History

- **2013–14:** Pixel Press Floors, a draw-on-paper level designer, raised $110k on Kickstarter (https://projectpixelpress.com/).
- **May 2015:** Bloxels Kickstarter raised $68k against a $40k goal (https://www.prnewswire.co.uk/news-releases/bloxels-the-video-game-you-can-build-launches-on-kickstarter-504241201.html , https://projectpixelpress.com/blog-list/2015/6/22/bloxels-kickstarter-successfully-funded). Named Best of Toy Fair New York 2015 (https://www.gamesandlearning.org/?p=3028).
- **2016:** Mattel partnership. Mattel handled manufacturing, marketing and distribution; Pixel Press kept the software (https://projectpixelpress.com/blog-list/2016/9/30/pixel-press-partners-with-mattel-on-bloxels). Finalist for 2017 TIA Toy of the Year, Game category (https://prnewswire.com/news-releases/2017-toy-of-the-year-toty-award-finalists-unveiled-by-toy-industry-association-300366551.html).
- **April 2018:** Star Wars Bloxels (https://www.licenseglobal.com/toys-games/mattel-debuts-star-wars-bloxels).
- **2018:** Bloxels EDU launched, with a teacher hub that controls sharing, the arcade and asset packs, and per-student licences (https://www.projectpixelpress.com/blog-list/2018/7/12/introducing-bloxels-edu). Later "about 25,000 classrooms in the US" [vendor] (https://hecmedia.org/posts/st-louis-based-bloxels-edu-offers-online-solution-for-video-game-creation-during-pandemic).
- **Later:**
  - Old consumer apps (Bloxels Builder, Star Wars) can no longer be downloaded for the first time after the remake (https://en.wikipedia.org/wiki/Pixel_Press).
  - Retail kit listed as "discontinued by manufacturer" (https://www.walmart.com/ip/Bloxels-Game/52160689).
  - Teq classroom packs discontinued on 12 July 2024 (https://www.cdw.com/product/teq-bloxels-classroom-5-pack/5572486).
  - EDU app still updated, in October 2025 per Play Store listings (https://appgoblin.info/apps/com.projectpixelpress.BloxelsEDU).

### 2.3 Founders' framing

- **Origin.** Robin Rath and Josh Stevens drew Mario-style games on paper as children. Bloxels was meant to turn those drawings into real games (https://www.chitag.com/single-post/2016/09/26/Robin-Rath-and-Josh-Stevens).
- **Toy as creative medium.** Rath sets this against toys-to-life products, where the toy is only "a key" that unlocks content (same source; https://www.mcvuk.com/development-news/the-building-blocks-of-game-design/).
- **Educational value.** Rath named collaboration ("teaching kids to work together") and design thinking, using Stanford d.school framing (https://www.mcvuk.com/development-news/the-building-blocks-of-game-design/).
- **Why they moved to education.** A co-founder said the toy-industry partnership was about "what's in the next box", which pushed them towards education (https://www.momschoiceawards.com/?p=18875).
- **No sales.** Pixel Press doesn't allow selling Bloxels games because it sees the product as an educational tool (https://en.wikipedia.org/wiki/Pixel_Press).

**No formal post-mortem exists [unverified].** I found no founder interview explaining why the consumer line ended. The likely factors below are my inference from the reviews and the retail pattern:

1. **Retail-toy economics.** The toy depended on a "next box" release cycle and a licence (Star Wars).
2. **Camera capture was the most common complaint.**
   - Common Sense: camera recording "might not work" (https://www.commonsense.org/education/reviews/bloxels-edu).
   - Tech & Learning: capture "super finicky"; games "too similar"; "can ultimately lead to frustration" (https://www.techlearning.com/resources/bloxels-build-play-share-your-own-video-games).
3. **App complexity after capture.** One parent review gave the board 4.9/5 but the app 3.5/5 and asked for "a simpler interface" (https://www.mamasmiles.com/?p=14275).

### 2.4 Classroom use and evidence

- **No peer-reviewed controlled study of Bloxels found [unverified].** The evidence is practitioner accounts:
  - **Ocean floor.** Fifth-graders modelled the ocean floor; they researched sea creatures to design enemies, combining science, literacy and technology (https://www.literacyworldwide.org/blog/literacy-now/2019/05/21/literacy-design-and-collaboration-mapping-the-ocean-floor-with-bloxels).
  - **Three Little Pigs.** Bloxels was paired with comparing versions of the story (https://www.episcopalacademy.org/news-post-details/~post/the-three-little-pigs-meet-the-bloxel-box-20191015).
  - **Art and library.** A collaboration that used research folders (https://magazine.davisart.com/articles/elementary-art-lesson-video-game-423).
  - **Assessment.** Games used "to assess their understanding instead of a traditional paper-and-pencil test" (https://www.the74million.org/?p=513604).
- **Wider research on game-making.** A review of 30 studies (n=2,366) on learning literacy by making games found the approach feasible but "considerable variation" in how it was carried out (cited in search results; see https://oro.open.ac.uk/20823 for Walsh 2010, a related case study).

**Lesson for DeltaOps.** Bloxels worked best as a vehicle for content: ocean, story, history. Children designed something about a topic. That is exactly DeltaOps' situation.

---

## 3. Commercial "make → play → share" games

### Super Mario Maker 1 and 2 (Nintendo, 2015 / 2019)

- **Evidence.**
  - Mario Maker 1: about 4.01M copies, about 7.25M courses [est.].
  - Mario Maker 2: 2M+ courses in under 2 weeks; 3.93M copies by 30 September 2019; 10M+ courses after about 6 months.
  - Sources: https://shacknews.com/article/112798/super-mario-maker-2-two-million-courses-uploaded , https://www.kitguru.net/tech-news/mustafa-mahmoud/super-mario-maker-2-reaches-new-milestone-with-over-10-million-courses-created/
- **Loop.** Place parts → one-button playtest → you must clear your own course before uploading → Course World.
- **Scaffolding.**
  - A familiar grammar: everyone knows what a Goomba does.
  - Mario Maker 2's story mode models good levels.
- **Decline lesson.** Wii U online services ended on 8 April 2024. Uploads had already stopped in 2021, and courses that were never downloaded became unreachable (https://en-americas-support.nintendo.com/app/answers/detail/a_id/53854). Fans raced to clear the last uncleared level, "Trimming the Herbs", before the closure (https://www.videogameschronicle.com/news/weeks-before-its-closure-every-mario-maker-level-has-finally-been-beaten/).

### Nintendo Labo (2018)

- **Evidence.**
  - Series at 1.39M by mid-2018 (https://twinfinite.net/?p=369619).
  - Variety Kit at 1.09M by April 2019 (https://www.nintendolife.com/news/2019/04/nintendo_labo_variety_kit_surpasses_one_million_sales).
  - No final all-kit total published [unverified].
- **Sales pattern.** Japan launch week about 120k, falling to about 2k a week by July [est.]. The Vehicle Kit launch was weak. Nintendo said it "isn't selling gangbusters" (https://gamerant.com/nintendo-labo-disappearance-failure-history/ , https://3ds.nintendolife.com/news/2018/09/nintendo_labo_vehicle_kit_has_disappointing_launch_in_japan_switch_still_best-selling_console).
- **Lesson.** The build is a one-off event: it was loved, then shelved. The "Toy-Con Garage" programming mode was hidden and little used [est.].

### Game Builder Garage (2021)

- **Evidence.** Number 1 in Japan at launch: 71,241 physical copies in week 1, 126k in June 2021. 1.15M worldwide by 31 December 2022 (https://www.gematsu.com/2021/06/famitsu-sales-6-7-21-6-13-21 , https://en.wikipedia.org/wiki/Game_Builder_Garage).
- **Scaffolding.** Seven guided lessons with the characters Bob (step by step) and Alice (quizzes between lessons).
- **Reviews.** Praised as accessible, but criticised as "heavily prescribed" and unskippable (https://www.shacknews.com/article/125217/game-builder-garage-review-build-your-own-adventure , https://nintendolife.com/reviews/nintendo-switch/game_builder_garage).
- **Lesson.** Guided lessons sell when paired with a famous brand, but long, unskippable instruction irritates older children.

### LittleBigPlanet (2008 onwards) and Dreams (2020)

- **LittleBigPlanet evidence.** About 4M copies of the first game. 1M levels by July 2009 (244M plays), 10M+ levels on the PS3 servers. Tagline "Play. Create. Share." (https://blog.eu.playstation.com/2009/07/22/littlebigplanet-community-reaches-one-million-creations/ , https://en.wikipedia.org/wiki/LittleBigPlanet).
- **Moderation and shutdowns.**
  - Press joked about how many early levels were "phallus free" (https://www.gamingnexus.com/News/13340/).
  - PS3 and Vita servers were shut in 2021 after DDoS attacks and offensive messages.
  - PS4 servers were closed permanently on 19 April 2024; a decade of user-made content was partly lost (https://www.engadget.com/sony-littlebigplanet-ps3-vita-servers-shut-down-163356541.html , https://videogameschronicle.com/news/sony-confirms-littlebigplanet-3-shutdown-months-after-it-was-temporarily-taken-offline).
- **Dreams.** Huge creative ceiling, steep learning curve. Live support ended on 1 September 2023 and curation was later cut. Sales were lower than LittleBigPlanet's; no figure [unverified] (https://www.videogameschronicle.com/news/media-molecule-is-ending-support-for-dreams-in-september/).

### Spore Creature Creator (2008)

- **Evidence.**
  - 250k creatures within days.
  - 1M within the first week (by 24 June 2008).
  - 3M+ by Spore's release.
  - 100M creations within a year (https://mcvuk.com/business-news/spore-creature-creator-hits-1m/ , https://www.ea.com/news/100-million-creatures-take-over-spore-universe).
- **Why it worked.**
  - It was a free, standalone creator released before the full game.
  - Constrained parts snap to a spine.
  - Instant animation ("it walks!") rewards any design.
- **Moderation.** Press immediately counted the obscene creations (https://destructoid.com/?p=38850).

### Drawn to Life (2007) and Draw a Stickman: EPIC (2012)

- **Drawn to Life.** "Several hundred thousand" early; about 820k by March 2008 [est., fan wiki]; series about 3.5M [est.] (https://www.engadget.com/2011/02/10/5th-cell-reveals-sales-for-scribblenauts-drawn-to-life/).
- **Draw a Stickman.** 664,725 downloads in month 1 (https://hitcents.com/news/draw-stickman-epic-has-huge-success-app-stores).
- **Lesson.** "Your drawing becomes the hero" is a strong hook. The structured game around it supplies the purpose.

### Mario Paint (1992)

- **Evidence.** 1M+ copies with a mouse by March 1993; about 2.3M lifetime [est.] (https://en.wikipedia.org/wiki/Mario_Paint).
- **The music composer.** It was a 2D grid of time × pitch with stamp icons and is still remixed today. It inspired WarioWare D.I.Y. (https://motherboard.vice.com/read/the-resurrection-of-mario-paint-composer).
- **Relevance.** A direct precedent for a Beat Lab step-sequencer grid.

### Townscaper (2020)

- **What it is.** A "toy, not a game" (Oskar Stålberg) with no goal. Click a cell and the procedural rules make it pretty.
- **Evidence.** About 100k early-access copies in about 2 weeks; 380k on Steam (https://mcvuk.com/business-news/when-we-made-townscaper , https://www.bloomberg.com/news/articles/2020-07-24/the-video-game-where-you-build-an-empty-town).
- **Lesson.** Rules that turn any placement into a satisfying result remove the fear of a blank canvas.
- **Relevance.** The "world visibly reacts to one tap" quality DeltaOps' voxel island should copy.

### Toca Boca

- **Evidence.** 100M downloads by 2015; 170M+ across 38 apps by 2017 (https://tocaboca.com/press-post/toca-boca-celebrates-100-million-downloads/ , https://techcrunch.com/2017/07/10/kids-app-maker-toca-boca-debuts-its-first-consumer-product-collection-at-target/).
- **Design.** Open-ended play with no "winning", no ads or in-app purchases, and bite-sized play environments rather than goals (https://www.killscreen.com/secret-smart-kids-entertainment-give-them-toy-not-game/).

### LEGO Builder's Journey (2019) and LEGO Worlds (2017)

- **Builder's Journey.** Golden Joystick Mobile Game of the Year 2020; Spilprisen awards; 10M players, about 7M of them from the Epic Games Store giveaway (https://en.wikipedia.org/wiki/Lego_Builder%27s_Journey , https://www.brickfanatics.com/lego-builders-journey-mega-milestone-giveaway). Wordless voxel dioramas.
- **LEGO Worlds.** UK chart number 2 at launch; about 918k Steam copies [est., Boxleiter method] (https://gamerevenuedata.pages.dev/games/lego-worlds/ , https://accounts.brickfanatics.com/lego-worlds-sits-at-2-in-uk-sales-chart). Open sandbox; no official totals.

---

## 4. Coding and creation platforms for children

| Tool | Scale (marked) | Scaffold | Sharing | Lesson for DeltaOps |
|---|---|---|---|---|
| **Scratch** (MIT) | 164.3M projects, 135.1M users (official stats API, timestamp July 2024: https://scratch.mit.edu/statistics/) | Blocks; "low floor, high ceiling, wide walls"; remix | Remix tree, moderated | Wide walls raise engagement and learning (causal: https://blog.communitydata.science/testing-the-wide-walls-design-principle-in-the-wild/) |
| **Kodu Game Lab** (Microsoft) | Used in "selected schools" | "When–do" tiles, 3D | Local or Xbox | Faded after Microsoft moved on; now maintained by a third party (https://kodugamelab.com/faq) |
| **Roblox Studio** | About 39.7M under-13 daily users, Q2 2025 [est., Statista] (https://www.statista.com/statistics/1190309/daily-active-users-worldwide-roblox) | Professional tool (Lua) | Open platform | No low floor for under-10s; safety restrictions in 2024 (https://www.wikiwand.com/en/articles/Child_safety_on_Roblox) |
| **Minecraft Education** | 40k+ school systems, 140 countries [vendor] (https://education.minecraft.net/en-us) | Themed build challenges; Code Builder (MakeCode blocks driving an "Agent" robot) (https://docs.microsoft.com/en-us/learn/modules/introduce-coding-minecraft-education-edition/learn-to-code-microsoft-makecode-agent) | Classroom | Real-world briefs ("healthy spaces for animals and humans", 2020; UNESCO "Peace with Nature", 2021) |
| **MakeCode + micro:bit** | 73.5M young people in 85+ countries [vendor, October 2026] (https://itbrief.co.uk/story/micro-bit-foundation-urges-children-to-question-ai); 10M devices (https://microbit.org/news/2024-12-09/celebrating-10-million-microbits-around-the-world/) | Blocks → JS/Python; physical device | Files | Foundation now pushes children to "question AI" (same source); MakeCode Arcade has no published stats [unverified] |
| **Code.org Sprite Lab / AI for Oceans** | AI for Oceans 1M+ completions [vendor] (https://www.github.com/code-dot-org/ml-activities) | Label → train → watch classify | None | See section 6 |
| **Hopscotch** | "10 million families" [vendor] (https://apps.apple.com/us/app/-/id617098629); designed for ages 9–15 (https://help.gethopscotch.com/article/5-what-is-hopscotch) | iPad blocks | Moderated community | Moderation is a permanent cost |
| **Tynker** | "100M kids, 150k schools" [vendor]; 60M at the 2021 Byju's acquisition (https://www.businessinsider.in/business/startups/news/byjus-acquires-us-based-coding-for-kids-startup-tynker/articleshow/86261427.cms) | Puzzle courses → free build | Community | Parent-company risk (Byju's) |
| **Bitsy** | Small community; used in 8–12 workshops (https://outschool.com/classes/make-your-own-online-adventure-game-with-bitsy-cDBRLXMC) | 8×8-pixel tiles, tiny rooms | itch.io | A 4-H leader chose Bitsy over PICO-8 for 5th graders (https://itch.io/t/3354097/bitsy-for-after-school-programs); a printed command sheet works better than long tutorials (same thread) |
| **PICO-8 / PuzzleScript** | No kid-specific data [unverified] | Text code | Web | Too text-heavy for 7–10; a useful aesthetic reference only |
| **Kano** | Kickstarter $1.5M (2013); Harry Potter wand kit (2018); company went into administration in 2023 (https://en.wikipedia.org/wiki/Kano_Computing) | Build-a-computer → code | Kano World | Hardware plus licence economics are fragile |

---

## 5. Tangible and physical-to-digital tools

**Osmo (Tangible Play)** is the closest analogue to Bloxels.
- **How it works.** A mirror clip and the iPad front camera read physical tiles, words and drawings on the table.
- **Scale.** Used in about 20,000 schools [vendor]. Bought by Byju's for $120M in January 2019. Caught up in Byju's bankruptcy proceedings in 2024; later partly relaunched [conflicting reports] (https://en.wikipedia.org/wiki/Osmo_(game_system) , https://techcrunch.com/2019/01/16/byjus-buys-osmo-for-120m/amp/).
- **Lessons.**
  1. Camera recognition worked well enough for mass adoption when the vocabulary was tiny and the tiles were high-contrast and purpose-made.
  2. Corporate-parent risk.

**Cubetto (Primo Toys)**
- **What it is.** A screen-free wooden robot. Children program it by slotting coloured blocks into a board ("instead of just making the robot tangible, we made the coding part tangible too"). Ages 3+, with Montessori positioning.
- **Evidence.** 2013 beta raised about $80k and was in 300 schools. The 2016 Kickstarter raised about $1.6M from 6,553 backers, then the most-funded edtech project on Kickstarter. 2017 Play Maps campaign (https://www.crowdfundinsider.com/2016/04/83968-crowdcube-fundedclub-member-primotoys-finishes-kickstarter-round-scores-1-5m-for-coding-toy-cubetto/ , https://qz.com/1017315/this-montessori-inspired-wooden-robot-teaches-toddlers-how-to-code).
- **Relevance to DeltaOps.** Printed maps plus a colour-coded instruction board is the same idea as a printed mat plus legend.

**KIBO (KinderLab, Marina Bers / Tufts DevTech)**
- **What it is.** Wooden blocks scanned by the robot.
- **Evidence.**
  - KIBO (tangible) vs ScratchJr (screen), 14 children each, ages 4–7: the KIBO group scored higher in all four computational-thinking categories, significantly so for sequencing and debugging (Pugnali, Sullivan and Bers 2017, via https://kinderlabrobotics.com/blog/robotics-in-early-learning-robotics-makes-coding-tangible-concreteand-screen-free/ [vendor summary of a peer-reviewed paper]).
  - Usable from age 3, with reported gains in communication and collaboration (Bers et al. 2019, "Coding as a playground").

**Strawbies** is a tangible coding game built on Osmo-style camera reading. No independent evidence found [unverified].

**Merge Cube** is a foam AR cube; education is its main revenue driver, sold in 20+ countries [vendor] (https://www.tpr.org/post/san-antonio-company-uses-new-technology-educate-world). It is a physical anchor for a digital model, but it needs a camera, a device and a licence.

**LEGO Education SPIKE** has no adoption figures found [unverified]. Its relevance is the same coloured-part grammar and printed build cards.

**Pattern across tangible products.** The physical part is cheap to love and expensive to make reliable. Camera capture worked in the products (Osmo, KIBO's barcodes) that used:
- purpose-built tokens
- a fixed light and geometry
- a tiny vocabulary

Bloxels' free-form 169-cell grid was the hardest case. DeltaOps should keep the physical part and drop the camera.

---

## 6. AI-literacy precedents: children and classifiers

**Code.org *AI for Oceans* (2019)**
- **What children do.** Label items fish/not-fish (true/false), then the model classifies new items using the labels of the most similar training images; later levels use an SVM.
- **Scale.** Grade 3+; 1M+ completions [vendor].
- **Built-in bias lesson.** Children see biased or incomplete training cause errors (https://codeorg.medium.com/ai-for-oceans-a-csforgood-activity-14ef6ebd8178 , https://www.github.com/code-dot-org/ml-activities).
- **Relevance.** The direct ancestor of a "the AI misreads your habitat" mode.

***AI Unplugged* (Lindner, Seegerer, Romeike 2019)**
- **What it is.** Five no-computer activities, including "Classification with Decision Trees" using animal cards.
- **Core concepts.** "Classification models are not perfect"; "certain combinations of characteristics indicate a certain category".
- **Age note.** Children aged 6–9 needed adult help to read the cards (https://computingeducation.de/aiunplugged-en.pdf , https://www.doi.org/10.1007/978-3-030-33759-9_10).
- **Relevance.** Cards plus classification work without screens, and picture-first cards matter for under-9s.

**Google *Quick, Draw!***
- **What it is.** An RNN guesses a doodle in real time. More than 1B drawings collected; 50M in the public dataset.
- **Why it misreads.** Variation in how people draw, plus categories that look alike (https://research.google/blog/introducing-the-kaggle-quick-draw-doodle-recognition-challenge/ , https://arxiv.org/pdf/1907.06417.pdf).
- **Relevance.** A public example of the AI guessing from your drawing and being visibly, funnily wrong.

**Children and Teachable Machine**
- **VL/HCC 2021 study (14 children aged 7–13).** Children trained image classifiers and tested each other's models for robustness. Recommendation: make ML metrics such as confidence scores visible (https://conf.researchr.org/details/vlhcc-2021/vlhcc-2021-vl-hcc-main-conference/9/Exploring-Machine-Teaching-with-Children).
- **Co-design study (children aged 8–13).** Children draw on personal experience to frame AI problems and plan for errors (https://par.nsf.gov/biblio/10107172).
- **"Breakable Machine" (2025).** Spoofing a classifier as a K–12 game. Breaking the AI is itself the activity (https://arxiv.org/html/2508.14201v1).

**Implication for DeltaOps.** DeltaOps' scripted "% sure" plus deliberate misreads is well supported. Adding "why" highlighting (which cells drove the guess) follows the explainable-AI direction of Breakable Machine.

---

## 7. Research: tangible vs screen, groups, design principles, museums

**Papert: constructionism.**
- Children learn by building "objects to think with" (the Logo turtle).
- Papert hoped computers could be for children "what the gears were for me".
- Constructionism stresses building valued artefacts inside a bounded "microworld".
- Sources: https://en.wikipedia.org/wiki/Mindstorms_(book) , https://news.mit.edu/2016/seymour-papert-pioneer-of-constructionist-learning-dies-0801
- **For DeltaOps:** each lab island is a microworld, and the grid design is the object to think with.

**Resnick: low floors, high ceilings, wide walls.**
- Extends Papert by adding wide walls: many kinds of outcome (https://scratchfoundation.org/learn/learning-library/scratch-creative-learning-philosophy).
- Hill and Shaw found causal evidence from Scratch that widening walls raises engagement and learning (https://blog.communitydata.science/testing-the-wide-walls-design-principle-in-the-wild/).
- **For DeltaOps:** short labs need a low floor and wide walls. The ceiling matters less.

**Horn, Solovey, Crouser and Jacob (CHI 2009): Tern at the Boston Museum of Science.**
- **Setup.** Tangible wooden-block programming vs mouse-based programming; 260 visitors observed and 13 families interviewed.
- **Findings.** The tangible version was more inviting, especially for children and girls, and better supported active collaboration and child-led activity. There was no difference in time spent.
- **Limitation.** One session per visitor.
- Sources: https://typeset.io/pdf/comparing-the-use-of-tangible-and-graphical-programming-4dcq4vl6e6.pdf , https://users.wpi.edu/~esolovey/Research/Entries/2009/4/9_Graphical_and_Tangible_Programming.html

**Horn, Crouser and Bers (2012): "the case for a hybrid approach".**
- Across three studies, benefits depend on the situation. "We cannot say that tangible interaction is better for young children."
- They built a hybrid Tern (https://sites.bc.edu/devtech/wp-content/uploads/sites/181/2023/10/TangibleInteraction_bers2012.pdf).

**Marshall (TEI 2007): "Do tangible interfaces enhance learning?"**
- An analytic framework in six perspectives, and a warning that the cognitive and social benefits were under-evidenced (https://oro.open.ac.uk/19538).

**Antle, Wise and Nielsen (IDC 2011): *Towards Utopia*, then *Youtopia* (2013).**
- A tangible tabletop for land-use planning with children aged 7–10: they place physical "stamp" objects to mark land-use types on a map. Pre/post learning test with 30 children.
- The Youtopia papers study collaboration and positive interdependence.
- Sources: https://gcc.sites.olt.ubc.ca/files/2013/03/Antle_11_IDC_TowardsUtopia.pdf , https://antle.iat.sfu.ca/research/youtopia/
- **This is the closest academic precedent to a "habitat grid" for 7–10-year-olds.**

**Kim (CSCL 2017): Osmo Coding, tangible vs graphical, pairs of children.**
- The tangible version encouraged more collaboration through visibility and "multiple access points".
- In the screen version, the active child faced the tablet; in the tangible version, children leaned towards each other (https://tidal.northwestern.edu/media/files/pubs/kim-osmo-cscl-2017.pdf).

**García-Sanjuan et al. (2018).** With 80 primary children, a tangible multi-tablet quiz reached group consensus faster than a touch version (https://riunet.upv.es/handle/10251/121367).

**Exploratorium Tinkering Studio.**
- An evidence-based learning framework from 50 learners: four Dimensions of Learning and three Facilitation Moves (Science Education, 2015). Replicated in an art-museum makerspace.
- Sources: https://www.informalscience.org/learning-and-facilitation-frameworks , https://www.washington.edu/museology/2015/06/12/evidences-of-learning-in-an-art-museum-makerspace/
- **For DeltaOps:** facilitator moves matter as much as the tool.

**Nina Simon: The Participatory Museum (2010).**
- Contributory, collaborative and co-creative models.
- Names privacy as the biggest challenge to visitor participation in children's museums (https://www.aam-us.org/wp-content/uploads/2024/04/9EXHSpring10_VisitorParticipation_Simon.pdf).
- **For DeltaOps:** supports the no-upload, take-home artefact model.

**Overall research read:**
- Use physical materials for the shared thinking and turn-taking moment, so that several children can touch the design.
- Use the screen for feedback (the AI guess and the world change).
- Don't rely on recognition technology.

---

## 8. Synthesis: success patterns and pitfalls

### Patterns that work

1. **A small, fixed grammar with meaning in colour.** Bloxels' 8 block types, Mario parts, Kodu tiles, KIBO blocks.
2. **An instant consequence.** Mario Maker's playtest, Townscaper's auto-beautify, Spore's "it walks".
3. **Ownership: "my drawing is in the world".** Drawn to Life, Bloxels, Spore.
4. **A purposeful brief.** Minecraft build challenges; Bloxels ocean-floor lessons.
5. **Wide walls within a narrow brief.** Scratch.
6. **Tangible materials for group thinking.** Tern, Osmo Coding, KIBO, Youtopia.
7. **Visible confidence and errors as content.** AI for Oceans, Quick Draw, the VL/HCC recommendation.
8. **Short, complete sessions with no losing.** Toca Boca.

### Pitfalls

1. **Blank canvas or tool overload.** Dreams, Roblox Studio, Labo's Garage.
2. **Same-y outputs.** Bloxels; mitigate with lab-specific grammars and multiple valid goals.
3. **Fragile capture.** Bloxels; Osmo outside ideal conditions.
4. **Over-scripted tutorials.** Game Builder Garage.
5. **Novelty decay.** Labo.
6. **User-made content moderation and server dependency.** LittleBigPlanet, Spore, Mario Maker, Roblox.
7. **Platform or parent-company fragility.** Osmo and Tynker under Byju's, Kano, Kodu.
8. **Reading load for under-9s.** AI Unplugged cards needed adult help.
9. **Colour-only coding.** None of the products surveyed addressed colour-vision deficiency. Bloxels relies on colour alone [inference]. About 1 in 12 boys has a colour-vision deficiency [est., common figure].

---

## 9. Spec: "Build-a-Habitat Grid" mode

### 9.1 Placement in the DeltaOps format

**Option A (recommended): stage 1 of a lab.**
1. Children design the starting island on the grid.
2. The AI classifies it.
3. Stages 2–6 run the normal three-card choices on their island, not a default one.
4. The artefact is the final grid plus the AI's verdicts.

This keeps the existing 6 × 3 card engine and adds ownership.

**Option B: a standalone 25–35-minute "Build mode"** for drop-in museum or family sessions.

| Step | Minutes |
|---|---|
| Brief | 3 |
| Mat build, group of 2–4 | 7 |
| Tap-copy | 3 |
| AI guess | 1 |
| Discussion | 4 |
| Change exactly 3 tiles and re-run (×2) | 8 |
| Print artefact | 3 |

### 9.2 The grid

**Size: 8×8 (64 cells).** Rationale:
- Bloxels' 13×13 (169 cells) is too slow to build and copy in a short session.
- Bitsy rooms are 16×16 tiles, also too many.
- 8×8 maps cleanly onto a voxel island and onto Beat Lab's 8 steps.
- **Ages 7–8:** offer a 6×6 "junior" mat (36 cells), with outer rows and columns shaded out.

**Default state.** Every cell starts as the lab's "base" colour (lawn, soil, regolith, pitch, silence). Children only place the 6 active colours. In practice 15–30 tiles per design [est.], so copying stays under about 3 minutes.

**Coordinates.**
- Columns A–H, rows 1–8, printed on both mat and screen.
- Corner icons (sun = north, entrance = south) fix orientation.

### 9.3 Physical materials

**Mat**
- A4 landscape, laminated (or 300 gsm card).
- Grid of 8 × 22 mm cells = 176 mm square, on the left, with an 8 mm coordinate gutter.
- Right panel about 90 mm wide, holding:
  - Mission box: lab icon, a one-line goal, and the line "The AI will guess what you built".
  - Legend: 6 rows, each a colour swatch + icon + name + three-word meaning.
  - "Base" swatch.
  - "Change 3 tiles" retry box with three tick circles.
  - Group name line (no surnames).

**Tiles** (three options, in order of preference):
1. **Reusable 20 mm printed card squares.** Six colours, each with a white icon. One A4 sheet of 20 mm squares cut gives about 120; supply 15 of each colour per group. Store them in a labelled bag per lab.
2. **19 mm colour-coding dot stickers on a dry-wipe laminated mat.** Cheap, but single-use [est.].
3. **Dry-wipe markers in 6 colours.** Lowest cost; draw the icon letter in the cell.

**Accessibility**
- Every colour also carries an icon and a pattern (dots, stripes, cross-hatch), so the grammar never depends on colour alone.
- Choose a palette safe for colour-vision deficiency. Avoid pure red/green pairs; use, for example, a blue/orange contrast plus value differences.

### 9.4 Colour grammars per lab

The **cross-lab families** stay constant so the habit transfers between labs:
- **Green** = living things
- **Blue** = water / flow
- **Grey** = built things / people
- **Yellow** = energy / light / reward
- **Red** = danger / heat / loud
- **Purple** = the lab's special item

**Eco Town (energy).** Base: lawn. Brief: "Keep the lights on after dark."

| Colour | Tile | Meaning |
|---|---|---|
| Yellow | Solar panel | Makes power in daylight |
| Blue | Wind turbine | Makes power when windy |
| Purple | Battery | Stores power for night |
| Grey | Houses | Use power |
| Green | Trees / park | Shade, wildlife, cooling |
| Red | Power-hungry factory | Uses lots of power |

**River Town (water).** Base: grass. Brief: "A river town that stays dry in a storm and keeps its wildlife."

| Colour | Tile | Meaning |
|---|---|---|
| Blue | River / water | Flows downhill |
| Green | Reeds / wet meadow | Soaks up floods, habitat |
| Grey | Houses / road | People, hard surfaces |
| Yellow | Flood wall / sandbags | Blocks water |
| Purple | Rain garden / pond | Stores rainwater |
| Red | Pollution pipe | Dirties water |

**Grow Lab (food).** Base: bare soil. Brief: "A garden that feeds the class all year."

| Colour | Tile | Meaning |
|---|---|---|
| Green | Crops | Food |
| Blue | Watering / water butt | Water |
| Yellow | Sunny bed / greenhouse | Light and warmth |
| Purple | Flowers for pollinators | Bees visit |
| Grey | Path / shed | Access |
| Red | Pests (slugs, aphids) | Eat crops |

**Moon Base (space).** Base: regolith. Brief: "A base where four astronauts can live for a month."

| Colour | Tile | Meaning |
|---|---|---|
| Grey | Habitat module | People live here |
| Yellow | Solar array | Power (sunlit only) |
| Blue | Ice mine | Water and oxygen |
| Green | Greenhouse | Food |
| Purple | Rover garage / lab | Exploration |
| Red | Crater / radiation zone | Danger |

**Kick Lab (sport).** Base: pitch. Brief: "Set up your team so it can defend and score."

| Colour | Tile | Meaning |
|---|---|---|
| Blue | Our players | Our team |
| Red | Other team | Opponents |
| Yellow | Ball | Where play is |
| Grey | Goal / posts | Target |
| Green | Open space | Room to run (explicitly placed) |
| Purple | Coach's arrow | Direction to move |

**Beat Lab (music).** Base: silence (rest). The grid is a step sequencer, the Mario Paint composer precedent: columns 1–8 are beats in time, row bands are instruments. Brief: "Make a beat for a ___ (dance / lullaby / march)."

| Colour | Tile | Meaning |
|---|---|---|
| Red | Kick drum | Low thump |
| Yellow | Snare / clap | Sharp hit |
| Blue | Bass note | Low tune |
| Green | Melody note (row = pitch) | Tune |
| Purple | Shaker | Texture |
| Grey | Hold / long note | Sustain |

### 9.5 The scripted classifier

There is no live AI. The classifier is a deterministic function: grid → label + "% sure" + highlighted cells + world change + facilitator card.

**Features computed** (all cheap; 64 cells):
- `count[c]` for each colour, and `share[c] = count/64`
- `largestCluster[c]`: the largest 4-connected component
- `touches(a,b)`: number of a–b cell adjacencies
- `edge[c]`: count in the outer ring; `centre[c]`: count in the inner 4×4
- `rowsWith[c]`, `colsWith[c]`: spread
- `path(a→b)`: whether a 4-connected route of permitted cells exists (river continuity, astronaut walking route)
- `side(c)`: centre-of-mass quadrant (north/south, for shade or slope)
- Beat Lab only: `onBeats[c]` (columns 1, 3, 5, 7 vs 2, 4, 6, 8), `density[col]`, `rowSpread`

**Labels.** Each lab has 4–6 labels, each with a score function (a weighted sum of features).

**Confidence formula.**
- `top`, `second` = the best two scores
- `sure = clamp(50 + 45 * (top - second) / (top + second + 0.01), 51, 97)`
- Never show 100%. Show below 60% as "not sure" in the helper's speech style.

**Scripted biases.** Each lab has three "blind spots" built into the weights, which produce the planned misreads (below):
- **Majority rule:** reads the biggest colour as the whole story.
- **Ignores time or order:** for example night, the sequence of beats.
- **Edge blindness:** the outer ring is down-weighted at 0.5.
- **Training-data bias:** for example it was "trained on Earth", "trained on parks", "trained on pop songs".
- **Spurious correlation:** colour treated as meaning, for example "lots of blue = sad".

**"Why" overlay.** After the guess, the cells that contributed most glow on screen and on the printout. Children check whether the AI looked at the right things (VL/HCC 2021; Breakable Machine).

**Determinism.** The same grid always gives the same answer. This is essential for the facilitator and for the "change 3 tiles" experiment.

### 9.6 Designed misreads (three per lab)

**Eco Town**
1. **"Sunny Power Town – lights on all night, 88% sure."** Trigger: many yellow cells, no purple. Blind spot: ignores night. The world dims at dusk and the houses go dark.
   - Ask: "What did the AI forget about the sun?"
2. **"Forest, not a town, 71% sure."** Trigger: green is the majority colour. Blind spot: majority rule.
   - Ask: "Is a town with lots of trees still a town?"
3. **"Wind farm works great, 64% sure."** Trigger: turbines placed among trees and houses. Blind spot: ignores sheltering.
   - Ask: "Where does wind blow best?"

**River Town**
1. **"Lots of little ponds, 67% sure."** Trigger: blue placed in broken segments; `path` fails. Children meant a river.
   - Ask: "How would the AI know these blues join up?"
2. **"Tidy, safe river, 90% sure."** Trigger: reeds replaced by grey and yellow walls. Blind spot: trained on parks. The storm floods downstream houses.
   - Ask: "Who decided 'tidy' means safe?"
3. **"Flood risk: low, 58% sure."** Trigger: houses on the outer ring next to blue. Blind spot: edge.

**Grow Lab**
1. **"Super-healthy farm, 92% sure."** Trigger: mostly green, no purple. Bees never arrive and the fruit doesn't set.
   - Ask: "What's missing that the AI didn't count?"
2. **"Pest problem! 73% sure."** Trigger: purple flowers next to red. Blind spot: confuses similar colours and clusters.
   - Ask: "Did the AI mix up helpers and pests?"
3. **"Not enough water, 61% sure."** Trigger: blue placed on the edge. Blind spot: edge.

**Moon Base**
1. **"Lakeside camp, Earth-style, 81% sure."** Trigger: blue next to green and grey. Blind spot: "I was trained on Earth photos."
   - Ask: "Why would an AI trained on Earth get the Moon wrong?"
2. **"Safe base, 77% sure."** Trigger: craters on the outer ring next to habitats. Blind spot: edge.
3. **"Plenty of power, 85% sure."** Trigger: solar arrays clustered on the shaded (south) half. Blind spot: ignores `side`.

**Kick Lab**
1. **"Our team will win, 86% sure."** Trigger: more blue than red. Blind spot: counting players is not tactics.
   - Ask: "Does having more players near the ball mean you'll win?"
2. **"Defending formation, 63% sure."** Trigger: a symmetric layout that children meant as attacking. Blind spot: ignores purple arrows.
3. **"Ball is safe, 70% sure."** Trigger: a red player is adjacent to the ball. Blind spot: misses adjacency.

**Beat Lab**
1. **"Sad song, 79% sure."** Trigger: blue is the majority. Blind spot: colour-as-mood spurious correlation.
   - Ask: "Can a colour be sad? What makes music sound sad?"
2. **"Heartbeat, not music, 68% sure."** Trigger: regular red only. Blind spot: majority rule.
3. **"Dance beat, 83% sure."** Trigger: a lullaby brief with dense red and yellow. Blind spot: trained mostly on pop songs; ignores the brief.

### 9.7 Tap-copy UI (browser, facilitator or child)

**Layout** (landscape tablet or laptop):
- **Left:** the 8×8 grid, about 60% of the height, with the same A–H/1–8 labels as the mat.
- **Right:** the live voxel island preview, so each tap changes the world (the Townscaper principle).
- **Bottom:** a palette of 7 big buttons (6 colours + eraser/base), each about 64 px with the same icon and pattern as the tile.

**Interaction**
- Choose a colour, then tap or drag across cells to paint.
- Tapping a cell already in the selected colour resets it to base.
- No text entry and no timer.

**Copy helpers**
- A "Row by row" mode highlights one row at a time, matching the mat. This turns copying into a group task: one child reads "row 3: blue on C and D", another taps.
- Counter chips ("Yellow 6 · Blue 4 …") let the group check against the mat.

**Main button: "Ask the AI helper"**
- A short "thinking" animation (scripted).
- A speech bubble with the label and "% sure".
- The "why" cells glow.
- The world animates its consequence.

**After the guess**
- A facilitator card appears with a question and a "Change 3 tiles" prompt.
- Re-running keeps a history strip of the last three guesses as before/after thumbnails.

**Hidden facilitator menu** (long-press the logo):
- Load 6 preset grids per lab: the three designed misreads plus three good designs. A facilitator can then show a misread even if no group triggered one.
- Reset.
- Print.

**Privacy.** No camera, no storage beyond the session (in-memory). Optional local print only.

### 9.8 End artefact

An A5 or half-A4 printed "Habitat Blueprint" (labelled per lab: "Energy Plan", "Flood Plan", "Garden Plan", "Base Plan", "Team Plan", "Beat Score"). It contains:
- The final 8×8 grid in colour + icon.
- The AI's first guess and final guess, each with "% sure".
- The "why" cells outlined.
- A tick-box line: "The AI was ☐ right ☐ wrong ☐ half-right because …" (picture options for younger children).
- "The 3 tiles we changed" (auto-listed coordinates).
- Lab stamp and date. No names, or first names only, written by hand.

Paper-free fallback: the physical mat itself, photographed by the venue if its own policy allows.

### 9.9 Facilitator questions (generic set; each lab card adds its own)

1. "Before we press the button, what do you think the AI will say? How sure?" Prediction first.
2. "Which tiles did the AI look at? Were they the important ones?"
3. "Why is it only 63% sure? What would make it more sure, or less?"
4. "Is the AI wrong, or did we build something it has never seen?"
5. "If we change only three tiles, which three would change its mind?"
6. "Would a real (hedgehog / astronaut / gardener / footballer / musician) agree with the AI?"
7. "Who should decide: the AI, you, or the person who lives there?"

---

## 10. Variant: "Write Your Own Card" with picture tiles

**Goal.** Children write their own instruction card instead of choosing one of three, so they experience making a vague instruction and repairing it. This also brings the "deliberately vague card" into their own hands.

**Card strip.** A printed 4-slot strip (A4 landscape, slots of about 60 × 60 mm), in the order **DO → WHAT → WHERE → HOW**.

**Tiles** (picture plus one word, 50 mm, printed on card):

| Slot | Tiles (per lab, about 6 each) | Example (River Town) |
|---|---|---|
| DO (verbs, shared across labs) | Add · Remove · Move · Make bigger · Make smaller · Protect | Add |
| WHAT (lab nouns, = the grid colours) | The 6 lab tiles | Reeds |
| WHERE | Near ___ (pick a second noun) · At the edge · In the middle · North · South · Everywhere | Near houses |
| HOW (modifiers) | Clear: "3 of them", "a little", "only here". Vague, marked with a fog/cloud icon: "nice", "safe", "better", "more", "tidy" | Safe ☁ |

**How the scripted AI handles it**
1. **DO + WHAT + WHERE** map to a deterministic grid edit. For example, Add Reeds Near houses places reeds on base cells next to grey cells, up to 4. This is rule-generated, not hand-authored, so all combinations work: 6 × 6 × 6 × 5 ≈ 1,080 per lab.
2. **Each vague HOW tile** has one scripted assumption per lab: 5 vague tiles × 6 labs = 30 lines to write. The AI shows the assumption explicitly before acting, for example: "I guessed 'safe' means 'no water near houses'. 61% sure." It then acts on that guess: it removes the reeds and builds a wall, and the downstream town floods.
3. **Clear HOW tiles** give high confidence (85–95%) and a predictable edit.
4. **The re-classifier runs afterwards**, so the habitat label and % sure update. This links the variant to section 9.

**Loop**
1. The group builds a card (2 min).
2. Optional swap: groups exchange cards and predict what the AI will do (1 min). This is the "tester" step from the VL/HCC study.
3. Run and see the assumption plus consequence.
4. Repair: swap exactly one tile and re-run.

**Facilitator questions**
- "Which tile made the AI guess?"
- "What could 'safe' mean to a duck? To a house owner?"
- "Swap one tile to make it impossible to misunderstand."
- "Was your first card wrong, or just open to more than one meaning?"

**Artefact.** A printed "Our Clear Instruction" card showing the first card (with its fog tile), the AI's assumption, the repaired card, and the before/after island thumbnails.

**Age adaptation**
- Ages 7–8: use only DO + WHAT + HOW (three slots); the AI picks WHERE and says so.
- Ages 11–13: add a fifth "BUT NOT" slot for a constraint, for example "but not the pond".

---

## 11. Recommendations

1. **Keep the physical grid; drop the camera.** Use a printed mat plus tap-copy. Bloxels' and Osmo's capture problems are the main tangible failure; the tangible-collaboration gains (Horn 2009, Kim 2017) come from the physical object, not from scanning it.
2. **Use one cross-lab colour-family grammar, with an icon and pattern on every tile.** Six meanings per lab, as with Bloxels' 8 block types, plus accessibility that Bloxels lacked.
3. **8×8 for ages 9+, 6×6 for ages 7–8, with a base colour pre-filled.** Avoids the build and copy time of a 13×13 grid.
4. **Make the world react to every tap** (Townscaper, Mario Maker playtest) and make the AI's "why" visible: highlighted cells plus "% sure" (VL/HCC 2021).
5. **Script three misreads per lab around named blind spots,** with preset grids so facilitators can always show one (AI for Oceans; AI Unplugged's "models are not perfect").
6. **"Change exactly 3 tiles" as the retry rule.** A controlled experiment children can reason about, and it keeps retries under 3 minutes.
7. **Prediction before reveal.** Groups guess the label and % sure before pressing the button (Exploratorium facilitation moves; the VL/HCC peer-testing pattern).
8. **Wide walls, narrow brief.** Each lab brief should have several valid "good" labels, to avoid Bloxels' "too similar" problem (Scratch / Hill and Shaw).
9. **Picture-first cards.** Under-9s struggled with text cards in AI Unplugged. One-word labels plus icons; fog icon for vague tiles.
10. **No sharing infrastructure; the printed blueprint is the share.** Avoids the LittleBigPlanet, Spore and Roblox moderation burden and the Mario Maker and LittleBigPlanet server-loss problem. Matches Simon's note on privacy in children's museums.
11. **Short and self-contained** (Toca Boca). Each grid round about 8 minutes; the AI being wrong is the fun, not a failure.
12. **Use Antle's Youtopia (tangible land-use planning for ages 7–10) and Horn's Tern as the research citations** in partner materials when justifying the physical mat. Avoid overclaiming: Marshall 2007 and Horn, Crouser and Bers 2012 say tangible benefits depend on the situation.

---

## 12. Open gaps

- **Labo lifetime total, all kits:** not published. The latest found is 1.39M (mid-2018).
- **Game Builder Garage after 2022:** not found. 1.15M is the latest.
- **Scratch live totals:** the official API timestamp was July 2024 (164.3M projects / 135.1M users). Check https://scratch.mit.edu/statistics/ for today's figure.
- **LEGO Worlds:** no official total; about 918k Steam copies is an estimate.
- **Bloxels:** no founder post-mortem, no units-sold figure and no peer-reviewed classroom study found. The "25,000 classrooms" figure is vendor-reported. A direct interview with Pixel Press would close this gap.
- **No data found:** Strawbies outcomes, LEGO SPIKE adoption, MakeCode Arcade usage, PICO-8/PuzzleScript with young children, and Pokémon creature creation (no first-party creature creator exists; Spore is the better analogue).
- **Rough guesses to check in pilot:**
  - colour-blind prevalence (about 1 in 12 boys, a common estimate)
  - "15–30 tiles per design"
  - copy time under 3 minutes
