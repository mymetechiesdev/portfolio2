# Verification checklist (redesign)

Checked with Playwright/Chromium against a local static server.

## Visual and responsive
- [x] Desktop (1440), tablet (820), mobile (390): no horizontal overflow, no broken images
- [x] Dark teal hero with glass 3D scene, beige/cream/white sections, dark CTA and footer
- [x] Services bento, large project cards, timeline + dark panel, vision/mission, staggered team
- [x] Inner pages (services, projects, case studies) restyled and checked

## Functional
- [x] All nav, footer and in-page anchors resolve; all linked pages return 200
- [x] WhatsApp buttons (nav, hero, menu, CTA) open the configured number with prefilled message
- [x] Active nav state follows scrolling; mobile menu opens/closes (button, Escape, link click)
- [x] No JavaScript errors in console

## Resilience
- [x] With JavaScript disabled the full page is visible and WhatsApp links work
- [x] With scripts blocked, reveal-animated content stays visible
- [x] `prefers-reduced-motion` disables animation; only transform/opacity are animated

## Still to verify by the business
- Real contact details, social links, timeline, portfolio permission (see CONTENT_CONFIRMATION.md)
- Rendering with the real web fonts (Google Fonts were unavailable in the test sandbox; a wider fallback font was used, which is the conservative case)

## Image replacement pass
- [x] Supplied images wired in (logo, about, 4 service images); no broken image paths on any page at 1440/820/390
- [x] Originals kept untouched in `assets/originals/`; site uses optimized WebP/PNG copies
