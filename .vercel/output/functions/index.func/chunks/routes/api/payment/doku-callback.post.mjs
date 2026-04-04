import { d as defineEventHandler, b as readBody, c as createError, a as getDB } from '../../../_/nitro.mjs';
import 'jose';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:fs';
import 'node:path';

const dokuCallback_post = defineEventHandler(async (event) => {
  var _a, _b;
  const body = await readBody(event);
  const bookingCode = ((_a = body == null ? void 0 : body.order) == null ? void 0 : _a.invoice_number) || (body == null ? void 0 : body.bookingCode);
  const status = ((_b = body == null ? void 0 : body.transaction) == null ? void 0 : _b.status) || (body == null ? void 0 : body.status);
  if (!bookingCode || !status) {
    throw createError({ statusCode: 400, statusMessage: "Invalid callback payload" });
  }
  const db = getDB();
  try {
    if (status.toUpperCase() === "SUCCESS" || status.toUpperCase() === "PAID") {
      await db.prepare(`
        UPDATE transactions 
        SET payment_status = 'paid', paid_at = datetime('now')
        WHERE booking_code = ?
      `).bind(bookingCode).run();
      const tx = await db.prepare("SELECT schedule_id, seat_codes FROM transactions WHERE booking_code = ?").bind(bookingCode).first();
      if (tx) {
        const seatCodes = tx.seat_codes.split(",");
        const scheduleId = tx.schedule_id;
        const stmts = seatCodes.map((seat) => {
          return db.prepare(`UPDATE seat_bookings SET status = 'paid' WHERE schedule_id = ? AND seat_code = ?`).bind(scheduleId, seat);
        });
        await db.batch(stmts);
      }
      console.log(`Payment confirmed for ${bookingCode}. E-Ticket generated successfully.`);
      return { success: true };
    } else {
      await db.prepare(`
        UPDATE transactions 
        SET payment_status = 'failed'
        WHERE booking_code = ?
      `).bind(bookingCode).run();
      const tx = await db.prepare("SELECT schedule_id, seat_codes FROM transactions WHERE booking_code = ?").bind(bookingCode).first();
      if (tx) {
        const seatCodes = tx.seat_codes.split(",");
        const scheduleId = tx.schedule_id;
        const stmts = seatCodes.map((seat) => {
          return db.prepare(`DELETE FROM seat_bookings WHERE schedule_id = ? AND seat_code = ?`).bind(scheduleId, seat);
        });
        await db.batch(stmts);
      }
      return { success: true, message: "Transaction failed processed." };
    }
  } catch (err) {
    throw createError({ statusCode: 500, statusMessage: err.message });
  }
});

export { dokuCallback_post as default };
//# sourceMappingURL=doku-callback.post.mjs.map
