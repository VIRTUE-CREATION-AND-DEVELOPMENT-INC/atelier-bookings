# CMS-Ready Content Structures

Date: 2026-06-11

## Scope

Step 2 centralizes local mock content into `lib/content` so future CMS-backed
helpers can replace local arrays without changing public route rendering.

Provider integration, environment variables, auth, payments, and deployment
behavior remain out of scope.

## Local Content Modules

| Module | Owns |
| --- | --- |
| `lib/content/studio-profile.js` | Studio identity, public CTA labels, default SEO copy, contact placeholders, and profile values. |
| `lib/content/services.js` | Service records with stable IDs, slugs, status, sort order, deliverables, booking option links, and gallery links. |
| `lib/content/gallery.js` | Gallery records with stable IDs, media type, service relationships, featured flags, and accessible descriptions. |
| `lib/content/testimonials.js` | Testimonial records linked to services for public reuse and future filtering. |
| `lib/content/faqs.js` | FAQ records with placement metadata for route-specific display. |
| `lib/content/booking-options.js` | Booking inquiry options grouped by service, timeline, budget, contact method, and project goal. |
| `lib/content/admin-bookings.js` | Mock admin booking inquiries, status labels, dashboard copy, and summary helpers. |
| `lib/content/types.js` | JSDoc typedefs and shared status constants. |
| `lib/content/utils.js` | Shared local helpers for sorting, visibility filtering, and ID lookup. |

## Rendering Boundary

- `app/(pages)/(home)/content.js` acts as a route adapter.
- Repeatable records come from `lib/content` getters.
- Page-specific section titles and descriptions stay in the route adapter.
- `app/components/composites/content/ContentCollectionSection.jsx` provides a
  reusable section heading pattern for content-backed sections.
- `app/Admin/content.js` maps local admin booking records, status labels,
  service labels, and option labels into dashboard rows.

## Future CMS Replacement Notes

- Preserve stable field names used by route adapters where possible.
- Replace local getter implementations first, then update admin write helpers.
- Keep provider IDs inside future provider modules instead of leaking them into
  page components.
- Public getters should continue to exclude draft and archived records.
- Admin getters should continue to include draft records and exclude archived
  records unless an archive view intentionally requests them.
