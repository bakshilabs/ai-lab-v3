// How things are built, system by system and layer by layer. Given the finished voxel model of a tile,
// returns an ordered list of construction stages; world.js animates each stage (a sweep up or across)
// and the films caption them. Temporary stages (trench, gravel, frame, pipes) are hidden once covered.
import { Vox } from '../engine/voxel.js';
import { ITEMS } from './catalog.js';

const ROADS = new Set(['road', 'carpark', 'path', 'cycle', 'tram']);
const FIELDS = new Set(['bigfield', 'mixed', 'allot']);
const HOMES = new Set(['timber', 'straw', 'earth', 'reclaimed', 'cohousing', 'concrete']);

// what each home is made of: frame colour and what the walls are (for captions)
const MATERIAL = {
  timber: { frame: '#c08a56', j: 'Wooden frame', s: 'Timber frame (stores carbon)', walls: { j: 'Wooden walls with wool insulation', s: 'Timber cladding over wood-fibre insulation' } },
  straw: { frame: '#c08a56', j: 'Wooden frame', s: 'Timber frame', walls: { j: 'Straw bales stacked into the walls, then plaster', s: 'Straw-bale infill, lime render: very low carbon, very warm' } },
  earth: { frame: '#a7774c', j: 'Wooden frame', s: 'Timber frame', walls: { j: 'Earth rammed into moulds, layer by layer', s: 'Rammed-earth walls in compacted layers (thermal mass)' } },
  reclaimed: { frame: '#c08a56', j: 'Wooden frame', s: 'Timber frame', walls: { j: 'Old bricks cleaned and reused', s: 'Reclaimed brick: the carbon was spent long ago' } },
  cohousing: { frame: '#c08a56', j: 'Wooden frame', s: 'Timber frame', walls: { j: 'Walls around a shared garden', s: 'Insulated timber walls around a shared courtyard' } },
  concrete: { frame: '#8a8f94', j: 'Steel and concrete frame', s: 'Steel rebar + concrete frame (high embodied carbon)', walls: { j: 'Concrete poured into moulds', s: 'Cast concrete panels: strong but carbon-heavy' } },
};

const L = (j, s = j) => ({ j, s });

