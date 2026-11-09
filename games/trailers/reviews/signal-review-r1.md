# Clear Signal trailer (signal.mp4, 36.0 s, 1920x1080): review

Game quality: 5.5/10
Visual match: 6/10

## Strengths
- The core idea reads well: tap a card and the bot obeys it literally. "Duck!" makes the bot spawn a duck; "Go up!" sends it flying past the gap. Both are funny and right for ages 7–13.
- The bot bubble is well built: name, GUESS tag, "Very sure" bar and 91% / 88%. At 1080p the main text is about 30 px and the % is about 18 px.
- The A/B card pills are clean and app-like, and the chosen card is outlined in teal so you can tell which one was picked.
- The fix run (19–26 s) works on screen: "Jump the 3-block gap" lands, then "Jump the hedge, land on the path" clears the hedge, and the run ends on a clear ATTEMPT 12 · 100% goal gate.
- Every caption has a dark backing panel or outline, and the HUD stays well under 45% of the frame.

## Defects (ordered by impact)
1. **Too many loops, and the first one is never resolved (0:02–0:11, 0:19–0:24).** There are four card prompts: 2-block gap/Go!, Duck!/Slide, Go up!/3-block gap, and hedge/Be careful. The "Duck!" failure (0:05) has no fix shown. At 0:06–0:08 attempt 2 simply ducks under the branch with no new card. The hedge appears with no wrong guess before it. *Fix:* keep one loop, Go up! → fail → "Jump the 3-block gap" → success. Cut the Duck beat or make it the only loop, and drop the 0:02 and hedge cards.
2. **No AI confidence after the fix (0:20–0:24).** The clearer card gets no Courier-bot bubble, so the "confident wrong guess → clear instruction → confident right guess" arc is missing. *Fix:* show a bubble such as "Jump 3 blocks on the beat. 97% sure" as the B card is picked.
3. **The 7 s ghost montage hides the action (0:12–0:19).** Attempts 3–11 are stacked rainbow translucent bots that cover the bot and the obstacles. At 0:18 the bar shows 100% but the run still ends in an orange X, which reads as a contradiction. The run reaches attempt 12 when the lesson needs only 2–3 tries. *Fix:* cut to 2 s or less with at most 2–3 ghosts. Never show 100% on a failed run. Keep the attempt count low.
4. **Failures read as white flashes, not consequences (0:05.0, 0:11.0).** Each failure ends in a full-white frame, then cuts to a teal post. A child cannot see what went wrong. *Fix:* hold 0.5–1 s on the bot bonking the branch or falling into the gap, then show a short "Missed the gap" panel. Remove the white-out.
5. **Pun and introduction issues (0:04–0:07).** The "Duck!" → rubber duck joke is a pun, which has been penalised before. "Courier bot" is never introduced, and the opening "Jump the 2-block gap / Go!" card (0:02) has no result shown. *Fix:* introduce the bot with one caption ("Your cards steer Courier bot"). Replace the pun with a literal misread, or keep it as the single loop and show the fix.
6. **Sky and framing are off-style (throughout).** The sky is a salmon-to-magenta sunset with no daylight. A tight chase camera with heavy depth-of-field blur replaces the bright floating-island diorama with soft upper-left light. *Fix:* use a bright blue daylight sky with less DOF, and pull back to show the island edge at least at the open and the goal.
7. **Ending (0:30–0:36).** The title card sits on a dimmed, vignetted purple scene. There is no careers line, and the last 0.5 s fades to luma ~30, which is dark. *Fix:* hold a bright, clean title card through the final frame and add the careers/strapline row.
8. **Small text.** The "ATTEMPTS 3 TO 11 · BEST SO FAR GOES UP" pill (about 12 px at 1080p) and the card pills (about 16 px) are under the size limit. *Fix:* use 20 px or more, or remove the pill.

## To lift to 8
- **Game quality:** one loop (vague card → 90% wrong guess → visible fall → clearer card → confident bubble → success), the montage cut to 2 s or less, and no extra cards.
- **Visual match:** a bright daylight sky, less blur, a wider diorama-style framing, no white flashes, and a clean, bright end card.
