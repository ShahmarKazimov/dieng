import React from 'react';
import { ProcessedBannerData } from '@/lib/types/banner.types';
import { bannerTranslationService } from '@/API/Services/banner.service';
import BannerContent from '@/components/ui/BannerContent';
import ServiceData from '@/components/Services/ServiceData';
import PricingSection from '@/components/Pricing/PricingSection';

interface BannerSectionProps {
  searchParams: { lang?: string };
}

const ServicesSection = async ({ searchParams }: BannerSectionProps) => {
  const params = await searchParams;
  const currentLanguage = searchParams.lang || 'en';

  let banners: ProcessedBannerData[] = [];
  let error: string | null = null;

  try {
    const services = await bannerTranslationService.getBannersByType(currentLanguage, 'services');

    if (services.length > 0) {
      banners = services;
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

  return (
    <div className="relative w-full">
      <div className="relative flex flex-col gap-y-[50px]">
        {banners.slice(0, 2).map((banner, index) => (
          <BannerContent
            key={banner.id || index}
            bannerData={banner}
            currentLanguage={currentLanguage}
            index={index}
            className={index === 0 ? 'w-max mx-auto pb-[50px]' : ''}
            imageClassName={index === 0 ? 'hidden' : ''}
            titleClassName={
              index === 0 ? "text-white text-center leading-[120%] text-[32px] sm:w-[783px] w-[343px] sm:text-[42px] font-[euclid-Bold] mb-3" : 
              index === 1 ? "text-white leading-[120%] text-[24px] sm:text-[32px] font-[euclid-Bold] mb-3 text-center" : ""   
            }
            descriptionClassName={
              index === 0 ? "text-[#FFFFFFB2] sm:max-w-[783px] text-[14px] sm:w-[783px] w-[343px] text-center mx-auto" : ""
            }
            sloganClassName='text-center'
          />
        ))}
        <div>
          {banners.length > 2 && (
            <BannerContent
              key={banners[2].id}
              bannerData={banners[2]}
              currentLanguage={currentLanguage}
              index={2}
              className='w-max mx-auto py-[50px]'
              imageClassName='hidden'
              titleClassName="text-white text-center leading-[120%] text-[32px] sm:w-[819px] w-[343px] sm:text-[42px] font-[euclid-Bold] mb-3 text-center"
              sloganClassName='text-center'
              descriptionClassName="text-[#FFFFFFB2] text-[14px] sm:w-[819px] w-[343px] text-center mx-auto"
            />
          )}
          <div>
            <ServiceData />
          </div>
          <div>
            <PricingSection searchParams={params} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;