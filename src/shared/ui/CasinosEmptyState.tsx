'use client'

import React from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from './EmptyState';

export interface CasinosEmptyStateProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const CasinosEmptyState: React.FC<CasinosEmptyStateProps> = ({ 
  className,
  size = 'md' 
}) => {
  const { t } = useTranslation();

  const casinoIcon = (
    <div className={`${size === 'sm' ? 'w-12 h-12 sm:w-16 sm:h-16' : size === 'lg' ? 'w-20 h-20 sm:w-24 sm:h-24' : 'w-16 h-16 sm:w-20 sm:h-20'} mx-auto mb-6 text-gray-400`}>
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        className="w-full h-full"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </div>
  );

  return (
    <EmptyState
      title={t('main.casinos.emptyState.title', 'Казино не найдены')}
      description={t('main.casinos.emptyState.description', 'К сожалению, в данный момент нет доступных казино для выбранного языка. Попробуйте изменить язык или обновить страницу.')}
      icon={casinoIcon}
      className={className}
      size={size}
    />
  );
};

export default CasinosEmptyState;
