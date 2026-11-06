"""Deterministic synthetic dataset for Plotter.

    python gen_data.py [--out data] [--seed 1234] [--per-level 13000]

Writes data/{train,val,test}.jsonl. One JSON object per line:
    {"level": "land", "text": "...", "labels": ["dry", "sunny"], "unknown": 0,
     "template": "land|t|Find {NP}, but {CL}", "split": "train", "age": "t", "kind": "slots"}

Split is BY TEMPLATE (sentence frame / off-topic sentence pattern): a frame is
hashed to train/val/test, so the test set is made of sentence shapes the model
never saw. Fragments (the slot phrases) are shared across splits. Exact
duplicate texts are removed from val/test if they appear in train.
"""
import argparse
import hashlib
import json
import os
import random
import re

from lexicon import (LEX, GENERIC_FRAMES, EXCLUSIVE, CHAT, JOKES, RUDE_UNSAFE, NONSENSE_WORDS, TAGALONG,
                     VIOLENT_VERBS, VIOLENT_OBJECTS)

HERE = os.path.dirname(os.path.abspath(__file__))
SCHEMA_PATH = os.path.join(HERE, "..", "game", "js", "ai", "schema.json")
SCHEMA = json.load(open(SCHEMA_PATH))
LEVELS = list(SCHEMA["levels"].keys())

PH = re.compile(r"\{(NP|ADJ|CL2|CL|MAT|SFX)\}")


def split_of(template, val=0.10, test=0.15):
    """Stable hash split of a template id."""
    h = int(hashlib.md5(template.encode()).hexdigest()[:8], 16) / 0xFFFFFFFF
    return "test" if h < test else ("val" if h < test + val else "train")


# ------------------------------------------------------------------ helpers
NUM_WORDS = {3: "three", 5: "five", 8: "eight", 10: "ten", 12: "twelve", 15: "fifteen", 20: "twenty"}


def fill_numbers(text, rng):
    while "{N}" in text:
        n = rng.choice([3, 4, 5, 6, 7, 8, 10, 10, 10, 12, 15, 20])
        s = NUM_WORDS[n] if (n in NUM_WORDS and rng.random() < 0.25) else str(n)
        text = text.replace("{N}", s, 1)
    while "{MIN}" in text:
        text = text.replace("{MIN}", rng.choice(["minutes", "minutes", "mins", "min", "minute"]), 1)
    return text


def join_list(items, rng, teen):
    if not items:
        return ""
    if len(items) == 1:
        return items[0]
    style = rng.random()
    if style < 0.55:
        return ", ".join(items[:-1]) + rng.choice([" and ", ", and " if teen else " and "]) + items[-1]
    if style < 0.75:
        return " and ".join(items)
    if style < 0.9:
        return ", ".join(items)
    return " ".join(i + (" plus" if k < len(items) - 1 else "") for k, i in enumerate(items))


def join_clauses(items, rng, teen):
    if not items:
        return ""
    if len(items) == 1:
        return items[0]
    out = items[0]
    joins = [" and ", ", ", ". ", " and also ", ", and ", " and please "]
    if teen:
        joins += [". Also, ", ", plus ", " and make sure you ", ", but ", ". Please also "]
    for it in items[1:]:
        out += rng.choice(joins) + it
    return out


def join_adj(items, rng, sep_choices):
    if not items:
        return ""
    if len(items) == 1:
        return items[0]
    sep = rng.choice(sep_choices)
    if sep == ", " and rng.random() < 0.5:
        return ", ".join(items[:-1]) + " and " + items[-1]
    return sep.join(items)


def fix_articles(t):
    t = re.sub(r"\b([Aa]) (?=[aeiouAEIOU])", lambda m: m.group(1) + "n ", t)
    return t


