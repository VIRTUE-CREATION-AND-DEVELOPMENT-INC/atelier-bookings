import {
  ACTIVE_BOOKING_INQUIRY_STATUSES,
  BOOKING_INQUIRY_STATUS,
  isBookingInquiryStatus,
  getServiceOption,
} from "./options.js";
import { validateBookingInquiryInput } from "./validation.js";

const STORE_KEY = "__atelierBookingInquiryMockStore";

const getStore = () => {
  globalThis[STORE_KEY] = globalThis[STORE_KEY] || [];
  return globalThis[STORE_KEY];
};

const createBookingInquiryId = () => {
  if (globalThis.crypto && typeof globalThis.crypto.randomUUID === "function") {
    return `booking_${globalThis.crypto.randomUUID()}`;
  }

  return `booking_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
};

const cloneServiceOption = (serviceOption) => {
  if (!serviceOption) {
    return null;
  }

  return {
    ...serviceOption,
    deliverables: [...serviceOption.deliverables],
    bestFor: [...serviceOption.bestFor],
  };
};

export const serializeBookingInquiry = (record) => ({
  ...record,
  values: { ...record.values },
  serviceSnapshot: cloneServiceOption(record.serviceSnapshot),
});

export const createBookingInquiryRecord = (values, now = new Date()) => {
  const createdAt = now.toISOString();

  return {
    id: createBookingInquiryId(),
    status: BOOKING_INQUIRY_STATUS.UNREAD,
    values: { ...values },
    serviceSnapshot: cloneServiceOption(getServiceOption(values.serviceId)),
    createdAt,
    updatedAt: createdAt,
    readAt: null,
    repliedAt: null,
    archivedAt: null,
    deletedAt: null,
  };
};

export const submitMockBookingInquiry = async (input) => {
  const result = validateBookingInquiryInput(input);

  if (!result.success) {
    return {
      success: false,
      error: "Booking inquiry could not be submitted.",
      errors: result.errors,
      values: result.values,
      inquiry: null,
    };
  }

  const inquiry = createBookingInquiryRecord(result.values);
  getStore().unshift(inquiry);

  return {
    success: true,
    error: null,
    errors: {},
    values: result.values,
    inquiry: serializeBookingInquiry(inquiry),
  };
};

export const listMockBookingInquiries = ({
  includeDeleted = false,
  statuses = ACTIVE_BOOKING_INQUIRY_STATUSES,
} = {}) => {
  const allowedStatuses = includeDeleted ? null : statuses;

  return getStore()
    .filter((record) => {
      if (record.status === BOOKING_INQUIRY_STATUS.DELETED && !includeDeleted) {
        return false;
      }

      return !allowedStatuses || allowedStatuses.includes(record.status);
    })
    .map(serializeBookingInquiry);
};

export const getMockBookingInquiry = (id) => {
  const inquiry = getStore().find((record) => record.id === id);
  return inquiry ? serializeBookingInquiry(inquiry) : null;
};

export const updateMockBookingInquiryStatus = (
  id,
  status,
  now = new Date(),
) => {
  if (!isBookingInquiryStatus(status)) {
    throw new Error(`Unsupported booking inquiry status: ${status}`);
  }

  const inquiry = getStore().find((record) => record.id === id);

  if (!inquiry) {
    return null;
  }

  const timestamp = now.toISOString();

  inquiry.status = status;
  inquiry.updatedAt = timestamp;

  if (
    status === BOOKING_INQUIRY_STATUS.READ ||
    status === BOOKING_INQUIRY_STATUS.REPLIED
  ) {
    inquiry.readAt = inquiry.readAt || timestamp;
  }

  if (status === BOOKING_INQUIRY_STATUS.REPLIED) {
    inquiry.repliedAt = inquiry.repliedAt || timestamp;
  }

  if (status === BOOKING_INQUIRY_STATUS.ARCHIVED) {
    inquiry.archivedAt = inquiry.archivedAt || timestamp;
  }

  if (status === BOOKING_INQUIRY_STATUS.DELETED) {
    inquiry.deletedAt = inquiry.deletedAt || timestamp;
  }

  if (ACTIVE_BOOKING_INQUIRY_STATUSES.includes(status)) {
    inquiry.archivedAt = null;
    inquiry.deletedAt = null;
  }

  return serializeBookingInquiry(inquiry);
};

export const resetMockBookingInquiryStore = (records = []) => {
  globalThis[STORE_KEY] = records.map((record) => serializeBookingInquiry(record));
  return listMockBookingInquiries({ includeDeleted: true, statuses: null });
};
