import React from 'react';
import { ProcessedBannerData } from '@/lib/types/banner.types';
import { bannerTranslationService } from '@/API/Services/banner.service';
import BannerContent from '@/components/ui/BannerContent';
import TabNavigation from './TabNavigation';

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

  // Fetch different banner data for tab contents
  let tabBanners: ProcessedBannerData[] = [];

  try {
    const tabBannerData = await bannerTranslationService.getBannersByType(currentLanguage, 'tab-first-img');
    if (tabBannerData.length > 0) {
      tabBanners = tabBannerData;
    }
  } catch (tabErr) {
    console.error('Error fetching tab banner data:', tabErr);
  }

  // Fetch second banner data for tab contents
  let secondTabBanners: ProcessedBannerData[] = [];

  try {
    const secondBannerData = await bannerTranslationService.getBannersByType(currentLanguage, 'tab-first-desc');
    if (secondBannerData.length > 0) {
      secondTabBanners = secondBannerData;
    }
  } catch (secondErr) {
    console.error('Error fetching second tab banner data:', secondErr);
  }

  // Create static tabs with both banner data types
  const tabs: Array<{
    id: string;
    label: string;
    content: string;
    bannerData?: ProcessedBannerData;
    secondBannerData?: ProcessedBannerData[];
  }> = [
      {
        id: '0',
        label: 'Wood in Vision',
        content: 'This is the first item\'s tab body.',
        bannerData: tabBanners[0],
        secondBannerData: secondTabBanners
      },
      {
        id: '1',
        label: 'Industry in Vision',
        content: 'This is the second item\'s tab body.',
        bannerData: tabBanners[1],
        secondBannerData: secondTabBanners
      },
      {
        id: '2',
        label: 'Other Projects',
        content: 'This is the third item\'s tab body.',
        bannerData: tabBanners[2],
        secondBannerData: secondTabBanners
      }
    ];

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
    <div className='py-20 sm:py-25 space-y-[50px]'>
      {banners.map((banner, index) => (
        <BannerContent
          key={banner.id || index}
          bannerData={banner}
          currentLanguage={currentLanguage}
          index={index}
          titleClassName='text-[32px] sm:text-[42px] text-center sm:text-start'
          sloganClassName='text-center sm:text-start'
          descriptionClassName='text-center sm:text-start'
          imageClassName='hidden'
          buttonGroupClassName='sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2 flex justify-center sm:justify-end mt-4 sm:mt-0'
          className='sm:relative'
        />
      ))}

      <TabNavigation tabs={tabs} currentLanguage={currentLanguage} />
    </div>
  );
};

export default AboutBannerSection;
