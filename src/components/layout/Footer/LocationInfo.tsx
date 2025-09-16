// components/layout/Footer/LocationInfo.tsx
import Image from 'next/image';
import Map from '../../../../public/icons/Rectangle 3.svg';
import React from 'react';

export const LocationInfo: React.FC = () => {
  return (
    <div className="flex items-center space-x-2 text-sm text-gray-600">
      <div className="w-10 h-10 rounded-full flex items-center justify-center">
        <Image src={Map} alt="Map" width={40} height={40} />
      </div>
      <span>Isny im Allgäu, Baden-Württemberg</span>
    </div>
  );
};