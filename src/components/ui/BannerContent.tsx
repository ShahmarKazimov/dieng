
import React from 'react';
import Image from 'next/image';
import { BannerContentExtendedProps } from '@/lib/types/banner.types';
import { ButtonGroup } from './Button';


const BannerContent: React.FC<BannerContentExtendedProps> = ({
    bannerData,
    currentLanguage,
    className,
    titleClassName,
    descriptionClassName,
    sloganClassName,
    imageClassName,
    buttonClassName,
    buttonGroupClassName,
    buttonHref,
}) => {
    const { title, description, photo, slogan, buttons } = bannerData;
    const transformedButtons = buttons?.filter(Boolean).map((button) => ({
        id: button.id,
        url: buttonHref || button.url, 
        bannerId: button.bannerId,
        icon: button.icon,
        translations: [
            {
                id: button.id,
                languageCode: button.languageCode,
                isDefault: button.languageCode === currentLanguage,
                text: button.text,
                bannerButtonId: button.id,
            },
        ],
    })) || [];

    return (
        <div className={`flex flex-col sm:flex-row items-center justify-between text-start${className ? ` ${className}` : ''}`}>
            <div>
                {slogan && (
                    <h1 className={`text-white text-[14px] mb-4${sloganClassName ? ` ${sloganClassName}` : ''}`}>{slogan}</h1>
                )}
                {title && (
                    <h2 className={`text-[#FFFFFF] leading-[120%] font-[euclid-Bold] mb-4 ${titleClassName ? ` ${titleClassName}` : ''}`}>{title}</h2>
                )}
                {description && (
                    <>
                        <p className={`text-[#FFFFFFB2] leading-[140%] text-sm mb-4 max-w-[505px] whitespace-pre-line${descriptionClassName ? ` ${descriptionClassName}` : ''}`}>{description}</p>
                        {transformedButtons.length > 0 && (
                            <div className="my-8">
                                <ButtonGroup
                                    buttons={transformedButtons}
                                    className={buttonGroupClassName || "justify-center sm:justify-start"}
                                    currentLanguage={currentLanguage}
                                    buttonClassName={buttonClassName || "cursor-pointer bg-[#FFFFFF] px-9 text-[#000000]"}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
            {photo && (
                <div className={`w-full sm:w-[468px] h-[340px] overflow-hidden${imageClassName ? ` ${imageClassName}` : ''}`}>
                    <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${photo}`}
                        priority
                        alt={title}
                        className="w-full h-full object-cover"
                        width={0}
                        height={0}
                        sizes="468px"
                    />
                </div>
            )}
        </div>
    );
};

export default BannerContent;
