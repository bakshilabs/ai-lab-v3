#!/bin/sh
# contact sheet of a video: one frame every $2 seconds, 6 columns
ffmpeg -y -loglevel error -i out/$1.mp4 -vf "fps=1/${2:-1},scale=320:-1,drawtext=text='%{pts\:hms}':x=4:y=4:fontsize=14:fontcolor=white:box=1:boxcolor=black,tile=6x${3:-7}" -frames:v 1 frames/$1-video.jpg && echo frames/$1-video.jpg
