# Block Quest: design document

> Strand: Client request · Ages: 8–14 · Session: 45 / 60 / 90 min · Trailer: `games/trailers/bloxel/` (`out/bloxel.mp4`)

## 1. Summary
Children build platform-game rooms and a hero by placing coloured tiles on a physical grid board, then copy the board onto the screen, where it becomes a playable pixel platformer. An **AI Level Helper** labels and changes their designs. Told "Make it harder", it is 89% sure that "harder = more spikes!" and fills the room until a playtest flashes "IMPOSSIBLE! NOBODY CAN PLAY THIS." Children catch it by playtesting and watching other players. They then give a clearer rule: "Harder = one tricky jump. Keep it fair." The result: "PLAYTESTED: HARD, BUT FUN!" They learn that AI turns fuzzy words like "harder", "fun" and "fair" into something it can count, and that people have to say what those words mean and then test the result.

## 2. Learning outcomes
- By the end, learners can explain how the AI turned a vague word ("harder", "fun") into a countable rule, and what it missed.
- By the end, learners can run a playtest and use what they see (where players fail, quit or smile) as evidence.
- By the end, learners can change exactly three tiles to change the AI's label, and predict the new label before running it.
- By the end, learners can rewrite a vague design instruction with a measurable limit ("one tricky jump, at least one safe route").
- By the end, learners can say why the AI was unsure (72%) when it called their dragon a frog, and what extra detail fixed it.