# ------------------------------------------------------------------ noise
MISSPELL = {
    "please": ["pls", "plz", "plese", "pleese"], "because": ["cuz", "becuase", "becos"], "you": ["u", "yu"],
    "your": ["ur", "yor"], "don't": ["dont", "dnt", "don't", "do'nt"], "won't": ["wont"], "it's": ["its"],
    "batteries": ["batterys", "bateries"], "really": ["realy", "rly"], "school": ["skool", "scool", "shcool"],
    "houses": ["housses", "hosues", "houeses"], "there": ["their", "ther"], "their": ["there"],
    "trees": ["tress", "treez"], "meadow": ["medow", "meddow"], "hedges": ["hedjes", "hegdes"], "wetland": ["wet land", "wetlnd"],
    "cycling": ["cyclin", "sycling"], "bicycle": ["bycicle"], "everyone": ["every one", "evryone", "everyon"],
    "everyone's": ["everyones", "evryones"], "people": ["peple", "poeple"], "with": ["wiv", "wit"], "the": ["teh", "da"],
    "turbines": ["turbins", "terbines"], "solar": ["soler", "sola"], "power": ["powa", "pwer"], "enough": ["enuf", "enouf"],
    "minutes": ["minits", "mins"], "middle": ["midle", "middel"], "centre": ["center", "centr"], "flood": ["flud"],
    "doesn't": ["doesnt"], "isn't": ["isnt"], "can't": ["cant"], "warm": ["worm", "wram"], "cheap": ["chepe", "cheep"],
    "food": ["fud", "fod"], "bees": ["beez"], "orchard": ["orcherd"], "allotments": ["alotments"],
    "strong": ["strog", "stong"], "sunny": ["suny", "sunnie"], "beach": ["beech"], "wildlife": ["wild life"],
    "and": ["n", "an", "&"], "want": ["wanna", "wnat"], "going to": ["gonna"], "let's": ["lets"],
    "something": ["sumthing"], "straw": ["stra", "srtaw"], "timber": ["timbre"], "compost": ["compst"],
    "near": ["neer", "nr"], "close": ["clos"], "walk": ["wlak", "wok"],
}
KEYS = "qwertyuiopasdfghjklzxcvbnm"


def typo_word(w, rng):
    if len(w) < 4 or not w.isalpha():
        return w
    i = rng.randrange(1, len(w) - 1)
    op = rng.random()
    if op < 0.3:
        return w[:i] + w[i + 1] + w[i] + w[i + 2:]
    if op < 0.55:
        return w[:i] + w[i + 1:]
    if op < 0.8:
        return w[:i] + w[i] + w[i:]
    return w[:i] + rng.choice(KEYS) + w[i + 1:]


def add_noise(text, rng, teen):
    # child-style spellings
    words = text.split(" ")
    out = []
    for w in words:
        core = w.lower().strip(".,!?")
        rate = 0.03 if core in ("the", "and", "you", "with") else (0.08 if teen else 0.25)
        if core in MISSPELL and rng.random() < rate:
            rep = rng.choice(MISSPELL[core])
            w = w.lower().replace(core, rep) if core in w.lower() else w
        out.append(w)
    text = " ".join(out)
    # random typos
    if rng.random() < (0.12 if teen else 0.22):
        words = text.split(" ")
        for _ in range(rng.choice([1, 1, 2])):
            k = rng.randrange(len(words))
            words[k] = typo_word(words[k], rng)
        text = " ".join(words)
    # casing / punctuation
    r = rng.random()
    if r < (0.25 if teen else 0.55):
        text = text.lower()
    elif r < 0.7:
        text = text[:1].upper() + text[1:]
    if rng.random() < (0.2 if teen else 0.4):
        text = re.sub(r"[.,!?']", "", text)
    elif rng.random() < (0.6 if teen else 0.3):
        if not text.endswith(("?", "!", ".")):
            text += rng.choice([".", ".", "!", "!!", " :)"])
    if rng.random() < 0.03:
        text = text.upper()
    return re.sub(r"\s+", " ", text).strip()


PREFIX_C = ["", "", "", "", "", "hi plotter ", "ok ", "um ", "plotter ", "please ", "so ", "hey ", "ok so ", "i think "]
PREFIX_T = ["", "", "", "", "", "Plotter, ", "OK, ", "So, ", "Right, ", "I think ", "Honestly, ", "For this level, "]
SUFFIX_C = ["", "", "", "", "", " please", " pls", " thanks", " thank you", " ok", " if you can", " plotter"]
SUFFIX_T = ["", "", "", "", "", " please", " thanks", " if possible", ", thank you", " for the town"]


