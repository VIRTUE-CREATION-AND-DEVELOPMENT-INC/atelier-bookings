import Link from "next/link";

import { ADMIN_BOOKING_STATUSES, listAdminBookings } from "@/lib/admin/mockStudioData";

import styles from "../../admin.module.css";
import { getBookingDetailContent } from "../../content";
import StatusControls from "./StatusControls";

const statusClassNames = {
  [ADMIN_BOOKING_STATUSES.new]: styles.statusNew,
  [ADMIN_BOOKING_STATUSES.reviewing]: styles.statusReviewing,
  [ADMIN_BOOKING_STATUSES.proposalSent]: styles.statusProposal,
  [ADMIN_BOOKING_STATUSES.confirmed]: styles.statusConfirmed,
  [ADMIN_BOOKING_STATUSES.completed]: styles.statusCompleted,
  [ADMIN_BOOKING_STATUSES.declined]: styles.statusDeclined,
};

function StatusBadge({ status }) {
  return (
    <span className={`${styles.statusBadge} ${statusClassNames[status.value] || ""}`}>
      {status.label}
    </span>
  );
}

export async function generateStaticParams() {
  return listAdminBookings({ includeArchived: false }).map((booking) => ({
    bookingId: booking.id,
  }));
}

export async function generateMetadata({ params }) {
  const { bookingId } = await params;
  const content = getBookingDetailContent(bookingId);

  return {
    title: content.booking
      ? `${content.booking.projectName} | Booking Review`
      : "Booking Review | Atelier Bookings",
    description: "Mock admin booking detail review for Atelier Bookings.",
  };
}

