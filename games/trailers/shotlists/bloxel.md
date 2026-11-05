# Block Quest
Client request · 0:34 · chunky pixel-art platform game (a physical 13×13 tile board that turns into a side-scrolling level with green grass platforms, coins and a little hero)

**In one sentence:** Children place coloured tiles on a grid board, photograph it and play it as a real platform level; when they ask the AI helper to "make it harder" it fills the level with spikes until nobody can play it, so they tell it exactly what "harder" should mean.

**The AI moment:** "MAKE IT HARDER." → "HARDER = MORE SPIKES!" (89% sure) → red spikes cover every platform, the hero dies straight away and a red banner says "IMPOSSIBLE! NOBODY CAN PLAY THIS." (caught by playtesting) → "HARDER = ONE TRICKY JUMP. KEEP IT FAIR." → most spikes vanish, the AI says "ONE TRICKY JUMP, STILL FAIR." (82% sure), the hero runs and jumps across, and a green banner says "PLAYTESTED: HARD, BUT FUN!"

| Time | What you see | On-screen text (exact) | Sound |
|---|---|---|---|
| 0:00–0:03 | A dark 13×13 grid board on a wooden table, seen from above. Coloured tiles are placed one by one: green ground, blue water, yellow coins, a white block. | "BUILD A LEVEL" | Five tile taps; gentle chip-tune music |
| 0:03–0:04 | A camera-flash effect washes the board pale. | "SNAP!" | Boom |
| 0:04–0:06 | The board's tiles lift and grow into a bright side-on game level with sky, clouds, hills and floating grass platforms. | "...AND PLAY IT!" | Rising swoosh |
| 0:06–0:09 | A small green hero runs and jumps through the level, collecting coins. A coin counter sits top left; three pink hearts top right. Small purple blob enemies patrol. | coin counter "x 1", "x 2"… | Coin sounds; music at full energy |
| 0:09–0:13 | The hero keeps running across the level, picking up more coins and reaching the exit. Big yellow words when it finishes. | "YOUR BLOCKS. YOUR RULES."; then "ROOM CLEAR!" | Coin sounds, success jingle |
| 0:13–0:15 | The same level. A dark "AI Level Helper" bar appears across the top with a little robot face, showing what the child asked. | "AI LEVEL HELPER" "YOU: "MAKE IT HARDER."" | Music drops to a minor key |
| 0:15–0:17 | Rows of red spikes appear on nearly every platform and along the ground. | "AI LEVEL HELPER" ""HARDER = MORE SPIKES!" 89% SURE" | Error sound |
| 0:17–0:19 | The hero jumps once at the start and is killed straight away in a puff of white pixels. A red banner appears along the bottom. | ""HARDER = MORE SPIKES!" 89% SURE"; "IMPOSSIBLE! NOBODY CAN PLAY THIS." | Boom, error sound |
| 0:19–0:20 | The helper bar shows the child's new instruction in yellow. | "YOU: "HARDER = ONE TRICKY JUMP. KEEP IT FAIR."" | Quieter music |
| 0:20–0:21 | Most spikes vanish, leaving one tricky gap. The hero runs right across and makes the jump. A green banner appears. | ""ONE TRICKY JUMP, STILL FAIR." 82% SURE"; "PLAYTESTED: HARD, BUT FUN!" | Music |
| 0:21–0:23 | Cut to a dark "art board" grid. A green creature is drawn tile by tile. | "ART BOARD" | Pop |
| 0:23–0:24 | An AI panel guesses what the drawing is; a yellow note shows the child's reply. | "AI HELPER GUESSES" ""A FROG!"" "72% SURE"; "YOU: "ADD WINGS" "AND FIRE BREATH."" | Tap, chime |
| 0:24–0:26 | Pink wing tiles and orange fire tiles are added. The AI changes its guess; a tiny hero breathes pixel fire beside it. | "AI HELPER GUESSES" ""A DRAGON!"" "90% SURE" | Whoosh |
| 0:26–0:30 | The camera zooms out from one level to a map of fifteen level "rooms" in a grid, the centre one outlined in yellow. | "BUILD A WHOLE WORLD." | Music lifts; rising swoosh |
| 0:30–0:34 | The level darkens and the title bobs in big yellow pixel letters, with the hero running underneath. Fades to black. | "BLOCK QUEST" "BUILD IT. PLAY IT. TEACH THE AI WHAT FUN MEANS." "A DELTAOPS LEARNING GAME LAB" | Boom; music settles |

**Ending / pathway:** A zoom out to a whole world of fifteen rooms, then the title: "BUILD IT. PLAY IT. TEACH THE AI WHAT FUN MEANS." "A DELTAOPS LEARNING GAME LAB".

**Reviewer notes:**
- Render status: rendered video is up to date with the source (`out/bloxel.mp4` is newer than `bloxel/index.html`).
- The picture is only 320×180 pixels scaled up, so all text is tiny pixel lettering; the AI helper bar (0:13–0:21) is hard to read on a small screen.
- The fix happens very fast: the clearer instruction is on screen for about one second and the successful playtest for about one second. Viewers may miss it.
- The "frog / dragon" art-board moment is a second, softer AI example; the AI is not really wrong (it was a frog until wings were added), so it reads as "the AI's guess changes with better evidence" rather than a mistake.
- The physical-board-to-game idea is close to the real product Bloxels; check that the look and the 13×13 board do not copy it too closely. The trailer does not use the name.
- No children or hands are shown placing the tiles; the tiles just appear. Ages 8–14.
