import {
  getBookingInquiryType,
  getBudgetRangeOption,
  getContactMethodOption,
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
  location: 140,
  message: 2000,
  source: 120,
});

const DEFAULT_INQUIRY_TYPE = "service-inquiry";
const MIN_MESSAGE_LENGTH = 20;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

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
  location: toStringValue(
    getRawValue(raw, ["location", "project.location", "preferences.location"]),
  ),
  message: toStringValue(
    getRawValue(raw, ["message", "details", "project.details"]),
  ),
  source: toStringValue(getRawValue(raw, ["source", "metadata.source"])),
});

export const validateBookingInquiryInput = (raw = {}) => {
  const values = normalizeBookingInquiryInput(raw);
  const errors = {};

  requireField(errors, values, "serviceId", "Choose a service.");
  requireField(errors, values, "clientName", "Enter your name.");
  requireField(errors, values, "email", "Enter an email address.");
  requireField(errors, values, "timeline", "Choose a project timeline.");
  requireField(errors, values, "budgetRange", "Choose a budget range.");
  requireField(
    errors,
    values,
    "contactMethod",
    "Choose a preferred contact method.",
  );
  requireField(errors, values, "message", "Tell us about the project.");

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

  if (values.contactMethod && !getContactMethodOption(values.contactMethod)) {
    addFieldError(
      errors,
      "contactMethod",
      "Choose a valid preferred contact method.",
    );
  }

  if (values.email && !EMAIL_PATTERN.test(values.email)) {
    addFieldError(errors, "email", "Enter a valid email address.");
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
