// Four original chiptune loops for Eco Town, written for this game (bright and bouncy in the style of 8-bit
// console music, but every melody, bass line and rhythm is new: no phrase is taken from any existing game).
// Format: 16 steps per bar, sections of 4 bars (64 steps). Pitched events are [step, midi, lengthInSteps];
// drum events are [step, kind] with kind 'k' kick, 's' snare, 'h' hat. Chords drive the generated parts
// (offbeat arpeggios and the walking triangle bass); the lead is hand-written.

// chord tones as MIDI (root in octave 2 for the bass, upper tones for the arps)
const CH = {
  F: [41, 65, 69, 72], Dm: [38, 62, 65, 69], Bb: [34, 58, 62, 65], C: [36, 60, 64, 67], Am: [33, 57, 60, 64], Gm: [43, 62, 67, 70],
  Dm7: [38, 62, 65, 72], G: [43, 59, 62, 67], Am7: [33, 60, 64, 67], E: [40, 59, 64, 68], Fmaj: [41, 60, 65, 69],
};
// offbeat arpeggio: chord tones on the 'and' of each beat (steps 2, 6, 10, 14), short notes
const arpOff = (chords) => chords.flatMap((c, b) => [2, 6, 10, 14].map((s, i) => [b * 16 + s, CH[c][1 + (i % 3)], 2]));
// rolling arpeggio for slow loops: up the chord in eighth notes
const arpRoll = (chords) => chords.flatMap((c, b) => [0, 2, 4, 6, 8, 10, 12, 14].map((s, i) => [b * 16 + s, CH[c][1 + (i % 3)] + (i > 3 ? 12 : 0), 2]));
// walking bass: root, fifth, octave, then a step toward the next chord's root
const walk = (chords) => chords.flatMap((c, b) => { const r = CH[c][0] + 12, nx = CH[chords[(b + 1) % chords.length]][0] + 12; return [[b * 16, r, 3], [b * 16 + 4, r + 7, 3], [b * 16 + 8, r + 12, 3], [b * 16 + 12, nx + (nx > r ? -1 : 1), 3]]; });
const halfBass = (chords) => chords.flatMap((c, b) => [[b * 16, CH[c][0] + 12, 7], [b * 16 + 8, CH[c][0] + 19, 7]]);
const beat = (bars, { kick = [0, 8], snare = [4, 12], hats = [2, 6, 10, 14] } = {}) => { const ev = []; for (let b = 0; b < bars; b++) { for (const s of kick) ev.push([b * 16 + s, 'k']); for (const s of snare) ev.push([b * 16 + s, 's']); for (const s of hats) ev.push([b * 16 + s, 'h']); } return ev; };

