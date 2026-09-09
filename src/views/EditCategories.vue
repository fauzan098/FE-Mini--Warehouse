<template>
  <Layout pageTitle="Edit Category" breadcrumb-text="Edit Category" breadcrumb-link="/categories">
    <main class="flex flex-col gap-6 flex-1">
      <!-- Loading State -->
      <div
        v-if="loading"
        class="flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6"
      >
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p class="font-semibold text-monday-gray">Memuat data kategori...</p>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-red-300 gap-6"
      >
        <img src="/src/assets/images/icons/close-circle-black.svg" class="size-[52px]" alt="icon" />
        <p class="font-semibold text-red-600">{{ error }}</p>
        <button @click="loadCategory" class="btn btn-primary font-semibold">Coba Lagi</button>
      </div>

      <div v-else class="flex gap-6">
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
                :src="imagePreview || getCategoryIcon(category.photo)"
                data-original="@/assets/images/icons/weight-black.svg"
                class="size-14 object-contain"
                alt="icon"
              />
              <input
                type="file"
                accept="image/*"
                @change="handleImageUpload"
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
            <div class="flex gap-4">
              <button
                type="button"
                @click="$refs.fileInput.click()"
                class="btn btn-black w-[152px] font-semibold text-nowrap"
              >
                {{ isUploading ? 'Uploading...' : 'Change Photo' }}
              </button>
              <div v-if="isUploading" class="w-[152px] bg-gray-200 rounded-full h-2">
                <div
                  class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  :style="{ width: uploadProgress + '%' }"
                ></div>
              </div>
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
            <router-link to="/categories" class="btn btn-red font-semibold"> Cancel </router-link>
            <button
              type="submit"
              class="btn btn-primary font-semibold"
              :disabled="isSubmitting || isUploading"
            >
              <span v-if="isUploading">Uploading Image...</span>
              <span v-else-if="isSubmitting">Menyimpan perubahan...</span>
              <span v-else>Simpan Perubahan</span>
            </button>
          </div>
        </form>
        <div class="flex flex-col w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white">
          <p class="font-semibold">Quick Guide to Edit Category</p>
          <ul class="flex flex-col gap-4">
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">Update the Category Name if Necessary</p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Ensure the Name is Still Relevant and Accurate Lorem Ipsum Simply text
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Verify the Image is Appropriate and Relevant Lorem Ipsum Color Text Mix
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Adjust the Parent Category if Needed for Accuracy Lorem Ipsum is Text Simply
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">Double-Check Everything Before Saving</p>
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
import { getCategoryById, updateCategory, uploadCategoryImage } from '@/js/api/products'

export default {
  components: {
    Layout,
    FormInput,
  },
  name: 'EditCategories',
  data() {
    return {
      category: {
        name: '',
        description: '',
        photo: '',
        id: null,
        count_product: 0,
      },
      form: {
        name: '',
        description: '',
        photo: '',
      },
      imagePreview: null,
      selectedFile: null,
      uploadProgress: 0,
      isSubmitting: false,
      isUploading: false,
      error: '',
      loading: false,
    }
  },
  async created() {
    await this.loadCategory()
  },
  methods: {
    async loadCategory() {
      const categoryId = this.$route.params.id
      if (!categoryId) {
        this.$router.push('/categories')
        return
      }

      this.loading = true
      this.error = ''

      try {
        const response = await getCategoryById(categoryId)
        const categoryData = response.data || response

        this.category = {
          name: categoryData.name || '',
          description: categoryData.tagline || '',
          photo: categoryData.photo || '',
          id: categoryData.id || null,
          count_product: categoryData.count_product || 0,
        }

        this.form = {
          name: this.category.name || '',
          description: this.category.description || '',
          photo: this.category.photo || '',
        }

        if (this.category.photo) {
          this.imagePreview = this.getCategoryIcon(this.category.photo)
        }
      } catch (error) {
        console.error('Error loading category:', error)
        this.error = error.message || 'Gagal memuat kategori'
      } finally {
        this.loading = false
      }
    },

    getCategoryIcon(iconName) {
      if (iconName && (iconName.startsWith('http://') || iconName.startsWith('https://'))) {
        return iconName
      }
    },

    handleImageUpload(event) {
      const file = event.target.files[0]

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

        const response = await uploadCategoryImage(this.selectedFile)
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
      if (!this.form.name || !this.form.description) {
        alert('Please fill in all required fields')
        return
      }

      this.isSubmitting = true

      try {
        let photoUrl = this.form.photo
        if (this.selectedFile) {
          photoUrl = await this.uploadCategoryImageToServer()
        }

        const categoryData = {
          name: this.form.name,
          tagline: this.form.description,
          photo: photoUrl,
        }

        const category = await updateCategory(this.category.id, categoryData)

        alert('Category updated successfully!')
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
