import apiService from '../api'

export const getDashboardData = (query = '', options = {}) =>
  apiService.get(`/api/v1/dashboard/manager${query}`, options)

export const getKeeperDashboardData = (query = '', merchantId, options = {}) =>
  apiService.get(`/api/v1/dashboard/keeper/merchant/${merchantId}${query}`, options)

export default {
  getDashboardData,
  getKeeperDashboardData,
}
