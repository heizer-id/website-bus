<template>
  <div class="space-y-12 pb-16">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl overflow-hidden shadow-2xl mt-4">
      <div class="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2669&auto=format&fit=crop')] bg-cover bg-center"></div>
      <div class="relative z-10 px-6 py-16 md:py-24 text-center md:text-left md:px-12 flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 space-y-4">
          <h1 class="text-4xl md:text-6xl font-extrabold text-white tracking-tight">Perjalanan Nyaman,<br />Mulai dari Sini.</h1>
          <p class="text-primary-100 text-lg md:text-xl max-w-lg">Pesan tiket bus antar kota dengan mudah, cepat, dan aman. Nikmati fasilitas premium kami sekarang.</p>
        </div>
      </div>
    </section>

    <!-- Search Box -->
    <section class="max-w-4xl mx-auto -mt-16 md:-mt-24 relative z-20">
      <UCard class="shadow-xl ring-1 ring-gray-200 dark:ring-gray-800 backdrop-blur-sm bg-white/95">
        <div class="p-2 md:p-4">
          <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <UIcon name="i-heroicons-magnifying-glass" class="text-primary-500" /> 
            Cari Tiket Bus
          </h2>
          
          <form @submit.prevent="searchTickets" class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            
            <!-- Keberangkatan -->
            <UFormGroup label="Dari (Asal)" class="w-full">
              <USelect v-model="searchForm.from" :options="cities" placeholder="Pilih Kota" icon="i-heroicons-map-pin" />
            </UFormGroup>
            
            <!-- Tujuan -->
            <UFormGroup label="Ke (Tujuan)" class="w-full">
              <USelect v-model="searchForm.to" :options="cities" placeholder="Pilih Kota" icon="i-heroicons-map" />
            </UFormGroup>

            <!-- Tanggal Berangkat -->
            <UFormGroup label="Tanggal Keberangkatan" class="w-full">
              <UInput type="date" v-model="searchForm.date" :min="minDate" :max="maxDate" icon="i-heroicons-calendar" />
            </UFormGroup>

            <!-- Jumlah Penumpang -->
            <UFormGroup label="Penumpang" class="w-full">
              <UInput type="number" v-model="searchForm.passengers" min="1" max="10" icon="i-heroicons-user-group" />
            </UFormGroup>

            <div class="md:col-span-4 mt-4 flex justify-end">
              <UButton type="submit" size="lg" color="primary" class="w-full md:w-auto px-8 py-3 font-bold text-lg" icon="i-heroicons-magnifying-glass">Cari Jadwal</UButton>
            </div>
          </form>
        </div>
      </UCard>
    </section>

    <!-- Features -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-8">
      <div class="text-center space-y-3 p-6 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition">
        <UIcon name="i-heroicons-shield-check" class="w-12 h-12 mx-auto text-primary-500" />
        <h3 class="text-xl font-bold">Pembayaran Aman</h3>
        <p class="text-gray-500 text-sm">Didukung oleh sistem payment gateway Doku yang menjamin sekuritas tiap transaksi Anda.</p>
      </div>
      <div class="text-center space-y-3 p-6 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition">
        <UIcon name="i-heroicons-ticket" class="w-12 h-12 mx-auto text-primary-500" />
        <h3 class="text-xl font-bold">E-Ticket Mudah</h3>
        <p class="text-gray-500 text-sm">Tidak perlu mencetak tiket fisik. Cukup tunjukkan barcode di HP untuk naik ke bus.</p>
      </div>
      <div class="text-center space-y-3 p-6 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition">
        <UIcon name="i-heroicons-map" class="w-12 h-12 mx-auto text-primary-500" />
        <h3 class="text-xl font-bold">Pilih Kursi Sendiri</h3>
        <p class="text-gray-500 text-sm">Pilih jadwal dan kursi favoritmu langsung melalui aplikasi kami.</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const cities = ['Jakarta', 'Surabaya', 'Semarang', 'Yogyakarta', 'Solo', 'Bandung', 'Malang']

// Date logic
const today = new Date()
const minDate = today.toISOString().split('T')[0]
const ninetyDays = new Date()
ninetyDays.setDate(today.getDate() + 90)
const maxDate = ninetyDays.toISOString().split('T')[0]

const searchForm = ref({
  from: 'Jakarta',
  to: 'Surabaya',
  date: minDate,
  passengers: 1
})

const searchTickets = () => {
  if (!searchForm.value.from || !searchForm.value.to || !searchForm.value.date) {
    alert("Mohon lengkapi kota awal, tujuan, dan tanggal")
    return
  }
  
  if (searchForm.value.from === searchForm.value.to) {
    alert("Kota asal dan tujuan tidak boleh sama")
    return
  }

  router.push({
    path: '/search-results',
    query: {
      from: searchForm.value.from,
      to: searchForm.value.to,
      date: searchForm.value.date,
      passengers: searchForm.value.passengers
    }
  })
}
</script>
