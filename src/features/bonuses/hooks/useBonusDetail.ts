import { isApiError } from '@/shared/api/apiHelpers';
import { Bonus, bonusesApi } from '@/shared/api/bonusesApi';
import { useCallback, useEffect, useState } from 'react';

interface UseBonusDetailReturn {
  data: Bonus | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useBonusDetail = (slug: string, language: string): UseBonusDetailReturn => {
  const [data, setData] = useState<Bonus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBonus = useCallback(async (bonusSlug: string, lang: string) => {
    if (!bonusSlug || !lang) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log(`Fetching bonus detail for slug: ${bonusSlug}, language: ${lang}`);
      const fetchedBonus = await bonusesApi.getBonusBySlug(bonusSlug, lang);
      
      setData(fetchedBonus);
      
    } catch (err) {
      console.error('Error fetching bonus detail:', err);
      
      if (isApiError(err)) {
        setError('API was not configured yet.');
      } else {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    fetchBonus(slug, language);
  }, [fetchBonus, slug, language]);

  useEffect(() => {
    fetchBonus(slug, language);
  }, [fetchBonus, slug, language]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};
