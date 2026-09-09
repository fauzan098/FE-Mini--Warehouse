<template>
  <div id="main-container" class="flex flex-1 h-screen">
    <aside class="relative flex h-screen w-[280px] shrink-0 bg-white">
      <div
        class="flex flex-col fixed top-0 w-[280px] shrink-0 h-screen pt-[30px] px-4 gap-[30px] overflow-y-auto"
      >
        <img src="@/assets/images/logos/logo.svg" class="h-8 w-fit" alt="logo" />
        <div class="flex flex-col gap-5 flex-1 min-h-0 overflow-y-auto">
          <nav class="flex flex-col gap-4">
            <p class="font-medium text-monday-gray">Main Menu</p>
            <ul class="flex flex-col gap-2">
              <li class="group" :class="{ active: $route.path === '/overview-merchant' }">
                <router-link
                  to="/overview-merchant"
                  class="flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 group-[&.active]:bg-monday-blue/10 transition-300"
                >
                  <div class="relative flex size-6 shrink-0">
                    <img
                      src="@/assets/images/icons/home-black.svg"
                      class="size-6 absolute opacity-100 group-[&.active]:opacity-0 transition-300"
                      alt="icon"
                    />
                    <img
                      src="@/assets/images/icons/home-blue-fill.svg"
                      class="size-6 absolute opacity-0 group-[&.active]:opacity-100 transition-300"
                      alt="icon"
                    />
                  </div>
                  <p class="font-medium group-[&.active]:text-monday-blue transition-300 w-full">
                    Overview
                  </p>
                  <div
                    class="w-2 h-9 shrink-0 rounded-l-xl bg-monday-blue hidden group-[&.active]:flex transition-300"
                  ></div>
                </router-link>
              </li>
              <li class="group" :class="{ active: $route.path === '/transactions' }">
                <router-link
                  to="/transactions"
                  class="flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 group-[&.active]:bg-monday-blue/10 transition-300"
                >
                  <div class="relative flex size-6 shrink-0">
                    <img
                      src="@/assets/images/icons/card-black.svg"
                      class="size-6 absolute opacity-100 group-[&.active]:opacity-0 transition-300"
                      alt="icon"
                    />
                    <img
                      src="@/assets/images/icons/card-blue-fill.svg"
                      class="size-6 absolute opacity-0 group-[&.active]:opacity-100 transition-300"
                      alt="icon"
                    />
                  </div>
                  <p class="font-medium group-[&.active]:text-monday-blue transition-300 w-full">
                    Transactions
                  </p>
                  <div
                    class="w-2 h-9 shrink-0 rounded-l-xl bg-monday-blue hidden group-[&.active]:flex transition-300"
                  ></div>
                </router-link>
              </li>
              <li class="group" :class="{ active: $route.path === '/my-merchant' }">
                <router-link
                  to="/my-merchant"
                  class="flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 group-[&.active]:bg-monday-blue/10 transition-300"
                >
                  <div class="relative flex size-6 shrink-0">
                    <img
                      src="@/assets/images/icons/shop-black.svg"
                      class="size-6 absolute opacity-100 group-[&.active]:opacity-0 transition-300"
                      alt="icon"
                    />
                    <img
                      src="@/assets/images/icons/shop-blue-fill.svg"
                      class="size-6 absolute opacity-0 group-[&.active]:opacity-100 transition-300"
                      alt="icon"
                    />
                  </div>
                  <p class="font-medium group-[&.active]:text-monday-blue transition-300 w-full">
                    My Merchants
                  </p>
                  <div
                    class="w-2 h-9 shrink-0 rounded-l-xl bg-monday-blue hidden group-[&.active]:flex transition-300"
                  ></div>
                </router-link>
              </li>
            </ul>
          </nav>
          <nav class="flex flex-col gap-4">
            <p class="font-medium text-monday-gray">Account Settings</p>
            <ul class="flex flex-col gap-2">
              <li class="group">
                <a
                  href="#"
                  class="flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 group-[&.active]:bg-monday-blue/10 transition-300"
                >
                  <div class="relative flex size-6 shrink-0">
                    <img
                      src="@/assets/images/icons/profile-circle-black.svg"
                      class="size-6 absolute opacity-100 group-[&.active]:opacity-0 transition-300"
                      alt="icon"
                    />
                    <img
                      src="@/assets/images/icons/profile-circle-black.svg"
                      class="size-6 absolute opacity-0 group-[&.active]:opacity-100 transition-300"
                      alt="icon"
                    />
                  </div>
                  <p class="font-medium group-[&.active]:text-monday-blue transition-300 w-full">
                    Profile
                  </p>
                  <div
                    class="w-2 h-9 shrink-0 rounded-l-xl bg-monday-blue hidden group-[&.active]:flex transition-300"
                  ></div>
                </a>
              </li>
              <li class="group">
                <a
                  href="#"
                  class="flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 group-[&.active]:bg-monday-blue/10 transition-300"
                >
                  <div class="relative flex size-6 shrink-0">
                    <img
                      src="@/assets/images/icons/setting-black.svg"
                      class="size-6 absolute opacity-100 group-[&.active]:opacity-0 transition-300"
                      alt="icon"
                    />
                    <img
                      src="@/assets/images/icons/setting-black.svg"
                      class="size-6 absolute opacity-0 group-[&.active]:opacity-100 transition-300"
                      alt="icon"
                    />
                  </div>
                  <p class="font-medium group-[&.active]:text-monday-blue transition-300 w-full">
                    Settings
                  </p>
                  <div
                    class="w-2 h-9 shrink-0 rounded-l-xl bg-monday-blue hidden group-[&.active]:flex transition-300"
                  ></div>
                </a>
              </li>
              <li class="group">
                <a
                  href="#"
                  class="flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 group-[&.active]:bg-monday-blue/10 transition-300"
                >
                  <div class="relative flex size-6 shrink-0">
                    <img
                      src="@/assets/images/icons/callcenter-black.svg"
                      class="size-6 absolute opacity-100 group-[&.active]:opacity-0 transition-300"
                      alt="icon"
                    />
                    <img
                      src="@/assets/images/icons/callcenter-black.svg"
                      class="size-6 absolute opacity-0 group-[&.active]:opacity-100 transition-300"
                      alt="icon"
                    />
                  </div>
                  <p class="font-medium group-[&.active]:text-monday-blue transition-300 w-full">
                    Support
                  </p>
                  <div
                    class="w-2 h-9 shrink-0 rounded-l-xl bg-monday-blue hidden group-[&.active]:flex transition-300"
                  ></div>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </aside>
    <div id="Content" class="flex flex-col flex-1 p-6 pt-0 overflow-y-auto">
      <div id="Top-Bar" class="flex items-center w-full gap-6 mt-[30px] mb-6">
        <div class="flex items-center gap-6 h-[92px] bg-white w-full rounded-3xl p-[18px]">
          <div class="flex flex-col gap-[6px] w-full">
            <h1 class="font-bold text-2xl">{{ pageTitle }}</h1>
            <router-link
              v-if="breadcrumbText"
              :to="breadcrumbLink"
              class="flex items-center gap-[6px] text-monday-gray font-semibold"
            >
              <img
                src="@/assets/images/icons/arrow-left-grey.svg"
                class="size-4 flex shrink-0"
                alt="icon"
              />
              {{ breadcrumbText }}
            </router-link>
          </div>
          <div class="flex items-center flex-nowrap gap-3">
            <a href="#">
              <div
                class="flex size-14 rounded-full bg-monday-gray-background items-center justify-center overflow-hidden"
              >
                <img
                  src="@/assets//images/icons/search-normal-black.svg"
                  class="size-6"
                  alt="icon"
                />
              </div>
            </a>
            <a href="#">
              <div
                class="flex size-14 rounded-full bg-monday-gray-background items-center justify-center overflow-hidden"
              >
                <img
                  src="@/assets//images/icons/notification-black.svg"
                  class="size-6"
                  alt="icon"
                />
              </div>
            </a>
            <div class="relative w-fit">
              <div
                class="flex size-14 rounded-full bg-monday-lime-green items-center justify-center overflow-hidden"
              >
                <img src="@/assets//images/icons/crown-black-fill.svg" class="size-6" alt="icon" />
              </div>
              <p
                class="absolute transform -translate-x-1/2 left-1/2 -bottom-2 rounded-[20px] py-1 px-2 bg-monday-black text-white w-fit font-extrabold text-[8px]"
              >
                PRO
              </p>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-3 h-[92px] bg-white w-fit rounded-3xl p-[18px] relative">
          <div class="flex rounded-full overflow-hidden size-14">
            <div
              v-if="userLoading"
              class="flex size-full items-center justify-center bg-monday-gray-background"
            >
              <img
                src="@/assets/images/icons/loading.svg"
                class="size-6 animate-spin"
                alt="loading"
              />
            </div>
            <img
              v-else
              :src="currentUser?.avatar || '/src/assets/images/photos/photos-1.png'"
              class="size-full object-cover"
              alt="photo"
            />
          </div>
          <div class="flex flex-col gap-1 min-w-[120px] max-w-[160px] w-fit">
            <div v-if="userLoading" class="flex flex-col gap-1">
              <div class="h-5 bg-monday-gray-background rounded animate-pulse"></div>
              <div class="h-4 bg-monday-gray-background rounded animate-pulse w-16"></div>
            </div>
            <template v-else>
              <p class="font-semibold">{{ currentUser?.name || 'User' }}</p>
              <p class="flex items-center gap-1 font-medium text-monday-gray">
                <img src="@/assets/images/icons/user-grey.svg" class="size-4" alt="icon" />
                {{ currentUser?.roles || 'User' }}
              </p>
            </template>
          </div>
          <button
            @click="handleLogout"
            class="flex w-6 h-6 items-center justify-center hover:opacity-70 transition-opacity cursor-pointer relative z-10"
            title="Logout"
            type="button"
          >
            <img
              src="@/assets/images/icons/logout.svg"
              class="flex size-6 shrink-0 pointer-events-none"
              alt="icon"
            />
          </button>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
  <div v-if="showLogoutConfirm" class="fixed inset-0 z-50 flex items-center justify-center">
    <div @click="cancelLogout" class="absolute inset-0 bg-black bg-opacity-50"></div>
    <div class="relative bg-white rounded-3xl p-6 w-96 max-w-[90vw]">
      <div class="flex items-center gap-4 mb-6">
        <div class="flex size-12 rounded-full bg-red-100 items-center justify-center">
          <img src="@/assets/images/icons/logout.svg" class="size-6" alt="logout" />
        </div>
        <div>
          <h3 class="font-bold text-xl">Konfirmasi Logout</h3>
          <p class="text-monday-gray">Apakah Anda yakin ingin keluar?</p>
        </div>
      </div>
      <div class="flex gap-3">
        <button
          @click="cancelLogout"
          class="flex-1 px-4 py-2 border border-monday-border rounded-2xl font-medium hover:bg-monday-gray-background transition-colors"
        >
          Batal
        </button>
        <button
          @click="confirmLogout"
          class="flex-1 px-4 py-2 bg-red-500 text-white rounded-2xl font-medium hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { removeAuthToken } from '../js/api/users'
