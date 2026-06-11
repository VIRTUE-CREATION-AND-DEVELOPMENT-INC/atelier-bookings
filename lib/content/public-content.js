const PUBLISHED_STATUS = "published";

const sortByDisplayOrder = (items) =>
  [...items].sort((first, second) => first.displayOrder - second.displayOrder);

const onlyPublished = (items) =>
  sortByDisplayOrder(items).filter((item) => item.status === PUBLISHED_STATUS);

export const publicContentMetadata = {
  contentVersion: "2026-06-11-public-content-v1",
  contentOwner: "studio",
  locale: "en-US",
  notes:
    "Generic boutique creative studio mock content. Replace placeholders with CMS records before launch.",
};

export const studioProfile = {
  id: "studio-profile",
  status: PUBLISHED_STATUS,
  name: "Atelier Bookings",
  eyebrow: "Boutique creative studio",
  headline: "Creative production, styling, and booking support for polished brand moments.",
  summary:
    "A compact studio team helping founders, artists, and growing teams plan visual projects with clear service packages, thoughtful direction, and a calm booking process.",
  intro:
    "The studio pairs creative direction with practical production planning, so clients can move from early ideas to shoot-ready briefs, styled sessions, and edited deliverables without managing every detail alone.",
  values: [
    "Considered planning",
    "Editorial-quality detail",
    "Transparent timelines",
    "Warm client care",
  ],
  highlights: [
    {
      id: "profile-highlight-creative-direction",
      label: "Direction",
      value: "Concept, mood, and production guidance",
    },
    {
      id: "profile-highlight-production",
      label: "Production",
      value: "Booking, prep, and on-set coordination",
    },
    {
      id: "profile-highlight-delivery",
      label: "Delivery",
      value: "Organized assets and next-step recommendations",
    },
  ],
};

export const services = [
  {
    id: "service-brand-session",
    slug: "brand-session",
    status: PUBLISHED_STATUS,
    displayOrder: 10,
    title: "Brand Session",
    eyebrow: "Signature offer",
    summary:
      "A guided creative session for updated portraits, product moments, campaign visuals, or launch imagery.",
    description:
      "Designed for clients who need a polished visual refresh with creative direction, preparation notes, styling guidance, and a clear production plan.",
    startingAt: "$850",
    duration: "Half-day studio booking",
    bestFor: ["Founders", "Personal brands", "Small teams"],
    deliverables: [
      "Creative brief and shot direction",
      "Studio session planning",
      "Curated image selection",
      "Edited visual set for web and social",
    ],
    bookingCtaId: "cta-book-consultation",
  },
  {
    id: "service-content-day",
    slug: "content-day",
    status: PUBLISHED_STATUS,
    displayOrder: 20,
    title: "Content Day",
    eyebrow: "Recurring creative support",
    summary:
      "A streamlined production block for teams that need consistent campaign, social, or editorial assets.",
    description:
      "A planning-first session with a repeatable structure, designed to capture multiple content needs in one organized studio day.",
    startingAt: "$1,450",
    duration: "Full-day studio booking",
    bestFor: ["Campaigns", "Product updates", "Editorial calendars"],
    deliverables: [
      "Pre-session content map",
      "Production schedule",
      "Multi-look capture plan",
      "Delivery-ready image and clip list",
    ],
    bookingCtaId: "cta-start-project",
  },
  {
    id: "service-creative-consult",
    slug: "creative-consult",
    status: PUBLISHED_STATUS,
    displayOrder: 30,
    title: "Creative Consult",
    eyebrow: "Planning session",
    summary:
      "A focused strategy call for clients who need clarity before committing to a larger production.",
    description:
      "Ideal for shaping an idea, identifying the right service path, reviewing visual references, and defining a practical next step.",
    startingAt: "$175",
    duration: "60-minute remote session",
    bestFor: ["New ideas", "Launch planning", "Creative audits"],
    deliverables: [
      "Direction notes",
      "Service recommendation",
      "Priority shot or asset list",
      "Estimated production path",
    ],
    bookingCtaId: "cta-book-consultation",
  },
];

