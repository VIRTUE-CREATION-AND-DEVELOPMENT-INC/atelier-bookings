import { CONTENT_STATUS } from "./types";

/** @type {import("./types").StudioProfile} */
export const studioProfile = {
  id: "studio-profile-primary",
  status: CONTENT_STATUS.published,
  businessName: "Atelier Bookings",
  shortName: "Atelier",
  slug: "atelier-bookings",
  tagline: "Boutique creative production planned with calm precision.",
  summary:
    "A full-service creative studio for brand sessions, campaign sets, product stories, and private client experiences.",
  serviceArea: "Toronto and destination projects by request",
  primaryCta: {
    label: "Start an Inquiry",
    href: "#booking-options",
  },
  secondaryCta: {
    label: "Explore Services",
    href: "#services",
  },
  seo: {
    title: "Atelier Bookings | Boutique Creative Studio",
    description:
      "Plan brand sessions, campaign productions, and client-facing creative bookings with a boutique studio built for polished service.",
  },
  contact: {
    email: "hello@example.com",
    phone: "+1 000-000-0000",
    instagram: "@atelierbookings",
  },
  values: [
    "Calm production planning",
    "Editorial-quality creative direction",
    "Client-ready booking communication",
    "Organized handoff from inquiry to session",
  ],
  updatedAt: "2026-06-11T00:00:00.000Z",
};

export function getPublicStudioProfile() {
  return studioProfile.status === CONTENT_STATUS.published ? studioProfile : null;
}

export function getAdminStudioProfile() {
  return studioProfile;
}
