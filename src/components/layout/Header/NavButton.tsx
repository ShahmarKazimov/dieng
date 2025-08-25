'use client';

import Button from '@/components/ui/Button';
import deTranslations from '@/locales/de.json';
import enTranslations from '@/locales/en.json';
import { useSearchParams } from 'next/navigation';

const localTranslationsMap = {
    en: enTranslations,
    de: deTranslations,
};

export default function NavButton() {
    const searchParams = useSearchParams();
    const currentLang = searchParams.get('lang') || 'en';

    const translations = localTranslationsMap[currentLang as 'en' | 'de'] || localTranslationsMap['en'];
    const t = (key: string, fallback?: string) => (translations as Record<string, string>)[key] || fallback || key;

    return (
        <Button href="/contact" className='bg-white px-6 text-[#323232] hover:bg-green-50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20'>
            <div className="flex items-center space-x-2">
                <span>{t('contactUs', 'Contact Us')}</span>
            </div>
        </Button>
    );
}
