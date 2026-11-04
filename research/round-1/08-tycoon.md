# Tycoon / resource-management games: research for DeltaOps

**About the sources.** Most of the evidence is trade press, wiki and fan-guide material found through web search. I could not get the full text of several primary interviews (Sawyer on Medium returned 403; the Planet Coaster "Guest Brains" page was truncated). Figures marked **[est.]** are estimates or third-party numbers. I could not verify the exact string "I want to go on something more thrilling" in any source. It matches how RCT guest thoughts are described, but treat the wording as unverified.

## 1. What made them successful

**RollerCoaster Tycoon 1/2 (Chris Sawyer, 1999/2002)**
- Sawyer wrote about 99% of RCT in x86 assembly, building on his Transport Tycoon code. https://en.wikipedia.org/wiki/RollerCoaster_Tycoon_(video_game)
- The franchise sold about 9M+ units by 2005, roughly 7M of them from Sawyer's two games **[reported, dated]**. MCV says most sales came well after launch (a "long tail"). https://mcvuk.com/development-news/ip-profile-rollercoaster-tycoon/
- Sawyer said he had no formal design philosophy and "worked on ideas he thought were fun." His starting ambition was simply a coaster construction set. https://www.tt-ms.de/presse/eurogamer_2016-03-03.pdf ; https://medium.com/atari-club/684a0efb0f13
- **Scenario structure.** RCT1 has 21 scenarios with two goal types: a guest count, or a park value, to be met by a set date. Most guest goals also require a park rating of at least 600. Examples:
  - Forest Frontiers: 250 guests by October, Year 1.
  - Evergreen Gardens: 1,000 guests by Year 4.
  - RCT2 Factory Capers: 1,100 guests by Year 3.

  Source: https://strategywiki.org/wiki/RollerCoaster_Tycoon/Forest_Frontiers and the Walkthrough pages. The pattern is one clear target, a deadline, and a quality floor that stops players hitting the number by cheap means.
- **Legibility.** You can click any guest to see their thoughts and mood, and a guest window lists all thoughts together. Guests respond to the environment and to price, for example walking away from an overpriced entrance. https://rct.fandom.com/wiki/Guests_and_Staff
- Sawyer said it was "probably right" that guests struggled when the park layout was bad. The simulation reflects the player's design choices back at them. https://pcgamesn.com/rollercoaster-tycoon/code-chris-sawyer

**Theme Park (Bullfrog, 1994)**
- Designed by Peter Molyneux and Demis Hassabis, who later founded DeepMind. That is a neat AI connection for facilitators.
- It had three switchable depth modes: Sandbox, Sim and Full. Sandbox focuses on building; the other two add the business layer. https://en.wikipedia.org/wiki/Theme_Park_(video_game) ; https://criticalvideogamestudies.com/?p=3222

**Theme Hospital → Two Point Hospital / Campus**
- Mark Webley said the game is about how people *think* a hospital runs, not how one actually runs. The team visited real hospitals for research, then used invented, comic diseases so the subject was funny rather than gory. https://en.wikipedia.org/wiki/Theme_Hospital ; https://gamesradar.com/the-making-of-theme-hospital-the-legendary-sim-that-paved-the-way-for-two-point-hospital
- Two Point Hospital uses a 1–3 star rating for each level. One star unlocks the next hospital; two and three stars are optional goals you can return for. There is also a yearly awards ceremony. https://en.wikipedia.org/wiki/Two_Point_Hospital
- It has reached 5M+ players **[publisher claim; not a sales figure]**. https://www.pcgamesinsider.biz/news/73074/two-point-hospital-has-hit-5m-players/
- A sardonic PA announcer carries much of the humour. https://www.pcworld.com/article/3271130/gaming/two-point-hospital-preview.html

**Zoo Tycoon (2001; Xbox 2013)**
- Blue Fang made it after RCT's success. It passed 1M sales within a year and about 2.5M by October 2003 **[reported]**. Microsoft marketed it as a "top-selling family PC game." https://en.wikipedia.org/wiki/Zoo_Tycoon_(2001_video_game) ; https://news.microsoft.com/2002/10/21/zoo-tycoon-pc-game-celebrates-1-million-units-sold-releases-zoo-tycoon-marine-mania-expansion-pack/
- The 2013 Xbox One version was aimed at families. With Kinect you could hose down and feed animals directly. Reviewers called it "too hard for kids and too simple for adults" and scored it around 70. https://www.expertreviews.co.uk/games/xbox-one-games/53153/zoo-tycoon-review ; https://gamingbolt.com/zoo-tycoon-review

