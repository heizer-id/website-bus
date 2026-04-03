import { verifySessionToken } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token')

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const payload = await verifySessionToken(token)
  if (!payload) {
    throw createError({ statusCode: 401, statusMessage: 'Token invalid' })
  }

  return { user: payload }
})
