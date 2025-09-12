import i18n, { InitOptions } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import ICU from 'i18next-icu';
import Cookies from 'js-cookie';
import { initReactI18next } from 'react-i18next';

// Import language resources
import translationEN from './english/translation.json';
import translationFR from './french/translation.json';
import translationDE from './german/translation.json';
import translationIT from './italian/translation.json';
import translationPL from './polish/translation.json';
import translationRU from './russian/translation.json';
import translationUK from './ukrainian/translation.json';
import translationBE from './belorussian/translation.json';


// Define available languages
export const languages = {
  en: { nativeName: 'English', flag: '🇺🇸' },
  fr: { nativeName: 'Français', flag: '🇫🇷' },
  de: { nativeName: 'Deutsch', flag: '🇩🇪' },
  it: { nativeName: 'Italiano', flag: '🇮🇹' },
  ru: { nativeName: 'Русский', flag: '🇷🇺' },
  uk: { nativeName: 'Українська', flag: '🇺🇦' },
  pl: { nativeName: 'Polski', flag: '🇵🇱' },
  be: { nativeName: 'беларуская', flag: 'be' },
};

const resources = {
  en: {
    translation: translationEN
  },
  fr: {
    translation: translationFR
  },
  de: {
    translation: translationDE
  },
  it: {
    translation: translationIT
  },
  ru: {
    translation: translationRU
  },
  uk: {
    translation: translationUK
  },
  pl: {
    translation: translationPL
  },
  be: {
    translation: translationBE
  },
}; 

// Get saved language from cookies or use browser preference
const savedLanguage = Cookies.get('i18nextLng');

const getBrowserLanguage = (): string => {
  if (typeof window !== 'undefined' && navigator?.language) {
    return navigator.language.split('-')[0];
  }
  return 'en'; // fallback for SSR
};

i18n
  .use(ICU)
  // Load translations from backend (useful for larger projects)
  .use(Backend)
  // Detect user language
  .use(LanguageDetector)
  // Pass i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    lng: savedLanguage || getBrowserLanguage(), // Use cookie language or browser language
    fallbackLng: ['en', 'ru', 'pl'], // Fallback to English, Russian or Polish if translation is missing
    pluralSeparator: '||',
    keySeparator: '.', // Use dot notation for nested translations
    interpolation: {
      escapeValue: false, // React already escapes values
      format: (value: unknown, format: string) => {
        if (format === 'plural') {
          return value;
        }
        return value;
      }
    },
    detection: {
      order: ['cookie', 'localStorage', 'navigator'],
      lookupCookie: 'i18nextLng',
      caches: ['cookie'],
      cookieExpirationDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 year
      cookieDomain: typeof window !== 'undefined' ? window.location.hostname : 'localhost'
    }
  } as InitOptions);

// Create a helper function to change language and save to cookies
export const changeLanguage = (lang: string) => {
  if (languages[lang as keyof typeof languages]) {
    if (typeof window !== 'undefined') {
      Cookies.set('i18nextLng', lang, { expires: 365, path: '/' });
    }
    i18n.changeLanguage(lang);
  }
};


export default i18n;