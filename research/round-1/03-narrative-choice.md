# How games structure progression, tell stories, and design choices and consequences, with recommendations for DeltaOps labs

**Scope note.** I verified the sources below by web search. Several GDC Vault talks (Reigns, Into the Breach, Keep Talking and Nobody Explodes, Outer Wilds, Jackbox) are behind a login, so for those I relied on official session pages and press write-ups rather than the talks themselves. The claims marked "(inference)" are mine.

## 1. Narrative in world-building games

- **Narrative architecture.** Henry Jenkins argues that designers "don't simply tell stories; they design worlds and sculpt spaces." He names four modes of environmental storytelling: evocative spaces, enacted stories, embedded narrative and emergent narrative. https://web.mit.edu/~21fms/People/henry3/games&narrative.html
- **"What Happened Here?"** Harvey Smith and Matthias Worch (GDC 2010) argue that deliberately placed props let players piece the story together themselves, which makes them more invested in the world. https://www.witchboy.net/?p=621
- **Builders often make the place the protagonist.**
  - Terra Nil's lead artist said the "main character" was the landscape, not the city. Its lead designer wanted players "hopeful", not pushed into "apathy or resignation." https://gamerant.com/terra-nil-interview-free-lives-devolver-digital-nature-beauty-audience-engagement/ and https://Techraptor.net/gaming/features/terra-nil-paints-hopeful-picture-for-future
  - Townscaper deliberately has "no goal." Oskar Stålberg: "When you can win, you play to win. When you keep score, you play to the score." https://pcgamer.com/townscapers-developer-on-how-its-radically-casual-design-is-inspiring-a-new-wave-of-low-stress-builders-to-adapt-the-blueprint
  - Before We Leave's developer said presenting information "without clutter" was one of the hardest problems. https://toisto.net/imagining-the-pale-blue-dot-an-interview-with-sam-barham
- **Characters inside builders.**
  - Frostpunk tells its story through laws. Each law moves Hope and/or Discontent, and the city's reactions make the player feel the cost. https://www.pcgamer.com/frostpunk-developers-on-hope-misery-and-the-ultimately-terrifying-book-of-laws
  - SimCity 2000's advisors were poorly received because they "only pop up to give brief advice and complain." Isabelle in Animal Crossing works better because she has a clear civic job (ordinances, projects). https://simcity.fandom.com and https://nookipedia.com/wiki/Shizue
  - The lesson: a helper character needs a clear job, not just a stream of commentary.

## 2. Choice architecture with few options

- **Reigns** has only two choices per card. Each swipe moves four "power" dimensions, and François Alliot says that "gave a lot of meaning to very simple swiping gestures." https://pcgamer.com/how-reigns-and-its-forthcoming-sequel-make-their-tinderocracy-work
  - Cards come from a weighted "bag" that is rebuilt against the global game state on every swipe. Cards that need a condition (a marriage, a strong church) only appear when it holds.
  - Once players notice that some cards respond to their past choices, every card starts to feel meaningful. https://gamedeveloper.com/design/game-design-deep-dive-creating-an-adaptive-narrative-in-i-reigns-i-
- **80 Days** is "a roguelike which is not randomly generated but… randomly authored." It reuses resources the plot already implies (money, luggage, time, the relationship between the two leads) instead of inventing artificial stats. https://www.gamedeveloper.com/design/threats-luggage-and-mild-peril-designing-i-80-days-i-
  - Jon Ingold's GDC 2015 talk covers making "choices that matter" and pacing. https://emshort.blog/2015/04/02/interactive-narrative-gdc-talks-part-1/
- **Controlling branch explosion.**
  - Sam Kabo Ashwell's patterns include branch-and-bottleneck: paths diverge, then rejoin at a shared event. It only works with heavy state-tracking; otherwise it collapses into a "gauntlet." https://www.ifwiki.org/Standard_Patterns_in_Choice-Based_Games
  - Emily Short describes quality-based and salience-based structures, where the system picks the most applicable content for the current state. https://emshort.blog/2016/04/12/beyond-branching-quality-based-and-salience-based-narrative-structures/
  - Alexis Kennedy, who coined "quality-based narrative", now prefers "resource narrative," where the resources line up with "the grain of the story." https://weatherfactory.biz/?p=6991
