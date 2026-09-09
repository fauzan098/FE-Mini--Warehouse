import apiService from '../api'

export const getWarehouses = (query = '', options = {}) => {
  return apiService.get(`/api/v1/warehouses${query}`, options)
}

export const getWarehouseById = (id, options = {}) => {
  return apiService.get(`/api/v1/warehouses/${id}`, options)
}

export const createWarehouse = (data, options = {}) => {
  return apiService.post('/api/v1/warehouses', data, options)
}

export const updateWarehouse = (id, data, options = {}) => {
  return apiService.put(`/api/v1/warehouses/${id}`, data, options)
}

export const deleteWarehouse = (id, options = {}) => {
  return apiService.delete(`/api/v1/warehouses/${id}`, options)
}

export const getWarehouseProductByWarehouseID = (warehouseId, options = {}) => {
  return apiService.get(`/api/v1/warehouse-products/${warehouseId}`, options)
}

export const uploadWarehouseImage = (file, options = {}) => {
  const formData = new FormData()
  formData.append('image', file)

  return apiService.request('/api/v1/upload-warehouse', {
    method: 'POST',
    headers: {
      Authorization: apiService.createHeaders().Authorization,
    },
    body: formData,
    ...options,
  })
}

export const assignProductToWarehouse = (warehouseId, requestData, options = {}) => {
  return apiService.post(`/api/v1/warehouse-products/${warehouseId}`, requestData, options)
}

export const getWarehouseProductByWarehouseIDAndProductID = (
  warehouseId,
  productId,
  options = {},
) => {
  return apiService.get(`/api/v1/warehouse-products/${warehouseId}/detail/${productId}`, options)
}

export const updateWarehouseProductStock = (warehouseId, productId, requestData, options = {}) => {
  return apiService.put(
    `/api/v1/warehouse-products/${warehouseId}/detail/${productId}`,
    requestData,
    options,
  )
}

export const getWarehousesForProduct = (productId, options = {}) =>
  apiService.get(`/api/v1/warehouse-products/detail/products/${productId}`, options)

export default {
  getWarehouses,
  getWarehouseById,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
  assignProductToWarehouse,
  getWarehouseProductByWarehouseIDAndProductID,
  updateWarehouseProductStock,
  getWarehousesForProduct,
}
