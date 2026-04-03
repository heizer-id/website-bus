<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Hasil Pencarian</h1>
        <p class="text-gray-600">{{ from }} &rarr; {{ to }} &bull; {{ dateFormatted }} &bull; {{ passengers }} Penumpang</p>
      </div>
      <UButton to="/" variant="outline" icon="i-heroicons-arrow-left">Ubah Cari</UButton>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="space-y-4">
      <USkeleton v-for="i in 3" :key="i" class="h-32 w-full rounded-xl" />
    </div>

    <!-- Empty State -->
    <UCard v-else-if="!schedules || schedules.length === 0" class="text-center py-12">
      <UIcon name="i-heroicons-calendar-days" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h2 class="text-xl font-medium text-gray-900">Maaf, Jadwal Tidak Ditemukan</h2>
      <p class="text-gray-500 mt-2">Belum ada bus yang beroperasi untuk rute dan tanggal pilihanmu.</p>
    </UCard>

    <!-- Results -->
    <div v-else class="space-y-4">
      <UCard v-for="schedule in sortedSchedules" :key="schedule.id" class="hover:border-primary-500 transition-colors">
        <div class="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div class="flex-1 w-full space-y-4">
            <div class="flex items-center justify-between md:justify-start gap-4">
              <h3 class="text-lg font-bold text-gray-900">{{ schedule.bus_name }}</h3>
              <UBadge :color="getClassColor(schedule.bus_class)" variant="subtle" class="capitalize">{{ schedule.bus_class }}</UBadge>
            </div>
            
            <div class="flex items-center gap-6">
              <div class="text-center">
                <div class="text-xl font-bold">{{ timeFormat(schedule.departure_time) }}</div>
                <div class="text-sm text-gray-500">{{ schedule.route_from }}</div>
              </div>
              <div class="flex-1 min-w-[100px] flex items-center justify-center">
                 <div class="h-px bg-gray-300 w-full relative">
                    <UIcon name="i-heroicons-chevron-right" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 bg-white px-1" />
                 </div>
              </div>
              <div class="text-center">
                <div class="text-xl font-bold">{{ timeFormat(schedule.arrival_time) }}</div>
                <div class="text-sm text-gray-500">{{ schedule.route_to }}</div>
              </div>
            </div>
          </div>
          
          <div class="w-full md:w-auto md:min-w-[200px] flex flex-row md:flex-col justify-between items-center md:items-end gap-2 md:border-l border-gray-100 pl-0 md:pl-6">
             <div class="text-right">
                <div class="text-2xl font-bold text-primary-600">{{ formatRupiah(schedule.price) }}</div>
                <div class="text-sm" :class="getSeatsColor(schedule.total_seats - schedule.booked_seats)">
                  Sisa {{ schedule.total_seats - schedule.booked_seats }} kursi
                </div>
             </div>
             <UButton 
                @click="chooseSchedule(schedule.id)" 
                :disabled="(schedule.total_seats - schedule.booked_seats) < passengers"
                color="primary" class="font-bold px-6 py-2"
                :label="(schedule.total_seats - schedule.booked_seats) < passengers ? 'Penuh' : 'Pilih'" 
              />
          </div>

        </div>
      </UCard>
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