- **Lifeline** works within two choices and dialogue only. https://www.gameanalytics.com/blog/lifeline-3-minute-games-interview
- **Telltale's "X will remember that"** carries "a massive emotional payload" even when the story later converges. Critics note the choices often don't actually pay off. https://criticsatlarge.ca/2014/10/illusory-choice-memory-and-consequence.html and https://gameinformer.com/b/features/archive/2015/02/03/why-your-choices-dont-matter-in-telltale-games
- **Slay the Spire** balances its pick-one-of-three card rewards by tracking how often each card is picked and how often it appears in winning decks, so that every card is viable rather than equal. https://www.gamedeveloper.com/design/how-i-slay-the-spire-i-s-devs-use-data-to-balance-their-roguelike-deck-builder
- **Inscryption** builds its story into card rituals (sacrifice), and Daniel Mullins "constantly fretted" over how readable the cards were. https://www.gamedeveloper.com/design/how-game-jam-sacrifices-became-inscryption

## 3. Consequence and feedback

- **Telegraphing.** Into the Breach shows exactly what each enemy will do next, so that every loss feels like the player's own doing. https://gamedeveloper.com/game-platforms/road-to-the-igf-subset-games-i-into-the-breach-i-
- **Cheap, safe failure.** Celeste respawns you in every room, so a mistake costs 15–30 seconds, and the music keeps playing through death. https://hypercritic.org/collection/extremely-ok-games-celeste-2018-review
- **Fail forward.** In Powered-by-the-Apocalypse tabletop games, a middling roll means "things go right with a downside." https://drolleries.substack.com/p/the-gm-burden-of-adjudicating-partial
- **Knowledge as progression.** In Outer Wilds, progress comes from what the player knows, not from character upgrades. A failed loop still teaches you something. https://www.gamedeveloper.com/design/live-die-repeat-how-i-outer-wilds-i-piques-curiosity-in-an-ambivalent-solar-system
- **Delayed, visible consequence.** Papers, Please's newspaper shows the results of small decisions days later. https://bigthink.com/?p=42828
- **Meter pitfalls.** Visible stats push players toward number-crunching (a Choice of Games forum argument): https://forum.choiceofgames.com/t/do-choice-games-need-stats/1216. Townscaper makes the same point: a score changes how people play.

## 4. Sessions of 20–60 minutes

- **Kishōtenketsu.** Koichi Hayashida's Mario levels follow four beats: introduce a mechanic, develop it, twist it, resolve. https://www.engadget.com/2015/03/17/super-mario-3d-world-design/
- **Portal.** Valve playtested every week and taught by doing: players destroy the Companion Cube in the incinerator before the boss fight, rather than being told. Playtests also showed players like hearing GLaDOS, but not while they are working through a puzzle. https://theportalwiki.com/wiki/Portal_developer_commentary and https://www.gamedeveloper.com/pc/best-of-gdc-the-secrets-of-i-portal-i-s-huge-success
- **Replay.** 80 Days deliberately includes "more content than any player can be bothered to play." Showing players that other routes exist is itself a reason to replay (inference).

## 5. Group and co-located play

- **Keep Talking and Nobody Explodes** is "a game about communication": one player can see the bomb, the others hold the manual. https://gdcvault.com/play/1023113/Designing-Asymmetric-Gameplay-For-Keep
- **Jackbox** uses one shared screen plus phones, aims at "as little friction as possible," and has an audience mode for people who aren't playing. https://builtin.com/articles/jackbox-games-design-party-pack
- **Escape rooms.** Scott Nicholson's survey of 175 facilities catalogues puzzle types and how game masters give hints. http://scottnicholson.com/pubs/erfacwhite.pdf
- **Museum exhibits.** The Exploratorium's "Active Prolonged Engagement" (APE) work found that exhibits work best when visitors ask and answer their own questions. https://informalscience.org/research/fostering-active-prolonged-engagement-art-creating-ape-exhibits/

## Implications for DeltaOps labs

1. **Author by stage and state, not as 729 routes (Ashwell; Reigns).** Each stage is a bottleneck that every route passes through. A card choice writes one or two flags, such as `edges=steep`. Later text is chosen like Reigns' bag: a default line, plus more specific variants that fire when a flag matches.
   - The writing load is about 18 core beats, 20–30 conditional "echo" lines and a modular ending, not 729 scripts.
   - Test it by checking that every flag combination reaches some text.
