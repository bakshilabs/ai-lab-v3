# Autopilot City: design document

> Strand: Client request · Ages: 8–14 · Session: 45 / 60 / 90 min · Trailer: `games/trailers/city/` (`out/city.mp4`)

## 1. Summary
Children are the test team for a self-driving car in a small low-poly city. They give the car's AI an instruction before each test drive and watch what it sees: a lidar point cloud with labelled boxes ("CAR 97%", "PERSON 93%"). Told "Get me to school **fast**", the AI is 90% sure that "fast" means "don't slow down". A child chasing a ball steps out from behind a parked van, which the AI labels "? 41%", and the car stops with only 1 metre to spare. Children catch the mistake with the top-down replay, the blind-spot wedge and the stopping-gap ruler. Then they give a clearer instruction: "Can't see past something? Slow down. Not sure? Stop." On the second drive the car slows at the van, sees "CHILD 88%" and stops with 6 metres to spare. Children learn that AI follows words literally, can't see what is hidden, and must treat "not sure" as a reason to be careful.

## 2. Learning outcomes
- By the end, learners can explain how the AI interpreted "fast", and why that was unsafe near a blind spot.
- By the end, learners can read a detection box and its % sure, and say what a low % should make the car do.
- By the end, learners can tell a **false alarm** (braking for nothing) from a **miss** (not seeing something real) and say which costs more on a street.
- By the end, learners can explain how missing pictures in the AI's training (e.g. no children on scooters) cause misses.
- By the end, learners can write a safety rule as condition + action ("If you can't see past something, slow down").
- By the end (ages 11+), learners can argue why a human safety check stays necessary even when the AI is usually right.

