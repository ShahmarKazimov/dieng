// app/products/page.tsx

import { bannerTranslationService } from '@/API/Services/banner.service';
import { Metadata } from 'next';
import ProductSection from '@/components/Products/ProductSection';
import PricingSection from '@/components/Pricing/PricingSection';
import HardwareSection from '@/components/HardwareSolutions/HardwareSection';
import AboutBannerSection from '@/components/AboutInHome/AboutInHomeSection';

interface PageProps {
    searchParams: Promise<{ lang?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
    const params = await searchParams;
    const currentLang = params.lang || 'en';

    const banners = await bannerTranslationService.getBannersByType(currentLang, 'contact');
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

export default async function ProductsPage({ searchParams }: PageProps) {
    const params = await searchParams;

    return (
        <div className="pt-44 mx-auto">
            <ProductSection searchParams={params} />
            <PricingSection searchParams={params} />
            <div className='relative'>
                <HardwareSection searchParams={params} />
            </div>
            <div className='relative'>
                <div
                    className="absolute inset-0"
                    style={{
                        left: '50%',
                        right: '50%',
                        marginLeft: '-50.5vw',
                        marginRight: '-50vw',
                        paddingTop: '0 50vw',
                        width: '100vw',
                        height: '100%',
                        backgroundImage: 'url(/images/background.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        zIndex: 0,
                        opacity: 0.4,
                    }}
                />
                <div className='py-[50px]' style={{ position: 'relative', zIndex: 1 }}>
                    <AboutBannerSection searchParams={params} />
                </div>
            </div>
        </div>
    );
}