// Build the stage list. vox = { G, B, F } of the finished tile; cell = { item, mark, mods }; rec from the builder.
export function planStages(cell, vox, rec) {
  const id = cell.item || cell.mark; const st = [];
  const add = (label, parts, { dir = 'up', w = 1, temp = false } = {}) => { if (parts.G.size + parts.B.size + parts.F.size) st.push({ label, parts, dir, w, temp }); };
  const P = () => ({ G: new Vox(), B: new Vox(), F: new Vox() });
  const copy = (src, dst, f = () => true) => { for (const [x, y, z, c] of src.m.values()) if (f(x, y, z, c)) dst.set(x, y, z, c); };

  if (!cell.item) { const p = P(); copy(vox.G, p.G); copy(vox.B, p.B); add(L(id === 'town' ? 'Pegging out the town' : 'Marking land to keep wild'), p, { dir: 'x' }); return st; }

  if (ROADS.has(id)) {
    const dig = P(), grav = P(), surf = P(), fin = P();
    for (const [x, , z] of vox.G.m.values()) { dig.G.set(x, 0, z, (x + z) % 3 ? '#7a4f2d' : '#6a4226'); grav.G.set(x, 0, z, (x + z) % 2 ? '#b9b4a8' : '#a8a397'); }
    copy(vox.G, surf.G, (x, y, z, c) => c.getHexString() !== 'f2f2ea' && c.getHexString() !== 'ffffff'); copy(vox.G, fin.G, (x, y, z, c) => c.getHexString() === 'f2f2ea' || c.getHexString() === 'ffffff'); copy(vox.B, fin.B);
    add(L('Digging the trench', 'Excavation: soil removed down to firm ground'), dig, { dir: 'x', temp: true });
    add(L('Gravel base, rolled flat', 'Compacted gravel sub-base so it drains and does not sink'), grav, { dir: 'x', temp: true });
    add(L(id === 'cycle' ? 'Smooth red surface for bikes' : id === 'path' ? 'Paving the footpath' : 'Laying the surface', id === 'road' || id === 'carpark' ? 'Asphalt surface (oil-based, high carbon)' : 'Surface layer'), surf, { dir: 'x' });
    add(L('Lines, lamps and crossings', 'Markings, lighting, safe crossings'), fin, { dir: 'x', w: 0.6 });
    return st;
  }
  if (FIELDS.has(id)) {
    const plough = P(), sow = P(), crop = P(), fin = P();
    for (const [x, , z] of vox.G.m.values()) { plough.G.set(x, 0, z, z % 2 ? '#7a4f2d' : '#8f6038'); sow.G.set(x, 0, z, (x * 7 + z * 3) % 5 === 0 ? '#7ccf55' : z % 2 ? '#7a4f2d' : '#8f6038'); }
    copy(vox.G, crop.G); copy(vox.B, fin.B);
    add(L('Ploughing the soil', 'Ploughing: turning the soil (releases some carbon)'), plough, { dir: 'x', temp: true });
    add(L('Sowing seeds', 'Sowing in rows'), sow, { dir: 'x', temp: true });
    add(L('Crops growing', 'Crops grow over the season'), crop, { dir: 'x', w: 1.3 });
    add(L('Fences and sheds', 'Field boundaries and stores'), fin, { w: 0.6 });
    return st;
  }
  if (id === 'wind') {
    const base = P(), tower = P(), top = P();
    for (let x = 1; x <= 5; x++) for (let z = 1; z <= 5; z++) base.B.set(x, 0, z, '#a3a8ac');
    const ys = [...vox.B.m.values()].map((v) => v[1]); const maxY = Math.max(...ys);
    copy(vox.B, tower.B, (x, y) => y < maxY); copy(vox.B, top.B, (x, y) => y >= maxY);
    add(L('Concrete foundation', 'Reinforced concrete foundation to hold the tower in storms'), base, { w: 0.8 });
    add(L('Tower sections lifted on', 'Steel tower sections bolted together'), tower, { w: 1.6 });
    add(L('Nacelle: the generator', 'Nacelle with gearbox and generator'), top, { w: 0.5 });
    st.push({ label: L('Blades fitted', 'Blades fitted to the hub'), parts: P(), dir: 'up', w: 0.9, rotor: true });
    st.push({ label: L('Cable to the town', 'Underground cable to the batteries and homes'), parts: P(), dir: 'up', w: 0.9, cable: true });
    return st;
  }
  const shells = rec.shells || [];
  if (HOMES.has(id) || shells.length) {
    const M = MATERIAL[id] || { frame: '#c08a56', j: 'Frame', s: 'Structural frame', walls: L('Walls') };
    const ground = P(), found = P(), frame = P(), pipes = P(), walls = P(), open = P(), rafters = P(), roof = P(), sys = P();
    copy(vox.G, ground.G); copy(vox.B, ground.B);
    const inShell = (x, z, s) => x >= s.x0 && x < s.x0 + s.w && z >= s.z0 && z < s.z0 + s.d;
    const roofY = (x, z) => { for (const s of shells) if (inShell(x, z, s)) return s.h; return 99; };
    for (const s of shells) {
      // foundation slab slightly larger than the walls
      for (let x = s.x0 - 1; x <= s.x0 + s.w; x++) for (let z = s.z0 - 1; z <= s.z0 + s.d; z++) found.F.set(x, 0, z, (x + z) % 2 ? '#c4c8cc' : '#b4b9bd');
      // frame: posts on the wall lines (corners + every 2), with a ring beam on top
      const X1 = s.x0 + s.w - 1, Z1 = s.z0 + s.d - 1;
      for (let x = s.x0; x <= X1; x++) for (let z = s.z0; z <= Z1; z++) {
        const onWall = x === s.x0 || x === X1 || z === s.z0 || z === Z1; if (!onWall) continue;
        const post = (x === s.x0 || x === X1) && (z === s.z0 || z === Z1) || ((x - s.x0) % 3 === 0 && (z === s.z0 || z === Z1)) || ((z - s.z0) % 3 === 0 && (x === s.x0 || x === X1));
        if (post) for (let y = 1; y < s.h; y++) frame.F.set(x, y, z, M.frame);
        frame.F.set(x, s.h - 1, z, M.frame);
      }
      // services: a blue water pipe loop along the floor and up to the bathroom; yellow cables up every wall
      for (let x = s.x0 + 1; x < X1; x++) { pipes.F.set(x, 1, s.z0 + 1, '#2f6fd8'); pipes.F.set(x, 1, Z1 - 1, '#2f6fd8'); }
      for (let z = s.z0 + 1; z < Z1; z++) { pipes.F.set(s.x0 + 1, 1, z, '#2f6fd8'); pipes.F.set(X1 - 1, s.h - 3, z, '#ffc83d'); }
      for (let y = 1; y < s.h - 1; y++) { pipes.F.set(s.x0 + 1, y, s.z0 + 1, '#2f6fd8'); pipes.F.set(X1 - 1, y, Z1 - 1, '#ffc83d'); pipes.F.set(s.x0 + 1, y, Z1 - 1, '#ffc83d'); }
      for (let x = s.x0 + 1; x < X1; x++) pipes.F.set(x, s.h - 2, Z1 - 1, '#ffc83d');
      pipes.F.set(X1 - 1, 1, s.z0 + 1, '#e8eef2'); pipes.F.set(X1 - 1, 2, s.z0 + 1, '#e8eef2');   // boiler / heat-pump unit
    }
    const isOpen = (x, z, c) => shells.some((s) => inShell(x, z, s) && s.open.includes('#' + c.getHexString()));
    for (const [x, y, z, c] of vox.F.m.values()) {
      const ry = roofY(x, z);
      if (y >= ry) { roof.F.set(x, y, z, c); if (id !== 'concrete' && x % 2 === 0) rafters.F.set(x, y, z, '#a8743f'); }
      else if (isOpen(x, z, c)) open.F.set(x, y, z, c);
      else if (ry < 99) walls.F.set(x, y, z, c);
      else sys.F.set(x, y, z, c);
    }
    // mods (solar, green roof, heat pump) and chimneys are the last "systems" stage
    const hasSolar = cell.mods?.includes('solar'), hasHP = cell.mods?.includes('heatpump');
    if (!HOMES.has(id)) {
      // civic buildings (school, hall, repair café) have their own steps, ending with the opening
      add(L('Clearing the site', 'Site cleared and levelled'), ground, { dir: 'x', w: 0.5 });
      add(L('Foundations', 'Foundations: a level base that spreads the weight'), found, { dir: 'x', w: 0.7, temp: true });
      add(L('Strong wooden frame', 'Glulam timber frame'), frame, { w: 1, temp: true });
      add(L('Water pipes and wires', 'Services: water (blue) and electrics (yellow)'), pipes, { w: 0.8, temp: true, xray: true });
      add(L('Walls', 'Insulated walls'), walls, { w: 1.4 });
      add(L('Big windows and doors', 'Glazing and entrances'), open, { w: 0.7 });
      add(L('Roof', 'Roof'), roof, { w: 1 });
      add(L(id === 'school' ? 'Bell tower and playground' : 'Signs and benches', id === 'school' ? 'Bell tower and playground' : 'Signage and seating'), sys, { w: 0.7 });
      if (id === 'school' || id === 'hall') st.push({ label: L('Ribbon cut: it’s open!', 'Opening ceremony'), parts: P(), dir: 'up', w: 0.6, ribbon: true });
      return st;
    }
    add(L('Clearing the site', 'Site cleared and levelled'), ground, { dir: 'x', w: 0.5 });
    add(L('Foundations', 'Foundations: a level base that spreads the weight'), found, { dir: 'x', w: 0.7, temp: true });
    add(L(M.j, M.s), frame, { w: 1, temp: true });
    add(L('Water pipes and wires', 'Services: water pipes (blue) and electrical wiring (yellow)'), pipes, { w: 0.9, temp: true, xray: true });
    add(M.walls, walls, { w: 1.6 });
    add(L('Windows and doors', 'Double-glazed windows and doors'), open, { w: 0.7 });
    if (rafters.F.size) add(L('Roof rafters', 'Roof rafters: the wooden skeleton of the roof'), rafters, { w: 0.8, temp: true });
    add(L(id === 'concrete' ? 'Concrete roof' : id === 'straw' ? 'Thatched roof' : 'Roof tiles', id === 'concrete' ? 'Flat concrete roof' : 'Roof covering laid from the eaves up'), roof, { w: 1.1 });
    add(L(hasSolar ? 'Solar panels on the roof' : hasHP ? 'Heat pump connected' : 'Finishing touches', hasSolar ? 'Solar panels wired to the house' : 'Final fittings'), sys, { w: 0.6 });
    return st;
  }
  // generic: groundwork, then the structure bottom-up, then details
  const ground = P(), body = P();
  copy(vox.G, ground.G); copy(vox.F, body.F); copy(vox.B, body.B);
  const it = ITEMS[id] || {};
  add(L('Preparing the ground'), ground, { dir: 'x', w: 0.6 });
  add(L(id === 'orchard' || id === 'park' ? 'Planting young trees' : id === 'battery' ? 'Installing the battery units' : it.label ? `Building the ${it.label.toLowerCase()}` : 'Building'), body, { w: 1.4 });
  return st;
}
