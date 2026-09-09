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
            src="@/assets/images/icons/tick-square-blue.svg"
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
            <p class="font-medium text-monday-gray">Step 3</p>
            <p class="font-semibold text-lg">Review Transaction</p>
          </div>
        </div>
      </div>

      <section id="Products" class="flex flex-col flex-1 gap-6 rounded-3xl p-[18px] px-0 bg-white">
        <div id="Header" class="flex items-center justify-between px-[18px]">
          <div class="flex flex-col gap-[6px]">
            <p class="flex items-center gap-[6px]">
              <img
                src="@/assets/images/icons/shopping-cart-black.svg"
                class="size-6 flex shrink-0"
                alt="icon"
              />
              <span class="font-semibold text-2xl">{{ totalItems }} Total Items</span>
            </p>
            <p class="font-semibold text-lg text-monday-gray">Manage Your Product Assigned</p>
            <p
              v-if="getAvailableProductsCount() < availableProducts.length"
              class="text-sm text-red-600 font-medium"
            >
              ⚠️ {{ availableProducts.length - getAvailableProductsCount() }} produk merchant ini
              stoknya habis
            </p>
          </div>
          <div class="flex items-center gap-3">
            <button
              @click="openBarcodeScanner"
              class="btn bg-monday-blue/10 text-monday-blue font-semibold rounded-full"
            >
              <img
                src="@/assets/images/icons/barcode-black.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              Scan Barcode
            </button>
            <button @click="openAssignModal" class="btn btn-primary font-semibold">
              Assign Product
              <img
                src="@/assets/images/icons/add-square-white.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
            </button>
          </div>
        </div>
        <hr class="border-monday-border" />
        <div id="Product-List" class="flex flex-col px-4 gap-5 flex-1">
          <div class="flex items-center justify-between">
            <p class="font-semibold text-xl">Product Assigned</p>
          </div>
          <div v-if="assignedProducts.length > 0" class="flex flex-col gap-5">
            <div
              v-for="(product, index) in assignedProducts"
              :key="product.id"
              class="card flex items-center justify-between gap-6"
            >
              <div class="flex items-center gap-3 w-[340px] shrink-0">
                <div
                  class="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
                >
                  <img :src="product.image" class="size-full object-contain" alt="icon" />
                </div>
                <div class="flex flex-col gap-2 flex-1">
                  <p class="font-semibold text-xl w-[242px] truncate">{{ product.name }}</p>
                  <p class="font-semibold text-xl text-monday-blue">
                    {{ product.price }}
                    <span class="text-monday-gray">({{ product.quantity }}x)</span>
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-[6px] w-[187px] shrink-0">
                <img :src="product.categoryIcon" class="size-6 flex shrink-0" alt="icon" />
                <p class="font-semibold text-lg text-nowrap w-[124px] truncate">
                  {{ product.category }}
                </p>
              </div>
              <div class="flex flex-col gap-2 w-[187px] shrink-0">
                <p class="flex items-center gap-1 font-medium text-monday-gray">
                  <img
                    src="@/assets/images/icons/money-grey.svg"
                    class="size-4 flex shrink-0"
                    alt="icon"
                  />
                  Subtotal
                </p>
                <p class="font-semibold text-xl text-monday-blue">{{ product.subtotal }}</p>
              </div>
              <div class="flex items-center gap-4">
                <button
                  @click="removeProduct(product.id)"
                  class="btn bg-monday-red/10 rounded-2xl text-monday-red w-[146px] font-semibold"
                >
                  <img src="@/assets/images/icons/trash-red.svg" class="size-6" alt="icon" />
                  Remove
                </button>
              </div>
            </div>
          </div>
          <div
            v-else
            class="flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6"
          >
            <img
              src="@/assets/images/icons/document-text-grey.svg"
              class="size-[52px]"
              alt="icon"
            />
            <p class="font-semibold text-monday-gray">Oops, it looks like there's no data yet.</p>
          </div>
          <div class="flex items-center justify-between px-[18px] py-4">
            <button @click="handleBack" class="btn btn-red font-semibold">Back</button>
            <div class="flex items-center gap-4">
              <div class="flex flex-col items-end">
                <p class="font-semibold text-lg">Total Amount</p>
                <p class="font-bold text-xl text-monday-blue">{{ formattedTotalAmount }}</p>
              </div>
              <button
                @click="handleContinue"
                :disabled="!transactionStore.isStep2Complete"
                :class="[
                  'btn font-semibold transition-all duration-300',
                  transactionStore.isStep2Complete
                    ? 'btn-primary hover:bg-monday-blue/90'
                    : 'btn-primary text-white cursor-not-allowed opacity-50',
                ]"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
    <div
      v-if="showAssignModal"
      class="modal flex flex-1 items-center justify-center h-full fixed top w-full z-50 left-0"
    >
      <div @click="closeAssignModal" class="backdrop absolute w-full h-full bg-[#292D32B2]"></div>
      <div
        class="relative flex flex-col flex-1 w-full max-w-[1200px] h-full max-h-[752px] shrink-0 rounded-3xl p-[18px] gap-5 bg-white"
      >
        <div class="modal-header flex items-center justify-between">
          <div class="flex flex-col gap-1">
            <p class="font-semibold text-xl">Assign Products</p>
            <p class="text-sm text-monday-gray">
              {{ getAvailableProductsCount() }} dari {{ availableProducts.length }} produk tersedia
              <span
                v-if="getAvailableProductsCount() < availableProducts.length"
                class="text-red-500"
              >
                ({{ availableProducts.length - getAvailableProductsCount() }} produk stok habis)
              </span>
            </p>
          </div>
          <button
            @click="closeAssignModal"
            class="flex size-14 rounded-full items-center justify-center bg-monday-gray-background"
          >
            <img src="@/assets/images/icons/close-circle-black.svg" class="size-6" alt="icon" />
          </button>
        </div>
        <div class="modal-content flex flex-1 overflow-y-auto overscroll-contain hide-scrollbar">
          <div class="flex flex-col gap-5 w-full">
            <!-- Loading State -->
            <div v-if="loadingProducts" class="flex justify-center items-center py-12">
              <div class="flex items-center gap-3">
                <img
                  src="@/assets/images/icons/loading.svg"
                  class="size-6 animate-spin"
                  alt="loading"
                />
                <span class="font-semibold text-lg">Loading products...</span>
              </div>
            </div>

            <!-- Empty State -->
            <div
              v-else-if="availableProducts.length === 0"
              class="flex flex-col items-center justify-center py-12 gap-3"
            >
              <img
                src="@/assets/images/icons/document-text-grey.svg"
                class="size-[52px]"
                alt="icon"
              />
              <p class="font-semibold text-monday-gray">No products available for this merchant.</p>
            </div>

            <!-- Stock Warning -->
            <div
              v-else-if="getAvailableProductsCount() === 0"
              class="flex flex-col items-center justify-center py-12 gap-3"
            >
              <img src="@/assets/images/icons/trash-red.svg" class="size-[52px]" alt="icon" />
              <p class="font-semibold text-red-600">Semua produk merchant ini stoknya habis.</p>
              <p class="text-monday-gray text-center">
                Silakan update stok produk terlebih dahulu sebelum melakukan transaksi.
              </p>
            </div>

            <!-- Products List -->
            <div
              v-else
              v-for="product in availableProducts"
              :key="product.id"
              class="card-assign flex flex-col rounded-3xl border border-monday-border p-4 gap-5"
              :class="{ 'opacity-50': product.stock <= 0 }"
            >
              <div class="flex items-center justify-between gap-6">
                <div class="flex items-center gap-3 w-[270px] shrink-0">
                  <div
                    class="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
                  >
                    <img :src="product.image" class="size-full object-contain" alt="icon" />
                  </div>
                  <div class="flex flex-col gap-2 flex-1">
                    <p class="font-semibold text-xl w-[172px] truncate">{{ product.name }}</p>
                    <p class="price font-semibold text-xl text-monday-blue">
                      {{ product.price }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-[6px] w-[154px] shrink-0">
                  <img :src="product.categoryIcon" class="size-6 flex shrink-0" alt="icon" />
                  <p class="font-semibold text-lg text-nowrap w-[124px] truncate">
                    {{ product.category }}
                  </p>
                </div>
                <div class="flex items-center gap-[6px] w-[154px] shrink-0">
                  <img
                    src="@/assets/images/icons/box-black.svg"
                    class="size-6 flex shrink-0"
                    alt="icon"
                  />
                  <p
                    class="stock font-semibold text-lg text-nowrap w-[124px] truncate"
                    :class="{ 'text-red-500': product.stock <= 0 }"
                  >
                    {{ product.stock }} Stock
                    <span v-if="product.stock <= 0" class="text-red-500 font-bold">(Habis)</span>
                  </p>
                </div>
                <div
                  class="flex items-center rounded-2xl p-4 gap-3"
                  :class="
                    product.stock <= 0
                      ? 'bg-gray-200 text-gray-500'
                      : 'bg-monday-blue/10 text-monday-blue'
                  "
                >
                  <button
                    @click="decreaseQuantity(product.id)"
                    type="button"
                    class="minus flex size-6 shrink-0"
                    :disabled="product.stock <= 0"
                  >
                    <img
                      src="@/assets/images/icons/minus-square-blue.svg"
                      class="size-6"
                      :class="{ 'opacity-50': product.stock <= 0 }"
                      alt="icon"
                    />
                  </button>
                  <p class="amount min-w-12 font-medium text-[22px] text-center">
                    {{ product.selectedQuantity || 0 }}
                  </p>
                  <button
                    @click="increaseQuantity(product.id)"
                    type="button"
                    class="plus flex size-6 shrink-0"
                    :disabled="product.stock <= 0"
                  >
                    <img
                      src="@/assets/images/icons/add-square-blue-fill.svg"
                      class="size-6"
                      :class="{ 'opacity-50': product.stock <= 0 }"
                      alt="icon"
                    />
                  </button>
                </div>
              </div>
              <hr class="border-monday-border" />
              <div class="flex items-center justify-between">
                <p class="flex items-center gap-1 font-semibold text-monday-gray">
                  <img
                    src="@/assets/images/icons/money-grey.svg"
                    class="size-6 flex shrink-0"
                    alt="icon"
                  />
                  Subtotal:
                </p>
                <p class="subtotal font-semibold text-xl text-monday-blue">
                  {{ getSubtotal(product) }}
                </p>
              </div>
              <!-- Warning message for out of stock products -->
              <div
                v-if="product.stock <= 0"
                class="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl"
              >
                <img src="@/assets/images/icons/trash-red.svg" class="size-5" alt="warning" />
                <p class="font-medium text-red-600 text-sm">
                  Produk ini tidak tersedia karena stok habis
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-end gap-4">
          <button @click="closeAssignModal" class="btn btn-red font-semibold">Cancel</button>
          <button @click="addToCart" class="btn btn-primary font-semibold">Add to Cart</button>
        </div>
      </div>
    </div>

    <div
      v-if="showBarcodeScanner"
      class="modal flex flex-1 items-center justify-center h-full fixed top w-full z-50 left-0"
    >
      <div
        @click="closeBarcodeScanner"
        class="backdrop absolute w-full h-full bg-[#292D32B2]"
      ></div>
      <div
        class="relative flex flex-col w-full max-w-[800px] max-h-[90vh] rounded-3xl p-[18px] gap-5 bg-white overflow-hidden"
      >
        <div class="modal-header flex items-center justify-between shrink-0">
          <p class="font-semibold text-xl">Scan Barcode Product</p>
          <button
            @click="closeBarcodeScanner"
            class="flex size-14 rounded-full items-center justify-center bg-monday-gray-background"
          >
            <img src="@/assets/images/icons/close-circle-black.svg" class="size-6" alt="icon" />
          </button>
        </div>

        <div class="modal-content flex flex-1 flex-col items-center gap-6 overflow-y-auto pb-4">
          <!-- Scanner Container - Hide when product is found -->
          <div
            v-if="!scannedProduct && scannerStatus !== 'error'"
            class="scanner-container relative w-full max-w-[500px] h-[300px] rounded-2xl overflow-hidden border-2 border-monday-blue"
          >
            <div id="barcode-scanner" class="w-full h-full"></div>

            <!-- Scanner Status Overlay -->
            <div
              v-if="scannerStatus === 'starting'"
              class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <div class="text-center text-white">
                <img
                  src="@/assets/images/icons/loading.svg"
                  class="size-8 animate-spin mx-auto mb-2"
                  alt="loading"
                />
                <p class="font-semibold">Memulai Scanner...</p>
              </div>
            </div>

            <div
              v-if="scannerStatus === 'error'"
              class="absolute inset-0 bg-red-500 bg-opacity-50 flex items-center justify-center"
            >
              <div class="text-center text-white">
                <p class="font-semibold mb-2">Scanner Error</p>
                <p class="text-sm mb-3">Gunakan input manual di bawah</p>
                <button @click="startBarcodeScanner" class="btn btn-white text-sm">
                  Coba Lagi
                </button>
              </div>
            </div>

            <!-- Scanner Overlay -->
            <div
              v-if="scannerStatus === 'active'"
              class="absolute inset-0 flex items-center justify-center"
            >
              <div
                class="scanner-frame w-[200px] h-[100px] border-2 border-white rounded-lg relative"
              >
                <div
                  class="scanner-corner top-0 left-0 w-6 h-6 border-l-4 border-t-4 border-monday-blue"
                ></div>
                <div
                  class="scanner-corner top-0 right-0 w-6 h-6 border-r-4 border-t-4 border-monday-blue"
                ></div>
                <div
                  class="scanner-corner bottom-0 left-0 w-6 h-6 border-l-4 border-b-4 border-monday-blue"
                ></div>
                <div
                  class="scanner-corner bottom-0 right-0 w-6 h-6 border-r-4 border-b-4 border-monday-blue"
                ></div>
              </div>
            </div>
          </div>

          <!-- Instructions - Hide when product is found -->
          <div v-if="!scannedProduct" class="text-center">
            <!-- Error Message -->
            <div
              v-if="scannerStatus === 'error'"
              class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
            >
              <p class="text-red-700 font-medium">⚠️ Scanner tidak tersedia</p>
              <p class="text-red-600 text-sm">
                Silakan gunakan input manual atau tombol test di bawah
              </p>
            </div>
            <p class="font-semibold text-lg text-monday-blue mb-2">Posisikan barcode dalam kotak</p>
            <p class="text-monday-gray">Scanner akan otomatis mendeteksi barcode produk</p>
            <div class="mt-3 p-3 bg-blue-50 rounded-lg">
              <p class="text-sm font-medium text-blue-800 mb-2">💡 Tips Scanning:</p>
              <ul class="text-xs text-blue-700 text-left space-y-1">
                <li>• Pastikan barcode dalam kotak scanner</li>
                <li>• Jaga jarak 10-20 cm dari kamera</li>
                <li>• Pastikan pencahayaan cukup</li>
                <li>• Hindari bayangan pada barcode</li>
                <li>• Untuk barcode "SWP-0012345", gunakan tombol test di bawah</li>
              </ul>
            </div>
            <p class="text-xs text-gray-500 mt-2">
              Status: {{ scannerStatus }} | Kamera:
              {{ scannerStatus === 'active' ? 'Aktif' : 'Tidak Aktif' }}
              <span v-if="scannerStatus === 'error'" class="text-red-500"
                >(Coba refresh halaman)</span
              >
            </p>
          </div>

          <!-- Manual Input -->
          <div class="w-full max-w-[400px]">
            <div class="flex items-center gap-3">
              <input
                v-model="manualBarcode"
                type="text"
                placeholder="Atau masukkan kode barcode manual"
                class="flex-1 px-4 py-3 rounded-2xl border border-monday-border focus:outline-none focus:border-monday-blue"
                @keyup.enter="() => searchProductByBarcode()"
                :disabled="scanningProduct"
              />
              <button
                @click="searchProductByBarcode"
                class="btn btn-primary font-semibold px-6"
                :disabled="!manualBarcode.trim() || scanningProduct"
              >
                <span v-if="scanningProduct">
                  <img
                    src="@/assets/images/icons/loading.svg"
                    class="size-4 animate-spin inline mr-2"
                    alt="loading"
                  />
                  Mencari...
                </span>
                <span v-else>Cari</span>
              </button>
            </div>

            <!-- Test Buttons -->
            <div class="mt-3 flex gap-2">
              <button
                @click="
                  () => {
                    manualBarcode = 'SWP-0012345'
                    searchProductByBarcode()
                  }
                "
                class="text-xs px-3 py-1 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors font-medium"
                :disabled="scanningProduct"
              >
                Test SWP-0012345
              </button>
              <button
                @click="
                  () => {
                    manualBarcode = '123456789'
                    searchProductByBarcode()
                  }
                "
                class="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                :disabled="scanningProduct"
              >
                Test Barcode 1
              </button>
              <button
                @click="
                  () => {
                    manualBarcode = '987654321'
                    searchProductByBarcode()
                  }
                "
                class="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                :disabled="scanningProduct"
              >
                Test Barcode 2
              </button>
            </div>
          </div>

          <!-- Scan History -->
          <div v-if="scanHistory.length > 0" class="w-full max-w-[500px]">
            <div class="bg-gray-50 rounded-2xl p-4">
              <div class="flex items-center justify-between mb-3">
                <p class="font-semibold text-sm text-monday-gray">Riwayat Scan Terakhir:</p>
                <button
                  @click="clearScanHistory"
                  class="text-xs text-red-500 hover:text-red-700"
                  title="Hapus riwayat"
                >
                  Hapus
                </button>
              </div>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="(record, index) in scanHistory.slice(0, 5)"
                  :key="index"
                  @click="
                    () => {
                      manualBarcode = record.barcode
                      searchProductByBarcode()
                    }
                  "
                  class="px-3 py-1 bg-white border border-monday-border rounded-lg text-xs hover:bg-monday-blue/10 transition-colors"
                  :title="`${record.productName} - ${new Date(record.timestamp).toLocaleString('id-ID')}`"
                >
                  {{ record.barcode }}
                </button>
              </div>
            </div>
          </div>

          <!-- Scan Result -->
          <div
            v-if="scannedProduct"
            class="w-full max-w-[500px] rounded-2xl p-4 border"
            :class="
              scannedProduct.stock <= 0
                ? 'bg-red-50 border-red-200'
                : 'bg-monday-blue/5 border-monday-blue/20'
            "
          >
            <!-- Scan Again Button -->
            <div class="mb-3 flex justify-end">
              <button
                @click="
                  () => {
                    scannedProduct = null
                    scanError = ''
                    // Restart scanner
                    setTimeout(() => {
                      if (showBarcodeScanner.value) {
                        startBarcodeScanner()
                      }
                    }, 100)
                  }
                "
                class="text-sm text-monday-blue hover:text-monday-blue/80 font-medium"
              >
                ← Scan Lagi
              </button>
            </div>
            <!-- Barcode Info -->
            <div class="mb-3 p-2 bg-green-50 border border-green-200 rounded-lg">
              <p class="text-sm text-green-700 font-medium">
                <img
                  src="@/assets/images/icons/barcode-black.svg"
                  class="size-4 inline mr-1"
                  alt="barcode"
                />
                Barcode: <strong>{{ scannedProduct.barcode }}</strong>
              </p>
            </div>
            <div class="flex items-center gap-4">
              <div
                class="flex size-16 rounded-xl bg-monday-background items-center justify-center overflow-hidden"
              >
                <img :src="scannedProduct.image" class="size-full object-contain" alt="product" />
              </div>
              <div class="flex flex-col gap-2 flex-1">
                <p class="font-semibold text-lg">{{ scannedProduct.name }}</p>
                <p class="font-semibold text-monday-blue">{{ scannedProduct.price }}</p>
                <p
                  class="text-sm"
                  :class="
                    scannedProduct.stock <= 0 ? 'text-red-600 font-semibold' : 'text-monday-gray'
                  "
                >
                  Stock: {{ scannedProduct.stock }}
                  <span v-if="scannedProduct.stock <= 0" class="text-red-600 font-bold"
                    >(Habis)</span
                  >
                </p>
                <p class="text-xs text-monday-gray">
                  <img
                    src="@/assets/images/icons/buildings-2-grey.svg"
                    class="size-3 inline mr-1"
                    alt="warehouse"
                  />
                  {{ scannedProduct.warehouse_name }}
                </p>
              </div>
              <button
                @click="addScannedProduct"
                class="btn font-semibold"
                :class="
                  scannedProduct.stock <= 0
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'btn-primary'
                "
                :disabled="scannedProduct.stock <= 0"
              >
                {{ scannedProduct.stock <= 0 ? 'Stok Habis' : 'Tambah' }}
              </button>
            </div>
            <!-- Warning for out of stock -->
            <div
              v-if="scannedProduct.stock <= 0"
              class="mt-3 p-2 bg-red-100 border border-red-300 rounded-lg"
            >
              <p class="text-red-700 text-sm font-medium">
                ⚠️ Produk ini tidak tersedia karena stok habis
              </p>
            </div>
            <!-- Product details -->
            <div v-if="scannedProduct.product_about" class="mt-3 p-3 bg-gray-50 rounded-lg">
              <p class="text-sm text-monday-gray">
                <strong>Deskripsi:</strong> {{ scannedProduct.product_about }}
              </p>
            </div>
          </div>

          <!-- Error Message -->
          <div
            v-if="scanError"
            class="w-full max-w-[500px] bg-monday-red/10 rounded-2xl p-4 border border-monday-red/20"
          >
            <p class="font-semibold text-monday-red text-center">{{ scanError }}</p>
          </div>
        </div>

        <div
          class="flex items-center justify-end gap-4 shrink-0 pt-4 border-t border-monday-border"
        >
          <button @click="closeBarcodeScanner" class="btn btn-red font-semibold">Tutup</button>
        </div>
      </div>
    </div>
  </LayoutMerchant>
</template>
<script setup>
import LayoutMerchant from '@/components/LayoutMerchant.vue'
import { getMerchantProductByBarcode, getMerchantProducts } from '@/js/api/merchants'
import { useTransactionStore } from '@/stores/transaction'
import Quagga from 'quagga'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const transactionStore = useTransactionStore()
const router = useRouter()

const customerInfo = computed(() => transactionStore.customerInfo)
const assignedProducts = computed(() => transactionStore.assignedProducts)

const showAssignModal = ref(false)
const showBarcodeScanner = ref(false)
const loadingProducts = ref(false)

const manualBarcode = ref('')
const scannedProduct = ref(null)
const scanError = ref('')
const scanningProduct = ref(false)
const scanHistory = ref([])
const scannerStatus = ref('idle')

const availableProducts = ref([])

const totalItems = computed(() => transactionStore.totalItems)
const totalAmount = computed(() => transactionStore.totalAmount)
const formattedTotalAmount = computed(() => `Rp ${totalAmount.value.toLocaleString('id-ID')}`)

const fetchMerchantProducts = async () => {
  try {
    loadingProducts.value = true

    const response = await getMerchantProducts(`?merchant_id=${customerInfo.value.merchantId}`)

    if (response.data) {
      const products = Array.isArray(response.data.merchant_products)
        ? response.data.merchant_products
        : [response.data.merchant_products]
      availableProducts.value = products.map((product) => ({
        id: product.id,
        product_id: product.product_id,
        name: product.product_name,
        price: `Rp ${formatPrice(product.product_price)}`,
        stock: product.stock,
        category: product.product_category,
        categoryIcon: product.product_category_photo,
        image: product.product_photo,
        selectedQuantity: 0,
        // Additional data from API
        product_about: product.product_about,
        warehouse_name: product.warehouse_name,
        warehouse_phone: product.warehouse_phone,
        // Add barcode field for scanning
        barcode: product.barcode || product.product_id.toString(),
      }))
    } else {
      availableProducts.value = []
    }
  } catch (error) {
    console.error('Error fetching merchant products:', error)
    availableProducts.value = []
  } finally {
    loadingProducts.value = false
  }
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price)
}