**Planet Coaster / Planet Zoo / Jurassic World Evolution (Frontier)**
- Planet Coaster guests run on "Guest Brains." https://pcgamer.com/planet-coaster-will-rely-on-sophisticated-guest-brains-to-determine-attendee-behaviour
- Planet Zoo welfare combines four needs: nutrition, social, habitat and enrichment. Low welfare brings protesters; high welfare brings more guests and donations. Reviewers note that earning money, not welfare, is still the main measure of success, and that the micromanagement can feel overwhelming. https://planetzoogame.com/help-centre/player-guides/the-animals ; https://www.pcgamesn.com/planet-zoo/review
- Frontier said its zoo is "all about conservation and education, and about the welfare of your animals." https://gamesradar.com/planet-zoo-preview-e3-2019
- Planet Zoo has been used in a classroom lesson on bee, bat and beaver conservation through Checkpoint. https://dlheinz.com/en/news/76711/conservation-and-planet-zoo-the-lesson-of-a-lifetime.html
- In JWE, unmet comfort needs (environment, social, feeding) lead to breakouts and rampages. This is a dramatic, visible consequence of a single failing meter. https://www.destructoid.com/review-jurassic-world-evolution/

**Parkitect / Prison Architect**
- Parkitect makes logistics part of the puzzle: stock is hauled from a delivery centre, and guests dislike seeing staff and crates, so players build hidden staff paths. https://www.gamesasylum.com/?p=58273
- Chris Delay of Prison Architect cites Dwarf Fortress and says they "simulate the world rather than script." https://www.killscreen.com/why-game-about-prison-management-could-be-most-devastating-title-2013/ ; https://www.thesixthaxis.com/2015/10/06/prison-architect-interview/
- Two Point's founders said Prison Architect "gave us the balls to make it." https://pcgamer.com/prison-architect-gave-us-the-balls-to-make-it-say-two-point-hospital-developers

**Community and modding**
- OpenRCT2 is a GPL re-implementation of RCT2 that adds multiplayer and modern platform support. It shows how strong fan ownership of the series is. https://github.com/OpenRCT2/OpenRCT2

**Game Dev Tycoon**
- The developer seeded its own cracked build, in which piracy bankrupts the player's in-game studio. On day one, about 93.6% of players were on the cracked version **[developer telemetry]**. It is a well-known example of a system "talking back" through its rules. https://www.theregister.com/2013/04/30/game_dev_tycoon/

**Roblox tycoons**
- Theme Park Tycoon 2 (Den_S, 2012) has roughly 1.2–1.6B visits **[third-party trackers; conflicting]**. Its draw is real-time co-building with friends. https://rotrends.com/game/31970568/Theme-Park-Tycoon-2 ; https://news.xbox.com/en-us/?p=109000

## 2. What failed

- **RollerCoaster Tycoon World (2016).** Development was passed between studios, and early access drew "mostly negative" Steam reviews. Critics singled out the coaster builder and weak detail. It ended at Metacritic 43, user score 2.1. https://en.wikipedia.org/wiki/RollerCoaster_Tycoon_World ; https://gamespot.com/articles/atari-responds-to-negative-rollercoaster-tycoon-re/1100-6438887/
- **RCT4 Mobile.** AppSpy said its premium price turned out to be "a downpayment on consumable currency"; PocketGamer called it an "awful cash-in premium mess." RCT Touch moved to card packs. https://www.appspy.com/review/8423/rollercoaster-tycoon-4mobile ; https://www.pocketgamer.co.uk/articles/061034/r/ ; https://www.commonsensemedia.org/app-reviews/rollercoaster-tycoon-touch
- **FarmVille-style timers.** Ian Bogost's satire Cow Clicker attacked appointment mechanics: crops wither if you miss the window, and paid currency skips the wait. He named the problems as exploited psychology, no meaningful play, and "destroyed time." https://en.wikipedia.org/wiki/Cow_Clicker ; https://necsus-ejms.org/cows-clicks-ciphers-and-satire/

## 3. Educational evidence

- A mixed-methods study had 26 children (average age 11) play RCT3 for 24 hours over 7 weeks. They reported learning economics and social-studies principles and carrying them into schoolwork. This is a small study. https://d.lib.msu.edu/etd/16955/OBJ/download
- The University of South Florida has RCT physics lessons. https://www.usf.edu/education/faculty-staff/rosengrant-virtual-stem-laboratory/video-game-physics/lessons-rubrics.aspx
- Education World notes the game covers budgeting and marketing but "is not designed for the classroom." https://www.educationworld.com/a_tech/tech-in-the-classroom/roller-coaster-tycoon-3.shtml

## 4. Patterns that made these games work

