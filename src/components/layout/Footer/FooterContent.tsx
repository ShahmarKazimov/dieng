"use client";

import React, { Suspense } from "react";

import AppDownloadButtons from "@/components/layout/Footer/FooterButtons";
import FooterLogo from "../Footer/FooterLogo";
import { FooterSection } from "@/components/layout/Footer/FooterSection";
import { LocationInfo } from "@/components/layout/Footer/LocationInfo";
import { SocialLinks } from "@/components/layout/Footer/SocialLinks";
import deTranslations from "@/locales/de.json";
import enTranslations from "@/locales/en.json";
import { useSearchParams } from "next/navigation";

const localTranslationsMap = {
  en: enTranslations,
  de: deTranslations,
};

const FooterContent = () => {
  const searchParams = useSearchParams();
  const currentLang = searchParams.get("lang") || "en";

  const translations = localTranslationsMap[currentLang as "en" | "de"] || localTranslationsMap["en"];
  const t = (key: string, fallback?: string) => (translations as Record<string, string>)[key] || fallback || key;

  return (
    <footer className="bg-[#F5F6FA] pt-25 pb-6">
      <div className="relative max-w-[78.5rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          <div className="lg:col-span-1">
            <FooterLogo />
            <p className="text-[#000000B2] text-center sm:text-start px-8 sm:px-0 leading-[110%] text-[12px] mt-4">
              {t(
                "description",
                "Stay informed about digital solutions, product innovations, and AI-based developments in forestry."
              )}
            </p>
          </div>

          <div className="lg:col-span-1 flex justify-center text-center sm:text-start sm:justify-end">
            <FooterSection
              title={t("about_us", "About us")}
              links={[
                { href: "/products", text: t("productsAndSolutions") },
                { href: "/services", text: t("services") },
                { href: "/news-blog", text: t("newsBlog") },
                { href: "/modules", text: t("moduleOverview") },
                { href: "/contact", text: t("contact") },
              ]}
            />
          </div>

          <div className="lg:col-span-1 flex justify-center text-center sm:text-start sm:justify-end">
            <FooterSection
              title={t("support", "Support")}
              links={[
                { href: "mailto:support@wood-in-vision.com", text: t("supportWoodInVision", "support@wood-in-vision.com") },
                { href: "/privacy", text: t("privacyPolicy") },
                { href: "/terms", text: t("terms") },
                // { href: "/help-faq", text: t("helpFaq") },
              ]}
            />
          </div>

          <div className="lg:col-span-1 flex flex-col items-center sm:items-end">
            <h4 className="font-[euclid-Bold] text-[#0E0E0E] mb-3 relative sm:right-8">{t("download", "Download")}</h4>
            <Suspense fallback={<div>Loading...</div>}>
              <AppDownloadButtons />
            </Suspense>
          </div>
        </div>

        <div className="sm:mt-25 mt-20 flex flex-col gap-y-4 md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-xs text-[#000000] order-3 sm:order-1 mb-0">
            {t("copyright", "Copyright, All Right Are Reserved ©2025, WOOD.IN.VISION")}
          </div>

          <div className="order-1 sm:order-2 m-0">
            <SocialLinks />
          </div>

          <div className="order-2 sm:order-3">
            <LocationInfo />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterContent;
