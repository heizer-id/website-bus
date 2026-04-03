<template>
  <div class="max-w-xl mx-auto text-center space-y-6 py-12">
    <div v-if="processing" class="space-y-4">
      <UIcon name="i-heroicons-arrow-path" class="w-20 h-20 animate-spin text-primary-500 mx-auto" />
      <h2 class="text-2xl font-bold text-gray-800">Menyelesaikan Pembayaran...</h2>
      <p class="text-gray-500">Menghubungkan dengan Gateway Pembayaran DOKU (Simulasi).</p>
    </div>
    
    <div v-else-if="success" class="space-y-6">
      <div class="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center mx-auto shadow-inner">
        <UIcon name="i-heroicons-check-circle" class="w-20 h-20 text-green-500" />
      </div>
      <h1 class="text-3xl font-extrabold text-gray-900">Pembayaran Berhasil!</h1>
      <p class="text-gray-600">Terima kasih. Tiket telah dikonfirmasi dan notifikasi berhasil dikirim.</p>
      
      <UCard class="bg-white text-left mt-8 shadow-xl border-t-4 border-t-primary-500 rounded-2xl relative overflow-hidden">
        <div class="absolute -right-8 -top-8 opacity-5">
           <UIcon name="i-heroicons-ticket" class="w-40 h-40" />
        </div>
        
        <div class="relative z-10">
           <div class="flex flex-col items-center justify-center border-b border-dashed border-gray-300 pb-6 mb-6">
             <span class="text-gray-500 uppercase tracking-widest text-xs font-bold mb-2">Kode Booking Anda</span>
             <span class="font-extrabold text-3xl font-mono text-primary-700 bg-primary-50 px-6 py-2 rounded-lg border border-primary-200">{{ bookingCode }}</span>
           </div>
           
           <p class="text-sm text-gray-500 text-center mb-6">Gunakan kode ini untuk mengecek status pesanan atau mencetak E-Ticket.</p>
           
           <UButton block to="/cek-booking" size="xl" color="primary" class="font-bold rounded-xl shadow-md transition hover:scale-[1.02]">Lihat E-Ticket</UButton>
        </div>
      </UCard>
    </div>

    <div v-else>
       <UIcon name="i-heroicons-x-circle" class="w-24 h-24 mx-auto text-red-500 mb-4" />
       <h1 class="text-2xl font-bold text-gray-800">Transaksi Tidak Ditemukan</h1>
       <UButton to="/" size="lg" color="primary" class="mt-6" variant="outline">Kembali Ke Beranda</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const bookingCode = route.query.booking as string

const processing = ref(true)
const success = ref(false)

onMounted(() => {
  if (bookingCode) {
    // Simulate external Dokupay integration timeline
    setTimeout(async () => {
      try {
        await $fetch('/api/payment/doku-callback', {
          method: 'POST',
          body: {
            bookingCode,
            status: 'SUCCESS'
          }
        })
        success.value = true
      } catch (err) {
        console.error("Callback simulasi gagal", err)
      } finally {
        processing.value = false
      }
    }, 2500)
  } else {
    processing.value = false
  }
})
</script>
