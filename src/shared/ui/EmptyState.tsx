'use client'

import React from 'react';
import { bebasNeue, roboto } from './theme/fonts';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No data',
  description = 'Unfortunately, no data was found',
  icon,
  action,
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: {
      container: 'py-8 sm:py-12',
      icon: 'w-12 h-12 sm:w-16 sm:h-16',
      title: 'text-xl sm:text-2xl',
      description: 'text-sm sm:text-base'
    },
    md: {
      container: 'py-12 sm:py-16 lg:py-20',
      icon: 'w-16 h-16 sm:w-20 sm:h-20',
      title: 'text-2xl sm:text-3xl lg:text-4xl',
      description: 'text-base sm:text-lg'
    },
    lg: {
      container: 'py-16 sm:py-20 lg:py-24',
      icon: 'w-20 h-20 sm:w-24 sm:h-24',
      title: 'text-3xl sm:text-4xl lg:text-5xl',
      description: 'text-lg sm:text-xl'
    }
  };

  const currentSize = sizeClasses[size];

  const defaultIcon = (
    <div className={`${currentSize.icon} mx-auto mb-6 text-gray-400`}>
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
          d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-1.01-6-2.709M15 15.803a7.962 7.962 0 01-6 0"
        />
      </svg>
    </div>
  );

  return (
    <div className={`flex flex-col items-center justify-center text-center ${currentSize.container} ${className}`}>
      {icon || defaultIcon}
      
      <h3 
        className={`${bebasNeue.className} text-white tracking-wider leading-tight mb-4 ${currentSize.title}`}
        style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)' }}
      >
        {title}
      </h3>
      
      <p 
        className={`${roboto.className} text-gray-300 max-w-md mx-auto leading-relaxed mb-6 ${currentSize.description}`}
      >
        {description}
      </p>
      
      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
