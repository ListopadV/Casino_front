'use client'

import newsBlock from '@/assets/news-block.png';
import phoneWithHand from '@/assets/phone-with-hand.png';
import { bebasNeue, roboto } from '@/shared/ui/theme/fonts';
import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface HeroContentProps {
  isVisible: boolean;
}

export const HeroContent: React.FC<HeroContentProps> = ({ isVisible }) => {
  const { t } = useTranslation();
  
  return (
    // ИЗМЕНЕНИЕ 1: Добавлен класс `relative` для создания контекста позиционирования
    <div className="relative h-full flex items-center pt-16 sm:pt-12 md:pt-10 lg:pt-12 xl:pt-20">
      
      {/* ИЗМЕНЕНИЕ 2: Блок новостей вынесен из контейнера и спозиционирован абсолютно */}
      <div className="absolute left-0 top-20 hidden lg:block z-20">
        <Image src={newsBlock} alt="News" width={120} height={360} />
      </div>

      <div className="h-full container mx-auto px-4 relative z-20">
        {/* ИЗМЕНЕНИЕ 3: Структура сетки упрощена, так как блок новостей больше не является её частью */}
        <div className="h-full grid lg:grid-cols-2 items-center lg:items-center sm:items-end gap-8">
          {/* Текстовая часть (без изменений) */}
          <div
            className={`transition-all duration-700 xl:self-center ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
            }`}
          >
            <div className="text-center lg:text-left">
              <h1 className={`${bebasNeue.className} font-normal uppercase leading-none`}>
                <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl -skew-x-12">
                  {t('main.hero.title')}
                </span>
              </h1>
              <p className={`${roboto.className} text-white/50 mt-6 text-base lg:text-lg`}>
                {t('main.hero.subtitle')}
              </p>
            </div>
          </div>

          {/* Картинка телефона (без изменений) */}
          <div
            className={`
              flex justify-center sm:self-end lg:justify-end items-end
              transition-all duration-700 ease-out delay-200
              ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"}
            `}
            style={{ minHeight: '100%'}}
          >
            <div className="relative">
              <Image
                src={phoneWithHand}
                alt="Phone with Casino App"
                width={500}
                height={200}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};