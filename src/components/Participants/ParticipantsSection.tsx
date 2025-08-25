import React from 'react';
import BannerContent from '@/components/ui/BannerContent';
import { bannerTranslationService } from '@/API/Services/banner.service';

interface BannerSectionProps {
  searchParams: { lang?: string };
}

const CONFIGS = [
  {
    className: "text-center pt-[50px] w-max mx-auto",
    titleClassName: "text-black text-center leading-[120%] text-[32px] sm:w-[819px] w-[343px] sm:text-[42px] font-[euclid-Bold] mb-3 sm:text-start",
    descriptionClassName: "text-gray-500 text-sm",
    sloganClassName: "text-green-600 text-[14px] text-center",
    imageClassName: "hidden",
    hasBackground: true,
  },
  {
    className: "flex sm:flex-row flex-col justify-between text-start w-full pt-[50px] sm:pt-25",
    titleClassName: "text-black leading-[120%] text-[24px] sm:text-[32px] font-[euclid-Bold] mb-4 text-center sm:text-start",
    descriptionClassName: "text-gray-500 leading-[140%] text-sm mb-4 max-w-[505px] whitespace-pre-line text-center sm:text-start",
    sloganClassName: "hidden",
    imageClassName: "w-full sm:w-max rounded-xl overflow-hidden h-[240px] sm:h-[340px]",
    hasBackground: true,
  },
  {
    className: "flex sm:flex-row flex-col justify-between pt-[50px] items-start mx-auto text-center w-full",
    titleClassName: "text-black text-center sm:text-start sm:text-[32px] text-[24px]",
    descriptionClassName: "text-gray-500",
    sloganClassName: "text-green-600 text-[14px] text-center",
    imageClassName: "w-full sm:w-max rounded-xl overflow-hidden",
    buttonClassName: "cursor-pointer px-8 bg-black w-max text-[#FFFFFF] rounded-full",
    hasBackground: true,
  },
  {
    className: "flex sm:flex-row flex-col justify-between py-[50px] text-start items-start mx-auto w-full",
    titleClassName: "text-black leading-[120%] text-[24px] sm:text-[32px] font-[euclid-Bold] mt-3 mb-4 max-w-[497px] text-center sm:text-start",
    descriptionClassName: "text-gray-500 leading-[140%] text-sm mb-4 max-w-[497px] whitespace-pre-line text-center sm:text-start",
    sloganClassName: "text-green-600 text-[14px] text-center",
    imageClassName: "w-full sm:w-max rounded-xl overflow-hidden",
    hasBackground: true,
  },
  {
    className: "flex sm:flex-row flex-col justify-between text-start w-full pt-25 mx-auto text-[#FFFFFF] leading-[1.4] whitespace-pre-line",
    titleClassName: "text-black text-center sm:text-start sm:text-[32px] text-[24px]",
    descriptionClassName: "text-[24px] max-w-[1044px]",
    sloganClassName: "text-green-600 text-[14px] text-center",
    imageClassName: "relative hidden sm:block -top-40 h-[249px] sm:w-[468px] h-full",
    hasBackground: false,
  },
];

const ParticipantsBannerSection = async ({ searchParams }: BannerSectionProps) => {
  const currentLanguage = searchParams.lang || 'en';

  try {
    let banners = await bannerTranslationService.getBannersByType(currentLanguage, 'participants');
    
    if (banners.length === 0) {
      throw new Error('No banner data available');
    }

    banners = [...banners].sort((a, b) => (parseInt(a.id || '0') - parseInt(b.id || '0')));
    [[0, 3], [1, 3]].forEach(([i, j]) => banners.length > Math.max(i, j) && ([banners[i], banners[j]] = [banners[j], banners[i]]));

    return (
      <div className="relative w-full">
        <div className="relative flex flex-col pt-[50px]">
          {banners.map((banner, index) => {
            const config = CONFIGS[index] || CONFIGS[2];
            
            return (
              <div key={banner.id || index} className="relative">
                {config.hasBackground && (
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
                )}
                <div className="relative">
                  <BannerContent
                    bannerData={banner}
                    currentLanguage={currentLanguage}
                    index={index}
                    {...config}
                    buttonClassName={config.buttonClassName || ""}
                  />
                </div>
              </div>
            );
          })}
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