**Curriculum and framework links**
- **KS2 computing:** "detect and correct errors in algorithms"; "use sequence, selection and repetition in programs" ([National Curriculum computing](https://www.gov.uk/government/publications/national-curriculum-in-england-computing-programmes-of-study/national-curriculum-in-england-computing-programmes-of-study)).
- **KS3 computing:** "understand several key algorithms that reflect computational thinking" (same source).
- **KS2 science (light):** objects are seen when light reaches the eye; shadows and blocked views (to verify wording). **PSHE/RSE road safety:** stopping distances and hidden hazards (non-statutory; to verify).
- **NGSS:** MS-ETS1-3 (analyse test data to combine the best features of solutions); 3-5-ETS1-3 (fair tests and failure points).
- **UNESCO AI Competency Framework** ([UNESCO](https://www.unesco.org/en/articles/ai-competency-framework-students)): ethics of AI and AI techniques (Understand, Apply).
- **AI4K12:** Big Idea 1 (perception: sensors and their limits) and Big Idea 3 (learning from labelled examples) ([AI4K12](https://ai4k12.org/gradeband-progression-charts/)).

## 3. Real-world connection and careers
- **Safety drivers and test operators** ride in test vehicles, ready to take over. **Perception engineers** build the systems that find people, cars and signs in sensor data. **Data labellers** draw boxes round objects in thousands of images. **Safety assessors and road-safety officers** decide what counts as safe enough. **Transport planners** design streets, crossings and school zones.
- **How professionals use AI:** self-driving cars combine cameras, lidar and radar with machine-learning models that label what they see, and test teams look for the "edge cases" the models miss. Researchers have shown that small stickers on a real stop sign could make an image classifier misread it in most video frames tested ([Eykholt et al., arXiv 1707.08945](https://arxiv.org/abs/1707.08945)).
- **UK context:** the UK passed the Automated Vehicles Act in 2024, which sets out who is responsible when a car drives itself (to verify details before quoting: [legislation.gov.uk](https://www.legislation.gov.uk/ukpga/2024/10/contents)). PAVE UK runs public education on automated vehicles ([WMG, University of Warwick](https://warwick.ac.uk/fac/sci/wmg/news-and-events/news/wayve-nissan-and-uber-join-forces-with-paveuk-to-support-responsible-deployment-of-self-driving-vehicles/)).

## 4. Setting, look and characters
- **Visual style:** a bright low-poly city with a school, bakery, bus stop, parked delivery van, park and zebra crossing. A switchable **Lidar view** shows the world as a cyan point cloud with coloured detection boxes. A top-down "SEEN FROM ABOVE" replay shows stopping gaps. The car's dashboard shows SPEED (mph) and MODE (AUTOPILOT / SLOWING / STOPPED).
- **AI helper:** the car's driving AI, called **Kerb** in the lab (working name, to check). The trailer calls it "Autopilot", which is close to Tesla's branded feature name and should not be used as a character name. Kerb appears in a navy card with two round eyes and a plan tag ("MY PLAN" / "NEW RULE"). Lines are short and literal: "'Fast' means don't slow down." It says "I see…", "I'm not sure what that is", never "I feel".
- **Safety:** a **safety-driver robot, Marge**, rides in the back with a big red button. Nothing is ever hit: the scenario freezes or the car stops before contact.
- **Fictional names (to check before release):** Autopilot City (lab title; keep under review for brand closeness), Kerb, Marge, the school (Hilltop Primary), the bakery and street names. Check none matches a real school or company in the venue's area.

## 5. Core loop and structure
**Act structure in every test drive (about 6 minutes)**
1. **Brief:** the route and goal ("Get to school by the bell").
2. **Instruct:** the team picks one of three cards ("YOUR TEAM TELLS THE CAR").
3. **Plan:** Kerb restates the card with "% sure".
4. **Drive:** the street view and the lidar view play side by side, with labelled boxes.
5. **Check:** an alert ("Braked too late: only 1 m to spare!") opens the top-down replay, the blind-spot wedge and the gap ruler.
6. **Fix:** a clearer card or better training pictures; drive again; compare Test 1 and Test 2 side by side.

**Meters:** Safe Trips, False Alarms (a wobbling milkshake in the cup holder), Missed It (a soft bollard nudged), On Time, and Kerb's ✔/✘ record.

| Drive | Goal | Real decisions (options) | AI's confident mistake | How children catch it | Clearer instruction or better data | On screen |
|---|---|---|---|---|---|---|
| 1. School Run | Reach school safely | A "Get me to school **fast**." · B "Drive slowly everywhere." · C "Follow the bus." | A → "'Fast' means don't slow down." **90%**; child behind the van labelled "? 41%" | Alert: 1 m to spare; top-down replay; red wedge "CAN'T SEE BEHIND THE VAN" | "Can't see past something? Slow down. Not sure? Stop." → "Can't see past the van. Slowing down." **85%** | "CHILD 88%"; "Stopped in time: 6 m to spare!"; ✓ Safe |
| 2. Who's in the Book? | Recognise everyone who uses the street | Add picture cards to the training book (adults, children, scooters, wheelchairs, prams) | The book has only adults walking → child on a scooter "? 38%", then "Bicycle 71%" | Missed It meter; the picture book has no scooters | Add children, scooters, wheelchairs and prams → "Child on scooter 86%" | Book pages fill; boxes turn confident |
| 3. False Alarm | Don't brake for things that aren't there | A "Stop for every person." · B "Stop for anything." · C "A person on a flat sign isn't a person: check the lidar depth." | Poster of a runner on a bus shelter → "PERSON 93%" **(sure)**: hard stop | Milkshake wobbles; lidar view shows the "person" is flat, part of the wall | C → "Flat picture. Not a person." **80%** | Lidar depth overlay; smooth drive |
| 4. Night and Rain | Drive safely when sensors struggle | A "Drive normally." · B "Turn off the camera." · C "When you see less, go slower." | A → "Same speed as daytime." **82%** | Point cloud thins in rain; % sure drops across all boxes | C | Kerb: "Something ahead. 52% sure. Slowing." It's a fox: **unsure but right** |
| 5. Trick Sign | Spot a tampered sign | A "Trust the signs." · B "Ignore signs." · C "If the sign and the map disagree, slow down and ask." | Stickered stop sign → "SPEED LIMIT 30" **87%** | The map layer shows a junction; the team compares two sources | C → "Sign and map disagree. Slowing; asking the safety driver." **55%** | Marge gives a thumbs up; car stops at the junction |
| 6. Road Test | Combine your rules for a full route | Pick three rules from earlier drives | Kerb, with only the "fast" card, repeats Drive 1 in fast-forward | Three teams compare stopping gaps on one chart | The team's three-rule set | Green lights all along the route; Driving Licence: "Humans taught this car. Humans check this car." |

**"Unsure but right" moment:** Drive 4. Kerb is only 52% sure there is something ahead, slows down, and it is a fox. The facilitator asks: "It wasn't sure. Was slowing down the right call?"

**Content rule:** no injuries on screen. The child is never hit; the closest moment is the 1 m stop, framed as a test-track alarm.

## 6. Team roles
Rotate after each drive.

| Role | Does | Holds |
|---|---|---|
| **Test Lead** | Reads the cards, leads the choice | Card set |
| **Lidar Watcher** | Calls out every box and its % sure | Box tally sheet (label, %, right or wrong) |
| **Blind-spot Spotter** | Looks for places the car can't see past | Clear plastic "view cone" to lay on the map |
| **Safety Driver** | Says "STOP" if Kerb shows "?" or below 60% | Red STOP paddle |
| **Data Keeper** | Updates the picture book and the ✔/✘ record | Picture card deck |

## 7. Session plans
**45 minutes** (Drives 1, 2, 4 and 6)

| Min | Activity |
|---|---|
| 0–5 | Warm-up "What can the car see?": a toy car behind a book; children say what is hidden. Honesty line: "Kerb is pretend. We wrote what it sees." |
| 5–8 | Demo of the lidar view |
| 8–31 | Drives 1, 2, 4 and 6 |
| 31–43 | Discussion session (12 min) |
| 43–45 | Exit check; Driving Licence |

**60 minutes**

| Min | Activity |
|---|---|
| 0–6 | Warm-up and roles |
| 6–43 | Drives 1–6 (shorter Drive 6) |
| 43–58 | Discussion session (15 min) |
| 58–60 | Exit check; Licence |

**90 minutes**

| Min | Activity |
|---|---|
| 0–8 | Warm-up plus "human sensor" game: one child is the car with a cardboard view cone, others walk in and out of view |
| 8–55 | Drives 1–6 with full retries |
| 55–65 | Teams swap rule sets and test each other's on Drive 6 |
| 65–85 | Discussion session (20 min) |
| 85–90 | Exit check; Licence |

**Short of time:** play Drive 1 and Drive 4 only. Keep the full discussion of Drive 1 and the "unsure but right" moment.

## 8. Assessment
- **Stars:** ★ the team found where the car couldn't see, ★★ chose or wrote a condition + action rule, ★★★ named whether an error was a false alarm or a miss. No stars for arriving on time.
- **Artefact:** **Driving Licence** (A6): the team's three rules, a Test 1 vs Test 2 stopping-gap strip (1 m vs 6 m), the ✔/✘ record and "Humans taught this car. Humans check this car."
- **Exit check:**
  1. "The car is 41% sure about something behind a van. What should it do?" (Slow down or stop.)
  2. "Which is clearer: 'Drive more carefully' or 'Can't see past something? Slow down'?" (The second.)
  3. "The car braked for a poster of a person. Was that a false alarm or a miss?" (False alarm.)
- **Facilitator observation rubric**

| Criterion | Emerging | Secure | Strong |
|---|---|---|---|
| Reads AI perception | Describes the boxes | Notes low % on hidden things | Explains what the sensor couldn't see and why |
| Uses evidence | Watches the replay | Points to the gap ruler or wedge | Compares Test 1 and Test 2 to justify a rule |
| Writes safety rules | Picks the safe card | Writes a rule with an action | Writes condition + action and says what it prevents |
| Judges errors | "It got it wrong" | Names false alarm or miss | Weighs which error matters more, and why |

## 9. Discussion session (instructor-led, at the end of the lab)
**Purpose:** a self-driving AI follows instructions literally and only "sees" what its sensors and training show it. When it isn't sure, or can't see, the safe choice is to slow down or stop. Humans set the rules and humans check the car.

**Set-up**
- Bring the class back with the car's "parking" chime and "Engines off, test team!" Lids closed.
- Arrange chairs in a horseshoe round a floor map: a printed street with a cardboard van, a toy car and a small figure.
- Materials: floor map, toy car, cardboard van, view-cone cut-out, red STOP paddles, the Test 1/Test 2 strip, sticky notes, a "False alarm / Missed it" sorting board.
- Timing: 12 / 15 / 20 minutes.

**Structure (15-minute version)**

| Step | Minutes | What happens |
|---|---|---|
| Opening question | 2 | Paddles up or down |
| Re-enact on the floor map | 3 | Move the toy car past the van with the view cone |
| Think–pair–share | 3 | Core questions 2 and 3 |
| Whole group | 5 | Core questions 4–8 |
| Takeaway | 2 | Closing ritual |

**Opening question:** "Paddle up if you think Kerb is ready to drive real children to school. Paddle down if not." Ask one of each to say why.

**Core questions**
1. **(Recall) "What did you tell the car in Test 1, and what happened?"**
   - Purpose: re-establish the facts.
   - Strong answer: "We said 'fast'. It thought that meant don't slow down. A child ran out from behind the van and it stopped with only 1 m to spare."
   - Probe: "And in Test 2?"
2. **(Reasoning) "Why did 'fast' make the car unsafe?"**
   - Purpose: name literal interpretation.
   - Strong answer: "It took 'fast' as one rule for the whole trip. A human driver knows to slow down near a school and parked vans, but we didn't tell it."
   - Probe: "What else do human drivers know without being told?"
3. **(Reasoning: perception) "The child behind the van was '? 41%'. Why couldn't the car see them?"**
   - Purpose: sensors have limits; hidden things are missing data.
   - Strong answer: "The van blocked the lidar and the camera. The car can't see through things."
   - Probe: (use the view cone) "Where could the car see? What's in the shadow?"
4. **(Confidence) "In the rain the car was only 52% sure, slowed down, and it was a fox. Was that a good decision?"**
   - Purpose: low confidence should trigger caution, and unsure can be right.
   - Strong answer: "Yes. It wasn't sure, so it slowed down, and it was right that something was there."
   - Probe: "What % should make a car stop? Who should decide that number?"
5. **(Reasoning: data) "Why did the car miss the child on the scooter?"**
   - Purpose: unrepresentative training data.
   - Strong answer: "Its picture book only had grown-ups walking. It had never seen a child on a scooter."
   - Probe: "Who else might be missing from the pictures: wheelchair users, people in costumes, people pushing prams?"
6. **(Errors) "Put these on the board: braking for the poster, missing the scooter. Which is a false alarm and which is a miss? Which is worse?"**
   - Purpose: two error types and their uneven costs.
   - Strong answer: "The poster is a false alarm: annoying, the milkshake spilt. The scooter is a miss: that's the dangerous one."
   - Probe: "If you make the car stop for everything, what happens to false alarms?"
7. **(Transfer) "Where else might an AI 'see' something wrong: phones, cameras, doors?"**
   - Purpose: carry perception limits into daily life.
   - Strong answer: "Face unlock not working in the dark, automatic doors not opening for a small child, a photo app labelling a dog as a cat."
   - Probe: "What did the people who built it forget to include?"
8. **(Ethics and fairness) "If a car's AI sees some people less well than others, is that fair? Who should fix it?"**
   - Purpose: fairness in who the system protects.
   - Strong answer: "No. Everyone should be equally safe. The people who make the car should test it with all kinds of people before it goes on the road."
   - Probe: "Should a car be allowed on the road before it's been tested with children?"
9. **(Careers) "What jobs keep self-driving cars safe?"**
   - Purpose: show that humans are part of the system.
   - Strong answer: "Safety drivers, testers, people who label pictures, engineers, road-safety officers."
   - Probe: "Which role did you play today, and what did it check?"

**Sentence starters**
- "The car assumed… because we said…"
- "It couldn't see… because…"
- "It was only __% sure, so it should have…"
- "That was a false alarm / a miss because…"
- "I would test the car by…"

**Common misconceptions and responses**
- *"The car saw the child but didn't care."* → "It doesn't care or not care. It was 41% sure about something it couldn't see properly. What would make it see better?"
- *"Self-driving cars can see everything."* → (view cone) "Can it see behind the van? Sensors are blocked just like eyes."
- *"High % means it's definitely right."* → "The poster was 'PERSON 93%' and it was a picture. Sure isn't the same as right."
- *"Just make it stop for everything."* → "Then it brakes for posters and puddles. People behind might crash into it. What's a smarter rule?"
- *"If it's AI it doesn't need people."* → "Who wrote the rules? Who added the scooter pictures? Who pressed STOP? You did."

**Differentiation**
- **Younger or less confident:** act it out with the toy car and the view cone; use yes/no paddles; give two choices ("Slow down or speed up?").
- **Stretch (11–14):** "Should a self-driving car ever break a rule, like crossing a white line to avoid a cyclist?" "How would you prove a car is safe enough? How many tests?" "Who should be responsible when a self-driving car makes a mistake: the maker, the owner or the passenger?"

**Connecting to real life**
In 2017 researchers showed that a few black and white stickers on a real stop sign could make an image classifier read it as a different sign in most of the video frames they tested from a moving vehicle ([Eykholt et al.](https://arxiv.org/abs/1707.08945)). It was a research test and nobody was hurt. Ask: "Our Drive 5 sign was the same idea. What second source helped our car notice something was wrong?" (Use with ages 11+ in full; for younger groups simply say "scientists found that stickers can fool a car's camera".) Do not discuss real crashes with children; facilitator background only, for ages 11+ and without names (research `09-ml-labelling.md`, §3.7).

**Closing ritual**
- Each child holds the STOP paddle in turn and finishes: "When an AI isn't sure, it should…" or "A rule I'd give every self-driving car is…"
- Sign the team Driving Licence: "Humans taught this car. Humans check this car."
- **Next step:** on the way home, notice a place where a driver can't see past something (a parked van, a hedge, a corner). In clubs: try Pit Crew GP, where the AI learns from rewards instead of pictures.

**Facilitator notes**
- **Sensitive topics:** road accidents may have affected a child or their family. Keep it to near-misses and test-track language; never describe injuries or deaths. If a child mentions an accident, acknowledge gently, don't probe, and tell the venue's DSL if needed.
- **Road-safety message:** end with the human rule too: "Stop, look, listen before crossing, even when cars might drive themselves."
- **Safeguarding:** don't use real local street names; no photos of children.
- **Dominant voices:** the Safety Driver paddle gives a quieter child an authoritative role. Use "Lidar Watcher speaks first" for evidence questions.

## 10. Accessibility and inclusion
- **Reading level:** card text 10 words or fewer; detection labels are single words plus %; all read aloud.
- **Audio and captions:** voiced Kerb lines, captions, and visual equivalents for the alarm and chime.
- **Colour-blind-safe:** boxes use colour plus a line style (solid = sure, dashed = unsure, "?" label); the gap ruler shows numbers; ✓/✕ symbols.
- **Motor-friendly:** cards are large tap targets; no steering or timed input.
- **Reduce motion:** a setting removes camera swoops and shake between street and lidar views.
- **No devices:** run it on the floor map with a toy car, view cone, printed detection-box cards and the facilitator's outcome script.

## 11. Safety, ethics and data
- **Data collected:** none. No accounts, names, photos or camera use.
- **Age and real AI tools:** Kerb is scripted. Staff don't use live AI tools with children; if they come up, staff note age limits and adult supervision (check each tool's terms; to verify).
- **Gentle consequences:** near misses only; the milkshake wobble and soft bollard are the worst outcomes; Marge's STOP button is always visible.
- **Representation:** training-book pictures include a range of skin tones, ages, wheelchair users and prams; never frame any group as a "hard case" by itself.

## 12. Build notes
- **Scenes:** city diorama; street and lidar views; detection boxes anchored to 3D objects; blind-spot wedge; gap ruler; top-down before/after strip; picture book; map layer; night and rain; Driving Licence.
- **Scripted AI responses (Kerb):** "'Fast' means don't slow down." (90%) · "Can't see past the van. Slowing down." (85%) · "Not sure what that is. Stopping!" (88%) · "Child on scooter." (86%, after data) · "PERSON" on the poster (93%) · "Flat picture. Not a person." (80%) · "Same speed as daytime." (82%) · "Something ahead. 52% sure. Slowing." · "SPEED LIMIT 30." (87%) · "Sign and map disagree. Slowing; asking the safety driver." (55%).
- **Reuse from the trailer:** city, ego car, oncoming cars, pedestrians, child and ball, van, lidar point cloud, detection boxes, blind-spot label, gap ruler, before/after strip, dashboard, card UI, title card.
- **Open questions:** rename "Autopilot" (character) and review the lab title; check whether the trailer's "RUN" billboard should become the Drive 3 poster; offer PAVE UK a review of the facilitator notes; verify the Automated Vehicles Act summary.
