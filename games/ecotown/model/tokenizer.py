"""Plotter tokenizer (Python reference). Mirrored exactly by game/js/ai/tokenizer.js.

normalise(text):
  1. Unicode NFD, drop mark characters (category M; café -> cafe)
  2. lowercase
  3. delete apostrophes (don't -> dont, everyone's -> everyones) so child spellings match
  4. every char outside [a-z0-9] becomes a space ("south-facing" -> "south facing")
  5. split on whitespace

Words are then tokenised WordPiece-style by greedy longest match: a word that is
in the vocab is one token; otherwise it is split into a start piece and "##"
continuation pieces. All single letters/digits exist in both forms, so nothing
is ever out of vocabulary except characters we normalised away.

Sequence = [level token] + pieces, truncated to MAX_LEN.
"""
import re
import unicodedata
from collections import Counter

MAX_LEN = 32
MAX_WORD = 24          # longer "words" are cut (keyboard mashing)
SPECIALS = ["[PAD]", "[UNK]"]
CHARS = "abcdefghijklmnopqrstuvwxyz0123456789"


def level_token(level):
    return f"[L_{level}]"


def normalise(text):
    t = unicodedata.normalize("NFD", text)
    t = "".join(c for c in t if not unicodedata.category(c).startswith("M"))  # == JS /\p{M}/u
    t = t.lower()
    t = re.sub(r"['’‘`]", "", t)
    t = re.sub(r"[^a-z0-9]+", " ", t)
    return t.split()


def wordpiece(word, vocab):
    word = word[:MAX_WORD]
    if word in vocab:
        return [word]
    out, start = [], 0
    while start < len(word):
        end = len(word)
        piece = None
        while end > start:
            cand = word[start:end] if start == 0 else "##" + word[start:end]
            if cand in vocab:
                piece = cand
                break
            end -= 1
        if piece is None:      # unreachable with the char inventory, kept for safety
            return ["[UNK]"]
        out.append(piece)
        start = end
    return out


def tokenize(level, text, vocab):
    toks = [level_token(level)]
    for w in normalise(text):
        toks.extend(wordpiece(w, vocab))
        if len(toks) >= MAX_LEN:
            break
    return toks[:MAX_LEN]


def encode(level, text, vocab):
    unk = vocab["[UNK]"]
    return [vocab.get(t, unk) for t in tokenize(level, text, vocab)]


def build_vocab(texts, levels, min_count=3, max_size=8000, max_piece=6):
    """Whole words with count >= min_count, then the most frequent sub-pieces
    (word prefixes, and '##' inner pieces) up to max_size."""
    wc = Counter(w[:MAX_WORD] for t in texts for w in normalise(t))
    tokens = SPECIALS + [level_token(l) for l in levels]
    tokens += list(CHARS) + ["##" + c for c in CHARS]
    seen = set(tokens)
    words = [w for w, c in wc.most_common() if c >= min_count and w not in seen]
    budget = max_size - len(tokens)
    words = words[: int(budget * 0.6)]
    tokens += words
    seen.update(words)
    # sub-pieces, counted over word types (sqrt frequency so a few very common
    # words don't dominate) -- they matter mostly for typos / unseen words
    pc = Counter()
    for w, c in wc.items():
        wt = c ** 0.5
        for L in range(2, min(max_piece, len(w)) + 1):
            pc[w[:L]] += wt
        for i in range(1, len(w)):
            for L in range(2, min(max_piece, len(w) - i) + 1):
                pc["##" + w[i:i + L]] += wt
    for p, _ in pc.most_common():
        if len(tokens) >= max_size:
            break
        if p not in seen:
            tokens.append(p)
            seen.add(p)
    return {t: i for i, t in enumerate(tokens)}