def dress(text, rng, teen):
    pre = rng.choice(PREFIX_T if teen else PREFIX_C)
    suf = rng.choice(SUFFIX_T if teen else SUFFIX_C)
    t = pre + text + suf
    return t


# ------------------------------------------------------------------ render
def forms(level, unit):
    """unit = (slots_tuple, combo_form or None, combo_texts). Returns {form: [texts]}."""
    slots, cform, ctexts = unit
    if cform:
        return {cform: ctexts}
    lex = LEX[level]
    d = dict(lex["slots"][slots[0]])
    if "pred" not in d and lex.get("PRED_FROM_ADJ") and "adj" in d:
        d["pred"] = d["adj"]
    return {k: v for k, v in d.items() if k in ("adj", "pred", "np", "cl", "sfx", "mat") and v}


def render(level, slot_set, frame, rng, teen, allow_anti=True):
    """Render slot_set into frame. Returns text or None if incompatible."""
    lex = LEX[level]
    need = set(PH.findall(frame))
    # 1. units: combos first (sometimes), then single slots
    units, left = [], list(slot_set)
    for cslots, cform, ctexts in lex["combos"]:
        if all(s in left for s in cslots) and rng.random() < 0.6:
            units.append((cslots, cform, ctexts))
            left = [s for s in left if s not in cslots]
    units += [((s,), None, None) for s in left]

    for _attempt in range(25):
        parts = {"NP": [], "NPADJ": [], "ADJ": [], "CL": [], "CL2": [], "MAT": [], "SFX": [], "FREE": []}
        ok = True
        for u in units:
            f = forms(level, u)
            opts = []
            if "NP" in need:
                if "adj" in f: opts.append(("NPADJ", "adj"))
                if "np" in f: opts.append(("NP", "np"))
            if "ADJ" in need and "pred" in f: opts.append(("ADJ", "pred"))
            if "CL" in need and "cl" in f: opts.append(("CL", "cl"))
            if "CL2" in need and "cl" in f: opts.append(("CL2", "cl"))
            if "MAT" in need and "mat" in f: opts.append(("MAT", "mat"))
            if "SFX" in need and "sfx" in f: opts.append(("SFX", "sfx"))
            if "sfx" in f and len(units) > 1: opts.append(("FREE", "sfx"))
            if not opts:
                ok = False
                break
            part, form = rng.choice(opts)
            parts[part].append(fill_numbers(rng.choice(f[form]), rng))
        if not ok:
            return None
        if allow_anti and "CL" in need and rng.random() < 0.06 and not any(
                s.startswith("keep_") or s == "no_cars" for s in slot_set):
            parts["CL"].append(rng.choice(lex["anti"]))
        # required parts must be non-empty (NP may fall back to a generic noun phrase)
        if any(not parts[p] for p in ("ADJ", "CL", "CL2", "MAT", "SFX") if p in need):
            continue
        if parts["FREE"] and not any(parts[p] or (p == "NP" and parts["NPADJ"]) for p in ("NP", "CL", "MAT")):
            continue
        break
    else:
        return None

    np_items = list(parts["NP"])
    if parts["NPADJ"]:
        adjs = parts["NPADJ"]
        rng.shuffle(adjs)
        adjs.sort(key=lambda a: 0 if a.startswith("enough") else 1)  # "enough clean power"
        tmpl = rng.choice(lex["np_adj"])
        sep = lex.get("ADJ_JOIN", [", ", " ", " and "])
        np_items.insert(0 if rng.random() < 0.7 else len(np_items), tmpl.replace("{A}", join_adj(adjs, rng, sep)))
    if "NP" in need and not np_items:
        np_items = [rng.choice(lex["generic_np"])]
    # free suffixes glue onto an existing item
    for sfx in parts["FREE"]:
        targets = [("NP", np_items)] + [(p, parts[p]) for p in ("CL", "MAT") if parts[p]]
        targets = [t for t in targets if t[1]]
        _, lst = rng.choice(targets)
        k = rng.randrange(len(lst))
        lst[k] = lst[k] + " " + sfx
    rng.shuffle(parts["CL"])
    fill = {
        "NP": join_list(np_items, rng, teen) if np_items else "",
        "ADJ": join_adj(parts["ADJ"], rng, lex.get("ADJ_JOIN", [", ", " and "])),
        "CL": join_clauses(parts["CL"], rng, teen),
        "CL2": join_clauses(parts["CL2"], rng, teen),
        "MAT": join_list(parts["MAT"], rng, teen),
        "SFX": " ".join(parts["SFX"]),
    }
    text = PH.sub(lambda m: fill[m.group(1)], frame)
    return fix_articles(text)


