import React from "react";
import Link from "next/link";
import CtaBand from "@/app/components/public/CtaBand";
import CtaLink from "@/app/components/public/CtaLink";
import SectionIntro from "@/app/components/public/SectionIntro";
import {
  getCallToActionById,
  getGalleryItemBySlug,
  getPublishedTestimonials,
  getServiceBySlug,
  publicPageContent,
  studioProfile,
} from "./content";
import styles from "./page.module.css";

export const metadata = publicPageContent.home.metadata;

export default function Home() {
  const homeContent = publicPageContent.home;
  const primaryCta = getCallToActionById(homeContent.hero.primaryCtaId);
  const secondaryCta = getCallToActionById(homeContent.hero.secondaryCtaId);
  const featuredServices = homeContent.featuredServiceSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter(Boolean);
  const featuredWork = homeContent.featuredGallerySlugs
    .map((slug) => getGalleryItemBySlug(slug))
    .filter(Boolean);
  const testimonials = getPublishedTestimonials();

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

      <section className={styles.value}>
        <div className={styles.valueIntro}>
          <p className={styles.eyebrow}>{homeContent.value.eyebrow}</p>
          <h2>{homeContent.value.headline}</h2>
        </div>
        <div className={styles.valueContent}>
          <p>{homeContent.value.summary}</p>
          <ul className={styles.valueList}>
            {homeContent.value.points.map((point) => (
              <li key={point.id}>
                <h3>{point.title}</h3>
                <p>{point.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.services} id="services-preview">
        <SectionIntro
          eyebrow={publicPageContent.services.eyebrow}
          headline={publicPageContent.services.headline}
          summary={publicPageContent.services.summary}
        />

        <div className={styles.serviceGrid}>
          {featuredServices.map((service) => (
            <article className={styles.serviceCard} id={service.slug} key={service.id}>
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
              <ul className={styles.tagList} aria-label={`${service.title} is best for`}>
                {service.bestFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link href={`/services#${service.slug}`} className={styles.cardLink}>
                View service details
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.process}>
        <SectionIntro
          eyebrow={homeContent.process.eyebrow}
          headline={homeContent.process.headline}
          summary={homeContent.process.summary}
          align="center"
        />

        <ol className={styles.processList}>
          {homeContent.process.steps.map((step) => (
            <li key={step.id}>
              <span>{step.label}</span>
              <h3>{step.title}</h3>
              <p>{step.summary}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.featuredWork}>
        <div className={styles.workHeader}>
          <SectionIntro
            eyebrow={publicPageContent.gallery.eyebrow}
            headline={publicPageContent.gallery.headline}
            summary={publicPageContent.gallery.summary}
          />
          <CtaLink href="/services" label="Match work to services" intent="navigation" />
        </div>

        <div className={styles.workGrid}>
          {featuredWork.map((item, index) => (
            <figure className={styles.workCard} key={item.id}>
              <div
                className={styles.workImage}
                role="img"
                aria-label={item.image.alt}
                style={{
                  "--work-primary": index === 1 ? "var(--color-accent-soft)" : "var(--color-soft)",
                  "--work-secondary": index === 2 ? "var(--color-clay)" : "var(--color-accent)",
                  "--work-angle": `${index * 12 + 8}deg`,
                }}
              >
                <span />
              </div>
              <figcaption>
                <span>{item.category}</span>
                <strong>{item.title}</strong>
              </figcaption>
            </figure>
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
              <blockquote>{testimonial.quote}</blockquote>
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