2. **Make meters part of the world (80 Days; Kennedy).** Show Wildlife as dragonflies and frogs appearing, and Visitors as people on the boardwalk. Keep the numbers secondary, and use no more than two meters per lab.
3. **Every card is a trade-off, never right or wrong (Reigns; Frostpunk).** Each clear card should raise one meter and cost the other.
   - The vague card isn't "wrong." It is a gamble: the helper's "% sure" drops and the result is surprising, sometimes good. This teaches the AI-literacy point about precision without punishing curiosity.
4. **Treat "guess + % sure" as telegraphing (Into the Breach).** Show the helper's interpretation before the world changes, with a "Go / Rephrase" option. Children then predict, compare and own the outcome.
5. **Make retries cost seconds and never cost stars (Celeste; Outer Wilds).** Give the Curiosity meter or XP a bump for retrying a vague card, so that exploring is rewarded and not merely tolerated.
6. **Give the vague card a fail-forward result (PbtA partial success).** The helper half-succeeds and adds a complication ("I made it 'nice'… I planted lawn grass everywhere"). That complication becomes something to talk about.
7. **Keep the helper in the world, and brief (Portal; SimCity's advisors).** The helper is a character with a consistent, readable quirk, such as being cheerful and very literal. It speaks before and after a decision, never while the children are deciding, and never just to nag.
8. **Make the facilitator the game master, outside the world (KTaNE; escape-room game masters).** Facilitator cards hold information the children can't see: what the helper misread, and one "why?" question.
   - The helper narrates what happened; the facilitator asks what it means. Keeping those jobs separate stops the two voices overlapping.
9. **Plant one delayed consequence and call it out (Papers, Please; Telltale).** A choice at stage 2 pays off visibly at stage 4 or 5, with an explicit echo: "Remember the steep sides you chose? Look…" Use one strong callback per lab rather than many weak ones.
10. **Let each stage leave visible residue on the island (Jenkins; Smith & Worch; Terra Nil).** By stage 6 the island tells the group's story without words. That before/after view is the moment to screenshot.
11. **Use a kishōtenketsu arc across the six stages (Hayashida; Portal).**
    - Stage 1 teaches by doing and can't really fail.
    - Stages 2–3 develop the core idea.
    - Stage 4 is the twist.
    - Stage 5 has the hardest trade-off.
    - Stage 6 resolves the lab and produces the artefact.
12. **Build the artefact from the group's own choices (80 Days).** The habitat plan, diary or map is stitched together from flag-driven fragments, plus one "path not taken" teaser that invites a replay or discussion at home.
13. **Reward reasoning and variety, not the optimal route (Townscaper; Slay the Spire's pick-rate metric).** Give stars for Curiosity and good rephrasings, not just for meter totals. Camp leaderboards could rank "most different islands" or "best explanation."
    - Use pick-rate analytics to find cards that nobody picks, or that everyone picks.
14. **Design for the room (Jackbox; APE).** Put one shared screen up front, and vote on cards physically (stand by card A, B or C) or with tablets. Encourage children to ask their own questions, and give the facilitator an "audience" role for observers and latecomers.

### Sample 6-stage arc: "Design a pond that wildlife and visitors can share"

| Stage | Beat | Cards (one vague) | Flag / consequence |
|---|---|---|---|
| 1 Dig | Introduction (low stakes, teaches guess / % sure) | "Pond in the sunny meadow" / "Pond beside the path" / "Somewhere nice" | `site` (sun means more insects; path means more Visitors) |
| 2 Edges | Development | "Gentle muddy shelves" / "Steep stone sides, neat and safe" / "Make it look natural" | `edges` (planted for stage 4) |
| 3 Plants | Development | "Native reeds and lilies" / "Colourful garden flowers" / "Lots of green stuff" | Wildlife up or down; the vague card plants lawn (fail forward) |
| 4 First visitors | **Twist** | A school group arrives with nets, and froglets are trying to leave the water. The helper calls back the stage 2 choice: steep sides trap the froglets. Cards: "Add a ramp" / "Close the edge with a fence" / "Help the frogs" | The delayed consequence shows up. Facilitator card: "Why couldn't they climb out?" |
| 5 Sharing | Hardest trade-off | "Boardwalk and dipping platform" / "Hidden bird hide only" / "Let people see everything" | Visitors against Wildlife, with a visible crowd or with wildlife spreading |
| 6 Dusk survey | Resolution | The helper "counts" what came. The habitat plan is assembled from the flags, with a "what would you tell the helper next time?" reflection | Artefact, stars and a teaser of a route not taken |

The facilitator's closing prompt asks the group which instruction the helper understood best, and why.
