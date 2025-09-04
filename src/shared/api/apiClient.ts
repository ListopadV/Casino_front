import axios from 'axios';
import { createAccessTokenStore } from './tokenStore';
import { useRouter } from 'next/navigation';

export const clientTokenStore = createAccessTokenStore();

const apiClient = axios.create({
    baseURL: '',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use(
  (config) => {
    const token = clientTokenStore.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Интерсептор для ошибок
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const router = useRouter();

    if (error.response?.status === 401) {
      // Например, редирект на логин
        router.push('/login');
    }
    return Promise.reject(error);
  }
);

export { apiClient };
