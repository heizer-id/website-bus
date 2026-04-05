<template>
  <div class="space-y-12 max-w-5xl mx-auto px-4 pb-20">
    <!-- Search Header Summary -->
    <div class="glass-card rounded-[2rem] p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-indigo-500/5">
      <div class="space-y-2 text-center md:text-left">
        <h1 class="text-3xl font-black text-slate-900 tracking-tight" style="font-family: var(--font-serif)">Hasil Pencarian</h1>
        <div class="flex flex-wrap items-center justify-center md:justify-start gap-3 text-slate-500 text-sm font-medium">
          <span class="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full"><UIcon name="i-heroicons-map-pin" class="text-indigo-500" /> {{ from }}</span>
          <UIcon name="i-heroicons-arrow-long-right" />
          <span class="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full"><UIcon name="i-heroicons-map" class="text-indigo-500" /> {{ to }}</span>
          <span class="md:border-l border-slate-200 md:pl-3 ml-1">{{ dateFormatted }}</span>
          <span class="border-l border-slate-200 pl-3 ml-1">{{ passengers }} Penumpang</span>
        </div>
      </div>
      <UButton to="/" variant="soft" color="primary" icon="i-heroicons-pencil-square" class="font-bold px-6 py-2.5 rounded-xl hover-premium">Ubah Cari</UButton>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="space-y-6">
      <USkeleton v-for="i in 3" :key="i" class="h-48 w-full rounded-[2rem]" />
    </div>

    <!-- Empty State -->
    <div v-else-if="!schedules || schedules.length === 0" class="text-center py-20 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
      <div class="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <UIcon name="i-heroicons-calendar-days" class="w-12 h-12 text-slate-300" />
      </div>
      <h2 class="text-2xl font-black text-slate-900">Maaf, Jadwal Tidak Ditemukan</h2>
      <p class="text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">Belum ada bus yang beroperasi untuk rute dan tanggal pilihanmu. Silakan coba tanggal lain.</p>
      <UButton to="/" color="primary" class="mt-8 font-bold px-8 py-3 rounded-2xl" variant="soft">Kembali Beranda</UButton>
    </div>

    <!-- Results List -->
    <div v-else class="space-y-8">
      <div v-for="schedule in sortedSchedules" :key="schedule.id" class="group relative bg-white/40 backdrop-blur-xl border border-white/60 rounded-[3.5rem] p-8 md:p-12 shadow-2xl shadow-indigo-950/5 hover:shadow-indigo-500/10 hover:border-indigo-200/50 transition-all duration-700 overflow-hidden">
        
        <!-- Animated Glow Decor -->
        <div class="absolute -right-20 -top-20 w-64 h-64 bg-indigo-50/50 rounded-full blur-[100px] group-hover:bg-indigo-400/20 transition-all duration-700"></div>

        <div class="flex flex-col lg:flex-row justify-between items-center gap-12 relative z-10">
          
          <!-- Left: Fleet Class & Icon -->
          <div class="flex flex-col items-center lg:items-start gap-4 min-w-[140px]">
             <div class="w-20 h-20 bg-gradient-to-br from-indigo-50 to-white rounded-[2rem] flex items-center justify-center border border-indigo-100/50 shadow-inner group-hover:rotate-6 transition-transform duration-500">
                <UIcon name="i-heroicons-truck" class="w-10 h-10 text-indigo-400 group-hover:text-indigo-600 transition-colors" />
             </div>
             <div class="text-center lg:text-left">
                <div class="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Fleet Class</div>
                <UBadge :color="getClassColor(schedule.bus_class)" variant="solid" class="px-4 py-1.5 rounded-full text-[10px] uppercase font-black tracking-[0.15em] shadow-lg shadow-indigo-100 ring-4 ring-white">{{ schedule.bus_class }}</UBadge>
             </div>
          </div>

          <!-- Middle: Journey Timeline -->
          <div class="flex-1 w-full max-w-2xl px-4">
             <div class="flex items-center justify-between gap-6 md:gap-12 relative h-24">
                <!-- Departure -->
                <div class="space-y-2 text-center md:text-left relative z-10">
                   <div class="text-4xl md:text-5xl font-black text-slate-900 leading-none" style="font-family: var(--font-serif)">{{ timeFormat(schedule.departure_time) }}</div>
                   <div class="flex flex-col">
                      <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{{ schedule.route_from }}</span>
                      <span class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Terminal Pusat</span>
                   </div>
                </div>

                <!-- Connector -->
                <div class="flex-1 flex flex-col items-center gap-3">
                   <div class="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Direct</div>
                   <div class="h-[2px] bg-slate-100 w-full relative">
                      <div class="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-300 rounded-full"></div>
                      <div class="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_10px_#6366f1]"></div>
                      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm">
                         <UIcon name="i-heroicons-paper-airplane" class="w-4 h-4 text-indigo-400 group-hover:translate-x-1.5 transition-transform" />
                      </div>
                   </div>
                   <div class="text-[10px] font-black text-indigo-400/60 uppercase tracking-widest">Nusa Elite Express</div>
                </div>

                <!-- Arrival -->
                <div class="space-y-2 text-center md:text-right relative z-10">
                   <div class="text-4xl md:text-5xl font-black text-slate-900 leading-none" style="font-family: var(--font-serif)">{{ timeFormat(schedule.arrival_time) }}</div>
                   <div class="flex flex-col">
                      <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{{ schedule.route_to }}</span>
                      <span class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Main Terminal</span>
                   </div>
                </div>
             </div>
          </div>
          
          <!-- Right: Action & Price -->
          <div class="w-full lg:w-72 flex flex-col items-center lg:items-end gap-6 bg-slate-50/50 lg:bg-transparent p-6 lg:p-0 rounded-[2.5rem] lg:rounded-none lg:border-l border-indigo-50">
             <div class="text-center lg:text-right space-y-1">
                <div class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Starting From</div>
                <div class="text-4xl font-black text-indigo-600 tracking-tighter" style="font-family: var(--font-serif)">{{ formatRupiah(schedule.price) }}</div>
                <div class="text-[10px] font-bold text-slate-500 bg-white shadow-sm ring-1 ring-slate-100 rounded-full px-4 py-1.5 mt-2 inline-flex items-center gap-2">
                   <div :class="getSeatsColor(schedule.total_seats - schedule.booked_seats)" class="w-2 h-2 rounded-full animate-pulse"></div>
                   <span>{{ schedule.total_seats - schedule.booked_seats }} Left</span>
                </div>
             </div>
             
             <UButton 
                @click="chooseSchedule(schedule.id)" 
                :disabled="(schedule.total_seats - schedule.booked_seats) < passengers"
                color="primary" 
                size="xl"
                block
                class="font-black py-5 rounded-[2rem] shadow-2xl shadow-indigo-100 hover-premium text-xs uppercase tracking-widest"
                :label="(schedule.total_seats - schedule.booked_seats) < passengers ? 'Full' : 'Select Seat'" 
                icon-trailing="i-heroicons-chevron-right"
              />
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const from = (route.query.from as string) || ''
const to = (route.query.to as string) || ''
const date = (route.query.date as string) || ''
const passengers = parseInt(route.query.passengers?.toString() || '1')

const dateFormatted = computed(() => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
})

const { data: schedules, pending } = await useFetch<any[]>('/api/schedules', {
  query: { from, to, date },
  lazy: true
})

const sortedSchedules = computed(() => {
  if (!schedules.value) return []
  return [...schedules.value].sort((a, b) => new Date(a.departure_time).getTime() - new Date(b.departure_time).getTime())
})

const formatRupiah = (number: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number)
}

const timeFormat = (isoString: string) => {
  return new Date(isoString).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

const getClassColor = (cls: string) => {
  switch(cls.toLowerCase()) {
    case 'ekonomi': return 'green'
    case 'bisnis': return 'blue'
    case 'eksekutif': return 'purple'
    case 'sleeper': return 'orange'
    default: return 'gray'
  }
}

const getSeatsColor = (seats: number) => {
  if (seats <= 5) return 'text-red-500 font-medium'
  return 'text-gray-500'
}

const chooseSchedule = (scheduleId: number) => {
  router.push({
    path: '/seat-selection',
    query: {
      scheduleId,
      passengers
    }
  })
}
</script>
