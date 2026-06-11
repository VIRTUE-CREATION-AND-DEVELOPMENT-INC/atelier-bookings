import ServiceSelection from "./ServiceSelection.jsx";
import { homePageContent } from "./content.js";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.pageShell}>
      <section className={styles.hero} aria-labelledby="booking-title">
        <div className={styles.heroContent}>
          <p className={styles.kicker}>{homePageContent.eyebrow}</p>
          <h1 id="booking-title">{homePageContent.title}</h1>
          <p className={styles.heroIntro}>{homePageContent.intro}</p>
        </div>

        <div className={styles.expectationCard} aria-label="Booking flow expectations">
          <p>Before you inquire</p>
          <ul>
            {homePageContent.expectations.map((expectation) => (
              <li key={expectation}>{expectation}</li>
            ))}
          </ul>
        </div>
      </section>

      <ServiceSelection content={homePageContent} />
    </main>
  );
}
