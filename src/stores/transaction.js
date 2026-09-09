import { defineStore } from 'pinia'

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    customerInfo: {
      customerName: '',
      phoneNumber: '',
      email: '',
      address: '',
      merchantId: null,
      merchant: null,
    },

    assignedProducts: [],

    transactionSummary: {
      totalItems: 0,
      totalAmount: 0,
      customerName: '',
      merchantName: '',
    },

    currentStep: 1,

    isStep1Valid: false,
    isStep2Valid: false,
  }),

  getters: {
    isStep1Complete: (state) => {
      return (
        state.customerInfo.customerName.trim() &&
        state.customerInfo.phoneNumber.trim() &&
        state.customerInfo.merchantId
      )
    },

    isStep2Complete: (state) => {
      return state.assignedProducts.length > 0
    },

    totalItems: (state) => {
      return state.assignedProducts.reduce((total, product) => total + product.quantity, 0)
    },

    totalAmount: (state) => {
      return state.assignedProducts.reduce((total, product) => {
        const price = parseInt(product.price.replace(/[^\d]/g, ''))
        return total + price * product.quantity
      }, 0)
    },

    canProceedToStep2: (state) => state.isStep1Complete,
    canProceedToStep3: (state) => state.isStep2Complete,
    canSubmitTransaction: (state) => state.isStep1Complete && state.isStep2Complete,
  },

  actions: {
    setCustomerInfo(customerInfo) {
      this.customerInfo = {
        ...this.customerInfo,
        ...customerInfo,
      }
      this.isStep1Valid = this.isStep1Complete

      this.saveToLocalStorage()
    },

    setAssignedProducts(products) {
      this.assignedProducts = products
      this.isStep2Valid = this.isStep2Complete

      // Save to localStorage
      this.saveToLocalStorage()
    },

    addProduct(product) {
      const existingProduct = this.assignedProducts.find((p) => p.id === product.id)

      if (existingProduct) {
        existingProduct.quantity += product.quantity
        existingProduct.subtotal = this.calculateSubtotal(existingProduct)
      } else {
        this.assignedProducts.push({
          ...product,
          subtotal: this.calculateSubtotal(product),
        })
      }

      this.saveToLocalStorage()
    },

    removeProduct(productId) {
      const index = this.assignedProducts.findIndex((p) => p.id === productId)
      if (index > -1) {
        this.assignedProducts.splice(index, 1)
        this.saveToLocalStorage()
      }
    },

    saveToLocalStorage() {
      try {
        const data = {
          customerInfo: this.customerInfo,
          assignedProducts: this.assignedProducts,
          currentStep: this.currentStep,
        }
        localStorage.setItem('transactionWizard', JSON.stringify(data))
      } catch (error) {
        console.error('❌ Error saving transaction data:', error)
      }
    },

    updateProductQuantity(productId, quantity) {
      const product = this.assignedProducts.find((p) => p.id === productId)
      if (product) {
        product.quantity = quantity
        product.subtotal = this.calculateSubtotal(product)
        this.saveToLocalStorage()
      }
    },

    calculateSubtotal(product) {
      const price = parseInt(product.price.replace(/[^\d]/g, ''))
      return `Rp ${(price * product.quantity).toLocaleString('id-ID')}`
    },

    setCurrentStep(step) {
      this.currentStep = step
      this.saveToLocalStorage()
    },

    nextStep() {
      if (this.currentStep < 3) {
        this.currentStep++
        this.saveToLocalStorage()
      }
    },

    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--
        this.saveToLocalStorage()
      }
    },

    loadFromLocalStorage() {
      try {
        const storedData = localStorage.getItem('transactionWizard')
        if (storedData) {
          const data = JSON.parse(storedData)
          this.customerInfo = data.customerInfo || this.customerInfo
          this.assignedProducts = data.assignedProducts || this.assignedProducts
          this.currentStep = data.currentStep || 1
          this.isStep1Valid = this.isStep1Complete
          this.isStep2Valid = this.isStep2Complete
        }
      } catch (error) {
        console.error('❌ Error loading transaction data:', error)
      }
    },

    clearTransaction() {
      this.customerInfo = {
        customerName: '',
        phoneNumber: '',
        email: '',
        address: '',
        merchantId: null,
        merchant: null,
      }
      this.assignedProducts = []
      this.currentStep = 1
      this.isStep1Valid = false
      this.isStep2Valid = false

      // Clear from localStorage
      localStorage.removeItem('transactionWizard')
      localStorage.removeItem('transactionStep1')
      localStorage.removeItem('transactionStep2')
    },

    getTransactionSummary() {
      return {
        totalItems: this.totalItems,
        totalAmount: this.totalAmount,
        customerName: this.customerInfo.customerName,
        merchantName: this.customerInfo.merchant?.name || '',
        formattedTotalAmount: `Rp ${this.totalAmount.toLocaleString('id-ID')}`,
      }
    },
  },
})
