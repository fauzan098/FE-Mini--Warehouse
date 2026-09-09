<template>
  <Layout pageTitle="Edit User Role" breadcrumb-text="Edit User Role" breadcrumb-link="/user-roles">
    <main class="flex flex-col gap-6 flex-1">
      <div class="flex gap-6">
        <form
          action="manage-users-role.html"
          class="flex flex-col w-full h-fit rounded-3xl p-[18px] gap-5 bg-white"
        >
          <h2 class="font-semibold text-xl capitalize">Complete the form</h2>
          <FormSelect
            v-model="formData.userId"
            label="Select User Id"
            icon="@/assets/images/icons/profile-circle-grey.svg"
            required
          >
            <option value="mirana1">Mirana Gaul</option>
            <option value="mirana2">Mirana Gaul</option>
          </FormSelect>
          <FormSelect
            v-model="formData.roleId"
            label="Select Role Id"
            icon="@/assets/images/icons/profile-tick-grey.svg"
            required
          >
            <option value="keeper">Keeper</option>
            <option value="manager">Manager</option>
          </FormSelect>
          <div class="flex items-center justify-end gap-4">
            <router-link to="/user-roles" class="btn btn-red font-semibold"> Cancel </router-link>
            <button type="submit" class="btn btn-primary font-semibold" :disabled="isSubmitting">
              <template v-if="isSubmitting">
                <span>Updating...</span>
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
                Choose an available username from the list to ensure uniqueness
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Choose the most suitable role as needed to ensure proper access Lorem Ipsum
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Review All Details Carefully Before ipsum Creating lorem dummy text
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Make Sure Not to Assign the Wrong Role or Permissions lorem text ipsum
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Ensure the Role is Assigned to the Right Person lorem ipsum simply
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
import { useRoute, useRouter } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import { getUserRoleById } from '@/js/api/users'

export default {
  name: 'EditUserRoles',
  components: {
    Layout,
    FormSelect,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const isSubmitting = ref(false)
    const currentAssignment = ref(null)
    const userRoleId = ref(null)

    const formData = reactive({
      userId: '',
      roleId: '',
    })

    const errors = reactive({
      userId: '',
      roleId: '',
    })

    const validateForm = () => {
      errors.userId = ''
      errors.roleId = ''

      if (!formData.userId) {
        errors.userId = 'Please select a user'
      }

      if (!formData.roleId) {
        errors.roleId = 'Please select a role'
      }

      return !errors.userId && !errors.roleId
    }

    const loadCurrentAssignment = async () => {
      userRoleId.value = route.params.id

      if (!userRoleId) {
        alert('User role ID is required')
        router.push('/user-roles')
        return
      }

      try {
        const response = await getUserRoleById(userRoleId.value)
        formData.userId = response.data.user_id
        formData.roleId = response.data.role_id
        console.log(response)
      } catch (error) {
        console.error('Error loading user role:', error)
        alert('Error loading user role')
        router.push('/user-roles')
      }
    }

    onMounted(async () => {
      await loadCurrentAssignment()
    })

    const handleSubmit = async () => {
      if (!validateForm()) {
        return
      }

      isSubmitting.value = true

      try {
        await updateUserRole(userRoleId.value, {
          user_id: parseInt(formData.userId),
          role_id: parseInt(formData.roleId),
        })
        alert('User role updated successfully!')
        router.push('/user-roles')
      } catch (error) {
        console.error('Error updating user role:', error)
        alert('Failed to update user role')
      } finally {
        isSubmitting.value = false
      }
    }
    return {
      formData,
      errors,
      isSubmitting,
      currentAssignment,
      loadCurrentAssignment,
      handleSubmit,
    }
  },
}
</script>
