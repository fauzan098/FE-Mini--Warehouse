import { APP_CONFIG } from '@/config/app'
import { clearAllLocalStorage } from '@/js/api'
import { getMerchants } from '@/js/api/merchants'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    token: null,
    merchantData: null,
  }),
  getters: {
    currentUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated,
    userRole: (state) => state.user?.roles || null,
    currentToken: (state) => state.token,
    currentMerchant: (state) => state.merchantData,
  },
  actions: {
    async login(credentials) {
      try {
        const response = await fetch(`${APP_CONFIG.API.BASE_URL}${APP_CONFIG.API.LOGIN_ENDPOINT}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || 'Login failed')
        }

        const data = await response.json()
        const { token, user } = data.data

        this.user = {
          id: user.id,
          name: user.email.split('@')[0],
          email: user.email,
          roles: user.roles,
          avatar: '/src/assets/images/photos/photos-1.png',
        }

        this.token = token
        this.isAuthenticated = true

        localStorage.setItem('auth_token', token)
        localStorage.setItem('user', JSON.stringify(this.user))

        if (user.roles?.toLowerCase() === 'keeper') {
          await this.fetchAndStoreMerchants()
        }

        return data
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },

    async fetchAndStoreMerchants() {
      try {
        if (!this.user?.id) {
          console.error('User ID not found')
          return
        }

        const response = await getMerchants(`?keeper_id=${this.user.id}`)
        if (response.data) {
          const merchantData = Array.isArray(response.data) ? response.data : [response.data]
          const merchantDataForStorage = merchantData.map((merchant) => ({
            id: merchant.id,
            name: merchant.name,
            address: merchant.address,
            photo: merchant.photo,
            phone: merchant.phone,
            keeper_id: merchant.keeper_id,
            keeper_name: merchant.keeper_name,
          }))

          this.merchantData = merchantDataForStorage
          localStorage.setItem('merchant_data', JSON.stringify(merchantDataForStorage))
        }
      } catch (error) {
        console.error('Error fetching and storing merchants:', error)
        return null
      }
    },

    getRedirectUrl() {
      const role = this.user?.roles?.toLowerCase()

      switch (role) {
        case 'manager':
          return '/overview'
        case 'keeper':
          return '/overview-merchant'
        default:
          return '/'
      }
    },

    resetState() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
    },

    clearLocalStorageData() {
      clearAllLocalStorage()
      this.resetState()
    },

    hasAccess(requiredRole) {
      const userRole = this.user?.roles?.toLowerCase()

      const roleHierarchy = {
        manager: 2,
        keeper: 1,
      }

      const userLevel = roleHierarchy[userRole] || 0
      const requiredLevel = roleHierarchy[requiredRole] || 0

      return userLevel >= requiredLevel
    },

    async logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      this.merchantData = null

      this.clearLocalStorageData()
    },

    async checkAuth() {
      try {
        const token = localStorage.getItem('auth_token')
        const user = localStorage.getItem('user')

        if (token && user) {
          this.token = token
          this.user = JSON.parse(user)
          this.isAuthenticated = true

          return true
        }

        return false
      } catch (error) {
        console.error('Error checking authentication:', error)
        this.clearLocalStorageData()
        return false
      }
    },

    async fetchCurrentUser() {
      try {
        const { getUserById } = await import('@/js/api/users')
        const response = await getUserById(this.user.id)

        if (response.data) {
          this.user = {
            id: response.data.id,
            email: response.data.email,
            name: this.user.name || response.data.email.split('@')[0],
            roles: this.user.roles,
            avatar: response.data.photo || '/src/assets/images/photos/photos-1.png',
          }

          localStorage.setItem('user', JSON.stringify(this.user))
        }

        return response
      } catch (error) {
        console.error('Error fetching current user:', error)
        return this.user
      }
    },

    getMerchantData() {
      if (this.merchantData) {
        return this.merchantData
      }

      const storedData = localStorage.getItem('merchant_data')
      if (storedData) {
        this.merchantData = JSON.parse(storedData)
        return this.merchantData
      }

      return null
    },

    async refreshMerchantData() {
      if (this.user?.roles?.toLowerCase() === 'keeper') {
        await this.fetchAndStoreMerchants()
      }
    },
  },
})
