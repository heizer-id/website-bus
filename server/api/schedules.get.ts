import { getDB } from '../utils/d1'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const from = query.from as string
  const to = query.to as string
  const date = query.date as string // format: YYYY-MM-DD
  
  if (!from || !to || !date) {
    throw createError({ statusCode: 400, statusMessage: "Parameter pencarian (from, to, date) harus diisi" })
  }

  const db = getDB(event)

  try {
    const fetchSql = `
      SELECT 
        s.*, 
        b.name as bus_name, 
        b.class as bus_class, 
        b.total_seats,
        (SELECT COUNT(*) FROM seat_bookings sb WHERE sb.schedule_id = s.id AND sb.status IN ('booked', 'paid')) as booked_seats
      FROM schedules s
      JOIN buses b ON s.bus_id = b.id
      WHERE LOWER(s.route_from) = LOWER(?) 
        AND LOWER(s.route_to) = LOWER(?) 
        AND date(s.departure_time) = date(?)
      ORDER BY s.departure_time ASC
    `

    const { results } = await db.prepare(fetchSql).bind(from, to, date).all()
    
    return results || []
  } catch (error: any) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }
})
