<template>
  <div class="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-100 selection:text-indigo-700">
    <!-- Navbar / Header -->
    <header class="fixed top-6 inset-x-0 z-[60] transition-all duration-500">
      <UContainer>
        <nav class="glass-effect rounded-full px-8 h-20 flex items-center justify-between shadow-2xl shadow-indigo-900/10 border-white/20">
          <NuxtLink to="/" class="flex items-center gap-3 group">
            <div class="bg-indigo-600 p-2 rounded-xl group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-500 shadow-lg shadow-indigo-500/20">
              <UIcon name="i-heroicons-paper-airplane" class="w-6 h-6 text-white" />
            </div>
            <span class="text-2xl font-black text-slate-900 tracking-tighter" style="font-family: var(--font-serif)">NUSA<span class="text-indigo-600">BUS</span></span>
          </NuxtLink>
          
          <div class="flex items-center gap-4 md:gap-8">
            <div class="hidden md:flex items-center gap-8 mr-6">
              <NuxtLink to="/" class="text-xs font-black uppercase tracking-[0.2em] text-slate-900/60 hover:text-indigo-600 transition-all duration-300">Beranda</NuxtLink>
              <NuxtLink to="/cek-booking" class="text-xs font-black uppercase tracking-[0.2em] text-slate-900/60 hover:text-indigo-600 transition-all duration-300">Cek Tiket</NuxtLink>
            </div>
            
            <div class="h-8 w-px bg-slate-200/50 mx-2 hidden md:block"></div>

            <template v-if="pendingAuth">
               <UIcon name="i-heroicons-arrow-path" class="animate-spin w-5 h-5 text-indigo-500" />
            </template>
            <template v-else>
              <!-- User is not logged in -->
              <template v-if="!isAuthenticated">
                <UButton to="/login" variant="ghost" color="neutral" class="font-black text-[10px] uppercase tracking-[0.2em] text-slate-900 hover:bg-slate-100/50">Masuk</UButton>
                <UButton to="/register" color="primary" class="font-black px-10 py-3 rounded-full shadow-2xl shadow-indigo-200 hover-premium text-[10px] uppercase tracking-[0.25em]">Daftar</UButton>
              </template>

              <!-- User is logged in -->
              <template v-else>
                <UDropdown :items="items" :popper="{ placement: 'bottom-end', offsetDistance: 16 }">
                  <UButton variant="soft" color="primary" class="font-bold border-2 border-indigo-50/50 rounded-2xl px-4 flex items-center gap-3">
                    <UAvatar :alt="user?.name" size="2xs" :ui="{ wrapper: 'bg-indigo-100 text-indigo-700 ring-2 ring-white shadow-sm' }" />
                    <span class="truncate max-w-[80px] md:max-w-[120px] text-xs uppercase tracking-widest">{{ user?.name?.split(' ')[0] || 'User' }}</span>
                    <UIcon name="i-heroicons-chevron-down-20-solid" class="w-4 h-4 opacity-50" />
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
    <footer class="bg-indigo-950 text-slate-300 pt-24 pb-12 mt-32 relative overflow-hidden">
      <!-- Decor -->
      <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
      
      <UContainer class="relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          <div class="md:col-span-5 space-y-8">
            <div class="flex items-center gap-3">
              <div class="bg-indigo-600 p-2 rounded-xl">
                 <UIcon name="i-heroicons-paper-airplane" class="w-6 h-6 text-white" />
              </div>
              <span class="text-3xl font-black text-white tracking-tighter" style="font-family: var(--font-serif)">NUSA<span class="text-indigo-400">BUS</span></span>
            </div>
            <p class="text-slate-400 text-base leading-relaxed max-w-md">
              Elite bus travel solutions across Nusantara. We redefine the classic bus journey with cutting-edge technology and uncompromising comfort for the modern traveler.
            </p>
            <div class="flex items-center gap-6">
               <UButton icon="i-simple-icons-instagram" variant="ghost" color="neutral" class="hover:text-white transition-colors" />
               <UButton icon="i-simple-icons-x" variant="ghost" color="neutral" class="hover:text-white transition-colors" />
               <UButton icon="i-simple-icons-linkedin" variant="ghost" color="neutral" class="hover:text-white transition-colors" />
            </div>
          </div>
          
          <div class="md:col-span-2 space-y-8">
            <h4 class="font-black text-white uppercase tracking-[0.2em] text-[10px]">Perusahaan</h4>
            <ul class="space-y-4 text-sm font-medium">
              <li><NuxtLink to="#" class="hover:text-indigo-400 Transition-all">About Us</NuxtLink></li>
              <li><NuxtLink to="#" class="hover:text-indigo-400 Transition-all">Fleet Luxury</NuxtLink></li>
              <li><NuxtLink to="#" class="hover:text-indigo-400 Transition-all">Routes List</NuxtLink></li>
            </ul>
          </div>

          <div class="md:col-span-2 space-y-8">
            <h4 class="font-black text-white uppercase tracking-[0.2em] text-[10px]">Layanan</h4>
            <ul class="space-y-4 text-sm font-medium">
              <li><NuxtLink to="/" class="hover:text-indigo-400 Transition-all">Pesan Tiket</NuxtLink></li>
              <li><NuxtLink to="/cek-booking" class="hover:text-indigo-400 Transition-all">Check In Online</NuxtLink></li>
              <li><NuxtLink to="#" class="hover:text-indigo-400 Transition-all">Bantuan VIP</NuxtLink></li>
            </ul>
          </div>

          <div class="md:col-span-3 space-y-8">
            <h4 class="font-black text-white uppercase tracking-[0.2em] text-[10px]">Eksklusif</h4>
            <p class="text-xs text-slate-500 leading-relaxed">Dapatkan update rute terbaru dan diskon eksklusif langsung ke inbox anda.</p>
            <div class="flex items-center gap-2">
               <UInput placeholder="Email" class="flex-1" :ui="{ base: 'bg-slate-900 border-slate-800' }" />
               <UButton color="primary" icon="i-heroicons-paper-airplane" />
            </div>
          </div>
        </div>

        <div class="border-t border-slate-800/50 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p class="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
            &copy; {{ new Date().getFullYear() }} NUSA BUS ELITE. ALL RIGHTS RESERVED.
          </p>
          <div class="flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
            <NuxtLink to="#" class="hover:text-white transition">Privacy</NuxtLink>
            <NuxtLink to="#" class="hover:text-white transition">Terms of Travel</NuxtLink>
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

