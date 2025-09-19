/**
 * Сервис для получения IP адреса клиента
 */

export const getClientIP = async (): Promise<string> => {
  try {
    // Используем внешний сервис для получения IP адреса клиента
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error getting client IP:', error);
    // Fallback к тестовому IP
    return '8.8.8.8';
  }
};
