<template>
  <div class="max-w-md mx-auto mt-10">
    <UCard class="shadow-xl">
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold">Daftar Akun Baru</h1>
        <p class="text-gray-500 text-sm">Bergabunglah untuk menikmati layanan tiket bus kami.</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <UFormGroup label="Nama Lengkap">
          <UInput v-model="name" icon="i-heroicons-user" placeholder="Sesuai KTP" required />
        </UFormGroup>

        <UFormGroup label="Email">
          <UInput v-model="email" type="email" icon="i-heroicons-envelope" required />
        </UFormGroup>
        
        <UFormGroup label="Kata Sandi">
          <UInput v-model="password" type="password" icon="i-heroicons-lock-closed" required />
        </UFormGroup>

        <UButton type="submit" block color="primary" size="xl" class="font-bold mt-6" :loading="loading">Daftar</UButton>
      </form>

      <div class="mt-6 text-center text-sm">
        <p class="text-gray-600">Sudah punya akun? <ULink to="/login" class="text-primary-600 font-bold hover:underline">Masuk di sini</ULink></p>
      </div>
    </UCard>
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
    toast.add({ title: 'Berhasil', description: 'Akun Anda berhasil dibuat!', color: 'green' })
    
    router.push('/')

  } catch (err: any) {
    // @ts-ignore
    const toast = useToast()
    toast.add({ title: 'Gagal Mendaftar', description: err.data?.statusMessage || err.message, color: 'red' })
  } finally {
    loading.value = false
  }
}
</script>
