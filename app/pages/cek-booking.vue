<template>
  <div class="max-w-4xl mx-auto space-y-16 pb-24">
    <div class="text-center space-y-4 pt-12 animate-in fade-in slide-in-from-top-6 duration-1000">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-[10px] font-black uppercase tracking-widest text-indigo-500">
         Secure Passenger Verification
      </div>
      <h1 class="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter" style="font-family: var(--font-serif)">Check <span class="text-indigo-600">Status.</span></h1>
      <p class="text-slate-500 text-lg font-medium leading-relaxed">Retrieve your elite digital credentials and journey details.</p>
    </div>
 
    <!-- Search Form -->
    <div class="premium-card relative overflow-hidden group mb-12">
       <div class="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] group-hover:bg-indigo-500/10 transition-all duration-700"></div>
       
       <form @submit.prevent="fetchBooking" class="flex flex-col md:flex-row items-end gap-6 relative z-10">
         <UFormGroup label="Booking Authentication Code" :ui="{ label: { base: 'text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1' } }" class="w-full">
           <UInput 
              v-model="searchCode" 
              placeholder="PO/2026/XXXX" 
              size="xl" 
              :ui="{ base: 'bg-slate-50 border-slate-200 h-16 rounded-2xl font-bold focus:ring-2 focus:ring-indigo-500/50 text-indigo-950' }" 
           >
              <template #leading>
                <UIcon name="i-heroicons-hashtag" class="text-indigo-400 w-5 h-5" />
              </template>
           </UInput>
         </UFormGroup>
         
         <UButton 
            type="submit" 
            :loading="loading" 
            size="xl" 
            color="primary" 
            class="font-black py-5 px-10 rounded-2xl shadow-2xl shadow-indigo-600/20 hover-premium text-xs uppercase tracking-widest whitespace-nowrap h-16 justify-center"
            icon="i-heroicons-magnifying-glass"
         >
            Authorize Search
         </UButton>
       </form>
    </div>
 
    <!-- Error State -->
    <div v-if="error" class="animate-in fade-in slide-in-from-bottom-2 duration-500">
       <UAlert title="Authorization Denied" :description="error" color="red" variant="soft" :ui="{ rounded: 'rounded-2xl' }" icon="i-heroicons-exclamation-circle" />
    </div>
 
    <!-- Result / E-Ticket -->
    <div v-if="booking" class="transition-all animate-in fade-in duration-1000 slide-in-from-bottom-8">
        <!-- Pending State -->
        <div v-if="booking.transaction.payment_status === 'pending'" class="bg-indigo-950 p-10 rounded-[3rem] border border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl shadow-indigo-950/20 group">
           <div class="space-y-2 text-center md:text-left">
             <div class="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/20 text-[9px] font-black uppercase tracking-widest text-amber-500 mb-2">Awaiting Settlement</div>
             <h3 class="font-black text-white text-2xl tracking-tight">Payment Verification Required</h3>
             <p class="text-indigo-200/60 text-sm leading-relaxed">Secure your route for {{ booking.transaction.route_from }} &rarr; {{ booking.transaction.route_to }}.</p>
           </div>
           <UButton color="amber" variant="solid" class="rounded-2xl font-black py-4 px-8 text-[10px] uppercase tracking-widest cursor-not-allowed opacity-50">Pending Provider Clearance</UButton>
        </div>
 
        <!-- Failed State -->
        <div v-else-if="booking.transaction.payment_status === 'failed' || booking.transaction.payment_status === 'expired'" class="bg-red-950 p-10 rounded-[3rem] border border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl shadow-red-950/20">
           <div class="space-y-2">
              <h3 class="font-black text-white text-2xl tracking-tight">Access Terminated</h3>
              <p class="text-red-200/60 text-sm">The reservation code has expired or has been voided by the administrator.</p>
           </div>
           <UIcon name="i-heroicons-no-symbol" class="text-red-500 w-12 h-12" />
        </div>
 
        <!-- Paid State / E-Ticket -->
        <div v-else-if="booking.transaction.payment_status === 'paid'" class="bg-white rounded-[4rem] border border-slate-100 overflow-hidden shadow-2xl relative group pb-12">
           <!-- Ticket Header -->
           <div class="bg-indigo-950 text-white p-10 md:p-14 flex justify-between items-start relative overflow-hidden">
              <div class="absolute -right-20 -top-20 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                 <UIcon name="i-heroicons-ticket" class="w-80 h-80" />
              </div>
              <div class="relative z-10 space-y-6">
                 <div>
                    <div class="bg-emerald-600/90 backdrop-blur-md rounded-full px-4 py-1.5 font-black text-[10px] tracking-[0.2em] uppercase mb-6 inline-block shadow-lg ring-1 ring-white/20">Digital Credential Authenticated</div>
                    <div class="text-[11px] font-black text-indigo-300/40 uppercase tracking-[0.25em] mb-2">Journey Essence</div>
                    <h2 class="text-4xl md:text-5xl font-black tracking-tighter" style="font-family: var(--font-serif)">{{ booking.transaction.route_from }} <span class="text-indigo-400">&rarr;</span> {{ booking.transaction.route_to }}</h2>
                 </div>
                 <div class="flex items-center gap-4 text-sm font-bold text-indigo-200/60">
                    <UIcon name="i-heroicons-calendar" class="w-5 h-5" />
                    {{ timeFormat(booking.transaction.departure_time) }}
                 </div>
              </div>
              <div class="hidden md:block">
                 <div class="w-24 h-24 bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/10 flex items-center justify-center p-3">
                    <img v-if="booking.qrCodeDataUrl" :src="booking.qrCodeDataUrl" alt="Mini QR" class="w-full h-full rounded-xl opacity-80" />
                 </div>
              </div>
           </div>
 
           <!-- Ticket Body -->
           <div class="p-10 md:p-14 grid grid-cols-1 md:grid-cols-3 gap-16">
              <div class="md:col-span-2 space-y-12">
                 <div class="grid grid-cols-2 gap-10">
                    <div class="space-y-2">
                       <div class="text-[10px] uppercase text-slate-400 font-black tracking-[0.15em]">Elite Passenger</div>
                       <div class="font-black text-xl text-slate-900 tracking-tight">{{ booking.transaction.passenger_name }}</div>
                    </div>
                    <div class="space-y-2">
                       <div class="text-[10px] uppercase text-slate-400 font-black tracking-[0.15em]">Fleet Designation</div>
                       <div class="font-black text-xl text-slate-900 tracking-tight">{{ booking.transaction.bus_name }}</div>
                       <div class="inline-flex"><UBadge color="primary" variant="soft" class="px-3 py-1 rounded-full text-[9px] uppercase font-black">{{ booking.transaction.bus_class }} Cabin</UBadge></div>
                    </div>
                    <div class="space-y-2">
                       <div class="text-[10px] uppercase text-slate-400 font-black tracking-[0.15em]">Estimated Arrival</div>
                       <div class="font-black text-slate-900">{{ timeFormat(booking.transaction.arrival_time) }}</div>
                    </div>
                    <div class="space-y-2">
                       <div class="text-[10px] uppercase text-slate-400 font-black tracking-[0.15em]">Private Placements</div>
                       <div class="flex flex-wrap gap-2 mt-2">
                          <span v-for="seat in booking.transaction.seat_codes.split(',')" :key="seat" class="bg-indigo-50 text-indigo-600 font-black px-4 py-2 rounded-xl border border-indigo-100 text-xs shadow-sm">{{ seat }}</span>
                       </div>
                    </div>
                 </div>
              </div>
              
              <div class="flex flex-col items-center justify-start pt-6 border-t md:border-t-0 md:border-l border-dashed border-slate-200 md:pt-0 md:pl-16 relative">
                  <div class="absolute -left-[14px] top-1/2 w-7 h-7 bg-white border border-slate-200 rounded-full hidden md:block"></div>
                  <div class="text-[10px] font-black text-slate-400 tracking-[0.2em] mb-4 uppercase">Verification QR</div>
                  <div class="p-4 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-inner mb-6 ring-8 ring-slate-50/50">
                    <img v-if="booking.qrCodeDataUrl" :src="booking.qrCodeDataUrl" alt="QR Code Booking" class="w-40 h-40 rounded-2xl mix-blend-multiply opacity-90" />
                  </div>
                  <div class="font-mono text-indigo-600 text-sm font-black tracking-[0.2em] uppercase">{{ booking.transaction.booking_code }}</div>
                  <UButton class="mt-8 font-black py-4 px-8 rounded-2xl shadow-xl shadow-slate-200 hover-premium text-[10px] uppercase tracking-widest" icon="i-heroicons-arrow-down-tray" variant="soft" block>Download Vault Copy</UButton>
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
    error.value = err.data?.statusMessage || 'The authentication code provided could not be verified in our records.'
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
