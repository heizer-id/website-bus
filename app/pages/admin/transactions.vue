<template>
  <div>
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <h1 class="text-2xl font-bold">Pantauan Transaksi Tiket</h1>
      <UInput 
         v-model="search" 
         icon="i-heroicons-magnifying-glass" 
         placeholder="Cari PNR atau Nama..." 
         @keyup.enter="refresh"
         :ui="{ wrapper: 'w-full md:w-64' }"
      />
    </div>

    <UCard>
      <UTable :rows="data?.transactions || []" :columns="columns" :loading="pending">
        <template #booking_code-data="{ row }">
          <span class="font-bold text-primary-600">{{ row.booking_code }}</span>
        </template>
        <template #route-data="{ row }">
          {{ row.route_from }} &rarr; {{ row.route_to }}
          <div class="text-xs text-gray-400 font-mono mt-1">{{ new Date(row.departure_time).toLocaleString('id-ID', {day: 'numeric', month: 'short', hour:'2-digit', minute:'2-digit'}) }}</div>
        </template>
        <template #seat_codes-data="{ row }">
          <UBadge color="gray" variant="solid">{{ row.seat_codes }}</UBadge>
        </template>
        <template #passenger-data="{ row }">
          <div class="text-sm">
             <p class="font-semibold">{{ row.passenger_name }}</p>
             <p class="text-xs text-gray-500">{{ row.passenger_phone }}</p>
          </div>
        </template>
        <template #payment_status-data="{ row }">
          <UBadge :color="row.payment_status === 'paid' ? 'green' : 'amber'" variant="soft">
            {{ row.payment_status.toUpperCase() }}
          </UBadge>
        </template>
      </UTable>
      <div v-if="!pending && data?.transactions?.length === 0" class="text-center py-8 text-gray-500">
        Belum ada transaksi tiket atau kata kunci tidak ditemukan.
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

// @ts-ignore
definePageMeta({ layout: 'admin', middleware: 'admin' })

const search = ref('')

const columns = [
  { key: 'booking_code', label: 'Kode Booking (PNR)' },
  { key: 'passenger', label: 'Identitas' },
  { key: 'route', label: 'Rute & Waktu' },
  { key: 'seat_codes', label: 'Kursi' },
  { key: 'total_amount', label: 'Total (Rp)' },
  { key: 'payment_status', label: 'Status Byr' },
]

const { data, pending, refresh } = await useFetch<any>(() => `/api/admin/transactions`, {
  query: { search }
})

// Memicu debounce pelan jika user ngetik
let timer: any
watch(search, () => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    refresh()
  }, 500)
})
</script>
