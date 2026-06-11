import React from "react";
import Link from "next/link";
import CtaLink from "./CtaLink";
import styles from "./public.module.css";

export default function PublicFooter({
  navigation,
  profile,
  primaryCta,
  services = [],
}) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerMain}>
        <section className={styles.footerBrand}>
          <Link href="/" className={styles.brandLockup} aria-label={`${profile.name} home`}>
            <span className={styles.brandMark}>AB</span>
            <span>
              <strong>{profile.name}</strong>
              <small>{profile.eyebrow}</small>
            </span>
          </Link>
          <p>{profile.summary}</p>
          {primaryCta && <CtaLink {...primaryCta} intent="primary" />}
        </section>

        <nav className={styles.footerColumn} aria-label="Footer navigation">
          <h2>Explore</h2>
          {navigation.map((item) => (
            <Link key={item.id} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <section className={styles.footerColumn}>
          <h2>Services</h2>
          {services.map((service) => (
            <Link key={service.id} href={`/services#${service.slug}`}>
              {service.title}
            </Link>
          ))}
        </section>

        <section className={styles.footerColumn}>
          <h2>Studio Notes</h2>
          <p>{profile.intro}</p>
        </section>
      </div>

      <div className={styles.footerBar}>
        <small>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </small>
        <small>Creative direction, production planning, and booking support.</small>
      </div>
    </footer>
  );
}
