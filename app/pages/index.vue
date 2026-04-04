<template>
  <div class="space-y-24 pb-24">
    <!-- Hero Section -->
    <section class="relative min-h-[70vh] flex items-center -mt-24 overflow-hidden">
      <!-- Background Image with Overlay -->
      <div class="absolute inset-0 z-0">
        <img 
          src="/bus_hero_background_1775326606744.png" 
          alt="Premium Bus Journey" 
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent"></div>
      </div>

      <UContainer class="relative z-10 py-20">
        <div class="max-w-2xl space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 backdrop-blur-md">
            <UIcon name="i-heroicons-sparkles" class="w-4 h-4 text-indigo-300" />
            <span class="text-xs font-bold uppercase tracking-widest text-indigo-100">Solusi Perjalanan Terbaik</span>
          </div>
          <h1 class="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter" style="font-family: var(--font-serif)">
            Jelajahi Negeri <br />
            <span class="text-indigo-400">Tanpa Batas.</span>
          </h1>
          <p class="text-slate-300 text-lg md:text-xl leading-relaxed">
            Pesan tiket bus premium dengan standar keamanan tertinggi. Perjalanan nyaman, aman, dan berkesan hanya untuk Anda.
          </p>
          <div class="flex flex-wrap gap-4 pt-4">
             <div class="flex items-center gap-2 text-white/70 text-sm">
                <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-indigo-400" />
                <span>Armada Terbaru</span>
             </div>
             <div class="flex items-center gap-2 text-white/70 text-sm">
                <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-indigo-400" />
                <span>Pilihan Kursi Bebas</span>
             </div>
             <div class="flex items-center gap-2 text-white/70 text-sm">
                <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-indigo-400" />
                <span>Harga Transparan</span>
             </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Search Section (Floating Container) -->
    <section class="max-w-5xl mx-auto px-4 -mt-32 relative z-30">
      <div class="glass-card rounded-[2.5rem] p-8 md:p-10">
        <div class="flex flex-col gap-8">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-black text-slate-900 flex items-center gap-3">
              <div class="bg-indigo-100 p-2 rounded-xl">
                <UIcon name="i-heroicons-magnifying-glass" class="text-indigo-600 w-6 h-6" /> 
              </div>
              Cek Rute Perjalanan
            </h2>
          </div>
          
          <form @submit.prevent="searchTickets" class="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            
            <div class="md:col-span-3 space-y-2">
              <label class="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Keberangkatan</label>
              <USelect v-model="searchForm.from" :options="cities" placeholder="Pilih Kota" icon="i-heroicons-map-pin" size="xl" class="w-full" />
            </div>
            
            <div class="hidden md:flex md:col-span-1 h-12 items-center justify-center pt-6">
               <div class="w-10 h-10 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-slate-400">
                  <UIcon name="i-heroicons-arrows-right-left" class="w-5 h-5" />
               </div>
            </div>

            <div class="md:col-span-3 space-y-2">
              <label class="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Tujuan</label>
              <USelect v-model="searchForm.to" :options="cities" placeholder="Pilih Kota" icon="i-heroicons-map" size="xl" class="w-full" />
            </div>

            <div class="md:col-span-3 space-y-2">
              <label class="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Tanggal</label>
              <UInput type="date" v-model="searchForm.date" :min="minDate" :max="maxDate" icon="i-heroicons-calendar" size="xl" class="w-full" />
            </div>

            <div class="md:col-span-2">
              <UButton type="submit" size="xl" color="primary" class="w-full font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 hover-premium" icon="i-heroicons-bolt">Cari</UButton>
            </div>
          </form>
          
          <div class="flex items-center gap-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
             <span class="font-bold text-slate-400">POPULER:</span>
             <button type="button" @click="searchForm.from = 'Jakarta'; searchForm.to = 'Surabaya'" class="hover:text-indigo-600 transition">Jakarta &rarr; Surabaya</button>
             <button type="button" @click="searchForm.from = 'Semarang'; searchForm.to = 'Jakarta'" class="hover:text-indigo-600 transition">Semarang &rarr; Jakarta</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <UContainer>
      <div class="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <h3 class="text-3xl md:text-5xl font-black text-slate-900 tracking-tight" style="font-family: var(--font-serif)">Mengapa NUSA<span class="text-indigo-600">BUS?</span></h3>
        <p class="text-slate-500">Nikmati pengalaman memesan tiket bus yang belum pernah Anda rasakan sebelumnya dengan teknologi terkini.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="group h-full p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-500 space-y-6">
          <div class="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
            <UIcon name="i-heroicons-shield-check" class="w-8 h-8" />
          </div>
          <div class="space-y-3">
            <h4 class="text-xl font-bold text-slate-900">Pembayaran Aman</h4>
            <p class="text-slate-500 text-sm leading-relaxed text-pretty">
              Sistem pembayaran terenkripsi yang mendukung QRIS, Transfer Bank, dan E-Wallet melalui gerbang Doku.
            </p>
          </div>
        </div>

        <div class="group h-full p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-500 space-y-6">
          <div class="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
            <UIcon name="i-heroicons-ticket" class="w-8 h-8" />
          </div>
          <div class="space-y-3">
            <h4 class="text-xl font-bold text-slate-900">E-Ticket Instan</h4>
            <p class="text-slate-500 text-sm leading-relaxed text-pretty">
              Setelah pembayaran berhasil, tiket langsung dikirim ke profil Anda. Cukup scan barcode untuk masuk armada.
            </p>
          </div>
        </div>

        <div class="group h-full p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-500 space-y-6">
          <div class="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all duration-500">
            <UIcon name="i-heroicons-sparkles" class="w-8 h-8" />
          </div>
          <div class="space-y-3">
            <h4 class="text-xl font-bold text-slate-900">Pilih Kursi Nyaman</h4>
            <p class="text-slate-500 text-sm leading-relaxed text-pretty">
              Denah bus interaktif memungkinkan Anda memilih kursi favorit langsung saat pemesanan.
            </p>
          </div>
        </div>
      </div>
    </UContainer>

    <!-- App Trust Section -->
    <section class="bg-slate-900 py-24 mx-4 rounded-[3rem] overflow-hidden relative">
       <div class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
       <UContainer class="relative z-10">
         <div class="flex flex-col md:flex-row items-center gap-16">
            <div class="flex-1 space-y-8 text-center md:text-left">
               <h2 class="text-4xl md:text-6xl font-black text-white leading-tight" style="font-family: var(--font-serif)">
                  Siap Meluncur <br />
                  <span class="text-indigo-400">Sekarang?</span>
               </h2>
               <p class="text-slate-400 text-lg">Ribuan pengguna telah mempercayakan perjalanan mereka kepada tim operasional kami.</p>
               <div class="flex flex-col sm:flex-row gap-8 items-center justify-center md:justify-start">
                  <div class="text-center">
                     <div class="text-3xl font-black text-white">500+</div>
                     <div class="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">Armada</div>
                  </div>
                  <div class="text-center border-l border-white/10 pl-8">
                     <div class="text-3xl font-black text-white">100k+</div>
                     <div class="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">Pengguna</div>
                  </div>
                  <div class="text-center border-l border-white/10 pl-8">
                     <div class="text-3xl font-black text-white">4.9/5</div>
                     <div class="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">Rating</div>
                  </div>
               </div>
            </div>
            <div class="flex-1 relative">
               <div class="bg-indigo-600/20 w-72 h-72 rounded-full blur-[100px] absolute -top-10 -left-10"></div>
               <img src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2671&auto=format&fit=crop" alt="App Preview" class="rounded-3xl shadow-2xl border border-white/10 relative z-10" />
            </div>
         </div>
       </UContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const cities = ['Jakarta', 'Surabaya', 'Semarang', 'Yogyakarta', 'Solo', 'Bandung', 'Malang']

// Dates computed client-side only to avoid SSR/client hydration mismatch
const minDate = ref('')
const maxDate = ref('')

const searchForm = ref({
  from: 'Jakarta',
  to: 'Surabaya',
  date: '',
  passengers: 1
})

onMounted(() => {
  const today = new Date()
  const todayStr: string = today.toISOString().split('T')[0]!
  const ninetyDays = new Date()
  ninetyDays.setDate(today.getDate() + 90)
  
  minDate.value = todayStr
  maxDate.value = ninetyDays.toISOString().split('T')[0]!
  searchForm.value.date = todayStr
})

const searchTickets = () => {
  if (!searchForm.value.from || !searchForm.value.to || !searchForm.value.date) {
    alert("Mohon lengkapi kota awal, tujuan, dan tanggal")
    return
  }
  
  if (searchForm.value.from === searchForm.value.to) {
    alert("Kota asal dan tujuan tidak boleh sama")
    return
  }

  router.push({
    path: '/search-results',
    query: {
      from: searchForm.value.from,
      to: searchForm.value.to,
      date: searchForm.value.date,
      passengers: searchForm.value.passengers
    }
  })
}
</script>
