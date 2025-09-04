import { anton } from '@/shared/ui/theme/fonts';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-white overflow-hidden">
      <div className="bg-brand-medium py-4 text-center">
          <p className={`${anton.className} text-white uppercase text-xl sm:text-2xl md:text-3xl lg:text-[40px] leading-tight tracking-wider`}>
            © 2025 SAYCASINONAME.COM
          </p>
      </div>
    </footer>
  );
};

export default Footer;
