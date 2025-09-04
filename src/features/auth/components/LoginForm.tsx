"use client";

import backgroundImage from "@/assets/auth-background.png";
import { Bebas_Neue } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useTranslation } from 'react-i18next';

import logo from '@/assets/son-logo.png';

const bebas_neue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400']
});

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleClose = () => {
    router.push('/');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    onSubmit({ email, password });
  };

  return (
    <div className="relative w-full max-w-xl rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] my-8 md:my-16 mx-auto">
      
      <div
        className="absolute inset-0 bg-transparent-black-80 rounded-3xl z-0"
        style={{
          backgroundImage: `url(${backgroundImage.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      ></div>

      <div className="relative z-20">
        <div className="relative bg-brand-gray flex items-center justify-between p-3 md:p-5 h-[64px] md:h-[84px]">
          <div className="flex-1">
            <h2 className={`${bebas_neue.className} text-xl sm:text-2xl md:text-3xl text-gray-200 -skew-x-12 tracking-wider`}>
              {t('auth.forms.login.title')}
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
                placeholder={t('auth.forms.login.emailPlaceholder')}
                className="w-full bg-transparent border-2 border-gray-800 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-bold text-gray-200 mb-2 tracking-widest">{t('auth.password')}</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder={t('auth.forms.login.passwordPlaceholder')}
                className="w-full bg-transparent border-2 border-gray-800 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
              />
            </div>
          </div>

          <div className="text-left my-4">
            <span className="text-sm text-gray-300 font-bold uppercase">{t('auth.forms.login.forgotPasswordLink')} </span>
            <Link href="/recover" className="text-xs font-bold text-brand-accentRed hover:brightness-90 transition-all tracking-wider uppercase">
              {t('auth.forgotPassword')}
            </Link>
          </div>
          
          <button
            type="submit"
            className={`${bebas_neue.className} w-full bg-brand-accent-red hover:brightness-90 text-white text-3xl py-3 rounded-lg uppercase transition-all tracking-widest border border-red-400/50`}
          >
            <span className="block -skew-x-[14deg] font-bold">{t('auth.forms.login.submitButton')}</span>
          </button>
        </form>

        <div className="text-center mt-8">
          <p className="text-md text-white font-bold uppercase">
            {t('auth.dontHaveAccount')} <Link href="/register" className="font-bold text-brand-accent-red hover:brightness-90 transition-all uppercase">{t('auth.register')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