import { useAuthStore } from '../stores/auth'

export default {
  name: 'LayoutMerchant',
  props: {
    pageTitle: {
      type: String,
      default: 'Dashboard',
    },
    breadcrumbText: {
      type: String,
      default: null,
    },
    breadcrumbLink: {
      type: Array,
      default: '/login',
    },
  },

  data() {
    return {
      userLoading: false,
      showLogoutConfirm: false,
    }
  },

  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },

  computed: {
    currentUser() {
      return this.authStore.currentUser
    },
  },

  async mounted() {
    if (this.isUserMenuActive) {
      this.userMenuExpanded = true
    }

    if (this.authStore.isLoggedIn) {
      this.userLoading = true
      try {
        await this.authStore.fetchCurrentUser()
      } catch (error) {
        console.error('Error fetching current user:', error)
      } finally {
        this.userLoading = false
      }
    }

    document.addEventListener('keydown', this.handleKeydown)
  },

  methods: {
    handleLogout() {
      this.showLogoutConfirm = true
    },

    async confirmLogout() {
      try {
        await this.authStore.logout()

        removeAuthToken()

        this.$router.push('/')
      } catch (error) {
        console.error('Error during logout:', error)
        this.$router.push('/')
      } finally {
        this.showLogoutConfirm = false
      }
    },

    cancelLogout() {
      this.showLogoutConfirm = false
    },

    handleKeydown(event) {
      if (event.key === 'Escape' && this.showLogoutConfirm) {
        this.cancelLogout()
      }
    },
  },
}
</script>
