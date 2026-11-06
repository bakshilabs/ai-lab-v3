# Block Quest
Client request · 0:33 · chunky pixel-art platform game (a physical 13×13 tile board that turns into a side-scrolling level with green grass platforms, coins and a hero)

**In one sentence:** Children place coloured tiles on a grid board, photograph it and play it as a real platform level; when they ask the AI helper to "make it harder" it fills the level with spikes until nobody can play it, so they tell it exactly what "harder" should mean.

**The AI moment:** "MAKE IT HARDER." → "HARDER = MORE SPIKES!" (89% sure) → red spikes cover the floor, the platforms and every coin; the hero jumps, lands on spikes, bounces back and loses a heart, and a red banner says "IMPOSSIBLE! NOBODY CAN PLAY THIS." (caught by playtesting) → "HARDER = ONE TRICKY JUMP. KEEP IT FAIR." → the spikes pop away except one on top of a crate; the AI says "ONE TRICKY JUMP, STILL FAIR." (82% sure); the hero runs, clears the spiked crate with a high jump, collects coins, reaches the flag (it rises and turns green) and a green banner says "PLAYTESTED: HARD, BUT FUN!"

| Time | What you see | On-screen text (exact) | Sound |
|---|---|---|---|
| 0:00–0:02.6 | From the first frame a child's hand places coloured tiles on a dark 13×13 board on a wooden table (the bottom row is already down): ground, platform, coins, a heart. | "BUILD" "A LEVEL" (panel, right) | Tile taps; gentle chip-tune music |
| 0:02.4–0:03 | Camera viewfinder corners close on the board; white flash. | "SNAP!" (panel) | Boom |
| 0:03–0:04.3 | The board's tiles lift, grow and fly into place as a bright side-on level with sky, clouds and hills. | "...AND PLAY IT!" (bottom panel) | Rising swoosh |
| 0:04.3–0:11.2 | Real side-scroller play: an orange-hooded hero (about 100 px tall) spawns, runs and jumps with squash-and-stretch and dust puffs; the camera scrolls with him. He collects 15 coins (each pops with "+1"; counter top left only goes up), stomps a purple blob ("STOMP!"), jumps a crate and reaches the flag. Three hearts top right. | coin counter "x 1" … "x 15"; "YOUR BLOCKS. YOUR RULES." (bottom panel, 0:08–0:11) | Coin, jump and stomp sounds; music at full energy |
| 0:11.2–0:12.6 | Flag rises and turns green, confetti, victory hop. | "ROOM CLEAR!" (green panel) | Success jingle |
| 0:12.7–0:14.3 | Same room, hero respawns at its start. The dark "AI Level Helper" bar slides in under the HUD (HUD stays). | "AI LEVEL HELPER" "YOU: "MAKE IT HARDER."" | Music drops to a minor key |
| 0:14.3–0:15.4 | Red spikes pop in across the floor, the crate, the platforms and every coin. | ""HARDER = MORE SPIKES!"" "89% SURE" (bar) | Error, swoosh |
| 0:15.4–0:17.9 | The hero runs, jumps and lands on the spikes: red flash, "OUCH!", he bounces back to the start blinking and a heart empties (3→2). Red banner along the bottom. | "IMPOSSIBLE! NOBODY CAN PLAY THIS." | Boom, error |
| 0:17.9–0:19.3 | The helper bar shows the child's new instruction in yellow. | "YOU: "HARDER = ONE TRICKY JUMP." / "KEEP IT FAIR."" | Quieter music |
| 0:19.0–0:22.8 | All spikes pop away except one on top of the crate. The hero runs, collects coins, makes the high jump over the spiked crate, lands, reaches the flag (rises, turns green, confetti). | ""ONE TRICKY JUMP, STILL FAIR."" "82% SURE"; from 0:21.4 "PLAYTESTED: HARD, BUT FUN!" (green banner) | Chime, coins, success |
| 0:22.8–0:24 | Cut to a dark "art board" grid. The hand draws a green dragon tile by tile: orange back spikes, tail, snout, eye, legs (no wings yet). | "ART BOARD" | Taps |
| 0:24–0:25.35 | An AI panel guesses wrong with confidence; a yellow note shows the child's reply while the hand adds purple wing tiles and orange fire tiles. | "AI HELPER" "GUESSES" ""A FROG!"" (frog icon) "72% SURE"; "YOU: "ADD WINGS" "AND FIRE BREATH."" | Chime, tap, pops |
| 0:25.35–0:25.8 | The guess changes; flame sparks come from the drawing's mouth. | ""A DRAGON!"" "90% SURE" | Chime |
| 0:25.8–0:27.6 | The drawing comes to life: a big flapping dragon (about 360 px wide) flies through the level breathing a long stream of pixel fire. | ""A DRAGON!" 90% SURE" (badge, top left) | Whoosh, fire roar |
| 0:27.6–0:29.8 | Quick montage: the camera zooms out from one room while 14 more rooms pop in around it (sky, desert, snow, night, cave themes); a dotted path draws between them and a tiny hero hops room to room. | "BUILD A WHOLE WORLD." (bottom panel) | Pops, rising swoosh |
| 0:29.8–0:33 | Bright title card: the navy panel drops in over the sunny level (no dimming); the hero runs along the ground, picks up coins and reaches the flag. Ends on the card. | "BLOCK QUEST" "BUILD IT. PLAY IT." "TEACH THE AI WHAT FUN MEANS." "A DELTAOPS LEARNING GAME LAB" (navy text on white strip) | Boom; music settles |

**Ending / pathway:** A zoom out to a whole world of fifteen rooms, then the title: "BUILD IT. PLAY IT. TEACH THE AI WHAT FUN MEANS." "A DELTAOPS LEARNING GAME LAB".

**Reviewer notes:**
- Render status: rebuilt in the November fix round and re-rendered (`out/bloxel.mp4`, 0:33); checked on a contact sheet.
- The game world is drawn at 240×135 (8× pixels) and the text and HUD at 320×180 (6× pixels), all in Press Start 2P.
- The art-board drawing already has dragon spikes, a tail and a snout, so "A FROG!" (72%) is a confident misread; wings and fire breath fix it.
- The physical-board-to-game idea is close to the real product Bloxels; check that the look and the 13×13 board do not copy it too closely. The trailer does not use the name.
- A child's hand places the tiles and draws the dragon. Ages 8–14.
