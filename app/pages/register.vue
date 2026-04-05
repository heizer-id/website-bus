<template>
  <div class="min-h-[90vh] flex items-center justify-center px-4 relative pt-20">
    <!-- Background Decor -->
    <div class="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-indigo-500/10 to-transparent -z-10 blur-3xl"></div>
    
    <div class="w-full max-w-xl animate-in fade-in zoom-in-95 duration-1000">
      <div class="premium-card relative overflow-hidden group">
        <!-- Decoration -->
        <div class="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-[120px] group-hover:bg-indigo-500/20 transition-all duration-700"></div>
        
        <div class="relative z-10 space-y-12">
          <div class="text-center space-y-3">
             <div class="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-[2.5rem] shadow-2xl shadow-indigo-500/40 mb-6 group-hover:rotate-6 transition-transform duration-700">
                <UIcon name="i-heroicons-sparkles" class="w-12 h-12 text-white" />
             </div>
             <h1 class="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter" style="font-family: var(--font-serif)">Join the <span class="text-indigo-600">Elite</span></h1>
             <p class="text-slate-500 text-lg font-medium">Initialize your membership for Nusantara's premier travel service.</p>
          </div>
 
          <form @submit.prevent="handleRegister" class="space-y-8">
            <UFormGroup label="Professional Alias" :ui="{ label: { base: 'text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1' } }">
              <UInput 
                v-model="name" 
                placeholder="Ex. John Sterling" 
                size="xl"
                :ui="{ base: 'bg-slate-50 border-slate-200 h-14 rounded-2xl font-bold focus:ring-2 focus:ring-indigo-500/50' }"
              >
                <template #leading>
                  <UIcon name="i-heroicons-user" class="text-slate-400" />
                </template>
              </UInput>
            </UFormGroup>
 
            <UFormGroup label="Secure Email" :ui="{ label: { base: 'text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1' } }">
              <UInput 
                v-model="email" 
                type="email" 
                placeholder="client@luxurydomain.com" 
                size="xl"
                :ui="{ base: 'bg-slate-50 border-slate-200 h-14 rounded-2xl font-bold focus:ring-2 focus:ring-indigo-500/50' }"
              >
                <template #leading>
                  <UIcon name="i-heroicons-envelope" class="text-slate-400" />
                </template>
              </UInput>
            </UFormGroup>
            
            <UFormGroup label="Private Access Key" :ui="{ label: { base: 'text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1' } }">
              <UInput 
                v-model="password" 
                type="password" 
                placeholder="••••••••" 
                size="xl"
                :ui="{ base: 'bg-slate-50 border-slate-200 h-14 rounded-2xl font-bold focus:ring-2 focus:ring-indigo-500/50' }"
              >
                <template #leading>
                  <UIcon name="i-heroicons-lock-closed" class="text-slate-400" />
                </template>
              </UInput>
            </UFormGroup>
 
            <UButton 
              type="submit" 
              block 
              color="primary" 
              size="xl" 
              class="font-black py-7 rounded-[2.5rem] shadow-2xl shadow-indigo-600/30 hover-premium text-xs uppercase tracking-[0.25em] mt-10" 
              :loading="loading"
              icon="i-heroicons-bolt"
            >
              Initialize Membership
            </UButton>
          </form>
 
          <div class="pt-8 border-t border-slate-100/50 text-center">
            <p class="text-slate-500 text-sm font-medium">
              Already hold a premium credential? 
              <ULink to="/login" class="text-indigo-600 font-black uppercase tracking-widest text-[10px] hover:text-indigo-700 ml-1 underline underline-offset-4">Sign In</ULink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// @ts-ignore
definePageMeta({
  middleware: 'guest'
})

const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const router = useRouter()

const handleRegister = async () => {
  loading.value = true
  try {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: { name: name.value, email: email.value, password: password.value }
    })
    
    // @ts-ignore
    const { fetchUser } = useAuth()
    await fetchUser()

    // @ts-ignore
    const toast = useToast()
    toast.add({ title: 'Authorization Success', description: 'Elite Membership Initialized!', color: 'green' })
    
    router.push('/')

  } catch (err: any) {
    // @ts-ignore
    const toast = useToast()
    toast.add({ title: 'Enrollment Failed', description: err.data?.statusMessage || err.message, color: 'red' })
  } finally {
    loading.value = false
  }
}
</script>
