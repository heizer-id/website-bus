import { getDB } from '../../utils/d1'
import { hashPassword, createSessionToken } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email, password } = body

  if (!name || !email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Semua kolom wajib diisi' })
  }

  const db = getDB(event)
  
  const existing = await db.prepare('SELECT id FROM users WHERE email = ?').bind(email).first()
  if (existing) {
    throw createError({ statusCode: 409, statusMessage: 'Email sudah terdaftar' })
  }

  const hashedPw = await hashPassword(password)
  const result = await db.prepare('INSERT INTO users (full_name, email, password_hash, role) VALUES (?, ?, ?, ?) RETURNING id, full_name, email, role')
    .bind(name, email, hashedPw, 'user')
    .first<{ id: number, full_name: string, email: string, role: string }>()

  if (!result) {
    throw createError({ statusCode: 500, statusMessage: 'Gagal mendaftar' })
  }

  const token = await createSessionToken({
    id: result.id,
    email: result.email,
    role: result.role,
    name: result.full_name
  })

  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24
  })

  return { success: true, user: result }
})
