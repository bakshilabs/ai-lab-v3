#!/bin/sh
# Re-encode a finished trailer for the web page: tools/webenc.sh <name> <poster-second>
# Writes web/videos/<name>.mp4 (1600x900, about 1.65 Mbps) and web/posters/<name>.jpg.
cd "$(dirname "$0")/.."
mkdir -p web/videos web/posters
ffmpeg -y -loglevel error -i out/$1.mp4 -c:v libx264 -preset slow -b:v 1650k -maxrate 2200k -bufsize 4000k -vf scale=1600:900 -c:a aac -b:a 96k -movflags +faststart web/videos/$1.mp4
ffmpeg -y -loglevel error -ss $2 -i out/$1.mp4 -frames:v 1 -vf scale=960:540 -q:v 4 web/posters/$1.jpg
