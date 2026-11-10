"""Records every sentence in voice/lines-<band>.json with Kokoro-82M (Apache-2.0) and packs the clips into
game/voice/pack-<band>.json + pack-<band>-<hash>.bin chunks. Narrator: bf_isabella (British). Florence: af_bella.
Needs: pip install kokoro-onnx soundfile; model.onnx + voices.bin from onnx-community/Kokoro-82M-v1.0-ONNX
(see voice/README.md). Clips are cached by key, so re-runs only record new sentences.
Usage: python3 voice/render.py <kokoro_dir> <cache_dir>"""
import hashlib, json, os, subprocess, sys
import soundfile as sf
from kokoro_onnx import Kokoro

here = os.path.dirname(os.path.abspath(__file__))
kdir, cache = sys.argv[1], sys.argv[2]
os.makedirs(cache, exist_ok=True)
k = Kokoro(os.path.join(kdir, 'model.onnx'), os.path.join(kdir, 'voices.bin'))
VOICES = {'narrator': ('bf_isabella', 'en-gb', 0.95), 'helper': ('af_bella', 'en-us', 1.0)}
# words Kokoro says better spelled another way (display text is unchanged)
SAY = {'Florence’s': "Florence's", '°C': ' degrees', ' t ': ' tonnes ', 'cr ': 'credits ', '8–12': '8 to 12', '13–17': '13 to 17', '→': ' to ', '–': ', ', '—': ', ', '“': '', '”': '', '‘': "'", '’': "'"}
out = os.path.join(here, '..', 'game', 'voice'); os.makedirs(out, exist_ok=True)
for band in ('junior', 'senior'):
    lines = json.load(open(os.path.join(here, f'lines-{band}.json')))
    # clips go into chunks of about 200 KB, so the game fetches only the lines it is about to say
    SIZE = 200 * 1024; chunks = []; clips = []; cur = bytearray(); total = 0
    def flush():
        global cur
        if not cur: return
        name = f'pack-{band}-{hashlib.sha256(cur).hexdigest()[:12]}.bin'; open(os.path.join(out, name), 'wb').write(cur); chunks.append(name); cur = bytearray()
    for i, ln in enumerate(lines):
        mp3 = os.path.join(cache, ln['key'] + '.mp3')
        if not os.path.exists(mp3):
            text = ln['s']
            for a, b in SAY.items(): text = text.replace(a, b)
            v, lang, speed = VOICES[ln['voice']]
            audio, sr = k.create(text, voice=v, speed=speed, lang=lang)
            wav = mp3[:-4] + '.wav'; sf.write(wav, audio, sr)
            subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', wav, '-ac', '1', '-b:a', '40k', mp3], check=True); os.remove(wav)
        data = open(mp3, 'rb').read(); total += len(data)
        if cur and len(cur) + len(data) > SIZE: flush()
        clips.append([ln['key'], len(chunks), len(cur), len(data)]); cur += data
        if i % 50 == 0: print(band, i, '/', len(lines), flush=True)
    flush()
    for f in os.listdir(out):
        if f.startswith(f'pack-{band}-') and f.endswith('.bin') and f not in chunks: os.remove(os.path.join(out, f))
    json.dump({'type': 'audio/mpeg', 'chunks': chunks, 'clips': clips}, open(os.path.join(out, f'pack-{band}.json'), 'w'))
    blob = range(total)
    print(band, len(clips), 'clips,', round(len(blob) / 1e6, 1), 'MB')
