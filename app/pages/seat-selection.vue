<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Pilih Kursi</h1>
        <p class="text-gray-600">Pilih {{ passengers }} kursi untuk perjalanan Anda.</p>
      </div>
      <UButton variant="ghost" @click="$router.back()" icon="i-heroicons-arrow-left">Kembali</UButton>
    </div>

    <div v-if="pending" class="flex justify-center p-12">
      <UIcon name="i-heroicons-arrow-path" class="w-10 h-10 animate-spin text-primary-500" />
    </div>

    <div v-else-if="error || !data?.schedule" class="text-red-500 text-center p-8">
      Ada kesalahan saat memuat data denah kursi.
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      <!-- Seat Map -->
      <UCard class="md:col-span-2 shadow-lg">
         <template #header>
            <div class="flex justify-between items-center">
               <h3 class="font-bold">Denah Bus: {{ data.schedule.bus_name }}</h3>
               <div class="flex space-x-4 text-sm hidden md:flex">
                  <div class="flex items-center space-x-1"><div class="w-4 h-4 bg-white border border-gray-300 rounded"></div><span>Tersedia</span></div>
                  <div class="flex items-center space-x-1"><div class="w-4 h-4 bg-primary-500 rounded"></div><span>Dipilih</span></div>
                  <div class="flex items-center space-x-1"><div class="w-4 h-4 bg-gray-400 rounded opacity-60"></div><span>Terisi</span></div>
               </div>
            </div>
         </template>
        
         <div class="flex justify-center my-8">
           <!-- Layout Render -->
           <div class="bg-gray-50 p-6 md:p-10 rounded-[3rem] border-4 border-gray-300 inline-block overflow-x-auto relative shadow-inner">
              <!-- Steering Wheel Icon -->
              <div class="absolute top-6 right-8 md:right-12 opacity-30">
                <UIcon name="i-heroicons-lifebuoy" class="w-12 h-12" />
              </div>
              
              <div class="mt-20 grid gap-3 md:gap-4" :style="{ gridTemplateColumns: `repeat(${layout.cols}, minmax(0, 1fr))` }">
                 <template v-for="row in layout.rows" :key="`row-${row}`">
                    <template v-for="col in layout.cols" :key="`col-${col}`">
                       <!-- Empty space for aisle -->
                       <div v-if="col === layout.aisle" class="w-6 md:w-10 h-12 md:h-14"></div>
                       
                       <button
                         v-else
                         @click="toggleSeat(getSeatCode(row, col))"
                         :disabled="isBooked(getSeatCode(row, col))"
                         class="w-10 h-12 md:w-14 md:h-16 rounded-t-xl rounded-b-md border-2 flex items-center justify-center font-bold text-xs md:text-sm transition-all focus:outline-none"
                         :class="[
                           isBooked(getSeatCode(row, col)) ? 'bg-gray-400 border-gray-500 text-white cursor-not-allowed opacity-60' :
                           isSelected(getSeatCode(row, col)) ? 'bg-primary-500 border-primary-600 text-white shadow-md transform scale-105 ring-2 ring-primary-300 ring-offset-1' :
                           'bg-white border-gray-300 text-gray-700 hover:border-primary-400 hover:bg-primary-50 cursor-pointer shadow-sm'
                         ]"
                       >
                         {{ getSeatCode(row, col) }}
                       </button>
                    </template>
                 </template>
              </div>
           </div>
         </div>
      </UCard>

      <!-- Sidebar -->
      <UCard class="shadow-lg h-fit sticky top-24">
        <h3 class="font-bold text-lg mb-4 text-gray-800 border-b pb-2">Ringkasan Pemesanan</h3>
        
        <div class="space-y-4">
          <div class="flex justify-between">
            <span class="text-gray-500">Jumlah Penumpang</span>
            <span class="font-bold">{{ passengers }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Kursi Dipilih</span>
            <span class="font-bold text-primary-600">{{ selectedSeats.length ? selectedSeats.join(', ') : '-' }}</span>
          </div>
          <div class="flex justify-between border-t pt-4">
            <span class="text-gray-500">Total Harga</span>
            <span class="text-2xl font-bold text-primary-600">{{ formatRupiah(selectedSeats.length * data.schedule.price) }}</span>
          </div>
        </div>

        <div class="mt-8 space-y-3">
          <UAlert v-if="selectedSeats.length > 0 && selectedSeats.length < passengers" title="Sisa Kursi" :description="`Silakan pilih ${passengers - selectedSeats.length} kursi lagi.`" color="blue" variant="subtle" />

          <UButton 
            @click="proceedToCheckout" 
            :loading="locking"
            :disabled="selectedSeats.length !== passengers"
            block size="xl" color="primary" class="font-bold">
            Lanjut ke Pembayaran
          </UButton>
        </div>
      </UCard>

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
