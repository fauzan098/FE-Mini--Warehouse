<template>
  <Layout
    pageTitle="Update Stock"
    breadcrumb-text="Update Stock"
    :breadcrumb-link="`/detail-merchants/${$route.params.merchantId}`"
  >
    <main class="flex flex-col gap-6 flex-1">
      <div class="flex gap-6">
        <div class="flex flex-col gap-6 w-full">
          <div
            action="warehouse-details.html"
            class="flex flex-col w-full rounded-3xl p-[18px] gap-5 bg-white"
          >
            <h2 class="font-semibold text-xl">Warehouse Details</h2>
            <div
              class="flex flex-col gap-5 p-[18px] rounded-3xl border-[1.5px] border-monday-border"
            >
              <div class="flex items-center gap-3">
                <div
                  class="flex size-16 rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
                >
                  <img :src="warehouseDetails.photo" class="size-full object-cover" alt="icon" />
                </div>
                <div class="flex flex-col gap-2 flex-1">
                  <p class="font-semibold text-lg">{{ warehouseDetails.name }}</p>
                  <p class="flex items-center gap-1 font-medium text-lg text-monday-gray">
                    <img
                      src="@/assets/images/icons/call-grey.svg"
                      class="size-6 flex shrink-0"
                      alt="icon"
                    />
                    <span>{{ warehouseDetails.phone }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <form
            @submit.prevent="handleSubmit"
            class="flex flex-col w-full rounded-3xl p-[18px] gap-5 bg-white"
          >
            <h2 class="font-semibold text-xl">Merchant Details</h2>
            <div
              class="flex flex-col gap-5 p-[18px] rounded-3xl border-[1.5px] border-monday-border"
            >
              <div class="flex items-center gap-3">
                <div
                  class="flex size-16 rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
                >
                  <img :src="merchantDetails.photo" class="size-full object-cover" alt="icon" />
                </div>
                <div class="flex flex-col gap-2 flex-1">
                  <p class="font-semibold text-lg">{{ merchantDetails.name }}</p>
                  <p class="flex items-center gap-1 font-medium text-lg text-monday-gray">
                    <img
                      src="@/assets/images/icons/user-thin-grey.svg"
                      class="size-6 flex shrink-0"
                      alt="icon"
                    />
                    <span>{{ merchantDetails.keeper }}</span>
                  </p>
                </div>
              </div>
              <hr class="border-monday-border" />
              <div class="flex items-center gap-3">
                <div
                  class="flex size-16 rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
                >
                  <img
                    :src="productDetails.product_photo"
                    class="size-full object-contain"
                    alt="icon"
                  />
                </div>
                <div class="flex flex-col gap-2 flex-1">
                  <p class="font-semibold text-xl">{{ productDetails.name }}</p>
                  <p class="font-semibold text-xl text-monday-blue">
                    Rp {{ formatPrice(productDetails.price) }}
                  </p>
                </div>
                <div class="flex items-center gap-[6px] shrink-0">
                  <img
                    src="@/assets/images/icons/box-black.svg"
                    class="size-6 flex shrink-0"
                    alt="icon"
                  />
                  <p class="font-semibold text-lg text-nowrap">
                    {{ productDetails.currentStock }} Stock
                  </p>
                </div>
              </div>
            </div>
            <h2 class="font-semibold text-xl">Update Stock</h2>
            <FormInput
              v-model="formData.newStock"
              label="New Stock"
              icon="@/assets/images/icons/box-grey.svg"
              required
              type="number"
              min="0"
              step="1"
            />
            <div class="flex items-center justify-end gap-4">
              <router-link
                :to="`/detail-merchants/${$route.params.merchantId}`"
                class="btn btn-red font-semibold"
              >
                Cancel
              </router-link>
              <button type="submit" class="btn btn-primary font-semibold" :disabled="isLoading">
                {{ isLoading ? 'Updating...' : 'Save Changes' }}
              </button>
            </div>
          </form>
        </div>
        <div class="flex flex-col w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white">
          <p class="font-semibold">Quick Guide to Add Stock Product</p>
          <ul class="flex flex-col gap-4">
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Thoroughly review warehouse and product details to ensure accuracy
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Input the stock quantity accurately to maintain precise inventory records and avoid
                discrepancies
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Verify and confirm merchant details to ensure accuracy
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Double-check all details to ensure accuracy before saving
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Save the changes to update the Lorem information and ensure all dummy text
              </p>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue'
import FormInput from '@/components/FormInput.vue'
import { updateMerchantProductStock } from '@/js/api/merchants'

export default {
  name: 'UpdateStockMerchants',
  components: {
    Layout,
    FormInput,
  },
  data() {
    return {
      warehouseDetails: {
        name: '',
        phone: '',
        photo: '',
      },
      merchantDetails: {
        name: '',
        keeper: '',
      },
      productDetails: {
        name: '',
        price: 0,
        currentStock: 0,
        product_photo: '',
      },
      formData: {
        newStock: 0,
      },
      isLoading: false,
    }
  },
  created() {
    this.loadDetailsFromQuery()
  },
  methods: {
    async loadDetailsFromQuery() {
      const query = this.$route.query
      const productId = this.$route.params.productId
      const merchantId = this.$route.params.merchantId

      if (!productId || !merchantId) {
        console.error('Merchant Product ID not provided')
        this.$router.push(`/detail-merchants/${merchantId}`)
        return
      }

      this.warehouseDetails = {
        name: query.warehouse_name || 'Warehouse tidak ditemukan',
        phone: query.warehouse_phone || 'N/A',
        photo: query.warehouse_photo || '',
      }

      this.merchantDetails = {
        name: query.merchant_name || 'Merchant tidak ditemukan',
        keeper: query.keeper_name || 'Keeper tidak ditemukan',
      }

      this.productDetails = {
        name: query.product_name || 'Product tidak ditemukan',
        price: parseInt(query.product_price) || 0,
        currentStock: parseInt(query.current_stock) || 0,
        product_photo: query.product_photo || '',
      }

      this.formData.newStock = this.productDetails.currentStock
    },

    async handleSubmit() {
      // Validasi form
      if (!this.formData.newStock || this.formData.newStock < 0) {
        alert('Stock harus lebih dari atau sama dengan 0')
        return
      }

      this.isLoading = true
      const productId = this.$route.params.productId
      const merchantId = this.$route.params.merchantId
      try {
        // Prepare request data using data from query parameters
        const requestData = {
          stock: parseInt(this.formData.newStock),
          warehouse_id: parseInt(this.$route.query.warehouse_id) || null,
          merchant_id: parseInt(merchantId),
          product_id: parseInt(productId),
          merchant_product_id: parseInt(this.$route.query.merchant_product_id),
        }

        // Call API to update merchant product stock
        const response = await updateMerchantProductStock(requestData)

        // Show success message
        alert('Stock updated successfully!')

        // Redirect to merchant details page
        this.$router.push(`/detail-merchants/${merchantId}`)
      } catch (error) {
        console.error('Error updating stock:', error)
        alert('Gagal mengupdate stock. Silakan coba lagi.')
      } finally {
        this.isLoading = false
      }
    },

    formatPrice(price) {
      return new Intl.NumberFormat('id-ID').format(price)
    },

    getStockDifference() {
      if (this.formData.newStock === '') return 0
      const difference = this.formData.newStock - this.productDetails.currentStock
      return difference >= 0 ? `+${difference}` : `${difference}`
    },

    getStockDifferenceClass() {
      if (this.formData.newStock === '') return ''
      const difference = this.formData.newStock - this.productDetails.currentStock
      if (difference > 0) return 'text-green-600'
      if (difference < 0) return 'text-red-600'
      return 'text-monday-gray'
    },
  },
}
</script>
