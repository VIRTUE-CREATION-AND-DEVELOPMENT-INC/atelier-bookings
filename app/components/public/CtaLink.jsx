import React from "react";
import Link from "next/link";
import styles from "./public.module.css";

export default function CtaLink({
  href,
  label,
  intent = "secondary",
  className = "",
}) {
  const intentClass = styles[`ctaLink_${intent}`] || styles.ctaLink_secondary;

  return (
    <Link
      href={href}
      className={`${styles.ctaLink} ${intentClass} ${className}`.trim()}
    >
      <span>{label}</span>
    </Link>
  );
}
