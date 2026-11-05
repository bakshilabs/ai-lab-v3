# Land a Rocket: lab design research

Research for a new DeltaOps Learning AI lab, **Land a Rocket**, for children aged 8–14 in schools, clubs, holiday camps and museums. Sessions run for 45–90 minutes. The lab follows the house pattern used in `games/ecotown/DESIGN.md` and `research/eco-town-*.md`: vague instruction → confident wrong AI guess with a "% sure" → children catch it through evidence → a clearer instruction fixes it. Levels are split into acts.

- Written 5 November 2026, in British English.
- Scope: this lab only. The sibling labs (Build a Space Colony, Train a Robot, Become a Drone Pilot) are covered by other agents. Section 4.9 lists the points where the labs could share assets or overlap.
- Method: ordinary web search plus page fetches. The Exa connector was not authorised in this session. Every factual claim has a link. Where the only source is secondary, a forum or a wiki mirror, the text says so. Claims I could not confirm are listed in section 7.
- Visual reference: `deltaopslearning-brochure/img/game-stem.jpg`, `island-mars.png` and `obj-rocket.png`, as described in `research/context.md`. These show floating voxel dioramas, a high three-quarter camera, soft light from the upper left, a navy AI helper card with a "% sure" bar and a yellow or teal facilitator card.

---

## 0. Summary of recommendations

