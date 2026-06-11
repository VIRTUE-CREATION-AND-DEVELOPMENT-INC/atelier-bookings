import {
  BUDGET_RANGE_OPTIONS,
  CONTACT_METHOD_OPTIONS,
  SCHEDULE_FLEXIBILITY_OPTIONS,
  SERVICE_OPTIONS,
  TIMELINE_OPTIONS,
} from "../../../lib/bookings/index.js";

export const homePageContent = {
  eyebrow: "Atelier booking inquiry",
  title: "Choose the studio support that fits your next launch.",
  intro:
    "Start with a service direction so the studio can prepare the right scope, timeline, and next-step questions before your consultation.",
  expectations: [
    "Select one starting service for this inquiry.",
    "Timelines and investments are planning estimates from the current service model.",
    "The next steps collect project preferences and client details before mock submission.",
  ],
  selectorTitle: "Service selection",
  selectorDescription:
    "Compare the available studio offers and choose the strongest fit for your project.",
  selectedSummaryTitle: "Selected service",
  selectedSummaryEmpty: "Choose a service to preview booking expectations.",
  preferenceTitle: "Scheduling preferences",
  preferenceDescription:
    "Share your ideal timing and how much room the studio has to recommend the right production window.",
  clientTitle: "Client details",
  clientDescription:
    "Add the contact and project context the studio needs before reviewing fit.",
  formIntro:
    "Dates are not held from this inquiry. The studio reviews timing, service fit, and project notes before confirming next steps.",
  successMessage:
    "Details are ready for review. The next step can confirm and submit the mock inquiry.",
  errorMessage: "Review the highlighted fields before continuing.",
  expectationConsentLabel:
    "I understand this inquiry does not reserve a date, confirm pricing, or create a paid booking.",
  timelineOptions: TIMELINE_OPTIONS,
  scheduleFlexibilityOptions: SCHEDULE_FLEXIBILITY_OPTIONS,
  budgetRangeOptions: BUDGET_RANGE_OPTIONS,
  contactMethodOptions: CONTACT_METHOD_OPTIONS,
  services: SERVICE_OPTIONS,
};