function DetailList({ items }) {
  const visibleItems = items.filter((item) => item.value);

  if (!visibleItems.length) {
    return <p className={styles.emptyCopy}>No details are available for this section.</p>;
  }

  return (
    <dl className={styles.reviewList}>
      {visibleItems.map((item) => (
        <div key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default async function BookingDetailPage({ params }) {
  const { bookingId } = await params;
  const content = getBookingDetailContent(bookingId);
  const booking = content.booking;

  if (!booking) {
    return (
      <div className={styles.bookingDetailPage}>
        <section className={styles.detailHero} aria-labelledby="booking-detail-title">
          <div>
            <p className={styles.eyebrow}>{content.hero.eyebrow}</p>
            <h1 id="booking-detail-title">{content.hero.title}</h1>
            <p>{content.hero.description}</p>
          </div>
          <Link className={styles.panelBadge} href="/Admin/bookings">
            Back to booking inbox
          </Link>
        </section>

        <section className={styles.emptyState} aria-labelledby="booking-error-title">
          <p className={styles.eyebrow}>Missing record</p>
          <h2 id="booking-error-title">No active booking matches this detail URL</h2>
          <p>
            This mock detail is not in the active queue. Return to the inbox to choose a visible
            inquiry and keep the review context intact.
          </p>
          <Link className={styles.panelBadge} href="/Admin/bookings">
            Return to all inquiries
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.bookingDetailPage}>
      <section className={styles.detailHero} aria-labelledby="booking-detail-title">
        <div>
          <p className={styles.eyebrow}>{content.hero.eyebrow}</p>
          <h1 id="booking-detail-title">{content.hero.title}</h1>
          <p>{content.hero.description}</p>
        </div>
        <div className={styles.detailHeroAside}>
          <StatusBadge status={booking.status} />
          <span>{booking.estimatedValue}</span>
          <small>Current mock value</small>
        </div>
      </section>

      <section className={styles.detailOverviewGrid} aria-label="Booking summary">
        <article className={styles.metricCard}>
          <span>Client</span>
          <strong>{booking.client.company}</strong>
          <p>{booking.client.contactName}</p>
        </article>
        <article className={styles.metricCard}>
          <span>Selected service</span>
          <strong>{booking.service.name}</strong>
          <p>{booking.service.durationLabel}</p>
        </article>
        <article className={styles.metricCard}>
          <span>Preferred date</span>
          <strong>{booking.desiredDate.shortLabel}</strong>
          <p>{booking.timelineLabel}</p>
        </article>
        <article className={styles.metricCard}>
          <span>Last contact</span>
          <strong>{booking.lastContactedLabel}</strong>
          <p>{booking.repliedLabel}</p>
        </article>
      </section>

      <section className={styles.bookingReviewGrid}>
        <div className={styles.reviewMainColumn}>
          <article className={styles.panel} aria-labelledby="client-details-title">
            <div className={styles.panelHeader}>
              <div>
                <p className={styles.eyebrow}>Client details</p>
                <h2 id="client-details-title">Contact and context</h2>
              </div>
              <Link className={styles.panelBadge} href="/Admin/bookings">
                Inbox
              </Link>
            </div>

            <DetailList
              items={[
                { label: "Company", value: booking.client.company },
                { label: "Contact", value: booking.client.contactName },
                { label: "Email", value: booking.client.email },
                { label: "Phone", value: booking.client.phone },
                { label: "Location", value: booking.client.location },
              ]}
            />
            {booking.client.tags.length ? (
              <div className={styles.detailTagGroup} aria-label="Client tags">
                {booking.client.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            ) : (
              <p className={styles.emptyCopy}>No client tags are attached to this inquiry.</p>
            )}
          </article>

          <article className={styles.panel} aria-labelledby="service-review-title">
            <div>
              <p className={styles.eyebrow}>Selected service</p>
              <h2 id="service-review-title">Service fit</h2>
            </div>
            <p className={styles.reviewCopy}>{booking.service.summary}</p>
            {booking.service.deliverables.length ? (
              <div className={styles.tagList} aria-label="Included service deliverables">
                {booking.service.deliverables.map((deliverable) => (
                  <span key={deliverable}>{deliverable}</span>
                ))}
              </div>
            ) : (
              <p className={styles.emptyCopy}>No deliverables are listed for this service.</p>
            )}
          </article>

          <article className={styles.panel} aria-labelledby="notes-title">
            <div>
              <p className={styles.eyebrow}>Notes</p>
              <h2 id="notes-title">Inquiry and internal review</h2>
            </div>
            <div className={styles.noteStack}>
              <div>
                <h3>Client note</h3>
                <p>{booking.message || "No client note was included with this inquiry."}</p>
              </div>
              <div>
                <h3>Internal note</h3>
                <p>{booking.internalNotes || "No internal note has been added."}</p>
              </div>
            </div>
          </article>

          <article className={styles.panel} aria-labelledby="timeline-title">
            <div>
              <p className={styles.eyebrow}>Timeline</p>
              <h2 id="timeline-title">Inquiry movement</h2>
            </div>
            {booking.timeline.length ? (
              <ol className={styles.reviewTimeline}>
                {booking.timeline.map((event) => (
                  <li key={`${event.title}-${event.label}`}>
                    <span aria-hidden="true" />
                    <div>
                      <strong>{event.title}</strong>
                      <time dateTime={event.dateTime}>{event.label}</time>
                      <p>{event.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className={styles.emptyCopy}>No timeline events are available.</p>
            )}
          </article>
        </div>

        <aside className={styles.reviewAsideColumn} aria-label="Booking controls and preferences">
          <StatusControls currentStatus={booking.status} options={booking.statusOptions} />

          <section className={styles.panel} aria-labelledby="preferences-title">
            <div>
              <p className={styles.eyebrow}>Preferences</p>
              <h2 id="preferences-title">Booking request</h2>
            </div>
            <DetailList items={booking.preferences} />
          </section>

          <section className={styles.panel} aria-labelledby="related-title">
            <div>
              <p className={styles.eyebrow}>Client history</p>
              <h2 id="related-title">Related inquiries</h2>
            </div>
            {content.relatedBookings.length ? (
              <div className={styles.relatedList}>
                {content.relatedBookings.map((related) => (
                  <Link href={`/Admin/bookings/${related.id}`} key={related.id}>
                    <strong>{related.projectName}</strong>
                    <span>{related.status.label}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className={styles.emptyCopy}>No other active inquiries for this client.</p>
            )}
          </section>
        </aside>
      </section>
    </div>
  );
}
