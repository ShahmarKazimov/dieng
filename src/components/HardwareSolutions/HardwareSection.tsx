
import BannerContent from '@/components/ui/BannerContent';
import { PricingItem } from '@/lib/types/pricing.types';
import { ProcessedBannerData } from '@/lib/types/banner.types';
import React from 'react';
import { bannerTranslationService } from '@/API/Services/banner.service';
import { pricingService } from '@/API/Services/pricing.service';
import { Check, X } from 'lucide-react';
import Image from 'next/image';

interface HardwareSectionProps {
    searchParams: { lang?: string };
}

const HardwareSection = async ({ searchParams }: HardwareSectionProps) => {
    const currentLanguage = searchParams.lang || 'en';

    let banners: ProcessedBannerData[] = [];
    let hardwareData: PricingItem[] = [];
    let error: string | null = null;

    try {
        const [bannerResponse, pricingResponse] = await Promise.all([
            bannerTranslationService.getBannersByType(currentLanguage, 'hardware_banner'),
            pricingService.getPricings(currentLanguage, undefined, 'hardware'),
        ]);

        if (bannerResponse && bannerResponse.length > 0) {
            banners = bannerResponse;
        }

        if (pricingResponse && pricingResponse.success) {
            hardwareData = pricingResponse.data;
        }

        if (banners.length === 0 && hardwareData.length === 0) {
            error = 'No data available';
        }
    } catch (err) {
        error = err instanceof Error ? err.message : 'An error occurred';
        console.error('Error fetching data:', err);
    }

    if (error && banners.length === 0 && hardwareData.length === 0) {
        return (
            <div className="flex mt-[99px] mb-[149px] w-full items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 text-sm">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex gap-y-[50px] flex-col items-center m-0 py-8 sm:py-[100px]">
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
            {banners.length > 0 && (
                <div className="text-center z-1 m-0 max-w-md">
                    {banners.map((banner, index) => (
                        <BannerContent
                            key={banner.id || index}
                            bannerData={banner}
                            currentLanguage={currentLanguage}
                            index={index}
                            imageClassName="hidden"
                            titleClassName="text-center text-black text-[32px] sm:text-[42px] "
                            descriptionClassName="text-center text-gray-500"
                            sloganClassName="text-center"
                        />
                    ))}
                </div>
            )}

            {hardwareData.length > 0 && (
                <div className="sm:pb-[50px] w-full">
                    <div className="flex flex-wrap justify-between gap-y-8 gap-x-[10px]">
                        {hardwareData
                            .slice()
                            .sort((a, b) => {
                                const falseCountA = a.benefits ? a.benefits.filter(benefit => !benefit.checked).length : 0;
                                const falseCountB = b.benefits ? b.benefits.filter(benefit => !benefit.checked).length : 0;
                                return falseCountB - falseCountA;
                            })
                            .map((plan, idx) => (
                                <div
                                    key={plan.id}
                                    className={`relative rounded-xl w-full sm:max-w-[381px] transition-all duration-300 hover:-translate-y-1 ${plan.isDefault}`}>
                                    <div className="py-6 px-4 rounded-xl bg-[#e5e6ea] h-full flex flex-col">
                                        {/* Header */}
                                        <div className="text-start pb-5">
                                            {(idx === 0 || idx === 1 || idx === 2) && (
                                                <div className="mb-2 flex justify-start">
                                                    {idx === 0 && (
                                                        <Image src="/icons/hardware-icon1.svg" alt="icon1" width={56} height={56} />
                                                    )}
                                                    {idx === 1 && (
                                                        <Image src="/icons/hardware-icon2.svg" alt="icon2" width={56} height={56} />
                                                    )}
                                                    {idx === 2 && (
                                                        <Image src="/icons/hardware-icon3.svg" alt="icon3" width={56} height={56} />
                                                    )}
                                                </div>
                                            )}
                                            <div className='flex items-center justify-between'>
                                                <h3 className="text-2xl font-[euclid-Bold] text-[#000000] my-3">
                                                    {plan.title}
                                                </h3>
                                            </div>
                                            <p className="text-[#2B2B2BB2] text-sm leading-relaxed">
                                                {plan.description}
                                            </p>
                                        </div>

                                        {/* Benefits */}
                                        {plan.benefits && plan.benefits.length > 0 && (
                                            <div className="py-3 flex-grow">
                                                <ul className="space-y-4">
                                                    {plan.benefits
                                                        .slice()
                                                        .sort((a, b) => {
                                                            if (a.checked === b.checked) return 0;
                                                            return a.checked ? -1 : 1;
                                                        })
                                                        .map((benefit) => (
                                                            <li
                                                                key={benefit.id}
                                                                className="flex items-start space-x-3"
                                                            >
                                                                <div className="flex-shrink-0">
                                                                    {benefit.checked ? (
                                                                        <Check className="h-5 w-5 p-0.5 rounded-full text-white bg-[#009900] mt-0.5" />
                                                                    ) : (
                                                                        <X className="h-5 w-5 text-red-500 mt-0.5" />
                                                                    )}
                                                                </div>
                                                                <span
                                                                    className={`text-sm ${benefit.checked
                                                                        ? 'text-[#151515]'
                                                                        : 'text-gray-400 line-through'
                                                                        }`}
                                                                >
                                                                    {benefit.text}
                                                                </span>
                                                            </li>
                                                        ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HardwareSection;