onMounted(() => {
  transactionStore.loadFromLocalStorage()

  try {
    const savedHistory = localStorage.getItem('barcode_scan_history')
    if (savedHistory) {
      scanHistory.value = JSON.parse(savedHistory)
    }
  } catch (error) {
    console.error('Error loading barcode scan history:', error)
    scanHistory.value = []
  }

  if (!transactionStore.isStep1Complete) {
    router.push('/transaction/add-1')
    return
  }
})

onUnmounted(() => {
  if (showBarcodeScanner.value) {
    Quagga.stop()
  }
})

const openBarcodeScanner = async () => {
  showBarcodeScanner.value = true
  scanError.value = ''
  scannedProduct.value = null
  manualBarcode.value = ''
  scannerStatus.value = 'idle'

  if (availableProducts.value.length === 0) {
    await fetchMerchantProducts()
  }

  setTimeout(() => {
    if (getAvailableProductsCount() === 0 && availableProducts.value.length > 0) {
      scanError.value =
        '⚠️ Semua produk merchant ini stoknya habis. Silakan update stok produk terlebih dahulu.'
    }
  }, 100)

  setTimeout(() => {
    try {
      startBarcodeScanner()
    } catch (error) {
      console.error('❌ Failed to start scanner:', error)
      scanError.value = 'Gagal memulai scanner. Silakan gunakan input manual.'
      scannerStatus.value = 'error'
    }
  }, 500)
}

