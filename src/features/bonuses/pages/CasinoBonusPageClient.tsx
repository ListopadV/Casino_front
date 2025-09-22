'use client'; 
import Footer from '@/components/ui/Layout/Footer';
import Header from '@/components/ui/Layout/Header';
import Main from '@/components/ui/Layout/Main';
import { useBonusDetail } from '@/features/bonuses/hooks/useBonusDetail';
import React from 'react';
import DynamicCasinoContent from '../components/DynamicBonusContent';
import { useLanguageChange } from '@/shared/hooks/useLanguageChange';

interface CasinoBonusPageClientProps {
  slug: string;
}

const CasinoBonusPageClient: React.FC<CasinoBonusPageClientProps> = ({ slug }) => {
  const currentLanguage = useLanguageChange();
  const { data: bonusData, loading, error } = useBonusDetail(slug, currentLanguage);
  const isLoggedIn = false;

  const handleAccountClick = () => {
    console.log("Account button clicked!");
  };

  const handleLogoutClick = () => {
    console.log("Logout button clicked!");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-black">Loading bonus details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <div className="text-center">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!bonusData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <div className="text-center">
          <p className="text-gray-600">Bonus not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-100">
      <Header
        isLoggedIn={isLoggedIn}
        onAccountClick={handleAccountClick}
        onLogoutClick={handleLogoutClick}
      />
      <Main>
        <DynamicCasinoContent bonusData={bonusData} />
      </Main>
      <Footer />
    </div>
  );
};

export default CasinoBonusPageClient;