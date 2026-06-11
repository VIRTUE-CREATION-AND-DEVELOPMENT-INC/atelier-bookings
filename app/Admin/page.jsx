import styles from "./admin.module.css";
import { getAdminDashboardContent, metadata } from "./content";

export { metadata };

export default function AdminDashboardPage() {
  const content = getAdminDashboardContent();

  return (
    <div className={styles.dashboard} id="dashboard">
      <section className={styles.hero} aria-labelledby="admin-dashboard-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{content.hero.eyebrow}</p>
          <h1 id="admin-dashboard-title">{content.hero.title}</h1>
          <p>{content.hero.description}</p>
        </div>
        <div className={styles.heroSummary} aria-label="Dashboard scope">
          <strong>Today</strong>
          <span>June 11, 2026</span>
          <small>Mock reporting date</small>
        </div>
      </section>

      <section className={styles.metricsGrid} aria-label="Studio dashboard metrics">
        {content.metrics.map((metric) => (
          <article className={styles.metricCard} key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <p>{metric.meta}</p>
          </article>
        ))}
      </section>

      <section className={styles.dashboardGrid}>
        <article className={`${styles.panel} ${styles.statusPanel}`} aria-labelledby="status-title">
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.eyebrow}>Pipeline</p>
              <h2 id="status-title">Status counts</h2>
            </div>
            <span className={styles.panelBadge}>All inquiries</span>
          </div>

          <div className={styles.statusList}>
            {content.statusCounts.map((status) => (
              <div className={styles.statusRow} key={status.value}>
                <div className={styles.statusLabel}>
                  <span>{status.label}</span>
                  <strong>{status.count}</strong>
                </div>
                <div className={styles.progressTrack} aria-hidden="true">
                  <span style={{ "--status-width": `${status.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className={styles.panel} id="pending" aria-labelledby="pending-title">
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.eyebrow}>Needs review</p>
              <h2 id="pending-title">Pending requests</h2>
            </div>
          </div>

          <div className={styles.requestList}>
            {content.pendingRequests.map((request) => (
              <div className={styles.requestItem} key={request.id}>
                <div>
                  <strong>{request.projectName}</strong>
                  <span>{request.client}</span>
                  <small>{request.service}</small>
                </div>
                <p>{request.value}</p>
              </div>
            ))}
          </div>
        </article>

        <article className={styles.panel} id="dates" aria-labelledby="dates-title">
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.eyebrow}>Calendar watch</p>
              <h2 id="dates-title">Upcoming preferred dates</h2>
            </div>
          </div>

          <div className={styles.dateList}>
            {content.upcomingPreferredDates.map((date) => (
              <div className={styles.dateItem} key={date.id}>
                <time dateTime={date.dateTime}>{date.dateLabel}</time>
                <div>
                  <strong>{date.projectName}</strong>
                  <span>{date.client}</span>
                  <small>
                    {date.service} / {date.status}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className={styles.panel} id="activity" aria-labelledby="activity-title">
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.eyebrow}>Latest movement</p>
              <h2 id="activity-title">Recent activity</h2>
            </div>
          </div>

          <ol className={styles.activityList}>
            {content.recentActivity.map((activity) => (
              <li className={styles.activityItem} key={activity.id}>
                <span aria-hidden="true" />
                <div>
                  <strong>{activity.action}</strong>
                  <p>{activity.projectName}</p>
                  <small>
                    {activity.client} / {activity.timestamp}
                  </small>
                </div>
              </li>
            ))}
          </ol>
        </article>
      </section>
    </div>
  );
}
