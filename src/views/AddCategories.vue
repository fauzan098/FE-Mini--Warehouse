<template>
  <Layout pageTitle="Add Category" breadcrumb-text="Add Category" breadcrumb-link="/categories">
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
                :src="imagePreview || '/src/assets/images/icons/gallery-grey.svg'"
                data-default="@/assets/images/icons/gallery-grey.svg"
                class="size-14 object-contain"
                alt="icon"
              />
              <input
                type="file"
                @change="handleImageUpload"
                accept="image/*"
                class="absolute inset-0 opacity-0 cursor-pointer"
              />

              <div
                v-if="isUploading"
                class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
              >
                <div class="text-white text-center">
                  <div
                    class="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto mb-2"
                  ></div>
                  <p class="text-xs">{{ uploadProgress }}%</p>
                </div>
              </div>
            </div>
            <button
              type="button"
              @click="$refs.fileInput.click()"
              class="btn btn-black w-[152px] font-semibold text-nowrap"
              :disabled="isUploading"
            >
              {{ isUploading ? 'Uploading...' : 'Add Photo' }}
            </button>

            <div v-if="isUploading" class="w-[152px] bg-gray-200 rounded-full h-2">
              <div
                class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                :style="{ width: uploadProgress + '%' }"
              ></div>
            </div>
          </div>
          <FormInput
            v-model="form.name"
            label="Category Name"
            icon="@/assets/images/icons/note-2-grey.svg"
            required="true"
          />
          <FormInput
            v-model="form.description"
            label="Category Tagline"
            icon="@/assets/images/icons/document-grey.svg"
            required="true"
          />
          <div class="flex items-center justify-end gap-4">
            <router-link
              to="/categories"
              class="btn btn-red font-semibold"
              :disabled="isSubmitting || isUploading"
            >
              Cancel
            </router-link>
            <button
              type="submit"
              class="btn btn-primary font-semibold"
              :disabled="isSubmitting || isUploading || !selectedFile"
            >
              <span v-if="isUploading">Uploading Image...</span>
              <span v-else-if="isSubmitting">Creating Category...</span>
              <span v-else>Create Now</span>
            </button>
          </div>
        </form>
        <div class="flex flex-col w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white">
          <p class="font-semibold">Quick Guide to Add New Category</p>
          <ul class="flex flex-col gap-4">
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Ensure the Category Name is Relevant and Clear Lorem Ipsum
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Verify the Image is Appropriate and High-Quality Lorem Ipsum
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Choose a User-Friendly and Clear Tagline Lorem Ipsum simply
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Check for Duplicates to Avoid Lorem Redundancy Lorem Ipsum
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">Preview the Category Carefully</p>
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
import { createCategory, uploadCategoryImage } from '@/js/api/products'

export default {
  name: 'AddCategories',
  components: {
    Layout,
    FormInput,
  },
  data() {
    return {
      form: {
        name: '',
        description: '',
        icon_url: '',
      },
      imagePreview: null,
      selectedFile: null,
      uploadProgress: 0,
      isSubmitting: false,
      isUploading: false,
    }
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0]
      if (!file) return

      // Validate file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        error.value = 'Ukuran file terlalu besar. Maksimal 2MB.'
        return
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        error.value = 'File harus berupa gambar.'
        return
      }

      this.selectedFile = file

      // Show preview immediately
      const reader = new FileReader()
      reader.onload = (e) => {
        this.imagePreview = e.target.result
      }
      reader.readAsDataURL(file)
    },

    async uploadCategoryImageToServer() {
      if (!this.selectedFile) {
        throw new Error('Tidak ada gambar yang dipilih')
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

        const response = await uploadCategoryImage(this.selectedFile)
        const imageUrl = response.data?.url || response.url

        clearInterval(progressInterval)
        this.uploadProgress = 100

        if (!imageUrl) {
          throw new Error('URL gambar tidak valid dari server')
        }

        return (this.form.icon_url = imageUrl)
      } catch (uploadError) {
        console.error('Error uploading image:', uploadError)
        throw new Error(`Gagal mengupload gambar: ${uploadError.message}`)
      } finally {
        this.imageUploading = false
        this.uploadProgress = 0
      }
    },

    async handleSubmit() {
      if (!this.form.name || !this.form.description) {
        alert('Please fill in all required fields')
        return
      }

      if (!this.selectedFile) {
        alert('Please select an image for the category')
        return
      }

      this.isSubmitting = true

      try {
        await this.uploadCategoryImageToServer()

        const categoryData = {
          name: this.form.name,
          tagline: this.form.description,
          photo: this.form.icon_url,
        }

        const category = await createCategory(categoryData)

        alert('Category created successfully!')
        this.$router.push('/categories')
      } catch (error) {
        console.error('Error submitting form:', error)
        alert(`Gagal membuat kategori: ${error.message}`)
      } finally {
        this.isSubmitting = false
      }
    },
  },
}
</script>
