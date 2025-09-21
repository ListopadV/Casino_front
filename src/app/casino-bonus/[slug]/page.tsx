import { bonusesApi } from '@/shared/api/bonusesApi';
import { casinosApi } from '@/shared/api/casinosApi';
import { notFound } from 'next/navigation';
import React from 'react';
import CasinoBonusPageClient from './CasinoBonusPageClient'; 

interface CasinoBonusDetailPageProps {
  params: { slug: string };
}

const CasinoBonusDetailPage = async ({ params }: CasinoBonusDetailPageProps) => {
  const slug = params.slug;
  const currentLanguage = 'en';

  const bonusData = await bonusesApi.getBonusBySlug(slug, currentLanguage, { cache: 'no-store' });
  const casinoData = await casinosApi.getCasinoBySlug(slug, currentLanguage, { cache: 'no-store' });
  
  const finalData = bonusData || casinoData;

  if (!finalData) {
    notFound();
  }

  return <CasinoBonusPageClient data={finalData} />;
};

export default CasinoBonusDetailPage;