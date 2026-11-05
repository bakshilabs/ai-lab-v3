# Eco Town: cameras, viewpoints and acts

Research for DeltaOps Learning's **Eco Town**, a world-building AI-literacy game for players aged about 8–14. Six levels take the players from empty land to a complete sustainable town. This report covers **how the camera works** (sky, street and inside views, and the transitions between them) and **how each level is split into acts or scenes**. It also covers how a change of viewpoint can **expose the AI helper's mistake**.

- Written 5 November 2026, in British English.
- Out of scope: other agents are covering level structure and sustainability decisions (`research/eco-town-world-building.md`) and resident simulation (`research/eco-town-living-town.md`). Neither file existed when this report was written. The six level themes used in section 6 are therefore **provisional**. When the other report has settled the levels, rename them to match. The camera grammar does not depend on the exact themes.
- Sources: web search only. The Exa connector was not authorised in this session. Most of the camera detail comes from official feature pages, developer statements and reviews. Where only a forum, guide or mod page supports a claim, the report says so. Claims I could not verify are listed in section 9.
- Visual reference: `deltaopslearning-brochure/img/island-town-day.png` and `story-1…5.jpg`. These show a floating voxel island viewed from a high three-quarter angle (about 30–40° down), with soft light from the upper left and tiny blocky residents. See `research/context.md`.

---

## 1. Summary of recommendations

1. **Use three viewpoints with names children understand: Sky, Street and Inside.** Add one overlay, the **Check lens** (data layers), which works on top of Sky. Do not add a fourth camera. Free fly, first-person WASD and photo mode are not needed for children's play.
2. **Sky** is the home view: the diorama from the brochure. It orbits like Townscaper, but the tilt is clamped and the island never leaves the frame. **Street** is a *guided stroll* at a child's eye height. The child taps glowing stopping points, so there is no free walking. **Inside** is a *dollhouse*: the roof lifts and the front wall drops away, as in the Sims cutaway. It is not first-person.
3. **Every move between views is a short scripted move that keeps the child oriented.** The *swoop* goes Sky→Street in 1.2–1.8 s along a smooth zoom-and-pan curve, and the miniature tilt-shift blur fades as the camera lands. The *lift* goes Street→Inside: the roof rises and the room slides forward. *Back to the island* is one button in the same place on every screen. With **Reduce motion** switched on, these become crossfades.
4. **Every level runs the same seven acts:** ① Brief → ② Plan → ③ Build → ④ Move in → ⑤ Street → ⑥ Inside → ⑦ Check & Celebrate. A wrong card loops from ⑦ back to ② and then replays ⑤ or ⑥ **from exactly the same camera position**. This makes a before-and-after comparison.
5. **The main AI-literacy idea: "the AI only sees from the sky".** The helper makes its claims from Sky-view data such as averages, totals and maps. The Street and Inside views are where the children *check the evidence*. Each level has at least one planned reveal (section 3). In some levels the ground-level check should **confirm** that the AI was right. Otherwise children learn to distrust the AI on reflex instead of learning to check.
6. **Motion and controls for ages 8–14:** follow Xbox Accessibility Guideline 117. That means no head-bob, camera shake or motion blur, a constant moving speed, and no free first-person movement. Every touch gesture also needs an on-screen button for Chromebook trackpads and shared projector screens. Keep a mini-map in the corner with a **"you are here" pin and a view cone**. Make every building a different colour or shape, because children find their way by landmarks.

---

## 2. What other games do (camera modes and transitions)

### 2.1 Comparison table

