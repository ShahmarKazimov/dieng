'use client';
import Link from 'next/link';
import enTranslations from '@/locales/en.json';
import deTranslations from '@/locales/de.json';
import { useSearchParams, usePathname } from 'next/navigation';

const localTranslationsMap = {
    en: enTranslations,
    de: deTranslations,
};

export default function NavLinks() {
    const searchParams = useSearchParams();
    const pathname = usePathname(); 
    const currentLang = searchParams.get('lang') || 'en';

    const translations = localTranslationsMap[currentLang as 'en' | 'de'] || localTranslationsMap['en'];
    const t = (key: string, fallback?: string) => (translations as Record<string, string>)[key] || fallback || key;

    const navItems = [
        { name: t('about_us', 'About us'), href: '/about' },
        { name: t('products', 'Products & Solutions'), href: '/products' },
        { name: t('services', 'Services'), href: '/services' },
        { name: t('blogs', 'News & Blogs'), href: '/blogs' },
        { name: t('modules', 'Module Overview'), href: '/modules' }
    ];

    return (
        <nav className="flex items-center space-x-8">
            {navItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={`nav-${index}`}
                        href={item.href}
                        className={`relative group text-[14px] leading-[100%] font-[500] transition-colors duration-200
                            ${isActive ? 'text-green-400' : 'text-white hover:text-green-300'}`}
                    >
                        {item.name}
                        <span
                            className={`absolute -bottom-1 left-0 h-0.5 bg-green-400 transition-all duration-300
                                ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                        ></span>
                    </Link>
                );
            })}
        </nav>
    );
}
