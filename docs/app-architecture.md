# App Architecture Map

## Purpose

Define the bounded implementation areas for the boutique creative studio booking
and client-management app before feature work begins. This map should guide
later lanes for public pages, booking inquiry flow, admin booking management,
shared UI, mock content, and validation utilities.

This is a target architecture, not a final file system. Later implementation
should adapt it to the real components and content that emerge, while keeping
persistence local/mock unless a future step explicitly approves a provider.

## Inputs Reviewed

- Local guidance: `skills/frontend.md`, `skills/backend.md`,
  `skills/backend-foundation.md`, `skills/data-and-cms.md`,
  `skills/submissions-and-notifications.md`, and
  `skills/accessibility-and-qa.md`.
- Next.js guidance: `node_modules/next/dist/docs/01-app/01-getting-started/02-project-structure.md`.
- Existing project state: starter App Router scaffold, home route group, root
  layout, placeholder admin layout, empty style files, sitemap/robots, and
  `docs/ui-reference-brief.md`.
- External project references: adjacent architecture/CMS docs were used for
  document structure only. Client-specific code, content, assets, provider
  choices, and data models were not copied.

## Current Baseline

- Framework: Next.js App Router, JavaScript, React, CSS modules/global CSS.
- Installed runtime dependencies: `next`, `react`, and `react-dom` only.
- No approved database, CMS provider, auth provider, payment provider, email
  provider, cron system, or deployment mutation in this step.
- Existing public home route lives under `app/(pages)/(home)`.
- Existing `app/Admin/layout.jsx` is a placeholder only. It should not be
  treated as an established admin architecture.

## Guiding Boundaries

- Use App Router route groups to separate public and admin surfaces without
  forcing those group names into URLs.
- Keep page copy and CMS-ready mock data in content/adapters, not scattered
  through presentation components.
- Keep form validation and booking status rules in shared pure utilities so
  public and admin flows cannot drift.
- Keep admin management mock-only until auth and persistence are explicitly
  approved.
- Do not add dependencies. Use platform APIs, React, Next, CSS modules, and
  existing global styles.
- Do not introduce route handlers, server actions, external notifications, or
  provider configuration unless a later step explicitly needs them.

## Route Structure

Recommended App Router shape:

```txt
app/
  layout.jsx
  robots.js
  sitemap.js
  (pages)/
    (home)/
      content.js
      page.jsx
      page.module.css
    services/
      content.js
      page.jsx
      page.module.css
    services/[slug]/
      content.js
      page.jsx
      page.module.css
    book/
      content.js
      page.jsx
      page.module.css
    about/
      content.js
      page.jsx
      page.module.css
    contact/
      content.js
      page.jsx
      page.module.css
  (admin)/
    admin/
      layout.jsx
      page.jsx
      page.module.css
      inquiries/
        page.jsx
        [id]/page.jsx
      bookings/
        page.jsx
        [id]/page.jsx
      clients/
        page.jsx
        [id]/page.jsx
      content/
        services/page.jsx
        proof/page.jsx
        faqs/page.jsx
```

Route intent:

- `/`: studio positioning, service highlights, process, proof, FAQ, and primary
  booking CTA.
- `/services`: service discovery with filters or grouped sections when useful.
- `/services/[slug]`: detail page for one service using the shared service
  content model.
- `/book`: guided inquiry flow for project context, service interest,
  scheduling preferences, budget range, contact details, and confirmation.
- `/about`: studio profile, working style, values, and client-fit expectations.
- `/contact`: direct fallback path with response expectations and secondary
  inquiry CTA.
- `/admin`: mock dashboard for inquiry health, upcoming bookings, and content
  status.
- `/admin/inquiries`: mock qualification pipeline for submitted inquiries.
- `/admin/bookings`: mock booking/session list with status management affordances.
- `/admin/clients`: mock client records and relationship notes.
- `/admin/content/*`: mock CMS-ready management screens for services, proof,
  and FAQs.

