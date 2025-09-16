import { casinosApi, OnlineCasino } from '@/shared/api/casinosApi';
import { useCallback, useEffect, useState } from 'react';

interface UseCasinosReturn {
  casinos: OnlineCasino[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Кеш для предотвращения повторных запросов по языку
const casinosCache = new Map<string, OnlineCasino[]>();
const loadingStates = new Map<string, boolean>();

export const useCasinos = (language: string): UseCasinosReturn => {
  const [casinos, setCasinos] = useState<OnlineCasino[]>(casinosCache.get(language) || []);
  const [loading, setLoading] = useState(!casinosCache.has(language));
  const [error, setError] = useState<string | null>(null);

  const fetchCasinos = useCallback(async (lang: string, force = false) => {
    // Если данные уже кешированы и не принудительное обновление, используем кеш
    if (casinosCache.has(lang) && !force) {
      setCasinos(casinosCache.get(lang) || []);
      setLoading(false);
      return;
    }

    // Если уже идет загрузка для этого языка, не начинаем новую
    if (loadingStates.get(lang) && !force) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      loadingStates.set(lang, true);

      console.log(`Fetching casinos for language: ${lang}`);
      const fetchedCasinos = await casinosApi.getCasinos(lang);
      
      // Кешируем результат
      casinosCache.set(lang, fetchedCasinos);
      setCasinos(fetchedCasinos);
      
    } catch (err) {
      console.error('Error fetching casinos:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
      loadingStates.set(lang, false);
    }
  }, []);

  const refetch = useCallback(() => {
    fetchCasinos(language, true);
  }, [fetchCasinos, language]);

  useEffect(() => {
    fetchCasinos(language);
  }, [fetchCasinos, language]);

  return {
    casinos,
    loading,
    error,
    refetch,
  };
};
