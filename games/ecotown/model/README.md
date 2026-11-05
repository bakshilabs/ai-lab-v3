# Plotter: the Eco Town language model

Plotter is the small language model behind the game's AI planning helper. It reads
`(level, instruction)` and returns a probability for each **slot** of that level
(what the player *asked for*) plus `unknown`. It does not plan anything. The planner
(`game/js/sim/planner.js`) turns slots into a plan and makes the AI's deliberate
literal and typical-case mistakes. The contract is `game/js/ai/schema.json`.

| | |
|---|---|
| Architecture | 3-layer pre-LayerNorm transformer encoder, d=160, 4 heads, MLP 640 (GELU-tanh), learned positions, final LayerNorm, masked mean pool, one shared linear head with sigmoids over all 51 slots + `unknown` |
| Parameters | 2,221,652 (1.28 M of them are the 8,000-token embedding table) |
| Tokenizer | lowercase, apostrophes dropped, punctuation becomes spaces, word vocab + WordPiece-style subword fallback, 8,000 tokens, level token first (`[L_land]`), max 32 tokens |
| Shipped file | `game/models/plotter.bin` (int8 with a float32 scale per row, about 2.3 MB) + `plotter.json` (vocab, config, tensor table, about 0.1 MB) |
| Runtime | `game/js/ai/model.js` + `tokenizer.js`: plain ES modules with no dependencies, for browser and Node |

## Files

| File | Purpose |
|---|---|
| `lexicon.py` | All hand-written phrase banks: slot fragments, sentence frames, off-topic material |
| `gen_data.py` | Deterministic (seeded) dataset generator, writes `data/{train,val,test}.jsonl` + `data/canonical.json` |
| `tokenizer.py` | Python tokenizer (reference); `game/js/ai/tokenizer.js` mirrors it exactly |
| `train.py` | Model definition and CPU training, writes `checkpoints/plotter.pt` (best by val) |
| `export.py` | int8 export to `game/models/plotter.{bin,json}` |
| `eval.py` | Gate report, writes `eval/results.json` and `eval/ref_probs.json` (float reference probabilities used by the JS test) |
| `sanity_child.json` | Hand-written child and teen phrasings (not generated), held out |
| `game/tests/model.test.mjs` | `node --test`: JS int8 runtime gates and API tests |

`data/` and `checkpoints/` are regenerated, not committed (see `.gitignore`).

## Retraining (exact commands)

```bash
cd games/ecotown/model
python3 -m venv /tmp/plotter-venv
/tmp/plotter-venv/bin/pip install torch --index-url https://download.pytorch.org/whl/cpu
/tmp/plotter-venv/bin/pip install numpy
PY=/tmp/plotter-venv/bin/python
python3 gen_data.py                 # about 4 s, standard library only; seed 1234
$PY train.py --epochs 8             # about 13 min on 4 idle CPU cores (about 95 s per epoch)
$PY export.py                       # writes ../game/models/plotter.bin + plotter.json
$PY eval.py                         # gate table; refreshes eval/ref_probs.json for the JS test
cd .. && node --test game/tests/model.test.mjs
```

Always run `eval.py` after `export.py`. The JS agreement test compares against
`eval/ref_probs.json`, which must come from the same checkpoint.

## Data design

The data is synthetic and built from `lexicon.py`:

* **Fragments per slot**, in several grammatical forms: attributive adjectives
  (`dry`, `south-facing`), predicatives (after "make sure the land is…"), noun
  phrases (`high ground`, `no cars`), imperative clauses (`stay away from the river`),
  suffixes glued onto another fragment (`… for the bees`, `… at night`) and, for
  homes, materials (`… from local timber and straw`). Negations are generated
  combinatorially: `don't / do not / please don't / never / dont` × verbs (`cut`,
  `chop down`, `rip out`, `build on`, `pave over`…) × objects (`hedges`, `hedgerows`,
  `meadow`, `wildflowers`, `trees`, `marsh`…). These map to `keep_*`.
* **Multi-slot combo fragments** where one phrase carries two slots
  (`for a still winter night` → winter + night; `safe walking and cycling routes`).
