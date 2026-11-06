// Everything that can be placed on a tile, with the honest numbers the simulation uses.
// kind: 'mark' (land use in Level 1), 'build' (occupies the tile), 'mod' (added to a home tile).
// on: zones (or 'town') where it may be placed. Units are game units, explained in senior mode.

export const ITEMS = {
  // ---- Level 1: read the land
  town:  { level: 'land', kind: 'mark', label: 'Town land', icon: '🏘', color: '#f2c14e', on: ['meadow', 'field', 'slope', 'coast', 'wood', 'wetland'] },
  wild:  { level: 'land', kind: 'mark', label: 'Keep wild', icon: '🌼', color: '#ff7eb6', on: ['meadow', 'field', 'slope', 'coast', 'wood', 'wetland'] },

  // ---- Level 2: getting around (cost in credits for the senior budget)
  road:    { level: 'move', kind: 'build', label: 'Car road', icon: '🚗', color: '#5b6168', on: ['town', 'field', 'slope', 'meadow', 'coast'], cost: 3, carbon: 6, health: -1, walk: 2, car: true },
  carpark: { level: 'move', kind: 'build', label: 'Car park', icon: '🅿', color: '#7a8088', on: ['town', 'field', 'slope', 'meadow', 'coast'], cost: 2, carbon: 5, health: -1, walk: 2, car: true },
  path:    { level: 'move', kind: 'build', label: 'Footpath & crossing', icon: '🚶', color: '#d9c9a0', on: ['town', 'field', 'slope', 'meadow', 'coast', 'wetland'], cost: 1, carbon: 0.2, health: 1, walk: 1 },
  cycle:   { level: 'move', kind: 'build', label: 'Cycle lane', icon: '🚲', color: '#c8553d', on: ['town', 'field', 'slope', 'meadow', 'coast'], cost: 1, carbon: 0.5, health: 1.5, walk: 1 },
  tram:    { level: 'move', kind: 'build', label: 'Tram stop', icon: '🚋', color: '#2f6fd8', on: ['town', 'field', 'slope', 'coast'], cost: 4, carbon: 2, health: 0.5, community: 1, walk: 1 },
  bridge:  { level: 'move', kind: 'build', label: 'Bridge', icon: '🌉', color: '#9a6a42', on: ['river'], cost: 2, carbon: 1, walk: 1 },

  // ---- Level 3: homes (families per tile, embodied carbon, indoor °C with the heating off in winter)
  timber:    { level: 'homes', kind: 'build', label: 'Timber terrace', icon: '🪵', color: '#b07a4a', on: ['town'], cost: 4, families: 4, embodied: 6, temp: 21, home: true },
  straw:     { level: 'homes', kind: 'build', label: 'Straw-bale cottages', icon: '🌾', color: '#e8cf8a', on: ['town'], cost: 3, families: 3, embodied: 4, temp: 22, home: true },
  earth:     { level: 'homes', kind: 'build', label: 'Rammed-earth homes', icon: '🧱', color: '#c98a5a', on: ['town'], cost: 4, families: 3, embodied: 7, temp: 20, home: true },
  reclaimed: { level: 'homes', kind: 'build', label: 'Reclaimed-brick terrace', icon: '♻', color: '#b5523b', on: ['town'], cost: 3, families: 4, embodied: 8, temp: 18, home: true },
  cohousing: { level: 'homes', kind: 'build', label: 'Cohousing court', icon: '🏡', color: '#e6a15a', on: ['town'], cost: 5, families: 5, embodied: 9, temp: 21, community: 2, home: true },
  concrete:  { level: 'homes', kind: 'build', label: 'Concrete flats', icon: '🏢', color: '#9aa0a5', on: ['town'], cost: 5, families: 6, embodied: 30, temp: 14, home: true },
  greenroof: { level: 'homes', kind: 'mod', label: 'Green roof', icon: '🌿', color: '#4caf50', on: ['home'], cost: 1, embodied: -1, nature: 0.4 },

  // ---- Level 4: food (food units; need = families / 3)
  bigfield: { level: 'food', kind: 'build', label: 'Big field', icon: '🌾', color: '#e3c25a', on: ['field', 'meadow', 'slope'], cost: 2, food: 8, carbon: 3, ploughs: true },
  mixed:    { level: 'food', kind: 'build', label: 'Mixed farm', icon: '🐑', color: '#b9d77a', on: ['field', 'meadow', 'slope'], cost: 3, food: 5, carbon: 1 },
  orchard:  { level: 'food', kind: 'build', label: 'Orchard', icon: '🍎', color: '#5bbd5a', on: ['field', 'meadow', 'slope', 'town'], cost: 3, food: 3, nature: 2, pollinated: true },
  allot:    { level: 'food', kind: 'build', label: 'Allotments', icon: '🥕', color: '#8bc34a', on: ['town', 'field', 'slope'], cost: 1, food: 2, community: 2, health: 1, pollinated: true },
  vertical: { level: 'food', kind: 'build', label: 'Vertical farm', icon: '🏬', color: '#7fd1c7', on: ['town', 'field', 'slope'], cost: 6, food: 5, carbon: 4, demand: 2 },
  hives:    { level: 'food', kind: 'build', label: 'Beehives', icon: '🐝', color: '#ffd23f', on: ['field', 'meadow', 'slope', 'town'], cost: 1, nature: 1, bees: true },
  hedge:    { level: 'food', kind: 'build', label: 'Plant a hedge', icon: '🌳', color: '#2f8a43', on: ['field', 'meadow', 'slope', 'town'], cost: 1, nature: 1, plantsHedge: true },

  // ---- Level 5: water, power and waste (power units on an average day / on a still winter night)
  solar:      { level: 'power', kind: 'mod', label: 'Solar roof', icon: '☀', color: '#2b3f73', on: ['home'], cost: 2, avg: 2, winter: 0, carbon: -1 },
  heatpump:   { level: 'power', kind: 'mod', label: 'Heat pump', icon: '♨', color: '#e8eef2', on: ['home'], cost: 2, demand: 0.5 },
  wind:       { level: 'power', kind: 'build', label: 'Wind turbine', icon: '🌀', color: '#f4f6f8', on: ['field', 'coast', 'slope'], cost: 4, avg: 4, winter: 1, carbon: -2 },
  battery:    { level: 'power', kind: 'build', label: 'Battery store', icon: '🔋', color: '#8e5cd9', on: ['town', 'field', 'slope'], cost: 3, store: 4 },
  raingarden: { level: 'power', kind: 'build', label: 'Rain garden', icon: '💧', color: '#4fb3ea', on: ['town', 'slope', 'field'], cost: 1, health: 0.5, nature: 0.5, drains: true },
  reedbed:    { level: 'power', kind: 'build', label: 'Reed bed', icon: '🪴', color: '#6fbf8a', on: ['meadow', 'wetland'], cost: 1, nature: 1, drains: true },
  repair:     { level: 'power', kind: 'build', label: 'Repair café', icon: '🔧', color: '#f28c38', on: ['town'], cost: 2, community: 2, carbon: -2 },
  compost:    { level: 'power', kind: 'build', label: 'Compost hub', icon: '🍂', color: '#8a5c38', on: ['town', 'field'], cost: 1, carbon: -1, food: 1 },

  // ---- Level 6: complete the town
  school:      { level: 'heart', kind: 'build', label: 'Town school', icon: '🏫', color: '#ffd23f', on: ['town', 'field', 'slope', 'wetland', 'meadow'], cost: 6, community: 2, demand: 1, unique: true },
  market:      { level: 'heart', kind: 'build', label: 'Market square', icon: '🧺', color: '#ff8a5c', on: ['town'], cost: 3, community: 3 },
  park:        { level: 'heart', kind: 'build', label: 'Park', icon: '🌳', color: '#4caf50', on: ['town', 'field', 'slope', 'meadow'], cost: 2, nature: 1, health: 1.5, community: 1 },
  greenbridge: { level: 'heart', kind: 'build', label: 'Green bridge', icon: '🌉', color: '#3f9d4a', on: ['field', 'slope', 'wetland', 'meadow', 'river'], cost: 3, nature: 2, walk: 1, link: true },
  hall:        { level: 'heart', kind: 'build', label: 'Community hall', icon: '🏛', color: '#c0563a', on: ['town'], cost: 3, community: 3 },
  festival:    { level: 'heart', kind: 'build', label: 'Festival field', icon: '🎪', color: '#ff7eb6', on: ['field', 'slope', 'town', 'coast'], cost: 1, community: 2, health: 0.5 },
};

