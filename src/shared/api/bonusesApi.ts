// src/shared/api/bonusesApi.ts
import { apiClient } from './apiClient';

export interface StrapiMediaAttributes {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: Record<string, unknown>; 
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string; 
  previewUrl: string | null;
  provider: string;
  provider_metadata: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiMedia {
  id: number;
  attributes: StrapiMediaAttributes;
}

export interface RichTextTextChild {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
}

export interface RichTextListItemChild { 
    type: 'list-item'; 
    children: RichTextTextChild[];
}

export interface RichTextBlock {
  type: 'paragraph' | 'list' | 'heading' | 'image' | string;
  children: (RichTextTextChild | RichTextListItemChild)[]; 
  level?: number; 
  format?: string; 
}

// --- ИНТЕРФЕЙСЫ ДЛЯ ПОВТОРЯЕМЫХ КОМПОНЕНТОВ (Info Block) ---
export interface DetailItem {
    id: number;
    Name: string; 
    description: string; 
}


export interface Bonus {
  id: number;
  Name: string;
  slug: string; 
  BonusLink: string;
  Welcome_cash_link?: string; 
  Welcome_pack?: string; 
  Rating_Num?: number; 
  Is_new?: boolean; 
  Logo?: StrapiMediaAttributes | null;
  What_we_like?: RichTextBlock[]; 
  What_we_dont_like?: RichTextBlock[]; 
  General?: DetailItem[]; 
  Payment_info?: DetailItem[]; 
  Games_info?: DetailItem[]; 
  About_casino?: RichTextBlock[]; 
}

// Интерфейс для ответа Strapi API при получении коллекции (списка) записей
export interface BonusesResponse {
  data: Bonus[]; 
}

export const bonusesApi = {
  /**
   *
   * @param language Текущий язык.
   * @returns Promise, который разрешается в массив объектов Bonus.
   */
  async getBonuses(language: string): Promise<Bonus[]> {
    const queryParams = new URLSearchParams({
      populate: '*', 
      locale: language,  
    });
    const url = `/api/casino-bonuses?${queryParams.toString()}`;

    const response = await apiClient.get<BonusesResponse>(url);
    
    return response.data || []; 
  },

  /**
   * Получает детали одного бонуса по его slug.
   *
   * @param slug Уникальный идентификатор бонуса (slug).
   * @param language Текущий язык.
   * @returns Promise, который разрешается в объект Bonus или null, если бонус не найден.
   */
  async getBonusBySlug(slug: string, language: string): Promise<Bonus | null> {
    // Правильное кодирование URL параметров
    const queryParams = new URLSearchParams({
      'filters[slug][$eq]': slug,      
      populate: '*',         
      locale: language,      
    });

    const url = `/api/casino-bonuses?${queryParams.toString()}`;

    const response = await apiClient.get<BonusesResponse>(url);

    if (response.data && response.data.length > 0) {
        return response.data[0];
    }
    return null; 
  },
};