<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Navbar / Header -->
    <header class="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <UContainer class="flex items-center justify-between h-16 h-max-16">
        <NuxtLink to="/" class="flex items-center gap-2">
          <UIcon name="i-heroicons-paper-airplane" class="w-8 h-8 text-primary-600" />
          <span class="text-xl font-black text-gray-900 tracking-tight">NUSA<span class="text-primary-500">BUS</span></span>
        </NuxtLink>
        
        <nav class="flex items-center gap-4">
          <NuxtLink to="/" class="text-sm font-medium text-gray-600 hover:text-primary-600 transition">Beranda</NuxtLink>
          
          <template v-if="pendingAuth">
             <UIcon name="i-heroicons-arrow-path" class="animate-spin w-5 h-5 text-gray-400" />
          </template>
          <template v-else>
            <!-- User is not logged in -->
            <template v-if="!isAuthenticated">
              <UButton to="/login" variant="ghost" color="gray">Masuk</UButton>
              <UButton to="/register" color="primary">Daftar</UButton>
            </template>

            <!-- User is logged in -->
            <template v-else>
              <UDropdown :items="items" :popper="{ placement: 'bottom-end' }">
                <UButton color="white" trailing-icon="i-heroicons-chevron-down-20-solid">
                  <UIcon name="i-heroicons-user-circle" class="w-5 h-5 mr-1 text-primary-500" />
                  <span class="truncate max-w-[100px]">{{ user?.name?.split(' ')[0] || 'User' }}</span>
                </UButton>
              </UDropdown>
            </template>
          </template>
        </nav>
      </UContainer>
    </header>

    <!-- Page Content -->
    <main class="flex-grow">
      <slot />
    </main>
    
    <!-- Footer -->
    <footer class="bg-white border-t border-gray-100 py-8 mt-auto">
      <UContainer class="text-center text-sm text-gray-500">
        &copy; <ClientOnly>{{ new Date().getFullYear() }}<template #fallback>2025</template></ClientOnly> PO Nusantara Bus. All rights reserved.
      </UContainer>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

// @ts-ignore
const { user, isAuthenticated, fetchUser, isAdmin, logout } = useAuth()
// Start as false so SSR and initial client state match (no spinner on server)
const pendingAuth = ref(false)

onMounted(async () => {
   if (!isAuthenticated.value) {
      // Show spinner only after hydration, preventing mismatch
      pendingAuth.value = true
      await fetchUser()
      pendingAuth.value = false
   }
})

const handleLogout = async () => {
    await logout()
    window.location.reload()
}

const items = computed(() => {
  const menus = [
    [
      { label: isAdmin.value ? 'Masuk Dasbor Admin' : 'Riwayat Pesanan Saya', icon: isAdmin.value ? 'i-heroicons-shield-check' : 'i-heroicons-ticket', to: isAdmin.value ? '/admin' : '/user' }
    ],
    [
      { label: 'Keluar Akun', icon: 'i-heroicons-arrow-left-on-rectangle', click: handleLogout }
    ]
  ]
  return menus
})
</script>
