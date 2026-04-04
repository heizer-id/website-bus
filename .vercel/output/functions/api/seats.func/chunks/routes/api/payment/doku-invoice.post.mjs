import { d as defineEventHandler, b as readBody, c as createError, j as getCookie, v as verifySessionToken, a as getDB } from '../../../_/nitro.mjs';
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

const dokuInvoice_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { scheduleId, seats, passenger } = body;
  if (!scheduleId || !seats || !passenger) {
    throw createError({ statusCode: 400, statusMessage: "Invalid payload" });
  }
  const db = getDB();
  const token = getCookie(event, "auth_token");
  let userId = null;
  if (token) {
    const payload = await verifySessionToken(token);
    if (payload) {
      userId = payload.id;
    }
  }
  try {
    const schedule = await db.prepare("SELECT price FROM schedules WHERE id = ?").bind(scheduleId).first();
    if (!schedule) {
      throw createError({ statusCode: 404, statusMessage: "Schedule not found" });
    }
    const totalAmount = schedule.price * seats.length;
    const dateStr = (/* @__PURE__ */ new Date()).toISOString().replace(/[-T:\.Z]/g, "").slice(0, 8);
    const randNum = Math.floor(1e3 + Math.random() * 9e3);
    const bookingCode = `PO/${dateStr}/${randNum}`;
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
      seats.join(","),
      totalAmount
    ).run();
    return {
      success: true,
      bookingCode,
      // simulated redirect url
      checkoutUrl: `/payment-success?booking=${bookingCode}`
    };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});

export { dokuInvoice_post as default };
//# sourceMappingURL=doku-invoice.post.mjs.map