**Curriculum and framework links**
- **KS2 computing:** "design, write and debug programs that accomplish specific goals"; "detect and correct errors" ([National Curriculum computing](https://www.gov.uk/government/publications/national-curriculum-in-england-computing-programmes-of-study/national-curriculum-in-england-computing-programmes-of-study)).
- **KS2/KS3 design and technology:** design, make and evaluate against criteria, including user testing (to verify statement wording).
- **KS2/KS3 art and design:** pixel design and pattern (to verify).
- **NGSS:** 3-5-ETS1-1 (define a design problem with criteria and constraints), MS-ETS1-4 (iterative testing and modification).
- **UNESCO AI Competency Framework** ([UNESCO](https://www.unesco.org/en/articles/ai-competency-framework-students)): AI system design (Apply level).
- **AI4K12:** Big Idea 3 (learning: classifiers learn from examples) and Big Idea 2 (representation: a design as a grid of values).

## 3. Real-world connection and careers
- **Game designers and level designers** decide what "hard but fair" means and write it down for the team. **Playtesters and user researchers** watch real players and report where they get stuck. **Pixel artists** design characters on small grids. **Machine-learning engineers** train image classifiers and test them on drawings they have never seen.
- **How professionals use AI:** studios experiment with AI tools that suggest or generate level layouts; designers still define the rules and playtest the result (to verify a named example before citing). Image classifiers that recognise drawings learn from many examples people have made, and they misread unusual drawings ([Google Research on Quick, Draw!](https://research.google/blog/introducing-the-kaggle-quick-draw-doodle-recognition-challenge/)).
- **The tangible precedent:** a physical 13×13 board and coloured blocks that become a game room, aimed at ages 8 and up ([School Library Journal on Bloxels](https://www.slj.com/story/kids-create-video-games-with-bloxels-no-coding-required-slj-review)). Block Quest adds what reviewers said was missing: guidance on what makes a good level, and an AI to check.

## 4. Setting, look and characters
- **Visual style:** chunky pixel-platformer rooms on a dark-blue scrolling map; a physical-looking grid board that "snaps" into the game; bright original sprites. The hero, enemies and tiles are original; nothing copies Bloxels' art, block types or brand.
- **Colour grammar (our own; colour-vision-safe, after the Okabe–Ito palette, with icon and pattern on every tile):** green with dots = ground; blue with waves = water; vermilion with diagonal hatch = hazard (spikes); yellow with a star = coin; reddish purple with cross-hatch = creature; grey with bricks = start, door or goal flag.
- **Board size:** the trailer shows 13×13. For sessions, rooms are **9×9** for ages 10+ and **7×7** for ages 8–9, so a room can be built and copied in under five minutes (research `06-kid-creators.md`, §9.2, found 13×13 too slow for short sessions). The hero art board is 9×9.
- **AI helper:** **AI Level Helper** (working name **Pixel**, to check), a small square robot in an "AI LEVEL HELPER" card. It labels designs ("A FROG!") and edits rooms. Confidence shows as a bar plus "89% SURE". It says "I guessed…" and "my rule says…", never "I like".
- **Fictional names (to check before release):** Block Quest (a common phrase; probably used by small existing games: check), Pixel, the room names (Cave Room, Sky Room, Water Room) and team names. Do not use "Bloxels" in the lab name or marketing; it is a trade mark.

## 5. Core loop and structure
**Act structure in every level (about 6–8 minutes)**
1. **Build:** the group places tiles on the mat (each child holds two colours in a role bag).
2. **Predict:** on the mat's "Pause and check" box, the group writes what the AI will say and how sure.
3. **Copy:** the Reader calls out rows, the Tapper copies the grid onto the screen, the Checker compares counts. The room "snaps" into the game.
4. **AI acts:** the Level Helper labels the design or applies the group's instruction, with "% sure".
5. **Playtest:** a child from *another* group plays the room. Falls, coins and quits show as icons.
6. **Fix:** change exactly three tiles, or choose a clearer instruction, and re-run.

| Level | Goal | Real decisions (options) | AI's confident mistake | How children catch it | Clearer instruction | On screen |
|---|---|---|---|---|---|---|
| 1. First Room | Build a room someone can finish | Where to put ground, hazards, coins and the goal | Labels the room "Lava Cave, very hard" **84%** because it counts red tiles, though all the spikes are out of reach | Playtest: finished first try; "ROOM CLEAR!" | "Count only hazards on the path." → "Easy Cave" 80% | Label flips; a path line shows the route |
| 2. Make It Harder | Make the room harder but finishable | A "Make it harder." · B "Make it better." · C "One tricky jump. Keep a safe route." | A → "HARDER = MORE SPIKES!" **89%** | Playtest: "IMPOSSIBLE! NOBODY CAN PLAY THIS."; falls pile up; no route on the path line | C → "One tricky jump, still fair." **82%** | "PLAYTESTED: HARD, BUT FUN!" |
| 3. Design a Hero | Draw a hero the AI recognises | Pixel art on the 9×9 art board | Guesses "A FROG!" **72%** (green body, big eyes) | The group knows it's a dragon; they ask what tiles the AI looked at ("why" cells glow) | "Add wings and fire breath." → "A DRAGON!" **90%** | Hero animates with flame sparks |
| 4. Fair for Everyone | Add an easy route without making it boring | A "Make it easy." · B "Make it fair." · C "Add one slow route with no hazards; keep the tricky jump." | B → "Fair = same for everyone: removing all hazards." **86%** | Playtest: finished in 4 seconds; bored faces; "Is that it?" | C | Two paths split and rejoin |
| 5. Fun Check | Make the room more fun | A "Make it fun." · B "Add more coins." · C "Fun = a choice, a secret and a reward for exploring." | A → "More coins = more fun! Adding 40 coins." **93%** | Playtesters skip coins; tally of smiles vs "too easy"; coin counter high, fun faces low | C → "Choice, secret, reward." **74%** | A hidden coin room behind a breakable wall |
| 6. Whole World | Link three rooms and swap with another team | Order the rooms; write one "Fun Rule" from picture tiles | The AI predicts "Team B finishes in 1 try" **80%**; they need 6 | The other team's real playtest log | Team adjusts one room; AI re-predicts with "I've never seen this world: 58%" | World map lights up room by room |

**"Unsure but right" moment (Level 5):** after card C, the AI says "Choice, secret, reward. I haven't seen this before: 74% sure the playtest will be fun." The playtest agrees. In Level 6 the AI says "58%" about a new world and is close.

**Designed misreads to keep (for presets):** red tiles off the path read as "hard" (Level 1); green body read as "frog" (Level 3); coins read as "fun" (Level 5).

## 6. Team roles
Groups of 3–4. Roles rotate every time the group presses "Ask the AI helper".

| Role | Does | Holds |
|---|---|---|
| **Reader** | Reads the mat aloud row by row | The mat (and role bag) |
| **Tapper** | Only person touching the screen; copies tiles | Screen and stylus |
| **Checker** | Compares tile counts on screen with the mat; flags mismatches | Legend card and counter sheet |
| **Playtest Scout** | Watches another group's player on your room; tallies falls, quits and smiles | Playtest tally card |

Everyone builds: each child holds a role bag with two tile colours and is the only one who places them.

## 7. Session plans
**45 minutes** (Levels 1, 2, 3 and 5)

| Min | Activity |
|---|---|
| 0–5 | Warm-up: facilitator builds a demo room that the AI misreads; "What did the AI miss?" Honesty line: the AI is pretend. |
| 5–31 | Levels 1, 2, 3 and 5 (about 6–7 minutes each) |
| 31–43 | Discussion session (12 min) |
| 43–45 | Blueprint printed; exit check |

**60 minutes**

| Min | Activity |
|---|---|
| 0–5 | Warm-up and role bags |
| 5–42 | Levels 1–5 |
| 42–57 | Discussion session (15 min) |
| 57–60 | Exit check; Level Blueprint |

**90 minutes**

| Min | Activity |
|---|---|
| 0–6 | Warm-up |
| 6–45 | Levels 1–5 |
| 45–65 | Level 6: whole world, Fun Rule, swap and playtest |
| 65–85 | Discussion session (20 min) |
| 85–90 | Exit check; Blueprint |

**Short of time:** play Levels 2 and 3 only, using preset rooms instead of building from scratch. Keep at least 10 minutes of discussion.

## 8. Assessment
- **Stars:** ★ prediction written before the AI ran, ★★ named what the AI counted, ★★★ fixed it by changing three tiles or with a clearer rule. Stars never reward how good the art looks.
- **Artefact:** the A5 **Level Blueprint**: the room grid (colour, icon and pattern), the AI's first and final labels with % sure, the group's prediction, the playtest tally, the three changed tiles and "Our rule for 'hard but fair': ____".
- **Exit check:**
  1. "You ask an AI to make a level 'harder'. What might it do that you didn't want?" (Add too many hazards so nobody can finish.)
  2. "Which instruction is clearer: 'Make it fun' or 'Add a choice of paths and a secret'?" (The second.)
  3. "The AI says your dragon is a frog, 72% sure. What do you do?" (Check what it looked at; add the detail it missed; don't just accept it.)
- **Facilitator observation rubric**

| Criterion | Emerging | Secure | Strong |
|---|---|---|---|
| Predicts the AI | No prediction | Predicts a label | Predicts label and % with a reason |
| Explains the misread | "It's wrong" | Names the tiles it counted | Explains the countable rule it used for a fuzzy word |
| Uses playtest evidence | Watches | Tallies falls or quits | Uses the tally to choose the three tiles to change |
| Collaborates | One child does most | Roles followed | Roles rotate smoothly; disagreements settled with the playtest |

## 9. Discussion session (instructor-led, at the end of the lab)
**Purpose:** AI can only work with what it can count. When we use fuzzy words like "harder", "fun" or "fair", it picks something countable (spikes, coins), sometimes very confidently. People must say what they mean, then test with real players.

**Set-up**
- Say "Controllers down, mats up!" Screens are turned face down or lids closed; mats and blueprints stay on the tables.
- Groups sit together at tables in a horseshoe, mats in the middle so children can point to tiles.
- Materials: the projected still of "IMPOSSIBLE! NOBODY CAN PLAY THIS."; the frog/dragon art board; spare tiles; a large "What did the AI count?" poster with three columns: *The word we used / What the AI counted / What we meant*.
- Timing: 12 / 15 / 20 minutes.

**Structure (15-minute version)**

| Step | Minutes | What happens |
|---|---|---|
| Opening question | 2 | Hold up the tile colour that caused the most trouble |
| Think–pair–share | 4 | Core questions 1–3; pairs fill one poster row |
| Whole group | 6 | Core questions 4–7 |
| Ethics and careers | 2 | Question 8 or 9 |
| Takeaway | 1 | Closing ritual |

**Opening question:** "Hold up one tile: which colour caused your room the most trouble today?" Ask three children why.

**Core questions**
1. **(Recall) "What happened when you asked the AI to make it harder?"**
   - Purpose: re-establish the key moment.
   - Strong answer: "It said 'harder = more spikes', 89% sure, and filled the room. The playtest said nobody could play it."
   - Probe: "Was it more difficult? Was that what we meant?"
2. **(Reasoning) "Why did the AI choose spikes?"**
   - Purpose: name "turning a fuzzy word into something countable".
   - Strong answer: "It can count spikes. It can't count 'tricky' or 'fair', so it counted the thing it could."
   - Probe: "Fill in our poster: the word we used, what the AI counted, what we meant."
3. **(Reasoning: confidence) "The AI was 72% sure the dragon was a frog, and 90% sure after the wings. What changed?"**
   - Purpose: show that more of the right details raise justified confidence.
   - Strong answer: "We gave it the details that only dragons have: wings and fire. Green and big eyes fit a frog too."
   - Probe: "Was 72% a fair number for that first guess?"
4. **(Evidence) "How did the playtest show you what the meters couldn't?"**
   - Purpose: value watching real people.
   - Strong answer: "The coin counter said 40 coins, but the players skipped them and said it was boring. We saw it on their faces."
   - Probe: "If you couldn't watch a player, how else could you find out if it's fun?"
5. **(Reasoning: unsure but right) "In the Fun Check, the AI was less sure with our clear rule and turned out right. Why might clearer instructions make an AI *less* sure?"**
   - Purpose: honest uncertainty can be a good sign.
   - Strong answer: "It hadn't seen a rule like ours before, so it said so. It wasn't pretending."
   - Probe: "Would you trust a helper more if it told you when it was unsure?"
6. **(Transfer) "Where else do people turn 'good' or 'fun' into a number?"**
   - Purpose: everyday proxies.
   - Strong answer: "Likes on a video, stars for an app, points in a game, marks on a test."
   - Probe: "What can a number like 'likes' miss?"
7. **(Transfer: design) "Read your rule for 'hard but fair'. Could another team use it to build a room?"**
   - Purpose: articulate a usable definition.
   - Strong answer: "Yes: 'one tricky jump, at least one safe route, finishable in five tries'."
   - Probe: "What would you test to check a room follows your rule?"
8. **(Ethics and fairness) "In Level 4 the AI said 'fair = same for everyone' and removed all the hazards. Is fair the same for everyone?"**
   - Purpose: fairness can mean different routes for different players.
   - Strong answer: "No. Fair means everyone can finish, but some people want a challenge and some need an easier route. Two paths was fairer."
   - Probe: "Who should decide what's fair in a game: the AI, the designer or the players?"
9. **(Careers) "Real game studios pay people to playtest. What would you tell a level designer after watching your playtest?"**
   - Purpose: link to playtesting and user research.
   - Strong answer: "Everyone fell at the third jump, so make the gap one block smaller."
   - Probe: "How is a playtester like a checker for an AI?"

**Sentence starters**
- "We said… but the AI counted…"
- "The AI assumed… because…"
- "The playtest showed…"
- "To make it clearer, we changed…"
- "I would check… by watching…"

**Common misconceptions and responses**
- *"The AI is being mean / wants us to lose."* → "It doesn't want anything. It counted spikes because that's what it could count."
- *"The AI is right because it's 89% sure."* → "Sure about what? The playtest disagreed. Which one do we trust?"
- *"More stuff = better level."* → "Look at the Fun Check: 40 coins, bored players. What actually made it fun?"
- *"The AI saw our drawing like we do."* → "It looked at colours and shapes in a grid. Which cells glowed? Those were its evidence."
- *"If the AI calls it wrong, our drawing is bad."* → "Your dragon was a dragon. The AI had less information than you. Adding details helped it, not you."

**Differentiation**
- **Younger or less confident:** point to tiles instead of explaining; use the poster with picture cards (spike, coin, smiley); either/or questions ("Did it count spikes or count jumps?").
- **Stretch (11–14):** "Write a rule the AI could follow exactly, with numbers." "Could a level be 'hard but fair' for one player and unfair for another?" "If the AI learned 'fun' from the most popular levels, whose fun would it learn?"

**Connecting to real life**
Google's Quick, Draw! asks people to doodle an object while an AI guesses what it is. It learned from drawings made by many players, and it gets unusual drawings wrong in ways you can see as you draw ([Quick, Draw!](https://quickdraw.withgoogle.com/); [Google Research](https://research.google/blog/introducing-the-kaggle-quick-draw-doodle-recognition-challenge/); check it is still available before the session). Ask: "Our AI called a dragon a frog. Why might an AI that learned from lots of people's drawings struggle with *your* drawing?"

**Closing ritual**
- Each child places one tile on the poster under "What we meant" and says one sentence: "When I tell an AI 'make it ___', I'll explain that I mean…"
- **Next step:** take the Level Blueprint home and build the room with LEGO, paper squares or in a game you already play; ask someone to playtest it. In clubs: try Beat Block to test a level with replays, or Island Park Tycoon to see what an AI does with one number.

**Facilitator notes**
- **Ownership and feelings:** children care about their art. If the AI misreads a design, say "The AI got it wrong, not you." Never let another group mock a room.
- **Model productive failure:** use your own demo room that the AI misreads, laugh, and fix one tile.
- **Safeguarding:** hero designs and room themes may reveal worries (e.g. scary monsters, a home). Respond kindly and pass concerns to the venue's DSL. No photos of children; the blueprint shows no names.
- **Dominant voices:** watch for the child kneeling at the edge to see the screen; make them Tapper next. Role bags mean every child places tiles.

## 10. Accessibility and inclusion
- **Reading level:** almost no reading; tiles carry icons; the AI's labels are two or three words and read aloud.
- **Audio and captions:** voiced and captioned AI lines; sound effects have visual equivalents.
- **Colour-blind-safe:** every tile has colour, a white icon and a pattern, plus a printed colour name on the legend; check printed sheets with a colour-vision simulator.
- **Motor-friendly:** large 20 mm tiles (or dot stickers), tap-or-drag painting with large cells, no timers, no camera needed.
- **No devices:** fully runnable on paper: children build on the mat, the facilitator reads the AI's scripted label from a look-up card, and another group "plays" the room with a counter, moving one square per turn.

## 11. Safety, ethics and data
- **Data collected:** none. No accounts, no names, no photos. The grid is copied by tapping, not by camera; designs live only for the session and on the printed blueprint.
- **Age and real AI tools:** the Level Helper is scripted. Staff don't use live AI art or level tools with children; if they come up, staff mention age limits and adult supervision (check each tool's terms; to verify).
- **Gentle consequences:** an impossible room means the player bounces back to the start; no losing, no deleting designs.
- **Original content:** colour grammar, sprites and tiles are original; don't copy Bloxels' block types or art.

## 12. Build notes
- **Scenes:** grid board and snap animation, platformer renderer (rooms 7×7 and 9×9, plus the trailer's 13×13 for demos), art board, playtest replay with fall and quit icons, world map, printable mat and tiles, blueprint template.
- **Scripted AI responses:** "Lava Cave, very hard." (84%) · "Easy Cave." (80%) · "HARDER = MORE SPIKES!" (89%) · "One tricky jump, still fair." (82%) · "A FROG!" (72%) · "A DRAGON!" (90%) · "Fair = same for everyone: removing all hazards." (86%) · "More coins = more fun!" (93%) · "Choice, secret, reward." (74%) · "Team B finishes in 1 try." (80%) · "I've never seen this world." (58%).
- **Reuse from the trailer:** board-to-room snap, platformer hero and room clear, AI helper card, playtest banners, art board with "AI HELPER GUESSES", world map of rooms, title card.
- **Open questions:** grid size (trailer 13×13 vs recommended 9×9/7×7); whether an optional board-only camera capture on the facilitator's device is worth the privacy review; how the scripted classifier handles thousands of possible grids (rules on tile counts and positions, as in research `06-kid-creators.md`, §9.5).
