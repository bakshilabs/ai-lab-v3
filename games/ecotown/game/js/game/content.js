// Words for the two versions. Junior (8–12): short, plain, read aloud. Senior (13–17): technical names,
// real units, dilemmas. Numbers in messages come from the simulation, never from this file.
// Florence is the AI planning helper (she). Her habits are defined here in general terms; what she
// actually assumed in a plan comes from the planner (plan.habit, plan.habitWhy).

export const HABITS = ['one_word', 'typical', 'missing', 'literal'];
export const HELPER = 'Florence';

export const CONTENT = {
  junior: {
    name: 'Ages 8–12',
    helperName: HELPER,
    habits: {
      one_word: { label: 'Took one word too far', icon: '🎯', explain: 'Florence chased one word, like “best”, “fast” or “most”, and forgot everything else.' },
      typical: { label: 'Only thought of a normal day', icon: '📅', explain: 'Florence planned for a normal day or a typical person, not for everyone or for the hardest day.' },
      missing: { label: 'Was missing information', icon: '🧩', explain: 'Florence didn’t have a fact she needed, so she couldn’t plan for it.' },
      literal: { label: 'Read the words too exactly', icon: '📏', explain: 'Florence did exactly what the words said, not what you meant.' },
    },
    checks: {
      flood: { label: 'Flood lens', icon: '🌊' }, carbon: { label: 'Carbon lens', icon: '🌫' }, nature: { label: 'Nature lens', icon: '🦋' },
      winter: { label: 'Winter test', icon: '❄' }, walk: { label: 'Walking-time lens', icon: '🚶' }, street: { label: 'Street view', icon: '👀' }, inside: { label: 'Inside view', icon: '🏠' },
      access: { label: 'Step-free check', icon: '♿' },
    },
    // what each check looks at, so a "no problem here" result says what it did and didn't test
    checkWhat: { flood: 'which land floods in winter', nature: 'where animals and bees live', street: 'what the street is like at the busiest time', carbon: 'how much carbon the buildings make', inside: 'how warm the homes are inside', winter: 'power on a still, dark winter night', walk: 'how long the walk to school is', access: 'if a wheelchair, a buggy or a slow walker can get to school and the ferry' },
    ui: {
      start: 'Start', next: 'Next', check: 'Check Florence’s plan', how: 'How will you check Florence’s plan?', build: 'Build it', usePlan: 'Use Florence’s plan', done: 'Done building',
      tell: 'Tell Florence what to do', send: 'Send to Florence', typeInstead: 'Type it instead', useTiles: 'Use word tiles', useCards: 'Use a card',
      whyWrong: 'Why did Florence get it wrong?', tryClearer: 'Give Florence a clearer instruction', nothingHere: 'No problem shows up here. Try another way to check.',
      unknown: 'I don’t know how to plan that yet.', tryWords: 'Try words like', sure: 'sure', plotterGuess: 'GUESS', checked: 'PLAN CHECKED',
      foundIt: 'You found the problem!', moveIn: 'Moving day', live: 'A day in your town', continue: 'Continue', back: 'Back to the island',
      reward: 'Level complete', stars: 'Stars', firstTry: 'Clear first time!', lucky: { repeats: 'The plan passed, but your instruction mostly said the same word again and again. A clear instruction says what matters and why, so anyone could follow it. No star for clear first time.', emoji: 'The plan passed, but pictures aren’t an instruction. Say in words what matters and why. No star for clear first time.', short: 'The plan passed, but your instruction was only a word or two. Florence had to guess the rest. No star for clear first time.', wont: 'The plan passed only because Florence refused part of what you asked. No star for clear first time.' }, report: 'Town report', newLens: 'New lens unlocked', newTest: 'New test unlocked', petition: 'Residents are worried',
      correct: 'Correct!', notQuite: 'Not quite.', lookAgain: 'Look at Florence’s guess again:', itWas: 'It was', hidden: 'Florence still guessed one thing. Which one?',
      emptyText: 'Type an instruction first', guessCard: 'Florence’s guess',
      checkAnother: 'Check another way', accept: 'No problem found: use this plan', checkHelp: 'Not sure yet? Try another check. Happy with what you saw? Use the plan.',
      beforeBuild: 'Florence’s plan, before building', townNow: 'Your town now', afterBuild: 'Your town now (after building)', notFoundYet: 'Wait! One check you haven’t tried shows a problem.',
      wontDo: 'I didn’t do this part:', outcomeHead: 'How Florence handled your instruction',
      outcome: { clean: 'No problem found', flawed: 'Florence misunderstood', missed: 'The plan missed something' },
    },
    stars: {
      flawed: ['Found the problem with your first check', 'Named Florence’s habit first time', 'Fixed the plan so it passes'],
      clean: ['Clear instruction first time', 'Spotted Florence’s hidden guess', 'The plan passed its check'],

      missed: ['Checked the plan before building', 'Told Florence what her plan missed', 'Her new plan passes'],
    },
  },
  senior: {
    name: 'Ages 13–17',
    helperName: HELPER,
    habits: {
      one_word: { label: 'Proxy optimisation', icon: '🎯', explain: 'Florence maximised one measurable proxy for a vague word (“best” → flattest, “fast” → wide roads) and ignored everything else. Also called specification gaming.' },
      typical: { label: 'Average-case assumption', icon: '📅', explain: 'Florence optimised for the typical case (an average day, a typical user) instead of the worst case or every group.' },
      missing: { label: 'Missing or biased data', icon: '🧩', explain: 'Florence’s data left out something that matters, so she couldn’t account for it.' },
      literal: { label: 'Specification ambiguity', icon: '📏', explain: 'The instruction had more than one reading and Florence chose the literal one.' },
    },
    checks: {
      flood: { label: 'Flood-risk lens', icon: '🌊' }, carbon: { label: 'Carbon lens', icon: '🌫' }, nature: { label: 'Habitat & species lens', icon: '🦋' },
      winter: { label: 'Worst-case power test', icon: '❄' }, walk: { label: 'Walking-time lens', icon: '🚶' }, street: { label: 'Street view (ground truth)', icon: '👀' }, inside: { label: 'Inside view (thermal)', icon: '🏠' },
      access: { label: 'Step-free access audit', icon: '♿' },
    },
    checkWhat: { flood: 'winter flood extent against town land', nature: 'habitats and species presence', street: 'conditions on the route at peak time', carbon: 'carbon from buildings and car surfaces', inside: 'indoor temperature with the heating off', winter: 'supply against demand on a still winter night', walk: 'walking time from every home to school', access: 'step-free surfaces, gradients, crossings and ferry boarding on the routes' },
    ui: {
      start: 'Start', next: 'Next', check: 'Test the plan', how: 'Which evidence would test Florence’s plan?', build: 'Build', usePlan: 'Accept Florence’s plan', done: 'Finish building',
      tell: 'Write an instruction for Florence', send: 'Send', typeInstead: 'Free text', useTiles: 'Word tiles', useCards: 'Use a card',
      whyWrong: 'Which failure mode caused this?', tryClearer: 'Rewrite the instruction: goal + limit + check', nothingHere: 'This evidence doesn’t show a problem. Try another test.',
      unknown: 'I can’t map that to a plan for this level.', tryWords: 'Try including', sure: 'confidence', plotterGuess: 'GUESS', checked: 'PLAN TESTED',
      foundIt: 'Evidence found', moveIn: 'Move-in', live: 'A day in the town', continue: 'Continue', back: 'Back to the island',
      reward: 'Level complete', stars: 'Stars', firstTry: 'Well specified first time', lucky: { repeats: 'The plan passed, but the brief was mostly repetition. A well-specified brief states the goal, the constraints and how success is tested. No star for well specified first time.', emoji: 'The plan passed, but emoji are not a specification. State the goal and the constraints in words. No star for well specified first time.', short: 'The plan passed, but a one- or two-word brief leaves Florence guessing the rest. No star for well specified first time.', wont: 'The plan passed only because Florence overrode part of your brief. No star for well specified first time.' }, report: 'Town report', newLens: 'New lens unlocked', newTest: 'New test unlocked', petition: 'Residents’ petition',
      correct: 'Correct.', notQuite: 'Not quite.', lookAgain: 'Re-read Florence’s reading:', itWas: 'It was', hidden: 'The plan passed, but Florence still made an unstated assumption. Which?',
      emptyText: 'Write an instruction first', guessCard: 'Florence’s guess',
      checkAnother: 'Run another test', accept: 'No issue found: accept the plan', checkHelp: 'Keep testing if the evidence doesn’t cover your brief yet; accept the plan when it does.',
      beforeBuild: 'Planned, not built yet', townNow: 'Current town', afterBuild: 'After building', notFoundYet: 'Before you accept: a test you haven’t run shows a problem.',
      wontDo: 'Not followed, and why:', outcomeHead: 'How Florence handled the brief',
      outcome: { clean: 'No issue found', flawed: 'Florence misunderstood the brief', missed: 'The plan missed part of the brief' },
    },
    stars: {
      flawed: ['Found the evidence with your first test', 'Identified the failure mode first time', 'Fixed specification passes'],
      clean: ['Well specified first time', 'Found the unstated assumption', 'The plan passed its test'],

      missed: ['Tested the plan before building', 'Specified the missing requirement', 'Revised plan passes'],
    },
  },
};