def sample_slots(level, k, rng):
    slots = list(SCHEMA["levels"][level]["slots"].keys())
    excl = {frozenset(p) for p in EXCLUSIVE[level]}
    for _ in range(50):
        s = rng.sample(slots, k)
        if not any(frozenset((a, b)) in excl for i, a in enumerate(s) for b in s[i + 1:]):
            return s
    return rng.sample(slots, 1)


def level_frames(level):
    out = [(f"{level}|{a}|{f}", a, f) for a, f in LEX[level]["frames"]]
    out += [(f"gen|{a}|{f}", a, f) for a, f in GENERIC_FRAMES]
    return out


K_DIST = [(0, 0.08), (1, 0.34), (2, 0.31), (3, 0.18), (4, 0.09)]


def pick_k(rng):
    r, acc = rng.random(), 0
    for k, p in K_DIST:
        acc += p
        if r < acc:
            return k
    return 1


def gen_level(level, n, rng):
    frames = level_frames(level)
    out = []
    lex = LEX[level]
    while len(out) < n:
        k = pick_k(rng)
        tid, age, frame = rng.choice(frames)
        teen = age == "t" or rng.random() < 0.2
        if k == 0:
            # on-topic but no slot: generic sentence, generic NP frame, or an 'anti' clause
            r = rng.random()
            if r < 0.45:
                i = rng.randrange(len(lex["generic"]))
                tid, text = f"{level}|generic|{i}", lex["generic"][i]
            elif r < 0.7:
                i = rng.randrange(len(lex["anti"]))
                tid, text = f"{level}|anti|{i}", lex["anti"][i]
            else:
                if set(PH.findall(frame)) != {"NP"}:
                    continue
                text = frame.replace("{NP}", rng.choice(lex["generic_np"]))
            slots = []
        else:
            slots = sample_slots(level, k, rng)
            text = render(level, slots, frame, rng, teen)
            if text is None:
                continue
        text = dress(text, rng, teen)
        if slots and rng.random() < 0.04:
            text += rng.choice([" and ", ". ", ", "]) + rng.choice(TAGALONG)
        text = add_noise(text, rng, teen)
        out.append(dict(level=level, text=text, labels=sorted(slots), unknown=0, template=tid,
                        split=split_of(tid), age=age, kind="slots"))
    return out


# ------------------------------------------------------------------ unknown
THINGS = ["pizza", "football", "minecraft", "dogs", "cats", "homework", "maths", "dinosaurs", "youtube", "ice cream",
          "sharks", "space", "robots", "the moon", "chocolate", "unicorns", "dragons", "pirates", "ninjas", "sweets",
          "fortnite", "tiktok", "spiders", "volcanoes", "the olympics", "my teacher", "taylor swift", "lego", "pokemon",
          "basketball", "the beatles", "christmas", "halloween", "my little brother", "school dinners"]
FUN_BUILDS = ["a castle", "a rollercoaster", "a theme park", "a zoo", "a cinema", "a spaceship", "a giant slide",
              "a water park", "a pizza shop", "a skate park", "a dragon cave", "a pirate ship", "a lego house",
              "a trampoline park", "a rocket", "a sweet shop", "a portal to the moon", "a disco"]
