import React from 'react';
import { ProcessedBannerData } from '@/lib/types/banner.types';
import { bannerTranslationService } from '@/API/Services/banner.service';
import BannerContent from '@/components/ui/BannerContent';

interface BannerSectionProps {
  searchParams: { lang?: string };
}

const ServicesSection = async ({ searchParams }: BannerSectionProps) => {
  const currentLanguage = searchParams.lang || 'en';

  let banners: ProcessedBannerData[] = [];
  let services_about: ProcessedBannerData[] = [];
  let services_monitoring: ProcessedBannerData[] = [];
  let services_sale: ProcessedBannerData[] = [];
  let services_management: ProcessedBannerData[] = [];
  let error: string | null = null;

  try {
    const services = await bannerTranslationService.getBannersByType(currentLanguage, 'services');
    const aboutTechnologyData = await bannerTranslationService.getBannersByType(currentLanguage, 'services_about');
    const services_monitoringData = await bannerTranslationService.getBannersByType(currentLanguage, 'services_monitoring');
    const services_saleData = await bannerTranslationService.getBannersByType(currentLanguage, 'services_sale');
    const services_managementData = await bannerTranslationService.getBannersByType(currentLanguage, 'services_management');

    if (services.length > 0) {
      banners = services;
    }

    if (aboutTechnologyData.length > 0) {
      services_about = aboutTechnologyData;
    }

    if (services_monitoringData.length > 0) {
      services_monitoring = services_monitoringData;
    }

    if (services_saleData.length > 0) {
      services_sale = services_saleData;
    }

    if (services_managementData.length > 0) {
      services_management = services_managementData;
    }

    if (banners.length === 0 && services_about.length === 0 && services_monitoring.length === 0 && services_sale.length === 0 && services_management.length === 0) {
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
      <div>
        {banners.map((banner, index) => (
          <BannerContent
            key={banner.id || index}
            bannerData={banner}
            currentLanguage={currentLanguage}
            index={index}
            className="items-center text-center px-4 sm:px-0 sm:w-max mx-auto absolute top-60 left-0 w-full right-0 flex justify-center z-10"
            titleClassName="text-[#000000] leading-[120%] text-[32px] sm:text-[42px] text-center font-[euclid-Bold] mb-3"
            descriptionClassName="text-[#FFFFFFB2] text-sm text-center mx-auto sm:w-[564px] w-[343px]"
            sloganClassName="text-green-600 text-[14px] text-center"
            imageClassName="hidden"
          />
        ))}
      </div>
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
        {services_about.map((banner, index) => (
          <BannerContent
            key={banner.id || index}
            bannerData={banner}
            currentLanguage={currentLanguage}
            index={index}
            titleClassName='text-[24px] max-w-[483px] sm:text-[32px] text-black text-center sm:text-start'
            descriptionClassName='text-center max-w-[547px] sm:text-start text-gray-500'
            imageClassName='sm:w-[593px] sm:h-[440px] w-full h-auto'
            className='relative gap-y-[50px] items-start'
          />
        ))}
      </div>

      <div className="w-full flex flex-col gap-y-[70px] py-20 sm:py-25">
        {services_monitoring.map((banner, index) => {
          const isEven = index % 2 === 1;
          return (
            <BannerContent
              key={banner.id || index}
              bannerData={banner}
              currentLanguage={currentLanguage}
              className={`${isEven ? 'items-start sm:flex-row gap-y-10' : 'sm:flex-row-reverse items-start gap-y-10'}`}
              titleClassName={"text-[16px] sm:text-[24px] text-center sm:text-start"}
              descriptionClassName="text-[14px] sm:text-[16px] text-center sm:text-start"
              index={0}
            />
          );
        })}
      </div>
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
        {services_sale.map((banner, index) => (
          <BannerContent
            key={banner.id || index}
            bannerData={banner}
            currentLanguage={currentLanguage}
            index={index}
            titleClassName='text-[24px] max-w-[483px] sm:text-[32px] text-black text-center sm:text-start'
            descriptionClassName='text-center max-w-[547px] sm:text-start text-gray-500'
            imageClassName='sm:w-[1340px] sm:h-[232px] w-full h-auto'
            buttonGroupClassName='sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2 flex justify-center sm:justify-end mt-4 sm:mt-0'
            className='relative items-start flex-col service-banner rounded-none'
          />
        ))}
      </div>
      {services_management.map((banner, index) => (
        <BannerContent
          key={banner.id || index}
          bannerData={banner}
          currentLanguage={currentLanguage}
          index={index}
          titleClassName='text-[24px] max-w-[483px] sm:text-[32px] text-white text-center sm:text-start'
          descriptionClassName='text-center text-[16px] max-w-[547px] sm:text-start text-[#FFFFFFB2]'
          imageClassName='sm:w-[593px] sm:h-[440px] w-full h-auto'
          className='relative items-start py-20 sm:py-25 gap-y-10'
        />
      ))}
    </div>
  );
};

export default ServicesSection;