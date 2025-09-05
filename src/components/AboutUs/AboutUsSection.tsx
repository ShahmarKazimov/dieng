import React from 'react';
import { ProcessedBannerData } from '@/lib/types/banner.types';
import { bannerTranslationService } from '@/API/Services/banner.service';
import BannerContent from '@/components/ui/BannerContent';

interface BannerSectionProps {
  searchParams: { lang?: string };
}

const AboutUsBannerSection = async ({ searchParams }: BannerSectionProps) => {
  const currentLanguage = searchParams.lang || 'en';

  let banners: ProcessedBannerData[] = [];
  let about_technology: ProcessedBannerData[] = [];
  let error: string | null = null;

  try {
    const aboutUsData = await bannerTranslationService.getBannersByType(currentLanguage, 'aboutUs');
    if (aboutUsData.length > 0) {
      banners = aboutUsData;
    }

    const about_technologyData = await bannerTranslationService.getBannersByType(currentLanguage, 'about_technology');
    if (about_technologyData.length > 0) {
      about_technology = about_technologyData;
    }

    if (banners.length === 0 && about_technology.length === 0) {
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

  // Sort banners by a numeric prefix in title (if present)
  const sortedBanners = banners.slice().sort((a, b) => {
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

  // Swap elements as requested
  interface SwapElementsFn {
    (arr: ProcessedBannerData[], a: number, b: number): void;
  }

  const swapElements: SwapElementsFn = (arr, a, b) => {
    const temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
  };
  [[0, 3], [1, 2]].forEach(([a, b]) => swapElements(sortedBanners, a, b));

  return (
    <div>
      {/* about_technology Section */}
      {about_technology.length > 0 && (
        <div className='py-20 sm:py-25 relative'>
          <div
            className="absolute inset-0 bg-[#F5F6FA]"
            style={{
              left: '50%',
              right: '50%',
              marginLeft: '-50.5vw',
              marginRight: '-50vw',
              width: '100vw'
            }}
          />
          {about_technology.map((banner, index) => (
            <BannerContent
              key={banner.id || index}
              bannerData={banner}
              currentLanguage={currentLanguage}
              index={index}
              titleClassName='text-[24px] max-w-[483px] sm:text-[32px] text-black text-center sm:text-start'
              descriptionClassName='text-center max-w-[547px] sm:text-start text-gray-500'
              imageClassName='sm:w-[593px] sm:h-[440px] w-full h-auto'
              buttonGroupClassName='sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2 flex justify-center sm:justify-end mt-4 sm:mt-0'
              className='relative gap-y-[50px] items-start'
            />
          ))}
        </div>
      )}
      <div className="w-full flex flex-col gap-y-[70px] py-20 sm:py-25">
        {sortedBanners.map((banner, index) => {
          if (index === 0) {
            return (
              <BannerContent
                key={banner.id || index}
                bannerData={{ ...banner, photo: '' }}
                currentLanguage={currentLanguage}
                className="items-center text-center  px-4 sm:px-0 sm:w-max mx-auto absolute top-60 left-0 w-full right-0 flex justify-center z-10"
                titleClassName="text-center text-[32px] sm:text-[42px]"
                descriptionClassName="text-center"
                sloganClassName="text-center"
                imageClassName="hidden"
                index={0}
              />
            );
          }
          const isEven = index % 2 === 1;
          return (
            <BannerContent
              key={banner.id || index}
              bannerData={banner}
              currentLanguage={currentLanguage}
              className={`sm:flex-row gap-y-10 ${isEven ? '' : 'sm:flex-row-reverse'}`}
              titleClassName={index === 1 ? "text-[24px] sm:text-[32px] text-center sm:text-start" : "text-[16px] sm:text-[24px] text-center sm:text-start"}
              descriptionClassName="text-[14px] sm:text-[16px] text-center sm:text-start"
              sloganClassName=""
              imageClassName={index === 1 ? "hidden" : ""}
              index={0}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AboutUsBannerSection;
