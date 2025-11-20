const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com';

export const API_CONFIG = {
  baseUrl: API_BASE_URL,
  endpoints: {
    users: '/users',
  },
  timeout: 10000,
} as const;

export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'InfoPanel',
  itemsPerPage: Number(import.meta.env.VITE_ITEMS_PER_PAGE) || 5,
  enableDevTools: import.meta.env.VITE_ENABLE_DEV_TOOLS === 'true',
} as const;

export const env = {
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE,
} as const;
