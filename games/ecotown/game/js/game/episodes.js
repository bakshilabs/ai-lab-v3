// The twelve story episodes: an opening and a closing cartoon for each AI Lab mission. This file is the scripts
// as plain data (no three.js, so tests and the recording tools can import it). The staging engine that turns a
// script into pictures is episodeplay.js; the in-game viewer that plays the recorded videos is ui/epviewer.js.
// Storyboards, shot lists and where each learning point comes from: docs/EPISODES.md.
//
// Cast: Florence (the wooden robot planner: keen, proud, a bit literal, never mean, and she learns), Posy (asks
// for things, in plain words), Dev (checks things: "look through the lens"), Pebble the otter (says nothing, but
// shows how the wild side of the island feels) and a narrator.
//
// A script is a list of shots. A shot has a camera and a list of beats. A beat is either a spoken line
// ({ who, say, do }) or a pause ({ wait, do }); `do` is a list of stage actions that start with the beat
// (an action may carry { at: seconds } as its last item to start later inside the beat).
// Places are tile keys ('4,6'), optionally with an offset in world units ('4,6+1.5,-2'), or a cast name.

export const CAST = {
  narrator: { name: 'Narrator', voice: 'bf_isabella', lang: 'en-gb', speed: 0.97 },
  florence: { name: 'Florence', voice: 'af_bella', lang: 'en-us', speed: 1.0 },
  posy: { name: 'Posy', voice: 'bf_lily', lang: 'en-gb', speed: 1.02, pitch: 1.1, look: { shirt: '#ffd23f', pants: '#7a4a8a', skirt: '#e8573f', skin: '#8d5a3b', hair: '#2b1d14', style: 'bun' } },
  dev: { name: 'Dev', voice: 'bm_fable', lang: 'en-gb', speed: 1.02, pitch: 1.1, look: { shirt: '#16c79a', pants: '#2c3e66', skin: '#e0ac7e', hair: '#1d140e', style: 'cap', cap: '#2f6fd8' } },
  pebble: { name: 'Pebble the otter' },
};
export const MISSIONS = ['land', 'move', 'homes', 'food', 'power', 'heart'];
const CLEAR = { land: ['dry', 'sunny', 'keep_meadow'], move: ['safe_walking', 'cycling', 'cars_at_edge'], homes: ['warm', 'low_carbon', 'natural_materials'], food: ['enough_food', 'keep_hedges', 'bees'], power: ['enough_power', 'winter', 'night', 'storage', 'solar', 'save_water', 'compost'], heart: ['walk_time', 'market', 'nature_links'] };

// camera shorthand: look-at place, distance, yaw (0 = from the beach, looking north), pitch, and an optional move
const cam = (look, dist, yaw, pitch, more = {}) => ({ look, dist, yaw, pitch, ...more });
const OOPS = [['fl', 'oops'], ['sfx', 'flaw']];

