export const ADMIN_BOOKING_STATUSES = {
  new: "new",
  reviewing: "reviewing",
  proposalSent: "proposal_sent",
  confirmed: "confirmed",
  completed: "completed",
  declined: "declined",
  archived: "archived",
};

export const ADMIN_BOOKING_STATUS_OPTIONS = [
  {
    description: "New inquiry waiting for studio review.",
    label: "New",
    value: ADMIN_BOOKING_STATUSES.new,
  },
  {
    description: "Studio is clarifying scope, dates, or fit.",
    label: "Reviewing",
    value: ADMIN_BOOKING_STATUSES.reviewing,
  },
  {
    description: "Proposal, estimate, or next-step note has been sent.",
    label: "Proposal sent",
    value: ADMIN_BOOKING_STATUSES.proposalSent,
  },
  {
    description: "Client accepted and the booking is on the studio calendar.",
    label: "Confirmed",
    value: ADMIN_BOOKING_STATUSES.confirmed,
  },
  {
    description: "The work is complete and ready for archive or follow-up.",
    label: "Completed",
    value: ADMIN_BOOKING_STATUSES.completed,
  },
  {
    description: "Inquiry is closed because it was not a fit or did not proceed.",
    label: "Declined",
    value: ADMIN_BOOKING_STATUSES.declined,
  },
  {
    description: "Hidden from the active admin queue.",
    label: "Archived",
    value: ADMIN_BOOKING_STATUSES.archived,
  },
];

export const ADMIN_BOOKING_PRIORITIES = {
  high: "high",
  medium: "medium",
  low: "low",
};

export const DASHBOARD_REFERENCE_DATE = "2026-06-11T12:00:00.000Z";

export const studioServiceReferences = [
  {
    basePriceCents: 240000,
    bookingLeadTimeDays: 21,
    category: "Brand",
    deliverables: ["Creative direction", "Half-day shoot", "Edited image set"],
    durationLabel: "Half day",
    id: "service-brand-session",
    name: "Brand Story Session",
    summary: "A focused studio session for founders and small teams refreshing visual identity.",
  },
  {
    basePriceCents: 420000,
    bookingLeadTimeDays: 35,
    category: "Campaign",
    deliverables: ["Shot list", "Full-day production", "Campaign stills", "Usage-ready exports"],
    durationLabel: "Full day",
    id: "service-campaign-content",
    name: "Campaign Content Day",
    summary: "A production day for seasonal launches, promotions, and campaign libraries.",
  },
  {
    basePriceCents: 180000,
    bookingLeadTimeDays: 14,
    category: "Editorial",
    deliverables: ["Product styling", "Studio photography", "Retouched product set"],
    durationLabel: "3 hours",
    id: "service-product-editorial",
    name: "Product Editorial Mini",
    summary: "A compact product session for new collections, menus, or ecommerce updates.",
  },
  {
    basePriceCents: 320000,
    bookingLeadTimeDays: 28,
    category: "Event",
    deliverables: ["Pre-event planning", "Event coverage", "Preview gallery", "Edited gallery"],
    durationLabel: "Up to 6 hours",
    id: "service-event-coverage",
    name: "Studio Event Coverage",
    summary: "Documentary-style coverage for launch events, pop-ups, and private studio moments.",
  },
];

export const studioClientSummaries = [
  {
    company: "Northline Goods",
    contactName: "Avery Brooks",
    email: "avery.brooks@example.com",
    id: "client-northline-goods",
    location: "Toronto, ON",
    phone: "+1-555-0142",
    tags: ["retail", "returning"],
  },
  {
    company: "Field Notes Cafe",
    contactName: "Mina Patel",
    email: "mina.patel@example.com",
    id: "client-field-notes-cafe",
    location: "Hamilton, ON",
    phone: "+1-555-0188",
    tags: ["hospitality", "new lead"],
  },
  {
    company: "Alder House Studio",
    contactName: "Jordan Ellis",
    email: "jordan.ellis@example.com",
    id: "client-alder-house",
    location: "Ottawa, ON",
    phone: "+1-555-0164",
    tags: ["interiors", "proposal"],
  },
  {
    company: "Lumen Supply Co.",
    contactName: "Sam Rivera",
    email: "sam.rivera@example.com",
    id: "client-lumen-supply",
    location: "Mississauga, ON",
    phone: "+1-555-0119",
    tags: ["product", "confirmed"],
  },
  {
    company: "Harbor Lane Events",
    contactName: "Noah Kim",
    email: "noah.kim@example.com",
    id: "client-harbor-lane",
    location: "Kingston, ON",
    phone: "+1-555-0136",
    tags: ["event", "completed"],
  },
];

