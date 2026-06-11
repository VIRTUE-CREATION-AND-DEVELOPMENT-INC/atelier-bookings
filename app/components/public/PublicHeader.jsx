import React from "react";
import Link from "next/link";
import CtaLink from "./CtaLink";
import styles from "./public.module.css";

export default function PublicHeader({ navigation, profile, primaryCta }) {
  const primaryNav = navigation.filter((item) => item.id !== "nav-booking");

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.brandLockup} aria-label={`${profile.name} home`}>
          <span className={styles.brandMark}>AB</span>
          <span>
            <strong>{profile.name}</strong>
            <small>{profile.eyebrow}</small>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Primary navigation">
          {primaryNav.map((item) => (
            <Link key={item.id} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        {primaryCta && (
          <CtaLink
            href={primaryCta.href}
            label={primaryCta.label}
            intent="primary"
            className={styles.headerCta}
          />
        )}
      </div>
    </header>
  );
}
