const MIDTRANS_CONFIG = {
  SNAP_CONFIG: {
    onSuccess: (result) => {
      console.log(result)
      window.location.href = '/payment/success'
    },
    onPending: (result) => {
      console.log(result)
      window.location.href = '/payment/pending'
    },
    onError: (result) => {
      console.log(result)
      window.location.href = '/payment/error'
    },
    onClose: () => {
      console.log('User closed the popup')
      window.location.href = '/payment/cancelled'
    },
  },
}

class MidtransService {
  constructor() {
    this.config = MIDTRANS_CONFIG
    this.snap = null
    this.initSnap()
  }

  /**
   * Initialize Midtrans Snap
   */
  initSnap() {
    // Tunggu sampai window.snap tersedia
    if (typeof window !== 'undefined' && window.snap) {
      this.snap = window.snap
      console.log('✅ Midtrans Snap initialized')
    } else {
      // Retry setelah 1 detik jika belum tersedia
      setTimeout(() => {
        this.initSnap()
      }, 1000)
    }
  }

  /**
   * Force initialize Snap (untuk debugging)
   */
  forceInitSnap() {
    if (typeof window !== 'undefined' && window.snap) {
      this.snap = window.snap
      console.log('✅ Midtrans Snap force initialized')
      return true
    }
    return false
  }

  /**
   * Check if Midtrans script is loaded
   */
  isScriptLoaded() {
    const scriptLoaded = typeof window !== 'undefined' && window.snap
    console.log('🔍 Script loaded check:', {
      windowAvailable: typeof window !== 'undefined',
      scriptLoaded: scriptLoaded,
    })
    return scriptLoaded
  }

  /**
   * Check if Snap is ready
   */
  isSnapReady() {
    const isReady = this.snap !== null && typeof this.snap.pay === 'function'
    console.log('🔍 Snap ready check:', {
      snap: this.snap,
      hasPayFunction: typeof this.snap?.pay === 'function',
      isReady: isReady,
    })
    return isReady
  }

  /**
   * Open Midtrans Snap popup untuk pembayaran menggunakan payment_token
   */
  openSnapPayment(paymentToken, transactionData = null) {
    try {
      // Pastikan Snap sudah siap
      if (!this.isSnapReady()) {
        throw new Error('Midtrans Snap not ready. Please try again.')
      }

      // Simpan data transaksi untuk callback jika ada
      if (transactionData) {
        localStorage.setItem('currentTransaction', JSON.stringify(transactionData))
      }

      // Buka Snap popup dengan payment token
      this.snap.pay(paymentToken, this.config.SNAP_CONFIG)

      return { success: true, token: paymentToken }
    } catch (error) {
      console.error('❌ Error opening Snap payment:', error)
      throw error
    }
  }

  /**
   * Handle payment callback dari Midtrans
   */
  handlePaymentCallback(result) {
    try {
      console.log('🔄 Payment callback received:', result)

      // Simpan status pembayaran
      localStorage.setItem('paymentStatus', JSON.stringify(result))

      // Ambil data transaksi yang tersimpan
      const transactionData = localStorage.getItem('currentTransaction')

      if (transactionData) {
        const transaction = JSON.parse(transactionData)

        // Update status transaksi berdasarkan result
        this.updateTransactionStatus(transaction.order_id, result)
      }

      return result
    } catch (error) {
      console.error('❌ Error handling payment callback:', error)
      throw error
    }
  }

  /**
   * Update status transaksi di backend
   */
  async updateTransactionStatus(orderId, paymentResult) {
    try {
      const response = await fetch('/api/v1/transactions/update-status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify({
          order_id: orderId,
          payment_status: paymentResult.transaction_status,
          payment_data: paymentResult,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      console.log('✅ Transaction status updated:', result)

      return result
    } catch (error) {
      console.error('❌ Error updating transaction status:', error)
      throw error
    }
  }

  /**
   * Get payment status
   */
  getPaymentStatus() {
    try {
      const status = localStorage.getItem('paymentStatus')
      return status ? JSON.parse(status) : null
    } catch (error) {
      console.error('❌ Error getting payment status:', error)
      return null
    }
  }

  /**
   * Clear payment data
   */
  clearPaymentData() {
    localStorage.removeItem('currentTransaction')
    localStorage.removeItem('paymentStatus')
  }
}

const midtransService = new MidtransService()
export default midtransService

export const openSnapPayment = (paymentToken, transactionData) =>
  midtransService.openSnapPayment(paymentToken, transactionData)
export const handlePaymentCallback = (result) => midtransService.handlePaymentCallback(result)
export const getPaymentStatus = () => midtransService.getPaymentStatus()
export const clearPaymentData = () => midtransService.clearPaymentData()
export const isSnapReady = () => midtransService.isSnapReady()
export const forceInitSnap = () => midtransService.forceInitSnap()
export const isScriptLoaded = () => midtransService.isScriptLoaded()
