import { getDB } from '../../utils/d1'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // Handling mock or actual Doku callback payload
  const bookingCode = body?.order?.invoice_number || body?.bookingCode
  const status = body?.transaction?.status || body?.status // "SUCCESS" or "FAILED"

  if (!bookingCode || !status) {
    throw createError({ statusCode: 400, statusMessage: "Invalid callback payload" })
  }

  const db = getDB(event)

  try {
    if (status.toUpperCase() === 'SUCCESS' || status.toUpperCase() === 'PAID') {
      await db.prepare(`
        UPDATE transactions 
        SET payment_status = 'paid', paid_at = datetime('now')
        WHERE booking_code = ?
      `).bind(bookingCode).run()

      const tx = await db.prepare("SELECT schedule_id, seat_codes FROM transactions WHERE booking_code = ?").bind(bookingCode).first()
      if (tx) {
         const seatCodes = (tx.seat_codes as string).split(',')
         const scheduleId = tx.schedule_id

         const stmts = seatCodes.map(seat => {
            return db.prepare(`UPDATE seat_bookings SET status = 'paid' WHERE schedule_id = ? AND seat_code = ?`).bind(scheduleId, seat)
         })
         await db.batch(stmts)
      }

      console.log(`Payment confirmed for ${bookingCode}. E-Ticket generated successfully.`)

      return { success: true }
    } else {
      await db.prepare(`
        UPDATE transactions 
        SET payment_status = 'failed'
        WHERE booking_code = ?
      `).bind(bookingCode).run()

       const tx = await db.prepare("SELECT schedule_id, seat_codes FROM transactions WHERE booking_code = ?").bind(bookingCode).first()
       if (tx) {
          const seatCodes = (tx.seat_codes as string).split(',')
          const scheduleId = tx.schedule_id

          const stmts = seatCodes.map(seat => {
             return db.prepare(`DELETE FROM seat_bookings WHERE schedule_id = ? AND seat_code = ?`).bind(scheduleId, seat)
          })
          await db.batch(stmts)
       }

       return { success: true, message: "Transaction failed processed." }
    }

  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err.message })
  }
})
