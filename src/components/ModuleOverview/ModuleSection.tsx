import React from 'react';
import Image from 'next/image';
import { ModuleService } from '@/API/Services/module.service';
import { ModuleData } from '@/lib/types/module.types';
import { bannerTranslationService } from '@/API/Services/banner.service';
import { ProcessedBannerData } from '@/lib/types/banner.types';
import BannerContent from '@/components/ui/BannerContent';

interface BannerSectionProps {
  searchParams: { lang?: string };
}

const ModuleBannerSection = async ({ searchParams }: BannerSectionProps) => {
  const currentLanguage = searchParams.lang || 'en';

  const [bannerResponse, moduleResponse] = await Promise.all([
    bannerTranslationService.getBannersByType(currentLanguage, 'module_overview'),
    ModuleService.getModules(currentLanguage)
  ]);

  const banners: ProcessedBannerData[] = bannerResponse && bannerResponse.length > 0 ? bannerResponse : [];
  const modules: ModuleData[] = moduleResponse.success ? moduleResponse.data : [];

  const sortedModules = modules.sort((a, b) => {
    const getNumber = (title: string) => {
      const match = title.match(/^(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    };
    return getNumber(a.title) - getNumber(b.title);
  });

  if (sortedModules.length === 0 && banners.length === 0) {
    return (
      <div className="flex mt-[99px] mb-[149px] w-full items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-sm">No module or banner data available</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Banner Section */}
      {banners.length > 0 && (
        <div className="text-center mb-12 w-max mx-auto">
          {banners.map((banner, index) => (
            <BannerContent
              key={banner.id || index}
              bannerData={banner}
              currentLanguage={currentLanguage}
              index={index}
              imageClassName="hidden"
              titleClassName="text-center text-white text-[32px] sm:text-[42px] font-[euclid-Bold] mb-4"
              descriptionClassName="text-center text-[#B0B0B0] text-sm w-[343px] sm:min-w-[705px] mx-auto"
              sloganClassName="text-center text-[#B0B0B0] text-[14px]"
            />
          ))}
        </div>
      )}
      <div className="py-25 relative">

        <div
          className="absolute z-[-1] inset-0 bg-[#0B0D12] "
          style={{
            left: '50%',
            right: '50%',
            marginLeft: '-50.5vw',
            marginRight: '-50vw',
            width: '100vw'
          }}
        />



        {/* Modules Section */}
        {sortedModules.map((module, moduleIndex) => (
          <div key={module.id} className="max-w-5xl flex flex-col mx-auto pb-[50px] sm:pb-25">
            <h1 className="text-white text-[32px] sm:text-[42px] font-[euclid-Bold] text-center mb-2">{module.title}</h1>
            <p className="text-[#B0B0B0] text-center mb-8 sm:mb-[70px] max-w-2xl text-[14px] mx-auto">{module.description}</p>

            <div className={`flex sm:flex-row flex-col justify-between w-full gap-8 sm:gap-25 ${moduleIndex % 2 === 1 ? 'sm:flex-row-reverse' : ''}`}>
              <div className='flex flex-col gap-8 sm:gap-y-[50px]'>
                {module.photo && (
                  <div className="flex justify-start h-[320px] sm:w-[468px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/${module.photo}`}
                      alt={module.title}
                      width={468}
                      height={320}
                      className="rounded-2xl object-cover border border-[#333] bg-black/40"
                      style={{ width: '468px', height: '320px', maxWidth: '100%' }}
                      priority
                    />
                  </div>
                )}
                <div>
                  <h2 className="text-white text-2xl font-[euclid-Bold] mb-3">{module.detailsTitle}</h2>
                  <ul className="text-[#B0B0B0] list-disc pl-6 text-[14px] space-y-1 htmlDescription" dangerouslySetInnerHTML={{ __html: module.htmlDescription }} />
                </div>
              </div>

              <div className="flex gap-x-7 relative">
                <div>
                  {Array.isArray(module.features) && module.features.length > 0 && (
                    <div className="flex flex-col gap-12">
                      <div className='border-l-lime-700 border-l h-full absolute left-8 z-0'></div>
                      {module.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          <div className="flex items-start gap-6">
                            <div className="flex items-center gap-3 mb-2 relative">
                              <div className="w-16 h-16 bg-[#0B0D12] rounded-full absolute z-10"></div>
                              <span className="flex items-center justify-center w-16 h-16 relative z-20">
                                <Image
                                  src="/icons/features-icon.svg"
                                  alt="Feature Icon"
                                  width={64}
                                  height={64}
                                  className="w-16 h-16"
                                  draggable={false}
                                  priority
                                />
                              </span>
                            </div>
                            <div>
                              <h3 className="text-white text-[16px] sm:text-[24px] font-[euclid-Bold] leading-[100%] mb-4">{feature.title}</h3>
                              <p className="text-[#B0B0B0] text-sm max-w-md leading-relaxed whitespace-pre-line">{feature.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuleBannerSection;