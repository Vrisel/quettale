import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './en.json';
import ko from './ko.json';

export const languages = ['en', 'ko', 'ko-KR'] as const;
export type Language = typeof languages[number];

export const resources = {
  'en': { translation: en },
  'ko': { translation: ko },
  'ko-KR': { translation: ko },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV !== 'production',

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
