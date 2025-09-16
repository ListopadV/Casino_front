import { loadTranslationsFromStrapi } from '@/shared/api/apiClient';
import i18n, { InitOptions } from 'i18next';
import Cookies from 'js-cookie';
import { initReactI18next } from 'react-i18next';

// Supported languages based on Strapi Translation schema
export const SUPPORTED_LANGUAGES = ['en', 'pl', 'ru', 'ukr', 'de', 'fr', 'it'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

/**
 * Загружает переводы для указанного языка из Strapi
 */
export async function loadTranslations(locale: string) {
  try {
    const translations = await loadTranslationsFromStrapi(locale);
    
    if (translations) {
      i18n.addResourceBundle(locale, 'translation', translations, true, true);
      await i18n.changeLanguage(locale);
      return true;
    }
  } catch (err) {
    console.error(`Failed to load translations for ${locale}:`, err);
    return false;
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources: {}, // Start with empty resources, will be loaded dynamically
    lng: 'en', // Default to English until geo-location determines the correct language
    fallbackLng: ['en', 'ru', 'pl'], // Fallback languages
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

/**
 * Проверяет, поддерживается ли язык системой
 */
export const isSupportedLanguage = (lang: string): lang is SupportedLanguage => {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
};

/**
 * Изменяет язык приложения, загружая переводы из Strapi
 */
export const changeLanguage = async (lang: string): Promise<boolean> => {
  if (!isSupportedLanguage(lang)) {
    console.warn(`Language ${lang} is not supported. Falling back to English.`);
    lang = 'en';
  }

  try {
    const success = await loadTranslations(lang);
    if (success) {
      if (typeof window !== 'undefined') {
        Cookies.set('i18nextLng', lang, { expires: 365, path: '/' });
      }
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Failed to change language to ${lang}:`, error);
    return false;
  }
};

export const initializeI18nWithGeoLocation = async (geoLanguage?: string): Promise<void> => {
  const savedLanguage = Cookies.get('i18nextLng');
  
  let targetLanguage = 'en';
  
  if (savedLanguage && isSupportedLanguage(savedLanguage)) {
    targetLanguage = savedLanguage;
  } else if (geoLanguage && isSupportedLanguage(geoLanguage)) {
    targetLanguage = geoLanguage;
  }
  
  try {
    await changeLanguage(targetLanguage);
  } catch (error) {
    console.error('Failed to initialize i18n:', error);
    await changeLanguage('en');
  }
};

export default i18n;