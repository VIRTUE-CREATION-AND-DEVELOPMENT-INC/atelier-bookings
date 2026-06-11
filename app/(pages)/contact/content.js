import {
  getCallToActionById,
  publicPageContent,
} from "@/lib/content/public-content";

const contactPage = publicPageContent.contact;

export const metadata = contactPage.metadata;

export function getContactPageContent() {
  const primaryCta = getCallToActionById(contactPage.hero.primaryCtaId);
  const secondaryCta = getCallToActionById(contactPage.hero.secondaryCtaId);

  return {
    page: contactPage,
    channels: contactPage.channels.items.map((item) => ({
      ...item,
      cta: getCallToActionById(item.ctaId),
    })),
    primaryCta,
    secondaryCta,
  };
}
