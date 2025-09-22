import { createAccessTokenStore } from "./tokenStore";

class ApiClient {
  private baseURL: string;

  constructor() {
    // В продакшене используем переменную окружения, в development - прокси
    this.baseURL = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://prized-festival-c69e982a8e.strapiapp.com'
      : '/api/strapi';
    
    if (!this.baseURL) {
      console.warn('NEXT_PUBLIC_STRAPI_API_URL is not defined');
    }
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { 
        method: 'GET',
        ...options, 
    });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  getBaseURL(): string {
    return this.baseURL;
  }
}

export const clientTokenStore = createAccessTokenStore();
export const apiClient = new ApiClient();


/**
 * Интерфейс для данных переводов из Strapi
 */
interface StrapiTranslationResponse {
  data: Array<{
    id: number;
    documentId: string;
    localeKey: string;
    content: Record<string, unknown>;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    flag?: {
      id: number;
      documentId: string;
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: number;
      height: number;
      formats: unknown;
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: unknown;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  }>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/**
 * Интерфейс для языковых данных
 */
export interface LanguageData {
  code: string;
  name: string;
  flag?: {
    url: string;
    name: string;
  };
}

/**
 * Загружает переводы для указанного языка из Strapi
 */
export const loadTranslationsFromStrapi = async (localeKey: string): Promise<Record<string, unknown>> => {
  try {
    const response = await apiClient.get<StrapiTranslationResponse>(`/api/translations?filters[localeKey][$eq]=${localeKey}&populate=*`);
    
    if (response.data && response.data.length > 0) {
      const translationData = response.data[0];
      return translationData.content;
    }
    
    throw new Error(`No translations found for locale: ${localeKey}`);
  } catch (error) {
    console.error(`Failed to load translations for ${localeKey}:`, error);
    throw error;
  }
};

/**
 * Загружает список всех доступных языков из Strapi
 */
export const loadAvailableLanguagesFromStrapi = async (): Promise<LanguageData[]> => {
  try {
    const response = await apiClient.get<StrapiTranslationResponse>('/api/translations?populate=*');
    
    if (response.data && response.data.length > 0) {

      const languages: LanguageData[] = response.data.map(item => ({
        code: item.localeKey,
        name: item.localeKey,
        flag: item.flag ? {
          url: item.flag.url,
          name: item.flag.name
        } : undefined
      }));
      
      return languages;
    }
    return [];
  } catch (error) {
    console.error('Failed to load available languages:', error);
    return [];
  }
};