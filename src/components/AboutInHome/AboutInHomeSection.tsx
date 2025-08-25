import React from 'react';
import { ProcessedBannerData } from '@/lib/types/banner.types';
import { bannerTranslationService } from '@/API/Services/banner.service';
import BannerContent from '@/components/ui/BannerContent';

interface BannerSectionProps {
  searchParams: { lang?: string };
}

const AboutBannerSection = async ({ searchParams }: BannerSectionProps) => {
  const currentLanguage = searchParams.lang || 'en';

  let banners: ProcessedBannerData[] = [];
  let error: string | null = null;

  try {
    const data = await bannerTranslationService.getBannersByType(currentLanguage, 'partners');
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
    <div>
      {banners.map((banner, index) => (
        <BannerContent
          key={banner.id || index}
          bannerData={banner}
          currentLanguage={currentLanguage}
          index={index}
          titleClassName='text-[32px] sm:text-[42px] text-center sm:text-start'
          sloganClassName='text-center sm:text-start'
          descriptionClassName='text-center sm:text-start'
          buttonGroupClassName='[&>a:nth-child(2)]:bg-transparent [&>a:nth-child(2)]:text-white [&>a:nth-child(2)]:border [&>a:nth-child(2)]:border-white [&>a:nth-child(2)]:hover:bg-white [&>a:nth-child(2)]:hover:text-black'
        />
      ))}
    </div>
  );
};

export default AboutBannerSection;
