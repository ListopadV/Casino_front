'use client'; 
import React from 'react';
import { Bonus } from '@/shared/api/bonusesApi';
import { OnlineCasino } from '@/features/main/types';
import Header from '@/components/ui/Layout/Header';
import Main from '@/components/ui/Layout/Main';
import Footer from '@/components/ui/Layout/Footer';
import DynamicCasinoContent from './DynamicCasinoContent';

interface CasinoBonusPageClientProps {
  data: Bonus | OnlineCasino;
}

const CasinoBonusPageClient: React.FC<CasinoBonusPageClientProps> = ({ data }) => {
  const isLoggedIn = false;

  const handleAccountClick = () => {
    console.log("Account button clicked!");
  };

  const handleLogoutClick = () => {
    console.log("Logout button clicked!");
  };

  return (
    <div className="bg-slate-100">
      <Header
        isLoggedIn={isLoggedIn}
        onAccountClick={handleAccountClick}
        onLogoutClick={handleLogoutClick}
      />
      <Main>
        <DynamicCasinoContent bonusData={data} />
      </Main>
      <Footer />
    </div>
  );
};

export default CasinoBonusPageClient;