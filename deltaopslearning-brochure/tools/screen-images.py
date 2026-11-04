"""Lighter copies of the images for the digital (email) PDF, about 150 to 200 dpi at their
placed sizes. Run after changing anything in img/. Needs Pillow.
Usage: python tools/screen-images.py"""
import os, glob
from PIL import Image
root = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'img')
os.makedirs(os.path.join(root, 'screen'), exist_ok=True)
for f in sorted(glob.glob(os.path.join(root, '*.png')) + glob.glob(os.path.join(root, '*.jpg'))):
    im = Image.open(f); w, h = im.size
    k = 0.55 if w > 1000 else 0.7
    im = im.resize((round(w * k), round(h * k)), Image.LANCZOS)
    out = os.path.join(root, 'screen', os.path.basename(f))
    if f.endswith('.png'): im.save(out, optimize=True)
    else: im.convert('RGB').save(out, quality=84, optimize=True)
    print(os.path.basename(f), im.size, os.path.getsize(out) // 1024, 'KB')
