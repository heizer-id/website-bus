<template>
  <div class="space-y-12 max-w-6xl mx-auto px-4 pb-24">
    <!-- Header Summary -->
    <div class="flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="space-y-1 text-center md:text-left">
        <h1 class="text-3xl font-black text-slate-900 tracking-tight" style="font-family: var(--font-serif)">Pilih Kursi</h1>
        <p class="text-slate-500 font-medium">Silakan pilih <span class="text-indigo-600 font-bold">{{ passengers }} kursi</span> terbaik untuk perjalanan Anda.</p>
      </div>
      <UButton variant="soft" color="neutral" @click="$router.back()" icon="i-heroicons-arrow-left" class="font-bold border border-slate-100 rounded-xl">Kembali</UButton>
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
      <div class="lg:col-span-8 space-y-8">
        <div class="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-sm relative overflow-hidden">
           <!-- Dynamic Visual Context -->
           <div class="absolute -right-20 top-0 w-64 h-64 bg-slate-50 rounded-full blur-[100px]"></div>
           <div class="absolute -left-20 bottom-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-[100px]"></div>

           <div class="relative z-10 space-y-12">
              <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-8">
                 <div class="space-y-1">
                    <h3 class="font-black text-slate-900 leading-none">{{ data.schedule.bus_name }}</h3>
                    <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">{{ data.schedule.bus_class }} Class</p>
                 </div>
                 <div class="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest">
                    <div class="flex items-center gap-2 text-slate-400"><div class="w-3 h-3 bg-white border-2 border-slate-200 rounded-sm"></div><span>Tersedia</span></div>
                    <div class="flex items-center gap-2 text-indigo-600"><div class="w-3 h-3 bg-indigo-600 rounded-sm"></div><span>Pilihan</span></div>
                    <div class="flex items-center gap-2 text-slate-300"><div class="w-3 h-3 bg-slate-100 border border-slate-200 rounded-sm"></div><span>Terisi</span></div>
                 </div>
              </div>
           
              <div class="flex justify-center">
                 <!-- The Bus Container -->
                 <div class="bg-slate-100/50 p-8 md:p-14 rounded-[4rem] border-4 border-slate-200 inline-block relative shadow-inner">
                    <!-- Steering Wheel / Cockpit -->
                    <div class="absolute top-10 right-10 md:right-16 opacity-10 flex flex-col items-center gap-2">
                       <UIcon name="i-heroicons-lifebuoy" class="w-14 h-14" />
                       <span class="text-[8px] font-black uppercase tracking-[0.3em]">Driver</span>
                    </div>

                    <div class="mt-24 grid gap-4 md:gap-6" :style="{ gridTemplateColumns: `repeat(${layout.cols}, minmax(0, 1fr))` }">
                       <template v-for="row in layout.rows" :key="`row-${row}`">
                          <template v-for="col in layout.cols" :key="`col-${col}`">
                             <!-- Aisle -->
                             <div v-if="col === layout.aisle" class="w-8 md:w-12 h-14 md:h-18 flex items-center justify-center">
                                <div class="w-px h-full bg-slate-200/50 dashed"></div>
                             </div>
                             
                             <button
                               v-else
                               @click="toggleSeat(getSeatCode(row, col))"
                               :disabled="isBooked(getSeatCode(row, col))"
                               class="w-12 h-14 md:w-16 md:h-18 rounded-xl border-2 flex flex-col items-center justify-center gap-1 font-black text-xs md:text-sm transition-all duration-300 focus:outline-none relative group"
                               :class="[
                                 isBooked(getSeatCode(row, col)) ? 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed' :
                                 isSelected(getSeatCode(row, col)) ? 'bg-indigo-600 border-indigo-700 text-white shadow-xl shadow-indigo-200 -translate-y-1 scale-110 z-20' :
                                 'bg-white border-transparent text-slate-500 hover:border-indigo-300 hover:text-indigo-600 shadow-sm'
                               ]"
                             >
                               <!-- Seat Handle Visual -->
                               <div class="absolute -top-1 inset-x-2 h-1 rounded-full overflow-hidden opacity-20" :class="isSelected(getSeatCode(row, col)) ? 'bg-white' : 'bg-slate-400'"></div>
                               
                               <span class="relative z-10">{{ getSeatCode(row, col) }}</span>
                               
                               <!-- Status Dot -->
                               <div v-if="!isBooked(getSeatCode(row, col))" class="w-1 h-1 rounded-full transition-colors" :class="isSelected(getSeatCode(row, col)) ? 'bg-indigo-300' : 'bg-slate-200 group-hover:bg-indigo-400'"></div>
                             </button>
                          </template>
                       </template>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <!-- Price/Summary Sidebar -->
      <div class="lg:col-span-4 h-fit sticky top-28">
        <div class="glass-card rounded-[3rem] p-8 md:p-10 space-y-10 shadow-indigo-500/5 border-indigo-100/30">
          <div class="space-y-2">
            <h3 class="text-xl font-black text-slate-900 border-b border-slate-100 pb-6 mb-6">Ringkasan Pesanan</h3>
            
            <div class="space-y-6">
              <div class="flex justify-between items-center group">
                <span class="text-slate-400 text-sm font-bold uppercase tracking-widest">Penumpang</span>
                <span class="font-black text-slate-900 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">{{ passengers }} Orang</span>
              </div>
              <div class="space-y-3">
                <span class="text-slate-400 text-sm font-bold uppercase tracking-widest pl-0.5">Kursi Terpilih</span>
                <div v-if="selectedSeats.length" class="flex flex-wrap gap-2 text-indigo-600 transform transition-all duration-300">
                  <span v-for="s in selectedSeats" :key="s" class="bg-indigo-50 text-indigo-700 font-black px-4 py-2 rounded-2xl border border-indigo-100 animate-in zoom-in-75 duration-300">{{ s }}</span>
                </div>
                <div v-else class="text-slate-300 italic text-sm py-2">Belum ada kursi dipilih...</div>
              </div>
              <div class="pt-6 border-t border-slate-100 space-y-2 group">
                <span class="text-slate-400 text-sm font-bold uppercase tracking-widest pl-0.5">Total Harga</span>
                <div class="text-4xl font-black text-indigo-600 transition-all duration-300 group-hover:scale-105 origin-left">{{ formatRupiah(selectedSeats.length * data.schedule.price) }}</div>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <UAlert 
              v-if="selectedSeats.length > 0 && selectedSeats.length < passengers" 
              title="Lengkapi Pilihan" 
              icon="i-heroicons-information-circle"
              :description="`Mohon pilih ${passengers - selectedSeats.length} kursi lagi.`" 
              color="indigo" 
              variant="soft" 
              class="rounded-2xl"
            />

            <UButton 
              @click="proceedToCheckout" 
              :loading="locking"
              :disabled="selectedSeats.length !== passengers"
              block 
              size="xl" 
              color="primary" 
              class="font-black py-5 rounded-[2rem] shadow-xl shadow-indigo-100 hover-premium text-lg"
              icon="i-heroicons-shield-check"
            >
              Konfirmasi Kursi
            </UButton>
            <p class="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest px-4">Kursi Anda akan dikunci selama 5 menit untuk pembayaran.</p>
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
