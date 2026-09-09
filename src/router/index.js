import { authMiddleware } from '@/middleware/auth'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/overview',
    name: 'Overview',
    component: () => import('@/views/Overview.vue'),
    meta: { requiresAuth: true, roles: ['manager'] },
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/ManageProducts.vue'),
    meta: { requiresAuth: true, roles: ['manager'] },
  },
  {
    path: '/add-products',
    name: 'AddProducts',
    component: () => import('@/views/AddProducts.vue'),
    meta: { requiresAuth: true, roles: ['manager'] },
  },
  {
    path: '/edit-products/:id',
    name: 'EditProducts',
    component: () => import('@/views/EditProducts.vue'),
    meta: { requiresAuth: true, roles: ['manager'] },
  },
  {
    path: '/categories',
    name: 'ManageCategories',
    component: () => import('@/views/ManageCategories.vue'),
    meta: { requiresAuth: true, roles: ['manager'] },
  },
  {
    path: '/add-categories',
    name: 'AddCategories',
    component: () => import('@/views/AddCategories.vue'),
    meta: { requiresAuth: true, roles: ['manager'] },
  },
  {
    path: '/edit-categories/:id',
    name: 'EditCategories',
    component: () => import('@/views/EditCategories.vue'),
    meta: { requiresAuth: true, roles: ['manager'] },
  },
  {
    path: '/warehouses',
    name: 'ManageWarehouses',
    component: () => import('@/views/ManageWarehouses.vue'),
    meta: { requiresAuth: true, roles: ['manager'] },
  },
  {
    path: '/add-warehouses',
    name: 'AddWarehouses',
    component: () => import('@/views/AddWarehouses.vue'),
    meta: { requiresAuth: true, roles: ['manager'] },
  },
  {
    path: '/edit-warehouses/:id',
    name: 'EditWarehouses',
    component: () => import('@/views/EditWarehouses.vue'),
    meta: { requiresAuth: true, roles: ['manager'] },
  },
  {
    path: '/detail-warehouses/:id',
    name: 'DetailWarehouses',
    component: () => import('@/views/DetailWarehouses.vue'),
    meta: { requiresAuth: true, roles: ['manager'] },
  },
  {
    path: '/assign-warehouse-products/:id',
    name: 'AssignWarehouseProducts',
    component: () => import('@/views/AssignWarehouseProducts.vue'),
    meta: { requiresAuth: true, roles: ['manager'] },
  },
  {
    path: '/update-stock-warehouses/:warehouseId/stock/:productId',
    name: 'UpdateStockWarehouses',
    component: () => import('@/views/UpdateStockWarehouses.vue'),
    meta: { requiresAuth: true, roles: ['manager'] },
  },
  {
    path: '/merchants',
    name: 'ManageMerchants',
    component: () => import('@/views/ManageMerchants.vue'),
    meta: { requiresAuth: true, roles: ['manager'] },
  },
  {
    path: '/add-merchants',
    name: 'AddMerchants',
    component: () => import('@/views/AddMerchants.vue'),
    meta: { requiresAuth: true, roles: ['manager'] },
  },
  {
    path: '/edit-merchants/:id',
    name: 'EditMerchants',
    component: () => import('@/views/EditMerchants.vue'),
    meta: { requiresAuth: true, roles: ['manager'] },
  },
  {
    path: '/detail-merchants/:id',
    name: 'DetailMerchants',
    component: () => import('@/views/DetailMerchants.vue'),
    meta: { requiresAuth: true, roles: ['manager'] },
  },
  {
    path: '/assign-merchants-products/:id',
    name: 'AssignMerchantsProducts',
    component: () => import('@/views/AssignMerchantsProducts.vue'),
    meta: { requiresAuth: true, roles: ['manager'] },
  },
  {
    path: '/update-stock-merchants/:merchantId/stock/:productId',
    name: 'UpdateStockMerchants',
    component: () => import('@/views/UpdateStockMerchants.vue'),
    meta: { requiresAuth: true, roles: ['manager'] },
  },
  {
    path: '/roles',
    name: 'ManageRoles',
    component: () => import('@/views/ManageRoles.vue'),
    meta: { requiresAuth: true, roles: ['manager'] },
  },
  {
    path: '/add-roles',
    name: 'AddRoles',
    component: () => import('@/views/AddRoles.vue'),
    meta: { requiresAuth: true, roles: ['manager'] },
  },
  {
    path: '/edit-roles/:id',
    name: 'EditRoles',
    component: () => import('@/views/EditRoles.vue'),
    meta: { requiresAuth: true, roles: ['manager'] },
  },
  {
    path: '/users',
    name: 'ManageUsers',
    component: () => import('@/views/ManageUsers.vue'),
    meta: { requiresAuth: true, roles: ['manager'] },
  },
  {
    path: '/add-users',
    name: 'AddUsers',
    component: () => import('@/views/AddUsers.vue'),
    meta: { requiresAuth: true, roles: ['manager'] },
  },
  {
    path: '/edit-users/:id',
    name: 'EditUsers',
    component: () => import('@/views/EditUsers.vue'),
    meta: { requiresAuth: true, roles: ['manager'] },
  },
  {
    path: '/user-roles',
    name: 'ManageUserRoles',
    component: () => import('@/views/ManageUserRoles.vue'),
    meta: { requiresAuth: true, roles: ['manager'] },
  },
  {
    path: '/add-user-roles',
    name: 'AddUserRoles',
    component: () => import('@/views/AddUserRoles.vue'),
    meta: { requiresAuth: true, roles: ['manager'] },
  },
  {
    path: '/edit-user-roles/:id',
    name: 'EditUserRoles',
    component: () => import('@/views/EditUserRoles.vue'),
    meta: { requiresAuth: true, roles: ['manager'] },
  },
  {
    path: '/overview-merchant',
    name: 'OverviewMerchant',
    component: () => import('@/views/OverviewMerchant.vue'),
    meta: { requiresAuth: true, roles: ['keeper'] },
  },
  {
    path: '/my-merchant',
    name: 'MyMerchant',
    component: () => import('@/views/MyMerchant.vue'),
    meta: { requiresAuth: true, roles: ['keeper'] },
  },
  {
    path: '/transactions',
    name: 'ManageTransactions',
    component: () => import('@/views/ManageTransactions.vue'),
    meta: { requiresAuth: true, roles: ['keeper'] },
  },
  {
    path: '/transaction/add-1',
    name: 'AddTransaction1',
    component: () => import('@/views/AddTransaction1.vue'),
    meta: { requiresAuth: true, roles: ['keeper'] },
  },
  {
    path: '/transaction/add-2',
    name: 'AddTransaction2',
    component: () => import('@/views/AddTransaction2.vue'),
    meta: { requiresAuth: true, roles: ['keeper'] },
  },
  {
    path: '/transaction/add-3',
    name: 'AddTransaction3',
    component: () => import('@/views/AddTransaction3.vue'),
    meta: { requiresAuth: true, roles: ['keeper'] },
  },
  {
    path: '/payment/success',
    name: 'PaymentSuccess',
    component: () => import('@/views/PaymentSuccess.vue'),
    meta: { requiresAuth: true, roles: ['manager', 'keeper'] },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  try {
    await authMiddleware(to, from, next)
  } catch (error) {
    console.error('Navigation error:', error)
    next('/')
  }
})

export default router
