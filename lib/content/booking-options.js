import { CONTENT_STATUS } from "./types";
import { listAdminVisible, listPublished } from "./utils";

/** @type {import("./types").BookingOption[]} */
export const bookingOptions = [
  {
    id: "booking-service-brand-session",
    status: CONTENT_STATUS.published,
    type: "service",
    label: "Brand Session",
    value: "service-brand-session",
    description: "Founder, team, or service-brand studio imagery.",
    sortOrder: 10,
  },
  {
    id: "booking-service-campaign-production",
    status: CONTENT_STATUS.published,
    type: "service",
    label: "Campaign Production",
    value: "service-campaign-production",
    description: "Launch, editorial, or product campaign planning.",
    sortOrder: 20,
  },
  {
    id: "booking-service-client-experience",
    status: CONTENT_STATUS.published,
    type: "service",
    label: "Client Experience",
    value: "service-client-experience",
    description: "Private appointment or small group creative session.",
    sortOrder: 30,
  },
  {
    id: "booking-timeline-this-month",
    status: CONTENT_STATUS.published,
    type: "timeline",
    label: "This month",
    value: "this-month",
    description: "A near-term booking with flexible final dates.",
    sortOrder: 110,
  },
  {
    id: "booking-timeline-next-quarter",
    status: CONTENT_STATUS.published,
    type: "timeline",
    label: "Next quarter",
    value: "next-quarter",
    description: "A planned production window with time for creative prep.",
    sortOrder: 120,
  },
  {
    id: "booking-budget-under-1500",
    status: CONTENT_STATUS.published,
    type: "budget",
    label: "Under $1,500",
    value: "under-1500",
    description: "Best aligned to focused sessions and compact appointments.",
    sortOrder: 210,
  },
  {
    id: "booking-budget-1500-3500",
    status: CONTENT_STATUS.published,
    type: "budget",
    label: "$1,500-$3,500",
    value: "1500-3500",
    description: "A typical range for creative sessions and smaller campaigns.",
    sortOrder: 220,
  },
  {
    id: "booking-budget-3500-plus",
    status: CONTENT_STATUS.published,
    type: "budget",
    label: "$3,500+",
    value: "3500-plus",
    description: "For productions with broader planning, team, or delivery needs.",
    sortOrder: 230,
  },
  {
    id: "booking-contact-email",
    status: CONTENT_STATUS.published,
    type: "contact_method",
    label: "Email",
    value: "email",
    description: "Best for detailed scope and file references.",
    sortOrder: 310,
  },
  {
    id: "booking-contact-phone",
    status: CONTENT_STATUS.published,
    type: "contact_method",
    label: "Phone",
    value: "phone",
    description: "Best for quick fit checks and scheduling details.",
    sortOrder: 320,
  },
  {
    id: "booking-goal-launch",
    status: CONTENT_STATUS.published,
    type: "project_goal",
    label: "Launch support",
    value: "launch-support",
    description: "Content or production for a new offer, campaign, or brand moment.",
    sortOrder: 410,
  },
  {
    id: "booking-goal-refresh",
    status: CONTENT_STATUS.published,
    type: "project_goal",
    label: "Visual refresh",
    value: "visual-refresh",
    description: "Updated brand, profile, product, or client-facing imagery.",
    sortOrder: 420,
  },
];

export function listPublicBookingOptions() {
  return listPublished(bookingOptions);
}

export function listAdminBookingOptions() {
  return listAdminVisible(bookingOptions);
}

export function listPublicBookingOptionsByType(type) {
  return listPublicBookingOptions().filter((option) => option.type === type);
}

export function getBookingOptionGroups() {
  return {
    services: listPublicBookingOptionsByType("service"),
    timelines: listPublicBookingOptionsByType("timeline"),
    budgets: listPublicBookingOptionsByType("budget"),
    contactMethods: listPublicBookingOptionsByType("contact_method"),
    projectGoals: listPublicBookingOptionsByType("project_goal"),
  };
}
