# 04 — How world-building and narrative games are built and scripted: reference architecture for DeltaOps Learning's voxel labs

*Research brief, full version. Prepared 4 November 2026. This version goes further than the earlier ~1,800-word summary.*

**What this is based on.** Web search and fetches of primary pages where they were reachable. A few things limit it:
- The shared web-search budget ran out partway through. A small number of follow-ups (the Avowed GDC 2025 talk, inkjs bundle size, a primary BDA guide fetch) could not be done. Each one is marked **[unverified]** or listed under "Gaps".
- Wherever the only source was a secondary summary, the text says so.
- I did not inspect DeltaOps' `js/game/` code: the working repository contains only the brochure.

---

## Part A — How successful games build their worlds

### A1. Townscaper: an irregular grid filled with hand-made modules chosen by rules

**Building the grid.** Stålberg's 2019 tweet describes the goal as a "fairly even irregular quads grid in a hex". Boris the Brave's Sylves tutorial reconstructs the method, citing that tweet ([Sylves Townscaper tutorial](https://boristhebrave.com/docs/sylves/1/articles/tutorials/townscaper.html)):
1. Fill a hexagon with triangles.
2. Merge random pairs of neighbouring triangles into quads.
3. Subdivide everything into quads.
4. Weld duplicate vertices and relax the mesh.
5. To make it infinite, seed each hex from a hash of its position. Relax only after the hexes are tiled, so the seams line up.

**Placing buildings.** Game Developer's long-form piece adds ([Game Developer](https://www.gamedeveloper.com/game-platforms/how-townscaper-works-a-story-four-games-in-the-making)):
- Geometry is placed at cell *corners*, marching-cubes style. Artists author corner segments rather than whole buildings.
- Wave Function Collapse (WFC) re-solves the affected neighbourhood each time a block changes.
- Decoration is a separate pass that runs afterwards.
- "Recipe" pieces, such as gardens, carry priorities and conditions (a garden needs an enclosed area).
- Windows are cut out with a stencil buffer instead of being built into tiles.
- If the solver fails, it fails silently rather than restarting.
- A re-skin would need about 500 tiles; Bad North uses 300+.

**Talks.** "Organic Towns from Square Tiles" (IndieCade 2019) is listed on [Wikipedia](https://en.wikipedia.org/wiki/Townscaper). There is also "Beyond Townscaper" (Sweden Game Conference 2021, youtu.be/Uxeo9c-PX-w) and EPC2018 "WFC in Bad North" ([80.lv](https://80.lv/articles/using-wave-function-collapse-algorithm-for-dioramas/?amp=1)). I did not watch the videos; the points above come from the written sources.

**Dual-grid tiling.** The simpler relative of this approach offsets the render grid by half a cell, so each rendered tile covers four painted cells. A typical terrain set drops from 14 tiles to 5 ([dual-grid Godot](https://github.com/jamesplease/dual-grid-tilemap-system-godot-gdscript)).

**What DeltaOps can borrow:** hand-made modules, simple adjacency rules, a decoration pass, and rule-gated "recipe" props. These map directly onto "world switches" that change when meters cross thresholds (see Part E).

### A2. Tiny Glade

Tiny Glade began as a weekend procedural wall generator, built on a modified Bevy. The team describes procedural art as "detailed rules that guide the system". Playtesting surfaced unexpected player builds, such as stacked lanterns, and those became features ([80.lv](https://80.lv/articles/exclusive-tiny-glade-developers-discuss-bevy-proceduralism-publishers-cozy-games/)).

**Lesson:** procedural *assistance* inside a hand-composed scene, refined by watching players.

### A3. Teardown (from primary sources)

Gustafsson's own blog ([blog.voxagon.se](https://blog.voxagon.se/)) says:
- Voxels use an 8-bit palette: 255 materials, one byte per voxel. Palettes are packed into a 256-wide GPU texture, with roughness, emissive and reflectivity per material ("The Spraycan", Dec 2020).
- He moved "full raytracing in voxel space instead of the screen space counterpart" ("From screen space to voxel space", 2018).
- Separate posts cover quicksave and multiplayer.

A third-party RenderDoc-style breakdown says ([Montoya](https://juandiegomontoya.github.io/teardown_breakdown.html)):
- It is a deferred OpenGL 3.3 renderer.
- Each object's bounding box is rasterised, then a voxel DDA (step-by-step ray march through the grid) runs through a mipmapped 3D texture.
- Shadows use sparse/super-sparse "shadow volume" ray marches.
- AO uses two cosine-weighted rays per pixel.
- The pipeline includes TAA, denoisers and quarter-resolution volumetrics.

**Lesson:** this design is for desktop GPUs. Of all this, **only the palette idea transfers** to Chromebooks: a 256-entry palette texture, or per-vertex palette indices.

### A4. Monument Valley, Crossy Road, Dreams, Mario Maker, Roblox, Minecraft Education

- **Monument Valley:** levels were blocked out with Unity cubes, then meshed and given baked lightmaps. Each level was designed as "a single striking design object", and an idea got roughly one week of prototyping before a go/no-go ([Game Developer](https://gamedeveloper.com/design/designing-the-surprise-mobile-game-hit-i-monument-valley-i-), [MCV](https://www.mcvuk.com/development/unity-focus-monument-valley)).
- **Crossy Road:** the toolchain is now confirmed. Artist Ben Weatherall made the art in **Qubicle**, not MagicaVoxel ([Pocket Gamer.biz](https://www.pocketgamer.biz/making-of-crossy-road/)). Qubicle's own listing claims the art was "entirely made in Qubicle" ([Product Hunt](https://www.producthunt.com/products/qubicle)). The game took three people 12 weeks ([Pursuit, Univ. Melbourne](https://pursuit.unimelb.edu.au/articles/the-crossy-road-to-success)). The earlier brief left MagicaVoxel as "unconfirmed"; this corrects it.
- **Dreams:** scenes are stored as *edit lists* of CSG operations and evaluated on the fly into signed distance fields, then point clouds. The reason given: user-made content had to be "minimal size to download", so the fields could not be stored ([Evans, SIGGRAPH 2015](https://advances.realtimerendering.com/s2015/AlexEvans_SIGGRAPH-2015-sml.pdf)). On the tools side, creators start from templates and remix existing assets ("stealth creation"), and gestures replace dense menus ([Game Developer](https://gamedeveloper.com/design/how-media-molecule-designed-a-fun-and-robust-toolset-for-i-dreams-i-)). **Lesson:** store *recipes* (small data), not baked output.
- **Super Mario Maker:** a course is compact binary *data*: theme, style, and a list of objects with positions, which one engine interprets. The SMM2 format has been almost completely reverse-engineered by the community. SMMDB converts courses to Protocol Buffers ([r/MarioMaker2 SMMDB post](https://axebps-redlib.hf.space/r/MarioMaker2/duplicates/dthkov), community source). **Lesson:** a level is a small declarative document over a fixed vocabulary of parts.
- **Roblox:** the official guidance is to keep shared configuration in ModuleScripts that return tables. Attributes and Configuration objects "become cumbersome" once many objects need changing ([Roblox Creator Docs](https://create.roblox.com/docs/scripting/module)).
- **Minecraft Education:** worlds ship as self-contained `.mcworld` files (or reusable `.mctemplate` files) and can be passed around by USB or network drive ([Teacher's Guide](https://education.minecraft.net/content/dam/education-edition/learning-experiences/add-ons/Teachers%20Guide%20to%20Add-Ons.pdf), [support](https://edusupport.minecraft.net/hc/en-us/articles/4404970263572)). Import failures across versions are a recurring complaint ([community](https://edusupport.minecraft.net/hc/en-us/community/posts/30079971244692-World-Import-failed-Minecraft-Education-v1-21-05)). **Lesson:** version the pack format and validate packs on load.

### A5. Voxel meshing and lighting for the browser

- **Greedy meshing.** The reference is Lysenko's "Meshing in a block world" (0fps, 2012), and `ao-mesher` adds per-vertex AO ([npm](https://npmjs.com/package/ao-mesher)). Faces should only be merged when their AO values match as well as their type ([jME discussion](https://hub.jmonkeyengine.org/t/greedy-meshing-for-complex-voxel-data/28017)).
- **Static islands:** mesh them **at build time**, not in the browser.
- **BatchedMesh** (three.js) draws many *different* geometries that share one material in a single multi-draw call. It frustum-culls and sorts per object by default. Geometries must share attribute layouts ([three.js docs](https://threejs.org/docs/pages/BatchedMesh.html)). **InstancedMesh** suits many copies of one geometry ([forum](https://discourse.threejs.org/t/how-to-choose-between-instancedmesh-and-batchedmesh/81221)).
- **WebGPURenderer.** It uses WebGPU by default and falls back to WebGL 2 automatically. `forceWebGL: true` forces the fallback for testing. TSL shaders transpile to WGSL or GLSL. `ShaderMaterial`, `RawShaderMaterial` and `onBeforeCompile` are **not supported** and must be ported to node materials ([three.js manual](https://threejs.org/manual/en/webgpurenderer)). Blogs date "production-ready" to about r171 **[unverified]** ([utsubo](https://www.utsubo.com/blog/webgpu-threejs-migration-guide)).
- **WebGPU on ChromeOS.** It has shipped since Chrome 113 on ChromeOS devices with Vulkan support ([Chrome blog](https://developer.chrome.com/blog/webgpu-release)). By late 2025 it was in stable Chrome/Edge on Windows, macOS and ChromeOS ([TechSpot](https://www.techspot.com/news/110456-webgpu-now-brings-desktop-quality-graphics-all-major.html)). I found no per-GPU ChromeOS allow-list (Intel Gen11/12, Mali).

  **Conclusion:** keep a WebGL 2 path as the baseline. Treat WebGPU as an optional enhancement, chosen at runtime, until a venue's devices have been tested.
- **The "diorama" look on low-end GPUs** (my synthesis of the above, not a single source):
  - AO baked into vertex colours
  - a hemisphere light plus one directional light
  - one small shadow map for the island, or baked blob shadows under characters
  - no SSAO, bloom or other post-processing

### A6. Performance on low-end devices

Published, measured voxel benchmarks for Chromebooks **do not appear to exist**. I found none, so DeltaOps should measure its own (protocol below). What is known:
- **Floor device:** Celeron N4500 (Jasper Lake), Intel UHD with 16 EUs at 350–750 MHz ([Notebookcheck](https://www.notebookcheck.com/Intel-Celeron-N4500-Prozessor-Benchmarks-und-Specs.514523.0.html)). 3DMark Time Spy graphics score: about 157 ([CPU-Monkey](https://www.cpu-monkey.com/en/benchmark-intel_celeron_n4500-3dmark_time_spy_graphics_score)).
- **Chromebook Plus minimum:** Core i3 12th gen or Ryzen 3 7000, 8 GB RAM, 1080p IPS screen ([Trusted Reviews](https://www.trustedreviews.com/explainer/what-is-chromebook-plus-4374948)).
- **Rules of thumb (blogs, not benchmarks):**
  - cap DPR at 1–1.5
  - keep draw calls under ~100–150
  - render only when something changed
  - watch `renderer.info.render.calls`

  ([hontran.dev](https://www.hontran.dev/blog/three-js-performance-optimization), [chrome-tips](https://chrome-tips.pages.dev/chrome-three-js-3d-performance-optimization))
- Replacing about 19.6k individual meshes with one InstancedMesh cut render CPU p95 from 28.5 ms to 0.5 ms (one author's measurement; [threejs-performance skill](https://tessl.io/registry/skills/github/CloudAI-X/threejs-skills/threejs-performance)).
- A missing Intel GPU driver can drop WebGL to single-digit fps on Windows laptops (anecdotal; [besthub](https://besthub.dev/articles/resolving-low-webgl-frame-rates-in-chrome-by-adjusting-failifmajorperformancecaveat-and-updating-integrated-gpu-drivers-67dba005d70f)). That matters for venue laptops that aren't Chromebooks.

**Textures and geometry compression:**
- KTX2/Basis stays compressed in VRAM. A 2048² RGBA texture is about 22 MB in VRAM whatever the file format; KTX2 cuts that by roughly 4–8×.
- Meshopt compresses all buffer views, including animation and morph data, and decodes fast. Draco can make smaller meshes but has a bigger, slower decoder.

([cinevva guide](https://app.cinevva.com/guides/optimize-glb-for-web), [threejs asset pipeline](https://www.ui-skills.com/skills/cloudai-x/threejs-asset-pipeline); secondary sources, so treat the figures as directional.)

**For flat-colour voxels:** you need almost no textures. A single palette texture or vertex colours, plus Meshopt-compressed glTF (or a custom binary), is the leanest option.

**Load budgets.** web.dev's baseline is under 170 KB of compressed critical-path resources and under 5 s to interactive on slow 3G with a mid-range phone. Alternatives are about 345 KB / 3 s on slow 4G and about 750 KB / 2 s on desktop Wi-Fi ([web.dev](https://web.dev/articles/your-first-performance-budget), origin: [Russell 2017](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets)). Venue Wi-Fi shared by 30 devices behaves like slow 4G or worse, so **lab packs should be preloaded** (Part E6).

---

## Part B — Narrative and branching tools compared

### B1. The tools

| Option | Writer friendliness | Testability | Localisation | Branching control | Web runtime | Fit for 6×3 labs |
|---|---|---|---|---|---|---|
| **ink + inkjs** | High: plain text, Inky editor; built for "write quickly, read back quickly, edit quickly" ([Ingold](https://medium.com/game-writing-guide/introduction-to-ink-3e6c224865f8)) | Good: random-walk testers ([Ian Thomas](https://wildwinter.medium.com/ink-testing-tool-f79e958db017)), bounded explorer ([inkcheck](https://glama.ai/mcp/servers/chaoz23/inkcheck)); inkle says scenes are easy to test in isolation ([Game Developer](https://gamedeveloper.com/design/knockin-on-i-heaven-s-vault-i-how-inkle-designed-its-first-3d-game)) | Weak natively: text is inline, so you need line tagging and extraction | Full: variables, conditionals, tunnels, functions | inkjs, community-maintained, about one major version behind ([inkle/ink](https://github.com/inkle/ink)); size not measured **[unverified]** | Overkill unless dialogue grows within stages |
| **Yarn Spinner 3** | High: screenplay-like; storylets via node groups and `when:` | Good: compiler, line IDs; Jon Manning's GDC 2019 talk applies symbolic execution and control-flow analysis to find unreachable dialogue ([GDC Vault](https://gdcvault.com/play/1025981)) | Strong: line IDs, string tables | Full, plus saliency ("best" = most specific) ([docs](https://docs.yarnspinner.dev/next/write-yarn-scripts/syntax-basics/node-groups/saliency)) | Official: Unity, Godot, Unreal. Web: community, early-stage ([yarn-spinner-runner-ts](https://app.unpkg.com/yarn-spinner-runner-ts@0.1.5-c/files/README.md)) | Good model, risky web runtime |
| **Twine (SugarCube/Harlowe) + Tweego** | Very high for beginners | Weak: few test tools; the CLI is Tweego ([intfiction](https://intfiction.org/t/tweego-v2-1-1/44412)) | Weak | Passage-level | Whole HTML story format | Useful for paper prototyping only |
| **articy:draft X** | High for teams, visual flow, templates; ZA/UM picked it because writers *and* programmers liked it ([ZA/UM devblog](https://discoelysium.com/devblog/2016/02/26/peculiarities-eastern-european-game-development)) | Via export plus your own scripts | .xlsx localisation export ([articy-js](https://scenarioworld.github.io/articy-js)) | Full | articy-js runtime | Licence cost; Disco Elysium's ~1M words made it "janky… froze completely" ([PC Gamer](https://www.pcgamer.com/games/rpg/disco-elysium-had-so-much-text-it-broke-the-branching-narrative-software-we-were-writing-too-much)) |
| **ChoiceScript** (reference point) | High | **Best in class:** `quicktest` covers every option and both sides of every `*if`; `randomtest` runs 10,000+ seeded plays with line hit counts; both must pass before publication ([Choice of Games](https://choiceofgames.com/make-your-own-games/testing-choicescript-games-automatically)) | Weak | Full | ChoiceScript engine | Copy the testing model, not the engine |
| **Custom YAML/JSON + schema + linter** | Medium for YAML; high with a form or spreadsheet front-end | **Best for this case:** 729 routes can be enumerated exhaustively | Strong if strings are kept as IDs | Exactly the structure needed, nothing more | Under 5 KB reducer | **Recommended** |
| **Spreadsheet as source** (Sheets → CSV → JSON) | Highest for non-programmers: comments, colour coding, several editors at once | Through the same build linter | Native: one column per locale ([small_pp_localization_tool](https://www.github.com/AntonBergaker/small_pp_localization_tool)) | Flat; conditions as simple columns | n/a (build step) | **Recommended as the writing surface** |

One more data point: many studios end up writing their own editor or a script that reads spreadsheets ([Chat Mapper](https://www.chatmapper.com/?p=556)).

### B2. Real automated narrative testing, by studio

- **Choice of Games:** two mandatory automated testers. The seeded randomtest makes failures reproducible, and per-line hit counts show the probability of reaching each line (link above).
- **Secret Lab (Yarn Spinner):** compiler techniques (control-flow graphs, symbolic execution) to *prove* a branch can't be reached ([GDC 2019](https://gdcvault.com/play/1025981)).
- **inkle:** automated testing built into the writing workflow ([GDC Vault, Heaven's Vault](https://gdcvault.com/play/1025149/-Heaven-s-Vault-Creating)). Scenes are tested in isolation.
- **Ian Thomas (on ink):** thousands of random runs produce a CSV of line visit counts; lines never visited point to logic errors. He credits Dan Fabulich of Choice of Games for the idea.
- **Ubisoft (The Division):** "Client Bots" that drive the player and report issues ([Game Developer](https://gamedeveloper.com/programming/see-how-ubisoft-tested-i-the-division-i-with-automated-players-at-gdc-2019-)). This is gameplay testing, not dialogue, but the same pattern.
- **Obsidian (Avowed):** a GDC 2025 talk on moving from QA testing to *analysing* branching narrative ([gamedev.net clip](https://gamedev.net/news/2878-avowed-branching-narratives-shifting-from-qa-testing-to-analyzing-clip/)). **[unverified, page blocked]**
- **Valve:** a writer-facing rule database where the most specific rule wins and fallbacks are required ([Emily Short on Ruskin](https://emshort.blog/2012/03/16/gdc-2012-talk-on-dynamic-dialogue/)).
- **General practice:** give every line and state a durable ID so QA and automated checks can refer to it across builds ([PulseGeek](https://pulsegeek.com/articles/qa-branching-dialogue-and-quest-logic), secondary).

**Takeaway.** Big projects *sample*, because their path counts explode. DeltaOps has exactly 3⁶ = 729 routes, so it can test **every route on every commit**, which is stronger than any of these studios can manage. It should still copy:
- ChoiceScript's line hit counts,
- Manning's reachability proof (static: "can this condition ever be true?"),
- seeded reproducibility for any randomised line variation.

---

## Part C — Accessibility

### C1. Which standards apply

- **WCAG2ICT** (W3C Group Note, 8 Oct 2024) explains how WCAG applies to non-web software, games included. It adds no new requirements ([US Access Board](https://www.access-board.gov/news/2024/10/08/wcag2ict-published-as-w3c-group-note/)).
- A browser lab *is* web content, so **WCAG 2.2 AA is the sensible contractual baseline for the UI overlay**.
- The **Game Accessibility Guidelines** ([GAG](https://gameaccessibilityguidelines.com/why-and-how/)) and the **Xbox Accessibility Guidelines** v3.2 ([XAG](https://learn.microsoft.com/en-us/gaming/accessibility/guidelines)) cover game-specific needs.

### C2. Criteria that matter most here

| Need | Requirement / guideline | Implementation in labs |
|---|---|---|
| Large touch targets | WCAG 2.2 **2.5.8 Target Size (Min)**: 24×24 CSS px or spacing ([Deque](https://dequeuniversity.com/rules/axe/4.8/target-size)) | Cards ≥ 88 px tall; aim for 44–48 px minimum on every control (exceeds AA) |
| No drag required | **2.5.7 Dragging Movements**: single-pointer alternative ([Perficient](https://blogs.perficient.com/2021/09/30/a-new-standard-for-interacting-with-the-web-beyond-the-keyboard-and-screen-reader)) | Card selection is tap-to-choose; camera orbit optional, with buttons |
| Focus visible | **2.4.11 Focus Not Obscured** ([getwcag](https://getwcag.com/en/wcag-2-2-checklist)) | Overlay never covers the focused card |
| Contrast and text | **XAG 101 Text display, XAG 102 Contrast** (high-contrast mode, outlines) ([XAG 102](https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/102)) | Text on solid panels, never over the 3D scene; high-contrast theme token set |
| Colour blindness | GAG: don't rely on colour alone; patterns ([GAG](https://gameaccessibilityguidelines.com/why-and-how/)) | Every meter gets an icon, a number and a pattern fill; world changes are also shape changes (more frogs, not just greener) |
| Screen narration | **XAG 106 Screen narration** ([XAG list](https://learn.microsoft.com/en-us/gaming/accessibility/guidelines)) | UI is real DOM, not canvas; helper replies go to an `aria-live="polite"` region; canvas has a text description of world changes |
| Read-aloud | Web Speech API `speechSynthesis`. Voices load asynchronously (wait for `voiceschanged`); `localService` marks offline voices; ChromeOS "Natural" voices work offline ([Readium](https://readium.org/speech/docs/WebSpeech.html), [MDN mirror](https://www-igm.univ-mlv.fr/~forax/MDN/developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices.html)) | "Read to me" button on every card and helper line; choose a `localService` en-GB voice; fall back to pre-recorded audio for the helper's key lines, since voices vary by device |
| Switch access | ChromeOS Switch Access follows system focus and moves between focusable elements ([Chromium docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/accessibility/os/switch_access.md), [W3C WAI-IG](https://lists.w3.org/Archives/Public/w3c-wai-ig/2018OctDec/0039.html)) | Cards are `<button>`s in a sensible tab order; nothing is reachable only by hover or canvas click; no time limits |
| Reduced motion | `prefers-reduced-motion: reduce` ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)) | Camera pans become cuts; no bobbing or idle camera drift; also an in-app toggle (ChromeOS mapping not documented on MDN) |
| Dyslexia-friendly text | Sources disagree, and the BDA primary was not fetched: 12–14pt+ sans serif, headings ≥20% larger, off-white/cream backgrounds, dark-not-black text, 1.5× line spacing ([Dyslexia Scotland](https://dyslexiascotland.org.uk/wp-content/uploads/2025/10/formats.pdf), [Smashing](https://smashingmagazine.com/2021/11/dyslexia-friendly-mode-website)) | Body ≥ 18 px on 1366×768, line-height 1.5, left-aligned, ≤ 60 chars per line, cream panel; sentence length enforced by the linter (Part E) |
| Cognitive | GAG: remind players of the objective; separate volume controls | Persistent "Stage 3 of 6: help the AI spot frogs" header; separate music/voice/SFX sliders |

---

## Part D — Scripted "fake AI" (recap, plus what to build)

From the earlier brief:
- **Event[0]:** tags and topic events, short-term memory, nine moods, fragment assembly, and framing the AI as an "old, imperfect program" ([Game Developer](https://gamedeveloper.com/design/making-a-chatbot-that-drives-a-narrative-in-sci-fi-exploration-game-i-event-0-i-)).
- **Façade:** maps player input to discourse acts ([Mateas & Stern 2004](https://www.cp.eng.chula.ac.th/~vishnu/gameResearch/story_november_2005/MateasSternTIDSE04.pdf)).
- **Portal:** prototyped timing with text-to-speech and tested whether players could retell the story ([Game Developer](https://www.gamedeveloper.com/game-platforms/best-of-gdc-the-secrets-of-i-portal-i-s-huge-success)).

**Built into the schema:**
- helper *variants* conditioned on state (memory of earlier stages),
- a `sure` percentage plus a `mood`,
- a "thinking" beat (`delay_ms`),
- `because` lines that name the training data the child chose: AI literacy, delivered as characterisation.

**Live LLM safeguarding.** Unchanged from the earlier brief: the DfE product safety standards (updated Jan 2026) and the 15 standards of the ICO Age Appropriate Design Code ([GOV.UK](https://www.gov.uk/government/publications/generative-ai-product-safety-expectations/generative-ai-product-safety-expectations), [TIGA](https://tiga.org/?p=9917)).

---

## Part E — Reference architecture for DeltaOps Learning labs

### E1. Lab pack folder layout

```
content/                                  # source of truth (git)
  engine-vocab/                           # shared across all labs
    meters.yaml                           # allowed meter ids + display (icon, pattern, range)
    switches.schema.json
    moods.yaml                            # helper moods -> face/animation
  labs/
    pond/                                 # Eco AI Explorer
      lab.yaml                            # manifest: id, version, theme, meters used, stage order, artefact
      stages/
        s1.yaml … s6.yaml                 # one file per stage (schema E2)
      world/
        island.vox                        # MagicaVoxel/Qubicle/Goxel source
        props/*.vox
        switches.yaml                     # world switch -> prop variants / spawn points
      strings/
        en-GB.csv                         # id,text,notes,max_chars,reading_age  (exported from Sheets)
        cy.csv                            # Welsh etc.
      audio/en-GB/*.ogg                   # optional pre-recorded helper lines
      facilitator/cards.yaml
      artefact/template.yaml              # end artefact layout + fragments
      tests/golden.yaml                   # hand-picked routes with expected end state
    rover/ lighthouse/ londinium/ ecotown/ rivertown/ grow/ moon/ kick/ beat/
build/ (generated)
  dist/labs/pond/<contenthash>/
    pack.json                             # stages+lab merged, strings resolved by id only
    strings.en-GB.json
    world.bin                             # pre-greedy-meshed, AO-baked, meshopt-compressed
    audio/...
  dist/labs/index.json                    # lab list + hashes (network-first)
  coverage/pond.html, pond.csv            # route/variant coverage reports
```

### E2. JSON Schema for a stage (draft 2020-12)

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://deltaops.example/schemas/stage.schema.json",
  "title": "Lab stage",
  "type": "object",
  "required": ["id", "index", "title", "prompt", "cards", "facilitator"],
  "additionalProperties": false,
  "properties": {
    "id":    { "type": "string", "pattern": "^[a-z0-9]+\\.s[1-6]$" },
    "index": { "type": "integer", "minimum": 1, "maximum": 6 },
    "title":  { "$ref": "#/$defs/stringId" },
    "prompt": { "$ref": "#/$defs/stringId" },
    "camera": { "type": "string", "description": "named camera shot in world/switches.yaml" },
    "facilitator": {
      "type": "object",
      "required": ["ask"],
      "properties": {
        "ask":       { "$ref": "#/$defs/stringId" },
        "listen_for":{ "type": "array", "items": { "$ref": "#/$defs/stringId" } },
        "if_stuck":  { "$ref": "#/$defs/stringId" }
      },
      "additionalProperties": false
    },
    "cards": {
      "type": "array", "minItems": 3, "maxItems": 3,
      "items": { "$ref": "#/$defs/card" }
    }
  },
  "$defs": {
    "stringId": { "type": "string", "pattern": "^[a-z0-9]+(\\.[a-z0-9_]+)+$" },
    "meterId":  { "type": "string", "description": "must exist in engine-vocab/meters.yaml (checked by linter)" },
    "card": {
      "type": "object",
      "required": ["id", "label", "icon", "helper", "effects"],
      "additionalProperties": false,
      "properties": {
        "id":    { "enum": ["a", "b", "c"] },
        "label": { "$ref": "#/$defs/stringId" },
        "icon":  { "type": "string" },
        "concept": { "type": "string", "description": "AI-literacy tag, e.g. training-data, bias, feedback" },
        "helper": {
          "type": "array", "minItems": 1,
          "items": { "$ref": "#/$defs/helperVariant" },
          "description": "Most specific matching `when` wins; exactly one variant must have empty `when` (fallback)."
        },
        "effects": { "$ref": "#/$defs/effects" }
      }
    },
    "helperVariant": {
      "type": "object",
      "required": ["when", "guess", "sure", "line"],
      "additionalProperties": false,
      "properties": {
        "when":    { "$ref": "#/$defs/condition" },
        "guess":   { "$ref": "#/$defs/stringId" },
        "sure":    { "type": "integer", "minimum": 0, "maximum": 100 },
        "mood":    { "enum": ["curious", "confident", "unsure", "puzzled", "proud", "sorry"] },
        "line":    { "$ref": "#/$defs/stringId" },
        "because": { "$ref": "#/$defs/stringId" },
        "delay_ms":{ "type": "integer", "minimum": 0, "maximum": 2500, "default": 900 },
        "weight":  { "type": "integer", "minimum": 1, "default": 1,
                     "description": "tie-break among equally specific variants (seeded)" }
      }
    },
    "condition": {
      "type": "object",
      "description": "All clauses must hold (AND). Specificity = number of clauses.",
      "additionalProperties": false,
      "properties": {
        "meters": {
          "type": "object",
          "additionalProperties": {
            "type": "string", "pattern": "^(<|<=|>|>=|==)-?[0-9]+$"
          }
        },
        "flags":     { "type": "array", "items": { "type": "string" } },
        "not_flags": { "type": "array", "items": { "type": "string" } },
        "chose": {
          "type": "object",
          "description": "earlier stage choices, e.g. {\"s2\": \"a\"}",
          "propertyNames": { "pattern": "^s[1-6]$" },
          "additionalProperties": { "enum": ["a", "b", "c"] }
        }
      }
    },
    "effects": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "meters":   { "type": "object", "additionalProperties": { "type": "integer", "minimum": -50, "maximum": 50 } },
        "flags":    { "type": "array", "items": { "type": "string" } },
        "world":    {
          "type": "array",
          "items": {
            "oneOf": [
              { "type": "object", "required": ["set", "to"], "additionalProperties": false,
                "properties": { "set": { "type": "string" }, "to": { "type": "string" } } },
              { "type": "object", "required": ["spawn", "at"], "additionalProperties": false,
                "properties": { "spawn": { "type": "string" }, "at": { "type": "string" },
                                "n": { "type": "integer", "minimum": 1, "maximum": 8 } } }
            ]
          }
        },
        "artefact": { "$ref": "#/$defs/stringId", "description": "fragment appended to end artefact" }
      }
    }
  }
}
```

**Worked YAML example** (what a writer's spreadsheet row compiles to):

```yaml
id: pond.s3
index: 3
title: pond.s3.title             # "Help the AI spot frogs"
prompt: pond.s3.prompt
camera: reed_bank_close
facilitator:
  ask: pond.s3.fac.ask           # "What clues did the AI use?"
  if_stuck: pond.s3.fac.stuck
cards:
  - id: a
    label: pond.s3.a.label       # "Show it 50 frog photos"
    icon: camera
    concept: training-data
    helper:
      - when: { chose: { s2: a }, meters: { wildlife: ">=60" } }
        guess: pond.guess.frog
        sure: 92
        mood: proud
        line: pond.s3.a.hi
        because: pond.s3.a.because_photos_and_clean_water
      - when: { flags: [ murky_water ] }
        guess: pond.guess.frog_maybe
        sure: 58
        mood: unsure
        line: pond.s3.a.murky
      - when: {}
        guess: pond.guess.frog
        sure: 74
        mood: confident
        line: pond.s3.a.base
    effects:
      meters: { wildlife: 10, visitors: 5 }
      flags: [ trained_on_photos ]
      world:
        - { set: lilypads, to: bloom }
        - { spawn: frog, at: reed_bank, n: 2 }
      artefact: pond.art.s3.a
  - id: b   # ...
  - id: c   # ...
```

**How world-state changes are declared.**
- `effects.world` only names **switches** and **spawn points** defined in `world/switches.yaml`. For example, `lilypads: {none, few, bloom}` maps each state to a voxel prop variant.
- **Meter thresholds** are declared once per lab, so writers never place props by hand:

  ```yaml
  thresholds:
    wildlife:
      - { at: 40, set: reeds, to: tall }
      - { at: 70, spawn: heron, at_point: shallows }
  ```

  This is the same pattern as Townscaper's rule-triggered "recipe" pieces.

### E3. State reducer (pseudo-code; pure, deterministic, about 100 lines in real JS)

```text
State = { lab, stageIndex: 0..6, choices: {s1..s6}, meters: {id:int}, flags: Set, world: {switch:state}, spawns: [], artefact: [] , seed:int }

init(pack, seed):
  meters = { m.id: m.start for m in pack.meters }
  world  = { sw.id: sw.default for sw in pack.switches }
  return State{ stageIndex:0, choices:{}, meters, flags:{}, world, spawns:[], artefact:[], seed }

matches(cond, s):
  for (m, expr) in cond.meters:    if not compare(s.meters[m], expr): return false
  for f in cond.flags:             if f not in s.flags: return false
  for f in cond.not_flags:         if f in s.flags: return false
  for (st, c) in cond.chose:       if s.choices[st] != c: return false
  return true

specificity(cond) = len(cond.meters)+len(cond.flags)+len(cond.not_flags)+len(cond.chose)

pickHelper(variants, s):              # evaluated BEFORE effects apply (AI reacts to prior world)
  eligible = [v for v in variants if matches(v.when, s)]
  best = max specificity among eligible
  tied = [v for v in eligible if specificity(v.when) == best]
  return weightedPick(tied, rng(s.seed, s.stageIndex))   # deterministic

applyCard(pack, s, cardId):
  stage = pack.stages[s.stageIndex]; card = stage.cards[cardId]
  helper = pickHelper(card.helper, s)
  s' = clone(s)
  s'.choices[stage.key] = cardId
  for (m, d) in card.effects.meters: s'.meters[m] = clamp(s.meters[m] + d, pack.meters[m].min, pack.meters[m].max)
  s'.flags ∪= card.effects.flags
  for w in card.effects.world: applyWorld(s', w)
  for (meter, rules) in pack.thresholds:                 # crossing-up triggers only
     for r in rules: if s.meters[meter] < r.at <= s'.meters[meter]: applyWorld(s', r)
  if card.effects.artefact: s'.artefact.push(card.effects.artefact)
  s'.stageIndex += 1
  return { state: s', helper, events: diff(s, s') }     # renderer animates `events`

# Renderer and UI subscribe to events; they never mutate state.
```

### E4. Test harness design for all 729 routes

**Unit of test:** a route is a 6-character string over {a, b, c} ("aabcab"). Enumerate all 3⁶ = 729 by counting 0..728 in base 3. Each route is 6 reducer calls, about 4,400 in total, which runs in well under a second in Node.

**Checks per lab**

1. **Schema:** ajv validates every stage against E2.
2. **Referential integrity:**
   - every string ID exists in *every* locale CSV,
   - every meter, flag, switch, spawn point, icon and camera exists in the vocabularies,
   - every `audio` file exists.
3. **Static reachability** (Manning-style, [GDC 2019](https://gdcvault.com/play/1025981)):
   - for each helper variant, check whether *any* prefix route can satisfy its `when`. Exhaustive enumeration answers this exactly.
   - a flag that is read but never set is an error, and so is a flag set but never read (warning).
4. **Dynamic invariants, on every route:**
   - exactly one fallback per card,
   - `pickHelper` never returns null,
   - meters stay within range,
   - `sure` is plausible (0–100, and ≥ 50 when mood is `confident`),
   - the artefact has exactly 6 fragments,
   - the end state is serialisable.
5. **Coverage** (ChoiceScript "hit count" style, [Choice of Games](https://choiceofgames.com/make-your-own-games/testing-choicescript-games-automatically)):
   - a count per helper variant, per threshold rule and per world-switch state,
   - **zero hits = build fails**; under 1% of routes = warning (the writer should know a line is very rare),
   - output: `coverage/pond.csv` plus an HTML heat map (stage × card × variant) for writers.
6. **Distribution checks** (design QA, not correctness):
   - histogram of final meter values across the 729 routes,
   - flag if more than X% of routes end in the same world state ("choices don't matter") or if some meter never moves.
7. **Text-quality lint**, per string and per locale:
   - max characters (card labels ≤ 40, helper lines ≤ 120),
   - max words per sentence,
   - banned-word list,
   - a reading-age estimate with a configurable target per lab (for example, age 9).
8. **Golden routes:** `tests/golden.yaml` pins 5–10 hand-written routes with their expected end meters and world, so a change shows up as a reviewable diff.
9. **Snapshot of all 729 end states:** a JSON file committed alongside the content. Any content change produces a readable diff ("route bcaabc: wildlife 72→62, heron no longer spawns").

**Browser layer** (Playwright, headless Chromium):
- **27-route covering sample.** Every stage × card pair (18 pairs) and every consecutive-stage pair is exercised at least once (an orthogonal-array style sample).
- For each sampled route:
  - click through the real UI using **keyboard only** (this also proves switch-access/tab order),
  - assert the `aria-live` text matches the expected helper line,
  - screenshot each stage for visual diffs.
- **Perf smoke:** run 3 routes with Chrome DevTools CPU throttling (4×). Assert the average frame time stays within budget (E7), `renderer.info.render.calls` ≤ 100, and the JS heap stays within budget.
- **WebGL 2 forced** (`forceWebGL: true` when using WebGPURenderer) as well as the default backend.

### E5. CI pipeline (GitHub Actions or similar)

```
on: push / pull_request (content/** or js/**)
jobs:
  1 sheets-sync     (scheduled or manual) pull published CSV from Google Sheets -> commit to branch "content-sync"
  2 build-content   yaml/csv -> pack.json ; .vox -> greedy mesh + baked AO -> meshopt .bin ; content hashes
  3 lint+schema     ajv, referential integrity, text lint            -> fail fast, annotated errors on the PR
  4 route-test      729 x N labs, invariants, coverage, snapshot diff -> uploads coverage HTML as artifact
  5 browser-test    Playwright covering sample, keyboard-only, a11y scan (axe), screenshots
  6 perf-budget     bundle sizes (shell <= 150 KB gz, pack <= budget), throttled frame-time smoke
  7 preview-deploy  static deploy to preview URL with ?lab=pond&route=aabcab deep-links for reviewers
  8 release         tag -> versioned dist + new precache manifest; venues update on next "prepare" run
```

**Writers' loop:**
1. Edit the Google Sheet (one tab per lab; rows = stage × card × variant; columns for conditions, effects, en-GB, cy, notes, max_chars).
2. Press "Sync" (job 1).
3. Get a PR with a coverage report and a preview link.
4. Click a deep link to play their route.

Writers never touch YAML unless they want to. Programmers review only the diffs to schema and vocabularies.

### E6. Service worker and offline plan

Built on Workbox precaching. Revisioned URLs are cache keys; later updates download only what changed; outdated entries are cleaned up on activate ([Workbox precaching](https://developer.chrome.com/docs/workbox/modules/workbox-precaching)). Storage: Chromium allows an origin up to 60% of total disk. Best-effort data is evicted LRU (least-recently-used) per whole origin under pressure. `navigator.storage.persist()` is auto-granted or refused in Chrome based on engagement ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)).

| Asset class | Strategy | Notes |
|---|---|---|
| App shell (HTML, JS, CSS, fonts, UI icons) | **Precache** in SW install | ≤ 150 KB gz critical path, matching the web.dev 170 KB slow-network baseline |
| `labs/index.json` | **Network-first, 3 s timeout → cache** | Picks up new lab versions when online; never blocks offline |
| Lab packs `labs/<id>/<hash>/*` | **Cache-first** (immutable, hashed) | Downloaded per lab on "Prepare" or on first open |
| Audio | Cache-first, range requests disabled | Or inline as small OGG in the pack |
| Analytics (if any, anonymous) | Background-sync queue | No child data, in line with AADC data minimisation |

**Venue flow:**
1. Staff open `/prepare` on venue Wi-Fi the day before, or at set-up.
2. The page calls `navigator.storage.persist()`, downloads every lab pack with a progress bar, then verifies hashes.
3. Each lab shows a green "Ready offline" tick.

**Rules during a session:**
- The service worker does **not** `skipWaiting` mid-session. Updates apply on the next launch, so a session can never change version halfway through.
- Install as a PWA so it launches from the shelf or desktop.

**Fallback** for locked-down devices where service workers or storage are disabled: a USB "venue kit" holding the same `dist/` and a tiny local static server. This is the Minecraft Education `.mcworld` model. Load-time targets are in E7.

### E7. Performance budget

| Item | Floor device: Celeron N4500 / UHD 16 EU, 4 GB, 1366×768 | Target device: Chromebook Plus (i3-12th gen, 8 GB, 1080p) | Rationale / source |
|---|---|---|---|
| Frame rate | ≥ 30 fps sustained, 1 % lows ≥ 24 | 60 fps | Floor GPU ~157 Time Spy ([CPU-Monkey](https://www.cpu-monkey.com/en/benchmark-intel_celeron_n4500-3dmark_time_spy_graphics_score)) |
| Device pixel ratio cap | 1.0 | 1.5 | Fill-rate bound iGPUs ([hontran](https://www.hontran.dev/blog/three-js-performance-optimization)) |
| Draw calls / frame | ≤ 60 | ≤ 100 | ~100–150 rule of thumb; BatchedMesh/InstancedMesh ([three.js](https://threejs.org/docs/pages/BatchedMesh.html)) |
| Visible triangles | ≤ 100 k | ≤ 250 k | After build-time greedy meshing ([ao-mesher](https://npmjs.com/package/ao-mesher)) |
| Lights / shadows | 1 hemisphere + 1 directional; baked AO; blob shadows | + one 1024² shadow map | Avoid Teardown-style ray marching ([Montoya](https://juandiegomontoya.github.io/teardown_breakdown.html)) |
| Post-processing | None | Optional FXAA only | |
| GPU texture memory | ≤ 16 MB | ≤ 32 MB | Palette texture / vertex colours; KTX2 for any bitmaps ([cinevva](https://app.cinevva.com/guides/optimize-glb-for-web)) |
| JS heap | ≤ 150 MB | ≤ 300 MB | 4 GB devices with other tabs open |
| Render loop | Render on dirty; idle animation capped at 30 fps; pause when tab hidden | Same | ([chrome-tips](https://chrome-tips.pages.dev/chrome-three-js-3d-performance-optimization)) |
| Critical-path download (shell) | ≤ 150 KB gz | ≤ 150 KB gz | web.dev ≤ 170 KB / 5 s on slow network ([web.dev](https://web.dev/articles/your-first-performance-budget)) |
| Per-lab pack | ≤ 2.5 MB gz (≤ 1.5 MB without audio) | Same | About 30–60 s on a congested ~0.5–1 Mbps per-device share; hence pre-caching |
| Whole library (10 labs) | ≤ 25 MB | ≤ 25 MB | Far below Chromium's 60%-of-disk quota ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)) |
| Cold start from cache → interactive | ≤ 3 s | ≤ 1.5 s | |
| Stage transition (card tap → helper reply shown) | ≤ 100 ms input response, then authored "thinking" delay 600–1200 ms | Same | The delay is a design beat, not latency (Portal timing lesson) |
| Renderer backend | WebGL 2 (default) | WebGPU if the adapter is available, otherwise WebGL 2 | ([three.js manual](https://threejs.org/manual/en/webgpurenderer), [Chrome](https://developer.chrome.com/blog/webgpu-release)) |

**Benchmark protocol to create DeltaOps' own numbers** (the missing evidence):
- Buy or borrow one N4500 Chromebook and one Chromebook Plus.
- Add a hidden `?bench=1` mode that plays a fixed route with a scripted camera for 60 s and logs frame times, draw calls and heap.
- Publish the median, p95 and 1% lows in the repo for each release.

### E8. Recommendations, each with its source

1. **Use the custom YAML/JSON schema as the runtime format and Google Sheets as the writing surface.** Exhaustive testing beats every off-the-shelf tool at this size, and spreadsheets are the most writer-friendly option with localisation columns built in. ([Choice of Games](https://choiceofgames.com/make-your-own-games/testing-choicescript-games-automatically); [small_pp_localization_tool](https://www.github.com/AntonBergaker/small_pp_localization_tool))
2. **Model each card as a storylet** (conditions, content, effects), with helper variants picked by "most specific wins" and a required fallback. ([Emily Short](https://emshort.blog/tag/quality-based-narrative/); [Yarn saliency](https://docs.yarnspinner.dev/next/write-yarn-scripts/syntax-basics/node-groups/saliency); [Ruskin/Valve](https://emshort.blog/2012/03/16/gdc-2012-talk-on-dynamic-dialogue/))
3. **Run all 729 routes per lab on every commit.** Fail the build on unreached variants. Commit an end-state snapshot so content changes show as diffs. ([ChoiceScript tests](https://choiceofgames.com/make-your-own-games/testing-choicescript-games-automatically); [Manning GDC 2019](https://gdcvault.com/play/1025981); [Ian Thomas](https://wildwinter.medium.com/ink-testing-tool-f79e958db017))
4. **Give every string and state a durable ID.** Keep text out of logic; localise by ID. ([PulseGeek](https://pulsegeek.com/articles/qa-branching-dialogue-and-quest-logic); [articy-js localisation](https://scenarioworld.github.io/articy-js))
5. **Declare world change as named switches and meter thresholds, never as coordinates in stage files.** ([Townscaper recipes](https://www.gamedeveloper.com/game-platforms/how-townscaper-works-a-story-four-games-in-the-making); [Roblox ModuleScript config](https://create.roblox.com/docs/scripting/module))
6. **Store recipes, not baked output.** Islands live as `.vox` source and are meshed with baked AO at build time. Ship small packs. ([Dreams/Evans](https://advances.realtimerendering.com/s2015/AlexEvans_SIGGRAPH-2015-sml.pdf); [ao-mesher](https://npmjs.com/package/ao-mesher))
7. **Use a palette, not textures**, for flat-colour voxels. Use KTX2 only for unavoidable bitmaps. ([Teardown "Spraycan"](https://blog.voxagon.se/); [cinevva](https://app.cinevva.com/guides/optimize-glb-for-web))
8. **Make WebGL 2 the baseline; enable WebGPU opportunistically through WebGPURenderer's auto-fallback**, and test both with `forceWebGL`. ([three.js manual](https://threejs.org/manual/en/webgpurenderer); [Chrome WebGPU](https://developer.chrome.com/blog/webgpu-release))
9. **Hold the budget at ≤ 100 draw calls, DPR ≤ 1–1.5, render-on-dirty**, and measure on a real N4500-class device with a bench mode. ([BatchedMesh](https://threejs.org/docs/pages/BatchedMesh.html); [hontran](https://www.hontran.dev/blog/three-js-performance-optimization); [Notebookcheck N4500](https://www.notebookcheck.com/Intel-Celeron-N4500-Prozessor-Benchmarks-und-Specs.514523.0.html))
10. **Precache the shell and packs with Workbox.** Add a staff "Prepare offline" page, `persist()`, no mid-session updates, and a USB kit fallback. ([Workbox](https://developer.chrome.com/docs/workbox/modules/workbox-precaching); [MDN storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria); [Minecraft Education](https://education.minecraft.net/content/dam/education-edition/learning-experiences/add-ons/Teachers%20Guide%20to%20Add-Ons.pdf))
11. **Build the UI as real DOM buttons over the canvas.** Put helper replies in an `aria-live` region; add read-aloud with offline `localService` voices plus recorded fallback; meet WCAG 2.2 AA target sizes (≥24 px; aim for 44+); honour `prefers-reduced-motion`. ([WCAG2ICT](https://www.access-board.gov/news/2024/10/08/wcag2ict-published-as-w3c-group-note/); [XAG](https://learn.microsoft.com/en-us/gaming/accessibility/guidelines); [Readium Web Speech](https://readium.org/speech/docs/WebSpeech.html); [Switch Access](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/accessibility/os/switch_access.md); [MDN reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion))
12. **Make the helper "intelligent" through memory (`chose`, flags), mood, `because` lines and timing beats.** Frame it as a fallible learner. Prototype timing with text-to-speech. ([Event[0]](https://gamedeveloper.com/design/making-a-chatbot-that-drives-a-narrative-in-sci-fi-exploration-game-i-event-0-i-); [Portal](https://www.gamedeveloper.com/game-platforms/best-of-gdc-the-secrets-of-i-portal-i-s-huge-success))
13. **Prototype each lab in plain primitives for about one week before any voxel art**, as Monument Valley did with cubes. Then build the art from a shared module library, so new themes are mostly re-skins. ([Monument Valley](https://gamedeveloper.com/design/designing-the-surprise-mobile-game-hit-i-monument-valley-i-); [Crossy Road / Qubicle](https://www.pocketgamer.biz/making-of-crossy-road/))
14. **Watch the tool's own limits.** If the writing ever moves to a visual tool like articy, keep exports in source control and plan for scale. Disco Elysium froze articy at ~1M words. ([PC Gamer](https://www.pcgamer.com/games/rpg/disco-elysium-had-so-much-text-it-broke-the-branching-narrative-software-we-were-writing-too-much))

---

## Gaps and caveats

- **No published Chromebook voxel or three.js benchmarks** were found. All frame-rate and draw-call figures are rules of thumb; E7 gives a protocol for measuring.
- **WebGPU on ChromeOS by GPU model** (Intel Gen11/12, Mali): no allow-list found. Detect it at runtime.
- **inkjs, Yarn web runtime and SugarCube bundle sizes:** not measured, because the search budget ran out. Check bundlephobia.com/package/inkjs.
- **Avowed GDC 2025 narrative analysis talk:** the page returned 403, so only its title is known. The Saltsea Chronicles/modl.ai case study did not appear on the fetched page.
- **BDA dyslexia style guide:** primary PDF not fetched, and secondary sources disagree on black text vs. dark-not-black.
- **Townscaper:** the grid method comes from the Sylves reconstruction of Stålberg's tweet plus Game Developer. The talk videos were not watched.
- **Super Mario Maker** format details are community reverse-engineering.
- **three.js r171 "production-ready" WebGPU** is a blog claim only.
- The web-search quota for this session ran out before the final few queries. A follow-up turn could close the gaps above.
