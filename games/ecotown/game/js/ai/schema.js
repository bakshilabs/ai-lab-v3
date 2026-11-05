// The parts of schema.json the game needs at runtime (kept as a module so it loads without fetch).
export default {
  hints: {
    land: ['dry', 'sunny', 'flat', 'keep the meadow', 'near the river'],
    move: ['safe walking', 'cycling', 'cars at the edge', 'a tram'],
    homes: ['warm', 'low-carbon', 'timber and straw', 'green roofs'],
    food: ['enough food', 'keep the hedges', 'bees', 'allotments'],
    power: ['winter night', 'store energy', 'wind', 'batteries'],
    heart: ['10-minute walk', 'next to the homes', 'market', 'green bridges'],
  },
};
