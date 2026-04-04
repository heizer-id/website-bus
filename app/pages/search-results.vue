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
    <div v-else class="space-y-6">
      <div v-for="schedule in sortedSchedules" :key="schedule.id" class="group relative bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all duration-500 overflow-hidden">
        <!-- Accent Glow -->
        <div class="absolute -right-20 -top-20 w-40 h-40 bg-indigo-50/50 rounded-full blur-3xl group-hover:bg-indigo-100/50 transition-colors duration-500"></div>

        <div class="flex flex-col md:flex-row justify-between items-stretch gap-10">
          
          <!-- Left: Bus & Route Info -->
          <div class="flex-1 space-y-8">
            <div class="flex items-center gap-4">
               <div class="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
                  <UIcon name="i-heroicons-truck" class="w-6 h-6 text-slate-400 group-hover:text-indigo-600 transition-colors" />
               </div>
               <div>
                  <h3 class="text-xl font-black text-slate-900 tracking-tight">{{ schedule.bus_name }}</h3>
                  <UBadge :color="getClassColor(schedule.bus_class)" variant="solid" class="mt-1 px-2.5 py-0.5 rounded-lg text-[10px] uppercase font-black tracking-widest ring-4 ring-white shadow-sm">{{ schedule.bus_class }}</UBadge>
               </div>
            </div>
            
            <div class="flex items-center justify-between md:justify-start gap-8 md:gap-16">
              <div class="space-y-1">
                <div class="text-3xl font-black text-slate-900" style="font-family: var(--font-serif)">{{ timeFormat(schedule.departure_time) }}</div>
                <div class="text-xs font-bold text-slate-400 uppercase tracking-widest">{{ schedule.route_from }}</div>
              </div>

              <div class="flex-1 max-w-[120px] flex flex-col items-center gap-2">
                 <div class="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">Langsung</div>
                 <div class="h-px bg-slate-200 w-full relative">
                    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-indigo-500 rounded-full ring-4 ring-indigo-50 group-hover:scale-125 transition-transform duration-500"></div>
                 </div>
                 <div class="flex items-center gap-1 text-[10px] font-bold text-indigo-400">
                    <UIcon name="i-heroicons-bolt text-xs" />
                    <span>Express</span>
                 </div>
              </div>

              <div class="space-y-1 text-right md:text-left">
                <div class="text-3xl font-black text-slate-900" style="font-family: var(--font-serif)">{{ timeFormat(schedule.arrival_time) }}</div>
                <div class="text-xs font-bold text-slate-400 uppercase tracking-widest">{{ schedule.route_to }}</div>
              </div>
            </div>
          </div>
          
          <!-- Right: Pricing & Action -->
          <div class="w-full md:w-56 flex flex-row md:flex-col justify-between items-center md:items-end gap-6 md:border-l border-slate-100 pl-0 md:pl-10 relative z-10">
             <div class="text-right space-y-1">
                <div class="text-sm font-bold text-slate-400 uppercase tracking-widest">Mulai Dari</div>
                <div class="text-3xl font-black text-indigo-600">{{ formatRupiah(schedule.price) }}</div>
                <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100" :class="getSeatsColor(schedule.total_seats - schedule.booked_seats)">
                   <UIcon name="i-heroicons-users" class="w-3.5 h-3.5 opacity-50" />
                   <span class="text-xs font-bold">Sisa {{ schedule.total_seats - schedule.booked_seats }} kursi</span>
                </div>
             </div>
             
             <UButton 
                @click="chooseSchedule(schedule.id)" 
                :disabled="(schedule.total_seats - schedule.booked_seats) < passengers"
                color="primary" 
                size="xl"
                class="w-full md:w-auto font-black px-10 py-5 rounded-3xl shadow-xl shadow-indigo-200 hover-premium"
                :label="(schedule.total_seats - schedule.booked_seats) < passengers ? 'Penuh' : 'Pilih Kursi'" 
                icon-trailing="i-heroicons-arrow-right"
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
