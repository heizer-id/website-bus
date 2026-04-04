<template>
  <div class="space-y-12 max-w-6xl mx-auto px-4 pb-24">
    <!-- Page Header -->
    <div class="space-y-2 text-center md:text-left animate-in fade-in slide-in-from-top-4 duration-700">
      <h1 class="text-3xl font-black text-slate-900 tracking-tight" style="font-family: var(--font-serif)">Konfirmasi Pesanan</h1>
      <p class="text-slate-500 font-medium">Langkah terakhir untuk mengamankan perjalanan Anda.</p>
    </div>

    <div v-if="pending" class="flex flex-col items-center justify-center p-24 bg-white rounded-[3rem] border border-slate-100 shadow-sm gap-4">
      <UIcon name="i-heroicons-arrow-path" class="w-12 h-12 animate-spin text-indigo-500" />
      <p class="text-slate-400 font-bold uppercase tracking-widest text-xs tracking-widest">Menyiapkan Tagihan...</p>
    </div>

    <div v-else-if="!data?.schedule" class="text-center p-16 bg-red-50 rounded-[3rem] border border-red-100 border-dashed">
      <UIcon name="i-heroicons-exclamation-triangle" class="w-12 h-12 text-red-500 mb-4" />
      <h2 class="text-2xl font-black text-red-900">Jadwal Tidak Ditemukan</h2>
      <UButton to="/" class="mt-8 font-bold px-8 py-3 rounded-2xl" color="red" variant="soft">Kembali Cari</UButton>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-10">
      
      <!-- Form Area -->
      <div class="lg:col-span-8 space-y-8">
        <div class="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-sm relative overflow-hidden">
          <div class="absolute -right-20 top-0 w-64 h-64 bg-slate-50 rounded-full blur-[100px]"></div>
          
          <div class="relative z-10 space-y-10">
            <h2 class="text-xl font-black text-slate-900 border-b border-slate-100 pb-6 mb-6 flex items-center gap-3">
              <div class="bg-indigo-100 p-2 rounded-xl">
                 <UIcon name="i-heroicons-user" class="text-indigo-600 w-5 h-5" /> 
              </div>
              Data Penumpang & Kontak
            </h2>
            
            <form @submit.prevent="submitBooking" class="space-y-8">
              <div class="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100/50 flex items-start gap-4">
                <UIcon name="i-heroicons-paper-airplane" class="w-6 h-6 text-indigo-600 shrink-0 mt-0.5" />
                <p class="text-sm text-indigo-900 leading-relaxed">
                  <span class="font-bold">Penting:</span> Tiket elektronik (E-Ticket) akan dikirimkan ke email tujuan. Pastikan data yang Anda masukkan sudah benar.
                </p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-2">
                  <label class="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Nama Lengkap Pemesan</label>
                  <UInput v-model="formData.name" placeholder="Masukan Nama Sesuai KTP" size="xl" class="w-full" />
                </div>
                
                <div class="space-y-2">
                  <label class="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Nomor Telepon/WA</label>
                  <UInput v-model="formData.phone" type="tel" placeholder="08xxxxxxxx" size="xl" class="w-full" />
                </div>

                <div class="md:col-span-2 space-y-2">
                  <label class="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Alamat Email</label>
                  <UInput v-model="formData.email" type="email" placeholder="email@contoh.com" size="xl" class="w-full" />
                </div>
              </div>

              <div class="pt-8 border-t border-slate-100">
                <UButton 
                  type="submit" 
                  :loading="loadingObj" 
                  size="xl" block color="primary" 
                  class="font-black py-5 rounded-[2rem] shadow-xl shadow-indigo-100 hover-premium text-lg"
                  icon="i-heroicons-credit-card"
                >
                  Bayar Sekarang
                </UButton>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="lg:col-span-4 h-fit sticky top-28">
        <div class="glass-card rounded-[3rem] p-8 md:p-10 space-y-8 shadow-indigo-500/5 border-indigo-100/30">
          <h3 class="text-xl font-black text-slate-900 border-b border-slate-100 pb-6">Ringkasan Pesanan</h3>
          
          <div class="space-y-6">
             <div class="flex flex-col gap-1">
                <div class="text-[10px] text-slate-400 font-black tracking-widest uppercase">Rute Perjalanan</div>
                <div class="font-black text-slate-900">{{ data.schedule.route_from }} &rarr; {{ data.schedule.route_to }}</div>
                <div class="text-xs font-bold text-indigo-600 mt-0.5">{{ timeFormat(data.schedule.departure_time) }}</div>
             </div>

             <div class="flex flex-col gap-1">
                <div class="text-[10px] text-slate-400 font-black tracking-widest uppercase">Unit Armada</div>
                <div class="font-black text-slate-900">{{ data.schedule.bus_name }}</div>
                <div class="inline-flex"><UBadge color="info" variant="solid" class="px-2 py-0.5 rounded-lg text-[9px] uppercase font-black">{{ data.schedule.bus_class }}</UBadge></div>
             </div>

             <div class="flex flex-col gap-1">
                <div class="text-[10px] text-slate-400 font-black tracking-widest uppercase">Pilihan Kursi</div>
                <div class="flex flex-wrap gap-2 mt-1">
                   <span v-for="seat in seatList" :key="seat" class="bg-indigo-50 text-indigo-700 font-black px-3 py-1.5 rounded-xl border border-indigo-100 text-xs">{{ seat }}</span>
                </div>
             </div>

             <div class="pt-6 border-t border-slate-100 space-y-4">
                <div class="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>{{ formatRupiah(data.schedule.price) }} x{{ seatList.length }}</span>
                </div>
                <div class="flex justify-between items-end">
                  <span class="text-sm font-black text-slate-900">Total Tagihan</span>
                  <div class="text-3xl font-black text-indigo-600 tracking-tight">{{ formatRupiah(data.schedule.price * seatList.length) }}</div>
                </div>
             </div>
          </div>
        </div>
      </div>
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
