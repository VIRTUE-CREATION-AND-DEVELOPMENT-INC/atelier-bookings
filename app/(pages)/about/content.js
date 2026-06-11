import {
  getCallToActionById,
  getPublishedTestimonials,
  publicPageContent,
  studioProfile,
} from "@/lib/content/public-content";

const aboutPage = publicPageContent.about;

export const metadata = aboutPage.metadata;

export function getAboutPageContent() {
  const primaryCta = getCallToActionById(aboutPage.hero.primaryCtaId);
  const secondaryCta = getCallToActionById(aboutPage.hero.secondaryCtaId);

  return {
    page: aboutPage,
    profile: studioProfile,
    testimonials: getPublishedTestimonials(),
    primaryCta,
    secondaryCta,
  };
}
