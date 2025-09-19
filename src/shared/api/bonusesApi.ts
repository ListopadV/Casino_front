// src/shared/api/bonusesApi.ts
import { apiClient } from './apiClient';

export interface StrapiMediaAttributes {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: any; 
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string; 
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
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
  Logo?: { 
    data: StrapiMedia | null;
  };
  What_we_like?: RichTextBlock[]; 
  What_we_dont_like?: RichTextBlock[]; 
  General?: DetailItem[]; 
  Payment_info?: DetailItem[]; 
  Games_info?: DetailItem[]; 
  About_casino?: RichTextBlock[]; 
}

// Интерфейс для ответа Strapi API при получении коллекции (списка) записей
export interface BonusesResponse {
  data: {
    id: number;
    attributes: Bonus;
  }[]; 
}

export const bonusesApi = {
  /**
   *
   * @param language Текущий язык.
   * @returns Promise, который разрешается в массив объектов Bonus.
   */
  async getBonuses(language: string): Promise<Bonus[]> {
    const queryParams = new URLSearchParams({
      populate: 'Logo', 
      locale: language,  
    });
    const url = `/api/casino-bonuses?${queryParams.toString()}`;

    const response = await apiClient.get<BonusesResponse>(url);
    
    return response.data.map(item => {
        const attributesWithoutId: Omit<Bonus, 'id'> = item.attributes;
        return {
            id: item.id, 
            ...attributesWithoutId 
        };
    }) || []; 
  },

  /**
   * Получает детали одного бонуса по его slug.
   *
   * @param slug Уникальный идентификатор бонуса (slug).
   * @param language Текущий язык.
   * @returns Promise, который разрешается в объект Bonus или null, если бонус не найден.
   */
  async getBonusBySlug(slug: string, language: string): Promise<Bonus | null> {
    const filters = JSON.stringify({ slug: { $eq: slug } }); 
    const queryParams = new URLSearchParams({
      filters: filters,      
      populate: '*',         
      locale: language,      
    });
    const url = `/api/casino-bonuses?${queryParams.toString()}`;

    const response = await apiClient.get<BonusesResponse>(url);

    if (response.data && response.data.length > 0) {
        const attributesWithoutId: Omit<Bonus, 'id'> = response.data[0].attributes;
        return {
            id: response.data[0].id,
            ...attributesWithoutId
        };
    }
    return null; 
  },
};