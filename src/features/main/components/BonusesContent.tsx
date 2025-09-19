// src/features/main/components/BonusesContent.tsx
'use client'

import { useBonuses } from "@/shared/hooks/useBonuses";
import { useLanguageChange } from "@/shared/hooks/useLanguageChange";
import BonusesEmptyState from "@/shared/ui/BonusesEmptyState";
import { bebasNeue } from "@/shared/ui/theme/fonts";
import React from "react";
import { useTranslation } from "react-i18next";
import BonusCard from "./BonusCard";

export const BonusesContent: React.FC = () => {
  const { t } = useTranslation();
  const currentLanguage = useLanguageChange();

  const { bonuses, loading, error } = useBonuses(currentLanguage);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-20">
                <h2 
                  className={`${bebasNeue.className} text-white text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl tracking-wider leading-none mb-8 sm:mb-12 lg:mb-16`}
                  style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)' }}
                >
                  {t('main.bonuses.title')}
                </h2>
                
                {loading ? (
                  <div className="flex justify-center items-center py-12 sm:py-16 lg:py-20">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-white border-solid rounded-full border-t-transparent animate-spin"></div>
                  </div>
                ) : error ? (
                  <div className="text-red-500 text-center text-lg sm:text-xl lg:text-2xl py-12 sm:py-16 lg:py-20">
                    Error: {error}
                  </div>
                ) : bonuses.length === 0 ? (
                  <BonusesEmptyState />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
                    {bonuses.map((bonus) => {
                      const logoUrl = bonus.Logo?.data?.attributes?.url || ''; 
                      const casinoName = bonus.Name || 'Unnamed Casino';
                      const bonusLink = bonus.BonusLink || '#';
                      const slug = bonus.slug; // Получаем slug
                      
                      return (
                        <div key={bonus.id} className="w-full max-w-sm mx-auto">
                          <BonusCard 
                            logoUrl={logoUrl}
                            casinoName={casinoName}
                            bonusLink={bonusLink}
                            slug={slug} // Передаем slug в BonusCard
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
    )
}