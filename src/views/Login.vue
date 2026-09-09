<template>
  <main class="flex flex-1 h-screen items-center">
    <div
      class="flex flex-col h-screen overflow-hidden rounded-tr-[32px] pl-[30px] pt-[46px] w-[685px] shrink-0 blue-gradient"
    >
      <p class="font-semibold text-lg text-monday-lime-green-char">— Manage Stock and Merchants</p>
      <p class="font-extrabold text-[42px] uppercase text-white mt-4 mb-[30px]">
        Optimized Inventory,<br />Effortless Workflow 🎯
      </p>
      <div class="flex flex-1 overflow-hidden rounded-tl-[20px]">
        <img
          src="@/assets/images/backgrounds/bg-image-1.png"
          class="size-full object-cover object-left-top"
          alt="image"
        />
      </div>
    </div>
    <div class="flex flex-1 items-center justify-center">
      <form
        @submit.prevent="handleLogin"
        class="flex flex-col w-[435px] shrink-0 rounded-3xl gap-10 p-6 bg-white"
      >
        <img src="@/assets/images/logos/logo.svg" class="w-[203px] mx-auto" alt="logo" />
        <div class="flex flex-col gap-[30px]">
          <div class="flex flex-col gap-3 text-center">
            <p class="font-semibold text-2xl">Hey🙌🏻, Welcome Back!</p>
            <p class="font-medium text-monday-gray">Login to your account to continue!</p>
          </div>

          <div
            v-if="errorMessage"
            class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
          >
            {{ errorMessage }}
          </div>
          <div class="flex flex-col gap-4 w-full">
            <FormInput
              v-model="form.email"
              label="Email Address"
              icon="@/assets/images/icons/sms-grey.svg"
              required="true"
              type="email"
              :disabled="loading"
            />
            <FormInput
              v-model="form.password"
              label="Password"
              icon="@/assets/images/icons/lock-grey.svg"
              required="true"
              :type="showPassword ? 'text' : 'password'"
              :disabled="loading"
              :handleIconClick="togglePassword"
            />
            <p class="font-medium text-sm text-monday-gray">
              Forget Password?
              <a href="#" class="font-semibold text-monday-blue hover:underline">Reset Password</a>
            </p>
          </div>
          <button type="submit" class="btn btn-primary w-full font-bold">Sign In</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import FormInput from '@/components/FormInput.vue'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'Login',
  components: {
    FormInput,
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      loading: false,
      showPassword: false,
      errorMessage: '',
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true
      this.errorMessage = ''

      try {
        const authStore = useAuthStore()
        await authStore.login(this.form)

        const redirectUrl = authStore.getRedirectUrl()
        this.$router.push(redirectUrl)
      } catch (error) {
        this.errorMessage = error.message || 'An error occurred while logging in'
        this.loading = false
      } finally {
        this.loading = false
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword
    },
  },
}
</script>
