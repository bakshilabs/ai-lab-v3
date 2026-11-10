// Splits a one-file voice pack into small chunks, so the game downloads only the lines it is about to say
// (the old 10 MB pack had to arrive whole before Florence's recorded voice could speak).
// Usage: node voice/chunk.mjs [game/voice]     (render.py now writes chunks itself; this converts an old pack)
// Index: { type, chunks: [file names], clips: [[key, chunk, offset, length], …] }; each chunk is about 200 KB.
import fs from 'node:fs'; import path from 'node:path'; import { createHash } from 'node:crypto';
const dir = process.argv[2] || path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'game', 'voice');
const SIZE = 200 * 1024;
for (const f of fs.readdirSync(dir).filter((n) => /^pack-[a-z]+\.json$/.test(n))) {
  const band = f.slice(5, -5); const idx = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  if (!idx.bin) { console.log(band, 'already in chunks'); continue; }
  const buf = fs.readFileSync(path.join(dir, idx.bin)); const chunks = [], clips = []; let cur = [];
  const flush = () => { if (!cur.length) return; const b = Buffer.concat(cur); const name = `pack-${band}-${createHash('sha256').update(b).digest('hex').slice(0, 12)}.bin`; fs.writeFileSync(path.join(dir, name), b); chunks.push(name); cur = []; };
  let at = 0;
  for (const [k, off, len] of idx.clips) { if (at && at + len > SIZE) { flush(); at = 0; } clips.push([k, chunks.length, at, len]); cur.push(buf.subarray(off, off + len)); at += len; }
  flush();
  fs.writeFileSync(path.join(dir, f), JSON.stringify({ type: idx.type || 'audio/mpeg', chunks, clips }));
  fs.rmSync(path.join(dir, idx.bin));
  console.log(band, clips.length, 'clips in', chunks.length, 'chunks');
}
