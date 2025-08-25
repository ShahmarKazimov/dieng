'use client';

import Button from '@/components/ui/Button';
import Image from 'next/image';
import buttonIcon1 from '../../../../public/icons/google-play.svg';
import buttonIcon2 from '../../../../public/icons/App,Store.svg';
import deTranslations from '@/locales/de.json';
import enTranslations from '@/locales/en.json';
import { useSearchParams } from 'next/navigation';

const localTranslationsMap = {
    en: enTranslations,
    de: deTranslations,
};

export default function FooterButton() {
    const searchParams = useSearchParams();
    const currentLang = searchParams.get('lang') || 'en';

    const translations = localTranslationsMap[currentLang as 'en' | 'de'] || localTranslationsMap['en'];
    const t = (key: string, fallback?: string) => (translations as Record<string, string>)[key] || fallback || key;

    return (
        <div className='flex flex-col gap-y-3'>
            <Button href="https://play.google.com/store/apps/details?id=com.woodinvision.wivapp&hl=en" className='bg-[#131825] w-[146px] flex justify-center text-[#FFFFFF]'>
                <div className="flex items-center space-x-2">
                    <span>{t('google_play', 'Google Play')}</span>
                    <Image
                        width={16}
                        height={16}
                        src={buttonIcon1}
                        alt="icon-in-button"
                        className="w-4 h-4"
                    />
                </div>
            </Button>
            <Button href="#" className='bg-[#131825] w-[146px] flex justify-center text-[#FFFFFF]'>
                <div className="flex items-center space-x-2">
                    <span>{t('app_store', 'App Store')}</span>
                    <Image
                        width={16}
                        height={16}
                        src={buttonIcon2}
                        alt="icon-in-button"
                        className="w-4 h-4"
                    />
                </div>
            </Button>
        </div>
    );
}
