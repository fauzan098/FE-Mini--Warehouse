import apiService from '../api'

export const getTransactions = (query = '', options = {}) =>
  apiService.get(`/api/v1/transactions${query}`, options)

export const createTransaction = (data, options = {}) =>
  apiService.post('/api/v1/transactions', data, options)

export default {
  getTransactions,
  createTransaction,
}
