import React from 'react';
import { ProcessedBannerData } from '@/lib/types/banner.types';
import { bannerTranslationService } from '@/API/Services/banner.service';
import BannerContent from '@/components/ui/BannerContent';

interface BannerSectionProps {
  searchParams: { lang?: string };
}

const HomeBannerSection = async ({ searchParams }: BannerSectionProps) => {
  const currentLanguage = searchParams.lang || 'en';

  let banners: ProcessedBannerData[] = [];
  let error: string | null = null;

  try {
    const data = await bannerTranslationService.getBannersByType(currentLanguage, "homepage");
    if (data.length > 0) {
      banners = data;
    } else {
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

  return (
    <div className="absolute top-60 left-0 w-full  flex items-center justify-center z-10">
      {banners.map((banner, index) => (
        <BannerContent
          key={banner.id || index}
          bannerData={banner}
          currentLanguage={currentLanguage}
          index={index}
          imageClassName="hidden"
          titleClassName="text-center text-[42px] sm:text-[52px] "
          descriptionClassName="text-center mx-auto text-[#FFFFFFB2] justify-center"
          sloganClassName="text-center"
          className="custom-banner-content max-w-[667px] mx-auto"
          buttonGroupClassName="justify-center"
          buttonClassName="[&_img]:hidden" 
        />
      ))}
    </div>
  );
};

export default HomeBannerSection;
