import { verifySessionToken } from './auth'
import type { H3Event } from 'h3'

export async function requireAdmin(event: H3Event) {
  const token = getCookie(event, 'auth_token')
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const payload = await verifySessionToken(token)
  if (!payload || payload.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden: Admins only' })
  }

  return payload
}

export async function requireAuth(event: H3Event) {
  const token = getCookie(event, 'auth_token')
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const payload = await verifySessionToken(token)
  if (!payload) {
    throw createError({ statusCode: 401, statusMessage: 'Token invalid or expired' })
  }

  return payload
}
