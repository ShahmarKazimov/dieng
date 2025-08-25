import React from 'react';
import { BannerContentProps } from '@/lib/types/banner.types';

const TermsContent: React.FC<BannerContentProps> = ({ bannerData }) => {
  if (!bannerData?.description) return null;

  return (
    <div className="pt-[50px] mx-auto">
      <div
        className="text-[16px] text-[#FFFFFFB2]
          [&_b]:text-white [&_b]:font-[euclid-Bold] [&_b]:text-lg [&_b]:block [&_b]:mb-1 [&_b]:mt-6"
        dangerouslySetInnerHTML={{ __html: bannerData.description }}
      />
    </div>
  );
};

export default TermsContent;