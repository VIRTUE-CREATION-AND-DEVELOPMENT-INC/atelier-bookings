import { CONTENT_STATUS } from "./types";
import { findById, listAdminVisible, listPublished } from "./utils";

/** @type {import("./types").ServiceRecord[]} */
export const services = [
  {
    id: "service-brand-session",
    status: CONTENT_STATUS.published,
    slug: "brand-session",
    title: "Brand Session",
    category: "Photography and direction",
    summary: "A focused studio session for founders, teams, and service brands.",
    description:
      "Creative direction, shot planning, and studio coordination for a polished image library that supports launches, websites, and social campaigns.",
    durationLabel: "Half-day or full-day",
    startingPriceLabel: "From $1,200",
    deliverables: [
      "Pre-session creative brief",
      "Shot list and styling direction",
      "Studio or location coordination",
      "Curated final gallery",
    ],
    bookingOptionIds: ["booking-service-brand-session"],
    galleryItemIds: ["gallery-brand-table", "gallery-portrait-set"],
    featured: true,
    sortOrder: 10,
    updatedAt: "2026-06-11T00:00:00.000Z",
  },
  {
    id: "service-campaign-production",
    status: CONTENT_STATUS.published,
    slug: "campaign-production",
    title: "Campaign Production",
    category: "Launch support",
    summary: "End-to-end planning for small campaigns and editorial concepts.",
    description:
      "Production planning for creative launches that need concept alignment, visual consistency, booking logistics, and client-facing communication.",
    durationLabel: "1-3 production days",
    startingPriceLabel: "From $3,500",
    deliverables: [
      "Campaign concept map",
      "Production schedule",
      "Talent and vendor coordination",
      "Post-session handoff checklist",
    ],
    bookingOptionIds: ["booking-service-campaign-production"],
    galleryItemIds: ["gallery-campaign-wall", "gallery-product-scene"],
    featured: true,
    sortOrder: 20,
    updatedAt: "2026-06-11T00:00:00.000Z",
  },
  {
    id: "service-client-experience",
    status: CONTENT_STATUS.published,
    slug: "client-experience",
    title: "Client Experience",
    category: "Private bookings",
    summary: "A guided creative appointment for VIP clients and intimate groups.",
    description:
      "A high-touch booking format for private client moments, portfolio refreshes, content days, and small group creative experiences.",
    durationLabel: "2-5 hours",
    startingPriceLabel: "From $850",
    deliverables: [
      "Inquiry review",
      "Appointment planning",
      "On-site flow support",
      "Follow-up summary",
    ],
    bookingOptionIds: ["booking-service-client-experience"],
    galleryItemIds: ["gallery-client-lounge", "gallery-detail-tray"],
    featured: true,
    sortOrder: 30,
    updatedAt: "2026-06-11T00:00:00.000Z",
  },
  {
    id: "service-content-retainer",
    status: CONTENT_STATUS.draft,
    slug: "content-retainer",
    title: "Content Retainer",
    category: "Recurring studio support",
    summary: "A draft option for recurring monthly studio production.",
    description:
      "Reserved for future recurring content packages once the booking flow and admin workflows are in place.",
    durationLabel: "Monthly",
    startingPriceLabel: "TBD",
    deliverables: ["Recurring shoot calendar", "Creative planning", "Monthly recap"],
    bookingOptionIds: [],
    galleryItemIds: [],
    featured: false,
    sortOrder: 40,
    updatedAt: "2026-06-11T00:00:00.000Z",
  },
];

export function listPublicServices() {
  return listPublished(services);
}

export function listAdminServices() {
  return listAdminVisible(services);
}

export function getServiceById(id) {
  return findById(services, id);
}

export function getPublicServiceBySlug(slug) {
  return listPublicServices().find((service) => service.slug === slug) || null;
}
