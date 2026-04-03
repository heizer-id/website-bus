import { getDB } from '../../utils/d1'
import QRCode from 'qrcode'

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, 'code')
  
  if (!code) {
    throw createError({ statusCode: 400, statusMessage: "Kode Booking diperlukan" })
  }

  const db = getDB(event)

  try {
    const tx = await db.prepare(`
      SELECT t.*, s.route_from, s.route_to, s.departure_time, s.arrival_time, 
             b.name as bus_name, b.class as bus_class 
      FROM transactions t
      JOIN schedules s ON t.schedule_id = s.id
      JOIN buses b ON s.bus_id = b.id
      WHERE t.booking_code = ?
    `).bind(code).first()

    if (!tx) {
      throw createError({ statusCode: 404, statusMessage: "Transaksi tidak ditemukan" })
    }

    let qrCodeDataUrl = null
    if (tx.payment_status === 'paid') {
      try {
        // Generate QR on the fly
        qrCodeDataUrl = await QRCode.toDataURL(code as string, {
          width: 300,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#ffffff'
          }
        })
      } catch (e) {
        console.error('Failed generating QR code', e)
      }
    }

    return {
      transaction: tx,
      qrCodeDataUrl
    }
  } catch (err: any) {
    if(err.statusCode === 404) throw err
    throw createError({ statusCode: 500, statusMessage: err.message })
  }
})
