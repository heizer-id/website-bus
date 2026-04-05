<template>
  <div class="min-h-[80vh] flex items-center justify-center px-4 relative">
    <!-- Background Decor -->
    <div class="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-indigo-500/10 to-transparent -z-10 blur-3xl"></div>
    
    <div class="w-full max-w-lg animate-in fade-in zoom-in-95 duration-1000">
      <div class="premium-card relative overflow-hidden group">
        <!-- Decoration -->
        <div class="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] group-hover:bg-indigo-500/20 transition-all duration-700"></div>
        
        <div class="relative z-10 space-y-10">
          <div class="text-center space-y-3">
             <div class="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 rounded-[2rem] shadow-2xl shadow-indigo-500/40 mb-4">
                <UIcon name="i-heroicons-user-circle" class="w-10 h-10 text-white" />
             </div>
             <h1 class="text-4xl font-black text-slate-900 tracking-tight" style="font-family: var(--font-serif)">Welcome Back</h1>
             <p class="text-slate-500 font-medium">Access your elite travel dashboard.</p>
          </div>
 
          <form @submit.prevent="handleLogin" class="space-y-8">
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
              class="font-black py-6 rounded-[2rem] shadow-2xl shadow-indigo-600/30 hover-premium text-xs uppercase tracking-[0.2em] mt-6" 
              :loading="loading"
              icon="i-heroicons-shield-check"
            >
              Authorize Login
            </UButton>
          </form>
 
          <div class="pt-8 border-t border-slate-100/50 text-center">
            <p class="text-slate-500 text-sm font-medium">
              Initialize a new membership? 
              <ULink to="/register" class="text-indigo-600 font-black uppercase tracking-widest text-[10px] hover:text-indigo-700 ml-1">Begin Enrollment</ULink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// @ts-ignore
definePageMeta({
  middleware: 'guest'
})

const email = ref('')
const password = ref('')
const loading = ref(false)
const router = useRouter()
const route = useRoute()

const handleLogin = async () => {
  loading.value = true
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value }
    })
    
    // @ts-ignore
    const { fetchUser, isAdmin } = useAuth()
    await fetchUser()

    const redirect = route.query.redirect as string
    if (redirect) {
      router.push(redirect)
    } else if (isAdmin.value) {
      router.push('/admin')
    } else {
      router.push('/')
    }

  } catch (err: any) {
    // @ts-ignore
    const toast = useToast()
    toast.add({ title: 'Authorization Failed', description: err.data?.statusMessage || err.message, color: 'red' })
  } finally {
    loading.value = false
  }
}
</script>
