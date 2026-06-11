import Link from "next/link";

import { ADMIN_BOOKING_STATUSES } from "@/lib/admin/mockStudioData";

import styles from "../admin.module.css";
import { getBookingInboxContent } from "../content";

export const metadata = {
  title: "Booking Inbox | Atelier Bookings",
  description: "Mock admin inbox for scanning and filtering studio booking inquiries.",
};

const statusClassNames = {
  [ADMIN_BOOKING_STATUSES.new]: styles.statusNew,
  [ADMIN_BOOKING_STATUSES.reviewing]: styles.statusReviewing,
  [ADMIN_BOOKING_STATUSES.proposalSent]: styles.statusProposal,
  [ADMIN_BOOKING_STATUSES.confirmed]: styles.statusConfirmed,
  [ADMIN_BOOKING_STATUSES.completed]: styles.statusCompleted,
  [ADMIN_BOOKING_STATUSES.declined]: styles.statusDeclined,
};

const priorityClassNames = {
  high: styles.priorityHigh,
  low: styles.priorityLow,
  medium: styles.priorityMedium,
};

const getSingleParam = (value) => (Array.isArray(value) ? value[0] || "" : value || "");

const getInboxHref = ({ query, selected, status }) => {
  const params = new URLSearchParams();

  if (status && status !== "all") {
    params.set("status", status);
  }

  if (query) {
    params.set("q", query);
  }

  if (selected) {
    params.set("selected", selected);
  }

  const queryString = params.toString();

  return queryString ? `/Admin/bookings?${queryString}` : "/Admin/bookings";
};

function StatusBadge({ status }) {
  return (
    <span className={`${styles.statusBadge} ${statusClassNames[status.value] || ""}`}>
      {status.label}
    </span>
  );
}

