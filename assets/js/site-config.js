/**
 * MYME TECHIES — site configuration
 * ---------------------------------
 * Edit this file to update shared contact details, WhatsApp, navigation,
 * services, team, social links, and draft portfolio entries.
 *
 * Public pages read contact, WhatsApp, social, and year values from here.
 * Content marked status: "draft" is not rendered on the public site.
 * Set status: "published" only after business confirmation.
 *
 * Image paths are relative to the website root (the folder that contains index.html).
 */
window.MYME = {
  brand: {
    name: "MYME TECHIES",
    shortName: "MYME",
    tagline: "Digital products, engineering, and growth — under one roof.",
    description:
      "MYME TECHIES builds, markets, and scales web, mobile, SaaS, and digital-growth solutions for startups, MSMEs, enterprises, and institutions.",
  },

  contact: {
    /* Primary = phoneDisplay (also the WhatsApp number); alternate = phoneAlt* */
    phoneDisplay: "+91 90259 20959",
    phoneHref: "tel:+919025920959",
    phoneAltDisplay: "+91 96294 49009",
    phoneAltHref: "tel:+919629449009",
    email: "info@mymetechies.in",
    emailHref: "mailto:info@mymetechies.in",
    emailAlt: "support@mymetechies.com",
    emailAltHref: "mailto:support@mymetechies.com",
    location: "Vellore, Tamil Nadu",
    hours: ["Monday – Friday: 9:00 AM – 6:00 PM", "Saturday: 10:00 AM – 4:00 PM"],
    whatsapp: {
      e164: "919025920959",
      message:
        "Hello MYME TECHIES, I would like to discuss a digital project. Please share the next step to start a conversation.",
    },
  },

  /* Hero 3D visual. Swap in a final render (PNG/WebP/SVG, transparent or dark
     background works best) by changing src. */
  heroVisual: {
    src: "assets/images/hero/hero-glass.svg",
    width: 1200,
    height: 1000,
    alt: "Abstract glass blocks with teal edge lighting and a glowing core cube",
  },

  /* Image beside the About copy. Currently an illustrative render, NOT a photo
     of the MYME TECHIES office unless you confirm it is. */
  aboutImage: {
    src: "assets/images/about/about-section.webp",
    width: 941,
    height: 1672,
    alt: "Bright MYME TECHIES workspace with a city skyline view, glass panels and a strategy-to-success workflow diagram",
  },

  social: [
    {
      id: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/myme.digitalhub?igsh=bm54YjR5YThnMXZj",
    },
    {
      id: "facebook",
      label: "Facebook",
      href: "https://www.facebook.com/share/1HmyNrv4rA",
    },
  ],

  nav: [
    { label: "Home", href: "#hero", page: "index.html" },
    { label: "About", href: "#about", page: "index.html" },
    { label: "Services", href: "#services", page: "index.html" },
    { label: "Projects", href: "#work", page: "index.html" },
    { label: "Team", href: "#team", page: "index.html" },
    { label: "Contact", href: "#contact", page: "index.html" },
  ],

  audiences: [
    { title: "Startups", text: "From idea to a product that can scale." },
    { title: "MSMEs", text: "Digital systems, websites, and growth support." },
    { title: "Enterprises", text: "Structured engineering and maintainable platforms." },
    { title: "Colleges & institutions", text: "Technology enablement for campus and administration." },
  ],

  services: [
    {
      id: "custom-saas",
      group: "SaaS & Product Innovation",
      name: "Custom SaaS Development",
      featured: true,
      featuredSize: "large",
      image: "assets/images/services/custom-saas.webp",
      summary:
        "Multi-tenant software platforms designed around client workflows, billing, and long-term scale.",
      points: [
        "Custom SaaS architecture",
        "Multi-tenant product structure",
        "Subscription and access controls",
      ],
    },
    {
      id: "web-development",
      group: "Development Solutions",
      name: "Web Development",
      featured: true,
      image: "assets/images/services/web-development.webp",
      summary:
        "Custom web applications with modern frontends, reliable backends, and maintainable data models.",
      points: [
        "Responsive frontend systems",
        "Backend and API integrations",
        "Database design",
      ],
    },
    {
      id: "mobile-apps",
      group: "Development Solutions",
      name: "Mobile App Development",
      featured: true,
      image: "assets/images/services/mobile-app.webp",
      summary:
        "Native and cross-platform mobile applications with a clear focus on usability and delivery.",
      points: [
        "Native iOS and Android",
        "Flutter and React Native",
        "Mobile interface design",
      ],
    },
    {
      id: "seo-performance",
      group: "Digital Growth Solutions",
      name: "SEO & Performance Marketing",
      featured: true,
      image: "assets/images/services/digital-marketing.webp",
      summary:
        "Search visibility and performance campaigns planned around measurement, not vanity metrics.",
      points: [
        "Technical SEO",
        "Performance campaigns",
        "Conversion review",
      ],
    },
    {
      id: "cloud-devops",
      group: "Development Solutions",
      name: "Cloud & DevOps",
      featured: false,
      summary: "Cloud infrastructure, deployment pipelines, and operational monitoring.",
      points: [
        "Cloud setup and migration",
        "CI/CD implementation",
        "Security and monitoring basics",
      ],
    },
    {
      id: "ai-automation",
      group: "Development Solutions",
      name: "AI & Automation",
      featured: false,
      summary: "Practical automation and AI-assisted workflows where they improve operations.",
      points: [
        "Workflow automation",
        "AI feature integration",
        "Data-assisted reporting",
      ],
    },
    {
      id: "social-media",
      group: "Digital Growth Solutions",
      name: "Social Media Marketing",
      featured: false,
      summary: "Channel planning, content cadence, and community communication.",
      points: [
        "Channel strategy",
        "Content planning",
        "Community management",
      ],
    },
    {
      id: "paid-ads",
      group: "Digital Growth Solutions",
      name: "Paid Advertising & Campaign Strategy",
      featured: false,
      summary: "Paid search and social campaigns with tracking you can actually review.",
      points: [
        "PPC and social ads",
        "Campaign structure",
        "ROI tracking",
      ],
    },
    {
      id: "branding-content",
      group: "Digital Growth Solutions",
      name: "Branding & Content Strategy",
      featured: false,
      summary: "Visual identity and content direction that stay consistent across product and marketing.",
      points: [
        "Brand identity",
        "Content positioning",
        "Channel consistency",
      ],
    },
    {
      id: "mvp",
      group: "SaaS & Product Innovation",
      name: "MVP Development",
      featured: false,
      summary: "Focused first-release products used to test an idea with real users.",
      points: [
        "Scope definition",
        "Rapid build",
        "Iteration after feedback",
      ],
    },
    {
      id: "subscription-platforms",
      group: "SaaS & Product Innovation",
      name: "Subscription-Based Platforms",
      featured: false,
      summary: "Recurring-revenue products with plan management and billing integrations.",
      points: [
        "Plan and billing setup",
        "Member access",
        "Usage and revenue reporting",
      ],
    },
    {
      id: "in-house-saas",
      group: "SaaS & Product Innovation",
      name: "In-House SaaS Product Development",
      featured: false,
      summary: "Internal product work from concept through launch and ongoing evolution.",
      points: [
        "Product planning",
        "Full-stack delivery",
        "Post-launch iteration",
      ],
    },
  ],

  differentiators: [
    {
      title: "End-to-end digital partner",
      text: "Strategy, design, engineering, and growth support in one delivery path.",
    },
    {
      title: "Technology and marketing together",
      text: "Product development sits next to SEO, content, and campaign work — not in a separate silo.",
    },
    {
      title: "Product-oriented thinking",
      text: "We treat websites and software as products with users, not as one-off page builds.",
    },
    {
      title: "Startup speed, structured delivery",
      text: "Short feedback loops with clear scope, so work can move without becoming disposable.",
    },
  ],

  vision:
    "To become a trusted global technology and SaaS innovation partner driving digital transformation and scalable growth.",
  mission:
    "To build, market, and scale intelligent digital solutions that empower businesses and institutions.",

  /* Company timeline (from the previous site). Shown on the homepage while
     status is "published". Set to "draft" to hide an entry until confirmed. */
  journey: [
    {
      year: "2022",
      title: "Foundation year",
      text: "Establishment of MYME TECHIES.",
      status: "published",
    },
    {
      year: "2023",
      title: "Growth and client expansion",
      text: "Expanded service offerings and strengthened development presence.",
      status: "published",
    },
    {
      year: "2024",
      title: "Digital marketing and SaaS expansion",
      text: "Introduced digital marketing and began SaaS development initiatives.",
      status: "published",
    },
    {
      year: "2025",
      title: "Scaling and innovation",
      text: "Focused on scalable SaaS platforms and AI-driven solutions.",
      status: "published",
    },
  ],

  /* photo: path under assets/images/team/ (e.g. "assets/images/team/tamil-selvan.webp").
     Leave photo empty for a text-only card. Adding a photo later turns that card into a
     portrait card automatically; no layout change needed.
     tier: "lead" = large centred card; anything else = smaller card in the row below.
     linkedin: full profile URL; the icon only appears when this is filled in. */
  team: [
    { name: "Tamil Selvan", role: "Chief Executive Officer and Founder", tier: "lead", photo: "assets/images/team/tamil-selvan.webp", linkedin: "", status: "published" },
    { name: "Sharmila", role: "Chief Technology Officer and Co-Founder", tier: "member", photo: "", linkedin: "", status: "published" },
    { name: "Praveen Kumar", role: "Chief Operating Officer", tier: "member", photo: "", linkedin: "", status: "published" },
  ],

  /**
   * Portfolio entries from earlier source files.
   * The first three are shown on the homepage and projects page. Their cover
   * images are ABSTRACT PLACEHOLDER ART, not real screenshots: replace `image`
   * with a real screenshot once the client has approved it. Confirm client,
   * permission, stack and live URL before relying on these publicly.
   * Set status back to "draft" to hide any entry.
   */
  projects: [
    {
      id: "gk-car-services",
      status: "published",
      featured: true,
      name: "GK Car Services – Vellore",
      category: "Automobile service",
      summary:
        "Professional responsive website intended to improve local visibility and customer access.",
      challenge: "",
      solution: "",
      scope: ["Website development", "UI/UX design", "Deployment support"],
      technologies: [],
      image: "assets/images/projects/cover-gk-car-services.svg",
      liveUrl: "",
      repoUrl: "",
      href: "projects/gk-car-services.html",
    },
    {
      id: "ecommerce-platform",
      status: "published",
      featured: true,
      name: "E-Commerce Platform",
      category: "Retail",
      summary: "Online marketplace concept with catalogue, checkout, and inventory workflows.",
      challenge: "",
      solution: "",
      scope: [],
      technologies: [],
      image: "assets/images/projects/cover-ecommerce-platform.svg",
      liveUrl: "",
      repoUrl: "",
      href: "projects/ecommerce-platform.html",
    },
    {
      id: "lms",
      status: "published",
      featured: true,
      name: "Learning Management System",
      category: "Education",
      summary: "Course, lesson, and progress-tracking platform concept for learning programmes.",
      challenge: "",
      solution: "",
      scope: [],
      technologies: [],
      image: "assets/images/projects/cover-lms.svg",
      liveUrl: "",
      repoUrl: "",
      href: "projects/learning-management-system.html",
    },
    {
      id: "analytics-dashboard",
      status: "draft",
      featured: false,
      name: "Analytics Dashboard",
      category: "Business intelligence",
      summary: "Data visualisation concept with charts and KPI tracking.",
      href: "",
    },
    {
      id: "mobile-application",
      status: "draft",
      featured: false,
      name: "Mobile Application",
      category: "Technology",
      summary: "Cross-platform mobile concept. Details to be confirmed.",
      href: "",
    },
    {
      id: "enterprise-management",
      status: "draft",
      featured: false,
      name: "Enterprise Management System",
      category: "Enterprise",
      summary: "Internal operations platform concept. Details to be confirmed.",
      href: "",
    },
  ],

  /* Client logos: leave empty until real, approved logos exist.
     Entry shape: { name: "Client name", logo: "assets/images/clients/name.svg", href: "https://..." }
     The "Trusted by" strip appears automatically once this has entries. */
  clients: [],
  testimonials: [],
};

window.MYME.whatsappUrl = function whatsappUrl() {
  const { e164, message } = window.MYME.contact.whatsapp;
  return "https://wa.me/" + e164 + "?text=" + encodeURIComponent(message);
};
