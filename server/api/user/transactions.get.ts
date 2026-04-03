import { getDB } from '../../utils/d1'
import { requireAuth } from '../../utils/protectRoute'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)
  const db = getDB(event)

  const { results } = await db.prepare(`
    SELECT t.*, s.route_from, s.route_to, s.departure_time, s.arrival_time, b.name as bus_name, b.class as bus_class 
    FROM transactions t
    LEFT JOIN schedules s ON t.schedule_id = s.id
    LEFT JOIN buses b ON s.bus_id = b.id
    WHERE t.user_id = ?
    ORDER BY t.id DESC
  `).bind(user.id).all()

  return { transactions: results || [] }
})
