// Words for the two versions. Junior (8–12): short, plain, read aloud. Senior (13–17): technical names,
// real units, dilemmas. Numbers in messages come from the simulation, never from this file.

export const HABITS = ['one_word', 'typical', 'missing', 'literal'];

export const CONTENT = {
  junior: {
    name: 'Ages 8–12',
    helperName: 'Plotter',
    habits: {
      one_word: { label: 'Took one word too far', icon: '🎯', explain: 'Plotter chased one word, like “best” or “most”, and forgot everything else.' },
      typical: { label: 'Only thought of a normal day', icon: '📅', explain: 'Plotter planned for the usual case: a sunny day, or people who drive. Not everyone, not every day.' },
      missing: { label: 'Was missing information', icon: '🧩', explain: 'Plotter didn’t know something important, like floods or where the bees live.' },
      literal: { label: 'Read the words too exactly', icon: '📏', explain: 'Plotter did exactly what the words said, not what we meant.' },
    },
    checks: {
      flood: { label: 'Flood lens', icon: '🌊' }, carbon: { label: 'Carbon lens', icon: '☁' }, nature: { label: 'Nature lens', icon: '🦋' },
      winter: { label: 'Winter test', icon: '❄' }, walk: { label: 'Walking-time lens', icon: '🚶' }, street: { label: 'Street view', icon: '👀' }, inside: { label: 'Inside view', icon: '🏠' },
    },
    ui: {
      start: 'Start', next: 'Next', check: 'Check Plotter’s plan', how: 'How will you check the plan?', build: 'Build it', usePlan: 'Use Plotter’s plan', done: 'Done building',
      tell: 'Tell Plotter what to do', send: 'Send to Plotter', typeInstead: 'Type it instead', useTiles: 'Use word tiles', useCards: 'Use a card',
      whyWrong: 'Why did Plotter get it wrong?', tryClearer: 'Give Plotter a clearer instruction', nothingHere: 'No problem shows up here. Try another way to check.',
      unknown: 'I don’t know how to plan that yet.', tryWords: 'Try words like', sure: 'sure', plotterGuess: 'GUESS', checked: 'PLAN CHECKED',
      foundIt: 'You found the problem!', moveIn: 'Moving day', live: 'A day in your town', foundations: 'Foundations set!', continue: 'Continue', back: 'Back to the island',
      reward: 'Level complete', stars: 'Stars', firstTry: 'Clear first time!', report: 'Town report', newLens: 'New lens unlocked', petition: 'Residents are worried',
    },
  },
  senior: {
    name: 'Ages 13–17',
    helperName: 'Plotter',
    habits: {
      one_word: { label: 'Proxy optimisation', icon: '🎯', explain: 'Plotter maximised one measurable proxy (“best” → flattest, “most food”) and ignored everything the instruction didn’t mention. Also called specification gaming.' },
      typical: { label: 'Average-case assumption', icon: '📅', explain: 'Plotter optimised for the typical case (an average day, a typical commuter who drives) instead of the worst case or every group.' },
      missing: { label: 'Missing or biased data', icon: '🧩', explain: 'Plotter’s data didn’t include something that matters (flood maps, habitats, who was asked), so it couldn’t account for it.' },
      literal: { label: 'Specification ambiguity', icon: '📏', explain: 'The instruction had more than one reading and Plotter chose the literal one (“the middle” of the island, not of the homes).' },
    },
    checks: {
      flood: { label: 'Flood-risk lens', icon: '🌊' }, carbon: { label: 'Embodied-carbon lens', icon: '☁' }, nature: { label: 'Habitat & species lens', icon: '🦋' },
      winter: { label: 'Worst-case power test', icon: '❄' }, walk: { label: 'Walking-time lens', icon: '🚶' }, street: { label: 'Street view (ground truth)', icon: '👀' }, inside: { label: 'Inside view (thermal)', icon: '🏠' },
    },
    ui: {
      start: 'Start', next: 'Next', check: 'Test the plan', how: 'Which evidence would test this plan?', build: 'Build', usePlan: 'Accept Plotter’s plan', done: 'Finish building',
      tell: 'Write an instruction for Plotter', send: 'Send', typeInstead: 'Free text', useTiles: 'Word tiles', useCards: 'Use a card',
      whyWrong: 'Which failure mode caused this?', tryClearer: 'Rewrite the instruction: goal + limit + check', nothingHere: 'This evidence doesn’t show a problem. Try another test.',
      unknown: 'I can’t map that to a plan for this level.', tryWords: 'Try including', sure: 'confidence', plotterGuess: 'GUESS', checked: 'PLAN TESTED',
      foundIt: 'Evidence found', moveIn: 'Move-in', live: 'A day in the town', foundations: 'Decisions locked', continue: 'Continue', back: 'Back to the island',
      reward: 'Level complete', stars: 'Stars', firstTry: 'Well specified first time', report: 'Town report', newLens: 'New test unlocked', petition: 'Residents’ petition',
    },
  },
};