1. **One headline goal, a deadline, and a quality floor** (RCT: guests + rating ≥600).
2. **Agents' needs shown in short first-person thoughts** that you can click on (RCT guests, JWE comfort).
3. **Needs split into a few named meters** (Planet Zoo's four).
4. **Consequences you can see** (protesters, escapes, vomit, guests walking out).
5. **Humour that keeps a serious subject light** (Theme Hospital's fake diseases, Two Point's PA announcer).
6. **Adjustable depth** (Theme Park's Sandbox/Sim/Full).
7. **Graded stars**, so finishing a level and mastering it are separate goals (Two Point).
8. **Creativity and sharing** (coaster building, OpenRCT2, Roblox co-building).

---

## Implications for DeltaOps

**Concept: "Island Park Tycoon: The Manager Bot."** Children run a floating voxel nature park with blocky visitors, animals and rangers. An AI "Park Manager" helper reads each instruction card and turns it into a plan. It shows its guess and how sure it is (e.g. "Build 4 snack stands, 82% sure"), then the world simulates a season.

The manager optimises only the metric written on the card. Two meters always stay visible, **Visitors** and **Wildlife**, and a hidden third (Litter / Calm) appears from Stage 3. Thought bubbles appear over characters ("Too noisy, I'm hiding!" from a hedgehog; "Where's the loo?" from a visitor). This takes RCT's clickable thoughts and makes them automatic and readable at a glance.

**Season goals (RCT-style: target + floor)**
- "Reach 100 visitors by Season 3, Wildlife ≥ 60%."

**Stages (6 × 3 cards; card B is always deliberately vague)**

| Stage | Theme | Card A (clear) | Card B (vague) | Card C (balanced) | Lesson |
|---|---|---|---|---|---|
| 1. Opening Day | Objectives | "Get 50 visitors" | "Make the park popular" | "Get 50 visitors, keep the pond quiet" | The AI does exactly what's written |
| 2. Snack Attack | Side effects | "Maximise snack sales" | "Make money" | "Sell snacks, keep paths clean" | Litter meter appears; birds leave |
| 3. Needs Check | Agents' needs | "Make animals happy" | "Fix the animals" | "Give otters water, shade and friends" | 4-need panel (Planet Zoo pattern) |
| 4. Busy Weekend | Trade-offs | "Double visitors" | "More people!" | "More visitors, but close the nesting area" | Breakout-style moment: the deer flee (JWE pattern) |
| 5. Mystery Complaints | Reading the data | AI ranks thought bubbles | "Do what people want" | "Count the bubbles before deciding" | Loud agents vs. many quiet agents |
| 6. Star Park | Combined objective | Children pick weights with sliders/tiles | "Be the best park" | Their own written-by-tiles goal | 1–3 star rating (Two Point pattern) |

**Facilitator questions**
- "The manager was 90% sure. Why was it still wrong?"
- "Who didn't get a vote in that goal: visitors, otters, or rangers?"
- "What did the vague card make the AI guess?"
- "If you could add one more meter, what would it measure?"
- "Would a real park manager want this goal?"

**End artefact.** A printable or downloadable "Park Charter": the group's final goal card, a star rating, their 3 favourite thought bubbles, and a before/after island snapshot.

**Recommendations**
1. **Write every goal as "target + floor".** Use RCT's guests + 600 rating pattern to model the alignment idea "optimise X but never break Y."
2. **Show needs as short first-person thought bubbles, not numbers.** RCT's clickable thoughts let kids read agents without spreadsheets; show 3–5 bubbles automatically.
3. **Cap each animal's needs at about four icons.** Planet Zoo's welfare split is clear, but reviewers found the full micromanagement overwhelming.
4. **Make every side effect visible and funny.** Use protesters, fleeing deer, litter piles, a sardonic "PA" line from the AI helper. Theme Hospital and Two Point show that humour keeps hard topics safe.
5. **Use 1–3 stars so every group "passes."** In Two Point, one star unlocks the next level and the extra stars are optional replay goals, which suits mixed-age groups and retries.
6. **Offer depth modes for facilitators.** Copy Theme Park's switchable Sandbox/Sim/Full as a "Explore / Challenge" toggle for 30- vs 60-minute sessions.
7. **Avoid timers, currencies and grind entirely.** RCT4 Mobile, FarmVille and Cow Clicker are the warnings: real-time waiting and paid shortcuts break facilitated group play.
8. **Ship polish over breadth.** RCT World failed on a weak core builder and visible lack of detail; one rich island beats many thin ones.
9. **Mention that Theme Park was co-designed by Demis Hassabis.** It is a concrete "AI people started here" hook for STEM clubs. https://en.wikipedia.org/wiki/Theme_Park_(video_game)
10. **Support claims modestly when pitching to venues.** Cite the RCT3 economics study and the Planet Zoo conservation lesson, but note there is no controlled evidence that games teach better than a real zoo visit. https://www.school-news.com.au/?p=14463
