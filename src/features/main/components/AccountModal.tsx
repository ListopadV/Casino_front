import { bebasNeue } from '@/shared/ui/theme/fonts';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Пропсы компонента
interface AccountModalProps {
  onClose: () => void;
}

const AccountModal: React.FC<AccountModalProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(true), 10); 
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 300);
  };
 
  return (
    <div 
      className={`fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-out ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
    >
      <div 
        className={`rounded-2xl w-full max-w-6xl relative shadow-lg overflow-hidden flex flex-col max-h-[90vh] transition-all duration-300 ease-out bg-brand-dark ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        <div 
          className="flex justify-between items-center rounded-tr-2xl flex-shrink-0 bg-brand-gray" 
        >
          <div
            className="inline-flex items-center gap-3 px-6 py-2 rounded-tl-2xl rounded-tr-2xl bg-brand-dark"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24" className="text-brand-accent-red">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <h2 className={`${bebasNeue.className} text-2xl tracking-wider text-brand-accent-red`}>
              {t('main.account.title')}
            </h2>
          </div>
          <div className="px-6">
            <button onClick={handleClose} className="text-2xl font-light text-gray-400">×</button>
          </div>
        </div>
        
        <div className="px-6 pt-3 relative flex-shrink-0">
            <div className="absolute bottom-0 left-6 right-6 h-px bg-white"></div>
            <div className="inline-block relative z-10">
              <a href="#" className="block font-bold text-sm pb-2 text-brand-accent-red">
                {t('profile.personalInfo')}
              </a>
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-brand-accent-red"></div>
            </div>
        </div>

        <div className={`p-6 flex flex-col md:flex-row gap-6 flex-grow overflow-y-auto transition-opacity duration-300 delay-150 ease-out ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
          
          <div 
            className="w-full md:w-1/3 p-4 rounded-2xl flex flex-col gap-4 bg-brand-gray"
          >
            <div className="p-4 rounded-2xl bg-brand-dark">
              <div className="flex items-center justify-start">
                 <div className="p-1 rounded-lg bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="32" height="32" className="text-brand-accent-red">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                 </div>
              </div>
            </div>

            <div 
              className="p-4 rounded-2xl flex-grow bg-brand-dark"
            >
              {/* Содержимое для этого блока */}
            </div>
          </div>
          
          <div 
            className="w-full md:w-2/3 p-4 rounded-2xl bg-brand-gray"
          >
            {/* Содержимое для правой колонки */}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AccountModal;