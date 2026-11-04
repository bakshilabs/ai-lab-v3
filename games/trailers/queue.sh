#!/bin/sh
# render + mux trailers one after another: ./queue.sh name1 name2 ...
cd "$(dirname "$0")"
for n in "$@"; do
  node render.mjs $n > /tmp/q-$n.log 2>&1 && ffmpeg -y -loglevel error -i out/$n-silent.mp4 -i out/$n.wav -c:v copy -c:a aac -b:a 192k -shortest out/$n.mp4 && echo "done $n"
done
