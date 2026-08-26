"""
Build DeSite brand icons from public/images/desite-logo.png.

Outputs in public/:
  favicon.ico, favicon-48.png, apple-touch-icon.png, site-logo.png, og-desite.png
Also mirrors the same files into site/ so the reference tree has no leftover SM marks.
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "images" / "desite-logo.png"
OUT_DIRS = [ROOT / "public", ROOT / "site"]
BLUE = (0, 106, 154, 255)  # #006a9a


def knock_out_black(img: Image.Image, threshold: int = 45) -> Image.Image:
    """Make near-black pixels transparent so brand blue shows behind the mark."""
    rgba = img.convert("RGBA")
    pixels = rgba.load()
    w, h = rgba.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if a > 0 and r < threshold and g < threshold and b < threshold:
                pixels[x, y] = (0, 0, 0, 0)
    return rgba


def extract_gear(logo: Image.Image) -> Image.Image:
    """Crop the white gear mark from the left of the DeSite wordmark."""
    rgba = knock_out_black(logo)
    w, h = rgba.size
    # Gear sits in the left portion before the DESITE wordmark.
    crop = rgba.crop((0, 0, int(w * 0.36), h))
    bbox = crop.getbbox()
    if bbox:
        crop = crop.crop(bbox)
    return crop


def on_blue(mark: Image.Image, size: int, pad_ratio: float = 0.16) -> Image.Image:
    """Center a white mark on a solid DeSite-blue square."""
    canvas = Image.new("RGBA", (size, size), BLUE)
    max_side = int(size * (1 - 2 * pad_ratio))
    mw, mh = mark.size
    scale = min(max_side / mw, max_side / mh)
    nw, nh = max(1, int(mw * scale)), max(1, int(mh * scale))
    resized = mark.resize((nw, nh), Image.Resampling.LANCZOS)
    x = (size - nw) // 2
    y = (size - nh) // 2
    canvas.paste(resized, (x, y), resized)
    return canvas


def og_banner(logo: Image.Image, width: int = 1200, height: int = 630) -> Image.Image:
    """Link-share card: full DeSite wordmark centered on brand blue."""
    canvas = Image.new("RGBA", (width, height), BLUE)
    mark = knock_out_black(logo)
    max_w, max_h = int(width * 0.72), int(height * 0.62)
    mw, mh = mark.size
    scale = min(max_w / mw, max_h / mh)
    nw, nh = max(1, int(mw * scale)), max(1, int(mh * scale))
    resized = mark.resize((nw, nh), Image.Resampling.LANCZOS)
    x0 = (width - nw) // 2
    y0 = (height - nh) // 2
    canvas.paste(resized, (x0, y0), resized)
    return canvas


def save_png(img: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    img.convert("RGBA").save(path, format="PNG", optimize=True)
    print(f"Wrote {path} ({img.size[0]}x{img.size[1]})")


def save_ico(canvas: Image.Image, path: Path) -> None:
    """Write a multi-resolution ICO (16/32/48)."""
    sizes = [16, 32, 48]
    # Pillow ICO writer is reliable when given a list via the sizes= of a single save
    # from the largest image with append_images of the rest — but some versions only
    # keep one frame. Build explicitly via IcoImagePlugin-compatible API:
    images = [canvas.resize((s, s), Image.Resampling.LANCZOS) for s in sizes]
    path.parent.mkdir(parents=True, exist_ok=True)
    # Save largest first; include all sizes in `sizes` so each is embedded.
    images[-1].save(
        path,
        format="ICO",
        sizes=[(s, s) for s in sizes],
        append_images=images[:-1],
    )
    # Verify; if only one entry, write manually.
    raw = path.read_bytes()
    count = int.from_bytes(raw[4:6], "little")
    if count < len(sizes):
        _write_ico_manual(images, path)
        raw = path.read_bytes()
        count = int.from_bytes(raw[4:6], "little")
    print(f"Wrote {path} entries={count} sizes={sizes}")


def _write_ico_manual(images: list[Image.Image], path: Path) -> None:
    """Minimal ICO writer embedding PNG payloads (Vista+)."""
    import io
    import struct

    pngs: list[bytes] = []
    for im in images:
        buf = io.BytesIO()
        im.convert("RGBA").save(buf, format="PNG")
        pngs.append(buf.getvalue())

    count = len(images)
    header = struct.pack("<HHH", 0, 1, count)
    dir_size = 16 * count
    offset = 6 + dir_size
    entries = []
    for im, data in zip(images, pngs):
        w, h = im.size
        entries.append(
            struct.pack(
                "<BBBBHHII",
                w if w < 256 else 0,
                h if h < 256 else 0,
                0,
                0,
                1,
                32,
                len(data),
                offset,
            )
        )
        offset += len(data)
    path.write_bytes(header + b"".join(entries) + b"".join(pngs))


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"Missing source logo: {SRC}")

    logo = Image.open(SRC)
    gear = extract_gear(logo)
    base512 = on_blue(gear, 512)

    for out in OUT_DIRS:
        save_png(on_blue(gear, 48), out / "favicon-48.png")
        save_png(on_blue(gear, 180), out / "apple-touch-icon.png")
        save_png(base512, out / "site-logo.png")
        save_png(og_banner(logo), out / "og-desite.png")
        save_ico(base512, out / "favicon.ico")

    print("Done — DeSite icons written to public/ and site/")


if __name__ == "__main__":
    main()
