<template>
  <Layout
    pageTitle="Add New Merchant"
    breadcrumb-text="Add New Merchant"
    breadcrumb-link="/merchants"
  >
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
                :src="imagePreview || defaultImage"
                data-default="@/assets/images/icons/gallery-default.svg"
                class="size-full object-cover"
                alt="icon"
              />
              <input
                type="file"
                @change="onFileChange"
                accept="image/*"
                class="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            <button
              type="button"
              @click.prevent="triggerFileInput"
              class="btn btn-black w-[152px] font-semibold text-nowrap"
            >
              Add Photo
            </button>
          </div>
          <FormInput
            v-model="form.name"
            label="Merchant Name"
            icon="@/assets/images/icons/shop-grey.svg"
            required="true"
          />
          <FormInput
            v-model="form.phone"
            label="Phone Number"
            icon="@/assets/images/icons/call-grey.svg"
            required="true"
            type="tel"
          />
          <FormSelect
            v-model="form.keeper_id"
            label="Keeper"
            icon="@/assets/images/icons/user-thin-grey.svg"
            required
          >
            <option v-for="keeper in keepers" :key="keeper.id" :value="keeper.id">
              {{ keeper.name }}
            </option>
          </FormSelect>
          <FormTextarea
            v-model="form.address"
            label="Merchants Address"
            icon="@/assets/images/icons/location-grey.svg"
            required
          />
          <div class="flex items-center justify-end gap-4">
            <router-link to="/merchants" class="btn btn-red font-semibold"> Cancel </router-link>
            <button type="submit" class="btn btn-primary font-semibold" :disabled="isSubmitting">
              <span v-if="isSubmitting">Creating Merchant...</span>
              <span v-else>Create Now</span>
            </button>
          </div>
        </form>
        <div class="flex flex-col w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white">
          <p class="font-semibold">Quick Guide to Add New Merchant</p>
          <ul class="flex flex-col gap-4">
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Use a clear and recognizable merchant name Lorem Ipsum mix amet
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Ensure the phone number is valid and reachable dummy text
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Assign a responsible and available keeper Lorem Ipsum simply Text
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Double-check the warehouse address for accuracy Lorem Ipsum
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Upload a high-quality merchant photo for easy identification
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
import FormSelect from '@/components/FormSelect.vue'
import FormTextarea from '@/components/FormTextarea.vue'
import { getKeepers } from '@/js/api/users'
import { createMerchant, uploadMerchantImage } from '@/js/api/merchants'

export default {
  name: 'AddMerchants',
  components: {
    Layout,
    FormInput,
    FormSelect,
    FormTextarea,
  },
  data() {
    return {
      form: {
        name: '',
        phone: '',
        keeper_id: '',
        address: '',
        photo: null,
      },
      keepers: [],
      isSubmitting: false,
      imagePreview: '',
      selectedFile: null,
      defaultImage: '/src/assets/images/icons/gallery-default.svg',
      isLoadingKeepers: false,
    }
  },
  async created() {
    await this.fetchKeepers()
  },
  computed: {
    selectedKeeper() {
      if (!this.form.keeper_id) return null
      return this.keepers.find((keeper) => keeper.id == this.form.keeper_id)
    },
  },
  methods: {
    async fetchKeepers() {
      this.isLoadingKeepers = true
      try {
        const response = await getKeepers()
        this.keepers = response.data || response || []
      } catch (error) {
        console.error('Error fetching keepers:', error)
      } finally {
        this.isLoadingKeepers = false
      }
    },

    onFileChange(e) {
      const file = e.target.files[0]
      if (file) {
        this.form.photo = file
        const reader = new FileReader()
        reader.onload = (e2) => {
          this.imagePreview = e2.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    triggerFileInput() {
      const input = document.querySelector('input[type=file]')
      if (input) input.click()
    },

    async handleSubmit() {
      // Validasi form
      if (!this.form.name || !this.form.phone || !this.form.keeper_id || !this.form.address) {
        alert('Mohon lengkapi semua data!')
        return
      }

      // Validasi keeper_id harus berupa angka
      if (isNaN(this.form.keeper_id) || this.form.keeper_id <= 0) {
        alert('Pilih keeper yang valid!')
        return
      }

      this.isSubmitting = true

      try {
        let photoUrl = null

        // Upload photo if provided
        if (this.form.photo) {
          try {
            const uploadResponse = await uploadMerchantImage(this.form.photo)
            photoUrl = uploadResponse.data.url || uploadResponse.data.photo
          } catch (uploadError) {
            console.error('Error uploading image:', uploadError)
            // Continue without photo if upload fails
          }
        }

        // Prepare request data
        const requestData = {
          name: this.form.name,
          address: this.form.address,
          phone: this.form.phone,
          keeper_id: parseInt(this.form.keeper_id),
          photo: photoUrl || this.form.photo || null,
        }

        // Call API to create merchant
        const response = await createMerchant(requestData)

        // Show success message
        alert('Merchant berhasil dibuat!')

        // Redirect to merchants list
        this.$router.push('/merchants')
      } catch (error) {
        console.error('Error creating merchant:', error)
        alert('Gagal membuat merchant. Silakan coba lagi.')
      } finally {
        this.isSubmitting = false
      }
    },
  },
}
</script>
