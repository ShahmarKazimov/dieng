import React from 'react';
import { BannerContentProps } from '@/lib/types/banner.types';

const PrivacyContent: React.FC<BannerContentProps> = ({ bannerData }) => {
  if (!bannerData?.description) return null;

  return (
    <div className="py-20 sm:py-25 flex justify-end">
      <div
        className="text-[16px] text-black
          [&_b]:text-black [&_b]:font-[euclid-Bold] [&_b]:text-lg [&_b]:block custom-list [&_li]:ml-4 capitalize max-w-[640px]"
        dangerouslySetInnerHTML={{ __html: bannerData.description }}
      />
    </div>
  );
};

export default PrivacyContent;