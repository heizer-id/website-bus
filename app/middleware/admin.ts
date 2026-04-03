export default defineNuxtRouteMiddleware(async (to, from) => {
  // @ts-ignore
  const { fetchUser, isAuthenticated, isAdmin } = useAuth()
  
  if (import.meta.client && !isAuthenticated.value) {
    await fetchUser()
  }

  if (!isAuthenticated.value) {
    return navigateTo(`/login?redirect=${to.fullPath}`)
  }

  if (!isAdmin.value) {
    return navigateTo('/')
  }
})