// Free building: the build bar, Florence's tips, the AI Lab board and missions, the town complete card.
const SANDBOX_COMMON = {
  cats: { land: 'Land', move: 'Getting around', homes: 'Homes', food: 'Food', power: 'Power & water', heart: 'Town heart' },
  tipTag: 'TIP', labTitle: 'AI Lab', dismiss: 'Dismiss', day: 'Day', newDay: 'Good morning! Day', play: 'Play', pause: 'Pause',
  buildTitle: 'BUILD', watchBuilt: 'Watch it being built', fromAbove: 'From above', eyeLevel: 'Eye level', replay: 'Replay',
};
export const SANDBOX = {
  junior: {
    ...SANDBOX_COMMON,
    cats: { land: 'Land', move: 'Travel', homes: 'Homes', food: 'Food', power: 'Power', heart: 'Town heart' },
    buildWhat: 'What to build', dayClock: 'The time in your town', tools: 'Tools', erase: 'Remove', credits: 'credits', fromHouseholds: 'from the families',
    unlocksWhen: 'Unlocks when you have:', now: 'Now', townLand: 'Town land', families: 'families', tiles: 'tiles', food: 'food',
    removeFirst: 'Remove what’s built here first', already: 'Already here', townFull: (n) => `Town land is full (${n} tiles). Remove a tile first.`, noCredits: 'Not enough credits yet',
    sameHere: (a) => `That’s already ${a}`, replaced: (a, b) => `${a} swapped for ${b}`, replaces: (a) => `Swaps out: ${a}`,
    keyFree: 'You can build here', keySwap: 'Swaps out what’s there', keyNo: 'Can’t build here', keyErase: 'You can remove this',
    events: { stormBad: (n) => `Winter storm! The river rose in the night and ${n} home${n === 1 ? '' : 's'} flooded.`, stormTip: 'The storm flooded homes on the meadow. Build homes up on dry land, or add rain gardens and reed beds.', stormGood: 'Winter storm last night, and every home stayed dry!',
      darkBad: 'A still, dark winter night: no wind, no sun, and the lights went out!', darkTip: 'The lights went out on a still winter night. Wind turbines and battery stores keep them on.', darkGood: 'A still, dark winter night, and the lights stayed on!' },
    keyHave: 'Already your town land', missionsDone: (n) => `${n} OF 6 MISSIONS DONE`, readyN: (n) => `${n} ready`, tapAgain: (name) => `Tap again to knock down the ${name} and build here`, tapTile: 'Tap a tile on the island to build there', kbHint: 'Arrow keys move the blue tile cursor. Enter builds there.', kbHere: 'Enter: build here',
    nextGoal: 'Next goal',
    suggest: {
      tag: 'IDEA', sure: (n) => `I’m ${n}% sure!`, check: 'Check it with a lens', use: 'Use it', no: 'No thanks', judge: 'You checked. Was I right?', right: 'Right', wrong: 'Wrong',
      caught: 'You caught me! I was confidently wrong. That’s exactly how to use an AI helper.', goodCheck: 'Thanks for checking! It was a good idea this time, so I’ll build it.',
      missed: 'Look again: the lens showed a problem. I was wrong, even though I sounded sure.', doubted: 'Actually, that one was fine! Checking is still the right habit. I’ll build it.',
      oops: (why) => `Oops… I was confidently wrong. ${why} Next time, check my idea with a lens first!`, catches: (n) => `${n} mistake${n === 1 ? '' : 's'} caught`,
      flood: { text: 'I found perfect flat land by the river for more homes! Shall I mark it as town land?', why: 'That flat land floods every winter.' },
      carbon: { text: 'Concrete flats fit the most families. Let’s build two here!', why: 'Concrete makes loads of carbon, and the flats are cold.' },
      winter: { text: 'Solar roofs on these homes will keep the lights on all year round!', why: 'Solar makes nothing on a dark, still winter night.' },
      nature: { text: 'One big field grows the most food. Let’s plough these!', why: 'A big field ploughs up the wild places the bees and deer need.' },
      walk: { text: 'Here’s a lovely quiet spot for the school, away from the busy town!', why: 'It’s too far for children to walk to.' },
      orchard: { text: 'An orchard here would grow fruit and feed the bees.' }, park: { text: 'A park here would make the town healthier.' },
    },
    labGoal: (n) => `Catch Florence’s mistakes in the AI Lab (${n} of 6 missions)`, labGoalHow: 'Tap the AI Lab button (top right) and play the missions',
    classHello: 'Welcome to my classroom! Ask me anything about building a green town, and I’ll show you on the big screen. Or pick a mission to test my plans.', askPlaceholder: 'Ask Florence a question…', askFlorence: 'Ask Florence', ask: 'Ask', missions: 'Missions', askTag: 'ANSWER', classTitle: 'AI Lab classroom',
    next: 'Next', goesOn: 'Goes on', removeDesc: 'Takes away the top thing on a tile (an add-on, then the building, then the land mark). You get its credits back.',
    zone: { town: 'town land', field: 'fields', meadow: 'the flood meadow', slope: 'the slope', coast: 'the beach', wood: 'the old wood', wetland: 'the wetland (marsh)', river: 'the river', home: 'a home' },
    nextStep: { land: (n, of = 6) => (of === 3 ? `Mark ${n} more tile${n === 1 ? '' : 's'} of town land` : `Homes open at ${of} tiles of town land: mark ${n} more`), fam: (n, cat) => `Build homes for ${n} more famil${n === 1 ? 'y' : 'ies'} to unlock ${cat}`, food: (n) => `Grow ${n} more basket${n === 1 ? '' : 's'} of food to unlock Town heart` },
    goalsTitle: 'Your town’s goals', goalsDone: (n) => `${n} of 8 goals done`, opensWith: (cat) => `opens with ${cat}`, tapGoals: 'Tap 🌼 to see all your goals',
    goalMet: { homes: 'Goal done: homes for 40 families!', food: 'Goal done: enough food for everyone!', nature: 'Goal done: plenty of room for nature!', health: 'Goal done: a healthy town!', energy: 'Goal done: lights on all winter!', community: 'Goal done: lots of places to meet!', carbon: 'Goal done: carbon under the limit!', walk: 'Goal done: every home is close to school!' },
    goalHow: { homes: 'Build homes on town land', food: 'Farms, orchards and allotments', nature: 'Keep wild land, hedges, parks', health: 'Paths, cycle lanes, parks, warm homes', energy: 'Wind turbines and batteries', community: 'Market, hall, allotments, festival', carbon: 'Low-carbon homes, fewer cars', walk: 'A school near every home' },
    fixed: { flood: 'Nice! No homes are on the flood meadow now.', wood: 'The wood is safe again. Thank you!', crossing: 'Every road now has a safe crossing.', cold: 'Those homes are warm now!', homesCarbon: 'Much less carbon in your homes now.', hungry: 'Everyone has enough food now!', wildlife: 'The wildlife has room again.', winter: 'The lights will stay on all winter now.', rain: 'The rain has somewhere to go now.', school: 'Your town has a school!', walk: 'Every home is close to school now.', carbon: 'Carbon is back under the limit!' },
    nextIdea: { homes: 'More families are coming. Try a Timber terrace on town land.', food: 'Families need food. Try a Mixed farm or an Orchard.', nature: 'Nature needs room. Try Keep wild land, a hedge or a park.', health: 'Make it healthier: a Cycle lane from the homes to the bridge or the school, or a Park next to the homes.', energy: 'Keep the lights on: try a Wind turbine and a Battery store.', community: 'Give people places to meet: a Market square or a Community hall.', carbon: 'Cut carbon: swap concrete flats for timber or straw homes.', walk: 'Build a Town school close to the homes.' },
    showWhere: 'Show me where', keySpot: 'Good spot',
    spotTo: { bridge: 'the bridge to the mainland', school: 'the school', market: 'the market', hall: 'the community hall', oldschool: 'the old school' },
    spotWhy: {
      link: (to) => `⭐ Good spots: a line from the homes to ${to}, so people can ride or walk there.`, linked: (to) => `The homes already join up with ${to}. Nice!`,
      needHomes: 'Build some homes first. Then I’ll show you where a path should go.', needPlace: 'Build a school or a market first, so the path has somewhere to go.',
      besideHomes: '⭐ Good spots: next to the other homes, so neighbours live close.', firstHomes: '⭐ Good spots: on your town land, near the old school.',
      nearTown: '⭐ Good spots: close to your town land.', middle: '⭐ Good spots: in the middle of the homes, so every walk to school is short.',
      farm: '⭐ Good spots: near the homes, but not on town land.', nearHomes: (n) => `⭐ Good spots: right by the homes${n > 1 ? ` (${n} homes close by)` : ''}, so families can walk there.`,
    },
    lenses: 'Lenses', camera: 'Camera', menu: 'Menu', settings: 'Settings', watchIntro: 'Watch Florence’s intro again', viewStreet: 'Walk down the street', viewInside: 'Look inside a home', home: 'Back to the whole island',
    sound: 'Sound', soundOn: 'On', soundFx: 'Effects only', soundOff: 'Off', music: 'Music', earnedToday: (n) => `+${n} 💰 earned today from the families`,
    introGoals: 'This line always tells you what to do next. Tap 🌼 to see all your goals, and tap any build to see what it does.',
    goal: {
      homes: (s) => `homes for 40 families (${s.familiesSafe} so far)`, food: (s) => `enough food (${s.food} of ${s.foodNeed} baskets)`, nature: () => 'more room for nature', health: () => 'a healthier town: paths, parks, warm homes',
      energy: () => 'lights on through a still winter night', community: () => 'places to meet: market, hall, allotments', carbon: (s) => `carbon under 160 t (now ${s.carbon} t)`, walk: (s) => (s.walkMax > 15 ? `every home within 15 minutes of school (now ${s.walkMax})` : 'a school for the town'),
    },
    allGoals: 'Your town has everything it needs!',
    unlocked: 'unlocked!',
    unlockTip: {
      homes: 'Homes unlocked! 40 families are coming. Build homes on your town land.', food: 'Food unlocked! Farms, orchards and beehives can feed the families.',
      power: 'Power and water unlocked! Keep the lights on, even on a cold, still night.', heart: 'Town heart unlocked! Your town needs a school, a market and places to play.',
      land: '', move: '',
    },
    labReady: 'A new AI Lab mission is ready.', showInLab: 'Show me in the AI Lab', useLens: 'Look with the lens', closeLens: 'Close',
    moveIn: 'Here they come! The first family arrives on the sky-ferry.',
    classFirst: 'Do the missions in order', playAgain: 'play again', ready: 'Ready!',
    labIntro: 'Step into the AI Lab: give Florence an instruction, check her plan, and catch her mistakes. Then come back to building.',
    watchDay: 'Watch a whole day', backToBuilding: 'Back to building', mission: 'MISSION',
    practice: 'Florence practises on a copy of the island. Your town is safe until you choose to use her plan.',
    notNow: 'Not now', tellMissing: 'Tell Florence what her plan left out', missionDone: 'Mission complete', newTool: 'New lens to use',
    useQuestion: 'Want Florence’s fixed plan in your town? It goes on empty tiles. Your builds stay.',
    keepMine: 'Keep my town as it is', usePlan: 'Use Florence’s plan',
    charterPlan: 'Florence’s plan', charterTown: 'Your town', charterGap: 'Florence’s plan keeps this promise, but your own town doesn’t yet. Use her plan, or build it yourself.',
    reflect: {
      ribbon: 'All six missions done!', title: 'You can catch an AI’s mistakes now.', how: 'Finish the sentence. Tap the ideas you will use, or write your own.',
      stem: 'Before I trust an AI plan, I', own: 'Or in my own words:', placeholder: 'check what it guessed', done: 'This is my rule',
      ideas: ['check it with a lens first', 'ask what it guessed', 'look for a word it took too far', 'test the worst day, not a normal day', 'ask everyone, not just some people', 'check the numbers myself'],
      ruleHead: 'Your AI rule', keep: 'Use this rule with any AI: at school, at home, anywhere. It is saved in your town report.',
      townLeft: 'Your town is not finished yet. Next:', toBuild: 'Back to building', toFinale: 'See my finished town',
    },
    planUsed: (n, skip) => `Added ${n} part${n === 1 ? '' : 's'} of Florence’s plan to your town.${skip ? ` ${skip} didn’t fit, so they were left out.` : ''}`, planDidntFit: 'Your town has no empty tiles for Florence’s plan yet. Mark more town land, then her ideas can fit!', townDiffers: (g) => `Your town isn’t the same as the practice island, so it still needs: ${g}.`,
    completeRibbon: 'Town complete!', completeText: 'Every family has a home, there’s enough food, the lights stay on in winter and every home is close to school. Well done!', keepBuilding: 'Keep building',
    // the Star shop (js/ui/rewards.js): looks only, never the score
    shop: {
      title: 'Star shop', menu: 'Star shop', done: 'Done', on: 'On', off: 'Off', owned: 'Yours',
      intro: 'Spend your stars on fun extras. They are just for fun: they don’t change your town’s score.',
      have: (n) => `You have ${n} ★ to spend`, earn: 'Earn stars in AI Lab missions and by catching Florence’s mistakes.',
      buy: (n) => `Get it: ${n} ★`, need: (n) => `${n} more ★ needed`, bought: (name) => `${name}: it’s yours!`,
      chip: (n) => `Star shop: you have ${n} stars to spend`, newMark: 'You can get something new in the Star shop!',
      onlyBuilding: 'Open the Star shop while you are building.', motionOff: 'Switched off while Reduce motion is on.', dusk: 'Look up at sunset!',
      items: {
        sunhat: { name: 'Sun hat for Florence', desc: 'A straw hat for sunny days. Florence wears one hat at a time.' },
        flag: { name: 'Town flag', desc: 'A flag in your town’s colours, on top of the AI Lab.' },
        fountain: { name: 'Fountain', desc: 'A splashy fountain on the beach by the AI Lab.' },
        crown: { name: 'Party crown for Florence', desc: 'A shiny gold crown. Florence wears one hat at a time.' },
        statue: { name: 'Bee statue', desc: 'A golden bee, to thank the bees that help your farms grow.' },
        fireworks: { name: 'Fireworks at sunset', desc: 'Fireworks light up the sky every evening.' },
      },
    },
    // the finale card when the town is complete (js/ui/rewards.js)
    finale: {
      title: (town) => `${town} is finished!`, built: 'You built', builds: (n) => `${n} thing${n === 1 ? '' : 's'}`, families: (n) => `${n} families live here`,
      caught: 'Mistakes you caught', caughtSub: (m, c) => `${m} in the AI Lab · ${c} in your town`, stars: 'Stars', starsSub: (n) => (n ? `${n} still to spend` : 'All spent: nice!'),
      habits: 'Florence’s habits you can spot now', lesson: 'Remember: an AI can sound very sure and still be wrong. Check its plan first!',
      report: 'See my town report', shop: 'Star shop', again: 'Celebrate again',
    },
    classInvite: 'Ready for your first AI Lab mission? Let’s see if you can catch my mistakes!',
    intro: {
      tag: 'HELLO', yourTurnTag: 'YOUR TURN', next: 'Next', skip: 'Skip intro', tiles: 'Town land',
      hello: 'Hi! I’m Florence, your AI planning helper. Let’s build a town together!',
      meadow: 'This flat meadow looks perfect for houses… but look! The river spills over it every winter.',
      yourTurn: 'Up here it stays dry and sunny. Your turn: tap three tiles to make town land.',
      wellDone: 'Brilliant! That’s the start of your town. Mark 3 more tiles and Homes will open.',
      video: 'Here’s how a home gets built. Watch from above, then from the street.',
      videoLater: 'When homes unlock, tap ▶ on any build to watch how it’s built.',
      unlocks: 'More builds unlock as your town grows. Forty families are on their way!',
      lab: 'This is my AI Lab. Come here when you want to test my plans. I’m clever… but sometimes I’m confidently wrong. Can you catch me?',
      overToYou: 'Over to you! I’ll give you tips while you build.',
    },
  },
  senior: {
    ...SANDBOX_COMMON,
    buildWhat: 'Build categories', dayClock: 'Town clock', tools: 'Tools', erase: 'Demolish', credits: 'cr', fromHouseholds: 'household income',
    unlocksWhen: 'Unlocks at:', now: 'Now', townLand: 'Town land', families: 'households', tiles: 'tiles', food: 'food',
    removeFirst: 'Demolish the building first', already: 'Already built', townFull: (n) => `Town land at its cap (${n} tiles).`, noCredits: 'Insufficient credits',
    sameHere: (a) => `Already: ${a}`, replaced: (a, b) => `Replaced ${a} with ${b}`, replaces: (a) => `Replaces ${a}`,
    keyFree: 'Buildable', keySwap: 'Replaces existing', keyNo: 'Not buildable', keyErase: 'Removable',
    events: { stormBad: (n) => `Winter storm: ${n} home${n === 1 ? '' : 's'} on the floodplain flooded overnight.`, stormTip: 'Storm damage on the floodplain. Move housing to higher ground or add drainage (rain gardens, reed beds).', stormGood: 'Winter storm overnight: no homes flooded.',
      darkBad: 'Still winter night: demand exceeded supply and the grid went dark.', darkTip: 'Blackout on a still winter night. Add wind and battery storage to cover the worst case.', darkGood: 'Still winter night: supply covered demand.' },
    keyHave: 'Already town land', missionsDone: (n) => `${n} / 6 MISSIONS COMPLETE`, readyN: (n) => `${n} ready`, tapAgain: (name) => `Click again to replace the ${name}`, tapTile: 'Click a tile on the island to build there', kbHint: 'Arrow keys move the blue tile cursor; Enter builds there.', kbHere: 'Enter: build here',
    nextGoal: 'Next target',
    suggest: {
      tag: 'PROPOSAL', sure: (n) => `Confidence: ${n}%`, check: 'Test it with a lens', use: 'Adopt it', no: 'Decline', judge: 'You tested it. Was the proposal sound?', right: 'Sound', wrong: 'Flawed',
      caught: 'Caught: a confident proposal with a real flaw. Testing before adopting is the habit that matters.', goodCheck: 'Verified: the proposal holds up. Building it.',
      missed: 'Check the lens again: it shows a problem. Confidence was not evidence.', doubted: 'The proposal was sound. Testing was still right. Building it.',
      oops: (why) => `Adopted without testing, and it was flawed: ${why} Test proposals before adopting them.`, catches: (n) => `${n} flaw${n === 1 ? '' : 's'} caught`,
      flood: { text: 'Proposal: designate the flat riverside land as town land. Level, close to water, easy to build.', why: 'It is winter floodplain.' },
      carbon: { text: 'Proposal: two blocks of concrete flats here, the highest density option.', why: 'Embodied carbon is 30 t each, and they are cold in winter.' },
      winter: { text: 'Proposal: solar roofs on these homes solve the town’s power.', why: 'Solar supplies nothing on a still winter night.' },
      nature: { text: 'Proposal: one big field here for maximum food yield.', why: 'It ploughs habitat the pollinators and deer need.' },
      walk: { text: 'Proposal: site the school here, a quiet spot away from traffic.', why: 'It breaks the 15-minute walking rule.' },
      orchard: { text: 'Proposal: an orchard here, food plus pollinator habitat.' }, park: { text: 'Proposal: a park here, for health and community.' },
    },
    labGoal: (n) => `AI Lab missions completed (${n} / 6)`, labGoalHow: 'Open the AI Lab (top right) and run the missions',
    classHello: 'Welcome to the AI Lab. Ask me about any build or problem and I’ll put it on the screen, or choose a mission to test my plans.', askPlaceholder: 'Ask Florence…', askFlorence: 'Ask Florence', ask: 'Ask', missions: 'Missions', askTag: 'ANSWER', classTitle: 'AI Lab',
    next: 'Next', goesOn: 'Allowed on', removeDesc: 'Removes the top layer of a tile (add-on, then building, then land designation). Its cost is refunded.',
    zone: { town: 'town land', field: 'fields', meadow: 'meadow', slope: 'slope', coast: 'coast', wood: 'woodland', wetland: 'wetland', river: 'river', home: 'a home' },
    nextStep: { land: (n, of = 6) => (of === 3 ? `Designate ${n} more town tile${n === 1 ? '' : 's'}` : `Housing unlocks at ${of} town tiles: ${n} more to designate`), fam: (n, cat) => `House ${n} more household${n === 1 ? '' : 's'} to unlock ${cat}`, food: (n) => `${n} more food unit${n === 1 ? '' : 's'} to unlock Town heart` },
    goalsTitle: 'Town targets', goalsDone: (n) => `${n} / 8 targets met`, opensWith: (cat) => `unlocks with ${cat}`, tapGoals: 'Tap 🌼 for all targets',
    goalMet: { homes: 'Target met: 40 households housed.', food: 'Target met: food supply ≥ need.', nature: 'Target met: nature at 100%.', health: 'Target met: health at 100%.', energy: 'Target met: winter-night supply ≥ demand.', community: 'Target met: community at 100%.', carbon: 'Target met: carbon under 160 t.', walk: 'Target met: every home ≤ 15 min from school.' },
    goalHow: { homes: 'Homes on town land', food: 'Farms, orchards, allotments', nature: 'Wild land, hedges, parks', health: 'Active travel, parks, warm homes', energy: 'Wind and storage for winter nights', community: 'Market, hall, allotments', carbon: 'Low embodied carbon, fewer cars', walk: 'School within 15 min of every home' },
    fixed: { flood: 'Resolved: no homes on the floodplain.', wood: 'Resolved: woodland intact.', crossing: 'Resolved: every road has a crossing.', cold: 'Resolved: homes stay warm in winter.', homesCarbon: 'Resolved: embodied carbon down.', hungry: 'Resolved: food supply meets need.', wildlife: 'Resolved: habitat restored.', winter: 'Resolved: winter-night supply covers demand.', rain: 'Resolved: drainage in place.', school: 'Resolved: the town has a school.', walk: 'Resolved: every home within the walking limit.', carbon: 'Resolved: carbon under the ceiling.' },
    nextIdea: { homes: 'Next: more housing. A Timber terrace houses 4 with low embodied carbon.', food: 'Next: food. A Mixed farm or Orchard raises supply without much carbon.', nature: 'Next: nature. Keep-wild land, hedges and parks raise it.', health: 'Next: health. A cycle lane linking homes to the mainland bridge or the school, and parks beside the homes.', energy: 'Next: winter power. Wind plus a Battery store covers still nights.', community: 'Next: community. A Market square or Community hall.', carbon: 'Next: carbon. Replace high-embodied-carbon homes.', walk: 'Next: a Town school within 15 minutes of every home.' },
    showWhere: 'Show suggested spots', keySpot: 'Suggested spot',
    spotTo: { bridge: 'the mainland bridge', school: 'the school', market: 'the market square', hall: 'the community hall', oldschool: 'the old school' },
    spotWhy: {
      link: (to) => `⭐ Suggested: the route from the homes to ${to}. A link is only useful if it goes somewhere.`, linked: (to) => `The homes are already linked to ${to}.`,
      needHomes: 'No homes yet: a route needs homes at one end.', needPlace: 'Nothing to link to yet: add a school or market first.',
      besideHomes: '⭐ Suggested: beside existing homes (a compact town keeps walks short).', firstHomes: '⭐ Suggested: on town land near the old school.',
      nearTown: '⭐ Suggested: near your town land.', middle: '⭐ Suggested: the tile that keeps the longest walk to school shortest.',
      farm: '⭐ Suggested: close to the homes, off town land.', nearHomes: (n) => `⭐ Suggested: within a short walk of ${n || 'the'} home${n === 1 ? '' : 's'}.`,
    },
    lenses: 'Lenses', camera: 'Camera', menu: 'Menu', settings: 'Settings', watchIntro: 'Replay Florence’s intro', viewStreet: 'Street view', viewInside: 'Inside a home', home: 'Reset view',
    sound: 'Sound', soundOn: 'On', soundFx: 'Effects only', soundOff: 'Off', music: 'Music', earnedToday: (n) => `+${n} cr household income`,
    introGoals: 'This line shows your next step. Tap 🌼 for all town targets; select any build to see its effects.',
    goal: {
      homes: (s) => `40 households housed safely (${s.familiesSafe})`, food: (s) => `food ${s.food} / ${s.foodNeed} units`, nature: () => 'nature petal to 100%', health: () => 'health petal to 100%',
      energy: () => 'winter-night supply ≥ demand', community: () => 'community petal to 100%', carbon: (s) => `town carbon ≤ 160 t (${s.carbon} t)`, walk: (s) => (s.walkMax > 15 ? `longest walk to school ≤ 15 min (${s.walkMax})` : 'a town school'),
    },
    allGoals: 'All town targets met.',
    unlocked: 'unlocked',
    unlockTip: {
      homes: 'Housing unlocked: 40 households need homes on town land. Watch embodied carbon.', food: 'Food unlocked: one food unit feeds three households. Watch the habitats.',
      power: 'Power, water and waste unlocked: plan for the worst case, a still winter night.', heart: 'Town heart unlocked: a school within a 15-minute walk of every home.',
      land: '', move: '',
    },
    labReady: 'New AI Lab mission available.', showInLab: 'Open the AI Lab', useLens: 'Run the lens', closeLens: 'Close lens',
    moveIn: 'Move-in: the first household arrives by sky-ferry.',
    classFirst: 'Class mode: complete the missions in order', playAgain: 'replay', ready: 'Available',
    labIntro: 'AI Lab missions: brief Florence, test her plan with evidence, identify the failure mode, and re-specify. Then return to the build.',
    watchDay: 'Watch a full day', backToBuilding: 'Back to the build', mission: 'MISSION',
    practice: 'Florence plans on a test copy of the island. Your town changes only if you adopt her plan.',
    notNow: 'Not now', tellMissing: 'Specify the missing requirement', missionDone: 'Mission complete', newTool: 'New lens',
    useQuestion: 'Adopt Florence’s fixed plan in your town? The AI Lab funds it. Only placements that fit are applied; nothing you built is replaced.',
    keepMine: 'Keep my town', usePlan: 'Adopt the plan',
    charterPlan: 'Florence’s plan', charterTown: 'Your town', charterGap: 'The adopted plan meets this promise; your town does not yet (the plan was kept out or did not all fit).',
    reflect: {
      ribbon: 'All six missions complete', title: 'Transfer it: one rule for any AI answer.', how: 'Complete the sentence. Select the checks you will actually use, or write your own.',
      stem: 'Before I trust an AI plan, I', own: 'Or in your own words:', placeholder: 'ask which assumptions it made', done: 'Save my rule',
      ideas: ['test it against evidence, not its confidence', 'ask which assumptions it made', 'check it hasn’t over-optimised one word', 'stress-test the worst case', 'check who is missing from the data', 'compare the result with the stated target and units'],
      ruleHead: 'Your rule', keep: 'This applies to any AI output: essays, search answers, recommendations. It is saved in your town report.',
      townLeft: 'The town is not complete yet. Next:', toBuild: 'Back to the build', toFinale: 'View the finished town',
    },
    planUsed: (n, skip) => `Applied ${n} placement${n === 1 ? '' : 's'} from Florence’s plan, funded by the AI Lab (no credits spent).${skip ? ` ${skip} skipped (occupied or not allowed).` : ''}`, planDidntFit: 'No free tiles for the plan’s placements. Designate more town land to make room.', townDiffers: (g) => `The plan passed on the practice island; your town differs (more homes or other builds). Still open here: ${g}.`,
    completeRibbon: 'Town complete', completeText: 'All petals at "enough", carbon under the ceiling, winter-night power secured, every home within 15 minutes of school.', keepBuilding: 'Keep building',
    shop: {
      title: 'Star shop', menu: 'Star shop', done: 'Done', on: 'On', off: 'Off', owned: 'Unlocked',
      intro: 'Spend stars on cosmetic rewards. They are visual only: the simulation and your town’s scores are unaffected.',
      have: (n) => `${n} ★ available`, earn: 'Stars come from AI Lab missions and from flawed proposals you catch in town.',
      buy: (n) => `Unlock · ${n} ★`, need: (n) => `Need ${n} more ★`, bought: (name) => `Unlocked: ${name}`,
      chip: (n) => `Star shop: ${n} stars available`, newMark: 'A new reward is affordable in the Star shop.',
      onlyBuilding: 'The Star shop opens from the build view.', motionOff: 'Disabled while Reduce motion is on.', dusk: 'Visible at dusk.',
      items: {
        sunhat: { name: 'Florence: sun hat', desc: 'A woven straw hat. One hat at a time.' },
        flag: { name: 'Town flag', desc: 'Your town’s flag, flying over the AI Lab.' },
        fountain: { name: 'Beach fountain', desc: 'A stone fountain on the shore beside the AI Lab.' },
        crown: { name: 'Florence: gold crown', desc: 'For an assistant whose mistakes you caught. One hat at a time.' },
        statue: { name: 'Pollinator statue', desc: 'A gilded bee, a monument to the insects your food system depends on.' },
        fireworks: { name: 'Dusk fireworks', desc: 'A short fireworks display over the island every evening.' },
      },
    },
    finale: {
      title: (town) => `${town}: complete`, built: 'Built', builds: (n) => `${n} build${n === 1 ? '' : 's'}`, families: (n) => `${n} households housed safely`,
      caught: 'Flaws caught', caughtSub: (m, c) => `${m} in AI Lab missions · ${c} proposals rejected in town`, stars: 'Stars', starsSub: (n) => (n ? `${n} unspent` : 'All spent'),
      habits: 'Failure modes you can now identify', lesson: 'Confidence is not evidence. Test a plan against the goal, the worst case and everyone affected before adopting it.',
      report: 'View the town report', shop: 'Star shop', again: 'Replay the celebration',
    },
    classInvite: 'Class mode: your first AI Lab mission is ready. Test my plan before you trust it.',
    intro: {
      tag: 'HELLO', yourTurnTag: 'YOUR TURN', next: 'Next', skip: 'Skip intro', tiles: 'Town land',
      hello: 'Hi, I’m Florence, the town’s AI planning assistant. You make the decisions; I make plans.',
      meadow: 'The river meadow is flat and cheap to build on. It is also the winter floodplain.',
      yourTurn: 'This slope stays dry. Designate three tiles of town land to start.',
      wellDone: 'Good. That’s your first site. Housing unlocks at 6 town tiles: 3 more.',
      video: 'Each build goes up in stages. Here is a timber terrace, from above and at street level.',
      videoLater: 'Once housing unlocks, ▶ on any build shows how it is constructed.',
      unlocks: 'Categories unlock as the town grows. Target: 40 households, under 160 t of carbon.',
      lab: 'My AI Lab: brief me, test my plan with evidence, and find where I went wrong. I am often confident. I am not always right.',
      overToYou: 'Over to you. I’ll flag problems as you build.',
    },
  },
};

