# Eco Town: game design

Eco Town is a six-level world-building AI lab for children aged 8–14 in schools, clubs and museums. Players start with an empty floating island and build a whole sustainable community. They choose:

- where to build;
- how people move;
- what homes are made of;
- what is farmed;
- how water, power and waste work;
- what the town heart becomes.

Then they watch residents move in and live in the town they made. Energy is one part of the game, not the whole of it.

This design brings together three research reports:

- `research/eco-town-world-building.md` covers the levels, decisions and scoring.
- `research/eco-town-living-town.md` covers residents, routines and feedback.
- `research/eco-town-cameras-acts.md` covers camera views and the acts within each level.

The trailer is `games/trailers/ecotown/` (`out/ecotown.mp4`).

## Core loop for each level

Each level runs through seven acts:

| Act | Camera | What happens |
| --- | --- | --- |
| 1. Brief | Cinematic | A banner shows the level, its goal and progress dots (1–6). |
| 2. Plan | Sky, with ghost blocks | Children give the AI helper an instruction card. The AI shows its plan as see-through "ghost blocks" with a "% sure" score. |
| 3. Check | A lens, Street view or Inside view | The plan's hidden flaw shows up from a different viewpoint. The AI reasons from the sky, so ground level is where children check. |
| 4. Fix | Sky | Children pick a clearer card or give the AI better data. Then they **paint and place** the build on the map, choosing from a palette of real options. |
| 5. Move in | Follow one resident | New families arrive by the transport the town favours. |
| 6. Live | Street view, then Inside view | Residents use what was built. A street scene and an interior suit the choices made. |
| 7. Celebrate | Sky turntable | "Foundations set" locks the level's choices, and the town flower updates. |

Choices can be undone within a level and lock at its end. This way early decisions shape later ones, and very different towns emerge.

## The six levels

| Level | Real decisions (palette) | The AI's confident mistake | How children catch it | Clearer card |
| --- | --- | --- | --- | --- |
| 1. Read the land | River meadow, sunny slope, wood edge, coast. Which habitats to protect. Town shape. | "Find the best land" becomes the flattest land, which is the floodplain (82% sure). | The flood lens shows winter flooding. | "Dry, sunny land. Keep the meadow wild." |
| 2. Getting around | Car roads, cycle grid, tram line, car-free core. School route. River crossing. | "Easy for everyone to get to school" becomes a wide road and a drop-off car park (77%). | Street view at 8:45 am: children can't cross. | "Safe walking and cycling routes. Cars stay at the edge." |
| 3. Homes | Timber, straw bale, rammed earth, concrete, reclaimed materials, green roofs. Density, from detached to cohousing. | "Build strong homes" becomes concrete and steel everywhere (85%). | The carbon lens shows a carbon cloud 3× over the limit. Inside view: the timber home is 21 °C with the heating off. | "Warm, low-carbon homes from local timber and straw." |
| 4. Food | Big fields, mixed farm, orchard and food forest, vertical farm, allotments, beehives, hedges. | "Grow as much food as possible" ploughs every field and the hedges (79%). | The nature lens: the bees and deer leave. | "Enough food, and keep the hedges for the bees." |
| 5. Water, power, waste | Solar roofs, wind, battery, heat pumps, rain gardens, wetland, repair café, compost. | It plans power for an average day: solar roofs only (90%). | The winter test: blackout on a still winter night. | "Enough power for a still winter night. Store the sunshine." |
| 6. Complete the town | Town heart, market square, school, nature links (hedgerows, green bridge), festival, a three-promise charter. | "Put the school in the middle" becomes the island's exact centre, which is in the wetland (81%). | The walking-time lens: 25 minutes from homes. | "School within a 10-minute walk of every home." |

The AI's mistakes follow four rules that children learn to predict:

- it optimises one word;
- it assumes the typical case;
- it misses data;
- it reads instructions literally.

After a clearer instruction, the AI sometimes says it is less sure. This is honest: it now knows what it doesn't know.

## The living town

**Moving in**
- Families arrive by the transport the street choices favour: cargo bike, ferry or van.
- They move in overnight: boxes, then lights, then a wave.

**Daily routines**
- Every resident has a fixed home, daytime place and leisure place.
- A full day lasts 60–90 seconds.

**Crowds**
- People gather where a decision matters: the school gate, the bike rack, the market, the water tap.

**Feedback**
- Thought bubbles open with an icon and use at most eight words, read aloud. Good and bad comments are mixed.
- No more than two bubbles show at once.

**Following one family**
- Children follow one named family, with a portrait and a three-line diary.

**Wildlife**
- Wildlife shows the state of nature: deer and bees leave when habitats are destroyed and come back when they are restored.

**Level 6: "Watch your town live"**
- No decisions, just a day in the town: dawn, the school run, market day, the park, an evening festival, night.
- It ends with the family diary and a town report to take home.

**Consequences stay gentle**
- People queue, shiver or move away.
- Nobody is harmed, and there is no fail screen.

The AI also summarises residents' feedback, and gets that wrong too. For example: "Residents want more car parks", 82% sure, because it counted only drivers. Children check by tapping and tallying residents at the school gate.

## Camera grammar

**Three views plus one overlay**
- **Sky:** the brochure diorama. Orbit and pinch to zoom, with the tilt limited to 25–60°.
- **Street:** a guided walk at child eye height, on rails with tap points.
- **Inside:** dollhouse cutaway rooms: the timber living room, the straw-bale classroom, the market hall, the community kitchen, the repair café and the community hall.
- **Lens:** a data overlay that opens by itself when the AI makes a claim.

**Moving between views**
- A swoop from Sky to Street takes 1.2–1.8 seconds.
- The roof lifts to go Inside.
- One "Back to the island" button is always in the same place.

**For comfort and orientation**
- A Reduce motion setting.
- No camera shake.
- A mini-map showing "you are here".

## Scoring: the town flower

The town flower has seven petals:

- Homes
- Food
- Nature
- Health
- Energy
- Community
- Carbon

Each petal has an "enough" line, and Carbon also has a ceiling it must stay under.

A town is complete when:

- every petal reaches "enough";
- carbon stays under its ceiling;
- everyone can reach daily needs within a 15-minute walk;
- the charter's three promises are met.

The two strongest petals name the town, for example Cycle Town, Orchard Valley, Wild Garden Village or Market Town. So very different towns can all win.

Stars reward spotting and fixing the AI's mistakes, not how the town looks.

## Session lengths

There are 45-, 60- and 90-minute versions, so every group finishes a town. In the shorter versions, Levels 4 and 5 merge.
