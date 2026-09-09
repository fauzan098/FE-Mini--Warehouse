export const APP_CONFIG = {
  API: {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
    TIMEOUT: import.meta.env.VITE_API_TIMEOUT || 10000,
    RETRY_ATTEMPTS: 3,
    LOGIN_ENDPOINT: '/api/v1/auth/login',
  },
}

export const getApiUrl = (endpoint) => {
  return `${APP_CONFIG.API.BASE_URL}${endpoint}`
}
