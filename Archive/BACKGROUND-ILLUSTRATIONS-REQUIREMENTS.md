# RoHerb — Background Illustrated Elements: Requirements

**Goal:** Add illustrated background elements that create an **immersive, holistic experience** as users scroll through the website. Elements should feel thematic, subtle, and supportive—never competing with content.

---

## 1. Design principles

| Principle | Requirement |
|-----------|-------------|
| **Subtlety** | Elements sit behind content. Low opacity (5–15% typical), soft, never distracting. |
| **Thematic unity** | All illustrations belong to one family: **botanical, herbal, kitchen-apothecary**. |
| **Section-aware** | Each section can have its own accent elements; overall feel is cohesive. |
| **Non-intrusive** | No interaction needed. Elements are decorative only; `pointer-events: none`. |

---

## 2. Section map & scroll flow

Background elements should align with the narrative as users scroll:

| Section | Background type | Suggested motif | Placement |
|---------|-----------------|-----------------|-----------|
| **Hero** | Light gradient `#f0f7f4` → `#fafaf8` | Herb sprigs, loose leaves, botanical silhouettes | Top corners, edges; organic scatter |
| **Story** | White `#ffffff` | Open book silhouette, quill/ink, herb branches | Left or right edges; soft, faded |
| **CTA block** | Muted `#fafaf8` | Mortar & pestle, small herb bundles | Corners; very light |
| **Trusted by** | Same as page bg | Minimal or none (marquee is focus) | Optional: tiny leaf silhouettes at edges |
| **Newsletter** | White | Plants, leaves, “discovery” botanicals | One side; gentle cluster |
| **Pillars** | Muted | Blending, education, ritual, connection icons in silhouette | Distributed, very faint |
| **Quotes** | Dark `#0d0d0d` | Lighter botanical silhouettes (mint, sage) | Edges; subtle contrast |
| **Recipes** | White | Glasses, herbs, recipe-related elements | Sides; food/drink focused |
| **Projects** | Muted | Kitchen, home, small botanical clusters | Corners |
| **Add-ons** | White | Dried herbs, jars, apothecary items | Edges |
| **FAQ** | Muted | Minimal; continuation of leaf/stem motif | Very subtle |
| **Footer** | Dark `#0d0d0d` | Continuation of dark-section motif | Bottom edges |

---

## 3. Asset specifications

### 3.1 Format & quality

| Spec | Requirement |
|------|-------------|
| **Format** | **SVG** preferred (scalable, small file size, crisp at any resolution). PNG with transparency as fallback if needed. |
| **Style** | Line or silhouette only. No fills or minimal fill. Matches existing illustrated, botanical aesthetic. |
| **Color** | Single color or duotone. Color should be derivable from section background (e.g. `#1d5c45` at 6–12% opacity for light sections; `#7dd3a8` or white at 4–8% for dark sections). |

### 3.2 Size & dimensions

| Type | Approx. size (viewport) | Notes |
|------|-------------------------|-------|
| **Corner clusters** | 120–200px (largest dimension) | One or two per corner |
| **Edge accents** | 80–150px | Along left/right edges |
| **Scattered elements** | 40–80px | Smaller leaves, stems |
| **Large hero accents** | 200–350px | Top-of-page only |

---

## 4. Proposed asset list

Assets to be created (or sourced) for implementation:

| ID | Asset description | Section(s) | Suggested file |
|----|-------------------|------------|----------------|
| B1 | Herb sprig cluster (rosemary, thyme, mint) | Hero | `bg-hero-sprigs.svg` |
| B2 | Loose leaf scatter (3–5 small leaves) | Hero, Pillars | `bg-leaves-scatter.svg` |
| B3 | Open book silhouette | Story | `bg-book-silhouette.svg` |
| B4 | Mortar and pestle outline | CTA, Pillars | `bg-mortar-pestle.svg` |
| B5 | Botanical discovery cluster (plants, leaves) | Newsletter | `bg-newsletter-botanicals.svg` |
| B6 | Single leaf / stem variations (×3) | Multiple | `bg-leaf-1.svg`, `bg-leaf-2.svg`, `bg-leaf-3.svg` |
| B7 | Glass / jar outline | Recipes | `bg-glass.svg` |
| B8 | Apothecary jar / bottle | Add-ons | `bg-jar.svg` |
| B9 | Dark-section botanical (light line art) | Quotes, Footer | `bg-dark-herbs.svg` |

---

## 5. Placement & positioning

- **Position:** `position: absolute` or `fixed` (depending on desired parallax).
- **Z-index:** Below content; e.g. `z-index: 0` for wrapper, content at `z-index: 1`.
- **Locations:** Corners (`top`, `bottom`, `left`, `right`), sometimes slightly off-screen for a peek-in effect.
- **Overflow:** Parent sections use `overflow: hidden` where needed so elements don’t bleed awkwardly.

---

## 6. Scroll behavior (optional enhancement)

| Behavior | Description |
|----------|-------------|
| **Parallax** | Elements move at different speeds on scroll (e.g. 0.3×, 0.5×) for depth. |
| **Fade in/out** | Opacity tied to scroll position so elements appear and disappear softly. |
| **Static** | No animation; elements stay fixed within each section. Simpler, still effective. |

---

## 7. Color & opacity by section type

| Section type | Element color | Opacity range |
|--------------|---------------|---------------|
| Light (`#fafaf8`, white) | `#1d5c45` (accent) or `#5a5a5a` (muted) | 4–12% |
| Muted (`#fafaf8`) | `#1d5c45` | 5–10% |
| Dark (`#0d0d0d`) | `#7dd3a8` or `rgba(255,255,255,0.08)` | 4–8% |

---

## 8. Implementation notes

- Use a shared wrapper (e.g. `.bg-elements`) with `position: absolute; inset: 0; pointer-events: none; z-index: 0` inside each section.
- Add elements as `<img>` or inline `<svg>` with `position: absolute` and `opacity` in CSS.
- Ensure images use `loading="lazy"` and `decoding="async"` where appropriate.
- For parallax: consider a lightweight script or CSS `transform` based on scroll; avoid heavy libraries if possible.

---

## 9. Summary checklist for assets

- [ ] B1: Herb sprig cluster (Hero)
- [ ] B2: Loose leaf scatter
- [ ] B3: Open book silhouette (Story)
- [ ] B4: Mortar and pestle (CTA/Pillars)
- [ ] B5: Botanical cluster (Newsletter)
- [ ] B6: Single leaf variations ×3
- [ ] B7: Glass/jar (Recipes)
- [ ] B8: Apothecary jar (Add-ons)
- [ ] B9: Dark-section botanical (Quotes/Footer)

**Style reminder:** All assets should be **line-art or silhouette**, **illustrated** (not photographic), and in the **RoHerb botanical/apothecary** palette (sage green, cream, soft earth tones).
