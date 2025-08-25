// components/layout/Footer/FooterSection.tsx
import React from 'react';
import Link from 'next/link';
import { FooterSectionProps } from '@/lib/types/footer.types';


export const FooterSection: React.FC<FooterSectionProps> = ({ title, links }) => {
  return (
    <div>
      <h4 className="font-medium text-[#0E0E0E] font-[euclid-Bold] mb-3">{title}</h4>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="text-[#000000B2] hover:text-gray-900 transition-colors duration-200 text-sm"
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
