/**
 * MYME TECHIES — navigation, config bindings, rendering, reveals
 *
 * Shared values live in assets/js/site-config.js (window.MYME).
 * Every section also ships static HTML, so the page reads correctly even if
 * this script fails; the script only keeps that HTML in sync with the config.
 */
(function () {
  "use strict";

  /* Reveal-on-scroll styles only apply once this class exists, so a script
     failure can never leave content hidden. */
  document.documentElement.classList.add("js-ready");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.getElementById("siteHeader");
  const menu = document.getElementById("mobileMenu");
  const toggle = document.getElementById("menuToggle");
  const closeBtn = document.getElementById("menuClose");
  const cfg = window.MYME || {};

  const ARROW =
    '<svg class="arrow" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M3 8h8.2L8.1 4.9 9.5 3.5 13.9 8l-4.4 4.5-1.4-1.4L11.2 9H3z"/></svg>';
  const LINKEDIN =
    '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11.5H3zM9.75 9.75h3.83v1.57h.05c.53-1 1.84-2.07 3.78-2.07 4.04 0 4.79 2.66 4.79 6.12v5.88h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75v5.29h-4z"/></svg>';

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function assetPrefix() {
    return document.body.getAttribute("data-root") || "";
  }

  function resolveHref(href) {
    if (!href) return href;
    if (/^(https?:|mailto:|tel:|data:)/.test(href)) return href;
    if (href.startsWith("#")) {
      return document.body.getAttribute("data-page") === "home" ? href : assetPrefix() + "index.html" + href;
    }
    return assetPrefix() + href.replace(/^\//, "");
  }

  /* ---------- Config bindings ---------- */

  /* Replace only the text of an element, keeping any inline icon (svg) inside it. */
  function setText(el, text) {
    if (!el.querySelector("svg")) {
      el.textContent = text;
      return;
    }
    Array.from(el.childNodes).forEach((n) => {
      if (n.nodeType === 3) el.removeChild(n);
    });
    el.appendChild(document.createTextNode(text));
  }

  function bindContact() {
    const c = cfg.contact;
    if (!c) return;
    const map = {
      phoneDisplay: c.phoneDisplay,
      phoneHref: c.phoneHref,
      phoneAltDisplay: c.phoneAltDisplay,
      phoneAltHref: c.phoneAltHref,
      email: c.email,
      emailHref: c.emailHref,
      emailAlt: c.emailAlt,
      emailAltHref: c.emailAltHref,
      location: c.location,
    };
    document.querySelectorAll("[data-bind]").forEach((el) => {
      const key = el.getAttribute("data-bind");
      if (map[key] == null) return;
      if (el.tagName === "A") {
        if (key.endsWith("Href")) el.setAttribute("href", map[key]);
        else {
          const hrefKey = key === "phoneDisplay" ? "phoneHref" : key === "phoneAltDisplay" ? "phoneAltHref" : key + "Href";
          el.setAttribute("href", map[hrefKey] || map[key]);
          setText(el, map[key]);
        }
      } else {
        setText(el, map[key]);
      }
    });

    const wa = typeof cfg.whatsappUrl === "function" ? cfg.whatsappUrl() : "";
    document.querySelectorAll("[data-whatsapp]").forEach((el) => {
      if (!wa) return;
      el.setAttribute("href", wa);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    });

    document.querySelectorAll("[data-year]").forEach((el) => {
      el.textContent = String(new Date().getFullYear());
    });
  }

  function bindSocial() {
    document.querySelectorAll("[data-social-row]").forEach((root) => {
      const items = Array.isArray(cfg.social) ? cfg.social : [];
      root.querySelectorAll("[data-social]").forEach((link) => {
        const item = items.find((s) => s.id === link.getAttribute("data-social"));
        if (!item || !item.href) {
          link.hidden = true;
          return;
        }
        link.setAttribute("href", item.href);
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
      });
      if (!items.length) root.hidden = true;
    });
  }

  function bindImage(selector, conf) {
    const img = document.querySelector(selector);
    if (!img || !conf) return;
    if (conf.src) img.setAttribute("src", resolveHref(conf.src));
    if (conf.alt != null) img.setAttribute("alt", conf.alt);
    if (conf.width) img.setAttribute("width", conf.width);
    if (conf.height) img.setAttribute("height", conf.height);
  }

  /* ---------- Header / navigation ---------- */

  function setHeaderState() {
    if (!header || header.classList.contains("is-solid")) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  /* Hide the header while scrolling down, reveal it while scrolling up.
     Driven by the existing rAF-throttled scroll listener at the bottom of this
     file. Movement is accumulated per direction, so slow scrolling is detected
     reliably and tiny jitters never toggle anything. */
  const HIDE_AFTER = 10; /* px of continuous downward travel before hiding */
  const SHOW_AFTER = 6; /* px of continuous upward travel before revealing */
  let lastY = 0;
  let travel = 0;

  function scrollPos() {
    /* Clamp to the real scroll range so iOS rubber-band overscroll at the top
       or bottom is never mistaken for a change of direction. */
    const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
    return Math.min(Math.max(window.scrollY, 0), max);
  }

  function setHeaderHidden(hidden) {
    if (header.classList.contains("is-hidden") !== hidden) header.classList.toggle("is-hidden", hidden);
  }

  function headerHasKeyboardFocus() {
    const el = document.activeElement;
    try {
      return !!el && header.contains(el) && el.matches(":focus-visible");
    } catch (err) {
      return false;
    }
  }

  function updateHeaderVisibility() {
    if (!header) return;
    const y = scrollPos();
    const delta = y - lastY;
    lastY = y;

    /* Never hide while the mobile menu is open or a keyboard user is inside the nav. */
    if ((menu && menu.classList.contains("is-open")) || headerHasKeyboardFocus()) {
      travel = 0;
      setHeaderHidden(false);
      return;
    }
    /* Back at the top: always visible. */
    if (y < 8) {
      travel = 0;
      setHeaderHidden(false);
      return;
    }
    if (!delta) return;
    if (delta > 0 !== travel > 0) travel = 0; /* direction changed: start counting again */
    travel += delta;

    if (travel > HIDE_AFTER && y > header.offsetHeight) setHeaderHidden(true);
    else if (travel < -SHOW_AFTER) setHeaderHidden(false);
  }

  const SECTION_TO_NAV = {
    hero: "home",
    about: "about",
    journey: "about",
    vision: "about",
    services: "services",
    work: "projects",
    team: "team",
    contact: "contact",
  };

  function currentSectionId() {
    const nodes = document.querySelectorAll("main section[id]");
    const y = window.scrollY + window.innerHeight * 0.35;
    let id = "hero";
    nodes.forEach((section) => {
      if (y >= section.offsetTop) id = section.id;
    });
    return id;
  }

  function highlightNav() {
    const page = document.body.getAttribute("data-page");
    const activeKey =
      page === "home" ? SECTION_TO_NAV[currentSectionId()] : page === "services" ? "services" : page === "projects" || page === "case" ? "projects" : "";
    document.querySelectorAll(".nav-link[data-nav]").forEach((link) => {
      if (link.getAttribute("data-nav") === activeKey) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }

  let lastFocus = null;

  function focusables(container) {
    return Array.from(container.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(
      (el) => !el.hasAttribute("hidden") && el.getAttribute("aria-hidden") !== "true"
    );
  }

  function openMenu() {
    if (!menu || !toggle) return;
    lastFocus = document.activeElement;
    menu.removeAttribute("hidden");
    menu.classList.add("is-open");
    menu.setAttribute("aria-modal", "true");
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("is-locked");
    const items = focusables(menu);
    window.requestAnimationFrame(() => (items[0] || menu).focus());
  }

  function closeMenu(restoreFocus) {
    if (!menu || !toggle) return;
    menu.classList.remove("is-open");
    menu.setAttribute("hidden", "");
    menu.removeAttribute("aria-modal");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("is-locked");
    if (restoreFocus !== false) (lastFocus || toggle).focus();
  }

  function trapFocus(event) {
    if (!menu || !menu.classList.contains("is-open") || event.key !== "Tab") return;
    const items = focusables(menu);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function initMenu() {
    if (!toggle || !menu) return;
    menu.setAttribute("tabindex", "-1");
    toggle.addEventListener("click", () => (toggle.getAttribute("aria-expanded") === "true" ? closeMenu() : openMenu()));
    if (closeBtn) closeBtn.addEventListener("click", () => closeMenu());
    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => closeMenu(false)));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.classList.contains("is-open")) {
        event.preventDefault();
        closeMenu();
      }
      trapFocus(event);
    });
    /* Close the overlay if the viewport grows past the mobile breakpoint. */
    window.matchMedia("(min-width: 1041px)").addEventListener("change", (e) => {
      if (e.matches && menu.classList.contains("is-open")) closeMenu(false);
    });
  }

  /* ---------- Rendering from config ---------- */

  function renderProjects() {
    const mount = document.querySelector("[data-project-list]");
    if (!mount || !Array.isArray(cfg.projects)) return;
    const published = cfg.projects.filter((p) => p.status === "published");
    const featuredOnly = mount.hasAttribute("data-featured-only");
    const items = featuredOnly ? published.filter((p) => p.featured).slice(0, 3) : published;
    const empty = document.querySelector("[data-projects-empty]");
    if (!items.length) {
      mount.innerHTML = "";
      if (empty) empty.hidden = false;
      return;
    }
    mount.innerHTML = items
      .map((project, index) => {
        const href = project.href ? resolveHref(project.href) : "";
        const tags = [project.category].concat(project.scope || []).filter(Boolean).slice(0, 3);
        const img = project.image
          ? `<img src="${esc(resolveHref(project.image))}" alt="" width="1200" height="900" loading="lazy">`
          : "";
        const media = href ? `<a class="work-media" href="${esc(href)}" tabindex="-1" aria-hidden="true">${img}<span class="work-index">${String(index + 1).padStart(2, "0")}</span></a>` : `<div class="work-media">${img}<span class="work-index">${String(index + 1).padStart(2, "0")}</span></div>`;
        const link = href ? `<a class="text-link" href="${esc(href)}">View Case Study ${ARROW}</a>` : "";
        return `<article class="work-card reveal">
          ${media}
          <div class="work-body">
            <h3>${esc(project.name)}</h3>
            <div class="tag-row">${tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
            <p>${esc(project.summary || "")}</p>
            ${link}
          </div>
        </article>`;
      })
      .join("");
    if (empty) empty.hidden = true;
  }

  function renderTeam() {
    const mount = document.querySelector("[data-team-list]");
    if (!mount || !Array.isArray(cfg.team)) return;
    const members = cfg.team.filter((m) => m.status !== "draft");
    if (!members.length) return;
    mount.innerHTML = members
      .map((m) => {
        const lead = m.tier === "lead";
        const social = m.linkedin
          ? `<a class="team-social" href="${esc(m.linkedin)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(m.name)} on LinkedIn">${LINKEDIN}</a>`
          : "";
        /* Photo only when one is supplied: no placeholders, initials or avatars. */
        const portrait = m.photo
          ? `<div class="team-portrait"><img src="${esc(resolveHref(m.photo))}" alt="${esc(m.name)}" width="900" height="1193" loading="lazy">${social}</div>`
          : "";
        const meta = `<div class="team-meta"><h3>${esc(m.name)}</h3><p>${esc(m.role)}</p>${m.photo ? "" : social}</div>`;
        return `<article class="team-card ${lead ? "team-card--lead" : ""} ${m.photo ? "" : "team-card--text"} reveal">
          ${portrait}
          ${meta}
        </article>`;
      })
      .join("");
  }

  function renderJourney() {
    const mount = document.querySelector("[data-journey-list]");
    if (!mount || !Array.isArray(cfg.journey)) return;
    const items = cfg.journey.filter((j) => j.status === "published");
    if (!items.length) {
      mount.hidden = true;
      return;
    }
    mount.hidden = false;
    mount.innerHTML = items
      .map(
        (j) => `<li class="timeline-item reveal">
          <span class="timeline-year">${esc(j.year)}</span>
          <div><h3>${esc(j.title)}</h3><p>${esc(j.text)}</p></div>
        </li>`
      )
      .join("");
  }

  function renderClients() {
    const section = document.querySelector("[data-clients]");
    const row = document.querySelector("[data-client-row]");
    if (!section || !row || !Array.isArray(cfg.clients) || !cfg.clients.length) return;
    row.innerHTML = cfg.clients
      .filter((c) => c && c.logo)
      .map((c) => {
        const img = `<img src="${esc(resolveHref(c.logo))}" alt="${esc(c.name)}" height="32" loading="lazy">`;
        return c.href ? `<a href="${esc(c.href)}" target="_blank" rel="noopener noreferrer">${img}</a>` : img;
      })
      .join("");
    section.hidden = false;
  }

  /* ---------- Motion ---------- */

  function initReveals() {
    document.querySelectorAll("[data-stagger]").forEach((group) => {
      Array.from(group.children).forEach((child, i) => child.style.setProperty("--d", i * 90 + "ms"));
    });
    const nodes = document.querySelectorAll(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      nodes.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    nodes.forEach((el) => io.observe(el));
  }

  function initHeroParallax() {
    const hero = document.getElementById("hero");
    const target = document.querySelector("[data-parallax]");
    if (!hero || !target || reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let raf = 0;
    hero.addEventListener(
      "pointermove",
      (event) => {
        if (raf) return;
        raf = window.requestAnimationFrame(() => {
          raf = 0;
          const r = hero.getBoundingClientRect();
          const x = (event.clientX - r.left) / r.width - 0.5;
          const y = (event.clientY - r.top) / r.height - 0.5;
          target.style.transform = `translate3d(${(x * -26).toFixed(1)}px, ${(y * -18).toFixed(1)}px, 0)`;
        });
      },
      { passive: true }
    );
    hero.addEventListener("pointerleave", () => {
      target.style.transform = "";
    });
  }

  /* ---------- Init ---------- */

  bindContact();
  bindSocial();
  bindImage("[data-hero-visual]", cfg.heroVisual);
  bindImage("[data-about-image]", cfg.aboutImage);
  renderProjects();
  renderTeam();
  renderJourney();
  renderClients();
  setHeaderState();
  highlightNav();
  initMenu();
  initReveals();
  initHeroParallax();

  lastY = scrollPos();
  /* Re-sync once everything has loaded, so a restored scroll position or an
     anchor jump on page load isn't treated as a scroll gesture. */
  window.addEventListener(
    "load",
    () => {
      lastY = scrollPos();
      travel = 0;
    },
    { once: true }
  );
  /* Tabbing into a hidden header (keyboard) brings it back into view. */
  if (header) {
    header.addEventListener("focusin", () => {
      if (headerHasKeyboardFocus()) {
        travel = 0;
        setHeaderHidden(false);
      }
    });
  }

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setHeaderState();
        highlightNav();
        updateHeaderVisibility();
        ticking = false;
      });
    },
    { passive: true }
  );
  window.addEventListener("hashchange", highlightNav);
})();