export const studioBookingRecords = [
  {
    archivedAt: null,
    clientId: "client-field-notes-cafe",
    createdAt: "2026-06-10T15:24:00.000Z",
    desiredDate: "2026-07-03",
    estimatedValueCents: 180000,
    id: "booking-1001",
    internalNotes: "Needs fast turnaround for a menu refresh. Confirm product count before quoting.",
    lastContactedAt: null,
    message:
      "We are opening a summer patio and need a small image set for our menu, website, and social posts.",
    priority: ADMIN_BOOKING_PRIORITIES.high,
    projectName: "Summer Menu Product Refresh",
    repliedAt: null,
    serviceId: "service-product-editorial",
    source: "website",
    status: ADMIN_BOOKING_STATUSES.new,
    timelineLabel: "Early July",
    updatedAt: "2026-06-10T15:24:00.000Z",
  },
  {
    archivedAt: null,
    clientId: "client-alder-house",
    createdAt: "2026-06-08T18:05:00.000Z",
    desiredDate: "2026-07-18",
    estimatedValueCents: 420000,
    id: "booking-1002",
    internalNotes: "Send location scouting questions and confirm usage needs.",
    lastContactedAt: "2026-06-09T13:10:00.000Z",
    message:
      "We are preparing a fall interiors campaign and need a warm image library for web, email, and paid ads.",
    priority: ADMIN_BOOKING_PRIORITIES.medium,
    projectName: "Fall Interiors Campaign",
    repliedAt: "2026-06-09T13:10:00.000Z",
    serviceId: "service-campaign-content",
    source: "referral",
    status: ADMIN_BOOKING_STATUSES.reviewing,
    timelineLabel: "Mid July",
    updatedAt: "2026-06-09T13:10:00.000Z",
  },
  {
    archivedAt: null,
    clientId: "client-northline-goods",
    createdAt: "2026-06-05T10:32:00.000Z",
    desiredDate: "2026-06-28",
    estimatedValueCents: 240000,
    id: "booking-1003",
    internalNotes: "Returning client. Proposal includes a lighter styling package.",
    lastContactedAt: "2026-06-07T16:45:00.000Z",
    message:
      "We need updated founder and workspace imagery for our wholesale deck before the end of the month.",
    priority: ADMIN_BOOKING_PRIORITIES.medium,
    projectName: "Wholesale Brand Update",
    repliedAt: "2026-06-06T14:18:00.000Z",
    serviceId: "service-brand-session",
    source: "email",
    status: ADMIN_BOOKING_STATUSES.proposalSent,
    timelineLabel: "Late June",
    updatedAt: "2026-06-07T16:45:00.000Z",
  },
  {
    archivedAt: null,
    clientId: "client-lumen-supply",
    createdAt: "2026-05-30T20:17:00.000Z",
    desiredDate: "2026-06-21",
    estimatedValueCents: 180000,
    id: "booking-1004",
    internalNotes: "Deposit received in mock state only. Do not connect to payment behavior.",
    lastContactedAt: "2026-06-02T11:00:00.000Z",
    message:
      "We have twelve new lighting accessories and need clean product images for our catalog.",
    priority: ADMIN_BOOKING_PRIORITIES.low,
    projectName: "Catalog Product Batch",
    repliedAt: "2026-05-31T14:30:00.000Z",
    serviceId: "service-product-editorial",
    source: "website",
    status: ADMIN_BOOKING_STATUSES.confirmed,
    timelineLabel: "Late June",
    updatedAt: "2026-06-02T11:00:00.000Z",
  },
  {
    archivedAt: null,
    clientId: "client-harbor-lane",
    createdAt: "2026-05-18T09:40:00.000Z",
    desiredDate: "2026-06-04",
    estimatedValueCents: 320000,
    id: "booking-1005",
    internalNotes: "Send testimonial request during handoff.",
    lastContactedAt: "2026-06-06T19:20:00.000Z",
    message:
      "We are hosting a private launch preview and need documentary event coverage plus a short gallery.",
    priority: ADMIN_BOOKING_PRIORITIES.low,
    projectName: "Private Launch Preview",
    repliedAt: "2026-05-18T16:15:00.000Z",
    serviceId: "service-event-coverage",
    source: "partner",
    status: ADMIN_BOOKING_STATUSES.completed,
    timelineLabel: "Completed",
    updatedAt: "2026-06-06T19:20:00.000Z",
  },
  {
    archivedAt: null,
    clientId: "client-field-notes-cafe",
    createdAt: "2026-05-14T12:12:00.000Z",
    desiredDate: "2026-06-12",
    estimatedValueCents: 240000,
    id: "booking-1006",
    internalNotes: "Client chose to wait until next quarter.",
    lastContactedAt: "2026-05-17T15:30:00.000Z",
    message:
      "We are considering founder portraits and behind-the-scenes photos for a hiring campaign.",
    priority: ADMIN_BOOKING_PRIORITIES.low,
    projectName: "Hiring Campaign Portraits",
    repliedAt: "2026-05-15T10:10:00.000Z",
    serviceId: "service-brand-session",
    source: "website",
    status: ADMIN_BOOKING_STATUSES.declined,
    timelineLabel: "Paused",
    updatedAt: "2026-05-17T15:30:00.000Z",
  },
  {
    archivedAt: "2026-05-12T17:00:00.000Z",
    clientId: "client-northline-goods",
    createdAt: "2026-04-28T14:22:00.000Z",
    desiredDate: "2026-05-20",
    estimatedValueCents: 420000,
    id: "booking-1007",
    internalNotes: "Archived duplicate request after consolidating with booking-1003.",
    lastContactedAt: "2026-05-03T11:25:00.000Z",
    message:
      "We may need a broader campaign day later this spring and want to understand available dates.",
    priority: ADMIN_BOOKING_PRIORITIES.low,
    projectName: "Spring Campaign Hold",
    repliedAt: "2026-04-29T12:00:00.000Z",
    serviceId: "service-campaign-content",
    source: "email",
    status: ADMIN_BOOKING_STATUSES.archived,
    timelineLabel: "Archived",
    updatedAt: "2026-05-12T17:00:00.000Z",
  },
];

