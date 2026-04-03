<template>
  <div class="max-w-md mx-auto mt-10">
    <UCard class="shadow-xl">
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold">Selamat Datang</h1>
        <p class="text-gray-500 text-sm">Masuk untuk memesan tiket dengan mudah.</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <UFormGroup label="Email">
          <UInput v-model="email" type="email" icon="i-heroicons-envelope" required />
        </UFormGroup>
        
        <UFormGroup label="Kata Sandi">
          <UInput v-model="password" type="password" icon="i-heroicons-lock-closed" required />
        </UFormGroup>

        <UButton type="submit" block color="primary" size="xl" class="font-bold mt-6" :loading="loading">Masuk</UButton>
      </form>

      <div class="mt-6 text-center text-sm">
        <p class="text-gray-600">Belum punya akun? <ULink to="/register" class="text-primary-600 font-bold hover:underline">Daftar sekarang</ULink></p>
      </div>
    </UCard>
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
      router.push('/admin') // Admin Dashboard (if exists)
    } else {
      router.push('/')
    }

  } catch (err: any) {
    // @ts-ignore
    const toast = useToast()
    toast.add({ title: 'Gagal Masuk', description: err.data?.statusMessage || err.message, color: 'red' })
  } finally {
    loading.value = false
  }
}
</script>
