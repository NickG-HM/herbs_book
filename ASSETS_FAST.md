# Asset loading optimizations (applied)

This document summarizes what was done so **all assets load super fast**, and optional next steps.

## Applied in `roherb-landing-v4.html`

1. **Non-blocking fonts**  
   Google Fonts CSS is loaded with `rel="preload"` and applied asynchronously so it doesn’t block first paint.

2. **Resource hints**  
   - `preconnect` to `fonts.googleapis.com` and `fonts.gstatic.com`  
   - `dns-prefetch` for the same origins  
   - `preload` for the LCP image (`heroproductimages/COVER_01.png`)

3. **Hero video**  
   - No `src` in the initial HTML; video source is set in JS after first paint (`requestIdleCallback` / `setTimeout`) so the ~4.3 MB file doesn’t block initial render.  
   - `poster="heroproductimages/COVER_01.png"` so the hero shows the book cover until the video is ready.  
   - `preload="metadata"` so only metadata is requested when the video loads.

4. **Images**  
   - LCP image: `loading="eager"`, `fetchpriority="high"`, preloaded in `<head>`.  
   - All other images: `loading="lazy"`, `decoding="async"`, `fetchpriority="low"` where appropriate.  
   - Explicit `width`/`height` and `sizes` on all relevant images to avoid layout shift and help the browser choose the right resolution.

5. **Single blocking script**  
   - All JS is at the bottom of the page and runs after the DOM is parsed.

## Optional: make assets even smaller

Current image sizes (approx.):

- `heroproductimages/COVER_01.png` – ~4.7 MB  
- Other hero gallery images – ~2–7 MB each  
- Root `hf_*.png` – ~6.8 MB and ~7.4 MB  
- `assets/images/herba-starter.jpeg` – ~2.9 MB  

To load even faster:

1. **Compress images**  
   Use tools like Squoosh, ImageOptim, or `sharp`/`imagemin` to produce WebP (or AVIF) and smaller JPEG/PNG. Replace or add `<picture>`/`srcset` as needed.

2. **Responsive images**  
   Serve different resolutions (e.g. 600w, 1200w) via `srcset` so mobile doesn’t download desktop-sized files.

3. **Hosting**  
   Use a CDN and ensure long-lived cache headers for images and fonts (e.g. `Cache-Control: public, max-age=31536000` for hashed filenames).

With these HTML/loading changes in place, the critical path is lighter and below-the-fold assets are deferred and prioritized correctly.