UNK_PATTERNS = [
    "do you like {T}", "i like {T}", "what is {T}", "tell me about {T}", "i love {T}", "what's your favourite thing about {T}",
    "have you seen {T}", "can we talk about {T}", "who likes {T}", "{T} is the best", "{T} is boring",
    "build {B}", "can we have {B}", "i want {B}", "put {B} in the town", "make {B}", "add {B} please",
    "Could you build {B} instead?", "I'd like {B} next to my house", "we need {B}", "{B} pls",
]

# Words that are generic across levels; overlap on these does not make a
# cross-level fragment ambiguous.
GENERIC_WORDS = set("""a an the and or of to for in on at by with from out up down off it its it's is are be
was this that these those there their they them we you i me my our your all every everyone everybody some lots
lot loads plenty more most much many very really just also so but not no don't do dont never please can could
should would must make made build built put keep use get give let add plan go have has need want find pick choose
town island people homes home houses house school places place land area spot site way ways new good big little
things thing stuff around too near close next easy safe enough own extra time day days later than as possible
""".split())


def content_words(text):
    return {w for w in re.findall(r"[a-z']+", text.lower()) if w not in GENERIC_WORDS and len(w) > 2}


def level_vocab(level):
    words = set()
    lex = LEX[level]
    for d in lex["slots"].values():
        for k in ("adj", "pred", "np", "cl", "sfx", "mat"):
            for t in d.get(k, []):
                words |= content_words(t)
    for _, _, texts in lex["combos"]:
        for t in texts:
            words |= content_words(t)
    return words


def gen_unknown(level, n, rng, vocab):
    out = []
    others = [l for l in LEVELS if l != level]
    lists = [("chat", CHAT), ("joke", JOKES), ("rude", RUDE_UNSAFE)]
    while len(out) < n:
        r = rng.random()
        teen = rng.random() < 0.4
        if r < 0.26:
            name, lst = rng.choice(lists)
            i = rng.randrange(len(lst))
            tid, text = f"unk|{name}|{i}", lst[i]
            text = dress(text, rng, teen) if rng.random() < 0.3 else text
        elif r < 0.37:
            i = rng.randrange(len(UNK_PATTERNS))
            tid = f"unk|pat|{i}"
            text = UNK_PATTERNS[i].replace("{T}", rng.choice(THINGS)).replace("{B}", rng.choice(FUN_BUILDS))
        elif r < 0.45:
            tid, text = "unk|nonsense", nonsense(rng)
        elif r < 0.50:
            i = rng.randrange(len(VIOLENT_VERBS))   # split by verb
            tid = f"unk|violent|{i}"
            text = dress(f"{VIOLENT_VERBS[i]} {rng.choice(VIOLENT_OBJECTS)}", rng, teen)
        else:
            # an instruction that belongs to a different level's topic
            src = rng.choice(others)
            k = rng.choice([1, 1, 1, 2, 2, 3])
            text = None
            for _ in range(20):
                tid0, age, frame = rng.choice(level_frames(src))
                if k == 1 and rng.random() < 0.15:
                    gi = rng.randrange(len(LEX[src]["generic"]))
                    cand, tid0 = LEX[src]["generic"][gi], f"{src}|generic|{gi}"
                else:
                    cand = render(src, sample_slots(src, k, rng), frame, rng, age == "t", allow_anti=False)
                # skip if the fragment shares topic words with THIS level (would be ambiguous)
                if cand and not (content_words(cand) & vocab):
                    text = cand
                    break
            if text is None:
                continue
            tid = "x|" + tid0
            text = dress(text, rng, teen)
        text = add_noise(text, rng, teen) if text.strip() else text
        out.append(dict(level=level, text=text, labels=[], unknown=1, template=tid,
                        split=split_of(tid) if tid != "unk|nonsense" else rng.choice(
                            ["train"] * 75 + ["val"] * 10 + ["test"] * 15),
                        age="t" if teen else "c", kind="unknown"))
    return out


