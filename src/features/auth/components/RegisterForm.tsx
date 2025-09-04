"use client";

import { Bebas_Neue } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useTranslation } from 'react-i18next';

import backgroundImageUrl from "@/assets/auth-background.png";
import logo from '@/assets/son-logo.png';

const bebas_neue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400']
});

interface RegisterFormProps {
  onSubmit: (data: { email: string; password: string; terms: boolean; marketing: boolean }) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleClose = () => {
    router.push('/');
  };

  const checkmarkIcon = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='white'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e")`;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const terms = !!formData.get('terms');
    const marketing = !!formData.get('marketing');
    onSubmit({ email, password, terms, marketing });
  };

  return (
    <div className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] my-8 md:my-16 mx-auto">
      
      <div
        className="absolute inset-0 bg-black-80 rounded-3xl z-0"
        style={{
          backgroundImage: `url(${backgroundImageUrl.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      ></div>

      <div className="relative z-20">
        <div className="relative bg-brand-gray flex items-center justify-between p-3 md:p-5 h-[64px] md:h-[84px]">
          <div className="flex-1">
            <h2 className={`${bebas_neue.className} text-xl sm:text-2xl md:text-3xl text-gray-200 -skew-x-12 tracking-wider`}>
              {t('auth.forms.register.title')}
            </h2>
          </div>
          <div className="flex-1 flex justify-end">
            <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div 
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800-90 rounded-full z-[-1] 
                       w-[100px] h-[100px] top-[64px]
                       md:w-[150px] md:h-[150px] md:top-[84px]"
          ></div>
        </div>
        
        <div 
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-30 pointer-events-none
                     w-[100px] h-[100px] top-[64px]
                     md:w-[150px] md:h-[150px] md:top-[84px]"
        >
            <Image 
              src={logo} 
              alt="SON Logo" 
              className="w-[80px] md:w-[120px]" 
              priority 
            />
        </div>
      </div>
      
      <div 
        className="pb-8 px-4 md:pb-12 md:px-12 relative z-10
                   pt-20 md:pt-24"
      >
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-gray-200 mb-2 tracking-widest">{t('auth.email')}</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-transparent border-2 border-gray-800 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-bold text-gray-200 mb-2 tracking-widest">{t('auth.password')}</label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full bg-transparent border-2 border-gray-800 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
              />
            </div>
          </div>

          <div className="space-y-4 my-8">
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                style={{ backgroundImage: 'none' }}
                className="h-5 w-5 rounded-sm appearance-none bg-brand-accentRed border-2 border-brand-accentRed focus:outline-none cursor-pointer transition-all flex-shrink-0"
                onChange={(e) => {
                  e.target.style.backgroundImage = e.target.checked ? checkmarkIcon : 'none';
                }}
              />
              <label htmlFor="terms" className="ml-3 block text-sm text-gray-200 cursor-pointer md:whitespace-nowrap font-bold uppercase">
                {t('auth.forms.register.termsText')}{' '}
                <Link 
                  href="https://saycasinoname.com/en/terms-and-conditions" 
                  className="underline"
                  style={{ textDecorationColor: 'gray' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('auth.forms.register.termsLink')}
                </Link>
                {' '}{t('auth.forms.register.andText')}{' '}
                <Link 
                  href="https://saycasinoname.com/en/privacy-policy" 
                  className="underline"
                  style={{ textDecorationColor: 'gray' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('auth.forms.register.privacyLink')}
                </Link>
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="marketing"
                name="marketing"
                type="checkbox"
                defaultChecked
                style={{ backgroundImage: checkmarkIcon }}
                className="h-5 w-5 rounded-sm appearance-none bg-brand-accentRed border-2 border-brand-accentRed focus:outline-none cursor-pointer transition-all flex-shrink-0"
                onChange={(e) => {
                  e.target.style.backgroundImage = e.target.checked ? checkmarkIcon : 'none';
                }}
              />
              <label htmlFor="marketing" className="ml-3 block text-sm text-gray-200 cursor-pointer font-bold uppercase">
                {t('auth.forms.register.marketingText')}
              </label>
            </div>
          </div>
          
          <button
            type="submit"
            className={`${bebas_neue.className} w-full bg-brand-accentRed hover:brightness-90 text-white text-3xl py-3 rounded-lg uppercase transition-all tracking-widest border border-red-400/50`}
          >
            <span className="block -skew-x-[14deg] font-bold">{t('auth.forms.register.submitButton')}</span>
          </button>
        </form>

        <div className="text-center mt-8">
          <p className="text-md text-white font-bold uppercase">
            {t('auth.alreadyHaveAccount')} <Link href="/login" className="font-bold text-brand-accentRed hover:brightness-90 transition-all uppercase">{t('auth.login')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
