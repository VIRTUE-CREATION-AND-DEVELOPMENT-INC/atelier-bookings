import { CONTENT_STATUS } from "./types";
import { findById, listAdminVisible, listPublished } from "./utils";

/** @type {import("./types").TestimonialRecord[]} */
export const testimonials = [
  {
    id: "testimonial-founder-launch",
    status: CONTENT_STATUS.published,
    quote:
      "The session felt structured without feeling stiff. Every detail was handled before we arrived, and the final library gave our launch a clear visual language.",
    attribution: "Maya R.",
    role: "Founder, lifestyle brand",
    serviceId: "service-brand-session",
    rating: 5,
    featured: true,
    sortOrder: 10,
    updatedAt: "2026-06-11T00:00:00.000Z",
  },
  {
    id: "testimonial-campaign-team",
    status: CONTENT_STATUS.published,
    quote:
      "Atelier translated a loose campaign idea into a tight production plan. The team, timeline, and creative priorities were easy to understand.",
    attribution: "Jon A.",
    role: "Marketing lead",
    serviceId: "service-campaign-production",
    rating: 5,
    featured: true,
    sortOrder: 20,
    updatedAt: "2026-06-11T00:00:00.000Z",
  },
  {
    id: "testimonial-private-client",
    status: CONTENT_STATUS.published,
    quote:
      "The private appointment was calm, thoughtful, and beautifully paced. It felt premium from the first email to the final follow-up.",
    attribution: "Elena S.",
    role: "Private client",
    serviceId: "service-client-experience",
    rating: 5,
    featured: true,
    sortOrder: 30,
    updatedAt: "2026-06-11T00:00:00.000Z",
  },
];

export function listPublicTestimonials() {
  return listPublished(testimonials);
}

export function listFeaturedTestimonials() {
  return listPublicTestimonials().filter((testimonial) => testimonial.featured);
}

export function listAdminTestimonials() {
  return listAdminVisible(testimonials);
}

export function getTestimonialById(id) {
  return findById(testimonials, id);
}
