import {
  getCallToActionById,
  getPublishedGalleryItems,
  getPublishedServices,
  getPublishedTestimonials,
  getServiceBySlug,
  publicPageContent,
} from "@/lib/content/public-content";

const galleryPage = publicPageContent.gallery;

export const metadata = galleryPage.metadata;

export function getGalleryPageContent() {
  const primaryCta = getCallToActionById(galleryPage.hero.primaryCtaId);
  const secondaryCta = getCallToActionById(galleryPage.hero.secondaryCtaId);

  return {
    page: galleryPage,
    galleryItems: getPublishedGalleryItems().map((item) => ({
      ...item,
      service: getServiceBySlug(item.serviceSlug),
    })),
    services: getPublishedServices(),
    testimonials: getPublishedTestimonials(),
    primaryCta,
    secondaryCta,
  };
}
