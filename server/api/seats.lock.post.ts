import { getDB } from '../utils/d1'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const scheduleId = body.scheduleId
  const seatCodes = body.seatCodes as string[] // array of ["1A", "1B"]

  if (!scheduleId || !seatCodes || seatCodes.length === 0) {
    throw createError({ statusCode: 400, statusMessage: "Missing scheduleId or seatCodes" })
  }

  const db = getDB(event)

  try {
    const schedule = await db.prepare("SELECT departure_time FROM schedules WHERE id = ?").bind(scheduleId).first()
    if (!schedule) {
       throw createError({ statusCode: 404, statusMessage: "Schedule not found" })
    }
    const departureDate = (schedule.departure_time as string).split('T')[0]

    const placeholders = seatCodes.map(() => '?').join(',')
    const existing = await db.prepare(
      `SELECT seat_code FROM seat_bookings WHERE schedule_id = ? AND status IN ('booked', 'paid') AND seat_code IN (${placeholders})`
    ).bind(scheduleId, ...seatCodes).all()

    if (existing.results && existing.results.length > 0) {
      throw createError({ 
        statusCode: 409, 
        statusMessage: `Kursi ${existing.results.map((r: any) => r.seat_code).join(', ')} sudah dipesan.` 
      })
    }

    // Lock the seats
    const stmts = seatCodes.map(seat => {
      return db.prepare(`INSERT INTO seat_bookings (schedule_id, seat_code, booking_date, status) VALUES (?, ?, ?, 'booked')`)
        .bind(scheduleId, seat, departureDate)
    })
    
    await db.batch(stmts)

    return { success: true, message: "Kursi berhasil dikonfirmasi dan dikunci." }

  } catch (error: any) {
    if(error.statusCode === 409) throw error;
    throw createError({ statusCode: 500, statusMessage: error.message })
  }
})
