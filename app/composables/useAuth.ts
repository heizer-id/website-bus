export const useAuth = () => {
  const user = useState<any>('user', () => null)
  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  const fetchUser = async () => {
    try {
      const res: any = await $fetch('/api/auth/me')
      user.value = res.user
    } catch (e) {
      user.value = null
    }
  }

  const logout = async () => {
    try {
      await $fetch('/api/auth/logout', { method: 'POST' })
      user.value = null
      useRouter().push('/login')
    } catch(e) {}
  }

  return {
    user,
    isAuthenticated,
    isAdmin,
    fetchUser,
    logout
  }
}
