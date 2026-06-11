import React from "react";
import CtaBand from "@/app/components/public/CtaBand";
import CtaLink from "@/app/components/public/CtaLink";
import SectionIntro from "@/app/components/public/SectionIntro";
import {
  getCallToActionById,
  getPublishedTestimonials,
  getServiceBySlug,
  publicPageContent,
  studioProfile,
} from "./content";
import styles from "./page.module.css";

export default function Home() {
  const homeContent = publicPageContent.home;
  const primaryCta = getCallToActionById(homeContent.hero.primaryCtaId);
  const secondaryCta = getCallToActionById(homeContent.hero.secondaryCtaId);
  const featuredServices = homeContent.featuredServiceSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter(Boolean);
  const testimonials = getPublishedTestimonials().slice(0, 2);

  return (
    <main className={`public-main ${styles.page}`}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>{homeContent.hero.eyebrow}</p>
          <h1>{homeContent.hero.headline}</h1>
          <p>{homeContent.hero.summary}</p>
          <div className={styles.heroActions}>
            {primaryCta && <CtaLink {...primaryCta} intent="primary" />}
            {secondaryCta && <CtaLink {...secondaryCta} intent="secondary" />}
          </div>
        </div>

        <aside className={styles.heroPanel} aria-label="Studio service highlights">
          <div className={styles.heroPanelHeader}>
            <span>Studio Path</span>
            <strong>01-03</strong>
          </div>
          <ol>
            {studioProfile.highlights.map((highlight) => (
              <li key={highlight.id}>
                <span>{highlight.label}</span>
                <p>{highlight.value}</p>
              </li>
            ))}
          </ol>
        </aside>
      </section>

      <section className={styles.services} id="services-preview">
        <SectionIntro
          eyebrow={publicPageContent.services.eyebrow}
          headline={publicPageContent.services.headline}
          summary={publicPageContent.services.summary}
        />

        <div className={styles.serviceGrid}>
          {featuredServices.map((service) => (
            <article className={styles.serviceCard} key={service.id}>
              <div>
                <p className={styles.cardEyebrow}>{service.eyebrow}</p>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
              </div>
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
            </article>
          ))}
        </div>
      </section>

      <section className={styles.proof}>
        <SectionIntro
          eyebrow="Client care"
          headline="Calm structure for creative work that usually feels scattered."
          summary={studioProfile.intro}
          align="center"
        />

        <div className={styles.testimonialGrid}>
          {testimonials.map((testimonial) => (
            <figure key={testimonial.id} className={styles.testimonialCard}>
              <blockquote>“{testimonial.quote}”</blockquote>
              <figcaption>
                <strong>{testimonial.projectType}</strong>
                <span>{testimonial.attribution}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <CtaBand
        eyebrow="Booking"
        headline="Ready to shape the next studio project?"
        summary="Use the shared inquiry path to compare services, explain the project, and choose the right next step."
        cta={primaryCta}
        secondaryCta={secondaryCta}
        tone="dark"
      />
    </main>
  );
}
