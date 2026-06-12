import "../styles/globals.css";

const siteOrigin = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
  /\/+$/,
  "",
);

export const metadata = {
  metadataBase: new URL(siteOrigin),
  applicationName: "Atelier Bookings",
  title: "Atelier Bookings",
  description:
    "Boutique creative studio booking, service discovery, and client project support.",
  openGraph: {
    type: "website",
    siteName: "Atelier Bookings",
    title: "Atelier Bookings",
    description:
      "Boutique creative studio booking, service discovery, and client project support.",
  },
  twitter: {
    card: "summary",
    title: "Atelier Bookings",
    description:
      "Boutique creative studio booking, service discovery, and client project support.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
