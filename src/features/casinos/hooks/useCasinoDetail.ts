import { OnlineCasino } from '@/features/main/types';
import { apiClient } from '@/shared/api/apiClient';
import { Bonus } from '@/shared/api/bonusesApi';
import { useEffect, useState } from 'react';
import { useLanguageChange } from '../../../shared/hooks/useLanguageChange';

interface CasinosResponse {
  data: OnlineCasino[];
  meta?: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface BonusesResponse {
  data: Bonus[];
  meta?: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/**
 * Специализированный хук для казино
 */
export const useOnlineCasinoDetail = (slug: string) => {
  const [data, setData] = useState<OnlineCasino | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentLanguage = useLanguageChange();

  useEffect(() => {
    if (!slug) return;

    const fetchCasinoDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryParams = new URLSearchParams();

        queryParams.set('filters[slug][$eq]', slug);
        queryParams.set('locale', currentLanguage || 'en');

        // Правильный deep populate для Strapi v4
        queryParams.set('populate[Logo]', 'true');
        queryParams.set('populate[General]', 'true');
        queryParams.set('populate[Payment_info]', 'true');
        queryParams.set('populate[Games_info]', 'true');
        queryParams.set('populate[similar_casinos][populate][Logo]', 'true');

        const url = `/api/online-casinos?${queryParams.toString()}`;
        const response = await apiClient.get<CasinosResponse>(url);

        setData(response.data[0]);
      } catch (err) {
        console.error(`Error fetching casino detail:`, err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        setData(null);
      } finally {
        setLoading(false);
      }
    }
    fetchCasinoDetail();
  }, [slug, currentLanguage]);

  return {
    data,
    loading,
    error,
    refetch: () => {
      if (slug) {
        setLoading(true);
      }
    }
  };
};

/**
 * Специализированный хук для бонусов
 */
export const useBonusDetail = (slug: string) => {
  const [data, setData] = useState<Bonus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentLanguage = useLanguageChange();

  useEffect(() => {
    if (!slug) return;

    const fetchCasinoDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryParams = new URLSearchParams({
          'filters[slug][$eq]': slug,
          populate: '*',
          locale: currentLanguage || 'en',
        });
        
        const url = `/api/casino-bonuses?${queryParams.toString()}`;
        const response = await apiClient.get<BonusesResponse>(url);

        setData(response.data[0]);
      } catch (err){
        console.error(`Error fetching bonus detail:`, err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCasinoDetail();
  }, [slug, currentLanguage]);

  return {
    data,
    loading,
    error,
    refetch: () => {
      if (slug) {
        setLoading(true);
      }
    }
  };
};