<template>
  <Layout
    pageTitle="Update Stock"
    breadcrumb-text="Update Stock"
    :breadcrumb-link="`/detail-warehouses/${warehouse.id}`"
  >
    <main class="flex flex-col gap-6 flex-1">
      <div class="flex gap-6">
        <div class="flex flex-col gap-6 w-full">
          <form
            @submit.prevent="handleSubmit"
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
                  <img :src="warehouse.photo" class="size-full object-cover" alt="icon" />
                </div>
                <div class="flex flex-col gap-2 flex-1">
                  <p class="font-semibold text-lg">{{ warehouse.name }}</p>
                  <p class="flex items-center gap-1 font-medium text-lg text-monday-gray">
                    <img
                      src="@/assets/images/icons/call-grey.svg"
                      class="size-6 flex shrink-0"
                      alt="icon"
                    />
                    <span>{{ warehouse.phone }}</span>
                  </p>
                </div>
              </div>
              <hr class="border-monday-border" />
              <div class="flex items-center gap-3">
                <div
                  class="flex size-16 rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
                >
                  <img :src="product.thumbnail" class="size-full object-contain" alt="icon" />
                </div>
                <div class="flex flex-col gap-2 flex-1">
                  <p class="font-semibold text-xl">{{ product.name }}</p>
                  <p class="font-semibold text-xl text-monday-blue">
                    Rp {{ formatNumber(product.price) }}
                  </p>
                </div>
                <div class="flex items-center gap-[6px] shrink-0">
                  <img
                    src="@/assets/images/icons/box-black.svg"
                    class="size-6 flex shrink-0"
                    alt="icon"
                  />
                  <p class="font-semibold text-lg text-nowrap">{{ product.current_stock }} Stock</p>
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
            <div
              v-if="formData.newStock !== ''"
              class="flex flex-col gap-2 p-4 rounded-2xl bg-monday-background"
            >
              <p class="font-semibold text-lg">Stock Summary</p>
              <div class="flex items-center justify-between">
                <span class="font-medium text-monday-gray">Current Stock:</span>
                <span class="font-semibold">{{ product.currentStock }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="font-medium text-monday-gray">New Stock:</span>
                <span class="font-semibold">{{ formData.newStock }}</span>
              </div>
              <hr class="border-monday-border" />
              <div class="flex items-center justify-between">
                <span class="font-semibold text-lg">Difference:</span>
                <span :class="getStockDifferenceClass()" class="font-semibold text-lg">
                  {{ getStockDifference() }}
                </span>
              </div>
            </div>

            <div class="flex items-center justify-end gap-4">
              <router-link
                :to="`/detail-warehouses/${warehouse.id}`"
                class="btn btn-red font-semibold"
              >
                Cancel
              </router-link>
              <button type="submit" class="btn btn-primary font-semibold" :disabled="isSubmitting">
                {{ isSubmitting ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </form>
        </div>
        <div class="flex flex-col w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white">
          <p class="font-semibold">Quick Guide to Assign Products</p>
          <ul class="flex flex-col gap-4">
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Ensure the warehouse has enough capacity lorem ipsum
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Double-check product details to avoid mismatches dummy text ipsum
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Keep stock levels updated to prevent overselling lorem si ipsum text simply
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Regularly review assigned products for accuracy text dummy lorem ipsum
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Communicate with the warehouse team for smooth operations
              </p>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </Layout>
</template>

<script>
import FormInput from '@/components/FormInput.vue'
import Layout from '@/components/Layout.vue'
import { getProductById } from '@/js/api/products'
import {
  getWarehouseById,
  getWarehouseProductByWarehouseIDAndProductID,
  updateWarehouseProductStock,
} from '@/js/api/warehouse'

export default {
  name: 'UpdateStockWarehouses',
  components: {
    Layout,
    FormInput,
  },
  data() {
    return {
      warehouse: {
        id: null,
        name: '',
        phone: '',
        photo: '',
      },
      product: {
        id: null,
        name: '',
        price: 0,
        current_stock: 0,
        photo: '',
      },
      formData: {
        stock: 0,
      },
      warehouseProductId: null,
      isSubmitting: false,
    }
  },
  async created() {
    await this.loadWarehouseProduct()
  },
  methods: {
    async loadWarehouseProduct() {
      try {
        const warehouseId = this.$route.query.warehouse || this.$route.params.warehouseId
        const productId = this.$route.query.productId || this.$route.params.productId

        if (!warehouseId || !productId) {
          console.error('Warehouse ID or Product ID not provided')
          this.$router.push('/warehouses')
          return
        }

        const response = await getWarehouseProductByWarehouseIDAndProductID(warehouseId, productId)
        const warehouseResponse = await getWarehouseById(warehouseId)
        this.warehouse = warehouseResponse.data

        const productResponse = await getProductById(productId)
        this.warehouseProductId = response.data.id
        this.product = {
          id: productResponse.data.id,
          name: productResponse.data.name,
          price: productResponse.data.price,
          thumbnail: productResponse.data.thumbnail,
          current_stock: response.data.stock,
        }

        this.formData.newStock = this.product.current_stock
      } catch (error) {
        console.error('Error loading warehouse:', error)
        this.$router.push(`/warehouses/${warehouseId}`)
      }
    },

    formatNumber(num) {
      return new Intl.NumberFormat('en-US').format(num)
    },

    getStockDifference() {
      if (this.formData.newStock === '') return 0
      const difference = this.formData.newStock - this.product.current_stock
      return difference >= 0 ? `+${difference}` : `${difference}`
    },
    getStockDifferenceClass() {
      if (this.formData.newStock === '') return ''
      const difference = this.formData.newStock - this.product.current_stock
      if (difference > 0) return 'text-green-600'
      if (difference < 0) return 'text-red-600'
      return 'text-monday-gray'
    },

    async handleSubmit() {
      if (this.formData.newStock === '') {
        alert('Please enter the new stock value')
        return
      }

      if (this.formData.newStock < 0) {
        alert('Stock cannot be negative')
        return
      }

      this.isSubmitting = true

      try {
        const warehouseId = this.$route.query.warehouse || this.$route.params.warehouseId
        const productId = this.$route.query.productId || this.$route.params.productId
        const requestData = {
          stock: parseInt(this.formData.newStock),
          product_id: parseInt(this.product.id),
          warehouse_id: parseInt(warehouseId),
        }

        const response = await updateWarehouseProductStock(
          warehouseId,
          this.warehouseProductId,
          requestData,
        )
        alert('Stock updated successfully')
        this.$router.push(`/detail-warehouses/${warehouseId}`)
      } catch (error) {
        console.error('Error updating stock:', error)
        alert(`Failed to update stock: ${error.message}`)
      } finally {
        this.isSubmitting = false
      }
    },
  },
}
</script>
