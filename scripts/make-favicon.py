from pathlib import Path

from PIL import Image

src = Path(
    r"C:\Users\i_los\.cursor\projects\c-GitHub-proscreenaustralia\assets\psa-favicon-source.png"
)
out = Path(r"C:\GitHub\proscreenaustralia\public")
img = Image.open(src).convert("RGBA")

w, h = img.size
side = max(w, h)
canvas = Image.new("RGBA", (side, side), (0, 106, 154, 255))  # #006a9a
canvas.paste(img, ((side - w) // 2, (side - h) // 2), img)


def save_png(size: int, name: str) -> Image.Image:
    resized = canvas.resize((size, size), Image.Resampling.LANCZOS)
    path = out / name
    resized.save(path, format="PNG", optimize=True)
    print(f"Wrote {path} ({size}x{size})")
    return resized


save_png(48, "favicon-48.png")
save_png(180, "apple-touch-icon.png")
save_png(512, "site-logo.png")

ico_sizes = [16, 32, 48]
ico_images = [canvas.resize((s, s), Image.Resampling.LANCZOS) for s in ico_sizes]
ico_path = out / "favicon.ico"
ico_images[0].save(
    ico_path,
    format="ICO",
    sizes=[(s, s) for s in ico_sizes],
    append_images=ico_images[1:],
)
print(f"Wrote {ico_path}")
print("Done")
