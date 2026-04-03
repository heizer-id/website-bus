import { getDB } from '../utils/d1'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const scheduleId = query.scheduleId as string
  
  if (!scheduleId) {
    throw createError({ statusCode: 400, statusMessage: "Missing scheduleId" })
  }

  const db = getDB(event)

  try {
    // get schedule to find bus details (for layout)
    const schedule = await db.prepare(`
      SELECT s.*, b.name as bus_name, b.class as bus_class, b.total_seats, b.seat_layout
      FROM schedules s
      JOIN buses b ON s.bus_id = b.id
      WHERE s.id = ?
    `).bind(scheduleId).first()

    if (!schedule) {
      throw createError({ statusCode: 404, statusMessage: "Schedule not found" })
    }

    // get booked seats
    const { results: bookedSeats } = await db.prepare(`
      SELECT seat_code, status 
      FROM seat_bookings 
      WHERE schedule_id = ? AND status IN ('booked', 'paid')
    `).bind(scheduleId).all()

    return {
      schedule,
      bookedSeats: bookedSeats || []
    }
  } catch (error: any) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }
})
