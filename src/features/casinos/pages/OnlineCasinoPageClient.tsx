'use client'; 
import Footer from '@/components/ui/Layout/Footer';
import Header from '@/components/ui/Layout/Header';
import Main from '@/components/ui/Layout/Main';
import { useOnlineCasinoDetail } from '@/features/casinos/hooks/useCasinoDetail';
import React from 'react';
import DynamicOnlineCasinoContent from '../components/DynamicOnlineCasinoContent';

interface OnlineCasinoPageClientProps {
  slug: string;
}

export const OnlineCasinoPageClient: React.FC<OnlineCasinoPageClientProps> = ({ slug }) => {
  const { data: casinoData, loading, error } = useOnlineCasinoDetail(slug);
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
          <p className="text-black">Loading casino details...</p>
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

  if (!casinoData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <div className="text-center">
          <p className="text-gray-600">Casino not found</p>
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
        <DynamicOnlineCasinoContent casinoData={casinoData} />
      </Main>
      <Footer />
    </div>
  );
};