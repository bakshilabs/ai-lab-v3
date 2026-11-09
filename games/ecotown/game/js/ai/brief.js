// Is the brief something another person could follow? A brief of repeats or emoji ("🏠🏠🏠 dry dry dry dry") can still
// produce a plan that happens to pass, but it doesn't earn "Well specified first time". Pure module (tests/brief.test.mjs).
const STOP = new Set(['the', 'a', 'an', 'and', 'or', 'of', 'to', 'for', 'in', 'on', 'at', 'with', 'it', 'is', 'be', 'that', 'this', 'our', 'we', 'please', 'make', 'build', 'i', 'you', 'so', 'all', 'by', 'from', 'but', 'as', 'some', 'its', 'are', 'can', 'let', 'just', 'very', 'really']);
export function briefQuality(text) {
  const t = String(text || '');
  const emoji = (t.match(/\p{Extended_Pictographic}/gu) || []).length;
  const words = (t.toLowerCase().match(/[a-z]+(?:['’][a-z]+)?/g) || []).filter((w) => !STOP.has(w));
  const counts = {}; for (const w of words) counts[w] = (counts[w] || 0) + 1;
  const distinct = Object.keys(counts).length; const top = Math.max(0, ...Object.values(counts));
  const issues = [];
  if (sillyIn(t).length) issues.push('silly');
  if (contraIn(t).length) issues.push('contra');
  if (top >= 3 || (words.length >= 4 && distinct / words.length < 0.6)) issues.push('repeats');
  if (emoji >= 2 || (emoji && emoji * 2 >= words.length)) issues.push('emoji');
  if (distinct < 3) issues.push('short');
  return { ok: !issues.length, issues };
}

// Things a town can't build, and joke words: Florence says she left them out (she used to plan around them silently,
// and "grow pizza trees everywhere lol" earned "Clear first time").
const SILLY = /\b(lol+|lmao|lmfao|rofl|haha+|hehe+|xd|jk|yolo|bruh|pizzas?(?: trees?)?|candy(?: \w+)?|sweets|chocolate(?: \w+)?|ice ?creams?|lollipops?|cakes?|burgers?|chips trees?|doughnuts?|donuts?|cookies?|marshmallows?|unicorns?|dragons?|fair(?:y|ies)|wizards?|aliens?|dinosaurs?|magic(?:al)?(?: \w+)?|rainbows?|money trees?|lava|spaceships?|robot army|castles? made of \w+)\b/gi;
export function sillyIn(text) { return [...new Set((String(text || '').match(SILLY) || []).map((w) => w.toLowerCase()))]; }

// A brief that says the opposite of a goal word it uses ("do NOT make it safe", "I hate walking and cycling"). Florence picks out
// the goal word and misses the "not", so such a rewrite used to pass with a star. Returns the phrases found.
const CONTRA = /\b(?:do not|don['’]?t|not|never|hate|dislike|stop)\s+(?:(?:make|be|keep|want|need|have|it|them|the|any|like|care|about|to|build|protect|being)\s+){0,3}(?:safe|safety|walking|cycling|cycle lanes?|dry|warm|clean|green|wildlife|bees|hedges|nature|fair|low.?carbon|the wetland|the wood|the meadow)\b/gi;
export function contraIn(text) { return [...new Set((String(text || '').match(CONTRA) || []).map((w) => w.toLowerCase().replace(/\s+/g, ' ')))]; }
