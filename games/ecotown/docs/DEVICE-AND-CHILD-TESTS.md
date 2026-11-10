# Eco Town: tests that need real devices and real children

Everything in this file has to be done by people. The automated tests and the scripted "player" cannot answer these questions: all of that testing ran in software graphics on a server, and no child has played the game yet.

## 1. Device test (about 15 minutes per device)

Test at least these three: a low-cost school Chromebook, an iPad that is four or more years old, and a mid-range Android phone.

1. Open the public test site with the frame-rate readout switched on: `https://bakshilabs.github.io/ai-lab-v3/?fps=1`
2. A small black box appears bottom left, for example `41 fps · worst 38 ms · mid · 210 calls · 120k tris · 1366×768`.
3. Fill in one row of the table at each of the four moments.

| Moment | fps | worst ms | quality (low / mid / high) | Felt smooth? |
|---|---|---|---|---|
| Start screen, island turning | | | | |
| Building, empty town | | | | |
| Building, 40 families with farms and turbines | | | | |
| Inside an AI Lab mission, while a lens is on | | | | |

Also write down:
- seconds from opening the link to the start screen (first visit, and again after a reload);
- whether Florence's voice plays, and how long after her first line appears;
- anything that looked broken (take a photo of the screen).

**What good looks like:** 30 fps or more while building, no "worst" above about 100 ms, and the start screen within 10 seconds on school wifi. Below 20 fps while building is a fail for that device: send the numbers back.

## 2. Child sessions (20 to 30 children, in two age groups)

**Set-up.** One child or a pair per device. Use the classroom site with passcodes, or the public test site. The adult says only: "This is a game about building a town. Have a go." Then the adult does not help for 15 minutes, unless a child is stuck for more than a minute. Note every time help was needed.

**Watch for, and tally per child:**

| Question | How to record it |
|---|---|
| How long until the first building is placed? | minutes:seconds |
| Did they skip Florence's intro? | yes / no |
| Did they go into the AI Lab without being told? | yes / no, and at what minute |
| Did they finish a mission? How many stars? | number |
| Where did they stop and look around for help? | the screen, in a few words |
| What did they say out loud? | exact words where possible |
| Did they want to carry on when time was up? | yes / no |

**Three questions at the end** (ask each child alone, write the answer down as said):
1. "What does Florence do in the game?"
2. "Was Florence ever wrong? How did you find out?"
3. "If a computer helper gave you a plan, what would you do before using it?"

A child who has learned the lesson says something like "check it" or "she guesses when I'm not clear" for questions 2 and 3.

**Decisions waiting on these sessions:**
- whether ages 8–12 should have coins to spend (it makes choices matter, but a child who runs out must wait for the evening);
- whether the building films are too long;
- whether the intro (five steps) should be shorter.

## 3. Classroom site under load

Before a large roll-out, one class (about 30 devices on the same wifi) should open the classroom site at the same moment. Note how long the slowest device takes to reach the start screen, and whether any device is sent back to the passcode page.