## Public Page Ownership

Each meaningful public route should follow the local frontend skill pattern:

- `content.js` owns metadata inputs, static page copy, mock content adapters,
  and page-ready data getters.
- `page.jsx` composes server-rendered sections and passes page-ready data into
  shared or route-local components.
- `page.module.css` owns route-specific layout, section spacing, atmosphere,
  and responsive behavior.

Public pages should consume shared content from `lib/content` once content is
reused by more than one route. Until then, route-local `content.js` is enough.

## Booking Inquiry Flow

Recommended route: `/book`.

Recommended UI structure:

1. Service selection: single or multi-select service interest sourced from
   public service mock records.
2. Project context: project type, goals, stage, preferred timeline, and budget
   range.
3. Scheduling preferences: ideal start window, meeting preference, and
   availability notes.
4. Contact details: name, email, phone optional, company optional, and consent
   acknowledgement if needed.
5. Review/confirmation: local success state with expected response timing.

Recommended implementation boundary:

```txt
components/booking/
  BookingInquiryForm.jsx
  BookingStepIndicator.jsx
  ServiceSelectionField.jsx
  InquirySummary.jsx

lib/booking/
  inquirySchema.js
  inquiryValidation.js
  inquiryStatus.js
  mockInquiries.js
```

Keep submission handling local/mock:

- No email delivery.
- No webhook.
- No database writes.
- No payment intent or checkout.
- No server action unless a later step needs a mock-only server boundary.
- A client-side success state is acceptable for the first booking lane.
- If local persistence is needed for demo continuity, use a clearly named
  local mock adapter and avoid presenting it as durable production storage.

## Admin Booking Management

Recommended route group: `app/(admin)/admin`.

Admin is a mock operations surface, not an authenticated production dashboard in
this phase. It should use non-sensitive demo records only.

Recommended areas:

- Dashboard: summary metrics, new inquiries, upcoming bookings, overdue
  follow-ups, and content completeness.
- Inquiries: list, filters, status badge, priority, service interest, budget,
  timeline, contact details, internal notes, and next action.
- Inquiry detail: full inquiry context, status transition controls, notes, and
  suggested booking conversion fields.
- Bookings: list/calendar-like read model, booking status, client, service,
  session date, preparation status, and operational notes.
- Booking detail: session overview, client context, checklist, and mock status
  updates.
- Clients: client profile records with contact info, related inquiries,
  bookings, and relationship notes.
- Content: service records, testimonials/proof, FAQs, and site settings using
  CMS-ready mock structures.

Status transitions should be represented as pure functions and controlled
values in `lib/booking` or `lib/admin`, not handwritten per page.

## Shared Layout And Components

Recommended shared component areas:

```txt
components/
  layout/
    PublicHeader.jsx
    PublicFooter.jsx
    AdminShell.jsx
    AdminNav.jsx
  sections/
    PageIntro.jsx
    SectionHeader.jsx
    CtaBand.jsx
    FaqList.jsx
    ProofStrip.jsx
    ProcessSteps.jsx
  services/
    ServiceCard.jsx
    ServiceDetailHeader.jsx
    ServiceMetaList.jsx
  forms/
    Field.jsx
    TextInput.jsx
    TextArea.jsx
    SelectField.jsx
    RadioGroup.jsx
    CheckboxField.jsx
    FormError.jsx
  admin/
    AdminPageHeader.jsx
    MetricCard.jsx
    StatusBadge.jsx
    RecordList.jsx
    EmptyState.jsx
    FilterBar.jsx
```

Component rules:

- Keep layout components shell-focused; route pages own page-specific content.
- Keep form primitives accessible with labels, error text, and disabled/loading
  states.
- Use cards only for repeated items, admin panels, modals, and framed tools.
- Icons should come from `lucide-react` only if that dependency is later added
  or approved. With the current dependency set, use text-only controls or CSS.
- Keep admin components dense, scannable, and predictable.

## Mock Content Structures

