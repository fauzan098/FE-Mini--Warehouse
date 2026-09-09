<template>
  <Layout pageTitle="Edit Merchant" breadcrumb-text="Edit Merchant" breadcrumb-link="/merchants">
    <main class="flex flex-col gap-6 flex-1">
      <div class="flex gap-6">
        <!-- Loading State -->
        <div
          v-if="isLoading"
          class="flex flex-col items-center justify-center w-full rounded-3xl p-[18px] gap-6 bg-white"
        >
          <img
            src="@/assets/images/icons/loading.svg"
            class="size-[52px] animate-spin"
            alt="loading"
          />
          <p class="font-semibold text-monday-gray">Loading merchant details...</p>
        </div>
        <form
          @submit.prevent="handleSubmit"
          class="flex flex-col w-full rounded-3xl p-[18px] gap-5 bg-white"
        >
          <h2 class="font-semibold text-xl capitalize">Edit the form</h2>
          <div class="flex items-center justify-between w-full">
            <div
              class="group relative flex size-[100px] rounded-2xl overflow-hidden items-center justify-center bg-monday-background"
            >
              <img
                :src="imagePreview || form.photo"
                data-default="@/assets/images/icons/gallery-default.svg"
                class="size-full object-cover"
                alt="icon"
              />
              <input
                type="file"
                name="test"
                @change="onFileChange"
                accept="image/*"
                class="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            <div class="flex gap-4">
              <button
                type="button"
                @click.prevent="triggerFileInput"
                class="btn btn-black w-[152px] font-semibold text-nowrap"
              >
                Change Photo
              </button>
            </div>
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
              <span v-if="isSubmitting">Saving Changes...</span>
              <span v-else>Save Changes</span>
            </button>
          </div>
        </form>
        <div class="flex flex-col w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white">
          <p class="font-semibold">Quick Guide to Edit Merchant</p>
          <ul class="flex flex-col gap-4">
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Ensure merchant information is updated accurately to maintain data consistency
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Make sure the phone number is active to ensure seamless communication
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Verify the assigned keeper if there has been a change Lorem Ipsum
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Verify the warehouse address to ensure accurate inventory management
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Ensure you use a recent photo to Lorem maintain up-to-date
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
import { getMerchantById, updateMerchant, uploadMerchantImage } from '@/js/api/merchants'
import { getKeepers } from '@/js/api/users'

export default {
  name: 'EditMerchants',
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
    await this.fetchMerchantDetails()
    await this.fetchKeepers()
  },
  computed: {
    selectedKeeper() {
      if (!this.form.keeper_id) return null
      return this.keepers.find((keeper) => keeper.id == this.form.keeper_id)
    },
  },
  methods: {
    async fetchMerchantDetails() {
      const merchantId = this.$route.params.id
      try {
        const response = await getMerchantById(merchantId)
        this.form = response.data
        this.form = {
          name: response.data.name,
          phone: response.data.phone,
          keeper_id: response.data.keeper_id,
          address: response.data.address,
          photo: response.data.photo,
        }
      } catch (error) {
        console.error('Error fetching merchant details:', error)
        this.$router.push('/merchants')
      }
    },
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
        let photoUrl = this.form.photo
        // Upload photo if provided
        if (this.imagePreview) {
          try {
            const uploadResponse = await uploadMerchantImage(this.form.photo)
            photoUrl = uploadResponse.data.url || uploadResponse.data.photo
          } catch (uploadError) {
            console.error('Error uploading image:', uploadError)
            this.$router.push('/merchants')
            return
          }
        }

        // Prepare request data
        const requestData = {
          name: this.form.name,
          address: this.form.address,
          phone: this.form.phone,
          keeper_id: parseInt(this.form.keeper_id),
          photo: photoUrl || this.imagePreview || null,
        }

        const merchantId = this.$route.params.id

        // Call API to update merchant
        const response = await updateMerchant(merchantId, requestData)

        // Show success message
        alert('Merchant berhasil diupdate!')

        // Redirect to merchants list
        this.$router.push('/merchants')
      } catch (error) {
        console.error('Error updating merchant:', error)
        alert('Gagal mengupdate merchant. Silakan coba lagi.')
      } finally {
        this.isSubmitting = false
      }
    },
  },
}
</script>
