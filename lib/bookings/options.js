export const BOOKING_INQUIRY_STATUS = Object.freeze({
  UNREAD: "unread",
  READ: "read",
  REPLIED: "replied",
  ARCHIVED: "archived",
  DELETED: "deleted",
});

export const BOOKING_INQUIRY_STATUSES = Object.freeze(
  Object.values(BOOKING_INQUIRY_STATUS),
);

export const ACTIVE_BOOKING_INQUIRY_STATUSES = Object.freeze([
  BOOKING_INQUIRY_STATUS.UNREAD,
  BOOKING_INQUIRY_STATUS.READ,
  BOOKING_INQUIRY_STATUS.REPLIED,
]);

export const BOOKING_INQUIRY_TYPES = Object.freeze([
  {
    id: "service-inquiry",
    label: "Service inquiry",
    description: "A first inquiry about a defined studio service.",
  },
  {
    id: "consultation",
    label: "Consultation",
    description: "A discovery call before choosing a specific scope.",
  },
  {
    id: "project-estimate",
    label: "Project estimate",
    description: "A quote request for a scoped creative project.",
  },
  {
    id: "retainer",
    label: "Retainer",
    description: "An ongoing creative support or production request.",
  },
]);

export const SERVICE_OPTIONS = Object.freeze([
  {
    id: "brand-session",
    name: "Brand Session",
    summary: "A guided creative session for polished brand imagery.",
    description:
      "Creative direction, preparation notes, styling guidance, and a clear session plan for founders, personal brands, and small teams.",
    durationLabel: "Half-day studio booking",
    leadTimeLabel: "Book 2+ weeks ahead",
    investmentLabel: "Starting at $850",
    deliverables: [
      "Creative brief and shot direction",
      "Studio session planning",
      "Styling and preparation notes",
      "Curated image selection",
      "Edited visual set for web and social",
    ],
    bestFor: ["Founders", "Personal brands", "Small teams"],
  },
  {
    id: "content-day",
    name: "Content Day",
    summary: "A streamlined production block for recurring content needs.",
    description:
      "A planning-first studio day for campaign, social, editorial, or product assets that need a repeatable production structure.",
    durationLabel: "Full-day studio booking",
    leadTimeLabel: "Book 3+ weeks ahead",
    investmentLabel: "Starting at $1,450",
    deliverables: [
      "Pre-session content map",
      "Production schedule",
      "Multi-look capture plan",
      "On-site direction",
      "Delivery-ready image and clip list",
    ],
    bestFor: ["Campaigns", "Product updates", "Editorial calendars"],
  },
  {
    id: "creative-consult",
    name: "Creative Consult",
    summary: "A focused planning session before a larger production is scoped.",
    description:
      "A strategy call for shaping an idea, reviewing references, choosing the right service path, and defining a practical next step.",
    durationLabel: "60-minute remote session",
    leadTimeLabel: "Book 1+ week ahead",
    investmentLabel: "Starting at $175",
    deliverables: [
      "Direction notes",
      "Service recommendation",
      "Reference review",
      "Priority shot or asset list",
      "Estimated production path",
    ],
    bestFor: ["New ideas", "Launch planning", "Creative audits"],
  },
]);

export const TIMELINE_OPTIONS = Object.freeze([
  { id: "asap", label: "As soon as possible" },
  { id: "within-1-month", label: "Within 1 month" },
  { id: "one-to-three-months", label: "1-3 months" },
  { id: "three-plus-months", label: "3+ months" },
  { id: "flexible", label: "Flexible" },
]);

export const SCHEDULE_FLEXIBILITY_OPTIONS = Object.freeze([
  { id: "exact-date", label: "I need this specific date" },
  { id: "same-week", label: "I can shift within the same week" },
  { id: "same-month", label: "I can shift within the same month" },
  { id: "open-to-guidance", label: "I am open to studio guidance" },
]);

export const BUDGET_RANGE_OPTIONS = Object.freeze([
  { id: "under-3k", label: "Under $3,000" },
  { id: "3k-6k", label: "$3,000-$6,000" },
  { id: "6k-10k", label: "$6,000-$10,000" },
  { id: "10k-20k", label: "$10,000-$20,000" },
  { id: "20k-plus", label: "$20,000+" },
  { id: "not-sure", label: "Not sure yet" },
]);

export const CONTACT_METHOD_OPTIONS = Object.freeze([
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "video-call", label: "Video call" },
]);

const findById = (items, id) => items.find((item) => item.id === id) || null;

export const getBookingInquiryType = (id) => findById(BOOKING_INQUIRY_TYPES, id);

export const getServiceOption = (id) => findById(SERVICE_OPTIONS, id);

export const getTimelineOption = (id) => findById(TIMELINE_OPTIONS, id);

export const getScheduleFlexibilityOption = (id) =>
  findById(SCHEDULE_FLEXIBILITY_OPTIONS, id);

export const getBudgetRangeOption = (id) => findById(BUDGET_RANGE_OPTIONS, id);

export const getContactMethodOption = (id) =>
  findById(CONTACT_METHOD_OPTIONS, id);

export const isBookingInquiryStatus = (status) =>
  BOOKING_INQUIRY_STATUSES.includes(status);
