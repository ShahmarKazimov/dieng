import React from 'react';
import { ProcessedBannerData } from '@/lib/types/banner.types';
import { bannerTranslationService } from '@/API/Services/banner.service';
import BannerContent from '@/components/ui/BannerContent';

interface BannerSectionProps {
  searchParams: { lang?: string };
}

const ProductSection = async ({ searchParams }: BannerSectionProps) => {
  const currentLanguage = searchParams.lang || 'en';

  let banners: ProcessedBannerData[] = [];
  let error: string | null = null;

  try {
    const data = await bannerTranslationService.getBannersByType(currentLanguage, "products");
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
          className="text-center w-max mx-auto"
          titleClassName="text-[#000000] leading-[120%] text-[32px] sm:text-[42px] text-center font-[euclid-Bold] mb-3"
          descriptionClassName="text-[#FFFFFFB2] text-sm text-center mx-auto sm:w-[564px] w-[343px]"
          sloganClassName="text-green-600 text-[14px] text-center"
          imageClassName="hidden"
          buttonClassName="cursor-pointer bg-white px-9 text-black"
          buttonGroupClassName='flex sm:flex-row flex-col w-max mx-auto'
        />
      ))}
    </div>
  );
};

export default ProductSection;
