import styles from "./ContentCollectionSection.module.css";

export default function ContentCollectionSection({
  id,
  eyebrow,
  title,
  description,
  children,
}) {
  return (
    <section id={id} className={styles.section}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2>{title}</h2>
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
