"use client";

import LanguageSelector from '@/components/ui/Layout/LanguageSelector';
import { bebasNeue } from '@/shared/ui/theme/fonts';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';


import logo from "@/assets/son-logo.png";
import userIcon from "@/assets/user-icon.png";

interface HeaderProps {
  isLoggedIn: boolean;
  onAccountClick: () => void;
  onLogoutClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onAccountClick, onLogoutClick }) => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // мегаменю (десктоп)
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // аккордеон (мобилка)
  const [openAccordionMenu, setOpenAccordionMenu] = useState<string | null>(null);

  // данные для меню
  const getMenuItems = (): Record<string, string[]> => ({
    "new-casinos": [
      t('navigation.header.menuItems.newCasinos.onlineCasinos'),
      t('navigation.header.menuItems.newCasinos.realMoneyCasinos'),
      t('navigation.header.menuItems.newCasinos.cryptoCasinos'),
      t('navigation.header.menuItems.newCasinos.depositMethods'),
      t('navigation.header.menuItems.newCasinos.mobileCasinos'),
      t('navigation.header.menuItems.newCasinos.casinoReviews'),
      t('navigation.header.menuItems.newCasinos.instantPlayCasinos'),
      t('navigation.header.menuItems.newCasinos.sweepstakesCasinos'),
      t('navigation.header.menuItems.newCasinos.casinoCompanies'),
      t('navigation.header.menuItems.newCasinos.payNPlayCasinos'),
      t('navigation.header.menuItems.newCasinos.newestCasinos'),
      t('navigation.header.menuItems.newCasinos.fastestWithdrawalCasinos'),
      t('navigation.header.menuItems.newCasinos.bestPayoutCasinos'),
      t('navigation.header.menuItems.newCasinos.certifiedCasinos'),
      t('navigation.header.menuItems.newCasinos.blacklistedCasinos'),
      t('navigation.header.menuItems.newCasinos.casinosByCountry'),
    ],
    "casino-bonuses": [
      t('navigation.header.menuItems.casinoBonuses.casinoBonuses'),
      t('navigation.header.menuItems.casinoBonuses.noDepositBonuses'),
      t('navigation.header.menuItems.casinoBonuses.depositBonuses'),
      t('navigation.header.menuItems.casinoBonuses.cashbackBonus'),
      t('navigation.header.menuItems.casinoBonuses.cryptoBonuses'),
      t('navigation.header.menuItems.casinoBonuses.latestBonuses'),
      t('navigation.header.menuItems.casinoBonuses.welcomeBonuses'),
      t('navigation.header.menuItems.casinoBonuses.matchDepositBonuses'),
      t('navigation.header.menuItems.casinoBonuses.reloadBonuses'),
      t('navigation.header.menuItems.casinoBonuses.sweepstakesBonuses'),
      t('navigation.header.menuItems.casinoBonuses.exclusiveBonuses'),
      t('navigation.header.menuItems.casinoBonuses.freeSpinsBonuses'),
      t('navigation.header.menuItems.casinoBonuses.minimumDepositBonuses'),
      t('navigation.header.menuItems.casinoBonuses.highRollerBonuses'),
      t('navigation.header.menuItems.casinoBonuses.noWageringBonuses'),
      t('navigation.header.menuItems.casinoBonuses.casinosByCountry'),
    ],
    "online-casinos": [],
    promocodes: [],
    "about-us": [],
  });

  const menuItems = getMenuItems();

  const handleMenuToggle = (menuName: string) => {
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  const handleAccordionToggle = (menuName: string) => {
    setOpenAccordionMenu((prev) => (prev === menuName ? null : menuName));
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    const next = !isMenuOpen;
    setIsMenuOpen(next);
    if (!next) setOpenAccordionMenu(null);
  };

  const handleLinkClick = () => {
    if (isMenuOpen) toggleMenu();
  };

  return (
    <>
      {/* sticky-контейнер, чтобы мегаменю позиционировалось от хедера */}
      <div className="relative sticky top-0 z-50">
        <header className={`bg-brand-dark text-white py-4 ${bebasNeue.className}`}>
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              {/* Лого + нав */}
              <div className="flex items-center space-x-10">
                <div className="flex-shrink-0">
                  <Link href="/" onClick={handleLinkClick}>
                    <Image src={logo} alt="SON Logo" width={75} height={38} priority />
                  </Link>
                </div>

                {/* Десктоп-меню */}
                <nav className="hidden xl:flex items-center space-x-10">
                  <a
                    href="#"
                    className={`text-3xl uppercase tracking-wider -skew-x-12 pb-1 cursor-pointer ${
                      activeMenu === "new-casinos" ? "text-white border-b-2 border-brand-accent-red" : "hover:text-brand-accent-red"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenuToggle("new-casinos");
                    }}
                  >
                    {t('navigation.header.newCasinos')}
                  </a>

                  <a
                    href="#"
                    className={`text-3xl uppercase tracking-wider -skew-x-12 pb-1 cursor-pointer ${
                      activeMenu === "casino-bonuses" ? "text-white border-b-2 border-brand-accent-red" : "hover:text-brand-accent-red"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenuToggle("casino-bonuses");
                    }}
                  >
                    {t('navigation.header.casinoBonuses')}
                  </a>

                  <a
                    href="#"
                    className={`text-3xl uppercase tracking-wider -skew-x-12 pb-1 cursor-pointer ${
                      activeMenu === "online-casinos" ? "text-white border-b-2 border-brand-accent-red" : "hover:text-brand-accent-red"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenuToggle("online-casinos");
                    }}
                  >
                    {t('navigation.header.onlineCasinos')}
                  </a>

                  <a
                    href="#"
                    className={`text-3xl uppercase tracking-wider -skew-x-12 pb-1 cursor-pointer ${
                      activeMenu === "promocodes" ? "text-white border-b-2 border-brand-accent-red" : "hover:text-brand-accent-red"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenuToggle("promocodes");
                    }}
                  >
                    {t('navigation.header.promocodes')}
                  </a>

                  <a
                    href="#"
                    className={`text-3xl uppercase tracking-wider -skew-x-12 pb-1 cursor-pointer ${
                      activeMenu === "about-us" ? "text-white border-b-2 border-brand-accent-red" : "hover:text-brand-accent-red"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenuToggle("about-us");
                    }}
                  >
                    {t('navigation.header.aboutUs')}
                  </a>
                </nav>
              </div>

              {/* Правый блок */}
              <div className="flex items-center space-x-4">
                {/* Десктоп-кнопки */}
                <div className="hidden md:flex items-center space-x-4">
                  {isLoggedIn ? (
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={onAccountClick}
                        className="bg-brand-accent-red rounded-full w-10 h-10 flex items-center justify-center hover:brightness-90 transition"
                      >
                        <Image src={userIcon} alt="Account" width={66} height={66} />
                      </button>
                      <button
                        onClick={onLogoutClick}
                        className="border border-brand-accent-red hover:bg-brand-accent-red text-white text-2xl py-1.5 px-4 rounded-md uppercase"
                      >
                        {t('navigation.header.logout')}
                      </button>
                    </div>
                  ) : (
                    <>
                      <Link
                        href="/register"
                        className="bg-brand-accent-red hover:bg-red-700 text-white text-2xl py-1.5 px-4 rounded-md uppercase"
                      >
                        {t('navigation.header.registration')}
                      </Link>
                      <Link
                        href="/login"
                        className="border border-brand-accent-red hover:bg-brand-accent-red text-white text-2xl py-1.5 px-4 rounded-md uppercase"
                      >
                        {t('navigation.header.login')}
                      </Link>
                    </>
                  )}
                </div>

                {/* Языки (мобилка) */}
                <div className="md:hidden">
                  <LanguageSelector className="w-[130px]" />
                </div>

                {/* Бургер */}
                <div className="xl:hidden">
                  <button onClick={toggleMenu} className="text-white focus:outline-none z-10">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Языки под хедером (только когда мегаменю не активно) */}
            <div
              className={`absolute top-full right-0 w-full hidden md:block pointer-events-none ${
                activeMenu ? "hidden" : ""
              }`}
            >
              <div className="container mx-auto px-4 flex justify-end">
                <div className="w-[150px] pointer-events-auto">
                  <LanguageSelector />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Десктоп мегаменю */}
        {activeMenu && menuItems[activeMenu] && menuItems[activeMenu].length > 0 && (
          <div className={`absolute top-full left-0 right-0 bg-brand-dark text-white z-40 ${bebasNeue.className}`}>
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-row justify-between items-start">
                {[...Array(5).keys()].map((colIndex) => (
                  <div key={colIndex} className="flex flex-col items-start space-y-4 w-1/5 px-2">
                    {menuItems[activeMenu]
                      .filter((_, itemIndex) => itemIndex % 5 === colIndex)
                      .map((item, subIndex) => (
                        <a
                          key={subIndex}
                          href="#"
                          className="text-2xl uppercase hover:text-brand-accent-red tracking-wider -skew-x-12"
                        >
                          {item}
                        </a>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Мобильное полноэкранное меню */}
      {isMenuOpen && (
        <div
          className={`fixed inset-0 bg-black/90 z-[60] flex flex-col items-center justify-center xl:hidden ${bebasNeue.className}`}
        >
          <button onClick={toggleMenu} className="absolute top-6 right-5 text-white">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Аккордеон по ключам меню */}
          <nav className="flex flex-col items-center space-y-4 mb-8 w-full px-8 overflow-y-auto">
            {Object.keys(menuItems).map((menuKey) => {
              const hasSubMenu = menuItems[menuKey].length > 0;
              const isOpen = openAccordionMenu === menuKey;

              if (hasSubMenu) {
                return (
                  <div key={menuKey} className="w-full text-center">
                    <button
                      onClick={() => handleAccordionToggle(menuKey)}
                      className="text-5xl uppercase hover:text-brand-accent-red w-full flex justify-center items-center py-2"
                    >
                      {menuKey.replace("-", " ")}
                      <svg
                        className={`w-8 h-8 ml-2 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="flex flex-col items-center space-y-3 mt-3">
                        {menuItems[menuKey].map((subItem, index) => (
                          <a
                            href="#"
                            key={index}
                            onClick={handleLinkClick}
                            className="text-3xl uppercase text-gray-300 hover:text-brand-accent-red"
                          >
                            {subItem}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  href="#"
                  key={menuKey}
                  onClick={handleLinkClick}
                  className="text-5xl uppercase hover:text-brand-accent-red py-2"
                >
                  {menuKey.replace("-", " ")}
                </a>
              );
            })}
          </nav>

          {/* Низ мобильного меню — твоя правка */}
          <div className="flex flex-col items-center space-y-6 md:hidden w-full px-8">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    onAccountClick();
                    toggleMenu();
                  }}
                  className="bg-brand-accent-red rounded-full w-16 h-16 flex items-center justify-center hover:brightness-90 transition"
                >
                  <Image src={userIcon} alt="Account" width={99} height={99} />
                </button>
                <button
                  onClick={() => {
                    onLogoutClick();
                    toggleMenu();
                  }}
                  className="border border-brand-accent-red hover:bg-brand-accent-red text-white text-4xl py-4 px-12 rounded-md uppercase"
                >
                  {t('navigation.header.logout')}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  onClick={handleLinkClick}
                  className="bg-brand-accent-red hover:bg-red-700 text-white text-4xl py-4 text-center w-full rounded-md uppercase"
                >
                  REGISTRATION
                </Link>
                <Link
                  href="/login"
                  onClick={handleLinkClick}
                  className="border border-brand-accent-red hover:bg-brand-accent-red text-white text-4xl py-4 text-center w-full rounded-md uppercase"
                >
                  LOGIN
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};


export default Header;
