# 04 — Construction and scripting: how builders and narrative games are made, and a reference architecture for DeltaOps Learning's browser voxel labs

*Round 3. Prepared 4 November 2026. Main sources: the Exa connector (two `agent_run` research runs at "high" and "medium" effort, plus `web_search_exa` and `web_fetch_exa`), and my own measurements of npm packages. WebSearch was not needed.*

---

## Changes from round 2

**Gaps closed or claims fixed**

1. **Runtime bundle sizes are now measured, not guessed** (Part B2). I bundled each library with esbuild 0.25.0 (minified ESM) and measured gzip -9 and Brotli sizes:
   - inkjs 2.4.0: about 31 KB gz
   - Yarn web runtimes: 12 KB and 97 KB gz
   - a minimal three.js r187 WebGL scene: **139 KB gz**
   - the same scene on WebGPURenderer: **227 KB gz**
   - ajv: 41 KB gz
   - Workbox service-worker modules: 6 KB gz
   - the reference state reducer: **0.9 KB gz**

   As a result, round 2's "≤ 150 KB gz shell" budget is **not achievable** if three.js sits on the critical path. Part E7 has the revised budget and a "DOM first, 3D second" loading plan.
2. **"WebGPURenderer production-ready from r171": removed.** The r171 release notes make no such claim. The current three.js manual still calls the renderer "still in an experimental state" ([three.js manual](https://threejs.org/manual/en/webgpurenderer), [r171 release](https://github.com/mrdoob/three.js/releases/tag/r171)).
3. **Recommendation changed: ship the classic `WebGLRenderer` as the baseline, not `WebGPURenderer` with auto-fallback.** The reasons:
   - WebGPURenderer is still experimental (see item 2).
   - It costs about 88 KB gz more (my measurement).
   - WebGL 2 reaches 99.95% of sampled ChromeOS browsers, against 93.19% for WebGPU ([Web3D Survey WebGL2](https://web3dsurvey.com/webgl2), [Web3D Survey WebGPU](https://web3dsurvey.com/webgpu)).
   - Flat-colour voxel dioramas need nothing that only WebGPU offers.
4. **WebGPU on Chromebooks, by GPU: what is now known** (Part A5b). There is no per-model allow-list. The facts that exist:
   - ChromeOS needs Vulkan ([Chrome blog](https://developer.chrome.com/blog/webgpu-release)).
   - Chromium keeps a WebGPU adapter blocklist keyed on vendor, architecture and driver ([Chromium source](https://chromium.googlesource.com/chromium/src/+/lkgr/gpu/config/webgpu_blocklist_impl.cc)).
   - An August 2026 support thread shows an Intel Chromebook on ChromeOS 150 with `Vulkan: Disabled` and the `webgpu_on_vk_via_gl_interop` blocklist entry applied ([Figma forum](https://forum.figma.com/report-a-problem-6/figma-shaders-require-webgpu-support-on-hp-chromebook-56922)).
   - WebGPU compatibility mode shipped in Chrome 146. At launch it only reached Android OpenGL ES 3.1 devices; ChromeOS on OpenGL ES 3.1 is "being explored" ([Chrome 146 WebGPU](https://developer.chrome.com/blog/new-in-webgpu-146), [MDN BCD PR](https://github.com/mdn/browser-compat-data/pull/29551)).
   - three.js r187 already asks for a `featureLevel: 'compatibility'` adapter (from the source; Part A5b).
5. **Low-end benchmarks: found some, but still no voxel benchmark** (Part A6). New data points:
   - three.js forum measurements on a Chromebook and on UHD 620
   - WebGL Aquarium on a Celeron N3450 Chromebook
   - MotionMark and Basemark scores for N4500, N6000, Kompanio 520 and Kompanio 540 Chromebooks
   - a KTH thesis comparing WebGL and WebGPU on UHD 620

   One finding matters for design: on Chrome with Intel iGPUs, instancing and merging did **not** raise the frame rate in the three.js instancing demo. These GPUs are bound by fill rate and shading, not by draw calls ([three.js forum](https://discourse.threejs.org/t/merge-or-use-instance-and-native-render-make-no-difference-with-chrome-plus-integrated-graphics-card/12257)). The budget therefore now puts pixel count (DPR, resolution) ahead of draw calls.
6. **Avowed GDC 2025 talk: verified.** Speaker, title and method are now confirmed. It was *human* analysis inside the design tools, not an automated graph tool ([GDC schedule](https://schedule.gdconf.com/session/avowed-branching-narratives-shifting-from-qa-testing-to-analyzing/907172), [Game Developer](https://www.gamedeveloper.com/programming/how-avowed-s-qa-team-stomped-out-bugs-by-working-inside-the-design-tools)).
7. **modl.ai and Saltsea Chronicles: verified.** An exploratory bot made random choices overnight, across 60+ levels ([modl.ai](https://modl.ai/testing-content-heavy-games-with-ai-bots)).
8. **BDA Dyslexia Style Guide 2023: primary PDF now used.** It settles the round-2 conflict: "dark coloured text on a light (not white) background"; 12–14 pt (16–19 px); line spacing 1.5; 60–70 characters per sentence ([BDA PDF](https://cdn.bdadyslexia.org.uk/uploads/documents/Advice/style-guide/BDA-Style-Guide-2023.pdf?v=1680514568)). The accessibility table and the linter rules are updated to match.
9. **Townscaper: the talk is now cited directly**, not only the write-ups. In "Beyond Townscaper", Stålberg calls the quad grid "one of the main innovations" and names Wave Function Collapse as the tile solver ([YouTube](https://www.youtube.com/watch?v=Uxeo9c-PX-w)).
10. **Yarn Spinner on the web, clarified:**
    - The official "Try Yarn Spinner" runs in the browser.
    - A JavaScript/npm runtime was *announced* for Yarn Spinner 3 ([Yarn blog](https://www.yarnspinner.dev/blog/yarn-spinner-30-what-to-expect)).
    - The official TypeScript repo calls itself work-in-progress ([GitHub](https://github.com/YarnSpinnerTool/YarnSpinner-TypeScript)).
    - bondage.js is "not fully compliant with the yarn 2 format" ([GitHub](https://github.com/jhayley/bondage.js/)).
11. **Chromebook Plus spec corrected.** New devices need an AMD Ryzen 3 7000 or Intel Core i3 12th gen ([Google blog](https://blog.google/products-and-platforms/devices/chromebooks/chromebook-plus/)). Existing models qualify from Ryzen 3 5000 ([Google support](https://support.google.com/chromebook/answer/14128000?hl=en)). The minimum also includes 128 GB storage.
12. **Workbox maintenance status added.** Chrome's Aurora team now owns it, and recent releases are dependency-only: v7.4.0 in November 2025 and v7.4.1 later ([GitHub](https://github.com/GoogleChrome/workbox/), [releases](https://github.com/googlechrome/workbox/releases)). The service-worker plan keeps Workbox but sizes a hand-rolled fallback.
13. **The state reducer is now real, tested JavaScript**, replacing round 2's pseudo-code. I ran all 729 routes of a toy pack through it: **47 ms** in Node 22, on a 4-vCPU cloud Xeon. This replaces round 2's unmeasured "well under a second" and "< 5 KB".

**Kept and improved:** the lab-pack layout (E1), the stage JSON Schema (E2, now with a `read_aloud` audio field and BDA-driven lint fields), the test harness (E4, with an added "renderer matrix" job), CI (E5), the offline plan (E6), the performance budget (E7, rebuilt), and the recommendations (E8, re-ranked).

---

## Part A — How successful games build their worlds

### A1. Townscaper

- **Grid.** In "Beyond Townscaper" (Sweden Game Conference 2021), Stålberg says "one of the main innovations going into townscaper is the grid" and that "the grid is actually entirely made out of quads not squares". Because the quads can be skewed, buildings can look pentagonal or hexagonal while every module stays square-cornered ([YouTube](https://www.youtube.com/watch?v=Uxeo9c-PX-w)). Boris the Brave's Sylves tutorial reconstructs the steps, based on Stålberg's 2019 tweet ([Sylves](https://boristhebrave.com/docs/sylves/1/articles/tutorials/townscaper.html)):
  1. fill a hexagon with triangles,
  2. merge random pairs into quads,
  3. subdivide,
  4. weld and relax,
  5. seed each hex from a hash of its position.
- **Solver.** Stålberg: "it's running the algorithm called the wave function collapse … it can figure out how to configure a coherent level out of the tiles that you build". He describes a *separate* prop-placement system for boots, post boxes, bushes, windows and doors ([YouTube](https://www.youtube.com/watch?v=Uxeo9c-PX-w)).
- **Other details, from Game Developer:** geometry is placed at cell corners, marching-cubes style; WFC re-solves the neighbourhood around each change; "recipe" props have conditions (a garden needs an enclosed area); windows are cut with a stencil; the solver fails silently; a re-skin would need about 500 tiles, and Bad North uses 300+ ([Game Developer](https://www.gamedeveloper.com/game-platforms/how-townscaper-works-a-story-four-games-in-the-making)).
- **Dual-grid tiling:** a typical terrain set drops from 14 tiles to 5 ([dual-grid Godot](https://github.com/jamesplease/dual-grid-tilemap-system-godot-gdscript)).
- **What DeltaOps can borrow:** hand-made modules, a separate decoration/prop pass, and rule-gated "recipe" props. These become *world switches* and *meter thresholds* in E2.

### A2. Tiny Glade

Tiny Glade started as a weekend procedural wall generator, built on a modified Bevy. The team describes procedural art as "detailed rules that guide the system", and unexpected player builds found in playtests became features ([80.lv](https://80.lv/articles/exclusive-tiny-glade-developers-discuss-bevy-proceduralism-publishers-cozy-games/)).

**Lesson:** procedural *assistance* inside a hand-composed scene.

### A3. Teardown

- **From Gustafsson's own blog:** 8-bit palettes (255 materials, one byte per voxel), packed into a 256-wide texture with per-material roughness, emissive and reflectivity ("The Spraycan"). The renderer moved to "full raytracing in voxel space" ([blog.voxagon.se](https://blog.voxagon.se/)).
- **From a frame breakdown:** deferred OpenGL 3.3; a voxel DDA (step-by-step ray march) through mipmapped 3D textures; shadow volumes traced by ray march; two AO rays per pixel; TAA and denoisers ([Montoya](https://juandiegomontoya.github.io/teardown_breakdown.html)).
- **What transfers to Chromebooks:** only the palette idea.

### A4. Monument Valley, Crossy Road, Dreams, Mario Maker, Roblox, Minecraft Education

(Carried over from round 2; sources unchanged.)

- **Monument Valley:**
  - levels were blocked out in Unity cubes, then given baked lightmaps;
  - each level was "a single striking design object";
  - an idea got about a week of prototyping before a go/no-go decision.

  ([Game Developer](https://gamedeveloper.com/design/designing-the-surprise-mobile-game-hit-i-monument-valley-i-), [MCV](https://www.mcvuk.com/development/unity-focus-monument-valley))
- **Crossy Road:**
  - the art was made in **Qubicle** by Ben Weatherall ([Pocket Gamer.biz](https://www.pocketgamer.biz/making-of-crossy-road/));
  - the game took three people 12 weeks ([Pursuit](https://pursuit.unimelb.edu.au/articles/the-crossy-road-to-success)).
- **Dreams:**
  - scenes are stored as edit lists of CSG (constructive solid geometry) operations, evaluated on the fly, so that user content stays "minimal size to download" ([Evans, SIGGRAPH 2015](https://advances.realtimerendering.com/s2015/AlexEvans_SIGGRAPH-2015-sml.pdf));
  - creators start from templates and remix ([Game Developer](https://gamedeveloper.com/design/how-media-molecule-designed-a-fun-and-robust-toolset-for-i-dreams-i-)).

  **Lesson:** store recipes, not baked output.
- **Super Mario Maker 2:** a course is compact declarative data: theme, style, and a list of objects. This comes from community reverse-engineering ([SMMDB post](https://axebps-redlib.hf.space/r/MarioMaker2/duplicates/dthkov)).
- **Roblox:** keep shared configuration in ModuleScripts that return tables ([Roblox docs](https://create.roblox.com/docs/scripting/module)).
- **Minecraft Education:**
  - self-contained `.mcworld`/`.mctemplate` files that can travel by USB ([Teacher's Guide](https://education.minecraft.net/content/dam/education-edition/learning-experiences/add-ons/Teachers%20Guide%20to%20Add-Ons.pdf));
  - import failures across versions are a recurring complaint ([community](https://edusupport.minecraft.net/hc/en-us/community/posts/30079971244692-World-Import-failed-Minecraft-Education-v1-21-05)).

  **Lesson:** version the pack format and validate packs on load.

### A5. Voxel meshing, lighting and renderer choice

**a) Meshing and draw-call tools**
- **Greedy meshing:** see Lysenko's "Meshing in a block world" (0fps, 2012). `ao-mesher` adds per-vertex AO ([npm](https://npmjs.com/package/ao-mesher)). Merge faces only when their AO matches as well as their type ([jME](https://hub.jmonkeyengine.org/t/greedy-meshing-for-complex-voxel-data/28017)). Mesh static islands **at build time**.
- **BatchedMesh** draws many different geometries that share one material. All geometries must match the first one's index usage and attribute layout ([three.js docs](https://threejs.org/docs/pages/BatchedMesh.html)).
  - **New, from the r187 source:** when `WEBGL_multi_draw` is missing, `WebGLRenderer` falls back to a loop of one draw per geometry. The scene still renders, but without the draw-call saving (`src/renderers/WebGLRenderer.js`, around line 1321, in [three@0.187.0 on npm](https://www.npmjs.com/package/three/v/0.187.0); repo [mrdoob/three.js](https://github.com/mrdoob/three.js)).
  - `WEBGL_multi_draw` is available on 92.88% of all sampled WebGL 2 browsers ([Web3D Survey](https://web3dsurvey.com/webgl2)). I did not obtain a ChromeOS-only figure.
- **InstancedMesh** suits many copies of one geometry ([forum](https://discourse.threejs.org/t/how-to-choose-between-instancedmesh-and-batchedmesh/81221)).

**b) WebGPU on ChromeOS: what is known per GPU**
- **Launch:** Chrome 113 shipped WebGPU "on ChromeOS devices with Vulkan support" ([Chrome blog](https://developer.chrome.com/blog/webgpu-release)). Dawn's Vulkan backend powers WebGPU on ChromeOS and Android. The baseline is Vulkan 1.1, or 1.0 with `VK_KHR_maintenance1/2`, plus `fragmentStoresAndAtomics`, `fullDrawIndexUint32`, `maxImageArrayLayers ≥ 256`, and BC or ETC2+ASTC textures ([Khronos/Google slides, 2024](https://www.khronos.org/assets/uploads/developers/presentations/WebGPU_Meetup_-_WebGPU_on_Android.pdf), [gpuweb System Requirements](https://github.com/gpuweb/gpuweb/wiki/System-Requirements)). The requirements page notes that most Mali-G51+ devices should qualify, but no Mali target has been chosen ([gpuweb](https://github.com/gpuweb/gpuweb/wiki/System-Requirements)).
- **Blocklist:** Chromium keeps a WebGPU adapter blocklist with patterns of the form `vendorId(:deviceIdOrArchitecture(:driverDescription)?)?` ([Chromium source](https://chromium.googlesource.com/chromium/src/+/lkgr/gpu/config/webgpu_blocklist_impl.cc)). On a blocked device, `chrome://gpu` says "WebGPU has been disabled via blocklist or the command line" ([Chrome troubleshooting](https://developer.chrome.com/docs/web-platform/webgpu/troubleshooting-tips)).
- **Real case, August 2026:** an HP Intel Chromebook on ChromeOS 150 showed `Vulkan: Disabled` and the `webgpu_on_vk_via_gl_interop` entry, citing crbug 442791440. A Figma staff member explained that "On your Intel Chromebook, WebGPU's only route to the GPU is the Vulkan-via-GL-interop path, and Chrome has that path switched off" ([Figma forum](https://forum.figma.com/report-a-problem-6/figma-shaders-require-webgpu-support-on-hp-chromebook-56922)). This is a vendor support reply, not Chrome documentation, but it is a concrete Intel Chromebook where full WebGPU is unavailable in 2026.
- **Population data** (Web3D Survey, opt-in samples from sites that embed it):
  - WebGPU is available on **93.19%** of sampled "Chromium OS" browsers, against 87.81% on Windows ([Web3D Survey WebGPU](https://web3dsurvey.com/webgpu)).
  - WebGL 2 is available on **99.95%** on ChromeOS ([Web3D Survey WebGL2](https://web3dsurvey.com/webgl2)).
  - Among ChromeOS devices that *do* expose WebGPU, core features are present on Intel Gen 9 (98.9%), Gen 11 (99.47%), Gen 12LP (99.75%), ARM Bifrost (99.13%) and Valhall (100%) ([Web3D Survey, Chromium OS](https://web3dsurvey.com/webgpu/features/core-features-and-limits/platform/Chromium%20OS)).

  This is the closest thing to a per-GPU table that exists. It is not an allow-list.
- **Compatibility mode:**
  - The intent to ship says it "will immediately be available on Android, Android WebView, ChromeOS, Mac, and Windows, where hardware support is available" ([blink-dev](https://groups.google.com/a/chromium.org/g/blink-dev/c/N3RlLGCOTJ4)).
  - The Chrome 146 post says it starts with Android, with ChromeOS on OpenGL ES 3.1 still "exploring" ([Chrome 146](https://developer.chrome.com/blog/new-in-webgpu-146)).
  - MDN's compatibility data says that only old Android OpenGL ES 3.1 devices are supported at the moment ([MDN BCD PR](https://github.com/mdn/browser-compat-data/pull/29551)).
- **three.js r187** requests `featureLevel: 'compatibility'`, then sets `compatibilityMode = !device.features.has('core-features-and-limits')` (`src/renderers/webgpu/WebGPUBackend.js`, lines 217 and 258, in [three@0.187.0](https://www.npmjs.com/package/three/v/0.187.0)). It will therefore take a compatibility adapter wherever Chrome offers one.
- **Is it still experimental?** Yes. The three.js manual says "The renderer itself is still in an experimental state although its maturity level has been greatly improved in the last years". The same page says `ShaderMaterial`, `RawShaderMaterial`, `onBeforeCompile` and `EffectComposer` are not supported ([three.js manual](https://threejs.org/manual/en/webgpurenderer)).

**Conclusion (changed from round 2):**
- Build on `WebGLRenderer`, from the `three` entry point.
- Treat WebGPU as a later experiment, not a runtime switch in version 1.
- Log `chrome://gpu`-style facts (WebGL renderer string, `navigator.gpu` adapter or null) in bench mode, so each venue's fleet is known (E7).

**c) The diorama look on low-end GPUs.** This is my synthesis, consistent with the fill-rate finding in A6:
- AO baked into vertex colours,
- a hemisphere light plus one directional light,
- blob shadows, or one small shadow map,
- no SSAO, bloom or post-processing.

### A6. Low-end performance: the published evidence

No published benchmark of a three.js *voxel* scene on a Chromebook was found, even after a 60-search Exa run. The nearest real data:

| Device / GPU | Test | Result | Source |
|---|---|---|---|
| Chromebook, Intel HD (model not given) | three.js low-poly tunnel with spotlights | 10 fps, later 5 fps. 236 draw calls / 1,612 triangles, reduced to 9 calls / 1,248 triangles after merging | [three.js forum, 2019](https://discourse.threejs.org/t/infinite-tunnel-with-ceiling-spotlights/9247) |
| Laptop, Intel UHD 620, Chrome | three.js `webgl_instancing_performance` | Chrome: naive 27 / merged 25 / instanced 25 fps. Firefox: 18 / 22 / 20 fps. Linked to crbug 1043925 | [three.js forum, 2020](https://discourse.threejs.org/t/merge-or-use-instance-and-native-render-make-no-difference-with-chrome-plus-integrated-graphics-card/12257) |
| Windows 10, Chrome 103 (GPU not given) | same demo, 10,000 objects | naive 19 / merged 16 / instanced 17 fps | [three.js forum, 2022](https://discourse.threejs.org/t/is-it-strange-threejs-showcase-webgl-instancing-performance/40903) |
| Dell Chromebook 5190, Celeron N3450, 4 GB | WebGL Aquarium | 500 fish at 46 fps | [UltrabookReview](https://www.ultrabookreview.com/20042-dell-chromebook-5190/) |
| Acer Chromebook 317, Celeron N4500, 4 GB | Basemark Web 3.0 | 500.83 | [Expert Reviews](https://www.expertreviews.co.uk/technology/laptops/acer-chromebook-317-review) |
| Acer Chromebook 317, Pentium Silver N6000, 8 GB | MotionMark / Basemark Web 3.0 | 265.18 / 615.96 | [Frandroid](https://www.frandroid.com/marques/acer/1324037_test-de-acer-chromebook-317) |
| ASUS CM30, Kompanio 520 (Mali-G52 MC2), ChromeOS 129 | MotionMark | 521.25 | [zenn.dev](https://zenn.dev/igrep/articles/2024-10-3-chromebook-benchmark) |
| Lenovo Chromebook m 14, Kompanio 540 | MotionMark | 768 | [helentech](https://helentech.jp/review-kompanio-540-lenovo-chromebook-m-14/) |
| Acer Spin 511, Celeron N4120 / UHD 600 (native, not browser) | GFXBench Aztec Normal onscreen | 18 fps | [Notebookcheck](https://www.notebookcheck.net/Acer-Chromebook-Spin-511-R752T-in-review-The-2-in-1-laptop-for-the-classroom.580307.0.html) |
| ZenBook 14, i7-8565U / UHD 620, Chrome Canary | KTH thesis, 2D particles, WebGL vs WebGPU | Modelled 60 fps limits: point particles 374k (WebGL) vs 2.1M (WebGPU); 2×2 quads 310k vs 398k | [KTH thesis](https://kth.diva-portal.org/smash/get/diva2:1945245/FULLTEXT02.pdf) |

**How to read this:**
- **Fill-rate bound, not draw-call bound.** On Intel iGPUs in Chrome, merging and instancing gave no gain in the instancing demo. The bottleneck was pixel and shading work, or the ANGLE path (Chrome's translation layer to the native graphics API), not CPU draw submission ([forum](https://discourse.threejs.org/t/merge-or-use-instance-and-native-render-make-no-difference-with-chrome-plus-integrated-graphics-card/12257)). The tunnel case shows the reverse: going from 236 to 9 calls was the advice given. **Keep draw calls low and also keep pixels low.** On 1366×768 floor devices, DPR 1 matters more than batching.
- **Composite scores are hard to compare.** MotionMark and Basemark are 2D/composite tests, and the zenn author warns that target frame rates and resolutions differ between runs ([zenn.dev](https://zenn.dev/igrep/articles/2024-10-3-chromebook-benchmark)). As a rough guide, ARM Kompanio 520/540 Chromebooks land in the same band as, or above, Intel N-series devices.
- **WebGPU's gains depend on the workload.** On UHD 620 they are large for compute-driven point particles but small for quads (KTH). Static voxel islands look like the quad case.
- **Floor device facts (unchanged):** the Celeron N4500 has UHD graphics with 16 EUs at 350–750 MHz ([Notebookcheck](https://www.notebookcheck.com/Intel-Celeron-N4500-Prozessor-Benchmarks-und-Specs.514523.0.html)) and a 3DMark Time Spy graphics score of about 157 ([CPU-Monkey](https://www.cpu-monkey.com/en/benchmark-intel_celeron_n4500-3dmark_time_spy_graphics_score)).
- **Chromebook Plus:** i3 12th gen or Ryzen 3 7000 for new devices, 8 GB RAM, 128 GB storage, FHD IPS ([Google blog](https://blog.google/products-and-platforms/devices/chromebooks/chromebook-plus/)). Ryzen 3 5000 models qualify through updates ([Google support](https://support.google.com/chromebook/answer/14128000?hl=en)).
- **Textures:** flat-colour voxels need almost none. A palette or vertex colours plus Meshopt glTF or a custom binary is the leanest route. The KTX2/Meshopt figures from round 2 are secondary sources ([cinevva](https://app.cinevva.com/guides/optimize-glb-for-web)).
- **Load budgets:** web.dev's baseline is under 170 KB of compressed critical-path resources and under 5 s to interactive on slow 3G ([web.dev](https://web.dev/articles/your-first-performance-budget), [Russell 2017](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets)). Part B2 shows three.js alone almost uses this up, so see E6/E7.

---

## Part B — Narrative and branching tools

### B1. Tool comparison (updated)

| Option | Writer friendliness | Testability | Localisation | Web runtime (measured, see B2) | Fit for 6×3 labs |
|---|---|---|---|---|---|
| **ink + inkjs 2.4.0** | High; Inky editor; built to "write quickly, read back quickly" ([Ingold](https://medium.com/game-writing-guide/introduction-to-ink-3e6c224865f8)) | Good: random-walk testers ([Ian Thomas](https://wildwinter.medium.com/ink-testing-tool-f79e958db017)) | Weak natively (text inline) | **31 KB gz** runtime; **61 KB gz** with the in-browser compiler | Overkill unless dialogue grows within stages |
| **Yarn Spinner 3** | High; storylets through node groups and saliency ([docs](https://docs.yarnspinner.dev/next/write-yarn-scripts/syntax-basics/node-groups/saliency)) | Good; Manning's GDC 2019 talk applies symbolic execution to find unreachable lines ([GDC Vault](https://gdcvault.com/play/1025981)) | Strong (line IDs) | **No official JS runtime yet.** One was announced for YS3 ([blog](https://www.yarnspinner.dev/blog/yarn-spinner-30-what-to-expect)) and the TypeScript repo is WIP ([GitHub](https://github.com/YarnSpinnerTool/YarnSpinner-TypeScript)). Community options: bondage.js, "not fully compliant with the yarn 2 format" ([GitHub](https://github.com/jhayley/bondage.js/)), **97 KB gz**; yarn-bound 0.5.5, **12 KB gz** | Good model, risky web runtime |
| **Twine + Tweego** | Very high for beginners | Weak ([intfiction](https://intfiction.org/t/tweego-v2-1-1/44412)) | Weak | Whole HTML story format (not measured) | Paper prototyping only |
| **articy:draft X** | High for teams; ZA/UM chose it because writers and programmers both liked it ([ZA/UM](https://discoelysium.com/devblog/2016/02/26/peculiarities-eastern-european-game-development)) | Via export and scripts | .xlsx export ([articy-js](https://scenarioworld.github.io/articy-js)) | articy-js (not measured) | Licence cost; Disco Elysium's text "broke" it ([PC Gamer](https://www.pcgamer.com/games/rpg/disco-elysium-had-so-much-text-it-broke-the-branching-narrative-software-we-were-writing-too-much)) |
| **ChoiceScript** (reference) | High | **Best in class:** `quicktest` covers every option and branch; `randomtest` runs 10,000+ seeded plays with line hit counts ([Choice of Games](https://choiceofgames.com/make-your-own-games/testing-choicescript-games-automatically)) | Weak | Own engine | Copy the testing model |
| **Custom YAML/JSON + schema + linter** | Medium (high behind a sheet) | **Exhaustive: 729 routes in 47 ms** (E3) | Strong (string IDs) | **Reducer 0.9 KB gz** (measured) | **Recommended** |
| **Spreadsheet as source** | Highest for non-programmers; one column per locale ([small_pp_localization_tool](https://www.github.com/AntonBergaker/small_pp_localization_tool)) | Through the build linter | Native | n/a (build step) | **Recommended writing surface** |

### B2. Measured runtime sizes (new)

**Method:**
- `npm pack`, then a bundle of a minimal entry point: `esbuild --bundle --minify --format=esm`, esbuild 0.25.0, Node 22.
- Sizes measured with `gzip -9`, and Brotli through Node's `zlib.brotliCompressSync` at default quality 11.
- Package versions are those current on npm on 4 November 2026 ([npm three](https://www.npmjs.com/package/three), [npm inkjs](https://www.npmjs.com/package/inkjs)).
- Entry points:
  - "three WebGL minimal" imports `WebGLRenderer, Scene, PerspectiveCamera, BufferGeometry, MeshLambertMaterial, HemisphereLight, DirectionalLight, InstancedMesh, BatchedMesh`.
  - "WebGPU minimal" imports the same set, plus `MeshLambertNodeMaterial`, from `three/webgpu`.

| Package / bundle | Minified | gzip -9 | Brotli |
|---|---|---|---|
| three r187, WebGL minimal scene | 559 KB | **139 KB** | 115 KB |
| three r187, WebGPURenderer minimal scene | 840 KB | **227 KB** | 185 KB |
| three r187 full `three.module.js` + `three.core.js` (unminified files as shipped) | 659 KB + 1,475 KB | 129 KB + 290 KB | — |
| inkjs 2.4.0 `Story` runtime | 128 KB | **31 KB** | 28 KB |
| inkjs 2.4.0 full (with compiler) | 249 KB | 61 KB | — |
| bondage 2.2.0 `bondage.min.js` | 339 KB | 97 KB | — |
| yarn-bound 0.5.5 `yarn-bound.min.js` | 48 KB | 12 KB | — |
| ajv 8.20.0 (draft 2020-12 class) | 135 KB | 41 KB | 36 KB |
| workbox-precaching + routing + strategies 7.4.1 (service worker) | 17 KB | **5.8 KB** | 5.3 KB |
| DeltaOps reducer (E3) | 1.9 KB | **0.9 KB** | — |

**What this means:**
- **three.js is the shell.** Tree-shaking barely helps: the minimal WebGL scene still pulls in most of `three.core.js`. Round 2's "shell ≤ 150 KB gz" therefore only works if the 3D chunk is *off* the critical path (E7).
- **Do not ship ajv or a YAML parser to the browser.** Validate in CI, and ship pre-validated JSON. That saves about 41 KB gz.
- **inkjs at 31 KB gz is affordable** if a lab ever needs real in-stage dialogue. It is still unnecessary for 6×3 card choices.

### B3. Automated narrative testing by studio (updated)

- **Choice of Games:** `quicktest` plus a seeded `randomtest` with per-line hit counts, both required before publication ([Choice of Games](https://choiceofgames.com/make-your-own-games/testing-choicescript-games-automatically)).
- **Secret Lab / Yarn Spinner:** control-flow graphs and symbolic execution to prove a line is unreachable ([GDC 2019](https://gdcvault.com/play/1025981)).
- **inkle:** testing built into the writing workflow; scenes are tested in isolation ([GDC Vault](https://gdcvault.com/play/1025149/-Heaven-s-Vault-Creating), [Game Developer](https://gamedeveloper.com/design/knockin-on-i-heaven-s-vault-i-how-inkle-designed-its-first-3d-game)).
- **Ian Thomas (ink):** thousands of random runs, then a CSV of line visit counts ([Medium](https://wildwinter.medium.com/ink-testing-tool-f79e958db017)).
- **Obsidian, *Avowed* (verified this round):**
  - **Talk:** "'Avowed' Branching Narratives: Shifting from QA Testing to Analyzing", by David Benefield, QA Lead, GDC 2025 ([GDC schedule](https://schedule.gdconf.com/session/avowed-branching-narratives-shifting-from-qa-testing-to-analyzing/907172)).
  - **Method:** QA *analysts* inspect quest and dialogue node trees in Obsidian's narrative tools and Unreal before content reaches a build. In "joint analysis sessions", "the designer calls out every trigger and script used on the quest, literally pulling them up on a shared screen for the analyst to see and ask questions" ([Game Developer](https://www.gamedeveloper.com/programming/how-avowed-s-qa-team-stomped-out-bugs-by-working-inside-the-design-tools)).
  - **Advice:** "train your QA team using whatever methods you're training your designers" ([GDC schedule](https://schedule.gdconf.com/session/avowed-branching-narratives-shifting-from-qa-testing-to-analyzing/907172)).
  - **Lesson for DeltaOps:** pair a reviewer with the writer on the coverage heat map (E4), not only on play-throughs.
- **modl.ai on *Saltsea Chronicles* (Die Gute Fabrik; new this round):** "modl.ai leveraged its out-of-the box testing bot solution and customized it to simulate random interactions and choices to fully test a chapter of Saltsea Chronicles and its mini-card game".
  - It found crashes, blocked progression, and invisible-but-clickable UI buttons.
  - More than 60 levels were tested overnight.
  - A developer: "I just had to spend several minutes to review spreadsheet" ([modl.ai](https://modl.ai/testing-content-heavy-games-with-ai-bots)).
  - **Lesson:** a random-choice bot in the *real UI* finds UI bugs that a content-level test misses. This backs the Playwright layer in E4.
- **Ubisoft, *The Division*:** "client bots" that drive the player ([Game Developer](https://gamedeveloper.com/programming/see-how-ubisoft-tested-i-the-division-i-with-automated-players-at-gdc-2019-)).
- **Valve:** a rule database where the most specific rule wins and fallbacks are required ([Emily Short](https://emshort.blog/2012/03/16/gdc-2012-talk-on-dynamic-dialogue/)).

**Takeaway (unchanged and now measured).** At 729 routes, DeltaOps can test every route on every commit: 47 ms per lab in my prototype. It should still borrow from the others:
- ChoiceScript's hit counts,
- Manning's static reachability,
- seeded randomness,
- modl.ai's random walks through the real UI,
- Obsidian's paired review.

---

## Part C — Accessibility

### C1. Which standards apply

- **WCAG2ICT** (W3C Group Note, October 2024) applies WCAG to non-web software and adds no new requirements ([US Access Board](https://www.access-board.gov/news/2024/10/08/wcag2ict-published-as-w3c-group-note/)).
- A browser lab is web content, so **WCAG 2.2 AA** is the sensible baseline for the UI layer.
- The **Game Accessibility Guidelines** ([GAG](https://gameaccessibilityguidelines.com/why-and-how/)) and the **Xbox Accessibility Guidelines** ([XAG](https://learn.microsoft.com/en-us/gaming/accessibility/guidelines)) cover game-specific needs.

### C2. Criteria and implementation (updated with the BDA primary)

| Need | Requirement | Implementation |
|---|---|---|
| Touch targets | WCAG 2.2 **2.5.8**: 24×24 CSS px ([Deque](https://dequeuniversity.com/rules/axe/4.8/target-size)) | Cards ≥ 88 px tall; every control ≥ 44 px |
| No drag | **2.5.7** single-pointer alternative ([Perficient](https://blogs.perficient.com/2021/09/30/a-new-standard-for-interacting-with-the-web-beyond-the-keyboard-and-screen-reader)) | Tap to choose; camera buttons |
| Focus not obscured | **2.4.11** ([getwcag](https://getwcag.com/en/wcag-2-2-checklist)) | Overlay never covers the focused card |
| Contrast | XAG 102 ([XAG 102](https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/102)) | Text on solid panels only; high-contrast token set |
| Colour blindness | GAG: don't rely on colour alone ([GAG](https://gameaccessibilityguidelines.com/why-and-how/)) | Icon + number + pattern on meters; world changes are also shape changes |
| Screen narration | XAG 106 ([XAG](https://learn.microsoft.com/en-us/gaming/accessibility/guidelines)) | Real DOM; helper replies in `aria-live="polite"`; text description of world changes |
| Read-aloud | Web Speech `speechSynthesis`: voices load asynchronously; `localService` marks offline voices ([Readium](https://readium.org/speech/docs/WebSpeech.html)) | "Read to me" on every card; prefer a `localService` en-GB voice; recorded OGG for key helper lines (schema field `read_aloud`) |
| Switch access | ChromeOS Switch Access follows focus ([Chromium docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/accessibility/os/switch_access.md)) | `<button>` cards; no hover-only or canvas-only actions; no time limits |
| Reduced motion | `prefers-reduced-motion` ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)) | Pans become cuts; plus an in-app toggle |
| **Dyslexia (BDA 2023 primary)** | "Font size should be 12-14 point or equivalent (e.g. 1-1.2em / 16-19 px)"; headings at least 20% larger; "Use dark coloured text on a light (not white) background", with cream or soft pastel suggested; letter spacing about 35% of average letter width; word spacing ≥ 3.5× letter spacing; line spacing "1.5 / 150%"; left-aligned, not justified, no multiple columns; "Write short simple sentences: 60 to 70 characters is optimal" ([BDA Style Guide 2023](https://cdn.bdadyslexia.org.uk/uploads/documents/Advice/style-guide/BDA-Style-Guide-2023.pdf?v=1680514568)) | Body text 18–19 px at 1366×768 (top of the BDA range, since children read at arm's length on shared screens); `line-height: 1.5`; slight `letter-spacing`; navy-on-cream panels (fits the house style); **linter: helper sentences ≤ 70 characters**, card labels ≤ 40 |
| Cognitive | GAG: remind players of the objective ([GAG](https://gameaccessibilityguidelines.com/why-and-how/)) | Persistent "Stage 3 of 6" header; separate volume sliders |

---

## Part D — Scripted "fake AI"

**Patterns from other games (carried over from round 2):**
- **Event[0]:** tags, short-term memory, moods, and an "old, imperfect program" framing ([Game Developer](https://gamedeveloper.com/design/making-a-chatbot-that-drives-a-narrative-in-sci-fi-exploration-game-i-event-0-i-)).
- **Façade:** discourse acts ([Mateas & Stern 2004](https://www.cp.eng.chula.ac.th/~vishnu/gameResearch/story_november_2005/MateasSternTIDSE04.pdf)).
- **Portal:** timing prototyped with TTS ([Game Developer](https://www.gamedeveloper.com/game-platforms/best-of-gdc-the-secrets-of-i-portal-i-s-huge-success)).

**Built into the schema:** helper variants conditioned on memory, `sure` plus `mood`, a `delay_ms` thinking beat, and `because` lines.

**If a live model is ever considered:** DfE's generative AI product safety expectations ([GOV.UK](https://www.gov.uk/government/publications/generative-ai-product-safety-expectations/generative-ai-product-safety-expectations)) and the ICO Children's Code ([TIGA summary](https://tiga.org/?p=9917)). Not re-checked this round.

---

## Part E — Reference architecture for DeltaOps Learning labs

### E1. Lab pack layout (one change: `audio/` keyed by string ID, and a `bench/` route)

```
content/                                  # source of truth (git)
  engine-vocab/
    meters.yaml  moods.yaml  icons.yaml  cameras.yaml
    switches.schema.json
  labs/
    pond/                                 # Eco AI Explorer
      lab.yaml                            # id, pack_version, schema_version, theme, meters, artefact
      stages/s1.yaml … s6.yaml            # schema E2
      world/island.vox  props/*.vox  switches.yaml  thresholds.yaml
      strings/en-GB.csv  cy.csv           # id,text,notes,max_chars,reading_age
      audio/en-GB/<string-id>.ogg         # optional recorded lines, named by string id
      facilitator/cards.yaml
      artefact/template.yaml
      tests/golden.yaml                   # 5–10 pinned routes
      bench/route.txt                     # fixed route + camera script for ?bench=1
    rover/ lighthouse/ londinium/ ecotown/ rivertown/ grow/ moon/ kick/ beat/
build/ (generated, never hand-edited)
  dist/app/                               # shell: DOM UI + reducer (critical path)
  dist/app/3d.<hash>.js                   # three.js + scene code (lazy chunk)
  dist/labs/pond/<contenthash>/pack.json  strings.en-GB.json  world.bin  audio/…
  dist/labs/index.json
  coverage/pond.html  pond.csv  snapshots/pond.ends.json
```

### E2. Stage JSON Schema (draft 2020-12)

This is round 2's schema with three additions:
- `read_aloud` on helper variants,
- `max_chars` enforcement moved to the strings CSV,
- `schema_version` on the lab manifest (Minecraft Education lesson, A4).

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
    "camera": { "type": "string" },
    "facilitator": {
      "type": "object", "required": ["ask"], "additionalProperties": false,
      "properties": {
        "ask": { "$ref": "#/$defs/stringId" },
        "listen_for": { "type": "array", "items": { "$ref": "#/$defs/stringId" } },
        "if_stuck": { "$ref": "#/$defs/stringId" }
      }
    },
    "cards": { "type": "array", "minItems": 3, "maxItems": 3, "items": { "$ref": "#/$defs/card" } }
  },
  "$defs": {
    "stringId": { "type": "string", "pattern": "^[a-z0-9]+(\\.[a-z0-9_]+)+$" },
    "card": {
      "type": "object", "required": ["id", "label", "icon", "helper", "effects"], "additionalProperties": false,
      "properties": {
        "id": { "enum": ["a", "b", "c"] },
        "label": { "$ref": "#/$defs/stringId" },
        "icon": { "type": "string" },
        "vague": { "type": "boolean", "description": "exactly one card per stage is the deliberately vague card (linted)" },
        "concept": { "type": "string" },
        "helper": { "type": "array", "minItems": 1, "items": { "$ref": "#/$defs/helperVariant" } },
        "effects": { "$ref": "#/$defs/effects" }
      }
    },
    "helperVariant": {
      "type": "object", "required": ["when", "guess", "sure", "line"], "additionalProperties": false,
      "properties": {
        "when": { "$ref": "#/$defs/condition" },
        "guess": { "$ref": "#/$defs/stringId" },
        "sure": { "type": "integer", "minimum": 0, "maximum": 100 },
        "mood": { "enum": ["curious", "confident", "unsure", "puzzled", "proud", "sorry"] },
        "line": { "$ref": "#/$defs/stringId" },
        "because": { "$ref": "#/$defs/stringId" },
        "read_aloud": { "enum": ["tts", "recorded", "both"], "default": "tts" },
        "delay_ms": { "type": "integer", "minimum": 0, "maximum": 2500, "default": 900 },
        "weight": { "type": "integer", "minimum": 1, "default": 1 }
      }
    },
    "condition": {
      "type": "object", "additionalProperties": false,
      "properties": {
        "meters": { "type": "object", "additionalProperties": { "type": "string", "pattern": "^(<|<=|>|>=|==)-?[0-9]+$" } },
        "flags": { "type": "array", "items": { "type": "string" } },
        "not_flags": { "type": "array", "items": { "type": "string" } },
        "chose": { "type": "object", "propertyNames": { "pattern": "^s[1-6]$" }, "additionalProperties": { "enum": ["a", "b", "c"] } }
      }
    },
    "effects": {
      "type": "object", "additionalProperties": false,
      "properties": {
        "meters": { "type": "object", "additionalProperties": { "type": "integer", "minimum": -50, "maximum": 50 } },
        "flags": { "type": "array", "items": { "type": "string" } },
        "world": { "type": "array", "items": { "oneOf": [
          { "type": "object", "required": ["set", "to"], "additionalProperties": false,
            "properties": { "set": { "type": "string" }, "to": { "type": "string" } } },
          { "type": "object", "required": ["spawn", "at"], "additionalProperties": false,
            "properties": { "spawn": { "type": "string" }, "at": { "type": "string" }, "n": { "type": "integer", "minimum": 1, "maximum": 8 } } }
        ] } },
        "artefact": { "$ref": "#/$defs/stringId" }
      }
    }
  }
}
```

The worked YAML example from round 2 (`pond.s3`, with three helper variants of 92%, 58% and 74% sure) still validates against this schema. The thresholds pattern (`wildlife: [{at: 40, set: reeds, to: tall}, {at: 70, spawn: heron, at_point: shallows}]`) moves to `world/thresholds.yaml`.

### E3. State reducer (real JavaScript, tested)

This code ran on a toy six-stage pack. All 729 routes enumerated in **46.7 ms** (Node 22.23, 4-vCPU Xeon at 2.1 GHz). Size: **1,880 B minified, 909 B gzip**.

```js
const OPS={'<':(a,b)=>a<b,'<=':(a,b)=>a<=b,'>':(a,b)=>a>b,'>=':(a,b)=>a>=b,'==':(a,b)=>a===b};
function cmp(v,expr){const m=/^(<=|>=|==|<|>)(-?\d+)$/.exec(expr);return OPS[m[1]](v,+m[2]);}
export function matches(c,s){c=c||{};
 for(const k in c.meters||{}) if(!cmp(s.meters[k],c.meters[k])) return false;
 for(const f of c.flags||[]) if(!s.flags.includes(f)) return false;
 for(const f of c.not_flags||[]) if(s.flags.includes(f)) return false;
 for(const k in c.chose||{}) if(s.choices[k]!==c.chose[k]) return false; return true;}
const spec=c=>Object.keys(c?.meters||{}).length+(c?.flags||[]).length+(c?.not_flags||[]).length+Object.keys(c?.chose||{}).length;
function rng(seed,i){let x=(seed^(i*0x9e3779b9))>>>0;x^=x<<13;x^=x>>>17;x^=x<<5;return (x>>>0)/4294967296;}
export function pickHelper(vs,s){const el=vs.filter(v=>matches(v.when,s));if(!el.length) return null;
 const best=Math.max(...el.map(v=>spec(v.when)));const t=el.filter(v=>spec(v.when)===best);
 const tot=t.reduce((a,v)=>a+(v.weight||1),0);let r=rng(s.seed,s.stageIndex)*tot;
 for(const v of t){r-=(v.weight||1);if(r<0) return v;}return t[t.length-1];}
function applyWorld(s,w){if(w.set) s.world[w.set]=w.to; else if(w.spawn) s.spawns.push({id:w.spawn,at:w.at||w.at_point,n:w.n||1});}
export function init(p,seed=1){const meters={},world={};for(const m of p.meters) meters[m.id]=m.start;
 for(const w of p.switches) world[w.id]=w.default;
 return {stageIndex:0,choices:{},meters,flags:[],world,spawns:[],artefact:[],seed};}
export function applyCard(p,s,id){const st=p.stages[s.stageIndex],card=st.cards.find(c=>c.id===id),helper=pickHelper(card.helper,s);
 const n=structuredClone(s),e=card.effects||{};n.choices['s'+(s.stageIndex+1)]=id;
 for(const k in e.meters||{}){const m=p.meters.find(x=>x.id===k);n.meters[k]=Math.min(m.max,Math.max(m.min,s.meters[k]+e.meters[k]));}
 for(const f of e.flags||[]) if(!n.flags.includes(f)) n.flags.push(f);
 for(const w of e.world||[]) applyWorld(n,w);
 for(const k in p.thresholds||{}) for(const r of p.thresholds[k]) if(s.meters[k]<r.at&&r.at<=n.meters[k]) applyWorld(n,r);
 if(e.artefact) n.artefact.push(e.artefact); n.stageIndex++; return {state:n,helper};}
```

**Design rules:**
- The helper is picked *before* effects apply, so the AI reacts to the world as it was.
- Thresholds fire only when a meter crosses upwards.
- The renderer and UI subscribe to state diffs and never mutate state.
- `structuredClone` keeps the function pure, which is what makes snapshot tests possible.
- In production, cache the parsed `cmp` expressions at pack load (an easy optimisation).

### E4. Test harness for all 729 routes

**Content layer (Node, runs on every commit):**

1. **Schema:** ajv validates every stage against E2 (CI only; ajv is never shipped).
2. **Referential integrity:** every string ID exists in every locale; every meter, flag, switch, spawn point, icon and camera exists; every `read_aloud: recorded` line has `audio/<locale>/<id>.ogg`.
3. **Static reachability** (Manning-style, [GDC 2019](https://gdcvault.com/play/1025981)):
   - every helper variant must be selected on at least one route;
   - a flag read but never set is an error;
   - a flag set but never read is a warning.
4. **Invariants on every route:**
   - exactly one empty-`when` fallback per card;
   - `pickHelper` never returns null;
   - meters stay in range;
   - `sure` is 0–100, and ≥ 50 when the mood is `confident`;
   - **exactly one `vague: true` card per stage**;
   - the artefact has 6 fragments;
   - the end state serialises.
5. **Coverage** (ChoiceScript hit counts, [Choice of Games](https://choiceofgames.com/make-your-own-games/testing-choicescript-games-automatically)):
   - count per variant, per threshold rule and per switch state;
   - zero hits fails the build; under 1% is a warning;
   - output is a CSV plus an HTML heat map.

   The toy run above shows the shape. The fallback was chosen 2,484 times, the `chose s1=a` variant 693 times, and the meter variant 1,197 times.
6. **Distribution checks:**
   - final-meter histograms;
   - flag if more than X% of routes end in the same world state;
   - flag any meter that never moves.
7. **Text lint (BDA-driven, [BDA](https://cdn.bdadyslexia.org.uk/uploads/documents/Advice/style-guide/BDA-Style-Guide-2023.pdf?v=1680514568)):**
   - sentences ≤ 70 characters;
   - card labels ≤ 40;
   - helper lines ≤ 120;
   - a banned-word list;
   - a reading-age target per lab.
8. **Golden routes:** 5–10 pinned routes.
9. **End-state snapshot:** all 729 end states, committed, so content changes show up as readable diffs.

**UI layer (Playwright, headless Chromium):**
- **27-route covering sample:** every stage × card pair and every consecutive pair.
  - played keyboard-only, which also proves switch-access order;
  - `aria-live` text asserted;
  - screenshots taken.
- **Random-walk bot (new, modl.ai lesson, [modl.ai](https://modl.ai/testing-content-heavy-games-with-ai-bots)):**
  - 200 seeded random sessions that also tap *non-card* UI (read-aloud, settings, back, double-taps);
  - asserts no console errors, no focus loss and no stuck states.
- **axe scan** on each stage.
- **Renderer matrix (new):** the default WebGL 2 run, plus a run with `--disable-gpu` / SwiftShader (Chrome's software renderer), to prove the lab still works, slowly, on the software fallback.

### E5. CI pipeline

```
on: push / pull_request (content/** or js/**)
jobs:
  1 sheets-sync     scheduled/manual: published CSV from Google Sheets -> PR on "content-sync"
  2 build-content   yaml/csv -> pack.json ; .vox -> greedy mesh + baked AO -> meshopt .bin ; hashes
  3 lint+schema     ajv, referential integrity, BDA text lint      -> annotated PR errors
  4 route-test      729 x N labs (≈50 ms each), invariants, coverage, snapshot diff -> coverage HTML artifact
  5 browser-test    Playwright covering sample + random-walk bot + axe + screenshots (WebGL2 and SwiftShader)
  6 size-budget     shell.js <= 50 KB gz ; 3d chunk <= 160 KB gz ; sw.js <= 10 KB gz ; pack <= 2.5 MB
  7 preview-deploy  static preview with ?lab=pond&route=aabcab deep links
  8 release         tag -> versioned dist + precache manifest; venues update on next "Prepare"
```

**Review loop.** This keeps Obsidian's lesson ([Game Developer](https://www.gamedeveloper.com/programming/how-avowed-s-qa-team-stomped-out-bugs-by-working-inside-the-design-tools)): for each content PR, writer and reviewer go through the coverage heat map and two or three deep-linked routes together.

### E6. Service worker and offline plan

**Workbox basics:**
- Workbox precaching uses revisioned URLs as cache keys and only fetches what changed ([Workbox precaching](https://developer.chrome.com/docs/workbox/modules/workbox-precaching)).
- Workbox is now owned by Chrome's Aurora team ([GitHub](https://github.com/GoogleChrome/workbox/)). Recent releases (v7.4.0 in November 2025, then v7.4.1) are maintenance and dependency updates ([releases](https://github.com/googlechrome/workbox/releases)).
- The three modules needed cost **5.8 KB gz** (B2).
- **Fallback plan:** if Workbox stalls, a hand-written SW of about 100 lines covers this case (one precache list, two runtime routes). Serwist is a maintained fork ([Workbox issue 3149](https://github.com/GoogleChrome/workbox/issues/3149)).

**Storage:** Chromium allows up to 60% of disk per origin, with LRU eviction of best-effort data; `persist()` is auto-granted or refused based on engagement ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)).

| Asset | Strategy | Notes |
|---|---|---|
| Shell (HTML, CSS, fonts, `shell.js` with DOM UI + reducer) | Precache | ≤ 50 KB gz: cards, helper and facilitator panels work before 3D arrives |
| `3d.<hash>.js` (three.js + scene) | Precache, loaded after first paint | about 139 KB gz baseline (B2), so ≤ 160 KB gz budget |
| `labs/index.json` | Network-first, 3 s timeout, then cache | |
| Lab packs `labs/<id>/<hash>/*` | Cache-first (immutable) | Downloaded on "Prepare" |
| Audio | Cache-first | Recorded key lines only |
| Anonymous analytics (if any) | Background-sync queue | No child data |

**Venue flow:**
1. Staff open `/prepare` the day before.
2. The page calls `persist()`, downloads every pack, and verifies hashes.
3. Each lab shows a green "Ready offline" tick.
4. **New:** `/prepare` also runs a 10-second device check:
   - WebGL 2 renderer string,
   - whether `navigator.gpu.requestAdapter()` returns an adapter or null,
   - a frame-time sample.

   It shows "This device: smooth / OK / use low mode". This gives each venue the per-device facts that no published list provides (A5b).

**Session rules:** no `skipWaiting` mid-session; install as a PWA; a USB "venue kit" as fallback.

### E7. Performance budget (rebuilt)

| Item | Floor: Celeron N4500 / UHD 16 EU, 4 GB, 1366×768 | Target: Chromebook Plus (i3-12th gen / Ryzen 3 7000, 8 GB, 1080p) | Basis |
|---|---|---|---|
| Renderer | `WebGLRenderer` (WebGL 2) | Same (WebGPU is a later experiment) | WebGL2 99.95% vs WebGPU 93.19% on ChromeOS ([Web3D Survey](https://web3dsurvey.com/webgl2), [WebGPU](https://web3dsurvey.com/webgpu)); WebGPURenderer "experimental" ([manual](https://threejs.org/manual/en/webgpurenderer)) |
| Frame rate | ≥ 30 fps, 1% lows ≥ 24 | 60 fps | Floor GPU ~157 Time Spy ([CPU-Monkey](https://www.cpu-monkey.com/en/benchmark-intel_celeron_n4500-3dmark_time_spy_graphics_score)) |
| **Pixel budget (first priority)** | DPR 1.0; canvas ≤ 1366×768; "low mode" renders at 0.75 scale | DPR ≤ 1.5 | iGPUs are fill-bound in Chrome ([forum](https://discourse.threejs.org/t/merge-or-use-instance-and-native-render-make-no-difference-with-chrome-plus-integrated-graphics-card/12257)) |
| Draw calls / frame | ≤ 60 | ≤ 100 | 236 → 9 calls was the fix in the Chromebook tunnel case ([forum](https://discourse.threejs.org/t/infinite-tunnel-with-ceiling-spotlights/9247)); BatchedMesh falls back to per-geometry draws without `WEBGL_multi_draw` (A5a) |
| Visible triangles | ≤ 100k | ≤ 250k | Build-time greedy meshing ([ao-mesher](https://npmjs.com/package/ao-mesher)) |
| Lights / shadows | Hemisphere + directional; baked AO; blob shadows | + one 1024² shadow map | A5c |
| Post-processing | None | Optional FXAA | |
| GPU texture memory | ≤ 16 MB | ≤ 32 MB | Palette or vertex colours |
| JS heap | ≤ 150 MB | ≤ 300 MB | 4 GB devices (design target, not measured) |
| Render loop | Render on dirty; idle ≤ 30 fps; pause when hidden | Same | |
| **Shell (critical path)** | ≤ 50 KB gz | Same | Fits the web.dev 170 KB baseline with room to spare ([web.dev](https://web.dev/articles/your-first-performance-budget)) |
| **3D chunk** | ≤ 160 KB gz | Same | three r187 minimal WebGL = 139 KB gz (measured, B2) |
| Per-lab pack | ≤ 2.5 MB gz (≤ 1.5 MB without audio) | Same | Pre-cached on "Prepare" |
| Library (10 labs) | ≤ 25 MB | Same | Far below quota ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)) |
| Cold start from cache: cards usable | ≤ 1.5 s | ≤ 0.8 s | DOM first |
| Cold start from cache: island shown | ≤ 3 s | ≤ 1.5 s | |
| Card tap → helper reply | ≤ 100 ms response, then authored 600–1200 ms "thinking" beat | Same | The reducer takes well under 1 ms per step (E3: 4,374 steps in 47 ms on the test machine) |

**Benchmark protocol (unchanged in aim; new in detail):**
- Get one Celeron N4500 Chromebook, one Kompanio 520/540 Chromebook (ARM/Mali; it scores in the same band, A6) and one Chromebook Plus.
- `?bench=1` plays `bench/route.txt` with a scripted camera for 60 s. It logs:
  - frame-time median, p95 and 1% lows;
  - `renderer.info.render.calls` and triangles;
  - `performance.memory` where available;
  - the `WEBGL_debug_renderer_info` string;
  - whether WebGPU returned an adapter.
- Publish the results per release in `docs/bench/`.
- These would be the first public three.js voxel numbers for Chromebooks; none exist (A6).

### E8. Recommendations, ranked, each with sources

1. **Use a custom YAML/JSON schema with Google Sheets as the writing surface, and test all 729 routes on every commit.** It costs 47 ms per lab and a 0.9 KB gz runtime. ([Choice of Games](https://choiceofgames.com/make-your-own-games/testing-choicescript-games-automatically); [Manning GDC 2019](https://gdcvault.com/play/1025981); E3 measurement)
2. **Ship `WebGLRenderer`, not `WebGPURenderer`, in version 1.** It is smaller (139 vs 227 KB gz), more widely supported (99.95% vs 93.19% on ChromeOS), and not experimental. ([three.js manual](https://threejs.org/manual/en/webgpurenderer); [Web3D Survey](https://web3dsurvey.com/webgpu); B2)
3. **Load DOM first and 3D second.** The cards, helper and facilitator panels are a ≤ 50 KB shell; three.js arrives in a precached lazy chunk. ([web.dev](https://web.dev/articles/your-first-performance-budget); B2)
4. **Budget pixels before draw calls on iGPUs:** DPR 1 on floor devices, a low-quality mode at 0.75 resolution, and still ≤ 60–100 draw calls. ([three.js forum UHD 620](https://discourse.threejs.org/t/merge-or-use-instance-and-native-render-make-no-difference-with-chrome-plus-integrated-graphics-card/12257); [Chromebook tunnel](https://discourse.threejs.org/t/infinite-tunnel-with-ceiling-spotlights/9247))
5. **Model each card as a storylet:** the most specific variant wins, with a required fallback. ([Yarn saliency](https://docs.yarnspinner.dev/next/write-yarn-scripts/syntax-basics/node-groups/saliency); [Valve/Ruskin](https://emshort.blog/2012/03/16/gdc-2012-talk-on-dynamic-dialogue/))
6. **Declare world change as switches and thresholds, never as coordinates.** ([Townscaper](https://www.gamedeveloper.com/game-platforms/how-townscaper-works-a-story-four-games-in-the-making); [Stålberg talk](https://www.youtube.com/watch?v=Uxeo9c-PX-w))
7. **Store recipes; bake at build time:** `.vox` source, then greedy mesh with AO, then meshopt. ([Dreams/Evans](https://advances.realtimerendering.com/s2015/AlexEvans_SIGGRAPH-2015-sml.pdf); [ao-mesher](https://npmjs.com/package/ao-mesher))
8. **Use a palette, not textures.** ([Teardown blog](https://blog.voxagon.se/))
9. **Precache with Workbox (5.8 KB gz).** Add a staff "Prepare" page with a per-device check, no mid-session updates, and a USB kit; keep a hand-written SW as plan B. ([Workbox](https://developer.chrome.com/docs/workbox/modules/workbox-precaching); [Workbox repo](https://github.com/GoogleChrome/workbox/))
10. **Apply the BDA 2023 rules in CSS and in the linter:** 16–19 px text, 1.5 line spacing, dark text on cream, sentences ≤ 70 characters. ([BDA](https://cdn.bdadyslexia.org.uk/uploads/documents/Advice/style-guide/BDA-Style-Guide-2023.pdf?v=1680514568))
11. **Build the UI as real DOM buttons:** `aria-live` helper text, read-aloud through `localService` voices plus recorded key lines, WCAG 2.2 AA targets, reduced motion. ([XAG](https://learn.microsoft.com/en-us/gaming/accessibility/guidelines); [Readium](https://readium.org/speech/docs/WebSpeech.html); [Switch Access](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/accessibility/os/switch_access.md))
12. **Add a random-walk UI bot and paired writer–reviewer analysis to QA.** ([modl.ai](https://modl.ai/testing-content-heavy-games-with-ai-bots); [Avowed](https://www.gamedeveloper.com/programming/how-avowed-s-qa-team-stomped-out-bugs-by-working-inside-the-design-tools))
13. **Never ship validators or parsers to the browser** (ajv is 41 KB gz). Validate in CI.
14. **Make the helper seem intelligent through memory, mood, `because` lines and timing.** ([Event[0]](https://gamedeveloper.com/design/making-a-chatbot-that-drives-a-narrative-in-sci-fi-exploration-game-i-event-0-i-); [Portal](https://www.gamedeveloper.com/game-platforms/best-of-gdc-the-secrets-of-i-portal-i-s-huge-success))
15. **Prototype in primitives for a week before any voxel art.** ([Monument Valley](https://gamedeveloper.com/design/designing-the-surprise-mobile-game-hit-i-monument-valley-i-))
16. **If dialogue ever grows, inkjs (31 KB gz) is the safe web choice.** Yarn Spinner has no official JS runtime yet. ([Yarn blog](https://www.yarnspinner.dev/blog/yarn-spinner-30-what-to-expect); [YS TypeScript](https://github.com/YarnSpinnerTool/YarnSpinner-TypeScript))
17. **Measure DeltaOps' own Chromebook numbers with `?bench=1`** on N4500, Kompanio and Chromebook Plus devices, and publish them.

---

## Still unverified

- **No published three.js or voxel benchmark on a Chromebook exists** that I could find, even after a 60-search Exa run. The A6 table is the nearest evidence: forum anecdotes, composite browser scores and one thesis. The E7 frame-rate, heap and triangle limits are design targets until DeltaOps runs the bench protocol.
- **Per-GPU WebGPU availability on ChromeOS.** There is no official list. Web3D Survey figures are opt-in samples with unknown bias. The `webgpu_on_vk_via_gl_interop` explanation comes from a Figma support reply, not Chrome documentation, and I did not open crbug 442791440. When compatibility mode will reach ChromeOS is unclear: the blink-dev intent and the Chrome 146 post read differently.
- **`WEBGL_multi_draw` coverage on ChromeOS specifically**: only the all-platform 92.88% was obtained.
- **The bundle sizes are my own builds** (esbuild 0.25.0, minimal entry points). A real lab scene with loaders (GLTFLoader, meshopt decoder) will be larger, and I did not measure that. Brotli was measured with Node zlib, not the `brotli` CLI. Twine/SugarCube and articy-js sizes were not measured.
- **Reducer timing** comes from a toy pack on a cloud Xeon, not a Chromebook. Real packs with more variants will be slower but should stay in milliseconds (inference, not measured).
- **Carried over from round 2 and not re-checked this round:**
  - KTX2/Meshopt VRAM figures (secondary blogs);
  - the hontran and chrome-tips rules of thumb;
  - the "19.6k meshes → InstancedMesh, 28.5 → 0.5 ms" anecdote;
  - the Intel-driver single-digit-fps anecdote;
  - Super Mario Maker format details (community sources);
  - DfE/ICO safeguarding references.

  I dropped the last two anecdotes from the budget's rationale.
- **Townscaper:** I relied on the agent's transcript quotes from the "Beyond Townscaper" video; I did not watch the full video myself. The IndieCade 2019 talk was not watched.
- **The JS heap limits (≤ 150 / 300 MB)** are judgement, not sourced.
- I did not inspect any DeltaOps game code. The repository contains only the brochure.
