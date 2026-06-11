import React from "react";
import Link from "next/link";
import CtaBand from "@/app/components/public/CtaBand";
import CtaLink from "@/app/components/public/CtaLink";
import SectionIntro from "@/app/components/public/SectionIntro";
import { getGalleryPageContent } from "./content";
import styles from "./page.module.css";

export { metadata } from "./content";

const galleryColors = [
  ["var(--color-soft)", "var(--color-accent)"],
  ["var(--color-accent-soft)", "var(--color-clay)"],
  ["var(--color-surface)", "var(--color-accent-strong)"],
  ["var(--color-paper)", "var(--color-muted)"],
];

export default function GalleryPage() {
  const { page, galleryItems, services, testimonials, primaryCta, secondaryCta } =
    getGalleryPageContent();

  return (
    <main className={`public-main ${styles.page}`}>
      <section className={styles.hero} aria-labelledby="gallery-hero-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{page.hero.eyebrow}</p>
          <h1 id="gallery-hero-title">{page.hero.headline}</h1>
          <p>{page.hero.summary}</p>
          <div className={styles.heroActions}>
            {primaryCta && <CtaLink {...primaryCta} intent="primary" />}
            {secondaryCta && <CtaLink {...secondaryCta} intent="secondary" />}
          </div>
        </div>

        <aside className={styles.heroPanel} aria-label="Gallery content model">
          <span>CMS-ready fields</span>
          <ul>
            <li>Service relationship</li>
            <li>Category and palette notes</li>
            <li>Image alt text</li>
            <li>Stable display order</li>
          </ul>
        </aside>
      </section>

      <section className={styles.gallery} aria-label="Portfolio studies">
        <SectionIntro
          eyebrow={page.eyebrow}
          headline={page.headline}
          summary={page.summary}
          align="center"
        />

        <div className={styles.galleryGrid}>
          {galleryItems.map((item, index) => {
            const palette = galleryColors[index % galleryColors.length];

            return (
              <figure className={styles.galleryCard} key={item.id}>
                <div
                  className={styles.galleryImage}
                  role="img"
                  aria-label={item.image.alt}
                  style={{
                    "--item-ratio": item.image.aspectRatio,
                    "--item-primary": palette[0],
                    "--item-secondary": palette[1],
                    "--item-angle": `${index * 10 + 16}deg`,
                  }}
                >
                  <span />
                </div>
                <figcaption>
                  <p className={styles.cardEyebrow}>{item.category}</p>
                  <h2>{item.title}</h2>
                  <p>
                    Connected to{" "}
                    <Link href={`/services#${item.serviceSlug}`}>
                      {item.service?.title || "a studio service"}
                    </Link>
                    .
                  </p>
                  <ul className={styles.paletteList} aria-label={`${item.title} palette`}>
                    {item.image.palette.map((color) => (
                      <li key={color}>{color}</li>
                    ))}
                  </ul>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </section>

      <section className={styles.curation} aria-labelledby="gallery-curation-title">
        <div>
          <p className={styles.eyebrow}>{page.curation.eyebrow}</p>
          <h2 id="gallery-curation-title">{page.curation.headline}</h2>
          <p>{page.curation.summary}</p>
        </div>

        <div className={styles.serviceList}>
          {services.map((service, index) => {
            const count = galleryItems.filter((item) => item.serviceSlug === service.slug).length;

            return (
              <article key={service.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <Link href={`/services#${service.slug}`}>
                  {count || "New"} related {count === 1 ? "study" : "studies"}
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.proof} aria-label="Gallery social proof">
        <SectionIntro
          eyebrow={page.proof.eyebrow}
          headline={page.proof.headline}
          summary={page.proof.summary}
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
        headline="Seen a direction close to what you need?"
        summary="Start with the inquiry path or compare services before sharing project details."
        cta={primaryCta}
        secondaryCta={secondaryCta}
        tone="dark"
      />
    </main>
  );
}
