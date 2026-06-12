import {
  getBookingInquiryType,
  getBudgetRangeOption,
  getContactMethodOption,
  getScheduleFlexibilityOption,
  getServiceOption,
  getTimelineOption,
} from "./options.js";

export const BOOKING_INQUIRY_FIELD_LIMITS = Object.freeze({
  clientName: 90,
  email: 254,
  phone: 40,
  company: 120,
  projectTitle: 140,
  eventDate: 10,
  preferredTime: 5,
  location: 140,
  message: 2000,
  source: 120,
});

const DEFAULT_INQUIRY_TYPE = "service-inquiry";
const MIN_MESSAGE_LENGTH = 20;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^\d{2}:\d{2}$/;

const isFormDataLike = (value) =>
  value &&
  typeof value.get === "function" &&
  typeof value.entries === "function";

const toStringValue = (value) => {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
};

const normalizeId = (value) => toStringValue(value).toLowerCase();

const toBooleanValue = (value) => {
  if (value === true) {
    return true;
  }

  const normalizedValue = normalizeId(value);

  return ["1", "true", "yes", "on"].includes(normalizedValue);
};

const getNestedValue = (value, path) =>
  path.split(".").reduce((current, key) => {
    if (!current || typeof current !== "object") {
      return undefined;
    }

    return current[key];
  }, value);

const getRawValue = (raw, keys) => {
  const keyList = Array.isArray(keys) ? keys : [keys];

  for (const key of keyList) {
    if (isFormDataLike(raw)) {
      const value = raw.get(key);

      if (value !== null) {
        return value;
      }
    }

    if (raw && typeof raw === "object") {
      const value = key.includes(".") ? getNestedValue(raw, key) : raw[key];

      if (value !== undefined) {
        return value;
      }
    }
  }

  return "";
};

const addFieldError = (errors, field, message) => {
  errors[field] = errors[field] || [];
  errors[field].push(message);
};

const requireField = (errors, values, field, message) => {
  if (!values[field]) {
    addFieldError(errors, field, message);
  }
};

const validateLength = (errors, values, field, maxLength) => {
  if (values[field] && values[field].length > maxLength) {
    addFieldError(
      errors,
      field,
      `Use ${maxLength} characters or fewer for this field.`,
    );
  }
};

const hasErrors = (errors) => Object.keys(errors).length > 0;

export const normalizeBookingInquiryInput = (raw = {}) => ({
  inquiryType:
    normalizeId(getRawValue(raw, ["inquiryType", "type"])) ||
    DEFAULT_INQUIRY_TYPE,
  serviceId: normalizeId(getRawValue(raw, ["serviceId", "service"])),
  clientName: toStringValue(
    getRawValue(raw, ["clientName", "name", "client.name"]),
  ),
  email: toStringValue(getRawValue(raw, ["email", "client.email"])),
  phone: toStringValue(getRawValue(raw, ["phone", "client.phone"])),
  company: toStringValue(getRawValue(raw, ["company", "client.company"])),
  projectTitle: toStringValue(
    getRawValue(raw, ["projectTitle", "project.title", "title"]),
  ),
  timeline: normalizeId(getRawValue(raw, ["timeline", "project.timeline"])),
  budgetRange: normalizeId(
    getRawValue(raw, ["budgetRange", "budget", "project.budgetRange"]),
  ),
  contactMethod: normalizeId(
    getRawValue(raw, [
      "contactMethod",
      "preferredContactMethod",
      "preferences.contactMethod",
    ]),
  ),
  eventDate: toStringValue(
    getRawValue(raw, ["eventDate", "project.eventDate"]),
  ),
  preferredTime: toStringValue(
    getRawValue(raw, [
      "preferredTime",
      "time",
      "project.preferredTime",
      "preferences.preferredTime",
    ]),
  ),
  scheduleFlexibility: normalizeId(
    getRawValue(raw, [
      "scheduleFlexibility",
      "flexibility",
      "project.scheduleFlexibility",
      "preferences.scheduleFlexibility",
    ]),
  ),
  location: toStringValue(
    getRawValue(raw, ["location", "project.location", "preferences.location"]),
  ),
  message: toStringValue(
    getRawValue(raw, ["message", "details", "project.details"]),
  ),
  source: toStringValue(getRawValue(raw, ["source", "metadata.source"])),
  expectationConsent: toBooleanValue(
    getRawValue(raw, [
      "expectationConsent",
      "consent",
      "client.expectationConsent",
      "preferences.expectationConsent",
    ]),
  ),
});