1. **Teach the job, not the joystick.** In real rocket landings, people do not hand-fly the vehicle in the final seconds. Apollo was the exception. A Falcon 9 booster lands itself. A Mars lander is too far away to steer, because a signal takes about 14 minutes each way ([CS Monitor](https://csmonitor.com/Science/2012/0803/Seven-minutes-of-terror-Mars-rover-landing-will-be-a-nail-biter)). The professional skill is setting the vehicle up well: the fuel budget, the target, the limits and the rules. After that comes checking the plan and making a calm go/no-go call. The lab should be **decision-led**, with one or two short "hands-on" moments. A twitch game of skill like *Lunar Lander* is the wrong model.
2. **Use the real failure library as the source of the AI's mistakes.** Every confident mistake the AI helper makes should echo a real event that children can look up afterwards. Mars Climate Orbiter mixed up units. Schiaparelli trusted a bad sensor. Mars Polar Lander accepted a false touchdown signal. Odysseus launched with a safety switch still on. A Falcon 9 booster fell over because one leg did not latch. The detail is in section 1.6. The real lesson, from the inquiry reports, is that *systems* fail when nobody checks a number. That fits the house message, "check the evidence", exactly.
3. **Telemetry graphs are the "lens".** In Eco Town, a different camera view exposes the AI's mistake. Here the evidence is a **telemetry strip**: simple line graphs of height, speed, fuel, wind and sensor readings, drawn by a "dry run" simulation before the real flight. Reading these graphs is a real job skill and is on the curriculum. Upper KS2 includes "line graphs", and KS3 includes distance-time graphs (section 3).
4. **Every level ends in a go/no-go poll**, run by the child playing Flight Director. This is how real mission control makes decisions ([NASA flight control positions](https://en.wikipedia.org/wiki/List_of_NASA%27s_flight_control_positions); [Artemis I launch director](https://www.nasa.gov/podcasts/welcome-to-rocket-ranch/episode-19-launching-artemis/)). It also gives every child in a group of three to five a voice. **"No-go, let's wait" must sometimes be the right answer**, and it must be rewarded.
5. **The AI helper is a GNC tool, and it is sometimes right.** In two of the six levels, the children's check *confirms* the AI. The best case is the Apollo 11-style "program alarm", where the AI is right that it is safe to continue. Round-3 learning-evidence research found that children of 8–10 lean towards the more confident answer, and that children can learn "confident but wrong" more easily than "unsure but right" (`research/round-3/02-learning-evidence.md` §2.1). The lab must show both.
6. **Failure is gentle, physical and funny, and never fatal.** Test boosters splash into the sea and bob there, or tip over on the deck with a "clonk" and a puff of voxel smoke. Crewed vehicles always have a working abort. Real precedents for "fail safely" exist: the CRS-16 booster aimed itself at the sea when its grid fins failed ([Space.com](https://www.space.com/42629-spacex-dragon-launch-missed-landing-crs16.html)), and New Shepard's escape system saved its capsule in 2022 ([Astronomy](https://www.astronomy.com/space-exploration/blue-origins-rocket-booster-failed-but-its-escape-system-prevailed/)).
7. **The story arc is one test campaign**, from a 50-metre hop on a test stand to a rover landing on Mars. The finale's emotional idea suits a trailer: *on Mars you can't help in real time. The only thing that lands the rover is the quality of the instructions you wrote beforehand.*

---

## 1. Real-world grounding

### 1.1 Falcon 9 booster recovery

**The sequence.** Falcon 9 first-stage recovery follows a set order of burns and aerodynamic steering. The details vary with the landing site ([Inverse](https://inverse.com/article/33904-how-spacex-lands-a-falcon-9-rocket-in-6-steps); [Cosmos](https://cosmosmagazine.com/space/launch-land-repeat-reusable-rockets-explained); [Spaceflight101](https://spaceflight101.com/?p=19325)).

1. **Separation and flip.** Cold-gas thrusters at the top of the booster turn it round.
2. **Boostback burn.** Three of the nine Merlin engines relight to reverse the booster's sideways speed and aim it back at a landing zone near the launch site. For drone-ship landings, the boostback is shorter or skipped. The booster then follows a ballistic arc out to the ship, which waits down-range.
3. **Grid fins.** Four titanium grid fins open from the top of the booster. They steer it while the engines are off and it falls through the atmosphere.
4. **Entry burn.** About three engines fire for something like 17 seconds on one mission. The burn slows the booster before it reaches thick air, so it does not overheat or break up.
5. **Landing burn.** A single engine fires, the four carbon-fibre and aluminium-honeycomb legs unfold, and the booster touches down.

**The scale is now routine.** The 600th Falcon booster landing took place on 18 April 2026. The fleet leader, B1067, had flown 37 times by August 2026 ([BGR](https://www.bgr.com/2273946/spacex-falcon-9-rocket-booster-reuse-37th-time/); [Wikipedia list](https://en.wikipedia.org/wiki/List_of_Falcon_9_and_Falcon_Heavy_launches)). Children aged 8–14 have never known a world where boosters did *not* land. The lab can use that: what amazes adults is normal to them, so what needs explaining is *why it is still hard*.

**The "hoverslam".** Even one Merlin engine at its lowest throttle pushes harder than a nearly empty booster weighs, so the booster cannot hover. If it tried, it would stop and then climb back up. Instead, the engine has to light at exactly the right height for the speed to reach zero just as the legs touch the deck. Enthusiasts call this a "hoverslam" or "suicide burn". The qualitative claim is consistent across many sources, but the exact minimum throttle figure is not settled in public sources ([Lex Fridman/Tim Dodd transcript via Audioscrape](https://www.audioscrape.com/person/tim-dodd?page=9); [Reddit r/spacex](https://redlib.astrial.org/r/spacex/comments/3rdi69/landing_a_rocket_question)). **For the lab, call it the "last-second burn"**, because "suicide burn" is not appropriate for children (section 5).

**Drone ships and weather.** At sea, the deck rises and falls with the swell. One early attempt found that the swell changed the landing pad's height by up to several metres ([Spaceflight101](https://spaceflight101.com/?p=8679)). Rough seas have also pushed a drone ship off station and forced launch delays ([BGR](https://www.bgr.com/science/spacex-launch-delay-starlink-drone-ship/)). In another case, a booster that landed safely then toppled on the voyage back to port ([Geekchamp](https://geekchamp.com/spacexs-historic-19-time-landed-falcon-9-topples-at-sea-due-to-rough-weather/)). SpaceX measures the wind over the landing area with weather balloons ([GlobalSecurity](https://www.globalsecurity.org/space/systems/falcon-spacex-boost-back.htm)). I found no official published limit for wind or wave height. An informal view is that the height of the sea usually stops a landing before the wind does ([Reddit discussion](https://lr.in.psf.lt/r/SpaceXLounge/comments/1h35b7i/f9_max_xwind_speeds_for_drone_ship_landing)). The lab should therefore make the **moving deck**, not only the wind, the hazard in Level 4.

**Two landing failures that teach well.**
- **Jason-3, January 2016.** The booster touched down only 1.3 m off centre. Then a lockout collet on one leg failed to latch, and the booster fell over. Musk suggested that ice from heavy fog at liftoff may have caused it. That explanation was speculative ([Space.com](https://space.com/31649-spacex-rocket-landing-jason3-satellite-launch.html); [Spaceflight Now](https://spaceflightnow.com/2016/01/18/spacex-narrowly-misses-booster-landing-at-sea/); [Scientific American](https://www.scientificamerican.com/article/video-shows-spacex-falcon-9-rocket-land-on-a-drone-ship-then-fall-over-and-explode/)). *Lesson: a nearly perfect landing can still fail on one small item that nobody checked. That is why checklists exist.*
- **CRS-16, December 2018.** A grid-fin hydraulic pump stalled and the booster began to spin. The flight computer recognised the problem and **never moved its aim point ashore**. The booster made a soft landing in the sea and kept sending data. Musk said a backup pump would probably be added ([Space.com](https://www.space.com/42629-spacex-dragon-launch-missed-landing-crs16.html); [Universe Today](https://www.universetoday.com/140774/good-news-a-spacex-cargo-resupply-is-off-to-the-space-station-bad-news-failed-hydraulics-in-the-grid-fins-caused-the-first-stage-booster-to-crash-into-the-ocean)). *Lesson: good automation is designed to fail safely. This is the model for the lab's gentle "splash" outcome.*

### 1.2 New Shepard

New Shepard is Blue Origin's suborbital rocket. It goes straight up and comes back down to land near where it launched, which makes it the closest real match to the lab's "hop test". On the way down, the booster stays upright and steers with fins. Then it opens **drag brakes**, relights its BE-3 engine about 1.5 km above the ground, unfolds its landing gear and settles. On the first landing in November 2015, it touched down at 4.4 mph, about 2 m/s ([Planetary Society](https://www.planetary.org/articles/20151124-blue-origin-new-shepard-lands); [The Engineer](https://theengineer.co.uk/blue-origin-completes-vertical-rocket-landing); [Universe Today](https://www.universetoday.com/articles/new-shepard-defies-odds-sticks-landing)). A local news piece that appears to repeat Blue Origin's own launch-site material describes "ring and wedge fins" that stabilise the booster, and drag brakes that "reduce the booster's speed by half" ([San Angelo Live](https://sanangelolive.com/node/67427)). The BE-3 can throttle down a long way, which is what lets the booster settle within a few feet of its target ([CBS/SpaceNews](https://cbsnews.com/network/news/space/home/spacenews/files/040715_be3.html)).

**The escape system matters for the lab.** In September 2022, on the uncrewed flight NS-23, the booster failed about a minute after launch. The capsule's escape system fired, and the capsule parachuted down safely. The FAA reported no injuries ([Astronomy](https://www.astronomy.com/space-exploration/blue-origins-rocket-booster-failed-but-its-escape-system-prevailed/); [EarthSky](https://earthsky.org/space/launches-blue-origin-crewed-flights-grounded-misfire/)). *This is the real-world basis for the lab's rule that crewed vehicles always have an abort that works.*

### 1.3 The Apollo Lunar Module

**Who flew it.** The guidance computer flew the descent through a series of programs. In P64, the approach phase, the commander could tap to re-aim the computer at a new landing point. P66 handled the final vertical descent. It could start automatically at about 30 m, or the commander could select it by hand ([MIT/NASA text reprinted by dodlithr](https://dodlithr.blogspot.com/2016/12/lm-descent-to-moon-part-6-programming.html); [Apollo 11 Mission Report](https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/a11MIssionReport_1971015566.pdf)). This mix of humans and automation is a good model for the lab: **the computer flies, and a human can redirect it**.

**The 1202 alarm.** During Apollo 11's descent, the computer raised "1202" program alarms, which meant it was overloaded. The guidance officer, Steve Bales, aged 26, had seconds to decide whether to abort. Jack Garman, a support engineer who had memorised the alarm codes, told him it was fine as long as the alarm did not keep repeating, and Bales called "go". Two weeks earlier, in a simulation, Bales had *aborted* over a similar alarm ([Purdue](https://engineering.purdue.edu/~andrisan/Courses/AAE190%20Fall%202000/Bales.html); [RNZ interview with Bales](https://www.rnz.co.nz/national/programmes/afternoons/audio/2018703530/mission-controller-steve-bales-the-decision-that-made-history); [Matthew Ström](https://matthewstrom.com/writing/distributed-decision-making)). *Lessons: rehearsal, a reference card, a team that splits the knowledge between them, and calm. Here the "alarming" machine was actually right to carry on.*

**The boulder field and the fuel.** The computer was taking Eagle towards a boulder field around West crater, so Armstrong took over and flew past it ([Syfy Wire](https://www.syfy.com/syfy-wire/tour-the-apollo-11-landing-site-minute-by-minute-during-that-one-small-step); [CBS News](https://www.cbsnews.com/network/news/space/home/spacenews/files/071814_apollo11_45th.html)). Mission Control called out the fuel left as "60 seconds" and then "30 seconds". Estimates of what remained at touchdown range from about 17 to about 25 seconds ([RPSL Apollo Story](https://rpsl.org.uk/rpsl/StandingDisplays/SD2018-06_Barry_Feltham_The_Apollo_Story/files/basic-html/page38.html); [NPR/WUNC](https://www.wunc.org/2004-07-20/apollo-11s-close-call)). Section 7 notes that the exact figure needs checking. *Lesson: the map was made from orbit and could not show the rocks. The fuel callouts are a real "budget countdown".*

**Apollo 12 and reading telemetry.** Lightning struck Apollo 12 shortly after launch. EECOM John Aaron recognised the strange pattern of telemetry from an earlier simulation and called "SCE to Aux", which restored the data ([The Register](https://www.theregister.com/2019/11/14/apollo_12_launch/); [Aerospaceweb](https://aerospaceweb.org/question/spacecraft/q0140.shtml)). *Lesson: a controller who knows what normal graphs look like can spot an abnormal one.*

### 1.4 Mars entry, descent and landing

**Curiosity (2012), "seven minutes of terror".** The landing took about seven minutes from the top of the atmosphere to the ground, slowing from about 13,000 mph to zero. Because signals take about 14 minutes each way, the landing was over, one way or the other, before Earth heard anything ([CS Monitor](https://csmonitor.com/Science/2012/0626/What-causes-the-7-minutes-of-terror-in-Mars-Rover-landing); [The Week](https://theweek.com/articles/473832/mars-rovers-7-minutes-terror-guide-planned-landing)). The sequence ran: heat shield, parachute, then powered descent. Last came the **sky crane**. A rocket-powered descent stage hovered and lowered the rover on three nylon tethers about 7.5 m long. When touchdown was detected, it cut the tethers and flew off to crash about 600 m away ([NASA/JPL PIA14839](https://www.jpl.nasa.gov/images/pia14839-curiositys-sky-crane-maneuver-artists-concept/); [Planetary Society](https://planetary.org/space-images/curiositys-skycrane-maneuver); [Walsworth](https://digitaleditions.walsworth.com/article/Curiosity+On+The+Red+Planet%3A+Mars+IS+Ours%21/1181610/127025/article.html)). Engineers called it "the right kind of crazy" ([Space.com](https://www.space.com/curiosity-rover-sky-crane-landing-mars-exploration)).

**Perseverance (2021): terrain-relative navigation.** Hazards in Jezero crater, such as cliffs, dune fields and rocks, were mapped from orbit and stored on board. While the rover hung under its parachute, the **Lander Vision System** photographed the ground about once a second for roughly 20 seconds. It matched landmarks in those photos to the map and combined the result with data from its motion sensors. Within about 10 s, it knew its position to within a few metres, against a 40 m requirement. **Safe Target Selection** then chose the safest reachable spot on the hazard map. It could move the landing point by up to about 600 m ([NASA TRN](https://science.nasa.gov/technology/technology-highlights/terrain-relative-navigation-landing-between-the-hazards); [JPL](https://www.jpl.nasa.gov/news/tricky-terrain-helping-to-assure-a-safe-rover-landing); [phys.org/JPL](https://phys.org/news/2019-07-mars-rover-autopilot-terrain-hazards.pdf); [NTRS](https://ntrs.nasa.gov/citations/20230006986)). The final touchdown was about 5 m from the chosen target, ten times better than required. The system was tested with a helicopter over Mars-like ground, on rocket flights with Masten's Xombie, and in Monte Carlo simulations ([scite summary of Johnson et al.](https://scite.ai/authors/seth-aaron-N808Qm)). *This is real AI-style autonomy that children can understand: "the lander compares what it sees with a map, like you matching a photo to a jigsaw box lid."*

### 1.5 Artemis Human Landing System

NASA's Human Landing System contracts are with SpaceX (Starship HLS) and Blue Origin (Blue Moon). Starship HLS is meant to use smaller thrusters **mounted high on the body**, burning gaseous oxygen and methane, for the last part of the descent. The aim is to keep the main engines from blasting lunar dust and rocks. Sources disagree on the details, and one says these thrusters may turn out not to be needed ([Wikipedia: Starship HLS](https://en.wikipedia.org/wiki/Starship_HLS); [Universe Today](https://www.universetoday.com/articles/how-spacex-is-changing-starship-to-be-able-to-land-on-the-moon)). Musk reportedly said they would also steady the ship in strong winds. NASA Langley tests "plume-surface interaction", meaning how rocket exhaust scours the surface, in a 60-foot vacuum sphere. This matters because flying dust and rock can damage the lander, nearby equipment and crew ([NASA NTRS](https://ntrs.nasa.gov/citations/20230011539); [NASA](https://www.nasa.gov/?p=935855); [HLS IAC 2026 presentation](https://ntrs.nasa.gov/api/citations/20260009199/downloads/HLS%20IAC%202026%20Presentation%20FINAL.pdf)). Secondary sources say the first crewed landing has slipped to Artemis IV in early 2028, but treat the dates as fluid ([Wikipedia](https://en.wikipedia.org/wiki/Starship_HLS)). *For the lab, this gives a Level 2 option ("land close to base: what will the blast do to it?") and a centre-of-mass talking point: a very tall, thin lander on a slope.*

**Odysseus (IM-1, 2024) as a modern Moon cautionary tale.** Before launch, nobody switched off a safety lock on the laser rangefinders, and testing them on the ground had been skipped to save time and money. Hours before landing, engineers rewired the software to use a NASA experimental lidar instead. The lander then caught a foot on uneven ground and tipped over, though it still worked and landed within about 1.5 km of its target ([SpaceQ](https://spaceq.ca/simple-error-could-have-resulted-in-intuitive-machines-mission-failure/); [Space.com](https://space.com/intuitive-machines-odysseus-moon-lander-tipped-over); [ScienceAlert](https://www.sciencealert.com/the-odysseus-moon-lander-is-tipped-over-but-why)). *Lessons: the checklist item that gets skipped, and the team that improvises calmly.*

### 1.6 The failure library: real mistakes the AI helper can echo

| Real event | What went wrong | Type of mistake the AI can copy | Lab level |
|---|---|---|---|
| **Mars Climate Orbiter, 1999** | Ground software reported thruster impulse in pound-force seconds. The navigation team expected newton-seconds, a factor of about 4.45. The orbiter came in far too low and was lost. The inquiry also blamed weak checking and validation and a short-staffed navigation team ([UC PDF of MIB excerpts](https://homepages.uc.edu/~thomam/Implications_IT/pdf/ch8/mars_orbiter_failure.pdf); [arXiv review](https://arxiv.org/pdf/1903.02461)) | **Wrong units**: the AI assumes the units of a number it was given | 3 |
| **Schiaparelli, 2016** | The motion sensor (IMU) saturated for about 1 s. The navigation software accepted the bad value and worked out a *negative* altitude while the lander was still about 3.7 km up. It then released its parachute early and fired its engine only briefly ([ESA](https://www.esa.int/Newsroom/Schiaparelli_landing_investigation_completed); [Spaceflight Now](https://spaceflightnow.com/2016/11/25/esa-says-doomed-mars-lander-succumbed-to-bad-altitude-reading/)) | **Trusts a sensor glitch** and does not reject an impossible value | 5 |
| **Mars Polar Lander, 1999** | When the legs unfolded, they probably gave a false "touchdown" signal. The software should have ignored it but didn't, and it shut the engines down about 40 m up ([Spaceflight Now](https://spaceflightnow.com/news/0003/29marsreports/index.html); [Bad Technology summary](https://bad.technology/articles/mars-polar-lander-leg-sensor-software-bug-shuts-down-engines-40-metres-above-surface.html)) | **Trusts a sensor glitch** (a second example) | 5 |
| **Apollo 11, 1969** | The computer steered towards a boulder field it could not see. The 1202 alarms *looked* serious but were safe to fly through (sources in §1.3) | **Missing data** (an old map). **Confirmed safe** (the alarm) | 2 |
| **Falcon 9 / Jason-3, 2016** | One leg latch failed and the booster toppled (sources in §1.1) | **Checklist item missed** | 4 (deck check) |
| **Falcon 9 / CRS-16, 2018** | A grid-fin pump stalled. The guidance kept its aim on the sea, a deliberately safe failure (§1.1) | **Good automation fails safely** (the model for gentle failure) | 3, 4 |
| **Odysseus, 2024** | A safety lock was left on, and a test was skipped (§1.5) | **Checklist item missed / untested assumption** | 2 option |
| **Rough-sea delays and topples** | The moving deck and the sea state, not only the wind (§1.1) | **Plans for average conditions** | 4 |

These mistakes match the four AI-mistake rules already used in Eco Town (it optimises one word, it assumes the typical case, it misses data, it reads instructions literally) and add a fifth that is specific to rockets: **it trusts every number it is given**, whether the units are wrong or a sensor has glitched.

This matches the research on people using automation. Parasuraman and Manzey's review found that "automation bias" means leaning too heavily on an automated aid. It causes errors of omission (missing a problem because the aid did not flag it) and errors of commission (following the aid's wrong advice). It affects experts as well as beginners, and simple practice does not remove it ([Parasuraman & Manzey 2010, TU Berlin repository](https://depositonce.tu-berlin.de/items/0c787d91-6021-480b-a333-009e0d1d0092/full)). Professionals deal with it through procedures such as cross-checks, limits and polls, not through willpower. The lab should teach the procedure.

### 1.7 The physics, explained for children

Each idea below has a one-line explanation the AI helper or facilitator can use, a voxel picture, and a meter.

| Idea | Child-friendly explanation | What the game shows | Curriculum hook |
|---|---|---|---|
| **Gravity** | "The planet is always pulling the rocket down. On the Moon it pulls about a sixth as hard as on Earth, and on Mars about a third." | A "pull" arrow under the rocket, with its length changing by world | Y5 Forces: "unsupported objects fall towards the Earth because of the force of gravity" ([DfE](https://www.gov.uk/government/publications/national-curriculum-in-england-science-programmes-of-study/national-curriculum-in-england-science-programmes-of-study)). KS3: weight = mass × g ([Collins KS3 SoW](https://resources.collins.co.uk/Wesbite%20images/Science%20as%20a%20Five-Year%20Course/All%20AQA%205%20year%20SoW%20Combined%20Science.pdf)) |
| **Thrust-to-weight ratio** | "If the engine pushes harder than the planet pulls, you go up. If it pushes the same, you hover. If it pushes less, you sink." | A see-saw gauge of the engine-push arrow against the pull arrow. "Go up", "hover" and "sink" zones | KS3 balanced and unbalanced forces ([Teachit KS3](https://www.teachit.co.uk/resources/science/year-7-physics-knowledge-organiser-forces)). NGSS MS-PS2-2 |
| **Fuel budget and delta-v** | "Fuel is your money. Every change of speed costs fuel. Extra fuel is heavy, so carrying it costs more fuel, like carrying water to cross a desert." | A fuel bar shown as coins: the boostback, entry burn and landing burn each "spend" a slice, and a reserve slice must be left | Estimation and budgets. The rocket equation's steep mass ratio ([Wikipedia](https://en.wikipedia.org/wiki/Rocket_equation); [the "water to carry water" analogy](https://to-the-stars-dlr.pages.dev/rocketry-parent.html)) |
| **The last-second burn (hoverslam)** | "This booster is too strong to hover, even on low power. So it lights its engine at just the right height, and its speed reaches zero just as the legs touch." | A speed-against-height graph with a "too early" zone (it stops in mid-air and climbs again) and a "too late" zone (it lands hard) | KS3 speed and distance-time graphs ([RMG KS3 requirements](https://www.rmg.co.uk/sites/default/files/KS3%20Curriculum%20Requirements.pdf)) |
| **Wind and gusts** | "The average wind is not the wind you land in. A gust is a sudden push." | Wind-sock voxels, and a wind graph with an average line and gust spikes | Y5 air resistance. Statistics: mean against range |
| **Centre of mass** | "A rocket is like a broom balanced on your hand. Keep its heavy part over its feet, and spread its feet wide." | A centre-of-mass dot over the leg footprint. If the dot is outside the footprint on a slope or a rocking deck, it tips | Y5 forces and mechanisms. KS3 moments (secondary) |
| **Air resistance and grid fins** | "Grid fins are like steering with your hand out of a car window." | Fins opening, with tiny airflow streak voxels | Y5: "identify the effects of air resistance" ([DfE](https://www.gov.uk/government/publications/national-curriculum-in-england-science-programmes-of-study/national-curriculum-in-england-science-programmes-of-study)) |
| **Time delay** | "Mars is so far away that a radio message takes about 14 minutes. The landing takes 7. So nobody on Earth can steer it." | A message envelope crawling across the screen during the Mars landing | Y5 Earth and space |
| **Units** | "4.45 newtons make one pound-force. If two teams use different units, the numbers look fine but mean different things." | A data sheet with a unit stamp, and a "units check" tick box | KS3 working scientifically: SI units. Mathematics: conversion |

The physics engine can be simple: one-dimensional vertical motion with a fixed mass-loss rate, plus a sideways drift in Levels 3–5. Every number on screen must be "real-ish" and consistent. Children will compare graphs.

### 1.8 Guidance, navigation and control, and how AI and autonomy are really used

**GNC in one sentence each.** *Navigation*: where am I and how fast am I going? *Guidance*: what path should I fly from here? *Control*: which engine and fin commands keep me on that path? GNC engineers design these algorithms, test them in simulation, and work them into the vehicle ([OpenCourser career profile](https://opencourser.com/career/ayzyrm/guidance-navigation-and-control-engineer); [a spacecraft GNC engineer's own account](https://williamfife.substack.com/p/what-i-do-spacecraft-guidance-navigation)).

**Convex-optimisation guidance.** At NASA JPL, Behçet Açıkmeşe, Lars Blackmore and colleagues showed how to set up the fuel-optimal powered-descent problem so that a computer can solve it reliably in real time. They turned it into a "second-order cone program" using a technique called "lossless convexification". They also showed what to do when no path can reach the target: land as close as possible. The onboard version, **G-FOLD**, flew large diverts on Masten's Xombie rocket in 2012–2014 ([NASA NTRS 2012](https://ntrs.nasa.gov/citations/20120001230); [NTRS 2015](https://ntrs.nasa.gov/citations/20150014802); [Tech Briefs](https://www.techbriefs.com/component/content/article/12247-npo-46647); [patent US8489260](https://patents.google.com/patent/US8489260)). Blackmore then joined SpaceX to lead the GNC work on Falcon 9 landings. Public sources do not confirm whether Falcon 9's flight software uses G-FOLD itself ([Teslarati](https://testops.teslarati.com/spacex-rocket-landing-expert-describes-starship-challenge)). **Explain it to children as**: "Every split second, the computer asks: of all the paths from here to the pad, which one uses the least fuel and never breaks a rule? It picks the best one, flies a tiny bit of it, then asks again."

**The parallel with an AI helper.** In the lab, the helper behaves exactly like an optimiser. It finds the *best* answer to the question it was given. If the question leaves out a rule ("touch down slower than 2 m/s"), or gives a number in the wrong units, the best answer to that question is wrong. **That is the core lesson, and it is literally how landing guidance works.** A clearer instruction amounts to a better set of rules for the optimiser to obey.

**Terrain-relative navigation** (§1.4) is the lab's main example of AI-style perception: matching pictures to a map. It is also where the AI can be *right* (Level 5).

**Autonomy and trust in professional practice.** Falcon 9 and Mars landers land autonomously, so the human role moves *earlier*, into design, simulation, data checks and the go/no-go call. Apollo shows the other model, with a human able to take over in the final seconds. The lab includes both: humans re-aim the lander in Level 2, and humans write the rules in advance in Level 5.

### 1.9 Mission control: roles, polls, checklists, telemetry and anomalies

- **Flight Director** leads the flight controllers and has overall responsibility for success and safety. Before big events, the director "goes round the room", asking each controller for "go" or "no-go" ([List of NASA flight control positions](https://en.wikipedia.org/wiki/List_of_NASA%27s_flight_control_positions); [Flight controller](https://en.wikipedia.org/wiki/Flight_controller)).
- **FIDO**, the flight dynamics officer, owns the flight path. **GUIDO**, the guidance officer, watched the onboard guidance and navigation software. **CAPCOM**, the spacecraft communicator, is usually the only person who speaks to the crew, using the call sign "Houston". **EECOM** watched electrical and environmental systems (same sources).
- **Launch Director.** On Artemis I, Charlie Blackwell-Thompson led a launch team of about 90 controllers. She gave the final "go" into terminal count, and she also took the decision to scrub when a problem could not be fixed ([NASA podcast](https://www.nasa.gov/podcasts/welcome-to-rocket-ranch/episode-19-launching-artemis/); [Spectrum News 13](https://mynews13.com/fl/orlando/news/2022/04/01/meet-the-woman-who-will-call--go-for-launch--for-nasa-s-moon-bound-rocket--charlie-blackwell-thompson); [AllSides/NYT summary](https://www.allsides.com/news/2022-09-03-0700/science-nasa-scrubbed-another-moon-launch-it-may-not-be-last-time)). *Scrubbing is a professional success, not a failure. The lab should say so.*
- **Simulations ("sims").** Flight controllers train in long simulations, and certification takes from 18 months to three years ([NASA NTRS](https://ntrs.nasa.gov/api/citations/20110014997/downloads/20110014997.pdf); [NTRS](https://ntrs.nasa.gov/citations/20110003658)). Bales's aborted sim before Apollo 11 shows why practice matters (§1.3).
- **Checklists.** Gawande sets out two types. With **read-do**, you read each step and then do it, like a recipe. With **do-confirm**, the team works from memory, then pauses and checks. A checklist needs a clear **pause point**, and it should take no more than 60–90 seconds at that point ([summary of *The Checklist Manifesto*](https://sachachua.com/blog/2015/03/sketched-book-checklist-manifesto-get-things-right-atul-gawande/); [Steve Grossi notes](https://www.stevegrossi.com/on/the-checklist-manifesto)). The lab's go/no-go poll is a do-confirm checklist with a pause point.
- **Anomaly response.** The pattern is: notice the odd reading, check it against a second source, look it up (the alarm card), decide, and tell the crew. Apollo 11 (1202) and Apollo 12 (SCE to Aux) are both stories children can follow.

### 1.10 The real jobs this trains towards

Descriptions of day-to-day work are drawn from job postings and career profiles, so they show typical duties rather than a survey of the profession.

| Job | What they do day to day | Lab role and level where it shows |
|---|---|---|
| **GNC engineer** | Writes and tunes the guidance laws, navigation filters (for example Kalman filters) and control loops. Tests them in MATLAB/Simulink and C++ simulations, including thousands of Monte Carlo "what-if" runs. Works them into the vehicle with other teams ([OpenCourser](https://opencourser.com/career/ayzyrm/guidance-navigation-and-control-engineer); [Lockheed Martin posting via Career.com](https://career.com/job/lockheed-martin/guidance-navigation-control-engr/j202307060418442909082); [Impulse Space posting](https://jobs.dcvc.com/companies/impulse-space-2/jobs/82327767-gnc-engineer)) | **GNC**: writes the instruction card for the AI and reads its planned path. All levels |
| **Flight controller** | Watches one system (the path, power, propulsion) on live telemetry consoles. Rehearses in sims. Knows the rules for each kind of anomaly. Gives "go" or "no-go" in polls. Takes years to certify ([NASA NTRS](https://ntrs.nasa.gov/api/citations/20110014997/downloads/20110014997.pdf); [DLR on ESA flight-controller training](https://www.dlr.de/en/latest/news/2011/20110628_training-for-space-station-flight-operations_900/@@download/file)) | **Telemetry** and **Recovery** consoles. Every poll |
| **Flight or launch director** | Runs the countdown and the room, collects each console's poll answer, makes the final go, hold or scrub call, and takes responsibility for it ([NASA podcast](https://www.nasa.gov/podcasts/welcome-to-rocket-ranch/episode-19-launching-artemis/)) | **Flight Director**: runs every poll |
| **Propulsion engineer** | Designs and analyses engines and propellant systems. Works out fuel loads, throttle ranges and margins. Works with test teams on hot-fire data ([Relativity propulsion test posting](https://job-boards.greenhouse.io/relativity/jobs/8211256002)) | **Propulsion**: the fuel budget, the throttle plan and the units check. Levels 1–4 |
| **Test engineer** | Prepares, runs and analyses ground tests, such as engine hot-fires on test stands like those at NASA Stennis. Owns the configuration and safety of the stand. Turns test data into design changes ([L3Harris Stennis RS-25 test engineer](https://jobs.l3harris.com/job/Stennis-Space-Center-Lead%2C-Test-Engineer-MS-39529/1413284200/); [Rocket Lab test ops](https://boards-api.greenhouse.io/v1/boards/rocketlab/jobs/7250906003)) | Level 1 (the hop test) and Level 6 (flight review) |
| **Data analyst / flight data engineer** | Cleans and plots telemetry, compares predicted with actual, flags things outside limits, and writes the post-flight review that decides whether a booster can fly again | **Telemetry**: Levels 3–6, especially Level 6 |
| **Recovery and marine operations** (extra) | Keeps the drone ship on station, monitors the sea state, and secures the booster for the trip back to port ([BGR](https://www.bgr.com/science/spacex-launch-delay-starlink-drone-ship/)) | **Recovery/Weather**: Level 4 |

**UK framing.** The UK space sector employs about 47,000 people ([UK Space Agency figure via UK Defence Journal](https://ukdefencejournal.org.uk/uk-to-launch-space-missions-from-scotland-next-year)). It includes launch work in Scotland (SaxaVord on Shetland, and Skyrora), but the launch companies themselves employ only a few hundred people directly ([Caithness Business 2026](https://caithness-business.co.uk/article/29984)). Orbex has gone into administration ([Scottish Business News](https://scottishbusinessnews.net/orbex-jobs-crisis-puts-uk-sovereign-launch-ambitions-under-fire/)). The debrief should therefore present the skills, not single employers: "GNC, test and data skills are used in rockets, drones, self-driving cars, wind farms and satellites." This also links to the sibling labs.

---

## 2. Games and simulations to learn from

### 2.1 Comparison table

| Game or activity | What it is | What makes it fun | How failure and replay work | Lesson for Land a Rocket |
|---|---|---|---|---|
| **Lunar Lander, 1969 text game** | Jim Storer, aged 17, wrote it in FOCAL on a PDP-8 after watching Apollo 11. His physicist father helped him with the equations. Each turn you typed how much fuel to burn. It spread through DEC and *101 BASIC Computer Games* ([Technologizer](https://www.technologizer.com/2009/07/19/lunar-lander); [Storer's page](https://www.cs.brandeis.edu/~storer/LunarLander/LunarLander.html)) | A pure fuel-budget puzzle: every turn is one decision with a visible result | You crash or land and restart in seconds. In 2024, a retired programmer found a bug in its physics ([ITC](https://itc.ua/en/news/the-1969-computer-game-lunar-lander-with-text-output-received-a-patch-from-a-retired-programmer)) | **Turn-based burn decisions** work without any reflexes. The origin story ("a teenager wrote this after watching the Moon landing") is a lovely debrief fact |
| **Lunar Lander, Atari arcade 1979** | Vector graphics and a big physical thrust lever. Rich Moore programmed it, and Howard Delman (now Wendi Allen) designed the hardware. 4,830 cabinets ([Wikipedia](https://en.wikipedia.org/wiki/Lunar_Lander_(1979_video_game)); [Arcade History](https://www.arcade-history.com/game/1417/)) | The *physical* throttle, a zoom-in near the ground, and landing pads with score multipliers (harder pads score more) | Coins bought fuel, so failure cost money | **Harder landing spots score more** gives children three or four genuinely different choices. Do *not* tie fuel to anything bought or earned outside the game |
| **Lunar Lander Beyond (2024)** | A modern Atari remake with crew "stress" that brings on hallucinations and blurred vision ([Christ Centered Gamer](https://www.christcenteredgamer.com/reviews/pc-mac/lunar-lander-beyond-pc); [Metacritic](https://legacy.prod.metacritic.com/game/pc/lunar-lander-beyond/critic-reviews)) | Characters you care about | Critics praised the stress system, but some found the difficulty harsh ([Tech-Gaming](https://tech-gaming.com/lunar-lander-beyond)) | **Avoid crew stress and peril** for ages 8–14 (section 5). Keep crew emotion warm, for example a crew member cheering |
| **Kerbal Space Program 1 (2015)** | A rocket-building and flying sandbox from Squad with very detailed orbital physics. TeacherGaming built **KerbalEdu** for classrooms ([PC Gamer](https://pcgamer.com/kerbaledu-launches-to-bring-kerbal-space-program-to-more-classrooms); [KSP wiki](https://wiki.kerbalspaceprogram.com/wiki/KerbalEdu)) | "Failure is fun": cheerful Kerbals, spectacular wobbly explosions, endless tinkering ([VICE](https://www.vice.com/en/article/kerbal-space-program-2-preview/?nb=1)). Scott Manley's videos turned failures into lessons ([Shacknews](https://shacknews.com/article/92980/shacknews-close-up-scott-manley-the-astronogamer)) | Instant revert-to-launch. Failure is comedy and data | **Make failure funny and informative.** The booster tips over with a cartoon clonk and the telemetry freezes on the cause. But KSP's learning curve takes hours, and a 45-minute lab needs scaffolded choices |
| **Kerbal Space Program 2 (early access 2023)** | Take-Two's sequel. Studio layoffs in 2024 left its future uncertain ([Game Informer](https://gameinformer.com/news/2024/05/02/take-two-closes-rollerdrome-and-kerbal-space-program-2-studios-while-majority-of); [PC Gamer](https://pcgamer.com/gaming-industry/kerbal-space-program-developers-confirm-layoffs-are-coming-at-the-end-of-june)) | Its tutorials were meant to be friendlier | — | A warning that scope is a risk: stay small and finishable |
| **Spaceflight Simulator** | A 2D build-and-fly game by Slovenian solo developer Štefo Mai Morojna. Reported at 20 million downloads on iOS and Android by 2021 ([Automaton](https://automaton-media.com/articles/newsjp/20211014-178947/); [App Store](https://apps.apple.com/us/app/1308057272)) | Very popular with children on phones. 2D makes it easy to read | Fast retries | **2D side views of the trajectory** are easy for children to read. Use a 2D telemetry strip alongside the 3D diorama |
| **Juno: New Origins (formerly SimpleRockets 2)** | Jundroo's 3D builder with **Vizzy**, a block-programming language for flight software ([Steam](https://store.steampowered.com/app/870200/SimpleRockets_2/); [App Store](https://apps.apple.com/app/simplerockets-2/id1294032921?uo=4)) | Writing your own autopilot | Rebuild and reflash | **"Write the rules for the autopilot"** is a real middle-school activity, and it supports Level 5's "write the if-then rules in advance". DeltaOps uses tap cards, not code |
| **SpaceX ISS docking simulator** | A free browser game using Dragon-style touch controls. You need every reading below 0.2 to dock ([HotHardware](https://hothardware.com/news/spacex-docking-simulator); [PCGamesN](https://www.pcgamesn.com/spacex-sim)) | It feels like the real interface. Green numbers show when you are within limits | Touchy controls and no pause, so you overshoot and correct ([Android Authority](https://androidauthority.com/spacex-docking-simulator-1118512)) | **Turn limits green when met.** Use colour-coded readouts on the telemetry strip. Avoid "no pause" in a facilitated lab |
| **Mars Horizon (2020)** | Auroch Digital's space-agency management game, made with advice from ESA and the UK Space Agency. ESA staff from the ExoMars team were consulted ([ESA](https://esa.int/About_Us/Partnerships/ESA_and_Auroch_Digital_launch_Mars_Horizon_game)) | Mission planning, launch-window weather and turn-based mission puzzles. Metacritic score of about 71 ([gg.deals](https://gg.deals/gb/game/mars-horizon/)) | Some missions feel repetitive ([Switch Player](https://switchplayer.net/?p=35273)) | A UK precedent for **realistic mission-control decisions** made playable. Weather can "scrub" a launch in a way that is fun, not punishing |
| **NASA Rocket Science 101 (2012)** | NASA Kennedy's Launch Services Program game: choose a mission and a skill level, assemble a rocket and launch it. Built in Flash, now unavailable ([PR Newswire](https://prnewswire.com/news-releases/new-nasa-game-lets-players-build-and-launch-a-virtual-rocket-160601575.html); [AmericaSpace](https://www.americaspace.com/2012/06/28/new-game-lets-you-build-and-launch-rockets/); [UNT archive](https://webarchive.library.unt.edu/web/20120915084030/http://www.nasa.gov/externalflash/RocketScience101/RocketScience101.html)) | Matching the rocket to the mission, with three difficulty levels | Rebuild | **Three skill levels per stage** map neatly onto 8-year-olds and 14-year-olds in the same group. Flash shows why the lab needs a long-lived web stack |
| **Challenger Learning Center missions** | Two-hour simulated missions. Students split between Mission Control and a spacecraft simulator, in teams such as Communications, Navigation and Medical, then swap halfway. Trained "Flight Directors" run the sessions, and there are planned emergencies ([MC3 Challenger Center](https://mc3.edu/for-our-community/challenger-center/programs/center-missions.aspx); [Anniston Star](https://www.annistonstar.com/challenger-learning-center-provides-realistic-intense-experience/article_6362b265-0d01-4e7d-9428-d264b506d61d.html); [CLC Lockport FAQ](https://www.clclockport.org/faq.html)) | Everyone has a job and a console. The emergencies are exciting but safe | Facilitated, with no "game over" | **The closest model for team roles.** Roles rotate, the facilitator acts as a "flight director" coach, and emergencies are scripted |
| **Egg-drop landers** | NASA/Design Squad "Don't crack up!" airbag challenge. A NASA Lunar Nautics egg drop within a mass limit. The Space Florida and NASA-KSC planetary lander drop from 20 ft. The Canadian Space Agency's lunar resupply drop from increasing heights ([NASA Mission: Solar System guide](https://exploration.jsc.nasa.gov/interaction/lmdp/documents/DSN_NASA_MissionSolarSystem_FullGuide.pdf); [Lunar Nautics handbook](https://webarchive.library.unt.edu/eot2008/20080917181309/http://www.nasa.gov/pdf/200225main_Lunar_Nautics_Student_Handbook.pdf); [CSA](https://asc-csa.gc.ca/pdf/eng/youth-educators/activities/science-and-technology/lunar-resupply-mission.pdf)) | Real stakes (a cracked egg), cheap kit, and a test from increasing heights | Fail, fix, re-drop. The mass budget forces trade-offs | **Use as a physical warm-up or take-home.** "Mass budget" and "test, fail, fix" carry straight over. Level 1 echoes the egg drop: touchdown speed is the measure |
| **Water rockets** | NASA's Rockets Educator Guide has teams build bottle rockets and run qualifying test launches. NASA Glenn's version starts in a simulator (WaterRocketSim), then teams build and fly the design ([NASA guide PDF](https://www.nasa.gov/wp-content/uploads/2012/03/rockets-educator-guide-20-water-rocket-construction.pdf); [NASA Glenn](https://www.grc.nasa.gov/WWW/k-12/rocket/BottleRocket/educator.htm)) | Big, loud and outdoors | "Flight performance is strongly influenced by design and care in construction" | **Simulate, then fly** is exactly the professional workflow, and it is the lab's "dry run" act |

### 2.2 Patterns: what makes landing games fun, and how they handle failure

1. **One crisp number to beat.** The touchdown speed, the fuel left, the distance from the pad, or every docking reading below 0.2. Children know at once whether they succeeded and by how much.
2. **The last ten seconds are the drama.** The Atari zoom near the ground, the Apollo fuel callouts, the sky crane. Put a slow-motion camera on the final metres and keep everything else brisk.
3. **Failure is quick, funny and *explains itself*.** KSP's charm is the cheerful disaster you can learn from. The lab's version: the booster tips with a clonk, the camera stops, and a telemetry marker points to the cause ("leg 3 not latched").
4. **Retrying costs little.** Text Lunar Lander and KSP restart in seconds. In a facilitated lab, a retry is a new instruction card, not a new attempt at a reflex task.
5. **Harder targets score more.** The Atari pads offer a choice of risk and reward that is genuinely different, not just harder.
6. **Build in roles so groups can share.** Challenger Centers show that every child having a console is what makes a two-hour session work for groups.
7. **Do not copy the steep learning curves.** KSP's depth takes hours. Docking and Lunar Lander controls are touchy. Ages 8–14 in 45 minutes need **choices with visible results**, not dexterity.

---

## 3. Real-life skills, curriculum and careers

Curriculum wording quoted from the DfE National Curriculum ([science KS1–2](https://www.gov.uk/government/publications/national-curriculum-in-england-science-programmes-of-study/national-curriculum-in-england-science-programmes-of-study); [computing](https://www.gov.uk/government/publications/national-curriculum-in-england-computing-programmes-of-study/national-curriculum-in-england-computing-programmes-of-study)). KS3 science points come from secondary schemes of work, because the DfE KS3 PDF could not be fetched (section 7). NGSS wording comes via [Science Buddies and publisher correlations](https://www.sciencebuddies.org/teacher-resources/lesson-plans/subjects/physics?p=3).

| Skill | What children do in the lab | UK curriculum | NGSS | Careers |
|---|---|---|---|---|
| **Estimation and budgets** | Split a fuel bar between burns and keep a reserve. Estimate whether a landing is "enough fuel?" before the dry run. Mass budget in Level 1 | KS2 maths: estimate and check, fractions and percentages. Y5 forces. KS3: weight = mass × g | MS-PS2-2 (motion depends on net force and mass) | Propulsion engineer, mission planner |
| **Reading telemetry graphs** | Read height, speed, fuel, wind and sensor strips. Spot a spike, a trend or the gap between predicted and actual | Upper KS2 working scientifically: record "in tables, scatter graphs, bar and line graphs". KS3: speed and distance-time graphs ([RMG](https://www.rmg.co.uk/sites/default/files/KS3%20Curriculum%20Requirements.pdf)) | MS-ETS1-4 (models that generate data for iterative testing) | Flight controller, data analyst, test engineer |
| **Checking evidence and units** | Units stamp on data sheets (L3), cross-check three sensors (L5), "does this number make sense?" | Upper KS2: "identifying scientific evidence that has been used to support or refute ideas". KS2 computing: "be discerning in evaluating digital content". KS3 computing: "trustworthiness" | 3-5-ETS1-3 (fair tests, failure points) | GNC engineer, quality and assurance |
| **Checklists** | A do-confirm card for each role before the poll (legs locked, units checked, reserve kept, wind checked) | KS2 computing: "detect and correct errors in algorithms" | 3-5-ETS1-3 | Every flight and test role, and also surgery and aviation |
| **Calm decisions under time pressure** | Short timed polls (a 20 s countdown in L2 and L4), with an alarm card for the 1202-style moment and a "hold" button that is always allowed | PSHE and character education (not statutory content) | — | Flight director, controller |
| **Test, fail, iterate** | A dry run before every real flight. After a gentle failure, read the cause and fix the card. Level 6 flight review | KS2 computing: "design, write and debug programs that accomplish specific goals, including controlling or simulating physical systems". KS3 computing: "model the state and behaviour of… physical systems" | 3-5-ETS1-3, MS-ETS1-4 | Test engineer, GNC engineer |
| **Giving clear instructions to an automated system** | Choose and improve the instruction card. In L5, write if-then rules in advance | KS2 computing: algorithms and logical reasoning. KS3: "compare the utility of alternative algorithms" | MS-ETS1-1/2 (criteria and constraints, evaluating solutions) | GNC engineer, flight software engineer, any AI-using job |
| **Teamwork through roles** | Rotating consoles. The Flight Director polls everyone. CAPCOM is the single voice | KS2/3 spoken language. Working scientifically in groups | — | All of mission control |

---

## 4. Lab orchestration

### 4.1 Format and fit with the house system

- **Six levels**, each with **3 instruction cards**: one vague, one clear and one "plausible but incomplete". All responses are pre-written. There is no typing, no live AI model and no child accounts, which matches `research/NEXT-SESSION.md`.
- **One island per level**, floating voxel dioramas in the brochure style: a desert test stand, a grey lunar plain, a Florida-style coast pad, an ocean with a drone ship, the rust-red Jezero crater, and the hangar or harbour for the review.
- **Meters** (the equivalent of Eco Town's town flower): **Fuel** (with a reserve line), **Touchdown speed** (a green zone), **On target** (distance from the pad), and **Safety** (crew and team safety, which can never go red in a way that hurts anyone). Stars reward *catching and fixing the AI's mistake* and making good poll calls, not perfect flying.
- **Artefact:** a **Mission patch and flight log**. The voxel patch shows the team name, the six landing sites and one "mistake we caught" stamp per level. The log gives the poll result for each level, with one telemetry graph each.

### 4.2 The seven acts of every level

| Act | Camera | What happens |
|---|---|---|
| **1. Brief** | Cinematic swoop over the island | Mission banner, goal, progress dots 1–6. A real-world "this really happened" card (for example "Apollo 11, 1969") |
| **2. Plan** | Sky view, with a **ghost trajectory** (a translucent arc of voxels from the rocket to the target) | Choose from the level's option palette (fuel load, target, timing). The GNC child gives the AI an instruction card. The AI shows its plan as a ghost arc with "% sure" |
| **3. Dry run** | 2D **telemetry strip** slides up under the diorama, with a playback scrub bar | The simulator "flies" the AI's plan. The Telemetry child reads the graphs. The hidden flaw appears as a graph feature: a spike, a crossing or a red zone. This is the lens act |
| **4. Fix** | Sky | Choose a clearer card or give the AI better data. The AI re-plans, often with a *lower* "% sure", which is honest. Rerun the dry run if wanted |
| **5. Go/no-go poll** | Mission-control room (a voxel interior with consoles, Eco Town's "Inside" view) | The Flight Director polls each console. Each child ticks a 3-line do-confirm card, then says "Go" or "No-go". "Hold" is always allowed and is sometimes correct |
| **6. Fly** | Chase camera, then slow motion for the last 10 m | The flight plays out. Levels 1, 2 and 4 have one **hands-on moment** (§4.4). The result is shown physically: a soft landing, a tip-over, a splash or an abort |
| **7. Flight review** | Sky turntable around the landed vehicle | Stars, patch stamp, and one-line "what we caught". The facilitator card asks a question. Choices lock |

A wrong card loops from Act 3 or Act 6 back to Act 4, then replays **from the same camera bookmark** so before and after can be compared. Eco Town does the same.

### 4.3 Team roles for three to five children

| Console | Real job it mirrors | What the child owns | Merge when fewer than five |
|---|---|---|---|
| **Flight Director** | Flight or launch director | Reads the brief aloud, runs the poll, makes the final call, presses "Fly" | With CAPCOM (3 players) |
| **GNC** | GNC engineer, GUIDO | Holds and chooses the instruction cards, reads the AI's plan aloud | — |
| **Propulsion** | Propulsion engineer | The fuel budget, throttle and units checks | With GNC (3 players) |
| **Telemetry** | Flight controller, data analyst | Reads the dry-run graphs, taps the "suspicious point" | — |
| **Recovery & Weather / CAPCOM** | Recovery ops, weather officer, CAPCOM | Wind and sea readings (L4), the single voice to the "crew" (L2), the alarm card (L2) | With Flight Director |

- Roles **rotate every level**, so every child is Flight Director at least once in a 90-minute session.
- On a single shared screen, roles are coloured **badges** that the facilitator hands round. On a multi-device setup, each console is a tablet view. Both are possible, but a single screen is the default.
- Challenger Centers show that swapping roles halfway is popular and fair ([CLC example](https://www.micds.org/?p=3016)).

### 4.4 The six levels

Every level's AI moment has four parts: **the vague instruction → the confident wrong guess (% sure) → how the children catch it with telemetry → the clearer instruction.** Each also lists **real decisions** with three or four genuinely different options.

---

#### Level 1: Hop Test (Earth, desert test stand)

*Real-world basis:* SpaceX's Grasshopper "hops" and New Shepard's vertical landing (§1.2). A test engineer's first job is to prove that the vehicle can go up and come back down gently.

**Real decisions**

| Decision | Options | Consequences |
|---|---|---|
| **Fuel load** | A. Fill it right up. B. Just enough for the hop. C. The hop plus a 20% reserve. D. Half a tank "to save money" | A: heavy, so it climbs slowly and burns more fuel to carry fuel, and it is still fine. B: lands, but the reserve light flashes and it scores as "risky". C: the best rating. D: it cannot reach 50 m, and the dry run shows it falls short |
| **Legs** | A. Narrow legs (lighter). B. Wide legs (heavier). C. Crushable pads (single use) | Tip risk against mass budget. The centre-of-mass dot shows this. On the flat stand all three are OK, which sets up Level 4 |
| **Test height** | A. 10 m. B. 50 m. C. 250 m | Higher gives more data but costs more fuel. The facilitator can talk about "small steps in testing" |

**AI moment: it reads the instruction literally and misses a constraint**
- **Vague card:** "Go up to 50 metres and come back down."
- **AI guess (88% sure):** "Up at full power, then engine off to come down. That's the quickest way, and it saves fuel!"
- **Catch:** the dry run's speed graph shows touchdown at 31 m/s, which is red. The height graph has no slowing curve at the bottom. The Telemetry child taps the red point. The facilitator card asks: "The AI did exactly what you said. What did you forget to tell it?"
- **Clearer card:** "Hop to 50 m, then land with touchdown slower than 2 m/s, and keep 20% fuel spare."
- **Then:** the AI re-plans with an engine relight on the way down, at **76% sure**: "I'm less sure, because now I have more rules to meet. That's normal." This is the first appearance of the "honest lower confidence" idea.
- **Hands-on moment:** the Propulsion child holds a big on-screen throttle (an Atari nod) during the last 10 m, with strong assistance. A safe landing is guaranteed if they hold it at all. It is for feel, not a test of skill.
- **Gentle failure:** a hard landing squashes the crushable pads and the voxel booster bounces once. "Data saved. The test stand is fine."

---

#### Level 2: Moon Landing (an Apollo-style lander with crew)

*Real-world basis:* Apollo 11's boulder field, fuel callouts and 1202 alarm, with a nod to Odysseus (§1.3, §1.5).

**Real decisions**

| Decision | Options | Consequences |
|---|---|---|
| **Landing site** | A. The flat mare plain (safe, dull science). B. Next to a crater rim (great rocks to study, tricky slopes). C. Right beside the cargo lander at base (handy, but the exhaust sandblasts it). D. A sunlit polar ridge (power all day, with long shadows that hide rocks) | Each scores differently on science, safety and base. C introduces plume-surface interaction ([NASA](https://www.nasa.gov/?p=935855)) |
| **Fuel reserve call** | A. Land with 60 s spare. B. With 30 s spare. C. "Use every drop to reach the perfect spot" | C fails the poll: Propulsion should say no-go |
| **Pre-flight checklist** (an Odysseus nod) | A. Do every check. B. Skip the rangefinder test "to save time" | B: the AI warns at descent that the rangefinder is not responding. The team must switch to the backup, using up a star |

**AI moment: missing data (an old map)**
- **Vague card:** "Land at the flat spot near the crater."
- **AI guess (91% sure):** "I've picked the flattest spot on my orbital map: here!" The ghost trajectory ends on a smooth grey patch.
- **Catch:** the dry run adds the **descent-camera strip**, a picture-in-picture view from 150 m. It shows boulders bigger than the legs can step over. The hazard lens confirms: "Map resolution 10 m. Boulders under 10 m are invisible to it." The facilitator card asks: "Where did the AI get its information? What couldn't it see?"
- **Clearer card:** "Use the descent camera at 150 m. Pick a spot with no rocks bigger than 1 m, and land with at least 30 s of fuel left."
- **Hands-on moment (P64 redesignation):** during the flight, the GNC child taps a safer spot on the camera view to re-aim the lander, as Armstrong did. The AI re-plans live: "New target. Fuel OK for 45 s."

**Mini-moment where the AI is right: the program alarm**
- A yellow "ALARM 12" light appears during descent. The AI says: "Alarm 12 means my computer is busy, not broken. It's on the 'safe to continue' list. Continue (86%)."
- The CAPCOM child opens the **alarm card**, a printed and on-screen list echoing Jack Garman's, and checks: "12: go, unless it stays on". It flickers off. The poll is "Go". The facilitator card asks: "This time the AI was right. How did we *know*, instead of just hoping?"
- **Gentle failure:** if the fuel runs low with no safe spot, the AI recommends "Abort to orbit". The ascent stage lifts away, the crew wave, and the next orbit gives another attempt. **No crew is ever harmed.**

---

#### Level 3: Booster Comes Home (return to the launch site)

*Real-world basis:* Falcon 9's boostback, entry and landing burns, and grid fins (§1.1). The mistake echoes Mars Climate Orbiter (§1.6).

**Real decisions**

| Decision | Options | Consequences |
|---|---|---|
| **Where to land** | A. Back at the launch-site pad (needs a big boostback). B. A drone ship down-range (less fuel, but at sea, which sets up Level 4). C. Throw the booster away (expendable): more payload, but no reuse | A trade-off between fuel and payload. C is legitimate: the payload is the mission. The facilitator can talk about "reuse saves money and materials" |
| **Entry burn** | A. Long burn (safe, costs fuel). B. Short burn (saves fuel, hotter). C. Skip it | C: the heat meter goes red on the dry run, and the grid fins scorch |
| **Grid fins** | A. Open early. B. Open late | Early gives more steering and more drag. Late is a gamble |

**AI moment: wrong units**
- **Vague card:** "Use the engine data from the propulsion team to plan the boostback."
- **AI guess (93% sure):** "Boostback planned. Landing exactly on the pad!" The ghost arc lands on target.
- **Catch:** the dry run plots **predicted against tracked path**. After the boostback, the tracked line (dots from radar) drifts away from the predicted line and ends 4× farther out, over the sea. The Propulsion child opens the data sheet: the engine numbers are stamped **"lbf·s"** (pound-force seconds), but the AI's planner expects **"N·s"**. The facilitator card asks: "Both numbers looked sensible. What was different?" It then tells the true Mars Climate Orbiter story in two lines.
- **Clearer card:** "Convert all engine data to newton-seconds, and show me the units on every number you use."
- **Then:** the AI says, "Converted: 1 lbf·s = 4.45 N·s. Re-planned (84% sure). I should have asked which units you meant." **Safe-fail behaviour (a CRS-16 nod):** if the children fly without fixing it, the booster's guidance spots the drift and *keeps its aim point over the sea*. It splashes down softly offshore and bobs there, and a little voxel recovery boat goes out. "The booster kept everyone safe. Now let's find out why it missed."

---

#### Level 4: Drone Ship in the Wind

*Real-world basis:* drone-ship landings, swell and sea state, and Jason-3's unlatched leg (§1.1).

**Real decisions**

| Decision | Options | Consequences |
|---|---|---|
| **When to land** | A. Now. B. Hold 20 minutes for a lull. C. Scrub to tomorrow. D. Move the ship to calmer water (it arrives later, with less fuel margin) | B or D are often best. C is always safe and still earns the "good call" star if the sea is bad. A depends on what the data shows |
| **Legs** | A. Narrow legs. B. Wide legs (from Level 1) | The rocking deck now tests the centre of mass |
| **Aim point** | A. Centre of the deck. B. Upwind of the centre | B allows for the gust drift |
| **Deck check** | A. Run the do-confirm checklist (legs latched, deck clear, robot ready to secure). B. Skip it | B: a "leg 3 not latched" warning (a Jason-3 echo) |

**AI moment: plans for average conditions**
- **Vague card:** "Check the weather and land on the ship."
- **AI guess (89% sure):** "Average wind is 12 km/h, which is well within limits. Landing now!"
- **Catch:** the Recovery & Weather child opens the **wind and deck strip**: an hour of wind and deck height. The *average* line is low, but there are **gust spikes to 45 km/h** every few minutes, and the deck rises and falls about 3 m. The ghost booster's centre-of-mass dot swings outside its leg footprint at the top of a gust. The facilitator card asks: "Is the average wind the wind you'll land in?"
- **Clearer card:** "Plan for the strongest gust in the last hour, not the average. Land only when the deck moves less than 1 m, and hold if not."
- **Then:** the AI says, "Strongest gust: 45 km/h, over the limit. I recommend a hold (72% sure). A lull is likely in 15–25 minutes." The poll can choose to hold, and a time-lapse shows the sea calming. **Hands-on moment:** the Recovery child taps "Land now" when the deck-motion gauge goes green. Timing within a forgiving window is the only skill involved.
- **Gentle failure:** in a gust, the booster lands, wobbles, and tips over slowly onto a cushioned net with a "clonk" and a puff of smoke. The voxel booster ends up lying on its side, intact. "Recovered, needs repairs. What should we have checked?"

---

#### Level 5: Seven Minutes on Mars (rover landing)

*Real-world basis:* Curiosity's sky crane, Perseverance's terrain-relative navigation, and the glitches on Schiaparelli and Mars Polar Lander (§1.4, §1.6).

**The twist:** a radio message to Mars takes about 14 minutes, and the landing takes 7. **The children cannot help in real time.** They must write the rules *before* the landing, then watch. This is where "clear instructions" matters most.

**Real decisions**

| Decision | Options | Consequences |
|---|---|---|
| **Landing site** | A. A flat plain far from the science. B. Near the river delta, with hazards that terrain-relative navigation must avoid. C. On the delta itself (best science, cliffs and dunes) | B is the "Perseverance answer". C fails the hazard map |
| **Final landing system** | A. Airbags (bouncy, small rovers only). B. Legs on the lander. C. Sky crane | The rover's mass chooses for you. The facilitator talks through the trade-offs |
| **Parachute timing** | A. Early (drifts more in the wind). B. Planned. C. Late (less time to slow down) | Seen on the speed-against-height graph |
| **Sensor rules** | Choose which rule cards go into the lander (see below) | This is the AI moment |

**Where the AI is right: terrain-relative navigation**
- During the parachute phase, the AI matches camera frames to the orbital map. The children see matching voxel landmarks light up in pairs, like a "spot the same rock" game.
- "Position known to within 5 m. Diverting 400 m to a safe target (94% sure)." The children check the overlay: it lines up. The facilitator card asks: "Why can the AI do this job better than people on Earth right now?" (Because of the time delay.)

**AI moment: trusts a sensor glitch**
- **Vague card:** "Use the sensors to tell when we've landed, then cut the cables."
- **AI guess (95% sure):** "Altimeter says 0 m. Touchdown! Cutting the cables now." This is in the dry run, at 40 m up.
- **Catch:** the dry run's **three-sensor strip** shows radar altitude, inertial (IMU) altitude and the camera's ground-size estimate. One trace, the "leg-touch" sensor or the IMU, **spikes to 0 or below zero for one second**, while the other two still read about 40 m and falling smoothly. The Telemetry child taps the spike. The facilitator card asks: "Can a lander be at minus 200 metres? What should the AI do when its sensors disagree?" It then tells the Schiaparelli and Mars Polar Lander stories in two lines each.
- **Clearer card** (if-then rules, written in advance): "If sensors disagree, trust the two that agree. Ignore impossible values (below zero, or jumps faster than the lander can move). Only cut the cables when the rover's wheels feel the ground **and** speed is under 1 m/s."
- **Then:** the AI says, "Rules loaded. I'll be less certain in the moment (81% sure), but I won't be fooled by one bad sensor." The landing plays out with a 14-minute "radio delay" bar that the facilitator can skip, ending in the sky crane cut and fly-away. The first image arrives from the voxel rover.
- **Gentle failure:** if the children do not fix the rules, the rover is set down too soon and lands with a bump. It is "dusty but working" and sends a lopsided first photo. "It survived, but Mars teams never want a bump like that. What rule would have stopped it?" The descent stage never crashes on screen near the rover.

---

#### Level 6: Flight Review and Reflight (harbour hangar). 90-minute version only

*Real-world basis:* post-flight data review and booster reuse (B1067's 37 flights).

**Real decisions:** fly again now / inspect engine 3 first / replace engine 3 / retire the booster to a museum. These cost time, money and reuse score in different ways.

**AI moment: a summary hides an outlier (the data analyst's skill)**
- **Vague card:** "Look at the flight data and tell us if the booster is OK to fly again."
- **AI guess (94% sure):** "Average engine temperature was normal. Ready to fly!"
- **Catch:** the Telemetry child splits the strip into **one line per engine**. Eight lines are normal, and engine 3 ran hot for 4 seconds during the landing burn.
- **Clearer card:** "Check every engine on its own against its limit, and list anything outside limits before you give an answer."
- **Then:** "Engine 3 exceeded its limit for 4 s. Recommend inspection before reflight (88% sure)." Finally, a whole-team **reflight poll**, and the closing trailer montage of all six landings.

**45-minute version:** Levels 1, 2, 4 and 5, with Level 3's units moment folded into Level 4's data sheet. **60-minute version:** Levels 1–5. **90-minute version:** all six, plus the physical egg-drop warm-up.

### 4.5 How the lab presents the AI as a professional tool

1. **Name and role:** the helper is "**NAV**", the *guidance assistant* on the GNC console. It is not a friend or a pilot. Its card always says what data it used ("I used: orbital map, engine data sheet").
2. **"% sure" is explained as the planner's confidence in its *own* inputs, not as truth.** After a clearer card, NAV often goes **down** and says why. This matches Eco Town's "honest lower confidence" and the calibration research (`round-3/02-learning-evidence.md` §2.1–2.3).
3. **NAV never makes the final decision.** The Flight Director's poll does, as in real mission control.
4. **NAV is right sometimes, and children confirm it with evidence** (L2 alarm, L5 terrain-relative navigation). The lesson is "check", not "distrust".
5. **Every mistake is a real professional failure mode**, with a "this really happened" card. Children learn that adults with years of training made these mistakes too, and fixed the *system* with checklists, units stamps and sensor rules.
6. **Five predictable NAV rules** go on a poster and on the patch: *takes you literally*, *plans for the average*, *only knows what's on its map*, *trusts every number*, *does not ask about units*. By Level 5, children should predict the mistake before the dry run. Facilitators can ask "Which rule do you think NAV will break?"
7. **Scripted, not live.** Say so plainly at the start and on the facilitator card: "NAV's answers are written by our team to show real mistakes that AI and automation make." This addresses the brochure issue in `research/context.md` that "% sure" may suggest a live model.

### 4.6 Scoring, assessment and debrief

**Stars per level (maximum 3):**
1. Caught NAV's mistake in the dry run, before flying.
2. Fixed it with the clearer card or better data.
3. Made the right poll call, including a correct "hold" or "scrub".

There are no stars for landing precision, which keeps the focus on the professional skills. A landing quality badge (bronze, silver or gold) is cosmetic.

**In-lab evidence for facilitators** (no child data is stored):
- Did the Telemetry child tap the right point on the graph? Recorded as a group tick.
- Did the group predict NAV's rule before the dry run (Levels 3–6)?
- Poll quality: did every console give a reason?

**Three-item exit check** (on paper or as a tap card, matching the house evaluation design in round 3, report 02):
1. *A graph item:* "Here is a height graph. Where did the engine light?" (Tap the bend.)
2. *A calibration item:* "NAV says it is 95% sure. What should you do next?" (Check the evidence / Fly now / Ask a friend.)
3. *A transfer item:* "A sat-nav says 'turn left' into a river. Which NAV rule is this?" (It only knows what's on its map.)

**Debrief (5–10 minutes):**
- Show the mission patch, with its "mistake we caught" stamps.
- Ask each child, "Which job did you like: Director, GNC, Propulsion, Telemetry or Recovery?"
- Use one career card per role, with a one-line "what they do all day".
- Close with: "Professionals don't trust or distrust AI. They check it. You did that six times today."
- **Take-home:** the printable patch and log, an egg-drop lander challenge sheet with a mass budget, and a "spot the NAV rule" family quiz.

### 4.7 The story arc and the trailer

**Story:** the team are new recruits at a small launch company on a floating island test range. Their goal is to land a rover on Mars, but first they must earn the trust of the chief engineer. She is a warm, blocky character and the facilitator's in-game voice. Each level is a qualification: hop test, Moon, booster home, ship in the wind, Mars. Level 6 is the reflight ceremony, where the booster earns its first "flight stripe".

**Trailer beats (60–75 s, following the `games/trailers/` pattern):**
1. A silent voxel desert at dawn. A tiny booster lifts off a test stand. *"Every rocket starts with a hop."*
2. A quick cut: NAV's card says "Engine off to come down! 88% sure". A red speed spike, a child's finger taps it, and a gentle bounce. *"Your AI assistant is fast… and sometimes confidently wrong."*
3. The Moon: the descent camera reveals boulders, and a child taps a new spot. "Thirty seconds." Touchdown, and the crew wave.
4. The predicted line against the tracked line splits on screen, then a units stamp: "lbf·s ≠ N·s". *"Real engineers lost a Mars mission to this."*
5. A storm at sea. "Average wind: fine." The gust graph spikes. The Flight Director says: **"Hold."** A time-lapse as the sea calms, and the booster lands on the rocking deck.
6. Mars: a 14-minute radio-delay bar crawls across the screen. *"On Mars, you can't help. Only your instructions can."* The sky crane lowers the rover, and the cables are cut.
7. The rover's first photo: the team's mission patch, drawn in the dust by the wheel tracks. *"Land a Rocket. Train like mission control. Work with AI like a pro."*

### 4.8 Facilitator script anchors (one per level)

| Level | Opening question | After the catch | After the fix |
|---|---|---|---|
| 1 | "What does 'come back down' mean to a computer?" | "NAV did what you said. What did you forget?" | "Why is NAV *less* sure now?" |
| 2 | "Where did NAV's map come from?" | "What couldn't it see from orbit?" | "The alarm: how did we *know* it was safe?" |
| 3 | "Two teams, one number. What could go wrong?" | "Both numbers looked sensible. What was different?" | "What habit stops this happening again?" |
| 4 | "What's the difference between average and worst?" | "Would you land in that gust?" | "Was holding a failure?" |
| 5 | "Why can't Earth help during the landing?" | "Can a lander be at minus 200 metres?" | "What rules did we give NAV for when sensors disagree?" |
| 6 | "What does 'OK' hide?" | "Why did the average look fine?" | "Would you fly this booster again?" |

### 4.9 Overlap with the sibling labs (for coordination)

- **Become a Drone Pilot** will probably also cover wind, gusts and sensor fusion. Keep Land a Rocket's wind lesson centred on *average against worst-case* and the *moving deck*, and leave gust-steering skills to the drone lab.
- **Train a Robot** will probably cover perception and training data. Land a Rocket's terrain-relative navigation moment is map-matching, not learning from data.
- **Build a Space Colony** may share the lunar and Mars voxel sets. Land a Rocket's Level 2 landing spot "beside the base" and Level 5 Jezero could reuse the colony's assets.

---

## 5. Safety, age-appropriateness and facilitator notes

1. **No crew deaths, no peril music, no explosions near people.** Crewed vehicles appear only in Level 2 and always have a working abort to orbit. The tests in Levels 1, 3, 4 and 6 are uncrewed. Failures are bounces, soft splashes, slow tip-overs onto a cushioned net and dusty bumps, all of them *recoverable*. Fire effects are small voxel puffs. Real events with deaths (Challenger, Columbia, Apollo 1) are **not** used as AI-mistake stories. If a child raises them, the facilitator card says: "Yes, spaceflight has had sad days. That's why teams today use checklists and go/no-go polls, and why we practise them."
2. **Language.** Say "last-second burn", not "suicide burn". Say "lost contact" or "didn't make it to the surface safely" for robotic losses such as Mars Climate Orbiter and Schiaparelli, not "destroyed". Do not use "terror" in child-facing text: the "seven minutes of terror" phrase is shown as "seven minutes of waiting".
3. **Time pressure stays playful.** The countdowns (20 s) can be paused by the facilitator and are disabled with **Reduce pressure**, which goes alongside Reduce motion. "Hold" is always available and is never penalised when it is justified. Children who freeze under timers still take part.
4. **Motion comfort.** No camera shake on landing. The slow-motion final 10 m uses a steady chase camera. The rocking deck in Level 4 is shown from a fixed side camera, not first person. These follow the Eco Town camera rules (`research/eco-town-cameras-acts.md` §1).
5. **Mixed ages (8–14).** Every graph has a "Simple" view, a single line with a coloured zone, and a "Pro" view with axes, units and several lines. NGSS and KS3 extensions, such as the rocket equation and lbf to N conversion, sit on optional "Engineer's notebook" cards.
6. **Group dynamics.** Rotating roles stop one child dominating. The Flight Director must hear every console before calling. The facilitator watches for the confident child overriding the Telemetry child, which is itself a lesson in automation bias between people. A sentence for that moment: "What does the data say?"
7. **Physical activities.** Egg drops use a soft drop zone. Facilitators handle any height above head height. Use low-temperature glue guns, because high-temperature guns melt plastic bottles ([NASA guide](https://www.nasa.gov/wp-content/uploads/2012/03/rockets-educator-guide-20-water-rocket-construction.pdf)). Water rockets need an outdoor space, a launcher used by an adult, eye protection and a clear zone. Follow the NASA guide's launcher plans. Allergy check for any food-based "egg" alternatives.
8. **Data and safeguarding.** No accounts, names or photos. Team names come from a preset list (for example Falcons, Eagles, Kestrels, Swifts). The mission patch has no personal data.
9. **Accuracy promise.** Real-world cards must be checked before release (section 7). Facilitators should be able to say "here's the real story" with confidence. A one-page **"Real missions" sheet** in the facilitator pack gives the six stories with links.
10. **Brand and IP.** Use generic voxel vehicles, not logos or exact silhouettes of SpaceX, Blue Origin or NASA. Mention real organisations only in the factual "this really happened" cards. Get the IP point checked with the same lawyer as research report 10.

---

## 6. Key design lessons (for the summary)

1. **Decisions, not dexterity.** Real landings are won before they fly, in the fuel budget, the target choice, the rules and the poll.
2. **Telemetry graphs are the lens.** Every hidden flaw shows up as a graph feature that a child can tap.
3. **Base every AI mistake on a real event.** Units (Mars Climate Orbiter), sensor glitch (Schiaparelli and Mars Polar Lander), old map (Apollo 11), average weather (drone-ship seas), the hidden outlier (flight review).
4. **"Hold" and "scrub" are wins.** Reward them when the data supports them.
5. **NAV is sometimes right**, and children confirm it with evidence. Its confidence often falls after a better instruction, and it says why.
6. **Rotating mission-control roles plus a go/no-go poll** give every child a voice and model real teamwork.
7. **Fail safely and visibly.** Splash, tip, bump and abort are all recoverable, all explain themselves, and all echo real safe-fail designs (CRS-16, New Shepard's escape system).
8. **Mars as the finale:** you can't steer it live, so the quality of your instructions is everything.

---

## 7. Still unverified, and gaps

- **Falcon 9 burn details** (the number of engines for each burn, whether drone-ship missions skip the boostback, the minimum throttle) come from broadcasts, blogs and forums. SpaceX does not publish them. Keep the lab's numbers illustrative.
- **No official drone-ship wind or sea-state limits** were found. The "deck moves less than 1 m" rule in Level 4 is a game rule, not a SpaceX figure.
- **Apollo 11 fuel at touchdown:** estimates range from 17 to 25 s (some say 30). Check against the Apollo Lunar Surface Journal before writing a card.
- **Exact wording of Bales's and Garman's calls** differs between sources. Paraphrase on cards.
- **New Shepard "ring and wedge fins"** come from a local news page that seems to repeat Blue Origin material. Blue Origin's own page was not retrieved. The restart altitude also differs between sources (about 1.1 to 1.5 km).
- **Starship HLS landing thrusters:** their placement and whether they will be needed vary between sources, and the crewed landing date is uncertain.
- **Whether Falcon 9 uses G-FOLD itself** is not publicly confirmed. Only Blackmore's role is reported.
- **Mars Climate Orbiter cost** figures range from $125 million to $327.6 million. Avoid stating a cost on cards.
- **Mars Polar Lander's cause** is the board's "most probable" cause, not a proven one. Say "probably" on cards.
- **The DfE KS3 science PDF** could not be fetched (404). KS3 wording here comes from school schemes and an RMG summary. Check against the [DfE KS3 programme of study](https://www.gov.uk/government/publications/national-curriculum-in-england-science-programmes-of-study).
- **NGSS performance-expectation wording** comes via secondary correlation documents. Check on nextgenscience.org.
- **Spaceflight Simulator download figures** are from 2021 and 2024 and are not current.
- **The Exa connector** was not authorised. A round-3-style pass with Exa should check the items above and add primary GDC or developer sources for KSP (Felipe Falanghe) and Lunar Lander Beyond.
- **Children's response to numeric "% sure"** still has no controlled study (round 3, report 02 §2.2). Land a Rocket's falling-confidence moments should be part of the evaluation.
