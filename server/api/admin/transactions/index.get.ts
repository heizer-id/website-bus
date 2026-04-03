import { getDB } from '../../../utils/d1'
import { requireAdmin } from '../../../utils/protectRoute'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const db = getDB(event)
  const query = getQuery(event)
  const search = query.search ? `%${query.search}%` : undefined

  let sql = `
    SELECT t.*, s.route_from, s.route_to, s.departure_time 
    FROM transactions t
    LEFT JOIN schedules s ON t.schedule_id = s.id
  `
  
  let results
  if (search) {
     sql += ` WHERE t.booking_code LIKE ? OR t.passenger_name LIKE ? ORDER BY t.id DESC`
     const dbResult = await db.prepare(sql).bind(search, search).all()
     results = dbResult.results
  } else {
     sql += ` ORDER BY t.id DESC`
     const dbResult = await db.prepare(sql).all()
     results = dbResult.results
  }

  return { transactions: results || [] }
})