Recommended content home:

```txt
lib/content/
  site.js
  services.js
  proof.js
  faqs.js
  studio.js
  bookingOptions.js
  adminMock.js
```

Recommended record shapes:

### `siteSettings`

- `siteName`
- `tagline`
- `description`
- `primaryCta`
- `secondaryCta`
- `contact`
- `social`
- `seo`

### `service`

- `id`
- `slug`
- `title`
- `shortTitle`
- `summary`
- `description`
- `outcomes`
- `deliverables`
- `bestFor`
- `timeline`
- `startingAtLabel`
- `category`
- `featured`
- `status`: `draft`, `published`, or `archived`
- `faqs`
- `seo`

### `proofItem`

- `id`
- `type`: `testimonial`, `metric`, `clientType`, or `caseNote`
- `quote`
- `attribution`
- `metric`
- `summary`
- `status`

### `faq`

- `id`
- `question`
- `answer`
- `category`
- `relatedServiceSlugs`
- `status`

### `inquiry`

- `id`
- `createdAt`
- `updatedAt`
- `status`: `unread`, `reviewing`, `qualified`, `booked`, `archived`
- `serviceSlugs`
- `projectType`
- `goals`
- `timeline`
- `budgetRange`
- `client`
- `notes`
- `source`

### `booking`

- `id`
- `createdAt`
- `updatedAt`
- `status`: `tentative`, `confirmed`, `completed`, `cancelled`
- `clientId`
- `inquiryId`
- `serviceSlug`
- `startsAt`
- `endsAt`
- `locationType`
- `prepChecklist`
- `internalNotes`

### `client`

- `id`
- `name`
- `email`
- `phone`
- `company`
- `tags`
- `relationshipStatus`
- `inquiryIds`
- `bookingIds`
- `notes`

## Validation Utilities

Recommended validation home:

```txt
lib/validation/
  fields.js
  bookingInquiry.js
  contentRecords.js
```

Recommended helper responsibilities:

- Normalize strings, arrays, email values, phone values, and controlled option
  selections.
- Validate required fields and length limits.
- Validate booking service selections against public service records.
- Validate status values against shared status arrays.
- Return structured errors keyed by field name for form rendering.
- Preserve submitted values after validation failures.
- Avoid provider-specific or framework-specific assumptions in pure validation
  helpers.

Suggested result shape:

```js
{
  valid: false,
  values: {
    name: "Ada Studio",
    email: "hello@example.com"
  },
  errors: {
    timeline: "Choose a preferred timeline."
  }
}
```

## SEO And Metadata Boundary

Use route-local `content.js` metadata inputs first. When routes repeat SEO
shape, introduce a shared helper under `lib/seo`.

Recommended ownership:

- Root layout owns site defaults.
- Public route content adapters own page title, description, path, and image
  fallback inputs.
- Sitemap includes public index/detail routes backed by published mock records.
- Robots should protect admin and API-like paths while allowing public pages.

Do not add JSON-LD or dynamic Open Graph image routes until a later SEO step
explicitly scopes them.

## Future Provider Boundaries

Deferred until explicitly approved:

- Database or CMS provider.
- Auth/session protection for admin.
- Email or webhook notifications.
- Payment processing.
- Media storage provider.
- Cron jobs or background queues.
- Production data mutation or provider configuration.

When providers are approved later, add adapters behind stable modules instead
of importing provider clients into pages or components.

## Later Lane Notes

- Public website lane should start with shared site/service/proof/FAQ mock
  content and then render home, services, about, and contact surfaces.
- Booking lane should use the same service records and validation utilities as
  public service discovery.
- Admin lane should use the same inquiry, booking, service, and client record
  shapes as the booking flow to avoid divergent mock models.
- CMS consolidation lane should audit route-local content and move repeated
  records into `lib/content` without changing the public route contract.
- QA lane should verify keyboard navigation, mobile overflow, form errors,
  empty states, admin density, and route-level build/lint health.
