# Eco Town: showing the living town

**How world-building and city-building games show residents arriving, living in and using the town the player built, and what Eco Town (DeltaOps Learning, ages about 8–14) should borrow.**

Compiled 5 November 2026. Scope: residents and their behaviour only. Level structure and the sustainability decisions themselves are covered by the companion report, `research/eco-town-world-building.md`; this report assumes those decisions exist (materials, street type, farming, water/energy/waste, nature and community spaces) and asks how the town should *react* to them.

**Method and confidence.** The Exa connector was not authorised in this session, so this report uses ordinary web search plus page fetches. Several publisher pages (PC Gamer, GamesRadar) could not be fetched in full, so some points rest on search-result extracts. Each claim carries a link. Sources are tagged where it matters: **[official]** developer or publisher; **[press]** review or interview; **[wiki]** fan wiki or guide; **[forum]** player report; **[prior]** carried over from DeltaOps round-3 research, where it was checked. Design recommendations are marked **Design**, and are my inference, not a finding.

Art reference: `deltaopslearning-brochure/img/island-town-day.png` shows the target look. Red, navy and slate pitched roofs with solar panels, a pond with a sandy edge, wind turbines on terraced grass, voxel trees, a small grey works building with a red chimney, and *no visible people yet*. The brochure context notes "tiny blocky people … the world is the hero, not the avatar" and warns that small characters vanish in dark scenes (`research/context.md`). Everything below is sized to that diorama: a small island seen from a high three-quarter camera, not a city of thousands.

---

## Contents

1. Game-by-game findings
2. Move-in moments
3. Daily life: routines, day and night, travel modes, crowds and queues
4. Feedback: bubbles, feeds, icons, overlays, following a resident
5. Showing consequences visually
6. What works for children aged 8–14
7. The ten most useful techniques
8. Six-level fit, with the level 6 "Watch your town live" sequence
9. AI helper fit: confidently wrong summaries of resident feedback, and how children check them
10. Gaps and unverified points
11. Sources

---

## 1. Game-by-game findings

### SimCity 4 (2003)
- **My Sim mode**: the player creates a Sim (or imports one from The Sims), chooses where they live, and the Sim "lives and gives feedback on the areas around their home, commute, and workplace". You choose their vehicle and home; they report back on jobs, healthcare and so on. [wiki/press] https://en.wikipedia.org/wiki/SimCity_4 ; https://strategywiki.org/wiki/SimCity_4:_Rush_Hour/New_My_Sim_Mode_Options
- **News ticker**: a constantly updating ticker tells you whether the population needs something you are not providing; moved-in Sims report through it. [press] https://www.honestgamers.com/1923/mac/simcity-4/review.html ; https://www.gamespot.com/simcity-4/user-reviews/2200-418965/
- **Advisors** are animated, with facial expressions that reflect their department's mood (safety, finance, transport). [wiki] https://gamicus.fandom.com/wiki/SimCity_4
- **Lesson**: one named resident whose commute you watch is the oldest form of "follow a citizen", and it gives *local* feedback (my street, my journey), not city-wide statistics.