const closeBarcodeScanner = () => {
  showBarcodeScanner.value = false
  Quagga.stop()
  scanError.value = ''
  scannedProduct.value = null
  manualBarcode.value = ''
  scannerStatus.value = 'idle'
}

const clearScanHistory = () => {
  scanHistory.value = []
  localStorage.removeItem('barcode_scan_history')
}

const startBarcodeScanner = () => {
  scannerStatus.value = 'starting'

  if (typeof Quagga === 'undefined') {
    console.error('❌ Quagga is not loaded. Please check your dependencies.')
    scanError.value = 'Gagal memulai scanner. Silakan gunakan input manual.'
    scannerStatus.value = 'error'
    return
  }

  try {
    Quagga.stop()
  } catch (error) {
    console.log('No active scanner to stop')
  }

  try {
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: '#barcode-scanner',
          constraints: {
            width: 640,
            height: 480,
            facingMode: 'environment',
          },
        },
        decoder: {
          readers: [
            'code_128_reader',
            'code_39_reader',
            'ean_reader',
            'ean_8_reader',
            'upc_reader',
            'upc_e_reader',
          ],
        },
      },
      (err) => {
        if (err) {
          console.error('❌ Failed to initialize scanner:', err)
          scanError.value = 'Gagal memulai scanner. Silakan gunakan input manual.'
          scannerStatus.value = 'error'
          return
        }

        scannerStatus.value = 'active'
        Quagga.start()

        Quagga.onProcessed((result) => {
          if (result) {
            // Only log occasionally to avoid spam
            if (Math.random() < 0.1) {
              console.log('🔍 Processing frame...', result)
            }
          }
        })
        Quagga.onDetected((result) => {
          const barcode = result.codeResult.code

          // Add a small delay to prevent multiple detections
          setTimeout(() => {
            searchProductByBarcode(barcode)
          }, 500)
        })
      },
    )
  } catch (error) {
    console.error('❌ Failed to start scanner:', error)
    scanError.value = 'Gagal memulai scanner. Silakan gunakan input manual.'
    scannerStatus.value = 'error'
    return
  }
}

