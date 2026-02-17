# Competitor Site Structure Summary (The Herball)

Reference for replicating the layout and content flow. **Design direction for your version:** keep the same structure but use a **bright** palette—**black, color, and white** (not only black and white). Use color for accents, gradients, and key visuals so the site feels lively and distinct.

---

## 1. Overall Page Structure

- **Single long-scroll homepage** (one main HTML page).
- **Smooth scroll** (Lenis.js in original).
- **Sticky/fixed navbar** at top; optional **floating CTA strip** (e.g. “Develop my experience” / “Subscribe”).
- **Full-viewport sections** for hero and some blocks; others use contained width with padding.
- **Background music widget** (optional; Elfsight in original).

---

## 2. Main Sections (Top to Bottom)

### 2.1 Navigation (navbar)
- **Logo** (left): brand mark or wordmark.
- **Links:** Home · Work · Experts · Connect · HERB ALL Drinks · Phoenix (or equivalent).
- **Social:** “Follow us on Instagram” + icon.
- **Mobile:** Hamburger menu (Lottie animation in original).
- **Variant:** Secondary nav strip with primary CTAs (e.g. “Develop my experience”, “Subscribe”).

### 2.2 Loading / Portal (optional)
- Short **loading animation** with a central visual (e.g. “Blue Portal” graphic) before main content.
- Can be skipped or simplified in a replica.

### 2.3 Hero
- **Full-bleed background** (dark in original; in your version: black + one strong color or gradient).
- **Central visual:** abstract, circular or organic graphic (e.g. blue “portal” / ribbon effect). In your version this is a good place for **bold color**.
- **Botanical labels** (e.g. Passion Flower, Myrrh, Geranium, Iris, Siberian Ginseng) as small headings or tags.
- **Main headline:** e.g. “We are a Global Creative Studio and Food & Beverage Consultancy.”
- **Subline:** e.g. “Embrace nature's wisdom. By reconnecting through our senses…”
- **Supporting line:** e.g. “The Herball creates transformative experiences through food, drink, scent, and genuine hospitality.”

### 2.4 Social Proof / Logos
- **Headline:** “Trusted” / “By The Best” (split across lines).
- **Logo strip or marquee** of client/hotel/project names (e.g. Nekajui, St.Regis Cap Cana, Ritz London, Range Rover House, Fallow & Roe, MakeReady Hotels, etc.).

### 2.5 Primary CTA Block
- **Headline:** “Develop the guest experience.”
- **Body:** Short paragraph + CTA to get in touch or join newsletter.
- **Buttons/links:** e.g. “Develop my experience”, “Subscribe”.

### 2.6 Newsletter Signup (first instance)
- **Headline:** “Discover the dynamic world of The Herball”
- **Subline:** e.g. “Join our newsletter to explore, learn, and get inspired by plants, scents, food, drinks, sound, and more.”
- **Email form** (e.g. Klaviyo embed in original).
- Optional **image** beside the form.

### 2.7 Services / Pillars (4 columns or cards)
- **Development** — concepts, operations, menus, service rituals.
- **Education** — training, workshops, talent.
- **Ritual** — food, drinks, scents, stories, bottled serves, tea/coffee.
- **Connection** — local nature, plants, people, places.

Each: short heading + 1–2 sentence description.

### 2.8 Testimonial
- Quote from **Gamal El Fakih Rodriguez**, Vice President of Operations (Luxury) Marriott International (or equivalent quote + attribution).

### 2.9 CTA Block (repeat)
- Same “Develop the guest experience” + newsletter/contact CTAs (can be same as 2.5).

### 2.10 Current & Recent Projects
- **Headline:** “Current & Recent Projects”
- **Grid or list of project cards** with links:
  - Nekajui – Ritz-Carlton Reserve, Peninsula Papagayo
  - The St.Regis Cap Cana
  - The Ritz Hotel, London
  - Range Rover House, Abu Dhabi
  - Fallow & Roe, London
  - MakeReady Hotels, USA
  - The St.Regis Riviera Maya
  - The Macallan, Scotland
  - The St.Regis Aruba
  - BoF, Bombay
  - Bab Samhan – The Luxury Collection, Riyadh

### 2.11 “How We Support You” (4 pillars)
- **Headline:** “How We Support You To Create The Best Experiences”
- **Four items:** Collaborate · Grow · Develop · Flourish (each with short description).

### 2.12 Second Testimonial
- e.g. **Grace Wales Bonner** (or similar quote + name).

### 2.13 Products / Offers
- **Headline:** “Our Drinks” / “HERB ALL DRINKS”
- **Sub-items:** Fragrance · Online Course · Shop HERB ALL DRINKS (links/cards).
- **Book:** “The Herball's Guide to Botanical Drinks”.

### 2.14 Third Testimonial
- e.g. **Koula Michaelides**, F&B Manager The Ritz London.

### 2.15 CTA + Newsletter (repeat)
- “Develop the guest experience” + “Discover the dynamic world…” + email signup again.

### 2.16 FAQs
- **Headline:** “FAQs”
- **Accordion or list** of Q&As (e.g. costs/timelines, small projects, global supply, recruitment, design, PR/marketing, other clients).

### 2.17 Final CTA + Contact
- **Headline:** “Still have questions?”
- **Body:** Invitation to collaborate or reach out.
- **Newsletter reminder:** “Sign up for our newsletter to stay updated…”

### 2.18 Footer
- **Links:** Contact · The Herball · Our Work · Experts · Connect · HERB ALL DRINKS · Online Course · Book.
- **Contact:** e.g. info@theherball.com.
- **Credit:** e.g. faroverdigital.com.
- **Background music widget** (Previous / Pause / Next / Volume).

---

## 3. Key Components to Replicate

| Component        | Purpose |
|-----------------|--------|
| Sticky navbar   | Always-visible nav + logo + main CTAs. |
| Hero + central graphic | First impression; **use color here** in your bright version. |
| Marquee / logo strip | “Trusted by” social proof. |
| Repeating CTA blocks | “Develop the guest experience” + newsletter. |
| Newsletter sections | Headline + tagline + email form (optionally with image). |
| 4-column service cards | Development, Education, Ritual, Connection. |
| Project grid | Clickable project cards with names. |
| 4-pillar “How We Support” | Collaborate, Grow, Develop, Flourish. |
| Testimonials | Quote + name + title, between sections. |
| FAQ accordion | One section of expandable Q&As. |
| Footer | Links, contact, credits, optional music widget. |

---

## 4. Tech / Assets (Original)

- **Framework:** Webflow export (custom classes like `section_hero`, `heading-style-h2`, etc.).
- **Scripts:** GSAP, ScrollTrigger, Lenis (smooth scroll), jQuery, Webflow JS.
- **Assets:** Main CSS in `_files` folder, SVG logo, optional Lottie for menu icon.
- **External:** Cookie consent, Klaviyo (newsletter), optional background music (e.g. Elfsight), Vimeo for video if used.

For your replica you can keep the same **section order and component list** and restyle with **black + color + white** (e.g. colored hero, colored buttons, colored headings or gradients, white/light backgrounds in places).

---

## 5. Design Direction Reminder

- **Your goal:** Bright, not “only white and black.”
- **Use:** Black for text and strong contrast; **white** for backgrounds or negative space; **color** for hero graphic, buttons, gradients, accents, and key headings so the site feels vibrant and ownable.
