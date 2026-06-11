# UI Reference Brief

## Purpose

Establish the initial visual direction for a boutique creative studio booking
and client-management app. This brief should guide the first implementation
pass across the public website, booking inquiry flow, studio admin tools, and
CMS-ready mock content without copying proprietary reference content.

## Mode And Inputs

- Mode: Direction Mode.
- Existing direction to preserve: minimal scaffold only; no established product
  UI, tokens, or content system yet.
- Project-specific references: none documented in `AGENTS.md`.
- References checked: local `skills/ui-design.md`, current app scaffold, current
  empty style files, and adjacent project documentation structure for artifact
  placement only.
- External reference note: DesignFuel pattern categories for hero, navigation,
  forms, and tables are relevant, but public retrieval was unavailable during
  this step. Do not treat any external site as copied source material.

## Audience

- Primary public audience: creative founders, small brands, consultants,
  hospitality operators, and independent professionals seeking studio services
  with a clear inquiry path.
- Secondary public audience: returning clients checking service fit, process,
  studio standards, and readiness before sending project details.
- Admin audience: studio owners or coordinators managing inquiries, bookings,
  client records, service content, and lightweight CMS updates.

The public experience should feel curated and confidence-building. The admin
experience should feel calm, dense enough for repeat work, and fast to scan.

## Brand Feel

- Boutique, editorial, and composed rather than loud or overly decorative.
- Premium but approachable: polished enough for high-value creative work,
  practical enough for booking and operations.
- Human studio tone: precise, warm, direct, and service-oriented.
- Avoid generic SaaS gradients, oversized marketing spectacle, and visual
  effects that make the booking path feel less trustworthy.

## Page Hierarchy

Public website:

1. Home: clear studio positioning, primary service categories, selected proof,
   process, client-fit signals, FAQ, and inquiry CTA.
2. Services index: scannable service discovery with outcomes, deliverables,
   typical timelines, starting context, and inquiry entry points.
3. Service detail: one service per page with fit, deliverables, process,
   example package structure, FAQs, and a contextual booking CTA.
4. Booking inquiry: guided form flow that captures project type, timeline,
   budget range, contact details, and notes with clear validation.
5. About or studio profile: concise credibility, working style, values, and
   client expectations.
6. Contact: direct fallback path with office details, response expectations,
   and alternate inquiry CTA.

Admin app:

1. Dashboard: today's booking health, new inquiries, upcoming sessions, content
   status, and quick actions.
2. Inquiries: qualification pipeline with status, source, service interest,
   budget/timeline, owner notes, and next action.
3. Bookings: calendar/list hybrid with status, client, service, date, and
   operational notes.
4. Clients: client records with contact details, inquiry history, bookings, and
   relationship notes.
5. Services/CMS: editable service cards, service detail content, FAQs,
   testimonials/proof, and site settings mock structures.

## Visual Language

- Layout: editorial public pages with strong alignment, generous whitespace,
  and a clear content rhythm; admin pages use restrained panels, tables, and
  compact summaries.
- Shapes: small radii, preferably 4-8px. Reserve larger radii for media crops
  only when they support the studio feel.
- Surfaces: use cards for repeated items, admin panels, modals, and framed
  tools. Avoid cards inside cards.
- Imagery: use real-feeling studio, workspace, materials, client session, or
  output imagery. Avoid dark, blurred, vague stock atmosphere when users need
  to understand the offer.
- Icons: use `lucide-react` only, with icons supporting actions and scanning
  rather than acting as decoration.
- Motion: subtle state changes and short reveal transitions only if
  `framer-motion` is already installed or explicitly approved. Motion should
  clarify flow, not brand the product.

## Typography Direction

- Public pages should pair confident editorial headings with highly readable
  body text. Use large type only for hero and major section openings.
- Admin pages should use tighter hierarchy: compact headings, clear labels,
  legible table text, and consistent metadata treatment.
- Avoid negative letter spacing and viewport-scaled type.
- Keep line lengths controlled: public body copy around 60-75 characters where
  possible; admin content optimized for scanning and comparison.
- Use typographic contrast through size, weight, and spacing before adding
  color-heavy emphasis.

## Color Direction

- Base: warm off-white or soft neutral background with charcoal text for an
  editorial studio foundation.
- Accent: one mature brand accent such as deep olive, muted wine, ink blue, or
  burnished copper. Use sparingly for primary actions, selected states, and key
  markers.
- Support colors: quiet neutrals for dividers, surfaces, disabled states, and
  metadata. Use semantic colors for success, warning, and error states.
- Avoid one-note palettes dominated by beige, purple-blue gradients, dark slate,
  or brown/orange.
- Maintain accessible contrast for text, buttons, status labels, form errors,
  and admin table metadata.

## Spacing And Layout Principles

- Establish a simple spacing rhythm before implementation: compact controls,
  medium content groups, generous public sections.
- Public sections should have clear transitions without floating every section
  in a card.
- Use stable max-widths and grids:
  - Public text lanes should stay readable.
  - Service cards should align to consistent tracks.
  - Admin tables and lists should keep fixed action columns where practical.
- Reserve hero-scale spacing for the public home and major page intros.
- Keep forms visually grouped by intent: project context, scheduling details,
  contact details, and confirmation.
- Build reusable patterns only after repetition is clear: page headers, section
  headers, CTA bands, service cards, form fields, status badges, empty states,
  and admin list shells.

## Responsive Behavior

- Mobile public pages should prioritize the booking CTA, service clarity, and
  short content chunks. Avoid desktop-only editorial layouts collapsing into
  long, hard-to-scan stacks.
- Navigation should remain direct: services, process/about, contact/book.
- Booking inquiry fields should use single-column mobile layouts with large
  touch targets and visible validation text.
- Admin pages should degrade from dense tables into list rows or grouped record
  cards on small screens, with primary actions still reachable.
- Sticky UI must not hide form errors, CTA buttons, or table controls.
- Verify long service names, client names, emails, status labels, and button
  text do not overflow on mobile.

## Interaction Tone

- Public interactions: quiet, clear, and intentional. Hover states should show
  confidence without feeling flashy.
- Booking flow: guided, transparent, and low-friction. Make progress, required
  fields, validation, and success states explicit.
- Admin interactions: utilitarian and predictable. Filters, status changes,
  quick actions, save states, loading states, and empty states should be obvious
  and reversible where appropriate.
- Error copy should explain what changed and what the user can do next.
- Success copy should confirm the outcome without exaggeration.

## Component Inventory For First Build

- Public shell: header/nav, footer, page intro, CTA band.
- Content sections: service grid, process steps, proof/testimonial block, FAQ,
  image/media band, contact summary.
- Booking flow: field groups, inputs, textarea, select/radio controls, progress
  or step indicator, validation messages, success state.
- Admin shell: sidebar/topbar, dashboard summary cards, table/list views,
  filters, status badges, record detail panel, empty/loading/error states.
- CMS-ready content patterns: editable service records, FAQ records, proof
  records, site settings, inquiry records, booking records, client records.

## Must Not Copy

- Proprietary logos, brand names, exact compositions, copyrighted copy, private
  assets, unique illustrations, client-specific data, or reference site identity
  systems.
- External project code or content. Adjacent projects may inform structure only.

## Implementation Risks To Watch

- Public pages becoming generic marketing surfaces instead of a usable service
  discovery and booking path.
- Admin pages becoming too decorative or too sparse for repeated operations.
- Early components overfitting one page before route patterns are proven.
- Form validation, empty states, loading states, and mobile overflow being left
  until the end.
- Color and typography choices drifting away from a cohesive studio identity
  once tokens are added.