// Per-level text. j = junior, s = senior. {n} placeholders are filled from the simulation.
export const LEVEL_TEXT = {
  land: {
    title: 'Read the land',
    goal: { j: 'Choose where your town will grow', s: 'Site selection: where should the town grow?' },
    brief: { j: 'Families are coming! Plotter will find land for 40 families.', s: 'Plotter will select 18 tiles of land for 40 households. You set the brief.' },
    flaw: { flood: { j: 'The meadow floods every winter', s: '{n} of 18 town tiles are on the floodplain' }, nature: { j: 'The old wood would be cut down', s: '{n} town tiles would clear ancient woodland' } },
    tiles: ['Find', 'the best', 'flat', 'sunny', 'dry', 'land', 'that never floods', 'near the river', 'by the beach', 'keep the meadow wild', 'keep the wood', 'keep the wetland', 'with lots of space'],
    cards: [['Find the best land', 'vague'], ['Dry, sunny land. Keep the meadow wild.', 'clear'], ['Next to the beach', 'other']],
    debrief: 'What did “best” mean to Plotter? What does “best” mean to an otter, or to a family in winter?',
    fact: { j: 'Rivers spread over flat meadows in winter. That’s why they’re called floodplains.', s: 'Floodplains are flat because rivers built them by flooding. Planners check flood maps before choosing a site.', src: 'Environment Agency, “Flood map for planning” (gov.uk)' },
    diary: { j: 'We chose our new home today. The sun shines on the slope!', s: 'Site chosen: dry, south-facing, meadow protected.' },
  },
  move: {
    title: 'Getting around',
    goal: { j: 'Design the streets: cars, bikes or feet?', s: 'Movement network: how do people reach school and the ferry?' },
    brief: { j: 'Children need to get to the island school. Tell Plotter how.', s: 'Connect homes to the island school and the ferry. Who is “everyone”?' },
    flaw: { street: { j: '8:45 am: children can’t cross', s: '{n} car tiles on the children’s route at 8:45 am' } },
    tiles: ['Make it', 'easy', 'safe', 'for everyone', 'to get to school', 'walking', 'cycling', 'footpaths', 'a tram', 'cars stay at the edge', 'no cars', 'fast'],
    cards: [['Make it easy for everyone to get to school', 'vague'], ['Safe walking and cycling routes. Cars stay at the edge.', 'clear'], ['Build a tram line', 'other']],
    debrief: 'Who was the plan easy for? What does “everyone” include?',
    fact: { j: 'In Goldsmith Street, Norwich, cars park at the edge so children can play safely between the homes.', s: 'Goldsmith Street (Norwich, Stirling Prize 2019) keeps parking at the edges so the streets between homes stay safe.', src: 'Architizer, “Goldsmith Street wins the Stirling Prize” (2019)' },
    diary: { j: 'I walked to school by myself today!', s: 'Walked to school: no busy crossings.' },
  },
  homes: {
    title: 'Homes',
    goal: { j: 'Build homes for the first 40 families', s: 'Housing: 40 households, under the embodied-carbon limit' },
    brief: { j: 'Plotter will build the homes. What should they be like?', s: 'Embodied-carbon limit: 70 t for the homes. Families: 40.' },
    flaw: { carbon: { j: 'Carbon cloud: {n}× over the limit', s: 'Embodied carbon {n}× the 70 t limit' }, inside: { j: 'Brrr! {n} °C inside with the heating off', s: 'Indoor temperature {n} °C with heating off' } },
    tiles: ['Build', 'strong', 'cheap', 'warm', 'low-carbon', 'homes', 'from wood', 'and straw', 'reused bricks', 'with green roofs', 'lots of', 'tall'],
    cards: [['Build strong homes', 'vague'], ['Warm, low-carbon homes from local timber and straw.', 'clear'], ['Tall tower blocks', 'other']],
    debrief: '“Strong” made Plotter choose concrete. What else should a home be?',
    fact: { j: 'Wood and straw store carbon that plants took from the air. Making concrete releases lots of it.', s: 'Cement production causes roughly 8% of global CO₂ emissions; timber and straw store carbon.', src: 'Chatham House, “Making Concrete Change” (2018)' },
    diary: { j: 'Our new house smells of wood. It’s cosy!', s: 'Moved in. Warm with the heating off.' },
  },
  food: {
    title: 'Food',
    goal: { j: 'Grow food for the whole town', s: 'Food system: enough food without losing biodiversity' },
    brief: { j: 'Everyone needs food. Tell Plotter how to grow it.', s: 'Food need is set by households. Habitats are part of the test.' },
    flaw: { nature: { j: 'The bees and deer have left', s: 'Pollinators and deer lost: {n} hedgerow tiles removed' } },
    tiles: ['Grow', 'as much food as possible', 'enough food', 'for everyone', 'keep the hedges', 'for the bees', 'beehives', 'an orchard', 'allotments', 'near our homes', 'and wildlife'],
    cards: [['Grow as much food as possible', 'vague'], ['Enough food, and keep the hedges for the bees.', 'clear'], ['Bring all our food in by lorry', 'other']],
    debrief: '“Most food possible”: who paid for it? What does “enough” mean instead of “most”?',
    fact: { j: 'Hedges are homes and highways for bees, birds and hedgehogs.', s: 'UK hedgerows support over 600 plant, 1,500 insect, 65 bird and 20 mammal species.', src: 'People’s Trust for Endangered Species, “Hedgerows” (ptes.org)' },
    diary: { j: 'We picked apples from the orchard. The bees were busy!', s: 'Food sorted; the hedgerows still buzz.' },
  },
  power: {
    title: 'Water, power and waste',
    goal: { j: 'Keep the town running all year', s: 'Energy: meet demand in the worst case, not the average' },
    brief: { j: 'Homes need power, even on the darkest winter night.', s: 'Size the system for a still winter night. Batteries only help if something charges them.' },
    flaw: { winter: { j: 'Still winter night: blackout', s: 'Winter-night supply {n} of demand' } },
    tiles: ['Make', 'enough', 'clean power', 'for a still', 'winter night', 'store the sunshine', 'batteries', 'wind turbines', 'solar roofs', 'rain gardens', 'a repair café', 'compost'],
    cards: [['Make enough clean power', 'vague'], ['Enough power for a still winter night. Store the sunshine.', 'clear'], ['Buy power from the city', 'other']],
    debrief: 'Solar roofs worked on an average day. Why test a still winter night?',
    fact: { j: 'Batteries save sunshine from the day to use at night.', s: 'Grid planners size systems for peak winter demand, not average demand.', src: 'National Grid ESO, “Winter Outlook” reports' },
    diary: { j: 'It snowed! Our lights stayed on all night.', s: 'Coldest night of the year; lights stayed on.' },
  },
  heart: {
    title: 'Complete the town',
    goal: { j: 'Finish the town your way', s: 'Town centre: school, market and nature links' },
    brief: { j: 'The little island school is full. Where should the new school go?', s: 'Place the new school. Then the market, park and nature links.' },
    flaw: { walk: { j: 'That’s the wetland: {n} min from home', s: 'Longest walk to school: {n} min' } },
    tiles: ['Put', 'the school', 'in the middle', 'within a 10-minute walk', 'of every home', 'next to the homes', 'a market', 'a safe route', 'green bridges', 'for nature'],
    cards: [['Put the school in the middle', 'vague'], ['School within a 10-minute walk of every home.', 'clear'], ['Next to the main road', 'other']],
    debrief: '“The middle” of what? What should “middle” mean for a school?',
    fact: { j: 'A 15-minute town means you can walk to school, shops and the park.', s: 'The “15-minute city” idea: daily needs within a short walk or cycle.', src: 'C40 Cities, “15-minute cities” (c40knowledgehub.org)' },
    diary: { j: 'The new school is just round the corner. Festival tonight!', s: 'School 8 minutes away. Festival in the square.' },
  },
};

// Dilemmas (senior only): a choice at the end of a level with honest trade-offs.
export const DILEMMAS = {
  homes: { text: 'A developer offers to add a floor of concrete flats: +6 families, +30 t carbon.', options: [{ label: 'Accept', effect: { families: 6, carbon: 30 } }, { label: 'Decline', effect: {} }] },
  move: { text: 'Shop owners want 4 parking spaces outside their shops.', options: [{ label: 'Add parking', effect: { carbon: 5, health: -1, community: 1 } }, { label: 'Loading bay only', effect: { community: 0.5 } }] },
  power: { text: 'A neighbour island offers to sell you power on still nights, but it comes from gas.', options: [{ label: 'Buy it', effect: { carbon: 20, energy: 0.3 } }, { label: 'Build more storage', effect: { cost: 6 } }] },
  heart: { text: 'The park or 4 more homes on the last free tile?', options: [{ label: 'Park', effect: { health: 1, nature: 1 } }, { label: 'Homes', effect: { families: 4, carbon: 8 } }] },
};
