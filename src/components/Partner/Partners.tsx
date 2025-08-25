"use client"

import Image from 'next/image';
import Link from "next/link";
import { Partner } from '@/lib/types/partner.types';
import React from 'react';

interface PartnersGridProps {
    partners: Partner[];
    currentLanguage: string;
}

const Partners = ({ partners }: PartnersGridProps) => {
    if (!partners || partners.length === 0) {
        return null;
    }

    const totalWidth = partners.length * (155 + 64);
    const animationDuration = partners.length * 6;

    return (
        <div className="overflow-hidden max-w-[507px]">
            <div
                className="flex"
                style={{
                    width: `${totalWidth * 2}px`,
                    animation: `scroll-left ${animationDuration}s linear infinite`
                }}
            >
                {partners.map((partner, index) => (
                    <div
                        key={`first-${partner.id}-${index}`}
                        className="flex-shrink-0 mx-3"
                    >
                        <Link
                            href={partner.url}
                            className="block text-center group"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="relative w-[155px] h-[47px] transition-transform duration-300">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_API_URL}/${partner.photo}`}
                                    alt={partner.name}
                                    fill
                                    priority
                                    className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                        </Link>
                    </div>
                ))}

                {partners.map((partner, index) => (
                    <div
                        key={`second-${partner.id}-${index}`}
                        className="flex-shrink-0 mx-3"
                    >
                        <Link
                            href={partner.url}
                            className="block text-center group"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="relative w-[155px] h-[47px] transition-transform duration-300">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_API_URL}/${partner.photo}`}
                                    alt={partner.name}
                                    fill
                                    priority
                                    className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            <style jsx>{`
                @keyframes scroll-left {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-${totalWidth}px);
                    }
                }
                
                .animate-infinite-scroll {
                    animation: scroll-left ${animationDuration}s linear infinite;
                }
                
                /* Hover durumunda animasyonu duraklat */
                div:hover {
                    animation-play-state: paused !important;
                }
            `}</style>
        </div>
    );
};

export default Partners;