import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/auth'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
try {
  const authStore = useAuthStore()
  authStore.checkAuth().catch((error) => {
    console.error('Error checking auth:', error)
  })
} catch (error) {
  console.error('Error initializing auth store:', error)
}

app.config.errorHandler = (error, vm, info) => {
  console.error('Vue error:', error)
  console.error('Component:', vm)
  console.error('Info:', info)
}

app.mount('#app')
