"""Synthesise a trailer soundtrack (music bed + sound effects) from a JSON cue sheet.
Usage: python3 audio.py <trailer>   (reads <trailer>/audio.json, writes out/<trailer>.wav)

audio.json: {"dur": 42, "bpm": 100, "root": 57,
  "sections": [{"t": 0, "chords": [[0,4,7],[5,9,12]], "energy": 0.3, "minor": false}, ...],
  "sfx": [{"t": 1.0, "type": "pop"}, ...], "end": 41.0}
energy 0 = pad only, 0.3 = + arp, 0.6 = + kick/hat, 0.9 = + bass + lead sparkle
"""
import json, sys, numpy as np, wave

SR = 48000
name = sys.argv[1]
cfg = json.load(open(f'{name}/audio.json'))
dur = cfg['dur']; N = int(SR * dur)
L = np.zeros(N); R = np.zeros(N)
bpm = cfg.get('bpm', 100); beat = 60 / bpm
root = cfg.get('root', 57)
rng = np.random.default_rng(7)

def f(m): return 440 * 2 ** ((m - 69) / 12)
def env(n, a=0.01, d=0.2, s=0.6, r=0.3, hold=None):
    t = np.arange(n) / SR
    hold = hold if hold is not None else n / SR - r
    e = np.where(t < a, t / a, np.where(t < a + d, 1 - (1 - s) * (t - a) / d, s))
    e = np.where(t > hold, e * np.clip(1 - (t - hold) / r, 0, 1), e)
    return e
def add(sig, t0, pan=0.0, gain=1.0):
    i = int(t0 * SR)
    if i >= N: return
    sig = sig[: N - i]
    L[i:i + len(sig)] += sig * gain * (1 - pan) / 2 * 2 ** 0.5
    R[i:i + len(sig)] += sig * gain * (1 + pan) / 2 * 2 ** 0.5

def pad(notes, t0, length, vol):
    n = int(length * SR); t = np.arange(n) / SR
    s = np.zeros(n)
    for m in notes:
        for det in (-0.08, 0.0, 0.07):
            fr = f(m) * 2 ** (det / 12)
            s += np.sin(2 * np.pi * fr * t + rng.random() * 6) * 0.5 + 0.18 * np.sin(4 * np.pi * fr * t)
    s *= env(n, a=min(0.6, length / 3), d=0.3, s=0.9, r=min(0.8, length / 3)) / (len(notes) * 3)
    add(s, t0, rng.uniform(-0.3, 0.3), vol)
def pluck(m, t0, vol, pan=0.0, dec=6.0):
    n = int(0.9 * SR); t = np.arange(n) / SR
    fr = f(m)
    s = (np.sin(2 * np.pi * fr * t) + 0.4 * np.sin(4 * np.pi * fr * t) + 0.15 * np.sin(6 * np.pi * fr * t)) * np.exp(-dec * t)
    add(s * 0.5, t0, pan, vol)
def kick(t0, vol):
    n = int(0.35 * SR); t = np.arange(n) / SR
    fr = 120 * np.exp(-18 * t) + 42
    s = np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-9 * t)
    add(s, t0, 0, vol)
def hat(t0, vol):
    n = int(0.06 * SR); s = rng.standard_normal(n) * np.exp(-np.arange(n) / SR * 70)
    s = np.diff(s, prepend=0)
    add(s * 0.25, t0, 0.3, vol)
def bass(m, t0, length, vol):
    n = int(length * SR); t = np.arange(n) / SR
    s = np.sin(2 * np.pi * f(m) * t) + 0.3 * np.sin(4 * np.pi * f(m) * t)
    add(s * env(n, 0.01, 0.1, 0.7, 0.08) * 0.6, t0, 0, vol)

