<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Dasbor Admin</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
       <UCard class="bg-gradient-to-br from-primary-500 to-primary-600 text-white border-0 shadow-lg" :ui="{ body: { padding: 'p-6 sm:p-8' } }">
          <div class="flex items-center gap-4">
             <div class="p-4 bg-white/20 rounded-2xl"><UIcon name="i-heroicons-truck" class="w-8 h-8" /></div>
             <div>
                <p class="text-white/80 font-medium">Total Armada Bus</p>
                <div class="text-3xl font-bold mt-1">2</div>
             </div>
          </div>
       </UCard>
       <UCard class="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg" :ui="{ body: { padding: 'p-6 sm:p-8' } }">
          <div class="flex items-center gap-4">
             <div class="p-4 bg-white/20 rounded-2xl"><UIcon name="i-heroicons-calendar-days" class="w-8 h-8" /></div>
             <div>
                <p class="text-white/80 font-medium">Total Jadwal Aktif</p>
                <div class="text-3xl font-bold mt-1">2</div>
             </div>
          </div>
       </UCard>
       <UCard class="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg" :ui="{ body: { padding: 'p-6 sm:p-8' } }">
          <div class="flex items-center gap-4">
             <div class="p-4 bg-white/20 rounded-2xl"><UIcon name="i-heroicons-banknotes" class="w-8 h-8" /></div>
             <div>
                <p class="text-white/80 font-medium">Pemasukan (Dummy)</p>
                <div class="text-3xl font-bold mt-1">Rp0</div>
             </div>
          </div>
       </UCard>
    </div>

    <UCard class="mt-8 shadow-sm">
      <h2 class="font-bold text-lg mb-2">Selamat Datang di Portal Admin</h2>
      <p class="text-gray-600">Gunakan menu di sebelah kiri untuk mengelola data operasional perjalanan Nusantara Bus. Anda memiliki akses penuh mengubah ketersediaan kursi, daftar armada, beserta meninjau pesanan pelanggan.</p>
    </UCard>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})
</script>
