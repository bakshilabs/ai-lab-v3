# Beat Block
Client request · 0:35 · neon one-button rhythm runner (a glowing green cube racing left to right over black spikes, on bright gradient backgrounds that pulse to the music)

**In one sentence:** A cube runs along a neon track in time to the music and one tap makes it jump; an AI "co-pilot" confidently calls the wrong beat, the cube crashes, and after the player tells it to count along with the music first, the player practises and clears the level on attempt 9.

**The AI moment:** (no written instruction is shown at first; the co-pilot predicts from earlier jumps) → "“Jump on the 4th beat!”" (92% sure) → the cube hits a spike and explodes, and the caption says "Very sure is not the same as right." → "YOU TELL THE CO-PILOT “Count along with the music first.”" → the co-pilot now says "“Jump on beat 3. I counted.”" (only 76% sure) and, after a burst of practice runs, the full run reaches 100%.

| Time | What you see | On-screen text (exact) | Sound |
|---|---|---|---|
| 0:00–0:02 | A purple-blue neon background with a glowing floor strip. Big white words appear, then a second line in turquoise. | "ONE BUTTON." "ONE BEAT." | Boom; driving electronic beat starts |
| 0:02–0:05 | The cube starts running along the floor, jumping spikes. A progress bar fills across the top with a percentage; an attempt counter sits on the left. | "ATTEMPT 1"; progress "…%" | Rising swoosh; music at full energy |
| 0:05–0:06 | The cube hits a spike and bursts into pieces; the screen flashes white and restarts. | "ATTEMPT 1" (about 26%) | Boom and error buzz |
| 0:06–0:09 | Second run from the start. A yellow marker on the progress bar shows the best try so far. | "ATTEMPT 2" | Music |
| 0:09–0:11 | A dark "co-pilot" card slides in at the top right with a robot face and an orange confidence bar. The background turns pink. | "CO-PILOT GUESS" "“Jump on the 4th beat!”" "92% sure" | Pop |
| 0:11–0:12 | The cube jumps on the co-pilot's beat, lands on a spike and explodes. A yellow caption along the bottom. | "Very sure is not the same as right." | Boom and error buzz; music thins out |
| 0:12–0:14 | A white card pops up in the middle with the player's new instruction. A green "PRACTICE MODE" label appears top left; green diamond checkpoints sit along the track so the cube restarts close to where it failed. | "YOU TELL THE CO-PILOT" "“Count along with the music first.”"; "PRACTICE MODE"; "ATTEMPT 3", "ATTEMPT 4"; bottom "Restart in a second. No lives. Go again." | Thud on each restart |
| 0:14–0:17 | Quick-fire practice tries (the attempt counter races from 5 to 8), climbing up stepped blocks. The background shifts to teal then pale green. The co-pilot card returns with a turquoise bar. The yellow best marker creeps towards 79%. | "CO-PILOT GUESS" "“Jump on beat 3. I counted.”" "76% sure"; "ATTEMPT 5" … "ATTEMPT 8"; "Restart in a second. No lives. Go again." | Thuds; music still slightly reduced |
| 0:17–0:19 | The background turns orange then back to blue as a fresh full run begins. A yellow caption flashes across the middle. | "FULL RUN · COUNTING THE BEAT: 1 · 2 · 3 · JUMP"; "ATTEMPT 9" | Music returns to full, brighter major key |
| 0:19–0:24 | The cube runs cleanly through the whole level: spikes, ledges and long black platforms. The background moves through blue, pink and teal. | "ATTEMPT 9"; progress climbing past 50% | Music |
| 0:24–0:29 | Up the stepped blocks, through jump rings, past the earlier failure points; the background turns orange. The cube reaches a tall turquoise ring at the end. | "ATTEMPT 9"; progress to "94%" and on | Music building |
| 0:29–0:31 | The cube passes through the ring; a burst of coloured squares. Huge yellow words. | "LEVEL COMPLETE!" "ATTEMPT 9 · 100%" | Success jingle and boom |
| 0:31–0:35 | The screen darkens; the title pulses in time with the beat. Fades to black. | "BEAT BLOCK" "One button. Every try teaches you the beat." "A DELTAOPS LEARNING WARM-UP GAME" | Boom; music settles |

**Ending / pathway:** "LEVEL COMPLETE! ATTEMPT 9 · 100%" and the title "One button. Every try teaches you the beat." It is presented as "A DELTAOPS LEARNING WARM-UP GAME" rather than a full lab.

**Reviewer notes:**
- Render status: rendered video is up to date with the source (`out/dash.mp4` is newer than `dash/index.html`).
- The core AI mistake (the spike was on beat 3, not beat 4) is never shown on screen: there is no beat counter or ruler, so a viewer only sees "4th beat", a crash, then "beat 3". Consider a brief beat count (1 · 2 · 3) under the crash.
- The 76%-sure "beat 3" call appears during practice tries that still crash, so it is not obvious that the less-sure call was right. The success only comes later on the full run.
- The "FULL RUN · COUNTING THE BEAT…" caption is yellow on an orange background and on screen for barely a second; it is hard to read.
- The co-pilot is called "Co-pilot" in the trailer but "Tempo" (working name) in the design document; decide on one name.
- Fast flashing: the screen flashes white on every crash and restart, and there is mild screen shake. Check against photosensitivity guidance before use with children.
- The trailer looks deliberately like a well-known rhythm game; check that nothing (shapes, layout, name) is too close to it. Ages 8–14.