const terminalStatuses = new Set([
  ADMIN_BOOKING_STATUSES.completed,
  ADMIN_BOOKING_STATUSES.declined,
  ADMIN_BOOKING_STATUSES.archived,
]);

const revenueStatuses = new Set([
  ADMIN_BOOKING_STATUSES.confirmed,
  ADMIN_BOOKING_STATUSES.completed,
]);

const pipelineStatuses = new Set([
  ADMIN_BOOKING_STATUSES.new,
  ADMIN_BOOKING_STATUSES.reviewing,
  ADMIN_BOOKING_STATUSES.proposalSent,
  ADMIN_BOOKING_STATUSES.confirmed,
]);

const getTime = (value) => new Date(value).getTime();

const roundCurrency = (cents) => Math.round(cents / 100);

const sortByCreatedAtDesc = (records) =>
  [...records].sort((a, b) => getTime(b.createdAt) - getTime(a.createdAt));

export function getServiceReferenceById(serviceId) {
  return studioServiceReferences.find((service) => service.id === serviceId) || null;
}

export function getClientSummaryById(clientId) {
  return studioClientSummaries.find((client) => client.id === clientId) || null;
}

export function getAdminBookingById(bookingId) {
  const booking = studioBookingRecords.find((record) => record.id === bookingId);

  return booking ? enrichBookingRecord(booking) : null;
}

