<template>
  <LayoutMerchant pageTitle="My Merchant" breadcrumb-text="" breadcrumb-link="">
    <main class="flex flex-col gap-6 flex-1">
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="flex items-center gap-3">
          <img src="@/assets/images/icons/loading.svg" class="size-6 animate-spin" alt="loading" />
          <span class="font-semibold text-lg">Loading merchants...</span>
        </div>
      </div>
      <section
        v-else-if="selectedMerchant"
        class="flex items-center justify-between rounded-3xl p-[18px] gap-3 bg-white"
      >
        <div
          class="flex size-16 rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
        >
          <img :src="selectedMerchant.photo" class="size-full object-contain" alt="icon" />
        </div>
        <div class="flex flex-col gap-2 flex-1">
          <p class="font-semibold text-xl">{{ selectedMerchant.name }}</p>
          <p class="flex items-center gap-1 font-medium text-lg text-monday-gray">
            <img
              src="@/assets/images/icons/call-grey.svg"
              class="size-6 flex shrink-0"
              alt="icon"
            />
            <span>{{ selectedMerchant.phone }}</span>
          </p>
        </div>
        <div class="flex flex-col gap-2 flex-1">
          <p class="flex items-center gap-1 font-medium text-monday-gray">
            <img
              src="@/assets/images/icons/user-grey.svg"
              class="size-4 flex shrink-0"
              alt="icon"
            />
            <span>Keeper Name:</span>
          </p>
          <p class="font-semibold text-lg">{{ selectedMerchant.keeper_name }} (You)</p>
        </div>
      </section>
      <section
        v-if="merchants"
        class="flex flex-col gap-6 flex-1 rounded-3xl p-[18px] px-0 bg-white"
      >
        <div id="Header" class="flex items-center justify-between px-[18px]">
          <div class="flex flex-col gap-[6px]">
            <p class="flex items-center gap-[6px]">
              <img
                src="@/assets/images/icons/buildings-2-black.svg"
                class="size-6 flex shrink-0"
                alt="icon"
              />
              <span class="font-semibold text-2xl"
                >{{ merchantProducts?.length }} Total Products</span
              >
            </p>
            <p class="font-semibold text-lg text-monday-gray">
              View and update your Product Warehouses list here.
            </p>
            <button
              @click="refreshProducts"
              :disabled="loadingProducts"
              class="btn btn-primary-opacity font-semibold flex items-center gap-2"
            >
              <span>{{ loadingProducts ? 'Refreshing...' : 'Refresh' }}</span>
            </button>
          </div>
        </div>
        <hr class="border-monday-border" />
        <div id="Product-List" class="flex flex-col px-4 gap-5 flex-1">
          <div class="flex items-center justify-between">
            <p class="font-semibold text-xl">All Products</p>
          </div>

          <div v-if="loadingProducts" class="flex items-center justify-center py-12">
            <div class="flex items-center gap-3">
              <img
                src="@/assets/images/icons/loading.svg"
                class="size-6 animate-spin"
                alt="loading"
              />
              <span class="font-semibold text-lg">Loading products...</span>
            </div>
          </div>

          <div v-else class="flex flex-col gap-5">
            <div
              v-for="(product, index) in merchantProducts"
              :key="product.id"
              class="card flex items-center justify-between gap-6"
            >
              <div class="flex items-center gap-3 w-[340px] shrink-0">
                <div
                  class="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
                >
                  <img :src="product.product_photo" class="size-full object-contain" alt="icon" />
                </div>
                <div class="flex flex-col gap-2 flex-1">
                  <p class="font-semibold text-xl w-[242px] truncate">{{ product.product_name }}</p>
                  <p class="font-semibold text-xl text-monday-blue">
                    Rp {{ formatPrice(product.product_price) }}
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-[6px] w-[187px] shrink-0">
                <img
                  src="@/assets/images/icons/box-black.svg"
                  class="size-6 flex shrink-0"
                  alt="icon"
                />
                <p class="font-semibold text-lg text-nowrap w-[124px] truncate">
                  {{ product.stock }} Stock
                </p>
              </div>
              <div class="flex items-center gap-[6px] w-[187px] shrink-0">
                <img
                  :src="product.product_category_photo"
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
                  class="btn btn-primary-opacity min-w-[130px] font-semibold"
                >
                  Details
                </button>
              </div>
            </div>
            <hr
              v-if="index < merchantProducts.length - 1"
              class="border-monday-border last:hidden"
            />
          </div>
          <div
            v-if="!loadingProducts && (!merchantProducts || merchantProducts.length === 0)"
            class="flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6"
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
      <div
        v-else-if="showEmptyState"
        class="flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6"
      >
        <img src="@/assets/images/icons/document-text-grey.svg" class="size-[52px]" alt="icon" />
        <p class="font-semibold text-monday-gray">
          Oops, it looks like there's no merchant assigned to you yet.
        </p>
      </div>
    </main>

    <div
      v-if="showModal"
      class="modal flex flex-1 items-center justify-center h-full fixed top w-full z-50 left-0"
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
        <div class="modal-content flex flex-col rounded-3xl border border-monday-border p-4 gap-5">
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
                Rp {{ formatPrice(selectedProduct.product_price) }}
              </p>
            </div>
            <div
              class="flex size-[100px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
            >
              <img
                :src="selectedProduct.product_photo"
                class="size-full object-contain"
                alt="icon"
              />
            </div>
          </div>
          <hr class="border-monday-border" />
          <div>
            <p class="font-medium text-sm text-monday-gray">Product About</p>
            <p class="font-semibold leading-[160%]">
              {{ selectedProduct.product_about }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </LayoutMerchant>
</template>

<script setup>
import LayoutMerchant from '@/components/LayoutMerchant.vue'
import { getMerchantProducts } from '@/js/api/merchants'
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref } from 'vue'

const authStore = useAuthStore()

const merchants = ref([])
const selectedMerchant = ref(null)
const merchantProducts = ref([])
const loading = ref(true)
const loadingProducts = ref(false)
const showModal = ref(false)
const showEmptyState = ref(false)
const selectedProduct = ref({})

const fetchMerchants = async () => {
  try {
    loading.value = true

    const storedMerchantData = authStore.getMerchantData()

    if (storedMerchantData && storedMerchantData.length > 0) {
      merchants.value = storedMerchantData
      showEmptyState.value = false

      if (merchants.value.length > 0) {
        selectedMerchant.value = merchants.value[0]
        await fetchMerchantProducts(selectedMerchant.value.id)
      }
    } else {
      showEmptyState.value = true
    }
  } catch (error) {
    console.error('Error fetching merchants:', error)
    showEmptyState.value = true
  } finally {
    loading.value = false
  }
}

const fetchMerchantProducts = async (merchantId) => {
  try {
    loadingProducts.value = true

    const response = await getMerchantProducts(`?merchant_id=${merchantId}`)

    merchantProducts.value = response.data ? response.data.merchant_products : []
  } catch (error) {
    console.error('Error fetching merchant products:', error)
    merchantProducts.value = []
  } finally {
    loadingProducts.value = false
  }
}

const selectMerchant = async (merchant) => {
  selectedMerchant.value = merchant
  await fetchMerchantProducts(merchant.id)
}

const refreshProducts = async () => {
  if (selectedMerchant.value) {
    await fetchMerchantProducts(selectedMerchant.value.id)
  }
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price)
}

const showProductDetails = (product) => {
  selectedProduct.value = product
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

onMounted(async () => {
  await fetchMerchants()
})
</script>
