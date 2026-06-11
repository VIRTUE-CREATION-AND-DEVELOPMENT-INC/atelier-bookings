import React from "react";
import {
  getCallToActionById,
  getPublishedServices,
  publicNavigation,
  studioProfile,
} from "@/lib/content/public-content";
import PublicFooter from "./PublicFooter";
import PublicHeader from "./PublicHeader";

export default function PublicLayout({ children }) {
  const primaryCta = getCallToActionById("cta-book-consultation");
  const services = getPublishedServices();

  return (
    <>
      <PublicHeader
        navigation={publicNavigation}
        profile={studioProfile}
        primaryCta={primaryCta}
      />
      {children}
      <PublicFooter
        navigation={publicNavigation}
        profile={studioProfile}
        primaryCta={primaryCta}
        services={services}
      />
    </>
  );
}
