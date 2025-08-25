// app/terms/page.tsx

import { bannerTranslationService } from '@/API/Services/banner.service';
import { Metadata } from 'next';
import TermsSection from '@/components/Terms/TermsSection';

interface PageProps {
    searchParams: Promise<{ lang?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
    const params = await searchParams;
    const currentLang = params.lang || 'en';

    const banners = await bannerTranslationService.getBannersByType(currentLang, 'terms');
    const bannerData = banners[0];

    if (bannerData?.seo) {
        return {
            title: bannerData.seo.metaTitle,
            description: bannerData.seo.metaDescription,
            keywords: bannerData.seo.keywords,
            openGraph: {
                title: bannerData.seo.metaTitle,
                description: bannerData.seo.metaDescription,
                images: bannerData.photo
                    ? [
                        {
                            url: bannerData.photo,
                            width: 1200,
                            height: 630,
                            alt: bannerData.title,
                        },
                    ]
                    : [],
                locale: currentLang === 'de' ? 'de_DE' : 'en_US',
                type: 'website',
            },
            twitter: {
                card: 'summary_large_image',
                title: bannerData.seo.metaTitle,
                description: bannerData.seo.metaDescription,
                images: bannerData.photo ? [bannerData.photo] : [],
            },
            alternates: {
                languages: {
                    en: '/?lang=en',
                    de: '/?lang=de',
                },
            },
        };
    }

    return {};
}

export default async function TermsPage({ searchParams }: PageProps) {
    const params = await searchParams;

    return (
        <div className="pt-44 mb-30 mx-auto">
            <TermsSection searchParams={params} />
        </div>
    );
}