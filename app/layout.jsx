import "../styles/globals.css";

import { getPublicStudioProfile } from "@/lib/content";

const profile = getPublicStudioProfile();

export const metadata = {
  title: {
    default: profile.seo.title,
    template: `%s | ${profile.businessName}`,
  },
  description: profile.seo.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
