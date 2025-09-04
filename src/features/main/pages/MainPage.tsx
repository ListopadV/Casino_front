"use client";

import Footer from '@/components/ui/Layout/Footer';
import Header from '@/components/ui/Layout/Header';
import Main from '@/components/ui/Layout/Main';
import AccountModal from '@/features/main/components/AccountModal';
import HeroSection from '@/features/main/components/HeroSection';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BonusesSection from '../components/BonusesSection';
import { CasinosSection } from '../components/CasinosSection';
import LinkSection from '../components/LinksSection';

// Тип точно соответствует вашим "плоским" данным
const MainPage: React.FC = () => {

  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);
  const openAccountModal = () => setIsAccountModalOpen(true);
  const closeAccountModal = () => setIsAccountModalOpen(false);

  // Новая функция для симуляции входа и открытия модального окна
  const handleSimulateLogin = () => {
    handleLogin(); // Установка isLoggedIn в true
    openAccountModal(); // Открытие модального окна
  };

  return (
    <div className="bg-brand-dark">
      <Header 
        isLoggedIn={isLoggedIn}
        onAccountClick={openAccountModal}
        onLogoutClick={handleLogout}
      />

      <Main>

        <HeroSection />

        {/* Окошко для симуляции входа/выхода */}
        <div className="p-4 mx-auto max-w-6xl rounded-lg bg-gray-800 text-white my-4">
            <h3 className="text-xl font-bold mb-3">{t('main.account.title')}:</h3>
            <div className="flex gap-4">
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors"
                >
                    1. {t('main.account.logout')} ({t('main.account.subtitle')})
                </button>
                <button
                    onClick={handleSimulateLogin}
                    className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition-colors"
                >
                    2. {t('auth.login')} ({t('main.account.title')})
                </button>
            </div>
        </div>
        
        {/* --- ИЗМЕНЕНИЕ ЗДЕСЬ --- */}
        {loading ? (
          <div className="flex justify-center items-center p-20 min-h-[300px]">
            <div className="w-16 h-16 border-4 border-white border-solid rounded-full border-t-transparent animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center p-20">{t('common.error')}: {error}</div>
        ) : (
          <BonusesSection />
        )}
        
        <CasinosSection />
        <LinkSection />
      </Main>

      <Footer />
      {isAccountModalOpen && <AccountModal onClose={closeAccountModal} />}
    </div>
  );
};

export default MainPage;