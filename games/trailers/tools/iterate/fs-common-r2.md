# Future Skills trailers: round 2 shared rules

Read games/trailers/tools/iterate/fs-common-r1.md first (round 1 rules still apply: checks match evidence, island visible, bright ending, readable text, no ghosts, sign-off >= 2 s, one product line, update shotlists and lab docs, stills only, no full renders, no commits, don't edit engine/).

Latest independent scores (target >= 8 on both): fs-verify 8/8, fs-automate 8/8, fs-redteam 8.5/8 already pass — they are the reference for this round. Use their layout patterns (cards in a column on one side, rounded floating island with rocky underside visible on the other side, AI draft card that returns as "V2 · re-tested" with a number, bright stacked end title) as the model the others should converge on.

Additional rules for this round:
1. **Counters must not land on misleading values.** A "% sure" count-up must not be catchable at a low number (e.g. 39%, or 80% when the claim mentions 80%). Show the final number immediately or count only from ~85% upward in <= 0.4 s.
2. **Checks that pass get a one-line reason** (e.g. "Case: holds for all four wards ✓"), shown briefly, so the ritual isn't perfunctory.
3. **Re-check before sign-off.** After the fix, briefly show the failed check(s) re-run and turning green before "4 of 4".
4. **The AI colleague thread closes.** After the fix, the AI draft card returns as "V2 · re-checked by <name>" with a confidence number (e.g. 90%), not a bare bar.
5. **AI draft lands early** — by ~0:06–0:08 where possible; cut setup to fit.
6. **No dead holds**: nothing static for > ~2.5 s; end title on screen 2.5–3.5 s with gentle motion; no dead black frames at the end (a quick fade over the last 0.4 s is fine).
7. **Portfolio continuity.** Each lab's portfolio belongs to that lab's own student and shows only pieces that student made in this trailer (e.g. "Portfolio · Hana — Fact-check card (NEW)"). Never claim another child's work. No "0 pieces" placeholder. The portfolio must not overlap the signed-off card.
8. **No crossfade double exposures** of text cards; swap with a short slide or a clean cut. Name labels appear fully opaque, not ghosting over busy backgrounds.
9. **Nothing clipped at the frame edges** (birds/debris, flags poking behind the header pill, cursor tags, pathway card sliding in from off-screen).
10. Micro-labels (NEXT STEP, DATA I USED, etc.) >= 16 px, dark enough to read on a projector.
