import {
  ADMIN_BOOKING_STATUSES,
  ADMIN_BOOKING_STATUS_OPTIONS,
  DASHBOARD_REFERENCE_DATE,
  adminDashboardMetrics,
  getAdminBookingById,
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

const statusDescriptions = new Map(
  ADMIN_BOOKING_STATUS_OPTIONS.map((option) => [option.value, option.description]),
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

const formatLongDate = (value) =>
  new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    weekday: "long",
    year: "numeric",
  }).format(new Date(value));

const formatCurrency = (cents) =>
  new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(cents / 100);

const getStatusLabel = (status) => statusLabels.get(status) || status;

const getStatusDescription = (status) => statusDescriptions.get(status) || "Booking inquiry status.";

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

const getSearchText = (booking) =>
  [
    booking.projectName,
    booking.message,
    booking.source,
    booking.timelineLabel,
    booking.priority,
    getStatusLabel(booking.status),
    booking.client?.company,
    booking.client?.contactName,
    booking.client?.email,
    booking.client?.location,
    booking.service?.name,
    booking.service?.category,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

const toInboxBooking = (booking) => ({
  client: {
    company: booking.client?.company || "Unknown client",
    contactName: booking.client?.contactName || "Unassigned contact",
    email: booking.client?.email || "No email on file",
    location: booking.client?.location || "Location pending",
    phone: booking.client?.phone || "No phone on file",
    tags: booking.client?.tags || [],
  },
  createdAtLabel: formatDateTime(booking.createdAt),
  desiredDate: {
    dateTime: booking.desiredDate,
    label: formatLongDate(`${booking.desiredDate}T12:00:00.000Z`),
    shortLabel: formatDate(`${booking.desiredDate}T12:00:00.000Z`, {
      weekday: "short",
      year: "numeric",
    }),
  },
  estimatedValue: formatCurrency(booking.estimatedValueCents),
  id: booking.id,
  internalNotes: booking.internalNotes,
  lastContactedLabel: booking.lastContactedAt ? formatDateTime(booking.lastContactedAt) : "Not contacted",
  message: booking.message,
  priority: booking.priority,
  projectName: booking.projectName,
  repliedLabel: booking.repliedAt ? formatDateTime(booking.repliedAt) : "Awaiting reply",
  service: {
    category: booking.service?.category || "Studio",
    deliverables: booking.service?.deliverables || [],
    durationLabel: booking.service?.durationLabel || "Date pending",
    name: booking.service?.name || "Studio booking",
  },
  source: booking.source,
  status: {
    description: getStatusDescription(booking.status),
    label: getStatusLabel(booking.status),
    value: booking.status,
  },
  timelineLabel: booking.timelineLabel,
  updatedAtLabel: formatDateTime(booking.updatedAt),
});

const buildTimelineEvents = (booking) =>
  [
    {
      dateTime: booking.createdAt,
      description: `Inquiry came in from ${booking.source || "an unknown source"}.`,
      label: formatDateTime(booking.createdAt),
      title: "Inquiry received",
    },
    booking.repliedAt
      ? {
          dateTime: booking.repliedAt,
          description: "Studio response was logged in the mock record.",
          label: formatDateTime(booking.repliedAt),
          title: "First reply sent",
        }
      : {
          dateTime: booking.createdAt,
          description: "No reply is logged yet. Keep this visible for follow-up.",
          label: "Awaiting reply",
          title: "Reply pending",
        },
    booking.lastContactedAt
      ? {
          dateTime: booking.lastContactedAt,
          description: "Most recent studio contact point.",
          label: formatDateTime(booking.lastContactedAt),
          title: "Last contacted",
        }
      : null,
    {
      dateTime: `${booking.desiredDate}T12:00:00.000Z`,
      description: `${booking.timelineLabel || "Client preferred timing"} for the selected service.`,
      label: formatLongDate(`${booking.desiredDate}T12:00:00.000Z`),
      title: "Preferred date",
    },
    booking.updatedAt
      ? {
          dateTime: booking.updatedAt,
          description: "Latest mock admin movement on this inquiry.",
          label: formatDateTime(booking.updatedAt),
          title: "Record updated",
        }
      : null,
  ].filter(Boolean);

export function getBookingInboxContent({ query = "", selectedId, status = "all" } = {}) {
  const normalizedQuery = query.trim().toLowerCase();
  const statusValues = new Set(ADMIN_BOOKING_STATUS_OPTIONS.map((option) => option.value));
  const activeStatus = statusValues.has(status) ? status : "all";
  const allBookings = listAdminBookings({ includeArchived: false });
  const filteredBookings = allBookings
    .filter((booking) => activeStatus === "all" || booking.status === activeStatus)
    .filter((booking) => !normalizedQuery || getSearchText(booking).includes(normalizedQuery));
  const inboxItems = filteredBookings.map(toInboxBooking);
  const selectedBooking =
    inboxItems.find((booking) => booking.id === selectedId) || inboxItems[0] || null;
  const statusCounts = new Map(
    ADMIN_BOOKING_STATUS_OPTIONS.map((option) => [
      option.value,
      allBookings.filter((booking) => booking.status === option.value).length,
    ]),
  );

  return {
    activeStatus,
    filters: [
      {
        count: allBookings.length,
        label: "All",
        value: "all",
      },
      ...ADMIN_BOOKING_STATUS_OPTIONS.filter(
        (option) => option.value !== ADMIN_BOOKING_STATUSES.archived,
      ).map((option) => ({
        count: statusCounts.get(option.value) || 0,
        label: option.label,
        value: option.value,
      })),
    ],
    hero: {
      eyebrow: "Booking inbox",
      title: "Scan every inquiry before it becomes studio work.",
      description:
        "Review client context, preferred dates, service fit, status movement, and follow-up needs from one mock operations queue.",
    },
    items: inboxItems,
    query,
    selectedBooking,
    summary: [
      {
        label: "Showing",
        meta: activeStatus === "all" ? "All visible inquiries" : getStatusLabel(activeStatus),
        value: inboxItems.length,
      },
      {
        label: "High priority",
        meta: "Needs faster review",
        value: inboxItems.filter((booking) => booking.priority === "high").length,
      },
      {
        label: "Awaiting reply",
        meta: "No first response logged",
        value: inboxItems.filter((booking) => booking.repliedLabel === "Awaiting reply").length,
      },
    ],
  };
}

export function getBookingDetailContent(bookingId) {
  const booking = getAdminBookingById(bookingId);
  const activeBookings = listAdminBookings({ includeArchived: false });

  if (!booking || booking.status === ADMIN_BOOKING_STATUSES.archived) {
    return {
      booking: null,
      hero: {
        eyebrow: "Booking review",
        title: "Booking inquiry unavailable",
        description:
          "This mock booking detail could not be found in the active studio queue.",
      },
      relatedBookings: activeBookings.slice(0, 3).map(toInboxBooking),
    };
  }

  const detail = toInboxBooking(booking);
  const relatedBookings = activeBookings
    .filter((candidate) => candidate.clientId === booking.clientId && candidate.id !== booking.id)
    .slice(0, 3)
    .map(toInboxBooking);

  return {
    booking: {
      ...detail,
      client: {
        ...detail.client,
        tags: detail.client.tags,
      },
      createdAtLabel: formatDateTime(booking.createdAt),
      preferences: [
        {
          label: "Preferred date",
          value: detail.desiredDate.label,
        },
        {
          label: "Timeline",
          value: detail.timelineLabel,
        },
        {
          label: "Source",
          value: booking.source,
        },
        {
          label: "Priority",
          value: `${booking.priority} priority`,
        },
      ],
      service: {
        ...detail.service,
        summary: booking.service?.summary || "Selected studio service.",
      },
      statusOptions: ADMIN_BOOKING_STATUS_OPTIONS.filter(
        (option) => option.value !== ADMIN_BOOKING_STATUSES.archived,
      ),
      timeline: buildTimelineEvents(booking),
    },
    hero: {
      eyebrow: "Booking review",
      title: detail.projectName,
      description:
        "Review client context, service fit, notes, timeline, and local-only status movement before the next studio follow-up.",
    },
    relatedBookings,
  };
}
