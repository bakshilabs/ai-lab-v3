# Handoff: re-run the DeltaOps game research with Exa deep research

Read this first if you are picking up the research in a new session.

## Where things stand (4 November 2026)

- `deltaopslearning-brochure/`: the 12-page DeltaOps Learning partner guide (HTML/CSS source, images, PDFs). The lab screenshots in `img/` show the voxel "AI labs" this research is about.
- `research/round-1/`: ten first-pass reports (about 1,500 words each), from ordinary web search.
- `research/round-2/`: deeper reports on the same topics. **Done:** 01, 03–10. **Missing:** 02 (learning evidence); its agent was still running when the session was saved, so use the round-1 version.
- `research/context.md`: what we found reviewing the brochure images (content, style, issues). Give it to every agent.

### Known weaknesses in round 2 (fix these first)

- The shared web-search budget ran out in several agents. Unverified claims are marked `[TK]`, "unverified", "[est.]" or listed under "Gaps" at the end of each report. 05-replayability has 49 `[TK]` claims.
- Paywalled GDC talks (Reigns, Into the Breach, Keep Talking and Nobody Explodes, Outer Wilds, Jackbox, Stålberg, Ken Wong) were cited from write-ups, not the talks.
- No published Chromebook benchmarks for three.js voxel scenes were found.
- Londinium historical facts in 03 need a specialist check.
- Minecraft IP points in 10 are not legal advice.

## How to run round 3

1. **Check the Exa connector is loaded.** Run `ToolSearch` with the query `exa` (and `+exa`). Connectors are read when a session starts. If no Exa tools appear, tell the user to check https://claude.ai/customize/connectors and start a new session; do not fall back silently. If the user says to go ahead anyway, use WebSearch and say so in each report.
2. **Launch ten subagents in parallel**, one per topic below, in a single message (`Agent` tool, `general-purpose`, background). Use the shared context block plus the topic brief.
3. **Each agent:** reads `research/context.md`, its round-1 and round-2 report (if any), then uses the Exa deep research tools as the main source (web search only to fill gaps). Priority order: (a) verify or remove every `[TK]`, unverified and `[est.]` claim, (b) close the listed gaps, (c) extend. Keep the deliverables from round 2 and improve them.
4. **Output:** each agent writes its full report to `research/round-3/NN-topic.md` (same numbering), with a URL for every factual claim, a "Changes from round 2" section at the top, and a "Still unverified" section at the end. It replies with a 250-word summary only.
5. **Save as they arrive:** commit and push each report as it lands, on the branch the session is told to use.
6. **Synthesis (after all ten):** write `research/synthesis.md`: the 20 most important recommendations across all reports, ranked, each with its sources; a shortlist of new lab concepts (Robo-Taxi Island, Pit Crew Lab, Island Park Tycoon, Build-a-Habitat Grid, Camera Trap Detectives and others) scored on learning value, fit with the venues and build effort; and the changes to make to the four existing labs. Offer to publish it as a page for the team.

## Shared context block (paste into every agent prompt)

