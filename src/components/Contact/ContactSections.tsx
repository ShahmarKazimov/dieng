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
      {/* First Banner - Index 0 */}
      {banners[0] && (
        <div>
          <BannerContent
            bannerData={banners[0]}
            currentLanguage={currentLanguage}
            index={0}
            className='sm:w-max mx-auto absolute top-60 left-0 right-0'
            imageClassName="hidden"
            titleClassName="text-white sm:text-[52px] text-[40px] text-center leading-[1.4] sm:leading-[100%] font-[euclid-Bold] my-3"
            sloganClassName="text-[#FFFFFF] text-center text-sm"
            descriptionClassName="mx-auto text-sm text-center text-[#FFFFFFB2] leading-[1.4]"
          />
        </div>
      )}

      {/* Second Banner - Index 1 - Custom Layout */}
      <div className='flex sm:flex-row flex-col gap-y-8 justify-between py-20 sm:py-25'>
        {banners[1] && (
          <div className="w-full flex flex-col justify-between gap-y-8">
            {/* Text Content */}
            <div className="text-center">
              {banners[1].slogan && (
                <h1 className="text-[#FFFFFF] text-sm mb-4">{banners[1].slogan}</h1>
              )}
              {banners[1].title && (
                <h2 className="text-white leading-[1.2] sm:text-[32px] max-w-[456px] text-[24px] text-center sm:text-start font-[euclid-Bold] mb-4">{banners[1].title}</h2>
              )}
              {banners[1].description && (
                <p className="text-sm whitespace-pre-line text-[#FFFFFFB2] max-w-[456px] text-center sm:text-start leading-[1.4]">{banners[1].description}</p>
              )}
            </div>

            {/* Image Content */}
            {banners[1].photo && (
              <div className="flex justify-start">
                <div className="w-full max-w-[547px] relative h-[240px] overflow-hidden">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${banners[1].photo}`}
                    alt={banners[1].title}
                    className="object-cover w-full h-full"
                    fill
                    sizes="(max-width: 768px) 100vw, 547px"
                    priority
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Contact Form Section */}
        <div className="flex justify-center">
          <div className="sm:w-[599px] w-full bg-[#242E21] border border-[#3A5630] p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
