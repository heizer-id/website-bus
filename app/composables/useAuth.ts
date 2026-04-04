export const useAuth = () => {
  const user = useState<any>('user', () => null)
  const fetchingAuth = useState<boolean>('fetchingAuth', () => false)
  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  const fetchUser = async () => {
    // Prevent duplicate calls (e.g. layout + middleware both trigger this)
    if (fetchingAuth.value) return
    fetchingAuth.value = true
    try {
      const headers = useRequestHeaders(['cookie'])
      const res: any = await $fetch('/api/auth/me', { headers })
      user.value = res.user
    } catch (e: any) {
      // 401 is expected when not logged in — swallow silently
      user.value = null
    } finally {
      fetchingAuth.value = false
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
