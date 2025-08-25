import React from 'react';
import { ProcessedBannerData } from '@/lib/types/banner.types';
import { bannerTranslationService } from '@/API/Services/banner.service';
import BannerContent from '@/components/ui/BannerContent';
import Image from 'next/image';
import ContactForm from './ContactForm';

interface BannerSectionProps {
  searchParams: { lang?: string };
}

const ContactSection = async ({ searchParams }: BannerSectionProps) => {
  const currentLanguage = searchParams.lang || 'en';

  let banners: ProcessedBannerData[] = [];
  let error: string | null = null;

  try {
    const data = await bannerTranslationService.getBannersByType(currentLanguage, "contact");
    if (data.length > 0) {
      banners = data;
    } else {
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
      {banners.map((banner, index) => (
        <div key={banner.id || index} className="mb-8">
          <BannerContent
            bannerData={banner}
            currentLanguage={currentLanguage}
            index={index}
            className='sm:w-max mx-auto'
            imageClassName="hidden"
            titleClassName="text-white sm:text-[52px] text-[40px] text-center leading-[1.4] sm:leading-[100%] font-[euclid-Bold] my-3"
            sloganClassName="text-[#FFFFFF] text-center text-sm"
            descriptionClassName="mx-auto text-sm text-center text-[#FFFFFFB2] leading-[1.4]"
          />
          <div className="flex flex-col sm:flex-row items-start my-[50px] gap-y-8 justify-between w-full">
            {banner.photo && (
              <div className="w-full relative sm:w-[564px] sm:h-[509px] h-[251px] border-4 border-[#1D222E] rounded-xl overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${banner.photo}`}
                  alt={banner.title}
                  className="object-cover w-full h-full"
                  fill
                  sizes="(max-width: 768px) 100vw, 564"
                  priority
                />
              </div>
            )}
            <div className="sm:w-[599px] w-full bg-[#1D222E] border border-[#464646] rounded-xl p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactSection;
