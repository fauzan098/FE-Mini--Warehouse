<template>
  <Layout pageTitle="Edit Warehouse" breadcrumb-text="Edit Warehouse" breadcrumb-link="/warehouses">
    <main class="flex flex-col gap-6 flex-1">
      <div class="flex gap-6">
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
                id="Thumbnail"
                :src="imagePreview || warehouse.photo"
                class="size-full object-contain"
                alt="icon"
              />
              <input
                type="file"
                ref="fileInput"
                @change="handleImageUpload"
                accept="image/*"
                class="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            <div class="flex flex-col gap-2">
              <button
                type="button"
                @click="$refs.fileInput.click()"
                class="btn btn-black w-[152px] font-semibold text-nowrap"
              >
                Change Photo
              </button>
              <div v-if="imageUploading" class="w-[152px] bg-gray-200 rounded-full h-2">
                <div
                  class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  :style="{ width: uploadProgress + '%' }"
                ></div>
              </div>

              <button
                v-if="selectedFile"
                type="button"
                @click="removeImage"
                class="btn btn-red w-[152px] font-semibold text-nowrap text-sm"
              >
                Remove Photo
              </button>
            </div>
            <input
              ref="fileInput"
              type="file"
              @change="handleImageUpload"
              accept="image/*"
              class="hidden"
            />
          </div>
          <FormInput
            v-model="form.name"
            label="Warehouse Name"
            icon="@/assets/images/icons/buildings-2-grey.svg"
            required="true"
          />
          <FormInput
            v-model="form.phone"
            label="Phone Number"
            icon="@/assets/images/icons/call-grey.svg"
            required="true"
            type="tel"
          />
          <FormTextarea
            v-model="form.address"
            label="Warehouse Address"
            icon="@/assets/images/icons/location-grey.svg"
            required="true"
          />
          <div class="flex items-center justify-end gap-4">
            <router-link to="/warehouses" class="btn btn-red font-semibold"> Cancel </router-link>
            <button
              type="submit"
              class="btn btn-primary font-semibold"
              :disabled="isSubmitting || imageUploading"
            >
              <span v-if="imageUploading">Uploading Image...</span>
              <span v-else-if="isSubmitting">Updating Warehouse...</span>
              <span v-else>Save Changes</span>
            </button>
          </div>
        </form>
        <div class="flex flex-col w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white">
          <p class="font-semibold">Quick Guide to Edit Warehouse</p>
          <ul class="flex flex-col gap-4">
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Update the Warehouse Name if Lorem Necessary Ipsum Dummy
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Verify and Update the Contact Phone Number text Lorem Ipsum
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Ensure the Warehouse Address is Correct and Complete Color det amet
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Replace the Warehouse Image if Needed for Accuracy Lorem Ipsum
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">Double-Check Everything Lorem Ipsum</p>
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
import FormTextarea from '@/components/FormTextarea.vue'
import { getWarehouseById, updateWarehouse, uploadWarehouseImage } from '@/js/api/warehouse'

export default {
  name: 'EditWarehouses',
  components: {
    Layout,
    FormInput,
    FormTextarea,
  },
  data() {
    return {
      warehouse: {
        id: null,
        name: '',
        phone: '',
        address: '',
        photo: '',
        count_product: 0,
      },
      form: {
        name: '',
        phone: '',
        address: '',
        photo: '',
      },
      imagePreview: null,
      imageUploading: false,
      uploadProgress: 0,
      error: '',
      selectedFile: null,
      isSubmitting: false,
    }
  },
  async created() {
    await this.loadWarehouse()
  },
  methods: {
    async loadWarehouse() {
      const warehouseId = this.$route.params.id

      try {
        const response = await getWarehouseById(warehouseId)

        // Update warehouse data
        this.warehouse = response.data
        this.form = {
          name: response.data.name,
          phone: response.data.phone,
          address: response.data.address,
          photo: response.data.photo,
        }
      } catch (error) {
        console.error('Error loading warehouse:', error)
        this.$router.push('/warehouses')
      }
    },

    handleImageUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.selectedFile = file

        // Create preview
        const reader = new FileReader()
        reader.onload = (e) => {
          this.imagePreview = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },

    removeImage() {
      this.imagePreview = null
      this.selectedFile = null
      this.form.photo = ''
      this.error = ''
    },

    async uploadWarehouseImageToServer() {
      if (!this.selectedFile) {
        return this.form.photo
      }

      this.imageUploading = true
      this.uploadProgress = 0

      try {
        // Simulate upload progress
        const progressInterval = setInterval(() => {
          if (this.uploadProgress < 90) {
            this.uploadProgress += 10
          }
        }, 100)

        const response = await uploadWarehouseImage(this.selectedFile)
        const imageUrl = response.data?.url || response.url

        clearInterval(progressInterval)
        this.uploadProgress = 100

        if (!imageUrl) {
          throw new Error('URL gambar tidak valid dari server')
        }

        return (this.form.photo = imageUrl)
      } catch (uploadError) {
        console.error('Error uploading image:', uploadError)
        throw new Error(`Gagal mengupload gambar: ${uploadError.message}`)
      } finally {
        this.imageUploading = false
        this.uploadProgress = 0
      }
    },

    async handleSubmit() {
      if (!this.form.name || !this.form.phone || !this.form.address) {
        alert('Please fill in all required fields')
        return
      }

      this.isSubmitting = true

      try {
        await this.uploadWarehouseImageToServer()

        const warehouseData = {
          name: this.form.name,
          phone: this.form.phone,
          address: this.form.address,
          photo: this.form.photo,
        }

        const response = await updateWarehouse(this.warehouse.id, warehouseData)
        alert('Warehouse updated successfully!')
        this.$router.push('/warehouses')
      } catch (error) {
        console.error('Error submitting form:', error)
        alert(`Gagal memperbarui gudang: ${error.message}`)
      } finally {
        this.isSubmitting = false
      }
    },
  },
}
</script>
