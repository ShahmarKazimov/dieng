'use client';

import React, { useState } from 'react';
import BannerContent from '@/components/ui/BannerContent';
import { ProcessedBannerData } from '@/lib/types/banner.types';
import { useTranslation } from '@/lib/hooks/useTranslation';

interface FaqSectionProps {
    bannerData?: ProcessedBannerData;
    currentLanguage: string;
}

interface FaqItem {
    id: string;
    question: string;
    answer: string;
}

const FaqSection = ({ bannerData, currentLanguage }: FaqSectionProps) => {
    const [openFaq, setOpenFaq] = useState<string | null>('1');
    const { t } = useTranslation(currentLanguage);

    const toggleFaq = (id: string) => {
        setOpenFaq(openFaq === id ? null : id);
    };

    const faqItems: FaqItem[] = [
        {
            id: '1',
            question: t('faq1Question', 'What Is Die Ing?'),
            answer: t('faq1Answer', 'Die Ing Is The Company Behind Two Innovative Digital Platforms: WOOD.IN.VISION, Focused On Modernizing Forestry, And INDUSTRY.IN.VISION, Designed To Optimize Industrial Processes.')
        },
        {
            id: '2',
            question: t('faq2Question', 'How Does WOOD.IN.VISION Support Forestry Professionals?'),
            answer: t('faq2Answer', 'WOOD.IN.VISION provides comprehensive digital tools for modern forestry management, including inventory tracking, planning optimization, and sustainable practice implementation.')
        },
        {
            id: '3',
            question: t('faq3Question', 'Who Can Benefit From INDUSTRY.IN.VISION?'),
            answer: t('faq3Answer', 'INDUSTRY.IN.VISION is designed for manufacturing companies, industrial process managers, and businesses looking to optimize their operational efficiency through digital transformation.')
        },
        {
            id: '4',
            question: t('faq4Question', 'Is The Platform Cloud-Based?'),
            answer: t('faq4Answer', 'Yes, both platforms are fully cloud-based, ensuring accessibility from anywhere, automatic updates, and secure data storage with enterprise-grade security measures.')
        },
        {
            id: '5',
            question: t('faq5Question', 'Can The Platforms Be Customized?'),
            answer: t('faq5Answer', 'Absolutely! Both WOOD.IN.VISION and INDUSTRY.IN.VISION offer extensive customization options to meet specific industry requirements and business workflows.')
        },
        {
            id: '6',
            question: t('faq6Question', 'Do You Provide Training And Support?'),
            answer: t('faq6Answer', 'Yes, we provide comprehensive training programs, documentation, and ongoing technical support to ensure successful platform adoption and optimal usage.')
        }
    ];

    return (
        <div className='py-20 sm:py-25 relative'>
            <div
                className="absolute inset-0 -z-1 bg-[#F5F6FA]"
                style={{
                    left: '50%',
                    right: '50%',
                    marginLeft: '-50.5vw',
                    marginRight: '-50vw',
                    width: '100vw'
                }}
            />
            <div className='flex flex-col sm:flex-row justify-between'>

                {/* Banner Section */}
                {bannerData && (
                    <div className="">
                        <BannerContent
                            bannerData={bannerData}
                            currentLanguage={currentLanguage}
                            index={0}
                            titleClassName='text-[24px] sm:text-[32px] text-center sm:text-start font-bold text-black mb-4'
                            sloganClassName='text-center sm:text-start text-green-600 text-sm mb-2'
                            descriptionClassName='text-center sm:text-start text-gray-600'
                            imageClassName='hidden'
                            buttonGroupClassName='justify-center sm:justify-start mt-6'
                            className=' max-w-[470px]'
                            buttonHref='/contact'
                        />
                    </div>
                )}

                {/* FAQ Section */}
                <div className="max-w-[670px]">
                    <div className="space-y-2 flex flex-col sm:gap-y-2">
                        {faqItems.map((item) => (
                            <div
                                className=' border-b focus-within:border-[#000000] py-4 border-[#D3D8D4]'
                                key={item.id}
                            >
                                <button
                                    onClick={() => toggleFaq(item.id)}
                                    className="flex cursor-pointer justify-between items-center w-full px-6text-left transition-colors duration-200"
                                >
                                    <span className={`text-[16px] font-[euclid-Bold] text-start ${openFaq === item.id ? 'text-[#000000]' : 'text-gray-800'
                                        }`}>
                                        {item.question}
                                    </span>
                                    <span
                                        className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded transition-all duration-200 ${openFaq === item.id
                                            ? 'bg-black text-white'
                                            : 'bg-gray-300 text-gray-600'
                                            }`}
                                    >
                                        {openFaq === item.id ? (
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                            </svg>
                                        ) : (
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                        )}
                                    </span>
                                </button>

                                <div
                                    className={`transition-all duration-300 ease-in-out ${openFaq === item.id
                                        ? 'max-h-96 opacity-100 pb-4'
                                        : 'max-h-0 opacity-0'
                                        } overflow-hidden`}
                                >
                                    <div className="pt-2 text-[#747474] text-[14px]">
                                        {item.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaqSection;
