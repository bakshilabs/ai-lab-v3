// Plotter tokenizer. Exact mirror of model/tokenizer.py (keep the two in sync).
//
// normalise: NFD -> drop marks (café -> cafe) -> lowercase -> delete apostrophes
// (don't -> dont) -> anything outside [a-z0-9] becomes a space -> split.
// Words are WordPiece-tokenised by greedy longest match against the vocab
// ("batterys" -> "battery", "##s"); every single letter/digit exists as a start
// piece and a "##" piece, so any normalised word can be encoded.
// The sequence is [L_<level>] followed by the pieces, cut to maxLen tokens.

export const MAX_LEN = 32;
export const MAX_WORD = 24;

export function levelToken(level) {
  return `[L_${level}]`;
}

export function normalise(text) {
  return String(text ?? '')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/['’‘`]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .split(' ')
    .filter(Boolean);
}

export function wordpiece(word, vocab) {
  word = word.slice(0, MAX_WORD);
  if (vocab.has(word)) return [word];
  const out = [];
  let start = 0;
  while (start < word.length) {
    let end = word.length;
    let piece = null;
    while (end > start) {
      const sub = word.slice(start, end);
      const cand = start === 0 ? sub : '##' + sub;
      if (vocab.has(cand)) { piece = cand; break; }
      end--;
    }
    if (piece === null) return ['[UNK]'];
    out.push(piece);
    start = end;
  }
  return out;
}

export class Tokenizer {
  /** @param {string[]} id2tok vocab in id order (plotter.json "vocab") */
  constructor(id2tok, { maxLen = MAX_LEN } = {}) {
    this.id2tok = id2tok;
    this.vocab = new Map(id2tok.map((t, i) => [t, i]));
    this.maxLen = maxLen;
    this.unk = this.vocab.get('[UNK]');
  }

  /** words of an already-normalised word list -> token strings */
  tokenizeWords(level, words) {
    const toks = [levelToken(level)];
    for (const w of words) {
      for (const p of wordpiece(w, this.vocab)) toks.push(p);
      if (toks.length >= this.maxLen) break;
    }
    return toks.slice(0, this.maxLen);
  }

  tokenize(level, text) {
    return this.tokenizeWords(level, normalise(text));
  }

  /** token strings -> Int32Array ids */
  ids(tokens) {
    const out = new Int32Array(tokens.length);
    for (let i = 0; i < tokens.length; i++) {
      const id = this.vocab.get(tokens[i]);
      out[i] = id === undefined ? this.unk : id;
    }
    return out;
  }
}
