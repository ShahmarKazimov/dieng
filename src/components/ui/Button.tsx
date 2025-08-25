import Link from 'next/link';
import Image from 'next/image';
import { ApiButtonData, ButtonProps } from "@/lib/types/button.types"

export default function Button({
    buttonData,
    href = '',
    className = '',
    children,
    currentLanguage = 'en',
    external = false
}: ButtonProps) {
    if (buttonData) {
        const translation = buttonData.translations.find(
            t => t.languageCode === currentLanguage
        ) || buttonData.translations.find(t => t.isDefault) || buttonData.translations[0];

        const buttonText = translation?.text || 'Button';
        const linkHref = buttonData.url;

        const baseClasses = "text-[#323232] p-4 rounded-full font-medium flex items-center space-x-[10px] group";
        const combinedClasses = `${baseClasses} ${className}`;

        return (
            <Link
                href={linkHref}
                className={combinedClasses}
                {...(external || linkHref.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
                <span
                    className="leading-[100%] text-[14px] tracking-[-0.01em]"
                    style={{ fontFamily: 'euclid-Bold' }}
                >
                    {buttonText}
                </span>
                {buttonData.icon && (
                    <Image
                        src={buttonData.icon.startsWith('http') ? buttonData.icon : `${process.env.NEXT_PUBLIC_API_URL}/${buttonData.icon}`}
                        width={16}
                        height={16}
                        alt="Button icon"
                        className="w-4 h-4"
                    />
                )}
            </Link>
        );
    }

    const baseClasses = "text-[#323232] p-4 rounded-full font-medium flex items-center space-x-[10px] group";
    const combinedClasses = `${baseClasses} ${className}`;

    return (
        <Link
            href={href}
            className={combinedClasses}
            {...(external || href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
            <span
                className="leading-[100%] text-[14px] tracking-[-0.01em]"
                style={{ fontFamily: 'euclid-Bold' }}
            >
                {children}
            </span>
        </Link>
    );
}

export function ButtonGroup({
    buttons,
    className = '',
    buttonClassName = 'w-[146px] flex justify-center cursor-pointer text-[#323232] hover:bg-green-50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20',
    currentLanguage = 'en'
}: {
    buttons: ApiButtonData[];
    className?: string;
    buttonClassName?: string;
    currentLanguage?: string;
}) {
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