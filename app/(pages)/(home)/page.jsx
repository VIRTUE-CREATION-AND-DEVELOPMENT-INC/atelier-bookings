import ContentCollectionSection from "@/app/components/composites/content/ContentCollectionSection";

import { getHomePageContent } from "./content";
import styles from "./page.module.css";

export { metadata } from "./content";

export default async function Home() {
  const content = await getHomePageContent();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>{content.hero.eyebrow}</p>
          <h1>{content.hero.title}</h1>
          <p className={styles.heroDescription}>{content.hero.description}</p>
          <div className={styles.actions} aria-label="Primary actions">
            <a className={styles.primaryAction} href={content.hero.primaryCta.href}>
              {content.hero.primaryCta.label}
            </a>
            <a
              className={styles.secondaryAction}
              href={content.hero.secondaryCta.href}
            >
              {content.hero.secondaryCta.label}
            </a>
          </div>
        </div>
        <ul className={styles.proofList} aria-label="Studio strengths">
          {content.hero.proofPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <ContentCollectionSection {...content.services}>
        <div className={styles.cardGrid}>
          {content.services.items.map((service) => (
            <article className={styles.serviceCard} key={service.id}>
              <p className={styles.cardEyebrow}>{service.eyebrow}</p>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className={styles.metaList} aria-label={`${service.title} details`}>
                {service.meta.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <ul>
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </ContentCollectionSection>

      <ContentCollectionSection {...content.gallery}>
        <div className={styles.galleryGrid}>
          {content.gallery.items.map((item) => (
            <article className={styles.galleryCard} key={item.id}>
              <div className={styles.galleryMedia} aria-hidden="true">
                {item.mediaType}
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </ContentCollectionSection>

      <ContentCollectionSection {...content.testimonials}>
        <div className={styles.quoteGrid}>
          {content.testimonials.items.map((testimonial) => (
            <figure className={styles.quoteCard} key={testimonial.id}>
              <blockquote>{testimonial.quote}</blockquote>
              <figcaption>
                <span>{testimonial.attribution}</span>
                {testimonial.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </ContentCollectionSection>

      <ContentCollectionSection {...content.booking}>
        <div className={styles.optionGroups}>
          {content.booking.groups.map((group) => (
            <article className={styles.optionGroup} key={group.id}>
              <h3>{group.label}</h3>
              <ul>
                {group.options.map((option) => (
                  <li key={option.id}>
                    <span>{option.label}</span>
                    {option.description}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </ContentCollectionSection>

      <ContentCollectionSection {...content.faqs}>
        <div className={styles.faqList}>
          {content.faqs.items.map((faq) => (
            <article className={styles.faqItem} key={faq.id}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </ContentCollectionSection>
    </main>
  );
}
