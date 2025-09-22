'use client' 

import cloverImage from '@/assets/clover-white.png';
import { useCasinos } from '@/features/main/hooks/useCasinos';
import { useLanguageChange } from '@/shared/hooks/useLanguageChange';
import { useIntersectionObserver } from '@/shared/hooks/usentersectionObserver';
import CasinosEmptyState from '@/shared/ui/CasinosEmptyState';
import { bebasNeue } from '@/shared/ui/theme/fonts';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { OnlineCasino } from '../types';

interface OnlineCasinoCardProps {
  casino: OnlineCasino;
}

const OnlineCasinoCard: React.FC<OnlineCasinoCardProps> = ({ casino }) => {
  const { t } = useTranslation();
  const [cardRef, isIntersecting] = useIntersectionObserver();
  return (
    <Link 
      href={`/online-casino/${casino.slug}`} 
      className="block cursor-pointer"
    >
      <div
        ref={cardRef}
        className={`relative flex flex-col rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl transition-all duration-700 hover:scale-105 aspect-[9/11] bg-brand-accent-red-alt ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}
      >
        <div className="relative bg-black rounded-t-[1.5rem] sm:rounded-t-[2rem] rounded-b-[2rem] sm:rounded-b-[3rem] z-10 flex flex-col items-center p-3 sm:p-4 h-[60%]">
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-brand-accent-red-alt rounded-full px-2 sm:px-4 py-1 sm:py-2 flex items-center gap-1 sm:gap-2 shadow-md">
            <Image src={cloverImage} alt="Clover" width={12} height={12} className="sm:w-4 sm:h-4" />
            <span className={`${bebasNeue.className} text-brand-light-gray text-sm sm:text-base tracking-wider`}>{casino.Rating_Num}/10</span>
          </div>
          <div className="flex-grow flex items-center justify-center w-full max-w-[75%] pt-1 sm:pt-2 md:pt-4">
            {casino.Logo?.url ? (
              <Image 
                src={casino.Logo.url} 
                alt={`${casino.Name} Logo`} 
                width={300}
                height={150}
                quality={100} 
                style={{ objectFit: "contain" }} 
                className="w-full h-auto max-h-[80px] sm:max-h-[100px] md:max-h-[120px]"
              />
            ) : (
              <div className="text-gray-500 text-sm">No Logo</div>
            )}
          </div>
          <h3 className={`${bebasNeue.className} text-brand-light-gray leading-none -skew-x-12 tracking-wide mt-auto px-1 sm:px-2 text-center text-lg sm:text-xl md:text-2xl lg:text-3xl`}>
            <span className="block truncate max-w-full">{casino.Name}</span>
          </h3>
        </div>
        
        <div className="h-[40%] overflow-hidden">
          <div 
            className={`h-full w-full flex flex-col justify-between items-center py-3 sm:py-4 transition-all duration-700 ease-out delay-200 ${isIntersecting ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
          >
            <div className="flex justify-center items-center w-[85%] h-6 sm:h-8 md:h-10 gap-x-1 sm:gap-x-2">
              <div className="h-full flex-1 border-l-2 border-white rounded-tl-full rounded-bl-full"></div>
              {casino.Welcome_pack && ( 
                <span className={`${bebasNeue.className} text-white text-xs sm:text-sm md:text-base lg:text-lg tracking-wider px-1 sm:px-2 text-center`}>
                  <span className="block truncate max-w-[120px] sm:max-w-[150px]">{casino.Welcome_pack}</span>
                </span>
              )}
              <div className="h-full flex-1 border-r-2 border-white rounded-tr-full rounded-br-full"></div>
            </div>
            <div className="w-full flex justify-center">
              <button className={`${bebasNeue.className} bg-brand-light-gray text-brand-accent-red-alt font-bold rounded-full hover:bg-opacity-90 transition-all duration-200 tracking-wider py-1 sm:py-1.5 md:py-2 px-4 sm:px-6 md:px-8 text-sm sm:text-base md:text-lg lg:text-xl`}>
                {t('games.playNow')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const CasinosContent = () => {
  const { t } = useTranslation();
  const currentLanguage = useLanguageChange();
  const { casinos, loading, error } = useCasinos(currentLanguage);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-20">
      <h1
        className={`${bebasNeue.className} text-brand-light-gray text-center tracking-wider leading-none mb-8 sm:mb-12 lg:mb-16 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl`}
        style={{ textShadow: '3px 3px 10px rgba(0, 0, 0, 0.7)' }}
      >
        {t('main.casinos.title')}
      </h1>
      {loading ? (
        <div className="flex justify-center items-center py-12 sm:py-16 lg:py-20">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-white border-solid rounded-full border-t-transparent animate-spin"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center text-lg sm:text-xl lg:text-2xl py-12 sm:py-16 lg:py-20">Error: {error}</div>
      ) : casinos.length === 0 ? (
        <CasinosEmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {casinos.map((casino) => (
            <div key={casino.id} className="w-full max-w-sm mx-auto">
              <OnlineCasinoCard casino={casino} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}