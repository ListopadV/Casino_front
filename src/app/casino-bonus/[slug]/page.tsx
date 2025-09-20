import { bonusesApi } from '@/shared/api/bonusesApi';
import { notFound } from 'next/navigation';
import React from 'react';
import DynamicCasinoContent from './DynamicCasinoContent';

import Footer from '@/components/ui/Layout/Footer';
import Header from '@/components/ui/Layout/Header';
import Main from '@/components/ui/Layout/Main';

interface CasinoBonusDetailPageProps {
  params: { slug: string };
}

const CasinoBonusDetailPage = async ({ params }: CasinoBonusDetailPageProps) => {
  const slug = params.slug;
  const currentLanguage = 'en'; 

  const bonusData = await bonusesApi.getBonusBySlug(
    slug, 
    currentLanguage,
    { cache: 'no-store' } 
  );

  if (!bonusData) {
    notFound();
  }
  
  const isLoggedIn = false; 

  return (
    <div className="bg-slate-100"> 
      <Header isLoggedIn={isLoggedIn} />

      <Main>
        <DynamicCasinoContent bonusData={bonusData} />
      </Main>

      <Footer />
    </div>
  );
};

export default CasinoBonusDetailPage;