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
  primaryCtaLabel: "Start a booking inquiry",
  secondaryCtaLabel: "Compare services",
  serviceEntryTitle: "Book with service context",
  serviceEntryDescription:
    "Choose an entry point to open the inquiry flow with the right service already selected.",
  serviceEntryCtaLabel: "Start inquiry",
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
  submittingMessage: "Submitting the mock inquiry for local review...",
  confirmationStatus:
    "The mock inquiry is available in this browser session for review.",
  errorMessage: "Review the highlighted fields before continuing.",
  expectationConsentLabel:
    "I understand this inquiry does not reserve a date, confirm pricing, or create a paid booking.",
  reviewTitle: "Review inquiry",
  reviewDescription:
    "Confirm the service, timing, contact details, and project notes before creating the mock inquiry record.",
  confirmationTitle: "Inquiry ready for studio review",
  confirmationDescription:
    "This demo recorded the inquiry locally and summarized the details below. It did not send an email, collect payment, reserve a date, or guarantee availability.",
  confirmationNextSteps: [
    "A studio manager would review service fit, timing, budget range, and project context.",
    "If the project is a fit, the studio would follow up through the preferred contact method you listed.",
    "Dates, final scope, pricing, contracts, and payment would be handled only after a separate studio review.",
  ],
  timelineOptions: TIMELINE_OPTIONS,
  scheduleFlexibilityOptions: SCHEDULE_FLEXIBILITY_OPTIONS,
  budgetRangeOptions: BUDGET_RANGE_OPTIONS,
  contactMethodOptions: CONTACT_METHOD_OPTIONS,
  services: SERVICE_OPTIONS,
};