export const EPISODES = [
  // ------------------------------------------------------------------ 1 · land
  {
    id: 'land-open', mission: 'land', kind: 'open', n: 1, title: 'The best land', music: 'day',
    learn: { eco: 'Flat land beside a river is a flood plain.', ai: 'An AI can take one vague word ("best") too far.', from: 'LAB-GUIDE.md section 5 (Level 1), section 9A "Level 1: Read the land"; DESIGN.md "The six levels"' },
    card: { ask: 'Is the flattest land the best land?' },
    plans: { flawed: ['land', ['best']] },
    setup: { seed: 'land', hour: 10, florence: '4,6', cast: { posy: '4,6+-3.6,1.6', dev: '4,6+3.6,1.6' }, otter: '2,6' },
    shots: [
      { cam: cam('6,5', 150, -0.45, 0.62, { to: { yaw: -0.3, dist: 135 } }), beats: [
        { who: 'narrator', say: 'This is Eco Town. Florence the robot is planning it.', do: [['fl', 'wave', { at: 1.2 }]] } ] },
      { cam: cam('4,6+0,2', 36, -0.6, 0.24, { up: 3.4, to: { dist: 32 } }), beats: [
        { who: 'posy', say: 'Florence! Please find the best land for our town.', do: [['fl', 'look', 'posy'], ['kid', 'posy', 'jump']] },
        { who: 'florence', say: 'Best land? Easy!', do: [['fl', 'look', null], ['fl', 'think', { at: 0.1 }]] } ] },
      { cam: cam('4,5', 78, 0.5, 0.6, { to: { yaw: 0.38 } }), beats: [
        { who: 'florence', say: 'Here! Flat, wide and right by the river. I am 82% sure!', do: [['fl', 'point', '3,4'], ['ghost', 'flawed', { at: 0.3 }], ['sfx', 'ghost', { at: 0.3 }], ['fl', 'proud', { at: 2.6 }], ['pill', 'florence', '82% sure!', 3.2, { at: 2.6 }]] },
        { wait: 1.6, do: [['build', 'flawed', { dur: 1.1, stagger: 0.06 }], ['sfx', 'pop']] } ] },
      { cam: cam('2,6+2,1', 25, 0.1, 0.38, { up: 1.2, to: { dist: 22 } }), beats: [
        { who: 'dev', say: 'Hmm. Why is the grass so squelchy?', do: [['kid', 'dev', 'at', '3,6+-1.6,2'], ['kid', 'dev', 'face', '2,6+0,2'], ['otter', 'pop', { at: 0.6 }], ['sfx', 'tip', { at: 0.6 }]] },
        { wait: 0.8, do: [['otter', 'shake']] } ] },
      { cam: cam('5,5', 120, -0.2, 0.7, { to: { yaw: -0.05 } }), beats: [
        { who: 'narrator', say: 'Flat land looks best to Florence. But what did she miss?' },
        { who: 'narrator', say: 'Step into the AI Lab and check.', do: [['card']] } ] },
    ],
  },
  {
    id: 'land-close', mission: 'land', kind: 'close', n: 1, title: 'The flood', music: 'lab',
    learn: { eco: 'Flat land by a river can flood in winter: build on dry ground and keep the meadow wild.', ai: 'An AI can take one word too far, so say what you really mean (a clear instruction).', from: 'LAB-GUIDE.md section 5 (Level 1: flood lens; clearer card "Dry, sunny land. Keep the meadow wild."), section 9A Level 1, section 2 (learning outcomes 1 and 3)' },
    card: { eco: 'Flat land by a river can flood. Keep it wild.', ai: 'An AI can take one word too far. Say what you mean.' },
    plans: { flawed: ['land', ['best']], clear: ['land', CLEAR.land] },
    setup: { seed: 'land', apply: 'flawed', hour: 15, florence: '5,6', cast: { posy: '5,6+-3.8,1.4', dev: '5,6+3.8,1.4' }, otter: '2,6' },
    shots: [
      { cam: cam('4,5', 105, -0.3, 0.6, { to: { yaw: -0.15 } }), beats: [
        { who: 'narrator', say: 'Winter came to Eco Town. And so did the rain.', do: [['time', 16.5, 0.7, 3], ['flood', 1, 3.4, { at: 0.8 }], ['sfx', 'dusk', { at: 0.6 }], ['otter', 'dive']] } ] },
      { cam: cam('4,5', 92, 0.25, 0.78), beats: [
        { who: 'dev', say: 'Look through the flood lens! The meadow floods every winter.', do: [['lens', 'flood'], ['sfx', 'whoosh'], ['kid', 'dev', 'jump']] } ] },
      { cam: cam('5,6+0,1', 38, -0.5, 0.26, { up: 3.2 }), beats: [
        { who: 'florence', say: 'Oops. You said best. I guessed flat.', do: [...OOPS, ['lens', null]] },
        { who: 'posy', say: 'Try this. Dry, sunny land. Keep the meadow wild.', do: [['fl', 'look', 'posy'], ['kid', 'posy', 'jump', { at: 0.2 }]] } ] },
      { cam: cam('7,5', 125, -0.25, 0.68, { to: { yaw: -0.1 } }), beats: [
        { who: 'florence', say: 'Dry land on the slope. The meadow stays wild. Checked!', do: [['lens', null], ['flood', 0.35, 1.5], ['time', 12, 0, 1.5], ['reset'], ['build', 'clear', { dur: 1.2, stagger: 0.05, at: 0.4 }], ['sfx', 'pass', { at: 0.5 }], ['fl', 'look', null], ['fl', 'cheer', { at: 2.4 }], ['pill', 'florence', 'Plan checked ✓', 3, 'ok', { at: 2.2 }]] } ] },
      { cam: cam('3,5', 70, -0.5, 0.5, { to: { yaw: -0.35 } }), beats: [
        { who: 'narrator', say: 'Flat land by a river can flood. So build on dry ground, and keep the meadow wild.', do: [['flood', 0, 2], ['otter', 'pop', { at: 0.8 }], ['otter', 'spin', { at: 2.2 }]] } ] },
      { cam: cam('8,5', 120, -0.1, 0.66, { to: { yaw: 0.05 } }), beats: [
        { who: 'narrator', say: 'And an AI can take one word too far. So say what you really mean.', do: [['card']] } ] },
    ],
  },
  // ------------------------------------------------------------------ 2 · move
  {
    id: 'move-open', mission: 'move', kind: 'open', n: 2, title: 'Easy for everyone', music: 'day',
    learn: { eco: 'How people get to school shapes the whole town.', ai: 'When an instruction leaves a gap ("everyone"), an AI fills it with a guess.', from: 'LAB-GUIDE.md section 5 (Level 2), section 9A "Level 2: Getting around"' },
    card: { ask: 'Who is “everyone”?' },
    plans: { flawed: ['move', ['easy_access']] },
    setup: { seed: 'move', hour: 8.4, florence: '7,6+0,1', cast: { posy: '7,6+-3.8,2.2', dev: '7,6+3.8,2.2' }, otter: '2,6' },
    shots: [
      { cam: cam('8,6', 125, -0.35, 0.64, { to: { yaw: -0.2, dist: 112 } }), beats: [
        { who: 'narrator', say: 'The town has its land. Now, how will people get around?' } ] },
      { cam: cam('7,6+0,1', 38, 0.12, 0.26, { up: 3.2 }), beats: [
        { who: 'posy', say: 'Make it easy for everyone to get to school!', do: [['fl', 'look', 'posy'], ['kid', 'posy', 'jump']] },
        { who: 'florence', say: 'Easy for everyone? Then everyone needs a big, wide road!', do: [['fl', 'look', null], ['fl', 'surprised'], ['fl', 'proud', { at: 1.6 }]] } ] },
      { cam: cam('8,7', 84, 0.3, 0.66, { to: { yaw: 0.18 } }), beats: [
        { who: 'florence', say: 'And a car park at the school gate. I am 77% sure!', do: [['fl', 'point', '9,7'], ['build', 'flawed', { dur: 1.6, stagger: 0.12 }], ['sfx', 'pop'], ['pill', 'florence', '77% sure!', 3, { at: 2.2 }]] },
        { wait: 1.2, do: [['kid', 'posy', 'walk', '7,6+-2.2,2.8', 1], ['kid', 'dev', 'walk', '7,6+1.4,2.8', 1]] } ] },
      { cam: cam('7,7+0,-1', 32, -0.3, 0.2, { up: 2.2, to: { yaw: -0.18 } }), beats: [
        { who: 'dev', say: 'But Florence, we walk to school.', do: [['kid', 'dev', 'face', 'fl'], ['kid', 'posy', 'face', '7,7'], ['fl', 'look', 'dev']] },
        { wait: 0.9, do: [['fl', 'think']] } ] },
      { cam: cam('8,7', 105, -0.1, 0.7, { to: { yaw: 0.05 } }), beats: [
        { who: 'narrator', say: 'Easy for everyone. Or just easy for cars?' },
        { who: 'narrator', say: 'Who did Florence forget?', do: [['card']] } ] },
    ],
  },
  {
    id: 'move-close', mission: 'move', kind: 'close', n: 2, title: 'Look from the street', music: 'lab',
    learn: { eco: 'A town with safe walking and cycling routes, and cars kept at the edge, works for everyone.', ai: 'When words leave a gap, an AI fills it with a guess (here: "everyone drives").', from: 'LAB-GUIDE.md section 5 (Level 2: street view at 8:45 am; clearer card "Safe walking and cycling routes. Cars stay at the edge."), section 9A Level 2 ("What does everyone include?")' },
    card: { eco: 'Safe paths to walk and cycle. Cars stay at the edge.', ai: 'An AI fills gaps with guesses. Say who you mean.' },
    plans: { flawed: ['move', ['easy_access']], clear: ['move', CLEAR.move] },
    setup: { seed: 'move', apply: 'flawed', hour: 8.75, florence: '7,6+3,0.6', cast: { posy: '7,6+-2.2,2.8', dev: '7,6+1.4,2.8' }, otter: '2,5' },
    shots: [
      { cam: cam('7,7+0,-1', 30, -0.3, 0.16, { up: 2.2, to: { yaw: -0.15 } }), beats: [
        { who: 'narrator', say: 'It is quarter to nine. School time.', do: [['kid', 'posy', 'face', '7,7'], ['kid', 'dev', 'face', '7,7']] },
        { who: 'dev', say: 'Look from the street. Too many cars! We cannot cross.', do: [['label', '7,7+0,0', 'Too many cars to cross', 3.5, 'bad', { at: 0.6 }], ['kid', 'dev', 'jump', { at: 1.6 }]] } ] },
      { cam: cam('7,6+1,1', 38, 0.12, 0.26, { up: 3.2 }), beats: [
        { who: 'florence', say: 'Oops. Nobody said how. So I guessed that everyone drives.', do: [...OOPS, ['kid', 'posy', 'face', 'fl'], ['kid', 'dev', 'face', 'fl']] },
        { who: 'posy', say: 'Safe paths for walking and cycling. Cars stay at the edge.', do: [['fl', 'look', 'posy'], ['kid', 'posy', 'jump', { at: 0.2 }]] } ] },
      { cam: cam('8,7', 88, 0.2, 0.68, { to: { yaw: 0.05 } }), beats: [
        { who: 'florence', say: 'Paths and cycle lanes. Cars at the edge. Checked!', do: [['reset'], ['build', 'clear', { dur: 1.4, stagger: 0.12, at: 0.3 }], ['sfx', 'pass', { at: 0.5 }], ['fl', 'look', null], ['fl', 'cheer', { at: 2.2 }], ['pill', 'florence', 'Plan checked ✓', 3, 'ok', { at: 2 }]] } ] },
      { cam: cam('8,7+-2,0', 40, -0.3, 0.28, { up: 2, to: { yaw: -0.15 } }), beats: [
        { who: 'narrator', say: 'A town you can walk and cycle around is safer for everyone.', do: [['kid', 'posy', 'walk', '9,7+-1,0.6', 3.6], ['kid', 'dev', 'walk', '9,7+-3.4,-0.4', 3.8]] } ] },
      { cam: cam('8,6', 112, -0.15, 0.68, { to: { yaw: 0 } }), beats: [
        { who: 'narrator', say: 'And when your words leave a gap, an AI fills it with a guess. So say who you mean.', do: [['card']] } ] },
    ],
  },
  // ------------------------------------------------------------------ 3 · homes
  {
    id: 'homes-open', mission: 'homes', kind: 'open', n: 3, title: 'Strong homes', music: 'day',
    learn: { eco: 'What a home is built from matters, and some of it cannot be seen from outside.', ai: 'A plan that looks right from the sky still needs checking.', from: 'LAB-GUIDE.md section 5 (Level 3), section 9A "Level 3: Homes"' },
    card: { ask: 'What can’t you see from the sky?' },
    plans: { flawed: ['homes', ['strong']] },
    setup: { seed: 'homes', hour: 11, florence: '7,6+0,1', cast: { posy: '7,6+-3.8,2.2', dev: '7,6+3.8,2.2' }, otter: '2,6' },
    shots: [
      { cam: cam('10,5', 110, -0.35, 0.62, { to: { yaw: -0.2, dist: 98 } }), beats: [
        { who: 'narrator', say: 'Families are coming to Eco Town. They need homes.' } ] },
      { cam: cam('7,6+0,1', 38, 0.12, 0.26, { up: 3.2 }), beats: [
        { who: 'posy', say: 'Florence, build strong homes, please!', do: [['fl', 'look', 'posy'], ['kid', 'posy', 'jump']] },
        { who: 'florence', say: 'Strong? I know strong! Concrete and steel!', do: [['fl', 'look', null], ['fl', 'proud', { at: 0.9 }]] } ] },
      { cam: cam('10,5', 74, 0.35, 0.56, { up: 4, to: { yaw: 0.15 } }), beats: [
        { who: 'florence', say: 'They will stand for years. I am 85% sure!', do: [['fl', 'point', '10,6'], ['build', 'flawed', { dur: 3.2, stagger: 0.15 }], ['sfx', 'pop'], ['pill', 'florence', '85% sure!', 3, { at: 2 }]] },
        { wait: 2.2, do: [['fl', 'look', null], ['fl', 'cheer', { at: 0.8 }]] } ] },
      { cam: cam('8,6', 46, -0.5, 0.2, { up: 4.5, to: { dist: 42 } }), beats: [
        { who: 'dev', say: 'They do look strong. But is strong all a home should be?', do: [['kid', 'dev', 'face', '10,6'], ['kid', 'posy', 'face', '10,6'], ['kid', 'dev', 'face', 'fl', { at: 1.8 }]] } ] },
      { cam: cam('10,5', 96, -0.05, 0.72, { to: { yaw: 0.1 } }), beats: [
        { who: 'narrator', say: 'From the sky, the homes look fine.' },
        { who: 'narrator', say: 'How can you check what you cannot see?', do: [['card']] } ] },
    ],
  },
  {
    id: 'homes-close', mission: 'homes', kind: 'close', n: 3, title: 'The hidden cloud', music: 'lab',
    learn: { eco: 'Embodied carbon: carbon hides in building materials. Timber and straw homes are warm and low-carbon.', ai: 'A plan that looks right is not proof: check with evidence (a lens).', from: 'LAB-GUIDE.md section 5 (Level 3: carbon lens, inside view; clearer card "Warm, low-carbon homes from local timber and straw."), section 9A Level 3, section 2 (learning outcome 2)' },
    card: { eco: 'Carbon hides in what we build with. Timber and straw keep it low.', ai: 'Looking right is not proof. Check with evidence.' },
    plans: { flawed: ['homes', ['strong']], clear: ['homes', CLEAR.homes] },
    setup: { seed: 'homes', apply: 'flawed', hour: 13, florence: '7,6+0,1', cast: { posy: '7,6+-3.8,2.2', dev: '7,6+3.8,2.2' }, otter: '2,6' },
    shots: [
      { cam: cam('10,5', 84, -0.35, 0.5, { up: 3, to: { yaw: -0.22 } }), beats: [
        { who: 'narrator', say: 'Some problems hide. Until you look through the right lens.' } ] },
      { cam: cam('10,5', 96, 0.2, 0.62, { up: 8 }), beats: [
        { who: 'dev', say: 'The carbon lens! Making all that concrete gave off three times too much carbon.', do: [['lens', 'carbon'], ['sfx', 'whoosh'], ['kid', 'dev', 'jump']] } ] },
      { cam: cam('7,6+0,1', 38, 0.12, 0.26, { up: 3.2 }), beats: [
        { who: 'florence', say: 'Oops. I only thought about strong.', do: [...OOPS, ['lens', null]] },
        { who: 'posy', say: 'Warm, low-carbon homes from timber and straw.', do: [['fl', 'look', 'posy'], ['kid', 'posy', 'jump', { at: 0.2 }]] } ] },
      { cam: cam('10,5', 80, 0.3, 0.56, { up: 3, to: { yaw: 0.12 } }), beats: [
        { who: 'florence', say: 'Timber and straw. Warm inside, and under the limit. Checked!', do: [['lens', null], ['reset'], ['build', 'clear', { dur: 2.6, stagger: 0.1, at: 0.3 }], ['sfx', 'pass', { at: 0.5 }], ['fl', 'look', null], ['label', '10,5', 'Building carbon: {hc} of {limit} tonnes ✓', 3.2, 'ok', { at: 2.6 }], ['fl', 'cheer', { at: 3 }]] } ] },
      { cam: cam('10,6', 58, -0.4, 0.4, { up: 3, to: { yaw: -0.25 } }), beats: [
        { who: 'narrator', say: 'Carbon hides in the things we build with. Timber and straw keep it low.' } ] },
      { cam: cam('10,5', 100, -0.05, 0.7, { to: { yaw: 0.1 } }), beats: [
        { who: 'narrator', say: 'And a plan that looks right is not proof. Always check with evidence.', do: [['card']] } ] },
    ],
  },
  // ------------------------------------------------------------------ 4 · food
  {
    id: 'food-open', mission: 'food', kind: 'open', n: 4, title: 'As much as possible', music: 'day',
    learn: { eco: 'Farmland is shared with wildlife: hedges are part of it.', ai: 'An AI does exactly what the words say ("as much as possible").', from: 'LAB-GUIDE.md section 5 (Level 4), section 9A "Level 4: Food"' },
    card: { ask: 'What should Florence keep?' },
    plans: { flawed: ['food', ['most_food']] },
    setup: { seed: 'food', hour: 10.5, florence: '6,3+0,0.5', cast: { posy: '6,3+-3.8,1.9', dev: '6,3+3.8,1.9' }, otter: '2,4' },
    shots: [
      { cam: cam('8,4', 118, -0.35, 0.62, { to: { yaw: -0.2, dist: 105 } }), beats: [
        { who: 'narrator', say: 'The town is growing. Now everyone needs food.' } ] },
      { cam: cam('6,3+0,0.5', 38, 0.12, 0.26, { up: 3.2 }), beats: [
        { who: 'posy', say: 'Florence, grow as much food as possible!', do: [['fl', 'look', 'posy'], ['kid', 'posy', 'jump']] },
        { who: 'florence', say: 'As much as possible? Then I will plough everything!', do: [['fl', 'look', null], ['fl', 'surprised'], ['fl', 'proud', { at: 1.5 }]] } ] },
      { cam: cam('7,2+0,2', 86, 0.3, 0.66, { to: { yaw: 0.15 } }), beats: [
        { who: 'florence', say: 'Every field. Every hedge. I am 79% sure!', do: [['fl', 'point', '7,2'], ['build', 'flawed', { dur: 1.5, stagger: 0.08 }], ['sfx', 'pop'], ['pill', 'florence', '79% sure!', 3, { at: 1.8 }]] },
        { wait: 1.6, do: [['fl', 'look', null]] } ] },
      { cam: cam('6,3+0,0.5', 42, 0.3, 0.3, { up: 3, to: { dist: 38 } }), beats: [
        { who: 'dev', say: 'Wait. Where did the hedges go? And the bees?', do: [['kid', 'dev', 'face', '7,2'], ['kid', 'posy', 'face', '5,2'], ['kid', 'dev', 'face', 'fl', { at: 1.6 }]] } ] },
      { cam: cam('8,4', 112, -0.05, 0.72, { to: { yaw: 0.1 } }), beats: [
        { who: 'narrator', say: 'Lots of food. But who else was living here?' },
        { who: 'narrator', say: 'What should Florence keep?', do: [['card']] } ] },
    ],
  },
  {
    id: 'food-close', mission: 'food', kind: 'close', n: 4, title: 'Enough', music: 'lab',
    learn: { eco: 'Habitat corridors: hedges are homes and safe routes for wildlife. "Enough" food, not "most".', ai: 'An AI does what you say, not what you mean: say what must be kept as well as what you want.', from: 'LAB-GUIDE.md section 5 (Level 4: nature lens, bees and deer leave; clearer card "Enough food, and keep the hedges for the bees."), section 9A Level 4 ("What does enough mean instead of most?"), section 2 (learning outcome 3)' },
    card: { eco: 'Hedges are homes and paths for wildlife. Grow enough, not most.', ai: 'An AI does what you say. Tell it what to keep.' },
    plans: { flawed: ['food', ['most_food']], clear: ['food', CLEAR.food] },
    setup: { seed: 'food', apply: 'flawed', hour: 13, florence: '6,3+0,0.5', cast: { posy: '6,3+-3.8,1.9', dev: '6,3+3.8,1.9' }, otter: '2,4' },
    shots: [
      { cam: cam('8,3', 110, -0.35, 0.6, { to: { yaw: -0.22 } }), beats: [
        { who: 'narrator', say: 'The fields are full. But the island has gone quiet.' } ] },
      { cam: cam('8,4', 118, 0.2, 0.8), beats: [
        { who: 'dev', say: 'The nature lens shows it. No hedges. So the bees and the deer have left.', do: [['lens', 'nature'], ['sfx', 'whoosh'], ['kid', 'dev', 'jump']] } ] },
      { cam: cam('6,3+0,0.5', 38, 0.12, 0.26, { up: 3.2 }), beats: [
        { who: 'florence', say: 'Oops. You said as much as possible. So I took it all.', do: [...OOPS, ['lens', null]] },
        { who: 'posy', say: 'Enough food. And keep the hedges for the bees.', do: [['fl', 'look', 'posy'], ['kid', 'posy', 'jump', { at: 0.2 }]] } ] },
      { cam: cam('9,3', 92, 0.3, 0.62, { to: { yaw: 0.12 } }), beats: [
        { who: 'florence', say: 'An orchard, beehives and hedges. Enough for everyone. Checked!', do: [['lens', null], ['reset'], ['build', 'clear', { dur: 1.8, stagger: 0.2, at: 0.3 }], ['sfx', 'pass', { at: 0.5 }], ['fl', 'look', null], ['fl', 'cheer', { at: 2.8 }], ['pill', 'florence', 'Plan checked ✓', 3, 'ok', { at: 2.6 }]] } ] },
      { cam: cam('8,2+0,2', 46, -0.4, 0.36, { up: 2, to: { yaw: -0.2 } }), beats: [
        { who: 'narrator', say: 'Hedges are homes and safe paths for wildlife. Enough is better than most.' } ] },
      { cam: cam('8,4', 112, -0.05, 0.7, { to: { yaw: 0.1 } }), beats: [
        { who: 'narrator', say: 'And an AI does what you say, not what you mean. So tell it what to keep.', do: [['card']] } ] },
    ],
  },
  // ------------------------------------------------------------------ 5 · power
  {
    id: 'power-open', mission: 'power', kind: 'open', n: 5, title: 'Very, very sure', music: 'day',
    learn: { eco: 'Power has to work on the hard days, not only the normal ones.', ai: 'A high "% sure" is not the same as being right.', from: 'LAB-GUIDE.md section 5 (Level 5), section 9A "Level 5", section 9B question 4' },
    card: { ask: 'Is very sure the same as right?' },
    plans: { flawed: ['power', ['enough_power']] },
    setup: { seed: 'power', hour: 12, florence: '7,6+0,1', cast: { posy: '7,6+-3.8,2.2', dev: '7,6+3.8,2.2' }, otter: '2,6' },
    shots: [
      { cam: cam('10,5', 112, -0.35, 0.62, { to: { yaw: -0.2, dist: 100 } }), beats: [
        { who: 'narrator', say: 'Eco Town needs power. Clean power.' } ] },
      { cam: cam('7,6+0,1', 38, 0.12, 0.26, { up: 3.2 }), beats: [
        { who: 'posy', say: 'Florence, make enough clean power for every home.', do: [['fl', 'look', 'posy'], ['kid', 'posy', 'jump']] } ] },
      { cam: cam('10,5', 70, 0.3, 0.6, { up: 3, to: { yaw: 0.14 } }), beats: [
        { who: 'florence', say: 'Solar panels on every roof! On a normal day, that is plenty.', do: [['fl', 'look', null], ['fl', 'point', '10,6'], ['build', 'flawed', { dur: 1.6, stagger: 0.12 }], ['sfx', 'pop']] } ] },
      { cam: cam('7,6+0,1', 34, 0.12, 0.24, { up: 3.4 }), beats: [
        { who: 'florence', say: 'I am 90% sure. That is very, very sure!', do: [['fl', 'look', null], ['fl', 'proud', { at: 0.2 }], ['pill', 'florence', '90% sure!', 3.4, { at: 0.3 }]] },
        { who: 'dev', say: 'What about a day that is not normal?', do: [['fl', 'look', 'dev'], ['kid', 'dev', 'jump', { at: 0.1 }]] } ] },
      { cam: cam('10,5', 100, -0.05, 0.72, { to: { yaw: 0.1 } }), beats: [
        { who: 'narrator', say: 'Ninety per cent sure. Is that the same as right?' },
        { who: 'narrator', say: 'Which day would you test?', do: [['card']] } ] },
    ],
  },
  {
    id: 'power-close', mission: 'power', kind: 'close', n: 5, title: 'The winter night', music: 'night',
    learn: { eco: 'Winter power and storage: plan for a still winter night, and store energy for later.', ai: 'Confident is not the same as correct: 90% sure was wrong, 74% sure and tested was right.', from: 'LAB-GUIDE.md section 5 (Level 5: winter test, blackout; "Unsure but right" moment, 74% sure), section 9A Level 5, section 9B question 4 ("Sure isn\'t right")' },
    card: { eco: 'Plan power for the hardest night. Store some for later.', ai: 'Sure is not the same as right. Test the plan.' },
    plans: { flawed: ['power', ['enough_power']], clear: ['power', CLEAR.power] },
    setup: { seed: 'power', apply: 'flawed', hour: 15.5, florence: '7,6+0,1', cast: { posy: '7,6+-3.8,2.2', dev: '7,6+3.8,2.2' }, otter: '2,6', lights: 'all' },
    shots: [
      { cam: cam('10,5', 86, -0.3, 0.5, { up: 3, to: { yaw: -0.15 } }), beats: [
        { who: 'narrator', say: 'A still winter night. The sun has gone.', do: [['time', 20.5, 1, 3.2], ['still', true], ['sfx', 'dusk', { at: 0.4 }]] },
        { who: 'dev', say: 'The winter test! Look. Every light has gone out.', do: [['lights', 'out', 1.6, { at: 0.6 }], ['sfx', 'flaw', { at: 1.2 }], ['label', '10,5', 'Lights on: {lit} of {homes} homes', 3.2, 'bad', { at: 2.1 }]] } ] },
      { cam: cam('7,6+0,1', 38, -0.3, 0.26, { up: 3.2 }), beats: [
        { who: 'florence', say: 'Oops. But I was 90% sure!', do: [['fl', 'oops']] },
        { who: 'posy', say: 'Enough power for a still winter night. Store the sunshine.', do: [['fl', 'look', 'posy'], ['kid', 'posy', 'jump', { at: 0.2 }]] } ] },
      { cam: cam('10,5', 108, 0.25, 0.6, { up: 3, to: { yaw: 0.1 } }), beats: [
        { who: 'florence', say: 'A wind turbine and batteries. I have not planned for winter before. Only 74% sure.', do: [['time', 14, 0.6, 0.6], ['reset'], ['build', 'clear', { dur: 2.2, stagger: 0.15, at: 0.4 }], ['sfx', 'pop', { at: 0.4 }], ['fl', 'look', null], ['fl', 'think', { at: 3 }], ['pill', 'florence', 'Only 74% sure', 3.2, { at: 3.4 }]] } ] },
      { cam: cam('10,5', 86, -0.3, 0.5, { up: 3, to: { yaw: -0.15 } }), beats: [
        { who: 'dev', say: 'Test it again. The lights stay on!', do: [['time', 20.5, 1, 1.4], ['lights', 'all'], ['label', '10,5', 'Lights on: {lit} of {homes} homes ✓', 3, 'ok', { at: 1.5 }], ['sfx', 'pass', { at: 1.5 }], ['kid', 'dev', 'jump', { at: 1.6 }], ['fl', 'cheer', { at: 1.8 }]] },
        { who: 'narrator', say: 'Plan your power for the hardest night, and store some for later.' } ] },
      { cam: cam('10,5', 104, -0.05, 0.68, { to: { yaw: 0.1 } }), beats: [
        { who: 'narrator', say: 'And sure is not the same as right. So test the plan.', do: [['card']] } ] },
    ],
  },
  // ------------------------------------------------------------------ 6 · heart
  {
    id: 'heart-open', mission: 'heart', kind: 'open', n: 6, title: 'The middle', music: 'day',
    learn: { eco: 'Where the school goes decides how far every child walks.', ai: 'An AI reads words exactly ("the middle"), and it matters who it asks.', from: 'LAB-GUIDE.md section 5 (Level 6 and "Residents\' summary mistake"), section 9A "Level 6: A school for everyone"' },
    card: { ask: 'The middle of what?' },
    plans: { flawed: ['heart', ['middle']] },
    setup: { seed: 'heart', hour: 11, florence: '7,6+0,1', cast: { posy: '7,6+-3.8,2.2', dev: '7,6+3.8,2.2' }, otter: '2,6' },
    shots: [
      { cam: cam('8,5', 118, -0.35, 0.62, { to: { yaw: -0.2, dist: 108 } }), beats: [
        { who: 'narrator', say: 'One last job. Eco Town needs a new school.' } ] },
      { cam: cam('7,6+0,1', 38, -0.3, 0.26, { up: 3.2 }), beats: [
        { who: 'posy', say: 'Put the school right in the middle, Florence!', do: [['fl', 'look', 'posy'], ['kid', 'posy', 'jump']] },
        { who: 'florence', say: 'The middle. I will measure!', do: [['fl', 'look', null], ['fl', 'peer', '5,5', { at: 0.4 }]] } ] },
      { cam: cam('6,6', 70, 0.3, 0.6, { up: 2, to: { yaw: 0.15 } }), beats: [
        { who: 'florence', say: 'Here! The exact middle of the island. I am 81% sure!', do: [['fl', 'at', '6,7+-1,0'], ['fl', 'point', '5,5'], ['build', 'flawed', { dur: 3, stagger: 0.1 }], ['sfx', 'pop'], ['pill', 'florence', '81% sure!', 3, { at: 2.4 }]] },
        { wait: 1.8, do: [['fl', 'look', null], ['fl', 'cheer', { at: 0.6 }]] } ] },
      { cam: cam('8,6', 96, -0.5, 0.42, { up: 2, to: { yaw: -0.4 } }), beats: [
        { who: 'dev', say: 'That is a long way from my house.', do: [['kid', 'dev', 'at', '11,5+-2.6,3.4'], ['kid', 'posy', 'at', '11,5+-0.4,3.6'], ['kid', 'dev', 'face', '5,5'], ['kid', 'posy', 'face', '5,5']] },
        { wait: 0.6 } ] },
      { cam: cam('8,5', 112, -0.05, 0.72, { to: { yaw: 0.1 } }), beats: [
        { who: 'narrator', say: 'The middle of what?' },
        { who: 'narrator', say: 'And who should Florence ask?', do: [['card']] } ] },
    ],
  },
  {
    id: 'heart-close', mission: 'heart', kind: 'close', n: 6, title: 'Ask everyone', music: 'lab',
    learn: { eco: 'Walkable towns: school within a 15-minute walk of every home, and it matters who gets asked.', ai: 'Biased examples give biased answers: Florence only asked drivers. (Also: she read "the middle" too exactly.)', from: 'LAB-GUIDE.md section 5 (Level 6: walking-time lens; "Residents\' summary mistake": "Residents want more car parks", counted only drivers), section 9A Level 6, section 2 (learning outcome 6); DESIGN.md "The living town" (last paragraph)' },
    card: { eco: 'School a short walk from every home.', ai: 'If an AI only asks some people, its answer is unfair. Ask everyone.' },
    plans: { flawed: ['heart', ['middle']], clear: ['heart', ['walk_time'], { minutes: 15 }] },
    setup: { seed: 'heart', apply: 'flawed', hour: 12, florence: '7,6+0,1', cast: { posy: '7,6+-3.8,2.2', dev: '7,6+3.8,2.2' }, otter: '2,6' },
    shots: [
      { cam: cam('8,5', 108, 0.15, 0.78), beats: [
        { who: 'dev', say: 'The walking lens shows it. Eighteen minutes from my house. Too far!', do: [['lens', 'walk'], ['sfx', 'whoosh'], ['kid', 'dev', 'jump', { at: 2 }]] } ] },
      { cam: cam('7,6+0,1', 38, -0.3, 0.26, { up: 3.2 }), beats: [
        { who: 'florence', say: 'Oops. I read “the middle” too exactly.', do: [...OOPS, ['lens', null]] },
        { who: 'posy', say: 'School within a 15-minute walk of every home.', do: [['fl', 'look', 'posy'], ['kid', 'posy', 'jump', { at: 0.2 }]] } ] },
      { cam: cam('8,5', 108, 0.15, 0.78), beats: [
        { who: 'florence', say: 'Moved! Now every home is close enough. Checked!', do: [['reset'], ['cells', 'clear'], ['lens', 'walk'], ['sfx', 'pass', { at: 0.3 }], ['fl', 'look', null], ['fl', 'cheer', { at: 1.2 }]] } ] },
      { cam: cam('7,6+0,1', 36, -0.3, 0.25, { up: 3.2 }), beats: [
        { who: 'florence', say: 'One more thing. People want more car parks! I asked ten of them.', do: [['lens', null], ['fl', 'proud', { at: 1.4 }], ['pill', 'florence', '82% sure!', 2.6, { at: 1.6 }]] },
        { who: 'dev', say: 'Where did you ask?', do: [['fl', 'look', 'dev']] },
        { who: 'florence', say: 'At the car park.', do: [['fl', 'look', null], ['fl', 'think']] },
        { who: 'posy', say: 'So you only asked drivers! Ask at the school gate too.', do: [['fl', 'look', 'posy'], ['kid', 'posy', 'jump', { at: 0.1 }], ['fl', 'oops', { at: 1.2 }], ['sfx', 'flaw', { at: 1.2 }]] } ] },
      { cam: cam('6,6', 64, -0.4, 0.42, { up: 2, to: { yaw: -0.25 } }), beats: [
        { who: 'narrator', say: 'Keep school a short walk from every home.' } ] },
      { cam: cam('8,5', 112, -0.05, 0.7, { to: { yaw: 0.1 } }), beats: [
        { who: 'narrator', say: 'And an AI that only asks some people gives an unfair answer. So ask everyone.', do: [['card']] } ] },
    ],
  },
];

