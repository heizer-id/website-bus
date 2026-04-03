import { getDB } from '../../../utils/d1'
import { requireAdmin } from '../../../utils/protectRoute'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const db = getDB(event)
  const body = await readBody(event)

  if (body.action === 'delete') {
    await db.prepare('DELETE FROM schedules WHERE id = ?').bind(body.id).run()
    return { success: true }
  }

  const { bus_id, route_from, route_to, departure_time, arrival_time, price } = body
  if (!bus_id || !route_from || !route_to || !departure_time || !arrival_time || !price) {
    throw createError({ statusCode: 400, statusMessage: 'Data tidak lengkap' })
  }

  await db.prepare('INSERT INTO schedules (bus_id, route_from, route_to, departure_time, arrival_time, price) VALUES (?, ?, ?, ?, ?, ?)')
    .bind(bus_id, route_from, route_to, departure_time, arrival_time, price).run()
    
  return { success: true }
})
