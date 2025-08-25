// src/lib/hooks/useTranslation.ts
"use client";

import { useCallback, useEffect, useState } from "react";

type Translations = Record<string, string>;

export function useTranslation(lang: string) {
  const [translations, setTranslations] = useState<Translations>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTranslations = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await import(`../../locales/${lang}.json`);
      const translationData = data.default || data;
      setTranslations(translationData);
    } catch (e: unknown) {
      console.error("Translation loading error:", e);
      setError(e instanceof Error ? e.message : String(e));
      setTranslations({});
    } finally {
      setLoading(false);
    }
  }, [lang]);

  useEffect(() => {
    loadTranslations();
  }, [loadTranslations]);

  const t = useCallback(
    (key: string, fallback?: string) => {
      return translations[key] || fallback || key;
    },
    [translations]
  );

  return {
    t,
    loading,
    error,
    retry: loadTranslations,
  };
}
