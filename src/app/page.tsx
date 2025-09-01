// pages/HomePage.tsx
import { bannerTranslationService } from '@/API/Services/banner.service';
import HomeBannerSection from '@/components/HomeBannerSection/HomeBannerSection';
import AboutBannerSection from '@/components/AboutInHome/AboutInHomeSection';
import { Metadata } from 'next';
import ClientCarousel from '../components/ClientCarousel/ClientCarousel';
import PartnerSection from '@/components/Partner/PartnerSection';
import ParticipantsBannerSection from '@/components/Participants/ParticipantsSection';

interface PageProps {
  searchParams: Promise<{ lang?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const currentLang = params.lang || 'en';

  const banners = await bannerTranslationService.getBannersByType(currentLang, 'homepage');
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

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <div>
      <HomeBannerSection searchParams={params} />
      <PartnerSection searchParams={params} />
      <ParticipantsBannerSection searchParams={params} />
      <AboutBannerSection searchParams={params} />
      <ClientCarousel searchParams={params} />
    </div>
  );
}
