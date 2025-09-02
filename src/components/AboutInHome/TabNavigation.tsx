'use client';

import { useState } from 'react';
import BannerContent from '@/components/ui/BannerContent';
import { ProcessedBannerData } from '@/lib/types/banner.types';

interface TabNavigationProps {
    tabs: Array<{
        id: string;
        label: string;
        content: string;
        bannerData?: ProcessedBannerData;
        secondBannerData?: ProcessedBannerData[];
    }>;
    currentLanguage: string;
}

const TabNavigation = ({ tabs, currentLanguage }: TabNavigationProps) => {
    const [activeTab, setActiveTab] = useState('0');

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
    };

    return (
        <div>
            <nav className="flex sm:gap-x-6 gap-x-1 justify-between" aria-label="Tabs" role="tablist">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        className={`py-3 px-2 w-full items-center text-xs sm:text-[18px] font-[euclid-Bold] text-center transition-all duration-200 focus:outline-none ${activeTab === tab.id
                            ? 'bg-[#183D052E] border border-[#90C97D] text-white'
                            : 'bg-transparent border border-[#757575] cursor-pointer text-white hover:text-neutral-400'
                            }`}
                        role="tab"
                        aria-selected={activeTab === tab.id}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>

            <div className="mt-10">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={activeTab === tab.id ? 'block' : 'hidden'}
                        role="tabpanel"
                    >
                        {tab.bannerData ? (
                            <div className="flex justify-between sm:flex-row flex-col gap-y-[50px]">
                                <BannerContent
                                    bannerData={tab.bannerData}
                                    currentLanguage={currentLanguage}
                                    index={parseInt(tab.id)}
                                    imageClassName="sm:max-w-[421px] sm:h-[411px]"
                                />
                                <div className=''>
                                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 h-full content-between">
                                        {tab.secondBannerData && tab.secondBannerData.map((banner, index) => (
                                            <BannerContent
                                                key={banner.id || index}
                                                bannerData={banner}
                                                titleClassName='sm:text-[24px] text-[18px] font-[euclid-Bold] whitespace-nowrap sm:text-start text-center'
                                                descriptionClassName='text-[14px] mb-0 sm:mb-0 text-[#FFFFFFB2] sm:w-[340px] sm:text-start text-center'
                                                currentLanguage={currentLanguage}
                                                index={index}
                                                imageClassName="hidden"
                                                className="sm:items-stretch "
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500 dark:text-neutral-400">
                                {tab.content}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TabNavigation;