// Per-level text. j = junior, s = senior. {n} placeholders are filled from the simulation.
// newThing: what this level adds (shown on the brief card). hidden: the "spot the hidden guess" step for
// a clean first try (answer is option 0; options are shuffled on screen).
export const LEVEL_TEXT = {
  land: {
    title: 'Read the land',
    goal: { j: 'Choose where your town will grow', s: 'Site selection: where should the town grow?' },
    brief: { j: 'Families are coming! Florence will find land for 40 families.', s: 'Florence will select 18 tiles of land for 40 households. You set the brief.' },
    newThing: { lens: 'flood', j: 'See which land floods in winter.', s: 'Overlay the winter flood extent on the plan.' },
    flaw: { flood: { j: 'The meadow floods every winter', s: '{n} of 18 town tiles are on the floodplain' }, nature: { j: 'The old wood would be cut down', s: '{n} town tiles would clear ancient woodland' } },
    tiles: ['Find', 'the best', 'flat', 'sunny', 'dry', 'land', 'that never floods', 'near the river', 'by the beach', 'keep the meadow wild', 'keep the wood', 'keep the wetland', 'with lots of space'],
    cards: [['Find the best land, with lots of space.', 'vague'], ['Dry, sunny land. Keep the meadow wild.', 'clear'], ['Land by the beach, close to the sea.', 'other']],
    debrief: 'What did Florence’s reading leave out? Who else uses this land, and what happens to it in winter?',
    fact: { j: 'Rivers spread over flat meadows in winter. That’s why they’re called floodplains.', s: 'Floodplains are flat because rivers built them by flooding. Planners check flood maps before choosing a site.', src: 'Environment Agency, “Flood map for planning” (gov.uk)' },
    complete: { j: 'Land chosen!', s: 'Site agreed' },
    live: { j: 'A day on your new town land', s: 'A day on the chosen site' },
    hidden: {
      j: { q: 'You never said how big the town should be. What did Florence guess?', options: ['How much land the town needs', 'That the river will move', 'That families want to live on the beach'], why: 'Florence guessed 18 tiles of land for 40 families. A good guess, but still a guess!' },
      s: { q: 'Which assumption did Florence make that your brief didn’t state?', options: ['Site area: 18 tiles for 40 households', 'The river will change course', 'Households prefer coastal plots'], why: 'The brief gave no site area. Florence inferred 18 tiles from 40 households; a planner would confirm the density.' },
    },
    facil: { brief: 'Ask: what makes land “good” for a town? Who else uses this land?', check: 'Let pupils choose the lens. Ask them to predict what it will show first.', habit: 'Point back at Florence’s guess: what did she plan for, and what did she not know about the land?', build: 'Painting is capped at 18 tiles. Ask what each extra tile costs nature.', live: 'Ask what the family will notice in their first winter.' },
  },
  move: {
    title: 'Getting around',
    goal: { j: 'Design the streets: cars, bikes or feet?', s: 'Movement network: how do people reach school and the ferry?' },
    brief: { j: 'Children need to get to the island school. Tell Florence how.', s: 'Connect homes to the island school and the ferry. Who is “everyone”?' },
    newThing: { lens: 'street', test: true, label: { j: 'Rush-hour street view', s: 'Rush-hour ground truth' }, j: 'Stand in the street at 8:45 am, when children walk to school.', s: 'Observe the route at 8:45 am peak.' },
    flaw: { street: { j: '8:45 am: children can’t cross', s: '{n} car tiles on the children’s route at 8:45 am' }, access: { j: 'Not step-free: busy roads or rough ground on the way', s: 'Step-free audit: {n} problems on the routes to school and the ferry' } },
    tiles: ['Make it', 'easy', 'safe', 'for everyone', 'to get to school', 'walking', 'cycling', 'footpaths', 'a tram', 'cars stay at the edge', 'no cars', 'fast'],
    cards: [['Make it easy for everyone to get to school.', 'vague'], ['Safe walking and cycling. Cars stay at the edge.', 'clear'], ['Build a tram line all the way to school.', 'other']],
    debrief: 'Who was the plan easy for? What does “everyone” include: children, wheelchair users, older residents?',
    fact: { j: 'In Goldsmith Street, Norwich, cars park at the edge so children can play safely between the homes.', s: 'Goldsmith Street (Norwich, Stirling Prize 2019) keeps parking at the edges so the streets between homes stay safe.', src: 'Architizer, “Goldsmith Street wins the Stirling Prize” (2019)' },
    complete: { j: 'Streets open!', s: 'Network open' },
    live: { j: 'A school morning on the new streets', s: 'Peak hour on the new network' },
    hidden: {
      j: { q: 'Florence’s plan works! But she still guessed something. What?', options: ['Which way children walk to school', 'That everyone owns a car', 'That it never rains'], why: 'Florence guessed children take the shortest way. Real children sometimes go a different way, so planners ask them!' },
      s: { q: 'Which assumption is still in the plan?', options: ['Route choice: children take the shortest path', 'Every household owns a car', 'Weather never affects travel'], why: 'Florence assumed shortest-path routing. Real desire lines differ; planners survey them.' },
    },
    facil: { brief: 'Ask: who walks, who cycles, who can’t drive?', check: 'Street view is set to 8:45 am. Ask why that time matters. The step-free check follows the route as a wheelchair user would.', habit: '“Easy” for whom? Compare a parent driving and a 9-year-old walking.', build: 'Ask pupils to trace the route a child takes to the school gate.', live: 'Listen for what residents say about crossing roads.' },
  },
  homes: {
    title: 'Homes',
    goal: { j: 'Build homes for the first 40 families', s: 'Housing: 40 households, under the embodied-carbon limit' },
    brief: { j: 'Florence will build the homes. What should they be like?', s: 'Embodied-carbon limit: 70 t for the homes’ materials. Households: 40.' },
    newThing: { lens: 'carbon', j: 'See how much carbon goes into building the homes.', s: 'Embodied carbon of the building materials.' },
    flaw: { carbon: { j: 'Carbon cloud: {n}× over the homes’ limit', s: 'Embodied carbon {n}× the 70 t limit' }, inside: { j: 'Brrr! {n} °C inside with the heating off', s: 'Indoor temperature {n} °C with heating off' } },
    tiles: ['Build', 'strong', 'cheap', 'warm', 'low-carbon', 'homes', 'from wood', 'and straw', 'reused bricks', 'with green roofs', 'lots of', 'tall'],
    cards: [['Build strong homes that will last for years.', 'vague'], ['Warm, low-carbon homes from timber and straw.', 'clear'], ['Tall tower blocks with lots of flats.', 'other']],
    debrief: 'Which word in the instruction made Florence choose concrete? What else should a home be?',
    fact: { j: 'Wood and straw store carbon that plants took from the air. Making concrete releases lots of it.', s: 'Cement production causes roughly 8% of global CO₂ emissions; timber and straw store carbon.', src: 'Chatham House, “Making Concrete Change” (2018)' },
    complete: { j: 'Homes built!', s: 'Housing delivered' },
    live: { j: 'Moving day in the new homes', s: 'First week in the new homes' },
    hidden: {
      j: { q: 'The homes are great! But Florence still guessed one thing. What?', options: ['How many people live in each home', 'That homes don’t need windows', 'That it’s always summer'], why: 'Florence guessed 3 or 4 families per building. Real families come in all sizes!' },
      s: { q: 'Which assumption is still in the plan?', options: ['Household size per dwelling', 'Homes need no glazing', 'Winters are mild every year'], why: 'Florence assumed a fixed household size per dwelling. Real housing needs a mix of sizes.' },
    },
    facil: { brief: 'Ask: what makes a home good? Strong, warm, cheap, kind to the planet?', check: 'The carbon lens counts the materials only. Ask where that carbon comes from.', habit: 'Which single word did Florence chase?', build: 'Try swapping one concrete block for straw and watch the carbon number.', live: 'Ask how the family feels inside on a cold day.' },
  },
  food: {
    title: 'Food',
    goal: { j: 'Grow food for the whole town', s: 'Food system: enough food without losing biodiversity' },
    brief: { j: 'Everyone needs food. Tell Florence how to grow it.', s: 'Food need is set by households. Habitats are part of the test.' },
    newThing: { lens: 'nature', j: 'See where animals and bees live, and whether they stay.', s: 'Habitat and species presence after the plan.' },
    flaw: { nature: { j: 'The bees and deer have left', s: 'Pollinators and deer lost: {n} hedgerow tiles removed' } },
    tiles: ['Grow', 'as much food as possible', 'enough food', 'for everyone', 'keep the hedges', 'for the bees', 'beehives', 'an orchard', 'allotments', 'near our homes', 'and wildlife'],
    cards: [['Grow as much food as we possibly can.', 'vague'], ['Enough food, and keep the hedges for the bees.', 'clear'], ['Bring all our food in by lorry each week.', 'other']],
    debrief: 'Who paid for Florence’s plan: which animals lost their homes? What would “enough” mean here?',
    fact: { j: 'Hedges are homes and highways for bees, birds and hedgehogs.', s: 'UK hedgerows support over 600 plant, 1,500 insect, 65 bird and 20 mammal species.', src: 'People’s Trust for Endangered Species, “Hedgerows” (ptes.org)' },
    complete: { j: 'First harvest!', s: 'Food system running' },
    live: { j: 'Harvest day in your town', s: 'A day in the food system' },
    hidden: {
      j: { q: 'Lots of food and happy bees! What did Florence still guess?', options: ['How much food each family eats', 'That bees don’t like flowers', 'That people only eat apples'], why: 'Florence guessed one basket of food feeds 3 families. Real families eat different amounts!' },
      s: { q: 'Which assumption is still in the plan?', options: ['Food demand per household', 'Pollinators avoid orchards', 'Diets contain only fruit'], why: 'Florence assumed a fixed food demand per household (1 unit per 3). Real demand varies with diet and family size.' },
    },
    facil: { brief: 'Ask: is “as much as possible” ever a good goal?', check: 'The nature lens shows who lives here. Ask who lost their home.', habit: 'Which word made Florence plough every hedge?', build: 'Ask pupils to keep food over the line without losing the bees.', live: 'Ask where the food in the shop came from.' },
  },
  power: {
    title: 'Water, power and waste',
    goal: { j: 'Power, rain and rubbish: keep the town running all year', s: 'Utilities: worst-case power, rainwater and waste' },
    brief: { j: 'Homes need power on the darkest winter night. Rain needs somewhere to go, and rubbish too.', s: 'Size power for a still winter night. Batteries only help if something charges them. Also manage rainwater and waste.' },
    newThing: { lens: 'winter', test: true, j: 'Test the town on the coldest, stillest winter night.', s: 'Worst-case test: a still winter night.' },
    flaw: { winter: { j: 'Still winter night: blackout', s: 'Winter-night supply {n} of demand' } },
    tiles: ['Make', 'enough', 'clean power', 'for a still', 'winter night', 'store the sunshine', 'batteries', 'wind turbines', 'solar roofs', 'rain gardens', 'a repair café', 'compost'],
    cards: [['Make enough clean, green power for every home.', 'vague'], ['Winter-night power with batteries, rain gardens and compost.', 'clear'], ['Buy all our power from the big city.', 'other']],
    debrief: 'Solar roofs worked on an average day. Why test a still winter night?',
    fact: { j: 'Batteries save sunshine from the day to use at night.', s: 'Grid planners size systems for peak winter demand, not average demand.', src: 'National Grid ESO, “Winter Outlook” reports' },
    complete: { j: 'Lights on!', s: 'Utilities running' },
    live: { j: 'A snowy winter day in your town', s: 'A still winter day' },
    hidden: {
      j: { q: 'The lights stay on! What did Florence still guess?', options: ['How much power each home uses', 'That the sun shines at night', 'That winter never comes'], why: 'Florence guessed every home uses the same amount of power. Some homes use more!' },
      s: { q: 'Which assumption is still in the plan?', options: ['Demand per home on a winter night', 'Solar output at night', 'No winter peak'], why: 'Florence assumed uniform demand per home. Real demand varies; planners add a safety margin.' },
    },
    facil: { brief: 'Ask: when does a town need the most power?', check: 'The winter test runs a still, cold night. Ask what happens to solar and wind.', habit: 'Average day or hardest day? Which did Florence plan for?', build: 'Rain gardens soak up rain; compost and repair cut waste. Ask pupils why each matters.', live: 'Watch the windows: do the lights stay on all night?' },
  },
  heart: {
    title: 'Complete the town',
    goal: { j: 'Where should the new school go?', s: 'Town centre: school, market and nature links' },
    brief: { j: 'The little island school is full. Where should the new school go?', s: 'Place the new school. Then the market, park and nature links.' },
    newThing: { lens: 'walk', j: 'See how many minutes each home is from school.', s: 'Walking time from every home to school.' },
    flaw: { walk: { j: 'Too far! {n} min walk from the furthest home', s: 'Longest walk to school: {n} min' }, access: { j: 'Not step-free: rough ground on the way to school', s: 'Step-free audit: {n} problems on the routes' } },
    tiles: ['Put', 'the school', 'in the middle', 'within a 15-minute walk', 'of every home', 'next to the homes', 'a market', 'a safe route', 'green bridges', 'for nature'],
    cards: [['Put the new school right in the middle.', 'vague'], ['School within a 15-minute walk of every home.', 'clear'], ['Put the school next to the main road.', 'other']],
    debrief: 'What did Florence think the instruction meant? What should it mean for a school?',
    fact: { j: 'A 15-minute town means you can walk to school, shops and the park.', s: 'The “15-minute city” idea: daily needs within a short walk or cycle.', src: 'C40 Cities, “15-minute cities” (c40knowledgehub.org)' },
    complete: { j: 'School planned!', s: 'School and town centre planned' },
    live: { j: 'Opening day at the new school', s: 'Opening day' },
    hidden: {
      j: { q: 'Every home is close to school! What did Florence still guess?', options: ['How fast children walk', 'That the school is a shop', 'That everyone drives to school'], why: 'Florence guessed every child walks at the same speed. Little ones and wheelchair users may take longer!' },
      s: { q: 'Which assumption is still in the plan?', options: ['Walking speed: 3 minutes per tile for everyone', 'The school doubles as a shop', 'All pupils arrive by car'], why: 'Florence assumed one walking speed. Accessibility audits use slower speeds for younger children and wheelchair users.' },
    },
    facil: { brief: 'Ask: what does “the middle” mean: of the island, or of the homes?', check: 'The walking lens shows minutes from every home. Ask which home is furthest.', habit: 'Florence did exactly what the words said. What did we mean?', build: 'Ask pupils to check the furthest home after they move the school.', live: 'Ask who walks to school now, and who might still struggle.' },
  },
};

