import React from "react";
import Link from "next/link";
import CtaBand from "@/app/components/public/CtaBand";
import CtaLink from "@/app/components/public/CtaLink";
import SectionIntro from "@/app/components/public/SectionIntro";
import { getServicesPageContent } from "./content";
import styles from "./page.module.css";

export { metadata } from "./content";

export default function ServicesPage() {
  const { page, services, testimonials, faqs, primaryCta, secondaryCta } =
    getServicesPageContent();

  return (
    <main className={`public-main ${styles.page}`}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{page.hero.eyebrow}</p>
          <h1>{page.hero.headline}</h1>
          <p>{page.hero.summary}</p>
          <div className={styles.heroActions}>
            {primaryCta && <CtaLink {...primaryCta} intent="primary" />}
            {secondaryCta && <CtaLink {...secondaryCta} intent="secondary" />}
          </div>
        </div>

        <nav className={styles.serviceNav} aria-label="Service sections">
          <span>Compare</span>
          {services.map((service) => (
            <Link key={service.id} href={`/services#${service.slug}`}>
              {service.title}
            </Link>
          ))}
        </nav>
      </section>

      <section className={styles.comparison}>
        <SectionIntro
          eyebrow={page.comparison.eyebrow}
          headline={page.comparison.headline}
          summary={page.comparison.summary}
          align="center"
        />

        <div className={styles.serviceStack}>
          {services.map((service) => {
            return (
              <article className={styles.serviceDetail} id={service.slug} key={service.id}>
                <div className={styles.serviceSummary}>
                  <p className={styles.cardEyebrow}>{service.eyebrow}</p>
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                  <ul className={styles.tagList} aria-label={`${service.title} best for`}>
                    {service.bestFor.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.serviceMeta}>
                  <dl>
                    <div>
                      <dt>Starting at</dt>
                      <dd>{service.startingAt}</dd>
                    </div>
                    <div>
                      <dt>Timeline</dt>
                      <dd>{service.duration}</dd>
                    </div>
                  </dl>
                  {service.cta && <CtaLink {...service.cta} intent={service.cta.intent} />}
                </div>

                <div className={styles.deliverables}>
                  <h3>Included deliverables</h3>
                  <ul>
                    {service.deliverables.map((deliverable) => (
                      <li key={deliverable}>{deliverable}</li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.process}>
        <div>
          <p className={styles.eyebrow}>{page.process.eyebrow}</p>
          <h2>{page.process.headline}</h2>
          <p>{page.process.summary}</p>
        </div>

        <ol className={styles.processList}>
          {page.process.steps.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.proof}>
        <SectionIntro
          eyebrow={page.proof.eyebrow}
          headline={page.proof.headline}
          summary="Recent clients use the studio for structure as much as visuals: clearer shot priorities, calmer production days, and assets that match the actual launch plan."
          align="center"
        />

        <div className={styles.testimonialGrid}>
          {testimonials.map((testimonial) => (
            <figure className={styles.testimonialCard} key={testimonial.id}>
              <blockquote>{testimonial.quote}</blockquote>
              <figcaption>
                <strong>{testimonial.projectType}</strong>
                <span>{testimonial.attribution}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className={styles.faq}>
        <SectionIntro
          eyebrow={page.faqIntro.eyebrow}
          headline={page.faqIntro.headline}
        />

        <div className={styles.faqList}>
          {faqs.map((faq) => (
            <article key={faq.id}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaBand
        eyebrow="Booking"
        headline="Have enough context to choose a path?"
        summary="Start an inquiry with the service that feels closest. The studio can adjust scope after reviewing your goals, dates, and deliverables."
        cta={primaryCta}
        secondaryCta={secondaryCta}
        tone="dark"
      />
    </main>
  );
}