export const SONGS = {
  // free building by day: F major, sparse syncopated lead, offbeat arps, walking bass, light drums
  day: {
    bpm: 132, duty: [0.25, 0.125], vol: { lead: 0.13, harm: 0.06, bass: 0.16, drum: 0.05 },
    sections: {
      A: { chords: ['F', 'Dm', 'Bb', 'C'], lead: [[0, 72, 2], [3, 74, 1], [4, 77, 3], [8, 76, 2], [10, 74, 2], [18, 74, 2], [20, 72, 2], [22, 69, 4], [32, 70, 2], [34, 72, 1], [35, 74, 3], [40, 77, 2], [43, 79, 3], [48, 76, 4], [54, 72, 2], [56, 74, 6]] },
      A2: { chords: ['F', 'Dm', 'Bb', 'C'], lead: [[0, 72, 2], [3, 74, 1], [4, 77, 3], [8, 81, 2], [10, 79, 2], [18, 77, 2], [20, 76, 2], [22, 74, 4], [32, 70, 2], [34, 74, 1], [35, 77, 3], [40, 79, 2], [43, 81, 3], [48, 79, 2], [50, 77, 2], [52, 76, 2], [54, 74, 2], [56, 72, 6]] },
      B: { chords: ['Bb', 'C', 'Am', 'Dm'], lead: [[0, 77, 2], [2, 74, 2], [4, 70, 2], [6, 74, 2], [8, 77, 4], [16, 79, 2], [18, 76, 2], [20, 72, 4], [26, 76, 2], [28, 79, 4], [32, 81, 3], [36, 79, 1], [37, 77, 3], [40, 76, 4], [48, 74, 2], [50, 76, 2], [52, 77, 2], [54, 79, 2], [56, 76, 8]] },
    },
    order: [['A', 'A2'], ['A', 'A2'], ['B'], ['A2', 'A']], arp: arpOff, bass: walk, drums: (bars) => beat(bars),
  },
  // evening and night: D Dorian, slow, mostly triangle bass and soft rolling arps, a lead now and then
  night: {
    bpm: 96, duty: [0.25, 0.125], vol: { lead: 0.08, harm: 0.045, bass: 0.15, drum: 0.025 },
    sections: {
      A: { chords: ['Dm7', 'G', 'Dm7', 'Am7'], lead: [] },
      B: { chords: ['Dm7', 'G', 'Fmaj', 'C'], lead: [[0, 74, 6], [8, 72, 4], [12, 69, 4], [16, 71, 8], [32, 69, 4], [36, 72, 4], [40, 77, 8], [48, 76, 12]] },
    },
    order: [['A'], ['B', 'A'], ['A'], ['B']], arp: arpRoll, bass: halfBass, drums: (bars) => beat(bars, { kick: [0], snare: [], hats: [8] }),
  },
  // inside the AI Lab: A minor to C, a quirky staccato "machine" motif, chromatic bass, ticking hats
  lab: {
    bpm: 112, duty: [0.125, 0.25], vol: { lead: 0.1, harm: 0.045, bass: 0.15, drum: 0.04 },
    sections: {
      A: { chords: ['Am', 'Fmaj', 'Dm', 'E'], lead: [[0, 69, 1], [2, 72, 1], [4, 76, 1], [6, 75, 1], [7, 76, 1], [10, 72, 1], [12, 74, 2], [16, 77, 1], [18, 76, 1], [20, 72, 1], [22, 69, 2], [26, 72, 1], [28, 71, 2], [32, 74, 1], [34, 77, 1], [36, 81, 1], [38, 80, 1], [39, 81, 1], [42, 77, 1], [44, 76, 2], [48, 76, 1], [50, 71, 1], [52, 68, 1], [54, 71, 1], [56, 76, 4]] },
      B: { chords: ['C', 'G', 'Am', 'E'], lead: [[0, 72, 1], [2, 76, 1], [4, 79, 2], [8, 77, 1], [10, 76, 1], [12, 74, 2], [16, 74, 1], [18, 71, 1], [20, 67, 2], [24, 71, 1], [26, 74, 1], [28, 77, 2], [32, 76, 1], [34, 72, 1], [36, 69, 2], [40, 72, 1], [42, 76, 1], [44, 81, 2], [48, 80, 2], [52, 76, 2], [56, 71, 4]] },
    },
    order: [['A'], ['A'], ['B'], ['A']], arp: arpOff,
    bass: (chords) => chords.flatMap((c, b) => { const r = CH[c][0] + 12; return [[b * 16, r, 2], [b * 16 + 4, r, 1], [b * 16 + 6, r - 1, 1], [b * 16 + 8, r - 2, 2], [b * 16 + 12, r - 3, 2]]; }),
    drums: (bars) => beat(bars, { kick: [0, 10], snare: [8], hats: [0, 2, 4, 6, 8, 10, 12, 14] }),
  },
  // a mission or the town complete: C major, a bright 8-bar tune that ends on the tonic (plays once)
  celebrate: {
    bpm: 150, once: true, duty: [0.5, 0.25], vol: { lead: 0.13, harm: 0.06, bass: 0.16, drum: 0.05 },
    sections: {
      A: { chords: ['C', 'Fmaj', 'G', 'C'], lead: [[0, 67, 2], [2, 72, 2], [4, 74, 2], [6, 76, 4], [12, 79, 4], [16, 81, 2], [18, 77, 2], [20, 72, 4], [26, 77, 2], [28, 81, 4], [32, 83, 2], [34, 79, 2], [36, 74, 2], [38, 79, 2], [40, 83, 4], [46, 86, 2], [48, 84, 8], [60, 79, 2], [62, 76, 2]] },
      B: { chords: ['Am', 'Fmaj', 'G', 'C'], lead: [[0, 76, 2], [2, 79, 2], [4, 84, 4], [10, 83, 2], [12, 81, 4], [16, 77, 2], [18, 81, 2], [20, 84, 4], [26, 86, 2], [28, 84, 4], [32, 83, 2], [34, 86, 2], [36, 91, 4], [42, 86, 2], [44, 83, 4], [48, 84, 16]] },
    },
    order: [['A'], ['B']], arp: arpOff, bass: walk, drums: (bars) => beat(bars, { hats: [2, 6, 10, 14], snare: [4, 12, 14] }),
  },
};
export const MOODS = Object.keys(SONGS);