export const galleryItems = [
  {
    id: "gallery-editorial-portrait",
    slug: "editorial-portrait-study",
    status: PUBLISHED_STATUS,
    displayOrder: 10,
    title: "Editorial portrait study",
    category: "Portraits",
    serviceSlug: "brand-session",
    image: {
      assetKey: "placeholder-editorial-portrait",
      alt: "Editorial portrait setup with neutral styling and soft studio light",
      aspectRatio: "4 / 5",
      palette: ["warm ivory", "charcoal", "soft taupe"],
    },
  },
  {
    id: "gallery-product-still-life",
    slug: "product-still-life",
    status: PUBLISHED_STATUS,
    displayOrder: 20,
    title: "Product still life",
    category: "Product",
    serviceSlug: "content-day",
    image: {
      assetKey: "placeholder-product-still-life",
      alt: "Minimal product composition on a styled studio surface",
      aspectRatio: "1 / 1",
      palette: ["porcelain", "sage", "ink"],
    },
  },
  {
    id: "gallery-campaign-tabletop",
    slug: "campaign-tabletop",
    status: PUBLISHED_STATUS,
    displayOrder: 30,
    title: "Campaign tabletop",
    category: "Campaign",
    serviceSlug: "content-day",
    image: {
      assetKey: "placeholder-campaign-tabletop",
      alt: "Styled tabletop scene prepared for a boutique brand campaign",
      aspectRatio: "16 / 10",
      palette: ["stone", "clay", "cream"],
    },
  },
  {
    id: "gallery-studio-prep",
    slug: "studio-prep",
    status: PUBLISHED_STATUS,
    displayOrder: 40,
    title: "Studio prep",
    category: "Behind the scenes",
    serviceSlug: "creative-consult",
    image: {
      assetKey: "placeholder-studio-prep",
      alt: "Creative planning desk with notes, samples, and production materials",
      aspectRatio: "3 / 2",
      palette: ["paper white", "graphite", "muted green"],
    },
  },
];

export const testimonials = [
  {
    id: "testimonial-founder-launch",
    status: PUBLISHED_STATUS,
    displayOrder: 10,
    quote:
      "The process felt organized from the first call. We arrived knowing what to bring, what we were making, and how the final assets would be used.",
    attribution: "Founder, lifestyle brand",
    projectType: "Brand Session",
  },
  {
    id: "testimonial-studio-day",
    status: PUBLISHED_STATUS,
    displayOrder: 20,
    quote:
      "Our content day gave us a full library without the usual production scramble. The shot list, styling, and pace were all handled with care.",
    attribution: "Marketing lead, boutique team",
    projectType: "Content Day",
  },
  {
    id: "testimonial-creative-audit",
    status: PUBLISHED_STATUS,
    displayOrder: 30,
    quote:
      "The consult helped us turn a vague launch idea into a clear production plan. We left with priorities, timelines, and a realistic next step.",
    attribution: "Independent creative director",
    projectType: "Creative Consult",
  },
];

export const faqs = [
  {
    id: "faq-how-booking-works",
    status: PUBLISHED_STATUS,
    displayOrder: 10,
    question: "How does the booking process work?",
    answer:
      "Start with an inquiry or consult request. The studio reviews the project goals, recommends the right service path, and confirms scope, timing, and preparation notes before a booking is held.",
  },
  {
    id: "faq-what-to-prepare",
    status: PUBLISHED_STATUS,
    displayOrder: 20,
    question: "What should I prepare before a session?",
    answer:
      "Bring brand references, product or wardrobe notes, priority use cases, and any deadlines. The studio turns those details into a focused shot list and session plan.",
  },
  {
    id: "faq-timeline",
    status: PUBLISHED_STATUS,
    displayOrder: 30,
    question: "How far ahead should I book?",
    answer:
      "Two to four weeks is recommended for most studio sessions. Larger campaigns, multiple collaborators, or custom styling needs may require a longer planning window.",
  },
  {
    id: "faq-custom-projects",
    status: PUBLISHED_STATUS,
    displayOrder: 40,
    question: "Can services be customized?",
    answer:
      "Yes. The published services are starting points for common needs, and the inquiry flow can capture custom timing, deliverables, collaborators, and production requirements.",
  },
];

export const callsToAction = [
  {
    id: "cta-book-consultation",
    status: PUBLISHED_STATUS,
    displayOrder: 10,
    label: "Book a consultation",
    headline: "Start with a focused creative call.",
    summary:
      "Share the project context and get a recommended service path before reserving studio time.",
    href: "/booking",
    intent: "primary",
  },
  {
    id: "cta-start-project",
    status: PUBLISHED_STATUS,
    displayOrder: 20,
    label: "Start a project inquiry",
    headline: "Tell us what you are planning.",
    summary:
      "Use the inquiry flow for campaign ideas, content days, visual refreshes, or custom studio support.",
    href: "/booking",
    intent: "secondary",
  },
  {
    id: "cta-view-services",
    status: PUBLISHED_STATUS,
    displayOrder: 30,
    label: "Explore services",
    headline: "Find the right studio support.",
    summary:
      "Compare planning, production, and content packages before choosing a booking path.",
    href: "/services",
    intent: "navigation",
  },
];

export const publicNavigation = [
  { id: "nav-services", label: "Services", href: "/services" },
  { id: "nav-gallery", label: "Gallery", href: "/gallery" },
  { id: "nav-faq", label: "FAQ", href: "/faq" },
  { id: "nav-booking", label: "Book", href: "/booking" },
];

