import { apiClient } from './apiClient';

export interface CasinoReview {
  id?: number;
  userName: string;
  userEmail?: string;
  Rating: number;
  Comment?: string;
  Approved?: boolean;
  online_casino?: number;
  Created?: string;
}

export interface CasinoReviewResponse {
  data: {
    id: number;
    attributes: CasinoReview;
  };
}

export interface CreateReviewData {
  userName: string;
  userEmail?: string;
  Rating: number;
  Comment?: string;
  online_casino?: number;
}

export const reviewsApi = {
  /**
   * Создать новый отзыв
   */
  async createReview(reviewData: CreateReviewData): Promise<CasinoReview> {
    const response = await apiClient.post<CasinoReviewResponse>('/api/casino-reviews', {
      data: {
        ...reviewData,
        Created: new Date().toISOString(),
        Approved: false, // По умолчанию отзыв не одобрен
      }
    });
    
    return {
      id: response.data.id,
      ...response.data.attributes
    };
  },

  /**
   * Получить отзывы для конкретного казино
   */
  // async getReviewsByCasino(casinoId: number): Promise<CasinoReview[]> {
  //   const response = await apiClient.get<{data: Array<{id: number, attributes: CasinoReview}>}>(`/api/casino-reviews`, {
       
  //     'filters[online_casino][id][$eq]': casinoId.toString(),
  //     'filters[Approved][$eq]': 'true',
  //     'sort': 'Created:desc'
  //   });
    
  //   return response.data.map(item => ({
  //     id: item.id,
  //     ...item.attributes
  //   }));
  // },

  /**
   * Получить все одобренные отзывы
   */
  // async getApprovedReviews(): Promise<CasinoReview[]> {
  //   const response = await apiClient.get<{data: Array<{id: number, attributes: CasinoReview}>}>(`/api/casino-reviews`, {
  //     'filters[Approved][$eq]': 'true',
  //     'sort': 'Created:desc',
  //     'populate': 'online_casino'
  //   });
    
  //   return response.data.map(item => ({
  //     id: item.id,
  //     ...item.attributes
  //   }));
  // }
};
