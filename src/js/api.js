import { APP_CONFIG, getApiUrl } from '@/config/app'

class ApiService {
  constructor() {
    this.baseUrl = APP_CONFIG.API.BASE_URL
    this.timeout = APP_CONFIG.API.TIMEOUT
  }

  getAuthToken() {
    return localStorage.getItem('auth_token')
  }

  setAuthToken(token) {
    localStorage.setItem('auth_token', token)
  }

  removeAuthToken() {
    localStorage.removeItem('auth_token')
  }
  createHeaders(includeAuth = true) {
    const headers = {
      'Content-Type': 'application/json',
    }
    if (includeAuth) {
      const token = this.getAuthToken()
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
    }
    return headers
  }

  async request(endpoint, options = {}) {
    const url = getApiUrl(endpoint)
    const headers = this.createHeaders(options.includeAuth !== false)

    const config = {
      headers,
      ...options,
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)
    config.signal = controller.signal

    try {
      const response = await fetch(url, config)
      clearTimeout(timeoutId)

      if (response.status === 401) {
        this.removeAuthToken()
        window.location.href = '/'
        throw new Error('Unauthorized')
      }

      if (response.status === 403) {
        throw new Error('Forbidden')
      }

      if (response.status >= 500) {
        throw new Error('Internal Server Error')
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP ${response.status}`)
      }

      return response.json()
    } catch (error) {
      clearImmediate(timeoutId)
      if (error.name === 'AbortError') {
        throw new Error('Request timed out')
      }
      throw error
    }
  }

  async post(endpoint, data = {}, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    })
  }

  async get(endpoint, options = {}) {
    return this.request(endpoint, {
      method: 'GET',
      ...options,
    })
  }

  async put(endpoint, data = {}, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    })
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, {
      method: 'DELETE',
      ...options,
    })
  }
}

const apiService = new ApiService()
export default apiService

export const clearAllLocalStorage = () => {
  localStorage.removeItem('auth_token')
  localStorage.removeItem('user')
  localStorage.removeItem('merchant_data')
}

export const removeAuthToken = () => apiService.removeAuthToken()

export const getMerchantDataFromStorage = () => {
  try {
    const merchantData = localStorage.getItem('merchant_data')
    return merchantData ? JSON.parse(merchantData) : null
  } catch (error) {
    console.error('Error parsing merchant data from localStorage:', error)
    return null
  }
}

export const getFirstMerchantFromStorage = () => {
  const merchantData = getMerchantDataFromStorage()
  return merchantData && merchantData.length > 0 ? merchantData[0] : null
}
