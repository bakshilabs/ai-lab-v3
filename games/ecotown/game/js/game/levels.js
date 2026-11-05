// Level rules: which checks reveal the flaw, the honest pass test, the habit behind the vague
// instruction and what must be built. Text lives in content.js.
import { LEVEL_ITEMS, TARGETS } from '../world/catalog.js';

export const LEVEL_ORDER = ['land', 'move', 'homes', 'food', 'power', 'heart'];
export const ALL_CHECKS = ['flood', 'nature', 'street', 'carbon', 'inside', 'winter', 'walk'];

export const LEVELS = {
  land: {
    n: 1, newLens: 'flood', habit: 'one_word', palette: LEVEL_ITEMS.land,
    juniorChecks: ['flood', 'street', 'carbon'],
    // which checks expose which problem
    reveal(sim) {
      const out = {};
      if (sim.townFlooded >= 2) out.flood = { n: sim.townFlooded };
      if (sim.townOnWood >= 2) out.nature = { n: sim.townOnWood };
      return out;
    },
    pass: (sim) => sim.townTiles >= TARGETS.townTiles - 2 && sim.townFlooded === 0 && sim.townOnWood <= 1 && sim.townOnWetland === 0,
    needs: (sim) => [{ label: `Town land: ${sim.townTiles}/${TARGETS.townTiles} tiles`, ok: sim.townTiles >= TARGETS.townTiles - 2 }, { label: 'No town land floods', ok: sim.townFlooded === 0 }],
  },
  move: {
    n: 2, newLens: 'street', habit: 'typical', palette: LEVEL_ITEMS.move,
    juniorChecks: ['street', 'flood', 'nature'],
    reveal(sim) { return sim.unsafeCrossings > 0 ? { street: { n: sim.unsafeCrossings } } : {}; },
    pass: (sim, ctx) => sim.unsafeCrossings === 0 && ctx.moveTiles >= 3,
    needs: (sim, ctx) => [{ label: 'Route from homes to school', ok: ctx.moveTiles >= 3 }, { label: 'Safe crossings at 8:45 am', ok: sim.unsafeCrossings === 0 }],
  },
  homes: {
    n: 3, newLens: 'carbon', habit: 'one_word', palette: LEVEL_ITEMS.homes,
    juniorChecks: ['carbon', 'inside', 'flood'],
    reveal(sim) { const o = {}; if (sim.homesCarbon > TARGETS.homesCarbon) o.carbon = { n: (sim.homesCarbon / TARGETS.homesCarbon).toFixed(1) }; if (sim.avgTemp < 18) o.inside = { n: sim.avgTemp }; return o; },
    pass: (sim) => sim.homesCarbon <= TARGETS.homesCarbon && sim.families >= 36 && sim.avgTemp >= 18,
    needs: (sim) => [{ label: `Families: ${sim.families}/${TARGETS.families}`, ok: sim.families >= 36 }, { label: `Carbon: ${sim.homesCarbon}/${TARGETS.homesCarbon} t`, ok: sim.homesCarbon <= TARGETS.homesCarbon }, { label: 'Warm homes', ok: sim.avgTemp >= 18 }],
  },
  food: {
    n: 4, newLens: 'nature', habit: 'one_word', palette: LEVEL_ITEMS.food,
    juniorChecks: ['nature', 'carbon', 'street'],
    reveal(sim, base) { return !sim.species.bees || !sim.species.deer ? { nature: { n: Math.max(0, (base?.hedges ?? 16) - sim.hedges) } } : {}; },
    pass: (sim) => sim.food >= sim.foodNeed && sim.species.bees && sim.species.deer,
    needs: (sim) => [{ label: `Food: ${sim.food}/${sim.foodNeed}`, ok: sim.food >= sim.foodNeed }, { label: 'Bees stay', ok: sim.species.bees }, { label: 'Deer stay', ok: sim.species.deer }],
  },
  power: {
    n: 5, newLens: 'winter', habit: 'typical', palette: LEVEL_ITEMS.power,
    juniorChecks: ['winter', 'flood', 'inside'],
    reveal(sim) { return !sim.power.winterOK ? { winter: { n: `${Math.round(sim.power.winterSupply)}/${Math.round(sim.power.demand)}` } } : {}; },
    pass: (sim) => sim.power.winterOK,
    needs: (sim) => [{ label: `Winter night: ${Math.round(sim.power.winterSupply)}/${Math.round(sim.power.demand)} power`, ok: sim.power.winterOK }],
  },
  heart: {
    n: 6, newLens: 'walk', habit: 'literal', palette: LEVEL_ITEMS.heart,
    juniorChecks: ['walk', 'flood', 'carbon'],
    reveal(sim) { return sim.walkMax > TARGETS.walkMinutes ? { walk: { n: sim.walkMax } } : {}; },
    pass: (sim, ctx) => ctx.hasSchool && sim.walkMax <= TARGETS.walkMinutes,
    needs: (sim, ctx) => [{ label: 'A new school', ok: ctx.hasSchool }, { label: `Longest walk to school: ${sim.walkMax} min`, ok: sim.walkMax <= TARGETS.walkMinutes }],
  },
};