// what each shot shows, in words (the storyboard in docs/EPISODES.md is written from these)
const DESC = {
  'land-open': ['Wide, slow turn over the empty island. Florence waves from the river meadow.', 'Close on Florence and the two children on the meadow. Posy hops as she asks; Florence thinks.', 'High view of the meadow. Florence points; her pale plan appears on the flat land by the river, then the town pegs go in. Her “82% sure!” label pops up.', 'Low by the river. Pebble the otter pops up and shakes off water; Dev looks down at the wet grass.', 'High and wide over the pegged-out meadow. The question card comes up.'],
  'land-close': ['Wide on the pegged-out meadow as the sky turns to winter and the river rises over the town pegs.', 'From above, through the flood lens: flood land in blue, the town’s tiles in red, with the number under water.', 'Close on Florence (her “oops” face) and the children. Posy gives the clear instruction.', 'Wide: the water drops back, the pegs leave the meadow and the town land is staked out on the dry slope. Florence cheers under “Plan checked”.', 'Low over the wild meadow and the river. Pebble pops up and spins.', 'High and wide over the new town land. The two-things-to-remember card comes up.'],
  'move-open': ['Wide over the staked-out town land and the old school by the beach.', 'Close on Florence and the children beside the town land. Posy hops; Florence throws her arms out, then stands proud.', 'High view of the street to the old school. Florence points and a wide road and a car park are laid; cars start to drive. “77% sure!”. The children walk to the kerb.', 'Street level at the kerb: cars pass between the children and the school. Dev turns to Florence; she thinks.', 'High and wide over the road. The question card comes up.'],
  'move-close': ['Street level at the kerb at 8:45 am: the children wait while cars pass. A red label: too many cars to cross.', 'Close on Florence (her “oops” face) and the children. Posy gives the clear instruction.', 'High view: the road and car park go, and footpaths and cycle lanes are laid. Florence cheers under “Plan checked”.', 'Street level: the children walk along the new path to school; a cyclist passes.', 'High and wide over the paths. The two-things-to-remember card comes up.'],
  'homes-open': ['Wide over the empty town plots with their paths.', 'Close on Florence and the children by the plots. Posy hops; Florence stands proud.', 'The plots from above the path: grey concrete flats go up layer by layer. Florence points, then cheers. “85% sure!”.', 'Low behind the children, looking up at the tall grey flats. Dev turns to Florence.', 'High and wide over the concrete town. The question card comes up.'],
  'homes-close': ['A slow move round the concrete flats.', 'From above, through the carbon lens: the island turns to pale clay, the homes are striped red and a dark carbon cloud hangs over them with the number of tonnes.', 'Close on Florence (her “oops” face) and the children. Posy gives the clear instruction.', 'The flats go and timber and straw homes go up layer by layer. A green label gives the new carbon number. Florence cheers.', 'Low among the new homes as families stand at their doors.', 'High and wide over the new homes. The two-things-to-remember card comes up.'],
  'food-open': ['Wide over the town and the hedged fields behind it.', 'Close on Florence and the children by the fields. Posy hops; Florence throws her arms out, then stands proud.', 'High view of the fields: big ploughed fields roll over every field and every hedge. “79% sure!”.', 'Close on the children at the edge of a bare field. Dev looks for the hedge, then turns to Florence.', 'High and wide over the ploughed island. The question card comes up.'],
  'food-close': ['Wide over the big fields: no hedges, no bees.', 'From above, through the nature lens: lost habitat in red, kept habitat in green, and the list of animals with a cross by the bees and the deer.', 'Close on Florence (her “oops” face) and the children. Posy gives the clear instruction.', 'High view: the big fields go; an orchard, beehives and a mixed farm are built and the hedges are back. Florence cheers under “Plan checked”.', 'Low along a hedge by the orchard, with bees in the air.', 'High and wide over the farm and its hedges. The two-things-to-remember card comes up.'],
  'power-open': ['Wide over the timber and straw town on a sunny day.', 'Close on Florence and the children in front of the homes. Posy hops as she asks.', 'High view of the roofs: solar panels are fitted to every home. Florence points.', 'Close on Florence, very proud, under “90% sure!”. Dev hops and asks his question; she turns to him.', 'High and wide over the solar roofs in the sun. The question card comes up.'],
  'power-close': ['The town as day turns to a snowy, windless night. The windows light up, then go dark one by one; a red label counts the homes still lit.', 'Close on Florence (her “oops” face) and the children. Posy gives the clear instruction.', 'Wide, by day: a wind turbine and batteries are built beside the town. Florence thinks, under “Only 74% sure”.', 'The winter night again: every window stays lit. A green label counts them. Dev hops and Florence cheers.', 'High and wide over the lit town at night. The two-things-to-remember card comes up.'],
  'heart-open': ['Wide over the whole finished town.', 'Close on Florence and the children. Posy hops; Florence peers through her magnifying glass towards the middle of the island.', 'High view of the field beside the wetland, far from the homes: Florence points and the new school goes up there. “81% sure!”. She cheers.', 'From behind the children at Dev’s house, looking across the wetland to the far-away school.', 'High and wide: homes on one side, the school on the other. The question card comes up.'],
  'heart-close': ['From above, through the walking-time lens: homes coloured by their walk to school, the far ones red, with the minutes on labels.', 'Close on Florence (her “oops” face) and the children. Posy gives the clear instruction.', 'The walking-time lens again: the school has moved and every home is green.', 'Close on Florence and the children. She is proud of her survey (“82% sure!”); Dev asks where; she thinks; Posy spots the problem and Florence pulls her “oops” face again.', 'Low towards the new school.', 'High and wide over the whole town. The two-things-to-remember card comes up.'],
};
for (const ep of EPISODES) ep.shots.forEach((sh, i) => { sh.desc = DESC[ep.id][i]; });