const searchProductByBarcode = async (barcode) => {
  let searchCode
  if (barcode && typeof barcode === 'string') {
    searchCode = barcode.trim()
  } else {
    searchCode = manualBarcode.value.trim()
  }

  if (!searchCode) {
    scanError.value = 'Masukkan kode barcode terlebih dahulu'
    return
  }
  try {
    scanningProduct.value = true
    scanError.value = '🔍 Mencari produk...'
    scannedProduct.value = null

    const response = await getMerchantProductByBarcode(searchCode, customerInfo.value.merchantId)
    if (response.data) {
      const productData = response.data
      if (productData.merchant_id !== customerInfo.value.merchantId) {
        scanError.value = 'Produk ini tidak tersedia untuk merchant ini.'
        scannedProduct.value = null
        return
      }

      const product = {
        id: productData.id,
        product_id: productData.product_id,
        name: productData.product_name,
        price: `Rp ${formatPrice(productData.product_price)}`,
        stock: productData.stock,
        category: productData.product_category,
        categoryIcon: productData.product_category_photo,
        image: productData.product_photo,
        // Additional data from API
        product_about: productData.product_about,
        warehouse_name: productData.warehouse_name,
        warehouse_phone: productData.warehouse_phone,
        merchant_id: productData.merchant_id,
        barcode: searchCode,
      }

      scannedProduct.value = product

      if (Quagga) {
        Quagga.stop()
      }

      const scanRecord = {
        barcode: searchCode,
        productName: product.name,
        timestamp: new Date().toISOString(),
        merchantId: customerInfo.value.merchantId,
      }

      scanHistory.value.unshift(scanRecord)
      if (scanHistory.value.length > 10) {
        scanHistory.value = scanHistory.value.slice(0, 10)
      }

      try {
        localStorage.setItem('barcode_scan_history', JSON.stringify(scanHistory.value))
      } catch (error) {
        console.error('Error saving scan history:', error)
      }

      if (product.stock <= 0) {
        scanError.value = `⚠️ Produk ditemukan tetapi stok habis (${product.stock} stok tersedia)`
      } else {
        scanError.value = `✅ Produk ditemukan dengan ${product.stock} stok tersedia`
      }
    } else {
      scannedProduct.value = null
      scanError.value = 'Produk tidak ditemukan. Pastikan barcode benar.'
    }
  } catch (error) {
    console.error('Error searching product by barcode:', error)
    if (error.message.includes('404') || error.message.includes('not found')) {
      scanError.value =
        'Produk tidak ditemukan. Pastikan barcode benar dan produk tersedia untuk merchant ini.'
    } else if (error.message.includes('timeout')) {
      scanError.value = 'Koneksi timeout. Silakan coba lagi.'
    } else {
      scanError.value = `Gagal mencari produk: ${error.message}`
    }

    scannedProduct.value = null
  } finally {
    scanningProduct.value = false
  }
}