function BookingDetailPanel({ booking }) {
  if (!booking) {
    return (
      <aside className={`${styles.panel} ${styles.inboxAside}`} aria-labelledby="booking-detail-title">
        <div className={styles.emptyState}>
          <p className={styles.eyebrow}>Detail view</p>
          <h2 id="booking-detail-title">No inquiry selected</h2>
          <p>Adjust the inbox filters or search terms to find a booking inquiry.</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className={`${styles.panel} ${styles.inboxAside}`} aria-labelledby="booking-detail-title">
      <div className={styles.detailHeader}>
        <div>
          <p className={styles.eyebrow}>Detail view</p>
          <h2 id="booking-detail-title">{booking.projectName}</h2>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <div className={styles.detailMetaGrid} aria-label="Selected inquiry summary">
        <div>
          <span>Client</span>
          <strong>{booking.client.company}</strong>
          <small>{booking.client.contactName}</small>
        </div>
        <div>
          <span>Preferred date</span>
          <strong>{booking.desiredDate.shortLabel}</strong>
          <small>{booking.timelineLabel}</small>
        </div>
        <div>
          <span>Estimated value</span>
          <strong>{booking.estimatedValue}</strong>
          <small>{booking.service.durationLabel}</small>
        </div>
        <div>
          <span>Last contact</span>
          <strong>{booking.lastContactedLabel}</strong>
          <small>{booking.repliedLabel}</small>
        </div>
      </div>

      <div className={styles.detailBlock}>
        <h3>Client summary</h3>
        <p>{booking.message}</p>
        <ul className={styles.contactList}>
          <li>{booking.client.email}</li>
          <li>{booking.client.phone}</li>
          <li>{booking.client.location}</li>
        </ul>
      </div>

      <div className={styles.detailBlock}>
        <h3>Service fit</h3>
        <p>
          {booking.service.name} / {booking.service.category}
        </p>
        <div className={styles.tagList} aria-label="Service deliverables">
          {booking.service.deliverables.map((deliverable) => (
            <span key={deliverable}>{deliverable}</span>
          ))}
        </div>
      </div>

      <div className={styles.detailBlock}>
        <h3>Internal note</h3>
        <p>{booking.internalNotes}</p>
      </div>

      <Link className={styles.detailAction} href={`/Admin/bookings/${booking.id}`}>
        Open full review
      </Link>
    </aside>
  );
}

export default async function BookingInboxPage({ searchParams }) {
  const params = await searchParams;
  const query = getSingleParam(params?.q).trim();
  const selectedId = getSingleParam(params?.selected);
  const status = getSingleParam(params?.status) || "all";
  const content = getBookingInboxContent({ query, selectedId, status });

  return (
    <div className={styles.inbox} id="booking-inbox">
      <section className={styles.inboxHero} aria-labelledby="booking-inbox-title">
        <div>
          <p className={styles.eyebrow}>{content.hero.eyebrow}</p>
          <h1 id="booking-inbox-title">{content.hero.title}</h1>
          <p>{content.hero.description}</p>
        </div>
        <div className={styles.inboxHeroStats} aria-label="Inbox summary">
          {content.summary.map((metric) => (
            <div key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <small>{metric.meta}</small>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.filterPanel} aria-labelledby="booking-filter-title">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.eyebrow}>Queue controls</p>
            <h2 id="booking-filter-title">Filter inquiries</h2>
          </div>
          {content.query ? (
            <Link
              className={styles.panelBadge}
              href={getInboxHref({ status: content.activeStatus })}
            >
              Clear search
            </Link>
          ) : null}
        </div>

        <form className={styles.filterForm} action="/Admin/bookings" method="get">
          <label className={styles.searchField}>
            <span>Search inquiries</span>
            <input
              defaultValue={content.query}
              name="q"
              placeholder="Client, project, service, source..."
              type="search"
            />
          </label>
          {content.activeStatus !== "all" ? (
            <input name="status" type="hidden" value={content.activeStatus} />
          ) : null}
          <button type="submit">Search</button>
        </form>

        <nav className={styles.statusFilters} aria-label="Booking status filters">
          {content.filters.map((filter) => (
            <Link
              aria-current={filter.value === content.activeStatus ? "page" : undefined}
              className={`${styles.filterLink} ${
                filter.value === content.activeStatus ? styles.filterLinkActive : ""
              }`}
              href={getInboxHref({ query: content.query, status: filter.value })}
              key={filter.value}
            >
              <span>{filter.label}</span>
              <strong>{filter.count}</strong>
            </Link>
          ))}
        </nav>
      </section>

      <section className={styles.inboxGrid} aria-label="Booking inquiry queue">
        <div className={`${styles.panel} ${styles.inboxMain}`}>
          <div className={styles.inboxToolbar}>
            <div>
              <p className={styles.eyebrow}>Inquiry list</p>
              <h2>Bookings</h2>
            </div>
            <span className={styles.panelBadge}>{content.items.length} results</span>
          </div>

          {content.items.length ? (
            <div className={styles.bookingTable}>
              <div className={styles.bookingTableHead} aria-hidden="true">
                <span>Client and project</span>
                <span>Service</span>
                <span>Preferred date</span>
                <span>Status</span>
              </div>

              {content.items.map((booking) => {
                const isSelected = content.selectedBooking?.id === booking.id;

                return (
                  <article
                    className={`${styles.bookingRow} ${isSelected ? styles.bookingRowSelected : ""}`}
                    id={booking.id}
                    key={booking.id}
                  >
                    <div className={styles.bookingMain}>
                      <Link
                        href={getInboxHref({
                          query: content.query,
                          selected: booking.id,
                          status: content.activeStatus,
                        })}
                      >
                        {booking.projectName}
                      </Link>
                      <span>{booking.client.company}</span>
                      <small>
                        {booking.client.contactName} / {booking.client.location}
                      </small>
                    </div>

                    <div className={styles.labelStack}>
                      <span className={styles.servicePill}>{booking.service.name}</span>
                      <small>
                        {booking.service.category} / {booking.service.durationLabel}
                      </small>
                    </div>

                    <div className={styles.valueStack}>
                      <time dateTime={booking.desiredDate.dateTime}>
                        {booking.desiredDate.shortLabel}
                      </time>
                      <small>{booking.estimatedValue}</small>
                    </div>

                    <div className={styles.bookingStatusCell}>
                      <StatusBadge status={booking.status} />
                      <span
                        className={`${styles.priorityPill} ${
                          priorityClassNames[booking.priority] || ""
                        }`}
                      >
                        {booking.priority} priority
                      </span>
                    </div>

                    <p className={styles.bookingMessage}>{booking.message}</p>

                    <div className={styles.bookingMeta}>
                      <span>Source: {booking.source}</span>
                      <span>Created: {booking.createdAtLabel}</span>
                      <span>Updated: {booking.updatedAtLabel}</span>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p className={styles.eyebrow}>No matches</p>
              <h2>No booking inquiries found</h2>
              <p>Try another search term or switch back to all statuses.</p>
              <Link className={styles.panelBadge} href="/Admin/bookings">
                Reset inbox
              </Link>
            </div>
          )}
        </div>

        <BookingDetailPanel booking={content.selectedBooking} />
      </section>
    </div>
  );
}
