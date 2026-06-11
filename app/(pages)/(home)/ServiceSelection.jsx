"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";

export default function ServiceSelection({ content }) {
  const [selectedServiceId, setSelectedServiceId] = useState(
    content.services[0]?.id || "",
  );

  const selectedService = useMemo(
    () =>
      content.services.find((service) => service.id === selectedServiceId) ||
      null,
    [content.services, selectedServiceId],
  );

  return (
    <section className={styles.bookingPanel} aria-labelledby="service-selection">
      <div className={styles.sectionHeader}>
        <p className={styles.kicker}>Step 1 of 4</p>
        <h2 id="service-selection">{content.selectorTitle}</h2>
        <p>{content.selectorDescription}</p>
      </div>

      <div className={styles.selectionLayout}>
        <fieldset className={styles.serviceFieldset}>
          <legend className={styles.visuallyHidden}>Choose a service</legend>

          <div className={styles.serviceGrid}>
            {content.services.map((service) => {
              const selected = service.id === selectedServiceId;

              return (
                <label
                  className={styles.serviceCard}
                  data-selected={selected ? "true" : "false"}
                  htmlFor={`service-${service.id}`}
                  key={service.id}
                >
                  <input
                    checked={selected}
                    className={styles.serviceInput}
                    id={`service-${service.id}`}
                    name="serviceId"
                    onChange={() => setSelectedServiceId(service.id)}
                    type="radio"
                    value={service.id}
                  />

                  <span className={styles.cardTopline}>
                    <span>{service.durationLabel}</span>
                    <span>{selected ? "Selected" : "Available"}</span>
                  </span>

                  <span className={styles.cardTitle}>{service.name}</span>
                  <span className={styles.cardSummary}>{service.summary}</span>

                  <span className={styles.metaList} aria-label="Booking expectations">
                    <span>
                      <strong>Investment</strong>
                      {service.investmentLabel}
                    </span>
                    <span>
                      <strong>Lead time</strong>
                      {service.leadTimeLabel}
                    </span>
                  </span>

                  <span className={styles.fitList} aria-label="Best for">
                    {service.bestFor.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <aside
          className={styles.selectionSummary}
          aria-live="polite"
          aria-labelledby="selected-service"
        >
          <p className={styles.kicker}>Booking expectations</p>
          <h3 id="selected-service">{content.selectedSummaryTitle}</h3>

          {selectedService ? (
            <div className={styles.summaryContent}>
              <div>
                <p className={styles.summaryName}>{selectedService.name}</p>
                <p className={styles.summaryDescription}>
                  {selectedService.description}
                </p>
              </div>

              <dl className={styles.summaryStats}>
                <div>
                  <dt>Estimated duration</dt>
                  <dd>{selectedService.durationLabel}</dd>
                </div>
                <div>
                  <dt>Estimated budget</dt>
                  <dd>{selectedService.investmentLabel}</dd>
                </div>
                <div>
                  <dt>Recommended lead time</dt>
                  <dd>{selectedService.leadTimeLabel}</dd>
                </div>
              </dl>

              <div>
                <p className={styles.summarySubhead}>Expected deliverables</p>
                <ul className={styles.deliverableList}>
                  {selectedService.deliverables.map((deliverable) => (
                    <li key={deliverable}>{deliverable}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p className={styles.summaryDescription}>
              {content.selectedSummaryEmpty}
            </p>
          )}
        </aside>
      </div>
    </section>
  );
}