const addScannedProduct = () => {
  if (!scannedProduct.value) return

  if (scannedProduct.value.stock <= 0) {
    alert('❌ Produk ini tidak tersedia karena stok habis')
    return
  }

  const existingProduct = assignedProducts.value.find((p) => p.id === scannedProduct.value.id)
  if (existingProduct) {
    if (existingProduct.quantity + 1 > scannedProduct.value.stock) {
      alert(`❌ Tidak bisa menambahkan lebih banyak. Stok tersedia: ${scannedProduct.value.stock}`)
      return
    }

    transactionStore.updateProductQuantity(existingProduct.id, existingProduct.quantity + 1)
  } else {
    transactionStore.addProduct({
      id: scannedProduct.value.id,
      product_id: scannedProduct.value.product_id,
      name: scannedProduct.value.name,
      price: scannedProduct.value.price,
      quantity: 1,
      category: scannedProduct.value.category,
      categoryIcon: scannedProduct.value.categoryIcon,
      image: scannedProduct.value.image,
    })
  }

  closeBarcodeScanner()

  const successMessage = `✅ Produk "${scannedProduct.value.name}" berhasil ditambahkan!
    Stok tersedia: ${scannedProduct.value.stock}
    Warehouse: ${scannedProduct.value.warehouse_name}
    Harga: ${scannedProduct.value.price}`

  alert(successMessage)
}

