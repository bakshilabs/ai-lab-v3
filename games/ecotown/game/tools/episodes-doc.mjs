// Writes docs/EPISODES.md (the storyboards and scripts of the twelve story episodes) from js/game/episodes.js and
// the recorded line lengths (videos/episodes/timing.json), so the document always matches the films.
// Usage: node tools/episodes-doc.mjs      (from games/ecotown/game)
import fs from 'node:fs'; import path from 'node:path';
import { EPISODES, CAST, schedule, LEAD_IN, TAIL } from '../js/game/episodes.js';
const here = path.dirname(new URL(import.meta.url).pathname);
const tf = path.join(here, '..', 'videos', 'episodes', 'timing.json'); const durs = fs.existsSync(tf) ? JSON.parse(fs.readFileSync(tf, 'utf8')) : {};
const MISSION = { land: 'Read the land', move: 'Getting around', homes: 'Homes', food: 'Food', power: 'Water, power and waste', heart: 'A school for everyone' };
const camWords = (c) => { const size = c.dist >= 95 ? 'Wide' : c.dist >= 50 ? 'Medium' : 'Close'; const ang = c.pitch >= 0.7 ? 'from above' : c.pitch <= 0.3 ? 'at eye level' : 'high angle'; const to = c.to || {}; const move = to.dist && to.dist < c.dist ? 'slow push in' : to.yaw != null ? 'slow turn' : 'still'; return `${size}, ${ang}, ${move}`; };
const acts = (sh, op) => sh.beats.flatMap((b) => b.do || []).filter((a) => a[0] === op);
let md = `# Eco Town: the story episodes (storyboards and scripts)

Twelve short 3D cartoons: an **opening** before each AI Lab mission and a **closing** after it. They are made with the game's own island, Florence, builds, lenses and simulation, so they look exactly like the game. This document is written from the scripts in \`game/js/game/episodes.js\` by \`game/tools/episodes-doc.mjs\`; change the script, then run the tool again.

## What the episodes are for
- **Opening** (before the mission's start card): a tiny story that sets up the eco idea and shows Florence being confidently wrong. It ends on a question the mission answers. It never shows the lens, the test or the fix.
- **Closing** (after the mission's reward card): the same story resolved. It names, in a child's words, the eco principle and the AI habit of mind.
- The learning points are taken from \`LAB-GUIDE.md\` (sections 2, 5, 9A and 9B) and \`DESIGN.md\` ("The six levels"). Nothing is added to the curriculum. Every number on screen or in a line comes from the game's simulation (\`tests/episodes.test.mjs\` checks them).

## The cast
| Who | What they are like | Voice (Kokoro) |
|---|---|---|
| **Florence** | The wooden robot planner. Keen, proud, a bit literal, never mean. She says how sure she is, pulls her "oops" face when she is caught, and learns. | \`${CAST.florence.voice}\` |
| **Posy** | A girl of about nine, yellow top, hair in a bun. She gives the instructions: first a vague one, later a clear one. | \`${CAST.posy.voice}\`, a little higher |
| **Dev** | A boy of about ten, green top, blue cap. He is the checker: he looks through the lens or from the street and says what he sees. | \`${CAST.dev.voice}\`, a little higher |
| **Pebble** | An otter in the river. Says nothing. Shows how the wild side of the island is doing (first and second films). | none |
| **Narrator** | Sets the scene and says the two things to remember. | \`${CAST.narrator.voice}\` (British) |

Posy and Dev are built with the game's resident builder (\`person()\` in \`engine/kit.js\`); Pebble with its otter builder. No character, tune or catchphrase is taken from any existing cartoon or game. The music and sounds are the game's own chip engine.

## The pattern of every film
1. **Title card** (first ${(LEAD_IN + 2.1).toFixed(0)} seconds, top left): "ECO TOWN · STORY n OF 6 · BEFORE / AFTER THE MISSION" and the title.
2. **Opening:** the job → Posy's vague instruction → Florence's confident plan, with her "% sure" label → a child's doubt → the narrator's question, and **the question card**.
3. **Closing:** the check (Dev) → Florence's "Oops" and what she guessed → Posy's clear instruction → the fixed plan → the narrator's two things to remember, and **the remember card** (🌍 the eco idea, 🤖 the AI habit).
4. The closing card stays up for the last ${TAIL} seconds: this is the pause point for a group (see \`LAB-GUIDE.md\`, "Using the story episodes").

Captions: every spoken line, word for word, with the speaker's name (the narrator's lines have no name). Written captions keep "82%"; the voice says "82 percent".

## The twelve episodes at a glance
| # | Episode | Mission | Length | Eco principle | AI habit of mind |
|---|---|---|---|---|---|
${EPISODES.map((e, i) => `| ${i + 1} | \`${e.id}\` “${e.title}” | ${e.n}. ${MISSION[e.mission]} | ${schedule(e, durs).duration.toFixed(0)} s | ${e.learn.eco} | ${e.learn.ai} |`).join('\n')}
`;
for (const ep of EPISODES) {
  const S = schedule(ep, durs); let n = 0;
  md += `\n---\n\n## ${ep.n}${ep.kind === 'open' ? 'a' : 'b'}. “${ep.title}” (\`${ep.id}\`: ${ep.kind === 'open' ? 'opening' : 'closing'} of mission ${ep.n}, ${MISSION[ep.mission]}; ${S.duration.toFixed(0)} seconds)\n\n`;
  md += `**Learning principle.** Eco: ${ep.learn.eco} AI: ${ep.learn.ai}\n\n**Where it comes from.** ${ep.learn.from}.\n\n`;
  md += `**Set-up.** Florence's practice island for this mission${ep.setup.apply ? ', with her first (flawed) plan already built' : ''}; ${ep.setup.hour >= 12 ? 'afternoon' : 'morning'} light. Music: the game's "${ep.music}" loop, kept low under the voices.\n\n`;
  md += `### Shot list\n| Shot | Seconds | Camera | Action | Who speaks |\n|---|---|---|---|---|\n`;
  ep.shots.forEach((sh, i) => { const t = S.shots[i]; const who = [...new Set(sh.beats.filter((b) => b.say).map((b) => CAST[b.who].name))].join(', ') || 'nobody'; md += `| ${i + 1} | ${t.t0.toFixed(1)}–${t.t1.toFixed(1)} | ${camWords(sh.cam)} | ${sh.desc} | ${who} |\n`; });
  md += `\n### Dialogue (also the caption text)\n| At | Who | Line |\n|---|---|---|\n`;
  for (const c of S.cues) md += `| ${c.t0.toFixed(1)} s | ${CAST[c.who].name} | ${c.text} |\n`;
  n = S.cues.reduce((a, c) => a + c.text.split(/\s+/).length, 0);
  md += `\n${n} words.\n\n### Text on screen\n- Title card: “${ep.title}”.\n`;
  for (const sh of ep.shots) { for (const a of acts(sh, 'pill')) md += `- Label over Florence: “${a[2]}”.\n`; for (const a of acts(sh, 'lens')) if (a[1]) md += `- The ${a[1] === 'walk' ? 'walking-time' : a[1]} lens bar and its labels, with numbers from the simulation.\n`; for (const a of acts(sh, 'label')) md += `- Label: “${a[2].replace('{hc}', 'N').replace('{limit}', '70').replace('{lit}', 'N').replace('{homes}', '12')}” (the number comes from the simulation).\n`; }
  md += ep.card.ask ? `- Closing card, “THE QUESTION”: **${ep.card.ask}**\n` : `- Closing card, “TWO THINGS TO REMEMBER”: 🌍 **${ep.card.eco}** 🤖 **${ep.card.ai}**\n`;
}
fs.writeFileSync(path.join(here, '..', '..', 'docs', 'EPISODES.md'), md);
console.log('docs/EPISODES.md written:', md.length, 'characters');
