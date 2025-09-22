
import { OnlineCasino } from '@/features/main/types';
import { apiClient } from './apiClient';

export interface CasinosResponse {
  data: OnlineCasino[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export const casinosApi = {
  /**
   * Получает список казино с автоматическим fallback
   * @param language Язык контента
   * @returns Массив казино
   */
  async getCasinos(language: string = 'en'): Promise<OnlineCasino[]> {
    const queryParams = new URLSearchParams({
      'populate[Logo]': 'true',
      'populate[General]': 'true',
      'populate[Payment_info]': 'true',
      'populate[Games_info]': 'true',
      'populate[similar_casinos][populate][Logo]': 'true',
      locale: language,
    });
    const url = `/api/online-casinos?${queryParams.toString()}`;
    const response = await apiClient.get<CasinosResponse>(url);
    
    if (!response.data) {
      return [];
    }
    return response.data;
  },

  async getCasinoBySlug(
    slug: string, 
    language: string, 
    options?: RequestInit
  ): Promise<OnlineCasino | null> {
    const queryParams = new URLSearchParams({
      'filters[slug][$eq]': slug,      
      'populate[Logo]': 'true',
      'populate[General]': 'true',
      'populate[Payment_info]': 'true',
      'populate[Games_info]': 'true',
      'populate[similar_casinos][populate][Logo]': 'true',         
      locale: language,      
    });

    const url = `/api/online-casinos?${queryParams.toString()}`;
    const response = await apiClient.get<CasinosResponse>(url, options);

    if (response.data && response.data.length > 0) {
        return response.data[0];
    }
    return null; 
  },

  /**
   * Получает казино по слагу с автоматическим fallback на английский язык
   * Использует новую backend логику с умным дополнением контента
   * @param slug Слаг казино
   * @param language Предпочтительный язык
   * @param options Дополнительные опции запроса
   * @returns Казино с fallback контентом или null
   */
  async getCasinoBySlugWithFallback(
    slug: string, 
    language: string = 'en', 
    options?: RequestInit
  ): Promise<OnlineCasino | null> {
    const queryParams = new URLSearchParams({
      'filters[slug][$eq]': slug,      
      'populate[Logo]': 'true',
      'populate[General]': 'true',
      'populate[Payment_info]': 'true',
      'populate[Games_info]': 'true',
      'populate[similar_casinos][populate][Logo]': 'true',         
      locale: language,      // backend автоматически применит fallback логику
    });

    const url = `/api/online-casinos?${queryParams.toString()}`;
    const response = await apiClient.get<CasinosResponse>(url, options);

    if (response.data && response.data.length > 0) {
        return response.data[0];
    }
    return null; 
  },

  /**
   * Получает список казино с автоматическим fallback
   * @param language Предпочтительный язык
   * @param options Дополнительные опции запроса
   * @returns Массив казино с fallback контентом
   */
  async getCasinosWithFallback(
    language: string = 'en',
    options?: RequestInit
  ): Promise<OnlineCasino[]> {
    const queryParams = new URLSearchParams({
      'populate[Logo]': 'true',
      'populate[General]': 'true',
      'populate[Payment_info]': 'true',
      'populate[Games_info]': 'true',
      'populate[similar_casinos][populate][Logo]': 'true', 
      locale: language,  // backend автоматически применит fallback логику
    });
    const url = `/api/online-casinos?${queryParams.toString()}`;
    const response = await apiClient.get<CasinosResponse>(url, options);
    
    if (!response.data) {
      return [];
    }
    return response.data;
  },
};