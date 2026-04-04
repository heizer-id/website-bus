import { verifySessionToken } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token')

  if (!token) {
    // Return null user instead of 401 — 401 causes console errors on every
    // page load for unauthenticated visitors, even though it's expected.
    return { user: null }
  }

  const payload = await verifySessionToken(token)
  if (!payload) {
    return { user: null }
  }

  return { user: payload }
})

