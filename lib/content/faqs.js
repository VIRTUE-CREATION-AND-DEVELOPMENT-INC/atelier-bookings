import { CONTENT_STATUS } from "./types";
import { findById, listAdminVisible, listPublished } from "./utils";

/** @type {import("./types").FaqRecord[]} */
export const faqs = [
  {
    id: "faq-booking-start",
    status: CONTENT_STATUS.published,
    question: "How does a booking inquiry start?",
    answer:
      "Share the service, timeline, budget range, and a short project note. The studio reviews fit and follows up with next steps before anything is confirmed.",
    placements: ["home", "booking"],
    serviceIds: [],
    sortOrder: 10,
    updatedAt: "2026-06-11T00:00:00.000Z",
  },
  {
    id: "faq-custom-production",
    status: CONTENT_STATUS.published,
    question: "Can a service be customized?",
    answer:
      "Yes. The local service records define the starting structure, while the inquiry flow captures the details needed to shape scope, team, and schedule.",
    placements: ["home", "services", "booking"],
    serviceIds: [
      "service-brand-session",
      "service-campaign-production",
      "service-client-experience",
    ],
    sortOrder: 20,
    updatedAt: "2026-06-11T00:00:00.000Z",
  },
  {
    id: "faq-turnaround",
    status: CONTENT_STATUS.published,
    question: "When are final materials delivered?",
    answer:
      "Turnaround depends on the service and scope. Delivery expectations should be confirmed during the proposal stage before the booking is marked as booked.",
    placements: ["home", "booking"],
    serviceIds: ["service-brand-session", "service-campaign-production"],
    sortOrder: 30,
    updatedAt: "2026-06-11T00:00:00.000Z",
  },
  {
    id: "faq-admin-source",
    status: CONTENT_STATUS.draft,
    question: "Where will CMS records live later?",
    answer:
      "Future provider-backed records should replace these local getters without changing route-level rendering contracts.",
    placements: ["admin"],
    serviceIds: [],
    sortOrder: 40,
    updatedAt: "2026-06-11T00:00:00.000Z",
  },
];

export function listPublicFaqs() {
  return listPublished(faqs);
}

export function listPublicFaqsByPlacement(placement) {
  return listPublicFaqs().filter((faq) => faq.placements.includes(placement));
}

export function listAdminFaqs() {
  return listAdminVisible(faqs);
}

export function getFaqById(id) {
  return findById(faqs, id);
}
