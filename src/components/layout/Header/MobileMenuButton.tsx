'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import deTranslations from '@/locales/de.json';
import enTranslations from '@/locales/en.json';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

const localTranslationsMap = {
    en: enTranslations,
    de: deTranslations,
};

export default function MobileMenuButton() {
    const searchParams = useSearchParams();
    const currentLang = searchParams.get('lang') || 'en';

    const translations = localTranslationsMap[currentLang as 'en' | 'de'] || localTranslationsMap['en'];
    const t = (key: string, fallback?: string) =>
        (translations as Record<string, string>)[key] || fallback || key;

    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    const navItems = [
        { name: t('about_us', 'About us'), href: '/about' },
        { name: t('services', 'Services'), href: '/services' },
        { name: t('modules', 'Module Overview'), href: '/modules' },
    ];

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (isOpen && !target.closest('[data-mobile-menu]')) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const menuContent =
        isOpen && (
            <div className="fixed top-0 right-0 z-[9999]" data-mobile-menu>
                <div className="w-[314px] h-screen bg-black shadow-2xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
                    <button
                        onClick={closeMenu}
                        className="absolute top-4 left-4 text-white hover:text-green-300 transition-colors duration-200 z-10"
                        aria-label="Close mobile menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    <nav className="relative flex flex-col justify-start pt-12 h-full pb-20">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block px-6 py-4 text-white hover:bg-white/10 hover:text-green-300 transition-all duration-200 border-b border-white/10 last:border-b-0 text-[14px] font-medium"
                                onClick={closeMenu}
                            >
                                <div className="flex justify-between">
                                    <span>{item.name}</span>
                                    <Image
                                        src="/icons/send.svg"
                                        alt="send"
                                        width={16}
                                        height={16}
                                        className="w-4 h-4"
                                    />
                                </div>
                            </Link>
                        ))}
                    </nav>

                    <div className="absolute bottom-0 left-0 w-full px-6 py-4 border-t border-white/10 bg-black">
                        <Link
                            href="/contact"
                            className="bg-[#FFFFFF] flex w-full justify-center text-[#323232] p-4 rounded-full font-medium"
                            onClick={closeMenu}
                        >
                            <span
                                className="leading-[100%] text-[14px] tracking-[-0.01em]"
                                style={{ fontFamily: 'euclid-Bold' }}
                            >
                                {t('contactUs', 'Contact Us')}
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        );

    return (
        <>
            <div className="md:hidden">
                <button
                    onClick={toggleMenu}
                    className="text-white hover:text-green-300 transition-colors duration-200 p-2"
                    aria-label="Toggle mobile menu"
                    aria-expanded={isOpen}
                    data-mobile-menu
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {isOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            </div>

            {mounted && typeof window !== 'undefined' && createPortal(menuContent, document.body)}
        </>
    );
}
