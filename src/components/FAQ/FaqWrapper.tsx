import React from 'react';
import { bannerTranslationService } from '@/API/Services/banner.service';
import FaqSection from './FaqSection';

interface FaqWrapperProps {
    searchParams: { lang?: string };
}

const FaqWrapper = async ({ searchParams }: FaqWrapperProps) => {
    const currentLanguage = searchParams.lang || 'en';

    let bannerData = null;

    try {
        const banners = await bannerTranslationService.getBannersByType(currentLanguage, 'faq');
        if (banners.length > 0) {
            bannerData = banners[0];
        }
    } catch (err) {
        console.error('Error fetching FAQ banner data:', err);
    }

    return (
        <FaqSection
            bannerData={bannerData || undefined}
            currentLanguage={currentLanguage}
        />
    );
};

export default FaqWrapper;