const closeAssignModal = () => {
  showAssignModal.value = false
}

const openAssignModal = async () => {
  showAssignModal.value = true

  if (availableProducts.value.length === 0) {
    await fetchMerchantProducts()
  }

  setTimeout(() => {
    if (getAvailableProductsCount() === 0 && availableProducts.value.length > 0) {
      alert(
        '⚠️ Semua produk merchant ini stoknya habis. Silakan update stok produk terlebih dahulu.',
      )
    }
  }, 100)
}

const increaseQuantity = (productId) => {
  const product = availableProducts.value.find((p) => p.id === productId)
  if (product && product.stock > 0 && product.selectedQuantity < product.stock) {
    product.selectedQuantity = (product.selectedQuantity || 0) + 1
  }
}

const decreaseQuantity = (productId) => {
  const product = availableProducts.value.find((p) => p.id === productId)
  if (product && product.selectedQuantity > 0) {
    product.selectedQuantity -= 1
  }
}

const getSubtotal = (product) => {
  const quantity = product.selectedQuantity || 0
  const price = parseInt(product.price.replace(/[^\d]/g, ''))
  return `Rp ${(price * quantity).toLocaleString('id-ID')}`
}

const getAvailableProductsCount = () => {
  return availableProducts.value.filter((p) => p.stock > 0).length
}

