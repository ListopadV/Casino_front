'use client'

import rCasion from "@/assets/roby-casino-logo.jpg";
import React, { useState,useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Bonus } from "../types";
import BonusCard from "./BonusCard";
import { bebasNeue } from "@/shared/ui/theme/fonts";
import { isApiError } from "@/shared/api/apiHelpers";
// const bonuses: Bonus[] = [
//   {
//     id: 1,
//     Name: "Neon Spade",
//     BonusLink: "https://example.com/bonuses/neon-spade",
//     Logo: { url: rCasion.src },
//   },
//   {
//     id: 2,
//     Name: "Lucky Lynx",
//     BonusLink: "https://example.com/bonuses/lucky-lynx",
//     Logo: { url: rCasion.src },
//   },
//   {
//     id: 3,
//     Name: "Golden Kraken",
//     BonusLink: "https://example.com/bonuses/golden-kraken",
//     Logo: { url: rCasion.src },
//   },
// ];


export const BonusesContent: React.FC = () => {
  const { t } = useTranslation();
  
  const [bonuses, setBonuses] = useState<Bonus[]>([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null);

    // потом исправть с react-query 
      useEffect(() => {
    const fetchBonuses = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
        if (!apiUrl) throw new Error("NEXT_PUBLIC_STRAPI_API_URL is not defined.");

        const res = await fetch(`${apiUrl}/api/casino-bonuses?populate=Logo`);
        if (!res.ok) throw new Error(`Failed to fetch bonuses. Status: ${res.status}`);
        
        const bonusesResponse = await res.json();
        
        if (bonusesResponse.data) {
          setBonuses(bonusesResponse.data);
        } else {
          setBonuses([]);
        }

      } catch (error: any) {
          if (isApiError(error)){
            setError("Api was not configured yet.")
          }
      } finally {
        setLoading(false);
      }
    };

    fetchBonuses();
  }, []);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-20">
                <h2 
                  className={`${bebasNeue.className} text-white text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl tracking-wider leading-none mb-8 sm:mb-12 lg:mb-16`}
                  style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)' }}
                >
                  {t('main.bonuses.title')}
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
                  {bonuses.map((bonus) => {
                    const logoUrl = bonus.Logo?.url || ''; 
                    const casinoName = bonus.Name || 'Unnamed Casino';
                    const bonusLink = bonus.BonusLink || '#';
                    
                    return (
                      <div key={bonus.id} className="w-full max-w-sm mx-auto">
                        <BonusCard 
                          logoUrl={logoUrl}
                          casinoName={casinoName}
                          bonusLink={bonusLink}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
    )
}
