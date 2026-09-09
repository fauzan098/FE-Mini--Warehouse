<template>
  <Layout pageTitle="Manage Products">
    <main class="flex flex-col gap-6 flex-1">
      <section id="Products" class="flex flex-col gap-6 flex-1 rounded-3xl p-[18px] px-0 bg-white">
        <div id="Header" class="flex items-center justify-between px-[18px]">
          <div class="flex flex-col gap-[6px]">
            <p class="flex items-center gap-[6px]">
              <img
                src="@/assets/images/icons/bag-black.svg"
                class="size-6 flex shrink-0"
                alt="icon"
              />
              <span class="font-semibold text-2xl">20 Total Products</span>
            </p>
            <p class="font-semibold text-lg text-monday-gray">
              View and update your product list here.
            </p>
          </div>
          <a href="/add-products" class="btn btn-primary font-semibold">
            Add New
            <img
              src="@/assets/images/icons/add-square-white.svg"
              class="flex sixe-6 shrink-0"
              alt="icon"
            />
          </a>
        </div>
        <hr class="border-monday-border" />
        <div id="Product-List" class="flex flex-col px-4 gap-5 flex-1">
          <div class="flex items-center justify-between">
            <p class="font-semibold text-xl">All Products</p>
          </div>

          <div v-if="filteredProducts.length > 0" class="flex flex-col gap-5">
            <template v-for="(product, index) in filteredProducts" :key="product.id">
              <div class="card flex items-center justify-between gap-3">
                <div class="flex items-center gap-3 w-[380px] shrink-0">
                  <div
                    class="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
                  >
                    <img :src="product.thumbnail" class="size-full object-contain" alt="icon" />
                  </div>
                  <div class="flex flex-col gap-2 flex-1">
                    <p class="font-semibold text-xl w-[282px] truncate">{{ product.name }}</p>
                    <p class="font-semibold text-xl text-monday-blue">
                      Rp {{ formatPrice(product.price) }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-[6px] min-w-[212px]">
                  <img :src="product.category?.photo" class="size-6 flex shrink-0" alt="icon" />
                  <p class="font-semibold text-lg text-nowrap">{{ product.category?.name }}</p>
                </div>
                <div class="flex items-center gap-4">
                  <button
                    @click="viewProduct(product.id)"
                    class="btn btn-primary-opacity min-w-[130px] font-semibold"
                  >
                    Details
                  </button>
                  <router-link
                    :to="`/edit-products/${product.id}`"
                    class="btn btn-black min-w-[130px] font-semibold"
                  >
                    <img
                      src="@/assets/images/icons/edit-white.svg"
                      class="flex size-6 shrink-0"
                      alt="icon"
                    />
                    Edit
                  </router-link>
                </div>
              </div>
              <hr
                v-if="index < filteredProducts.length - 1"
                class="border-monday-border last:hidden"
              />
            </template>
          </div>
          <div
            v-else
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

        <div
          v-if="filteredProducts.length > 0"
          class="flex items-center justify-between px-[18px] py-4"
        >
          <p class="font-medium text-monday-gray">
            Showing {{ startIndex + 1 }}-{{ endIndex }} of {{ filteredProducts.length }} products
          </p>
          <div class="flex items-center gap-2">
            <button
              @click="previousPage"
              :disabled="currentPage === 1"
              class="btn btn-primary-opacity font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="goToPage(page)"
              :class="[
                'px-4 py-2 rounded-2xl font-semibold transition-300',
                page === currentPage
                  ? 'bg-monday-blue text-white'
                  : 'bg-monday-gray-background text-monday-gray hover:bg-monday-border',
              ]"
            >
              {{ page }}
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="btn btn-primary-opacity font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </main>
  </Layout>

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
        v-if="selectedProduct"
        class="modal-content flex flex-col rounded-3xl border border-monday-border p-4 gap-5"
      >
        <div class="flex items-center justify-between">
          <div class="flex flex-col gap-2">
            <p class="flex items-center gap-[6px] font-semibold text-lg">
              <img :src="selectedProduct.category.photo" class="size-6 flex shrink-0" alt="icon" />
              {{ selectedProduct.category.name }}
            </p>
            <p class="font-bold text-lg">{{ selectedProduct.name }}</p>
            <p class="font-semibold text-[17px] text-monday-blue">
              Rp {{ formatPrice(selectedProduct.price) }}
            </p>
          </div>
          <div
            class="flex size-[100px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
          >
            <img :src="selectedProduct.thumbnail" class="size-full object-contain" alt="icon" />
          </div>
        </div>
        <hr class="border-monday-border" />
        <div>
          <p class="font-medium text-sm text-monday-gray">Product About</p>
          <p class="font-semibold leading-[160%]">
            {{ selectedProduct.about || 'No description available.' }}
          </p>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="font-medium text-sm text-monday-gray">Popularity</p>
            <p class="font-semibold">
              {{ selectedProduct.is_popular ? 'Popular' : 'Not Popular' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Layout from '@/components/Layout.vue'
import { useProductStore } from '@/stores/products'
import { computed, onMounted, ref } from 'vue'

export default {
  name: 'ManageProducts',
  components: {
    Layout,
  },
  setup() {
    const productStore = useProductStore()
    const showModal = ref(false)
    const selectedProduct = ref(null)
    const currentPage = ref(1)
    const itemsPerPage = ref(5)

    const products = computed(() => productStore.products)
    const loading = computed(() => productStore.loading)
    const error = computed(() => productStore.error)

    const filteredProducts = computed(() => {
      return products.value
    })

    const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage.value))
    const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
    const endIndex = computed(() =>
      Math.min(startIndex.value + itemsPerPage.value, filteredProducts.value.length),
    )

    const paginatedProducts = computed(() => {
      return filteredProducts.value.slice(startIndex.value, endIndex.value)
    })

    const visiblePages = computed(() => {
      const pages = []
      const maxVisible = 5
      let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
      let end = Math.min(totalPages.value, start + maxVisible - 1)

      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1)
      }

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      return pages
    })

    const fetchProducts = async () => {
      try {
        await productStore.fetchProducts()
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    const goToPage = (page) => {
      currentPage.value = page
    }

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++
      }
    }

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--
      }
    }

    const openModal = (product) => {
      selectedProduct.value = product
      showModal.value = true
    }

    const closeModal = () => {
      showModal.value = false
      selectedProduct.value = null
    }

    const viewProduct = (id) => {
      const product = products.value.find((p) => p.id === id)
      if (product) {
        openModal(product)
      }
    }

    const formatPrice = (price) => {
      return new Intl.NumberFormat('id-ID').format(price)
    }

    onMounted(() => {
      fetchProducts()
    })

    return {
      products,
      showModal,
      selectedProduct,
      currentPage,
      itemsPerPage,
      totalPages,
      filteredProducts: paginatedProducts,
      visiblePages,
      startIndex,
      endIndex,
      goToPage,
      nextPage,
      previousPage,
      openModal,
      closeModal,
      viewProduct,
      formatPrice,
      loading,
      error,
    }
  },
}
</script>
