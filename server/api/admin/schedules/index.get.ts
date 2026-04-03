import { getDB } from '../../../utils/d1'
import { requireAdmin } from '../../../utils/protectRoute'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const db = getDB(event)
  const { results } = await db.prepare(`
    SELECT s.*, b.name as bus_name, b.class as bus_class 
    FROM schedules s 
    LEFT JOIN buses b ON s.bus_id = b.id 
    ORDER BY s.departure_time DESC
  `).all()
  return { schedules: results || [] }
})
