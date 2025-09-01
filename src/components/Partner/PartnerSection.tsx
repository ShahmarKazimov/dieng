import React from 'react';
import { ProcessedBannerData } from '@/lib/types/banner.types';
import { Partner } from '@/lib/types/partner.types';
import { bannerTranslationService } from '@/API/Services/banner.service';
import { partnerService } from '@/API/Services/partner.service';
import BannerContent from '@/components/ui/BannerContent';
import Partners from '@/components/Partner/Partners';

interface PartnerSectionProps {
  searchParams: { lang?: string };
}

const PartnerSection = async ({ searchParams }: PartnerSectionProps) => {
  const currentLanguage = searchParams.lang || 'en';

  let banners: ProcessedBannerData[] = [];
  let partnersData: Partner[] = [];
  let error: string | null = null;

  try {
    const [bannerResponse, partnersResponse] = await Promise.all([
      bannerTranslationService.getBannersByType(currentLanguage, 'partner'),
      partnerService.getAllPartners(currentLanguage),
    ]);

    if (bannerResponse && bannerResponse.length > 0) {
      banners = bannerResponse;
    }

    if (partnersResponse) {
      partnersData = partnersResponse;
    }

    if (banners.length === 0 && partnersData.length === 0) {
      error = 'No data available';
    }
  } catch (err) {
    error = err instanceof Error ? err.message : 'An error occurred';
    console.error('Error fetching data:', err);
  }

  if (error && banners.length === 0 && partnersData.length === 0) {
    return (
      <div className="flex mt-[99px] mb-[149px] w-full items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden flex flex-col sm:flex-row items-center justify-between py-10">
      {banners.length > 0 && (
        <div className="text-center mb-0">
          {banners.map((banner, index) => (
            <BannerContent
              key={banner.id || index}
              bannerData={banner}
              currentLanguage={currentLanguage}
              index={index}
              imageClassName="hidden"
              titleClassName="text-center sm:mb-0 text-[32px] sm:text-[42px] sm:text-start"
              sloganClassName="text-center sm:text-start hidden"
              descriptionClassName="hidden text-center sm:text-start text-[#FFFFFFB2]"

            />
          ))}
        </div>
      )}

      {partnersData.length > 0 && (
        <Partners partners={partnersData} currentLanguage={currentLanguage} />
      )}
    </div>
  );
};

export default PartnerSection;
