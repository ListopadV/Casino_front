'use client';

import { useGeoLocation } from '@/shared/hooks/useGeoLocation';
import React from 'react';

interface GeoLocationDisplayProps {
  className?: string;
  showFlag?: boolean;
  showCountry?: boolean;
  showLanguage?: boolean;
}

const GeoLocationDisplay: React.FC<GeoLocationDisplayProps> = ({ 
  className = '', 
  showFlag = true, 
  showCountry = true, 
  showLanguage = true 
}) => {
  const { location, loading, error } = useGeoLocation();

  if (loading) {
    return (
      <div className={`flex items-center space-x-2 text-sm text-gray-400 ${className}`}>
        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        <span>Определение местоположения...</span>
      </div>
    );
  }

  if (error || !location) {
    return (
      <div className={`flex items-center space-x-2 text-sm text-gray-400 ${className}`}>
        <span>🌍</span>
        <span>Местоположение недоступно</span>
      </div>
    );
  }

  const getCountryFlag = (country: string) => {
    const flagMap: Record<string, string> = {
      'US': '🇺🇸', 'GB': '🇬🇧', 'CA': '🇨🇦', 'AU': '🇦🇺', 'NZ': '🇳🇿',
      'FR': '🇫🇷', 'BE': '🇧🇪', 'CH': '🇨🇭', 'LU': '🇱🇺', 'MC': '🇲🇨',
      'DE': '🇩🇪', 'AT': '🇦🇹', 'LI': '🇱🇮',
      'IT': '🇮🇹', 'SM': '🇸🇲', 'VA': '🇻🇦',
      'RU': '🇷🇺', 'BY': '🇧🇾', 'KZ': '🇰🇿', 'KG': '🇰🇬', 'TJ': '🇹🇯', 'TM': '🇹🇲', 'UZ': '🇺🇿',
      'UA': '🇺🇦',
      'PL': '🇵🇱',
      'ES': '🇪🇸', 'PT': '🇵🇹', 'NL': '🇳🇱', 'SE': '🇸🇪', 'NO': '🇳🇴', 'DK': '🇩🇰', 'FI': '🇫🇮',
      'CZ': '🇨🇿', 'SK': '🇸🇰', 'HU': '🇭🇺', 'RO': '🇷🇴', 'BG': '🇧🇬', 'HR': '🇭🇷', 'SI': '🇸🇮',
      'LT': '🇱🇹', 'LV': '🇱🇻', 'EE': '🇪🇪', 'GR': '🇬🇷', 'CY': '🇨🇾', 'TR': '🇹🇷',
      'JP': '🇯🇵', 'KR': '🇰🇷', 'CN': '🇨🇳', 'TW': '🇹🇼', 'HK': '🇭🇰', 'SG': '🇸🇬',
      'MY': '🇲🇾', 'TH': '🇹🇭', 'VN': '🇻🇳', 'ID': '🇮🇩', 'PH': '🇵🇭', 'IN': '🇮🇳',
      'PK': '🇵🇰', 'BD': '🇧🇩', 'LK': '🇱🇰', 'NP': '🇳🇵', 'MM': '🇲🇲', 'KH': '🇰🇭',
      'LA': '🇱🇦', 'BR': '🇧🇷', 'AR': '🇦🇷', 'CL': '🇨🇱', 'CO': '🇨🇴', 'PE': '🇵🇪',
      'VE': '🇻🇪', 'EC': '🇪🇨', 'BO': '🇧🇴', 'PY': '🇵🇾', 'UY': '🇺🇾', 'MX': '🇲🇽',
      'GT': '🇬🇹', 'BZ': '🇧🇿', 'SV': '🇸🇻', 'HN': '🇭🇳', 'NI': '🇳🇮', 'CR': '🇨🇷',
      'PA': '🇵🇦', 'CU': '🇨🇺', 'DO': '🇩🇴', 'HT': '🇭🇹', 'JM': '🇯🇲', 'TT': '🇹🇹',
      'BB': '🇧🇧', 'AG': '🇦🇬', 'BS': '🇧🇸', 'ZA': '🇿🇦', 'NG': '🇳🇬', 'KE': '🇰🇪',
      'TZ': '🇹🇿', 'UG': '🇺🇬', 'GH': '🇬🇭', 'ET': '🇪🇹', 'EG': '🇪🇬', 'MA': '🇲🇦',
      'TN': '🇹🇳', 'DZ': '🇩🇿', 'LY': '🇱🇾', 'SD': '🇸🇩', 'SA': '🇸🇦', 'AE': '🇦🇪',
      'QA': '🇶🇦', 'BH': '🇧🇭', 'KW': '🇰🇼', 'OM': '🇴🇲', 'YE': '🇾🇪', 'IQ': '🇮🇶',
      'JO': '🇯🇴', 'LB': '🇱🇧', 'SY': '🇸🇾', 'IL': '🇮🇱', 'PS': '🇵🇸', 'IR': '🇮🇷', 'AF': '🇦🇫'
    };
    return flagMap[country] || '🌍';
  };

  const getLanguageName = (lang: string) => {
    const langMap: Record<string, string> = {
      'en': 'English',
      'fr': 'Français', 
      'de': 'Deutsch',
      'it': 'Italiano',
      'ru': 'Русский',
      'uk': 'Українська',
      'pl': 'Polski'
    };
    return langMap[lang] || lang.toUpperCase();
  };

  return (
    <div className={`flex items-center space-x-2 text-sm text-gray-300 ${className}`}>
      {showFlag && (
        <span className="text-lg">
          {getCountryFlag(location.country)}
        </span>
      )}
      
      {showCountry && (
        <span className="font-medium">
          {location.country === 'Unknown' ? 'Неизвестно' : location.country}
        </span>
      )}
      
      {showLanguage && (
        <span className="text-gray-400">
          ({getLanguageName(location.language)})
        </span>
      )}
      
      {location.city && location.city !== 'Unknown' && (
        <span className="text-gray-500">
          • {location.city}
        </span>
      )}
    </div>
  );
};

export default GeoLocationDisplay;