export const episode = (id) => EPISODES.find((e) => e.id === id) || null;
export const episodeIds = () => EPISODES.map((e) => e.id);
// which episodes a player may watch from the menu: an opening once its mission has been reached (its build
// category is open, or the mission was opened or finished), a closing once the mission is finished
export function episodeOpen(id, G) {
  const ep = episode(id); if (!ep || !G) return false;
  if (G.eps?.[id] || G.labs?.[ep.mission]) return true;
  return ep.kind === 'open' && (G.ever || []).includes(ep.mission);
}

// what Kokoro should read for a line (the caption keeps the written form)
export const sayText = (s) => s.replace(/(\d+)%/g, '$1 percent').replace(/[“”]/g, '').replace(/’/g, "'").replace(/ ✓/g, '');
// a rough length for a line when it has not been recorded yet (about 2.7 words a second)
export const guessDur = (s) => Math.max(1.2, sayText(s).split(/\s+/).length / 2.7 + 0.4);

export const LEAD_IN = 1.3;   // the title card, before the first line
export const TAIL = 3.6;      // the closing card stays up after the last line
export const GAP = 0.32;      // a breath after each line

// Lay a script out in time. durs: { '<episode id>.<line number>': seconds } (recorded line lengths); a line
// without one gets a guess. Returns { duration, shots: [{ t0, t1, cam }], events: [{ t, a }] (sorted),
// cues: [{ key, t0, t1, who, text }] }.
export function schedule(ep, durs = {}) {
  let t = LEAD_IN, n = 0; const shots = [], events = [], cues = [];
  ep.shots.forEach((sh, si) => {
    const t0 = si === 0 ? 0 : t;
    for (const b of sh.beats) {
      let len;
      if (b.say) { const key = `${ep.id}.${n++}`; const d = durs[key] ?? guessDur(b.say); cues.push({ key, t0: t, t1: t + d, who: b.who, text: b.say }); events.push({ t, a: ['talk', b.who, d] }); len = d + (b.gap ?? GAP); }
      else len = b.wait || 0;
      for (const a of b.do || []) { const last = a[a.length - 1]; const at = last && typeof last === 'object' && !Array.isArray(last) && 'at' in last ? last.at : 0; events.push({ t: t + at, a }); }
      t += len;
    }
    shots.push({ t0, t1: t, cam: sh.cam });
  });
  const duration = t + TAIL; shots[shots.length - 1].t1 = duration;
  events.sort((x, y) => x.t - y.t);
  return { duration, shots, events, cues };
}
// WebVTT captions for an episode ("Florence: …" so a viewer without sound knows who speaks)
export function vtt(ep, durs = {}) {
  const f = (s) => { const ms = Math.round(s * 1000); const p = (x, w = 2) => String(x).padStart(w, '0'); return `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)}.${p(ms % 1000, 3)}`; };
  return 'WEBVTT\n\n' + schedule(ep, durs).cues.map((c, i) => `${i + 1}\n${f(c.t0)} --> ${f(c.t1 + 0.25)}\n${c.who === 'narrator' ? '' : `<v ${CAST[c.who].name}>${CAST[c.who].name}: `}${c.text}\n`).join('\n');
}
