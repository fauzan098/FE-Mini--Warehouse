import apiService from '../api'

export const getMerchants = (query = {}, options = {}) => {
  return apiService.get(`/api/v1/merchants${query}`, options)
}

export const getMerchantById = (id, options = {}) => {
  return apiService.get(`/api/v1/merchants/${id}`, options)
}

export const createMerchant = (data, options = {}) => {
  return apiService.post('/api/v1/merchants', data, options)
}

export const updateMerchant = (id, data, options = {}) => {
  return apiService.put(`/api/v1/merchants/${id}`, data, options)
}

export const deleteMerchant = (id, options = {}) => {
  return apiService.delete(`/api/v1/merchants/${id}`, options)
}

export const uploadMerchantImage = (file, options = {}) => {
  const formData = new FormData()
  formData.append('image', file)

  return apiService.request('/api/v1/upload-merchant', {
    method: 'POST',
    headers: {
      Authorization: apiService.createHeaders().Authorization,
    },
    body: formData,
    ...options,
  })
}

export const getMerchantProducts = (query = '', options = {}) => {
  return apiService.get(`/api/v1/merchant-products${query}`, options)
}

export const assignProductToMerchant = (data, options = {}) =>
  apiService.post(`/api/v1/merchant-products`, data, options)

export const updateMerchantProductStock = (data, options = {}) =>
  apiService.put(`/api/v1/merchant-products/${data.merchant_product_id}`, data, options)

export const getMerchantProductByBarcode = (barcode, merchantId, options = {}) =>
  apiService.get(`/api/v1/merchant-products/barcode/${barcode}?merchant_id=${merchantId}`, options)
export default {
  getMerchants,
  getMerchantById,
  createMerchant,
  updateMerchant,
  deleteMerchant,
  uploadMerchantImage,
  assignProductToMerchant,
  getMerchantProductByBarcode,
}