| Game | Views offered | How you switch | What each view is for | Lesson for Eco Town |
|---|---|---|---|---|
| **Cities: Skylines II** (2023) | Free strategy camera; **Photo Mode**; **Cinematic Camera** with keyframes; "Follow" a citizen (Lifepath) | Photo Mode button at the bottom right. The cinematic camera interpolates between keys that store position, rotation, time of day and weather ([Paradox](https://www.paradoxinteractive.com/games/cities-skylines-ii/features/cinematic-camera-photo-mode)) | Strategy view to plan. Photo and cinematic modes to show off. Follow a citizen to *connect life changes to factors like education, jobs and living conditions* ([Paradox Lifepath](https://www.paradoxinteractive.com/games/cities-skylines-ii/features/citizen-simulation-lifepath)) | Keyframed shots that also change the time of day work as a **trailer tool**. "Follow one resident" ties the town's systems to one person's story. |
| **Cities: Skylines I/II mods** | First Person Camera; Walk n' Drive (walk, or take over a car) | Tab or Alt+F toggles ([Kotaku](https://kotaku.com/first-person-mod-lets-you-walk-cities-skylines-streets-1690944484); [PCGamesN](https://www.pcgamesn.com/cities-skylines/mod-walk-drive); [Nexus CS2 mod](https://nexusmods.com/citiesskylines2/mods/138)) | Players use them to "test if your creations actually work for humans". Reviewers call several of them *noclip* cameras that clip through buildings ([PC Gamer](https://pcgamer.com/cities-skyline-first-person-mod-lets-you-explore-the-streets)) | Players *want* the ground check. Adding a free camera to a strategy scene afterwards looks rough, so **design the street view in** from the start. |
| **CS2 tilt-shift** | Depth-of-field mode "Tilt-Shift" | Graphics settings. Players report sliders for near and far focus ([Steam](https://steamcommunity.com/app/949230/discussions/0/3877095833479655220)) | Makes the city look like a miniature. PC Gamer warns it is expensive to render ([PC Gamer](https://pcgamer.com/cities-skylines-2-immediately-change-these-5-graphics-options-for-a-big-performance-boost)) | Use a **cheap fake tilt-shift** (a screen-space blur band) in Sky only. Keep it off on low-end Chromebooks. |
| **SimCity (2013)** | One zooming camera; **data layers** | Opening a tool such as the water tower shows that layer. Colour cues appear "only when needed". The interface was inspired by Google Maps and infographics. The music thins out as you zoom in so that city sounds come through ([Wikipedia](https://en.wikipedia.org/wiki/SimCity_(2013_video_game))). The agents are visible: traffic jams emerge from individual Sims ([Willmott, "Inside GlassBox"](https://www.andrewwillmott.com/talks/inside-glassbox)) | Zoomed out to plan and read layers. Zoomed in to watch individual agents. The producer said data layers were designed to be "simple and easy to understand" ([GamesBeat](https://gamesbeat.com/kip-katsarelis-simcity-designer/)) | **The Check lens appears with the decision it relates to**, not from a menu. Changing the sound with zoom is a cheap way to show scale. |
| **Townscaper** | A single orbit camera | One-finger rotate, two-finger pinch zoom, two-finger drag pan on touch ([AppUnwrapper](https://www.appunwrapper.com/2021/10/20/townscaper-ios-review/)). Raw Fury says you can "zoom into your town and check it out from street level". A reviewer says reaching street level is "awkward" ([PC Gamer](https://pcgamer.com/townscaper-review)) | Admiring and building. For VR, Stålberg noted that some players want street level and others want to look from afar, and said serving both "will be a design challenge" ([UploadVR](https://uploadvr.com/townscaper-concept-video-vr/)) | Copy the touch gesture set for Sky. **Do not** rely on zoom alone to reach street level. Make Street a separate, deliberate view. |
| **Minecraft** | First person (default); third person behind; third person in front | F5 cycles through the three ([DigMinecraft](https://digminecraft.com/getting_started/how_to_change_view.php)) | First person to build and fight. Third person to see yourself and your surroundings | Children aged 8–14 already know "switch view with one key". But the one-key cycle **hides which mode you are in**. Eco Town should use labelled buttons instead. |
| **The Sims 4** | Build/Buy mode against Live mode. **Walls Up / Cutaway / Walls Down**. Follow camera (Live only). Sims 3-style camera option | On PC the walls go up → cutaway → down in steps (players report End/Home). Cutaway hides the walls near the camera and keeps the far walls ([EA forums](https://forums.ea.com/discussions/the-sims-4-technical-issues-pc-en/how-do-you-cut-away-walls/11796036)). Follow camera is Live mode only ([GameSkinny](https://www.gameskinny.com/tips/the-sims-4-how-to-move-and-rotate-the-camera/)) | Build mode to plan, with a top-down option. Live mode to watch lives. Cutaway to see inside without losing context | **The dollhouse cutaway is the model for Inside.** Known problems are roof pieces keeping walls up and half-walls behaving oddly ([EA forums](https://forums.ea.com/discussions/the-sims-4-feedback-en/add-walls-cutaway-view-by-room/12291321)). Avoid both by using pre-built interior rooms. |
| **Animal Crossing: New Horizons** | Close third-person "rolling log" curved world; top-down option; first-person Pro Camera (photos) | Right stick toggles top-down ([Nintendo Wire](https://nintendowire.com/news/2020/02/27/animal-crossing-new-horizons-to-include-top-down-camera-view/)). The curved world hides distant objects and makes the place feel like a tiny planet ([80.lv](https://80.lv/articles/this-is-your-reminder-that-animal-crossing-new-leaf-s-world-is-a-cylinder/)). The Pro Camera first-person view is slow and only tilts ([Destructoid](https://destructoid.com/animal-crossing-new-horizons-pro-camera-update-blog)) | Close view for daily life. Top-down for decorating and planning | A **fixed-angle, close, gently tilted** street camera suits children. It is the closest commercial model for Eco Town's Street view. |
| **Tropico 6** | Strategy camera; balcony speeches | Election speeches from the palace balcony ([Kalypso](https://www.kalypsomedia.com/us/tropico-6-el-prez-edition)). *I could not confirm a camera zoom-to-palace cut* (section 9) | A ceremonial "speech" scene | A **ceremonial scene with a fixed camera** works well for a level's Celebrate act, for example the ribbon-cutting at the town hall. |
| **Frostpunk / Frostpunk 2** | Frostpunk: zoom to see citizens working. FP2: district scale plus **Zoom Stories** | Reviewers disagree on how close the first game can zoom ([RPG Site](https://rpgsite.net/review/7104-frostpunk-review)). FP2's beta players said that after the scale changed they "lost attachment to individuals". The studio added Zoom Stories, which are zoom-ins on parts of the city showing citizens' daily life ([GamingBolt](https://gamingbolt.com/frostpunk-2-gameplay-improvements-new-ui-features-and-zoom-stories-detailed); [TheSixthAxis](https://www.thesixthaxis.com/2024/06/27/frostpunk-2-delayed-to-september-after-beta-feedback/)) | Strategy at a distance; empathy close up | **Direct evidence**: when the camera only stays far away, players stop caring about the residents. Authored close-up vignettes fixed this. Eco Town's Street and Inside views do the same job. |
| **Planet Coaster / Planet Coaster 2** | Standard camera; 1st-person guest camera; on-ride camera | Camera button cycles the modes. On rides, players report the view can only turn about 90° each side ([Frontier forums](https://forums.frontier.co.uk/threads/huge-please-1st-person-mode-to-give-us-a-complete-coaster-cam-experience.491757)). The hidden "tegidcam" guest name gives a first-person view at guest eye height ([Steam](https://steamcommunity.com/app/493340/discussions/0/1457328927846929646)). PC2 marketing promotes ride POV ([heise](https://heise.de/-9799110)) | Ride POV to *feel* what you built. Guest view to check queues and paths | **Clamp the look angle** in Street, as rides do. A ride along a track is the safest first-person motion, because it is predictable and the eye can anticipate it. A short **"ride the bike lane"** sequence is possible. |
| **Parkitect** | Isometric-style camera only | No official ride or guest camera. A coaster-cam mod is marked "not recommended… Parkitect was not made for non-isometric cameras" ([Parkitect Depot](https://sites.google.com/view/parkitect-depot/modding/best-mods)) | Planning and management | A diorama that was never built for a close camera **breaks** when one is added later. Build Eco Town's voxel assets to be seen at street height (doors, window sills, people's faces). |
| **Dorfromantik** | Orbit and zoom over a tile board | Right-drag rotates, wheel zooms ([guide](https://www.magicgameworld.com/?p=126028)) | Calm planning; admiring the board | No street view at all, and it does not need one. The board view carries the whole game. Confirms **Sky should be beautiful and calm in its own right**. |
| **Terra Nil** | Fixed isometric view; "Appreciate" mode; photography; end-of-level pan | At the end the camera pans over the restored map. Then you recycle your buildings and leave ([Fandomentals](https://www.thefandomentals.com/terra-nil-review-reverse-city-builder)). Players disliked photos being *required* for stars ([TechRaptor](https://Techraptor.net/gaming/reviews/terra-nil-review)) | Doing the work, then appreciating it | A **closing pan over the island** gives a natural Celebrate act. Make the photo optional and never a gate. |
| **Before We Leave** | Orbit over a hex-tiled planet; zoom out to near orbit | A reviewer describes zooming to "near orbit" as the sound fades to a deep-space hum, but says the game "feels most rewarding on the ground level" ([Toisto](https://toisto.net/before-we-leave-review)) | Overview against the cosy ground view | Sound that changes with height (as in SimCity) helps children feel scale. |
| **Townsmen VR** | Giant hands over an island; gesture to shrink to a miniature view and zoom to watch settlers ([Mixed](https://mixed-news.com/en/townsmen-vr-review-a-grandiose-plea-for-virtual-reality/)) | Physical gesture | God view, plus watching individual workers | Shows that the **floating-island diorama with zoom to people** works on its own terms. VR is out of scope (manufacturer age limits; see 5.1). |
| **Anno 1800** | Strategy camera; **blueprint mode**; hidden first-person "street view" | Blueprint buildings are free "ghostly silhouettes" that stay inactive until built ([Wikipedia](https://en.wikipedia.org/wiki/Anno_1800)). Ctrl+Shift+R drops you to street level at the mouse pointer, with WASD and no HUD ([The Nerd Stash](https://thenerdstash.com/how-to-switch-to-anno-1800-first-person-mode/); [PCGH](https://www.pcgameshardware.de/Anno-1800-Spiel-61247/News/Geheimer-First-Person-Modus-per-Tastenkombination-aktivierbar-1279979/)) | Blueprint to plan without commitment. Street view as a hidden treat | A **ghost blueprint tint** for the Plan act (the AI's proposal appears as translucent blocks). Dropping in "where you pointed" is an intuitive way to choose a landing spot. |
| **Manor Lords** | Strategy camera; **Visit Mode** (third-person walk) | Eye icon on the lord's portrait. You can explore but not interact ([Escapist](https://www.escapistmagazine.com/how-to-enter-third-person-in-manor-lords-using-visit-mode/); [Prima](https://primagames.com/gaming/how-to-walk-around-in-third-person-mode-in-manor-lords)) | Feeling the place | A clear icon makes switching between strategy and walking easy to find. "Look, don't build" in the walk view keeps it simple. **Eco Town does the same: no building in Street or Inside.** |
| **Tiny Glade** | Orbit build camera; first-person **walking camera** in photo settings | Added a week after the demo as a thank-you. At first it had no collision with the player's builds ([80.lv](https://80.lv/articles/cozy-castle-builder-tiny-glade-now-has-a-first-person-view-mode); [GamesRadar](https://gamesradar.com/games/city-builder/tiny-glade-the-biggest-game-ahead-of-steam-next-fest-now-has-a-manor-lords-style-exploration-mode)) | Building, then walking through what you built | Players asked for it and it was well received. A walk-through of your own build is the emotional reward. |
| **A Short Hike / Spiritfarer** | Close, story-led third-person exploration | Robinson-Yu wanted "a readable 3D world using as few pixels as possible" ([PlayStation Blog](https://blog.playstation.com/2021/08/05/crafting-a-tiny-open-world-a-look-behind-the-scenes-at-the-creation-of-a-short-hike/)). Spiritfarer mixes building the boat with caring for its passengers ([Game Informer](https://www.gameinformer.com/preview/2020/07/30/why-spiritfarer-is-a-different-kind-of-sim)) | Feeling, story, character moments | Street and Inside scenes should be **short, story-led vignettes** with one character and one problem, rather than open exploration. |
| **ISLANDERS** | Orbit/turntable; photo mode with turntable camera ([Nintendo](https://www.nintendo.com/games/detail/islanders-new-shores-switch)) | Score threshold → move to a new island ([GameGrin](https://gamegrin.com/reviews/islanders-review)) | Calm building | A **turntable spin as the celebration shot** fits the floating-island style exactly. |

### 2.2 Patterns across the games

- **Three jobs, three distances.** In every game above, the far view is for *planning* (layout, coverage, totals). The mid or close view is for *feeling* (watching people, the reward of seeing your build). The data overlay is for *checking*. The Frostpunk 2 Zoom Stories change is the clearest evidence that players need the close view to care about residents.
- **The ground view is usually an afterthought.** In Cities: Skylines, Anno and Parkitect it is a mod, a hidden shortcut or missing, and these views clip and glitch. Where it was **designed in** (Animal Crossing, Planet Coaster guest view, Manor Lords Visit Mode, Tiny Glade walk), it is a single labelled toggle with **fewer controls** than the strategy view.
- **The walkable view is for looking, not doing.** Manor Lords Visit Mode does not let you interact. Anno's street view hides the HUD. Eco Town should follow suit: decisions are made in Sky, and Street and Inside are for looking and gathering evidence.
- **Interior views are dollhouses, not first-person.** The Sims cutaway is the genre standard because it keeps the room in the context of the house. First-person interiors in builders exist only through mods.
- **Cinematic tools are keyframes plus time of day.** CS2's cinematic camera stores position, rotation and *weather and time of day* in each key. Dawn-to-dusk changes are what make builder trailers feel alive.
- **Celebration is a slow pan or turntable over the finished place** (Terra Nil, ISLANDERS). Photos should be optional (Terra Nil's compulsory photos were criticised).

---

## 3. The AI-literacy angle: what each viewpoint reveals

### 3.1 The core idea: "the AI only sees from the sky"

The existing labs follow one pattern: the helper guesses, shows "% sure", the world changes, a facilitator asks a question, and the child retries with a clearer card (`context.md`). Eco Town can tie that loop to the camera:

- The **AI helper speaks from Sky.** Its evidence is what a sky camera and a spreadsheet can see: maps, averages, totals and counts over a whole day or year. Its card can show a small "satellite" icon to mark this.
- **Street and Inside are where the children check.** Here they see one person, one moment and one room.
- The mistakes are the ones a sky-and-data view really makes: **averaging** (a safe street on average is not safe at 8:45), **proxies** (green roofs from above are not the same as warm rooms), **straight-line distance** (near on the map, far on foot), **annual totals** (100% renewable over a year is not the same as power on a still winter evening), **who is missing from the data** (wheelchair users, grandparents, teenagers), and **literal reading of the instruction**, which is the existing labs' main lesson.
- **Calibration matters.** Round-2 research warns that children read high confidence as correctness (`context.md`). Treat the AI as **sometimes right**. In each level, plan one reveal where the ground check *confirms* the AI ("Good checking, it really is quiet here"). The lesson is "check the evidence", not "the AI is always wrong".
- **Before-and-after shots are the proof.** After the retry card, the game replays the **same street or interior camera bookmark**, so the change is obvious, the same way story-1 and story-5 show the pond before and after.

### 3.2 Reveal catalogue (at least one per level; levels as in section 6)

| Level | AI's claim (from Sky, % sure) | What the Street or Inside view shows | Error type | Clearer card that fixes it |
|---|---|---|---|---|
| 1 Ground & homes | "This field is empty, perfect for houses" (78%) | **Street:** at ground level the "empty" field is a wet meadow with nesting lapwings and a badger sett under the hedge | Proxy: empty from above means "no buildings", not "no life" | "Build on the dry, already-used land and keep the meadow" |
| 1 Ground & homes | "Every home is warm: solar panels on every roof" (82%) | **Inside:** the north-facing timber home's thermometer shows 14 °C; grandad is wearing his coat indoors | Proxy: panels on the roof are not insulation inside | "Insulate the walls and face the windows south" |
| 2 Streets & moving | "The school street is safe: average 3 cars a minute" (85%) | **Street, 8:45:** the school run brings a queue of cars, and children are crossing between parked cars | Averaging over the whole day hides the peak | "Close the school street to cars from 8:30 to 9:15 and add a crossing" |
| 2 Streets & moving | "Bikes are popular: 40 bikes parked" (70%) | **Street:** the bikes are rusting; there is no safe lane, so families drive anyway. *(Or a confirm case: the lane is busy and the AI was right.)* | Counting the wrong thing | "Count trips, not bikes" |
| 3 Food & farming | "Everyone lives within 500 m of fresh food" (88%) | **Street:** the estate's walk to the market goes round the railway, 25 minutes with a buggy | Straight-line distance against the actual walking route | "Measure the walking route, not as the crow flies" |
| 3 Food & farming | "Market hall is full of local food" (75%) | **Inside the market hall:** the crates are labelled from far away; the local farm's veg is unsold because it is too expensive | Literal reading ("full" ≠ "local and affordable") | "Give local growers a free stall and a fair price" |
| 4 Water | "No flood risk: the stream is small" (80%) | **Street after the storm:** water pools at the low corner where the car park was paved; a resident is sweeping water from her door | Missing data: the AI saw the stream but not the paved run-off | "Add rain gardens and a permeable car park" |
| 4 Water | "Water use is low" (72%) | **Inside the community kitchen:** a dripping tap and a hosepipe used to wash veg; the tank meter is falling | Annual average hides waste in one place | "Fit trigger taps and collect rainwater for washing veg" |
| 5 Energy & waste | "Town runs on 100% clean energy" (90%) | **Street at dusk, still winter evening:** the turbines are still, the street lights dim, a backup generator coughs | Annual total against the moment of need | "Add a battery and share power at peak times" |
| 5 Energy & waste | "Recycling rate is great: bins look sorted" (77%) | **Street on bin day:** the bins are sorted on top and mixed underneath; a fox is in the food waste | Surface check from above | "Teach the sorting with picture labels; add a food caddy" |
| 6 Nature & community | "Everyone uses the new park" (heat-map, 84%) | **Street:** there is a step at the gate, so the wheelchair user and the pushchair go round; there are no benches, so grandparents don't stay; there is nothing for teenagers | Who is missing from the data | "Ask residents who doesn't come, then add a ramp, benches and a shelter" |
| 6 Nature & community | "The community hall is busy every night" (81%) | **Inside the hall:** the same one club books it every night and other groups are turned away | Literal reading ("busy" ≠ "shared") | "Share the timetable so every group gets a night" |

Facilitator prompts follow the house style, with one question per reveal. Examples: "The AI looked from the sky. What could it not see?" "When is the street busiest? Did the AI's number include that time?" "Who isn't in the AI's count?"

---

## 4. Camera modes for Eco Town

### 4.1 Sky (home view, aerial diorama)

- **Look:** exactly the brochure frame. The whole island is in shot, seen from 30–40° above, with light from the upper left and a plain gradient sky. A subtle fake tilt-shift (a blur band at the top and bottom of the screen) adds the miniature look. Tilt-shift is a "diorama effect" that fakes a shallow depth of field from a high angle ([Wikipedia](https://en.wikipedia.org/wiki/Miniature_faking)).
- **Controls:** orbit, zoom and limited pan, in the Townscaper gesture set ([AppUnwrapper](https://www.appunwrapper.com/2021/10/20/townscaper-ios-review/)):
  - one-finger drag or left-drag rotates around the island's centre;
  - pinch or scroll zooms;
  - two-finger drag or right-drag pans, clamped so the island never leaves the screen.
- **Clamps:** tilt between 25° and 60°; zoom from the whole island down to about a quarter of it. These keep it from turning into a street view by accident.
- **Buttons:** on-screen ⟲ ⟳ (90° snaps) and + / − for trackpads, the facilitator's projector and pupils who find pinching hard.
- **Planning sub-mode:** in the Plan act, Sky tilts towards top-down (about 60°) and the proposed buildings appear as **ghost blocks** in a blueprint tint, in the style of Anno's blueprint mode ([Wikipedia](https://en.wikipedia.org/wiki/Anno_1800)). The AI's proposal is visible before it is built.
- **Check lens (overlay, not a camera):** a tray of 3–4 layers that fits the level, such as traffic at 8:45, warmth, walking time, flood water or who visits. Each tints the island in a single-hue ramp with a legend in plain words. Following SimCity, the relevant lens **opens on its own** when the AI makes a claim about that thing ([Wikipedia](https://en.wikipedia.org/wiki/SimCity_(2013_video_game))).
- **Best for:** planning, choosing, seeing the whole system, and the AI's claims.

### 4.2 Street (guided stroll)

- **Look:** a close third-person view at about a child's eye height (roughly 1.2 m on the voxel scale). Slightly high and behind a **guide character**: a resident, or the small robot mascot `obj-bot` riding a bike. The model is Animal Crossing's close camera ([Nintendo Wire](https://nintendowire.com/news/2020/02/27/animal-crossing-new-horizons-to-include-top-down-camera-view/)). Field of view 65–75°. A light "curved horizon" fades the island edge and sky into a gradient, so the far edge of the diorama never looks unfinished.
- **Movement:** **on rails.** Each street scene is a short authored route, 20–40 s long, with 2–4 glowing **stopping points**. Tapping the next point moves the guide there at a constant walking speed. **No joystick and no WASD.** Dragging looks left or right within about ±60°, the way ride cameras limit look angle ([Frontier forums](https://forums.frontier.co.uk/threads/huge-please-1st-person-mode-to-give-us-a-complete-coaster-cam-experience.491757)). The view springs back when the child lets go.
- **What happens at a stopping point:** a resident's thought bubble, a "spot it" prompt ("Tap the thing the AI missed"), or an evidence sticker to collect (as in the Londinium evidence slots).
- **No building here.** Decisions stay in Sky, as Manor Lords Visit Mode does ([Escapist](https://www.escapistmagazine.com/how-to-enter-third-person-in-manor-lords-using-visit-mode/)).
- **Optional ride variant:** a 10-second "ride the bike lane" or "ride the electric bus" POV on a fixed track. Use it once per game at most, and switch it off when Reduce motion is on.
- **Best for:** feeling the place at human scale, safety, distance and noise, and catching averages and proxies out.

### 4.3 Inside (dollhouse)

- **Look:** the camera settles at a fixed three-quarter angle on one room. The **roof lifts away and the front wall drops**, like the Sims "walls down" or cutaway view ([EA forums](https://forums.ea.com/discussions/the-sims-4-technical-issues-pc-en/how-do-you-cut-away-walls/11796036)), so the room reads as a doll's-house box. Small **parallax** when the device tilts or the mouse moves gives depth. There is no free camera.
- **Content:** one room per level, chosen to match what was built: the timber living room, the straw-bale classroom, the market hall, the community kitchen, the repair café, the community hall. The room is a **separate pre-built diorama** loaded behind the roof-lift. This keeps rendering cheap on Chromebooks and avoids the Sims problem of walls cutting away oddly.
- **Interaction:** tap objects (thermometer, meter, tap, timetable, crate labels) to see readings. One or two **resident vignettes** show a person in the room doing something, as Frostpunk 2's Zoom Stories do ([GamingBolt](https://gamingbolt.com/frostpunk-2-gameplay-improvements-new-ui-features-and-zoom-stories-detailed)). Arrows on either side swap to a second room if the scene has one.
- **Best for:** checking inside claims (warmth, light, air, water, crowding) and caring about residents.

### 4.4 Cinematic (scripted only, never player-driven)

- Keyframed shots made with the same idea as CS2's cinematic camera: each key stores position, rotation and **time of day and weather** ([Paradox](https://www.paradoxinteractive.com/games/cities-skylines-ii/features/cinematic-camera-photo-mode)).
- Used for: the level's opening establishing shot, the move-in sequence, the Celebrate turntable, and trailers (section 7).
- The player can always skip it.

### 4.5 Transitions

| Transition | Motion | Duration | Notes |
|---|---|---|---|
| **Swoop** (Sky → Street) | The camera dives towards the tapped spot. Zoom and pan are blended on a smooth, efficient curve: pull out slightly, travel, then descend, using the van Wijk–Nuij model for optimal zoom and pan paths ([arXiv summary/extension](https://arxiv.org/pdf/1801.09358)). The tilt changes from 35° to about 10° *during the descent only*, not during the travel. The tilt-shift blur fades to 0 as the camera lands, so the world goes from "model" to "life size" | 1.2–1.8 s | Pick the target on the mini-map or by tapping a glowing street marker. The camera never rolls. Landing faces the guide character. |
| **Rise** (Street → Sky) | The swoop in reverse, ending at the last Sky framing used, not a reset | 1.0–1.4 s | Same button in the same corner every time: **"Back to the island"**. |
| **Lift** (Street or Sky → Inside) | The camera pushes in on the building. The roof lifts up and out of frame and the front wall folds down. Behind a short soft-white bloom, the room diorama swaps in | about 1.5 s | The roof rising is a magical moment of its own and shows children that they are "looking inside". |
| **Close** (Inside → Street) | The roof drops back; the camera pulls back to the doorstep | about 1.0 s | |
| **Lens** (Sky only) | No camera move. The colour layer washes across the island from the side the AI is "looking" from | 0.5 s | |
| **Reduce motion** setting | Every transition becomes a 0.4 s crossfade with a still "postcard" of the destination | — | Required (section 5.1). |

---

## 5. Children aged 8–14: comfort, controls and orientation

### 5.1 Motion sickness

- **Evidence:** Tychsen and Foeller (2020, *Am J Ophthalmol*) studied 50 children aged 4–10 playing a first-person flying game on a **VR headset**. Of these, 46 (92%) finished. Children's simulator-sickness scores rose a mean 4.7%, and no after-effects were reported ([AAO EyeNet](https://aao.org/eyenet/article/vr-headsets-may-be-safe-for-young-children)). A flat screen is far less provoking than a headset. Even so, some children are sensitive, and research on children is thin: an NSF-funded project is still building a child-friendly sickness questionnaire ([TCNJ](https://computerscience.tcnj.edu/?p=5723)). Headset makers advise against use under 13, so **no VR mode** for this audience.
- **Industry guidance:** Xbox Accessibility Guideline 117 says to avoid **camera shake, head-bob and motion blur**, or let players turn them off, and to offer adjustable field of view ([Microsoft XAG 117](https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/117)).
- **Eco Town rules:**
  1. No head-bob, shake, motion blur or camera roll.
  2. Constant moving speed with eased starts and stops.
  3. Avoid **rotating and moving at once** in the swoop: travel first, tilt while descending.
  4. On-rails movement in Street. Free first-person movement causes the most sickness and the most "lost" children.
  5. Clamp the look angle.
  6. Field of view of 65–75° in Street, never narrow.
  7. A **Reduce motion** toggle that the facilitator can set for the whole session.
  8. Keep the UI anchored during transitions, so the screen edge stays still.
  9. Cap any single transition at 2 s.
- **Shared screens:** a whole group watching one projector cannot look away from a lurching camera. Facilitator-driven sessions should default to the slower transition timings.

### 5.2 Controls (tablet, touch, trackpad and mouse)

- Studies of children's apps found the common gestures (tap, drag, free rotate, drag-and-drop, pinch, spread, flick) are usable by 4-year-olds ([Loughborough](https://repository.lboro.ac.uk/articles/journal_contribution/Selection_of_touch_gestures_for_children_s_applications_repeated_experiment_to_increase_reliability/9402956)), so ages 8–14 are comfortable with them. One study of **3D rotation** on touch screens found that the usual 2D rotate gesture maps poorly to 3D, and that simpler gestures help ([UD2014 paper](https://ud2014.se/?p=920)). Hence one-finger orbit and no two-finger twist.
- **Input mapping:**

| Action | Touch | Mouse / trackpad | On-screen button |
|---|---|---|---|
| Orbit (Sky) | one-finger drag | left-drag | ⟲ ⟳ (90° snaps) |
| Zoom (Sky) | pinch | scroll | + / − |
| Pan (Sky, clamped) | two-finger drag | right-drag | (not needed) |
| Go to Street | tap glowing marker or mini-map pin | click | "Street" button |
| Walk on (Street) | tap next stopping point | click | ▶ "Next" |
| Look around (Street) | drag (springs back) | move mouse | (not needed) |
| Go Inside | tap glowing door | click | "Inside" button |
| Back to the island | — | Esc | 🏝 button, always top left by the mini-map |

- **Chromebooks and trackpads:** every gesture has a button. Never require right-drag or a two-finger trackpad drag to finish a task.

### 5.3 How many camera modes?

- **Three viewpoints plus one overlay is the ceiling.** Commercial builders with designed-in ground views (Manor Lords, Animal Crossing, Tiny Glade) add exactly **one** extra view to the main camera. Eco Town adds two (Street and Inside), so the overlay should not count as a camera.
- **Introduce them one at a time.** Level 1 teaches Sky, then Street. Inside first appears late in Level 1, in the home. The Check lens arrives in Level 2. By Level 3 all three are familiar.
- **The act structure picks the camera; the child does not have to.** In each act the right view is the default, and the other views are available but not required. This is a 30–60 minute facilitated format, so time spent finding a camera is time lost.

### 5.4 Keeping oriented

- **Mini-map with "you are here":**
  - a small top-down island thumbnail in the top left, next to the lab badge;
  - in Street and Inside it shows a pin and a **view cone**;
  - in Sky it shows the camera's facing.
- **Landmarks:** children in a virtual town found their way mainly by distinctive buildings, by function, size or colour ([Volbracht & Domik, JUCS 1998](https://www.jucs.org/jucs_4_4/the_city_game_an/Volbracht_S.html)). Landmark and route knowledge both improve with age between 6 and 10 ([Nys et al., Frontiers 2015](https://www.frontiersin.org/articles/10.3389/fpsyg.2015.00174/pdf)). Eco Town should:
  - give each civic building a unique roof colour and silhouette (turbines, the school's teal roof, the market hall's awning);
  - keep the turbines visible from every street, as a "north star";
  - add one landmark per level.
- **Street-level signs:** voxel signposts (`obj-sign`) at each stopping point naming the place ("School Lane").
- **Landing rule:** the swoop always lands facing *into* the island, with a landmark in frame.
- **Breadcrumb:** a tiny "Sky › School Lane › Classroom" trail under the task pill.

---

## 6. Recommended camera grammar and acts for Eco Town

### 6.1 The seven-act template (every level)

| Act | Camera | What it shows | What the player does | Time (of a ~10 min level) |
|---|---|---|---|---|
| **① Brief** | Cinematic (slow orbit, Sky) | The island as it is now; a resident or mayor states the need | Listen; read the task pill | 0:30 |
| **② Plan** | Sky (planning tilt, ghost blocks) | The AI helper's proposal as blueprint ghosts, with its claim and "% sure" | Choose card A, B or C (one deliberately vague) | 1:30 |
| **③ Build** | Sky (close orbit) | Voxels drop in row by row; a short time-lapse | Watch; optional rotate | 0:45 |
| **④ Move in** | Cinematic → follow one resident | A removal van, a bike or a family walking in, followed to their door | Watch; tap to name or greet the family | 0:45 |
| **⑤ Street** | Street (guided stroll) | One authored street scene at a meaningful *time* (8:45 school run, storm, dusk, bin day) | Tap stopping points; spot the problem; collect evidence | 2:00 |
| **⑥ Inside** | Inside (dollhouse) | One room that matches what was built | Tap meters and objects; read residents' thoughts | 1:30 |
| **⑦ Check & Celebrate** | Sky + Check lens → Cinematic | AI claim against evidence; facilitator card. **If wrong:** retry card → quick rebuild → **replay ⑤ or ⑥ from the same bookmark**. **If right:** stamp, turntable flyover, postcard | Discuss; choose a clearer card; save the postcard | 2:30 |

Notes:
- Acts ⑤ and ⑥ can swap order when the reveal is inside (Level 1 warmth).
- For short sessions, merge ③ and ④, and run only whichever of ⑤ or ⑥ holds the reveal.
- The existing lab format has 6 stages × 3 cards. Acts ②–⑦ map onto that if one level equals one lab. If a lab covers several levels, use the short version.

### 6.2 Per-level plan (provisional themes)

#### Level 1: Ground & homes (land, materials: timber, straw bale, brick, rammed earth)
- **Cameras introduced:** Sky, then Street, then Inside (in that order, with tutorial pulses on each button).
- **Acts:**
  - ① An empty floating island at dawn.
  - ② The AI proposes houses on the "empty" meadow. Ghost blocks appear; the materials card chooses timber, straw or brick.
  - ③ The homes rise.
  - ④ The first family arrives on foot with a cart.
  - ⑤ **Street: "Meadow Lane at sunrise".** At ground level the "empty" meadow has lapwings and a badger sett. *(Reveal 1)*
  - ⑥ **Inside: the timber family home's living room** in January. Thermometer 14 °C on the north-facing side; grandad in his coat. *(Reveal 2)*
  - ⑦ Warmth lens; retry ("insulate, face south"); replay the living room at 19 °C; postcard "Our first street".
- **Interior scene:** timber-frame living room with a wood-fibre insulation cutaway in the wall, which the child can tap to see layers.
- **Street scene:** Meadow Lane, front gardens, doorsteps and the meadow edge.
- **Trailer sequence (about 25 s):**
  1. Dawn wide on the empty island, with mist.
  2. Sky time-lapse as the voxel homes rise.
  3. Swoop down to the doorstep as the tilt-shift fades.
  4. A lapwing lifts off the meadow.
  5. The roof lifts into the warm living room, where a child reads by the window.
  6. Pull back through the roof to a turntable at golden hour.
  7. Title card.

#### Level 2: Streets & moving (cars, bikes, walking; the school)
- **Acts:**
  - ① A school bell rings over the island.
  - ② The AI says "the school street is safe: 3 cars a minute". Traffic lens available.
  - ③ Roads, cycle lanes and paths are built.
  - ④ Families do the school run; follow one child on a scooter.
  - ⑤ **Street: "School Lane, 8:45".** Queueing cars; children crossing between parked cars. *(Reveal)*
  - ⑥ **Inside: the straw-bale school classroom.** A CO₂ or "stuffy air" meter on the wall; windows closed because of traffic noise. A secondary reveal ties the street back to the classroom.
  - ⑦ Traffic lens at 8:45 against the daily average (the averaging lesson). Retry: school street closed at drop-off times, with a crossing. Replay 8:45 with scooters and a lollipop crossing. Postcard "Safe to school".
- **Interior scene:** straw-bale classroom: thick deep window sills, a timber roof, pupils' drawings on the wall, an air meter.
- **Street scene:** School Lane at the school run.
- **Optional ride:** 10 s along the new cycle lane (once in the game).
- **Trailer sequence:**
  1. Morning Sky, the bell.
  2. A top-down drone tracks a line of bikes along the new lane.
  3. Swoop to child height behind a scooter.
  4. A crossing with a waving lollipop person.
  5. The roof lifts on the classroom; hands go up.
  6. A wide shot as the traffic lens washes green.
  7. Title card.

#### Level 3: Food & farming (allotments, orchard, market hall)
- **Acts:**
  - ① A hungry resident asks for fresh food.
  - ② The AI says "everyone lives within 500 m of fresh food", with a walking lens drawn as straight circles.
  - ③ Fields, allotments, an orchard and the market hall go up.
  - ④ A delivery cart and shoppers arrive.
  - ⑤ **Street: "The long way round".** Follow a parent with a buggy from the estate; the railway forces a 25-minute detour. *(Reveal)*
  - ⑥ **Inside: the market hall.** Crate labels show far-away food; the local veg stall is empty of customers. *(Reveal 2)*
  - ⑦ Walking-time lens (true routes) against circles. Retry: a footbridge plus a fair stall for growers. Replay the walk with the bridge. Postcard "Harvest day".
- **Interior scene:** market hall with timber trusses, stalls, crates, scales and a chalkboard of prices.
- **Street scene:** the estate path to the market and the railway fence.
- **Trailer sequence:**
  1. A low sunrise across the allotment rows.
  2. A seasonal time-lapse (green, then gold) in Sky.
  3. A swoop following the cart down the lane.
  4. The market hall roof lifts to show a busy hall.
  5. A close-up of an apple changing hands.
  6. Pull back to the island turntable.
  7. Title card.

#### Level 4: Water (rain, flooding, reed beds, drinking water)
- **Acts:**
  - ① Dark clouds gather.
  - ② The AI says "no flood risk: the stream is small".
  - ③ The car park, drains and pond are built.
  - ④ Residents use the new car park.
  - ⑤ **Street: "After the storm".** Water pools at the paved low corner; a resident sweeps her doorstep. *(Reveal)*
  - ⑥ **Inside: the community kitchen.** A dripping tap and a hosepipe washing veg; the tank meter falls. *(Reveal 2)*
  - ⑦ Flood lens in a "replay the storm" mode. Retry: rain gardens, a permeable car park and a rain butt. Replay the storm: the water soaks away and ducks find the new swale. Postcard "Rain ready".
- **Interior scene:** the community kitchen: big sinks, a water meter, a rainwater tank gauge, volunteers cooking.
- **Street scene:** the low corner of Mill Street during and after a storm.
- **Trailer sequence:**
  1. A storm rolls over the floating island and rain falls off its edges (a striking diorama shot).
  2. Street level with puddles, which a rain garden then fills.
  3. The roof lifts on the kitchen, where steam rises.
  4. The sun breaks through and the pond sparkles.
  5. A rainbow turntable.
  6. Title card.

#### Level 5: Energy & waste (solar, wind, heat pumps, battery; recycling, repair)
- **Acts:**
  - ① Winter arrives; the days get short.
  - ② The AI says "100% clean energy" (an annual total).
  - ③ Turbines, panels and a recycling yard are built.
  - ④ The lights come on across town in a dusk montage.
  - ⑤ **Street: "Still winter evening".** The turbines are still, the street lights dim and the generator coughs. *(Reveal)* An optional second street beat on bin day: bins sorted on top and mixed underneath.
  - ⑥ **Inside: the repair café.** Residents fix a toaster and a bike; the café's own meter shows peak demand at 6 pm. This is a **confirm** moment: the AI said the repair café cuts waste, and it does.
  - ⑦ An energy lens hour by hour against the year. Retry: a community battery plus peak sharing. Replay the dusk street with warm lights. Postcard "Lights on, waste down".
- **Interior scene:** repair café with a workbench, a tool wall, a sorting shelf and a power meter.
- **Street scene:** High Street at dusk in winter; the recycling bay.
- **Trailer sequence:**
  1. Blue-hour Sky.
  2. A turbine close-up as the blades slow.
  3. The lights flicker.
  4. Cut to the battery block lighting up.
  5. A street swoop as windows glow one by one.
  6. The roof lifts on the repair café; a bike wheel spins.
  7. A night turntable with stars.
  8. Title card.

#### Level 6: Nature & community (park, wildlife corridor, community hall, festival)
- **Acts:**
  - ① The town is nearly done; the mayor wants a place for everyone.
  - ② The AI says "everyone uses the new park", with a visit heat-map.
  - ③ The park, wildflower corridor and hall are built.
  - ④ The festival preparations montage.
  - ⑤ **Street: "The park gate".** A step stops the wheelchair user and the pushchair; there are no benches, so grandparents leave; teenagers have nothing. *(Reveal)*
  - ⑥ **Inside: the community hall.** The timetable shows one club every night. *(Reveal 2)*
  - ⑦ A "who's missing" lens. Retry: ask residents, then add a ramp, benches, a shelter and a shared timetable. Replay the gate. **Finale:** the festival.
- **Interior scene:** the community hall with a stage, bunting, a timetable board and stacked chairs.
- **Street scene:** the park gate and the high street on festival day.
- **Finale cinematic (also the game trailer, about 45 s):**
  1. Start inside the hall as the band warms up.
  2. The roof lifts and the camera rises through it.
  3. Follow a parade along the high street (street height).
  4. Swoop up over the park as the residents from all six levels wave: the lapwings, the scooter child, the market stallholder, the kitchen volunteers, the repair café.
  5. Rise to the full island turntable, then dusk to bunting lights.
  6. Pull out until the island floats small in the sky.
  7. End card with the town's six postcards.

### 6.3 Cinematic grammar for trailers (all levels)

- **Shot vocabulary:**
  - *Establishing turntable*: a slow 90° orbit over the island, tilt-shift on.
  - *Time-lapse build*: Sky, with voxels dropping row by row.
  - *Swoop*: Sky to Street, with the tilt-shift fading.
  - *Follow*: behind one resident at Street height.
  - *Roof-lift*: into Inside.
  - *Rise*: the reverse swoop.
  - *Time-of-day sweep*: keyframed sky colour, as in CS2 where cinematic keys store time of day ([Paradox](https://www.paradoxinteractive.com/games/cities-skylines-ii/features/cinematic-camera-photo-mode)).
- **The rule of three scales:** every trailer should hit **island → street → room → island** inside 30 s. That is the product's selling point in one move.
- **Before and after:** for marketing, the same Street bookmark before and after the retry card, split-screen. This mirrors the brochure's story-1 and story-5 pairing.
- **Tooling:** a JSON shot list (key time, camera position and target, tilt-shift strength, time of day, active residents' script). The game's cinematic runner and the trailer capture can share it.

---

## 7. Production notes (brief; see round-2 report 04 for architecture)

- **Separate interior dioramas** keep the main island's voxel count down. The roof-lift hides the swap, which matters on Chromebooks.
- **Street routes are authored splines** with stopping points. This needs no navmesh or collision, and avoids Tiny Glade's early "no collision" problem ([80.lv](https://80.lv/articles/cozy-castle-builder-tiny-glade-now-has-a-first-person-view-mode)).
- **Art for street height:** doors, sills, faces, signs and ground props (bins, bike racks, crossings). Parkitect shows that assets made for one camera height break at another ([Parkitect Depot](https://sites.google.com/view/parkitect-depot/modding/best-mods)).
- **Tilt-shift:** a cheap screen-space blur band, switched off on low-power devices. CS2's depth-of-field tilt-shift is noted as costly ([PC Gamer](https://pcgamer.com/cities-skylines-2-immediately-change-these-5-graphics-options-for-a-big-performance-boost)).
- **Sound by height:** SimCity thins the music as you zoom in to let city sounds through ([Wikipedia](https://en.wikipedia.org/wiki/SimCity_(2013_video_game))), and Before We Leave fades to a deep-space hum when you zoom out ([Toisto](https://toisto.net/before-we-leave-review)). In Eco Town, Sky is music plus wind, Street is footsteps and birds, and Inside is room tone and voices.

---

## 8. Sources

**Games: official and developer**
- Paradox, Cities: Skylines II, Cinematic Camera and Photo Mode: https://www.paradoxinteractive.com/games/cities-skylines-ii/features/cinematic-camera-photo-mode
- Paradox, Cities: Skylines II, Citizen Simulation and Lifepath: https://www.paradoxinteractive.com/games/cities-skylines-ii/features/citizen-simulation-lifepath
- SimCity (2013), Wikipedia: https://en.wikipedia.org/wiki/SimCity_(2013_video_game)
- Andrew Willmott, "Inside GlassBox": https://www.andrewwillmott.com/talks/inside-glassbox
- Kip Katsarelis interview, GamesBeat: https://gamesbeat.com/kip-katsarelis-simcity-designer/
- Anno 1800, Wikipedia (blueprint mode): https://en.wikipedia.org/wiki/Anno_1800
- A Short Hike, PlayStation Blog: https://blog.playstation.com/2021/08/05/crafting-a-tiny-open-world-a-look-behind-the-scenes-at-the-creation-of-a-short-hike/
- A Short Hike postmortem, GDC Vault: https://gdcvault.com/play/1026613/contactUs
- Townscaper VR, Meta blog: https://www.meta.com/blog/townscaper-vr-out-now-meta-quest-platform/
- Kalypso, Tropico 6: https://www.kalypsomedia.com/us/tropico-6-el-prez-edition
- ISLANDERS: New Shores, Nintendo: https://www.nintendo.com/games/detail/islanders-new-shores-switch

**Games: press, guides and reviews**
- Kotaku, CS first-person mod: https://kotaku.com/first-person-mod-lets-you-walk-cities-skylines-streets-1690944484
- PC Gamer, CS first-person mod: https://pcgamer.com/cities-skyline-first-person-mod-lets-you-explore-the-streets
- PCGamesN, Walk n' Drive: https://www.pcgamesn.com/cities-skylines/mod-walk-drive
- Nexus Mods, CS2 First Person Camera Continued: https://nexusmods.com/citiesskylines2/mods/138
- Steam, CS2 follow pin: https://steamcommunity.com/app/949230/discussions/0/3877096256098877216
- Steam, CS2 tilt-shift: https://steamcommunity.com/app/949230/discussions/0/3877095833479655220
- PC Gamer, CS2 graphics settings: https://pcgamer.com/cities-skylines-2-immediately-change-these-5-graphics-options-for-a-big-performance-boost
- AppUnwrapper, Townscaper iOS: https://www.appunwrapper.com/2021/10/20/townscaper-ios-review/
- PC Gamer, Townscaper review: https://pcgamer.com/townscaper-review
- UploadVR, Townscaper VR concept: https://uploadvr.com/townscaper-concept-video-vr/
- DigMinecraft, change view: https://digminecraft.com/getting_started/how_to_change_view.php
- EA forums, Sims 4 cutaway: https://forums.ea.com/discussions/the-sims-4-technical-issues-pc-en/how-do-you-cut-away-walls/11796036 and https://forums.ea.com/discussions/the-sims-4-feedback-en/add-walls-cutaway-view-by-room/12291321
- GameSkinny, Sims 4 camera: https://www.gameskinny.com/tips/the-sims-4-how-to-move-and-rotate-the-camera/
- Nintendo Wire, ACNH top-down camera: https://nintendowire.com/news/2020/02/27/animal-crossing-new-horizons-to-include-top-down-camera-view/
- 80.lv, Animal Crossing cylinder world: https://80.lv/articles/this-is-your-reminder-that-animal-crossing-new-leaf-s-world-is-a-cylinder/
- Destructoid, ACNH Pro Camera: https://destructoid.com/animal-crossing-new-horizons-pro-camera-update-blog
- RPG Site, Frostpunk review: https://rpgsite.net/review/7104-frostpunk-review
- GamingBolt, Frostpunk 2 Zoom Stories: https://gamingbolt.com/frostpunk-2-gameplay-improvements-new-ui-features-and-zoom-stories-detailed
- TheSixthAxis, Frostpunk 2 delay and beta feedback: https://www.thesixthaxis.com/2024/06/27/frostpunk-2-delayed-to-september-after-beta-feedback/
- Frontier forums, Planet Coaster ride cam: https://forums.frontier.co.uk/threads/huge-please-1st-person-mode-to-give-us-a-complete-coaster-cam-experience.491757
- Steam, Planet Coaster "tegidcam": https://steamcommunity.com/app/493340/discussions/0/1457328927846929646
- heise, Planet Coaster 2: https://heise.de/-9799110
- Parkitect Depot, mods: https://sites.google.com/view/parkitect-depot/modding/best-mods
- Dorfromantik PC controls: https://www.magicgameworld.com/?p=126028
- Fandomentals, Terra Nil review: https://www.thefandomentals.com/terra-nil-review-reverse-city-builder
- TechRaptor, Terra Nil review: https://Techraptor.net/gaming/reviews/terra-nil-review
- Toisto, Before We Leave review: https://toisto.net/before-we-leave-review
- Mixed, Townsmen VR review: https://mixed-news.com/en/townsmen-vr-review-a-grandiose-plea-for-virtual-reality/
- The Nerd Stash, Anno 1800 first person: https://thenerdstash.com/how-to-switch-to-anno-1800-first-person-mode/
- PCGH, Anno 1800 first person: https://www.pcgameshardware.de/Anno-1800-Spiel-61247/News/Geheimer-First-Person-Modus-per-Tastenkombination-aktivierbar-1279979/
- Escapist, Manor Lords Visit Mode: https://www.escapistmagazine.com/how-to-enter-third-person-in-manor-lords-using-visit-mode/
- Prima, Manor Lords third-person: https://primagames.com/gaming/how-to-walk-around-in-third-person-mode-in-manor-lords
- 80.lv, Tiny Glade first person: https://80.lv/articles/cozy-castle-builder-tiny-glade-now-has-a-first-person-view-mode
- GamesRadar, Tiny Glade exploration mode: https://gamesradar.com/games/city-builder/tiny-glade-the-biggest-game-ahead-of-steam-next-fest-now-has-a-manor-lords-style-exploration-mode
- Game Informer, Spiritfarer: https://www.gameinformer.com/preview/2020/07/30/why-spiritfarer-is-a-different-kind-of-sim
- GameGrin, Islanders review: https://gamegrin.com/reviews/islanders-review

**Research and guidelines**
- Microsoft, Xbox Accessibility Guideline 117: https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/117
- AAO EyeNet on Tychsen & Foeller 2020 (children, VR, motion sickness): https://aao.org/eyenet/article/vr-headsets-may-be-safe-for-young-children
- TCNJ, child cybersickness project: https://computerscience.tcnj.edu/?p=5723
- Loughborough, touch gestures for children: https://repository.lboro.ac.uk/articles/journal_contribution/Selection_of_touch_gestures_for_children_s_applications_repeated_experiment_to_increase_reliability/9402956
- 3D rotation gestures, children and adults: https://ud2014.se/?p=920
- Volbracht & Domik, The City Game (JUCS 1998): https://www.jucs.org/jucs_4_4/the_city_game_an/Volbracht_S.html
- Nys et al., landmark and route knowledge in children (Frontiers 2015): https://www.frontiersin.org/articles/10.3389/fpsyg.2015.00174/pdf
- van Wijk & Nuij, smooth and efficient zooming and panning (summarised and extended by Reach & North): https://arxiv.org/pdf/1801.09358
- Miniature faking / tilt-shift: https://en.wikipedia.org/wiki/Miniature_faking

---

## 9. Still unverified

- **Tropico "zoom to palace":** I confirmed the balcony speeches but not a camera cut or zoom to the palace.
- **The Sims 4 hotkeys:** End/Home behaviour comes from player forums and the accounts disagree. The three wall modes themselves are well attested.
- **CS2 native follow camera:** the Lifepath "Follow" list is official. The camera following a citizen comes from a launch-era Steam answer and a mod; I could not confirm it as a current native feature.
- **Planet Coaster first-person mode:** the official guide page returned 403, so details come from forums and guides. Planet Coaster 2's ride POV comes from pre-release coverage.
- **Before We Leave:** zoom to near orbit is from one review; I could not find official control documentation.
- **Townscaper VR:** I could not confirm whether street-level viewing is in the shipped version.
- **Frontiers 2015 PDF:** the search result attributes 10.3389/fpsyg.2015.00174 to Nys et al. on children aged 6–10. I did not open the full text, so check the author list before citing.
- **Tychsen & Foeller:** the figures come from the AAO EyeNet summary, not the full paper.
- **No published research** was found on *how many* camera modes children aged 8–14 can manage. The "three plus one overlay" ceiling is a design judgement drawn from commercial practice (section 5.3). Test it in playtests: count how often a child asks "how do I get back?" and how long they spend lost per level.
- **Level themes in section 6** are provisional until `research/eco-town-world-building.md` exists.
