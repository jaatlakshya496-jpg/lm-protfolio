#!/usr/bin/env python3
"""Generate a real 1200x630 OG share image (PNG) for the portfolio."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math, os

W, H = 1200, 630
ACCENT = (43, 228, 168)
ACCENT2 = (74, 168, 255)
INK = (234, 240, 247)
MUTED = (143, 160, 181)
DIM = (91, 107, 130)

img = Image.new("RGB", (W, H), (7, 11, 24))
px = img.load()

# diagonal gradient background
for y in range(H):
    for x in range(0, W, 4):
        t = (x / W * 0.6 + y / H * 0.4)
        r = int(7 + (11 - 7) * t)
        g = int(11 + (18 - 11) * t)
        b = int(24 + (38 - 24) * t)
        for dx in range(4):
            if x + dx < W:
                px[x + dx, y] = (r, g, b)

# glow blobs
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
gd.ellipse([700, -180, 1250, 370], fill=(43, 228, 168, 60))
gd.ellipse([-150, 300, 350, 800], fill=(74, 168, 255, 45))
glow = glow.filter(ImageFilter.GaussianBlur(90))
img = Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB")

d = ImageDraw.Draw(img, "RGBA")

# decorative rings
for r, col in [(260, (43, 228, 168, 70)), (180, (74, 168, 255, 55))]:
    d.ellipse([1050 - r, 120 - r, 1050 + r, 120 + r], outline=col, width=3)

# small star dots
import random
random.seed(7)
for _ in range(60):
    x, y = random.randint(0, W), random.randint(0, H)
    s = random.choice([1, 1, 2])
    d.ellipse([x, y, x + s, y + s], fill=(200, 220, 255, random.randint(40, 120)))

def font(name, size):
    return ImageFont.truetype(os.path.join(r"C:\Windows\Fonts", name), size)

f_eyebrow = font("segoeui.ttf", 30)
f_name = font("segoeuib.ttf", 108)
f_tag = font("segoeuib.ttf", 42)
f_sub = font("segoeui.ttf", 28)
f_dom = font("segoeui.ttf", 24)

def text(x, y, s, f, fill, spacing=6):
    # letter-spaced text
    widths = [d.textlength(ch, font=f) for ch in s]
    total = sum(widths) + spacing * (len(s) - 1)
    cx = x
    for ch, w in zip(s, widths):
        d.text((cx, y), ch, font=f, fill=fill)
        cx += w + spacing
    return total

# eyebrow
text(80, 150, "DIGITAL MARKETER  •  DESIGNER  •  AI WEB", f_eyebrow, MUTED, 8)

# name with gradient-ish two-tone
d.text((78, 215), "Lakshya Malik", font=f_name, fill=INK)
d.text((80, 217), "Lakshya Malik", font=f_name, fill=INK)

# tagline in accent
d.text((82, 350), "Marketing that works, powered by AI", font=f_tag, fill=ACCENT)

# sub + domain
d.text((82, 440), "Barta, Kaithal, Haryana  —  available for freelance", font=f_sub, fill=MUTED)
d.text((82, 500), "lakshya-portfolio.vercel.app", font=f_dom, fill=DIM)

# accent underline bar
d.rounded_rectangle([82, 330, 82 + 520, 336], radius=3, fill=ACCENT)

img.save(r"C:\Users\zed king 5\lm-protfolio\public\og-image.png", "PNG", optimize=True)
print("wrote og-image.png", os.path.getsize(r"C:\Users\zed king 5\lm-protfolio\public\og-image.png"), "bytes")
