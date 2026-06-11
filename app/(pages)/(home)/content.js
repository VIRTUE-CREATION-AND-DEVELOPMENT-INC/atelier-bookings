import {
  getBookingOptionGroups,
  getPublicStudioProfile,
  listFeaturedGalleryItems,
  listFeaturedTestimonials,
  listPublicFaqsByPlacement,
  listPublicServices,
} from "@/lib/content";

const profile = getPublicStudioProfile();

export const metadata = {
  title: profile.seo.title,
  description: profile.seo.description,
};

const toServiceCard = (service) => ({
  id: service.id,
  slug: service.slug,
  eyebrow: service.category,
  title: service.title,
  description: service.summary,
  meta: [service.durationLabel, service.startingPriceLabel],
  items: service.deliverables,
});

const toGalleryCard = (item) => ({
  id: item.id,
  title: item.title,
  description: item.alt,
  mediaType: item.mediaType,
  imageUrl: item.imageUrl,
});

const toTestimonialCard = (testimonial) => ({
  id: testimonial.id,
  quote: testimonial.quote,
  attribution: testimonial.attribution,
  role: testimonial.role,
  rating: testimonial.rating,
});

const toFaqCard = (faq) => ({
  id: faq.id,
  question: faq.question,
  answer: faq.answer,
});

export async function getHomePageContent() {
  const bookingOptions = getBookingOptionGroups();

  return {
    profile,
    hero: {
      eyebrow: profile.serviceArea,
      title: profile.businessName,
      description: profile.summary,
      primaryCta: profile.primaryCta,
      secondaryCta: profile.secondaryCta,
      proofPoints: profile.values,
    },
    services: {
      id: "services",
      eyebrow: "Services",
      title: "Booking-ready creative services",
      description:
        "Each service record has a stable local ID, a slug, status, sort order, and booking option links so public pages and admin screens can share the same source.",
      items: listPublicServices().map(toServiceCard),
    },
    gallery: {
      id: "gallery",
      eyebrow: "Gallery",
      title: "CMS-ready visual records",
      description:
        "Gallery items are modeled as local records with media type, service relationships, featured flags, and accessible descriptions.",
      items: listFeaturedGalleryItems().map(toGalleryCard),
    },
    testimonials: {
      id: "testimonials",
      eyebrow: "Testimonials",
      title: "Reusable social proof",
      description:
        "Testimonials link back to services so future detail pages, booking flows, and admin tools can filter them without duplicating copy.",
      items: listFeaturedTestimonials().map(toTestimonialCard),
    },
    booking: {
      id: "booking-options",
      eyebrow: "Booking Options",
      title: "Inquiry choices ready for a future form",
      description:
        "Service, timeline, budget, contact, and project goal options are grouped from the same local collection that a future CMS can replace.",
      groups: [
        { id: "services", label: "Services", options: bookingOptions.services },
        { id: "timelines", label: "Timelines", options: bookingOptions.timelines },
        { id: "budgets", label: "Budgets", options: bookingOptions.budgets },
        {
          id: "contact-methods",
          label: "Contact methods",
          options: bookingOptions.contactMethods,
        },
        {
          id: "project-goals",
          label: "Project goals",
          options: bookingOptions.projectGoals,
        },
      ],
    },
    faqs: {
      id: "faqs",
      eyebrow: "FAQ",
      title: "Shared answers for discovery and booking",
      description:
        "FAQ placement metadata keeps page-specific display flexible while preserving a single local source of truth.",
      items: listPublicFaqsByPlacement("home").map(toFaqCard),
    },
  };
}