export const LEVEL_ITEMS = {
  land: ['town', 'wild'],
  move: ['path', 'cycle', 'tram', 'road', 'carpark', 'bridge'],
  homes: ['timber', 'straw', 'earth', 'reclaimed', 'cohousing', 'concrete', 'greenroof'],
  food: ['mixed', 'orchard', 'allot', 'hives', 'hedge', 'bigfield', 'vertical'],
  power: ['wind', 'battery', 'solar', 'heatpump', 'raingarden', 'reedbed', 'repair', 'compost'],
  heart: ['school', 'market', 'park', 'greenbridge', 'hall', 'festival'],
};

export const TARGETS = {
  families: 40,        // homes petal "enough"
  homesCarbon: 70,     // embodied carbon limit for Level 3's carbon lens
  carbonCeiling: 160,  // whole-town carbon ceiling (Carbon petal)
  walkMinutes: 15,     // daily needs within a 15-minute walk
  schoolWalk: 10,      // Level 6 clear-card target
  townTiles: 18,       // land the town needs in Level 1
};

// Can `id` be placed on tile `t` (terrain tile + state)? Returns null if allowed, else a short reason.
export function placeReason(id, t, st) {
  const it = ITEMS[id]; if (!it) return 'Unknown item';
  if (t.fixed) return 'Something is already here';
  if (it.kind === 'mark') return t.zone === 'river' ? 'That is the river' : null;
  if (it.kind === 'mod') { const b = st.item && ITEMS[st.item]; return b && b.home ? (st.mods && st.mods.includes(id) ? 'Already added' : null) : 'Add this to a home'; }
  if (st.item && st.locked) return 'Built in an earlier level';
  const ok = it.on.some((z) => (z === 'town' ? st.mark === 'town' && t.zone !== 'river' : z === t.zone && st.mark !== 'town'));
  if (!ok) return it.on.includes('town') && it.on.length === 1 ? 'Build this on town land' : t.zone === 'river' ? 'Only a bridge can go on the river' : `Not on ${t.zone === 'wetland' ? 'the wetland' : t.zone === 'wood' ? 'the wood' : 'this land'}`;
  if (st.mark === 'wild' && it.kind === 'build') return 'You promised to keep this wild';
  return null;
}
