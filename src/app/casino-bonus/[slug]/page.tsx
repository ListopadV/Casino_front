// src/app/casino-bonus/[slug]/page.tsx
'use client' 

import { notFound } from 'next/navigation';
import { bonusesApi, Bonus } from '@/shared/api/bonusesApi';
import { useLanguageChange } from '@/shared/hooks/useLanguageChange'; 
import DynamicCasinoContent from './DynamicCasinoContent'; 
import React, { useState, useEffect } from 'react';

import Footer from '@/components/ui/Layout/Footer';
import Header from '@/components/ui/Layout/Header';
import Main from '@/components/ui/Layout/Main';
import AccountModal from '@/features/main/components/AccountModal';


interface CasinoBonusDetailPageProps {
  params: { slug: string };
}

const CasinoBonusDetailPage: React.FC<CasinoBonusDetailPageProps> = ({ params }) => {
  const currentLanguage = useLanguageChange(); 
  const [bonusData, setBonusData] = useState<Bonus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  const handleLogout = () => setIsLoggedIn(false);
  const openAccountModal = () => setIsAccountModalOpen(true);
  const closeAccountModal = () => setIsAccountModalOpen(false);

  useEffect(() => {
    if (!params.slug || !currentLanguage) return;

    const fetchBonus = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await bonusesApi.getBonusBySlug(params.slug, currentLanguage);
        if (!data) {
          notFound(); // Next.js функция для отображения 404 страницы
        }
        setBonusData(data);
      } catch (err) {
        console.error('Error fetching bonus:', err);
        setError('Failed to load casino details.');
      } finally {
        setLoading(false);
      }
    };

    fetchBonus();
  }, [params.slug, currentLanguage]);

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