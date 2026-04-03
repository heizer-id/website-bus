<template>
  <div class="max-w-3xl mx-auto space-y-8">
    <div class="text-center">
      <h1 class="text-3xl font-extrabold text-gray-900">Cek Status Pesanan</h1>
      <p class="text-gray-600 mt-2">Dapatkan E-Ticket dan pantau perjalanan Anda.</p>
    </div>

    <!-- Search Form -->
    <UCard class="shadow-lg mb-8 bg-white border border-gray-100">
      <form @submit.prevent="fetchBooking" class="flex flex-col md:flex-row items-end gap-4">
        <UFormGroup label="Kode Booking" class="w-full">
          <UInput v-model="searchCode" placeholder="Cth: PO/2026xxxx/xxxx" icon="i-heroicons-hashtag" size="xl" />
        </UFormGroup>
        
        <UButton type="submit" :loading="loading" size="xl" color="primary" class="font-bold whitespace-nowrap min-w-[200px] justify-center">Cari E-Ticket</UButton>
      </form>
    </UCard>

    <!-- Error State -->
    <UAlert v-if="error" title="Tidak Ditemukan" :description="error" color="red" variant="soft" />

    <!-- Result / E-Ticket -->
    <div v-if="booking" class="transition-all">
       <div v-if="booking.transaction.payment_status === 'pending'" class="bg-yellow-50 border border-yellow-200 p-6 rounded-2xl flex justify-between items-center shadow-sm">
          <div>
            <h3 class="font-bold text-yellow-800 text-lg">Pembayaran Pending</h3>
            <p class="text-yellow-700 text-sm">Segera selesaikan pembayaran untuk rute {{ booking.transaction.route_from }} &rarr; {{ booking.transaction.route_to }}.</p>
          </div>
          <UButton color="orange" disabled>Menunggu Pembayaran</UButton>
       </div>

       <div v-else-if="booking.transaction.payment_status === 'failed'" class="bg-red-50 border border-red-200 p-6 rounded-2xl flex justify-between items-center shadow-sm">
          <div>
             <h3 class="font-bold text-red-800 text-lg">Tertunda/Dibatalkan</h3>
             <p class="text-red-700 text-sm">Transaksi telah dibatalkan atau kadaluarsa.</p>
          </div>
       </div>

       <div v-else-if="booking.transaction.payment_status === 'paid'" class="bg-white rounded-[2rem] border-2 border-primary-100 overflow-hidden shadow-2xl relative">
          <!-- Ticket Header -->
          <div class="bg-primary-600 text-white p-6 md:p-8 flex justify-between items-center relative overflow-hidden">
             <div class="absolute -right-8 -top-8 opacity-10">
                <UIcon name="i-heroicons-ticket" class="w-48 h-48" />
             </div>
             <div class="relative z-10">
                <div class="bg-primary-500 rounded px-3 py-1 font-mono text-sm tracking-widest uppercase mb-4 inline-block shadow-sm">E-Ticket Valid</div>
                <h2 class="text-3xl font-extrabold">{{ booking.transaction.route_from }} &rarr; {{ booking.transaction.route_to }}</h2>
                <div class="mt-2 opacity-90">{{ timeFormat(booking.transaction.departure_time) }}</div>
             </div>
          </div>

          <!-- Ticket Body -->
          <div class="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
             <div class="md:col-span-2 space-y-6">
                <div class="grid grid-cols-2 gap-6">
                   <div>
                      <div class="text-xs uppercase text-gray-500 font-bold mb-1">Nama Penumpang</div>
                      <div class="font-bold text-lg text-gray-900">{{ booking.transaction.passenger_name }}</div>
                   </div>
                   <div>
                      <div class="text-xs uppercase text-gray-500 font-bold mb-1">Armada</div>
                      <div class="font-bold text-lg text-gray-900">{{ booking.transaction.bus_name }}</div>
                      <div class="text-sm capitalize text-gray-600">{{ booking.transaction.bus_class }}</div>
                   </div>
                   <div>
                      <div class="text-xs uppercase text-gray-500 font-bold mb-1">Waktu Kedatangan</div>
                      <div class="font-bold text-gray-900">{{ timeFormat(booking.transaction.arrival_time) }}</div>
                   </div>
                   <div>
                      <div class="text-xs uppercase text-gray-500 font-bold mb-1">Nomor Kursi</div>
                      <div class="font-bold text-xl text-primary-600 flex gap-1">
                         <UBadge v-for="seat in booking.transaction.seat_codes.split(',')" :key="seat" color="primary" class="font-mono text-sm">{{ seat }}</UBadge>
                      </div>
                   </div>
                </div>
             </div>
             
             <div class="flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-dashed border-gray-300 pt-6 md:pt-0 md:pl-6 relative">
                 <div class="absolute -left-[14px] top-1/2 w-7 h-7 bg-white border border-gray-300 rounded-full hidden md:block"></div>
                 <div class="text-xs font-bold text-gray-500 tracking-wider mb-3">TUNJUKAN BUKTI INI</div>
                 <img v-if="booking.qrCodeDataUrl" :src="booking.qrCodeDataUrl" alt="QR Code Booking" class="w-40 h-40 border-4 border-gray-100 rounded-xl" />
                 <div class="font-mono text-gray-500 mt-3 text-sm font-bold tracking-widest">{{ booking.transaction.booking_code }}</div>
                 <UButton class="mt-4" icon="i-heroicons-arrow-down-tray" variant="soft" block>Unduh PDF</UButton>
             </div>
          </div>
       </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const searchCode = ref((route.query.code as string) || '')

const loading = ref(false)
const error = ref('')
const booking = ref<any>(null)

const timeFormat = (isoString: string) => {
  return new Date(isoString).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

const fetchBooking = async () => {
  if (!searchCode.value) return
  
  loading.value = true
  error.value = ''
  booking.value = null

  try {
    const res = await $fetch(`/api/booking/${encodeURIComponent(searchCode.value)}`)
    booking.value = res
  } catch (err: any) {
    error.value = err.data?.statusMessage || 'Transaksi tidak ditemukan. Pastikan kode booking benar.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (searchCode.value) {
     fetchBooking()
  }
})
</script>
