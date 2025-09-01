import React from 'react';
import BannerContent from '@/components/ui/BannerContent';
import { bannerTranslationService } from '@/API/Services/banner.service';

interface BannerSectionProps {
  searchParams: { lang?: string };
}

const ParticipantsBannerSection = async ({ searchParams }: BannerSectionProps) => {
  const lang = searchParams.lang || 'en';

  try {
    const banners = await bannerTranslationService.getBannersByType(lang, 'participants');

    if (!banners.length) throw new Error('No banner data available');

    const banner = banners[0];

    return (
      <div className="relative w-full">
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
        <div className="relative py-[50px]">
          <BannerContent
            bannerData={banner}
            currentLanguage={lang}
            index={0}
            titleClassName="text-black text-[24px] sm:text-[32px] font-[euclid-Bold] mb-4 max-w-[591px] text-center sm:text-start"
            descriptionClassName="text-gray-500 text-[14px] text-center mx-auto max-w-[591px] text-center sm:text-start"
            sloganClassName="text-green-600 text-[14px] text-center"
            className="text-center flex flex-col sm:flex-row items-center justify-between"
            buttonGroupClassName="justify-center sm:justify-start"
            imageClassName='sm:w-[549px] h-[604px] w-full my-auto'
          />
        </div>
      </div>
    );

  } catch (err) {
    return (
      <div className="flex mt-[99px] mb-[149px] w-full items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-sm">
            {err instanceof Error ? err.message : 'An error occurred'}
          </p>
        </div>
      </div>
    );
  }
};

export default ParticipantsBannerSection;   