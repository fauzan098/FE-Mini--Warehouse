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
            src="@/assets/images/icons/tick-square-checked-blue.svg"
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
            src="@/assets/images/icons/Line-blue.svg"
            class="size-full object-cover object-center"
            alt="icon"
          />
        </div>
        <div class="relative flex flex-col w-full gap-3 items-center text-center">
          <img
            src="@/assets/images/icons/tick-square-checked-blue.svg"
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
            src="@/assets/images/icons/Line-blue.svg"
            class="size-full object-cover object-center"
            alt="icon"
          />
        </div>
        <div class="relative flex flex-col w-full gap-3 items-center text-center">
          <img
            src="@/assets/images/icons/tick-square-blue.svg"
            class="size-8 flex shrink-0"
            alt="icon"
          />
          <div class="flex flex-col gap-1">
            <p class="font-medium text-monday-gray">Step 3</p>
            <p class="font-semibold text-lg">Review Transaction</p>
          </div>
        </div>
      </div>
      <section id="Products" class="flex flex-col gap-6 rounded-3xl p-[18px] px-0">
        <div class="flex gap-6">
          <div class="flex flex-col w-full h-fit rounded-3xl p-[18px] gap-5 bg-white">
            <p class="font-semibold text-xl">Review Transaction</p>
            <div
              v-for="product in assignedProducts"
              :key="product.id"
              class="card flex flex-col w-full rounded-3xl border border-monday-border p-4 gap-5"
            >
              <div class="flex items-center justify-between gap-6">
                <div class="flex items-center gap-3 w-[316px] shrink-0">
                  <div
                    class="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
                  >
                    <img :src="product.image" class="size-full object-contain" alt="icon" />
                  </div>
                  <div class="flex flex-col gap-2 flex-1">
                    <p class="font-semibold text-xl w-[218px] truncate">{{ product.name }}</p>
                    <p class="price font-semibold text-xl text-monday-blue">
                      {{ product.price }}
                      <span class="text-monday-gray">({{ product.quantity }}x)</span>
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-[6px] w-fit shrink-0">
                  <img :src="product.categoryIcon" class="size-6 flex shrink-0" alt="icon" />
                  <p class="font-semibold text-lg text-nowrap">{{ product.category }}</p>
                </div>
              </div>
              <hr class="border-monday-border" />
              <div class="flex w-full items-center justify-between">
                <p class="flex items-center gap-1 font-medium text-monday-gray">
                  <img
                    src="@/assets/images/icons/money-grey.svg"
                    class="size-6 flex shrink-0"
                    alt="icon"
                  />
                  Subtotal
                </p>
                <p class="subtotal font-semibold text-xl text-monday-blue">
                  {{ product.subtotal }}
                </p>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-6 w-[392px] shrink-0">
            <div class="flex w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white">
              <div
                class="flex size-16 rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
              >
                <img
                  :src="customerInfo.merchant?.photo"
                  class="size-full object-contain"
                  alt="icon"
                />
              </div>
              <div class="flex flex-col gap-2 flex-1">
                <p class="font-semibold text-xl">{{ customerInfo.merchant?.name }}</p>
                <p class="flex items-center gap-1 font-medium text-lg text-monday-gray">
                  <img
                    src="@/assets/images/icons/call-grey.svg"
                    class="size-6 flex shrink-0"
                    alt="icon"
                  />
                  <span>{{ customerInfo.merchant?.phone }}</span>
                </p>
              </div>
            </div>
            <div class="flex flex-col w-full h-fit rounded-3xl p-[18px] gap-5 bg-white">
              <div class="flex flex-col gap-5">
                <p class="font-semibold text-lg">Customer Information</p>
                <div
                  class="flex items-center justify-between gap-3 rounded-2xl border border-monday-border p-4"
                >
                  <div class="flex flex-col gap-2 flex-1">
                    <p class="font-semibold text-lg">{{ customerInfo.customerName }}</p>
                    <p class="flex items-center gap-1 font-medium text-lg text-monday-gray">
                      <img
                        src="@/assets/images/icons/call-grey.svg"
                        class="size-6 flex shrink-0"
                        alt="icon"
                      />
                      <span>{{ customerInfo.phoneNumber }}</span>
                    </p>
                  </div>
                  <div
                    class="flex size-[56px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
                  >
                    <img
                      src="@/assets/images/icons/user-thin-grey.svg"
                      class="flex size-6 shrink-0"
                      alt="icon"
                    />
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-5">
                <p class="font-semibold text-lg">Payment Information</p>
                <div
                  class="flex flex-col w-full items-center justify-between gap-5 rounded-2xl border border-monday-border p-4"
                >
                  <div class="flex w-full items-center justify-between">
                    <p class="flex items-center gap-1 font-medium text-monday-gray">
                      <img
                        src="@/assets/images/icons/shopping-cart-grey.svg"
                        class="size-6 flex shrink-0"
                        alt="icon"
                      />
                      <span>Total Items</span>
                    </p>
                    <p class="font-semibold text-lg">{{ paymentInfo.totalItems }} Item</p>
                  </div>
                  <div class="flex w-full items-center justify-between">
                    <p class="flex items-center gap-1 font-medium text-monday-gray">
                      <img
                        src="@/assets/images/icons/box-grey.svg"
                        class="size-6 flex shrink-0"
                        alt="icon"
                      />
                      <span>Total Quantity</span>
                    </p>
                    <p class="font-semibold text-lg">{{ paymentInfo.totalQuantity }}x</p>
                  </div>
                  <div class="flex w-full items-center justify-between">
                    <p class="flex items-center gap-1 font-medium text-monday-gray">
                      <img
                        src="@/assets/images/icons/receipt-2-grey.svg"
                        class="size-6 flex shrink-0"
                        alt="icon"
                      />
                      <span>Subtotal</span>
                    </p>
                    <p class="font-semibold text-lg">{{ paymentInfo.subtotal }}</p>
                  </div>
                  <div class="flex w-full items-center justify-between">
                    <p class="flex items-center gap-1 font-medium text-monday-gray">
                      <img
                        src="@/assets/images/icons/note-text-grey.svg"
                        class="size-6 flex shrink-0"
                        alt="icon"
                      />
                      <span>PPN 10%</span>
                    </p>
                    <p class="font-semibold text-lg">{{ paymentInfo.ppn }}</p>
                  </div>
                  <hr class="border-monday-border w-full" />
                  <div class="flex w-full items-center justify-between">
                    <p class="flex items-center gap-1 font-medium text-monday-gray">
                      <img
                        src="@/assets/images/icons/moneys-grey.svg"
                        class="size-6 flex shrink-0"
                        alt="icon"
                      />
                      <span>Grand Total</span>
                    </p>
                    <p class="font-semibold text-xl text-monday-blue">
                      {{ paymentInfo.grandTotal }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <button @click="handleBack" class="btn btn-red font-semibold">Back</button>
                <button
                  @click="handleSaveData"
                  :disabled="isSaving"
                  :class="[
                    'btn font-semibold transition-all duration-300',
                    isSaving
                      ? 'btn-primary text-white cursor-not-allowed opacity-50'
                      : 'btn-primary hover:bg-monday-blue/90',
                  ]"
                >
                  {{ isSaving ? 'Saving...' : 'Save Data' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </LayoutMerchant>
</template>

<script setup>
import LayoutMerchant from '@/components/LayoutMerchant.vue'
import { createTransaction } from '@/js/api/transaction'
import { forceInitSnap, isSnapReady, openSnapPayment } from '@/js/midtrans'
import { useTransactionStore } from '@/stores/transaction'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const transactionStore = useTransactionStore()
const router = useRouter()

const isSaving = ref(false)

const customerInfo = computed(() => transactionStore.customerInfo)
const assignedProducts = computed(() => transactionStore.assignedProducts)

const paymentInfo = computed(() => {
  const totalItems = assignedProducts.value.length
  const totalQuantity = assignedProducts.value.reduce((sum, product) => sum + product.quantity, 0)

  // Calculate subtotal
  const subtotalAmount = assignedProducts.value.reduce((sum, product) => {
    const price = parseInt(product.price.replace(/[^\d]/g, ''))
    return sum + price * product.quantity
  }, 0)

  const subtotal = `Rp ${subtotalAmount.toLocaleString('id-ID')}`
  const ppnAmount = Math.round(subtotalAmount * 0.1)
  const ppn = `Rp ${ppnAmount.toLocaleString('id-ID')}`
  const grandTotal = `Rp ${(subtotalAmount + ppnAmount).toLocaleString('id-ID')}`

  return {
    totalItems,
    totalQuantity,
    subtotal,
    ppn,
    grandTotal,
    subtotalAmount,
    ppnAmount,
    grandTotalAmount: subtotalAmount + ppnAmount,
  }
})

onMounted(() => {
  transactionStore.loadFromLocalStorage()

  if (!transactionStore.isStep1Complete) {
    router.push('/transactions/add-1')
    return
  }

  if (!transactionStore.isStep2Complete) {
    router.push('/transactions/add-2')
    return
  }
})

const prepareTransactionData = () => {
  const products = assignedProducts.value.map((product) => ({
    product_id: product.product_id,
    quantity: product.quantity,
    price: parseInt(product.price.replace(/[^\d]/g, '')),
  }))

  const currentDomain = window.location.origin
  const callbackUrl = `${currentDomain}/payment/callback`

  return {
    name: customerInfo.value.customerName,
    phone: customerInfo.value.phoneNumber,
    email:
      customerInfo.value.email || customerInfo.value.merchant?.keeper_email || 'keeper@example.com', // Use keeper email as fallback
    address:
      customerInfo.value.address || customerInfo.value.merchant?.address || 'Merchant Address', // Use merchant address as fallback
    merchant_id: customerInfo.value.merchantId,
    products: products,
    callback_url: callbackUrl, // Add callback URL for Midtrans
  }
}

const handleSaveData = async () => {
  try {
    isSaving.value = true

    if (!isSnapReady()) {
      const forceInitResult = forceInitSnap()
      if (!forceInitResult) {
        throw new Error('Payment system not ready. Please refresh the page and try again.')
      }
    }

    // Prepare transaction data
    const transactionData = prepareTransactionData()

    // Call API to create transaction first
    const response = await createTransaction(transactionData)

    if (response.data && response.data.order_id && response.data.payment_token) {
      // Save transaction data for success page
      const fullTransactionData = {
        ...transactionData,
        order_id: response.data.order_id,
        payment_token: response.data.payment_token,
        timestamp: new Date().toISOString(),
        transactionId: generateTransactionId(),
      }

      localStorage.setItem('lastTransaction', JSON.stringify(fullTransactionData))

      // Clear transaction wizard data
      transactionStore.clearTransaction()

      // Open Midtrans Snap payment popup dengan payment_token
      openSnapPayment(response.data.payment_token, fullTransactionData)
    } else {
      throw new Error('Order ID or Payment Token not found in response')
    }
  } catch (error) {
    console.error('❌ Error saving draft:', error)
    alert('Failed to save draft. Please try again.')
  } finally {
    isSaving.value = false
  }
}

const handleBack = () => {
  transactionStore.previousStep()
  router.push('/transactions/add-2')
}

const generateTransactionId = () => {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 1000)
  return `TXN-${timestamp}-${random}`
}
</script>
