# Eco Town: research for a six-level world-building AI lab

*DeltaOps Learning research, 5 November 2026. Written in response to the client's rejection of the earlier Eco Town design ("nothing more than a drop down menu"). Sources are linked inline. Claims from earlier DeltaOps reports are marked with the report they come from (for example `round-3/01`). Figures are given so that designers can rank options. They are not for display to children as exact facts.*

---

## 0. Summary

**What the client is asking for.** The client wants a world-building game, not a calculator. In practice that means:

- a large site that starts empty;
- six levels that end in a complete town;
- decisions across the whole of sustainable community design (materials, streets, food, water, energy, waste, nature, homes and community spaces), not just energy;
- decisions that are different enough for two groups to end up with towns that look and work differently.

**What the reference games say.** The games that make players feel they built the world share five features:

1. Players place and paint things directly on the map; they do not pick from a list (Townscaper, SimCity, Cities: Skylines, Block'hood).
2. Neighbouring things affect each other, so consequences come out of the layout (SimCity zoning, Block'hood inputs and outputs, Cities: Skylines pollution and land value).
3. The map changes visibly and spreads (Terra Nil's greening).
4. Some choices lock in (Frostpunk's laws, Cities: Skylines milestones).
5. Citizens visibly react (Chirper, Frostpunk's Hope and Discontent, Anno's needs tiers, Before We Leave's happiness).

**What this means for Eco Town.** The proposed core loop has two hands working on the map:

- **The children's hands.** Children paint and place directly on a large voxel island (about 16 × 16 plots), with undo inside each level.
- **The AI helper's hands.** Children give the AI helper "big job" instruction cards, such as "Lay out the streets" or "Grow food for everyone".
  - The helper previews its plan as a ghost overlay with a "% sure" score.
  - The plan contains a scripted, plausible, confidently wrong assumption.
  - The children notice the problem in the world, through the overlays and the residents' reactions.
  - They fix it with a clearer card or better information, then commit the plan.
- **Locking in.** At the end of each level, the "foundations set" and that level's choices become permanent.

Progress is shown by seven town gauges (Homes, Food, Nature, Health, Energy, Community, Carbon). Every gauge needs to clear a "good enough" line, and towns win in different ways by which gauges they push highest. This gives towns such as *Garden Village*, *Cycle Town*, *Wetland Town* and *Market Town*, each of which is "complete".

---

## 1. How the reference games structure building, progression and choice

### 1.1 Game-by-game notes

**SimCity (1989) and SimCity (2013), Maxis**
- **Building.** Players paint residential, commercial and industrial (R/C/I) zones, and buildings grow on their own. This "zone, don't build" model is the base of every city-builder since ([Wikipedia, SimCity 1989](https://en.wikipedia.org/wiki/SimCity_(1989_video_game))).
- **Design philosophy.** Will Wright called SimCity a "software toy": "it forces you to determine the goals" ([Rouse interview](https://flylib.com/books/en/4.479.1.114/1/)). On control: "the sims don't obey… there's a certain amount of entropy" ([Wired, archived](https://docslib.org/doc/835090/will-wright-the-mayor-of-simcity)).
- **SimCity 2013.** The GlassBox engine replaced statistics with agents that "carry information through the simulation". Its **data layers** showed pollution, power and police coverage directly on the map ([PC Gamer](https://pcgamer.com/simcity-inside-the-glassbox-engine); [Wikipedia](https://en.wikipedia.org/wiki/SimCity_(2013_video_game))).
- **Specialisation.** Ocean Quigley described city specialisation as emerging from the bottom up, not chosen from a menu ([Wikipedia](https://en.wikipedia.org/wiki/SimCity_(2013_video_game))).
- **When is the town "complete"?** Never. There is no win state; the player sets the goals.
- **Warning.** Always-online servers made the 2013 game "unplayable by many gamers for weeks" ([CBC](https://www.cbc.ca/news/science/electronic-arts-closes-maxis-studio-makers-of-simcity-and-the-sims-1.2982873)).

**SimCityEDU: Pollution Challenge! (GlassLab, 2013)**
- **Setting.** Players are the mayor and must cut pollution while keeping jobs and residents happy. It was aimed at grades 6–8 ([MacArthur](https://www.macfound.org/press/grantee-news/simcityedu-video-game-emphasizes-21st-century-skills-learning-assessment)).
- **Structure.** Missions with three to five challenges each ([Common Sense Media](https://www.commonsensemedia.org/game-reviews/simcityedu-pollution-challenge); other sources say four missions).
- **Evidence tasks.** Some tasks asked students to build flow charts and use textual evidence.
- **Assessment.** An ETS "assessment engine" turned in-game actions into evidence of systems thinking ([PR Newswire](https://prnewswire.com/news-releases/ets-experts-lead-assessment-research-behind-glasslabs-educational-games-230989101.html)).
- **Classroom reception.** Teachers called it "not the normal assessment" ([KQED MindShift](https://www.kqed.org/mindshift/32389/let-the-games-begin-students-and-teachers-dive-into-simcityedu)). Reviewers found evidence of learning outcomes thin at launch ([EdSurge](https://www.edsurge.com/n/2013-11-24-review-going-to-town-on-simcityedu)).
- **Lesson.** Short, goal-led missions inside a sandbox city work in classrooms. Asking children to *explain the cause* is where the learning is.

**Cities: Skylines (2015) and Cities: Skylines II (2023), Colossal Order**
- **Building.** Roads, then zones, then services. The first game has 19 info views (pollution, noise, land value, traffic and others). The sequel has 33, and the relevant view opens automatically with the build menu ([Paradox dev diary 9](https://admin-forum.paradoxplaza.com/forum/developer-diary/cities-skylines-dev-diary-9-info-views.833752/post-18849702); [CS2 info views guide](https://gameplay.tips/guides/cities-skylines-ii-info-views-guide.html)).
- **Feedback through layout.** Noise and pollution lower land value, so placing industry next to homes is visible on the map ([gamepressure](https://www.gamepressure.com/citiesskylines/information-panel/za7595)).
- **Progression.**
  - In the first game, 13 milestones were unlocked by population, which meant one path forward: build more homes.
  - In CS2, 20 milestones are unlocked by Expansion Points earned from population, happiness *and* actions. Development Points let players choose what to unlock, in any order ([Colossal Order dev diary 10](https://colossalorder.fi/news/development-diary-10-game-progression/); [Paradox](https://www.paradoxinteractive.com/games/cities-skylines-ii/features/game-progression)).
  - Milestones cannot be reset ([Steam discussion](https://steamcommunity.com/app/255710/discussions/0/1739968490572137730)).
- **Citizen feedback.**
  - **Chirper.** A citizen social feed. Complaints about utilities usually point to a real problem ([TechRadar](https://www.techradar.com/gaming/consoles-pc/cities-skylines-2-has-created-my-arch-nemesis-and-its-made-me-love-the-game-more)).
  - CS2 lets players follow individual citizens and see what drives their happiness ([PC Gamer](https://pcgamer.com/chirper-might-actually-be-useful-for-keeping-track-of-your-citizens-lifepaths-in-cities-skylines-2)).
  - **Critique:** citizens feel "decorative"; unhappy citizens either complain or leave, "there is no point in between" ([Parcitypatory](https://parcitypatory.org/2020/07/26/cities-skylines/)).
- **When is the town "complete"?** At the final milestone (Megapolis), but play continues.

**Townscaper (Oskar Stålberg, 2020/21)**
- **Building.** Pick a colour, click to add or remove; the town assembles itself.
- **Rules.** They must be "discoverable" and "predictable": "whenever you make an enclosed area… it has to become a garden".
- **No score.** "If you have scoring… the user will start to play towards the score instead of… their intrinsic sense of what's beautiful."
- **Audience.** Played by "kids as young as three".
- All points from the [Konsoll talk](https://www.youtube.com/watch?v=5xrRTOikBBg) (see `round-3/01` §3.2).
- **Lesson.** Painting that the world answers with sensible structure is what makes it feel like *your* town.

**Terra Nil (Free Lives, 2023)**
- **Structure.** A "reverse city-builder" in three phases: clean the soil and water, build biomes, then recycle every machine and "leave no trace". Stranded machines cost you the clean exit ([TechRaptor](https://Techraptor.net/gaming/reviews/terra-nil-review); [Game Developer](https://www.gamedeveloper.com/design/why-a-recycling-mechanic-saved-terra-nil-s-climate-cleanup-mechanics)).
- **Feedback.** Greening spreads visibly, and animals arrive when their habitat needs are met ([PC Gamer](https://www.pcgamer.com/transforming-a-barren-wasteland-into-a-leafy-green-paradise-feels-damn-good-in-terra-nil/)).
- **Caution.** Controlled burns can kill animals the player has just attracted ([Roundtable Co-op](https://roundtablecoop.com/reviews/terra-nil-review-making-the-world-better/)).
- **When is the town "complete"?** It is defined by a list of habitat targets for each map, and then the clean exit.

**Eco (Strange Loop Games, 2018)**
- **Setting.** A shared world with a simulated ecosystem. A meteor arrives in 30 days, and players must build the technology to stop it without wrecking the planet.
- **Consequences.** Pollution can raise sea levels, and over-harvesting can make species extinct ([Wikipedia](https://en.wikipedia.org/wiki/Eco_(2018_video_game))).
- **Laws.** Players propose laws, vote on them and argue for them with in-game ecosystem data ([Eco wiki: Laws](https://wiki.play.eco/en/Laws)).
- **Short-term temptation.** The game "rewards exploitation at least in the short term" ([Cliqist](https://cliqist.com/2017/04/26/strange-loop-games-challenges-climate-deniers-eco/)).
- **Origins and school use.** It was partly funded by the US Department of Education. Krajewski described middle-schoolers celebrating getting pollution under control ([GamesBeat](https://gamesbeat.com/how-eco-gives-gamers-the-same-global-warming-problem-as-scientists); [Killscreen](https://www.killscreen.com/enough-with-post-apocalypse-time-for-pre-apocalypse/)).
- **Lesson.** Data views used as *evidence for a decision* are a natural fit for "better information" fixes.

**Block'hood (Plethora Project / Jose Sanchez, 2017)**
- **Building.** A vertical neighbourhood builder in which ecology matters more than economy.
- **Inputs and outputs.** Every block has inputs and outputs. A tree needs water and gives oxygen; a shop needs customers. Blocks whose needs are not met **decay** and are abandoned ([Creative Applications](https://www.creativeapplications.net/project/blockhood-vertical-city-simulator-with-focus-on-ecology-decay-and-coexistence/); [Dezeen](https://www.dezeen.com/?p=862243); [Scottish Construction Now](https://www.scottishconstructionnow.com/articles/and-finally-video-games-can-help-solve-global-design-challenges-claims-architect)).
- **Lesson.** Placement-driven input and output chains turn a sustainability lesson into a spatial puzzle. This is the strongest match for Eco Town's voxel grid.

**Before We Leave (Balancing Monkey, 2020)**
- **Setting.** A peaceful builder on hex islands with no combat.
- **Happiness and pollution.** Happiness drives productivity. Pollution and a "potato-only diet" make people unhappy ([Impulse Gamer](https://www.impulsegamer.com/?p=164468); [Gaming Cypher](https://gamingcypher.com/before-we-leave-review-for-pc)).
- **Criticism.** It "slowly loses its appeal after a cosy first few hours" ([OpenCritic](https://opencritic.com/game/9408/before-we-leave/reviews?sort=score)), and pressure creeps in unannounced (`round-3/01`).

**Frostpunk (11 bit studios, 2018)**
- **Citizen feedback.** Two bars, Hope and Discontent, each averaging about 13–14 needs per citizen.
- **Laws.** They were moved into a Book of Laws that players open when they choose, because pop-up decisions removed agency ([PC Gamer](https://www.pcgamer.com/frostpunk-developers-on-hope-misery-and-the-ultimately-terrifying-book-of-laws/)).
- **Irreversibility.** Signed laws cannot be cancelled, some laws close off others, and Faith and Order are mutually exclusive paths ([gamepressure](https://www.gamepressure.com/frostpunk/the-book-of-laws/zca19a)).
- **Lesson.** A small number of irreversible choices that change how the place *is run* make players own the result ("Did I really do that?", `round-3/01`).
- **Fit for children.** Its tone is unsuitable for ages 8–14, but the structure transfers.

**Anno 1800 (Ubisoft Mainz)**
- **Needs tiers.** Five population tiers (farmers to investors). Basic needs drive growth; luxury needs raise happiness.
- **Upgrading.** Houses upgrade to the next tier when full and supplied, and settlements are named by size (village, port town, city) ([Anno wiki](https://anno1800.fandom.com/wiki/Population?oldid=3313)).
- **Lesson.** Visible upgrades to *buildings* when needs are met are a strong progress signal.

**Floodland (Vile Monarch, 2022)**
- **Setting.** A climate-flooded world. The player starts by choosing one of four clans with different worldviews and must keep rival clans content ([PC Gamer](https://www.pcgamer.com/floodland-review/); [GamesRadar](https://gamesradar.com/floodland-review)).
- **Criticism.** There is "no clear indicator regarding the reaction of other integrated clans to the decisions you make" ([Prima Games](https://primagames.com/reviews/floodland-review-pc)).
- **Lesson.** Values-driven groups make choices meaningful, but only if their reactions are legible.

**Minecraft Education: Sustainability City (2021)**
- **Content.** A free world with six lessons on home sustainability, waste, electricity and forestry, based on Microsoft's sustainability report. Players explore and learn how processes work ([Minecraft Education blog](https://education.minecraft.net/en-us/blog/sustainability-city-minecraft-education-edition); [Radical Recycling](https://education.minecraft.net/blog/this-earth-day-dive-into-radical-recycling-in-sustainability-city)).
- **Lesson.** It is an exploration world, not a decision world, and that is exactly the gap Eco Town fills.

**Plan It Green (National Geographic, 2009) and Plan It Green: The Big Switch (National Geographic, GE and Center for Science, 2013)**
- **Content.** The player is mayor of "Greenville" and makes energy retrofits, adds clean-energy jobs and builds green buildings ([GE](https://www.ge.com/news/press-releases/national-geographic-ge-and-center-science-launch-plan-it-green-big-switch); [Common Sense Media](https://www.commonsensemedia.org/game-reviews/plan-it-green)).
- **Lesson.** It is energy-centred, the very framing the client has rejected.

**Climate Quest (EarthGames, University of Washington)**
- **Content.** About 10 minutes long, for ages 8+, designed for museums, classrooms and homes. Every event was vetted by climate scientists ([itch.io](https://earthgamesuw.itch.io/climate-quest)).
- **Lesson.** Short and accurate, but not a builder.
- **Other children's climate games.** Zenergi's *Climate Crisis* is a free SimCity-style game for UK schools ([FE News](https://www.fenews.co.uk/?p=65393)).

### 1.2 Cross-cutting patterns

| Design question | What the games do | What it means for Eco Town |
| --- | --- | --- |
| **Zoning versus placing** | SimCity and CS paint zones and buildings grow. Townscaper and Block'hood place blocks one at a time. | Do both. Children *paint* land use (homes, farm, wild, street) with a brush. Special buildings (school, clinic, market, wetland) are *placed* as single pieces. |
| **Unlocks and gates** | CS1 gates by population (one path). CS2 uses points plus a choice of unlock order. Terra Nil uses phases. Anno uses needs tiers. | Six fixed levels, each unlocking a new ring of land and a new toolbox. Within a level, children choose the order. |
| **Citizen feedback** | Chirper (social feed). Frostpunk (two averaged bars). Anno (house upgrades). Floodland (clans). CS critique: citizens feel decorative. | About 30 named voxel residents with thought bubbles, plus 4–5 resident *groups* with different values (see §2.5). Residents move in, upgrade, cycle, garden, or leave, all visibly. |
| **Trade-offs** | Pollution versus jobs (SimCityEDU). Short-term reward versus collapse (Eco). Inputs versus outputs (Block'hood). | Every option moves at least two of the seven gauges in opposite directions (§5). |
| **Overlays** | SimCity 2013 data layers. CS info views (the relevant view opens with the tool). Eco's evidence graphs. | Six child-friendly "lenses" (flood, walking time, wildlife paths, sun and wind, noise and air, carbon). The right lens opens when a tool is picked, and lenses are how children catch the AI's mistakes. |
| **"Complete" state** | SimCity and Townscaper: never. CS: last milestone. Anno: settlement rank. Terra Nil: habitat targets plus a clean exit. Eco: the meteor stopped. | "Complete" means every gauge is above its *floor*, Carbon is under its *ceiling*, every resident has a home and a 15-minute walk to daily needs, and the Town Charter is signed (§5). |
| **Divergent results** | SimCity 2013 specialisation; Frostpunk paths; Floodland clans; Islanders layouts. | Each level offers 3–4 *genuinely different* options that change the look of the map, so six levels give many visibly distinct towns (§4). |

---

## 2. What makes young players feel they are building their own world

### 2.1 Direct placement and painting

- **Why it matters.**
  - In Townscaper the only verbs are "pick a colour, add, remove blocks", and three-year-olds can play it (`round-3/01`).
  - Self-determination research finds that games motivate mainly through **autonomy** and **competence**, and that in-game autonomy predicts enjoyment ([Ryan, Rigby & Przybylski 2006](https://link.springer.com/content/pdf/10.1007%2Fs11031-006-9051-8.pdf)).
  - The "IKEA effect" shows that people value things they built themselves about as highly as expert work, but **only when they finish them**; the effect disappears for unfinished or destroyed builds ([Norton, Mochon & Ariely 2012](https://dash.harvard.edu/handle/1/12136084)).
- **For Eco Town.**
  - Use brushes for land use and a stamp for buildings, with drag-to-paint streets and paths.
  - Allow undo within a level (an animated rewind, `round-3/01` #4).
  - Guarantee that every group *finishes* a town in the session. A short mode is described in §4.8.

### 2.2 Emergent consequences

- **Why it matters.** Block'hood's input and output decay, SimCity's zoning interactions and CS's noise and land value make the layout itself the decision.
- **For Eco Town.** A small set of **adjacency rules** that are discoverable and predictable, in Stålberg's sense:
  - homes next to a busy road become noisy;
  - an orchard next to a meadow brings bees, and nearby gardens yield more;
  - a wetland downstream of streets cleans run-off;
  - a school more than 10 minutes' walk from homes means more car trips.
- Children learn these rules and use them on purpose, which is the "I built this" feeling.

### 2.3 Visible change on the map

- **Why it matters.** Terra Nil's spreading green and Anno's house upgrades.
- **For Eco Town.**
  - Each level visibly transforms the island: streets appear, roofs change colour with materials, fields get crop textures, water fills rain gardens, wildlife arrives along corridors.
  - Use a day and night cycle to show energy (lit windows at dusk), drawing on the unused `island-town-dusk.png` in the brochure.

### 2.4 Irreversible choices

- **Why it matters.** Frostpunk's laws cannot be cancelled, and CS milestones cannot be reset. Irreversibility gives choices weight. Undo removes anxiety *while experimenting* (Townscaper, Tiny Glade).
- **For Eco Town.** **Undo within a level, then lock in at the end of it.** The "Foundations set" stamp turns that level's choices to stone, and later levels must live with them. For example, a car-led street grid in Level 2 makes walking times longer in Level 6.
- This is also the route to "very different towns": early choices compound.

### 2.5 Citizens who react

- **Why it matters.**
  - Frostpunk's Hope and Discontent are averaged from real needs.
  - The CS critique is that citizens are decorative and only complain or leave.
  - Floodland's clan reactions were not legible.
  - RCT-style thought bubbles work well for children (`round-3/08` §2 and §5.5).
- **For Eco Town.**
  - **Named residents with thought bubbles** that point at things on the map ("The bus stop is too far!", "I can hear the bypass at night").
  - **Five resident groups**, each with one strong value, so that trade-offs have human faces. They give the debate a structure and avoid "one right answer":
    - the Young Families ("safe streets to school");
    - the Growers ("land for food");
    - the Nature Watchers ("leave room for wildlife");
    - the Makers and Shopkeepers ("customers and deliveries");
    - the Elders ("everything close and step-free").
  - **Gentle responses only.** Residents move in, upgrade their home, or move *to the edge*; they never die or suffer (`round-3/01` "Things to avoid").

---

## 3. The real dimensions of a sustainable community

Values below are rough orders of magnitude for designers. They should appear in the game as relative bands, such as "much more carbon" and "a little more carbon", not as numbers.

### 3.1 The frameworks to anchor on

- **UN SDG 11, "Sustainable cities and communities".** Four targets are relevant:
  - 11.2: safe, affordable, accessible and sustainable transport for all, with attention to children, older people and disabled people;
  - 11.3: inclusive, participatory planning;
  - 11.6: reducing the per-person environmental impact of cities, with attention to air quality and waste;
  - 11.7: universal access to safe green and public spaces, "in particular for women and children, older persons and persons with disabilities".
  - Sources: [UN-Habitat targets](https://unhabitat.org/sites/default/files/2018/07/SDG-11-Targets-and-Indicators.pdf); [UK SDG data](https://sdgdata.gov.uk/11); [UN metadata](https://unstats.un.org/sdgs/files/metadata-compilation/Metadata-Goal-11.pdf).
  - **Game link:** the seven gauges map onto these targets (§5).
- **The 15-minute city (Carlos Moreno).**
  - Daily needs (living, working, shopping, healthcare, education and leisure) should be reachable within about 15 minutes on foot or by bike.
  - The framework rests on density, proximity, diversity, and either ubiquity or (in later versions) digitalisation ([Wikipedia](https://Www.Wikipedia.org/wiki/15-minute_city); [Intertraffic](https://www.intertraffic.com/news/15-minute-city-urban-mobility-solution-to-environment)).
  - **Game link:** the walking-time lens and the Community gauge.
- **Vauban, Freiburg.**
  - Large parts of the district are "parking-free": cars park in community garages at the edge.
  - Car-free households did not have to buy a space, which saved more than 25,000 DM each ([EU LIFE project](https://webgate.ec.europa.eu/life/publicWebsite/project/LIFE97-ENV-D-000469/realisation-of-the-sustainable-model-city-district-vauban)).
  - Garage spaces were reported at about €17,500 ([Planetizen](https://www.planetizen.com/node/22385)).
  - Car-free households: about 40% in the parking-free blocks in a 2002 survey ([UWE report](https://uwe-repository.worktribe.com/OutputFile/982366)), and a widely repeated but weakly sourced figure of about 70% by 2009 ([Wikipedia](https://www.Wikipedia.com/wiki/Vauban,_Freiburg)).
  - **Game link:** the "car-free with edge parking" street option.
- **BedZED (London, 2002).** Monitoring found:
  - space-heating need 88% below the UK average;
  - electricity about 45% and hot water about 81% below the borough average;
  - water use about 50% lower, using rainwater for toilets;
  - car mileage about 65% lower, with one parking space per home and a car club.
  - **What failed:** the on-site "living machine" wastewater system, and recycling bins placed far from homes ([Passive House Plus](https://passivehouseplus.co.uk/blogs/bedding-sustainability-into-british-buildings-bioregional-s-bedzed); [BedZED seven years on](https://www.scribd.com/document/356297398/BedZED-seven-years-on-pdf)).
  - **Game link:** honest trade-offs. Not every green idea works, and distance changes behaviour.
- **Passivhaus.**
  - Space heating of 15 kWh/m²/yr or less, airtightness of 0.6 air changes per hour or less at 50 Pa, and mechanical ventilation with heat recovery ([Building Science Corp.](https://www.buildingscience.com/documents/insights/bsi-025-the-passivhaus-passive-house-standard); [Passivhaus primer](https://northtawtontowncouncil.gov.uk/wp-content/uploads/2025/09/Appendix-5.3.6.3-KN4430_Passivhaus_Primer_WEB.pdf)).
  - **UK example:** Goldsmith Street, Norwich, won the 2019 Stirling Prize. It has about 100 Passivhaus council homes in terraces, parking pushed to the edges, and energy bills estimated 70% below average ([Architizer](https://architizer.com/blog/inspiration/stories/goldsmith-street-stirling-prize/); [Dezeen](https://www.dezeen.com/2025/01/25/mikhail-riches-goldsmith-street-21st-century-architecture/amp/)).
  - **Game link:** the "super-insulated" upgrade, and terraces as a density option.
- **Permaculture.**
  - Three ethics: Earth Care, People Care and Fair Share.
  - Zones 0–5 run from the home (zone 0) out to wild land left alone (zone 5).
  - Forest gardens are layered from canopy to ground cover ([Brighton Permaculture Trust](https://brightonpermaculture.org.uk/permaculture/permaculture-ethics); [NC State Extension](https://content.ces.ncsu.edu/publication/appendix-g-permaculture-design)).
  - **Game link:** a "zones" layout for food (things you visit daily go nearest the homes), and the orchard and food-forest option.
- **Circular economy (Ellen MacArthur Foundation).** "Eliminate waste and pollution, circulate products and materials, regenerate nature" ([EMF](https://emf.org/about-us/ellens-story)).
  - **Game link:** the waste decisions in Level 5.

### 3.2 Dimensions, options and trade-offs (child-friendly)

#### Building materials

| Option | What children see | Good | Trade-off | Evidence |
| --- | --- | --- | --- | --- |
| **Timber frame** | Warm brown walls; a forest plot on the island is needed | Low embodied carbon and stores carbon. Median whole-life embodied carbon of timber frames is lower than concrete or steel (119 vs 185 vs 228 kgCO₂e/m²). | Needs well-managed forest; fire and moisture detailing | [Hart, D'Amico & Pomponi 2021, via Buildings & Cities](https://www.buildingsandcities.org/insights/commentaries/lca-databases.html) |
| **Straw bale** | Thick, rounded, cream walls; needs a grain field | Uses a farm by-product, insulates very well, and locks up plant carbon. A UK study estimated a 61% cut in whole-life CO₂ from carbon lock-up. | Thick walls take space; must be kept dry; low-rise only | [Core.ac.uk UK straw house study](https://core.ac.uk/download/51986.pdf); [Queen's thesis](https://queensu.scholaris.ca/items/1bd8d0d0-7fea-4ef2-bc8a-37aee4160616) |
| **Rammed earth** | Striped earth-coloured walls; dug from the site | Local and heavy, so it keeps homes cool in summer. Low carbon when not stabilised with cement. | Slow and labour-heavy; adding cement raises the carbon | [Giuffrida & Caponetto 2024](https://www.iris.unict.it/handle/20.500.11769/591312); [T&F chapter](https://www.taylorfrancis.com/books/9780429226533/chapters/10.1201/b18046-16) |
| **Concrete** | Grey blocks; tall buildings possible | Strong and fire-proof; allows flats and towers | Cement is carbon-heavy (CEM I cement about 0.84 kgCO₂e/kg) | [ICE values, via blog](https://shivamasthana.pages.dev/embodied_carbon_analysis.html) |
| **Steel** | Shiny frames; big halls and towers | Strong, light frames, long spans | High carbon when new (about 1.7 kgCO₂e/kg virgin steel; about 0.7 recycled) | [ICE values, via blog](https://shivamasthana.pages.dev/embodied_carbon_analysis.html) |
| **Recycled and reclaimed** | Patchwork colours; needs a reuse yard | Lowest new carbon, and good for the circular economy | Limited supply; mixed looks | [EMF principles](https://emf.org/about-us/ellens-story) |

*Note.* ICE values differ between versions and depend on whether stored carbon is counted. Use **relative bands** in the game. The ICE database is from the University of Bath ([Buildings & Cities](https://www.buildingsandcities.org/insights/commentaries/lca-databases.html)).

#### Streets and getting around

| Option | Map | Good | Trade-off |
| --- | --- | --- | --- |
| **Car roads (wide grid plus parking)** | Grey roads, driveways, car park | Quick door-to-door; easy deliveries | More land used, noise, unsafe for children's play. About 190 g CO₂e per km for a medium car with one person ([Our World in Data](https://ourworldindata.org/grapher/carbon-footprint-travel-mode?tab=chart)). |
| **Bicycle network** | Coloured lanes, bike sheds | Healthy, quiet, low carbon (cycling roughly 16–50 g per km) | Hills and weather; needs safe junctions |
| **Walking streets and living streets (woonerf)** | Narrow shared surfaces, benches, trees, play | Children can play outside; very low carbon. Woonerfs keep vehicles at walking pace ([walkinginfo.org](https://www.walkinginfo.org/de/calm/woonerf/index); [Wikipedia](https://Www.wikipedia.org/wiki/Living_street)). | Needs shops close by (density) |
| **Tram or bus spine** | One line through the town, with stops | Carries many people (rail about 41 g, bus about 105 g per passenger-km) | Costs land and energy; only good near the stops |
| **Car-free with edge parking (Vauban, Goldsmith Street)** | Cars stay in an edge garage; the inside is green | Safe, quiet, more room for gardens | Longer walk to the car; deliveries need a plan |

#### Food and farming

| Option | Map | Good | Trade-off | Evidence |
| --- | --- | --- | --- | --- |
| **Field crops (grain, veg, pulses)** | Big striped fields | Feeds many people; peas and beans are very low carbon (about 1 kgCO₂e/kg) | Big fields with no hedges mean fewer bees and birds | [OWID / Poore & Nemecek](https://ourworldindata.org/grapher/ghg-per-kg-poore?tab=table) |
| **Allotments and community gardens** | Small patchwork plots near homes | Health, mood and friendship benefits: allotment holders show better self-esteem and mood | Feeds fewer people per hectare; needs volunteers | [Wood et al.](https://westminsterresearch.westminster.ac.uk/item/99vv1/a-case-control-study-of-the-health-and-wellbeing-benefits-of-allotment-gardening); [Gulyas et al. 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC10941614) |
| **Orchard and food forest** | Layered trees, bushes and herbs | Wildlife, shade, stores carbon, low upkeep | Slow to grow (years); less staple food | [NC State permaculture](https://content.ces.ncsu.edu/publication/appendix-g-permaculture-design) |
| **Livestock (sheep, cows, hens)** | Grazing fields and barns | Milk, eggs and meat; grazing can keep meadows open | Beef about 99, lamb about 34 and cheese about 21 kgCO₂e/kg; needs lots of land | [OWID](https://ourworldindata.org/grapher/ghg-per-kg-poore?tab=table) |
| **Vertical farm** | A tall lit box | About 97 kg of lettuce per m² against about 3.3 kg in fields; little water | Very high electricity use: about 0.93 kgCO₂e/kg on renewables and 4.7 on grid power (UK field about 0.58) | [University of Surrey LCA via FarmingUK](https://www.farminguk.com/news/study-warns-vertical-farms-pump-out-more-emissions-than-fields_67225.html); [Anthropocene](https://www.anthropocenemagazine.org/2025/09/are-vertical-farms-really-the-answer-a-recent-study-reveals-a-surprisingly-large-footprint/) |

#### Water and drainage

- **Background.** UK sustainable drainage (SuDS) has four aims: water quantity, water quality, biodiversity and amenity ([Cornwall Council](https://www.cornwall.gov.uk/environment/countryside/flood-risk/sustainable-drainage-systems/); [UNDA summary of CIRIA C753](https://www.unda.co.uk/news/four-pillars-of-suds/)).
- **Options:**
  - **Pipes and drains:** hidden and quick, but send the flood downstream.
  - **Rain gardens and swales:** planted dips that hold and clean rain ([Lambeth](https://haveyoursay.lambeth.gov.uk/en-GB/projects/what-are-suds/1)).
  - **Green roofs plus rain butts:** less run-off, some wildlife.
  - **A wetland or reed bed:** cleans water and is excellent for wildlife, but takes land. The UK has hundreds of reed-bed treatment systems ([Wikipedia: reed bed](https://en.wikipedia.org/wiki/Reed_bed); [Bristol University](https://bristol.ac.uk/green/doing/our-achievements/waste-to-wildlife/)).
- **Schools.** The GLA's guide [Reimagining rainwater in schools](https://www.london.gov.uk/sites/default/files/reimagining_rainwater_in_schools_v1_.pdf) is directly usable for facilitator notes.

#### Energy

- **Options:**
  - **Rooftop solar:** quiet, but nothing in winter evenings.
  - **A small wind farm:** strong in winter, but noisy near homes and a risk to birds if badly sited.
  - **Heat pumps plus super-insulated homes:** lowest demand.
  - **Community-owned energy:** profits stay local.
  - **Grid or gas connection:** reliable, but high carbon.
- **Community ownership in the UK.** Community energy had about 411 MW of capacity in 2024 and reinvested £24.5m locally ([Community Energy England 2025](https://communityenergyengland.org/news/2025-state-of-the-sector-report-community-energy-surges-ahead-24-5m-reinvested-locally-movement-poised-to-scale-and-shape-whats-next)).
- **Lesson from BedZED.** On-site renewables are "sensitive to behaviour", so reliability matters ([Passive House Plus](https://passivehouseplus.co.uk/blogs/bedding-sustainability-into-british-buildings-bioregional-s-bedzed)).

#### Waste and the circular economy

- **Options:**
  - a landfill or tip;
  - a recycling centre;
  - a **repair café and reuse shop** next to the market;
  - **compost and an anaerobic digester** that feed the farms.
- **Lesson from BedZED.** Bins placed far from homes were used less, which is a direct "distance changes behaviour" rule for the map.

#### Nature corridors and biodiversity

- **Options:**
  - **hedgerows and tree lines;**
  - **stepping-stone patches** (Buglife's model: patches within about 300 m of each other let species move) ([BirdGuides](https://www.birdguides.com/news/major-nature-corridor-to-link-wildlife-across-east-london/));
  - **hedgehog highways** (13 cm × 13 cm holes in garden fences) ([Hedgehog Street](https://en.wikipedia.org/wiki/Hedgehog_Street); [Wildlife Trusts](https://www.cornwallwildlifetrust.org.uk/actions/how-create-hedgehog-hole));
  - **green bridges** over roads;
  - **wild "zone 5" land** left alone.
- **Urban corridors.** These need *several* stepping stones, not one bridge ([Zellmer & Goto 2022](https://www.frontiersin.org/articles/10.3389/frsc.2022.954089/pdf)).

#### Homes and density

| Option | Map | Good | Trade-off |
| --- | --- | --- | --- |
| **Detached houses with gardens** | Spread-out houses | Private gardens and space | Uses the most land; long walks, so more driving |
| **Terraces (Goldsmith Street style)** | Rows of joined houses | Warm (shared walls), front doors on the street, medium density | Smaller gardens |
| **Courtyard flats (3–5 storeys)** | Blocks around a shared garden | Most homes on least land; shops viable nearby | Needs lifts and shared spaces; less private outdoor space |
| **Cohousing cluster** | Small homes around a common house | Shared kitchen, tools and cars; strong community | Not everyone wants to share |

#### Community spaces

- **School, clinic, market or high street, library, park and playground, community hall, repair café, sports field.**
- SDG 11.7 stresses *access*. In the game, the walking-time lens shows which homes are within 10 or 15 minutes of each.

---

## 4. The six-level progression

### 4.1 Site and core loop

**The site.**
- One large floating voxel island in the brochure style: a grass top, soil band and stone underside, at about 64 × 64 voxels split into 16 × 16 plots of 4 × 4 voxels.
- It starts with landform only: a hill with a wood, a river with a floodplain meadow, a south-facing slope, a rocky edge and a coast.
- **Land opens in rings.** Level 1 opens the centre, and Levels 2–4 add more of the island, so the site grows in the way Cities: Skylines II's expansion permits do.

**What happens in each level (10–15 minutes each):**
1. **Mission card.** A short goal with two or three targets.
2. **Free build (children's hands).**
   - Paint land uses and place pieces from the level's toolbox.
   - The relevant lens opens automatically.
   - Residents comment as the map changes.
   - Undo is allowed.
3. **Big job for the AI helper.** The children pick one of three instruction cards: one vague and two clearer.
   - The helper shows a **ghost preview** of its plan on the map, with its reasoning in one line and a **"% sure"** score. This follows the Islanders preview pattern (`round-3/01` #2).
   - If the plan is applied, residents react, the gauges move and the relevant lens shows the problem.
4. **Facilitator card.** A question about what the AI assumed.
5. **Fix.**
   - **Clearer instruction:** a different card.
   - **Better information:** drag a "data sheet" (flood map, travel survey, wind chart) onto the helper.
   - The helper redraws its plan with a new "% sure" score.
6. **Foundations set.** A stamp, and that level's choices lock in.

**How the AI's mistakes are scripted.**
- The mistakes follow **consistent "AI rules"** that children can learn and predict (Stålberg's predictable recipes, `round-3/01` #5):
  1. **One-word optimising:** "best", "strong", "most" each get one meaning.
  2. **Assuming the typical case:** "everyone" means adults in cars.
  3. **Missing data:** the AI cannot see what it was not given.
  4. **Literal geometry:** "middle" is the centre of the map, not the centre of people.
- The helper's *wrong* plans are scripted for each level and each of the children's land layouts. A deterministic rules engine scores the children's own painting, so no live AI model is needed, in line with the brochure promise.

### 4.2 Level 1: "Read the land"

**Goal:** choose where the town will grow and what to protect. Target: settle the first 12 residents with a town square, and keep at least two habitats.

**Unlocks:**
- brushes for Homes (simple), Protect (habitat) and Town centre;
- lenses for Flood, Sun and wind, and Wildlife;
- the data sheets "Flood map" and "Habitat survey".

**Key decisions:**

| Decision | Options | Effect on map, citizens and gauges |
| --- | --- | --- |
| **Where to start the town** | A. Flat floodplain meadow by the river. B. South-facing slope above the river. C. Edge of the hilltop wood. D. Rocky coast near the harbour. | A: easy to build, but floods in Level 5 (Homes − later, Health −). B: sunny and dry (Energy +, but a walk to the river). C: shelter and timber, but the wood shrinks (Nature −). D: harbour trade (Community +), but exposed to wind. |
| **What to protect forever** | Wood, river meadow, wetland, or the hill's view. Choose two. | Protected land is locked green for the whole game. Each protected habitat keeps 2–3 species and their arrivals. |
| **Town shape** | Compact centre; a line along the river; small villages linked by paths; a ring around a central green. | This sets later walking times: compact is shortest and villages are longest, but villages keep the most green between them. |

**AI mistake:**
- **Vague card:** "Find the best land to build on."
- **AI guess:** "Best means flattest and easiest to build on, so I picked the river meadow." *(82% sure)*
- **What happens:** the ghost town fills the floodplain. When the Flood lens is opened, it pulses blue under 40% of the homes. The Nature Watchers worry about the otters.
- **Facilitator:** "What did 'best' mean to the AI? What could it not see?"
- **Fix:**
  - *better information:* drag the "Flood map" onto the helper; or
  - *clearer card:* "Build on dry, sunny land and keep the river meadow for water and wildlife."
  - The helper moves the plan to the slope *(91% sure)*.

### 4.3 Level 2: "Getting around"

**Goal:** connect homes, the centre and the edge of the island. Target: every home within 10 minutes of the town square by at least one way of travelling.

**Unlocks:**
- tools for Road, Cycle lane, Path, Living street, Tram stop, Bus stop, Edge car park and Bike shed;
- the Walking-time lens and the Noise and air lens;
- the data sheet "Travel survey", which shows who travels, where and how.

**Key decisions:**

| Decision | Options | Effect |
| --- | --- | --- |
| **Main street design** | A. Car roads with parking at every home. B. Cycle-first grid with quiet streets. C. Tram or bus spine with walkable side streets. D. Car-free core with edge parking (Vauban). | A: wide grey roads, cars, noise rings; Health −, Carbon +, Community −, quick deliveries. B: coloured lanes and bikes; Health +, Carbon −. C: one line with stations, so density near the stops counts; Community +. D: green interior with children playing; Health ++ and Nature +, but Makers and Shopkeepers grumble about deliveries until a cargo-bike hub is added. |
| **School route** | Main road; separate green path; living street (woonerf). | Sets the share of children who walk to school, which shows as little walkers on the map. |
| **Crossing the river** | Road bridge; foot and cycle bridge; no bridge (ferry path). | Changes access times on both sides and wildlife movement along the river. |

**AI mistake:**
- **Vague card:** "Make it easy for everyone to get to school."
- **AI guess:** "Everyone gets to school by car, so I built a wide road and a big drop-off car park." *(77% sure)*
- **What happens:** cars queue at the gate, the noise ring covers the playground, Health falls, and the Young Families' thought bubble says "It's too busy to let them walk!"
- **Facilitator:** "Who is 'everyone'? How do children get to school?"
- **Fix:**
  - *better information:* the "Travel survey" shows most children live within 800 m; or
  - *clearer card:* "Make a safe walking and cycling route so children can get to school without a car."
  - The helper draws a green path and a living street *(88% sure)*.

### 4.4 Level 3: "Homes for everyone"

**Goal:** house 60 residents, with a mix that fits the resident groups. Target: everyone housed, homes warm, and a low Carbon mark.

**Unlocks:**
- house types: Detached, Terrace, Courtyard flats and Cohousing;
- a material palette: Timber, Straw, Rammed earth, Concrete, Steel and Reclaimed;
- upgrades: "Super-insulated (Passivhaus)" and "Green roof";
- the Carbon lens, shown as a grey cloud over the town;
- the data sheet "Material cards", which list strength, warmth, carbon and where each material comes from.

**Key decisions:**

| Decision | Options | Effect |
| --- | --- | --- |
| **Density** | Detached houses; terraces; courtyard flats; cohousing cluster. | Detached houses use about 3× the land of terraces for the same homes, which squeezes the farm and nature land left for Levels 4 and 6. Flats leave the most land but need the tram or shops nearby. |
| **Main material** | Timber, straw bale, rammed earth, concrete and steel, reclaimed. | The look changes (wood, cream, striped earth, grey, patchwork). The Carbon cloud changes size. Timber needs a managed forest plot. Straw needs a grain field in Level 4, which creates a link between levels. Earth needs a dig site. |
| **Warmth** | Standard build; super-insulated (Passivhaus); add heat pumps. | Super-insulated homes halve the Energy need in Level 5 and residents' bills fall, at a higher build effort (fewer homes per turn). |

**AI mistake:**
- **Vague card:** "Build strong homes."
- **AI guess:** "Strong means heavy and hard, so concrete and steel everywhere." *(85% sure)*
- **What happens:** the Carbon cloud swells to its largest, grey towers rise and the timber yard closes. The ghost preview shows the cloud before anything is committed.
- **Facilitator:** "Strong is one thing a home needs. What else should a home be?"
- **Fix:** "Build homes that are strong, warm and low-carbon, using materials we can grow or dig here." The helper proposes timber frames with straw-bale walls on terraces *(86% sure)*, and children can still paint concrete where they want flats.

### 4.5 Level 4: "Feeding the town"

**Goal:** grow at least half the town's food on the island while keeping pollinators. Target: Food at or above the "half fed" line, with bees still present.

**Unlocks:**
- brushes for Field crops, Allotments, Orchard and food forest, Grazing, Greenhouse, Vertical farm, Hedgerow and Beehives;
- the Food lens (who is fed, from where) and the Pollinator lens;
- the data sheet "Diet survey", which shows what the town actually eats.

**Key decisions:**

| Decision | Options | Effect |
| --- | --- | --- |
| **Main farm system** | A. Big arable and vegetable fields. B. Mixed farm with grazing and hedgerows. C. Orchards and food forest. D. Vertical farm plus small fields. | A: most calories per plot, but bees leave without hedges. B: milk and eggs, plus meadows and hedges, at a big land and Carbon cost for beef or lamb. C: wildlife and shade, slow (fruit arrives in Level 6), less staple food. D: lots of salad in a tiny space, but it needs a lot of power, which matters in Level 5. |
| **Food near homes** | Allotments, community gardens, school garden, none. | Health + and Community + (resident friendships form at the plots). |
| **What the town eats** | Mostly plants, mixed, meat-heavy. | Sets how much land is needed, which drives whether wild land survives. |

**AI mistake:**
- **Vague card:** "Grow as much food as possible."
- **AI guess:** "As much as possible means using every free plot, so I ploughed the meadow and removed the hedgerows." *(79% sure)*
- **What happens:** one huge striped field, Food spikes, the bees leave, the Pollinator lens goes grey, and the orchard (which needs bees) yields less next turn.
- **Facilitator:** "The AI made one number go up. What went down?"
- **Fix:** "Grow enough food for everyone and keep hedges and meadow for the bees." Food is a little lower, but the bees return and yields stabilise *(84% sure)*.
- **Alternative vague card:** "Use the newest farm technology." The AI fills the plot with vertical farms running on grid power, and the Carbon cloud grows. Fix with the "Energy chart" data sheet.

### 4.6 Level 5: "Water, power and waste: the town's hidden flows"

**Goal:** keep the town dry, lit, warm and tidy through a storm and a dark winter week. Target: no flooded homes in the test storm, lights on through the winter evening, and Waste to landfill below the "small" mark.

**Unlocks:**
- drainage pieces: Pipes, Rain gardens and swales, Green roofs and rain butts, Wetland and reed bed;
- energy pieces: Rooftop solar, Wind turbines, Heat pumps, Community battery, Grid link;
- waste pieces: Tip, Recycling centre, Repair café, Compost and digester;
- the Storm test and Winter test buttons;
- the data sheet "Weather year".

**Key decisions:**

| Decision | Options | Effect |
| --- | --- | --- |
| **Rain and flooding** | Big pipes to the river; rain gardens and swales along streets; green roofs and butts; a wetland downstream. | The Storm test plays rain over the island. Pipes are fast, but the river floods the meadow and harbour downstream. Rain gardens fill and drain (Nature +). The wetland is best for wildlife and cleaning water but needs land. If Level 1 put homes on the floodplain, they will flood whatever is chosen here. |
| **Power and heat** | Solar on every roof; wind on the hill; heat pumps plus battery; grid or gas connection. | The Winter test runs a dark, still evening. Solar alone fails at dusk, wind alone fails on still days, and a mix with a battery works. Passivhaus homes (Level 3) need much less. Turbines near homes cause noise complaints; turbines on the bird path cause Nature −. |
| **Waste** | Tip at the edge; recycling centre far away; repair café at the market; compost to farms. | The tip lowers Nature and gives off a smell. A far recycling centre is little used (the BedZED lesson). The repair café raises Community. Compost raises Food yield. |

**AI mistake (missing data):**
- **Vague card:** "Make enough clean power for the town."
- **AI guess:** "On an average day, 40 solar roofs make enough, so we're done." *(90% sure)*
- **What happens:** the Winter test plays, windows go dark at 5 pm and the Elders' bubble says "It's dark and cold!" (This reuses the "evening battery" stock-and-flow idea from `round-3/08` §8.)
- **Facilitator:** "The AI looked at an average day. Which days did it not look at?"
- **Fix:**
  - *better information:* drag the "Weather year" chart onto the helper; or
  - *clearer card:* "Make enough clean power for winter evenings too."
  - The helper adds wind and a community battery *(83% sure)*.
- **Alternative mistake:** "Stop the town flooding." The AI uses big pipes, and the flood moves to the harbour and the neighbour's meadow. Fix: "Slow and store the rain where it falls."

### 4.7 Level 6: "A town that works together: completing Eco Town"

**Goal:** finish the town. Targets:
- every home is within a 15-minute walk of a school, clinic, food and a green space;
- wildlife can cross the island;
- every gauge is above its floor;
- the Town Charter is signed.

**Unlocks:**
- pieces: School, Clinic, Market or high street, Library, Park and playground, Community hall, Sports field;
- nature pieces: Hedgehog highways, Stepping-stone patches, Green bridge, Wild zone;
- the Charter;
- the Town Postcard (the end artefact).

**Key decisions:**

| Decision | Options | Effect |
| --- | --- | --- |
| **Heart of the town** | Market square; school-and-park campus; community hall with repair café; harbour front. | It sets the town's character, the residents' daily routes and the end title. |
| **Linking nature** | Hedgerow corridors; stepping stones every few plots; a green bridge over the main road; a big wild zone. | The Wildlife lens shows animal paths. Species arrive only if they can reach their habitats, so the "Species seen" panel (as on the brochure's `game-eco` screen) fills up. |
| **Town Charter (choose 3 promises)** | For example: "No car is needed for daily life", "Every child can walk to school", "We grow half our food", "Nothing goes to the tip", "Wild land stays wild". | The promises become the town's win profile and are printed on the postcard. |

**AI mistakes (two; choose one per session):**
1. **Literal geometry.**
   - **Vague card:** "Put the school in the middle of town."
   - **AI guess:** "The middle is the centre of the island", which is across the river in the wetland *(81% sure)*.
   - **What happens:** the Walking-time lens shows half the homes more than 15 minutes away.
   - **Fix:** "Put the school where most children can walk to it in under 10 minutes." The helper uses the homes layer *(89% sure)*.
2. **Full is not the same as complete.**
   - **Vague card:** "Tell us if the town is finished."
   - **AI guess:** "Every plot is used, so the town is 100% complete." *(93% sure)*
   - **What happens:** the Charter check shows that the hedgehogs cannot cross the bypass and that the clinic is too far for the Elders.
   - **Facilitator:** "What does 'finished' mean for *our* town?"
   - **Fix:** "Check that every resident can reach what they need and wildlife can move around."
   - This is a good closing reflection on how AI measures "done".

### 4.8 Timing and versions

| Version | Time | Shape |
| --- | --- | --- |
| **90 minutes (full)** | 6 levels × 12 minutes, plus a 10-minute warm-up and a 8-minute postcard and debrief | All three decisions in every level |
| **60 minutes** | 6 levels × 8 minutes, plus 12 minutes | One major decision per level is made by the children by painting; the others are pre-set by a "starter kit" the group chooses at the start (Garden, Cycle, Harbour) |
| **45 minutes (museum and drop-in)** | Levels 1, 2, 3 and 6 played live; Levels 4 and 5 auto-filled by the helper and *then inspected for mistakes* | Every group still finishes a town (the IKEA-effect "completion" condition) |

---

## 5. Scoring that is not one number

### 5.1 Seven town gauges

| Gauge | What it measures (child version) | Real-world anchor | How it shows in the world |
| --- | --- | --- | --- |
| **Homes** | Everyone has a warm, affordable home | SDG 11.1; Passivhaus | Lit windows; residents move in |
| **Food** | Share of the town's food grown on the island | Permaculture; OWID food data | Market stalls fill; baskets |
| **Nature** | Species present and able to move | SDG 11.7; Buglife stepping stones | Animals arrive along corridors; "Species seen x/12" |
| **Health** | Active travel, clean air, quiet and green space nearby | SDG 11.6 and 11.7; allotment studies | Residents walk and cycle; noise rings shrink |
| **Energy** | Lights and heat on through the Winter test | Community energy; BedZED | Windows stay lit at dusk |
| **Community** | 15-minute access to school, clinic, food and a meeting place | 15-minute city; SDG 11.3 | People gather in the square; the market is busy |
| **Carbon** | Carbon cloud from materials, travel, food and power (lower is better) | ICE; OWID transport and food | A grey cloud above the island shrinks |

**Display.**
- Show the seven as **petals of a "town flower"** with an inner ring (the *floor*, "enough") and, for Carbon, an outer ring (the *ceiling*, "too much").
- This deliberately echoes Kate Raworth's [Doughnut Economics](https://doughnuteconomics.org/about-doughnut-economics) idea of a social floor and an ecological ceiling.
- Use word bands ("not yet", "enough", "thriving"), not raw numbers, as recommended in `round-3/03` and `round-3/08`.
- Each petal is computed from the map by the rules engine, so every brushstroke can move it, and "% sure" stays the only number tied to the AI.

### 5.2 What counts as "complete"

Eco Town is complete when all of the following are true:
1. every petal is at or above "enough";
2. Carbon is under the ceiling;
3. every resident has a home and reaches daily needs within 15 minutes;
4. the Charter's three promises are met.

There is no single high score. A town can be complete with very different shapes.

### 5.3 Many ways to win: town titles

At completion, the town gets a **title** from its two strongest petals and its Charter. For example:

| Strongest petals | Title | Typical route through the levels |
| --- | --- | --- |
| Nature + Health | **Wild Garden Village** | Compact slope town, car-free core, food forest, wetland, big wild zone |
| Health + Community | **Cycle Town** | Cycle grid, terraces, allotments, market heart |
| Food + Community | **Market Town** | Mixed farm, courtyard flats, repair café, market square |
| Energy + Carbon | **Bright Low-Carbon Town** | Passivhaus straw and timber, wind plus battery, plant-rich diet |
| Nature + Food | **Orchard Valley** | Villages linked by paths, orchards, hedgerow corridors |
| Homes + Community | **Harbour Town** | Coastal centre, tram spine, flats, harbour market |

**Why this works for children and schools.**
- Comparing titles across groups in a class is a ready-made debrief: "Why did your town become Orchard Valley and ours Cycle Town?" This mirrors Floodland's and Frostpunk's paths, but in a positive frame.
- It follows Stålberg's warning about scores crowding out intrinsic goals (`round-3/01` #13): the town is not ranked, and different towns are celebrated.

### 5.4 Stars score the instruction, not the town

- Keep the brochure's stars and XP, but award them for **AI-literacy behaviour**:
  - spotting the mistake using a lens or a resident's bubble;
  - choosing the clearer card;
  - using a data sheet;
  - explaining what the AI assumed.
- This matches the earlier recommendation that stars reward clarity, not a prettier island (`round-3/01` #13). It also keeps the learning goal separate from the world-building goal.

---

## 6. The most important design lessons from the reference games

1. **Place and paint, don't pick.** Townscaper, SimCity and Block'hood let players act directly on the map, and autonomy predicts enjoyment ([Ryan et al. 2006](https://link.springer.com/content/pdf/10.1007%2Fs11031-006-9051-8.pdf)). The rejected Eco Town was a drop-down menu, which is the opposite.
2. **Make the layout the decision.** Adjacency and input-output rules (Block'hood decay, CS noise and land value) create emergent consequences. Keep the rules few, discoverable and predictable (Stålberg).
3. **Let the AI helper do "big jobs" with a preview.** The AI-literacy moment fits naturally as a ghost overlay with "% sure" before the plan is committed (Islanders' preview; SimCity 2013 data layers). The children's hands and the AI's hands are both on the map.
4. **Overlays are how children catch mistakes.** CS and SimCity 2013 show that data views make invisible systems visible. Open the right lens automatically with the tool (CS2), and make "better information" a draggable data sheet (Eco's evidence-based laws).
5. **Undo while exploring; lock in at the end of each level.** Frostpunk's permanent laws and CS's unresettable milestones give weight to choices. Tiny Glade and Townscaper's undo removes fear. Combining them makes early choices compound into different towns.
6. **Citizens must react legibly, with values.** Avoid CS's "decorative" citizens and Floodland's illegible clans. Use named residents with thought bubbles pointing at map features, and five value groups, never harmed or blamed.
7. **Progress through phases toward a defined, hopeful completion.** Terra Nil's phases and clean exit, and Anno's settlement ranks, give a clear "done". Eco Town needs an explicit "complete" check, not endless sandbox play (SimCity) or a single milestone count (CS1's population-only path).
8. **Several gauges with floors and a ceiling, not one score.** Frostpunk averages many needs into two bars. Eco Town's seven petals with "enough" lines let different towns all win, and the town title rewards diversity.
9. **Avoid preachiness and unintended messages.** Eco "rewards exploitation in the short term", which makes the trade-off honest. Terra Nil's animal deaths upset players. Show real trade-offs, including options that sound green but cost a lot (vertical farm on grid power, BedZED's failed systems), and never punish children with suffering.
10. **Short missions inside a sandbox work in classrooms, if every group finishes.** SimCityEDU's missions and Climate Quest's 10-minute arc suit school timetables, and the IKEA effect only holds when the build is completed. Design 45, 60 and 90-minute versions that all reach Level 6.

---

## 7. Notes for production

- **Scripting at scale.** Free painting makes the state space unbounded, so the 729-route test harness from `round-3/04` should become two layers:
  - **property tests** on the rules engine (each brush moves the intended gauges; every starter layout can reach "complete");
  - **scripted tests** for the AI helper's six "big job" scenes. Each scene has 3 cards × 2 fixes × the 4 Level-1 layouts.
- **Art.**
  - Material colours must read on a projector: timber brown, straw cream, earth stripes, concrete grey, steel blue-grey, reclaimed patchwork.
  - The Carbon cloud, flood blue and wildlife paths need shapes and icons as well as colour (`round-3/01` #9).
- **Safeguarding of messages.** Audit all outcomes so that:
  - no group of residents is blamed;
  - animals leave or arrive but never die;
  - car-owning families are not shown as "bad", and their needs are part of the trade-off.
- **Brochure consistency.** Keep the fixed layout: lab badge and task top left, stars and XP top right, AI helper card upper right, facilitator lower right, tools and gauges at the bottom.

---

## Still unverified or weakly sourced

- **Vauban** car-free share: about 70% is widely repeated but marked "citation needed". The 2002 survey figure (about 40% in parking-free blocks) is better sourced.
- **BedZED** figures come from 2003–2009 monitoring, via secondary copies. No post-2015 monitoring was found.
- **ICE carbon values** are taken from secondary tables and vary by ICE version. No per-kg ICE values were found for straw bale or rammed earth; the straw evidence is a UK house study and a thesis.
- **SimCityEDU** mission count (four or six) is inconsistent across sources, and the SRI evaluation results were not found.
- **Climate Quest:** several games share the name. The one cited is EarthGames (University of Washington). No UK title of that name was found.
- **Cities: Skylines Chirper** design intent was not found in primary developer sources; only press and reviews.
- **Moreno's fourth component** is "ubiquity" in early sources and "digitalisation" in later ones.
- **Block'hood:** the designer's own words on decay were not retrieved; descriptions are from press.
- **Straw-bale 61% figure:** the source link is the best match from search results; confirm the paper before quoting it.
- **Children and sandbox ownership:** no study directly testing feelings of ownership in digital sandbox games for ages 8–14 was found. The argument rests on SDT and the IKEA effect, both adult studies.
