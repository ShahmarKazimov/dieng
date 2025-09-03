import React from "react";
import Image from "next/image";
import { clientService } from "@/API/Services/clients.service";
import { bannerTranslationService } from "@/API/Services/banner.service";
import { Client } from "@/lib/types/client.types";
import { ProcessedBannerData } from "@/lib/types/banner.types";
import BannerContent from "@/components/ui/BannerContent";
import enTranslations from "@/locales/en.json";
import deTranslations from "@/locales/de.json";

const localTranslationsMap = {
  en: enTranslations,
  de: deTranslations,
};

interface ClientCarouselProps {
  searchParams?: { lang?: string };
}

const ClientCarousel = async ({ searchParams }: ClientCarouselProps) => {
  const lang = searchParams?.lang || "en";
  const translations =
    localTranslationsMap[lang as "en" | "de"] || localTranslationsMap["en"];
  const t = (key: string, fallback?: string) =>
    (translations as Record<string, string>)[key] || fallback || key;

  let clients: Client[] = [];
  let banners: ProcessedBannerData[] = [];

  try {
    const response = await clientService.getClients();
    if (response.success) {
      clients = response.data;
    } else {
      console.error("Failed to fetch clients:", response.message);
    }
  } catch (error) {
    console.error("Error fetching clients:", error);
  }

  try {
    banners = await bannerTranslationService.getBannersByType(lang, "clients");
  } catch (error) {
    console.error("Error fetching client banners:", error);
  }

  const duplicatedClients = [...clients, ...clients, ...clients];

  return (
    <div className="py-20 sm:py-25 mb-0">
      {banners.length > 0 && (
        <BannerContent
          bannerData={banners[0]}
          currentLanguage={lang}
          index={0}
          titleClassName="text-white text-[24px] mb-4 sm:text-[32px] text-center"
          descriptionClassName="text-center  max-w-[691px] text-sm text-[#FFFFFFB2] mb-4"
          sloganClassName="text-center text-white"
          className="text-center mb-4 sm:mb-10 sm:w-max mx-auto"
          imageClassName="hidden"
          buttonGroupClassName="hidden"
        />
      )}
      {banners.length === 0 && (
        <h1 className="text-white text-[16px] mb-[50px] text-center">
          {t("our-customers", "Our customers")}
        </h1>
      )}
      <div className="clients">
        <div className="client_items flex gap-4">
          {duplicatedClients.map((client, index) => (
            <a
              key={`client-${index}`}
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <div className="w-[156px] h-[100px] relative">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${client.photo}`}
                  alt={client.name}
                  fill
                  priority
                  sizes="156px"
                  className="object-contain"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientCarousel;