# ---------- music ----------
secs = cfg['sections']; end = cfg.get('end', dur - 0.5)
for si, sec in enumerate(secs):
    t0 = sec['t']; t1 = secs[si + 1]['t'] if si + 1 < len(secs) else end
    E = sec.get('energy', 0.3); chords = sec['chords']; bar = 4 * beat
    k = 0; t = t0
    while t < t1 - 0.05:
        ln = min(bar * sec.get('bars_per_chord', 1), t1 - t)
        ch = chords[k % len(chords)]
        base = root + sec.get('shift', 0)
        pad([base + c for c in ch], t, ln + 0.4, 0.22 + 0.1 * E)
        if E >= 0.25:
            step = beat / 2
            arp = [base + 12 + c for c in ch] + [base + 24 + ch[0]]
            j = 0; tt = t
            while tt < t + ln - 0.01:
                pluck(arp[j % len(arp)], tt, 0.10 + 0.08 * E, pan=0.4 * np.sin(j), dec=5 + 4 * (1 - E))
                j += 1; tt += step
        if E >= 0.55:
            tt = t
            while tt < t + ln - 0.01:
                kick(tt, 0.55 * E)
                hat(tt + beat / 2, 0.5 * E)
                tt += beat
        if E >= 0.8:
            tt = t
            while tt < t + ln - 0.01:
                bass(base - 12 + ch[0], tt, beat * 0.9, 0.35)
                tt += beat
        t += ln; k += 1

# ---------- sfx ----------
def noise_sweep(t0, length, up=True, vol=0.3):
    n = int(length * SR); x = rng.standard_normal(n)
    # crude band sweep via moving average with changing width
    out = np.zeros(n); acc = 0.0
    for i in range(0, n, 64):
        k = i / n; a = (0.02 + 0.5 * (k if up else 1 - k))
        seg = x[i:i + 64]
        for j in range(len(seg)):
            acc = acc + a * (seg[j] - acc); out[i + j] = acc
    e = np.sin(np.pi * np.linspace(0, 1, n)) ** 2
    add(out * e * 0.8, t0, 0, vol)
def tone(t0, freqs, length, vol, dec=8, wave_='sine'):
    n = int(length * SR); t = np.arange(n) / SR; s = np.zeros(n)
    for fr in freqs:
        if wave_ == 'square': s += np.sign(np.sin(2 * np.pi * fr * t)) * 0.3
        else: s += np.sin(2 * np.pi * fr * t)
    add(s * np.exp(-dec * t) / len(freqs), t0, 0, vol)
def sfx(e):
    t, ty = e['t'], e['type']; v = e.get('vol', 1.0)
    if ty == 'whoosh': noise_sweep(t - 0.25, 0.5, True, 0.25 * v)
    elif ty == 'pop': tone(t, [880, 1320], 0.18, 0.18 * v, dec=22)
    elif ty == 'tap': tone(t, [1500], 0.06, 0.2 * v, dec=60)
    elif ty == 'error': tone(t, [196, 207], 0.45, 0.3 * v, dec=5, wave_='square')
    elif ty == 'chime':
        for i, m in enumerate([76, 79, 84]): tone(t + i * 0.09, [f(m)], 0.9, 0.16 * v, dec=4)
    elif ty == 'success':
        for i, m in enumerate([72, 76, 79, 84, 88]): tone(t + i * 0.07, [f(m), f(m + 12) * 0.5], 1.0, 0.14 * v, dec=3.5)
    elif ty == 'brake': noise_sweep(t, 0.45, False, 0.22 * v); tone(t, [620, 680], 0.3, 0.06 * v, dec=6)
    elif ty == 'blip': tone(t, [660], 0.1, 0.12 * v, dec=30)
    elif ty == 'boom':
        kick(t, 0.9 * v); noise_sweep(t, 1.2, False, 0.2 * v)
    elif ty == 'riser': noise_sweep(t, e.get('len', 1.5), True, 0.3 * v)
    elif ty == 'coin': tone(t, [988], 0.08, 0.12 * v, dec=40); tone(t + 0.07, [1319], 0.25, 0.12 * v, dec=14)
    elif ty == 'thud': kick(t, 0.6 * v)
    elif ty == 'crowd':
        n = int(1.6 * SR); x = rng.standard_normal(n); acc = 0; out = np.zeros(n)
        for i in range(n): acc += 0.08 * (x[i] - acc); out[i] = acc
        add(out * np.sin(np.pi * np.linspace(0, 1, n)) * 3, t, 0, 0.35 * v)
for e in cfg.get('sfx', []): sfx(e)

# ---------- master ----------
fade_in = cfg.get('fade_in', 0.6)
mix = np.stack([L, R], 1)
tt = np.arange(N) / SR
g = np.clip(tt / fade_in, 0, 1) * np.clip((dur - tt) / 1.2, 0, 1)
mix *= g[:, None]
peak = np.max(np.abs(mix)) + 1e-9
mix = np.tanh(mix / peak * 1.4) * 0.85
out = (mix * 32767).astype(np.int16)
with wave.open(f'out/{name}.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(out.tobytes())
print(f'out/{name}.wav')
