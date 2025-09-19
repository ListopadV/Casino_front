// src/app/casino-bonus/[slug]/page.tsx
'use client' 

import { useBonusDetail } from '@/shared/hooks/useBonusDetail';
import { useLanguageChange } from '@/shared/hooks/useLanguageChange';
import { notFound } from 'next/navigation';
import React, { use, useState } from 'react';
import DynamicCasinoContent from './DynamicCasinoContent';

import Footer from '@/components/ui/Layout/Footer';
import Header from '@/components/ui/Layout/Header';
import Main from '@/components/ui/Layout/Main';
import AccountModal from '@/features/main/components/AccountModal';


interface CasinoBonusDetailPageProps {
  params: Promise<{ slug: string }>;
}

const CasinoBonusDetailPage: React.FC<CasinoBonusDetailPageProps> = ({ params }) => {

  // Просто используем use() для Promise
  const resolvedParams = use(params);
  const currentLanguage = useLanguageChange(); 
  
  // Используем новый хук для загрузки данных бонуса
  const { bonus: bonusData, loading, error } = useBonusDetail(
    resolvedParams?.slug || '', 
    currentLanguage || 'en'
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  const handleLogout = () => setIsLoggedIn(false);
  const openAccountModal = () => setIsAccountModalOpen(true);
  const closeAccountModal = () => setIsAccountModalOpen(false);

  // Проверяем, что данные загружены, но бонус не найден
  if (!loading && !bonusData && !error) {
    notFound(); // Next.js функция для отображения 404 страницы
  }

  if (!currentLanguage || loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="w-16 h-16 border-4 border-white border-solid rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center text-xl py-20 bg-gray-900 text-white">
        {error}
      </div>
    );
  }

  if (!bonusData) {
    return (
        <div className="text-gray-400 text-center text-xl py-20 bg-gray-900 text-white">
            Casino not found.
        </div>
    );
  }

  return (
    <div className="bg-slate-100"> 
      <Header 
        isLoggedIn={isLoggedIn}
        onAccountClick={openAccountModal}
        onLogoutClick={handleLogout}
      />

      <Main>
        {/* Здесь мы рендерим наш динамический контент */}
        <DynamicCasinoContent bonusData={bonusData} />
      </Main>

      <Footer />
      
      {isAccountModalOpen && <AccountModal onClose={closeAccountModal} />}
    </div>
  );
};

export default CasinoBonusDetailPage;