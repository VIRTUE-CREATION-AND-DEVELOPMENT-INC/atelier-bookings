import React from "react";
import CtaBand from "@/app/components/public/CtaBand";
import CtaLink from "@/app/components/public/CtaLink";
import SectionIntro from "@/app/components/public/SectionIntro";
import { getContactPageContent } from "./content";
import styles from "./page.module.css";

export { metadata } from "./content";

export default function ContactPage() {
  const { page, channels, primaryCta, secondaryCta } = getContactPageContent();

  return (
    <main className={`public-main ${styles.page}`}>
      <section className={styles.hero} aria-labelledby="contact-hero-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{page.hero.eyebrow}</p>
          <h1 id="contact-hero-title">{page.hero.headline}</h1>
          <p>{page.hero.summary}</p>
          <div className={styles.heroActions}>
            {primaryCta && <CtaLink {...primaryCta} intent="primary" />}
            {secondaryCta && <CtaLink {...secondaryCta} intent="secondary" />}
          </div>
        </div>

        <aside className={styles.contactPanel} aria-label="Contact posture">
          <span>Internal inquiry first</span>
          <p>
            The public site can route visitors into booking context without
            depending on external calendars, payment links, or contact services.
          </p>
        </aside>
      </section>

      <section className={styles.channels} aria-label="Contact inquiry paths">
        <SectionIntro
          eyebrow={page.channels.eyebrow}
          headline={page.channels.headline}
          align="center"
        />

        <div className={styles.channelGrid}>
          {channels.map((channel, index) => (
            <article key={channel.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{channel.title}</h2>
              <p>{channel.summary}</p>
              {channel.cta && (
                <CtaLink
                  {...channel.cta}
                  intent={channel.cta.intent || "secondary"}
                />
              )}
            </article>
          ))}
        </div>
      </section>

      <section className={styles.prep} aria-labelledby="contact-prep-title">
        <div>
          <p className={styles.eyebrow}>{page.prep.eyebrow}</p>
          <h2 id="contact-prep-title">{page.prep.headline}</h2>
        </div>

        <ul className={styles.prepList}>
          {page.prep.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.response} aria-labelledby="contact-response-title">
        <div className={styles.responseCard}>
          <p className={styles.eyebrow}>{page.response.eyebrow}</p>
          <h2 id="contact-response-title">{page.response.headline}</h2>
          <p>{page.response.summary}</p>
        </div>
      </section>

      <CtaBand
        eyebrow="Booking"
        headline="Ready to send the project details?"
        summary="Start the inquiry path from here, or use a consult if the idea still needs structure."
        cta={primaryCta}
        secondaryCta={secondaryCta}
        tone="dark"
      />
    </main>
  );
}
