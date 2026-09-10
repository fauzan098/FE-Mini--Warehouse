import { useAuthStore } from '@/stores/auth'

export async function authMiddleware(to, from, next) {
  const authStore = useAuthStore()

  const isAuthenticated = await authStore.checkAuth()

  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      next('/')
      return
    }

    if (to.meta.roles && to.meta.roles.length > 0) {
      const hasAccess = to.meta.roles.some(
        (role) =>
          authStore.userRoles.includes(String(role).toLowerCase()) ||
          authStore.hasAccess(role),
      )

      if (!hasAccess) {
        const redirectUrl = authStore.getRedirectUrl()
        if (redirectUrl !== to.path) {
          next(redirectUrl)
          return
        }
      }
    }

    next()
  } else {
    if (isAuthenticated && to.path === '/') {
      const redirectUrl = authStore.getRedirectUrl()
      if (redirectUrl !== from.path) {
        next(redirectUrl)
        return
      }
    }
    next()
  }
}

export function isAuthenticated() {
  const authStore = useAuthStore()
  return authStore.isLoggedIn
}
