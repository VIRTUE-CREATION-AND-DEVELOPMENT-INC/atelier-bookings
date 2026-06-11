export const CONTENT_STATUS = Object.freeze({
  draft: "draft",
  published: "published",
  archived: "archived",
});

export const BOOKING_STATUS = Object.freeze({
  new: "new",
  reviewing: "reviewing",
  proposalSent: "proposal_sent",
  booked: "booked",
  completed: "completed",
  archived: "archived",
});

/**
 * @typedef {"draft" | "published" | "archived"} ContentStatus
 * @typedef {"new" | "reviewing" | "proposal_sent" | "booked" | "completed" | "archived"} BookingStatus
 * @typedef {"service" | "timeline" | "budget" | "contact_method" | "project_goal"} BookingOptionType
 */

/**
 * @typedef {Object} StudioProfile
 * @property {string} id
 * @property {ContentStatus} status
 * @property {string} businessName
 * @property {string} shortName
 * @property {string} slug
 * @property {string} tagline
 * @property {string} summary
 * @property {string} serviceArea
 * @property {{ label: string, href: string }} primaryCta
 * @property {{ label: string, href: string }} secondaryCta
 * @property {{ title: string, description: string }} seo
 * @property {{ email: string, phone: string, instagram: string }} contact
 * @property {string[]} values
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} ServiceRecord
 * @property {string} id
 * @property {ContentStatus} status
 * @property {string} slug
 * @property {string} title
 * @property {string} category
 * @property {string} summary
 * @property {string} description
 * @property {string} durationLabel
 * @property {string} startingPriceLabel
 * @property {string[]} deliverables
 * @property {string[]} bookingOptionIds
 * @property {string[]} galleryItemIds
 * @property {boolean} featured
 * @property {number} sortOrder
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} GalleryItem
 * @property {string} id
 * @property {ContentStatus} status
 * @property {string} title
 * @property {string} alt
 * @property {"image" | "video"} mediaType
 * @property {string} imageUrl
 * @property {string[]} serviceIds
 * @property {boolean} featured
 * @property {number} sortOrder
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} TestimonialRecord
 * @property {string} id
 * @property {ContentStatus} status
 * @property {string} quote
 * @property {string} attribution
 * @property {string} role
 * @property {string} serviceId
 * @property {number} rating
 * @property {boolean} featured
 * @property {number} sortOrder
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} FaqRecord
 * @property {string} id
 * @property {ContentStatus} status
 * @property {string} question
 * @property {string} answer
 * @property {string[]} placements
 * @property {string[]} serviceIds
 * @property {number} sortOrder
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} BookingOption
 * @property {string} id
 * @property {ContentStatus} status
 * @property {BookingOptionType} type
 * @property {string} label
 * @property {string} value
 * @property {string} description
 * @property {number} sortOrder
 */

/**
 * @typedef {Object} AdminBookingInquiry
 * @property {string} id
 * @property {BookingStatus} status
 * @property {string} clientName
 * @property {string} clientEmail
 * @property {string} serviceId
 * @property {string[]} optionIds
 * @property {string} requestedDate
 * @property {string} submittedAt
 * @property {string} updatedAt
 * @property {string} budgetLabel
 * @property {string} internalNote
 * @property {string} nextAction
 */
