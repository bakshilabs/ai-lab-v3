# Future Skills trailers: shared rules for this fix round

Context: 8 "Future Skills" trailers for DeltaOps Learning (ages 11-18): a young person checks an AI colleague's confident draft with four checks (Data, Case, Source, Authority), finds the flaw, fixes it, signs off; the trailer ends with a pathway card. Independent reviewers scored them 6-8 out of 10 on "lab quality" and "visual match" (the DeltaOps brochure look: bright tilt-shift voxel floating island in warm daylight and blue sky, with clean modern app-style cards; calibration trailers ecotown and city score 8). Target: >=8 on both.

Repo: /home/user/ai-lab-v3/games/trailers (read README.md). Do NOT edit engine/. Verify with stills only (`timeout 900 nice node render.mjs <id> --stills a,b,...` then `python3 sheet.py <id>`; view the sheet and full-size stills, including every transition +-0.3 s). Do NOT run full video renders; do NOT git commit. British English. Keep each trailer 36-42 s. If you change timings, re-time `<id>/audio.json` to match.

## Fixes that apply to every trailer
1. **The four checks must match the evidence.** Meanings: Data = what data the AI used and who/what is missing from it; Case = whether the conclusion holds for this specific case (edge cases, conditions the data didn't cover); Source = whether a claim can be traced to a real, credible source; Authority = who is allowed to decide/approve, rights and permissions. The AI card's "Data I used" line and the failing check(s) must agree: if the AI card shows the flawed input data, Data must fail. Run checks in the order Data, Case, Source, Authority. A check shown as "fixed" must not keep red action text.
2. **The AI confidence card must react** once the flaw is found: strike the claim and flip its status to "Returned" (or drop the % visibly). It must not still say READY/96% after the fix.
3. **Keep the island visible.** In the middle section, frame the camera so the floating island/diorama is recognisable behind or beside the cards (cards on one side, readable diorama on the other, like ecotown/city), not 80% panels over blurry close-up blocks. Avoid huge out-of-focus foreground blocks and in-world sign fragments poking out beside the header.
4. **Bright ending.** No dark navy/dusk end. The pathway card and title sit on bright blue sky with the whole island visible in warm daylight (card beside or below the island, not covering it). Total end sequence (pathway + title) <= 6 s.
5. **Cut dead time.** No static hold longer than ~2.5 s at the start (title/brief) or anywhere else.
6. **Readable text.** Secondary text >= 18 px at 1080p; reduce wording rather than shrink it. Cards should grow as text types, not open at full height half-empty.
7. **No ghosts or collisions.** Fading labels must not overlap other labels; the Portfolio folder must not cover the sign-off card; cursors and name tags must not cover key words; mentor and student figures must not clip into each other.
8. **Sign-off visible.** "Reviewed by: <name>, age N" with checks passed 4 of 4 must be clearly on screen for >= 2 s.
9. **One product line.** Header chip text: "DeltaOps Learning · Future Skills". Pathway card style: a "PATHWAY · Where this skill goes next" header with Next step / Award / Route / Jobs rows, no stray arrows, opaque card.
10. After changes, update `shotlists/<id>.md` to match (timecodes, on-screen text, render-status line "Described from the current source; video re-rendering."), and update `games/labs/<id>.md` (/home/user/ai-lab-v3/games/labs/) wherever the failing check or story changed.

Report per trailer: changes, new length, key-beat timecodes.
