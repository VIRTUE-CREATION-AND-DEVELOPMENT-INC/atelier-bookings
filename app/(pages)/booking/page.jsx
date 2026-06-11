import Link from "next/link";
import BookingInquiry from "./BookingInquiry.jsx";
import { homePageContent } from "./content.js";
import styles from "./page.module.css";

export const metadata = {
  title: "Booking Inquiry | Atelier Bookings",
  description:
    "Start a mock creative studio booking inquiry with service selection, preferences, client details, review, and confirmation.",
};

const getBookingHref = (serviceId) =>
  serviceId ? `/booking?service=${encodeURIComponent(serviceId)}#booking` : "#booking";

const getRequestedServiceId = (searchParams) => {
  const requestedService = Array.isArray(searchParams?.service)
    ? searchParams.service[0]
    : searchParams?.service;

  return homePageContent.services.some((service) => service.id === requestedService)
    ? requestedService
    : "";
};

export default async function BookingPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const initialServiceId = getRequestedServiceId(resolvedSearchParams);

  return (
    <main className={`public-main ${styles.pageShell}`}>
      <section className={styles.hero} aria-labelledby="booking-title">
        <div className={styles.heroContent}>
          <p className={styles.kicker}>{homePageContent.eyebrow}</p>
          <h1 id="booking-title">{homePageContent.title}</h1>
          <p className={styles.heroIntro}>{homePageContent.intro}</p>
          <div className={styles.heroActions} aria-label="Booking actions">
            <Link className={styles.primaryLink} href={getBookingHref(initialServiceId)}>
              {homePageContent.primaryCtaLabel}
            </Link>
            <Link className={styles.secondaryLink} href="/services">
              {homePageContent.secondaryCtaLabel}
            </Link>
          </div>
        </div>

        <div className={styles.expectationCard} aria-label="Booking flow expectations">
          <p>Before you inquire</p>
          <ul>
            {homePageContent.expectations.map((expectation) => (
              <li key={expectation}>{expectation}</li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className={styles.serviceEntryPanel}
        id="services"
        aria-labelledby="service-entry-title"
      >
        <div className={styles.serviceEntryHeader}>
          <p className={styles.kicker}>Service entry points</p>
          <h2 id="service-entry-title">{homePageContent.serviceEntryTitle}</h2>
          <p>{homePageContent.serviceEntryDescription}</p>
        </div>

        <div className={styles.serviceEntryGrid}>
          {homePageContent.services.map((service) => (
            <Link
              className={styles.serviceEntryLink}
              href={getBookingHref(service.id)}
              key={service.id}
            >
              <span className={styles.serviceEntryName}>{service.name}</span>
              <span className={styles.serviceEntryMeta}>
                {service.durationLabel} / {service.investmentLabel}
              </span>
              <span className={styles.serviceEntryAction}>
                {homePageContent.serviceEntryCtaLabel}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <BookingInquiry
        content={homePageContent}
        initialServiceId={initialServiceId}
        key={initialServiceId || "default-service"}
      />
    </main>
  );
}
