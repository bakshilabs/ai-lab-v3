// Florence's practice island for the AI Lab: the earlier levels built from their clear instructions,
// so each lab mission starts from the same, tested town (tests/playtest.test.mjs and sim.test.mjs use the
// same chain). The player's own town is never changed by a lab unless they choose to use the plan.
import { plan, applyPlacements } from '../sim/planner.js';
import { LEVEL_ORDER } from './levels.js';

export const CLEAR = { land: ['dry', 'sunny', 'keep_meadow'], move: ['safe_walking', 'cycling', 'cars_at_edge'], homes: ['warm', 'low_carbon', 'natural_materials'], food: ['enough_food', 'keep_hedges', 'bees'], power: ['enough_power', 'winter', 'night', 'storage', 'solar', 'save_water', 'compost'], heart: ['walk_time', 'market', 'nature_links'] };

export function seedTo(terrain, level) {
  let cells = new Map();
  for (const id of LEVEL_ORDER.slice(0, LEVEL_ORDER.indexOf(level))) {
    cells = applyPlacements(cells, plan(id, CLEAR[id], { terrain, cells, numbers: { minutes: 10 } }).placements);
    for (const c of cells.values()) c.locked = true;
  }
  return cells;
}
