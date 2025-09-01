'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const DEFAULT_LANGUAGES = ['en', 'de'];

export default function LangSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  const selectedLang = searchParams.get('lang') || 'en';

  const isHomePage = pathname === '/';

  useEffect(() => {
    setMounted(true);
  }, []);

  function updateURLWithLanguage(newLang: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('lang', newLang);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function setCookieLanguage(lang: string) {
    document.cookie = `preferred-language=${lang}; path=/; max-age=31536000; SameSite=Lax`;
  }

  function changeLanguage(newLang: string) {
    setCookieLanguage(newLang);
    updateURLWithLanguage(newLang);
  }

  if (!mounted) return null;

  return (
    <div>
      <select
        value={selectedLang}
        onChange={(e) => changeLanguage(e.target.value)}
        aria-label="Select language"
        className={`cursor-pointer rounded-md text-[16px] sm:text-sm outline-none ${isHomePage ? 'text-black' : 'text-white'
          }`}
      >
        {DEFAULT_LANGUAGES.map(code => (
          <option
            key={code}
            value={code}
            className="bg-[#1d222e] text-white text-[10px] sm:text-sm"
          >
            {code.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
