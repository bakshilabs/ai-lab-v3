# Block Quiz: design document

> Strand: Client request · Ages: 8–14 · Session: 45 / 60 / 90 min · Trailer: `games/trailers/mcquiz/` (`out/mcquiz.mp4`)

> **NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.**
> This disclaimer must appear on the title screen, the end screen, every printed sheet and any page that describes the lab ([Minecraft Usage Guidelines](https://www.minecraft.net/en-us/usage-guidelines)). The game is named only to say what the quiz is about. Block Quiz uses no Mojang or Microsoft assets: no logos, textures, fonts, sounds, characters or screenshots. A UK IP lawyer must review the lab before launch (research `10-minecraft.md`, §7 and §9: not legal advice).

## 1. Summary
Block Quiz is a whole-room quiz show about Minecraft for up to about 30 children. On every question an AI quiz helper called **Hunch** shouts out its answer with a "% sure", and the room decides whether to trust it, check it or ignore it by moving to answer pads (corners of the room). Hunch is very sure and wrong ("Lava!", 90% sure, for the portal frame; it's obsidian) because it mixes up related ideas and fills gaps with real-world guesses. The room catches it using the players' own game knowledge and, from Round 2, a rule they give Hunch: "Answer, and tell us WHY." Children learn that a confident answer is not a correct one, and that asking for a reason lets you check.

## 2. Learning outcomes
- By the end, learners can say why an AI answer that sounds certain still needs checking, using an example from the quiz.
- By the end, learners can spot an assumption in a wrong answer (e.g. "it used real-world baking for a game recipe").
- By the end, learners can ask an AI helper for a reason and judge whether the reason holds.
- By the end, learners can place an answer on a "trust / check / don't use" scale and justify it.
- By the end (ages 11+), learners can explain why asking a different source (an expert, a test) is better than asking the same AI again.

**Curriculum and framework links**
- **KS2 computing:** "be discerning in evaluating digital content" ([National Curriculum computing](https://www.gov.uk/government/publications/national-curriculum-in-england-computing-programmes-of-study/national-curriculum-in-england-computing-programmes-of-study)).
- **KS3/KS4 computing and RSHE (online safety strand):** evaluating online information; the DfE notes that AI output "requires critical judgement to check for appropriateness and accuracy" ([DfE guidance](https://www.gov.uk/government/publications/generative-artificial-intelligence-in-education/generative-artificial-intelligence-ai-in-education)).
- **Curriculum and Assessment Review (2025):** pupils should understand AI's "capabilities and its limitations" ([final report](https://assets.publishing.service.gov.uk/media/690b96bbc22e4ed8b051854d/Curriculum_and_Assessment_Review_final_report_-_Building_a_world-class_curriculum_for_all.pdf)).
- **UNESCO AI Competency Framework** ([UNESCO](https://www.unesco.org/en/articles/ai-competency-framework-students)): human-centred mindset (keeping human judgement), Understand level.
- **AI4K12:** Big Idea 2 (representation and reasoning) and Big Idea 5 (societal impact: trust).
- **OECD/EC AILit:** "Engage with AI": evaluate AI outputs.

## 3. Real-world connection and careers
- **Fact-checkers and journalists** check claims before publishing. **Librarians and teachers** help people judge sources. **Quiz writers and game testers** check answers against the current game version. **AI evaluators** run question sets against AI systems to measure how often they are right and whether their confidence matches.
- **How professionals use AI:** people draft answers with chatbots, then check facts against trusted sources; the DfE warns about "hallucination" (see section 9).
- **Children want adults involved:** in a survey supported by Microsoft, 84% of 9–12-year-olds who use AI wanted at least some help from adults ([4-H](https://4-h.org/about/blog/young-people-want-guidance-from-adults-on-use-of-ai-tools-says-first-of-its-kind-survey-from-national-4-h-council/)).

## 4. Setting, look and characters
- **Visual style:** a game-show studio on a floating island of **flat-colour, untextured** blocks with soft lighting and rounded app-style panels. Three answer pads (A red, B amber, C green, each with a letter and a shape) and a scoreboard. Avatars are small rounded figures, not box-head-on-box-body.
- **Important change from the trailer:** the trailer uses procedural 16×16 pixel textures, a pixel font and in-game names in its questions. Research `10-minecraft.md` (§9) rates 16×16 textures and blocky pixel fonts **Red** for derivative risk. The built lab uses flat colours and the DeltaOps fonts (Bricolage Grotesque and Inter).
- **AI helper:** **Hunch**, a navy speech-card with a round robot face and a light bulb that flickers while it "guesses". It speaks fast and chirpy. It says "My guess is…" and "My book says…", never "I feel". Confidence shows as words plus a bar ("Very sure · 90%").
- **Host:** the facilitator, with an optional on-screen host card.
- **Fictional names (to check against real organisations and people before release):** Block Quiz, Hunch, the Sure-o-meter. Team names: **Torch Team** and **Diamond Diggers** from the trailer are generic; **Redstone Crew** uses a Mojang game term and must be renamed (suggestion: Copper Crew). "Block Quiz" may already be used by small apps (to check).

## 5. Core loop and structure
**Act structure for every question (about 90 seconds)**
1. **Question:** shown and read aloud with three options.
2. **Hunch guesses:** answer, "% sure" and, from Round 2, a WHY line.
3. **Move:** children walk to pad A, B or C (or hold up A/B/C cards). Teams may also hold up a thumb: trust it / check it / don't use it.
4. **Reveal:** the wrong pads "drop" on screen; the right pad bursts with confetti blocks.
5. **Ask:** the host asks "What did it assume?" and the room shouts "ASSUMPTION!" with a hand to the forehead.
6. **Fix:** at the end of each round, the room picks a rule for Hunch.

**Question content rules**
- Questions are about how the game works, written in our own words. Prefer plain nouns (obsidian, sheep, compass, cake) to Mojang-coined proper nouns. Whether proper nouns may appear in question text is a lawyer's decision (open question, section 12).
- Every answer is checked against the current Java and Bedrock editions before each release (all game facts below: **to verify**).
- Every round includes children who don't play the game: they can still judge Hunch's reasons and confidence.

| Round | Goal | Real decisions | AI's confident mistake | How children catch it | Clearer instruction | On screen |
|---|---|---|---|---|---|---|
| 1. Just answer | Get the facts right | Trust, check or don't use Hunch | "What block makes the frame of a portal to the game's fiery world?" → "Lava!" **90%** (it mixed up the ingredient with the result: water on lava *makes* obsidian) | Players who have built one; the reveal; "WHY: (no reason given)" | Room rule: "Answer, and tell us WHY." | Most players fall from pad B; caption "THE AI WAS VERY SURE. AND WRONG." |
| 2. Tell us why | Judge reasons | Is the reason true? | (Correct case) "What do village traders usually want?" → "Emeralds. WHY: they buy and sell almost everything for emeralds." **85%** | Check the reason against what players know | The reason holds | "IT GAVE A REASON. YOU CHECKED IT." |
| 3. Real-world trap | Spot borrowed assumptions | Real world vs game world | "Which way does a compass point?" → "North! Compasses point north." **92%** (in the game it points to the world's spawn point) | Players' knowledge; a facilitator demo clip (original art) | "Remember: game rules, not real-world rules." | Compass card flips to show a spawn marker |
| 4. How sure should it be? | Calibrate | Stand on the Sure-o-meter line | "What do you need to bake a cake?" → "Flour, eggs, milk, sugar." **80%** (game recipe uses wheat, not flour) | Compare Hunch's % with the room's own % | "If you're not sure, say so." | Hunch re-guesses with 55% and "check with a player" |
| 5. Unsure but right | Don't ignore a hesitant source | Trust, check, don't use | "Does a sheep's wool grow back after shearing?" → "I think yes, after it eats grass. **55%**." Right | Players confirm | Keep the rule "say how sure" | Hunch's ✔/✘ record shows it right when unsure |
| 6. Finish together | Write the room's rule | Build a three-part rule from tiles | "Can you sleep safely in a bed in the fiery world?" → "Yes! Beds are for sleeping." **88%** (beds explode there) | The WHY line ("beds are for sleeping") is a typical-case assumption | "Answer, tell us WHY, say how sure, and tell us what to check." | Team scores glow; rule card printed |

**"Unsure but right" moment:** Round 5, as above. The host says: "It was only 55% sure, and it was right. Should we ignore it next time it's unsure?" (Answer: no, check it.)

**Spare questions (to verify):** which pickaxe can mine obsidian ("Any pickaxe", 75%: needs a diamond or better); what water flowing onto a lava source makes (Hunch correct, 70%).

**Scoring:** team-only, no speed points. A team earns a point for the right pad and a bonus "Checker point" for naming Hunch's assumption.

## 6. Team roles
Teams of 4–6 within the room. Roles rotate each round.

| Role | Does | Holds |
|---|---|---|
| **Captain** | Leads the team to a pad and holds up the thumb | Thumb paddle (trust / check / don't use) |
| **Expert** | Gives game knowledge; must say *how* they know | "How I know" card: played it, saw it, read it |
| **Reason Checker** | From Round 2, judges Hunch's WHY line | Card: "True reason / Wrong reason / No reason" |
| **Sure-o-meter Judge** | Says whether Hunch's % was fair | Small 0–100 slider card |
| **Assumption Spotter** | Names what Hunch assumed; earns the Checker point | "ASSUMPTION!" card |

Non-players are often the best Reason Checkers: say so at the start.

## 7. Session plans
**45 minutes**

| Min | Activity |
|---|---|
| 0–5 | Warm-up "Which helper are you?" (Speedy Guesser, Careful Checker, Question Asker corners); honesty line: "Hunch is pretend. We wrote its answers and its % sure." Show the disclaimer. |
| 5–8 | Practise pads, thumbs and the ASSUMPTION! call with a non-game question |
| 8–30 | Rounds 1, 2, 3, 5 and 6 (one or two questions each) |
| 30–42 | Discussion session (12 min) |
| 42–45 | Exit check (hands) |

**60 minutes**

| Min | Activity |
|---|---|
| 0–6 | Warm-up and practice |
| 6–40 | All six rounds (two questions each) |
| 40–55 | Discussion session (15 min) |
| 55–60 | Exit check; rule card |

**90 minutes**

| Min | Activity |
|---|---|
| 0–8 | Warm-up and practice |
| 8–45 | All six rounds |
| 45–60 | **Write your own trap:** teams write one question and a wrong-but-confident Hunch answer with a WHY. Facilitator checks facts. |
| 60–68 | Teams quiz another team with their trap |
| 68–88 | Discussion session (20 min) |
| 88–90 | Exit check |

**Short of time:** play only Rounds 1, 2 and 6. Keep the honesty line, the disclaimer and at least 10 minutes of discussion.

## 8. Assessment
- **Points:** right pads plus Checker points for named assumptions. No individual scores, no speed.
- **Artefact:** the room's **Rule Card** for AI helpers (printed or written on the board), carrying the disclaimer.
- **Exit check (hands, 60 seconds):**
  1. "Hunch says it's 90% sure. Does that mean it's right?" (No.)
  2. "Which is more useful: 'Lava!' or 'Obsidian, because water on lava makes it'?" (The answer with a reason, because you can check it.)
  3. "Hunch and a player who built it disagree. What do you do?" (Check the evidence or test it.)
- **Facilitator observation rubric**

| Criterion | Emerging | Secure | Strong |
|---|---|---|---|
| Treats confidence carefully | Follows high % | Questions high % | Explains when high % deserved trust and when it didn't |
| Checks reasons | Ignores the WHY | Says if the WHY is true | Finds the assumption inside the WHY |
| Uses evidence | "I just know" | Says how they know | Proposes a test or a second source |
| Team talk | One voice decides | Team discusses | Team disagrees and settles it with evidence |

## 9. Discussion session (instructor-led, at the end of the lab)
**Purpose:** sounding sure is not the same as being right. Ask an AI for its reason, check the reason, and use a different source when it matters.

**Set-up**
- Bring the room back with the quiz's "final whistle" sound and the line "Hunch is going to sleep. Now *you're* the experts." Turn the projector to the still of Round 1 ("Lava! 90%").
- Children sit in their teams in a circle or horseshoe on the floor, with pads still in place for movement answers.
- Materials: the Sure-o-meter floor line (masking tape from 0 to 100), thumb paddles, sticky notes, the Rule Card poster.
- Timing: 12 / 15 / 20 minutes.

**Structure (15-minute version)**

| Step | Minutes | What happens |
|---|---|---|
| Opening question (movement) | 2 | Everyone stands on the Sure-o-meter |
| Think–pair–share | 4 | Core questions 1–3 in pairs; three pairs share |
| Whole group | 6 | Core questions 4–7 |
| Ethics and careers | 2 | Question 8 or 9 |
| Takeaway | 1 | Closing ritual |

**Opening question:** "Stand on the Sure-o-meter: how sure are you that you'd have spotted the 'Lava!' mistake without the reveal?" Then ask two people at each end why.

**Core questions**
1. **(Recall) "What did Hunch say about the portal frame, and how sure was it?"**
   - Purpose: fix the key moment.
   - Strong answer: "It said lava, 90% sure. The answer was obsidian."
   - Probe: "How many of us followed it to pad B? Why?"
2. **(Reasoning) "Why might Hunch have said lava?"**
   - Purpose: model how AI errors come from related patterns, not randomness.
   - Strong answer: "Lava and obsidian go together, because water on lava makes obsidian. It mixed up what you use with what you make."
   - Probe: "Is that a silly mistake or an understandable one? Could a person make it?"
3. **(Reasoning) "What changed when we told Hunch 'Answer, and tell us WHY'?"**
   - Purpose: show that a reason makes an answer checkable.
   - Strong answer: "We could check the reason. 'They trade almost everything for emeralds' matched what we'd seen."
   - Probe: "Can a reason be wrong too? Remember 'beds are for sleeping'."
4. **(Reasoning: assumptions) "In the compass and cake questions, where did Hunch get its ideas?"**
   - Purpose: name the "real-world default" assumption.
   - Strong answer: "From the real world. Real compasses point north and real cakes need flour, but the game has its own rules."
   - Probe: "What does that tell you about using an AI for a topic it hasn't been told much about?"
5. **(Confidence) "Hunch was right at 55% about the sheep. Should we ignore it when it's unsure?"**
   - Purpose: avoid swinging to "unsure means wrong".
   - Strong answer: "No. Unsure means check it, not bin it. It was right."
   - Probe: "What % would make you check? Is there any % where you'd never check?"
6. **(Transfer) "Where else might you get a quick, confident answer that could be wrong?"**
   - Purpose: carry the habit to real life.
   - Strong answer: "A chatbot, a search summary, a friend who sounds sure, a video."
   - Probe: "Which of those can you ask 'why?' And how would you check?"
7. **(Transfer: checking) "If you couldn't ask a player, how would you check a game fact?"**
   - Purpose: build a repertoire of checks.
   - Strong answer: "Test it in the game, ask a teacher or a friend who plays, or look at the official help pages with an adult."
   - Probe: "Why is asking the same AI the same question again not a real check?"
8. **(Ethics and fairness) "Is it fair if an AI gives a wrong answer that sounds sure to someone who can't check, like a younger child?"**
   - Purpose: responsibility and who gets hurt by confident errors.
   - Strong answer: "No. They'd believe it. The AI should say how sure it is and why, and grown-ups should help."
   - Probe: "Whose job is it to make the AI honest: the people who build it, or the people who use it?"
9. **(Careers) "Some people's job is testing AI answers. What would you test it with?"**
   - Purpose: connect to AI evaluation and fact-checking roles.
   - Strong answer: "Questions where we already know the answer, and tricky ones that need game rules, not real-world rules."
   - Probe: "Which role today was most like a tester?"

**Sentence starters**
- "Hunch assumed… because…"
- "It sounded sure, but…"
- "The reason was true / wrong because…"
- "I would check… by…"
- "I'd trust it more if it…"

**Common misconceptions and responses**
- *"Hunch is cheating / trying to trick us."* → "Hunch doesn't try anything. It guesses from patterns. What pattern led it there?"
- *"A high % means it's right."* → "Its % tells us how sure *it* is. The reveal tells us if it's right. Did they match?"
- *"If it gives a reason it must be right."* → "Remember 'beds are for sleeping'. A reason helps us check, it doesn't prove anything."
- *"I don't play the game so I can't help."* → "You checked reasons and %s without game knowledge. That's the skill that matters most."
- *"Real AI (or Hunch) is a live robot listening to us."* → "Hunch is pretend: its answers were written in advance. Real AI tools also guess, and also need checking."

**Differentiation**
- **Younger or less confident:** use movement answers (pads, thumbs) before words; offer either/or questions ("Was it guessing or knowing?"); let them use the "How I know" card to answer.
- **Stretch (11–14):** "Design a question that would trick an AI but not a player. Why does it work?" "If Hunch was right 8 times out of 10 at 90% sure, was its 90% fair?" "Why might an AI trained mostly on real-world text get game facts wrong?"

**Connecting to real life**
The Department for Education's guidance on generative AI in education says that "evidence is still emerging", warns about "hallucination" (AI making things up confidently) and says that "any content produced requires critical judgement to check for appropriateness and accuracy" ([DfE](https://www.gov.uk/government/publications/generative-artificial-intelligence-in-education/generative-artificial-intelligence-ai-in-education)). Ask: "Your school's guidance says the same thing we learned today. What would 'critical judgement' look like for a homework fact?"

**Closing ritual**
- Every child completes: "Before I trust an AI's answer, I…" (the trailer's line: "…check").
- The room agrees a Rule Card for AI helpers: "Tell us the answer, WHY, how sure, and what to check."
- **Next step:** at home, ask a grown-up a quiz question and ask "how do you know?". For clubs: try Autopilot City, where the AI's confidence decides whether a car stops.

**Facilitator notes**
- **Sensitive topics:** game knowledge can become status. Never mock a wrong answer; praise good reasoning on a wrong pad.
- **Safeguarding:** children may mention online play, chat or contact with strangers in games. Acknowledge, don't probe, and pass concerns to the venue's DSL. Don't recommend servers, mods or channels.
- **Dominant voices:** the experts will rush to answer. Give them the job of saying *how* they know, then hand to the Reason Checker. Use pair talk before whole-room answers.
- **Brand language:** say "the game" or "block-building games" in scripts; do not show or describe official assets.

## 10. Accessibility and inclusion
- **Reading level:** questions under 15 words, read aloud twice. **Audio:** Hunch voiced and captioned.
- **Colour-blind-safe:** pads use colour, letter and shape (A circle, B triangle, C square); reveal uses ✔ and ✘.
- **Motor-friendly:** A/B/C cards or a buddy instead of moving; no running.
- **Non-players:** roles that need no game knowledge; mixed teams.
- **No devices:** a printed question deck, A/B/C cards and Hunch's lines read from a script.

## 11. Safety, ethics and data
- **Data collected:** none. No accounts, no names on screen (team names only), no camera.
- **Age and real AI tools:** Hunch is scripted. No live AI tools are used with children; if real chatbots come up, staff note that most have minimum ages and terms (check each tool; to verify) and should be used with an adult.
- **Gentle consequences:** pad "drops" are cartoon effects; everyone rejoins straight away; no elimination.
- **IP and brand:** disclaimer always visible; no Mojang assets; no "Minecraft-style" marketing; run the derivative-risk checklist (research `10-minecraft.md`, §9) and the "what game is this?" test on all art.

## 12. Build notes
- **Scenes:** flat-colour studio island, three pads, reveal drop and confetti, Sure-o-meter graphic, scoreboard, Rule Card builder, title and end screens with the disclaimer.
- **Scripted AI responses:** as in the section 5 table, plus "Not sure: 55%. Check with a player." and "Any pickaxe." (75%).
- **Reuse from the trailer:** pad layout and drop animation, avatar movement and cheer, question and AI panels, team scoreboard, "Just answer / Answer, and tell us WHY" fix panel. **Replace:** 16×16 textures, pixel fonts, "Redstone Crew", and question wording with in-game proper nouns.
- **Open questions:** May in-game proper nouns appear inside question text? (lawyer). Verify every fact against the current game version. Can the venue host it as "a quiz about Minecraft" in listings, given the naming rules? (lawyer).
