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
  let error: string | null = null;

  try {
    const aboutUsData = await bannerTranslationService.getBannersByType(currentLanguage, 'aboutUs');

    if (aboutUsData.length > 0) {
      banners = aboutUsData;
    } else {
      error = 'No aboutUs banner data available';
    }
  } catch (err) {
    error = err instanceof Error ? err.message : 'An error occurred';
    console.error('Error fetching aboutUs banner data:', err);
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
  [[0, 3], [1, 3]].forEach(([a, b]) => swapElements(sortedBanners, a, b));

  return (
    <div>
      <div className="relative w-full">
        <div className="relative flex flex-col gap-12">
          {sortedBanners.map((banner, index) => {
            if (index === 0) {
              return (
                <BannerContent
                  key={banner.id || index}
                  bannerData={{ ...banner, photo: '' }}
                  currentLanguage={currentLanguage}
                  className="items-center text-center sm:w-max mx-auto"
                  titleClassName="text-center text-[32px] sm:text-[42px]"
                  descriptionClassName="text-center"
                  sloganClassName="text-center"
                  imageClassName="hidden" index={0} />
              );
            }
            const isEven = index % 2 === 1;
            return (
              <BannerContent
                key={banner.id || index}
                bannerData={banner}
                currentLanguage={currentLanguage}
                className={`sm:flex-row ${isEven ? '' : 'sm:flex-row-reverse py-[50px]'}`}
                titleClassName=""
                descriptionClassName=""
                sloganClassName=""
                imageClassName="" index={0} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutUsBannerSection;
