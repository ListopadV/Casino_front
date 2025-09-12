import { changeLanguage } from '@/i18n/i18n';
import { getClientIP } from '@/shared/api/ipService';
import { useEffect, useState } from 'react';

export interface GeoLocationData {
  country: string;
  region: string;
  city: string;
  timezone: string;
  language: string;
}

interface UseGeoLocationReturn {
  location: GeoLocationData | null;
  loading: boolean;
  error: string | null;
  setLanguageFromLocation: (location: GeoLocationData) => void;
}

export const useGeoLocation = (): UseGeoLocationReturn => {
  const [location, setLocation] = useState<GeoLocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const setLanguageFromLocation = (locationData: GeoLocationData) => {
    const { language } = locationData;
    
    // Проверяем, поддерживается ли язык
    const supportedLanguages = ['en', 'fr', 'de', 'it', 'ru', 'uk', 'pl', 'be'];
    const finalLanguage = supportedLanguages.includes(language) ? language : 'en';
    
    // Устанавливаем язык
    changeLanguage(finalLanguage);
    
    // Сохраняем информацию о геолокации в localStorage
    localStorage.setItem('userLocation', JSON.stringify(locationData));
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('=== useGeoLocation Hook Debug ===');
        
        // Проверяем, есть ли сохраненная информация о геолокации
        const savedLocation = localStorage.getItem('userLocation');
        console.log('Saved location from localStorage:', savedLocation);
        
        if (savedLocation) {
          console.log('Using saved location from localStorage');
          const locationData = JSON.parse(savedLocation);
          setLocation(locationData);
          setLanguageFromLocation(locationData);
          setLoading(false);
          return;
        }

        // Получаем IP адрес клиента
        console.log('Getting client IP...');
        const clientIP = await getClientIP();
        console.log('Client IP:', clientIP);

        // Получаем геолокацию с сервера
        const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
        console.log('API URL:', apiUrl);
        
        if (!apiUrl) {
          throw new Error('API URL not configured');
        }

        console.log('Fetching from API:', `${apiUrl}/api/geo-location?ip=${clientIP}`);
        const response = await fetch(`${apiUrl}/api/geo-location?ip=${clientIP}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch location: ${response.status}`);
        }

        const result = await response.json();
        console.log('API result:', result);
        
        if (result.success && result.data) {
          console.log('Setting location from API:', result.data);
          setLocation(result.data);
          setLanguageFromLocation(result.data);
        } else {
          throw new Error('Invalid location data received');
        }
      } catch (err) {
        console.error('Error fetching location:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        
        // Fallback к английскому языку
        console.log('Falling back to English language');
        changeLanguage('en');
      } finally {
        setLoading(false);
        console.log('=== End useGeoLocation Hook ===');
      }
    };

    fetchLocation();
  }, []);

  return {
    location,
    loading,
    error,
    setLanguageFromLocation
  };
};

