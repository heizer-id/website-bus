<template>
  <div class="max-w-4xl mx-auto space-y-8">
    
    <div>
      <h1 class="text-3xl font-bold">Detail Penumpang & Pembayaran</h1>
      <p class="text-gray-600">Lengkapi data untuk pesanan Anda.</p>
    </div>

    <div v-if="pending" class="flex justify-center p-12">
      <UIcon name="i-heroicons-arrow-path" class="w-10 h-10 animate-spin text-primary-500" />
    </div>

    <div v-else-if="!data?.schedule" class="text-center p-8">
      <h2 class="text-xl font-bold text-red-500">Jadwal Tidak Ditemukan</h2>
      <UButton to="/" class="mt-4">Kembali ke Beranda</UButton>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      <!-- Form Input Penumpang -->
      <UCard class="md:col-span-2 shadow-lg">
        <h2 class="text-lg font-bold mb-4 border-b pb-2">Informasi Kontak & Penumpang</h2>
        
        <form @submit.prevent="submitBooking" class="space-y-6 mt-4">
          <div class="bg-primary-50 p-4 rounded-xl border border-primary-100 flex items-start gap-4 mb-6">
            <UIcon name="i-heroicons-information-circle" class="w-6 h-6 text-primary-600 shrink-0 mt-0.5" />
            <p class="text-sm text-primary-800">E-Ticket akan dikirimkan ke alamat email di bawah ini. Pastikan email aktif.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormGroup label="Nama Lengkap Pemesan" required>
              <UInput v-model="formData.name" placeholder="Masukan Nama Sesuai KTP" />
            </UFormGroup>
            
            <UFormGroup label="Nomor Telepon/WA" required>
              <UInput v-model="formData.phone" type="tel" placeholder="08xxxxxxxx" />
            </UFormGroup>

            <UFormGroup label="Alamat Email" required class="md:col-span-2">
              <UInput v-model="formData.email" type="email" placeholder="email@contoh.com" />
            </UFormGroup>
          </div>

          <div class="mt-8">
            <UButton 
              type="submit" 
              :loading="loadingObj" 
              size="xl" block color="primary" 
              class="font-bold text-lg py-3">
              Lanjut Bayar (DOKU)
            </UButton>
          </div>
        </form>
      </UCard>

      <!-- Order Summary -->
      <UCard class="shadow-lg h-fit sticky top-24">
        <h3 class="font-bold text-lg mb-4 text-gray-800 border-b pb-2">Ringkasan Pesanan</h3>
        
        <div class="space-y-4">
           <div>
              <div class="text-sm text-gray-500 font-medium tracking-wider uppercase mb-1">Perjalanan</div>
              <div class="font-bold">{{ data.schedule.route_from }} &rarr; {{ data.schedule.route_to }}</div>
              <div class="text-sm mt-1">{{ timeFormat(data.schedule.departure_time) }}</div>
           </div>

           <div>
              <div class="text-sm text-gray-500 font-medium tracking-wider uppercase mb-1">Armada</div>
              <div class="font-bold">{{ data.schedule.bus_name }}</div>
              <div class="text-sm capitalize">{{ data.schedule.bus_class }}</div>
           </div>

           <div>
              <div class="text-sm text-gray-500 font-medium tracking-wider uppercase mb-1">Kursi</div>
              <div class="font-bold text-primary-600 space-x-1">
                 <UBadge v-for="seat in seatList" :key="seat" variant="subtle">{{ seat }}</UBadge>
              </div>
           </div>

           <div class="border-t pt-4">
              <div class="flex justify-between items-center mb-2">
                <span class="text-gray-600">Harga per tiket</span>
                <span class="font-medium">{{ formatRupiah(data.schedule.price) }}</span>
              </div>
              <div class="flex justify-between items-center text-lg mt-2">
                <span class="font-bold">Total Pembayaran</span>
                <span class="font-bold text-primary-600">{{ formatRupiah(data.schedule.price * seatList.length) }}</span>
              </div>
           </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
// @ts-ignore
const { user } = useAuth()

// @ts-ignore
definePageMeta({
  middleware: 'auth'
})

const scheduleId = route.query.scheduleId as string
const seatsParams = route.query.seats as string
const seatList = computed(() => seatsParams ? seatsParams.split(',') : [])

const { data, pending } = await useFetch<{ schedule: any }>('/api/seats', {
  query: { scheduleId }
})

const formData = ref({
  name: '',
  phone: '',
  email: ''
})

// Populate form after user is loaded client-side (avoids hydration mismatch)
watch(() => user.value, (u) => {
  if (u) {
    if (!formData.value.name) formData.value.name = u.name || ''
    if (!formData.value.email) formData.value.email = u.email || ''
  }
}, { immediate: true })

const loadingObj = ref(false)

const formatRupiah = (number: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number)
}

const timeFormat = (isoString: string) => {
  return new Date(isoString).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

const submitBooking = async () => {
  if (!formData.value.name || !formData.value.phone || !formData.value.email) {
    // @ts-ignore
    const toast = useToast()
    toast.add({ title: 'Error', description: 'Mohon lengkapi semua data penumpang', color: 'red' })
    return
  }

  loadingObj.value = true
  try {
    const res = await $fetch<any>('/api/payment/doku-invoice', {
      method: 'POST',
      body: {
        scheduleId: Number(scheduleId),
        seats: seatList.value,
        passenger: formData.value
      }
    })

    // Simulated Doku Redirect
    // For local, we just bypass to success
    if (res.bookingCode) {
      router.push(`/payment-success?booking=${res.bookingCode}`)
    }
  } catch (err: any) {
    // @ts-ignore
    const toast = useToast()
    toast.add({
       title: 'Gagal Membuat Tagihan',
       description: err.data?.statusMessage || err.message,
       color: 'red'
    })
  } finally {
    loadingObj.value = false
  }
}
</script>
