<template>
  <div class="space-y-12 max-w-6xl mx-auto px-4 pb-24">
    <!-- Header Summary -->
    <div class="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 px-4">
      <div class="space-y-3 text-center md:text-left">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-[10px] font-black uppercase tracking-widest text-indigo-500">
           Exclusive Cabin Selection
        </div>
        <h1 class="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter" style="font-family: var(--font-serif)">Reserve Your <span class="text-indigo-600">Space.</span></h1>
        <p class="text-slate-500 text-lg font-medium">Please select <span class="text-indigo-600 font-bold underline decoration-indigo-200 underline-offset-4">{{ passengers }} premium seats</span> for your journey.</p>
      </div>
      <UButton variant="ghost" color="neutral" @click="$router.back()" icon="i-heroicons-chevron-left" class="font-black text-xs uppercase tracking-widest px-8 py-4 bg-white shadow-xl shadow-slate-200/50 rounded-2xl hover-premium border border-slate-100">Go Back</UButton>
    </div>

    <div v-if="pending" class="flex flex-col items-center justify-center p-24 bg-white rounded-[3rem] border border-slate-100 shadow-sm gap-4">
      <UIcon name="i-heroicons-arrow-path" class="w-12 h-12 animate-spin text-indigo-500" />
      <p class="text-slate-400 font-bold uppercase tracking-widest text-xs">Memuat Denah Bus...</p>
    </div>

    <div v-else-if="error || !data?.schedule" class="text-center p-16 bg-red-50 rounded-[3rem] border border-red-100 border-dashed">
      <UIcon name="i-heroicons-exclamation-triangle" class="w-12 h-12 text-red-500 mb-4" />
      <div class="text-red-900 font-bold text-xl">Data Tidak Tersedia</div>
      <p class="text-red-600 mt-1">Gagal memuat denah kursi. Silakan coba lagi nanti.</p>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-10">
      
      <!-- Seat Map Area -->
      <div class="lg:col-span-8 space-y-12">
        <div class="bg-white/70 backdrop-blur-3xl border border-white/60 rounded-[4rem] p-12 md:p-16 shadow-2xl shadow-indigo-900/5 relative overflow-hidden">
           <!-- Dynamic Visual Context -->
           <div class="absolute -right-20 top-0 w-80 h-80 bg-indigo-50/50 rounded-full blur-[120px]"></div>
           <div class="absolute -left-20 bottom-0 w-80 h-80 bg-slate-50 rounded-full blur-[120px]"></div>

           <div class="relative z-10 space-y-16">
              <div class="flex flex-wrap items-center justify-between gap-8 border-b border-slate-100/50 pb-12">
                 <div class="space-y-2">
                    <h3 class="text-2xl font-black text-slate-900 leading-tight tracking-tight">{{ data?.schedule?.bus_name || 'Premium Liner' }}</h3>
                    <div class="flex items-center gap-3">
                       <UBadge color="primary" variant="subtle" class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{{ data?.schedule?.bus_class || 'Elite' }} Class</UBadge>
                       <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1"><UIcon name="i-heroicons-wifi" /> Fast Wifi</span>
                    </div>
                 </div>
                 <div class="flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em]">
                    <div class="flex items-center gap-3 text-slate-400"><div class="w-4 h-4 bg-white border-2 border-slate-200 rounded-lg shadow-sm"></div><span>Available</span></div>
                    <div class="flex items-center gap-3 text-indigo-600"><div class="w-4 h-4 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-200"></div><span>Selected</span></div>
                    <div class="flex items-center gap-3 text-slate-300"><div class="w-4 h-4 bg-slate-100 border border-slate-200 rounded-lg"></div><span>Booked</span></div>
                 </div>
              </div>
           
              <div class="flex justify-center">
                 <!-- The Bus Container -->
                 <div class="bg-slate-50 p-10 md:p-20 rounded-[5rem] border-[6px] border-white inline-block relative shadow-[0_0_80px_rgba(0,0,0,0.02)] ring-1 ring-slate-100">
                    <!-- Steering Wheel / Cockpit -->
                    <div class="absolute top-12 right-12 md:right-24 opacity-10 flex flex-col items-center gap-3">
                       <UIcon name="i-heroicons-lifebuoy" class="w-16 h-16 animate-pulse" />
                       <span class="text-[10px] font-black uppercase tracking-[0.4em]">Captain</span>
                    </div>

                    <div class="mt-32 grid gap-6 md:gap-8" :style="{ gridTemplateColumns: `repeat(${layout.cols}, minmax(0, 1fr))` }">
                       <template v-for="rIdx in layout.rows" :key="`row-${rIdx}`">
                          <template v-for="cIdx in layout.cols" :key="`col-${cIdx}`">
                             <!-- Aisle -->
                             <div v-if="cIdx === layout.aisle" class="w-10 md:w-16 h-16 md:h-20 flex items-center justify-center">
                                <div class="w-px h-full bg-gradient-to-b from-transparent via-slate-200 to-transparent"></div>
                             </div>
                             
                             <button
                               v-else
                               @click="toggleSeat(getSeatCode(rIdx, cIdx))"
                               :disabled="isBooked(getSeatCode(rIdx, cIdx))"
                               class="w-14 h-16 md:w-20 md:h-20 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 font-black text-xs md:text-sm transition-all duration-500 focus:outline-none relative group overflow-hidden"
                               :class="[
                                 isBooked(getSeatCode(rIdx, cIdx)) ? 'bg-slate-100/50 border-slate-200/50 text-slate-300 cursor-not-allowed grayscale' :
                                 isSelected(getSeatCode(rIdx, cIdx)) ? 'bg-indigo-600 border-indigo-700 text-white shadow-2xl shadow-indigo-500/30 scale-110 z-20' :
                                 'bg-white border-transparent text-slate-500 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 shadow-sm'
                               ]"
                             >
                                <!-- Seat Visual Detail -->
                                <div class="absolute top-0 inset-x-2 h-1.5 rounded-full overflow-hidden opacity-30 mt-1" :class="isSelected(getSeatCode(rIdx, cIdx)) ? 'bg-white' : 'bg-slate-200'"></div>
                                
                                <span class="relative z-10 scale-90 group-hover:scale-100 transition-transform tracking-tighter">{{ getSeatCode(rIdx, cIdx) }}</span>
                                
                                <!-- Indicator Dot -->
                                <div v-if="!isBooked(getSeatCode(rIdx, cIdx))" class="w-1.5 h-1.5 rounded-full mt-1.5 transition-all duration-500" :class="isSelected(getSeatCode(rIdx, cIdx)) ? 'bg-indigo-300 scale-125' : 'bg-slate-100 group-hover:bg-indigo-400 group-hover:scale-125'"></div>
                             </button>
                          </template>
                       </template>
                    </div>
                    
                    <!-- Rear decor -->
                    <div class="mt-20 flex justify-center opacity-5">
                       <div class="text-[10px] font-black uppercase tracking-[1em]">Nusa Elite Fleet</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <!-- Price/Summary Sidebar -->
      <div class="lg:col-span-4 h-fit sticky top-32">
        <div class="bg-indigo-950/90 backdrop-blur-3xl rounded-[3rem] p-10 md:p-12 space-y-12 shadow-2xl shadow-indigo-950/20 border border-white/10 text-white">
          <div class="space-y-4">
            <div class="flex items-center gap-3 mb-6">
               <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                  <UIcon name="i-heroicons-clipboard-document-list" class="w-5 h-5 text-indigo-100" />
               </div>
               <h3 class="text-xl font-black tracking-tight" style="font-family: var(--font-serif)">Booking Summary</h3>
            </div>
            
            <div class="space-y-8">
              <div class="flex justify-between items-center bg-indigo-900/40 p-4 rounded-2xl border border-white/5">
                <span class="text-indigo-300/60 text-[10px] font-black uppercase tracking-[0.2em]">Travelers</span>
                <span class="font-black text-indigo-100 text-sm uppercase tracking-widest">{{ passengers }} Person</span>
              </div>

              <div class="space-y-4">
                <span class="text-indigo-300/60 text-[10px] font-black uppercase tracking-[0.2em] pl-1">Cabin Placements</span>
                <div v-if="selectedSeats.length" class="flex flex-wrap gap-3">
                  <span v-for="s in selectedSeats" :key="s" class="bg-indigo-600/50 backdrop-blur-md text-white font-black px-5 py-3 rounded-2xl border border-white/10 shadow-lg animate-in zoom-in-75 duration-500 scale-100 hover:scale-110 transition-transform tracking-tight text-sm">{{ s }}</span>
                </div>
                <div v-else class="text-indigo-300/30 font-bold text-xs py-4 px-6 border-2 border-dashed border-white/5 rounded-[2rem] text-center">No seats selected yet...</div>
              </div>

              <div class="pt-10 border-t border-white/10 space-y-3">
                <span class="text-indigo-300/60 text-[10px] font-black uppercase tracking-[0.2em] pl-1">Total Investment</span>
                <div class="text-5xl font-black text-white tracking-tighter" style="font-family: var(--font-serif)">
                  {{ formatRupiah(selectedSeats.length * (data?.schedule?.price || 0)) }}
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-6 pt-4">
            <UButton 
              @click="proceedToCheckout" 
              :loading="locking"
              :disabled="selectedSeats.length !== passengers"
              block 
              size="xl" 
              color="primary" 
              class="font-black py-6 rounded-[2rem] shadow-2xl shadow-indigo-600/40 hover-premium text-xs uppercase tracking-[0.2em]"
              icon="i-heroicons-shield-check"
            >
              Secure Choice
            </UButton>
            <div class="flex items-center gap-3 px-6 py-4 bg-indigo-900/30 rounded-2xl border border-white/5">
               <UIcon name="i-heroicons-lock-closed" class="w-4 h-4 text-indigo-400" />
               <p class="text-[9px] text-indigo-300/50 font-bold uppercase tracking-widest leading-relaxed">Encrypted booking lock active for 10 minutes upon confirmation.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const scheduleId = route.query.scheduleId as string
