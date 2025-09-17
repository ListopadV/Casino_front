import { isApiError } from '@/shared/api/apiHelpers';
import { Bonus, bonusesApi } from '@/shared/api/bonusesApi';
import { useCallback, useEffect, useState } from 'react';

interface UseBonusesReturn {
  bonuses: Bonus[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Кеш для предотвращения повторных запросов по языку
const bonusesCache = new Map<string, Bonus[]>();
const loadingStates = new Map<string, boolean>();

export const useBonuses = (language: string): UseBonusesReturn => {
  const [bonuses, setBonuses] = useState<Bonus[]>(bonusesCache.get(language) || []);
  const [loading, setLoading] = useState(!bonusesCache.has(language));
  const [error, setError] = useState<string | null>(null);

  const fetchBonuses = useCallback(async (lang: string, force = false) => {
    // Если данные уже кешированы и не принудительное обновление, используем кеш
    if (bonusesCache.has(lang) && !force) {
      setBonuses(bonusesCache.get(lang) || []);
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

      console.log(`Fetching bonuses for language: ${lang}`);
      // Теперь бэкенд сам обрабатывает фоллбэк на английский язык
      const fetchedBonuses = await bonusesApi.getBonuses(lang);
      
      // Кешируем результат
      bonusesCache.set(lang, fetchedBonuses);
      setBonuses(fetchedBonuses);
      
    } catch (err) {
      console.error('Error fetching bonuses:', err);
      
      if (isApiError(err)) {
        setError('API was not configured yet.');
      } else {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    } finally {
      setLoading(false);
      loadingStates.set(lang, false);
    }
  }, []);

  const refetch = useCallback(() => {
    fetchBonuses(language, true);
  }, [fetchBonuses, language]);

  useEffect(() => {
    fetchBonuses(language);
  }, [fetchBonuses, language]);

  return {
    bonuses,
    loading,
    error,
    refetch,
  };
};
