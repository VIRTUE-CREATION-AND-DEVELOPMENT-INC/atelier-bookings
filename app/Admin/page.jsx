import { getAdminDashboardContent } from "./content";
import styles from "./page.module.css";

export const metadata = {
  title: "Booking Management",
};

export default async function AdminPage() {
  const content = await getAdminDashboardContent();
  const hasRows = content.rows.length > 0;

  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Admin</p>
          <h1>{content.title}</h1>
          <p>{content.description}</p>
        </div>
      </section>

      <section className={styles.summaryGrid} aria-label="Booking summary">
        {content.summaryCards.map((item) => (
          <article className={styles.summaryCard} key={item.id}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </section>

      <section className={styles.inquiries} aria-labelledby="booking-inquiries">
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.eyebrow}>Inquiries</p>
            <h2 id="booking-inquiries">Client booking pipeline</h2>
          </div>
        </div>

        {hasRows ? (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {content.columns.map((column) => (
                    <th key={column.id} scope="col">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {content.rows.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <span className={styles.primaryText}>{row.clientName}</span>
                      <span>{row.clientEmail}</span>
                      <span>Submitted {row.submittedAtLabel}</span>
                    </td>
                    <td>
                      <span className={styles.primaryText}>{row.serviceLabel}</span>
                      <span>{row.budgetLabel}</span>
                      <span>{row.optionLabels.join(" / ")}</span>
                    </td>
                    <td>
                      <span className={styles.statusBadge}>{row.statusLabel}</span>
                    </td>
                    <td>{row.requestedDateLabel}</td>
                    <td>
                      <span className={styles.primaryText}>{row.nextAction}</span>
                      <span>{row.internalNote}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h3>{content.emptyState.title}</h3>
            <p>{content.emptyState.description}</p>
          </div>
        )}
      </section>
    </main>
  );
}
