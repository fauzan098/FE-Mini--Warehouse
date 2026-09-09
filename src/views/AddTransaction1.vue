<template>
  <LayoutMerchant
    pageTitle="Add New Transaction"
    breadcrumb-text="Manage Transactions"
    breadcrumb-link="/transactions"
  >
    <main class="flex flex-col gap-6 flex-1">
      <div id="Steps" class="relative flex w-full h-[127px] rounded-3xl p-[18px] bg-white">
        <div class="relative flex flex-col w-full gap-3 items-center text-center">
          <img
            src="@/assets/images/icons/tick-square-blue.svg"
            class="size-8 flex shrink-0"
            alt="icon"
          />
          <div class="flex flex-col gap-1">
            <p class="font-medium text-monday-gray">Step 1</p>
            <p class="font-semibold text-lg">Customer Detail</p>
          </div>
        </div>
        <div
          class="absolute transform -translate-y-1/2 top-[34px] left-[21.6%] h-[3px] overflow-hidden w-1/4"
        >
          <img
            src="@/assets/images/icons/line-half-blue.svg"
            class="size-full object-cover object-center"
            alt="icon"
          />
        </div>
        <div class="relative flex flex-col w-full gap-3 items-center text-center">
          <img
            src="@/assets/images/icons/tick-square-grey.svg"
            class="size-8 flex shrink-0"
            alt="icon"
          />
          <div class="flex flex-col gap-1">
            <p class="font-medium text-monday-gray">Step 2</p>
            <p class="font-semibold text-lg">Assign Products</p>
          </div>
        </div>
        <div
          class="absolute transform -translate-y-1/2 top-[34px] right-[21.6%] h-[3px] overflow-hidden w-1/4"
        >
          <img
            src="@/assets/images/icons/Line-grey.svg"
            class="size-full object-cover object-center"
            alt="icon"
          />
        </div>
        <div class="relative flex flex-col w-full gap-3 items-center text-center">
          <img
            src="@/assets/images/icons/tick-square-grey.svg"
            class="size-8 flex shrink-0"
            alt="icon"
          />
          <div class="flex flex-col gap-1">
            <p class="font-medium text-monday-gray">Step 3</p>
            <p class="font-semibold text-lg">Review Transaction</p>
          </div>
        </div>
      </div>
      <div class="flex gap-6">
        <form
          @submit.prevent="handleSubmit"
          class="flex flex-col w-full rounded-3xl p-[18px] gap-5 bg-white"
        >
          <h2 class="font-semibold text-xl">Customer Informations</h2>
          <label class="group relative">
            <div
              class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border"
            >
              <img
                src="@/assets/images/icons/user-thin-grey.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
            </div>
            <p
              class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300"
            >
              Customer Name
            </p>
            <input
              type="text"
              v-model="formData.customerName"
              class="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300"
              placeholder=""
            />
          </label>
          <label class="group relative">
            <div
              class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border"
            >
              <img
                src="@/assets/images/icons/call-grey.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
            </div>
            <p
              class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300"
            >
              Phone Number
            </p>
            <input
              type="text"
              v-model="formData.phoneNumber"
              class="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300"
              placeholder=""
            />
          </label>
          <div class="flex items-center justify-end gap-4">
            <router-link to="/transactions" class="btn btn-red font-semibold"> Cancel </router-link>
            <button type="submit" class="btn btn-primary font-semibold" :disabled="!canSubmit">
              <span v-if="loading">Loading...</span>
              <span v-else>Continue</span>
            </button>
          </div>
        </form>
        <div class="flex w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white">
          <div v-if="loading" class="flex items-center justify-center w-full py-8">
            <div class="flex items-center gap-3">
              <img
                src="@/assets/images/icons/loading.svg"
                class="size-6 animate-spin"
                alt="loading"
              />
              <span class="font-semibold text-lg">Loading merchant...</span>
            </div>
          </div>
          <div v-else-if="selectedMerchant" class="flex items-center gap-3 w-full">
            <div
              class="flex size-16 rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
            >
              <img :src="selectedMerchant.photo" class="size-full object-contain" alt="merchant" />
            </div>
            <div class="flex flex-col gap-2 flex-1">
              <p class="font-semibold text-xl">{{ selectedMerchant.name }}</p>
              <p class="flex items-center gap-1 font-medium text-lg text-monday-gray">
                <img
                  src="@/assets/images/icons/call-grey.svg"
                  class="size-6 flex shrink-0"
                  alt="icon"
                />
                <span>{{ selectedMerchant.phone }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </LayoutMerchant>
</template>

<script setup>
import LayoutMerchant from '@/components/LayoutMerchant.vue'
import { getMerchants } from '@/js/api/merchants'
import { useAuthStore } from '@/stores/auth'
import { useTransactionStore } from '@/stores/transaction'
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const transactionStore = useTransactionStore()
const router = useRouter()

const selectedMerchant = ref(null)
const merchants = ref([])
const loading = ref(true)
const showEmptyState = ref(false)

const formData = reactive({
  customerName: transactionStore.customerInfo.customerName,
  phoneNumber: transactionStore.customerInfo.phoneNumber,
})

const isFormValid = computed(() => {
  return formData.customerName.trim() && formData.phoneNumber.trim() && selectedMerchant.value
})

const canSubmit = computed(() => {
  return !loading.value && isFormValid.value
})

const updateFormData = () => {
  transactionStore.setCustomerInfo({
    customerName: formData.customerName,
    phoneNumber: formData.phoneNumber,
    merchantId: selectedMerchant.value?.id || null,
    merchant: selectedMerchant.value,
  })
}

const fetchMerchants = async () => {
  try {
    loading.value = true

    const storedMerchantData = authStore.getMerchantData()

    if (storedMerchantData && storedMerchantData.length > 0) {
      merchants.value = storedMerchantData
      showEmptyState.value = false

      if (merchants.value.length > 0) {
        selectedMerchant.value = merchants.value[0]
        updateFormData()
      }

      loading.value = false
      return
    }

    const currentUser = authStore.currentUser

    if (!currentUser || !currentUser.id) {
      console.error('User not authenticated or user ID not found')
      showEmptyState.value = true
      return
    }

    const response = await getMerchants(`?keeper_id=${currentUser.id}`)

    if (response.data) {
      merchants.value = Array.isArray(response.data) ? response.data : [response.data]
      showEmptyState.value = merchants.value.length === 0

      if (merchants.value.length > 0) {
        selectedMerchant.value = merchants.value[0]
        updateFormData()
      }
    } else {
      showEmptyState.value = true
      merchants.value = []
    }
  } catch (error) {
    console.error('Error fetching merchants:', error)
    showEmptyState.value = true
    merchants.value = []
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  if (!formData.customerName.trim() || !formData.phoneNumber.trim()) {
    alert('Please fill in all required fields')
    return
  }

  if (!selectedMerchant.value) {
    alert('Please select a merchant')
    return
  }

  updateFormData()

  transactionStore.nextStep()
  router.push('/transaction/add-2')
}

onMounted(() => {
  transactionStore.loadFromLocalStorage()
  if (transactionStore.customerInfo.customerName) {
    formData.customerName = transactionStore.customerInfo.customerName
    formData.phoneNumber = transactionStore.customerInfo.phoneNumber
  }
  if (transactionStore.customerInfo.merchant) {
    selectedMerchant.value = transactionStore.customerInfo.merchant
  }
  fetchMerchants()
})
</script>
