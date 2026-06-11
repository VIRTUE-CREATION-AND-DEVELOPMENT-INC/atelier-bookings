import React from "react";
import CtaLink from "./CtaLink";
import styles from "./public.module.css";

export default function CtaBand({
  eyebrow,
  headline,
  summary,
  cta,
  secondaryCta,
  tone = "light",
}) {
  const toneClass = styles[`ctaBand_${tone}`] || styles.ctaBand_light;

  return (
    <section className={`${styles.ctaBand} ${toneClass}`}>
      <div className={styles.ctaBandContent}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h2>{headline}</h2>
        {summary && <p>{summary}</p>}
      </div>
      <div className={styles.ctaBandActions}>
        {cta && <CtaLink {...cta} intent={cta.intent || "primary"} />}
        {secondaryCta && (
          <CtaLink {...secondaryCta} intent={secondaryCta.intent || "secondary"} />
        )}
      </div>
    </section>
  );
}
