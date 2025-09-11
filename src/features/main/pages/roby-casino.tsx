"use client";

import React, { useState } from 'react';


import Footer from '@/components/ui/Layout/Footer';
import Header from '@/components/ui/Layout/Header';
import Main from '@/components/ui/Layout/Main';

import RobyCasinoContent from '@/features/main/components/RobyCasinoContent';
import AccountModal from '@/features/main/components/AccountModal';

const RobyCasinoPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  const handleLogout = () => setIsLoggedIn(false);
  const openAccountModal = () => setIsAccountModalOpen(true);
  const closeAccountModal = () => setIsAccountModalOpen(false);

  return (
    
    <div className="bg-slate-100"> 
      <Header 
        isLoggedIn={isLoggedIn}
        onAccountClick={openAccountModal}
        onLogoutClick={handleLogout}
      />

      <Main>
       
        <RobyCasinoContent />
      </Main>

      <Footer />
      
      {isAccountModalOpen && <AccountModal onClose={closeAccountModal} />}
    </div>
  );
};

export default RobyCasinoPage;