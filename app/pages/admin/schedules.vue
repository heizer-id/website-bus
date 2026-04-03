<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Penugasan Jadwal Armada</h1>
      <UButton color="primary" icon="i-heroicons-plus" @click="isOpen = true">Buat Jadwal Baru</UButton>
    </div>

    <UCard>
      <UTable :rows="data?.schedules || []" :columns="columns" :loading="pending">
        <template #bus_name-data="{ row }">
          <span class="font-bold">{{ row.bus_name }}</span> - <UBadge size="xs" color="blue" variant="soft">{{ row.bus_class }}</UBadge>
        </template>
        <template #departure_time-data="{ row }">
          {{ formatDateTime(row.departure_time) }}
        </template>
        <template #arrival_time-data="{ row }">
          {{ formatDateTime(row.arrival_time) }}
        </template>
        <template #price-data="{ row }">
          {{ formatRupiah(row.price) }}
        </template>
        <template #actions-data="{ row }">
          <UButton color="red" variant="ghost" icon="i-heroicons-trash" size="sm" @click="deleteSchedule(row.id)" />
        </template>
      </UTable>
    </UCard>

    <USlideover v-model="isOpen">
      <div class="p-4 flex-1 flex flex-col">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-bold text-gray-900">Pembuatan Jadwal Baru</h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark" class="-my-1" @click="isOpen = false" />
        </div>
        
        <form @submit.prevent="submitSchedule" class="space-y-4 flex-1 overflow-y-auto">
          <UFormGroup label="Pilih Armada Bus" required v-if="busList">
             <USelect v-model="form.bus_id" :options="busOptions" required />
          </UFormGroup>
          <div class="grid grid-cols-2 gap-4">
             <UFormGroup label="Rute Asal" required>
                <UInput v-model="form.route_from" placeholder="Ex: Jakarta" required />
             </UFormGroup>
             <UFormGroup label="Rute Tujuan" required>
                <UInput v-model="form.route_to" placeholder="Ex: Surabaya" required />
             </UFormGroup>
          </div>
          <div class="space-y-4 border-t pt-4 mt-2">
             <UFormGroup label="Waktu Keberangkatan (ISO)" required>
                <!-- Simplified text input for ease. An advanced picker can be used in prod -->
                <UInput v-model="form.departure_time" type="datetime-local" required />
             </UFormGroup>
             <UFormGroup label="Estimasi Tiba (ISO)" required>
                <UInput v-model="form.arrival_time" type="datetime-local" required />
             </UFormGroup>
          </div>
          <UFormGroup label="Harga Tiket (Rupiah)" required>
             <UInput v-model="form.price" type="number" required />
          </UFormGroup>
          
          <div class="pt-6">
             <UButton type="submit" color="primary" block :loading="saving" size="lg">Publikasi Jadwal</UButton>
          </div>
        </form>
      </div>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// @ts-ignore
definePageMeta({ layout: 'admin', middleware: 'admin' })

// @ts-ignore
const toast = useToast()

const formatRupiah = (number: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number)
}

const formatDateTime = (iso: string) => {
  return new Date(iso).toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

const columns = [
  { key: 'bus_name', label: 'Armada / Kelas' },
  { key: 'route_from', label: 'Asal' },
  { key: 'route_to', label: 'Tujuan' },
  { key: 'departure_time', label: 'Berangkat' },
  { key: 'arrival_time', label: 'Tiba' },
  { key: 'price', label: 'Tarif' },
  { key: 'actions' }
]

const { data, pending, refresh } = await useFetch<any>('/api/admin/schedules')
const { data: busList } = await useFetch<any>('/api/admin/buses')

const busOptions = computed(() => {
   if (!busList.value?.buses) return []
   return busList.value.buses.map((b: any) => ({ label: `${b.name} (${b.class})`, value: b.id }))
})

const isOpen = ref(false)
const saving = ref(false)
const form = ref({
  bus_id: null,
  route_from: '',
  route_to: '',
  departure_time: '',
  arrival_time: '',
  price: 150000
})

const submitSchedule = async () => {
  saving.value = true
  try {
    // Append standard ISO endings if using datetime-local
    const payload = { ...form.value }
    if(payload.departure_time.length === 16) payload.departure_time += ':00.000Z'
    if(payload.arrival_time.length === 16) payload.arrival_time += ':00.000Z'

    await $fetch('/api/admin/schedules', { method: 'POST', body: payload })
    toast.add({ title: 'Jadwal diterbitkan', color: 'green' })
    isOpen.value = false
    refresh()
  } catch (err: any) {
    toast.add({ title: 'Gagal', description: err.message, color: 'red' })
  } finally {
    saving.value = false
  }
}

const deleteSchedule = async (id: number) => {
  if (!confirm('Hapus jadwal ini selamanya?')) return
  try {
    await $fetch('/api/admin/schedules', { method: 'POST', body: { action: 'delete', id } })
    toast.add({ title: 'Jadwal Dihapus', color: 'gray' })
    refresh()
  } catch (err: any) {
    toast.add({ title: 'Gagal', description: err.message, color: 'red' })
  }
}
</script>
