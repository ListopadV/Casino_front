
import { apiClient } from './apiClient';
import { OnlineCasino } from '@/features/main/types'; 

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
  async getCasinos(language: string): Promise<OnlineCasino[]> {
    const queryParams = new URLSearchParams({
      populate: '*', 
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
      populate: '*',         
      locale: language,      
    });

    const url = `/api/online-casinos?${queryParams.toString()}`;
    const response = await apiClient.get<CasinosResponse>(url, options);

    if (response.data && response.data.length > 0) {
        return response.data[0];
    }
    return null; 
  },
};