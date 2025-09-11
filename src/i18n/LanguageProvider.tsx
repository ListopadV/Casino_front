'use client';

import { useGeoLocation } from '@/shared/hooks/useGeoLocation';
import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

interface LanguageProviderProps {
  children: React.ReactNode;
}

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  const { location, loading, error } = useGeoLocation();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Автоматически устанавливаем язык на основе геолокации
  useEffect(() => {
    if (location && !loading && !error) {
      const { language } = location;
      const supportedLanguages = ['en', 'fr', 'de', 'it', 'ru', 'uk', 'pl'];
      const finalLanguage = supportedLanguages.includes(language) ? language : 'en';
      
      // Устанавливаем язык только если он отличается от текущего
      if (i18n.language !== finalLanguage) {
        i18n.changeLanguage(finalLanguage);
      }
    }
  }, [location, loading, error]);

  if (!isClient) {
    return <>{children}</>;
  }
  
  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
};

export default LanguageProvider;
