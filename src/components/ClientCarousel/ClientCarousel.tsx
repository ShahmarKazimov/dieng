import React from "react";
import Image from "next/image"; 
import { clientService } from "@/API/Services/clients.service";
import { Client } from "@/lib/types/client.types";
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

  const duplicatedClients = [...clients, ...clients, ...clients];

  return (
    <div className="py-0 sm:py-25 mb-0">
      <h1 className="text-white text-[16px] mb-[50px] text-center">
        {t("our-customers", "Our customers")}
      </h1>
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
