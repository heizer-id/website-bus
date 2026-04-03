import { getDB } from '../../utils/d1'
import { verifySessionToken } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { scheduleId, seats, passenger } = body

  if (!scheduleId || !seats || !passenger) {
    throw createError({ statusCode: 400, statusMessage: "Invalid payload" })
  }

  const db = getDB(event)
  
  const token = getCookie(event, 'auth_token')
  let userId = null
  if (token) {
    const payload = await verifySessionToken(token)
    if (payload) {
      userId = payload.id
    }
  }

  try {
    const schedule = await db.prepare("SELECT price FROM schedules WHERE id = ?").bind(scheduleId).first()
    if (!schedule) {
      throw createError({ statusCode: 404, statusMessage: "Schedule not found" })
    }

    const totalAmount = (schedule.price as number) * seats.length

    // Generate Booking Code PO/YYYYMMDD/XXXX
    const dateStr = new Date().toISOString().replace(/[-T:\.Z]/g, '').slice(0, 8)
    const randNum = Math.floor(1000 + Math.random() * 9000)
    const bookingCode = `PO/${dateStr}/${randNum}`

    // Insert Transaction
    await db.prepare(`
      INSERT INTO transactions 
      (booking_code, schedule_id, user_id, passenger_name, passenger_phone, passenger_email, seat_codes, total_amount, payment_status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', datetime('now'))
    `).bind(
      bookingCode,
      scheduleId,
      userId,
      passenger.name,
      passenger.phone,
      passenger.email,
      seats.join(','),
      totalAmount
    ).run()

    // Mock Response assuming Doku API was called
    // Real implementation requires fetching Doku API Token/Invoice here
    
    return { 
      success: true, 
      bookingCode, 
      // simulated redirect url
      checkoutUrl: `/payment-success?booking=${bookingCode}` 
    }
  } catch (error: any) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }
})
