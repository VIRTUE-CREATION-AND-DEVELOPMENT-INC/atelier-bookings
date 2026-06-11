import { BOOKING_STATUS } from "./types";

export const adminBookingStatusLabels = {
  [BOOKING_STATUS.new]: "New",
  [BOOKING_STATUS.reviewing]: "Reviewing",
  [BOOKING_STATUS.proposalSent]: "Proposal sent",
  [BOOKING_STATUS.booked]: "Booked",
  [BOOKING_STATUS.completed]: "Completed",
  [BOOKING_STATUS.archived]: "Archived",
};

/** @type {import("./types").AdminBookingInquiry[]} */
export const mockBookingInquiries = [
  {
    id: "booking-inquiry-maya-rivera-20260608",
    status: BOOKING_STATUS.new,
    clientName: "Maya Rivera",
    clientEmail: "maya@example.com",
    serviceId: "service-brand-session",
    optionIds: [
      "booking-service-brand-session",
      "booking-timeline-this-month",
      "booking-budget-1500-3500",
      "booking-contact-email",
      "booking-goal-refresh",
    ],
    requestedDate: "2026-06-24",
    submittedAt: "2026-06-08T14:15:00.000Z",
    updatedAt: "2026-06-08T14:15:00.000Z",
    budgetLabel: "$1,500-$3,500",
    internalNote: "Needs updated founder portraits before a site relaunch.",
    nextAction: "Review references and send discovery call times.",
  },
  {
    id: "booking-inquiry-jon-avery-20260605",
    status: BOOKING_STATUS.reviewing,
    clientName: "Jon Avery",
    clientEmail: "jon@example.com",
    serviceId: "service-campaign-production",
    optionIds: [
      "booking-service-campaign-production",
      "booking-timeline-next-quarter",
      "booking-budget-3500-plus",
      "booking-contact-phone",
      "booking-goal-launch",
    ],
    requestedDate: "2026-07-18",
    submittedAt: "2026-06-05T18:30:00.000Z",
    updatedAt: "2026-06-06T10:20:00.000Z",
    budgetLabel: "$3,500+",
    internalNote: "Potential two-day product story with launch assets.",
    nextAction: "Draft production estimate and confirm launch window.",
  },
  {
    id: "booking-inquiry-elena-stone-20260601",
    status: BOOKING_STATUS.booked,
    clientName: "Elena Stone",
    clientEmail: "elena@example.com",
    serviceId: "service-client-experience",
    optionIds: [
      "booking-service-client-experience",
      "booking-timeline-this-month",
      "booking-budget-under-1500",
      "booking-contact-email",
      "booking-goal-refresh",
    ],
    requestedDate: "2026-06-19",
    submittedAt: "2026-06-01T09:10:00.000Z",
    updatedAt: "2026-06-04T16:45:00.000Z",
    budgetLabel: "Under $1,500",
    internalNote: "Private portfolio refresh confirmed.",
    nextAction: "Prepare day-of client brief.",
  },
];

export const adminDashboardContent = {
  title: "Booking Management",
  description:
    "Local mock records for future admin dashboards. Provider integration is intentionally out of scope.",
  emptyState: {
    title: "No booking inquiries yet",
    description: "New inquiries will appear here once the booking flow is connected.",
  },
  columns: [
    { id: "client", label: "Client" },
    { id: "service", label: "Service" },
    { id: "status", label: "Status" },
    { id: "requestedDate", label: "Requested date" },
    { id: "nextAction", label: "Next action" },
  ],
};

export function listAdminBookingInquiries() {
  return [...mockBookingInquiries].sort(
    (first, second) => new Date(second.submittedAt) - new Date(first.submittedAt),
  );
}

export function getAdminBookingInquiryById(id) {
  return mockBookingInquiries.find((inquiry) => inquiry.id === id) || null;
}

export function getAdminBookingSummary() {
  const inquiries = listAdminBookingInquiries();

  return {
    total: inquiries.length,
    new: inquiries.filter((inquiry) => inquiry.status === BOOKING_STATUS.new).length,
    reviewing: inquiries.filter(
      (inquiry) => inquiry.status === BOOKING_STATUS.reviewing,
    ).length,
    booked: inquiries.filter((inquiry) => inquiry.status === BOOKING_STATUS.booked)
      .length,
  };
}