def nonsense(rng):
    r = rng.random()
    if r < 0.3:
        return "".join(rng.choice(KEYS) for _ in range(rng.randint(2, 14)))
    if r < 0.55:
        return " ".join(rng.choice(NONSENSE_WORDS) for _ in range(rng.randint(1, 5)))
    if r < 0.7:
        return " ".join("".join(rng.choice(KEYS) for _ in range(rng.randint(2, 7))) for _ in range(rng.randint(2, 5)))
    if r < 0.8:
        return rng.choice(["", " ", "?", "!!!", "...", ":)", "???", "123", "42", "1 2 3 4", "x", "a", "k", "ok ok ok"])
    if r < 0.9:
        w = rng.choice(NONSENSE_WORDS + ["no", "yes", "the", "and"])
        return " ".join([w] * rng.randint(2, 8))
    return "".join(rng.choice("abcdefghijklmnopqrstuvwxyz0123456789!? ") for _ in range(rng.randint(5, 25)))


# ------------------------------------------------------------------ main
def canonical_rows():
    """The 12 canonical cards with their intended labels (see README)."""
    lab = {
        ("land", "vague"): ["best"],
        ("land", "clear"): ["dry", "keep_meadow", "sunny"],
        ("move", "vague"): ["easy_access"],
        ("move", "clear"): ["cars_at_edge", "cycling", "safe_walking"],
        ("homes", "vague"): ["strong"],
        ("homes", "clear"): ["low_carbon", "natural_materials", "warm"],
        ("food", "vague"): ["max_food"],
        ("food", "clear"): ["bees", "enough_food", "keep_hedges"],
        ("power", "vague"): ["clean_power", "enough_power"],
        ("power", "clear"): ["enough_power", "night", "storage", "winter"],
        ("heart", "vague"): ["middle"],
        ("heart", "clear"): ["walk_time"],
    }
    rows = []
    for level, d in SCHEMA["levels"].items():
        for kind in ("vague", "clear"):
            rows.append(dict(level=level, text=d["canonical"][kind], labels=sorted(lab[(level, kind)]), unknown=0,
                             template=f"canonical|{level}|{kind}", split="train", age="c", kind="canonical"))
    return rows


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=os.path.join(HERE, "data"))
    ap.add_argument("--seed", type=int, default=1234)
    ap.add_argument("--per-level", type=int, default=13000)
    ap.add_argument("--unknown-per-level", type=int, default=4600)
    args = ap.parse_args()
    rng = random.Random(args.seed)

    rows = []
    for level in LEVELS:
        rows += gen_level(level, args.per_level, rng)
        rows += gen_unknown(level, args.unknown_per_level, rng, level_vocab(level))
    # canonical cards: many copies (plain + lower-case + no punctuation) in train
    canon = canonical_rows()
    for c in canon:
        for v in (c["text"], c["text"].lower(), re.sub(r"[.,!?']", "", c["text"]).lower()):
            for _ in range(10):
                rows.append(dict(c, text=v))

    def norm(t):
        return re.sub(r"[^a-z0-9 ]", "", t.lower()).strip()

    train_keys = {(r["level"], norm(r["text"])) for r in rows if r["split"] == "train"}
    os.makedirs(args.out, exist_ok=True)
    counts = {}
    for split in ("train", "val", "test"):
        seen = set()
        sel = []
        for r in rows:
            if r["split"] != split:
                continue
            key = (r["level"], norm(r["text"]))
            if split != "train":
                if key in train_keys or key in seen:
                    continue  # honest held-out: no text seen in train, no duplicates
                seen.add(key)
            sel.append(r)
        rng.shuffle(sel)
        with open(os.path.join(args.out, f"{split}.jsonl"), "w") as f:
            for r in sel:
                f.write(json.dumps(r) + "\n")
        counts[split] = (len(sel), sum(r["unknown"] for r in sel))
    with open(os.path.join(args.out, "canonical.json"), "w") as f:
        json.dump(canon, f, indent=1)
    for s, (n, u) in counts.items():
        print(f"{s:5s}: {n:6d} examples ({u} unknown)")


if __name__ == "__main__":
    main()
