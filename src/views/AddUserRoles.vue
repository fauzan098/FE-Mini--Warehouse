<template>
  <Layout pageTitle="Add User Role" breadcrumb-text="Add User Role" breadcrumb-link="/user-roles">
    <main class="flex flex-col gap-6 flex-1">
      <div class="flex gap-6">
        <form
          @submit.prevent="handleSubmit"
          class="flex flex-col w-full h-fit rounded-3xl p-[18px] gap-5 bg-white"
        >
          <h2 class="font-semibold text-xl capitalize">Complete the form</h2>
          <FormSelect
            v-model="formData.selectedUser"
            label="Select User Id"
            icon="@/assets/images/icons/profile-circle-grey.svg"
            required="true"
          >
            <option v-for="user in availableUsers" :key="user.id" :value="user.id">
              {{ user.name }}
            </option>
          </FormSelect>
          <FormSelect
            v-model="formData.selectedRole"
            label="Select Role Id"
            icon="@/assets/images/icons/profile-tick-grey.svg"
            required="true"
          >
            <option v-for="role in availableRoles" :key="role.id" :value="role.id">
              {{ role.name }}
            </option>
          </FormSelect>
          <div class="flex items-center justify-end gap-4">
            <router-link to="/user-roles" class="btn btn-red font-semibold"> Cancel </router-link>
            <button type="submit" class="btn btn-primary font-semibold" :disabled="loading">
              <template v-if="loading">
                <span>Saving...</span>
              </template>
              <span v-else>Save Changes</span>
            </button>
          </div>
        </form>
        <div class="flex flex-col w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white">
          <p class="font-semibold">Quick Guide to Assign Role To User</p>
          <ul class="flex flex-col gap-4">
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Select an Available Username from the List lorem ipsum simply text
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Select the Most Appropriate Role as Needed text lorem ipsum dummy
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Review All Details Carefully Before Creating dummy image
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Make Sure Not to Assign the Wrong Role or Permissions text lorem si ipsum
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Ensure the Role is Assigned to the Right Person color dot amet ipsum lorem
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
import FormSelect from '@/components/FormSelect.vue'
import { useRouter } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import { createUserRole, getRoles, getUsers } from '@/js/api/users'

export default {
  name: 'AddUserRoles',
  components: {
    Layout,
    FormSelect,
  },
  setup() {
    const router = useRouter()

    const formData = reactive({
      selectedUser: '',
      selectedRole: '',
    })

    const availableUsers = ref([])
    const availableRoles = ref([])
    const loading = ref(false)

    const fetchUsers = async () => {
      try {
        const response = await getUsers()
        availableUsers.value = response.data.users || []
      } catch (err) {
        console.error('Error fetching users:', err)
      }
    }

    const fetchRoles = async () => {
      try {
        const response = await getRoles()
        availableRoles.value = response.data || []
      } catch (err) {
        console.error('Error fetching roles:', err)
      }
    }

    onMounted(async () => {
      try {
        await Promise.all([fetchUsers(), fetchRoles()])
      } catch (err) {
        console.error('Error loading data:', err)
      }
    })

    const handleSubmit = async () => {
      if (!formData.selectedUser || !formData.selectedRole) {
        alert('Please select both user and role')
        return
      }

      loading.value = true

      const selectedUser = availableUsers.value.find((user) => user.id === formData.selectedUser)
      const selectedRole = availableRoles.value.find((role) => role.id === formData.selectedRole)

      try {
        const userRoleData = {
          user_id: parseInt(formData.selectedUser),
          role_id: parseInt(formData.selectedRole),
        }
        await createUserRole(userRoleData)
        alert(`Role "${selectedRole?.name}" assigned to "${selectedUser?.name}" successfully!`)
        router.push('/user-roles')
      } catch (error) {
        console.error('Error assigning role:', error)
        alert(`Failed to assign role: ${error.message}`)
      } finally {
        loading.value = false
      }
    }

    return {
      formData,
      availableUsers,
      availableRoles,
      handleSubmit,
    }
  },
}
</script>
