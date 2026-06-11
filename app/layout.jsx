import "../styles/globals.css";

export const metadata = {
  title: "Atelier Bookings",
  description:
    "Boutique creative studio booking, service discovery, and client project support.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
