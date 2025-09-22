"use client";

import { changeLanguage } from '@/i18n/i18n';
import { useLanguageContext } from '@/i18n/LanguageProvider';
import Image from 'next/image';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageSelectorProps {
  className?: string; // Пропс для дополнительных классов
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();
  const { availableLanguages, isLoading } = useLanguageContext();

  if (isLoading || availableLanguages.length === 0) {
    return (
      <div className={`relative ${className}`}>
        <div className="bg-brand-gray text-white px-4 py-2 flex items-center w-full justify-between rounded-md text-sm animate-pulse">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-4 bg-gray-600 rounded"></div>
            <div className="w-16 h-4 bg-gray-600 rounded"></div>
          </div>
          <div className="w-4 h-4 bg-gray-600 rounded"></div>
        </div>
      </div>
    );
  }

  const currentLanguage = availableLanguages.find(lang => lang.code === i18n.language) || availableLanguages[0];

  const handleLanguageChange = async (langCode: string) => {
    try {
      await changeLanguage(langCode);
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-brand-gray text-white px-4 py-2 flex items-center w-full justify-between transition-all duration-300 rounded-md text-sm" 
      >
        <div className="flex items-center space-x-3">
          {currentLanguage.flag ? (
            <Image 
              src={currentLanguage.flag.url} 
              alt={currentLanguage.flag.name} 
              width={24} 
              height={16}
              className="object-cover rounded-sm"
            />
          ) : (
            <div className="w-6 h-4 bg-gray-500 rounded-sm flex items-center justify-center text-xs">
              {currentLanguage.code.toUpperCase()}
            </div>
          )}
          <span>{currentLanguage.name}</span>
        </div>
        <svg
          className={`w-4 h-4 ml-2 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>


      {isOpen && (
        <div className="absolute top-full mt-1 left-0 w-full bg-brand-gray rounded-b-md overflow-hidden shadow-lg animate-fadeInDown z-10">
          <ul>
            {availableLanguages.map((lang) => (
              <li 
                key={lang.code} 
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex items-center space-x-3 px-4 py-2 hover:bg-black/20 cursor-pointer transition-colors text-sm ${
                  i18n.language === lang.code ? 'bg-black/30' : ''
                }`}
              >
                {lang.flag ? (
                  <Image 
                    src={lang.flag.url} 
                    alt={lang.flag.name} 
                    width={24} 
                    height={16}
                    className="object-cover rounded-sm"
                  />
                ) : (
                  <div className="w-6 h-4 bg-gray-500 rounded-sm flex items-center justify-center text-xs">
                    {lang.code.toUpperCase()}
                  </div>
                )}
                <span>{lang.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeInDown { animation: fadeInDown 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default LanguageSelector;