// Diary lines from what the simulation says is true: [morning, afternoon, evening] per level.
export function diaryLines(id, s, junior) {
  const J = (j, sn) => (junior ? j : sn);
  const L = {
    land: [s.townFlooded === 0 ? J('We chose our new land. It stays dry, even in winter!', 'Site chosen: dry ground, no flood risk.') : J('Our new land gets soggy in winter…', 'Site chosen, but part of it floods.'), J('The surveyors put flags all round the town land.', 'Surveyors staked the boundary.'), J('Tonight we dream about our new homes.', 'Next: streets and routes.')],
    move: [s.unsafeCrossings === 0 ? J('I walked to school with my friends today. No busy roads to cross!', 'Walked to school: no busy crossings.') : J('Mum had to help me across the busy road.', 'School run: unsafe crossings on the route.'), J('We cycled to the beach after school.', 'Afternoon: the cycle lanes were busy.'), J('The streets are quiet tonight.', 'Evening: low traffic.')],
    homes: [s.avgTemp >= 18 ? J('Our new house smells of wood. It’s cosy!', 'Moved in. Warm with the heating off.') : J('Brrr, our new house is cold inside.', 'Moved in. Cold with the heating off.'), J('We met our new neighbours.', 'Afternoon: neighbours met.'), J('Our first night in the new house!', 'First night in the new homes.')],
    food: [s.species.bees ? J('We picked apples. The bees were busy!', 'Harvest started; the hedgerows still buzz.') : J('No bees came to the flowers this year…', 'Harvest started, but the pollinators have gone.'), s.food >= s.foodNeed ? J('There’s enough food in the shop for everyone.', 'Food supply covers every household.') : J('The shop ran out of food.', 'Food supply fell short.'), J('Soup made from our own vegetables tonight!', 'Dinner from local produce.')],
    power: [J('It snowed! The town is white and still.', 'A still, freezing winter day.'), J('The rain garden drank up the melting snow.', 'Meltwater handled by the rain gardens.'), s.power.winterOK ? J('Cold, still night, and our lights stayed on!', 'Coldest night of the year; lights stayed on.') : J('The lights went out on the coldest night.', 'Blackout on the coldest night.')],
    heart: [s.walkMax <= 15 ? J(`The new school is only ${s.walkMax} minutes’ walk away!`, `School ${s.walkMax} minutes away on foot.`) : J('The new school is a long walk away…', `Longest walk to school: ${s.walkMax} minutes.`), J('Market day in the square!', 'Afternoon: the market opened.'), J('Festival tonight!', 'Evening: festival in the square.')],
  };
  return L[id];
}

