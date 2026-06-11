/**
 * @typedef {"service-inquiry" | "consultation" | "project-estimate" | "retainer"} BookingInquiryType
 */

/**
 * @typedef {"unread" | "read" | "replied" | "archived" | "deleted"} BookingInquiryStatus
 */

/**
 * @typedef {Object} BookingServiceOption
 * @property {string} id
 * @property {string} name
 * @property {string} summary
 * @property {string} description
 * @property {string} durationLabel
 * @property {string} leadTimeLabel
 * @property {string} investmentLabel
 * @property {string[]} deliverables
 * @property {string[]} bestFor
 */

/**
 * @typedef {Object} BookingInquiryValues
 * @property {BookingInquiryType} inquiryType
 * @property {string} serviceId
 * @property {string} clientName
 * @property {string} email
 * @property {string} phone
 * @property {string} company
 * @property {string} projectTitle
 * @property {string} timeline
 * @property {string} budgetRange
 * @property {string} contactMethod
 * @property {string} eventDate
 * @property {string} location
 * @property {string} message
 * @property {string} source
 */

/**
 * @typedef {Object} BookingInquiryRecord
 * @property {string} id
 * @property {BookingInquiryStatus} status
 * @property {BookingInquiryValues} values
 * @property {BookingServiceOption | null} serviceSnapshot
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string | null} readAt
 * @property {string | null} repliedAt
 * @property {string | null} archivedAt
 * @property {string | null} deletedAt
 */

export {};
