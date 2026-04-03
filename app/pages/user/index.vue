<template>
  <UContainer class="py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">E-Ticket Saya</h1>
      <p class="text-gray-500 mt-2">Kelola dan tinjau seluruh riwayat perjalanan dan tiket bus Anda di satu tempat.</p>
    </div>

    <!-- Status Tampilan -->
    <div v-if="pending" class="flex justify-center py-12">
      <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-primary-500 animate-spin" />
    </div>

    <div v-else-if="!data?.transactions?.length" class="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
      <UIcon name="i-heroicons-ticket" class="w-16 h-16 mx-auto text-gray-300 mb-4" />
      <h3 class="text-xl font-bold text-gray-900 mb-2">Belum Ada Perjalanan</h3>
      <p class="text-gray-500 mb-6">Anda belum pernah memesan tiket bus bersama kami.</p>
      <UButton to="/" color="primary" size="lg" icon="i-heroicons-magnifying-glass">Cari Tiket Sekarang</UButton>
    </div>

    <!-- Ticket Cards Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard 
        v-for="t in data.transactions" 
        :key="t.id"
        class="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 bg-white border-0 ring-1 ring-gray-100"
        :ui="{ header: { padding: 'p-4 sm:p-5' }, body: { padding: 'p-4 sm:p-5 flex-grow' }, footer: { padding: 'p-4 sm:p-5 bg-gray-50/50' } }"
      >
        <template #header>
          <div class="flex justify-between items-start">
            <div>
               <p class="text-xs font-bold text-primary-600 uppercase tracking-widest mb-1">Kode Booking (PNR)</p>
               <p class="font-mono text-lg font-bold text-gray-900">{{ t.booking_code }}</p>
            </div>
            <UBadge :color="t.payment_status === 'paid' ? 'green' : 'amber'" variant="subtle" size="sm" class="uppercase">
              {{ t.payment_status === 'paid' ? 'LUNAS' : 'PENDING' }}
            </UBadge>
          </div>
        </template>

        <div class="space-y-4">
          <div class="flex items-center gap-3">
             <div class="p-2 bg-primary-50 rounded-lg"><UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-primary-600" /></div>
             <div>
                <p class="text-sm font-semibold text-gray-900">{{ t.route_from }} &rarr; {{ t.route_to }}</p>
                <p class="text-xs text-gray-500">{{ new Date(t.departure_time).toLocaleString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }}</p>
             </div>
          </div>
          
          <div class="flex items-center gap-3 border-t border-gray-100 pt-4">
             <div class="p-2 bg-gray-50 rounded-lg"><UIcon name="i-heroicons-truck" class="w-5 h-5 text-gray-600" /></div>
             <div>
                <p class="text-sm font-semibold text-gray-900">{{ t.bus_name }}</p>
                <p class="text-xs text-gray-500 text-capitalize">{{ t.bus_class }}</p>
             </div>
          </div>

          <div class="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
            <div>
               <p class="text-xs text-gray-500">Nomor Kursi</p>
               <p class="font-bold text-sm text-gray-900">{{ t.seat_codes }}</p>
            </div>
            <div class="text-right">
               <p class="text-xs text-gray-500">Total Harga</p>
               <p class="font-bold text-sm text-primary-600">{{ formatRupiah(t.total_amount) }}</p>
            </div>
          </div>
        </div>

        <template #footer>
          <UButton 
            v-if="t.payment_status === 'pending'" 
            color="primary" 
            block 
            icon="i-heroicons-banknotes"
            :to="`/payment-success?booking=${t.booking_code}`"
          >
             Selesaikan Pembayaran
          </UButton>
          <UButton 
            v-else 
            color="white" 
            block 
            icon="i-heroicons-qr-code" 
            variant="solid" 
            class="ring-1 ring-gray-200 shadow-sm"
          >
             Lihat QR E-Ticket
          </UButton>
        </template>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
// @ts-ignore
definePageMeta({ middleware: 'auth' })

const formatRupiah = (number: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number)
}

const { data, pending } = await useFetch<any>('/api/user/transactions')
</script>
