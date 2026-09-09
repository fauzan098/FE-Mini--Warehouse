<template>
  <Layout pageTitle="Overview">
    <main class="flex flex-col gap-6 flex-1">
      <section class="grid grid-cols-3 gap-6">
        <div id="Total-Revenue" class="flex flex-col rounded-3xl p-[18px] gap-5 bg-white">
          <div class="flex size-14 rounded-full bg-monday-blue/10 items-center justify-center">
            <img src="@/assets/images/icons/wallet-blue-fill.svg" class="size-6" alt="icon" />
          </div>
          <div class="flex flex-col gap-[6px]">
            <p class="font-semibold text-[32px]">
              Rp {{ formatNumber(dashboardData.totalRevenue) }}
            </p>
            <p class="font-medium text-lg text-monday-gray">Total Revenue</p>
          </div>
        </div>
        <div id="Total-Transactions" class="flex flex-col rounded-3xl p-[18px] gap-5 bg-white">
          <div class="flex size-14 rounded-full bg-monday-blue/10 items-center justify-center">
            <img
              src="@/assets/images/icons/document-text-blue-fill.svg"
              class="size-6"
              alt="icon"
            />
          </div>
          <div class="flex flex-col gap-[6px]">
            <p class="font-semibold text-[32px]">
              {{ formatNumber(dashboardData.totalTransactions) }}
            </p>
            <p class="font-medium text-lg text-monday-gray">Total Transactions</p>
          </div>
        </div>
        <div id="Products-Sold" class="flex flex-col rounded-3xl p-[18px] gap-5 bg-white">
          <div class="flex size-14 rounded-full bg-monday-blue/10 items-center justify-center">
            <img src="@/assets/images/icons/bag-blue-fill.svg" class="size-6" alt="icon" />
          </div>
          <div class="flex flex-col gap-[6px]">
            <p class="font-semibold text-[32px]">{{ formatNumber(dashboardData.productsSold) }}</p>
            <p class="font-medium text-lg text-monday-gray">Products Sold</p>
          </div>
        </div>
      </section>
      <div class="flex gap-6 flex-1">
        <section class="flex flex-col gap-6 w-[262px] shrink-0">
          <div class="flex flex-col rounded-3xl p-[18px] gap-9 blue-gradient">
            <div class="relative w-fit">
              <div
                class="flex size-14 rounded-full bg-monday-lime-green items-center justify-center overflow-hidden"
              >
                <img src="@/assets/images/icons/crown-black-fill.svg" class="size-6" alt="icon" />
              </div>
              <p
                class="absolute transform -translate-x-1/2 left-1/2 -bottom-2 rounded-[20px] py-1 px-2 bg-monday-black text-white w-fit font-extrabold text-[8px]"
              >
                PRO
              </p>
            </div>
            <div class="flex flex-col gap-[18px]">
              <div class="flex flex-col gap-[6px]">
                <p class="font-medium text-monday-lime-green-char">— Access Pro Featured</p>
                <p class="font-extrabold text-2xl text-white">
                  Track, Manage, and Distribute Stock Easily! 🎯
                </p>
              </div>
              <a
                href=""
                class="flex items-center justify-between rounded-2xl p-4 gap-[10px] bg-white"
              >
                <p class="font-semibold">Upgrade Now</p>
                <img
                  src="@/assets/images/icons/arrow-right-black.svg"
                  class="flex size-6 shrink-0"
                  alt="icon"
                />
              </a>
            </div>
          </div>
          <div class="flex flex-col rounded-3xl p-[18px] gap-9 bg-white">
            <div class="flex size-14 rounded-full bg-monday-blue/10 items-center justify-center">
              <img
                src="@/assets/images/icons/receive-square-blue-fill.svg"
                class="size-6"
                alt="icon"
              />
            </div>
            <div class="flex flex-col gap-[18px]">
              <div class="flex flex-col gap-[6px]">
                <p class="font-medium text-monday-blue">— Download Report</p>
                <p class="font-bold text-2xl">Download Your Sales Summary Instantly</p>
              </div>
              <a
                href=""
                class="flex items-center justify-between rounded-2xl p-4 gap-[10px] bg-monday-blue/10"
              >
                <p class="font-semibold text-monday-blue">Download Now</p>
                <img
                  src="@/assets/images/icons/arrow-right-blue.svg"
                  class="flex size-6 shrink-0"
                  alt="icon"
                />
              </a>
            </div>
          </div>
        </section>
        <section
          id="Lastest-Transaction"
          class="flex flex-col gap-5 flex-1 rounded-3xl p-[18px] bg-white"
        >
          <h2 class="font-bold text-xl">Lastest Transaction</h2>
          <div v-if="loading" class="flex items-center gap-2">
            <img
              src="@/assets/images/icons/loading.svg"
              class="size-5 animate-spin"
              alt="loading"
            />
            <span class="text-sm text-monday-gray">Loading...</span>
          </div>
          <!-- Transaction Cards -->
          <div v-else-if="transactions.length > 0" class="flex flex-col gap-5">
            <div
              v-for="(transaction, index) in transactions"
              :key="transaction.id"
              class="card-merchant flex flex-col rounded-2xl border border-monday-border"
            >
              <div class="flex items-center justify-between p-4 gap-3 pb-5">
                <div
                  class="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
                >
                  <img
                    src="@/assets/images/icons/user-thin-grey.svg"
                    class="flex size-[42px] shrink-0"
                    alt="icon"
                  />
                </div>
                <div class="flex flex-col gap-2 flex-1">
                  <p class="font-semibold text-xl">{{ transaction.name }}</p>
                  <p class="flex items-center gap-1 font-medium text-lg text-monday-gray">
                    <img
                      src="@/assets/images/icons/call-grey.svg"
                      class="size-6 flex shrink-0"
                      alt="icon"
                    />
                    <span>{{ transaction.phone }}</span>
                  </p>
                </div>
                <div class="flex items-center gap-[6px]">
                  <img
                    src="@/assets/images/icons/shop-black.svg"
                    class="size-6 flex shrink-0"
                    alt="icon"
                  />
                  <p class="font-semibold text-lg text-nowrap">{{ transaction.merchant_name }}</p>
                </div>
              </div>
              <hr class="border-monday-border" />
              <div class="flex flex-col px-4 gap-5 py-5">
                <button
                  @click="toggleProductAssigned(index + 1)"
                  class="flex items-center justify-between"
                >
                  <p class="font-semibold text-lg">
                    Product Assigned ({{ transaction.transaction_products?.length || 0 }})
                  </p>
                  <img
                    :src="
                      expandedTransaction.includes(index + 1)
                        ? '@/assets/images/icons/arrow-circle-down.svg'
                        : '/src/assets/images/icons/arrow-circle-up.svg'
                    "
                    class="size-6 flex shrink-0 transition-300"
                    alt="icon"
                  />
                </button>
                <div v-show="expandedTransaction.includes(index + 1)" class="flex flex-col gap-5">
                  <div
                    v-for="(product, productIndex) in transaction.transaction_products"
                    :key="product.id"
                    class="card flex items-center justify-between gap-3"
                  >
                    <div class="flex items-center gap-3 w-full">
                      <div
                        class="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
                      >
                        <img
                          :src="product.product_photo"
                          class="size-full object-contain"
                          alt="product"
                        />
                      </div>
                      <div class="flex flex-col gap-2 flex-1">
                        <p class="font-semibold text-xl line-clamp-1">{{ product.product_name }}</p>
                        <p class="font-semibold text-xl text-monday-blue">
                          Rp {{ formatNumber(product.price) }}
                          <span class="text-monday-gray">({{ product.quantity }}x)</span>
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center gap-[6px] w-full">
                      <img
                        :src="product.category?.name"
                        class="size-6 flex shrink-0"
                        alt="icon"
                        onerror="this.src='/src/assets/images/icons/box-grey.svg'"
                      />
                      <p class="font-semibold text-lg text-nowrap">
                        {{ product.category?.name || 'Uncategorized' }}
                      </p>
                    </div>
                    <button
                      @click="showProductDetails(product)"
                      class="btn btn-primary-opacity min-w-[130px] font-semibold"
                    >
                      Details
                    </button>
                  </div>
                  <hr
                    v-if="productIndex < transaction.transaction_products.length - 1"
                    class="border-monday-border last:hidden"
                  />
                </div>
              </div>
              <hr class="border-monday-border" />
              <div class="flex items-center justify-between px-4 py-5">
                <p class="flex items-center gap-1 font-semibold text-lg text-monday-gray">
                  <img
                    src="@/assets/images/icons/money-grey.svg"
                    class="size-6 flex shrink-0"
                    alt="icon"
                  />
                  Grandtotal:
                </p>
                <p class="font-semibold text-xl text-monday-blue">
                  Rp {{ formatNumber(transaction.grand_total) }}
                </p>
              </div>
            </div>
          </div>
          <div
            v-else-if="!loading"
            class="flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6 py-12"
          >
            <img
              src="@/assets/images/icons/document-text-grey.svg"
              class="size-[52px]"
              alt="icon"
            />
            <p class="font-semibold text-monday-gray">
              Oops, it looks like there's no transaction data yet.
            </p>
          </div>
        </section>
      </div>
    </main>
    <div
      v-if="showModal"
      class="modal flex flex-1 items-center justify-center h-full fixed top-0 left-0 w-full z-50"
    >
      <div @click="closeModal" class="backdrop absolute w-full h-full bg-[#292D32B2]"></div>
      <div class="relative flex flex-col w-[406px] shrink-0 rounded-3xl p-[18px] gap-5 bg-white">
        <div class="modal-header flex items-center justify-between">
          <p class="font-semibold text-xl">Product Details</p>
          <button
            @click="closeModal"
            class="flex size-14 rounded-full items-center justify-center bg-monday-gray-background"
          >
            <img src="@/assets/images/icons/close-circle-black.svg" class="size-6" alt="icon" />
          </button>
        </div>
        <div
          class="modal-content flex flex-col rounded-3xl border border-monday-border p-4 gap-5"
          v-if="selectedProduct"
        >
          <div class="flex items-center justify-between">
            <div class="flex flex-col gap-2">
              <p class="flex items-center gap-[6px] font-semibold text-lg">
                <img
                  :src="selectedProduct.category?.name"
                  class="size-6 flex shrink-0"
                  alt="icon"
                  onerror="this.src='/src/assets/images/icons/box-grey.svg'"
                />
                {{ selectedProduct.category?.name || 'Uncategorized' }}
              </p>
              <p class="font-bold text-lg">{{ selectedProduct.product_name }}</p>
              <p class="font-semibold text-[17px] text-monday-blue">
                Rp {{ formatNumber(selectedProduct.price) }}
                <span class="text-monday-gray text-sm">(Qty: {{ selectedProduct.quantity }})</span>
              </p>
            </div>
            <div
              class="flex size-[100px] rounded-2xl bg-monday-gray-background items-center justify-center overflow-hidden"
            >
              <img
                :src="selectedProduct.product_photo"
                class="size-full object-contain"
                alt="product"
                onerror="this.src='/src/assets/images/icons/gallery-default.svg'"
              />
            </div>
          </div>
          <hr class="border-monday-border" />
          <div>
            <p class="font-medium text-sm text-monday-gray">Product About</p>
            <p class="font-semibold leading-[160%]">
              {{ selectedProduct.product_about || 'No description available for this product.' }}
            </p>
          </div>
          <hr class="border-monday-border" />
          <div class="flex items-center justify-between">
            <p class="font-medium text-sm text-monday-gray">Subtotal</p>
            <p class="font-semibold text-lg text-monday-blue">
              Rp {{ formatNumber(selectedProduct.sub_total) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue'
import { getDashboardData } from '@/js/api/dashboard'
import { getTransactions } from '@/js/api/transaction'

export default {
  name: 'Overview',
  components: {
    Layout,
  },
  data() {
    return {
      dashboardData: {
        totalRevenue: 0,
        totalTransactions: 0,
        productsSold: 0,
      },
      transactions: [],
      expandedTransaction: [],
      showModal: false,
      selectedProduct: null,
      showEmptyState: false,
      loading: false,
    }
  },

  async created() {
    await this.loadDashboardData()
    await this.loadLatestTransactions()
  },

  methods: {
    async loadDashboardData() {
      try {
        const userData = localStorage.getItem('user')
        let userId = 6

        if (userData) {
          try {
            const user = JSON.parse(userData)
            userId = user.id || 6
          } catch (error) {
            console.error('Error parsing user data:', error)
          }
        }

        const response = await getDashboardData(`?user_id=${userId}`)
        let dashboardStats = null

        if (response && response.data) {
          dashboardStats = response.data
        } else if (
          response &&
          (response.total_revenue !== undefined || response.total_transactions !== undefined)
        ) {
          dashboardStats = response
        } else if (response && response.result && response.result.data) {
          dashboardStats = response.result.data
        }

        if (dashboardStats) {
          this.dashboardData = {
            totalRevenue: dashboardStats.total_revenue || 0,
            totalTransactions: dashboardStats.total_transactions || 0,
            productsSold: dashboardStats.products_sold || 0,
          }

          // Log success message if available
          if (response.message) {
            console.log('Dashboard data loaded:', response.message)
          }
        } else {
          this.dashboardData = {
            totalRevenue: 0,
            totalTransactions: 0,
            productsSold: 0,
          }
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error)
        this.dashboardData = {
          totalRevenue: 0,
          totalTransactions: 0,
          productsSold: 0,
        }
      }
    },
    async loadLatestTransactions() {
      try {
        this.loading = true

        const userData = localStorage.getItem('user')
        let userId = 6

        if (userData) {
          try {
            const user = JSON.parse(userData)
            userId = user.id || 6
          } catch (error) {
            console.error('Error parsing user data from localStorage:', error)
          }
        }

        const response = await getTransactions(`?limit=2`)

        if (response && response.data && response.data.transactions) {
          this.transactions = response.data.transactions || []

          // Log success message if available
          if (response.message) {
            console.log('Transactions loaded:', response.message)
          }
        } else {
          this.transactions = []
        }
        this.showEmptyState = this.transactions.length === 0
      } catch (error) {
        console.error('Error loading latest transactions:', error)
        this.transactions = []
        this.showEmptyState = true
      } finally {
        this.loading = false
      }
    },

    toggleProductAssigned(sectionId) {
      const index = this.expandedTransaction.indexOf(sectionId)
      if (index > -1) {
        this.expandedTransaction.splice(index, 1)
      } else {
        this.expandedTransaction.push(sectionId)
      }
    },

    showProductDetails(product) {
      this.selectedProduct = product
      this.showModal = true
    },

    closeModal() {
      this.showModal = false
      this.selectedProduct = null
    },

    formatNumber(number) {
      return new Intl.NumberFormat('id-ID').format(number)
    },

    formatDate(dateString) {
      if (!dateString) return 'N/A'

      try {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat('id-ID', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }).format(date)
      } catch (error) {
        return 'Invalid Date'
      }
    },

    getPaymentStatusClass(status) {
      switch (status) {
        case 'pending':
          return 'bg-yellow-100 text-yellow-600'
        case 'completed':
          return 'bg-green-100 text-green-600'
        case 'failed':
          return 'bg-red-100 text-red-600'
        default:
          return 'bg-gray-100 text-gray-600'
      }
    },
  },
}
</script>