### SimCity (2013) and GlassBox
- GlassBox "replaces those statistics with agents, simulation units that represent objects like water, power, and workers"; "traffic jams are … produced dynamically by masses of Sim agents that simulate travel to and from work." [wiki] https://en.wikipedia.org/wiki/SimCity_(2013_video_game)
- Agents are deliberately simple: they "do not run rules", each is given a destination, and Maxis wanted "10,000+ agents running around at once". A car agent carrying two people to work is the worked example. [press, GDC 2012 write-up] https://www.gamedeveloper.com/design/gdc-2012-breaking-down-em-simcity-em-s-glassbox-engine ; Andrew Willmott's talk page: https://www.andrewwillmott.com/talks/inside-glassbox
- Dan Moskowitz (GDC 2012) stressed that what you see is a 1:1 representation of what the simulation is doing (quoted in GDC coverage; reported via search extracts of https://www.pcgamer.com/simcity-inside-the-glassbox-engine and https://shacknews.com/article/72936/simcitys-glass-box-engine-shown-off ; full text not fetched).
- **The cautionary tale**: Sims "go to work at the first job they can find and they go home to the first empty home they find"; traffic took "the shortest route instead of the route with the most available capacity". [wiki] https://en.wikipedia.org/wiki/SimCity_(2013_video_game). PC Gamer's fact-check found Sims could go to a different job each morning and a different house each night. [press] https://www.pcgamer.com/simcity-tested-offline-play-phantom-sims/ . Critics linked the simple pathfinding to the most-criticised failures. [press] https://www.bgr.com/general/simcity-pr-nightmare-analysis-372284/ ; Human Transit on how the game misleads about transit: https://humantransit.org/2013/03/sim-city-will-continue-to-mislead-on-transit.html
- **Lesson for Eco Town**: "what you see is the simulation" is a strong promise, and players feel betrayed when it is broken. Because Eco Town is scripted (729-style pre-written routes, no live simulation), **do not claim the residents are simulated individuals**. Instead make sure every visible behaviour is *true to the decision* that caused it. Give each resident a fixed home and a fixed daily destination, so that children who follow one see a consistent life.

### Cities: Skylines (2015) and Cities: Skylines II (2023)
- **Lifecycle (CS2)**: citizens "either move into the city or are born there", pass through child, teen, adult and senior stages, and households span generations. [official] https://www.paradoxinteractive.com/games/cities-skylines-ii/features/citizen-simulation-lifepath
- **Routines**: "Citizens are always up to something", for example commuting to jobs or classes, shopping, sleeping and studying. [official, same page]
- **Travel preferences by age**: "teens prefer the cheaper mode of transport and weigh it against how far they are willing to walk"; "Adults value time"; "Seniors prioritize comfort above all else." [official, same page]
- **Cycling (CS2 bicycles update, dev diary 18 Nov 2025)**: with a car available, citizens "compare walking, driving, and using public transportation"; without one, they "compare walking, cycling, and using public transportation". Bike parking near stops encourages cycling. "Standalone bicycle paths have the highest Comfort score, followed by on-road bicycle lanes." "Children are not currently supported" as cyclists. A Bicycles info view tracks bike parking. [official] https://www.paradoxinteractive.com/games/cities-skylines-ii/news/dev-diary-building-for-bicycles
- **Chirper**: the in-game social feed. In CS2 citizens "voice their happiness and frustration", and "likes" show "how important the subject matter is to the chirp sender and other citizens". [official] lifepath page above; [press] https://www.pcgamer.com/chirper-might-actually-be-useful-for-keeping-track-of-your-citizens-lifepaths-in-cities-skylines-2 ; https://www.shacknews.com/article/136821/cities-skylines-2-chirper-internet-citizen-lifepaths
- **Follow a citizen / Lifepath Journal**: "records everything from the added citizens from the moment they are followed": name, home address, occupation, happiness, their own chirps. [official] Followed citizens sit in a list under Chirper; the achievement "You Little Stalker!" rewards following one from childhood to old age. [press] https://www.gamesradar.com/i-cant-be-the-only-person-going-straight-for-the-you-little-stalker-achievement-in-cities-skylines-2-right ; https://www.simplegamer.co.uk/cities-skylines-2-allows-you-to-follow-citizens-lives . A PC Gamer writer built a house and watched "The Gould Family" move in [press, anecdotal] (search extract of https://pcgamer.com/9-bizarre-things-i-learned-about-cities-skylines-2-by-following-this-one-citizen-around-for-his-whole-life ; page now 404).
- **Happiness** = well-being plus health; electricity, clean water, rubbish collection, pollution and crime all count; "Living in areas affected by air and ground pollution has a negative impact on the citizens' Health." [official] lifepath page.
- **Info views (overlays)**: CS1 had 19 info views (traffic green-to-red by density, pollution, happiness by zone). [press/wiki] https://beyondsims.com/2015/02/skylines-dev-diary-9-info-views/ ; https://www.gamepressure.com/citiesskylines/information-panel/za7595 . CS2 shows ground pollution in blue-red and has a traffic view showing *when* traffic peaks. [wiki] https://gameplay.tips/guides/cities-skylines-ii-info-views-guide.html
- **Move-in**: new residents arrive by vehicle through the highway "outside connection"; if the road link is broken, nobody comes. [forum/wiki] https://github.com/CitiesSkylinesMods/TMPE/wiki/Outside-connections-not-working ; https://steamcommunity.com/app/255710/discussions/0/523890046876168637
- **Problems worth avoiding**:
  - *Death waves* (CS1): a whole cohort moves in together, ages together and dies together; skulls appear over houses. [wiki] https://en.number13.de/cities-skylines-how-to-deal-with-death-waves/ ; CS2 developers said they removed them: https://techraptor.net/gaming/news/cities-skylines-2-developers-reveals-infamous-death-waves-are-gone-in-new-video-about
  - *Chirper as nag*: CS1 players asked how to stop it auto-opening; there is an option to turn it off, plus "Remove Chirper" and "ChirpFilter" mods to filter "non-informative chirps". [forum/mod] https://steamcommunity.com/app/255710/discussions/0/611701360841991469/?l=english ; https://github.com/Zuppi/ChirpFilter
  - *Feed contradicts the data*: a CS2 reviewer found that robust overlays "make the Chirper alerts even more egregious when you can clearly see nothing much is wrong". [press] https://twinfinite.net/reviews/cities-skylines-2-review-bigger-but-not-better/ . **This is gift material for the AI-literacy lesson (section 9).**

### Townscaper (2020)
- No objective; Stålberg called it "more of a toy". Blocks change form by their neighbours, so "arches, gardens, flying buildings and stairways" appear without instruction. [wiki] https://en.wikipedia.org/wiki/Townscaper ; Stålberg on the system: https://gamedeveloper.com/blogs/how-townscaper-works-a-story-four-games-in-the-making
- **Life without people**: reviewers and players describe seagulls perched on roofs that fly off when you change the structure under them and come back later, flocks that swoop over the town, and props that sprout (benches by walls, washing lines in gardens, pot plants, binocular lookouts). One Steam reviewer noted "there are no people, only a few seagulls". [press/forum] https://boingboing.net/2020/08/05/townscaper-is-a-wonderful-and.html ; https://typedbytom.substack.com/p/quest-log-12-townscaper-demo ; https://www.gog.com/en/game/townscaper ; https://www.pcgamer.com/townscaper-is-a-pleasant-city-builder-without-all-the-fuss
- **Lesson**: inhabitation can be *implied* by props (washing lines, benches, pots) and wildlife reacting to the player's edits. It is cheap, readable at diorama scale, and charming. Birds leaving when you build and returning later is a ready-made "wildlife returning" signal.

### Tropico (1, 3–6)
- The player can inspect every citizen's needs, happiness, skills, thoughts and political view. [wiki] https://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq.ipfs.4everland.io/wiki/Tropico_4.html . Tropico 5/6 Almanac sorts citizens by education, age, wealth and happiness, with a happiness breakdown by need. [wiki] https://www.gamepressure.com/tropico-6/almanac/z8c04a
- **Arrival by boat**: immigrants arrive at the dock; an Immigration Office can favour skilled workers. Players report a whole boatload arriving faster than they can be housed. [forum] https://steamcommunity.com/app/492720/discussions/0/4371376043391135554 ; https://rangerx3x.blogspot.com/2014/07/tropico-4-eva-peron.html
- **Lesson**: a boat or ferry arriving at a floating island is a natural move-in moment for Eco Town's art style, and a crowd of new arrivals with nowhere to go is a clear, gentle consequence of too few homes.

### Banished (2014)
- Nomads arrive at random intervals once there is a Town Hall (minimum one year in; more likely with a trading post and a market). The Town Hall lets you accept or refuse them, and they need houses or boarding houses. Children become labourers at 10, or students if a school exists. [wiki] https://banished-wiki.com/wiki/Town_Hall ; https://kiwix.lema.org/wikihow_en_maxi_2023-03/Get-Nomads-in-Banished
- **Lesson**: arrivals can be a *reward for building the right thing* (market, trading post), and a school visibly changes what children do all day. Banished's disease-carrying nomads and starvation are not suitable for Eco Town.

### Frostpunk (2018)
- Two independent meters, Hope and Discontent, "can both be full and they can both be empty"; the developers wanted discontent to come from individuals' needs. [press] https://www.pcgamer.com/frostpunk-developers-on-hope-misery-and-the-ultimately-terrifying-book-of-laws
- Citizens bring requests ("when lacking manpower, people may ask you about child labor"); ignoring them raises discontent; too much leads to revolt or an exodus where unhappy people first try to persuade others to leave. [press] https://www.pcgamer.com/you-cant-please-everyone-in-survival-city-builder-frostpunk ; https://www.dreadcentral.com/reviews/280943/frostpunk-review-apocalypse-done-depressing . Reviewers call the meters "the mechanical representation of empathy". [press] (via search extract)
- The camera does not let you zoom close to citizens [press]; a 2020 free update let players name citizens. https://www.pcgamer.com/au/frostpunks-free-people-and-automatons-update-lets-you-name-your-suffering-citizens
- I could not verify any "overheard speech" or hover-chatter mechanic, so it is not claimed here.
- **Lesson**: requests and promises from residents are powerful, but Frostpunk's tone (child labour, riots, death) is wrong for 8–14. Borrow the *request with a promise* pattern ("Can we have a way to walk to school?") and the two-meter idea (*how people feel* vs *how the land is*), not the stakes.

### Animal Crossing: New Horizons (2020)
- **Move-in**: the first two residents arrive with you and live in tents; later, you place a plot, a "SOLD" sign appears, and the villager moves in at 5 am next day; there is a cap of 10. [wiki] https://nookipedia.com/wiki/Villager_house ; https://www.howtogeek.com/664191/how-to-recruit-new-villagers-in-animal-crossing-new-horizons/
- **Daily life in public space**: in the plaza villagers do "yoga, exercising, playing, cleaning, sitting on stools or a bench, singing, sunbathing, using a barbecue, and playing with sparklers". [wiki] https://nookipedia.com/wiki/Plaza
- **Lesson**: the "SOLD" sign then empty house then lit window then occupied sequence over one night is the best-loved move-in beat in the genre, and residents doing small, specific activities in a shared space (singing, yoga, a barbecue) are what make a town feel inhabited. A small number (10) of named residents gives strong attachment.

### The Sims (2000 onwards)
- Wright's team "abstract[ed] their language into gestures, icons, and emotional voice intonation", inviting the player to fill in the dialogue, and enabling release in many languages. Sims' emotions were shown through "thought bubbles and body animation". Wright admitted the hard part is "trying to convey what their intent is". Needs meters came from Maslow (hunger, bladder, social, hygiene and so on). [press] https://www.gamesradar.com/the-making-of-the-sims ; https://www.gamespot.com/articles/the-sims-livin-large-preview-part-3-will-wright-qanda/1100-2609362/ ; https://en.wikipedia.org/wiki/The_Sims_(video_game) ; Simlish history: https://thesimstree.com/en/blog/inspiration/the-history-of-simlish-the-secret-language-of-the-sims-and-how-it-was-born.html
- Cut content shows icons for a Sim begging for attention about a messy room, replaced by monochrome animated need icons. [wiki] https://tcrf.net/The_Sims_(Windows)/Unused_Graphics
- **Lesson**: pictures plus a burbling voice beat text for young readers, and intent is the hardest thing to show. Use icon bubbles first, with optional short words.

### Before We Leave (2020/2021)
- Peeps leave a bunker and rebuild on one hex island, then sail (later fly) to colonise others. Happy peeps work efficiently; unhappy peeps work up to twice as slowly; medium pollution lowers the mood of peeps who walk through it. Reviewers found the "sad peeps … delightful and bitter-sweet". [press/wiki] https://en.wikipedia.com/wiki/Before_We_Leave ; https://www.thegamer.com/before-we-leave-peep-increase-happiness-guide/ ; https://www.pcgamer.com/au/before-we-leave-review ; https://www.gamesasylum.com/2021/11/23/before-we-leave/
- **Lesson**: the closest art-and-scale match to Eco Town (small round characters, hex islands, ships between islands, no violence). It shows that **sadness can be gentle and cute** rather than alarming, and that pollution can be felt *where people walk* rather than as a city-wide number.

### Dorfromantik (2021/2022)
- No visible residents are described by reviewers. Life comes from deer that appear as rewards, trains moving on completed tracks, boats drifting on rivers, smoke rising from houses, windmills turning and birds flocking. [press] https://www.pcgamer.com/relax-mostly-with-this-lovely-and-peaceful-landscape-strategy-game ; https://www.newgamenetwork.com/article/2545/dorfromantik-review ; https://www.shacknews.com/article/130138/dorfromantik-review-peaceful-puzzler-that-makes-you-feel-right-at-home . Patch notes confirm boat and train quest tiles. [official] https://www.player.one/dorfromantik-update-performance-boost-bug-fixes-and-more-141168
- **Lesson**: completing a connection (a river, a railway) makes something start moving on it. That is the most direct "my decision → motion" link in the genre. In Eco Town, finishing a cycle path should make the first cyclist appear on it immediately.

### Pocket City (2018) and Pocket City 2 (2025)
- Residents' happiness depends on safety, environment, jobs, housing, entertainment and road congestion; traffic was a reviewer's "biggest headache"; buses and a monorail ease it. [press] https://destructoid.com/?p=227371 ; https://www.pocketgamer.com/pocket-city/pocket-city-review-an-addictive-city-builder-without-the-wait-time/
- Citizens send requests and quests; residents throw block parties; there are festivals and parades. [press] https://www.touchtapplay.com/build-your-own-dream-city-in-pocket-city/ ; https://www.gamezebo.com/2018/08/02/pocket-city-review-everything-youd-want-plus/ . Pocket City 2 lets you walk the streets as an avatar and meet citizens; some reviewers felt the many mini-quests diluted the building. [store] https://apps.apple.com/us/app/pocket-city-2/id6748041195 ; https://www.jestr.gg/games/pocket-city-2
- **Lesson**: on a small mobile screen, *events* (a block party) are the reward a child remembers. Too many requests becomes noise.

### Planet Zoo (2019) and Planet Coaster (2016)
- Planet Coaster's "guest brain": "each visitor has their own … thoughts, feelings, desires … and money", they "individually react to every change you make" and have their own gibberish language. [official, prior] https://www.planetcoaster.com/en-US/planet-coaster-1/news/pc/dev-diary-5-guest-brain
- Crowds: Frontier targeted 10,000 guests using flow fields from each goal; families move as one particle; animations show "tired, fed up, pointing, laughing, needing the toilet". [press, prior] https://www.gamedeveloper.com/audio/game-design-deep-dive-creating-believable-crowds-in-i-planet-coaster-i-
- Planet Zoo players report thoughts like "the view is only ok", guests ignoring education boards, wandering on inefficient routes, and that the game "does not collate the recent thought feed". Players ask for a guest viewpoint map. [forum] https://forums.frontier.co.uk/goto/post?id=8757778 ; https://steamcommunity.com/app/703080/discussions/0/2257935717977002674
- **Lesson**: crowds move *as groups* (family particles), animation states carry the need, and a feed that is not collated leaves the player guessing. That gap is exactly where an AI summary helps, or misleads.

### Parkitect (2018)
- Guests think "lost" when paths are confusing; info kiosks sell park maps "which help your guests to discover all the rides"; signs control where guests and staff can go; guests form scenery opinions about every 10 minutes; a Thoughts tab per guest and an Opinions tab for the park. The FAQ advises clicking a guest who tried a ride to read their thoughts. [forum/wiki] https://steamcommunity.com/app/453090/discussions/1/1742227898970281674 ; https://steamcommunity.com/sharedfiles/filedetails/?id=2692859803 ; https://cal1.lr.ggtyler.dev/r/ThemeParkitect/wiki/faq ; devlog https://texelraptor.com/blog/devlog-update-130
- **Lesson**: "click a person to find out why" is the standard debugging move in tycoon games, and it maps directly onto the DeltaOps "check the evidence" step.

### RollerCoaster Tycoon (1999) and OpenRCT2
- Verified guest thoughts [prior, OpenRCT2 `en-GB.txt`]: "I've been queuing for {ride} for ages" (1498); "It's too crowded here" (1512); "The litter here is really bad" (1506); "Great scenery!" (1514); "This park is really clean and tidy" (1515); "I'm lost!" (1496); "Wow! A new ride being built!" (1650). Advisor messages aggregate them: "Guests are getting lost or stuck / Check whether the layout of your footpaths needs improving…" (2812). https://raw.githubusercontent.com/OpenRCT2/OpenRCT2/develop/data/language/en-GB.txt (see `research/round-3/08-tycoon.md` §2).
- **Pattern**: first person, under 10 words, names a cause, positives mixed with complaints; a few bars (Happiness, Energy) plus "Recent thoughts". The advisor turns many thoughts into one problem plus one fix.
- **Lesson**: the bubble/advisor split is the template for Eco Town: **resident bubbles are the evidence; the AI helper is the advisor; children check one against the other.**

### Eco (Strange Loop Games)
- A multiplayer world in which "Plants, animals, moisture, pollution, and other environmental factors … can be influenced by player actions"; disruption cascades; laws are proposed and voted on, and ecosystem data serves "as evidence for them to decide on enforceable laws". It began as a US Department of Education-funded classroom project with "council meetings". [official/press] https://ies.ed.gov/use-work/awards/eco-online-virtual-world-secondary-school-environmental-literacy-and-collaborative-problem-solving ; https://informalscience.org/project/eco-online-virtual-world-secondary-school-environmental-literacy-and-collaborative-problem-solving/ ; https://wiki.play.eco/en/Laws
- **Lesson**: the *players* are the residents, and evidence from the world is used to argue for rules. For a 30–60-minute lab, the transferable piece is the council meeting: residents' evidence goes into a group decision.

### Minecraft villagers
- Villagers follow a day/night schedule: working near their job-site block, gathering at the village bell (sources disagree on midday or dusk), sleeping in beds at night; schedules are overridden by panic, trading or rain. Job-site blocks set professions. [wiki] https://minecraft.linxi.com.au/mechanics/villagers-and-professions ; https://wiki.sportskeeda.com/minecraft/minecraft-villager
- **Lesson**: a visible "work object" that defines a resident's job (a lectern, a composter) and a single shared gathering point (the bell) make routines readable. Eco Town should use its own objects, not Minecraft-distinctive ones (see `research/round-3/10-minecraft.md`).

---

## 2. Move-in moments

| Game | How people arrive | What shows the town filling |
|---|---|---|
| Animal Crossing NH | Tents on day 1; plot, "SOLD" sign, move-in at 5 am | House appears overnight; resident greets you; cap of 10 |
| Cities: Skylines I/II | Cars and vans via the highway connection; births | Population counter; lit buildings; new household names in follow view |
| Tropico | Boats at the dock | Crowd at the dock; homeless count if housing is short |
| Banished | Nomads walk in; births | Town Hall accept/refuse; family count |
| Before We Leave | Peeps leave a bunker; ships and airships to new islands | Peeps spread to new hexes |
| SimCity 4 | My Sim placed by the player | Ticker reports from that Sim |
| Townscaper / Dorfromantik | No residents; props, birds, smoke, boats and trains | Washing lines, benches, smoke, deer |

**Design for Eco Town** (all scripted):
1. **Arrival mode follows the street decision.** If the children chose car streets, a small removal van drives in on the island's one road. If they chose bike and walking streets, a family arrives pushing a cargo bike piled with boxes. A ferry or small airship docking at the island edge works for any choice and suits the floating-island art. Arrival by the chosen mode is the first proof that "your decision changed who comes and how".
2. **A three-beat move-in over one compressed night**: *For sale* sign → boxes on the doorstep at dusk → window lights on → morning, a resident waves from the door. (Animal Crossing's overnight rhythm.)
3. **Named households, few of them.** Six to ten households across the whole game, each with a family name and two to four members (one child at least), diverse skin tones, as in the brochure style. CS2's "The Gould Family" anecdote shows how a name alone creates attachment.
4. **The empty house is a signal.** If a home is cold, damp or noisy (a materials decision), a family looks at it and walks back to the ferry. Tropico's crowd at the dock is the opposite signal: too few homes.
5. **Never a death wave.** Do not age residents through the game. Babies can arrive (a pram appears), but nobody dies or falls ill (CS1 skulls over houses are unsuitable).

---

## 3. Daily life

### 3.1 Routines
- **CS2**: commute to job or class, shop, sleep, study; travel mode chosen by age-specific priorities (teens cost, adults time, seniors comfort). [official]
- **Minecraft**: work near a job object; gather at the bell; sleep. [wiki]
- **Animal Crossing**: plaza activities (yoga, singing, barbecue). [wiki]
- **SimCity 2013**: nearest job, nearest home: a warning about how *not* to show routines. [wiki]

**Design: the Eco Town day loop** (60–90 seconds of real time per day):

| Time | Children | Adults | Older residents | Wildlife and ambience |
|---|---|---|---|---|
| Dawn | Asleep (lights off) | Farmer heads to the field | Walks the dog by the pond | Birds land; mist on the pond |
| Morning rush | Walk, scoot or are driven to school | Walk, cycle or drive to work | Bench, bakery | Traffic or quiet street |
| Midday | Playground at school | Lunch at the market or square | Allotment | Bees on flowers (if meadow) |
| Afternoon | Park, pond, football | Work | Library, community hall | Ducks, deer at the woods' edge |
| Evening | Home; some at the square | Home; shopping | Square | Bats, lights on; turbines turn |
| Night | Asleep | Asleep | Asleep | Stars; street lights; owls if dark-sky lighting |

Each resident has **one home, one daytime place and one leisure place**, fixed for the whole game (the SimCity 2013 lesson). Night and dusk use the island's existing palette (`island-town-dusk.png`), but keep characters lit with window glow so they do not vanish (a brochure issue).

### 3.2 Travel modes and street choices
- CS2's bicycle update gives the clearest real model: mode choice depends on what is available (car or no car), comfort (separate paths > on-road lanes) and parking (bike racks near stops). [official]
- Pocket City and SimCity tie happiness to congestion. [press]
- Before We Leave lowers the mood of people *walking through* pollution. [wiki]

**Design (scripted rules children can understand):**
- **Car streets**: most adults drive; children are driven; morning queue at the school gate; parked cars line the street; fewer people stop to talk.
- **Shared or bike streets**: residents cycle and walk; children walk in a line ("walking bus") or scoot; the street has benches and a tree; people stop and chat (two residents face each other with a small heart or speech dot).
- **Walking-only centre plus a ring road**: the market square fills; deliveries come by cargo bike; one old car waits outside at the edge.
- Use CS2's age rule as a talking point: *older residents choose comfort*, so a bench every few blocks changes whether Grandad walks to the shop.
- **Never show cars as evil.** The delivery van, the doctor's car and the wheelchair-accessible minibus still drive. The consequence of car streets is *queues and fewer meetings*, not villainy. This keeps the AI-literacy lesson fair (section 9).

### 3.3 Crowds and queues
- RCT: "I've been queuing for … for ages"; "It's too crowded here". [prior]
- Planet Coaster: families move as one unit; flow fields to goals; animations show "tired, fed up". [prior]
- **Where Eco Town crowds should form** (each is a visible consequence):
  - School gate at 8:45 (car queue vs walking bus).
  - Bus stop or ferry dock (if few homes or no bus).
  - The only water tap or well (if water is short).
  - The market on market day (the good crowd).
  - The bike rack (overflowing bikes: a *good* problem that shows the cycle lane works).
  - The park bench under the only tree in a heatwave (shade decision).

---

## 4. Feedback

| Technique | Exemplars | Strength | Risk for 8–14 |
|---|---|---|---|
| Thought bubbles with short text | RCT, Planet Coaster, Parkitect | Names a cause; first person | Reading load; must be taught as a convention |
| Icon bubbles plus gibberish voice | The Sims, Planet Coaster | No reading; charming | Ambiguous without words |
| Social feed with likes | CS Chirper | Personality; humour; "likes" show weight | Nags; can contradict data; social-media framing for under-13s |
| Advisor summary | RCT advisor, SimCity 4 advisors and ticker | One problem plus one fix | Can hide whose voice counted |
| Needs meters | The Sims, Tropico, Frostpunk | Fast overview | Children like many bars but cannot read them [prior: Tärning et al.] |
| Overlays and heat maps | CS info views | Shows *where*, objective | Abstract colours; one at a time |
| Follow a resident | SimCity 4 My Sim, CS2 Lifepath | Attachment; local story | One person is not everyone |
| Requests with promises | Frostpunk, Pocket City | Agency | Can become a chore list |

**Design for Eco Town:**
1. **Resident bubbles**: an icon first, then up to eight words, read aloud on tap, from a written pool per decision (like RCT's string table). Mix positives with complaints (about 60:40 positive in a good town, the reverse in a poor one).
2. **No social feed as such.** For children under 13 a "Chirper" framing normalises social media and invites "likes" chasing. Use a **Town Noticeboard** in the square instead: residents pin notes and drawings. It is visually native to a voxel town, and a noticeboard can visibly *miss* people who never walk past it (useful for section 9).
3. **Three meters at most**, each with word, icon and a bubble that says why (prior research recommendation). Suggested: **Happy residents**, **Nature**, **Getting around** (or the companion report's meters, if different).
4. **One overlay at a time**, introduced in the level where it matters: *Who walks where* (footprints) in level 3; *Noise and air* in level 4; *Where people meet* (warm glow) in level 5.
5. **Follow a family**: in level 2 the children choose one household to follow ("Our family"). A small portrait sits in the corner; tapping it flies the camera to them; a three-line diary records their day ("Ayo walked to school with Sam. Mum got the bus to the farm. They had soup from the market."). This is CS2's Lifepath Journal shrunk to one family and one day.
6. **Requests** come one at a time from the followed family or a resident at the noticeboard, phrased as a need, not a solution ("I'm scared crossing the road to school", not "Build a crossing"). This sets up the AI-literacy problem: solutions are a guess.

---

## 5. Showing consequences visually

Physical, readable consequences matter more than numbers (brochure principle: "consequences appear physically"). Each row is a scripted pair of outcomes.

| Decision area | Poorer outcome shown by residents | Better outcome shown by residents | Precedent |
|---|---|---|---|
| Street type | Car queue at school gate; parent bubble "Late again!"; children in back seats | Walking bus of children in hi-vis; lollipop crossing; a child waves at a neighbour | CS traffic view; CS2 bicycles |
| Cycle lanes | Lone cyclist squeezed by a van, wobbles, gets off and walks | Stream of bikes at 8:30; overflowing bike rack; Grandma on a trike | CS2 comfort score; Dorfromantik "connect, then it moves" |
| Materials | Family looks at draughty house, shivers icon, walks back to the ferry | Family moves in; washing line appears; window-box flowers | Townscaper props; Tropico homeless crowd |
| Farming | Field fenced and empty except one tractor; food arrives by lorry | Farmer, helpers and children picking; harvest cart goes to market; market-day stalls | Banished farming; AC plaza |
| Water | Queue at a single tap; bucket icons | Children splash at a fountain; rain barrels; full pond | RCT "thirsty" |
| Energy | Grey smoke plume; residents cough or close windows; turbines idle | Turbines turn; lights on at dusk; quiet street | CS pollution view |
| Waste | Litter blowing; seagulls raid bins; bubble "The litter here is really bad" | Repair café; compost heap used by allotment holders | RCT litter strings; Townscaper gulls |
| Nature | Birds leave; no bees; hot, treeless square | Birds return to roofs; ducks on pond; hedgehog crossing at dusk; bats | Townscaper birds; Dorfromantik deer; Eco ecosystem |
| Community | Residents walk past each other; empty hall | Yoga in the park, choir in the square, football, barbecue, festival bunting | AC plaza; Pocket City block parties; Minecraft bell gathering |

Festivals are the reward beat: a **market day** (level 3), a **lantern night** when the town's own energy lights the square (level 4), a **community picnic or fête** (level 5), and the **Eco Town festival** (level 6).

---

## 6. What works for children aged 8–14

Evidence (mostly prior DeltaOps research; see `research/round-3/08-tycoon.md` §5.5 and `round-3/02-learning-evidence.md`):
- **Thought bubbles must be taught**: children understood them once told a bubble "shows what someone is thinking" (Wellman et al. 1996, younger children; Wellman & Peterson 2013 with ages 7.8–13). https://pubmed.ncbi.nlm.nih.gov/8706525/ ; https://doi.org/10.1037/a0032419
- **Fewer meters**: 2nd-graders preferred six progress bars despite not understanding them; older children preferred one to three (Tärning et al. 2018, ages 8–12). https://doi.org/10.55612/s-5002-037-010
- **Explanations can be noticed but not understood** by children aged 8–11 with reading difficulties (Vasalou et al. 2021). https://doi.org/10.1111/bjet.13145
- **Needs meters do not by themselves create empathy**; animal-welfare games for ages 6–13 raised knowledge but not compassion (Hawkins et al. 2019). https://www.mdpi.com/2076-2615/9/3/91 . Claim reasoning, not empathy.
- **Icons and voice beat text** (Wright's Simlish rationale). https://www.gamesradar.com/the-making-of-the-sims
- **Nagging feeds get switched off**, even by adults (CS1 Chirper options and mods).

**Design rules:**
1. **Reading level about age 8** on screen; bubbles up to eight words; everything read aloud on tap (`round-3/04-construction-scripting.md` covers read-aloud).
2. **How many agents**: 8–12 visible in level 2, rising to about 30–40 in level 6. Diorama scale means each figure is a few voxels tall; more than about 40 becomes noise and costs performance on Chromebooks (Design; no benchmark found, see `round-3/04`). Fake larger crowds with groups that move as one (Planet Coaster's family particle).
3. **One thing talks at a time.** At most two bubbles on screen; the rest show a small dot. A child taps to hear more. No auto-opening feed.
4. **"My residents" charm**: children name the followed family's pet or child from a picture list (no typing; no personal data); the family waves at the camera; their diary goes into the end-of-lab artefact.
5. **Gentle consequences**: people leave, queue, shiver, look bored or sad; nobody dies, gets ill, riots or is hurt (avoid CS death waves and Frostpunk revolts). Before We Leave shows sadness can stay cute.
6. **Fairness**: drivers, wheelchair users, older people and children all appear and all have reasonable needs. This prevents the game itself from teaching "cars bad" and gives the AI lesson real nuance.
7. **Inclusive cast**: varied skin tones (brochure style), a wheelchair user, an older couple, a family with a baby.
8. **Facilitator-friendly**: a pause button freezes the day so the facilitator can point to a queue and ask a question.

---

## 7. The ten most useful techniques

1. **Arrive by your choice.** New residents arrive by the travel mode the children's street decision favours (removal van, cargo bike, ferry). From AC's overnight move-in, CS outside connections and Tropico's boat.
2. **Connect it and it moves.** The moment a path, lane or bus route is complete, the first resident uses it (Dorfromantik boats and trains; CS2 bicycle paths).
3. **Fixed homes and fixed routines.** One home, one daytime place, one leisure place per resident, on a 60–90 second compressed day. This avoids SimCity 2013's "nearest home" credibility failure.
4. **Crowds as consequences.** Put the queue where the decision bites: school gate, tap, ferry dock, bike rack, market (RCT queue thoughts; Planet Coaster group crowds).
5. **Icon bubbles with short, causal, mixed-tone lines**, read aloud (RCT string table; Sims icons; Planet Coaster gibberish voice).
6. **Follow one family.** A named household with a portrait and a three-line diary (SimCity 4 My Sim; CS2 Lifepath Journal).
7. **The advisor summarises the bubbles.** One problem plus one suggestion (RCT advisor), played by the AI helper, which can be wrong.
8. **One overlay at a time**, introduced when needed, and always checkable against the people on screen (CS info views; the Twinfinite Chirper contradiction).
9. **Non-human life as the nature signal.** Birds leave and return, bees, ducks, a hedgehog at dusk, bats (Townscaper gulls; Dorfromantik deer; Eco ecosystem).
10. **Gatherings as rewards.** Market day, choir, yoga, picnic, festival in the shared space the children built (AC plaza; Pocket City block parties; Minecraft bell gathering).

Honourable mentions: implied life through props (washing lines, window boxes, bikes leaning on walls), from Townscaper; a pause-and-point facilitator mode; requests phrased as needs, not solutions.

---

## 8. Six-level fit

Each level: the children decide (companion report), then a **Watch** phase of about 60–120 seconds plays the scripted result. Each Watch phase has: an arrival or change; one day of routine; a crowd or quiet spot that shows the consequence; two or three bubbles; one moment with the followed family; and a hand-off to the AI helper's summary.

### Level 1: Empty land
- **Before people**: survey the land. Wildlife is the only "resident": rabbits on the grass, ducks on the pond, birds in the trees, a deer at the wood's edge.
- **Watch**: the children's first choice (where to build, what to keep wild) shows wildlife *moving*: if the wood is kept, the deer stays; if it is cleared, the birds circle and fly off the island edge (Townscaper's birds).
- **First visitors**: a small ferry or airship brings two surveyors who walk the land, sit by the pond, and leave a "We'd like to live here" note on a post. That is the hook.
- **AI helper**: "The surveyors liked the pond most" (from where they sat).

### Level 2: First homes
- **Arrival**: three to four households arrive by ferry, carrying boxes along the path the children built. "For sale" signs, boxes at dusk, lights on, morning waves.
- **Materials consequence**: a timber-and-straw house gets a washing line and window-box; a poorly insulated house shows a shiver icon in the evening, and the family puts on jumpers and closes curtains; if the choice is very poor, one family turns back to the ferry.
- **Pick our family**: children choose one household to follow; they choose the pet's name from picture tiles.
- **Bubbles**: "Our house is cosy!", "It's draughty at night", "I can hear the pond frogs".
- **AI helper**: summary of what the households said; first, simple "check the bubbles" practice.

### Level 3: Food and streets
- **Arrival**: more families arrive by the mode the street choice favours.
- **Daily life**: the first full morning rush. Car streets: queue at the school gate and a parent bubble "Late again!". Bike and walking streets: walking bus, bike rack fills, neighbours stop to chat.
- **Farming**: farmer and helpers work the field; children visit; a harvest cart rolls to the square.
- **Event**: **market day** in the square; stalls show what was grown (or, if food is shipped in, a lorry unloads boxes and the stalls are thinner).
- **Overlay introduced**: "Who walks where" (footprint trails).
- **AI helper**: the car-park mistake (section 9) fits best here.

### Level 4: Energy, water and waste
- **Dusk test**: the day ends and lights come on (or flicker). Turbines turn; solar roofs glint; a lantern night in the square if the town makes its own power.
- **Water**: children play at a fountain or splash pad; rain barrels by houses; if water is short, a queue forms at one tap with bucket icons.
- **Waste**: a repair café, compost heap at the allotment; or litter blowing and gulls raiding bins.
- **Air and noise**: a grey plume and residents closing windows if a polluting option is chosen; birds avoid that corner.
- **Overlay introduced**: "Noise and air".
- **AI helper**: the "nobody complained" error (silent residents).

### Level 5: Community and nature
- **Gatherings**: residents use the spaces built: yoga in the park, choir or band in the square, football, older residents on benches, a community picnic.
- **Nature returns**: birds back on roofs; bees in the meadow; ducklings on the pond; a hedgehog crossing at dusk; bats at night.
- **Followed family**: the child plays with friends from another family (relationships formed by shared spaces).
- **Overlay introduced**: "Where people meet" (warm glow where residents stop together).
- **AI helper**: the "noticeboard only counts people who pass it" error.

### Level 6: The complete town, and "Watch your town live"
A closing sequence of about two to three minutes with no decisions, then the artefact.

1. **Dawn (15 s)**: camera drifts over the island; mist on the pond; the first birds land on roofs; the farmer walks out.
2. **Morning (25 s)**: the school run in the chosen mode; the camera picks up the followed family at their door and follows the child to school.
3. **Midday (25 s)**: market or square busy; allotment helpers; a delivery cargo bike; older residents on a bench.
4. **Afternoon (25 s)**: park and pond: children playing, ducks, a dog; wildlife visible in the wild areas the children kept.
5. **Evening (30 s)**: **Eco Town festival**: bunting, music, lanterns powered by the town's energy, food from the town's farm; every household appears, each with one bubble about the thing they liked best (read aloud in turn, or tap to hear).
6. **Night (15 s)**: lights go out house by house; stars; an owl or bats; the followed family's window goes dark last.
7. **Card**: "Our family's day" (three-line diary) and "Town report" (three meters), saved as the end-of-lab artefact with the AI helper's final summary and the children's corrections.

If some decisions were poorer, the festival still happens but shows the remaining gaps gently (a queue at the tap, a family missing because they moved away, a quiet empty corner), so the ending invites a "what would you change?" discussion without a fail screen.

---

## 9. AI helper fit: confident, wrong summaries and how children check them

### 9.1 Why this is a real-world lesson
- In real cities, complaint data reflects who complains as much as what is wrong. Studies of US "311" complaint lines found that some neighbourhoods under-report problems, so data-driven decisions built on complaints can be unfair. [academic] Kontokosta and colleagues: https://marroninstitute.nyu.edu/papers/bias-in-smart-city-governance-how-socio-spatial-disparities-in-311-complaint-behavior-impact-the-fairness-of-data-driven-decisions ; https://par.nsf.gov/servlets/purl/10314387
- In games, CS2's Chirper alerts can contradict what the overlays show. [press] https://twinfinite.net/reviews/cities-skylines-2-review-bigger-but-not-better/ . Planet Zoo does not collate guest thoughts, so players guess. [forum]
- Wald's bomber story (armour where the *returning* planes were *not* hit) is the classic "missing data" example that facilitators can tell in one minute. [general] https://www.wearethemighty.com/popular/abraham-wald-survivor-bias-ww2.md

### 9.2 The mechanic
- The AI helper (navy card, robot icon, "GUESS" tag, "% sure", as in the brochure) reads resident bubbles and noticeboard notes, then says what "the residents want".
- Its summary is **scripted and sometimes wrong in a specific, checkable way**.
- Children check by **looking at the residents** (tap people, use an overlay, count at a place at a time of day) and then pick a clearer instruction card for the helper.
- Keep the brochure's caution: "% sure" can imply a live model, and children read high confidence as correctness (`research/context.md`). Show the confidence, then show it was wrong.

### 9.3 Six scripted errors

| # | Helper says (with % sure) | Why it is wrong | How children check | Clearer card |
|---|---|---|---|---|
| 1 | "Residents want more car parks." 82% | It counted only bubbles above cars. Drivers stuck in the queue complain loudly; cyclists and walkers who are happy say nothing. | Tap 10 residents at the school gate at 8:45; sort them on a tally card: drive, cycle, walk; use the "Who walks where" overlay. Result, for example, 4 drivers ("No parking!"), 7 walkers and cyclists (happy, or "Can we have a crossing?"). | "Ask *everyone* who goes to school, not just drivers." |
| 2 | "Nobody has complained about water, so water is fine." 75% | Silence is not satisfaction: residents queuing at the tap are too busy to post; the noticeboard is on the other side of the island. | Use the evening camera at the tap: count the queue; read the bucket icons. | "Check where people *wait*, not just what they post." |
| 3 | "Everyone loves the flats." 88% | Survivorship: the families who disliked them already left on the ferry. It only heard people who stayed. | Look at the ferry dock: count the "moving away" boxes; read the family's farewell note. | "Ask the people who *left* too." |
| 4 | "The park is a failure. Only 2 notes mention it." 70% | It counted noticeboard notes, but children and older residents use the park and do not walk past the board. | Turn on "Where people meet"; follow the family's child at 4 pm. | "Look at what people *do*, not only what they write." |
| 5 | "Residents want a bigger road." 80% | It heard one note with many "likes", and treated likes as votes from everyone. | Count *who* liked it: the same three drivers. | "How many *different* people said this?" |
| 6 | "The town is noisy and unhappy." 72% | It sampled only the rainy morning rush, not the whole day. | Replay the evening and the festival; compare bubbles at different times. | "Check a whole day, not one moment." |

Error 1 is the client's example and should be the anchor (level 3). The others are spread across levels 2–5 so each appears once.

### 9.4 Child-friendly check tools (no typing)
- **Tap to ask**: tap any resident to hear their bubble.
- **Tally card**: drag tapped residents into picture columns (walk, cycle, bus, car; child, adult, older).
- **Time slider**: dawn, morning, midday, evening, night.
- **One overlay** at a time.
- **"Who's missing?" button**: highlights residents who have *not* said anything yet (children, older people, people at home), with a hint "Quiet does not mean happy".
- **Facilitator card**: "Robo said 'more car parks'. Who did Robo listen to? Who did it miss?"

### 9.5 Language for the helper
- Wrong, confident: "Residents want more car parks. I'm 82% sure." (Show the bubbles it used underneath, all from cars.)
- After the clearer card: "I asked 18 residents. 11 walk or cycle to school. Most want a safe crossing. 4 drivers want parking near the school. I'm 64% sure, because I didn't ask the people at home."
- Keeping the honest lower confidence after a better method teaches that **better evidence can make the helper less sure, and that is good**.

---

## 10. Gaps and unverified points

- Could not fetch full PC Gamer and GamesRadar articles; the GlassBox "1:1" quote and the CS2 "Gould Family" anecdote rest on search extracts.
- No verified source for Frostpunk overheard or hover dialogue; not claimed.
- Townscaper seagull behaviour comes from reviews and player reports, not developer statements.
- Dorfromantik: reviewers do not confirm whether people appear; I treat it as "life without visible residents".
- Tropico, Banished and Minecraft details are from fan wikis and forums; Minecraft bell timing is disputed between sources.
- No study gives a recommended *number of on-screen agents* for children; 8–40 is a design judgement for diorama scale.
- No benchmark for animating 40 voxel agents on Chromebooks (see `round-3/04`).
- Pocket City 2's walking avatar is described in store and listing copy, not a major review.

---

## 11. Sources

Official and developer
- Paradox Interactive, CS2 Citizen Simulation and Lifepath: https://www.paradoxinteractive.com/games/cities-skylines-ii/features/citizen-simulation-lifepath
- Paradox Interactive, CS2 Dev Diary: Building for Bicycles (18 Nov 2025): https://www.paradoxinteractive.com/games/cities-skylines-ii/news/dev-diary-building-for-bicycles
- CS2 Development Diary 11 (forum): https://admin-forum.paradoxplaza.com/forum/developer-diary/development-diary-11-citizen-simulation-lifepath.1596988
- CS1 Dev Diary 9, Info Views (via BeyondSims): https://beyondsims.com/2015/02/skylines-dev-diary-9-info-views/
- Planet Coaster Dev Diary 5, Guest Brain: https://www.planetcoaster.com/en-US/planet-coaster-1/news/pc/dev-diary-5-guest-brain
- Planet Coaster crowds (Game Developer): https://www.gamedeveloper.com/audio/game-design-deep-dive-creating-believable-crowds-in-i-planet-coaster-i-
- GlassBox GDC 2012 (Game Developer): https://gamedeveloper.com/design/gdc-2012-breaking-down-em-simcity-em-s-glassbox-engine ; Willmott: https://www.andrewwillmott.com/talks/inside-glassbox
- Townscaper (Stålberg): https://gamedeveloper.com/blogs/how-townscaper-works-a-story-four-games-in-the-making
- Parkitect devlog: https://texelraptor.com/blog/devlog-update-130
- OpenRCT2 strings: https://raw.githubusercontent.com/OpenRCT2/OpenRCT2/develop/data/language/en-GB.txt
- Eco (IES award): https://ies.ed.gov/use-work/awards/eco-online-virtual-world-secondary-school-environmental-literacy-and-collaborative-problem-solving ; https://informalscience.org/project/eco-online-virtual-world-secondary-school-environmental-literacy-and-collaborative-problem-solving/ ; https://wiki.play.eco/en/Laws
- Dorfromantik patch notes: https://www.player.one/dorfromantik-update-performance-boost-bug-fixes-and-more-141168

Press
- https://en.wikipedia.org/wiki/SimCity_(2013_video_game) ; https://en.wikipedia.org/wiki/SimCity_4 ; https://en.wikipedia.org/wiki/Townscaper ; https://en.wikipedia.org/wiki/The_Sims_(video_game) ; https://en.wikipedia.com/wiki/Before_We_Leave
- https://www.pcgamer.com/simcity-tested-offline-play-phantom-sims/ ; https://www.pcgamer.com/simcity-inside-the-glassbox-engine ; https://shacknews.com/article/72936/simcitys-glass-box-engine-shown-off ; https://www.bgr.com/general/simcity-pr-nightmare-analysis-372284/ ; https://humantransit.org/2013/03/sim-city-will-continue-to-mislead-on-transit.html
- https://www.pcgamer.com/chirper-might-actually-be-useful-for-keeping-track-of-your-citizens-lifepaths-in-cities-skylines-2 ; https://www.shacknews.com/article/136821/cities-skylines-2-chirper-internet-citizen-lifepaths ; https://www.gamesradar.com/i-cant-be-the-only-person-going-straight-for-the-you-little-stalker-achievement-in-cities-skylines-2-right ; https://www.simplegamer.co.uk/cities-skylines-2-allows-you-to-follow-citizens-lives ; https://twinfinite.net/reviews/cities-skylines-2-review-bigger-but-not-better/ ; https://techraptor.net/gaming/news/cities-skylines-2-developers-reveals-infamous-death-waves-are-gone-in-new-video-about
- https://www.pcgamer.com/frostpunk-developers-on-hope-misery-and-the-ultimately-terrifying-book-of-laws ; https://www.pcgamer.com/you-cant-please-everyone-in-survival-city-builder-frostpunk ; https://www.dreadcentral.com/reviews/280943/frostpunk-review-apocalypse-done-depressing ; https://www.pcgamer.com/au/frostpunks-free-people-and-automatons-update-lets-you-name-your-suffering-citizens
- https://www.gamesradar.com/the-making-of-the-sims ; https://www.gamespot.com/articles/the-sims-livin-large-preview-part-3-will-wright-qanda/1100-2609362/ ; https://tcrf.net/The_Sims_(Windows)/Unused_Graphics
- https://www.pcgamer.com/au/before-we-leave-review ; https://www.gamesasylum.com/2021/11/23/before-we-leave/ ; https://www.thegamer.com/before-we-leave-peep-increase-happiness-guide/
- https://www.pcgamer.com/relax-mostly-with-this-lovely-and-peaceful-landscape-strategy-game ; https://www.newgamenetwork.com/article/2545/dorfromantik-review ; https://www.shacknews.com/article/130138/dorfromantik-review-peaceful-puzzler-that-makes-you-feel-right-at-home
- https://boingboing.net/2020/08/05/townscaper-is-a-wonderful-and.html ; https://typedbytom.substack.com/p/quest-log-12-townscaper-demo ; https://www.pcgamer.com/townscaper-is-a-pleasant-city-builder-without-all-the-fuss
- https://destructoid.com/?p=227371 ; https://www.pocketgamer.com/pocket-city/pocket-city-review-an-addictive-city-builder-without-the-wait-time/ ; https://www.touchtapplay.com/build-your-own-dream-city-in-pocket-city/ ; https://www.gamezebo.com/2018/08/02/pocket-city-review-everything-youd-want-plus/ ; https://apps.apple.com/us/app/pocket-city-2/id6748041195

Wikis, guides and forums
- https://nookipedia.com/wiki/Plaza ; https://nookipedia.com/wiki/Villager_house ; https://www.howtogeek.com/664191/how-to-recruit-new-villagers-in-animal-crossing-new-horizons/
- https://banished-wiki.com/wiki/Town_Hall ; https://kiwix.lema.org/wikihow_en_maxi_2023-03/Get-Nomads-in-Banished
- https://www.gamepressure.com/tropico-6/almanac/z8c04a ; https://steamcommunity.com/app/492720/discussions/0/4371376043391135554
- https://strategywiki.org/wiki/SimCity_4:_Rush_Hour/New_My_Sim_Mode_Options ; https://www.honestgamers.com/1923/mac/simcity-4/review.html
- https://minecraft.linxi.com.au/mechanics/villagers-and-professions ; https://wiki.sportskeeda.com/minecraft/minecraft-villager
- https://steamcommunity.com/app/453090/discussions/1/1742227898970281674 ; https://steamcommunity.com/sharedfiles/filedetails/?id=2692859803
- https://forums.frontier.co.uk/goto/post?id=8757778 ; https://steamcommunity.com/app/703080/discussions/0/2257935717977002674
- https://en.number13.de/cities-skylines-how-to-deal-with-death-waves/ ; https://github.com/CitiesSkylinesMods/TMPE/wiki/Outside-connections-not-working ; https://steamcommunity.com/app/255710/discussions/0/611701360841991469/?l=english ; https://github.com/Zuppi/ChirpFilter ; https://gameplay.tips/guides/cities-skylines-ii-info-views-guide.html ; https://www.gamepressure.com/citiesskylines/information-panel/za7595

Research
- Kontokosta et al. on 311 reporting bias: https://marroninstitute.nyu.edu/papers/bias-in-smart-city-governance-how-socio-spatial-disparities-in-311-complaint-behavior-impact-the-fairness-of-data-driven-decisions ; https://par.nsf.gov/servlets/purl/10314387
- Wellman et al. 1996: https://pubmed.ncbi.nlm.nih.gov/8706525/ ; Wellman & Peterson 2013: https://doi.org/10.1037/a0032419 ; Tärning et al. 2018: https://doi.org/10.55612/s-5002-037-010 ; Vasalou et al. 2021: https://doi.org/10.1111/bjet.13145 ; Hawkins et al. 2019: https://www.mdpi.com/2076-2615/9/3/91 (all via `research/round-3/08-tycoon.md` §5.5)
- Wald and survivorship bias (popular account): https://www.wearethemighty.com/popular/abraham-wald-survivor-bias-ww2.md
