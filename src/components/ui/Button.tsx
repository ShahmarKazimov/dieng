import Link from 'next/link';
import Image from 'next/image';
import { ApiButtonData, ButtonProps } from "@/lib/types/button.types";

// Default button styles
const DEFAULT_STYLES = {
    base: "inline-flex items-center justify-center gap-2.5 px-4 py-4 rounded-lg font-bold text-sm leading-none tracking-tight transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b8e92f]",
    primary: "text-[#323232] bg-[#bcee30] hover:bg-[#a7d42b] hover:shadow-md",
    text: "text-[14px] leading-[100%] tracking-[-0.01em]",
    icon: "w-4 h-4 flex-shrink-0"
};


function getButtonText(buttonData: ApiButtonData, currentLanguage: string): string {
    const translation = buttonData.translations.find(
        t => t.languageCode === currentLanguage
    ) || buttonData.translations.find(t => t.isDefault) || buttonData.translations[0];

    return translation?.text || 'Button';
}


function getImageSrc(iconSrc: string): string {
    if (iconSrc.startsWith('http')) {
        return iconSrc;
    }
    return `${process.env.NEXT_PUBLIC_API_URL}/${iconSrc}`;
}


function isExternalLink(href: string, external?: boolean): boolean {
    return external || href.startsWith('http');
}


function getExternalProps(href: string, external?: boolean) {
    return isExternalLink(href, external)
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {};
}


function ButtonIcon({ icon }: { icon?: string }) {
    if (!icon) return null;

    return (
        <Image
            src={getImageSrc(icon)}
            width={16}
            height={16}
            alt="Button icon"
            className={DEFAULT_STYLES.icon}
        />
    );
}

export default function Button({
    buttonData,
    href = '',
    className = '',
    children,
    currentLanguage = 'en',
    external = false
}: ButtonProps) {
    const buttonClasses = `${DEFAULT_STYLES.base} ${DEFAULT_STYLES.primary} ${className}`;

    if (buttonData) {
        const buttonText = getButtonText(buttonData, currentLanguage);
        const linkProps = getExternalProps(buttonData.url, external);

        return (
            <Link
                href={buttonData.url}
                className={buttonClasses}
                {...linkProps}
            >
                <span className={DEFAULT_STYLES.text} style={{ fontFamily: 'euclid-Bold' }}>
                    {buttonText}
                </span>
                <ButtonIcon icon={buttonData.icon} />
            </Link>
        );
    }

    const linkProps = getExternalProps(href, external);

    return (
        <Link
            href={href}
            className={buttonClasses}
            {...linkProps}
        >
            <span className={DEFAULT_STYLES.text} style={{ fontFamily: 'euclid-Bold' }}>
                {children}
            </span>
        </Link>
    );
}

/**
 */
export function ButtonGroup({
    buttons,
    className = '',
    buttonClassName = 'w-[146px] justify-center cursor-pointer text-[#323232] hover:bg-[#f6f4f0] transition-all duration-300 hover:shadow-sm hover:shadow-[#b58500]',
    currentLanguage = 'en'
}: {
    buttons: ApiButtonData[];
    className?: string;
    buttonClassName?: string;
    currentLanguage?: string;
}) {
    if (!buttons?.length) return null;

    return (
        <div className={`flex gap-4 ${className}`}>
            {buttons.map((button) => (
                <Button
                    key={button.id}
                    buttonData={button}
                    className={buttonClassName}
                    currentLanguage={currentLanguage}
                />
            ))}
        </div>
    );
}