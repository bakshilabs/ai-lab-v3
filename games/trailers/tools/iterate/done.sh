#!/bin/sh
# done.sh <id> <poster-sec>: contact sheet, web-encode, stage into $WEBDIR, update length, shot-list status, rebuild shotlists page ($SHOTHTML)
set -e
cd "$(dirname "$0")/../.."
SP=${WEBDIR:-/tmp/trailer-web}
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 out/$1.mp4)
echo "duration $D"
sh vsheet.sh $1 1.5 5 >/dev/null && cp frames/$1-video.jpg reviews/
nice sh tools/webenc.sh $1 $2
cp web/videos/$1.mp4 $SP/videos/ && cp web/posters/$1.jpg $SP/posters/
L=$(python3 -c "d=float('$D');print('0:%02d'%round(d))")
sed -i "s/\(id: '$1', title: '[^']*', len: \)'[^']*'/\1'$L'/" $SP/index.html
grep -o "id: '$1'[^,]*, [^,]*, len: '[^']*'" $SP/index.html
sed -i "s/Described from the current source; video re-rendering\./Described from the current source; video re-rendered and checked on a contact sheet./" shotlists/$1.md
grep -c "re-rendering" shotlists/$1.md || true
python3 tools/shotlists-page.py ${SHOTHTML:-/tmp/shotlists.html}
cp $SP/index.html web/index.html
