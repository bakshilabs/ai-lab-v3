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
  if (top >= 3 || (words.length >= 4 && distinct / words.length < 0.6)) issues.push('repeats');
  if (emoji >= 2 || (emoji && emoji * 2 >= words.length)) issues.push('emoji');
  if (distinct < 3) issues.push('short');
  return { ok: !issues.length, issues };
}