export const validateBookingInquiryInput = (raw = {}) => {
  const values = normalizeBookingInquiryInput(raw);
  const errors = {};

  requireField(errors, values, "serviceId", "Choose one studio service.");
  requireField(errors, values, "clientName", "Enter the client contact name.");
  requireField(errors, values, "email", "Enter the best email for follow-up.");
  requireField(errors, values, "timeline", "Choose the project timeline.");
  requireField(
    errors,
    values,
    "budgetRange",
    "Choose the estimated budget range.",
  );
  requireField(
    errors,
    values,
    "scheduleFlexibility",
    "Choose how flexible the schedule is.",
  );
  requireField(
    errors,
    values,
    "contactMethod",
    "Choose how the studio should follow up.",
  );
  requireField(
    errors,
    values,
    "message",
    "Add project notes for studio review.",
  );
  requireField(
    errors,
    values,
    "expectationConsent",
    "Confirm that this inquiry does not reserve a date or confirm pricing.",
  );

  if (!getBookingInquiryType(values.inquiryType)) {
    addFieldError(errors, "inquiryType", "Choose a valid inquiry type.");
  }

  if (values.serviceId && !getServiceOption(values.serviceId)) {
    addFieldError(errors, "serviceId", "Choose a valid service.");
  }

  if (values.timeline && !getTimelineOption(values.timeline)) {
    addFieldError(errors, "timeline", "Choose a valid timeline.");
  }

  if (values.budgetRange && !getBudgetRangeOption(values.budgetRange)) {
    addFieldError(errors, "budgetRange", "Choose a valid budget range.");
  }

  if (
    values.scheduleFlexibility &&
    !getScheduleFlexibilityOption(values.scheduleFlexibility)
  ) {
    addFieldError(
      errors,
      "scheduleFlexibility",
      "Choose a valid scheduling flexibility.",
    );
  }

  if (values.contactMethod && !getContactMethodOption(values.contactMethod)) {
    addFieldError(
      errors,
      "contactMethod",
      "Choose a valid preferred contact method.",
    );
  }

  if (values.contactMethod === "phone" && !values.phone) {
    addFieldError(
      errors,
      "phone",
      "Enter a phone number or choose a different contact method.",
    );
  }

  if (values.email && !EMAIL_PATTERN.test(values.email)) {
    addFieldError(
      errors,
      "email",
      "Enter an email address in name@example.com format.",
    );
  }

  if (values.message && values.message.length < MIN_MESSAGE_LENGTH) {
    addFieldError(
      errors,
      "message",
      `Use at least ${MIN_MESSAGE_LENGTH} characters for the project details.`,
    );
  }

  if (values.eventDate && !DATE_PATTERN.test(values.eventDate)) {
    addFieldError(errors, "eventDate", "Use a valid date in YYYY-MM-DD format.");
  }

  if (values.preferredTime && !TIME_PATTERN.test(values.preferredTime)) {
    addFieldError(errors, "preferredTime", "Use a valid time in HH:MM format.");
  }

  Object.entries(BOOKING_INQUIRY_FIELD_LIMITS).forEach(([field, limit]) => {
    validateLength(errors, values, field, limit);
  });

  return {
    success: !hasErrors(errors),
    errors,
    values,
  };
};

export const parseBookingInquiryFormData = (formData) =>
  validateBookingInquiryInput(formData);