> DeltaOps Learning makes short (30–60 minute), staff-facilitated, browser-based "AI labs" for children aged about 7–13 at nature centres, museums, STEM clubs and holiday camps. Each lab is a small floating voxel-diorama island (flat-colour blocks, soft upper-left light, tiny blocky characters) with a rounded app-style UI. Format: 6 stages × 3 instruction cards, one deliberately vague; a scripted "AI helper" shows its guess and a "% sure"; the world visibly changes (meters such as Visitors/Wildlife, Accuracy/Curiosity, Time/Energy); a facilitator card asks a discussion question; children retry with a clearer card. 3^6 = 729 routes, all pre-written. No typing, no live AI model, no child accounts. Each lab ends with an artefact (habitat plan, expedition map, traveller's diary, rover spec). Existing labs: Eco AI Explorer (pond, nature centre), AI Inventor Lab (Mars rover, STEM club), Mission AI (lighthouse, holiday camp), AI Time Traveller (Roman Londinium, museum), plus a library of Eco Town (energy), River Town (water), Grow Lab (food), Moon Base (space), Kick Lab (sport), Beat Lab (music). Lessons: AI follows instructions literally, makes assumptions, can be confidently wrong; clearer instructions and checking evidence lead to better results. UK-based; British English; no prices or named customers.

## Topic briefs

**01 Successful builders.** Which world-building, sandbox, city-builder, cosy-builder and diorama games succeeded (2009–2026) and why. Cover Minecraft, Townscaper, Tiny Glade, Islanders, Dorfromantik, Animal Crossing NH, Stardew Valley, Cities: Skylines, SimCity, Terra Nil, Frostpunk, Roblox, Crossy Road, Monument Valley, Mini Metro, Timberborn, Unpacking, Viva Piñata, LEGO Builder's Journey and kids' builders. Per game: success figures (official), core loop, first five minutes, world reaction, feedback timing, goal framing, audience age, credited design decisions (primary designer sources). Deliverables: comparison matrix; ranked list of the 15 most transferable mechanics with evidence.

**02 Learning evidence.** What makes educational world-builders and AI-literacy activities effective for learning. Full texts of Long & Magerko 2020, Van Brummelen 2023, Druga & Ko 2021, Sinha & Kapur 2021 (grade 2–5 reversal), Habgood & Ainsworth 2011, Clark et al. 2016, Wouters 2013, Jant 2014, Crookall. UK context: DfE AI guidance, KS2/KS3 computing, Raspberry Pi Foundation Experience AI and its evaluations, UNESCO 2024 AI competency framework, OECD/EC AI literacy framework. Children's trust in AI confidence displays. Museum and camp learning evidence; validated child AI-literacy scales. Deliverables: map from each lab mechanic to competency to evidence; evaluation design (pre/post, delayed, observation rubric, 3-item exit check); facilitator script template.

**03 Narrative and choice.** How games structure progression, narrate, and design choices and consequences, especially small card or choice games and builders. Reigns, 80 Days, Sorcery!, Heaven's Vault, Disco Elysium, Hades, Stanley Parable, Into the Breach, Celeste, Outer Wilds, Papers Please, Frostpunk, Terra Nil, Jackbox, Keep Talking, escape rooms, Toca, PBS Kids/Sesame design guides; branch-and-bottleneck, storylets, salience. Get the primary GDC talks. Deliverables: consequence taxonomy; AI helper and facilitator voice guide for ages 7–13; full 6-stage arcs for all four existing labs (verify Londinium history with academic or museum sources).

**04 Construction and scripting.** How builders and narrative games are built and scripted, and the best approach for browser voxel labs. Townscaper/WFC, Tiny Glade, Monument Valley, Crossy Road, Teardown; greedy meshing, baked AO, instancing; three.js WebGL/WebGPU on Chromebooks (find real benchmarks); ink/inkjs, Yarn Spinner, Twine, articy, YAML + linter, spreadsheet pipelines; automated narrative testing; accessibility (WCAG 2.2, Xbox guidelines, read-aloud); offline service workers. Deliverables: reference architecture (lab-pack layout, stage JSON Schema, state reducer, 729-route test harness, CI, caching plan, performance budget).

**05 Replayability.** Why children replay games like Geometry Dash dozens of times. Geometry Dash (RobTop primary sources), Super Meat Boy, Celeste, Trackmania, Angry Birds, Plants vs Zombies, Crossy Road, Wordle, Kahoot/Blooket/Gimkit, Roblox obbies, Fall Guys, Duolingo; research on children 7–13 (frustration, effort praise, cooperative vs competitive play, leaderboards and low performers); ICO Children's Code Standards 5 and 13 verbatim. Verify all 49 `[TK]` claims from round 2. Deliverables: replay mechanics catalogue with fit scores; designs for stars-for-clarity, assumption sticker book, 729-route map; take-home island code with no personal data.

**06 Kid creators.** Bloxels and similar tools where children build their own game or world: Bloxels, Mario Maker, Labo, Game Builder Garage, LittleBigPlanet, Dreams, Kodu, Scratch, Roblox Studio, Minecraft Education build challenges, Osmo, Cubetto, KIBO, Toca, Bitsy, MakeCode; tangible vs screen research (Horn, Marshall, Antle). Deliverables: Build-a-Habitat Grid spec for every library lab (colour grammar, scripted classifier rules, planned misreads, printable mat, tap-copy UI); "write your own card" picture-tile variant.

**07 AI racing.** Racing games where AI is opponent, coach, ghost or trainee: Forza Drivatar, GT Sophy, Trackmania and Yosh's AI, Mario Kart assists, AWS DeepRacer, Rocket League bots, Hot Wheels Unleashed, Mario Kart Live, Anki Overdrive; reward hacking (CoastRunners, DeepMind specification-gaming list); research on teaching reward design to under-13s. Deliverables: full Pit Crew Lab spec; 10 reward-hacking vignettes for other labs (verify the ones flagged unverified).

**08 Tycoon.** RollerCoaster Tycoon, Zoo Tycoon, Theme Park/Hospital, Planet Coaster/Zoo, Two Point, Jurassic World Evolution, Parkitect, Prison Architect, Roblox tycoons; failures (RCT World, RCT4 Mobile, FarmVille timers). Sawyer primary interviews; RCT guest thoughts verbatim from OpenRCT2 language files; systems-thinking simulation research (Sterman, Fishbanks, En-ROADS). Deliverables: full Island Park Tycoon: The Manager Bot spec (stages, AI manager lines, meters, ~40 thought bubbles, star thresholds, Park Charter); which library labs could take a tycoon layer.

**09 ML labelling.** Activities where children train or label ML data, especially self-driving and object identification: AI for Oceans, Quick Draw, Teachable Machine, Cognimates, Moral Machine, DeepRacer, Duckietown, Donkey Car, Machine Learning for Kids, Experience AI, Zooniverse, Snapshot Serengeti, AI4Mars, museum exhibits; children's understanding of confidence and error types. Deliverables: full Robo-Taxi Island spec; three venue-themed perception labs (camera traps, museum objects, rover terrain).

**10 Minecraft.** Minecraft quizzes, Minecraft Education (AI Foundations, Hour of AI: The First Night, scale and evaluations), what children love about Minecraft, Minecraft Experience/Exhibition, museum partnerships; Mojang Usage Guidelines and Minecraft Education partner rules quoted exactly; cases against Minecraft-like products. Deliverables: "Sure or Not Sure?" quiz/warm-up/plenary pack for all four labs (10 questions each); derivative-risk style checklist; partner-route decision memo. Flag that IP points need a lawyer.
