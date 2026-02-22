# Image & Video Loading — Performance Advisory

**Current total:** ~**44 MB** of images + video on first load path (LCP + hero + gallery + sections).  
**Target:** Get **images + video under ~5–8 MB** for a fast LCP and good Core Web Vitals.

---

## 1. Current asset audit (what the live site uses)

| Asset | Size | Role | Priority |
|-------|------|------|----------|
| `heroproductimages/COVER_01.png` | **4.9 MB** | LCP + poster | **Critical** |
| `heroproductimages/hf_20260218_070619_*.png` | **6.8 MB** | Gallery slide 2 | High |
| `heroproductimages/hf_20260222_045552_*.png` | **5.0 MB** | Gallery slide 4 | High |
| `heroproductimages/hf_20260222_045312_*.jpeg` | 2.2 MB | Gallery slide 3 | High |
| `heroproductimages/hf_20260222_045611_*.jpeg` | 2.4 MB | Gallery slide 5 | High |
| `hf_20260218_064519_*.png` (root) | **7.5 MB** | Recipe section | High |
| `hf_20260218_062913_*.png` (root) | **6.9 MB** | Botanical section | High |
| `assets/images/herba-starter.jpeg` | **2.8 MB** | Cart add-on, bundle | Medium |
| `assets/images/lauren-conrad.png` | 644 KB | Testimonial | Low |
| `assets/images/expert-2.png` | 360 KB | Expert | Low |
| `assets/images/expert-3.png` | 300 KB | Expert | Low |
| `assets/images/alison-roman.png` | 200 KB | Testimonial | Low |
| `assets/images/joanna-gaines.png` | 172 KB | Testimonial | Low |
| `assets/images/expert-1.png` | 100 KB | Expert | Low |
| `assets/images/marie-clark-author.png` | 96 KB | Author | Low |
| `video/Hero_Video_1920x1080_HB.mp4` | **4.1 MB** | Hero video | **Critical** (deferred) |

**Issues:**
- **LCP image is 4.9 MB PNG** — way too heavy; should be &lt; 200–400 KB.
- **Gallery and section PNGs are 5–7 MB each** — must be compressed and/or converted.
- **Two large PNGs are referenced from document root** (`hf_20260218_064519_*.png`, `hf_20260218_062913_*.png`) — fix paths and compress.
- **Hero video 4.1 MB** — acceptable if deferred (you already do), but compressing to ~1–2 MB will help.
- **herba-starter.jpeg 2.8 MB** for a small thumbnail — overkill.

---

## 2. What must be done (compression & optimization)

### 2.1 Compress every image

- **LCP + poster:** `COVER_01.png`  
  - **Must:** Convert to **WebP** (and optionally AVIF), compress. Aim **&lt; 300 KB** for the main variant. Keep a JPEG/PNG fallback if you need old-browser support.
- **Hero gallery (heroproductimages/):**  
  - **Must:** Compress and convert to **WebP**. Display size is ~600×800; source files are far larger. Aim **&lt; 150–300 KB per image**.
- **Section images (root `hf_*.png`):**  
  - **Must:** Move into a folder (e.g. `assets/images/sections/`), compress, convert to WebP. Aim **&lt; 200–400 KB** each for 1200px-wide use.
- **assets/images/ (experts, testimonials, herba-starter):**  
  - **Must:** Compress; photos → **WebP or quality ~80 JPEG**. Thumbnails (e.g. herba-starter at 120×120) should be **&lt; 30 KB** (use a dedicated small crop/scale).

Use the same **compression pipeline** for all: e.g. Squoosh (manual), ImageOptim (Mac), or the provided **Node script** (see below).

### 2.2 Video: compress and optionally offer multiple qualities

- **Must:** Re-encode `Hero_Video_1920x1080_HB.mp4`:
  - **Resolution:** Keep 1920×1080 or add a **720p** (1280×720) variant for mobile/slow networks.
  - **Bitrate:** Target **1–2 Mbps** for 1080p; 720p can be **0.5–1 Mbps**.  
  - **Result:** Get file from **~4.1 MB** down to **~1–2 MB** (1080p) without visible quality loss (use two-pass if possible).
