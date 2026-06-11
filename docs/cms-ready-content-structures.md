# CMS-Ready Content Structures

Date: 2026-06-11

## Scope

Step 2 centralizes local mock content into `lib/content` so future CMS-backed
helpers can replace local arrays without changing public route rendering.

Provider integration, environment variables, auth, payments, and deployment
behavior remain out of scope.

## Local Guidance Reviewed

- `AGENTS.md`
- `skills/data-and-cms.md`

External CMS handoff docs were inspected for documentation shape only. No
client-specific content, code, assets, secrets, or provider details were copied.

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

## CMS Handoff Notes

The current content layer is intentionally provider-neutral. A future CMS should
replace the local arrays behind the exported helpers in `lib/content` before
changing public or admin rendering code.

| Future CMS area | Current local source | Notes |
| --- | --- | --- |
| Site settings | `studioProfile` | Map business identity, CTAs, SEO copy, contact labels, service area, and values. Keep public metadata reading the same normalized shape. |
| Services | `services` | Preserve stable `id`, `slug`, `status`, `sortOrder`, price/duration labels, deliverables, booking option links, and gallery links. |
| Gallery | `galleryItems` | Map media records with `mediaType`, accessible `alt`, service relationships, featured flags, and sort order. Current URLs are placeholders. |
| Testimonials | `testimonials` | Keep service relationships so public sections and future detail pages can filter social proof without duplicating copy. |
| FAQs | `faqs` | Keep placement metadata for route-specific display and service IDs for future service-specific filtering. |
| Booking options | `bookingOptions` | Keep option `type`, `value`, `label`, `description`, and `sortOrder`; these should feed both forms and admin labels. |
| Booking inquiries | `mockBookingInquiries` | Replace with persisted inquiry records later. Keep serialized date strings, service IDs, option IDs, status, internal notes, and next-action fields. |

## Mock-Only Inventory

- `studioProfile.contact` uses placeholder email, phone, and social values.
- Gallery `imageUrl` values point to planned paths; real media assets and upload
  behavior are not implemented.
- `mockBookingInquiries` are sample admin rows only; they are not created by a
  public form or persisted anywhere.
- `adminDashboardContent` is local display copy for the current mock admin
  surface.
- Draft examples such as `service-content-retainer` and `faq-admin-source` are
  modeling records, not public content.
- Booking option groups model future inquiry choices, but there is no connected
  inquiry submission flow in this step.

## Future CMS Replacement Notes

- Preserve stable field names used by route adapters where possible.
- Replace local getter implementations first, then update admin write helpers.
- Keep provider IDs inside future provider modules instead of leaking them into
  page components.
- Public getters should continue to exclude draft and archived records.
- Admin getters should continue to include draft records and exclude archived
  records unless an archive view intentionally requests them.
- Keep public/admin helper names stable where practical so route adapters remain
  thin and reusable.
- Serialize provider records into plain objects before passing them into React
  components.
