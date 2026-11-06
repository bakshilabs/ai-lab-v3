# Shared rules for this fix round (DeltaOps Learning trailers)

Goal: an independent reviewer scores the trailer >= 8/10 on game quality and >= 8/10 on visual match. Calibration trailers that already score 8/8: out/kart.mp4, out/mars.mp4, out/ecotown.mp4, out/rocket.mp4 (rocket was cut from 54 s with three loops to 32 s with one strong loop and that is what got it to 8/8).

Repo: /home/user/ai-lab-v3/games/trailers (read README.md). Edit only your own trailer folder plus shotlists/<id>.md and /home/user/ai-lab-v3/games/labs/<id>.md if story text changes. Do NOT edit engine/ or other trailers. Verify with stills only: `timeout 900 nice node render.mjs <id> --stills a,b,...` then view full-size stills in frames/<id>/ at every changed beat and every transition +-0.3 s. No full renders; no commits. British English. Re-time <id>/audio.json to any timing change.

Story every trailer must read without sound: children give an instruction -> the AI makes a confident wrong guess with "% sure" -> the consequence is shown -> children give a clearer instruction -> the fix is SHOWN WORKING on screen.

Always fix: panels/banners/labels from the previous beat must be fully gone before the next beat (no ghost overlaps, no half-faded title cards over action); nothing covers the key action; captions sit on a backing panel; no characters or props clipping; no dead static holds > ~2 s; end on the title card cleanly (no blank dark frames). Keep the existing look the reviewer praised.

Report changes, new length and key-beat timecodes.
