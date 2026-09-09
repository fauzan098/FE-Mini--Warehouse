<template>
  <Layout pageTitle="Add User" breadcrumb-text="Add User" breadcrumb-link="/users">
    <main class="flex flex-col gap-6 flex-1">
      <div class="flex gap-6">
        <form
          @submit.prevent="handleSubmit"
          class="flex flex-col w-full rounded-3xl p-[18px] gap-5 bg-white"
        >
          <h2 class="font-semibold text-xl capitalize">Complete the form</h2>
          <div class="flex items-center justify-between w-full">
            <div
              class="group relative flex size-[100px] rounded-2xl overflow-hidden items-center justify-center bg-monday-background"
            >
              <img
                id="Thumbnail"
                :src="photoPreview || '/src/assets/images/icons/gallery-default.svg'"
                data-default="@/assets/images/icons/gallery-default.svg"
                class="size-full object-contain"
                alt="icon"
              />
              <input
                type="file"
                @change="handlePhotoUpload"
                accept="image/*"
                class="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            <button
              type="button"
              @click="$refs.fileInput.click()"
              class="btn btn-black w-[152px] font-semibold text-nowrap"
            >
              Add Photo
            </button>
          </div>
          <FormInput
            v-model="formData.fullName"
            label="Full Name"
            icon="@/assets/images/icons/profile-grey.svg"
            required="true"
          />
          <FormInput
            v-model="formData.phoneNumber"
            label="Phone Number"
            icon="@/assets/images/icons/call-grey.svg"
            required="true"
            type="tel"
          />
          <FormInput
            v-model="formData.email"
            label="Email Address"
            icon="@/assets/images/icons/sms-grey.svg"
            required="true"
            type="email"
          />
          <FormInput
            v-model="formData.password"
            label="Password"
            icon="@/assets/images/icons/key-grey.svg"
            required="true"
            type="password"
          />
          <FormInput
            v-model="formData.passwordConfirmation"
            label="Password Confirmation"
            icon="@/assets/images/icons/key-grey.svg"
            required="true"
            type="password"
          />
          <div class="flex items-center justify-end gap-4">
            <router-link to="/users" class="btn btn-red font-semibold"> Cancel </router-link>
            <button type="submit" class="btn btn-primary font-semibold" :disabled="loading">
              {{ loading ? 'Creating...' : 'Create Now' }}
            </button>
          </div>
        </form>
        <div class="flex flex-col w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white">
          <p class="font-semibold">Quick Guide to Add User</p>
          <ul class="flex flex-col gap-4">
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Enter user details accurately and dummy completely to ensure proper lorem ipsum
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Assign a role if necessary to ensure proper access lorem ipsum
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Create an initial password to ensure secure user access while maintaining account
                protection
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Ensure Email and Phone Number Are Correct text lorem ipsum
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Thoroughly review all details before creating to ensure accuracy and prevent
                potential errors.
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
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import { createUser, uploadUserImage } from '@/js/api/users'

export default {
  name: 'AddUsers',
  components: {
    Layout,
    FormInput,
  },
  setup() {
    const router = useRouter()
    const formData = reactive({
      fullName: '',
      phoneNumber: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    })

    const photoPreview = ref(null)
    const fileInput = ref(null)
    const selectedFile = ref(null)

    const loading = ref(false)
    const error = ref(null)

    const showPassword = ref(false)
    const showPasswordConfirmation = ref(false)

    const handlePhotoUpload = (event) => {
      const file = event.target.files[0]
      if (file) {
        selectedFile.value = file
        const reader = new FileReader()
        reader.onload = (e) => {
          photoPreview.value = e.target.result
        }
        reader.readAsDataURL(file)
      }
    }

    const handleSubmit = async () => {
      if (
        !formData.fullName ||
        !formData.email ||
        !formData.password ||
        !formData.passwordConfirmation
      ) {
        alert('Please fill in all required fields')
        return
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address')
        return
      }

      if (formData.password.length < 6) {
        alert('Password must be at least 6 characters long')
        return
      }

      if (formData.password !== formData.passwordConfirmation) {
        alert('Password confirmation does not match')
        return
      }

      loading.value = true
      error.value = null

      try {
        let photoUrl = ''

        if (selectedFile.value) {
          const response = await uploadUserImage(selectedFile.value)
          photoUrl = response.data.url || response.data.photo
        }

        const userData = {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phoneNumber || '',
          photo: photoUrl || '',
          password: formData.password,
        }

        const resp = await createUser(userData)
        alert('User created successfully!')
        router.push('/users')
      } catch (error) {
        console.error('Error uploading image:', error)
        alert('Failed to upload image')
        return
      } finally {
        loading.value = false
      }
    }
    return {
      formData,
      photoPreview,
      fileInput,
      selectedFile,
      loading,
      error,
      showPassword,
      showPasswordConfirmation,
      handlePhotoUpload,
      handleSubmit,
    }
  },
}
</script>
