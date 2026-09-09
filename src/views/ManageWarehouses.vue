<template>
  <Layout pageTitle="Manage Warehouses">
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
              <span class="font-semibold text-2xl">{{ totalRecords }} Total Warehouses</span>
            </p>
            <p class="font-semibold text-lg text-monday-gray">
              View and update your Warehouses list here.
            </p>
          </div>
          <router-link to="/add-warehouses" class="btn btn-primary font-semibold">
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
            <p class="font-semibold text-xl">All Warehouses</p>
          </div>

          <div
            v-if="warehouses.length === 0"
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
            <template v-for="warehouse in warehouses" :key="warehouse.id">
              <div class="card flex items-center justify-between gap-3">
                <div class="flex items-center gap-3 w-[360px] shrink-0">
                  <div
                    class="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
                  >
                    <img :src="warehouse.photo" class="size-full object-contain" alt="icon" />
                  </div>
                  <div class="flex flex-col gap-2 flex-1">
                    <p class="font-semibold text-xl">{{ warehouse.name }}</p>
                    <p class="flex items-center gap-1 font-medium text-lg text-monday-gray">
                      <span>{{ warehouse.phone }}</span>
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-2 w-full justify-center">
                  <img
                    src="@/assets/images/icons/bag-black.svg"
                    class="size-6 flex shrink-0"
                    alt="icon"
                  />
                  <p class="font-semibold text-lg text-nowrap">
                    {{ warehouse.count_product }} Products
                  </p>
                </div>
                <div class="flex items-center gap-4">
                  <router-link
                    :to="`/detail-warehouses/${warehouse.id}`"
                    class="btn btn-primary-opacity min-w-[130px] font-semibold"
                  >
                    Details
                  </router-link>
                  <router-link
                    :to="`/edit-warehouses/${warehouse.id}`"
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
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue'
import { getWarehouses } from '@/js/api/warehouse'

export default {
  name: 'ManageWarehouses',
  components: {
    Layout,
  },
  data() {
    return {
      warehouses: [],
      totalRecords: 0,
    }
  },
  async mounted() {
    await this.fetchWarehouses()
  },
  methods: {
    async fetchWarehouses() {
      try {
        const response = await getWarehouses()
        this.warehouses = response.data?.warehouses || response || []
        this.totalRecords = response.data?.pagination.total_records || 0
      } catch (error) {
        console.error('Error fetching warehouses:', error)
        this.warehouses = []
      }
    },

    formatNumber(num) {
      return new Intl.NumberFormat('en-US').format(num)
    },
  },
}
</script>
