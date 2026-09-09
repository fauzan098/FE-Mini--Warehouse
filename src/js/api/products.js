import apiService from '../api'

export const getProducts = (options = {}) => {
  return apiService.get('/api/v1/products', options)
}

export const getProductById = (id, options = {}) => {
  return apiService.get(`/api/v1/products/${id}`, options)
}

export const createProduct = (data, options = {}) => {
  return apiService.post('/api/v1/products', data, options)
}

export const updateProduct = (id, data, options = {}) => {
  return apiService.put(`/api/v1/products/${id}`, data, options)
}

export const deleteProduct = (id, options = {}) => {
  return apiService.delete(`/api/v1/products/${id}`, options)
}

export const uploadProductImage = (file, options = {}) => {
  const formData = new FormData()
  formData.append('image', file)

  return apiService.request('/api/v1/upload-product/product-image', {
    method: 'POST',
    headers: {
      Authorization: apiService.createHeaders().Authorization,
    },
    body: formData,
    ...options,
  })
}

export const getCategories = (options = {}) => apiService.get('/api/v1/categories', options)
export const getCategoryById = (id, options = {}) =>
  apiService.get(`/api/v1/categories/${id}`, options)
export const createCategory = (data, options = {}) =>
  apiService.post('/api/v1/categories', data, options)
export const updateCategory = (id, data, options = {}) =>
  apiService.put(`/api/v1/categories/${id}`, data, options)
export const deleteCategory = (id, options = {}) => {
  return apiService.delete(`/api/v1/categories/${id}`, options)
}

export const uploadCategoryImage = (file, options = {}) => {
  const formData = new FormData()
  formData.append('image', file)

  return apiService.request('/api/v1/upload-product/category-image', {
    method: 'POST',
    headers: {
      Authorization: apiService.createHeaders().Authorization,
    },
    body: formData,
    ...options,
  })
}

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  deleteCategory,
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
}
