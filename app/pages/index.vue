<template>
  <div class="space-y-32 pb-32 overflow-hidden">
    <!-- Hero & Search Console -->
    <section class="relative min-h-[90vh] flex flex-col items-center justify-center pt-24">
      <!-- Animated Background Overlay -->
      <div class="absolute inset-0 z-0 bg-animate-gradient">
         <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
         <div class="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-50"></div>
      </div>

      <UContainer class="relative z-10 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <!-- Text Content -->
          <div class="space-y-10 text-center lg:text-left">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-700">
              <UIcon name="i-heroicons-sparkles" class="w-4 h-4 text-indigo-400" />
              <span class="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-300">The Ultimate Way to Travel</span>
            </div>
            
            <h1 class="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter animate-in fade-in slide-in-from-left-8 duration-1000 delay-200" style="font-family: var(--font-serif)">
              Elite Journey,<br/>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-100">Across Nusantara.</span>
            </h1>

            <p class="text-indigo-100/60 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed animate-in fade-in slide-in-from-left-8 duration-1000 delay-300">
              Experience the next generation of bus travel with premium fleets, verified safety, and a seamless digital booking experience.
            </p>

            <div class="flex flex-wrap justify-center lg:justify-start gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
               <div class="flex items-center -space-x-3">
                  <UAvatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" size="sm" class="ring-4 ring-slate-900 shadow-xl" />
                  <UAvatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" size="sm" class="ring-4 ring-slate-900 shadow-xl" />
                  <UAvatar src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" size="sm" class="ring-4 ring-slate-900 shadow-xl" />
               </div>
               <div class="text-left">
                  <div class="text-sm font-bold text-white tracking-wide">10k+ Travelers</div>
                  <div class="text-[10px] text-indigo-300/60 uppercase font-black tracking-widest">Trusting NusaBus Every Day</div>
               </div>
            </div>
          </div>

          <!-- Search Console Card -->
          <div class="animate-in fade-in zoom-in-95 duration-1000 delay-300">
            <div class="glass-dark rounded-[3.5rem] p-1 shadow-2xl relative">
              <div class="bg-slate-900/40 backdrop-blur-3xl rounded-[3.2rem] p-8 md:p-12 border border-white/5 space-y-10">
                <div class="space-y-2">
                   <h2 class="text-2xl font-black text-white tracking-tight">Cari Perjalanan</h2>
                   <p class="text-slate-400 text-xs uppercase tracking-widest font-bold">Pilih rute eksklusif anda hari ini</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                  <!-- From/To -->
                  <div class="space-y-4">
                    <UFormGroup label="Kota Asal" :ui="{ label: { base: 'text-indigo-300/60 font-black uppercase tracking-[0.2em] text-[10px] mb-2 px-1' } }">
                       <USelect v-model="searchForm.from" :options="cities" size="xl" color="white" :ui="{ base: 'premium-input h-14' }" />
                    </UFormGroup>
                  </div>
                  
                  <div class="absolute left-1/2 top-[52px] -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
                     <UButton icon="i-heroicons-arrows-right-left" size="sm" color="white" variant="link" class="rounded-full shadow-2xl bg-indigo-600 text-white hover:rotate-180 transition-all duration-700 ring-4 ring-slate-900 w-10 h-10 p-0 flex items-center justify-center" />
                  </div>

                  <div class="space-y-4">
                    <UFormGroup label="Kota Tujuan" :ui="{ label: { base: 'text-indigo-300/60 font-black uppercase tracking-[0.2em] text-[10px] mb-2 px-1' } }">
                       <USelect v-model="searchForm.to" :options="cities" size="xl" color="white" :ui="{ base: 'premium-input h-14' }" />
                    </UFormGroup>
                  </div>

                  <div class="space-y-4">
                    <UFormGroup label="Tanggal Pergi" :ui="{ label: { base: 'text-indigo-300/60 font-black uppercase tracking-[0.2em] text-[10px] mb-2 px-1' } }">
                       <UInput v-model="searchForm.date" type="date" size="xl" :min="minDate" :max="maxDate" color="white" :ui="{ base: 'premium-input h-14' }" />
                    </UFormGroup>
                  </div>

                  <div class="space-y-4">
                    <UFormGroup label="Jumlah Penumpang" :ui="{ label: { base: 'text-indigo-300/60 font-black uppercase tracking-[0.2em] text-[10px] mb-2 px-1' } }">
                       <UInput v-model="searchForm.passengers" type="number" min="1" max="10" size="xl" color="white" :ui="{ base: 'premium-input h-14' }" />
                    </UFormGroup>
                  </div>
                </div>

                <UButton 
                  @click="searchTickets" 
                  color="primary" 
                  size="xl" 
                  block 
                  class="font-black py-6 rounded-[2rem] shadow-2xl shadow-indigo-600/30 hover-premium text-base uppercase tracking-widest overflow-hidden relative group"
                >
                   <span class="relative z-10">Cari Jadwal Terbaik</span>
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Features Section -->
    <UContainer>
      <div class="text-center max-w-2xl mx-auto mb-20 space-y-4">
        <h3 class="text-4xl md:text-6xl font-black text-slate-900 tracking-tight" style="font-family: var(--font-serif)">Kenapa Memilih<br/><span class="text-indigo-600">Nusa Bus Elite?</span></h3>
        <p class="text-slate-500 text-lg">Kami menghadirkan standar baru dalam perjalanan bus antar kota.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div class="group p-10 rounded-[3rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all duration-500 space-y-8">
          <div class="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
            <UIcon name="i-heroicons-shield-check" class="w-10 h-10" />
          </div>
          <div class="space-y-4">
            <h4 class="text-2xl font-bold text-slate-900">Safety First</h4>
            <p class="text-slate-500 leading-relaxed">Protokol keamanan ketat dan armada yang selalu dalam kondisi prima untuk ketenangan anda.</p>
          </div>
        </div>

        <div class="group p-10 rounded-[3rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all duration-500 space-y-8">
          <div class="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
            <UIcon name="i-heroicons-ticket" class="w-10 h-10" />
          </div>
          <div class="space-y-4">
            <h4 class="text-2xl font-bold text-slate-900">Elite Booking</h4>
            <p class="text-slate-500 leading-relaxed">Proses pemesanan instan dengan sistem pemilihan kursi real-time yang akurat.</p>
          </div>
        </div>

        <div class="group p-10 rounded-[3rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all duration-500 space-y-8">
          <div class="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all duration-500">
            <UIcon name="i-heroicons-sparkles" class="w-10 h-10" />
          </div>
          <div class="space-y-4">
            <h4 class="text-2xl font-bold text-slate-900">Luxury Fleet</h4>
            <p class="text-slate-500 leading-relaxed">Nikmati fasilitas mewah mulai dari kursi sleeper hingga hiburan premium selama perjalanan.</p>
          </div>
        </div>
      </div>
    </UContainer>
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

<style scoped>
@reference "~/assets/css/main.css";

:deep(.premium-input-style select),
:deep(.premium-input-style input) {
  @apply bg-slate-800/80 border-slate-700/50 text-white font-bold rounded-2xl focus:ring-indigo-500 focus:border-indigo-500;
}
</style>