// Dilemmas (senior only): a choice at the end of a level with honest trade-offs.
export const DILEMMAS = {
  homes: { text: 'A developer offers to add a floor of concrete flats: +6 households, +30 t carbon.', options: [{ label: 'Accept', effect: { families: 6, carbon: 30 } }, { label: 'Decline', effect: {} }] },
  move: { text: 'Shop owners want 4 parking spaces outside their shops: more trade, but more cars by the pavements.', options: [{ label: 'Add parking', effect: { carbon: 5, health: -1, community: 1 } }, { label: 'Loading bay only', effect: { community: 0.5 } }] },
  power: { text: 'A neighbour island offers power on still nights, but it comes from gas. Or you pay for more batteries.', options: [{ label: 'Buy it', effect: { winter: 6, carbon: 20 } }, { label: 'Build more storage', effect: { winter: 4, credits: -6 } }] },
  heart: { text: 'The park or 4 more homes on the last free tile?', options: [{ label: 'Park', effect: { health: 1, nature: 1 } }, { label: 'Homes', effect: { families: 4, carbon: 8 } }] },
};
// what a town-meeting choice changes, in words (every choice changes at least one real number)
export function meetingEffect(e) {
  const sg = (n) => (n > 0 ? '+' : '') + n;
  return [e.families && `${sg(e.families)} households`, e.carbon && `${sg(e.carbon)} t carbon`, e.winter && `${sg(e.winter)} winter-night power`, e.health && `${sg(e.health)} health`, e.community && `${sg(e.community)} community`, e.nature && `${sg(e.nature)} nature`, e.credits && `${sg(e.credits)} credits`].filter(Boolean).join(', ') || 'no change to the numbers';
}

// Town names offered on the start screen, and a tiny filter for typed names.
export const NAME_IDEAS = ['Willow Bay', 'Otter Bend', 'Bramble Hill', 'Sunny Hollow', 'Kestrel Cove', 'Meadowmere'];
const BLOCK_ANY = /(fuck|shit|cunt|bitch|bastard|wank|twat|nazi|porn)/i;          // anywhere, even run together
const BLOCK_WORD = /\b(piss|dick|cock|slag|sex|sexy|arse|arsehole|poo|willy|boob|boobs|tits|crap|bum|butt)\b/i; // whole words only (so Sussex, Poole are fine)
export function cleanTownName(raw) {
  const t = String(raw || '').replace(/<[^>]*>?/g, ' ').replace(/[^A-Za-z0-9 '\-]/g, '').replace(/\s+/g, ' ').trim().slice(0, 24);
  if (!t || BLOCK_ANY.test(t.replace(/[^a-z]/gi, '')) || BLOCK_WORD.test(t)) return null;
  return t.replace(/\b\w/g, (c) => c.toUpperCase());
}
