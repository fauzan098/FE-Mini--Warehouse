<template>
  <Layout
    pageTitle="Warehouse Details"
    breadcrumb-text="Warehouse Details"
    breadcrumb-link="/warehouses"
  >
    <main class="flex flex-col gap-6 flex-1">
      <section
        id="Warehouse-Info"
        class="flex items-center justify-between rounded-3xl p-[18px] gap-3 bg-white"
      >
        <div
          class="flex size-16 rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
        >
          <img :src="warehouse.photo" class="size-full object-contain" alt="icon" />
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
        <router-link
          :to="`/edit-warehouses/${warehouse.id}`"
          class="btn btn-black w-[174px] font-semibold text-nowrap"
        >
          Edit Warehouse
        </router-link>
      </section>
      <section id="Products" class="flex flex-col gap-6 flex-1 rounded-3xl p-[18px] px-0 bg-white">
        <div id="Header" class="flex items-center justify-between px-[18px]">
          <div class="flex flex-col gap-[6px]">
            <p class="flex items-center gap-[6px]">
              <span class="font-semibold text-2xl"
                >{{ warehouseProducts?.length || 0 }} Total Products</span
              >
            </p>
            <p class="font-semibold text-lg text-monday-gray">
              View and update your Product Warehouses list here.
            </p>
          </div>
          <router-link
            :to="`/assign-warehouse-products/${warehouse.id}`"
            class="btn btn-primary font-semibold"
          >
            Assign a Products
            <img
              src="@/assets/images/icons/add-square-white.svg"
              class="flex sixe-6 shrink-0"
              alt="icon"
            />
          </router-link>
        </div>
        <hr class="border-monday-border" />
        <div id="Product-List" class="flex flex-col px-4 gap-5 flex-1">
          <div class="flex items-center justify-between">
            <p class="font-semibold text-xl">All Products</p>
          </div>
          <div
            v-if="warehouseProducts?.length === 0"
            class="flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6"
          >
            <img
              src="/src/assets/images/icons/document-text-grey.svg"
              class="size-[52px]"
              alt="icon"
            />
            <p class="font-semibold text-monday-gray">Oops, it looks like there's no data yet.</p>
          </div>
          <div v-else class="flex flex-col gap-5">
            <template v-for="product in warehouseProducts" :key="product.id">
              <div class="card flex items-center justify-between gap-6">
                <div class="flex items-center gap-3 w-[260px] shrink-0">
                  <div
                    class="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
                  >
                    <img :src="product.product_photo" class="size-full object-contain" alt="icon" />
                  </div>
                  <div class="flex flex-col gap-2 flex-1">
                    <p class="font-semibold text-xl w-[162px] truncate">
                      {{ product.product_name }}
                    </p>
                    <p class="font-semibold text-xl text-monday-blue">
                      Rp {{ formatNumber(product.product_price) }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-[6px] w-[154px] shrink-0">
                  <img
                    :src="product.product_category_photo"
                    class="size-6 flex shrink-0"
                    alt="icon"
                  />
                  <p class="font-semibold text-lg text-nowrap w-[124px] truncate">
                    {{ product.stock }} Stock
                  </p>
                </div>
                <div class="flex items-center gap-[6px] w-[154px] shrink-0">
                  <img
                    src="@/assets/images/icons/Makeup-black.svg"
                    class="size-6 flex shrink-0"
                    alt="icon"
                  />
                  <p class="font-semibold text-lg text-nowrap w-[124px] truncate">
                    {{ product.product_category }}
                  </p>
                </div>
                <div class="flex items-center gap-4">
                  <button
                    @click="showProductDetails(product)"
                    type="button"
                    class="btn btn-primary-opacity min-w-[130px] font-semibold"
                  >
                    Details
                  </button>
                  <router-link
                    :to="`/update-stock-warehouses/${warehouse.id}/stock/${product.product_id}`"
                    class="btn btn-black min-w-[130px] font-semibold"
                  >
                    Add Stock
                  </router-link>
                </div>
              </div>
              <hr class="border-monday-border last:hidden" />
            </template>
          </div>
          <div
            id="Empty-State"
            class="hidden flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6"
          >
            <img
              src="@/assets/images/icons/document-text-grey.svg"
              class="size-[52px]"
              alt="icon"
            />
            <p class="font-semibold text-monday-gray">Oops, it looks like there's no data yet.</p>
          </div>
        </div>
      </section>
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
            <img src="/src/assets/images/icons/close-circle-black.svg" class="size-6" alt="icon" />
          </button>
        </div>
        <div
          v-if="selectedProduct"
          class="modal-content flex flex-col rounded-3xl border border-monday-border p-4 gap-5"
        >
          <div class="flex items-center justify-between">
            <div class="flex flex-col gap-2">
              <p class="flex items-center gap-[6px] font-semibold text-lg">
                <img
                  :src="selectedProduct.product_category_photo"
                  class="size-6 flex shrink-0"
                  alt="icon"
                />
                {{ selectedProduct.product_category }}
              </p>
              <p class="font-bold text-lg">{{ selectedProduct.product_name }}</p>
              <p class="font-semibold text-[17px] text-monday-blue">
                Rp {{ formatNumber(selectedProduct.product_price) }}
              </p>
            </div>
            <div
              class="flex size-[100px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
            >
              <img
                :src="selectedProduct.product_photo"
                class="size-full object-contain"
                alt="product"
              />
            </div>
          </div>
          <hr class="border-monday-border" />
          <div>
            <p class="font-medium text-sm text-monday-gray">Product About</p>
            <p class="font-semibold leading-[160%]">{{ selectedProduct.product_about }}</p>
          </div>
        </div>
      </div>
    </div>
  </Layout>
  <div
    id="Product-Details-Modal"
    class="modal hidden flex flex-1 items-center justify-center h-full fixed top w-full"
  >
    <div data-close-modal class="backdrop absolute w-full h-full bg-[#292D32B2]"></div>
    <div class="relative flex flex-col w-[406px] shrink-0 rounded-3xl p-[18px] gap-5 bg-white">
      <div class="modal-header flex items-center justify-between">
        <p class="font-semibold text-xl">Product Details</p>
        <button
          data-close-modal
          class="flex size-14 rounded-full items-center justify-center bg-monday-gray-background"
        >
          <img src="@/assets/images/icons/close-circle-black.svg" class="size-6" alt="icon" />
        </button>
      </div>
      <div class="modal-content flex flex-col rounded-3xl border border-monday-border p-4 gap-5">
        <div class="flex items-center justify-between">
          <div class="flex flex-col gap-2">
            <p class="flex items-center gap-[6px] font-semibold text-lg">
              <img
                src="@/assets/images/icons/printer-black.svg"
                class="size-6 flex shrink-0"
                alt="icon"
              />
              Printer
            </p>
            <p class="font-bold text-lg">Mazdo Prinder 2.0</p>
            <p class="font-semibold text-[17px] text-monday-blue">Rp 120.500</p>
          </div>
          <div
            class="flex size-[100px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
          >
            <img
              src="@/assets/images/thumbnails/printer.png"
              class="size-full object-contain"
              alt="icon"
            />
          </div>
        </div>
        <hr class="border-monday-border" />
        <div>
          <p class="font-medium text-sm text-monday-gray">Product About</p>
          <p class="font-semibold leading-[160%]">
            A printer is an essential device for printing documents, photos, and various other
            needs. There are several common types of printers, such as inkjet, laser, and thermal
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Layout from '@/components/Layout.vue'
import { getWarehouseProductByWarehouseID } from '@/js/api/warehouse'

export default {
  name: 'DetailWarehouses',
  components: {
    Layout,
  },
  data() {
    return {
      warehouse: {
        id: null,
        name: '',
        phone: '',
        address: '',
        photo: '',
        count_product: 0,
      },
      warehouseProducts: [],
      showModal: false,
      selectedProduct: null,
      handleKeydown: null,
    }
  },
  async created() {
    await this.loadWarehouseProducts()
  },
  methods: {
    async loadWarehouseProducts() {
      const warehouseId = this.$route.params.id
      try {
        const response = await getWarehouseProductByWarehouseID(warehouseId)

        // Update warehouse data
        this.warehouse = {
          id: response.data.id,
          name: response.data.name,
          phone: response.data.phone,
          photo: response.data.photo,
        }
        this.warehouseProducts = response.data.warehouse_products
      } catch (error) {
        console.error('Error loading warehouse products:', error)
      }
    },

    formatNumber(num) {
      return new Intl.NumberFormat('en-US').format(num)
    },

    showProductDetails(product) {
      this.selectedProduct = product
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
      this.selectedProduct = null
    },
  },
}
</script>
