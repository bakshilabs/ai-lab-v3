// The world reacts first: what the nearest family says right after a build, and the news when an animal comes
// back to the island or leaves it. Pure (tests/reactions.test.mjs). Lines are short, in a resident's voice, and
// only ever follow from what the player just did (the simulation's real change), never at random.
// reactionFor(tool, delta, junior, n): delta = simDelta(before, after) chips [{ key, v, good }]; n picks a variant.
const J = {
  timber: ['A wooden home, and it smells of pine!', 'We’re moving in!'], straw: ['So cosy in here!', 'Warm as toast!'], earth: ['Thick walls. Cool in summer!', 'We love our new home!'],
  reclaimed: ['Old bricks, new home!', 'A bit chilly, but it’s ours!'], cohousing: ['Hello, neighbours!', 'A garden to share!'], concrete: ['Brrr, these flats are cold.', 'So much concrete…'],
  greenroof: ['There are bees on our roof!', 'Our roof is a garden!'], solar: ['Sunshine power!', 'Our roof makes electricity!'], heatpump: ['Warm, with no gas!', 'Toasty toes!'],
  path: ['A safe way to walk!', 'I can walk to my friend’s!'], cycle: ['Race you on bikes!', 'Ding ding!'], tram: ['All aboard!', 'The tram is here!'], road: ['Phew, smelly cars.', 'Careful crossing!'], carpark: ['More cars? Oh dear.', 'It used to be green here.'], bridge: ['We can cross the river!', 'Hello, other side!'],
  mixed: ['Baa! Sheep and carrots!', 'Fresh food from the farm!'], orchard: ['Apples!', 'Blossom for the bees!'], allot: ['I grew a carrot!', 'Let’s dig together!'], hives: ['Listen to the bees buzzing!', 'Honey!'], hedge: ['A hedge for the hedgehogs!', 'Birds are nesting already!'],
  bigfield: ['Lots of wheat… but where did the flowers go?', 'One big field. No hedges.'], vertical: ['Lettuce growing on shelves!', 'A farm in a building!'],
  wind: ['Look, it’s turning!', 'Whoosh! Wind power!'], battery: ['Saving power for later!', 'Lights on tonight!'], raingarden: ['No more puddles!', 'The rain soaks away!'], reedbed: ['Frogs love the reeds!', 'Clean water!'], repair: ['I fixed my bike!', 'Don’t bin it, mend it!'], compost: ['Peelings into soil!', 'Worms at work!'],
  school: ['Our own school!', 'I can walk to school!'], market: ['Market day!', 'Fresh bread!'], park: ['Swings!', 'Race you to the park!'], greenbridge: ['A bridge for deer!', 'Animals can cross safely!'], hall: ['A party at the hall!', 'Club night!'], festival: ['A festival!', 'Music on the field!'],
  town: ['Room to build here!'], wild: ['This bit stays wild!', 'A promise to the animals!'], erase: ['Gone. What’s next?'],
};
const S = {
  concrete: ['Cold flats, heavy carbon.', 'This will cost us in winter.'], road: ['More traffic past the school.', 'Not looking forward to the fumes.'], carpark: ['More car trips, then.'], bigfield: ['High yield, no habitat.', 'The hedgerow is gone.'],
  wind: ['Power on a winter night.'], battery: ['Storage: useful if something feeds it.'], solar: ['Good on a bright day. Nothing at night.'], school: ['A school in walking distance.'], path: ['A safer route.'], cycle: ['I’ll cycle to work.'],
  wild: ['Protected. Good.'], hedge: ['A corridor for wildlife.'], repair: ['Less waste.'], market: ['Somewhere to meet.'],
};
const GOOD = { j: ['That’s better!', 'Nice one!', 'Our town is growing!'], s: ['That helps.', 'Good call.'] };
const BAD = { j: ['Hmm, that made something worse.', 'Oh no…'], s: ['That made something worse.', 'Not convinced.'] };
const GRUMBLE = new Set(['concrete', 'road', 'carpark', 'bigfield']);

export function reactionFor(tool, delta = [], junior = true, n = 0) {
  const set = (junior ? J : S)[tool] || (junior ? null : J[tool]);
  const worse = delta.some((c) => !c.good), better = delta.some((c) => c.good);
  // a build that should be good but made the town worse (a home on flood land, a field over a meadow): say so
  if (worse && !better && !GRUMBLE.has(tool)) { const a = BAD[junior ? 'j' : 's']; return { text: a[n % a.length], bad: true }; }
  if (set) return { text: set[n % set.length], bad: GRUMBLE.has(tool) };
  if (!delta.length) return null;
  const a = (better ? GOOD : BAD)[junior ? 'j' : 's']; return { text: a[n % a.length], bad: !better };
}

// animals that came back or left between two simulation results: [{ id, came }]
export const ANIMALS = {
  deer: { icon: '🦌', name: 'deer', home: 'wood', back: { j: 'The deer are back in the old wood!', s: 'Deer have returned to the old wood.' }, gone: { j: 'The deer have left. They need the wood and hedges.', s: 'The deer are gone: too little woodland and hedgerow.' } },
  bees: { icon: '🐝', name: 'bees', home: 'meadow', back: { j: 'The bees are buzzing again!', s: 'Pollinators are back.' }, gone: { j: 'The bees have gone. They need flowers and hedges.', s: 'Pollinators lost: not enough meadow, hedge or hives.' } },
  otters: { icon: '🦦', name: 'otters', home: 'wetland', back: { j: 'Otters are playing in the wetland!', s: 'Otters are back in the wetland.' }, gone: { j: 'The otters have left the wetland.', s: 'Otters lost: the wetland is too small now.' } },
  birds: { icon: '🐦', name: 'birds', home: 'wood', back: { j: 'Listen: the birds are singing again!', s: 'Birdsong has returned.' }, gone: { j: 'The birds have flown away.', s: 'Birds lost: too few trees and hedges.' } },
  frogs: { icon: '🐸', name: 'frogs', home: 'wetland', back: { j: 'Ribbit! The frogs are back!', s: 'Frogs are back.' }, gone: { j: 'The frogs have gone quiet.', s: 'Frogs lost: no wetland or reed bed left for them.' } },
};
export function speciesNews(before, after) {
  const out = []; for (const id of Object.keys(ANIMALS)) { const a = !!before?.species?.[id], b = !!after?.species?.[id]; if (a !== b) out.push({ id, came: b }); }
  return out;
}
