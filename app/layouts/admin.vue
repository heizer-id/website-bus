<template>
  <div class="min-h-screen bg-gray-50 flex flex-col md:flex-row">
    <aside class="md:w-64 bg-white border-r border-gray-200 shrink-0 flex flex-col h-screen sticky top-0">
      <div class="p-6 border-b border-gray-100 hidden md:block">
        <NuxtLink to="/admin" class="flex items-center gap-2">
          <UIcon name="i-heroicons-shield-check" class="w-8 h-8 text-primary-600" />
          <span class="text-xl font-black text-gray-900 tracking-tight">ADMIN<span class="text-primary-500">BUS</span></span>
        </NuxtLink>
      </div>

      <div class="p-4 md:p-6 space-y-2 flex-grow overflow-y-auto">
        <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">Menu Pusat</p>
        <UVerticalNavigation :links="links" />
      </div>
      
      <div class="p-4 md:p-6 border-t border-gray-100">
        <UButton variant="soft" color="red" block icon="i-heroicons-arrow-left-on-rectangle" @click="handleLogout">Logout Admin</UButton>
      </div>
    </aside>

    <main class="flex-1 p-4 md:p-10 overflow-y-auto">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const links = [
  { label: 'Ikhtisar', icon: 'i-heroicons-chart-pie', to: '/admin' },
  { label: 'Manajemen Armada', icon: 'i-heroicons-truck', to: '/admin/buses' },
  { label: 'Pengaturan Jadwal', icon: 'i-heroicons-calendar-days', to: '/admin/schedules' },
  { label: 'Riwayat Transaksi', icon: 'i-heroicons-currency-dollar', to: '/admin/transactions' },
  { label: 'Lihat Situs Publik', icon: 'i-heroicons-globe-alt', to: '/' }
]

const handleLogout = async () => {
  // @ts-ignore
  const { logout } = useAuth()
  await logout()
}
</script>
