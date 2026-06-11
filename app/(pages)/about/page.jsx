import React from "react";
import CtaBand from "@/app/components/public/CtaBand";
import CtaLink from "@/app/components/public/CtaLink";
import SectionIntro from "@/app/components/public/SectionIntro";
import { getAboutPageContent } from "./content";
import styles from "./page.module.css";

export { metadata } from "./content";

export default function AboutPage() {
  const { page, profile, testimonials, primaryCta, secondaryCta } =
    getAboutPageContent();

  return (
    <main className={`public-main ${styles.page}`}>
      <section className={styles.hero} aria-labelledby="about-hero-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{page.hero.eyebrow}</p>
          <h1 id="about-hero-title">{page.hero.headline}</h1>
          <p>{page.hero.summary}</p>
          <div className={styles.heroActions}>
            {primaryCta && <CtaLink {...primaryCta} intent="primary" />}
            {secondaryCta && <CtaLink {...secondaryCta} intent="secondary" />}
          </div>
        </div>

        <aside className={styles.profilePanel} aria-label="Studio highlights">
          <span>{profile.name}</span>
          <p>{profile.intro}</p>
          <ul>
            {profile.highlights.map((highlight) => (
              <li key={highlight.id}>
                <strong>{highlight.label}</strong>
                <small>{highlight.value}</small>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className={styles.story} aria-labelledby="about-story-title">
        <div className={styles.storyCopy}>
          <p className={styles.eyebrow}>{page.story.eyebrow}</p>
          <h2 id="about-story-title">{page.story.headline}</h2>
          <p>{page.story.summary}</p>
        </div>

        <div className={styles.storyGrid}>
          {page.story.points.map((point, index) => (
            <article key={point.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{point.title}</h3>
              <p>{point.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.values} aria-label="Studio values">
        <SectionIntro
          eyebrow={page.valuesIntro.eyebrow}
          headline={page.valuesIntro.headline}
          summary={page.valuesIntro.summary}
          align="center"
        />

        <div className={styles.valueGrid}>
          {profile.values.map((value) => (
            <article key={value}>
              <h3>{value}</h3>
              <p>
                A practical standard for keeping creative decisions polished,
                client expectations visible, and booking conversations grounded.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.method} aria-labelledby="about-method-title">
        <div>
          <p className={styles.eyebrow}>{page.method.eyebrow}</p>
          <h2 id="about-method-title">{page.method.headline}</h2>
        </div>

        <ol className={styles.methodList}>
          {page.method.steps.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.proof} aria-label="About page social proof">
        <SectionIntro
          eyebrow="Client proof"
          headline="The studio experience is measured by how prepared clients feel."
          summary="Recent feedback highlights the planning, pacing, and clear next steps that support each creative session."
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

      <CtaBand
        eyebrow="Booking"
        headline="Work with a studio that plans before it produces."
        summary="Start with a consult or compare services to choose the clearest path for your next creative project."
        cta={primaryCta}
        secondaryCta={secondaryCta}
        tone="dark"
      />
    </main>
  );
}
