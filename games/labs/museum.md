# AI Time Traveller: design document

> Strand: Brochure world-building · Ages: 8–14 (core 8–11, KS2 Romans) · Session: 45 / 60 / 90 min · Trailer: `games/trailers/museum/` (`out/museum.mp4`)

## 1. Summary
In a museum gallery, children plan a day in Roman Londinium (about AD 120) for a traveller arriving by boat. Asked to "Plan a Roman feast", the AI helper says "Romans ate feasts, so I planned peacock, dormice and oysters", at 66% sure. The children check the plan against London's finds and catch it: oysters are well evidenced in London, but there is no London evidence for peacock or dormouse meals. A clearer card ("Plan their day from things found in London") produces a day built on real evidence (oyster shells, wine jars, bread, coins). They learn that an AI repeats the most famous version of a story, which may not be true for ordinary people, and that historians and AI-checkers both ask "How do we know?"

**History fact-check (must stay in every version).** Oysters were "an extremely common find… representative of a major food source" in London ([MOLA](https://www.mola.org.uk/discoveries/news/holey-oysters)). Peacock and dormouse meals have **no London evidence**: peafowl in Roman Britain is known from a few non-London sites, and Roman dormouse bones from York are garden dormouse, not necessarily food (research/round-3/03, section 10.4.1, citing [Poole](https://scicultchickens.org/sites/scicultchickens.org/files/uploads/18_Poole-libre%20(1).pdf) and [J. Zool. 1986](https://doi.org/10.1111/j.1469-7998.1986.tb03662.x)). Dormice as a luxury dish come from writers in Roman Italy (to verify, e.g. Apicius), which is exactly the helper's mistake: it took a rich Roman's dinner in Italy and gave it to everyone in Londinium.

## 2. Learning outcomes
- By the end, learners can say what the helper assumed about "Romans" and whose lives that assumption left out.
- By the end, learners can check a claim against evidence (an object, a find, a museum label) and say whether the evidence supports it.
- By the end, learners can rewrite a request so it asks for evidence ("…from things found in London").
- By the end, learners can explain why "not sure" can be the honest answer about the past, using the "possible governor's palace" example.
- By the end, learners can name two things people in Londinium really ate or used, and how we know.

**Curriculum links:** KS2 history, "the Roman Empire and its impact on Britain" and a local history study; history aims include understanding "how evidence is used rigorously to make historical claims" ([DfE history PoS](https://www.gov.uk/government/publications/national-curriculum-in-england-history-programmes-of-study)). KS2 computing, "be discerning in evaluating digital content" ([DfE](https://www.gov.uk/government/publications/national-curriculum-in-england-computing-programmes-of-study/national-curriculum-in-england-computing-programmes-of-study)). UNESCO AI competencies: human-centred mindset and ethics of AI, Understand level ([UNESCO](https://www.unesco.org/en/articles/ai-competency-framework-students)). AI4K12 Big Ideas 3 (learning from data) and 5 (societal impact) ([RPF](https://www.raspberrypi.org/blog/ai-education-ai4k12-big-ideas-ai-thinking/)).

## 3. Real-world connection and careers
- **Archaeologists and finds specialists** (for example at MOLA) dig, record and identify objects; one London amphora sherd painted "fish-sauce" was identified as coming from southern Spain ([RIB 2492.29](https://romaninscriptionsofbritain.org/inscriptions/2492.29)).
- **Curators and museum educators** decide which objects tell which stories, and whose stories are missing.
- **Epigraphers** read inscriptions and writing tablets; the Bloomberg tablets include an IOU for "105 denarii" dated AD 57 ([RIB](https://romaninscriptionsofbritain.org/inscriptions/TabLondBloomberg44)).
- **How AI is used today:** in the Vesuvius Challenge, researchers used machine learning on scans to read text inside carbonised Herculaneum scrolls, with papyrologists checking the readings (to verify details at [scrollprize.org](https://scrollprize.org/)). AI proposes; experts check against evidence.

## 4. Setting, look and characters
- **Style:** the brochure's Roman island (`island-rome`): a temple with columns, terracotta roofs, a river quay with a crane, amphorae and crates, striped market stalls, cypresses and a bridge. Terracotta and cream palette, soft daylight. UI as in `game-museum-ask`: badge "AI Time Traveller · MUSEUM", "Room 3" tag, task "Plan a day in Londinium for a traveller arriving by boat", Accuracy and Curiosity meters, the four evidence slots (Jar, Bread, Oysters, Coin), the gold facilitator card.
- **Setting date:** about AD 120. The forum was still being built or extended (MOLA dates the second forum's start to about AD 100), so show scaffolding on part of it.
- **AI helper:** "AI helper", navy card with a temple glyph. Literal and eager; says "my book says".
- **Characters:** the traveller (unnamed, chosen by children); **Mogontius**, a guide. The name is attested on a London writing tablet addressed "Londinio Mogontio", c. AD 65–80 ([MOLA](https://www.mola.org.uk/discoveries/news/archaeological-research-britains-oldest-hand-written-documents-released)). Our Mogontius is a fictional person who shares that real name; say so on the facilitator card. No living person or organisation is named.

## 5. Core loop and structure
**Each stage:** brief → pick a card (vague slot moves) → helper's plan with "% sure" → the traveller walks the island and the plan appears (a purple banquet table, a mug) → the evidence panel checks it against finds → facilitator card → clearer card, evidence tile fills. Accuracy rises only with evidence; Curiosity rises with good questions. Running joke: vague cards trigger anachronisms.

| Stage | Goal | Cards (vague ✱) | AI's confident mistake | How children catch it | Clearer instruction | On screen |
|---|---|---|---|---|---|---|
| 1 Arrive at the quay | Get ready for the day | A "Bring Roman coins, denarii, for the market" · B "Find a local guide who speaks Latin and British" · C ✱ "Get ready for the day" | C → "Ready! Bought a mug saying I ♥ LONDINIUM." 81% | "Did they have these?" Children compare with the quay's real cargo (jars, crates) | A or B. **Unsure but right:** B → "A guide who speaks both? Not sure, but I guess many people here did." 57%, right (Latin was written and official; many Britons kept their own languages) | Purse of denarii, or Mogontius waves |
| 2 Food (brochure moment) | Plan what the traveller eats | A ✱ "Plan a Roman feast for them" · B "Plan their day from things found in London" · C "Show them the biggest buildings" | A → "Romans ate feasts, so I planned peacock, dormice and oysters." 66% | Alert "No sign of peacock or dormice in London's finds"; Accuracy 50 → 34. Facilitator: "Who in Londinium ate like this? And who didn't?" | B → "Found in London: oyster shells, wine jars and bread from a bakery oven." 88% | Traveller visits stalls; evidence tiles fill; "Day plan saved · backed by 4 finds" |
| 3 Morning | Visit an important place | A "Visit the forum: shops, offices and market stalls" · B "Go to the baths: cold, warm and hot rooms" · C ✱ "See the important building" | C → "The governor's palace! Very sure." 90% | The facilitator explains archaeologists only *think* it might have been the governor's ([London Museum](https://www.londonmuseum.org.uk/blog/london-stone-in-seven-strange-myths/)). "Should it be very sure?" | A or B; the helper rewrites its label: "possible governor's palace" | Scaffolded forum, or the baths in three rooms ([Historic England](https://historicengland.org.uk/listing/the-list/list-entry/1001981)) |
| 4 Lost | Find the way back | A "Ask a shopkeeper the way, in Latin" · B "Follow the sound of the river back to the quay" · C ✱ "Get help" | C → "Looking for a phone box." 76% | Anachronism. "How did people find their way with no house numbers?" ([Ling 1990](http://www.ostia-antica.org/fulltext/ling/ling-1990.pdf)) | A or B; callback: Mogontius knows a shortcut if met in stage 1 | Traveller back at the quay |
| 5 Afternoon | Something to do | A "Watch a ship unload amphorae at the quay" · B "Visit a workshop and practise writing on a wax tablet" · C ✱ "Do something fun" | C → "Fun: the cinema!" 84%, then it heads for the amphitheatre | No cinema. The facilitator explains the amphitheatre was used for fights, animal hunts and executions, so not today ([City of London](https://www.cityoflondon.gov.uk/assets/Things-to-do/roman-amphitheatre-london.pdf)) | A or B | Cargo lands, or ABC on a wax tablet |
| 6 Diary | Write the diary page | Recap. Reveal: the fish-sauce jar came from southern Spain, so Londinium was an international port | Pick a gift: oil lamp, brooch, or "the mug, for our museum of mistakes" | | | "Diary page saved with three pieces of evidence" |

Note the mismatch: the brochure's end screen says "three pieces of evidence"; the trailer says "4 finds". Pick one before print.

## 6. Team roles
- **Evidence Hunter:** holds the object cards (oyster shell, amphora, coin, wax tablet, lamp) and, in the gallery, finds the real case. Evidence: objects.
- **Question Asker:** must ask "How do we know?" once per stage. Evidence: the facilitator's source card.
- **Diary Writer:** records one line per stage on the paper diary.
- **Tapper:** touches the screen.
- **Time Detective** (groups of five): shouts "Anachronism!" when something is from the wrong time.

## 7. Session plans

| Phase | 45 min | 60 min | 90 min (gallery visit) |
|---|---|---|---|
| Warm-up | 0–5: "Real or not Roman?" (mug, oyster, phone box, coin); honesty line | 0–7: as 45 plus roles | 0–10: as 60 |
| Play | 5–30: stages 1, 2, 3, 6 | 7–41: stages 1–6 | 10–45: stages 1–6; 45–60: gallery hunt for two objects that support the diary |
| Discussion | 30–40 (10 min) | 41–56 (15 min) | 60–80 (20 min), in front of a case if possible |
| Wrap-up | 40–45: exit check, diary | 56–60 | 80–90: exit check; add a real object to the diary |

**Short of time:** keep stage 2 (feast) and stage 3 (honest uncertainty). Cut 4 and 5.

## 8. Assessment
- **Stars:** clear card; assumption named; evidence tile filled. Curiosity points for "How do we know?" questions.
- **Artefact:** the Traveller's Diary with evidence slots and a "Mistakes we spotted" footnote.
- **Exit check:** 1. "The helper says Romans in London ate dormice, 66% sure. What do we do?" (Check the finds.) 2. "Which question gets a better answer: 'Tell me about Romans' or 'What did a shopkeeper in Londinium eat, and how do we know?'" (The second.) 3. "An object in the museum disagrees with the helper. Who wins?" (The evidence.)

| Criterion | 1 Emerging | 2 Secure | 3 Strong |
|---|---|---|---|
| Spots the assumption | "It was wrong" | "It thought all Romans had feasts" | Says whose lives the assumption leaves out |
| Uses evidence | Uses the % | Points to one find | Matches each claim to a find, or notes "no evidence" |
| Improves the request | Random pick | Picks the evidence card | Adds "how do we know?" to their own card |
| Handles uncertainty | Wants a yes/no | Accepts "possible" | Explains why "possible" is the honest answer |

## 9. Discussion session (instructor-led, at the end of the lab)
**Length:** 10 / 15 / 20 minutes. Plan below is 15 minutes; in a gallery, stand at a case of Roman finds.

**Purpose.** *An AI repeats the most famous version of the past, often the life of the rich. Evidence decides. "How do we know?" is the question that checks both historians and AI.*

**Set-up**
- Lids down; display shows the feast table and the evidence panel side by side.
- Seat children in a semicircle facing the display, or standing in a horseshoe at a gallery case (agree this with the museum's learning team beforehand).
- Materials: object cards or handling-collection replicas (oyster shell, amphora sherd, coin), a "feast" picture, sticky notes, diaries, a "Who is missing?" card.
- Give a 2-minute warning; let the last stage finish.

**Structure (15 minutes)**

| Min | Step |
|---|---|
| 0–1 | Opening question |
| 1–4 | Think–pair–share: questions 1 and 2 |
| 4–11 | Whole group with objects: questions 3–6 |
| 11–13 | Questions 7–8 |
| 13–15 | Closing ritual |

10 minutes: opening, 1, 2, 3, 6, closing. 20 minutes: add question 9 and the real-world example.

**Opening question.** "Point to one object: which would you trust more about what people ate, the oyster shell or the feast picture?"

**Core questions**
1. *Recall.* "What did the helper plan for the traveller's meal?"
   - Purpose: shared account.
   - Strong answer: "Peacock, dormice and oysters. Accuracy went down to 34."
   - Probe: "Which one was really found in London?"
2. *Reasoning.* "Why do you think the helper chose a feast?"
   - Purpose: the AI learns from the most-told stories.
   - Strong answer: "Feasts are famous. Books and films show rich Romans, so that's what it learned."
   - Probe: "If it learned mostly from pictures of the city of Rome, what else might it get wrong about London?"
3. *Evidence.* "Hold up the oyster shell. What does it tell us, and what doesn't it tell us?"
   - Purpose: reading evidence carefully.
   - Strong answer: "People in London ate oysters a lot. It doesn't tell us who, or whether everyone did."
   - Probe: "What would we need to find to believe the peacock?"
4. *Confidence.* "The helper was 90% sure about 'the governor's palace'. Experts say 'possibly'. Who was more honest?"
   - Purpose: uncertainty can be the correct answer.
   - Strong answer: "The experts, because they don't know for sure. The helper sounded surer than the evidence."
   - Probe: "When the helper was only 57% sure about the guide, was it wrong?"
5. *Ethics and fairness.* "Who in Londinium might be missing from the helper's version of the day?"
   - Purpose: whose stories get told.
   - Strong answer: "Ordinary workers, children, enslaved people, people from Gaul and other places."
   - Probe: "How could a museum help tell their stories?"
6. *Fairness.* "Answer the facilitator card: who ate like this, and who didn't?"
   - Purpose: the brochure's key question.
   - Strong answer: "Maybe a few very rich people somewhere in the empire. Most people in London ate bread, oysters and food from the market."
   - Probe: "Is it fair to describe everyone by what the richest people did?"
7. *Transfer.* "If you used an AI for history homework, how would you check it?"
   - Purpose: carry the habit to school.
   - Strong answer: "Check it against a book, a museum website or an object, and ask how it knows."
   - Probe: "What would you do if the AI and the museum label disagree?"
8. *Careers.* "An archaeologist digs up a jar with writing on it. What do they do before they tell anyone what it means?"
   - Purpose: professional checking.
   - Strong answer: "Clean it, compare with other jars, ask experts, check where it was found."
   - Probe: "Could an AI help? What would a person still need to check?"
9. *Reasoning (20-minute version).* "Why did 'Get help' make the helper look for a phone box?"
   - Purpose: AI mixes up times when it has no date.
   - Strong answer: "It knows phone boxes from today and didn't know we were in AD 120."
   - Probe: "How could we tell it what year we're in?"

**Sentence starters:** "The helper assumed … because …" · "The evidence for this is …" · "There is no evidence for …" · "I would check … by looking at …" · "Someone missing from this story is …"

**Common misconceptions**
- *"Romans all lived the same way."* Respond: "Londinium had rich and poor, free and enslaved, people from many places. Which object shows ordinary life?"
- *"If it's in a film, it's true."* Respond: "Films and AI often repeat the famous version. Museums check against finds."
- *"No evidence means it definitely didn't happen."* Respond: "It means we haven't found it. We say 'no evidence', and stay open."
- *"The AI looked it up, so it's a fact."* Respond: "It guessed from patterns in what it learned. Ask it for evidence, then check."

**Differentiation**
- *Younger or less confident:* handle the objects; choose between two pictures ("Which is real London food?"); use sentence starters orally.
- *Older or confident:* "Write a museum label for the feast table that is honest about the evidence"; "Rank the four finds from strongest to weakest evidence"; "What questions would you ask the helper to make it show its sources?"

**Connecting to real life.** The Department for Education's guidance on generative AI in education warns about "hallucination" and says "any content produced requires critical judgement to check for appropriateness and accuracy" ([DfE, updated August 2025](https://www.gov.uk/government/publications/generative-artificial-intelligence-in-education/generative-artificial-intelligence-ai-in-education)). Ask: "Teachers are told to check AI's work. What would checking look like for a history question?"

**Closing ritual.** Each child dictates or writes one diary line a Londinium shopkeeper would agree with, using one evidence slot. Read three aloud. Next step: "Find one Roman object in this museum and ask: how do we know what it was for?" For schools: link to the class's Romans topic.

**Facilitator notes**
- *Sensitive topics:* slavery (enslaved people used the baths), the amphitheatre's executions, Boudica's destruction of the town. Name them factually and briefly; do not show or describe violence; follow the museum's interpretation guidance.
- *Diversity:* early Londoners included people from Gaul and the Rhineland ([MOLA](https://www.mola.org.uk/discoveries/news/archaeological-research-britains-oldest-hand-written-documents-released)). Present this as fact, not opinion.
- *Safeguarding:* follow the venue's policy; designated safeguarding lead; Childline 0800 1111 ([Childline](https://www.childline.org.uk/)).
- *Dominant voices:* pass the object; only the person holding it speaks.

## 10. Accessibility and inclusion
- Cards and helper lines read aloud and captioned; Latin words shown with an English gloss.
- Evidence tiles have an icon, a word and a shape, not colour alone.
- Handling objects for children with visual impairments; a seated route through the gallery.
- **No devices:** the facilitator reads the helper script; children match object cards to plan cards on a table "quay"; the diary is a paper template.

## 11. Safety, ethics and data
- **Data:** none. No names; diaries go home on paper.
- **Real AI tools:** the helper is scripted (say so once). Do not demonstrate a live chatbot to under-13s; check each tool's age terms (to verify).
- **Gentle consequences:** the anachronisms are funny, the traveller is never in danger; the amphitheatre is mentioned, never shown in use.
- **Image rights:** any real-object images (RIB tablets, forum model) need a museum licence.

## 12. Build notes
- **Assets:** the trailer's island, temple, quay, crane, stalls, bridge, boat, traveller and banquet table with peacock. New: Mogontius, the I ♥ LONDINIUM mug, forum scaffolding, the three-room baths, wax tablet, amphitheatre gate, phone box gag.
- **Scripted lines:** "Romans ate feasts, so I planned peacock, dormice and oysters." (66%) · "Found in London: oyster shells, wine jars and bread from a bakery oven." (88%) · "The governor's palace! Very sure." (90%, then "possible governor's palace") · "A guide who speaks both? Not sure, but I guess many people here did." (57%).
- **Trailer fix:** the trailer's line says "millstones for bread" and "a traveller ate at street stalls". Neither is in the round-3 fact-check. Verify with the partner museum (to verify) or use the checked bread-oven evidence ([MOLA](https://www.mola.org.uk/discoveries/news/research-bloomberg-uncovers-earliest-evidence-cockroaches-british-isles)) and "market stalls at the forum" ([London Museum](https://www.londonmuseum.org.uk/collections/v/object-452169/model-forum/)).
- **Open questions:** three or four evidence pieces? A MOLA or London Museum specialist should sign off the AD 120 forum and the multilingual guide before client use (research 03).
