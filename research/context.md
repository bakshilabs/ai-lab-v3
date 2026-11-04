# Context: what the brochure images show

Findings from reviewing `deltaopslearning-brochure/img/` (4 November 2026). Give this to every research agent.

## Content of the lab screens

All game screens tell one story: a child gives an AI helper an instruction, the helper guesses (with "% sure"), the world changes, a facilitator card asks a question, the child tries a clearer card.

- **Eco AI Explorer** (nature centre; `story-1` to `story-5`, `game-eco`): "Design a pond that wildlife and visitors can share". Card A "Make it nice for visitors" → helper: "'Nice' sounds like neat. Cutting the reeds, adding a gravel path and a deck" (64% sure) → "The ducks have left", Visitors 88, Wildlife 41, species 2/8 → facilitator: "You asked for 'nice'. What did the AI think you meant?" → card B "Add a boardwalk and keep the reeds wild" → "Habitat plan saved", Wildlife 90, Visitors 82, species 7/8.
- **AI Inventor Lab** (STEM club; `game-stem`): "Drive the rover to the crater and send back a photo"; a block program ("When mission starts → drive, wide wheels, under 5 km/h"); Mars; "Level 5 unlocked". The only screen with no AI helper, no wrong guess and no facilitator card.
- **Mission AI** (holiday camp; `game-camp`, `game-camp-ask`): "Get your team to the lighthouse before sunset". Helper: "Quickest means shortest, so I sent you straight over the ridge" (70% sure); Energy 30; facilitator: "Shortest is not always quickest. What else matters?"; team leaderboard (Otters, Foxes, Hawks, Badgers); end "Expedition map saved".
- **AI Time Traveller** (museum; `game-museum`, `game-museum-ask`): "Plan a day in Londinium for a traveller arriving by boat". Helper: "Romans ate feasts, so I planned peacock, dormice and oysters" (66% sure); Accuracy 34; facilitator: "Who in Londinium ate like this? And who didn't?"; evidence slots jar, bread, oysters, coin; end "Diary page saved with three pieces of evidence".
- **Islands** (`island-*`): eco town with turbines and solar (cover), reed pond, Mars base, lighthouse island, Roman town. `island-town-dusk` is unused.
- **Objects** (`obj-*`): library icons (turbine, drop, sprout, rocket, ball, note), robot mascot, shield, signpost, map pin, chest.
- **Team**: Arpan (family photo with two children), Oliver (arms-crossed headshot).

## Visual style

- Floating diorama islands: grass top, brown soil band, grey stone, jagged stepped edges.
- Flat colour per voxel with slight value jitter; no textures. Chunky trees, single-voxel flowers, translucent blocky water.
- High three-quarter camera (30–40° down, near-isometric). Soft warm daylight from the upper left, soft shadows and AO. Time of day used for mood (dusk camp, violet Mars). Plain gradient skies.
- Each world has its own palette: pond greens; Roman terracotta and cream; Mars rust; camp turquoise and red-white; eco town greens, slate, navy solar panels.
- Tiny blocky people with simple eyes and varied skin tones; the world is the hero, not the avatar. One or two story props per scene; consequences appear physically.
- UI: rounded white pills and cards with soft shadows; bold rounded sans (Inter-style). Fixed layout: lab badge and task top left, stars and XP top right, AI helper card upper right, facilitator card lower right, choices or meters at the bottom.
- Role colours: AI helper = dark navy card, robot icon, mint "GUESS" tag, confidence bar. Facilitator = warm yellow or teal card with a question. Choices = white A/B/C cards. Outcomes = gold stars, dark "saved" pill, red ✕ alerts, stamps.

## Issues noticed

- Space lab is "Moon Base" in the library but the STEM example is Mars ("test it on sand").
- AI Inventor Lab breaks the system: no helper, no mistake, reads as a coding game.
- "% sure" meters and "GUESS" tags can imply a live model (the brochure says responses are scripted). Research (round 2, 02 and 09) also warns that children read high confidence as correctness.
- `obj-ball` reads poorly as a football (render artefact on its lower left edge).
- `story-5` and `game-eco` show the same moment on consecutive pages.
- The family photo shows identifiable children in a safeguarding-focused brochure; confirm consent.
- Small characters vanish in dark scenes (dusk camp, Mars) when printed.
- The visual style sits close to well-known block-building games; keep the distinct features (flat untextured blocks, soft model lighting, floating dioramas, polished UI) and avoid Minecraft-distinctive elements (see research 10).
