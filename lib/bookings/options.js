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
    id: "brand-studio-intensive",
    name: "Brand Studio Intensive",
    summary: "A focused strategy and visual identity sprint for founders.",
    description:
      "Positioning, creative direction, and a launch-ready identity kit for a boutique brand.",
    durationLabel: "2-3 weeks",
    leadTimeLabel: "Book 3+ weeks ahead",
    investmentLabel: "Starting at $4,800",
    deliverables: [
      "Discovery and positioning session",
      "Visual direction board",
      "Logo suite and brand marks",
      "Core typography and color system",
      "Launch-ready brand guide",
    ],
    bestFor: ["New brands", "Repositioning", "Founder-led launches"],
  },
  {
    id: "campaign-creative-suite",
    name: "Campaign Creative Suite",
    summary: "Creative assets for a product, editorial, or seasonal campaign.",
    description:
      "Art direction and production-ready campaign assets across web, email, and social placements.",
    durationLabel: "3-5 weeks",
    leadTimeLabel: "Book 4+ weeks ahead",
    investmentLabel: "Starting at $6,500",
    deliverables: [
      "Campaign concept direction",
      "Shot list or asset map",
      "Landing page creative direction",
      "Email and social creative set",
      "Launch asset handoff",
    ],
    bestFor: ["Product launches", "Seasonal campaigns", "Editorial drops"],
  },
  {
    id: "content-production-day",
    name: "Content Production Day",
    summary: "A guided studio production day with a polished asset handoff.",
    description:
      "Pre-production planning, on-site direction, and an edited content package for brand channels.",
    durationLabel: "1 production day",
    leadTimeLabel: "Book 2+ weeks ahead",
    investmentLabel: "Starting at $3,200",
    deliverables: [
      "Pre-production planning call",
      "Creative brief and shot direction",
      "On-site production direction",
      "Edited image or short-form content set",
      "Usage and delivery notes",
    ],
    bestFor: ["Social content", "Founder portraits", "Product storytelling"],
  },
  {
    id: "studio-retainer",
    name: "Studio Retainer",
    summary: "Monthly creative direction and production support.",
    description:
      "A recurring studio partnership for brands that need consistent campaign, content, and design support.",
    durationLabel: "Monthly",
    leadTimeLabel: "Book 4+ weeks ahead",
    investmentLabel: "From $7,500/month",
    deliverables: [
      "Monthly creative planning",
      "Priority studio availability",
      "Design and content production blocks",
      "Campaign asset management",
      "Monthly performance review",
    ],
    bestFor: ["Growing brands", "Marketing teams", "Ongoing launches"],
  },
]);

export const TIMELINE_OPTIONS = Object.freeze([
  { id: "asap", label: "As soon as possible" },
  { id: "within-1-month", label: "Within 1 month" },
  { id: "one-to-three-months", label: "1-3 months" },
  { id: "three-plus-months", label: "3+ months" },
  { id: "flexible", label: "Flexible" },
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

export const getBudgetRangeOption = (id) => findById(BUDGET_RANGE_OPTIONS, id);

export const getContactMethodOption = (id) =>
  findById(CONTACT_METHOD_OPTIONS, id);

export const isBookingInquiryStatus = (status) =>
  BOOKING_INQUIRY_STATUSES.includes(status);
