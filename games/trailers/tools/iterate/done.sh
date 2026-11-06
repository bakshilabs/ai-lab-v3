#!/bin/sh
# done.sh <id> <poster-sec>: contact sheet, web-encode into <repo>/trailers/, update the page's length, shot-list status, rebuild shotlists page
set -e
cd "$(dirname "$0")/../.."
W=../../trailers
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 out/$1.mp4)
echo "duration $D"
sh vsheet.sh $1 1.5 5 >/dev/null && cp frames/$1-video.jpg reviews/
nice sh tools/webenc.sh $1 $2
L=$(python3 -c "d=float('$D');print('0:%02d'%round(d))")
sed -i "s/\(id: '$1', title: '[^']*', len: \)'[^']*'/\1'$L'/" $W/index.html
grep -o "id: '$1'[^,]*, [^,]*, len: '[^']*'" $W/index.html
sed -i "s/Described from the current source; video re-rendering\./Described from the current source; video re-rendered and checked on a contact sheet./" shotlists/$1.md
python3 tools/shotlists-page.py
