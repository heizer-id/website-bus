<template>
  <div class="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-100 selection:text-indigo-700">
    <!-- Navbar / Header -->
    <header class="fixed top-0 inset-x-0 z-[60] py-4 transition-all duration-300">
      <UContainer>
        <nav class="glass-effect rounded-2xl px-6 h-16 flex items-center justify-between shadow-lg shadow-indigo-500/5">
          <NuxtLink to="/" class="flex items-center gap-2 group">
            <div class="bg-indigo-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300">
              <UIcon name="i-heroicons-paper-airplane" class="w-6 h-6 text-white" />
            </div>
            <span class="text-2xl font-black text-slate-900 tracking-tighter" style="font-family: var(--font-serif)">NUSA<span class="text-indigo-600">BUS</span></span>
          </NuxtLink>
          
          <div class="flex items-center gap-2 md:gap-6">
            <div class="hidden md:flex items-center gap-6 mr-4">
              <NuxtLink to="/" class="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition tracking-wide">Beranda</NuxtLink>
              <NuxtLink to="/cek-booking" class="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition tracking-wide">Cek Tiket</NuxtLink>
            </div>
            
            <div class="h-6 w-px bg-slate-200 mx-2 hidden md:block"></div>

            <template v-if="pendingAuth">
               <UIcon name="i-heroicons-arrow-path" class="animate-spin w-5 h-5 text-indigo-500" />
            </template>
            <template v-else>
              <!-- User is not logged in -->
              <template v-if="!isAuthenticated">
                <UButton to="/login" variant="ghost" color="neutral" class="font-bold">Masuk</UButton>
                <UButton to="/register" color="primary" class="font-bold px-6 shadow-md shadow-indigo-200">Daftar</UButton>
              </template>

              <!-- User is logged in -->
              <template v-else>
                <UDropdown :items="items" :popper="{ placement: 'bottom-end', offsetDistance: 12 }">
                  <UButton variant="soft" color="primary" class="font-bold border border-indigo-100">
                    <template #leading>
                      <UAvatar :alt="user?.name" size="2xs" :ui="{ wrapper: 'bg-indigo-100 text-indigo-700' }" />
                    </template>
                    <span class="truncate max-w-[80px] md:max-w-[120px]">{{ user?.name?.split(' ')[0] || 'User' }}</span>
                    <template #trailing>
                      <UIcon name="i-heroicons-chevron-down-20-solid" class="w-4 h-4 opacity-50" />
                    </template>
                  </UButton>
                </UDropdown>
              </template>
            </template>
          </div>
        </nav>
      </UContainer>
    </header>

    <!-- Page Content -->
    <main class="flex-grow pt-24">
      <slot />
    </main>
    
    <!-- Premium Footer -->
    <footer class="bg-white border-t border-slate-100 pt-16 pb-8 mt-20">
      <UContainer>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div class="md:col-span-1 space-y-6">
            <div class="flex items-center gap-2">
              <span class="text-2xl font-black text-slate-900 tracking-tighter" style="font-family: var(--font-serif)">NUSA<span class="text-indigo-600">BUS</span></span>
            </div>
            <p class="text-slate-500 text-sm leading-relaxed">
              Platform pemesanan tiket bus terpercaya di Indonesia. Kami menghubungkan Anda ke berbagai destinasi dengan layanan armada terbaik dan harga transparan.
            </p>
            <div class="flex items-center gap-4">
               <UButton icon="i-simple-icons-facebook" variant="ghost" color="neutral" />
               <UButton icon="i-simple-icons-instagram" variant="ghost" color="neutral" />
               <UButton icon="i-simple-icons-x" variant="ghost" color="neutral" />
            </div>
          </div>
          
          <div class="space-y-6">
            <h4 class="font-bold text-slate-900 uppercase tracking-widest text-xs">Informasi</h4>
            <ul class="space-y-3 text-sm text-slate-500">
              <li><NuxtLink to="#" class="hover:text-indigo-600 transition">Tentang Kami</NuxtLink></li>
              <li><NuxtLink to="#" class="hover:text-indigo-600 transition">Syarat & Ketentuan</NuxtLink></li>
              <li><NuxtLink to="#" class="hover:text-indigo-600 transition">Kebijakan Privasi</NuxtLink></li>
              <li><NuxtLink to="#" class="hover:text-indigo-600 transition">Hubungi Kami</NuxtLink></li>
            </ul>
          </div>

          <div class="space-y-6">
            <h4 class="font-bold text-slate-900 uppercase tracking-widest text-xs">Pemesanan</h4>
            <ul class="space-y-3 text-sm text-slate-500">
              <li><NuxtLink to="/" class="hover:text-indigo-600 transition">Cari Tiket</NuxtLink></li>
              <li><NuxtLink to="/cek-booking" class="hover:text-indigo-600 transition">Cek Status Pesanan</NuxtLink></li>
              <li><NuxtLink to="#" class="hover:text-indigo-600 transition">Bantuan</NuxtLink></li>
            </ul>
          </div>

          <div class="space-y-6">
            <h4 class="font-bold text-slate-900 uppercase tracking-widest text-xs">Partner Pembayaran</h4>
            <div class="grid grid-cols-3 gap-4 opacity-50 grayscale hover:grayscale-0 transition duration-500">
               <div class="h-8 bg-slate-100 rounded flex items-center justify-center font-bold text-[10px] text-slate-400">DOKU</div>
               <div class="h-8 bg-slate-100 rounded flex items-center justify-center font-bold text-[10px] text-slate-400">QRIS</div>
               <div class="h-8 bg-slate-100 rounded flex items-center justify-center font-bold text-[10px] text-slate-400">BCA</div>
            </div>
          </div>
        </div>

        <div class="border-t border-slate-50 pt-8 text-center sm:flex sm:justify-between sm:text-left">
          <p class="text-sm text-slate-400">
            &copy; {{ new Date().getFullYear() }} PO Nusantara Bus. Seluruh hak cipta dilindungi.
          </p>
          <div class="mt-4 sm:mt-0 flex gap-6 justify-center sm:justify-end text-xs text-slate-400">
            <span>Powered by Nuxt 3 & D1 Database</span>
          </div>
        </div>
      </UContainer>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

// @ts-ignore
const { user, isAuthenticated, fetchUser, isAdmin, logout } = useAuth()
const pendingAuth = ref(false)

onMounted(async () => {
   if (!isAuthenticated.value) {
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
      { label: isAdmin.value ? 'Admin Dashboard' : 'Pesanan Saya', icon: isAdmin.value ? 'i-heroicons-shield-check' : 'i-heroicons-ticket', to: isAdmin.value ? '/admin' : '/user' }
    ],
    [
      { label: 'Keluar Akun', icon: 'i-heroicons-arrow-left-on-rectangle', click: handleLogout }
    ]
  ]
  return menus
})
</script>

