import React from 'react';
import { ProcessedBannerData } from '@/lib/types/banner.types';
import { bannerTranslationService } from '@/API/Services/banner.service';
import BannerContent from '@/components/ui/BannerContent';

interface BannerSectionProps {
  searchParams: { lang?: string };
}

const LearnMoreSection = async ({ searchParams }: BannerSectionProps) => {
  const currentLanguage = searchParams.lang || 'en';

  let banners: ProcessedBannerData[] = [];
  let error: string | null = null;

  try {
    const data = await bannerTranslationService.getBannersByType(currentLanguage, "learnMore");
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
    <div className='w-full mx-auto pb-[50px]'>
      {banners.map((banner, index) => (
        <div key={banner.id || index}>
          <BannerContent
            bannerData={banner}
            currentLanguage={currentLanguage}
            index={index}
            className='custom-banner-content'
            imageClassName="hidden"
            titleClassName="text-white text-center capitalize sm:text-[42px] text-[32px] font-[euclid-Bold] my-3"
            descriptionClassName="text-sm text-[#FFFFFFB2] text-center sm:w-[505px] w-[343px]"
            sloganClassName="text-[#FFFFFF] text-sm text-center"
          />
          {banner.iframeUrl && (
            <div className='w-full mx-auto sm:w-[967px] border-6 border-[#1D222E] rounded-[12px] my-[50px] overflow-hidden'>
              <div className="mx-auto rounded-lg overflow-hidden shadow-lg">
                <iframe
                  className="w-full aspect-video "
                  src={banner.iframeUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                >
                </iframe>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LearnMoreSection;
