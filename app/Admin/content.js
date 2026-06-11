import {
  adminBookingStatusLabels,
  adminDashboardContent,
  getAdminBookingSummary,
  listAdminBookingInquiries,
  listAdminBookingOptions,
  listAdminServices,
} from "@/lib/content";

const dateFormatter = new Intl.DateTimeFormat("en-CA", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
  year: "numeric",
});

const toLookup = (items, labelKey = "title") =>
  new Map(items.map((item) => [item.id, item[labelKey]]));

const toSummaryCards = (summary) => [
  { id: "total", label: "Total inquiries", value: summary.total },
  { id: "new", label: adminBookingStatusLabels.new, value: summary.new },
  {
    id: "reviewing",
    label: adminBookingStatusLabels.reviewing,
    value: summary.reviewing,
  },
  { id: "booked", label: adminBookingStatusLabels.booked, value: summary.booked },
];

const formatDate = (value) => dateFormatter.format(new Date(value));

export async function getAdminDashboardContent() {
  const summary = getAdminBookingSummary();
  const servicesById = toLookup(listAdminServices());
  const optionsById = toLookup(listAdminBookingOptions(), "label");
  const inquiries = listAdminBookingInquiries();

  return {
    ...adminDashboardContent,
    summaryCards: toSummaryCards(summary),
    rows: inquiries.map((inquiry) => ({
      id: inquiry.id,
      clientName: inquiry.clientName,
      clientEmail: inquiry.clientEmail,
      serviceLabel: servicesById.get(inquiry.serviceId) || "Unassigned service",
      statusLabel: adminBookingStatusLabels[inquiry.status] || inquiry.status,
      requestedDateLabel: formatDate(inquiry.requestedDate),
      submittedAtLabel: formatDate(inquiry.submittedAt),
      budgetLabel: inquiry.budgetLabel,
      optionLabels: inquiry.optionIds
        .map((optionId) => optionsById.get(optionId))
        .filter(Boolean),
      internalNote: inquiry.internalNote,
      nextAction: inquiry.nextAction,
    })),
  };
}
