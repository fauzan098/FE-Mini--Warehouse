import apiService from '../api'

// Users
export const getUsers = (query = '', options = {}) =>
  apiService.get(`/api/v1/users${query}`, options)

export const getUserById = (id, options = {}) => {
  return apiService.get(`/api/v1/users/${id}`, options)
}
export const createUser = (data, options = {}) => apiService.post('/api/v1/users', data, options)

export const updateUser = (id, data, options = {}) =>
  apiService.put(`/api/v1/users/${id}`, data, options)

export const uploadUserImage = (file, options = {}) => {
  const formData = new FormData()
  formData.append('image', file)

  return apiService.request('/api/v1/upload/photo', {
    method: 'POST',
    body: formData,
    headers: {
      // Don't set Content-Type, let browser set it with boundary for FormData
      Authorization: apiService.createHeaders().Authorization,
    },
    ...options,
  })
}

// Keeper
export const getKeepers = (query = '', options = {}) =>
  apiService.get(`/api/v1/users/role/Keeper${query}`, options)

export const getKeeperById = (id, options = {}) => apiService.get(`/api/v1/users/${id}`, options)

// Roles
export const getRoles = (query = '', options = {}) =>
  apiService.get(`/api/v1/roles${query}`, options)

export const getRoleById = (id, options = {}) => apiService.get(`/api/v1/roles/${id}`, options)

export const createRole = (data, options = {}) => apiService.post(`/api/v1/roles`, data, options)

export const updateRole = (id, data, options = {}) =>
  apiService.put(`/api/v1/roles/${id}`, data, options)

export const deleteRole = (id, options = {}) => apiService.delete(`/api/v1/roles/${id}`, options)

export const getUserRoles = (query = '', options = {}) =>
  apiService.get(`/api/v1/assign-role${query}`, options)

export const createUserRole = (data, options = {}) =>
  apiService.post('/api/v1/assign-role', data, options)

export const getUserRoleById = (id, options = {}) =>
  apiService.get(`/api/v1/assign-role/${id}`, options)

export const updateUserRole = (id, data, options = {}) =>
  apiService.put(`/api/v1/assign-role/${id}`, data, options)

export const removeAuthToken = () => apiService.removeAuthToken()

export default {
  getUsers,
  getUserById,
  createUser,
  uploadUserImage,
  getKeepers,
  getKeeperById,
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
  getUserRoles,
  createUserRole,
  getUserRoleById,
  removeAuthToken,
}
