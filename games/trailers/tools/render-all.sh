#!/bin/sh
# Render every trailer from source, one at a time (each needs about 1-3 GB RAM and 10-50 min on 4 CPU cores).
# Usage: tools/render-all.sh [name ...]   (default: all trailers)
cd "$(dirname "$0")/.."
N="${*:-tycoon2 dash bloxel mcquiz city kart ecotown eco mission museum mars robotaxi pitcrew blocks tycoon quiz signal}"
for n in $N; do
  python3 audio.py $n && node render.mjs $n > /tmp/render-$n.log 2>&1 && \
  ffmpeg -y -loglevel error -i out/$n-silent.mp4 -i out/$n.wav -c:v copy -c:a aac -b:a 192k -shortest out/$n.mp4 && echo "done $n"
done
