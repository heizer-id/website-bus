import { getDB } from '../../../utils/d1'
import { requireAdmin } from '../../../utils/protectRoute'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const db = getDB(event)
  const body = await readBody(event)

  if (body.action === 'delete') {
    await db.prepare('DELETE FROM buses WHERE id = ?').bind(body.id).run()
    return { success: true }
  }

  const { name, busClass, totalSeats, layoutConfig } = body
  if (!name || !busClass || !totalSeats) {
    throw createError({ statusCode: 400, statusMessage: 'Data tidak lengkap' })
  }

  await db.prepare('INSERT INTO buses (name, class, total_seats, seat_layout) VALUES (?, ?, ?, ?)')
    .bind(name, busClass, totalSeats, JSON.stringify(layoutConfig || { rows: 10, cols: 4, aisle: 2 })).run()
    
  return { success: true }
})
