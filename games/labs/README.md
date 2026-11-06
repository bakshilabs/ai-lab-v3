# DeltaOps Learning AI labs: design documents

There is one design document per lab, and each follows [`TEMPLATE.md`](TEMPLATE.md). Section 9 of every doc is the **instructor-led discussion session** run at the end of the lab. It covers the purpose, set-up, a timed structure, an opening question, core questions (each with a strong answer and a follow-up probe), sentence starters, misconceptions, differentiation, a real-world example, a closing ritual and facilitator notes.

Each lab's trailer is in `../trailers/<id>/` (video in `../trailers/out/<id>.mp4`). A plain-text, shot-by-shot description of each trailer is in `../trailers/shotlists/<id>.md`.

## Client requests
| Lab | Doc | Ages |
|---|---|---|
| Eco Town (six-level world building) | [ecotown.md](ecotown.md) + [../ecotown/DESIGN.md](../ecotown/DESIGN.md) | 8–14 |
| Island Park Tycoon | [tycoon2.md](tycoon2.md) | 8–14 |
| Block Quiz | [mcquiz.md](mcquiz.md) | 8–14 |
| Beat Block | [dash.md](dash.md) | 8–14 |
| Block Quest | [bloxel.md](bloxel.md) | 8–14 |
| Autopilot City | [city.md](city.md) | 8–14 |
| Pit Crew GP | [kart.md](kart.md) | 8–14 |

## Career skills
| Lab | Doc |
|---|---|
| Build a Space Colony | [colony.md](colony.md) |
| Land a Rocket | [rocket.md](rocket.md) |
| Train a Robot | [robot.md](robot.md) |
| Become a Drone Pilot | [drone.md](drone.md) |

## Future Skills (workplace briefs, beyond prompting)
| Lab | Doc | Ages |
|---|---|---|
| Council Data Desk | [fs-data.md](fs-data.md) | 11–16 |
| Model Test Lab | [fs-model.md](fs-model.md) | 11–16 |
| Verification Desk | [fs-verify.md](fs-verify.md) | 11–16 |
| Should It Be AI? | [fs-product.md](fs-product.md) | 11–16 |
| Automation Designer | [fs-automate.md](fs-automate.md) | 14–18 |
| Red Team | [fs-redteam.md](fs-redteam.md) | 14–18 |
| Impact Panel | [fs-impact.md](fs-impact.md) | 14–18 |
| Creative Producer | [fs-creative.md](fs-creative.md) | 11–16 |

## Brochure world-building labs
| Lab | Doc |
|---|---|
| Eco AI Explorer | [eco.md](eco.md) |
| Mission AI | [mission.md](mission.md) |
| AI Time Traveller | [museum.md](museum.md) |
| AI Inventor Lab | [mars.md](mars.md) |

## First concepts
| Lab | Doc | Overlaps with |
|---|---|---|
| Robo-Taxi Island | [robotaxi.md](robotaxi.md) | Autopilot City |
| Pit Crew | [pitcrew.md](pitcrew.md) | Pit Crew GP |
| Block Builders | [blocks.md](blocks.md) | Block Quest |
| Island Park Tycoon (voxel) | [tycoon.md](tycoon.md) | Island Park Tycoon (pixel) |
| Sure or Not Sure? | [quiz.md](quiz.md) | Block Quiz |
| Clear Signal | [signal.md](signal.md) | Beat Block |

## Decisions and checks before production
The doc writers flagged the items below. Each doc's build notes give the detail.

**IP and names**
- **Block Quiz:** the 16×16 textures, the "Nether portal" wording and the team names (Torch Team, Diamond Diggers, Redstone Crew) carry high copying risk. The docs recommend flat colours, plain-word questions and new team names. Keep it as a pitch piece until a lawyer has reviewed it.
- **Block Builders:** a real UK company called BlockBuilders makes Minecraft Education worlds. Rename the lab.
- **Helper and product names close to real brands:**
  - "Co-pilot" (Beat Block): the docs use "Tempo".
  - "Autopilot" (the car in Autopilot City): the docs use "Kerb". The lab title itself also needs review.
  - "Sprocket" (a Skylanders character).
  - "Mission AI" (used by several companies).
  - "Thunder Ridge" (a real motorsport park).
  - "Pip" (also the name of a STEM kit).
- **Invented names:** check every one against real organisations and people before print. Harbour View, Little Holm, Rana Begum, Spokes and Northgate have already been renamed.

**Facts**
- AI Time Traveller: the brochure says "three pieces of evidence" but the trailer shows 4 finds. Pick one. The fix line in the trailer ("millstones for bread") isn't in the checked facts; the doc uses the bakery oven and market stalls instead.
- Eco Town: the trailer's "Carbon down 70%" has no source.
- Creative Producer: the UK rights table needs legal review.
- Impact Panel: the corrected law line (UK GDPR and the ICO video surveillance guidance) still needs checking.
- Any item marked "(to verify)" must be checked before print.

**Docs and trailers that differ**
- Block Quest: the trailer uses a 13×13 board; the docs use 9×9 and 7×7, because the research found 13×13 too slow.
- AI Inventor Lab: the brochure library calls it "Moon Base" while the trailer uses Mars. Pick one.
- Some docs adjust a "% sure" value so that each lab has an "unsure but right" moment.
