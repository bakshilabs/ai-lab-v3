# render queue daemon: renders names appended to rq.txt, one at a time
S=${QDIR:-/tmp/trailer-queue}
cd "$(dirname "$0")/../.."
touch $S/rq.txt $S/rq.done
while true; do
  while pgrep -f "r1[0-9].sh" >/dev/null; do sleep 20; done
  n=$(grep -vxF -f $S/rq.done $S/rq.txt | head -1)
  if [ -n "$n" ]; then
    python3 audio.py $n >/dev/null 2>&1
    node render.mjs $n > /tmp/q-$n.log 2>&1 && ffmpeg -y -loglevel error -i out/$n-silent.mp4 -i out/$n.wav -c:v copy -c:a aac -b:a 192k -shortest out/$n.mp4 && echo "rq $n" >> /tmp/master.log || echo "rqfail $n" >> /tmp/master.log
    echo $n >> $S/rq.done
  else sleep 30; fi
done
