"""Records the story episodes' lines with Kokoro-82M (the same model as the game's read-aloud voices).
Called by game/tests/video/episodes.mjs, which writes the list of lines first.
Usage: python3 voice/episodes.py <kokoro_dir> <work_dir> <lines.json> <timing.json>
  <kokoro_dir>: model.onnx and a voices file (voices-all.bin or voices.bin, an .npz of the voice arrays)
  <lines.json>: [{ key, voice, lang, speed, pitch, text }]   (pitch 1.1 = a little higher, for the two children)
Writes <work_dir>/voice/<key>.wav (24 kHz mono, levelled) and <timing.json> { key: seconds }.
Clips are cached by voice and text, so a re-run only records lines that changed."""
import hashlib, json, os, subprocess, sys
import numpy as np
import soundfile as sf

kdir, work, lines_path, timing_path = sys.argv[1:5]
lines = json.load(open(lines_path))
cache = os.path.join(work, 'voice-cache'); out = os.path.join(work, 'voice')
os.makedirs(cache, exist_ok=True); os.makedirs(out, exist_ok=True)
k = None
timing = {}
for ln in lines:
    h = hashlib.sha1(json.dumps([ln['voice'], ln['lang'], ln['speed'], ln.get('pitch', 1), ln['text']]).encode()).hexdigest()[:16]
    wav = os.path.join(cache, h + '.wav')
    if not os.path.exists(wav):
        if k is None:
            from kokoro_onnx import Kokoro
            vf = next(p for p in (os.path.join(kdir, n) for n in ('voices-all.bin', 'voices.bin')) if os.path.exists(p))
            k = Kokoro(os.path.join(kdir, 'model.onnx'), vf)
        audio, sr = k.create(ln['text'], voice=ln['voice'], speed=ln['speed'], lang=ln['lang'])
        audio = np.asarray(audio, dtype=np.float32)
        # trim silence at both ends (keep 40 ms), then level every clip to the same loudness
        loud = np.where(np.abs(audio) > 0.01)[0]
        if len(loud): audio = audio[max(0, loud[0] - int(0.04 * sr)): min(len(audio), loud[-1] + int(0.08 * sr))]
        rms = float(np.sqrt(np.mean(audio ** 2))) or 1e-6
        audio = audio * min(0.09 / rms, 0.89 / float(np.max(np.abs(audio))))
        raw = wav[:-4] + '.raw.wav'; sf.write(raw, audio, sr)
        p = float(ln.get('pitch', 1))
        af = f'asetrate={int(sr * p)},aresample={sr},atempo={1 / p:.5f}' if abs(p - 1) > 1e-3 else 'anull'
        subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', raw, '-af', af, '-ar', str(sr), '-ac', '1', wav], check=True); os.remove(raw)
        print('recorded', ln['key'], ln['voice'], flush=True)
    data, sr = sf.read(wav)
    sf.write(os.path.join(out, ln['key'] + '.wav'), data, sr)
    timing[ln['key']] = round(len(data) / sr, 3)
json.dump(timing, open(timing_path, 'w'), indent=0, sort_keys=True)
print(len(timing), 'lines,', round(sum(timing.values()), 1), 's of speech')
