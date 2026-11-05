"""Export a trained checkpoint to the browser format.

    python export.py [--ckpt checkpoints/plotter.pt] [--outdir ../game/models]

Writes plotter.bin + plotter.json.
  * Every weight MATRIX (embeddings, attention, MLP, head) is int8 with one
    symmetric float32 scale per row: w[r, c] ~= q[r, c] * scale[r], q in [-127, 127].
  * Biases and LayerNorm gains/biases (vectors, ~13 KB in total) stay float32.
plotter.json holds the config, vocab (id order), slot order, the slots of each
level, and for each tensor {name, shape, dtype, offset, scaleOffset} into the bin.
All offsets are 4-byte aligned.
"""
import argparse
import datetime
import json
import os

import numpy as np
import torch

import tokenizer as tk
from train import SCHEMA, SLOTS

HERE = os.path.dirname(os.path.abspath(__file__))


def tensor_order(layers):
    names = ["tok.weight", "pos.weight"]
    for i in range(layers):
        p = f"blocks.{i}."
        names += [p + n for n in ("ln1.weight", "ln1.bias", "qkv.weight", "qkv.bias", "proj.weight", "proj.bias",
                                  "ln2.weight", "ln2.bias", "fc1.weight", "fc1.bias", "fc2.weight", "fc2.bias")]
    names += ["ln_f.weight", "ln_f.bias", "head.weight", "head.bias"]
    return names


def quantise_rows(w):
    """Symmetric per-row int8."""
    amax = np.abs(w).max(axis=1)
    scale = np.where(amax > 0, amax / 127.0, 1.0).astype(np.float32)
    q = np.clip(np.round(w / scale[:, None]), -127, 127).astype(np.int8)
    return q, scale


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--ckpt", default=os.path.join(HERE, "checkpoints", "plotter.pt"))
    ap.add_argument("--outdir", default=os.path.join(HERE, "..", "game", "models"))
    args = ap.parse_args()
    ck = torch.load(args.ckpt, weights_only=False)
    state, cfg, vocab = ck["state"], ck["cfg"], ck["vocab"]
    assert ck["slots"] == SLOTS, "slot order changed since training"

    blob = bytearray()
    tensors = []
    max_err = 0.0

    def align():
        while len(blob) % 4:
            blob.append(0)

    for name in tensor_order(cfg["layers"]):
        w = state[name].float().numpy()
        entry = {"name": name, "shape": list(w.shape)}
        if w.ndim == 2:
            q, s = quantise_rows(w)
            max_err = max(max_err, float(np.abs(q * s[:, None] - w).max()))
            align()
            entry.update(dtype="int8", offset=len(blob))
            blob += q.tobytes()
            align()
            entry["scaleOffset"] = len(blob)
            blob += s.astype("<f4").tobytes()
        else:
            align()
            entry.update(dtype="float32", offset=len(blob))
            blob += w.astype("<f4").tobytes()
        tensors.append(entry)
    align()

    id2tok = [None] * len(vocab)
    for t, i in vocab.items():
        id2tok[i] = t
    meta = {
        "format": "plotter-int8-v1",
        "created": datetime.date.today().isoformat(),
        "config": {**cfg, "activation": "gelu_tanh", "norm": "pre_layernorm", "ln_eps": 1e-5, "pool": "masked_mean",
                   "max_word": tk.MAX_WORD},
        "levels": list(SCHEMA["levels"].keys()),
        "levelSlots": {l: list(d["slots"].keys()) for l, d in SCHEMA["levels"].items()},
        "outputs": SLOTS,
        "unknownIndex": SLOTS.index("unknown"),
        "vocab": id2tok,
        "tensors": tensors,
        "binBytes": len(blob),
        "val": ck.get("val"),
        "params": ck.get("params"),
    }
    os.makedirs(args.outdir, exist_ok=True)
    with open(os.path.join(args.outdir, "plotter.bin"), "wb") as f:
        f.write(blob)
    with open(os.path.join(args.outdir, "plotter.json"), "w") as f:
        json.dump(meta, f, separators=(",", ":"))
    print(f"wrote plotter.bin ({len(blob) / 1e6:.2f} MB), plotter.json; params {ck.get('params'):,}; "
          f"max abs quantisation error {max_err:.5f}")


if __name__ == "__main__":
    main()
