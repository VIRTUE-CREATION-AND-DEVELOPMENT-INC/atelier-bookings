import { CONTENT_STATUS } from "./types";
import { findById, listAdminVisible, listByIds, listPublished } from "./utils";

/** @type {import("./types").GalleryItem[]} */
export const galleryItems = [
  {
    id: "gallery-brand-table",
    status: CONTENT_STATUS.published,
    title: "Founder session planning table",
    alt: "A studio planning table with a laptop, printed references, and a neutral palette.",
    mediaType: "image",
    imageUrl: "/gallery/brand-session-planning.jpg",
    serviceIds: ["service-brand-session"],
    featured: true,
    sortOrder: 10,
    updatedAt: "2026-06-11T00:00:00.000Z",
  },
  {
    id: "gallery-portrait-set",
    status: CONTENT_STATUS.published,
    title: "Editorial portrait setup",
    alt: "A minimal studio portrait set with soft lighting and a warm backdrop.",
    mediaType: "image",
    imageUrl: "/gallery/editorial-portrait-set.jpg",
    serviceIds: ["service-brand-session", "service-client-experience"],
    featured: true,
    sortOrder: 20,
    updatedAt: "2026-06-11T00:00:00.000Z",
  },
  {
    id: "gallery-campaign-wall",
    status: CONTENT_STATUS.published,
    title: "Campaign direction wall",
    alt: "Campaign references arranged on a wall for a boutique production.",
    mediaType: "image",
    imageUrl: "/gallery/campaign-direction-wall.jpg",
    serviceIds: ["service-campaign-production"],
    featured: true,
    sortOrder: 30,
    updatedAt: "2026-06-11T00:00:00.000Z",
  },
  {
    id: "gallery-product-scene",
    status: CONTENT_STATUS.published,
    title: "Product story set",
    alt: "A product story scene styled with editorial props and studio lighting.",
    mediaType: "image",
    imageUrl: "/gallery/product-story-set.jpg",
    serviceIds: ["service-campaign-production"],
    featured: false,
    sortOrder: 40,
    updatedAt: "2026-06-11T00:00:00.000Z",
  },
  {
    id: "gallery-client-lounge",
    status: CONTENT_STATUS.published,
    title: "Client arrival lounge",
    alt: "A quiet client lounge prepared for a private creative appointment.",
    mediaType: "image",
    imageUrl: "/gallery/client-arrival-lounge.jpg",
    serviceIds: ["service-client-experience"],
    featured: true,
    sortOrder: 50,
    updatedAt: "2026-06-11T00:00:00.000Z",
  },
  {
    id: "gallery-detail-tray",
    status: CONTENT_STATUS.published,
    title: "Session detail tray",
    alt: "A styling tray with accessories and printed booking notes.",
    mediaType: "image",
    imageUrl: "/gallery/session-detail-tray.jpg",
    serviceIds: ["service-client-experience"],
    featured: false,
    sortOrder: 60,
    updatedAt: "2026-06-11T00:00:00.000Z",
  },
];

export function listPublicGalleryItems() {
  return listPublished(galleryItems);
}

export function listFeaturedGalleryItems() {
  return listPublicGalleryItems().filter((item) => item.featured);
}

export function listAdminGalleryItems() {
  return listAdminVisible(galleryItems);
}

export function listGalleryItemsByIds(ids) {
  return listByIds(listPublicGalleryItems(), ids);
}

export function getGalleryItemById(id) {
  return findById(galleryItems, id);
}