export function enrichBookingRecord(record) {
  return {
    ...record,
    client: getClientSummaryById(record.clientId),
    service: getServiceReferenceById(record.serviceId),
  };
}

export function listAdminBookings({ includeArchived = false, status } = {}) {
  return sortByCreatedAtDesc(studioBookingRecords)
    .filter((record) => includeArchived || record.status !== ADMIN_BOOKING_STATUSES.archived)
    .filter((record) => !status || record.status === status)
    .map(enrichBookingRecord);
}

export function listClientSummaries() {
  return studioClientSummaries.map((client) => {
    const clientBookings = studioBookingRecords.filter((booking) => booking.clientId === client.id);
    const latestBooking = sortByCreatedAtDesc(clientBookings)[0] || null;
    const confirmedValueCents = clientBookings
      .filter((booking) => revenueStatuses.has(booking.status))
      .reduce((total, booking) => total + booking.estimatedValueCents, 0);

    return {
      ...client,
      bookingCount: clientBookings.length,
      confirmedValueCents,
      latestBookingId: latestBooking?.id || null,
      latestInquiryAt: latestBooking?.createdAt || null,
    };
  });
}

export function groupBookingsByStatus(records = studioBookingRecords) {
  return ADMIN_BOOKING_STATUS_OPTIONS.map((statusOption) => {
    const bookings = records.filter((booking) => booking.status === statusOption.value);

    return {
      ...statusOption,
      bookings: sortByCreatedAtDesc(bookings).map(enrichBookingRecord),
      count: bookings.length,
    };
  });
}

export function deriveDashboardMetrics({
  records = studioBookingRecords,
  referenceDate = DASHBOARD_REFERENCE_DATE,
} = {}) {
  const referenceTime = getTime(referenceDate);
  const sevenDaysAgo = referenceTime - 7 * 24 * 60 * 60 * 1000;
  const activeRecords = records.filter((record) => !terminalStatuses.has(record.status));
  const nonArchivedRecords = records.filter(
    (record) => record.status !== ADMIN_BOOKING_STATUSES.archived,
  );
  const recentRecords = records.filter((record) => getTime(record.createdAt) >= sevenDaysAgo);
  const projectedRevenueCents = records
    .filter((record) => revenueStatuses.has(record.status))
    .reduce((total, record) => total + record.estimatedValueCents, 0);
  const pipelineValueCents = records
    .filter((record) => pipelineStatuses.has(record.status))
    .reduce((total, record) => total + record.estimatedValueCents, 0);
  const wonBookings = records.filter((record) => revenueStatuses.has(record.status));
  const averageLeadTimeDays = records.length
    ? Math.round(
        records.reduce((total, record) => {
          const leadTime =
            getTime(`${record.desiredDate}T12:00:00.000Z`) - getTime(record.createdAt);

          return total + leadTime / (24 * 60 * 60 * 1000);
        }, 0) / records.length,
      )
    : 0;

  return {
    activeInquiries: activeRecords.length,
    averageLeadTimeDays,
    bookedRevenueCents: projectedRevenueCents,
    bookedRevenueLabel: `$${roundCurrency(projectedRevenueCents).toLocaleString("en-US")}`,
    conversionRate:
      nonArchivedRecords.length > 0
        ? Math.round((wonBookings.length / nonArchivedRecords.length) * 100)
        : 0,
    newInquiries: records.filter((record) => record.status === ADMIN_BOOKING_STATUSES.new).length,
    pipelineValueCents,
    pipelineValueLabel: `$${roundCurrency(pipelineValueCents).toLocaleString("en-US")}`,
    recentInquiryCount: recentRecords.length,
    statusGroups: groupBookingsByStatus(records).map(({ count, label, value }) => ({
      count,
      label,
      value,
    })),
    totalInquiries: records.length,
  };
}

export const adminDashboardMetrics = deriveDashboardMetrics();
