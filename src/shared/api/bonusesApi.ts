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

export interface DetailItem {
    id: number;
    Name: string; 
    Description: string; 
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

export interface BonusesResponse {
  data: Bonus[]; 
  meta?: any; 
}

export const bonusesApi = {
  /**
   *
   * @param language 
   * @returns 
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
      populate: '*',         
      locale: language,      
    });

    const url = `/api/casino-bonuses?${queryParams.toString()}`;

    const response = await apiClient.get<BonusesResponse>(url, options);

    if (response.data && response.data.length > 0) {
        return response.data[0];
    }
    return null; 
  },
};