export const publicPageContent = {
  home: {
    metadata: {
      title: "Atelier Bookings | Boutique creative studio",
      description:
        "Creative production, styling, and booking support for polished brand moments.",
    },
    hero: {
      eyebrow: studioProfile.eyebrow,
      headline: studioProfile.headline,
      summary: studioProfile.summary,
      primaryCtaId: "cta-book-consultation",
      secondaryCtaId: "cta-view-services",
    },
    value: {
      eyebrow: "Studio value",
      headline: "A clear production partner from idea to booked session.",
      summary:
        "Atelier Bookings helps clients make confident creative decisions before studio time is reserved, so every session has a purpose, a plan, and a practical delivery path.",
      points: [
        {
          id: "value-service-fit",
          title: "Service fit first",
          summary:
            "Compare scope, timing, and deliverables before choosing the right booking path.",
        },
        {
          id: "value-creative-brief",
          title: "Creative brief clarity",
          summary:
            "Turn references, goals, and constraints into a focused session plan.",
        },
        {
          id: "value-production-care",
          title: "Production care",
          summary:
            "Coordinate prep, styling notes, shot priorities, and delivery expectations in one place.",
        },
      ],
    },
    process: {
      eyebrow: "Process",
      headline: "A calm path from early idea to final assets.",
      summary:
        "The public booking flow is designed to collect the right context first, then guide each client toward a realistic scope and production timeline.",
      steps: [
        {
          id: "process-discover",
          label: "01",
          title: "Discover",
          summary:
            "Review service categories, starting points, and recent work examples.",
        },
        {
          id: "process-inquire",
          label: "02",
          title: "Inquire",
          summary:
            "Share goals, dates, collaborators, and must-have deliverables.",
        },
        {
          id: "process-plan",
          label: "03",
          title: "Plan",
          summary:
            "Receive a recommended service path, prep notes, and booking next steps.",
        },
      ],
    },
    featuredServiceSlugs: ["brand-session", "content-day", "creative-consult"],
    featuredGallerySlugs: [
      "editorial-portrait-study",
      "product-still-life",
      "campaign-tabletop",
    ],
    featuredTestimonialIds: [
      "testimonial-founder-launch",
      "testimonial-studio-day",
    ],
  },
  services: {
    metadata: {
      title: "Services | Atelier Bookings",
      description:
        "Compare creative studio services, deliverables, timelines, and booking paths.",
    },
    eyebrow: "Services",
    headline: "Choose the right level of creative studio support.",
    summary:
      "Each service is structured to help clients understand scope, timing, and deliverables before starting a booking inquiry.",
    hero: {
      eyebrow: "Service discovery",
      headline: "Compare studio services before you book.",
      summary:
        "Browse focused offers for brand refreshes, content production, and early-stage creative planning, then start the inquiry path that matches the project.",
      primaryCtaId: "cta-start-project",
      secondaryCtaId: "cta-book-consultation",
    },
    comparison: {
      eyebrow: "Service categories",
      headline: "Three entry points for common creative needs.",
      summary:
        "Use these packages as starting points. Custom scopes can be shaped during inquiry when timelines, collaborators, or deliverables need more care.",
    },
    process: {
      eyebrow: "Booking flow",
      headline: "How service discovery turns into a confirmed session.",
      summary:
        "The inquiry path keeps expectations visible before a client commits to a date.",
      steps: [
        "Choose a likely service category.",
        "Share project goals, timing, references, and constraints.",
        "Receive a recommended scope with prep notes and next steps.",
      ],
    },
    proof: {
      eyebrow: "Client outcomes",
      headline: "Organized sessions, clearer decisions, stronger creative assets.",
    },
    faqIntro: {
      eyebrow: "Before booking",
      headline: "Questions clients usually ask while comparing services.",
    },
  },
  gallery: {
    eyebrow: "Gallery",
    headline: "A flexible visual system for future studio work.",
    summary:
      "Placeholder gallery records are ready for real CMS-managed imagery, alt text, categories, and service relationships.",
  },
  faq: {
    eyebrow: "FAQ",
    headline: "Common questions before booking.",
    summary:
      "Use these answers as starter guidance for inquiry, preparation, timeline, and custom project expectations.",
  },
};

export const publicContentCollections = {
  services,
  galleryItems,
  testimonials,
  faqs,
  callsToAction,
};

export function getPublishedServices() {
  return onlyPublished(services);
}

export function getPublishedGalleryItems() {
  return onlyPublished(galleryItems);
}

export function getPublishedTestimonials() {
  return onlyPublished(testimonials);
}

export function getPublishedFaqs() {
  return onlyPublished(faqs);
}

export function getPublishedCallsToAction() {
  return onlyPublished(callsToAction);
}

export function getCallToActionById(id) {
  return callsToAction.find(
    (callToAction) =>
      callToAction.id === id && callToAction.status === PUBLISHED_STATUS,
  );
}

export function getServiceBySlug(slug) {
  return services.find(
    (service) => service.slug === slug && service.status === PUBLISHED_STATUS,
  );
}

export function getGalleryItemBySlug(slug) {
  return galleryItems.find(
    (galleryItem) =>
      galleryItem.slug === slug && galleryItem.status === PUBLISHED_STATUS,
  );
}

export function getGalleryItemsByServiceSlug(serviceSlug) {
  return onlyPublished(
    galleryItems.filter((galleryItem) => galleryItem.serviceSlug === serviceSlug),
  );
}
