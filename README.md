# MYME TECHIES website

Static HTML, CSS and JavaScript. No build step, no backend, no npm dependencies
(only Google Fonts: Inter + Plus Jakarta Sans).

## Run locally

```bash
python3 -m http.server 8080      # or: npx --yes serve .
```

Open http://localhost:8080 (opening `index.html` directly also works).

## Where to edit things

Almost everything that changes lives in **`assets/js/site-config.js`**:

| What | Config key |
| --- | --- |
| Phone, email, location, WhatsApp number + prefilled message | `contact` |
| Hero 3D visual | `heroVisual.src` |
| About-section image | `aboutImage.src` |
| Social links | `social` |
| Services (copy, points, images) | `services` |
| Team names, roles, photos, LinkedIn | `team` (`photo`, `linkedin`) |
| Company timeline | `journey` (`status: "published"` shows, `"draft"` hides) |
| Portfolio cards + cover images | `projects` (`status`, `featured`, `image`) |
| "Trusted by" logo strip | `clients` (hidden while empty) |
| Vision / Mission | `vision`, `mission` |

Colours, fonts and spacing: `assets/css/variables.css`.

The homepage also contains the same text as static HTML, so it stays readable
without JavaScript. `main.js` re-renders team, timeline, projects and clients
from the config, and binds contact details/WhatsApp everywhere. If you change
service or "what makes us different" wording, mirror it in `index.html` /
`services.html`.

## Images

Your original supplied files are kept untouched in `assets/originals/`. The site
uses optimized copies:

| Where it appears | File | Config key |
| --- | --- | --- |
| Logo (header, menu, footer, favicon) | `assets/images/brand/logo-mark.png` | (in HTML) |
| About section | `assets/images/about/about-section.webp` | `aboutImage.src` |
| Custom SaaS card | `assets/images/services/custom-saas.webp` | `services[custom-saas].image` |
| Web Development card | `assets/images/services/web-development.webp` | `services[web-development].image` |
| Mobile App card | `assets/images/services/mobile-app.webp` | `services[mobile-apps].image` |
| SEO & Performance Marketing card | `assets/images/services/digital-marketing.webp` | `services[seo-performance].image` |
| Hero 3D scene (still the earlier artwork) | `assets/images/hero/hero-glass.svg` | `heroVisual.src` |
| Project covers (placeholder art, not screenshots) | `assets/images/projects/cover-*.svg` | `projects[].image` |
| Vision globe (decorative) | `assets/images/shared/globe.svg` | (in HTML) |
| Team portraits | `assets/images/team/` | `team[].photo` |

Prefer compressed WebP/JPEG; keep width/height attributes.

## Pages

- `index.html` — homepage
- `services.html` — full service list
- `projects.html` — project list (from config)
- `projects/*.html` — case-study pages (kept `noindex` until real detail is added)

## Deploy

Upload the folder to any static host and point the domain at `index.html`.
Review `CONTENT_CONFIRMATION.md` first.
