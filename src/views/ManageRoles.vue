<template>
  <Layout pageTitle="Manage Roles">
    <main class="flex flex-col gap-6 flex-1">
      <section id="Products" class="flex flex-col gap-6 flex-1 rounded-3xl p-[18px] px-0 bg-white">
        <div id="Header" class="flex items-center justify-between px-[18px]">
          <div class="flex flex-col gap-[6px]">
            <p class="flex items-center gap-[6px]">
              <img
                src="@/assets/images/icons/profile-circle-black.svg"
                class="size-6 flex shrink-0"
                alt="icon"
              />
              <span class="font-semibold text-2xl">2 Total Roles</span>
            </p>
            <p class="font-semibold text-lg text-monday-gray">View and update your Roles here.</p>
          </div>
          <router-link to="/add-roles" class="btn btn-primary font-semibold">
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
            <p class="font-semibold text-xl">All Roles</p>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="flex flex-col flex-1 items-center justify-center gap-4">
            <img
              src="@/assets/images/icons/loading.svg"
              class="size-12 animate-spin"
              alt="loading"
            />
            <p class="font-semibold text-monday-gray">Loading roles...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="flex flex-col flex-1 items-center justify-center gap-4">
            <img src="@/assets/images/icons/close-circle-black.svg" class="size-12" alt="error" />
            <p class="font-semibold text-red-500">{{ error }}</p>
            <button @click="rolesStore.fetchRoles()" class="btn btn-primary font-semibold">
              Try Again
            </button>
          </div>

          <!-- Empty State -->
          <div
            v-else-if="roles.length === 0"
            id="Empty-State"
            class="flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6"
          >
            <img
              src="@/assets/images/icons/document-text-grey.svg"
              class="size-[52px]"
              alt="icon"
            />
            <p class="font-semibold text-monday-gray">Oops, it looks like there's no data yet.</p>
          </div>

          <div v-else class="flex flex-col gap-5">
            <template v-for="(role, index) in roles" :key="role.id">
              <div class="card flex items-center justify-between gap-3">
                <div class="flex items-center gap-3 w-full">
                  <div
                    class="flex size-16 rounded-2xl bg-monday-gray-background items-center justify-center overflow-hidden"
                  >
                    <img
                      src="@/assets/images/icons/user-octagon-grey.svg"
                      class="size-6 object-contain"
                      alt="icon"
                    />
                  </div>
                  <div class="flex flex-col gap-2 flex-1">
                    <p class="font-semibold text-xl">{{ role.name }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-2 w-full">
                  <img
                    src="@/assets/images/icons/profile-2user-black.svg"
                    class="size-6 flex shrink-0"
                    alt="icon"
                  />
                  <p class="font-semibold text-lg text-nowrap">{{ role.count_users }} Total User</p>
                </div>
                <router-link
                  :to="`/edit-roles/${role.id}`"
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
              <hr v-if="index < roles.length - 1" class="border-monday-border last:hidden" />
            </template>
          </div>
        </div>
      </section>
    </main>
  </Layout>
</template>
<script>
import Layout from '@/components/Layout.vue'
import { useRolesStore } from '@/stores/roles'
import { computed, onMounted } from 'vue'

export default {
  name: 'ManageRoles',
  components: {
    Layout,
  },

  setup() {
    const rolesStore = useRolesStore()
    const roles = computed(() => rolesStore.roles)
    const loading = computed(() => rolesStore.loading)
    const error = computed(() => rolesStore.error)

    const fetchRoles = async () => {
      try {
        await rolesStore.fetchRoles()
      } catch (error) {
        console.error('Error fetching roles:', error)
      }
    }

    onMounted(() => {
      fetchRoles()
    })

    return {
      roles,
      loading,
      error,
    }
  },
}
</script>