const passengers = parseInt(route.query.passengers?.toString() || '1')

const { data, pending, error } = await useFetch<{ schedule: any, bookedSeats: any[] }>('/api/seats', {
  query: { scheduleId },
  lazy: true
})

const layout = computed(() => {
  if (!data.value?.schedule?.seat_layout) return { rows: 10, cols: 4, aisle: 2 }
  try {
    return JSON.parse(data.value.schedule.seat_layout)
  } catch (e) {
    return { rows: 10, cols: 4, aisle: 2 }
  }
})

const bookedMap = computed(() => {
  const map = new Set<string>()
  data.value?.bookedSeats?.forEach((s: any) => map.add(s.seat_code))
  return map
})

const selectedSeats = ref<string[]>([])
const locking = ref(false)

const getAlphabet = (idx: number) => String.fromCharCode(65 + idx)

const getSeatCode = (row: number, col: number) => {
  const colVal = col > layout.value.aisle ? col - 1 : col;
  return `${row}${getAlphabet(colVal - 1)}`
}

const isBooked = (code: string) => bookedMap.value.has(code)
const isSelected = (code: string) => selectedSeats.value.includes(code)

const toggleSeat = (code: string) => {
  if (isSelected(code)) {
    selectedSeats.value = selectedSeats.value.filter(c => c !== code)
  } else {
    if (selectedSeats.value.length >= passengers) {
      selectedSeats.value.shift()
    }
    selectedSeats.value.push(code)
  }
}

const formatRupiah = (number: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number)
}

const proceedToCheckout = async () => {
  if (selectedSeats.value.length !== passengers) return
  
  locking.value = true
  try {
    const res = await $fetch('/api/seats/lock', {
      method: 'POST',
      body: { scheduleId, seatCodes: selectedSeats.value }
    })

    router.push({
      path: '/checkout',
      query: {
        scheduleId,
        seats: selectedSeats.value.join(','),
        passengers
      }
    })
  } catch (err: any) {
    // @ts-ignore
    const toast = useToast()
    toast.add({
      title: 'Gagal Kunci Kursi',
      description: err.data?.statusMessage || err.message,
      color: 'red'
    })
  } finally {
    locking.value = false
  }
}
</script>
