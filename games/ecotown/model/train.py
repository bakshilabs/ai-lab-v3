"""Train the Plotter encoder on CPU.

    python train.py [--data data] [--out checkpoints] [--epochs 14]

Model: token + learned position embeddings -> N pre-LayerNorm transformer
blocks (multi-head self-attention, GELU-tanh MLP) -> final LayerNorm ->
masked mean pool -> one linear head with a sigmoid per output.
Outputs are the union of all levels' slots plus 'unknown'. The loss for an
example only covers its own level's slots + unknown (other levels' outputs are
masked), and at inference the game only reads that level's outputs.
"""
import argparse
import json
import math
import os
import random
import time

import torch
import torch.nn as nn
import torch.nn.functional as F

import tokenizer as tk

HERE = os.path.dirname(os.path.abspath(__file__))
SCHEMA = json.load(open(os.path.join(HERE, "..", "game", "js", "ai", "schema.json")))
LEVELS = list(SCHEMA["levels"].keys())
SLOTS = [s for l in LEVELS for s in SCHEMA["levels"][l]["slots"]] + ["unknown"]
SLOT_IX = {s: i for i, s in enumerate(SLOTS)}
UNK_IX = SLOT_IX["unknown"]


def level_mask(level):
    m = torch.zeros(len(SLOTS))
    for s in SCHEMA["levels"][level]["slots"]:
        m[SLOT_IX[s]] = 1
    m[UNK_IX] = 1
    return m


LEVEL_MASK = {l: level_mask(l) for l in LEVELS}


