'use client'

import React from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from './EmptyState';

export interface BonusesEmptyStateProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const BonusesEmptyState: React.FC<BonusesEmptyStateProps> = ({ 
  className,
  size = 'md' 
}) => {
  const { t } = useTranslation();

  const bonusIcon = (
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
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  );

  return (
    <EmptyState
      title={t('main.bonuses.emptyState.title', 'Бонусы не найдены')}
      description={t('main.bonuses.emptyState.description', 'К сожалению, в данный момент нет доступных бонусов для выбранного языка. Попробуйте изменить язык или обновить страницу.')}
      icon={bonusIcon}
      className={className}
      size={size}
    />
  );
};

export default BonusesEmptyState;
