import { apiClient } from './apiClient';

export interface Bonus {
  id: number;
  Name: string;
  BonusLink: string;
  Logo?: {
    url: string;
  };
}

export interface BonusesResponse {
  data: Bonus[];
}

export const bonusesApi = {
  async getBonuses(language: string): Promise<Bonus[]> {
    const response = await apiClient.get<BonusesResponse>('/api/casino-bonuses', {
      populate: 'Logo',
      locale: language,
    });
    
    return response.data || [];
  },
};
