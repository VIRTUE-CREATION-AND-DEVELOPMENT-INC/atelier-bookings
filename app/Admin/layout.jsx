import Link from "next/link";

import styles from "./admin.module.css";

const navItems = [
  { href: "#dashboard", label: "Dashboard" },
  { href: "#pending", label: "Pending" },
  { href: "#dates", label: "Preferred dates" },
  { href: "#activity", label: "Activity" },
];

export default function AdminLayout({ children }) {
  return (
    <div className={styles.adminRoot}>
      <a className={styles.skipLink} href="#admin-main">
        Skip to dashboard
      </a>

      <div className={styles.shell}>
        <header className={styles.topbar}>
          <Link className={styles.brand} href="/" aria-label="Atelier Bookings home">
            <span className={styles.brandMark} aria-hidden="true">
              AB
            </span>
            <span>
              <strong>Atelier Bookings</strong>
              <small>Studio admin mock</small>
            </span>
          </Link>

          <p className={styles.demoNotice}>
            Demo surface only. No authentication or production data is connected.
          </p>
        </header>

        <aside className={styles.sidebar} aria-label="Admin sections">
          <div className={styles.sidebarHeader}>
            <span>Admin</span>
            <strong>Booking management</strong>
          </div>
          <nav className={styles.navList} aria-label="Dashboard navigation">
            {navItems.map((item) => (
              <a className={styles.navLink} href={item.href} key={item.href}>
                <span aria-hidden="true" />
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        <main className={styles.content} id="admin-main">
          {children}
        </main>
      </div>
    </div>
  );
}