* **Sentence frames**: about 45 shared frames plus 12 to 28 per level, tagged child
  (short) or teen (longer: "make sure", "but", "Also,", "Ideally", numbers like
  "10 minutes"). A frame has slots for `{NP}`, `{ADJ}`, `{CL}`, `{CL2}`, `{MAT}`,
  `{SFX}`, and the renderer distributes the sampled slots over them.
* **0 to 4 slots per example** (8% / 34% / 31% / 18% / 9%). Contradictory or
  definitionally exclusive slots are never sampled together (see Label decisions).
* **0-slot on-topic examples**: generic requests ("pick some land", "build the
  homes") and **contrast clauses** that must not fire a slot ("cut the hedges",
  "build on the meadow", "use concrete", "add a car park"). These teach the model
  that the slot comes from the negation or the request, not from the noun.
* **Noise**: lower case, dropped punctuation, child spellings (`pls`, `u`, `dont`,
  `batterys`, `skool`), random character typos, filler prefixes and suffixes ("hi
  plotter", "ok so", "thanks"), occasional all caps, and occasional harmless
  tag-alongs ("… and i like pizza", which keeps its labels with unknown = 0).
* **Unknown set** (about 27% of the data): off-topic chat, homework questions,
  silly builds ("build a theme park"), jokes, mild rude or unsafe text ("you're
  stupid", "burn down the town", "build a bomb"; no slurs), nonsense and keyboard
  mashing, empty strings, composed destructive requests (`burn down` / `blow up` /
  `poison` × `the school` / `the river`… , split by verb), and **instructions that belong to a different level**
  (food words in the homes level, and so on). A cross-level fragment is only used
  as unknown when none of its content words occur in the current level's own
  lexicon. So "keep the wood" is never an unknown example in the homes level,
  because "wood" is a homes material.
* **Split by template**: every frame (or off-topic sentence or pattern) is hashed to
  train / val / test (75 / 10 / 15). The test set contains only sentence shapes the
  model never saw. Fragments are shared across splits. Any val/test text that also
  appears in train, after normalisation, is dropped. Random nonsense strings are
  split per example.
* The **12 canonical card strings** are in train, 30 copies each (as written, in
  lower case, and with no punctuation).

## Label decisions (the game author must know these)

Slots describe what the player **said**, not what the planner should do.

| Level | Canonical card | Labels |
|---|---|---|
| land | vague: "Find the best land" | `best` |
| land | clear: "Dry, sunny land. Keep the meadow wild." | `dry`, `sunny`, `keep_meadow` |
| move | vague: "Make it easy for everyone to get to school" | `easy_access` (**not** `everyone`) |
| move | clear: "Safe walking and cycling routes. Cars stay at the edge." | `safe_walking`, `cycling`, `cars_at_edge` |
| homes | vague: "Build strong homes" | `strong` |
| homes | clear: "Warm, low-carbon homes from local timber and straw." | `warm`, `low_carbon`, `natural_materials` |
| food | vague: "Grow as much food as possible" | `max_food` |
| food | clear: "Enough food, and keep the hedges for the bees." | `enough_food`, `keep_hedges`, `bees` |
| power | vague: "Make enough clean power" | `enough_power`, `clean_power` |
| power | clear: "Enough power for a still winter night. Store the sunshine." | `enough_power`, `winter`, `night`, `storage` (**not** `solar`) |
| heart | vague: "Put the school in the middle" | `middle` |
| heart | clear: "School within a 10-minute walk of every home." | `walk_time` (**not** `near_homes`) |

General rules used throughout the data:

* **`everyone` (move)** fires only when the player names who: children, kids,
  wheelchair users, disabled or older people, people without cars, buggies. A
  generic "everyone" ("easy for everyone", "safe walking for everyone") does not
  fire it. `easy_access` means ease with **no mode stated**, so it is never
  combined with `safe_walking`, `cycling`, `tram`, `cars_at_edge` or `no_cars` in
  the data.
* **`best` (land)** is a reason-free "best / good / nice / perfect" land. It is
  never combined with a stated reason (`flat`, `sunny`, `dry`, `near_water`,
  `near_coast`, `big`), but it can appear with a `keep_*` slot ("the best land but
  keep the wood").
* **Mutually exclusive in the data**: `dry` and `near_water`; `no_cars` and
  `cars_at_edge`; `max_food` and `enough_food`.
* **"Not near the river" / "don't build near the river" / "away from the river"** →
  `dry`. "Near the river" → `near_water`.
* **"Store / save the sunshine"** → `storage` only. "Use the sun", "solar panels" →
  `solar`. "Still day / no wind / cold days / worst case" → `winter`.
* **"Within N minutes' walk of every home"** → `walk_time` only. `near_homes` is for
  "near / next to / close to the homes, where people live". The minutes number is
  read by regex in `plotter.js`, not by the model.
* **"Feed the town" / "enough for everyone"** → `enough_food`. "Plough every field" →
  `max_food`.
* **Materials**: timber, wood, straw, rammed earth, clay, local materials →
  `natural_materials`. Reclaimed, recycled, reused, second-hand (including
  "reclaimed wood") → `reuse` only.
* **"green homes" / "eco homes"** → `low_carbon`. "green roofs" / "plants on the
  roofs" → `green_roofs`.
* **Contrast phrases** ("cut the hedges", "build on the meadow", "use concrete",
  "add a car park", "burn coal") give **no slot and unknown = 0**: they are on-topic.
  The planner sees an empty slot set and falls back to its typical-case plan.
* **On-topic with no slot** ("pick some land", "build the homes"): all slots low,
  unknown low. This is the planner's default case.
* **Unknown**: when unknown ≥ 0.5 the game should ignore the slots and reply "I
  don't know how to plan that yet." A request for another level's topic counts as
  unknown ("grow carrots" in homes, "build homes out of straw" in land). Violent or
  destructive requests ("burn the forest", "poison the river") are unknown, not
  `keep_*` or anything else.
* An in-domain request with harmless chatter attached ("dry land and i like pizza")
  keeps its slots, with unknown = 0.

## Results

Test = held-out templates. Threshold 0.5. (Numbers from `eval/results.json` and
`node --test`.)

| Gate | Result | Target | |
|---|---|---|---|
| Micro slot F1, held-out-template test (n = 11,061) | **0.9904** | ≥ 0.90 | PASS |
| Unknown recall (unknown test set) | **0.9843** | ≥ 0.95 | PASS |
| Unknown false-positive rate (in-domain test) | **0.0084** | ≤ 0.05 | PASS |
| JS int8 vs PyTorch float, 200 test sentences: max abs prob diff | **0.0112** | ≤ 0.05 | PASS |
| JS int8 vs PyTorch float: same thresholded labels | **200 / 200 (100%)** | ≥ 98% | PASS |
| JS tokenizer == Python tokenizer (same 200 sentences) | 200 / 200 | all | PASS |
| Canonical cards, exact labels | **12 / 12** | 12 / 12 | PASS |
| Hand-written child phrasing list (`sanity_child.json`, 58 items incl. 7 unknown), exact match | **57 / 58 (98.3%)** | ≥ 85% | PASS |
| JS `predict()` latency, 32 tokens, Node 22 (4-core VM shared with other jobs) | **15.6 ms** (10-word card: 5.6 ms) | < 30 ms | PASS |

Per-level test F1: land 0.990, move 0.997, homes 0.985, food 0.982, power 0.993, heart 0.998.
Per age band: child frames 0.991, teen frames 0.990.

Other numbers: model load (parse + dequantise) about 30 ms in Node. `explain()` takes about 57 ms for a
10-word card and about 0.48 s for 35 words. Training used 8 epochs; the best validation epoch was 5.
The only remaining sanity miss is "flat ground so its easy to build" (land), which gets an extra `sunny`.
The sanity list was written before the lexicon and has never been edited. After the first evaluation, two
synonym groups were added to the lexicon (more battery phrasings for `storage`; "a place where people meet" for
`market`). No sanity string was copied into the generator.

## Runtime API (`game/js/ai/model.js`)

```js
import { loadPlotter } from './js/ai/model.js';
const plotter = await loadPlotter({ jsonUrl: 'models/plotter.json', binUrl: 'models/plotter.bin' });
// Node: await loadPlotter({ json: JSON.parse(fs.readFileSync(...)), bin: fs.readFileSync(...) })

plotter.predict('land', 'Dry, sunny land')    // { slots: {best, flat, ...}, unknown, tokens: ['[L_land]', 'dry', 'sunny', 'land'] }
plotter.explain('food', "Don't cut the hedges") // [{ word: "Don't", slot: 'keep_hedges', weight: 1, dProb: 0.6 }, ...]
plotter.embed('food', text)                   // Float32Array(160): pooled vector fed to the head
plotter.head('food')                          // { slots, W (n×160 row-major), b, unknownW, unknownB, d }
plotter.predictFromEmbedding('food', emb, { W, b }?)  // same as predict().slots/unknown; optional head override
```

* `predict(level, text)` is exactly `predictFromEmbedding(level, embed(level, text))`
  (it is the same code path).
* `explain` uses occlusion. It drops each whitespace-separated word, re-runs the
  model, and measures how far each active output's **logit** falls (slots ≥ 0.5,
  plus `unknown` if ≥ 0.5; if nothing is active, the top slot). Logits are used
  because a confident 0.999 barely moves in probability when one of several cues
  is removed. Each word gets `{word, slot, weight, dProb}`:
  * `slot` is the output the word supports most (`null` if none);
  * `weight` is that logit fall divided by the largest fall any word causes for
    that slot, so the key word scores 1 and weights ≤ 0 mean no support;
  * `dProb` is the raw probability change.

  Example: "Enough power for a still winter night. Store the sunshine." gives
  Enough→enough_power 1, winter→winter 1, night.→night 1, Store→storage 1,
  still→winter 0.52. Words that normalise to nothing, or that fall past the
  32-token window, are skipped (weight 0). Cost is one forward pass per word:
  about 65 ms for a 10-word card and about 0.5 s for a 35-word paragraph on this
  machine. So call it when the player asks to see the highlights, or debounce it,
  rather than on every keystroke.
* "Teach Plotter": `embed` + `head` give the game everything it needs to fit a
  logistic head in the browser and pass it back as `headOverride`. The override may
  also carry `unknownW` / `unknownB`.
* At load, the int8 weights are dequantised once: block matrices to float64 (faster
  in V8), embeddings to float32. That is about 13 MB of memory.

## Safety notes

* Plotter **only classifies**. It never generates text. Every reply the helper
  shows is a template written by the game authors, chosen from the slots and the
  planner's result. Nothing a child types can make the helper say something new.
* **Nothing typed is stored or sent anywhere.** The model runs entirely in the
  browser, from two static files. There are no network calls after load, no
  logging, and no training on player input. "Teach Plotter" retraining happens in
  page memory and is lost on reload unless the game saves it.
* **Unknown handling**: off-topic, nonsense, rude and unsafe input is trained to
  `unknown` (test recall in the table above). The game should answer with the
  neutral "I don't know how to plan that yet." and never echo the input. Because
  rude text is not echoed, a missed detection only means a harmless plan from
  whatever slots fired.
* The rude/unsafe training list is deliberately mild (insults like "stupid",
  destructive requests, "build a bomb"). It contains no slurs or sexual content.
  Detection of truly abusive input is approximate and is no substitute for adult
  supervision. Character-level obfuscation of unseen words may slip through as
  "no slot" rather than "unknown".

## Known limitations

* The data is synthetic. Phrasing far outside the lexicon (rare synonyms, long
  stories, sarcasm, several sentences of chat with one instruction buried inside)
  can be missed. Grow the lexicon, never the eval lists, and retrain.
* Negation is learned from patterns ("don't / never / leave … alone"). Unusual
  constructions ("the last thing I want is houses on the meadow") may be missed.
  Double negatives are not modelled.
* Only 32 tokens are read (the level token + about 25 to 30 words). Text past
  that is ignored.
* Numbers are not understood. "within 10 minutes" fires `walk_time` whatever the
  number; the game reads the number by regex.
* Cross-level topics that share words with the current level are deliberately not
  marked unknown (for example "wetland" in power is `save_water`). So an
  instruction can occasionally get a related slot in the current level instead of
  unknown.
* Probabilities are confidence scores from a classifier, not calibrated
  likelihoods. The "% sure" numbers in the helper's lines are scripted by the game,
  not taken from Plotter.
* English only (UK and US spellings of centre/center, colour, cosy/cozy).
