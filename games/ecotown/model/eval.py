"""Evaluate Plotter (float PyTorch checkpoint) against the release gates.

    python eval.py [--ckpt checkpoints/plotter.pt] [--data data] [--refs eval/ref_probs.json]

Prints a gate table and writes:
  eval/ref_probs.json  200 sampled test sentences with float probabilities, used by
                       game/tests/model.test.mjs to check the int8 JS model agrees;
  eval/results.json    all numbers.
"""
import argparse
import json
import os
import random

import torch

import tokenizer as tk
from train import Plotter, SLOTS, UNK_IX, SCHEMA, load_rows, prepare, predict_rows, metrics

HERE = os.path.dirname(os.path.abspath(__file__))
THR = 0.5


def load(ckpt):
    ck = torch.load(ckpt, weights_only=False)
    c = ck["cfg"]
    m = Plotter(c["vocab_size"], d=c["d"], layers=c["layers"], heads=c["heads"], ff=c["ff"], max_len=c["max_len"],
                n_out=c["n_out"])
    m.load_state_dict(ck["state"])
    m.eval()
    return m, ck["vocab"], ck


def level_probs(p, level):
    return {s: float(p[SLOTS.index(s)]) for s in SCHEMA["levels"][level]["slots"]}, float(p[UNK_IX])


def exact(p, level, labels, unknown):
    slots, u = level_probs(p, level)
    pred = sorted(s for s, v in slots.items() if v >= THR)
    pu = int(u >= THR)
    # an 'unknown' answer means the slots are ignored by the game
    return (pu == 1 and unknown == 1) or (pu == 0 and unknown == 0 and pred == sorted(labels)), pred, pu


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--ckpt", default=os.path.join(HERE, "checkpoints", "plotter.pt"))
    ap.add_argument("--data", default=os.path.join(HERE, "data"))
    ap.add_argument("--outdir", default=os.path.join(HERE, "eval"))
    ap.add_argument("--quiet", action="store_true")
    args = ap.parse_args()
    torch.set_num_threads(4)
    model, vocab, ck = load(args.ckpt)
    res = {"params": ck["params"], "epoch": ck["epoch"]}

    test = prepare(load_rows(os.path.join(args.data, "test.jsonl")), vocab)
    probs = predict_rows(model, test, vocab)
    mt = metrics(probs, test)
    res["test"] = mt
    # per-age and per-level F1
    for key, groups in (("by_age", ("c", "t")), ("by_level", tuple(SCHEMA["levels"]))):
        res[key] = {}
        for g in groups:
            idx = [i for i, r in enumerate(test) if (r["age"] if key == "by_age" else r["level"]) == g]
            res[key][g] = metrics(probs[idx], [test[i] for i in idx])

    # canonical cards
    canon = json.load(open(os.path.join(args.data, "canonical.json")))
    crow = prepare([dict(c) for c in canon], vocab)
    cp = predict_rows(model, crow, vocab)
    res["canonical"] = []
    for p, c in zip(cp, crow):
        ok, pred, pu = exact(p, c["level"], c["labels"], 0)
        res["canonical"].append(dict(level=c["level"], text=c["text"], want=c["labels"], got=pred, unknown=pu, ok=ok,
                                     probs={k: round(v, 3) for k, v in level_probs(p, c["level"])[0].items() if v > 0.05}))

    # hand-written child phrasing sanity list
    san = json.load(open(os.path.join(HERE, "sanity_child.json")))["items"]
    srow = prepare([dict(s, unknown=s.get("unknown", 0)) for s in san], vocab)
    sp = predict_rows(model, srow, vocab)
    res["sanity"] = []
    for p, s in zip(sp, srow):
        ok, pred, pu = exact(p, s["level"], s["labels"], s["unknown"])
        res["sanity"].append(dict(level=s["level"], text=s["text"], want=s["labels"], want_unknown=s["unknown"],
                                  got=pred, unknown=pu, ok=ok))
    res["sanity_acc"] = sum(r["ok"] for r in res["sanity"]) / len(res["sanity"])

    # reference probabilities for the JS agreement test (200 test sentences, mixed)
    rng = random.Random(0)
    sample = rng.sample(range(len(test)), 200)
    refs = []
    for i in sample:
        r = test[i]
        slots, u = level_probs(probs[i], r["level"])
        refs.append(dict(level=r["level"], text=r["text"], slots=slots, unknown=u,
                         tokens=tk.tokenize(r["level"], r["text"], vocab)))
    os.makedirs(args.outdir, exist_ok=True)
    json.dump(refs, open(os.path.join(args.outdir, "ref_probs.json"), "w"))

    gates = {
        "micro slot F1 >= 0.90 (held-out templates)": (mt["f1"], mt["f1"] >= 0.90),
        "unknown recall >= 0.95": (mt["unk_recall"], mt["unk_recall"] >= 0.95),
        "unknown FPR <= 0.05 (in-domain)": (mt["unk_fpr"], mt["unk_fpr"] <= 0.05),
        "canonical 12/12 exact": (sum(c["ok"] for c in res["canonical"]), all(c["ok"] for c in res["canonical"])),
        "child sanity exact-match >= 0.85": (res["sanity_acc"], res["sanity_acc"] >= 0.85),
    }
    res["gates"] = {k: dict(value=v, ok=ok) for k, (v, ok) in gates.items()}
    json.dump(res, open(os.path.join(args.outdir, "results.json"), "w"), indent=1)

    print(f"params {res['params']:,}  epoch {res['epoch']}  test n={mt['n']}")
    for k, (v, ok) in gates.items():
        print(f"  [{'PASS' if ok else 'FAIL'}] {k}: {v if isinstance(v, int) else round(v, 4)}")
    print("  by age:", {k: round(v["f1"], 4) for k, v in res["by_age"].items()})
    print("  by level:", {k: round(v["f1"], 4) for k, v in res["by_level"].items()})
    if not args.quiet:
        for c in res["canonical"]:
            if not c["ok"]:
                print("  CANON MISS", c)
        for s in res["sanity"]:
            if not s["ok"]:
                print(f"  sanity miss [{s['level']}] {s['text']!r} want {s['want']}{' UNK' if s['want_unknown'] else ''}"
                      f" got {s['got']}{' UNK' if s['unknown'] else ''}")


if __name__ == "__main__":
    main()
