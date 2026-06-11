import {
  ADMIN_BOOKING_STATUSES,
  ADMIN_BOOKING_STATUS_OPTIONS,
  DASHBOARD_REFERENCE_DATE,
  adminDashboardMetrics,
  listAdminBookings,
} from "@/lib/admin/mockStudioData";

export const metadata = {
  title: "Studio Admin | Atelier Bookings",
  description: "Mock studio dashboard for booking inquiries and client follow-up.",
};

const pendingStatuses = new Set([
  ADMIN_BOOKING_STATUSES.new,
  ADMIN_BOOKING_STATUSES.reviewing,
]);

const activeDateStatuses = new Set([
  ADMIN_BOOKING_STATUSES.new,
  ADMIN_BOOKING_STATUSES.reviewing,
  ADMIN_BOOKING_STATUSES.proposalSent,
  ADMIN_BOOKING_STATUSES.confirmed,
]);

const statusLabels = new Map(
  ADMIN_BOOKING_STATUS_OPTIONS.map((option) => [option.value, option.label]),
);

const formatDate = (value, options = {}) =>
  new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
    ...options,
  }).format(new Date(value));

const formatDateTime = (value) =>
  new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(value));

const formatCurrency = (cents) =>
  new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(cents / 100);

const getStatusLabel = (status) => statusLabels.get(status) || status;

const getActivityMessage = (booking) => {
  if (booking.status === ADMIN_BOOKING_STATUSES.new) {
    return "New inquiry received";
  }

  if (booking.status === ADMIN_BOOKING_STATUSES.proposalSent) {
    return "Proposal sent";
  }

  if (booking.status === ADMIN_BOOKING_STATUSES.confirmed) {
    return "Booking confirmed";
  }

  if (booking.status === ADMIN_BOOKING_STATUSES.completed) {
    return "Project completed";
  }

  if (booking.status === ADMIN_BOOKING_STATUSES.declined) {
    return "Inquiry declined";
  }

  return "Inquiry updated";
};

export function getAdminDashboardContent() {
  const bookings = listAdminBookings({ includeArchived: true });
  const activeBookings = bookings.filter(
    (booking) => booking.status !== ADMIN_BOOKING_STATUSES.archived,
  );
  const referenceTime = new Date(DASHBOARD_REFERENCE_DATE).getTime();
  const pendingRequests = activeBookings.filter((booking) =>
    pendingStatuses.has(booking.status),
  );
  const upcomingPreferredDates = activeBookings
    .filter((booking) => activeDateStatuses.has(booking.status))
    .filter((booking) => new Date(`${booking.desiredDate}T12:00:00.000Z`).getTime() >= referenceTime)
    .sort((a, b) => new Date(a.desiredDate).getTime() - new Date(b.desiredDate).getTime())
    .slice(0, 4)
    .map((booking) => ({
      client: booking.client?.company || "Unknown client",
      dateTime: booking.desiredDate,
      dateLabel: formatDate(`${booking.desiredDate}T12:00:00.000Z`, {
        weekday: "short",
      }),
      id: booking.id,
      projectName: booking.projectName,
      service: booking.service?.name || "Studio booking",
      status: getStatusLabel(booking.status),
    }));
  const recentActivity = activeBookings
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5)
    .map((booking) => ({
      action: getActivityMessage(booking),
      client: booking.client?.company || "Unknown client",
      id: booking.id,
      projectName: booking.projectName,
      timestamp: formatDateTime(booking.updatedAt),
    }));
  const statusCounts = adminDashboardMetrics.statusGroups.map((group) => ({
    ...group,
    percentage:
      adminDashboardMetrics.totalInquiries > 0
        ? Math.round((group.count / adminDashboardMetrics.totalInquiries) * 100)
        : 0,
  }));

  return {
    hero: {
      eyebrow: "Mock Admin",
      title: "Studio booking dashboard",
      description:
        "A demo-only operations view for tracking creative inquiries, preferred dates, status movement, and next follow-ups.",
    },
    metrics: [
      {
        label: "Inquiry volume",
        meta: `${adminDashboardMetrics.recentInquiryCount} in the last 7 days`,
        value: adminDashboardMetrics.totalInquiries,
      },
      {
        label: "Pending requests",
        meta: "New or reviewing",
        value: pendingRequests.length,
      },
      {
        label: "Pipeline value",
        meta: `${adminDashboardMetrics.conversionRate}% mock conversion`,
        value: adminDashboardMetrics.pipelineValueLabel,
      },
      {
        label: "Avg. lead time",
        meta: "Inquiry to preferred date",
        value: `${adminDashboardMetrics.averageLeadTimeDays} days`,
      },
    ],
    pendingRequests: pendingRequests.slice(0, 3).map((booking) => ({
      client: booking.client?.company || "Unknown client",
      id: booking.id,
      projectName: booking.projectName,
      service: booking.service?.name || "Studio booking",
      value: formatCurrency(booking.estimatedValueCents),
    })),
    recentActivity,
    statusCounts,
    upcomingPreferredDates,
  };
}
