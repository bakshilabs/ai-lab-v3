import sys, glob
from PIL import Image, ImageDraw
name = sys.argv[1]; cols = int(sys.argv[2]) if len(sys.argv) > 2 else 2; w = int(sys.argv[3]) if len(sys.argv) > 3 else 900
fs = sorted(glob.glob(f'frames/{name}/still-*.jpg'), key=lambda f: float(f.split('-')[-1][:-4]))
ims = [Image.open(f).resize((w, w * 9 // 16)) for f in fs]
h = w * 9 // 16
S = Image.new('RGB', (cols * w, ((len(ims) + cols - 1) // cols) * h), 'white')
d = ImageDraw.Draw(S)
for i, (f, im) in enumerate(zip(fs, ims)):
    x, y = (i % cols) * w, (i // cols) * h
    S.paste(im, (x, y)); d.rectangle([x, y, x + 120, y + 26], fill='black'); d.text((x + 6, y + 6), f.split('-')[-1][:-4].lstrip('0') + 's', fill='white')
S.save(f'frames/{name}-sheet.jpg', quality=85)
print(f'frames/{name}-sheet.jpg')
