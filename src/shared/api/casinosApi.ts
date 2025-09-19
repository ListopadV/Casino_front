import { apiClient } from './apiClient';

export interface OnlineCasino {
  id: number;
  Name: string;
  Rating_Pic?: {
    url: string;
  };
  Rating_Num: number;
  ReviewLink: string;
  Bonus_inf?: string; 
}

export interface CasinosResponse {
  data: Array<{
    id: number;
    attributes?: Record<string, unknown>;
    [key: string]: unknown;
  }>;
}

export const casinosApi = {
  async getCasinos(language: string): Promise<OnlineCasino[]> {
    const response = await apiClient.get<CasinosResponse>('/api/online-casinos', {
      populate: 'Rating_Pic',
      locale: language,
    });
    
    if (!response.data) {
      return [];
    }

    // Нормализация данных - убираем замыкание attributes
    const normalizedData = response.data.map((item) => {
      return {
        id: item.id,
        ...(item.attributes || item)
      } as OnlineCasino;
    });

    return normalizedData;
  },
};