- **Optional:** Serve 720p on small viewports via `<source>` with `media="(max-width: 768px)"` and a second, smaller file.
- **Optional:** Add **WebM** (VP9) as first `<source>` for better compression in supporting browsers.

Tools: **FFmpeg** (free), HandBrake, or cloud encoders. Example FFmpeg (run from project root):

```bash
# 1080p, ~1.5 Mbps, good quality
ffmpeg -i video/Hero_Video_1920x1080_HB.mp4 -c:v libx264 -b:v 1.5M -maxrate 2M -bufsize 3M -movflags +faststart -an video/Hero_Video_1920x1080_HB_opt.mp4

# 720p for mobile (optional)
ffmpeg -i video/Hero_Video_1920x1080_HB.mp4 -vf scale=1280:720 -c:v libx264 -b:v 800k -maxrate 1.2M -movflags +faststart -an video/Hero_Video_720p_opt.mp4
```

Use **`-movflags +faststart`** so the video can start playing before the file is fully downloaded.

---

## 3. Responsive images (after compression)

- **LCP:** Use `<picture>` with WebP (and AVIF if you want) + fallback; add **srcset** for 1x/2x or width-based (e.g. 600w, 1200w) so mobile doesn’t download a 1200px image.
- **Gallery:** Same idea: `srcset` with **600w** (and 1200w for retina) so the browser picks the right file.
- **Section images (1200×1600, 1200×789):** Provide **600w / 1200w** (and WebP) so small screens get smaller files.

Example pattern (after you have WebP + fallbacks):

```html
<picture>
  <source type="image/webp" srcset="heroproductimages/COVER_01-600w.webp 600w, heroproductimages/COVER_01-1200w.webp 1200w" sizes="(max-width: 640px) 100vw, 600px">
  <img src="heroproductimages/COVER_01-600.jpg" alt="..." width="600" height="800" loading="eager" fetchpriority="high" decoding="async">
</picture>
```

---

## 4. Loading behavior (already in place — keep it)

- **LCP:** Preload + `loading="eager"` + `fetchpriority="high"` on the first image.
- **Hero video:** No `src` in HTML; load via JS after first paint; `poster` from LCP image; `preload="metadata"`.
- **Other images:** `loading="lazy"`, `decoding="async"`, `fetchpriority="low"` where appropriate.
- **Fix paths:** The two `hf_*.png` files in the **document root** should live in one folder (e.g. `assets/images/sections/`) and paths in HTML updated so deployment and caching are consistent.

---

## 5. Summary checklist

| Task | Must / Should |
|------|----------------|
| Compress **COVER_01.png** and convert to WebP (LCP &lt; 300 KB) | **Must** |
| Compress all **heroproductimages/** and convert to WebP | **Must** |
| Compress **root hf_*.png**, move to `assets/images/sections/`, fix paths | **Must** |
| Compress **herba-starter.jpeg** and other **assets/images/** | **Must** |
| Re-encode **Hero_Video_1920x1080_HB.mp4** (target 1–2 MB) | **Must** |
| Add **responsive srcset** (and `<picture>` for WebP) for LCP and gallery | **Should** |
| Optional: 720p video variant + WebM for hero | Optional |
| Optional: AVIF for LCP for supporting browsers | Optional |

After compression and responsive images, total image + video payload should drop from **~44 MB** to roughly **~5–8 MB** (with only LCP + poster + first few assets in the critical path), which will significantly improve LCP and overall performance.

---

## 6. Compression script (Node)

Run from project root:

```bash
npm install
npm run compress-images
```

This writes **WebP + JPEG/PNG fallbacks** into **`optimized/`** (heroproductimages, assets/images, sections for the two root `hf_*.png` files). After that:

1. Replace originals with the contents of `optimized/` (or point the HTML to `optimized/`).
2. Update `roherb-landing-v4.html` to use **`<picture>`** and **srcset** for the LCP and gallery images as in section 3.
3. Move the two section PNGs from root into e.g. `assets/images/sections/` and fix their `src` in the HTML.
