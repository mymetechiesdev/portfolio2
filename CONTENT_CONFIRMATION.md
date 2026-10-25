# Content that still needs business confirmation

Do not treat the items below as signed facts until someone at MYME TECHIES confirms them. Draft records stay in `assets/js/site-config.js` with `status: "draft"` unless noted.

## Contact (source values, not independently verified)

- Phone: +91 90259 20959
- Alternate phone in config: +91 96294 49009 (shown as the alternate number)
- Email:  info@mymetechies.in
- Alternate email in config:  support@mymetechies.com (not shown on the homepage)
- Location: Vellore, Tamil Nadu
- Hours in config (not shown on the homepage): Mon–Fri 9:00–18:00, Sat 10:00–16:00
- WhatsApp number: 919025920959 and the prefilled enquiry message

## Social

- Instagram: https://www.instagram.com/myme.digitalhub?igsh=bm54YjR5YThnMXZj
- Facebook: https://www.facebook.com/share/1HmyNrv4rA
- Confirm these are the official profiles and that they should remain public.

## Company journey (NOW SHOWN on the homepage — please confirm)

- 2022 Foundation year
- 2023 Growth and client expansion
- 2024 Digital marketing and SaaS expansion
- 2025 Scaling and innovation

The redesign displays this timeline (2022–2025). To hide any entry, set its `journey[].status` to `"draft"` in `site-config.js`.

## Team

- Portraits are designed monogram placeholders (no photos). Add real photos via `team[].photo`; add `team[].linkedin` to show the LinkedIn icon.

- Names and roles are from the previous site.
- Confirm spelling, titles, and who should appear publicly.
- No photographs are published. Add real portraits only; do not use stock or generated faces.
- Longer biographies from the old site (including “2+ years” claims) are not published.

## Portfolio (first three now `status: "published"`; others still draft)

GK Car Services, E-Commerce Platform and Learning Management System are shown on the homepage and projects page with **abstract placeholder cover art (not real screenshots)**. Confirm client names, permission and replace the covers before launch; set `status: "draft"` to hide any entry.

Full list:

- GK Car Services – Vellore
- E-Commerce Platform
- Learning Management System
- Analytics Dashboard
- Mobile Application
- Enterprise Management System

HTML shells exist for the first three under `projects/`. They are now linked from the cards but keep `noindex` until they contain real detail. Before publishing any study: confirm the client, permission, screenshots, stack, and live/repo URLs. Then set `status: "published"`, `featured: true` for up to three homepage items, and remove `noindex`.

## Not published (placeholders from older source)

- Client logos: TechCorp, InnovateHub, DataFlow Inc, CloudVision, NextGen Solutions, FutureTech
- Testimonial attributed to “Client Name, Company”
- Statistics including 100% client satisfaction, animated counters, and “0+” hero metrics
- Industries-as-clients claims presented as a client roster

## Brand

- Temporary letter-mark logo pending the final mark
- Hero visual is an abstract SVG, not a product render from a client
- Service images are editorial diagrams, not photographs of shipped products

## Design reference vs. real content

The reference image contained sample team members (e.g. Arun Kumar), sample client logos (TechCorp etc.), a building photo and a 2025 footer. None of these were used. Team = the five real people from the config; no client logos; Privacy/Terms links omitted because those pages do not exist yet.
