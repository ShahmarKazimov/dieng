'use client'

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { submitContactForm } from '@/app/actions/contact';
import { type ContactFormState } from '@/lib/types/contact.types';

import enTranslations from '@/locales/en.json';
import deTranslations from '@/locales/de.json';
import { useSearchParams } from 'next/navigation';

const localTranslationsMap = {
  en: enTranslations,
  de: deTranslations,
} as const;

type LanguageKey = keyof typeof localTranslationsMap;

function SubmitButton() {
  const searchParams = useSearchParams();
  const currentLang = (searchParams.get('lang') as LanguageKey) || 'en';

  const translations = localTranslationsMap[currentLang] || localTranslationsMap['en'];
  const t = (key: string, fallback?: string): string => {
    return (translations as Record<string, string>)[key] || fallback || key;
  };
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2.5 px-4 py-4 rounded-lg font-[euclid-Bold] text-sm leading-none tracking-tight transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b8e92f] text-[#323232] bg-[#bcee30] hover:bg-[#a7d42b] hover:shadow-md w-28 cursor-pointer"
    >
      {pending ? (
        <>
          <div className="w-4 h-4 whitespace-nowrap border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          {t('sending', 'Sending...')}
        </>
      ) : (
        t('submit', 'Submit')
      )}
    </button>
  )
}

const initialState: ContactFormState = {
  message: '',
}

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState)
  const [isClient, setIsClient] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [clearedErrors, setClearedErrors] = useState<Set<string>>(new Set())

  const searchParams = useSearchParams();
  const currentLang = (searchParams.get('lang') as LanguageKey) || 'en';
  const translations = localTranslationsMap[currentLang] || localTranslationsMap['en'];
  const t = (key: string, fallback?: string): string => {
    return (translations as Record<string, string>)[key] || fallback || key;
  };

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (state.message) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state.message]);

  useEffect(() => {
    if (state.errors) {
      setClearedErrors(new Set());
    }
  }, [state.errors]);

  const handleInputFocus = (fieldName: string): void => {
    setClearedErrors(prev => new Set([...prev, fieldName]));
  };

  const shouldShowError = (fieldName: string): boolean => {
    return !!(state.errors?.[fieldName as keyof typeof state.errors] && !clearedErrors.has(fieldName));
  };

  if (!isClient) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-16 bg-[#242832] rounded-lg animate-pulse" />
            <div className="h-16 bg-[#242832] rounded-lg animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-16 bg-[#242832] rounded-lg animate-pulse" />
            <div className="h-16 bg-[#242832] rounded-lg animate-pulse" />
          </div>
          <div className="h-16 bg-[#242832] rounded-lg animate-pulse" />
          <div className="h-32 bg-[#242832] rounded-lg animate-pulse" />
          <div className="h-12 w-24 bg-gray-700 rounded-lg animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div>
      <form action={formAction} className="space-y-3">
        {showMessage && state.message && (
          <div
            className={`p-4 rounded-lg ${state.success
              ? 'bg-green-100 text-green-800 border border-green-200'
              : 'bg-red-100 text-red-800 border border-red-200'
              }`}
            aria-live="polite"
          >
            {state.message}
          </div>
        )}

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label htmlFor="name" className="block text-[#BDB8B8] mb-3">
              {t('firstName', 'First Name')}*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder={t('firstNamePlaceholder', 'First Name')}
              required
              autoComplete="given-name"
              suppressHydrationWarning
              onFocus={() => handleInputFocus('name')}
              className="w-full p-3 bg-[#353D35] border border-[#3A5630] text-[#BDB8B8] placeholder-[#BDB8B8] focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
              aria-invalid={shouldShowError('name') ? 'true' : 'false'}
            />
            {shouldShowError('name') && state.errors?.name && (
              <p className="mt-1 text-sm text-red-400">
                {state.errors.name[0]}
              </p>
            )}
          </div>

          <div className="relative">
            <label htmlFor="surname" className="block text-[#BDB8B8] mb-3">
              {t('lastName', 'Last Name')}*
            </label>
            <input
              type="text"
              id="surname"
              name="surname"
              placeholder={t('lastNamePlaceholder', 'Last Name')}
              required
              autoComplete="family-name"
              suppressHydrationWarning
              onFocus={() => handleInputFocus('surname')}
              className="w-full p-3 bg-[#353D35] border border-[#3A5630] text-[#BDB8B8] placeholder-[#BDB8B8] focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
              aria-invalid={shouldShowError('surname') ? 'true' : 'false'}
            />
            {shouldShowError('surname') && state.errors?.surname && (
              <p className="mt-1 text-sm text-red-400">
                {state.errors.surname[0]}
              </p>
            )}
          </div>
        </div>

        {/* Email and Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label htmlFor="email" className="block text-[#BDB8B8] mb-3">
              {t('email', 'Email Address')}*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder={t('emailPlaceholder', 'Email Address')}
              required
              autoComplete="email"
              suppressHydrationWarning
              onFocus={() => handleInputFocus('email')}
              className="w-full p-3 bg-[#353D35] border border-[#3A5630] text-[#BDB8B8] placeholder-[#BDB8B8] focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
              aria-invalid={shouldShowError('email') ? 'true' : 'false'}
            />
            {shouldShowError('email') && state.errors?.email && (
              <p className="mt-1 text-sm text-red-400">
                {state.errors.email[0]}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-[#BDB8B8] mb-3">
              {t('phone', 'Phone Number')}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder={t('phonePlaceholder', 'Phone Number')}
              autoComplete="tel"
              suppressHydrationWarning
              onFocus={() => handleInputFocus('phone')}
              className="w-full p-3 bg-[#353D35] border border-[#3A5630] text-[#BDB8B8] placeholder-[#BDB8B8] focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
            />
            {shouldShowError('phone') && state.errors?.phone && (
              <p className="mt-1 text-sm text-red-400">
                {state.errors.phone[0]}
              </p>
            )}
          </div>
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-[#BDB8B8] mb-3">
            {t('company', 'Company')}
          </label>
          <input
            type="text"
            id="company"
            name="company"
            placeholder={t('companyPlaceholder', 'Company')}
            autoComplete="organization"
            suppressHydrationWarning
            onFocus={() => handleInputFocus('company')}
            className="w-full p-3 bg-[#353D35] border border-[#3A5630] text-[#BDB8B8] placeholder-[#BDB8B8] focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
          />
          {shouldShowError('company') && state.errors?.company && (
            <p className="mt-1 text-sm text-red-400">
              {state.errors.company[0]}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-[#BDB8B8] mb-3">
            {t('message', 'Your Message')}*
          </label>
          <textarea
            id="message"
            name="message"
            rows={1}
            placeholder={t('messagePlaceholder', 'Your Message')}
            required
            suppressHydrationWarning
            onFocus={() => handleInputFocus('message')}
            className="w-full p-3 bg-[#353D35] border border-[#3A5630] text-[#BDB8B8] placeholder-[#BDB8B8] focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
            aria-invalid={shouldShowError('message') ? 'true' : 'false'}
          />
          {shouldShowError('message') && state.errors?.message && (
            <p className="mt-1 text-sm text-red-400">
              {state.errors.message[0]}
            </p>
          )}
        </div>

        <div className="flex justify-start">
          <SubmitButton />
        </div>
      </form>
    </div>
  )
}