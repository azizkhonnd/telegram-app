'use client';

import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { PropsWithChildren, useEffect, useState } from 'react';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationUZ from './lang/locales/uz/uz.json';
import translationEN from './lang/locales/en/en.json';
import translationRU from './lang/locales/ru/ru.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      uz: { translation: translationUZ },
      en: { translation: translationEN },
      ru: { translation: translationRU }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export function CustomI18nProvider({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
}
