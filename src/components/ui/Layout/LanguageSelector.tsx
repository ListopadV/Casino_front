"use client";

import Image from 'next/image';
import React, { useState } from 'react';

import flagDE from '@/assets/flags/de.png';
import flagFR from '@/assets/flags/fr.png';
import flagGB from '@/assets/flags/gb.png';
import flagIT from '@/assets/flags/it.png';
import flagPL from '@/assets/flags/pl.png';
import flagUKR from '@/assets/flags/ukr.png';
import { changeLanguage } from '@/i18n/i18n';
import { useTranslation } from 'react-i18next';

interface LanguageSelectorProps {
  className?: string; // Пропс для дополнительных классов
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'ENGLISH', flag: flagGB },
    { code: 'it', name: 'ITALIAN', flag: flagIT },
    { code: 'fr', name: 'FRENCH', flag: flagFR },
    { code: 'de', name: 'GERMAN', flag: flagDE },
    { code: 'uk', name: 'UKRAINIAN', flag: flagUKR },
    { code: 'pl', name: 'POLISH', flag: flagPL },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-brand-gray text-white px-4 py-2 flex items-center w-full justify-between transition-all duration-300 rounded-md text-sm" 
      >
        <div className="flex items-center space-x-3">
          <Image src={currentLanguage.flag} alt={currentLanguage.name} width={24} height={16} />
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
            {languages.map((lang) => (
              <li 
                key={lang.code} 
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex items-center space-x-3 px-4 py-2 hover:bg-black/20 cursor-pointer transition-colors text-sm ${
                  i18n.language === lang.code ? 'bg-black/30' : ''
                }`}
              >
                <Image src={lang.flag} alt={lang.name} width={24} height={16} />
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