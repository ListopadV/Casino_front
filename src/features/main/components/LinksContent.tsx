'use client'

import React from 'react';
import { useTranslation } from 'react-i18next';
import { rajdhani, roboto } from '@/shared/ui/theme/fonts';


export const LinksContent: React.FC = () => {
  const { t } = useTranslation();

  return (
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="text-center sm:text-left mb-8 sm:mb-12 lg:mb-16">
        <h2 className={`${rajdhani.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-wider uppercase -skew-x-12`}>
          {t('main.links.title')}
        </h2>
        <p className={`${roboto.className} text-xs sm:text-sm md:text-base font-light uppercase tracking-widest mt-3 sm:mt-4 opacity-50 -skew-x-12 max-w-2xl mx-auto sm:mx-0`}>
          {t('main.links.subtitle')}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-start gap-8 sm:gap-12 md:gap-16 lg:gap-24">
        <div className="text-center sm:text-left w-full sm:w-auto">
          <h3 className={`${rajdhani.className} text-xl sm:text-2xl md:text-3xl tracking-wider mb-3 sm:mb-4 md:mb-5 -skew-x-12`}>MENU</h3>
          <ul className="space-y-2 sm:space-y-3">
            <li>
              <a className={`${roboto.className} font-bold text-sm md:text-base text-white/70 uppercase tracking-wider hover:text-white transition-colors -skew-x-12 inline-block`} href="#">
                {t('main.links.newCasinos')}
              </a>
            </li>
            <li>
              <a className={`${roboto.className} font-bold text-sm md:text-base text-white/70 uppercase tracking-wider hover:text-white transition-colors -skew-x-12 inline-block`} href="#">
                {t('main.links.cryptoCasinos')}
              </a>
            </li>
          </ul>
        </div>

        <div className="text-center sm:text-left w-full sm:w-auto">
          <h3 className={`${rajdhani.className} text-xl sm:text-2xl md:text-3xl tracking-wider mb-3 sm:mb-4 md:mb-5 -skew-x-12`}>INFO</h3>
          <ul className="space-y-2 sm:space-y-3">
            <li>
              <a className={`${roboto.className} font-bold text-sm md:text-base text-white/70 uppercase tracking-wider hover:text-white transition-colors -skew-x-12 inline-block`} href="#">
                {t('navigation.header.aboutUs')}
              </a>
            </li>
          </ul>
        </div>

        <div className="text-center sm:text-left w-full sm:w-auto">
          <h3 className={`${rajdhani.className} text-xl sm:text-2xl md:text-3xl tracking-wider mb-3 sm:mb-4 md:mb-5 -skew-x-12`}>MORE</h3>
          <ul className="space-y-2 sm:space-y-3">
            <li>
              <a className={`${roboto.className} font-bold text-sm md:text-base text-white/70 uppercase tracking-wider hover:text-white transition-colors -skew-x-12 inline-block`} href="#">
                {t('auth.register')}
              </a>
            </li>
            <li>
              <a className={`${roboto.className} font-bold text-sm md:text-base text-white/70 uppercase tracking-wider hover:text-white transition-colors -skew-x-12 inline-block`} href="#">
                {t('auth.login')}
              </a>
            </li>
          </ul>
        </div>
      </div>

    </div>
    )
}
