// PricingSection.tsx - Software Pricing Component
import BannerContent from '@/components/ui/BannerContent';
import PricingData from '@/components/Pricing/PricingData';
import { PricingItem } from '@/lib/types/pricing.types';
import { ProcessedBannerData } from '@/lib/types/banner.types';
import { bannerTranslationService } from '@/API/Services/banner.service';
import { pricingService } from '@/API/Services/pricing.service';

interface PricingSectionProps {
    searchParams: { lang?: string };
}

const PricingSection = async ({ searchParams }: PricingSectionProps) => {
    const currentLanguage = searchParams.lang || 'en';

    let banners: ProcessedBannerData[] = [];
    let pricingData: PricingItem[] = [];
    let error: string | null = null;

    try {
        const [bannerResponse, pricingResponse] = await Promise.all([
            bannerTranslationService.getBannersByType(currentLanguage, 'pricing'),
            pricingService.getPricings(currentLanguage, undefined, 'software'),
        ]);

        if (bannerResponse && bannerResponse.length > 0) {
            banners = bannerResponse;
        }

        if (pricingResponse && pricingResponse.success) {
            pricingData = pricingResponse.data.filter((item: PricingItem) => 
                item.type === 'software'
            );
        }

        if (banners.length === 0 && pricingData.length === 0) {
            error = 'No data available';
        }
    } catch (err) {
        error = err instanceof Error ? err.message : 'An error occurred';
        console.error('Error fetching data:', err);
    }

    if (error && banners.length === 0 && pricingData.length === 0) {
        return (
            <div className="flex mt-[99px] mb-[149px] w-full items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 text-sm">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex gap-y-[50px] sm:gap-y-20 flex-col items-center py-8 sm:py-[50px]">
            {banners.length > 0 && (
                <div className="text-center m-0 max-w-md">
                    {banners.map((banner, index) => (
                        <BannerContent
                            key={banner.id || index}    
                            bannerData={banner}
                            currentLanguage={currentLanguage}
                            index={index}
                            imageClassName='hidden'
                            titleClassName='text-center text-[32px] sm:text-[42px]'
                            sloganClassName='text-center'
                            descriptionClassName='text-center'
                        />
                    ))}
                </div>
            )}

            {pricingData.length > 0 && (
                <PricingData pricing={pricingData} currentLanguage={currentLanguage} />
            )}
        </div>
    );
};

export default PricingSection;