import {
  getCallToActionById,
  getPublishedFaqs,
  getPublishedServices,
  getPublishedTestimonials,
  publicPageContent,
} from "@/lib/content/public-content";

const servicesPage = publicPageContent.services;

export const metadata = servicesPage.metadata;

export function getServicesPageContent() {
  const primaryCta = getCallToActionById(servicesPage.hero.primaryCtaId);
  const secondaryCta = getCallToActionById(servicesPage.hero.secondaryCtaId);

  return {
    page: servicesPage,
    services: getPublishedServices().map((service) => ({
      ...service,
      cta: getCallToActionById(service.bookingCtaId) || primaryCta,
    })),
    testimonials: getPublishedTestimonials(),
    faqs: getPublishedFaqs().slice(0, 3),
    primaryCta,
    secondaryCta,
  };
}
