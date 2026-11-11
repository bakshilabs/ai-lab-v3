# Eco Town: the story episodes (storyboards and scripts)

Twelve short 3D cartoons: an **opening** before each AI Lab mission and a **closing** after it. They are made with the game's own island, Florence, builds, lenses and simulation, so they look exactly like the game. This document is written from the scripts in `game/js/game/episodes.js` by `game/tools/episodes-doc.mjs`; change the script, then run the tool again.

## What the episodes are for
- **Opening** (before the mission's start card): a tiny story that sets up the eco idea and shows Florence being confidently wrong. It ends on a question the mission answers. It never shows the lens, the test or the fix.
- **Closing** (after the mission's reward card): the same story resolved. It names, in a child's words, the eco principle and the AI habit of mind.
- The learning points are taken from `LAB-GUIDE.md` (sections 2, 5, 9A and 9B) and `DESIGN.md` ("The six levels"). Nothing is added to the curriculum. Every number on screen or in a line comes from the game's simulation (`tests/episodes.test.mjs` checks them).

## The cast
| Who | What they are like | Voice (Kokoro) |
|---|---|---|
| **Florence** | The wooden robot planner. Keen, proud, a bit literal, never mean. She says how sure she is, pulls her "oops" face when she is caught, and learns. | `af_bella` |
| **Posy** | A girl of about nine, yellow top, hair in a bun. She gives the instructions: first a vague one, later a clear one. | `bf_lily`, a little higher |
| **Dev** | A boy of about ten, green top, blue cap. He is the checker: he looks through the lens or from the street and says what he sees. | `bm_fable`, a little higher |
| **Pebble** | An otter in the river. Says nothing. Shows how the wild side of the island is doing (first and second films). | none |
| **Narrator** | Sets the scene and says the two things to remember. | `bf_isabella` (British) |

Posy and Dev are built with the game's resident builder (`person()` in `engine/kit.js`); Pebble with its otter builder. No character, tune or catchphrase is taken from any existing cartoon or game. The music and sounds are the game's own chip engine.

## The pattern of every film
1. **Title card** (first 3 seconds, top left): "ECO TOWN · STORY n OF 6 · BEFORE / AFTER THE MISSION" and the title.
2. **Opening:** the job → Posy's vague instruction → Florence's confident plan, with her "% sure" label → a child's doubt → the narrator's question, and **the question card**.
3. **Closing:** the check (Dev) → Florence's "Oops" and what she guessed → Posy's clear instruction → the fixed plan → the narrator's two things to remember, and **the remember card** (🌍 the eco idea, 🤖 the AI habit).
4. The closing card stays up for the last 3.6 seconds: this is the pause point for a group (see `LAB-GUIDE.md`, "Using the story episodes").

Captions: every spoken line, word for word, with the speaker's name (the narrator's lines have no name). Written captions keep "82%"; the voice says "82 percent".

## The twelve episodes at a glance
| # | Episode | Mission | Length | Eco principle | AI habit of mind |
|---|---|---|---|---|---|
| 1 | `land-open` “The best land” | 1. Read the land | 29 s | Flat land beside a river is a flood plain. | An AI can take one vague word ("best") too far. |
| 2 | `land-close` “The flood” | 1. Read the land | 32 s | Flat land by a river can flood in winter: build on dry ground and keep the meadow wild. | An AI can take one word too far, so say what you really mean (a clear instruction). |
| 3 | `move-open` “Easy for everyone” | 2. Getting around | 29 s | How people get to school shapes the whole town. | When an instruction leaves a gap ("everyone"), an AI fills it with a guess. |
| 4 | `move-close` “Look from the street” | 2. Getting around | 31 s | A town with safe walking and cycling routes, and cars kept at the edge, works for everyone. | When words leave a gap, an AI fills it with a guess (here: "everyone drives"). |
| 5 | `homes-open` “Strong homes” | 3. Homes | 28 s | What a home is built from matters, and some of it cannot be seen from outside. | A plan that looks right from the sky still needs checking. |
| 6 | `homes-close` “The hidden cloud” | 3. Homes | 31 s | Embodied carbon: carbon hides in building materials. Timber and straw homes are warm and low-carbon. | A plan that looks right is not proof: check with evidence (a lens). |
| 7 | `food-open` “As much as possible” | 4. Food | 27 s | Farmland is shared with wildlife: hedges are part of it. | An AI does exactly what the words say ("as much as possible"). |
| 8 | `food-close` “Enough” | 4. Food | 33 s | Habitat corridors: hedges are homes and safe routes for wildlife. "Enough" food, not "most". | An AI does what you say, not what you mean: say what must be kept as well as what you want. |
| 9 | `power-open` “Very, very sure” | 5. Water, power and waste | 26 s | Power has to work on the hard days, not only the normal ones. | A high "% sure" is not the same as being right. |
| 10 | `power-close` “The winter night” | 5. Water, power and waste | 34 s | Winter power and storage: plan for a still winter night, and store energy for later. | Confident is not the same as correct: 90% sure was wrong, 74% sure and tested was right. |
| 11 | `heart-open` “The middle” | 6. A school for everyone | 25 s | Where the school goes decides how far every child walks. | An AI reads words exactly ("the middle"), and it matters who it asks. |
| 12 | `heart-close` “Ask everyone” | 6. A school for everyone | 37 s | Walkable towns: school within a 15-minute walk of every home, and it matters who gets asked. | Biased examples give biased answers: Florence only asked drivers. (Also: she read "the middle" too exactly.) |

---

## 1a. “The best land” (`land-open`: opening of mission 1, Read the land; 29 seconds)

**Learning principle.** Eco: Flat land beside a river is a flood plain. AI: An AI can take one vague word ("best") too far.

**Where it comes from.** LAB-GUIDE.md section 5 (Level 1), section 9A "Level 1: Read the land"; DESIGN.md "The six levels".

**Set-up.** Florence's practice island for this mission; morning light. Music: the game's "day" loop, kept low under the voices.

### Shot list
| Shot | Seconds | Camera | Action | Who speaks |
|---|---|---|---|---|
| 1 | 0.0–5.0 | Wide, high angle, slow push in | Wide, slow turn over the empty island. Florence waves from the river meadow. | Narrator |
| 2 | 5.0–9.8 | Close, at eye level, slow push in | Close on Florence and the two children on the meadow. Posy hops as she asks; Florence thinks. | Posy, Florence |
| 3 | 9.8–16.0 | Medium, high angle, slow turn | High view of the meadow. Florence points; her pale plan appears on the flat land by the river, then the town pegs go in. Her “82% sure!” label pops up. | Florence |
| 4 | 16.0–19.8 | Close, high angle, slow push in | Low by the river. Pebble the otter pops up and shakes off water; Dev looks down at the wet grass. | Dev |
| 5 | 19.8–29.3 | Wide, from above, slow turn | High and wide over the pegged-out meadow. The question card comes up. | Narrator |

### Dialogue (also the caption text)
| At | Who | Line |
|---|---|---|
| 1.3 s | Narrator | This is Eco Town. Florence the robot is planning it. |
| 5.0 s | Posy | Florence! Please find the best land for our town. |
| 8.1 s | Florence | Best land? Easy! |
| 9.8 s | Florence | Here! Flat, wide and right by the river. I am 82% sure! |
| 16.0 s | Dev | Hmm. Why is the grass so squelchy? |
| 19.8 s | Narrator | Flat land looks best to Florence. But what did she miss? |
| 23.3 s | Narrator | Step into the AI Lab and check. |

59 words.

### Text on screen
- Title card: “The best land”.
- Label over Florence: “82% sure!”.
- Closing card, “THE QUESTION”: **Is the flattest land the best land?**

---

## 1b. “The flood” (`land-close`: closing of mission 1, Read the land; 32 seconds)

**Learning principle.** Eco: Flat land by a river can flood in winter: build on dry ground and keep the meadow wild. AI: An AI can take one word too far, so say what you really mean (a clear instruction).

**Where it comes from.** LAB-GUIDE.md section 5 (Level 1: flood lens; clearer card "Dry, sunny land. Keep the meadow wild."), section 9A Level 1, section 2 (learning outcomes 1 and 3).

**Set-up.** Florence's practice island for this mission, with her first (flawed) plan already built; afternoon light. Music: the game's "lab" loop, kept low under the voices.

### Shot list
| Shot | Seconds | Camera | Action | Who speaks |
|---|---|---|---|---|
| 1 | 0.0–4.8 | Wide, high angle, slow turn | Wide on the pegged-out meadow as the sky turns to winter and the river rises over the town pegs. | Narrator |
| 2 | 4.8–8.7 | Medium, from above, still | From above, through the flood lens: flood land in blue, the town’s tiles in red, with the number under water. | Dev |
| 3 | 8.7–14.5 | Close, at eye level, still | Close on Florence (her “oops” face) and the children. Posy gives the clear instruction. | Florence, Posy |
| 4 | 14.5–18.4 | Wide, high angle, slow turn | Wide: the water drops back, the pegs leave the meadow and the town land is staked out on the dry slope. Florence cheers under “Plan checked”. | Florence |
| 5 | 18.4–23.6 | Medium, high angle, slow turn | Low over the wild meadow and the river. Pebble pops up and spins. | Narrator |
| 6 | 23.6–31.7 | Wide, high angle, slow turn | High and wide over the new town land. The two-things-to-remember card comes up. | Narrator |

### Dialogue (also the caption text)
| At | Who | Line |
|---|---|---|
| 1.3 s | Narrator | Winter came to Eco Town. And so did the rain. |
| 4.8 s | Dev | Look through the flood lens! The meadow floods every winter. |
| 8.7 s | Florence | Oops. You said best. I guessed flat. |
| 11.2 s | Posy | Try this. Dry, sunny land. Keep the meadow wild. |
| 14.5 s | Florence | Dry land on the slope. The meadow stays wild. Checked! |
| 18.4 s | Narrator | Flat land by a river can flood. So build on dry ground, and keep the meadow wild. |
| 23.6 s | Narrator | And an AI can take one word too far. So say what you really mean. |

78 words.

### Text on screen
- Title card: “The flood”.
- The flood lens bar and its labels, with numbers from the simulation.
- Label over Florence: “Plan checked ✓”.
- Closing card, “TWO THINGS TO REMEMBER”: 🌍 **Flat land by a river can flood. Keep it wild.** 🤖 **An AI can take one word too far. Say what you mean.**

---

## 2a. “Easy for everyone” (`move-open`: opening of mission 2, Getting around; 29 seconds)

**Learning principle.** Eco: How people get to school shapes the whole town. AI: When an instruction leaves a gap ("everyone"), an AI fills it with a guess.

**Where it comes from.** LAB-GUIDE.md section 5 (Level 2), section 9A "Level 2: Getting around".

**Set-up.** Florence's practice island for this mission; morning light. Music: the game's "day" loop, kept low under the voices.

### Shot list
| Shot | Seconds | Camera | Action | Who speaks |
|---|---|---|---|---|
| 1 | 0.0–5.0 | Wide, high angle, slow push in | Wide over the staked-out town land and the old school by the beach. | Narrator |
| 2 | 5.0–11.9 | Close, at eye level, still | Close on Florence and the children beside the town land. Posy hops; Florence throws her arms out, then stands proud. | Posy, Florence |
| 3 | 11.9–17.2 | Medium, high angle, slow turn | High view of the street to the old school. Florence points and a wide road and a car park are laid; cars start to drive. “77% sure!”. The children walk to the kerb. | Florence |
| 4 | 17.2–20.8 | Close, at eye level, slow turn | Street level at the kerb: cars pass between the children and the school. Dev turns to Florence; she thinks. | Dev |
| 5 | 20.8–29.4 | Wide, from above, slow turn | High and wide over the road. The question card comes up. | Narrator |

### Dialogue (also the caption text)
| At | Who | Line |
|---|---|---|
| 1.3 s | Narrator | The town has its land. Now, how will people get around? |
| 5.0 s | Posy | Make it easy for everyone to get to school! |
| 8.0 s | Florence | Easy for everyone? Then everyone needs a big, wide road! |
| 11.9 s | Florence | And a car park at the school gate. I am 77% sure! |
| 17.2 s | Dev | But Florence, we walk to school. |
| 20.8 s | Narrator | Easy for everyone. Or just easy for cars? |
| 23.9 s | Narrator | Who did Florence forget? |

60 words.

### Text on screen
- Title card: “Easy for everyone”.
- Label over Florence: “77% sure!”.
- Closing card, “THE QUESTION”: **Who is “everyone”?**

---

## 2b. “Look from the street” (`move-close`: closing of mission 2, Getting around; 31 seconds)

**Learning principle.** Eco: A town with safe walking and cycling routes, and cars kept at the edge, works for everyone. AI: When words leave a gap, an AI fills it with a guess (here: "everyone drives").

**Where it comes from.** LAB-GUIDE.md section 5 (Level 2: street view at 8:45 am; clearer card "Safe walking and cycling routes. Cars stay at the edge."), section 9A Level 2 ("What does everyone include?").

**Set-up.** Florence's practice island for this mission, with her first (flawed) plan already built; morning light. Music: the game's "lab" loop, kept low under the voices.

### Shot list
| Shot | Seconds | Camera | Action | Who speaks |
|---|---|---|---|---|
| 1 | 0.0–7.5 | Close, at eye level, slow turn | Street level at the kerb at 8:45 am: the children wait while cars pass. A red label: too many cars to cross. | Narrator, Dev |
| 2 | 7.5–15.1 | Close, at eye level, still | Close on Florence (her “oops” face) and the children. Posy gives the clear instruction. | Florence, Posy |
| 3 | 15.1–18.5 | Medium, high angle, slow turn | High view: the road and car park go, and footpaths and cycle lanes are laid. Florence cheers under “Plan checked”. | Florence |
| 4 | 18.5–22.3 | Close, at eye level, slow turn | Street level: the children walk along the new path to school; a cyclist passes. | Narrator |
| 5 | 22.3–30.7 | Wide, high angle, slow turn | High and wide over the paths. The two-things-to-remember card comes up. | Narrator |

### Dialogue (also the caption text)
| At | Who | Line |
|---|---|---|
| 1.3 s | Narrator | It is quarter to nine. School time. |
| 3.9 s | Dev | Look from the street. Too many cars! We cannot cross. |
| 7.5 s | Florence | Oops. Nobody said how. So I guessed that everyone drives. |
| 11.4 s | Posy | Safe paths for walking and cycling. Cars stay at the edge. |
| 15.1 s | Florence | Paths and cycle lanes. Cars at the edge. Checked! |
| 18.5 s | Narrator | A town you can walk and cycle around is safer for everyone. |
| 22.3 s | Narrator | And when your words leave a gap, an AI fills it with a guess. So say who you mean. |

78 words.

### Text on screen
- Title card: “Look from the street”.
- Label: “Too many cars to cross” (the number comes from the simulation).
- Label over Florence: “Plan checked ✓”.
- Closing card, “TWO THINGS TO REMEMBER”: 🌍 **Safe paths to walk and cycle. Cars stay at the edge.** 🤖 **An AI fills gaps with guesses. Say who you mean.**

---

## 3a. “Strong homes” (`homes-open`: opening of mission 3, Homes; 28 seconds)

**Learning principle.** Eco: What a home is built from matters, and some of it cannot be seen from outside. AI: A plan that looks right from the sky still needs checking.

**Where it comes from.** LAB-GUIDE.md section 5 (Level 3), section 9A "Level 3: Homes".

**Set-up.** Florence's practice island for this mission; morning light. Music: the game's "day" loop, kept low under the voices.

### Shot list
| Shot | Seconds | Camera | Action | Who speaks |
|---|---|---|---|---|
| 1 | 0.0–4.8 | Wide, high angle, slow push in | Wide over the empty town plots with their paths. | Narrator |
| 2 | 4.8–10.4 | Close, at eye level, still | Close on Florence and the children by the plots. Posy hops; Florence stands proud. | Posy, Florence |
| 3 | 10.4–15.9 | Medium, high angle, slow turn | The plots from above the path: grey concrete flats go up layer by layer. Florence points, then cheers. “85% sure!”. | Florence |
| 4 | 15.9–19.5 | Close, at eye level, slow push in | Low behind the children, looking up at the tall grey flats. Dev turns to Florence. | Dev |
| 5 | 19.5–27.6 | Wide, from above, slow turn | High and wide over the concrete town. The question card comes up. | Narrator |

### Dialogue (also the caption text)
| At | Who | Line |
|---|---|---|
| 1.3 s | Narrator | Families are coming to Eco Town. They need homes. |
| 4.8 s | Posy | Florence, build strong homes, please! |
| 7.5 s | Florence | Strong? I know strong! Concrete and steel! |
| 10.4 s | Florence | They will stand for years. I am 85% sure! |
| 15.9 s | Dev | They do look strong. But is strong all a home should be? |
| 19.5 s | Narrator | From the sky, the homes look fine. |
| 21.8 s | Narrator | How can you check what you cannot see? |

57 words.

### Text on screen
- Title card: “Strong homes”.
- Label over Florence: “85% sure!”.
- Closing card, “THE QUESTION”: **What can’t you see from the sky?**

---

## 3b. “The hidden cloud” (`homes-close`: closing of mission 3, Homes; 31 seconds)

**Learning principle.** Eco: Embodied carbon: carbon hides in building materials. Timber and straw homes are warm and low-carbon. AI: A plan that looks right is not proof: check with evidence (a lens).

**Where it comes from.** LAB-GUIDE.md section 5 (Level 3: carbon lens, inside view; clearer card "Warm, low-carbon homes from local timber and straw."), section 9A Level 3, section 2 (learning outcome 2).

**Set-up.** Florence's practice island for this mission, with her first (flawed) plan already built; afternoon light. Music: the game's "lab" loop, kept low under the voices.

### Shot list
| Shot | Seconds | Camera | Action | Who speaks |
|---|---|---|---|---|
| 1 | 0.0–4.9 | Medium, high angle, slow turn | A slow move round the concrete flats. | Narrator |
| 2 | 4.9–10.2 | Wide, high angle, still | From above, through the carbon lens: the island turns to pale clay, the homes are striped red and a dark carbon cloud hangs over them with the number of tonnes. | Dev |
| 3 | 10.2–15.5 | Close, at eye level, still | Close on Florence (her “oops” face) and the children. Posy gives the clear instruction. | Florence, Posy |
| 4 | 15.5–19.4 | Medium, high angle, slow turn | The flats go and timber and straw homes go up layer by layer. A green label gives the new carbon number. Florence cheers. | Florence |
| 5 | 19.4–23.8 | Medium, high angle, slow turn | Low among the new homes as families stand at their doors. | Narrator |
| 6 | 23.8–31.4 | Wide, from above, slow turn | High and wide over the new homes. The two-things-to-remember card comes up. | Narrator |

### Dialogue (also the caption text)
| At | Who | Line |
|---|---|---|
| 1.3 s | Narrator | Some problems hide. Until you look through the right lens. |
| 4.9 s | Dev | The carbon lens! Making all that concrete gave off three times too much carbon. |
| 10.2 s | Florence | Oops. I only thought about strong. |
| 12.4 s | Posy | Warm, low-carbon homes from timber and straw. |
| 15.5 s | Florence | Timber and straw. Warm inside, and under the limit. Checked! |
| 19.4 s | Narrator | Carbon hides in the things we build with. Timber and straw keep it low. |
| 23.8 s | Narrator | And a plan that looks right is not proof. Always check with evidence. |

74 words.

### Text on screen
- Title card: “The hidden cloud”.
- The carbon lens bar and its labels, with numbers from the simulation.
- Label: “Building carbon: N of 70 tonnes ✓” (the number comes from the simulation).
- Closing card, “TWO THINGS TO REMEMBER”: 🌍 **Carbon hides in what we build with. Timber and straw keep it low.** 🤖 **Looking right is not proof. Check with evidence.**

---

## 4a. “As much as possible” (`food-open`: opening of mission 4, Food; 27 seconds)

**Learning principle.** Eco: Farmland is shared with wildlife: hedges are part of it. AI: An AI does exactly what the words say ("as much as possible").

**Where it comes from.** LAB-GUIDE.md section 5 (Level 4), section 9A "Level 4: Food".

**Set-up.** Florence's practice island for this mission; morning light. Music: the game's "day" loop, kept low under the voices.

### Shot list
| Shot | Seconds | Camera | Action | Who speaks |
|---|---|---|---|---|
| 1 | 0.0–4.5 | Wide, high angle, slow push in | Wide over the town and the hedged fields behind it. | Narrator |
| 2 | 4.5–10.5 | Close, at eye level, still | Close on Florence and the children by the fields. Posy hops; Florence throws her arms out, then stands proud. | Posy, Florence |
| 3 | 10.5–16.1 | Medium, high angle, slow turn | High view of the fields: big ploughed fields roll over every field and every hedge. “79% sure!”. | Florence |
| 4 | 16.1–19.3 | Close, at eye level, slow push in | Close on the children at the edge of a bare field. Dev looks for the hedge, then turns to Florence. | Dev |
| 5 | 19.3–27.4 | Wide, from above, slow turn | High and wide over the ploughed island. The question card comes up. | Narrator |

### Dialogue (also the caption text)
| At | Who | Line |
|---|---|---|
| 1.3 s | Narrator | The town is growing. Now everyone needs food. |
| 4.5 s | Posy | Florence, grow as much food as possible! |
| 7.4 s | Florence | As much as possible? Then I will plough everything! |
| 10.5 s | Florence | Every field. Every hedge. I am 79% sure! |
| 16.1 s | Dev | Wait. Where did the hedges go? And the bees? |
| 19.3 s | Narrator | Lots of food. But who else was living here? |
| 22.0 s | Narrator | What should Florence keep? |

54 words.

### Text on screen
- Title card: “As much as possible”.
- Label over Florence: “79% sure!”.
- Closing card, “THE QUESTION”: **What should Florence keep?**

---

## 4b. “Enough” (`food-close`: closing of mission 4, Food; 33 seconds)

**Learning principle.** Eco: Habitat corridors: hedges are homes and safe routes for wildlife. "Enough" food, not "most". AI: An AI does what you say, not what you mean: say what must be kept as well as what you want.

**Where it comes from.** LAB-GUIDE.md section 5 (Level 4: nature lens, bees and deer leave; clearer card "Enough food, and keep the hedges for the bees."), section 9A Level 4 ("What does enough mean instead of most?"), section 2 (learning outcome 3).

**Set-up.** Florence's practice island for this mission, with her first (flawed) plan already built; afternoon light. Music: the game's "lab" loop, kept low under the voices.

### Shot list
| Shot | Seconds | Camera | Action | Who speaks |
|---|---|---|---|---|
| 1 | 0.0–4.7 | Wide, high angle, slow turn | Wide over the big fields: no hedges, no bees. | Narrator |
| 2 | 4.7–9.6 | Wide, from above, still | From above, through the nature lens: lost habitat in red, kept habitat in green, and the list of animals with a cross by the bees and the deer. | Dev |
| 3 | 9.6–15.9 | Close, at eye level, still | Close on Florence (her “oops” face) and the children. Posy gives the clear instruction. | Florence, Posy |
| 4 | 15.9–19.8 | Medium, high angle, slow turn | High view: the big fields go; an orchard, beehives and a mixed farm are built and the hedges are back. Florence cheers under “Plan checked”. | Florence |
| 5 | 19.8–24.6 | Close, high angle, slow turn | Low along a hedge by the orchard, with bees in the air. | Narrator |
| 6 | 24.6–32.6 | Wide, from above, slow turn | High and wide over the farm and its hedges. The two-things-to-remember card comes up. | Narrator |

### Dialogue (also the caption text)
| At | Who | Line |
|---|---|---|
| 1.3 s | Narrator | The fields are full. But the island has gone quiet. |
| 4.7 s | Dev | The nature lens shows it. No hedges. So the bees and the deer have left. |
| 9.6 s | Florence | Oops. You said as much as possible. So I took it all. |
| 12.9 s | Posy | Enough food. And keep the hedges for the bees. |
| 15.9 s | Florence | An orchard, beehives and hedges. Enough for everyone. Checked! |
| 19.8 s | Narrator | Hedges are homes and safe paths for wildlife. Enough is better than most. |
| 24.6 s | Narrator | And an AI does what you say, not what you mean. So tell it what to keep. |

85 words.

### Text on screen
- Title card: “Enough”.
- The nature lens bar and its labels, with numbers from the simulation.
- Label over Florence: “Plan checked ✓”.
- Closing card, “TWO THINGS TO REMEMBER”: 🌍 **Hedges are homes and paths for wildlife. Grow enough, not most.** 🤖 **An AI does what you say. Tell it what to keep.**

---

## 5a. “Very, very sure” (`power-open`: opening of mission 5, Water, power and waste; 26 seconds)

**Learning principle.** Eco: Power has to work on the hard days, not only the normal ones. AI: A high "% sure" is not the same as being right.

**Where it comes from.** LAB-GUIDE.md section 5 (Level 5), section 9A "Level 5", section 9B question 4.

**Set-up.** Florence's practice island for this mission; afternoon light. Music: the game's "day" loop, kept low under the voices.

### Shot list
| Shot | Seconds | Camera | Action | Who speaks |
|---|---|---|---|---|
| 1 | 0.0–4.1 | Wide, high angle, slow push in | Wide over the timber and straw town on a sunny day. | Narrator |
| 2 | 4.1–7.3 | Close, at eye level, still | Close on Florence and the children in front of the homes. Posy hops as she asks. | Posy |
| 3 | 7.3–11.2 | Medium, high angle, slow turn | High view of the roofs: solar panels are fitted to every home. Florence points. | Florence |
| 4 | 11.2–17.3 | Close, at eye level, still | Close on Florence, very proud, under “90% sure!”. Dev hops and asks his question; she turns to him. | Florence, Dev |
| 5 | 17.3–26.1 | Wide, from above, slow turn | High and wide over the solar roofs in the sun. The question card comes up. | Narrator |

### Dialogue (also the caption text)
| At | Who | Line |
|---|---|---|
| 1.3 s | Narrator | Eco Town needs power. Clean power. |
| 4.1 s | Posy | Florence, make enough clean power for every home. |
| 7.3 s | Florence | Solar panels on every roof! On a normal day, that is plenty. |
| 11.2 s | Florence | I am 90% sure. That is very, very sure! |
| 14.5 s | Dev | What about a day that is not normal? |
| 17.3 s | Narrator | Ninety per cent sure. Is that the same as right? |
| 20.7 s | Narrator | Which day would you test? |

58 words.

### Text on screen
- Title card: “Very, very sure”.
- Label over Florence: “90% sure!”.
- Closing card, “THE QUESTION”: **Is very sure the same as right?**

---

## 5b. “The winter night” (`power-close`: closing of mission 5, Water, power and waste; 34 seconds)

**Learning principle.** Eco: Winter power and storage: plan for a still winter night, and store energy for later. AI: Confident is not the same as correct: 90% sure was wrong, 74% sure and tested was right.

**Where it comes from.** LAB-GUIDE.md section 5 (Level 5: winter test, blackout; "Unsure but right" moment, 74% sure), section 9A Level 5, section 9B question 4 ("Sure isn't right").

**Set-up.** Florence's practice island for this mission, with her first (flawed) plan already built; afternoon light. Music: the game's "night" loop, kept low under the voices.

### Shot list
| Shot | Seconds | Camera | Action | Who speaks |
|---|---|---|---|---|
| 1 | 0.0–7.5 | Medium, high angle, slow turn | The town as day turns to a snowy, windless night. The windows light up, then go dark one by one; a red label counts the homes still lit. | Narrator, Dev |
| 2 | 7.5–13.5 | Close, at eye level, still | Close on Florence (her “oops” face) and the children. Posy gives the clear instruction. | Florence, Posy |
| 3 | 13.5–20.0 | Wide, high angle, slow turn | Wide, by day: a wind turbine and batteries are built beside the town. Florence thinks, under “Only 74% sure”. | Florence |
| 4 | 20.0–26.6 | Medium, high angle, slow turn | The winter night again: every window stays lit. A green label counts them. Dev hops and Florence cheers. | Dev, Narrator |
| 5 | 26.6–33.6 | Wide, high angle, slow turn | High and wide over the lit town at night. The two-things-to-remember card comes up. | Narrator |

### Dialogue (also the caption text)
| At | Who | Line |
|---|---|---|
| 1.3 s | Narrator | A still winter night. The sun has gone. |
| 4.1 s | Dev | The winter test! Look. Every light has gone out. |
| 7.5 s | Florence | Oops. But I was 90% sure! |
| 10.0 s | Posy | Enough power for a still winter night. Store the sunshine. |
| 13.5 s | Florence | A wind turbine and batteries. I have not planned for winter before. Only 74% sure. |
| 20.0 s | Dev | Test it again. The lights stay on! |
| 22.8 s | Narrator | Plan your power for the hardest night, and store some for later. |
| 26.6 s | Narrator | And sure is not the same as right. So test the plan. |

79 words.

### Text on screen
- Title card: “The winter night”.
- Label: “Lights on: N of 12 homes” (the number comes from the simulation).
- Label over Florence: “Only 74% sure”.
- Label: “Lights on: N of 12 homes ✓” (the number comes from the simulation).
- Closing card, “TWO THINGS TO REMEMBER”: 🌍 **Plan power for the hardest night. Store some for later.** 🤖 **Sure is not the same as right. Test the plan.**

---

## 6a. “The middle” (`heart-open`: opening of mission 6, A school for everyone; 25 seconds)

**Learning principle.** Eco: Where the school goes decides how far every child walks. AI: An AI reads words exactly ("the middle"), and it matters who it asks.

**Where it comes from.** LAB-GUIDE.md section 5 (Level 6 and "Residents' summary mistake"), section 9A "Level 6: A school for everyone".

**Set-up.** Florence's practice island for this mission; morning light. Music: the game's "day" loop, kept low under the voices.

### Shot list
| Shot | Seconds | Camera | Action | Who speaks |
|---|---|---|---|---|
| 1 | 0.0–4.6 | Wide, high angle, slow push in | Wide over the whole finished town. | Narrator |
| 2 | 4.6–8.9 | Close, at eye level, still | Close on Florence and the children. Posy hops; Florence peers through her magnifying glass towards the middle of the island. | Posy, Florence |
| 3 | 8.9–15.0 | Medium, high angle, slow turn | High view of the field beside the wetland, far from the homes: Florence points and the new school goes up there. “81% sure!”. She cheers. | Florence |
| 4 | 15.0–18.3 | Wide, high angle, slow turn | From behind the children at Dev’s house, looking across the wetland to the far-away school. | Dev |
| 5 | 18.3–25.5 | Wide, from above, slow turn | High and wide: homes on one side, the school on the other. The question card comes up. | Narrator |

### Dialogue (also the caption text)
| At | Who | Line |
|---|---|---|
| 1.3 s | Narrator | One last job. Eco Town needs a new school. |
| 4.6 s | Posy | Put the school right in the middle, Florence! |
| 7.2 s | Florence | The middle. I will measure! |
| 8.9 s | Florence | Here! The exact middle of the island. I am 81% sure! |
| 15.0 s | Dev | That is a long way from my house. |
| 18.3 s | Narrator | The middle of what? |
| 19.9 s | Narrator | And who should Florence ask? |

50 words.

### Text on screen
- Title card: “The middle”.
- Label over Florence: “81% sure!”.
- Closing card, “THE QUESTION”: **The middle of what?**

---

## 6b. “Ask everyone” (`heart-close`: closing of mission 6, A school for everyone; 37 seconds)

**Learning principle.** Eco: Walkable towns: school within a 15-minute walk of every home, and it matters who gets asked. AI: Biased examples give biased answers: Florence only asked drivers. (Also: she read "the middle" too exactly.)

**Where it comes from.** LAB-GUIDE.md section 5 (Level 6: walking-time lens; "Residents' summary mistake": "Residents want more car parks", counted only drivers), section 9A Level 6, section 2 (learning outcome 6); DESIGN.md "The living town" (last paragraph).

**Set-up.** Florence's practice island for this mission, with her first (flawed) plan already built; afternoon light. Music: the game's "lab" loop, kept low under the voices.

### Shot list
| Shot | Seconds | Camera | Action | Who speaks |
|---|---|---|---|---|
| 1 | 0.0–5.8 | Wide, from above, still | From above, through the walking-time lens: homes coloured by their walk to school, the far ones red, with the minutes on labels. | Dev |
| 2 | 5.8–11.7 | Close, at eye level, still | Close on Florence (her “oops” face) and the children. Posy gives the clear instruction. | Florence, Posy |
| 3 | 11.7–14.7 | Wide, from above, still | The walking-time lens again: the school has moved and every home is green. | Florence |
| 4 | 14.7–25.2 | Close, at eye level, still | Close on Florence and the children. She is proud of her survey (“82% sure!”); Dev asks where; she thinks; Posy spots the problem and Florence pulls her “oops” face again. | Florence, Dev, Posy |
| 5 | 25.2–27.8 | Medium, high angle, slow turn | Low towards the new school. | Narrator |
| 6 | 27.8–36.7 | Wide, from above, slow turn | High and wide over the whole town. The two-things-to-remember card comes up. | Narrator |

### Dialogue (also the caption text)
| At | Who | Line |
|---|---|---|
| 1.3 s | Dev | The walking lens shows it. Eighteen minutes from my house. Too far! |
| 5.8 s | Florence | Oops. I read “the middle” too exactly. |
| 8.4 s | Posy | School within a 15-minute walk of every home. |
| 11.7 s | Florence | Moved! Now every home is close enough. Checked! |
| 14.7 s | Florence | One more thing. People want more car parks! I asked ten of them. |
| 18.9 s | Dev | Where did you ask? |
| 20.5 s | Florence | At the car park. |
| 21.8 s | Posy | So you only asked drivers! Ask at the school gate too. |
| 25.2 s | Narrator | Keep school a short walk from every home. |
| 27.8 s | Narrator | And an AI that only asks some people gives an unfair answer. So ask everyone. |

90 words.

### Text on screen
- Title card: “Ask everyone”.
- The walking-time lens bar and its labels, with numbers from the simulation.
- The walking-time lens bar and its labels, with numbers from the simulation.
- Label over Florence: “82% sure!”.
- Closing card, “TWO THINGS TO REMEMBER”: 🌍 **School a short walk from every home.** 🤖 **If an AI only asks some people, its answer is unfair. Ask everyone.**
