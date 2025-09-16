'use client';

import { LanguageData } from '@/shared/api/apiClient';
import { useAppInitialization } from '@/shared/hooks/useAppInitialization';
import React, { createContext, useContext } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

interface LanguageContextType {
  availableLanguages: LanguageData[];
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  availableLanguages: [],
  isLoading: true,
});

export const useLanguageContext = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: React.ReactNode;
}

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { isReady, loading, error, availableLanguages } = useAppInitialization();

  // Показываем загрузку до полной инициализации
  if (loading || !isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Initializing website...</p>
          {error && (
            <p className="text-red-400 text-sm mt-2">Error: {error}</p>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <LanguageContext.Provider value={{ 
      availableLanguages, 
      isLoading: loading 
    }}>
      <I18nextProvider i18n={i18n}>
        {children}
      </I18nextProvider>
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
