import React from "react";
import styles from "./public.module.css";

export default function SectionIntro({
  eyebrow,
  headline,
  summary,
  align = "start",
  className = "",
}) {
  const alignClass = styles[`sectionIntro_${align}`] || styles.sectionIntro_start;

  return (
    <div className={`${styles.sectionIntro} ${alignClass} ${className}`.trim()}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2>{headline}</h2>
      {summary && <p>{summary}</p>}
    </div>
  );
}
