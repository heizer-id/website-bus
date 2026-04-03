<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Manajemen Armada Bus</h1>
      <UButton color="primary" icon="i-heroicons-plus" @click="isOpen = true">Tambah Bus Baru</UButton>
    </div>

    <UCard>
      <UTable :rows="data?.buses || []" :columns="columns" :loading="pending">
        <template #seat_layout-data="{ row }">
          <UBadge color="gray" variant="soft">
            {{ JSON.parse(row.seat_layout).rows }}x{{ JSON.parse(row.seat_layout).cols }} (Lorong: {{ JSON.parse(row.seat_layout).aisle }})
          </UBadge>
        </template>
        <template #actions-data="{ row }">
          <UButton color="red" variant="ghost" icon="i-heroicons-trash" size="sm" @click="deleteBus(row.id)" />
        </template>
      </UTable>
    </UCard>

    <USlideover v-model="isOpen">
      <div class="p-4 flex-1 flex flex-col">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-bold text-gray-900">Tambah Bus Baru</h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark" class="-my-1" @click="isOpen = false" />
        </div>
        
        <form @submit.prevent="submitBus" class="space-y-4 flex-1 overflow-y-auto">
          <UFormGroup label="Nama Bus" required>
             <UInput v-model="form.name" placeholder="contoh: PO Haryanto VIP" required />
          </UFormGroup>
          <UFormGroup label="Kelas" required>
             <USelect v-model="form.busClass" :options="['Ekonomi', 'VIP', 'Eksekutif', 'Sleeper']" required />
          </UFormGroup>
          <UFormGroup label="Total Kursi" required>
             <UInput v-model="form.totalSeats" type="number" required />
          </UFormGroup>
          <div class="space-y-2 border-t pt-2 mt-4 border-gray-200">
            <p class="text-sm font-bold text-gray-600">Kustomisasi Tata Letak Kursi</p>
            <div class="grid grid-cols-3 gap-2">
              <UFormGroup label="Total Baris">
                <UInput v-model="form.layoutConfig.rows" type="number" min="1" max="15" required />
              </UFormGroup>
              <UFormGroup label="Kolom Kiri+Kanan">
                 <UInput v-model="form.layoutConfig.cols" type="number" min="2" max="6" required />
              </UFormGroup>
              <UFormGroup label="Posisi Lorong">
                 <UInput v-model="form.layoutConfig.aisle" type="number" min="1" max="5" required />
              </UFormGroup>
            </div>
            <p class="text-xs text-gray-400 mt-1">Misal: Kolom=4 & Lorong=2 (berarti format 2-2).</p>
          </div>
          
          <div class="pt-6">
             <UButton type="submit" color="primary" block :loading="saving" size="lg">Simpan Armada</UButton>
          </div>
        </form>
      </div>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// @ts-ignore
definePageMeta({ layout: 'admin', middleware: 'admin' })

// @ts-ignore
const toast = useToast()

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Nama Bus' },
  { key: 'class', label: 'Kelas' },
  { key: 'total_seats', label: 'Jumlah Kursi' },
  { key: 'seat_layout', label: 'Format Baris' },
  { key: 'actions' }
]

const { data, pending, refresh } = await useFetch<any>('/api/admin/buses')

const isOpen = ref(false)
const saving = ref(false)
const form = ref({
  name: '',
  busClass: 'Eksekutif',
  totalSeats: 30,
  layoutConfig: { rows: 10, cols: 4, aisle: 2 }
})

const submitBus = async () => {
  saving.value = true
  try {
    await $fetch('/api/admin/buses', { method: 'POST', body: form.value })
    toast.add({ title: 'Sukses', description: 'Armada ditambahkan', color: 'green' })
    isOpen.value = false
    refresh()
    form.value.name = ''
  } catch (err: any) {
    toast.add({ title: 'Gagal', description: err.message || 'Error', color: 'red' })
  } finally {
    saving.value = false
  }
}

const deleteBus = async (id: number) => {
  if (!confirm('Apakah Yakin ingin menghapus armada ini?')) return
  try {
    await $fetch('/api/admin/buses', { method: 'POST', body: { action: 'delete', id } })
    toast.add({ title: 'Data Dihapus', color: 'gray' })
    refresh()
  } catch (err: any) {
    toast.add({ title: 'Gagal', description: err.message, color: 'red' })
  }
}
</script>
