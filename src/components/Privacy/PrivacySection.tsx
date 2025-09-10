import React from 'react';
import { ProcessedBannerData } from '@/lib/types/banner.types';
import { bannerTranslationService } from '@/API/Services/banner.service';
import BannerContent from '@/components/ui/BannerContent';
import PrivacyContent from '@/components/Privacy/PrivacyContent';

interface BannerSectionProps {
  searchParams: { lang?: string };
}

const PrivacySection = async ({ searchParams }: BannerSectionProps) => {
  const currentLanguage = searchParams.lang || 'en';

  let banners: ProcessedBannerData[] = [];
  let error: string | null = null;

  try {
    const [privacyBanners, privacyContentBanners] = await Promise.all([
      bannerTranslationService.getBannersByType(currentLanguage, "privacy"),
      bannerTranslationService.getBannersByType(currentLanguage, "privacy_content"),
    ]);

    banners = [...privacyBanners, ...privacyContentBanners];

    if (banners.length === 0) {
      error = 'No banner data available';
    }
  } catch (err) {
    error = err instanceof Error ? err.message : 'An error occurred';
    console.error('Error fetching banner data:', err);
  }

  if (error) {
    return (
      <div className="flex mt-[99px] mb-[149px] w-full items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  const privacyBanners = banners.filter(b => b.type === "privacy");
  let privacyContentBanners = banners.filter(b => b.type === "privacy_content");
  privacyContentBanners = privacyContentBanners.slice().sort((a, b) => {
    const parseSection = (title: string) => {
      const match = title?.trim().match(/^(\d+(?:\.\d+)?)/);
      if (!match) return [Infinity];
      return match[1].split('.').map(Number);
    };
    const aSec = parseSection(a.title);
    const bSec = parseSection(b.title);
    for (let i = 0; i < Math.max(aSec.length, bSec.length); i++) {
      const aVal = aSec[i] ?? 0;
      const bVal = bSec[i] ?? 0;
      if (aVal !== bVal) return aVal - bVal;
    }
    return aSec.length - bSec.length;
  });

  return (
    <div>
      {privacyBanners.map((banner, index) => (
        <BannerContent
          key={banner.id || index}
          bannerData={banner}
          currentLanguage={currentLanguage}
          index={index}
          imageClassName='hidden'
          className={index === 0 ? "text-center w-max mx-auto" : ""}
          titleClassName={"text-white text-center leading-[120%] text-[32px] sm:w-[819px] w-[343px] sm:text-[42px] font-[euclid-Bold] mb-3 text-center"}
          descriptionClassName={"text-[#FFFFFFB2] text-[14px] mx-auto sm:w-[819px] w-[343px] text-center"}
          sloganClassName='text-center'
        />
      ))}
      {privacyContentBanners.map((banner, index) => (
        <PrivacyContent
          key={banner.id || index}
          bannerData={banner}
          currentLanguage={currentLanguage}
          index={index}
        />
      ))}
    </div>
  );
};

export default PrivacySection;
