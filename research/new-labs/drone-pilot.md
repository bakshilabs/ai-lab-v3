# Become a Drone Pilot: research for a new DeltaOps AI lab

*DeltaOps Learning research, 5 November 2026. Sources are linked inline. Figures are there so designers can set believable in-game numbers. They are not for display to children as exact facts. Claims I could not confirm against a primary source are marked **[check]** and listed in section 9. Earlier DeltaOps reports are cited as, for example, `round-3/09`.*

---

## 0. Summary

**The pitch.** Children join the drone team on a small island over one week as a storm builds. They pass a practice Drone Code check and make a first safe flight. Then they map a farm field, find sick crops, inspect a storm-damaged wind turbine, search a night moor for a missing walker, and finally fly medicine across the water to the island clinic when the ferry is cancelled. Throughout, they work with a flight-planning AI. It is fast and helpful, and it is confidently wrong in exactly the ways real drone AI goes wrong.

**What real drone work teaches us.**
1. **Professional drone work is mostly judgement, not stick skill.** Delivery pilots at Wing supervise automated flights and have no joysticks ([Dallas Innovates](https://dallasinnovates.com/new-wing-remote-operations-center-in-coppell-oversees-dfw-drone-deliveries/)). Survey and inspection pilots mostly plan, check, follow procedures and review data ([Coptrz job guide](https://shop.coptrz.com/blogs/news/drone-pilot-jobs-explained-who-hires-them-what-they-do)). So the lab should centre on planning, checklists, go/no-go calls and reading images. Hand-flying should be a short, assisted reward.
2. **Every AI failure in the lab has a documented real-world twin:**
   - Geo-awareness data that "is not always accurate" ([CAA](https://caa.co.uk/drones/airspace-and-restrictions/airspace-alerting-apps)).
   - Obstacle sensing that cannot see power cables ([DJI forum staff post](https://forum.dji.com/thread-183986-1-1.html)).
   - NDVI misled by shadows and wet soil ([Environmental Biophysics](https://environmentalbiophysics.org/tag/remote-sensing/)).
   - Thermal detectors that flag animals as people ([arXiv 2309.01904](https://ar5iv.labs.arxiv.org/html/2309.01904)).
   - Headwinds that raise energy use by up to about 25% ([preprint](https://www.preprints.org/manuscript/202604.0751)).
3. **The best real AI success story is also the best lesson.** In 2025, software scanning more than 2,600 drone photos of Monviso flagged "a few red pixels": the helmet of a mountaineer missing for ten months. Officials called it "a joint success between advanced technology and the skilled human team interpreting the AI's results" ([ExplorersWeb](https://explorersweb.com/ai-solves-the-mystery-of-missing-italian-climber/); [Advnture](https://www.advnture.com/hiking/hiking-safety/the-future-of-mountain-rescue-how-ai-found-the-body-of-a-hiker-missing-in-the-italian-alps-for-ten-months)). The AI flags; a human checks and decides. That is the core loop of this lab.

**The six levels at a glance.**

| # | Level | Real mission twin | AI's confident mistake | Evidence lens |
|---|---|---|---|---|
| 1 | First Flight and the Drone Code | Flyer ID, Drone Code | Straight route to the lighthouse, through the airfield's restriction zone and over the fête crowd (88%) | Airspace map with today's notices |
| 2 | Map the Field | Photogrammetry survey | Maps the whole map square, including the campsite and back gardens, and records non-stop (86%) | Boundary and privacy lens; Drone Code distance rings |
| 3 | Crop Doctor | NDVI crop-health survey | "Sick crops" that are really the hedge's afternoon shadow and a wet hollow (84%) | Walk the field (ground-truthing), plus the sun-time slider |
| 4 | Turbine Check | Wind-turbine blade inspection | Plans the flight for the calm forecast at ground level, but hub-height gusts are over the drone's limit (91%). Bonus: says "no damage" after shooting one side of the blade | Wind-at-height lens; full-resolution photo tiles |
| 5 | Night Search | Mountain rescue thermal search | "Person found 94%" is a sheep. It misses the walker in a red coat lying in heather | Zoom camera; shape and colour check; lost-person map |
| 6 | Medicine Run | NHS/Apian/Wing, Zipline, Royal Mail Orkney | Battery plan for still air says "arrives with 22% left" (90%). Into a headwind it would arrive with almost nothing | Wind arrows plus battery-time bar; reserve rule |

The AI's mistakes follow four rules that children learn to predict. These match Eco Town's rules, adapted:
- **it uses old or incomplete data**, such as an out-of-date map, ground-level wind or summer-trained images;
- **it assumes the typical case**, such as calm air, people standing up or sunny crops;
- **it optimises one word**: "quick", "everything" or "found";
- **it can't see what it wasn't shown**, such as the other side of the blade, today's event or a thin cable.

---

## 1. Real-world grounding

### 1.1 How UK drone pilots are licensed (CAA)

**Two IDs.** UK drone flying rests on two separate registrations:
- A **Flyer ID** proves the *person flying* knows the rules. It comes from a free online theory test with 40 multiple-choice questions and a pass mark of 30. The test is open-book (you may look at the Drone Code during it), can be re-sat free of charge, and lasts five years ([CAA: prepare for the Flyer ID test](https://www.caa.co.uk/drones/getting-started-with-drones-and-model-aircraft/prepare-for-the-flyer-id-theory-test/); [Heliguy](https://www.heliguy.com/blogs/knowledge-base/what-is-the-drone-flyer-id-test/)).
- An **Operator ID** registers the *person or organisation responsible* for the drone. It must be on the aircraft, and you must be 18 to hold one ([CAA: children and parent guidance](https://www.caa.co.uk/drones/getting-started-with-drones-and-model-aircraft/children-and-parent-guidance/)).

**From 1 January 2026:**
- The Flyer ID threshold dropped from 250 g to 100 g.
- An Operator ID is needed for a camera drone of 100 g or more, and for any drone of 250 g or more.
- New UK class marks UK0–UK6 apply, and Remote ID is required on new UK1–UK3 drones.

These points come from secondary sources [check against CAA] ([Heliguy](https://www.heliguy.com/blogs/posts/uk-drone-rules-2026-changes/); [DJI Viewpoints](https://viewpoints.dji.com/blog/new-uk-drone-regulations); [TechRadar](https://www.techradar.com/cameras/drones/uk-drone-laws-have-just-changed-if-your-drone-has-a-camera-read-this-now)).

**Categories.**
- **Open category, which covers most hobby and much commercial flying.** It has three sub-categories, set by how close you fly to uninvolved people: A1 "fly over people", A2 "fly close to people" and A3 "fly far from people" ([CAA: introduction to more advanced flying](https://caa.co.uk/drones/moving-on-to-more-advanced-flying/introduction-to-more-advanced-flying)). One study site says these were renamed "Over/Near/Far from People" in 2026 [check].
- **A2 Certificate of Competency (A2 CofC).** The step above Flyer ID. It is a course and theory exam with a CAA-recognised assessment entity, plus self-declared practical training ([CAA: A2 CofC](https://caa.co.uk/drones/remote-pilot-qualifications/a2-certificate-of-competence-a2-cofc)). For many commercial jobs it is the minimum ([Coptrz](https://shop.coptrz.com/blogs/news/drone-pilot-jobs-explained-who-hires-them-what-they-do)). It is valid for five years ([CAA overview](https://www.caa.co.uk/drones/remote-pilot-qualifications/overview/)).
- **Specific category.** Anything riskier than the Open category needs an **Operational Authorisation** from the CAA ([CAA: specific category overview](https://www.caa.co.uk/drones/specific-category/specific-category-overview/)), for example closer to people, in congested areas, or beyond visual line of sight (BVLOS). There are two routes:
  - **PDRA01**, a pre-defined risk assessment that the CAA has already done for common operations. The operator writes an Operations Manual from a CAA template ([CAA: PDRA01 overview](https://www.caa.co.uk/drones/specific-category/pdra01-operational-authorisation/pdra01-overview/); [ARPAS-UK](https://arpas.uk/caa-launches-new-pdra01-operations-manual-template/)).
  - **UK SORA** (CAP 3017, adapted from JARUS SORA 2.5) for anything bespoke ([CAA: SORA](https://www.caa.co.uk/drones/regulations-consultations-and-policy-programmes/policy-programmes/specific-operations-risk-assessment-sora)). SORA works in these steps:
    1. Score the **ground risk** (GRC 1–7: who could be hit underneath).
    2. Score the **air risk** (ARC: what else is in the sky).
    3. Apply mitigations, such as parachutes, routing over empty ground or tactical deconfliction.
    4. Combine the two scores into a **SAIL**, which sets how much evidence the operator must provide ([Dronedesk](https://blog.dronedesk.io/uk-sora-explained-for-drone-operators/); [Heliguy](https://www.heliguy.com/blogs/posts/caa-update-introducing-uk-sora-guidelines/)).

    This is a superb child-sized idea: *Who's underneath? What else is up there? What if it breaks? So what do we need to do?*
- **BVLOS is the frontier.** Early approvals include sees.ai, Drone Major over critical infrastructure, and Heliguy's SORA SAIL II drone-in-a-box at Network Rail. The CAA aims for routine BVLOS by 2027, and CAP 3008 is its BVLOS guide ([sUAS News](https://www.suasnews.com/2025/10/bvlos-is-coming-of-age-what-the-caas-new-roadmap-means-for-uk-drone-pilots-and-companies/); [ARPAS-UK](https://arpas.uk/coptrz-secures-first-of-its-kind-caa-approval-for-uk-bvlos-sora/)).

**The Drone Code: the rules children should leave knowing** ([CAA: where you can fly](https://www.caa.co.uk/drones/drone-code/where-you-can-fly/)):
- **Height:** never more than **120 m (400 ft)** from the closest point of the ground. Adjust over hills and cliffs.
- **People:** keep at least **50 m** horizontally from people. Never fly over crowds, whatever the size of the drone. (Sub-250 g and UK0/UK1/C0 drones may go closer to uninvolved people.)
- **Built-up areas:** at least **150 m** from residential, recreational, commercial and industrial areas, and "be prepared to increase the distance".
- **Airports:** "Never fly in [an airport's Flight Restriction Zone] unless you have permission." Endangering an aircraft can mean five years in prison.
- **Emergencies:** "You must safely and immediately stop flying unless the emergency services give you permission to continue."
- **Visual line of sight:** always keep the drone in direct sight so you can see and avoid other things ([Drone Code PDF copy, Loughborough](https://www.lboro.ac.uk/media/wwwlboroacuk/internal/content/images/news/main/drone-code-19.pdf)).
- **Exception for tall structures:** if the owner of a structure over 105 m asks you to survey it, you may go above 120 m, within 50 m of it horizontally and no more than 15 m above it ([CAA Drone Code](https://Register-drones.caa.co.uk/drone-code/less-common-types-of-flying)). This links nicely to the turbine level.

**Airspace tools.**
- **Drone Assist** (NATS, powered by Altitude Angel) is an interactive airspace map. Red zones are typically Flight Restriction Zones (FRZs) or controlled airspace. Pilots can request digital permission to fly in some zones, but the app "facilitates flight approvals, it does not grant permissions" ([Altitude Angel](https://www.altitudeangel.com/resources/your-essential-guide-to-drone-operations); [NATS](https://www.nats.aero/news/new-app-to-help-drone-pilots-comply-with-uk-rules/)).
- The CAA warns that restriction information in built-in geo-awareness and flight-planning software "is not always accurate", and that pilots must assure themselves of its accuracy ([CAA: airspace alerting apps](https://caa.co.uk/drones/airspace-and-restrictions/airspace-alerting-apps)). **This sentence is the AI lesson of Level 1, written by the regulator.**
- **NOTAMs** (notices to aviation), from NATS AIS, carry temporary restrictions. Guides advise checking the night before and again shortly before launch, because some restrictions appear after midnight ([Dronedesk](https://blog.dronedesk.io/how-to-check-a-drone-notam-before-you-fly/); [CAA: notifying airspace users](https://caa.co.uk/drones/airspace-and-restrictions/notifying-airspace-users-of-drone-and-remotely-piloted-events-or-activity)).
- **Geofencing is not a safety net.** On 13 January 2025 DJI replaced its own US no-fly zones with FAA data shown as "Enhanced Warning Zones". Drones are no longer automatically stopped, and pilots must get permission themselves ([DroneDJ](https://dronedj.com/2025/01/14/dji-geofencing-no-fly-zone/); [PetaPixel](https://petapixel.com/2025/01/15/dji-gets-rid-of-no-fly-zones-users-expected-to-fly-safely)). Reports say the approach is spreading to other regions ([Heise](https://heise.de/-10243171)). The lesson: *the pilot, not the software, is responsible.*

### 1.2 FAA Part 107 (USA), for comparison

- **Eligibility:** remote pilots must be **at least 16**, read and speak English, and pass the initial knowledge test ([14 CFR 107.61](https://www.law.cornell.edu/cfr/text/14/107.61)). The test is reported as 60 questions with a 70% pass mark, and must be renewed every 24 months [check] ([Rotate Pilot](https://rotatepilot.com/part-107/cheat-sheet)).
- **Operating rules:**
  - 107.31: visual line of sight;
  - 107.39: operation over people;
  - 107.51: operating limits (generally 400 ft above ground, and 100 mph) [limits from memory, check against [eCFR](https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-107)].
- **2021 changes:** night flights and flights over people became possible without a waiver, under conditions ([Penn State GEOG 892](https://courses.ems.psu.edu/geog892/node/691)).
- **In the jobs:** US delivery and inspection operators (Zipline, Wing, SkySpecs) list Part 107 as required or preferred ([Zipline job listing](https://jobs.techstars.com/companies/zipline/jobs/48866866-flight-operator); [SkySpecs](https://skyspecs.breezy.hr/p/35e7c119f71e-uas-offshore-pilot)).
- **Use in the lab:** Part 107 is a useful "same idea, different country" card for US venues. The ages, the 400 ft/120 m ceiling and the line-of-sight principle line up with the UK rules.

### 1.3 The professional's routine: what a real flight involves

From the sources above and the job listings, a typical professional flight runs like this. Each step can become an act or a checklist card in the lab.

1. **Brief:** the client's goal, the deliverable, the site and the deadline.
2. **Desk check:**
   - airspace (Drone Assist, FRZs) and NOTAMs;
   - land-owner permission;
   - privacy plan;
   - weather (wind at the surface *and* at height, gusts, rain, temperature, visibility);
   - a site risk assessment: people, roads, power lines, livestock, take-off and landing areas, emergency landing spots.
3. **Mission plan:** waypoints, height, speed, camera settings, overlap, battery count and reserve, return-to-home (RTH) height.
4. **On-site check:** walk the site, then run the pre-flight checklist:
   - propellers, batteries and firmware;
   - compass and GPS lock;
   - RTH point;
   - observer briefing;
   - cordon.

   Real job adverts list "pre-flight inspections and airspace checks" as core tasks ([Coptrz](https://shop.coptrz.com/blogs/news/drone-pilot-jobs-explained-who-hires-them-what-they-do)). Zipline operators "perform critical checks [and] communicate with Zipline controllers in readiness for flight" ([Zipline listing](https://jobs.techstars.com/companies/zipline/jobs/48866866-flight-operator)).
5. **Go/no-go:** the pilot in command decides.
6. **Fly:** mostly automated waypoints, with a visual observer watching the sky.
7. **Post-flight:** log the flight, check the data quality before leaving the site, review images, report.

**Weather and battery facts for in-game numbers:**
- **Wind ratings vary by model.** DJI rates the Mini 3 Pro at 10.7 m/s ([DJI](https://www.dji.com/ph/support/product/mini-3-pro)), the Mavic 3 Pro at 12 m/s ([Droneblog](https://www.droneblog.com/?p=1048586)) and the Neo at 8 m/s ([HireDronePilot](https://hiredronepilot.uk/drones/dji-neo/dji-neo-wind-resistance/)). One guide suggests flying at no more than two-thirds of the rating (a rule of thumb, not a DJI figure).
- **Rated flight times assume still air at about 25 °C.** Cold and wind both cut them ([DJI forum](https://forum.dji.com/thread-287130-1-1.html)). Third-party estimates of the cut range from 25–50% [check].
- **Headwinds:**
  - A 2026 simulation calibrated on 208 real flights found headwinds alone raised energy use by up to 25%, and cold plus headwind by up to 53% for light drones ([preprint, not peer-reviewed](https://www.preprints.org/manuscript/202604.0751)).
  - A Halle-Wittenberg study found crosswinds can increase energy use "sometimes drastically" ([idw](https://idw-online.de/de/news745113)).
  - MIT work showed routes that shelter behind buildings can save large amounts of energy in a 10 m/s wind ([IEEE Spectrum](https://spectrum.ieee.org/quadrotors-learning-to-surf-urban-winds)).
- **Obstacle avoidance has blind spots.** DJI says obstacle sensing "cannot function normally" when flying over small objects such as power cables ([DJI forum staff post](https://forum.dji.com/thread-183986-1-1.html)). A UK incident report describes a Mini 5 caught in fine branches it did not detect ([CHIRP](https://chirp.co.uk/?p=42272)).

### 1.4 Real missions and how AI helps in each

| Mission | What the drone team actually does | How AI assists | Its documented weak spots |
|---|---|---|---|
| **Search and rescue** | Mountain rescue teams fly thermal drones (such as the DJI M30T) over search areas. They hand images to reviewers and coordinate with ground teams and helicopters. Most MREW drone teams train to GVC (visual line of sight) level. Brendan O'Neill is MREW's national drone officer ([RICS Land Journal](https://ww3.rics.org/uk/en/journals/land-journal/drone-use-mountain-rescue.html)). Buxton MRT was the first in England and Wales to gain CAA approval ([grough](https://www.grough.co.uk/magazine/2019/02/15/buxton-team-first-in-england-and-wales-to-gain-caa-approval-for-drone-use-in-rescues)). Wasdale MRT used a thermal drone in a January 2026 search ([WMRT](https://www.wmrt.org.uk/incident-tags/drone/)). | **Computer-assisted image search:** the Lake District drone group's software helped find a walker missing six weeks near Glencoe ([The Herdwick](https://theherdwick.com/2023/11/01/lake-district-mountain-rescue-developed-drone-tech-assists-in-scottish-highlands-search/)). The Monviso red-pixel find is above. In Poland, SARUAV scanned 782 images and found a missing person in about four hours ([DroneXL](https://dronexl.co/2024/10/07/ai-drone-software-search-and-rescue)). **AI search planning:** Glasgow's lost-person model plus path planner found the person in 19% of simulated searches, against 8% for a "lawnmower" pattern ([MIT Technology Review](https://www.technologyreview.com/2024/05/30/1092988/ai-directed-drones-could-help-find-lost-hikers-faster)). | Animals give thermal false positives ([arXiv 2309.01904](https://ar5iv.labs.arxiv.org/html/2309.01904)). Datasets lack people lying down, crouching or partly hidden. SARD was built because of that gap ([Sambolek & Ivasic-Kos](https://www.bib.irb.hr/1090529)), and NOMAD says no SAR dataset had addressed occlusion ([arXiv 2309.09518](https://ar5iv.labs.arxiv.org/html/2309.09518)). Probability maps can send searchers to the wrong place if they are wrong (MIT TR, above). The 2013 Patterdale trial needed crowds of people to review "up to 100 images a minute" ([grough 2013](https://www.grough.co.uk/magazine/2013/07/16/mountain-rescuers-seek-help-in-testing-drone-search-of-lake-district-fell)). |
| **Wind-turbine inspection** | The rotor is parked and each blade is photographed close up. One UK provider quotes 20–30 minutes of parked-rotor time per turbine ([HireDronePilot](https://hiredronepilot.uk/services/wind-farm-survey/)). Offshore pilots may also need GWO safety training ([SkySpecs](https://skyspecs.breezy.hr/p/35e7c119f71e-uas-offshore-pilot)). | **Defect detection and classification:** cracks, leading-edge erosion, delamination and lightning damage, with each finding placed by blade, side and distance from the root ([Windtech: Boralex and SkyVisor](https://www.windtech-international.com/product-news/boralex-applies-skyvisor-ai-to-enhance-turbine-blade-inspections); [Roboflow](https://roboflow.com/ai/wind-turbine-inspection)). **Automated close-range flight paths** use LiDAR and GPS ([Inside Unmanned Systems](https://insideunmannedsystems.com/elevation-ai-driven-drones-reshaping-turbine-inspections)). | Inspection drones are limited by wind, typically below 12 m/s ([Oxmaint, vendor](https://oxmaint.com/industries/power-plant/wind-turbine-blade-inspection-robots-and-drones-maintenance-with-cmms-2026)). A detector can only judge the surfaces it was shown. Vendor accuracy claims are unverified. |
| **Agriculture** | Multispectral drones capture red, red-edge and near-infrared light. Software produces NDVI and NDRE maps, and agronomists turn these into zones and variable-rate prescriptions ([Coptrz](https://coptrz.com/blog/agritech-drones-vegetation-indices-and-aerial-imagery/); [Advexure](https://advexure.com/blogs/news/aerial-multispectral-data-the-foundation-of-variable-rate-technology-in-precision-agriculture)). | **Crop-health classification and zoning.** DJI Terra generates prescription maps that spraying drones then follow (Advexure, above). | NDVI is distorted by soil background (worst below 50% cover), by wet, dark soil, by shadows and by saturation in dense crops ([Environmental Biophysics](https://environmentalbiophysics.org/tag/remote-sensing/); [Streambatch](https://streambatch.io/knowledge/savi-from-first-principles)). Ground truth is the fix. |
| **Mapping and photogrammetry** | Grid flights with at least **75% front and 60% side overlap**, raised to 80–85% in complex terrain. Ground Control Points are spread across the site. Ground sample distance (GSD) is set by height ([Pix4D](https://support.pix4d.com/hc/best-practices-for-image-acquisition-and-photogrammetry)). With GCPs, accuracy is about 1–2 cm horizontally ([Drone courses](https://drone-courses.pages.dev/courses/drone-mapping/flight-planning-for-mapping/)). | **Automatic flight-grid generation, image stitching** and 3D models ([Esri Drone2Map](https://www.esri.com/arcgis-blog/products/drone2map/3d-gis/generating-high-quality-outputs-from-drone-imagery)). | Too little overlap or featureless ground (water, crops, snow) leaves holes and distortions. Featureless areas may need up to 90% overlap (Esri). |
| **Medical delivery** | **Zipline Rwanda:** orders by text, delivery by parachute within about 20 minutes. Over 11,000 deliveries by 2019, and more than 65% of blood deliveries outside Kigali ([ITU](https://www.itu.int/hub/2020/04/how-medical-delivery-drones-are-improving-lives-in-rwanda/); [IEEE Spectrum](https://spectrum.ieee.org/in-the-air-with-ziplines-medical-delivery-drones)). **NHS:** Guy's and St Thomas' ran a trial from October 2024 to spring 2025 with Apian and Wing. Blood samples took under two minutes by drone, against more than 30 minutes by road ([GSTT](https://www.guysandstthomas.nhs.uk/news/nhs-blood-samples-be-delivered-drones-london-first); [Wing](https://wing.com/news/nhs-blood-delivery)). **Royal Mail and Skyports, Orkney (2023):** mail flown from Stromness to Graemsay and Hoy, "wherever possible... routed over the sea to minimise the surface risk", because weather often stops the ferries ([The Engineer](https://www.theengineer.co.uk/content/news/royal-mail-launches-drone-mail-deliveries-in-orkney); [ITV](https://itv.com/news/2023-08-01/orkney-to-host-uks-first-drone-delivery-service-for-island-mail)). | **Automated route planning and fleet supervision.** A Wing supervising pilot oversees up to about 15 drones, mainly watching for hazards ([Smithsonian](https://www.airandspace.si.edu/collection-objects/delivery-drone-wing-m7000/nasm_A20200480000)). Drones run their own health checks ([Wing](https://wing.com/news/wing-unveils-first-of-its-kind-remote)). | Wind, weather, ground risk under the route, and BVLOS approval. |
| **Wildlife surveys** | Thermal finds heat signatures, then zoom RGB identifies species, sex and age. Counts are done in winter, when trees are leafless, and planned so deer are not counted twice. The Woodland Trust uses an M300 with an H20T. Forestry and Land Scotland counts deer over 1,000 ha at Loch Katrine ([Heliguy](https://www.heliguy.com/blogs/posts/drones-for-deer-surveying/); [FLS](https://forestryandland.gov.scot/news-releases/thermal-imaging-drones-track-deer-numbers-in-woodland-creation-area)). | **Machine-learning deer counting**, under development by BH Wildlife (Heliguy, above). | Disturbance. Seabird guidance suggests take-off at 50 m or more away and flying 50 m or more above colonies ([Oxford](https://www.biology.ox.ac.uk/node/3551346)). Disturbing seals or nesting birds is a legal issue ([NatureScot](https://presscentre.nature.scot/news/drones-and-wildlife-operators-warned-against-misuse)). |
| **Firefighting** | Thermal drones map a wildfire's extent and hotspots before crews go in. In the Glenmore wildfire, hotspots reached 401 °C ([FLS](https://forestryandland.gov.scot/news/how-thermal-drones-helped-us-tackle-the-glenmore-wildfire)). Lancashire, West Midlands, Bedfordshire and others run drone teams ([Heliguy](https://heliguy.com/blogs/posts/drone-helps-tackle-spate-of-wildfires/); [Bedfordshire FRS](https://www.bedsfire.gov.uk/news/bedfordshire-fire-and-rescue-service-enhances-operations-state-art-drone-technology)). | **Autonomous swarm detection,** trialled by Lancashire FRS with Windracers ([The Engineer](https://theengineer.co.uk/content/news/lancashire-fire-and-rescue-test-windracers-drones-for-wildfire-prevention)). **AI wildfire detection** ([Sheffield](https://sheffield.ac.uk/eee/news/ai-technology-developed-sheffield-helps-detect-and-investigate-wildfires)). | The swarm is pending regulatory approval. Smoke and heat affect sensors. |
| **Filming** | Planned shots, permissions and privacy notices. | Subject tracking ("ActiveTrack"-style follow modes). | Privacy. The ICO said drones have "high potential for collateral intrusion", and that recording should not be continuous and should have an on/off control ([Inside Privacy](https://www.insideprivacy.com/international/ico-releases-concrete-guidance-on-privacy-requirements-when-recording-video-with-drones/)). |

**Recommendation:** use five of these missions as levels (SAR, turbine, agriculture, mapping, delivery). Use wildlife, firefighting and filming as optional "side missions" or debrief career cards.

### 1.5 The jobs, day to day

| Job | What they do day to day | Lab level | Sources |
|---|---|---|---|
| **Commercial drone pilot** (survey, inspection, media) | Quotes and briefs; airspace, NOTAM and permission checks; site risk assessment; pre-flight checks; flying (mostly automated grids or orbits); checking data quality on site; logging flights; often freelance. Typically holds an A2 CofC or GVC. A trainee role at Cyberhawk was advertised at £30,000 or more. | All | [Coptrz](https://shop.coptrz.com/blogs/news/drone-pilot-jobs-explained-who-hires-them-what-they-do); [Bright Network: Cyberhawk](https://www.brightnetwork.co.uk/graduate-jobs/cyberhawk/trainee-uas-pilot-edinburgh-2024); [CareerPilot](https://careerpilot.org.uk/job-sectors/stem/job-profile/drone-pilot) |
| **Inspection analyst** | Reviews thousands of close-up images; confirms or rejects AI-flagged defects; grades severity; writes repair recommendations; compares with last year's inspection. | 4 | [SkyVisor/Boralex](https://www.windtech-international.com/product-news/boralex-applies-skyvisor-ai-to-enhance-turbine-blade-inspections); [Zeitview](https://startup.jobs/blade-data-capture-specialist-external-drone-pilot-zeitview-7871747) |
| **GIS and mapping technician** (geospatial technician) | "Collect data to create maps, update satellite navigation systems and plan construction and conservation projects." Processes drone imagery into orthomosaics and 3D models; checks accuracy against ground control. | 2 | [National Careers Service](https://nationalcareers.service.gov.uk/job-profiles/geospatial-technician); [Prospects](https://www.prospects.ac.uk/job-profiles/geographical-information-systems-officer) |
| **SAR drone operator** (often a volunteer) | Trains with the team; launches on call-out; flies thermal and zoom sectors as instructed by the search manager; hands off to image reviewers; gives way to helicopters. | 5 | [RICS](https://ww3.rics.org/uk/en/journals/land-journal/drone-use-mountain-rescue.html); [Buxton MRT](https://www.buxtonmountainrescue.org.uk/?p=14655) |
| **Agronomist** | "Advise farmers on soil health, disease prevention and how to improve crop production." Walks fields (scouting), tests soil and plans spray schedules. Needs BASIS certification to advise on pesticides. Uses NDVI maps to decide where to scout and treat. | 3 | [CareerPilot](https://careerpilot.org.uk/job-sectors/agriculture/job-profile/agronomist); [Lantra](https://lantra.co.uk/careers/JobProfile/JobProfileDetails/9) |
| **Delivery-network operator** | Assembles and checks drones, launches and recovers them, talks to controllers, reports faults and supports incident response. Supervises several automated flights at once from an operations centre. | 6 | [Zipline listing](https://jobs.techstars.com/companies/zipline/jobs/48866866-flight-operator); [Wing ROC](https://wing.com/news/wing-unveils-first-of-its-kind-remote); [Dallas Innovates](https://dallasinnovates.com/new-wing-remote-operations-center-in-coppell-oversees-dfw-drone-deliveries/) |

Wildlife surveyors and firefighter drone pilots are good extra cards for the debrief.

---

## 2. Games, simulators and education programmes to learn from

| Product | What it is | What makes it engaging | What it teaches DeltaOps |
|---|---|---|---|
| **Liftoff** | A realistic FPV racing and freestyle simulator with many drone frames | Physics, freedom, a sense of mastery | Full Acro mode is "hard" even for adults ([DroneDJ](https://dronedj.com/2020/07/27/learning-to-fly-fpv-drones-flying-in-a-simulator-part-1/); [Goodden](https://nicholas-goodden-pdt4.squarespace.com/london-blog/is-liftoff-a-good-fpv-sim-dji-fpv-drone)). **Do not** give 8–14s an Acro model in a 60-minute lab. |
| **DRL Simulator** | Drone Racing League's simulator | Its onboarding breaks flying "down to the core movements", stepping from Angle mode to Acro in small steps ([DroneDJ](https://dronedj.com/2020/07/27/learning-to-fly-fpv-drones-flying-in-a-simulator-part-1/); [Model Aviation](https://www.modelaviation.com/node/1416)) | **Staged assists:** start in position-hold (GPS) mode, then show what the assists do by briefly turning one off. |
| **DJI Flight Simulator** (Enterprise and Energy editions) | Professional training simulator for Windows | Real job scenarios: **search and rescue** (find a lost hiker in woods) and **power-line inspection** (learn the pylon, then inspect) ([DJI](https://www.dji.com/enterprise/news/detail/dji-expands-drone-ecosystem-at-airworks-2018); [Droneblog](https://www.droneblog.com/dji-flight-simulator/)) | Confirms that the industry itself trains with **mission scenarios**, not racing. Our levels mirror its SAR and inspection modules. |
| **Microsoft Flight Simulator and AirSim** | MSFS: realistic world and weather. AirSim: open-source research simulator for computer vision and reinforcement learning, archived in 2022 and succeeded by Project AirSim ([The Register](https://www.theregister.com/2022/07/19/microsofts_metaverse_is_for_training/); [AirSim docs](https://microsoft.github.io/AirSim/)) | Real weather and real places. AirSim exists *to train AI in simulation*. | A **"sim to train the AI"** framing: the children's corrections become training data (links to `round-3/09`). Show weather as something visible: wind streaks, a windsock, cloud speed. |
| **Tello EDU** | About 80 g classroom drone. Scratch, Python and Swift; **Mission Pads** as physical waypoints; swarm control ([DroneDJ](https://dronedj.com/2018/11/15/tello-edu/); [The Drone Girl](https://www.thedronegirl.com/2018/05/08/dji-tello-drone-review/)) | Real flight from code; swarm choreography | Waypoints are the right abstraction for children. The Tello EDU is reportedly discontinued ([SheMaps](https://shemaps.com/?p=11354)) [check]. |
| **CoDrone EDU** (Robolink) | Ages 12+; Blockly, then Python; free lessons on Basecamp; Robolink recommends 1:1 or at most 2:1 students per drone ([Robolink](https://robolink.com/products/codrone-edu-set-of-10-kits)) | Code-to-flight progression | Real classroom drones need high adult and equipment ratios. A browser lab scales better. Offer real flight only as an extension. |
| **DRL Academy / "Science of Drone Racing"** | DRL Academy (2020) offered free flying and building lessons and STEM panels. The 2021–22 middle-school curriculum was built with Draganfly, Woz Ed and Robotify ([DroneDJ](https://dronedj.com/2020/03/19/drone-racing-league-launches-drl-academy/); [DroneLife](https://dronelife.com/2021/12/22/the-science-of-drone-racing-drl-and-draganfly-create-new-stem-program/)) | Spectacle, speed, role models | Use racing energy for the **trailer and a warm-up gate run**, but put the career in the missions. |
| **CAA Drone Code and Flyer ID test** | Free, open-book, 40 questions, pass mark 30 ([CAA](https://www.caa.co.uk/drones/getting-started-with-drones-and-model-aircraft/prepare-for-the-flyer-id-theory-test/)) | Low stakes; open book; free retakes | Level 1 can use a **practice** quiz in the same spirit: open book, retake freely. I found **no UK CAA classroom pack**. |
| **CASA "Know Your Drone" (Australia)** | Free primary and secondary lesson plans, quizzes, posters, colouring sheets and certificates for ages 10–16, aligned to the Australian Curriculum ([CASA shop](https://shop.casa.gov.au/collections/school-resources); [ESA](https://esa.edu.au/resources/news-articles/article-detail/drone-safety-to-be-taught-in-classrooms)) | Simple and classroom-ready | A model for the facilitator pack and the take-home certificate. It fills a gap the UK regulator hasn't. |
| **FAA AWEP drone lesson** | Lesson on how drones fly and how to operate them safely ([FAA PDF](https://www.faa.gov/education/programs/aerospace-workforce-educator-program-connecting-classrooms-aviation-careers/Lesson-Plan-Drones.pdf)) | Ties to careers | For US venues. |

**What children can handle (synthesis):**
- **Waypoints, not sticks.** Tapping waypoints on a map and setting the height is within reach of 8-year-olds, as Tello Mission Pads and Blockly show. Hand-flying in position-hold mode with one control works for short segments. Acro FPV does not.
- **Real procedures as the fun part.** Checklists, go/no-go calls and radio calls ("Aircraft! Descend and hold") are memorable rituals when given to named roles.
- **Short missions with visible results:** a stitched map, a colour crop map, a defect photo, a found walker, a landed parcel.
- **Thermal imagery is intrinsically exciting** (glowing animals at night), and it naturally creates ambiguity. Children can judge "sheep or person?" quickly and argue about it with evidence.

---

## 3. Real-life skills to train, mapped to curriculum and careers

| Skill | In the lab | UK curriculum (England) | NGSS (US) | Career link |
|---|---|---|---|---|
| **Checklists and safety culture** | Challenge-and-response pre-flight cards; go/no-go; anyone can call "Stop" | DT: evaluate against criteria, safety; PSHE: risk | 3-5-ETS1-1, MS-ETS1-1: criteria and constraints ([NGSS](https://nextgenscience.org/topic-arrangement/msengineering-design)) | All pilots; aviation crew resource management |
| **Reading maps and airspace** | Drone Assist-style map; FRZ; grid references for launch sites and finds | KS2 geography: eight compass points, four- and six-figure grid references, OS maps, digital mapping, fieldwork. KS3: OS maps "including using grid references and scale... and aerial and satellite photographs", and GIS ([DfE geography programmes of study](https://www.gov.uk/government/publications/national-curriculum-in-england-geography-programmes-of-study/national-curriculum-in-england-geography-programmes-of-study)) [exact KS3 wording from memory; check] | MS-ETS1-2 | GIS technician, SAR operator |
| **Weather** | Wind at height versus the ground, gusts, the drone's rating, cold battery | KS2 science/geography (weather); KS3 geography: weather and climate | 3-ESS2-1 (weather data) [check code] | All pilots; turbine crews |
| **Coordinates and waypoints** | Place waypoints by grid; set heights | KS2 maths: Y6 coordinates in four quadrants; KS2 computing: "design, write and debug programs", sequences | 3-5-ETS1-2 | Mapping, delivery |
| **Battery and time budgets** | Battery-time bar; reserve rule; headwind and tailwind | KS2 maths: percentages, time, measures. KS3 maths: speed, distance and time, compound units, ratio | MS-ETS1-3 (combine the best features after tests) | Delivery operator |
| **Interpreting images** | NDVI colours; thermal; zoom; overlap holes; defect tiles | KS3 geography: aerial and satellite photographs; KS2 science: light (plants reflecting light) | MS-LS1 (plant health) [check] | Inspection analyst, agronomist |
| **Working with AI** | "% sure" versus evidence; ask what data it used; false positives and false negatives | KS3 computing: algorithms, data. AI-literacy competencies from Long & Magerko (see `round-3/02`) | MS-ETS1-2 | Every job above |
| **Ethics and privacy** | Boundary-only mapping; camera off over gardens; telling people before you film; wildlife distances | PSHE and citizenship: privacy, respect | — | All pilots; ICO and UK GDPR |
| **Team communication** | Role cards, standard calls, handovers | English: spoken language | Engineering practice: communicate | SAR, delivery operations centres |
| **Rules and permissions** | Flyer ID quiz; FRZ permission; BVLOS permission card (simplified SORA) | Citizenship: rules and law | — | All pilots |

---

## 4. Lab orchestration

### 4.1 World and story arc: "Storm Week on Kestrel Isle"

**The world.** One floating voxel island in the brochure style ([context.md](../context.md)):
- a village with a green, school and fête field;
- a small airfield with a windsock;
- a farm with fields and hedges, plus a campsite;
- a ridge with three wind turbines;
- a heather moor with sheep, crags and a stream;
- a lighthouse;
- across a strait, a tiny second island ("Little Holm") with a clinic.

The `obj-turbine`, `island-island` and lighthouse assets already fit.

**The arc.** Each level is one day. The weather builds from a sunny Monday to a storm on Saturday. The sky, sea and windsock show it every day, so children *see* the conditions they must plan for.

| Day | Level | Story beat |
|---|---|---|
| Mon | 1. First Flight | The team gets its drone and a practice Flyer ID. The harbourmaster wants a photo of the lighthouse for the island newsletter. |
| Tue | 2. Map the Field | Farmer Ade needs an accurate map of a new field before planting. |
| Wed | 3. Crop Doctor | The wheat looks patchy. Where is it really sick? Spray only what needs it, and save the bees. |
| Thu | 4. Turbine Check | Last night's thunderstorm: did lightning hit Turbine 2? The island's power depends on it. |
| Fri | 5. Night Search | A walker hasn't come back from the moor as the weather turns. Mountain rescue calls in the drone team. |
| Sat | 6. Medicine Run | The storm has stopped the ferry. The walker is safe but hypothermic, and the clinic on Little Holm needs [medicine/blood test kit]. Fly it across before the wind gets too strong. |

**Trailer beats (about 60–75 seconds):**
1. A sunrise turntable of the island.
2. A child's hand taps "Pre-flight check ✓".
3. Propellers spin, the drone lifts.
4. The AI's ghost route glows straight through a red zone: "88% sure". A child says: "Wait. Check the map."
5. Montage: map tiles snap together; the crop map blooms red and green; lightning flash over a turbine blade.
6. **Night. Thermal view. Three glowing shapes. "PERSON FOUND 94%."** Zoom: a sheep blinks.
7. A child: "Show me everything warm *and* red." A faint red dot in the purple heather.
8. A helicopter's lights; "Land the drone!"
9. Storm, ferry cancelled. The drone fights the wind over grey waves, battery bar ticking down, "Reserve: 30%".
10. The parcel lands at the clinic.
11. Title: **Become a Drone Pilot. Plan it. Check it. Fly it.**

### 4.2 The acts within each level

These adapt the Eco Town seven-act loop ([DESIGN.md](../../games/ecotown/DESIGN.md)) to a flight mission.

| Act | Camera | What happens | Real-world twin |
|---|---|---|---|
| 1. **Call-in** | Cinematic | A client's call (farmer, harbourmaster, rescue controller), the mission goal, a deliverable icon and progress dots 1–6 | Client brief |
| 2. **AI plan** | Map view (top-down, Drone Assist style) | Children give the flight assistant an instruction card. It draws a ghost route with a "% sure" score and a **"Data I used"** chip, for example "Map: 2024. Wind: ground forecast." | Automated flight planning |
| 3. **Check** | Lens overlay, then a 3D swoop | Children open evidence lenses (airspace, notices, wind at height, people, boundary, battery). The flaw shows up. A pre-flight checklist runs by challenge and response. | Desk check and site check |
| 4. **Fix** | Map | A clearer instruction card, *plus* the children's own planning choices from a palette of 3–4 real options (launch site, height, overlap, time, route, reserve). The AI re-plans, and is sometimes *less* sure, honestly. | Mission planning |
| 5. **Go/no-go and fly** | Chase cam, then the drone's camera | The pilot in command calls "Go". The flight is automated, with 20–40 seconds of hand-flying in position-hold mode (take-off, a framing shot, landing). The observer watches for surprises (a bird, a paraglider, a helicopter). | Flight |
| 6. **Review** | Image viewer (RGB, thermal or NDVI) | AI flags appear on the images. The image analyst confirms or rejects each flag with evidence. | Data review |
| 7. **Log** | Island turntable | The mission log page is stamped. A "pilot skill" badge is earned. The weather moves on to tomorrow. | Logbook and report |

**Gentle consequences.** Nobody is ever hurt. A bad plan leads to one of these outcomes:
- the drone auto-returns and lands safely;
- the map has holes;
- the farmer sprays the wrong strip and the bees leave;
- the helicopter has to circle;
- the parcel only reaches the halfway pad.

There is no crash animation with people involved. Drone "crashes" only happen into trees or water, and only in hand-flying practice, with a cheerful "Insurance claim!" log entry.

### 4.3 Team roles (3–5 children)

| Role | Real job twin | Lab powers | Calls they make |
|---|---|---|---|
| **Pilot in command (PIC)** | Remote pilot | Final go/no-go; holds the flight controls for the hand-flown parts | "Go", "No-go", "Landing" |
| **Visual observer (VO)** | Observer, or Wing's supervising pilot watching video feeds | Sees a wider sky view; the only one who can spot intruders; can call "Stop" at any time | "Aircraft, nine o'clock!", "People entering the area!" |
| **Mission planner** | GIS technician, delivery planner | Owns the map, waypoints, battery bar and lenses | "Battery check: 62%, reserve OK" |
| **Image analyst** | Inspection analyst, SAR image reviewer, agronomist | Owns the image viewer; accepts or rejects AI flags | "Flag 3 is a sheep. Four legs, in a group." |
| **Safety and comms lead** (with 5 children) | Crew chief, search manager liaison | Reads the checklist; talks to the client, rescue team or clinic; keeps the log | "Checklist complete", "Rescue control, drone is airborne" |

With **3 children**, merge planner with comms, and observer with analyst. With **4**, drop the separate comms lead (the planner reads the checklist).

Roles rotate every level, shown by role badges. Every role has a decision in every level, so nobody is a passenger. Standard phrases are printed on the role cards; real aviation relies on them, and they help shy children speak.

### 4.4 Level by level

Each level gives its decision palette with real consequences, and its AI moment, including the real failure it is based on. **Bonus catches** are optional extras for 90-minute sessions.

---

#### Level 1: First Flight and the Drone Code (Mon)

**Goal:** a safe photo of the lighthouse for the newsletter.
**Skills:** the Drone Code, airspace maps, notices, the pre-flight checklist, visual line of sight.

**Warm-up (3–4 minutes).** A **practice Flyer ID quiz**: 8 questions, open book, retake freely, like the real test ([CAA](https://www.caa.co.uk/drones/getting-started-with-drones-and-model-aircraft/prepare-for-the-flyer-id-theory-test/)). Passing gives a "Practice Flyer card". It is clearly *not* a real Flyer ID (see section 5).

**Decisions:**

| Decision | Options | Consequences |
|---|---|---|
| Launch site | (a) Village green, beside the fête; (b) the school field (empty on Saturday); (c) the beach by the lighthouse; (d) the hilltop | (a) Inside 50 m of people, so the observer can't keep the area clear and the flight is a no-go. (b) Legal, but the lighthouse is 1.2 km away, beyond line of sight. (c) Close and clear, but the tide comes in during the flight, so the planner must watch the clock. (d) Clear sky view, but **120 m is measured from the ground below**, so the cliff edge changes the height. A good teaching moment. |
| Height | 30 m / 60 m / 120 m / 150 m | 150 m is illegal. 120 m is legal but the lighthouse is tiny in frame. 30–60 m gives the best photo. |
| Pre-flight checklist | Run it in full / skip it "to save time" | Skipping hides a scripted fault: a chipped propeller or a weak GPS lock. The drone hovers wobbly and auto-lands. Children redo the flight properly. |

**AI moment: a route through the no-fly zone.**
- **Vague instruction:** "Fly to the lighthouse and get a photo, quickly."
- **Confident wrong guess:** *"Quickest is a straight line. Route planned over the airfield and the fête field. 88% sure."* Its data chip reads "Map: 2024".
- **How children catch it:**
  1. Open the airspace lens: the airfield's **Flight Restriction Zone** shows as a red circle.
  2. Open the notices board: today's **fête** is listed, so crowds are expected.
  3. Turn on the Drone Code rings: a 50 m ring round people, 150 m round the village.
  4. Read the CAA's own line, shown as evidence: geo-awareness data "is not always accurate", and the pilot must check it ([CAA](https://caa.co.uk/drones/airspace-and-restrictions/airspace-alerting-apps)).
- **Clearer instruction:** "Plan a route that stays out of the red zone, keeps 50 m from people, stays under 120 m and stays in our sight. Use today's notices." The AI returns a dog-leg route along the beach, *79% sure*: "I don't know where people will walk on the beach. Your observer should watch."
- **Real twin:** DJI's 2025 switch from hard geofences to warnings ([DroneDJ](https://dronedj.com/2025/01/14/dji-geofencing-no-fly-zone/)). Software warns; the pilot is responsible.

**Bonus catch (obstacle avoidance).** The AI says *"Obstacle sensors on, safe to fly low under the cable to the lighthouse, 92%."* The zoom lens shows a thin power cable. DJI states obstacle sensing doesn't work normally over thin cables ([DJI forum](https://forum.dji.com/thread-183986-1-1.html)).

**Debrief question:** "The app said the route was fine. Whose job is it to check?"

---

#### Level 2: Map the Field (Tue)

**Goal:** a complete, accurate map of Farmer Ade's new field.
**Skills:** photogrammetry, overlap, ground control points, ground sample distance (GSD), privacy, permission.

**Decisions** (the children "paint" the survey grid on the map):

| Decision | Options | Consequences |
|---|---|---|
| Overlap | 30% / 50% / 75% front and 60% side / 90% | The stitched map comes back with **holes and smears** below 75%/60% ([Pix4D](https://support.pix4d.com/hc/best-practices-for-image-acquisition-and-photogrammetry)). 90% is perfect but takes three batteries, and the field is on a featureless crop, so it is worth it here (Esri, above). |
| Height | 30 m / 60 m / 100 m | Lower gives more detail (smaller GSD) but more photos, more time and more batteries ([Pix4D GSD](https://support.pix4d.com/hc/best-practices-for-image-acquisition-and-photogrammetry)). The children see GSD as "how big is one pixel": a sheep, a football or a coin. |
| Ground control | None / 2 markers in one corner / 5 markers spread out | With none, the map is up to a few metres off and the fence lands in the wrong place on the farm plan. Clustered markers are accurate in one corner only. Spread markers give an accurate map ([Pix4D](https://support.pix4d.com/hc/best-practices-for-image-acquisition-and-photogrammetry)). |
| Pattern | Lawnmower grid / crosshatch / orbit | Grid suits flat fields; crosshatch suits 3D models of barns; orbit suits a single building. |

**AI moment: privacy and boundaries.**
- **Vague instruction:** "Map the farm. Get everything."
- **Confident wrong guess:** *"'Everything' = the whole map square. Grid includes the campsite and the cottages' back gardens. Camera recording the whole time. 86% sure."*
- **How children catch it:**
  1. The boundary lens (Farmer Ade's land) shows the grid spilling over.
  2. The people lens shows campers and a family in a garden. The Drone Code says 50 m from people, and 150 m from residential areas for bigger drones ([CAA](https://www.caa.co.uk/drones/drone-code/where-you-can-fly/)).
  3. A short ICO card: recording should not be continuous; tell people before you film ([Inside Privacy](https://www.insideprivacy.com/international/ico-releases-concrete-guidance-on-privacy-requirements-when-recording-video-with-drones/)).
  4. A camper's thought bubble: "Why is that drone filming us?"
- **Clearer instruction:** "Map only inside Ade's boundary. Keep 50 m from the campsite. Camera on only over the field. Put a notice at the gate."
- **Real twin:** the ICO's warning about "collateral intrusion"; the CAA privacy tips ([Countryside Alliance](https://www.countryside-alliance.org/news-content-type/drone-guidance)).

**Bonus catch.** The AI reports "Map complete, 95% sure" while one corner is a smear over the uniform crop. Children check the overlap heat-map.

**Debrief question:** "Who else is in your photos? Did they say yes?"

---

#### Level 3: Crop Doctor (Wed)

**Goal:** find where the wheat is really unhealthy, and treat only there.
**Skills:** NDVI colour maps, ground-truthing, the effect of time of day, evidence-based treatment, environmental care.

**Decisions:**

| Decision | Options | Consequences |
|---|---|---|
| When to fly | 8 am (long shadows, dew) / midday / 5 pm (long shadows on the east side) | Midday gives the cleanest map. Morning and evening add shadow stripes that read as "sick". |
| What to do with the map | (a) Spray the whole field; (b) spray the AI's red zones; (c) send the agronomist to check the three worst spots first; (d) do nothing | (a) Wasteful, and the bees leave the hedges. (b) Sprays a shadow and a wet hollow; the real patch (a disease spot in the middle) is partly missed. (c) Takes 5 minutes of game time and finds the true problem. **This is what agronomists do: scout, then treat** ([CareerPilot](https://careerpilot.org.uk/job-sectors/agriculture/job-profile/agronomist)). (d) The disease spreads by Friday; the farm's yield bar drops. |
| Treatment | Blanket spray / spot-spray by drone / remove the infected patch / extra nitrogen | Matching the treatment to the diagnosis (disease or hunger) is the analyst's call, using the ground evidence. |

**AI moment: NDVI misread.**
- **Vague instruction:** "Find the sick crops."
- **Confident wrong guess:** *"Red = sick. Three sick zones found. Spray all three. 84% sure."* Two of the zones are the **hedge's afternoon shadow** and a **wet, dark hollow**.
- **How children catch it:**
  1. **Walk the field** in Street view at child height: the plants in zones 1 and 2 are green and healthy. One is in shade, the other has puddles.
  2. Move the **sun-time slider**: zone 1 moves as the shadow moves. Real crops don't move.
  3. **Compare with last week's map**: the shadow zone wasn't there at noon.

  Evidence: NDVI is affected by soil wetness and shadows ([Environmental Biophysics](https://environmentalbiophysics.org/tag/remote-sensing/)).
- **Clearer instruction:** "Fly at midday. Ignore areas in shadow. Mark the three lowest spots for the agronomist to check before we spray anything."
- **Real twin:** NDVI soil and shadow artefacts; variable-rate prescriptions made from drone maps ([Advexure](https://advexure.com/blogs/news/aerial-multispectral-data-the-foundation-of-variable-rate-technology-in-precision-agriculture)).

**Debrief question:** "A map is a clue, not an answer. How did you check it?"

---

#### Level 4: Turbine Check (Thu)

**Goal:** after last night's thunderstorm, inspect all three blades of Turbine 2 and decide whether it can restart.
**Skills:** wind at height, gusts, limits, the parked-rotor procedure, systematic image coverage, anomaly review, severity grading.

**Decisions:**

| Decision | Options | Consequences |
|---|---|---|
| When to fly | 7 am (calm) / 11 am / 2 pm (gusty) / tomorrow | The wind-at-height chart (from the nacelle anemometer) shows gusts rising through the day. Flying in gusts above the drone's rating triggers "Strong wind warning: return home" and the mission is incomplete ([DJI ratings](https://www.dji.com/ph/support/product/mini-3-pro); vendor <12 m/s, [Oxmaint](https://oxmaint.com/industries/power-plant/wind-turbine-blade-inspection-robots-and-drones-maintenance-with-cmms-2026)). Tomorrow is the storm. |
| Rotor position | Ask the technician to park the rotor in a "Y" / leave it turning slowly / park any position | Inspection requires a **parked rotor** ([HireDronePilot](https://hiredronepilot.uk/services/wind-farm-survey/)). Children phone the technician; the comms role matters. |
| Coverage plan | One side of each blade / both sides, plus the leading edge / the tip only | Only full coverage finds the damage. |
| Verdict | Restart / restart and monitor / keep stopped and repair the tip / call an engineer | Matches severity: a lightning burn on the tip receptor means keep it stopped and call an engineer. |

**AI moment: planning for calm air.**
- **Vague instruction:** "Inspect the turbine this afternoon."
- **Confident wrong guess:** *"Wind 6 m/s. Well within limits. 91% sure."* Its data chip reads "Ground forecast".
- **How children catch it:**
  1. The **wind-at-height lens** shows the forecast at hub height (around 100 m), with gusts of 13 m/s by 2 pm.
  2. The **drone spec card** says its maximum is 10.7 m/s.
  3. The windsock is horizontal; clouds race.
- **Clearer instruction:** "Use the wind at blade height, including gusts. Keep under two-thirds of the drone's limit. Find the calmest slot today."
- **Real twin:**
  - wind ratings and rules of thumb above;
  - flight-time figures measured in still air at 25 °C ([DJI forum](https://forum.dji.com/thread-287130-1-1.html));
  - wind increasing with height, as the turbine itself relies on [general physics; no source needed for designers].

**Bonus catch (anomaly detection).** After the flight the AI reports *"No damage found. 93% sure."* The analyst opens the coverage grid: only the sunlit side of blade C was photographed. A re-shoot finds a burn at the tip. A second flag ("crack, 71%") turns out, at full resolution, to be a gull dropping.

Commercial systems classify cracks, erosion, delamination and lightning damage, and place each finding by blade, side and distance from the root ([Roboflow](https://roboflow.com/ai/wind-turbine-inspection); [Windtech](https://www.windtech-international.com/product-news/boralex-applies-skyvisor-ai-to-enhance-turbine-blade-inspections)). They can only judge what they were shown.

**Debrief question:** "'No damage found' and 'I didn't look' can sound the same. How do you tell?"

---

#### Level 5: Night Search (Fri), the emotional peak

**Goal:** help Kestrel Isle mountain rescue find a walker overdue on the moor. Weather: cold, dusk, rain coming.
**Skills:** search planning, thermal and zoom imagery, false positives versus false negatives, human confirmation, working with emergency services, giving way to helicopters.

**Briefing card (lost-person clues):** "Ellie, 34, experienced walker, red jacket, planned route over Heather Crag, phone dead since 4 pm." Real search managers use lost-person behaviour statistics to decide where to search first ([MIT TR](https://www.technologyreview.com/2024/05/30/1092988/ai-directed-drones-could-help-find-lost-hikers-faster)).

**Decisions:**

| Decision | Options | Consequences |
|---|---|---|
| Search plan | (a) Lawnmower grid over the whole moor; (b) the AI's probability map (paths, stream, below crags); (c) the probability map plus the team's own clue (the dead phone's last mast); (d) wait for daylight | (a) Covers everything, but at this pace takes three batteries, and she is cold. (b) Faster, but the AI's map assumes she stayed on the path. (c) Best, because people combine with the model. (d) A no-go. In Glasgow's simulations, probability-guided paths found the person in 19% of searches against 8% for a lawnmower (MIT TR, above). |
| Sensor and height | Thermal at 120 m / thermal at 60 m / RGB zoom only / thermal, then zoom on flags | High altitude covers more ground but a person is a few pixels. The best workflow is thermal to find, zoom to confirm ([Heliguy deer surveys](https://www.heliguy.com/blogs/posts/drones-for-deer-surveying/) use exactly this two-step). |
| The helicopter arrives | (a) Keep flying, because we're nearly done; (b) land immediately and tell rescue control; (c) climb above it | **Only (b).** "Safely and immediately stop flying unless the emergency services give you permission" ([CAA](https://www.caa.co.uk/drones/drone-code/where-you-can-fly/)). The observer calls it. |

**AI moment: the detector's two kinds of mistake.**
- **Vague instruction:** "Find the person."
- **Confident wrong guess, part one (false positive):** *"PERSON FOUND — 94%."* The heat blob is a **sheep** lying in the heather. Two more blobs, at 89% and 77%, are sheep and a warm rock.
- **Confident wrong guess, part two (false negative):** the AI's confidence for the tile where Ellie lies is *"no person, 96%"*. She is lying down, partly covered by a survival bag, in **red-purple heather**, so her thermal signature is weak. The detector was trained mostly on people standing on grass. SARD exists precisely because datasets lacked people "lying in the grass, crouching behind a stone" ([Sambolek & Ivasic-Kos](https://www.bib.irb.hr/1090529)), and occlusion was unaddressed ([NOMAD](https://ar5iv.labs.arxiv.org/html/2309.09518)).
- **How children catch it:**
  1. The image analyst zooms each flag: **four legs, ears, in a group of five, no rucksack**, so it's a sheep. Thermal shows animals as people-like heat ([arXiv 2309.01904](https://ar5iv.labs.arxiv.org/html/2309.01904)).
  2. Then: "Ellie wears a red jacket." The **colour lens** on the RGB zoom finds a few red pixels in the heather that the person detector ignored. This mirrors Monviso, where "a few distinct red pixels" turned out to be the helmet ([ExplorersWeb](https://explorersweb.com/ai-solves-the-mystery-of-missing-italian-climber/)).
- **Clearer instruction:** "Search the paths, stream and crags first. Flag anything warm *or* bright red. Show me every flag, even unsure ones, and we'll check each with the zoom camera."

  The AI now produces 14 flags at lower confidence ("I'm less sure, but I'm showing you more"). Children sort them: sheep, rock, deer, **Ellie**.
- **The professional point, made explicit:** in real SAR the AI *flags* and humans *decide*. Missing a person is far worse than checking an extra sheep, so you tune the AI to over-flag. The Monviso officials said it was a joint success between the technology and "the skilled human team interpreting the AI's results" (above).
- **Ending.** Ground team icons walk to the grid reference the children read out (a six-figure grid reference, KS2 geography). The helicopter arrives and the children land the drone. Ellie is wrapped in a foil blanket, cold but safe. A thank-you card from mountain rescue.

**Debrief questions:** "Which mistake is worse: calling a sheep a person, or missing a person? So how should we set up the AI?"

**Sensitivity:** nobody is ever in danger on screen beyond "cold and tired". See section 5.

---

#### Level 6: Medicine Run (Sat), the finale

**Goal:** the storm has cancelled the ferry. Fly the medicine box from the island hospital pad to the Little Holm clinic, 4 km across the strait, and get the drone back.
**Skills:** battery and time budgets, headwind and tailwind, reserve rules, ground-risk routing, BVLOS permission (a simplified SORA), landing-site choice.

**Permission step (simplified SORA, 3 minutes).** This flight is beyond line of sight, so it needs permission from the "Sky Authority" (the in-game CAA). Children answer four cards:
1. **Who's underneath?** The village, or the sea?
2. **What else is up there?** The helicopter schedule, the airfield.
3. **What if it breaks?** A parachute, a ditching zone.
4. **Who's watching?** The observer at the halfway pad, and live tracking.

Good answers earn the "Operational Authorisation" stamp. This mirrors UK SORA's ground-risk, air-risk and mitigation logic ([Dronedesk](https://blog.dronedesk.io/uk-sora-explained-for-drone-operators/)) and the CAA's BVLOS route ([sUAS News](https://www.suasnews.com/2025/10/bvlos-is-coming-of-age-what-the-caas-new-roadmap-means-for-uk-drone-pilots-and-companies/)).

**Decisions:**

| Decision | Options | Consequences |
|---|---|---|
| Route | (a) Straight over the village and harbour; (b) over the sea, avoiding houses; (c) via the lighthouse pad for a battery swap; (d) wait for the ferry (tomorrow) | (a) Shortest, but high ground risk, and permission is refused. (b) A little longer, low ground risk; **this is what Royal Mail and Skyports did in Orkney** ([The Engineer](https://www.theengineer.co.uk/content/news/royal-mail-launches-drone-mail-deliveries-in-orkney)). (c) Safest on battery, but adds 6 minutes. (d) The patient waits 18 hours. |
| Battery reserve rule | 0% / 10% / 30% | 0% and 10% mean a gust leaves the drone ditching in the sea, because the return leg was ignored. 30% gets home. |
| Launch time | Now (wind 7 m/s, rising) / in an hour (11 m/s) / after the storm | Now is the only safe window. |
| Landing at the clinic | Car park (people) / school playground (children at Saturday club) / the marked helipad / a field by the clinic | Children apply Level 1's people rules in a new place. |

**AI moment: battery planning that ignores headwind.**
- **Vague instruction:** "Get the medicine there as fast as possible."
- **Confident wrong guess:** *"Straight line, full speed. 4 km at 15 m/s = 4.5 min. Arrive with 22% battery. 90% sure."* Its data chip reads "Wind: not included."
- **How children catch it:**
  1. The **wind-arrow lens** shows a 9 m/s headwind on the way out.
  2. The **battery-time bar** re-runs with wind: ground speed drops, flight time rises, and arrival comes with about 3%. **There is no battery for the return**, even with the tailwind.
  3. A simple calculation card for KS2/KS3 maths: speed through the air, minus wind, gives speed over the sea, so the time is longer.

  Evidence: headwinds raise energy use by up to about 25% in simulation, more in the cold ([preprint](https://www.preprints.org/manuscript/202604.0751)). Rated flight times assume still air ([DJI forum](https://forum.dji.com/thread-287130-1-1.html)).
- **Clearer instruction:** "Plan with today's wind, both ways. Keep 30% in reserve when we land back home. Route over the sea, not the houses. If the numbers don't work, use the lighthouse pad."
- **Ending.** The drone flies through spray and rain as the battery bar ticks down, and the observer at the lighthouse pad calls "Visual!". It lands on the clinic helipad, and a nurse's thumbs-up arrives by radio. Back home with 31%. The island lights come on (Turbine 2 is back online, if Level 4 was done well). Final scene: a sunrise turntable, and the **Pilot's Logbook** opens.

**Debrief question:** "The AI was 90% sure. What did it forget to include?"

---

### 4.5 How the AI is presented: a professional tool, not a friend

- **Name and form.** A **Flight Assistant** panel inside a "ground control station" screen, styled like real planning apps (DJI Pilot, Drone Assist). It is not a cute character; at most it uses the `obj-bot` icon, small. Real professionals work *with software panels*, and the lab should feel like their screen.
- **Every proposal shows three things:**
  - the plan (a ghost route or flags);
  - **"% sure"**;
  - **"Data I used"**: the source and date of each input, for example "Airspace: 2024 map", "Wind: ground forecast" or "Trained on: daytime summer photos".

  The third chip is the transferable professional habit: *ask the AI what it's based on.* It also makes the children's catches fair, because the clue is visible.
- **The AI is genuinely useful.** It plans grids in seconds, scans 2,000 images in a minute and flags red pixels a person would miss. The lab should make children *glad* to have it. In Level 5, after the clearer instruction, the AI finds the faint red pixels that the children then confirm. The message is "a great tool, with a human in charge", not "AI is bad".
- **Its honesty improves.** After clearer instructions it sometimes says it is *less* sure and explains why. This matches Eco Town.
- **Grounding in research on children's trust:** children aged 7–9 conformed to wrong robot answers (74% of their errors matched the robots') where adults did not ([Vollmer et al. 2018, via Smithsonian](https://www.smithsonianmag.com/smart-news/children-are-susceptible-robot-peer-pressure-study-suggests-180970047/)). Younger children trust agents shown to be reliable ([PsyPost](https://www.psypost.org/young-children-are-more-likely-to-trust-information-from-robots-over-humans/)). This supports making the AI's *track record* visible: a running tally of "caught / confirmed" in the logbook.

### 4.6 Scoring, assessment and debrief

**The Pilot's Logbook.** The logbook is the lab's score sheet and take-home, styled like a real flight log. Each level stamps a page with:
- the date, mission, weather and roles;
- the checklist completed (yes or no);
- **AI catches**: what it said, the evidence, the fix;
- decisions and the reason given (one tap from three reason chips);
- the outcome.

**Five flight-deck dials per mission** (in place of Eco Town's flower petals):
- **Safety**: Drone Code kept, checklist done, go/no-go used well;
- **Mission**: the deliverable achieved;
- **Battery and time**: reserve kept, on time;
- **Respect**: privacy, people, wildlife and the client;
- **Teamwork**: calls made, role tasks done.

Every dial has a "good enough" line. Stars reward **catches with evidence** and **good go/no-go calls**, including a correct "no-go". They do not reward speed or flashy flying.

**Pilot skill badges**, one per level:
- Drone Code
- Mapper
- Crop Doctor
- Inspector
- Search Team
- Delivery Pilot

Each badge links to a careers card (section 1.5).

**Assessment that shows learning**, all built into play:
- **Before and after:** an identical three-question "spot the problem" at the start and at the end. Each shows an AI plan with a "% sure" and asks children to name what to check.
- **Transfer task (end of a 90-minute session):** a new scenario (wildlife count near seals, or a wildfire) with no lenses switched on. Children must say which lens they would open first.
- **Facilitator checklist:**
  - Did each child make one standard call?
  - Did the group justify one catch with evidence?
  - Did anyone call a correct "no-go"?

**Debrief (5–8 minutes), with facilitator prompts:**
1. "When was the AI most sure *and* most wrong? Why?" (Answer: old data, the typical case, one word, or what it couldn't see.)
2. "Which job would you like? What does that person check that the AI can't?"
3. "Which mistake is worse in search and rescue, and how did you set up the AI because of that?"
4. "What would you tell a grown-up who just got a drone for their birthday?" (The Drone Code in their own words.)

### 4.7 Session lengths

| Length | Levels |
|---|---|
| 45 min | 1 (short), 5, 6. The arc still lands: first flight, rescue, medicine. |
| 60 min | 1, 2 + 3 merged (map the field, then the crop map), 5, 6 |
| 90 min | All six, plus bonus catches and the transfer task |

---

## 5. Safety, age-appropriateness and the law

### 5.1 Under-13s, Flyer ID and Operator ID: what facilitators must say accurately

Source: the [CAA children and parent guidance](https://www.caa.co.uk/drones/getting-started-with-drones-and-model-aircraft/children-and-parent-guidance/).
- **Under 13:** "Children under 13 must have a Flyer ID, just like any flyer", and "must have their parent or guardian with them when they take the test".
- **Under 12:** "must only fly when supervised by someone aged 16 or over."
- **13–17:** must have a Flyer ID, can take the test alone and can fly unsupervised.
- **Operator ID:** you must be **18** to register. If the child owns the drone, the parent or guardian registers as the operator and labels the drone.
- **Thresholds:** reported as 100 g for a Flyer ID from 2026 [check on caa.co.uk]. Very light indoor flying is outside the airspace rules (secondary source, [T3](https://www.t3.com/active/outdoors/caa-drone-regulation-changes-2026)) [check].

**What this means for the lab:**
- **Never** let children take the real CAA Flyer ID test during a session. Under-13s need a parent present, and personal data would be collected.
- The in-lab badge must say "**Practice** Flyer card. Not a real Flyer ID." Take-home text: "Want to fly for real? Do the free CAA Flyer ID test at home *with a grown-up*. Under 12s fly only with someone aged 16+."
- **No claims of qualification.** Children have *practised* professional tasks; they are not licensed. Real career routes start with Flyer ID, then the A2 CofC, then GVC, then Specific-category roles. FAA Part 107 has a minimum age of 16 ([14 CFR 107.61](https://www.law.cornell.edu/cfr/text/14/107.61)).

### 5.2 Simulation and real flights

- **The core lab is simulation only.** That is safer, needs no airspace checks, works with 30 children, and lets us show night, storms, helicopters and BVLOS legally.
- **Optional real-flight extension (indoor, facilitator-led):**
  - Use sub-100 g classroom drones (Tello is about 80 g ([The Drone Girl](https://www.thedronegirl.com/2018/05/08/dji-tello-drone-review/)); CoDrone EDU is for ages 12+ ([Robolink](https://robolink.com/products/codrone-edu-set-of-10-kits))), with propeller guards, in a sports hall.
  - Follow Robolink's 1:1 to 2:1 ratio guidance.
  - Children run the same checklist and role calls from the game.
  - Indoors avoids outdoor airspace rules, but the venue's own risk assessment still applies [check with the venue's insurer].
- **Do not** take children outdoors to fly as part of the lab unless the venue holds the right permissions and a qualified adult pilot is in command. Even then, children should observe rather than pilot.

### 5.3 Content sensitivity

- **Search and rescue:** the walker is **always found alive**. The real Monviso and Glencoe cases ended in bodies being found. Facilitators should use those stories only with older groups, in the debrief, and only to make the point about AI flags being checked by humans. Use "found safe" stories for younger groups, such as the Wasdale 2026 search ([WMRT](https://www.wmrt.org.uk/incident-tags/drone/)).
- **Medical delivery:** keep it vague: "medicine" and "blood test kit". No graphic illness.
- **Privacy:** model consent and respect. Never show identifiable faces in drone imagery; use voxel people.
- **Motion:** a "Reduce motion" setting, no camera shake, short chase-cam segments. FPV-style views can cause motion sickness [general guidance; see `round-3/04`].
- **Thermal imagery** should use a colour palette that is also readable for colour-blind players. Pair it with shape cues (legs, ears), not colour alone.

### 5.4 Notes for facilitators (one-page card)

1. **Say this at the start:** "Real drone pilots spend more time planning and checking than flying. Today you're a drone *team*."
2. **Hand out role cards and practise the calls** ("Go", "No-go", "Aircraft!", "Stop") before Level 1.
3. **When the AI shows "% sure", ask:** "What data did it use? What could it be missing?" Point at the "Data I used" chip.
4. **Praise a good no-go** as loudly as a good flight.
5. **Don't rescue the group from the AI's mistake.** Ask "What lens could check that?"
6. **Legal facts to state correctly:**
   - 120 m maximum;
   - 50 m from people;
   - never over crowds;
   - stay out of airport zones;
   - stop for emergency services;
   - Flyer ID with a grown-up if under 13;
   - Operator ID at 18.
7. **If a child says they fly a drone at home,** ask whether they have a Flyer ID, and give them the take-home card.
8. **Know the real stories in brief**, for the debrief: Monviso (red pixels), Orkney mail (routed over the sea), NHS blood samples (2 minutes against 30), Zipline (Rwanda, 20 minutes).

---

## 6. Key design lessons

1. **Make judgement the core skill, not joystick skill.** Real delivery pilots have no joysticks and real survey flights are automated, so map-based planning and go/no-go calls are authentic, not a simplification ([Dallas Innovates](https://dallasinnovates.com/new-wing-remote-operations-center-in-coppell-oversees-dfw-drone-deliveries/)). Keep hand-flying short, assisted and celebratory, like DRL's staged onboarding.
2. **Make checklists and roles into rituals.** Challenge-and-response checklists, standard calls and a pilot in command with real authority give 3–5 children something to *do* and *say* in every level, and they transfer directly to aviation, healthcare and engineering.
3. **Give every AI mistake a documented real twin, and show the source in the debrief.** Examples: CAA "not always accurate", DJI geofencing removed, cables invisible to sensors, NDVI shadows, sheep false positives, headwind drain. This answers the client's "real world training" brief honestly.
4. **Add a "Data I used" chip next to "% sure".** The professional habit is to ask *what the tool is based on*, not just how confident it is. It makes catches fair and teachable.
5. **Teach both kinds of error, and that the cost decides the setting.** Level 5's sheep (false positive) against the missed walker (false negative) is the deepest AI-literacy moment in the lab. Children decide to make the AI over-flag because a missed person costs more. That is a real design decision in SAR AI.
6. **Let the weather tell the story and set the difficulty.** A storm building through the week makes wind, gusts, cold and battery visible, raises the stakes towards the finale, and gives the trailer its arc.
7. **Show the AI as a great tool with a human in charge.** It scans 2,600 photos and finds the red pixels, and a person checks and decides. Avoid "AI bad" messaging; the Monviso quote is the lab's thesis.
8. **Be scrupulous about the law and about age.** Give practice badges, never real IDs. Send children home with the parent-with-under-13 Flyer ID message. Simulation is the core, and indoor sub-100 g drones are only an extension.

---

## 7. Fit with DeltaOps assets and other labs

- **Reusable brochure assets:** `obj-turbine`, `obj-pin` (waypoints and finds), `obj-shield` (safety badge), `obj-chest` (medicine box), `obj-bot` (small AI icon), `island-island` and the lighthouse island.
- **Overlap with sibling labs:**
  - "Land a Rocket" will also cover wind, fuel and reserve budgets. Keep this lab's battery maths to the headwind round trip.
  - "Train a Robot" will cover training data. Here, mention it only as "trained on summer photos" in the data chip.
- **Links to `round-3/09` (ML labelling):** the Level 5 flag-sorting is a labelling task. Children's accepted and rejected flags could be framed as "teaching the detector for next time".

---

## 8. Source list (main)

**Regulators and law**
- CAA: [children and parent guidance](https://www.caa.co.uk/drones/getting-started-with-drones-and-model-aircraft/children-and-parent-guidance/) · [Flyer ID test](https://www.caa.co.uk/drones/getting-started-with-drones-and-model-aircraft/prepare-for-the-flyer-id-theory-test/) · [Drone Code: where you can fly](https://www.caa.co.uk/drones/drone-code/where-you-can-fly/) · [A2 CofC](https://caa.co.uk/drones/remote-pilot-qualifications/a2-certificate-of-competence-a2-cofc) · [Specific category](https://www.caa.co.uk/drones/specific-category/specific-category-overview/) · [PDRA01](https://www.caa.co.uk/drones/specific-category/pdra01-operational-authorisation/pdra01-overview/) · [UK SORA](https://www.caa.co.uk/drones/regulations-consultations-and-policy-programmes/policy-programmes/specific-operations-risk-assessment-sora) · [Airspace alerting apps](https://caa.co.uk/drones/airspace-and-restrictions/airspace-alerting-apps)
- FAA: [14 CFR 107.61](https://www.law.cornell.edu/cfr/text/14/107.61) · [Part 107 overview](https://www.faa.gov/newsroom/small-unmanned-aircraft-systems-uas-regulations-part-107)
- DfE: [Geography programmes of study](https://www.gov.uk/government/publications/national-curriculum-in-england-geography-programmes-of-study/national-curriculum-in-england-geography-programmes-of-study) · NGSS: [MS Engineering Design](https://nextgenscience.org/topic-arrangement/msengineering-design)

**Missions**
- SAR: [ExplorersWeb: Monviso](https://explorersweb.com/ai-solves-the-mystery-of-missing-italian-climber/) · [MIT TR: Glasgow](https://www.technologyreview.com/2024/05/30/1092988/ai-directed-drones-could-help-find-lost-hikers-faster) · [The Herdwick: LDSAMRA](https://theherdwick.com/2023/11/01/lake-district-mountain-rescue-developed-drone-tech-assists-in-scottish-highlands-search/) · [RICS](https://ww3.rics.org/uk/en/journals/land-journal/drone-use-mountain-rescue.html) · [SARD](https://www.bib.irb.hr/1090529) · [NOMAD](https://ar5iv.labs.arxiv.org/html/2309.09518)
- Delivery: [GSTT](https://www.guysandstthomas.nhs.uk/news/nhs-blood-samples-be-delivered-drones-london-first) · [Wing](https://wing.com/news/nhs-blood-delivery) · [ITU: Zipline](https://www.itu.int/hub/2020/04/how-medical-delivery-drones-are-improving-lives-in-rwanda/) · [The Engineer: Orkney](https://www.theengineer.co.uk/content/news/royal-mail-launches-drone-mail-deliveries-in-orkney)
- Agriculture and mapping: [Pix4D](https://support.pix4d.com/hc/best-practices-for-image-acquisition-and-photogrammetry) · [Coptrz agritech](https://coptrz.com/blog/agritech-drones-vegetation-indices-and-aerial-imagery/) · [Environmental Biophysics](https://environmentalbiophysics.org/tag/remote-sensing/)
- Inspection, wildlife and fire: [Windtech: SkyVisor](https://www.windtech-international.com/product-news/boralex-applies-skyvisor-ai-to-enhance-turbine-blade-inspections) · [Heliguy: deer](https://www.heliguy.com/blogs/posts/drones-for-deer-surveying/) · [FLS: Glenmore](https://forestryandland.gov.scot/news/how-thermal-drones-helped-us-tackle-the-glenmore-wildfire)

**Products and education**
- [DroneDJ: simulators](https://dronedj.com/2020/07/27/learning-to-fly-fpv-drones-flying-in-a-simulator-part-1/) · [DJI Flight Simulator](https://www.dji.com/enterprise/news/detail/dji-expands-drone-ecosystem-at-airworks-2018) · [AirSim](https://microsoft.github.io/AirSim/) · [Robolink](https://robolink.com/products/codrone-edu-set-of-10-kits) · [CASA](https://shop.casa.gov.au/collections/school-resources) · [DRL Academy](https://dronedj.com/2020/03/19/drone-racing-league-launches-drl-academy/)

---

## 9. Still unverified (check before build or print)

1. The 2026 UK thresholds (Flyer ID from 100 g; Operator ID at 100 g with a camera or 250 g without), the class marks and Remote ID. Taken from Heliguy, DJI, T3 and TechRadar, not the CAA's own page. The CAA Drone Code PDF link for March 2026 returned 404.
2. The renaming of the A1/A2/A3 sub-categories in 2026 (one study site only).
3. The Part 107 knowledge test format (60 questions, 70%) and the 400 ft and 100 mph limits. The format came from secondary sources; the limits are from memory and were not confirmed from the eCFR text.
4. Cold-weather flight-time reduction percentages (third-party estimates only).
5. The exact wording of KS3 geography on GIS and aerial photographs, and the NGSS codes 3-ESS2-1 and MS-LS1, which are from memory.
6. Whether Tello EDU is discontinued (one secondary source), and CoDrone EDU's weight (not found).
7. Wing's figure of "up to 15 drones per supervising pilot" (Smithsonian page, 2022).
8. Whether the GSTT/Apian/Wing trial continued past spring 2025, and whether Royal Mail's Orkney route became permanent.
9. Vendor accuracy claims for turbine AI and NDVI ROI. Not used in the design; do not quote them to children.
10. No primary UK study of thermal false positives for sheep in mountain rescue was found. The sheep error is grounded in general findings (arXiv 2309.01904 and practitioner notes), not a UK-specific measurement.
11. No UK CAA classroom resource pack was found. If one exists, Level 1 should link to it.
