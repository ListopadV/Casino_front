"use client";

import { bebasNeue } from '@/shared/ui/theme/fonts';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

interface BonusCardProps {
  logoUrl: string;
  casinoName: string;
  slug: string; 
}

const BonusCard: React.FC<BonusCardProps> = ({ logoUrl, casinoName, slug }) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    const currentRef = cardRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  
  return (
    <Link 
      href={`/casino-bonus/${slug}`}
      ref={cardRef} 
      className={`relative block rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] shadow-2xl overflow-hidden transition-all duration-700 hover:scale-95 sm:hover:scale-90 lg:hover:scale-85 aspect-[506/589] ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}
    >
      {/* Верхняя часть с лого и названием */}
      <div className="absolute top-0 left-0 right-0 bottom-[80px] sm:bottom-[90px] lg:bottom-[100px] bg-black rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] z-10 flex flex-col items-center justify-between p-4 sm:p-6 lg:p-8">
          <div className="flex-grow flex items-center justify-center w-full">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={`${casinoName} Logo`}
                  width={300} 
                  height={100}
                  style={{ objectFit: 'contain' }}
                  className="w-full h-auto max-h-[60px] sm:max-h-[50px] lg:max-h-[100px]"
                />
              ) : (
                <div className="text-gray-500 text-sm">No Logo</div>
              )}
          </div>
          <h3 className={`${bebasNeue.className} text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center leading-tight`}>
            <span className="block">{casinoName}</span>
          </h3>
      </div>

      {/* Нижняя часть с кнопкой */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[100px] sm:h-[120px] lg:h-[120px] bg-brand-accent-red flex flex-col justify-end items-center pb-4 sm:pb-6 lg:pb-8 rounded-b-[20px] sm:rounded-b-[30px] lg:rounded-b-[40px] transition-all"
        style={{ boxShadow: 'inset 0px 10px 15px -5px rgba(0,0,0,0.4)' }}
      >
        <div className={`${bebasNeue.className} bg-white text-brand-accent-red text-lg sm:text-xl lg:text-2xl px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full`}>
            GET A BONUS
        </div>
      </div>
    </Link>
  );
};

export default BonusCard;