<template>
  <div class="space-y-12 max-w-6xl mx-auto px-4 pb-24">
    <!-- Page Header -->
    <div class="space-y-3 text-center md:text-left mb-16 px-4 animate-in fade-in slide-in-from-top-6 duration-1000">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-[10px] font-black uppercase tracking-widest text-indigo-500">
         Final Confirmation Step
      </div>
      <h1 class="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter" style="font-family: var(--font-serif)">Secure Your <span class="text-indigo-600">Journey.</span></h1>
      <p class="text-slate-500 text-lg font-medium leading-relaxed">The final step to confirm your elite travel experience across Nusantara.</p>
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
      <div class="lg:col-span-8 space-y-10">
        <div class="bg-white/70 backdrop-blur-3xl border border-white/60 rounded-[4rem] p-12 md:p-16 shadow-2xl shadow-indigo-900/5 relative overflow-hidden">
          <div class="absolute -right-20 top-0 w-80 h-80 bg-indigo-50/30 rounded-full blur-[120px]"></div>
          
          <div class="relative z-10 space-y-12">
            <div class="flex items-center gap-4 border-b border-slate-100/50 pb-8 mb-8">
               <div class="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <UIcon name="i-heroicons-user" class="text-white w-6 h-6" /> 
               </div>
               <div>
                  <h2 class="text-2xl font-black text-slate-900 tracking-tight">Passenger & Contact</h2>
                  <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Required for E-Ticket authentication</p>
               </div>
            </div>
            
            <form @submit.prevent="submitBooking" class="space-y-12">
              <div class="bg-indigo-950 p-8 rounded-[2.5rem] border border-white/10 flex items-start gap-6 shadow-2xl shadow-indigo-950/20 relative overflow-hidden group">
                <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <UIcon name="i-heroicons-sparkles" class="w-8 h-8 text-indigo-400 shrink-0 mt-1" />
                <div class="space-y-2 relative z-10">
                   <p class="text-lg font-bold text-white tracking-tight">Elite Travel Assurance</p>
                   <p class="text-indigo-200/60 text-sm leading-relaxed">Your digital credentials and ticket will be securely transmitted to the provided email. Please verify accuracy before proceeding.</p>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div class="space-y-3">
                  <label class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] pl-1">Full Legal Name</label>
                  <UInput v-model="formData.name" placeholder="As per Identity Card" size="xl" :ui="{ base: 'bg-slate-50 border-slate-200 rounded-2xl font-bold h-14 focus:ring-2 focus:ring-indigo-500/50' }" />
                </div>
                
                <div class="space-y-3">
                  <label class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] pl-1">Contact Intelligence (WA)</label>
                  <UInput v-model="formData.phone" type="tel" placeholder="+62xxxxxxxx" size="xl" :ui="{ base: 'bg-slate-50 border-slate-200 rounded-2xl font-bold h-14 focus:ring-2 focus:ring-indigo-500/50' }" />
                </div>

                <div class="md:col-span-2 space-y-3">
                  <label class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] pl-1">Secured Email Address</label>
                  <UInput v-model="formData.email" type="email" placeholder="client@luxurydomain.com" size="xl" :ui="{ base: 'bg-slate-50 border-slate-200 rounded-2xl font-bold h-14 focus:ring-2 focus:ring-indigo-500/50' }" />
                </div>
              </div>

              <div class="pt-8 border-t border-slate-100/50">
                <UButton 
                  type="submit" 
                  :loading="loadingObj" 
                  size="xl" block color="primary" 
                  class="font-black py-6 rounded-[2rem] shadow-2xl shadow-indigo-600/40 hover-premium text-xs uppercase tracking-[0.2em]"
                  icon="i-heroicons-shield-check"
                >
                  Authorized Payment
                </UButton>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="lg:col-span-4 h-fit sticky top-32">
        <div class="bg-indigo-950/90 backdrop-blur-3xl rounded-[3rem] p-10 md:p-12 space-y-10 shadow-2xl shadow-indigo-950/20 border border-white/10 text-white">
          <div class="flex items-center gap-3 border-b border-white/10 pb-6 mb-8">
             <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                <UIcon name="i-heroicons-ticket" class="w-5 h-5 text-indigo-100" />
             </div>
             <h3 class="text-xl font-black tracking-tight" style="font-family: var(--font-serif)">Elite Itinerary</h3>
          </div>
          
          <div class="space-y-10">
             <div class="flex flex-col gap-3">
                <div class="text-[10px] text-indigo-300/40 font-black tracking-[0.2em] uppercase">Journey Essence</div>
                <div class="font-black text-white text-xl leading-tight tracking-tight">{{ data?.schedule?.route_from }} <span class="text-indigo-400">&rarr;</span> {{ data?.schedule?.route_to }}</div>
                <div class="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-1 px-3 py-1 bg-indigo-900/40 rounded-full w-fit">{{ timeFormat(data?.schedule?.departure_time) }}</div>
             </div>
 
             <div class="flex flex-col gap-3">
                <div class="text-[10px] text-indigo-300/40 font-black tracking-[0.2em] uppercase">Fleet & Cabin</div>
                <div class="font-black text-white tracking-tight">{{ data?.schedule?.bus_name }}</div>
                <div class="inline-flex"><UBadge color="primary" variant="solid" class="px-3 py-1 rounded-full text-[9px] uppercase font-black tracking-widest">{{ data?.schedule?.bus_class }} Elite</UBadge></div>
             </div>
 
             <div class="flex flex-col gap-3">
                <div class="text-[10px] text-indigo-300/40 font-black tracking-[0.2em] uppercase">Private Placements</div>
                <div class="flex flex-wrap gap-2 mt-1">
                   <span v-for="seat in seatList" :key="seat" class="bg-indigo-600/50 backdrop-blur-sm text-white font-black px-4 py-2 rounded-xl border border-white/5 text-xs shadow-lg">{{ seat }}</span>
                </div>
             </div>
 
             <div class="pt-10 border-t border-white/10 space-y-6">
                <div class="flex justify-between items-center text-[10px] font-black text-indigo-300/40 uppercase tracking-[0.2em]">
                  <span>Indiv. Fare</span>
                  <span>{{ formatRupiah(data?.schedule?.price || 0) }} &times;{{ seatList.length }}</span>
                </div>
                <div class="flex flex-col gap-2">
                  <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest pl-0.5">Total Confirmation</span>
                  <div class="text-5xl font-black text-white tracking-tighter" style="font-family: var(--font-serif)">{{ formatRupiah((data?.schedule?.price || 0) * seatList.length) }}</div>
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