# ------------------------------------------------------------------ model
class Block(nn.Module):
    def __init__(self, d, heads, ff, drop):
        super().__init__()
        self.h = heads
        self.ln1 = nn.LayerNorm(d)
        self.qkv = nn.Linear(d, 3 * d)
        self.proj = nn.Linear(d, d)
        self.ln2 = nn.LayerNorm(d)
        self.fc1 = nn.Linear(d, ff)
        self.fc2 = nn.Linear(ff, d)
        self.drop = nn.Dropout(drop)

    def forward(self, x, key_pad):            # x: B,T,d ; key_pad: B,T (True = pad)
        B, T, d = x.shape
        q, k, v = self.qkv(self.ln1(x)).view(B, T, 3, self.h, d // self.h).permute(2, 0, 3, 1, 4)
        att = (q @ k.transpose(-1, -2)) / math.sqrt(d // self.h)
        att = att.masked_fill(key_pad[:, None, None, :], -1e9).softmax(-1)
        y = (self.drop(att) @ v).transpose(1, 2).reshape(B, T, d)
        x = x + self.drop(self.proj(y))
        x = x + self.drop(self.fc2(F.gelu(self.fc1(self.ln2(x)), approximate="tanh")))
        return x


class Plotter(nn.Module):
    def __init__(self, vocab_size, d=160, layers=3, heads=4, ff=640, max_len=tk.MAX_LEN, n_out=len(SLOTS), drop=0.1):
        super().__init__()
        self.cfg = dict(vocab_size=vocab_size, d=d, layers=layers, heads=heads, ff=ff, max_len=max_len, n_out=n_out)
        self.tok = nn.Embedding(vocab_size, d)
        self.pos = nn.Embedding(max_len, d)
        self.blocks = nn.ModuleList([Block(d, heads, ff, drop) for _ in range(layers)])
        self.ln_f = nn.LayerNorm(d)
        self.head = nn.Linear(d, n_out)
        self.drop = nn.Dropout(drop)
        nn.init.normal_(self.tok.weight, std=0.05)
        nn.init.normal_(self.pos.weight, std=0.02)

    def embed(self, ids, pad):
        T = ids.shape[1]
        x = self.drop(self.tok(ids) + self.pos(torch.arange(T)[None]))
        for b in self.blocks:
            x = b(x, pad)
        x = self.ln_f(x)
        keep = (~pad).float()[..., None]
        return (x * keep).sum(1) / keep.sum(1).clamp(min=1)

    def forward(self, ids, pad):
        return self.head(self.embed(ids, pad))


# ------------------------------------------------------------------ data
def load_rows(path):
    return [json.loads(l) for l in open(path)]


def target(r):
    y = torch.zeros(len(SLOTS))
    for s in r["labels"]:
        y[SLOT_IX[s]] = 1
    y[UNK_IX] = r["unknown"]
    return y


def batches(rows, vocab, bs, shuffle, rng, unk_drop=0.0):
    idx = list(range(len(rows)))
    if shuffle:
        rng.shuffle(idx)
    for i in range(0, len(idx), bs):
        chunk = [rows[j] for j in idx[i:i + bs]]
        seqs = [r["_ids"] for r in chunk]
        if unk_drop:
            u = vocab["[UNK]"]
            seqs = [[s[0]] + [u if rng.random() < unk_drop else t for t in s[1:]] for s in seqs]
        T = max(len(s) for s in seqs)
        ids = torch.zeros(len(seqs), T, dtype=torch.long)
        pad = torch.ones(len(seqs), T, dtype=torch.bool)
        for k, s in enumerate(seqs):
            ids[k, :len(s)] = torch.tensor(s)
            pad[k, :len(s)] = False
        y = torch.stack([r["_y"] for r in chunk])
        m = torch.stack([LEVEL_MASK[r["level"]] for r in chunk])
        yield ids, pad, y, m, chunk


def prepare(rows, vocab):
    for r in rows:
        r["_ids"] = tk.encode(r["level"], r["text"], vocab)
        r["_y"] = target(r)
    return rows


@torch.no_grad()
def predict_rows(model, rows, vocab, bs=512):
    model.eval()
    out = []
    for ids, pad, y, m, _ in batches(rows, vocab, bs, False, None):
        out.append(torch.sigmoid(model(ids, pad)) * m)
    return torch.cat(out) if out else torch.zeros(0, len(SLOTS))


def metrics(probs, rows, thr=0.5):
    """micro F1 over in-domain slot labels; unknown recall / FPR."""
    tp = fp = fn = 0
    unk_tp = unk_n = unk_fp = dom_n = 0
    for p, r in zip(probs, rows):
        pu = p[UNK_IX].item() >= thr
        if r["unknown"]:
            unk_n += 1
            unk_tp += pu
            continue
        dom_n += 1
        unk_fp += pu
        pred = {SLOTS[i] for i in range(UNK_IX) if p[i] >= thr}
        gold = set(r["labels"])
        tp += len(pred & gold)
        fp += len(pred - gold)
        fn += len(gold - pred)
    f1 = 2 * tp / max(1, 2 * tp + fp + fn)
    return dict(f1=f1, unk_recall=unk_tp / max(1, unk_n), unk_fpr=unk_fp / max(1, dom_n), n=len(rows))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--data", default=os.path.join(HERE, "data"))
    ap.add_argument("--out", default=os.path.join(HERE, "checkpoints"))
    ap.add_argument("--epochs", type=int, default=14)
    ap.add_argument("--bs", type=int, default=128)
    ap.add_argument("--lr", type=float, default=1e-3)
    ap.add_argument("--d", type=int, default=160)
    ap.add_argument("--layers", type=int, default=3)
    ap.add_argument("--seed", type=int, default=7)
    args = ap.parse_args()
    torch.manual_seed(args.seed)
    torch.set_num_threads(4)
    rng = random.Random(args.seed)

    train = load_rows(os.path.join(args.data, "train.jsonl"))
    val = load_rows(os.path.join(args.data, "val.jsonl"))
    vocab = tk.build_vocab([r["text"] for r in train], LEVELS)
    print(f"vocab {len(vocab)}  train {len(train)}  val {len(val)}")
    prepare(train, vocab)
    prepare(val, vocab)

    model = Plotter(len(vocab), d=args.d, layers=args.layers, heads=4, ff=4 * args.d)
    n_params = sum(p.numel() for p in model.parameters())
    print(f"params {n_params:,}")
    decay = [p for n, p in model.named_parameters() if p.dim() >= 2]
    no_decay = [p for n, p in model.named_parameters() if p.dim() < 2]
    opt = torch.optim.AdamW([{"params": decay, "weight_decay": 0.01}, {"params": no_decay, "weight_decay": 0}],
                            lr=args.lr)
    steps = args.epochs * math.ceil(len(train) / args.bs)
    warm = 300
    sched = torch.optim.lr_scheduler.LambdaLR(
        opt, lambda s: min(1, (s + 1) / warm) * 0.5 * (1 + math.cos(math.pi * min(1, s / steps))))

    os.makedirs(args.out, exist_ok=True)
    best, t0 = -1, time.time()
    for ep in range(args.epochs):
        model.train()
        tot = nb = 0
        for ids, pad, y, m, _ in batches(train, vocab, args.bs, True, rng, unk_drop=0.04):
            logits = model(ids, pad)
            loss = (F.binary_cross_entropy_with_logits(logits, y, reduction="none") * m).sum() / m.sum()
            opt.zero_grad()
            loss.backward()
            torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
            opt.step()
            sched.step()
            tot += loss.item()
            nb += 1
        mt = metrics(predict_rows(model, val, vocab), val)
        score = mt["f1"] + mt["unk_recall"] - mt["unk_fpr"]
        print(f"ep {ep + 1:2d} loss {tot / nb:.4f}  val f1 {mt['f1']:.4f} unkR {mt['unk_recall']:.4f} "
              f"unkFPR {mt['unk_fpr']:.4f}  {time.time() - t0:.0f}s", flush=True)
        if score > best:
            best = score
            torch.save({"state": model.state_dict(), "cfg": model.cfg, "vocab": vocab, "slots": SLOTS,
                        "val": mt, "epoch": ep + 1, "params": n_params}, os.path.join(args.out, "plotter.pt"))
    print(f"best val score {best:.4f}; saved {os.path.join(args.out, 'plotter.pt')}")


if __name__ == "__main__":
    main()
