<template>
  <Layout pageTitle="Manage Merchants">
    <main class="flex flex-col gap-6 flex-1">
      <section id="Products" class="flex flex-col gap-6 flex-1 rounded-3xl p-[18px] px-0 bg-white">
        <div id="Header" class="flex items-center justify-between px-[18px]">
          <div class="flex flex-col gap-[6px]">
            <p class="flex items-center gap-[6px]">
              <img
                src="@/assets/images/icons/buildings-2-black.svg"
                class="size-6 flex shrink-0"
                alt="icon"
              />
              <span class="font-semibold text-2xl">5 Total Merchants</span>
            </p>
            <p class="font-semibold text-lg text-monday-gray">
              View and update your Merchants list here.
            </p>
          </div>
          <router-link to="/add-merchants" class="btn btn-primary font-semibold">
            Add New
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
            <p class="font-semibold text-xl">All Merchants</p>
          </div>
          <!-- Loading State -->
          <div
            v-if="isLoading"
            class="flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6"
          >
            <img
              src="@/assets/images/icons/loading.svg"
              class="size-[52px] animate-spin"
              alt="loading"
            />
            <p class="font-semibold text-monday-gray">Loading merchants...</p>
          </div>

          <!-- Empty State -->
          <div
            v-else-if="merchants.length === 0"
            class="flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6"
          >
            <img
              src="@/assets/images/icons/document-text-grey.svg"
              class="size-[52px]"
              alt="icon"
            />
            <p class="font-semibold text-monday-gray">Oops, it looks like there's no data yet.</p>
          </div>
          <!-- Merchants List -->
          <div v-else class="flex flex-col gap-5">
            <template v-for="merchant in merchants" :key="merchant.id">
              <div class="card flex items-center justify-between gap-3">
                <div class="flex items-center gap-3 w-[326px] shrink-0">
                  <div
                    class="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
                  >
                    <img :src="merchant.photo" class="size-full object-contain" alt="icon" />
                  </div>
                  <div class="flex flex-col gap-2 flex-1">
                    <p class="font-semibold text-xl w-[228px] truncate">{{ merchant.name }}</p>
                    <p class="flex items-center gap-1 font-medium text-lg text-monday-gray">
                      <img
                        src="@/assets/images/icons/user-thin-grey.svg"
                        class="size-6 flex shrink-0"
                        alt="icon"
                      />
                      <span>{{ merchant.keeper_name }}</span>
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-2 min-w-[266px]">
                  <img
                    src="@/assets/images/icons/bag-black.svg"
                    class="size-6 flex shrink-0"
                    alt="icon"
                  />
                  <p class="font-semibold text-lg text-nowrap">
                    {{ merchant.product_count }} Products
                  </p>
                </div>
                <div class="flex items-center gap-4">
                  <router-link
                    :to="`/detail-merchants/${merchant.id}`"
                    class="btn btn-primary-opacity min-w-[130px] font-semibold"
                  >
                    Details
                  </router-link>
                  <router-link
                    :to="`/edit-merchants/${merchant.id}`"
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
              <hr v-if="index < merchants.length - 1" class="border-monday-border last:hidden" />
            </template>
          </div>
        </div>
        <div v-if="merchants.length > 0" class="flex items-center justify-between px-[18px] py-4">
          <p class="font-medium text-monday-gray">
            Showing {{ startIndex + 1 }}-{{ endIndex }} of {{ merchants.length }} merchants
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
              v-for="page in pagination.total_pages"
              :key="page"
              @click="goToPage(page)"
              :disabled="page === currentPage"
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
              :disabled="currentPage === pagination.total_pages"
              class="btn btn-primary-opacity font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </main>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue'
import { getMerchants } from '@/js/api/merchants'

export default {
  name: 'ManageMerchants',
  components: {
    Layout,
  },
  data() {
    return {
      merchants: [],
      currentPage: 1,
      itemsPerPage: 10,
      pagination: {
        current_page: 1,
        total_pages: 1,
        total_records: 0,
        limit: 10,
        has_next: false,
        has_prev: false,
      },
      isLoading: false,
    }
  },
  computed: {
    startIndex() {
      return (this.pagination.current_page - 1) * this.itemsPerPage
    },
    endIndex() {
      return Math.min(this.startIndex + this.itemsPerPage, this.pagination.total_records)
    },
    paginatedMerchants() {
      return this.merchants.slice(this.startIndex, this.endIndex)
    },
  },
  async created() {
    await this.fetchMerchants()
  },
  methods: {
    async fetchMerchants() {
      this.isLoading = true
      try {
        const response = await getMerchants(
          '?page=' + this.currentPage + '&limit=' + this.itemsPerPage,
        )
        this.merchants = response.data?.data || response || []

        this.pagination = {
          current_page: response.data?.pagination?.current_page || 1,
          total_pages: response.data?.pagination?.total_pages || 1,
          total_records: response.data?.pagination?.total_records || 0,
          limit: response.data?.pagination?.limit || 10,
          has_next: response.data?.pagination?.has_next || false,
          has_prev: response.data?.pagination?.has_prev || false,
        }
      } catch (error) {
        console.error('Error fetching merchants:', error)
      } finally {
        this.isLoading = false
      }
    },
    goToPage(page) {
      this.currentPage = page
      this.fetchMerchants()
    },
    nextPage() {
      if (this.currentPage < this.pagination.total_pages) this.currentPage++
      this.fetchMerchants()
    },
    previousPage() {
      if (this.currentPage > 1) this.currentPage--
      this.fetchMerchants()
    },
  },
}
</script>