const addToCart = () => {
  const selectedProducts = availableProducts.value.filter(
    (p) => p.selectedQuantity > 0 && p.stock > 0,
  )

  if (selectedProducts.length === 0) {
    alert('Tidak ada produk yang dipilih atau semua produk yang dipilih stoknya habis')
    return
  }

  // Additional validation to ensure no out-of-stock products are added
  const invalidProducts = selectedProducts.filter((p) => p.selectedQuantity > p.stock)
  if (invalidProducts.length > 0) {
    const productNames = invalidProducts.map((p) => p.name).join(', ')
    alert(`❌ Kuantitas yang dipilih melebihi stok tersedia untuk produk: ${productNames}`)
    return
  }

  selectedProducts.forEach((product) => {
    transactionStore.addProduct({
      id: product.id,
      product_id: product.product_id,
      name: product.name,
      price: product.price,
      quantity: product.selectedQuantity,
      category: product.category,
      categoryIcon: product.categoryIcon,
      image: product.image,
    })
  })

  // Reset selected quantities
  availableProducts.value.forEach((p) => (p.selectedQuantity = 0))

  closeAssignModal()
}

const removeProduct = (productId) => {
  transactionStore.removeProduct(productId)
}

const updateProductQuantity = (productId, newQuantity) => {
  transactionStore.updateProductQuantity(productId, newQuantity)
}

const handleContinue = () => {
  if (!transactionStore.isStep2Complete) {
    alert('Please assign at least one product')
    return
  }

  transactionStore.nextStep()
  router.push('/transaction/add-3')

  console.log('✅ Step 2 completed, navigating to Step 3')
}

const handleBack = () => {
  transactionStore.previousStep()
  router.push('/transaction/add-1')
}
</script>
