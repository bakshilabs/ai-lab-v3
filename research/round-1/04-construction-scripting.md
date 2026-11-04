# How world-building and narrative games are built and scripted, with a recommended approach for DeltaOps Learning's voxel labs

**Note on sources:** I used web search plus a few page fetches. Where I only saw a secondary summary, or a claim could not be confirmed, I say so. I could not confirm that Crossy Road was made in MagicaVoxel. I did not read Teardown's primary blog posts (only press coverage of them). I did not research Mario Maker, Dreams or Roblox templates, so they appear below only as general analogies. I did not inspect the client's js/game/ code: the working repo contains only the brochure.

## 1. Building voxel and diorama worlds

**Hand-made pieces placed by rules.** Townscaper uses a fixed hex grid that is split into quads, split again and then relaxed into an irregular grid. Buildings are made from artist-authored *corner* modules, placed in a marching-cubes style. Wave Function Collapse (WFC) chooses modules by adjacency whenever a block changes, and a separate pass adds decoration afterwards. Modules have priorities ("recipe" pieces such as gardens need an enclosed space). The rules are designed so that large shapes are predictable and small details vary. A re-skin would need about 500 tiles; Bad North uses over 300 ([Game Developer](https://www.gamedeveloper.com/game-platforms/how-townscaper-works-a-story-four-games-in-the-making)). Stålberg's EPC2018 talk covers WFC on Bad North's island dioramas, including the tools and pipeline ([80.lv](https://80.lv/articles/using-wave-function-collapse-algorithm-for-dioramas/?amp=1)).

**Tiny Glade** began as a weekend procedural wall generator, built on a modified Bevy. Its developers describe procedural art as "detailed rules that guide the system". Watching players misuse pieces led to new features such as bridges ([80.lv](https://80.lv/articles/exclusive-tiny-glade-developers-discuss-bevy-proceduralism-publishers-cozy-games/)).

**Monument Valley** was blocked out with plain Unity cubes, then meshed with a baked lightmap. Each level was treated as "a single striking design object" ([Game Developer](https://gamedeveloper.com/design/designing-the-surprise-mobile-game-hit-i-monument-valley-i-), [MCV](https://www.mcvuk.com/development/unity-focus-monument-valley)).

**Teardown** is the opposite extreme: its lighting is fully ray-traced over several voxel acceleration structures ([PCGH](https://www.pcgameshardware.de/Teardown-Spiel-73677/Specials/PC-Game-Test-Benchmark-Voxel-Dynamic-Destruction-1394545/2/), [TechRadar](https://www.techradar.com/gaming/consoles-pc/ray-tracing-is-so-crucial-to-teardown-that-the-world-goes-black-if-you-turn-it-off)). That approach does not fit Chromebooks.

**Authoring tools.** MagicaVoxel is the most popular free voxel editor ([voxelfans](https://voxelfanscom.nuxt.dev/magicaVoxel)). Crossy Road made the voxel style popular ([Laughing Squid](https://laughingsquid.com/crossy-road-an-endless-hopper-video-game-featuring-voxel-artwork/)).

**Meshing.** The standard reference for greedy meshing is Lysenko's "Meshing in a block world" (0fps, 2012). His `ao-mesher` package bakes per-vertex ambient occlusion ([npm](https://npmjs.com/package/ao-mesher)). One catch: faces must only be merged when their AO values match too, or the shading breaks ([jME port discussion](https://hub.jmonkeyengine.org/t/greedy-meshing-for-complex-voxel-data/28017)).

**Repeated props.** InstancedMesh suits many copies of one geometry. BatchedMesh suits mixed props and culls each object separately ([three.js forum](https://discourse.threejs.org/t/how-to-choose-between-instancedmesh-and-batchedmesh/81221)).

**Low-end laptops.** Practical guidance (from blogs, not official benchmarks):
- Cap the device pixel ratio at 1–1.5.
- Aim for fewer than about 100–150 draw calls.
- Render only when something has changed.
- Measure with `renderer.info.render.calls`.

([hontran.dev](https://www.hontran.dev/blog/three-js-performance-optimization), [chrome-tips](https://chrome-tips.pages.dev/chrome-three-js-3d-performance-optimization))

**What this means for the soft "diorama" look on Chromebooks:** bake AO into vertex colours, use a hemisphere light plus one small shadow map (or a baked blob shadow), and add no post-processing.

## 2. Narrative and branching tools

- **ink (inkle):** Writers work in plain text. The `inkjs` runtime runs in browsers, is maintained by the community and is usually one major version behind ink ([inkle/ink](https://github.com/inkle/ink), [inkjs](https://www.github.com/inkle/inkjs)). Jon Ingold's GDC talk on Heaven's Vault describes building automated testing into the writing workflow ([GDC Vault](https://gdcvault.com/play/1025149/-Heaven-s-Vault-Creating)).
- **Testing ink stories:**
  - Ian Thomas's tool runs thousands of random playthroughs and outputs a CSV of how often each line is reached. Lines that are never reached point to logic errors ([Medium](https://wildwinter.medium.com/ink-testing-tool-f79e958db017)).
  - `inkcheck` explores branches within set limits and gives exact repro paths for problems it finds ([glama](https://glama.ai/mcp/servers/chaoz23/inkcheck)).
- **Yarn Spinner 3:** Adds storylets through node groups with `when:` conditions. By default it picks the eligible node with the most specific conditions ([docs](https://docs.yarnspinner.dev/next/3-new-in-v3/language-features/node-groups), [saliency](https://docs.yarnspinner.dev/next/write-yarn-scripts/syntax-basics/node-groups/saliency)). It officially supports Unity, Godot and Unreal. Web runtimes are community projects and early-stage ([yarn-spinner-runner-ts](https://app.unpkg.com/yarn-spinner-runner-ts@0.1.5-c/files/README.md)).
- **articy:draft:** Exports JSON using rule sets. `articy-js` runs it in JavaScript, and localisation is exported as .xlsx files ([articy JSON export](https://articy.com/help/adx/Exports_JSON.html), [articy-js](https://scenarioworld.github.io/articy-js)).
- **Storylets and quality-based narrative (QBN):** Emily Short's three-part model for each piece of content is prerequisites, content, and effects on world state ([emshort](https://emshort.blog/tag/quality-based-narrative/), [Beyond Branching](https://emshort.blog/2016/04/12/beyond-branching-quality-based-and-salience-based-narrative-structures/)).
- **Valve's rule database (Left 4 Dead, Dota 2):** Each line is a rule matched against the world state. The most specific matching rule wins and less specific rules act as fallbacks. It was designed so writers could author it comfortably ([Emily Short on Ruskin, GDC 2012](https://emshort.blog/2012/03/16/gdc-2012-talk-on-dynamic-dialogue/)).

## 3. Data-driven design, localisation, accessibility, offline delivery

**Content as data.** Townscaper's modules, Valve's rules and articy's JSON exports all keep content separate from the engine. Minecraft Education distributes self-contained `.mcworld` worlds and `.mctemplate` templates, which can be copied around on USB or network drives ([Minecraft Education guide](https://education.minecraft.net/content/dam/education-edition/learning-experiences/add-ons/Teachers%20Guide%20to%20Add-Ons.pdf), [support](https://edusupport.minecraft.net/hc/en-us/articles/4404970263572)). That is the right model for themed labs: one engine plus one data package per lab.

**Accessibility.** The Game Accessibility Guidelines group advice into motor, cognitive, vision, hearing and speech, at Basic, Intermediate and Advanced tiers. Basics include:
- not relying on colour alone (add patterns),
- choice of text contrast,
- reminders of the current objective,
- separate volume controls.

They also say to review the guidelines *before* production starts ([GAG](https://gameaccessibilityguidelines.com/why-and-how/)).

**Offline delivery.** Precache everything with a service worker using Workbox and a cache-first strategy for versioned assets ([Workbox strategies summary](https://dev.to/beefedai/service-worker-playbook-cache-strategies-workbox-225b), [web.dev Offline Cookbook](https://web.dev/articles/offline-cookbook)).

## 4. "Fake AI": making scripted characters feel intelligent

- **Event[0]:** Typed input is mapped to semantic tags (pen, pencil → stationery). "Events" for each topic load and unload as the conversation moves. Short-term memory resolves follow-ups like "open it". Nine moods change which vocabulary is used. Replies are assembled from fragments at random. Kaizen is framed as an *old, imperfect* program, so misunderstandings read as part of the character ([Game Developer](https://gamedeveloper.com/design/making-a-chatbot-that-drives-a-narrative-in-sci-fi-exploration-game-i-event-0-i-)).
- **Façade:** Free text is reduced to a small set of "discourse acts" by forward-chaining rules. Its authors treat understanding as a dialogue-management problem: what matters is the pragmatic effect of what the player says, not parsing it correctly ([Mateas & Stern, TIDSE 2004](https://www.cp.eng.chula.ac.th/~vishnu/gameResearch/story_november_2005/MateasSternTIDSE04.pdf)).
- **Portal's GLaDOS:** The writers tuned timing by recording and cutting lines themselves. Early versions used text-to-speech. Testers were asked to retell the story afterwards, and dialogue was added where players stopped engaging ([Game Developer](https://www.gamedeveloper.com/game-platforms/best-of-gdc-the-secrets-of-i-portal-i-s-huge-success), [Engadget](https://www.engadget.com/2008-02-22-gdc08-live-from-the-portal-post-mortem.html)).
- **The Talos Principle's Milton:** An interactive terminal character, written as branching menus ([Game Developer](https://gamedeveloper.com/design/philosophy-god-and-robots-writing-i-the-talos-principle-road-to-gehenna-i-)).

**Common techniques:**
- Refer back to earlier choices (memory).
- Hedge by showing confidence.
- Vary lines by state.
- Give the character a plausible reason for its limits.
- Use timing beats, such as a short "thinking" delay before the answer.

**If a live LLM is ever added:** the ICO Age Appropriate Design Code has 15 standards, including best interests of the child, data minimisation, high-privacy defaults, profiling off by default and no nudge techniques ([TIGA summary](https://tiga.org/?p=9917)). The DfE's *Generative AI: product safety standards* (first published January 2025, updated January 2026) require filtering, monitoring, data protection and transparency. KCSIE 2025 refers to them directly under filtering and monitoring ([GOV.UK](https://www.gov.uk/government/publications/generative-ai-product-safety-expectations/generative-ai-product-safety-expectations), [Farrer](https://www.farrer.co.uk/news-and-insights/changes-to-keeping-children-safe-in-education-2025-and-steps-for-schools-to-take/)). The safe path is a constrained one: the model only chooses or paraphrases from pre-approved responses, there is no free typing by children and no personal data, and staff stay in the loop.

---

## Implications for DeltaOps labs

**Architecture.** Keep one engine (`js/game/`) that loads a lab pack: `lab.yaml`, stage files, voxel models (`.vox` meshed at build time) and string tables. The engine never contains lab-specific text or logic.

**Schema sketch (one stage):**
```yaml
id: pond.s3
title: "Help the AI spot frogs"
facilitator_prompt: "Ask: what clues did the AI use?"
cards:                       # exactly 3; card ids a|b|c
  - id: a
    label: "Show it 50 frog photos"
    icon: camera
    helper:                  # salience-ordered: most specific `when` wins
      - when: { wildlife: ">=60", s2: a }
        guess: "Frog!"
        sure: 92
        line: "pond.s3.a.hi"
      - when: {}             # mandatory fallback
        guess: "Frog?"
        sure: 71
        line: "pond.s3.a.base"
    effects:
      meters: { wildlife: +10, visitors: +5 }
      world: [ { set: lilypads, to: bloom }, { spawn: frog, at: reed_bank, n: 2 } ]
      flags: [ trained_on_photos ]
  - id: b  # ...
  - id: c  # ...
artefact_fragment: { from: card, template: "pond.artefact.s3.{card}" }
```

**How world-state changes are declared.** Effects are pure data: changes to meters, named "world switches" (prop states authored as voxel variants), and flags. The engine maps world switches to visuals, so writers never touch the 3D scene. Meter values are clamped, and each meter has thresholds that trigger diorama changes, in the same way Townscaper uses rule-triggered "recipe" pieces.

**Testing all 729 routes.** 3^6 = 729 is small enough to enumerate fully. A headless Node script runs every route against the pure state reducer in milliseconds. It asserts that:
- every `when` resolves (a fallback exists),
- meters stay in range,
- every referenced string ID exists in every locale,
- every line in the content is reached at least once,
- every end artefact renders.

It writes a coverage CSV in the style of Ian Thomas's ink tool. Run it in CI on every content change. Add Playwright smoke tests on a sample of routes in a throttled Chromebook-class profile.

**Authoring workflow.** Writers edit a spreadsheet (one row per stage × card × helper variant) or YAML, using string IDs. A build step converts it to JSON, runs the linter and the 729-route test, and publishes a preview URL. Translators work on the string table only.

**Performance budget (Chromebook target):**
- 30 fps minimum, 60 fps preferred
- pixel ratio capped at 1.25
- 100 draw calls or fewer
- 150k triangles or fewer after greedy meshing
- AO baked into vertex colours, one 1024 shadow map or baked shadows
- 8 MB or less per lab, precached
- render only when the scene changes

**Recommendations:**
1. Treat each stage card as a storylet (prerequisites, content, effects) ([Emily Short](https://emshort.blog/tag/quality-based-narrative/)).
2. Choose helper lines by "most specific match wins, with a required fallback" ([Ruskin/Valve](https://emshort.blog/2012/03/16/gdc-2012-talk-on-dynamic-dialogue/); [Yarn saliency](https://docs.yarnspinner.dev/next/write-yarn-scripts/syntax-basics/node-groups/saliency)).
3. Enumerate all 729 routes in CI and report lines that are never reached ([Ian Thomas ink tool](https://wildwinter.medium.com/ink-testing-tool-f79e958db017); [inkcheck](https://glama.ai/mcp/servers/chaoz23/inkcheck)).
4. Make the helper feel intelligent through memory of earlier stages, mood/confidence that changes with meters, and line variants. Frame it as a learning, fallible AI, which also fits the teaching goal ([Event[0]](https://gamedeveloper.com/design/making-a-chatbot-that-drives-a-narrative-in-sci-fi-exploration-game-i-event-0-i-)).
5. Prototype timing with text-to-speech or placeholder text, and judge success by whether children can retell the story afterwards ([Portal postmortem](https://www.gamedeveloper.com/game-platforms/best-of-gdc-the-secrets-of-i-portal-i-s-huge-success)).
6. Build islands from a library of hand-authored modules placed by simple adjacency rules, so new themed labs are mostly re-skins ([Townscaper](https://www.gamedeveloper.com/game-platforms/how-townscaper-works-a-story-four-games-in-the-making); [Bad North WFC](https://80.lv/articles/using-wave-function-collapse-algorithm-for-dioramas/?amp=1)).
7. Block out levels with primitives first and treat each island as "one striking object" ([Monument Valley](https://gamedeveloper.com/design/designing-the-surprise-mobile-game-hit-i-monument-valley-i-)).
8. Greedy-mesh with baked AO, and include AO when deciding which faces to merge ([ao-mesher](https://npmjs.com/package/ao-mesher); [greedy+AO](https://hub.jmonkeyengine.org/t/greedy-meshing-for-complex-voxel-data/28017)).
9. Instance or batch repeated props, cap the pixel ratio and render only on change ([three.js forum](https://discourse.threejs.org/t/how-to-choose-between-instancedmesh-and-batchedmesh/81221); [perf guide](https://www.hontran.dev/blog/three-js-performance-optimization)).
10. Ship each lab as a self-contained, versioned pack precached by a service worker, with a USB fallback, as Minecraft Education does with `.mcworld` files ([Workbox](https://dev.to/beefedai/service-worker-playbook-cache-strategies-workbox-225b); [Minecraft Education](https://education.minecraft.net/content/dam/education-edition/learning-experiences/add-ons/Teachers%20Guide%20to%20Add-Ons.pdf)).
11. Pair every meter and colour cue with an icon and pattern, make tap targets large, add a read-aloud option, and keep the current objective visible ([Game Accessibility Guidelines](https://gameaccessibilityguidelines.com/why-and-how/)).
12. If an LLM is ever added, limit it to choosing or paraphrasing from vetted lines, keep data minimal, and assess it against the DfE standards and the ICO code before any pilot ([DfE](https://www.gov.uk/government/publications/generative-ai-product-safety-expectations/generative-ai-product-safety-expectations); [AADC](https://tiga.org/?p=9917)).

If writers outgrow spreadsheets, ink compiled with `inkjs` is the most established browser runtime ([inkjs](https://www.github.com/inkle/inkjs)). For a fixed 6×3 structure, though, plain YAML/JSON with the linter above is simpler and easier to test.
