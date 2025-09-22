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
  folderPath: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

export interface StrapiMedia {
  id: number;
  documentId: string;
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
  folderPath: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
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

export interface DetailItem {
    id: number;
    Name: string; 
    Description: string; 
}

export interface Bonus {
  id: number;
  documentId: string;
  Name: string;
  slug: string; 
  Description?: string | null;
  Country?: string | null;
  Language?: string | null;
  BonusLink?: string;
  Welcome_cash_link?: string | null; 
  Welcome_pack?: string | null; 
  Rating_Num?: number | null; 
  Is_new?: boolean | null; 
  Logo?: StrapiMedia | null;
  What_we_like?: RichTextBlock[]; 
  What_we_dont_like?: RichTextBlock[]; 
  General?: DetailItem[]; 
  Payment_info?: DetailItem[]; 
  Games_info?: DetailItem[]; 
  About_casino?: RichTextBlock[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string;
  createdBy?: Record<string, unknown>;
  updatedBy?: Record<string, unknown>;
  localizations?: unknown[];
}

export interface BonusesResponse {
  data: Bonus[]; 
  meta?: Record<string, unknown>; 
}

export const bonusesApi = {
  /**
   * Получает список бонусов с автоматическим fallback
   * @param language Язык контента
   * @returns Массив бонусов
   */
  async getBonuses(language: string = 'en'): Promise<Bonus[]> {
    const queryParams = new URLSearchParams({
      'populate[Logo]': 'true',
      'populate[What_we_like]': 'true',
      'populate[What_we_dont_like]': 'true',
      'populate[General]': 'true',
      'populate[Payment_info]': 'true',
      'populate[Games_info]': 'true',
      'populate[About_casino]': 'true',
      locale: language,  
    });
    const url = `/api/casino-bonuses?${queryParams.toString()}`;

    const response = await apiClient.get<BonusesResponse>(url);
    
    return response.data || []; 
  },

  /**
   * @param slug 
   * @param language Текущий язык.
   * @param options 
   * @returns 
   */

  async getBonusBySlug(
    slug: string, 
    language: string, 
    options?: RequestInit
  ): Promise<Bonus | null> {
    const queryParams = new URLSearchParams({
      'filters[slug][$eq]': slug,      
      'populate[Logo]': 'true',
      'populate[What_we_like]': 'true',
      'populate[What_we_dont_like]': 'true',
      'populate[General]': 'true',
      'populate[Payment_info]': 'true',
      'populate[Games_info]': 'true',
      'populate[About_casino]': 'true',         
      locale: language,      
    });

    const url = `/api/casino-bonuses?${queryParams.toString()}`;

    const response = await apiClient.get<BonusesResponse>(url, options);

    if (response.data && response.data.length > 0) {
        return response.data[0];
    }
    return null; 
  },

  /**
   * Получает бонус по слагу с автоматическим fallback на английский язык
   * Использует новую backend логику с умным дополнением контента
   * @param slug Слаг бонуса
   * @param language Предпочтительный язык
   * @param options Дополнительные опции запроса
   * @returns Бонус с fallback контентом или null
   */
  async getBonusBySlugWithFallback(
    slug: string, 
    language: string = 'en', 
    options?: RequestInit
  ): Promise<Bonus | null> {
    const queryParams = new URLSearchParams({
      'filters[slug][$eq]': slug,      
      'populate[Logo]': 'true',
      'populate[What_we_like]': 'true',
      'populate[What_we_dont_like]': 'true',
      'populate[General]': 'true',
      'populate[Payment_info]': 'true',
      'populate[Games_info]': 'true',
      'populate[About_casino]': 'true',         
      locale: language,      // backend автоматически применит fallback логику
    });

    const url = `/api/casino-bonuses?${queryParams.toString()}`;

    const response = await apiClient.get<BonusesResponse>(url, options);

    if (response.data && response.data.length > 0) {
        return response.data[0];
    }
    return null; 
  },

  /**
   * Получает список бонусов с автоматическим fallback
   * @param language Предпочтительный язык
   * @param options Дополнительные опции запроса
   * @returns Массив бонусов с fallback контентом
   */
  async getBonusesWithFallback(
    language: string = 'en',
    options?: RequestInit
  ): Promise<Bonus[]> {
    const queryParams = new URLSearchParams({
      'populate[Logo]': 'true',
      'populate[What_we_like]': 'true',
      'populate[What_we_dont_like]': 'true',
      'populate[General]': 'true',
      'populate[Payment_info]': 'true',
      'populate[Games_info]': 'true',
      'populate[About_casino]': 'true', 
      locale: language,  // backend автоматически применит fallback логику
    });
    const url = `/api/casino-bonuses?${queryParams.toString()}`;

    const response = await apiClient.get<BonusesResponse>(url, options);
    
    return response.data || []; 
  },
};