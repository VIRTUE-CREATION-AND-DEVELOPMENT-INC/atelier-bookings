"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { submitMockBookingInquiry } from "../../../lib/bookings/mock-store.js";
import { validateBookingInquiryInput } from "../../../lib/bookings/validation.js";
import styles from "./page.module.css";

const INITIAL_FORM_VALUES = {
  eventDate: "",
  preferredTime: "",
  timeline: "",
  scheduleFlexibility: "",
  budgetRange: "",
  clientName: "",
  email: "",
  phone: "",
  company: "",
  projectTitle: "",
  location: "",
  contactMethod: "email",
  message: "",
  expectationConsent: false,
};

const getFieldErrorId = (field) => `${field}-error`;

const getInitialServiceId = (services, serviceId) =>
  services.some((service) => service.id === serviceId)
    ? serviceId
    : services[0]?.id || "";

export default function ServiceSelection({ content, initialServiceId = "" }) {
  const routedServiceId = getInitialServiceId(
    content.services,
    initialServiceId,
  );
  const [selectedServiceId, setSelectedServiceId] = useState(routedServiceId);
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [hasValidated, setHasValidated] = useState(false);
  const [flowStep, setFlowStep] = useState("details");
  const [reviewValues, setReviewValues] = useState(null);
  const [submittedInquiry, setSubmittedInquiry] = useState(null);
  const reviewRef = useRef(null);
  const confirmationRef = useRef(null);

  const selectedService = useMemo(
    () =>
      content.services.find((service) => service.id === selectedServiceId) ||
      null,
    [content.services, selectedServiceId],
  );

  const summaryValues = useMemo(
    () =>
      reviewValues || {
        ...formValues,
        inquiryType: "service-inquiry",
        serviceId: selectedServiceId,
        source: "booking-flow",
      },
    [formValues, reviewValues, selectedServiceId],
  );

  const reviewSummary = useMemo(
    () => buildInquirySummary(content, summaryValues, selectedService),
    [content, selectedService, summaryValues],
  );

  useEffect(() => {
    if (flowStep === "review") {
      reviewRef.current?.focus();
    }

    if (flowStep === "confirmed") {
      confirmationRef.current?.focus();
    }
  }, [flowStep]);

  const getError = (field) => errors[field]?.[0] || "";

  const getDescribedBy = (field, helperId) => {
    const descriptionIds = [helperId, getError(field) && getFieldErrorId(field)]
      .filter(Boolean)
      .join(" ");

    return descriptionIds || undefined;
  };

  const updateField = (field, value) => {
    if (flowStep === "submitting") {
      return;
    }

    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    if (hasValidated) {
      setErrors((currentErrors) => {
        const nextErrors = { ...currentErrors };
        delete nextErrors[field];
        return nextErrors;
      });
    }

    if (flowStep === "review") {
      setFlowStep("details");
      setReviewValues(null);
    }

    setStatusMessage("");
  };

  const updateSelectedService = (serviceId) => {
    if (flowStep === "submitting") {
      return;
    }

    setSelectedServiceId(serviceId);

    if (hasValidated) {
      setErrors((currentErrors) => {
        const nextErrors = { ...currentErrors };
        delete nextErrors.serviceId;
        return nextErrors;
      });
    }

    if (flowStep === "review") {
      setFlowStep("details");
      setReviewValues(null);
    }

    setStatusMessage("");
  };

  const validateCurrentInquiry = () => {
    const result = validateBookingInquiryInput({
      ...formValues,
      inquiryType: "service-inquiry",
      serviceId: selectedServiceId,
      source: "booking-flow",
    });

    setHasValidated(true);
    setErrors(result.errors);

    return result;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (flowStep === "submitting") {
      return;
    }

    const result = validateCurrentInquiry();

    if (!result.success) {
      setFlowStep("details");
      setReviewValues(null);
      setStatusMessage(content.errorMessage);
      return;
    }

    if (flowStep !== "review") {
      setReviewValues(result.values);
      setFlowStep("review");
      setStatusMessage(content.successMessage);
      return;
    }

    setFlowStep("submitting");
    setStatusMessage(content.submittingMessage);

    await new Promise((resolve) => {
      setTimeout(resolve, 450);
    });

    const submission = await submitMockBookingInquiry(result.values);

    if (!submission.success) {
      setFlowStep("details");
      setErrors(submission.errors);
      setStatusMessage(content.errorMessage);
      return;
    }

    setSubmittedInquiry(submission.inquiry);
    setReviewValues(submission.values);
    setErrors({});
    setStatusMessage(content.confirmationStatus);
    setFlowStep("confirmed");
  };

  const handleEditReview = () => {
    setFlowStep("details");
    setStatusMessage("");
  };

  const handleStartAnother = () => {
    setSelectedServiceId(content.services[0]?.id || "");
    setFormValues(INITIAL_FORM_VALUES);
    setErrors({});
    setStatusMessage("");
    setHasValidated(false);
    setFlowStep("details");
    setReviewValues(null);
    setSubmittedInquiry(null);
  };

  if (flowStep === "confirmed" && submittedInquiry) {
    const confirmationService =
      submittedInquiry.serviceSnapshot || selectedService || null;
    const confirmationSummary = buildInquirySummary(
      content,
      submittedInquiry.values,
      confirmationService,
    );

    return (
      <section
        id="booking"
        className={styles.bookingPanel}
        aria-labelledby="inquiry-confirmation"
      >
        <article
          className={styles.confirmationPanel}
          ref={confirmationRef}
          tabIndex={-1}
        >
          <div className={styles.confirmationHero}>
            <p className={styles.kicker}>Mock inquiry received</p>
            <h2 id="inquiry-confirmation">{content.confirmationTitle}</h2>
            <p>{content.confirmationDescription}</p>
          </div>

          <div className={styles.confirmationLayout}>
            <InquirySummary
              heading="Inquiry summary"
              summary={confirmationSummary}
            />

            <aside className={styles.nextStepsPanel}>
              <p className={styles.summarySubhead}>What happens next</p>
              <ul className={styles.nextStepsList}>
                {content.confirmationNextSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
              <p className={styles.mockReference}>
                Mock reference: <span>{submittedInquiry.id}</span>
              </p>
            </aside>
          </div>

          <div className={styles.formActions}>
            <p className={styles.formStatus} data-valid="true" aria-live="polite">
              {statusMessage}
            </p>
            <button
              className={styles.secondaryButton}
              onClick={handleStartAnother}
              type="button"
            >
              Start another inquiry
            </button>
          </div>
        </article>
      </section>
    );
  }

  return (
    <section
      className={styles.bookingPanel}
      id="booking"
      aria-labelledby="service-selection"
    >
      <form
        aria-busy={flowStep === "submitting" ? "true" : "false"}
        className={styles.inquiryForm}
        onSubmit={handleSubmit}
        noValidate
      >
        <input type="hidden" name="inquiryType" value="service-inquiry" />
        <input type="hidden" name="source" value="booking-flow" />

        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Step 1 of 4</p>
          <h2 id="service-selection">{content.selectorTitle}</h2>
          <p>{content.selectorDescription}</p>
        </div>

        <div className={styles.selectionLayout}>
          <fieldset
            className={styles.serviceFieldset}
            aria-describedby={getDescribedBy("serviceId")}
          >
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
                      onChange={() => updateSelectedService(service.id)}
                      type="radio"
                      value={service.id}
                    />

                    <span className={styles.cardTopline}>
                      <span>{service.durationLabel}</span>
                      <span>{selected ? "Selected" : "Available"}</span>
                    </span>

                    <span className={styles.cardTitle}>{service.name}</span>
                    <span className={styles.cardSummary}>{service.summary}</span>

                    <span
                      className={styles.metaList}
                      aria-label="Booking expectations"
                    >
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

            <FieldError errors={errors} field="serviceId" />
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

        <div className={styles.formIntro}>
          <p>{content.formIntro}</p>
        </div>

        <div className={styles.formSections}>
          <section className={styles.formSection} aria-labelledby="preferences">
            <div className={styles.formSectionHeader}>
              <p className={styles.kicker}>Step 2 of 4</p>
              <h3 id="preferences">{content.preferenceTitle}</h3>
              <p>{content.preferenceDescription}</p>
            </div>

            <div className={styles.fieldGrid}>
              <FieldShell
                field="eventDate"
                label="Preferred date"
                errors={errors}
                helper="Optional if your timing is still open."
              >
                <input
                  aria-describedby={getDescribedBy(
                    "eventDate",
                    "eventDate-helper",
                  )}
                  aria-invalid={Boolean(getError("eventDate"))}
                  id="eventDate"
                  name="eventDate"
                  onChange={(event) =>
                    updateField("eventDate", event.target.value)
                  }
                  type="date"
                  value={formValues.eventDate}
                />
              </FieldShell>

              <FieldShell
                field="preferredTime"
                label="Preferred time"
                errors={errors}
                helper="Use your local time. The studio will confirm availability."
              >
                <input
                  aria-describedby={getDescribedBy(
                    "preferredTime",
                    "preferredTime-helper",
                  )}
                  aria-invalid={Boolean(getError("preferredTime"))}
                  id="preferredTime"
                  name="preferredTime"
                  onChange={(event) =>
                    updateField("preferredTime", event.target.value)
                  }
                  type="time"
                  value={formValues.preferredTime}
                />
              </FieldShell>

              <FieldShell
                field="timeline"
                label="Project timeline"
                errors={errors}
              >
                <select
                  aria-describedby={getDescribedBy("timeline")}
                  aria-invalid={Boolean(getError("timeline"))}
                  id="timeline"
                  name="timeline"
                  onChange={(event) => updateField("timeline", event.target.value)}
                  value={formValues.timeline}
                >
                  <option value="">Choose a timeline</option>
                  {content.timelineOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </FieldShell>

              <FieldShell
                field="budgetRange"
                label="Estimated budget"
                errors={errors}
              >
                <select
                  aria-describedby={getDescribedBy("budgetRange")}
                  aria-invalid={Boolean(getError("budgetRange"))}
                  id="budgetRange"
                  name="budgetRange"
                  onChange={(event) =>
                    updateField("budgetRange", event.target.value)
                  }
                  value={formValues.budgetRange}
                >
                  <option value="">Choose a range</option>
                  {content.budgetRangeOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </FieldShell>
            </div>

            <fieldset
              className={styles.radioFieldset}
              aria-describedby={getDescribedBy("scheduleFlexibility")}
            >
              <legend>Schedule flexibility</legend>
              <div className={styles.radioGrid}>
                {content.scheduleFlexibilityOptions.map((option) => (
                  <label className={styles.choicePill} key={option.id}>
                    <input
                      checked={formValues.scheduleFlexibility === option.id}
                      name="scheduleFlexibility"
                      onChange={() =>
                        updateField("scheduleFlexibility", option.id)
                      }
                      type="radio"
                      value={option.id}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
              <FieldError errors={errors} field="scheduleFlexibility" />
            </fieldset>
          </section>

          <section className={styles.formSection} aria-labelledby="client-details">
            <div className={styles.formSectionHeader}>
              <p className={styles.kicker}>Step 3 of 4</p>
              <h3 id="client-details">{content.clientTitle}</h3>
              <p>{content.clientDescription}</p>
            </div>

            <div className={styles.fieldGrid}>
              <FieldShell field="clientName" label="Name" errors={errors}>
                <input
                  aria-describedby={getDescribedBy("clientName")}
                  aria-invalid={Boolean(getError("clientName"))}
                  autoComplete="name"
                  id="clientName"
                  name="clientName"
                  onChange={(event) =>
                    updateField("clientName", event.target.value)
                  }
                  type="text"
                  value={formValues.clientName}
                />
              </FieldShell>

              <FieldShell field="email" label="Email" errors={errors}>
                <input
                  aria-describedby={getDescribedBy("email")}
                  aria-invalid={Boolean(getError("email"))}
                  autoComplete="email"
                  id="email"
                  name="email"
                  onChange={(event) => updateField("email", event.target.value)}
                  type="email"
                  value={formValues.email}
                />
              </FieldShell>

              <FieldShell
                field="phone"
                label="Phone"
                errors={errors}
                helper="Required when phone is the preferred contact method."
              >
                <input
                  aria-describedby={getDescribedBy("phone", "phone-helper")}
                  aria-invalid={Boolean(getError("phone"))}
                  autoComplete="tel"
                  id="phone"
                  name="phone"
                  onChange={(event) => updateField("phone", event.target.value)}
                  type="tel"
                  value={formValues.phone}
                />
              </FieldShell>

              <FieldShell field="contactMethod" label="Best contact" errors={errors}>
                <select
                  aria-describedby={getDescribedBy("contactMethod")}
                  aria-invalid={Boolean(getError("contactMethod"))}
                  id="contactMethod"
                  name="contactMethod"
                  onChange={(event) =>
                    updateField("contactMethod", event.target.value)
                  }
                  value={formValues.contactMethod}
                >
                  {content.contactMethodOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </FieldShell>

              <FieldShell field="company" label="Company" errors={errors}>
                <input
                  aria-describedby={getDescribedBy("company")}
                  aria-invalid={Boolean(getError("company"))}
                  autoComplete="organization"
                  id="company"
                  name="company"
                  onChange={(event) => updateField("company", event.target.value)}
                  type="text"
                  value={formValues.company}
                />
              </FieldShell>

              <FieldShell field="projectTitle" label="Project title" errors={errors}>
                <input
                  aria-describedby={getDescribedBy("projectTitle")}
                  aria-invalid={Boolean(getError("projectTitle"))}
                  id="projectTitle"
                  name="projectTitle"
                  onChange={(event) =>
                    updateField("projectTitle", event.target.value)
                  }
                  type="text"
                  value={formValues.projectTitle}
                />
              </FieldShell>

              <FieldShell field="location" label="Location" errors={errors}>
                <input
                  aria-describedby={getDescribedBy("location")}
                  aria-invalid={Boolean(getError("location"))}
                  id="location"
                  name="location"
                  onChange={(event) => updateField("location", event.target.value)}
                  type="text"
                  value={formValues.location}
                />
              </FieldShell>
            </div>

            <FieldShell
              className={styles.fullField}
              field="message"
              label="Project notes"
              errors={errors}
              helper="Include goals, deliverables, references, launch dates, and any constraints."
            >
              <textarea
                aria-describedby={getDescribedBy("message", "message-helper")}
                aria-invalid={Boolean(getError("message"))}
                id="message"
                name="message"
                onChange={(event) => updateField("message", event.target.value)}
                rows="6"
                value={formValues.message}
              />
            </FieldShell>

            <label className={styles.consentRow}>
              <input
                checked={formValues.expectationConsent}
                name="expectationConsent"
                onChange={(event) =>
                  updateField("expectationConsent", event.target.checked)
                }
                type="checkbox"
              />
              <span>{content.expectationConsentLabel}</span>
            </label>
            <FieldError errors={errors} field="expectationConsent" />
          </section>
        </div>

        {flowStep === "review" || flowStep === "submitting" ? (
          <section
            className={styles.reviewPanel}
            aria-labelledby="inquiry-review"
            ref={reviewRef}
            tabIndex={-1}
          >
            <div className={styles.formSectionHeader}>
              <p className={styles.kicker}>Step 4 of 4</p>
              <h3 id="inquiry-review">{content.reviewTitle}</h3>
              <p>{content.reviewDescription}</p>
            </div>

            <InquirySummary heading="Review summary" summary={reviewSummary} />
          </section>
        ) : null}

        <div className={styles.formActions}>
          <p
            className={styles.formStatus}
            role="status"
            data-valid={
              statusMessage === content.successMessage ||
              statusMessage === content.submittingMessage
                ? "true"
                : "false"
            }
            aria-live="polite"
          >
            {statusMessage}
          </p>
          <div className={styles.actionGroup}>
            {flowStep === "review" || flowStep === "submitting" ? (
              <button
                className={styles.secondaryButton}
                disabled={flowStep === "submitting"}
                aria-disabled={flowStep === "submitting"}
                onClick={handleEditReview}
                type="button"
              >
                Edit details
              </button>
            ) : null}
            <button
              className={styles.submitButton}
              disabled={flowStep === "submitting"}
              aria-disabled={flowStep === "submitting"}
              type="submit"
            >
              {flowStep === "review"
                ? "Submit mock inquiry"
                : flowStep === "submitting"
                  ? "Submitting..."
                  : "Continue to review"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

function buildInquirySummary(content, values, service) {
  const getOptionLabel = (items, id) =>
    items.find((item) => item.id === id)?.label || "Not provided";

  return [
    {
      label: "Service",
      value: service?.name || "Not provided",
    },
    {
      label: "Client",
      value: values.clientName || "Not provided",
    },
    {
      label: "Email",
      value: values.email || "Not provided",
    },
    {
      label: "Best contact",
      value: getOptionLabel(content.contactMethodOptions, values.contactMethod),
    },
    {
      label: "Phone",
      value: values.phone || "Not provided",
    },
    {
      label: "Company",
      value: values.company || "Not provided",
    },
    {
      label: "Project",
      value: values.projectTitle || "Not provided",
    },
    {
      label: "Location",
      value: values.location || "Not provided",
    },
    {
      label: "Preferred date",
      value: values.eventDate || "Open",
    },
    {
      label: "Preferred time",
      value: values.preferredTime || "Open",
    },
    {
      label: "Timeline",
      value: getOptionLabel(content.timelineOptions, values.timeline),
    },
    {
      label: "Schedule flexibility",
      value: getOptionLabel(
        content.scheduleFlexibilityOptions,
        values.scheduleFlexibility,
      ),
    },
    {
      label: "Estimated budget",
      value: getOptionLabel(content.budgetRangeOptions, values.budgetRange),
    },
    {
      label: "Project notes",
      value: values.message || "Not provided",
      wide: true,
    },
  ];
}

function InquirySummary({ heading, summary }) {
  return (
    <dl className={styles.reviewSummary} aria-label={heading}>
      {summary.map((item) => (
        <div
          className={styles.reviewItem}
          data-wide={item.wide ? "true" : "false"}
          key={item.label}
        >
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function FieldShell({ children, className = "", errors, field, helper, label }) {
  const fieldError = errors[field]?.[0] || "";
  const shellClassName = [styles.fieldShell, className].filter(Boolean).join(" ");

  return (
    <div className={shellClassName}>
      <label htmlFor={field}>{label}</label>
      {children}
      {helper ? (
        <p className={styles.fieldHelp} id={`${field}-helper`}>
          {helper}
        </p>
      ) : null}
      {fieldError ? (
        <p className={styles.fieldError} id={getFieldErrorId(field)}>
          {fieldError}
        </p>
      ) : null}
    </div>
  );
}

function FieldError({ errors, field }) {
  const fieldError = errors[field]?.[0] || "";

  if (!fieldError) {
    return null;
  }

  return (
    <p className={styles.fieldError} id={getFieldErrorId(field)}>
      {fieldError}
    </p>
  );
}
