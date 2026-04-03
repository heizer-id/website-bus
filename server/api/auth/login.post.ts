import { getDB } from '../../utils/d1'
import { hashPassword, createSessionToken } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email dan sandi wajib diisi' })
  }

  const db = getDB(event)
  const user = await db.prepare('SELECT id, full_name, email, password_hash, role FROM users WHERE email = ?').bind(email).first<{ id: number, full_name: string, email: string, password_hash: string, role: string }>()

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Email atau sandi salah' })
  }

  const hashedPw = await hashPassword(password)
  if (user.password_hash !== hashedPw) {
    throw createError({ statusCode: 401, statusMessage: 'Email atau sandi salah' })
  }

  const token = await createSessionToken({
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.full_name
  })

  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24
  })

  return { 
    success: true, 
    user: { id: user.id, name: user.full_name, email: user.email, role: user.role }
  }
})
