import { initializeI18nWithGeoLocation } from '@/i18n/i18n';
import { LanguageData, loadAvailableLanguagesFromStrapi } from '@/shared/api/apiClient';
import { getClientIP } from '@/shared/api/ipService';
import { useEffect, useState } from 'react';

export interface GeoLocationData {
  country: string;
  region: string;
  city: string;
  timezone: string;
  language: string;
}

interface UseAppInitializationReturn {
  isReady: boolean;
  loading: boolean;
  error: string | null;
  location: GeoLocationData | null;
  availableLanguages: LanguageData[];
}

export const useAppInitialization = (): UseAppInitializationReturn => {
  const [isReady, setIsReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<GeoLocationData | null>(null);
  const [availableLanguages, setAvailableLanguages] = useState<LanguageData[]>([]);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        setLoading(true);
        setError(null);

        // Проверяем, есть ли сохраненная информация о геолокации
        const savedLocation = typeof window !== 'undefined' ? localStorage.getItem('userLocation') : null;
        let locationData: GeoLocationData;
        
        if (savedLocation) {
          locationData = JSON.parse(savedLocation);
          setLocation(locationData);
        } else {
          const clientIP = await getClientIP();
          const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
          if (!apiUrl) {
            throw new Error('API URL not configured');
          }

          const geoResponse = await fetch(`${apiUrl}/api/geo-location?ip=${clientIP}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if (!geoResponse.ok) {
            throw new Error(`Failed to fetch location: ${geoResponse.status}`);
          }

          const geoResult = await geoResponse.json();
          
          if (geoResult.success && geoResult.data) {
            locationData = geoResult.data;
            setLocation(locationData);
            
            // Сохраняем информацию о геолокации в localStorage
            if (typeof window !== 'undefined') {
              localStorage.setItem('userLocation', JSON.stringify(locationData));
            }
          } else {
            throw new Error('Invalid location data received');
          }
        }

        const languages = await loadAvailableLanguagesFromStrapi();
        setAvailableLanguages(languages);
        const { language } = locationData;
        const finalLanguage = language || 'en';
        await initializeI18nWithGeoLocation(finalLanguage);
        setIsReady(true);

      } catch (err) {
        console.error('Error during app initialization:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        
        // Fallback: загружаем английский и минимальный набор языков
        try {
          await initializeI18nWithGeoLocation('en');
          setIsReady(true);
        } catch (fallbackError) {
          console.error('Fallback initialization failed:', fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  return {
    isReady,
    loading,
    error,
    location,
    availableLanguages
  };
};
