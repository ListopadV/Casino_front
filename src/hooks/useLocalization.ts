import { useTranslation } from 'react-i18next';
import { changeLanguage, languages } from '../i18n/i18n';

export const useLocalization = () => {
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language;
  const availableLanguages = languages;

  const switchLanguage = (lang: string) => {
    if (languages[lang as keyof typeof languages]) {
      changeLanguage(lang);
    }
  };

  const getCurrentLanguageInfo = () => {
    return languages[currentLanguage as keyof typeof languages] || languages.en;
  };

  const isLanguageSupported = (lang: string) => {
    return lang in languages;
  };

  const getLanguageName = (lang: string) => {
    return languages[lang as keyof typeof languages]?.nativeName || lang;
  };

  const getLanguageFlag = (lang: string) => {
    return languages[lang as keyof typeof languages]?.flag || '🌐';
  };

  return {
    t,
    currentLanguage,
    availableLanguages,
    switchLanguage,
    getCurrentLanguageInfo,
    isLanguageSupported,
    getLanguageName,
    getLanguageFlag,
    i18n
  };
};
